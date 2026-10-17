# Padrão de Resposta — Atividade Prática — Aula 10 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Projeto Integrador: Suíte de Testes + Avaliação.
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
**Resposta esperada:** 7.1 **Planejamento** → 7.2 **Desenho dos testes** → 7.3 **Execução** → 7.4 **Monitoração e controle** → 7.5 **Avaliação dos resultados**.
**Critérios:** Palavras-chave: planejamento; desenho; execução; monitoração e controle; avaliação dos resultados, em ordem. Nota cheia (0,2): as cinco em ordem. Metade (0,1): as cinco fora de ordem, ou quatro em ordem. Zero (0): três ou menos.

### ITEM 01-b
**Resposta esperada:** **Planejamento:** atualizar o plano e a matriz de rastreabilidade da SA 1. **Desenho:** escolher os casos por risco (caminho feliz e bordas). **Execução:** unitários (Vitest), integração (Testing Library + MSW) e E2E. **Monitoração e controle:** cobertura, testes instáveis e checks do pipeline. **Avaliação:** TESTING.md com resultado, fora do escopo e recomendação.
**Critérios:** Palavras-chave: plano e matriz; casos por risco; três camadas; cobertura/flaky/checks; TESTING.md com recomendação. Nota cheia (0,4): as cinco etapas com o que é feito. Metade (0,2): três ou quatro etapas. Zero (0): duas ou menos.

### ITEM 01-c
**Resposta esperada:** O **planejamento e o desenho** vêm antes da execução: primeiro se decide **o que testar e em que ordem, pelo risco**, e só então se escrevem os testes. Sem isso, a equipe testa o que é **mais fácil** (e não o mais importante), gasta o tempo curto e chega ao fim **sem cobrir o que pode dar prejuízo**.
**Critérios:** Palavras-chave: decidir antes o que testar; risco; testar o mais fácil em vez do mais importante. Nota cheia (0,4): explicação completa. Metade (0,2): "fica organizado" sem falar em prioridade. Zero (0): diz que a ordem não importa.

### ITEM 02-a
**Resposta esperada:** **Primeiro:** a jornada **vitrine → carrinho → checkout → confirmação**. **Depois:** o **cupom**. **Fora do escopo:** a página **"Sobre nós"**.
**Critérios:** Palavras-chave: jornada de compra primeiro; cupom depois; Sobre nós fora. Nota cheia (0,2): as três decisões. Metade (0,1): duas. Zero (0): ordem invertida ou sem fora do escopo.

### ITEM 02-b
**Resposta esperada:** A jornada de compra vem primeiro porque **é onde está o dinheiro**: se ela falhar na Black Friday, a loja **perde vendas**. O cupom vem depois porque é **onde estão os defeitos mais comuns** (validade, valor mínimo, valor fixo). A página "Sobre nós" fica fora porque um defeito nela tem **impacto baixo** e não impede a compra.
**Critérios:** Palavras-chave: dinheiro/vendas na jornada; defeitos comuns no cupom; baixo impacto do Sobre nós. Nota cheia (0,4): as três justificativas pelo risco. Metade (0,2): duas. Zero (0): justificativa sem risco (ex.: "porque sim").

### ITEM 02-c
**Resposta esperada:** **Caminho feliz:** total R$ 200,00 com cupom percentual de 10% válido → resultado esperado R$ 180,00. **Borda:** total exatamente igual ao valor mínimo do cupom (ex.: R$ 100,00 com mínimo R$ 100,00) → o cupom é aceito; ou cupom de valor fixo maior que o total → total R$ 0,00 (nunca negativo); ou cupom vencido → erro "Cupom expirado". (Valores diferentes valem, desde que coerentes.)
**Critérios:** Palavras-chave: caso feliz com entrada e resultado; caso de borda (limite, valor fixo maior que o total, vencido) com entrada e resultado. Nota cheia (0,4): os dois casos com entrada e resultado esperado. Metade (0,2): só um caso, ou os dois sem resultado esperado. Zero (0): nenhum caso.

### ITEM 03-a
**Resposta esperada:** **Unitários:** Vitest. **Integração:** Vitest com Testing Library e MSW (API simulada). **E2E:** Cypress ou Playwright.
**Critérios:** Palavras-chave: Vitest; Testing Library + MSW; Cypress/Playwright. Nota cheia (0,2): as três camadas com as ferramentas. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 03-b
**Resposta esperada:** **Unitário:** regras como desconto, frete e cupom (ex.: aplicarCupom nunca deixa o total negativo). **Integração:** componentes como o carrinho e o checkout com a API simulada pelo MSW (ex.: carrinho mostra os itens; erro 500 mostra a mensagem). **E2E:** fluxos como login, compra completa e cupom inválido no navegador real.
**Critérios:** Palavras-chave: regra/função no unitário; componente com API simulada na integração; fluxo completo no E2E. Nota cheia (0,4): um exemplo correto por camada. Metade (0,2): dois exemplos corretos. Zero (0): exemplos trocados de camada.

### ITEM 03-c
**Resposta esperada:** Pela **pirâmide**, os unitários ficam na **base**: são **rápidos e baratos** e apontam a função exata com erro, então podem ser muitos. Os E2E ficam no **topo**: são **lentos e mais frágeis**, por isso são **poucos**, só para os **fluxos críticos**.
**Critérios:** Palavras-chave: base com muitos unitários rápidos; topo com poucos E2E lentos; fluxos críticos. Nota cheia (0,4): explicação dos dois lados da pirâmide. Metade (0,2): só um lado. Zero (0): pirâmide invertida.

### ITEM 04-a
**Resposta esperada:** É a suíte que **mostra a estratégia de testes só pela estrutura das pastas**: cada camada no seu lugar, com nomes claros, e os arquivos de configuração e documentação na raiz.
**Critérios:** Palavras-chave: estratégia visível pela estrutura das pastas. Nota cheia (0,2): definição completa. Metade (0,1): "suíte arrumada" sem falar da estrutura. Zero (0): sem relação.

### ITEM 04-b
**Resposta esperada:** loja-virtual/ · src/ · tests/unitarios/ · tests/integracao/ · e2e/ · .github/workflows/ci.yml · vitest.config.js · TESTING.md (pode incluir package.json e playwright.config.js ou cypress.config.js).
**Critérios:** Palavras-chave: src; tests/unitarios; tests/integracao; e2e; .github/workflows/ci.yml; vitest.config.js; TESTING.md. Nota cheia (0,4): estrutura completa. Metade (0,2): faltam dois itens ou as camadas não estão separadas. Zero (0): sem pastas de teste.

### ITEM 04-c
**Resposta esperada:** **tests/unitarios:** as regras (descontos, frete, cupom). **tests/integracao:** os componentes (carrinho, checkout) com MSW. **e2e:** os fluxos (login, compra completa, cupom inválido). Separar ajuda a equipe a **achar o teste certo rápido**, a **rodar cada camada separada** (as rápidas a cada mudança, os E2E no pipeline) e a **ver o que falta** em cada camada.
**Critérios:** Palavras-chave: regras nos unitários; componentes na integração; fluxos no e2e; achar e rodar cada camada. Nota cheia (0,4): conteúdo das pastas + vantagem. Metade (0,2): só uma das partes. Zero (0): conteúdo trocado.

### ITEM 05-a
**Resposta esperada:** O bloco scripts guarda **comandos com nome** (npm test, npm run test:coverage…), para que **todos rodem a suíte do mesmo jeito**, no computador e no pipeline, sem decorar as opções.
**Critérios:** Palavras-chave: comandos com nome; mesmo jeito para todos/no pipeline. Nota cheia (0,2): resposta completa. Metade (0,1): "guarda comandos" sem a vantagem. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** "scripts": { "test": "vitest", "test:run": "vitest run", "test:coverage": "vitest run --coverage", "test:e2e": "playwright test" } (ou "cypress run" no test:e2e).
**Critérios:** Palavras-chave: test vitest; test:run vitest run; test:coverage vitest run --coverage; test:e2e playwright test ou cypress run. Nota cheia (0,4): os quatro scripts. Metade (0,2): dois ou três. Zero (0): um ou nenhum.

### ITEM 05-c
**Resposta esperada:** O **npm test (vitest)** fica em **modo observação**: roda de novo a cada arquivo salvo e **não termina** — bom para o desenvolvimento. O **npm run test:run (vitest run)** roda **uma vez e termina**, com sucesso ou erro. O pipeline deve usar o que **roda uma vez e termina** (test:run, ou test:coverage, que também usa vitest run), senão o job nunca acaba.
**Critérios:** Palavras-chave: modo observação não termina; vitest run roda uma vez e termina; pipeline usa run/test:coverage. Nota cheia (0,4): diferença + escolha do pipeline. Metade (0,2): só uma das partes. Zero (0): manda o pipeline usar o modo observação.

### ITEM 06-a
**Resposta esperada:** Mínimo para aprovação: **≥ 70%**; meta Excelente: **≥ 80%** (linhas, branches e funções).
**Critérios:** Palavras-chave: 70%; 80%. Nota cheia (0,2): os dois valores. Metade (0,1): só um. Zero (0): valores errados.

### ITEM 06-b
**Resposta esperada:** **Unitários:** mínimo 5 casos; Excelente 10 ou mais, com bordas. **Integração:** mínimo o carrinho com API simulada; Excelente carrinho, carregamento e erro 500. **E2E:** mínimo 3 fluxos (login, compra completa, cupom inválido); Excelente os 3 estáveis em 3 execuções. **Pipeline:** mínimo executa a suíte; Excelente bloqueia o merge e tem badge.
**Critérios:** Palavras-chave: 5/10 com bordas; carrinho com API simulada/carregamento e erro 500; 3 fluxos/estáveis em 3 execuções; executa/bloqueia merge e badge. Nota cheia (0,4): os quatro requisitos com mínimo e meta. Metade (0,2): dois ou três. Zero (0): um ou nenhum.

### ITEM 06-c
**Resposta esperada:** Um teste que passa **uma vez** pode ser **instável (flaky)**: passar e falhar sem mudança no código. Exigir **3 execuções iguais** comprova que os fluxos são **confiáveis**, e só uma suíte confiável serve de **evidência** de que a loja pode ir para a Black Friday.
**Critérios:** Palavras-chave: passar uma vez pode ser flaky; 3 execuções comprovam estabilidade; suíte confiável é evidência. Nota cheia (0,4): explicação completa. Metade (0,2): só define flaky. Zero (0): diz que passar uma vez basta.

### ITEM 07-a
**Resposta esperada:** **Como rodar**, **Estratégia**, **Fora do escopo**, **Resultado** e **Como contribuir**.
**Critérios:** Palavras-chave: as cinco seções. Nota cheia (0,2): as cinco. Metade (0,1): três ou quatro. Zero (0): duas ou menos.

### ITEM 07-b
**Resposta esperada:** **Como rodar:** npm ci (instalar), npm run test:coverage (unitários e integração com cobertura), npm run test:e2e (fluxos E2E, com a aplicação rodando). **Resultado:** cobertura final de 72%; 12 testes unitários, 4 de integração e 3 fluxos E2E estáveis em 3 execuções; 1 teste instável encontrado e corrigido (com a causa).
**Critérios:** Palavras-chave: npm ci; npm run test:coverage; npm run test:e2e; 72%; quantidade por camada; teste instável registrado. Nota cheia (0,4): as duas seções completas com os dados. Metade (0,2): só uma seção, ou as duas sem os dados. Zero (0): nenhuma seção.

### ITEM 07-c
**Resposta esperada:** **Como contribuir:** "Todo pull request precisa de **teste novo para o comportamento novo**; a suíte e a cobertura mínima precisam passar no CI antes do merge." Ela protege a suíte porque a **regra fica escrita** para quem chegar depois: o código novo **não entra sem teste**, e a cobertura não cai com o tempo.
**Critérios:** Palavras-chave: teste novo para comportamento novo; regra escrita para quem vem depois; código sem teste não entra. Nota cheia (0,4): seção + explicação. Metade (0,2): só uma das partes. Zero (0): nenhuma.

### ITEM 08-a
**Resposta esperada:** **O que não foi testado** e a **justificativa pelo risco** de cada item (S2).
**Critérios:** Palavras-chave: o que não foi testado; justificativa pelo risco. Nota cheia (0,2): as duas partes. Metade (0,1): só a lista. Zero (0): sem relação.

### ITEM 08-b
**Resposta esperada:** **Página "Sobre nós":** não foi testada porque é **conteúdo estático**, sem regra de negócio; um defeito nela tem **impacto baixo** e não impede a compra. **Integração real com a operadora de cartão:** não foi testada porque **depende de serviço externo**; o risco é **tratado com o mock (MSW) das respostas de recusa e de aprovação**.
**Critérios:** Palavras-chave: Sobre nós estático/impacto baixo; operadora é serviço externo; risco tratado com mock de recusa e aprovação. Nota cheia (0,4): as duas justificativas pelo risco. Metade (0,2): só uma, ou as duas sem o risco. Zero (0): nenhuma justificativa.

### ITEM 08-c
**Resposta esperada:** Fora do escopo **por escrito e justificado** é uma **decisão consciente**: a equipe sabe o que não foi testado, **por que** e **como o risco foi tratado**, e pode testar depois se o risco mudar. Esquecer é **não saber** que existe um buraco na suíte — o risco fica **escondido** até virar defeito em produção.
**Critérios:** Palavras-chave: decisão consciente; equipe sabe o que e por quê; esquecer esconde o risco. Nota cheia (0,4): os dois lados. Metade (0,2): só um lado. Zero (0): diz que é a mesma coisa.

### ITEM 09-a
**Resposta esperada:** **2 pontos fortes**, **1 risco** (teste instável, caso não coberto) e **1 sugestão**.
**Critérios:** Palavras-chave: 2 pontos fortes; 1 risco; 1 sugestão. Nota cheia (0,2): os itens com as quantidades. Metade (0,1): itens sem as quantidades. Zero (0): itens errados.

### ITEM 09-b
**Resposta esperada:** Exemplo: "**Pontos fortes:** 1) a suíte está separada por camadas e fácil de entender; 2) o fluxo de compra completa tem verificação em cada etapa. **Risco:** o teste E2E do checkout usa cy.wait(3000), que pode ficar instável numa máquina lenta. **Sugestão:** que tal trocar o cy.wait(3000) por cy.intercept com cy.wait('@alias') e acrescentar um teste de cupom vencido?" (Outros pontos fortes valem.)
**Critérios:** Palavras-chave: dois pontos fortes concretos; risco da espera fixa ou do cupom vencido; sugestão técnica respeitosa. Nota cheia (0,4): os quatro itens concretos e respeitosos. Metade (0,2): falta um item, ou itens genéricos. Zero (0): comentário ofensivo ou sem os itens.

### ITEM 09-c
**Resposta esperada:** A dupla revisada responde **a cada comentário** com **"aceito, porque…"** ou **"mantenho, porque…"**, sempre com **fato técnico** (S1). A sugestão que ela decidir **não aplicar** é **registrada no TESTING.md** com o motivo.
**Critérios:** Palavras-chave: responder a cada comentário; aceito porque/mantenho porque; fato técnico; registrar no TESTING.md. Nota cheia (0,4): forma de responder + registro. Metade (0,2): só uma das partes. Zero (0): manda ignorar os comentários.

### ITEM 10-a
**Resposta esperada:** **Avaliação contínua** (entregas das aulas 1 a 9 e SAs 1 e 2): **60%**. **Avaliação prática** (suíte de testes para a aplicação fornecida): **25%**. **Avaliação objetiva** (conceitos, técnicas, tipos e processo de teste): **15%**.
**Critérios:** Palavras-chave: contínua 60%; prática 25%; objetiva 15%. Nota cheia (0,2): os três com os pesos. Metade (0,1): instrumentos sem os pesos ou pesos trocados. Zero (0): nenhum correto.

### ITEM 10-b
**Resposta esperada:** Nota final = 0,60 × 8,0 + 0,25 × 9,0 + 0,15 × 6,0 = 4,80 + 2,25 + 0,90 = **7,95**. **Aprovado**, porque a nota final é **≥ 7,0** e a presença de **80%** é maior que o mínimo de **75%**.
**Critérios:** Palavras-chave: conta com os pesos; 7,95; nota ≥ 7,0; presença ≥ 75%. Nota cheia (0,4): conta certa + aprovação com os dois critérios. Metade (0,2): conta certa sem citar a presença, ou erro de conta com o raciocínio certo. Zero (0): pesos errados e sem critério de aprovação.

### ITEM 10-c
**Resposta esperada:** Além da nota, **cada capacidade** (C1 a C5, S1 e S2) recebe o parecer **Desenvolvida**, **Em desenvolvimento** ou **Não desenvolvida**, e o estudante cita uma **evidência do próprio repositório**. Exemplo para C5 (desenvolver conjunto de testes automatizados): "Desenvolvida — o pull request da suíte tem 12 testes unitários, 4 de integração e 3 fluxos E2E, com o workflow verde e 72% de cobertura."
**Critérios:** Palavras-chave: parecer por capacidade com os três níveis; evidência concreta do repositório para C5. Nota cheia (0,4): explicação + evidência concreta. Metade (0,2): só uma das partes, ou evidência vaga ("fiz os testes"). Zero (0): nenhuma.
