## Etapa 417-c45b1fd7 — #288: Mostrar o id da atividade ao aluno

**Tarefa:** #288-c45b1fd7-ee09-43e5-9d1d-10dbfbc6fd11 · **Pedido em:** 2026-10-18 20:19 · **Criada por:** Claude Code (Opus 5.5) (local · main · s22, sessão lateral aberta pela s17)
**Pedido:** "nas atividades do aluno,tambem deve mostrar o id da atividade"
**Objetivo:** no índice de atividades, o aluno logado vê o **id da atividade** (o `atividade.id` do
banco) em cada botão de atividade, como o professor já vê (etapa 040), para poder citar a
atividade pelo número.

### #288.1 — Id da atividade nos botões de atividade do aluno

**Próximo passo:** depois da análise da #286.1, ligar o id no mesmo módulo do aluno
(`assets/js/indice-atividades-feitas.js`, que já lê `atividade.id,pagina`), sem repetir o id que o
CRUD do professor já mostra.

- **Nível:** MEDIO — tela (JS/CSS) em 1 a 3 arquivos; só leitura do banco que o aluno já faz (RLS
  existente), sem mudar tabela, RLS ou função.
- **Modelo:** só Sonnet — nunca outro (#247); executor-medio, líder Opus 5.5 (s22)
- **Descrição:** para o aluno logado, cada botão de atividade cadastrado no banco mostra o id da
  atividade (ex.: "ID 152"), no mesmo estilo do id do professor; professor continua com o id do
  CRUD (sem id duplicado); visitante não vê; refeito quando os cards são remontados
  (`cards-aula-montados`); vale também para a atividade bloqueada.
- **Critérios de aceitação:** id certo em cada botão de atividade do aluno, em todos os índices;
  nenhum id duplicado para o professor; nada de banco; `node --check` OK.
- **Entrega:** — · **Verificação:** —
