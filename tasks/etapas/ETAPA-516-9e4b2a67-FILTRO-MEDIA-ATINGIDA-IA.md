## Etapa 516-9e4b2a67 — Filtro ON/OFF "MEDIA ATINGIDA(IA)" no Progresso da turma

**Tarefa:** #367-9e4b2a67 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "adicione um botao de nome *MEDIA ATINGIDA(IA)*, QUE LISTA AS NOTAS DE ACORDO COM A NOTA SUGERIDA PELA IA, E ESTA >=7"
**Objetivo:** o professor liga o filtro e vê só os alunos cuja nota sugerida da IA (percentual de acerto da coluna "Nota parcial IA") atingiu a média (≥ 70%, nota 7).

### #367.1 — Filtro ON/OFF "MEDIA ATINGIDA(IA)"

**Próximo passo:** criar `assets/js/filtro-media-atingida-ia-progresso.js` e ligar depois do "ABAIXO MEDIA(IA)".

- **Nível:** MEDIO — JS com lógica, 2 arquivos (Jev, confiança 0,85)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/filtro-media-atingida-ia-progresso.js` (novo), `assets/js/progresso-turma-global.js`, `docs/regras/atividades.md`, `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`
- **Verificação:** node --check dos JS e py_compile ok; ligado = percentual de acerto da IA >= 70% (sem correção da IA some); desligado = todos. Conferir na tela: o usuário.
