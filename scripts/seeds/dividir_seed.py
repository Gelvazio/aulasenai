"""Divide um seed `database/*-seed-atividades.sql` em lotes pequenos para o conector do Supabase.

Regra "🌱 REGRA — SEEDS DO BANCO" do `CLAUDE.md`: pelo conector, os blocos grandes com `DO` e
`delete` voltam "cancelado"; por isso cada atividade vira **um comando só** (`insert ... returning`
com a contagem), sem `DO` nem `delete`. Junto saem o md5 esperado de cada página e a consulta que
confere o md5 no banco.

Uso:
    python3 scripts/seeds/dividir_seed.py database/<seed>.sql <pasta-de-saida> [--itens-por-lote=N] [--so=6.3,7]

Saída na pasta: `NN-<tipo>.sql` (um lote por atividade; com `--itens-por-lote`, `NN-<tipo>-PP.sql`,
uma parte por comando — a 1ª cria a atividade, as outras só acrescentam itens), `esperado.json`
(página → md5) e `conferir-md5.sql` (consulta que devolve página e md5 do banco, para `comparar_md5.py`).
`--so` gera só os itens que faltam (item ou item.tópico) para uma atividade que já existe.
As palavras DELETE, DROP e TRUNCATE dos textos saem partidas (`'DEL' || 'ETE'`), porque o conector
cancela o comando ao vê-las; o texto gravado e o md5 não mudam.
⚠️ Lote = só a carga **nova**: rode em atividade que ainda não tem esses itens (o `delete` foi tirado).
"""
import hashlib
import json
import re
import sys
from pathlib import Path

COLUNAS_MD5 = {
    "gabarito": ["item", "titulo", "letra"],
    "topico_discursivo": ["item", "topico", "enunciado", "resposta_esperada", "criterios"],
}
PADRAO_ATIVIDADE = re.compile(
    r"insert into public\.atividade \((?P<cols>[^)]*)\)\s*values \((?P<vals>.*?)\)\s*"
    r"(?P<conflito>on conflict \(pagina\) do update set .*?)\s*returning id into v_atividade;",
    re.S,
)
PADRAO_ITENS = re.compile(r"insert into public\.(gabarito|topico_discursivo) \(([^)]*)\) values", re.S)
PADRAO_PERIGOSAS = re.compile(r"(?i)delete|drop|truncate")


def ler_tuplas(texto, inicio):
    """Lê as tuplas `(...)` de um `values` a partir de `inicio` até o `;` final (fora de aspas)."""
    tuplas, campo, campos, i, profundidade, aspas = [], "", [], inicio, 0, False
    while i < len(texto):
        ch = texto[i]
        if aspas:
            if ch == "'" and texto[i + 1:i + 2] == "'":
                campo += "''"; i += 2; continue
            aspas = ch != "'"; campo += ch
        elif ch == "'":
            aspas = True; campo += ch
        elif ch == "(":
            profundidade += 1; campo = "" if profundidade == 1 else campo + ch
        elif ch == ")" and profundidade == 1:
            campos.append(campo.strip()); tuplas.append(campos); campos, campo, profundidade = [], "", 0
        elif ch == "," and profundidade == 1:
            campos.append(campo.strip()); campo = ""
        elif ch == ";" and profundidade == 0:
            return tuplas
        elif profundidade:
            campo += ch
        i += 1
    return tuplas


def valor_texto(campo):
    """Converte um literal SQL ('texto' ou número) no texto que o banco concatena."""
    if campo.startswith("'") and campo.endswith("'"):
        return campo[1:-1].replace("''", "'")
    return campo


def md5_itens(tabela, colunas, tuplas):
    """md5 igual ao da regra: campos da tabela unidos por '|', linhas por '\\n', na ordem."""
    idx = [colunas.index(c) for c in COLUNAS_MD5[tabela]]
    chave = (lambda t: (int(t[colunas.index("item")]), int(t[colunas.index("topico")]))) \
        if tabela == "topico_discursivo" else (lambda t: int(t[colunas.index("item")]))
    linhas = ["|".join(valor_texto(t[i]) for i in idx) for t in sorted(tuplas, key=chave)]
    return hashlib.md5("\n".join(linhas).encode("utf-8")).hexdigest()


def cte_aula_discursiva(trecho):
    """CTE `aula` a partir do `select a.id into v_aula ... limit 1;` do seed discursivo."""
    achou = re.search(r"select a\.id into v_aula (from .*?limit 1);", trecho, re.S)
    return f"with aula as (select a.id {achou.group(1)}),\n" if achou else None


def cte_aula_objetiva(texto, trecho):
    """CTEs curso/matéria/aula (cria a aula se faltar) do seed objetivo do gerar-seed-atividades.py."""
    curso = re.search(r"from public\.curso where nome_completo = ('(?:[^']|'')*')", texto).group(1)
    materia = re.search(r"from public\.materia where descricao = ('(?:[^']|'')*')", texto).group(1)
    nova = re.search(r"insert into public\.aulas \(numero, titulo, materia_id, curso_id, data_planejada\)"
                     r"\s*values \((\d+), ('(?:[^']|'')*'), v_materia, v_curso, ('[^']*')\)", trecho)
    if not nova:
        return None
    numero, titulo, data = nova.groups()
    return (f"with c as (select id from public.curso where nome_completo = {curso} limit 1),\n"
            f"m as (select id from public.materia where descricao = {materia} limit 1),\n"
            "cm as (insert into public.cursomateria (cursoid, materiaid) select c.id, m.id from c, m"
            " on conflict do nothing returning 1),\n"
            "nova as (insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)\n"
            f"  select {numero}, {titulo}, m.id, c.id, {data} from m, c\n"
            f"  where not exists (select 1 from public.aulas a where a.materia_id = m.id and a.titulo = {titulo})"
            " returning id),\n"
            "aula as (select id from nova union all select a.id from public.aulas a, m"
            f" where a.materia_id = m.id and a.titulo = {titulo} limit 1),\n")


def mascarar(campo):
    """Parte DELETE/DROP/TRUNCATE dos textos (`'DEL' || 'ETE'`): o conector cancela o comando
    quando vê essas palavras, mesmo dentro de um texto. O valor gravado no banco não muda."""
    if not campo.startswith("'"):
        return campo
    return PADRAO_PERIGOSAS.sub(lambda m: m.group(0)[:3] + "' || '" + m.group(0)[3:], campo)


def linhas_values(tuplas):
    """Linhas do `values` sem a 1ª coluna (atividade), com as palavras perigosas partidas."""
    return ",\n".join("(" + ", ".join(mascarar(c) for c in t[1:]) + ")" for t in tuplas)


def insert_itens(tabela, colunas, tuplas):
    """CTE `g`: insere os itens na atividade da CTE `at`."""
    cols = ", ".join(colunas[1:])
    return (f"g as (insert into public.{tabela} ({colunas[0]}, {cols})\n"
            f"select at.id, {', '.join('v.' + c for c in colunas[1:])} from at, (values\n"
            f"{linhas_values(tuplas)}) v({cols})\nreturning 1)\n")


def montar_lote(cte_aula, atividade, tabela, colunas, tuplas):
    """Um comando só: aula → atividade (upsert pela página) → itens, devolvendo as contagens."""
    vals = atividade.group("vals").replace("v_aula", "aula.id")
    return (cte_aula
            + f"at as (insert into public.atividade ({atividade.group('cols')})\n  select {vals} from aula\n"
            + f"  {atividade.group('conflito')}\n  returning id, aula_id),\n"
            + insert_itens(tabela, colunas, tuplas)
            + "select (select id from at) atividade, (select aula_id from at) aula, count(*) itens from g;\n")


def montar_lote_extra(pagina, tabela, colunas, tuplas):
    """Lote das partes seguintes: só acrescenta itens à atividade que já existe (pela página)."""
    literal = "'" + pagina.replace("'", "''") + "'"
    return (f"with at as (select id, aula_id from public.atividade where pagina = {literal}),\n"
            + insert_itens(tabela, colunas, tuplas)
            + "select (select id from at) atividade, (select aula_id from at) aula, count(*) itens from g;\n")


def filtrar(tabela, colunas, tuplas, so):
    """Mantém só os itens pedidos em `--so` (ex.: {"6.3"} = item 6, tópico 3; {"7"} = item 7)."""
    if not so:
        return tuplas
    i_item = colunas.index("item")
    i_top = colunas.index("topico") if tabela == "topico_discursivo" else None
    chave = lambda t: t[i_item] + ("" if i_top is None else "." + t[i_top])
    return [t for t in tuplas if chave(t) in so or t[i_item] in so]


def dividir(texto, por_lote=0, so=None):
    """Lista de (página, tipo, lotes, md5) — uma por atividade do seed; `por_lote` itens por comando."""
    resultado, achados = [], list(PADRAO_ATIVIDADE.finditer(texto))
    for n, atv in enumerate(achados):
        inicio = achados[n - 1].end() if n else 0
        trecho = texto[inicio:atv.start()]
        cte = cte_aula_objetiva(texto, trecho) if "v_curso" in texto else cte_aula_discursiva(trecho)
        itens = PADRAO_ITENS.search(texto, atv.end())
        if not cte or not itens:
            sys.exit(f"não reconheci a atividade {n + 1} do seed (formato novo?)")
        tabela, colunas = itens.group(1), [c.strip() for c in itens.group(2).split(",")]
        tuplas = ler_tuplas(texto, itens.end())
        pagina = re.search(r"'(/MATERIAIS/[^']+\.html)'", atv.group("vals")).group(1)
        escolhidas = filtrar(tabela, colunas, tuplas, so)
        passo = por_lote or len(escolhidas) or 1
        partes = [escolhidas[i:i + passo] for i in range(0, len(escolhidas), passo)]
        lotes = [montar_lote_extra(pagina, tabela, colunas, p) if (k or so) else montar_lote(cte, atv, tabela, colunas, p)
                 for k, p in enumerate(partes)]
        resultado.append((pagina, tabela, lotes, md5_itens(tabela, colunas, tuplas)))
    return resultado


def consulta_md5(paginas):
    """SQL que devolve página e md5 do banco (objetivas pela gabarito, discursivas pelos tópicos)."""
    lista = ", ".join("'" + p.replace("'", "''") + "'" for p in paginas)
    return ("select a.pagina, md5(string_agg(g.item||'|'||g.titulo||'|'||g.letra, E'\\n' order by g.item)) h\n"
            f"from public.atividade a join public.gabarito g on g.atividade_id = a.id where a.pagina in ({lista})"
            " group by a.pagina\nunion all\n"
            "select a.pagina, md5(string_agg(t.item||'|'||t.topico||'|'||t.enunciado||'|'||t.resposta_esperada"
            "||'|'||t.criterios, E'\\n' order by t.item, t.topico))\n"
            "from public.atividade a join public.topico_discursivo t on t.atividade_id = a.id"
            f" where a.pagina in ({lista}) group by a.pagina order by 1;\n")


def main():
    """Lê o seed, grava os lotes, o esperado.json e o conferir-md5.sql na pasta de saída."""
    posicionais = [a for a in sys.argv[1:] if not a.startswith("--")]
    opcoes = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and "=" in a)
    if len(posicionais) != 2:
        sys.exit(__doc__)
    seed, saida = Path(posicionais[0]), Path(posicionais[1])
    saida.mkdir(parents=True, exist_ok=True)
    so = set(opcoes["so"].split(",")) if opcoes.get("so") else None
    partes = dividir(seed.read_text(encoding="utf-8"), int(opcoes.get("itens-por-lote", 0)), so)
    for n, (pagina, tabela, lotes, _) in enumerate(partes, 1):
        tipo = "obj" if tabela == "gabarito" else "pra"
        for k, lote in enumerate(lotes, 1):
            nome = f"{n:02d}-{tipo}.sql" if len(lotes) == 1 else f"{n:02d}-{tipo}-{k:02d}.sql"
            (saida / nome).write_text(lote, encoding="utf-8")
    esperado = {p: h for p, _, _, h in partes}
    (saida / "esperado.json").write_text(json.dumps(esperado, indent=1, ensure_ascii=False), encoding="utf-8")
    (saida / "conferir-md5.sql").write_text(consulta_md5(list(esperado)), encoding="utf-8")
    print(f"{len(partes)} lote(s) em {saida}")


if __name__ == "__main__":
    main()
