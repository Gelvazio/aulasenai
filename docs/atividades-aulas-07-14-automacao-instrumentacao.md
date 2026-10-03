# Atividades das aulas 07 a 14 — Fundamentos de Automação/Instrumentação

**Objetivo:** continuar o trabalho de `docs/atividades-aulas-01-06-automacao-instrumentacao.md`,
criando as atividades de 50 questões das aulas 07 a 14 da matéria
`MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/`.

**Tech Stack:** Markdown (fonte), Python 3.14 (geradores de `assets/`), HTML/CSS/JS de `assets/`, SQL (seed).
**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03 · **Tempo decorrido:** mesma sessão
**Status:** ✅ concluído (aprovado; seed aplicado no Supabase a pedido)

**Fontes (hierarquia):** ementa do curso (UC 10.12) → `EMENTA-CHALKIE-AI.md` →
`AULAS/AULA-07.md` a `AULA-14.md`.

| Aula | Tema | Capacidade |
|---|---|---|
| 07 | Supervisão local e remota; componentes | C2 |
| 08 | SCADA, IHM e funções básicas | C2 |
| 09 | Simbologia, fluxogramas, malhas e sinais | C3 |
| 10 | Pressão: unidades, conversões e medidores | C4 |
| 11 | Nível: direta, indireta, descontínua e sólidos | C4 |
| 12 | Vazão: unidades e medidores | C4 |
| 13 | Temperatura: dilatação e termopar | C4 |
| 14 | Temperatura: termorresistência (PT100) | C4 |

**Fora do escopo:** Aula 15 (é a avaliação integradora, não recebe atividade de 50 questões);
atividades práticas discursivas (suspensas pelo professor em 2026-10-02).

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Escrever `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-07..14-50-QUESTOES.md` (400 questões A–D, com contexto industrial, capacidade da aula e gabarito; fora do Git por `*QUESTOES.md`), no mesmo formato das aulas 01–06 | ✅ Concluído |
| 2 | Gerar as 8 páginas `ATIVIDADES/ATIVIDADES-AULA-07..14-50-QUESTOES.html` com `assets/gerador-atividades/gerar_atividades.py` (folha de respostas no banco, sem gabarito embutido) | ✅ Concluído |
| 3 | Regerar o índice `ATIVIDADES/index.html` (`assets/gerador-indices/gerar_indices.py`) | ✅ Concluído |
| 4 | Acrescentar as 8 atividades em `ATIVIDADES` de `scripts/gerar-seed-atividades.py` e gerar `database/2026-10-03-automacao-instrumentacao-aulas-07-14-seed-atividades.sql` (fora do Git) | ✅ Concluído |
| 5 | Aplicar o seed no Supabase **só se o professor pedir** (senão ele roda no SQL Editor); até lá a marcação fica bloqueada | ✅ Concluído |
| 6 | Conferir: 50 itens por página, gabarito ausente do HTML, `git diff --cached --name-only` sem fontes/seed | ✅ Concluído |
| 7 | Commit local (HTML, índice, script do seed, este doc) + graphify | ✅ Concluído |

**Verificação:** contagem de itens no HTML gerado, busca por "Gabarito" no HTML, `node`/Python sem erro.
Sem navegador, sem testes automatizados.

**Riscos:** volume (400 questões) — escrever e gerar aula por aula; vazamento de gabarito —
conferir o staged contra o `.gitignore`; atividade sem cadastro no banco fica bloqueada.

## Resultado

- Regra nova (pedido do usuário durante a tarefa): gerar e gravar **uma aula por vez, completa**,
  com controle em `AULAS/STATUS-AULAS.md` — registrada no `CLAUDE.md` da raiz; aulas 10 a 14
  fechadas uma a uma (fonte → HTML → conferência → índice → seed).
- 8 páginas `ATIVIDADES-AULA-07..14-50-QUESTOES.html` (50 itens, 200 alternativas, sem gabarito,
  `data-login="sim"`); gabarito com letras equilibradas (12–13 de cada) e posição sorteada.
- Índice da matéria e contagem do curso atualizados; o gerador de índices também regravou o
  `index.html` da raiz (que hoje carrega cursos do banco) e outros cursos — revertido, fora do escopo.
- Banco: atividades 50–57 (aulas 07–14) com 50 itens de gabarito cada, conferidas por hash.
- Pendências observadas: `scripts/gerar-seed-atividades.py` completo falha numa fonte ausente de
  Introdução à TIC (aula 03) — usado só o grupo de Automação; a situação-problema da `AULA-11.md`
  ("xarope com transmissor configurado para água mostrava 80%") contraria a física (líquido mais
  denso indicaria nível **maior**) — avisado ao usuário, aula não alterada.
