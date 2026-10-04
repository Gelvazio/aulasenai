# Botão "Banco Moodle completo" no índice de atividades

**Objetivo:** no índice de atividades da matéria (ex.:
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html`), um botão
**só para o professor logado** que baixa **todas as questões objetivas da matéria de uma vez** em um
único Moodle XML (uma categoria por atividade), igual ao arquivo único do gerador local
(`BANCO-AVA-<PASTA-DA-MATERIA>.xml`).

**Tech Stack:** JavaScript puro, `fetch` + `DOMParser` (páginas do próprio site), Supabase (tabelas
`atividade` e `gabarito`, RLS já existente), `assets/js/popup.js`.

**Criado em:** 2026-10-03 16:23
**Concluído em:** —
**Tempo decorrido:** —

---

## Como vai funcionar

1. O professor abre o índice de atividades logado e vê, logo abaixo do resumo, a barra
   **"📥 Banco Moodle completo (AVA SENAI)"**. Aluno e usuário sem login **não** veem.
2. Ao clicar, o script:
   - pega os links `.html` dos cards do índice (sem repetir);
   - baixa cada página do próprio site (`fetch`) e lê as questões com o **mesmo leitor** do botão
     de cada atividade. Os scripts das páginas não rodam;
   - ignora as páginas sem questões de múltipla escolha (práticas, média final, avaliação prática);
   - para cada atividade objetiva, lê o **gabarito no banco** pelo endereço da página e confere a
     quantidade e as letras;
   - se alguma atividade tiver problema (não cadastrada ou gabarito diferente), mostra a lista e
     **pergunta** se baixa o banco só com as que estão certas;
   - monta **um único XML** com uma categoria por atividade, em ordem alfabética do nome da página,
     a mesma ordem do arquivo único do gerador local, e baixa `BANCO-AVA-<PASTA-DA-MATERIA>.xml`
     (ex.: `BANCO-AVA-INTRODUCAO-TIC.xml`);
   - mostra um popup com o total de atividades e questões e o passo a passo de importação.
3. Nada é gravado no banco nem no navegador; o gabarito nunca fica na página.

**Introdução à TIC:** 13 atividades objetivas, **600 questões**.

## Onde aparece

O botão é carregado pelo `assets/js/atividades-crud-modal.js`, que já carrega as outras
ferramentas do professor no índice (bloqueio, turma favorita). Assim ele aparece nos **14 índices
de atividades** que usam esse script, inclusive o de Introdução à TIC pedido. Em índice sem
atividade objetiva, o clique avisa "nenhuma atividade objetiva neste índice".

## Reorganização do código (SOLID)

Hoje o leitor de questões está dentro do `exportar-banco-moodle.js`, preso ao `document` da
página. Ele passa para um módulo compartilhado que recebe o documento e o endereço, usado pelos
dois botões:

| Arquivo | Responsabilidade |
|---------|------------------|
| `assets/js/banco-moodle-xml.js` (alterar) | Só monta XML; ganha `montarBancoCompletoMoodle(atividades)` (várias categorias num arquivo) |
| `assets/js/banco-moodle-pagina.js` (criar) | Lê questões e dados de **um documento** (a página aberta ou uma baixada por `fetch`), lê o gabarito pelo endereço, confere, verifica o professor, baixa o arquivo e avisa em popup |
| `assets/js/exportar-banco-moodle.js` (alterar) | Só o botão dentro da atividade (usa o módulo compartilhado) |
| `assets/js/indice-banco-moodle.js` (criar) | Só o botão do índice: links dos cards → páginas → banco completo |
| `assets/css/indice-banco-moodle.css` (criar) | Barra do botão no índice (tokens em `:root`) |
| `assets/js/atividades-crud-modal.js` (alterar) | Carregar `indice-banco-moodle.js` + CSS; trocar o único `window.confirm` por `confirmarPopup` (regra dos popups) |

## Riscos e cuidados

| Risco | Cuidado |
|-------|---------|
| Gabarito exposto a aluno | Botão só com `app_metadata.perfil = PROFESSOR`; o RLS da `gabarito` não devolve nada a aluno |
| Banco incompleto sem perceber | Atividade com problema = popup com a lista e confirmação antes de baixar |
| XML diferente do gerador local | Comparar por `node` o arquivo completo montado pelo JS com `BANCO-AVA-INTRODUCAO-TIC.xml` (deve ser idêntico) |
| Quebrar o botão de cada atividade na reorganização | Mesma comparação por `node` dos 13 arquivos por atividade + `node --check` |
| Aula 03 (diferença já conhecida) | A página da Aula 03 mostra C5 nas questões e a fonte `.md` não; o banco do botão leva a tag C5 e o do gerador local não. Só as tags mudam |
| Importar duas vezes | O popup lembra: importar o arquivo completo **ou** os arquivos por atividade |

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | `banco-moodle-xml.js`: `montarBancoCompletoMoodle` | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 2 | Criar `banco-moodle-pagina.js` (leitor compartilhado) | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 3 | `exportar-banco-moodle.js` passa a usar o módulo compartilhado | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 4 | Criar `indice-banco-moodle.js` + `indice-banco-moodle.css` | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 5 | `atividades-crud-modal.js`: carregar o botão e trocar o `confirm` | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 6 | Conferências (`node --check`, XML idêntico ao Python, regras de código, nomes globais) | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 7 | Registrar no `CLAUDE.md` | ⬜ Pendente | 2026-10-03 16:23 | — | — |
| 8 | Commit local + graphify | ⬜ Pendente | 2026-10-03 16:23 | — | — |

---

### Passo 1: `montarBancoCompletoMoodle` em `assets/js/banco-moodle-xml.js`

**Status:** ⬜ Pendente

**Ação:** extrair `montarBlocosDaAtividadeMoodle(atividade)` (categoria + questões) do
`montarBancoDaAtividadeMoodle` e criar `montarBancoCompletoMoodle(atividades)` (blocos de todas,
num só `<quiz>`), igual ao `gravar_arquivo_unico` do Python.

**Verificação:** `node --check assets\js\banco-moodle-xml.js`.

---

### Passo 2: Criar `assets/js/banco-moodle-pagina.js`

**Status:** ⬜ Pendente

**Ação:** mover do `exportar-banco-moodle.js`, recebendo `documento` e `caminho` (endereço da
página) em vez de `document`/`location`: leitura das questões, dados da atividade (rótulo do
`<title>`, `data-tema`, `data-uc-curta`, pasta da matéria), gabarito pelo endereço
(`atividade.pagina` → `gabarito`), conferência, verificação do professor, download e aviso em
popup. Nova função `prepararAtividadeMoodle(documento, caminho)` → atividade pronta com o gabarito.

**Verificação:** `node --check assets\js\banco-moodle-pagina.js`.

---

### Passo 3: `exportar-banco-moodle.js` usa o módulo compartilhado

**Status:** ⬜ Pendente

**Ação:** o arquivo fica só com o botão da atividade; carrega `banco-moodle-pagina.js` e
`banco-moodle-xml.js` (em ordem) e chama `prepararAtividadeMoodle(document, location.pathname)`.
O comportamento do botão não muda.

**Verificação:** `node --check assets\js\exportar-banco-moodle.js`.

---

### Passo 4: Criar `indice-banco-moodle.js` + `indice-banco-moodle.css`

**Status:** ⬜ Pendente

**Ação:** `coletarPaginasDoIndiceMoodle()` (links `.html` dos cards `.aula`, sem repetir, em ordem
alfabética do nome), `baixarPaginaMoodle(url)` (`fetch` + `DOMParser`),
`prepararTodasAsAtividadesMoodle()` (páginas objetivas → atividades prontas + lista de problemas),
`exportarBancoCompletoMoodle()` (confirmação se houver problema, download, popup) e a barra abaixo
do `.resumo`. CSS com tokens próprios em `:root` e o botão no visual dos `.btn` do índice.

**Verificação:** `node --check assets\js\indice-banco-moodle.js`.

---

### Passo 5: `atividades-crud-modal.js`

**Status:** ⬜ Pendente

**Ação:** em `carregarMarcacaoFeitas()`, carregar `css/indice-banco-moodle.css` e
`js/indice-banco-moodle.js`. Trocar `window.confirm(MSG_CONFIRMAR_EXCLUSAO)` por
`confirmarPopup(...)` (o `popup.js` já é carregado no índice pelo `indice-atividades-bloqueio.js`;
o novo script também garante o carregamento).

**Verificação:** `node --check assets\js\atividades-crud-modal.js`.

---

### Passo 6: Conferências

**Status:** ⬜ Pendente

**Ação (sem navegador):**
- `node --check` nos arquivos alterados/criados;
- `node` + dados das fontes `.md`: XML completo do JS **idêntico** ao `BANCO-AVA-INTRODUCAO-TIC.xml`
  e os 13 por atividade idênticos aos do gerador;
- funções ≤ 45 linhas, linhas ≤ 100 colunas, JSDoc, sem `var`/`alert`/`confirm`;
- nomes globais sem colisão com os demais scripts de `assets/js/` e `js/`.

---

### Passo 7: Registrar no `CLAUDE.md`

**Status:** ⬜ Pendente

**Ação:** na regra "BANCO DE QUESTÕES DO AVA SENAI": botão do índice (só professor, todas as
atividades objetivas, mesmo arquivo único do gerador local); na árvore de `assets/`, os arquivos
novos.

---

### Passo 8: Commit local + graphify

**Status:** ⬜ Pendente

**Ação:** `git add` só dos arquivos da tarefa; conferir `git diff --cached --name-only`; commit;
sem push; `C:\Python314\python.exe -m graphify update .`

---

## Como testar (professor)

1. Logado como professor, abrir
   `http://127.0.0.1:5500/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html`.
2. Clicar em **📥 Banco Moodle completo (AVA SENAI)**: baixa `BANCO-AVA-INTRODUCAO-TIC.xml` e o
   popup informa 13 atividades e 600 questões.
3. Abrir uma atividade e conferir que o botão **📥 Banco Moodle (AVA SENAI)** dela continua
   funcionando.
4. Como aluno ou sem login: nenhum dos dois botões aparece.
