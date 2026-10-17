## Etapa 381-bce7117a — Excluir a aula de verdade no banco (sem exclusão lógica)

**Tarefa:** #254-bce7117a-9628-4120-a2f8-600394587a02 · **Pedido em:** 2026-10-17 11:49 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "aulas.excluido = 1, exclua mesmo a aula,se for possivel,nao quero ela nem no banco de
dados"
**Objetivo:** o "🗑️ Excluir" do card (#253) e o do "📚 Gerenciar Aulas" (#250) passam a apagar a
linha da tabela `aulas` (DELETE), em vez de marcar `aulas.excluido = 1`.

### Escopo

- **Entra:** trocar a função `excluir_aula` do banco por um DELETE de verdade (continua só para
  o Professor Administrador) e recusar no próprio banco a aula que ainda tem atividade vinculada;
  as datas e os bloqueios da aula por turma (`aula_turma`) saem junto (já é `on delete cascade`);
  ajustar as mensagens dos dois botões ("excluída definitivamente"); SQL para apagar de vez as
  aulas que já estão com `excluido = 1` e sem atividade (você roda no SQL Editor).
- **Não entra:** apagar atividades (continuam sendo desvinculadas ou excluídas antes, como na
  #253); tirar a coluna `aulas.excluido` (outras telas ainda a leem; fica sempre 0).

### Riscos

- **Sem volta:** aula apagada não tem como recuperar. Plano B: antes do DELETE em massa, o SQL
  mostra as aulas que serão apagadas (para conferir) e só apaga as que não têm atividade.
- **Outra tabela apontando para `aulas`** sem cascade faria o DELETE falhar. Plano B: a #254.2
  começa consultando todas as chaves estrangeiras que apontam para `aulas`; se houver outra além
  de `atividade` e `aula_turma`, paro e aviso.
- O conector do Supabase está desconectado nesta sessão: se continuar assim, o SQL fica pronto
  em `database/` e você roda no SQL Editor; eu confiro depois por consulta.

### Decisões

- **Plano aprovado** pelo usuário em 2026-10-17 11:51 ("sim").

### #254.1 — Plano e aprovação

**Próximo passo:** — (aprovado em 2026-10-17 11:51).

- **Nível:** PESADO — banco e apagar dados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #254.2 — Função `excluir_aula` com DELETE de verdade

**Próximo passo:** — (entregue).

- **Nível:** PESADO — função do banco que apaga dados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** `create or replace function public.excluir_aula(p_aula bigint)`: só
  administrador; se houver `atividade.aula_id = p_aula`, erro "aula tem atividade vinculada";
  senão `delete from public.aulas where id = p_aula`.
- **Entrega (2026-10-17 11:53, Opus 5.5, s14):** `database/2026-10-17-excluir-aula-definitivo.sql`
  aplicado pelo conector (migração `excluir_aula_definitivo`). Chaves que apontam para `aulas`
  (consulta): `atividade_aula_id_fkey` (sem cascade) e `aula_turma_aula_id_fkey` (cascade) — nenhuma
  outra.
- **Verificação:** a definição no banco tem o `delete from public.aulas` e a trava da atividade
  vinculada; `anon` sem execução, `authenticated` com; `select excluir_aula(-1)` sem login
  recusou ("Somente o Professor Administrador…", 42501).

### #254.3 — Telas: mensagens de exclusão definitiva

**Próximo passo:** — (entregue).

- **Nível:** PESADO — fluxo de exclusão de dados (mesma tarefa de banco).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** `indice-aula-excluir-card.js` e `indice-gerenciar-aulas-formulario.js`: textos
  "será EXCLUÍDA DEFINITIVAMENTE do banco (não tem volta)"; mensagem do banco sobre atividade
  vinculada mostrada ao professor; docs.
- **Entrega (2026-10-17 11:56, Opus 5.5, s14):** `indice-aula-excluir-card.js` e
  `indice-gerenciar-aulas-formulario.js`: confirmação "EXCLUÍDA DEFINITIVAMENTE do banco (não tem
  volta)" e o erro mostra a mensagem do banco; comentários de `indice-gerenciar-aulas.js` e
  `indice-gerenciar-aulas-repositorio.js`; `docs/regras/atividades.md`.
- **Verificação:** `node --check` nos 4 `.js`; linhas novas ≤ 100 caracteres. Sem navegador.

### #254.4 — Apagar as aulas que já estão com `excluido = 1`

**Próximo passo:** depois da #254.2: preparar o SQL (lista + DELETE só das sem atividade).

- **Nível:** PESADO — apagar dados em massa (o professor roda no SQL Editor).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
