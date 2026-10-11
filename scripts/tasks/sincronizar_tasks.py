"""Sincroniza a tabela `tasks` (Supabase) com o GitHub: toda task existe nos dois lados.

Regra: `docs/regras/tarefas-agendadas.md` (seção da fila `tasks`); plano
`docs/fila-tasks-agendador-unico.md` (tarefa #24-9fb25086-5b51-44cb).

- Tarefa do `tasks/TASKS.md` → linha na tabela (`origem = 'repositorio'`, entra com `executar = false`).
- Linha criada na página `tasks.html` → arquivo `tasks/fila/TASK-NNNN.md` no Git.
- Texto da tarefa do `TASKS.md` vence no banco; status, ON/OFF e resultado vêm da tabela.

O script não acessa o banco (nenhuma chave no repositório): ele gera o SQL e lê o JSON que a IA
roda/consulta pelo conector do Supabase.

Uso (na raiz do repositório):
    python3 scripts/tasks/sincronizar_tasks.py consulta
        → SQL que devolve todas as linhas da tabela em JSON (salvar o array num arquivo)
    python3 scripts/tasks/sincronizar_tasks.py importar
        → SQL idempotente: tarefas do TASKS.md na tabela; as que saíram do TASKS.md são fechadas
    python3 scripts/tasks/sincronizar_tasks.py exportar <linhas.json>
        → escreve tasks/fila/TASK-NNNN.md e imprime o SQL que grava md5_md e sincronizado_em
    python3 scripts/tasks/sincronizar_tasks.py conferir <linhas.json>
        → lista as diferenças entre a tabela e o Git (código de saída 1 se houver)
"""
import hashlib
import json
import re
import sys
from pathlib import Path

ARQUIVO_TASKS = Path("tasks/TASKS.md")
ARQUIVO_STATUS = Path("tasks/STATUS.md")
PADRAO_CANCELADA = re.compile(r"^\| (#[0-9a-f-]+) \|[^\n]*⛔ Cancelada", re.M)
PASTA_FILA = Path("tasks/fila")
PADRAO_TITULO = re.compile(r"^### (#\d+(?:-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4})?):\s*(.+)$")
STATUS_ABERTOS = ("pendente", "recusada", "erro")
SEPARADOR_COMANDOS = "\n-- ----- comando -----\n"
# Datas no horário de Brasília e no formato do arquivo (o `conferir` compara o texto exato).
CONSULTA_LINHAS = (
    "select coalesce(json_agg(to_jsonb(t) || jsonb_build_object("
    "'criado_em', to_char(t.criado_em at time zone 'America/Sao_Paulo', 'YYYY-MM-DD HH24:MI'), "
    "'executar_apos', to_char(t.executar_apos at time zone 'America/Sao_Paulo', "
    "'YYYY-MM-DD HH24:MI')) order by t.id), '[]'::json) as linhas from public.tasks t;"
)
CAMPOS_ARQUIVO = (
    ("Código", "codigo"), ("Status", "status"), ("Ordem", "ordem"),
    ("Depende das tasks (ids)", "task_dependente"), ("Prioridade", "prioridade"),
    ("Executar (ON/OFF)", "executar"), ("Executar após", "executar_apos"),
    ("Tentativas", "tentativas"), ("Máximo de tentativas", "max_tentativas"),
    ("Excluída", "excluido"), ("PR", "pr_url"), ("Commit", "commit_sha"),
    ("Criada em", "criado_em"),
)


def md5_texto(texto):
    """Devolve o md5 (hex) do texto em UTF-8."""
    return hashlib.md5(texto.encode("utf-8")).hexdigest()


def literal_sql(valor):
    """Converte um texto Python em literal SQL com aspas dobradas (ou null)."""
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def ler_tarefas_repositorio():
    """Lê os blocos `### #NN...: Título` do TASKS.md.

    Returns:
        list[dict]: código, título, instrução (texto do bloco) e md5 do bloco, na ordem do arquivo.
    """
    tarefas, atual = [], None
    for linha in ARQUIVO_TASKS.read_text(encoding="utf-8").splitlines():
        achou = PADRAO_TITULO.match(linha)
        if achou:
            atual = {"codigo": achou.group(1), "titulo": achou.group(2).strip(), "linhas": []}
            tarefas.append(atual)
        elif linha.strip() == "---" or linha.startswith("## "):
            atual = None
        elif atual is not None:
            atual["linhas"].append(linha)
    for tarefa in tarefas:
        tarefa["instrucao"] = "\n".join(tarefa.pop("linhas")).strip()
        tarefa["md5"] = md5_texto(tarefa["titulo"] + "\n" + tarefa["instrucao"])
    return tarefas


def texto_sql(valor):
    """Converte um texto em literal SQL com dollar quoting (sem escapes; seguro para copiar)."""
    marcador = "$t$"
    while marcador in valor:
        marcador = marcador[:-1] + "x$"
    return f"{marcador}{valor}{marcador}"


def sql_importar_tarefa(tarefa):
    """Monta o insert/update de uma tarefa do TASKS.md (o md5 é gravado depois, pelo banco)."""
    arquivo = literal_sql(f"{ARQUIVO_TASKS}#{tarefa['codigo']}")
    return (
        "insert into public.tasks (codigo, titulo, instrucao, arquivo_md, origem, executar, "
        f"sincronizado_em)\nvalues ({literal_sql(tarefa['codigo'])}, {texto_sql(tarefa['titulo'])}, "
        f"{texto_sql(tarefa['instrucao'])},\n{arquivo}, 'repositorio', false, now())\n"
        "on conflict (codigo) do update set titulo = excluded.titulo, instrucao = "
        "excluded.instrucao, sincronizado_em = now()\n"
        f"where tasks.md5_md is distinct from {literal_sql(tarefa['md5'])};")


def ler_canceladas_status():
    """Códigos das tarefas marcadas "⛔ Cancelada" no "📌 Tarefas" do tasks/STATUS.md."""
    return PADRAO_CANCELADA.findall(ARQUIVO_STATUS.read_text(encoding="utf-8"))


def sql_importar(tarefas):
    """Monta o SQL que leva as tarefas do TASKS.md para a tabela e fecha as que saíram dele."""
    comandos = [sql_importar_tarefa(tarefa) for tarefa in tarefas]
    # md5 calculado pelo banco sobre o texto gravado: se o texto chegar diferente do Git
    # (cópia errada), o `conferir` acusa, porque o md5 do banco não bate com o do arquivo.
    comandos.append(
        "update public.tasks set md5_md = md5(titulo || chr(10) || instrucao)\n"
        "where origem = 'repositorio' and md5_md is distinct from md5(titulo || chr(10) || instrucao);")
    codigos = ", ".join(literal_sql(t["codigo"]) for t in tarefas) or "''"
    abertos = ", ".join(literal_sql(s) for s in STATUS_ABERTOS)
    canceladas = ", ".join(literal_sql(c) for c in ler_canceladas_status()) or "''"
    comandos.append(
        "update public.tasks set status = 'cancelada', executar = false, sincronizado_em = now(), "
        "resultado = coalesce(resultado || E'\\n', '') || 'Cancelada no tasks/STATUS.md'\n"
        f"where origem = 'repositorio' and codigo in ({canceladas}) and codigo not in ({codigos}) "
        f"and status in ({abertos});")
    comandos.append(
        "update public.tasks set status = 'concluida', executar = false, sincronizado_em = now(), "
        "resultado = coalesce(resultado || E'\\n', '') || 'Bloco removido do tasks/TASKS.md "
        "(concluída ou cancelada; ver tasks/STATUS.md)'\n"
        f"where origem = 'repositorio' and codigo not in ({codigos}) and status in ({abertos});")
    return SEPARADOR_COMANDOS.join(comandos)


def formatar_valor(valor):
    """Formata um campo da tabela para o Markdown (vazio = "—", booleano = Sim/Não)."""
    if isinstance(valor, bool):
        return "Sim" if valor else "Não"
    if isinstance(valor, list):
        return ", ".join(str(item) for item in valor) or "—"
    return "—" if valor in (None, "") else str(valor)


def montar_arquivo_task(linha):
    """Gera o Markdown de uma task criada na página (conteúdo determinístico)."""
    partes = [f"# {linha['codigo']} — {linha['titulo']}", "",
              "> Gerado por `scripts/tasks/sincronizar_tasks.py exportar` a partir da tabela "
              "`tasks` (não editar à mão; editar na página `tasks.html`).", "",
              "| Campo | Valor |", "|---|---|"]
    for rotulo, chave in CAMPOS_ARQUIVO:
        partes.append(f"| {rotulo} | {formatar_valor(linha.get(chave))} |")
    partes += ["", "## Instrução", "", linha["instrucao"].strip(), "",
               "## Resultado", "", (linha.get("resultado") or "—").strip(), ""]
    return "\n".join(partes)


def ler_linhas(caminho):
    """Lê o JSON (array de linhas da tabela) salvo da consulta pelo conector."""
    dados = json.loads(Path(caminho).read_text(encoding="utf-8"))
    if isinstance(dados, list) and dados and "linhas" in dados[0]:
        dados = dados[0]["linhas"]
    return dados or []


def linhas_da_pagina(linhas):
    """Filtra as linhas que precisam de arquivo próprio em tasks/fila/."""
    return [linha for linha in linhas if linha.get("origem") == "pagina"]


def exportar(linhas):
    """Escreve os arquivos de tasks/fila/ e devolve o SQL que grava o md5 de cada um."""
    PASTA_FILA.mkdir(parents=True, exist_ok=True)
    comandos = []
    for linha in linhas_da_pagina(linhas):
        conteudo = montar_arquivo_task(linha)
        destino = PASTA_FILA / f"{linha['codigo']}.md"
        if not destino.exists() or destino.read_text(encoding="utf-8") != conteudo:
            destino.write_text(conteudo, encoding="utf-8")
            print(f"escrito: {destino}", file=sys.stderr)
        md5 = md5_texto(conteudo)
        if linha.get("md5_md") != md5:
            comandos.append(
                f"update public.tasks set md5_md = {literal_sql(md5)}, sincronizado_em = now() "
                f"where id = {int(linha['id'])};")
    return "\n".join(comandos)


def diferencas_repositorio(tarefas, linhas):
    """Lista as diferenças das tarefas do TASKS.md em relação à tabela."""
    por_codigo = {linha["codigo"]: linha for linha in linhas}
    saida = []
    for tarefa in tarefas:
        linha = por_codigo.get(tarefa["codigo"])
        if linha is None:
            saida.append(f"falta na tabela: {tarefa['codigo']} ({tarefa['titulo']})")
        elif linha.get("md5_md") != tarefa["md5"]:
            saida.append(f"texto diferente na tabela: {tarefa['codigo']}")
    codigos = {t["codigo"] for t in tarefas}
    for linha in linhas:
        fora = linha.get("origem") == "repositorio" and linha["codigo"] not in codigos
        if fora and linha.get("status") in STATUS_ABERTOS:
            saida.append(f"aberta na tabela, mas fora do TASKS.md: {linha['codigo']}")
    return saida


def diferencas_fila(linhas):
    """Lista as tasks da página sem arquivo (ou com arquivo diferente) em tasks/fila/."""
    saida = []
    for linha in linhas_da_pagina(linhas):
        destino = PASTA_FILA / f"{linha['codigo']}.md"
        if not destino.exists():
            saida.append(f"falta no GitHub: {destino}")
        elif destino.read_text(encoding="utf-8") != montar_arquivo_task(linha):
            saida.append(f"arquivo desatualizado: {destino}")
    codigos = {f"{linha['codigo']}.md" for linha in linhas}
    for arquivo in sorted(PASTA_FILA.glob("TASK-*.md")):
        if arquivo.name not in codigos:
            saida.append(f"arquivo sem linha na tabela: {arquivo}")
    return saida


def main():
    """Lê o comando da linha de comando e executa a ação pedida."""
    comando = sys.argv[1] if len(sys.argv) > 1 else ""
    if comando == "consulta":
        print(CONSULTA_LINHAS)
        return
    if comando == "importar":
        print(sql_importar(ler_tarefas_repositorio()))
        return
    if comando not in ("exportar", "conferir") or len(sys.argv) < 3:
        sys.exit(__doc__)
    linhas = ler_linhas(sys.argv[2])
    if comando == "exportar":
        print(exportar(linhas))
        return
    diferencas = diferencas_repositorio(ler_tarefas_repositorio(), linhas) + diferencas_fila(linhas)
    print("\n".join(diferencas) if diferencas else "OK: tabela e GitHub iguais")
    sys.exit(1 if diferencas else 0)


if __name__ == "__main__":
    main()
