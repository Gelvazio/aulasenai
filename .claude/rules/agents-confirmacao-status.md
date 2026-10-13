# Confirmação de status das tarefas (seção 5)

> 📎 **Origem:** `AGENTS.md` (linhas 305–329 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Ao verificar ou reconfirmar a conclusão de uma subtarefa.

---

## ✅ 5. REGRA DE CONFIRMAÇÃO DE STATUS DAS TAREFAS

Após qualquer verificação de conclusão de subtarefa (pelo usuário ou por um agente), **obrigatoriamente** adicione a seguinte linha no bloco da subtarefa (no `task-principal.md` ou, se já concluída, no `task_complete.md`):

```markdown
- **STATUS-TAREFA-CONFIRMADO-CONCLUIDO:** <valor>
```

### Valores permitidos

| Situação | Valor da linha | Exemplo |
|----------|----------------|---------|
| Tarefa **confirmada** como realmente concluída (código/documentação verificados) | Data e hora da confirmação + agente | `2026-10-12 08:43 (reconfirmado por Grok)` |
| Tarefa **não confirmada** ou ainda em verificação | `PENDENTE` | `PENDENTE` |

### Regras

1. A linha deve ficar no final do bloco da subtarefa (depois de **Anotação**; o marcador `VERIFICADOR-CLAUDE` da `SUB-38`, quando existir, vem logo abaixo dela).
2. Só marque com data/hora se a entrega foi **explicitamente verificada** (arquivo existe, conteúdo atende aos critérios, commit correspondente).
3. Subtarefas ainda `[ ]` ou com implementação placeholder/incompleta devem permanecer `PENDENTE`.
4. Ao reconfirmar uma tarefa já marcada, atualize a linha com a nova data e indique “reconfirmado”.
5. Esta confirmação é **complementar** ao status normal (`concluido` / `pendente`) e ao protocolo de lock. Não substitui o commit da entrega nem a atualização do status principal.

> ⚠️ Esta regra foi adicionada em 2026-10-12 após a restauração do quadro e a verificação das entregas recentes.
