# Projetos Scratch — Fundamentos da Tecnologia e Programação

> Regras deste material. Vale também o `AGENTS.md` da raiz `C:\fontes\aulasenai`.

## O que é

Doze projetos de Scratch, passo a passo, para os alunos da 8ª série do curso **Rio do Sul Mais
Tech**, matéria **Fundamentos da Tecnologia e Programação**.

- São **2 aulas de 3 horas**. Em cada hora o aluno entrega pelo menos 1 projeto (2 projetos por hora).
- Não são conteúdo de aula (`CONTEUDO/AULA-NN`) nem slides. São **roteiros de prática**.
- Base: o livro *Scratch: jeito divertido de programar* (`APOSTILA/Scratch-jeito_divertido_de_programar.pdf`)
  e o site scratch.mit.edu.
- Visual futurista: `C:\fontes\rules-ai\prompts\VISUAL-FUTURISTA.md`.

## Público e carga

- Público: alunos da 8ª série, iniciantes em programação. Explicações curtas e linguagem simples.
- Cada projeto cabe em um tempo fixo (tabela abaixo). A soma de cada hora é o tempo da aula.

## Estrutura de arquivos

```
projetos-scratch/
├── index.html                     índice: 12 cards em 2 seções (Aula 1 e Aula 2)
├── placar.html                    placar das equipes (só do professor)
├── projeto-modelo.html            modelo para copiar ao criar página nova
├── projeto-01-gato-dancarino.html ... projeto-12-projeto-final.html
├── assets/
│   ├── scratch.css                tokens (:root) e cores dos blocos (--bloco-movimento etc.)
│   ├── scratch.js                 navegação por passos
│   ├── placar.css
│   └── placar.js                  placar e cronômetro
└── .vscode/settings.json          Live Server na porta 5501
```

Site 100% estático: HTML, CSS e JavaScript puros, sem banco, sem build, sem dependência npm.

## Os 12 projetos

| Nº | Arquivo | Título | Aula · Hora | Tempo |
|----|---------|--------|-------------|-------|
| 01 | `projeto-01-gato-dancarino.html` | Gato dançarino | Aula 1 · Hora 1 | 30 min |
| 02 | `projeto-02-cartao-animado.html` | Cartão de apresentação animado | Aula 1 · Hora 1 | 30 min |
| 03 | `projeto-03-gato-desenhista.html` | Gato desenhista | Aula 1 · Hora 2 | 40 min |
| 04 | `projeto-04-pega-pega.html` | Pega-pega | Aula 1 · Hora 2 | 40 min |
| 05 | `projeto-05-labirinto-1.html` | Labirinto 1 | Aula 1 · Hora 3 | 45 min |
| 06 | `projeto-06-piano-musical.html` | Piano musical | Aula 1 · Hora 3 | 30 min |
| 07 | `projeto-07-pegar-macas.html` | Pegar maçãs | Aula 2 · Hora 1 | 40 min |
| 08 | `projeto-08-quiz.html` | Quiz de tecnologia | Aula 2 · Hora 1 | 45 min |
| 09 | `projeto-09-labirinto-2.html` | Labirinto 2 | Aula 2 · Hora 2 | 50 min |
| 10 | `projeto-10-desvie-obstaculos.html` | Desvie dos obstáculos | Aula 2 · Hora 2 | 45 min |
| 11 | `projeto-11-meus-blocos.html` | Meus blocos | Aula 2 · Hora 3 | 40 min |
| 12 | `projeto-12-projeto-final.html` | Projeto final | Aula 2 · Hora 3 | 60 min |

Conceitos de cada aula:

- **Aula 1:** movimento, repetição e decisões.
- **Aula 2:** variáveis, blocos próprios e projeto final.

## Padrão de página

Cada projeto segue a estrutura de `projeto-modelo.html`:

- `header.topo`: link para voltar e o selo `AULA n · HORA n · PROJETO nn`.
- `section.cartao`: título (`h1`), descrição e a lista `ul.fichas` (Tempo, Nível, Blocos).
- `progress#progresso-passos` e `p#contador-passos`: andamento dos passos.
- Vários `article.passo.cartao`, cada um com `span.numero-passo`, `h2`, texto curto, `div.pilha`
  (com `span.bloco.<categoria>` e `span.campo`) e `div.dica`.
- Último passo, "Entrega": `div.entrega`, `section.ficha-avaliacao` e `div.desafio`.
- `nav.navegacao` fixa com os quatro botões de ids `passo-anterior`, `passo-inicio`,
  `passo-proximo` e `passo-final`.

Categorias de bloco (classes CSS): `movimento`, `aparencia`, `som`, `eventos`, `controle`,
`sensores`, `operadores`, `variaveis`, `meus`, `caneta`. Blocos de início usam a classe `chapeu`.

## Assets compartilhados

- **`scratch.js`:** mostra só o passo ativo (classe `ativo`). Aceita as setas ← → do teclado e os
  botões Voltar, Início, Avançar e Final. Atualiza a barra de progresso, reduz a escala do passo
  para caber na tela sem rolagem e guarda o último passo no `localStorage`
  (chave `scratch-passo:<caminho>`).
- **`scratch.css`:** só tokens em `:root` e classes de componente. Cores ficam nos tokens.

## Placar (só do professor)

- `placar.html` e `placar.js`: até **8 equipes** e **12 projetos** (`TOTAL_PROJETOS = 12`).
- Pontos por projeto: +1, +5, +10, "1º a entregar" +3, "Desafio" +2 e -1.
- Ranking com medalhas e cronômetro regressivo (padrão 30 min). Nos últimos 60 s, aviso com sinal sonoro.
- Tudo fica no `localStorage` (chave `scratch-placar-v1`), só no navegador do professor. Nada vai
  para o banco nem para a internet.

## Avaliação

- Cada projeto tem uma **ficha de critérios do professor** dentro da própria página
  (`section.ficha-avaliacao`).
- **Não há nota no sistema nem no banco.** Decisão do usuário em 2026-10-29.

## Regras para editar

- **Página nova:** copiar `projeto-modelo.html`, listar no `index.html` e, se a contagem mudar,
  ajustar `TOTAL_PROJETOS` em `assets/placar.js`.
- **Sem CSS nem JavaScript inline:** estilo só em `assets/*.css`, script só em `assets/*.js`.
- **Ids da navegação não mudam** (`passo-anterior`, `passo-inicio`, `passo-proximo`, `passo-final`):
  o `scratch.js` depende deles.
- Nomes de arquivos, funções, variáveis e comentários em português, sem acentos nos nomes.
- Explicações curtas, para a 8ª série. Um conceito por passo.
- Conferir no Scratch real os nomes e as cores dos blocos citados antes de dar um passo como pronto.
- Não gerar slides. Não criar conteúdo de aula (`CONTEUDO/`).

## Como validar (sem navegador e sem testes)

- ⛔ Não abrir navegador e não subir servidor para validar.
- ⛔ Não escrever testes automatizados.
- ✅ Validar com `node --check assets/scratch.js assets/placar.js`.
- ✅ Validar por leitura: conferir ids, tempos e a tabela acima contra os arquivos.

## Histórico

- #435: criação dos 12 projetos e do índice.
- #436: placar das equipes.
- #437 e #438: botões Início e Final.
- #439: tempos dos projetos.
- #440: este arquivo `AGENTS.md`.
