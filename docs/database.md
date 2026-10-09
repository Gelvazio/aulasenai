# 📊 Database Schema — Supabase

**Última atualização:** 2026-09-28 (atividades, gabarito, respostas, turma e aluno — ver seção "Atualização 2026-09-28")
**Projeto:** AULAS SENAI  
**Banco:** Supabase PostgreSQL 17  
**Status:** ✅ Schema completo - todas as tabelas documentadas

---

## 📌 Documentação Relacionada

| Arquivo | Propósito |
|---------|-----------|
| **database.md** (ESTE) | 📄 Schema completo — FONTE PRIMÁRIA |
| `relatorio_verificacao_database.html` | 🌐 Visualização interativa do schema |
| `VERIFICACAO_DATABASE_2026-09-08.md` | ✅ Relatório de verificação e conformidade |

⚠️ **database.md é a FONTE DE VERDADE** para schema, colunas e relacionamentos.

---

## 🔗 Relações Principais

```
CURSO (1) ──→ (N) CURSOMATERIA (N) ←─── (1) MATERIA
  ↓                                          ↑
  └─────────────────────┬──────────────────┘
                        │
                    AULAS, AVALIACAO
                   (materia_id + curso_id)
                        │
          ┌─────────────┴──────────────┐
          ▼                            ▼
       MATERIAL              EMENTAS, PENDENCIAS
     (tipo_material_id)
```

---

## 1️⃣ Tabela: `usuario`

**Contém:** Usuários do sistema (alunos e professores), **ligados ao `auth.users` pela chave primária**
(alterada em 2026-09-30: `database/2026-09-30-usuario-liga-auth-users.sql`).

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | UUID | PK, FK → `auth.users(id)` ON DELETE CASCADE | — | Mesma chave da conta do Auth |
| **nome_completo** | VARCHAR | NOT NULL | — | Nome completo (obrigatório) |
| **email** | VARCHAR | NOT NULL | — | E-mail de login |
| login_usuario | TEXT | Nullable | NULL | Parte do e-mail antes do @ |
| perfil | TEXT | Nullable | `'ALUNO'` | Perfil: ALUNO, PROFESSOR |
| senha_hash, codigoacesso, codigousado, dataexpiracaocodigo | — | Nullable | — | Legado (login manual antigo) |
| **senha_informada** | BOOLEAN | NOT NULL | `false` | O professor informou a senha inicial ao aluno |
| senha_informada_em | TIMESTAMPTZ | Nullable | NULL | Quando foi marcado |
| **lider** | SMALLINT | NOT NULL | `0` | 1 = aluno líder (cadastra/altera equipes da própria turma), 0 = não; check `in (0, 1)`; grava só `definir_lider_usuario` (professor da turma) — 2026-10-08, `database/2026-10-08-usuario-lider-equipes.sql` |

**Primary Key:** `id` (UUID = `auth.users.id`) · **Rows:** 118 (uma por conta do Auth)
**Backup do que existia antes:** `usuario_legado_20260930` (17 linhas; RLS ligado, sem políticas).
**Quem grava `senha_informada`:** a página local `scripts/criarUsuariosBancoDados.html` (coluna
"Aluno anotou?"), com a chave `service_role`; ao trocar para Sim aparece um popup de confirmação.
**⚠️ Segurança:** a política pública de SELECT continua permitindo ler a tabela com a chave anônima
(inclusive `senha_hash`) — ativar RLS restritivo é pendência.

-------|------|-----------|--------|-----|
| **id** | INTEGER | PK, Auto-increment | — | Identificador único do usuário |
| **nome_completo** | VARCHAR | NOT NULL | — | Nome completo (obrigatório) |
| **email** | VARCHAR | NOT NULL | — | Email único (obrigatório) |
| login_usuario | TEXT | Nullable | NULL | Login/usuário para autenticação |
| perfil | TEXT | Nullable | `'ALUNO'` | Perfil: ALUNO, PROFESSOR |

**Primary Key:** `id` (INTEGER, auto-increment)  
**RLS Status:** ❌ **DESABILITADO** (⚠️ CRÍTICO: tabela totalmente exposta!)  
**Rows:** 6

**⚠️ SEGURANÇA CRÍTICA:**
- ❌ RLS desabilitado - qualquer um com a chave anon pode ler/modificar
- Campo `id` é INTEGER, não UUID (não vinculado a auth.users do Supabase)
- Recomendação: Habilitar RLS e adicionar políticas

---

## 2️⃣ Tabela: `curso`

**Contém:** Informações dos cursos de educação profissional

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('curso_id_seq')` | Identificador único |
| **nome_completo** | TEXT | NOT NULL | — | Nome do curso (obrigatório) |
| descricao | TEXT | Nullable | NULL | Descrição do curso |
| ativo | INTEGER | Nullable | `1` | Status (1=ativo, 0=inativo) |
| unidade | TEXT | Nullable | NULL | Unidade SENAI |
| materias | JSONB | Nullable | NULL | Cache de matérias (denormalizado) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `cursomateria.cursoid`
- → `aulas.curso_id`
- → `ementas.curso_id`

**RLS Status:** ❌ **DESABILITADO** (⚠️ CRÍTICO: recomenda-se ativar)  
**Rows:** 4

---

## 3️⃣ Tabela: `materia`

**Contém:** Disciplinas/matérias de cada curso

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('materia_id_seq')` | Identificador único |
| **descricao** | TEXT | NOT NULL | — | Nome da matéria (obrigatório) |
| ativo | INTEGER | Nullable | `1` | Status ativo/inativo |
| ementa_caminho | TEXT | Nullable | NULL | Caminho para arquivo de ementa |
| apostila_caminho | TEXT | Nullable | NULL | Caminho para apostila |
| conteudo_aulas | JSONB | Nullable | NULL | Conteúdo estruturado das aulas |
| status_criacao_avaliacao | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| status_plano_aula | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| status_plano_ensino | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| ensalado | BOOLEAN | Nullable | `false` | Matéria já ensalada (liberada para alunos) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |
| ementa_gerada | SMALLINT | Nullable | `0` | Flag: 0=Não, 1=Sim (ementa foi gerada) |
| aulas_caminho | VARCHAR | Nullable | NULL | Caminho para pasta de aulas |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `cursomateria.materiaid`
- → `aulas.materia_id`
- → `ementas.materia_id`
- → `material.materia_id`
- → `avaliacao.materia_id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 1

---

## 4️⃣ Tabela: `cursomateria` (JOIN Table)

**Contém:** Associação entre Cursos e Matérias (relação N-M)

| Campo | Tipo | Restrição | Referência |
|-------|------|-----------|-----------|
| **cursoid** | BIGINT | PK, FK | → `curso.id` |
| **materiaid** | BIGINT | PK, FK | → `materia.id` |

**Chave Primária Composta:** `(cursoid, materiaid)`  
**Importância:** ⚠️ **Campos SEM underscore** (`cursoid`, NÃO `curso_id`)  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 1

**Exemplo de Query:**
```sql
-- Carregar matérias de um curso
SELECT materiaid, materia(id, descricao) 
FROM cursomateria 
WHERE cursoid = 1 
ORDER BY ordem;
```

---

## 5️⃣ Tabela: `aulas`

**Contém:** Plano de aulas de cada matéria

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('aulas_id_seq')` | Identificador único |
| numero | INTEGER | CHECK (> 0) | — | Número sequencial da aula |
| **titulo** | TEXT | NOT NULL | — | Título da aula (obrigatório) |
| descricao | TEXT | Nullable | NULL | Descrição detalhada |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| **curso_id** | BIGINT | FK | — | Referência ao curso (obrigatório) |
| duracao_minutos | INTEGER | Nullable | NULL | Tempo de aula em minutos |
| data_planejada | DATE | Nullable | NULL | Data prevista para aula |
| sequencia | INTEGER | Nullable | NULL | Ordem de exibição |
| ativo | BOOLEAN | Nullable | `true` | Aula ativa/inativa |
| visivel_alunos | BOOLEAN | Nullable | `true` | Visível para alunos |
| conteudo | JSONB | Nullable | NULL | Conteúdo estruturado (slides, vídeos, etc) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |
| excluido | SMALLINT | NOT NULL, CHECK (0, 1) | `0` | Exclusão lógica: `1` = aula excluída (card escondido nos índices) |
| nome_card | TEXT | CHECK (1 a 200 caracteres) ou NULL | NULL | Nome exibido no card do índice de atividades (NULL = título do HTML); editado no modal "✏️ Editar aula" (`database/2026-10-06-aulas-nome-card.sql`) |
| rotulo_card | TEXT | CHECK (1 a 60 caracteres) ou NULL | NULL | Rótulo do topo do card (ex.: "AULA 01"; NULL = rótulo do HTML); editado no mesmo modal |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `material.aula_id`

**Exclusão lógica (2026-10-06, `database/2026-10-06-aulas-excluido.sql`):** só o Professor
Administrador marca `excluido = 1`, pela função `excluir_aula(p_aula bigint)` (security definer,
exige `eh_professor_administrador()`; `anon` sem execução). O trigger
`aulas_excluido_so_administrador_trg` recusa mudanças em `excluido` feitas pela API por quem não
é administrador (a política de update de `aulas` aceita qualquer professor). Restaurar: voltar
`excluido = 0` pelo SQL Editor. Nenhuma linha é apagada.

**Bloqueio da aula bloqueia as atividades (2026-10-09, `database/2026-10-09-trigger-bloqueio-aula-atividades.sql`):**
o trigger `aulas_bloqueio_propaga_atividades_trg` (AFTER UPDATE OF ativo, só quando `ativo` passa a
`false`) chama `aulas_bloqueio_propaga_atividades()` (security definer, sem execução pela API), que
grava `atividade.ativo = false` em todas as atividades da aula. Desbloquear a aula **não** mexe nas
atividades (o professor libera cada uma no ON/OFF do índice).

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

**Query Exemplo (aulas.js):**
```javascript
// Listar aulas ordenadas por título
const aulas = await sbGet("aulas", "select=*&order=titulo");

// Listar aulas de uma matéria
const aulasMateria = await sbGet("aulas", "select=*&materia_id=eq.5&order=numero");
```

---

## 6️⃣ Tabela: `avaliacao`

**Contém:** Avaliações e provas de cada matéria

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('avaliacao_id_seq')` | Identificador único |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| numero | INTEGER | CHECK (> 0) | — | Número sequencial da avaliação |
| **titulo** | TEXT | NOT NULL | — | Título da avaliação |
| data_aplicacao | DATE | NOT NULL | — | Data de aplicação da prova |
| status | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| status_aplicacao | TEXT | CHECK | `'PENDENTE'` | Status de aplicação |
| status_revisao | TEXT | CHECK | `'PENDENTE'` | Status de revisão |
| status_cadastro_sgn | TEXT | CHECK | `'PENDENTE'` | Status de cadastro no SGN |
| acompanhamento_pedagogico_sgn | TEXT | CHECK | `'PENDENTE'` | Status acompanhamento pedagógico |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 7️⃣ Tabela: `material`

**Contém:** Materiais de aula (apostilas, vídeos, PDFs, etc)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('material_id_seq')` | Identificador único |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| **tipo_material_id** | BIGINT | FK | — | Referência ao tipo de material |
| **titulo** | TEXT | NOT NULL | — | Título do material |
| descricao | TEXT | Nullable | NULL | Descrição do material |
| url_arquivo | TEXT | Nullable | NULL | URL do arquivo/recurso |
| tamanho_bytes | BIGINT | Nullable | NULL | Tamanho em bytes |
| ordem_exibicao | INTEGER | Nullable | `0` | Ordem de exibição |
| ativo | BOOLEAN | Nullable | `true` | Material ativo/inativo |
| aula_id | BIGINT | FK (Nullable) | NULL | Referência específica à aula (opcional) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys:**
- → `materia.id`
- → `tipo_material.id`
- → `aulas.id` (opcional)

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 8️⃣ Tabela: `tipo_material`

**Contém:** Tipos de material de aula (Apostila, Vídeo, PDF, etc)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('tipo_material_id_seq')` | Identificador único |
| **nome** | TEXT | NOT NULL, UNIQUE | — | Nome do tipo (ex: Apostila, Vídeo) |
| descricao | TEXT | Nullable | NULL | Descrição do tipo |
| ativo | BOOLEAN | Nullable | `true` | Tipo ativo/inativo |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `material.tipo_material_id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 7

---

## 9️⃣ Tabela: `ementas`

**Contém:** Ementas (programação) de cursos/matérias

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('ementas_id_seq')` | Identificador único |
| **curso_id** | BIGINT | FK | — | Referência ao curso (obrigatório) |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| **descricao** | TEXT | NOT NULL | — | Descrição da ementa |
| conteudo | JSONB | Nullable | NULL | Conteúdo estruturado em JSON |
| geracao_aulas | JSONB | Nullable | `'[]'` | Histórico de gerações de aulas |
| data_criacao | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| data_atualizacao | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys:**
- → `curso.id`
- → `materia.id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 🔟 Tabela: `unidade`

**Contém:** Unidades SENAI (localidades/campi)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('unidade_id_seq')` | Identificador único |
| **descricao** | TEXT | NOT NULL | — | Nome/descrição da unidade |
| cidade | TEXT | Nullable | NULL | Cidade onde fica a unidade |
| bairro | TEXT | Nullable | NULL | Bairro |
| endereco | TEXT | Nullable | NULL | Endereço completo |

**Primary Key:** `id`  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 1

---

## 1️⃣1️⃣ Tabela: `pendencias`

**Contém:** pendências de aulas do Professor Administrador (tela
`MATERIAIS/AGENDA_COLABORADOR/pendencias.html`, menu PENDÊNCIAS).
**Script:** `database/2026-10-06-pendencias.sql` (✅ aplicado em 2026-10-06 pelo conector do
Supabase). **Plano:** `docs/pendencias-aulas-professor-administrador.md`.

> ⚠️ A descrição anterior desta seção (colunas `data`, `descricao`, `materia_id`...) não
> correspondia ao banco: em 2026-10-06 a tabela não existia e foi criada com a estrutura abaixo.

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, identity | gerado | Identificador |
| **nome** | TEXT | NOT NULL, 1–300 caracteres | — | Descrição da pendência |
| **responsavel** | TEXT | NOT NULL, 1–120 caracteres | — | Quem resolve |
| **datainicio** | DATE | NOT NULL | `CURRENT_DATE` | Data de início |
| **status** | TEXT | CHECK `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA` | `'PENDENTE'` | Situação |
| **excluido** | SMALLINT | CHECK `0` ou `1` | `0` | Exclusão lógica (1 = excluída) |

**RLS:** ✅ habilitado. `select`, `insert` e `update` só com `eh_professor_administrador()`;
**sem política de `delete`** (excluir = `excluido = 1`, restaurar = `0`); `anon` sem acesso;
`truncate`/`delete` revogados de `authenticated`.

---

## 🆕 Atualização 2026-09-28 — Atividades, Gabarito e Respostas

**Scripts:** `database/2026-09-28-atividades-gabarito.sql` (schema + RLS) e
`database/2026-09-28-seed-atividades.sql` (gerado por `scripts/gerar-seed-atividades.py`).
**Plano:** `docs/respostas-atividades-banco-painel-professor.md`.

⚠️ **Banco real consultado em 2026-09-28 (API pública):**
- `atividade` **já existia**: `id, nome_atividade, status, quiz, created_at, updated_at`
  (1 linha: quiz "QUALIDADE"). Foi **ampliada**, sem apagar nada.
- `usuario` tem hoje `id, nome_completo, email, login_usuario, perfil, senha_hash, codigoacesso,
  codigousado, dataexpiracaocodigo, auth_user_id` e **responde à chave anônima, inclusive
  `senha_hash`** — ativar RLS com urgência.
- `curso`: 4 linhas (Rio do Sul Mais Tech, Operador de Produção Industrial, Téc. Desenvolvimento
  de Sistemas, Téc. Informática para Internet). `materia`: 23 (Introdução à TIC — Operador) e 24.

**Hierarquia:** `curso ← materia.curso_id ← aulas.materia_id ← atividade.aula_id`

| Tabela | Situação | Colunas | RLS |
|--------|----------|---------|-----|
| `materia` | Alterada | + `curso_id` BIGINT → `curso.id` (preenchido pela `cursomateria` quando há 1 curso) | + leitura do professor |
| `atividade` | Ampliada | + `aula_id` → `aulas.id`, `data_atividade` DATE, `descricao` TEXT, `pagina` TEXT (única, = `location.pathname`), `total_itens` INT, `ativo` BOOL | leitura pública das ativas |
| `gabarito` | Nova | `atividade_id`, `item`, `titulo`, `letra` (A–D) — PK (`atividade_id`, `item`) | **só professor lê** |
| `resposta_atividade` | Nova | `aluno_id` UUID → `auth.users` (padrão `auth.uid()`), `atividade_id`, `item`, `letra`, `atualizado_em` — PK (aluno, atividade, item) | aluno: as próprias, até entregar; professor: todas |
| `entrega_atividade` | Nova | `aluno_id`, `atividade_id`, `entregue_em` — PK (aluno, atividade) | aluno entrega 1 vez e só completa; professor: todas |
| `turma` | Nova | `codigo` PK, `nome`, `turno`, `horario` | leitura para logados |
| `aluno` | Nova | `id` UUID = `auth.users.id`, `nome`, `email` (único), `turma_codigo` → `turma`, `numero_chamada`, `na_chamada` | aluno: o próprio; professor: todos |

**Funções:** `eh_professor()` (lê `auth.jwt() → app_metadata.perfil`), `atividade_entregue()`,
`atividade_completa()`, `item_valido()` (security definer, usadas nas políticas).
**Perfil:** vem do `app_metadata` (só a `service_role` altera — `scripts/criar-usuarios-supabase-auth.js`);
`user_metadata` não é usado para permissão.

### 🕒 Atualização 2026-10-01 — Atividade liberada fora do horário (por aluno)

**Script:** `database/2026-10-01-atividade-liberada-fora-horario.sql` (aplicado no Supabase em
2026-10-01). **Plano:** `docs/atividade-liberada-fora-horario.md`.

| Objeto | Tipo | Descrição |
|--------|------|-----------|
| `atividade.atividade_liberada_fora_horario` | `jsonb not null default '[]'` (check: lista) | ids (`auth.users.id`) dos alunos que podem gravar/entregar a atividade fora do horário da turma |
| `atividade_eh_avaliacao(id)` | função | `true` se a página começa com `AVALIACAO-` (objetivas 01/02, prática...) |
| `pode_responder_no_horario(id)` | função | dentro do horário da turma **ou** (não é avaliação **e** aluno logado na lista) |
| `liberar_fora_horario(atividade, aluno, liberar)` | função (só professor) | inclui/retira o aluno da lista; recusa avaliação |

As políticas `resposta_insert`, `resposta_update` e `entrega_insert` passaram a usar
`pode_responder_no_horario(atividade_id)` no lugar de `dentro_do_horario_da_turma()`.
**Avaliações seguem sempre o horário da turma**, mesmo com o aluno na lista.

### 👑 Atualização 2026-10-01 — Líder da turma

**Script:** `database/2026-10-01-turma-lider.sql` (aplicado em 2026-10-01). **Plano:**
`docs/media-final-professor-seleciona-aluno.md`.

| Objeto | Tipo | Descrição |
|--------|------|-----------|
| `turma.lider_aluno_id` | `uuid` → `aluno.id` (on delete set null) | aluno líder da sala; aluno padrão nas telas do professor (vazio = 1º da chamada) |
| `definir_lider_turma(codigo, aluno)` | função (só professor) | define ou limpa o líder; o aluno precisa ser da turma |

Os líderes foram gravados direto no banco (nomes de alunos não vão para arquivos publicados).

### 🧑‍🏫 Atualização 2026-10-02 — `turmaprofessor` e Professor Administrador

**Script:** `database/2026-10-02-turmaprofessor-professor-administrador.sql` (aplicado em 2026-10-02
pelo conector do Supabase). **Plano:** `docs/tabela-turmaprofessor-professor-administrador.md`.

| Objeto | Tipo | Descrição |
|--------|------|-----------|
| `turmaprofessor.id` | `bigint` identity (PK) | identificador do vínculo |
| `turmaprofessor.turma_codigo` | `text` → `turma.codigo` (on delete cascade) | turma |
| `turmaprofessor.professor_id` | `uuid` → `auth.users.id` (on delete cascade) | professor (perfil PROFESSOR obrigatório, conferido por trigger) |
| `turmaprofessor.criado_em` / `criado_por` | `timestamptz` / `uuid` | quando e quem cadastrou |
| `unique (turma_codigo, professor_id)` | restrição | sem vínculo repetido |
| `eh_professor_administrador()` | função (security definer) | verdadeiro **só** para `gelvazio.camargo@senai.local` com `app_metadata.perfil = PROFESSOR` e `app_metadata.administrador = true` |
| `professor_tem_turma(codigo)` | função | professor logado vinculado à turma (ou administrador); usada nas políticas da `turmaaluno` e nas funções de turma (2026-10-03) |
| `turmaprofessor_exige_professor()` | trigger | recusa vincular usuário sem perfil PROFESSOR |

**RLS:** ligado; `anon` sem acesso; SELECT = administrador vê tudo, professor vê os próprios
vínculos; INSERT/UPDATE/DELETE = **somente** o Professor Administrador. TRUNCATE revogado
(`authenticated`/`anon`).

### 🎒 Atualização 2026-10-02 — `turmaaluno` (aluno × turma)

**Script:** `database/2026-10-02-turmaaluno.sql` (aplicado em 2026-10-02 pelo conector do
Supabase). **Plano:** `docs/tabela-turmaaluno-menu-alunos.md`. Tela: `alunos.html` (menu ALUNOS).

| Objeto | Tipo | Descrição |
|--------|------|-----------|
| `turmaaluno.id` | `bigint` identity (PK) | identificador do vínculo |
| `turmaaluno.turma_codigo` | `text` → `turma.codigo` (on delete cascade) | turma |
| `turmaaluno.aluno_id` | `uuid` → `auth.users.id` (on delete cascade) | aluno (perfil ALUNO obrigatório, conferido por trigger) |
| `turmaaluno.criado_em` / `criado_por` | `timestamptz` / `uuid` | quando e quem cadastrou (`null` na carga inicial) |
| `unique (turma_codigo, aluno_id)` | restrição | sem vínculo repetido |
| `turmaaluno_exige_aluno()` | trigger | recusa vincular usuário sem perfil ALUNO |

**RLS:** ligado; `anon` sem acesso; SELECT = professor vê os vínculos das turmas dele, aluno vê os
próprios; INSERT/UPDATE/DELETE = professor **só nas turmas dele** (desde 2026-10-03). TRUNCATE revogado. **Carga inicial:**
106 vínculos copiados de `aluno.turma_codigo`.

### 🔒 Atualização 2026-10-05 — bloqueio de atividade por turma

**Script:** `database/2026-10-05-bloqueio-atividade-por-turma.sql` (aplicado em 2026-10-05 pelo
conector do Supabase). **Plano:** `docs/bloqueio-atividade-por-turma-favorita.md`.

| Objeto | Tipo | Descrição |
|--------|------|-----------|
| `atividade.bloqueio` | `jsonb not null default '[]'` (check: array) | códigos das turmas em que a atividade está bloqueada; fora da lista = liberada |
| `atividade_liberada_para_usuario(jsonb)` | função (`security definer`, anon + authenticated) | verdadeiro para professor, visitante, aluno sem turma ou aluno com alguma turma (`turmaaluno`) fora da lista |
| `atividade_select` | política | `(ativo and atividade_liberada_para_usuario(bloqueio)) or eh_professor()` |
| `item_valido` / `topico_valido` | funções | passam a conferir também `atividade_liberada_para_usuario(bloqueio)` |
| `definir_bloqueio_turma(bigint, text, boolean)` | função (só authenticated) | bloqueia/libera para UMA turma (professor da turma; administrador em todas). Liberar atividade com `ativo = false`: `ativo = true` e todas as outras turmas entram na lista |

Usado pelo interruptor da turma favorita no índice das atividades
(`assets/js/indice-atividades-bloqueio.js`). Na aplicação: 56 atividades, todas com `bloqueio = []`;
as 22 com `ativo = false` continuam bloqueadas para todos.

### 💡 Atualização 2026-10-05 — `sugestoes_turmaaluno()` (alunos sem turma)

**Script:** `database/2026-10-05-sugestoes-turmaaluno.sql` (aplicado em 2026-10-05 pelo conector do Supabase).
**Plano:** `docs/sugestao-alunos-por-turma-confirmar.md`. Tela: `alunos.html` (filtro **Turma OK**).

| Objeto | Tipo | Descrição |
|--------|------|-----------|
| `sugestoes_turmaaluno()` | função (`security definer`, só `authenticated`) | alunos (perfil ALUNO) **sem** vínculo na `turmaaluno`, com a turma sugerida do `user_metadata.turma_codigo` (gravado ao criar a conta). Devolve `aluno_id`, `nome_completo`, `email`, `turma_sugerida`, `turma_nome`. Só professor recebe linhas; professor comum vê as sugestões das turmas dele e as sem turma; o administrador vê todas |

⚠️ O `user_metadata` é só **sugestão** (o aluno pode alterá-lo): o professor confirma em
`alunos.html` (botão ✅ Confirmar) e a gravação passa pelo RLS da `turmaaluno` e pelo trigger
`turmaaluno_exige_aluno`.

### 🔗 Atualização 2026-10-02 — turma do aluno unificada na `turmaaluno`

**Script:** `database/2026-10-02-turma-do-aluno-turmaaluno.sql` (aplicado em 2026-10-02).
**Plano:** `docs/unificar-turma-do-aluno-turmaaluno.md`.

| Objeto | Mudança |
|--------|---------|
| `horario_da_turma_do_aluno()` | lê a **`turmaaluno`**; uma linha por turma, primeiro as que estão no horário |
| `dentro_do_horario_da_turma()` | verdadeiro se **alguma** turma do aluno está no horário (sem turma = liberado) |
| `definir_lider_turma(codigo, aluno)` | confere o vínculo na `turmaaluno` |
| `sincronizar_turma_principal_aluno(aluno)` + trigger `turmaaluno_sincronizar_principal_trg` | após insert/update/delete na `turmaaluno`, copia a **turma principal** (vínculo mais recente; sem vínculo = `null`) para `aluno.turma_codigo` e `app_metadata.turma_codigo` |
| `aluno.turma_codigo` | agora é **cópia automática** — não gravar à mão |

Vínculos que faltavam (19 alunos da turma 122552, contas criadas antes) foram copiados: total
125. A criação de contas (`assets/js/criar-usuarios-api.js`, `scripts/criar-usuarios-supabase-auth.js`)
grava o vínculo na `turmaaluno` (upsert) e não manda mais `turma_codigo` para a tabela `aluno`.

### 🔒 Atualização 2026-10-03 — professor só vê as turmas vinculadas

**Script:** `database/2026-10-03-professor-so-turmas-vinculadas.sql` (aplicado em 2026-10-03 pelo
conector do Supabase). **Plano:** `docs/restringir-professor-as-turmas-vinculadas.md`.

| Objeto | Mudança |
|--------|---------|
| `professor_pode_ver_aluno(aluno)` | nova função: administrador = sempre; demais professores = aluno de turma vinculada a ele (`turmaaluno` × `turmaprofessor`) ou aluno (perfil ALUNO no Auth) ainda sem turma |
| SELECT de `aluno`, `usuario`, `resposta_atividade`, `entrega_atividade`, `liberacao_atividade`, `resposta_discursiva` | professor lê só o que `professor_pode_ver_aluno` permite (antes: todo professor lia tudo) |
| `turmaaluno` (SELECT/INSERT/UPDATE/DELETE) | professor só nas turmas dele (`professor_tem_turma`) |
| `definir_horario_turma`, `definir_lider_turma` | recusam turma não vinculada |
| `liberar_nova_tentativa`, `liberar_fora_horario` | recusam aluno de turma não vinculada |
| `resumo_tentativas_atividade` | lista só os alunos que o professor pode ver |
| `turmaprofessor` (dados) | `gelvazio.camargo` vinculado a 135080, 135081 e QA LBTSN 2026/1 M2; nenhuma turma sem professor |

`turma` continua legível por todo usuário logado (nome, turno, horário).

**Contas de teste (2026-10-03):** `admin@email.com` virou PROFESSOR; 12 contas antigas de teste
(fora de `@senai.local`, sem respostas nem turma) foram apagadas do Auth e da `usuario`. Backup:
tabela `contas_teste_legado_20261003` (RLS ligado, sem políticas).

### 🎓 Atualização 2026-10-03 — curso da turma e cursos do usuário logado

**Script:** `database/2026-10-03-turma-curso-e-cursos-do-usuario.sql` (aplicado em 2026-10-03 pelo
conector do Supabase). **Plano:** `docs/indice-cursos-do-usuario-logado.md`.

| Objeto | Mudança |
|--------|---------|
| `turma.curso_id` | nova coluna `bigint` → `curso.id` (on delete set null), índice `turma_curso_id_idx` |
| `turma` (dados) | 122552 → 2 (Operador de Produção Industrial); 133933 → 7 (Gestão e Controle de Materiais); 135080 e 135081 → 5 (Assistente de Operações Logísticas); QA LBTSN 2026/1 M2 → 6 (Rio do Sul Mais Tech) |
| `cursos_do_usuario()` | nova função (`security definer`, só `authenticated`): administrador = todos os cursos; professor = cursos das turmas dele (`turmaprofessor`); aluno = cursos das turmas dele (`turmaaluno`); sem login = nada. Usada pelo `index.html` da raiz |

⚠️ Turma nova precisa de `curso_id`; sem ele, o curso não aparece no índice para ninguém da turma.
A tabela `cursoprofessor` (plano `docs/cursoprofessor-design.md`) **não foi criada**: substituída por
este vínculo.

---

## 👥 Atualização 2026-10-05 — Equipes por turma + matéria

SQL: `database/2026-10-05-equipes-turma-materia.sql` (✅ aplicado no Supabase em 2026-10-05).
Plano: `docs/equipes-sala-de-aula.md`. Tela: modal **👥 Equipes** do menu das atividades.

| Tabela / objeto | Campos / regra |
|--------|---------|
| `equipe` | `id` (identity), `turma_codigo` → `turma.codigo`, `materia_id` → `materia.id`, `nome` (único em turma + matéria, ignorando maiúsculas/minúsculas e espaços nas pontas: índice `equipe_turma_materia_nome_normalizado_uk`, 2026-10-08, `database/2026-10-08-equipe-nome-unico-sem-maiusculas.sql`), `descricao`, `criado_em`, `criado_por` |
| `equipe_membro` | `id`, `equipe_id` → `equipe.id` (cascade), `aluno_id` → `auth.users.id`, `turma_codigo` e `materia_id` (cópias da equipe, pelo trigger), `papel`, `tarefas`, `lider`; único (`turma_codigo`, `materia_id`, `aluno_id`); índice único parcial = 1 líder por equipe |
| `equipe_membro_preparar_trg` | copia turma/matéria da equipe e exige o aluno na `turmaaluno` da turma |
| `equipe_bloquear_troca_turma_trg` | recusa trocar turma/matéria de equipe que tem integrantes |
| RLS | ligado nas duas; select/insert/update/delete só com `professor_tem_turma(turma_codigo)` (administrador em todas); `anon` sem acesso; TRUNCATE revogado |
| `minhas_equipes(p_materia_id)` | `security definer`, só `authenticated`: o aluno lê a(s) própria(s) equipe(s) da matéria com os nomes dos colegas |
| `aluno_lider_da_turma(p_turma_codigo)` | (2026-10-08) verdadeiro se o usuário logado tem `usuario.lider = 1` e está na turma (`turmaaluno`) |
| Políticas `*_lider` | (2026-10-08) `equipe`: select/insert/update; `equipe_membro`: select/insert/update/delete — todas com `aluno_lider_da_turma(turma_codigo)`; o líder **não** exclui equipe |
| `alunos_da_turma_lider(p_turma_codigo)` | (2026-10-08) `security definer`: id e nome dos alunos da turma, só para o líder dela |
| `definir_lider_usuario(p_usuario, p_lider)` | (2026-10-08) `security definer`: professor que vê o aluno (`professor_pode_ver_aluno`) marca `lider` 0/1; **1 líder por turma** — recusa ligar se alguma turma do aluno já tem outro líder (`database/2026-10-09-lider-unico-por-turma.sql`) |

---

## ✍️ Atualização 2026-10-06 — Correção das discursivas e notas da média final do aluno

SQL: `database/2026-10-06-notas-media-final-correcao-discursiva.sql` (✅ aplicado no Supabase em
2026-10-06). Plano: `docs/media-final-notas-do-aluno.md`. Telas: `correcao-discursiva.html`
(menu **CORREÇÃO**, professor) e `AVALIACAO-MEDIA-FINAL.html` (aluno).

| Tabela / objeto | Campos / regra |
|--------|---------|
| `correcao_discursiva` | PK (`aluno_id`, `atividade_id`, `tentativa`, `item`, `topico`); `nota_ia` (sugestão), `nota_ia_em` (quando a IA deu a nota; correção parcial, 2026-10-08), `nota_professor` (a que vale), `comentario`, `corrigido_por`, `corrigido_em`; notas ≥ 0 |
| `correcao_discursiva_validar_trg` | nota ≤ `topico_discursivo.pontos` do tópico; tópico tem de existir; grava `corrigido_por`/`corrigido_em` quando a nota do professor muda; **recusa alterar `nota_professor` já confirmada** (2026-10-08) |
| RLS | professor lê e grava só alunos de `professor_pode_ver_aluno` (administrador todos); aluno lê só as próprias linhas com `nota_professor` preenchida; sem delete; `anon` sem acesso; TRUNCATE revogado |
| `notas_media_final(p_paginas text[])` | `security definer`, só `authenticated`: para o aluno logado (`auth.uid()`), a melhor nota (0–10) entregue de cada página — objetiva = acertos ÷ total; discursiva = soma de `nota_professor` ÷ soma dos pontos, só com todos os tópicos corrigidos (senão `situacao = 'AGUARDANDO_CORRECAO'`). Não depende do bloqueio da atividade e não devolve gabarito |

## 🎯 Atualização 2026-10-08 — Quantidade mínima de questões nas discursivas

SQL: `database/2026-10-08-minimo-questoes-entrega.sql` (✅ aplicado no Supabase em 2026-10-08).
Plano: `docs/quantidade-minima-questoes-discursiva.md`.

| Tabela / objeto | Campos / regra |
|--------|---------|
| `atividade.minimo_questoes_entrega` | `smallint`, vazio = todas as questões; `check` ≥ 1 |
| `minimo_questoes_aluno` | PK (`atividade_id`, `aluno_id`); `minimo` (≥ 1), `definido_por`, `definido_em`; vale para todas as tentativas. RLS: aluno lê o próprio; professor lê e grava (insert/update/delete) só alunos de `professor_pode_ver_aluno`; `anon` sem acesso |
| `total_questoes_discursiva(p_atividade)` | Quantidade de questões (itens) da discursiva |
| `minimo_questoes_para_entregar(p_atividade, p_aluno)` | Mínimo do aluno, senão o da atividade, senão o total (nunca acima do total) |
| `questoes_completas_discursiva(p_atividade, p_aluno, p_tentativa)` | Questões com todos os tópicos com texto |
| `atividade_completa` (RLS da `entrega_atividade`) | Discursiva: questões completas ≥ mínimo; objetiva sem mudança |
| `notas_media_final` | Discursiva: só tópicos respondidos (todos com `nota_professor`); nota = soma × (total ÷ mínimo), **máximo 10**; com mínimo = total, igual a antes |

## 🔓 Atualização 2026-10-06 — Liberar gabaritos por atividade e turma

SQL: `database/2026-10-06-liberacao-respostas-turma.sql` (✅ aplicado no Supabase em 2026-10-06).
Plano: `docs/liberacao-respostas-por-turma.md`. Telas: quadro "Respostas dos alunos nesta atividade"
(professor) e botão "🔑 Exportar Gabarito" (aluno).

| Tabela / objeto | Campos / regra |
|--------|---------|
| `atividade.gabarito_liberado` | `jsonb not null default '[]'`: códigos das turmas que já podem ver o gabarito real |
| `tentativaacessogabarito` | `id` (identity), `atividade_id` → `atividade`, `aluno_id` → `auth.users`, `data_hora` (padrão `now()`): cada pedido de gabarito feito pelo aluno antes da liberação. RLS: professor lê só alunos de `professor_pode_ver_aluno`; ninguém grava pela API (só a função); `anon` sem acesso |
| `alunos_sem_entrega_turma(bigint, text)` | `security definer`: quantos alunos da turma (`turmaaluno`) não entregaram a última tentativa liberada; só o professor da turma recebe a contagem (demais: 0) |
| `liberar_gabarito_turma(bigint, text, boolean)` | `security definer`, só `authenticated`: professor da turma (administrador em todas) libera — **só com todos os alunos da turma com entrega** — ou recolhe o gabarito |
| `solicitar_gabarito(bigint)` | `security definer`, só `authenticated`: devolve o gabarito real ao aluno logado só se a turma dele estiver em `gabarito_liberado` e ele tiver entrega; senão grava o pedido em `tentativaacessogabarito` e devolve vazio |
| `liberacao_gabarito_liberado_trg` | trigger em `liberacao_atividade`: recusa nova tentativa/recuperação quando o gabarito já foi liberado para a turma do aluno |
| `gabarito` | sem mudança: RLS só do professor |
| `aluno_pode_ver_gabarito(bigint)` / `registrar_tentativa_acesso_gabarito(bigint)` | internas (`security definer`, sem execução pela API): regra única de liberação (turma liberada + entrega) e gravação do pedido negado |
| `solicitar_gabarito_discursivo(bigint)` | `security definer`, só `authenticated`: padrão de resposta (`item`, `topico`, `enunciado`, `pontos`, `resposta_esperada`) das discursivas com a mesma regra; senão grava em `tentativaacessogabarito`. SQL: `database/2026-10-06-liberacao-respostas-discursiva.sql` (✅ aplicado) |

## 🧾 Atualização 2026-10-06 — Log de gravação das alternativas

SQL: `database/2026-10-06-log-resposta-atividade.sql` (✅ aplicado no Supabase em 2026-10-06).
Plano: `docs/log-resposta-atividade.md`.

| Tabela / objeto | Campos / regra |
|--------|---------|
| `log_resposta_atividade` | `id` (identity), `aluno_id`, `atividade_id`, `tentativa`, `item`, `letra_anterior`, `letra_nova`, `operacao` (`MARCOU`, `TROCOU`, `APAGOU`), `herdada`, `gravado_por`, `registrado_em` (padrão `now()`). RLS: professor lê só alunos de `professor_pode_ver_aluno`; ninguém grava pela API; `anon` sem acesso |
| `resposta_atividade_log_trg` | gatilho `after insert or update or delete` em `resposta_atividade` (função `registrar_log_resposta_atividade`, security definer); regravar a mesma letra não gera linha |
| Só registros novos | sem carga das respostas antigas (pedido do usuário); vale a partir de 2026-10-06 |

---

## 🔐 Segurança: RLS (Row Level Security)

| Tabela | RLS | Status | Ação Recomendada |
|--------|-----|--------|------------------|
| **usuario** | ❌ NÃO | 🔴 **CRÍTICO** | Ativar + criar policies |
| **curso** | ❌ NÃO | 🔴 **CRÍTICO** | Ativar + criar policies |
| materia | ✅ SIM | 🟢 OK | Verificar policies |
| cursomateria | ✅ SIM | 🟢 OK | Verificar policies |
| aulas | ✅ SIM | 🟢 OK | Verificar policies |
| avaliacao | ✅ SIM | 🟢 OK | Verificar policies |
| material | ✅ SIM | 🟢 OK | Verificar policies |
| tipo_material | ✅ SIM | 🟢 OK | Verificar policies |
| ementas | ✅ SIM | 🟢 OK | Verificar policies |
| unidade | ✅ SIM | 🟢 OK | Verificar policies |
| pendencias | ✅ SIM | 🟢 OK | Verificar policies |

**Comando para habilitar RLS:**
```sql
ALTER TABLE "public"."usuario" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."curso" ENABLE ROW LEVEL SECURITY;
```

---

## 📋 Campos Críticos e Nomes Corretos

### Nomes SEM underscore em `cursomateria`
- ✅ `cursoid` (NÃO `curso_id`)
- ✅ `materiaid` (NÃO `materia_id`)

### Nomes COM underscore em outras tabelas
- ✅ `nome_completo` em `curso` e `usuario`
- ✅ `descricao` em `materia` e `ementas`
- ✅ `materia_id` em `aulas`, `material`, `avaliacao`
- ✅ `curso_id` em `aulas` e `ementas`
- ✅ `tipo_material_id` em `material`

---

## 🔍 Queries Úteis

### Listar usuários
```javascript
const usuarios = await sbGet("usuario", "select=*");
```

### Listar cursos
```javascript
const cursos = await sbGet("curso", "select=id,nome_completo&order=nome_completo");
```

### Listar matérias de um curso
```javascript
const materias = await sbGet(
  "cursomateria",
  "select=materiaid,materia(id,descricao)&cursoid=eq.1&order=ordem"
);
```

### Listar aulas de uma matéria
```javascript
const aulas = await sbGet(
  "aulas",
  "select=*&materia_id=eq.5&order=numero"
);
```

### Inserir novo usuário
```javascript
const novoUsuario = {
  nome_completo: "João Silva",
  email: "joao@example.com",
  login_usuario: "joao",
  perfil: "ALUNO"
};
const resultado = await sbPost("usuario", novoUsuario);
```

### Inserir aula
```javascript
const novaAula = {
  titulo: "Introdução a Programação",
  materia_id: 5,
  curso_id: 1,
  numero: 1,
  duracao_minutos: 60
};
const resultado = await sbPost("aulas", novaAula);
```

---

## 📖 Referências em Documentações

Este arquivo deve ser referenciado em:
- ✅ `ORIENTACAO_JS_AULAS.md`
- ✅ `ORIENTACAO_JS_CURSO.md`
- ✅ `ORIENTACAO_JS_MATERIA.md`
- ✅ `ORIENTACAO_JS_LOGIN.md`
- ✅ Qualquer arquivo que trabalhe com banco de dados

**Link de referência:**
```markdown
📊 Consulte a schema de banco de dados em: `docs/database.md`
```

---

## ✅ Checklist de Conformidade

- [x] Todas as 11 tabelas documentadas
- [x] Todos os campos críticos documentados
- [x] RLS status verificado para cada tabela
- [x] Nomes corretos (cursoid, materiaid, descricao, etc)
- [x] Queries de exemplo incluídas
- [x] Relacionamentos mapeados
- [x] Segurança crítica identificada (2 tabelas sem RLS!)
- [x] Tipos de dados especificados
- [x] Foreign keys mapeadas
- [x] Defaults e constraints documentados
