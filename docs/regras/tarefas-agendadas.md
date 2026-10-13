# ⏰ Regras — Tarefas agendadas (rotina que lê o quadro dos arquivos)

**Reescrita em 2026-10-13** (tarefa #29, decisão D1 do usuário): o quadro de tarefas tem **fonte
única nos arquivos** (`tasks/STATUS.md` + `tasks/etapas/` — regras em `.claude/rules/tasks/`). A fila
`tasks` do banco, a página `tasks.html`, a pasta `tasks/fila/` e o script
`scripts/tasks/sincronizar_tasks.py` foram desativados (a tabela continua no banco, sem uso). As
versões anteriores desta regra (agendador lendo a fila, 2026-10-11) estão no histórico do Git.

## 1. O que é

- ✅ **Uma rotina só** ("Tarefa Aulas Senai", conta do usuário), **de hora em hora**, das 01:03 às
  23:03 de Brasília. Hoje está **desligada**: falta o usuário vincular o repositório na rotina
  (item 140.6) e ligá-la.
- ✅ Cada execução é uma **sessão nova na nuvem**, ou seja, uma frente `nuvem · <sessão>` como
  qualquer outra: segue o `AGENTS.md` (tudo na `main`, sem PR, 1 commit + push por tarefa).
- ✅ A rotina **só faz tarefas do quadro**, no máximo **uma por execução**. Quadro sem tarefa
  livre para ela = não faz nada.
- ⚠️ O prompt da rotina no claude.ai ainda fala da fila do banco: **atualizar antes de ligar**
  (pendência da #29).

## 2. Passo a passo de cada execução

1. Anotar a hora de início (Brasília) e o nome da frente.
2. Inicialização: `.claude/rules/essentials.md` (trazer a `main`, ler `tasks/STATUS.md`, recados e
   seeds).
3. **Escolher a tarefa** como qualquer frente (`.claude/rules/tasks/frentes-e-reserva.md`): "Em uso
   por" = `—`, dependências ✅, maior prioridade; 🟢 Baixa só com orientação do usuário. Pular:
   - tarefa de **banco** (`.claude/rules/multiplas-ias.md`: só o Claude Code local);
   - tarefa marcada **(local)** (precisa da máquina do usuário);
   - tarefa cujo próximo item é do usuário (👀) ou está ⛔.
4. **Reservar** (commit + push imediatos) e ler a etapa: o **Próximo passo** diz o que fazer.
5. **Decidir:**
   - **Executar** quando o item cabe nas regras e está claro: fazer **um item por vez**, marcar na
     etapa (🔄 → ✅ com data e hora), atualizar o Próximo passo.
   - **Não executar** quando fere uma regra (segredo, gabarito no site, afrouxar RLS, apagar dados,
     mexer em tarefa de outra frente…), é ambíguo ou precisa de decisão do usuário: deixar o item
     👀 (ou ⛔) com o motivo na etapa, sem mexer em mais nada.
6. **Ao terminar a execução:** liberar a reserva ("Em uso por" = `—`), porque a próxima execução é
   outra frente; atualizar a linha da frente (`⏹️ Encerrada`); commit + push.
- ⛔ Nunca marcar ✅ o que não foi feito; nunca push forçado.

## 3. Log de cada execução

- O log ficava em `agendamento_tarefa_logs` no banco (SQL
  `database/2026-10-11-agendamento-tarefa-logs.sql`), gravado pelo conector.
- ⚠️ **Conflito a decidir pelo usuário antes de ligar a rotina:** a rotina roda na nuvem, e pela
  regra `multiplas-ias.md` sessão de nuvem não mexe no banco — isso vale também para o log e para a
  cópia das regras no banco (#26). Até a decisão, o registro de cada execução fica na própria etapa
  (item e Próximo passo) e na linha da frente.

## 4. Outras contas e IAs

- ✅ Outra conta do Claude ou outra IA (Gemini, Codex, Grok…) **não cria rotina própria**: pega
  tarefa pelo quadro, como qualquer frente (`.claude/rules/tasks/frentes-e-reserva.md`).
- ⛔ Nada de senha, chave, gabarito nem dado de aluno no quadro, nos recados ou nas etapas.
