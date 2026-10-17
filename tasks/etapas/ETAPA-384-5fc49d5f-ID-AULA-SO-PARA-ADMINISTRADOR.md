## Etapa 384-5fc49d5f — "Id Aula:" do card só para o Professor Administrador

**Tarefa:** #257-5fc49d5f-746b-42cf-a145-0270967b5683 · **Pedido em:** 2026-10-17 12:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "o campo id aula,deve aparecer so para o professor administradod"
**Objetivo:** a etiqueta "Id Aula:" do card (#255) aparece só para o Professor Administrador
(antes: qualquer professor).

### #257.1 — Etiqueta só para o administrador

**Próximo passo:** — (entregue).

- **Nível:** PESADO — depende do papel do usuário (Professor Administrador).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** `indice-aula-repositorio.js`: função que pergunta ao banco
  (`eh_professor_administrador`); `indice-aula-data.js`: guarda `ehAdministrador` no estado dos
  cards e a etiqueta só é desenhada para ele.
- **Critérios de aceitação:** professor comum e aluno não veem a etiqueta; administrador vê;
  falha na consulta = não mostra.
- **Entrega (2026-10-17 12:11, Opus 5.5, s14):** `indice-aula-repositorio.js`: `verificarAdministradorCard`
  (RPC `eh_professor_administrador`; falha = false); `indice-aula-data.js`: `ehAdministrador` no
  estado (só consultado para professor) e `renderizarIdDaAulaNoCard` só desenha para ele;
  `docs/regras/atividades.md`.
- **Verificação:** `node --check` nos 2 `.js`; linhas novas ≤ 100 caracteres. Sem navegador.
