## Etapa 493-d4b8e2f6 — ANO-SEMESTRE-CURSO: Ano e semestre no curso (lista Curso do modal Equipes)

**Tarefa:** ANO-SEMESTRE-CURSO · **Pedido em:** 2026-10-24 15:20 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s493)
**Pedido:** "no curso, deve ter o ano E SEMESTRE" (sobre a lista "Curso" do modal Equipes, tarefa CURSO-MATERIA-EQUIPES). Escolha do usuário: **criar colunas no curso**.
**Objetivo:** cada curso passa a ter **ano** e **semestre** gravados no banco, e a lista "Curso" do modal Equipes mostra, por exemplo, `Técnico em Informática para Internet — 2026/1`.

### Escopo

- **Entra:** colunas `ano` e `semestre` na tabela `curso` (nullable, aditivas); preenchimento inicial a partir
  do período `AAAA/S` que aparece no nome das turmas de cada curso (`turma.nome`, ex.: `AI OPIR 2026/1 V1`);
  texto da lista Curso do modal Equipes; **filtros acima da lista Curso** (nome, ano e semestre); campos ano e semestre no cadastro de curso (`cursos.html`);
  `docs/database.md` e `docs/relatorio_verificacao_database.html`.
- **Não entra:** alterar turma ou matéria; mudar RLS; apagar dados; renomear curso; seed de atividades.

### Plano

| Item | O que muda | Como conferir |
|---|---|---|
| .1 | Arquivo SQL idempotente em `database/`: `ALTER TABLE curso ADD COLUMN IF NOT EXISTS ano SMALLINT` e `semestre SMALLINT` com `CHECK (semestre IN (1, 2))`; docs do schema | Leitura do SQL; `docs/database.md` com as 2 colunas |
| .2 | Aplicar o SQL no Supabase (conector) e preencher `ano`/`semestre` de cada curso pelo período mais frequente nas turmas dele; curso sem turma com período fica NULL | Consulta de leitura: colunas existem; valores por curso |
| .3 | `equipes-repositorio.js` lê `ano, semestre`; `equipes-modal.js` mostra `nome — AAAA/S` (sem valor, só o nome) | `node --check`; leitura do código |
| .5 | Filtros acima da lista Curso do modal Equipes: **Nome** (busca por texto) e botões **ON/OFF** de **Ano** (um por ano existente) e de **Semestre** (1º e 2º); só os cursos que passam nos filtros ligados aparecem na lista | `node --check`; leitura do código |
| .4 | Campos Ano e Semestre no cadastro e na edição de curso (`cursos-repositorio.js`, `cursos-modais.js`, `cursos-pagina.js`) | `node --check`; leitura do código |

### Riscos

- Preenchimento pelas turmas pode errar quando um curso tem turmas em 2026/1 e 2026/2 → fica o período mais
  frequente e o professor corrige no cadastro (.4). Plano B: deixar NULL e o professor preenche.
- Cursos sem turma (ex.: `Rio do Sul Mais Tech`) ficam sem período até o professor preencher.
- Mudança de banco em produção: só o `ADD COLUMN IF NOT EXISTS` e `UPDATE` das 2 colunas novas; nada é apagado.

### Decisões

- 2026-10-24 15:30 — pedido do usuário: "ADICIONE FILTROS EM CIMA, DE NOME ANO, SEMESTRE, DO TIPO ON/OFF". Interpretação (a confirmar no "sim"): filtros acima da lista Curso do modal Equipes; nome por texto, ano e semestre por botões ON/OFF (padrão do `faixa-materias-ensalado.md`); tudo ligado = mostra todos. Virou a subtarefa .5.
- 2026-10-24 15:20 — usuário escolheu criar colunas no curso (em vez de derivar das turmas). Plano **aguardando o "sim"** do usuário.
- 2026-10-24 15:40 — usuário respondeu "sim, aprovado o plano ANO-SEMESTRE-CURSO; pode executar" (inclui as subtarefas .1 a .5).

### ANO-SEMESTRE-CURSO.1 — SQL: colunas ano e semestre em curso, com a documentação do schema

**Próximo passo:** — (concluída)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** arquivo SQL idempotente + `docs/database.md` + `docs/relatorio_verificacao_database.html`.
- **Critérios de Aceitação:** só `ADD COLUMN IF NOT EXISTS`; sem DROP/DELETE; docs com as 2 colunas.
- **Entrega:** `database/2026-10-24-curso-ano-semestre.sql`, `docs/database.md` no commit desta entrega · **Verificação:** SQL só com ADD COLUMN IF NOT EXISTS, constraints idempotentes e UPDATE só onde ano/semestre estão vazios; sem DROP/DELETE de dados; `docs/database.md` com as 2 colunas; `relatorio_verificacao_database.html` não lista colunas do curso (nada a mudar)

### ANO-SEMESTRE-CURSO.2 — Aplicar no banco e preencher ano e semestre dos cursos

**Próximo passo:** — (concluída)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** aplicar pelo conector do Supabase (Claude Code local) e preencher pelo período das turmas.
- **Critérios de Aceitação:** colunas existem; cada curso com turma com período tem `ano` e `semestre`; registro em `database/SEEDS-APLICADOS.md` se aplicável.
- **Entrega:** `database/2026-10-24-curso-ano-semestre.sql` aplicado no Supabase (migração `curso_ano_semestre`); etapa no commit desta entrega · **Verificação:** consulta de leitura: colunas `ano`/`semestre` existem; cursos 2 e 4 = 2026/1, 5 e 7 = 2026/2, 6 = 2026/1 (iguais ao período das turmas); cursos 1 e 3 sem turma com período ficam em branco

### ANO-SEMESTRE-CURSO.3 — Lista Curso do modal Equipes mostra ano e semestre

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — classificado (jev (confiança 0.97))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Descrição:** `nome — AAAA/S` em cada opção da lista Curso.
- **Critérios de Aceitação:** `node --check` passa; sem linha nova > 100 caracteres; curso sem período mostra só o nome.
- **Entrega:** `assets/js/equipes-modal.js`, `assets/js/equipes-repositorio.js` no commit desta entrega · **Verificação:** `node --check` ok nos 2 JS; sem linha nova > 100 caracteres; `textoCursoEquipes` mostra `nome — AAAA/S` (só `AAAA` sem semestre; só o nome sem ano); conferir na tela (sem navegador)

### ANO-SEMESTRE-CURSO.4 — Campos ano e semestre no cadastro de curso

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — classificado (jev (confiança 0.82))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Descrição:** o professor informa e edita ano e semestre ao cadastrar ou editar o curso.
- **Critérios de Aceitação:** `node --check` passa; semestre só 1 ou 2; ano com 4 dígitos.
- **Entrega:** `cursos.html`, `assets/js/cursos-modais.js`, `assets/js/cursos-repositorio.js` no commit desta entrega · **Verificação:** `node --check` ok; campos Ano (2000–2100) e Semestre (1º/2º) no modal do curso, lidos e gravados em `incluirCurso`/`alterarCurso`; semestre só com ano; conferir na tela (sem navegador)

### ANO-SEMESTRE-CURSO.5 — Filtros Nome, Ano e Semestre (ON/OFF) acima da lista Curso

**Próximo passo:** depende do .3.

- **Nível:** MEDIO — classificado (jev (confiança 0.98))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** acima da lista Curso do modal Equipes: campo de busca por nome e botões ON/OFF de ano e de semestre; a lista Curso mostra só os cursos que passam nos filtros; a matéria escolhida some da lista se o curso dela for filtrado.
- **Critérios de Aceitação:** `node --check` passa; todos os filtros ligados = todos os cursos; botão ligado destacado como no `faixa-materias-ensalado.md`; sem linha nova > 100 caracteres.
