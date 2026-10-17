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
JS_SUPABASE = RAIZ_PROJETO / "js" / "supabase.js"
CSS_CRUD = RAIZ_PROJETO / "assets" / "css" / "atividades-crud-modal.css"
JS_CRUD_REPOSITORIO = RAIZ_PROJETO / "assets" / "js" / "atividades-crud-repositorio.js"
JS_CRUD_MODAL = RAIZ_PROJETO / "assets" / "js" / "atividades-crud-modal.js"
URL_SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
NOME_INDICE = "index.html"
NOME_PASTA_ATIVIDADES = "ATIVIDADES"
MARCADOR = '<meta name="gerador" content="gerador-indices">'
# AGENDA_COLABORADOR não é curso: as pendências só se abrem pelo menu do Professor Administrador.
PASTAS_IGNORADAS = {
    "MATERIAS-GERAIS", "AGENDA_COLABORADOR", "docs", "scripts", ".claude", "graphify-out",
}
# Só páginas HTML entram no índice (pedido do usuário em 2026-09-27; .docx e .pdf ficam fora).
EXTENSOES_ATIVIDADE = {".html": "📝 Página"}
PADRAO_DATA_NOME = re.compile(r"(\d{2})-(\d{2})-(\d{4})")
# "AULA-NN" no nome da página (sem confundir com a data "AULA-06-10-2026").
PADRAO_AULA_NOME = re.compile(r"AULA-(\d{2})(?!-\d{2}-\d{4})(?=-|$)", re.IGNORECASE)
SEM_DATA = (9999, 99, 99)
PREFIXOS_IGNORADOS = ("~$", "GABARITO", "index.")
TITULO_SITE = "SENAI — Índice de Atividades"
# Slides da aula ligados no card (2026-10-09): <MATÉRIA>/AULAS/AULA-NN-SLIDES.pdf.
PASTA_AULAS = "AULAS"
MODELO_SLIDES_AULA = "AULA-{numero}-SLIDES.pdf"
TEXTO_BOTAO_SLIDES = "📕 Slides (PDF)"
# Slides e documentos abrem em nova aba (pedido do usuário, 2026-10-09).
EXTENSOES_NOVA_ABA = (".pdf", ".pptx")
# Apostila no card da matéria, abaixo do nome (2026-10-14): <MATÉRIA>/APOSTILA/APOSTILA-*.html.
PASTA_APOSTILA = "APOSTILA"
PADRAO_APOSTILA = "APOSTILA-*.html"
TEXTO_BOTAO_APOSTILA = "📘 Apostila"
# Ícone do card pelo tipo da atividade, achado no nome do arquivo (2026-10-17, #265.3).
# A 1ª regra que casar vale (EXCEL e EQUIPE antes de QUESTOES); sem match usa o ícone padrão.
ICONE_ATIVIDADE_PADRAO = "📝"
ICONES_TIPO_ATIVIDADE = (
    (re.compile(r"EXCEL", re.IGNORECASE), "📊"),
    (re.compile(r"EQUIPE", re.IGNORECASE), "👥"),
    (re.compile(r"APOSTILA", re.IGNORECASE), "📘"),
    (re.compile(r"PRATICA|DISCURSIVA", re.IGNORECASE), "✍️"),
    (re.compile(r"QUESTOES|OBJETIVA", re.IGNORECASE), "📝"),
)

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


def atributos_nova_aba(href):
    """Atributos para abrir em nova aba os slides e documentos (PDF e PowerPoint) do card.

    Args:
        href: Endereço do botão.

    Returns:
        Texto com target e rel, ou vazio para páginas HTML.
    """
    if not href.lower().endswith(EXTENSOES_NOVA_ABA):
        return ""
    return ' target="_blank" rel="noopener"'


def montar_botoes(botoes):
    """Monta os links (a.btn) de uma lista de botões (texto, href, classe)."""
    return "".join(
        f'<a class="{f"btn {classe}".strip()}" href="{href}"{atributos_nova_aba(href)}>'
        f"{escapar(texto)}</a>"
        for texto, href, classe in botoes
    )


def montar_botoes_titulo(botoes):
    """Linha de botões logo abaixo do nome do card (ex.: apostila), ou vazio se não houver."""
    if not botoes:
        return ""
    return f'\n            <div class="acoes">{montar_botoes(botoes)}</div>'


def montar_card(dados):
    """Monta um card (article.aula) a partir de rótulo, título, meta e botões.

    "botoes_titulo" (opcional) fica abaixo do nome; "botoes", no fim do card.
    """
    botoes = montar_botoes(dados["botoes"])
    botoes_titulo = montar_botoes_titulo(dados.get("botoes_titulo"))
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
            </div>{botoes_titulo}
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

    O bloqueio das atividades vem do banco de dados (atividade.ativo): o professor liga ou
    desliga o interruptor "Bloquear" de cada card (assets/js/indice-atividades-bloqueio.js).
    """
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {MARCADOR}
    <title>{escapar(dados["titulo"])}</title>
    <link rel="stylesheet" href="{dados["css"]}">{dados.get("menu", "")}{dados.get("crud", "")}
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


def icone_do_tipo_atividade(nome_arquivo):
    """Ícone do card conforme o tipo da atividade, lido do nome do arquivo.

    Args:
        nome_arquivo: Nome da página (ex.: "ATIVIDADE-PRATICA-AULA-03.html").

    Returns:
        Emoji do tipo (📝 objetiva, ✍️ prática/discursiva, 📊 Excel, 👥 equipe, 📘 apostila).
    """
    for padrao, icone in ICONES_TIPO_ATIVIDADE:
        if padrao.search(nome_arquivo):
            return icone
    return ICONE_ATIVIDADE_PADRAO


def card_atividade(atividade, pasta_indice, materia):
    """Card de um arquivo de atividade no índice da matéria."""
    tipo = EXTENSOES_ATIVIDADE[atividade.suffix.lower()]
    local = os.path.relpath(atividade.parent, materia).replace(os.sep, " / ")
    return montar_card({
        "icone": icone_do_tipo_atividade(atividade.name),
        "rotulo": local,
        "arquivo": atividade.name,
        "titulo": nome_legivel(Path(atividade.stem)),
        "meta": f"{tipo.split(maxsplit=1)[1]} · {atividade.name}",
        "botoes": [("Abrir", link_relativo(atividade, pasta_indice), "principal")]
        + botoes_slides_aula(numero_aula_do_arquivo(atividade), materia / NOME_PASTA_ATIVIDADES),
    })


def numero_aula_do_arquivo(atividade):
    """Número da aula escrito no nome da página ("ATIVIDADES-AULA-01-20-QUESTOES" → "01").

    Returns:
        Número com 2 dígitos ou None se o nome não tiver "AULA-NN".
    """
    encontrado = PADRAO_AULA_NOME.search(atividade.stem)
    return encontrado.group(1) if encontrado else None


def agrupar_por_aula(atividades):
    """Agrupa as páginas da mesma aula (mesma pasta e mesmo "AULA-NN") num card só.

    Regra "cada card ligado a apenas 1 aula": páginas da mesma aula não podem ficar em cards
    separados. Só agrupa quando há 2 ou mais páginas da aula; a ordem segue a 1ª página.

    Returns:
        Lista de grupos (listas de páginas), na ordem do índice.
    """
    grupos = {}
    for atividade in atividades:
        numero = numero_aula_do_arquivo(atividade)
        chave = (atividade.parent, numero) if numero else atividade
        grupos.setdefault(chave, []).append(atividade)
    return list(grupos.values())


def botoes_slides_aula(numero, pasta_indice):
    """Botão "📕 Slides (PDF)" da aula, se existir <MATÉRIA>/AULAS/AULA-NN-SLIDES.pdf.

    Args:
        numero: Número da aula com 2 dígitos (ou None).
        pasta_indice: Pasta ATIVIDADES da matéria (a matéria é a pasta-mãe).

    Returns:
        Lista com o botão (texto, href, classe) ou lista vazia.
    """
    if not numero:
        return []
    slides = pasta_indice.parent / PASTA_AULAS / MODELO_SLIDES_AULA.format(numero=numero)
    if not slides.is_file():
        return []
    return [(TEXTO_BOTAO_SLIDES, link_relativo(slides, pasta_indice), "")]


def card_aula_agrupada(paginas, pasta_indice):
    """Card de uma aula com várias páginas (um botão por página; discursivas por último).

    O ícone do card é o do tipo da 1ª página que não seja prática nem discursiva
    (normalmente a objetiva); se todas forem, usa o da 1ª página.
    """
    paginas = sorted(paginas, key=lambda p: ("DISCURSIVA" in p.name.upper(), p.name.lower()))
    numero = numero_aula_do_arquivo(paginas[0])
    principal = next(
        (p for p in paginas if not re.search(r"PRATICA|DISCURSIVA", p.name, re.IGNORECASE)),
        paginas[0],
    )
    return montar_card({
        "icone": icone_do_tipo_atividade(principal.name),
        "rotulo": f"AULA {numero}",
        "arquivo": paginas[0].name,
        "titulo": f"Atividades da Aula {numero}",
        "meta": f"{len(paginas)} páginas · " + " · ".join(p.name for p in paginas),
        "botoes": [
            (nome_legivel(Path(p.stem)), link_relativo(p, pasta_indice), "principal")
            for p in paginas
        ] + botoes_slides_aula(numero, pasta_indice),
    })


def gerar_indice_materia(materia, curso, forcar):
    """Gera ATIVIDADES/index.html da matéria. Returns: (atividades, situação)."""
    pasta_indice = materia / NOME_PASTA_ATIVIDADES
    atividades = listar_atividades(materia)
    cards = [
        card_atividade(grupo[0], pasta_indice, materia) if len(grupo) == 1
        else card_aula_agrupada(grupo, pasta_indice)
        for grupo in agrupar_por_aula(atividades)
    ]
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
    dados_pagina["menu"] = montar_tags_menu(pasta_indice, "    ")
    dados_pagina["crud"] = montar_tags_crud(pasta_indice, "    ")
    pagina = montar_pagina(dados_pagina)
    return atividades, gravar_indice(pasta_indice / NOME_INDICE, pagina, forcar)


def botoes_apostila(materia, curso):
    """Botão da apostila HTML da matéria, quando ela existir.

    Args:
        materia: Pasta da matéria.
        curso: Pasta do curso (origem do link).

    Returns:
        Lista com o botão (texto, href, classe), ou vazia se não houver apostila.
    """
    apostilas = sorted((materia / PASTA_APOSTILA).glob(PADRAO_APOSTILA))
    if not apostilas:
        return []
    return [(TEXTO_BOTAO_APOSTILA, link_relativo(apostilas[0], curso), "")]


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
        "botoes_titulo": botoes_apostila(materia, curso),
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


def gerar_indice_raiz(pastas_forcadas):
    """Gera todos os índices a partir da raiz. Returns: lista de (situação, caminho)."""
    situacoes = []
    cursos = listar_subpastas(PASTA_MATERIAIS)
    cards = [card_curso(c, *gerar_indice_curso(c, pastas_forcadas, situacoes)) for c in cursos]
    pagina = montar_pagina({
        "titulo": "📚 Índice de Atividades",
        "subtitulo": "Escolha o curso para ver as matérias e suas atividades",
        "css": link_relativo(CSS_INDICE, RAIZ_PROJETO),
        "resumo": f"<span>{len(cursos)} cursos</span>",
        "cards": cards,
        "rodape": TITULO_SITE,
    })
    caminho_raiz = RAIZ_PROJETO / NOME_INDICE
    # O index.html da raiz lista os cursos do banco (cursos_do_usuario): nunca sobrescrever.
    situacoes.append((gravar_indice(caminho_raiz, pagina), caminho_raiz))
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
