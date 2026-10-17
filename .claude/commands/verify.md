---
description: Verificação completa do quadro de tarefas (conflitos e entregas aplicadas) e coluna Verificado
argument-hint: "[tudo, opcional]"
---

Rode a verificação de `.claude/rules/tasks/verificacao.md` no quadro (`tasks/STATUS.md`,
`tasks/task_complete.md` e `tasks/etapas/`). **$ARGUMENTS** = `tudo` confere também as linhas que
já têm `true` em **Verificado**.

1. Sincronizar (`git fetch` + `git pull --rebase`) e ler o quadro.
2. Conflitos (seção 1 da regra) → lista no relatório.
3. Linhas ✅ ou 👀 de aceite com Verificado `—` → conferir a entrega com prova; só ✅ Feito
   recebe `true`; anotar o resultado na etapa.
4. Um commit + push com o quadro, as etapas e o visualizador regenerado.

⛔ Sem navegador, sem testes, sem SQL que altera o banco, sem mexer na reserva de outra frente.
Resposta: conflitos, linhas marcadas `true`, parciais e não feitas, e o que espera o usuário.
