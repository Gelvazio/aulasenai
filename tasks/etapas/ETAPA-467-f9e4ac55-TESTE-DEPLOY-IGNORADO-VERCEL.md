## Etapa 467-f9e4ac55 — Testar o deploy ignorado na Vercel

**Tarefa:** #338-f9e4ac55-f1aa-427b-b073-44cfd3cef801 · **Pedido em:** 2026-10-21 19:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s35)
**Pedido:** "crie uma tarefa de testes" (depois da #337, `ignoreCommand` no `vercel.json`)
**Objetivo:** confirmar na Vercel que push só de `tasks/` não gera deploy e que push com outro
arquivo continua publicando. Teste manual de conferência, sem teste automatizado.

### #338.1 — Conferir na Vercel os deploys depois da #337

**Próximo passo:** consultar os deploys do projeto `aulasenai` na Vercel (MCP `list_deployments`
ou painel) criados depois de 2026-10-21 19:06 e preencher a tabela abaixo.

- **Nível:** LEVE — só consulta e registro em `.md`, sem código
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** o próprio commit que criou esta tarefa mexe só em `tasks/` e é o primeiro caso
  de teste. Conferir:

  | Caso | Commit | Esperado | Resultado |
  |------|--------|----------|-----------|
  | 1. `vercel.json` mudou (#337) | `dfff3dc7` | Deploy publicado (READY) | ⬜ |
  | 2. Só `tasks/` (criação desta tarefa) | commit `chore(quadro): cria #338` | Sem deploy, ou CANCELED com "Ignored Build Step" | ⬜ |
  | 3. Só `tasks/` (reserva desta subtarefa) | commit da reserva | Sem deploy, ou CANCELED | ⬜ |

- **Critérios de aceitação:** os 3 casos com o resultado esperado; se o caso 2 ou 3 publicar
  (READY), registrar o log do build e marcar ⛔ com o motivo.
- **Entrega:** —
- **Verificação:** —
