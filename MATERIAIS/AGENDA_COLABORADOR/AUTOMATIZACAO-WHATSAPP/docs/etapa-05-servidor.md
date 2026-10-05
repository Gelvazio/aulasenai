# Etapa 05 — Servidor HTTP, API REST e SSE

**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03

| Passo | Descrição | Status |
|-------|-----------|--------|
| 5.1 | `servidorHttp.js` + `resposta.js` (erros, corpo JSON limitado) | ✅ Concluído |
| 5.2 | `roteador.js` | ✅ Concluído |
| 5.3 | `arquivosEstaticos.js` | ✅ Concluído |
| 5.4 | `autenticacao.js` (cookie HttpOnly + Bearer, limite de tentativas) | ✅ Concluído |
| 5.5 | `eventosSse.js` | ✅ Concluído |
| 5.6 | Rotas de conexão, grupos, mensagens, busca, visão geral | ✅ Concluído |
| 5.7 | Configurações, uso de IA, sistema (resumos → etapa 7; alertas/regras → etapa 8) | ✅ Concluído |
| 5.8 | Barramento → SSE + encerramento gracioso (SIGINT/SIGTERM) | ✅ Concluído |
| 5.9 | Commit | ✅ Concluído |

Novos módulos: `src/servicos/servicoEstatisticas.js`, `src/servicos/servicoConfiguracoes.js`.

## Verificação executada (curl, servidor real na porta 3299, sem navegador)
Sem token → 401 · `/conexao` → `aguardando_qr` + QR PNG · `/grupos` → `[]` · `/visao-geral` →
KPIs + 7 dias · PUT configuração inválida → 400 · válida → salva · corpo não-JSON → 400 ·
busca com aspas → `[]` (sem erro FTS) · rota inexistente → 404 · `../.env` → 404 ·
login errado → 401, certo → Set-Cookie HttpOnly · CSP e nosniff presentes · SSE abre com `retry`.
