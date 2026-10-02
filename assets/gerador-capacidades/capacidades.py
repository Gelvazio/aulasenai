"""Capacidades da ementa nas avaliações: quadro no início e quadro em cada questão.

Usado por assets/gerador-atividades e assets/gerador-avaliacao-discursiva.
Dados: campo "capacidades" do atividades.json da matéria ({"C1": "texto oficial", ...}).
Questão: linha "- **Capacidade:** C1" ou "- **Capacidade:** C1, C3" no .md.
Plano: docs/capacidade-por-questao-avaliacoes.md
"""
import html
import re

CAMPO_DADOS = "capacidades"
PADRAO_CAMPO_QUESTAO = re.compile(r"^-?\s*\*\*Capacidade:\*\*\s*(.+?)\s*$", re.MULTILINE)
SEPARADOR_CODIGOS = re.compile(r"\s*[,;/]\s*")
TITULO_INICIO = "CAPACIDADES"
TITULO_QUESTAO = "CAPACIDADE"
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


def validar_codigos(capacidades, codigos, rotulo):
    """Confere se todos os códigos da questão existem no atividades.json.

    Args:
        capacidades: Dicionário código → texto oficial.
        codigos: Códigos citados na questão.
        rotulo: Identificação da questão para a mensagem de erro.

    Raises:
        SystemExit: Se algum código não existir.
    """
    desconhecidos = [codigo for codigo in codigos if codigo not in capacidades]
    if desconhecidos:
        raise SystemExit(f"{rotulo}: capacidade {', '.join(desconhecidos)} não existe no "
                         f'campo "{CAMPO_DADOS}" do atividades.json')


def codigos_usados(listas_de_codigos, capacidades):
    """Junta os códigos usados nas questões, na ordem do atividades.json.

    Args:
        listas_de_codigos: Lista com os códigos de cada questão.
        capacidades: Dicionário código → texto oficial.

    Returns:
        Códigos usados, sem repetição.
    """
    usados = {codigo for codigos in listas_de_codigos for codigo in codigos}
    return [codigo for codigo in capacidades if codigo in usados]


def html_quadro(capacidades, codigos, recuo):
    """Monta o quadro com faixa de título e uma linha "C1 — texto" por capacidade.

    Args:
        capacidades: Dicionário código → texto oficial.
        codigos: Códigos a mostrar (o título fica no plural quando houver mais de um).
        recuo: Espaços antes de cada linha do HTML.

    Returns:
        HTML do quadro ('' se não houver códigos).
    """
    if not codigos:
        return ""
    titulo = TITULO_INICIO if len(codigos) > 1 else TITULO_QUESTAO
    linhas = [f'{recuo}<div class="{CLASSE}">',
              f'{recuo}    <div class="{CLASSE}__titulo">{titulo}</div>']
    for codigo in codigos:
        linhas.append(f'{recuo}    <p class="{CLASSE}__linha"><strong>{html.escape(codigo)} —'
                      f'</strong> {html.escape(capacidades[codigo])}</p>')
    linhas.append(f"{recuo}</div>")
    return "\n".join(linhas)
