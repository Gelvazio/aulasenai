# Tabela `turmaaluno` + menu ALUNOS (`alunos.html`)

- **Criado em:** 2026-10-02
- **Status geral:** ✅ Concluído (aprovado: todo professor grava; carga inicial copiada)
- **Pedido:** "seguindo a mesma lógica [da turmaprofessor], crie a tabela `turmaaluno`, que relaciona
  alunos às suas turmas, numa página `alunos.html`, com um menu novo ALUNOS que só professores veem".

## Banco real conferido (2026-10-02)

- `turmaaluno` **não existe**.
- Hoje o aluno tem **uma** turma, em dois lugares: `public.aluno.turma_codigo` (106 linhas) e
  `auth.users.app_metadata.turma_codigo` (106 alunos: 133933 = 25, 135080 = 33, 135081 = 35,
  "QA LBTSN 2026/1 M2" = 13). A turma 122552 (Taió) ainda não tem alunos com conta.
- Funções que usam a turma do `app_metadata`/`aluno`: `horario_da_turma_do_aluno`,
  `resumo_tentativas_atividade`, `definir_lider_turma` — **não serão alteradas** nesta tarefa.
- Modelo seguido: `turmaprofessor` (`database/2026-10-02-turmaprofessor-professor-administrador.sql`).

## Escopo

| Nº | Passo | Arquivo / alvo | Status |
|----|-------|----------------|--------|
| 1 | SQL idempotente: tabela `turmaaluno` (`id` identity; `turma_codigo` → `turma` cascade; `aluno_id` → `auth.users` cascade; `criado_em`; `criado_por`; único `turma_codigo + aluno_id`), índice, trigger que só aceita usuário com perfil **ALUNO**, RLS (ver decisão A), sem TRUNCATE para os papéis da API | `database/2026-10-02-turmaaluno.sql` | ✅ |
| 2 | (Decisão B) Carga inicial copiando os 106 vínculos atuais de `public.aluno.turma_codigo` | mesmo SQL | ✅ |
| 3 | Aplicar pelo conector do Supabase e conferir (tabela, políticas, trigger, contagem) | banco | ✅ |
| 4 | Menu **ALUNOS** no header para **todo usuário com perfil PROFESSOR**, abrindo `alunos.html` | `js/header-usuario.js` | ✅ |
| 5 | Página `alunos.html` (raiz): vincular aluno × turma, editar, excluir (popup), filtro por turma e busca por nome; alunos = `usuario.perfil = 'ALUNO'` | `alunos.html`, `assets/js/turmas-aluno-repositorio.js`, `assets/js/turmas-aluno-pagina.js`, `assets/css/turmas-aluno.css` | ✅ |
| 6 | Atualizar `docs/database.md` + `docs/relatorio_verificacao_database.html`; registrar no `CLAUDE.md` | `docs/`, `CLAUDE.md` | ✅ |
| 7 | `node --check` e commit local (sem push) | — | ✅ |

## Decisões para o professor

- **A — Quem grava na `turmaaluno`:** (1) **todo professor** (`eh_professor()`), já que o menu é
  para professores; ou (2) só o Professor Administrador (igual à `turmaprofessor`).
  Leitura: professor vê tudo; aluno vê só os próprios vínculos; `anon` sem acesso.
- **B — Carga inicial:** copiar os 106 vínculos que já existem em `aluno.turma_codigo`
  (recomendado, a página já nasce preenchida) ou começar vazia.

## Fora do escopo

- Trocar as funções de horário/tentativas para ler a `turmaaluno` (continuam usando a turma do
  `app_metadata`/`aluno`). Mudar a turma de um aluno na nova página **não** muda o horário dele.

## Riscos

- Duas fontes de turma convivendo (`aluno.turma_codigo` e `turmaaluno`) até uma tarefa futura unificar.
- Validação sem navegador (só `node --check` e consultas ao banco); o professor testa a tela.

## Resultado

- Migração `turmaaluno` aplicada pelo conector; conferido: RLS ligado, 4 políticas, trigger, grants sem TRUNCATE.
- Carga: 106 vínculos (133933 = 25, 135080 = 33, 135081 = 35, QA LBTSN 2026/1 M2 = 13).
- Teste em bloco desfeito: vincular um PROFESSOR como aluno é recusado pelo trigger.
- Menu ALUNOS para todo professor; `alunos.html` com CRUD, filtro por turma e busca. `node --check` ok (sem navegador).
