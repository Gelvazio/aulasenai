# Reporte de progresso ao monitor (seção 4, opcional)

> 📎 **Origem:** `AGENTS.md` (linhas 271–302 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Só se o MCP do DashboardAI estiver disponível.

---

## 📡 4. REPORTE DE PROGRESSO (OPCIONAL)

Agentes conectados ao MCP do DashboardAI podem reportar o andamento ao **monitor em tempo real** (SUB-35) com a ferramenta `agent_event` ([`api/_lib/event-tools.ts`](api/_lib/event-tools.ts)), que grava em `agent_events`.

> ⚠️ **O reporte é complementar e NÃO substitui o protocolo de lock das seções 1 e 1.1.** A trava só vale quando está commitada e com push no `task-principal.md`; um evento `trava`, `inicio` ou `fim` no monitor não trava, não libera e não conclui nada. Se o MCP estiver indisponível, siga normalmente só com o quadro.

**Quando emitir (um evento por momento, sempre com `agente` igual ao nome usado no quadro e `task_codigo` da subtarefa):**

| Momento | `tipo` | Exemplo de `mensagem` |
|---|---|---|
| Logo após o push do lock | `inicio` | `Assumida SUB-35.45` |
| Etapas relevantes (implementação, testes, build) | `progresso` (com `etapa`) | `npm test verde (194 testes)` |
| Trabalho longo, a cada ~5 min sem outro evento | `heartbeat` | `Ainda em SUB-35.45` |
| Falha que impede a entrega | `erro` (com `status`) | `typecheck falhou em src/lib/x.ts` |
| Depois do push da entrega e da liberação da trava | `fim` | `Entregue em abc1234` |

**Exemplo (`tools/call`):**

```json
{ "jsonrpc": "2.0", "id": 1, "method": "tools/call",
  "params": { "name": "agent_event", "arguments": {
    "project": "default", "agente": "DashboardAI-Clone 08 (Grok Bot)", "tipo": "fim",
    "task_codigo": "SUB-35.45", "mensagem": "Entregue em abc1234",
    "chave_idempotencia": "fim:SUB-35.45:abc1234" } } }
```

**Regras:**
- Use `chave_idempotencia` em eventos que podem ser reenviados (ex.: `inicio:SUB-XX`, `fim:SUB-XX:<sha>`, `git:<sha>`): reenvios com a mesma chave são ignorados.
- Mensagens curtas (≤ 2.000 caracteres), sem segredos, tokens, chaves ou dados pessoais.
- Falha ao emitir um evento **não** bloqueia a subtarefa: registre no relatório e continue o protocolo do quadro.
- Agentes que só usam o quadro em Markdown não precisam emitir nada: o espelho `scripts/espelhar_quadro_eventos.py` (SUB-35.42/35.43) converte os commits `lock:`/`feat(...)`/`docs(board): concluir` em eventos.
