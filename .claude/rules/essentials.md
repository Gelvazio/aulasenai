# ⚡ Essentials — Checklist de 30 segundos

**Abra SEMPRE ao iniciar sessão.** Depois siga para `status-flow.md`.

## Primeiro

```bash
git fetch origin main    # Trazer atualizações de outras frentes
```

## Segundo — Ler Estes Arquivos

| Arquivo | O quê | Onde |
|---------|-------|------|
| `tasks/STATUS.md` | **Fonte única:** próximo passo, tarefas em uso, aguardando | Seções: "🧭 Frentes", "📌 Tarefas", "⏳ Aguardando" |
| `tasks/RECADOS.md` | Recados de outras frentes | Recados abertos para sua frente ou `todas` |
| `database/SEEDS-APLICADOS.md` | Status dos seeds | Marcar CONCLUÍDO antes de nova tarefa |

## Regras Que Valem SEMPRE

| Regra | O que fazer |
|-------|------------|
| **1 commit por tarefa** | Concluir → commit (Com Co-Authored-By) |
| **Fim de tarefa** | Commit + push + atualizar o quadro (`tasks/STATUS.md`, `tasks/TASKS.md`). Local e nuvem (nuvem: branch + PR) |
| **STATUS.md é verdade** | O que não está lá não aconteceu |
| **Seeds CONCLUÍDO antes** | Todos os seeds devem estar CONCLUÍDO antes de tarefa nova |
| **Toda tarefa é uma TASK** | Abrir a TASK e pedir detalhes ao solicitante antes de executar (`toda-tarefa-e-task.md`) |
| **Sem `git status` repetido** | Só `git diff --cached --name-only` antes de commitar |
| **Sem navegador para validar** | Ler código, `node`, banco — nunca preview |
| **RLS + JWT sempre** | Sem esses, não há segurança |

## Próximo?

→ Abra `status-flow.md` para entender o workflow de tarefas
→ Procure a regra no INDEX.md conforme precisar

---

**Data e hora:** Horário de Brasília (`TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M:%S"` na nuvem)
