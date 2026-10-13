# 🔀 Git Quick — Commit e push

Único lugar das regras de git do projeto. Vale para **local e nuvem** e para todas as IAs.

## Tudo na `main`

- Trabalho, quadro e regras vão direto para a **`main`** — também nas sessões de nuvem, mesmo que
  a ferramenta indique outra branch. ⛔ Sem branches paralelas, sem `git worktree`, sem PR para
  entregar tarefa.
- Push para a `main` recusado por **permissão** → parar e avisar o usuário; não publicar em outra
  branch como alternativa.

## Quando commitar

| Momento | O que vai no commit |
|---------|---------------------|
| Reserva da tarefa (`tasks/frentes-e-reserva.md`) | Só o quadro — commit + push imediatos |
| **Fim da tarefa** | Arquivos da tarefa + quadro (`tasks/STATUS.md` e a etapa) + visualizador regenerado — **1 commit + push** |
| Usuário pede "faça commit agora" | Na hora, mesmo no meio da tarefa |

- Usuário diz "só commit, sem push" → respeitar.
- Executar os comandos de git **direto, sem perguntar**.

## Fluxo

```bash
git fetch --all --prune          # sem isso o git status mente
git pull --rebase origin main    # nunca pull sem --rebase (gera merge)
python scripts/regras/gerar_visualizador_regras.py   # só no fim da tarefa (visualizador-regras.md)
git add <caminho1> <caminho2>    # só os arquivos da tarefa + quadro
git diff --cached --name-only    # conferir o que vai no commit
git commit -m "feat(tema): descrição por <IA> (<frente>)

Co-Authored-By: <nome do modelo em uso> <e-mail noreply do fornecedor da IA>"
git push origin main
```

- Claude: `Co-Authored-By: Claude <modelo> <noreply@anthropic.com>`; outras IAs usam o nome e o
  e-mail noreply do próprio fornecedor.
- Push recusado porque o remoto andou → `fetch` + `pull --rebase` + reler o quadro + push de novo.
  Conflito no `.claude/rules/index.html` → regenerar (não resolver à mão).

## Proibido

- ⛔ `git add .` (arrasta arquivos de outra tarefa ou de outra frente)
- ⛔ `git push --force`
- ⛔ `git pull` sem `--rebase` e `git merge`
- ⛔ `git status` repetido entre comandos ou depois do commit (o git já avisa erros)
- ⛔ Várias tarefas num commit só, ou tarefa concluída sem commit
- ⛔ Commit/push de tarefa incompleta ou falhando

## O que vai para o Git e o que vai para o site

| Arquivo | Git | Site (Vercel) |
|---------|-----|---------------|
| `.env`, chaves, tokens, `variaveis.js` | ❌ (`.gitignore`) | ❌ |
| Gabaritos, fontes de questões, seeds de atividades, listas de alunos e de presença | ✅ | ❌ (`.vercelignore`) |
| Markdown, JavaScript, HTML, schema SQL | ✅ | ✅ |

Arquivo novo com resposta certa ou dado pessoal → conferir se o `.vercelignore` já o tira do site.

## Mensagens

```
feat(materias): gerar atividades de ITIC
fix(banco): corrigir RLS de professor
docs(regras): reestruturar .claude/rules
```
