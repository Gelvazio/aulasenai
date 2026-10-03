# Banco de questões do AVA SENAI (Moodle XML) — piloto Introdução à TIC

**Objetivo:** gerar, a partir das fontes `.md` de questões objetivas, arquivos **Moodle XML** para
importar no **Banco de questões do AVA SENAI** (Moodle), começando por Introdução à TIC (ITIC).

**Tech Stack:** Python 3.14 (`C:\Python314\python.exe`), biblioteca padrão (`xml.sax.saxutils`,
`pathlib`, `json`), reaproveitando `ler_questoes()` de `assets/gerador-atividades/gerar_atividades.py`.

**Criado em:** 2026-10-03 15:16
**Concluído em:** 2026-10-03 15:39
**Tempo decorrido:** 23:00 (desde a aprovação, 15:16 → 15:39)

**Decisões do usuário (2026-10-03):**

| Pergunta | Resposta |
|----------|----------|
| Formato | **Moodle XML (.xml)** |
| Matérias | **Só Introdução à TIC** (piloto) |
| Entrega | **Só arquivo local** (fora do Git — contém as respostas certas) |
| Organização | **Os dois:** 1 arquivo por atividade **e** 1 arquivo único da matéria |

---

## Escopo

- ✅ Fontes: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/*QUESTOES.md`
  — **13 arquivos, 600 questões** de múltipla escolha (A–D):

  | Fonte | Questões | Categoria no AVA |
  |-------|----------|------------------|
  | `ATIVIDADES-AULA-01-50-QUESTOES.md` | 50 | Aula 01 — Comunicação Profissional e Seus Fundamentos |
  | `ATIVIDADES-AULA-02-50-QUESTOES.md` | 50 | Aula 02 — Hardware, Periféricos e Sistemas Operacionais |
  | `ATIVIDADES-AULA-03-25-QUESTOES.md` | 25 | Aula 03 — Navegação na Web e Pesquisa Acadêmica |
  | `ATIVIDADES-AULA-04-50-QUESTOES.md` | 50 | Aula 04 — Comunicação Digital e Colaboração em Nuvem |
  | `ATIVIDADES-AULA-05-50-QUESTOES.md` | 50 | Aula 05 — Segurança da Informação e Proteção de Dados |
  | `ATIVIDADES-AULA-06-50-QUESTOES.md` | 50 | Aula 06 — Editor de Textos: Formatação e Estruturação |
  | `ATIVIDADES-AULA-07-50-QUESTOES.md` | 50 | Aula 07 — Textos Técnicos e Redação Empresarial |
  | `ATIVIDADES-AULA-08-50-QUESTOES.md` | 50 | Aula 08 — Editor de Planilhas: Organização e Fórmulas |
  | `ATIVIDADES-AULA-09-50-QUESTOES.md` | 50 | Aula 09 — Planilhas Eletrônicas: Análise Visual e Gráficos |
  | `ATIVIDADES-AULA-10-50-QUESTOES.md` | 50 | Aula 10 — Editor de Apresentações e TIC |
  | `ATIVIDADES-AULA-28-09-2026-25-QUESTOES.md` | 25 | Aula 28-09-2026 — O Ciclo do Feedback na Comunicação |
  | `AVALIACAO-OBJETIVA-01-QUESTOES.md` | 50 | Avaliação Objetiva 01 — Aulas 01 a 05 |
  | `AVALIACAO-OBJETIVA-02-QUESTOES.md` | 50 | Avaliação Objetiva 02 — Aulas 06 a 10 |

- ❌ Fora do escopo: atividades práticas e avaliação prática/discursiva (não são múltipla escolha),
  outras matérias (só depois do piloto validado no AVA), botão de download nas páginas, banco de
  dados (nada muda no Supabase).

## Saída (pasta `ATIVIDADES/BANCO-AVA/`, fora do Git)

```text
INTRODUCAO-TIC/ATIVIDADES/BANCO-AVA/
├─ ATIVIDADES-AULA-01-50-QUESTOES.xml      ← 1 arquivo por atividade (13 arquivos)
├─ ...
├─ AVALIACAO-OBJETIVA-02-QUESTOES.xml
└─ BANCO-AVA-INTRODUCAO-TIC.xml            ← arquivo único da matéria (600 questões, 13 categorias)
```

## Como cada questão vira Moodle XML

- **Categoria:** `top/<uc_curta>/<rótulo> — <tema>` (ex.:
  `top/Introdução à TIC/Aula 01 — Comunicação Profissional e Seus Fundamentos`). Sem o contexto
  `$course$` no caminho: o AVA cria as categorias no banco escolhido na importação (funciona
  também nas versões do Moodle em que o banco fica numa atividade, e não no curso). O
  arquivo por atividade e o arquivo único usam **as mesmas categorias**, então tanto faz qual for
  importado. Na importação, deixar marcado **"Obter categoria do arquivo"**.
- **Tipo:** `multichoice`, resposta única (`<single>true</single>`), numeração `ABCD`,
  1 ponto (`defaultgrade 1`), penalidade 0 e nenhuma resposta errada com nota negativa.
- **Nome:** `ITEM NN — Título` (ex.: `ITEM 01 — Os Elementos da Comunicação`).
- **ID number:** `<PASTA-DA-MATERIA>-<rótulo>-QNN` (ex.: `INTRODUCAO-TIC-AULA-01-Q01`), para
  achar a questão no AVA.
- **Enunciado (HTML):** `<p><strong>Contexto:</strong> ...</p>` (quando houver) +
  `<p>Comando</p>`, com o texto escapado (fórmulas como `=SE(D2<1000;...)` aparecem certas).
- **Alternativas:** a do gabarito com `fraction="100"`, as outras com `fraction="0"`.
- **Embaralhar alternativas:** **sim**, exceto quando alguma alternativa depende da ordem
  ("Todas as anteriores", "Nenhuma das anteriores", "todas as alternativas", "alternativas
  acima"...) — nesse caso **não** embaralha. Em ITIC: só os ITENS 25 e 26 da Aula 02.
  (A 1ª versão usava "anteriores"/"acima" soltos e travava por engano 2 questões — corrigido.)
- **Tags:** as capacidades da questão (`C1`, `C3`...) e o rótulo (`Aula 01`), para filtrar no AVA.
- **Feedback:** "Resposta correta." / "Resposta incorreta." (sem revelar a alternativa certa).

## Riscos e cuidados

| Risco | Cuidado |
|-------|---------|
| Arquivo XML contém o gabarito | Pasta `BANCO-AVA/` no `.gitignore` **antes** de gerar; conferir `git status --ignored` e `git diff --cached --name-only` |
| Importar duas vezes duplica as questões no AVA | Avisar: importar **ou** os arquivos por atividade **ou** o arquivo único |
| Caracteres especiais (`<`, `>`, `&`, aspas, acentos) | Escapar o texto e gravar em UTF-8; validar o XML com `xml.etree` |
| Fonte com erro (questão sem gabarito, nº de itens diferente) | `ler_questoes()` já para com erro claro (reaproveitado) |

## Arquivos previstos

| Ação | Arquivo |
|------|---------|
| Criar | `assets/gerador-banco-ava/moodle_xml.py` (monta o XML de categorias e questões) |
| Criar | `assets/gerador-banco-ava/gerar_banco_ava.py` (linha de comando: lê as fontes e grava os arquivos) |
| Modificar | `.gitignore` (padrão `BANCO-AVA/`) |
| Modificar | `CLAUDE.md` (registrar o gerador em `assets/` e a regra do banco do AVA) |
| Modificar | `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/STATUS-ATIVIDADES.md` (registro do banco gerado) |
| Gerar (fora do Git) | `INTRODUCAO-TIC/ATIVIDADES/BANCO-AVA/*.xml` (14 arquivos) |

**Comando final:**

```powershell
C:\Python314\python.exe assets\gerador-banco-ava\gerar_banco_ava.py MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\ATIVIDADES
```

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Proteger `BANCO-AVA/` no `.gitignore` | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:39 | 23:00 |
| 2 | Criar `moodle_xml.py` (montagem do XML) | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:39 | 23:00 |
| 3 | Criar `gerar_banco_ava.py` (linha de comando) | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:39 | 23:00 |
| 4 | Gerar os 14 arquivos de ITIC | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:39 | 23:00 |
| 5 | Conferir XML (válido, 600 questões, 1 correta por questão, gabarito igual à fonte) | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:39 | 23:00 |
| 6 | Registrar no `CLAUDE.md` e no `STATUS-ATIVIDADES.md` | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:39 | 23:00 |
| 7 | Commit local (sem os `.xml`) + graphify | ✅ Concluído | 2026-10-03 15:16 | 2026-10-03 15:40 | 24:00 |

---

### Passo 1: Proteger `BANCO-AVA/` no `.gitignore`

**Status:** ✅ Concluído

**Arquivo:** Modificar `.gitignore`

**Ação:** acrescentar, junto das regras de gabarito:

```gitignore
# Banco de questões do AVA SENAI (Moodle XML com as respostas certas) — nunca publicar
BANCO-AVA/
```

**Observação:** a linha `BANCO-AVA/` entrou no Git junto com o commit `9608117` (gerador de
apostilas, feito em paralelo), que levou o `.gitignore` inteiro.

**Verificação:**

```powershell
git check-ignore -v MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/BANCO-AVA/teste.xml
```

Esperado: a linha `BANCO-AVA/` do `.gitignore`.

---

### Passo 2: Criar `assets/gerador-banco-ava/moodle_xml.py`

**Status:** ✅ Concluído

**Arquivo:** Criar `assets/gerador-banco-ava/moodle_xml.py`

**Ação:** funções pequenas (≤ 45 linhas, docstring, nomes em português, constantes no topo):
`montar_categoria(caminho)`, `montar_enunciado(item)`, `montar_alternativas(item)`,
`pode_embaralhar(item)`, `montar_tags(item, rotulo)`, `montar_questao(item, contexto)` e
`montar_quiz(blocos)` (cabeçalho `<?xml ... encoding="UTF-8"?>` + `<quiz>`). Texto escapado com
`xml.sax.saxutils.escape` dentro de `<text>` (sem CDATA).

**Verificação:**

```powershell
C:\Python314\python.exe -c "import sys; sys.path.insert(0, r'assets\gerador-banco-ava'); import moodle_xml; print('ok')"
```

Esperado: `ok`.

---

### Passo 3: Criar `assets/gerador-banco-ava/gerar_banco_ava.py`

**Status:** ✅ Concluído

**Arquivo:** Criar `assets/gerador-banco-ava/gerar_banco_ava.py`

**Ação:** recebe a pasta `ATIVIDADES` da matéria; lê `atividades.json` (`uc_curta`); localiza
`CONTEUDO/*QUESTOES.md` (ignora práticas e discursivas, que não têm alternativas); usa
`ler_questoes()` do gerador de atividades; grava 1 `.xml` por fonte e o
`BANCO-AVA-<PASTA-DA-MATERIA>.xml` com todas; imprime o resumo (arquivo → nº de questões).
Opção `--so=ARQ.md` para gerar uma fonte só.

**Verificação:**

```powershell
C:\Python314\python.exe assets\gerador-banco-ava\gerar_banco_ava.py --help
```

Esperado: texto de uso, sem erro.

---

### Passo 4: Gerar os arquivos de ITIC

**Status:** ✅ Concluído

**Ação:** rodar o comando final (acima).

Esperado: 13 arquivos por atividade + `BANCO-AVA-INTRODUCAO-TIC.xml`; total 600 questões.

---

### Passo 5: Conferir os XML

**Status:** ✅ Concluído

**Ação:** script de conferência no scratchpad (não versionado): para cada `.xml`, abrir com
`xml.etree.ElementTree`, contar as `question type="multichoice"`, conferir que cada uma tem
exatamente 1 `answer fraction="100"` e que a letra correta bate com a linha **Gabarito** da fonte.

Esperado: 600 questões no arquivo único, 0 divergências. (Sem navegador; a importação no AVA é
feita pelo professor.)

---

### Passo 6: Registrar no `CLAUDE.md` e no `STATUS-ATIVIDADES.md`

**Status:** ✅ Concluído

**Ação:** no `CLAUDE.md`, item `gerador-banco-ava/` na árvore de `assets/` e regra curta "BANCO DE
QUESTÕES DO AVA SENAI" (Moodle XML, fora do Git, como importar, uma matéria por vez). No
`STATUS-ATIVIDADES.md` de ITIC, linha com a data e os arquivos gerados.

---

### Passo 7: Commit local + graphify

**Status:** ✅ Concluído

**Ação:** `git add` só de `.gitignore`, `assets/gerador-banco-ava/*.py`, `CLAUDE.md`,
`docs/banco-questoes-ava-senai-moodle-xml.md` e o `STATUS-ATIVIDADES.md`; conferir
`git diff --cached --name-only` (nenhum `.xml` nem `*QUESTOES.md`); commit; sem push. Depois
`C:\Python314\python.exe -m graphify update .`

---

## Como importar no AVA SENAI (para o professor)

1. No curso do AVA: **Banco de questões → Importar**.
2. Formato: **Moodle XML**.
3. Em "Geral": marcar **Obter categoria do arquivo** (e contexto do arquivo).
4. Enviar o `.xml` (um por atividade **ou** o `BANCO-AVA-INTRODUCAO-TIC.xml` — não os dois).
5. Conferir a prévia e clicar em **Continuar**.

---

## Resultado

- ✅ 14 arquivos em `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/BANCO-AVA/`
  (13 por atividade + `BANCO-AVA-INTRODUCAO-TIC.xml`), **fora do Git**.
- ✅ Conferência (script no scratchpad, sem navegador): 600 questões nos arquivos por atividade e
  600 no arquivo único, 13 categorias, **0 divergências** com a linha Gabarito, 600 IDs únicos,
  fórmulas com `<`/`>` escapadas corretamente; 2 questões sem embaralhar (Aula 02, ITENS 25 e 26).
- ⏳ Pendente (professor): importar no AVA SENAI e conferir a prévia. Se a importação reclamar de
  algo, ajustar o `moodle_xml.py` e gerar de novo.
- ⏳ Demais matérias: só quando o usuário liberar, uma por vez.
