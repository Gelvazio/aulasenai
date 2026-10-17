## Etapa 148-6932a263 — Revisão das regras e quadro de tarefas com fonte única nos arquivos

**Tarefa:** #29-6ee02521-4f6a-4944 · **Pedido em:** 2026-10-13 10:00 ·
**Executor:** Claude Code (local · main)
**Pedido:** "leia todas as regras mais 1 vez (`.claude/rules`) e veja se tem regra que não faz
sentido ou duplicada" → "todos, incluindo o CLAUDE.md global" → "B, fonte única nos arquivos" →
"tudo que for referente a tasks, atualização de tasks, que pode ser reutilizado em outros projetos,
coloque nesta pasta: `.claude/rules/tasks`".
**Objetivo:** regras sem contradição nem repetição, e cada informação de uma tarefa anotada em um
lugar só (arquivos do repositório), com as regras de tarefas reutilizáveis em `.claude/rules/tasks/`.
**Próximo passo:** 29.13 — aceite do usuário.

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

### Decisões do usuário (29.2 — todas pela opção recomendada, 2026-10-13 10:19)

| # | Pergunta | Decidido |
|---|----------|----------|
| D1 | Fila `tasks` do banco, `tasks.html`, `tasks/fila/`, `sincronizar_tasks.py`, #24 | Desativar sem apagar a tabela; aba TASKS do visualizador substitui a página |
| D2 | Constantes e formatador (item 7) | Ajustar a regra à realidade do projeto |
| D3 | 3 seeds APLICADO de outras frentes | Seguir sem banco; seeds ficam com as frentes donas |
| D4 | Migrar o formato das tarefas reservadas por outras frentes (#20, #21, #22, #26) | Migrar só o formato, conteúdo preservado, com recado |

### Itens

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 29.1 | Revisão das 20 regras, diagnóstico e plano (esta etapa) | ✅ Concluído | 2026-10-13 10:11 | Caminhos citados conferidos no repositório |
| 29.2 | Decisões D1 a D4 do usuário | ✅ Concluído | 2026-10-13 10:19 | Respostas no chat: as 4 recomendadas |
| 29.3 | Criar `.claude/rules/tasks/` (quadro, ciclo da task, frentes e reserva, gestão) e tirar de `.claude/rules/` o que foi para lá | ✅ Concluído | 2026-10-13 10:21 | 3 arquivos em tasks/ (3,7 KB, 2,3 KB, 3,4 KB); 4 removidos; multiplas-ias 1,1 KB |
| 29.4 | Corrigir os itens 1 a 12 e as duplicações nas demais regras, `INDEX.md` e `AGENTS.md` | ✅ Concluído | 2026-10-13 10:23 | grep: nenhuma referência a arquivo apagado; maior regra 3,7 KB; extra: gabarito no Git×site (git-quick, security-banco) e GEMINI.md → AGENTS.md |
| 29.5 | Migrar o quadro: `STATUS.md` como índice; blocos do `TASKS.md` para o cabeçalho das etapas (etapa nova para tarefa sem etapa); apagar `TASKS.md`; recado em `RECADOS.md` | ✅ Concluído | 2026-10-13 10:30 | STATUS.md índice (frentes 4 colunas, tarefas 7 colunas, sem ⏳); 8 etapas novas (149–156); cabeçalho/pedido em 10 etapas; 51 itens 👀; TASKS.md apagado; recado em RECADOS.md |
| 29.6 | Fila do banco conforme D1 (página, menu, `tasks/fila/`, script, `docs/regras/tarefas-agendadas.md`, sub-tasks da #25 como itens da Etapa 143) | ✅ Concluído | 2026-10-13 10:32 | 22 sub-tasks → itens 25.3–25.24 (etapa 143) com o texto; #24 cancelada (24.5 ⛔, etapa 142); 140.6/140.7 sem fila; página, 3 JS, CSS, script e tasks/fila/ apagados; menu sem TASKS (node --check ok); tarefas-agendadas.md reescrita; database.md e relatório com aviso |
| 29.7 | Visualizador: ler `.claude/rules/tasks/`, quadro sem `TASKS.md`, pendências do usuário pelos itens 👀 das etapas; regenerar | ✅ Concluído | 2026-10-13 10:34 | py_compile e node --check ok; gerado: 91 seções, 24 tarefas, 6 frentes, 64 itens 👀; tasks/ na categoria certa; nenhuma regra em 'Outros' |
| 29.8 | Skill `proxima-task` (projeto e global) lendo o próximo passo da etapa | ✅ Concluído | 2026-10-13 10:34 | SKILL.md lê o próximo passo da etapa (link da coluna Tarefa (etapa)); cópia global igual (diff) |
| 29.9 | `docs/regras/*.md`, `docs/HISTORICO-REGRAS.md`, `.claude/memory/MEMORY.md` sem referências antigas | ✅ Concluído | 2026-10-13 10:35 | 8 cabeçalhos de docs/regras → AGENTS.md + HISTORICO; menções a TASKS.md e plano em docs/ trocadas; HISTORICO com cabeçalho único e entrada nova; MEMORY.md só aponta (regras 'sem sugestões' → AGENTS.md e 'apagar em massa' → security-banco.md); grep sem referência aos 4 arquivos apagados |
| 29.10 | `CLAUDE.md` global (backup antes) | ✅ Concluído | 2026-10-13 10:37 | Backup em scratchpad; global 688 → 531 linhas: quadro com/sem tasks/, plano na etapa, push e worktree conforme o projeto, constantes/formatador, apostilas e ENSALADO só no projeto, log sem exemplo; CLAUDE-DOCS-BEFORE-EVERY-TASK.md com exceção; grep das contradições = 0 |
| 29.11 | Conferência final | ✅ Concluído | 2026-10-13 10:39 | Nenhuma regra > 5 KB; grep sem referência antiga em regra viva; py_compile e node --check ok; linhas novas ≤ 100 caracteres; skill documentacao-padrao com a exceção do quadro; 7 pendências no STATUS.md |
| 29.12 | Commit + push + quadro | ✅ Concluído | 2026-10-13 10:39 | 2 commits na `main`: `d55965a` (só as 36 exclusões: o `git add --pathspec-from-file` parou num arquivo já apagado) + o commit com o restante |
| 29.13 | Aceite do usuário: conferir `.claude/rules/` (inclusive `tasks/`), o quadro novo (`tasks/STATUS.md` + etapas, sem `TASKS.md`), a fila desativada e o `CLAUDE.md` global | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |

### Riscos

| Risco | Chance | Plano B |
|-------|--------|---------|
| Frentes de nuvem escrevem no quadro antigo durante a migração | Média | Recado em `RECADOS.md`; no conflito, passar a linha delas para o formato novo |
| O Claude Code não carregar regras da subpasta `.claude/rules/tasks/` | Baixa | `AGENTS.md` cita os arquivos de `tasks/` (também serve às outras IAs) |
| Rotina agendada configurada para a fila do banco | Baixa (está desligada, 140.6) | Regra da rotina reescrita antes de ligar |

Pendências desta tarefa: seção "Pendências" do `tasks/STATUS.md` (linhas "#29: …").
