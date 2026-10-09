# Atividade: Testes Unitários no Front-End com Vitest — 50 Questões

- **Aula:** 03
- **Tema:** Testes Unitários no Front-End com Vitest
- **Ícone:** ⚡
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Desenvolver conjunto de testes automatizados: automação de testes e teste unitário, frameworks (Vitest, Jest, Testing Library, Cypress/Playwright), preparação do projeto com npm, padrão AAA, describe/it/expect, matchers, caixa branca e caminhos da função, valores-limite e mock com vi.fn e injeção de dependência.
- **Conteúdo-base:** ../CONTEUDO/AULA-03-TESTES-UNITARIOS-COM-VITEST.md
- **Slides:** ../AULAS/AULA-03-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-03-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É Teste Automatizado

- **Capacidade:** C5

**Comando:**  
O que é um teste automatizado?

**Alternativas:**
- A) Um programa que testa outro programa, comparando o resultado com o esperado.
- B) Uma revisão visual das telas feita pelo designer.
- C) Um relatório escrito depois da publicação.
- D) Um teste feito à mão pelo cliente na loja.

**Gabarito:** A

---

## ITEM 02 — Vantagem da Automação

- **Capacidade:** C5

**Comando:**  
Qual é uma vantagem do teste automatizado?

**Alternativas:**
- A) Dispensa escrever qualquer requisito.
- B) Roda em segundos, quantas vezes for preciso, e avisa na hora quando algo quebra.
- C) Só precisa ser executado uma vez na vida.
- D) Garante que o sistema não tem nenhum defeito.

**Gabarito:** B

---

## ITEM 03 — Teste de Regressão

- **Capacidade:** C5

**Comando:**  
O que é um teste de regressão?

**Alternativas:**
- A) O teste feito só na primeira versão.
- B) O teste que apaga as funções antigas.
- C) O teste que mede o tempo de carregamento.
- D) O teste que avisa quando uma alteração quebra algo que já funcionava.

**Gabarito:** D

---

## ITEM 04 — Teste Unitário

- **Capacidade:** C5

**Comando:**  
O que verifica um teste unitário?

**Alternativas:**
- A) A menor parte do código, como uma função, de forma isolada.
- B) O fluxo completo no navegador real.
- C) A integração entre a tela e o banco de dados.
- D) A opinião do usuário sobre a interface.

**Gabarito:** A

---

## ITEM 05 — O Que o Unitário Não Usa

- **Capacidade:** C5

**Comando:**  
Um teste unitário roda:

**Alternativas:**
- A) Sempre com a API real da loja.
- B) Somente dentro do navegador do usuário.
- C) Sempre com o banco de produção.
- D) Sem banco, sem rede e sem navegador.

**Gabarito:** D

---

## ITEM 06 — Unitário na Pirâmide

- **Capacidade:** C5

**Comando:**  
Onde fica o teste unitário na pirâmide de testes?

**Alternativas:**
- A) No meio: testes de componentes com API.
- B) Fora da pirâmide.
- C) No topo: poucos testes, lentos e caros.
- D) Na base: muitos testes, rápidos e baratos.

**Gabarito:** D

---

## ITEM 07 — Para Que Serve o Vitest

- **Capacidade:** C5

**Comando:**  
Para que serve o Vitest?

**Alternativas:**
- A) Controlar o navegador real em testes E2E.
- B) Publicar o site na internet.
- C) Executar testes JS/TS com asserções, mocks e cobertura.
- D) Desenhar o protótipo das telas.

**Gabarito:** C

---

## ITEM 08 — Por Que Vitest

- **Capacidade:** C5

**Comando:**  
Por que a UC usa o Vitest?

**Alternativas:**
- A) Só funciona com testes manuais.
- B) É rápido, compatível com a sintaxe do Jest e integrado a projetos Vite/React.
- C) É o único framework de testes que existe.
- D) Dispensa o Node.js e o npm.

**Gabarito:** B

---

## ITEM 09 — Ferramenta de E2E

- **Capacidade:** C5

**Comando:**  
Quais ferramentas controlam o navegador real em testes E2E?

**Alternativas:**
- A) Vitest e Jest.
- B) Cypress e Playwright.
- C) Testing Library e Vite.
- D) npm e Node.js.

**Gabarito:** B

---

## ITEM 10 — Testing Library

- **Capacidade:** C5

**Comando:**  
Para que serve a Testing Library?

**Alternativas:**
- A) Criar o banco de dados de testes.
- B) Substituir o Node.js no terminal.
- C) Medir o tempo de resposta da API.
- D) Testar componentes pelo que o usuário vê na tela.

**Gabarito:** D

---

## ITEM 11 — Jest e Vitest

- **Capacidade:** C5

**Comando:**  
Qual é a relação entre Jest e Vitest?

**Alternativas:**
- A) O Jest só testa back-end em Java.
- B) O Jest é um editor de código.
- C) O Jest é uma alternativa mais antiga, com API quase igual à do Vitest.
- D) O Jest é uma ferramenta de E2E.

**Gabarito:** C

---

## ITEM 12 — Instalando o Vitest

- **Capacidade:** C5

**Comando:**  
Qual comando instala o Vitest como dependência de desenvolvimento?

**Alternativas:**
- A) npm install -D vitest
- B) npm start vitest
- C) node vitest --install
- D) npm run vitest

**Gabarito:** A

---

## ITEM 13 — Iniciando o Projeto

- **Capacidade:** C5

**Comando:**  
Qual comando cria o package.json do projeto de testes?

**Alternativas:**
- A) npm run test:run
- B) npm test
- C) npm init -y
- D) node init

**Gabarito:** C

---

## ITEM 14 — Modo Observação

- **Capacidade:** C5

**Comando:**  
O que faz o comando npm test (script "vitest")?

**Alternativas:**
- A) Roda uma vez e termina, como no CI.
- B) Roda em modo observação, repetindo os testes a cada arquivo salvo.
- C) Publica o projeto no servidor.
- D) Apaga todos os testes do projeto.

**Gabarito:** B

---

## ITEM 15 — Rodar Uma Vez

- **Capacidade:** C5

**Comando:**  
Qual comando roda a suíte uma vez e termina, como no CI?

**Alternativas:**
- A) npm install -D vitest
- B) npm test (vitest)
- C) npm init -y
- D) npm run test:run (vitest run)

**Gabarito:** D

---

## ITEM 16 — Nome do Arquivo de Teste

- **Capacidade:** C5

**Comando:**  
Pela convenção, onde fica o teste de src/utils/frete.js?

**Alternativas:**
- A) src/utils/frete.json
- B) src/frete.css
- C) testes/frete.html
- D) src/utils/frete.test.js

**Gabarito:** D

---

## ITEM 17 — Padrão AAA

- **Capacidade:** C5

**Comando:**  
O que significa o padrão AAA?

**Alternativas:**
- A) Arrange (preparar), Act (agir) e Assert (conferir).
- B) Analisar, Aprovar e Arquivar.
- C) Abrir, Apagar e Atualizar.
- D) Acessar, Alterar e Agendar.

**Gabarito:** A

---

## ITEM 18 — Arrange

- **Capacidade:** C5

**Comando:**  
No padrão AAA, o que se faz no Arrange?

**Alternativas:**
- A) Conferir o resultado com o esperado.
- B) Executar a função testada.
- C) Preparar os dados e o cenário do teste.
- D) Publicar o resultado do teste.

**Gabarito:** C

---

## ITEM 19 — Act

- **Capacidade:** C5

**Comando:**  
No padrão AAA, o que se faz no Act?

**Alternativas:**
- A) Preparar os dados do teste.
- B) Conferir o resultado.
- C) Executar o código que está sendo testado.
- D) Escrever o nome do teste.

**Gabarito:** C

---

## ITEM 20 — Assert

- **Capacidade:** C5

**Comando:**  
No padrão AAA, o que se faz no Assert?

**Alternativas:**
- A) Preparar os dados de entrada.
- B) Instalar as dependências.
- C) Chamar a função testada.
- D) Conferir se o resultado obtido é igual ao esperado.

**Gabarito:** D

---

## ITEM 21 — Identificando o Assert

- **Capacidade:** C5

**Contexto:**  
Um teste tem as linhas: const subtotal = 198.99; · const frete = calcularFrete(subtotal); · expect(frete).toBe(19.9);

**Comando:**  
Qual linha é o Assert?

**Alternativas:**
- A) Nenhuma das linhas.
- B) expect(frete).toBe(19.9);
- C) const subtotal = 198.99;
- D) const frete = calcularFrete(subtotal);

**Gabarito:** B

---

## ITEM 22 — Função do describe

- **Capacidade:** C5

**Comando:**  
Para que serve o describe em um arquivo de teste?

**Alternativas:**
- A) Agrupar os testes de uma mesma unidade.
- B) Criar um mock da API.
- C) Executar o código em produção.
- D) Conferir um valor com o esperado.

**Gabarito:** A

---

## ITEM 23 — Função do it

- **Capacidade:** C5

**Comando:**  
O que representa o it (ou test) no Vitest?

**Alternativas:**
- A) Um grupo de arquivos.
- B) Um caso de teste.
- C) Uma dependência instalada.
- D) Um matcher de números.

**Gabarito:** B

---

## ITEM 24 — Nome do Teste

- **Capacidade:** C5

**Comando:**  
Como deve ser o nome de um teste (o texto do it)?

**Alternativas:**
- A) Ter só uma letra.
- B) Descrever o comportamento esperado, como um caso de teste.
- C) Repetir o nome do arquivo.
- D) Ser um número aleatório.

**Gabarito:** B

---

## ITEM 25 — Independência dos Testes

- **Capacidade:** C5

**Comando:**  
O que significa dizer que cada teste é independente?

**Alternativas:**
- A) Ele só passa se todos os outros passarem.
- B) Ele usa os dados deixados pelo teste anterior.
- C) Ele precisa rodar sempre depois do anterior.
- D) Ele não depende da ordem nem do resultado de outro teste.

**Gabarito:** D

---

## ITEM 26 — Matcher toBe

- **Capacidade:** C5

**Comando:**  
Quando usar o matcher toBe?

**Alternativas:**
- A) Para comparar um valor primitivo exato, como um número.
- B) Para conferir um mock chamado.
- C) Para comparar objetos com o mesmo conteúdo.
- D) Para esperar que a função lance erro.

**Gabarito:** A

---

## ITEM 27 — Matcher toEqual

- **Capacidade:** C5

**Comando:**  
Qual matcher compara o objeto { id: 1, qtd: 2 } pelo conteúdo?

**Alternativas:**
- A) toBe
- B) toEqual
- C) toBeTruthy
- D) toThrow

**Gabarito:** B

---

## ITEM 28 — Somando 0.1 e 0.2

- **Capacidade:** C5

**Comando:**  
Qual matcher usar para conferir 0.1 + 0.2 igual a 0.3?

**Alternativas:**
- A) toBeCloseTo
- B) toHaveBeenCalledWith
- C) toBe
- D) toContain

**Gabarito:** A

---

## ITEM 29 — Esperando Erro

- **Capacidade:** C5

**Comando:**  
Qual matcher confere que a função lança um erro?

**Alternativas:**
- A) toThrow
- B) toBeCloseTo
- C) toContain
- D) toEqual

**Gabarito:** A

---

## ITEM 30 — Forma do toThrow

- **Capacidade:** C5

**Comando:**  
Como escrever corretamente a expectativa de erro de calcularFrete(-1)?

**Alternativas:**
- A) expect(-1).toContain(calcularFrete)
- B) expect(calcularFrete(-1)).toBe(-1)
- C) expect(() => calcularFrete(-1)).toThrow()
- D) expect(calcularFrete).toEqual(-1)

**Gabarito:** C

---

## ITEM 31 — Matcher toContain

- **Capacidade:** C5

**Comando:**  
Qual matcher confere que a lista de produtos contém "Teclado"?

**Alternativas:**
- A) toBe
- B) toBeCloseTo
- C) toContain
- D) toThrow

**Gabarito:** C

---

## ITEM 32 — Matcher do Mock

- **Capacidade:** C5

**Comando:**  
Qual matcher confere que um mock foi chamado com certos argumentos?

**Alternativas:**
- A) toBeFalsy
- B) toBeCloseTo
- C) toEqual
- D) toHaveBeenCalledWith

**Gabarito:** D

---

## ITEM 33 — Matcher Mais Específico

- **Capacidade:** C5

**Comando:**  
Por que preferir expect(frete).toBe(0) a expect(frete).toBeFalsy()?

**Alternativas:**
- A) Porque toBe é sempre mais rápido.
- B) Porque o matcher mais específico diz exatamente o valor esperado.
- C) Porque toBeFalsy só funciona com textos.
- D) Porque toBeFalsy não existe no Vitest.

**Gabarito:** B

---

## ITEM 34 — Caixa Branca no Unitário

- **Capacidade:** C5

**Comando:**  
Na caixa branca aplicada ao teste unitário, o objetivo é:

**Alternativas:**
- A) Garantir que cada caminho do código foi exercitado.
- B) Ignorar os if/else da função.
- C) Testar apenas o caminho feliz.
- D) Testar só pelo que o usuário vê.

**Gabarito:** A

---

## ITEM 35 — Caminhos do Frete

- **Capacidade:** C5

**Contexto:**  
A função da loja é: if (subtotal < 0) throw new Error('Subtotal inválido'); if (subtotal >= 199) return 0; return 19.9;

**Comando:**  
Quantos caminhos essa função tem?

**Alternativas:**
- A) 5: um para cada linha.
- B) 2: grátis e pago.
- C) 3: negativo, abaixo de 199 e a partir de 199.
- D) 1: apenas o retorno do frete.

**Gabarito:** C

---

## ITEM 36 — Mínimo de Testes do Frete

- **Capacidade:** C5

**Contexto:**  
A função da loja é: if (subtotal < 0) throw new Error('Subtotal inválido'); if (subtotal >= 199) return 0; return 19.9;

**Comando:**  
Qual é o mínimo de testes para cobrir todos os caminhos?

**Alternativas:**
- A) 2 testes.
- B) 3 testes.
- C) 1 teste.
- D) 10 testes.

**Gabarito:** B

---

## ITEM 37 — Limite do Frete

- **Capacidade:** C5

**Contexto:**  
A função da loja é: if (subtotal < 0) throw new Error('Subtotal inválido'); if (subtotal >= 199) return 0; return 19.9;

**Comando:**  
Qual resultado esperado para calcularFrete(199)?

**Alternativas:**
- A) Erro "Subtotal inválido"
- B) 199
- C) 0
- D) 19.9

**Gabarito:** C

---

## ITEM 38 — Abaixo do Limite

- **Capacidade:** C5

**Contexto:**  
A função da loja é: if (subtotal < 0) throw new Error('Subtotal inválido'); if (subtotal >= 199) return 0; return 19.9;

**Comando:**  
Qual resultado esperado para calcularFrete(198.99)?

**Alternativas:**
- A) 0
- B) Erro "Subtotal inválido"
- C) 19.9
- D) 198.99

**Gabarito:** C

---

## ITEM 39 — Mutante Sobrevivente

- **Capacidade:** C5

**Contexto:**  
A função da loja é: if (subtotal < 0) throw new Error('Subtotal inválido'); if (subtotal >= 199) return 0; return 19.9; Um colega trocou >= por > e todos os testes continuaram passando.

**Comando:**  
O que essa situação revela?

**Alternativas:**
- A) O Vitest está com defeito.
- B) Os testes estão perfeitos.
- C) Falta um teste com o valor-limite 199.
- D) O operador > é sempre melhor.

**Gabarito:** C

---

## ITEM 40 — Valor de um Teste

- **Capacidade:** C5

**Comando:**  
Segundo a dinâmica "Mutante sobrevivente", quando um teste tem valor?

**Alternativas:**
- A) Quando roda mais devagar.
- B) Quando ele falha se o código estiver errado.
- C) Quando passa em qualquer situação.
- D) Quando tem o nome mais longo.

**Gabarito:** B

---

## ITEM 41 — If Dentro de If

- **Capacidade:** C5

**Comando:**  
Uma função tem um if/else dentro de outro if (que não tem else). Quantos testes, no mínimo, cobrem todos os caminhos?

**Alternativas:**
- A) 1 teste, porque é uma função só.
- B) 3 testes: o if de fora falso, e o if de dentro verdadeiro e falso.
- C) 4 testes, sempre o dobro dos ifs.
- D) 2 testes, um para cada if.

**Gabarito:** B

---

## ITEM 42 — O Que É Mock

- **Capacidade:** C5

**Comando:**  
O que é um mock?

**Alternativas:**
- A) Um substituto controlado de uma dependência, que devolve o que o teste precisa e registra as chamadas.
- B) A API real usada em produção.
- C) Um erro proposital no código.
- D) Um tipo de matcher de números.

**Gabarito:** A

---

## ITEM 43 — Quando Usar Mock

- **Capacidade:** C5

**Comando:**  
Em qual situação se usa mock no teste unitário?

**Alternativas:**
- A) Quando a função depende de algo externo, como API, data atual ou localStorage.
- B) Quando o teste é E2E no navegador real.
- C) Quando a função é pura e não depende de nada.
- D) Quando se quer testar a API real.

**Gabarito:** A

---

## ITEM 44 — Criando Mock no Vitest

- **Capacidade:** C5

**Comando:**  
Qual função do Vitest cria uma função mock?

**Alternativas:**
- A) npm init
- B) describe()
- C) expect()
- D) vi.fn()

**Gabarito:** D

---

## ITEM 45 — Mock que Resolve

- **Capacidade:** C5

**Comando:**  
Como fazer um mock assíncrono devolver uma resposta de sucesso?

**Alternativas:**
- A) vi.fn().mockResolvedValue({ ok: true, json: async () => ({ token: 'x' }) })
- B) expect.fn().resolve(true)
- C) describe.mock({ ok: true })
- D) vi.fn().toBe({ ok: true })

**Gabarito:** A

---

## ITEM 46 — Injeção de Dependência

- **Capacidade:** C5

**Contexto:**  
A função entrar(email, senha, cliente = fetch) recebe o cliente HTTP por parâmetro.

**Comando:**  
Por que isso facilita o teste?

**Alternativas:**
- A) Porque impede o uso de matchers.
- B) Porque o teste pode passar um mock no lugar do fetch real.
- C) Porque deixa a função mais lenta.
- D) Porque obriga o teste a usar a API real.

**Gabarito:** B

---

## ITEM 47 — API Real no Unitário

- **Capacidade:** C5

**Comando:**  
Por que um teste unitário não deve chamar a API real?

**Alternativas:**
- A) Porque fica lento, instável e deixa de testar só a unidade.
- B) Porque o Vitest proíbe qualquer rede.
- C) Porque a API real sempre responde certo.
- D) Porque a API real é mais rápida que o mock.

**Gabarito:** A

---

## ITEM 48 — beforeEach

- **Capacidade:** C5

**Comando:**  
Para que serve recriar os mocks no beforeEach?

**Alternativas:**
- A) Apagar o arquivo de teste.
- B) Executar os testes só uma vez.
- C) Chamar a API real antes de cada teste.
- D) Garantir o isolamento, com mocks novos antes de cada teste.

**Gabarito:** D

---

## ITEM 49 — Cupom de 15%

- **Capacidade:** C5

**Contexto:**  
Você, como aluno consultor, investiga um total errado com cupom de 15% numa loja virtual.

**Comando:**  
Qual é a abordagem correta antes de alterar o código?

**Alternativas:**
- A) Apagar a função de cupom.
- B) Testar só o cupom de 15% uma vez à mão.
- C) Alterar o código direto e publicar.
- D) Escrever os testes de aplicarCupom (0%, 15%, 100%, negativo e centavos) para mostrar o defeito.

**Gabarito:** D

---

## ITEM 50 — Total com Centavos

- **Capacidade:** C5

**Contexto:**  
No teste de aplicarCupom, o total com desconto tem centavos (ex.: 84.915).

**Comando:**  
Qual matcher é o mais adequado para conferir esse valor?

**Alternativas:**
- A) toHaveBeenCalledWith
- B) toThrow
- C) toBeCloseTo
- D) toContain

**Gabarito:** C

---
