## Etapa 143-d30a9c4d — Atividades só no banco, layout global e pasta da matéria sem HTML (pedida em 2026-10-11 06:01)

**Tarefa:** #25-b3e29764-940b-4a82
**Próximo passo:** 25.2 — aceite do usuário da regra; depois 25.3 (#25.01 — levantamento).

Tarefa #25-b3e29764-940b-4a82. Pedido: "As perguntas das atividades prática e objetiva devem ficar apenas no banco
de dados, anote esta regra no claude.md"; "Atividade prática e objetiva deve usar layout global e
não ficar criando do zero em cada aula"; "Nas pastas de aulas deve ter apenas conteúdos, e nada de
HTML, deve vir tudo do global, anote esta regra no claude.md".
Frente: nuvem · ccr-be208aef-c6h8oe.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 25.1 | Regra no `CLAUDE.md` (seção nova, item em "valem sempre", versão 2026-10-11 06:01:03 e histórico) + aviso de transição em `docs/regras/materias.md`, `docs/regras/atividades.md` e `docs/REGRAS-ATIVIDADE-PRATICA.md`; tarefa #25-b3e29764-940b-4a82 no `TASKS.md` | ✅ Concluído | 2026-10-11 06:01 | Leitura; visualizador conferido com `node` (versão e índice) |
| 25.1b | Fila com `ordem` e `task_dependente` (SQL aplicado; `pegar_proxima_task` só pega com as dependentes concluídas; teste em transação desfeita) + página (`Ordem`, `Depende de`, ✅ Concluir) + script (`consulta` com datas de Brasília) + regra; #25 dividida em 22 sub-tasks (ids 19 a 40) com `tasks/fila/TASK-0019.md` a `TASK-0040.md` | ✅ Concluído | 2026-10-11 06:07 | md5 do JSON copiado = md5 do banco (`aa91c70d…`); 22 de 22 sincronizadas; `node --check` ok |
| 25.2 | Aceite do usuário da regra | ⬜ Pendente | — | — |
| 25.3 | #25.01 — Levantamento das atividades em HTML | ⬜ Pendente | — | — |
| 25.4 | #25.02 — Plano da migração | ⬜ Pendente | — | — |
| 25.5 | #25.03 — 👤 Aprovação do plano (usuário) | ⬜ Pendente | — | — |
| 25.6 | #25.04 — Banco: questões objetivas no banco | ⬜ Pendente | — | — |
| 25.7 | #25.05 — Script de carga das questões objetivas | ⬜ Pendente | — | — |
| 25.8 | #25.06 — Banco: prática pronta para a página global | ⬜ Pendente | — | — |
| 25.9 | #25.07 — Página global da atividade objetiva | ⬜ Pendente | — | — |
| 25.10 | #25.08 — Página global da atividade prática | ⬜ Pendente | — | — |
| 25.11 | #25.09 — Índice global de atividades da matéria | ⬜ Pendente | — | — |
| 25.12 | #25.10 — Piloto: Testes de Front-End | ⬜ Pendente | — | — |
| 25.13 | #25.11 — 👤 Aceite do piloto (usuário) | ⬜ Pendente | — | — |
| 25.14 | #25.12 — Migrar Banco de Dados | ⬜ Pendente | — | — |
| 25.15 | #25.13 — Migrar Introdução à TIC | ⬜ Pendente | — | — |
| 25.16 | #25.14 — Migrar Análise de Dados Aplicada à Gestão | ⬜ Pendente | — | — |
| 25.17 | #25.15 — Migrar Fundamentos de Automação e Instrumentação | ⬜ Pendente | — | — |
| 25.18 | #25.16 — Migrar Fundamentos da Tecnologia e Programação | ⬜ Pendente | — | — |
| 25.19 | #25.17 — Migrar Introdução à Comunicação Oral e Escrita | ⬜ Pendente | — | — |
| 25.20 | #25.18 — Migrar Reforço de Linguagens | ⬜ Pendente | — | — |
| 25.21 | #25.19 — Avaliações e média final pelo global | ⬜ Pendente | — | — |
| 25.22 | #25.20 — Apostila HTML pelo global | ⬜ Pendente | — | — |
| 25.23 | #25.21 — Remover os HTML das pastas e atualizar regras e scripts | ⬜ Pendente | — | — |
| 25.24 | #25.22 — 👤 Aceite final (usuário) | ⬜ Pendente | — | — |

### Sub-tarefas da #25 (vindas de `tasks/fila/TASK-0019` a `TASK-0040` em 2026-10-13)

Antes eram 22 sub-tasks em cadeia na fila `tasks` do banco (desativada na #29, decisão D1). Agora são os itens 25.3 a 25.24, **um por vez, na ordem**; os itens 👤 são do usuário (viram 👀 quando chegar a vez). Texto original abaixo — onde ele fala em fila, `tasks.html`, PR, merge ou seção do `CLAUDE.md`, vale o fluxo atual (`AGENTS.md`, `.claude/rules/`).

**25.3 (#25.01) — Levantamento das atividades em HTML**

Sub-task 1 da #25-b3e29764-940b-4a82 (regra "🗃️ ATIVIDADES SÓ NO BANCO, LAYOUT GLOBAL E PASTA SÓ COM CONTEÚDO" do CLAUDE.md). Só leitura, sem mudar matéria nem banco.
Gerar docs/levantamento-atividades-html.md com, por matéria (ordem do tasks/ORDEM-MATERIAS.md): cada HTML da pasta (atividade objetiva, prática, avaliação, média final, índice, apostila, outros), a fonte .md e o seed de cada um, o id da atividade no banco e se as questões já estão no banco (objetiva: gabarito tem só item/título/letra?; prática: topico_discursivo). Totais no fim. Commit + PR + merge.

**25.4 (#25.02) — Plano da migração**

Sub-task 2 da #25. Escrever o plano docs/atividades-banco-layout-global.md (skill documentacao-padrao) a partir do levantamento da #25.01: tabelas/colunas para as questões objetivas (enunciado e alternativas) e função que as entrega ao aluno sem gabarito; páginas globais atividade-objetiva.html?id= e atividade-pratica.html?id=; índice global por matéria; avaliações, média final e apostila pelo global; destino das fontes .md, -GABARITO.md e seeds (decisão do usuário); o que fazer com os HTML antigos (redirecionar ou apagar); regras e scripts a mudar. Listar as decisões em aberto para o usuário. Commit + PR + merge.

**25.5 (#25.03) — 👤 Aprovação do plano (usuário)**

Sub-task 3 da #25. Ação do usuário: ler docs/atividades-banco-layout-global.md, responder as decisões em aberto e marcar esta task como concluída na página tasks.html (botão ✅ Concluir). A IA não executa esta task (fica desligada).

**25.6 (#25.04) — Banco: questões objetivas no banco**

Sub-task 4 da #25. Pelo plano aprovado: SQL idempotente em database/ com a estrutura das questões objetivas (enunciado e alternativas; gabarito continua só do professor) e a função security definer que devolve as questões ao aluno sem a letra certa. RLS ligado. Aplicar pelo conector em partes e conferir com consultas. Atualizar docs/database.md e o relatório HTML. Commit + PR + merge.

**25.7 (#25.05) — Script de carga das questões objetivas**

Sub-task 5 da #25. Script em scripts/ que lê a fonte atual de uma atividade objetiva e gera o SQL das questões (uma atividade por lote) + conferência por md5 (banco × fonte), no padrão dos scripts de scripts/seeds/. Não carregar nenhuma matéria ainda (só testar com uma atividade em transação desfeita). Commit + PR + merge.

**25.8 (#25.06) — Banco: prática pronta para a página global**

Sub-task 6 da #25. Conferir que topico_discursivo tem tudo o que a página da prática precisa (enunciado, pontos, tópicos, contexto) e que existe função que entrega ao aluno sem resposta_esperada; criar o que faltar (SQL idempotente, RLS, aplicar e conferir). Commit + PR + merge.

**25.9 (#25.07) — Página global da atividade objetiva**

Sub-task 7 da #25. Criar atividade-objetiva.html?id=<atividade> na raiz, lendo as questões do banco, reaproveitando os módulos atuais (respostas-atividade.js, progresso global, gabarito por turma, PDF, mínimo de questões, bloqueio). Guarda de sessão no head, sem style/script embutido, sem onclick, popup. node --check. Sem migrar matéria ainda. Commit + PR + merge.

**25.10 (#25.08) — Página global da atividade prática**

Sub-task 8 da #25. Criar atividade-pratica.html?id=<atividade> na raiz com todos os recursos da prova id 82 (avaliacao-discursiva.js, progresso global, Finalizar Atividade, prova corrigida, gabarito por turma, PDF, bloquear colar), lendo do banco. Mesmas regras de código da #25.07. Commit + PR + merge.

**25.11 (#25.09) — Índice global de atividades da matéria**

Sub-task 9 da #25. Criar a página global do índice de atividades de uma matéria (ex.: atividades.html?materia=<id>) lendo aulas e atividades do banco, com os recursos dos índices atuais (ON/OFF por atividade, bloqueio da aula, ID na frente, slides em nova aba, CRUD do professor) e links para as páginas globais #25.07/#25.08. Commit + PR + merge.

**25.12 (#25.10) — Piloto: Testes de Front-End**

Sub-task 10 da #25. Migrar Testes de Front-End (aulas 01 a 03, atividades 96 a 101): carregar as questões objetivas pelo script da #25.05 e conferir pelo md5; apontar os links do curso/índice para as páginas globais; NÃO apagar os HTML antigos ainda. Status da matéria e STATUS.md. Commit + PR + merge.

**25.13 (#25.11) — 👤 Aceite do piloto (usuário)**

Sub-task 11 da #25. Ação do usuário: testar as atividades de Testes de Front-End pelas páginas globais (professor e aluno) e marcar esta task como concluída em tasks.html. A IA não executa esta task.

**25.14 (#25.12) — Migrar Banco de Dados**

Sub-task 12 da #25. Migrar MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS como no piloto (#25.10). Se a tarefa #20 ainda estiver reservada por outra frente (coluna "Em uso por" do STATUS.md) ou houver recado "não mexer", recusar com esse motivo.

**25.15 (#25.13) — Migrar Introdução à TIC**

Sub-task 13 da #25. Migrar MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC como no piloto (#25.10).

**25.16 (#25.14) — Migrar Análise de Dados Aplicada à Gestão**

Sub-task 14 da #25. Migrar MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO como no piloto (#25.10), incluindo a Prova Prática id 82.

**25.17 (#25.15) — Migrar Fundamentos de Automação e Instrumentação**

Sub-task 15 da #25. Migrar MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO como no piloto (#25.10).

**25.18 (#25.16) — Migrar Fundamentos da Tecnologia e Programação**

Sub-task 16 da #25. Migrar MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO como no piloto (#25.10).

**25.19 (#25.17) — Migrar Introdução à Comunicação Oral e Escrita**

Sub-task 17 da #25. Migrar MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA como no piloto (#25.10).

**25.20 (#25.18) — Migrar Reforço de Linguagens**

Sub-task 18 da #25. Migrar MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS como no piloto (#25.10), respeitando a exceção da matéria (25 questões por atividade: 20 objetivas + 5 discursivas).

**25.21 (#25.19) — Avaliações e média final pelo global**

Sub-task 19 da #25. Avaliações objetivas, avaliação prática e média final de todas as matérias migradas abrindo pelas páginas globais (média final global lendo media-final.json ou o banco, conforme o plano). Commit + PR + merge.

**25.22 (#25.20) — Apostila HTML pelo global**

Sub-task 20 da #25. Página global que mostra a apostila de uma matéria a partir do APOSTILA-<MATERIA>.md (sem HTML na pasta da matéria), com o mesmo visual e PDF da apostila atual. Commit + PR + merge.

**25.23 (#25.21) — Remover os HTML das pastas e atualizar regras e scripts**

Sub-task 21 da #25. Só com tudo migrado e conferido pelo md5: apagar os HTML das pastas das matérias (deixando redirecionamento se o plano pedir), atualizar docs/regras/materias.md, docs/regras/atividades.md, docs/REGRAS-ATIVIDADE-PRATICA.md, CLAUDE.md (tirar o aviso de transição; versão e histórico), scripts/analise-materias.py e scripts/status-materias/; rodar os scripts. Commit + PR + merge.

**25.24 (#25.22) — 👤 Aceite final (usuário)**

Sub-task 22 da #25. Ação do usuário: conferir todas as matérias pelas páginas globais e marcar esta task como concluída em tasks.html; depois a #25 sai do TASKS.md. A IA não executa esta task.
