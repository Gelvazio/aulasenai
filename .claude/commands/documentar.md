---
description: Atualiza a orientação em docs/ dos arquivos alterados na tarefa
argument-hint: "[arquivo, opcional]"
---

Atualize a documentação de **$ARGUMENTS** (vazio = arquivos alterados na tarefa), conforme a
tabela de `.claude/rules/docs-antes-de-editar.md`:

- Módulo de `js/` → `docs/ORIENTACAO_JS_<MODULO>.md` (sem orientação → avisar o usuário).
- Banco → `docs/database.md` e `docs/relatorio_verificacao_database.html` sincronizados.
- Demais → cabeçalho do próprio arquivo e regra do assunto em `docs/regras/`.

Escrever só o que mudou (funções, parâmetros, regras de RLS/JWT), em linguagem simples. ⛔ Não
criar plano nem lista de pendências em `docs/` (o plano é a etapa — `tasks/quadro.md`).
