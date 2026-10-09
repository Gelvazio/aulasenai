> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 16 — Card do trabalho em equipe v2 com bloqueio/liberação no índice da ITIC (pedida em 2026-10-05)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 16.1 | Novo card "TRABALHO EM EQUIPE v2" em `INTRODUCAO-TIC/ATIVIDADES/index.html` (link para `ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html`) | ✅ Concluído | 2026-10-05 | Leitura do HTML |
| 16.2 | SQL `database/2026-10-05-trabalho-equipe-itic-atividade.sql` cadastrando v1 e v2 na `atividade` (aula 07, ativo) para aparecer o interruptor Bloquear | ✅ Concluído | 2026-10-05 | Mesmo modelo dos seeds das práticas (`on conflict (pagina)`) |
| 16.3 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 16.4 | Aplicar o SQL no Supabase (conector, a pedido do usuário) | ✅ Concluído | 2026-10-05 | Consulta: atividade ids 58 (v1) e 59 (v2), aula_id 27, ativo = true |
| 16.5 | Bloquear a v1 e deixar só a v2 liberada (pedido do usuário) | ✅ Concluído | 2026-10-05 | Consulta: id 58 (v1) ativo = false; id 59 (v2) ativo = true |
| 16.6 | Tirar `data-sem-bloqueio` do card da v1 (o atributo escondia o interruptor Bloquear) | ✅ Concluído | 2026-10-05 | Leitura do HTML: card v1 sem o atributo; página id 58 no banco |
| 16.7 | Nome "v1" no título do card do trabalho em equipe original | ✅ Concluído | 2026-10-05 | Leitura do HTML |
| 16.8 | Aceite do usuário | ⬜ Pendente | — | — |
