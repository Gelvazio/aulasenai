# 🔀 Git Quick — Commit, Push, PR

## 💻 Local (máquina do usuário)

```bash
git add <caminho1> <caminho2>
git commit -m "feat(tema): descrição

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
# FIM — não fazer push
```

**Proibições:**
- ⛔ Nunca `git push`
- ⛔ Nunca `git add .`
- ⛔ Nunca `--force`

---

## ☁️ Nuvem (Claude Code web)

Claude faz automaticamente:
- `git push -u origin <branch>`
- Cria/atualiza PR para main
- Faz merge (resolve conflitos)
- Deleta a branch

---

## ✅ Exemplos

```
feat(materias): gerar atividades de ITIC
fix(banco): corrigir RLS de professor
docs(regras): atualizar CLAUDE.md
```

---

## ⚠️ O Que Nunca Publica

**Antes de add:**
- ❌ Gabarito, questões
- ❌ Listas de alunos, dados pessoais
- ❌ `.env`, chaves
- ✅ Markdown, JavaScript, SQL schema

---

**Mais detalhes:** `.claude/rules/INDEX.md`
