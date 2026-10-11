"""Copia as regras do projeto (origem = repositório) para o Supabase, inteiras e por seção.

Regra: `CLAUDE.md` (seção "🗄️ REGRAS NO BANCO"); plano `docs/regras-no-banco.md`
(tarefa #26-55a91111-02ce-4cb1). Tabelas: `regra_documento` (arquivo inteiro) e `regra_secao`
(uma linha por "##" e "###"; o texto antes do primeiro "##" é a seção de nível 1).

Arquivos copiados: o `CLAUDE.md` e os arquivos de regras que ele cita (os mesmos que o menu Regras
mostra: `docs/regras/*.md`, `docs/HISTORICO-REGRAS.md` e `docs/REGRAS-ATIVIDADE-PRATICA.md`).

O script não acessa o banco (nenhuma chave no repositório): ele gera o SQL e lê o JSON que a IA
roda/consulta pelo conector do Supabase.

Uso (na raiz do repositório):
    python3 scripts/regras/sincronizar_regras.py arquivos
        → lista os arquivos copiados
    python3 scripts/regras/sincronizar_regras.py importar <pasta>
        → escreve na pasta um SQL por arquivo (NN-<nome>.sql) e o 99-desativar.sql
    python3 scripts/regras/sincronizar_regras.py consulta
        → SQL que devolve, em JSON, o md5 de cada documento e de cada seção ativa no banco
    python3 scripts/regras/sincronizar_regras.py conferir <banco.json>
        → lista as diferenças entre o banco e o repositório (código de saída 1 se houver)
"""
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ARQUIVO_PRINCIPAL = Path("CLAUDE.md")
PADRAO_ARQUIVOS = re.compile(
    r"\]\((docs/(?:regras/[\w.-]+|HISTORICO-REGRAS|REGRAS-ATIVIDADE-PRATICA)\.md)\)")
PADRAO_VERSAO = re.compile(r"\*\*Versão das regras:\*\*\s*([^\n]+)")
PADRAO_TITULO = re.compile(r"^(#{1,3}) (.+)$")
PADRAO_CERCA = re.compile(r"^\s*(```|~~~)")
NIVEL_INICIO = 1
TITULO_INICIO = "(início do arquivo)"
SEPARADOR_COMANDOS = "\n-- ----- comando -----\n"
CONSULTA_BANCO = (
    "select json_build_object("
    "'documentos', (select coalesce(json_agg(json_build_object('caminho', caminho, "
    "'md5', md5, 'md5_banco', md5(conteudo)) order by caminho), '[]') "
    "from public.regra_documento where ativo), "
    "'secoes', (select coalesce(json_agg(json_build_object('caminho', caminho, 'ordem', ordem, "
    "'md5', md5, 'md5_banco', md5(conteudo)) order by caminho, ordem), '[]') "
    "from public.regra_secao where ativo)) as banco;"
)


def md5_texto(texto):
    """Devolve o md5 (hex) do texto em UTF-8 (o mesmo que `md5()` do Postgres)."""
    return hashlib.md5(texto.encode("utf-8")).hexdigest()


def literal_sql(valor):
    """Converte um texto em literal SQL com aspas dobradas (ou null)."""
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def texto_sql(valor):
    """Converte um texto em literal SQL com dollar quoting (sem escapes)."""
    marcador = "$t$"
    while marcador in valor:
        marcador = marcador[:-1] + "x$"
    return f"{marcador}{valor}{marcador}"


def listar_arquivos():
    """Devolve o CLAUDE.md e os arquivos de regras citados nele, sem repetir e na ordem."""
    texto = ARQUIVO_PRINCIPAL.read_text(encoding="utf-8")
    citados = dict.fromkeys(PADRAO_ARQUIVOS.findall(texto))
    return [ARQUIVO_PRINCIPAL] + [Path(caminho) for caminho in citados if Path(caminho).exists()]


def nova_secao(ordem, nivel, titulo, pai):
    """Cria o dicionário de uma seção vazia."""
    return {"ordem": ordem, "nivel": nivel, "titulo": titulo, "secao_pai": pai, "linhas": []}


def dividir_secoes(texto):
    """Divide o Markdown em seções "##"/"###" (títulos dentro de blocos de código são ignorados).

    Returns:
        list[dict]: ordem, nível, título, seção pai ("##" acima de um "###"), conteúdo e md5.
    """
    secoes = [nova_secao(0, NIVEL_INICIO, TITULO_INICIO, None)]
    em_codigo, pai = False, None
    for linha in texto.split("\n"):
        if PADRAO_CERCA.match(linha):
            em_codigo = not em_codigo
        achou = None if em_codigo else PADRAO_TITULO.match(linha)
        if achou and len(achou.group(1)) > NIVEL_INICIO:
            nivel, titulo = len(achou.group(1)), achou.group(2).strip()
            pai = titulo if nivel == 2 else pai
            secoes.append(nova_secao(len(secoes), nivel, titulo, pai if nivel == 3 else None))
        elif achou and secoes[0]["titulo"] == TITULO_INICIO and len(secoes) == 1:
            secoes[0]["titulo"] = achou.group(2).strip()
        secoes[-1]["linhas"].append(linha)
    for secao in secoes:
        secao["conteudo"] = "\n".join(secao.pop("linhas"))
        secao["md5"] = md5_texto(secao["conteudo"])
    return secoes


def commit_atual():
    """Hash do commit atual do repositório (ou None fora de um repositório Git)."""
    try:
        saida = subprocess.run(["git", "rev-parse", "HEAD"], capture_output=True, text=True,
                               check=True)
    except (OSError, subprocess.CalledProcessError):
        return None
    return saida.stdout.strip()


def sql_documento(caminho, texto, commit):
    """Monta o upsert do arquivo inteiro em `regra_documento`."""
    versao = PADRAO_VERSAO.search(texto)
    return (
        "insert into public.regra_documento (caminho, versao_regras, conteudo, md5, commit_sha, "
        f"ativo, sincronizado_em)\nvalues ({literal_sql(caminho)}, "
        f"{literal_sql(versao.group(1).strip() if versao else None)}, {texto_sql(texto)},\n"
        f"{literal_sql(md5_texto(texto))}, {literal_sql(commit)}, true, now())\n"
        "on conflict (caminho) do update set versao_regras = excluded.versao_regras, "
        "conteudo = excluded.conteudo, md5 = excluded.md5, commit_sha = excluded.commit_sha, "
        "ativo = true, sincronizado_em = now();")


def sql_secoes(caminho, secoes):
    """Monta o upsert das seções do arquivo e desativa as que deixaram de existir."""
    valores = ",\n".join(
        f"({s['ordem']}, {s['nivel']}, {texto_sql(s['titulo'])}, {texto_sql(s['secao_pai'] or '')}, "
        f"{texto_sql(s['conteudo'])}, {literal_sql(s['md5'])})" for s in secoes)
    insere = (
        "insert into public.regra_secao (documento_id, caminho, ordem, nivel, titulo, secao_pai, "
        "conteudo, md5, ativo, sincronizado_em)\n"
        f"select d.id, {literal_sql(caminho)}, v.ordem, v.nivel, v.titulo, nullif(v.secao_pai, ''), "
        "v.conteudo, v.md5, true, now()\n"
        f"from public.regra_documento d, (values\n{valores}\n) "
        "as v (ordem, nivel, titulo, secao_pai, conteudo, md5)\n"
        f"where d.caminho = {literal_sql(caminho)}\n"
        "on conflict (caminho, ordem) do update set documento_id = excluded.documento_id, "
        "nivel = excluded.nivel, titulo = excluded.titulo, secao_pai = excluded.secao_pai, "
        "conteudo = excluded.conteudo, md5 = excluded.md5, ativo = true, sincronizado_em = now();")
    desativa = (
        "update public.regra_secao set ativo = false, sincronizado_em = now()\n"
        f"where caminho = {literal_sql(caminho)} and ordem >= {len(secoes)} and ativo;")
    return insere + SEPARADOR_COMANDOS + desativa


def sql_desativar(caminhos):
    """Desativa documentos e seções de arquivos que deixaram de ser regra."""
    lista = ", ".join(literal_sql(c) for c in caminhos)
    return (
        "update public.regra_documento set ativo = false, sincronizado_em = now()\n"
        f"where caminho not in ({lista}) and ativo;" + SEPARADOR_COMANDOS +
        "update public.regra_secao set ativo = false, sincronizado_em = now()\n"
        f"where caminho not in ({lista}) and ativo;")


def importar(pasta):
    """Escreve na pasta um SQL por arquivo de regras e o SQL que desativa os removidos."""
    destino = Path(pasta)
    destino.mkdir(parents=True, exist_ok=True)
    commit, arquivos = commit_atual(), listar_arquivos()
    for indice, arquivo in enumerate(arquivos, start=1):
        texto = arquivo.read_text(encoding="utf-8")
        caminho = arquivo.as_posix()
        sql = sql_documento(caminho, texto, commit) + SEPARADOR_COMANDOS + sql_secoes(
            caminho, dividir_secoes(texto))
        saida = destino / f"{indice:02d}-{arquivo.stem}.sql"
        saida.write_text(sql + "\n", encoding="utf-8")
        print(f"escrito: {saida} ({len(sql)} caracteres)")
    final = destino / "99-desativar.sql"
    final.write_text(sql_desativar([a.as_posix() for a in arquivos]) + "\n", encoding="utf-8")
    print(f"escrito: {final}")


def esperado_repositorio():
    """md5 esperados: por documento e por (documento, ordem) de seção."""
    documentos, secoes = {}, {}
    for arquivo in listar_arquivos():
        texto = arquivo.read_text(encoding="utf-8")
        caminho = arquivo.as_posix()
        documentos[caminho] = md5_texto(texto)
        for secao in dividir_secoes(texto):
            secoes[(caminho, secao["ordem"])] = secao["md5"]
    return documentos, secoes


def diferencas(esperado, banco, nome):
    """Lista o que falta, sobra ou difere entre o repositório e o banco."""
    saida = []
    for chave, md5 in esperado.items():
        linha = banco.get(chave)
        if linha is None:
            saida.append(f"{nome} falta no banco: {chave}")
        elif linha["md5"] != md5 or linha["md5_banco"] != md5:
            saida.append(f"{nome} diferente: {chave}")
    saida += [f"{nome} sobra no banco: {chave}" for chave in banco if chave not in esperado]
    return saida


def conferir(caminho_json):
    """Compara o JSON do banco (saída da `consulta`) com o repositório; sai 1 se houver diferença."""
    dados = json.loads(Path(caminho_json).read_text(encoding="utf-8"))
    dados = dados.get("banco", dados)
    documentos, secoes = esperado_repositorio()
    banco_docs = {d["caminho"]: d for d in dados["documentos"]}
    banco_secoes = {(s["caminho"], s["ordem"]): s for s in dados["secoes"]}
    erros = diferencas(documentos, banco_docs, "documento") + diferencas(
        secoes, banco_secoes, "seção")
    for erro in erros:
        print(erro)
    print(f"{len(documentos)} documentos e {len(secoes)} seções conferidos; "
          f"{len(erros)} diferença(s)")
    return 1 if erros else 0


def main():
    """Lê o comando da linha de comando e executa."""
    comando = sys.argv[1] if len(sys.argv) > 1 else ""
    if comando == "arquivos":
        print("\n".join(a.as_posix() for a in listar_arquivos()))
    elif comando == "importar" and len(sys.argv) > 2:
        importar(sys.argv[2])
    elif comando == "consulta":
        print(CONSULTA_BANCO)
    elif comando == "conferir" and len(sys.argv) > 2:
        sys.exit(conferir(sys.argv[2]))
    else:
        print(__doc__)
        sys.exit(2)


if __name__ == "__main__":
    main()
