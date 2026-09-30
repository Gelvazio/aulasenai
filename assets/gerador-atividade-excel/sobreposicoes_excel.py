"""Elementos desenhados por cima da tela do Excel: diálogos, menus, esquemas, setas e marcas."""

from graficos_excel import desenhar_elementos_dinamicos
from desenho_excel import (
    COR_DESTAQUE, COR_EXCEL, FONTE_MONO, LARGURA_TELA, PADRAO_REFERENCIA, RAIO_MARCA, Y_GRADE,
    quebrar_texto, texto_svg,
)

LARGURA_DIALOGO = 470
ALTURA_CAMPO = 34
ALTURA_ITEM_MENU = 26
ALTURA_ITEM_LISTA = 22
LARGURA_MENU = 250
COR_SOMBRA = 'fill="#000000" fill-opacity="0.18"'
DEFINICAO_SETA = (
    '<defs><marker id="ponta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" '
    'markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" '
    f'fill="{COR_DESTAQUE}"/></marker></defs>'
)


def localizar(tela, alvo):
    """Encontra o retângulo de um elemento pelo nome ou por referência de célula.

    Args:
        tela: TelaExcel já desenhada.
        alvo: Nome registrado ("botao:Moeda") ou referência ("B2", "A1:G1", "alca:C2").

    Returns:
        Tupla (x, y, largura, altura) ou None.
    """
    if alvo.startswith("alca:"):
        caixa = tela.posicoes.get("celula:" + alvo[5:])
        if not caixa:
            return None
        return (caixa[0] + caixa[2] - 5, caixa[1] + caixa[3] - 5, 10, 10)
    if PADRAO_REFERENCIA.match(alvo):
        return tela.retangulo_do_intervalo(alvo)
    return tela.posicoes.get(alvo)


def desenhar_painel(tela, x, y, largura, altura, titulo):
    """Desenha a moldura de uma caixa de diálogo com sombra, título e botão fechar.

    Args:
        tela: TelaExcel.
        x: Posição horizontal.
        y: Posição vertical.
        largura: Largura do painel.
        altura: Altura do painel.
        titulo: Título da janela.
    """
    tela.retangulo(x + 5, y + 6, largura, altura, COR_SOMBRA)
    tela.retangulo(x, y, largura, altura, 'rx="6" fill="#ffffff" stroke="#8a8a8a"')
    tela.retangulo(x, y, largura, 32, 'rx="6" fill="#f3f3f3"')
    tela.texto(x + 14, y + 21, titulo, 'font-size="13.5" font-weight="700" fill="#222"')
    tela.texto(x + largura - 20, y + 21, "✕", 'font-size="13" fill="#555"')


def desenhar_abas_dialogo(tela, x, y, dialogo):
    """Desenha as abas internas de um diálogo (ex.: Configurações, Alerta de Erro).

    Args:
        tela: TelaExcel.
        x: Início horizontal.
        y: Topo das abas.
        dialogo: Especificação do diálogo.

    Returns:
        Altura ocupada pelas abas.
    """
    abas = dialogo.get("abas", [])
    if not abas:
        return 0
    posicao = x + 14
    for aba in abas:
        largura = len(aba) * 7 + 20
        ativa = aba == dialogo.get("aba_ativa")
        estilo = f'fill="#ffffff" stroke="{COR_EXCEL}"' if ativa else 'fill="#ececec" stroke="#ccc"'
        tela.retangulo(posicao, y, largura, 24, estilo)
        peso = 'font-weight="700"' if ativa else ""
        tela.texto(posicao + 10, y + 16, aba, f'font-size="11.5" fill="#222" {peso}')
        tela.registrar("dlgaba:" + aba, posicao, y, largura, 24)
        posicao += largura + 3
    return 32


def desenhar_campo(tela, x, y, campo):
    """Desenha um campo de diálogo: caixa de texto, lista, caixa de seleção ou texto simples.

    Args:
        tela: TelaExcel.
        x: Borda esquerda do conteúdo.
        y: Topo do campo.
        campo: Dicionário com tipo, rótulo, valor e marcado.
    """
    tipo = campo.get("tipo", "texto_caixa")
    rotulo = campo.get("rotulo", "")
    if tipo in ("check", "radio"):
        forma = 'rx="2"' if tipo == "check" else 'rx="7"'
        tela.retangulo(x, y + 8, 14, 14, f'{forma} fill="#ffffff" stroke="#555"')
        if campo.get("marcado"):
            tela.texto(x + 7, y + 20, "✓" if tipo == "check" else "●",
                       f'font-size="12" text-anchor="middle" fill="{COR_EXCEL}" font-weight="700"')
        tela.texto(x + 22, y + 20, rotulo, 'font-size="12.5" fill="#222"')
        tela.registrar("campo:" + rotulo, x - 4, y + 4, len(rotulo) * 7 + 32, 22)
        return
    if tipo == "paragrafo":
        tela.texto(x, y + 18, rotulo, 'font-size="12.5" fill="#333"')
        return
    tela.texto(x, y + 20, rotulo, 'font-size="12.5" fill="#222"')
    x_valor = x + 150
    largura = LARGURA_DIALOGO - 190
    tela.retangulo(x_valor, y + 4, largura, 24, 'fill="#ffffff" stroke="#8a8a8a"')
    tela.texto(x_valor + 6, y + 21, campo.get("valor", ""),
               f'font-size="12.5" font-family="{FONTE_MONO}" fill="#111"')
    if tipo == "combo":
        tela.retangulo(x_valor + largura - 20, y + 5, 19, 22, 'fill="#eeeeee"')
        tela.texto(x_valor + largura - 10.5, y + 20, "▼", 'font-size="9" text-anchor="middle"')
    tela.registrar("campo:" + rotulo, x_valor, y + 4, largura, 24)


def desenhar_botoes(tela, x_direita, y, botoes):
    """Desenha os botões de um diálogo, alinhados à direita.

    Args:
        tela: TelaExcel.
        x_direita: Limite direito.
        y: Topo dos botões.
        botoes: Lista de rótulos (o primeiro é o botão principal).
    """
    x = x_direita
    for indice, rotulo in reversed(list(enumerate(botoes))):
        largura = max(76, len(rotulo) * 7 + 20)
        x -= largura + 8
        estilo = f'rx="4" fill="{COR_EXCEL}"' if indice == 0 else \
            'rx="4" fill="#f3f3f3" stroke="#999"'
        cor = "#ffffff" if indice == 0 else "#222"
        tela.retangulo(x, y, largura, 26, estilo)
        tela.texto(x + largura / 2, y + 17, rotulo,
                   f'font-size="12.5" text-anchor="middle" fill="{cor}"')
        tela.registrar("botaodlg:" + rotulo, x, y, largura, 26)


def altura_campo(campo):
    """Calcula a altura ocupada por um campo de diálogo.

    Args:
        campo: Dicionário do campo.

    Returns:
        Altura em pixels.
    """
    if campo.get("tipo") == "lista":
        return len(campo.get("itens", [])) * ALTURA_ITEM_LISTA + 34
    return ALTURA_CAMPO


def desenhar_lista(tela, x, y, campo):
    """Desenha uma caixa de lista (itens com realce e caixas de seleção opcionais).

    Args:
        tela: TelaExcel.
        x: Borda esquerda do conteúdo.
        y: Topo do campo.
        campo: {"rotulo", "itens", "selecionados", "caixas"}.
    """
    tela.texto(x, y + 16, campo.get("rotulo", ""), 'font-size="12.5" fill="#222"')
    itens = campo.get("itens", [])
    largura = LARGURA_DIALOGO - 40
    topo = y + 24
    tela.retangulo(x, topo, largura, len(itens) * ALTURA_ITEM_LISTA + 4,
                   'fill="#ffffff" stroke="#8a8a8a"')
    selecionados = set(campo.get("selecionados", []))
    for indice, item in enumerate(itens):
        y_item = topo + 2 + indice * ALTURA_ITEM_LISTA
        marcado = item in selecionados
        if marcado and not campo.get("caixas"):
            tela.retangulo(x + 1, y_item, largura - 2, ALTURA_ITEM_LISTA, 'fill="#cfe3ff"')
        x_texto = x + 8
        if campo.get("caixas"):
            tela.retangulo(x + 8, y_item + 5, 13, 13, 'rx="2" fill="#ffffff" stroke="#555"')
            if marcado:
                tela.texto(x + 14.5, y_item + 16, "✓", f'font-size="11" text-anchor="middle" '
                           f'fill="{COR_EXCEL}" font-weight="700"')
            x_texto = x + 28
        tela.texto(x_texto, y_item + 16, item, 'font-size="12.5" fill="#222"')
        tela.registrar("item:" + item, x + 1, y_item, largura - 2, ALTURA_ITEM_LISTA)


def desenhar_dialogo(tela, dialogo):
    """Desenha uma caixa de diálogo completa (ex.: Validação de Dados, Formatar Células).

    Args:
        tela: TelaExcel.
        dialogo: Especificação com título, abas, campos e botões.
    """
    campos = dialogo.get("campos", [])
    altura = 32 + 14 + sum(altura_campo(campo) for campo in campos) + 52
    altura += 32 if dialogo.get("abas") else 0
    largura = dialogo.get("largura", LARGURA_DIALOGO)
    x = dialogo.get("x", (LARGURA_TELA - largura) / 2)
    y = dialogo.get("y", Y_GRADE + 10)
    desenhar_painel(tela, x, y, largura, altura, dialogo.get("titulo", ""))
    topo = y + 40 + desenhar_abas_dialogo(tela, x, y + 40, dialogo)
    for campo in campos:
        if campo.get("tipo") == "lista":
            desenhar_lista(tela, x + 20, topo, campo)
        else:
            desenhar_campo(tela, x + 20, topo, campo)
        topo += altura_campo(campo)
    desenhar_botoes(tela, x + largura - 10, y + altura - 40,
                    dialogo.get("botoes", ["OK", "Cancelar"]))
    tela.registrar("dialogo", x, y, largura, altura)


def desenhar_alerta(tela, alerta):
    """Desenha a janela de mensagem do Excel (erro de validação ou célula protegida).

    Args:
        tela: TelaExcel.
        alerta: Especificação com tipo ("erro" ou "aviso"), título, mensagem e botões.
    """
    linhas = quebrar_texto(alerta.get("mensagem", ""), 48)
    largura = 440
    altura = 100 + len(linhas) * 17
    x = alerta.get("x", (LARGURA_TELA - largura) / 2)
    y = alerta.get("y", Y_GRADE + 40)
    desenhar_painel(tela, x, y, largura, altura, alerta.get("titulo", "Microsoft Excel"))
    cor = "#c42b1c" if alerta.get("tipo") == "erro" else "#e08a00"
    simbolo = "✕" if alerta.get("tipo") == "erro" else "!"
    tela.partes.append(f'<circle cx="{x + 36}" cy="{y + 62}" r="17" fill="{cor}"/>')
    tela.texto(x + 36, y + 69, simbolo,
               'font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle"')
    for indice, linha in enumerate(linhas):
        tela.texto(x + 66, y + 58 + indice * 17, linha, 'font-size="12.5" fill="#222"')
    desenhar_botoes(tela, x + largura - 10, y + altura - 38, alerta.get("botoes", ["OK"]))
    tela.registrar("alerta", x, y, largura, altura)


def desenhar_menu(tela, menu):
    """Desenha um menu suspenso (botão, clique direito ou filtro) abaixo ou acima da âncora.

    Args:
        tela: TelaExcel.
        menu: Especificação com âncora, itens, caixas de seleção e direção.
    """
    ancora = localizar(tela, menu.get("ancora", "")) or (100, Y_GRADE, 80, 20)
    itens = menu.get("itens", [])
    altura = len(itens) * ALTURA_ITEM_MENU + 8
    largura = menu.get("largura", LARGURA_MENU)
    x = min(ancora[0], LARGURA_TELA - largura - 10)
    y = ancora[1] + ancora[3] + 2
    if menu.get("direcao") == "cima":
        y = ancora[1] - altura - 2
    tela.retangulo(x + 4, y + 5, largura, altura, COR_SOMBRA)
    tela.retangulo(x, y, largura, altura, 'fill="#ffffff" stroke="#8a8a8a"')
    marcados = set(menu.get("marcados", []))
    for indice, item in enumerate(itens):
        y_item = y + 4 + indice * ALTURA_ITEM_MENU
        desenhar_item_menu(tela, (x, y_item, largura), item, menu, item in marcados)


def desenhar_item_menu(tela, caixa, item, menu, marcado):
    """Desenha um item de menu, com caixa de seleção opcional e realce do item escolhido.

    Args:
        tela: TelaExcel.
        caixa: Tupla (x, y, largura) do item.
        item: Texto do item.
        menu: Especificação do menu.
        marcado: Se a caixa de seleção do item está marcada.
    """
    x, y, largura = caixa
    if item in menu.get("realce", []):
        tela.retangulo(x + 2, y, largura - 4, ALTURA_ITEM_MENU - 2, 'fill="#fde4d0"')
    x_texto = x + 12
    if menu.get("caixas"):
        tela.retangulo(x + 10, y + 6, 13, 13, 'rx="2" fill="#ffffff" stroke="#555"')
        if marcado:
            tela.texto(x + 16.5, y + 17, "✓", f'font-size="11" text-anchor="middle" '
                       f'fill="{COR_EXCEL}" font-weight="700"')
        x_texto = x + 30
    tela.texto(x_texto, y + 17, item, 'font-size="12.5" fill="#222"')
    tela.registrar("menu:" + item, x + 2, y, largura - 4, ALTURA_ITEM_MENU - 2)


def desenhar_lista_celula(tela, lista):
    """Desenha a lista suspensa de validação aberta abaixo de uma célula.

    Args:
        tela: TelaExcel.
        lista: Especificação com célula, itens e item em destaque.
    """
    caixa = tela.posicoes.get("celula:" + lista["celula"])
    if not caixa:
        return
    x, y, largura, altura = caixa
    tela.retangulo(x + largura, y, 18, altura, 'fill="#eeeeee" stroke="#8a8a8a"')
    tela.texto(x + largura + 9, y + 16, "▼", 'font-size="9" text-anchor="middle"')
    tela.registrar("seta_lista", x + largura, y, 18, altura)
    itens = lista.get("itens", [])
    topo = y + altura
    tela.retangulo(x, topo, largura + 18, len(itens) * 21 + 4, 'fill="#ffffff" stroke="#8a8a8a"')
    for indice, item in enumerate(itens):
        y_item = topo + 2 + indice * 21
        if item == lista.get("destaque"):
            tela.retangulo(x + 1, y_item, largura + 16, 20, 'fill="#cfe3ff"')
        tela.texto(x + 6, y_item + 15, item, 'font-size="12" fill="#222"')
        tela.registrar("lista:" + item, x + 1, y_item, largura + 16, 20)


def desenhar_esquema(tela, esquema):
    """Desenha caixas explicativas (fluxogramas e esquemas de busca) por cima da tela.

    Args:
        tela: TelaExcel.
        esquema: Especificação com "caixas" (id, x, y, w, h, titulo, linhas, cor). Cada linha
            pode ser um texto ou [texto, cor].
    """
    for caixa in esquema.get("caixas", []):
        x, y, largura, altura = caixa["x"], caixa["y"], caixa["w"], caixa["h"]
        cor = caixa.get("cor", COR_EXCEL)
        tela.retangulo(x, y, largura, altura,
                       f'rx="8" fill="#ffffff" stroke="{cor}" stroke-width="2.5"')
        tela.retangulo(x, y, largura, 26, f'rx="8" fill="{cor}"')
        tela.texto(x + largura / 2, y + 18, caixa.get("titulo", ""),
                   'font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle"')
        for indice, linha in enumerate(caixa.get("linhas", [])):
            texto, cor = linha if isinstance(linha, list) else (linha, "#222")
            peso = 'font-weight="700" ' if cor != "#222" else ""
            fonte = f'font-family="{FONTE_MONO}" ' if texto.startswith("=") else ""
            tela.texto(x + 10, y + 46 + indice * 18, texto,
                       f'font-size="12.5" fill="{cor}" {peso}{fonte}')
        tela.registrar("caixa:" + caixa["id"], x, y, largura, altura)


def centro(caixa):
    """Retorna o centro de um retângulo.

    Args:
        caixa: Tupla (x, y, largura, altura).

    Returns:
        Tupla (x, y) do centro.
    """
    return (caixa[0] + caixa[2] / 2, caixa[1] + caixa[3] / 2)


def ponto_na_borda(caixa, destino):
    """Calcula onde a linha do centro da caixa até o destino cruza a borda da caixa.

    Args:
        caixa: Retângulo de origem.
        destino: Ponto (x, y) para onde a seta aponta.

    Returns:
        Ponto (x, y) na borda da caixa.
    """
    cx, cy = centro(caixa)
    dx, dy = destino[0] - cx, destino[1] - cy
    if dx == 0 and dy == 0:
        return cx, cy
    escala_x = (caixa[2] / 2) / abs(dx) if dx else float("inf")
    escala_y = (caixa[3] / 2) / abs(dy) if dy else float("inf")
    escala = min(escala_x, escala_y, 1.0)
    return cx + dx * escala, cy + dy * escala


def desenhar_setas(tela, setas):
    """Desenha setas curvas em laranja entre dois elementos, com texto opcional no meio.

    Args:
        tela: TelaExcel.
        setas: Lista de {"de", "para", "texto", "curva"}.
    """
    for seta in setas:
        origem = localizar(tela, seta["de"])
        destino = localizar(tela, seta["para"])
        if not origem or not destino:
            continue
        (x1, y1) = ponto_na_borda(origem, centro(destino))
        (x2, y2) = ponto_na_borda(destino, centro(origem))
        curva = seta.get("curva", -40)
        xc, yc = (x1 + x2) / 2, (y1 + y2) / 2 + curva
        tela.partes.append(
            f'<path d="M{x1:.1f},{y1:.1f} Q{xc:.1f},{yc:.1f} {x2:.1f},{y2:.1f}" fill="none" '
            f'stroke="{COR_DESTAQUE}" stroke-width="3" marker-end="url(#ponta)"/>'
        )
        if seta.get("texto"):
            desenhar_etiqueta(tela, xc, (y1 + y2) / 2 + curva / 2, seta["texto"])


def desenhar_etiqueta(tela, x, y, texto):
    """Desenha uma etiqueta branca com borda laranja centralizada no ponto.

    Args:
        tela: TelaExcel.
        x: Centro horizontal.
        y: Centro vertical.
        texto: Texto da etiqueta.
    """
    largura = len(texto) * 7 + 16
    tela.retangulo(x - largura / 2, y - 12, largura, 22,
                   f'rx="11" fill="#ffffff" stroke="{COR_DESTAQUE}" stroke-width="1.5"')
    tela.texto(x, y + 3.5, texto,
               f'font-size="12" font-weight="700" fill="{COR_DESTAQUE}" text-anchor="middle"')


def desenhar_marcas(tela, marcas):
    """Contorna em laranja o ponto a clicar e coloca o círculo numerado ao lado.

    Args:
        tela: TelaExcel.
        marcas: Lista de {"alvo", "n", "lado", "sem_contorno"}.
    """
    for marca in marcas:
        caixa = localizar(tela, marca["alvo"])
        if not caixa:
            continue
        x, y, largura, altura = caixa
        if not marca.get("sem_contorno"):
            tela.retangulo(x - 2, y - 2, largura + 4, altura + 4,
                           f'rx="4" fill="none" stroke="{COR_DESTAQUE}" stroke-width="3"')
        cx, cy = posicao_marca(caixa, marca.get("lado", "direita"))
        tela.partes.append(
            f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{RAIO_MARCA}" fill="{COR_DESTAQUE}" '
            'stroke="#ffffff" stroke-width="2"/>'
        )
        tela.texto(cx, cy + 5, marca["n"],
                   'font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle"')


def posicao_marca(caixa, lado):
    """Calcula onde fica o círculo numerado em relação ao elemento.

    Args:
        caixa: Retângulo do elemento.
        lado: "direita", "esquerda", "cima" ou "baixo".

    Returns:
        Tupla (x, y) do centro do círculo.
    """
    x, y, largura, altura = caixa
    posicoes = {
        "direita": (x + largura + RAIO_MARCA + 4, y + altura / 2),
        "esquerda": (x - RAIO_MARCA - 4, y + altura / 2),
        "cima": (x + largura / 2, y - RAIO_MARCA - 4),
        "baixo": (x + largura / 2, y + altura + RAIO_MARCA + 4),
    }
    cx, cy = posicoes.get(lado, posicoes["direita"])
    cx = min(max(cx, RAIO_MARCA + 2), LARGURA_TELA - RAIO_MARCA - 2)
    return cx, max(cy, RAIO_MARCA + 2)


def desenhar_nota(tela, nota):
    """Desenha um lembrete amarelo com texto curto (dica visual dentro da imagem).

    Args:
        tela: TelaExcel.
        nota: {"texto", "x", "y", "largura"}.
    """
    largura = nota.get("largura", 280)
    linhas = quebrar_texto(nota["texto"], int((largura - 20) / 6.8))
    altura = 16 + len(linhas) * 17
    x = nota.get("x", LARGURA_TELA - largura - 20)
    y = nota.get("y", tela.y_abas - altura - 14)
    tela.retangulo(x + 3, y + 4, largura, altura, COR_SOMBRA)
    tela.retangulo(x, y, largura, altura, 'rx="6" fill="#fff6bf" stroke="#d4b106"')
    for indice, linha in enumerate(linhas):
        tela.texto(x + 10, y + 20 + indice * 17, linha, 'font-size="12.5" fill="#3d3000"')


def desenhar_sobreposicoes(tela):
    """Desenha, na ordem certa, tudo o que fica por cima da grade.

    Args:
        tela: TelaExcel com a grade já desenhada.
    """
    especificacao = tela.especificacao
    desenhar_elementos_dinamicos(tela)
    if especificacao.get("esquema"):
        desenhar_esquema(tela, especificacao["esquema"])
    if especificacao.get("lista_celula"):
        desenhar_lista_celula(tela, especificacao["lista_celula"])
    if especificacao.get("menu"):
        desenhar_menu(tela, especificacao["menu"])
    if especificacao.get("dialogo"):
        desenhar_dialogo(tela, especificacao["dialogo"])
    if especificacao.get("alerta"):
        desenhar_alerta(tela, especificacao["alerta"])
    desenhar_setas(tela, especificacao.get("setas", []))
    desenhar_marcas(tela, especificacao.get("marcas", []))
    if especificacao.get("nota"):
        desenhar_nota(tela, especificacao["nota"])


def montar_svg(tela):
    """Junta as partes desenhadas num documento SVG responsivo.

    Args:
        tela: TelaExcel completa.

    Returns:
        Texto do arquivo SVG.
    """
    titulo = texto_svg(tela.especificacao.get("alt", "Tela do Excel"))
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {LARGURA_TELA} {tela.altura}" '
        f'role="img" aria-label="{titulo}"><title>{titulo}</title>{DEFINICAO_SETA}'
        + "".join(tela.partes) + "</svg>\n"
    )
