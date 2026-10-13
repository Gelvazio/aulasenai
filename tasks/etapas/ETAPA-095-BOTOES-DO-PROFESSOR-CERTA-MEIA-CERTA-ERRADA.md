> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 95 — Botões do professor Certa / Meia certa / Errada e nota confirmada travada (tarefa pequena, 2026-10-08 16:10:08)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 95.1 | `assets/js/confirmar-nota-professor-discursiva.js` + CSS: em "Respostas dos alunos", 3 botões antes do "💾 Gravar" em cada alternativa; gravam `nota_professor` (pontos, metade, 0) com confirmação; ligados em `avaliacao-discursiva.js` (`aoMostrarAluno`) | ✅ Concluído | 2026-10-08 16:10:08 | `node --check` |
| 95.2 | Trava no banco: trigger `correcao_discursiva_validar` recusa alterar `nota_professor` já confirmada (SQL `database/2026-10-08-correcao-discursiva-nota-professor-travada.sql`, aplicado pelo conector) | ✅ Concluído | 2026-10-08 16:10:08 | Função conferida (trava presente); 0 notas confirmadas no banco no momento |
| 95.3 | Regra no `CLAUDE.md` (versão + históricos), `docs/regras/atividades.md`, `docs/database.md` e relatório HTML | ✅ Concluído | 2026-10-08 16:10:08 | Leitura |
| 95.4 | Aceite do usuário (escolher aluno, confirmar uma alternativa e ver o botão travar) | 👀 Aguardando o usuário | — | — |
