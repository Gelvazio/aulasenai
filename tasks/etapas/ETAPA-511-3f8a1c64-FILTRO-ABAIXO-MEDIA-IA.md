## Etapa 511-3f8a1c64 — Filtro ON/OFF "ABAIXO MEDIA(IA)" no Progresso da turma

**Tarefa:** #362-3f8a1c64 · **Pedido em:** 2026-10-24 18:19 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "deve ter um filtro com o nome *ABAIXO MEDIA(IA)* do tipo on/off, que deve se basear pela nota sugerida da IA"
**Objetivo:** o professor liga o filtro e vê só os alunos cuja nota parcial da IA ("Nota parcial IA") é menor que 7, mesmo antes da nota final.

### #362.1 — Filtro ON/OFF "ABAIXO MEDIA(IA)"

**Próximo passo:** criar `assets/js/filtro-abaixo-media-ia-progresso.js` e ligá-lo no `progresso-turma-global.js`, logo depois do "ABAIXO DA MEDIA".

- **Nível:** MEDIO — JS com lógica, 2 arquivos (Jev, confiança 0,91)
- **Modelo:** só Sonnet
- **Descrição:** ligado = só alunos com nota parcial da IA (`valorNotaParcial`) entre 0 e 7 (exclusive); sem nota da IA some; desligado = todos.
- **Entrega:** `assets/js/filtro-abaixo-media-ia-progresso.js` (novo, padrão dos filtros irmãos, preferência `abaixo-da-media-ia`); `assets/js/progresso-turma-global.js` (carrega e põe depois do "ABAIXO DA MEDIA"); `docs/regras/atividades.md`.
- **Verificação:** `node --check` dos dois JS ok; linhas ≤ 100; ligado = `valorNotaParcial` entre 0 e 7 (sem nota da IA some); desligado = todos. Conferir na tela: o usuário.
