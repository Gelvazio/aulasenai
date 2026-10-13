"""Lê as regras de `.claude/rules/` e as divide em seções para o visualizador.

As categorias vêm do `INDEX.md` (cada `## <grupo>` com a tabela de arquivos), então um arquivo
novo listado no índice aparece no visualizador sem mudar este código.
"""
import re
from pathlib import Path

ARQUIVO_INDICE = "INDEX.md"
CATEGORIA_SEM_INDICE = "Outros"
CATEGORIA_DO_INDICE = "📖 Índice das regras"
ORDEM_DO_INDICE = -1
TITULO_INTRODUCAO = "Visão geral"
TAMANHO_MINIMO_INTRODUCAO = 40

TIPOS_DE_REGRA = [
    ("Proibição", re.compile(r"⛔|❌|\bnunca\b|proibid", re.IGNORECASE)),
    ("Fluxo", re.compile(r"\bfluxo\b|\bciclo\b|\bpasso\b|checklist", re.IGNORECASE)),
    ("Referência", re.compile(r"\bmodelo\b|\bexemplo|\bonde\b|índice|tabela", re.IGNORECASE)),
]
TIPO_PADRAO = "Obrigatória"

PADRAO_GRUPO = re.compile(r"^##\s+(.+)$")
PADRAO_ARQUIVO_TABELA = re.compile(r"^\|\s*`([\w.-]+\.md)`\s*\|\s*(.+?)\s*\|")
PADRAO_TITULO_ARQUIVO = re.compile(r"^#\s+(.+)$", re.MULTILINE)


def ler_categorias(pasta_regras: Path) -> dict:
    """Mapeia cada arquivo de regra para a categoria e o assunto descritos no `INDEX.md`.

    Args:
        pasta_regras: Pasta `.claude/rules/`.

    Returns:
        Dicionário `{nome_arquivo: {"categoria": str, "assunto": str, "ordem": int}}`.
    """
    caminho_indice = pasta_regras / ARQUIVO_INDICE
    if not caminho_indice.exists():
        return {}

    categorias = {}
    grupo_atual = CATEGORIA_SEM_INDICE
    for linha in caminho_indice.read_text(encoding="utf-8").splitlines():
        achou_grupo = PADRAO_GRUPO.match(linha)
        if achou_grupo:
            grupo_atual = achou_grupo.group(1).strip()
            continue
        achou_arquivo = PADRAO_ARQUIVO_TABELA.match(linha)
        if achou_arquivo:
            categorias[achou_arquivo.group(1)] = {
                "categoria": grupo_atual,
                "assunto": achou_arquivo.group(2),
                "ordem": len(categorias),
            }
    return categorias


def dividir_em_secoes(texto: str) -> list:
    """Divide um Markdown pelos títulos `##`, ignorando os que estão dentro de blocos de código.

    Args:
        texto: Conteúdo do arquivo Markdown.

    Returns:
        Lista de `{"titulo": str, "texto": str}`; o trecho antes do primeiro `##` vira
        "Visão geral" quando tem conteúdo útil.
    """
    secoes = [{"titulo": TITULO_INTRODUCAO, "linhas": []}]
    dentro_de_codigo = False
    for linha in texto.splitlines():
        if linha.strip().startswith("```"):
            dentro_de_codigo = not dentro_de_codigo
        e_titulo_de_secao = not dentro_de_codigo and linha.startswith("## ")
        if e_titulo_de_secao:
            secoes.append({"titulo": linha[3:].strip(), "linhas": []})
            continue
        secoes[-1]["linhas"].append(linha)

    resultado = []
    for secao in secoes:
        corpo = limpar_corpo("\n".join(secao["linhas"]))
        if secao["titulo"] == TITULO_INTRODUCAO and len(corpo) < TAMANHO_MINIMO_INTRODUCAO:
            continue
        resultado.append({"titulo": secao["titulo"], "texto": corpo})
    return resultado


def limpar_corpo(corpo: str) -> str:
    """Tira o título `#` do arquivo e as linhas `---` soltas das pontas do texto.

    Args:
        corpo: Texto bruto da seção.

    Returns:
        Texto sem o título de nível 1 e sem separadores nas pontas.
    """
    corpo = PADRAO_TITULO_ARQUIVO.sub("", corpo, count=1).strip()
    corpo = re.sub(r"^(---\s*)+", "", corpo).strip()
    return re.sub(r"(\s*---)+$", "", corpo).strip()


def classificar_tipo(titulo: str, texto: str) -> str:
    """Escolhe o tipo da regra pelo título (e, se preciso, pelo texto).

    Args:
        titulo: Título da seção.
        texto: Corpo da seção.

    Returns:
        "Proibição", "Fluxo", "Referência" ou "Obrigatória".
    """
    for tipo, padrao in TIPOS_DE_REGRA:
        if padrao.search(titulo):
            return tipo
    for tipo, padrao in TIPOS_DE_REGRA[:1]:
        if len(padrao.findall(texto)) >= 3:
            return tipo
    return TIPO_PADRAO


def obter_categoria(nome_arquivo: str, categorias: dict) -> dict:
    """Devolve categoria, assunto e ordem de um arquivo (o próprio índice fica em primeiro).

    Args:
        nome_arquivo: Nome do arquivo de regra.
        categorias: Mapa lido do `INDEX.md`.

    Returns:
        `{"categoria": str, "assunto": str, "ordem": int}`.
    """
    if nome_arquivo == ARQUIVO_INDICE:
        return {"categoria": CATEGORIA_DO_INDICE, "assunto": "Onde está cada regra",
                "ordem": ORDEM_DO_INDICE}
    sem_indice = {"categoria": CATEGORIA_SEM_INDICE, "assunto": "", "ordem": len(categorias) + 1}
    return categorias.get(nome_arquivo, sem_indice)


def ler_regras(pasta_regras: Path) -> list:
    """Monta a lista de seções de todos os arquivos `.md` da pasta de regras.

    Args:
        pasta_regras: Pasta `.claude/rules/`.

    Returns:
        Lista de seções com arquivo, título do arquivo, categoria, assunto, tipo e texto.
    """
    categorias = ler_categorias(pasta_regras)
    secoes = []
    for caminho in sorted(pasta_regras.glob("*.md")):
        info = obter_categoria(caminho.name, categorias)
        texto = caminho.read_text(encoding="utf-8")
        achou_titulo = PADRAO_TITULO_ARQUIVO.search(texto)
        titulo_arquivo = achou_titulo.group(1).strip() if achou_titulo else caminho.stem
        for secao in dividir_em_secoes(texto):
            secoes.append({
                "arquivo": caminho.name,
                "tituloArquivo": titulo_arquivo,
                "categoria": info["categoria"],
                "assunto": info["assunto"],
                "ordem": info["ordem"],
                "titulo": secao["titulo"],
                "tipo": classificar_tipo(secao["titulo"], secao["texto"]),
                "texto": secao["texto"],
            })
    return sorted(secoes, key=lambda secao: secao["ordem"])
