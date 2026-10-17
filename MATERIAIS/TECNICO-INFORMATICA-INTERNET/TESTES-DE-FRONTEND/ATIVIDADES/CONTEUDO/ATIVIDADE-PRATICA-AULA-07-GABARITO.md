# Padrão de Resposta — Atividade Prática — Aula 07 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Métricas e Cobertura de Testes.
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
**Resposta esperada:** **Monitorar** é **acompanhar** o andamento dos testes comparando com o plano; **controlar** é **agir** quando o andamento foge do previsto (replanejar, priorizar, corrigir).
**Critérios:** Palavras-chave: monitorar = acompanhar/comparar com o plano; controlar = agir/replanejar. Nota cheia (0,2): as duas definições. Metade (0,1): só uma. Zero (0): trata as duas como a mesma coisa.

### ITEM 01-b
**Resposta esperada:** Três entre: **casos executados × planejados** (andamento da execução); **taxa de aprovação** (quantos testes passam); **defeitos abertos por gravidade** (risco ainda presente); **cobertura de código** (quanto do código a suíte executa); **testes instáveis (flaky)** (confiança na suíte); **tempo de execução** (custo de rodar a suíte).
**Critérios:** Palavras-chave: as métricas da tabela da aula com o que mostram. Nota cheia (0,4): três métricas com o que cada uma mostra. Metade (0,2): três métricas sem explicação, ou duas com explicação. Zero (0): uma métrica ou nenhuma.

### ITEM 01-c
**Resposta esperada:** A impressão **não é verificável** e muda de pessoa para pessoa; a métrica é um **dado objetivo** que mostra **onde** está o problema e **quanto** ele é grave (por exemplo, faltam 12 casos de checkout). Com dados, a decisão (priorizar, bloquear a entrega, corrigir) pode ser **justificada e acompanhada**.
**Critérios:** Palavras-chave: dado objetivo × impressão; mostra onde e quanto; decisão justificada. Nota cheia (0,4): explicação com o ganho da métrica. Metade (0,2): "métrica é melhor" sem dizer por quê. Zero (0): diz que a impressão basta.

### ITEM 02-a
**Resposta esperada:** Os **2 defeitos críticos abertos no pagamento**, porque mostram um **risco ainda presente** na parte que lida com o dinheiro do cliente: com eles, a versão **não pode ser publicada**.
**Critérios:** Palavras-chave: defeitos críticos no pagamento; risco presente; não publicar. Nota cheia (0,2): sinal certo + motivo. Metade (0,1): sinal certo sem motivo. Zero (0): outro sinal.

### ITEM 02-b
**Resposta esperada:** **Taxa de aprovação caiu de 98% para 80%:** bloquear a entrega e investigar o que quebrou. **2 defeitos críticos no pagamento:** não publicar até corrigir e testar de novo. **Tempo de 2 para 9 minutos:** separar os testes E2E por etapa (rodar os rápidos primeiro) e procurar testes lentos.
**Critérios:** Palavras-chave: bloquear e investigar; não publicar; separar E2E/etapas. Nota cheia (0,4): três ações coerentes. Metade (0,2): duas ações. Zero (0): uma ação ou nenhuma.

### ITEM 02-c
**Resposta esperada:** Testes flaky **passam e falham sem mudança no código**, então a equipe **deixa de confiar** no resultado da suíte e passa a ignorar falhas, inclusive as verdadeiras. Criar testes novos numa suíte em que ninguém confia **não aumenta a proteção**; primeiro é preciso **recuperar a confiança** corrigindo os instáveis.
**Critérios:** Palavras-chave: resultado sem mudança no código; perda de confiança; falhas verdadeiras ignoradas. Nota cheia (0,4): explicação completa. Metade (0,2): só define flaky. Zero (0): manda ignorar os flaky.

### ITEM 03-a
**Resposta esperada:** npm install -D @vitest/coverage-v8 e npm pkg set scripts.test:coverage="vitest run --coverage"
**Critérios:** Palavras-chave: @vitest/coverage-v8 com -D; script test:coverage com vitest run --coverage. Nota cheia (0,2): os dois comandos. Metade (0,1): só um. Zero (0): nenhum correto.

### ITEM 03-b
**Resposta esperada:** import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { environment: 'jsdom', coverage: { provider: 'v8', reporter: ['text', 'html'], include: ['src/**/*.js'] } } });
**Critérios:** Palavras-chave: defineConfig de vitest/config; test.environment jsdom; coverage.provider v8; reporter text e html; include src. Nota cheia (0,4): configuração completa. Metade (0,2): falta um item (reporter ou include) ou coverage fora de test. Zero (0): sem o bloco coverage.

### ITEM 03-c
**Resposta esperada:** Mostra a **tabela de cobertura no terminal** (relatório text) e gera a pasta **coverage/index.html** (relatório html). A tabela dá os **quatro percentuais** por arquivo para uma visão rápida; o HTML mostra **linha por linha** o que rodou e o que não rodou (vermelho, marcadores I e E), para achar os pontos cegos.
**Critérios:** Palavras-chave: tabela no terminal; coverage/index.html; visão rápida × linha por linha. Nota cheia (0,4): os dois relatórios com a utilidade de cada um. Metade (0,2): os dois sem utilidade, ou só um com utilidade. Zero (0): não cita os relatórios.

### ITEM 04-a
**Resposta esperada:** **Statements:** quantas instruções rodaram? **Branches:** cada if foi testado no lado verdadeiro e no falso? **Functions:** todas as funções foram chamadas? **Lines:** quantas linhas rodaram?
**Critérios:** Palavras-chave: instruções; verdadeiro e falso do if; funções chamadas; linhas. Nota cheia (0,2): as quatro. Metade (0,1): duas ou três. Zero (0): uma ou nenhuma.

### ITEM 04-b
**Resposta esperada:** Exemplo: function desconto(total) { if (total > 100) total = total - 10; return total; } — Um único teste com total 200 executa **todas as linhas** (100% de lines), mas só testa o lado **verdadeiro** do if; o lado **falso** (total até 100, sem desconto) **nunca foi testado**, por isso branches fica em 50%.
**Critérios:** Palavras-chave: exemplo com if; um teste passa por todas as linhas; só um lado do if testado. Nota cheia (0,4): exemplo + explicação dos dois lados. Metade (0,2): explicação sem exemplo, ou exemplo sem explicação. Zero (0): explicação errada.

### ITEM 04-c
**Resposta esperada:** **Branches** é a mais exigente porque obriga a testar **cada lado de cada condição**: mostra as **decisões que a suíte nunca testou**, mesmo quando todas as linhas rodaram. No módulo, 100% de linhas com 50% de branches indica que **metade dos caminhos das condições não foi testada**: o módulo **não está bem testado**.
**Critérios:** Palavras-chave: cada lado da condição; decisões nunca testadas; metade dos caminhos sem teste. Nota cheia (0,4): motivo + leitura do resultado. Metade (0,2): só uma das partes. Zero (0): diz que 100% de linhas basta.

### ITEM 05-a
**Resposta esperada:** Linhas em **vermelho** **não rodaram** em nenhum teste; o marcador **I** indica que o caminho do **if** não foi testado e o **E**, que o do **else** não foi testado.
**Critérios:** Palavras-chave: vermelho = não rodou; I = if; E = else. Nota cheia (0,2): os três. Metade (0,1): um ou dois. Zero (0): nenhum.

### ITEM 05-b
**Resposta esperada:** 1) **Cupom expirado** (erro "Cupom expirado"). 2) **Valor mínimo não atingido** (erro "Valor mínimo não atingido"). 3) **Cupom de valor fixo** (Math.max(total - cupom.valor, 0)).
**Critérios:** Palavras-chave: expirado; valor mínimo; valor fixo. Nota cheia (0,4): os três caminhos. Metade (0,2): dois. Zero (0): um ou nenhum.

### ITEM 05-c
**Resposta esperada:** Primeiro o **cupom de valor fixo maior que o total**, porque é o caminho de **maior risco**: sem o Math.max, a loja geraria um **pedido com valor negativo** (por exemplo, total 30 com cupom de 50 daria -20), um prejuízo real.
**Critérios:** Palavras-chave: valor fixo maior que o total; risco; valor negativo. Nota cheia (0,4): caminho certo + justificativa pelo valor negativo. Metade (0,2): caminho certo sem justificativa. Zero (0): outro caminho ou sem justificativa pelo risco.

### ITEM 06-a
**Resposta esperada:** const HOJE = new Date('2026-11-05'); const CUPOM_FIXO = { tipo: 'fixo', valor: 50, valorMinimo: 0, validade: '2026-12-31' };
**Critérios:** Palavras-chave: HOJE com data fixa (new Date com data escrita); CUPOM_FIXO com tipo fixo, valor 50, valorMinimo 0 e validade. Nota cheia (0,2): as duas constantes completas. Metade (0,1): falta um campo ou a data não é fixa. Zero (0): sem as constantes.

### ITEM 06-b
**Resposta esperada:** import { describe, it, expect } from 'vitest'; import { aplicarCupom } from '../src/servicos/carrinho.js'; describe('aplicarCupom', () => { it('nunca deixa o total negativo com cupom de valor fixo', () => { expect(aplicarCupom(30, CUPOM_FIXO, HOJE)).toBe(0); }); it('recusa cupom vencido', () => { const cupomVencido = { ...CUPOM_FIXO, validade: '2026-10-01' }; expect(() => aplicarCupom(100, cupomVencido, HOJE)).toThrow('Cupom expirado'); }); });
**Critérios:** Palavras-chave: aplicarCupom(30, CUPOM_FIXO, HOJE) com toBe(0); cupom com validade anterior a HOJE; expect com função anônima e toThrow('Cupom expirado'). Nota cheia (0,4): os dois testes corretos. Metade (0,2): só um teste correto, ou toThrow sem a função anônima. Zero (0): nenhum teste correto.

### ITEM 06-c
**Resposta esperada:** Com a **data real** (new Date() sem valor), o resultado **muda com o tempo**: o teste **passaria hoje e falharia no ano que vem**, quando a validade de 2026-12-31 já tiver passado, sem nenhuma mudança no código. Com HOJE fixa, o teste dá **sempre o mesmo resultado**.
**Critérios:** Palavras-chave: data real muda; passa hoje e falha depois; sempre o mesmo resultado. Nota cheia (0,4): explicação completa. Metade (0,2): "para não dar erro" sem dizer o motivo. Zero (0): diz que tanto faz.

### ITEM 07-a
**Resposta esperada:** **Os critérios de saída do plano foram atingidos?** — respondida com os dados dos testes, não com impressão.
**Critérios:** Palavras-chave: critérios de saída do plano; com dados. Nota cheia (0,2): pergunta certa. Metade (0,1): "ver se os testes passaram" sem citar os critérios do plano. Zero (0): resposta sem relação.

### ITEM 07-b
**Resposta esperada:** 1) **Todos os casos de alto risco** foram executados e passaram? 2) A **cobertura atingiu a meta** do plano (ex.: ≥ 70% na UC; meta da turma 80%)? 3) Há **defeito crítico aberto**? 4) A suíte está **estável** (nenhum flaky)?
**Critérios:** Palavras-chave: alto risco; meta de cobertura; defeito crítico; estabilidade/flaky. Nota cheia (0,4): as quatro perguntas. Metade (0,2): duas ou três. Zero (0): uma ou nenhuma.

### ITEM 07-c
**Resposta esperada:** **Não publicar.** Os 92% gerais escondem o **módulo de pagamento com só 31% de branches**: o número alto vem de testes simples de componentes visuais. Recomendo cobrir os desvios de **recusa do cartão** e de **pagamento duplicado** e adotar **meta por módulo** (pagamento ≥ 90%), porque o pagamento é a parte de **maior risco** da loja.
**Critérios:** Palavras-chave: não publicar; 31% de branches no pagamento; número geral engana; meta por módulo (pagamento ≥ 90% ou valor alto justificado); risco. Nota cheia (0,4): recomendação + meta por módulo + justificativa pelo risco. Metade (0,2): "não publicar" sem meta ou sem justificativa. Zero (0): recomenda publicar.

### ITEM 08-a
**Resposta esperada:** A cobertura mede o que **rodou** durante os testes; ela **não mede o que foi conferido** (se havia expect e se o expect era bom).
**Critérios:** Palavras-chave: mede o que rodou; não mede o que foi conferido. Nota cheia (0,2): as duas partes. Metade (0,1): só uma. Zero (0): diz que cobertura mede a qualidade dos testes.

### ITEM 08-b
**Resposta esperada:** it('aceita total exatamente igual ao valor mínimo', () => { const cupom = { tipo: 'fixo', valor: 10, valorMinimo: 100, validade: '2026-12-31' }; expect(aplicarCupom(100, cupom, HOJE)).toBe(90); }); — Com o defeito (<=), o teste falha com "Valor mínimo não atingido", mostrando o erro no valor-limite.
**Critérios:** Palavras-chave: total igual ao valor mínimo (100 e 100); cupom válido em relação a HOJE; expect do total com desconto (ou not.toThrow). Nota cheia (0,4): teste correto do valor-limite. Metade (0,2): valor-limite certo sem verificação correta, ou verificação certa com valores diferentes do limite. Zero (0): não testa o limite.

### ITEM 08-c
**Resposta esperada:** Porque a cobertura só olha o **código que existe**: um **requisito esquecido não tem código**, então **não aparece no relatório**, e um teste **sem expect** cobre linhas sem verificar nada. Por isso a cobertura é cruzada com a **matriz de rastreabilidade** (aula 2), que liga cada requisito aos seus casos de teste.
**Critérios:** Palavras-chave: requisito esquecido não tem código; teste sem expect; matriz de rastreabilidade. Nota cheia (0,4): motivo + matriz de rastreabilidade. Metade (0,2): só o motivo ou só a matriz. Zero (0): diz que 100% garante o requisito.

### ITEM 09-a
**Resposta esperada:** É a suíte que a equipe **entende e altera sem medo**: nomes claros, dados com nome, testes independentes e curtos e testes pelo comportamento.
**Critérios:** Palavras-chave: entende e altera sem medo. Nota cheia (0,2): definição com a ideia de entender e alterar. Metade (0,1): "suíte organizada" sem explicar. Zero (0): confunde com suíte grande.

### ITEM 09-b
**Resposta esperada:** const HOJE = new Date('2026-11-05'); const CUPOM_FIXO = { tipo: 'fixo', valor: 50, valorMinimo: 0, validade: '2026-12-31' }; it('nunca deixa o total negativo com cupom de valor fixo', () => { expect(aplicarCupom(30, CUPOM_FIXO, HOJE)).toBe(0); });
**Critérios:** Palavras-chave: nome que descreve o comportamento; constantes com nome para a data e o cupom; mesma verificação toBe(0). Nota cheia (0,4): nome + constantes + verificação. Metade (0,2): só o nome ou só as constantes. Zero (0): teste igual ao original.

### ITEM 09-c
**Resposta esperada:** Duas entre: **testar pelo comportamento** (o que o usuário vê e o que a função devolve), e não por detalhes internos; **não usar classe de estilo** como seletor (preferir papel, rótulo ou data-testid); **testes independentes e curtos, um comportamento por teste**, para que uma mudança quebre só o teste ligado a ela.
**Critérios:** Palavras-chave: testar pelo comportamento; sem seletor por classe de CSS; um comportamento por teste. Nota cheia (0,4): duas práticas explicadas. Metade (0,2): uma prática. Zero (0): nenhuma prática certa.

### ITEM 10-a
**Resposta esperada:** A opção **thresholds**, dentro de **coverage**.
**Critérios:** Palavras-chave: thresholds. Nota cheia (0,2): thresholds. Metade (0,1): descreve a ideia sem o nome da opção. Zero (0): outra opção.

### ITEM 10-b
**Resposta esperada:** coverage: { provider: 'v8', thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 } }
**Critérios:** Palavras-chave: provider v8; thresholds com statements, branches, functions e lines em 80. Nota cheia (0,4): bloco completo. Metade (0,2): faltam métricas ou thresholds fora de coverage. Zero (0): sem thresholds.

### ITEM 10-c
**Resposta esperada:** O comando **termina com erro** quando alguma métrica fica abaixo da meta. No pipeline (GitHub Actions, aula 9), esse erro **deixa a verificação vermelha e bloqueia o merge**, então a cobertura **não cai sem que a equipe perceba** e nenhum código com menos testes chega à loja.
**Critérios:** Palavras-chave: termina com erro; pipeline bloqueia o merge; a queda não passa despercebida. Nota cheia (0,4): as duas partes. Metade (0,2): só o erro ou só o bloqueio. Zero (0): diz que só mostra um aviso.
