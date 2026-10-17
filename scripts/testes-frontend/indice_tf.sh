#!/bin/sh
# Regera só o índice de TESTES-DE-FRONTEND: roda o gerador global, guarda o índice da matéria, desfaz o resto
# (o gerador apaga a faixa ensalado; ver "Cuidados aprendidos" em docs/REGRAS-ATIVIDADE-PRATICA.md).
SP=${RASCUNHO:-/tmp/rascunho-testes-frontend}
mkdir -p "$SP"
TF=MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/index.html
cd /home/user/aulasenai
cp $TF $SP/index-tf-antes.html
cp MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html $SP/index-curso.html
git ls-files --others --exclude-standard | grep 'index.html$' > $SP/novos-antes.txt
python3 assets/gerador-indices/gerar_indices.py > /dev/null 2>&1
cp $TF $SP/index-tf-novo.html
git diff --name-only | grep 'index.html$' | while read f; do git checkout -q -- "$f"; done
git ls-files --others --exclude-standard | grep 'index.html$' | grep -v -x -F -f $SP/novos-antes.txt | tr '\n' '\0' | xargs -0 -r rm
cp $SP/index-curso.html MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html
cp $SP/index-tf-novo.html $TF
python3 - $SP/index-tf-antes.html $TF <<'PY'
import sys,re
old=open(sys.argv[1],encoding='utf-8').read(); p=sys.argv[2]; new=open(p,encoding='utf-8').read()
nav=re.search(r'<nav class="faixa-materias".*?</nav>',old,re.S).group(0)
new=re.sub(r'<nav class="faixa-materias".*?</nav>',lambda m:nav,new,count=1,flags=re.S)
add=''
for js in ('popup.js','faixa-materias-ensalado.js'):
    if js not in new: add+=f'    <script src="../../../../assets/js/{js}" defer></script>\n'
new=new.replace('</head>',add+'</head>',1)
open(p,'w',encoding='utf-8').write(new)
PY
python3 - <<'PY'
# card de TESTES DE FRONTEND no índice do curso: número de páginas de atividade
import re
from pathlib import Path
C = Path("MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html"); A = Path("MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES")
n = len([p for p in A.glob("*.html") if p.name != "index.html"])
s = C.read_text(encoding="utf-8")
s, k = re.subn(r'(<h2>TESTES DE FRONTEND</h2>.*?<p class="meta">)\d+ arquivos de atividade', rf'\g<1>{n} arquivos de atividade', s, flags=re.S)
assert k == 1; C.write_text(s, encoding="utf-8"); print("card do curso:", n)
PY
