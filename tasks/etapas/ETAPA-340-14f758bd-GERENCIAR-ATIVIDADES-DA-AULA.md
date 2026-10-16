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

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código com lógica em até 3 arquivos (sem SQL).
- **Critérios de aceitação:** botão "Gerenciar atividades" no "Editar aula"; o 2.º modal lista as
  atividades da aula com "Desvincular", tem campo "ID da atividade" + "Vincular" e a lista das
  atividades da mesma matéria (e sem aula) para vincular; vincular uma atividade de outra aula
  pede confirmação (ela sai da outra aula); a lista do "Editar aula" atualiza ao fechar.
- **Entrega (2026-10-16 19:49, Claude Code (Opus 5.5) (local · main · s14)):** `assets/js/indice-aula-modal-vinculo.js`
  (novo: modal, campo "ID da atividade", listas "Atividades desta aula" com ✖ Desvincular e
  "Outras atividades da matéria e sem aula" com 🔗 Vincular, confirmações pelo popup);
  `indice-aula-repositorio.js` (`buscarAtividadeVinculoCard`, `listarAtividadesVinculaveisCard`,
  `definirAulaDaAtividadeCard`); `indice-aula-modal.js` (botão "🔗 Gerenciar atividades" ao lado
  de "➕ Nova atividade nesta aula"); `atividades-crud-modal.js` (carrega o script);
  `assets/css/indice-aula-data.css`; `docs/regras/atividades.md`.
- **Verificação:** `node --check` nos 4 scripts; linhas novas até 100 caracteres; nenhum nome
  global repetido em `assets/js` e `js`; banco (leitura): `aula_id` aceita vazio, 1 chave
  estrangeira para `aulas` (o filtro `aulas!inner` funciona), política
  `atividade_update_professor`; ITIC tem 27 atividades vinculáveis e 1 atividade sem aula (ID 1).
  Sem navegador: o teste na tela é o aceite (#213.2).

### #213.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre "✏️ Editar aula" num card, clica em "🔗 Gerenciar atividades", vincula uma atividade pelo ID e desvincula outra.

- **Nível:** LEVE — conferência do usuário.