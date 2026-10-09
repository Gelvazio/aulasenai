# Atividade: Atividade Prática — Aula 03 — 10 Questões Discursivas

- **Aula:** AP-03
- **Rótulo da aula:** Atividade Prática — Aula 03
- **Tema:** Testes Unitários no Front-End com Vitest
- **Ícone:** ⚡
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-03.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Desenvolver, por escrito, testes unitários automatizados de funções de front-end com os conteúdos da aula 03 (`CONTEUDO/AULA-03-TESTES-UNITARIOS-COM-VITEST.md`): automação e teste unitário, frameworks, preparação do projeto com npm e Vitest, padrão AAA, describe/it/expect, matchers, caixa branca (caminhos e valores-limite), mutantes e mock com vi.fn e injeção de dependência.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (`ATIVIDADE-PRATICA-AULA-03-GABARITO.md`, fora do Git) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 3

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para criar a suíte de testes unitários das funções utilitárias de uma loja virtual em React (frete, cupom, validação e login).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o código do teste escrito por inteiro (describe, it, expect e o matcher) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Escreva o código como escreveria no VS Code. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código de teste correto (estrutura, valores e matcher adequado) e justificativa com as palavras-chave do conteúdo. Nomes de testes e variáveis diferentes valem, desde que o teste esteja correto; aspas simples ou duplas e ponto e vírgula opcional são aceitos. Erros de português não tiram nota se a ideia estiver clara.

**Função usada em várias questões (arquivo src/utils/frete.js):** calcularFrete(subtotal) lança o erro "Subtotal inválido" se o subtotal for negativo; devolve 0 (frete grátis) se o subtotal for maior ou igual a 199; nos demais casos devolve 19.9.

## Cobertura da aula

| Conteúdo da aula 03 | Questões |
|---|---|
| Automação de testes, teste unitário e regressão (2.1) | 01 |
| Frameworks (2.2) | 02 |
| Preparação do projeto com npm e Vitest (2.3) | 03 |
| Padrão AAA, describe, it e expect | 04, 05 |
| Matchers | 06 |
| Caixa branca: caminhos e valores-limite (3.2) | 07, 08 |
| Mock (vi.fn) e injeção de dependência | 09 |
| Teste antes da correção (cupom) | 10 |

---

## ITEM 01 — Por Que Automatizar

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, ouviu da equipe da loja: "Testamos tudo à mão antes de cada versão; leva uma tarde inteira, e mesmo assim a última alteração no carrinho quebrou o cálculo do frete sem ninguém perceber".

**Comando:**
Mostre à equipe o valor dos testes automatizados.

**Tópicos:**
- a) Explique o que é um teste automatizado. (0,2)
- b) Explique o que é um teste unitário, o que ele não usa (banco, rede, navegador) e por que fica na base da pirâmide. (0,4)
- c) Explique o que é um teste de regressão e como ele teria evitado o problema do frete relatado pela equipe. (0,4)

---

## ITEM 02 — Escolhendo as Ferramentas

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai recomendar as ferramentas de teste da loja, feita com Vite e React. A equipe já ouviu falar de Vitest, Jest, Testing Library, Cypress e Playwright, mas não sabe para que serve cada uma.

**Comando:**
Recomende as ferramentas por camada.

**Tópicos:**
- a) Diga qual ferramenta a UC usa para os testes unitários e por que ela foi escolhida para um projeto Vite/React. (0,2)
- b) Diga para que serve cada uma das ferramentas (Vitest, Jest, Testing Library, Cypress/Playwright) e em qual camada da pirâmide cada uma atua. (0,4)
- c) Explique a relação entre Jest e Vitest e o que muda para a equipe que já conhece o Jest. (0,4)

---

## ITEM 03 — Preparando o Projeto

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai criar do zero, no laboratório, a pasta testes-unitarios com o Vitest para a equipe treinar.

**Comando:**
Escreva os comandos e as convenções do projeto.

**Tópicos:**
- a) Escreva o comando que cria o package.json e o comando que instala o Vitest como dependência de desenvolvimento. (0,2)
- b) Escreva os comandos que definem os scripts test e test:run no package.json e explique a diferença entre rodar npm test e npm run test:run. (0,4)
- c) Diga onde fica, por convenção, o arquivo de teste de src/utils/frete.js e explique qual dos dois modos (observação ou rodar uma vez) é usado no CI e por quê. (0,4)

---

## ITEM 04 — O Padrão AAA

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, revisa este teste de um colega: const subtotal = 198.99; const frete = calcularFrete(subtotal); expect(frete).toBe(19.9);

**Comando:**
Explique e aplique o padrão AAA.

**Tópicos:**
- a) Diga o que significa cada A do padrão AAA. (0,2)
- b) Indique qual linha do teste do colega é o Arrange, qual é o Act e qual é o Assert, explicando o papel de cada uma. (0,4)
- c) Escreva, no padrão AAA e com comentários marcando as três partes, um teste que confere o frete grátis com subtotal 250. (0,4)

---

## ITEM 05 — Estrutura de um Arquivo de Teste

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai escrever o arquivo src/utils/frete.test.js da função calcularFrete (descrita no início da atividade).

**Comando:**
Escreva o arquivo de teste completo.

**Tópicos:**
- a) Explique para que servem describe, it e expect. (0,2)
- b) Escreva o arquivo de teste completo, com o import do Vitest e da função, um describe e três testes (frete pago, frete grátis e subtotal negativo). (0,4)
- c) Explique como deve ser escrito o nome de cada teste e o que significa cada teste ser independente, dizendo o que aconteceria se um teste dependesse de outro. (0,4)

---

## ITEM 06 — Escolhendo o Matcher

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa conferir cinco resultados na loja: (1) o total do carrinho é 10; (2) o item do carrinho é o objeto com id 1 e qtd 2; (3) a soma 0.1 + 0.2 dá 0.3; (4) a lista de produtos contém "Teclado"; (5) calcularFrete(-1) lança erro.

**Comando:**
Escolha e escreva os matchers.

**Tópicos:**
- a) Diga qual matcher usar em cada um dos cinco casos. (0,2)
- b) Escreva a linha expect completa de cada um dos cinco casos. (0,4)
- c) Explique por que expect(frete).toBe(0) é melhor que expect(frete).toBeFalsy() e por que o toThrow precisa receber uma função (() => calcularFrete(-1)). (0,4)

---

## ITEM 07 — Caixa Branca: Todos os Caminhos

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, olha o código de calcularFrete (descrita no início da atividade) para garantir que a suíte exercita a função inteira.

**Comando:**
Aplique a visão de caixa branca.

**Tópicos:**
- a) Diga quantos caminhos a função calcularFrete tem e quais são. (0,2)
- b) Escreva os testes com os valores-limite 198.99, 199 e 199.01 e o resultado esperado de cada um. (0,4)
- c) Diga quantos testes, no mínimo, precisa uma função com um if/else dentro de outro if (sem else), e justifique contando os caminhos. (0,4)

---

## ITEM 08 — Mutante Sobrevivente

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, participou da dinâmica "Mutante sobrevivente". A outra dupla trocou, no código de calcularFrete, o operador maior ou igual (>=) por maior (>). A suíte da sua dupla só tinha os testes com subtotal 50 e subtotal 500, e todos continuaram passando.

**Comando:**
Analise o mutante e corrija a suíte.

**Tópicos:**
- a) Explique o que significa o mutante ter "sobrevivido". (0,2)
- b) Explique por que os testes com 50 e 500 não pegaram o mutante e qual valor revela o defeito. (0,4)
- c) Escreva o teste que "mata" esse mutante e explique o que a dinâmica ensina sobre o valor de um teste. (0,4)

---

## ITEM 09 — Mock da API de Autenticação

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai testar a função entrar(email, senha, cliente = fetch). Ela chama cliente('/api/login', { method: 'POST', body }); se a resposta não for ok, devolve { sucesso: false }; se for ok, lê o json e devolve { sucesso: true, token }.

**Comando:**
Teste a função sem chamar a API real.

**Tópicos:**
- a) Explique o que é um mock e por que um teste unitário não deve chamar a API real. (0,2)
- b) Escreva o teste do login aceito: crie o cliente falso com vi.fn().mockResolvedValue, chame entrar e confira o resultado e a chamada com toHaveBeenCalledWith. (0,4)
- c) Escreva o teste do login recusado (resposta com ok: false) e explique por que receber o cliente por parâmetro (injeção de dependência) facilita o teste e para que serve recriar os mocks no beforeEach. (0,4)

---

## ITEM 10 — Testes Antes da Correção do Cupom

- **Aula:** 03 · Testes Unitários no Front-End com Vitest
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, foi chamado porque o carrinho mostrou total errado com um cupom de 15%. A função é aplicarCupom(total, percentual). Antes de mexer no código, você decide escrever os testes.

**Comando:**
Monte a suíte que mostra o defeito e protege a correção.

**Tópicos:**
- a) Explique por que escrever os testes antes de alterar o código. (0,2)
- b) Liste os cinco casos de teste da função (0%, 15%, 100%, percentual negativo e total com centavos), com a entrada e o resultado esperado de cada um. (0,4)
- c) Escreva o teste do total com centavos (ex.: total 99.90 com 15%) usando o matcher adequado e explique por que esse matcher é necessário. (0,4)
