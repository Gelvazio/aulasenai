> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 100 — Excluir as respostas de uma aluna na atividade id 82 (tarefa pequena, pedido em 2026-10-08 22:55:39)

Motivo: a outra integrante da dupla é quem está fazendo a atividade.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 100.1 | Backup (RLS ligado, sem políticas) em `resposta_discursiva_backup_20261008_82_thais` e `correcao_discursiva_backup_20261008_82_thais`; exclusão das 6 respostas discursivas e das 6 correções da IA da aluna na atividade 82 (nenhuma nota confirmada pelo professor; sem entrega) | ✅ Concluído | 2026-10-08 22:55:39 | Consulta: 6 linhas em cada backup e 0 restantes nas tabelas originais |
| 100.3 | Pedido do usuário: a **prova inteira** (instruções, questões e entrega) fica escondida para o professor até escolher um aluno; painel e Progresso da turma continuam visíveis | ✅ Concluído | 2026-10-08 20:17:35 | `node --check`; seletor conferido no HTML da prova (`.content-section > .aula-card`) |
| 100.4 | Pedido do usuário (print): também escondidos o link "← Índice" e o menu da matéria (`.menu-atividades`) enquanto a prova está escondida para o professor | ✅ Concluído | 2026-10-08 20:18:10 | Classes conferidas em `js/menu.js` e no HTML da prova |
| 100.2 | Aceite do usuário | ⬜ Pendente | — | — |
