---
name: liderar-equipe
description: Fluxo do líder da equipe de agentes do Codex - sincroniza, classifica o nível das subtarefas livres, reserva UMA por vez, delega ao executor do nível (executor-leve, executor-medio ou executor-pesado), confere e valida a entrega, commita e segue para a próxima. Use quando o usuário pedir "rode a equipe", "lidere a equipe", "faça as tarefas com os agentes" ou "/liderar-equipe". Só para o Codex com Opus 5.5 ou superior, ou Fable, como líder.
---

# Liderar a equipe (liderar-equipe)

Regras: `AGENTS.md` → `.Codex/rules/` (quadro, reserva, ciclo, git) e
`.Codex/rules/niveis.md` (níveis e quem pega). Esta skill só descreve **o trabalho do líder**.

## Quem é quem

| Papel | Quem | Pode |
|---|---|---|
| **Líder** | esta sessão (Codex com Opus 5.5+ ou Fable) | Git, quadro, banco (se local), validar, decidir |
| `classificador-tarefas` | subagente (Haiku) | só acrescentar `- **Nível:**` nas etapas |
| `executor-leve` / `executor-medio` / `executor-pesado` | subagentes (Haiku / Sonnet / Opus) | só editar os arquivos da subtarefa |

## Modo: **uma subtarefa por vez, na mesma pasta**

Nada em paralelo: uma subtarefa só começa depois que a anterior foi entregue (commit + push) ou
liberada. Assim não há dois agentes nos mesmos arquivos nem no Git.

## Ciclo do líder

1. **Sincronizar:** `git fetch --all --prune` + `git pull --rebase origin main`; ler
   `tasks/STATUS.md` e `tasks/RECADOS.md`.
2. **Classificar:** subtarefas livres sem `- **Nível:**` → subagente `classificador-tarefas` com a
   lista de códigos. Conferir (nível plausível pelos sinais; na dúvida, subir) e commitar:
   `docs(tarefas): classificar <códigos> por <líder>`.
3. **Escolher UMA** subtarefa livre (prioridade, dependências ✅, sem reserva). Tarefa **grande**
   (`tasks/ciclo-da-task.md`) sem plano aprovado → parar e pedir ao usuário.
4. **Reservar** em nome do executor, como frente própria — ex.:
   `Codex (Sonnet · executor-medio) (local · main) (desde <data hora>)` — e fazer
   `lock: assumindo #N.x por <frente do executor>` + push **antes** de delegar.
5. **Delegar** pelo nível: `LEVE` → `executor-leve`, `MEDIO` → `executor-medio`,
   `PESADO` → `executor-pesado`. Mandar: código, nome da reserva, descrição e critérios (seção da
   etapa) e a **lista exata de arquivos** que pode alterar.
6. **Conferir** o relatório e o diff: `git diff --name-only` só com os arquivos da lista (arquivo a
   mais → desfazer esse arquivo ou devolver ao executor); critérios atendidos.
7. **Validar** pela `.Codex/rules/testes-validacao.md` (`node --check`, JSON, Python — comando
   `/validar`). Falhou → devolver ao executor com o erro (até 2 vezes); depois, liberar a reserva
   e avisar o usuário. ⛔ O líder **nunca** faz a subtarefa no lugar do executor (regra de níveis:
   nunca executar tarefa que não é do seu modelo).
8. **Entregar:** seção da subtarefa com entrega e verificação; linha ✅ e "Em uso por" = `—`;
   **1 commit** `feat(<tema>): … (#N.x) por <frente do executor>` com os
   arquivos + quadro; push.
9. **Próxima:** voltar ao passo 1. Parar quando não houver subtarefa livre, quando o usuário pedir,
   ou quando a próxima precisar de decisão ou autorização do usuário.

## Casos especiais

- **Banco de dados** (SQL, RLS, RPC, seeds, consultas): o próprio líder faz, se for o Codex
  **local**; na nuvem, liberar e anotar (`.Codex/rules/multiplas-ias.md`). Produção exige
  autorização do usuário, salvo o ciclo de seeds já autorizado (`seeds.md`).
- **Gabarito ou RLS:** conferir a `.Codex/rules/security-banco.md` antes de aceitar a entrega.
- **Executor travou ou a subtarefa é maior que o nível:** liberar a reserva (`—` + `⬜ Pendente`),
  dividir ou reclassificar, anotar na seção e voltar ao passo 1.
- **Tipo de subagente indisponível:** usar um agente geral com o **modelo do nível** e o texto do
  `.Codex/agents/executor-*.md` correspondente no pedido.
- **Executor aponta problema fora da lista de arquivos:** o líder decide; se corrigir, registra na
  entrega como "ajuste do líder".
- **Push recusado:** `fetch` + `pull --rebase`, reler o quadro e repetir o push. Nunca `--force`.

## Proibido

- ⛔ Mais de uma subtarefa em andamento ao mesmo tempo.
- ⛔ Executor ou classificador usando Git ou editando o quadro (fora a linha `Nível`).
- ⛔ Pular a reserva, o commit por subtarefa ou a validação.
- ⛔ Mudar prioridade, ou pegar subtarefa reservada por outra frente.
