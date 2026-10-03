# Botão "Banco Moodle (AVA SENAI)" em cada atividade

**Objetivo:** em cada página de atividade e avaliação objetiva, um botão **só para o professor
logado** que baixa o banco de questões daquela atividade em **Moodle XML**, pronto para importar
no AVA SENAI, igual ao arquivo do gerador local (`docs/banco-questoes-ava-senai-moodle-xml.md`).

**Tech Stack:** JavaScript puro (sem bibliotecas novas), Supabase (tabelas `atividade` e
`gabarito`, já com RLS), `js/supabase.js`, `assets/js/respostas-atividade-banco.js`,
`assets/js/popup.js`.

**Criado em:** 2026-10-03 15:44
**Concluído em:** 2026-10-03 16:02
**Tempo decorrido:** 18:00 (desde a criação do plano, 15:44)

---

## Como vai funcionar

1. O professor abre a atividade, por exemplo `ATIVIDADES-AULA-01-50-QUESTOES.html`, logado.
2. Na barra de exportação, depois dos botões de PDF, aparece **📥 Banco Moodle (AVA SENAI)**.
   Aluno, usuário sem login e páginas sem questões de múltipla escolha **não** veem o botão.
3. Ao clicar, o script:
   - lê as questões **da própria página**: número, título, contexto, comando, alternativas e
     capacidades da caixa "🎯 CAPACIDADE";
   - lê o **gabarito no banco** (tabela `gabarito`; o RLS só libera para o professor) pela
     atividade da página (`atividade.pagina = location.pathname`);
   - confere que a quantidade de questões da página é igual à do gabarito; se for diferente,
     **para** com aviso, para não gerar banco errado;
   - monta o XML no **mesmo formato do gerador local**: categoria
     `top/<UC curta>/<rótulo> — <tema>`, resposta única, 1 ponto, sem penalidade, ID
     `<PASTA-DA-MATERIA>-<RÓTULO>-QNN`, tags = capacidades + rótulo, feedback sem revelar a
     certa, sem embaralhar quando alguma alternativa cita as outras;
   - baixa o arquivo `<nome-da-pagina>.xml` (ex.: `ATIVIDADES-AULA-01-50-QUESTOES.xml`) e mostra
     um **popup** com o número de questões e o passo a passo de importação no AVA.
4. Nada é gravado no banco, nada fica no navegador (sem localStorage) e o gabarito **nunca** é
   embutido na página: ele só existe no arquivo que o professor baixa.

## Onde aparece

O botão é colocado pelo JavaScript, sem gerar as páginas de novo, em todas as **42 páginas** que
carregam `assets/js/atividade.js`. Todas elas já têm a folha de respostas no banco:

| Matéria | Páginas |
|---------|---------|
| Introdução à TIC | 13 |
| Análise de Dados Aplicada à Gestão | 9 |
| Fundamentos de Automação e Instrumentação | 15 |
| Fundamentos da Tecnologia e Programação | 5 |

Página nova, gerada pelo `gerar_atividades.py`, recebe o botão sozinha, porque já carrega o
`atividade.js`.

## Decisões técnicas

| Ponto | Decisão |
|-------|---------|
| Rótulo da atividade ("Aula 01", "Avaliação Objetiva 01") | Lido do `<title>` da página (parte antes de " — "), que o gerador sempre monta assim; sem `<title>`, usa `data-aula` |
| Tema | `data-tema` do `<body>` |
| UC curta | `data-uc-curta` do `<body>` |
| Pasta da matéria (prefixo do ID) | Pasta antes de `/ATIVIDADES/` no endereço da página |
| Capacidades | Códigos `C1`, `S2`... da caixa "🎯 CAPACIDADE" de cada questão |
| Mesmo XML do Python | `banco-moodle-xml.js` segue as mesmas constantes e a mesma ordem de tags do `assets/gerador-banco-ava/moodle_xml.py` (comentário nos dois arquivos: mudou um, mudar o outro) |
| Carregamento | O `atividade.js` carrega o `exportar-banco-moodle.js`, que carrega o `banco-moodle-xml.js`, no mesmo padrão do `turma-exportacao.js`. As páginas não mudam |
| Estilo | Reaproveita `.btn-export` de `assets/css/atividade.css`; nenhum CSS novo |

## Riscos e cuidados

| Risco | Cuidado |
|-------|---------|
| Gabarito exposto a aluno | Botão só aparece com `app_metadata.perfil = PROFESSOR`; mesmo forçando o clique, o RLS da tabela `gabarito` devolve vazio para aluno, e o script para com aviso |
| Banco do AVA com resposta errada | Confere quantidade de questões da página × gabarito e letra válida em cada item; divergência = não baixa |
| XML diferente do gerador local | Verificação por `node`: montar o XML da Aula 01 de ITIC com o JS e comparar, caractere a caractere, com o arquivo do gerador Python |
| Importar duas vezes no AVA | O popup lembra: importar só um arquivo por atividade (não junto com o arquivo único da matéria) |
| Regra dos `alert()` | O `atividade.js` ainda tem 1 `alert` (jsPDF não carregado). Ao mexer no arquivo, a regra manda trocar por popup, e ele será trocado |

## Arquivos previstos

| Ação | Arquivo | Responsabilidade |
|------|---------|------------------|
| Criar | `assets/js/banco-moodle-xml.js` | Só monta o texto Moodle XML (sem tela, sem banco) |
| Criar | `assets/js/exportar-banco-moodle.js` | Botão do professor, leitura das questões da página e do gabarito, download e popup |
| Modificar | `assets/js/atividade.js` | Carregar o `exportar-banco-moodle.js`; trocar o `alert` por popup |
| Modificar | `CLAUDE.md` | Registrar os scripts em `assets/` e o botão na regra "BANCO DE QUESTÕES DO AVA SENAI" |
| Modificar | `assets/gerador-banco-ava/moodle_xml.py` | Só comentário: manter igual ao `banco-moodle-xml.js` |

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Criar `banco-moodle-xml.js` (montagem do XML) | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |
| 2 | Comparar o XML do JS com o do gerador Python (`node`) | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |
| 3 | Criar `exportar-banco-moodle.js` (botão, leitura, download, popup) | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |
| 4 | Carregar pelo `atividade.js` e trocar o `alert` por popup | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |
| 5 | Checar sintaxe e regras de código (`node --check`, ≤ 45 linhas por função, ≤ 100 colunas) | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |
| 6 | Registrar no `CLAUDE.md` e comentário no `moodle_xml.py` | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |
| 7 | Commit local + graphify | ✅ Concluído | 2026-10-03 15:44 | 2026-10-03 16:02 | 18:00 |

---

### Passo 1: Criar `assets/js/banco-moodle-xml.js`

**Status:** ✅ Concluído

**Arquivo:** Criar `assets/js/banco-moodle-xml.js`

**Ação:** funções puras, que recebem dados prontos e devolvem texto, equivalentes às do
`moodle_xml.py`: `escaparXml`, `paragrafoHtml`, `elementoTexto`, `montarEnunciado`,
`podeEmbaralhar`, `montarConfiguracao`, `montarFeedbacks`, `montarAlternativas`,
`montarTagsQuestao`, `montarQuestaoMoodle`, `caminhoCategoria`, `montarCategoriaMoodle` e
`montarQuizMoodle`. Funções de topo com sufixo `Moodle` (em vez de IIFE, que passaria de 45 linhas); a de entrada é `montarBancoDaAtividadeMoodle(atividade)`. Questão no formato
`{ numero, titulo, contexto, comando, alternativas: [[letra, texto]], gabarito, capacidades }`.

**Verificação:**

```powershell
node --check assets\js\banco-moodle-xml.js
```

Esperado: sem erro.

---

### Passo 2: Comparar com o gerador Python

**Status:** ✅ Concluído

**Ação:** script no scratchpad, fora do projeto: o Python lê
`CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md` com `ler_questoes()` e grava as questões em JSON. O
`node` carrega o `banco-moodle-xml.js` com `vm`, monta o XML e compara com
`BANCO-AVA/ATIVIDADES-AULA-01-50-QUESTOES.xml`. A mesma comparação vale para a Aula 08 (fórmulas
com `<`, `>` e aspas) e para a Aula 02 (questões que não embaralham).

Esperado: arquivos **idênticos**.

---

### Passo 3: Criar `assets/js/exportar-banco-moodle.js`

**Status:** ✅ Concluído

**Arquivo:** Criar `assets/js/exportar-banco-moodle.js`

**Ação:** funções curtas, cada uma com uma responsabilidade:
- `carregarMontadorMoodle()`: inclui o `banco-moodle-xml.js` ao lado do script;
- `lerProfessorMoodle()`: sessão do Supabase Auth; perfil pelo `app_metadata`;
- `lerQuestoesDaPagina()`: cards `.aula-card.questao` com `.alternativas li`, separando a letra
  (`.letra`) do texto e os códigos de capacidade;
- `lerGabaritoMoodle()`: `buscarAtividadeDaPagina()` + `sbGet('gabarito', ...)` →
  `Map(item → letra)`;
- `conferirGabarito(questoes, gabarito)`: mesma quantidade e letra válida em cada item;
- `dadosDaAtividadeMoodle()`: rótulo, tema, UC curta, pasta da matéria e nome do arquivo;
- `baixarArquivoXml(nome, texto)`: `Blob` + link temporário;
- `exportarBancoMoodle()`: junta tudo; erros em popup;
- `criarBotaoMoodle()` / `iniciarBotaoMoodle()`: coloca o botão na `.export-bar` só para o
  professor, em página com questões objetivas.

**Verificação:**

```powershell
node --check assets\js\exportar-banco-moodle.js
```

Esperado: sem erro.

---

### Passo 4: Carregar pelo `atividade.js` e trocar o `alert`

**Status:** ✅ Concluído

**Arquivo:** Modificar `assets/js/atividade.js`

**Ação:** generalizar o carregador atual (`carregarTurmaExportacao`) para carregar também o
`exportar-banco-moodle.js`. Trocar o `alert('Erro: jsPDF não carregado...')` por
`mostrarPopup(..., { tipo: 'erro' })`, mantendo o aviso no console quando o popup não estiver na
página.

**Verificação:**

```powershell
node --check assets\js\atividade.js
```

Esperado: sem erro.

---

### Passo 5: Checar sintaxe e regras de código

**Status:** ✅ Concluído

**Ação:** `node --check` nos 3 arquivos. Script no scratchpad confere: funções com no máximo
45 linhas, linhas com no máximo 100 caracteres, nenhum `var`, nenhum `alert`/`confirm`.

Esperado: nenhuma violação. **Sem navegador:** o clique no botão com login de professor e a
importação no AVA ficam para você testar.

---

### Passo 6: Registrar no `CLAUDE.md` e comentário no `moodle_xml.py`

**Status:** ✅ Concluído

**Ação:** na árvore de `assets/js/`, citar os dois scripts. Na regra "BANCO DE QUESTÕES DO AVA
SENAI", registrar o botão: só professor, gabarito lido do banco, mesmo formato do gerador, nada
gravado. No `moodle_xml.py`, comentário: "manter igual ao `assets/js/banco-moodle-xml.js`".

---

### Passo 7: Commit local + graphify

**Status:** ✅ Concluído

**Ação:** `git add` só dos arquivos da tarefa; conferir `git diff --cached --name-only` (nenhum
`.xml`, `*QUESTOES.md` ou gabarito); commit; sem push. Depois
`C:\Python314\python.exe -m graphify update .`

---

## Como testar (professor)

1. Entrar com o usuário de professor e abrir `ATIVIDADES-AULA-01-50-QUESTOES.html` de Introdução à
   TIC.
2. Conferir o botão **📥 Banco Moodle (AVA SENAI)** na barra de exportação.
3. Clicar: baixa `ATIVIDADES-AULA-01-50-QUESTOES.xml` e o popup informa 50 questões.
4. No AVA: Banco de questões → Importar → **Moodle XML** → marcar **Obter categoria do arquivo** →
   enviar o arquivo.
5. Sair do login, ou entrar como aluno, e conferir que o botão **não** aparece.

---

## Resultado

- ✅ `assets/js/banco-moodle-xml.js`: o XML montado pelo JavaScript ficou **idêntico** (caractere a
  caractere) aos 13 arquivos do gerador Python de Introdução à TIC (inclui fórmulas com `<`/`>` da
  Aula 08 e as questões sem embaralhar da Aula 02).
- ✅ `assets/js/exportar-banco-moodle.js`: botão só do professor, leitura da página e do gabarito,
  conferência, download e popup. Nomes globais com sufixo `Moodle` (sem colisão com os outros
  scripts de `assets/js/` e `js/`).
- ✅ `assets/js/atividade.js`: carrega o botão; o `alert` do jsPDF virou popup.
- ✅ `node --check` nos 3 arquivos; funções ≤ 45 linhas, linhas ≤ 100 colunas, JSDoc em todas.
- ✅ Conferência das 13 páginas de ITIC × fontes `.md` (simulando a leitura dos cards): títulos,
  contextos, comandos e alternativas iguais. ⚠️ Única diferença, anterior a esta tarefa: a página
  `ATIVIDADES-AULA-03-50-QUESTOES.html` mostra a capacidade **C5** nas questões e a fonte
  `ATIVIDADES-AULA-03-25-QUESTOES.md` não tem a linha `- **Capacidade:**` — o botão gera as tags
  com C5 e o gerador local sem elas.
- ⏳ Pendente (professor, sem navegador do Claude): testar o botão logado como professor e como
  aluno e importar um arquivo no AVA.
