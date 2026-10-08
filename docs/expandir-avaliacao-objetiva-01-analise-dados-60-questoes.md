# Expandir a Avaliação Objetiva 01 de Análise de Dados para 60 questões

**Objetivo:** acrescentar 28 questões inéditas (itens 33 a 60) à Avaliação Objetiva 01 de Análise
de Dados Aplicada à Gestão, mantendo as 32 atuais, e atualizar o banco.

**Tech Stack:** Markdown (fonte), Python (`assets/gerador-atividades/gerar_atividades.py --so`),
Supabase (tabelas `atividade` e `gabarito`).

**Criado em:** 2026-10-01 11:20
**Concluído em:** 2026-10-01 13:44
**Tempo decorrido:** ~35:00

## Decisões (respondidas pelo usuário em 2026-10-01)

- Conteúdo: **só aulas 01 a 04** (a aula 05 é da Objetiva 02). 7 questões novas por aula.
- Duração: **150 minutos**.
- Banco: **aplicar pelo Supabase** (backup do gabarito atual, `total_itens` 32 → 60, gabarito 33–60).
- Conferido antes: atividade id 34, ativa, 32 itens, 32 gabaritos, **nenhuma resposta nem entrega**.

## Arquivos

- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-01-QUESTOES.md`
  (fora do Git: tem a linha Gabarito)
- `.../ATIVIDADES/AVALIACAO-OBJETIVA-01.html` (gerado)
- `.../ATIVIDADES/index.html` (card: 60 questões, 150 minutos, lista dos itens)
- `database/2026-10-01-analise-dados-objetiva-01-60-seed-atividades.sql` (fora do Git: tem gabarito)

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Escrever itens 33–60 no .md (7 por aula, gabarito equilibrado A–E) | ✅ Concluído | 2026-10-01 11:20 | 2026-10-01 13:44 | — |
| 2 | Atualizar cabeçalho (60 questões, 150 min, 60 pontos) | ✅ Concluído | 2026-10-01 11:20 | 2026-10-01 13:44 | — |
| 3 | Gerar o HTML com `gerar_atividades.py --so` | ✅ Concluído | 2026-10-01 11:20 | 2026-10-01 13:44 | — |
| 4 | Atualizar o card do `index.html` | ✅ Concluído | 2026-10-01 11:20 | 2026-10-01 13:44 | — |
| 5 | SQL: backup do gabarito, total_itens = 60, gabarito 33–60; aplicar e conferir | ✅ Concluído | 2026-10-01 11:20 | 2026-10-01 13:44 | — |
| 6 | Commit | ✅ Concluído | 2026-10-01 11:20 | 2026-10-01 13:44 | — |

## Verificação

- O gerador informa `60 itens`; o HTML tem 60 cartões `ITEM NN`.
- Banco: `total_itens = 60` e 60 linhas em `gabarito` para a atividade 34, iguais às do .md.

## Resultado (2026-10-01 13:44)

- `.md` com 60 itens; gabarito 12 de cada letra (A–E); itens 1–32 inalterados.
- HTML gerado com 60 cartões, duração 150 minutos e sem gabarito embutido (o gerador grava em
  `CONTEUDO/` quando a fonte está lá: a fonte foi copiada temporariamente para `ATIVIDADES/`).
- Banco (atividade 34): `total_itens = 60`, 60 linhas em `gabarito` iguais ao `.md`; backup das
  32 linhas anteriores em `gabarito_backup_av01_analise_20261001` (RLS ligado, sem políticas).
