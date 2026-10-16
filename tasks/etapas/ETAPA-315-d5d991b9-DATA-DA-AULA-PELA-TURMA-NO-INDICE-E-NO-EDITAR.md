## Etapa 315-d5d991b9 — Data da aula pela turma (recarregar ao trocar a turma e editar em `aula_turma`)

**Tarefa:** #188-d5d991b9-ce60-4c8e-a642-479c623ebc3d · **Pedido em:** 2026-10-16 08:25 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s5)
**Pedido:** "ao mudar a turma em cima,deve recarregar as datas certas, e ao editar a aula, a data da
aula,deve ser pega e atualizada da tabela aula_turma"
**Objetivo:** a data (e o bloqueio) da aula passam a vir de `aula_turma` da turma escolhida no combo,
recarregam ao trocar a turma, e o "✏️ Editar aula" lê e grava a data nessa tabela.

### #188.1 — Ler e gravar a data da aula em `aula_turma` (índice e "Editar aula")

**Próximo passo:** ler `docs/regras/atividades.md` e os módulos `indice-aula-*.js` e fazer a troca.

- **Nível:** MEDIO — telas com lógica (JS), de 1 a 3 arquivos.
- **Critérios de aceitação:** trocar a turma recarrega as datas; "Editar aula" mostra e grava a data
  da turma escolhida em `aula_turma`; `node --check`.
