## Etapa 578-e8a41c07 — #431: Card da aula verde para o professor ignora atividade bloqueada

**Tarefa:** #431-e8a41c07 · **Pedido em:** 2026-10-29 09:55 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "a id=99 nao deve considerar, pois esta bloqueada" (Aula 01 de TESTES-DE-FRONTEND: os 5 alunos entregaram a objetiva ID 96, mas o card não fica verde porque a prática ID 99 está bloqueada).
**Objetivo:** para o professor, atividade bloqueada na turma deixa de contar na cor do card da aula; o verde passa a depender só das atividades liberadas.

### Escopo
- Entra: `estadoDoCardPendentes` em `assets/js/indice-atividades-pendentes.js`: atividades bloqueadas são ignoradas; verde = há ao menos 1 atividade liberada com questão, nenhuma pendente; todas bloqueadas = sem cor.
- Entra: comentários/texto do aviso e orientação em `docs/` que descrevam a regra antiga.
- Não entra: banco (a RPC `atividades_pendentes_turma` já devolve `bloqueada` e já não conta bloqueada nos pendentes), lado do aluno (o RLS já esconde a bloqueada), outras telas.

### Decisões
- 2026-10-29 — Usuário decidiu "a id=99 não deve considerar, pois está bloqueada" depois de eu apresentar as duas opções (manter ou mudar a regra). Vale como o "sim" da mudança.
- 2026-10-29 — Só JavaScript: sem mudança de banco, então não é tarefa grande.
- 2026-10-29 — Usuário: "esta regra é global, aplique já para tudo". O módulo é compartilhado (carregado por todo índice de atividades) e a RPC já serve todas as matérias; além do código, a regra vai para `.claude/rules/atividades-banco.md`.

### #431.1 — Ignorar atividade bloqueada no estado do card

**Próximo passo:** editar `estadoDoCardPendentes`, conferir com `node --check` e atualizar o comentário do arquivo e a orientação em `docs/`.

- **Nível:** PESADO — classificado pelo Jev (mensagem do usuário, confiança 0,83; sinal: massa, pois a regra vale para todas as matérias)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0,83)
- **Descrição:** hoje `temBloqueada` devolve '' (sem cor). Filtrar as bloqueadas antes: sem atividade liberada = ''; com liberada e pendente = pendente; senão = concluído.
- **Critérios de aceitação:** Aula 01 da turma 124519 (96 entregue por 5, 99 bloqueada) fica verde; aula só com bloqueadas fica sem cor; pendente continua vermelho.
- **Entrega:** — · **Verificação:** —
