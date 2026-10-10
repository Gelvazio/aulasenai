#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Análise das matérias no padrão da matéria modelo (Introdução à TIC).

Percorre todos os cursos de MATERIAIS/ (menos as pastas que não são curso), confere em cada
matéria as peças da ITIC (ementa, materia.json, aulas, atividades e apostila) e grava o
relatório em tasks/ANALISE-MATERIAS-RELATORIO.json. Só lê arquivos; não altera nada.
"""

import json
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "status-materias"))

from ordem_materias import montar_ordem  # noqa: E402

RAIZ_PROJETO = Path(__file__).resolve().parent.parent
PASTA_MATERIAIS = RAIZ_PROJETO / "MATERIAIS"
ARQUIVO_RELATORIO = RAIZ_PROJETO / "tasks" / "ANALISE-MATERIAS-RELATORIO.json"
PASTAS_QUE_NAO_SAO_CURSO = {"MATERIAS-GERAIS", "AGENDA_COLABORADOR"}
ARQUIVOS_QUE_MARCAM_MATERIA = ("EMENTA-CHALKIE-AI.md", "materia.json")
TAMANHO_MINIMO_EMENTA = 14800
TAMANHO_MAXIMO_EMENTA = 14950
VERSAO_PADRAO = "Matéria modelo: Introdução à TIC (CLAUDE.md, 2026-10-03)"

PECAS_ARQUIVO = {
    "ementa": "EMENTA-CHALKIE-AI.md",
    "materia_json": "materia.json",
    "status_aulas": "AULAS/STATUS-AULAS.md",
    "indice_atividades": "ATIVIDADES/index.html",
    "status_atividades": "ATIVIDADES/STATUS-ATIVIDADES.md",
    "status_apostila": "APOSTILA/STATUS-APOSTILA.md",
    "status_materia": "STATUS_MATERIA.md",
}

CONTAGENS = {
    "aulas_conteudo": ("CONTEUDO", "*.md"),
    "fontes_atividades": ("ATIVIDADES/CONTEUDO", "*.md"),
    "atividades_50_questoes": ("ATIVIDADES", "ATIVIDADES-AULA-*-50-QUESTOES.html"),
    "atividades_praticas": ("ATIVIDADES", "ATIVIDADE-PRATICA-AULA-*.html"),
    "apostila_html": ("APOSTILA", "APOSTILA-*.html"),
}

PENDENCIA_POR_PECA = {
    "ementa": "Criar EMENTA-CHALKIE-AI.md na raiz da matéria",
    "materia_json": "Criar materia.json (copiado da ementa)",
    "status_aulas": "Criar AULAS/STATUS-AULAS.md",
    "indice_atividades": "Gerar ATIVIDADES/index.html",
    "status_atividades": "Criar ATIVIDADES/STATUS-ATIVIDADES.md",
    "status_apostila": "Criar APOSTILA/STATUS-APOSTILA.md",
    "status_materia": "Gerar STATUS_MATERIA.md (scripts/status-materias/gerar_status_materia.py)",
    "aulas_conteudo": "Extrair as aulas da ementa para CONTEUDO/",
    "fontes_atividades": "Criar as fontes das atividades em ATIVIDADES/CONTEUDO/",
    "atividades_50_questoes": "Gerar a atividade objetiva de 50 questões de cada aula",
    "apostila_html": "Gerar a apostila (APOSTILA/APOSTILA-<MATERIA>.html)",
}


def listar_cursos():
    """Lista as pastas de curso em MATERIAIS/.

    Returns:
        list[Path]: pastas de curso, em ordem alfabética.
    """
    if not PASTA_MATERIAIS.is_dir():
        return []
    return sorted(
        pasta for pasta in PASTA_MATERIAIS.iterdir()
        if pasta.is_dir() and pasta.name not in PASTAS_QUE_NAO_SAO_CURSO
        and not pasta.name.startswith(".")
    )


def eh_pasta_de_materia(pasta):
    """Diz se a pasta é uma matéria (tem ementa ou materia.json na raiz).

    Args:
        pasta: pasta dentro de um curso.

    Returns:
        bool: True se for matéria.
    """
    return any((pasta / nome).is_file() for nome in ARQUIVOS_QUE_MARCAM_MATERIA)


def medir_ementa(pasta_materia):
    """Mede a ementa em caracteres (acento = 1), como manda a regra das ementas.

    Args:
        pasta_materia: pasta da matéria.

    Returns:
        dict | None: tamanho e se está na faixa; None se não houver ementa.
    """
    caminho = pasta_materia / PECAS_ARQUIVO["ementa"]
    if not caminho.is_file():
        return None
    tamanho = len(caminho.read_text(encoding="utf-8"))
    dentro_da_faixa = TAMANHO_MINIMO_EMENTA <= tamanho <= TAMANHO_MAXIMO_EMENTA
    return {"caracteres": tamanho, "dentro_da_faixa": dentro_da_faixa}


def contar_arquivos(pasta_materia):
    """Conta as peças de cada tipo (aulas, fontes, atividades, apostila).

    Args:
        pasta_materia: pasta da matéria.

    Returns:
        dict: quantidade por tipo de peça.
    """
    contagem = {}
    for chave, (subpasta, padrao) in CONTAGENS.items():
        pasta = pasta_materia / subpasta
        contagem[chave] = len(list(pasta.glob(padrao))) if pasta.is_dir() else 0
    return contagem


def listar_pendencias(pecas, contagem, ementa):
    """Monta a lista de pendências da matéria a partir do que falta.

    Args:
        pecas: dict peça -> existe (bool).
        contagem: dict tipo -> quantidade.
        ementa: resultado de medir_ementa.

    Returns:
        list[str]: pendências em linguagem simples.
    """
    pendencias = [PENDENCIA_POR_PECA[peca] for peca, existe in pecas.items() if not existe]
    pendencias += [
        PENDENCIA_POR_PECA[chave] for chave, quantidade in contagem.items()
        if quantidade == 0 and chave in PENDENCIA_POR_PECA
    ]
    ementa_fora_da_faixa = ementa is not None and not ementa["dentro_da_faixa"]
    if ementa_fora_da_faixa:
        pendencias.append(
            f"Ajustar a ementa para {TAMANHO_MINIMO_EMENTA}–{TAMANHO_MAXIMO_EMENTA} caracteres "
            f"(hoje {ementa['caracteres']})"
        )
    return pendencias


def analisar_materia(curso, pasta_materia):
    """Confere uma matéria no padrão da ITIC.

    Args:
        curso: nome da pasta do curso.
        pasta_materia: pasta da matéria.

    Returns:
        dict: resultado da matéria para o relatório.
    """
    pecas = {
        peca: (pasta_materia / caminho).is_file() for peca, caminho in PECAS_ARQUIVO.items()
    }
    contagem = contar_arquivos(pasta_materia)
    ementa = medir_ementa(pasta_materia)
    pendencias = listar_pendencias(pecas, contagem, ementa)
    return {
        "curso": curso,
        "materia": pasta_materia.name,
        "caminho": pasta_materia.relative_to(RAIZ_PROJETO).as_posix(),
        "completa": not pendencias,
        "pecas": pecas,
        "contagem": contagem,
        "ementa": ementa,
        "pendencias": pendencias,
    }


def analisar_curso(pasta_curso):
    """Analisa todas as matérias de um curso.

    Args:
        pasta_curso: pasta do curso em MATERIAIS/.

    Returns:
        tuple[list, list]: (matérias analisadas, pastas ignoradas por não serem matéria).
    """
    materias, ignoradas = [], []
    for pasta in sorted(p for p in pasta_curso.iterdir() if p.is_dir()):
        if eh_pasta_de_materia(pasta):
            materias.append(analisar_materia(pasta_curso.name, pasta))
        else:
            ignoradas.append(pasta.relative_to(RAIZ_PROJETO).as_posix())
    return materias, ignoradas


def ordenar_pela_ordem_oficial(materias):
    """Ordena as matérias pela ordem de tasks/ORDEM-MATERIAS.md (regra do CLAUDE.md).

    Args:
        materias: resultados de analisar_materia.

    Returns:
        list[dict]: as mesmas matérias, na ordem oficial, cada uma com o campo "ordem".
    """
    ordem = montar_ordem([materia["caminho"] for materia in materias])
    posicao = {caminho: indice for indice, caminho in enumerate(ordem, start=1)}
    for materia in materias:
        materia["ordem"] = posicao[materia["caminho"]]
    return sorted(materias, key=lambda materia: materia["ordem"])


def montar_relatorio():
    """Percorre todos os cursos e monta o relatório completo.

    Returns:
        dict: relatório pronto para gravar em JSON.
    """
    materias, ignoradas = [], []
    cursos = listar_cursos()
    for pasta_curso in cursos:
        materias_curso, ignoradas_curso = analisar_curso(pasta_curso)
        materias += materias_curso
        ignoradas += ignoradas_curso
    materias = ordenar_pela_ordem_oficial(materias)
    completas = sum(1 for materia in materias if materia["completa"])
    return {
        "gerado_em": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "padrao": VERSAO_PADRAO,
        "pastas_que_nao_sao_curso": sorted(PASTAS_QUE_NAO_SAO_CURSO),
        "faixa_ementa": [TAMANHO_MINIMO_EMENTA, TAMANHO_MAXIMO_EMENTA],
        "cursos": [pasta.name for pasta in cursos],
        "total_materias": len(materias),
        "completas": completas,
        "incompletas": len(materias) - completas,
        "materias": materias,
        "pastas_ignoradas_sem_ementa_nem_materia_json": ignoradas,
    }


def main():
    """Gera o relatório e mostra o resumo no terminal."""
    relatorio = montar_relatorio()
    ARQUIVO_RELATORIO.parent.mkdir(parents=True, exist_ok=True)
    ARQUIVO_RELATORIO.write_text(
        json.dumps(relatorio, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"Cursos: {len(relatorio['cursos'])} | Matérias: {relatorio['total_materias']} | "
          f"Completas: {relatorio['completas']} | Incompletas: {relatorio['incompletas']}")
    print(f"Relatório: {ARQUIVO_RELATORIO.relative_to(RAIZ_PROJETO).as_posix()}")


if __name__ == "__main__":
    main()
