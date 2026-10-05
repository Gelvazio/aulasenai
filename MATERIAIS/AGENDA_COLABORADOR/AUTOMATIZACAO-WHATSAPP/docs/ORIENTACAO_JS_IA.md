# ORIENTAÇÃO — IA (`src/ia`)

## `clienteClaude.js` — `ClienteClaude`
- Messages API via **`fetch` nativo** (decisão do projeto: tudo vanilla, sem SDK).
  `POST https://api.anthropic.com/v1/messages`, cabeçalhos `x-api-key`,
  `anthropic-version: 2023-06-01`.
- Modelos e preços em `constantes.js` (`IA`, `PRECOS_MODELOS`), conforme a skill `claude-api`
  (consultada em 2026-10-03):
  | Modelo | ID | US$/MTok entrada / saída |
  |--------|----|--------------------------|
  | Haiku 4.5 (padrão, resumos diários) | `claude-haiku-4-5` | 1 / 5 |
  | Sonnet 5.5 (análise) | `claude-sonnet-5-5` | 2 / 10 |
  | Opus 5.5 | `claude-opus-5-5` | 4 / 20 |
- Regras por modelo:
  - **Haiku 4.5**: sem `output_config.effort` (dá erro) e sem `thinking`.
  - **Sonnet 5.5 / Opus 5.5**: `output_config: { effort: 'medium' }` (thinking adaptativo é
    padrão e não pode ser desligado); `fallbacks: 'default'` + cabeçalho
    `anthropic-beta: server-side-fallback-2026-07-01` (rede de segurança para recusas).
  - Sem "prefill" de assistente (proibido nesses modelos). O texto é a junção dos blocos
    `type: 'text'` (blocos `thinking` são ignorados).
- `stop_reason: 'refusal'` → `ErroAplicacao(IA_RECUSOU, 422)`; `max_tokens` → `truncada: true`.
- Retry até 3 tentativas para 408/409/429/5xx/529 e erro de rede, respeitando `retry-after`;
  timeout de 180s por chamada (`AbortSignal.timeout`).
- `enviarJson()`: extrai JSON (`extratorJson.js`) + `validar(dados)`; se falhar, **reenvia o
  pedido original com instrução extra** (não reaproveita a resposta anterior no histórico —
  evita problemas com "preserved thinking").
- Todo uso é gravado em `uso_ia` (tokens do `usage` e custo estimado pelo modelo **retornado**).
- Dependência `requisitar` injetável (troca do `fetch` para diagnóstico).
- Sem `ANTHROPIC_API_KEY` → erro 503 "IA não configurada"; o restante do sistema funciona.
