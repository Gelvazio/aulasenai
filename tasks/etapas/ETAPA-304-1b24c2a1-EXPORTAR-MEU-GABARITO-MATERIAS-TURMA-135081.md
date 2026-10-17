## Etapa 304-1b24c2a1 — "📄 Exportar Meu Gabarito" em todas as matérias da turma 135081 (CEPLAS TARDE)

**Tarefa:** #177-1b24c2a1-00ee-47b0-8b77-3c6611bad346 · **Pedido em:** 2026-10-15 15:41 · **Executor:** Claude Code (local · main)
**Pedido:** "em todas as materias da imagem, deve ter este botao *📄 Exportar Meu Gabarito*" (imagem da lista de turmas com "AI AOPL 2026/2 V1 · CEPLAS TARDE (135081)").
**Objetivo:** o aluno da turma 135081 tem o botão "📄 Exportar Meu Gabarito" em todas as atividades de todas as matérias dessa turma, como já está na ITIC (#84).
**Próximo passo:** 177.7 — aceite do usuário (entrar como ALUNO da turma 135081 numa atividade da ITIC; logado como professor o botão não aparece).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 177.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 15:41 | commit "criar #177" no remoto |
| 177.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 15:42 | "Em uso por" preenchido no remoto |
| 177.3 | Levantar as matérias da turma 135081 (banco e pastas) e as páginas de atividade de cada uma | ✅ Concluído | 2026-10-15 15:43 | banco: turma 135081 → curso 5 (Assistente de Operações Logísticas) → só a matéria 25 INTRODUCAO TIC; pasta do curso: só INTRODUCAO-TIC, com as 23 páginas já com o botão (#84). Outras matérias com folha de respostas e sem o botão: ANALISE_DADOS_APLICADA_GESTAO 10, FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO 15, FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO 14, INTRODUCAO_COMUNICACAO_ORAL_ESCRITA 4, REFORCO_LINGUAGENS 20, BANCO-DE-DADOS 40 (103 páginas) |
| 177.4 | Ligar o botão (`data-exportar-meu-gabarito="sim"`) nas páginas que faltam | ✅ Concluído | 2026-10-15 15:46 | decisão do usuário (2026-10-15 15:46): "Só a turma 135081". Nenhuma página falta: as 23 da ITIC já têm o atributo (#84, commit fc2927f); nenhum arquivo alterado |
| 177.5 | Atualizar `docs/regras/atividades.md`, o histórico e as tarefas por matéria (#83, #85 a #116) que esta cobrir | ✅ Concluído | 2026-10-15 15:46 | nada a atualizar: a regra já diz "Testes de Front-End e Introdução às TIC" (#84); as tarefas #83 e #85 a #116 continuam pendentes (fora do alcance escolhido) |
| 177.6 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ✅ Concluído | 2026-10-15 15:46 | `git push` sem erro |
| 177.7 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
