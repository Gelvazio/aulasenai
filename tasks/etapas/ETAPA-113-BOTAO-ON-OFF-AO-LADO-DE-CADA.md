> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 113 — Botão ON/OFF ao lado de cada atividade em todos os índices (tarefa pequena, pedido em 2026-10-09 00:51)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 113.1 | `assets/js/indice-atividades-bloqueio.js`: um botão ON/OFF logo depois de cada atividade cadastrada (ON = liberada, OFF = bloqueada para a turma favorita), no lugar do interruptor por card; aluno vê 🔒 só na atividade bloqueada (card inteiro só trava com todas bloqueadas) | ✅ Concluído | 2026-10-09 00:55 | `node --check`; linhas ≤ 100; leitura do código (sem navegador) |
| 113.2 | `assets/css/indice-atividades-bloquear.css`: estilo do botão (verde ON / vermelho OFF), acima do véu do card e com área de toque maior no celular | ✅ Concluído | 2026-10-09 00:55 | Leitura do CSS |
| 113.3 | Regra global no `CLAUDE.md` (seção "BOTÃO ON/OFF AO LADO DE CADA ATIVIDADE", versão 2026-10-09 00:56:07 + histórico) e em `docs/regras/atividades.md` (substitui a regra do interruptor por card) | ✅ Concluído | 2026-10-09 00:56 | Leitura dos arquivos; link de `docs/regras/atividades.md` já lido pelo visualizador |
| 113.5 | Correção relatada pelo usuário (botão não aparecia): a constante `SELETOR_LINK_ATIVIDADE` já existia no `atividades-crud-modal.js` e o navegador recusava o script inteiro ("já declarado"); renomeada para `SELETOR_LINK_ATIVIDADE_BLOQUEIO` | ✅ Concluído | 2026-10-09 01:03 | `node --check`; nenhum outro nome global repetido entre os 16 scripts carregados nos índices |
| 113.4 | Aceite do usuário (abrir um índice de atividades como professor e como aluno) | ⬜ Pendente | — | — |
| 113.6 | Pedido do usuário (2026-10-09 01:00): ON/OFF da atividade nunca bloqueia o card; botão de bloqueio da AULA (`aulas.ativo`) antes de "Editar aula", único que bloqueia o card — **adiado para outra sessão** (decisão do usuário, 01:02): tarefa #16 do `TASKS.md` + regra pendente no `CLAUDE.md`. O módulo `indice-aula-bloqueio.js` começado nesta sessão foi apagado (desenho anotado na tarefa) | ⬜ Pendente (outra sessão) | — | Regra e tarefa registradas (versão 2026-10-09 01:03:11) |
