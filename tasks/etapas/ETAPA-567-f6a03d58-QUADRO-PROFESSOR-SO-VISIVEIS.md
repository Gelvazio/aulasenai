## Etapa 567-f6a03d58 — #420: Quadro de progresso do professor (objetiva) só com as questões visíveis

**Tarefa:** #420-f6a03d58 · **Pedido em:** 2026-10-27 18:00 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "no quadro ainda mostra 50" (atividade objetiva 191, quadro "Progresso da turma" do professor com 50 células por aluno e "Quantidade Mínima de Questões: 50/50").
**Objetivo:** o quadro do professor desenhar e contar só as questões até o mínimo, como a página.

**Análise (leitura do código e do banco):**
- `lerEstruturaObjetiva` (`progresso-turma-fontes.js`) lê todos os cards `.aula-card.questao`, inclusive os escondidos pela classe `questao--fora-do-minimo`; o quadro é montado uma vez e usa esse total.
- No banco, Henrico, Ian, José Eduardo e Carla têm mínimo 20 na atividade 191; o "50/50" vem do total de questões lido da página (e, se persistir, de cache da página).
- A correção da #417 (quadro do aluno) ficou só em `progresso-do-aluno.js`; o certo é uma só, na leitura da estrutura.

### Escopo

- **Entra:** `lerEstruturaObjetiva` ignora as questões `questao--fora-do-minimo`; remover a função duplicada da #417 em `progresso-do-aluno.js`; nota em `docs/regras/atividades.md`.
- **Não entra:** banco, prática (as questões excedentes já saem do DOM), atualização ao vivo do quadro quando o mínimo muda sem recarregar.

### Critério de pronto

- `node --check` ok; lendo o código, o quadro do professor e o do aluno têm só as questões visíveis (20 de 50 na 191).
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.

---

### #420.1 — Estrutura da objetiva só com as questões visíveis

**Próximo passo:** classificar pelo Jev, reservar e implementar.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** quadro do professor da 191 com 20 células por aluno e "x/20".
