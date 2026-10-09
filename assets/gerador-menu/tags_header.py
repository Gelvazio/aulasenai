r"""Insere o header do usuário logado (js/header-usuario.js) nas páginas HTML.

Cada página recebe duas coisas: a tag <script src=".../js/header-usuario.js"> como PRIMEIRO
script do <head> (sem defer: é o guarda de sessão, que esconde a página e, sem login, manda para o
index.html antes de qualquer outra coisa carregar) e o elemento <div id="header-usuario"></div>
logo depois de <body>. Tag antiga (com defer ou em outro lugar) é movida. Aplicação idempotente.

Uso direto (aplica em páginas existentes; sem argumentos, em todos os .html do projeto, menos
os de PASTAS_IGNORADAS e PAGINAS_SEM_HEADER):
    C:\Python314\python.exe assets\gerador-menu\tags_header.py [arquivo.html ...]
Uso pelos geradores: inserir_header_em_html(conteudo, pasta_da_pagina).
"""

import os
import re
import sys

PASTA_PROJETO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CAMINHO_JS = "js/header-usuario.js"
ID_ELEMENTO = "header-usuario"
PADRAO_ABERTURA_BODY = re.compile(r"<body\b[^>]*>", re.IGNORECASE)
PADRAO_ABERTURA_HEAD = re.compile(r"<head\b[^>]*>", re.IGNORECASE)
PADRAO_META_CHARSET = re.compile(r"\s*<meta\s+charset=[^>]*>", re.IGNORECASE)
PADRAO_TAG_ANTIGA = re.compile(
    r"(\r?\n)?[ \t]*<script\s+src=\"[^\"]*js/header-usuario\.js\"[^>]*>\s*</script>[ \t]*",
    re.IGNORECASE,
)
# Pastas que não são páginas do site (os templates dos geradores recebem a tag ao gerar).
PASTAS_IGNORADAS = {
    ".git",
    ".claude",
    "node_modules",
    "graphify-out",
    "gerador-apostilas",
    "gerador-atividades",
    "gerador-avaliacao-discursiva",
    "gerador-avaliacao-media-final",
    "AUTOMATIZACAO-WHATSAPP",
}
# login.html não leva header (é a própria entrada); o index.html leva (página pública).
PAGINAS_SEM_HEADER = {os.path.join(PASTA_PROJETO, "login.html")}


def caminho_relativo(destino, pasta_origem):
    """Calcula o caminho relativo com barras normais."""
    return os.path.relpath(destino, pasta_origem).replace("\\", "/")


def montar_tag_script(pasta_pagina):
    """Monta a tag <script> do header para uma página.

    Args:
        pasta_pagina: Pasta onde a página HTML fica.

    Returns:
        Tag <script> (sem defer) com caminho relativo até js/header-usuario.js.
    """
    caminho = caminho_relativo(os.path.join(PASTA_PROJETO, CAMINHO_JS), pasta_pagina)
    return f'<script src="{caminho}"></script>'


def inserir_tag_no_inicio_head(conteudo, tag, quebra):
    """Põe a tag do header como primeiro script do <head> (depois do <meta charset>, se houver).

    Args:
        conteudo: HTML sem a tag antiga do header.
        tag: Tag <script> do header.
        quebra: Quebra de linha usada no arquivo.

    Returns:
        HTML com a tag no início do <head>.
    """
    posicao = PADRAO_ABERTURA_HEAD.search(conteudo).end()
    charset = PADRAO_META_CHARSET.match(conteudo, posicao)
    if charset:
        posicao = charset.end()
    return conteudo[:posicao] + quebra + tag + conteudo[posicao:]


def inserir_header_em_html(conteudo, pasta_pagina):
    """Insere o script (início do <head>) e o elemento do header em um HTML (idempotente).

    Args:
        conteudo: HTML completo da página.
        pasta_pagina: Pasta onde a página será gravada.

    Returns:
        HTML com o header; o mesmo conteúdo se não tem <head>/<body>.
    """
    tem_head = PADRAO_ABERTURA_HEAD.search(conteudo)
    tem_body = PADRAO_ABERTURA_BODY.search(conteudo)
    if not (tem_head and tem_body):
        return conteudo

    quebra = "\r\n" if "\r\n" in conteudo else "\n"
    tag = montar_tag_script(pasta_pagina)
    conteudo = inserir_tag_no_inicio_head(PADRAO_TAG_ANTIGA.sub("", conteudo), tag, quebra)
    if f'id="{ID_ELEMENTO}"' in conteudo:
        return conteudo
    fim = PADRAO_ABERTURA_BODY.search(conteudo).end()
    return conteudo[:fim] + f'{quebra}<div id="{ID_ELEMENTO}"></div>' + conteudo[fim:]


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
    """Lista todos os .html do projeto, menos PASTAS_IGNORADAS e PAGINAS_SEM_HEADER."""
    paginas = []
    for pasta, subpastas, arquivos in os.walk(PASTA_PROJETO):
        subpastas[:] = [nome for nome in subpastas if nome not in PASTAS_IGNORADAS]
        paginas += [os.path.join(pasta, a) for a in arquivos if a.lower().endswith(".html")]
    return sorted(p for p in paginas if p not in PAGINAS_SEM_HEADER)


def main():
    """Aplica o header nos arquivos passados (ou nas páginas padrão) e imprime o resumo."""
    caminhos = sys.argv[1:] or listar_paginas_padrao()
    alteradas = [c for c in caminhos if aplicar_header_em_arquivo(c)]
    print(f"alteradas: {len(alteradas)} de {len(caminhos)}")


if __name__ == "__main__":
    main()
