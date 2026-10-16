# Atividade: Integração Avançada e Mock de APIs — 50 Questões

- **Aula:** 05
- **Tema:** Integração Avançada e Mock de APIs
- **Ícone:** 🛰️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Desenvolver conjunto de testes automatizados que isolam a API: por que simular a API, vi.fn, vi.spyOn e MSW, configuração do MSW e do setup, teste do fluxo de login, confiabilidade (erro 500, 404 e rede lenta), espera sem tempo fixo com findBy e waitFor, localStorage com isolamento e execução e leitura do resultado da suíte.
- **Conteúdo-base:** ../CONTEUDO/AULA-05-INTEGRACAO-AVANCADA-E-MOCK-DE-APIS.md
- **Slides:** ../AULAS/AULA-05-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-05-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Por Que Simular a API

- **Capacidade:** C5

**Comando:**  
Por que os testes de integração não devem depender da API real?

**Alternativas:**
- A) Porque a API real é lenta, muda de dados e pode estar fora do ar, deixando o teste instável.
- B) Porque a API real nunca devolve erros.
- C) Porque é proibido fazer requisições em JavaScript.
- D) Porque a API real sempre responde mais rápido que a simulação.

**Gabarito:** A

---

## ITEM 02 — Teste Instável

- **Capacidade:** C5

**Comando:**  
O que é um teste instável (flaky)?

**Alternativas:**
- A) Um teste que roda mais rápido que os outros.
- B) Um teste que nunca é executado.
- C) Um teste que sempre falha.
- D) Um teste que passa ou falha sem que o código tenha mudado.

**Gabarito:** D

---

## ITEM 03 — Controle da Resposta

- **Capacidade:** C5

**Comando:**  
Qual é a grande vantagem de simular a API no teste?

**Alternativas:**
- A) O teste controla exatamente o que a API responde, inclusive erros.
- B) O servidor real fica mais rápido.
- C) O teste deixa de precisar de expect.
- D) A tela passa a funcionar sem internet em produção.

**Gabarito:** A

---

## ITEM 04 — Provocar Erro 500

- **Capacidade:** C5

**Comando:**  
Por que é difícil testar o erro 500 com a API real?

**Alternativas:**
- A) Porque o navegador bloqueia o status 500.
- B) Porque não dá para fazer o servidor real falhar na hora em que o teste precisa.
- C) Porque o erro 500 não existe em APIs reais.
- D) Porque o erro 500 só acontece no banco de dados.

**Gabarito:** B

---

## ITEM 05 — vi.fn por Parâmetro

- **Capacidade:** C5

**Comando:**  
Quando usar um vi.fn() passado por parâmetro para simular a API?

**Alternativas:**
- A) Para medir a cobertura de testes.
- B) Para simular a rede inteira sem mudar a tela.
- C) No teste E2E com o navegador aberto.
- D) No teste unitário de um serviço que recebe o cliente HTTP por parâmetro.

**Gabarito:** D

---

## ITEM 06 — vi.spyOn no fetch

- **Capacidade:** C5

**Comando:**  
O que faz vi.spyOn(globalThis, 'fetch')?

**Alternativas:**
- A) Liga o servidor real da API.
- B) Espiona e troca o fetch global, útil em casos simples e pontuais.
- C) Instala o MSW no projeto.
- D) Apaga todas as requisições do projeto.

**Gabarito:** B

---

## ITEM 07 — O Que É o MSW

- **Capacidade:** C5

**Comando:**  
O que é o MSW (Mock Service Worker)?

**Alternativas:**
- A) Uma ferramenta que intercepta a requisição de rede e responde no lugar do servidor.
- B) Um navegador para testes E2E.
- C) Um banco de dados para testes.
- D) Um framework de CSS.

**Gabarito:** A

---

## ITEM 08 — MSW e o Código da Tela

- **Capacidade:** C5

**Comando:**  
Por que o MSW é indicado para os testes de integração?

**Alternativas:**
- A) Porque o código da tela não muda: só a resposta da rede é simulada.
- B) Porque ele reescreve o código da tela automaticamente.
- C) Porque ele só funciona em produção.
- D) Porque ele dispensa a Testing Library.

**Gabarito:** A

---

## ITEM 09 — Instalação do MSW

- **Capacidade:** C5

**Comando:**  
Qual comando instala o MSW como dependência de desenvolvimento?

**Alternativas:**
- A) npm run msw
- B) npm uninstall msw
- C) npx msw publish
- D) npm install -D msw

**Gabarito:** D

---

## ITEM 10 — Import do Handler

- **Capacidade:** C5

**Comando:**  
O que se importa do pacote msw para escrever um handler?

**Alternativas:**
- A) render e fireEvent
- B) http e HttpResponse
- C) screen e userEvent
- D) describe e it

**Gabarito:** B

---

## ITEM 11 — Handler de POST

- **Capacidade:** C5

**Comando:**  
Qual linha cria a simulação de um POST na rota de login?

**Alternativas:**
- A) fetch.post('/login')
- B) http.get('/carrinho', () => { ... })
- C) http.post(URL_API + '/login', async ({ request }) => { ... })
- D) servidor.close('/login')

**Gabarito:** C

---

## ITEM 12 — Ler o Corpo da Requisição

- **Capacidade:** C5

**Comando:**  
Dentro do handler, como ler o e-mail e a senha enviados pela tela?

**Alternativas:**
- A) const { email, senha } = await request.json();
- B) const dados = screen.getByText('email');
- C) const senha = localStorage.getItem('senha');
- D) const email = document.body.email;

**Gabarito:** A

---

## ITEM 13 — Resposta 401

- **Capacidade:** C5

**Comando:**  
Qual linha responde 401 com a mensagem de erro?

**Alternativas:**
- A) return new HttpResponse(null, { status: 500 });
- B) return HttpResponse.json({ nome: 'Aluno' }, { status: 200 });
- C) return fetch('/login');
- D) return HttpResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 });

**Gabarito:** D

---

## ITEM 14 — setupServer

- **Capacidade:** C5

**Comando:**  
De onde vem o setupServer usado nos testes que rodam no Node?

**Alternativas:**
- A) @testing-library/dom
- B) vitest/config
- C) react-dom
- D) msw/node

**Gabarito:** D

---

## ITEM 15 — Servidor em Módulo Próprio

- **Capacidade:** C5

**Comando:**  
Por que o servidor do MSW fica num módulo próprio (src/mocks/servidor.js)?

**Alternativas:**
- A) Para esconder o código dos alunos.
- B) Para que cada teste crie um servidor diferente.
- C) Para que o setup e os testes usem o mesmo servidor.
- D) Para que ele rode só em produção.

**Gabarito:** C

---

## ITEM 16 — URL Completa

- **Capacidade:** C5

**Comando:**  
Por que, no Node, a requisição precisa de URL completa (http://localhost:3000/api/login)?

**Alternativas:**
- A) Porque a URL completa é mais rápida.
- B) Porque o fetch do Node não entende caminho relativo como /api/login.
- C) Porque o MSW não aceita a palavra login.
- D) Porque o navegador exige.

**Gabarito:** B

---

## ITEM 17 — servidor.listen

- **Capacidade:** C5

**Comando:**  
Onde se liga o servidor do MSW no tests/setup.js?

**Alternativas:**
- A) No beforeAll, com servidor.listen().
- B) Dentro de cada expect.
- C) No afterAll, com servidor.listen().
- D) No package.json.

**Gabarito:** A

---

## ITEM 18 — onUnhandledRequest

- **Capacidade:** C5

**Comando:**  
O que faz a opção onUnhandledRequest: 'error' no servidor.listen?

**Alternativas:**
- A) Desliga o servidor depois de cada teste.
- B) Esconde os erros da API.
- C) Faz o teste falhar se a tela chamar uma rota que não tem simulação.
- D) Deixa as requisições sem simulação irem para a internet.

**Gabarito:** C

---

## ITEM 19 — resetHandlers

- **Capacidade:** C5

**Comando:**  
Para que serve servidor.resetHandlers() no afterEach?

**Alternativas:**
- A) Limpar o localStorage.
- B) Ligar o servidor real.
- C) Desfazer as respostas trocadas com servidor.use, voltando à simulação padrão.
- D) Apagar os arquivos de teste.

**Gabarito:** C

---

## ITEM 20 — servidor.close

- **Capacidade:** C5

**Comando:**  
Quando o servidor do MSW é desligado com servidor.close()?

**Alternativas:**
- A) No afterAll, depois de todos os testes.
- B) Nunca, ele fica ligado para sempre.
- C) Antes de cada teste.
- D) No meio de cada teste.

**Gabarito:** A

---

## ITEM 21 — Limpar o localStorage

- **Capacidade:** C5

**Comando:**  
Qual linha do afterEach evita que dados guardados num teste apareçam no próximo?

**Alternativas:**
- A) localStorage.clear();
- B) servidor.listen();
- C) userEvent.setup();
- D) document.title = '';

**Gabarito:** A

---

## ITEM 22 — Login Aceito

- **Capacidade:** C5

**Comando:**  
No teste do login aceito, o que se confere além da mensagem de boas-vindas?

**Alternativas:**
- A) Que o servidor real respondeu.
- B) Que a senha apareceu na tela.
- C) Que o token foi guardado no localStorage.
- D) Que o botão sumiu do HTML.

**Gabarito:** C

---

## ITEM 23 — Conferir o Token

- **Capacidade:** C5

**Comando:**  
Qual linha confere o token guardado depois do login aceito?

**Alternativas:**
- A) expect(screen.getByText('token')).toBeDisabled();
- B) expect(servidor.token).toBe('mock-jwt-xyz');
- C) expect(localStorage.getItem('token')).toBe('mock-jwt-xyz');
- D) expect(localStorage.setItem('token')).toBe(true);

**Gabarito:** C

---

## ITEM 24 — Senha Errada

- **Capacidade:** C5

**Comando:**  
No teste da senha errada, o que se espera do localStorage?

**Alternativas:**
- A) Que a senha errada fique guardada.
- B) Que não haja token: localStorage.getItem('token') é null.
- C) Que o token seja 'mock-jwt-xyz'.
- D) Que o localStorage seja apagado do navegador.

**Gabarito:** B

---

## ITEM 25 — Por Que findByText no Login

- **Capacidade:** C5

**Comando:**  
Por que o teste do login usa findByText para a mensagem?

**Alternativas:**
- A) Porque findByText desliga o MSW.
- B) Porque a mensagem aparece antes do clique.
- C) Porque a mensagem só aparece depois que a resposta assíncrona do fetch chega.
- D) Porque getByText não existe na Testing Library.

**Gabarito:** C

---

## ITEM 26 — Função Auxiliar

- **Capacidade:** C5

**Comando:**  
Qual é a vantagem da função auxiliar entrarCom(email, senha) nos testes de login?

**Alternativas:**
- A) Dispensar o expect nos testes.
- B) Reaproveitar os passos repetidos (montar, digitar e clicar) em vários testes.
- C) Ligar o servidor real.
- D) Deixar os testes dependentes uns dos outros.

**Gabarito:** B

---

## ITEM 27 — Confiabilidade

- **Capacidade:** C5

**Comando:**  
O que é confiabilidade (4.3) numa tela de front-end?

**Alternativas:**
- A) O código ter poucas linhas.
- B) A tela carregar em menos de um segundo.
- C) A tela ter cores agradáveis.
- D) A tela continuar útil quando algo dá errado, como erro do servidor ou rede lenta.

**Gabarito:** D

---

## ITEM 28 — servidor.use

- **Capacidade:** C5

**Comando:**  
Para que serve servidor.use(...) dentro de um teste?

**Alternativas:**
- A) Instalar o MSW.
- B) Trocar a resposta de uma rota só naquele teste.
- C) Desligar o servidor para sempre.
- D) Apagar todos os handlers do projeto.

**Gabarito:** B

---

## ITEM 29 — Simular Erro 500

- **Capacidade:** C5

**Comando:**  
Qual handler faz a rota de login responder com erro 500?

**Alternativas:**
- A) http.post(URL_API + '/login', () => new HttpResponse(null, { status: 500 }))
- B) http.get(URL_API + '/login', () => HttpResponse.json({}, { status: 200 }))
- C) http.post(URL_API + '/login', () => HttpResponse.json({ nome: 'Aluno' }))
- D) http.post(URL_API + '/login', () => delay(500))

**Gabarito:** A

---

## ITEM 30 — Comportamento no Erro 500

- **Capacidade:** C5

**Comando:**  
O que a tela deve fazer quando o servidor responde 500?

**Alternativas:**
- A) Ficar em branco.
- B) Mostrar "Serviço indisponível, tente novamente" e reativar o botão.
- C) Recarregar a página sem parar.
- D) Guardar um token vazio.

**Gabarito:** B

---

## ITEM 31 — Comportamento no 404

- **Capacidade:** C5

**Comando:**  
O que a tela deve fazer quando a API responde 404?

**Alternativas:**
- A) Mostrar o código-fonte da página.
- B) Apagar o formulário.
- C) Mostrar uma mensagem amigável, sem quebrar a página.
- D) Esconder todos os botões para sempre.

**Gabarito:** C

---

## ITEM 32 — Comportamento na Rede Lenta

- **Capacidade:** C5

**Comando:**  
O que a tela deve fazer quando a rede está lenta?

**Alternativas:**
- A) Não mostrar nada até a resposta chegar.
- B) Mostrar uma mensagem de erro imediatamente.
- C) Desabilitar a página para sempre.
- D) Mostrar "Carregando..." e retirar o aviso quando a resposta chegar.

**Gabarito:** D

---

## ITEM 33 — Simular Demora

- **Capacidade:** C5

**Comando:**  
Qual recurso do MSW simula a rede lenta dentro do handler?

**Alternativas:**
- A) await delay(800)
- B) servidor.close()
- C) localStorage.clear()
- D) setTimeout no expect

**Gabarito:** A

---

## ITEM 34 — Corpo Vazio no 500

- **Capacidade:** C5

**Comando:**  
A resposta 500 da simulação vem sem corpo. O que acontece com resposta.json() na tela do exemplo?

**Alternativas:**
- A) Lança erro, e a tela precisa de try/catch e de uma mensagem própria.
- B) Funciona normalmente, sem nenhum problema.
- C) Devolve o nome do aluno.
- D) Devolve o token mock-jwt-xyz.

**Gabarito:** A

---

## ITEM 35 — Objetivo do Teste de Confiabilidade

- **Capacidade:** C5

**Comando:**  
Quando o teste do erro 500 falha e revela que a tela não trata o erro, isso significa que:

**Alternativas:**
- A) A API real deve ser usada no lugar da simulação.
- B) O MSW está com defeito.
- C) O teste cumpriu o objetivo: encontrou um defeito de confiabilidade.
- D) O teste está errado e deve ser apagado.

**Gabarito:** C

---

## ITEM 36 — Espera com Tempo Fixo

- **Capacidade:** C5

**Comando:**  
Qual é o problema de await new Promise((r) => setTimeout(r, 1000)) no teste?

**Alternativas:**
- A) Faz o MSW parar de funcionar.
- B) Não tem nenhum problema.
- C) Deixa o teste mais confiável em todos os computadores.
- D) Fica lento quando sobra tempo e intermitente quando falta.

**Gabarito:** D

---

## ITEM 37 — Espera Confiável

- **Capacidade:** C5

**Comando:**  
Qual linha espera a mensagem "Bem-vindo, Aluno" sem tempo fixo?

**Alternativas:**
- A) screen.getByText('Bem-vindo, Aluno').wait()
- B) await screen.findByText('Bem-vindo, Aluno')
- C) await new Promise((r) => setTimeout(r, 2000))
- D) sleep(2000)

**Gabarito:** B

---

## ITEM 38 — waitFor

- **Capacidade:** C5

**Comando:**  
Qual linha espera o botão ficar habilitado sem tempo fixo?

**Alternativas:**
- A) setTimeout(() => expect(botao).toBeEnabled(), 2000);
- B) await waitFor(() => expect(botao).toBeEnabled());
- C) await botao.enable();
- D) expect(botao).toBeEnabled().wait();

**Gabarito:** B

---

## ITEM 39 — Aviso que Some

- **Capacidade:** C5

**Comando:**  
Qual linha espera o aviso "Carregando..." sair da tela?

**Alternativas:**
- A) expect(screen.getByText('Carregando...')).toBeInTheDocument()
- B) servidor.close('Carregando...')
- C) localStorage.removeItem('Carregando...')
- D) await waitForElementToBeRemoved(() => screen.queryByText('Carregando...'))

**Gabarito:** D

---

## ITEM 40 — Limite de Espera

- **Capacidade:** C5

**Comando:**  
Como funcionam findBy e waitFor?

**Alternativas:**
- A) Tentam uma única vez e desistem.
- B) Esperam para sempre, sem limite.
- C) Tentam de novo até dar certo ou até o limite de tempo (1 s por padrão).
- D) Esperam sempre exatamente 5 segundos.

**Gabarito:** C

---

## ITEM 41 — localStorage entre Testes

- **Capacidade:** C5

**Comando:**  
O segundo teste do carrinho encontra os produtos do primeiro. Qual é a causa?

**Alternativas:**
- A) O teste usou findBy.
- B) O MSW guardou os produtos.
- C) O navegador real estava aberto.
- D) O localStorage não foi limpo entre os testes.

**Gabarito:** D

---

## ITEM 42 — Ler o Carrinho

- **Capacidade:** C5

**Comando:**  
O carrinho fica no localStorage em JSON na chave "carrinho". Como ler a lista no teste?

**Alternativas:**
- A) JSON.parse(localStorage.getItem('carrinho'))
- B) screen.getByText('carrinho')
- C) JSON.stringify(localStorage)
- D) localStorage.carrinho.length

**Gabarito:** A

---

## ITEM 43 — Quantidade de Itens

- **Capacidade:** C5

**Comando:**  
Qual matcher confere que o carrinho tem exatamente 1 item?

**Alternativas:**
- A) toBeVisible(1)
- B) toHaveAttribute(1)
- C) toBeDisabled(1)
- D) toHaveLength(1)

**Gabarito:** D

---

## ITEM 44 — Isolamento

- **Capacidade:** C5

**Comando:**  
Por que cada teste deve começar com o localStorage vazio?

**Alternativas:**
- A) Para que o próximo teste aproveite os dados.
- B) Para deixar o navegador mais rápido.
- C) Para ser independente e ter o mesmo resultado em qualquer ordem.
- D) Para economizar memória do servidor real.

**Gabarito:** C

---

## ITEM 45 — Executar os Testes

- **Capacidade:** C5

**Comando:**  
O que é executar os testes (7.3)?

**Alternativas:**
- A) Apagar os testes que falham.
- B) Publicar o site.
- C) Escrever o plano de testes.
- D) Rodar a suíte e registrar o resultado de cada caso: passou, falhou ou foi pulado.

**Gabarito:** D

---

## ITEM 46 — Comando de Execução

- **Capacidade:** C5

**Comando:**  
Qual comando roda uma vez só os testes do arquivo fluxoLogin?

**Alternativas:**
- A) npm publish fluxoLogin
- B) npx vitest run fluxoLogin
- C) npm install fluxoLogin
- D) npx vitest uninstall fluxoLogin

**Gabarito:** B

---

## ITEM 47 — Leitura do Resumo

- **Capacidade:** C5

**Comando:**  
O que se lê no resumo da execução do Vitest?

**Alternativas:**
- A) A cor dos botões.
- B) Quantos arquivos e testes passaram ou falharam e o tempo total.
- C) A senha dos usuários.
- D) O código-fonte do MSW.

**Gabarito:** B

---

## ITEM 48 — Leitura da Falha

- **Capacidade:** C5

**Comando:**  
Quando um teste falha, o que ajuda a entender o problema?

**Alternativas:**
- A) A mensagem com esperado × recebido e o trecho do DOM impresso pela Testing Library.
- B) O tamanho do arquivo de teste.
- C) Apenas a cor vermelha do terminal.
- D) O nome do computador.

**Gabarito:** A

---

## ITEM 49 — Rodar 3 Vezes

- **Capacidade:** C5

**Comando:**  
Por que rodar a suíte 3 vezes seguidas?

**Alternativas:**
- A) Para triplicar a cobertura.
- B) Para descobrir testes instáveis, cujo resultado muda sem mudança no código.
- C) Para deixar o computador mais rápido.
- D) Para gastar o tempo da aula.

**Gabarito:** B

---

## ITEM 50 — Mock Esconde Defeito

- **Capacidade:** C5

**Comando:**  
No debate "O mock pode esconder um defeito?", qual cuidado é correto?

**Alternativas:**
- A) A simulação deve sempre responder sucesso.
- B) O mock deve ser usado também em produção.
- C) A simulação deve imitar as respostas reais da API (sucesso e erros) para não esconder defeitos.
- D) Não é preciso conhecer as respostas reais da API.

**Gabarito:** C
