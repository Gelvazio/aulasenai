# Atividade: Atividade Prática — Aula 05 — 10 Questões Discursivas

- **Aula:** AP-05
- **Rótulo da aula:** Atividade Prática — Aula 05
- **Tema:** Integração Avançada e Mock de APIs
- **Ícone:** 🛰️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-05.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Desenvolver, por escrito, testes de integração que isolam a API com os conteúdos da aula 05 (CONTEUDO/AULA-05-INTEGRACAO-AVANCADA-E-MOCK-DE-APIS.md): por que simular a API, formas de simular (vi.fn, vi.spyOn e MSW), configuração do MSW, teste do fluxo de login, confiabilidade (erro 500, 404 e rede lenta), espera sem tempo fixo (findBy, waitFor), localStorage com isolamento e execução e leitura do resultado da suíte.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-05-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 5

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para criar os testes de integração da tela de login e da vitrine de uma loja virtual, sem depender da API real, usando Vitest, Testing Library e MSW.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o código pedido escrito por inteiro (handler do MSW, servidor.use, teste com findBy ou waitFor, expect com o matcher) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Escreva o código como escreveria no VS Code. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código correto (rota e método do handler, status da resposta, espera assíncrona sem tempo fixo e matcher adequado) e justificativa com as palavras-chave do conteúdo. Nomes de testes e variáveis diferentes valem, desde que o código esteja correto; aspas simples ou duplas e ponto e vírgula opcional são aceitos. Erros de português não tiram nota se a ideia estiver clara.

**Tela de login usada em várias questões (src/telaLogin.js):** montarTelaLogin(container) monta um formulário com os campos de rótulo "E-mail" e "Senha", o botão "Entrar" e um parágrafo com role="status". Ao enviar, mostra "Carregando...", faz um POST em URL_API + "/login" (URL_API = http://localhost:3000/api) e, se a resposta for aceita, guarda o token no localStorage e mostra "Bem-vindo, " + nome; se não for, mostra a mensagem de erro que veio da API.

**Simulação padrão (src/mocks/handlers.js):** o handler de POST /login responde 401 com { erro: "Credenciais inválidas" } quando o e-mail não é aluno@senai.br ou a senha não é 123456, e responde { nome: "Aluno", token: "mock-jwt-xyz" } quando as credenciais são válidas.

## Cobertura da aula

| Conteúdo da aula 05 | Questões |
|---|---|
| Por que simular a API | 01 |
| Formas de simular: vi.fn, vi.spyOn e MSW | 02 |
| Configuração do MSW e do setup (2.3) | 03, 04 |
| Teste do fluxo de login | 05 |
| Confiabilidade: erro 500, 404 e rede lenta (4.3) | 06, 07 |
| Esperar sem tempo fixo (findBy, waitFor) | 08 |
| localStorage com isolamento | 09 |
| Execução dos testes e leitura do resultado (7.3) | 10 |

---

## ITEM 01 — Por Que Não Usar a API Real

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, ouviu da equipe: "Nossos testes de tela chamam a API de verdade. Às vezes passam, às vezes falham, e ninguém mudou o código".

**Comando:**
Explique à equipe por que simular a API.

**Tópicos:**
- a) Diga o que é simular (mockar) a API num teste de integração. (0,2)
- b) Cite três motivos pelos quais a API real deixa o teste instável ou difícil de escrever. (0,4)
- c) Explique o que é um teste instável (flaky) e por que, com a API simulada, o teste controla exatamente o que a API responde. (0,4)

---

## ITEM 02 — Escolhendo a Forma de Simular

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa escolher como simular a API em três situações: (1) o teste unitário de um serviço que recebe o cliente HTTP por parâmetro; (2) um caso simples e pontual que só precisa trocar o fetch uma vez; (3) o teste de integração da tela de login, sem mudar nada no código da tela.

**Comando:**
Recomende a forma de simular em cada situação.

**Tópicos:**
- a) Diga quais são as três formas de simular a API vistas na aula. (0,2)
- b) Indique a forma certa para cada uma das três situações e justifique cada escolha. (0,4)
- c) Explique como o MSW funciona (o que ele intercepta e quem responde) e por que o código da tela não precisa mudar. (0,4)

---

## ITEM 03 — Instalando e Criando o Handler

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai criar do zero a simulação da rota de login descrita no início da atividade.

**Comando:**
Escreva a instalação e o handler.

**Tópicos:**
- a) Escreva o comando que instala o MSW como dependência de desenvolvimento. (0,2)
- b) Escreva o arquivo src/mocks/handlers.js com a constante URL_API e o handler de POST /login que responde 401 com { erro: "Credenciais inválidas" } ou { nome: "Aluno", token: "mock-jwt-xyz" }. (0,4)
- c) Escreva o arquivo src/mocks/servidor.js com o setupServer e explique por que o servidor fica num módulo próprio e por que, no Node, a URL precisa ser completa. (0,4)

---

## ITEM 04 — O Setup dos Testes

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai ligar o servidor do MSW em todos os testes pelo arquivo tests/setup.js.

**Comando:**
Escreva e explique o setup.

**Tópicos:**
- a) Escreva o beforeAll e o afterAll que ligam e desligam o servidor. (0,2)
- b) Escreva o afterEach que desfaz as respostas trocadas e limpa o localStorage, e explique para que serve cada linha. (0,4)
- c) Explique o que faz a opção onUnhandledRequest: "error" no servidor.listen e que defeito ela ajuda a encontrar. (0,4)

---

## ITEM 05 — Testando o Login

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai escrever os testes do fluxo de login da tela descrita no início da atividade, com a simulação padrão.

**Comando:**
Escreva os testes de sucesso e de falha.

**Tópicos:**
- a) Escreva uma função auxiliar entrarCom(email, senha) que monta a tela, digita os dois campos e clica em Entrar com o userEvent. (0,2)
- b) Escreva o teste do login aceito, conferindo a mensagem de boas-vindas e o token guardado no localStorage. (0,4)
- c) Escreva o teste da senha errada, conferindo a mensagem de erro e que nenhum token foi guardado, e explique por que os dois testes usam findByText. (0,4)

---

## ITEM 06 — Provocando o Erro 500

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, quer saber o que a tela de login faz quando o servidor responde 500. O comportamento esperado é mostrar "Serviço indisponível, tente novamente" e reativar o botão.

**Comando:**
Escreva o teste de confiabilidade.

**Tópicos:**
- a) Explique o que é confiabilidade (4.3) numa tela de front-end. (0,2)
- b) Escreva o servidor.use que faz a rota de login responder 500 só neste teste e o teste que confere a mensagem esperada. (0,4)
- c) A resposta 500 vem sem corpo. Explique o que acontece com resposta.json() na tela atual, por que o teste falha e o que precisa mudar no código da tela. (0,4)

---

## ITEM 07 — 404 e Rede Lenta

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai cobrir mais dois desastres da tabela de confiabilidade: a rota de login respondendo 404 e a API demorando 800 ms para responder.

**Comando:**
Escreva as simulações e diga o que a tela deve fazer.

**Tópicos:**
- a) Diga o comportamento esperado da tela no erro 404 e na rede lenta. (0,2)
- b) Escreva o servidor.use que simula a rede lenta (delay de 800 ms) e depois responde o login aceito. (0,4)
- c) Escreva o teste da rede lenta que confere "Carregando..." logo depois do clique e, em seguida, a mensagem de boas-vindas sem tempo fixo. (0,4)

---

## ITEM 08 — Esperar sem Tempo Fixo

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, encontrou na suíte da equipe a linha await new Promise((r) => setTimeout(r, 2000)) antes de cada expect. A suíte demora e, em alguns computadores, ainda falha às vezes.

**Comando:**
Explique o problema e troque as esperas.

**Tópicos:**
- a) Explique os dois problemas da espera com tempo fixo. (0,2)
- b) Reescreva a espera da mensagem "Bem-vindo, Aluno" e a espera do botão Entrar voltar a ficar habilitado, sem tempo fixo. (0,4)
- c) Escreva a espera de que o aviso "Carregando..." saia da tela e explique como findBy e waitFor funcionam (tentativas e limite). (0,4)

---

## ITEM 09 — Carrinho no localStorage

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai testar o carrinho offline da loja: a função adicionarAoCarrinho(produto) guarda a lista de produtos no localStorage na chave "carrinho", em JSON. Um colega reclama que o segundo teste do carrinho sempre encontra os produtos do primeiro.

**Comando:**
Teste o carrinho e corrija o isolamento.

**Tópicos:**
- a) Explique por que o segundo teste encontra os produtos do primeiro. (0,2)
- b) Escreva o teste que adiciona um produto e confere, lendo o localStorage com JSON.parse, que o carrinho tem 1 item com o nome certo. (0,4)
- c) Diga onde fica o localStorage.clear() que garante o isolamento e explique por que cada teste precisa começar com o armazenamento vazio. (0,4)

---

## ITEM 10 — Executando e Lendo o Resultado

- **Aula:** 05 · Integração Avançada e Mock de APIs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, terminou os testes da vitrine e vai executar a suíte e registrar o resultado no relatório para a equipe.

**Comando:**
Execute e registre a execução.

**Tópicos:**
- a) Escreva o comando que roda uma vez só os testes do arquivo fluxoLogin e diga o que é executar os testes (7.3). (0,2)
- b) Explique o que ler no resumo da execução e, quando um teste falha, o que ler na mensagem (esperado × recebido e o trecho do DOM). (0,4)
- c) Explique por que rodar a suíte 3 vezes e o que fazer com um teste cujo resultado muda sem mudança no código. (0,4)
