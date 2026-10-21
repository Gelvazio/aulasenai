## Etapa 450-fecaa982 — Data e hora máxima da atividade (prazo de entrega)

**Tarefa:** #321-fecaa982-7eb8-4d0f-a3ca-1ab363725047 · **Pedido em:** 2026-10-21 11:03 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "onde eu coloco a data e hora maxima de cada atividade?" → "crie a tarefa pra adicionar data e hora máxima na atividade, e deixe publicado no quadro pra outra IA ASSUMIR"
**Objetivo:** o professor define, em cada atividade, a data e hora máxima; depois dela o aluno não grava nem entrega mais.

### Situação de hoje (levantada em 2026-10-21)

- Não existe prazo por atividade. Existem: horário da turma (`turma.hora_inicio`/`hora_fim`,
  imposto pelo RLS), `atividade.data_atividade` (só DATE, campo "Data" do modal
  `assets/js/atividades-crud-modal.js`; não bloqueia), `atividade.atividade_liberada_fora_horario`
  (alunos liberados fora do horário) e `atividade.ativo` / `atividade.bloqueio` (manual).
- Regras: `docs/regras/atividades.md` ("🕒 Horário da turma e liberação fora do horário"),
  `docs/database.md`, `database/2026-10-01-atividade-liberada-fora-horario.sql`.

### Escopo (a confirmar no plano — #321.1)

- **Entra (proposta):** coluna `atividade.data_hora_limite timestamptz` (vazio = sem prazo); o
  banco (RLS/funções de gravar e entregar) recusa resposta e entrega depois do prazo; campo
  "Data e hora máxima" no modal de cadastro de atividades; a página da atividade mostra o prazo
  e avisa/bloqueia depois dele.
- **Decidir com o usuário no plano:** prazo único ou por turma; se a lista
  `atividade_liberada_fora_horario` também libera depois do prazo; se o professor ainda pode
  "marcar como entregue" depois do prazo; o que acontece com quem tem respostas e não entregou
  (entrega automática ou não); fuso (Brasília).
- **Não entra:** mudar o horário da turma; notas já lançadas.

### Riscos

- Banco de produção (RLS de gravar/entregar) → tarefa grande: plano + aprovação; SQL idempotente.
- Bloquear sem querer quem já está respondendo → vazio = sem prazo (nada muda para as atividades
  existentes).

### Decisões

| Quando | Decisão | Quem |
|---|---|---|

### #321.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** ler as regras e o SQL citados acima, fechar as decisões em aberto e mostrar o
plano ao usuário.

- **Nível:** PESADO — banco, RLS e regra de entrega (arquitetura)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano nesta etapa (escopo, decisões, SQL previsto, arquivos,
  verificação) e "sim" do usuário registrado em Decisões.
- **Entrega:** — · **Verificação:** —

### #321.2 — Banco: coluna `data_hora_limite` e bloqueio de gravar/entregar depois do prazo

**Próximo passo:** esperar a #321.1.

- **Nível:** PESADO — banco (coluna, RLS/funções, SQL)
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro
- **Critérios de aceitação:** SQL idempotente em `database/`, aplicado e conferido por consulta;
  atividade sem prazo continua igual.
- **Entrega:** — · **Verificação:** —

### #321.3 — Cadastro: campo "Data e hora máxima" no modal de atividades

**Próximo passo:** esperar a #321.2.

- **Nível:** MEDIO — tela com lógica (`atividades-crud-modal.js` e repositório)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** grava e limpa o prazo; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #321.4 — Página da atividade: mostrar o prazo e avisar/bloquear depois dele

**Próximo passo:** esperar a #321.2.

- **Nível:** MEDIO — páginas do aluno (objetiva e prática/discursiva)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** prazo visível; depois dele, gravar/entregar mostram aviso claro
  (o banco já recusa); `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #321.5 — Documentação (`docs/regras/atividades.md`, `docs/database.md`)

**Próximo passo:** esperar a #321.3 e a #321.4.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
