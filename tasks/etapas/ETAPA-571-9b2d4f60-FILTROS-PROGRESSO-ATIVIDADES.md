## Etapa 571-9b2d4f60 — #424: Filtros Entregue, Andamento e Sem começar no modal "Progresso Atividades"

**Tarefa:** #424-9b2d4f60 · **Pedido em:** 2026-10-27 20:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "No modal de Progresso Atividades, crie filtros neste local, Entregue, Andamento, Sem Começar, pra eu entender quem fez algo, ou nem começou ou esta fazendo" (print do modal da aula 02, filtros logo acima do quadro alunos × atividades).
**Objetivo:** o professor filtrar o quadro do modal por situação do aluno: entregou, está fazendo ou nem começou.

**Análise (leitura do código):**
- O quadro (`indice-aula-progresso-quadro.js`, #421.5) desenha uma linha por aluno e uma coluna por atividade; os dados (`situacoes`: atividade → aluno → vazia/andamento/entregue) já estão em memória, então o filtro não lê o banco.

### Escopo

- **Entra:** barra de filtros acima do quadro: **Todos**, **Entregue**, **Em andamento** e **Sem começar**, cada um com a contagem de alunos; regra por aluno (todas as atividades da aula): Entregue = entregou alguma; Em andamento = está fazendo alguma; Sem começar = não começou nenhuma; mensagem quando nenhum aluno cai no filtro. Arquivo novo `indice-aula-progresso-filtro.js` (um arquivo por responsabilidade) e estilos no `indice-aula-progresso.css`.
- **Não entra:** banco, filtro por atividade, mudar a lógica de situação, outras telas.

### Critério de pronto

- `node --check` ok; lendo o código, cada filtro mostra só os alunos da regra acima e o contador bate com as linhas; "Todos" mostra todos.
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.

---

### #424.1 — Filtros por situação no quadro de progresso da aula

**Próximo passo:** (entregue) — nada; o usuário confirma na tela (modal da aula 02: filtros acima do quadro).

- **Nível:** MEDIO — classificado (jev (confiança 0.94))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.94)
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** botões Todos/Entregue/Em andamento/Sem começar acima do quadro, com contagem; clicar filtra as linhas.
- **Entrega:** `assets/js/indice-aula-progresso-filtro.js` (novo; `criarFiltroProgressoAula`), `assets/js/indice-aula-progresso-quadro.js` (coloca a barra acima da tabela), `assets/js/atividades-crud-modal.js` (carrega o script) e `assets/css/indice-aula-progresso.css` (estilos) · **Verificação:** `node --check` ok nos 3 JS; leitura do código: Entregue = entregou alguma atividade, Em andamento = está fazendo alguma, Sem começar = nenhuma começada; contagem por filtro; "Todos" ao abrir; aviso quando nenhum aluno cai no filtro; sem leitura de banco; o teste na tela só o usuário confirma (sem navegador).
