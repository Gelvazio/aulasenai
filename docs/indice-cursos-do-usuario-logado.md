# Índice de cursos: só os cursos do usuário logado

**Criado em:** 2026-10-03
**Concluído em:** 2026-10-03
**Tempo decorrido:** ~30 min

## Objetivo

Na página inicial (`index.html`), listar apenas os cursos do usuário logado:

- **Professor:** cursos das turmas vinculadas a ele (`turmaprofessor`).
- **Aluno:** cursos das turmas dele (`turmaaluno`).
- **Professor Administrador:** todos os cursos.
- **Sem login:** nenhum curso; só a mensagem centralizada **"Entre no sistema para acessar seus cursos!"**.

## Decisões do usuário (2026-10-03)

- O vínculo é **o curso na turma** (`turma.curso_id`). Professor e aluno herdam os cursos das
  turmas em que estão. A tabela `cursoprofessor` (plano `docs/cursoprofessor-design.md`) **não será
  criada**: este plano o substitui.
- Ligação das turmas existentes:

| Turma | UC | Curso (`curso.id`) |
|---|---|---|
| 122552 — AI OPIR 2026/1 V1 | Fundamentos de Automação/Instrumentação | Operador de Produção Industrial (2) |
| 133933 — AI AIAC 2026/2 V1 | Análise de Dados Aplicada à Gestão | Assistente em Processos de Gestão e Controle de Materiais (7) |
| 135080 — AI AOPL 2026/2 M1 | Introdução a TIC | Assistente de Operações Logísticas (5) |
| 135081 — AI AOPL 2026/2 V1 | Introdução a TIC | Assistente de Operações Logísticas (5) |
| QA LBTSN 2026/1 M2 | Fundamentos da Tecnologia e Programação | Rio do Sul Mais Tech (6) |

## Banco real conferido (2026-10-03, leitura)

- `turma` não tem ligação com `curso` (só `uc` em texto). `cursoprofessor` não existe.
- `curso`: SELECT público (`curso_select`, `true`) — usado por outras páginas; **não será alterado**.
- `turma`: SELECT para `authenticated`.

## Escopo e arquivos

| Arquivo | Mudança |
|---|---|
| `database/2026-10-03-turma-curso-e-cursos-do-usuario.sql` | `turma.curso_id` (FK `curso`, índice), liga as 5 turmas, função `cursos_do_usuario()` |
| `assets/js/indice-cursos.js` | Sem sessão → mensagem; com sessão → RPC `cursos_do_usuario` |
| `assets/css/indice-cursos.css` | Mensagem centralizada (tokens no `:root`) |
| `index.html` | Inclui o CSS novo |
| `docs/database.md` + `docs/relatorio_verificacao_database.html` | Registrar coluna e função |
| `CLAUDE.md` | Registrar a regra |
| `docs/cursoprofessor-design.md` | Marcar como substituído por este plano |

### Função `cursos_do_usuario()`

`security definer`, `stable`, `search_path = public`; execução só para `authenticated`
(revogada de `public`/`anon`). Devolve `id, nome_completo, descricao` ordenados pelo nome:

- `auth.uid()` nulo → nada;
- `eh_professor_administrador()` → todos;
- senão → cursos de `turma.curso_id` das turmas em `turmaprofessor` (professor_id = uid) **ou**
  `turmaaluno` (aluno_id = uid).

## Riscos e dependências

- **Turma nova sem `curso_id`** não mostra curso a ninguém: ao cadastrar turma, preencher o curso
  (fica avisado no `CLAUDE.md`; tela de edição de turma não faz parte desta tarefa).
- A proteção é da **lista da página inicial**; a tabela `curso` continua legível pela API (nomes de
  cursos não são dados sensíveis e outras páginas dependem dessa leitura).
- Cursos duplicados (`1` e `6` — Rio do Sul Mais Tech) continuam como estão.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|---|---|---|---|
| 1 | Escrever SQL idempotente, sem apagar dados | `database/2026-10-03-turma-curso-e-cursos-do-usuario.sql` | leitura do arquivo | ✅ Concluído |
| 2 | Aplicar pelo conector do Supabase (projeto `hxlvonriearllcmfqeri`) | — | `select codigo, curso_id from turma`; `pg_proc` da função | ✅ Concluído |
| 3 | Alterar o índice (sessão, RPC, mensagem) | `assets/js/indice-cursos.js` | `node --check` | ✅ Concluído |
| 4 | Estilo da mensagem centralizada e inclusão no HTML | `assets/css/indice-cursos.css`, `index.html` | leitura | ✅ Concluído |
| 5 | Documentação do banco e regras | `docs/database.md`, `docs/relatorio_verificacao_database.html`, `CLAUDE.md`, `docs/cursoprofessor-design.md` | leitura | ✅ Concluído |
| 6 | Commit local (sem push) + graphify | — | `git diff --cached --name-only` | ✅ Concluído |

Sem navegador, servidor ou testes automatizados: a tela final deve ser conferida pelo usuário.

## Resultado

- SQL aplicado; 5 turmas ligadas; `anon` sem execução da função, `authenticated` com execução.
- Simulação no banco: aluno da 135080 vê só "Assistente de Operações Logísticas"; professor da 122552 vê só "Operador de Produção Industrial".
- `node --check assets/js/indice-cursos.js` OK. Tela a conferir pelo usuário.
