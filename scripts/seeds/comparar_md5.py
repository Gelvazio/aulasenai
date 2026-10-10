"""Compara o md5 do banco com o esperado e diz quais páginas viram CONCLUÍDO.

Uso:
    python3 scripts/seeds/comparar_md5.py <pasta-dos-lotes>/esperado.json <resultado.json>

`resultado.json` = o que o `conferir-md5.sql` devolveu no conector, no formato
`[{"pagina": "...", "h": "..."}, ...]` (basta copiar o JSON da resposta).
Sai com código 1 se alguma página faltar ou não bater (fica APLICADO, com o motivo).
"""
import json
import sys


def comparar(esperado, banco):
    """Lista de (página, situação) — OK, DIFERENTE ou FALTA NO BANCO."""
    return [(p, "OK" if banco.get(p) == h else ("DIFERENTE" if p in banco else "FALTA NO BANCO"))
            for p, h in esperado.items()]


def main():
    """Lê os dois JSON, imprime a situação de cada página e o total."""
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    esperado = json.load(open(sys.argv[1], encoding="utf-8"))
    banco = {l["pagina"]: l["h"] for l in json.load(open(sys.argv[2], encoding="utf-8"))}
    linhas = comparar(esperado, banco)
    for pagina, situacao in linhas:
        print(f"{situacao:15} {pagina}")
    ruins = [l for l in linhas if l[1] != "OK"]
    print(f"{len(linhas) - len(ruins)} de {len(linhas)} batem")
    sys.exit(1 if ruins else 0)


if __name__ == "__main__":
    main()
