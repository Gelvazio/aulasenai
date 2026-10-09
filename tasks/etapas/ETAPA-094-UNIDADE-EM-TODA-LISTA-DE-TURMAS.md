> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 94 — Unidade (local + turno) em toda lista de turmas (pedido em 2026-10-08 17:26:54)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 94.1 | `assets/js/turma-unidade.js` (novo) e uso em: equipes, `turmas.html`, `alunos.html`, `turma-exportacao.js` (+ carregamento em `atividade.js` e `exportar-pdf-discursiva.js`), `indice-turma-favorita.js` (+ `atividades-crud-modal.js`), média final (2 páginas + template do gerador) e liberação do gabarito das discursivas; regra nova e histórico | ✅ Concluído | 2026-10-08 17:26:54 | `node --check` nos 13 JS; leitura do código (sem navegador) |
| 94.2 | Dados: o `local` vem da tabela `turma` (hoje: AI SALETE, AI CEPLAS, CEPLAS, APRENDIZAGEM INDUSTRIAL TAIÓ TARDE); a turma Roberto Machado ganha o local ao ser gravada pela página de usuários | ⬜ Pendente | — | Consulta de leitura em `turma` |
| 94.3 | Aceite do usuário | ⬜ Pendente | — | — |
| 94.4 | Pedido do usuário (2026-10-08 17:27:53): unidades vindas do arquivo global **`assets/js/unidade.js`** (código da turma → unidade: 122552 TAIÓ TARDE, 124403 ROBERTO MACHADO TARDE, 133933 AIAC SALETE TARDE, 135080 CEPLAS MANHÃ, 135081 CEPLAS TARDE, QA LBTSN 2026/1 M2 CEPLAS MANHÃ); `turma-unidade.js` renomeado e as 12 referências trocadas; regra e histórico | ✅ Concluído | 2026-10-08 17:27:53 | `node --check`; `grep` sem "turma-unidade" no código |
