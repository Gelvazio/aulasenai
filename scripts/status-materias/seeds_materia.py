#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Status do banco por página de atividade, lido do registro dos seeds.

Fonte: database/SEEDS-APLICADOS.md (status de cada arquivo de seed) e os próprios arquivos
database/*-seed-atividades.sql (endereço das páginas que cada seed cadastra). Só lê arquivos.
"""

import re
from pathlib import Path

RAIZ_PROJETO = Path(__file__).resolve().parent.parent.parent
PASTA_DATABASE = RAIZ_PROJETO / "database"
ARQUIVO_REGISTRO = PASTA_DATABASE / "SEEDS-APLICADOS.md"
PADRAO_SEEDS = "*-seed-atividades.sql"
STATUS_RESOLVIDOS = {"CONCLUÍDO", "SUBSTITUÍDO"}
PADRAO_LINHA_REGISTRO = re.compile(
    r"^\|\s*`(?P<arquivo>[^`]+-seed-atividades\.sql)`\s*\|.*?\*\*(?P<status>[A-ZÇÃÍÚ]+)\*\*"
)
PADRAO_PAGINA = re.compile(r"'(/MATERIAIS/[^']+\.html)'")


def ler_status_dos_seeds():
    """Lê o status de cada arquivo de seed no registro.

    Returns:
        dict[str, str]: nome do arquivo -> status (PENDENTE, APLICADO, CONCLUÍDO, SUBSTITUÍDO).
    """
    if not ARQUIVO_REGISTRO.is_file():
        return {}
    status = {}
    for linha in ARQUIVO_REGISTRO.read_text(encoding="utf-8").splitlines():
        encontrado = PADRAO_LINHA_REGISTRO.match(linha)
        if encontrado:
            status[encontrado.group("arquivo")] = encontrado.group("status")
    return status


def mapear_status_por_pagina():
    """Liga cada página de atividade ao status do seed mais novo que a cadastra.

    Os seeds são lidos em ordem de nome (a data vem no início), então o mais novo vence.
    Seed fora do registro conta como PENDENTE.

    Returns:
        dict[str, str]: caminho da página (MATERIAIS/...html, sem barra inicial) -> status.
    """
    status_dos_seeds = ler_status_dos_seeds()
    por_pagina = {}
    for arquivo in sorted(PASTA_DATABASE.glob(PADRAO_SEEDS)):
        status = status_dos_seeds.get(arquivo.name, "PENDENTE")
        texto = arquivo.read_text(encoding="utf-8", errors="ignore")
        for pagina in set(PADRAO_PAGINA.findall(texto)):
            por_pagina[pagina.lstrip("/")] = status
    return por_pagina


def pagina_resolvida(por_pagina, caminho_pagina):
    """Diz se o seed da página está CONCLUÍDO ou SUBSTITUÍDO.

    Args:
        por_pagina: resultado de mapear_status_por_pagina.
        caminho_pagina: caminho da página a partir da raiz (MATERIAIS/...html).

    Returns:
        bool: True se a página estiver resolvida no banco.
    """
    return por_pagina.get(caminho_pagina) in STATUS_RESOLVIDOS
