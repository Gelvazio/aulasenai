## Etapa 495-f6d2a4b8 — ID-ATIVIDADE-TITULO: ID da atividade no título do cabeçalho

**Tarefa:** ID-ATIVIDADE-TITULO · **Pedido em:** 2026-10-24 17:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s495)
**Pedido:** "DEVE APARECER O ID DA ATIVIDADE NO TITULO TB" (cabeçalho roxo da página de atividade, ex.: "Avaliação Prática: Aulas 01 a 10")
**Objetivo:** o título do cabeçalho das páginas de atividade mostra o id da atividade (tabela `atividade`) junto ao nome.

### ID-ATIVIDADE-TITULO.1 — Mostrar o id da atividade no título do cabeçalho

**Próximo passo:** — (concluída)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** o `h1` do cabeçalho passa a mostrar o id (ex.: `#123`) junto ao título, lido do banco; implementação única e global, sem editar cada página.
- **Critérios de Aceitação:** id aparece no título; sem `!important`; `node --check` passa; linhas ≤ 100 caracteres.
- **Entrega:** `assets/js/atividade-id-titulo.js` (novo), `js/header-usuario.js`, `assets/css/atividade.css`, `docs/regras/atividades.md` no commit desta entrega · **Verificação:** `node --check` ok nos 2 JS; sem linha nova > 100 caracteres; id lido por `atividade.pagina` (mesmo critério do bloqueio da aula); sem editar as 160 páginas; `header-usuario.js` não tem orientação em `docs/` (módulo sem ORIENTACAO, avisado ao usuário); conferir na tela (sem navegador)
