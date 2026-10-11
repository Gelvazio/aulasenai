# 🧱 Regras do projeto — REGRA GLOBAL DE MATÉRIAS (como toda matéria é feita)

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (seção "🧱 REGRA
> GLOBAL DE MATÉRIAS"). Registrada em 2026-10-10 22:19:46 a pedido do usuário: **tudo o que define como a
> matéria Introdução à TIC (ITIC) é feita virou esta regra única**. Para criar, completar ou conferir
> **qualquer** matéria, **consultar este arquivo** — não é mais preciso abrir a ITIC como modelo. Ao
> alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

---

## 0. Como usar

- ✅ **Esta regra substitui a consulta à "matéria modelo"**: toda peça de matéria (pastas, nomes de
  arquivo, campos, geradores, status e fluxo) segue o que está aqui. A ITIC
  (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/`) continua existindo como **exemplo
  real** desta regra, não como fonte da regra.
- ✅ **Precedência:** `CLAUDE.md` → **este arquivo** → regras do assunto em `docs/regras/`
  (`ementas-e-cursos.md`, `atividades.md`, `apostilas.md`, `assets-e-geradores.md`, `codigo.md`) e
  `docs/REGRAS-ATIVIDADE-PRATICA.md`. Aqui fica **o que** a matéria tem e **em que ordem** se faz;
  o detalhe de cada peça fica no arquivo do assunto citado em cada seção.
- ⚠️ Se a ITIC (ou outra matéria pronta) divergir desta regra, **vale esta regra**: avisar o usuário
  e só alterar a matéria pronta a pedido dele.
- ✅ O **conteúdo** de cada matéria vem sempre da ementa **dela** (`EMENTA-CHALKIE-AI.md`, que segue
  a UC da `EMENTA-PRINCIPAL-<CURSO>.md`); nunca copiar conteúdo de outra UC.
- ✅ Vale para **todas** as matérias de todos os cursos de `MATERIAIS/` (menos as pastas que não são
  curso: `MATERIAS-GERAIS/` e `AGENDA_COLABORADOR/`). Matéria em `IGNORAR` não recebe conteúdo
  novo, mas **sempre** tem os 5 arquivos de status (seção 9).

## 1. Estrutura da pasta da matéria

```text
MATERIAIS/<CURSO>/<MATERIA>/
├── EMENTA-CHALKIE-AI.md          ← ementa da matéria (fonte do conteúdo)
├── materia.json                  ← dados da matéria copiados da ementa (todos os geradores leem)
├── STATUS-EMENTAS.md             ← situação da ementa (gerado)
├── STATUS_MATERIA.md             ← status de todos os arquivos e situação da matéria (gerado)
├── CONTEUDO/
│   └── AULA-NN-DESCRICAO-CURTA.md    ← uma aula por arquivo (1 a cada 4 h da ementa)
├── AULAS/
│   ├── STATUS-AULAS.md           ← uma linha por aula
│   └── AULA-NN-SLIDES.pdf        ← slides (só apresentação, publicados pelo professor)
├── DOCUMENTACAO/
│   └── PLANO-AULAS.md            ← plano das aulas (número, tema, horas, conhecimentos, capacidades, link)
├── ATIVIDADES/
│   ├── CONTEUDO/                 ← fontes .md (fora do site as que têm resposta certa)
│   │   ├── ATIVIDADES-AULA-NN-50-QUESTOES.md
│   │   ├── ATIVIDADE-PRATICA-AULA-NN.md + ATIVIDADE-PRATICA-AULA-NN-GABARITO.md
│   │   ├── AVALIACAO-OBJETIVA-NN-QUESTOES.md
│   │   └── AVALIACAO-PRATICA.md + AVALIACAO-PRATICA-GABARITO.md
│   ├── ATIVIDADES-AULA-NN-50-QUESTOES.html
│   ├── ATIVIDADE-PRATICA-AULA-NN.html
│   ├── AVALIACAO-OBJETIVA-NN.html, AVALIACAO-PRATICA.html
│   ├── AVALIACAO-MEDIA-FINAL.html + media-final.json
│   ├── MENU-ATIVIDADES.js        ← dados do menu das atividades (lido por js/menu.js)
│   ├── index.html                ← índice das atividades (gerado)
│   └── STATUS-ATIVIDADES.md
└── APOSTILA/
    ├── CONTEUDO/INTRODUCAO.md, CONTEUDO/CAPITULO-NN.md   ← um capítulo por aula
    ├── APOSTILA-<MATERIA>.md     ← Markdown completo (fonte final do HTML)
    ├── APOSTILA-<MATERIA>.html   ← apostila gerada
    └── STATUS-APOSTILA.md
```

- ✅ Nomes de pasta e arquivo em **MAIÚSCULAS, sem acento**, com hífen; `NN` = número da aula com
  dois dígitos (`01`, `02`… `20`).
- ✅ Outros arquivos da pasta (planos antigos, materiais de apoio, listas) podem existir; aparecem no
  `STATUS_MATERIA.md` como "📎 outro arquivo" e não contam para a situação da matéria.
- ⛔ Dados pessoais de aluno (listas de presença, CPF, senhas) nunca ficam na pasta da matéria
  publicada sem o padrão do `.vercelignore` (regra "O QUE NUNCA É PUBLICADO" do `CLAUDE.md`).

## 2. Ementa e `materia.json`

- ✅ **`EMENTA-CHALKIE-AI.md`** na raiz da matéria, de **14.800 a 14.950 caracteres**, conferida com a
  UC da `EMENTA-PRINCIPAL-<CURSO>.md` (a ementa do curso vence). Regras completas:
  [`ementas-e-cursos.md`](ementas-e-cursos.md).
- ✅ **`materia.json`**: arquivo único de dados da matéria, copiado da ementa — `uc`, `uc_curta`,
  `curso`, `docente`, `autor_apostila`, `versao_apostila`, `modulo`, `modalidade`,
  `carga_horaria_uc`, `capacidades` (C1…), `capacidades_socioemocionais` (S1…), `conhecimentos`,
  `horas_por_aula`, **`aulas`** (uma entrada por aula: número, tema, carga horária, capacidades,
  conteúdos oficiais, indicadores, prática, slides), `indicadores_desempenho`, `avaliacao`
  (instrumentos e pesos), `situacoes_aprendizagem`, `glossario_ementa`, `referencias`. Formato:
  [`apostilas.md`](apostilas.md), seção "`materia.json`".
- ✅ Capacidades das questões sempre com os códigos do `materia.json` (o gerador recusa código que
  não existe no campo `capacidades`).
- ⛔ Conteúdo só pelos Markdowns (ementa, `materia.json`, `CONTEUDO/`); **nunca de PDF**.

## 3. Aulas em `CONTEUDO/`

- ✅ **Quantidade:** **1 aula a cada 4 h** da carga horária da ementa, arredondando para cima (ex.:
  40 h = 10 aulas; 33 h = 8 aulas de 4 h + 1 de 1 h). Exceções: seção 13.
- ✅ **Arquivo:** `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` (descrição curta do tema, maiúsculas, sem
  acento, com hífen).
- ✅ **Partes da aula, nesta ordem:**
  1. Título `# Aula NN — Tema` e cabeçalho: matéria · curso, carga horária, conhecimentos da ementa
     (com a numeração oficial), capacidades (código + texto), estratégias e link da prática;
  2. **Indicadores** (número e texto, da ementa);
  3. **Objetivos**;
  4. **Roteiro da aula** (tabela momento × tempo × o que acontece, somando o tempo da aula: 240 min
     em 4 h, com intervalo);
  5. **Conteúdo** (seções numeradas, com exemplos, tabelas e código quando a matéria pede);
  6. **Exemplo no contexto do curso**;
  7. **Dinâmica** (objetivo, materiais, passo a passo, fechamento);
  8. **Situação-problema e entrega da aula** (a SA da ementa);
  9. **Verificação da aprendizagem**;
  10. **Recursos** (da ementa) e link dos slides `../AULAS/AULA-NN-SLIDES.pdf`.
- ✅ **`DOCUMENTACAO/PLANO-AULAS.md`**: tabela com todas as aulas (número, tema, horas,
  conhecimentos, capacidades e link para a aula em `CONTEUDO/` quando pronta).
- ✅ Slides em `AULAS/` são **só apresentação** (o professor publica); nunca fonte de conteúdo.
- Regra completa: [`ementas-e-cursos.md`](ementas-e-cursos.md), seção "AULAS DA MATÉRIA".

## 4. Atividade objetiva de cada aula (50 questões)

- ✅ **Uma por aula:** fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` → página
  `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html`, **exatamente 50 questões** A–D, lidas da aula em
  `CONTEUDO/`.
- ✅ **Cabeçalho da fonte:** Aula, Tema, Ícone, Duração (90–120 min), Formato, Total (50),
  Pontuação, Capacidade avaliada, Conteúdo-base (`../CONTEUDO/AULA-NN-*.md`), Slides, Folha de
  respostas `sim`.
- ✅ **Cada item:** `## ITEM NN — Título`, `- **Capacidade:** Cn`, `**Comando:**`, 4 alternativas e
  `**Gabarito:** X`. Gabarito **equilibrado** (13 A, 13 B, 12 C, 12 D) com posição sorteada;
  alternativas erradas plausíveis e de tamanho parecido com a certa.
- ✅ **Gerar:** `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES>
  --so=ATIVIDADES-AULA-NN-50-QUESTOES.md`. ⛔ O HTML nunca leva o gabarito.
- Regras completas: [`atividades.md`](atividades.md) (banco, tentativas, horário, gabarito, 50
  questões).

## 5. Atividade prática de cada aula (discursiva, padrão da prova id 82)

- ✅ **Uma por aula:** `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md` (padrão de
  resposta, no Git e fora do site) → `ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.html`.
- ✅ **10 questões × 3 tópicos** (0,2 + 0,4 + 0,4) = 10 pontos; contexto "Você, como aluno
  consultor..."; campos `Bloquear colar`, `Campo do tamanho da resposta`, `Botão gravar`,
  `Progresso para o professor` e `Ocultar respostas após entrega` = `sim`; `Aula no banco` = NN.
- ✅ **Gerar:** `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta
  ATIVIDADES> ATIVIDADE-PRATICA-AULA-NN.md` (gera a página e o seed dos tópicos; conferir "10
  questões, 30 tópicos, 10 pontos" e "0 sem padrão").
- Regra completa: [`../REGRAS-ATIVIDADE-PRATICA.md`](../REGRAS-ATIVIDADE-PRATICA.md).

## 6. Avaliações e média final

- ✅ **Instrumentos e pesos vêm da ementa** (Seção de avaliação; `avaliacao` no `materia.json`).
  Sem definição na ementa, usar o padrão: atividades das aulas 30% · Avaliação Objetiva 01 20% ·
  Avaliação Objetiva 02 20% · Avaliação Prática 30%; aprovação com **70 pontos** (nota 7).
- ✅ **Avaliações objetivas:** `ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-NN-QUESTOES.md` →
  `ATIVIDADES/AVALIACAO-OBJETIVA-NN.html` (mesmo gerador da seção 4; `Aula: AV-NN`, `Rótulo da aula:
  Avaliação Objetiva NN`, `Tema: Aulas X a Y`, questões novas com capacidade → contexto → comando,
  cobrindo as aulas do período por igual).
- ✅ **Avaliação prática:** `ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA.md` + `-GABARITO.md` →
  `ATIVIDADES/AVALIACAO-PRATICA.html` (discursiva de várias aulas: **20 questões × 3 tópicos**,
  0,1 + 0,2 + 0,2; mesmo gerador da seção 5).
- ✅ **Média final:** `ATIVIDADES/media-final.json` (grupos, itens, pontos, pesos, páginas e regras)
  → `ATIVIDADES/AVALIACAO-MEDIA-FINAL.html` com
  `python assets/gerador-avaliacao-media-final/gerar_avaliacao_media_final.py <pasta ATIVIDADES>`
  (`--propor` cria uma proposta de `media-final.json`).
- ✅ Discursivas: mínimo de questões por aluno, nota proporcional (máximo 10), Finalizar Atividade,
  prova corrigida para o aluno e nota confirmada definitiva — regras no `CLAUDE.md` e em
  [`atividades.md`](atividades.md).

## 7. Índice e menu das atividades

- ✅ **`ATIVIDADES/index.html`** gerado por `python assets/gerador-indices/gerar_indices.py`
  (`--forcar <pasta ATIVIDADES>` para regerar um índice antigo): só HTML, em ordem de data, um card
  por aula, faixa de matérias (SOMENTE ENSALADO), ON/OFF de cada atividade, ID na frente da
  atividade, slides em nova aba. Regras: [`atividades.md`](atividades.md), seção "ÍNDICES DE
  ATIVIDADES", e as regras globais do `CLAUDE.md` (ON/OFF, bloqueio da aula, ID, LOG).
- ✅ **`ATIVIDADES/MENU-ATIVIDADES.js`**: `window.MENU_ATIVIDADES = { titulo, itens }`; desde
  2026-10-08 o menu tem só o item **👥 Equipes** (com os papéis da equipe).
- ✅ Toda página nasce com o guarda de sessão (`assets/gerador-menu/tags_header.py`) e o card da
  matéria no `index.html` do curso é atualizado junto.

## 8. Apostila

- ✅ `APOSTILA/CONTEUDO/INTRODUCAO.md` + `CAPITULO-NN.md` (um por aula) → Markdown completo
  `APOSTILA-<MATERIA>.md` → `APOSTILA-<MATERIA>.html` com
  `python assets/gerador-apostilas/gerar_apostila.py <pasta da matéria>`.
- ✅ Só depois das aulas prontas; **conferência 100% com a ementa** antes de gerar; sem gabarito;
  identificação (autor, versão, data e hora); páginas A4. Regras completas:
  [`apostilas.md`](apostilas.md).

## 9. Arquivos de status (os 5 existem SEMPRE)

| Arquivo | Guarda |
|---|---|
| `AULAS/STATUS-AULAS.md` | Uma linha por aula: aula em `CONTEUDO/`, slides, objetiva, prática, **Banco** |
| `ATIVIDADES/STATUS-ATIVIDADES.md` | Uma linha por atividade (objetiva e prática de cada aula, avaliações): página, questões, fonte, banco, status |
| `APOSTILA/STATUS-APOSTILA.md` | Capítulos, conferência com a ementa, HTML e PDF |
| `STATUS-EMENTAS.md` | Situação e tamanho da ementa, carga horária, permissão `VERIFICAR`/`IGNORAR` |
| `STATUS_MATERIA.md` | Status de **todos** os arquivos e a situação da matéria (⬜ NÃO INICIADA · 🔄 PENDENTE · ✅ CONCLUÍDA) |

- ✅ Criados e conferidos por `python3 scripts/status-materias/gerar_status_materia.py` (cria os que
  faltam e gera o `STATUS_MATERIA.md` e o `tasks/ORDEM-MATERIAS.md`); regra completa no `CLAUDE.md`
  ("🔢 REGRA — STATUS_MATERIA E ORDEM DAS MATÉRIAS").
- ✅ Status gravado **na hora**, a cada aula terminada, nos arquivos da matéria **e** no item da etapa
  em `tasks/etapas/` (o `tasks/STATUS.md` é a fonte única do estado).

## 10. Banco de dados (aulas, atividades e seeds)

- ✅ Hierarquia: `curso ← materia ← aulas ← atividade` (+ `gabarito` das objetivas e
  `topico_discursivo` das discursivas). Matéria semelhante em outro curso é **outra linha** de
  `materia`.
- ✅ Objetivas: seed por `scripts/gerar-seed-atividades.py` (a lista da matéria fica no próprio
  script); práticas e avaliações discursivas: seed do gerador discursivo.
- ✅ Todo seed entra em `database/SEEDS-APLICADOS.md` como **PENDENTE**, é aplicado em partes pelos
  scripts de `scripts/seeds/` e conferido pelo **md5** antes de virar **CONCLUÍDO**; a coluna Banco
  do `STATUS-AULAS.md` e do `STATUS_MATERIA.md` acompanha. Regra completa: "🌱 REGRA — SEEDS DO
  BANCO" do `CLAUDE.md`.

## 11. Ordem de construção de uma matéria

1. Ementa (`EMENTA-CHALKIE-AI.md`) conferida com a ementa do curso e `materia.json` copiado dela.
2. Os **5 arquivos de status** criados (todas as aulas em ⬜) e `DOCUMENTACAO/PLANO-AULAS.md`.
3. **Uma aula por vez, completa:** aula em `CONTEUDO/` → objetiva de 50 questões → prática 10 × 3 →
   seeds aplicados e conferidos → status gravado → commit (na nuvem, push) → só então a próxima.
4. **Avaliações** objetivas e prática e **média final** (seção 6).
5. **Índice e menu** das atividades e card do curso (seção 7).
6. **Apostila** (seção 8).
7. `python scripts/analise-materias.py` e `gerar_status_materia.py`; registrar os números no
   `tasks/STATUS.md`.
8. **Aceite do usuário.**

## 12. Critério de pronto

- ✅ A matéria está pronta quando o `STATUS_MATERIA.md` mostra **✅ CONCLUÍDA** (todas as peças), o
  `tasks/ANALISE-MATERIAS-RELATORIO.json` não tem pendência dela, todos os seeds dela estão
  **CONCLUÍDO** no registro **e** o usuário deu o aceite.

## 13. Exceções conhecidas

- **Reforço de Linguagens:** 10 aulas (uma por slide) e atividades de 25 questões (20 objetivas + 5
  discursivas) — regra exclusiva em [`atividades.md`](atividades.md).
- **`QUALIFICACAO-PROFISSIONAL/`:** a ementa é só do professor; a IA só lê
  ([`ementas-e-cursos.md`](ementas-e-cursos.md)).
- **Matéria em `IGNORAR`:** sem conteúdo novo, ajustes nem pendências; os 5 status existem sempre.
- **Ementa com aulas de outra duração** (ex.: "4 aulas × 8 h"): a contagem continua sendo 1 aula a
  cada 4 h; o encontro maior vira duas aulas seguidas (registrar no `STATUS-AULAS.md`).
