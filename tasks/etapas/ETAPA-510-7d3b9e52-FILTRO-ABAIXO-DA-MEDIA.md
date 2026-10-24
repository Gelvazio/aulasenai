## Etapa 510-7d3b9e52 — Filtro ON/OFF "ABAIXO DA MEDIA" no Progresso da turma

**Tarefa:** #361-7d3b9e52 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "crie filtro de nome *ABAIXO DA MEDIA*, do tipo ON/OFF, se ligado, liste apenas alunos que tiraram menos do que 7"
**Objetivo:** o professor liga o filtro e vê só os alunos com nota final menor que 7.

### #361.1 — Filtro ON/OFF "ABAIXO DA MEDIA"

- **Nível:** MEDIO — JS com lógica, 2 arquivos (Jev, confiança 0,92)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/filtro-abaixo-media-progresso.js` (novo, padrão dos filtros irmãos, preferência `abaixo-da-media`); `assets/js/progresso-turma-global.js` (carrega e põe depois do "Nota IA Gerada"); `docs/regras/atividades.md`.
- **Verificação:** `node --check` dos dois JS ok; linhas ≤ 100; ligado = nota final < 7 (sem nota final some); desligado = todos. Conferir na tela: o usuário.
