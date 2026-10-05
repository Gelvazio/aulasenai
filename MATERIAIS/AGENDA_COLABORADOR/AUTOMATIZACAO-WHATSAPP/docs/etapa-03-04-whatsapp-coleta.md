# Etapas 03 e 04 — Conexão WhatsApp e coleta de mensagens

**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03 (validação com celular pendente: 3.7 / 4.6)

| Passo | Descrição | Status |
|-------|-----------|--------|
| 3.1 | Tipos do Baileys 7.0.0-rc14 consultados no pacote instalado | ✅ Concluído |
| 3.2–3.4 | `clienteWhatsapp.js` (auth, estados, reconexão, logout) | ✅ Concluído |
| 3.5 | `sincronizadorGrupos.js` | ✅ Concluído |
| 3.6 | `desconectarEApagarSessao()` | ✅ Concluído |
| 3.7 | Leitura do QR pelo usuário | ⛔ Aguardando usuário (será feita pelo dashboard) |
| 4.1–4.2 | `normalizadorMensagem.js` | ✅ Concluído |
| 4.3–4.4 | `coletorMensagens.js` + evento `mensagem:nova` | ✅ Concluído |
| 4.5 | `src/index.js` (composição) | ✅ Concluído |
| 4.6 | Mensagens reais | ⛔ Aguardando usuário |

## Verificações executadas
- `npm run verificar` sem erros.
- Script temporário com 7 mensagens fictícias: texto, menção por LID, imagem efêmera, enquete V3,
  reação (ignorada), mensagem própria (`deMim`), conversa privada (ignorada) → resultados corretos.
- `DASHBOARD_TOKEN=teste node src/index.js` por 20s: banco criado, estado `conectando` →
  `aguardando_qr` (pasta `dados/` apagada depois).
