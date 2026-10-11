# Padrão de Resposta — Atividade Prática — Aula 05 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Integração Avançada e Mock de APIs.
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
**Resposta esperada:** Simular (mockar) a API é trocar o servidor real por uma **resposta falsa controlada pelo teste**: a tela faz a requisição normalmente, mas quem responde é a simulação.
**Critérios:** Palavras-chave: resposta falsa/simulada; controlada pelo teste; no lugar do servidor real. Nota cheia (0,2): definição completa. Metade (0,1): "usar dados falsos" sem dizer que substitui a API. Zero (0): confunde com apagar a chamada à API.

### ITEM 01-b
**Resposta esperada:** A API real é **lenta**, os **dados mudam** de um dia para o outro, ela pode estar **fora do ar** e **não deixa provocar** um erro 500 (ou 404, ou rede lenta) quando o teste precisa.
**Critérios:** Palavras-chave: lenta; dados mudam; fora do ar; não dá para provocar erro. Nota cheia (0,4): três motivos corretos. Metade (0,2): dois motivos. Zero (0): um motivo ou nenhum.

### ITEM 01-c
**Resposta esperada:** Teste **instável (flaky)** é o que **passa ou falha sem que o código tenha mudado**. Com a API simulada, a resposta é **sempre a mesma** e é **escolhida pelo teste** (sucesso, erro, demora), então o resultado só muda se o código da tela mudar.
**Critérios:** Palavras-chave: passa/falha sem mudar o código; resposta sempre igual; o teste escolhe a resposta. Nota cheia (0,4): definição + por que a simulação resolve. Metade (0,2): só uma das partes. Zero (0): diz que o teste instável é o que sempre falha.

### ITEM 02-a
**Resposta esperada:** **vi.fn()** passado por parâmetro, **vi.spyOn(globalThis, "fetch")** e o **MSW** (Mock Service Worker).
**Critérios:** Palavras-chave: vi.fn; vi.spyOn no fetch; MSW. Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 02-b
**Resposta esperada:** (1) **vi.fn() por parâmetro**: o serviço recebe o cliente, então basta passar um cliente falso (teste unitário). (2) **vi.spyOn(globalThis, "fetch")**: espiona e troca o fetch global num caso simples e pontual. (3) **MSW**: intercepta a requisição de rede, ideal para integração, sem mudar a tela.
**Critérios:** Palavras-chave: vi.fn para o serviço; spyOn para o caso pontual; MSW para a integração. Nota cheia (0,4): as três correspondências com justificativa. Metade (0,2): duas certas ou as três sem justificativa. Zero (0): uma ou nenhuma.

### ITEM 02-c
**Resposta esperada:** O MSW **intercepta a requisição de rede** (o fetch da tela) e **responde no lugar do servidor**, com a resposta definida no handler. A tela continua chamando o mesmo endereço com o mesmo fetch, por isso o **código da tela não muda**: só a resposta é simulada.
**Critérios:** Palavras-chave: intercepta a requisição; responde no lugar do servidor; handler; tela sem mudança. Nota cheia (0,4): funcionamento + por que a tela não muda. Metade (0,2): só uma das partes. Zero (0): diz que é preciso trocar o fetch dentro da tela.

### ITEM 03-a
**Resposta esperada:** npm install -D msw
**Critérios:** Palavras-chave: npm install -D (ou --save-dev) msw. Nota cheia (0,2): comando certo. Metade (0,1): instala sem -D. Zero (0): outro pacote.

### ITEM 03-b
**Resposta esperada:** import { http, HttpResponse } from 'msw'; export const URL_API = 'http://localhost:3000/api'; export const handlers = [ http.post(URL_API + '/login', async ({ request }) => { const { email, senha } = await request.json(); if (email !== 'aluno@senai.br' || senha !== '123456') { return HttpResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 }); } return HttpResponse.json({ nome: 'Aluno', token: 'mock-jwt-xyz' }); }), ];
**Critérios:** Palavras-chave: import http e HttpResponse; URL_API; http.post da rota /login; request.json(); status 401 com erro; resposta com nome e token. Nota cheia (0,4): handler completo e correto. Metade (0,2): falta o 401 ou a leitura do corpo, ou usa outro método HTTP. Zero (0): sem handler.

### ITEM 03-c
**Resposta esperada:** import { setupServer } from 'msw/node'; import { handlers } from './handlers.js'; export const servidor = setupServer(...handlers); — Fica num **módulo próprio** para que o **setup e os testes usem o mesmo servidor** (por exemplo, no servidor.use). No Node, o **fetch precisa de URL completa** (não entende caminho relativo como /api/login), por isso a constante URL_API fica num lugar só.
**Critérios:** Palavras-chave: setupServer de msw/node; ...handlers; mesmo servidor no setup e nos testes; URL completa no Node. Nota cheia (0,4): código + as duas explicações. Metade (0,2): código sem as explicações, ou explicações sem o código. Zero (0): sem setupServer.

### ITEM 04-a
**Resposta esperada:** beforeAll(() => servidor.listen({ onUnhandledRequest: 'error' })); afterAll(() => servidor.close());
**Critérios:** Palavras-chave: beforeAll com servidor.listen; afterAll com servidor.close. Nota cheia (0,2): os dois. Metade (0,1): só um. Zero (0): nenhum.

### ITEM 04-b
**Resposta esperada:** afterEach(() => { servidor.resetHandlers(); localStorage.clear(); }); — **resetHandlers()** desfaz, depois de cada teste, as respostas trocadas com servidor.use (o próximo teste volta à simulação padrão); **localStorage.clear()** apaga os dados guardados (token, carrinho), para um teste não interferir no outro.
**Critérios:** Palavras-chave: afterEach; resetHandlers desfaz servidor.use; localStorage.clear isola. Nota cheia (0,4): código + as duas explicações. Metade (0,2): código com uma explicação, ou só uma das linhas. Zero (0): sem afterEach.

### ITEM 04-c
**Resposta esperada:** Com **onUnhandledRequest: "error"**, o teste **falha se a tela chamar uma rota que não tem simulação**. Ajuda a encontrar **chamadas esquecidas ou endereços errados** (rota digitada errado, chamada a uma API real que escapou do mock).
**Critérios:** Palavras-chave: falha com rota sem simulação; rota errada ou esquecida. Nota cheia (0,4): o que faz + o defeito que encontra. Metade (0,2): só uma das partes. Zero (0): diz que esconde os erros.

### ITEM 05-a
**Resposta esperada:** async function entrarCom(email, senha) { montarTelaLogin(document.body); const usuario = userEvent.setup(); await usuario.type(screen.getByLabelText('E-mail'), email); await usuario.type(screen.getByLabelText('Senha'), senha); await usuario.click(screen.getByRole('button', { name: 'Entrar' })); }
**Critérios:** Palavras-chave: async; montarTelaLogin; userEvent.setup; type com await nos dois campos; click no botão Entrar pelo papel. Nota cheia (0,2): função completa. Metade (0,1): falta o await ou um dos passos. Zero (0): não monta a tela.

### ITEM 05-b
**Resposta esperada:** it('mostra boas-vindas e guarda o token', async () => { await entrarCom('aluno@senai.br', '123456'); expect(await screen.findByText('Bem-vindo, Aluno')).toBeInTheDocument(); expect(localStorage.getItem('token')).toBe('mock-jwt-xyz'); });
**Critérios:** Palavras-chave: credenciais válidas; await findByText Bem-vindo, Aluno; localStorage.getItem('token') toBe mock-jwt-xyz. Nota cheia (0,4): teste completo. Metade (0,2): confere só a mensagem ou só o token. Zero (0): usa a API real ou credenciais inválidas.

### ITEM 05-c
**Resposta esperada:** it('mostra o erro e não guarda token', async () => { await entrarCom('aluno@senai.br', 'errada'); expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument(); expect(localStorage.getItem('token')).toBeNull(); }); — Os dois usam **findByText** porque a mensagem só aparece **depois que a resposta (assíncrona) do fetch chega**; o findBy **espera** a mensagem aparecer.
**Critérios:** Palavras-chave: senha errada; findByText Credenciais inválidas; token toBeNull; resposta assíncrona. Nota cheia (0,4): teste + explicação. Metade (0,2): teste sem explicação, ou explicação sem conferir o token. Zero (0): usa getByText logo após o clique sem espera.

### ITEM 06-a
**Resposta esperada:** Confiabilidade é a tela **continuar útil quando algo dá errado** (servidor fora do ar, erro, rede lenta): mostra uma mensagem clara e deixa o usuário tentar de novo, em vez de quebrar.
**Critérios:** Palavras-chave: continua útil quando algo dá errado; não quebra; mensagem. Nota cheia (0,2): definição com exemplo de falha. Metade (0,1): definição vaga. Zero (0): confunde com desempenho.

### ITEM 06-b
**Resposta esperada:** servidor.use(http.post(URL_API + '/login', () => new HttpResponse(null, { status: 500 }))); await entrarCom('aluno@senai.br', '123456'); expect(await screen.findByText('Serviço indisponível, tente novamente')).toBeInTheDocument(); expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
**Critérios:** Palavras-chave: servidor.use; http.post da rota de login; status 500; findByText da mensagem; botão habilitado. Nota cheia (0,4): simulação + teste com a mensagem (o toBeEnabled é desejável). Metade (0,2): só a simulação ou teste sem servidor.use. Zero (0): altera o handler padrão para todos os testes sem resetHandlers.

### ITEM 06-c
**Resposta esperada:** Sem corpo, **resposta.json() lança erro**: a função da tela para no meio, nenhuma mensagem aparece (e fica "Carregando..."), por isso o **findByText não encontra** a mensagem e o teste falha. A tela precisa de **try/catch** (ou conferir o status antes do json) e de uma **mensagem própria** para o erro do servidor, reativando o botão.
**Critérios:** Palavras-chave: json() lança erro; nada aparece; teste falha; try/catch e mensagem própria. Nota cheia (0,4): causa + correção. Metade (0,2): só a causa ou só a correção. Zero (0): diz que o teste está errado e deve ser apagado.

### ITEM 07-a
**Resposta esperada:** **404:** mostrar uma **mensagem amigável, sem quebrar a página**. **Rede lenta:** mostrar **"Carregando..."** enquanto espera e **retirar o aviso quando a resposta chegar**.
**Critérios:** Palavras-chave: 404 mensagem amigável sem quebrar; rede lenta Carregando... e retirar. Nota cheia (0,2): os dois comportamentos. Metade (0,1): um dos dois. Zero (0): nenhum.

### ITEM 07-b
**Resposta esperada:** servidor.use(http.post(URL_API + '/login', async () => { await delay(800); return HttpResponse.json({ nome: 'Aluno', token: 'mock-jwt-xyz' }); })); (com delay importado de msw).
**Critérios:** Palavras-chave: servidor.use; http.post /login; await delay(800); HttpResponse.json com nome e token. Nota cheia (0,4): simulação completa. Metade (0,2): falta o delay ou a resposta. Zero (0): usa setTimeout no teste em vez de simular na API.

### ITEM 07-c
**Resposta esperada:** await entrarCom('aluno@senai.br', '123456'); expect(screen.getByText('Carregando...')).toBeInTheDocument(); expect(await screen.findByText('Bem-vindo, Aluno')).toBeInTheDocument(); (também vale conferir que "Carregando..." saiu com waitForElementToBeRemoved ou queryByText.)
**Critérios:** Palavras-chave: Carregando... logo após o clique; findByText da boas-vindas; sem setTimeout. Nota cheia (0,4): as duas conferências sem tempo fixo. Metade (0,2): só uma das conferências. Zero (0): espera com tempo fixo.

### ITEM 08-a
**Resposta esperada:** O tempo fixo deixa o teste **lento quando sobra** (espera 2 s mesmo que a resposta chegue antes) e **intermitente (flaky) quando falta** (num computador mais lento a resposta demora mais que 2 s e o teste falha).
**Critérios:** Palavras-chave: lento quando sobra; intermitente/flaky quando falta. Nota cheia (0,2): os dois problemas. Metade (0,1): um. Zero (0): nenhum.

### ITEM 08-b
**Resposta esperada:** expect(await screen.findByText('Bem-vindo, Aluno')).toBeInTheDocument(); — await waitFor(() => expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled());
**Critérios:** Palavras-chave: await findByText; await waitFor com expect toBeEnabled. Nota cheia (0,4): as duas esperas certas. Metade (0,2): uma das duas. Zero (0): mantém setTimeout.

### ITEM 08-c
**Resposta esperada:** await waitForElementToBeRemoved(() => screen.queryByText('Carregando...')); — O findBy e o waitFor **tentam de novo várias vezes** até a condição dar certo ou até o **limite de tempo (1 s por padrão)**; se passar do limite, o teste falha com a mensagem do último erro.
**Critérios:** Palavras-chave: waitForElementToBeRemoved com queryByText; tenta de novo; limite de 1 s. Nota cheia (0,4): código + funcionamento. Metade (0,2): só o código ou só o funcionamento. Zero (0): espera fixa.

### ITEM 09-a
**Resposta esperada:** O **localStorage não é limpo entre os testes**: o que o primeiro teste guardou **continua lá** quando o segundo começa.
**Critérios:** Palavras-chave: localStorage não é limpo; dados do teste anterior continuam. Nota cheia (0,2): causa certa. Metade (0,1): "um teste interfere no outro" sem citar o armazenamento. Zero (0): culpa o MSW.

### ITEM 09-b
**Resposta esperada:** it('guarda o produto no carrinho', () => { adicionarAoCarrinho({ nome: 'Mouse' }); const carrinho = JSON.parse(localStorage.getItem('carrinho')); expect(carrinho).toHaveLength(1); expect(carrinho[0].nome).toBe('Mouse'); });
**Critérios:** Palavras-chave: adicionarAoCarrinho; JSON.parse(localStorage.getItem('carrinho')); toHaveLength(1); nome certo. Nota cheia (0,4): teste completo. Metade (0,2): confere só a quantidade ou só o nome, ou esquece o JSON.parse. Zero (0): não lê o localStorage.

### ITEM 09-c
**Resposta esperada:** No **afterEach do tests/setup.js** (ou do arquivo de teste): afterEach(() => { localStorage.clear(); }). Cada teste precisa começar **vazio** para ser **independente**: o resultado não pode depender de outro teste nem da ordem de execução.
**Critérios:** Palavras-chave: afterEach (ou beforeEach); localStorage.clear; independente; ordem. Nota cheia (0,4): onde fica + por quê. Metade (0,2): só uma das partes. Zero (0): sugere juntar os dois testes.

### ITEM 10-a
**Resposta esperada:** npx vitest run fluxoLogin — Executar os testes (7.3) é **rodar a suíte e registrar o resultado de cada caso**: passou, falhou ou foi pulado.
**Critérios:** Palavras-chave: npx vitest run fluxoLogin; rodar e registrar passou/falhou/pulado. Nota cheia (0,2): comando + definição. Metade (0,1): só um dos dois. Zero (0): comando de outra ferramenta.

### ITEM 10-b
**Resposta esperada:** No resumo: **quantos arquivos e testes passaram** (e falharam) e o **tempo total**. No teste que falha: a mensagem com o **valor esperado × o valor recebido** e o **trecho do DOM** que a Testing Library imprime, para ver o que realmente estava na tela.
**Critérios:** Palavras-chave: arquivos e testes que passaram; tempo; esperado × recebido; trecho do DOM. Nota cheia (0,4): resumo + leitura da falha. Metade (0,2): só uma das partes. Zero (0): diz que basta ver se ficou verde.

### ITEM 10-c
**Resposta esperada:** Rodar **3 vezes** mostra se o resultado é **estável**: se muda **sem mudança no código**, o teste é **instável (flaky)**. Esse teste entra na **lista de correção** (procurar espera fixa, dependência entre testes ou API real) e não pode ser ignorado.
**Critérios:** Palavras-chave: 3 vezes; resultado muda sem mudar o código; instável; lista de correção. Nota cheia (0,4): motivo + o que fazer. Metade (0,2): só uma das partes. Zero (0): sugere apagar ou pular o teste.
