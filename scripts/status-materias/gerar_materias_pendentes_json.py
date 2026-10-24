#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera o materias-pendentes.json lido pela página materias-pendentes.html (#357).

Lê o STATUS_MATERIA.md de cada matéria (MATERIAIS/<CURSO>/<MATÉRIA>/) e grava, na raiz do
projeto, só o que a página precisa: situação, quantidade de peças e o ✅/⬜ de cada peça e de cada
aula. Não copia gabarito nem resposta: o STATUS_MATERIA.md só traz nomes de arquivo e marcas.

Uso (na raiz do repositório): python scripts/status-materias/gerar_materias_pendentes_json.py
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

RAIZ_PROJETO = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RAIZ_PROJETO / "assets" / "gerador-indices"))
from gerar_indices import IDS_CURSO_BANCO  # noqa: E402  (fonte única do id do curso no banco)

PASTA_MATERIAIS = RAIZ_PROJETO / "MATERIAIS"
ARQUIVO_SAIDA = RAIZ_PROJETO / "materias-pendentes.json"
NOME_STATUS_MATERIA = "STATUS_MATERIA.md"
MARCA_OK = "✅"
SECAO_PECAS = "## 1."
SECAO_AULAS = "## 2."
INICIO_SECAO = "## "
PADRAO_SITUACAO = re.compile(
    r"\*\*Situação:\*\*\s*\*\*(?P<situacao>.+?)\*\*\s*—\s*"
    r"(?P<ok>\d+) de (?P<total>\d+) peças \((?P<percentual>\d+)%\)"
)
PADRAO_SEPARADOR = re.compile(r"^[\s:\-|]+$")
COLUNA_AULA = "Aula"
COLUNA_PECA = "Peça"
COLUNA_ARQUIVO = "Arquivo esperado"
COLUNA_STATUS = "Status"


def dividir_celulas(linha):
    """Divide uma linha de tabela Markdown em células (aceita o prefixo '||' de alguns arquivos).

    Args:
        linha: Linha que começa com '|'.

    Returns:
        Lista de textos das células, sem espaços nas pontas.
    """
    return [celula.strip() for celula in linha.strip().strip("|").lstrip("|").split("|")]


def extrair_tabela(linhas):
    """Transforma as linhas de uma tabela Markdown em lista de dicionários (cabeçalho = chaves).

    Args:
        linhas: Linhas da seção (a tabela é o trecho de linhas que começam com '|').

    Returns:
        Lista de dicionários, uma por linha de dados; vazia se não houver tabela.
    """
    tabela = [dividir_celulas(l) for l in linhas if l.lstrip().startswith("|")]
    tabela = [l for l in tabela if not PADRAO_SEPARADOR.match("|".join(l))]
    if len(tabela) < 2:
        return []
    cabecalho = tabela[0]
    return [dict(zip(cabecalho, celulas)) for celulas in tabela[1:]]


def separar_secoes(texto):
    """Separa o Markdown nas seções '## N. ...'.

    Args:
        texto: Conteúdo do STATUS_MATERIA.md.

    Returns:
        Dicionário {título da seção (começa em '## N.'): linhas da seção}.
    """
    secoes, atual = {}, None
    for linha in texto.splitlines():
        if linha.startswith(INICIO_SECAO):
            atual = linha
            secoes[atual] = []
        elif atual:
            secoes[atual].append(linha)
    return secoes


def achar_secao(secoes, prefixo):
    """Devolve as linhas da seção cujo título começa com o prefixo (ex.: '## 1.').

    Args:
        secoes: Resultado de separar_secoes.
        prefixo: Início do título.

    Returns:
        Linhas da seção, ou lista vazia.
    """
    return next((linhas for titulo, linhas in secoes.items() if titulo.startswith(prefixo)), [])


def montar_pecas(linhas):
    """Monta a lista de peças da matéria (nome, arquivo esperado, se está pronta).

    Args:
        linhas: Linhas da seção '## 1.'.

    Returns:
        Lista de {"peca", "arquivo", "ok"}.
    """
    return [
        {
            "peca": linha.get(COLUNA_PECA, ""),
            "arquivo": linha.get(COLUNA_ARQUIVO, "").strip("`"),
            "ok": MARCA_OK in linha.get(COLUNA_STATUS, ""),
        }
        for linha in extrair_tabela(linhas)
    ]


def montar_aulas(linhas):
    """Monta as aulas: cada coluna da tabela vira uma peça marcada como pronta ou não.

    Args:
        linhas: Linhas da seção '## 2.'.

    Returns:
        Lista de {"aula": "01", "pecas": {"Objetiva (página)": true, ...}}.
    """
    aulas = []
    for linha in extrair_tabela(linhas):
        numero = linha.get(COLUNA_AULA, "")
        pecas = {nome: MARCA_OK in valor for nome, valor in linha.items() if nome != COLUNA_AULA}
        aulas.append({"aula": numero, "pecas": pecas})
    return aulas


def ler_materia(arquivo_status):
    """Lê o STATUS_MATERIA.md de uma matéria.

    Args:
        arquivo_status: Caminho de MATERIAIS/<CURSO>/<MATÉRIA>/STATUS_MATERIA.md.

    Returns:
        Dicionário da matéria, ou None se o arquivo não tiver a linha de Situação.
    """
    texto = arquivo_status.read_text(encoding="utf-8")
    achado = PADRAO_SITUACAO.search(texto)
    if not achado:
        return None
    secoes = separar_secoes(texto)
    return {
        "curso": arquivo_status.parents[1].name,
        "curso_id": IDS_CURSO_BANCO.get(arquivo_status.parents[1].name),
        "materia": arquivo_status.parent.name,
        "situacao": achado["situacao"].strip(),
        "pecas_ok": int(achado["ok"]),
        "pecas_total": int(achado["total"]),
        "percentual": int(achado["percentual"]),
        "pecas": montar_pecas(achar_secao(secoes, SECAO_PECAS)),
        "aulas": montar_aulas(achar_secao(secoes, SECAO_AULAS)),
    }


def listar_materias():
    """Lê todos os STATUS_MATERIA.md de MATERIAIS/<CURSO>/<MATÉRIA>/ em ordem alfabética.

    Returns:
        Tupla (matérias lidas, caminhos sem a linha de Situação).
    """
    materias, ignorados = [], []
    for arquivo in sorted(PASTA_MATERIAIS.glob(f"*/*/{NOME_STATUS_MATERIA}")):
        materia = ler_materia(arquivo)
        if materia:
            materias.append(materia)
        else:
            ignorados.append(arquivo.relative_to(RAIZ_PROJETO))
    return materias, ignorados


def main():
    """Gera o materias-pendentes.json e imprime o resumo."""
    materias, ignorados = listar_materias()
    saida = {"gerado_em": datetime.now().strftime("%Y-%m-%d %H:%M"), "materias": materias}
    ARQUIVO_SAIDA.write_text(json.dumps(saida, ensure_ascii=False, indent=1) + "\n", "utf-8")
    pendentes = sum(1 for m in materias if m["pecas_ok"] < m["pecas_total"])
    print(f"materias: {len(materias)} · pendentes: {pendentes} · gravado: {ARQUIVO_SAIDA.name}")
    for caminho in ignorados:
        print(f"  sem linha de Situação (ignorada): {caminho}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
