#!/bin/sh
# Regera só o índice de BANCO-DE-DADOS: roda o gerador global, guarda o índice da matéria, desfaz o resto.
SP=${RASCUNHO:-/tmp/rascunho-banco-de-dados}
mkdir -p "$SP"
BD=MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/index.html
cd /home/user/aulasenai
git show HEAD:$BD > $SP/index-bd-antes.html 2>/dev/null || cp $BD $SP/index-bd-antes.html
cp MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html $SP/index-curso.html
git ls-files --others --exclude-standard | grep 'index.html$' > $SP/novos-antes.txt
python3 assets/gerador-indices/gerar_indices.py > /dev/null 2>&1
cp $BD $SP/index-bd-novo.html
git diff --name-only | grep 'index.html$' | while read f; do git checkout -q -- "$f"; done
git ls-files --others --exclude-standard | grep 'index.html$' | grep -v -x -F -f $SP/novos-antes.txt | xargs -r rm
cp $SP/index-curso.html MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html
cp $SP/index-bd-novo.html $BD
python3 - $SP/index-bd-antes.html $BD <<'PY'
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
python3 -I "$(dirname "$0")/card_curso.py"
