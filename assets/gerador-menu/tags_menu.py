"""Monta as tags do menu de atividades (js/menu.js) para o <head> das páginas geradas.

O menu só é incluído quando existe um MENU-ATIVIDADES.js na pasta da página ou numa pasta
acima dela (até a raiz do projeto). Usado pelos geradores de atividades e de índices.

Uso direto (aplica o menu em páginas já existentes):
    C:\\Python314\\python.exe assets\\gerador-menu\\tags_menu.py <arquivo.html> [...]
"""

import os
import sys

PASTA_PROJETO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
NOME_ARQUIVO_DADOS = "MENU-ATIVIDADES.js"
CAMINHO_CSS = "assets/css/menu.css"
CAMINHO_JS = "js/menu.js"
FECHAMENTO_HEAD = "</head>"


def caminho_relativo(destino, pasta_origem):
    """Calcula o caminho relativo com barras normais.

    Args:
        destino: Caminho absoluto do arquivo de destino.
        pasta_origem: Pasta da página que referencia o arquivo.

    Returns:
        Caminho relativo usando "/".
    """
    return os.path.relpath(destino, pasta_origem).replace("\\", "/")


def localizar_dados_menu(pasta_pagina):
    """Procura o MENU-ATIVIDADES.js na pasta da página e nas pastas acima.

    Args:
        pasta_pagina: Pasta onde a página HTML fica.

    Returns:
        Caminho absoluto do arquivo de dados ou None se não existir.
    """
    pasta = os.path.abspath(pasta_pagina)
    while pasta.startswith(PASTA_PROJETO):
        candidato = os.path.join(pasta, NOME_ARQUIVO_DADOS)
        if os.path.isfile(candidato):
            return candidato
        pasta_acima = os.path.dirname(pasta)
        if pasta_acima == pasta:
            return None
        pasta = pasta_acima
    return None


def montar_tags_menu(pasta_pagina, recuo=""):
    """Monta as tags <link> e <script> do menu para uma página.

    Args:
        pasta_pagina: Pasta onde a página HTML fica.
        recuo: Espaços colocados antes de cada tag.

    Returns:
        Tags separadas por quebra de linha (cada uma começando com "\\n"), ou "" sem menu.
    """
    dados = localizar_dados_menu(pasta_pagina)
    if not dados:
        return ""

    css = caminho_relativo(os.path.join(PASTA_PROJETO, CAMINHO_CSS), pasta_pagina)
    script_dados = caminho_relativo(dados, pasta_pagina)
    script_menu = caminho_relativo(os.path.join(PASTA_PROJETO, CAMINHO_JS), pasta_pagina)
    return (
        f'\n{recuo}<link rel="stylesheet" href="{css}">'
        f'\n{recuo}<script src="{script_dados}" defer></script>'
        f'\n{recuo}<script src="{script_menu}" defer></script>'
    )


def detectar_recuo_head(conteudo):
    """Descobre o recuo usado na última linha antes de </head>, para manter o alinhamento.

    Args:
        conteudo: HTML completo da página.

    Returns:
        Espaços/tabulações do início da linha anterior a </head>.
    """
    antes_do_head = conteudo.split(FECHAMENTO_HEAD, 1)[0].rstrip()
    ultima_linha = antes_do_head.splitlines()[-1] if antes_do_head else ""
    return ultima_linha[: len(ultima_linha) - len(ultima_linha.lstrip())]


def aplicar_menu_em_arquivo(caminho_html):
    """Insere as tags do menu antes de </head> de uma página existente (idempotente).

    Args:
        caminho_html: Caminho do arquivo HTML.

    Returns:
        True se o arquivo foi alterado, False se já tinha o menu ou não há dados de menu.
    """
    with open(caminho_html, encoding="utf-8", newline="") as arquivo:
        conteudo = arquivo.read()

    ja_tem_menu = CAMINHO_JS in conteudo
    sem_head = FECHAMENTO_HEAD not in conteudo
    if ja_tem_menu or sem_head:
        return False

    tags = montar_tags_menu(
        os.path.dirname(os.path.abspath(caminho_html)), detectar_recuo_head(conteudo)
    )
    if not tags:
        return False

    quebra = "\r\n" if "\r\n" in conteudo else "\n"
    bloco = tags.lstrip("\n").replace("\n", quebra)
    novo = conteudo.replace(FECHAMENTO_HEAD, f"{bloco}{quebra}{FECHAMENTO_HEAD}", 1)
    with open(caminho_html, "w", encoding="utf-8", newline="") as arquivo:
        arquivo.write(novo)
    return True


def main():
    """Aplica o menu nos arquivos HTML passados na linha de comando."""
    for caminho in sys.argv[1:]:
        situacao = "menu aplicado" if aplicar_menu_em_arquivo(caminho) else "sem alteração"
        print(f"{situacao}: {caminho}")


if __name__ == "__main__":
    main()
