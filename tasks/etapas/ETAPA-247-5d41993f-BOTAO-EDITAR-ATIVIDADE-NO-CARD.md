## Etapa 247-5d41993f — Botão ✏️ para o professor editar cada atividade nos cards do índice

**Tarefa:** #120-5d41993f-8c50-4918 · **Pedido em:** 2026-10-14 13:12 · **Executor:** Claude Code (local · main)
**Pedido:** "NO CARD DA AULA, AO LADO DE CADA ATIVIDADE,COLOQUE UM BOTAO PARA O PROFESSOR EDITAR A ATIVIDADE NO BANCO DE DADOS,NOME,DATA,ECT"
**Objetivo:** em todo `ATIVIDADES/index.html` (código global), ao lado de cada link de atividade cadastrada no banco, o professor tem um botão ✏️ que abre o formulário de edição já preenchido com aquela atividade (nome, descrição, data, total de itens, aula, link, ativa).
**Próximo passo:** 120.2 — aceite do usuário.

Sem mudança no banco: usa o formulário e a gravação que já existem ("CADASTRAR ATIVIDADES", `abrirEdicaoAtividadeCrud`), com o JWT do professor e o RLS atual.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 120.1 | `assets/js/atividades-crud-modal.js` (botão ✏️ depois de cada link com atividade no banco, só para professor) + estilo em `assets/css/atividades-crud-modal.css` | ✅ Concluído | 2026-10-14 13:12 | `node --check` ok; leitura: o botão nasce junto com a etiqueta "ID", que só aparece para professor; `CAMPOS_ATIVIDADE_CRUD` já traz `aula_id` |
| 120.2 | Aceite do usuário (testar logado como professor) | 👀 Aguardando o usuário | — | — |
