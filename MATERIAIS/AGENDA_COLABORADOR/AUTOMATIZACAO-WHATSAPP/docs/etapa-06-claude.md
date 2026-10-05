# Etapa 06 — Cliente da Claude API

**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03 (chamada real pendente: 6.6)

| Passo | Descrição | Status |
|-------|-----------|--------|
| 6.1 | Skill `claude-api` consultada: IDs, preços, effort, fallbacks, sem prefill | ✅ Concluído |
| 6.2 | `clienteClaude.js` — `enviar()` | ✅ Concluído |
| 6.3 | Retry/backoff + timeout | ✅ Concluído |
| 6.4 | `extratorJson.js` + `enviarJson()` com 1 correção | ✅ Concluído |
| 6.5 | Registro em `uso_ia` | ✅ Concluído |
| 6.6 | Chamada real | ⛔ Aguardando `ANTHROPIC_API_KEY` do usuário no `.env` |
| 6.7 | Commit | ✅ Concluído |

## Verificação executada (fetch simulado, script temporário)
529 com retry-after → repetiu; JSON inválido → 2ª chamada com instrução de correção → objeto
válido; Sonnet com `effort: medium`, `fallbacks: default` e cabeçalho beta; Haiku sem effort;
custo 1000/500 tokens Sonnet = US$ 0,007; recusa → 422; 400 → mensagem da API; sem chave → 503.
