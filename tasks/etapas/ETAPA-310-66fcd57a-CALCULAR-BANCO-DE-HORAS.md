## Etapa 310-66fcd57a — Calcular o banco de horas (CONTROLE-HORARIOS.txt)

**Tarefa:** #183-66fcd57a-6a72-4dbb-b1e6-9b87bb946622 · **Pedido em:** 2026-10-15 20:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s4)
**Pedido:** "FAÇA OS CALCULOS E O TEXTO DE IA COMO PEDIDO" (campos `[IA DEVE CALCULAR]` e
`[IA DEVE ESCREVER]` de `GERADOR-AULAS/BANCO-HORAS-GELVAZIO-CAMARGO/CONTROLE-HORARIOS.txt`)
**Objetivo:** preencher total, hora extra do dia, horas para o sábado e motivo de cada dia.

### #183.1 — Preencher os cálculos e os motivos

**Próximo passo:** 👀 o usuário confere as contas e os motivos no arquivo.

- **Nível:** LEVE — só um `.txt`, contas de horário, sem código nem banco.
- **Descrição:** regra tirada dos modelos 22-09 e 24-09: total do dia = horas trabalhadas − 8 h;
  hora extra do dia = até 2 h; o que passa de 2 h vai para o sábado.
- **Critérios de aceitação:** nenhum `[IA DEVE ...]` sobrando no arquivo.
- **Premissa:** os dias que saem às 12:00/12:15 e voltam às 19:00 ou depois (29-09, 01-10, 08-10)
  foram escritos como aula em Salete, como nos modelos; os outros têm motivo só com os horários.
- **Entrega:** commit `feat(banco-horas)` desta tarefa (10 dias + sábado do 24-09) ·
  **Verificação:** script recalculou todos os dias e bateu com o arquivo; `grep "IA DEVE"` = 0.

### #183.2 — Calcular os sábados

**Pedido:** "LEIA DE NOVO E REFAÇA OS CALCULOS E O TEXTO DE IA COMO PEDIDO" (2026-10-15 20:20) —
o usuário acrescentou os blocos de sábado 03-10, 10-10 e 16-10 com `[IA DEVE ...]`.

**Próximo passo:** 👀 o usuário confere os sábados no arquivo.

- **Nível:** LEVE — só um `.txt`, contas de horário.
- **Descrição:** sábado = soma das "HORAS EXTRA SABADO" da semana anterior a ele.
- **Critérios de aceitação:** nenhum `[IA DEVE ...]` sobrando no arquivo.
- **Premissas:** início do sábado às 08:00 (o arquivo não diz o horário); 29-09 entra no sábado
  03-10 mesmo marcado "LANCADO?-SIM" (as horas do sábado ainda não foram lançadas); o bloco
  "16-10-2026-SABADO" ficou como está, mas 16-10-2026 é sexta (o sábado é 17-10).
- **Entrega:** 03-10 = 3:30 (08:00–11:30); 10-10 = 1:00 (08:00–09:00); 16-10 = 0:00 ·
  **Verificação:** somas conferidas com as "HORAS EXTRA SABADO" de cada semana; `grep "IA DEVE"` = 0.
