## Etapa 312-5df765a9 — Datas das aulas por turma na atividade de ITIC

**Tarefa:** #185-5df765a9-ab93-4401-b298-091234690c99 · **Pedido em:** 2026-10-16 06:17 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "na atividade de ITIC, deve ter bem em cima no combo de turma, deve listar abaixo as
data das aulas em relacao a turma, 1 turma tem dia de aula diferente da outra,entao a data de
aula,deve ser numa tabela separaca com id da aula, id da turma e data aula"
**Objetivo:** ao escolher a turma no topo da atividade de Introdução às TIC, mostrar logo abaixo do
combo as datas das aulas daquela turma (cada turma tem dias diferentes), lidas de uma tabela própria.

### Escopo (atualizado em 2026-10-16 06:25 com as respostas do usuário)

- **Respostas:** (1) as datas iniciais vêm das atividades; (2) todas as turmas e todas as aulas
  de ITIC; (3) tabela `aula_turma`; (4) o professor edita as datas.

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

**Próximo passo:** ✅ entregue — nada a fazer.

- **Nível:** PESADO — banco (tabela nova, RLS, seed).
- **Descrição:** criar a tabela (nome a definir, ex.: `aula_turma`) com `id_aula`, `id_turma`,
  `data_aula`; FKs para `aulas` e `turma`; RLS (aluno lê só a própria turma; professor edita);
  atualizar `docs/database.md`.
- **Critérios de aceitação:** SQL idempotente aplicado; datas das turmas de ITIC carregadas;
  `docs/database.md` atualizado.
- **Entrega:** `database/2026-10-16-aula-turma.sql` aplicado pelo conector (projeto AULAS SENAI);
  `docs/database.md` e `database/SEEDS-APLICADOS.md` atualizados.
- **Verificação:** consulta no banco: 19 linhas para a turma 135080 e 19 para a 135081; RLS ligado
  e 4 políticas (select logado; insert/update/delete só `eh_professor()`).
- **Atenção (para o usuário):** a maioria das atividades guarda `data_atividade` = 2026-09-28
  (data padrão), então as datas iniciais ficaram iguais nas duas turmas e fora do calendário real.
  O calendário certo está em `INTRODUCAO-TIC/CALENDARIO AULAS ITIC.txt`; o professor corrige pela tela.

### #185.2 — Lista de datas abaixo do combo de turma (tela)

**Próximo passo:** 👀 o usuário abre uma atividade de ITIC como professor e confere (sem navegador
pela IA).

- **Nível:** MEDIO — tela com lógica (JS), de 1 a 3 arquivos.
- **Descrição:** no topo da atividade de ITIC, logo abaixo do combo de turma, listar as datas das
  aulas da turma escolhida (busca na tabela da #185.1, com JWT); muda ao trocar a turma.
- **Critérios de aceitação:** lista muda com a turma; sem dado no HTML; `node --check` no JS.
- **Entrega:** `assets/js/datas-aulas-turma.js` + `assets/css/datas-aulas-turma.css`, ligados em
  `assets/js/progresso-turma-global.js` (`prepararDatasAulasTurmaGlobal`, logo abaixo do combo
  "Turma" do Progresso da turma). Cada aula mostra um campo de data que grava ao mudar (cria,
  troca ou remove); "Todas as turmas" mostra um aviso. Vale para toda atividade com Progresso da
  turma, não só ITIC.
- **Verificação:** `node --check` nos dois JS; linhas ≤ 100 caracteres; arquivo do painel com 956
  linhas. Tela não aberta no navegador (regra do projeto).

**Esclarecimento (2026-10-16 07:55):** "lista todas as aulas, mas na aula listada, deve pegar a data
da aula e a regra de bloqueio desta tabela, com base na turma selecionada" → o bloco lista TODAS as
aulas da matéria; em cada uma, a Data da Aula e o bloqueio vêm de `aula_turma` para a turma do
combo, e trocar a turma relê os valores.

### #185.3 — Aceite do usuário

**Próximo passo:** 👀 o usuário confere a página.

- **Nível:** LEVE — só conferência do usuário.
