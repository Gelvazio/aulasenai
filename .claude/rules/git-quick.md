# 🔀 Git Quick — Commit, Push, PR

## 💻 Local (máquina do usuário) — regra de 2026-10-13: commit + push + quadro

```bash
git add <caminho1> <caminho2>
git commit -m "feat(tema): descrição

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
git push origin main
# Depois: atualizar o quadro de tarefas (tasks/STATUS.md e tasks/TASKS.md)
```

**Proibições:**
- ✅ Ao concluir cada tarefa: commit + push + atualizar o quadro de tarefas
- ⛔ Nunca `git add .`
- ⛔ Nunca `--force`
- ⛔ Nunca push de tarefa incompleta ou falhando

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
