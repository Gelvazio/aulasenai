"""Gera as páginas de atividade e o index.html a partir dos .md de questões.

Uso: C:\\Python314\\python.exe assets\\gerador-atividades\\gerar_atividades.py <pasta ATIVIDADES> [--so=ARQ.md]
Fonte única do conteúdo: ATIVIDADES-AULA-NN-50-QUESTOES.md (pasta ATIVIDADES).
Dados da matéria: <pasta ATIVIDADES>/atividades.json com uc, uc_curta, curso e docente.
"""
import html
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "gerador-menu"))
from tags_menu import montar_tags_menu  # noqa: E402
from tags_header import inserir_header_em_html  # noqa: E402

GERADOR = Path(__file__).resolve().parent
ASSETS = GERADOR.parent
TEMPLATE = (GERADOR / "template_atividade.html").read_text(encoding="utf-8")
ARQUIVO_DADOS = "atividades.json"
CAMPOS_DADOS = ("uc", "uc_curta", "curso", "docente")
CAMPO_FOLHA_RESPOSTAS = "Folha de respostas"
CAMPO_TURMA = "Turma"
CAMPO_ROTULO = "Rótulo da aula"
CAMPO_PDF_GABARITO = "Exportar PDF com gabarito"
PREFIXOS_SEM_SUFIXO = ("AVALIACAO-", "ATIVIDADE-")
VALOR_ATIVADO = "sim"
URL_SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"

e = html.escape


def ler_dados_materia(pasta):
    """Lê atividades.json da pasta; os nomes da matéria nunca ficam fixos no gerador."""
    caminho = pasta / ARQUIVO_DADOS
    if not caminho.exists():
        raise SystemExit(f"{caminho} não encontrado (campos: {', '.join(CAMPOS_DADOS)})")
    dados = json.loads(caminho.read_text(encoding="utf-8"))
    faltando = [c for c in CAMPOS_DADOS if not dados.get(c)]
    if faltando:
        raise SystemExit(f"{caminho}: campos ausentes: {', '.join(faltando)}")
    return dados


def caminho_assets(pasta):
    """Caminho relativo da pasta de atividades até assets/, no formato de URL."""
    return os.path.relpath(ASSETS, pasta).replace(os.sep, "/")


def campo(texto, nome):
    m = re.search(rf"\*\*{re.escape(nome)}:\*\*\s*(.+?)\s*$", texto, flags=re.M)
    if not m:
        raise ValueError(f"campo '{nome}' não encontrado")
    return m.group(1).strip().strip("`")


def campo_opcional(texto, nome):
    """Lê um campo de metadados que pode faltar no .md; devolve "" quando ausente."""
    try:
        return campo(texto, nome)
    except ValueError:
        return ""


def tags_folha_respostas(ativada, assets, raiz):
    """Tags da folha de respostas com gravação no banco (regra: alternativas só no banco).

    Inclui supabase-js (CDN), js/supabase.js, js/login.js, o provedor do banco e o script da folha.
    """
    if not ativada:
        return "", ""
    css = f'\n    <link rel="stylesheet" href="{assets}/css/respostas-atividade.css">'
    scripts = [
        URL_SUPABASE_JS,
        f"{raiz}/js/supabase.js",
        f"{raiz}/js/login.js",
        f"{assets}/js/respostas-atividade-banco.js",
        f"{assets}/js/respostas-atividade.js",
    ]
    js = "".join(f'\n    <script src="{src}"></script>' for src in scripts)
    return css, js


def tag_gabarito(folha_ativada, gabarito_json):
    """Gabarito embutido só em páginas sem folha/banco (com banco, fica na tabela gabarito)."""
    if folha_ativada:
        return ""
    return f'    <script type="application/json" id="gabarito-dados">{gabarito_json}</script>\n'


def ler_questoes(md_path):
    texto = md_path.read_text(encoding="utf-8")
    meta = {
        "aula": campo(texto, "Aula"),
        "tema": campo(texto, "Tema"),
        "icone": campo(texto, "Ícone"),
        "duracao": campo(texto, "Duração"),
        "total": int(campo(texto, "Total de questões")),
        "capacidade": campo(texto, "Capacidade avaliada"),
        "conteudo": campo(texto, "Conteúdo-base"),
        "pdf": campo(texto, "Slides"),
        "folha": campo_opcional(texto, CAMPO_FOLHA_RESPOSTAS).lower() == VALOR_ATIVADO,
        "turma": campo_opcional(texto, CAMPO_TURMA),
    }
    meta["letras"] = ""
    meta["pdf_gabarito"] = campo_opcional(texto, CAMPO_PDF_GABARITO).lower() == VALOR_ATIVADO
    meta["rotulo"] = campo_opcional(texto, CAMPO_ROTULO) or f"Aula {meta['aula']}"
    itens = []
    for bloco in re.split(r"^## ", texto, flags=re.M)[1:]:
        linhas = bloco.strip().splitlines()
        m = re.match(r"ITEM (\d+) — (.+)", linhas[0])
        if not m:
            continue
        item = {"num": m.group(1), "titulo": m.group(2).strip(), "contexto": "", "comando": "", "alts": [], "gab": ""}
        atual = None
        for ln in linhas[1:]:
            s = ln.strip()
            if s.startswith("**Contexto:**"):
                atual = "contexto"
            elif s.startswith("**Comando:**"):
                atual = "comando"
            elif s.startswith("**Alternativas:**"):
                atual = "alts"
            elif s.startswith("**Gabarito:**"):
                item["gab"] = s.split("**Gabarito:**")[1].strip()
                atual = None
            elif s.startswith("---"):
                break
            elif s and atual == "alts" and re.match(r"- [A-E]\)", s):
                item["alts"].append((s[2], s[5:].strip()))
            elif s and atual in ("contexto", "comando"):
                item[atual] = (item[atual] + " " + s).strip()
        itens.append(item)

    meta["letras"] = ", ".join(sorted({letra for it in itens for letra, _ in it["alts"]}))
    nome = md_path.name
    assert len(itens) == meta["total"], f"{nome}: esperava {meta['total']} itens, achei {len(itens)}"
    for it in itens:
        assert len(it["alts"]) in (4, 5), f"{nome} ITEM {it['num']}: precisa de 4 ou 5 alternativas"
        assert it["gab"] in ("A", "B", "C", "D", "E"), f"{nome} ITEM {it['num']}: gabarito inválido"
        assert it["comando"], f"{nome} ITEM {it['num']}: sem comando"
    return meta, itens


def card(it):
    partes = [f'''            <div class="aula-card questao">
                <span class="aula-badge">ITEM {it["num"]}</span>
                <div class="aula-title">{e(it["titulo"])}</div>''']
    if it["contexto"]:
        partes.append(f'''                <div class="content-box">
                    <div class="content-label">📋 CONTEXTO</div>
                    <div class="content-text">{e(it["contexto"])}</div>
                </div>''')
    partes.append(f'''                <div class="content-box">
                    <div class="content-label">🎬 COMANDO</div>
                    <div class="content-text">{e(it["comando"])}</div>
                </div>
                <div class="content-box">
                    <div class="content-label">📝 ALTERNATIVAS</div>
                    <ul class="alternativas">''')
    for letra, txt in it["alts"]:
        partes.append(f'                        <li><span class="letra">{letra})</span>{e(txt)}</li>')
    partes.append('''                    </ul>
                </div>
            </div>''')
    return "\n".join(partes)


BLOCO_PDF_GABARITO = '''
            <button class="btn-export" id="btnExportarPDFGabarito" type="button" data-somente-perfil="PROFESSOR" hidden title="Só o professor: atividade completa com o gabarito real (lido do banco)">📥 Exportar PDF com gabarito</button>
            <button class="btn-export" id="btnExportarGabarito" type="button" hidden title="Professor: gabarito real. Aluno: suas respostas da tentativa de maior nota.">🔑 Exportar Gabarito</button>'''


def caminho_saida(md_path):
    """HTML da atividade: avaliações e atividades extraídas do Word (AVALIACAO-*, ATIVIDADE-*) perdem o sufixo -QUESTOES; aulas o mantêm."""
    if md_path.stem.startswith(PREFIXOS_SEM_SUFIXO):
        return md_path.with_name(md_path.stem.removesuffix("-QUESTOES") + ".html")
    return md_path.with_suffix(".html")


def gerar_atividade(md_path, dados):
    meta, itens = ler_questoes(md_path)
    gabarito_json = json.dumps(
        [["ITEM " + it["num"], it["titulo"], it["gab"]] for it in itens], ensure_ascii=False
    ).replace("</", "<\\/")
    assets = caminho_assets(md_path.parent)
    raiz = os.path.relpath(ASSETS.parent, md_path.parent).replace(os.sep, "/")
    folha_css, folha_js = tags_folha_respostas(meta["folha"], assets, raiz)
    pagina = TEMPLATE
    trocas = {
        "{{CARDS}}": "\n\n".join(card(it) for it in itens),
        "{{GABARITO}}": tag_gabarito(meta["folha"], gabarito_json),
        "{{LOGIN}}": ' data-login="sim"' if meta["folha"] else "",
        "{{TOTAL}}": str(meta["total"]),
        "{{AULA}}": e(meta["aula"]),
        "{{ROTULO_AULA}}": e(meta["rotulo"]),
        "{{LETRAS}}": e(meta["letras"]),
        "{{PDF_GABARITO}}": BLOCO_PDF_GABARITO if meta["pdf_gabarito"] else "",
        "{{PDF_GABARITO_JS}}": (f'\n    <script src="{assets}/js/avaliacao-pdf-professor.js"></script>'
                                if meta["pdf_gabarito"] else ""),
        "{{TEMA}}": e(meta["tema"]),
        "{{ICONE}}": meta["icone"],
        "{{DURACAO}}": e(meta["duracao"]),
        "{{CAPACIDADE}}": e(meta["capacidade"]),
        "{{ARQUIVO_MD}}": e(md_path.name),
        "{{UC}}": e(dados["uc"]),
        "{{UC_CURTA}}": e(dados["uc_curta"]),
        "{{CURSO}}": e(dados["curso"]),
        "{{DOCENTE}}": e(dados["docente"]),
        "{{FOLHA_CSS}}": folha_css,
        "{{FOLHA_JS}}": folha_js,
        "{{TURMA}}": f' data-turma="{e(meta["turma"])}"' if meta["turma"] else "",
        "{{ASSETS}}": assets,
        "{{MENU}}": montar_tags_menu(md_path.parent, "    "),
    }
    for chave, valor in trocas.items():
        pagina = pagina.replace(chave, valor)
    assert "{{" not in pagina, f"{md_path.name}: placeholder não substituído"
    saida = caminho_saida(md_path)
    saida.write_text(inserir_header_em_html(pagina, md_path.parent), encoding="utf-8")
    meta["html"] = saida.name
    meta["md"] = md_path.name
    meta["titulos"] = [it["titulo"] for it in itens]
    return meta


def link(pasta, nome, rotulo, classe):
    if not (pasta / nome).exists():
        return f'<span class="btn off" title="Arquivo não encontrado">{rotulo}</span>'
    return f'<a class="btn {classe}" href="{quote(nome)}">{rotulo}</a>'


def gerar_index(pasta, aulas, dados):
    cards = []
    for a in aulas:
        topicos = "".join(f"<li>{e(t)}</li>" for t in a["titulos"])
        cards.append(f'''        <article class="aula">
            <div class="topo">
                <span class="icone">{a["icone"]}</span>
                <div>
                    <div class="num">AULA {e(a["aula"])}</div>
                    <h2>{e(a["tema"])}</h2>
                </div>
            </div>
            <p class="meta">{a["total"]} questões · múltipla escolha · {e(a["duracao"])}</p>
            <div class="acoes">
                {link(pasta, a["html"], "📝 Atividade", "principal")}
                {link(pasta, a["md"], "📄 Questões (.md)", "")}
                {link(pasta, a["conteudo"], "📚 Conteúdo (.md)", "")}
                {link(pasta, a["pdf"], "📕 Slides (PDF)", "")}
            </div>
            <details>
                <summary>Ver os {a["total"]} itens</summary>
                <ol>{topicos}</ol>
            </details>
        </article>''')

    total_q = sum(a["total"] for a in aulas)
    uc_curta = e(dados["uc_curta"])
    pagina = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Atividades — {uc_curta}</title>
    <link rel="stylesheet" href="{caminho_assets(pasta)}/css/indice-atividades.css">{montar_tags_menu(pasta, "    ")}
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Índice de Atividades — {uc_curta}</h1>
            <p>{e(dados["curso"])} — SENAI</p>
        </header>
        <div class="resumo">
            <span>{len(aulas)} aulas</span><span>·</span><span>{total_q} questões</span><span>·</span><span>50 questões por aula, múltipla escolha (A–D), com exportação em PDF e gabarito</span>
        </div>
        <section class="grade">
{chr(10).join(cards)}
        </section>
    </div>
    <footer>
        <p>Páginas geradas a partir dos arquivos ATIVIDADES-AULA-NN-50-QUESTOES.md — edite o .md e rode assets/gerador-atividades/gerar_atividades.py.</p>
    </footer>
</body>
</html>
'''
    (pasta / "index.html").write_text(inserir_header_em_html(pagina, pasta), encoding="utf-8")


def main():
    if len(sys.argv) not in (2, 3):
        raise SystemExit("Uso: gerar_atividades.py <pasta ATIVIDADES> [--so=<arquivo .md>]")
    pasta = Path(sys.argv[1]).resolve()
    if not pasta.is_dir():
        raise SystemExit(f"Pasta não encontrada: {pasta}")
    dados = ler_dados_materia(pasta)
    if len(sys.argv) == 3 and sys.argv[2].startswith("--so="):
        md = pasta / sys.argv[2].split("=", 1)[1]
        meta = gerar_atividade(md, dados)
        print(f"{meta['rotulo']}: {meta['total']} itens -> {meta['html']} (index.html não alterado)")
        return
    arquivos = sorted(pasta.glob("ATIVIDADES-AULA-*-50-QUESTOES.md"))
    aulas = [gerar_atividade(md, dados) for md in arquivos]
    gerar_index(pasta, aulas, dados)
    for a in aulas:
        print(f"Aula {a['aula']}: {a['total']} itens -> {a['html']}")
    print("index.html gerado com", len(aulas), "aulas")


if __name__ == "__main__":
    main()
