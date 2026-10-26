# ETAPA 534 — Reduzir as atividades 168 e 190 (Fundamentos de UI / UX)

- **TASK:** #387 (pedida em 2026-10-26)
- **Nível:** `PESADO` (só Sonnet; apaga dados no banco; pedido direto do usuário)

## Pedido

Atividade 168: deixar só a alternativa A em cada questão e só 10 questões. Atividade 190: deixar só
20 perguntas.

## Decisões (aprovadas pelo usuário em 2026-10-26)

- "Alternativa A" da 168 = tópico 1; tópico 1 passou a valer 1,0 por item (10 itens = 10,0).
- Exclusão definitiva confirmada; backup das linhas apagadas antes.

## Itens

| Item | Descrição | Status |
|---|---|---|
| 387.1 | 168: mantidos itens 1–10 com tópico 1 (60 → 10 linhas em `topico_discursivo`); pontos = 1,0; `total_itens` = 10 | ✅ 2026-10-26 |
| 387.2 | 190: mantidas questões 1–20 (gabarito 50 → 20; 1 resposta de teste >20 apagada); `total_itens` = 20 | ✅ 2026-10-26 |

**Backups:** `topico_discursivo_backup_20261026_168` (60), `gabarito_backup_20261026_190` (50),
`resposta_atividade_backup_20261026_190` (1).
**Verificação:** consulta após a mudança: 168 = 10 tópicos somando 10,00; 190 = 20 gabaritos;
nenhuma entrega/resposta de aluno nas duas.
**Não feito:** as páginas HTML (`ATIVIDADE-PRATICA-AULA-01.html`, `ATIVIDADES-AULA-01-50-QUESTOES.html`)
não foram tocadas; se mostrarem as questões fixas no HTML, ajustar à parte.
