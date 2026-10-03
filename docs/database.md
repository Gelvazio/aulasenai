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

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `material.aula_id`

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

**Contém:** Pendências de matérias (tarefas a fazer)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('pendencias_id_seq')` | Identificador único |
| **data** | DATE | NOT NULL | `CURRENT_DATE` | Data da pendência |
| datavencimento | DATE | Nullable | NULL | Data de vencimento |
| **descricao** | TEXT | NOT NULL | — | Descrição da pendência |
| status | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| materia_id | TEXT | Nullable | NULL | ID da matéria (se aplicável) |
| materia_descricao | TEXT | Nullable | NULL | Descrição da matéria |
| materia_link | TEXT | Nullable | NULL | Link da matéria |
| total_horas | INTEGER | Nullable | NULL | Total de horas |
| horas_ministradas | INTEGER | Nullable | NULL | Horas já ministradas |
| created_at | TIMESTAMPTZ | NOT NULL | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | NOT NULL | `now()` | Data última atualização |

**Primary Key:** `id`  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

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
