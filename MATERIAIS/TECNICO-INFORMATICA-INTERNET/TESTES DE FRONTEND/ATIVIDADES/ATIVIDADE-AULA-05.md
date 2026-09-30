# ATIVIDADE AULA 05 — Testes de Integração Avançados e Mock de APIs

**Slides:** `AULAS-CHALKIE-AI/5-Testes-de-Integração-Avançados-e-Mock-de-APIs.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, em dupla  
**Capacidades:** C4, C5 · S1 | **Conhecimentos:** 2.3 · 4.3 · 7.3  
**Entrega da aula:** testes com API simulada, erros de rede e persistência

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (queries do DOM) | 15 min |
| Passo 0 — Configurar o MSW | 30 min |
| Prática 1 — Fluxo de login com MSW | 70 min |
| Prática 2 — Erro 500 e latência | 50 min |
| Prática 3 — Carrinho no localStorage | 45 min |
| Debate e entrega | 30 min |

---

## Passo 0 — MSW (Mock Service Worker)

```bash
npm install --save-dev msw
```

`src/mocks/handlers.js`:

```javascript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, senha } = await request.json();
    if (email === 'aluno@senai.br' && senha === '123456') {
      return HttpResponse.json({ nome: 'Aluno', token: 'mock-jwt-xyz' });
    }
    return HttpResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 });
  }),
];
```

`tests/setup.js` (acrescente):

```javascript
import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handlers.js';
export const servidor = setupServer(...handlers);
beforeAll(() => servidor.listen());
afterEach(() => { servidor.resetHandlers(); localStorage.clear(); });
afterAll(() => servidor.close());
```

> Por que MSW? O teste chama `fetch` de verdade; quem responde é o servidor simulado. O código da tela não sabe que é um teste.

---

## 1. Prática 1 — Fluxo de login

Use a tela de login que faz `fetch('/api/login')`, salva o token em `localStorage` e mostra **Bem-vindo, Aluno**.

Em `tests/fluxoLogin.test.js`:
1. Montar a tela e digitar `aluno@senai.br` / `123456` com `userEvent`.
2. Clicar em **Entrar**.
3. `await screen.findByText('Bem-vindo, Aluno')`.
4. `expect(localStorage.getItem('token')).toBe('mock-jwt-xyz')`.
5. Caso negativo: senha errada → mensagem **Credenciais inválidas** e **nenhum** token salvo.

Execute: `npx vitest run fluxoLogin` sem avisos no console.

---

## 2. Prática 2 — Falhas e lentidão da rede

Sobrescreva o handler **só no teste** com `servidor.use(...)`:
- **Erro 500:** a tela mostra "Serviço indisponível, tente novamente" e o botão volta a ficar ativo.
- **404:** a tela mostra mensagem amigável, sem quebrar.
- **Latência:** `await delay(800)` no handler → o texto **Carregando...** aparece e depois some (`waitForElementToBeRemoved`).

> ⚠️ **Proibido** `setTimeout` com tempo fixo no teste: use `findBy` e `waitFor`, que esperam o necessário.

---

## 3. Prática 3 — Carrinho offline

1. Clicar em **Adicionar** num produto → contador do carrinho mostra **1**.
2. Conferir `JSON.parse(localStorage.getItem('@carrinho'))` com 1 item.
3. Montar a tela de novo (simula recarregar) → o contador continua **1**.
4. Garantir que o `localStorage.clear()` do `afterEach` impede vazamento para o próximo teste.

---

## 4. Debate (S1)

"Mock de rede ou servidor real?" A dupla lista quando cada um é melhor e o risco do mock que "esconde" um defeito real.

---

## 5. Entrega e avaliação

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Login com MSW (C5) | Sucesso e falha, token verificado | Só sucesso | Com avisos | Ausente |
| Falhas de rede (C4) | 500, 404 e latência | 2 de 3 | 1 de 3 | Nenhum |
| Persistência (C5) | 4 passos e isolamento | 3 passos | 2 passos | Ausente |
| Confiabilidade (4.3) | Sem espera fixa, suíte estável | 1 espera fixa | Instável | — |

**Próxima aula:** testar a aplicação inteira no navegador (E2E).
