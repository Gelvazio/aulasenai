> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 70 — Reorganizar o CLAUDE.md: estrutura e manutenção (pedida em 2026-10-07)

Plano: [docs/reorganizar-claude-md-estrutura.md](docs/reorganizar-claude-md-estrutura.md). Uma alteração por vez, perguntando ao usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 70.1 | Dividir as regras em `docs/regras/` — escolha do usuário: "Núcleo + docs/regras". `CLAUDE.md` 2.748 → 640 linhas; 36 seções movidas para 6 arquivos; índice + proibições no `CLAUDE.md`; `regras-modal.js` carrega os arquivos do índice | ✅ Concluído | 2026-10-07 21:15 | Comparação linha a linha antes × depois: nenhum texto perdido; `node --check`; os 6 links do índice existem |
| 70.2 | Histórico de versões para `docs/HISTORICO-REGRAS.md` — escolha do usuário: "Mover para docs/". Completo (53 linhas) no arquivo novo; no `CLAUDE.md` o resumo das 5 mais recentes + link; regra do visualizador manda registrar nos dois; modal carrega o histórico | ✅ Concluído | 2026-10-07 21:18 | Todas as linhas do histórico antigo presentes no novo; `node --check`; links do modal existem |
| 70.3 | "Próximo passo" do `STATUS.md` em tabela — escolha do usuário: "Linha curta + tabela". Seção "⏳ Aguardando o usuário" com 28 linhas (Etapa · Item · O que falta · Tipo), 49.2 sem repetição | ✅ Concluído | 2026-10-07 21:25 | Todas as pendências da linha antiga presentes na tabela |
| 70.4 | Versão das regras + commit | ✅ Concluído | 2026-10-07 21:25 | Versões 21:10 e 21:15 no histórico; commits b4148c0, afec916 e o desta etapa |
| 70.5 | Aceite do usuário: CLAUDE.md dividido em núcleo + `docs/regras/`, histórico em `docs/HISTORICO-REGRAS.md` e esta tabela; depois, as correções das contradições do CLAUDE.md, uma de cada vez | 👀 Aguardando o usuário | — | — |
