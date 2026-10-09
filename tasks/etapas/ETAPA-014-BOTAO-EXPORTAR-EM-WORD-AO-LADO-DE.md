> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 14 — Botão "Exportar em Word" ao lado de cada exportar PDF (regra global) (pedida em 2026-10-05)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 14.1 | `assets/js/documento-word.js` (documento .doc MHTML, A4, rodapé com páginas, imagens embutidas) | ✅ Concluído | 2026-10-05 12:19 | `node --check` |
| 14.2 | `assets/js/exportar-word.js`: Word com o layout do PDF ao lado de `btnExportarPDF`, `btnExportarPDFGabarito` e `btnExportarGabarito` (42 páginas que usam o `atividade.js`); `avaliacao-pdf-professor.js` aceita o formato PDF/Word | ✅ Concluído | 2026-10-05 12:19 | `node --check`; sem nomes globais repetidos |
| 14.3 | `assets/js/exportar-word-pratica.js`: Word ao lado de cada "Imprimir / PDF" das práticas de Excel (capa + todas as questões, telas em PNG); `atividade-pratica-excel.js` reaproveita `montarImpressaoCompleta()` | ✅ Concluído | 2026-10-05 12:19 | `node --check` |
| 14.4 | Regra global "EXPORTAR EM WORD" no `CLAUDE.md` (versão 2026-10-05 12:19) + lista de `assets/` | ✅ Concluído | 2026-10-05 12:19 | Visualizador de regras lê a mesma linha de versão |
| 14.5 | Commit local | ✅ Concluído | 2026-10-05 12:19 | `git commit` |
| 14.6 | Aceite do usuário (testar no navegador: botão ao lado do PDF e abrir o .doc no Word) | ⬜ Pendente | — | Sem navegador nesta sessão (regra do usuário) |
