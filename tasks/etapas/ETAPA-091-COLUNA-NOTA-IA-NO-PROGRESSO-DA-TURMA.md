> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 91 — Coluna "Nota IA" no progresso da turma (Prova Prática ADAG id 82, tarefa pequena, 2026-10-08 14:52:04)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 91.1 | `assets/js/progresso-turma-discursiva.js` + CSS: coluna "Nota IA (a confirmar)" por aluno (soma da `nota_ia` da `correcao_discursiva`, tentativa mais recente, "(N/60)" se incompleta) e linha de títulos das colunas; regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-08 14:52:04 | `node --check`; colunas da `correcao_discursiva` e RLS de leitura do professor conferidos no banco |
| 91.3 | Coluna Progresso mais estreita (`minmax(40px, 0.5fr)`) e `min-width: 0` nas células, para não dar barra de rolagem (commit `a40fa9f`) | ✅ Concluído | 2026-10-08 14:53:06 | Leitura do CSS |
| 91.4 | Colunas com largura fixa (Aluno 180px, Progresso 70px, Situação 150px, Nota IA 130px; só Questões flexível) para a coluna Progresso ficar reta em todas as linhas | ✅ Concluído | 2026-10-08 14:53:47 | Leitura do CSS |
| 91.2 | Aceite do usuário (testar logado como professor) | ⬜ Pendente | — | — |
