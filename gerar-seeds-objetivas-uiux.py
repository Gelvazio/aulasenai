"""Gera seeds SQL das 19 atividades objetivas de Fundamentos de UI/UX."""
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
MATERIA_DIR = RAIZ / "MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX"
PASTA_FONTES = MATERIA_DIR / "ATIVIDADES/CONTEUDO"
PASTA_SAIDA = RAIZ / "database"

materia = json.loads((MATERIA_DIR / "materia.json").read_text(encoding="utf-8"))
TEMAS = {int(a["numero"]): a["tema"] for a in materia["aulas"]}

MODELO = """-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = {num}
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula {num} da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('{nome}', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — {nome} (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-{nn}-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
{linhas};
end $$;
"""

def esc(t):
    return t.replace("'", "''")

for num in range(1, 20):
    nn = f"{num:02d}"
    md = PASTA_FONTES / f"ATIVIDADES-AULA-{nn}-50-QUESTOES.md"
    if not md.exists():
        print(f"[FALTA] {md.name}")
        continue
    texto = md.read_text(encoding="utf-8")
    itens = re.findall(r"## ITEM (\d+) — ([^\n]+)\n(?:.|\n)*?\*\*Gabarito:\*\* ([A-D])", texto)
    # O regex acima pega o gabarito correto só se for o PRÓXIMO gabarito após o ITEM
    # Melhor: dividir por ITEM e pegar o primeiro gabarito de cada bloco
    itens = []
    for m in re.finditer(r"## ITEM (\d+) — ([^\n]+)\n(.*?)(?=## ITEM |\Z)", texto, re.S):
        item_num, titulo, bloco = m.group(1), m.group(2).strip(), m.group(3)
        g = re.search(r"\*\*Gabarito:\*\* ([A-D])", bloco)
        if g:
            itens.append((int(item_num), titulo, g.group(1)))
    if len(itens) != 50:
        print(f"[AVISO] aula {nn}: {len(itens)} itens (esperado 50)")
        continue
    nome = esc(TEMAS.get(num, f"Aula {nn}").strip())
    linhas = ",\n".join(
        f"      (v_atividade, {i}, '{esc(titulo)}', '{letra}')" for i, titulo, letra in itens
    )
    saida = PASTA_SAIDA / f"2026-10-24-objetiva-aula-{nn}-seed-atividades.sql"
    saida.write_text(MODELO.format(num=num, nn=nn, nome=nome, linhas=linhas), encoding="utf-8")
    dist = {}
    for _, _, letra in itens:
        dist[letra] = dist.get(letra, 0) + 1
    print(f"[OK] aula {nn}: 50 itens | gabarito {dist}")
