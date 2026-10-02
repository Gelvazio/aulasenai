# Atividades das aulas 01 a 06 — Fundamentos de Automação/Instrumentação

**Objetivo:** criar as atividades das aulas 01 a 06 da matéria
`MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/`, seguindo o modelo
de `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/`.

**Tech Stack:** Markdown (fonte), Python 3.14 (geradores de `assets/`), HTML/CSS/JS de `assets/`, SQL (seed).
**Criado em:** 2026-10-02 · **Status:** aprovado (escopo completo + aplicar no Supabase); **práticas suspensas pelo professor** em 2026-10-02 — "por enquanto não crie mais atividades práticas, faça apenas o link"

**Fontes (hierarquia):** ementa do curso (UC 10.12) → `EMENTA-CHALKIE-AI.md` → `AULAS/AULA-01.md` a `AULA-06.md`.
Todas as aulas 01–06 são da capacidade **C1** (lógica digital e CLP).

## Modelo seguido (Introdução à TIC)

| Peça | Arquivo no modelo | Gerador |
|---|---|---|
| Fonte das 50 questões (fora do Git: `*QUESTOES.md`) | `CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` | — |
| Página das 50 questões | `ATIVIDADES-AULA-NN-50-QUESTOES.html` | `assets/gerador-atividades/gerar_atividades.py` |
| Fonte da atividade prática discursiva (10 questões) | `CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md` (fora do Git) | — |
| Página da atividade prática | `ATIVIDADE-PRATICA-AULA-NN.html` | `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` |
| Menu | `MENU-ATIVIDADES.js` | — |
| Índice | `index.html` | `assets/gerador-indices/gerar_indices.py` |
| Cadastro no banco (atividade + gabarito) | `database/*-seed-atividades.sql` (fora do Git) | `scripts/gerar-seed-atividades.py` |

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Escrever `CONTEUDO/ATIVIDADES-AULA-01..06-50-QUESTOES.md` (300 questões A–D, capacidade C1, contexto industrial, gabarito no .md) | ✅ Concluído |
| 2 | Escrever `CONTEUDO/ATIVIDADE-PRATICA-AULA-01..06.md` + gabaritos (10 questões discursivas cada) | ⛔ Suspenso (fontes 01–03 prontas em CONTEUDO/, sem página publicada) |
| 3 | Gerar as páginas HTML (6 de 50 questões; folha de respostas e login, sem gabarito embutido) | ✅ Concluído |
| 4 | Links: índice da matéria e botão 📚 Atividades no card da matéria (curso e raiz) | ✅ Concluído |
| 5 | Gerar o seed SQL (atividades + gabarito) para o professor rodar no Supabase (não aplicar sem pedido) | ⬜ Pendente |
| 6 | Conferir: 50 itens por página, gabarito ausente do HTML, `.gitignore` cobrindo fontes e seed | ✅ Concluído |
| 7 | Commit local (HTML, índices, docs) + graphify | ✅ Concluído |

**Riscos:** volume grande (300 + 60 questões) — escrever por aula e validar com o gerador a cada uma;
gabarito vazar — conferir `git diff --cached --name-only` contra o `.gitignore`; atividade sem
cadastro no banco fica com marcação bloqueada até o professor rodar o seed.
