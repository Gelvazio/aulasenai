# Vínculo curso × turma e alunos da turma na página `turmas.html`

- **Criado em:** 2026-10-06
- **Concluído em:** —
- **Tempo decorrido:** —
- **Pedido do usuário:** "no menu turmas.html crie uma opção de vínculo de curso x turma (a turma
  tem vínculo com o curso) e, ao selecionar a turma, listar apenas os alunos daquela turma na página".

## Objetivo

Permitir que o Professor Administrador escolha o **curso de cada turma** pela página
`turmas.html` e, ao escolher uma turma, ver **somente os alunos daquela turma**.

## Situação real do banco (conferida em 2026-10-06, só leitura)

| Item | Situação |
|------|----------|
| `turma.curso_id` | ✅ já existe (FK para `curso.id`, `on delete set null`) e as 5 turmas já têm curso |
| RLS da `turma` | ligado; só existe `turma_select` (leitura para logados) — **ninguém consegue gravar o curso pela API** |
| `curso` | leitura liberada (`curso_select`) |
| `turmaaluno` | o administrador lê todos os vínculos (`professor_tem_turma`) |
| ⚠️ Achado | `anon` e `authenticated` têm **TRUNCATE** na `turma` (o RLS não barra TRUNCATE) |

## Escopo

- **Entra:**
  1. Função no banco `definir_curso_turma(p_codigo text, p_curso_id bigint)` — `security definer`,
     **só o Professor Administrador** (`eh_professor_administrador()`); `p_curso_id` nulo desvincula.
     Sem abrir `update` direto na tabela `turma`.
  2. Nova seção na `turmas.html`: **"Curso × Turma"** — lista "Turma" + lista "Curso" + botão
     **Salvar vínculo**; tabela com todas as turmas, o curso de cada uma e a quantidade de alunos,
     com **✏️ Editar** e **🗑️ Desvincular** (popup de confirmação).
  3. Ao **selecionar a turma** nessa seção, aparece logo abaixo o quadro **"Alunos da turma X"**
     com só os alunos dela (nome e e-mail, em ordem alfabética, com o total), lidos da
     `turmaaluno` + `usuario`.
  4. Documentação: `docs/database.md` + `docs/relatorio_verificacao_database.html` (nova função),
     regra do menu TURMAS no `CLAUDE.md` (versão + histórico; conferir o visualizador de regras),
     `STATUS.md`.
- **Não entra:** mudar a seção existente "Turmas × Professores"; cadastrar/editar cursos ou turmas;
  testes automatizados; abrir navegador.
- **Opcional (decisão do usuário):** revogar o **TRUNCATE** de `anon`/`authenticated` na `turma`
  no mesmo SQL (correção de segurança, não apaga dados).

## Arquivos previstos

| Arquivo | Ação |
|---------|------|
| `database/2026-10-06-definir-curso-turma.sql` | novo (idempotente, sem apagar dados) |
| `assets/js/turmas-curso-repositorio.js` | novo — dados: cursos, turmas com curso, alunos da turma, RPC |
| `assets/js/turmas-curso-pagina.js` | novo — tela da seção Curso × Turma e do quadro de alunos |
| `assets/css/turmas-professor.css` | pequenos acréscimos (quadro de alunos) |
| `turmas.html` | nova seção + `<script>` dos dois arquivos |
| `docs/database.md`, `docs/relatorio_verificacao_database.html` | registrar a função |
| `CLAUDE.md` (+ visualizador, se precisar) | regra do menu TURMAS atualizada |
| `STATUS.md` | Etapa nova |

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Escrever o SQL da função (e o revoke do TRUNCATE, se aprovado) | `database/2026-10-06-definir-curso-turma.sql` | leitura do SQL | ⬜ Pendente |
| 2 | Aplicar no Supabase (projeto `hxlvonriearllcmfqeri`) **só se o usuário pedir** | — | `pg_proc` / grants por consulta de leitura | ⬜ Pendente |
| 3 | Repositório de dados | `assets/js/turmas-curso-repositorio.js` | `node --check` | ⬜ Pendente |
| 4 | Tela (seção + quadro de alunos) | `assets/js/turmas-curso-pagina.js`, `turmas.html`, CSS | `node --check` + leitura | ⬜ Pendente |
| 5 | Documentação do banco | `docs/database.md`, `docs/relatorio_verificacao_database.html` | leitura | ⬜ Pendente |
| 6 | Regra no `CLAUDE.md` + versão + histórico; conferir visualizador | `CLAUDE.md` | regex da versão com `node` | ⬜ Pendente |
| 7 | `STATUS.md` + commit local | — | `git diff --cached --name-only` | ⬜ Pendente |
| 8 | Teste no navegador **pelo usuário** e aceite | — | — | ⬜ Pendente |

## Riscos

| Risco | Plano B |
|-------|---------|
| Função mal protegida permitir que outro usuário troque o curso | checagem `eh_professor_administrador()` no início; `revoke` de `public`/`anon` |
| Mudar o curso da turma muda os cursos que professores/alunos veem no índice (`cursos_do_usuario()`) | aviso no popup de confirmação |
| Validação só no navegador | o usuário testa a página (regra: nunca abrir navegador) |
