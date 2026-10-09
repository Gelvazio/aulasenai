> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 27 — ITIC: atividade individual de sexta à tarde (40 objetivas) (pedida em 2026-10-06; tarefa pequena)

Entregável: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html`
(fonte em `ATIVIDADE-SEXTA-FEIRA/CONTEUDO/`, fora do Git). Conteúdo: trabalho em equipe v2 (`ATIVIDADE-GRANDE/`) e Aulas 01 a 07.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 27.1 | Fonte com 40 questões objetivas (gabarito 10 de cada letra, posição sorteada) | ✅ Concluído | 2026-10-06 | Fonte lida pelo gerador; `.gitignore` (`*QUESTOES.md`) |
| 27.2 | Página HTML pelo gerador (exportar PDF, PDF com gabarito do professor, Word, folha no banco) | ✅ Concluído | 2026-10-06 | 40 itens no HTML; sem gabarito embutido |
| 27.3 | Item no `MENU-ATIVIDADES.js`, `STATUS-ATIVIDADES.md` e seed (`database/2026-10-06-atividade-individual-comunicacao-seed-atividades.sql`, fora do Git) | ✅ Concluído | 2026-10-06 | `node` leu o menu; seed com 40 linhas de gabarito |
| 27.4 | Aplicar o seed no Supabase (sem ele a marcação das respostas fica bloqueada) | ✅ Concluído | 2026-10-06 | Atividade id 80 (aula 27), ativa e liberada para todas as turmas; 40 itens no gabarito (10 de cada letra) |
| 27.5 | Bloquear para a turma da manhã (135080) pela função `definir_bloqueio_turma`, como o Professor Administrador | ✅ Concluído | 2026-10-06 | `atividade.bloqueio` = ["135080"], `ativo` = true |
| 27.6 | Card da atividade no índice de atividades da ITIC (`ATIVIDADES/index.html`, feito à mão) | ✅ Concluído | 2026-10-06 | Card após o trabalho v2; só o link `.html` da atividade (o bloqueio por turma acha o card) |
| 27.7 | Aceite do usuário | ⬜ Pendente | — | — |
