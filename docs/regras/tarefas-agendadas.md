# ⏰ Regras — Tarefas agendadas (rotinas que geram as aulas sozinhas)

Registrada em 2026-10-11 05:12:00 a pedido do usuário ("corrija todas as regras conflitantes" da
rotina "Tarefa Aulas Senai"). Substitui o `TAREFA_AGENDADA.md` na raiz que a rotina mandava criar:
as regras do projeto ficam só no `CLAUDE.md` e em `docs/regras/`.

## 1. O que são

- ✅ Até **6 tarefas agendadas paralelas** (tarefa 1 a 6) rodam **de hora em hora, das 01:00 às
  23:00 (Brasília)**, escalonadas de 10 em 10 minutos: tarefa 1 no minuto :03, tarefa 2 no :13,
  3 no :23, 4 no :33, 5 no :43 e 6 no :53.
- ✅ Podem vir de contas diferentes do Claude e de outras IAs (gemini, codex, grok): só se falam
  pelo repositório (regra "CONVERSA ENTRE SESSÕES E LICENÇAS" do `CLAUDE.md`).
- ✅ Cada execução cuida de **exatamente 1 aula pendente** (regra "Aulas: uma por vez, completa").
- ✅ Cada execução é uma **sessão nova na nuvem**: vale tudo do `CLAUDE.md` para a nuvem
  (inicialização, seeds, branch própria + PR, commit + push na hora).

## 2. Frente de trabalho da execução

- ✅ Frente = `nuvem · agendada/tarefa-N-AAAAMMDD-HHMM` (N = número da tarefa; data e hora de
  Brasília do início). É a branch da execução, criada a partir da `main` atualizada.
- ⛔ **Nunca push direto na `main`** nem push forçado: tudo entra pela branch da execução e por PR,
  que a própria execução junta (regra "PUSH: NUNCA NO AMBIENTE LOCAL, SEMPRE NA NUVEM").

## 3. Qual aula escolher

1. ✅ Fazer a inicialização do `CLAUDE.md` (trazer a `main`, ler `tasks/STATUS.md`, a etapa,
   `tasks/RECADOS.md`, as regras globais em `.claude/regras-globais/` e o
   `database/SEEDS-APLICADOS.md`).
2. ✅ Percorrer as matérias **na ordem do `tasks/ORDEM-MATERIAS.md`** e, em cada uma, o
   `AULAS/STATUS-AULAS.md`: aula pendente = linha com alguma coluna ⬜ ou 🔄.
3. ⛔ **Pular:** matéria ou curso em `IGNORAR` nas ementas; ementas de
   `QUALIFICACAO-PROFISSIONAL/` (só leitura); matéria cuja tarefa está reservada por outra frente
   (coluna "Em uso por" do "📌 Tarefas" ou recado aberto "não mexer"); aula com trava aberta de
   outra execução em `tasks/RECADOS.md`; aula cujo item espera ação do usuário em
   "⏳ Aguardando o usuário".
4. ✅ **Trava abandonada:** trava aberta há **mais de 90 minutos** sem conclusão pode ser
   reassumida; registrar isso no recado novo.

## 4. Trava da aula (primeira coisa, antes de qualquer outra alteração)

- ✅ Acrescentar no topo de "Abertos" do `tasks/RECADOS.md` a linha
  `| <data e hora> | <frente> | todas | TRAVA tarefa N: <matéria> aula NN em andamento | <etapa> |`
  e, na tabela "🧭 Frentes de trabalho" do `tasks/STATUS.md`, a linha da frente com a aula.
- ✅ Commit só dessas mudanças, push da branch, PR para a `main` e **merge do PR na hora** (o
  merge é o que trava). Conflito: `git merge origin/main`, manter as linhas dos dois lados, reler
  os recados; se a aula já foi travada por outra, escolher a próxima livre e repetir.
- ✅ Só depois da trava na `main` a aula é produzida.

## 5. Produzir a aula

- ✅ Seguir [`docs/regras/materias.md`](materias.md) (aula em `CONTEUDO/`, objetiva de 50,
  prática 10 × 3, seeds) e as demais regras de `docs/regras/`.
- ✅ Seed gerado: registrar como PENDENTE, aplicar pelo conector do Supabase em partes, conferir
  pelo md5 com `scripts/seeds/` e marcar CONCLUÍDO (autorização permanente da regra dos seeds).
- ✅ Ao terminar a aula: gravar o status em `STATUS-AULAS.md`, `STATUS-ATIVIDADES.md`,
  `database/SEEDS-APLICADOS.md` e no item da etapa; rodar
  `python3 scripts/status-materias/gerar_status_materia.py` e `python3 scripts/analise-materias.py`;
  commit + push + PR + merge.
- ⛔ Nunca marcar ✅ o que não foi feito; aula incompleta fica 🔄 com o que falta escrito.

## 6. Encerrar a execução

- ✅ Mover a trava para "Cumpridos" do `tasks/RECADOS.md` (concluída ou liberada, com o que foi
  feito), atualizar a linha da frente para `⏹️ Encerrada`, commit + push + PR + merge e apagar a
  branch da execução no GitHub.
- ✅ Sem aula pendente livre: não alterar nenhum arquivo; só registrar o log com
  `sem_aula_pendente`.

## 7. Log de cada execução (Supabase)

- ✅ Toda execução grava uma linha em **`agendamento_tarefa_logs`** (projeto `AULAS SENAI`), com:
  `descricao`, `data_hora`, `status` (`concluida`, `liberada`, `sem_aula_pendente` ou `erro`),
  `nome_tarefa_agendamento` (ex.: "Update aulas do SENAI (1)"), `tipo_assinatura`, `aula`,
  `commit_sha`, `duracao_segundos`, `erro_mensagem`, `repositorio` (`Gelvazio/aulasenai`),
  `inicio_em`, `fim_em`, `sessao_url`, `branch` (a branch da execução), `tentativas_push`,
  `arquivos_alterados`, `segundos_ate_trava`, `aula_status_anterior`, `aula_status_novo` e
  `conteudo_tarefa` (texto completo das instruções recebidas).
- ✅ Estrutura da tabela em `database/2026-10-11-agendamento-tarefa-logs.sql` (já aplicada; RLS
  ligado e sem políticas: só o conector grava e lê).
- ✅ Sem acesso ao repositório (GitHub pede usuário e senha): não alterar nada, gravar o log com
  `erro` e a mensagem e avisar o usuário.

## 8. Para outras contas e IAs

- ✅ As tarefas 2 a 6 são criadas por outras contas do Claude e outras IAs no agendador delas
  (tarefa #22 do `tasks/TASKS.md`), seguindo **esta** regra e gravando o log com o próprio
  `tipo_assinatura`.
- ⛔ Nada de senha, chave, gabarito nem dado de aluno nos recados, no `STATUS.md` ou no log.
