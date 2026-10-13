# 🤖 AGENTS.md — Regras do projeto Aulas SENAI

> 📜 **Fonte única das regras para todas as IAs** (Claude, Gemini, Grok, Copilot, Devin,
> Antigravity…). Arquivos de uma IA só (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`…) apenas apontam
> para cá. **"Salvar no `CLAUDE.md`" = salvar aqui** ou no arquivo do assunto em `.claude/rules/`.

As regras ficam divididas por assunto em [`.claude/rules/`](.claude/rules/INDEX.md) (cada arquivo
≤ 5 KB). As regras de **tarefas** que servem para qualquer projeto ficam em
[`.claude/rules/tasks/`](.claude/rules/tasks/quadro.md). Detalhes com exemplos em `docs/regras/`.

> 👁️ **`.claude/rules/index.html` é APENAS um visualizador de regras e tarefas** — não é página
> do projeto e não deve ser usado nele (nem como componente, nem com header/login/banco). É
> gerado ([`visualizador-regras.md`](.claude/rules/visualizador-regras.md)).

## ⚡ Ao iniciar a sessão

1. [`essentials.md`](.claude/rules/essentials.md) — checklist de início
2. [`tasks/quadro.md`](.claude/rules/tasks/quadro.md) e
   [`tasks/ciclo-da-task.md`](.claude/rules/tasks/ciclo-da-task.md) — quadro e ciclo da TASK
3. [`INDEX.md`](.claude/rules/INDEX.md) — o resto, conforme o assunto

## ✅ Regras que valem SEMPRE

1. **Toda tarefa que muda algo vira TASK** (etapa em `tasks/etapas/` + linha no
   `tasks/STATUS.md`) e a IA pede detalhes antes de executar; pergunta sem mudança não vira TASK
   ([`tasks/ciclo-da-task.md`](.claude/rules/tasks/ciclo-da-task.md)).
2. **Tarefa grande = plano na própria etapa + aprovação** (sem plano separado em `docs/`).
3. **Cada informação em um lugar só:** etapa = detalhes; `tasks/STATUS.md` = índice
   ([`tasks/quadro.md`](.claude/rules/tasks/quadro.md)). O que não está no quadro não aconteceu.
4. **Fim de tarefa = 1 commit + push**, sempre na **`main`**, local e nuvem
   ([`git-quick.md`](.claude/rules/git-quick.md)).
5. **Seeds em dia** antes de tarefa nova, com as exceções de [`seeds.md`](.claude/rules/seeds.md).
6. **Sem navegador e sem testes automatizados**
   ([`testes-validacao.md`](.claude/rules/testes-validacao.md)).
7. **RLS + JWT** em toda página e tabela; o aluno nunca vê o gabarito
   ([`security-banco.md`](.claude/rules/security-banco.md)).
8. **Várias IAs ao mesmo tempo:** 1 tarefa reservada por frente; banco só pelo Claude Code local
   ([`tasks/frentes-e-reserva.md`](.claude/rules/tasks/frentes-e-reserva.md),
   [`multiplas-ias.md`](.claude/rules/multiplas-ias.md)).
9. **Mudou regra ou encerrou tarefa → regenerar o visualizador** `.claude/rules/index.html`.
10. **Sem sugestões** (2026-10-08, "PARE DE SUGERIR"): responder só o pedido, sem oferecer opções,
    "quer que eu…?" ou próximos passos; se o usuário afirma algo, aceitar sem conferir. Pedir os
    detalhes de uma TASK (regra 1) e relatar bloqueios continua valendo.

Histórico de mudanças das regras: [`docs/HISTORICO-REGRAS.md`](docs/HISTORICO-REGRAS.md).
