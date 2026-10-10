#!/bin/sh
# uso: commit_aula.sh NN  — atualiza STATUS (125.3 e próximo passo), roda a análise, commita e faz push
SP=${RASCUNHO:-/tmp/rascunho-banco-de-dados}
NN=$1; PROX=$(printf "%02d" $(expr $NN + 1))
cd /home/user/aulasenai
A=MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS
[ -f $A/ATIVIDADES/ATIVIDADES-AULA-$NN-50-QUESTOES.html ] && [ -f $A/ATIVIDADES/ATIVIDADE-PRATICA-AULA-$NN.html ] && grep -q "^| $NN | .* ✅ .CONTEUDO/" $A/AULAS/STATUS-AULAS.md || { echo "AULA $NN INCOMPLETA: nada commitado"; exit 1; }
T=$(TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M")
python3 - "$NN" "$PROX" "$T" <<'PY'
import sys,re
nn,prox,t=sys.argv[1:]
p='tasks/STATUS.md'; s=open(p,encoding='utf-8').read()
s=re.sub(r'(\| 125\.3 \|[^|]*\| 🔄 Em progresso — )aulas? [^;|]*?✅ \([^)]*\); próximas?: [^|]*\|',
         lambda m: m.group(1)+f'aulas 01 a {nn} ✅ (última em {t}); próxima: {prox} |', s, count=1)
s=re.sub(r'Etapa 125, item 125\.3 — Banco de Dados: aula \d\d \(conteúdo \+ objetiva \+ prática\), depois \d\d a 20',
         f'Etapa 125, item 125.3 — Banco de Dados: aula {prox} (conteúdo + objetiva + prática), depois {int(prox)+1:02d} a 20', s, count=1)
s=re.sub(r'Item 125\.3 — aulas? [0-9 a]+ prontas?; próxima: aula \d\d', f'Item 125.3 — aulas 01 a {nn} prontas; próxima: aula {prox}', s, count=1)
s=s.replace('Item 125.3 — aula 01 pronta; próxima: aula 02', f'Item 125.3 — aulas 01 a {nn} prontas; próxima: aula {prox}')
open(p,'w',encoding='utf-8').write(s)
import glob
e=glob.glob('tasks/etapas/ETAPA-125-*.md')[0]; x=open(e,encoding='utf-8').read()
x=re.sub(r'(\| 125\.3 \|[^|]*\| 🔄 Em progresso — )aulas? [^;|]*?✅ \([^)]*\); próximas?: [^|]*\|',
         lambda m: m.group(1)+f'aulas 01 a {nn} ✅ (última em {t}); próxima: {prox} |', x, count=1)
open(e,'w',encoding='utf-8').write(x)
PY
python3 scripts/analise-materias.py > $SP/analise.txt 2>&1; R=$(head -1 $SP/analise.txt)
sed -i "s/🔄 Em andamento — última rodada [0-9-]* [0-9:]*: [^|]*incompletas/🔄 Em andamento — última rodada $T: $(echo $R | sed 's/Cursos: \([0-9]*\) | Matérias: \([0-9]*\) | Completas: \([0-9]*\) | Incompletas: \([0-9]*\)/\1 cursos, \2 matérias, \3 completas, \4 incompletas/')/" tasks/STATUS.md
git add MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html scripts/gerar-seed-atividades.py database/*banco-de-dados* database/SEEDS-APLICADOS.md tasks/STATUS.md tasks/etapas/ETAPA-125-*.md tasks/ANALISE-MATERIAS-RELATORIO.json
git diff --cached --name-only
TEMA=$(head -1 MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/CONTEUDO/AULA-$NN-*.md | sed 's/^# Aula [0-9]* — //')
git commit -q -m "feat(banco-de-dados): aula $NN completa — $TEMA

Conteúdo em CONTEUDO/, objetiva de 50 questões, prática 10 × 3 com padrão de resposta,
seeds (não aplicados), índice da matéria, card do curso e status atualizados (tarefa #20, item 125.3).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01D8QNtKJ6YrcJA7JEeok2wF"
git fetch -q origin main; N=$(git rev-list --count HEAD..origin/main); [ "$N" != "0" ] && echo "MAIN ANDOU: $N commits"
git push -q -u origin claude/festive-maxwell-25jnhl 2>&1 | tail -1
git log --oneline -1
