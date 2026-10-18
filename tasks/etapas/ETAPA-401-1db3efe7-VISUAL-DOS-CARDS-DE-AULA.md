## Etapa 401-1db3efe7 — #274: Visual dos cards de aula

**Tarefa:** #274 · **Pedido em:** 2026-10-17 22:27 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** “MELHORE A VISUALIZACAO DA DESCRICAO DA ATIVIDADE,ESTA QUEBRANDO TEXTO EM 2 LINHAS E N DEVIA, DEIXE O LABEL LARANJA MAIS LARGO, E ATE OS CARDS MAIS LARGOS, E DEIXE OS BOTOES DE ON/OFF DA MESMA ALTURA, E EDITAR TAMBEM E REMOVER, DE MAIS DESTAQUE AO ICONE DE REMOVER,COM VERMELHO MAIS VIVIDO;COLOQUE O LINK DE SLIDE EM CIMA DO LADO DIREITO DO NOME AULA NN, O BOTAO AULA LIBERADA E AULA BLOQUEADA, DEVE OCUPAR 100% DA LARGURA DO CARD”
**Objetivo:** cards de aula do índice de atividades mais largos e legíveis: nome da atividade numa linha, etiqueta laranja de ID mais larga, ON/OFF, ✏️ e "−" da mesma altura, "−" em vermelho vivo, "📕 Slides" no topo à direita de "AULA NN" e botão da aula com 100% da largura.

### #274.1 — Ajustar o visual dos cards de aula
**Próximo passo:** ler as regras de CSS dos cards (indice-atividades.css, atividades-crud-modal.css, indice-atividades-bloquear.css, indice-aula-data.css, celular.css) e ajustar; mover o botão "📕 Slides" para o topo do card.
- **Nível:** PESADO — mais de 3 arquivos ligados (4 a 5 CSS do card e o JS da grade).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** largura mínima maior da grade; nome da atividade sem quebrar; etiqueta "ID NN" mais larga; ON/OFF, ✏️ e "−" com a mesma altura do link; "−" vermelho vivo; "📕 Slides" no topo à direita do rótulo; botão "Aula liberada/bloqueada" com 100% da largura; celular continua em uma coluna.
- **Critérios de Aceitação:** os 7 pontos do pedido aplicados a todos os índices de atividades; sem mudança no banco.
- **Entrega:** — · **Verificação:** —