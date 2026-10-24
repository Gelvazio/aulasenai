## Etapa 490-a8d24e63 — LINHA-ENTRE-ALUNOS: Linha separando um aluno do outro no quadro de progresso

**Tarefa:** LINHA-ENTRE-ALUNOS · **Pedido em:** 2026-10-24 14:10 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s490)
**Pedido:** "deve ter 1 linha separando 1 aluno e outro no quadro de progresso" (imagem: faixa vermelha entre o fim de um aluno e o nome do seguinte)
**Objetivo:** cada aluno do quadro de progresso é separado do próximo por uma linha horizontal visível, em todos os quadros, atividades e matérias (regra global).

### LINHA-ENTRE-ALUNOS.1 — Borda separadora entre as linhas de aluno no CSS

**Próximo passo:** em `assets/css/progresso-turma-global.css`, achar a classe da linha do aluno (`montarLinhaDoAlunoGlobal`, `assets/js/progresso-turma-global.js`) e acrescentar `border-bottom: 1px solid var(--progresso-turma-borda)` (com folga `padding-bottom`/`margin-bottom`), sem borda depois do último; registrar a regra em `.claude/rules/atividades-banco.md` (seção "Visual global"), `docs/regras/atividades.md` e `docs/HISTORICO-REGRAS.md`.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** só CSS e docs; sem JS, HTML nem banco; vale para todos os quadros (implementação única).
- **Critérios de Aceitação:** linha entre alunos; sem `!important`; linhas ≤ 100 caracteres; `atividades-banco.md` ≤ 5 KB.
- **Entrega:** — · **Verificação:** —
