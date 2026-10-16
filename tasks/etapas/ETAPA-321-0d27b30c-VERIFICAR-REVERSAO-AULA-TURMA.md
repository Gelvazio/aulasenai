## Etapa 321-0d27b30c — Verificar a reversão da `aula_turma` e o ON/OFF de bloqueio de atividade

**Tarefa:** #194-0d27b30c-baf7-4966-b655-f64456f1f973 · **Pedido em:** 2026-10-16 10:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "COLOQUE A VERIFICACAO EM 1 NOVA TAREFA" e "AO CRIAR A NOVA TAREFA NAO ASSUMA ELA,AGUARDE"
**Objetivo:** conferir, só lendo, que a reversão da #193 (etapa 320-c3289a94) está completa e que o
botão ON/OFF de bloqueio de atividade por turma funciona de ponta a ponta.

### Decisões

- 2026-10-16 10:10 — A verificação saiu da #193.2 e virou esta tarefa, a pedido do usuário. Fica
  **livre, sem reserva**, até o usuário mandar pegar. Um workflow de verificação que a #193 tinha
  começado foi interrompido antes de dar resultado (nada a aproveitar).

### #194.1 — Verificar a reversão e o ON/OFF de bloqueio

**Próximo passo:** aguardar o usuário mandar pegar; então fazer as 3 conferências abaixo, só
lendo (sem editar, sem navegador; no banco só `SELECT`).

- **Nível:** PESADO — banco (consultas ao catálogo e às atividades), vários arquivos ligados.
- **Descrição:**
  1. **Reversão completa:** comparar com o commit `95bf1974` cada arquivo tocado por `b8e37ece`,
     `77167473`, `7877270b` e `1f56c8e6`; procurar no repositório (js, html, css, py, geradores)
     restos de `aula_turma`, `datas-aulas-turma`, `lerLinhasAulaTurma`, `gravarLinhaAulaTurma`,
     `montarDatasAulasTurma`, `dataDaTurma`; ver se algum commit depois do `1f56c8e6` usa algo
     que foi apagado.
  2. **ON/OFF de ponta a ponta:** ordem de carga dos scripts do índice
     (`atividades-crud-modal.js`), constantes globais repetidas entre eles, de onde vem a turma
     (combo `.barra-turma-favorita__lista` ou favorita), evento `turma-indice-alterada` (corrida
     entre o disparo inicial e o ouvinte), botões travados (`aula--bloqueada-professor`), links do
     card × `atividade.pagina` da matéria 25; no banco, `definir_bloqueio_turma`,
     `atividade_liberada_para_usuario`, gatilhos de `atividade` e `aulas` e permissões.
  3. **Banco:** nada mais depende da `aula_turma` depois do SQL da #193.3/#193.4; efeito que o
     gatilho da #186 possa ter deixado em `atividade.bloqueio`.
- **Critérios de aceitação:** cada problema real com evidência (arquivo:linha ou consulta) e
  correção sugerida; sem problema, dizer isso. Correção vira tarefa nova (esta só verifica).
- **Entrega:** — · **Verificação:** —
