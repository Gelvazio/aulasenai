## Etapa 249-49bde0a7 — ✏️ abre o modal só com a atividade selecionada

**Tarefa:** #122-49bde0a7-1e59-4f95 · **Pedido em:** 2026-10-14 13:17 · **Executor:** Claude Code (local · main)
**Pedido:** "AO CLICAR EM EDITAR,DEVE ABRIR MODAL APENAS COM A AULA DO ID SELECIONADO,SEM LISTAR OUTRAS ATIVIDADES"
**Objetivo:** o ✏️ de cada atividade (#120) abre o modal com o título "✏️ Editar atividade ID NN" e só o formulário dela, sem a lista "Atividades cadastradas" e sem "Nova / limpar". O botão "CADASTRAR ATIVIDADES" continua abrindo o modal completo.
**Próximo passo:** 122.2 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 122.1 | `atividades-crud-modal.js`: modo de uma atividade só (`definirModoModalCrud`, `obterAtividadeUnicaCrud`; depois de salvar, o formulário continua com a atividade); `atividades-crud-modal.css`: classe `crud-caixa--unica` esconde lista, subtítulo e "Nova / limpar" | ✅ Concluído | 2026-10-14 13:17 | `node --check` ok; leitura: `abrirModalCrud(pagina)` (CADASTRAR) volta ao modo completo |
| 122.2 | Aceite do usuário (testar o ✏️ logado como professor) | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
