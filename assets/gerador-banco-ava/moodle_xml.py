"""Monta o texto Moodle XML usado na importação do Banco de questões do AVA SENAI (Moodle).

Responsabilidade única: transformar categorias e questões já lidas em Moodle XML. Não lê nem
grava arquivos (isso fica em gerar_banco_ava.py).
⚠️ O botão das páginas (assets/js/banco-moodle-xml.js) gera o MESMO XML: mudou aqui, mudar lá
(constantes, ordem dos elementos e recuo) e comparar os dois.
Plano: docs/banco-questoes-ava-senai-moodle-xml.md
"""
import html
from xml.sax.saxutils import escape, quoteattr

CABECALHO_XML = '<?xml version="1.0" encoding="UTF-8"?>'
RECUO = "  "
FORMATO_HTML = "html"
RAIZ_CATEGORIA = "top"
SEPARADOR_CATEGORIA = "/"
SEPARADOR_CATEGORIA_ESCAPADO = "//"
NOTA_QUESTAO = "1.0000000"
PENALIDADE_QUESTAO = "0.0000000"
FRACAO_CORRETA = "100"
FRACAO_ERRADA = "0"
NUMERACAO_ALTERNATIVAS = "ABCD"
ROTULO_CONTEXTO = "Contexto:"
FEEDBACK_CORRETO = "Resposta correta."
FEEDBACK_PARCIAL = "Resposta parcialmente correta."
FEEDBACK_INCORRETO = "Resposta incorreta."
# Alternativas que citam as outras deixam de fazer sentido se a ordem mudar.
TERMOS_DEPENDEM_DA_ORDEM = ("todas as anteriores", "nenhuma das anteriores",
                            "todas as alternativas", "nenhuma das alternativas",
                            "alternativas acima", "opções acima", "todas acima", "nenhuma acima")


def recuar(linhas, nivel=1):
    """Acrescenta recuo às linhas XML.

    Args:
        linhas: Lista de linhas.
        nivel: Quantidade de recuos a acrescentar.

    Returns:
        Nova lista com as linhas recuadas.
    """
    prefixo = RECUO * nivel
    return [prefixo + linha for linha in linhas]


def elemento_texto(nome, texto, formato=None):
    """Monta um elemento Moodle com <text> dentro (ex.: <name>, <questiontext>).

    Args:
        nome: Nome do elemento XML.
        texto: Conteúdo já pronto (HTML ou texto simples); é escapado para XML aqui.
        formato: Valor do atributo format (ex.: "html"); None para não incluir.

    Returns:
        Lista de linhas XML.
    """
    atributo = f" format={quoteattr(formato)}" if formato else ""
    return [f"<{nome}{atributo}>", f"{RECUO}<text>{escape(texto)}</text>", f"</{nome}>"]


def paragrafo_html(texto, rotulo=""):
    """Monta um parágrafo HTML com o texto escapado e, se houver, um rótulo em negrito.

    Args:
        texto: Texto simples do parágrafo.
        rotulo: Rótulo opcional mostrado antes do texto (ex.: "Contexto:").

    Returns:
        Parágrafo HTML.
    """
    conteudo = html.escape(texto, quote=False)
    if rotulo:
        conteudo = f"<strong>{html.escape(rotulo, quote=False)}</strong> {conteudo}"
    return f"<p>{conteudo}</p>"


def nome_questao(item):
    """Nome da questão no banco do AVA (ex.: "ITEM 01 — Os Elementos da Comunicação")."""
    return f"ITEM {item['num']} — {item['titulo']}"


def montar_enunciado(item):
    """Enunciado HTML: contexto (quando houver) seguido do comando.

    Args:
        item: Questão lida por ler_questoes() (campos contexto e comando).

    Returns:
        HTML do enunciado.
    """
    paragrafos = []
    if item["contexto"]:
        paragrafos.append(paragrafo_html(item["contexto"], ROTULO_CONTEXTO))
    paragrafos.append(paragrafo_html(item["comando"]))
    return "".join(paragrafos)


def pode_embaralhar(item):
    """Indica se as alternativas podem ser embaralhadas no AVA.

    Args:
        item: Questão com a lista de alternativas em item["alts"].

    Returns:
        False quando alguma alternativa cita as outras (ex.: "Todas as anteriores").
    """
    textos = " ".join(texto.lower() for _, texto in item["alts"])
    return not any(termo in textos for termo in TERMOS_DEPENDEM_DA_ORDEM)


def montar_configuracao(item, prefixo_identificador):
    """Configuração da questão: nota, penalidade, ID, resposta única, embaralhar e numeração.

    Args:
        item: Questão lida por ler_questoes().
        prefixo_identificador: Prefixo do ID number (ex.: "INTRODUCAO-TIC-AULA-01").

    Returns:
        Lista de linhas XML.
    """
    embaralhar = "true" if pode_embaralhar(item) else "false"
    identificador = f"{prefixo_identificador}-Q{item['num']}"
    return [
        f"<defaultgrade>{NOTA_QUESTAO}</defaultgrade>",
        f"<penalty>{PENALIDADE_QUESTAO}</penalty>",
        "<hidden>0</hidden>",
        f"<idnumber>{escape(identificador)}</idnumber>",
        "<single>true</single>",
        f"<shuffleanswers>{embaralhar}</shuffleanswers>",
        f"<answernumbering>{NUMERACAO_ALTERNATIVAS}</answernumbering>",
        "<showstandardinstruction>0</showstandardinstruction>",
    ]


def montar_feedbacks():
    """Feedbacks gerais da questão, sem revelar qual alternativa é a certa."""
    return (elemento_texto("correctfeedback", paragrafo_html(FEEDBACK_CORRETO), FORMATO_HTML)
            + elemento_texto("partiallycorrectfeedback", paragrafo_html(FEEDBACK_PARCIAL),
                             FORMATO_HTML)
            + elemento_texto("incorrectfeedback", paragrafo_html(FEEDBACK_INCORRETO),
                             FORMATO_HTML))


def montar_alternativas(item):
    """Alternativas da questão: a do gabarito vale 100%, as demais 0%.

    Args:
        item: Questão com item["alts"] (lista de (letra, texto)) e item["gab"] (letra certa).

    Returns:
        Lista de linhas XML.
    """
    linhas = []
    for letra, texto in item["alts"]:
        fracao = FRACAO_CORRETA if letra == item["gab"] else FRACAO_ERRADA
        linhas.append(f'<answer fraction="{fracao}" format="{FORMATO_HTML}">')
        linhas.append(f"{RECUO}<text>{escape(paragrafo_html(texto))}</text>")
        linhas += recuar(elemento_texto("feedback", "", FORMATO_HTML))
        linhas.append("</answer>")
    return linhas


def montar_tags(item, rotulo):
    """Tags da questão: as capacidades (C1, S2...) e o rótulo da atividade (ex.: "Aula 01").

    Args:
        item: Questão com item["capacidades"].
        rotulo: Rótulo da atividade.

    Returns:
        Lista de linhas XML.
    """
    nomes = [*item["capacidades"], rotulo]
    linhas = ["<tags>"]
    linhas += [f"{RECUO}<tag><text>{escape(nome)}</text></tag>" for nome in nomes]
    linhas.append("</tags>")
    return linhas


def montar_questao(item, rotulo, prefixo_identificador):
    """Monta uma questão de múltipla escolha (resposta única) em Moodle XML.

    Args:
        item: Questão lida por ler_questoes().
        rotulo: Rótulo da atividade (vira tag).
        prefixo_identificador: Prefixo do ID number da questão.

    Returns:
        Texto XML da questão, já recuado para dentro de <quiz>.
    """
    corpo = (elemento_texto("name", nome_questao(item))
             + elemento_texto("questiontext", montar_enunciado(item), FORMATO_HTML)
             + elemento_texto("generalfeedback", "", FORMATO_HTML)
             + montar_configuracao(item, prefixo_identificador)
             + montar_feedbacks()
             + montar_alternativas(item)
             + montar_tags(item, rotulo))
    linhas = ['<question type="multichoice">', *recuar(corpo), "</question>"]
    return "\n".join(recuar(linhas))


def caminho_categoria(partes):
    """Caminho da categoria a partir da raiz do banco (ex.: "top/Introdução à TIC/Aula 01 — ...").

    Sem contexto ($course$) no caminho: o AVA cria as categorias no banco escolhido na importação.

    Args:
        partes: Nomes das categorias, da mais geral para a mais específica.

    Returns:
        Caminho com "/" escapado como "//" dentro dos nomes (regra do Moodle).
    """
    seguras = [parte.replace(SEPARADOR_CATEGORIA, SEPARADOR_CATEGORIA_ESCAPADO)
               for parte in partes]
    return SEPARADOR_CATEGORIA.join([RAIZ_CATEGORIA, *seguras])


def montar_categoria(partes):
    """Monta o bloco que muda a categoria das questões seguintes.

    Args:
        partes: Nomes das categorias, da mais geral para a mais específica.

    Returns:
        Texto XML do bloco de categoria, já recuado para dentro de <quiz>.
    """
    corpo = (elemento_texto("category", caminho_categoria(partes))
             + elemento_texto("info", "", FORMATO_HTML))
    linhas = ['<question type="category">', *recuar(corpo), "</question>"]
    return "\n".join(recuar(linhas))


def montar_quiz(blocos):
    """Documento completo de importação: cabeçalho XML e os blocos dentro de <quiz>.

    Args:
        blocos: Textos XML de categorias e questões, na ordem de importação.

    Returns:
        Documento Moodle XML.
    """
    return "\n".join([CABECALHO_XML, "<quiz>", *blocos, "</quiz>"]) + "\n"
