## Etapa 340-14f758bd — "Gerenciar atividades": vincular e desvincular atividades da aula

**Tarefa:** #213-14f758bd-6294-4748-9fca-71d40d7bd11a · **Pedido em:** 2026-10-16 19:47 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "AO CLICAR EM EDITAR 1 AULA,DEVE PERMITIR ADICIONAR OU REMOVER UMA ATIVIDADE PELO ID DAS
ATIVIDADES QUE JA ESTAO NO BANCO DE DADOS, PRA ISSO NO MODAL DE EDICAO DE AULA, ADICIONE UM BOTAO DE
NOME *GERENCIAR ATIVIDADES*,QUE DEVE ABRIR MAIS 1 MODAL, E NELE DEVE SER DO TIPO
VINCULADOR/DESVINCULADOR DE ATIVIDADE NA AULA QUE ESTA SENDO EDITADA"
**Objetivo:** no "✏️ Editar aula", o botão "Gerenciar atividades" abre um 2.º modal que liga
(`atividade.aula_id = aula`) e desliga (`atividade.aula_id = null`) atividades que já existem no
banco, pelo ID.

### Decisões

- 2026-10-16 19:47 — Pedido completo; tarefa pequena (código em até 3 arquivos, sem SQL: `aula_id` aceita
  vazio e a política `atividade_update_professor` já deixa o professor gravar).

### #213.1 — Modal "Gerenciar atividades" (vincular / desvincular)

**Próximo passo:** criar `assets/js/indice-aula-modal-vinculo.js`, as funções no
`indice-aula-repositorio.js` e o botão no `indice-aula-modal.js`.

- **Nível:** MEDIO — código com lógica em até 3 arquivos (sem SQL).
- **Critérios de aceitação:** botão "Gerenciar atividades" no "Editar aula"; o 2.º modal lista as
  atividades da aula com "Desvincular", tem campo "ID da atividade" + "Vincular" e a lista das
  atividades da mesma matéria (e sem aula) para vincular; vincular uma atividade de outra aula
  pede confirmação (ela sai da outra aula); a lista do "Editar aula" atualiza ao fechar.

### #213.2 — Aceite do usuário

**Próximo passo:** depende da #213.1.

- **Nível:** LEVE — conferência do usuário.