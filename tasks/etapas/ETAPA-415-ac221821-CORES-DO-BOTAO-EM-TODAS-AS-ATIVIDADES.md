## Etapa 415-ac221821 — #286: Cores do botão em todas as atividades

**Tarefa:** #286-ac221821-78bd-4c83-987d-e17b984d9bbc · **Pedido em:** 2026-10-18 20:02 · **Criada por:** Claude Code (Opus 5.5) (local · main · s17)
**Pedido:** "TAREFA 01-cada botao de atividade,deve ter o seguinte comportamento,em todas as
atividades, Se a atividade foi feita por completo, Deixe ele na cor de fundo leve Verde, Se tiver
algo pendente, cor de fundo que nem hoje amarelo;se nao foi feito,deixe em vermelho fraco e
piscando(efeitos de css)"
**Objetivo:** as 3 cores da #283/#284 (verde leve = completa, amarelo = pendente, vermelho fraco
piscando = não feita) valem no botão de **todas** as atividades, de todas as matérias.

### #286.1 — Conferir e aplicar as 3 cores em todas as atividades

**Próximo passo:** listar as páginas de índice de atividades que não carregam
`assets/js/indice-atividades-feitas.js` + `assets/css/indice-atividades-feitas.css` (feitos na
#283/#284) e ligar os dois nelas; conferir a regra de "completa × pendente × não feita".

- **Nível:** MEDIO — tela (JS/CSS), sem banco.
- **Modelo:** só Sonnet — nunca outro (#247)
- **Descrição:** a #284 corrigiu as cores; o pedido agora é valer em todas as atividades. Conferir
  em quais índices o módulo não roda e ligar; manter professor e visitante sem cor.
- **Critérios de aceitação:** todas as páginas de índice de atividades com o módulo de cores; 3
  cores conforme o pedido; `node --check` OK.
- **Entrega:** — · **Verificação:** —
