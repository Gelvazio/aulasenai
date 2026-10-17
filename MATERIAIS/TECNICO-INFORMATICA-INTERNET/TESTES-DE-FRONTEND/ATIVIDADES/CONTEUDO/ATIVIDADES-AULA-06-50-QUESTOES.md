# Atividade: Testes End to End com Cypress e Playwright — 50 Questões

- **Aula:** 06
- **Tema:** Testes End to End com Cypress e Playwright
- **Ícone:** 🧭
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar testes definidos no Plano de Testes e desenvolver testes automatizados end-to-end: o que é um teste E2E e o lugar dele na pirâmide, Cypress e Playwright (2.2), instalação, configuração e execução (2.3), seletores estáveis e teste caixa preta (3.1), fluxos de login e checkout, usabilidade no fluxo (4.2) e testes intermitentes com dados isolados.
- **Conteúdo-base:** ../CONTEUDO/AULA-06-TESTES-END-TO-END-COM-CYPRESS-E-PLAYWRIGHT.md
- **Slides:** ../AULAS/AULA-06-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-06-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É um Teste E2E

- **Capacidade:** C4

**Comando:**  
O que caracteriza um teste end-to-end (E2E)?

**Alternativas:**
- A) Testa uma única função isolada, sem tela, dentro do Node.
- B) Monta um componente no DOM simulado (JSDOM) com a API sempre simulada.
- C) Abre o navegador real, acessa a aplicação rodando e faz o caminho completo do usuário.
- D) Confere apenas se o código segue as regras de formatação do projeto.

**Gabarito:** C

---

## ITEM 02 — Ambiente do E2E

- **Capacidade:** C4

**Comando:**  
Em que ambiente o teste E2E é executado?

**Alternativas:**
- A) No navegador real, com a aplicação no ar.
- B) No JSDOM, que simula o DOM dentro do Node.
- C) Somente no Node, sem nenhuma página carregada.
- D) No banco de dados de produção, sem a tela.

**Gabarito:** A

---

## ITEM 03 — Velocidade do E2E

- **Capacidade:** C4

**Comando:**  
Comparado aos testes unitários e de integração, como é a velocidade de um teste E2E?

**Alternativas:**
- A) Leva décimos de segundo, como o teste de integração.
- B) Tem a mesma velocidade de um teste unitário.
- C) É o mais rápido: cada teste leva milissegundos.
- D) É o mais lento: cada teste leva segundos.

**Gabarito:** D

---

## ITEM 04 — Pirâmide de Testes

- **Capacidade:** C4

**Comando:**  
Quantos testes E2E a suíte deve ter, pela pirâmide de testes?

**Alternativas:**
- A) Muitos, porque substituem todos os testes unitários.
- B) Poucos, só para os fluxos críticos, como login e checkout.
- C) Um para cada função do código, como os unitários.
- D) Nenhum, porque o teste de integração já usa o navegador real.

**Gabarito:** B

---

## ITEM 05 — Erro Que o E2E Encontra

- **Capacidade:** C4

**Comando:**  
Que tipo de erro o teste E2E é o mais indicado para encontrar?

**Alternativas:**
- A) Erro no caminho real do usuário, com todas as partes funcionando juntas.
- B) Erro de cálculo dentro de uma função pura.
- C) Erro de digitação no nome de uma variável interna.
- D) Erro de indentação no arquivo de estilo.

**Gabarito:** A

---

## ITEM 06 — Validação no E2E

- **Capacidade:** C4

**Comando:**  
O E2E confirma que tela, rotas, API e banco de teste juntos permitem ao usuário completar a tarefa. Isso é:

**Alternativas:**
- A) Revisão de código: um colega lê o diff.
- B) Teste unitário: uma função testada isoladamente.
- C) Verificação estática: leitura do código sem executar.
- D) Validação: o sistema atende ao que o usuário precisa fazer.

**Gabarito:** D

---

## ITEM 07 — Instalando o Cypress

- **Capacidade:** C5

**Comando:**  
Qual comando instala o Cypress como dependência de desenvolvimento?

**Alternativas:**
- A) npx cypress install-browser
- B) npm init cypress@latest --global
- C) npm run cypress
- D) npm install -D cypress

**Gabarito:** D

---

## ITEM 08 — Instalando o Playwright

- **Capacidade:** C5

**Comando:**  
Qual comando inicia um projeto com o Playwright?

**Alternativas:**
- A) npm init playwright@latest
- B) npm install -g playwright-cli
- C) npx playwright open
- D) npm run playwright:start

**Gabarito:** A

---

## ITEM 09 — Interface do Cypress

- **Capacidade:** C5

**Comando:**  
Qual comando abre o painel visual do Cypress para escolher e acompanhar os testes?

**Alternativas:**
- A) npx cypress test --ui
- B) npm run cypress:headless
- C) npx cypress run
- D) npx cypress open

**Gabarito:** D

---

## ITEM 10 — Cypress Sem Interface

- **Capacidade:** C5

**Comando:**  
Qual comando roda todos os testes do Cypress sem abrir o painel, como no CI?

**Alternativas:**
- A) npx cypress run
- B) npx cypress --ui
- C) npx cypress open
- D) npx cypress watch

**Gabarito:** A

---

## ITEM 11 — Executando no Playwright

- **Capacidade:** C5

**Comando:**  
Qual comando roda os testes do Playwright com a interface visual?

**Alternativas:**
- A) npx playwright open
- B) npx playwright run --panel
- C) npx playwright test --ui
- D) npx playwright watch

**Gabarito:** C

---

## ITEM 12 — Navegadores do Playwright

- **Capacidade:** C5

**Comando:**  
Em quais motores de navegador o Playwright executa os testes?

**Alternativas:**
- A) Somente Chrome e Electron.
- B) Somente Internet Explorer e Edge.
- C) Somente no JSDOM.
- D) Chromium, Firefox e WebKit (Safari).

**Gabarito:** D

---

## ITEM 13 — Navegadores do Cypress

- **Capacidade:** C5

**Comando:**  
Em quais navegadores o Cypress executa os testes?

**Alternativas:**
- A) Somente no JSDOM, sem navegador.
- B) Somente Safari.
- C) Chromium, Firefox e WebKit (Safari).
- D) Chrome, Edge, Firefox e Electron.

**Gabarito:** D

---

## ITEM 14 — Estilo do Cypress

- **Capacidade:** C5

**Comando:**  
Como os testes do Cypress são escritos?

**Alternativas:**
- A) Com comandos encadeados, como cy.get().type().
- B) Com expect do Vitest no Node.
- C) Só com arquivos de texto sem código.
- D) Com async e await em cada linha, como await page.click().

**Gabarito:** A

---

## ITEM 15 — Estilo do Playwright

- **Capacidade:** C5

**Comando:**  
Como os testes do Playwright são escritos?

**Alternativas:**
- A) Com async e await, como await page.getByRole().click().
- B) Só com gravação de vídeo, sem código.
- C) Com comandos encadeados, como cy.get().click().
- D) Com consultas ao banco de dados.

**Gabarito:** A

---

## ITEM 16 — Destaque do Cypress

- **Capacidade:** C5

**Comando:**  
Qual é um destaque do Cypress citado na aula?

**Alternativas:**
- A) Painel visual com "viagem no tempo" pelos passos do teste.
- B) Testes sem navegador, só no Node.
- C) Geração automática de testes unitários.
- D) Execução nativa no WebKit do Safari.

**Gabarito:** A

---

## ITEM 17 — Destaque do Playwright

- **Capacidade:** C5

**Comando:**  
Qual é um destaque do Playwright citado na aula?

**Alternativas:**
- A) Funcionar apenas dentro do Electron.
- B) Substituir o plano de testes.
- C) Vários navegadores e abas, com trace detalhado da execução.
- D) Dispensar a aplicação rodando para testar.

**Gabarito:** C

---

## ITEM 18 — Escolhendo a Ferramenta

- **Capacidade:** C5

**Comando:**  
A loja tem muitos clientes que compram pelo Safari do iPhone. Qual ferramenta é a mais indicada?

**Alternativas:**
- A) Playwright, porque executa os testes no WebKit, o motor do Safari.
- B) Nenhuma, porque Safari não pode ser testado.
- C) Qualquer uma, porque o navegador não muda o resultado.
- D) Cypress, porque roda no Electron.

**Gabarito:** A

---

## ITEM 19 — Espera Automática

- **Capacidade:** C5

**Comando:**  
Por que Cypress e Playwright não precisam de espera fixa antes de clicar em um botão?

**Alternativas:**
- A) Porque clicam em qualquer lugar da página ao mesmo tempo.
- B) Porque desligam as animações e a rede do navegador.
- C) Porque esperam automaticamente o elemento aparecer e ficar clicável.
- D) Porque a página sempre carrega em menos de 1 milissegundo.

**Gabarito:** C

---

## ITEM 20 — Endereço Base no Cypress

- **Capacidade:** C5

**Comando:**  
Onde fica o endereço base da aplicação no Cypress, para usar cy.visit('/login')?

**Alternativas:**
- A) Na opção use.baseURL do playwright.config.js.
- B) Na opção baseUrl do cypress.config.js.
- C) No arquivo package.json, na chave main.
- D) Em uma variável global dentro de cada teste.

**Gabarito:** B

---

## ITEM 21 — Endereço Base no Playwright

- **Capacidade:** C5

**Comando:**  
Onde fica o endereço base da aplicação no Playwright, para usar page.goto('/login')?

**Alternativas:**
- A) No arquivo .gitignore.
- B) Em baseUrl do cypress.config.js.
- C) No index.html da aplicação.
- D) Em use.baseURL do playwright.config.js.

**Gabarito:** D

---

## ITEM 22 — Aplicação Rodando

- **Capacidade:** C5

**Comando:**  
Antes de executar os testes E2E, o que precisa estar no ar?

**Alternativas:**
- A) Somente o editor VS Code aberto.
- B) Nada: o teste E2E dispensa a aplicação.
- C) A aplicação, por exemplo com npm run dev em http://localhost:5173.
- D) O servidor de produção da loja.

**Gabarito:** C

---

## ITEM 23 — Seletor por Classe

- **Capacidade:** C4

**Comando:**  
Por que cy.get('.btn.btn-primary') é um seletor ruim?

**Alternativas:**
- A) Classes são proibidas em HTML.
- B) O Cypress não aceita seletores com ponto.
- C) A classe de estilo muda com o layout e quebra o teste sem defeito real.
- D) A classe deixa o teste mais rápido demais.

**Gabarito:** C

---

## ITEM 24 — Seletor por Papel

- **Capacidade:** C4

**Comando:**  
Qual seletor do Playwright encontra o botão Entrar pelo papel e pelo nome?

**Alternativas:**
- A) page.getByClass('entrar')
- B) page.getByRole('button', { name: 'Entrar' })
- C) page.locator('div > form > button')
- D) page.locator('.btn-primary')

**Gabarito:** B

---

## ITEM 25 — Seletor por Rótulo

- **Capacidade:** C4

**Comando:**  
Qual seletor do Playwright encontra o campo de e-mail pelo rótulo?

**Alternativas:**
- A) page.locator('input:nth-child(1)')
- B) page.locator('form input')
- C) page.getByLabel('E-mail')
- D) page.getByClass('campo')

**Gabarito:** C

---

## ITEM 26 — Atributo de Teste

- **Capacidade:** C4

**Comando:**  
Como o Cypress seleciona o botão pelo atributo de teste combinado com a equipe?

**Alternativas:**
- A) cy.get('#root button:last-child')
- B) cy.get('div > div > button')
- C) cy.get('.botao-azul')
- D) cy.get('[data-testid="botao-entrar"]')

**Gabarito:** D

---

## ITEM 27 — Quando Usar data-testid

- **Capacidade:** C4

**Comando:**  
Quando o data-testid é a escolha indicada?

**Alternativas:**
- A) Em elementos sem texto estável, combinando o atributo com a equipe de front-end.
- B) Nunca, porque é um atributo proibido no HTML.
- C) Somente nos elementos de estilo, no lugar das classes.
- D) Em todos os elementos, mesmo nos que têm texto e rótulo.

**Gabarito:** A

---

## ITEM 28 — Ordem dos Seletores

- **Capacidade:** C4

**Comando:**  
Qual é a ordem de preferência dos seletores vista na aula?

**Alternativas:**
- A) Qualquer ordem, porque todos são igualmente estáveis.
- B) Papel e nome, depois rótulo do campo, depois atributo de teste.
- C) Classe de estilo, depois estrutura, depois papel.
- D) Estrutura do HTML, depois data-testid, depois classe.

**Gabarito:** B

---

## ITEM 29 — Caixa Preta no E2E

- **Capacidade:** C4

**Comando:**  
O que é escrever o teste E2E como caixa preta (3.1)?

**Alternativas:**
- A) Testar só pelo que o usuário vê e faz, sem olhar o código interno.
- B) Ler cada linha do código para escolher os testes.
- C) Testar apenas as funções privadas do sistema.
- D) Testar com a tela desligada e o navegador escondido.

**Gabarito:** A

---

## ITEM 30 — Visitar a Página

- **Capacidade:** C5

**Comando:**  
Qual comando do Cypress acessa a página de login usando o endereço base?

**Alternativas:**
- A) cy.request.page('/login')
- B) cy.goto('/login')
- C) cy.open('/login')
- D) cy.visit('/login')

**Gabarito:** D

---

## ITEM 31 — Digitar no Campo

- **Capacidade:** C5

**Comando:**  
Como o Playwright preenche o campo Senha com 123456?

**Alternativas:**
- A) await page.type.Senha = '123456';
- B) page.getByLabel('Senha').digitar('123456');
- C) cy.get('Senha').fill('123456');
- D) await page.getByLabel('Senha').fill('123456');

**Gabarito:** D

---

## ITEM 32 — Verificar a URL no Cypress

- **Capacidade:** C5

**Comando:**  
Qual verificação do Cypress confere que o usuário chegou ao painel?

**Alternativas:**
- A) expect(cy.url).toBe('/dashboard');
- B) cy.should('url', 'dashboard').wait(2000);
- C) cy.url().should('include', '/dashboard');
- D) cy.url() === '/dashboard';

**Gabarito:** C

---

## ITEM 33 — Verificar a URL no Playwright

- **Capacidade:** C5

**Comando:**  
Qual verificação do Playwright confere que o usuário chegou ao painel?

**Alternativas:**
- A) await page.should('include', '/dashboard');
- B) page.url === '/dashboard';
- C) expect(page.url).toBeTruthy();
- D) await expect(page).toHaveURL(/dashboard/);

**Gabarito:** D

---

## ITEM 34 — Mensagem Visível

- **Capacidade:** C5

**Comando:**  
Qual verificação do Playwright confere que a saudação aparece na tela?

**Alternativas:**
- A) await expect(page.getByText('Bem-vindo')).toBeVisible();
- B) await page.waitForTimeout(3000);
- C) await page.getByText('Bem-vindo');
- D) expect('Bem-vindo').toBeDefined();

**Gabarito:** A

---

## ITEM 35 — Login com Falha

- **Capacidade:** C4

**Comando:**  
No caso de teste da senha errada, quais são as duas verificações esperadas?

**Alternativas:**
- A) O navegador fecha e o teste termina sem verificar nada.
- B) A rota muda para /dashboard e aparece "Bem-vindo".
- C) A mensagem "Credenciais inválidas" aparece e a rota continua /login.
- D) O botão Entrar some e a página fica em branco.

**Gabarito:** C

---

## ITEM 36 — Por Que Conferir a Rota

- **Capacidade:** C4

**Comando:**  
Por que o teste da senha errada também confere que a rota continua /login?

**Alternativas:**
- A) Porque o Cypress exige verificar a rota em todo teste.
- B) Porque a tela pode mostrar o erro e mesmo assim deixar o usuário entrar.
- C) Porque a mensagem de erro nunca aparece no navegador real.
- D) Porque a rota deixa o teste mais rápido.

**Gabarito:** B

---

## ITEM 37 — Caso de Teste em E2E

- **Capacidade:** C4

**Comando:**  
Como uma linha do caso de teste do plano (ação + verificação) vira teste E2E?

**Alternativas:**
- A) A linha vira um teste unitário no Node.
- B) As duas viram uma espera fixa de 2 segundos.
- C) A ação vira um comentário e a verificação é ignorada.
- D) A ação vira um passo do teste e a verificação vira um should ou um expect.

**Gabarito:** D

---

## ITEM 38 — Verificação no Meio do Caminho

- **Capacidade:** C4

**Comando:**  
Por que o teste do checkout precisa de verificações depois de cada etapa?

**Alternativas:**
- A) Porque o navegador fecha se não houver verificação.
- B) Porque sem verificação o teste não pode ser executado.
- C) Para a falha apontar a etapa exata, e não só "algo deu errado em algum lugar".
- D) Para o teste ficar mais longo e parecer mais completo.

**Gabarito:** C

---

## ITEM 39 — Contador do Carrinho

- **Capacidade:** C5

**Comando:**  
No checkout, depois de adicionar 1 produto na vitrine, qual verificação o plano pede?

**Alternativas:**
- A) O botão Confirmar fica habilitado.
- B) O contador do carrinho mostra 1.
- C) A mensagem de pedido confirmado aparece.
- D) O subtotal mostra 2 × preço.

**Gabarito:** B

---

## ITEM 40 — Botão Habilitado

- **Capacidade:** C5

**Comando:**  
Qual verificação do Playwright confere que o botão Confirmar pode ser clicado?

**Alternativas:**
- A) await page.getByRole('button', { name: 'Confirmar' }).wait(2000);
- B) await expect(page.getByRole('button', { name: 'Confirmar' })).toBeEnabled();
- C) expect('Confirmar').toBe(true);
- D) await page.locator('.btn-confirmar').exists();

**Gabarito:** B

---

## ITEM 41 — Defeito Só no E2E

- **Capacidade:** C4

**Comando:**  
O botão Confirmar fica coberto por um banner de cookies só no WebKit. Por que só o E2E achou o defeito?

**Alternativas:**
- A) Porque o defeito estava no banco de dados.
- B) Porque só ele desenha a tela inteira no navegador real, onde o banner cobre o botão.
- C) Porque o JSDOM roda apenas no Safari.
- D) Porque os testes unitários não sabem clicar em botões vermelhos.

**Gabarito:** B

---

## ITEM 42 — Usabilidade no E2E

- **Capacidade:** C4

**Comando:**  
Qual destas é uma verificação de usabilidade (4.2) que cabe num teste E2E?

**Alternativas:**
- A) A mensagem de erro aparece e diz ao usuário o que corrigir.
- B) O nome das variáveis está em português.
- C) A função de soma devolve o número certo.
- D) O arquivo de estilo tem menos de 100 linhas.

**Gabarito:** A

---

## ITEM 43 — Rótulo e Usabilidade

- **Capacidade:** C4

**Comando:**  
Se getByLabel('E-mail') não encontra o campo, o que isso indica sobre a tela?

**Alternativas:**
- A) O teste precisa de uma espera fixa maior.
- B) O campo não tem rótulo, o que prejudica o usuário e o leitor de tela.
- C) O teste está certo e o campo está perfeito.
- D) O navegador real não aceita campos de e-mail.

**Gabarito:** B

---

## ITEM 44 — Uso Só com Teclado

- **Capacidade:** C4

**Comando:**  
Qual comando do Playwright envia o formulário com a tecla Enter?

**Alternativas:**
- A) await page.mouse.click('Enter');
- B) await page.keyboard.press('Enter');
- C) cy.press('Enter').wait(1000);
- D) await page.getByRole('Enter').fill();

**Gabarito:** B

---

## ITEM 45 — Teste Intermitente

- **Capacidade:** C5

**Comando:**  
O que é um teste intermitente (flaky)?

**Alternativas:**
- A) Um teste que nunca é executado no CI.
- B) Um teste que passa ou falha sem que o código tenha mudado.
- C) Um teste escrito em mais de uma ferramenta.
- D) Um teste que sempre falha porque o código está errado.

**Gabarito:** B

---

## ITEM 46 — Espera Fixa

- **Capacidade:** C5

**Comando:**  
Por que cy.wait(2000) deixa o teste instável?

**Alternativas:**
- A) Porque o Cypress não aceita números como parâmetro.
- B) Porque a espera fixa apaga os dados do teste.
- C) Na máquina lenta os dados demoram mais que 2 segundos e o teste verifica antes.
- D) Porque 2 segundos é tempo demais em qualquer máquina.

**Gabarito:** C

---

## ITEM 47 — Esperar a Requisição

- **Capacidade:** C5

**Comando:**  
Como o Cypress espera a requisição da lista de produtos no lugar de um tempo fixo?

**Alternativas:**
- A) cy.wait(5000); em todos os testes da suíte.
- B) cy.intercept('GET', '/api/produtos*').as('produtos'); e depois cy.wait('@produtos');
- C) cy.get('produtos').sleep();
- D) cy.reload() até a lista aparecer.

**Gabarito:** B

---

## ITEM 48 — Dados Compartilhados

- **Capacidade:** C5

**Comando:**  
Um teste passa sozinho e falha quando roda com os outros da suíte. Qual é a causa provável?

**Alternativas:**
- A) O seletor por papel não funciona em suítes grandes.
- B) A aplicação está rodando no endereço certo.
- C) Dados compartilhados: um teste anterior deixou dados que mudam o resultado.
- D) O navegador está desligado.

**Gabarito:** C

---

## ITEM 49 — Dependência de Ordem

- **Capacidade:** C5

**Comando:**  
O teste "finaliza a compra" só passa se o teste de login rodar antes. Como corrigir?

**Alternativas:**
- A) Fazer o login no próprio teste ou em beforeEach, deixando o teste independente.
- B) Sempre rodar os testes na mesma ordem e nunca isolados.
- C) Apagar o teste de login da suíte.
- D) Colocar um cy.wait(10000) no começo do teste.

**Gabarito:** A

---

## ITEM 50 — Rodar Três Vezes

- **Capacidade:** C5

**Comando:**  
O que fazer com um teste que muda de resultado ao rodar a suíte 3 vezes sem mudança no código?

**Alternativas:**
- A) Apagar o teste para a suíte ficar verde.
- B) Tratar como flaky: achar a causa, corrigir e registrar, sem ignorar.
- C) Rodar de novo até ele passar e entregar.
- D) Ignorar, porque ele passou em pelo menos uma das vezes.

**Gabarito:** B
