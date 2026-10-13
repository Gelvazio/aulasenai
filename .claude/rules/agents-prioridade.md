# Prioridade das tarefas (seção 1.2)

> 📎 **Origem:** `AGENTS.md` (linhas 179–201 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Ao escolher a próxima tarefa ou criar/subdividir uma tarefa.

---

## 🎯 1.2 PRIORIDADE DAS TAREFAS (OBRIGATÓRIA)

Todo bloco de tarefa ou subtarefa, no `task-principal.md` e no `task_complete.md`, tem o campo logo abaixo de `Status:`:

```markdown
- **Prioridade:** ALTA
```

| Valor | Uso |
|---|---|
| `MAXIMA` | Acima de todas. Reservada para o que o usuário define como mais urgente (ex.: `SUB-38`, verificação geral) |
| `ALTA` | Bloqueia outras tarefas ou quebra a validação (build, typecheck, testes) |
| `MEDIA` | Trabalho normal do quadro; valor padrão quando nada for dito |
| `BAIXA` | Pode esperar; só é pega com orientação do usuário (ver regra 2) |

**Regras:**

1. **Ordem de captura:** entre os itens 🟢 livres, o agente pega sempre o de **maior prioridade** (`MAXIMA` → `ALTA` → `MEDIA` → `BAIXA`). Na mesma prioridade, vale a ordem do quadro. ⛔ Não pegar um item de prioridade menor enquanto houver item livre de prioridade maior.
2. **Exceção — orientação do usuário:** o agente só pega item de prioridade menor (ex.: `BAIXA`) quando **já recebeu orientação explícita do usuário** para isso (ou para uma tarefa específica). Registrar essa orientação na anotação do bloco.
3. **Prioridade não fura dependência nem trava:** item com dependência não `concluido`, travado por outro agente ou com 🔴 trava especial continua indisponível, qualquer que seja a prioridade.
4. **Quem define:** a prioridade é definida pelo usuário. Ao criar ou subdividir uma tarefa, o agente usa a da tarefa-mãe (ou `MEDIA`, se não houver) e não muda a prioridade de itens existentes sem pedido do usuário.
5. **Tarefas concluídas** mantêm o campo só como histórico; ele não tem efeito na fila.
