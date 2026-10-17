# Padrão de Resposta — Atividade Prática — Aula 09 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Qualidade, Performance, Acessibilidade e CI/CD.
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
**Resposta esperada:** **Integração contínua (CI)** é juntar o código de todos várias vezes por dia, com a suíte de testes rodando **automaticamente a cada envio**. **Entrega contínua (CD)** é **publicar automaticamente** o que passou pelo CI.
**Critérios:** Palavras-chave: CI = testes automáticos a cada envio; CD = publicação automática do que passou. Nota cheia (0,2): as duas definições. Metade (0,1): só uma. Zero (0): definições trocadas.

### ITEM 01-b
**Resposta esperada:** Com CI, a suíte **roda sozinha a cada push e pull request**; o teste do carrinho teria **falhado no pull request**, o check ficaria **vermelho** e a versão quebrada **não seria juntada nem publicada**. Ninguém precisaria lembrar de rodar os testes.
**Critérios:** Palavras-chave: roda automaticamente; teste falha no pull request; check vermelho; não publica. Nota cheia (0,4): explicação completa. Metade (0,2): "os testes rodariam" sem dizer que bloqueia a publicação. Zero (0): sem relação com o CI.

### ITEM 01-c
**Resposta esperada:** O servidor roda os testes **sempre**, **do mesmo jeito** (mesma máquina, mesma versão do Node, mesmas dependências) e **mostra o resultado no pull request** para todos. À mão, a pessoa **esquece**, pula testes ou roda num computador diferente, e o resultado depende de quem rodou.
**Critérios:** Palavras-chave: sempre; mesmo ambiente; resultado visível para todos; à mão esquece/depende da pessoa. Nota cheia (0,4): as duas comparações. Metade (0,2): só um lado. Zero (0): diz que tanto faz.

### ITEM 02-a
**Resposta esperada:** on: · push: · branches: [main] · pull_request: (com push e pull_request dentro de on, 2 espaços por nível).
**Critérios:** Palavras-chave: on; push com branches [main]; pull_request. Nota cheia (0,2): trecho completo. Metade (0,1): falta o pull_request ou o filtro da main. Zero (0): sem on.

### ITEM 02-b
**Resposta esperada:** jobs: · testes: · runs-on: ubuntu-latest · steps: · - uses: actions/checkout@v4 · - uses: actions/setup-node@v4 com with: node-version: 20 e cache: npm · - run: npm ci · - run: npm run test:coverage
**Critérios:** Palavras-chave: runs-on ubuntu-latest; actions/checkout; actions/setup-node com node-version 20 e cache npm; npm ci; npm run test:coverage, nessa ordem. Nota cheia (0,4): job completo e na ordem. Metade (0,2): falta um passo ou ordem errada (ex.: npm ci antes do checkout). Zero (0): sem steps.

### ITEM 02-c
**Resposta esperada:** O **npm ci** instala **exatamente o que está no package-lock.json** (e começa do zero), então todas as execuções usam as mesmas versões; o npm install pode atualizar versões e mudar o lock. Os **limites (thresholds) da aula 7** fazem o **npm run test:coverage terminar com erro** abaixo da meta, e o passo com erro **deixa o job vermelho**.
**Critérios:** Palavras-chave: npm ci = exatamente o package-lock.json; npm install pode mudar versões; thresholds; comando termina com erro; job falha. Nota cheia (0,4): as duas explicações. Metade (0,2): só uma. Zero (0): explicações erradas.

### ITEM 03-a
**Resposta esperada:** No YAML, a **indentação define a estrutura** (quem está dentro de quem); a regra é **2 espaços por nível, nunca tab**.
**Critérios:** Palavras-chave: indentação define a estrutura; 2 espaços; nunca tab. Nota cheia (0,2): motivo + regra. Metade (0,1): só a regra. Zero (0): sem a regra.

### ITEM 03-b
**Resposta esperada:** e2e: · runs-on: ubuntu-latest · needs: testes · steps: · - uses: actions/checkout@v4 · - uses: cypress-io/github-action@v6 com with: start: npm run dev e wait-on: 'http://localhost:5173'
**Critérios:** Palavras-chave: job e2e; needs: testes; checkout; cypress-io/github-action; start npm run dev; wait-on http://localhost:5173. Nota cheia (0,4): job completo. Metade (0,2): falta o needs ou o start/wait-on. Zero (0): sem a action do Cypress.

### ITEM 03-c
**Resposta esperada:** O **needs: testes** faz o job e2e **esperar o job testes e só rodar se ele passar**. É bom porque o E2E é o **mais lento**: se um teste unitário ou de integração já falhou, **não vale gastar minutos** no E2E, e a equipe recebe o erro mais rápido e mais preciso.
**Critérios:** Palavras-chave: só roda se testes passar; E2E é lento; economiza tempo; erro mais rápido. Nota cheia (0,4): o que faz + por que é bom. Metade (0,2): só uma das partes. Zero (0): diz que roda os dois ao mesmo tempo.

### ITEM 04-a
**Resposta esperada:** No repositório, em **Settings → Branches**, numa regra para a branch **main**.
**Critérios:** Palavras-chave: Settings; Branches; regra para main. Nota cheia (0,2): caminho certo. Metade (0,1): só "nas configurações". Zero (0): lugar errado.

### ITEM 04-b
**Resposta esperada:** 1) Exigir o **status testes (e e2e) aprovado** antes do merge. 2) Exigir pelo menos **1 revisão aprovada** no pull request.
**Critérios:** Palavras-chave: status/check aprovado antes do merge; 1 revisão aprovada. Nota cheia (0,4): as duas. Metade (0,2): só uma. Zero (0): nenhuma.

### ITEM 04-c
**Resposta esperada:** O pull request fica com o **check vermelho** e **não pode ser juntado** (o botão de merge fica bloqueado) até a correção. Isso garante que a **main só recebe código testado**, com cobertura dentro da meta.
**Critérios:** Palavras-chave: check vermelho; merge bloqueado; main só com código testado. Nota cheia (0,4): consequência + garantia. Metade (0,2): só uma das partes. Zero (0): diz que o merge continua livre.

### ITEM 05-a
**Resposta esperada:** npm install -D vitest-axe — O axe-core confere automaticamente **regras de acessibilidade (WCAG)**, como campo sem rótulo, imagem sem texto alternativo, botão sem nome e contraste baixo.
**Critérios:** Palavras-chave: npm install -D vitest-axe; regras de acessibilidade/WCAG. Nota cheia (0,2): comando + o que confere. Metade (0,1): só uma das partes. Zero (0): nenhuma.

### ITEM 05-b
**Resposta esperada:** import { it, expect } from 'vitest'; import { axe } from 'vitest-axe'; import { montarCheckout } from '../src/checkout.js'; it('formulário de checkout não tem violações de acessibilidade', async () => { montarCheckout(document.body); const resultado = await axe(document.body); expect(resultado.violations).toHaveLength(0); });
**Critérios:** Palavras-chave: import de axe de vitest-axe; montarCheckout(document.body); await axe(document.body); expect(resultado.violations).toHaveLength(0). Nota cheia (0,4): teste completo. Metade (0,2): sem await, ou sem montar o checkout. Zero (0): sem o axe.

### ITEM 05-c
**Resposta esperada:** A usabilidade é o usuário **conseguir usar** a tela, e isso inclui pessoas que usam **leitor de tela, teclado ou alto contraste**: uma tela inacessível não é usável para elas. O axe encontra **só parte dos problemas**; o resto exige **teste manual**, como navegar só com o teclado e usar o leitor de tela.
**Critérios:** Palavras-chave: leitor de tela/teclado/alto contraste; acessibilidade é parte da usabilidade; axe encontra parte; teste manual. Nota cheia (0,4): as duas explicações. Metade (0,2): só uma. Zero (0): diz que o axe encontra tudo.

### ITEM 06-a
**Resposta esperada:** Quem usa **leitor de tela**: o campo sem rótulo e o botão só com ícone **não têm nome** para ser lido em voz alta, e a pessoa não sabe o que preencher ou o que o botão faz.
**Critérios:** Palavras-chave: leitor de tela; sem nome/sem texto para ler. Nota cheia (0,2): quem + por quê. Metade (0,1): só quem. Zero (0): resposta sem relação.

### ITEM 06-b
**Resposta esperada:** CEP: <label for="cep">CEP</label> <input id="cep" name="cep"> (ou aria-label="CEP" no input). Imagem: <img src="fone.jpg" alt="Fone de ouvido sem fio preto">. Botão: <button aria-label="Remover item">🗑️</button>.
**Critérios:** Palavras-chave: label com for igual ao id (ou aria-label); alt descritivo; aria-label no botão. Nota cheia (0,4): as três correções. Metade (0,2): duas. Zero (0): uma ou nenhuma.

### ITEM 06-c
**Resposta esperada:** Ajustar as cores do texto e do fundo (por exemplo, escurecer o texto) até a relação de contraste mínima de **4,5:1**. Depois da correção, **rodar o axe de novo** (o teste de acessibilidade volta a ficar verde) e conferir visualmente.
**Critérios:** Palavras-chave: ajustar cores; 4,5:1; rodar o axe de novo. Nota cheia (0,4): correção com 4,5:1 + conferência. Metade (0,2): só uma das partes. Zero (0): sem a relação e sem conferência.

### ITEM 07-a
**Resposta esperada:** No **Chrome DevTools → Lighthouse**, auditando a página no **modo mobile**.
**Critérios:** Palavras-chave: DevTools; Lighthouse; mobile. Nota cheia (0,2): lugar + modo. Metade (0,1): só um. Zero (0): nenhum.

### ITEM 07-b
**Resposta esperada:** **LCP (Largest Contentful Paint):** tempo até o **maior elemento aparecer** — bom até **2,5 s**. **INP (Interaction to Next Paint):** tempo de **resposta a cliques e toques** — bom até **200 ms**. **CLS (Cumulative Layout Shift):** quanto a página **"pula"** enquanto carrega — bom até **0,1**.
**Critérios:** Palavras-chave: maior elemento/2,5 s; resposta a cliques/200 ms; página pula/0,1. Nota cheia (0,4): os três com o que medem e o valor bom. Metade (0,2): os três sem os valores, ou dois completos. Zero (0): um ou nenhum.

### ITEM 07-c
**Resposta esperada:** Uma página **lenta**, que **pula** ou que **demora a responder** atrapalha o cliente: ele **clica no lugar errado**, **desiste da compra** e vai para outra loja, principalmente no celular. O sistema pode estar "certo" e mesmo assim ter **baixa qualidade** para quem usa.
**Critérios:** Palavras-chave: cliente desiste/abandona; clica errado; celular; qualidade para quem usa. Nota cheia (0,4): explicação com efeito no cliente. Metade (0,2): "fica mais rápido" sem efeito no cliente. Zero (0): diz que desempenho não importa.

### ITEM 08-a
**Resposta esperada:** **Não é bom** (o bom é até 2,5 s). A primeira melhoria é **otimizar a imagem de 3 MB** (comprimir, reduzir o tamanho, formato moderno como WebP).
**Critérios:** Palavras-chave: não é bom; acima de 2,5 s; otimizar a imagem. Nota cheia (0,2): diagnóstico + melhoria. Metade (0,1): só um. Zero (0): diz que 4,8 s é bom.

### ITEM 08-b
**Resposta esperada:** <img src="vitrine-800.webp" alt="Fone de ouvido sem fio preto" width="800" height="600"> — o **src** aponta para a **imagem otimizada** (menor, WebP), que carrega mais rápido e melhora o **LCP**; **width e height** reservam o **espaço da imagem** antes de ela chegar, e a página **não pula** (**CLS**); o **alt** mantém a acessibilidade.
**Critérios:** Palavras-chave: imagem otimizada (LCP); width e height definidos (CLS); alt. Nota cheia (0,4): tag com os atributos + explicação. Metade (0,2): tag sem explicação, ou falta width/height. Zero (0): sem melhoria na tag.

### ITEM 08-c
**Resposta esperada:** **INP:** carregar **menos JavaScript na carga inicial** (dividir o código, adiar scripts que não são da primeira tela), para o navegador ficar livre e **responder rápido ao clique**. **Fora da tela:** **carregamento sob demanda** (loading="lazy" nas imagens de baixo), para a página baixar primeiro **só o que o cliente vê** e o resto quando ele rolar.
**Critérios:** Palavras-chave: menos JavaScript na carga inicial; resposta ao clique; carregamento sob demanda/lazy; baixa só o que se vê. Nota cheia (0,4): as duas melhorias com o porquê. Metade (0,2): só uma, ou as duas sem o porquê. Zero (0): nenhuma correta.

### ITEM 09-a
**Resposta esperada:** O CI informa **a todos se a alteração passou** nos testes (check **verde** ou **vermelho**) e mostra **qual teste falhou**.
**Critérios:** Palavras-chave: passou ou não; check verde/vermelho; visível para todos. Nota cheia (0,2): resposta completa. Metade (0,1): "mostra os testes" sem o resultado. Zero (0): sem relação.

### ITEM 09-b
**Resposta esperada:** 1) Criar uma **branch** e fazer a alteração (o teste quebrado). 2) **Abrir o pull request**; todos acompanham o **check ficar vermelho**. 3) Outro integrante **revisa e comenta** onde está a falha. 4) Alguém **corrige numa nova alteração** e o check fica **verde**. 5) Um integrante **aprova** e o **merge é liberado**.
**Critérios:** Palavras-chave: branch; pull request com check vermelho; revisão com comentário; correção com check verde; aprovação e merge. Nota cheia (0,4): os cinco passos em ordem. Metade (0,2): três ou quatro passos, ou fora de ordem. Zero (0): dois ou menos.

### ITEM 09-c
**Resposta esperada:** No pull request, o defeito é pego **antes de afetar alguém**: a correção é **rápida e barata** e só a equipe vê. Na main, o defeito pode ir **para a loja publicada** (como o carrinho quebrado), **atingir clientes**, causar **prejuízo** e atrapalhar o trabalho de todos que usam a main.
**Critérios:** Palavras-chave: antes de afetar clientes; correção barata; main publicada afeta clientes/prejuízo. Nota cheia (0,4): os dois lados. Metade (0,2): só um lado. Zero (0): diz que tanto faz.

### ITEM 10-a
**Resposta esperada:** O badge mostra **o estado dos testes da main** (passando ou falhando) **para qualquer pessoa** que abrir o repositório.
**Critérios:** Palavras-chave: estado da main; passando/falhando; visível para qualquer pessoa. Nota cheia (0,2): resposta completa. Metade (0,1): "mostra os testes" sem o estado. Zero (0): sem relação.

### ITEM 10-b
**Resposta esperada:** ![Testes](https://github.com/<usuario>/<repositorio>/actions/workflows/ci.yml/badge.svg)
**Critérios:** Palavras-chave: imagem Markdown ![...](...); github.com/<usuario>/<repositorio>/actions/workflows/ci.yml/badge.svg (usuário e repositório reais também valem). Nota cheia (0,4): linha completa e correta. Metade (0,2): endereço sem /badge.svg ou sem o nome do workflow. Zero (0): sem a imagem do badge.

### ITEM 10-c
**Resposta esperada:** O TESTING.md documenta **como rodar a suíte**, a **estratégia de testes** e **como contribuir com testes**. Ele ajuda a equipe porque qualquer integrante novo **sabe sozinho** rodar e escrever testes **do mesmo jeito** que os outros, e as conversas no pull request partem de regras **combinadas por escrito**.
**Critérios:** Palavras-chave: como rodar; estratégia; como contribuir; integrante novo; mesmo jeito/regras combinadas. Nota cheia (0,4): conteúdo + como ajuda. Metade (0,2): só uma das partes. Zero (0): sem relação.
