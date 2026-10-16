## Etapa 336-77564f72 — Slides bloqueados junto com a aula (também pelo endereço do PDF)

**Tarefa:** #209-77564f72-9786-4bff-b0e7-13af8a43abe7 · **Pedido em:** 2026-10-16 18:28 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "tarefa 31-se a aula esta bloqueada, o slide deve ficar bloqueado tambem,pois o
bloqueio vale pra aula, pras atividades e pro slide"
**Objetivo:** fechar o caminho 3 da #31: hoje o PDF dos slides é arquivo estático do site e abre
para qualquer pessoa que tenha o endereço, mesmo com a aula bloqueada. Os slides passam a ser
servidos pelo Supabase Storage privado, com a mesma regra da aula (por turma, #206).

> ⚠️ **Tarefa grande** (banco, Storage e segurança): plano aprovado em 2026-10-16 18:38 (#209.1).

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
- 2026-10-16 18:38 — **Aprovação do plano:** o usuário respondeu "sim". Escopo aprovado como está acima. Registrado por Claude Code (Opus 5.5) (local · main · s14).
- 2026-10-16 18:41 — **Caminho dos PDFs (Opus 5.5):** a matéria 48 (Testes de Front-End) tem só 5 aulas no banco (ids 93, 94, 95, 124, 126) e há 10 PDFs; por isso cada PDF fica na pasta da **matéria** (`48/AULA-NN-SLIDES.pdf`) e o banco acha a aula pelo número NN do nome. Slide sem aula cadastrada fica liberado (não há aula para bloquear). Detalhe de forma, sem mudar o escopo aprovado.

### #209.1 — Aprovação do plano pelo usuário

**Próximo passo:** — (entregue).

- **Nível:** LEVE — conferência do usuário.
- **Entrega:** aprovação de 2026-10-16 18:38 registrada em Decisões. **Verificação:** resposta do usuário no chat.

### #209.2 — SQL: bucket `slides`, função e políticas do Storage

**Próximo passo:** — (entregue).

- **Nível:** PESADO — banco, RLS e segurança; só o Claude Code local.
- **Critérios de aceitação:** SQL idempotente em `database/`; aplicado e conferido por simulação
  (4 perfis) em transação desfeita; registrado em `database/SEEDS-APLICADOS.md`.
- **Entrega (2026-10-16 18:41):** `database/2026-10-16-slides-storage.sql` aplicado pelo conector: bucket `slides`
  privado (só PDF, até 20 MB), função `slide_liberado_para_usuario(nome)` (security definer, sem
  `anon`) e 4 políticas em `storage.objects` (leitura pela função; gravar/apagar só professor).
  Seed **CONCLUÍDO** em `database/SEEDS-APLICADOS.md`.
- **Verificação (banco real, transação desfeita com a aula 1 bloqueada na turma 135081):** aluno da
  135081 → aula 1 bloqueada `false`, aula 2 `true`, aula 4 (`ativo = false`) `false`, aula 6
  (não cadastrada) `true`; professor → `true` nas aulas 1 e 4; sem login → `false`; `anon` sem
  execução; bucket não público; 4 políticas; depois da simulação, 0 linhas da aula 93 em `aula_turma`.

### #209.3 — Enviar os 10 PDFs ao bucket

**Próximo passo:** 👀 o usuário envia os 10 PDFs de `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/` para a pasta `48` do bucket `slides` (painel do Supabase → Storage → slides → criar pasta `48` → enviar), sem mudar os nomes; depois a IA confere por consulta.

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

### #209.7 — Remover o armazenamento `slides` do Supabase

**Próximo passo:** aplicar `database/2026-10-16-remover-slides-storage.sql` e conferir.

- **Nível:** PESADO — banco e políticas do Storage.
- **Pedido (2026-10-16 18:44):** "remova esse armazenamento do supabase", depois de o usuário perguntar quem tinha pedido o armazenamento (a forma era proposta da IA). As subtarefas #209.3 a #209.6 ficam canceladas; os PDFs continuam no site como antes.
