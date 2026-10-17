## Etapa 331-23c1d3e3 — Tirar "Data da aula" de todos os cards de atividades

**Tarefa:** #204-23c1d3e3-d3bf-4014-ab26-2f656f6f3081 · **Pedido em:** 2026-10-16 15:06 · **Criada por:** Claude Code (Opus 5.5) (local · main · s10)
**Pedido:** "Data da aula:,APAGUE DE TODOS OS CARDS DE ATIVIDADES"
**Objetivo:** os cards dos índices de atividades (`ATIVIDADES/index.html` de todas as matérias)
deixam de mostrar a linha "📅 Data da aula: …".

### #204.1 — Tirar a linha "Data da aula" dos cards

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — JS com lógica, 1 a 3 arquivos
- **Descrição:** a linha é criada por `assets/js/indice-aula-data.js`, que vale para todos os
  índices; tirar só a exibição (a data continua no banco e no modal "Editar aula").
- **Critérios de aceitação:** nenhum card de atividade mostra "Data da aula".
- **Entrega:** `assets/js/indice-aula-data.js` sem `renderizarDataNoCard`, `formatarDataAula` e os
  textos da data; `assets/css/indice-aula-data.css` sem as classes `.aula-data*` da linha;
  `docs/regras/usuarios-turmas-paginas-professor.md` atualizado. A data continua no banco e no
  modal "Editar aula". **Verificação:** `node --check` ok; nenhum HTML ou gerador escreve "Data da
  aula" no card (grep); confirmar na página (sem navegador aqui).

### #204.2 — Aceite do usuário

**Próximo passo:** — (aceite do usuário em 2026-10-16 21:08: "Aceito tudo").

- **Nível:** LEVE — confirmação do usuário
