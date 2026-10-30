## Etapa 586-7a3f9c15 — #439: Tempos realistas nos projetos Scratch

**Tarefa:** #439-7a3f9c15 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "30 minutos é tempo suficiente?" → "MUDE" (ajustar os tempos por projeto).
**Objetivo:** o `Tempo:` de cada projeto reflete a estimativa: 01=30, 02=30, 03=40, 04=40, 05=45, 06=30, 07=40, 08=45, 09=50, 10=45, 11=40, 12=60 minutos.

### #439.1 — Atualizar os tempos nos 12 projetos
- **Nível:** LEVE — Jev (confiança 0,53 → matriz) · **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash · **Effort:** low
- **Verificação:** `grep -o "Tempo: [0-9]* min"` em cada projeto bate com a tabela.
