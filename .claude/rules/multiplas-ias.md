# 🤖 Várias IAs e frentes ao mesmo tempo

Vale para **todas as IAs** (Claude, Gemini, Grok, Copilot, Devin, Antigravity…) e todas as frentes
(local e nuvem). O quadro é o `tasks/STATUS.md` (`status-flow.md`).

## 1. Fonte única das regras

- Toda regra nova vai para o **`AGENTS.md`** ou para um arquivo em `.claude/rules/` listado no
  `INDEX.md`. "Salvar no `CLAUDE.md`" = salvar no `AGENTS.md`.
- Arquivos de uma IA só (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`…) apenas apontam para o
  `AGENTS.md`; não guardam regras próprias.

## 2. Tudo na `main`

- Trabalho, quadro e documentação vão direto para a `main` — também nas sessões de nuvem, mesmo que
  a ferramenta indique outra branch. ⛔ Sem branches paralelas e sem PR para entregar tarefa.
- Se o push para a `main` for recusado por permissão: **pare e avise o usuário**; não publique em
  outra branch como alternativa.

## 3. Pegar uma tarefa (reserva)

1. `git fetch --all --prune` + `git pull --rebase origin main`; só então ler o `tasks/STATUS.md`.
2. Escolher uma tarefa com **"Em uso por" = `—`** e **todas as dependências concluídas**.
3. Entre as livres, a de **maior prioridade** (🔴 Máxima → 🟠 Alta → 🟡 Média → 🟢 Baixa);
   empate = ordem do quadro. Baixa só com orientação explícita do usuário.
4. Gravar `<frente> (desde <data hora>)` em "Em uso por", **commit + push imediatos**, e só então
   começar o trabalho.
5. Push da reserva recusado → `fetch` + `pull --rebase`, **reler** o quadro; se outra frente pegou
   a mesma tarefa, desfazer a sua reserva e escolher outra.

## 4. Limites

- **1 tarefa reservada por frente.** Só pega a próxima depois de entregar ou liberar a atual.
- ⛔ Nunca mexer na reserva, na linha de frente ou no bloco de outra frente. Reserva "parada" não
  é abandonada: quem libera é **o usuário**.
- Tarefa grande demais → dividir em itens/sub-tarefas menores antes de codificar (cada uma com
  dependências e prioridade declaradas; herda a prioridade da mãe ou Média).
- A prioridade é definida **pelo usuário**; a IA não muda a de itens existentes sem pedido.

## 5. Identificar a IA

O nome da IA/frente aparece na reserva ("Em uso por"), na linha de frente, nas anotações da etapa
e nas mensagens de commit (ex.: `feat(materias): ... por Claude Code (local · main)`).

## 6. Banco de dados: só o Claude Code local

- Só o **Claude Code local** (máquina do usuário, com o MCP do Supabase) pega tarefa de banco:
  SQL, schema, trigger, função, RLS, migração, seeds, consultas e validação contra o banco real.
- ⛔ Sessões de nuvem e outras IAs não pegam essas tarefas; se houver parte sem banco
  (frontend, documentação), ela vira item separado.
- Mudança em banco de produção continua exigindo autorização do usuário (exceto o ciclo de seeds
  já autorizado em `seeds.md`).

## 7. Scripts temporários

Cada IA guarda scripts auxiliares na **própria pasta de trabalho** (ou scratchpad da sessão), nunca
em `/tmp` compartilhado.
