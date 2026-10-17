## Etapa 369-dc369cab — Saúde e Segurança no Trabalho: aulas e atividades

**Tarefa:** #242-dc369cab-4fee-45cf-b043-43f577fcb2ea · **Pedido em:** 2026-10-16 21:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a6bf2a33-1m21a1) (tarefa #225)
**Pedido:** "Faça 1 task pra cada matéria e 1 subtask pra cada aula da matéria e 1 subtask pra cada atividade objetiva e 1 pra cada atividade pratica, tipo discursiva, veja como esta na matéria ITIC padrao" (plano aprovado em 2026-10-16, com a subtarefa 0)
**Objetivo:** escrever as 3 aulas de Saúde e Segurança no Trabalho (12 h) com a objetiva de 50 questões e a prática discursiva de cada uma, tudo cadastrado no banco, no padrão da ITIC.

> 🚫 **Sem slides (2026-10-16, #244.9, pedido do usuário):** a IA **não gera slides** de aula
> (nem PDF nem PPTX) nesta tarefa — o professor gera em outro momento. Vale para todas as aulas
> (`.claude/rules/materias-global.md`).

### Escopo

- **Pasta:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/SAUDE-E-SEGURANCA-NO-TRABALHO/` · **Aulas:** 3 (1 aula = 4 h, arredondando para cima).
- **Regras:** `docs/regras/materias.md`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md`, `seeds.md`, `security-banco.md` (gabarito nunca no site).
- **Em toda atividade:** "📄 Exportar Meu Gabarito" para o aluno; nas práticas, "Progresso da turma" (layout global); tudo no banco (seed PENDENTE → Claude Code local aplica e confere).
- **Ordem:** subtarefa 0 → Aula 01 → (Objetiva 01, Prática 01) → Aula 02 … → aceite.
- Plano geral e decisões: etapa `ETAPA-352-88c1272e-TAREFAS-POR-MATERIA-TECNICO-INFORMATICA.md` (#225).

### #242.0 — Ementa, `materia.json` e plano das aulas

**Próximo passo:** começar (dependências ✅).

- **Nível:** MEDIO — ementa e JSON de dados, sem banco.
- **Modelo:** só Sonnet — nunca outro (#247)
- **Descrição:** Completar a `EMENTA-CHALKIE-AI.md` (14.800–14.950 caracteres, conferida com a UC da `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`) e criar o `materia.json` com o plano das aulas (1 aula = 4 h: tema, domínios, capacidades, conteúdos, indicadores, situação-problema, atividade); `DOCUMENTACAO/PLANO-AULAS.md` e os 5 status (`materias-global.md`).

### #242.1 — Aula 01 (4 h)

**Próximo passo:** esperar #242.0.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #242.2 — Objetiva da aula 01 — 50 questões

**Próximo passo:** esperar #242.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #242.3 — Prática da aula 01 — discursiva

**Próximo passo:** esperar #242.1.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #242.4 — Aula 02 (4 h)

**Próximo passo:** esperar #242.1.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #242.5 — Objetiva da aula 02 — 50 questões

**Próximo passo:** esperar #242.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #242.6 — Prática da aula 02 — discursiva

**Próximo passo:** esperar #242.4.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #242.7 — Aula 03 (4 h)

**Próximo passo:** esperar #242.4.

- **Nível:** PESADO — gera seed SQL (banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` com as partes de `docs/regras/materias.md` §3 (só conteúdo da ementa desta UC, "você, como aluno consultor"), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas` (PENDENTE em `database/SEEDS-APLICADOS.md`; aplicar e conferir = Claude Code local). Fecha com o seed CONCLUÍDO.

### #242.8 — Objetiva da aula 03 — 50 questões

**Próximo passo:** esperar #242.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** 50 questões objetivas da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`, fora do site pelo `.vercelignore`), seed de `atividade` + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), botão "📄 Exportar Meu Gabarito" ligado e linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #242.9 — Prática da aula 03 — discursiva

**Próximo passo:** esperar #242.7.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Descrição:** Prática/discursiva da aula (padrão ITIC: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md`, fora do site), seed de `atividade` + tópicos + `gabarito` ligado à aula (PENDENTE; aplicar = Claude Code local), "Progresso da turma" pelo layout global e `- **Exportar Meu Gabarito:** sim` na fonte; linha no `ATIVIDADES/STATUS-ATIVIDADES.md`. Fecha com o seed CONCLUÍDO.

### #242.10 — Aceite do usuário

**Próximo passo:** esperar #242.1 a #242.9.

- **Nível:** LEVE — conferência do usuário.
- **Modelo:** Usuário — nenhuma IA executa (#247)
- **Descrição:** O usuário confere as aulas e as atividades da matéria no site.
