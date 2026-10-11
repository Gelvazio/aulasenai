## Etapa 139-b5ab1a00 — Regra global de matérias (tarefa pequena, pedida em 2026-10-10 22:16)

Pedido: "Pegue tudo como a matéria ITIC é feita e torne 1 regra global de matérias, e assim em vez de
consultar modelo ITIC, consulta a regra global; anote isso no CLAUDE.md".
Frente: nuvem · claude/verificar-status-pastas-c6s5yz.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 139.1 | `docs/regras/materias.md`: estrutura da pasta, ementa e `materia.json`, aulas em `CONTEUDO/` (partes da aula), objetiva de 50, prática 10 × 3, avaliações e média final, índice e menu, apostila, 5 status, banco e seeds, ordem de construção, critério de pronto e exceções | ✅ Concluído | 2026-10-10 22:20 | Conferido com a pasta da ITIC, os geradores de `assets/` e as regras de `docs/regras/` |
| 139.2 | `CLAUDE.md`: seção "🧱 REGRA GLOBAL DE MATÉRIAS" no lugar de "MATÉRIA MODELO", regra de sempre, linha no índice das regras detalhadas e menções à "matéria modelo" trocadas; versão 2026-10-10 22:19:46 e histórico (resumo + `docs/HISTORICO-REGRAS.md`) | ✅ Concluído | 2026-10-10 22:20 | Linha de versão no formato do `regras-modal.js`; o link `[docs/regras/materias.md](docs/regras/materias.md)` casa com `PADRAO_ARQUIVOS_REGRAS` (o visualizador passa a mostrar o arquivo) |
| 139.3 | Rotinas que conferem as matérias (`scripts/analise-materias.py`, `scripts/status-materias/`) e `tasks/TASKS.md` / Etapa 125 apontando para a regra global | ✅ Concluído | 2026-10-10 22:20 | `grep` sem "matéria modelo" / "padrão da ITIC" fora do histórico |
| 139.4 | Aceite do usuário | ⬜ Pendente | — | — |
