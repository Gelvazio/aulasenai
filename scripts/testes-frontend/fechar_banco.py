"""Grava o status de banco de uma aula de Testes de Front-End depois do md5 conferido.

Uso: python3 scripts/testes-frontend/fechar_banco.py NN AULA_ID OBJ_ID PRA_ID
Marca CONCLUÍDO os dois seeds da aula no registro, a coluna Banco do STATUS-AULAS.md e do
STATUS-ATIVIDADES.md, o item 137.x da etapa e o próximo passo da frente no STATUS.md.
"""
import glob
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

nn, aula_id, obj, pra = sys.argv[1:5]
n = int(nn)
agora = datetime.now(ZoneInfo("America/Sao_Paulo")).strftime("%Y-%m-%d %H:%M")
M = Path("MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND")
seed_obj = Path(glob.glob(f"database/*-testes-frontend-objetiva-aula-{nn}-seed-atividades.sql")[0]).name
seed_pra = Path(glob.glob(f"database/*-testes-frontend-atividade-pratica-aula-{nn}-seed-atividades.sql")[0]).name
subprocess.run(["python3", "scripts/seeds/registrar_seed.py",
                seed_obj, "CONCLUÍDO", f"Atividade id {obj} (aula id {aula_id}), 50 itens; md5 conferido — Etapa 137-13665a7e",
                seed_pra, "CONCLUÍDO", f"Atividade id {pra} (aula id {aula_id}, bloqueada), 30 tópicos, 10 pontos; md5 conferido — Etapa 137-13665a7e"],
               check=True)


def trocar(caminho, antigo, novo):
    """Troca a primeira ocorrência (que precisa existir)."""
    p = Path(caminho)
    t = p.read_text(encoding="utf-8")
    assert antigo in t, (caminho, antigo)
    p.write_text(t.replace(antigo, novo, 1), encoding="utf-8")


trocar(M / "AULAS/STATUS-AULAS.md", f"`ATIVIDADE-PRATICA-AULA-{nn}.html` | ⬜ seeds gerados, não aplicados |",
       f"`ATIVIDADE-PRATICA-AULA-{nn}.html` | ✅ ids {obj} e {pra} (md5 conferido em {agora}) |")
SA = M / "ATIVIDADES/STATUS-ATIVIDADES.md"
trocar(SA, "| ✅ | ⬜ seed gerado, não aplicado | 🔄 falta banco |", f"| ✅ | ✅ id {obj} | ✅ Concluída |")
trocar(SA, f"`-GABARITO.md`, regra `docs/REGRAS-ATIVIDADE-PRATICA.md`) | ⬜ seed gerado, não aplicado |",
       f"`-GABARITO.md`, regra `docs/REGRAS-ATIVIDADE-PRATICA.md`) | ✅ id {pra} (bloqueada; o professor libera no índice) |")
t = SA.read_text(encoding="utf-8")
feitas = len(re.findall(r"^\| \d\d \|.*✅ Concluída \|$", t, re.M))
t = re.sub(r"\*\*✅ Concluídas:\*\* \d+ \([^)]*\) · \*\*Pendentes/incompletas:\*\* \d+",
           f"**✅ Concluídas:** {feitas} (aulas 01 a 03 na Etapa 108; 04 em diante na Etapa 137-13665a7e) · **Pendentes/incompletas:** {10 - feitas}", t)
SA.write_text(t, encoding="utf-8")
E = glob.glob("tasks/etapas/ETAPA-137-13665a7e-*.md")[0]
item = n - 3
trocar(E, f"| 137.{item} | Aula {nn} — ", f"| 137.{item} | Aula {nn} — ")
t = Path(E).read_text(encoding="utf-8")
t = re.sub(rf"(\| 137\.{item} \| Aula {nn} — [^|]*\| )⬜ Pendente \| — \| [^|]*\|",
           rf"\g<1>✅ Concluído | {agora} | Objetiva id {obj} e prática id {pra} (aula id {aula_id}); md5 do banco = arquivo; 50 itens e 30 tópicos (10 pontos) |", t)
Path(E).write_text(t, encoding="utf-8")
prox = f"{n + 1:02d}"
S = Path("tasks/STATUS.md")
t = S.read_text(encoding="utf-8")
t = re.sub(r"Item 137\.\d+ — aula \d\d de Testes de Front-End \(objetiva \+ prática \+ seeds\)",
           f"Item 137.{item + 1} — aula {prox} de Testes de Front-End (objetiva + prática + seeds); aulas 04 a {nn} ✅", t)
t = re.sub(r"(\| nuvem · claude/ola-zlzh8z \|[^\n]*\| 🔄 Ativa \| )[0-9-]+ [0-9:]+ \|", rf"\g<1>{agora} |", t)
t = re.sub(r"Item 137\.\d+ — aula \d\d \|", f"Item 137.{item + 1} — aula {prox} |", t)
S.write_text(t, encoding="utf-8")
print("ok", nn, agora)
