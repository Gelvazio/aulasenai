# 🤖 DIRETRIZES DE AGENTES DE IA & PROTOCOLO DE CONCORRÊNCIA

> 📜 **Fonte única das regras:** este `AGENTS.md` vale para **todas as IAs** (Claude, Gemini, Grok, Copilot, Devin, Antigravity etc.). Toda **regra nova** pedida pelo usuário é escrita **aqui**, e não em arquivos de uma IA só (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `copilot-instructions.md` etc.). Esses arquivos só apontam para o `AGENTS.md` e não guardam regras próprias. **Pedido para "salvar no `CLAUDE.md`"** (ou no arquivo de qualquer outra IA) **significa salvar aqui, no `AGENTS.md`**. As regras daqui são **só de como executar tarefas**. Tarefas ficam no [`task-principal.md`](task-principal.md); planos ficam em `docs/`.

> ✅ **TAREFA CONCLUÍDA = BLOCO MOVIDO PARA O [`task_complete.md`](task_complete.md) (OBRIGATÓRIO, SEM EXCEÇÃO):** sempre que uma tarefa ou subtarefa for concluída, o bloco dela sai do `task-principal.md` e vai para o `task_complete.md` **no mesmo commit da conclusão**. Na tarefa-mãe fica só a referência `(concluido, <sha>)`. Se você achar no quadro ativo um bloco concluído que ficou para trás, mova-o na hora. Detalhes na PARTE 3 (passo 2) e na regra 10 da seção 1.1.

> 🌿 **TODO TRABALHO É FEITO NA BRANCH `main` (OBRIGATÓRIO, SEM EXCEÇÃO):** trava, código, quadro, documentação e conclusão vão **direto** para a `main` (`git pull --rebase origin main` → commit → `git push origin main`). ⛔ Não criar nem usar branches paralelas (`feature/*`, `claude/*`, `devin/*` etc.) nem abrir PR para entregar tarefa do quadro, **mesmo quando a ferramenta ou a sessão (ex.: sessão em nuvem) indicar outra branch** — a trava só existe para os outros agentes quando está na `main`. Se o push para a `main` for recusado por falta de permissão, **pare e avise o usuário**; não publique em outra branch como alternativa.

> 📌 **Quadro único:** o antigo `quadro-task-principal.md` foi incorporado ao `task-principal.md`. Travas, status e tarefas ativas ficam só no `task-principal.md`; não recrie o arquivo antigo.

> 🔄 **Sincronizar SEMPRE com `fetch` antes do `pull`:** rode `git fetch --all --prune` **antes** de qualquer `git pull --rebase origin main`. Sem o `fetch`, a referência `origin/main` é **local e envelhece**: um `git status` mostrando `## main...origin/main` (sem `ahead`/`behind`) **não** prova que você está atualizado. Já houve agente lendo o quadro "sincronizado" com o remoto vários commits à frente. **Com os hooks da seção 1.3 instalados, o Git passa a barrar o push atrasado sozinho** — instale uma vez por clone.

> 🧩 **Regras divididas:** o detalhamento deste arquivo foi dividido em rules carregáveis sob demanda, em [`.claude/rules/`](.claude/rules/INDEX.md). Leia só a que a tarefa pedir.

| Rule | Assunto | Carregar quando |
|---|---|---|
| [`agents-avisos-gerais.md`](.claude/rules/agents-avisos-gerais.md) | Avisos gerais: fonte única, branch main, fetch antes do pull, tarefa concluída, scripts temporários | Sempre ao iniciar sessão (é o resumo das regras críticas do AGENTS.md) |
| [`agents-protocolo-captura-tarefa.md`](.claude/rules/agents-protocolo-captura-tarefa.md) | Protocolo de captura de tarefa (lock em 3 partes) | Antes de assumir, executar ou concluir qualquer tarefa do quadro |
| [`agents-concorrencia.md`](.claude/rules/agents-concorrencia.md) | Regras complementares de concorrência (seção 1.1) | Ao travar/liberar tarefa, mover concluídas, editar o Resumo de Progresso ou pegar tarefa de banco |
| [`agents-prioridade.md`](.claude/rules/agents-prioridade.md) | Prioridade das tarefas (seção 1.2) | Ao escolher a próxima tarefa ou criar/subdividir uma tarefa |
| [`agents-hooks-sincronizacao.md`](.claude/rules/agents-hooks-sincronizacao.md) | Hooks de sincronização (seção 1.3) | Ao configurar o clone, quando o push/merge for barrado ou o hook não rodar |
| [`agents-subtarefas-dependencias.md`](.claude/rules/agents-subtarefas-dependencias.md) | Subdivisão em subtarefas e dependências (seção 2) | Ao criar ou subdividir tarefas no quadro |
| [`agents-identificacao-ia.md`](.claude/rules/agents-identificacao-ia.md) | Identificação obrigatória da IA executora (seção 3) | Ao travar uma tarefa, commitar o lock ou a entrega |
| [`agents-reporte-progresso.md`](.claude/rules/agents-reporte-progresso.md) | Reporte de progresso ao monitor (seção 4, opcional) | Só se o MCP do DashboardAI estiver disponível |
| [`agents-confirmacao-status.md`](.claude/rules/agents-confirmacao-status.md) | Confirmação de status das tarefas (seção 5) | Ao verificar ou reconfirmar a conclusão de uma subtarefa |
| [`agents-plano-docs.md`](.claude/rules/agents-plano-docs.md) | Plano em docs/ para tarefas grandes (seção 6) | Antes de executar tarefa grande (banco, segurança, várias partes, massa) |
| [`agents-cerebro-memoria-mcp.md`](.claude/rules/agents-cerebro-memoria-mcp.md) | Plano do Cérebro de Memória Persistente (MCP + Supabase) | Ao mexer em api/mcp.ts, brain_store/brain_search ou nas tabelas ai_memories |

---

# 📚 Regras de Projeto

**Versão das regras:** 2026-10-13 ⚡ *Sistema de memória ativa — regras em `.claude/rules/` para carga rápida*

---

## ⚡ INÍCIO RÁPIDO

**Ao iniciar sessão:**

1. Abra `.claude/rules/essentials.md` (30 segundos)
2. Siga para `.claude/rules/status-flow.md`
3. Procure outras regras no `.claude/rules/INDEX.md`

---

## 📍 Onde Estão as Regras

| Tipo | Localização | Quando ler |
|------|------------|-----------|
| **Essenciais** | `.claude/rules/essentials.md` | Sempre, ao iniciar |
| **Dia a dia** | `.claude/rules/status-flow.md`, `git-quick.md` | Cada tarefa |
| **Por tema** | `.claude/rules/INDEX.md` | Conforme precisar |
| **Documentação** | `docs/regras/` | Para detalhes completos |
| **Histórico** | `docs/HISTORICO-REGRAS.md` | Referência (opcional) |

---

## 🤖 Agentes Grok AI

⚠️ **Agentes da Grok AI devem sempre ler [`AGENTS.md`](AGENTS.md) antes de qualquer coisa.**

---

## 📖 Estrutura de Arquivos

### `.claude/rules/` (Rápido — use diariamente)
Cada arquivo é uma regra específica. Carrega só o que você abre.

- `INDEX.md` — Índice de todas
- `essentials.md` — Checklist de início
- `status-flow.md` — Ler STATUS.md, tarefas
- `git-quick.md` — Commits, push
- `security-banco.md` — RLS, JWT, gabarito
- `materias-global.md` — Matérias
- `atividades-banco.md` — Atividades no banco
- `seeds.md` — SEEDS-APLICADOS.md
- (mais no INDEX)

### `docs/regras/` (Detalhado — referência completa)
Regras extensas com exemplos e passo a passo.

- `materias.md` — Regra global completa
- `atividades.md` — Tudo sobre atividades
- `tarefas-agendadas.md` — Fila `tasks` detalhada
- (mais no CLAUDE.md antigo)

### Memória persistente
`.claude/projects/aulasenai/.../memory/` — consolidação por tema (opt-in)

---

## ✅ Regras Que Valem SEMPRE

1. **1 commit por tarefa** — Com `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`
2. **Ao concluir cada tarefa: commit + push + atualizar o quadro de tarefas** (`tasks/STATUS.md` e `tasks/TASKS.md`) — vale local e nuvem (nuvem: branch + PR)
3. **STATUS.md é verdade** — O que não está lá não aconteceu
4. **Seeds CONCLUÍDO antes** — Todos antes de tarefa nova
5. **Sem navegador** — Ler código, `node`, banco — nunca preview
6. **RLS + JWT** — Obrigatório em toda página e tabela

---

## 🔗 Links Importantes

- **Fluxo:** `tasks/STATUS.md` → `tasks/etapas/` → `tasks/TASKS.md`
- **Status de tarefas:** `.claude/rules/status-flow.md`
- **Seed mais novo:** `database/SEEDS-APLICADOS.md`
- **Documentação:** `.claude/rules/INDEX.md`

---

## 📝 Mudanças Recentes

- **2026-10-13:** Sistema de regras em `.claude/rules/` — contexto mínimo, carga rápida
- **2026-10-11 11:18:37:** Agentes Grok AI seguem `AGENTS.md`
- **2026-10-11 06:01:03:** Atividades só no banco, layout global

(Histórico completo: `docs/HISTORICO-REGRAS.md`)

---

## ❓ Dúvidas?

1. Procure no `.claude/rules/INDEX.md`
2. Se não achar, procure em `docs/regras/`
3. Se ainda não achar, procure em `docs/` (documentação temática)

**Tudo que está aqui é simplesmente um índice e apontador.** As regras reais estão em `.claude/rules/` (rápido) ou `docs/regras/` (detalhado).

---

*Sistema ativo desde 2026-10-13. Contexto mínimo, máxima praticidade.*
