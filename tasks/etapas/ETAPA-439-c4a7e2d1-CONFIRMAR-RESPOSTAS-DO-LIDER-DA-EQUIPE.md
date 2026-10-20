## Etapa 439-c4a7e2d1 — #310: "Confirmar Respostas" do líder da equipe (respostas do líder valem para a equipe)

**Tarefa:** #310 · **Pedido em:** 2026-10-20 15:08 · **Criada por:** Claude Code (Opus 5.5) (local · main · s31)
**Pedido:** "em trabalho em equipe, a resposta do lider da equipe sempre seja a unica resposta da
equipe, sobrescrevendo as respostas dos integrantes" e "ao lado de cada atividade deve ter um botao
de nome *Confirmar Respostas* que chama a funcao `SELECT * FROM public.clonar_respostas_equipe(ID_DA_ATIVIDADE);`
[...] Esta tela de equipe deve ser visivel aos alunos, mas apenas o lider da equipe poder acessar
esta acao, e o vinculo da atividade, tambem deve ser somente pelo professor".
**Objetivo:** o líder da equipe (👑, `equipe_membro.lider`) confirma as respostas dele numa atividade
ligada à equipe e elas passam a ser as respostas de todos os integrantes (sobrescrevendo).

### Escopo

- **Entra:** mudar `clonar_respostas_equipe(p_atividade)` para (a) aceitar o **líder da equipe**,
  só para a própria equipe, e o professor da turma, para todas; (b) **sobrescrever** as respostas e a
  entrega dos integrantes com as do líder, guardando antes uma cópia do que for apagado; função
  `atividades_da_minha_equipe(p_materia)` para o aluno ver as atividades ligadas; na tela do aluno
  (card "minha equipe"), lista das atividades ligadas e botão **"Confirmar Respostas"** só para o
  líder da equipe; ligação equipe × atividade continua só do professor.
- **Não entra:** replicar a cada gravação (o líder confirma quando quiser); mudar quem é líder.
- **Pronto quando:** aluno líder confirma e os colegas ficam com as mesmas respostas/entrega; aluno
  não líder não vê o botão e a função recusa; cópia do que foi apagado consultável.

### Requisitos

| Id | Requisito (EARS) | Verificação |
|---|---|---|
| R1 | QUANDO o líder da equipe chamar `clonar_respostas_equipe(a)`, O SISTEMA DEVE copiar as respostas e a entrega dele para os demais membros **da equipe dele** ligada a `a`, apagando as anteriores deles | consulta antes/depois em transação de teste com `request.jwt.claims` do líder |
| R2 | SE quem chama não for professor da turma nem líder de equipe ligada a `a`, ENTÃO O SISTEMA DEVE recusar com erro 42501 sem alterar nada | chamada com claims de aluno não líder (rollback) |
| R3 | QUANDO o professor da turma chamar, O SISTEMA DEVE fazer o R1 em todas as equipes ligadas a `a` das turmas dele, com o líder (👑) como respondente | consulta |
| R4 | O SISTEMA DEVE guardar em `backup_clone_equipe` cada linha de resposta/entrega apagada (jsonb, quem, quando) | consulta na tabela |
| R5 | ONDE o usuário for aluno, a tela de equipes DEVE mostrar as atividades ligadas à equipe e o botão "Confirmar Respostas" só ao líder da equipe; ONDE for o professor, o botão aparece ao lado de cada atividade ligada de cada equipe | leitura do código (+ conferir na tela pelo professor) |

### Invariantes

| Id | Invariante | Domínio | Como conferir |
|---|---|---|---|
| I1 | Depois da confirmação, todo membro da equipe tem exatamente as mesmas linhas (item, tópico, texto/letra, tentativa) do líder naquela atividade | equipes ligadas à atividade | consulta `EXCEPT` líder × membro = 0 linhas |
| I2 | Nenhum aluno altera respostas de equipe que não é a dele | todo chamador | R2 |

### Perguntas abertas

- ✅ 1. → professor, 2026-10-20 15:20: "sim, o professor tambem deve ver e poder confirmar" (botão por equipe na visão do professor).
- ✅ 2. → "fica como esta": a entrega dos colegas nunca é apagada; se o líder entregou, quem não tem entrega recebe a dele.

### Riscos

| Risco | Plano B |
|---|---|
| Apagar resposta que o colega queria manter | Cópia em `backup_clone_equipe` antes de apagar; restaurar por SQL |
| Líder sem respostas confirma e zera a equipe | Função recusa se o líder não tem nenhuma resposta na atividade |

### Decisões

| Quando | O quê | Quem |
|---|---|---|
| 2026-10-20 15:08 | Muda a regra "nunca sobrescrever" da #307.2: a confirmação do líder sobrescreve os integrantes | Professor |
| 2026-10-20 15:20 | **Plano aprovado** ("3-sim"); professor também confirma (por equipe); entrega dos colegas fica como está | Professor |
| 2026-10-20 15:20 | Função ganha 2º parâmetro opcional `p_equipe` (botão por equipe); `clonar_respostas_equipe(ID)` continua valendo para todas as equipes permitidas | Claude Code (Opus 5.5) |

### #310.1 — Banco: confirmar respostas pelo líder, sobrescrevendo, com cópia do apagado

**Próximo passo:** — (concluída em 2026-10-20 15:30 pela s31)

- **Nível:** PESADO — banco + segurança (função security definer, apaga dados)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** R1–R4 + `atividades_da_minha_equipe(p_materia)`; SQL idempotente em `database/`.
- **Entrega:** `database/2026-10-20-confirmar-respostas-equipe.sql`: `backup_clone_equipe` (RLS, sem
  acesso pela API), `total_respostas_aluno`, `sobrescrever_respostas_membro`,
  `clonar_respostas_equipe(p_atividade, p_equipe DEFAULT NULL)` (substitui a da #307.2) e
  `atividades_da_minha_equipe(p_materia)` · **Verificação:** migração aplicada; `pg_proc`: `anon`
  sem execução em todas, `authenticated` só nas 2 públicas; R2 testado em bloco com rollback
  (claims de aluno não líder da turma 133933 → erro 42501). R1/R3/I1 conferir na 1ª confirmação real.

### #310.2 — Tela do aluno: atividades da equipe e botão "Confirmar Respostas"

**Próximo passo:** — (concluída em 2026-10-20 15:40; executor-medio, conferida pelo líder s31)

- **Nível:** MEDIO — tela em até 3 arquivos (`equipes-modal.js`, `equipes-repositorio.js`, CSS)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** R5; confirmação por popup antes de chamar; mensagem de sucesso/erro.
- **Entrega:** `equipes-repositorio.js` (`listarAtividadesDaMinhaEquipe`, `confirmarRespostasEquipe`),
  `equipes-atividades.js` (seção "Atividades da equipe" no card do aluno, botão "✅ Confirmar
  Respostas" só com `eu_lider`; no painel do professor, botão ao lado de cada atividade ligada,
  aparece/some ao marcar), `equipes-modal.js`, `equipes-modal.css`; confirmação por popup antes de
  chamar · **Verificação:** `node --check` nos 3 JS; leitura do diff (RPC com `p_atividade`/
  `p_equipe`; popup carregado pelo `menu-acao-equipes.js`). **Conferir na tela:** aluno líder e
  professor.

### #310.3 — Documentação

**Próximo passo:** executor-leve atualiza a documentação (junto com a #307.7).

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** `docs/database.md` e `docs/equipes-sala-de-aula.md`.
- **Entrega:** — · **Verificação:** —
