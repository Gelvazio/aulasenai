> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 95 — Modal de equipes em tabela + alunos sem equipe no início (tarefa pequena, 2026-10-08 17:39:22)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 95.1 | `assets/js/equipes-tabela.js` (novo): tabela com um grupo por equipe (linha da equipe com +Integrante/Editar/Excluir, linhas dos integrantes com papel, tarefas, líder e ✏️/🗑️, linha "+ Adicionar integrante" que abre a seleção dos alunos sem equipe); `equipes-modal.js` sem os cards antigos do professor; alunos sem equipe no início do modal (refeitos a cada gravação); `menu-acao-equipes.js` e `equipes-modal.css` | ✅ Concluído | 2026-10-08 17:39:22 | `node --check` nos 3 JS; leitura do código (sem navegador) |
| 95.2 | Aceite do usuário | ⬜ Pendente | — | — |
| 95.3 | Pedido do usuário (2026-10-08 17:42:16): tabela mais simples (colunas Equipe / Integrante · Papel · ações; botões ✏️/🗑️ só com ícone, "+ Integrante" em texto; sem colunas Tarefas e Líder — líder pelo 👑, tarefas e descrição no title; sem a linha "+ Adicionar integrante"; linhas finas sem fundo) e modal mais largo (até 1280 px / 96% da tela) | ✅ Concluído | 2026-10-08 17:42:16 | `node --check`; leitura do código (sem navegador) |
