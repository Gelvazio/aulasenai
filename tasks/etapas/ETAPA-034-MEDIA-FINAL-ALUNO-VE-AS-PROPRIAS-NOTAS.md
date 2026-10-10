> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 34 — Média final: aluno vê as próprias notas (Aulas 04–07, Objetiva, Prova Prática) — plano: [docs/media-final-notas-do-aluno.md](docs/media-final-notas-do-aluno.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 34.1 | Diagnóstico no banco e plano em `docs/`; aprovação do usuário | ✅ Concluído | 2026-10-06 | Aprovado, com SQL e com a tela de correção |
| 34.2 | SQL: `correcao_discursiva` + função `notas_media_final` | ✅ Concluído | 2026-10-06 | Idempotente |
| 34.3 | Aplicar no Supabase | ✅ Concluído | 2026-10-06 | Função conferida com um aluno real: Aulas 04/05/06 e Objetiva iguais ao cálculo direto; RLS ligado, 3 políticas, `anon` sem execução |
| 34.4 | JS do aluno na média final | ✅ Concluído | 2026-10-06 | `node --check` |
| 34.4b | Tela de correção da Prova Prática (professor) — escopo acrescentado na aprovação | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador fica com o usuário |
| 34.5 | Documentação (database.md, relatório, CLAUDE.md) | ✅ Concluído | 2026-10-06 | Versão das regras atualizada |
| 34.6 | Aceite do usuário | ⬜ Pendente | — | — |
