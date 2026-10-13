## Etapa 138-77338471 — STATUS_MATERIA.md em cada matéria e ordem das matérias (pedida em 2026-10-10 16:28)

Pedido: "Crie dentro de cada matéria um arquivo de nome STATUS_MATERIA, nele guarde o status de todos
os arquivos na pasta de matéria e use isso pra definir se está como pendente, concluído ou não. Crie
uma ordem também, com banco de dados 1, testes frontend 2, itic 3, e outros vá incrementando; salve
esta regra no CLAUDE.md; sempre que ler status de tasks ou matéria, deve seguir a ordem." Depois:
"Opção 1" (coluna Banco lida do `database/SEEDS-APLICADOS.md`).
Frente: nuvem · claude/verificar-status-pastas-c6s5yz. O próprio pedido do usuário vale como aprovação do plano.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 138.1 | Gerador `scripts/status-materias/gerar_status_materia.py` + `ordem_materias.py`, `pecas_materia.py`, `seeds_materia.py` | ✅ Concluído | 2026-10-10 16:38 | Rodado sem erro; linhas até 100 caracteres, funções até 45 linhas, docstrings |
| 138.2 | `STATUS_MATERIA.md` nas 34 matérias (peças da ITIC, aulas, todos os arquivos, situação) | ✅ Concluído | 2026-10-10 16:38 | 34 arquivos; Banco de Dados 139/154 (aulas 19 e 20 com Banco ⬜) |
| 138.3 | Coluna Banco pelo `database/SEEDS-APLICADOS.md` (opção 1 do usuário): ✅ só com os seeds da objetiva e da prática CONCLUÍDO ou SUBSTITUÍDO | ✅ Concluído | 2026-10-10 16:38 | Banco de Dados: aulas 01–18 ✅, 19 ⬜ (APLICADO), 20 ⬜; ITIC: aula 01 ⬜ (prática sem seed no repositório) |
| 138.4 | `tasks/ORDEM-MATERIAS.md` (Banco de Dados 1, Testes de Front-End 2, ITIC 3, demais curso a curso) e `scripts/analise-materias.py` na mesma ordem (campo "ordem") + peça `STATUS_MATERIA.md` | ✅ Concluído | 2026-10-10 16:38 | Relatório com ordem 1–34 |
| 138.5 | Regra no `CLAUDE.md` (seção "🔢 REGRA — STATUS_MATERIA E ORDEM DAS MATÉRIAS", mapa dos status, regras de sempre), versão 2026-10-10 16:37:58, histórico (resumo + `docs/HISTORICO-REGRAS.md`) | ✅ Concluído | 2026-10-10 16:38 | Linha de versão no formato do `regras-modal.js` (`PADRAO_VERSAO_REGRAS`); título `##` novo entra no índice do visualizador sem mudança de código |
| 138.5a | Pedido do usuário (2026-10-10 16:40): "Confirme se todas as matérias ganharam o arquivo, mesmo estando em ignorar; todos os arquivos de status devem existir, sempre" + "Anote esta regra no claude.md" — conferido: as 34 matérias (inclusive as em IGNORAR) têm os 5 arquivos; o gerador passou a criar os que faltam; regra no `CLAUDE.md` (versão 2026-10-10 16:40:55) | ✅ Concluído | 2026-10-10 16:40 | Varredura dos 5 arquivos em todas as pastas de matéria; só `docs/` e `scripts/` (não são matéria) sem status |
| 138.6 | Aceite do usuário: conferir o `STATUS_MATERIA.md` das matérias, a ordem em `tasks/ORDEM-MATERIAS.md` e a regra nova do `CLAUDE.md` | 👀 Aguardando o usuário | — | — |
