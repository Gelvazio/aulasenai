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

- **Nível:** a classificar pelo Jev
- **Descrição:** Mapear arquivos, eventos e chaves (localStorage/estado) dos 3 combos e quem depende deles (Exportar PDF, Gabarito, respostas dos alunos).
- **Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 399.2 — Turma do Quadro de Progresso vira a única fonte (estado + evento de troca)

- **Nível:** a classificar pelo Jev
- **Descrição:** Expor a turma escolhida no Quadro e avisar os demais blocos quando mudar.
- **Depende de:** 399.1.
- **Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 399.3 — Remover o combo "Turma:" do Exportar PDF e usar a turma do Quadro

- **Nível:** a classificar pelo Jev
- **Depende de:** 399.2.
- **Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 399.4 — Remover o combo "Turma:" do Gabarito da avaliação e usar a turma do Quadro

- **Nível:** a classificar pelo Jev
- **Depende de:** 399.2.
- **Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 399.5 — Conferir todas as aulas e atividades de Fundamentos de UI / UX e documentar

- **Nível:** a classificar pelo Jev
- **Descrição:** `node --check`, leitura das páginas (práticas, objetivas, dinâmicas, avaliações), docs em `docs/` e histórico de regras.
- **Depende de:** 399.3 e 399.4.
- **Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.
