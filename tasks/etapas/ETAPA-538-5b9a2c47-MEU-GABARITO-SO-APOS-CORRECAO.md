# ETAPA 538 — Exportar Meu Gabarito (práticas) só depois da correção

- **TASK:** #391 (pedida em 2026-10-26) · **Nível:** `MEDIO` (só Sonnet; pedido direto do usuário)

## Pedido

Nas atividades práticas, o aluno não pode exportar o gabarito até o professor corrigir; ao clicar em
"Exportar Meu Gabarito", mostrar alerta para aguardar a correção.

## Itens

| Item | Descrição | Status |
|---|---|---|
| 391.1 | `motivoBloqueio` no botão e adaptador das discursivas (nota ≠ NOTA → aviso, sem PDF); docs | ✅ 2026-10-26 |

**Verificação:** `node --check` nos dois JS. Não conferido no navegador (regra do projeto).
**Observação:** o critério é a nota do professor existir (`notas_media_final`); só correção da IA ainda
não libera.
