# Capítulo 08 — TDD e Debugging Moderno no Front-End

- **Aula:** 08
- **Capacidade:** C5, S1

## Teoria

### E se o teste nascesse antes do código?

Na **Loja Nuvem Azul**, o cadastro aceitava CPFs como `111.111.111-11`, e corrigir o validador
virou motivo de medo: cada ajuste quebrava outra coisa. A equipe decidiu reescrever o validador de
outro jeito — **escrevendo o teste antes do código**. Cada regra nova começou com um teste falhando,
e o código só cresceu o suficiente para passar. No fim, havia uma suíte que documentava todas as
regras e permitia mexer no código sem medo.

> 🎯 **Objetivos do capítulo:** aplicar o ciclo **TDD (vermelho → verde → refatorar)**, depurar
> um teste que falha com método (mensagem, isolamento, breakpoints), usar a visão de **caixa
> branca** para conferir os caminhos, agir com **responsabilidade** com a suíte e **acolher
> sugestões** no code review dos testes.

### O que é TDD

**TDD** (Test-Driven Development) é escrever o teste antes do código. Mais do que testar, é uma
forma de **projetar**: o teste é o primeiro "cliente" da função e obriga a decidir nome,
parâmetros e retorno antes de programar.

| Fase | O que fazer | Regra de ouro |
|---|---|---|
| 🔴 **Vermelho** | Escrever **um** teste pequeno para a próxima regra e vê-lo falhar | Falhar **pelo motivo esperado** (prova que o teste funciona) |
| 🟢 **Verde** | Escrever o código **mais simples** que faz o teste passar | Não programar o futuro; resolver só a falha atual |
| 🔵 **Refatorar** | Melhorar nomes, remover duplicação, extrair funções | Comportamento igual: a barra continua verde |

O ciclo se repete em **micro-passos**: um teste por vez, nunca "todos os testes do sistema antes".

### TDD na prática: validador de CPF em 3 passos

**Passo 1 — Vermelho → verde: o caso mais simples.**

```js
// cpf.test.js
import { describe, it, expect } from 'vitest';
import { validarCPF } from './cpf';

describe('validarCPF', () => {
  it('recusa texto vazio', () => {
    expect(validarCPF('')).toBe(false);
  });
});

// 🔴 Falha: validarCPF ainda não existe.
// 🟢 cpf.js — o mínimo para passar:
export function validarCPF() {
  return false;
}
```

**Passo 2 — Vermelho → verde: um CPF válido e um CPF com dígitos repetidos.**

```js
it('aceita um CPF válido, com ou sem máscara', () => {
  expect(validarCPF('529.982.247-25')).toBe(true);
  expect(validarCPF('52998224725')).toBe(true);
});

it('recusa dígito verificador errado', () => {
  expect(validarCPF('529.982.247-26')).toBe(false);
});

it('recusa CPF com todos os dígitos iguais', () => {
  expect(validarCPF('111.111.111-11')).toBe(false);
});
```

O CPF `111.111.111-11` **passa** no cálculo dos dígitos verificadores; por isso o último teste
fica vermelho até a regra dos dígitos repetidos ser escrita — um vermelho legítimo, que revelou uma
regra escondida.

**Passo 3 — Refatorar: o código final, com a barra verde o tempo todo.**

```js
// cpf.js
function calcularDigito(numeros, pesoInicial) {
  const soma = numeros.reduce((total, numero, i) => total + numero * (pesoInicial - i), 0);
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

export function validarCPF(cpf) {
  const digitos = String(cpf ?? '').replace(/\D/g, '');
  if (digitos.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digitos)) return false;

  const numeros = [...digitos].map(Number);
  const primeiro = calcularDigito(numeros.slice(0, 9), 10);
  const segundo = calcularDigito(numeros.slice(0, 10), 11);
  return primeiro === numeros[9] && segundo === numeros[10];
}
```

O cálculo repetido virou a função `calcularDigito` — a refatoração foi segura porque os testes
confirmavam, a cada mudança, que o comportamento continuava o mesmo.

### Caixa branca: conferindo os caminhos

Depois do ciclo, olhe o código (visão de **caixa branca**) e confira se cada caminho tem teste:
tamanho diferente de 11 (`''`), dígitos repetidos (`111...`), dígito verificador errado (`...-26`)
e CPF válido (`...-25`). Faltou algum? Escreva o teste — e o relatório de cobertura (capítulo 7)
confirma os ramos.

### Quando usar TDD (e quando não)

| Use TDD ✅ | Prefira testar depois ⚠️ |
|---|---|
| Regras de negócio, cálculos e validações (CPF, cupom, frete) | Ajustes visuais de CSS e layout |
| Correção de defeitos: primeiro um teste que **reproduz** o bug | Protótipos descartáveis para explorar uma ideia |
| Componentes com comportamento (filtro, formulário) | Código de terceiros que você não controla |

Mito comum: "TDD dobra o tempo". Na prática, ele reduz retrabalho e tempo de depuração.

### Debugging moderno: depurar com método

Quando um teste falha, siga a ordem:

1. **Leia a mensagem inteira:** `expected 19 to be 21` diz o valor esperado, o obtido, o arquivo e a
   linha.
2. **Isole o caso:** `it.only(...)` roda só aquele teste; `it.skip(...)` pula um teste em construção
   (e **nenhum dos dois pode ser enviado** ao repositório).
3. **Use o modo watch:** `npx vitest` roda de novo ao salvar; no terminal, `p` filtra por arquivo, `t`
   pelo nome do teste e `f` roda só os que falharam.
4. **Pause no ponto certo:** em vez de espalhar `console.log`, use **breakpoints**. No editor
   (ex.: VS Code), abra um **terminal de depuração JavaScript**, rode `npx vitest run cpf` e a
   execução para na linha marcada (ou numa instrução `debugger;`). Inspecione as **variáveis**, a
   **pilha de chamadas** e teste expressões no console de depuração.
5. **Testes E2E:** use o time-travel do Cypress ou o trace do Playwright (capítulo 6) para ver a
   tela no exato momento da falha.

### Responsabilidade com a suíte

- Nunca **apague** ou "pule" um teste vermelho só para a suíte passar: ele está avisando algo.
- Não envie código com `it.only`, `it.skip` ou `debugger;` esquecidos.
- Rode a suíte inteira antes de enviar; se o seu código quebrou um teste, **assuma e corrija**.
- Defeito encontrado = teste que o reproduz + correção (o defeito não volta sem ser notado).

### Code review dos testes: acolher sugestões (S1)

No code review, um colega lê o seu código **e os seus testes** antes da junção. O que observar:

- o nome do teste descreve o comportamento? Há uma regra por teste?
- as asserções conferem algo importante (e não só "não deu erro")?
- os testes são independentes e cobrem as bordas?
- sobrou `only`, `skip` ou `console.log`?

**Ao receber sugestões:** leia com calma, agradeça, pergunte quando não entender e **considere a
ideia diferente da sua** — muitas vezes ela revela um caso que você não viu. Discorde com fatos
("o caso de CPF com letras já está no teste da linha 30"), nunca com o ego.

> 💬 **Exemplo:** "Sugiro testar também `529.982.247-2` (10 dígitos)." → "Boa! Esse caminho
> estava sem teste; incluí no mesmo describe."

## Vídeos

- [O que é TDD — Test-Driven Development](https://www.youtube.com/watch?v=o_C_qxhPws4) — 09:36 — Dias de Dev
- [TDD — Test Driven Development](https://www.youtube.com/watch?v=bhT7_gZE55c) — 14:59 — Programinhas
- [How to debug a unit test in VS Code (em inglês)](https://www.youtube.com/watch?v=zzYks4GGrFs) — 03:01 — Nathan Krasney
- [Recebi um code review no GitHub, e agora?](https://www.youtube.com/watch?v=YKncSsTDR_4) — 14:40 — Mayk Brito

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** Um colega diz que "TDD é escrever todos os testes do sistema primeiro e depois programar tudo" e que, na fase verde, já deixa o código pronto para regras futuras.
- **Comando:** Corrija o entendimento do colega explicando as três fases do ciclo TDD, por que o teste precisa falhar antes e o que é permitido em cada fase.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C5
- **Contexto:** O cadastro da Loja Nuvem Azul precisa da função `validarSenhaForte(senha)`: mínimo de 8 caracteres, pelo menos uma letra maiúscula e pelo menos um número.
- **Comando:** Desenvolva a função com TDD em três ciclos (uma regra por ciclo), mostrando em cada ciclo o teste vermelho, o código verde mínimo e, no fim, a refatoração.
- **Linhas:** 12

### ITEM 3
- **Capacidade:** C5
- **Contexto:** O validador de CPF do capítulo já aceita `529.982.247-25` e recusa `529.982.247-26`. Ao escrever o teste `expect(validarCPF('111.111.111-11')).toBe(false)`, ele ficou vermelho.
- **Comando:** Explique por que esse vermelho é legítimo, escreva o código verde mínimo para a regra e diga qual refatoração deixaria o cálculo dos dígitos mais legível sem mudar o comportamento.
- **Linhas:** 7

### ITEM 4
- **Capacidade:** C5
- **Contexto:** O teste `cobra R$ 2 por km acima de 10 km` falha com a mensagem `expected 19 to be 21` em `frete.test.js:14`. A suíte tem 240 testes e leva 2 minutos.
- **Comando:** Descreva, em ordem, como você depuraria essa falha (leitura da mensagem, isolamento com `only`, modo watch, breakpoint e inspeção de variáveis) e o que deve ser removido antes de enviar a correção.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** S1
- **Contexto:** No code review dos seus testes do validador de CPF, a colega comentou: "o teste 'teste 1' não diz o que verifica", "faltou o caso com 10 dígitos" e "um teste confere três regras de uma vez".
- **Comando:** Escreva a resposta ao code review acolhendo as sugestões (ou discordando com fatos, se for o caso) e descreva as mudanças que você faria nos testes.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C5
- **Contexto:** Para a integração contínua passar antes do fim do expediente, um desenvolvedor apagou um teste vermelho do checkout e enviou outro arquivo com `it.only` esquecido.
- **Comando:** Explique os riscos de cada atitude para a equipe e para o cliente e descreva a conduta responsável diante de um teste vermelho.
- **Linhas:** 5

### ITEM 7
- **Capacidade:** C5
- **Contexto:** Observe o código final de `validarCPF` do capítulo, com seus três `return`.
- **Comando:** Usando a visão de caixa branca, liste cada caminho do código, o teste que o percorre e o valor de entrada usado, e indique se algum caminho ficou sem teste.
- **Linhas:** 6

## Resumo

- **TDD** é escrever o teste antes do código, em micro-ciclos **vermelho → verde → refatorar**.
- No vermelho, o teste falha pelo motivo esperado; no verde, o código mínimo; na refatoração, melhora-se o código com a barra verde.
- TDD é ideal para regras de negócio, validações e correção de defeitos; menos útil para ajustes visuais.
- Depure com método: mensagem, `only`, modo watch, **breakpoints** (variáveis e pilha de chamadas) e time-travel/trace no E2E.
- A visão de **caixa branca** confere se cada caminho tem teste; **responsabilidade** é nunca apagar teste vermelho nem enviar `only`/`skip`.
- No **code review**, acolha sugestões e ideias diferentes e discorde com fatos.

## Glossário

- **TDD:** escrever o teste antes do código.
- **Ciclo vermelho-verde-refatorar:** sequência do TDD: teste que falha, código mínimo que passa e melhoria do código.
- **Refatoração:** melhoria da estrutura interna do código sem mudar o seu comportamento.
- **Depuração (debugging):** processo de localizar, isolar e corrigir a causa de uma falha.
- **Breakpoint:** ponto de parada que pausa a execução para inspecionar o estado do programa.
- **Pilha de chamadas:** lista das funções em execução, mostrando o caminho até o ponto atual.
- **it.only:** marca que faz o framework rodar somente aquele teste (uso temporário na depuração).
- **it.skip:** marca que faz o framework pular um teste temporariamente.
- **Code review:** revisão do código (e dos testes) por um colega antes da junção ao projeto.
- **Dígito verificador:** dígito calculado a partir dos demais para detectar erros de digitação (ex.: no CPF).
