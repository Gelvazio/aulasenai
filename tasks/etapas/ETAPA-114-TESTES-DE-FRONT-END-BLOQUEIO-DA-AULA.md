> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 114 — Testes de Front-End: bloqueio da aula e das atividades; LOG escondido; slides em nova aba (tarefa pequena, pedido em 2026-10-09 01:04)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 114.1 | Tarefa #16 ligada **só em Testes de Front-End**: lista `assets/js/indice-bloqueio-aula-config.js`; botão "Aula liberada / Aula bloqueada" (`aulas.ativo`) antes de "Editar aula" (`assets/js/indice-aula-bloqueio.js` + `indice-aula-data.js`); aula bloqueada = card inteiro bloqueado para o aluno; nela o ON/OFF das atividades nunca bloqueia o card (`indice-atividades-bloqueio.js`); CSS em `indice-atividades-bloquear.css` e `indice-atividades.css`; carregamento em ordem no `atividades-crud-modal.js` | ✅ Concluído | 2026-10-09 01:06 | `node --check` nos 5 JS; nenhum nome global repetido entre os 19 scripts dos índices; chaves do CSS balanceadas; sem navegador |
| 114.2 | Botão "🧾 LOG" escondido em todos os índices (`LOG_ALTERNATIVAS_LIGADO = false`) | ✅ Concluído | 2026-10-09 01:06 | `node --check`; único botão de log do projeto |
| 114.3 | "📕 Slides" dos cards abrem em nova aba: 18 botões em 3 índices (ITIC, Fundamentos da Tecnologia, Testes de Front-End) + gerador de índices (`atributos_nova_aba`) | ✅ Concluído | 2026-10-09 01:07 | `grep`: nenhum botão de slides sem `target="_blank"`; `ast.parse` do gerador |
| 114.4 | Regras: `CLAUDE.md` (versão 2026-10-09 01:07:02), histórico, `TASKS.md` (#16), `docs/regras/atividades.md` | ✅ Concluído | 2026-10-09 01:07 | Leitura dos arquivos |
| 114.5 | Aceite do usuário (índice de Testes de Front-End como professor e como aluno) | ⬜ Pendente | — | — |
