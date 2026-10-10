"""Grava o status de seeds no `database/SEEDS-APLICADOS.md` e recalcula o resumo.

Uso (rodar na raiz do repositório):
    python3 scripts/seeds/registrar_seed.py <arquivo.sql> <PENDENTE|APLICADO|CONCLUÍDO|SUBSTITUÍDO> "<observação>" [...]

Aceita vários trios (arquivo, status, observação) de uma vez. A data e hora da conferência é a do
relógio, no horário de Brasília. Regra: seção "🌱 REGRA — SEEDS DO BANCO" do `CLAUDE.md`.
"""
import re
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

REGISTRO = "database/SEEDS-APLICADOS.md"
STATUS_VALIDOS = ("PENDENTE", "APLICADO", "CONCLUÍDO", "SUBSTITUÍDO")


def atualizar_linha(linhas, arquivo, status, observacao, agora):
    """Troca status, data e observação da linha do arquivo; erro se o arquivo não estiver no registro."""
    for i, linha in enumerate(linhas):
        if linha.startswith(f"| `{arquivo}` |"):
            colunas = linha.split(" | ")
            colunas[3], colunas[4], colunas[5] = f"**{status}**", agora, observacao + " |"
            linhas[i] = " | ".join(colunas)
            return
    sys.exit(f"{arquivo} não está no registro (seed novo entra como PENDENTE no commit em que é gerado)")


def recalcular_resumo(texto, agora):
    """Conta os status das linhas e reescreve a tabela de resumo e a data dela."""
    contagem = {s: 0 for s in STATUS_VALIDOS}
    for status in re.findall(r"^\| `[^`]*-seed-atividades\.sql` \|.*?\| \*\*(\w+)\*\* \|", texto, re.M):
        contagem[status] += 1
    texto = re.sub(r"## Resumo \(atualizado em [^)]*\)", f"## Resumo (atualizado em {agora})", texto)
    nova = " | ".join(str(contagem[s]) for s in STATUS_VALIDOS)
    nova = f"| {nova} | {sum(contagem.values())} |"
    return re.sub(r"^\| \d+ \| \d+ \| \d+ \|(?: \d+ \|)? \d+ \|$", nova, texto, count=1, flags=re.M), contagem


def main():
    """Aplica os trios recebidos e grava o registro."""
    args = sys.argv[1:]
    if not args or len(args) % 3:
        sys.exit(__doc__)
    agora = datetime.now(ZoneInfo("America/Sao_Paulo")).strftime("%Y-%m-%d %H:%M")
    linhas = open(REGISTRO, encoding="utf-8").read().split("\n")
    for i in range(0, len(args), 3):
        arquivo, status, observacao = args[i:i + 3]
        if status not in STATUS_VALIDOS:
            sys.exit(f"status inválido: {status}")
        atualizar_linha(linhas, arquivo, status, observacao, agora)
    texto, contagem = recalcular_resumo("\n".join(linhas), agora)
    open(REGISTRO, "w", encoding="utf-8").write(texto)
    print(contagem)


if __name__ == "__main__":
    main()
