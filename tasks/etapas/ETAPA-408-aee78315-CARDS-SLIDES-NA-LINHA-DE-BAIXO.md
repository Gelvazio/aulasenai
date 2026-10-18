## Etapa 408-aee78315 — #279: Cards de aula do índice — Slides na linha de baixo e ações em coluna

**Tarefa:** #279 · **Pedido em:** 2026-10-18 19:20 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "DEIXE O LINK DE SLIDES, NA LINHA DEBAIXO, E DEIXE OS BOTOES DE ACAO DAS ATIVIDADES EM COLUNA
RETA, COMO SE FOSSE 1 TABELA, E ICONES COM AS MESMAS ALTURA E LARGURA" — com a imagem do card da
"AULA 03 — Navegação na Web e Pesquisa Acadêmica" (Id Aula 23): o botão "📕 Slides (PDF)" aparece à
direita da 2ª linha de atividade e os botões ON/OFF, ✏️ e ⊖ de cada atividade não formam colunas
alinhadas, com ícones de tamanhos diferentes.
**Objetivo:** no card de aula do índice de atividades, o link de Slides fica sozinho na linha de
baixo do card, e os botões de ação de todas as atividades ficam alinhados em coluna reta (como uma
tabela), com os ícones todos do mesmo tamanho.

### Pedido em 3 pontos

1. **Slides na linha de baixo:** o botão "📕 Slides (PDF)" sai da linha das atividades e vira uma
   linha própria, abaixo de todas as atividades do card.
2. **Ações em coluna reta (como tabela):** ON/OFF, ✏️, ⊖ e o que mais houver em cada atividade ficam
   alinhados em colunas, com a mesma posição em todas as linhas (como colunas de uma tabela).
3. **Ícones do mesmo tamanho:** todos os ícones/botões de ação com a mesma altura e a mesma largura.

### Escopo

- **Entra:** só o visual do card de aula do índice de atividades (CSS do card e o JS que monta o card,
  se o Slides precisar mudar de lugar no DOM).
- **Não entra:** banco, dados, RLS, regras de bloqueio, o conteúdo das atividades, o layout do celular
  além de manter a coluna única, e o visual de outras páginas.
- **Pronto quando:** os 3 pontos aplicados em todos os cards de aula dos índices de atividades, sem
  mudança no banco e sem erro de JS. ⚠️ Sem navegador (regra do projeto): conferir na tela é do
  usuário depois da entrega.
- **Regras que valem:** `docs/regras/atividades.md` (índices e cards) e
  `docs-antes-de-editar.md` — ler antes de editar.

### #279.1 — Slides na linha de baixo e ações em coluna no card de aula

**Próximo passo:** — (entregue em 2026-10-18 19:26).

- **Nível:** MEDIO — tela (CSS do card e o JS que monta o card), 2 arquivos; sem banco.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Executor:** DeepSeek Harness (deepseek-flash) (local · main)
- **Descrição:** (1) pôr o "📕 Slides (PDF)" numa linha própria abaixo das atividades; (2) alinhar
  ON/OFF, ✏️ e ⊖ em colunas fixas, iguais em todas as linhas; (3) dar a todos os ícones de ação a
  mesma altura e largura.
- **Critérios de aceitação:** os 3 pontos visíveis no card de todas as matérias; ON/OFF, ✏️ e ⊖ na
  mesma posição horizontal em todas as atividades do card; Slides abaixo das atividades; ícones do
  mesmo tamanho; celular continua em uma coluna; nada de banco.
- **Entrega:** `assets/js/indice-aula-grade-banco.js` — `desenharBotaoSlidesDoBanco()` põe o botão
  "📕 Slides" **depois do `div.acoes`** (linha própria abaixo das atividades) e não mais no `.topo`;
  a constante `SELETOR_TOPO_GRADE_BANCO` saiu (não era usada em outro ponto).
  `assets/css/indice-atividades.css` — (a) `--crud-tamanho-editar: var(--altura-controle-atividade)`
  no `:root` (o ✏️ e o − ficavam sem tamanho no computador, porque a variável só existia no
  `celular.css`; agora são círculos de 36 × 36, a mesma altura do ON/OFF); (b) `.aula >
  .btn[data-slides-aula]` com `align-self: flex-start` (linha de baixo); (c) em `@media (min-width:
  769px)`, `.acoes` vira grid `minmax(0, 1fr) auto auto auto`: coluna 1 = botão da atividade, coluna
  2 = ON/OFF, coluna 3 = ✏️, coluna 4 = −, todas alinhadas entre as atividades; botões do card
  (CADASTRAR ATIVIDADES, ON/OFF da aula, Editar, Excluir) ocupam a linha inteira (`grid-column: 1 /
  -1`). No celular/tablet (até 768 px) continua o flex em uma coluna.
- **Verificação:** `node --check assets/js/indice-aula-grade-banco.js` OK; `git diff --check` sem
  erro nos 2 arquivos; conferência das classes do card nos geradores (`indice-atividades-bloqueio.js`
  → `.interruptor-atividade`, `atividades-crud-modal.js` → `.crud-editar-atividade` e
  `.crud-desvincular-atividade`, `indice-aula-data.js` → `.interruptor-aula`, `.aula-data-botao`) —
  todas cobertas pelo grid; `celular.css` continua trocando `--crud-tamanho-editar` para o toque
  grande em ≤768 px; sem banco e sem navegador (conferir na tela é do usuário).
