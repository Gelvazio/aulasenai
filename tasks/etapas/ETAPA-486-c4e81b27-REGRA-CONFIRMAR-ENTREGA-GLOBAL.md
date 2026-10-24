## Etapa 486-c4e81b27 — REGRA-CONFIRMAR-ENTREGA: Botão "Confirmar Entrega" do professor, regra global das atividades

**Tarefa:** REGRA-CONFIRMAR-ENTREGA · **Pedido em:** 2026-10-24 12:23 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s486)
**Pedido:** "nos quadros de progresso, ao lado de Confirmar Todas, deve ter um botão de nome *Confirmar Entrega*, isso só deve ser visível ao professor, e quando o professor clicar nele, deve entregar a atividade como está, mesmo que não tenha terminado. Anote esta regra de forma global, no gerador de atividades"
**Objetivo:** anotar nas regras globais das atividades (que valem para todos os geradores) que todo quadro de progresso da turma tem, ao lado de "Confirmar Todas", o botão "Confirmar Entrega" só para o professor.

### REGRA-CONFIRMAR-ENTREGA.1 — Escrever a regra em `.claude/rules/atividades-banco.md` e `docs/regras/atividades.md`

**Próximo passo:** acrescentar a regra "Confirmar Entrega" (texto abaixo) em `.claude/rules/atividades-banco.md` (seção de recursos que toda atividade tem, mantendo o arquivo ≤ 5 KB), em `docs/regras/atividades.md` (junto da seção "Confirmar Todas") e uma linha em `docs/HISTORICO-REGRAS.md`; não regenerar o `index.html` das regras.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **Fonte:** sinais
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** regra global (todas as matérias e todos os geradores de atividade): no quadro de progresso de cada aluno, ao lado do botão "Confirmar Todas", existe o botão **Confirmar Entrega**. (1) Só o perfil **professor** o vê (aluno nunca); a gravação continua protegida por RLS + JWT. (2) Ao clicar, a atividade do aluno é **entregue como está**, mesmo incompleta (questões sem resposta ficam em branco), sem exigir a quantidade mínima de questões. (3) Fica no código compartilhado do progresso (`assets/js/progresso-turma-global.js` e módulos ligados), nunca replicado por matéria. Implementar o botão não faz parte desta subtarefa: aqui só se anota a regra.
- **Critérios de Aceitação:** regra escrita nos dois arquivos e no histórico; `atividades-banco.md` com no máximo 5 KB; sem alterar JS, HTML nem banco.
- **Entrega:** — · **Verificação:** —
