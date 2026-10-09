# Padrão de Resposta — Atividade Prática — Aula 02 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

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
4. **Equivalências sempre aceitas:** IDs, valores de exemplo, nomes de usuários e produtos de teste
   diferentes, desde que coerentes; ferramentas equivalentes (Jest no lugar de Vitest, Playwright no
   lugar de Cypress); ordem diferente das partes da resposta; tabela ou lista.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** Um requisito testável tem **dado de entrada, condição e resultado verificável** (mensurável), de modo que qualquer pessoa consiga dizer se o sistema atende ou não.
**Critérios:** Palavras-chave: entrada; condição; resultado verificável/mensurável. Nota cheia (0,2): os três elementos ou a ideia de resultado objetivo verificável. Metade (0,1): só "tem que ser claro" sem a ideia de resultado verificável. Zero (0): "tem que ser curto/bonito".

### ITEM 01-b
**Resposta esperada:** Vagos: **R1** ("rápido") e **R2** ("segura"). R3 é testável. Perguntas: R1 — "**Rápido quanto? Em que rede/dispositivo?**"; R2 — "**Quais são as regras da senha (tamanho, números, maiúsculas)?**"
**Critérios:** Palavras-chave: R1 e R2 vagos; R3 testável; pergunta sobre tempo/rede; pergunta sobre regras. Nota cheia (0,4): identifica R1 e R2 e faz as duas perguntas pertinentes. Metade (0,2): identifica os vagos sem perguntas, ou só um vago com pergunta. Zero (0): classifica R3 como vago e R1/R2 como testáveis.

### ITEM 01-c
**Resposta esperada:** R1: "**O login responde em até 2 s em 4G**". R2: "**Senha com 8 a 64 caracteres, com pelo menos 1 número e 1 letra maiúscula**". Com número e regra, dá para **montar o teste e comparar o resultado obtido com o esperado** (passou/falhou), sem depender de opinião.
**Critérios:** Palavras-chave: tempo em segundos e rede; tamanho e regras da senha; comparar obtido × esperado/objetivo. Nota cheia (0,4): as duas reescritas com números + explicação. Metade (0,2): uma reescrita boa, ou duas sem explicação. Zero (0): reescritas continuam vagas ("bem rápido", "bem segura").

### ITEM 02-a
**Resposta esperada:** **RF-10:** alterar a quantidade de cada item (de 1 a 10). **RF-11:** subtotal = preço × quantidade de cada item (soma dos itens). **RF-12:** frete grátis se o subtotal for ≥ R$ 199,00.
**Critérios:** Palavras-chave: alterar quantidade; subtotal = preço × quantidade; frete grátis com valor. Nota cheia (0,2): os três requisitos com ID e regra. Metade (0,1): dois corretos ou três sem regra verificável. Zero (0): copia a especificação sem transformar.

### ITEM 02-b
**Resposta esperada:** Lacuna: **não diz o limite (mínimo e máximo) da quantidade** (pode 0? pode 999? estoque?) e não diz se o frete grátis inclui R$ 199,00. Risco: cada pessoa **interpreta de um jeito**, o código sai com um comportamento e o teste espera outro; o defeito só aparece depois e **custa mais caro** corrigir (Myers).
**Critérios:** Palavras-chave: limite de quantidade ausente (ou ambiguidade do 199); interpretação diferente; defeito/retrabalho; custo maior depois. Nota cheia (0,4): lacuna + risco explicado. Metade (0,2): só a lacuna ou só o risco. Zero (0): diz que não há lacuna.

### ITEM 02-c
**Resposta esperada:** "Acima de R$ 199,00" **não deixa claro** se R$ 199,00 exato tem frete grátis: com "acima" (>) R$ 199,00 **paga** frete; com "a partir de" (≥) **não paga**. O teste do limite R$ 199,00 teria resultados esperados diferentes. Escrita final: "**Frete grátis quando o subtotal for maior ou igual a R$ 199,00**".
**Critérios:** Palavras-chave: > × ≥; R$ 199,00 exato; resultado esperado muda; escrita final com "maior ou igual"/"a partir de". Nota cheia (0,4): explica a ambiguidade, o impacto no teste e propõe a escrita. Metade (0,2): propõe a escrita sem explicar o impacto, ou explica sem propor. Zero (0): sem relação com o limite.

### ITEM 03-a
**Resposta esperada:** 1) **Planejamento** (7.1); 2) **Desenho dos testes** (7.2); 3) **Execução** (7.3); 4) **Monitoração e controle** (7.4); 5) **Avaliação dos resultados** (7.5).
**Critérios:** Palavras-chave: as 5 atividades na ordem. Nota cheia (0,2): as 5 na ordem. Metade (0,1): as 5 fora de ordem ou 3–4 na ordem. Zero (0): 2 ou menos.

### ITEM 03-b
**Resposta esperada:** **Planejamento:** define objetivo, escopo, estratégia, recursos, cronograma e riscos — ex.: "testar o checkout com unitários do cálculo do total e 1 E2E da compra, até a aula 6". **Desenho:** transforma requisitos em condições e casos de teste — ex.: "CT-CHK-01: com cupom válido, finalizar a compra mostra a confirmação com o total com desconto".
**Critérios:** Palavras-chave: planejamento = escopo/estratégia/riscos/cronograma; desenho = requisitos → casos; exemplos do checkout. Nota cheia (0,4): as duas definições com exemplos. Metade (0,2): definições sem exemplos ou um só lado completo. Zero (0): troca planejamento e desenho.

### ITEM 03-c
**Resposta esperada:** Sem planejamento e desenho, a equipe **testa o que é mais fácil e não o que tem mais risco**, deixa **requisitos sem teste**, **repete esforço**, não sabe **quando parar** nem tem **critério de pronto**; os defeitos de áreas críticas (pagamento) escapam e o custo sobe.
**Critérios:** Palavras-chave: sem prioridade por risco; requisitos sem teste/lacunas; retrabalho; sem critério/cronograma; defeitos em produção. Nota cheia (0,4): explicação + duas consequências. Metade (0,2): uma consequência. Zero (0): diz que é melhor começar pela execução.

### ITEM 04-a
**Resposta esperada:** **Escopo:** autenticação (login, cadastro, bloqueio), carrinho (quantidade, subtotal, frete) e checkout (cupom, pagamento simulado, confirmação). **Fora do escopo:** integração real com a operadora de cartão, **porque depende de serviço externo** que a equipe não controla (será simulada nos testes).
**Critérios:** Palavras-chave: as três funcionalidades no escopo; operadora de cartão fora; justificativa (serviço externo). Nota cheia (0,2): escopo + fora do escopo justificado. Metade (0,1): falta a justificativa ou parte do escopo. Zero (0): põe login ou checkout fora do escopo sem justificativa.

### ITEM 04-b
**Resposta esperada:** **Estratégia:** base forte de **unitários** (ex.: 70%), **integração** (ex.: 20%) e poucos **E2E** (ex.: 10%); ferramentas **Vitest** (unitários), **Testing Library** (integração) e **Cypress/Playwright** (E2E). **Ambientes e massa:** Chrome, Firefox e um navegador móvel; usuários de teste (ex.: teste@loja.local ativo e um bloqueado); produtos cadastrados com preços para os limites (ex.: R$ 99,50 e R$ 199,00); cupom de teste.
**Critérios:** Palavras-chave: proporção em pirâmide; ferramentas por camada; navegadores; usuários de teste; produtos de teste. Nota cheia (0,4): estratégia com proporção e ferramentas + ambientes e massa. Metade (0,2): só uma das duas partes completa. Zero (0): pirâmide invertida sem justificativa e sem ambientes.

### ITEM 04-c
**Resposta esperada:** **Métricas:** cobertura esperada (ex.: ≥ 70%), defeitos encontrados por funcionalidade, testes instáveis. **Cronograma:** aula 3 unitários, aulas 4–5 integração, aula 6 E2E, aula 7 cobertura, aula 8 TDD, aula 9 qualidade e CI, aula 10 suíte final. As métricas servem para **acompanhar o andamento e decidir** (ver se a qualidade está melhorando e onde reforçar).
**Critérios:** Palavras-chave: cobertura; defeitos; instáveis; cronograma ligado às aulas; acompanhar/decidir. Nota cheia (0,4): métricas + cronograma + para que servem. Metade (0,2): duas das três partes. Zero (0): sem métricas nem cronograma coerentes.

### ITEM 05-a
**Resposta esperada:** **Risco = probabilidade × impacto.**
**Critérios:** Palavras-chave: probabilidade; impacto; multiplicação/combinação. Nota cheia (0,2): fórmula correta. Metade (0,1): cita só um dos fatores. Zero (0): outra fórmula.

### ITEM 05-b
**Resposta esperada:** Exemplos: (1) **cálculo errado do total** — probabilidade média, impacto alto — mitigação: unitários da função de cálculo + 1 E2E do checkout; (2) **login bloqueia usuário válido** — probabilidade baixa, impacto alto — mitigação: casos de borda do bloqueio e integração do formulário; (3) **API de frete fora do ar** — probabilidade média, impacto médio — mitigação: teste com API simulada mostrando aviso sem perder o carrinho.
**Critérios:** Palavras-chave: 3 riscos; probabilidade; impacto; mitigação. Nota cheia (0,4): 3 riscos com os três campos. Metade (0,2): 2 riscos completos ou 3 sem algum campo. Zero (0): 1 risco ou nenhum coerente.

### ITEM 05-c
**Resposta esperada:** O pagamento e o login têm **impacto alto** (cobrança errada, cliente sem acesso, vendas perdidas) e **probabilidade relevante** (muitas regras e integrações), então o **risco é alto** e recebem **mais casos e mais camadas** (unitário, integração e E2E). A página "Quem somos" tem impacto e probabilidade baixos, logo risco baixo e poucos testes. A escolha é **justificada pelo risco**, não por preferência.
**Critérios:** Palavras-chave: impacto alto; probabilidade; risco alto × baixo; mais casos/camadas; justificativa técnica. Nota cheia (0,4): compara as duas partes pelo risco com consequência no plano. Metade (0,2): fala só de "importância" sem probabilidade/impacto. Zero (0): justificativa sem relação com risco.

### ITEM 06-a
**Resposta esperada:** O testador dos **CEPs (7, 8 e 9 dígitos)** fez **caixa preta**; o que testou os **dois lados do `if`** fez **caixa branca**.
**Critérios:** Palavras-chave: CEP = caixa preta; if = caixa branca. Nota cheia (0,2): as duas corretas. Metade (0,1): uma correta. Zero (0): invertidas.

### ITEM 06-b
**Resposta esperada:** **Caixa preta (3.1):** olha **entradas e saídas sem ver o código**; base: **requisitos e especificação**; técnicas: **partição de equivalência, valores-limite, tabela de decisão**. **Caixa branca (3.2):** olha os **caminhos internos do código**; base: **condições, laços e desvios**; técnicas: **cobertura de instruções e de desvios**.
**Critérios:** Palavras-chave: sem ver o código × caminhos internos; requisitos × código; técnicas de cada uma. Nota cheia (0,4): os três aspectos das duas. Metade (0,2): dois aspectos ou uma técnica completa só. Zero (0): conceitos trocados.

### ITEM 06-c
**Resposta esperada:** Lado verdadeiro: subtotal **R$ 199,00** (ou mais) → **frete = 0**. Lado falso: subtotal **R$ 198,99** (ou menos) → **frete = R$ 19,90**. **Cobertura de desvios** é garantir que **cada desvio (lado verdadeiro e lado falso de cada decisão)** foi executado pelo menos uma vez pelos testes.
**Critérios:** Palavras-chave: subtotal ≥ 199 → 0; subtotal < 199 → 19,90; cada lado do if executado. Nota cheia (0,4): os dois testes + definição. Metade (0,2): os dois testes sem definição, ou definição com um teste. Zero (0): testes que não exercitam os dois lados.

### ITEM 07-a
**Resposta esperada:** **Partição de equivalência:** dividir as entradas em **grupos que o sistema trata igual** e testar **um valor de cada grupo**. **Valores-limite:** testar as **bordas** de cada partição (o último valor de um grupo e o primeiro do outro).
**Critérios:** Palavras-chave: grupos tratados igual; um valor por grupo; bordas. Nota cheia (0,2): os dois conceitos. Metade (0,1): um conceito. Zero (0): nenhum correto.

### ITEM 07-b
**Resposta esperada:** **Curta (< 8):** ex. 5 caracteres → **recusada**. **Válida (8 a 64):** ex. 20 caracteres → **aceita**. **Longa (> 64):** ex. 80 caracteres → **recusada**.
**Critérios:** Palavras-chave: três partições; exemplo de cada; aceita/recusada. Nota cheia (0,4): as três com exemplo e resultado. Metade (0,2): três sem resultado, ou duas completas. Zero (0): partições sem relação com o tamanho.

### ITEM 07-c
**Resposta esperada:** **7 → recusada; 8 → aceita; 64 → aceita; 65 → recusada.** Os defeitos aparecem nas bordas porque é ali que o programador **escolhe o operador** (`<` ou `<=`, `>` ou `>=`) e erra por um ("off by one").
**Critérios:** Palavras-chave: 7, 8, 64, 65 com resultados; operador de comparação/erro por um. Nota cheia (0,4): os quatro valores com resultado + explicação. Metade (0,2): valores sem explicação, ou explicação com valores incompletos. Zero (0): valores do meio (ex.: 30).

### ITEM 08-a
**Resposta esperada:** **R$ 198,99 → paga frete; R$ 199,00 → frete grátis; R$ 199,01 → frete grátis.**
**Critérios:** Palavras-chave: 198,99 paga; 199,00 grátis; 199,01 grátis. Nota cheia (0,2): os três com resultado. Metade (0,1): dois corretos. Zero (0): um ou nenhum.

### ITEM 08-b
**Resposta esperada:** Partições: **menor de 16 (recusa)**, **16 a 60 (aceita)**, **maior de 60 (recusa)**. Limites: **15 → recusa; 16 → aceita; 60 → aceita; 61 → recusa.**
**Critérios:** Palavras-chave: três partições; 15, 16, 60, 61 com resultados. Nota cheia (0,4): partições + quatro limites com resultado. Metade (0,2): só partições ou só limites. Zero (0): valores sem relação com a regra.

### ITEM 08-c
**Resposta esperada:** R$ 50,00 e R$ 500,00 estão **longe da borda**: passam mesmo se o código usar `>` em vez de `>=`. O defeito "**R$ 199,00 exato cobra frete**" (erro de operador) **passaria despercebido**; só o teste no limite o encontra.
**Critérios:** Palavras-chave: longe da borda; operador > × >=; R$ 199,00 cobrando frete. Nota cheia (0,4): explicação + defeito concreto. Metade (0,2): só "faltou testar o limite" sem o defeito. Zero (0): diz que os dois valores bastam.

### ITEM 09-a
**Resposta esperada:** Faltam **requisito ligado, pré-condição, passos, dados e resultado esperado** (só tem o ID e um título vago); sem isso outra pessoa não sabe o que fazer nem se passou.
**Critérios:** Palavras-chave: pré-condição; passos; dados; resultado esperado. Nota cheia (0,2): pelo menos três dos campos faltantes, incluindo resultado esperado. Metade (0,1): um ou dois. Zero (0): diz que está completo.

### ITEM 09-b
**Resposta esperada:** **ID:** CT-LOGIN-03 · **Requisito:** RF-02 bloquear após 3 senhas erradas · **Pré-condição:** usuário teste@loja.local cadastrado e desbloqueado · **Passos:** 1. abrir /login; 2. informar o e-mail; 3. errar a senha 3 vezes · **Dados:** senha "errada123" · **Resultado esperado:** mensagem "Acesso bloqueado por 15 minutos" e botão Entrar desabilitado · **Tipo/camada:** funcionalidade (4.1) · E2E.
**Critérios:** Palavras-chave: os 7 campos. Nota cheia (0,4): 6 ou 7 campos coerentes, com resultado esperado objetivo. Metade (0,2): 4 ou 5 campos, ou resultado esperado vago. Zero (0): 3 ou menos.

### ITEM 09-c
**Resposta esperada:** **Dado** que o usuário teste@loja.local está cadastrado e desbloqueado, **Quando** ele erra a senha 3 vezes na tela de login, **Então** vê "Acesso bloqueado por 15 minutos" e o botão Entrar fica desabilitado. Vantagem: linguagem que **toda a equipe entende** (desenvolvimento, testes e negócio), ligando o caso diretamente ao comportamento esperado.
**Critérios:** Palavras-chave: Dado = pré-condição; Quando = ação; Então = resultado; equipe toda entende. Nota cheia (0,4): BDD correto + vantagem. Metade (0,2): BDD sem vantagem, ou com uma parte trocada. Zero (0): não usa o formato.

### ITEM 10-a
**Resposta esperada:** **Suíte** é o **conjunto organizado de casos de teste**. Organização: por **funcionalidade** (Autenticação: CT-LOGIN-*; Carrinho: CT-CAR-*; Checkout: CT-CHK-*) ou por **camada** (unitário, integração, E2E).
**Critérios:** Palavras-chave: conjunto organizado; por funcionalidade ou camada. Nota cheia (0,2): definição + organização. Metade (0,1): só a definição. Zero (0): suíte = um caso único.

### ITEM 10-b
**Resposta esperada:** Matriz: **RF-01 → CT-LOGIN-01/02**; **RF-02 → CT-LOGIN-03**; **RF-10 → CT-CAR-01**; **RF-11 → CT-CAR-02**; **RF-12 → (nenhum caso)**; **RF-20 → CT-CHK-01**. (Aceitar outra distribuição dos CT-LOGIN entre RF-01 e RF-02 se coerente.)
**Critérios:** Palavras-chave: uma linha por requisito; casos ligados; RF-12 vazio. Nota cheia (0,4): todos os requisitos com seus casos e RF-12 sem caso. Metade (0,2): matriz incompleta ou sem o RF-12. Zero (0): sem matriz.

### ITEM 10-c
**Resposta esperada:** RF-12 sem caso é um **requisito sem evidência** de que foi verificado (lacuna de cobertura). Caso: **CT-CAR-03** — dados: subtotais **R$ 198,99, R$ 199,00 e R$ 199,01** — resultado esperado: **paga frete, grátis, grátis**.
**Critérios:** Palavras-chave: sem evidência/lacuna; caso com ID; valores-limite; resultados. Nota cheia (0,4): significado + caso completo com limites. Metade (0,2): significado com caso sem limites ou sem resultado. Zero (0): diz que não precisa de caso.
