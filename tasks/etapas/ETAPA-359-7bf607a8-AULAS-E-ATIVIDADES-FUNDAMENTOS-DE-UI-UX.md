## Etapa 359-7bf607a8 — Fundamentos de UI/UX: aulas e atividades

**Tarefa:** #232-7bf607a8-c347-48a5-89f2-73cd2c4eee7d · **Pedido em:** 2026-10-16 21:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a6bf2a33-1m21a1) (tarefa #225)
**Pedido:** "Faça 1 task pra cada matéria e 1 subtask pra cada aula da matéria e 1 subtask pra cada atividade objetiva e 1 pra cada atividade pratica, tipo discursiva, veja como esta na matéria ITIC padrao" (plano aprovado em 2026-10-16, com a subtarefa 0)
**Objetivo:** escrever as 19 aulas de Fundamentos de UI/UX (76 h) com a objetiva de 50 questões e a prática discursiva de cada uma, tudo cadastrado no banco, no padrão da ITIC.

> 🚫 **Sem slides (2026-10-16, #244.9, pedido do usuário):** a IA **não gera slides** de aula
> (nem PDF nem PPTX) nesta tarefa — o professor gera em outro momento. Vale para todas as aulas
> (`.claude/rules/materias-global.md`).

### Escopo

- **Pasta:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/` · **Aulas:** 19 (1 aula = 4 h, arredondando para cima).
- **Regras:** `docs/regras/materias.md`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md`, `seeds.md`, `security-banco.md` (gabarito nunca no site).
- **Em toda atividade:** "📄 Exportar Meu Gabarito" para o aluno; nas práticas, "Progresso da turma" (layout global); tudo no banco (seed PENDENTE → Claude Code local aplica e confere).
- **Ordem:** subtarefa 0 → Aula 01 → (Objetiva 01, Prática 01) → Aula 02 … → aceite.
- Plano geral e decisões: etapa `ETAPA-352-88c1272e-TAREFAS-POR-MATERIA-TECNICO-INFORMATICA.md` (#225).

### #232.0 — Ementa, `materia.json` e plano das aulas

**Próximo passo:** começar (dependências ✅).

- **Nível:** MEDIO — ementa e JSON de dados, sem banco.
- **Modelo:** só Sonnet — nunca outro (#247)
- **Descrição:** Completar a `EMENTA-CHALKIE-AI.md` (14.800–14.950 caracteres, conferida com a UC da `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`) e criar o `materia.json` com o plano das aulas (1 aula = 4 h: tema, domínios, capacidades, conteúdos, indicadores, situação-problema, atividade); `DOCUMENTACAO/PLANO-AULAS.md` e os 5 status (`materias-global.md`).

### #232.1 — Aula 01 (4 h)

**Próximo passo:** esperar #232.0.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.2 — Objetiva da aula 01 — 50 questões

**Próximo passo:** esperar #232.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.3 — Prática da aula 01 — discursiva

**Próximo passo:** esperar #232.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.4 — Aula 02 (4 h)

**Próximo passo:** esperar #232.1.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.5 — Objetiva da aula 02 — 50 questões

**Próximo passo:** esperar #232.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.6 — Prática da aula 02 — discursiva

**Próximo passo:** esperar #232.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.7 — Aula 03 (4 h)

**Próximo passo:** esperar #232.4.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.8 — Objetiva da aula 03 — 50 questões

**Próximo passo:** esperar #232.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.9 — Prática da aula 03 — discursiva

**Próximo passo:** esperar #232.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.10 — Aula 04 (4 h)

**Próximo passo:** esperar #232.7.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.11 — Objetiva da aula 04 — 50 questões

**Próximo passo:** esperar #232.10.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.12 — Prática da aula 04 — discursiva

**Próximo passo:** esperar #232.10.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.13 — Aula 05 (4 h)

**Próximo passo:** esperar #232.10.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.14 — Objetiva da aula 05 — 50 questões

**Próximo passo:** esperar #232.13.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.15 — Prática da aula 05 — discursiva

**Próximo passo:** esperar #232.13.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.16 — Aula 06 (4 h)

**Próximo passo:** esperar #232.13.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.17 — Objetiva da aula 06 — 50 questões

**Próximo passo:** esperar #232.16.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.18 — Prática da aula 06 — discursiva

**Próximo passo:** esperar #232.16.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.19 — Aula 07 (4 h)

**Próximo passo:** esperar #232.16.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.20 — Objetiva da aula 07 — 50 questões

**Próximo passo:** esperar #232.19.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.21 — Prática da aula 07 — discursiva

**Próximo passo:** esperar #232.19.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.22 — Aula 08 (4 h)

**Próximo passo:** esperar #232.19.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.23 — Objetiva da aula 08 — 50 questões

**Próximo passo:** esperar #232.22.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.24 — Prática da aula 08 — discursiva

**Próximo passo:** esperar #232.22.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.25 — Aula 09 (4 h)

**Próximo passo:** esperar #232.22.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.26 — Objetiva da aula 09 — 50 questões

**Próximo passo:** esperar #232.25.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.27 — Prática da aula 09 — discursiva

**Próximo passo:** esperar #232.25.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.28 — Aula 10 (4 h)

**Próximo passo:** esperar #232.25.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.29 — Objetiva da aula 10 — 50 questões

**Próximo passo:** esperar #232.28.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.30 — Prática da aula 10 — discursiva

**Próximo passo:** esperar #232.28.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.31 — Aula 11 (4 h)

**Próximo passo:** esperar #232.28.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.32 — Objetiva da aula 11 — 50 questões

**Próximo passo:** esperar #232.31.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.33 — Prática da aula 11 — discursiva

**Próximo passo:** esperar #232.31.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.34 — Aula 12 (4 h)

**Próximo passo:** esperar #232.31.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.35 — Objetiva da aula 12 — 50 questões

**Próximo passo:** esperar #232.34.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.36 — Prática da aula 12 — discursiva

**Próximo passo:** esperar #232.34.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.37 — Aula 13 (4 h)

**Próximo passo:** esperar #232.34.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.38 — Objetiva da aula 13 — 50 questões

**Próximo passo:** esperar #232.37.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.39 — Prática da aula 13 — discursiva

**Próximo passo:** esperar #232.37.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.40 — Aula 14 (4 h)

**Próximo passo:** esperar #232.37.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.41 — Objetiva da aula 14 — 50 questões

**Próximo passo:** esperar #232.40.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.42 — Prática da aula 14 — discursiva

**Próximo passo:** esperar #232.40.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.43 — Aula 15 (4 h)

**Próximo passo:** esperar #232.40.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.44 — Objetiva da aula 15 — 50 questões

**Próximo passo:** esperar #232.43.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.45 — Prática da aula 15 — discursiva

**Próximo passo:** esperar #232.43.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.46 — Aula 16 (4 h)

**Próximo passo:** esperar #232.43.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.47 — Objetiva da aula 16 — 50 questões

**Próximo passo:** esperar #232.46.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.48 — Prática da aula 16 — discursiva

**Próximo passo:** esperar #232.46.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.49 — Aula 17 (4 h)

**Próximo passo:** esperar #232.46.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.50 — Objetiva da aula 17 — 50 questões

**Próximo passo:** esperar #232.49.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.51 — Prática da aula 17 — discursiva

**Próximo passo:** esperar #232.49.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.52 — Aula 18 (4 h)

**Próximo passo:** esperar #232.49.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.53 — Objetiva da aula 18 — 50 questões

**Próximo passo:** esperar #232.52.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.54 — Prática da aula 18 — discursiva

**Próximo passo:** esperar #232.52.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.55 — Aula 19 (4 h)

**Próximo passo:** esperar #232.52.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #232.56 — Objetiva da aula 19 — 50 questões

**Próximo passo:** esperar #232.55.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.57 — Prática da aula 19 — discursiva

**Próximo passo:** esperar #232.55.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #232.58 — Aceite do usuário

**Próximo passo:** esperar #232.1 a #232.57.

- **Nível:** LEVE — conferência do usuário.
- **Modelo:** Usuário — nenhuma IA executa (#247)
- **Descrição:** O usuário confere as aulas e as atividades da matéria no site.
