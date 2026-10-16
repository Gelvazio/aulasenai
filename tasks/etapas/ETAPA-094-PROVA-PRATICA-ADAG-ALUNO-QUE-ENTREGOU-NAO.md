> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 94 — Prova Prática ADAG (id 82): aluno que entregou não vê as respostas (tarefa pequena, 2026-10-08 15:59:36)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 94.1 | Campo `Ocultar respostas após entrega: sim` (gerador → `data-ocultar-respostas-entregue`); `carregarDiscursiva` nem lê as respostas do banco para aluno que entregou; campos vazios, sem barra do aluno, aviso no painel e tela limpa logo após entregar; professor sem mudança | ✅ Concluído | 2026-10-08 15:59:36 | `node --check`, `py_compile`; página regerada só com o atributo novo |
| 94.2 | Nome "Prova Prática 08-10-2026" reaplicado no HTML depois de regerar (3 trocas) | ✅ Concluído | 2026-10-08 15:59:36 | `grep` |
| 94.3 | Aceite do usuário (aluno que entregou abre a prova e não vê as respostas) | 👀 Aguardando o usuário | — | — |
