## Etapa 409-d10d6f43 — #280: Remover o botão "CADASTRAR ATIVIDADES" dos cards do índice

**Tarefa:** #280 · **Pedido em:** 2026-10-18 19:31 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "REMOVA ESTE BOTAO *CADASTRAR ATIVIDADE* DE TODOS OS CARDS"
**Objetivo:** o card de aula do índice de atividades deixa de mostrar o botão
"🗂️ CADASTRAR ATIVIDADES"; o cadastro/edição continua sendo aberto pelo modal da aula
("➕ Nova atividade nesta aula") e pelo ✏️ de cada atividade.

### Escopo

- **Entra:** tirar a criação do botão no JS do modal, limpar o que sobrou dele (seletor de deduplicação
  no JS da grade, CSS da classe e comentários) e atualizar os docs que descrevem o botão.
- **Não entra:** o modal de cadastro/edição em si (continua igual), os botões ✏️ e "−", o ON/OFF das
  atividades e da aula, e o banco.
- **Pronto quando:** nenhum card de nenhum índice tem o botão "🗂️ CADASTRAR ATIVIDADES"; o modal
  continua abrindo pelo "➕ Nova atividade nesta aula" e pelo ✏️; sem erro de JS.
- ⚠️ Sem navegador: a conferência final na tela é do usuário.

### #280.1 — Tirar o botão dos cards e limpar o que sobrou

**Próximo passo:** ler os pontos que criam o botão e seguir a lista de entrega abaixo.

- **Nível:** MEDIO — tela: 2 JS + 1 CSS e a documentação do botão; sem banco e sem lógica nova.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** (1) `atividades-crud-modal.js`: não criar mais o botão em cada card (sai a
  constante `TEXTO_BOTAO_CRUD`, a função `adicionarBotaoCrudAoCard` e a chamada dela no
  `iniciarCrudAtividades`); (2) `indice-aula-grade-banco.js`: sai a deduplicação de
  `.crud-botao-card` (`SELETOR_BOTAO_CADASTRAR_GRADE_BANCO` e o trecho de `elementoForaDoCard`);
  (3) `atividades-crud-modal.css`: sai a regra `.crud-botao-card`; (4) comentário do grid em
  `indice-atividades.css` deixa de citar o botão; (5) `docs/crud-atividades-modal-index.md` e
  `docs/regras/assets-e-geradores.md` passam a dizer que o modal abre pelo "➕ Nova atividade nesta
  aula" do modal da aula (e pelo ✏️), não por um botão em cada card.
- **Critérios de aceitação:** nenhuma referência de código cria ou estiliza o botão; o modal de CRUD
  continua acessível pelo modal da aula e pelo ✏️; `node --check` nos 2 JS; docs sem dizer que há
  botão em cada card.
- **Verificação:** `node --check` nos 2 JS; busca por "CADASTRAR ATIVIDADES"/`crud-botao-card` no
  repositório; leitura dos docs alterados; sem banco e sem navegador.
- **Entrega:** — · **Anotação:** —
