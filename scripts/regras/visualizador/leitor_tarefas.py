"""Lê o quadro de tarefas (`tasks/STATUS.md`, `tasks/task_complete.md` e `tasks/etapas/`).

Fonte única (`.claude/rules/tasks/quadro.md`): o `STATUS.md` é o índice (frentes e "📌 Tarefas",
com o link da etapa de cada tarefa); pedido, itens e próximo passo vêm só da etapa. "Aguardando o
usuário" não é copiado à mão: são os itens 👀 das etapas.
"""
import re
from pathlib import Path

MARCA_TAREFAS = "📌 Tarefas"
MARCA_FRENTES = "🧭 Frentes"
COLUNA_ETAPA = "Etapa"
COLUNA_ETAPA_FRENTE = "Tarefa (etapa)"
EMOJI_AGUARDANDO = "👀"

SITUACOES = [
    ("Concluída", "✅"),
    ("Em andamento", "🔄"),
    ("Aguardando", "👀"),
    ("Cancelada/Bloqueada", "⛔"),
    ("Pendente", "⬜"),
]
SITUACAO_PADRAO = "Pendente"

PADRAO_LINK_ETAPA = re.compile(r"\]\(etapas/([^)]+\.md)\)")
PADRAO_PROXIMO = re.compile(r"^\*\*Próximo passo:\*\*\s*(.+)$", re.MULTILINE)
PADRAO_NUMERO_ETAPA = re.compile(r"^ETAPA-0*(\d+(?:-[0-9a-f]{8})?)-")
PADRAO_CODIGO_ITEM = re.compile(r"^\d{1,3}\.\d+[a-z]?$")


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


def ler_etapas_do_link(celula: str, pasta_etapas: Path) -> list:
    """Lê as etapas apontadas pelos links `[...](etapas/ARQUIVO.md)` de uma célula.

    Args:
        celula: Texto da coluna Etapa (ou "Tarefa (etapa)" das frentes).
        pasta_etapas: Pasta `tasks/etapas/`.

    Returns:
        Lista de `{"arquivo", "texto", "proximo"}`, sem arquivos inexistentes.
    """
    etapas = []
    for nome in PADRAO_LINK_ETAPA.findall(celula):
        caminho = pasta_etapas / nome
        if not caminho.exists():
            continue
        texto = caminho.read_text(encoding="utf-8").strip()
        achou_proximo = PADRAO_PROXIMO.search(texto)
        etapas.append({"arquivo": nome, "texto": texto,
                       "proximo": achou_proximo.group(1).strip() if achou_proximo else ""})
    return etapas


def ler_itens_aguardando(caminho: Path) -> list:
    """Lista os itens 👀 (aguardando o usuário) de uma etapa.

    Args:
        caminho: Arquivo da etapa.

    Returns:
        Lista de `{"Etapa", "Item", "O que falta"}`.
    """
    numero = PADRAO_NUMERO_ETAPA.match(caminho.name)
    rotulo = numero.group(1) if numero else caminho.stem
    itens = []
    for linha in caminho.read_text(encoding="utf-8").splitlines():
        if not linha.startswith("| "):
            continue
        celulas = dividir_celulas(linha)
        e_item_aguardando = (len(celulas) >= 3 and PADRAO_CODIGO_ITEM.match(celulas[0])
                             and EMOJI_AGUARDANDO in celulas[2])
        if e_item_aguardando:
            itens.append({"Etapa": rotulo, "Item": celulas[0], "O que falta": celulas[1]})
    return itens


def ler_aguardando(pasta_etapas: Path) -> list:
    """Junta os itens 👀 de todas as etapas, da etapa mais recente para a mais antiga.

    Args:
        pasta_etapas: Pasta `tasks/etapas/`.

    Returns:
        Lista de `{"Etapa", "Item", "O que falta"}`.
    """
    itens = []
    for caminho in sorted(pasta_etapas.glob("ETAPA-*.md")):
        itens.extend(ler_itens_aguardando(caminho))

    def numero_da_etapa(item: dict) -> int:
        return int(re.match(r"\d+", item["Etapa"]).group(0))

    return sorted(itens, key=numero_da_etapa, reverse=True)


def ler_concluidas(caminho: Path) -> list:
    """Lê as linhas ✅ movidas para o `task_complete.md` (regra global C4).

    Args:
        caminho: Caminho do `tasks/task_complete.md`.

    Returns:
        Linhas da tabela do arquivo (a única), ou lista vazia se o arquivo não existir.
    """
    if not caminho.exists():
        return []
    texto = caminho.read_text(encoding="utf-8")
    return ler_tabela(texto)


def ler_tarefas(pasta_tasks: Path) -> dict:
    """Monta tarefas, frentes e pendências do usuário a partir do quadro.

    Args:
        pasta_tasks: Pasta `tasks/` do projeto.

    Returns:
        `{"tarefas": [...], "frentes": [...], "aguardando": [...]}`.
    """
    caminho_status = pasta_tasks / "STATUS.md"
    pasta_etapas = pasta_tasks / "etapas"
    if not caminho_status.exists():
        return {"tarefas": [], "frentes": [], "aguardando": []}

    texto = caminho_status.read_text(encoding="utf-8")
    linhas_quadro = ler_tabela(ler_secao(texto, MARCA_TAREFAS))
    linhas_quadro += ler_concluidas(pasta_tasks / "task_complete.md")
    tarefas = []
    for linha in linhas_quadro:
        etapas = ler_etapas_do_link(linha.get(COLUNA_ETAPA, ""), pasta_etapas)
        tarefas.append({
            **linha,
            "situacao": classificar_situacao(linha.get("Status", "")),
            "etapas": etapas,
            "proximo": etapas[0]["proximo"] if etapas else "",
        })
    frentes = []
    for linha in ler_tabela(ler_secao(texto, MARCA_FRENTES)):
        etapas = ler_etapas_do_link(linha.get(COLUNA_ETAPA_FRENTE, ""), pasta_etapas)
        frentes.append({**linha, "proximo": etapas[0]["proximo"] if etapas else ""})
    return {"tarefas": tarefas, "frentes": frentes, "aguardando": ler_aguardando(pasta_etapas)}
