#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera o STATUS_MATERIA.md de cada matéria e o tasks/ORDEM-MATERIAS.md.

Regra "STATUS_MATERIA E ORDEM DAS MATÉRIAS" do CLAUDE.md: o status de cada matéria
(⬜ NÃO INICIADA, 🔄 PENDENTE ou ✅ CONCLUÍDA) sai dos arquivos da pasta, conferidos contra as
peças do padrão da ITIC. Só lê as matérias e grava os dois tipos de arquivo de status.

Uso (na raiz do repositório): python3 scripts/status-materias/gerar_status_materia.py
"""

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from ordem_materias import (  # noqa: E402
    ARQUIVO_ORDEM, RAIZ_PROJETO, listar_materias, montar_ordem,
)
from pecas_materia import (  # noqa: E402
    NOME_STATUS_MATERIA, conferir_aula, conferir_pecas_da_materia,
    inventariar_arquivos, ler_linhas_das_aulas,
)

COMANDO_DATA = ["bash", "-c", 'TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M:%S"']
SITUACAO_CONCLUIDA = "✅ CONCLUÍDA"
SITUACAO_PENDENTE = "🔄 PENDENTE"
SITUACAO_NAO_INICIADA = "⬜ NÃO INICIADA"
MARCA_OK = "✅"
MARCA_FALTA = "⬜"
PECAS_QUE_MOSTRAM_INICIO = ("Aula em CONTEUDO/", "Objetiva (página)", "Prática (página)")
LEGENDA = (
    "> Legenda: `✅` peça presente · `⬜` peça pendente · `📎` outro arquivo (fora do padrão) · "
    "`⚠️` arquivo vazio.\n> Situação: **✅ CONCLUÍDA** (todas as peças ✅) · **🔄 PENDENTE** "
    "(parte feita) · **⬜ NÃO INICIADA** (nenhuma aula com conteúdo ou atividade)."
)


def agora():
    """Devolve a data e hora de Brasília com segundos.

    Returns:
        str: AAAA-MM-DD HH:MM:SS.
    """
    return subprocess.check_output(COMANDO_DATA).decode().strip()


def marca(ok):
    """Converte um booleano na marca da tabela.

    Args:
        ok: peça presente/resolvida.

    Returns:
        str: ✅ ou ⬜.
    """
    return MARCA_OK if ok else MARCA_FALTA


def analisar_materia(pasta_materia):
    """Confere peças gerais, aulas e arquivos de uma matéria e calcula a situação.

    Args:
        pasta_materia: Path da matéria.

    Returns:
        dict: peças, aulas, inventário, contagens e situação.
    """
    pecas_gerais = conferir_pecas_da_materia(pasta_materia)
    aulas = [conferir_aula(pasta_materia, numero, celula)
             for numero, celula in ler_linhas_das_aulas(pasta_materia)]
    resultados = [arquivo is not None for _, _, arquivo in pecas_gerais]
    resultados += [ok for aula in aulas for _, _, ok in aula["pecas"]]
    iniciada = any(ok for aula in aulas for nome, _, ok in aula["pecas"]
                   if nome in PECAS_QUE_MOSTRAM_INICIO)
    total, feitas = len(resultados), sum(resultados)
    situacao = SITUACAO_PENDENTE
    if total and feitas == total:
        situacao = SITUACAO_CONCLUIDA
    elif not iniciada:
        situacao = SITUACAO_NAO_INICIADA
    arquivos, resumidas = inventariar_arquivos(pasta_materia)
    return {"pecas_gerais": pecas_gerais, "aulas": aulas, "arquivos": arquivos,
            "resumidas": resumidas, "total": total, "feitas": feitas, "situacao": situacao}


def caminhos_do_padrao(analise, pasta_materia):
    """Junta os caminhos (relativos à matéria) de todas as peças do padrão encontradas.

    Args:
        analise: resultado de analisar_materia.
        pasta_materia: Path da matéria.

    Returns:
        set[str]: caminhos relativos das peças presentes.
    """
    caminhos = {arquivo for _, _, arquivo in analise["pecas_gerais"] if arquivo}
    caminhos |= {arquivo for aula in analise["aulas"] for _, arquivo, _ in aula["pecas"]
                 if arquivo}
    return {arquivo.relative_to(pasta_materia).as_posix() for arquivo in caminhos}


def montar_secao_pecas_gerais(analise, pasta_materia):
    """Monta a tabela das peças gerais da matéria.

    Args:
        analise: resultado de analisar_materia.
        pasta_materia: Path da matéria.

    Returns:
        list[str]: linhas Markdown.
    """
    linhas = ["## 1. Peças da matéria (padrão da ITIC)", "",
              "| Peça | Arquivo esperado | Status |", "|---|---|---|"]
    for nome, caminho, arquivo in analise["pecas_gerais"]:
        encontrado = arquivo.relative_to(pasta_materia).as_posix() if arquivo else caminho
        linhas.append(f"| {nome} | `{encontrado}` | {marca(arquivo is not None)} |")
    return linhas + [""]


def montar_secao_aulas(analise):
    """Monta a tabela das aulas (uma linha por aula do STATUS-AULAS.md).

    Args:
        analise: resultado de analisar_materia.

    Returns:
        list[str]: linhas Markdown.
    """
    linhas = ["## 2. Aulas (uma linha por aula do `AULAS/STATUS-AULAS.md`)", ""]
    if not analise["aulas"]:
        return linhas + ["⬜ Sem tabela de aulas no `AULAS/STATUS-AULAS.md`.", ""]
    nomes = [nome for nome, _, _ in analise["aulas"][0]["pecas"]]
    linhas += ["| Aula | " + " | ".join(nomes) + " | Aula pronta |",
               "|---|" + "---|" * (len(nomes) + 1)]
    for aula in analise["aulas"]:
        marcas = [marca(ok) for _, _, ok in aula["pecas"]]
        pronta = all(ok for _, _, ok in aula["pecas"])
        linhas.append(f"| {aula['numero']:02d} | " + " | ".join(marcas) + f" | {marca(pronta)} |")
    return linhas + [""]


def montar_secao_inventario(analise, pasta_materia):
    """Monta a lista de todos os arquivos da pasta com o status de cada um.

    Args:
        analise: resultado de analisar_materia.
        pasta_materia: Path da matéria.

    Returns:
        list[str]: linhas Markdown.
    """
    do_padrao = caminhos_do_padrao(analise, pasta_materia)
    linhas = [f"## 3. Todos os arquivos da pasta ({len(analise['arquivos'])})", "",
              "| Arquivo | Tamanho (bytes) | Status |", "|---|---|---|"]
    for arquivo in analise["arquivos"]:
        relativo = arquivo.relative_to(pasta_materia).as_posix()
        tamanho = arquivo.stat().st_size
        status = "✅ peça do padrão" if relativo in do_padrao else "📎 outro arquivo"
        if tamanho == 0:
            status = "⚠️ vazio"
        linhas.append(f"| `{relativo}` | {tamanho} | {status} |")
    for pasta, quantidade in sorted(analise["resumidas"].items()):
        linhas.append(f"| `{pasta}/` ({quantidade} arquivos de apoio) | — | 📎 pasta técnica |")
    return linhas + [""]


def montar_status_materia(caminho, posicao, analise, data_hora):
    """Monta o texto completo do STATUS_MATERIA.md.

    Args:
        caminho: caminho relativo da matéria.
        posicao: número da matéria na ordem oficial.
        analise: resultado de analisar_materia.
        data_hora: data e hora da geração.

    Returns:
        str: conteúdo Markdown.
    """
    pasta_materia = RAIZ_PROJETO / caminho
    percentual = round(100 * analise["feitas"] / analise["total"]) if analise["total"] else 0
    cabecalho = [
        f"# 🧭 STATUS DA MATÉRIA — {pasta_materia.name}", "",
        f"**Ordem:** {posicao} (lista em [`tasks/ORDEM-MATERIAS.md`]"
        f"({'../' * len(Path(caminho).parts)}tasks/ORDEM-MATERIAS.md))  ",
        f"**Curso:** {pasta_materia.parent.name}  ",
        f"**Situação:** **{analise['situacao']}** — {analise['feitas']} de {analise['total']} "
        f"peças ({percentual}%)  ",
        f"**Gerado em:** {data_hora} por `scripts/status-materias/gerar_status_materia.py` "
        "(não editar à mão: rodar o script de novo)", "", LEGENDA, "",
    ]
    corpo = (montar_secao_pecas_gerais(analise, pasta_materia) + montar_secao_aulas(analise)
             + montar_secao_inventario(analise, pasta_materia))
    return "\n".join(cabecalho + corpo)


def montar_ordem_md(linhas_resumo, data_hora):
    """Monta o tasks/ORDEM-MATERIAS.md com a ordem e a situação de cada matéria.

    Args:
        linhas_resumo: lista de (posição, caminho, analise).
        data_hora: data e hora da geração.

    Returns:
        str: conteúdo Markdown.
    """
    linhas = [
        "# 🔢 ORDEM DAS MATÉRIAS", "",
        "Regra \"STATUS_MATERIA E ORDEM DAS MATÉRIAS\" do `CLAUDE.md`: ao ler o status de tarefas "
        "ou de matérias, seguir **esta ordem**. A ordem gravada não muda; matéria nova entra no "
        "fim. Gerado por `scripts/status-materias/gerar_status_materia.py` (não editar à mão; "
        "para mudar a ordem, mudar as linhas e rodar o script de novo).", "",
        f"**Gerado em:** {data_hora}", "",
        "| Ordem | Matéria | Curso | Situação | Peças | Caminho |", "|---|---|---|---|---|---|",
    ]
    for posicao, caminho, analise in linhas_resumo:
        partes = Path(caminho).parts
        linhas.append(
            f"| {posicao} | [{partes[-1]}](<../{caminho}/{NOME_STATUS_MATERIA}>) | {partes[-2]} | "
            f"{analise['situacao']} | {analise['feitas']}/{analise['total']} | `{caminho}` |"
        )
    return "\n".join(linhas) + "\n"


def main():
    """Gera os STATUS_MATERIA.md (na ordem oficial) e o tasks/ORDEM-MATERIAS.md."""
    data_hora = agora()
    ordem = montar_ordem(listar_materias())
    linhas_resumo = []
    for posicao, caminho in enumerate(ordem, start=1):
        analise = analisar_materia(RAIZ_PROJETO / caminho)
        texto = montar_status_materia(caminho, posicao, analise, data_hora)
        (RAIZ_PROJETO / caminho / NOME_STATUS_MATERIA).write_text(texto, encoding="utf-8")
        linhas_resumo.append((posicao, caminho, analise))
        print(f"{posicao:>2}. {analise['situacao']:<18} {analise['feitas']:>3}/"
              f"{analise['total']:<3} {caminho}")
    ARQUIVO_ORDEM.write_text(montar_ordem_md(linhas_resumo, data_hora), encoding="utf-8")
    print(f"Ordem: {ARQUIVO_ORDEM.relative_to(RAIZ_PROJETO).as_posix()}")


if __name__ == "__main__":
    main()
