# Aula 02 — Planejamento, Verificação, Validação e Casos de Teste

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 14/10
- **Conhecimentos (ementa do curso):** 6 Planejamento de testes client-side (6.1 Análise do
  documento de requisitos · 6.2 Plano de testes · 6.3 Suíte de testes · 6.4 Casos de testes) ·
  7.1 Planejamento · 7.2 Desenho dos Testes · 3 Técnicas de testes (3.1 Teste funcional (caixa
  preta) · 3.2 Teste estrutural (caixa branca))
- **Capacidades:** C1 — Reconhecer as especificações técnicas da interface · C2 — Reconhecer os
  requisitos da documentação de testes · C3 — Reconhecer as etapas de planejamento de testes ·
  S2 — Fundamentar escolhas e decisões no exame de fatos, contextos, possibilidades, desafios e
  problemáticas de diferentes naturezas à luz de referenciais técnicos, legais, normativos e
  institucionais
- **Estratégias:** exposição dialogada, estudo de caso (SA 1), trabalho em trios, dinâmica
- **Prática da aula:** [`../ATIVIDADES/ATIVIDADE-PRATICA-AULA-02.md`](../ATIVIDADES/ATIVIDADE-PRATICA-AULA-02.md)

## Indicadores

- (3) Extrai requisitos testáveis de uma especificação de interface (C1).
- (4) Escreve casos de teste com ID, pré-condição, passos e resultado esperado (C2/C3).
- (5) Monta plano de testes com escopo, estratégia, cronograma e riscos (C3).
- (13) Justifica decisões de teste com base em requisitos e riscos (S2).

## Objetivos

- Analisar um documento de requisitos e separar o que é testável do que é vago.
- Reconhecer as etapas de planejamento (7.1) e de desenho dos testes (7.2).
- Montar um plano de testes de 1 página com escopo, fora do escopo, estratégia, riscos e cronograma.
- Escrever casos de teste completos, de caminho feliz e de borda.
- Diferenciar teste de caixa preta (3.1) de teste de caixa branca (3.2).
- Organizar casos de teste numa suíte (6.3) e ligar requisitos a casos numa matriz de rastreabilidade.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 20 min | Quiz de verificação × validação e tipos de teste (aula 1) |
| Exposição dialogada | 45 min | Requisitos testáveis; processo de teste; plano; caixa preta × branca; caso de teste |
| Prática guiada | 45 min | Plano de testes de 1 página da loja virtual (SA 1), em trios |
| Intervalo | 15 min | — |
| Prática autônoma | 60 min | 10 casos de teste (login, carrinho, checkout) + matriz de rastreabilidade |
| Dinâmica | 30 min | "Caso vago × caso testável" (abaixo) |
| Socialização e registro | 25 min | Trios defendem 1 risco e 1 caso; síntese no caderno |

## Conteúdo

### 1. Análise do documento de requisitos (6.1)
O teste começa no requisito. Um requisito **testável** tem dado de entrada, condição e resultado
verificável. Um requisito **vago** precisa ser esclarecido antes de virar teste.

| Requisito vago | Pergunta do testador | Requisito testável |
|---|---|---|
| "O login deve ser rápido" | Rápido quanto? Em que rede? | "O login responde em até 2 s em 4G" |
| "A senha deve ser segura" | Quais regras? | "Senha com 8 a 64 caracteres, 1 número e 1 letra maiúscula" |
| "O carrinho calcula o frete" | Com base em quê? | "Frete grátis para compras a partir de R$ 199,00" |

### 2. O processo fundamental de teste (7.1 e 7.2)
O processo tem 5 atividades, que a UC percorre ao longo das aulas:
1. **Planejamento (7.1)** — define objetivo, escopo, estratégia, recursos, cronograma e riscos.
2. **Desenho dos testes (7.2)** — transforma requisitos em condições e casos de teste.
3. Execução (7.3) — aulas 3 a 6.
4. Monitoração e controle (7.4) — aula 7.
5. Avaliação dos resultados (7.5) — aulas 7 e 10.

Nesta aula fazemos as duas primeiras.

### 3. Plano de testes (6.2)

| Seção | O que escrever |
|---|---|
| Informações gerais | Projeto, versão, equipe, datas |
| Escopo | Funcionalidades testadas (ex.: autenticação, carrinho, checkout) |
| Fora do escopo | O que não será testado agora e **por quê** |
| Estratégia | Proporção unitário/integração/E2E e ferramentas (Vitest, Testing Library, Cypress/Playwright) |
| Ambientes e massa de testes | Navegadores, usuários de teste, produtos cadastrados |
| Riscos | Mínimo 3, com probabilidade e impacto (baixo/médio/alto) e mitigação |
| Métricas | Cobertura esperada, defeitos encontrados, testes instáveis |
| Cronograma | Ligação com as aulas 3 a 10 |

**Risco** = probabilidade × impacto. Funcionalidades de alto risco (pagamento, login) recebem mais
casos e mais camadas de teste. Essa é a justificativa técnica das escolhas do plano (S2).

### 4. Técnicas de testes (3.1 e 3.2)

| | Caixa preta — teste funcional (3.1) | Caixa branca — teste estrutural (3.2) |
|---|---|---|
| Olha para | Entradas e saídas, sem ver o código | Os caminhos internos do código |
| Base | Requisitos e especificação da interface | Condições, laços e desvios (`if/else`) |
| Técnicas | Partição de equivalência, valores-limite, tabela de decisão | Cobertura de instruções e de desvios |
| Exemplo | "CEP com 7, 8 e 9 dígitos" | "Testar o `if` do frete no lado verdadeiro e no falso" |

**Partição de equivalência:** divide as entradas em grupos que o sistema trata igual (senha curta,
senha válida, senha longa) e testa um valor de cada grupo. **Valores-limite:** testa as bordas
(7, 8, 64 e 65 caracteres), onde os defeitos aparecem com mais frequência.

### 5. Caso de teste (6.4) e suíte de testes (6.3)

| Campo | Exemplo |
|---|---|
| ID | CT-LOGIN-03 |
| Requisito | RF-02 — Bloquear o acesso após 3 senhas erradas |
| Pré-condição | Usuário `teste@loja.local` cadastrado e desbloqueado |
| Passos | 1. Abrir /login · 2. Informar o e-mail · 3. Errar a senha 3 vezes |
| Dados | Senha `errada123` |
| Resultado esperado | Mensagem "Acesso bloqueado por 15 minutos" e botão Entrar desabilitado |
| Tipo / camada | Funcionalidade (4.1) · E2E |

A **suíte** é o conjunto organizado de casos (por funcionalidade ou por camada). A **matriz de
rastreabilidade** liga cada requisito aos casos que o verificam: requisito sem caso é requisito
sem evidência.

**BDD (refinamento):** o mesmo caso pode ser escrito como `Dado` (pré-condição) · `Quando` (ação)
· `Então` (resultado esperado), linguagem que a equipe toda entende.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, recebeu a especificação do carrinho de uma loja virtual em React: "o
usuário pode alterar a quantidade de cada item; o subtotal é atualizado; acima de R$ 199,00 o frete
é grátis". Seu trabalho:
1. **Requisitos testáveis:** RF-10 alterar quantidade (1 a 10); RF-11 subtotal = preço × quantidade;
   RF-12 frete grátis se subtotal ≥ R$ 199,00.
2. **Valores-limite do RF-12:** R$ 198,99 (paga frete), R$ 199,00 (grátis), R$ 199,01 (grátis).
3. **Risco alto:** cálculo errado do total (impacto alto: cobrança errada). Mitigação: testes
   unitários da função de cálculo + 1 fluxo E2E de checkout.
4. **Fora do escopo:** integração real com a operadora de cartão, por depender de serviço externo
   (justificada no plano).

## Dinâmica — Caso vago × caso testável (30 min, trios)
- **Objetivo:** perceber que um caso de teste só serve quando outra pessoa consegue executá-lo e
  saber se passou (C2, S2).
- **Materiais:** fichas com 6 casos vagos ("testar o login", "ver se o carrinho funciona",
  "conferir o cupom").
- **Passo a passo:** (1) cada trio recebe 2 fichas e as reescreve com ID, pré-condição, passos,
  dados e resultado esperado; (2) os trios trocam as fichas; (3) o trio que recebe tenta
  "executar" o caso só lendo, sem perguntar nada; (4) toda dúvida vira um apontamento na ficha.
- **Fechamento:** o professor junta os apontamentos no quadro e monta a lista "o que todo caso de
  teste precisa ter". Cada trio justifica por que escolheu aqueles dados (S2).

## Situação-problema e entrega da aula
- **SA 1 — Estruturação e documentação de testes (início):** uma startup de e-commerce em React
  não tem estratégia de testes. Para autenticação, carrinho e checkout, o estudante entrega o plano
  formal, no mínimo 5 casos de teste por funcionalidade (caminho feliz e casos de borda, tipo
  U/I/E2E), a matriz de rastreabilidade requisito × caso, a estimativa de esforço e a análise de riscos.
- **Entrega desta aula:** plano de testes de 1 página + 10 casos de teste. O restante da SA 1 é
  retomado na aula 10.

## Verificação da aprendizagem
- Reescrever "o cadastro deve ser fácil" como requisito testável.
- Para "idade entre 16 e 60 anos", listar as partições e os valores-limite.
- Classificar como caixa preta ou branca: "testar o `else` da função de desconto" (branca);
  "digitar e-mail sem @" (preta).
- Apontar o que falta no caso "CT-01: testar o carrinho".

## Recursos
Laboratório de informática, kit multimídia, computador com acesso à internet, pacote de aplicativos
de escritório (modelo do plano e planilha da matriz), fichas da dinâmica, slides
`../AULAS/AULA-02-SLIDES.pdf` (apresentação) e apostila da UC (capítulo 2).
