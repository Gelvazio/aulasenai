# Tabela `turmaprofessor` e perfil Professor Administrador

- **Criado em:** 2026-10-02
- **Concluído em:** 2026-10-02
- **Tempo decorrido:** mesmo dia
- **Status geral:** ✅ Concluído (aprovado pelo usuário)

## Objetivo

Vincular usuários de perfil PROFESSOR às turmas (`turmaprofessor`) e criar o papel de
**Professor Administrador**, o único que pode cadastrar, alterar e remover o acesso de professores
às turmas. O único Professor Administrador é **`gelvazio.camargo@senai.local`**.

## Banco real conferido (2026-10-02)

- `turma`: PK `codigo` (text); colunas `nome`, `turno`, `horario`, `local`, `uc`, `favorito`,
  `hora_inicio`, `hora_fim`, `lider_aluno_id`.
- `eh_professor()`: `app_metadata.perfil = 'PROFESSOR'` no JWT.
- `turmaprofessor`: não existe. Nenhuma função de administrador existe.
- Único usuário PROFESSOR hoje: `gelvazio.camargo@senai.local`.

## Escopo

1. **Tabela `public.turmaprofessor`**
   - `id` bigint identity (PK); `turma_codigo` text → `turma(codigo)` on delete cascade;
     `professor_id` uuid → `auth.users(id)` on delete cascade; `criado_em` timestamptz default
     `now()`; `criado_por` uuid default `auth.uid()`.
   - `unique (turma_codigo, professor_id)` (sem vínculo repetido).
   - Trigger que **recusa** vincular um usuário cujo `app_metadata.perfil` não seja PROFESSOR.
2. **Funções**
   - `eh_professor_administrador()` (security definer, `search_path` fixo): verdadeiro só quando o
     usuário logado é `gelvazio.camargo@senai.local` **e** tem `app_metadata.perfil = 'PROFESSOR'`
     **e** `app_metadata.administrador = true`. Dupla trava: e-mail fixo no banco + marcação que só a
     `service_role` altera (aluno/professor não conseguem se promover).
   - `professor_tem_turma(codigo text)`: verdadeiro se o professor logado está vinculado à turma
     (ou é administrador) — para uso futuro nas políticas de turmas/atividades.
3. **Marcar o administrador:** `raw_app_meta_data.administrador = true` só em
   `gelvazio.camargo@senai.local` (via SQL Editor/conector, que roda como `service_role`).
4. **RLS da `turmaprofessor`** (ligado; `anon` sem acesso):
   - SELECT: administrador vê tudo; professor vê só os próprios vínculos.
   - INSERT/UPDATE/DELETE: **somente** `eh_professor_administrador()`.
5. **SQL versionado:** `database/2026-10-02-turmaprofessor-professor-administrador.sql`
   (idempotente, sem apagar dados).
6. **Documentação:** regra no `CLAUDE.md` raiz deixando claro que **só
   `gelvazio.camargo@senai.local` tem o poder de Professor Administrador**; `docs/database.md` e
   `docs/relatorio_verificacao_database.html` atualizados com a nova tabela e as funções.

## Fora do escopo (próximas tarefas, se pedido)

- Tela para o administrador cadastrar os vínculos (por enquanto via SQL/conector).
- Usar `professor_tem_turma()` nas políticas das demais tabelas (hoje todo professor vê tudo).

## Riscos

- ~~JWT desatualizado~~: a função lê `auth.users` direto, então vale sem novo login.
- Professores novos (rafael.silva, joao.freitas) ainda não existem no Auth: só podem ser vinculados
  depois que as contas forem criadas.

## Passos

| Nº | Passo | Arquivo / alvo | Verificação | Status |
|----|-------|----------------|-------------|--------|
| 1 | Escrever o SQL idempotente | `database/2026-10-02-turmaprofessor-professor-administrador.sql` | leitura | ✅ |
| 2 | Aplicar pelo conector do Supabase (projeto `hxlvonriearllcmfqeri`) | banco | `apply_migration` sem erro | ✅ |
| 3 | Marcar `administrador = true` no gelvazio | `auth.users` | consulta de leitura | ✅ |
| 4 | Conferir tabela, políticas, trigger e funções | banco | consultas em `pg_policies`/`pg_proc` | ✅ |
| 5 | Regra no `CLAUDE.md` raiz | `CLAUDE.md` | leitura | ✅ |
| 6 | Atualizar `docs/database.md` + `relatorio_verificacao_database.html` | `docs/` | leitura | ✅ |
| 7 | Commit local (sem push) | git | `git log -1` | ✅ |

## Resultado

- Migrações aplicadas pelo conector: `turmaprofessor_professor_administrador` e
  `turmaprofessor_revoga_truncate` (TRUNCATE/REFERENCES/TRIGGER vinham dos privilégios padrão e
  ignoravam o RLS — revogados de `authenticated` e `anon`).
- Conferido: RLS ligado, 4 políticas, trigger, `administrador = true` só no gelvazio, `anon` sem
  execução das funções.
- Teste em transação desfeita: aluno não é administrador e não grava (RLS); administrador grava e
  `professor_tem_turma` = true; vincular aluno é recusado pelo trigger. Tabela segue vazia.
- Pendente (fora do escopo): tela de cadastro dos vínculos; contas de rafael.silva e joao.freitas
  no Auth antes de vinculá-los.
