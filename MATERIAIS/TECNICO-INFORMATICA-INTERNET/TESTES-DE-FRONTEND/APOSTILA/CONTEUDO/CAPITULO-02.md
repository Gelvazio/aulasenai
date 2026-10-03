# Capítulo 02 — Planejamento, Verificação, Validação e Casos de Teste

- **Aula:** 02
- **Capacidade:** C1, C2, C3, S2

## Teoria

### Testar sem plano é testar no escuro

A **Loja Nuvem Azul** vai lançar autenticação, carrinho e checkout em três semanas e não tem
nenhuma estratégia de testes (situação de aprendizagem 1). Cada pessoa testa "o que acha
importante", ninguém sabe o que já foi coberto e os mesmos defeitos voltam a cada versão. Antes de
escrever uma linha de código de teste, é preciso **analisar os requisitos, planejar e desenhar**
os testes.

> 🎯 **Objetivos do capítulo:** extrair **requisitos testáveis** de uma especificação, montar um
> **plano de testes**, organizar a **suíte** e escrever **casos de teste** (inclusive em BDD),
> usar as técnicas de **caixa preta e caixa branca**, ligar tudo numa **matriz de
> rastreabilidade** e **justificar** as decisões com base em requisitos e riscos.

### Verificação e validação no planejamento

Retomando o capítulo 1: a **verificação** pergunta se o produto foi construído conforme a
especificação (papel forte do desenvolvedor: testes unitários e de integração); a **validação**
pergunta se é o produto que o usuário precisa (papel forte do QA: cenários, testes de ponta a ponta,
usabilidade). O plano de testes precisa prever as duas.

### 6.1 Análise do documento de requisitos

Um **requisito testável** é claro, tem um único comportamento e um **critério objetivo** de
aceitação. Requisito vago não pode ser testado.

| Especificação (vaga) | Requisito testável |
|---|---|
| "O login deve ser seguro." | RF-01: após 3 senhas erradas seguidas, o botão Entrar fica bloqueado por 5 minutos. |
| "Validar o e-mail." | RF-02: e-mail sem "@" ou sem domínio mostra "Informe um e-mail válido" abaixo do campo. |
| "O frete deve funcionar direito." | RF-03: compras a partir de R$ 200,00 têm frete grátis; abaixo disso, frete pela tabela de CEP. |

**Como extrair:** leia a especificação, sublinhe cada comportamento observável, transforme em uma
frase "quando X, então Y", inclua valores e mensagens exatas e pergunte ao responsável o que não
estiver claro.

### 7.1 Planejamento: o plano de testes

O **plano de testes** (modelo inspirado na norma ISO/IEC/IEEE 29119) é o documento que organiza o
trabalho:

| Parte | Exemplo na Loja Nuvem Azul |
|---|---|
| **Escopo (dentro)** | Login, cadastro, carrinho, cupom e checkout |
| **Fora do escopo** | Login social e aplicativo mobile (próxima versão) |
| **Estratégia** | Unitários (regras de frete, cupom, validações), integração (formulários com API simulada), E2E (login → carrinho → pagamento) |
| **Ambientes e dados** | Ambiente de homologação igual ao de produção; usuários e cartões de teste |
| **Cronograma** | Semana 1: unitários; semana 2: integração; semana 3: E2E e regressão |
| **Riscos** | Falha no pagamento (impacto alto), cálculo de frete (alto), layout do rodapé (baixo) |
| **Critérios de saída** | 100% dos testes críticos passando, nenhum defeito grave aberto, cobertura ≥ 70% |

**Priorização por risco:** prioridade = **impacto × probabilidade**. Falha no checkout tem
prioridade máxima; desalinhamento no rodapé, prioridade baixa. Documentar o que está **fora do
escopo** alinha expectativas e evita cobranças de testes não planejados.

### 7.2 Desenho dos testes: suíte e casos de teste

- **Suíte de testes (6.3):** conjunto organizado de testes, agrupado por funcionalidade
  (suíte de login, de carrinho, de checkout) ou por nível (unitários, integração, E2E).
- **Caso de teste (6.4):** condição, passos e resultado esperado — com identificação única.

| Campo | CT-LOGIN-02 — Login com senha incorreta |
|---|---|
| **Pré-condição** | Usuário `ana@nuvemazul.test` cadastrado; servidor de homologação no ar |
| **Passos** | 1. Acessar `/login`. 2. Digitar o e-mail `ana@nuvemazul.test`. 3. Digitar a senha `errada123`. 4. Clicar em **Entrar**. |
| **Resultado esperado** | Mensagem "E-mail ou senha incorretos" abaixo do formulário; usuário continua na página de login |
| **Requisito** | RF-01 · **Técnica:** caixa preta · **Nível:** integração |

⚠️ **Caso vago:** "testar o login com senha errada e ver se dá erro". Falta o dado exato, o lugar
da mensagem e o estado inicial. Use verbos no imperativo, dados exatos e um resultado
**verificável**.

### Técnicas de teste

**Caixa preta (teste funcional):** testa entradas e saídas sem ver o código.

- **Partição de equivalência:** agrupar entradas que se comportam igual (e-mails válidos, e-mails
  sem "@", campo vazio) e testar um representante de cada grupo.
- **Valor-limite:** testar exatamente nas bordas da regra — para "frete grátis a partir de
  R$ 200,00": R$ 199,99, R$ 200,00 e R$ 200,01.

**Caixa branca (teste estrutural):** testa caminhos internos do código — cada `if/else`, cada
laço e cada retorno da função de frete precisa ser executado por algum teste.

### BDD: cenários em linguagem do negócio

O **BDD** descreve o comportamento com a sintaxe **Dado / Quando / Então** (Gherkin), que todo o
time entende e que depois vira teste automatizado:

```gherkin
Funcionalidade: Frete grátis
  Cenário: Compra exatamente no limite
    Dado que o carrinho soma R$ 200,00
    Quando eu vou para o pagamento
    Então o frete aparece como "Grátis"
```

### Matriz de rastreabilidade

Liga cada requisito aos casos de teste que o verificam. Se um requisito muda, a matriz mostra quais
testes atualizar; requisito sem caso de teste é funcionalidade sem garantia.

| Requisito | Casos de teste | Situação |
|---|---|---|
| RF-01 Bloqueio após 3 senhas erradas | CT-LOGIN-02, CT-LOGIN-03 | ✅ Coberto |
| RF-02 Validação de e-mail | CT-CAD-01, CT-CAD-02 | ✅ Coberto |
| RF-03 Frete grátis a partir de R$ 200 | — | ❌ Sem caso de teste |

### Justificar as decisões (S2)

Nunca dá para testar tudo. Por isso cada decisão do plano — o que entra, o que fica de fora, o que
vem primeiro — deve ser **fundamentada em fatos**: requisitos, riscos, histórico de defeitos e
prazos. "Priorizamos o checkout porque uma falha ali impede a venda (impacto alto) e o módulo foi
alterado nesta versão (probabilidade alta)" é uma justificativa técnica; "porque sim", não.

## Vídeos

- [Criando um caso de teste na prática](https://www.youtube.com/watch?v=-Yz1lWiyOwc) — 08:52 — Many - QA
- [Como desenvolver um plano de testes](https://www.youtube.com/watch?v=faw5RmpxOvk) — 10:54 — Fulltureschool
- [Estratégia de teste de software: como fazer](https://www.youtube.com/watch?v=bmzeuk3zVS4) — 13:48 — pessonizando
- [Gherkin × BDD: entenda as diferenças](https://www.youtube.com/watch?v=7tDgX23Da3I) — 04:05 — Priscila Caimi

## Exercícios

### ITEM 1
- **Capacidade:** C1
- **Contexto:** Especificação do formulário de login da Loja Nuvem Azul: "O login deve ser rápido, seguro e avisar o usuário quando algo der errado. E-mail e senha são obrigatórios."
- **Comando:** Extraia pelo menos quatro requisitos testáveis dessa especificação, cada um com comportamento e critério objetivo (valores, mensagens, tempos), e aponte o que precisaria ser perguntado ao cliente.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C2, C3
- **Contexto:** A tela de login precisa de casos de teste para: (a) login com dados válidos; (b) senha incorreta; (c) e-mail em branco.
- **Comando:** Escreva os três casos de teste completos (ID, título, pré-condição, passos numerados com dados exatos e resultado esperado verificável) e marque, em cada um, a técnica (caixa preta ou caixa branca).
- **Linhas:** 10

### ITEM 3
- **Capacidade:** C3
- **Contexto:** O carrinho de compras da Loja Nuvem Azul (em React) será testado nas próximas duas semanas.
- **Comando:** Monte um plano de testes de uma página para o carrinho com escopo, fora do escopo, estratégia por nível (unitário, integração e E2E), cronograma e três riscos com impacto e probabilidade.
- **Linhas:** 9

### ITEM 4
- **Capacidade:** C2
- **Contexto:** O cliente enviou o requisito: "o carrinho deve calcular o frete certinho, e frete grátis para compras grandes". Depois confirmou: frete grátis a partir de R$ 200,00.
- **Comando:** Escreva três cenários BDD (Dado / Quando / Então) usando a técnica de valor-limite e explique por que esses três valores foram escolhidos.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C2, C3
- **Contexto:** Requisitos do checkout: RF-10 aceitar cartão de crédito; RF-11 aplicar cupom válido; RF-12 recusar cupom vencido; RF-13 calcular parcelas sem juros até 3x. Casos existentes: CT-20 (cartão aprovado), CT-21 (cartão recusado), CT-22 (cupom válido) e CT-23 (parcelamento em 2x).
- **Comando:** Monte a matriz de rastreabilidade requisito × caso, indique os requisitos sem cobertura ou com cobertura incompleta e proponha os casos que faltam.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C3, S2
- **Contexto:** Faltam dois dias para o lançamento e só há tempo para executar 10 dos 30 casos de teste planejados. O checkout foi todo alterado nesta versão; o rodapé e a página "Quem somos" não mudaram.
- **Comando:** Explique quais casos você priorizaria e quais deixaria para depois, justificando cada decisão com base em requisitos, impacto e probabilidade (riscos).
- **Linhas:** 6

## Resumo

- **Requisito testável** tem um comportamento e um critério objetivo; requisito vago precisa ser esclarecido antes de testar.
- O **plano de testes** define escopo, fora do escopo, estratégia, ambientes e dados, cronograma, riscos e critérios de saída.
- **Suíte** organiza os testes; **caso de teste** traz ID, pré-condição, passos com dados exatos e resultado esperado verificável.
- **Caixa preta** (partição de equivalência, valor-limite) olha entradas e saídas; **caixa branca** olha os caminhos do código.
- **BDD** (Dado / Quando / Então) aproxima negócio, QA e desenvolvimento; a **matriz de rastreabilidade** garante que todo requisito tenha teste.
- Decisões de teste são **justificadas** por requisitos e riscos (impacto × probabilidade).

## Glossário

- **Caso de teste:** condição, passos e resultado esperado.
- **Caixa preta:** testa entradas e saídas sem ver o código.
- **Caixa branca:** testa caminhos internos do código.
- **Matriz de rastreabilidade:** liga cada requisito aos casos de teste que o verificam.
- **Requisito testável:** requisito claro, com um comportamento e um critério objetivo de aceitação.
- **Plano de testes:** documento com escopo, estratégia, ambientes, cronograma, riscos e critérios de saída dos testes.
- **Escopo:** o que será testado (e o que fica de fora) em uma versão.
- **Valor-limite:** técnica que testa as entradas exatamente nas bordas de uma regra.
- **Partição de equivalência:** técnica que agrupa entradas de mesmo comportamento e testa um representante de cada grupo.
- **BDD:** desenvolvimento guiado por comportamento, com cenários no formato Dado / Quando / Então.
