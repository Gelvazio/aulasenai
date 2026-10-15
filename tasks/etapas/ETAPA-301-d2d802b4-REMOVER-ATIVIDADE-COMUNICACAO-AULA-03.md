## Etapa 301-d2d802b4 — Remover "Atividade Comunicação" e "Slide Comunicação" do card da Aula 03 (ITIC)

**Tarefa:** #174-d2d802b4-a2cc-4b1b-bd6a-b96b0161e0b5 · **Pedido em:** 2026-10-15 13:46 · **Executor:** Claude Code (local · main; desde 2026-10-15 14:13, local · main · s2)
**Pedido:** "AQUI, REMOVA ATIVIDADE COMUNICACAO" (imagem do card AULA 03 — Navegação na Web e Pesquisa Acadêmica, com o botão "Atividade Comunicação" e a chave ON ao lado marcados) e depois "E REMOVA TB SLIDE COMUNICACAO".
**Objetivo:** tirar os botões "Atividade Comunicação" (com a chave ON/OFF dele) e "Slide Comunicação" do card da Aula 03 no índice de atividades da ITIC.
**Próximo passo:** 174.6 — aguardar o aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 174.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 13:47 | commit "criar #174" no remoto |
| 174.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 13:47 | "Em uso por" preenchido no remoto |
| 174.3 | Localizar de onde vêm os dois botões (HTML da página ou banco) | ✅ Concluído | 2026-10-15 14:15 | os dois são links escritos no HTML do card AULA 03 em `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html` (`ATIVIDADES-AULA-28-09-2026-25-QUESTOES.html` e `3-O Ciclo do Feedback na Comunicação.pptx`); a chave ON/OFF é posta pelo `assets/js/indice-atividades-bloqueio.js` ao lado de cada link de atividade; nenhum script ou gerador recria esses links |
| 174.4 | Remover "Atividade Comunicação" e "Slide Comunicação" da Aula 03 | ✅ Concluído | 2026-10-15 14:15 | `git diff`: só as 2 linhas dos links saíram; sem os links, o ON/OFF também não aparece. A página da atividade, o `.pptx` e a atividade no banco ficaram como estavam (nada apagado); sem JS alterado; sem navegador (regra do projeto) |
| 174.5 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ✅ Concluído | 2026-10-15 14:15 | `git push` sem erro |
| 174.6 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
