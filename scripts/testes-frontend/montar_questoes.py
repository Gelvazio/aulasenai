"""Monta ATIVIDADES-AULA-NN-50-QUESTOES.md a partir de um rascunho compacto.

Rascunho: linhas de cabeçalho 'chave: valor' até '===', depois blocos:
## Título | C4
Comando
+ alternativa certa
- errada (3 vezes)
Uso: montar_questoes.py rascunho.txt saida.md
"""
import random, sys
from pathlib import Path

txt = Path(sys.argv[1]).read_text(encoding="utf-8")
cab, corpo = txt.split("\n===\n", 1)
h = dict(l.split(": ", 1) for l in cab.strip().splitlines())
itens = []
for bloco in corpo.strip().split("\n## ")[0:]:
    bloco = bloco.lstrip("# ").strip()
    if not bloco: continue
    linhas = bloco.splitlines()
    titulo, cap = [p.strip() for p in linhas[0].split("|")]
    cmd = " ".join(l for l in linhas[1:] if not l.startswith(("+ ", "- ")))
    certa = [l[2:] for l in linhas if l.startswith("+ ")]
    erradas = [l[2:] for l in linhas if l.startswith("- ")]
    assert len(certa) == 1 and len(erradas) == 3, titulo
    itens.append((titulo, cap, cmd, certa[0], erradas))
assert len(itens) == 50, len(itens)
rnd = random.Random(int(h["Aula"]) * 7919)
letras = list("A" * 13 + "B" * 13 + "C" * 12 + "D" * 12); rnd.shuffle(letras)
nn = h["Aula"]
out = [f"# Atividade: {h['Tema']} — 50 Questões", "",
       f"- **Aula:** {nn}", f"- **Tema:** {h['Tema']}", f"- **Ícone:** {h['Ícone']}",
       "- **Duração:** 90–120 minutos", "- **Formato:** Múltipla escolha (A, B, C, D)",
       "- **Total de questões:** 50", "- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)",
       f"- **Capacidade avaliada:** {h['Capacidade avaliada']}",
       f"- **Conteúdo-base:** ../CONTEUDO/{h['Conteúdo']}",
       f"- **Slides:** ../AULAS/AULA-{nn}-SLIDES.pdf", "- **Folha de respostas:** sim", "",
       f"> Fonte única: o HTML `ATIVIDADES-AULA-{nn}-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).",
       "", "---", ""]
for i, (titulo, cap, cmd, certa, erradas) in enumerate(itens):
    alt = erradas[:]; rnd.shuffle(alt); pos = "ABCD".index(letras[i]); alt.insert(pos, certa)
    out += [f"## ITEM {i+1:02d} — {titulo}", "", f"- **Capacidade:** {cap}", "", "**Comando:**  ", cmd, "",
            "**Alternativas:**"] + [f"- {l}) {a}" for l, a in zip("ABCD", alt)] + ["", f"**Gabarito:** {letras[i]}", "", "---", ""]
Path(sys.argv[2]).write_text("\n".join(out).rstrip("-\n") + "\n", encoding="utf-8")
print("ok", len(itens), {l: letras.count(l) for l in "ABCD"})
