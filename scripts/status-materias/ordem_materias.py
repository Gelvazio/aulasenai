#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Ordem das matérias (regra "ORDEM DAS MATÉRIAS" do CLAUDE.md).

Lê e grava a ordem em tasks/ORDEM-MATERIAS.md. A ordem já gravada nunca muda; matéria nova
entra no fim. Na primeira vez, começa por Banco de Dados (1), Testes de Front-End (2) e
Introdução à TIC (3) e segue com as demais, curso por curso, em ordem alfabética.
"""

import re
from pathlib import Path

RAIZ_PROJETO = Path(__file__).resolve().parent.parent.parent
PASTA_MATERIAIS = RAIZ_PROJETO / "MATERIAIS"
ARQUIVO_ORDEM = RAIZ_PROJETO / "tasks" / "ORDEM-MATERIAS.md"
PASTAS_QUE_NAO_SAO_CURSO = {"MATERIAS-GERAIS", "AGENDA_COLABORADOR"}
ARQUIVOS_QUE_MARCAM_MATERIA = ("EMENTA-CHALKIE-AI.md", "materia.json")
PRIMEIRAS_MATERIAS = (
    "MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS",
    "MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND",
    "MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC",
)
PADRAO_CAMINHO_NA_TABELA = re.compile(r"^\|\s*\d+\s*\|.*`(MATERIAIS/[^`]+)`\s*\|\s*$")


def caminho_relativo(pasta):
    """Devolve o caminho da pasta a partir da raiz do projeto, com barras normais.

    Args:
        pasta: Path dentro do projeto.

    Returns:
        str: caminho relativo (ex.: MATERIAIS/CURSO/MATERIA).
    """
    return pasta.relative_to(RAIZ_PROJETO).as_posix()


def eh_pasta_de_materia(pasta):
    """Diz se a pasta é uma matéria (tem ementa ou materia.json na raiz).

    Args:
        pasta: pasta dentro de um curso.

    Returns:
        bool: True se for matéria.
    """
    return any((pasta / nome).is_file() for nome in ARQUIVOS_QUE_MARCAM_MATERIA)


def listar_materias():
    """Lista as pastas de matéria de todos os cursos de MATERIAIS/.

    Returns:
        list[str]: caminhos relativos das matérias, curso a curso, em ordem alfabética.
    """
    if not PASTA_MATERIAIS.is_dir():
        return []
    materias = []
    for curso in sorted(PASTA_MATERIAIS.iterdir()):
        eh_curso = curso.is_dir() and curso.name not in PASTAS_QUE_NAO_SAO_CURSO
        if not eh_curso:
            continue
        materias += [
            caminho_relativo(pasta) for pasta in sorted(curso.iterdir())
            if pasta.is_dir() and eh_pasta_de_materia(pasta)
        ]
    return materias


def ler_ordem_gravada():
    """Lê a ordem já gravada em tasks/ORDEM-MATERIAS.md.

    Returns:
        list[str]: caminhos das matérias na ordem gravada (vazia se o arquivo não existir).
    """
    if not ARQUIVO_ORDEM.is_file():
        return []
    ordem = []
    for linha in ARQUIVO_ORDEM.read_text(encoding="utf-8").splitlines():
        encontrado = PADRAO_CAMINHO_NA_TABELA.match(linha)
        if encontrado and encontrado.group(1) not in ordem:
            ordem.append(encontrado.group(1))
    return ordem


def montar_ordem(materias_existentes):
    """Monta a ordem final: a gravada primeiro, depois as matérias novas no fim.

    Args:
        materias_existentes: caminhos das matérias encontradas agora.

    Returns:
        list[str]: caminhos na ordem oficial (só matérias que existem).
    """
    gravada = ler_ordem_gravada() or list(PRIMEIRAS_MATERIAS)
    ordem = [caminho for caminho in gravada if caminho in materias_existentes]
    ordem += [caminho for caminho in materias_existentes if caminho not in ordem]
    return ordem
