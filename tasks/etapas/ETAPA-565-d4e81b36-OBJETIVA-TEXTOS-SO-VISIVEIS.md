## Etapa 565-d4e81b36 — #418: Objetiva conta só as questões visíveis nos textos de entrega e na folha

**Tarefa:** #418-d4e81b36 · **Pedido em:** 2026-10-27 17:05 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "sim" (corrigir os textos da objetiva que ainda usam o total, depois de conferir que a entrega vale pelo mínimo nas duas atividades).
**Objetivo:** para o aluno, a folha ("Respondidas: X de T"), o aviso de pendências e o "mínimo de N de T" usarem só as questões que ele vê.

**Análise (leitura do código e do banco):**
- A entrega já vale pelo mínimo no banco (`entrega_insert` → `atividade_completa` → `minimo_questoes_para_entregar`), nas duas atividades.
- Na objetiva, `estado.itens` (respostas-atividade.js) é lido antes do corte e inclui as questões escondidas; por isso folha e avisos mostram o total (50) e listam as escondidas como pendentes.

### Escopo

- **Entra:** `respostas-atividade.js`: aplicar o corte (`mostrarSoAteOMinimo`) antes de montar a folha e, só para o aluno, manter em `estado.itens` as questões visíveis; nota em `docs/regras/atividades.md`.
- **Não entra:** banco, prática (já correta), visão do professor.

### Critério de pronto

- `node --check` ok; lendo o código, aluno com mínimo 20 de 50 tem `estado.itens` com 20 questões (folha "de 20", pendências só entre 1 e 20).
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.

---

### #418.1 — Folha e avisos da objetiva só com as questões visíveis

**Próximo passo:** (entregue) — nada; o usuário confirma na tela (objetiva 191: "Respondidas: X de 20").

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** aluno com mínimo 20 de 50 vê "Respondidas: X de 20" e as pendências só entre as 20 visíveis.
- **Entrega:** `assets/js/respostas-atividade.js` (`manterSoQuestoesVisiveisDoAluno`; corte antes da folha) e `docs/regras/atividades.md` · **Verificação:** `node --check` ok; leitura do código; o teste na tela só o usuário confirma (sem navegador).
