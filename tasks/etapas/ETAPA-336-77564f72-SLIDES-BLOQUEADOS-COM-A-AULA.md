## Etapa 336-77564f72 — Slides bloqueados junto com a aula (também pelo endereço do PDF)

**Tarefa:** #209-77564f72-9786-4bff-b0e7-13af8a43abe7 · **Pedido em:** 2026-10-16 18:28 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "tarefa 31-se a aula esta bloqueada, o slide deve ficar bloqueado tambem,pois o
bloqueio vale pra aula, pras atividades e pro slide"
**Objetivo:** fechar o caminho 3 da #31: hoje o PDF dos slides é arquivo estático do site e abre
para qualquer pessoa que tenha o endereço, mesmo com a aula bloqueada. Os slides passam a ser
servidos pelo Supabase Storage privado, com a mesma regra da aula (por turma, #206).

> ⚠️ **Tarefa grande** (banco, Storage e segurança): o plano abaixo espera a aprovação do usuário
> (#209.1). Nada foi executado.

### Escopo (proposta, para aprovação)

**Entra (só Testes de Front-End, a matéria com o bloqueio da aula ligado):**
- **Storage:** bucket **privado** `slides`; cada PDF em `<aula_id>/AULA-NN-SLIDES.pdf` (a pasta é
  o id da aula). São os 10 PDFs de `TESTES-DE-FRONTEND/AULAS/` (cerca de 24 MB).
- **Banco:** função `slide_liberado_para_usuario(nome)` (security definer) e política de leitura
  em `storage.objects`: professor lê todos; aluno lê só se a aula não estiver com
  `aulas.ativo = false` nem bloqueada em todas as turmas dele (`aula_turma`, mesma regra do
  índice). Gravar e apagar só professor. Sem `anon`.
- **Site:** os links "📕 Slides (PDF)" do índice e "Slides da aula" das páginas de atividade pedem
  ao Storage um **link temporário** (poucos minutos) na hora do clique e abrem o PDF; sem
  permissão, aparece "Aula Bloqueada!". Script novo único, carregado pelo índice e pelas páginas
  (e pelos geradores, para as páginas novas).
- **Tirar os PDFs do site:** remover a exceção
  `!MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/*.pdf` do `.vercelignore`
  (os PDFs continuam no Git, que é privado, mas o endereço antigo deixa de existir no site).
- **Envio dos PDFs ao Storage:** o usuário arrasta os 10 PDFs para as pastas certas no painel do
  Supabase (Storage → `slides`), seguindo uma lista com a pasta de cada um que a IA prepara. A IA
  não tem a chave de serviço e não deve tê-la.
- Documentação: `docs/database.md`, `docs/relatorio_verificacao_database.html`,
  `docs/regras/atividades.md`.

**Não entra:** PDFs de outras matérias (ligam junto com o bloqueio da aula, matéria por matéria);
PDFs que não são slides (`DOCUMENTACAO/`, `Material-Apoio-...`, desafio de casos de teste);
quem já baixou o PDF antes continua com a cópia.

**Critério de pronto:** com a aula bloqueada para a turma do aluno, ele não abre o slide nem pelo
índice, nem pela página da atividade, nem pelo endereço antigo (que não existe mais); com a aula
liberada, abre normalmente; o professor abre sempre; o usuário aceita.

### Riscos

- **Slide some do site antes de subir ao Storage** → plano B: o `.vercelignore` só muda depois de
  conferir no banco que os 10 arquivos estão no bucket (#209.4 depende da #209.3).
- **Link temporário vazado** → vale só alguns minutos.
- **Política do Storage errada** → conferir por simulação (aluno de turma bloqueada, aluno de
  turma liberada, professor, `anon`) em transação desfeita antes do aceite.

### Decisões

- 2026-10-16 18:28 — Tarefa criada a pedido do usuário; plano aguarda aprovação.

### #209.1 — Aprovação do plano pelo usuário

**Próximo passo:** 👀 o usuário responde se aprova o plano acima.

- **Nível:** LEVE — conferência do usuário.

### #209.2 — SQL: bucket `slides`, função e políticas do Storage

**Próximo passo:** depende da #209.1.

- **Nível:** PESADO — banco, RLS e segurança; só o Claude Code local.
- **Critérios de aceitação:** SQL idempotente em `database/`; aplicado e conferido por simulação
  (4 perfis) em transação desfeita; registrado em `database/SEEDS-APLICADOS.md`.

### #209.3 — Enviar os 10 PDFs ao bucket

**Próximo passo:** depende da #209.2; a IA monta a lista "arquivo → pasta (id da aula)".

- **Nível:** LEVE — envio pelo painel do Supabase (👀 usuário) e conferência por consulta.

### #209.4 — Links dos slides pelo link temporário e PDFs fora do site

**Próximo passo:** depende da #209.3.

- **Nível:** PESADO — mais de 3 arquivos ligados (índice, 10 páginas, geradores) e segurança.
- **Critérios de aceitação:** script único; nomes globais sem repetição; `node --check`;
  `.vercelignore` sem a exceção dos slides.

### #209.5 — Documentação

**Próximo passo:** depende da #209.4.

- **Nível:** LEVE — só documentação.

### #209.6 — Aceite do usuário

**Próximo passo:** depende da #209.5; o usuário testa como aluno com a aula bloqueada e liberada.

- **Nível:** LEVE — conferência do usuário.
