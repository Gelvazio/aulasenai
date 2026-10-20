## Etapa 436-3fa9c2e8 — #307: Equipe × atividade (dupla responde junto, nota e gabarito da dupla)

**Tarefa:** #307 · **Pedido em:** 2026-10-20 13:46 · **Criada por:** Claude Code (Opus 5.5) (local · main · s30)
**Pedido:** a atividade 82 (`/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-01.html`)
foi feita em dupla; "falta 1 forma de vincular na equipe o id da atividade" — "crie esta tarefa então".
**Objetivo:** ligar equipes a atividades (tabela `equipe_atividade`), para a equipe responder numa conta
só, o colega receber a mesma nota e os dois exportarem o gabarito da dupla.

### Escopo

- **Entra:** tabela `equipe_atividade` + RLS; função de cópia da nota; função de leitura das respostas
  da própria equipe; modal de equipes com as atividades; exportação com os nomes da dupla; aplicar na
  atividade 82; documentação.
- **Não entra:** mudar a regra "1 equipe por aluno por turma + matéria"; equipes de outras matérias
  além da ligação manual pelo professor.
- **Pronto quando:** consulta mostra as equipes da turma 133933 ligadas à 82 com o respondente; os
  colegas sem entrega têm a mesma nota do respondente; o aluno só lê respostas da própria equipe
  (conferido por leitura do RLS/função); o professor confere a exportação na tela.

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

- ⬜ 1. A nota vai para o colega **automaticamente** (na entrega) ou só quando o **professor** mandar copiar?
- ⬜ 2. Na 82, ligar **todas** as equipes da turma ou só as 4 que entregaram?
- ⬜ 3. Aprovação do plano (tarefa grande: banco, nota e segurança).

### Decisões

| Quando | O quê | Quem |
|---|---|---|

### #307.1 — Tabela equipe_atividade com RLS

**Próximo passo:** aguardar o sim do plano.

- **Nível:** PESADO — banco (tabela, RLS, trigger).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** conferir antes onde a prova prática grava respostas e entrega (a `resposta_atividade` não tem linhas da 82); criar `public.equipe_atividade` (`equipe_id`, `atividade_id`, `respondente_id`, `criado_em`, `criado_por`, única por equipe + atividade) com o RLS das equipes (professor da turma grava; aluno lê só a da própria equipe); SQL idempotente em `database/`.
- **Entrega:** — · **Verificação:** —

### #307.2 — Função: nota de quem entregou para os membros da equipe

**Próximo passo:** depois da #307.1.

- **Nível:** PESADO — banco e nota.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** função `security definer` que, para uma atividade ligada a equipes, grava para cada membro sem entrega a mesma nota/entrega do respondente; idempotente; só o professor da turma chama.
- **Entrega:** — · **Verificação:** —

### #307.3 — Função: respostas da equipe para o colega exportar

**Próximo passo:** depois da #307.1.

- **Nível:** PESADO — segurança (aluno lê resposta de outro aluno).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** função que devolve ao aluno as respostas do respondente da **própria** equipe ligada à atividade, só quando o gabarito/respostas estiverem liberados pelo professor; nunca o gabarito da atividade.
- **Entrega:** — · **Verificação:** —

### #307.4 — Modal de equipes: ligar a equipe às atividades

**Próximo passo:** depois da #307.1.

- **Nível:** MEDIO — tela em até 3 arquivos (`equipes-modal.js`, `equipes-repositorio.js`, `equipes-tabela.js`).
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** no modal de equipes, campo para marcar as atividades da matéria em que a equipe trabalha junta (e ligar todas as equipes da turma de uma vez).
- **Entrega:** — · **Verificação:** —

### #307.5 — Exportar o gabarito da dupla

**Próximo passo:** depois da #307.3.

- **Nível:** MEDIO — tela/exportação em até 3 arquivos.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** no PDF/Word da prova prática, cabeçalho "EQUIPE NN: Aluno A + Aluno B" e respostas do respondente, pela função da #307.3; os dois membros exportam o mesmo arquivo.
- **Entrega:** — · **Verificação:** —

### #307.6 — Aplicar na atividade 82 (Prova Prática 01)

**Próximo passo:** depois da #307.2.

- **Nível:** PESADO — banco (dados de produção).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** ligar as equipes da turma 133933 (matéria 27) à atividade 82, respondente = quem entregou (EQUIPES 01, 06, 08 e 13 hoje), e rodar a cópia de nota; conferir por consulta.
- **Entrega:** — · **Verificação:** —

### #307.7 — Documentação

**Próximo passo:** depois da #307.6.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** `docs/database.md` (+ `relatorio_verificacao_database.html`), `docs/equipes-sala-de-aula.md` e `docs/regras/atividades.md`.
- **Entrega:** — · **Verificação:** —

