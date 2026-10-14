## Etapa 209-70a67f33 — Botão "Exportar Meu Gabarito" (aluno): Testes de Front-End

**Tarefa:** #82-70a67f33-08c9-45e6 · **Pedido em:** 2026-10-14 10:44 · **Executor:** Claude Code (local · main)
**Pedido:** "DEVE TER UM BOTAO EM TODAS AS ATIVIDADES DE NOME *Exportar Meu Gabarito*, que so habilita quando a atividade ja esta com status=entregue, e este botao deve exportar o gabarito com as respostas do aluno,pra ser postada no Ambiente Virtual dele" · "crie 1 task ja em andamento aqui nesta sessao pra materia *TESTES-DE-FRONTEND* , e crie task pra todas as outras materias pra outras IA fazer" · "apos o professor liberar os gabaritos,na pagina de atividade do aluno,deve ir marcado SE O ALUNO ACERTOU OU NAO A ATIVIDADE OBJETIVA ,A PRATICA JA FAZ ISSO" · "E DEVE MOSTRAR A NOTA DO ALUNO TAMBEM,VEJA SE A NOTA ESTA SENDO MOSTRADA"
**Objetivo:** em toda atividade, o aluno tem o botão **"Exportar Meu Gabarito"**, habilitado só
depois que a atividade dele está entregue, que exporta um PDF com as respostas dele para postar no
Ambiente Virtual. Esta tarefa cria o recurso global e o liga em Testes de Front-End; as demais
matérias ficam nas tarefas #83 em diante. Também: depois que o professor libera os gabaritos da
turma, a página da **objetiva** do aluno marca em cada questão se ele acertou ou errou (como a
prática já faz) — recurso global no `atividade.js`, vale para todas as objetivas —, junto com a **nota do aluno**.

### Conferência da nota (leitura do código, 2026-10-14)

- **Objetiva:** a nota já aparece. Depois de entregar, o topo da página mostra o cartão
  **"RESULTADO — Sua nota: X (Nª tentativa)"** com "N acertos em M questões" e se atingiu o 7
  (`mostrarResultadoNoInicio` em `assets/js/respostas-atividade.js`; também no aviso da entrega).
  Não depende da liberação do gabarito. Falta só o ✅/❌ por questão depois da liberação (209.4b).
- **Prática/discursiva:** depois da liberação, mostra **"🎓 Sua nota"** (`notas_media_final`) e o
  selo de cada tópico (`assets/js/resultado-aluno-discursiva.js`); antes da correção, "⏳ Sua nota
  ainda está aguardando a correção do professor".
- O PDF do "Exportar Meu Gabarito" deve levar a nota também.
**Próximo passo:** 209.1 — respostas do usuário às perguntas abaixo (o que o PDF mostra).

### Perguntas ao usuário (antes do plano)

1. O PDF leva **só as respostas do aluno** (o que ele marcou/escreveu) ou também a **resposta
   certa** de cada questão? (A regra atual proíbe o aluno de ver a resposta certa antes do
   professor liberar o gabarito da turma.)
2. Mostra a nota/acertos? Cabeçalho com nome, turma, matéria, atividade e data/hora da entrega?
3. Vale para objetivas, práticas, discursivas e avaliações (todas as páginas de atividade)?
4. Com várias tentativas: exporta a última entregue?
5. Objetiva após a liberação: além de ✅/❌ em cada questão, mostra qual era a alternativa certa
   nas que ele errou?

### Páginas de Testes de Front-End (em 2026-10-14)

- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADE-PRATICA-AULA-01.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADE-PRATICA-AULA-02.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADE-PRATICA-AULA-03.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADE-PRATICA-AULA-04.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADE-PRATICA-AULA-05.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-03-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html`

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 209.1 | Respostas do usuário às perguntas acima | 👀 Aguardando o usuário | — | — |
| 209.2 | Plano na etapa (escopo, riscos, banco/RLS) + aprovação do usuário | ⬜ Pendente | — | — |
| 209.3 | Recurso global (módulo JS + CSS + o que o banco precisar), ligado por atributo no `<body>` | ⬜ Pendente | — | `node --check`; consultas ao banco |
| 209.4 | Ligar nas páginas de Testes de Front-End | ⬜ Pendente | — | Busca no código |
| 209.4b | Objetiva após liberar gabaritos: marcar acerto/erro de cada questão na página do aluno (global, como a prática), mantendo o cartão da nota | ⬜ Pendente | — | `node --check`; consulta ao banco |
| 209.5 | Documentação (`docs/regras/atividades.md`, `docs/database.md` se mudar o banco) | ⬜ Pendente | — | Leitura |
| 209.6 | Aceite do usuário (testar como aluno: antes e depois de entregar; objetiva antes e depois da liberação) | ⬜ Pendente | — | — |
