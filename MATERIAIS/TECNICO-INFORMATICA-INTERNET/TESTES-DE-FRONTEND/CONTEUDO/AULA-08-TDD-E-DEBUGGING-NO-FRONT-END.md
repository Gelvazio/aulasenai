# Aula 08 — TDD e Debugging Moderno no Front-End

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 06/11
- **Conhecimentos (ementa do curso):** 2.3 Aplicação · 3.2 Teste estrutural (caixa branca) ·
  1.1 Responsabilidade
- **Capacidades:** C5 — Desenvolver conjunto de testes automatizados · S1 — Valorizar novos fatos,
  ideias e opiniões diferentes para resolução de problemas pertinentes as atividades sob a sua
  responsabilidade
- **Estratégias:** programação em par (piloto e copiloto), código ao vivo, depuração guiada, code
  review entre duplas
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md)

## Indicadores

- (11) Aplica ciclo TDD (vermelho → verde → refatorar) e depura teste que falha (C5).
- (14) Acolhe sugestões no code review de testes do colega (S1).

## Objetivos

- Explicar o desenvolvimento guiado por testes (TDD) e quando ele vale a pena.
- Construir uma função com TDD em ciclos pequenos: vermelho, verde e refatorar (2.3).
- Usar a visão de caixa branca (3.2) para escolher o próximo teste de cada ciclo.
- Depurar um teste que falha com breakpoint no VS Code e `it.only`.
- Fazer e receber code review de testes com respeito, aceitando sugestões (S1).
- Assumir a responsabilidade (1.1) pelo código entregue: só "pronto" com testes passando.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: cobertura, branches e pontos cegos (aula 7) |
| Exposição com código ao vivo | 35 min | Ciclo TDD; tamanho do passo; quando usar TDD; depuração |
| Prática guiada | 50 min | Validador de CPF em 4 ciclos TDD, em par (troca de piloto a cada ciclo) |
| Intervalo | 15 min | — |
| Prática autônoma | 60 min | Filtro de produtos com TDD (5 testes, pelo comportamento visível) |
| Depuração | 30 min | Defeito proposital no CPF: breakpoint, `it.only` e registro da causa |
| Dinâmica e entrega | 35 min | "Code review de ouro" (abaixo) e entrega da tabela de ciclos |

## Conteúdo

### 1. O que é TDD
No **TDD (Test-Driven Development)** o teste é escrito **antes** do código. O teste descreve o
próximo comportamento desejado; o código só existe para fazê-lo passar. O ciclo é curto (minutos)
e se repete:

| Fase | O que fazer | Como saber que terminou |
|---|---|---|
| 🔴 **Vermelho** | Escrever **um** teste que falha | O Vitest mostra a falha **pelo motivo esperado** |
| 🟢 **Verde** | Escrever o **mínimo** de código para passar | Todos os testes verdes |
| 🔵 **Refatorar** | Melhorar nomes, tirar duplicação, extrair funções | Continua tudo verde |

Rodar em modo observação (`npx vitest`) dá a resposta a cada arquivo salvo.

**Vantagens:** o código já nasce testado; o projeto fica simples (só o necessário); o teste serve de
documentação do comportamento. **Quando não usar:** cores, espaçamentos e layout — isso se confere
visualmente e com testes de acessibilidade, não com TDD.

### 2. TDD na prática: validador de CPF

**Ciclo 1 — vermelho:** a função ainda nem existe.

```js
// tests/validarCPF.test.js
import { describe, it, expect } from 'vitest';
import { validarCPF } from '../src/validarCPF.js';

describe('validarCPF', () => {
  it('rejeita valor vazio', () => {
    expect(validarCPF('')).toBe(false);
  });
});
```

**Ciclo 1 — verde:** o mínimo é `export function validarCPF() { return false; }`. Parece "trapaça",
mas é proposital: o próximo teste obriga o código a evoluir.

**Ciclos 2 e 3:** CPF com letras ou com tamanho diferente de 11 dígitos é inválido; CPF com todos
os dígitos iguais (`111.111.111-11`) é inválido.

**Ciclo 4:** dígitos verificadores.

```js
it('aceita CPF com dígitos verificadores corretos', () => {
  expect(validarCPF('529.982.247-25')).toBe(true);
});

it('rejeita CPF com dígito verificador errado', () => {
  expect(validarCPF('52998224726')).toBe(false);
});
```

**Código ao final dos 4 ciclos, já refatorado:**

```js
// src/validarCPF.js
const PADRAO_ONZE_DIGITOS = /^\d{11}$/;
const PADRAO_DIGITOS_IGUAIS = /^(\d)\1{10}$/;

function calcularDigito(base, pesoInicial) {
  const soma = [...base].reduce(
    (total, digito, posicao) => total + Number(digito) * (pesoInicial - posicao),
    0,
  );
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function validarCPF(valor) {
  const numeros = String(valor).replace(/[.-]/g, '');
  if (!PADRAO_ONZE_DIGITOS.test(numeros)) return false;
  if (PADRAO_DIGITOS_IGUAIS.test(numeros)) return false;

  const primeiroDigito = calcularDigito(numeros.slice(0, 9), 10);
  const segundoDigito = calcularDigito(numeros.slice(0, 10), 11);
  return numeros.endsWith(`${primeiroDigito}${segundoDigito}`);
}
```

Se um teste novo passa **direto para o verde**, ele não testava nada novo: reveja o caso.

### 3. Caixa branca guiando o próximo teste (3.2)
Depois de cada verde, olhe o código: há um `if` cujo outro lado nenhum teste exercita? Esse é o
próximo teste. No CPF, o `resto < 2` tem dois caminhos, e cada um precisa de um CPF válido:
`111.444.777-35` passa pelo caminho `11 - resto` nos dois dígitos; `123.456.789-09` passa pelo
caminho do dígito 0 (primeiro dígito).

### 4. TDD no componente: filtro de produtos
O mesmo ciclo vale para a interface, testando o que o usuário **vê**:
1. Sem texto digitado → todos os produtos aparecem (`getAllByRole('listitem')`).
2. Digitar `mouse` → só os produtos com "mouse" no título.
3. A busca ignora maiúsculas e acentos (`TECLADO` encontra "Teclado").
4. Categoria **Periféricos** + texto → os dois filtros combinados.
5. Nada encontrado → mensagem **Nenhum produto encontrado**.

### 5. Depuração moderna
Quando um teste falha e a causa não é óbvia:
1. **Ler a mensagem:** `expected true, received false` + a linha do teste.
2. **Isolar:** `it.only(...)` roda só aquele teste; `describe.only`, só aquele grupo.
3. **Breakpoint:** no VS Code, *Run and Debug* → *JavaScript Debug Terminal* → `npx vitest run`;
   o código para na linha marcada e mostra o valor de cada variável.
4. **Inspecionar no DOM:** `screen.debug()` imprime o HTML atual no teste de componente.
5. **Corrigir e confirmar:** tirar o `.only`, rodar a suíte inteira e registrar a causa.

Nunca deixe `it.only` ou `console.log` de depuração no código entregue (responsabilidade, 1.1).

### 6. Code review de testes (S1)
No code review, outra pessoa lê os testes antes de juntar o código. Perguntas úteis:
- O nome do teste descreve o comportamento?
- O teste falharia se o código estivesse errado?
- Há casos de borda faltando?
- O teste depende de outro teste ou de dado externo?
- As queries seguem o comportamento visível?
- O que você aprendeu com este código?

Quem comenta sugere com respeito ("Que tal testar também o CPF com dígito 0?"); quem recebe avalia
a sugestão pelo **fato técnico**, não pela pessoa, e responde aceitando ou explicando por que não.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado porque o cadastro de clientes de uma loja virtual aceita
CPFs inválidos e recusa alguns válidos. O código atual não tem testes. Você aplica TDD numa nova
função: primeiro os testes dos casos relatados pelos clientes (que falham na função antiga), depois
o código mínimo, ciclo a ciclo. Na depuração, descobre que a função antiga usava `resto <= 2`,
recusando todo CPF cujo dígito deveria ser 9. O relatório traz a tabela dos ciclos, que comprova o
comportamento novo.

## Dinâmica — Code review de ouro (20 min, duplas de duplas)
- **Objetivo:** praticar o code review de testes com respeito e acolher sugestões (S1, 1.1).
- **Materiais:** o repositório de cada dupla e um cartão com as 6 perguntas do code review.
- **Passo a passo:** (1) a dupla A lê os testes do CPF da dupla B e escreve 2 elogios e 2
  sugestões, cada sugestão começando por "Que tal…"; (2) a dupla B responde a cada sugestão:
  "aceito, porque…" ou "não vou aplicar, porque…" (com fato técnico); (3) invertem; (4) cada dupla
  aplica pelo menos 1 sugestão aceita.
- **Fechamento:** o professor pede exemplos de sugestões que mudaram o código e reforça a diferença
  entre criticar o código e criticar a pessoa.

## Situação-problema e entrega da aula
- **Entrega:** repositório com o validador de CPF e o filtro de produtos feitos com TDD + tabela
  `Ciclo | Teste escrito | Falhou por quê | Código mínimo | Refatoração` + registro da depuração
  (onde estava o defeito e qual teste o revelou) + a sugestão de code review aplicada.
- **Ligação com a SA 2:** as funções criadas com TDD chegam à aula 9 com cobertura alta, prontas
  para o pipeline.

## Verificação da aprendizagem
- Colocar em ordem e explicar: refatorar, escrever teste que falha, código mínimo.
- Por que o primeiro "verde" pode ser `return false`?
- Um teste novo passou sem mudar o código. O que isso indica?
- Para que serve `it.only` e por que não pode ir para o repositório?
- Reescrever com respeito o comentário "esse teste está horrível".

## Recursos
Laboratório de informática, computador com acesso à internet, IDE para desenvolvimento de testes
(VS Code com depurador), Node.js e npm, kit multimídia, cartões do code review, slides
`../AULAS/AULA-08-SLIDES.pdf` (apresentação) e apostila da UC (capítulo 8).
