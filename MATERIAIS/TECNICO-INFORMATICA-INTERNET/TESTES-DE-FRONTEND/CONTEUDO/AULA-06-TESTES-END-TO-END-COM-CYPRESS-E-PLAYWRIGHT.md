# Aula 06 — Testes End-to-End com Cypress e Playwright

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 30/10
- **Conhecimentos (ementa do curso):** 2.2 Frameworks · 2.3 Aplicação · 3.1 Teste funcional (caixa
  preta) · 4.2 Usabilidade
- **Capacidades:** C4 — Aplicar testes definidos no Plano de Testes. · C5 — Desenvolver conjunto
  de testes automatizados
- **Estratégias:** exposição dialogada com código ao vivo, prática em duplas, dinâmica, caça ao
  teste instável
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md)

## Indicadores

- (9) Automatiza fluxo completo de usuário em teste E2E (C4/C5).

## Objetivos

- Explicar o que é um teste end-to-end (E2E) e por que eles ficam no topo da pirâmide.
- Comparar Cypress e Playwright e escolher um com justificativa (2.2).
- Automatizar os fluxos de login e de checkout no navegador real (2.3).
- Escrever o teste E2E como caixa preta (3.1): só pelo que o usuário vê e faz.
- Verificar pontos de usabilidade (4.2) no fluxo: mensagens, navegação e acesso por papel e rótulo.
- Reconhecer e corrigir um teste intermitente (flaky).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: MSW, assincronismo e confiabilidade (aula 5) |
| Exposição com código ao vivo | 40 min | E2E; Cypress × Playwright; seletores; esperas automáticas; dados isolados |
| Prática guiada | 30 min | Passo 0: instalar a ferramenta escolhida e rodar o primeiro teste |
| Intervalo | 15 min | — |
| Prática autônoma | 85 min | Fluxo de login (sucesso e falha) + fluxo de checkout completo |
| Dinâmica | 25 min | "Roteirista e robô" (abaixo) |
| Caça ao teste instável e entrega | 30 min | Rodar 3 vezes, achar o flaky, corrigir e registrar |

## Conteúdo

### 1. O que é um teste E2E
O teste end-to-end abre o **navegador real**, acessa a aplicação rodando e faz o caminho completo do
usuário: entrar, buscar, adicionar ao carrinho e pagar. Ele confirma que todas as partes juntas —
tela, rotas, API, banco de teste — permitem ao usuário **completar a tarefa** (validação).

| | Unitário | Integração | **E2E** |
|---|---|---|---|
| Ambiente | Node | DOM simulado (JSDOM) | Navegador real |
| Velocidade | Milissegundos | Décimos de segundo | Segundos |
| Quantidade na suíte | Muitos | Vários | **Poucos, só fluxos críticos** |
| Encontra | Erro de lógica | Erro entre componentes | Erro no caminho real do usuário |

### 2. Frameworks E2E (2.2)

| | Cypress | Playwright |
|---|---|---|
| Instalação | `npm install -D cypress` | `npm init playwright@latest` |
| Executar | `npx cypress open` (interface) · `npx cypress run` | `npx playwright test` · `--ui` (interface) |
| Navegadores | Chrome, Edge, Firefox, Electron | Chromium, Firefox e WebKit (Safari) |
| Estilo | Comandos encadeados (`cy.get().type()`) | `async/await` (`await page.getByRole().click()`) |
| Destaque | Painel visual, "viagem no tempo" pelos passos | Vários navegadores e abas, trace detalhado |

As duas esperam automaticamente o elemento aparecer e ficar clicável. A escolha é justificada pela
equipe (navegadores exigidos, experiência, integração com o CI).

### 3. Escolhendo os elementos (caixa preta, 3.1)

| Prioridade | Cypress | Playwright |
|---|---|---|
| Papel e nome | `cy.contains('button', 'Entrar')` | `page.getByRole('button', { name: 'Entrar' })` |
| Rótulo do campo | `cy.get('input[name="email"]')` ou `cy.contains('label', 'E-mail')` | `page.getByLabel('E-mail')` |
| Atributo de teste | `cy.get('[data-testid="botao-entrar"]')` | `page.getByTestId('botao-entrar')` |
| ❌ Evitar | `cy.get('.btn.btn-primary')` | `page.locator('div > form > button')` |

O `data-testid` é combinado com a equipe de front-end para elementos sem texto estável. Classe de
estilo **nunca** é seletor: muda com o layout e quebra o teste à toa.

### 4. Fluxo de login

**Cypress** (`cypress/e2e/login.cy.js`, com `baseUrl: 'http://localhost:5173'` no `cypress.config.js`):

```js
describe('login', () => {
  it('entra com credenciais válidas e chega ao painel', () => {
    cy.visit('/login');
    cy.get('[data-testid="campo-email"]').type('aluno@senai.br');
    cy.get('[data-testid="campo-senha"]').type('123456');
    cy.get('[data-testid="botao-entrar"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Bem-vindo').should('be.visible');
  });

  it('continua no login e avisa quando a senha está errada', () => {
    cy.visit('/login');
    cy.get('[data-testid="campo-email"]').type('aluno@senai.br');
    cy.get('[data-testid="campo-senha"]').type('errada');
    cy.get('[data-testid="botao-entrar"]').click();
    cy.contains('Credenciais inválidas').should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

**Playwright** (`tests/login.spec.js`, com `use: { baseURL: 'http://localhost:5173' }` no
`playwright.config.js`):

```js
import { test, expect } from '@playwright/test';

test('entra com credenciais válidas e chega ao painel', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-mail').fill('aluno@senai.br');
  await page.getByLabel('Senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Bem-vindo')).toBeVisible();
});
```

### 5. Fluxo de checkout (caso de teste do plano → E2E)

| Etapa | Ação | Verificação |
|---|---|---|
| Vitrine | Adicionar 1 produto ao carrinho | Contador = 1 |
| Carrinho | Alterar a quantidade para 2 | Subtotal = 2 × preço |
| Checkout | Preencher entrega e pagamento de teste | Botão **Confirmar** habilitado |
| Confirmação | Confirmar o pedido | Mensagem de sucesso e número do pedido |

Cada linha da tabela vira um passo do teste, e cada "Verificação" vira um `should` (Cypress) ou um
`expect` (Playwright). Um teste E2E sem verificação no meio do caminho só diz "algo deu errado em
algum lugar".

### 6. Usabilidade no E2E (4.2)
O E2E é o melhor lugar para conferir se o usuário **consegue** usar a tela:
- a mensagem de erro aparece e diz o que corrigir;
- depois de uma ação, o usuário vai para a página certa;
- os campos têm rótulo (`getByLabel` encontra) e os botões têm nome (`getByRole` encontra);
- o fluxo funciona só com o teclado (`Tab` e `Enter`: `await page.keyboard.press('Enter')`).

### 7. Testes intermitentes (flaky) e dados isolados

| Causa | Sintoma | Correção |
|---|---|---|
| Espera fixa (`cy.wait(2000)`) | Falha em máquina lenta | Esperar o elemento ou a requisição (`cy.intercept` + `cy.wait('@alias')`) |
| Dados compartilhados | Passa sozinho, falha na suíte | Cada teste cria o próprio usuário/carrinho ou limpa antes |
| Ordem entre testes | Falha quando roda isolado | Teste independente; login feito no próprio teste ou em `beforeEach` |
| Animação | Clique "no vazio" | Esperar o elemento estável/visível antes de clicar |

Regra prática: rodar a suíte **3 vezes**. Um teste que muda de resultado sem mudança no código é
flaky e precisa ser corrigido — não ignorado.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado porque uma loja virtual perde vendas na finalização e
ninguém sabe onde. Você automatiza o checkout no Playwright, nos navegadores Chromium e WebKit. No
WebKit o teste falha na etapa "Pagamento": o botão **Confirmar** fica coberto por um banner de
cookies e não recebe o clique. Os testes unitários e de integração passavam todos; só o E2E no
navegador real mostrou o defeito de usabilidade (4.2). Seu relatório traz o trace da execução e o
passo exato da falha.

## Dinâmica — Roteirista e robô (25 min, duplas)
- **Objetivo:** perceber que um teste E2E precisa de passos e verificações sem ambiguidade (C4, 3.1).
- **Materiais:** a aplicação-base aberta no computador e fichas com 3 fluxos (busca, cadastro,
  carrinho).
- **Passo a passo:** (1) o "roteirista" escreve o fluxo em passos curtos ("clicar no botão
  Buscar"), sem mostrar ao colega; (2) o "robô" executa **exatamente** o que está escrito, sem
  interpretar; (3) quando o robô trava ("qual botão?", "e agora, deu certo?"), o roteirista
  corrige a ficha; (4) trocam os papéis no segundo fluxo.
- **Fechamento:** cada dupla transforma a ficha corrigida no esqueleto do teste em Cypress ou
  Playwright, com uma verificação depois de cada passo importante.

## Situação-problema e entrega da aula
- **Entrega:** repositório com os testes E2E de login (sucesso e falha) e de checkout completo,
  vídeo ou trace de uma execução e a tabela da caça ao flaky (teste, causa e correção).
- **Ligação com a SA 1:** os casos de teste tipo E2E do plano (autenticação e checkout) passam a
  ser executados no navegador real.

## Verificação da aprendizagem
- Por que a suíte tem poucos testes E2E e muitos unitários?
- Reescrever `cy.get('.btn-primary')` com um seletor estável.
- Um teste E2E passa sozinho e falha quando roda com os outros. Qual a causa provável?
- Citar 2 verificações de usabilidade que cabem num teste E2E de cadastro.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema operacional, IDE para
desenvolvimento de testes (VS Code), Node.js e npm, navegadores, kit multimídia, fichas da dinâmica,
slides `../AULAS/AULA-06-SLIDES.pdf` (apresentação) e apostila da UC (capítulo 6).
