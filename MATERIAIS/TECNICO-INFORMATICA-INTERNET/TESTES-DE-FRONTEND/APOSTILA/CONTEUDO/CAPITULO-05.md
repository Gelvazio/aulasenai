# Capítulo 05 — Integração Avançada e Mock de APIs

- **Aula:** 05
- **Capacidade:** C5

## Teoria

### E quando o servidor cai no meio dos testes?

A suíte da **Loja Nuvem Azul** chamava a API de homologação de verdade. Numa manhã, o servidor
ficou fora do ar por uma hora e **todos** os testes do catálogo falharam — sem nenhum defeito no
front-end. Em outro dia, a API respondeu devagar e os testes passaram ou falharam "do nada". Testes
que dependem de rede real são **lentos, instáveis e caros**. A solução é **isolar a dependência**:
o teste controla exatamente o que a API responde.

> 🎯 **Objetivos do capítulo:** aplicar a **automação de testes** a telas que buscam dados,
> substituindo a API por um **mock** com o **MSW**; testar sucesso, **erros 404 e 500** e **rede
> lenta** (confiabilidade); usar **spies** para conferir chamadas; testar estado compartilhado e
> `localStorage`; e **executar** a suíte de forma rápida e determinística.

### Mock, stub e spy: os "dublês" de teste

| Dublê | O que faz | Exemplo |
|---|---|---|
| **Mock** | Substituto controlado de uma dependência, que responde o que o teste definir | A API de produtos simulada devolve 2 produtos |
| **Stub** | Resposta fixa, sem lógica | `buscarFrete` sempre devolve 15 |
| **Spy (espião)** | Observa uma função real (ou falsa) e registra como foi chamada | `vi.spyOn(window, 'fetch')` conta quantas requisições saíram |

O objetivo é sempre o mesmo: o teste deve depender **só do código que está sendo testado**, nunca
do humor da rede ou de um servidor externo.

### Por que não "mockar o fetch" direto?

Substituir `fetch` (ou o `axios`) por `vi.fn()` funciona em testes unitários, mas **acopla o teste
à biblioteca**: se o time trocar `fetch` por `axios`, todos os testes quebram — e erros de URL,
cabeçalho ou leitura do JSON passam despercebidos. O **MSW (Mock Service Worker)** intercepta a
requisição **na camada de rede**: o componente usa o cliente HTTP de produção, sem nenhuma
alteração, e quem responde é o servidor simulado.

### Configurando o MSW (Node + Vitest)

```bash
npm install -D msw
```

```js
// src/mocks/handlers.js — respostas padrão (o "caminho feliz")
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/produtos', () =>
    HttpResponse.json([
      { id: 1, nome: 'Camiseta azul', preco: 59.9 },
      { id: 2, nome: 'Boné preto', preco: 39.9 },
    ]),
  ),
];

// src/mocks/servidor.js — o servidor simulado (importado pelo setup e pelos testes)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const servidor = setupServer(...handlers);

// vitest.setup.js — ciclo de vida do servidor simulado
import '@testing-library/jest-dom/vitest';
import { servidor } from './src/mocks/servidor';

beforeAll(() => servidor.listen());
afterEach(() => {
  servidor.resetHandlers();
  localStorage.clear();
});
afterAll(() => servidor.close());
```

- `listen()` liga a interceptação antes de todos os testes;
- `resetHandlers()` desfaz as mudanças feitas em um teste (o próximo começa limpo);
- `close()` desliga o servidor no fim da suíte.

### O componente que busca dados

```jsx
// Catalogo.jsx
import { useEffect, useState } from 'react';

export function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch('/api/produtos');
        if (!resposta.ok) throw new Error(String(resposta.status));
        setProdutos(await resposta.json());
      } catch {
        setErro('Serviço indisponível, tente novamente');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p role="alert">{erro}</p>;
  return <ul>{produtos.map((p) => <li key={p.id}>{p.nome}</li>)}</ul>;
}
```

### Testando sucesso, erro 500 e rede lenta

```jsx
// Catalogo.test.jsx
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { http, HttpResponse, delay } from 'msw';
import { it, expect } from 'vitest';
import { servidor } from './mocks/servidor';
import { Catalogo } from './Catalogo';

it('mostra os produtos que a API devolve', async () => {
  render(<Catalogo />);
  expect(await screen.findAllByRole('listitem')).toHaveLength(2);
});

it('mostra mensagem amigável quando a API devolve erro 500', async () => {
  servidor.use(http.get('/api/produtos', () => new HttpResponse(null, { status: 500 })));
  render(<Catalogo />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Serviço indisponível');
});

it('mostra "Carregando..." enquanto a rede está lenta', async () => {
  servidor.use(
    http.get('/api/produtos', async () => {
      await delay(800);
      return HttpResponse.json([]);
    }),
  );
  render(<Catalogo />);
  await waitForElementToBeRemoved(() => screen.queryByText('Carregando...'));
});
```

- `servidor.use(...)` **sobrescreve** o handler **só naquele teste** (o `resetHandlers` restaura).
- Para o **404**, a mesma ideia: `new HttpResponse(null, { status: 404 })` e a tela deve mostrar
  uma mensagem de "não encontrado", sem quebrar.
- ⚠️ **Nunca** use `setTimeout` com tempo fixo no teste: `findBy`, `waitFor` e
  `waitForElementToBeRemoved` esperam **só o necessário**.

### Confiabilidade: a tela que não quebra

Testar erros de rede é testar a **confiabilidade** (tipo de teste 4.3): o sistema continua
utilizável quando algo dá errado. Perguntas que a suíte precisa responder:

- A API caiu (500)? Aparece aviso e um botão **Tentar novamente**?
- O recurso não existe (404)? A mensagem é amigável?
- A rede está lenta? O botão fica desabilitado (evita **clique duplo**) e há indicação de carregamento?
- Duas buscas seguidas voltaram **fora de ordem** (race condition)? A tela mostra a resposta mais recente?

### Spies: conferindo as chamadas

```js
it('busca os produtos uma única vez ao abrir a tela', async () => {
  const espiaoFetch = vi.spyOn(globalThis, 'fetch');
  render(<Catalogo />);
  await screen.findAllByRole('listitem');
  expect(espiaoFetch).toHaveBeenCalledTimes(1);
  expect(espiaoFetch).toHaveBeenCalledWith('/api/produtos');
});
```

O spy **observa** sem substituir: a requisição continua indo para o MSW. Restaure com
`vi.restoreAllMocks()` no `afterEach`.

### Estado compartilhado e localStorage

Componentes reais dependem de **provedores** (carrinho, usuário logado, tema). Em vez de repetir os
provedores em cada teste, crie um **render personalizado**:

```jsx
// tests/renderComProvedores.jsx
import { render } from '@testing-library/react';
import { CarrinhoProvider } from '../src/CarrinhoContext';

export function renderComProvedores(componente, { itensIniciais = [] } = {}) {
  return render(<CarrinhoProvider itensIniciais={itensIniciais}>{componente}</CarrinhoProvider>);
}
```

Para a **persistência**: grave os dados com `localStorage.setItem` **antes** de montar a tela,
renderize, confira com `findByText` que os itens aparecem e **limpe** o storage no `afterEach`
(senão um teste contamina o outro).

### Execução dos testes: rápida e determinística

- Rode só o arquivo em foco: `npx vitest run Catalogo`; a suíte inteira antes de enviar o código.
- Teste **determinístico** dá sempre o mesmo resultado: sem rede real, sem horários fixos e com
  dados limpos a cada teste.
- O aviso **"not wrapped in act(...)"** indica promessa terminando depois do teste: espere o
  resultado final com `findBy`/`waitFor` antes de encerrar.
- Mock com MSW no desenvolvimento e na integração contínua (rápido e gratuito); servidor real fica
  para os testes de ponta a ponta antes da publicação (capítulo 6).

## Vídeos

- [O que é Mock e Stub? Entenda a importância deles nos testes](https://www.youtube.com/watch?v=ARSCjYPh2bI) — 03:13 — AlgaWorks
- [Mocks, stubs, dummies, fakes, spies: dublês de teste](https://www.youtube.com/watch?v=9w4GpaOeX7M) — 10:40 — Otavio Lemos
- [How to mock API calls with Mock Service Worker in React (em inglês)](https://www.youtube.com/watch?v=6MhPKSGzDFk) — 11:51 — Codeching
- [How to test fetch or axios in a React component with MSW (em inglês)](https://www.youtube.com/watch?v=dReoPIwDccY) — 12:30 — Coding With Adam

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** A suíte do catálogo da Loja Nuvem Azul chama a API de homologação real: quando o servidor cai, todos os testes falham, e quando a rede está lenta, alguns passam e outros não.
- **Comando:** Explique por que esses testes são instáveis, o que é um mock e por que interceptar a rede com MSW é melhor do que substituir o `fetch` por `vi.fn()`.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C5
- **Contexto:** A tela de pedidos busca `GET /api/pedidos` e mostra cada pedido em um item de lista. O projeto ainda não tem o MSW configurado.
- **Comando:** Escreva o handler que devolve dois pedidos, o arquivo de setup com o ciclo de vida do servidor (`listen`, `resetHandlers`, `close`) e o teste que confere os dois itens na tela.
- **Linhas:** 10

### ITEM 3
- **Capacidade:** C5
- **Contexto:** Na mesma tela, quando a API devolve erro 500 deve aparecer "Serviço indisponível, tente novamente" e o botão **Tentar novamente**; quando a rede está lenta, aparece "Carregando..." até os dados chegarem.
- **Comando:** Escreva os dois testes sobrescrevendo o handler com `servidor.use`: um para o erro 500 (conferindo a mensagem exibida) e outro com `delay` (conferindo que "Carregando..." aparece e depois some), sem usar `setTimeout`.
- **Linhas:** 10

### ITEM 4
- **Capacidade:** C5
- **Contexto:** Um bug foi relatado: ao clicar duas vezes rápido em **Finalizar compra**, saem duas requisições `POST /api/pedidos` e o cliente é cobrado duas vezes.
- **Comando:** Descreva um teste que use um spy (`vi.spyOn(globalThis, 'fetch')`) e rede lenta para provar que só uma requisição é enviada e que o botão fica desabilitado enquanto espera.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C5
- **Contexto:** O carrinho salva os itens em `localStorage` com a chave `@carrinho` e, ao abrir a página, recupera os itens salvos. Um teste passa sozinho, mas falha quando roda depois de outro.
- **Comando:** Coloque em ordem as etapas do teste de recuperação do carrinho (gravar, renderizar, conferir, limpar), explique a causa da falha intermitente e como o `afterEach` resolve.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C5
- **Contexto:** A busca de produtos dispara uma requisição a cada letra digitada. Às vezes a resposta de "cam" chega depois da de "camiseta" e a tela mostra o resultado antigo.
- **Comando:** Explique o que é essa race condition e descreva como simular o problema no teste com MSW (latências diferentes por termo) e qual resultado o teste deve exigir na tela.
- **Linhas:** 6

## Resumo

- Testes com **rede real** são lentos e instáveis; o teste deve controlar o que a API responde.
- **Mock** é o substituto controlado de uma dependência; **stub** dá resposta fixa; **spy** observa as chamadas.
- O **MSW** intercepta na camada de rede: o componente usa o `fetch` de produção e o teste define a resposta (handlers + `listen`/`resetHandlers`/`close`).
- `servidor.use` sobrescreve o handler em um teste para simular **404, 500 e rede lenta** (`delay`) — testes de **confiabilidade**.
- Espere com `findBy`, `waitFor` e `waitForElementToBeRemoved`, nunca com `setTimeout` fixo.
- **Render personalizado** com provedores e `localStorage.clear()` no `afterEach` mantêm a suíte **determinística**.

## Glossário

- **Mock:** substituto controlado de uma dependência.
- **Stub:** dublê de teste que devolve uma resposta fixa, sem lógica.
- **Spy:** espião que registra como uma função foi chamada, sem mudar o que ela faz.
- **MSW (Mock Service Worker):** ferramenta que intercepta requisições na camada de rede e devolve respostas simuladas.
- **Handler:** regra do MSW que define a resposta para um endereço da API.
- **Interceptação:** captura de uma requisição HTTP antes que ela chegue ao servidor real.
- **Latência:** tempo de espera entre a requisição e a resposta da rede.
- **Race condition:** defeito em que respostas chegam fora de ordem e a resposta antiga sobrescreve a recente.
- **Persistência:** manutenção dos dados depois de recarregar a página (ex.: `localStorage`).
- **Teste determinístico:** teste que dá sempre o mesmo resultado nas mesmas condições.
