"""Fecha uma aula de Banco de Dados: gera objetiva, prática, seeds, índice e status.
Uso: python3 pipeline.py NN   (precisa de CONTEUDO/AULA-NN-*.md, qNN.txt, gNN.md e a fonte da prática)
"""
import os
import json, re, subprocess, sys
from pathlib import Path

SP = Path(os.environ.get("RASCUNHO", "/tmp/rascunho-banco-de-dados"))  # rascunhos qNN.txt e gNN.md
AQUI = Path(__file__).resolve().parent  # scripts auxiliares desta pasta
RAIZ = Path("/home/user/aulasenai")
M = RAIZ / "MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS"
A = M / "ATIVIDADES"
nn = sys.argv[1]; n = int(nn)
d = json.loads((M / "materia.json").read_text(encoding="utf-8"))
aula = d["aulas"][n - 1]; tema_json = aula["tema"]
arq_aula = next((M / "CONTEUDO").glob(f"AULA-{nn}-*.md")).name
tema = re.sub(r"^# Aula \d+ — ", "", (M / "CONTEUDO" / arq_aula).read_text(encoding="utf-8").splitlines()[0])

def run(*cmd):
    r = subprocess.run(cmd, cwd=RAIZ, capture_output=True, text=True)
    if r.returncode: print(r.stdout, r.stderr); raise SystemExit(f"falhou: {cmd}")
    return r.stdout

q = A / f"CONTEUDO/ATIVIDADES-AULA-{nn}-50-QUESTOES.md"
print(run("python3", "-I", str(AQUI / "montar_questoes.py"), str(SP / f"q{nn}.txt"), str(q)).strip())
print(run("python3", "assets/gerador-atividades/gerar_atividades.py", str(A.relative_to(RAIZ)), f"--so={q.name}").strip())
run("sh", str(AQUI / "montar_gabarito.sh"), nn, tema, str(SP / f"g{nn}.md"), str(A / f"CONTEUDO/ATIVIDADE-PRATICA-AULA-{nn}-GABARITO.md"))
import datetime
alvo = RAIZ / "database" / f"{datetime.date.today():%Y-%m-%d}-atividade-pratica-aula-{nn}-seed-atividades.sql"
copia = alvo.read_bytes() if alvo.exists() else None
out = run("python3", "assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py", str(A.relative_to(RAIZ)), f"ATIVIDADE-PRATICA-AULA-{nn}.md")
print(out.strip())
assert "10 questões, 30 tópicos, 10 pontos" in out and "(0 sem padrão)" in out, "prática fora do padrão"
novo = alvo.with_name(alvo.name.replace("-atividade-pratica", "-banco-de-dados-atividade-pratica", 1))
novo.write_text(alvo.read_text(encoding="utf-8").replace("m.descricao = 'Banco de Dados'", "m.descricao = 'BANCO DE DADOS'"), encoding="utf-8")
if copia is None: alvo.unlink()
else: alvo.write_bytes(copia)
# seed das objetivas
S = RAIZ / "scripts/gerar-seed-atividades.py"; s = S.read_text(encoding="utf-8")
entrada = f'    ({n}, "{tema}", DATA_PROVISORIA,\n     f"{{PASTA_BANCO_DADOS}}/ATIVIDADES-AULA-{nn}-50-QUESTOES.md"),\n'
if f"ATIVIDADES-AULA-{nn}-50-QUESTOES.md\"),\n]" not in s and f"BANCO_DADOS}}/ATIVIDADES-AULA-{nn}-" not in s:
    i = s.index("ATIVIDADES_BANCO_DADOS = ["); j = s.index("\n]\n", i) + 1
    s = s[:j] + entrada + s[j:]; S.write_text(s, encoding="utf-8")
print(run("python3", "scripts/gerar-seed-atividades.py", "--so=BANCO-DE-DADOS", "--saida=database/2026-10-09-banco-de-dados-objetivas-seed-atividades.sql").strip().splitlines()[-1])
run("sh", str(AQUI / "indice_bd.sh"))
# conferências
h = (A / f"ATIVIDADES-AULA-{nn}-50-QUESTOES.html").read_text(encoding="utf-8")
assert h.count('class="alternativas"') == 50 and "Gabarito:" not in h
hp = (A / f"ATIVIDADE-PRATICA-AULA-{nn}.html").read_text(encoding="utf-8")
assert "Resposta esperada" not in hp and 'data-bloquear-colar="sim"' in hp
letras = re.findall(r"\*\*Gabarito:\*\* ([ABCD])", q.read_text(encoding="utf-8"))
dist = " ".join(f"{l}{letras.count(l)}" for l in "ABCD")
# status
def rep(p, a, b):
    t = p.read_text(encoding="utf-8"); assert a in t, (p.name, a); p.write_text(t.replace(a, b, 1), encoding="utf-8")
rep(M / "AULAS/STATUS-AULAS.md", f"| {nn} | {tema_json} | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |",
    f"| {nn} | {tema_json} | ✅ `CONTEUDO/{arq_aula}` | ⬜ (professor) | ✅ `ATIVIDADES-AULA-{nn}-50-QUESTOES.html` | ✅ `ATIVIDADE-PRATICA-AULA-{nn}.html` | ⬜ seeds gerados, não aplicados |")
SA = A / "STATUS-ATIVIDADES.md"
rep(SA, f"| {nn} | {tema_json} | ⬜ `ATIVIDADES-AULA-{nn}-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |",
    f"| {nn} | {tema_json} | ✅ `ATIVIDADES-AULA-{nn}-50-QUESTOES.html` | 50 ({dist}) | ✅ | ⬜ seed gerado, não aplicado | 🔄 falta banco |")
rep(SA, f"| {nn} | ⬜ `ATIVIDADE-PRATICA-AULA-{nn}.html` | — | ⬜ | ⬜ | ⬜ Pendente |",
    f"| {nn} | ✅ `ATIVIDADE-PRATICA-AULA-{nn}.html` | 10 × 3 (10 pontos) | ✅ (30 tópicos com padrão) | ⬜ seed gerado, não aplicado | 🔄 falta banco |")
P = M / "DOCUMENTACAO/PLANO-AULAS.md"; t = P.read_text(encoding="utf-8")
t = re.sub(rf"(\| {nn} \| [^\n]*\| )⬜ \|", rf"\g<1>[AULA-{nn}](../CONTEUDO/{arq_aula}) |", t, count=1); P.write_text(t, encoding="utf-8")

# registro dos seeds: seed novo entra como PENDENTE
R = RAIZ / "database/SEEDS-APLICADOS.md"; r = R.read_text(encoding="utf-8")
for nome, ativ in ((novo.name, 1), ("2026-10-09-banco-de-dados-objetivas-seed-atividades.sql", n)):
    linha = f"| `{nome}` | Banco de Dados (TII) | {ativ} | **PENDENTE** | — | Ainda não aplicado; Etapa 125, item 125.8 |"
    if f"| `{nome}` |" in r:
        r = re.sub(rf"\| `{re.escape(nome)}` \| Banco de Dados \(TII\) \| \d+ \|", f"| `{nome}` | Banco de Dados (TII) | {ativ} |", r)
    else:
        fim = r.find("\n## Seeds excluídos")  # linha nova vai no fim da tabela "Todos os seeds"
        fim = len(r) if fim < 0 else fim
        r = r[:fim].rstrip("\n") + "\n" + linha + "\n" + r[fim:]
R.write_text(r, encoding="utf-8")
print(f"Aula {nn} fechada: {arq_aula} · gabarito {dist}")
