# Liberar atividade fora do horário da turma, por aluno

- **Criado em:** 2026-10-01
- **Concluído em:** 2026-10-01
- **Tempo decorrido:** < 1 hora

## Objetivo

Hoje o aluno só grava alternativas e entrega uma atividade **dentro do horário da turma**
(`turma.hora_inicio` / `hora_fim`, regra imposta pelo RLS com `dentro_do_horario_da_turma()`).
Criar na tabela `atividade` a coluna **`atividade_liberada_fora_horario`** (lista JSON de ids de
alunos, padrão `[]`). Se o id do aluno logado estiver na lista, a atividade **não é bloqueada por
horário** para ele.

**Exceção:** avaliações seguem sempre o horário — `AVALIACAO-OBJETIVA-01`, `AVALIACAO-OBJETIVA-02`
e a futura `AVALIACAO-PRATICA`. Regra: toda página cujo nome começa com `AVALIACAO-` (vale para
todas as matérias, inclusive avaliações futuras).

## Situação atual (conferida no banco real em 2026-10-01)

- `atividade` não tem a coluna. Avaliações cadastradas: ids 19, 20 (Introdução à TIC) e 34, 35
  (Análise de Dados).
- Políticas `resposta_insert`, `resposta_update` e `entrega_insert` exigem
  `dentro_do_horario_da_turma()`, que não sabe qual é a atividade.
- O front-end não bloqueia antes: só explica o erro do banco ("Fora do horário da turma!"), então
  **não precisa mudar**.

## Escopo

- SQL: `database/2026-10-01-atividade-liberada-fora-horario.sql`
  - coluna `jsonb not null default '[]'` + check "é uma lista";
  - `atividade_eh_avaliacao(id)`: página começa com `AVALIACAO-`;
  - `pode_responder_no_horario(id)`: dentro do horário **ou** (não é avaliação **e** id do aluno na lista);
  - `liberar_fora_horario(atividade, aluno, true/false)`: só professor; recusa avaliação;
  - recria as 3 políticas trocando a checagem de horário pela nova função.
- Docs: `docs/database.md` + `docs/relatorio_verificacao_database.html` e regra no `CLAUDE.md`.
- **Fora do escopo:** tela para o professor marcar alunos (por enquanto a lista é editada no
  Supabase ou pela função `liberar_fora_horario`). Pode ser uma tarefa seguinte.

## Decisões / riscos

| Item | Decisão |
|------|---------|
| Tipo `json` × `jsonb` | **jsonb** (é JSON também; permite o teste `? id` e o check). |
| Quem lê a lista | Atividades ativas são legíveis por qualquer um (RLS `atividade_select`), então os ids (uuid) da lista ficam visíveis. Não revelam nome (a `usuario` tem RLS restritivo). Esconder exigiria permissões por coluna, que podem quebrar consultas atuais. |
| Avaliação na lista | Ignorada pelo banco mesmo se alguém editar a coluna à mão. |
| Dados | Nenhum dado apagado; políticas recriadas com a mesma regra + a exceção. |

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Conferir banco real (colunas, políticas, avaliações) | — | consultas de leitura | ✅ Concluído |
| 2 | Escrever o SQL idempotente | `database/2026-10-01-atividade-liberada-fora-horario.sql` | revisão | ✅ Concluído |
| 3 | Aplicar o SQL no Supabase (projeto `AULAS SENAI`) | — | `apply_migration` | ✅ Concluído |
| 4 | Conferir: coluna existe com `[]`; 3 políticas usam `pode_responder_no_horario`; `atividade_eh_avaliacao(19/20/34/35)` = true | — | consultas de leitura | ✅ Concluído |
| 5 | Atualizar documentação do banco e a regra no `CLAUDE.md` | `docs/database.md`, `docs/relatorio_verificacao_database.html`, `CLAUDE.md` | leitura | ✅ Concluído |
| 6 | Commit | — | `git diff --cached --name-only` | ✅ Concluído |

## Resultado

- SQL aplicado no Supabase (migração `atividade_liberada_fora_horario`).
- Conferido: coluna `jsonb` com padrão `[]` (34 de 34 atividades com `[]`); as 3 políticas usam
  `pode_responder_no_horario(atividade_id)`; `atividade_eh_avaliacao` = true para 19, 20, 34 e 35.
- Pendência (fora do escopo): tela para o professor marcar alunos liberados.
