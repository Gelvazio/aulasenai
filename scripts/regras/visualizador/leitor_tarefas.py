"""Lê o quadro de tarefas (`tasks/STATUS.md`, `tasks/TASKS.md`, `tasks/etapas/`) para o visualizador.

O status oficial de cada tarefa vem da tabela "📌 Tarefas" do `STATUS.md`; o `TASKS.md` dá a
descrição longa e as etapas citadas no status dão os itens.
"""
import re
from pathlib import Path

MARCA_TAREFAS = "📌 Tarefas"
MARCA_FRENTES = "🧭 Frentes"
MARCA_AGUARDANDO = "⏳ Aguardando"

SITUACOES = [
    ("Concluída", "✅"),
    ("Em andamento", "🔄"),
    ("Aguardando", "👀"),
    ("Cancelada/Bloqueada", "⛔"),
    ("Pendente", "⬜"),
]
SITUACAO_PADRAO = "Pendente"

PADRAO_ETAPA = re.compile(r"Etapas?\s+(\d{1,3})(?:-([0-9a-f]{8}))?")
PADRAO_BLOCO_TAREFA = re.compile(r"^###\s+(#[\w-]+):", re.MULTILINE)


def ler_secao(texto: str, marca: str) -> str:
    """Devolve o conteúdo da seção `##` cujo título contém a marca.

    Args:
        texto: Conteúdo do `STATUS.md`.
        marca: Trecho do título procurado (ex.: "📌 Tarefas").

    Returns:
        Texto da seção (sem o título) ou "" se ela não existir.
    """
    partes = re.split(r"^## ", texto, flags=re.MULTILINE)
    for parte in partes:
        titulo = parte.split("\n", 1)[0]
        if marca in titulo:
            return parte.split("\n", 1)[1] if "\n" in parte else ""
    return ""


def ler_tabela(secao: str) -> list:
    """Converte a primeira tabela Markdown da seção em lista de dicionários.

    Args:
        secao: Texto que contém a tabela.

    Returns:
        Uma linha por dicionário, com as chaves do cabeçalho.
    """
    linhas = [linha for linha in secao.splitlines() if linha.startswith("|")]
    if len(linhas) < 2:
        return []

    cabecalho = dividir_celulas(linhas[0])
    registros = []
    for linha in linhas[2:]:
        celulas = dividir_celulas(linha)
        celulas += [""] * (len(cabecalho) - len(celulas))
        registros.append(dict(zip(cabecalho, celulas)))
    return registros


def dividir_celulas(linha: str) -> list:
    """Separa as células de uma linha de tabela Markdown, respeitando `\\|` e crases.

    Args:
        linha: Linha começando e terminando com `|`.

    Returns:
        Lista com o texto de cada célula.
    """
    celulas, atual, dentro_de_crase = [], "", False
    for caractere in linha.strip().strip("|"):
        if caractere == "`":
            dentro_de_crase = not dentro_de_crase
        if caractere == "|" and not dentro_de_crase and not atual.endswith("\\"):
            celulas.append(atual.strip())
            atual = ""
            continue
        atual += caractere
    celulas.append(atual.strip())
    return celulas


def classificar_situacao(status: str) -> str:
    """Traduz o texto do status no grupo usado pelo filtro da página.

    Args:
        status: Texto da coluna Status.

    Returns:
        Nome do grupo (ex.: "Em andamento").
    """
    for situacao, emoji in SITUACOES:
        if emoji in status:
            return situacao
    return SITUACAO_PADRAO


def ler_blocos_tasks(caminho_tasks: Path) -> dict:
    """Separa o `TASKS.md` em blocos `### #NN...: título`.

    Args:
        caminho_tasks: Caminho do `TASKS.md`.

    Returns:
        Dicionário `{codigo_da_tarefa: texto_do_bloco}`.
    """
    if not caminho_tasks.exists():
        return {}

    texto = caminho_tasks.read_text(encoding="utf-8")
    marcas = list(PADRAO_BLOCO_TAREFA.finditer(texto))
    blocos = {}
    for posicao, marca in enumerate(marcas):
        fim = marcas[posicao + 1].start() if posicao + 1 < len(marcas) else len(texto)
        bloco = texto[marca.start():fim].strip()
        blocos[marca.group(1)] = re.sub(r"\n---\s*(\n\*\*Última.*)?$", "", bloco, flags=re.S)
    return blocos


def ler_etapas_citadas(texto: str, pasta_etapas: Path) -> list:
    """Acha os arquivos das etapas citadas ("Etapa 146-042b2fe8", "Etapa 125") num texto.

    Args:
        texto: Status e próximo passo da tarefa.
        pasta_etapas: Pasta `tasks/etapas/`.

    Returns:
        Lista de `{"arquivo": str, "texto": str}` sem repetição.
    """
    etapas, vistos = [], set()
    for numero, sufixo in PADRAO_ETAPA.findall(texto):
        prefixo = f"ETAPA-{int(numero):03d}-" + (f"{sufixo}-" if sufixo else "")
        for caminho in sorted(pasta_etapas.glob(prefixo + "*.md"))[:1]:
            if caminho.name in vistos:
                continue
            vistos.add(caminho.name)
            etapas.append({"arquivo": caminho.name,
                           "texto": caminho.read_text(encoding="utf-8").strip()})
    return etapas


def ler_tarefas(pasta_tasks: Path) -> dict:
    """Monta tarefas, frentes e pendências do usuário a partir do quadro.

    Args:
        pasta_tasks: Pasta `tasks/` do projeto.

    Returns:
        `{"tarefas": [...], "frentes": [...], "aguardando": [...]}`.
    """
    caminho_status = pasta_tasks / "STATUS.md"
    if not caminho_status.exists():
        return {"tarefas": [], "frentes": [], "aguardando": []}

    texto = caminho_status.read_text(encoding="utf-8")
    blocos = ler_blocos_tasks(pasta_tasks / "TASKS.md")
    tarefas = []
    for linha in ler_tabela(ler_secao(texto, MARCA_TAREFAS)):
        codigo = linha.get("Tarefa", "")
        status = linha.get("Status", "")
        proximo = linha.get("Próximo passo", "")
        tarefas.append({
            **linha,
            "situacao": classificar_situacao(status),
            "bloco": blocos.get(codigo, ""),
            "etapas": ler_etapas_citadas(f"{status} {proximo}", pasta_tasks / "etapas"),
        })
    return {
        "tarefas": tarefas,
        "frentes": ler_tabela(ler_secao(texto, MARCA_FRENTES)),
        "aguardando": ler_tabela(ler_secao(texto, MARCA_AGUARDANDO)),
    }
