"""Tela do Excel (janela, faixa de opções, barra de fórmulas, grade e abas) em SVG."""

import re

from desenho_excel import (
    ALTURA_ABAS, ALTURA_BARRA, ALTURA_CAB_COLUNA, ALTURA_ESQUEMA_PADRAO, ALTURA_FAIXA,
    ALTURA_GUIAS, ALTURA_LINHA, ALTURA_TITULO, BOTOES_POR_GUIA, COR_BORDA_DADOS, COR_CABECALHO,
    COR_EXCEL, COR_GRADE, COR_SELECAO, CORES_SITUACAO, FONTE, FONTE_MONO, GUIAS,
    LARGURA_CAB_LINHA, LARGURA_COLUNA_PADRAO, LARGURA_TELA, LINHAS_PADRAO, MARGEM,
    Y_BARRA, Y_FAIXA, Y_GRADE, Y_GUIAS, coluna_para_numero,
    cortar_para_largura, montar_celulas, numero_para_coluna, quebrar_texto,
    referencias_do_intervalo,
    texto_svg, valor_numerico,
)

LARGURA_BOTAO = 80
ESPACO_BOTAO = 6
PADRAO_DATA = re.compile(r"^\d{2}/\d{2}/\d{4}$")
TAMANHO_FONTE_FORMULA = 13.5
LARGURA_CARACTERE_FORMULA = TAMANHO_FONTE_FORMULA * 0.55
COR_TEXTO_FORMULA = "#1f2937"
FUNDOS_ESTILO = {
    "cabecalho": COR_CABECALHO,
    "td_cabecalho": "#dbe5f1",
    "td_total": "#dbe5f1",
}


def cor_da_escala(proporcao):
    """Calcula a cor da escala vermelho-amarelo-verde do Excel para um valor de 0 a 1.

    Args:
        proporcao: Posição do valor entre o menor (0) e o maior (1).

    Returns:
        Cor hexadecimal.
    """
    vermelho, amarelo, verde = (248, 105, 107), (255, 235, 132), (99, 190, 123)
    inicio, fim, parte = (
        (vermelho, amarelo, proporcao * 2) if proporcao < 0.5
        else (amarelo, verde, (proporcao - 0.5) * 2)
    )
    canais = [round(a + (b - a) * parte) for a, b in zip(inicio, fim)]
    return "#%02x%02x%02x" % tuple(canais)


class TelaExcel:
    """Monta uma tela ilustrada do Excel e guarda a posição de cada elemento desenhado."""

    def __init__(self, especificacao, planilhas, arquivo):
        """Prepara a tela.

        Args:
            especificacao: Dicionário da imagem (guia, grade, diálogos, marcas...).
            planilhas: Planilhas do atividade.json, por nome de aba.
            arquivo: Nome do arquivo exibido na barra de título.
        """
        self.especificacao = especificacao
        self.arquivo = arquivo
        fonte = especificacao.get("planilha", especificacao.get("aba_ativa", ""))
        self.celulas = montar_celulas(planilhas.get(fonte), especificacao)
        self.partes = []
        self.posicoes = {}
        self.cores_texto = {}
        self.colunas = {}
        self.linhas = {}
        self.altura = 0
        self.y_abas = 0

    def registrar(self, chave, x, y, largura, altura):
        """Guarda a posição de um elemento para marcas e setas.

        Args:
            chave: Nome do elemento (ex.: "botao:Moeda").
            x: Posição horizontal.
            y: Posição vertical.
            largura: Largura do elemento.
            altura: Altura do elemento.
        """
        self.posicoes[chave] = (x, y, largura, altura)

    def retangulo(self, x, y, largura, altura, estilo):
        """Acrescenta um retângulo ao desenho.

        Args:
            x: Posição horizontal.
            y: Posição vertical.
            largura: Largura.
            altura: Altura.
            estilo: Atributos SVG extras (fill, stroke...).
        """
        self.partes.append(
            f'<rect x="{x:.1f}" y="{y:.1f}" width="{largura:.1f}" height="{altura:.1f}" {estilo}/>'
        )

    def texto(self, x, y, conteudo, estilo=""):
        """Acrescenta um texto ao desenho.

        Args:
            x: Posição horizontal.
            y: Linha de base do texto.
            conteudo: Texto (será escapado).
            estilo: Atributos SVG extras.
        """
        fonte = "" if "font-family" in estilo else f'font-family="{FONTE}" '
        self.partes.append(
            f'<text x="{x:.1f}" y="{y:.1f}" {fonte}{estilo}>{texto_svg(conteudo)}</text>'
        )

    def calcular_layout(self):
        """Calcula colunas, linhas visíveis e a altura total da tela."""
        especificacao = self.especificacao
        if especificacao.get("somente_esquema"):
            altura_area = especificacao.get("altura_esquema", ALTURA_ESQUEMA_PADRAO)
            self.y_abas = Y_GRADE + altura_area + 6
            self.altura = self.y_abas + ALTURA_ABAS + 6
            return
        linhas = especificacao.get("linhas_visiveis") or list(
            range(1, especificacao.get("linhas", LINHAS_PADRAO) + 1)
        )
        y = Y_GRADE + ALTURA_CAB_COLUNA
        for linha in linhas:
            self.linhas[linha] = (y, ALTURA_LINHA)
            y += ALTURA_LINHA
        self.y_abas = y + 6
        self.altura = self.y_abas + ALTURA_ABAS + 6
        self.calcular_colunas()

    def calcular_colunas(self):
        """Distribui as colunas pedidas na largura disponível, completando com colunas vazias."""
        inicio, _, fim = self.especificacao.get("colunas", "A:H").partition(":")
        fim = fim or inicio
        larguras = self.especificacao.get("larguras", {})
        pedidas = [
            numero_para_coluna(numero)
            for numero in range(coluna_para_numero(inicio), coluna_para_numero(fim) + 1)
        ]
        tamanhos = [larguras.get(coluna, LARGURA_COLUNA_PADRAO) for coluna in pedidas]
        disponivel = LARGURA_TELA - 2 * MARGEM - LARGURA_CAB_LINHA
        escala = min(1.0, disponivel / sum(tamanhos))
        x = MARGEM + LARGURA_CAB_LINHA
        for coluna, tamanho in zip(pedidas, tamanhos):
            self.colunas[coluna] = (x, tamanho * escala)
            x += tamanho * escala
        proxima = coluna_para_numero(fim) + 1
        while x < LARGURA_TELA - MARGEM - 10:
            tamanho = min(LARGURA_COLUNA_PADRAO, LARGURA_TELA - MARGEM - x)
            self.colunas[numero_para_coluna(proxima)] = (x, tamanho)
            x += tamanho
            proxima += 1

    def desenhar_janela(self):
        """Desenha a barra de título, as guias, a faixa de opções e a barra de fórmulas."""
        self.retangulo(0, 0, LARGURA_TELA, self.altura, 'fill="#ffffff" stroke="#9aa4b2"')
        self.retangulo(0, 0, LARGURA_TELA, ALTURA_TITULO, f'fill="{COR_EXCEL}"')
        self.texto(12, 19, "Excel", 'font-size="13" font-weight="700" fill="#ffffff"')
        self.texto(LARGURA_TELA - 14, 19, self.arquivo,
                   'font-size="13" fill="#ffffff" text-anchor="end"')
        self.desenhar_guias()
        self.desenhar_faixa()
        self.desenhar_barra_formulas()

    def desenhar_guias(self):
        """Desenha a linha de guias (Arquivo, Página Inicial, Dados...) com a guia ativa."""
        self.retangulo(0, Y_GUIAS, LARGURA_TELA, ALTURA_GUIAS, 'fill="#f3f3f3"')
        ativa = self.especificacao.get("guia", "Página Inicial")
        guias = GUIAS if ativa in GUIAS else GUIAS + [ativa]
        x = 10
        for guia in guias:
            largura = len(guia) * 7 + 18
            if guia == ativa:
                self.retangulo(x, Y_GUIAS + 2, largura, ALTURA_GUIAS - 2, 'fill="#ffffff"')
                self.retangulo(x, Y_GUIAS + ALTURA_GUIAS - 3, largura, 3, f'fill="{COR_EXCEL}"')
            peso = 'font-weight="700"' if guia == ativa else ""
            self.texto(x + 9, Y_GUIAS + 17, guia, f'font-size="12" fill="#333" {peso}')
            self.registrar("guia:" + guia, x, Y_GUIAS, largura, ALTURA_GUIAS)
            x += largura + 2

    def desenhar_faixa(self):
        """Desenha os botões da guia ativa na faixa de opções."""
        self.retangulo(0, Y_FAIXA, LARGURA_TELA, ALTURA_FAIXA,
                       'fill="#ffffff" stroke="#e1e1e1"')
        guia = self.especificacao.get("guia", "Página Inicial")
        botoes = BOTOES_POR_GUIA.get(guia, [])
        x = MARGEM
        for rotulo, simbolo in botoes:
            self.desenhar_botao(x, rotulo, simbolo)
            x += LARGURA_BOTAO + ESPACO_BOTAO

    def desenhar_botao(self, x, rotulo, simbolo):
        """Desenha um botão da faixa de opções com símbolo e rótulo em até duas linhas.

        Args:
            x: Posição horizontal do botão.
            rotulo: Nome do botão.
            simbolo: Símbolo exibido no alto do botão.
        """
        y = Y_FAIXA + 6
        self.retangulo(x, y, LARGURA_BOTAO, ALTURA_FAIXA - 12,
                       'rx="5" fill="#f7f7f7" stroke="#e0e0e0"')
        self.texto(x + LARGURA_BOTAO / 2, y + 20, simbolo,
                   f'font-size="16" font-weight="700" fill="{COR_EXCEL}" text-anchor="middle"')
        for indice, linha in enumerate(quebrar_texto(rotulo, 13)[:2]):
            self.texto(x + LARGURA_BOTAO / 2, y + 36 + indice * 12, linha,
                       'font-size="10.5" fill="#333" text-anchor="middle"')
        self.registrar("botao:" + rotulo, x, y, LARGURA_BOTAO, ALTURA_FAIXA - 12)

    def desenhar_barra_formulas(self):
        """Desenha a Caixa de Nome e a Barra de Fórmulas, com a fórmula colorida se houver."""
        y = Y_BARRA
        self.retangulo(MARGEM, y, 90, ALTURA_BARRA, 'fill="#ffffff" stroke="#c8c8c8"')
        self.texto(MARGEM + 8, y + 18, self.especificacao.get("celula_ativa", "A1"),
                   f'font-size="13" font-family="{FONTE_MONO}"')
        self.registrar("caixa_nome", MARGEM, y, 90, ALTURA_BARRA)
        self.texto(MARGEM + 102, y + 18, "fx", 'font-size="13" font-style="italic" fill="#666"')
        x_formula = MARGEM + 124
        largura = LARGURA_TELA - MARGEM - x_formula
        self.retangulo(x_formula, y, largura, ALTURA_BARRA, 'fill="#ffffff" stroke="#c8c8c8"')
        self.registrar("barra", x_formula, y, largura, ALTURA_BARRA)
        self.desenhar_formula(x_formula + 8, y + 18)

    def desenhar_formula(self, x, y):
        """Escreve a fórmula da célula ativa; partes coloridas explicam cada argumento.

        Args:
            x: Início do texto.
            y: Linha de base.
        """
        partes = self.especificacao.get("formula_cores")
        if not partes:
            partes = [[self.especificacao.get("formula", ""), "#1f2937"]]
        self.destacar_partes_formula(x, y, partes)
        pedacos = "".join(
            f'<tspan fill="{cor}" font-weight="{700 if cor != COR_TEXTO_FORMULA else 400}">'
            f"{texto_svg(trecho)}</tspan>"
            for trecho, cor in partes
        )
        self.partes.append(
            f'<text x="{x}" y="{y}" font-family="{FONTE_MONO}" '
            f'font-size="{TAMANHO_FONTE_FORMULA}" xml:space="preserve">{pedacos}</text>'
        )

    def destacar_partes_formula(self, x, y, partes):
        """Pinta um fundo claro atrás de cada argumento colorido da fórmula.

        Args:
            x: Início do texto da fórmula.
            y: Linha de base do texto.
            partes: Lista de [trecho, cor].
        """
        posicao = x
        for trecho, cor in partes:
            largura = len(trecho) * LARGURA_CARACTERE_FORMULA
            if cor != COR_TEXTO_FORMULA:
                self.retangulo(posicao - 1, y - 14, largura + 2, 19,
                               f'rx="3" fill="{cor}" fill-opacity="0.16"')
            posicao += largura

    def desenhar_grade(self):
        """Desenha cabeçalhos de coluna e linha, células, estilos, seleção e bordas."""
        if self.especificacao.get("somente_esquema"):
            return
        self.desenhar_cabecalhos()
        for linha, (y, altura) in self.linhas.items():
            for coluna, (x, largura) in self.colunas.items():
                self.registrar(f"celula:{coluna}{linha}", x, y, largura, altura)
                self.retangulo(x, y, largura, altura, f'fill="#ffffff" stroke="{COR_GRADE}"')
        self.desenhar_mesclagens()
        self.desenhar_estilos()
        self.desenhar_bordas_dados()
        self.desenhar_selecao()
        self.desenhar_conteudo()
        self.desenhar_filtros()

    def desenhar_cabecalhos(self):
        """Desenha as letras das colunas e os números das linhas."""
        self.retangulo(MARGEM, Y_GRADE, LARGURA_CAB_LINHA, ALTURA_CAB_COLUNA,
                       f'fill="#f0f0f0" stroke="{COR_GRADE}"')
        for coluna, (x, largura) in self.colunas.items():
            self.retangulo(x, Y_GRADE, largura, ALTURA_CAB_COLUNA,
                           f'fill="#f0f0f0" stroke="{COR_GRADE}"')
            self.texto(x + largura / 2, Y_GRADE + 15, coluna,
                       'font-size="12" fill="#555" text-anchor="middle"')
            self.registrar("coluna:" + coluna, x, Y_GRADE, largura, ALTURA_CAB_COLUNA)
            self.registrar("divisa:" + coluna, x + largura - 5, Y_GRADE, 10, ALTURA_CAB_COLUNA)
        for linha, (y, altura) in self.linhas.items():
            self.retangulo(MARGEM, y, LARGURA_CAB_LINHA, altura,
                           f'fill="#f0f0f0" stroke="{COR_GRADE}"')
            self.texto(MARGEM + LARGURA_CAB_LINHA / 2, y + 16, linha,
                       'font-size="12" fill="#555" text-anchor="middle"')
            self.registrar(f"linha:{linha}", MARGEM, y, LARGURA_CAB_LINHA, altura)

    def retangulo_do_intervalo(self, intervalo):
        """Calcula o retângulo que cobre as células visíveis de um intervalo.

        Args:
            intervalo: Referência ou intervalo (ex.: "B2:C5").

        Returns:
            Tupla (x, y, largura, altura) ou None se nada estiver visível.
        """
        caixas = [
            self.posicoes["celula:" + ref]
            for ref in referencias_do_intervalo(intervalo)
            if "celula:" + ref in self.posicoes
        ]
        if not caixas:
            return None
        x = min(caixa[0] for caixa in caixas)
        y = min(caixa[1] for caixa in caixas)
        direita = max(caixa[0] + caixa[2] for caixa in caixas)
        baixo = max(caixa[1] + caixa[3] for caixa in caixas)
        return (x, y, direita - x, baixo - y)

    def desenhar_estilos(self):
        """Pinta cabeçalhos, estilos de tabela dinâmica, cores de situação e barras de dados."""
        for estilo in self.especificacao.get("estilos", []):
            fundo = FUNDOS_ESTILO.get(estilo.get("tipo"))
            if not fundo:
                continue
            borda = "#ffffff" if estilo["tipo"] == "cabecalho" else COR_GRADE
            for ref in referencias_do_intervalo(estilo["intervalo"]):
                caixa = self.posicoes.get("celula:" + ref)
                if caixa:
                    self.retangulo(*caixa, f'fill="{fundo}" stroke="{borda}"')
        self.pintar_zebra(self.especificacao.get("zebra"))
        coluna_cores = self.especificacao.get("cores_situacao")
        if coluna_cores:
            self.pintar_situacoes(coluna_cores)
        coluna_barras = self.especificacao.get("barras")
        if coluna_barras:
            self.desenhar_barras_dados(coluna_barras)
        coluna_escala = self.especificacao.get("escala_cores")
        if coluna_escala:
            self.desenhar_escala_cores(coluna_escala)
        self.pintar_realces(self.especificacao.get("realces", []))

    def pintar_zebra(self, intervalo):
        """Pinta as linhas ímpares do intervalo (linhas alternadas de um estilo de tabela).

        Args:
            intervalo: Intervalo das linhas de dados (ex.: "A2:J10") ou None.
        """
        if not intervalo:
            return
        for ref in referencias_do_intervalo(intervalo):
            caixa = self.posicoes.get("celula:" + ref)
            linha = int(ref.lstrip("ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
            if caixa and linha % 2 == 1:
                self.retangulo(*caixa, f'fill="#dbe5f1" stroke="{COR_GRADE}"')

    def pintar_realces(self, realces):
        """Aplica cores de formatação condicional a intervalos (fundo e cor do texto).

        Args:
            realces: Lista de {"intervalo", "fundo", "texto"}.
        """
        for realce in realces:
            for ref in referencias_do_intervalo(realce["intervalo"]):
                caixa = self.posicoes.get("celula:" + ref)
                if not caixa:
                    continue
                self.retangulo(*caixa, f'fill="{realce["fundo"]}" stroke="{COR_GRADE}"')
                self.cores_texto[ref] = realce.get("texto", "#1f2937")

    def desenhar_escala_cores(self, coluna):
        """Pinta a coluna com uma escala de cores (vermelho = menor, verde = maior).

        Args:
            coluna: Letra da coluna com os valores.
        """
        valores = {
            linha: valor_numerico(self.celulas.get(f"{coluna}{linha}"))
            for linha in self.linhas if linha > 1
        }
        numeros = [valor for valor in valores.values() if valor is not None]
        if not numeros:
            return
        menor, maior = min(numeros), max(numeros)
        for linha, valor in valores.items():
            caixa = self.posicoes.get(f"celula:{coluna}{linha}")
            if caixa and valor is not None:
                proporcao = 0 if maior == menor else (valor - menor) / (maior - menor)
                self.retangulo(*caixa, f'fill="{cor_da_escala(proporcao)}" stroke="{COR_GRADE}"')

    def desenhar_mesclagens(self):
        """Desenha células mescladas como um único retângulo, com o texto centralizado."""
        for intervalo in self.especificacao.get("mesclar", []):
            caixa = self.retangulo_do_intervalo(intervalo)
            if not caixa:
                continue
            self.retangulo(*caixa, f'fill="#ffffff" stroke="{COR_GRADE}"')
            primeira = referencias_do_intervalo(intervalo)[0]
            x, y, largura, _ = caixa
            self.texto(x + largura / 2, y + 16, self.celulas.get(primeira, ""),
                       'font-size="13" font-weight="700" fill="#1f2937" text-anchor="middle"')

    def pintar_situacoes(self, coluna):
        """Aplica as cores de Crítico, Atenção e Normal na coluna indicada.

        Args:
            coluna: Letra da coluna com a situação.
        """
        for linha in self.linhas:
            ref = f"{coluna}{linha}"
            cores = CORES_SITUACAO.get(self.celulas.get(ref))
            caixa = self.posicoes.get("celula:" + ref)
            if cores and caixa:
                self.retangulo(*caixa, f'fill="{cores[0]}" stroke="{COR_GRADE}"')

    def desenhar_barras_dados(self, coluna):
        """Desenha barras de dados proporcionais ao valor de cada célula da coluna.

        Args:
            coluna: Letra da coluna com os valores.
        """
        valores = {
            linha: valor_numerico(self.celulas.get(f"{coluna}{linha}"))
            for linha in self.linhas if linha > 1
        }
        maior = max([valor for valor in valores.values() if valor] or [1])
        for linha, valor in valores.items():
            caixa = self.posicoes.get(f"celula:{coluna}{linha}")
            if not caixa or not valor:
                continue
            x, y, largura, altura = caixa
            self.retangulo(x + 2, y + 3, (largura - 4) * valor / maior, altura - 6,
                           'fill="#63be7b" fill-opacity="0.55"')

    def desenhar_bordas_dados(self):
        """Desenha bordas escuras nos intervalos pedidos (botão Todas as Bordas)."""
        for intervalo in self.especificacao.get("bordas", []):
            for ref in referencias_do_intervalo(intervalo):
                caixa = self.posicoes.get("celula:" + ref)
                if caixa:
                    self.retangulo(*caixa, f'fill="none" stroke="{COR_BORDA_DADOS}"')

    def desenhar_selecao(self):
        """Destaca o intervalo selecionado como no Excel (fundo claro e contorno verde)."""
        selecoes = self.especificacao.get("selecao", [])
        if isinstance(selecoes, str):
            selecoes = [selecoes]
        for selecao in selecoes:
            caixa = self.retangulo_do_intervalo(selecao)
            if caixa:
                self.retangulo(*caixa,
                               f'fill="{COR_SELECAO}" fill-opacity="0.12" '
                               f'stroke="{COR_SELECAO}" stroke-width="2.5"')

    def mapear_estilos_texto(self):
        """Indica o estilo de texto de cada célula ("cabecalho" ou "negrito").

        Returns:
            Dicionário referência → estilo de texto.
        """
        mapa = {}
        for estilo in self.especificacao.get("estilos", []):
            texto = "cabecalho" if estilo.get("tipo") == "cabecalho" else "negrito"
            for ref in referencias_do_intervalo(estilo["intervalo"]):
                mapa[ref] = texto
        return mapa

    def celulas_mescladas(self):
        """Lista as células que ficam dentro de alguma mesclagem.

        Returns:
            Conjunto de referências mescladas.
        """
        return {
            ref for intervalo in self.especificacao.get("mesclar", [])
            for ref in referencias_do_intervalo(intervalo)
        }

    def desenhar_conteudo(self):
        """Escreve o texto das células, alinhando números à direita e texto à esquerda."""
        estilos_texto = self.mapear_estilos_texto()
        mescladas = self.celulas_mescladas()
        ocultas = set(self.especificacao.get("ocultar_texto", []))
        for ref, valor in self.celulas.items():
            caixa = self.posicoes.get("celula:" + ref)
            coluna = ref.rstrip("0123456789")
            e_dado_oculto = coluna in ocultas and int(ref[len(coluna):]) > 1
            if not caixa or valor in (None, "") or e_dado_oculto or ref in mescladas:
                continue
            self.escrever_celula(ref, caixa, valor, estilos_texto.get(ref))

    def escrever_celula(self, ref, caixa, valor, estilo_texto):
        """Escreve o valor de uma célula com cor, peso e alinhamento adequados.

        Args:
            ref: Referência da célula.
            caixa: Retângulo da célula.
            valor: Texto exibido.
            estilo_texto: None, "cabecalho" (branco centralizado) ou "negrito".
        """
        x, y, largura, _ = caixa
        texto = cortar_para_largura(valor, largura)
        cor = self.cores_texto.get(ref, "#1f2937")
        cores = CORES_SITUACAO.get(valor)
        if cores and self.especificacao.get("cores_situacao") == ref.rstrip("0123456789"):
            cor = cores[1]
        if estilo_texto == "cabecalho":
            self.texto(x + largura / 2, y + 16, texto,
                       'font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle"')
            return
        peso = 'font-weight="700" ' if estilo_texto == "negrito" else ""
        texto_valor = str(valor)
        e_numero = valor_numerico(valor) is not None and not texto_valor.startswith("0")
        e_data = PADRAO_DATA.match(texto_valor) is not None
        alinha_direita = (
            e_numero or e_data or texto_valor.endswith("%") or texto_valor == "0"
            or texto_valor.startswith(("R$", "0,", "•"))
        )
        if alinha_direita:
            self.texto(x + largura - 5, y + 16, texto,
                       f'font-size="12.5" {peso}fill="{cor}" text-anchor="end"')
            return
        self.texto(x + 5, y + 16, texto, f'font-size="12.5" {peso}fill="{cor}"')

    def desenhar_filtros(self):
        """Desenha as setas de AutoFiltro nas células de cabeçalho."""
        intervalo = self.especificacao.get("filtro")
        if not intervalo:
            return
        for ref in referencias_do_intervalo(intervalo):
            caixa = self.posicoes.get("celula:" + ref)
            if not caixa:
                continue
            x, y, largura, altura = caixa
            self.retangulo(x + largura - 18, y + 4, 15, altura - 8,
                           'rx="2" fill="#ffffff" stroke="#8a8a8a"')
            self.texto(x + largura - 10.5, y + altura - 8, "▼",
                       'font-size="8" fill="#444" text-anchor="middle"')
            self.registrar("seta_filtro:" + ref, x + largura - 18, y + 4, 15, altura - 8)

    def desenhar_abas(self):
        """Desenha as abas das planilhas no rodapé, com a aba ativa em destaque e o botão +."""
        y = self.y_abas
        self.retangulo(0, y - 2, LARGURA_TELA, ALTURA_ABAS + 4, 'fill="#f3f3f3"')
        ativa = self.especificacao.get("aba_ativa", "")
        x = MARGEM + 40
        for aba in self.especificacao.get("abas", [ativa]):
            largura = len(aba) * 7.5 + 24
            estilo = f'fill="#ffffff" stroke="{COR_EXCEL}"' if aba == ativa else \
                'fill="#e9e9e9" stroke="#c8c8c8"'
            self.retangulo(x, y, largura, ALTURA_ABAS - 2, estilo)
            peso = f'font-weight="700" fill="{COR_EXCEL}"' if aba == ativa else 'fill="#444"'
            self.texto(x + largura / 2, y + 17, aba,
                       f'font-size="12.5" text-anchor="middle" {peso}')
            self.registrar("aba:" + aba, x, y, largura, ALTURA_ABAS - 2)
            x += largura + 4
        self.retangulo(x + 4, y + 2, 22, ALTURA_ABAS - 6, 'rx="11" fill="#ffffff" stroke="#999"')
        self.texto(x + 15, y + 17, "+", 'font-size="15" text-anchor="middle" fill="#444"')
        self.registrar("aba:+", x + 4, y + 2, 22, ALTURA_ABAS - 6)
