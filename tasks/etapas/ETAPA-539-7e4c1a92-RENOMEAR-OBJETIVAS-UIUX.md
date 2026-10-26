# ETAPA 539 — Renomear as atividades objetivas de Fundamentos de UI / UX

- **TASK:** #392 (pedida em 2026-10-26) · **Nível:** `MEDIO` (só Sonnet; pedido direto do usuário)

## Pedido

Em todas as atividades objetivas da matéria, o nome passa a ser "Atividade Objetiva Aula NN".

## Itens

| Item | Descrição | Status |
|---|---|---|
| 392.1 | `atividade.nome_atividade` dos ids 191–208 (aulas 02 a 19) = "Atividade Objetiva Aula NN"; a 190 (aula 01) já estava assim. "Avaliação Objetiva 01" não é atividade de aula e ficou igual | ✅ 2026-10-26 |

**Verificação:** `update ... returning` devolveu as 18 linhas com o novo nome. O índice lê o nome do banco.
