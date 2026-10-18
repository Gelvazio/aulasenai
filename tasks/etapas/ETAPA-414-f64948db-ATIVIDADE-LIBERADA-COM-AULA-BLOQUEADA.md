## Etapa 414-f64948db — #285: Atividade liberada mostrando "Aula Bloqueada!" ao aluno

**Tarefa:** #285 · **Pedido em:** 2026-10-18 19:58 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "mesmo a aula estando desbloqueada, ao aluno abrir a atividade
*materiais/assistente-de-operacoes-logisticas/introducao-tic/atividades/atividades-aula-01-50-questoes*
e id = 2, aparece pra ele a mensagem *Aula Bloqueada! Esta aula ou atividade está bloqueada pelo
professor. Volte ao índice e aguarde a liberação.*"
**Objetivo:** com a aula liberada no índice, o aluno consegue abrir e responder a atividade da
AULA 01 da ITIC (AOPL, atividade id 2) — a mensagem "🔒 Aula Bloqueada!" só aparece quando a aula
ou a atividade está mesmo bloqueada para as turmas dele.

### Escopo

- **Entra:** diagnóstico e correção da checagem da página da atividade
  (`assets/js/atividade-bloqueio-aula.js`), só JavaScript/leitura; o índice e o visual não mudam.
- **Não entra:** mudar RLS, trigger ou dados do banco; mudar o bloqueio por turma no índice.
- **Pronto quando:** atividade liberada abre e funciona; bloqueada de verdade continua mostrando o
  aviso; sem erro de JS.
- ⚠️ Sem navegador: a conferência final é do usuário; a checagem é por leitura do código e das
  consultas.

### #285.1 — Corrigir a checagem de bloqueio na página da atividade

**Próximo passo:** **PESADO de banco — fazer no Claude Code local (Opus 5.5+/Fable)**: consultar no
Supabase a linha `atividade` id 2 e a aula dela (`ativo`, `bloqueio`, `aula_id`, `aulas.ativo`,
`aula_turma.bloqueio`, `turmaaluno`/`turma` do aluno) e corrigir o que estiver bloqueando; só depois
ajustar o JS, se for o caso.

- **Nível:** PESADO — o diagnóstico depende de **consulta ao banco** (RLS de `atividade`, `aula`,
  `aula_turma`, `turmaaluno`), que só o Claude Code local faz.
- **Modelo:** PESADO · só Opus 5.5+ ou Fable (Claude Code local) — nunca outro
- **Descrição:** a página da atividade (`assets/js/atividade-bloqueio-aula.js`) **não decide** o
  bloqueio: ela pergunta ao banco (`sbGet('atividade', 'select=id&pagina=eq.<caminho>'`) e, se o RLS
  não devolver a linha, mostra "🔒 Aula Bloqueada!". Ou seja: o aluno está vendo o aviso porque o RLS
  **está escondendo a atividade id 2** — não é o JavaScript que errou o caminho (o seed grava
  `/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html`,
  igual ao `location.pathname`).
- **Causas a conferir no banco (em ordem):** (1) `atividade.ativo = false` na id 2 (o ON/OFF da
  atividade, por turma, grava `atividade.bloqueio`, e `ativo=false` bloqueia para todas);
  (2) `atividade.bloqueio` contendo o código da turma do aluno; (3) `aulas.ativo = false` ou
  `aula_turma.bloqueio = true` para a turma do aluno (o ON/OFF do card da aula é por turma: o aluno
  de outra turma continua bloqueado); (4) o aluno sem `turmaaluno`/`turma` ligando-o à turma da
  matéria (o RLS libera por turma); (5) trigger/função do bloqueio da aula que deixou as atividades
  da aula com `ativo=false` e não restaurou ao desbloquear.
- **Critérios de aceitação:** consulta de leitura mostra qual das 5 causas é a real; o ajuste de
  dados (ou o `UPDATE`/seed) é autorizado pelo usuário quando for o caso; a atividade liberada abre
  para o aluno e a bloqueada de verdade continua avisando; o JS só muda se o diagnóstico mostrar
  falha nele.
- **Verificação:** consultas de leitura no Supabase antes e depois; conferir o caminho
  `atividade.pagina` × `location.pathname`; sem navegador.
- **Entrega:** — · **Anotação:** criada e classificada por DeepSeek Harness (deepseek-flash); **não
  reservada nem executada** — banco é só do Claude Code local (`seeds.md`, `multiplas-ias.md`).
