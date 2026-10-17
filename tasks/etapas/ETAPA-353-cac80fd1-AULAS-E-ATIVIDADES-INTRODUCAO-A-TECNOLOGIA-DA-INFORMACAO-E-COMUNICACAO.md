## Etapa 353-cac80fd1 — Introdução à Tecnologia da Informação e Comunicação: aulas e atividades

**Tarefa:** #226-cac80fd1-0dd4-4e3e-98e6-e656b7ba5820 · **Pedido em:** 2026-10-16 21:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a6bf2a33-1m21a1) (tarefa #225)
**Pedido:** "Faça 1 task pra cada matéria e 1 subtask pra cada aula da matéria e 1 subtask pra cada atividade objetiva e 1 pra cada atividade pratica, tipo discursiva, veja como esta na matéria ITIC padrao" (plano aprovado em 2026-10-16, com a subtarefa 0)
**Objetivo:** escrever as 10 aulas de Introdução à Tecnologia da Informação e Comunicação (40 h) com a objetiva de 50 questões e a prática discursiva de cada uma, tudo cadastrado no banco, no padrão da ITIC.

### Escopo

- **Pasta:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/INTRODUCAO-A-TECNOLOGIA-DA-INFORMACAO-E-COMUNICACAO/` · **Aulas:** 10 (1 aula = 4 h, arredondando para cima).
- **Regras:** `docs/regras/materias.md`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md`, `seeds.md`, `security-banco.md` (gabarito nunca no site).
- **Em toda atividade:** "📄 Exportar Meu Gabarito" para o aluno; nas práticas, "Progresso da turma" (layout global); tudo no banco (seed PENDENTE → Claude Code local aplica e confere).
- **Ordem:** subtarefa 0 → Aula 01 → (Objetiva 01, Prática 01) → Aula 02 … → aceite.
- Plano geral e decisões: etapa `ETAPA-352-88c1272e-TAREFAS-POR-MATERIA-TECNICO-INFORMATICA.md` (#225).

### #226.0 — Ementa, `materia.json` e plano das aulas

**Próximo passo:** — (concluída).

- **Nível:** MEDIO — ementa e JSON de dados, sem banco.
- **Descrição:** Completar a `EMENTA-CHALKIE-AI.md` (14.800–14.950 caracteres, conferida com a UC da `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`) e criar o `materia.json` com o plano das aulas (1 aula = 4 h: tema, domínios, capacidades, conteúdos, indicadores, situação-problema, atividade); `DOCUMENTACAO/PLANO-AULAS.md` e os 5 status (`materias-global.md`).
- **Entrega:** `EMENTA-CHALKIE-AI.md` v2.0 (14.887 caracteres; C1–C5, S1–S4 e conhecimentos 1–9 literais da UC; a linha "2 - Desenvolver sistemas…" ficou como função do módulo), `materia.json` (10 aulas × 4 h, 13 indicadores, avaliação 30/20/20/30, SA 1 e SA 2), `DOCUMENTACAO/PLANO-AULAS.md`, temas no `STATUS-AULAS.md` e `STATUS-ATIVIDADES.md`, `STATUS-EMENTAS.md`, `STATUS-EMENTAS-CURSOS.md` e `STATUS_MATERIA.md` regerados.
- **Verificação:** tamanho medido com `len()` = 14.887; `materia.json` lido por `assets/gerador-materia/materia.py`; todos os conteúdos oficiais 1 a 9 aparecem em alguma aula (0 faltando); soma das horas = 40. Concluída em 2026-10-16 21:37.
- **Aviso:** a matéria está em `IGNORAR` no `STATUS-EMENTAS-CURSOS.md` (permissão por matéria); trabalho feito por pedido direto do usuário (#225/#226). A marcação não foi trocada (só o usuário troca).

### #226.1 — Aula 01 (4 h)

**Próximo passo:** ⛔ frente local aplica e confere o seed `database/2026-10-16-itic-tecnico-aula-01-seed-atividades.sql` (recado em `tasks/RECADOS.md`), marca CONCLUÍDO, a coluna Banco do `STATUS-AULAS.md` vira ✅ e esta subtarefa fecha (✅).

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.
- **Entrega:** `CONTEUDO/AULA-01-ELEMENTOS-DA-COMUNICACAO-E-NIVEIS-DE-FALA.md` (10 partes da regra §3: cabeçalho, indicadores 1 e 2, objetivos, roteiro 240 min, conteúdo 9.1–9.7 e 8.1–8.2.2, exemplo "você, como aluno consultor", dinâmica "Telefone sem fio do chamado", SA 1 e entrega, verificação, recursos); linha no `AULAS/STATUS-AULAS.md`; link no `DOCUMENTACAO/PLANO-AULAS.md`; seed `database/2026-10-16-itic-tecnico-aula-01-seed-atividades.sql` **PENDENTE** no registro. 2026-10-16 21:43.
- **Verificação:** todos os conteúdos oficiais da aula no `materia.json` (9, 9.1–9.7, 8, 8.1, 8.2, 8.2.1, 8.2.2) aparecem no texto; roteiro soma 240 min; seed idempotente (busca a matéria pela descrição, a aula pelo número).
- **Decisão (2026-10-16, Claude):** no banco, a matéria é `INTRODUÇÃO À TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO` (maiúsculas, como `BANCO DE DADOS` e `TESTES DE FRONTEND`), porque `Introdução à Tecnologia da Informação e Comunicação` já é a ITIC do AOPL e os seeds buscam a matéria só pela descrição (`materias-global.md`: matéria semelhante = outra linha). Os seeds das objetivas e práticas desta matéria (#226.2 em diante) usam essa descrição, e a aula N pelo número (título da aula 1: `Elementos da Comunicação e Níveis de Fala`).

### #226.2 — Objetiva da aula 01 — 50 questões

**Próximo passo:** esperar #226.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.3 — Prática da aula 01 — discursiva

**Próximo passo:** esperar #226.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.4 — Aula 02 (4 h)

**Próximo passo:** esperar #226.1.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.5 — Objetiva da aula 02 — 50 questões

**Próximo passo:** esperar #226.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.6 — Prática da aula 02 — discursiva

**Próximo passo:** esperar #226.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.7 — Aula 03 (4 h)

**Próximo passo:** esperar #226.4.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.8 — Objetiva da aula 03 — 50 questões

**Próximo passo:** esperar #226.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.9 — Prática da aula 03 — discursiva

**Próximo passo:** esperar #226.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.10 — Aula 04 (4 h)

**Próximo passo:** esperar #226.7.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.11 — Objetiva da aula 04 — 50 questões

**Próximo passo:** esperar #226.10.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.12 — Prática da aula 04 — discursiva

**Próximo passo:** esperar #226.10.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.13 — Aula 05 (4 h)

**Próximo passo:** esperar #226.10.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.14 — Objetiva da aula 05 — 50 questões

**Próximo passo:** esperar #226.13.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.15 — Prática da aula 05 — discursiva

**Próximo passo:** esperar #226.13.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.16 — Aula 06 (4 h)

**Próximo passo:** esperar #226.13.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.17 — Objetiva da aula 06 — 50 questões

**Próximo passo:** esperar #226.16.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.18 — Prática da aula 06 — discursiva

**Próximo passo:** esperar #226.16.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.19 — Aula 07 (4 h)

**Próximo passo:** esperar #226.16.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.20 — Objetiva da aula 07 — 50 questões

**Próximo passo:** esperar #226.19.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.21 — Prática da aula 07 — discursiva

**Próximo passo:** esperar #226.19.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.22 — Aula 08 (4 h)

**Próximo passo:** esperar #226.19.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.23 — Objetiva da aula 08 — 50 questões

**Próximo passo:** esperar #226.22.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.24 — Prática da aula 08 — discursiva

**Próximo passo:** esperar #226.22.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.25 — Aula 09 (4 h)

**Próximo passo:** esperar #226.22.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.26 — Objetiva da aula 09 — 50 questões

**Próximo passo:** esperar #226.25.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.27 — Prática da aula 09 — discursiva

**Próximo passo:** esperar #226.25.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.28 — Aula 10 (4 h)

**Próximo passo:** esperar #226.25.

- **Nível:** PESADO — gera seed SQL (banco).
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #226.29 — Objetiva da aula 10 — 50 questões

**Próximo passo:** esperar #226.28.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.30 — Prática da aula 10 — discursiva

**Próximo passo:** esperar #226.28.

- **Nível:** PESADO — gabarito e seed SQL.
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #226.31 — Aceite do usuário

**Próximo passo:** esperar #226.1 a #226.30.

- **Nível:** LEVE — conferência do usuário.
- **Descrição:** O usuário confere as aulas e as atividades da matéria no site.
