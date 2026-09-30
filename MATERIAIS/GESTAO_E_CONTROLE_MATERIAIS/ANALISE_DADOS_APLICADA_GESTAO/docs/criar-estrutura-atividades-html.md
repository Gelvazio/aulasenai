# Criar Estrutura HTML de Atividades (espelhando Scripts-Comunicacao)

**Objetivo:** Replicar, dentro de `ATIVIDADES/`, o mesmo padrão de portal HTML usado em
`C:\Users\gelva\projetos\Scripts-Comunicacao\ATIVIDADES\` (portal com abas por módulo,
infográficos por aula e menu de questionários), preenchido com conteúdo novo e real do
curso **Análise de Dados Aplicada à Gestão** — sem alterar os `.docx`/gabaritos/scripts
Python já existentes na pasta.

**Tech Stack:** HTML5 + CSS inline + JS vanilla (mesmo padrão do arquivo de referência:
gradiente roxo/azul, Font Awesome via CDN, abas por módulo, cards de aula).

**Criado em:** 2026-09-22
**Concluído em:** 2026-09-22
**Tempo decorrido:** mesma sessão

---

## Escopo confirmado com o usuário

- Estrutura completa **com conteúdo novo por aula** (contexto, comando, passos com tempo,
  vídeos de referência, entrega/checklist, critérios, reflexão final) — mesmo nível de
  detalhe de Scripts-Comunicacao.
- Arquivos `.docx` (avaliações/gabaritos) e pasta `script/` **permanecem intocados** —
  a nova estrutura HTML é criada em paralelo.

## Mapeamento do curso → estrutura de aulas

O curso "Análise de Dados Aplicada à Gestão" tem 32h em **2 blocos de 16h**, cada um
com **5 atividades práticas** documentadas em `ESTRUTURACAO-PLANO-ENSINO/BLOCO-01...md`
e `BLOCO-02...md`. Isso mapeia para 2 módulos × 5 aulas (10 aulas no total), o mesmo
padrão de "módulo com N aulas" de Scripts-Comunicacao:

| Módulo | Aula | Tema | Fonte |
|---|---|---|---|
| M1: Fundamentos | 01 | Operações Matemáticas em Contexto Industrial | BLOCO-01 ativ. 1 |
| M1: Fundamentos | 02 | Reconhecimento de Dados e Estatística | BLOCO-01 ativ. 2 |
| M1: Fundamentos | 03 | Criação de Planilha Inicial | BLOCO-01 ativ. 3 |
| M1: Fundamentos | 04 | Aplicação de Fórmulas Essenciais | BLOCO-01 ativ. 4 |
| M1: Fundamentos | 05 | Formatação Profissional e Síntese (liga com SA-BLOCO-01) | BLOCO-01 ativ. 5 |
| M2: Avançado | 06 | Funções de Busca e Consulta | BLOCO-02 ativ. 1 |
| M2: Avançado | 07 | Lógicas Condicionais Complexas | BLOCO-02 ativ. 2 |
| M2: Avançado | 08 | Tabelas Dinâmicas, Filtros e Validação | BLOCO-02 ativ. 3 |
| M2: Avançado | 09 | Gráficos Dinâmicos e Visualização | BLOCO-02 ativ. 4 |
| M2: Avançado | 10 | Dashboard Executivo e Síntese (liga com SA-BLOCO-02) | BLOCO-02 ativ. 5 |

Contextos usam empresas fictícias catarinenses, no mesmo espírito das avaliações já
existentes (Blumenau, Itajaí) e do `CLAUDE.md` de `ATIVIDADES/`.

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar pasta `INFOGRAFICOS/` | ⬜ Pendente |
| 2 | `index.html` — cabeçalho, abas, CSS (estrutura base) | ✅ Concluído |
| 3 | `index.html` — Módulo 1, Aulas 01–02 | ✅ Concluído |
| 4 | `index.html` — Módulo 1, Aulas 03–05 | ✅ Concluído |
| 5 | `index.html` — Módulo 2, Aulas 06–08 | ✅ Concluído |
| 6 | `index.html` — Módulo 2, Aulas 09–10 + aba Integração | ✅ Concluído |
| 7 | `QUESTIONARIOS.HTML` — menu linkando às 4 avaliações `.docx` existentes | ✅ Concluído |
| 8 | `INFOGRAFICOS/AULA-01.html` a `AULA-05.html` | ✅ Concluído |
| 9 | `INFOGRAFICOS/AULA-06.html` a `AULA-10.html` | ✅ Concluído |
| 10 | `INFOGRAFICOS/index.html` — portal dos infográficos | ✅ Concluído |
| 11 | `INFOGRAFICOS/LEIA-ME.md` | ✅ Concluído |
| 12 | `ANALISE-PASTA-ATIVIDADES.md` — diagnóstico da nova estrutura | ✅ Concluído |
| 13 | Commit | ✅ Concluído (`28bd89d`) |

---

### Passo 1: Criar pasta `INFOGRAFICOS/`

**Status:** ⬜ Pendente

**Arquivo:** `ATIVIDADES/INFOGRAFICOS/` (pasta)

**Ação:** Criar a subpasta que vai receber os 10 infográficos + portal + leia-me.

**Verificação:** `Test-Path` retorna `True` após o primeiro arquivo ser escrito nela.

---

### Passo 2: `index.html` — estrutura base

**Status:** ⬜ Pendente

**Arquivo:** Criar `ATIVIDADES/index.html`

**Ação:** Cabeçalho (título, subtítulo, metadados do curso SENAI), CSS idêntico em
espírito ao de Scripts-Comunicacao (gradiente `#667eea`→`#764ba2`, cards de aula,
badges de tempo/grupo/categoria, steps numerados), navegação por abas
(`M1: Fundamentos`, `M2: Avançado`, `Integração`) e botão para `QUESTIONARIOS.HTML`.

**Verificação:** `node --check` não se aplica (HTML); abrir o arquivo e confirmar que
as 3 abas trocam de conteúdo (`document.querySelectorAll('.tab-button')`).

---

### Passo 3–6: Conteúdo das 10 aulas

**Status:** ⬜ Pendente

**Arquivo:** `ATIVIDADES/index.html` (dentro das divs de cada aba)

**Ação:** Para cada uma das 10 aulas da tabela de mapeamento acima, escrever um
`aula-card` completo com: badges (tempo/grupo/categoria), contexto (situação realista
de gestão/Excel), comando, 4–6 passos numerados com tempo, vídeo de referência
(YouTube, tema correspondente), checklist de entrega, critérios de avaliação e
reflexão final — no mesmo formato do arquivo de referência.

**Verificação:** contar `class="aula-card"` no arquivo final — deve haver 10.

---

### Passo 7: `QUESTIONARIOS.HTML`

**Status:** ⬜ Pendente

**Arquivo:** Criar `ATIVIDADES/QUESTIONARIOS.HTML`

**Ação:** Portal simples linkando para as 4 avaliações já existentes
(`AVALIACAO-01...docx` a `AVALIACAO-04...docx`) e seus gabaritos — já que este curso
usa avaliações em Word, não Google Forms/Apps Script como Scripts-Comunicacao.

**Verificação:** 4 links `<a href="...docx">` presentes, apontando para arquivos que
existem em `ATIVIDADES/`.

---

### Passo 8–9: Infográficos das 10 aulas

**Status:** ⬜ Pendente

**Arquivo:** `ATIVIDADES/INFOGRAFICOS/AULA-01.html` … `AULA-10.html`

**Ação:** Um infográfico HTML autocontido por aula (SVG/CSS, sem dependência externa
além de Font Awesome), resumindo visualmente o tema da aula (conceito central, passos-
chave, fórmula ou fluxo, dica prática).

**Verificação:** 10 arquivos `AULA-0N.html` presentes em `INFOGRAFICOS/`.

---

### Passo 10: `INFOGRAFICOS/index.html`

**Status:** ⬜ Pendente

**Arquivo:** Criar `ATIVIDADES/INFOGRAFICOS/index.html`

**Ação:** Grade com 10 cards, um por aula, linkando para o infográfico correspondente.

**Verificação:** 10 `<a href="AULA-0N.html">` presentes.

---

### Passo 11: `INFOGRAFICOS/LEIA-ME.md`

**Status:** ⬜ Pendente

**Arquivo:** Criar `ATIVIDADES/INFOGRAFICOS/LEIA-ME.md`

**Ação:** Documentar o propósito da pasta, convenção de nomes e como adicionar uma
nova aula — no mesmo espírito do `LEIA-ME.md` de Scripts-Comunicacao.

**Verificação:** arquivo existe e lista as 10 aulas.

---

### Passo 12: `ANALISE-PASTA-ATIVIDADES.md`

**Status:** ⬜ Pendente

**Arquivo:** Criar `ATIVIDADES/ANALISE-PASTA-ATIVIDADES.md`

**Ação:** Diagnóstico da nova estrutura (contagem de arquivos, cobertura das 10 aulas,
pendências reais — ex.: infográficos são estáticos e não substituem os `.pptx`
originais), no mesmo formato do documento equivalente em Scripts-Comunicacao.

**Verificação:** contagens no documento batem com os arquivos criados nos passos 1–11.

---

### Passo 13: Commit

**Status:** ⬜ Pendente

**Ação:** `git add` dos arquivos novos em `ATIVIDADES/` (sem tocar nos `.docx`/`script/`
existentes) e commit único descrevendo a nova estrutura.

**Verificação:** `git log -1` mostra o commit; `git status` limpo para os arquivos novos.
