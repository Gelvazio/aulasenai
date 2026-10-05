# Equipes de sala de aula (CRUD global, por turma)

**Objetivo:** permitir ao professor montar, salvar e reaproveitar **equipes de alunos em qualquer
turma** (banco de dados + tela única), começando pela turma **135080 — CEPLAS ITIC Manhã**
(Introdução à TIC, Assistente de Operações Logísticas, 34 alunos).

**Tech Stack:** Supabase (PostgreSQL + RLS + Auth), HTML5, CSS3, JavaScript vanilla
(padrão das telas `turmas.html` / `alunos.html`).

**Criado em:** 2026-10-05
**Concluído em:** —
**Tempo decorrido:** —

---

## Decisões de desenho (para aprovação)

1. **Global:** uma única estrutura no banco e uma única página (`equipes.html`, na raiz), que
   funciona para **qualquer turma** — nada fixo de matéria/curso no código. A turma é escolhida
   numa lista (as turmas do professor; o administrador vê todas).
2. **Equipe pertence a uma turma.** Cada turma pode ter várias equipes.
3. **Agrupamentos (conjuntos de equipes):** a mesma turma pode ter divisões diferentes ao longo
   do curso (ex.: "Dinâmica Aula 03", "Projeto final"). Cada agrupamento tem nome e suas equipes.
   Dentro de um agrupamento, **o aluno fica em no máximo 1 equipe** (o banco garante).
   *(Se preferir uma divisão só por turma, o agrupamento vira fixo "Padrão" — avisar.)*
4. **Membros = alunos da própria turma** (`turmaaluno`); o banco recusa aluno de outra turma.
5. **Quem pode:** professor só nas turmas vinculadas a ele (`professor_tem_turma`), administrador
   em todas; **aluno só lê** o agrupamento/equipe dele e os colegas da mesma equipe; `anon` sem
   acesso. Nada em localStorage.
6. **Ajuda para montar:** botão **🎲 Sortear equipes** (informa quantidade de equipes *ou* alunos
   por equipe; distribui equilibrado) — o resultado aparece na tela e **só grava após
   confirmação** (popup). Depois o professor ajusta à mão (mover aluno, renomear, líder).
7. **Líder da equipe** opcional (um membro marcado como líder).
8. **Exportar/Imprimir** a lista de equipes do agrupamento (para levar à aula), com o campo Turma.

## Modelo de dados (SQL `database/2026-10-05-equipes-sala-de-aula.sql`)

| Tabela | Colunas principais | Regras |
|---|---|---|
| `agrupamento_equipe` | `id`, `turma_codigo` → `turma`, `nome`, `descricao`, `ativo`, `criado_em`, `criado_por` | único (`turma_codigo`, `nome`) |
| `equipe` | `id`, `agrupamento_id` → `agrupamento_equipe` (cascade), `nome`, `cor`, `ordem`, `criado_em` | único (`agrupamento_id`, `nome`) |
| `equipe_membro` | `id`, `equipe_id` → `equipe` (cascade), `agrupamento_id`, `aluno_id` → `auth.users`, `lider` bool, `criado_em` | único (`agrupamento_id`, `aluno_id`) = 1 equipe por aluno no agrupamento; trigger confere que o aluno está na `turmaaluno` da turma e que `agrupamento_id` = o da equipe |

- RLS ligado nas 3; `anon` revogado; TRUNCATE revogado; políticas com `professor_tem_turma()`
  (que já cobre o administrador) e, para o aluno, leitura só dos agrupamentos/equipes onde ele é
  membro.
- SQL idempotente, sem apagar dados. **Aplicar no Supabase só com pedido seu** (você roda no
  SQL Editor ou pede "aplique o SQL pelo Supabase"). Antes, conferir o banco real.

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Conferir no banco real `turma`, `turmaaluno`, `professor_tem_turma()` e se não há tabelas `equipe*` | ⬜ Pendente | 2026-10-05 | — | — |
| 2 | Escrever `database/2026-10-05-equipes-sala-de-aula.sql` (tabelas, triggers, RLS, função `sortear_equipes` opcional) | ⬜ Pendente | 2026-10-05 | — | — |
| 3 | Atualizar `docs/database.md` + `docs/relatorio_verificacao_database.html` | ⬜ Pendente | 2026-10-05 | — | — |
| 4 | `assets/js/equipes-repositorio.js` (só acesso a dados, cliente Supabase injetado) | ⬜ Pendente | 2026-10-05 | — | — |
| 5 | `assets/js/equipes-sorteio.js` (função pura de distribuição equilibrada) | ⬜ Pendente | 2026-10-05 | — | — |
| 6 | `equipes.html` (raiz) + `assets/js/equipes-pagina.js` + `assets/css/equipes.css` (popup, sem inline) | ⬜ Pendente | 2026-10-05 | — | — |
| 7 | Menu **EQUIPES** no header para todo PROFESSOR (`js/header-usuario.js`) | ⬜ Pendente | 2026-10-05 | — | — |
| 8 | Visão do aluno: "Minha equipe" na mesma página (só leitura) | ⬜ Pendente | 2026-10-05 | — | — |
| 9 | Conferência por leitura + `node --check` dos JS (sem navegador) | ⬜ Pendente | 2026-10-05 | — | — |
| 10 | Registrar regra no `CLAUDE.md` (+ versão/histórico e visualizador de regras) | ⬜ Pendente | 2026-10-05 | — | — |
| 11 | Aplicar SQL no Supabase (**só com seu pedido**) e criar o 1º agrupamento da turma 135080 | ⬜ Pendente | 2026-10-05 | — | — |
| 12 | Commit local (sem push) + graphify | ⬜ Pendente | 2026-10-05 | — | — |

## Arquivos previstos

- Novo: `database/2026-10-05-equipes-sala-de-aula.sql`, `equipes.html`,
  `assets/js/equipes-repositorio.js`, `assets/js/equipes-sorteio.js`,
  `assets/js/equipes-pagina.js`, `assets/css/equipes.css`.
- Alterado: `js/header-usuario.js`, `docs/database.md`,
  `docs/relatorio_verificacao_database.html`, `CLAUDE.md`, `assets/js/regras-modal.js` (se preciso),
  `STATUS.md`.

## Riscos

| Risco | Plano B |
|---|---|
| Alunos da 135080 ainda não estão todos na `turmaaluno` | Passo 1 confere; vincular em `alunos.html` antes de montar equipes |
| Professor sem vínculo na `turmaprofessor` não vê a turma | Administrador vincula em `turmas.html` |
| Dados pessoais (LGPD) | Nomes só vêm do banco com RLS; nada de lista em arquivo versionado |

## Verificação (sem navegador)

- `node --check` em cada `.js` novo; leitura do SQL; após aplicar (se pedido), consultas de
  leitura confirmando tabelas, políticas e RLS ligado. Teste de tela fica com você.
