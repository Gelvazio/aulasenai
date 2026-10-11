> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 102 — Aluno vê a prova corrigida depois da liberação do gabarito (tarefa pequena, 2026-10-08 20:24:44)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 102.1 | Banco: execução de `aluno_pode_ver_gabarito` liberada para `authenticated` (SQL `database/2026-10-08-aluno-pode-ver-gabarito-execute.sql`, aplicado pelo conector) | ✅ Concluído | 2026-10-08 20:24:44 | `has_function_privilege`: authenticated = sim, anon = não |
| 102.2 | `respostas-discursivas-banco.js` (gabarito liberado volta a carregar as respostas) e `resultado-aluno-discursiva.js` + CSS: nota, selo por alternativa, observação da IA em balão grande e padrão de resposta; ligado em `avaliacao-discursiva.js` | ✅ Concluído | 2026-10-08 20:24:44 | `node --check` |
| 102.3 | Regra no `CLAUDE.md` (versão + históricos) e em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-08 20:24:44 | Leitura |
| 102.4 | Aceite do usuário (aluno com entrega e gabarito liberado abre a prova) | ⬜ Pendente | — | — |
