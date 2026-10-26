## Etapa 541-5d8a3f26 — Filtros do Progresso da turma só filtram quando ligados

**Tarefa:** #394-5d8a3f26 · **Pedido em:** 2026-10-26 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** filtros da barra de progresso só filtram se estiverem ativos (desligado = não filtra nada), salvos no localStorage, para todas as barras de progresso.
**Objetivo:** padronizar os ON/OFF do `progresso-turma-global.js`.

### #394.1 — Ajustar Entregue, Faltou, RECUPERAÇÃO, Prova Corrigida e Nota IA
**Próximo passo:** nenhum (entregue).
- **Nível:** MEDIO — JS de 5 arquivos de filtro, sem banco.
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/filtro-{entregue,recuperacao,corrigida,nota-ia}-progresso.js`, `falta-aluno-progresso.js`, `docs/regras/atividades.md`. O localStorage já existia (`progresso-turma:<chave>`); os demais filtros já só filtravam ligados.
- **Verificação:** `node --check` nos 5 arquivos; leitura do `filtrar` de cada um.
