"""Gera os índices de navegação por atividades em 3 níveis.

Uso: C:\\Python314\\python.exe assets\\gerador-indices\\gerar_indices.py [--forcar <pasta ATIVIDADES>]

1. index.html (raiz do projeto): um card por curso de MATERIAIS/.
2. MATERIAIS/<CURSO>/index.html: um card por matéria do curso.
3. MATERIAIS/<CURSO>/<MATERIA>/ATIVIDADES/index.html: as atividades da matéria.

Índices de matéria que não foram criados por este gerador (sem o marcador) são preservados,
salvo quando a pasta ATIVIDADES é passada em --forcar.
"""
import html
import os
import re
import sys
from pathlib import Path
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "gerador-menu"))
from tags_menu import montar_tags_menu  # noqa: E402
from tags_header import inserir_header_em_html  # noqa: E402

RAIZ_PROJETO = Path(__file__).resolve().parents[2]
PASTA_MATERIAIS = RAIZ_PROJETO / "MATERIAIS"
CSS_INDICE = RAIZ_PROJETO / "assets" / "css" / "indice-atividades.css"
JS_LIBERADAS = RAIZ_PROJETO / "assets" / "js" / "indice-atividades-liberadas.js"
JS_SUPABASE = RAIZ_PROJETO / "js" / "supabase.js"
CSS_CRUD = RAIZ_PROJETO / "assets" / "css" / "atividades-crud-modal.css"
JS_CRUD_REPOSITORIO = RAIZ_PROJETO / "assets" / "js" / "atividades-crud-repositorio.js"
JS_CRUD_MODAL = RAIZ_PROJETO / "assets" / "js" / "atividades-crud-modal.js"
URL_SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
NOME_LISTA_LIBERADAS = "ATIVIDADES-LIBERADAS.js"
NOME_INDICE = "index.html"
NOME_PASTA_ATIVIDADES = "ATIVIDADES"
MARCADOR = '<meta name="gerador" content="gerador-indices">'
PASTAS_IGNORADAS = {"MATERIAS-GERAIS", "docs", "scripts", ".claude", "graphify-out"}
# Só páginas HTML entram no índice (pedido do usuário em 2026-09-27; .docx e .pdf ficam fora).
EXTENSOES_ATIVIDADE = {".html": "📝 Página"}
PADRAO_DATA_NOME = re.compile(r"(\d{2})-(\d{2})-(\d{4})")
SEM_DATA = (9999, 99, 99)
PREFIXOS_IGNORADOS = ("~$", "GABARITO", "index.")
TITULO_SITE = "SENAI — Índice de Atividades"

escapar = html.escape


def nome_legivel(pasta):
    """Converte o nome da pasta em texto de exibição (sublinhado e hífen viram espaço)."""
    return " ".join(pasta.name.replace("_", " ").replace("-", " ").split())


def listar_subpastas(pasta):
    """Lista subpastas válidas (sem auxiliares), em ordem alfabética."""
    return sorted(
        (item for item in pasta.iterdir() if item.is_dir() and item.name not in PASTAS_IGNORADAS),
        key=lambda item: item.name.lower(),
    )


def eh_arquivo_atividade(arquivo):
    """Indica se o arquivo é uma atividade que deve aparecer no índice."""
    if not arquivo.is_file():
        return False
    nome_maiusculo = arquivo.name.upper()
    esta_ignorado = any(nome_maiusculo.startswith(p.upper()) for p in PREFIXOS_IGNORADOS)
    return not esta_ignorado and arquivo.suffix.lower() in EXTENSOES_ATIVIDADE


def chave_ordem_atividade(arquivo):
    """Chave de ordenação: data DD-MM-AAAA do nome (crescente); sem data vão para o fim.

    Args:
        arquivo: Caminho do arquivo de atividade.

    Returns:
        Tupla ((ano, mês, dia), nome em minúsculas).
    """
    encontrada = PADRAO_DATA_NOME.search(arquivo.name)
    if not encontrada:
        return SEM_DATA, arquivo.name.lower()

    dia, mes, ano = (int(parte) for parte in encontrada.groups())
    return (ano, mes, dia), arquivo.name.lower()


def listar_atividades(materia):
    """Lista as páginas de atividade (1º nível de toda pasta ATIVIDADES), ordenadas por data."""
    pastas = [materia / NOME_PASTA_ATIVIDADES] + [
        p for p in materia.rglob(NOME_PASTA_ATIVIDADES) if p.is_dir()
    ]
    atividades = []
    for pasta in dict.fromkeys(p for p in pastas if p.is_dir()):
        atividades.extend(a for a in pasta.iterdir() if eh_arquivo_atividade(a))
    return sorted(atividades, key=chave_ordem_atividade)


def link_relativo(destino, origem):
    """Caminho relativo de URL do diretório origem até o destino."""
    return quote(os.path.relpath(destino, origem).replace(os.sep, "/"))


def montar_card(dados):
    """Monta um card (article.aula) a partir de rótulo, título, meta e botões."""
    botoes = "".join(
        f'<a class="btn {classe}" href="{href}">{escapar(texto)}</a>'
        for texto, href, classe in dados["botoes"]
    )
    atributo_arquivo = ""
    if dados.get("arquivo"):
        atributo_arquivo = f' data-arquivo="{escapar(dados["arquivo"])}"'
    return f"""        <article class="aula"{atributo_arquivo}>
            <div class="topo">
                <span class="icone">{dados["icone"]}</span>
                <div>
                    <div class="num">{escapar(dados["rotulo"])}</div>
                    <h2>{escapar(dados["titulo"])}</h2>
                </div>
            </div>
            <p class="meta">{escapar(dados["meta"])}</p>
            <div class="acoes">{botoes}</div>
        </article>"""


def montar_faixa_materias(curso, pasta_indice, atual=None):
    """Faixa de cards das matérias do curso, no topo da página (navegação rápida).

    Args:
        curso: Pasta do curso.
        pasta_indice: Pasta onde a página será gravada (base dos links relativos).
        atual: Pasta da matéria aberta (fica destacada), ou None no índice do curso.

    Returns:
        HTML da faixa; vazio se o curso não tem matérias.
    """
    materias = listar_subpastas(curso)
    if not materias:
        return ""

    cards = []
    for materia in materias:
        href = link_relativo(materia / NOME_PASTA_ATIVIDADES / NOME_INDICE, pasta_indice)
        classe = "faixa-materias__card"
        if atual is not None and materia.resolve() == atual.resolve():
            classe += " faixa-materias__card--atual"
        cards.append(f'<a class="{classe}" href="{href}">📘 {escapar(nome_legivel(materia))}</a>')
    return (
        '\n        <nav class="faixa-materias" aria-label="Matérias do curso">'
        f'<span class="faixa-materias__titulo">Matérias — {escapar(nome_legivel(curso))}</span>'
        f'<div class="faixa-materias__lista">{"".join(cards)}</div></nav>'
    )


def montar_tags_crud(pasta_indice, recuo):
    """Tags (CSS e scripts) do modal CADASTRAR ATIVIDADES, com caminhos relativos ao índice."""
    scripts = [URL_SUPABASE_JS] + [
        link_relativo(js, pasta_indice) for js in (JS_SUPABASE, JS_CRUD_REPOSITORIO, JS_CRUD_MODAL)
    ]
    linhas = [f'<link rel="stylesheet" href="{link_relativo(CSS_CRUD, pasta_indice)}">']
    linhas += [f'<script src="{script}" defer></script>' for script in scripts]
    return "".join(f"\n{recuo}{linha}" for linha in linhas)


def montar_pagina(dados):
    """Monta a página completa de índice (cabeçalho, resumo, grade de cards e rodapé).

    Com "liberadas" (lista em .js) e "script", a página passa a bloquear as atividades que
    não estão na lista de liberadas.
    """
    tag_script = ""
    if dados.get("liberadas"):
        tag_script = (
            f'\n    <script src="{dados["liberadas"]}" defer></script>'
            f'\n    <script src="{dados["script"]}" defer></script>'
        )
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {MARCADOR}
    <title>{escapar(dados["titulo"])}</title>
    <link rel="stylesheet" href="{dados["css"]}">{tag_script}{dados.get("menu", "")}{dados.get("crud", "")}
</head>
<body>
    <div class="container">{dados.get("faixa", "")}
        <header>
            <h1>{escapar(dados["titulo"])}</h1>
            <p>{escapar(dados["subtitulo"])}</p>{dados.get("navegacao", "")}
        </header>
        <div class="resumo">{dados["resumo"]}</div>
        <section class="grade">
{chr(10).join(dados["cards"])}
        </section>
        <footer>{dados["rodape"]}</footer>
    </div>
</body>
</html>
"""


def gravar_indice(caminho, conteudo, forcar=False):
    """Grava o índice, preservando os que não foram criados por este gerador.

    Returns:
        "criado", "regravado" ou "preservado".
    """
    if caminho.exists():
        eh_do_gerador = MARCADOR in caminho.read_text(encoding="utf-8", errors="ignore")
        if not eh_do_gerador and not forcar:
            return "preservado"
        situacao = "regravado"
    else:
        situacao = "criado"
    caminho.parent.mkdir(parents=True, exist_ok=True)
    caminho.write_text(inserir_header_em_html(conteudo, caminho.parent), encoding="utf-8")
    return situacao


def card_atividade(atividade, pasta_indice, materia):
    """Card de um arquivo de atividade no índice da matéria."""
    tipo = EXTENSOES_ATIVIDADE[atividade.suffix.lower()]
    local = os.path.relpath(atividade.parent, materia).replace(os.sep, " / ")
    return montar_card({
        "icone": tipo.split()[0],
        "rotulo": local,
        "arquivo": atividade.name,
        "titulo": nome_legivel(Path(atividade.stem)),
        "meta": f"{tipo.split(maxsplit=1)[1]} · {atividade.name}",
        "botoes": [("Abrir", link_relativo(atividade, pasta_indice), "principal")],
    })


def gerar_indice_materia(materia, curso, forcar):
    """Gera ATIVIDADES/index.html da matéria. Returns: (atividades, situação)."""
    pasta_indice = materia / NOME_PASTA_ATIVIDADES
    atividades = listar_atividades(materia)
    cards = [card_atividade(a, pasta_indice, materia) for a in atividades]
    if not cards:
        cards = [montar_card({
            "icone": "⏳", "rotulo": "SEM ATIVIDADES", "titulo": "Nenhuma atividade cadastrada",
            "meta": "As atividades aparecem aqui quando forem adicionadas à pasta ATIVIDADES.",
            "botoes": [],
        })]
    voltar = link_relativo(curso / NOME_INDICE, pasta_indice)
    dados_pagina = {
        "titulo": f"📚 Atividades — {nome_legivel(materia)}",
        "subtitulo": f"{nome_legivel(curso)} — SENAI",
        "css": link_relativo(CSS_INDICE, pasta_indice),
        "resumo": f"<span>{len(atividades)} arquivos de atividade</span>",
        "faixa": montar_faixa_materias(curso, pasta_indice, materia),
        "cards": cards,
        "rodape": f'<a class="btn" href="{voltar}">← Matérias do curso</a>',
    }
    if (pasta_indice / NOME_LISTA_LIBERADAS).exists():
        dados_pagina["liberadas"] = quote(NOME_LISTA_LIBERADAS)
        dados_pagina["script"] = link_relativo(JS_LIBERADAS, pasta_indice)
    dados_pagina["menu"] = montar_tags_menu(pasta_indice, "    ")
    dados_pagina["crud"] = montar_tags_crud(pasta_indice, "    ")
    pagina = montar_pagina(dados_pagina)
    return atividades, gravar_indice(pasta_indice / NOME_INDICE, pagina, forcar)


def card_materia(materia, curso, quantidade):
    """Card de uma matéria no índice do curso."""
    href = link_relativo(materia / NOME_PASTA_ATIVIDADES / NOME_INDICE, curso)
    if quantidade:
        botao = ("📚 Atividades", href, "principal")
        meta = f"{quantidade} arquivos de atividade"
    else:
        botao = ("Sem atividades", href, "off")
        meta = "Nenhuma atividade cadastrada"
    return montar_card({
        "icone": "📘", "rotulo": "MATÉRIA", "titulo": nome_legivel(materia),
        "meta": meta, "botoes": [botao],
    })


def gerar_indice_curso(curso, pastas_forcadas, situacoes):
    """Gera os índices das matérias e o index.html do curso. Returns: (matérias, com atividade)."""
    materias = listar_subpastas(curso)
    cards = []
    com_atividade = 0
    for materia in materias:
        forcar = (materia / NOME_PASTA_ATIVIDADES).resolve() in pastas_forcadas
        atividades, situacao = gerar_indice_materia(materia, curso, forcar)
        situacoes.append((situacao, materia / NOME_PASTA_ATIVIDADES / NOME_INDICE))
        com_atividade += bool(atividades)
        cards.append(card_materia(materia, curso, len(atividades)))
    voltar = link_relativo(RAIZ_PROJETO / NOME_INDICE, curso)
    pagina = montar_pagina({
        "titulo": f"🎓 {nome_legivel(curso)}",
        "subtitulo": "Matérias do curso — atividades",
        "css": link_relativo(CSS_INDICE, curso),
        "resumo": f"<span>{len(materias)} matérias</span><span>·</span>"
                  f"<span>{com_atividade} com atividades</span>",
        "faixa": montar_faixa_materias(curso, curso),
        "cards": cards,
        "rodape": f'<a class="btn" href="{voltar}">← Todos os cursos</a>',
    })
    situacoes.append((gravar_indice(curso / NOME_INDICE, pagina), curso / NOME_INDICE))
    return len(materias), com_atividade


def card_curso(curso, total_materias, com_atividade):
    """Card de um curso no índice raiz."""
    return montar_card({
        "icone": "🎓", "rotulo": "CURSO", "titulo": nome_legivel(curso),
        "meta": f"{total_materias} matérias · {com_atividade} com atividades",
        "botoes": [("📂 Matérias", link_relativo(curso / NOME_INDICE, RAIZ_PROJETO), "principal")],
    })


# Menu só do professor: nasce oculto e o js/header-usuario.js o mostra para perfil PROFESSOR.
MENU_PRINCIPAL = (
    '\n            <nav class="menu-principal" data-somente-perfil="PROFESSOR" hidden>'
    '<a href="scripts/criarUsuariosBancoDados.html" target="_blank" rel="noopener">USUARIOS</a>'
    '<a href="relatorioAtividades.html" target="_blank" rel="noopener">RELATORIOS</a>'
    '</nav>'
)


def gerar_indice_raiz(pastas_forcadas):
    """Gera todos os índices a partir da raiz. Returns: lista de (situação, caminho)."""
    situacoes = []
    cursos = listar_subpastas(PASTA_MATERIAIS)
    cards = [card_curso(c, *gerar_indice_curso(c, pastas_forcadas, situacoes)) for c in cursos]
    pagina = montar_pagina({
        "titulo": "📚 Índice de Atividades",
        "subtitulo": "Escolha o curso para ver as matérias e suas atividades",
        "css": link_relativo(CSS_INDICE, RAIZ_PROJETO),
        "navegacao": MENU_PRINCIPAL,
        "resumo": f"<span>{len(cursos)} cursos</span>",
        "cards": cards,
        "rodape": TITULO_SITE,
    })
    caminho_raiz = RAIZ_PROJETO / NOME_INDICE
    situacoes.append((gravar_indice(caminho_raiz, pagina, forcar=True), caminho_raiz))
    return situacoes


def ler_pastas_forcadas(argumentos):
    """Lê as pastas ATIVIDADES passadas após --forcar."""
    if "--forcar" not in argumentos:
        return set()
    posicao = argumentos.index("--forcar")
    return {Path(p).resolve() for p in argumentos[posicao + 1:]}


def main():
    """Executa o gerador e imprime o resumo."""
    situacoes = gerar_indice_raiz(ler_pastas_forcadas(sys.argv[1:]))
    for tipo in ("criado", "regravado", "preservado"):
        quantidade = sum(1 for situacao, _ in situacoes if situacao == tipo)
        print(f"{tipo}: {quantidade}")
    for situacao, caminho in situacoes:
        if situacao == "preservado":
            print(f"  preservado: {caminho.relative_to(RAIZ_PROJETO)}")


if __name__ == "__main__":
    main()
