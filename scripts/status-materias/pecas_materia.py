#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Peças esperadas de uma matéria (regra global de matérias, docs/regras/materias.md) e inventário dos arquivos da pasta.

Só lê arquivos. Usado por gerar_status_materia.py para montar o STATUS_MATERIA.md.
"""

import re

from seeds_materia import RAIZ_PROJETO, pagina_resolvida

ARQUIVO_STATUS_AULAS = "AULAS/STATUS-AULAS.md"
NOME_STATUS_MATERIA = "STATUS_MATERIA.md"
PASTAS_RESUMIDAS = {"_assets", "node_modules", "__pycache__", ".git"}
PADRAO_LINHA_AULA = re.compile(r"^\|\s*(?:Aula\s+)?0*(\d+)\s*\|")
PECAS_COM_SEED = ("Objetiva (página)", "Prática (página)")

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


def ler_numeros_das_aulas(pasta_materia):
    """Lê os números das aulas da primeira tabela do AULAS/STATUS-AULAS.md.

    Args:
        pasta_materia: Path da matéria.

    Returns:
        list[int]: números das aulas, na ordem do arquivo.
    """
    caminho = pasta_materia / ARQUIVO_STATUS_AULAS
    if not caminho.is_file():
        return []
    numeros = []
    for linha in caminho.read_text(encoding="utf-8").splitlines():
        encontrado = PADRAO_LINHA_AULA.match(linha)
        if encontrado:
            numeros.append(int(encontrado.group(1)))
            continue
        tabela_acabou = bool(numeros) and not linha.startswith("|")
        if tabela_acabou:
            break
    return numeros


def banco_da_aula_ok(pecas, por_pagina):
    """Diz se os seeds da objetiva e da prática da aula estão CONCLUÍDO ou SUBSTITUÍDO.

    Args:
        pecas: lista de (nome, arquivo, ok) da aula.
        por_pagina: status do seed por página (seeds_materia.mapear_status_por_pagina).

    Returns:
        bool: True só se as duas páginas existirem e estiverem resolvidas no registro.
    """
    paginas = [arquivo for nome, arquivo, _ in pecas if nome in PECAS_COM_SEED]
    faltou_pagina = len(paginas) < len(PECAS_COM_SEED) or None in paginas
    if faltou_pagina:
        return False
    return all(pagina_resolvida(por_pagina, caminho_da_raiz(pagina)) for pagina in paginas)


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


def caminho_da_raiz(arquivo):
    """Devolve o caminho do arquivo a partir da raiz do projeto, com barras normais.

    Args:
        arquivo: Path dentro do projeto.

    Returns:
        str: caminho relativo (ex.: MATERIAIS/CURSO/MATERIA/ATIVIDADES/x.html).
    """
    return arquivo.relative_to(RAIZ_PROJETO).as_posix()


def conferir_aula(pasta_materia, numero, por_pagina):
    """Confere as peças de uma aula (conteúdo, objetiva, prática e banco).

    Args:
        pasta_materia: Path da matéria.
        numero: número da aula.
        por_pagina: status do seed por página (registro database/SEEDS-APLICADOS.md).

    Returns:
        dict: número e lista de (nome da peça, Path encontrado ou None, ok).
    """
    pecas = []
    for nome, subpasta, modelo in PECAS_DA_AULA:
        padrao = modelo.format(n=numero, nn=f"{numero:02d}")
        arquivo = procurar_arquivo(pasta_materia / subpasta, padrao)
        pecas.append((nome, arquivo, arquivo is not None))
    pecas.append(("Banco (seeds)", None, banco_da_aula_ok(pecas, por_pagina)))
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
