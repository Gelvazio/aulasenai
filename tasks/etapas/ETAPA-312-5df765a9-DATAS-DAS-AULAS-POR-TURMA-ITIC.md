## Etapa 312-5df765a9 — Datas das aulas por turma na atividade de ITIC

**Tarefa:** #185-5df765a9-ab93-4401-b298-091234690c99 · **Pedido em:** 2026-10-16 06:17 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "na atividade de ITIC, deve ter bem em cima no combo de turma, deve listar abaixo as
data das aulas em relacao a turma, 1 turma tem dia de aula diferente da outra,entao a data de
aula,deve ser numa tabela separaca com id da aula, id da turma e data aula"
**Objetivo:** ao escolher a turma no topo da atividade de Introdução às TIC, mostrar logo abaixo do
combo as datas das aulas daquela turma (cada turma tem dias diferentes), lidas de uma tabela própria.

### Escopo

- **Entra:** tabela nova no banco com `id_aula`, `id_turma` e `data_aula` (RLS + JWT); lista das
  datas abaixo do combo de turma na página da atividade de ITIC; seed das datas já conhecidas.
- **Não entra:** outras matérias; edição das datas pela tela (só se o usuário pedir).

### Riscos

- Tarefa **grande** (banco): precisa de aprovação do plano antes de executar e só o Claude Code
  local com Opus 5.5+ ou Fable pega a parte de banco (`niveis.md`, `multiplas-ias.md`).

### Decisões

- 2026-10-16 — Datas ficam em tabela separada (aula × turma × data), pedido do usuário.
- 2026-10-16 06:25 — Usuário: "execute a 185" → tomado como aprovação do escopo acima e como ordem
  expressa para a Sonnet 5.5 (local) fazer a #185.1 PESADO (exceção ao `niveis.md`). Fonte das
  datas: `CALENDARIO AULAS ITIC.txt` (turmas CEPLAS TARDE e MANHÃ).

### #185.1 — Tabela de datas por aula e turma, com RLS e seed (banco)

**Próximo passo:** pedir detalhes ao usuário (de onde vêm as datas de cada turma; nome da tabela;
quais aulas da ITIC) e mostrar o plano para aprovação.

- **Nível:** PESADO — banco (tabela nova, RLS, seed).
- **Descrição:** criar a tabela (nome a definir, ex.: `aula_turma`) com `id_aula`, `id_turma`,
  `data_aula`; FKs para `aulas` e `turma`; RLS (aluno lê só a própria turma; professor edita);
  atualizar `docs/database.md`.
- **Critérios de aceitação:** SQL idempotente aplicado; datas das turmas de ITIC carregadas;
  `docs/database.md` atualizado.

### #185.2 — Lista de datas abaixo do combo de turma (tela)

**Próximo passo:** depois da #185.1, ler `docs/` da página da atividade e implementar.

- **Nível:** MEDIO — tela com lógica (JS), de 1 a 3 arquivos.
- **Descrição:** no topo da atividade de ITIC, logo abaixo do combo de turma, listar as datas das
  aulas da turma escolhida (busca na tabela da #185.1, com JWT); muda ao trocar a turma.
- **Critérios de aceitação:** lista muda com a turma; sem dado no HTML; `node --check` no JS.

### #185.3 — Aceite do usuário

**Próximo passo:** 👀 o usuário confere a página.

- **Nível:** LEVE — só conferência do usuário.
