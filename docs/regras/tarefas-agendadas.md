# ⏰ Regras — Tarefas agendadas (1 agendador que lê a fila `tasks`)

Registrada em 2026-10-11 05:12:00 a pedido do usuário ("corrija todas as regras conflitantes" da
rotina "Tarefa Aulas Senai"). **Reescrita em 2026-10-11 05:57:00** (tarefa #24-9fb25086-5b51-44cb,
plano [docs/fila-tasks-agendador-unico.md](../fila-tasks-agendador-unico.md)), a pedido do usuário:
"1 agendador que apenas controle 1 tabela de nome tasks, que a IA vai ler e decidir se executa algo
ou não" e "toda task deve existir na tabela e no GitHub". Substitui a versão das 6 rotinas paralelas
que escolhiam sozinhas a próxima aula (e o `TAREFA_AGENDADA.md` na raiz, que nunca é usado).

## 1. O que é

- ✅ **Uma rotina só** ("Tarefa Aulas Senai", conta do usuário), **de hora em hora** (o agendador
  aceita no máximo 1 execução por hora por rotina), das 01:03 às 23:03 de Brasília.
- ✅ A rotina **só faz o que está na tabela `tasks`** do Supabase (projeto `AULAS SENAI`): cada
  execução pega **no máximo 1 task**, decide se a executa e grava o resultado na própria linha.
- ✅ **Fila vazia = não faz nada** (só sincroniza a tabela com o GitHub e grava o log).
- ✅ O professor controla a fila na página **`tasks.html`** (menu **TASKS**, só o Professor
  Administrador): cadastrar, editar, ligar/desligar (ON/OFF), "executar após", cancelar, reabrir,
  excluir (lógico) e ver o resultado e o PR.
- ✅ Cada execução é uma **sessão nova na nuvem**: vale tudo do `CLAUDE.md` para a nuvem
  (inicialização, seeds, branch própria + PR juntado, commit + push na hora).

## 2. A tabela `tasks`

- ✅ Estrutura em `database/2026-10-11-tasks-fila-agendador.sql` (aplicada; RLS só do
  administrador; sem DELETE). Status: `pendente`, `em_execucao`, `concluida`, `recusada`, `erro`,
  `cancelada`.
- ✅ **`pegar_proxima_task('<frente>')`** é a única forma de pegar uma task: devolve a de maior
  prioridade (1 = mais alta) que esteja `pendente`, ligada, não excluída, com "executar após" vencido
  e tentativas sobrando; marca `em_execucao` e trava por **90 minutos** (duas execuções nunca pegam
  a mesma; trava vencida volta para a fila).
- ✅ **`finalizar_task(id, status, resultado, pr_url, commit_sha)`** fecha a task com `concluida`,
  `recusada` ou `erro` (`erro` com tentativas sobrando volta a `pendente` e é tentada na hora
  seguinte).
- ✅ **Ordem e dependências** (2026-10-11 06:07:25, pedido do usuário): cada task tem **`ordem`** (posição na
  fila) e **`task_dependente`** (ids das tasks de que ela depende). A `pegar_proxima_task` só pega
  uma task quando **todas as dependentes estão `concluida`**, na ordem prioridade → `ordem` →
  criação. Dependência inexistente ou da própria task é recusada pelo banco.
- ✅ **Tarefa grande = várias sub-tasks pequenas**, uma por vez e em ordem: cada sub-task depende da
  anterior (cadeia) e a tarefa-mãe depende de todas. Título `#NN.MM — …` (ex.: `#25.01`).
- ✅ **Etapa do usuário** (aprovação, aceite, teste): sub-task com título `👤 …`, **desligada**
  (`executar = false`); o professor a marca concluída na página (`✅ Concluir`) e a fila segue.
- ⛔ As duas funções não ficam na API (só o conector do Supabase as chama); a página nunca põe nem
  tira uma task de `em_execucao`.

## 3. Toda task na tabela e no GitHub

- ⛔ **Nenhuma task existe só num lado.** Toda tarefa do `tasks/TASKS.md` tem a linha dela na
  tabela (mesmo `codigo`, `origem = 'repositorio'`) e toda linha criada na página tem o arquivo
  **`tasks/fila/TASK-NNNN.md`** no GitHub.
- ✅ Tarefa do `TASKS.md` entra na tabela **desligada** (`executar = false`): a rotina só a executa
  se o professor ligar o ON/OFF. Ao sair do `TASKS.md` (concluída ou cancelada), a linha é fechada.
- ✅ **Em conflito:** o texto da tarefa (título e instrução) vale o do **GitHub** (`TASKS.md`); status,
  ON/OFF, prioridade e resultado valem os da **tabela**. O estado oficial do projeto continua no
  `tasks/STATUS.md` (fonte única), atualizado junto.
- ✅ **Script único:** `scripts/tasks/sincronizar_tasks.py` (o banco é acessado só pelo conector):
  `consulta` (SQL que devolve as linhas em JSON), `importar` (SQL do `TASKS.md` → tabela; o md5 é
  calculado pelo banco), `exportar <linhas.json>` (escreve `tasks/fila/` e imprime o SQL do md5) e
  `conferir <linhas.json>` (lista as diferenças; sai com erro se houver).
- ✅ **Quando sincronizar:** em toda execução da rotina (antes de pegar a task), ao criar, concluir ou
  cancelar tarefa do `TASKS.md` em qualquer sessão (no mesmo commit) e ao fechar uma task.

## 4. Passo a passo de cada execução

1. ✅ Anotar a hora de início (Brasília) e a frente: `nuvem · <branch da sessão>`.
2. ✅ Inicialização do `CLAUDE.md` (trazer a `main`, `tasks/STATUS.md`, `tasks/RECADOS.md`, regras
   globais em `.claude/regras-globais/`, `database/SEEDS-APLICADOS.md`).
3. ✅ **Sincronizar:** `consulta` pelo conector → salvar o JSON → `conferir`; havendo diferença, rodar
   o SQL do `importar` pelo conector e o `exportar`, e fazer commit + push + PR + merge só desses
   arquivos.
4. ✅ `select * from pegar_proxima_task('<frente>');` pelo conector.
5. ✅ **Nada veio:** encerrar sem alterar mais nada; log com status `sem_tarefa`.
6. ✅ **Veio uma task:** ler a `instrucao` e **decidir**:
   - **Executar** quando ela cabe nas regras do `CLAUDE.md` e de `docs/regras/` e é clara o bastante:
     fazer o trabalho na branch da sessão, com os arquivos de status, commit + push + PR + merge;
     depois `finalizar_task(id, 'concluida', '<o que foi feito>', '<url do PR>', '<sha>')`.
   - **Recusar** quando fere uma regra (push na `main`, segredo, gabarito publicado, afrouxar RLS,
     apagar dados, mexer em tarefa reservada por outra frente…), é ambígua ou precisa de decisão do
     usuário: `finalizar_task(id, 'recusada', '<motivo e o que o professor precisa decidir>')`, sem
     mexer no repositório.
   - **Erro** técnico (falha de rede, conector, merge impossível): `finalizar_task(id, 'erro',
     '<mensagem>')`.
   - Task grande demais para uma execução: entregar a parte que fechar (PR juntado) e `recusada`
     com o que falta, para o professor dividir em tasks menores.
7. ✅ `exportar` de novo (o arquivo da task muda com o status) e commit + push + PR + merge.
8. ✅ Gravar o log (seção 5) e apagar a branch do PR juntado.
- ⛔ Nunca marcar `concluida` o que não foi feito; nunca push direto na `main` nem push forçado.

## 5. Log de cada execução (Supabase)

- ✅ Toda execução grava uma linha em **`agendamento_tarefa_logs`** (SQL
  `database/2026-10-11-agendamento-tarefa-logs.sql`; RLS ligado e sem políticas: só o conector
  grava e lê), com: `descricao`, `data_hora`, `status` (`concluida`, `recusada`, `erro` ou
  `sem_tarefa`), `nome_tarefa_agendamento` ("Tarefa Aulas Senai"), `tipo_assinatura`, `aula` (o
  `codigo` da task, ou vazio), `commit_sha`, `duracao_segundos`, `erro_mensagem`, `repositorio`
  (`Gelvazio/aulasenai`), `inicio_em`, `fim_em`, `sessao_url`, `branch`, `tentativas_push`,
  `arquivos_alterados`, `segundos_ate_trava` (até pegar a task), `aula_status_anterior` /
  `aula_status_novo` (status da task antes e depois) e `conteudo_tarefa` (texto completo das
  instruções recebidas). O `id` do log vai para `tasks.log_id`.
- ✅ Sem acesso ao repositório (GitHub pede usuário e senha): não alterar nada, devolver a task com
  `finalizar_task(id, 'erro', ...)`, gravar o log com `erro` e avisar o usuário.

## 6. Outras contas e IAs

- ✅ Outra conta do Claude ou outra IA (gemini, codex, grok) **não cria rotina própria**: ela só
  pode pegar tasks pela mesma função `pegar_proxima_task` (que impede pegar a mesma em dobro),
  seguindo esta regra e gravando o log com o próprio `tipo_assinatura`.
- ⛔ Nada de senha, chave, gabarito nem dado de aluno nas tasks, nos recados, no `STATUS.md` ou no log.
