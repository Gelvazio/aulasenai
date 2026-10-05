# ORIENTAÇÃO — WhatsApp (`src/whatsapp`)

Biblioteca: `@whiskeysockets/baileys` **7.0.0-rc14** (ESM, endereçamento LID). Versão fixada no
`package.json` (`--save-exact`). Antes de atualizar, ler o changelog: a API muda entre versões.

## `clienteWhatsapp.js` — `ClienteWhatsapp extends EventEmitter`
- `conectar()`: `useMultiFileAuthState(dados/sessao)` + `makeWASocket` com
  `markOnlineOnConnect: false`, `syncFullHistory: false`, sem link preview.
  ⚠️ **Não** sobrescrever `shouldSyncHistoryMessage` para `false`: o Baileys avisa que isso impede
  o mapeamento LID↔número e causa instabilidade (verificado em 2026-10-03).
- Eventos emitidos: `socket` (cada socket novo — outros módulos registram `sock.ev.on` aqui),
  `estado` (situação), `conectado` (socket aberto).
- Reconexão com backoff (1s → 60s); código 515 (`restartRequired`) reconecta na hora;
  401 (`loggedOut`) apaga `dados/sessao` e volta a gerar QR.
- `desconectarEApagarSessao()` (botão "Desconectar"), `encerrarSocket()` (shutdown).
- `obterSituacao()` → `{ estado, qr, usuario, atualizadoEm }` (QR em texto; a imagem é gerada na rota).
- `obterMeusJids()` → JIDs do usuário (PN e LID normalizados).
- **Proibido** chamar `sendMessage`, `readMessages`, `sendPresenceUpdate` aqui. Envio só na
  Etapa 13, em módulo próprio, travado para o próprio número.

## `sincronizadorGrupos.js`
- Ao conectar: `groupFetchAllParticipating()` → `grupos.salvarOuAtualizar` (novos entram com
  `monitorado = 0`). Ouve `groups.update`/`groups.upsert`. Emite `grupos:atualizados`.

## `normalizadorMensagem.js`
- `normalizarMensagem(msgBaileys, { meusJids, meuNumero })` → objeto do domínio ou `null`.
- Desembrulha efêmeras/visualização única com `normalizeMessageContent`.
- Mapa `EXTRATORES` (tipo Baileys → `{tipo, texto}`); novo tipo = nova entrada.
  Ignorados: protocolo, reações, votos de enquete etc. Desconhecido → `[nomeDoTipo]`.
- Autor: prefere `participantAlt` em formato `@s.whatsapp.net` (v7 usa LID em `participant`).
- `mencionaUsuario`: `contextInfo.mentionedJid` ∩ meus JIDs, ou `@<meu número>` no texto.
- `ehPergunta`: contém `?`. `deMim`: `key.fromMe` (autor "Você").

## `coletorMensagens.js`
- Ouve `messages.upsert` (tipos `notify` e `append`), grava só grupos com `monitorado = 1`,
  cria registro mínimo de grupo desconhecido e emite `mensagem:nova` (com `grupoNome`).
