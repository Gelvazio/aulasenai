#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Peças esperadas de uma matéria (padrão da ITIC) e inventário dos arquivos da pasta.

Só lê arquivos. Usado por gerar_status_materia.py para montar o STATUS_MATERIA.md.
"""

import re

ARQUIVO_STATUS_AULAS = "AULAS/STATUS-AULAS.md"
NOME_STATUS_MATERIA = "STATUS_MATERIA.md"
PASTAS_RESUMIDAS = {"_assets", "node_modules", "__pycache__", ".git"}
PADRAO_LINHA_AULA = re.compile(r"^\|\s*(?:Aula\s+)?0*(\d+)\s*\|")
SIMBOLOS_BANCO_OK = ("✅", "⛔")

PECAS_DA_MATERIA = (
    ("Ementa", "EMENTA-CHALKIE-AI.md"),
    ("Dados da matéria", "materia.json"),
    ("Status da ementa", "STATUS-EMENTAS.md"),
    ("Status das aulas", ARQUIVO_STATUS_AULAS),
    ("Status das atividades", "ATIVIDADES/STATUS-ATIVIDADES.md"),
    ("Status da apostila", "APOSTILA/STATUS-APOSTILA.md"),
    ("Índice das atividades", "ATIVIDADES/index.html"),
    ("Menu das atividades", "ATIVIDADES/MENU-ATIVIDADES.js"),
    ("Avaliação objetiva", "ATIVIDADES/AVALIACAO-OBJETIVA-01.html"),
    ("Avaliação prática", "ATIVIDADES/AVALIACAO-PRATICA.html"),
    ("Média final (página)", "ATIVIDADES/AVALIACAO-MEDIA-FINAL.html"),
    ("Média final (composição)", "ATIVIDADES/media-final.json"),
    ("Apostila (HTML)", "APOSTILA/APOSTILA-*.html"),
    ("Apostila (Markdown completo)", "APOSTILA/APOSTILA-*.md"),
)

PECAS_DA_AULA = (
    ("Aula em CONTEUDO/", "CONTEUDO", r"^(?:AULA-)?0*{n}-.*\.md$"),
    ("Objetiva (página)", "ATIVIDADES", r"^ATIVIDADES-AULA-{nn}-.*QUESTOES\.html$"),
    ("Objetiva (fonte)", "ATIVIDADES/CONTEUDO", r"^ATIVIDADES-AULA-{nn}-.*QUESTOES\.md$"),
    ("Prática (página)", "ATIVIDADES", r"^ATIVIDADE-PRATICA-AULA-{nn}\.html$"),
    ("Prática (fonte)", "ATIVIDADES/CONTEUDO", r"^ATIVIDADE-PRATICA-AULA-{nn}\.md$"),
    ("Prática (padrão de resposta)", "ATIVIDADES/CONTEUDO",
     r"^ATIVIDADE-PRATICA-AULA-{nn}-GABARITO\.md$"),
)


def separar_celulas(linha_da_tabela):
    """Separa as células de uma linha de tabela Markdown.

    Args:
        linha_da_tabela: linha que começa com "|".

    Returns:
        list[str]: células sem espaços nas pontas.
    """
    return [celula.strip() for celula in linha_da_tabela.strip().strip("|").split("|")]


def achar_coluna_banco(linha_cabecalho):
    """Acha a posição da coluna "Banco" no cabeçalho da tabela de aulas.

    Args:
        linha_cabecalho: linha "| Aula | ... |".

    Returns:
        int | None: índice da coluna ou None (aí vale a última célula preenchida).
    """
    celulas = separar_celulas(linha_cabecalho)
    return next((indice for indice, celula in enumerate(celulas)
                 if celula.lower().startswith("banco")), None)


def celula_do_banco(linha_da_tabela, coluna_banco):
    """Devolve o texto da célula Banco de uma linha de aula.

    Args:
        linha_da_tabela: linha da aula.
        coluna_banco: índice da coluna Banco ou None.

    Returns:
        str: texto da célula (vazio se não houver).
    """
    celulas = separar_celulas(linha_da_tabela)
    coluna_existe = coluna_banco is not None and coluna_banco < len(celulas)
    if coluna_existe:
        return celulas[coluna_banco]
    return next((celula for celula in reversed(celulas) if celula), "")


def ler_linhas_das_aulas(pasta_materia):
    """Lê a primeira tabela de aulas do AULAS/STATUS-AULAS.md.

    Args:
        pasta_materia: Path da matéria.

    Returns:
        list[tuple[int, str]]: (número da aula, texto da célula Banco), na ordem do arquivo.
    """
    caminho = pasta_materia / ARQUIVO_STATUS_AULAS
    if not caminho.is_file():
        return []
    linhas, coluna_banco = [], None
    for linha in caminho.read_text(encoding="utf-8").splitlines():
        if linha.startswith("| Aula") and not linhas:
            coluna_banco = achar_coluna_banco(linha)
        encontrado = PADRAO_LINHA_AULA.match(linha)
        if encontrado:
            linhas.append((int(encontrado.group(1)), celula_do_banco(linha, coluna_banco)))
            continue
        tabela_acabou = bool(linhas) and not linha.startswith("|")
        if tabela_acabou:
            break
    return linhas


def banco_da_aula_ok(celula_banco):
    """Diz se a célula Banco da aula está ✅ ou ⛔ (não se aplica).

    Args:
        celula_banco: texto da célula Banco.

    Returns:
        bool: True se o banco da aula estiver resolvido.
    """
    return celula_banco.startswith(SIMBOLOS_BANCO_OK)


def procurar_arquivo(pasta, padrao):
    """Procura na pasta (sem subpastas) o primeiro arquivo cujo nome casa com o padrão.

    Args:
        pasta: Path da subpasta.
        padrao: expressão regular do nome do arquivo.

    Returns:
        Path | None: arquivo encontrado ou None.
    """
    if not pasta.is_dir():
        return None
    regra = re.compile(padrao, re.IGNORECASE)
    return next((item for item in sorted(pasta.iterdir())
                 if item.is_file() and regra.match(item.name)), None)


def conferir_aula(pasta_materia, numero, celula_banco):
    """Confere as peças de uma aula (conteúdo, objetiva, prática e banco).

    Args:
        pasta_materia: Path da matéria.
        numero: número da aula.
        celula_banco: texto da célula Banco da aula no STATUS-AULAS.md.

    Returns:
        dict: número e lista de (nome da peça, Path encontrado ou None, ok).
    """
    pecas = []
    for nome, subpasta, modelo in PECAS_DA_AULA:
        padrao = modelo.format(n=numero, nn=f"{numero:02d}")
        arquivo = procurar_arquivo(pasta_materia / subpasta, padrao)
        pecas.append((nome, arquivo, arquivo is not None))
    pecas.append(("Banco (seeds)", None, banco_da_aula_ok(celula_banco)))
    return {"numero": numero, "pecas": pecas}


def conferir_pecas_da_materia(pasta_materia):
    """Confere as peças gerais da matéria (ementa, status, índices, avaliações e apostila).

    Args:
        pasta_materia: Path da matéria.

    Returns:
        list[tuple[str, str, Path | None]]: (nome, caminho esperado, arquivo encontrado).
    """
    resultado = []
    for nome, caminho in PECAS_DA_MATERIA:
        encontrados = sorted(pasta_materia.glob(caminho))
        arquivo = next((item for item in encontrados if item.is_file()), None)
        resultado.append((nome, caminho, arquivo))
    return resultado


def inventariar_arquivos(pasta_materia):
    """Lista todos os arquivos da pasta da matéria (pastas técnicas viram uma linha só).

    Args:
        pasta_materia: Path da matéria.

    Returns:
        tuple[list[Path], dict[str, int]]: arquivos e contagem por pasta resumida.
    """
    arquivos, resumidas = [], {}
    for item in sorted(pasta_materia.rglob("*")):
        partes = item.relative_to(pasta_materia).parts
        pasta_tecnica = next((parte for parte in partes[:-1] if parte in PASTAS_RESUMIDAS), None)
        if not item.is_file() or item.name == NOME_STATUS_MATERIA:
            continue
        if pasta_tecnica:
            chave = "/".join(partes[:partes.index(pasta_tecnica) + 1])
            resumidas[chave] = resumidas.get(chave, 0) + 1
            continue
        arquivos.append(item)
    return arquivos, resumidas
