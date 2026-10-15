## Etapa 310-66fcd57a — Calcular o banco de horas (CONTROLE-HORARIOS.txt)

**Tarefa:** #183-66fcd57a-6a72-4dbb-b1e6-9b87bb946622 · **Pedido em:** 2026-10-15 20:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s4)
**Pedido:** "FAÇA OS CALCULOS E O TEXTO DE IA COMO PEDIDO" (campos `[IA DEVE CALCULAR]` e
`[IA DEVE ESCREVER]` de `GERADOR-AULAS/BANCO-HORAS-GELVAZIO-CAMARGO/CONTROLE-HORARIOS.txt`)
**Objetivo:** preencher total, hora extra do dia, horas para o sábado e motivo de cada dia.

### #183.1 — Preencher os cálculos e os motivos

**Próximo passo:** —

- **Nível:** LEVE — só um `.txt`, contas de horário, sem código nem banco.
- **Descrição:** regra tirada dos modelos 22-09 e 24-09: total do dia = horas trabalhadas − 8 h;
  hora extra do dia = até 2 h; o que passa de 2 h vai para o sábado.
- **Critérios de aceitação:** nenhum `[IA DEVE ...]` sobrando no arquivo.
- **Entrega:** commit desta tarefa · **Verificação:** contas conferidas uma a uma; `grep "IA DEVE"` vazio.
