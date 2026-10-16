# ⚡ Essentials — Checklist de início de sessão

**Abra SEMPRE ao iniciar.** As regras que valem sempre estão listadas no `AGENTS.md`; índice
completo: `INDEX.md`.

## 1. Sincronizar

Trazer a `main` antes de ler qualquer coisa: `git fetch --all --prune` + `git pull --rebase origin
main` (comandos e proibições: `git-quick.md`).

## 2. Ler, nesta ordem

| Arquivo | Para quê |
|---------|----------|
| `CLAUDE.md` → `AGENTS.md` | Regras do projeto (precedência máxima) |
| `tasks/STATUS.md` | Quadro: frentes, tarefas e reservas (`tasks/quadro.md`) |
| Etapa da tarefa da sua frente | Próximo passo — retomar de onde parou (`tasks/ciclo-da-task.md`) |
| `tasks/RECADOS.md` | Recados de outras frentes para você ou `todas` |
| `database/SEEDS-APLICADOS.md` | Seeds em dia antes de tarefa nova (`seeds.md`) |
| `docs/` e `bugs/` | Orientação do que vai editar (`docs-antes-de-editar.md`) |

## 3. Checklist

```
☐ Trouxe a main (fetch + pull --rebase)?
☐ Li o STATUS.md, a etapa da minha frente e os recados?
☐ Seeds em dia (ou exceção de seeds.md)?
☐ Li a orientação em docs/ do que vou mexer?
☐ Sei se a tarefa é pequena ou grande (tasks/ciclo-da-task.md)?
```

---

**Data e hora:** sempre de Brasília. No Windows local, `date` ou `Get-Date` (o relógio já está em
Brasília) — `TZ=America/Sao_Paulo date` no Git Bash sai em UTC (3 h a mais). Na nuvem:
`TZ=America/Sao_Paulo date`.
