"""Gera uma atividade prática de Excel (capa, uma página por questão e imagens SVG).

Uso:
    C:\\Python314\\python.exe assets\\gerador-atividade-excel\\gerar_atividade_excel.py <pasta>

A <pasta> contém o atividade.json. A capa é gravada ao lado da pasta, com o mesmo nome
(<pasta>.html); as questões ficam dentro da pasta e as imagens em <pasta>/img/.
"""

import json
import os
import re
import sys
from html import escape

from base_excel import gerar_base_xlsx
from sobreposicoes_excel import desenhar_sobreposicoes, montar_svg
from tela_excel import TelaExcel

PASTA_ASSETS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(PASTA_ASSETS, "gerador-menu"))
from tags_menu import montar_tags_menu  # noqa: E402
from tags_header import inserir_header_em_html  # noqa: E402

PASTA_IMAGENS = "img"
ROTULOS_CAIXAS = {
    "dica": "💡 Dica",
    "atencao": "⚠️ Atenção",
    "verifique": "✅ Verifique",
    "libre": "🐧 No LibreOffice Calc",
}


def carregar_atividade(pasta):
    """Lê o atividade.json da pasta.

    Args:
        pasta: Pasta da atividade.

    Returns:
        Dicionário com o conteúdo da atividade.

    Raises:
        FileNotFoundError: Se o atividade.json não existir.
    """
    caminho = os.path.join(pasta, "atividade.json")
    if not os.path.isfile(caminho):
        raise FileNotFoundError(f"atividade.json não encontrado em {pasta}")
    with open(caminho, encoding="utf-8") as arquivo:
        return json.load(arquivo)


def gerar_imagem(especificacao, atividade, caminho):
    """Desenha a tela do Excel descrita e grava o SVG.

    Args:
        especificacao: Especificação da imagem.
        atividade: Atividade completa (planilhas e nome do arquivo).
        caminho: Caminho do SVG a gravar.
    """
    tela = TelaExcel(especificacao, atividade["planilhas"], atividade["arquivo_excel"])
    tela.calcular_layout()
    tela.desenhar_janela()
    tela.desenhar_grade()
    tela.desenhar_abas()
    desenhar_sobreposicoes(tela)
    with open(caminho, "w", encoding="utf-8") as arquivo:
        arquivo.write(montar_svg(tela))


def formatar_texto(texto):
    """Converte a marcação simples do JSON em HTML seguro.

    **negrito**, `célula ou valor` e [[tecla]] viram <strong>, <span class="celula"> e
    <span class="tecla">.

    Args:
        texto: Texto com marcação simples.

    Returns:
        HTML escapado com as marcações convertidas.
    """
    html = escape(str(texto))
    html = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", html)
    html = re.sub(r"`(.+?)`", r'<span class="celula">\1</span>', html)
    return re.sub(r"\[\[(.+?)\]\]", r'<span class="tecla">\1</span>', html)


def caminho_assets(pasta_destino):
    """Calcula o caminho relativo da página até a pasta assets/.

    Args:
        pasta_destino: Pasta onde a página será gravada.

    Returns:
        Caminho relativo com barras normais.
    """
    return os.path.relpath(PASTA_ASSETS, pasta_destino).replace("\\", "/")


def cabecalho_html(titulo, pasta, atividade_id):
    """Monta o início do documento HTML com CSS e JS compartilhados.

    Inclui o menu de atividades (js/menu.js) quando a pasta tem MENU-ATIVIDADES.js acima.

    Args:
        titulo: Título da aba do navegador.
        pasta: Pasta onde a página será gravada.
        atividade_id: Identificador usado pelo JS.

    Returns:
        HTML até a abertura da div.pagina.
    """
    assets = caminho_assets(pasta)
    return (
        '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        f"<title>{escape(titulo)}</title>\n"
        f'<link rel="stylesheet" href="{assets}/css/atividade-pratica-excel.css">\n'
        f'<script src="{assets}/js/atividade-pratica-excel.js" defer></script>'
        f"{montar_tags_menu(pasta)}\n"
        f'</head>\n<body data-atividade="{escape(atividade_id)}">\n<div class="pagina">\n'
    )


def selos_html(selos):
    """Monta os selos do cabeçalho (natureza, tempo, pontos...).

    Args:
        selos: Lista de (texto, classe_extra).

    Returns:
        HTML dos selos.
    """
    return "".join(
        f'<span class="selo {classe}">{escape(texto)}</span>' for texto, classe in selos
    )


def topo_html(atividade, titulo, subtitulo, selos):
    """Monta o cabeçalho visual com identificação do aluno.

    Args:
        atividade: Atividade completa.
        titulo: Título grande.
        subtitulo: Linha abaixo do título.
        selos: Lista de (texto, classe_extra).

    Returns:
        HTML do cabeçalho.
    """
    return (
        '<header class="cabecalho">\n'
        f'<div class="cabecalho__marca">SENAI · {escape(atividade["unidade_curricular"])}</div>\n'
        f'<h1 class="cabecalho__titulo">{escape(titulo)}</h1>\n'
        f'<p class="cabecalho__subtitulo">{escape(subtitulo)}</p>\n'
        f'<div class="cabecalho__selos">{selos_html(selos)}</div>\n'
        '<div class="identificacao">'
        '<div class="identificacao__campo">Nome:</div>'
        '<div class="identificacao__campo">Turma:</div>'
        f'<div class="identificacao__campo">Data: {escape(atividade["data"])}</div>'
        "</div>\n</header>\n"
    )


def navegacao_html(anterior, capa, proxima):
    """Monta a barra de navegação entre capa e questões.

    Args:
        anterior: Link da página anterior (ou None).
        capa: Link da capa.
        proxima: Link da próxima página (ou None).

    Returns:
        HTML da navegação.
    """
    link_anterior = (
        f'<a class="botao" href="{anterior}">← Questão anterior</a>' if anterior
        else '<span class="botao botao--desativado">←</span>'
    )
    link_proxima = (
        f'<a class="botao" href="{proxima}">Próxima questão →</a>' if proxima
        else '<span class="botao botao--desativado">→</span>'
    )
    return (
        f'<nav class="navegacao">{link_anterior}'
        f'<a class="botao botao--excel" href="{capa}">🏠 Capa da atividade</a>'
        '<button class="botao" type="button" data-acao="imprimir">🖨️ Imprimir / PDF</button>'
        f"{link_proxima}</nav>\n"
    )


def caixas_html(caixas):
    """Monta as caixas de Dica, Atenção, Verifique e LibreOffice de um passo.

    Args:
        caixas: Lista de {"tipo", "texto"}.

    Returns:
        HTML das caixas.
    """
    return "".join(
        f'<div class="caixa caixa--{caixa["tipo"]}"><span class="caixa__titulo">'
        f'{ROTULOS_CAIXAS[caixa["tipo"]]}</span>{formatar_texto(caixa["texto"])}</div>\n'
        for caixa in caixas
    )


def dados_no_passo(atividade, passo):
    """Anexa ao passo a tabela "Dados para digitar" (com botão Copiar), quando pedida no JSON.

    O passo pede a tabela com "tabela_dados": posição da tabela em capa.tabelas (0 = primeira).

    Args:
        atividade: Atividade completa.
        passo: Dados do passo.

    Returns:
        Cópia do passo com "_dados_html"; o próprio passo se não pediu tabela.
    """
    if "tabela_dados" not in passo:
        botao = botao_copiar_imagem_html(atividade, passo["imagem"])
        return {**passo, "_copiar_html": botao} if botao else passo
    tabela = atividade["capa"]["tabelas"][passo["tabela_dados"]]
    return {**passo, "_dados_html": tabela_dados_html(atividade, tabela)}


# Só tabelas com mais de 1 linha de dados (fora o cabeçalho) ganham o botão Copiar.
MINIMO_LINHAS_PARA_COPIAR = 2


def texto_com_colunas_alinhadas(linhas, colunas_entrada):
    """Monta o texto para colar em A1 mantendo cada dado na sua coluna da planilha.

    Colunas de fórmula (fora das colunas de entrada) entram em branco, para os alunos as
    fazerem; assim a colagem em A1 não desloca nenhuma coluna.

    Args:
        linhas: Linhas da planilha (cabeçalho e dados).
        colunas_entrada: Letras das colunas com dados digitáveis (ex.: ["A", "B", "D", "E"]).

    Returns:
        Texto com colunas separadas por tabulação e linhas por quebra de linha.
    """
    primeira, ultima = min(colunas_entrada), max(colunas_entrada)
    letras = [chr(c) for c in range(ord(primeira), ord(ultima) + 1)]
    tabulacao, quebra = chr(9), chr(10)
    return quebra.join(
        tabulacao.join(
            str(linha[ord(c) - 65]).replace("R$ ", "") if c in colunas_entrada else ""
            for c in letras
        )
        for linha in linhas
    )


def texto_dados_da_imagem(atividade, imagem):
    """Texto (colunas separadas por tabulação) com os dados digitáveis mostrados na imagem.

    Só entram as colunas de entrada da planilha (as listadas em capa.tabelas) e as linhas que
    aparecem na imagem; colunas de fórmula ficam de fora, porque os alunos é que as fazem.

    Args:
        atividade: Atividade completa.
        imagem: Especificação da imagem do passo.

    Returns:
        Texto para colar no Excel, ou "" se a imagem não mostra dados digitáveis.
    """
    entradas = {t["planilha"]: t["colunas"] for t in atividade["capa"].get("tabelas", [])}
    planilha = atividade["planilhas"].get(imagem.get("aba_ativa"), {})
    colunas = entradas.get(imagem.get("aba_ativa"))
    if not colunas or "linhas" not in planilha or not isinstance(imagem.get("linhas"), int):
        return ""

    primeira, _, ultima = imagem.get("colunas", "A:Z").partition(":")
    visiveis = [c for c in colunas if primeira <= c <= (ultima or primeira)]
    linhas = planilha["linhas"][: imagem["linhas"]]
    linhas_de_dados = len(linhas) - 1
    if linhas_de_dados < MINIMO_LINHAS_PARA_COPIAR or not visiveis:
        return ""

    return texto_com_colunas_alinhadas(linhas, visiveis)


def botao_copiar_imagem_html(atividade, imagem):
    """Botão "Copiar" com os dados digitáveis mostrados na imagem do passo.

    Args:
        atividade: Atividade completa.
        imagem: Especificação da imagem do passo.

    Returns:
        HTML do botão (o texto vai no atributo data-copiar), ou "" sem dados a copiar.
    """
    texto = texto_dados_da_imagem(atividade, imagem)
    if not texto:
        return ""

    valor = escape(texto, quote=True).replace(chr(10), "&#10;").replace(chr(9), "&#9;")
    return (
        '<p class="passo__copiar"><button type="button" class="botao botao--copiar" '
        f'data-copiar="{valor}">📋 Copiar</button> '
        '<span class="passo__legenda">Copia só os dados da tabela (sem fórmulas nem formatação).'
        "</span></p>\n"
    )


def passo_html(questao, indice, passo):
    """Monta um passo: número, título, imagem, instruções, fórmula e caixas.

    Args:
        questao: Questão a que o passo pertence.
        indice: Número do passo (a partir de 1).
        passo: Dados do passo.

    Returns:
        HTML do passo.
    """
    imagem = f'{PASTA_IMAGENS}/{questao["id"]}-passo-{indice:02d}.svg'
    instrucoes = "".join(f"<li>{formatar_texto(item)}</li>" for item in passo["instrucoes"])
    formula = ""
    if passo.get("formula"):
        formula = f'<code class="formula">{escape(passo["formula"])}</code>\n'
    return (
        '<article class="passo">\n<div class="passo__topo">'
        f'<span class="passo__numero">{indice}</span>'
        f'<h3 class="passo__titulo">{escape(passo["titulo"])}</h3></div>\n'
        f'<figure class="passo__figura"><img src="{imagem}" '
        f'alt="{escape(passo["imagem"].get("alt", passo["titulo"]))}" loading="lazy">'
        f'<figcaption class="passo__legenda">{formatar_texto(passo.get("legenda", ""))}'
        "</figcaption></figure>\n"
        f'{passo.get("_copiar_html", "")}'
        f'<div class="passo__corpo"><ol>{instrucoes}</ol>\n{formula}{passo.get("_dados_html", "")}'
        f'{caixas_html(passo.get("caixas", []))}'
        f'<label class="concluido"><input type="checkbox" '
        f'data-passo="{questao["id"]}-{indice}"> Passo concluído</label></div>\n</article>\n'
    )


def criterios_html(questao):
    """Monta a tabela de critérios de correção da questão.

    Args:
        questao: Dados da questão.

    Returns:
        HTML da seção de critérios.
    """
    linhas = "".join(
        f"<tr><td>{formatar_texto(criterio)}</td><td>{escape(pontos)}</td></tr>"
        for criterio, pontos in questao["criterios"]
    )
    return (
        '<section class="bloco">\n<h2>📋 Como esta questão será avaliada</h2>\n'
        '<table class="tabela"><thead><tr><th>Critério</th><th>Pontos</th></tr></thead>'
        f"<tbody>{linhas}<tr><td><strong>Total da questão</strong></td>"
        f'<td><strong>{escape(questao["pontos"])}</strong></td></tr></tbody></table>\n'
        "</section>\n"
    )


def objetivo_html(questao):
    """Monta o bloco "O que você vai fazer" da questão.

    Args:
        questao: Dados da questão.

    Returns:
        HTML do bloco de objetivo.
    """
    recursos = "".join(f"<li>{formatar_texto(item)}</li>" for item in questao["voce_vai_usar"])
    return (
        '<section class="bloco">\n<h2>🎯 O que você vai fazer</h2>\n'
        f'<p>{formatar_texto(questao["objetivo"])}</p>\n'
        f"<h3>Você vai usar</h3><ul>{recursos}</ul>\n"
        f'<p><strong>Aba de trabalho:</strong> {formatar_texto(questao["aba"])} · '
        f'<strong>Slides de apoio:</strong> {escape(questao["slides_apoio"])}</p>\n'
        f'{caixas_html(questao.get("caixas", []))}</section>\n'
    )


def pagina_questao(atividade, indice, pasta):
    """Gera o HTML e as imagens de uma questão.

    Args:
        atividade: Atividade completa.
        indice: Posição da questão na lista (a partir de 0).
        pasta: Pasta da atividade.
    """
    questoes = atividade["questoes"]
    questao = questoes[indice]
    for numero, passo in enumerate(questao["passos"], start=1):
        caminho = os.path.join(pasta, PASTA_IMAGENS, f'{questao["id"]}-passo-{numero:02d}.svg')
        gerar_imagem(passo["imagem"], atividade, caminho)
    anterior = questoes[indice - 1]["arquivo"] if indice > 0 else None
    proxima = questoes[indice + 1]["arquivo"] if indice + 1 < len(questoes) else None
    capa = "../" + atividade["id"] + ".html"
    titulo = f'Questão {questao["numero"]} — {questao["titulo"]}'
    selos = [(atividade["natureza"], "selo--formativa"), ("⏱ " + questao["tempo"], ""),
             (questao["pontos"] + " pontos", ""), (f'{len(questao["passos"])} passos', "")]
    html = cabecalho_html(titulo, pasta, atividade["id"])
    html += topo_html(atividade, titulo, atividade["titulo"], selos)
    html += navegacao_html(anterior, capa, proxima) + objetivo_html(questao)
    html += "".join(passo_html(questao, numero, dados_no_passo(atividade, passo))
                    for numero, passo in enumerate(questao["passos"], start=1))
    html += criterios_html(questao) + navegacao_html(anterior, capa, proxima)
    html += rodape_html(atividade)
    with open(os.path.join(pasta, questao["arquivo"]), "w", encoding="utf-8") as arquivo:
        arquivo.write(inserir_header_em_html(html, pasta))


def rodape_html(atividade):
    """Monta o rodapé e fecha o documento.

    Args:
        atividade: Atividade completa.

    Returns:
        HTML final da página.
    """
    return (
        f'<footer class="rodape">{escape(atividade["curso"])} · '
        f'{escape(atividade["unidade_curricular"])} · Empresa e dados fictícios, criados para '
        "fins didáticos.</footer>\n</div>\n</body>\n</html>\n"
    )


def tabela_dados_html(atividade, tabela):
    """Monta a tabela de dados que o aluno vai digitar, a partir da planilha do JSON.

    Args:
        atividade: Atividade completa.
        tabela: {"titulo", "planilha", "colunas", "linhas"}.

    Returns:
        HTML da tabela.
    """
    linhas = atividade["planilhas"][tabela["planilha"]]["linhas"][: tabela.get("linhas", 999)]
    indices = [ord(coluna) - 65 for coluna in tabela["colunas"]]
    cabecalho = "".join(f"<th>{escape(str(linhas[0][i]))}</th>" for i in indices)
    corpo = "".join(
        "<tr>" + "".join(f"<td>{escape(str(linha[i]).replace('R$ ', ''))}</td>" for i in indices)
        + "</tr>"
        for linha in linhas[1:]
    )
    colunas = ", ".join(tabela["colunas"])
    copia = escape(texto_com_colunas_alinhadas(linhas, tabela["colunas"]), quote=True)
    copia = copia.replace(chr(10), "&#10;").replace(chr(9), "&#9;")
    return (
        f'<h3>{escape(tabela["titulo"])}</h3>\n<p class="passo__legenda">Colunas da planilha: '
        f"{colunas}. Ao copiar, cole na célula A1: colunas de fórmula ficam em branco.</p>\n"
        f'<div class="tabela__rolagem"><table class="tabela tabela--dados" data-copiar="{copia}">'
        f"<thead><tr>{cabecalho}</tr></thead><tbody>{corpo}</tbody></table></div>\n"
    )


def download_html(atividade):
    """Monta o botão de download da planilha de base, quando a atividade tiver uma.

    Args:
        atividade: Atividade completa.

    Returns:
        HTML do botão com a explicação, ou texto vazio.
    """
    base = atividade.get("arquivo_base")
    if not base:
        return ""
    return (
        f'<p><a class="botao botao--excel" href="{atividade["id"]}/{escape(base["nome"])}" '
        f'download>⬇️ Baixar {escape(base["nome"])}</a></p>\n'
        f'<p>{formatar_texto(base["explicacao"])}</p>\n'
    )


def questoes_capa_html(atividade):
    """Monta os cartões com link para cada questão.

    Args:
        atividade: Atividade completa.

    Returns:
        HTML dos cartões.
    """
    cartoes = "".join(
        f'<a class="questao-cartao" href="{atividade["id"]}/{questao["arquivo"]}">'
        f'<div class="questao-cartao__numero">QUESTÃO {questao["numero"]}</div>'
        f'<div class="questao-cartao__titulo">{escape(questao["titulo"])}</div>'
        f'<div class="questao-cartao__meta">⏱ {escape(questao["tempo"])} · '
        f'{escape(questao["pontos"])} pontos · {len(questao["passos"])} passos</div></a>'
        for questao in atividade["questoes"]
    )
    return f'<div class="questoes">{cartoes}</div>\n'


def tempos_capa_html(capa):
    """Monta a tabela de tempos e pontos da capa.

    Args:
        capa: Dados da capa.

    Returns:
        HTML da tabela.
    """
    linhas = "".join(
        "<tr>" + "".join(f"<td>{formatar_texto(celula)}</td>" for celula in linha) + "</tr>"
        for linha in capa["tempos"]
    )
    return (
        '<div class="tabela__rolagem"><table class="tabela"><thead><tr><th>Momento</th>'
        "<th>O que fazer</th><th>Tempo</th><th>Pontos</th></tr></thead>"
        f"<tbody>{linhas}</tbody></table></div>\n"
    )


def lista_html(itens):
    """Monta uma lista não ordenada com marcação simples.

    Args:
        itens: Lista de textos.

    Returns:
        HTML da lista.
    """
    return "<ul>" + "".join(f"<li>{formatar_texto(item)}</li>" for item in itens) + "</ul>\n"


def pagina_capa(atividade, pasta):
    """Gera a capa da atividade ao lado da pasta das questões.

    Args:
        atividade: Atividade completa.
        pasta: Pasta da atividade.
    """
    capa = atividade["capa"]
    pasta_capa = os.path.dirname(os.path.abspath(pasta))
    imagem = f'{atividade["id"]}/{PASTA_IMAGENS}/capa-abas.svg'
    caminho_imagem = os.path.join(pasta, PASTA_IMAGENS, "capa-abas.svg")
    gerar_imagem(capa["imagem_abas"], atividade, caminho_imagem)
    selos = [(atividade["natureza"], "selo--formativa"), ("⏱ " + atividade["duracao"], ""),
             ("10 pontos", ""), (f'{len(atividade["questoes"])} questões', "")]
    html = cabecalho_html(atividade["titulo"], pasta_capa, atividade["id"])
    html += topo_html(atividade, atividade["titulo"], capa["subtitulo"], selos)
    html += '<nav class="navegacao"><span></span><button class="botao" type="button" ' \
            'data-acao="imprimir">🖨️ Imprimir / PDF</button><a class="botao botao--excel" ' \
            f'href="{atividade["id"]}/{atividade["questoes"][0]["arquivo"]}">Começar pela ' \
            "Questão 1 →</a></nav>\n"
    html += bloco_html("📌 Sobre esta atividade", lista_html(capa["sobre"]))
    contexto = "".join(f"<p>{formatar_texto(paragrafo)}</p>" for paragrafo in capa["contexto"])
    contexto += (f'<figure class="passo__figura"><img src="{imagem}" alt="As quatro abas da '
                 'planilha final"><figcaption class="passo__legenda">'
                 f'{formatar_texto(capa["legenda_abas"])}</figcaption></figure>')
    html += bloco_html("🏭 A situação", contexto)
    html += bloco_html("⏱️ Tempo e pontuação", tempos_capa_html(capa)
                       + f'<p>{formatar_texto(capa["nota_pontuacao"])}</p>')
    html += bloco_html("🧩 As questões", questoes_capa_html(atividade))
    dados = download_html(atividade)
    dados += "".join(tabela_dados_html(atividade, tabela) for tabela in capa["tabelas"])
    html += bloco_html(capa.get("titulo_dados", "📊 Dados para digitar"), dados)
    html += bloco_html("📤 Regras e entrega", lista_html(capa["regras"])) + rodape_html(atividade)
    caminho_capa = os.path.join(pasta_capa, atividade["id"] + ".html")
    with open(caminho_capa, "w", encoding="utf-8") as arquivo:
        arquivo.write(inserir_header_em_html(html, pasta_capa))


def bloco_html(titulo, conteudo):
    """Envolve o conteúdo num bloco com título.

    Args:
        titulo: Título do bloco.
        conteudo: HTML interno.

    Returns:
        HTML do bloco.
    """
    return f'<section class="bloco">\n<h2>{escape(titulo)}</h2>\n{conteudo}</section>\n'


def gerar(pasta):
    """Gera capa, questões e imagens da atividade.

    Args:
        pasta: Pasta com o atividade.json.

    Returns:
        Quantidade de imagens geradas.
    """
    atividade = carregar_atividade(pasta)
    os.makedirs(os.path.join(pasta, PASTA_IMAGENS), exist_ok=True)
    if atividade.get("arquivo_base"):
        gerar_base_xlsx(atividade, atividade["arquivo_base"], pasta)
    for indice in range(len(atividade["questoes"])):
        pagina_questao(atividade, indice, pasta)
    pagina_capa(atividade, pasta)
    return sum(len(questao["passos"]) for questao in atividade["questoes"]) + 1


def principal():
    """Ponto de entrada pela linha de comando."""
    if len(sys.argv) != 2:
        print("Uso: gerar_atividade_excel.py <pasta da atividade>")
        sys.exit(1)
    total = gerar(sys.argv[1])
    print(f"Atividade gerada: {total} imagens, capa e questões em {sys.argv[1]}")


if __name__ == "__main__":
    principal()
