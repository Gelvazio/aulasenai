## Etapa 349-9c22cde7 — Registrar os aceites pendentes do quadro

**Tarefa:** #222-9c22cde7-b8fd-43de-ba93-c91434d45c6a · **Pedido em:** 2026-10-16 21:07 · **Criada por:** Claude Code (Opus 5.5) (nuvem · festive-maxwell-25jnhl)
**Pedido:** "Aceito tudo" (depois da lista de tarefas pendentes); na pergunta de confirmação o usuário escolheu "Só os aceites".
**Objetivo:** marcar ✅ as tarefas e subtarefas que só esperavam o aceite de um trabalho já entregue e movê-las para o `tasks/task_complete.md`.

### Escopo

- **Entra:** linhas "👀 Aguardando aceite" e subtarefas "Aceite do usuário" 👀 cujas dependências já estão ✅; o item de aceite 👀 na tabela da etapa de cada uma.
- **Não entra (continuam 👀):** aprovação de plano (#2), liberação (#4 a #7), os aceites e decisões itemizados da #17, ações do usuário fora do aceite (#193, #199.1, #209.7) e o "sim" para o UPDATE no banco (#221, #221.2); subtarefas de aceite com dependência ainda aberta.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 21:07 | "Aceito tudo" vale só para os aceites de trabalho entregue | Usuário (resposta à pergunta) | Aprovações de plano, liberações e UPDATE no banco disparam trabalho novo |

### #222.1 — Marcar os aceites e mover as linhas para o `task_complete.md`

**Próximo passo:** selecionar as linhas pelo script e mover.

- **Nível:** LEVE — só linhas do quadro e status em `.md`.
- **Critérios de aceitação:** nenhuma linha aceita fica no `STATUS.md`; o `task_complete.md` recebe as linhas com "✅ Concluído (aceite do usuário 2026-10-16)"; visualizador regenerado.
- **Entrega:** — · **Verificação:** —
