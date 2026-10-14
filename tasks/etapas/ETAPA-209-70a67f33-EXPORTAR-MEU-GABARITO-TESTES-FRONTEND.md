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
**Próximo passo:** 209.2 — aguardar a aprovação do plano (Escopo/Riscos acima).

### Respostas do usuário (2026-10-14)

"1-SÓ RESPOSTAS DO ALUNO, 2-SIM, 3-SIM, 4-SAI COM A MAIOR NOTA,PODE NAO SER A ULTIMA, 5-SIM" ·
correção da 4: "NA VERDADE, NA OPCAO 4-SAI COM A ULTIMA,POIS COMO NA LIBERACAO SO LIBERA O QUE ELE
ERROU,NAO TEM COMO ELE FICAR COM NOTA MENOR QUE A TENTATIVA ANTERIOR"

| Pergunta | Decisão |
|---|---|
| 1. O que o PDF leva | Só as respostas do aluno (sem a resposta certa) |
| 2. Nota e cabeçalho | Sim: nota + nome, turma, matéria, atividade, data e hora da entrega |
| 3. Tipos | Todos: objetivas, práticas, discursivas e avaliações |
| 4. Tentativa | A **última entregue** (a nova tentativa só reabre o que ele errou; a nota não cai) |
| 5. Objetiva após a liberação | Sim: ✅/❌ em cada questão e a alternativa certa nas que ele errou |

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

### Escopo

- **Entra:**
  - Módulo global `assets/js/exportar-meu-gabarito.js` (botão + regra de habilitar) e
    `assets/js/exportar-meu-gabarito-pdf.js` (monta o PDF, padrão SENAI com jsPDF), + CSS. Ligado
    pelo atributo `data-exportar-meu-gabarito="sim"` no `<body>`, carregado por
    `respostas-atividade.js` (objetivas/avaliações objetivas) e `avaliacao-discursiva.js`
    (práticas/discursivas/avaliação prática), como o `marcar-entregue-professor.js`.
  - Botão **"📄 Exportar Meu Gabarito"** só para o **aluno**; desabilitado ("Disponível depois de
    entregar") até a **última tentativa liberada** estar entregue (`entrega_atividade`).
  - PDF: cabeçalho (nome, turma, matéria, atividade, tentativa, data e hora da entrega), **nota**
    (objetiva: `nota_da_tentativa` sobre o mínimo, máx. 10; prática/discursiva: `notas_media_final`
    ou "aguardando a correção do professor") e as **respostas do aluno** da última tentativa
    entregue (objetiva: questão + alternativa marcada, inclusive as herdadas; discursiva: tópico +
    texto). ⛔ Sem a resposta certa.
  - Objetiva depois da liberação dos gabaritos (`aluno_pode_ver_gabarito` → `solicitar_gabarito`):
    ✅/❌ em cada questão e a alternativa certa nas erradas, **global** em `respostas-atividade.js`
    (todas as objetivas), mantendo o cartão "RESULTADO — Sua nota".
  - Testes de Front-End: atributo nas 10 páginas (5 objetivas + 5 práticas).
  - Docs: `docs/regras/atividades.md` e `docs/HISTORICO-REGRAS.md`.
- **Não entra:** mudança no banco (tudo já existe, ver abaixo); as demais matérias (#83 a #116);
  o "Exportar Gabarito" atual (pedido de gabarito real).

### Banco (consultado em 2026-10-14, sem mudança)

| Precisa | Já existe (RLS: aluno lê só o próprio) |
|---|---|
| Respostas por tentativa | `resposta_atividade` (tentativa, herdada) e `resposta_discursiva` (tentativa) |
| Entregue? | `entrega_atividade` (tentativa, entregue_em) + `tentativa_atual(p_atividade)` |
| Nota | `nota_da_tentativa(p_atividade, p_tentativa)` e `notas_media_final(p_paginas)` |
| Gabarito liberado | `aluno_pode_ver_gabarito` (não registra pedido) e `solicitar_gabarito` |
| Turma | `turmaaluno` + `turma` |

### Riscos

| Risco | Plano B |
|---|---|
| PDF levar a resposta certa | O PDF só lê tabelas do próprio aluno; não chama `solicitar_gabarito` |
| Chamar `solicitar_gabarito` antes da liberação grava pedido em `tentativaacessogabarito` | Checar antes com `aluno_pode_ver_gabarito` |
| Páginas práticas sem jsPDF | Carregar o jsPDF do cdnjs (mesma versão 2.5.1) só ao clicar |
| Sem navegador para validar | `node --check` + leitura; teste na tela fica no aceite (209.6) |

### Decisões

| Quando | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-14 | Respostas 1–5 (tabela acima) | Usuário | Mensagens do usuário |
| 2026-10-14 | Sem mudança no banco | Claude Code | Consulta: tabelas, RLS e funções já cobrem |

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 209.1 | Respostas do usuário às perguntas acima | ✅ Concluído | 2026-10-14 10:47 | Respostas registradas acima (4 corrigida pelo usuário: última tentativa) |
| 209.2 | Plano na etapa (escopo, riscos, banco/RLS) + aprovação do usuário | 👀 Aguardando o usuário | — | — |
| 209.3 | Recurso global (módulo JS + CSS + o que o banco precisar), ligado por atributo no `<body>` | ⬜ Pendente | — | `node --check`; consultas ao banco |
| 209.4 | Ligar nas páginas de Testes de Front-End | ⬜ Pendente | — | Busca no código |
| 209.4b | Objetiva após liberar gabaritos: marcar acerto/erro de cada questão na página do aluno (global, como a prática), mantendo o cartão da nota | ⬜ Pendente | — | `node --check`; consulta ao banco |
| 209.5 | Documentação (`docs/regras/atividades.md`, `docs/database.md` se mudar o banco) | ⬜ Pendente | — | Leitura |
| 209.6 | Aceite do usuário (testar como aluno: antes e depois de entregar; objetiva antes e depois da liberação) | ⬜ Pendente | — | — |
