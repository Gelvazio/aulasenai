# Média final: professor escolhe o aluno (líder da turma por padrão)

- **Criado em:** 2026-10-01
- **Concluído em:** —
- **Tempo decorrido:** —

## Objetivo

Em `AVALIACAO-MEDIA-FINAL.html` (Introdução à TIC), o **professor** vê no topo os combos **Turma**
e **Aluno** e a tabela mostra as notas e pontos do aluno escolhido. O aluno que já vem selecionado
é o **líder da sala**:

| Turma | Líder (padrão) |
|-------|----------------|
| 135080 — AI AOPL 2026/2 M1 (CEPLAS manhã, aprendizagem) | aluna nº 20 da chamada (informada como "Nicole") |
| 135081 — AI AOPL 2026/2 V1 (CEPLAS tarde, aprendizagem) | aluno nº 27 (Jorge) — ⚠️ está **fora da chamada** |
| 133933 — AI AIAC 2026/2 V1 (SALETE) | a verificar → por enquanto, o **1º aluno da chamada** |

Turma que já vem selecionada: a **favorita** do professor (`turma.favorito`). Só aparecem as turmas
da UC da página (Introdução à TIC); a turma da SALETE é de outra UC (Análise de Dados), então não
aparece nesta página.

## Situação no banco (conferida em 2026-10-01)

- Não há onde guardar o líder → nova coluna `turma.lider_aluno_id`.
- No banco não existe "Nicole" na turma 135080; existe **Nicoly da Silva Westphal (nº 20)**,
  considerada a líder (confirmar).
- O professor já lê as notas de todos pela função `resumo_tentativas_atividade` (a mesma do
  relatório); a `nota_da_tentativa` só serve para o próprio aluno.

## Escopo e arquivos

| Arquivo | Mudança |
|---------|---------|
| `database/2026-10-01-turma-lider.sql` | coluna `turma.lider_aluno_id` (FK `aluno`) + função `definir_lider_turma` (só professor). Sem nomes de alunos (o arquivo é publicado). |
| Banco (direto, sem arquivo) | grava o líder das turmas 135080 e 135081 |
| `MATERIAIS/.../ATIVIDADES/AVALIACAO-MEDIA-FINAL.html` | `data-uc` + área dos combos |
| `assets/js/avaliacao-media-final.js` | professor: combos e notas do aluno escolhido; aluno: igual a hoje (separar em módulos se passar do limite) |
| `assets/css/avaliacao-media-final.css` | estilo dos combos |
| `docs/database.md`, `docs/relatorio_verificacao_database.html` | nova coluna |

## Riscos

- `turma` é legível (política `turma_select`), então o id (uuid) do líder fica visível; não revela o
  nome (a tabela `aluno` só mostra o próprio aluno).
- Nenhum dado é apagado.

## Passos

| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 1 | Conferir banco real (turmas, alunos, políticas) | consultas de leitura | ✅ Concluído |
| 2 | Escrever o SQL idempotente | revisão | ✅ Concluído |
| 3 | Aplicar o SQL e gravar os líderes (135080, 135081) | `apply_migration` + consulta | ⬜ Pendente |
| 4 | Combos Turma/Aluno no professor e notas do aluno escolhido | `node --check` | ⬜ Pendente |
| 5 | Atualizar documentação do banco | leitura | ⬜ Pendente |
| 6 | Commit | `git diff --cached --name-only` | ⬜ Pendente |

## Resultado

—
