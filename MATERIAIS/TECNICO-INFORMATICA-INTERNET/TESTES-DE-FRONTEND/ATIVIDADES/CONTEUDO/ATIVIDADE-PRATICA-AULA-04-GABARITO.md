# Padrão de Resposta — Atividade Prática — Aula 04 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Testes de Integração com DOM usando Testing Library.
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
**Resposta esperada:** O teste de integração verifica **várias partes trabalhando juntas**: o HTML gerado, os eventos, a regra de validação e a mensagem que aparece na tela.
**Critérios:** Palavras-chave: várias partes juntas; HTML, eventos, validação, mensagem. Nota cheia (0,2): ideia de partes integradas com exemplo. Metade (0,1): "testa a tela" sem a ideia de partes juntas. Zero (0): confunde com teste de uma função isolada.

### ITEM 01-b
**Resposta esperada:** Fica no **meio da pirâmide**: é **mais lento que o unitário** (monta a tela e dispara eventos) e **bem mais rápido que o E2E** (não abre o navegador nem sobe o sistema inteiro). Por isso há menos testes de integração que unitários e mais que E2E.
**Critérios:** Palavras-chave: meio da pirâmide; mais lento que unitário; mais rápido que E2E. Nota cheia (0,4): posição + as duas comparações. Metade (0,2): posição com só uma comparação, ou comparações sem a posição. Zero (0): diz que fica no topo ou na base.

### ITEM 01-c
**Resposta esperada:** O **JSDOM é um DOM simulado** em JavaScript, que roda dentro do Node. O teste monta a tela, procura elementos e dispara eventos **sem abrir o navegador**, por isso é rápido. Resposta à equipe: o teste de integração **não abre o navegador**; quem abre é o E2E.
**Critérios:** Palavras-chave: DOM simulado; roda no Node; sem abrir navegador; rápido. Nota cheia (0,4): definição + motivo da rapidez + resposta à dúvida. Metade (0,2): definição sem a ligação com a rapidez ou sem responder à dúvida. Zero (0): diz que o JSDOM é um navegador real.

### ITEM 02-a
**Resposta esperada:** npm install -D jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom
**Critérios:** Palavras-chave: npm install -D (ou --save-dev); os quatro pacotes. Nota cheia (0,2): comando com -D e os quatro pacotes. Metade (0,1): falta um pacote ou falta o -D. Zero (0): comando sem relação ou sem os pacotes da Testing Library.

### ITEM 02-b
**Resposta esperada:** vitest.config.js: import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { environment: 'jsdom', setupFiles: ['./tests/setup.js'] } }); — tests/setup.js: import '@testing-library/jest-dom/vitest';
**Critérios:** Palavras-chave: defineConfig; environment 'jsdom'; setupFiles; import do jest-dom/vitest. Nota cheia (0,4): os dois arquivos corretos. Metade (0,2): só um dos arquivos certo, ou falta o environment ou o setupFiles. Zero (0): configuração sem jsdom e sem setup.

### ITEM 02-c
**Resposta esperada:** Em React, troca-se **@testing-library/dom por @testing-library/react** e monta-se o componente com **render(<Componente />)** em vez de colocar o elemento no document.body. **Continuam iguais** as queries (getByRole, getByLabelText...), o **userEvent** e os matchers do jest-dom.
**Critérios:** Palavras-chave: @testing-library/react; render; queries e userEvent iguais. Nota cheia (0,4): o que muda (pacote e render) + o que continua igual. Metade (0,2): só o que muda ou só o que continua igual. Zero (0): diz que tudo muda ou que não dá para testar React.

### ITEM 03-a
**Resposta esperada:** Testa a **implementação**: procura o botão pela **classe CSS** e confere uma **variável interna**, coisas que o usuário não vê. Por isso quebrou sem mudança visível.
**Critérios:** Palavras-chave: implementação; classe CSS; variável interna; o usuário não vê. Nota cheia (0,2): implementação + motivo. Metade (0,1): implementação sem motivo. Zero (0): diz que testa o comportamento.

### ITEM 03-b
**Resposta esperada:** const usuario = userEvent.setup(); document.body.append(criarBotaoSeguir({ aoAlternar: vi.fn() })); await usuario.click(screen.getByRole('button', { name: 'Seguir' })); expect(screen.getByRole('button', { name: 'Seguindo' })).toBeInTheDocument(); (ou expect(botao).toHaveTextContent('Seguindo')).
**Critérios:** Palavras-chave: getByRole('button', { name: 'Seguir' }); userEvent; await; expect do texto Seguindo. Nota cheia (0,4): query por papel + clique com await + expect do texto. Metade (0,2): falta o await ou o expect confere outra coisa, ou usa getByText no lugar do papel. Zero (0): continua usando classe CSS ou variável interna.

### ITEM 03-c
**Resposta esperada:** Testar pelo comportamento é **caixa preta**: o teste olha **entradas e saídas visíveis** (clique e texto na tela), **sem conhecer o código** interno. Como o novo teste procura o botão pelo **papel e pelo nome**, trocar a classe CSS não muda o que ele encontra; ele só quebra se o **comportamento** mudar.
**Critérios:** Palavras-chave: caixa preta; entradas e saídas; sem olhar o código; papel e nome não dependem de CSS. Nota cheia (0,4): relação com caixa preta + motivo de não quebrar. Metade (0,2): só uma das duas partes. Zero (0): confunde com caixa branca.

### ITEM 04-a
**Resposta esperada:** getByRole → getByLabelText → getByPlaceholderText → getByText → getByTestId (último recurso).
**Critérios:** Palavras-chave: as cinco queries na ordem. Nota cheia (0,2): ordem completa e correta. Metade (0,1): getByRole primeiro e getByTestId por último, com erro no meio. Zero (0): getByTestId como primeira opção.

### ITEM 04-b
**Resposta esperada:** Campo Senha: **screen.getByLabelText('Senha')** (o campo tem rótulo; também vale getByRole com o nome, mas campo de senha não tem papel textbox). Botão: **screen.getByRole('button', { name: 'Cadastrar' })** (papel + nome, prioridade 1). Título: **screen.getByRole('heading', { name: 'Crie sua conta' })** (é um título, papel heading). Cada escolha encontra o elemento como o usuário o percebe.
**Critérios:** Palavras-chave: getByLabelText('Senha'); getByRole('button', ...Cadastrar); getByRole('heading', ...). Nota cheia (0,4): as três queries certas com justificativa. Metade (0,2): duas certas ou as três sem justificativa; getByText no título vale metade. Zero (0): querySelector, classe CSS ou testid sem motivo.

### ITEM 04-c
**Resposta esperada:** O **getByTestId** é aceitável só como **último recurso**, quando o elemento não tem papel, rótulo nem texto visível para encontrar (e com justificativa). Buscar pelo **papel** é buscar como o **leitor de tela** encontra: se o teste não acha o botão pelo papel e nome, o leitor de tela também não acha, então o teste **revela problema de acessibilidade** (rótulo ou papel faltando no HTML).
**Critérios:** Palavras-chave: último recurso; sem papel/rótulo/texto; leitor de tela; acessibilidade. Nota cheia (0,4): quando usar testid + ligação com acessibilidade. Metade (0,2): só uma das partes. Zero (0): recomenda testid como padrão.

### ITEM 05-a
**Resposta esperada:** **getBy** encontra o elemento que **deve existir** (se não existir, o teste falha com erro). **queryBy** devolve **null** se não encontrar (serve para conferir que algo **não está** na tela). **findBy** **espera** o elemento aparecer (assíncrono, usado com await).
**Critérios:** Palavras-chave: getBy deve existir/erro; queryBy null/ausência; findBy espera/assíncrono. Nota cheia (0,2): as três diferenças. Metade (0,1): duas das três. Zero (0): diz que são iguais.

### ITEM 05-b
**Resposta esperada:** O **getByText lança erro** quando o elemento não existe, então o teste quebra **antes do expect**. O certo é usar **queryByText**, que devolve null: expect(screen.queryByText('A senha deve ter no mínimo 6 dígitos')).not.toBeInTheDocument();
**Critérios:** Palavras-chave: getBy lança erro; queryByText; not.toBeInTheDocument. Nota cheia (0,4): causa + teste reescrito com queryBy. Metade (0,2): só a causa ou só o código. Zero (0): mantém getBy ou usa findBy sem await.

### ITEM 05-c
**Resposta esperada:** Quando algo **aparece depois de um tempo**, por exemplo a mensagem "Cadastro realizado!" que surge depois de a tela esperar a resposta do servidor (ou uma lista carregada de uma API). Código: const aviso = await screen.findByText('Cadastro realizado!'); expect(aviso).toBeInTheDocument();
**Critérios:** Palavras-chave: aparece depois/assíncrono; await; findBy. Nota cheia (0,4): situação assíncrona + linha com await findBy. Metade (0,2): situação certa sem o await, ou código certo sem situação. Zero (0): situação síncrona ou findBy para conferir ausência.

### ITEM 06-a
**Resposta esperada:** const aoAlternar = vi.fn(); document.body.append(criarBotaoSeguir({ aoAlternar })); const usuario = userEvent.setup();
**Critérios:** Palavras-chave: vi.fn; document.body.append (ou appendChild); criarBotaoSeguir({ aoAlternar }); userEvent.setup(). Nota cheia (0,2): as três linhas. Metade (0,1): falta uma das três. Zero (0): sem montagem do botão.

### ITEM 06-b
**Resposta esperada:** await usuario.click(screen.getByRole('button', { name: 'Seguir' })); const botao = screen.getByRole('button', { name: 'Seguindo' }); expect(botao).toHaveAttribute('aria-pressed', 'true'); expect(aoAlternar).toHaveBeenCalledWith(true);
**Critérios:** Palavras-chave: await usuario.click; getByRole Seguir/Seguindo; toHaveAttribute('aria-pressed', 'true'); toHaveBeenCalledWith(true). Nota cheia (0,4): clique com await + as três conferências (texto, atributo, callback). Metade (0,2): falta o await ou uma das conferências. Zero (0): não clica ou não confere nada da tela.

### ITEM 06-c
**Resposta esperada:** it('volta para Seguir no segundo clique', async () => { const aoAlternar = vi.fn(); document.body.append(criarBotaoSeguir({ aoAlternar })); const usuario = userEvent.setup(); const botao = screen.getByRole('button', { name: 'Seguir' }); await usuario.click(botao); await usuario.click(botao); expect(screen.getByRole('button', { name: 'Seguir' })).toHaveAttribute('aria-pressed', 'false'); expect(aoAlternar).toHaveBeenLastCalledWith(false); });
**Critérios:** Palavras-chave: dois cliques com await; texto Seguir; aria-pressed false; toHaveBeenLastCalledWith(false) (ou toHaveBeenNthCalledWith(2, false)). Nota cheia (0,4): teste completo. Metade (0,2): dois cliques e texto certo, mas sem conferir a última chamada (ou sem async/await). Zero (0): um clique só.

### ITEM 07-a
**Resposta esperada:** O userEvent.setup() cria um **"usuário" simulado** que dispara a **sequência real de eventos** (foco, teclado, mouse, clique). Todas as ações dele são **assíncronas** (devolvem Promise); sem **await**, o expect pode rodar **antes** de o clique terminar.
**Critérios:** Palavras-chave: usuário simulado; sequência real de eventos; assíncrono/Promise; expect antes do clique. Nota cheia (0,2): o que cria + por que await. Metade (0,1): só uma das partes. Zero (0): diz que o await é opcional.

### ITEM 07-b
**Resposta esperada:** O primeiro teste deixou o botão no **document.body**, e o segundo montou outro: ficaram **dois botões** na tela. Solução: limpar o corpo antes de cada teste: beforeEach(() => { document.body.innerHTML = ''; });
**Critérios:** Palavras-chave: sobra do teste anterior; dois botões; beforeEach; document.body.innerHTML = ''. Nota cheia (0,4): causa + beforeEach correto. Metade (0,2): só a causa ou só o código. Zero (0): sugere apagar o segundo teste.

### ITEM 07-c
**Resposta esperada:** Cada teste precisa ser **independente**: rodar sozinho, em qualquer ordem, com o mesmo resultado. Se um depende do outro, mudar a ordem ou rodar só um quebra o teste. Testes que passam e falham **ao acaso (instáveis)** fazem a equipe **deixar de confiar** na suíte e ignorar falhas reais.
**Critérios:** Palavras-chave: independente; qualquer ordem; instável/ao acaso; perde a confiança. Nota cheia (0,4): independência + efeito na confiança. Metade (0,2): só uma das partes. Zero (0): diz que a ordem dos testes deve ser fixa.

### ITEM 08-a
**Resposta esperada:** **toBeInTheDocument** confere se o elemento **está na página**; **toBeDisabled** confere se está **desabilitado**; **toHaveValue** confere se o campo tem o **valor digitado**.
**Critérios:** Palavras-chave: está na página; desabilitado; valor do campo. Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 08-b
**Resposta esperada:** expect(screen.getByLabelText('E-mail')).toHaveValue('ana@escola.com'); expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled();
**Critérios:** Palavras-chave: getByLabelText('E-mail'); toHaveValue('ana@escola.com'); getByRole button Cadastrar; toBeDisabled(). Nota cheia (0,4): os dois expects certos. Metade (0,2): um dos dois certo. Zero (0): matchers trocados ou sem query.

### ITEM 08-c
**Resposta esperada:** expect(screen.getByText('A senha deve ter no mínimo 6 dígitos')).toBeVisible(); — **toBeInTheDocument** só confere que o elemento **existe na página**; **toBeVisible** confere que, além de existir, **o usuário consegue vê-lo** (não está escondido por display none, hidden ou opacidade zero).
**Critérios:** Palavras-chave: getByText da mensagem; toBeVisible; existe × usuário vê. Nota cheia (0,4): expect certo + diferença. Metade (0,2): só o expect ou só a diferença. Zero (0): diz que são iguais.

### ITEM 09-a
**Resposta esperada:** **Pré-condição = Arrange** (montar o formulário); **passos = Act** (digitar e clicar); **resultado esperado = Assert** (conferir a mensagem).
**Critérios:** Palavras-chave: pré-condição/Arrange; passos/Act; resultado/Assert. Nota cheia (0,2): as três correspondências. Metade (0,1): duas. Zero (0): correspondências trocadas.

### ITEM 09-b
**Resposta esperada:** it('CT-07: cadastra com dados válidos', async () => { document.body.append(criarFormCadastro()); const usuario = userEvent.setup(); await usuario.type(screen.getByLabelText('E-mail'), 'ana@escola.com'); await usuario.type(screen.getByLabelText('Senha'), '123456'); await usuario.click(screen.getByRole('button', { name: 'Cadastrar' })); expect(screen.getByText('Cadastro realizado!')).toBeInTheDocument(); }); (findByText com await também vale.)
**Critérios:** Palavras-chave: montagem do formulário; userEvent.type com await; getByLabelText; getByRole button; expect da mensagem. Nota cheia (0,4): teste completo e correto. Metade (0,2): falta o await, ou uma das digitações, ou o expect. Zero (0): não segue o caso de teste.

### ITEM 09-c
**Resposta esperada:** É de **funcionalidade (4.1)** porque confere se a tela **faz o que o requisito pede** (cadastrar e avisar). É de **caixa preta (3.1)** porque usa só **entradas e saídas visíveis**, sem olhar o código. Executar de forma **automática** permite **repetir o caso a cada alteração em segundos**, sem esforço manual, servindo de teste de regressão.
**Critérios:** Palavras-chave: faz o que o requisito pede; entradas e saídas sem código; repetir automático/regressão. Nota cheia (0,4): as três ideias. Metade (0,2): duas. Zero (0): classifica como desempenho ou caixa branca.

### ITEM 10-a
**Resposta esperada:** Defeito: **a mensagem de aviso da senha não aparece**, então o usuário não sabe por que não consegue avançar. Tipo: **teste de funcionalidade** (4.1) — a tela não cumpre o comportamento esperado (também se aceita citar o impacto na usabilidade).
**Critérios:** Palavras-chave: mensagem não aparece; funcionalidade. Nota cheia (0,2): defeito + tipo. Metade (0,1): só o defeito ou só usabilidade sem funcionalidade. Zero (0): diz que o defeito é o botão desabilitado.

### ITEM 10-b
**Resposta esperada:** it('avisa quando a senha é curta', async () => { document.body.append(criarFormCadastro()); const usuario = userEvent.setup(); await usuario.type(screen.getByLabelText('Senha'), '12345'); expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled(); expect(screen.getByText('A senha deve ter no mínimo 6 dígitos')).toBeInTheDocument(); }); — Hoje **falha a linha do getByText da mensagem** (o botão desabilitado passa).
**Critérios:** Palavras-chave: senha de 5 caracteres com await; toBeDisabled; getByText da mensagem; linha que falha. Nota cheia (0,4): teste completo + linha que falha. Metade (0,2): teste certo sem indicar a linha, ou falta uma das conferências. Zero (0): usa queryBy esperando ausência da mensagem.

### ITEM 10-c
**Resposta esperada:** O teste que falha é a **prova reproduzível** do defeito: a equipe roda e **vê a falha**, sem depender de descrição. Depois da correção, o **mesmo teste deve passar** e **fica na suíte** como **teste de regressão**, para avisar se o defeito voltar.
**Critérios:** Palavras-chave: prova reproduzível; passa depois da correção; fica na suíte/regressão. Nota cheia (0,4): as duas partes. Metade (0,2): só uma. Zero (0): diz para apagar o teste depois da correção.
