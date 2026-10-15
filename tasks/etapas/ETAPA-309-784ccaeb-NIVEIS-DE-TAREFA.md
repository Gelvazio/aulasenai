## Etapa 309-784ccaeb — Sistema de níveis (LEVE / MEDIO / PESADO) no aulasenai

**Tarefa:** #182-784ccaeb-1fc0-4b37-88ef-7a1642792d84 · **Pedido em:** 2026-10-15 18:51 · **Executor:** Claude Code (Opus 5.5) (local · main · s3)
**Pedido:** "faça a opção 2, leve o sistema de níveis para o aulasenai" (opção 2 = trazer do
testes-de-frontend a regra de nível, a skill classificar-tarefa com a matriz e as subtarefas com
linha e reserva próprias, para modelos fracos fazerem as tarefas simples)
**Objetivo:** cada parte de uma tarefa ter nível e só ser pega pelo modelo certo, para que modelos
fracos façam as tarefas simples e o modelo forte fique com as difíceis.
**Próximo passo:** 182.2 — 👀 o usuário aprova (ou corrige) o plano abaixo.

### Escopo

- **Entra:**
  - Regra nova `.claude/rules/niveis.md` (≤ 5 KB): níveis `LEVE` (fácil), `MEDIO` (média) e
    `PESADO` (difícil), sinais de cada um, matriz ferramenta × modelo × nível adaptada ao
    aulasenai (banco = só Claude Code local; `PESADO` = só Claude Code com Opus 5.5+ ou Fable) e a
    regra de que cada frente se identifica como **IA + modelo** e só pega até o seu nível.
  - Regras de tarefas (`tasks/quadro.md`, `tasks/frentes-e-reserva.md`, `tasks/ciclo-da-task.md`):
    **subtarefa com linha própria** no `STATUS.md` (`#N.1`, `#N.2`…), reserva própria e nível; a
    linha da tarefa-mãe vira `— (não reservável)`; na etapa, uma seção por subtarefa (nível,
    descrição, critérios, próximo passo, entrega, verificação). Status só na linha do
    `STATUS.md` (um lugar só).
  - Skill `classificar-tarefa` e agente `classificador-tarefas` em `.claude/`.
  - Skill `liderar-equipe` e agentes `executor-leve` (Haiku), `executor-medio` (Sonnet) e
    `executor-pesado` (Opus) em `.claude/`: o líder reserva uma subtarefa por vez, delega pelo
    nível, confere, valida e commita.
  - `AGENTS.md` e `INDEX.md` apontando para a regra nova (as outras IAs leem por eles);
    `docs/HISTORICO-REGRAS.md`, "Registro de decisões" e visualizador regenerado.
  - **Piloto:** dividir a #181 em subtarefas com nível.
- **Não entra:**
  - Migrar as ~180 tarefas antigas: continuam como estão. Tarefa antiga sem nível → quem for
    pegar grava `**Nível:**` no topo da etapa antes (ou divide em subtarefas).
  - Mover concluídas para `task_complete.md`, hook `exigir-reserva`, script de cópia das skills
    para `.agents/`, `.grok/` e `.gemini/` (o aulasenai não tem `package.json`), mudar o
    visualizador ou a skill `proxima-task`.
- **Critério de pronto:** uma IA que lê o `AGENTS.md` sabe qual subtarefa pode pegar pelo seu
  modelo; a #181 dividida com nível em cada subtarefa; regras ≤ 5 KB; visualizador gerado.

### Riscos

| Risco | Plano B |
|---|---|
| Linhas `#181.1` quebrarem o visualizador | O leitor lê a tabela de forma genérica (conferido em `leitor_tarefas.py`); gerar e conferir o total de tarefas |
| Outras IAs não seguirem o nível | Regra no `AGENTS.md` (lido por todas) + o nível como 1º item da seção da subtarefa |
| Regras de tarefas passarem de 5 KB | Detalhes da matriz na skill; nas regras, só o essencial e o link |
| Dois formatos de etapa (antigo e novo) confundirem | Regra diz: etapa nova = seções por subtarefa; etapa antiga continua com a tabela de itens |

### Decisões

| Data | Decisão | Quem |
|---|---|---|
| 2026-10-15 | Opção 2: trazer o sistema de níveis completo do testes-de-frontend | Gelvazio |

| Item | Descrição | Nível | Status | Concluído em | Verificação |
|------|-----------|-------|--------|--------------|-------------|
| 182.1 | Comparar os dois projetos e escrever o plano nesta etapa | MEDIO | ✅ Concluído | 2026-10-15 | Lidos: regras de tarefas e `multiplas-ias.md` dos dois projetos, skills/agentes do testes-de-frontend, leitor do visualizador |
| 182.2 | Aprovação do plano pelo usuário | — | 👀 Aguardando o usuário | — | — |
| 182.3 | Regra `.claude/rules/niveis.md` + `AGENTS.md` + `INDEX.md` | MEDIO | ⬜ Pendente | — | — |
| 182.4 | Subtarefa com linha e reserva próprias em `quadro.md`, `frentes-e-reserva.md` e `ciclo-da-task.md` | MEDIO | ⬜ Pendente | — | — |
| 182.5 | Skill `classificar-tarefa` + agente `classificador-tarefas` | LEVE | ⬜ Pendente | — | — |
| 182.6 | Skill `liderar-equipe` + agentes `executor-leve`, `executor-medio`, `executor-pesado` | MEDIO | ⬜ Pendente | — | — |
| 182.7 | Piloto: dividir a #181 em subtarefas com nível | LEVE | ⬜ Pendente | — | — |
| 182.8 | `HISTORICO-REGRAS.md`, Registro de decisões e visualizador | LEVE | ⬜ Pendente | — | — |
| 182.9 | Aceite do usuário | — | ⬜ Pendente | — | — |
