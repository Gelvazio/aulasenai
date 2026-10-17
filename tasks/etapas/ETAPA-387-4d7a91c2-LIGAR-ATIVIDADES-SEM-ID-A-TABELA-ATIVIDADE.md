## Etapa 387-4d7a91c2 — Ligar as atividades sem ID à tabela `atividade` e à aula

**Tarefa:** #260-4d7a91c2-8e35-4b60-a1f4-5c92d0b7e316 · **Pedido em:** 2026-10-17 17:51 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "TEM ATIVIDADE SEM ID, COMO A ATIVIDADE = ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html" ·
"1-SIM ID NA TABELA ATIVIDADE, E LIGADO A AULA; 2-FAÇA OS LIGAMENTOS; 3-TODAS AS ATIVIDADES QUE NAO
TIVEREM ID, RELACIONADO"
**Objetivo:** toda atividade de `MATERIAIS` passa a ter um registro (id) na tabela `atividade`,
ligado à sua aula, e a página da atividade usa esse id.

### Escopo

- **Entra:** levantar todas as páginas de atividade em `MATERIAIS/**` sem id no banco (ponto de
  partida: `ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html`, na `ATIVIDADE-SEXTA-FEIRA` de
  INTRODUCAO-TIC, que não cita nenhum id); criar o registro em `atividade` ligado à `aulas`
  certa; ligar a página ao id; documentar.
- **Não entra:** mudar questões, gabaritos ou notas de atividades que já têm id; a migração #25
  (páginas globais por id) — esta tarefa só liga o id.

### Riscos

- **Banco de produção:** `insert` em `atividade`. Plano B: o SQL de cópia/reversão em `database/`
  (idempotente, `security-banco.md`) e conferência por consulta antes e depois.
- **Aula errada:** nome de atividade pode apontar para mais de uma aula (nomes repetem entre
  turmas/matérias). Plano B: ligar só os casos sem dúvida; os ambíguos viram item 👀 para o usuário.
- **Gabarito:** as páginas não podem receber resposta certa ao ligar o id (`security-banco.md`).

### Decisões

- **Pedido confirmado pelo usuário em 2026-10-17:** o id é o da tabela `atividade`, ligado à
  aula; abrange todas as atividades sem id.
- **Plano ainda não aprovado** (tarefa grande: banco + mudança em massa). A #260.1 (Opus 5.5+ ou
  Fable) faz o diagnóstico, completa o plano e pede o "sim" do usuário.

### #260.1 — Diagnóstico e plano com aprovação

**Próximo passo:** consultar a tabela `atividade` e comparar com as páginas de `MATERIAIS/**`
(quais não têm registro nem aula); listar no plano, por atividade, a aula de destino; mostrar o
resumo ao usuário e esperar o "sim".

- **Nível:** PESADO — banco (consulta) e plano de mudança em massa.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** lista completa das atividades sem id, aula de destino de cada uma,
  casos ambíguos marcados, aprovação do usuário registrada nas Decisões.

### #260.2 — Criar os registros em `atividade` ligados à aula (só local)

**Próximo passo:** aguarda a #260.1.

- **Nível:** PESADO — `insert` no banco de produção, mudança em massa.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** SQL idempotente em `database/`, aplicado pelo Claude Code local;
  consulta final sem atividade do plano sem id ou sem aula.

### #260.3 — Ligar as páginas de atividade ao id

**Próximo passo:** aguarda a #260.2.

- **Nível:** MEDIO — HTML/JS de páginas, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** cada página do plano usa o id da `atividade`; `node --check` nos
  `.js` alterados; sem gabarito nas páginas.

### #260.4 — Documentação

**Próximo passo:** aguarda a #260.3.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Critérios de aceitação:** `docs/database.md` e a orientação de atividades em `docs/regras/`
  atualizados.
