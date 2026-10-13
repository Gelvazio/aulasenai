# 🔀 Git Quick — Commit e push

**Regra (2026-10-13):** ao concluir **cada tarefa** = **1 commit + push + quadro atualizado**
(`tasks/STATUS.md` e `tasks/TASKS.md`). Vale para **local e nuvem**, sempre na **`main`**
(`multiplas-ias.md`).

## Fluxo

```bash
git fetch --all --prune
git pull --rebase origin main
git add <caminho1> <caminho2>        # só os arquivos da tarefa + quadro
git diff --cached --name-only        # conferir o que vai no commit
git commit -m "feat(tema): descrição

Co-Authored-By: <modelo em uso> <noreply@anthropic.com>"
git push origin main
```

- Push recusado porque o remoto andou → `fetch` + `pull --rebase` + reler o quadro + push de novo.
- Usuário pede "faça commit agora" → commitar na hora, mesmo no meio da tarefa.
- Usuário diz "só commit, sem push" → respeitar.
- Executar os comandos de git **direto, sem perguntar**.

## Proibido

- ⛔ `git add .` (arrasta `__pycache__`, gabaritos, listas de alunos)
- ⛔ `git push --force`
- ⛔ `git pull` sem `--rebase` (gera merge) e `git merge`
- ⛔ `git worktree` e branches paralelas
- ⛔ `git status` repetido entre comandos ou depois do commit (o git já avisa erros)
- ⛔ Várias tarefas num commit só, ou tarefa concluída sem commit
- ⛔ Commit/push de tarefa incompleta ou falhando

## Nunca publicar

- ❌ Gabarito e questões de atividade (ficam só no banco)
- ❌ Listas de alunos e dados pessoais
- ❌ `.env`, chaves e tokens
- ✅ Markdown, JavaScript, schema SQL — respeitando o `.gitignore`

## Mensagens

```
feat(materias): gerar atividades de ITIC
fix(banco): corrigir RLS de professor
docs(regras): reestruturar .claude/rules
```
