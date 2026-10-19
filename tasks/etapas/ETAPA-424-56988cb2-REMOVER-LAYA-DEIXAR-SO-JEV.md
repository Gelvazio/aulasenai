## Etapa 424-56988cb2 — #295: remover o Laya e deixar só o Jev

**Tarefa:** #295-56988cb2-c3ed-4996-8cd1-7402822c17e7 · **Pedido em:** 2026-10-19 13:01 · **Criada por:** Claude Code (Opus 5.5) (local · main · s26)
**Pedido:** "CRIE 1 TAREFA PRA REMOVER O LAYA, E DEIXAR SO O JEV MESMO"
**Objetivo:** a skill `classificar-tarefa` deixa de consultar o Laya Server; o nível passa a vir só
do Jev, com os sinais da própria skill como reserva quando o Jev não responder.

### Onde o Laya aparece no projeto

Levantamento de 2026-10-19 13:00 (`grep -ri laya`, fora de `MATERIAIS/`, `Python/`, `rules-local/`
e arquivos gerados): só nas duas cópias da skill —
`.claude/skills/classificar-tarefa/SKILL.md` (no Git) e `.agents/skills/classificar-tarefa/SKILL.md`
(pasta fora do Git). As citações em etapas antigas e no `task_complete.md` são histórico e não mudam.

### Decisões

- 2026-10-19 13:01 — Claude Code (Opus 5.5): sem o Laya, quando o Jev não responder (sem
  `TYPESAFE_API_KEY`, `JEV_MODO=off` ou falha) a skill usa **só os sinais** da própria skill
  (tabela de níveis), e na dúvida sobe o nível; nunca libera em silêncio. O rollback continua
  `JEV_MODO=off`.
- 2026-10-19 13:08 — Gelvazio: "A REGRA LOCAL DEVE SER 1 ESPELHO DA REGRA GLOBAL". A regra
  `jev.md` muda na fonte (`rules-ai`, tarefa **JEV-SEM-LAYA**, etapa 028-8fe0b340, decisão C42) e
  chega a `rules-local/` pela sincronização (nunca editar `rules-local/` à mão). Esta tarefa só
  ajusta a skill do projeto, no mesmo sentido.

### #295.1 — Skill `classificar-tarefa`: tirar o Laya e deixar só o Jev

**Próximo passo:** ler as duas cópias da skill e tirar a seção "Pergunta ao Laya Server" e toda
citação ao Laya (descrição do frontmatter, ordem de decisão, fallback, exemplo de saída), deixando o
Jev como consulta e os sinais como reserva.

- **Nível:** LEVE — só `.md` (as duas cópias da skill), sem lógica nem banco.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** nas duas cópias: (1) remover a seção do Laya Server, o `answer_confidence` e o
  limiar 0,70; (2) a `description` do frontmatter passa a dizer "pelo Jev ou pelos sinais desta
  skill"; (3) ordem de decisão: Jev → sinais (se discordarem, vale o nível mais alto;
  `confianca` < 0,60 = decisão humana); (4) fallback sem Laya: sem chave, `JEV_MODO=off` ou falha
  → só os sinais; (5) exemplo de saída sem "Laya 0,82". As duas cópias ficam iguais.
- **Critérios de aceitação:** `grep -i laya` nas duas cópias não acha nada; o passo do Jev, o
  fallback pelos sinais e o rollback `JEV_MODO=off` continuam; nenhum outro arquivo do projeto muda;
  commit + push na `main`.
- **Entrega:** — · **Verificação:** —
