# CLAUDE.md — Scripts-Comunicacao

Instruções específicas deste projeto. Precedência máxima, acima do `CLAUDE.md` global.

---

## 🔴 ESTADO DE REFERÊNCIA

**`b2b829c` — `refactor: consolidar todos os .gs em FORMULARIO-PRINCIPAL.gs`**

O projeto tem **um único arquivo de código**: `FORMULARIO-PRINCIPAL.gs`.
Toda alteração parte deste commit. O marco anterior, `7f584fe`, foi o primeiro
com sintaxe válida e continua útil como referência histórica.

| Métrica | Valor |
|---------|-------|
| Linhas | 9.171 |
| `node --check` | ✅ sintaxe válida |
| `function` | 60 |
| Formulários de aula | 25, com 20 questões cada |
| Quiz de revisão (Aulas 1–9) | 1, com 30 questões |
| Questões no total | 530 |
| `addMultipleChoiceItem()` | 530 — exatamente 1 por questão |
| `createChoice(` | 2.120 |
| `createChoice(..., true)` | 530 — 1 correta por questão |
| `setPoints(1)` | 530 |
| `setIsQuiz(true)` | 26 |
| `CODIGOS_VALIDOS` | declarado 1 vez |
| Funções ou globais duplicadas | nenhuma |

Diagnósticos: [`docs/correcao-quebras-de-linha-formulario-principal.md`](docs/correcao-quebras-de-linha-formulario-principal.md)
e [`docs/verificacao-cobertura-formularios.md`](docs/verificacao-cobertura-formularios.md).
Relatório linha a linha: `revisao.json`.

### Arquivos que não existem mais

`CODIGOS.gs`, `VALIDADOR-CODIGO-UNICO.gs` e `Código.js` foram absorvidos em
`b2b829c`. `Código.js` era cópia byte a byte do validador — como no Apps Script
todos os arquivos dividem o mesmo escopo global, as sete funções se
sobrescreviam. Não recrie esses arquivos.

---

## ⛔ COMMITS QUEBRADOS — NÃO USAR COMO BASE

Dez tentativas anteriores de corrigir este mesmo arquivo falharam. **Todas** as
versões abaixo têm erro de sintaxe e não rodam no Apps Script:

| Commit | Mensagem | Por que falhou |
|--------|----------|----------------|
| `ea20ac7` | corrigir todas as quebras de linha faltantes | 369 linhas com erro |
| `85f5ead` | fechar setChoices na linha 54 | corrigiu 1 de 25 blocos |
| `8b1b093` | consolidar strings em uma linha com aspas corretas | quebras persistiram |
| `366fb55` | converter aspas simples internas para duplas | parcial |
| `dfa656f` | aspas duplas no meio das strings | parcial |
| `d20e826` | consolidar strings em uma linha sem quebras | parcial |
| `bb9a11e` | revert: restaurar arquivo original | voltou ao estado quebrado |
| `3f15381` | consolidar strings em uma linha unica | parcial |
| `9bbaaec` | converter strings para aspas duplas com escape correto | parcial |
| `39676a1` | substituir aspas simples por duplas | parcial |

**Causa das falhas repetidas:** cada tentativa atacou *um* dos três defeitos
isoladamente. Eles são encadeados e precisam ser corrigidos **na ordem certa**
— ver seção seguinte.

---

## 📐 OS TRÊS DEFEITOS E A ORDEM DE CORREÇÃO

Se o arquivo voltar a quebrar, corrija **nesta ordem**. Fora dela, um defeito
mascara o outro e a correção falha.

### 1º — Linhas de continuação
String de uma linha partida em duas linhas físicas:

```javascript
// ERRADO — erro de sintaxe
var form = FormApp.create('Avaliação — Aula 02 · Preparação para Entrevistas
Comunicação oral estratégica · SENAI');

// CERTO
var form = FormApp.create('Avaliação — Aula 02 · Preparação para Entrevistas Comunicação oral estratégica · SENAI');
```

**Detecção:** linha que **não** inicia um statement válido (`form.`, `var `,
`function `, `Logger.`, `}`, `]`, `.set`, `.add`, …) é continuação da anterior.

⚠️ **Não detecte por contagem de aspas.** O defeito 2 faz as aspas se parearem
por acaso e a quebra passa despercebida. Foi essa a armadilha das 10 tentativas.

### 2º — Aspas simples aninhadas
Aspas simples dentro de string delimitada por aspas simples:

```javascript
// ERRADO
.setTitle('16. Qual é a definição de 'Feche com pergunta'?')

// CERTO
.setTitle('16. Qual é a definição de "Feche com pergunta"?')
```

Aspas internas são sempre **duplas**. O delimitador externo é sempre simples.

### 3º — `setChoices([` sem fechamento
Só depois dos dois anteriores. Afetava a **questão 1 de cada função** (25×):

```javascript
form.addMultipleChoiceItem().setTitle('1. ...')
  .setChoices([
    form.addMultipleChoiceItem().createChoice('...', true),
    form.addMultipleChoiceItem().createChoice('...', false)
  ]).setRequired(true);        // <-- esta linha faltava
```

**Distinção:** linha com `.createChoice(` é alternativa (continua o bloco);
linha com `.setTitle(` é questão nova (o bloco anterior deveria ter fechado).

---

## 📝 PADRÃO OBRIGATÓRIO DE QUESTÃO

Toda questão usa **uma variável**. O encadeamento direto cria um item novo a
cada alternativa — foi assim que o arquivo chegou a 2.650 itens para 530
questões, o que geraria ~2.100 questões vazias no formulário publicado.

```javascript
// ERRADO — cada form.addMultipleChoiceItem() cria OUTRO item no formulário
form.addMultipleChoiceItem().setTitle('1. ...')
  .setChoices([
    form.addMultipleChoiceItem().createChoice('...', true)
  ]).setRequired(true);

// CERTO — um item, reaproveitado para criar as alternativas
var q1 = form.addMultipleChoiceItem();
q1.setTitle('1. ...');
q1.setChoices([
  q1.createChoice('...', false),
  q1.createChoice('...', true)
]);
q1.setPoints(1);
q1.setRequired(true);
```

`addMultipleChoiceItem()` tem de ser **igual ao número de questões**. Se for
múltiplo disso, o encadeamento voltou.

O formulário precisa de `form.setIsQuiz(true)` no cabeçalho e `setPoints(1)` em
cada questão. Sem os dois, nada é pontuado — embora a descrição prometa nota
automática ao enviar.

---

## 🎯 REGRA DAS QUESTÕES

As questões saem do conteúdo real das aulas, que vive em
`VERSAO-POWERPOINT/*.md`. **Nunca gere questão por template.**

Os distratores vêm sempre de **outro conceito da mesma aula**, nunca de frases
de descarte. Alternativas como `Não tem relevância prática`,
`Apenas para contexto acadêmico`, `É um conceito desatualizado` ou
`Aprender fórmulas matemáticas` deixam o aluno acertar por eliminação: existiam
800 delas e foram eliminadas. A contagem correta hoje é **zero**.

A posição da resposta correta varia. Se `createChoice(..., true)` aparecer
sempre na primeira alternativa, o embaralhamento se perdeu.

---

## ✅ VALIDAÇÃO OBRIGATÓRIA

Nenhuma alteração em `FORMULARIO-PRINCIPAL.gs` é dada por concluída sem o
parser real passando:

```bash
cp FORMULARIO-PRINCIPAL.gs /tmp/check.js && node --check /tmp/check.js
```

E a conferência de integridade — as contagens precisam bater com a tabela do
topo deste arquivo:

```bash
for p in "^function " "addMultipleChoiceItem()" "createChoice(" "setPoints(1)" "setIsQuiz(true)"; do printf "%-26s %s\n" "$p" "$(grep -c "$p" FORMULARIO-PRINCIPAL.gs)"; done
```

Se qualquer contagem divergir, houve perda de conteúdo ou regressão: reverta e refaça.

---

## 📝 PENDÊNCIAS CONHECIDAS

Estas são falhas de **conteúdo**, não de sintaxe. O arquivo roda com elas.

1. **Separador de subtítulo perdido.** O caractere que separava título e
   subtítulo foi destruído na consolidação original e não existe em nenhum
   commit. A junção usou espaço simples, gerando
   `Preparação para Entrevistas Comunicação oral estratégica`. Se o texto
   desejado levar `:` ou travessão, é preciso uma passada editorial nos 26
   títulos.

2. **Alternativas truncadas na origem.** Algumas opções já vinham cortadas do
   gerador (ex.: `'...precisa ter co'`). Defeito anterior a `7f584fe`, não
   corrigido.

---

## ⚠️ REGRA DE OURO

> O arquivo tem 9.171 linhas e 517 KB. **Nunca** edite `FORMULARIO-PRINCIPAL.gs`
> linha a linha nem o reescreva inteiro. Use um script que faça a transformação,
> com backup antes e `node --check` depois. Foi a edição manual que produziu os
> 10 commits quebrados.
