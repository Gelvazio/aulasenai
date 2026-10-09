# Padrão de Resposta — Atividade Prática — Aula 01 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: não publicar nem versionar. O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa na situação **e** a justificativa,
   quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do
   tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** outros exemplos de tela, desde que corretos; sinônimos dos
   termos (bug = defeito; engano = erro; E2E = ponta a ponta; unitário = de unidade); ordem
   diferente das partes da resposta.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** Testar é **produzir evidência** de que o software **atende aos requisitos**, encontrando os problemas **antes que o usuário** os encontre.
**Critérios:** Palavras-chave: evidência; atende aos requisitos; antes do usuário/cliente. Nota cheia (0,2): objetivo com a ideia de evidência/requisitos e antes do usuário. Metade (0,1): só "encontrar bugs" sem ligar aos requisitos ou ao usuário. Zero (0): "provar que não tem defeitos" ou "deixar a tela bonita".

### ITEM 01-b
**Resposta esperada:** A frase está **errada**. Testar **não prova a ausência de defeitos**: mostra que os **defeitos procurados não estão lá**. Testes aprovados indicam que os cenários testados funcionam, mas podem existir defeitos em cenários que não foram testados.
**Critérios:** Palavras-chave: errada/falsa; não prova ausência de defeitos; só os defeitos procurados; cenários não testados. Nota cheia (0,4): diz que está errada e justifica com o que o teste prova e não prova. Metade (0,2): diz que está errada com justificativa vaga ("sempre pode ter bug") sem explicar o limite do teste. Zero (0): concorda com o líder.

### ITEM 01-c
**Resposta esperada:** O que testar é escolhido **pelos requisitos e pelos riscos** (impacto e chance de dar problema). Exemplo: testar primeiro o **checkout/pagamento** (ou carrinho, login), porque uma falha ali faz a loja **perder vendas** e afeta todos os clientes.
**Critérios:** Palavras-chave: requisitos; riscos/impacto; exemplo crítico (checkout, pagamento, carrinho, login); justificativa pelo prejuízo. Nota cheia (0,4): critério (requisitos e riscos) + exemplo crítico justificado. Metade (0,2): só o critério ou só o exemplo justificado. Zero (0): critério sem sentido ("o mais fácil", "o mais bonito") sem exemplo coerente.

### ITEM 02-a
**Resposta esperada:** **Erro:** a pessoa programadora entendeu que o CEP tem 9 dígitos (engano humano). **Defeito:** a validação no código aceita só 9 dígitos. **Falha:** o cliente digita um CEP válido de 8 dígitos e vê "CEP inválido".
**Critérios:** Palavras-chave: erro = engano/entendimento; defeito = validação/código; falha = mensagem vista pelo cliente. Nota cheia (0,2): os três corretos. Metade (0,1): dois corretos. Zero (0): um ou nenhum correto.

### ITEM 02-b
**Resposta esperada:** O **erro gera o defeito**, e o **defeito, quando executado, provoca a falha**. Nem todo defeito vira falha porque o trecho com defeito **pode nunca ser executado** (ou a condição que o dispara não acontece); mesmo assim ele é um **risco**.
**Critérios:** Palavras-chave: erro → defeito → falha; executado; trecho que não roda; risco. Nota cheia (0,4): a cadeia na ordem certa e o motivo de nem todo defeito virar falha. Metade (0,2): só a cadeia ou só o motivo. Zero (0): ordem invertida (falha gera erro).

### ITEM 02-c
**Resposta esperada:** Teste: digitar um **CEP válido de 8 dígitos** (ex.: 89160-000 / 89160000) no cadastro. **Resultado esperado:** o CEP é aceito. **Resultado obtido** (com o defeito): mensagem "CEP inválido". Pode citar também um caso inválido (7 dígitos → deve recusar).
**Critérios:** Palavras-chave: CEP de 8 dígitos; resultado esperado aceito; resultado obtido "CEP inválido". Nota cheia (0,4): dado de 8 dígitos + esperado + obtido. Metade (0,2): falta o esperado ou o obtido, ou usa dado que não revela o defeito. Zero (0): sem dado de teste ou teste sem relação com o CEP.

### ITEM 03-a
**Resposta esperada:** **Erro:** alguém achou que a API devolvia o preço como número. **Defeito:** a função de formatação faz contas com o texto ("R$ 59,90") sem converter. **Falha:** a vitrine mostra "NaN" no lugar do preço.
**Critérios:** Palavras-chave: suposição errada sobre a API; função faz conta com texto; "NaN" na vitrine. Nota cheia (0,2): os três corretos. Metade (0,1): dois corretos. Zero (0): um ou nenhum.

### ITEM 03-b
**Resposta esperada:** Tipo: **funcionalidade (4.1)** — o preço deve ser exibido corretamente, como o requisito pede. Camada: **teste unitário** da função de formatação, passando um preço em texto e um em número e conferindo o resultado; é rápido e isola a função. (Aceitar integração se justificar com o dado vindo da API simulada.)
**Critérios:** Palavras-chave: funcionalidade; unitário (ou integração com API simulada); função de formatação; entrada e resultado. Nota cheia (0,4): tipo + camada coerentes + justificativa. Metade (0,2): tipo e camada sem justificativa, ou um deles errado com justificativa coerente. Zero (0): desempenho/manutenibilidade e E2E sem justificativa coerente.

### ITEM 03-c
**Resposta esperada:** Todo defeito é um **risco**: mesmo aparecendo só em alguns produtos, ele já causa **falha** para clientes (preço ilegível, perda de **vendas** e de **confiança**) e pode se espalhar para outros produtos quando a API mudar. Quanto mais tarde for corrigido, **mais caro** fica.
**Critérios:** Palavras-chave: risco; falha para o cliente; vendas/confiança; pode aumentar; custo maior depois. Nota cheia (0,4): risco + impacto no cliente/negócio + justificativa. Metade (0,2): só "é um risco" ou só o impacto. Zero (0): diz que pode ser ignorado.

### ITEM 04-a
**Resposta esperada:** A **Regra de 10 de Myers** diz que o **custo de corrigir um defeito cresce cerca de 10 vezes a cada fase** em que ele avança (requisito → código → teste → produção).
**Critérios:** Palavras-chave: custo; 10 vezes; a cada fase. Nota cheia (0,2): custo cresce ~10× por fase. Metade (0,1): "quanto mais tarde, mais caro" sem a ideia de 10× por fase. Zero (0): "10 testes por sistema" ou outro sentido.

### ITEM 04-b
**Resposta esperada:** Agora, no requisito, custa **minutos de conversa**. Em produção custa muito mais: **vendas perdidas** (desconto errado ou não aplicado), **suporte** a reclamações, **correção urgente**, **nova publicação**, retrabalho de testes e prejuízo à imagem da loja.
**Critérios:** Palavras-chave: barato agora (conversa); produção: vendas, suporte, correção urgente, nova publicação, imagem. Nota cheia (0,4): comparação + pelo menos dois prejuízos de produção. Metade (0,2): comparação com só um prejuízo, ou prejuízos sem comparar com o custo agora. Zero (0): defende deixar para depois.

### ITEM 04-c
**Resposta esperada:** Exemplo: "**Compras com subtotal a partir de R$ 200,00 recebem 10% de desconto**, calculado antes do frete; abaixo de R$ 200,00 não há desconto". A escrita com **valor e regra claros** é **verificável**: dá para escrever o teste (R$ 199,99 sem desconto; R$ 200,00 com 10%) e todos entendem o mesmo, evitando o erro de interpretação que gera o defeito.
**Critérios:** Palavras-chave: valor mínimo; percentual/regra; verificável; dá para testar; evita interpretação diferente. Nota cheia (0,4): requisito com valor e regra + explicação do porquê reduz o risco. Metade (0,2): requisito melhorado sem explicação, ou explicação com requisito ainda vago. Zero (0): requisito continua ambíguo.

### ITEM 05-a
**Resposta esperada:** Verificação: "**Estamos construindo o produto certo conforme a especificação?**" Validação: "**É o produto que o usuário precisa?**"
**Critérios:** Palavras-chave: conforme a especificação/requisito; necessidade do usuário. Nota cheia (0,2): as duas perguntas corretas. Metade (0,1): uma correta. Zero (0): trocadas ou ausentes.

### ITEM 05-b
**Resposta esperada:** **Verificação:** conferir que o campo recusa senhas com menos de 8 caracteres → **passou** (atende ao requisito). **Validação:** a sessão com usuários reais em que 4 de 10 desistiram → **falhou**, porque a tela não atende à necessidade do usuário (ele não sabe a regra).
**Critérios:** Palavras-chave: verificação passou (requisito de 8 caracteres); validação falhou (usuários desistiram). Nota cheia (0,4): identifica as duas partes e o resultado de cada com justificativa. Metade (0,2): identifica as partes sem o resultado, ou acerta uma só. Zero (0): inverte verificação e validação.

### ITEM 05-c
**Resposta esperada:** A **verificação** acontece **durante todo o desenvolvimento** (comparando com requisitos e protótipo); a **validação**, com o **produto ou protótipo em uso** pelo usuário. Mudança: mostrar a **regra da senha** ao lado do campo ("mínimo de 8 caracteres") e uma **mensagem clara** quando a senha não atende (ou um indicador de força).
**Critérios:** Palavras-chave: verificação durante o desenvolvimento; validação com usuário/em uso; mostrar a regra/mensagem clara. Nota cheia (0,4): quando de cada uma + mudança coerente. Metade (0,2): só o quando ou só a mudança. Zero (0): mudança que não ajuda o usuário (ex.: aumentar para 12 caracteres sem informar).

### ITEM 06-a
**Resposta esperada:** **Passa na verificação** (bloqueia após 3 tentativas, como o requisito pede) e **falha na validação** (o usuário não entende o que aconteceu e desiste).
**Critérios:** Palavras-chave: passa na verificação; falha na validação. Nota cheia (0,2): as duas certas. Metade (0,1): uma certa. Zero (0): as duas erradas.

### ITEM 06-b
**Resposta esperada:** Bloqueio após 3 tentativas = **funcionalidade (4.1)**; mensagem clara = **usabilidade (4.2)**; desbloqueio funcionar mesmo com demora do e-mail = **confiabilidade (4.3)**.
**Critérios:** Palavras-chave: funcionalidade; usabilidade; confiabilidade. Nota cheia (0,4): os três corretos. Metade (0,2): dois corretos. Zero (0): um ou nenhum.

### ITEM 06-c
**Resposta esperada:** Exemplo: "**Acesso bloqueado por 15 minutos. Use 'Esqueci minha senha' para entrar agora.**" Resolve a validação porque **explica ao usuário o que aconteceu, por quanto tempo e o que fazer**, evitando que ele ache que o site travou e desista.
**Critérios:** Palavras-chave: mensagem com o motivo (bloqueio), tempo ou caminho (esqueci minha senha); explica e orienta o usuário. Nota cheia (0,4): mensagem clara + justificativa ligada ao usuário/validação. Metade (0,2): mensagem vaga ("Erro") com justificativa, ou boa mensagem sem justificativa. Zero (0): sem mensagem ou mensagem que não orienta.

### ITEM 07-a
**Resposta esperada:** (1) cupom errado = **funcionalidade**; (2) 6 s no 4G = **desempenho**; (3) data sem teclado = **usabilidade**; (4) carrinho apagado quando a API cai = **confiabilidade**; (5) teste quebra com classe CSS = **manutenibilidade**.
**Critérios:** Palavras-chave: as 5 classificações. Nota cheia (0,2): 5 ou 4 corretas. Metade (0,1): 2 ou 3 corretas. Zero (0): 0 ou 1 correta.

### ITEM 07-b
**Resposta esperada:** Funcionalidade: **faz o que o requisito pede?** Usabilidade: **o usuário consegue usar com facilidade?** Confiabilidade: **continua funcionando quando algo dá errado?** Desempenho: **responde no tempo esperado?** Manutenibilidade: **é fácil de alterar sem quebrar?**
**Critérios:** Palavras-chave: as 5 perguntas. Nota cheia (0,4): 5 ou 4 corretas. Metade (0,2): 2 ou 3 corretas. Zero (0): 0 ou 1.

### ITEM 07-c
**Resposta esperada:** Exemplos: (1) aplicar o cupom de 10% num carrinho de R$ 100,00 → **total esperado R$ 90,00**; (2) abrir a página do produto simulando 4G → **carrega em até 2,5 s**; (3) digitar a data pelo teclado → **campo aceita** e mostra a data; (4) simular a API de frete fora do ar → **aviso na tela e carrinho mantido**; (5) mudar a classe CSS → **teste continua passando** (seleciona pelo texto/papel do elemento).
**Critérios:** Palavras-chave: ação na tela + resultado esperado mensurável, para 2 relatos. Nota cheia (0,4): dois testes com ação e resultado esperado. Metade (0,2): um teste completo, ou dois sem resultado esperado claro. Zero (0): nenhum teste coerente.

### ITEM 08-a
**Resposta esperada:** **Base:** muitos **testes unitários**, rápidos, de funções isoladas. **Meio:** **testes de integração** de componentes com DOM, eventos e API simulada. **Topo:** poucos **testes E2E** dos fluxos críticos no navegador real.
**Critérios:** Palavras-chave: base unitário (muitos); meio integração; topo E2E (poucos). Nota cheia (0,2): as três camadas na ordem certa. Metade (0,1): camadas certas sem a ideia de quantidade, ou duas certas. Zero (0): ordem invertida.

### ITEM 08-b
**Resposta esperada:** O **cone de sorvete** é a pirâmide **invertida**: **muitos E2E e poucos unitários**, como na suíte da equipe. Fica **lenta** porque cada E2E abre o navegador e percorre o fluxo inteiro, e **instável** porque depende de rede, tempo de carregamento e muitas partes ao mesmo tempo (falha "às vezes").
**Critérios:** Palavras-chave: invertida; muitos E2E/poucos unitários; lento; instável (dependências, rede, tempo). Nota cheia (0,4): definição + por que lenta e instável. Metade (0,2): só a definição ou só a explicação. Zero (0): descreve a pirâmide correta como problema.

### ITEM 08-c
**Resposta esperada:** `calcularDesconto()` = **unitário**; máscara de CPF = **unitário** (função) ou **integração** (campo com evento de digitação); formulário para API simulada = **integração**; compra completa = **E2E**. Justificativa exemplo: a compra completa é E2E porque percorre várias telas no navegador real como o usuário.
**Critérios:** Palavras-chave: unitário; integração; E2E; uma justificativa. Nota cheia (0,4): as quatro classificações aceitáveis + uma justificativa. Metade (0,2): três corretas, ou quatro sem justificativa. Zero (0): duas ou menos corretas.

### ITEM 09-a
**Resposta esperada:** No app de crédito a camada mais forte deve ser a **base de testes unitários**, porque **juros, regras fiscais e simulações são regras matemáticas** que precisam ser testadas com muitos valores, de forma rápida e isolada.
**Critérios:** Palavras-chave: unitários; regras matemáticas/cálculos; muitos casos; rápido. Nota cheia (0,2): unitário + motivo. Metade (0,1): unitário sem motivo. Zero (0): E2E ou integração como camada principal.

### ITEM 09-b
**Resposta esperada:** Exemplos — **Unitários:** validar e-mail; calcular a duração total da playlist; formatar o tempo da música (3:05). **Integração:** a busca consulta a API de músicas (simulada) e mostra a lista; adicionar música atualiza a playlist na tela. **E2E:** buscar música → adicionar à playlist → reproduzir.
**Critérios:** Palavras-chave: 3 unitários (funções), 2 integração (componente + API/estado), 1 jornada E2E. Nota cheia (0,4): as 6 propostas coerentes com a camada. Metade (0,2): 3 a 5 coerentes, ou camadas misturadas. Zero (0): 2 ou menos coerentes.

### ITEM 09-c
**Resposta esperada:** Subindo na pirâmide, o teste envolve **mais partes** (navegador, rede, várias telas), por isso é **mais lento, mais caro** de escrever e manter e mais instável. Mesmo assim, alguns **E2E são necessários** porque são os únicos que testam o **fluxo completo como o usuário usa**, garantindo que as partes funcionam juntas nos **fluxos críticos**.
**Critérios:** Palavras-chave: mais partes/dependências; lento e caro; fluxo completo; experiência do usuário; fluxos críticos. Nota cheia (0,4): por que é lento/caro + por que ainda é preciso ter E2E. Metade (0,2): só uma das duas partes. Zero (0): diz que E2E é mais rápido ou desnecessário.

### ITEM 10-a
**Resposta esperada:** Quem desenvolve é **responsável pela qualidade** do que entrega: **não marcar tarefa como pronta sem teste**, **relatar defeitos, inclusive os que causou**, e registrar falhas com dados para reproduzir.
**Critérios:** Palavras-chave: responsável pela qualidade; não entregar sem teste; relatar os próprios defeitos. Nota cheia (0,2): conceito com pelo menos duas atitudes. Metade (0,1): uma atitude. Zero (0): passa a responsabilidade só para a equipe de testes.

### ITEM 10-b
**Resposta esperada:** **Passos:** abrir a loja, colocar um produto no carrinho, ir ao checkout, aplicar um cupom válido e clicar em "Finalizar compra". **Dado usado:** cupom (ex.: DESCONTO10) e produto (ex.: R$ 150,00). **Resultado obtido:** o botão não responde. **Resultado esperado:** o pedido é finalizado com o desconto aplicado e aparece a confirmação.
**Critérios:** Palavras-chave: passos; dado usado (cupom); resultado obtido; resultado esperado. Nota cheia (0,4): os quatro dados. Metade (0,2): dois ou três dados. Zero (0): só "o checkout não funciona".

### ITEM 10-c
**Resposta esperada:** Não se deve esconder porque o defeito **vai virar falha para os clientes** que usam cupom (**vendas perdidas**, reclamações) e, pela **Regra de 10 de Myers**, **fica mais caro** a cada fase que passa; corrigir agora custa pouco. Assumir o erro é **responsabilidade** e protege o cliente e a equipe.
**Critérios:** Palavras-chave: falha para o cliente/vendas; custo cresce (Myers); responsabilidade/honestidade. Nota cheia (0,4): recusa esconder + custo + risco para os clientes. Metade (0,2): recusa com só um dos argumentos. Zero (0): concorda em esconder.
