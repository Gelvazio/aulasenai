## Etapa 322-5d136360 — Tarefa agendada manual "CORRECAO ATIVIDADE ID=152"

**Tarefa:** #195-5d136360-e22c-49bd-a227-0451222f23f2 · **Pedido em:** 2026-10-16 10:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "CRIE 1 TAREFA AGENDADA NO CLAUDE DE NOME *CORRECAO ATIVIDADE ID=152*, QUE DEVE RODAR
APENAS MANUAL,SO RODE ELA A PRIMEIRA VEZ, E ELA DEVE EXECUTAR A CORRECAO DA ATIVIDADE ID=152"
**Objetivo:** ter no app do Claude uma tarefa agendada **só manual** (sem horário) que faz a
correção pela IA da discursiva id 152 (Atividade de Sala 16/10 da ITIC, #191), e rodá-la uma vez.

### Escopo

- **Entra:** tarefa agendada no Claude desktop, sem `cron` (só "Run now"), no modelo da correção
  agendada da atividade 81 (#130, etapa 257-bddd56f9): grava só a sugestão da IA
  (`nota_ia`, `comentario`, `nota_ia_em` em `correcao_discursiva`), nunca `nota_professor`; sem
  commit; uma execução agora.
- **Não entra:** horário automático; mudar páginas ou o banco fora das sugestões da IA.

### Decisões

- 2026-10-16 10:20 — **Aprovação:** o pedido já traz nome, modo (só manual), atividade e a ordem
  de rodar uma vez; a tarefa só grava a sugestão da IA (a nota que vale continua sendo a do
  professor). Registrado por Claude Code (Opus 5.5) (local · main · s6).

### #195.1 — Criar a tarefa agendada manual

**Próximo passo:** ler o roteiro de correção (`CORRECAO-PROVA-ADAG.md`, regras da discursiva e da
suspeita de cópia) e o banco da atividade 152; escrever o prompt e criar a tarefa.

- **Nível:** PESADO — a tarefa grava no banco (notas da IA).

### #195.2 — Rodar a primeira vez e conferir

**Próximo passo:** depois da #195.1, rodar a tarefa uma vez e conferir no banco o que ela gravou.

- **Nível:** PESADO — banco (conferência das notas gravadas).

### #195.3 — Aceite do usuário

**Próximo passo:** 👀 o usuário confere as notas sugeridas pela IA na correção da atividade 152.

- **Nível:** LEVE — conferência do usuário.
