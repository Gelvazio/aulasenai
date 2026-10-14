## Etapa 160-d7ade403 — Tela e PDF só com as questões 1 até o mínimo (Testes de Front-End, Aula 02)

**Tarefa:** #33-d7ade403-0783-49be · **Pedido em:** 2026-10-14 09:45 · **Executor:** Claude Code (local · main)
**Pedido:** "NAS ATIVIDADES, ONDE TEM O BOTAO CALCULO NOTA, APOS CLICAR EM *QUANTIDADE MINIMA DE
QUESTOES, DEVE MOSTRAR NA TELA SOMENTE A QUANTIDADE MINIMA, DA 1 ATE O MINIMO* E AO EXPORTAR PDF
COMPLETO, TAMBEM DEVE EXPORTAR APENAS DA QUESTAO 1 ATE A QUANTIDADE MINIMO. COMECE NESTA AQUI
(ATIVIDADES-AULA-02-50-QUESTOES.html de Testes de Front-End) ... AGORA SO CRIE E FAÇA ESTA DAQUI"
**Objetivo:** depois de definida a Quantidade Mínima de Questões (🧮 Cálculo Nota), a página e o
"Exportar PDF (atividade completa)" mostram só as questões 1 até o mínimo.
**Próximo passo:** 160.6 — usuário testar a página (professor e aluno) e dar o aceite.

### Escopo

- **Entra:** só a página `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/
  ATIVIDADES-AULA-02-50-QUESTOES.html`, ligada pelo atributo `data-questoes-ate-minimo="sim"` no
  `<body>`; código comum em `assets/js/` (as outras matérias só precisam do atributo e da
  conferência — tarefa #34).
- **Não entra:** banco (nada muda no schema nem no RLS); discursivas e práticas; demais matérias.

### Decisões

- Aluno: vale o mínimo dele (`minimo_questoes_para_entregar`). Professor: ao aplicar no Cálculo
  Nota, a tela muda na hora; ao abrir a página, vale o mínimo mais usado nos registros de
  `minimo_questoes_aluno` da atividade (RLS: só as turmas dele). Sem mínimo, mostra todas.
- Ligado por atributo na página para cada matéria entrar na sua vez (pedido do usuário).

### Riscos

- Aluno que respondeu questões depois do mínimo deixa de vê-las (as respostas continuam valendo).
  Plano B: tirar o atributo da página.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 160.1 | Aprovação do usuário ("AGORA SO CRIE E FAÇA ESTA DAQUI") | ✅ Concluído | 2026-10-14 09:45 | Pedido do usuário no chat |
| 160.2 | Módulo `assets/js/questoes-ate-minimo.js` (esconder questões depois do mínimo, texto da barra de exportação, evento do Cálculo Nota) + CSS | ⬜ Pendente | — | `node --check` |
| 160.3 | `calculo-nota-progresso.js` avisa a página ao gravar o mínimo; `respostas-atividade.js` liga o módulo | ⬜ Pendente | — | `node --check` |
| 160.4 | PDF completo (`atividade.js`): só as questões visíveis, total e gabarito até o mínimo | ⬜ Pendente | — | `node --check` + leitura |
| 160.5 | Ligar a página da Aula 02 (`data-questoes-ate-minimo="sim"`) e registrar a regra em `docs/regras/atividades.md` | ⬜ Pendente | — | Leitura |
| 160.6 | Aceite do usuário (testar no navegador como professor e aluno) | ⬜ Pendente | — | — |
