"""Painel de campos da tabela dinâmica, gráficos, segmentação e linha do tempo em SVG."""

import math

from desenho_excel import COR_EXCEL, LARGURA_TELA, MARGEM, Y_GRADE

LARGURA_PAINEL = 250
ALTURA_CAMPO_LISTA = 20
ALTURA_AREA = 78
ALTURA_BOTAO_SEGMENTACAO = 26
CORES_SERIES = ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000", "#5b9bd5", "#70ad47",
                "#264478", "#9e480e", "#636363", "#997300", "#255e91", "#43682b"]
AREAS_TD = [("Filtros", 0, 0), ("Colunas", 1, 0), ("Linhas", 0, 1), ("Valores", 1, 1)]
MARCADORES_EIXO = 4


def desenhar_painel_campos(tela, painel):
    """Desenha o painel "Campos da Tabela Dinâmica" com a lista de campos e as 4 áreas.

    Args:
        tela: TelaExcel.
        painel: {"campos", "marcados", "areas": {"Linhas": [...], ...}, "x"}.
    """
    x = painel.get("x", LARGURA_TELA - MARGEM - LARGURA_PAINEL)
    y = Y_GRADE
    altura = tela.y_abas - 6 - y
    tela.retangulo(x, y, LARGURA_PAINEL, altura, 'fill="#ffffff" stroke="#9aa4b2"')
    tela.retangulo(x, y, LARGURA_PAINEL, 28, 'fill="#f3f3f3"')
    tela.texto(x + 10, y + 19, "Campos da Tabela Dinâmica",
               'font-size="13" font-weight="700" fill="#222"')
    marcados = set(painel.get("marcados", []))
    for indice, campo in enumerate(painel.get("campos", [])):
        y_campo = y + 34 + indice * ALTURA_CAMPO_LISTA
        tela.retangulo(x + 10, y_campo + 4, 12, 12, 'rx="2" fill="#ffffff" stroke="#555"')
        if campo in marcados:
            tela.texto(x + 16, y_campo + 14, "✓", f'font-size="10" text-anchor="middle" '
                       f'fill="{COR_EXCEL}" font-weight="700"')
        tela.texto(x + 28, y_campo + 15, campo, 'font-size="12" fill="#222"')
        tela.registrar("campo_td:" + campo, x + 6, y_campo + 1, LARGURA_PAINEL - 12, 18)
    topo_areas = y + 40 + len(painel.get("campos", [])) * ALTURA_CAMPO_LISTA
    tela.texto(x + 10, topo_areas + 10, "Arraste os campos entre as áreas:",
               'font-size="11" fill="#555"')
    desenhar_areas_td(tela, x, topo_areas + 18, painel.get("areas", {}))


def desenhar_areas_td(tela, x, y, areas):
    """Desenha as áreas Filtros, Colunas, Linhas e Valores com os campos colocados nelas.

    Args:
        tela: TelaExcel.
        x: Borda esquerda do painel.
        y: Topo das áreas.
        areas: Dicionário área → lista de campos.
    """
    largura = (LARGURA_PAINEL - 30) / 2
    for nome, coluna, linha in AREAS_TD:
        x_area = x + 10 + coluna * (largura + 10)
        y_area = y + linha * (ALTURA_AREA + 8)
        tela.retangulo(x_area, y_area, largura, ALTURA_AREA, 'fill="#fafafa" stroke="#c8c8c8"')
        tela.texto(x_area + 6, y_area + 14, "▤ " + nome, 'font-size="11" fill="#444"')
        tela.registrar("area:" + nome, x_area, y_area, largura, ALTURA_AREA)
        for indice, campo in enumerate(areas.get(nome, [])[:2]):
            y_chip = y_area + 22 + indice * 26
            tela.retangulo(x_area + 5, y_chip, largura - 10, 22,
                           f'rx="3" fill="#e8f3ec" stroke="{COR_EXCEL}"')
            tela.texto(x_area + 10, y_chip + 15, campo[:16], 'font-size="11" fill="#1f2937"')
            tela.registrar("chip:" + campo, x_area + 5, y_chip, largura - 10, 22)


def desenhar_grafico(tela, grafico):
    """Desenha um gráfico (colunas, barras, pizza ou combinado) com título e legenda.

    Args:
        tela: TelaExcel.
        grafico: Especificação do gráfico (x, y, w, h, tipo, titulo, categorias, series).
    """
    x, y, largura, altura = grafico["x"], grafico["y"], grafico["w"], grafico["h"]
    tela.retangulo(x + 3, y + 4, largura, altura, 'fill="#000000" fill-opacity="0.12"')
    tela.retangulo(x, y, largura, altura, 'fill="#ffffff" stroke="#9aa4b2"')
    tela.texto(x + largura / 2, y + 22, grafico.get("titulo", "Título do Gráfico"),
               'font-size="14" font-weight="700" fill="#333" text-anchor="middle"')
    tela.registrar("grafico:titulo", x + 20, y + 6, largura - 40, 22)
    tela.registrar("grafico", x, y, largura, altura)
    desenhadores = {"colunas": desenhar_colunas, "barras": desenhar_barras,
                    "pizza": desenhar_pizza, "combinado": desenhar_colunas}
    desenhadores[grafico.get("tipo", "colunas")](tela, grafico)
    if grafico.get("legenda", True):
        desenhar_legenda(tela, grafico)
    if grafico.get("selo"):
        desenhar_selo(tela, x + largura - 8, y + 8, grafico["selo"])


def area_de_plotagem(grafico):
    """Calcula o retângulo interno onde ficam as barras ou colunas.

    Args:
        grafico: Especificação do gráfico.

    Returns:
        Tupla (x, y, largura, altura).
    """
    tem_eixo_secundario = any(serie.get("eixo") == "secundario" for serie in grafico["series"])
    esquerda = 150 if grafico.get("tipo") == "barras" else 52
    direita = 52 if tem_eixo_secundario else 20
    x = grafico["x"] + esquerda
    y = grafico["y"] + 40
    return (x, y, grafico["w"] - esquerda - direita, grafico["h"] - 40 - 58)


def maior_valor(series, eixo):
    """Encontra o maior valor das séries de um eixo, para a escala.

    Args:
        series: Lista de séries.
        eixo: "principal" ou "secundario".

    Returns:
        Maior valor (mínimo 1).
    """
    valores = [
        valor for serie in series if serie.get("eixo", "principal") == eixo
        for valor in serie["valores"]
    ]
    return max(valores or [1])


def desenhar_eixo_valores(tela, area, maximo, lado):
    """Desenha as marcas numéricas de um eixo vertical e, no principal, as linhas de grade.

    Args:
        tela: TelaExcel.
        area: Área de plotagem.
        maximo: Maior valor do eixo.
        lado: "esquerda" ou "direita".
    """
    x, y, largura, altura = area
    for indice in range(MARCADORES_EIXO + 1):
        valor = maximo * indice / MARCADORES_EIXO
        y_linha = y + altura - altura * indice / MARCADORES_EIXO
        if lado == "esquerda":
            tela.retangulo(x, y_linha, largura, 0.8, 'fill="#e3e3e3"')
            tela.texto(x - 6, y_linha + 4, f"{valor:.0f}",
                       'font-size="10.5" fill="#666" text-anchor="end"')
        else:
            tela.texto(x + largura + 6, y_linha + 4, f"{valor:.0f}", 'font-size="10.5" fill="#666"')
    if lado == "direita":
        tela.registrar("grafico:eixo2", x + largura + 2, y - 4, 34, altura + 8)


def desenhar_colunas(tela, grafico):
    """Desenha colunas agrupadas e, no gráfico combinado, as séries em linha.

    Args:
        tela: TelaExcel.
        grafico: Especificação do gráfico.
    """
    area = area_de_plotagem(grafico)
    x, y, largura, altura = area
    categorias = grafico["categorias"]
    colunas = [serie for serie in grafico["series"] if serie.get("tipo") != "linha"]
    maximo = maior_valor(grafico["series"], "principal")
    if grafico.get("grade", True):
        desenhar_eixo_valores(tela, area, maximo, "esquerda")
    largura_grupo = largura / len(categorias)
    largura_coluna = largura_grupo * 0.7 / max(1, len(colunas))
    for indice_serie, serie in enumerate(colunas):
        cor = serie.get("cor", CORES_SERIES[indice_serie])
        for indice, valor in enumerate(serie["valores"]):
            altura_coluna = altura * valor / maximo
            x_coluna = x + indice * largura_grupo + largura_grupo * 0.15 \
                + indice_serie * largura_coluna
            tela.retangulo(x_coluna, y + altura - altura_coluna, largura_coluna - 2,
                           altura_coluna, f'fill="{cor}"')
            if grafico.get("rotulos"):
                tela.texto(x_coluna + largura_coluna / 2, y + altura - altura_coluna - 4,
                           valor, 'font-size="10" fill="#333" text-anchor="middle"')
    for indice, categoria in enumerate(categorias):
        tela.texto(x + (indice + 0.5) * largura_grupo, y + altura + 16, categoria,
                   'font-size="11" fill="#444" text-anchor="middle"')
    tela.retangulo(x, y + altura, largura, 1.2, 'fill="#999"')
    desenhar_linhas(tela, grafico, area, largura_grupo)


def desenhar_linhas(tela, grafico, area, largura_grupo):
    """Desenha as séries em linha (eixo secundário) do gráfico combinado.

    Args:
        tela: TelaExcel.
        grafico: Especificação do gráfico.
        area: Área de plotagem.
        largura_grupo: Largura reservada a cada categoria.
    """
    linhas = [serie for serie in grafico["series"] if serie.get("tipo") == "linha"]
    if not linhas:
        return
    x, y, _, altura = area
    maximo = maior_valor(grafico["series"], "secundario")
    desenhar_eixo_valores(tela, area, maximo, "direita")
    for serie in linhas:
        cor = serie.get("cor", "#ed7d31")
        pontos = [
            (x + (indice + 0.5) * largura_grupo, y + altura - altura * valor / maximo)
            for indice, valor in enumerate(serie["valores"])
        ]
        caminho = " ".join(f"{px:.1f},{py:.1f}" for px, py in pontos)
        tela.partes.append(f'<polyline points="{caminho}" fill="none" stroke="{cor}" '
                           'stroke-width="3"/>')
        for px, py in pontos:
            tela.partes.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="4" fill="{cor}"/>')
        tela.registrar("grafico:serie:" + serie["nome"], pontos[0][0] - 6, pontos[0][1] - 6,
                       pontos[-1][0] - pontos[0][0] + 12, 12)


def desenhar_barras(tela, grafico):
    """Desenha barras horizontais (ranking), com rótulos de dados opcionais.

    Args:
        tela: TelaExcel.
        grafico: Especificação do gráfico.
    """
    x, y, largura, altura = area_de_plotagem(grafico)
    categorias = grafico["categorias"]
    serie = grafico["series"][0]
    maximo = maior_valor(grafico["series"], "principal")
    altura_faixa = altura / len(categorias)
    cor = serie.get("cor", CORES_SERIES[0])
    for indice, (categoria, valor) in enumerate(zip(categorias, serie["valores"])):
        y_barra = y + indice * altura_faixa + altura_faixa * 0.18
        comprimento = (largura - 40) * valor / maximo
        tela.retangulo(x, y_barra, comprimento, altura_faixa * 0.64, f'fill="{cor}"')
        tela.texto(x - 8, y_barra + altura_faixa * 0.44, categoria,
                   'font-size="11.5" fill="#333" text-anchor="end"')
        if grafico.get("rotulos"):
            tela.texto(x + comprimento + 5, y_barra + altura_faixa * 0.44, valor,
                       'font-size="11" font-weight="700" fill="#333"')
            tela.registrar(f"grafico:rotulo:{indice}", x + comprimento + 2,
                           y_barra, 34, altura_faixa * 0.64)
    tela.retangulo(x, y, 1.2, altura, 'fill="#999"')


def desenhar_pizza(tela, grafico):
    """Desenha um gráfico de pizza com uma fatia por categoria.

    Args:
        tela: TelaExcel.
        grafico: Especificação do gráfico.
    """
    valores = grafico["series"][0]["valores"]
    total = sum(valores) or 1
    raio = min(grafico["w"] * 0.3, (grafico["h"] - 90) / 2)
    cx = grafico["x"] + grafico["w"] / 2
    cy = grafico["y"] + 40 + raio
    inicio = -math.pi / 2
    for indice, valor in enumerate(valores):
        fim = inicio + 2 * math.pi * valor / total
        x1, y1 = cx + raio * math.cos(inicio), cy + raio * math.sin(inicio)
        x2, y2 = cx + raio * math.cos(fim), cy + raio * math.sin(fim)
        arco_grande = 1 if fim - inicio > math.pi else 0
        cor = CORES_SERIES[indice % len(CORES_SERIES)]
        tela.partes.append(
            f'<path d="M{cx:.1f},{cy:.1f} L{x1:.1f},{y1:.1f} A{raio:.1f},{raio:.1f} 0 '
            f'{arco_grande} 1 {x2:.1f},{y2:.1f} z" fill="{cor}" stroke="#ffffff" '
            'stroke-width="1.5"/>'
        )
        inicio = fim


def desenhar_legenda(tela, grafico):
    """Desenha a legenda embaixo do gráfico (séries, ou categorias na pizza).

    Args:
        tela: TelaExcel.
        grafico: Especificação do gráfico.
    """
    if grafico.get("tipo") == "pizza":
        nomes = grafico["categorias"]
    else:
        nomes = [serie["nome"] for serie in grafico["series"]]
    y = grafico["y"] + grafico["h"] - 20
    largura_item = min(150, (grafico["w"] - 20) / max(1, len(nomes)))
    x_inicio = grafico["x"] + (grafico["w"] - largura_item * len(nomes)) / 2
    for indice, nome in enumerate(nomes):
        serie = grafico["series"][indice] if grafico.get("tipo") != "pizza" else {}
        cor = serie.get("cor", CORES_SERIES[indice % len(CORES_SERIES)])
        x = x_inicio + indice * largura_item
        tela.retangulo(x, y - 9, 10, 10, f'fill="{cor}"')
        tela.texto(x + 14, y, str(nome)[: int(largura_item / 7) - 2],
                   'font-size="10.5" fill="#444"')
    tela.registrar("grafico:legenda", x_inicio - 4, y - 14, largura_item * len(nomes) + 8, 20)


def desenhar_selo(tela, x_direita, y, texto):
    """Desenha um selo cinza (ex.: "Ilustração") no canto do gráfico.

    Args:
        tela: TelaExcel.
        x_direita: Limite direito do selo.
        y: Topo do selo.
        texto: Texto do selo.
    """
    largura = len(texto) * 6.5 + 14
    tela.retangulo(x_direita - largura, y, largura, 18, 'rx="9" fill="#6b7280"')
    tela.texto(x_direita - largura / 2, y + 13, texto,
               'font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle"')


def desenhar_segmentacao(tela, segmentacao):
    """Desenha a Segmentação de Dados: título e um botão por item.

    Args:
        tela: TelaExcel.
        segmentacao: {"x", "y", "w", "titulo", "itens", "selecionados"}.
    """
    x, y, largura = segmentacao["x"], segmentacao["y"], segmentacao.get("w", 170)
    itens = segmentacao["itens"]
    altura = 34 + len(itens) * (ALTURA_BOTAO_SEGMENTACAO + 4) + 6
    tela.retangulo(x + 3, y + 4, largura, altura, 'fill="#000000" fill-opacity="0.12"')
    tela.retangulo(x, y, largura, altura, 'fill="#ffffff" stroke="#9aa4b2"')
    tela.texto(x + 10, y + 21, segmentacao.get("titulo", ""),
               'font-size="13" font-weight="700" fill="#222"')
    tela.texto(x + largura - 22, y + 21, "⊘", 'font-size="13" fill="#888"')
    tela.registrar("segmentacao", x, y, largura, altura)
    selecionados = set(segmentacao.get("selecionados", itens))
    for indice, item in enumerate(itens):
        y_botao = y + 32 + indice * (ALTURA_BOTAO_SEGMENTACAO + 4)
        fundo = "#bdd7ee" if item in selecionados else "#f2f2f2"
        tela.retangulo(x + 8, y_botao, largura - 16, ALTURA_BOTAO_SEGMENTACAO,
                       f'rx="3" fill="{fundo}" stroke="#9aa4b2"')
        tela.texto(x + 16, y_botao + 17, item, 'font-size="12" fill="#222"')
        tela.registrar("seg:" + item, x + 8, y_botao, largura - 16, ALTURA_BOTAO_SEGMENTACAO)


def desenhar_linha_do_tempo(tela, linha_tempo):
    """Desenha a Linha do Tempo com os meses e o período selecionado em destaque.

    Args:
        tela: TelaExcel.
        linha_tempo: {"x", "y", "w", "titulo", "rotulo", "meses", "selecionados": [i, f]}.
    """
    x, y, largura = linha_tempo["x"], linha_tempo["y"], linha_tempo.get("w", 520)
    meses = linha_tempo["meses"]
    tela.retangulo(x + 3, y + 4, largura, 96, 'fill="#000000" fill-opacity="0.12"')
    tela.retangulo(x, y, largura, 96, 'fill="#ffffff" stroke="#9aa4b2"')
    tela.texto(x + 10, y + 20, linha_tempo.get("titulo", "Data"),
               'font-size="13" font-weight="700" fill="#222"')
    tela.texto(x + 10, y + 40, linha_tempo.get("rotulo", ""), 'font-size="11.5" fill="#555"')
    tela.texto(x + largura - 60, y + 40, "MESES ▼", 'font-size="10.5" fill="#555"')
    largura_mes = (largura - 20) / len(meses)
    inicio, fim = linha_tempo.get("selecionados", [0, len(meses) - 1])
    for indice, mes in enumerate(meses):
        x_mes = x + 10 + indice * largura_mes
        fundo = "#5b9bd5" if inicio <= indice <= fim else "#e7e6e6"
        tela.retangulo(x_mes, y + 50, largura_mes - 2, 16, f'fill="{fundo}"')
        tela.texto(x_mes + largura_mes / 2, y + 84, mes,
                   'font-size="10.5" fill="#444" text-anchor="middle"')
    x_sel = x + 10 + inicio * largura_mes
    tela.registrar("linha_tempo:selecao", x_sel, y + 48, (fim - inicio + 1) * largura_mes, 20)
    tela.registrar("linha_tempo", x, y, largura, 96)


def desenhar_elementos_dinamicos(tela):
    """Desenha, se pedidos, o painel de campos, os gráficos, a segmentação e a linha do tempo.

    Args:
        tela: TelaExcel com a grade já desenhada.
    """
    especificacao = tela.especificacao
    if especificacao.get("painel_campos"):
        desenhar_painel_campos(tela, especificacao["painel_campos"])
    for grafico in especificacao.get("graficos", []):
        desenhar_grafico(tela, grafico)
    if especificacao.get("segmentacao"):
        desenhar_segmentacao(tela, especificacao["segmentacao"])
    if especificacao.get("linha_tempo"):
        desenhar_linha_do_tempo(tela, especificacao["linha_tempo"])
