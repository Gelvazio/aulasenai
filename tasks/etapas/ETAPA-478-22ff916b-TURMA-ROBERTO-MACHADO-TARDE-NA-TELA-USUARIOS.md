## Etapa 478-22ff916b — Turma "Roberto Machado tarde" faltando na tela USUARIOS online

**Tarefa:** #349-22ff916b-7dd4-43ee-bc0e-c17abef6b037 · **Pedido em:** 2026-10-22 16:24 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "esta faltando a turma roberto machado tarde"
**Objetivo:** a turma Roberto Machado (tarde) aparece na tela USUARIOS online com os alunos e
as senhas, como as demais (#345).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 16:25 | Banco pela nuvem (consulta e, se preciso, cadastro), mesma exceção autorizada na #345 | Claude Code (Opus 5.5) | continuação da #345, autorizada pelo usuário |

### #349.1 — Achar por que a turma não aparece e corrigir

**Próximo passo:** comparar a turma no `scripts/LISTAPRESENCA.js` com `turma`, `turmaaluno` e
`usuario` no banco.

- **Nível:** PESADO — banco (consulta e cadastro de turma/alunos), senhas
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** a RPC `listar_usuarios_senhas()` devolve os alunos da turma.
- **Entrega:** — · **Verificação:** —
