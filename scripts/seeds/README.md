# 🌱 Scripts dos seeds e dos status

Uso obrigatório (regra "🌱 REGRA — SEEDS DO BANCO" do `CLAUDE.md`). Rodar sempre na **raiz** do
repositório. Rascunhos (lotes, JSON) ficam numa pasta temporária, nunca no repositório.

## Aplicar um seed pelo conector do Supabase

| Passo | Comando | O que faz |
|---|---|---|
| 1 | `python3 scripts/seeds/dividir_seed.py database/<seed>.sql /tmp/lotes` | Quebra o seed em **um lote por atividade** (`NN-obj.sql`/`NN-pra.sql`, sem `DO` nem `delete`), grava `esperado.json` (md5 de cada página) e `conferir-md5.sql` |
| 2 | conector `execute_sql` com cada `NN-*.sql` | Aplica uma atividade por vez; a resposta traz `atividade`, `aula` e `itens` |
| 3 | conector `execute_sql` com `conferir-md5.sql` → salvar a resposta em `/tmp/lotes/resultado.json` | Lê o md5 de cada página no banco |
| 4 | `python3 scripts/seeds/comparar_md5.py /tmp/lotes/esperado.json /tmp/lotes/resultado.json` | Diz quais páginas batem (OK) |
| 5 | `python3 scripts/seeds/registrar_seed.py <seed>.sql CONCLUÍDO "<observação com ids>"` | Grava o status e o resumo em `database/SEEDS-APLICADOS.md` |
| 6 | atualizar `STATUS-AULAS.md`, `STATUS-ATIVIDADES.md`, item da etapa → commit (+ push na nuvem) | Uma aula por vez |

- ⚠️ O lote só **acrescenta** itens: use em atividade que ainda não tem itens no banco. Se já houver
  itens diferentes, avisar o usuário (apagar exige pedido e backup).
- Matéria ou aula que não existe no banco: o lote não grava nada (a CTE `aula` volta vazia) → criar
  a matéria e as aulas antes, só com pedido do usuário (ex.: `database/2026-10-09-materia-comunicacao-oral-escrita-aulas.sql`).

## Status das matérias (`scripts/status-materias/`)

| Comando | O que faz |
|---|---|
| `python3 scripts/status-materias/criar_status_aulas.py` | Cria `AULAS/STATUS-AULAS.md` (todas as aulas em ⬜, 1 a cada 4 h da ementa) nas matérias que não têm |
| `SAIDA_LISTA=/tmp/criados.txt python3 scripts/status-materias/criar_status_faltantes.py` | Cria `STATUS-ATIVIDADES.md`, `STATUS-EMENTAS.md` e `STATUS-APOSTILA.md` que faltam (só a estrutura) e lista os criados |

Nenhum dos dois sobrescreve arquivo existente.

## Aulas de Banco de Dados (`scripts/banco-de-dados/`)

Fluxo usado nas aulas 01–18 (tarefa #20): `RASCUNHO=/tmp/rascunho-banco-de-dados python3
scripts/banco-de-dados/pipeline.py NN` — precisa de `CONTEUDO/AULA-NN-*.md` e, na pasta
`$RASCUNHO`, de `qNN.txt` (questões) e `gNN.md` (padrão de resposta da prática); depois
`RASCUNHO=... sh scripts/banco-de-dados/commit_aula.sh NN` atualiza o status e faz commit e push.
