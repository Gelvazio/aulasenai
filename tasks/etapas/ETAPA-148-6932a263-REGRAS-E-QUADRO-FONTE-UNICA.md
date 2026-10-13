## Etapa 148-6932a263 — Revisão das regras e quadro de tarefas com fonte única nos arquivos

**Tarefa:** #29-6ee02521-4f6a-4944 · **Pedido em:** 2026-10-13 10:00 · **Prioridade:** 🟠 Alta ·
**Depende de:** — · **Executor:** Claude Code (local · main)
**Pedido:** "leia todas as regras mais 1 vez (`.claude/rules`) e veja se tem regra que não faz
sentido ou duplicada" → "todos, incluindo o CLAUDE.md global" → "B, fonte única nos arquivos" →
"tudo que for referente a tasks, atualização de tasks, que pode ser reutilizado em outros projetos,
coloque nesta pasta: `.claude/rules/tasks`".
**Objetivo:** regras sem contradição nem repetição, e cada informação de uma tarefa anotada em um
lugar só (arquivos do repositório), com as regras de tarefas reutilizáveis em `.claude/rules/tasks/`.
**Próximo passo:** 148.2 — decisões D1 a D4 do usuário.

> Plano desta tarefa grande = esta etapa (decisão do usuário: sem plano separado em `docs/`).

### Escopo

- **Entra:** os 12 problemas e as duplicações da revisão (abaixo); `.claude/rules/tasks/`
  (regras de tarefas sem nada específico deste projeto); quadro migrado para fonte única
  (`tasks/STATUS.md` = índice; etapa = detalhes; sem `tasks/TASKS.md`); fila `tasks` do banco
  conforme D1; visualizador e skill `proxima-task` lendo o formato novo; `docs/regras/*.md`
  (cabeçalhos antigos); `CLAUDE.md` global (com backup).
- **Não entra:** regras no banco (#26, reservada por outra frente — fica como pendência); conteúdo
  de matérias; apagar dados do banco (a tabela `tasks` não é apagada).
- **Critério de pronto:** nenhum `.md` de regra acima de 5 KB; nenhuma referência a arquivo
  apagado ou a `TASKS.md` em regra viva (grep); `py_compile`/`node --check` sem erro; visualizador
  gerado; usuário dá o aceite.

### Diagnóstico (revisão de 2026-10-13)

| # | Problema | Correção |
|---|----------|----------|
| 1 | `atividades-banco.md` trata o layout global como pronto; a migração #25 está pendente | "Alvo da #25; até lá vale o jeito atual" |
| 2 | `seeds.md` × banco só no local: frente de nuvem com seed pendente fica travada | Frente sem banco avisa em `RECADOS.md` e segue sem banco |
| 3 | Tarefa com banco = grande, mas seeds têm autorização permanente | Ciclo de seeds é exceção |
| 4 | `Co-Authored-By` com e-mail da Anthropic para todas as IAs | E-mail do fornecedor de cada IA |
| 5 | Visualizador regenerado em todo commit do quadro → conflito entre frentes | Regenerar ao mudar regras e ao encerrar tarefa; conflito no `index.html` = regenerar |
| 6 | `ORIENTACAO_INDEX.md` não existe; aviso de "sem orientação" dispara sempre | Tirar a linha; aviso só para os módulos de `js/` |
| 7 | Arquivo único de constantes e Prettier/ESLint/Black/Ruff não existem no projeto | Conforme D2 |
| 8 | Exemplo `aula.repository.js` em inglês × nomes em português | `aula.repositorio.js`, `aula.servico.js`, `aula.tela.js` |
| 9 | "Hierarquia" e "matéria semelhante" dentro de `security-banco.md` | Mover para `materias-global.md` |
| 10 | Árvore de `materias-global.md` errada (`AULAS/CONTEUDO/`, faltam 3 status) | Árvore real (`CONTEUDO/AULA-NN-DESCRICAO-CURTA.md`) |
| 11 | `status-modelo.md` não bate com o quadro real | Modelo novo em `.claude/rules/tasks/` |
| 12 | Pergunta sem mudança de arquivo também viraria TASK | Perguntas e análises não viram TASK |
| 13 | Plano em `docs/` repete a etapa; `TASKS.md`, linha da tarefa, linha da frente e "⏳ Aguardando" repetem status e próximo passo | Fonte única: etapa = detalhes; `STATUS.md` = índice |

Duplicações a tirar (fica num arquivo, os outros apontam): "Regras que valem SEMPRE"
(`AGENTS.md` × `essentials.md`); "salvar no CLAUDE.md = AGENTS.md" (3 lugares); `fetch` +
`pull --rebase` (3); tudo na `main` (2); 1 tarefa por frente (2); tamanho e pasta das atividades
(2); fonte = ementa e outra UC (2); 1 aula = 4 h (2); gabarito/`localStorage` (2); histórico das
regras (`AGENTS.md` × `docs/HISTORICO-REGRAS.md`); skill `proxima-task` em 2 cópias.

`CLAUDE.md` global: push só quando pedir × push por tarefa; `git merge` de branch × proibido;
`STATUS.md` na raiz × `tasks/STATUS.md`; pergunta do log citando o `aulasenai`; regras só deste
projeto (faixa ENSALADO, caminhos do `apostila.js`); plano em `docs/` × plano na etapa.

### Decisões do usuário (148.2)

| # | Pergunta | Recomendado |
|---|----------|-------------|
| D1 | Fila `tasks` do banco, `tasks.html`, `tasks/fila/`, `sincronizar_tasks.py`, #24 | Desativar sem apagar a tabela; aba TASKS do visualizador substitui a página |
| D2 | Constantes e formatador (item 7) | Ajustar a regra à realidade do projeto |
| D3 | 3 seeds APLICADO de outras frentes | Seguir sem banco; seeds ficam com as frentes donas |
| D4 | Migrar o formato das tarefas reservadas por outras frentes (#20, #21, #22, #26) | Migrar só o formato, conteúdo preservado, com recado |

### Itens

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 148.1 | Revisão das 20 regras, diagnóstico e plano (esta etapa) | ✅ Concluído | 2026-10-13 10:11 | Caminhos citados conferidos no repositório |
| 148.2 | Decisões D1 a D4 do usuário | 👀 Aguardando o usuário | — | — |
| 148.3 | Criar `.claude/rules/tasks/` (quadro, ciclo da task, frentes e reserva, gestão) e tirar de `.claude/rules/` o que foi para lá | ⬜ Pendente | — | `wc -c` ≤ 5 KB; nada específico do projeto |
| 148.4 | Corrigir os itens 1 a 12 e as duplicações nas demais regras, `INDEX.md` e `AGENTS.md` | ⬜ Pendente | — | grep das frases repetidas |
| 148.5 | Migrar o quadro: `STATUS.md` como índice; blocos do `TASKS.md` para o cabeçalho das etapas (etapa nova para tarefa sem etapa); apagar `TASKS.md`; recado em `RECADOS.md` | ⬜ Pendente | — | Toda tarefa aberta com etapa e pedido |
| 148.6 | Fila do banco conforme D1 (página, menu, `tasks/fila/`, script, `docs/regras/tarefas-agendadas.md`, sub-tasks da #25 como itens da Etapa 143) | ⬜ Pendente | — | grep `pegar_proxima_task` |
| 148.7 | Visualizador: ler `.claude/rules/tasks/`, quadro sem `TASKS.md`, pendências do usuário pelos itens 👀 das etapas; regenerar | ⬜ Pendente | — | `py_compile`, `node --check`, geração sem erro |
| 148.8 | Skill `proxima-task` (projeto e global) lendo o próximo passo da etapa | ⬜ Pendente | — | Leitura |
| 148.9 | `docs/regras/*.md`, `docs/HISTORICO-REGRAS.md`, `.claude/memory/MEMORY.md` sem referências antigas | ⬜ Pendente | — | grep |
| 148.10 | `CLAUDE.md` global (backup antes) | ⬜ Pendente | — | grep das contradições = 0 |
| 148.11 | Conferência final | ⬜ Pendente | — | Critério de pronto |
| 148.12 | Commit + push + quadro | ⬜ Pendente | — | — |
| 148.13 | Aceite do usuário | ⬜ Pendente | — | — |

### Riscos

| Risco | Chance | Plano B |
|-------|--------|---------|
| Frentes de nuvem escrevem no quadro antigo durante a migração | Média | Recado em `RECADOS.md`; no conflito, passar a linha delas para o formato novo |
| O Claude Code não carregar regras da subpasta `.claude/rules/tasks/` | Baixa | `AGENTS.md` cita os arquivos de `tasks/` (também serve às outras IAs) |
| Rotina agendada configurada para a fila do banco | Baixa (está desligada, 140.6) | Regra da rotina reescrita antes de ligar |
