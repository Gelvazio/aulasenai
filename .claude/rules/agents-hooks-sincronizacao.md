# Hooks de sincronização (seção 1.3)

> 📎 **Origem:** `AGENTS.md` (linhas 204–241 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Ao configurar o clone, quando o push/merge for barrado ou o hook não rodar.

---

## 🪝 1.3 HOOKS DE SINCRONIZAÇÃO (VERSIONADOS — INSTALAR 1x POR CLONE)

Três hooks em [`.githooks/`](.githooks/) transformam as regras de sincronização de "boa intenção" em **impedimento mecânico**: o Git barra, em vez de depender de o agente lembrar.

| Hook | Quando roda | O que faz |
|---|---|---|
| [`.githooks/pre-push`](.githooks/pre-push) | a cada `git push` | Roda `git fetch --all --prune` e **RECUSA** o push (exit 1) quando o remoto tem commits que você não tem — o caso que seria rejeitado depois e que empurraria para o `--force` (proibido) |
| [`.githooks/post-checkout`](.githooks/post-checkout) | ao trocar de branch | Roda `git fetch --all --prune` e **avisa** (sem bloquear) quantos commits você está atrás do upstream. Não dispara durante rebase/merge/cherry-pick |
| [`.githooks/pre-merge-commit`](.githooks/pre-merge-commit) | quando `git merge`/`git pull` criaria um commit de merge | **RECUSA o commit de merge** (exit 1) — fecha o item 8 da seção 1.1 ("nunca merge"). Não afeta `pull --rebase`, fast-forward nem `merge --squash`. ⚠️ O Git deixa o merge **preparado** (`MERGE_HEAD`): a recuperação é `git merge --abort` |

### Instalação (obrigatória, uma vez por clone)

```bash
git config core.hooksPath .githooks   # ativa os três hooks
git config pull.rebase true           # faz o `git pull` simples já usar rebase
```

Nenhuma das duas vive no repositório: `core.hooksPath` e `pull.rebase` ficam no `.git/config`, que **não** é versionado — cada clone/pasta de trabalho precisa rodar os comandos uma vez. Confira com:

```bash
git config --get core.hooksPath     # deve imprimir: .githooks
git config --get pull.rebase        # deve imprimir: true
```

O `pull.rebase true` é a **prevenção**: sem ele, um `git pull` distraído tenta merge e só é barrado no fim pelo `pre-merge-commit` — que deixa o merge preparado e exige `git merge --abort` para desfazer.

### Detalhes que importam

- **⛔ Não usar `--force`:** o hook também bloqueia force-push, porque o commit do remoto deixa de ser ancestral do seu. Se o hook bloqueou, o caminho é `git fetch --all --prune` → `git pull --rebase origin main` → **reler o quadro** → publicar de novo.
- **Escape hatch:** `git push --no-verify` pula o `pre-push`; `git merge --no-verify <ref>` pula o `pre-merge-commit`. Só usar com motivo registrado na anotação do bloco da tarefa.
- **Se o merge foi bloqueado:** quase sempre é um `git pull` sem `--rebase`. O repositório **fica no meio do merge**, então rode nesta ordem: `git merge --abort` → `git fetch --all --prune` → `git pull --rebase origin main`. Fast-forward (`--ff-only`) e `--squash` **não** são afetados, porque não geram commit de merge.
- **Se o hook não rodar**, quase sempre é fim de linha: o [`.gitattributes`](.gitattributes) força `eol=lf` em `.githooks/*` porque, com CRLF, o shebang `#!/bin/sh` quebra no Git Bash. Verificação:
  ```bash
  git ls-files --eol .githooks    # esperado: i/lf  w/lf  attr/text eol=lf
  ```
- **Desativar:** `git config --unset core.hooksPath`.
- **Nada disso substitui o PASSO 1:** os hooks cobrem o *push*, a *troca de branch* e o *merge*, mas não o momento de **pegar tarefa**. O `git fetch --all --prune` + `git pull --rebase origin main` antes de ler o quadro continua obrigatório.
