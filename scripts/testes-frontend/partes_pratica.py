"""Divide o lote da prática (01-pra.sql de dividir_seed.py) em 2 partes menores para o conector.

Parte 1: cria a atividade e grava os tópicos das questões 1 a 5; parte 2: só os tópicos 6 a 10,
procurando a atividade pela página. Uso: python3 partes_pratica.py <pasta-do-lote>
"""
import re
import sys
from pathlib import Path

pasta = Path(sys.argv[1])
sql = (pasta / "01-pra.sql").read_text(encoding="utf-8")
ini = sql.index("(values\n") + len("(values\n")
fim = sql.index(") v(item")
linhas = sql[ini:fim].split("\n")
corte = next(i for i, l in enumerate(linhas) if l.startswith("(6, 1,"))
p1 = [l.rstrip(",") if i == corte - 1 else l for i, l in enumerate(linhas[:corte])]
cauda = sql[fim:]
(pasta / "parte1.sql").write_text(sql[:ini] + "\n".join(p1) + cauda, encoding="utf-8")
pagina = re.search(r"'(/MATERIAIS/[^']+\.html)'", sql).group(1)
cab = (f"with at as (select id, aula_id from public.atividade where pagina = '{pagina}'),\n"
       + sql[sql.index("g as (insert into public.topico_discursivo"):ini])
(pasta / "parte2.sql").write_text(cab + "\n".join(linhas[corte:]) + cauda, encoding="utf-8")
print("partes:", corte, len(linhas) - corte)
