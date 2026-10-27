## Etapa 566-e5f92c47 — #419: Professor também vê só a quantidade mínima na prática

**Tarefa:** #419-e5f92c47 · **Pedido em:** 2026-10-27 17:30 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "professor tambem deve ver como aluno nestes casos, somente a quantidade minima" (Objetiva e Prática).
**Objetivo:** o professor ver, na objetiva e na prática, só as questões 1 até a quantidade mínima do banco, como o aluno.

**Análise (leitura do código):**
- Objetiva: o professor já vê só até o mínimo (`iniciarQuestoesAteMinimo` usa o mínimo mais usado em `minimo_questoes_aluno`, com fallback; e muda na hora pelo Cálculo Nota). Nada a mudar.
- Prática: o corte da #415 só vale para o aluno (`dados.minimoQuestoes` vem nulo para o professor); o professor vê todas.

### Escopo

- **Entra:** `limite-questoes-discursiva.js` (professor: mínimo mais usado em `minimo_questoes_aluno` da atividade, senão `atividade.minimo_questoes_entrega`) e `avaliacao-discursiva.js` (chamar para o professor); nota em `docs/regras/atividades.md` e `.claude/rules/atividades-banco.md`.
- **Não entra:** banco (sem SQL novo), objetiva (já correta), mínimo por turma.

### Critério de pronto

- `node --check` ok; lendo o código, professor da prática com mínimo 10 (mais usado) vê só as 10 primeiras; sem mínimo no banco vê todas.
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.

---

### #419.1 — Professor da prática vê só o mínimo

**Próximo passo:** classificar pelo Jev, reservar e implementar.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** professor abre a prática da 182 e vê só as questões 1 a 10; a objetiva segue cortando para ele.
