## Etapa 326-65a7038f — Bug: "Exportar Meu Gabarito" não aparece na atividade id 152

**Tarefa:** #199-65a7038f-5e37-4865-aa3b-9a8cd578e24b · **Pedido em:** 2026-10-16 11:02 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "BOTAO DE EXPORTAR GABARITO,N ESTA APARECENDO NA ATIVIDADE ID=152"
**Objetivo:** fazer o botão **Exportar Meu Gabarito** da #196 (etapa 323-bf204d96) aparecer na
discursiva id 152 para o aluno que já finalizou.

### #199.1 — Diagnosticar e corrigir o botão

- 2026-10-16 11:21 — reserva liberada a pedido do usuário (assumir a #200); quem pegar segue o próximo passo abaixo.

**Próximo passo:** 👀 o usuário escolhe como seguir: simular a página no Node (jsdom na pasta
temporária, sem navegador) ou mandar o aviso do console (F12) da página logado como aluno.

- **Diagnóstico (2026-10-16 11:15):** a página da 152 tem `data-exportar-meu-gabarito="sim"`,
  a atividade existe no banco com a mesma `pagina`, os 3 JS passam no `node --check` e nenhum
  arquivo do botão cai no `.vercelignore`. Pelo código (`montarPainel` em
  `assets/js/avaliacao-discursiva.js`), o botão é criado para **todo aluno logado** (desativado
  até a entrega) e **nunca para o professor** — igual às objetivas (#196.1). Hipótese: a
  conferência foi feita logado como professor.

- **Nível:** PESADO — envolve a conferência do aluno no banco (entrega) e o gabarito do aluno.
- **Critérios de aceitação:** aluno que finalizou a 152 vê o botão e exporta o PDF com as
  próprias respostas; aluno que não finalizou não vê.

### #199.2 — Aceite do usuário

**Próximo passo:** 👀 depois da #199.1, o usuário confere o botão na 152.
