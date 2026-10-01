"""Gera o SQL de seed das atividades com login (curso, matéria, aulas, atividades e gabarito).

Uso (na raiz do projeto):
    C:\\Python314\\python.exe scripts\\gerar-seed-atividades.py

Fonte do gabarito: os .md das atividades (mesmo leitor do assets/gerador-atividades).
Saída: database/2026-09-28-seed-atividades.sql (idempotente; rodar depois do schema).
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "assets" / "gerador-atividades"))
from gerar_atividades import caminho_saida, ler_questoes  # noqa: E402

ARQUIVO_SAIDA = RAIZ / "database" / "2026-09-28-seed-atividades.sql"
PASTA_TIC = "MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES"
PASTA_FONTES = "CONTEUDO"  # subpasta das fontes .md (com gabarito) dentro de ATIVIDADES/

CURSO = "Assistente de Operações Logísticas"
MATERIA = "Introdução à Tecnologia da Informação e Comunicação"

TURMAS = [
    ("135080", "AI AOPL 2026/2 M1", "Manhã", "07:15 às 11:15"),
    ("135081", "AI AOPL 2026/2 V1", "Tarde", "13:15 às 17:15"),
]

DATA_PROVISORIA = "2026-09-28"  # aulas sem data conhecida: ajustar aqui e gerar de novo

# (número da aula, título da aula, data da atividade, .md da atividade)
ATIVIDADES = [
    (1, "Comunicação Profissional e Seus Fundamentos", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (2, "Hardware, Periféricos e Sistemas Operacionais", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
    (3, "Navegação na Web e Pesquisa Acadêmica", "2026-09-28",
     f"{PASTA_TIC}/ATIVIDADES-AULA-03-50-QUESTOES.md"),
    (4, "Comunicação Digital e Colaboração em Nuvem", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-04-50-QUESTOES.md"),
    (5, "Segurança da Informação e Proteção de Dados", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-05-50-QUESTOES.md"),
    (5, "Segurança da Informação e Proteção de Dados", "2026-09-30",
     f"{PASTA_TIC}/AVALIACAO-OBJETIVA-01-QUESTOES.md"),
    (6, "Editor de Textos: Formatação e Estruturação", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-06-50-QUESTOES.md"),
    (7, "Textos Técnicos e Redação Empresarial", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-07-50-QUESTOES.md"),
    (8, "Editor de Planilhas: Organização e Fórmulas", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-08-50-QUESTOES.md"),
    (9, "Planilhas Eletrônicas: Análise Visual e Gráficos", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-09-50-QUESTOES.md"),
    (10, "Editor de Apresentações e TIC", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-10-50-QUESTOES.md"),
    (10, "Editor de Apresentações e TIC", "2026-09-30",
     f"{PASTA_TIC}/AVALIACAO-OBJETIVA-02-QUESTOES.md"),
    (11, "O Ciclo do Feedback na Comunicação", "2026-09-28",
     f"{PASTA_TIC}/ATIVIDADES-AULA-28-09-2026/ATIVIDADES-AULA-28-09-2026-50-QUESTOES.md"),
]

PASTA_FUNDAMENTOS = (
    "MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES"
)

# Rio do Sul Mais Tech: ainda sem turma cadastrada (código da turma CEPLAS não informado);
# o aluno é vinculado à turma pelo app_metadata, não por esta tabela de atividades.
ATIVIDADES_FUNDAMENTOS = [
    (1, "Introdução à Tecnologia e Dispositivos Digitais", "2026-09-29",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-29-09-2026-50-QUESTOES.md"),
    (2, "Cidadania Digital e Segurança Online", "2026-10-06",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-06-10-2026-50-QUESTOES.md"),
    (3, "Ferramentas de Produtividade", "2026-10-27",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-27-10-2026-50-QUESTOES.md"),
    (4, "Ferramentas de Apresentação e Pesquisa Online", "2026-11-03",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-03-11-2026-50-QUESTOES.md"),
    (5, "Introdução aos Algoritmos", "2026-11-10",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-10-11-2026-50-QUESTOES.md"),
]

# Um grupo por matéria: (curso, matéria, atividades). Para outro curso, acrescentar um grupo.
GRUPOS = [
    (CURSO, MATERIA, ATIVIDADES),
    ("Rio do Sul Mais Tech", "Fundamentos da Tecnologia e Programação", ATIVIDADES_FUNDAMENTOS),
]

PADRAO_ITEM = re.compile(r"^## ITEM (\d+) — (.+)$", re.M)
PADRAO_GABARITO = re.compile(r"^\*\*Gabarito:\*\*\s*([A-D])\s*$", re.M)
PADRAO_TITULO_MD = re.compile(r"^# Atividade: (.+?) — \d+ Questões", re.M)


def ler_itens_sem_metadados(caminho):
    """Lê itens e gabarito de um .md sem o cabeçalho de metadados do gerador (ex.: 23/09).

    Args:
        caminho: Caminho do .md.

    Returns:
        Tupla (meta, itens) no mesmo formato de ler_questoes.

    Raises:
        ValueError: Se algum item não tiver gabarito.
    """
    texto = caminho.read_text(encoding="utf-8")
    blocos = re.split(r"(?m)^(?=## ITEM )", texto)[1:]
    itens = []
    for bloco in blocos:
        cabecalho = PADRAO_ITEM.search(bloco)
        gabarito = PADRAO_GABARITO.search(bloco)
        if not cabecalho or not gabarito:
            raise ValueError(f"{caminho.name}: item sem cabeçalho ou gabarito")
        itens.append({"num": cabecalho.group(1), "titulo": cabecalho.group(2).strip(),
                      "gab": gabarito.group(1)})
    titulo = PADRAO_TITULO_MD.search(texto)
    tema = titulo.group(1) if titulo else caminho.stem
    return {"tema": tema, "total": len(itens)}, itens


def localizar_fonte(caminho):
    """Acha o .md da atividade: ao lado da página ou na subpasta CONTEUDO/ dela.

    As fontes podem ter sido movidas para ATIVIDADES/CONTEUDO/ (fora do Git, com gabarito);
    a página continua em ATIVIDADES/, então só a leitura muda de lugar.

    Args:
        caminho: Caminho lógico do .md (ao lado da página HTML).

    Returns:
        Caminho do .md que existe.

    Raises:
        FileNotFoundError: Se o .md não estiver em nenhum dos dois lugares.
    """
    if caminho.exists():
        return caminho
    alternativo = caminho.parent / PASTA_FONTES / caminho.name
    if alternativo.exists():
        return alternativo
    raise FileNotFoundError(f"Fonte não encontrada: {caminho} nem {alternativo}")


def ler_atividade(caminho):
    """Lê a atividade pelo leitor do gerador; sem metadados, usa o leitor simples.

    Args:
        caminho: Caminho lógico do .md (a fonte pode estar em CONTEUDO/).

    Returns:
        Tupla (meta, itens).
    """
    fonte = localizar_fonte(caminho)
    try:
        return ler_questoes(fonte)
    except ValueError:
        return ler_itens_sem_metadados(fonte)


def texto_sql(valor):
    """Escapa um texto para literal SQL entre aspas simples.

    Args:
        valor: Texto a escapar.

    Returns:
        Literal SQL, ex.: 'O''Brien'.
    """
    return "'" + str(valor).replace("'", "''") + "'"


def sql_turmas():
    """Monta o insert das turmas.

    Returns:
        Comando SQL com upsert das turmas.
    """
    linhas = ",\n  ".join(
        f"({texto_sql(c)}, {texto_sql(n)}, {texto_sql(t)}, {texto_sql(h)})"
        for c, n, t, h in TURMAS
    )
    return (
        "insert into public.turma (codigo, nome, turno, horario) values\n  "
        f"{linhas}\non conflict (codigo) do update set nome = excluded.nome, "
        "turno = excluded.turno, horario = excluded.horario;\n"
    )


def sql_curso_materia(curso, materia):
    """Monta o bloco que garante curso e matéria (com curso_id) e o vínculo cursomateria.

    Args:
        curso: Nome completo do curso.
        materia: Descrição da matéria.

    Returns:
        Trecho PL/pgSQL (dentro do bloco DO) que define v_curso e v_materia.
    """
    return f"""  select id into v_curso from public.curso where nome_completo = {texto_sql(curso)} limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ({texto_sql(curso)}) returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = {texto_sql(materia)} limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ({texto_sql(materia)}, v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;
"""


def sql_atividade(numero, titulo_aula, data, caminho_md):
    """Monta o trecho de uma aula, sua atividade e o gabarito.

    Args:
        numero: Número da aula na matéria.
        titulo_aula: Título da aula.
        data: Data da atividade (AAAA-MM-DD).
        caminho_md: Caminho do .md da atividade, relativo à raiz.

    Returns:
        Trecho PL/pgSQL (dentro do bloco DO).
    """
    meta, itens = ler_atividade(RAIZ / caminho_md)
    pagina = "/" + caminho_saida(RAIZ / caminho_md).relative_to(RAIZ).as_posix()
    rotulo = meta.get("rotulo", "")
    nome = rotulo if rotulo.startswith("Avalia") else meta["tema"]
    descricao = f"Atividade — {nome} ({meta['total']} questões)"
    valores = ",\n      ".join(
        f"(v_atividade, {int(it['num'])}, {texto_sql(it['titulo'])}, {texto_sql(it['gab'])})"
        for it in itens
    )
    return f"""
  -- Aula {numero}: {titulo_aula}
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = {texto_sql(titulo_aula)} limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values ({numero}, {texto_sql(titulo_aula)}, v_materia, v_curso, {texto_sql(data)})
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ({texto_sql(nome)}, 'PENDENTE', v_aula, {texto_sql(data)},
      {texto_sql(descricao)}, {texto_sql(pagina)}, {meta['total']})
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      {valores};
"""


def sql_grupo(curso, materia, atividades):
    """Monta o bloco DO de uma matéria: curso, matéria, aulas, atividades e gabarito.

    Args:
        curso: Nome completo do curso.
        materia: Descrição da matéria.
        atividades: Lista (número, título da aula, data, .md).

    Returns:
        Bloco PL/pgSQL completo.
    """
    trechos = "".join(sql_atividade(*atividade) for atividade in atividades)
    return f"""do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
{sql_curso_materia(curso, materia)}{trechos}end $$;
"""


def montar_sql():
    """Monta o arquivo de seed completo.

    Returns:
        Conteúdo SQL.
    """
    blocos = "\n".join(sql_grupo(*grupo) for grupo in GRUPOS)
    return f"""-- Seed gerado por scripts/gerar-seed-atividades.py — não editar à mão.
-- Rodar depois de 2026-09-28-atividades-gabarito.sql. Idempotente.

{sql_turmas()}
{blocos}"""


def main():
    """Gera o arquivo de seed e informa o resumo."""
    ARQUIVO_SAIDA.parent.mkdir(exist_ok=True)
    ARQUIVO_SAIDA.write_text(montar_sql(), encoding="utf-8")
    for curso, materia, atividades in GRUPOS:
        print(f"== {curso} / {materia}")
        for numero, titulo, data, caminho in atividades:
            meta, itens = ler_atividade(RAIZ / caminho)
            print(f"Aula {numero} — {titulo}: {len(itens)} itens no gabarito ({data})")
    print(f"Gerado: {ARQUIVO_SAIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
