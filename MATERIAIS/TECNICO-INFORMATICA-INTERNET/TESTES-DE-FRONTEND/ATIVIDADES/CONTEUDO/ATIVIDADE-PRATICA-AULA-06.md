# Atividade: Atividade Prática — Aula 06 — 10 Questões Discursivas

- **Aula:** AP-06
- **Rótulo da aula:** Atividade Prática — Aula 06
- **Tema:** Testes End to End com Cypress e Playwright
- **Ícone:** 🧭
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-06.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar e desenvolver, por escrito, testes end-to-end com os conteúdos da aula 06 (CONTEUDO/AULA-06-TESTES-END-TO-END-COM-CYPRESS-E-PLAYWRIGHT.md): o que é um teste E2E e o lugar dele na pirâmide, escolha entre Cypress e Playwright (2.2), configuração e execução (2.3), seletores estáveis como caixa preta (3.1), fluxos de login e de checkout, verificações de usabilidade (4.2) e testes intermitentes (flaky) com dados isolados.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-06-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 6

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para automatizar no navegador real os fluxos críticos de uma loja virtual (login e finalização da compra), usando Cypress ou Playwright, e para explicar à equipe cada escolha.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o código pedido escrito por inteiro (teste com cy. ou page., seletores e verificações) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Escreva o código como escreveria no VS Code. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código correto (rota visitada, seletor estável, ação e verificação com should ou expect) e justificativa com as palavras-chave do conteúdo. Nomes de testes diferentes valem, desde que o código esteja correto; aspas simples ou duplas e ponto e vírgula opcional são aceitos; a resposta pode ser em Cypress ou em Playwright quando o tópico não fixar a ferramenta. Erros de português não tiram nota se a ideia estiver clara.

**Aplicação usada em várias questões:** a loja roda em http://localhost:5173 (npm run dev). A tela /login tem os campos de rótulo "E-mail" e "Senha" (data-testid campo-email e campo-senha) e o botão "Entrar" (data-testid botao-entrar). Com aluno@senai.br e 123456, o usuário vai para /dashboard e vê "Bem-vindo"; com senha errada, continua em /login e vê "Credenciais inválidas". O checkout segue vitrine → carrinho → checkout → confirmação.

## Cobertura da aula

| Conteúdo da aula 06 | Questões |
|---|---|
| O que é um teste E2E e a pirâmide de testes | 01 |
| Frameworks E2E: Cypress × Playwright (2.2) | 02 |
| Aplicação: instalação, configuração e execução (2.3) | 03 |
| Seletores estáveis e teste caixa preta (3.1) | 04 |
| Fluxo de login (sucesso e falha) | 05, 06 |
| Fluxo de checkout: caso de teste do plano → E2E | 07 |
| Usabilidade no E2E (4.2) | 08 |
| Testes intermitentes (flaky) e dados isolados | 09, 10 |

---

## ITEM 01 — O Lugar do Teste E2E

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, ouviu da equipe: "Se o E2E testa tudo de verdade, vamos escrever só testes E2E e apagar os unitários".

**Comando:**
Explique à equipe o papel do teste E2E na suíte.

**Tópicos:**
- a) Diga o que é um teste end-to-end (E2E) e em que ambiente ele roda. (0,2)
- b) Compare unitário, integração e E2E quanto ao ambiente, à velocidade e ao tipo de erro que cada um encontra. (0,4)
- c) Explique por que a suíte deve ter poucos testes E2E, só dos fluxos críticos, e muitos unitários. (0,4)

---

## ITEM 02 — Cypress ou Playwright

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa escolher a ferramenta E2E. A equipe avisa que a loja tem muitos clientes que compram pelo Safari do iPhone.

**Comando:**
Compare as ferramentas e recomende uma.

**Tópicos:**
- a) Escreva o comando que instala cada uma das duas ferramentas. (0,2)
- b) Compare Cypress e Playwright em dois aspectos: navegadores suportados e estilo de escrita do código. (0,4)
- c) Recomende uma das duas para esta loja e justifique a escolha pelo motivo apresentado pela equipe. (0,4)

---

## ITEM 03 — Configurando e Executando

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, quer escrever cy.visit('/login') ou page.goto('/login') sem repetir o endereço completo da loja em todos os testes.

**Comando:**
Configure a ferramenta e execute os testes.

**Tópicos:**
- a) Diga qual opção guarda o endereço base da aplicação no Cypress e no Playwright e em que arquivo cada uma fica. (0,2)
- b) Escreva a configuração do endereço base http://localhost:5173 em uma das duas ferramentas. (0,4)
- c) Escreva os comandos que executam os testes com e sem a interface visual na ferramenta escolhida e explique por que a aplicação precisa estar rodando antes. (0,4)

---

## ITEM 04 — Seletores Estáveis

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, encontrou no projeto o seletor cy.get('.btn.btn-primary') para clicar no botão Entrar. Depois de uma mudança no layout, o teste quebrou, mas o botão continuava funcionando.

**Comando:**
Corrija os seletores do teste.

**Tópicos:**
- a) Explique por que classe de estilo não deve ser usada como seletor. (0,2)
- b) Reescreva o seletor do botão Entrar de duas formas estáveis: pelo papel e nome e pelo atributo data-testid. (0,4)
- c) Explique o que é escrever o teste E2E como caixa preta (3.1) e por que a ordem de preferência é papel e nome, depois rótulo, depois data-testid. (0,4)

---

## ITEM 05 — Login com Sucesso

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai automatizar o primeiro caso de teste do plano: o usuário entra com credenciais válidas e chega ao painel.

**Comando:**
Escreva o teste do login aceito.

**Tópicos:**
- a) Escreva os passos do caso de teste (ação e resultado esperado), do jeito que o plano de testes descreve. (0,2)
- b) Escreva em Cypress o teste completo do login aceito, com as verificações da URL e da mensagem de boas-vindas. (0,4)
- c) Escreva o mesmo teste em Playwright e explique por que nenhum dos dois precisa de espera fixa antes de verificar a mensagem. (0,4)

---

## ITEM 06 — Login com Senha Errada

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai automatizar o caso de falha: com a senha errada, o usuário não pode entrar.

**Comando:**
Escreva o teste do login recusado.

**Tópicos:**
- a) Diga quais são as duas verificações do caso de falha. (0,2)
- b) Escreva o teste completo do login com senha errada em Cypress ou em Playwright. (0,4)
- c) Explique por que o teste de falha também confere a rota e não só a mensagem de erro. (0,4)

---

## ITEM 07 — Do Caso de Teste ao Checkout

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, recebeu do plano de testes o caso do checkout: vitrine (adicionar 1 produto, contador = 1), carrinho (quantidade 2, subtotal = 2 × preço), checkout (entrega e pagamento de teste, botão Confirmar habilitado) e confirmação (mensagem de sucesso e número do pedido).

**Comando:**
Transforme o caso de teste em teste E2E.

**Tópicos:**
- a) Explique como cada linha da tabela do caso de teste vira parte do teste E2E (passo e verificação). (0,2)
- b) Escreva o teste do checkout em Cypress ou Playwright com pelo menos uma verificação em cada uma das quatro etapas. (0,4)
- c) Explique por que um teste E2E sem verificação no meio do caminho é ruim para quem precisa corrigir o defeito. (0,4)

---

## ITEM 08 — Usabilidade no Fluxo

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, automatizou o checkout no Chromium e no WebKit. No WebKit, o teste falha na etapa de pagamento: o botão Confirmar fica coberto por um banner de cookies e não recebe o clique. Os testes unitários e de integração passavam todos.

**Comando:**
Analise o defeito e acrescente verificações de usabilidade.

**Tópicos:**
- a) Diga por que só o teste E2E encontrou esse defeito. (0,2)
- b) Cite três verificações de usabilidade (4.2) que cabem num teste E2E de cadastro ou de login. (0,4)
- c) Escreva em Playwright o trecho que preenche o login e envia o formulário só com o teclado e explique o que esse teste garante ao usuário. (0,4)

---

## ITEM 09 — A Espera Fixa

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, encontrou este trecho num teste que falha às vezes nas máquinas mais lentas do laboratório: cy.get('[data-testid="botao-buscar"]').click(); cy.wait(2000); cy.contains('Teclado').should('be.visible');

**Comando:**
Corrija o teste intermitente.

**Tópicos:**
- a) Diga o que é um teste intermitente (flaky) e qual é a causa dele neste trecho. (0,2)
- b) Reescreva o trecho em Cypress esperando a requisição GET /api/produtos com cy.intercept e cy.wait('@alias') no lugar do tempo fixo. (0,4)
- c) Explique por que esperar a requisição ou o elemento é mais confiável do que esperar 2 segundos, mesmo nas máquinas rápidas. (0,4)

---

## ITEM 10 — Dados Isolados e Ordem dos Testes

- **Aula:** 06 · Testes End to End com Cypress e Playwright
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, percebeu que o teste "carrinho com 2 itens" passa quando roda sozinho, mas falha quando roda depois do teste "adiciona produto". E o teste "finaliza a compra" só passa se o teste de login rodar antes dele.

**Comando:**
Corrija o isolamento da suíte.

**Tópicos:**
- a) Diga qual é a causa provável de cada um dos dois problemas. (0,2)
- b) Escreva um beforeEach em Cypress ou Playwright que deixa cada teste independente (limpa o carrinho e faz o próprio login). (0,4)
- c) Explique a regra de rodar a suíte 3 vezes e o que fazer com um teste que muda de resultado sem mudança no código. (0,4)
