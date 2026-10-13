# ⚡ Essentials — Checklist de início de sessão

**Abra SEMPRE ao iniciar.** Depois siga para `status-flow.md`. Índice completo: `INDEX.md`.

## 1. Sincronizar

```bash
git fetch --all --prune          # atualiza origin/main (sem isso o git status mente)
git pull --rebase origin main    # nunca pull sem --rebase (gera merge)
```

## 2. Ler, nesta ordem

| Arquivo | Para quê |
|---------|----------|
| `CLAUDE.md` → `AGENTS.md` | Regras do projeto (precedência máxima) |
| `tasks/STATUS.md` | Fonte única: frentes, tarefas em uso, próximo passo |
| `tasks/RECADOS.md` | Recados de outras frentes para você ou `todas` |
| `database/SEEDS-APLICADOS.md` | Todo seed CONCLUÍDO antes de tarefa nova (`seeds.md`) |
| `docs/` e `bugs/` | Orientação do módulo antes de editar (`docs-antes-de-editar.md`) |

Se houver item `🔄`/`⬜` de tarefa aprovada da sua frente: conferir o que já foi feito
(arquivos e commits) e **continuar de onde parou** — sem refazer `✅` nem pular itens.

## 3. Regras que valem SEMPRE

| Regra | Arquivo |
|-------|---------|
| Toda tarefa vira TASK; pedir detalhes antes de executar | `toda-tarefa-e-task.md` |
| Tarefa grande = plano em `docs/` + aprovação | `plano-docs.md` |
| Fim de tarefa = commit + push + quadro atualizado, tudo na `main` | `git-quick.md` |
| STATUS.md é verdade: o que não está lá não aconteceu | `status-flow.md` |
| Sem navegador e sem testes automatizados | `testes-validacao.md` |
| RLS + JWT em toda página e tabela; gabarito nunca sai do banco | `security-banco.md` |
| Código: SOLID, ≤ 1000 linhas/arquivo, ≤ 45 linhas/função, nomes em PT | `codigo-*.md` |

## 4. Checklist

```
☐ Fiz fetch + pull --rebase?
☐ Li tasks/STATUS.md e retomei de onde parou?
☐ Seeds todos CONCLUÍDO?
☐ Li a orientação em docs/ do que vou mexer?
☐ Sei se a tarefa é pequena ou grande?
```

---

**Data e hora:** sempre de Brasília (`TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M:%S"`).
