# ORIENTAÇÃO — Agendador (`src/agendador`)

Sem dependências (sem node-cron): `setTimeout` com `unref()`.

## `agendador.js` — `Agendador`
- `agendarDiario({ nome, obterHorario, executar })` — horário `HH:MM` no fuso do `.env`.
- `agendarIntervalo({ nome, obterIntervaloMs, executar })` — próximo ciclo conta a partir do
  fim da execução anterior.
- Horário/intervalo são lidos **por função** a cada ciclo; `reagendar(nome)` aplica mudanças.
- Erro numa tarefa só é registrado no log; a tarefa continua agendada. `parar()` no shutdown.

## `iniciarAgendamentos.js`
| Tarefa | Quando | O que faz |
|--------|--------|-----------|
| `resumo-diario` | configuração `horario_resumo` | resumo de cada grupo monitorado nas 24h que terminam no horário |
| `limpeza-retencao` | 03:30 (`AGENDADOR.HORARIO_LIMPEZA`) | apaga mensagens mais velhas que `retencao_dias` |
| `analise-ia` | a cada `intervalo_analise_min` | `AnalisadorIa.analisarPendentes()` (só se ativada) |
| `perguntas-pendentes` | a cada 5 min | `MotorAlertas.verificarPeriodicas()` |

- Mudou `horario_resumo` ou `intervalo_analise_min` (evento `configuracao:alterada`) → reagenda.
- **Recuperação:** ao iniciar, roda o resumo diário da última janela já vencida. A tarefa é
  idempotente (`resumos.existe(grupo, diario, periodo_inicio)`), então não duplica.
- Sem chave da IA, o resumo diário não faz nada.

## `tarefas/resumoDiario.js`
`calcularUltimaJanela(horario, fuso)` → `{ desde, ate }` de 24h terminando na última ocorrência
do horário. Grupos com menos de `minimo_mensagens_resumo` mensagens na janela são pulados.
