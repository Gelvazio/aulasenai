## Etapa 365-986ab616 — Codificação para Back-End: aulas e atividades

**Tarefa:** #238-986ab616-43e5-4399-bd9f-1ac4cc52b013 · **Pedido em:** 2026-10-16 21:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a6bf2a33-1m21a1) (tarefa #225)
**Pedido:** "Faça 1 task pra cada matéria e 1 subtask pra cada aula da matéria e 1 subtask pra cada atividade objetiva e 1 pra cada atividade pratica, tipo discursiva, veja como esta na matéria ITIC padrao" (plano aprovado em 2026-10-16, com a subtarefa 0)
**Objetivo:** escrever as 25 aulas de Codificação para Back-End (100 h) com a objetiva de 50 questões e a prática discursiva de cada uma, tudo cadastrado no banco, no padrão da ITIC.

> 🚫 **Sem slides (2026-10-16, #244.9, pedido do usuário):** a IA **não gera slides** de aula
> (nem PDF nem PPTX) nesta tarefa — o professor gera em outro momento. Vale para todas as aulas
> (`.claude/rules/materias-global.md`).

### Escopo

- **Pasta:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/CODIFICACAO-PARA-BACK-END/` · **Aulas:** 25 (1 aula = 4 h, arredondando para cima).
- **Regras:** `docs/regras/materias.md`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md`, `seeds.md`, `security-banco.md` (gabarito nunca no site).
- **Em toda atividade:** "📄 Exportar Meu Gabarito" para o aluno; nas práticas, "Progresso da turma" (layout global); tudo no banco (seed PENDENTE → Claude Code local aplica e confere).
- **Ordem:** subtarefa 0 → Aula 01 → (Objetiva 01, Prática 01) → Aula 02 … → aceite.
- Plano geral e decisões: etapa `ETAPA-352-88c1272e-TAREFAS-POR-MATERIA-TECNICO-INFORMATICA.md` (#225).

### #238.0 — Ementa, `materia.json` e plano das aulas

**Próximo passo:** começar (dependências ✅).

- **Nível:** MEDIO — ementa e JSON de dados, sem banco.
- **Modelo:** só Sonnet — nunca outro (#247)
- **Descrição:** Completar a `EMENTA-CHALKIE-AI.md` (14.800–14.950 caracteres, conferida com a UC da `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`) e criar o `materia.json` com o plano das aulas (1 aula = 4 h: tema, domínios, capacidades, conteúdos, indicadores, situação-problema, atividade); `DOCUMENTACAO/PLANO-AULAS.md` e os 5 status (`materias-global.md`).

### #238.1 — Aula 01 (4 h)

**Próximo passo:** esperar #238.0.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.2 — Objetiva da aula 01 — 50 questões

**Próximo passo:** esperar #238.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.3 — Prática da aula 01 — discursiva

**Próximo passo:** esperar #238.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.4 — Aula 02 (4 h)

**Próximo passo:** esperar #238.1.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.5 — Objetiva da aula 02 — 50 questões

**Próximo passo:** esperar #238.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.6 — Prática da aula 02 — discursiva

**Próximo passo:** esperar #238.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.7 — Aula 03 (4 h)

**Próximo passo:** esperar #238.4.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.8 — Objetiva da aula 03 — 50 questões

**Próximo passo:** esperar #238.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.9 — Prática da aula 03 — discursiva

**Próximo passo:** esperar #238.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.10 — Aula 04 (4 h)

**Próximo passo:** esperar #238.7.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.11 — Objetiva da aula 04 — 50 questões

**Próximo passo:** esperar #238.10.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.12 — Prática da aula 04 — discursiva

**Próximo passo:** esperar #238.10.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.13 — Aula 05 (4 h)

**Próximo passo:** esperar #238.10.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.14 — Objetiva da aula 05 — 50 questões

**Próximo passo:** esperar #238.13.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.15 — Prática da aula 05 — discursiva

**Próximo passo:** esperar #238.13.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.16 — Aula 06 (4 h)

**Próximo passo:** esperar #238.13.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.17 — Objetiva da aula 06 — 50 questões

**Próximo passo:** esperar #238.16.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.18 — Prática da aula 06 — discursiva

**Próximo passo:** esperar #238.16.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.19 — Aula 07 (4 h)

**Próximo passo:** esperar #238.16.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.20 — Objetiva da aula 07 — 50 questões

**Próximo passo:** esperar #238.19.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.21 — Prática da aula 07 — discursiva

**Próximo passo:** esperar #238.19.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.22 — Aula 08 (4 h)

**Próximo passo:** esperar #238.19.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.23 — Objetiva da aula 08 — 50 questões

**Próximo passo:** esperar #238.22.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.24 — Prática da aula 08 — discursiva

**Próximo passo:** esperar #238.22.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.25 — Aula 09 (4 h)

**Próximo passo:** esperar #238.22.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.26 — Objetiva da aula 09 — 50 questões

**Próximo passo:** esperar #238.25.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.27 — Prática da aula 09 — discursiva

**Próximo passo:** esperar #238.25.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.28 — Aula 10 (4 h)

**Próximo passo:** esperar #238.25.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.29 — Objetiva da aula 10 — 50 questões

**Próximo passo:** esperar #238.28.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.30 — Prática da aula 10 — discursiva

**Próximo passo:** esperar #238.28.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.31 — Aula 11 (4 h)

**Próximo passo:** esperar #238.28.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.32 — Objetiva da aula 11 — 50 questões

**Próximo passo:** esperar #238.31.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.33 — Prática da aula 11 — discursiva

**Próximo passo:** esperar #238.31.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.34 — Aula 12 (4 h)

**Próximo passo:** esperar #238.31.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.35 — Objetiva da aula 12 — 50 questões

**Próximo passo:** esperar #238.34.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.36 — Prática da aula 12 — discursiva

**Próximo passo:** esperar #238.34.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.37 — Aula 13 (4 h)

**Próximo passo:** esperar #238.34.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.38 — Objetiva da aula 13 — 50 questões

**Próximo passo:** esperar #238.37.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.39 — Prática da aula 13 — discursiva

**Próximo passo:** esperar #238.37.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.40 — Aula 14 (4 h)

**Próximo passo:** esperar #238.37.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.41 — Objetiva da aula 14 — 50 questões

**Próximo passo:** esperar #238.40.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.42 — Prática da aula 14 — discursiva

**Próximo passo:** esperar #238.40.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.43 — Aula 15 (4 h)

**Próximo passo:** esperar #238.40.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.44 — Objetiva da aula 15 — 50 questões

**Próximo passo:** esperar #238.43.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.45 — Prática da aula 15 — discursiva

**Próximo passo:** esperar #238.43.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.46 — Aula 16 (4 h)

**Próximo passo:** esperar #238.43.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.47 — Objetiva da aula 16 — 50 questões

**Próximo passo:** esperar #238.46.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.48 — Prática da aula 16 — discursiva

**Próximo passo:** esperar #238.46.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.49 — Aula 17 (4 h)

**Próximo passo:** esperar #238.46.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.50 — Objetiva da aula 17 — 50 questões

**Próximo passo:** esperar #238.49.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.51 — Prática da aula 17 — discursiva

**Próximo passo:** esperar #238.49.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.52 — Aula 18 (4 h)

**Próximo passo:** esperar #238.49.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.53 — Objetiva da aula 18 — 50 questões

**Próximo passo:** esperar #238.52.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.54 — Prática da aula 18 — discursiva

**Próximo passo:** esperar #238.52.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.55 — Aula 19 (4 h)

**Próximo passo:** esperar #238.52.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.56 — Objetiva da aula 19 — 50 questões

**Próximo passo:** esperar #238.55.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.57 — Prática da aula 19 — discursiva

**Próximo passo:** esperar #238.55.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.58 — Aula 20 (4 h)

**Próximo passo:** esperar #238.55.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.59 — Objetiva da aula 20 — 50 questões

**Próximo passo:** esperar #238.58.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.60 — Prática da aula 20 — discursiva

**Próximo passo:** esperar #238.58.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.61 — Aula 21 (4 h)

**Próximo passo:** esperar #238.58.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.62 — Objetiva da aula 21 — 50 questões

**Próximo passo:** esperar #238.61.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.63 — Prática da aula 21 — discursiva

**Próximo passo:** esperar #238.61.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.64 — Aula 22 (4 h)

**Próximo passo:** esperar #238.61.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.65 — Objetiva da aula 22 — 50 questões

**Próximo passo:** esperar #238.64.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.66 — Prática da aula 22 — discursiva

**Próximo passo:** esperar #238.64.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.67 — Aula 23 (4 h)

**Próximo passo:** esperar #238.64.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.68 — Objetiva da aula 23 — 50 questões

**Próximo passo:** esperar #238.67.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.69 — Prática da aula 23 — discursiva

**Próximo passo:** esperar #238.67.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.70 — Aula 24 (4 h)

**Próximo passo:** esperar #238.67.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.71 — Objetiva da aula 24 — 50 questões

**Próximo passo:** esperar #238.70.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.72 — Prática da aula 24 — discursiva

**Próximo passo:** esperar #238.70.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.73 — Aula 25 (4 h)

**Próximo passo:** esperar #238.70.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #238.74 — Objetiva da aula 25 — 50 questões

**Próximo passo:** esperar #238.73.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.75 — Prática da aula 25 — discursiva

**Próximo passo:** esperar #238.73.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #238.76 — Aceite do usuário

**Próximo passo:** esperar #238.1 a #238.75.

- **Nível:** LEVE — conferência do usuário.
- **Modelo:** Usuário — nenhuma IA executa (#247)
- **Descrição:** O usuário confere as aulas e as atividades da matéria no site.
