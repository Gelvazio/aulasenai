## Etapa 337-be64cb29 — Bloqueio da aula ligado em todas as matérias

**Tarefa:** #210-be64cb29-48d8-4052-a6a1-5c9bd72d045e · **Pedido em:** 2026-10-16 18:49 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "liga o bloqueio da aula em tudo e verifique"
**Objetivo:** ligar o botão "Aula liberada / Aula bloqueada" (por turma, #206) em todas as matérias
com índice de atividades, hoje só em Testes de Front-End (`assets/js/indice-bloqueio-aula-config.js`).

> ⚠️ **Tarefa grande** (mudança em massa): primeiro a verificação (#210.1, só leitura); o plano
> da mudança (#210.2) espera a aprovação do usuário.

### Decisões

- 2026-10-16 18:49 — Tarefa criada a pedido do usuário.

### #210.1 — Verificar as matérias (só leitura)

**Próximo passo:** contar, por matéria, os cards com aula no banco, as aulas com `ativo = false`
e as páginas de atividade que carregam `atividade-bloqueio-aula.js`.

- **Nível:** PESADO — consultas ao banco e efeito em segurança (quem vê a aula).

### #210.2 — Ligar o bloqueio da aula em todas as matérias

**Próximo passo:** depende da #210.1 e da aprovação do usuário.

- **Nível:** PESADO — mudança em massa.

### #210.3 — Aceite do usuário

**Próximo passo:** depende da #210.2.

- **Nível:** LEVE — conferência do usuário.