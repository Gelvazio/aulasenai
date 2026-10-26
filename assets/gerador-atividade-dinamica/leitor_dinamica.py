"""Lê e valida a fonte ATIVIDADE-DINAMICA-AULA-NN.md (formato em docs/regras/atividade-dinamica.md)."""
import re
from pathlib import Path

CAMPOS_OBRIGATORIOS = ("Aula", "Tema", "Duração", "Estilo", "Materiais", "Aula no banco")
SECOES_OBRIGATORIAS = ("OBJETIVO", "FORMATOS", "ROTEIRO", "FICHA", "CRITÉRIOS DE NOTA")
FORMATOS_OBRIGATORIOS = ("Individual", "Em duplas", "Em grupos", "Turma toda")
MINIMO_MOMENTOS_ROTEIRO = 2
NOTA_MAXIMA = 10.0
TOLERANCIA_PONTOS = 0.001
PADRAO_META = re.compile(r"^- \*\*(.+?):\*\*\s*(.+)$", re.MULTILINE)
PADRAO_CONTEXTO = re.compile(r"^\*\*Contexto do curso:\*\*\s*(.+)$", re.MULTILINE)
PADRAO_SECAO = re.compile(r"^## (.+?)\s*$", re.MULTILINE)
PADRAO_FORMATO = re.compile(r"^- \*\*(.+?):\*\*\s*(.+)$")
PADRAO_MOMENTO = re.compile(r"^- (\d+) min · (.+?): (.+)$")
PADRAO_CRITERIO = re.compile(r"^- (.+?) \((\d+(?:,\d+)?)\)\s*$")
PADRAO_ITEM = re.compile(r"^- (.+)$")


def separar_secoes(texto):
    """Separa o texto nas seções "## NOME".

    Args:
        texto: Conteúdo completo do .md.

    Returns:
        Tupla (cabeçalho antes da 1ª seção, dicionário nome → corpo).
    """
    partes = PADRAO_SECAO.split(texto)
    secoes = {partes[i].strip(): partes[i + 1].strip() for i in range(1, len(partes) - 1, 2)}
    return partes[0], secoes


def linhas_da_secao(corpo, padrao):
    """Aplica o padrão a cada linha da seção e devolve os grupos das linhas que casam.

    Args:
        corpo: Texto da seção.
        padrao: Expressão regular compilada de uma linha.

    Returns:
        Lista de tuplas com os grupos de cada linha que casou.
    """
    casamentos = (padrao.match(linha.strip()) for linha in corpo.splitlines())
    return [casamento.groups() for casamento in casamentos if casamento]


def pontos_para_numero(texto):
    """Converte "2,5" em 2.5.

    Args:
        texto: Pontos com vírgula ou ponto.

    Returns:
        Número decimal.
    """
    return float(texto.replace(",", "."))


def validar_fonte(meta, secoes, dados):
    """Valida campos, seções, formatos, roteiro, ficha e a soma dos critérios.

    Args:
        meta: Metadados do cabeçalho.
        secoes: Seções lidas.
        dados: Dados já interpretados (formatos, roteiro, ficha, critérios).

    Raises:
        ValueError: Se algo obrigatório faltar ou os critérios não somarem 10.
    """
    faltam_campos = [campo for campo in CAMPOS_OBRIGATORIOS if not meta.get(campo)]
    if faltam_campos:
        raise ValueError(f"Campos faltando no cabeçalho: {', '.join(faltam_campos)}")
    faltam_secoes = [nome for nome in SECOES_OBRIGATORIAS if nome not in secoes]
    if faltam_secoes:
        raise ValueError(f"Seções faltando: {', '.join(faltam_secoes)}")
    nomes_formatos = [nome for nome, _ in dados["formatos"]]
    if nomes_formatos != list(FORMATOS_OBRIGATORIOS):
        raise ValueError(f"Os 4 formatos em ordem são obrigatórios: {FORMATOS_OBRIGATORIOS}")
    if len(dados["roteiro"]) < MINIMO_MOMENTOS_ROTEIRO:
        raise ValueError("O roteiro precisa de ao menos 2 momentos")
    if not dados["ficha"]:
        raise ValueError("A ficha precisa de ao menos 1 campo")
    soma = sum(pontos for _, pontos in dados["criterios"])
    if abs(soma - NOTA_MAXIMA) > TOLERANCIA_PONTOS:
        raise ValueError(f"Os critérios somam {soma:g}; devem somar {NOTA_MAXIMA:g}")


def ler_fonte(caminho):
    """Lê a fonte da dinâmica e devolve os dados validados.

    Args:
        caminho: Caminho do .md da dinâmica.

    Returns:
        Dicionário com meta, contexto, objetivo, formatos, roteiro, ficha e critérios.

    Raises:
        ValueError: Se a fonte for inválida.
    """
    texto = Path(caminho).read_text(encoding="utf-8")
    cabecalho, secoes = separar_secoes(texto)
    meta = {chave.strip(): valor.strip() for chave, valor in PADRAO_META.findall(cabecalho)}
    contexto = PADRAO_CONTEXTO.search(cabecalho)
    dados = {
        "meta": meta, "contexto": contexto.group(1).strip() if contexto else "",
        "objetivo": secoes.get("OBJETIVO", ""),
        "formatos": linhas_da_secao(secoes.get("FORMATOS", ""), PADRAO_FORMATO),
        "roteiro": [(int(m), nome, texto_m) for m, nome, texto_m
                    in linhas_da_secao(secoes.get("ROTEIRO", ""), PADRAO_MOMENTO)],
        "ficha": [grupo[0] for grupo in linhas_da_secao(secoes.get("FICHA", ""), PADRAO_ITEM)],
        "criterios": [(nome, pontos_para_numero(pontos)) for nome, pontos
                      in linhas_da_secao(secoes.get("CRITÉRIOS DE NOTA", ""), PADRAO_CRITERIO)],
    }
    validar_fonte(meta, secoes, dados)
    return dados
