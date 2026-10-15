## Etapa 302-cfc044e9 — Bloquear o preenchimento das atividades 02, 03 e 05 e liberar o botão "Liberar gabaritos"

**Tarefa:** #175-cfc044e9-2127-46f1-ad59-9c4733419417 · **Pedido em:** 2026-10-15 14:12 · **Executor:** Claude Code (local · main)
**Pedido:** "TEM ALUNO QUE N FEZ A ATIVIDADE, BLOQUEIE O PREENCHIMENTO DE TODOS DA ATIVIDADE ID= 02,03 E 05 E LIBERE O BOTAO DE NOME *LIBERAR GABARITOS*" (imagem do botão "🔓 Liberar gabaritos (turma 135081)", apagado).
**Objetivo:** encerrar o preenchimento das atividades de id 2, 3 e 5 para todos os alunos (inclusive quem não fez) e deixar o professor usar o botão "Liberar gabaritos" mesmo com alunos sem entrega.
**Próximo passo:** 175.10 — o professor clica em "🔓 Liberar gabaritos (turma 135081)" nas atividades 2, 3 e 5 e dá o aceite.

### Como funciona hoje (175.3)

- O botão (`assets/js/liberacao-respostas-professor.js`) fica desativado enquanto
  `alunos_sem_entrega_turma` > 0, e a função `liberar_gabarito_turma`
  (`database/2026-10-06-liberacao-respostas-turma.sql`) recusa com "Faltam N aluno(s)".
- Depois da liberação o banco só recusa **nova tentativa e recuperação**; o aluno que **nunca
  entregou** ainda consegue responder (`item_valido`/`topico_valido` não olham a liberação) e,
  ao entregar, veria o gabarito. Por isso a regra exigia todos entregues.
- Bloquear pelo ON/OFF (`atividade.ativo`) ou por turma (`atividade.bloqueio`) **esconde a
  atividade do aluno** (política `atividade_select`): quem entregou não veria o gabarito liberado.
  Então o bloqueio do preenchimento não pode ser o ON/OFF.

### Escopo (plano)

- **Entra:**
  1. SQL idempotente `database/2026-10-15-liberar-gabarito-encerra-preenchimento.sql`:
     `item_valido` e `topico_valido` passam a recusar resposta do aluno cuja turma já tem o
     gabarito liberado na atividade (preenchimento encerrado; a atividade continua visível para ver
     nota e gabarito); `liberar_gabarito_turma` deixa de recusar quando faltam alunos.
  2. `assets/js/liberacao-respostas-professor.js`: botão ativo mesmo com alunos sem entrega; aviso
     "Faltam N aluno(s) entregar: ao liberar, eles não poderão mais responder" e a mesma frase no
     popup de confirmação.
  3. Aplicar o SQL no Supabase e conferir as funções; depois o professor clica em "Liberar
     gabaritos" nas atividades 2, 3 e 5 (turma 135081).
  4. Documentação: `docs/regras/atividades.md`, `docs/liberacao-respostas-por-turma.md`,
     `docs/database.md` + `docs/relatorio_verificacao_database.html`.
- **Não entra:** apagar respostas ou entregas; mudar o ON/OFF das atividades; liberar o gabarito
  por SQL no lugar do professor.
- **Vale para todas as atividades** (o botão e as funções são globais): a regra "só com todos
  entregues" vira "liberar encerra o preenchimento da turma".
- **Critério de pronto:** botão ativo nas atividades 2, 3 e 5 com alunos faltando; depois de
  liberar, aluno da turma sem entrega não consegue gravar resposta; aluno que entregou vê o
  gabarito; "Recolher gabarito" reabre o preenchimento.

### Riscos

| Risco | Plano B |
|---|---|
| Conector do Supabase indisponível nesta sessão | Ligar o conector "claude.ai Supabase", ou o professor roda o SQL no SQL Editor |
| Aluno sem entrega abre a página e só vê erro ao gravar | Mensagem do banco explica "gabarito liberado: preenchimento encerrado" |
| Liberar por engano | "Recolher gabarito" desfaz e reabre o preenchimento |

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 175.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 14:12 | commit "criar #175" no remoto |
| 175.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 14:13 | "Em uso por" preenchido no remoto |
| 175.3 | Entender como o preenchimento é bloqueado e quando o botão "Liberar gabaritos" fica ativo | ✅ Concluído | 2026-10-15 14:25 | leitura de `liberacao-respostas-professor.js`, `2026-10-06-liberacao-respostas-turma.sql`, `2026-10-05-bloqueio-atividade-por-turma.sql` e `docs/regras/atividades.md` (banco não consultado: conector do Supabase indisponível nesta sessão) |
| 175.4 | Plano na etapa + aprovação do usuário (mexe em banco) | ✅ Concluído | 2026-10-15 14:28 | aprovado pelo usuário (professor Gelvazio) em 2026-10-15 14:28: "sim, aprovo o plano da #175 (vale para todas as atividades)" |
| 175.5 | Escrever o SQL idempotente | ✅ Concluído | 2026-10-15 14:31 | `database/2026-10-15-liberar-gabarito-encerra-preenchimento.sql`: função nova `preenchimento_encerrado_para_usuario`, `item_valido`/`topico_valido` (definição de 2026-10-05 + preenchimento encerrado) e `liberar_gabarito_turma` sem a recusa "Faltam N"; só `create or replace`, sem apagar dados (leitura) |
| 175.6 | Ajustar o botão e o aviso no JS | ✅ Concluído | 2026-10-15 14:31 | `liberacao-respostas-professor.js`: botão sempre ativo, aviso e confirmação com os alunos que faltam; comentários de `liberacao-respostas-discursiva.js` e `avaliacao-discursiva.js` atualizados; `node --check` ok nos 3 |
| 175.7 | Aplicar o SQL no Supabase e conferir | ✅ Concluído | 2026-10-15 15:06 | conector do Supabase indisponível nesta sessão (conferido em 2026-10-15 14:32); depois o usuário ligou o conector e pediu "aplique você". Antes: definições do banco iguais às do repositório (`pg_get_functiondef`). Aplicado pelo `execute_sql` (md5 do arquivo 53bbd05fcd3b66a3b6fffce9c79ebe96). Depois: `item_valido`/`topico_valido` usam `preenchimento_encerrado_para_usuario`, `liberar_gabarito_turma` sem `v_faltam`, `anon` sem execução das funções novas; simulação de aluno da turma 135081 (transação desfeita): encerrado = true com a turma liberada e false sem liberação. Atividades 2, 3 e 5 = ITIC aulas 01, 02 e 03, ativas, sem bloqueio, gabarito ainda não liberado; turma 135081: 35 alunos, 3 sem entrega em cada |
| 175.8 | Atualizar a documentação | ✅ Concluído | 2026-10-15 14:32 | `docs/regras/atividades.md`, `docs/liberacao-respostas-por-turma.md`, `docs/database.md`, `docs/relatorio_verificacao_database.html` e `docs/HISTORICO-REGRAS.md` (leitura) |
| 175.9 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ✅ Concluído | 2026-10-15 15:06 | `git push` sem erro |
| 175.10 | Aceite do usuário: liberar os gabaritos das atividades 2, 3 e 5 (turma 135081) pelo botão | 👀 Aguardando o usuário | — | — |
