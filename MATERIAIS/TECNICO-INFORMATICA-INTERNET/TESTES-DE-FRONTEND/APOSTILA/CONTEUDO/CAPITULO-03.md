# Capítulo 03 — Testes Unitários no Front-End com Vitest

- **Aula:** 03
- **Capacidade:** C5

## Teoria

### Mexi numa função. Será que quebrei o checkout?

Na **Loja Nuvem Azul**, a função que calcula o frete é usada no carrinho, no checkout e na
página do produto. Um desenvolvedor muda uma linha para "melhorar" o cálculo. Sem testes, a única
forma de saber se nada quebrou é clicar em todas as telas — e torcer. Com uma **suíte de testes
unitários**, a resposta vem em milissegundos, a cada vez que o arquivo é salvo.

> 🎯 **Objetivos do capítulo:** entender o que é **automação de testes** e os **frameworks**
> do front-end, configurar o **Vitest**, escrever testes unitários com o padrão **AAA** e os
> **matchers** adequados, simular dependências com **vi.fn** e aplicar a visão de **caixa
> branca** para cobrir todos os caminhos do código.

### Automação de testes: definição e frameworks

**Automação de testes** é usar código (scripts) para executar testes repetíveis sem intervenção
humana. O teste automatizado roda igual 1 ou 1.000 vezes, em segundos, sempre que o código muda.

| Framework | Para quê | Nível da pirâmide |
|---|---|---|
| **Vitest** (ou Jest, com API parecida) | Rodar testes e fazer asserções em JavaScript/TypeScript | Unitário e integração |
| **Testing Library** | Testar componentes pelo que o usuário vê | Integração (capítulos 4 e 5) |
| **Cypress / Playwright** | Automatizar o navegador de ponta a ponta | E2E (capítulo 6) |

O **Vitest** é rápido (usa o mesmo motor do Vite), entende ES Modules e TypeScript e tem o
**modo watch**, que roda de novo os testes afetados a cada vez que você salva.

### Configurando o Vitest

```bash
npm init -y
npm install -D vitest
```

No `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- `npm test` abre o modo watch (uso no dia a dia);
- `npm run test:run` roda uma vez e termina (uso na integração contínua).

**Nomes dos arquivos:** o Vitest encontra sozinho arquivos `*.test.js` e `*.spec.js`. Mantenha
`frete.test.js` ao lado de `frete.js`.

### Estrutura de um teste: describe, it e expect

- `describe('calcularFrete', ...)` agrupa os testes de uma unidade — uma **suíte**.
- `it('dá frete grátis a partir de R$ 200', ...)` (ou `test`) declara um caso de teste.
- `expect(valor).matcher(esperado)` é a asserção: se não bater, o teste falha e o terminal mostra
  a diferença. **Teste sem `expect` não testa nada.**

### O padrão AAA na prática

```js
// frete.js
export function calcularFrete(totalCarrinho, distanciaKm) {
  if (totalCarrinho < 0 || distanciaKm < 0) {
    throw new Error('Valores inválidos');
  }
  if (totalCarrinho >= 200) return 0;
  if (distanciaKm <= 10) return 15;
  return 15 + (distanciaKm - 10) * 2;
}

// frete.test.js
import { describe, it, expect } from 'vitest';
import { calcularFrete } from './frete';

describe('calcularFrete', () => {
  it('dá frete grátis a partir de R$ 200', () => {
    const total = 200;                         // Arrange
    const frete = calcularFrete(total, 30);    // Act
    expect(frete).toBe(0);                     // Assert
  });

  it('cobra R$ 2 por km acima de 10 km', () => {
    expect(calcularFrete(100, 12)).toBe(19);
  });

  it('recusa valores negativos', () => {
    expect(() => calcularFrete(-1, 5)).toThrow('Valores inválidos');
  });
});
```

Deixe a etapa **Act** em uma linha e separe visualmente as três etapas.

### Matchers: escolhendo a asserção certa

| Matcher | Quando usar | Exemplo |
|---|---|---|
| `toBe` | Valores primitivos (número, texto, booleano) | `expect(calcularFrete(200, 5)).toBe(0)` |
| `toEqual` | Objetos e arrays (compara o conteúdo) | `expect(pedido).toEqual({ id: 1, status: 'pago' })` |
| `toContain` | Item dentro de array ou trecho de texto | `expect(perfis).toContain('ADMIN')` |
| `toBeNull` / `toBeDefined` | Resultado vazio / variável preenchida | `expect(buscarCupom('XYZ')).toBeNull()` |
| `toBeGreaterThan` | Comparações numéricas | `expect(itens.length).toBeGreaterThan(0)` |
| `toThrow` | A função deve lançar erro | `expect(() => f(-1)).toThrow()` |

⚠️ **Armadilha clássica:** `expect({ id: 1 }).toBe({ id: 1 })` **falha**, porque são dois objetos
diferentes na memória. Para objetos e arrays, use `toEqual`.

### Isolando dependências com vi.fn e vi.spyOn

Teste unitário não acessa rede, banco nem envia e-mail de verdade. Para isso, a dependência é
**simulada**:

```js
import { it, expect, vi } from 'vitest';

function finalizarPedido(pedido, enviarEmail) {
  enviarEmail(pedido.emailCliente, `Pedido ${pedido.id} confirmado`);
  return { ...pedido, status: 'confirmado' };
}

it('confirma o pedido e envia o e-mail', () => {
  const enviarEmail = vi.fn();
  const pedido = { id: 42, emailCliente: 'ana@nuvemazul.test' };

  const resultado = finalizarPedido(pedido, enviarEmail);

  expect(enviarEmail).toHaveBeenCalledWith('ana@nuvemazul.test', 'Pedido 42 confirmado');
  expect(resultado).toEqual({ id: 42, emailCliente: 'ana@nuvemazul.test', status: 'confirmado' });
});
```

- `vi.fn()` cria uma função falsa que lembra **como foi chamada**.
- `vi.spyOn(objeto, 'metodo')` observa (e pode substituir) um método que já existe.
- Use `afterEach(() => vi.restoreAllMocks())` para um teste não contaminar o outro.

### Caixa branca: cobrir todos os caminhos

Olhando o código de `calcularFrete`, há **quatro caminhos**: valores negativos (erro), total a
partir de 200 (grátis), até 10 km (taxa fixa) e acima de 10 km (taxa por km). Cada caminho precisa
de pelo menos um teste — e as **bordas** (199,99 e 200; 10 e 11 km) são onde os defeitos se
escondem.

### Boas práticas

- Cada teste é **independente**: prepara seus dados e não depende da ordem de execução.
- Use `beforeEach` para recriar objetos antes de cada teste.
- Teste o **comportamento** (o que a função devolve), não detalhes internos.
- Nomeie os testes como frases: "cobra R$ 2 por km acima de 10 km".

## Vídeos

- [Vitest: instalação e configuração](https://www.youtube.com/watch?v=FWXy_Kz-jwc) — 11:04 — Pablo Codes
- [Testes unitários no front-end](https://www.youtube.com/watch?v=MfEcEjSaO_E) — 08:25 — Rodrigo Gabriel Dev
- [toBe() × toEqual() e outros matchers](https://www.youtube.com/watch?v=RT3ISoUUSkU) — 10:14 — Seeema Holiday Developer

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** Você recebeu o projeto da Loja Nuvem Azul sem nenhuma ferramenta de testes e precisa começar a suíte de funções utilitárias.
- **Comando:** Liste os comandos para instalar o Vitest, os scripts que devem ir no `package.json` (para uso diário e para a integração contínua) e explique onde e com que nome criar o arquivo de testes de `formatarCep.js`.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C5
- **Contexto:** Use a função `calcularFrete(totalCarrinho, distanciaKm)` do capítulo: erro para valores negativos, grátis a partir de R$ 200, R$ 15 até 10 km e R$ 2 por km excedente.
- **Comando:** Escreva uma suíte com 6 testes Vitest no padrão AAA cobrindo os casos de borda (199,99 e 200; 10 e 11 km; valor negativo), com nomes descritivos e o matcher adequado em cada um.
- **Linhas:** 12

### ITEM 3
- **Capacidade:** C5
- **Contexto:** Você precisa conferir: (a) o texto "R$ 15,00"; (b) o objeto `{ id: 7, status: 'pago' }`; (c) se a lista de cupons contém "NUVEM10"; (d) se a busca de um cupom inexistente devolve `null`; (e) se `aplicarCupom('')` lança erro; (f) se o total do carrinho é maior que zero.
- **Comando:** Indique o matcher adequado para cada situação e escreva a linha do `expect` correspondente.
- **Linhas:** 6

### ITEM 4
- **Capacidade:** C5
- **Contexto:** Um colega escreveu: `it('carrinho', () => { carrinho.push({ id: 1 }); expect(carrinho[0]).toBe({ id: 1 }); });` e um segundo teste que só passa se esse rodar antes, porque usa o mesmo array `carrinho`.
- **Comando:** Aponte os três problemas (matcher, nome do teste e dependência entre testes) e reescreva os testes de forma independente, com `beforeEach`.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C5
- **Contexto:** A função `cancelarPedido(pedido, registrarLog)` muda o status do pedido para "cancelado" e chama `registrarLog('Pedido <id> cancelado')`. Nos testes, o log não pode ser gravado de verdade.
- **Comando:** Escreva um teste com `vi.fn()` que confira o objeto retornado e a chamada do log com o texto exato.
- **Linhas:** 7

### ITEM 6
- **Capacidade:** C5
- **Contexto:** A função `classificarCliente(totalComprado)` devolve "novo" se o total for 0, "bronze" até R$ 500, "prata" até R$ 2.000 e "ouro" acima disso.
- **Comando:** Usando a visão de caixa branca, liste todos os caminhos do código e os valores de borda que a suíte precisa testar, e organize os testes em um `describe`.
- **Linhas:** 6

## Resumo

- **Automação de testes** executa testes repetíveis por código; frameworks: Vitest/Jest (unitário), Testing Library (integração) e Cypress/Playwright (E2E).
- Configure com `npm install -D vitest` e os scripts `vitest` (watch) e `vitest run` (CI); arquivos `*.test.js` ao lado do código.
- **describe** agrupa (suíte), **it/test** declara o caso e **expect** faz a asserção; siga o padrão **AAA**.
- Escolha o **matcher** certo: `toBe` para primitivos, `toEqual` para objetos e arrays, `toContain`, `toBeNull`, `toThrow`...
- **vi.fn** e **vi.spyOn** isolam dependências; restaure os mocks depois de cada teste.
- Pela **caixa branca**, cada caminho e cada borda do código precisa de teste; testes independentes e com nomes claros.

## Glossário

- **Suíte:** conjunto organizado de testes.
- **Automação de testes:** execução de testes por meio de scripts, sem intervenção humana.
- **Framework de testes:** ferramenta que roda os testes e oferece funções de asserção (ex.: Vitest).
- **Asserção:** verificação que compara o resultado obtido com o esperado (`expect`).
- **Matcher:** método que define como comparar na asserção (ex.: `toBe`, `toEqual`).
- **describe:** função que agrupa testes relacionados em uma suíte.
- **Modo watch:** execução automática dos testes a cada alteração salva.
- **vi.fn:** função simulada que registra como foi chamada.
- **vi.spyOn:** espião que observa (e pode substituir) um método existente.
- **beforeEach:** função executada antes de cada teste para preparar o estado.
