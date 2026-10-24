## Etapa 490-a8d24e63 — LINHA-ENTRE-ALUNOS: Linha separando um aluno do outro no quadro de progresso

**Tarefa:** LINHA-ENTRE-ALUNOS · **Pedido em:** 2026-10-24 14:10 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s490)
**Pedido:** "deve ter 1 linha separando 1 aluno e outro no quadro de progresso" (imagem: faixa vermelha entre o fim de um aluno e o nome do seguinte)
**Objetivo:** cada aluno do quadro de progresso é separado do próximo por uma linha horizontal visível, em todos os quadros, atividades e matérias (regra global).

### LINHA-ENTRE-ALUNOS.1 — Borda separadora entre as linhas de aluno no CSS

**Próximo passo:** — (concluída)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** só CSS e docs; sem JS, HTML nem banco; vale para todos os quadros (implementação única).
- **Critérios de Aceitação:** linha entre alunos; sem `!important`; linhas ≤ 100 caracteres; `atividades-banco.md` ≤ 5 KB.
- **Entrega:** `assets/css/progresso-turma-global.css`, `.claude/rules/atividades-banco.md`, `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` no commit desta entrega · **Verificação:** chaves balanceadas; sem `!important`; implementação única do quadro (vale para todas as atividades e matérias); executada pelo Sonnet 5.5 (PESADO, Jev); conferir na tela (sem navegador)
