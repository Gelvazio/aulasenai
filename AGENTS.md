# 🤖 AGENTS.md — Regras do projeto Aulas SENAI

> 📜 **Fonte única das regras para todas as IAs** (Claude, Gemini, Grok, Copilot, Devin,
> Antigravity…). Arquivos de uma IA só (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`…) apenas apontam
> para cá. **"Salvar no `CLAUDE.md`" = salvar aqui** ou no arquivo do assunto em `.claude/rules/`.

As regras ficam divididas por assunto em [`.claude/rules/`](.claude/rules/INDEX.md) (cada arquivo
≤ 5 KB). Detalhes com exemplos em `docs/regras/`; histórico em `docs/HISTORICO-REGRAS.md`.

> 👁️ **`.claude/rules/index.html` é APENAS um visualizador de regras e tarefas** — não é página
> do projeto e não deve ser usado nele (nem como componente, nem com header/login/banco). É
> gerado: a cada mudança em `.claude/rules/` ou em `tasks/`, rodar
> `python scripts/regras/gerar_visualizador_regras.py` e commitar o `index.html` junto
> ([`visualizador-regras.md`](.claude/rules/visualizador-regras.md)).

## ⚡ Ao iniciar a sessão

1. [`essentials.md`](.claude/rules/essentials.md) — checklist de 30 segundos
2. [`status-flow.md`](.claude/rules/status-flow.md) — ciclo da TASK em `tasks/STATUS.md`
3. [`INDEX.md`](.claude/rules/INDEX.md) — o resto, conforme o assunto

## ✅ Regras que valem SEMPRE

1. **Toda tarefa vira TASK** e a IA pede detalhes antes de executar
   ([`toda-tarefa-e-task.md`](.claude/rules/toda-tarefa-e-task.md)).
2. **Tarefa grande = plano em `docs/` + aprovação** ([`plano-docs.md`](.claude/rules/plano-docs.md)).
3. **Fim de tarefa = 1 commit + push + quadro atualizado**, sempre na **`main`**, local e nuvem,
   com `Co-Authored-By` do modelo em uso ([`git-quick.md`](.claude/rules/git-quick.md)).
4. **`tasks/STATUS.md` é a verdade** — o que não está lá não aconteceu.
5. **Seeds CONCLUÍDO** antes de tarefa nova ([`seeds.md`](.claude/rules/seeds.md)).
6. **Sem navegador e sem testes automatizados** ([`testes-validacao.md`](.claude/rules/testes-validacao.md)).
7. **RLS + JWT** em toda página e tabela; gabarito nunca sai do banco
   ([`security-banco.md`](.claude/rules/security-banco.md)).
8. **Várias IAs ao mesmo tempo:** 1 tarefa reservada por frente, `fetch` antes do `pull --rebase`,
   banco só pelo Claude Code local ([`multiplas-ias.md`](.claude/rules/multiplas-ias.md)).
9. **Mudou regra ou quadro → regenerar o visualizador** `.claude/rules/index.html`
   ([`visualizador-regras.md`](.claude/rules/visualizador-regras.md)).

## 📝 Mudanças recentes

- **2026-10-13:** visualizador `.claude/rules/index.html` (regras em cards + aba TASKS), gerado
  por `scripts/regras/gerar_visualizador_regras.py`; menu **Regras** do site abre ele em nova aba.
- **2026-10-13:** reestruturação de `.claude/rules/` — sem regras repetidas, cada arquivo ≤ 5 KB;
  protocolo de agentes adaptado ao `tasks/STATUS.md`; nuvem também trabalha só na `main`.
- **2026-10-11 11:18:37:** agentes Grok AI seguem este `AGENTS.md`.
- **2026-10-11 06:01:03:** atividades só no banco, layout global.

(Histórico completo: `docs/HISTORICO-REGRAS.md`)
