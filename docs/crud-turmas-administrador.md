# CRUD da tabela `turma` no modal da tela TURMAS (Professor Administrador)

**Objetivo:** na tela `turmas.html`, o Professor Administrador cadastra, edita e exclui turmas
(dados da tabela `turma`) por um modal, além dos vínculos de professores.

**Tech Stack:** Supabase (PostgreSQL + RLS), JavaScript, HTML, CSS.

**Pedido do usuário:** 2026-10-09 — "deve ter o modal dos dados da tabela turma" / "que é o crud
no banco de dados".

**Criado em:** 2026-10-09
**Concluído em:** 2026-10-16 (feito na tarefa #201, etapa 328-d0739bde; ver a seção "Resultado")
**Tempo decorrido:** —

---

## Banco real conferido

- Colunas de `turma`: `codigo` (texto, chave), `nome` (obrigatório), `turno`, `horario`, `local`,
  `uc`, `hora_inicio`, `hora_fim`, `curso_id`, `favorito`, `lider_aluno_id`, `created_at`.
- RLS: **só existe a política de leitura** (`turma_select`, todo usuário logado). Hoje **ninguém**
  grava pela API (a página de usuários grava com a chave `service_role`, só na máquina local).
- ⚠️ O papel `authenticated` tem `TRUNCATE` na `turma` — a regra do projeto manda **revogar**.
- Excluir uma turma **apaga em cascata** `turmaaluno` (alunos da turma), `turmaprofessor` e
  `equipe`; `aluno.turma_codigo` impede a exclusão se houver aluno com essa turma.

## Decisões propostas

| # | Decisão | Proposta |
|---|---------|----------|
| D1 | Quem grava | **Só o Professor Administrador** (`eh_professor_administrador()`), nas três operações. |
| D2 | Campos do modal | Código (só no cadastro; não muda depois), Nome, Turno, Horário, Hora início, Hora fim, Local, UC. (`favorito`, `lider_aluno_id` e `curso_id` ficam de fora.) |
| D3 | Excluir turma | **Só turma vazia**: sem alunos (`turmaaluno`/`aluno`) e sem equipes; o banco recusa as outras (evita apagar dados em cascata). Os vínculos de professor saem junto. |
| D4 | Segurança extra | Revogar `TRUNCATE` da `turma` para `authenticated` e `anon`. |

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | SQL `database/2026-10-09-turma-crud-administrador.sql` (políticas insert/update/delete do administrador; delete só de turma vazia; revoke TRUNCATE) | ⬜ Pendente |
| 2 | Aplicar pelo conector e conferir (`pg_policies`, privilégios) | ⬜ Pendente |
| 3 | `docs/database.md` + relatório HTML | ⬜ Pendente |
| 4 | Repositório: `criarTurma`, `alterarTurma`, `excluirTurma` | ⬜ Pendente |
| 5 | `turmas.html` + `assets/js/turmas-dados-modal.js` (novo): botão **+ Nova turma**, ✏️ Dados da turma e 🗑️ Excluir turma em cada linha, modal com os campos | ⬜ Pendente |
| 6 | Regra em `docs/regras/usuarios-turmas-paginas-professor.md` + versão do `CLAUDE.md` | ⬜ Pendente |
| 7 | `STATUS.md` (Etapa 107) + commit | ⬜ Pendente |

### Passo 1: SQL

```sql
revoke truncate on public.turma from authenticated, anon;

drop policy if exists turma_insert_administrador on public.turma;
create policy turma_insert_administrador on public.turma for insert to authenticated
  with check (public.eh_professor_administrador());

drop policy if exists turma_update_administrador on public.turma;
create policy turma_update_administrador on public.turma for update to authenticated
  using (public.eh_professor_administrador())
  with check (public.eh_professor_administrador());

drop policy if exists turma_delete_administrador on public.turma;
create policy turma_delete_administrador on public.turma for delete to authenticated
  using (public.eh_professor_administrador()
    and not exists (select 1 from public.turmaaluno ta where ta.turma_codigo = turma.codigo)
    and not exists (select 1 from public.equipe e where e.turma_codigo = turma.codigo));
```

**Verificação:** `pg_policies` com as 3 políticas; `table_privileges` sem TRUNCATE para
`authenticated`/`anon`; nenhuma linha alterada.

## Riscos

| Risco | Plano B |
|-------|---------|
| Apagar alunos/equipes ao excluir turma | Política de delete só aceita turma sem alunos e sem equipes |
| Outro professor gravar turma | Todas as políticas exigem `eh_professor_administrador()` |
| Trocar o código e quebrar vínculos | Código não é editável no modal (só no cadastro) |

## Resultado (2026-10-16, tarefa #201)

Feito pela tarefa #201 (`tasks/etapas/ETAPA-328-d0739bde-CRUD-TURMAS-E-BOTAO-PROFESSORES.md`),
com estas mudanças em relação à proposta acima: SQL em
`database/2026-10-16-turma-crud-administrador.sql`; a exclusão usa a função
`turma_esta_vazia(codigo)` (security definer, também confere `aluno.turma_codigo`); o `anon` perdeu
todos os privilégios da `turma`; o modal tem unidade, curso e "Bloquear horário" (a coluna `local`
não existe mais); o vínculo de professores virou o botão **👥 Professores** na linha da turma.
