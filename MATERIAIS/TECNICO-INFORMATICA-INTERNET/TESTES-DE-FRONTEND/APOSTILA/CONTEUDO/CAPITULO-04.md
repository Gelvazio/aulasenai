# Capítulo 04 — Testes de Integração com DOM (Testing Library)

- **Aula:** 04
- **Capacidade:** C4, C5

## Teoria

### O teste passou, mas o botão sumiu

Na **Loja Nuvem Azul**, os testes unitários do carrinho passavam todos. Mesmo assim, depois de
uma mudança no CSS, o botão **Adicionar ao carrinho** ficou escondido atrás da imagem do produto e
ninguém conseguia clicar. Os testes conferiam variáveis internas, não a tela. Testes de
**integração com o DOM** verificam se as partes funcionam **juntas**, do jeito que o usuário usa:
lendo textos, clicando em botões e preenchendo campos.

> 🎯 **Objetivos do capítulo:** aplicar a filosofia da **Testing Library**, encontrar elementos
> pelo **papel (role) e pelo texto**, simular o usuário com **user-event** e escrever testes de
> **botões e formulários** como testes funcionais de **caixa preta**.

### A filosofia: testar o comportamento visível

> "Quanto mais os seus testes se parecerem com a forma como o software é usado, mais confiança
> eles podem dar." — princípio da Testing Library (Kent C. Dodds)

| Testar a implementação ❌ | Testar o comportamento ✅ |
|---|---|
| Conferir o estado interno `contador = 1` | Conferir o texto "Total: 1" na tela |
| Buscar pelo seletor `.btn-primary` | Buscar o botão com o nome "Adicionar ao carrinho" |
| Quebra quando alguém renomeia uma classe CSS | Só quebra quando o usuário seria afetado |

Esse é um teste **funcional de caixa preta**: entra a ação do usuário, sai o que ele vê — sem olhar
o código do componente. Ele verifica a **funcionalidade** (a regra de negócio funcionando na tela).

### Preparando o ambiente (React + Vitest)

```bash
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vitejs/plugin-react
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: './vitest.setup.js' },
});

// vitest.setup.js
import '@testing-library/jest-dom/vitest';
```

- **jsdom** simula o navegador dentro do Node (document, eventos).
- **jest-dom** acrescenta matchers como `toBeInTheDocument`, `toBeVisible`, `toBeDisabled`.

### Hierarquia de consultas (queries)

| Prioridade | Consulta | Quando usar |
|---|---|---|
| 1 | `getByRole('button', { name: 'Entrar' })` | Quase sempre: botões, links, títulos, caixas de texto |
| 2 | `getByLabelText('E-mail')` | Campos de formulário com rótulo |
| 3 | `getByPlaceholderText('Buscar...')` | Campos sem rótulo (ex.: busca) |
| 4 | `getByText('Frete grátis')` | Textos sem papel específico |
| Último recurso | `getByTestId('grafico')` | Elementos sem significado para o usuário |

**Bônus de acessibilidade:** se o teste não encontra o botão por `getByRole`, um leitor de tela
também não vai encontrar — a `<div>` clicável precisa virar `<button>`.

### getBy, queryBy e findBy

- `getBy...` — o elemento **tem de estar** na tela (senão o teste falha).
- `queryBy...` — devolve `null` se não achar: use para provar que algo **sumiu**
  (`expect(screen.queryByText('E-mail inválido')).not.toBeInTheDocument()`).
- `findBy...` — **espera** o elemento aparecer (devolve uma promessa; use `await`), ideal para
  conteúdo que chega depois.

### Simulando o usuário com user-event

`user-event` reproduz a sequência real de eventos (foco, teclas, clique). Prefira-o ao
`fireEvent`. Sempre com `await`:

```jsx
// BotaoSeguir.jsx
import { useState } from 'react';

export function BotaoSeguir({ aoSeguir }) {
  const [seguindo, setSeguindo] = useState(false);
  function alternar() {
    setSeguindo(!seguindo);
    aoSeguir(!seguindo);
  }
  return <button onClick={alternar}>{seguindo ? 'Seguindo' : 'Seguir'}</button>;
}

// BotaoSeguir.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, vi } from 'vitest';
import { BotaoSeguir } from './BotaoSeguir';

it('muda para "Seguindo" e avisa quem usa o componente', async () => {
  const user = userEvent.setup();
  const aoSeguir = vi.fn();
  render(<BotaoSeguir aoSeguir={aoSeguir} />);

  await user.click(screen.getByRole('button', { name: 'Seguir' }));

  expect(screen.getByRole('button', { name: 'Seguindo' })).toBeInTheDocument();
  expect(aoSeguir).toHaveBeenCalledWith(true);
});
```

### Exemplo: lista filtrável buscada por papel e texto

```jsx
// ListaProdutos.jsx
import { useState } from 'react';

export function ListaProdutos({ produtos }) {
  const [busca, setBusca] = useState('');
  const visiveis = produtos.filter((p) => p.toLowerCase().includes(busca.toLowerCase()));
  return (
    <div>
      <label htmlFor="busca">Buscar produto</label>
      <input id="busca" value={busca} onChange={(e) => setBusca(e.target.value)} />
      <ul>
        {visiveis.map((p) => <li key={p}>{p}</li>)}
      </ul>
      {visiveis.length === 0 && <p>Nenhum produto encontrado</p>}
    </div>
  );
}

// ListaProdutos.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import { ListaProdutos } from './ListaProdutos';

it('filtra a lista pelo texto digitado', async () => {
  const user = userEvent.setup();
  render(<ListaProdutos produtos={['Camiseta azul', 'Boné preto', 'Camiseta branca']} />);

  await user.type(screen.getByLabelText('Buscar produto'), 'camiseta');

  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText('Boné preto')).not.toBeInTheDocument();
});
```

**Por que não buscar pela classe CSS?** Classes mudam por motivos visuais (novo tema, nova
biblioteca de estilos) sem que o comportamento mude. O teste preso a `.item-lista` quebraria à toa;
o teste que busca `listitem` e o texto continua válido enquanto o usuário vê a mesma coisa.

### Testando formulários

Roteiro típico: renderizar → achar o campo pelo **rótulo** → digitar um valor inválido → conferir a
mensagem de erro **visível** → corrigir → conferir que a mensagem sumiu (`queryBy`) e que o botão
**Cadastrar** ficou habilitado (`toBeEnabled`).

### Armadilhas comuns

- Esquecer o `await` antes de `user.click`, `user.type` ou `findBy`.
- Usar `getBy` para verificar ausência (use `queryBy`).
- Usar `data-testid` quando existe papel ou rótulo.
- Quando um teste falha, `screen.debug()` mostra o HTML atual e a mensagem de erro lista os papéis
  disponíveis — use isso para corrigir a consulta.

## Vídeos

- [Writing integration tests — React testing for beginners (em inglês)](https://www.youtube.com/watch?v=52-QICDljww) — 08:01 — Syntax
- [Finding elements by role — getByRole (em inglês)](https://www.youtube.com/watch?v=YIVz3j9s1z4) — 03:38 — Technical Rajni
- [Using getByRole in React (em inglês)](https://www.youtube.com/watch?v=Px-H5Eplg90) — 07:45 — Timothy Amo

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** O projeto da Loja Nuvem Azul já tem Vitest para funções, mas ainda não consegue testar componentes React com o DOM.
- **Comando:** Liste os pacotes a instalar e explique o papel de cada um (Testing Library, user-event, jest-dom, jsdom) e o que deve ir no `vitest.config.js` e no arquivo de setup.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C4, C5
- **Contexto:** O componente `BotaoCarrinho` mostra "Adicionar ao carrinho"; ao ser clicado, troca o texto para "Adicionado ✓" e chama a função `aoAdicionar` recebida por propriedade.
- **Comando:** Escreva o teste com Testing Library e user-event no padrão AAA, buscando o botão pelo papel e pelo nome e conferindo o novo texto e a chamada da função.
- **Linhas:** 9

### ITEM 3
- **Capacidade:** C4
- **Contexto:** Você precisa localizar: (a) o botão "Finalizar compra"; (b) o campo com rótulo "E-mail"; (c) a busca com placeholder "Buscar produtos..."; (d) a confirmação de que o modal de cupom NÃO está aberto; (e) a mensagem "Pedido realizado" que aparece depois de alguns instantes.
- **Comando:** Indique a consulta adequada para cada caso (getBy, queryBy ou findBy e o tipo: Role, LabelText, PlaceholderText ou Text) e justifique.
- **Linhas:** 6

### ITEM 4
- **Capacidade:** C4, C5
- **Contexto:** No formulário de cadastro, a senha com menos de 6 caracteres mostra "A senha deve ter no mínimo 6 dígitos" e o botão "Cadastrar" fica desabilitado; com a senha válida, a mensagem some e o botão habilita.
- **Comando:** Escreva o roteiro do teste de integração (consultas, digitação e asserções com os matchers de jest-dom) cobrindo a senha inválida e a correção.
- **Linhas:** 8

### ITEM 5
- **Capacidade:** C4
- **Contexto:** Um teste da lista de produtos faz `container.querySelector('.item-lista')` e confere o estado interno `filtroAtivo === true`. Depois de trocar o tema visual, ele quebrou, embora a lista funcione igual para o usuário.
- **Comando:** Explique por que esse teste é frágil (falso negativo) e reescreva a ideia do teste buscando os elementos por papel e texto.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C5
- **Contexto:** Use o componente `ListaProdutos` do capítulo (campo "Buscar produto", lista de itens e a mensagem "Nenhum produto encontrado").
- **Comando:** Escreva um teste que digite um termo sem resultados e confira que nenhum item aparece e que a mensagem "Nenhum produto encontrado" é exibida.
- **Linhas:** 7

## Resumo

- Testes de **integração com DOM** verificam as partes funcionando juntas, como o usuário vê — **caixa preta** e **funcionalidade**.
- **Testing Library:** teste o comportamento visível, não a implementação; classes CSS e estado interno deixam o teste frágil.
- Prioridade das consultas: **getByRole** → getByLabelText → getByPlaceholderText → getByText → getByTestId (último recurso).
- **getBy** (tem de estar), **queryBy** (para ausência) e **findBy** (espera, com `await`).
- **user-event** simula o usuário de verdade; **jest-dom** traz matchers como `toBeInTheDocument`, `toBeVisible` e `toBeDisabled`.
- Formulários: rótulo → digitação inválida → mensagem visível → correção → mensagem some e botão habilita.

## Glossário

- **Teste de integração:** teste de várias partes funcionando juntas (componente, DOM, eventos).
- **DOM:** estrutura da página que o navegador monta a partir do HTML.
- **Testing Library:** biblioteca que testa componentes pelo que o usuário vê e faz.
- **jsdom:** simulação do navegador dentro do Node, usada nos testes.
- **Role (papel):** função acessível de um elemento na tela (botão, link, caixa de texto, item de lista).
- **Nome acessível:** texto que identifica um elemento para leitores de tela (ex.: o rótulo do botão).
- **getByRole:** consulta que encontra um elemento pelo papel e pelo nome acessível.
- **queryBy:** consulta que devolve nulo quando o elemento não existe, usada para provar ausência.
- **findBy:** consulta assíncrona que espera o elemento aparecer na tela.
- **user-event:** biblioteca que simula as interações reais do usuário (clicar, digitar).
