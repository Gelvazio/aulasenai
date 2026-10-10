"""Atualiza o card de BANCO DE DADOS no índice do curso com o número de páginas de atividade."""
import re
from pathlib import Path
C = Path("MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html"); A = Path("MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES")
n = len([p for p in A.glob("*.html") if p.name != "index.html"])
s = C.read_text(encoding="utf-8")
padrao = re.compile(r'(<h2>BANCO DE DADOS</h2>\s*</div>\s*</div>\s*)<p class="meta">.*?</p>\s*<div class="acoes">.*?</div>', re.S)
novo = (r'\g<1><p class="meta">%d arquivos de atividade</p>\n            <div class="acoes"><a class="btn principal" '
        r'href="BANCO-DE-DADOS/ATIVIDADES/index.html">📚 Atividades</a></div>' % n)
s, k = padrao.subn(novo, s); assert k == 1
C.write_text(s, encoding="utf-8"); print(n)
