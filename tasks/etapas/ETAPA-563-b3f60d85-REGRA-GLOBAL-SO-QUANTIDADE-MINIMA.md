## Etapa 563-b3f60d85 — #416: Regra global: Objetiva e Prática mostram só a quantidade mínima do banco

**Tarefa:** #416-b3f60d85 · **Pedido em:** 2026-10-27 16:10 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "esta regra deve ser global, pros 2 casos, sempre, Objetiva e Pratica" / "deve mostrar apenas a quantidade minima que esta no banco de dados" (atividade 191, ATIVIDADES-AULA-02-50-QUESTOES, 22 alunos com mínimo 20 no banco; a página mostrava as 50).
**Objetivo:** em toda atividade objetiva e prática, o aluno ver só as questões 1 até a quantidade mínima que está no banco, sem depender de atributo por página.

**Análise (leitura do código e consulta ao banco):**
- Prática discursiva: já corta pela #415 (`limite-questoes-discursiva.js`), em toda página que usa `avaliacao-discursiva.js`.
- Objetiva: `questoes-ate-minimo.js` já existe, mas só liga com `data-questoes-ate-minimo="sim"` no `<body>`; das 118 páginas que usam `respostas-atividade.js`, só 10 têm o atributo (a de 50 questões não).

### Escopo

- **Entra:** objetiva ligar por padrão (`data-questoes-ate-minimo="nao"` desliga) em `respostas-atividade.js` e `questoes-ate-minimo.js`; regra global registrada em `docs/regras/atividades.md` e `.claude/rules/atividades-banco.md`.
- **Não entra:** banco (sem SQL novo), mínimo por turma, regerar páginas, visão do professor (continua vendo todas).

### Critério de pronto

- `node --check` ok; lendo o código, objetiva sem atributo corta no mínimo do banco; "nao" desliga; prática segue cortando.
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.
- Média (JS + regra, sem banco): sem aprovação prévia.

---

### #416.1 — Objetiva corta no mínimo por padrão e registrar a regra global

**Próximo passo:** classificar pelo Jev, reservar e implementar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** objetiva sem atributo mostra só as questões 1 até o mínimo do aluno no banco; professor vê todas; regra global escrita.
