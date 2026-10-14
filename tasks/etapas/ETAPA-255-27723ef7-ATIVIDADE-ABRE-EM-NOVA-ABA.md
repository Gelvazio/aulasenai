## Etapa 255-27723ef7 — Link da atividade abre em nova aba

**Tarefa:** #128-27723ef7-353d-4479 · **Pedido em:** 2026-10-14 13:50 · **Executor:** Claude Code (local · main)
**Pedido:** "ao clicar no link de 1 atividade,deve abrir em nova aba"
**Objetivo:** em todos os `ATIVIDADES/index.html`, os botões das atividades (`a.btn.principal` dos cards) abrem a página em nova aba, para professor e alunos.
**Próximo passo:** 255.2 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 255.1 | `assets/js/atividades-crud-modal.js` (carregado com `defer` em todos os índices): `abrirAtividadesEmNovaAba` põe `target="_blank"` e `rel="noopener"` nos links das atividades | ✅ Concluído | 2026-10-14 13:50 | `node --check` ok; o bloqueio só mexe no href, o target fica |
| 255.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
