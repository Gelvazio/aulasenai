# Reforço de Linguagens — 10 aulas (uma por slide) e atividades das aulas 02 a 10

**Objetivo:** reorganizar a matéria Reforço de Linguagens em **10 aulas** (uma para cada
apresentação de `AULAS-CHALKIE-AI/`, somando as 63 h da UC) e criar as atividades
(20 objetivas + 5 discursivas) das **aulas 02 a 10**. A Aula 01 já tem as atividades e não muda.

**Pedido do usuário:** 2026-10-06 — "deve ter somente as 10 aulas"; escolheu "10 aulas, exceção da
matéria"; "na pasta ATIVIDADES, crie atividades apenas a partir da aula 02, pois a aula 01 já tem".

**Tech Stack:** Markdown, JSON (`materia.json`), Python (`gerar_atividades.py`,
`gerar_avaliacao_discursiva.py`, `gerar-seed-atividades.py`, `gerar_indices.py`), SQL (seeds no Supabase).

**Criado em:** 2026-10-06 10:16
**Concluído em:** —
**Tempo decorrido:** —

**Pasta da matéria:** `MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/` (abaixo, `RL/`).

---

## Fontes (ordem de precedência)

1. `EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md` — UC 7, 63 h (fonte da verdade, não muda).
2. `RL/EMENTA-CHALKIE-AI.md` — será ajustada para 10 aulas (seção VI).
3. `RL/AULAS-CHALKIE-AI/CONTEUDO/AULA-NN-*.md` — slides convertidos em Markdown: base das aulas e
   **fonte única do conteúdo das atividades** (regra registrada no `CLAUDE.md` em 2026-10-06 10:17,
   a pedido do usuário). PDFs não são lidos.

## Novas 10 aulas (proposta de carga: 7 × 6 h + 3 × 7 h = 63 h)

| Aula | Tema (igual ao slide) | Horas | Aulas antigas que absorve | Slides (PDF) |
|---|---|---|---|---|
| 01 | Tipos de Texto e Contexto de Produção | 6 | 01 | `1-Tipos-de-Texto-e-Contexto-de-Produção.pdf` |
| 02 | Tema, Assunto e Ideia Principal | 6 | 02 | `2-Tema,-Assunto-e-Ideia-Principal.pdf` |
| 03 | Intenção Comunicativa e Análise Crítica | 6 | 03 | `3-Intenção-Comunicativa-e-Análise-Crítica.pdf` |
| 04 | Coesão e Coerência Textual | 6 | 04 | `4-Coesão-e-Coerência-Textual.pdf` |
| 05 | Tipologias Textuais na Prática | 6 | 05, 06, 07 | `5-Tipologias-Textuais-na-Prática.pdf` |
| 06 | Pontuação e Concordância na Escrita | 6 | 08 | `6-Pontuação-e-Concordância-na-Escrita.pdf` |
| 07 | Classes de Palavras e Figuras de Linguagem | 6 | 09, 10 | `7-Classes-de-Palavras-e-Figuras-de-Linguagem.pdf` |
| 08 | Oralidade e Apresentação em Público | 7 | 11 | `8-Oralidade-e-Apresentação-em-Público.pdf` |
| 09 | Argumentação Oral, Debates e Registros | 7 | 12, 15 (revisão/feedback) | `9-Argumentação-Oral,-Debates-e-Registros.pdf` |
| 10 | Gêneros Literários, Textos Técnicos e Síntese | 7 | 13, 14, 16 (síntese/portfólio) | `10-Gêneros-Literários,-Textos-Técnicos-e-Síntese.pdf` |

## Decisões que preciso do usuário (antes de executar)

| # | Pergunta | Proposta |
|---|---|---|
| D1 | Carga das aulas | 01–07 com 6 h e 08–10 com 7 h (total 63 h) |
| D2 | Onde ficam as 10 aulas | `RL/CONTEUDO/AULA-NN-DESCRICAO.md` (padrão do CLAUDE.md, como na ITIC) |
| D3 | As 16 aulas antigas (`RL/AULAS/AULA-01.md` a `AULA-16.md` e `AULA-01.html`) | **Mover** (não apagar) para `RL/AULAS/LEGADO-16-AULAS/` |
| D4 | Links dos slides | Os PDFs estão no `.gitignore` (`*.pdf`): o link funciona no computador, mas **não** na Vercel. Proposta: liberar `MATERIAIS/**/AULAS-CHALKIE-AI/*.pdf` no `.gitignore` (como já acontece com os slides de `ATIVIDADES/`) |
| D5 | Aula 01 | Mantém as atividades atuais (feitas sobre "Leitura e Compreensão Textual Básica", que entra na nova Aula 01). Só a fonte `Conteúdo-base` passa a apontar para a nova aula |
| D6 | Seeds no Supabase | Aplicar o seed (objetivas, depois discursivas) **ao terminar cada aula**, como foi feito na Aula 01 |
| D7 | Tamanho da ementa | A `EMENTA-CHALKIE-AI.md` já está com 16.006 caracteres (fora do intervalo 14.800–14.950). Ajustar o tamanho junto com a seção VI |

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Aprovação do plano e das decisões D1–D7 | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 2 | Regra exclusiva no `CLAUDE.md` (10 aulas) + versão/histórico + visualizador | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 3 | `EMENTA-CHALKIE-AI.md` (seção VI com 10 aulas, tamanho) + `STATUS-EMENTAS.md` + `STATUS-EMENTAS-CURSOS.md` | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 4 | `materia.json` com `aulas` (10) e cargas | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 5 | Mover as 16 aulas antigas para `AULAS/LEGADO-16-AULAS/` | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 6 | Criar as 10 aulas em `RL/CONTEUDO/` (uma por vez), com link dos slides | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 7 | `.gitignore` liberando os PDFs dos slides (se D4 aprovada) | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 8 | `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` com 10 aulas | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:28 | — |
| 9 | Aula 01: `Conteúdo-base` das fontes aponta para `AULAS-CHALKIE-AI/CONTEUDO/AULA-01-*.md` (sem mudar questões) | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:22 | — |
| 10 | Atividades da Aula 02 (20 objetivas + 5 discursivas) | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:28 | — |
| 11 | Atividades da Aula 03 | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:31 | — |
| 12 | Atividades da Aula 04 | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:33 | — |
| 13 | Atividades da Aula 05 | ✅ Concluído |2026-10-06 10:16| 2026-10-06 10:35 | — |
| 14 | Atividades da Aula 06 | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 15 | Atividades da Aula 07 | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 16 | Atividades da Aula 08 | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 17 | Atividades da Aula 09 | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 18 | Atividades da Aula 10 | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 19 | Índice da matéria (só o `RL/ATIVIDADES/index.html`) | ⬜ Pendente | 2026-10-06 10:16 | — | — |
| 20 | Aceite do usuário | ⬜ Pendente | 2026-10-06 10:16 | — | — |

---

### Passo 2: Regra exclusiva no `CLAUDE.md`

**Arquivos:** `CLAUDE.md`; `assets/js/regras-modal.js` só se quebrar.
- Na regra "REFORÇO DE LINGUAGENS", acrescentar: a matéria tem **10 aulas** (uma por slide de
  `AULAS-CHALKIE-AI/`), cargas de 6 h/7 h somando 63 h — **exceção** à regra "1 aula a cada 4 h";
  aulas em `RL/CONTEUDO/AULA-NN-*.md`; as discursivas citam essas aulas.
- Atualizar `**Versão das regras:**` e o histórico (linha nova no início).
- **Verificação:** a linha de versão segue o formato `AAAA-MM-DD HH:MM`; `grep` da seção.

### Passo 3: Ementa da matéria e status das ementas

**Arquivos:** `RL/EMENTA-CHALKIE-AI.md`, `RL/STATUS-EMENTAS.md`, `MATERIAIS/STATUS-EMENTAS-CURSOS.md`.
- Seção VI: trocar as 16 aulas de 4 h pelas 10 aulas da tabela acima (tema, horas, foco, prática),
  com a última aula fechando a UC (síntese + avaliação final, nota mínima 7 e 75% de frequência).
- Ajustar o tamanho para 14.800–14.950 caracteres (D7), sem tirar conteúdo da ementa do curso.
- Atualizar os dois status com o novo tamanho (scripts `criar-status-ementas.py` /
  `criar-status-cursos.py`, que preservam as marcações).
- **Verificação:** `wc -c`; capacidades e conhecimentos iguais aos da UC 7 do curso.

### Passo 4: `materia.json`

- `horas_por_aula` → removido/ajustado; novo campo `aulas` (10 itens: `numero`, `aula`, `tema`,
  `carga_horaria`, `capacidades`, `conhecimentos`, `slides`).
- **Verificação:** `python -c "json.load(...)"`; soma das cargas = 63.

### Passo 5: Aulas antigas

- `git mv RL/AULAS/AULA-*.md RL/AULAS/AULA-01.html RL/AULAS/LEGADO-16-AULAS/` (nada é apagado).
- **Verificação:** `ls RL/AULAS/LEGADO-16-AULAS` com 17 arquivos.

### Passo 6: As 10 aulas em `RL/CONTEUDO/` (uma por vez)

- Arquivo `AULA-NN-DESCRICAO-CURTA.md` com: módulo, tema, carga, conhecimentos, capacidades
  (C1–C6), objetivos, roteiro com tempos, conteúdo em seções (a partir dos slides em Markdown),
  exemplos com empresa fictícia de Rio do Sul, **pelo menos 1 dinâmica**, verificação da
  aprendizagem, recursos e o link **📕 Slides (PDF)** →
  `../AULAS-CHALKIE-AI/<arquivo>.pdf`.
- **Verificação:** soma das horas = 63; link aponta para arquivo existente.

### Passos 10 a 18: Atividades de cada aula (02 a 10), uma aula por vez e completa

Para cada aula NN:
1. `RL/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-20-QUESTOES.md` — 20 objetivas A–D, com
   `- **Capacidade:**`, Contexto, Comando, Alternativas, Gabarito (letras equilibradas: 5 de cada,
   posição sorteada), `- **Folha de respostas:** sim`, `Conteúdo-base: ../AULAS-CHALKIE-AI/CONTEUDO/AULA-NN-*.md` e `Slides: ../AULAS-CHALKIE-AI/<N>-....pdf` (o link aparece nas instruções da página)
   (**regra do CLAUDE.md, 2026-10-06 10:17: o conteúdo das atividades vem SEMPRE desse arquivo**).
   (Fora do Git — tem gabarito.)
2. `gerar_atividades.py RL/ATIVIDADES --so=ATIVIDADES-AULA-NN-20-QUESTOES.md` → página HTML.
3. `RL/ATIVIDADES/CONTEUDO/ATIVIDADE-DISCURSIVA-AULA-NN.md` (5 itens com Contexto, Comando e
   tópico `- a) ... (1,0)`) + `-GABARITO.md` (padrão de resposta e critérios para a IA, fora do Git).
4. `gerar_avaliacao_discursiva.py RL/ATIVIDADES ATIVIDADE-DISCURSIVA-AULA-NN.md` → página HTML
   (nasce bloqueada) + seed.
5. Linha da aula em `ATIVIDADES_REFORCO_LINGUAGENS` (`scripts/gerar-seed-atividades.py`) e seed
   das objetivas.
6. Se D6 aprovada: aplicar no Supabase (objetivas → discursivas) e conferir com consultas de
   leitura (20 no gabarito; 5 tópicos).
7. Atualizar `STATUS-ATIVIDADES.md` e `STATUS-AULAS.md`; commit da aula.
- **Verificação:** 20 itens na página objetiva e 5 na discursiva; `grep` sem "Gabarito" nas
  páginas HTML; `git diff --cached --name-only` sem gabarito/seed.

### Passo 19: Índice

- Rodar o gerador **só para a pasta da matéria** (`gerar_indices.py` com `--forcar RL/ATIVIDADES`
  ou ajuste equivalente), sem regravar o `index.html` da raiz nem criar índices em
  `AGENDA_COLABORADOR/` (problema visto hoje ao rodar o gerador inteiro).
- **Verificação:** `git diff --name-only` mostra só o índice da matéria (e o do curso, se mudar).

---

## Riscos

| Risco | Plano B |
|---|---|
| Slides convertidos com ordem de texto imperfeita em alguns slides | As aulas são reescritas a partir deles (não copiadas literalmente); conferir com o usuário |
| Aula 01 com atividade feita sobre o tema antigo | D5: mantém (o tema antigo está dentro da nova Aula 01) |
| Links de PDF quebrados na Vercel | D4: liberar os PDFs no `.gitignore` |
| Gerador de índices regrava arquivos de outras matérias | Rodar só para a pasta da matéria e conferir o diff antes do commit |
| Outra sessão alterando `STATUS.md` ao mesmo tempo | Acrescentar a etapa só no fim do arquivo e commitar só as linhas desta tarefa |

## Resultado final

—
