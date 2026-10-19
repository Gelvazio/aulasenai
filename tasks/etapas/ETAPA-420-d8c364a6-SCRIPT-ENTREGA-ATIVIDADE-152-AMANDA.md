## Etapa 420-d8c364a6 — #291: Script para voltar a atividade 152 para "em andamento" (aluna Amanda)

**Tarefa:** #291 · **Pedido em:** 2026-10-19 08:15 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "a atividade id=152,esta como entregue pra aluna *Amanda Zarqueta de Oliveira*, CRIE 1 SCRIPT
PARA DEIXAR COMO EM ANDAMENTO,QUE EU VOU EXECUTAR"
**Objetivo:** entregar um **script SQL** (o usuário executa no Supabase) que apaga **só** a entrega da
aluna **Amanda Zarqueta de Oliveira** na **atividade 152**, deixando a atividade **em andamento**
(as respostas que ela já marcou continuam; a entrega é o que a marca como "entregue").

### Escopo

- **Entra:** um arquivo `.sql` em `database/` com conferência em `SELECT` antes do `DELETE`, filtro
  pelo nome da aluna e pela atividade 152, e conferência depois; regra/como rodar no cabeçalho do
  arquivo e nesta etapa.
- **Não entra:** a IA **não executa nada no banco** (quem roda é o usuário), não muda schema, RLS,
  triggers nem `liberacao_atividade`; não apaga as respostas (`resposta_atividade`) nem a correção
  discursiva, se houver.
- **Pronto quando:** o arquivo estiver no repositório, com o `SELECT` de conferência e o `DELETE`
  limitados à aluna e à atividade 152, e a conferência final esperando 0 entregas.
- **Segurança:** o `DELETE` usa o `aluno_id` achado pelo nome (e mostra nome/e-mail antes); se o
  `SELECT` achar mais de uma aluna, o usuário ajusta o filtro pelo e-mail antes de rodar o `DELETE`.

### #291.1 — Criar o script SQL da entrega da aluna na atividade 152

**Próximo passo:** — (entregue em 2026-10-19 08:19). **O usuário executa no SQL Editor do Supabase.**

- **Nível:** MEDIO — a IA só escreve o `.sql`; **o banco é o usuário quem altera**; sem schema/RLS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Executor:** DeepSeek Harness (deepseek-flash) (local · main)
- **Descrição:** criar `database/2026-10-19-atividade-152-amanda-entrega-em-andamento.sql` com:
  (1) conferência da aluna em `public.aluno` (id, nome, e-mail, turma) pelo nome
  "Amanda Zarqueta de Oliveira"; (2) conferência das linhas de `public.entrega_atividade` dela na
  atividade 152 (tentativa, `entregue_em`, `entregue_por`); (3) `DELETE` só dessas linhas;
  (4) conferência final com `count(*) = 0`. Cabeçalho explica o que o script faz, que as respostas
  ficam e que é preciso revisar os `SELECT` antes do `DELETE`.
- **Critérios de aceitação:** script idempotente (rodar de novo não quebra), limitado à aluna e à
  atividade 152, com o "antes" e o "depois"; nenhum outro dado do banco é tocado; commit + push.
- **Entrega:** `database/2026-10-19-atividade-152-amanda-entrega-em-andamento.sql` — cabeçalho com o
  que faz e o que não faz e o passo a passo; `SELECT` 1 (aluna por nome/e-mail/turma), `SELECT` 2
  (entregas da aluna na atividade 152, com tentativa, `entregue_em` e `entregue_por`), `DELETE` com
  o mesmo filtro (só `entrega_atividade`, aluna + atividade 152), `SELECT` 3 (`count(*)` = 0) e um
  bloco **comentado** opcional para apagar também as respostas (`resposta_atividade`). Não altera
  schema, RLS, trigger, `liberacao_atividade`, respostas nem notas.
- **Verificação:** conferidas as tabelas/colunas no SQL do projeto (`aluno`: id, nome, email,
  turma_codigo; `entrega_atividade`: aluno_id, atividade_id, tentativa, entregue_em, entregue_por,
  PK `(aluno_id, atividade_id, tentativa)`); o `DELETE` usa o mesmo filtro do `SELECT` 2; nenhuma
  linha é executada nesta sessão (sem banco, sem navegador).
- **Anotação:** se a atividade 152 for discursiva e já tiver correção/nota lançada, o script **não**
  mexe nela — ele só tira a entrega, que é o que mostra "entregue"; se o usuário quiser zerar tudo,
  o bloco comentado apaga também as respostas.
