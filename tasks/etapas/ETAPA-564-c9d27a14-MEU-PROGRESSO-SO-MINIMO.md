## Etapa 564-c9d27a14 — #417: "Meu progresso" do aluno mostra só as questões até o mínimo

**Tarefa:** #417-c9d27a14 · **Pedido em:** 2026-10-27 16:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "a barra de progresso, ainda mostra o total" (atividade objetiva 191: o quadro "📊 Meu progresso" lista 50 questões e "0 de 50", mas o aluno só vê 20).
**Objetivo:** o quadro "Meu progresso" do aluno contar e desenhar só as questões que ele vê (1 até a quantidade mínima do banco).

**Análise (leitura do código):**
- `progresso-do-aluno.js` monta as células e o "N de T" a partir de `lerEstrutura()` (`progresso-turma-fontes.js`), que lê todos os cards da página; na objetiva os cards fora do mínimo só ganham a classe `questao--fora-do-minimo` (não saem do DOM). Na prática discursiva as questões excedentes já saem do DOM (#415).

### Escopo

- **Entra:** `progresso-do-aluno.js` ignora as questões marcadas `questao--fora-do-minimo`; regra anotada em `docs/regras/atividades.md`.
- **Não entra:** Progresso da turma do professor, banco, regerar páginas.

### Critério de pronto

- `node --check` ok; lendo o código, o quadro do aluno só tem as questões visíveis e o total é o mínimo.
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.

---

### #417.1 — Meu progresso só com as questões visíveis

**Próximo passo:** (entregue) — nada; o usuário confirma na tela (objetiva 191 mostra 20 células e "de 20").

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** objetiva com mínimo 20 de 50 mostra 20 células e "N de 20 questões respondidas".
- **Entrega:** `assets/js/progresso-do-aluno.js` (`manterQuestoesVisiveisMeuProgresso`) e `docs/regras/atividades.md` · **Verificação:** `node --check` ok; leitura do código (o quadro é montado depois de `mostrarSoAteOMinimo`); o teste na tela só o usuário confirma (sem navegador).
