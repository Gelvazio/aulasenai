#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Liga o link dos slides nas aulas de CONTEUDO/ só quando o arquivo existe (tarefa #245).

A IA não gera slides (regra #244.9): o professor publica em <MATÉRIA>/AULAS/AULA-NN-SLIDES.pdf
(ou .pptx) em outro momento. Nas aulas `CONTEUDO/AULA-NN-*.md`:
- arquivo existe     → link clicável `[📕 Slides da aula NN (PDF)](../AULAS/...)`;
- arquivo não existe → link vira caminho entre crases (sem clique) + "(o professor publica em
  outro momento)"; caminho que já está entre crases fica como está.
Idempotente: rodar de novo depois que o professor publicar os slides liga o link.

Uso (na raiz do repositório):
    python3 scripts/slides/ligar_links_slides.py [<pasta da matéria> ...]
Sem argumento, passa por todas as matérias de MATERIAIS/.
"""

import re
import sys
from pathlib import Path

RAIZ_PROJETO = Path(__file__).resolve().parents[2]
PASTA_MATERIAIS = RAIZ_PROJETO / "MATERIAIS"
PADRAO_AULAS = "*/*/CONTEUDO/AULA-*.md"
PASTA_CONTEUDO = "CONTEUDO"
EXTENSOES_SLIDES = (".pdf", ".pptx")
ROTULOS_EXTENSAO = {".pdf": "PDF", ".pptx": "PowerPoint"}
AVISO_SEM_SLIDES = "(o professor publica em outro momento)"
CAMINHO = r"\.\./AULAS/AULA-\d{2}-SLIDES\.(?:pdf|pptx)"
PADRAO_NUMERO = re.compile(r"AULA-(\d{2})-SLIDES")
AVISO_OPCIONAL = rf"(?: {re.escape(AVISO_SEM_SLIDES)})?"
# Link markdown, ou caminho entre crases (com o aviso opcional logo depois).
PADRAO_SLIDES = re.compile(
    rf"\[[^\]]*\]\((?P<link>{CAMINHO})\){AVISO_OPCIONAL}|`(?P<crase>{CAMINHO})`{AVISO_OPCIONAL}"
)


def achar_slides(pasta_conteudo, numero):
    """Procura o arquivo de slides da aula (PDF primeiro, depois PowerPoint).

    Args:
        pasta_conteudo: Pasta CONTEUDO/ da matéria.
        numero: Número da aula com 2 dígitos ("01").

    Returns:
        Caminho relativo à pasta CONTEUDO/ do arquivo que existe, ou None.
    """
    for extensao in EXTENSOES_SLIDES:
        relativo = f"../AULAS/AULA-{numero}-SLIDES{extensao}"
        if (pasta_conteudo / relativo).is_file():
            return relativo
    return None


def trocar_referencia(achado, pasta_conteudo):
    """Monta o texto novo de uma referência aos slides conforme o arquivo exista.

    Args:
        achado: Resultado do PADRAO_SLIDES.
        pasta_conteudo: Pasta CONTEUDO/ da matéria.

    Returns:
        Link clicável (arquivo existe); sem o arquivo, o link vira caminho entre crases com o
        aviso e o caminho que já estava entre crases não muda.
    """
    caminho = achado.group("link") or achado.group("crase")
    numero = PADRAO_NUMERO.search(caminho).group(1)
    existente = achar_slides(pasta_conteudo, numero)
    if not existente and achado.group("crase"):
        return achado.group(0)
    if not existente:
        return f"`{caminho}` {AVISO_SEM_SLIDES}"
    rotulo = ROTULOS_EXTENSAO[Path(existente).suffix]
    return f"[📕 Slides da aula {numero} ({rotulo})]({existente})"


def ligar_links_da_aula(caminho_aula):
    """Atualiza as referências aos slides de uma aula (só grava se mudou).

    Args:
        caminho_aula: Caminho do arquivo `AULA-NN-*.md`.

    Returns:
        True se o arquivo foi alterado.
    """
    texto = caminho_aula.read_text(encoding="utf-8")
    novo = PADRAO_SLIDES.sub(lambda achado: trocar_referencia(achado, caminho_aula.parent), texto)
    if novo == texto:
        return False
    caminho_aula.write_text(novo, encoding="utf-8")
    return True


def listar_aulas(pastas_materia):
    """Lista as aulas de CONTEUDO/ das matérias pedidas (ou de todas).

    Args:
        pastas_materia: Pastas de matéria passadas na linha de comando (lista vazia = todas).

    Returns:
        Lista ordenada de caminhos `AULA-*.md`.
    """
    if not pastas_materia:
        return sorted(PASTA_MATERIAIS.glob(PADRAO_AULAS))
    aulas = []
    for pasta in pastas_materia:
        aulas += (Path(pasta).resolve() / PASTA_CONTEUDO).glob("AULA-*.md")
    return sorted(aulas)


def caminho_para_mostrar(caminho):
    """Caminho relativo à raiz do projeto quando estiver dentro dela (senão, o absoluto).

    Args:
        caminho: Caminho absoluto de um arquivo.

    Returns:
        Texto do caminho para mostrar no terminal.
    """
    if caminho.is_relative_to(RAIZ_PROJETO):
        return str(caminho.relative_to(RAIZ_PROJETO))
    return str(caminho)


def main():
    """Passa pelas aulas e mostra quais arquivos mudaram."""
    alteradas = [aula for aula in listar_aulas(sys.argv[1:]) if ligar_links_da_aula(aula)]
    for aula in alteradas:
        print(f"alterada: {caminho_para_mostrar(aula)}")
    print(f"{len(alteradas)} aula(s) alterada(s).")


if __name__ == "__main__":
    main()
