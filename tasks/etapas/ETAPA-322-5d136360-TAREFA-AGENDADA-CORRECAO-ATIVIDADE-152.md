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

**Próximo passo:** — (entregue).

- **Nível:** PESADO — a tarefa grava no banco (notas da IA).
- **Entrega:** tarefa agendada `correcao-atividade-id-152` (título "CORRECAO ATIVIDADE ID=152",
  Claude desktop, **só manual**, modo Auto), no modelo da `correcao-ia-atividade-81` (#130): Parte 1
  = correção pela IA com as regras do `CORRECAO-PROVA-ADAG.md` (id 152, 20 questões de 1 tópico,
  0,5 ponto cada, individual; em branco depois da entrega = 0); Parte 2 = suspeita de cópia
  (`docs/regras/suspeita-copia-discursiva.md`). Grava só `nota_ia`, `comentario` e `nota_ia_em`;
  sem commit, sem navegador, sem nomes de alunos.
- **Verificação:** a ferramenta confirmou a criação ("Manual only"); banco lido antes: 20 tópicos
  com resposta esperada e critérios, 0,5 ponto cada (total 10), mínimo 20 questões.

### #195.2 — Rodar a primeira vez e conferir

**Próximo passo:** — (entregue).

- **Nível:** PESADO — banco (conferência das notas gravadas).
- **Entrega:** 1ª execução manual em 2026-10-16 10:22 (sessão `local_d06374a6`), terminou com
  sucesso às 10:23: corrigiu as 2 alternativas que existiam respondidas naquela hora (1 aluno),
  com comentário `[IA]`; 0 suspeitas de cópia.
- **Verificação:** banco às 10:42 — 2 linhas em `correcao_discursiva` com `nota_ia` e comentário
  `[IA]`, 0 com `nota_professor`, 0 suspeitas. Depois da rodada os alunos continuaram respondendo
  (21 alunos, 81 respostas, 1 entrega às 10:42): para corrigir essas, rodar a tarefa de novo.

### #195.3 — Aceite do usuário

**Próximo passo:** — (aceite do usuário em 2026-10-16 21:08: "Aceito tudo").
Run now) quando quiser corrigir as respostas novas e confere as notas sugeridas pela IA em
`correcao-discursiva.html`.

- **Nível:** LEVE — conferência do usuário.
