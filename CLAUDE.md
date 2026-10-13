# 📚 CLAUDE.md — Regras do Projeto Aulas SENAI

**Versão das regras:** 2026-10-13 ⚡ *Sistema de memória ativa — regras em `.claude/rules/` para carga rápida*

---

## ⚡ INÍCIO RÁPIDO

**Ao iniciar sessão:**

1. Abra `.claude/rules/essentials.md` (30 segundos)
2. Siga para `.claude/rules/status-flow.md`
3. Procure outras regras no `.claude/rules/INDEX.md`

---

## 📍 Onde Estão as Regras

| Tipo | Localização | Quando ler |
|------|------------|-----------|
| **Essenciais** | `.claude/rules/essentials.md` | Sempre, ao iniciar |
| **Dia a dia** | `.claude/rules/status-flow.md`, `git-quick.md` | Cada tarefa |
| **Por tema** | `.claude/rules/INDEX.md` | Conforme precisar |
| **Documentação** | `docs/regras/` | Para detalhes completos |
| **Histórico** | `docs/HISTORICO-REGRAS.md` | Referência (opcional) |

---

## 🤖 Agentes Grok AI

⚠️ **Agentes da Grok AI devem sempre ler [`AGENTS.md`](AGENTS.md) antes de qualquer coisa.**

---

## 📖 Estrutura de Arquivos

### `.claude/rules/` (Rápido — use diariamente)
Cada arquivo é uma regra específica. Carrega só o que você abre.

- `INDEX.md` — Índice de todas
- `essentials.md` — Checklist de início
- `status-flow.md` — Ler STATUS.md, tarefas
- `git-quick.md` — Commits, push
- `security-banco.md` — RLS, JWT, gabarito
- `materias-global.md` — Matérias
- `atividades-banco.md` — Atividades no banco
- `seeds.md` — SEEDS-APLICADOS.md
- (mais no INDEX)

### `docs/regras/` (Detalhado — referência completa)
Regras extensas com exemplos e passo a passo.

- `materias.md` — Regra global completa
- `atividades.md` — Tudo sobre atividades
- `tarefas-agendadas.md` — Fila `tasks` detalhada
- (mais no CLAUDE.md antigo)

### Memória persistente
`.claude/projects/aulasenai/.../memory/` — consolidação por tema (opt-in)

---

## ✅ Regras Que Valem SEMPRE

1. **1 commit por tarefa** — Com `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`
2. **Push por ambiente:** Local = nunca. Nuvem = sempre (branch + PR)
3. **STATUS.md é verdade** — O que não está lá não aconteceu
4. **Seeds CONCLUÍDO antes** — Todos antes de tarefa nova
5. **Sem navegador** — Ler código, `node`, banco — nunca preview
6. **RLS + JWT** — Obrigatório em toda página e tabela

---

## 🔗 Links Importantes

- **Fluxo:** `tasks/STATUS.md` → `tasks/etapas/` → `tasks/TASKS.md`
- **Status de tarefas:** `.claude/rules/status-flow.md`
- **Seed mais novo:** `database/SEEDS-APLICADOS.md`
- **Documentação:** `.claude/rules/INDEX.md`

---

## 📝 Mudanças Recentes

- **2026-10-13:** Sistema de regras em `.claude/rules/` — contexto mínimo, carga rápida
- **2026-10-11 11:18:37:** Agentes Grok AI seguem `AGENTS.md`
- **2026-10-11 06:01:03:** Atividades só no banco, layout global

(Histórico completo: `docs/HISTORICO-REGRAS.md`)

---

## ❓ Dúvidas?

1. Procure no `.claude/rules/INDEX.md`
2. Se não achar, procure em `docs/regras/`
3. Se ainda não achar, procure em `docs/` (documentação temática)

**Tudo que está aqui é simplesmente um índice e apontador.** As regras reais estão em `.claude/rules/` (rápido) ou `docs/regras/` (detalhado).

---

*Sistema ativo desde 2026-10-13. Contexto mínimo, máxima praticidade.*
