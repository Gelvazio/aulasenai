---
description: Encerra a TASK reservada pela frente atual (quadro, 1 commit + push na main)
---

Encerre a tarefa reservada pela frente atual seguindo `.claude/rules/tasks/ciclo-da-task.md`
("4. Encerrar") e `.claude/rules/git-quick.md`:

1. Etapa: todos os itens ✅ (ou ⛔ justificados); o último é o **aceite** (👀 até o usuário
   confirmar) e o **Próximo passo** atualizado.
2. `tasks/STATUS.md`: "Em uso por" = `—` e a linha da frente (só a sua); a linha ✅ da tarefa
   (e da mãe, se fechou) sai do `STATUS.md` e vai para o fim de `tasks/task_complete.md`.
3. Pendências e lições → seções do `STATUS.md`, se houver.
4. `git fetch --all --prune` e `git pull --rebase origin main`.
5. Visualizador (`.claude/rules/index.html`): **não** regenerar — só com pedido explícito do
   usuário, no local (`visualizador-regras.md`).
6. `git add` só dos arquivos da tarefa + quadro;
   `git diff --cached --name-only` para conferir.
7. **1 commit** (`tipo(tema): descrição por <IA> (<frente>)` + `Co-Authored-By`) e
   `git push origin main`. Push recusado → rebase e push de novo; nunca `--force`.

Responder apenas: **TAREFA FINALIZADA E SINCRONIZADA!**
