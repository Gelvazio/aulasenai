## Etapa 423-7a481d71 — #294: Ferramentas Digitais Aplicadas: aulas e atividades

**Tarefa:** #294-7a481d71-5f61-4cba-aa35-4af2f2585df6 · **Pedido em:** 2026-10-19 12:50 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "crie a tarefa para criar as atividades e aulas da materia *Ferramentas Digitais Aplicadas*, aqui C:\fontes\aulasenai\MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\Ferramentas-Digitais-Aplicadas"
**Objetivo:** escrever as 15 aulas (60 h ÷ 4 h) de Ferramentas Digitais Aplicadas, cada uma com objetiva (50 questões) e prática discursiva, tudo cadastrado no banco, no padrão da ITIC.

> 🚫 **Sem slides** (`materias-global.md`) · ✅ **"Você como aluno consultor"**, sem empresa fictícia.
> 👀 **Tarefa grande (banco + mudança em massa): aguarda o "sim" do usuário a este plano antes de qualquer subtarefa.**

### Escopo

- **Entra:** pasta nova `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/Ferramentas-Digitais-Aplicadas/` (ainda **não existe**), ementa, `materia.json`, 15 aulas, 15 objetivas, 15 práticas, seeds no banco, `STATUS-*.md`.
- **Não entra:** slides, apostila em HTML (só o Markdown, se pedido), outras matérias.
- **Fonte do conteúdo:** só a UC "Ferramentas Digitais Aplicadas (60h)" da `EMENTA-PRINCIPAL-ASSISTENTE-DE-OPERACOES-LOGISTICAS.md` (linhas ~944–1000): comunicação virtual (Teams, Meet), gerenciador de informações (Google, Outlook), Excel avançado (funções de busca, lógicas, erro, SOMASE/CONT.SE, filtros, formulários, formatações).
- **Regras:** `docs/regras/materias.md`, `atividades.md`, `atividades-banco.md`, `seeds.md`, `security-banco.md`. Banco só pelo Claude Code local.
- **Ordem:** #294.1 → Aula 01 → (Objetiva, Prática) → Aula 02 …

### Riscos

- Matéria nova pode precisar de linha na tabela `materia` (e vínculo com o curso/turma): decidir em #294.1. Plano B: o usuário cadastra a matéria.
- Muitas subtarefas PESADO (seed SQL): uma por vez, seeds em dia antes de cada nova.

### Decisões

- (aguardando) aprovação do plano pelo usuário.

### #294.1 — Pasta, ementa, `materia.json` e plano de 15 aulas

**Próximo passo:** ⏹ esperar o "sim" do usuário ao plano desta etapa.

- **Nível:** MEDIO — JSON e Markdown de dados, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** Criar a pasta `Ferramentas-Digitais-Aplicadas/` com `EMENTA-CHALKIE-AI.md` (UC do curso), `materia.json` (15 aulas × 4 h: tema, domínios, capacidades, conteúdos oficiais, indicadores, situação-problema), os 5 `STATUS-*.md` e as subpastas `CONTEUDO/`, `AULAS/`, `ATIVIDADES/`, `APOSTILA/`, `DOCUMENTACAO/` (`materias-global.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.2 — Aula 01 (4 h)

**Próximo passo:** esperar #294.1.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-01-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.3 — Objetiva da aula 01 — 50 questões

**Próximo passo:** esperar #294.2.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.4 — Prática da aula 01 — discursiva

**Próximo passo:** esperar #294.2.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.5 — Aula 02 (4 h)

**Próximo passo:** esperar #294.2.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-02-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.6 — Objetiva da aula 02 — 50 questões

**Próximo passo:** esperar #294.5.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.7 — Prática da aula 02 — discursiva

**Próximo passo:** esperar #294.5.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.8 — Aula 03 (4 h)

**Próximo passo:** esperar #294.5.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-03-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.9 — Objetiva da aula 03 — 50 questões

**Próximo passo:** esperar #294.8.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.10 — Prática da aula 03 — discursiva

**Próximo passo:** esperar #294.8.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.11 — Aula 04 (4 h)

**Próximo passo:** esperar #294.8.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-04-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.12 — Objetiva da aula 04 — 50 questões

**Próximo passo:** esperar #294.11.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.13 — Prática da aula 04 — discursiva

**Próximo passo:** esperar #294.11.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.14 — Aula 05 (4 h)

**Próximo passo:** esperar #294.11.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-05-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.15 — Objetiva da aula 05 — 50 questões

**Próximo passo:** esperar #294.14.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.16 — Prática da aula 05 — discursiva

**Próximo passo:** esperar #294.14.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.17 — Aula 06 (4 h)

**Próximo passo:** esperar #294.14.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-06-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.18 — Objetiva da aula 06 — 50 questões

**Próximo passo:** esperar #294.17.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.19 — Prática da aula 06 — discursiva

**Próximo passo:** esperar #294.17.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.20 — Aula 07 (4 h)

**Próximo passo:** esperar #294.17.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-07-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.21 — Objetiva da aula 07 — 50 questões

**Próximo passo:** esperar #294.20.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.22 — Prática da aula 07 — discursiva

**Próximo passo:** esperar #294.20.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.23 — Aula 08 (4 h)

**Próximo passo:** esperar #294.20.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-08-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.24 — Objetiva da aula 08 — 50 questões

**Próximo passo:** esperar #294.23.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.25 — Prática da aula 08 — discursiva

**Próximo passo:** esperar #294.23.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.26 — Aula 09 (4 h)

**Próximo passo:** esperar #294.23.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-09-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.27 — Objetiva da aula 09 — 50 questões

**Próximo passo:** esperar #294.26.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.28 — Prática da aula 09 — discursiva

**Próximo passo:** esperar #294.26.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.29 — Aula 10 (4 h)

**Próximo passo:** esperar #294.26.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-10-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.30 — Objetiva da aula 10 — 50 questões

**Próximo passo:** esperar #294.29.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.31 — Prática da aula 10 — discursiva

**Próximo passo:** esperar #294.29.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.32 — Aula 11 (4 h)

**Próximo passo:** esperar #294.29.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-11-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.33 — Objetiva da aula 11 — 50 questões

**Próximo passo:** esperar #294.32.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.34 — Prática da aula 11 — discursiva

**Próximo passo:** esperar #294.32.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.35 — Aula 12 (4 h)

**Próximo passo:** esperar #294.32.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-12-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.36 — Objetiva da aula 12 — 50 questões

**Próximo passo:** esperar #294.35.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.37 — Prática da aula 12 — discursiva

**Próximo passo:** esperar #294.35.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.38 — Aula 13 (4 h)

**Próximo passo:** esperar #294.35.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-13-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.39 — Objetiva da aula 13 — 50 questões

**Próximo passo:** esperar #294.38.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.40 — Prática da aula 13 — discursiva

**Próximo passo:** esperar #294.38.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.41 — Aula 14 (4 h)

**Próximo passo:** esperar #294.38.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-14-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.42 — Objetiva da aula 14 — 50 questões

**Próximo passo:** esperar #294.41.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.43 — Prática da aula 14 — discursiva

**Próximo passo:** esperar #294.41.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.44 — Aula 15 (4 h)

**Próximo passo:** esperar #294.41.

- **Nível:** PESADO — gera seed SQL da aula (banco).
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** `CONTEUDO/AULA-15-DESCRICAO-CURTA.md` nas partes de `docs/regras/materias.md` §3 (só conteúdo desta UC, "Você como aluno consultor", sem empresa fictícia, sem slides), linha no `AULAS/STATUS-AULAS.md` e seed da aula na tabela `aulas`.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.45 — Objetiva da aula 15 — 50 questões

**Próximo passo:** esperar #294.44.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** 50 questões objetivas só no banco (gabarito nunca em página/PDF), via seed idempotente (`atividades-banco.md`, `seeds.md`).
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.46 — Prática da aula 15 — discursiva

**Próximo passo:** esperar #294.44.

- **Nível:** PESADO — gabarito e seed SQL.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** Prática discursiva (10 questões × 3 tópicos) só no banco, "Você como aluno consultor", com o gabarito liberado só pelo professor.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —

### #294.47 — Fechamento

**Próximo passo:** esperar #294.44.

- **Nível:** LEVE — só quadro e Markdown.
- **Modelo:** só Haiku — nunca outro
- **Descrição:** Conferir os 5 status em ✅ (`materias-global.md`), regenerar o visualizador e entregar.
- **Critérios de aceitação:** conforme o escopo da etapa.
- **Entrega:** —
- **Verificação:** —
