# ETAPA 544 — Turma escolhida em um só lugar (Quadro de Progresso) nas aulas e atividades de Fundamentos de UI / UX

- **TASK:** #399 (pedida em 2026-10-26)
- **Nível/Modelo:** LEVE · effort low (Jev, conf. 0,45 — revisão humana). Executada pelo Devin a pedido direto do usuário (mesmo caso da #354.1). Neste projeto nunca Opus.
- **Tipo:** tarefa grande (várias partes, muitas páginas).
- **Aprovação:** usuário em 2026-10-26 — "faça a tarefa 399 agora".

## Pedido

Hoje a página da atividade tem 3 lugares para escolher a turma: o combo "Turma:" do **Quadro de Progresso**, o combo "Turma:" ao lado do botão **Exportar PDF** e o combo "Turma:" do **Gabarito da avaliação**. Deve haver **só 1**: ficar apenas o do Quadro de Progresso, que vale para todos os outros. Fazer em todas as aulas e atividades de `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX`.

## Objetivo

Escolher a turma uma única vez, no Quadro de Progresso; o Exportar PDF, o Gabarito da avaliação e demais blocos da página usam essa turma.

## Decisões em aberto

- Arquivos prováveis: `assets/js/alunos-da-turma-progresso.js` (combo do Quadro), `assets/js/liberacao-respostas-discursiva.js` (Gabarito) e o combo do Exportar PDF (a localizar). Como o código é compartilhado, a mudança deve valer para todas as atividades e a #400 só confere as demais matérias.
- Aluno (sem Quadro de Progresso): continua usando a turma dele.

## Subtarefas

### 399.1 — Inventário dos 3 combos de turma e de como cada um guarda/lê a turma

- **Nível:** LEVE (Jev, conf. 0,45) · **Status:** ✅ Concluído
- **Descrição:** Mapear arquivos, eventos e chaves dos 3 combos.
- **Entrega:** inventário — `select#progresso-turma-combo-turma` (Quadro, `alunos-da-turma-progresso.js`: estado `memoriaAlunosDaTurma.turmaEscolhida`, `window.lerTurmaEscolhidaProgresso()`, eventos `relatorio-professor:turma` e `progresso-turma:mudou`); `select#turmaExportacao` na `.export-bar` (`turma-exportacao.js`, lido por `obterTurmaParaExportacao()` em `atividade.js`, `exportar-pdf-discursiva.js` e `exportar-word.js`); select do "🔑 Gabarito da avaliação" (`liberacao-respostas-discursiva.js`, já acompanhava o Quadro). Nenhum HTML de UI/UX tem combo fixo.
- **Verificação:** grep nos 3 arquivos + páginas de UI/UX.

### 399.2 — Turma do Quadro de Progresso vira a única fonte (estado + evento de troca)

- **Nível:** LEVE · **Status:** ✅ Concluído
- **Descrição:** `avisarTurmaEscolhidaProgresso` passa a disparar `relatorio-professor:turma` também ao voltar para "Todas as turmas" (turma `''`) — os dependentes reagem (botões do gabarito/nota escondem com aviso, tabela de notas mostra todas).
- **Entrega:** `alunos-da-turma-progresso.js` (+ `liberacao-respostas-professor.js`, `liberacao-nota-professor.js` e `tabela-notas-professor.js` tratando `''`).

### 399.3 — Remover o combo "Turma:" do Exportar PDF e usar a turma do Quadro

- **Nível:** LEVE · **Status:** ✅ Concluído
- **Descrição:** `turma-exportacao.js` reduzido a `obterTurmaParaExportacao()`, que lê o `select#progresso-turma-combo-turma` e devolve o texto da opção; sem o combo → linha em branco no PDF (aluno/sem login/sem Quadro). Removidos: select da `.export-bar`, consultas de vínculos/RPC admin, popup "Selecione a turma", inclusão do `turma-exportacao.css` e a carga de `unidade.js` em `exportar-pdf-discursiva.js`.

### 399.4 — Remover o combo "Turma:" do Gabarito da avaliação e usar a turma do Quadro

- **Nível:** LEVE · **Status:** ✅ Concluído
- **Descrição:** `liberacao-respostas-discursiva.js`: removidos `listarTurmasLiberacaoDiscursiva`, `criarListaTurmasLiberacao`, `acompanharTurmaProgressoLiberacao`, `escolherTurmaInicialLiberacao` e o aviso "sem turmas vinculadas". `montarLiberacaoProfessorDiscursiva` usa `lerTurmaProgressoDiscursiva()`; os botões já se atualizam pelo evento `relatorio-professor:turma`.

### 399.5 — Conferir todas as aulas e atividades de Fundamentos de UI / UX e documentar

- **Nível:** LEVE · **Status:** ✅ Concluído
- **Descrição:** `node --check` nos 6 JS alterados (todos OK); grep confirmou que nenhuma página de UI/UX tem combo "Turma:" fixo e não há restos de `turmaExportacao`; `docs/regras/atividades.md` atualizado (regra de exportação reescrita + nota #399 substituindo a #368).
- **Verificação:** `node --check` + grep + leitura dos consumidores do evento.
