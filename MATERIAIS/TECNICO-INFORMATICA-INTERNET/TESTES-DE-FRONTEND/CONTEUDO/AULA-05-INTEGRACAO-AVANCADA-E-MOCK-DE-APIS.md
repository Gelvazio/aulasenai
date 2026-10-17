# Aula 05 — Integração Avançada e Mock de APIs

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 29/10
- **Conhecimentos (ementa do curso):** 2.3 Aplicação · 4.3 Confiabilidade · 7.3 Execução dos Testes
- **Capacidades:** C5 — Desenvolver conjunto de testes automatizados
- **Estratégias:** exposição dialogada com código ao vivo, prática guiada, dinâmica em grupos,
  debate
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md)

## Indicadores

- (8) Isola dependências com mocks de API e spies (C5).

## Objetivos

- Explicar por que os testes de integração não devem depender da API real.
- Simular a API com o **MSW** (Mock Service Worker) e testar sucesso e erro (2.3).
- Testar a **confiabilidade** (4.3) da tela: erro 500, 404 e rede lenta.
- Esperar o resultado assíncrono sem tempo fixo (`findBy`, `waitFor`).
- Testar dados guardados no `localStorage` com isolamento entre os testes.
- Executar a suíte e ler o resultado de cada execução (7.3).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: queries e `userEvent` (aula 4) |
| Exposição com código ao vivo | 40 min | Mock de API; MSW; assincronismo; confiabilidade; execução e leitura do resultado |
| Prática guiada | 30 min | Passo 0: instalar e configurar o MSW; primeiro teste do login |
| Intervalo | 15 min | — |
| Prática autônoma | 70 min | Login (sucesso e falha), erro 500, 404 e latência |
| Dinâmica | 30 min | "A rede caiu!" (abaixo) |
| Carrinho offline, debate e entrega | 40 min | Carrinho no `localStorage`; debate "O mock pode esconder um defeito?" |

## Conteúdo

### 1. Por que simular a API
A API real é lenta, muda de dados, pode estar fora do ar e não deixa provocar um erro 500 quando
queremos. Um teste que depende dela fica **instável**: falha sem que o código tenha mudado. Por isso,
nos testes de integração, a API é **simulada** e o teste controla exatamente o que ela responde.

| Forma de simular | Como funciona | Quando usar |
|---|---|---|
| `vi.fn()` passado por parâmetro | A função recebe um cliente falso (aula 3) | Teste unitário de serviço |
| `vi.spyOn(globalThis, 'fetch')` | Espiona e troca o `fetch` global | Casos simples e pontuais |
| **MSW** | Intercepta a requisição de rede e responde no lugar do servidor | Integração: o código da tela não muda nada |

### 2. Configurando o MSW (2.3)

```bash
npm install -D msw
```

```js
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const URL_API = 'http://localhost:3000/api';

export const handlers = [
  http.post(`${URL_API}/login`, async ({ request }) => {
    const { email, senha } = await request.json();
    const credenciaisValidas = email === 'aluno@senai.br' && senha === '123456';
    if (!credenciaisValidas) {
      return HttpResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 });
    }
    return HttpResponse.json({ nome: 'Aluno', token: 'mock-jwt-xyz' });
  }),
];
```

```js
// src/mocks/servidor.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';

export const servidor = setupServer(...handlers);
```

```js
// tests/setup.js
import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { servidor } from '../src/mocks/servidor.js';

beforeAll(() => servidor.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  servidor.resetHandlers();
  localStorage.clear();
});
afterAll(() => servidor.close());
```

- O servidor fica num módulo próprio para que a configuração e os testes usem o mesmo.
- No Node, o `fetch` precisa de **URL completa** (`http://localhost:3000/api/login`); por isso a
  constante `URL_API` fica num lugar só.
- `onUnhandledRequest: 'error'` faz o teste falhar se a tela chamar uma rota sem simulação.
- `resetHandlers()` desfaz, depois de cada teste, as respostas trocadas com `servidor.use`.

### 3. Testando o fluxo de login

```js
// src/telaLogin.js
import { URL_API } from './mocks/handlers.js';

export function montarTelaLogin(container) {
  container.innerHTML = `
    <form>
      <label>E-mail <input name="email" type="email"></label>
      <label>Senha <input name="senha" type="password"></label>
      <button type="submit">Entrar</button>
      <p role="status"></p>
    </form>`;
  const formulario = container.querySelector('form');
  formulario.addEventListener('submit', (evento) => enviarLogin(evento, formulario));
}

async function enviarLogin(evento, formulario) {
  evento.preventDefault();
  const aviso = formulario.querySelector('[role="status"]');
  aviso.textContent = 'Carregando...';
  const resposta = await fetch(`${URL_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: formulario.email.value, senha: formulario.senha.value }),
  });
  const dados = await resposta.json();
  if (!resposta.ok) {
    aviso.textContent = dados.erro;
    return;
  }
  localStorage.setItem('token', dados.token);
  aviso.textContent = `Bem-vindo, ${dados.nome}`;
}
```

```js
// tests/fluxoLogin.test.js
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { montarTelaLogin } from '../src/telaLogin.js';

async function entrarCom(email, senha) {
  montarTelaLogin(document.body);
  const usuario = userEvent.setup();
  await usuario.type(screen.getByLabelText('E-mail'), email);
  await usuario.type(screen.getByLabelText('Senha'), senha);
  await usuario.click(screen.getByRole('button', { name: 'Entrar' }));
}

describe('fluxo de login', () => {
  it('mostra boas-vindas e guarda o token quando o login é aceito', async () => {
    await entrarCom('aluno@senai.br', '123456');
    expect(await screen.findByText('Bem-vindo, Aluno')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('mock-jwt-xyz');
  });

  it('mostra o erro e não guarda token quando a senha está errada', async () => {
    await entrarCom('aluno@senai.br', 'errada');
    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
```

### 4. Confiabilidade: provocando falhas (4.3)
Confiabilidade é a tela **continuar útil quando algo dá errado**. Com `servidor.use` trocamos a
resposta só naquele teste:

```js
import { http, HttpResponse, delay } from 'msw';
import { servidor } from '../src/mocks/servidor.js';
import { URL_API } from '../src/mocks/handlers.js';

servidor.use(
  http.post(`${URL_API}/login`, () => new HttpResponse(null, { status: 500 })),
);

servidor.use(
  http.post(`${URL_API}/login`, async () => {
    await delay(800);
    return HttpResponse.json({ nome: 'Aluno', token: 'mock-jwt-xyz' });
  }),
);
```

| Cenário | O que a tela deve fazer |
|---|---|
| Erro 500 | Mostrar "Serviço indisponível, tente novamente" e reativar o botão |
| Erro 404 | Mostrar mensagem amigável, sem quebrar a página |
| Rede lenta | Mostrar "Carregando..." e retirar o aviso quando a resposta chegar |

Com o erro 500, a resposta vem sem corpo e `resposta.json()` lança erro: o teste revela que a tela
do exemplo precisa de `try/catch` e de uma mensagem própria. Encontrar isso é o objetivo do teste
de confiabilidade.

### 5. Esperar sem tempo fixo

| ❌ Frágil | ✅ Confiável |
|---|---|
| `await new Promise((r) => setTimeout(r, 1000))` | `await screen.findByText('Bem-vindo, Aluno')` |
| Conferir logo depois do clique | `await waitFor(() => expect(botao).toBeEnabled())` |
| — | `await waitForElementToBeRemoved(() => screen.queryByText('Carregando...'))` |

O tempo fixo deixa o teste lento quando sobra e **intermitente (flaky)** quando falta. `findBy` e
`waitFor` tentam de novo até dar certo ou até o limite (1 s por padrão).

### 6. Execução dos testes (7.3)
Executar é rodar a suíte e **registrar o resultado** de cada caso: passou, falhou ou foi pulado.

```bash
npx vitest run fluxoLogin
```

- Ler o resumo: quantos arquivos e testes passaram e o tempo total.
- Teste que falha: ler a mensagem (esperado × recebido) e o trecho do DOM que o Testing Library
  imprime.
- Rodar a suíte **3 vezes**: se o resultado muda sem mudança no código, o teste é instável e entra
  na lista de correção.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado porque a vitrine de uma loja virtual "fica branca" em dias
de muito acesso. Você simula com o MSW a API de produtos respondendo **503** e depois **demorando
3 s**. No primeiro caso, a tela quebra (erro no console e nada exibido); no segundo, o usuário fica
sem nenhum sinal de carregamento. Os dois testes falhando entram no relatório como defeitos de
confiabilidade (4.3), com o passo a passo para reproduzir, e depois servem para comprovar a correção.

## Dinâmica — A rede caiu! (30 min, grupos de 4)
- **Objetivo:** listar os cenários de falha que uma tela precisa suportar e transformá-los em
  testes (C5, 4.3).
- **Materiais:** cartões com telas (login, vitrine, carrinho, pagamento) e cartões de "desastre"
  (500, 404, 401, rede lenta, resposta vazia, JSON inválido).
- **Passo a passo:** (1) cada grupo recebe 1 tela e sorteia 3 desastres; (2) escreve, para cada
  desastre, o que o usuário deve ver; (3) escreve o `servidor.use(...)` que provoca o desastre;
  (4) passa os cartões ao grupo vizinho, que confere se o comportamento esperado é verificável.
- **Fechamento:** o professor monta no quadro a tabela "desastre × comportamento esperado", que
  vira checklist de confiabilidade da turma.

## Situação-problema e entrega da aula
- **Entrega:** testes de login com MSW (sucesso e falha, token conferido), testes de erro 500, 404
  e latência sem espera fixa, e testes do carrinho guardado no `localStorage` com isolamento entre
  os testes.
- **Ligação com a SA 1:** os riscos do plano (API fora do ar, rede lenta) ganham casos de teste
  automatizados.

## Verificação da aprendizagem
- Por que um teste de integração não deve chamar a API real?
- Para que serve `servidor.resetHandlers()` no `afterEach`?
- Trocar `setTimeout(…, 2000)` por uma espera confiável.
- Que comportamento a tela deve ter com erro 500? Escrever o caso de teste.

## Recursos
Laboratório de informática, computador com acesso à internet, IDE para desenvolvimento de testes
(VS Code), Node.js e npm, kit multimídia, cartões da dinâmica, slides [📕 Slides da aula 05 (PDF)](../AULAS/AULA-05-SLIDES.pdf)
(apresentação) e apostila da UC (capítulo 5).
