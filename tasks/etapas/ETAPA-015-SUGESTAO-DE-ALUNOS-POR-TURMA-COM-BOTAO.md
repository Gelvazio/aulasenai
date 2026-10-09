> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 15 — Sugestão de alunos por turma com botão "Confirmar" na `alunos.html` (pedida em 2026-10-05; plano `docs/sugestao-alunos-por-turma-confirmar.md`, aprovado em 2026-10-05; escopo ampliado com o filtro **Turma OK**)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 15.0 | Plano em `docs/` e aprovação do usuário | ✅ Concluído | 2026-10-05 13:22 | Resposta "PODE EXECUTAR" |
| 15.1 | Conferir funções e trigger usados (`eh_professor`, `professor_tem_turma`, `turmaaluno_exige_aluno`) | ✅ Concluído | 2026-10-05 13:22 | Leitura do SQL (`professor_tem_turma`, políticas da `turmaaluno`) |
| 15.2 | SQL `database/2026-10-05-sugestoes-turmaaluno.sql` (função `sugestoes_turmaaluno()`) | ✅ Concluído | 2026-10-05 13:22 | Leitura |
| 15.3 | `listarSugestoes()` no `turmas-aluno-repositorio.js` | ✅ Concluído | 2026-10-05 13:22 | `node --check` |
| 15.4 | Módulo `assets/js/turmas-aluno-sugestoes.js` (alunos sem turma + ✅ Confirmar) | ✅ Concluído | 2026-10-05 13:22 | `node --check` (linhas da tabela com Turma OK = Não) |
| 15.5 | Integração na `alunos.html`, `turmas-aluno-pagina.js` e CSS + filtro/coluna **Turma OK** (Sim/Não) | ✅ Concluído | 2026-10-05 13:22 | `node --check` + leitura; filtro e coluna Turma OK |
| 15.6 | `docs/database.md` + `relatorio_verificacao_database.html` | ✅ Concluído | 2026-10-05 13:22 | Leitura |
| 15.7 | Commit local | ✅ Concluído | 2026-10-05 13:22 | `git diff --cached --name-only` |
| 15.8 | Aplicar SQL no Supabase (só com pedido) e aceite do usuário | 🔄 Em progresso | — | SQL aplicado em 2026-10-05 13:36 pelo conector (0 alunos sem turma hoje); falta o aceite |
