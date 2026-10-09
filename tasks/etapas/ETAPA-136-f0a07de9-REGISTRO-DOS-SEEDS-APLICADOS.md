## Etapa 136-f0a07de9 — Registro dos seeds aplicados e item próprio em cada tarefa (tarefa pequena, pedida em 2026-10-09 19:19:18)

Pedido: "sim, faça a mudança nas regras e o item 125.8" (registro único dos seeds aplicados e item
"Aplicar os seeds no Supabase" em toda tarefa que gera seed).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 136.1 | `database/SEEDS-APLICADOS.md` criado (aplicados + gerados e ainda não aplicados) | ✅ Concluído | 2026-10-09 19:20 | Leitura; sem gabarito nem dado de aluno |
| 136.2 | `docs/regras/atividades.md`: regra "Seeds: aplicar só com pedido e registrar aqui" (item próprio na etapa, conferência e registro) e autorização de 2026-10-03 limitada ao plano daquela data | ✅ Concluído | 2026-10-09 19:21 | Leitura das duas passagens |
| 136.3 | Item 125.8 ("Aplicar os seeds no Supabase") na Etapa 125 | ✅ Concluído | 2026-10-09 19:21 | Leitura |
| 136.4 | `CLAUDE.md`: versão 2026-10-09 19:19:18, histórico (resumo + `docs/HISTORICO-REGRAS.md`) e índice das regras | ✅ Concluído | 2026-10-09 19:22 | Linha de versão no formato do `regras-modal.js` |
| 136.4a | Varredura de todas as regras que falam de aplicar seed (pergunta do usuário "Atualizou todas as regras?"): `docs/regras/atividades.md` (cadastro das objetivas e geração das pendentes), `docs/REGRAS-ATIVIDADE-PRATICA.md` (passo 6) e `CLAUDE.md` ("BANCO REAL ANTES DE ALTERAR O SCHEMA") passam a citar o item da etapa e o `database/SEEDS-APLICADOS.md` | ✅ Concluído | 2026-10-09 19:24 | `grep` de "seed" em `CLAUDE.md`, `docs/regras/` e `docs/REGRAS-ATIVIDADE-PRATICA.md`: nenhuma passagem de aplicar seed sem a regra nova |
| 136.4b | Pedido do usuário (2026-10-09 19:23:21): "Todos os seeds devem ter status de APLICADO, PENDENTE, CONCLUIDO" — registro refeito com os 69 seeds, cada um com status conferido no banco (atividade por página + quantidade de itens): 26 PENDENTE, 3 APLICADO, 40 CONCLUÍDO; regras atualizadas | ✅ Concluído | 2026-10-09 19:26 | Consulta de leitura em `atividade`, `gabarito` e `topico_discursivo`; script de comparação com os arquivos |
| 136.4c | Pedido do usuário (2026-10-09): aplicar os 3 seeds nunca aplicados — ITIC prática aula 06 **CONCLUÍDO** (nome da matéria corrigido; aplicado em 3 partes, id 102, conferido por md5); Comunicação Oral práticas 01 e 02 continuam **PENDENTE** (matéria e aulas não existem no banco; decisão do usuário) | ✅ Concluído | 2026-10-09 19:30 | Consulta de leitura + md5 igual ao do arquivo |
| 136.5 | Aceite do usuário | ⬜ Pendente | — | — |
