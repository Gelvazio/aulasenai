# Expandir a Avaliação Objetiva 02 de Análise de Dados para 60 itens

**Objetivo:** acrescentar 36 questões inéditas (itens 25 a 60, 12 por aula) à Avaliação Objetiva 02
de Análise de Dados Aplicada à Gestão (aulas 05 a 07), mantendo as 24 atuais, e atualizar o banco.

**Tech Stack:** Markdown (fonte), Python (`assets/gerador-atividades/gerar_atividades.py --so`),
Supabase (tabelas `atividade` e `gabarito`).

**Criado em:** 2026-10-01 14:05
**Concluído em:** 2026-10-01 14:31
**Tempo decorrido:** ~30:00

## Decisões (confirmadas pelo usuário em 2026-10-01)

- Mesmo procedimento da Objetiva 01: 60 itens, duração **150 minutos**, banco atualizado pelo MCP.
- Conteúdo: aulas 05, 06 e 07 (`CONTEUDO/5-`, `6-` e `7-*.md`), 12 questões novas por aula.
- A avaliação continua **bloqueada** (`ativo = false`).
- **Sem push**: só commit local (regra "NUNCA FAZER PUSH" registrada no `CLAUDE.md` da raiz).
- Conferido antes: atividade id 35, 24 itens, 24 gabaritos iguais ao `.md`, nenhuma resposta nem entrega.

## Arquivos

- `.../ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-02-QUESTOES.md` (fora do Git: tem a linha Gabarito)
- `.../ATIVIDADES/AVALIACAO-OBJETIVA-02.html` (gerado)
- `.../ATIVIDADES/index.html` (card: 60 questões, 150 minutos, lista dos itens)
- `database/2026-10-01-analise-dados-objetiva-02-60-seed-atividades.sql` (fora do Git: tem gabarito)

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Registrar "NUNCA FAZER PUSH" no `CLAUDE.md` da raiz e na memória | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:05 | — |
| 2 | Escrever itens 25–60 no .md (12 por aula, gabarito 12 por letra no total) | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:31 | — |
| 3 | Atualizar cabeçalho (60 questões, 150 min, 60 pontos) | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:31 | — |
| 4 | Gerar o HTML com `gerar_atividades.py --so` (fonte copiada para ATIVIDADES/) | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:31 | — |
| 5 | Atualizar o card do `index.html` | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:31 | — |
| 6 | SQL: backup do gabarito, total_itens = 60, gabarito 1–60; aplicar e conferir | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:31 | — |
| 7 | Commit local (sem push) | ✅ Concluído | 2026-10-01 14:05 | 2026-10-01 14:31 | — |

## Resultado (2026-10-01 14:31)

- `.md` com 60 itens; gabarito 12 de cada letra (A–E); itens 1–24 inalterados.
- HTML com 60 cartões, 150 minutos e sem gabarito embutido.
- Banco (atividade 35, continua bloqueada): `total_itens = 60`, 60 linhas em `gabarito` iguais ao
  `.md`; backup das 24 linhas anteriores em `gabarito_backup_av02_analise_20261001` (RLS ligado).
- Commit local; **sem push** (o usuário faz o push).
