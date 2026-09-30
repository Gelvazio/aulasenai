# ATIVIDADE AULA 06 — Testes End-to-End com Cypress e Playwright

**Slides:** `AULAS-CHALKIE-AI/6-Testes-End-to-End-com-Cypress-e-Playwright.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, em dupla  
**Capacidades:** C4, C5 · S2 | **Conhecimentos:** 2.2 · 2.3 · 3.1 · 4.2 · 5.2  
**Entrega da aula:** fluxos E2E de login e de checkout automatizados

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (interceptação e assincronismo) | 15 min |
| Passo 0 — Instalar a ferramenta E2E | 30 min |
| Prática 1 — Login e dashboard | 70 min |
| Prática 2 — Checkout completo | 80 min |
| Caça ao teste instável e entrega | 45 min |

---

## Passo 0 — Escolha da ferramenta

A dupla escolhe **uma** e justifica em 2 linhas (S2):

```bash
npm install --save-dev cypress        # npx cypress open
# ou
npm init playwright@latest            # npx playwright test --ui
```

Use a aplicação-base da turma rodando em `http://localhost:5173` (`npm run dev`).

> 💡 Nos elementos importantes, peça ao front-end atributos `data-testid` (ex.: `data-testid="botao-entrar"`). Nunca selecione por classe de estilo.

---

## 1. Prática 1 — Login e dashboard

**Sucesso:**
1. Acessar `/login` e validar que o formulário está visível.
2. Preencher credenciais válidas e enviar.
3. Validar que a URL é `/dashboard` e aparece a saudação ao usuário.

**Falha:**
4. Preencher senha inválida e validar o alerta **Credenciais inválidas**.
5. Validar que a rota **continua** `/login`.

Exemplo (Cypress):

```javascript
it('entra com credenciais válidas', () => {
  cy.visit('/login');
  cy.get('[data-testid="campo-email"]').type('aluno@senai.br');
  cy.get('[data-testid="campo-senha"]').type('123456');
  cy.get('[data-testid="botao-entrar"]').click();
  cy.url().should('include', '/dashboard');
  cy.contains('Bem-vindo').should('be.visible');
});
```

No Playwright, o mesmo fluxo usa `await page.goto()`, `page.getByLabel()`, `page.getByRole()` e `await expect(page).toHaveURL(/dashboard/)`.

---

## 2. Prática 2 — Checkout completo

| Etapa | Ação | Verificação |
|---|---|---|
| Vitrine | Adicionar 1 produto ao carrinho | Contador = 1 |
| Carrinho | Alterar quantidade para 2 | Subtotal = 2 × preço |
| Checkout | Preencher entrega e pagamento de teste | Botão **Confirmar** habilitado |
| Confirmação | Confirmar pedido | Mensagem de sucesso e número do pedido |

**Regras:** cada teste cria seus próprios dados (não depende do anterior) e espera a rede por interceptação (`cy.intercept` / `page.waitForResponse`), nunca por `cy.wait(3000)`.

---

## 3. Caça ao teste instável (flaky)

1. Rode a suíte **5 vezes** seguidas e anote quantas falharam.
2. Para cada falha, identifique a causa: espera fixa, dado compartilhado, animação, seletor frágil.
3. Corrija e rode de novo. Registre o antes e depois.
4. Ligue o **vídeo/screenshot em falha** e use o time-travel (Cypress) ou trace viewer (Playwright) para depurar.

**Bônus:** extraia a tela de login para um **Page Object** (`paginas/PaginaLogin.js`).

---

## 4. Entrega e avaliação

**Entregar:** repositório com os testes E2E, vídeo ou trace de uma execução e a tabela da caça ao flaky.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Login (C4) | Sucesso e falha completos | Só sucesso | Incompleto | Ausente |
| Checkout (C5) | 4 etapas verificadas | 3 etapas | 2 etapas | ≤ 1 |
| Estabilidade (4.3) | 5/5 execuções verdes, sem espera fixa | 4/5 | 3/5 | Instável |
| Justificativa (S2) | Ferramenta escolhida com critérios | Superficial | Sem critérios | Ausente |

**Próxima aula:** medir quanto do código a suíte realmente cobre.
