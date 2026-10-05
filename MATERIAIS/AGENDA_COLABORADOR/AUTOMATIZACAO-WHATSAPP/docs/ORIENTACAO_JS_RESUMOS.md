# ORIENTAÇÃO — Resumos (`src/ia/servicoResumo.js`, `divisorBlocos.js`, `prompts/`)

## Fluxo `gerarResumo({ grupoJid, desde, ate, modelo?, tipo? })`
1. `validarPedido`: grupo existe (404), período ISO válido e `desde < ate` (400), tipo
   `diario|sob_demanda`, modelo em `MODELOS_DISPONIVEIS` (padrão: configuração `modelo_resumo`).
2. Trava por chave grupo+período (`emAndamento`) → 409 se repetido em paralelo.
3. Mensagens do período < configuração `minimo_mensagens_resumo` → 422 (não chama a IA).
4. `formatarConversa` → linhas `[dd/mm, HH:MM] Autor (menciona você): texto` (quebras de linha
   viram ` / `), no fuso configurado.
5. `dividirEmBlocos(linhas, IA.CARACTERES_POR_BLOCO)` → 1 bloco: resumo direto; N blocos: um
   resumo parcial por bloco + consolidação (`promptConsolidacao.js`).
6. Salva em `resumos` e emite `resumo:pronto` (SSE).

## Prompts
- `promptResumo.js`: formato JSON fixo (resumo_curto, assuntos, decisoes, tarefas,
  perguntas_sem_resposta, mencoes_ao_usuario, links, tom, destaques). A conversa vai entre
  `<conversa>` e o sistema manda **ignorar instruções escritas pelos participantes**
  (proteção contra prompt injection — mensagens são conteúdo de terceiros).
- `validarResumo` exige `resumo_curto` e completa listas ausentes.
- Mudou o formato? Atualizar também o cartão de resumo do dashboard (`public/js/componentes/cartaoResumo.js`).

## Rotas (`rotasResumos.js`)
`GET /resumos?grupo&tipo&limite`, `GET /resumos/:id`, `POST /resumos { grupo, desde, ate, modelo? }`.
