## Etapa 268-65b6af99 — Progresso da Turma visível para os alunos (sem notas e sem suspeita de cópia)

**Tarefa:** #141-65b6af99-1e73-47a6-b607 · **Pedido em:** 2026-10-14 16:22 · **Executor:** Claude Code (local · main)
**Pedido:** "crie 1 tarefa pra mostrar o progresso aos alunos, mas nao mostre notas e suspeita de
copia, e me pergunte se tem algo a mais que nao pode mostrar"
**Objetivo:** o aluno ver o próprio progresso na página da atividade, sem notas, sem suspeita de
cópia e sem dados de colegas.
**Próximo passo:** 268.5 — usuário entrar como aluno numa objetiva e numa discursiva e conferir o "📊 Meu progresso".

**Respostas (2026-10-14 16:25):** além de notas e suspeita de cópia, **não mostrar** faltas,
quantidade mínima, Gráficos e Cálculo Nota, nem quem entregou; o aluno vê **só a própria linha**
(sem colegas).

### Escopo

- **Entra:** na página da atividade (objetiva e discursiva), para o **aluno logado**, um quadro
  "📊 Meu progresso" com a **própria** linha: uma célula por questão (sem resposta · em andamento
  · completa, mesmas cores do professor), a barra e "N de T questões respondidas".
- **Não entra (não aparece para o aluno):** colegas, notas (parcial, final, IA, professor,
  acertos), suspeita de cópia, faltas, quantidade mínima, Gráficos, Cálculo Nota, situação
  "Entregue" e os filtros do professor.
- **Banco:** nada muda — o aluno já lê só as próprias respostas pelo RLS (`resposta_atividade`,
  `resposta_discursiva`); não usa `resumo_tentativas_atividade` (traz acertos).

### Plano

1. Módulo novo `assets/js/progresso-do-aluno.js` (+ CSS): lê a estrutura da prova pela página
   (`lerEstrutura` de `progresso-turma-fontes.js`) e as respostas do aluno na tentativa atual;
   desenha a linha e atualiza a cada 5 s. Não reaproveita o painel do professor (que tem notas e
   botões), só as cores.
2. Ligar para o aluno em `respostas-atividade.js` (objetivas) e `avaliacao-discursiva.js`
   (discursivas); professor continua com o painel atual.
3. Regra em `docs/regras/atividades.md`.

### Riscos

- Página que monta as questões de outro jeito → o quadro não aparece (sem erro). Plano B:
  ajustar a leitura da estrutura dessa página.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 268.1 | Detalhes com o usuário (o que mais esconder) | ✅ Concluído | 2026-10-14 16:25 | Respostas acima |
| 268.2 | Plano + aprovação | ✅ Concluído | 2026-10-14 16:27 | Usuário aprovou no chat ("sim") |
| 268.3 | Módulo `progresso-do-aluno.js` (usa o CSS do painel) + ligação em `respostas-atividade.js` e `avaliacao-discursiva.js` | ✅ Concluído | 2026-10-14 16:26 | `node --check` nos 3 JS; linhas novas ≤ 100; lê só `resposta_atividade`/`resposta_discursiva` do próprio aluno (sem `resumo_tentativas_atividade`) |
| 268.4 | Regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 16:26 | Leitura |
| 268.5 | Aceite do usuário (testar como aluno no navegador) | 👀 Aguardando o usuário | — | — |
