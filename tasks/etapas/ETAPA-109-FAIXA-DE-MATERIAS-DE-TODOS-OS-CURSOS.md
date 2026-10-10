> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 109 — Faixa de matérias de todos os cursos abre em SOMENTE ENSALADO (tarefa pequena, pedido em 2026-10-08 21:15:15)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 109.1 | **Todos os cursos**: a faixa de matérias abre em SOMENTE ENSALADO (`assets/js/faixa-materias-ensalado.js`, `aplicarFiltroInicialEnsalado`); sem matéria ensalada ou sem banco mostra todas; VER TODAS MATÉRIAS continua. Regra no `CLAUDE.md` (seção FAIXA DE MATÉRIAS), histórico e regra global | ✅ Concluído | 2026-10-08 21:15:46 | `node --check`; leitura do código (sem navegador) — teste na página fica com o usuário |
| 109.2 | Botão do filtro em uso (SOMENTE ENSALADO ou VER TODAS MATÉRIAS) em fundo verde piscando levemente (`faixa-materias__filtro--ativo`, sem animação com `prefers-reduced-motion`) | ✅ Concluído | 2026-10-08 21:19:06 | `node --check`; leitura do código |
| 109.3 | Índice do curso: a grade de matérias de baixo segue o filtro de cima (cartões casados pelo link da matéria; nas páginas de matéria nada muda) | ✅ Concluído | 2026-10-08 21:19:06 | `node --check`; linhas ≤ 100; leitura do código — teste na página fica com o usuário |
| 109.4 | Aceite do usuário | ⬜ Pendente | — | — |
