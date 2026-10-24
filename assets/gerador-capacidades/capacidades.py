"""Capacidades da ementa nas avaliações: quadro no início e caixa CAPACIDADE em cada questão.

Usado por assets/gerador-atividades e assets/gerador-avaliacao-discursiva.
Dados: campo "capacidades" do materia.json da matéria ({"C1": "texto oficial", ...}).
Questão: linha "- **Capacidade:** C1" ou "- **Capacidade:** C1, C3" no .md.
Plano: docs/capacidade-por-questao-avaliacoes.md
"""
import html
import re

CAMPO_DADOS = "capacidades"
CAMPO_DADOS_SOCIO = "capacidades_socioemocionais"
PADRAO_CAMPO_QUESTAO = re.compile(r"^-?\s*\*\*Capacidade:\*\*\s*(.+?)\s*$", re.MULTILINE)
SEPARADOR_CODIGOS = re.compile(r"\s*[,;/]\s*")
TITULO_INICIO = "CAPACIDADES"
ROTULO_CAIXA_QUESTAO = "🎯 CAPACIDADE"
CLASSE = "quadro-capacidades"


def ler_codigos_questao(texto_questao):
    """Lê os códigos da linha "**Capacidade:**" de uma questão.

    Args:
        texto_questao: Texto do bloco da questão no .md.

    Returns:
        Lista de códigos (ex.: ["C1", "C3"]); vazia se a questão não tiver a linha.
    """
    achado = PADRAO_CAMPO_QUESTAO.search(texto_questao)
    if not achado:
        return []
    return [codigo.upper() for codigo in SEPARADOR_CODIGOS.split(achado.group(1)) if codigo]


def validar_codigos(capacidades, codigos, rotulo, socioemocionais=None):
    """Confere se todos os códigos da questão existem no materia.json.

    Args:
        capacidades: Dicionário código → texto oficial.
        codigos: Códigos citados na questão.
        rotulo: Identificação da questão para a mensagem de erro.
        socioemocionais: Dicionário de capacidades socioemocionais (opcional).

    Raises:
        SystemExit: Se algum código não existir.
    """
    todas_capacidades = capacidades.copy()
    if socioemocionais:
        todas_capacidades.update(socioemocionais)
    desconhecidos = [codigo for codigo in codigos if codigo not in todas_capacidades]
    if desconhecidos:
        campos = CAMPO_DADOS
        if socioemocionais:
            campos += f' ou "{CAMPO_DADOS_SOCIO}"'
        raise SystemExit(f"{rotulo}: capacidade {', '.join(desconhecidos)} não existe no "
                         f'campo "{campos}" do materia.json')


def codigos_usados(listas_de_codigos, capacidades, socioemocionais=None):
    """Junta os códigos usados nas questões, na ordem do materia.json.

    Args:
        listas_de_codigos: Lista com os códigos de cada questão.
        capacidades: Dicionário código → texto oficial.
        socioemocionais: Dicionário de capacidades socioemocionais (opcional).

    Returns:
        Códigos usados, sem repetição.
    """
    todas_capacidades = capacidades.copy()
    if socioemocionais:
        todas_capacidades.update(socioemocionais)
    usados = {codigo for codigos in listas_de_codigos for codigo in codigos}
    return [codigo for codigo in todas_capacidades if codigo in usados]


def html_quadro(capacidades, codigos, recuo, socioemocionais=None):
    """Monta o quadro "CAPACIDADES" do início: faixa de título e uma linha "C1 — texto" cada.

    Args:
        capacidades: Dicionário código → texto oficial.
        codigos: Códigos a mostrar.
        recuo: Espaços antes de cada linha do HTML.
        socioemocionais: Dicionário de capacidades socioemocionais (opcional).

    Returns:
        HTML do quadro ('' se não houver códigos).
    """
    if not codigos:
        return ""
    todas_capacidades = capacidades.copy()
    if socioemocionais:
        todas_capacidades.update(socioemocionais)
    linhas = [f'{recuo}<div class="{CLASSE}">',
              f'{recuo}    <div class="{CLASSE}__titulo">{TITULO_INICIO}</div>']
    for codigo in codigos:
        linhas.append(f'{recuo}    <p class="{CLASSE}__linha"><strong>{html.escape(codigo)} —'
                      f'</strong> {html.escape(todas_capacidades[codigo])}</p>')
    linhas.append(f"{recuo}</div>")
    return "\n".join(linhas)


def html_caixa_questao(capacidades, codigos, recuo, socioemocionais=None):
    """Monta a caixa "CAPACIDADE" da questão no mesmo formato da caixa CONTEXTO (content-box).

    Args:
        capacidades: Dicionário código → texto oficial.
        codigos: Códigos da questão.
        recuo: Espaços antes de cada linha do HTML.
        socioemocionais: Dicionário de capacidades socioemocionais (opcional).

    Returns:
        HTML da caixa ('' se a questão não tiver capacidade).
    """
    if not codigos:
        return ""
    todas_capacidades = capacidades.copy()
    if socioemocionais:
        todas_capacidades.update(socioemocionais)
    texto = texto_capacidades(todas_capacidades, codigos)
    return "\n".join([f'{recuo}<div class="content-box">',
                      f'{recuo}    <div class="content-label">{ROTULO_CAIXA_QUESTAO}</div>',
                      f'{recuo}    <div class="content-text">{texto}</div>',
                      f"{recuo}</div>"])


def texto_capacidades(capacidades, codigos):
    """Junta as capacidades em linhas "C1 — texto" separadas por <br> (HTML escapado).

    Args:
        capacidades: Dicionário código → texto oficial.
        codigos: Códigos a mostrar.

    Returns:
        HTML com uma linha por capacidade.
    """
    return "<br>".join(f"{html.escape(codigo)} — {html.escape(capacidades[codigo])}"
                       for codigo in codigos)
