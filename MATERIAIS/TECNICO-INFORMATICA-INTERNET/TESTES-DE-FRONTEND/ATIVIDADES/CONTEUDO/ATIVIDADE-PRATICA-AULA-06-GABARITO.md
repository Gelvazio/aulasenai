# Padrão de Resposta — Atividade Prática — Aula 06 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Testes End-to-End com Cypress e Playwright.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** o código/valores certos **e** a justificativa, quando o
   tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do tema,
   código que não testa o pedido ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** test no lugar de it; nomes de testes e variáveis diferentes;
   aspas simples ou duplas; ponto e vírgula opcional; import com ou sem a extensão .js;
   toStrictEqual no lugar de toEqual; await expect(...).resolves quando correto; pequenos erros de
   digitação que não mudam o sentido do código.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** O teste end-to-end (E2E) abre o **navegador real**, acessa a **aplicação rodando** e faz o **caminho completo do usuário** (entrar, buscar, adicionar ao carrinho, pagar), confirmando que todas as partes juntas permitem completar a tarefa.
**Critérios:** Palavras-chave: navegador real; aplicação rodando; caminho completo do usuário. Nota cheia (0,2): definição com o ambiente (navegador real). Metade (0,1): "testa o sistema todo" sem dizer o ambiente. Zero (0): confunde com teste unitário ou com JSDOM.

### ITEM 01-b
**Resposta esperada:** **Unitário:** roda no Node, em milissegundos, encontra erro de lógica de uma função. **Integração:** roda no DOM simulado (JSDOM), em décimos de segundo, encontra erro entre componentes. **E2E:** roda no navegador real, em segundos, encontra erro no caminho real do usuário.
**Critérios:** Palavras-chave: Node / JSDOM / navegador real; milissegundos / décimos de segundo / segundos; lógica / entre componentes / caminho do usuário. Nota cheia (0,4): os três tipos comparados nos três aspectos. Metade (0,2): três tipos com só dois aspectos, ou só dois tipos. Zero (0): comparação errada (ex.: E2E mais rápido).

### ITEM 01-c
**Resposta esperada:** O E2E é **lento** (segundos cada), **mais frágil** (depende de rede, navegador e dados) e, quando falha, **aponta o problema com menos precisão**. Por isso fica no **topo da pirâmide**: poucos testes, só nos **fluxos críticos** (login, checkout). Os unitários são rápidos e baratos e apontam exatamente a função com erro, por isso são muitos na base.
**Critérios:** Palavras-chave: lento; frágil/instável; topo da pirâmide; fluxos críticos; unitários rápidos e precisos. Nota cheia (0,4): motivo + ideia da pirâmide com fluxos críticos. Metade (0,2): só "é lento" ou só cita a pirâmide sem explicar. Zero (0): concorda em ter só testes E2E.

### ITEM 02-a
**Resposta esperada:** Cypress: npm install -D cypress (ou npm install --save-dev cypress). Playwright: npm init playwright@latest.
**Critérios:** Palavras-chave: npm install -D cypress; npm init playwright@latest. Nota cheia (0,2): os dois comandos certos. Metade (0,1): só um comando certo, ou instala sem -D. Zero (0): nenhum comando certo.

### ITEM 02-b
**Resposta esperada:** **Navegadores:** o Cypress roda em Chrome, Edge, Firefox e Electron; o Playwright roda em Chromium, Firefox e **WebKit (Safari)**. **Estilo:** o Cypress usa **comandos encadeados** (cy.get().type()); o Playwright usa **async/await** (await page.getByRole().click()). (Também vale citar: Cypress tem painel visual com "viagem no tempo"; Playwright tem várias abas e trace detalhado.)
**Critérios:** Palavras-chave: WebKit/Safari no Playwright; comandos encadeados × async/await. Nota cheia (0,4): os dois aspectos corretos. Metade (0,2): só um aspecto correto. Zero (0): aspectos trocados entre as ferramentas.

### ITEM 02-c
**Resposta esperada:** **Playwright**, porque ele executa os testes no **WebKit**, o motor do **Safari**, e muitos clientes compram pelo Safari do iPhone; o Cypress não roda no WebKit. A escolha é justificada pelos **navegadores exigidos** pelo público da loja.
**Critérios:** Palavras-chave: Playwright; WebKit; Safari; navegadores exigidos. Nota cheia (0,4): Playwright + justificativa pelo WebKit/Safari. Metade (0,2): Playwright sem justificativa ou com justificativa genérica ("é melhor"). Zero (0): Cypress, ou sem recomendação.

### ITEM 03-a
**Resposta esperada:** No Cypress, a opção **baseUrl**, no arquivo **cypress.config.js**. No Playwright, a opção **baseURL** dentro de **use**, no arquivo **playwright.config.js**.
**Critérios:** Palavras-chave: baseUrl em cypress.config.js; use.baseURL em playwright.config.js. Nota cheia (0,2): as duas opções com os arquivos. Metade (0,1): só uma ferramenta, ou opções sem os arquivos. Zero (0): nenhuma opção certa.

### ITEM 03-b
**Resposta esperada:** Cypress (cypress.config.js): import { defineConfig } from 'cypress'; export default defineConfig({ e2e: { baseUrl: 'http://localhost:5173' } }); — ou Playwright (playwright.config.js): import { defineConfig } from '@playwright/test'; export default defineConfig({ use: { baseURL: 'http://localhost:5173' } });
**Critérios:** Palavras-chave: defineConfig; e2e.baseUrl (Cypress) ou use.baseURL (Playwright); http://localhost:5173. Nota cheia (0,4): configuração completa em uma ferramenta. Metade (0,2): opção certa fora do bloco certo (ex.: baseUrl fora de e2e) ou sem o export. Zero (0): sem a opção do endereço base.

### ITEM 03-c
**Resposta esperada:** Cypress: **npx cypress open** (com interface) e **npx cypress run** (sem interface). Playwright: **npx playwright test --ui** (com interface) e **npx playwright test** (sem interface). A aplicação precisa estar **rodando (npm run dev)** porque o teste E2E **abre o navegador e acessa o endereço real**: sem o servidor no ar, a página não carrega e todos os testes falham.
**Critérios:** Palavras-chave: open/run ou test --ui/test; npm run dev; o teste acessa o endereço real. Nota cheia (0,4): os dois comandos + explicação. Metade (0,2): só os comandos ou só a explicação. Zero (0): comandos errados e sem explicação.

### ITEM 04-a
**Resposta esperada:** A classe de estilo **muda com o layout** (troca de tema, de framework de CSS) sem mudar o comportamento; o teste **quebra à toa**, mesmo com o botão funcionando.
**Critérios:** Palavras-chave: muda com o layout/visual; quebra sem defeito real. Nota cheia (0,2): motivo completo. Metade (0,1): "é ruim" sem dizer por quê. Zero (0): diz que classe é o melhor seletor.

### ITEM 04-b
**Resposta esperada:** Pelo papel e nome: cy.contains('button', 'Entrar') (Cypress) ou page.getByRole('button', { name: 'Entrar' }) (Playwright). Pelo atributo de teste: cy.get('[data-testid="botao-entrar"]') (Cypress) ou page.getByTestId('botao-entrar') (Playwright).
**Critérios:** Palavras-chave: papel button + nome Entrar; data-testid botao-entrar. Nota cheia (0,4): as duas formas corretas (em qualquer uma das ferramentas). Metade (0,2): só uma forma correta. Zero (0): outro seletor por classe ou por estrutura (div > form > button).

### ITEM 04-c
**Resposta esperada:** **Caixa preta** é testar **só pelo que o usuário vê e faz** (textos, botões, campos, resultados), **sem olhar o código interno**. Por isso a preferência começa pelo **papel e nome** e pelo **rótulo**, que são o que o usuário enxerga (e o que leitores de tela usam); o **data-testid** fica para elementos **sem texto estável**, combinado com a equipe de front-end.
**Critérios:** Palavras-chave: só pelo que o usuário vê/faz; sem olhar o código; papel/rótulo = o que o usuário enxerga; data-testid para elemento sem texto estável. Nota cheia (0,4): definição + justificativa da ordem. Metade (0,2): só a definição ou só a ordem. Zero (0): confunde com caixa branca.

### ITEM 05-a
**Resposta esperada:** 1) Acessar /login → formulário visível. 2) Preencher E-mail aluno@senai.br e Senha 123456. 3) Clicar em Entrar → **resultado esperado:** a URL passa a ser /dashboard e aparece a mensagem "Bem-vindo".
**Critérios:** Palavras-chave: acessar /login; preencher credenciais válidas; clicar Entrar; URL /dashboard; Bem-vindo. Nota cheia (0,2): passos + resultado esperado. Metade (0,1): passos sem resultado esperado. Zero (0): sem passos.

### ITEM 05-b
**Resposta esperada:** describe('login', () => { it('entra com credenciais válidas e chega ao painel', () => { cy.visit('/login'); cy.get('[data-testid="campo-email"]').type('aluno@senai.br'); cy.get('[data-testid="campo-senha"]').type('123456'); cy.get('[data-testid="botao-entrar"]').click(); cy.url().should('include', '/dashboard'); cy.contains('Bem-vindo').should('be.visible'); }); });
**Critérios:** Palavras-chave: cy.visit('/login'); type nos dois campos; click no Entrar; cy.url().should('include', '/dashboard'); cy.contains('Bem-vindo').should('be.visible'). Nota cheia (0,4): teste completo com as duas verificações. Metade (0,2): falta uma das verificações ou um dos campos. Zero (0): sem verificação, ou não é Cypress.

### ITEM 05-c
**Resposta esperada:** import { test, expect } from '@playwright/test'; test('entra com credenciais válidas', async ({ page }) => { await page.goto('/login'); await page.getByLabel('E-mail').fill('aluno@senai.br'); await page.getByLabel('Senha').fill('123456'); await page.getByRole('button', { name: 'Entrar' }).click(); await expect(page).toHaveURL(/dashboard/); await expect(page.getByText('Bem-vindo')).toBeVisible(); }); — As duas ferramentas têm **espera automática**: elas esperam o elemento aparecer e ficar clicável e **repetem a verificação** até passar ou estourar o tempo limite, por isso não é preciso esperar um tempo fixo.
**Critérios:** Palavras-chave: page.goto; getByLabel(...).fill; getByRole('button', { name: 'Entrar' }).click; toHaveURL; toBeVisible; await; espera automática. Nota cheia (0,4): teste correto + explicação da espera automática. Metade (0,2): só o teste ou só a explicação, ou teste sem await. Zero (0): sem teste e sem explicação.

### ITEM 06-a
**Resposta esperada:** 1) A mensagem **"Credenciais inválidas"** aparece. 2) A rota **continua /login** (o usuário não entrou).
**Critérios:** Palavras-chave: mensagem Credenciais inválidas; continua em /login. Nota cheia (0,2): as duas verificações. Metade (0,1): só uma. Zero (0): nenhuma correta.

### ITEM 06-b
**Resposta esperada:** Cypress: it('continua no login e avisa quando a senha está errada', () => { cy.visit('/login'); cy.get('[data-testid="campo-email"]').type('aluno@senai.br'); cy.get('[data-testid="campo-senha"]').type('errada'); cy.get('[data-testid="botao-entrar"]').click(); cy.contains('Credenciais inválidas').should('be.visible'); cy.url().should('include', '/login'); }); — ou Playwright: test('senha errada', async ({ page }) => { await page.goto('/login'); await page.getByLabel('E-mail').fill('aluno@senai.br'); await page.getByLabel('Senha').fill('errada'); await page.getByRole('button', { name: 'Entrar' }).click(); await expect(page.getByText('Credenciais inválidas')).toBeVisible(); await expect(page).toHaveURL(/login/); });
**Critérios:** Palavras-chave: senha diferente de 123456; verificação da mensagem; verificação da rota /login. Nota cheia (0,4): teste completo com as duas verificações. Metade (0,2): falta uma verificação. Zero (0): usa a senha certa ou não tem verificação.

### ITEM 06-c
**Resposta esperada:** Porque a tela pode **mostrar a mensagem de erro e mesmo assim deixar o usuário entrar** (ou redirecionar para o painel). Conferir que a **rota continua /login** garante o que importa no caso de falha: **o acesso foi negado**. Só a mensagem não prova isso.
**Critérios:** Palavras-chave: mensagem não prova que o acesso foi negado; rota /login = não entrou. Nota cheia (0,4): explicação completa. Metade (0,2): "para conferir mais coisas" sem dizer o risco. Zero (0): diz que a rota não importa.

### ITEM 07-a
**Resposta esperada:** Cada **etapa/ação** da tabela vira um **passo** do teste (visitar, clicar, digitar) e cada **"Verificação"** vira um **should** (Cypress) ou um **expect** (Playwright) logo depois do passo.
**Critérios:** Palavras-chave: ação → passo; verificação → should/expect. Nota cheia (0,2): as duas correspondências. Metade (0,1): só uma. Zero (0): não relaciona a tabela ao teste.

### ITEM 07-b
**Resposta esperada:** Playwright: test('finaliza a compra', async ({ page }) => { await page.goto('/'); await page.getByRole('button', { name: 'Adicionar ao carrinho' }).first().click(); await expect(page.getByTestId('contador-carrinho')).toHaveText('1'); await page.getByRole('link', { name: 'Carrinho' }).click(); await page.getByLabel('Quantidade').fill('2'); await expect(page.getByTestId('subtotal')).toHaveText('R$ 200,00'); await page.getByRole('link', { name: 'Finalizar' }).click(); await page.getByLabel('CEP').fill('89160-000'); await page.getByLabel('Cartão de teste').fill('4111111111111111'); await expect(page.getByRole('button', { name: 'Confirmar' })).toBeEnabled(); await page.getByRole('button', { name: 'Confirmar' }).click(); await expect(page.getByText('Pedido confirmado')).toBeVisible(); await expect(page.getByTestId('numero-pedido')).toBeVisible(); }); — (vale a versão em Cypress com should('have.text', '1'), should('be.enabled') e should('be.visible'); nomes de botões, campos e valores podem ser outros.)
**Critérios:** Palavras-chave: contador = 1; quantidade 2 e subtotal; campos de entrega e pagamento + Confirmar habilitado; mensagem de sucesso e número do pedido. Nota cheia (0,4): as quatro etapas, cada uma com verificação. Metade (0,2): duas ou três etapas com verificação. Zero (0): uma etapa ou nenhuma verificação.

### ITEM 07-c
**Resposta esperada:** Sem verificação no meio, o teste **só falha no fim** e diz apenas que **"algo deu errado em algum lugar"**. Com verificação depois de cada etapa, a falha **aponta a etapa exata** (por exemplo, o subtotal errado no carrinho), e quem corrige já sabe onde procurar o defeito.
**Critérios:** Palavras-chave: falha só no fim; algo deu errado em algum lugar; aponta a etapa exata. Nota cheia (0,4): explicação completa. Metade (0,2): "fica mais organizado" sem falar em localizar a falha. Zero (0): diz que não faz diferença.

### ITEM 08-a
**Resposta esperada:** Porque o defeito só aparece **no navegador real (WebKit)**, com a **tela inteira montada**: o banner de cookies **cobre o botão**. Os testes unitários e de integração rodam no Node/JSDOM, **sem desenhar a tela** nem simular a sobreposição de elementos.
**Critérios:** Palavras-chave: navegador real/WebKit; tela montada de verdade; unitário/integração não desenham a tela. Nota cheia (0,2): explicação completa. Metade (0,1): "o E2E é mais completo" sem dizer por quê. Zero (0): culpa o código do botão.

### ITEM 08-b
**Resposta esperada:** Três entre: a **mensagem de erro aparece e diz o que corrigir**; depois da ação, o usuário vai para a **página certa**; os **campos têm rótulo** (getByLabel encontra); os **botões têm nome** (getByRole encontra); o fluxo funciona **só com o teclado** (Tab e Enter).
**Critérios:** Palavras-chave: mensagem que diz o que corrigir; página certa depois da ação; rótulo nos campos; nome nos botões; teclado. Nota cheia (0,4): três verificações corretas. Metade (0,2): duas. Zero (0): uma ou nenhuma.

### ITEM 08-c
**Resposta esperada:** await page.goto('/login'); await page.getByLabel('E-mail').fill('aluno@senai.br'); await page.keyboard.press('Tab'); await page.keyboard.type('123456'); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/dashboard/); — O teste garante que o usuário que **não usa mouse** (por limitação motora, leitor de tela ou preferência) **consegue completar o login**: a ordem do Tab leva ao campo certo e o Enter envia o formulário.
**Critérios:** Palavras-chave: keyboard.press('Tab'); keyboard.press('Enter'); verificação da chegada ao painel; usuário sem mouse consegue usar. Nota cheia (0,4): trecho com Tab e Enter + explicação. Metade (0,2): só o trecho ou só a explicação, ou trecho sem verificação. Zero (0): usa click no lugar do teclado.

### ITEM 09-a
**Resposta esperada:** Teste **intermitente (flaky)** é o que **passa ou falha sem mudança no código**. Aqui a causa é a **espera fixa cy.wait(2000)**: na máquina lenta a lista de produtos demora mais de 2 segundos e o teste verifica antes de ela chegar.
**Critérios:** Palavras-chave: passa/falha sem mudar o código; espera fixa de 2 segundos; máquina lenta. Nota cheia (0,2): definição + causa. Metade (0,1): só uma das partes. Zero (0): culpa o seletor.

### ITEM 09-b
**Resposta esperada:** cy.intercept('GET', '/api/produtos*').as('produtos'); cy.get('[data-testid="botao-buscar"]').click(); cy.wait('@produtos'); cy.contains('Teclado').should('be.visible');
**Critérios:** Palavras-chave: cy.intercept antes do clique; .as('produtos'); cy.wait('@produtos'); sem cy.wait com número. Nota cheia (0,4): trecho correto com o intercept antes da ação. Metade (0,2): intercept depois do clique, ou sem o alias. Zero (0): mantém o tempo fixo.

### ITEM 09-c
**Resposta esperada:** A espera pela requisição ou pelo elemento **termina exatamente quando o dado chega**: na máquina lenta espera o necessário (até o tempo limite) e **não falha à toa**; na máquina rápida **não perde tempo** esperando 2 segundos inteiros. O tempo fixo é sempre um chute: **curto demais** deixa o teste instável e **longo demais** deixa a suíte lenta.
**Critérios:** Palavras-chave: termina quando o dado chega; não falha na máquina lenta; não perde tempo na rápida; tempo fixo é chute. Nota cheia (0,4): os dois lados (lenta e rápida). Metade (0,2): só um lado. Zero (0): diz que basta aumentar o tempo fixo.

### ITEM 10-a
**Resposta esperada:** 1) "Carrinho com 2 itens" falha depois de "adiciona produto": **dados compartilhados** — o carrinho ficou com o produto do teste anterior. 2) "Finaliza a compra" só passa depois do login: **dependência de ordem** entre testes — o teste usa o login feito por outro teste.
**Critérios:** Palavras-chave: dados compartilhados; ordem/dependência entre testes. Nota cheia (0,2): as duas causas. Metade (0,1): só uma. Zero (0): nenhuma causa certa.

### ITEM 10-b
**Resposta esperada:** Cypress: beforeEach(() => { cy.clearLocalStorage(); cy.clearCookies(); cy.visit('/login'); cy.get('[data-testid="campo-email"]').type('aluno@senai.br'); cy.get('[data-testid="campo-senha"]').type('123456'); cy.get('[data-testid="botao-entrar"]').click(); cy.url().should('include', '/dashboard'); }); — ou Playwright: test.beforeEach(async ({ page }) => { await page.goto('/login'); await page.evaluate(() => localStorage.clear()); await page.getByLabel('E-mail').fill('aluno@senai.br'); await page.getByLabel('Senha').fill('123456'); await page.getByRole('button', { name: 'Entrar' }).click(); await expect(page).toHaveURL(/dashboard/); });
**Critérios:** Palavras-chave: beforeEach; limpa o carrinho/armazenamento (clearLocalStorage, localStorage.clear ou carrinho criado pelo teste); login feito no próprio beforeEach. Nota cheia (0,4): limpeza + login no beforeEach. Metade (0,2): só a limpeza ou só o login. Zero (0): sem beforeEach ou que dependa de outro teste.

### ITEM 10-c
**Resposta esperada:** Rodar a suíte **3 vezes** seguidas mostra se algum teste **muda de resultado sem mudança no código**. Esse teste é **flaky** e precisa ser **corrigido** (achar a causa: espera fixa, dados compartilhados, ordem, animação) e **registrado** (teste, causa e correção) — **não ignorado** nem apagado, porque um teste em que ninguém confia deixa de proteger o sistema.
**Critérios:** Palavras-chave: 3 vezes; muda de resultado sem mudar o código; corrigir a causa; não ignorar. Nota cheia (0,4): regra + o que fazer. Metade (0,2): só a regra ou só "corrigir". Zero (0): manda ignorar, rodar de novo até passar ou apagar o teste.
