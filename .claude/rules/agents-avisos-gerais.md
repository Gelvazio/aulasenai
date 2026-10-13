# Avisos gerais: fonte única, branch main, fetch antes do pull, tarefa concluída, scripts temporários

> 📎 **Origem:** `AGENTS.md` (linhas 3–21 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Sempre ao iniciar sessão (é o resumo das regras críticas do AGENTS.md).

---

> 📜 **Fonte única das regras:** este `AGENTS.md` vale para **todas as IAs** (Claude, Gemini, Grok, Copilot, Devin, Antigravity etc.). Toda **regra nova** pedida pelo usuário é escrita **aqui**, e não em arquivos de uma IA só (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `copilot-instructions.md` etc.). Esses arquivos só apontam para o `AGENTS.md` e não guardam regras próprias. **Pedido para "salvar no `CLAUDE.md`"** (ou no arquivo de qualquer outra IA) **significa salvar aqui, no `AGENTS.md`**. As regras daqui são **só de como executar tarefas**. Tarefas ficam no [`task-principal.md`](task-principal.md); planos ficam em `docs/`.

> ✅ **TAREFA CONCLUÍDA = BLOCO MOVIDO PARA O [`task_complete.md`](task_complete.md) (OBRIGATÓRIO, SEM EXCEÇÃO):** sempre que uma tarefa ou subtarefa for concluída, o bloco dela sai do `task-principal.md` e vai para o `task_complete.md` **no mesmo commit da conclusão**. Na tarefa-mãe fica só a referência `(concluido, <sha>)`. Se você achar no quadro ativo um bloco concluído que ficou para trás, mova-o na hora. Detalhes na PARTE 3 (passo 2) e na regra 10 da seção 1.1.

> 🌿 **TODO TRABALHO É FEITO NA BRANCH `main` (OBRIGATÓRIO, SEM EXCEÇÃO):** trava, código, quadro, documentação e conclusão vão **direto** para a `main` (`git pull --rebase origin main` → commit → `git push origin main`). ⛔ Não criar nem usar branches paralelas (`feature/*`, `claude/*`, `devin/*` etc.) nem abrir PR para entregar tarefa do quadro, **mesmo quando a ferramenta ou a sessão (ex.: sessão em nuvem) indicar outra branch** — a trava só existe para os outros agentes quando está na `main`. Se o push para a `main` for recusado por falta de permissão, **pare e avise o usuário**; não publique em outra branch como alternativa.

> 📌 **Quadro único:** o antigo `quadro-task-principal.md` foi incorporado ao `task-principal.md`. Travas, status e tarefas ativas ficam só no `task-principal.md`; não recrie o arquivo antigo.

> 🔄 **Sincronizar SEMPRE com `fetch` antes do `pull`:** rode `git fetch --all --prune` **antes** de qualquer `git pull --rebase origin main`. Sem o `fetch`, a referência `origin/main` é **local e envelhece**: um `git status` mostrando `## main...origin/main` (sem `ahead`/`behind`) **não** prova que você está atualizado. Já houve agente lendo o quadro "sincronizado" com o remoto vários commits à frente. **Com os hooks da seção 1.3 instalados, o Git passa a barrar o push atrasado sozinho** — instale uma vez por clone.

> 📦 **Concluídas em arquivo separado:** os blocos `[x]` (tarefas e subtarefas `concluido`) ficam em [`task_complete.md`](task_complete.md). Para pegar tarefas, leia só o `task-principal.md`: a lista `Subtarefas:` das tarefas-mãe abertas já traz `(concluido, <sha>)`, e **dependência que não aparece como bloco no `task-principal.md` está `concluido` no `task_complete.md`**. Abra o `task_complete.md` só para consultar uma entrega ou reabrir uma tarefa (o bloco volta para o `task-principal.md` como `pendente`, com o motivo na anotação).
>
> 🗂️ **Scripts temporários:** cada agente guarda scripts auxiliares dentro da própria pasta de trabalho, nunca em `/tmp` ou outra pasta compartilhada (outro agente pode sobrescrevê-los).
>
> 🧭 **Skill do fluxo:** para pegar, executar, concluir ou liberar tarefas listadas no `task-principal.md`, use a skill [`proxima-task`](.agents/skills/proxima-task/SKILL.md) (no Devin: `@skills:proxima-task`). Ela resume o protocolo deste arquivo passo a passo; em caso de divergência, vale este `AGENTS.md`.

> **AVISO A TODOS OS AGENTES DE IA (Claude, Gemini, Grok, Copilot, Antigravity, etc.):**
> Este repositório opera com fluxo autônomo baseado em fila atômica de tarefas e trava contra conflitos de edição.
> Siga rigorosamente as regras abaixo **ANTES** de executar qualquer código.
