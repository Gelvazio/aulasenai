# Capítulo 06 — Testes End-to-End com Cypress e Playwright

- **Aula:** 06
- **Capacidade:** C4, C5

## Teoria

### Todos os testes passaram. Ninguém conseguiu comprar.

Na **Loja Nuvem Azul**, os testes unitários e de integração estavam verdes e todas as APIs
respondiam com status 200. Mesmo assim, num sábado de promoção, nenhum cliente conseguiu pagar: um
banner de cupom, colocado por cima do botão **Finalizar compra**, impedia o clique. O jsdom não
desenha a tela, então só um teste que roda **num navegador de verdade**, como o cliente, teria
encontrado o problema. Esse é o papel do teste **E2E (ponta a ponta)**.

> 🎯 **Objetivos do capítulo:** diferenciar o E2E dos testes unitários e de integração, conhecer os
> **frameworks** Cypress e Playwright, **automatizar fluxos completos** (login e checkout) como
> teste **funcional de caixa preta**, verificar aspectos de **usabilidade** e combater os testes
> **intermitentes (flaky)**.

### O que é um teste E2E

O **E2E** testa o fluxo completo, como o usuário: abre o navegador, navega pelas páginas, digita,
clica e confere o que aparece — com CSS, rotas, cookies e (em geral) API reais.

| | Unitário / integração | E2E |
|---|---|---|
| Onde roda | Node + jsdom (sem desenhar a tela) | Navegador real (Chromium, Firefox, WebKit) |
| O que cobre | Funções e componentes | A jornada inteira (login → carrinho → pagamento) |
| Velocidade | Milissegundos | Segundos por teste |
| Na pirâmide | Base e meio (~90%) | Topo (~10%), só os **fluxos críticos** |

O E2E é o teste **funcional de caixa preta** por excelência: ele não conhece o código, só a tela.

### Frameworks: Cypress × Playwright

| | Cypress | Playwright |
|---|---|---|
| Como funciona | Roda dentro do navegador, junto com a aplicação | O teste roda no Node e comanda o navegador por protocolo |
| Navegadores | Chrome, Edge, Firefox (e Electron) | Chromium, Firefox e **WebKit** (motor do Safari) |
| Destaques | Painel visual com **time-travel** (volta a cada passo) | Várias abas/páginas, celular emulado, **trace viewer** |
| Sintaxe | Comandos encadeados (`cy.get().type()`) | `async/await` (`await page.getByRole().click()`) |
| Espera | `should()` repete a verificação até passar | **Auto-waiting**: espera o elemento estar visível, habilitado e parado |

Os dois resolvem o mesmo problema; a escolha depende do projeto e da equipe.

### Cypress: instalação e primeiro fluxo

```bash
npm install -D cypress
npx cypress open
```

```js
// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({ e2e: { baseUrl: 'http://localhost:5173' } });

// cypress/e2e/login.cy.js
describe('Login', () => {
  beforeEach(() => cy.clearLocalStorage());

  it('entra com dados válidos e vai para o painel', () => {
    cy.visit('/login');
    cy.get('[data-testid="campo-email"]').type('cliente.teste@nuvemazul.test');
    cy.get('[data-testid="campo-senha"]').type('Teste123');
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/painel');
    cy.contains('Bem-vindo').should('be.visible');
  });

  it('mostra "Credenciais inválidas" e continua no login', () => {
    cy.visit('/login');
    cy.get('[data-testid="campo-email"]').type('cliente.teste@nuvemazul.test');
    cy.get('[data-testid="campo-senha"]').type('errada');
    cy.contains('button', 'Entrar').click();
    cy.contains('Credenciais inválidas').should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

- `cy.visit` abre a rota (com `baseUrl` não se repete o endereço);
- `cy.get` busca por seletor; `cy.contains` busca pelo texto visível;
- `should(...)` **repete** a verificação até passar ou estourar o tempo limite;
- quando um teste falha, o Cypress salva **captura de tela** (e, se configurado, vídeo) — essencial
  na integração contínua, onde não há monitor.

### Playwright: o fluxo de compra com dados isolados

```bash
npm init playwright@latest
```

```js
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry', screenshot: 'only-on-failure' },
  webServer: { command: 'npm run dev', url: 'http://localhost:5173', reuseExistingServer: true },
  projects: [
    { name: 'computador', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', use: { ...devices['iPhone 13'] } },
  ],
});

// e2e/compra.spec.js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  // Rota que só existe no ambiente de testes: recria o cliente com o carrinho vazio.
  await request.post('/api/testes/preparar', { data: { cliente: 'cliente.teste@nuvemazul.test' } });
});

test('cliente entra, adiciona ao carrinho e finaliza a compra', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-mail').fill('cliente.teste@nuvemazul.test');
  await page.getByLabel('Senha').fill('Teste123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/\/catalogo/);

  await page.getByRole('button', { name: 'Adicionar Camiseta azul ao carrinho' }).click();
  await page.getByRole('link', { name: /Carrinho/ }).click();
  await expect(page.getByText('Subtotal: R$ 59,90')).toBeVisible();

  await page.getByRole('button', { name: 'Finalizar compra' }).click();
  await expect(page.getByRole('heading', { name: 'Pedido confirmado' })).toBeVisible();
});
```

- `npx playwright test` roda tudo; `--ui` abre o modo visual; `npx playwright show-report` mostra
  o relatório com capturas e o **trace** (o passo a passo do teste que falhou).
- **Dados isolados:** cada teste prepara o próprio cliente e o próprio carrinho; nenhum depende do
  que outro teste deixou no banco.
- Se o banner cobrir o botão, o `click()` do Playwright **falha**, porque o elemento não está
  recebendo o clique — exatamente o defeito da abertura.

### Seletores que resistem a mudanças

| Seletor | Avaliação |
|---|---|
| `div > p:nth-child(2)` | ❌ Quebra se a ordem do HTML mudar |
| `.btn-primary-blue` | ❌ Quebra se o tema visual mudar |
| `/html/body/div[2]/button` (XPath absoluto) | ❌ Quebra com qualquer mudança de estrutura |
| `getByRole('button', { name: 'Salvar' })` | ✅ Igual ao que o usuário vê (e ajuda a acessibilidade) |
| `[data-testid="btn-salvar"]` | ✅ Atributo dedicado a teste, estável |

### Usabilidade no E2E

Como roda num navegador real, o E2E também verifica a **usabilidade** (tipo de teste 4.2):

- o botão está **visível** e não está coberto por outro elemento;
- o fluxo funciona em **tela de celular** (projeto `celular` do Playwright);
- dá para concluir o formulário **só com o teclado** (`page.keyboard.press('Tab')`, `Enter`);
- as mensagens de erro aparecem **perto do campo** e com texto compreensível.

### Testes intermitentes (flaky)

Um teste **intermitente (flaky)** passa ou falha sem mudança no código: passou na sua máquina,
falhou duas vezes na integração contínua. Ele destrói a confiança na suíte — o time passa a ignorar
falhas, e defeitos reais se escondem no ruído.

| Causa | Como evitar |
|---|---|
| Clicar antes de a tela estar pronta | Usar a espera automática (`should`, auto-waiting), nunca pausa fixa |
| `cy.wait(5000)` "para garantir" | Interceptar a rota e esperar por ela: `cy.intercept('POST', '/api/pedidos').as('pedido')` e `cy.wait('@pedido')` |
| Dados compartilhados entre testes | Cada teste cria e limpa seus dados (cookies, storage, banco de teste) |
| Animações e elementos se movendo | Esperar o estado final; desligar animações no ambiente de teste |
| Dependência de data e hora | Fixar o relógio (ex.: `page.clock` no Playwright, `cy.clock` no Cypress) |

**Ciclo de vida seguro de um teste E2E:** preparar o ambiente (limpar estado, interceptar rede) →
navegar até a rota → executar as ações do usuário → validar com asserções e conferência da URL.

### Page Object Model (POM)

Quando dezenas de testes repetem os mesmos seletores, qualquer mudança no HTML obriga a editar todos.
O **Page Object** concentra seletores e ações de uma página em um só lugar:

```js
// e2e/paginas/PaginaLogin.js
export class PaginaLogin {
  constructor(page) {
    this.page = page;
  }

  async entrar(email, senha) {
    await this.page.goto('/login');
    await this.page.getByLabel('E-mail').fill(email);
    await this.page.getByLabel('Senha').fill(senha);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }
}
```

No teste: `await new PaginaLogin(page).entrar('cliente.teste@nuvemazul.test', 'Teste123');`.

## Vídeos

- [Criando um primeiro teste E2E com Cypress](https://www.youtube.com/watch?v=yCujUWwBzGU) — 13:47 — Tiago Samuel
- [Curso de automação de testes com Playwright: introdução](https://www.youtube.com/watch?v=WYgDL106aVI) — 12:49 — Willames Vital
- [Flaky tests: o que comem, onde vivem e como reproduzem](https://www.youtube.com/watch?v=NE0Hf4HsH7o) — 10:21 — Dev Eficiente

## Exercícios

### ITEM 1
- **Capacidade:** C4
- **Contexto:** Na Loja Nuvem Azul, todos os testes unitários e de integração passaram, mas um banner cobriu o botão **Finalizar compra** e nenhum cliente conseguiu pagar. O time quer criar testes E2E para "tudo".
- **Comando:** Explique por que só um teste E2E encontraria esse defeito, onde o E2E fica na pirâmide de testes e quais três fluxos da loja você escolheria para automatizar em E2E (e por quê não automatizar tudo).
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C4, C5
- **Contexto:** Plano de testes do login: (a) dados válidos levam a `/painel` com "Bem-vindo"; (b) senha errada mostra "Credenciais inválidas" e a rota continua `/login`. Os campos têm `data-testid="campo-email"` e `data-testid="campo-senha"`.
- **Comando:** Escreva os dois testes em Cypress (`cy.visit`, `cy.get`, `type`, `cy.contains`, `should`), incluindo a limpeza do estado no `beforeEach`.
- **Linhas:** 10

### ITEM 3
- **Capacidade:** C5
- **Contexto:** A loja precisa de um teste E2E em Playwright para o fluxo login → adicionar ao carrinho → finalizar, que não dependa de dados deixados por outros testes.
- **Comando:** Escreva o teste com `page.getByLabel`, `page.getByRole` e `expect`, preparando os dados do cliente no `beforeEach` e conferindo a URL depois do login, o subtotal no carrinho e a mensagem "Pedido confirmado".
- **Linhas:** 12

### ITEM 4
- **Capacidade:** C5
- **Contexto:** O teste do checkout usa `cy.wait(5000)` depois de clicar em **Confirmar pedido** e, mesmo assim, falha em 1 de cada 5 execuções na integração contínua; localmente sempre passa. Ele também usa um cliente que outro teste altera.
- **Comando:** Explique o que é um teste intermitente (flaky), aponte as duas causas desse caso e reescreva a espera usando `cy.intercept` com alias e `cy.wait('@alias')`, além de isolar os dados.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C4
- **Contexto:** Para clicar no botão **Salvar endereço**, quatro colegas sugeriram: `div > button:nth-child(3)`, `.btn-primary-blue`, `/html/body/div[2]/form/button` e `getByRole('button', { name: 'Salvar endereço' })`.
- **Comando:** Classifique cada seletor como frágil ou confiável, justifique e diga quando o `data-testid` é a melhor alternativa.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C4
- **Contexto:** O plano de testes do checkout exige verificar a usabilidade: concluir a compra no celular, concluir só com o teclado e garantir que nenhum elemento cubra o botão de pagamento.
- **Comando:** Descreva como cada exigência seria verificada em E2E (projeto de celular, navegação com Tab/Enter e a espera automática do clique) e que resultado indicaria falha de usabilidade.
- **Linhas:** 6

## Resumo

- **E2E** testa o fluxo completo, como o usuário, num navegador real; fica no **topo da pirâmide** (~10%), só nos fluxos críticos.
- **Cypress** (time-travel, comandos encadeados, `should` com repetição) e **Playwright** (vários navegadores e celular, `async/await`, auto-waiting, trace) são os principais frameworks.
- O E2E é teste **funcional de caixa preta** e também verifica **usabilidade**: botão visível, celular, teclado.
- Use **seletores estáveis** (`getByRole`, `data-testid`), nunca posição, classe de estilo ou XPath absoluto.
- **Teste intermitente (flaky)** passa ou falha sem mudança no código: evite pausas fixas, espere a rede com intercept/alias e **isole os dados**.
- O **Page Object Model** concentra seletores e ações de cada página e facilita a manutenção.

## Glossário

- **E2E:** teste do fluxo completo, como o usuário.
- **Teste intermitente (flaky):** passa ou falha sem mudança no código.
- **Jornada:** sequência de passos que o usuário percorre para cumprir uma meta (ex.: comprar um produto).
- **Cypress:** framework de testes E2E que roda dentro do navegador, com painel visual de depuração.
- **Playwright:** framework de testes E2E que comanda Chromium, Firefox e WebKit a partir do Node.
- **Auto-waiting:** espera automática até o elemento estar pronto para a ação (visível, habilitado e parado).
- **Time-travel:** recurso do Cypress que mostra a tela exatamente como estava em cada passo do teste.
- **Trace:** registro passo a passo da execução de um teste do Playwright, usado para investigar falhas.
- **data-testid:** atributo HTML dedicado a localizar elementos nos testes.
- **Page Object Model:** padrão que concentra os seletores e as ações de cada página em um só módulo.
