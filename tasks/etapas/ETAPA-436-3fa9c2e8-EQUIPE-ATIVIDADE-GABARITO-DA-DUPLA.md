## Etapa 436-3fa9c2e8 — #307: Equipe × atividade (dupla responde junto, nota e gabarito da dupla)

**Tarefa:** #307 · **Pedido em:** 2026-10-20 13:46 · **Criada por:** Claude Code (Opus 5.5) (local · main · s30)
**Pedido:** a atividade 82 (`/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-01.html`)
foi feita em dupla; "falta 1 forma de vincular na equipe o id da atividade" — "crie esta tarefa então".
**Objetivo:** ligar equipes a atividades (tabela `equipe_atividade`) e **clonar as respostas do líder
da equipe para os demais integrantes**; daí em diante tudo segue o fluxo de hoje (nota calculada das
respostas e cada aluno exporta a própria).

### Escopo

- **Entra:** tabela `equipe_atividade` + RLS; função que clona as respostas (e a entrega) do líder para
  os demais membros; modal de equipes com as atividades; aplicar na atividade 82 (todas as equipes da
  turma); documentação.
- **Não entra:** mudar a regra "1 equipe por aluno por turma + matéria"; exportação nova (cada aluno
  exporta a própria, como hoje); o aluno ler respostas de outro aluno.
- **Pronto quando:** consulta mostra as 15 equipes da turma 133933 ligadas à 82; cada membro sem
  entrega tem as mesmas respostas e a mesma nota do líder; o professor confere na tela a exportação
  de um aluno que recebeu o clone.

### Situação em 2026-10-20 (consulta)

- Matéria 27 (Análise de Dados), turma 133933: 15 equipes (11 com 2 alunos, 3 com 1, 1 vazia), nenhuma
  com líder; 4 entregas da 82, uma em cada equipe (01, 06, 08 e 13).

### Riscos

| Risco | Plano B |
|---|---|
| Aluno ler resposta de quem não é da sua equipe | Leitura só por função `security definer` que confere a equipe ligada à atividade e a liberação |
| Os dois membros entregarem separados | Respondente = a primeira entrega; a cópia não sobrescreve quem já tem entrega própria |
| A prova prática grava em outra tabela (a `resposta_atividade` não tem linhas da 82) | Conferir na #307.1 antes de criar as funções |

### Perguntas abertas

- ✅ 1. → professor, 2026-10-20 13:48: "as respostas do lider da equipe devem ser clonadas para os demais
  integrantes, e o resto ja funciona hoje, cada aluno exporta sua propria nota".
- ✅ 2. → **todas** as equipes da turma.
- ✅ 3. → **"Sim, aprovo"** (professor, 2026-10-20 13:48).

### Decisões

| Quando | O quê | Quem |
|---|---|---|
| 2026-10-20 13:48 | Clonar as **respostas do líder** para os demais membros (não só a nota); a nota e a exportação seguem o fluxo de hoje | Professor |
| 2026-10-20 13:48 | #307.3 (leitura das respostas do colega) e #307.5 (exportação da dupla) **canceladas**: o clone torna as duas desnecessárias | Professor |
| 2026-10-20 13:48 | Na 82 nenhuma equipe tem líder marcado: o líder passa a ser quem entregou (`equipe_membro.lider = true`) | Claude Code (Opus 5.5) |

### #307.1 — Tabela equipe_atividade com RLS

**Próximo passo:** — (concluída em 2026-10-20 14:20 pela s31)

- **Nível:** PESADO — banco (tabela, RLS, trigger).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** conferir antes onde a prova prática grava respostas e entrega (a `resposta_atividade` não tem linhas da 82); criar `public.equipe_atividade` (`equipe_id`, `atividade_id`, `respondente_id`, `criado_em`, `criado_por`, única por equipe + atividade) com o RLS das equipes (professor da turma grava; aluno lê só a da própria equipe); SQL idempotente em `database/`.
- **Achado:** a prova prática grava em `resposta_discursiva` (item/tópico/texto) + `entrega_atividade`;
  na 82 há 14 alunos com respostas e só 4 entregas — muitos membros têm respostas próprias sem entregar.
- **Entrega:** `database/2026-10-20-equipe-atividade.sql` (tabela, índice, funções
  `equipe_atividade_turma` e `aluno_da_equipe`, 6 políticas) · **Verificação:** migração aplicada;
  consulta: `relrowsecurity = true`, 6 políticas em `pg_policies`, `anon` sem SELECT.

### #307.2 — Função: clonar as respostas do líder para os membros da equipe

**Próximo passo:** — (concluída em 2026-10-20 14:47; aplicação autorizada pelo professor: "faca 1 e 2")

- **Nível:** PESADO — banco (respostas, entrega e nota).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** função `security definer`, chamada pelo professor da turma, que copia as respostas e a entrega do líder da equipe ligada à atividade para cada membro que ainda não tem entrega própria (idempotente; nunca sobrescreve quem respondeu sozinho); a nota sai das respostas, como hoje.
- **Situação da 82 (consulta 14:33):** em cada equipe só um membro tem respostas (o outro tem 0);
  entregaram os respondentes das EQUIPES 01, 02, 06, 08 e 13 (59–60 respostas). O clone não sobrescreve ninguém.
- **Entrega:** `database/2026-10-20-clonar-respostas-equipe.sql` (funções
  `escolher_respondente_equipe` e `clonar_respostas_equipe`) · **Verificação:** migração aplicada;
  `pg_proc`: as duas `security definer`; `anon` sem execução; `authenticated` só executa a
  `clonar_respostas_equipe` (que exige `professor_tem_turma`).

### #307.3 — Função: respostas da equipe para o colega exportar

**Próximo passo:** ⛔ cancelada em 2026-10-20 13:48 (decisão do professor: o clone das respostas torna desnecessária).

- **Nível:** PESADO — segurança (aluno lê resposta de outro aluno).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** função que devolve ao aluno as respostas do respondente da **própria** equipe ligada à atividade, só quando o gabarito/respostas estiverem liberados pelo professor; nunca o gabarito da atividade.
- **Entrega:** — · **Verificação:** —

### #307.4 — Modal de equipes: ligar a equipe às atividades

**Próximo passo:** — (concluída em 2026-10-20 14:30; executor-medio, conferida pelo líder s31)

- **Nível:** MEDIO — tela em até 3 arquivos (`equipes-modal.js`, `equipes-repositorio.js`, `equipes-tabela.js`).
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** no modal de equipes, campo para marcar as atividades da matéria em que a equipe trabalha junta (e ligar todas as equipes da turma de uma vez).
- **Entrega:** `assets/js/equipes-atividades.js` (novo), `equipes-repositorio.js`
  (`criarCrudEquipeAtividade`), `equipes-modal.js`, `equipes-tabela.js`, `menu-acao-equipes.js`
  (carga), `assets/css/equipes-modal.css`. Professor: barra "Atividade + 🔗 Ligar TODAS as equipes
  da turma" e botão "📎 Atividades (n)" por equipe (marcar liga, desmarcar desliga); aluno líder e
  aluno não veem. · **Verificação:** `node --check` nos 5 JS; leitura do diff; FK
  `atividade_aula_id_fkey` confirma o embed `aulas!inner(materia_id)`. **Conferir na tela** (sem
  navegador pela regra): abrir o modal de equipes da turma 133933 e ligar uma atividade.

### #307.5 — Exportar o gabarito da dupla

**Próximo passo:** ⛔ cancelada em 2026-10-20 13:48 (decisão do professor: o clone das respostas torna desnecessária).

- **Nível:** MEDIO — tela/exportação em até 3 arquivos.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** no PDF/Word da prova prática, cabeçalho "EQUIPE NN: Aluno A + Aluno B" e respostas do respondente, pela função da #307.3; os dois membros exportam o mesmo arquivo.
- **Entrega:** — · **Verificação:** —

### #307.6 — Aplicar na atividade 82 (Prova Prática 01)

**Próximo passo:** — (concluída em 2026-10-20 15:05: o professor rodou o SQL no SQL Editor; conferida pela s31)

- **Nível:** PESADO — banco (dados de produção).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** ligar as 15 equipes da turma 133933 (matéria 27) à atividade 82; marcar como líder quem entregou (EQUIPES 01, 06, 08 e 13 hoje); rodar o clone e conferir por consulta (respostas e nota iguais às do líder).
- **Entrega:** `database/2026-10-20-aplicar-equipes-atividade-82.sql`, rodado pelo professor ·
  **Verificação:** consulta de 2026-10-20 15:05: 14 equipes com respondente ligado à 82 (a EQUIPE 15
  não tem membros); em cada equipe de 2, líder 👑 e colega com o mesmo número de respostas e a
  mesma entrega (ex.: EQUIPE 01 60/60, entregues); EQUIPE 11 com 41 × 43 porque os alunos seguem
  respondendo depois do clone (o clone não replica gravações novas; a replicação automática foi pedida e ainda não virou tarefa).

### #307.7 — Documentação

**Próximo passo:** depois da #307.6.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** `docs/database.md` (+ `relatorio_verificacao_database.html`), `docs/equipes-sala-de-aula.md` e `docs/regras/atividades.md`.
- **Entrega:** — · **Verificação:** —

