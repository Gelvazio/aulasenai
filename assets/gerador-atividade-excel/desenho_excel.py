"""Desenha telas ilustradas do Excel em SVG para as atividades práticas.

Cada imagem é descrita por um dicionário (a "especificação" do passo) com a guia ativa, os
botões destacados, a fórmula, a grade de células, caixas de diálogo, menus, setas e marcas
numeradas. As posições de cada elemento desenhado ficam registradas para que marcas e setas
possam apontar para eles pelo nome (ex.: "botao:Moeda", "celula:B2", "campo:Fonte:").
"""

import re
from html import escape

LARGURA_TELA = 960
ALTURA_TITULO = 28
Y_GUIAS = 28
ALTURA_GUIAS = 26
Y_FAIXA = 54
ALTURA_FAIXA = 70
Y_BARRA = 130
ALTURA_BARRA = 26
Y_GRADE = 164
ALTURA_CAB_COLUNA = 22
ALTURA_LINHA = 24
LARGURA_CAB_LINHA = 36
MARGEM = 8
ALTURA_ABAS = 26
LARGURA_COLUNA_PADRAO = 96
LINHAS_PADRAO = 12
ALTURA_ESQUEMA_PADRAO = 360
LARGURA_CARACTERE = 7.0
RAIO_MARCA = 14

COR_EXCEL = "#217346"
COR_DESTAQUE = "#f47b20"
COR_GRADE = "#d9d9d9"
COR_BORDA_DADOS = "#7f7f7f"
COR_CABECALHO = "#1f3864"
COR_SELECAO = "#217346"
FONTE = "Segoe UI, Arial, sans-serif"
FONTE_MONO = "Consolas, Courier New, monospace"

GUIAS = ["Arquivo", "Página Inicial", "Inserir", "Layout da Página", "Fórmulas", "Dados",
         "Revisão", "Exibir"]

BOTOES_POR_GUIA = {
    "Página Inicial": [("Colar", "▣"), ("Pincel de Formatação", "✎"), ("Negrito", "N"),
                       ("Cor da Fonte", "A"), ("Cor de Preenchimento", "◧"), ("Bordas", "▦"),
                       ("Centralizar", "≡"), ("Moeda", "R$"), ("Porcentagem", "%"),
                       ("Formatação Condicional", "▤"), ("Classificar e Filtrar", "⇅")],
    "Dados": [("Obter Dados", "⤓"), ("Classificar", "⇅"), ("Filtro", "▼"), ("Limpar", "✕"),
              ("Validação de Dados", "✓"), ("Remover Duplicatas", "⧉"),
              ("Atualizar Tudo", "⟳")],
    "Exibir": [("Normal", "▭"), ("Linhas de Grade", "▦"), ("Zoom", "⊕"),
               ("Congelar Painéis", "❄")],
    "Revisão": [("Ortografia", "abc"), ("Proteger Planilha", "⊠"),
                ("Proteger Pasta de Trabalho", "⊡"), ("Permitir Edição de Intervalos", "✎")],
    "Fórmulas": [("Inserir Função", "fx"), ("AutoSoma", "Σ"), ("Lógica", "?"),
                 ("Pesquisa e Referência", "⌕")],
    "Inserir": [("Tabela Dinâmica", "▦"), ("Tabela", "▤"), ("Gráficos", "▥")],
    "Layout da Página": [("Margens", "▭"), ("Orientação", "⇵")],
    "Arquivo": [("Salvar Como", "⤓")],
    "Design da Tabela": [("Nome da Tabela", "▦"), ("Resumir com Tabela Dinâmica", "▤"),
                         ("Linha de Totais", "Σ"), ("Estilos de Tabela", "▥")],
    "Análise da Tabela Dinâmica": [("Campo Ativo", "▤"), ("Agrupar Seleção", "⊞"),
                                   ("Inserir Segmentação de Dados", "▦"),
                                   ("Inserir Linha do Tempo", "⇆"), ("Atualizar", "⟳"),
                                   ("Campos, Itens e Conjuntos", "fx"),
                                   ("Gráfico Dinâmico", "▥"), ("Lista de Campos", "☰")],
    "Design do Gráfico": [("Adicionar Elemento de Gráfico", "+"), ("Layout Rápido", "▦"),
                          ("Alterar Cores", "◧"), ("Alterar Tipo de Gráfico", "▥")],
}

CORES_SITUACAO = {
    "Crítico": ("#ffc7ce", "#9c0006"),
    "Atenção": ("#ffeb9c", "#9c5700"),
    "Normal": ("#c6efce", "#006100"),
}

PADRAO_REFERENCIA = re.compile(r"^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$")


def coluna_para_numero(coluna):
    """Converte a letra da coluna em número (A=1, B=2, ..., AA=27).

    Args:
        coluna: Letras da coluna.

    Returns:
        Número da coluna a partir de 1.
    """
    numero = 0
    for letra in coluna:
        numero = numero * 26 + (ord(letra) - 64)
    return numero


def numero_para_coluna(numero):
    """Converte o número da coluna em letras (1=A, 27=AA).

    Args:
        numero: Número da coluna a partir de 1.

    Returns:
        Letras da coluna.
    """
    letras = ""
    while numero > 0:
        numero, resto = divmod(numero - 1, 26)
        letras = chr(65 + resto) + letras
    return letras


def texto_svg(texto):
    """Escapa o texto para uso seguro dentro do SVG.

    Args:
        texto: Texto qualquer.

    Returns:
        Texto com &, <, > e aspas escapados.
    """
    return escape(str(texto), quote=True)


def valor_numerico(texto):
    """Interpreta o texto exibido numa célula como número, se for possível.

    Args:
        texto: Conteúdo exibido (ex.: "R$ 1.228,50", "-20", "47,2%").

    Returns:
        Número (float) ou None quando o texto não é numérico.
    """
    if texto is None:
        return None
    limpo = str(texto).replace("R$", "").replace("%", "").strip()
    limpo = limpo.replace(".", "").replace(",", ".")
    try:
        return float(limpo)
    except ValueError:
        return None


def texto_bruto(texto):
    """Mostra um valor como ele fica logo após ser digitado, antes da formatação.

    Args:
        texto: Valor já formatado (ex.: "R$ 18,90").

    Returns:
        Valor sem símbolo de moeda nem zeros finais (ex.: "18,9").
    """
    if not str(texto).startswith("R$"):
        return texto
    limpo = str(texto).replace("R$", "").strip().replace(".", "")
    if "," in limpo:
        limpo = limpo.rstrip("0").rstrip(",")
    return limpo


def quebrar_texto(texto, maximo_caracteres):
    """Quebra o texto em linhas de até N caracteres, respeitando as palavras.

    Args:
        texto: Texto a quebrar ("\\n" força quebra).
        maximo_caracteres: Tamanho máximo de cada linha.

    Returns:
        Lista de linhas.
    """
    linhas = []
    for paragrafo in str(texto).split("\n"):
        atual = ""
        for palavra in paragrafo.split(" "):
            candidata = (atual + " " + palavra).strip()
            if len(candidata) > maximo_caracteres and atual:
                linhas.append(atual)
                candidata = palavra
            atual = candidata
        linhas.append(atual)
    return linhas


def cortar_para_largura(texto, largura):
    """Corta o texto para caber na largura informada (em pixels).

    Args:
        texto: Texto da célula.
        largura: Largura disponível em pixels.

    Returns:
        Texto que cabe na largura.
    """
    maximo = max(1, int((largura - 8) / LARGURA_CARACTERE))
    texto = str(texto)
    if len(texto) <= maximo:
        return texto
    return texto[: maximo - 1] + "…"


def montar_celulas(planilha, especificacao):
    """Monta o dicionário referência → texto exibido para a grade da imagem.

    Args:
        planilha: Dados da planilha no atividade.json ("linhas" e/ou "celulas").
        especificacao: Especificação da imagem (bruto, vazias, celulas).

    Returns:
        Dicionário como {"A1": "Código", "B2": "Luva de vaqueta"}.
    """
    celulas = {}
    for indice_linha, linha in enumerate((planilha or {}).get("linhas", []), start=1):
        for indice_coluna, valor in enumerate(linha, start=1):
            celulas[numero_para_coluna(indice_coluna) + str(indice_linha)] = valor
    celulas.update((planilha or {}).get("celulas", {}))
    if especificacao.get("bruto"):
        celulas = {ref: texto_bruto(valor) for ref, valor in celulas.items()}
    for intervalo in especificacao.get("vazias", []):
        for ref in referencias_do_intervalo(intervalo):
            celulas.pop(ref, None)
    celulas.update(especificacao.get("celulas", {}))
    return celulas


def referencias_do_intervalo(intervalo):
    """Lista todas as referências de um intervalo (ex.: "A1:B2" → A1, B1, A2, B2).

    Args:
        intervalo: Referência simples ou intervalo.

    Returns:
        Lista de referências.
    """
    encontrado = PADRAO_REFERENCIA.match(intervalo)
    if not encontrado:
        return []
    coluna_inicio, linha_inicio, coluna_fim, linha_fim = encontrado.groups()
    coluna_fim = coluna_fim or coluna_inicio
    linha_fim = linha_fim or linha_inicio
    return [
        numero_para_coluna(coluna) + str(linha)
        for linha in range(int(linha_inicio), int(linha_fim) + 1)
        for coluna in range(coluna_para_numero(coluna_inicio), coluna_para_numero(coluna_fim) + 1)
    ]
