## Etapa 562-a7c41e90 — #415: Prática mostra ao aluno só as N primeiras questões (N = quantidade mínima)

**Tarefa:** #415-a7c41e90 · **Pedido em:** 2026-10-27 15:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "quero que aparece apenas as 10 primeiras que eu selecionei la na quantidade minima" (atividade id=182, ATIVIDADE-PRATICA-AULA-02; aluno testado Alberto Jhoan Arreaza Caraballo).
**Objetivo:** o aluno ver na prática só as primeiras N questões, onde N é a quantidade mínima definida pelo professor para ele.

**Análise (leitura do código e consulta ao banco):**
- Atividade 182: `total_itens` = 20, `minimo_questoes_entrega` = null; o aluno testado tem `minimo_questoes_aluno.minimo` = 10 e nenhuma linha em `questoes_nota_aluno`.
- A página `ATIVIDADE-PRATICA-AULA-02.html` tem as 20 questões fixas no HTML; hoje o mínimo só vale para nota e entrega, não esconde nada.

### Escopo

- **Entra:** script compartilhado das práticas discursivas que lê o N do aluno logado (`questoes_nota_aluno.quantidade`, senão `minimo_questoes_aluno.minimo`, senão `atividade.minimo_questoes_entrega`) e esconde as questões depois da N-ésima; ligado nas práticas; documentação em `docs/regras/atividades.md`.
- **Não entra:** banco (sem SQL novo), visão do professor (vê tudo), mudança de nota/entrega, regerar páginas.

### Critério de pronto

- `node --check` ok; funções ≤ 45 linhas; lendo o código, aluno com N=10 vê só as 10 primeiras; sem N, vê todas.
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.
- Média (JS + doc, sem banco): sem aprovação prévia.

---

### #415.1 — Esconder do aluno as questões depois da N-ésima

**Próximo passo:** (entregue) — nada; o usuário confirma na tela (aluno com mínimo 10 vê só 10 questões).

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** aluno com mínimo 10 vê só as 10 primeiras questões da prática; professor e aluno sem N veem todas.
- **Entrega:** `assets/js/limite-questoes-discursiva.js` (novo), `assets/js/avaliacao-discursiva.js` (`aplicarLimiteDeQuestoes`) e `docs/regras/atividades.md` · **Verificação:** `node --check` ok nos dois JS; leitura do código; o teste na tela só o usuário confirma (sem navegador).
