r"""Insere o header do usuário logado (js/header-usuario.js) nas páginas HTML.

Cada página recebe duas coisas: a tag <script src=".../js/header-usuario.js" defer> antes de
</head> e o elemento <div id="header-usuario"></div> logo depois de <body>. O script preenche
o elemento com o usuário logado (ou o botão ENTRAR). Aplicação idempotente.

Uso direto (aplica em páginas existentes; sem argumentos, em index.html e em MATERIAIS/):
    C:\Python314\python.exe assets\gerador-menu\tags_header.py [arquivo.html ...]
Uso pelos geradores: inserir_header_em_html(conteudo, pasta_da_pagina).
"""

import os
import re
import sys

PASTA_PROJETO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CAMINHO_JS = "js/header-usuario.js"
ID_ELEMENTO = "header-usuario"
FECHAMENTO_HEAD = "</head>"
PADRAO_ABERTURA_BODY = re.compile(r"<body\b[^>]*>", re.IGNORECASE)


def caminho_relativo(destino, pasta_origem):
    """Calcula o caminho relativo com barras normais."""
    return os.path.relpath(destino, pasta_origem).replace("\\", "/")


def montar_tag_script(pasta_pagina):
    """Monta a tag <script> do header para uma página.

    Args:
        pasta_pagina: Pasta onde a página HTML fica.

    Returns:
        Tag <script> com caminho relativo até js/header-usuario.js.
    """
    caminho = caminho_relativo(os.path.join(PASTA_PROJETO, CAMINHO_JS), pasta_pagina)
    return f'<script src="{caminho}" defer></script>'


def detectar_recuo_head(conteudo):
    """Descobre o recuo da última linha antes de </head>."""
    antes = conteudo.split(FECHAMENTO_HEAD, 1)[0].rstrip()
    linha = antes.splitlines()[-1] if antes else ""
    return linha[: len(linha) - len(linha.lstrip())]


def inserir_header_em_html(conteudo, pasta_pagina):
    """Insere o script e o elemento do header em um HTML (idempotente).

    Args:
        conteudo: HTML completo da página.
        pasta_pagina: Pasta onde a página será gravada.

    Returns:
        HTML com o header; o mesmo conteúdo se já tinha o header ou não tem <head>/<body>.
    """
    abertura_body = PADRAO_ABERTURA_BODY.search(conteudo)
    ja_tem = CAMINHO_JS in conteudo or f'id="{ID_ELEMENTO}"' in conteudo
    if ja_tem or FECHAMENTO_HEAD not in conteudo or not abertura_body:
        return conteudo

    quebra = "\r\n" if "\r\n" in conteudo else "\n"
    recuo = detectar_recuo_head(conteudo)
    tag = montar_tag_script(pasta_pagina)
    conteudo = conteudo.replace(
        FECHAMENTO_HEAD, f"{recuo}{tag}{quebra}{FECHAMENTO_HEAD}", 1)
    abertura_body = PADRAO_ABERTURA_BODY.search(conteudo)
    elemento = f'{quebra}<div id="{ID_ELEMENTO}"></div>'
    fim = abertura_body.end()
    return conteudo[:fim] + elemento + conteudo[fim:]


def aplicar_header_em_arquivo(caminho_html):
    """Aplica o header em uma página existente.

    Returns:
        True se o arquivo foi alterado.
    """
    with open(caminho_html, encoding="utf-8", newline="") as arquivo:
        original = arquivo.read()
    novo = inserir_header_em_html(original, os.path.dirname(os.path.abspath(caminho_html)))
    if novo == original:
        return False
    with open(caminho_html, "w", encoding="utf-8", newline="") as arquivo:
        arquivo.write(novo)
    return True


def listar_paginas_padrao():
    """Lista index.html (raiz) e todos os .html de MATERIAIS/."""
    paginas = [os.path.join(PASTA_PROJETO, "index.html")]
    for pasta, _, arquivos in os.walk(os.path.join(PASTA_PROJETO, "MATERIAIS")):
        paginas += [os.path.join(pasta, a) for a in arquivos if a.lower().endswith(".html")]
    return sorted(paginas)


def main():
    """Aplica o header nos arquivos passados (ou nas páginas padrão) e imprime o resumo."""
    caminhos = sys.argv[1:] or listar_paginas_padrao()
    alteradas = [c for c in caminhos if aplicar_header_em_arquivo(c)]
    print(f"alteradas: {len(alteradas)} de {len(caminhos)}")


if __name__ == "__main__":
    main()
