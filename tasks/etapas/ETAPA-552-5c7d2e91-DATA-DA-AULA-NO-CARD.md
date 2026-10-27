# ETAPA 552 — Campo "Data:" no card de aula

- **TASK:** #405 (pedida em 2026-10-27) · **Criada por:** Claude Code (Sonnet 5.5) (local · main)

## Pedido

"coloque um campo de nome *Data:*, deve buscar a data da Aula, ou Data não informada" (card de aula do índice de atividades).

### #405.1 — Mostrar "Data: dd/mm/aaaa" ou "Data não informada" no card

**Próximo passo:** concluído; antes: editar `assets/js/indice-aula-data.js` e `assets/css/indice-aula-data.css`.

- **Nível:** MEDIO — JS com lógica, 2 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** a data vem de `aula_turma.data_aula` da turma do combo "Turma:" (professor) ou da turma única do aluno; sem linha ou sem data, mostra "Data não informada".
- **Entrega:** `indice-aula-data.js` (campo `Data:` abaixo do nome, formato DD/MM/AAAA ou "Data não informada"), `indice-aula-bloqueio.js` (`obterDataAulaNaTurma`; o aluno com turma única também lê as linhas) e `indice-aula-data.css`. Só aparece nas matérias com o bloqueio da aula ligado (onde a turma é lida). · **Verificação:** `node --check` nos 2 JS OK; conferir na tela (sem navegador).
