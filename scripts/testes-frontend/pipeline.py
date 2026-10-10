"""Fecha uma aula de Testes de Front-End: gera objetiva, prática, seeds, índice e status.

Uso: python3 scripts/testes-frontend/pipeline.py NN
Precisa de CONTEUDO/AULA-NN-*.md, da fonte da prática (ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md)
e, na pasta $RASCUNHO, de qNN.txt (questões, formato de montar_questoes.py) e gNN.md (padrão de resposta).
Adaptado de scripts/banco-de-dados/pipeline.py (tarefa #22, Etapa 137-13665a7e).
"""
import datetime
import json
import os
import re
import subprocess
import sys
from pathlib import Path

SP = Path(os.environ.get("RASCUNHO", "/tmp/rascunho-testes-frontend"))
AQUI = Path(__file__).resolve().parent
RAIZ = Path("/home/user/aulasenai")
M = RAIZ / "MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND"
A = M / "ATIVIDADES"
NOME_BANCO = "TESTES DE FRONTEND"  # descrição da matéria na tabela materia
nn = sys.argv[1]
n = int(nn)
d = json.loads((M / "materia.json").read_text(encoding="utf-8"))
aula = d["aulas"][n - 1]
dia, mes = aula["data_prevista"].split("/")
data_aula = f"2026-{mes}-{dia}"
arq_aula = next((M / "CONTEUDO").glob(f"AULA-{nn}-*.md")).name
tema = re.sub(r"^# Aula \d+ — ", "", (M / "CONTEUDO" / arq_aula).read_text(encoding="utf-8").splitlines()[0])
hoje = f"{datetime.date.today():%Y-%m-%d}"


def run(*cmd):
    """Roda um comando na raiz e para tudo se falhar."""
    r = subprocess.run(cmd, cwd=RAIZ, capture_output=True, text=True)
    if r.returncode:
        print(r.stdout, r.stderr)
        raise SystemExit(f"falhou: {cmd}")
    return r.stdout


def rep(p, a, b):
    """Troca a primeira ocorrência de a por b no arquivo p (a precisa existir)."""
    t = p.read_text(encoding="utf-8")
    assert a in t, (p.name, a)
    p.write_text(t.replace(a, b, 1), encoding="utf-8")


# 1. objetiva
q = A / f"CONTEUDO/ATIVIDADES-AULA-{nn}-50-QUESTOES.md"
print(run("python3", "-I", str(AQUI / "montar_questoes.py"), str(SP / f"q{nn}.txt"), str(q)).strip())
print(run("python3", "assets/gerador-atividades/gerar_atividades.py", str(A.relative_to(RAIZ)), f"--so={q.name}").strip())

# 2. padrão de resposta da prática
cab = (f"# Padrão de Resposta — Atividade Prática — Aula {nn} — Testes de Front-End (uso exclusivo do professor e da correção por IA)\n\n"
       "> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela\n"
       f"> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: {tema}.\n"
       "> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.\n\n")
gab = A / f"CONTEUDO/ATIVIDADE-PRATICA-AULA-{nn}-GABARITO.md"
gab.write_text(cab + (AQUI / "instrucoes-ia.md").read_text(encoding="utf-8") + "\n" + (SP / f"g{nn}.md").read_text(encoding="utf-8"), encoding="utf-8")

# 3. prática: página + seed (o gerador usa um nome igual para todas as matérias: guardar e devolver)
alvo = RAIZ / "database" / f"{hoje}-atividade-pratica-aula-{nn}-seed-atividades.sql"
copia = alvo.read_bytes() if alvo.exists() else None
out = run("python3", "assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py", str(A.relative_to(RAIZ)), f"ATIVIDADE-PRATICA-AULA-{nn}.md")
print(out.strip())
assert "10 questões, 30 tópicos, 10 pontos" in out and "(0 sem padrão)" in out, "prática fora do padrão"
seed_pratica = alvo.with_name(alvo.name.replace("-atividade-pratica", "-testes-frontend-atividade-pratica", 1))
texto = re.sub(r"m\.descricao = '[^']*'", f"m.descricao = '{NOME_BANCO}'", alvo.read_text(encoding="utf-8"))
seed_pratica.write_text(texto, encoding="utf-8")
if copia is None:
    alvo.unlink()
else:
    alvo.write_bytes(copia)

# 4. seed da objetiva (um arquivo por aula, para não mexer no seed já CONCLUÍDO das aulas 01 a 03)
S = RAIZ / "scripts/gerar-seed-atividades.py"
s = S.read_text(encoding="utf-8")
if f"TESTES_FRONTEND}}/ATIVIDADES-AULA-{nn}-" not in s:
    tema_obj = re.search(r"^- \*\*Tema:\*\* (.+)$", q.read_text(encoding="utf-8"), re.M).group(1)
    entrada = f'    ({n}, "{tema_obj}", "{data_aula}",\n     f"{{PASTA_TESTES_FRONTEND}}/ATIVIDADES-AULA-{nn}-50-QUESTOES.md"),\n'
    i = s.index("ATIVIDADES_TESTES_FRONTEND = [")
    j = s.index("\n]\n", i) + 1
    S.write_text(s[:j] + entrada + s[j:], encoding="utf-8")
seed_obj = f"database/{hoje}-testes-frontend-objetiva-aula-{nn}-seed-atividades.sql"
print(run("python3", "scripts/gerar-seed-atividades.py", f"--so=TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-{nn}-50",
          f"--saida={seed_obj}").strip().splitlines()[-1])

# 5. índice da matéria e card do curso
print(run("sh", str(AQUI / "indice_tf.sh")).strip())

# 6. conferências
h = (A / f"ATIVIDADES-AULA-{nn}-50-QUESTOES.html").read_text(encoding="utf-8")
assert h.count('class="alternativas"') == 50 and "Gabarito:" not in h
hp = (A / f"ATIVIDADE-PRATICA-AULA-{nn}.html").read_text(encoding="utf-8")
assert "Resposta esperada" not in hp and 'data-bloquear-colar="sim"' in hp
letras = re.findall(r"\*\*Gabarito:\*\* ([ABCD])", q.read_text(encoding="utf-8"))
dist = " ".join(f"{l}{letras.count(l)}" for l in "ABCD")

# 7. status da matéria
linha = next(l for l in (M / "AULAS/STATUS-AULAS.md").read_text(encoding="utf-8").splitlines() if l.startswith(f"| {nn} |"))
partes = linha.split(" | ")
partes[5] = f"✅ `ATIVIDADES-AULA-{nn}-50-QUESTOES.html`"
partes[6] = f"✅ `ATIVIDADE-PRATICA-AULA-{nn}.html`"
partes[7] = "⬜ seeds gerados, não aplicados |"
rep(M / "AULAS/STATUS-AULAS.md", linha, " | ".join(partes))
SA = A / "STATUS-ATIVIDADES.md"
la = next(l for l in SA.read_text(encoding="utf-8").splitlines() if l.startswith(f"| {nn} |"))
pa = la.split(" | ")
nova = " | ".join(pa[:2] + [f"✅ `ATIVIDADES-AULA-{nn}-50-QUESTOES.html`", f"50 ({dist})", "✅", "⬜ seed gerado, não aplicado", "🔄 falta banco |"])
rep(SA, la, nova)
lp = next(l for l in SA.read_text(encoding="utf-8").splitlines() if l.startswith(f"| `CONTEUDO/ATIVIDADE-PRATICA-AULA-{nn}.md` |"))
rep(SA, lp, f"| `ATIVIDADE-PRATICA-AULA-{nn}.html` | ✅ Prática discursiva no padrão da prova id 82 (10 questões × 3 tópicos, 10 pontos; "
             f"fonte `CONTEUDO/ATIVIDADE-PRATICA-AULA-{nn}.md` + `-GABARITO.md`, regra `docs/REGRAS-ATIVIDADE-PRATICA.md`) | ⬜ seed gerado, não aplicado |")

# 8. registro dos seeds: seed novo entra como PENDENTE
R = RAIZ / "database/SEEDS-APLICADOS.md"
r = R.read_text(encoding="utf-8")
for nome in (Path(seed_obj).name, seed_pratica.name):
    if f"| `{nome}` |" in r:
        continue
    lin = f"| `{nome}` | Testes de Front-End (TII) | 1 | **PENDENTE** | — | Ainda não aplicado; Etapa 137-13665a7e, item 137.8 |"
    fim = r.find("\n## Seeds excluídos")
    fim = len(r) if fim < 0 else fim
    r = r[:fim].rstrip("\n") + "\n" + lin + "\n" + r[fim:]
R.write_text(r, encoding="utf-8")
print(f"Aula {nn} fechada: {arq_aula} · gabarito {dist} · seeds {Path(seed_obj).name}, {seed_pratica.name}")
