# Aula 08 — TDD e Debugging Moderno no Frontend

> Texto extraído dos slides `AULAS/AULA-08-SLIDES.pdf` (41 slides), sem as imagens.
> Alguns termos de código já faltam no próprio PDF (ex.: "com .", "()"); o texto foi mantido como está nos slides.
> Testes de Front-End · Técnico em Informática para Internet · gerado em 2026-10-14 10:08 (tarefa #44).

## Slide 1 — TDD e Debugging Moderno no Frontend

Construindo software resiliente com testes primeiro e depuração ágil.

## Slide 2 — E se o Teste Nascesse Antes?

Imagine nunca mais ter medo de refatorar código em produção.

## Slide 3 — Objetivos da Aula

Neste bloco de aprendizagem, você desenvolverá competências essenciais para projetar código confiável desde o primeiro minuto:

Dominar o ciclo Red-Green-Refactor do TDD em cenários reais. Aplicar estratégias de debugging avançado com breakpoints e modo watch.

- Discernir os cenários ideais de aplicação e trade-offs do TDD.

## Slide 4 — Vocabulário Fundamental

Refatoração - Melhorar a estrutura interna do código sem alterar seu comportamento externo.

Ciclo - Sequência iterativa e repetitiva de passos controlados para guiar o design de software.

Depuração - Processo metódico de rastrear, isolar e remover erros lógicos em sistemas de software.

Arquitetura - Estrutura organizacional dos módulos e fluxos de dados de uma aplicação web.

## Slide 5 — Recapitulação: Cobertura de Código

REVISÃO Analisamos relatórios do Istanbul/Vitest. A meta de 85% equilibra qualidade e esforço.

- Cobertura alta não elimina falhas lógicas.

- Gaps em relatórios HTML evitam falsas certezas.

### 🔑 Ponto-chave

Cobertura aponta código não testado, não garante lógica validada.

## Slide 6 — Os Quatro Tipos de Cobertura

Relembre como cada métrica audita diferentes camadas do código-fonte executado:

### 🔍 Exemplo

Line & Statement: Verifica quais linhas físicas e instruções isoladas foram interpretadas pelo motor JavaScript durante a suíte de testes.

### ⚠️ Atenção

Branch & Function: Mede se todas as ramificações de if/else e switch foram percorridas, e se cada função declarada foi de fato invocada.

## Slide 7 — Quiz: Interpretação de Cobertura

Pergunta 1:

Qual métrica garante que ambas as opções de uma condicional if/else foram executadas?

Pergunta 2:

Por que buscar 100% de cobertura frequentemente tem Retorno sobre Investimento (ROI) negativo?

Pergunta 3:

Se um arquivo possui 100% de Line Coverage, ele pode conter bugs em produção?

## Slide 8 — Quiz: Interpretação de Cobertura ✅

Resposta 1:

Branch Coverage (cobertura de ramificação).

Resposta 2:

Porque o esforço para cobrir casos triviais ou código boilerplate consome muito tempo e traz pouco ganho real de confiabilidade.

Resposta 3:

Sim, pois a linha pode ser executada sem que os testes verifiquem valores limítrofes ou dados inválidos inesperados.

## Slide 9 — A Virada de Mentalidade

Desenvolver com TDD inverte o fluxo tradicional: primeiro você define o comportamento esperado como um cliente da API, depois constrói a solução.

## Slide 10 — O que é TDD?

CONCEITO O Test-Driven Development é uma técnica de design de software de Kent Beck, não apenas uma conferência posterior.

- Guiado por iterações com feedback instantâneo.

- Força clareza sobre requisitos antes da lógica.

### 🧠 Lembre-se

O teste é o primeiro usuário do seu código, definindo nomes, parâmetros e retornos ergonômicos.

## Slide 11 — O Ciclo Red-Green-Refactor

O coração do TDD opera em um loop contínuo de três fases rigorosas e disciplinadas:

### 1. Red

Escreva um teste que expresse o requisito e veja-o falhar comprovadamente.

### 2. Green

Escreva o código mais simples possível para fazer o teste passar.

### 3. Refactor

Elimine duplicações e melhore a legibilidade mantendo a barra verde.

## Slide 12 — Fase Red: A Falha Deliberada

CICLO TDD A fase Red valida se o teste funciona e não é um falso positivo.

- O teste deve falhar pelo motivo previsto (ex: função indefinida).

- Garante que a asserção é válida e o requisito é novo.

### ⚠️ Atenção

Nunca implemente código de produção sem antes ver o teste falhar.

## Slide 13 — Fase Green: O Código Mínimo

CICLO TDD Na fase Green, a prioridade é fazer o teste passar rapidamente.

- Soluções literais são válidas (até retornar valores fixos).

- Evite over-engineering antes de consolidar os casos de teste.

### 🔑 Ponto-chave

Não programe cenários futuros; resolva estritamente a falha atual.

## Slide 14 — Fase Refactor: Limpeza Segura

CICLO TDD Com a barra verde assegurando que o comportamento está protegido, podemos aprimorar o código sem receio.

- Extrair variáveis, renomear identificadores e modularizar funções.

- Remover complexidade ciclomática e duplicações de lógica.

### 🧠 Lembre-se

Se um teste quebrar durante a refatoração, a rede de proteção funcionou imediatamente para alertá-lo.

## Slide 15 — Ordenação: Execução do Ciclo TDD

Ordene os passos sequenciais que compõem uma iteração correta de TDD:

Escrever um teste unitário que define a nova regra e vê-lo falhar.

Implementar o código mínimo estritamente necessário para obter sucesso.

Refatorar o código-fonte eliminando duplicações sem alterar comportamento.

Verificar a barra verde indicando que todos os testes foram atendidos.

## Slide 16 — Ordenação: Execução do Ciclo TDD ✅

Ordene os passos sequenciais que compõem uma iteração correta de TDD:

Escrever um teste unitário que define a nova regra e vê-lo falhar.

Implementar o código mínimo estritamente necessário para obter sucesso.

Refatorar o código-fonte eliminando duplicações sem alterar comportamento.

Verificar a barra verde indicando que todos os testes foram atendidos.

1 2 3 4

## Slide 17 — Vantagens Estratégicas do TDD

### Código Testável por Design

Componentes desenvolvidos via TDD nascem com baixo acoplamento e alta coesão, pois módulos difíceis de testar geram atrito imediato no teste.

### Documentação Viva e Atual

A suíte de testes descreve com precisão cirúrgica exatamente o que cada módulo faz, sem defasar como documentações em texto estático.

## Slide 18 — Mitos e Desafios no Frontend

ANÁLISE CRÍTICA TDD no frontend enfrenta mitos e desafios:

Mito: 'TDD dobra o tempo'. Realidade: reduz retrabalho e debugging. Desafio: Testar CSS com TDD é improdutivo; foque em lógica de estado e interação.

### ⚠️ Atenção

Evite testar detalhes visuais; foque em comportamento, acessibilidade e regras de negócio.

## Slide 19 — Checagem: Filosofia do TDD

O TDD exige que você escreva previamente todos os testes da aplicação inteira antes de começar a codificar a primeira função.

### 👍 VERDADE

### IRO

### 👎 FALSO

🤔 Prepare-se para explicar o seu raciocínio.

## Slide 20 — Checagem: Filosofia do TDD ✅

O TDD exige que você escreva previamente todos os testes da aplicação inteira antes de começar a codificar a primeira função.

### 👍 VERDADE

### IRO

### 👎 FALSO

### 🔑 Por que é isso?

O TDD opera em micro-ciclos iterativos: escreve-se um teste pequeno por vez, faz-se passar e refatora-se.

✓

## Slide 21 — Estratégias de Depuração Moderna

DEBUGGING Quando um teste quebra inesperadamente ou uma regra falha, o desenvolvedor precisa de ferramentas analíticas superiores ao simples uso de .

- Depuração metódica reduz horas de investigação frustrante a minutos de inspeção controlada.

- Dominar breakpoints e o ciclo de execução do Node/V8 acelera o diagnóstico de bugs sutis.

## Slide 22 — Breakpoints no VS Code

FERRAMENTAS Utilizar breakpoints pausa o teste na linha desejada:

- Inspecione valores no painel de escopo (Variables Scope).

- Analise a pilha de chamadas (Call Stack) para ver a origem.

- Avalie expressões no Debug Console sem alterar o código.

### 🔍 Exemplo

Use a extensão do VS Code ou a flag -- inspect-brk para debugar nativamente.

## Slide 23 — Modo Watch no Vitest

FERRAMENTAS O Vitest monitora arquivos via grafo de dependências, reexecutando apenas testes impactados.

- Ciclo de feedback rápido durante o TDD.

- Filtro interativo de arquivos via atalhos no terminal.

- Mantém o foco sem alternar para o terminal.

### 🧠 Lembre-se

O comando roda em modo watch por padrão, reagindo a cada arquivo salvo.

## Slide 24 — Isolamento de Cenários com Vitest

Em suítes com centenas de testes, isolar o caso sob investigação é indispensável:

### 🔑 Ponto-chave

test.only('cenário', () => {...}): Foca exclusivamente neste teste ou bloco describe, ignorando todos os demais na suíte temporariamente.

### ⚠️ Atenção

test.skip('cenário', () => {...}): Pula temporariamente um teste quebrado ou em construção enquanto você investiga outras partes do sistema.

## Slide 25 — Time-Travel Debugging em E2E

DEBUGGING Ferramentas como Cypress/Playwright gravam cada evento do navegador:

Time-Travel: Navegue pelo histórico e veja a UI antes/depois de cada ação. Snapshots: Inspecione requisições HTTP e logs no exato milissegundo da falha.

### 🤯 Curiosidade

O time-travel elimina a necessidade de adivinhar estados que causam falhas intermitentes (flakiness).

## Slide 26 — TDD na Prática em Vídeo

Veja o ciclo Red-Green-Refactor no editor:

## Slide 27 — Prática 1: Validador de CPF via TDD

DESAFIO PRÁTICO Vamos construir uma função robusta aplicando estritamente o ciclo TDD.

- O algoritmo do CPF brasileiro valida formato, dígitos repetidos e dois dígitos verificadores matemáticos.

- Começaremos pelo caso mais elementar e avançaremos progressivamente.

## Slide 28 — CPF Passo 1: O Teste Vazio (Red)

CICLO TDD Iniciamos com o caso nulo ou inválido mais imediato no arquivo de teste:

Ao executar, o Vitest falha com .

### 🔑 Ponto-chave

Temos nosso primeiro teste Red legítimo confirmando que a função nem sequer existe.

## Slide 29 — CPF Passo 2: O Verde Mínimo (Green)

CICLO TDD Criamos a implementação mínima no arquivo :

O teste agora passa instantaneamente com barra verde no terminal.

### 🧠 Lembre-se

Ainda não implementamos cálculo matemático complexo; resolvemos somente o que o teste exigiu.

## Slide 30 — CPF Passo 3: Tamanho e Dígitos Iguais

CICLO TDD Adicionamos novos testes para CPFs com formatos incorretos e dígitos repetidos como '111.111.111-11':

O teste falha (Red), e então implementamos regex de limpeza e validação de sequência repetida (Green).

## Slide 31 — CPF Passo 4: Dígitos Verificadores

Finalmente, testamos o cálculo matemático dos dois dígitos verificadores reais:

### 🔍 Exemplo

Novo Caso de Teste (Red):

expect(validarCPF('52998224725')). toBe(true);

expect(validarCPF('52998224726')). toBe(false);

### 🧠 Lembre-se

Refatoração (Refactor):

Extraímos o algoritmo de soma ponderada e módulo 11 em uma função utilitária pura interna .

## Slide 32 — Prática 2: Filtro Dinâmico no Frontend

DESAFIO PRÁTICO Agora aplicaremos o TDD para um componente de interface: um campo de busca que filtra uma lista de produtos por título e categoria.

Utilizaremos  ou DOM puro com Vitest.

- O teste simula o comportamento de digitação do usuário e valida os nós visíveis.

### 🔑 Ponto-chave

Não testamos o estado interno do componente; testamos o que o usuário enxerga após digitar.

## Slide 33 — Ciclo do Filtro de Produtos

### 1. Teste Red

Renderizar lista com 3 itens e disparar digitação 'Teclado'; esperar 1 item visível.

### 2. Código Green

Implementar input com event listener básico e filtro simples.

### 3. Refactor Seguro

Adicionar debounce para performance e normalização de maiúsculas/acentos sem quebrar o teste.

## Slide 34 — Quando Usar e Quando Evitar TDD?

### 🔍 Exemplo

Quando Adotar TDD: Regras de negócio complexas, cálculos, validações de formulário, parsers de dados e utilitários de alta criticidade.

### ⚠️ Atenção

Quando Evitar TDD: Prototipação rápida (PoCs), ajustes puramente estéticos de CSS e exploração de bibliotecas gráficas desconhecidas.

## Slide 35 — Associação de Conceitos e Ferramentas

Relacione as palavras com as definições Red-Green- Refactor Time-Travel Breakpoint test.only() Método do Vitest para executar exclusivamente um cenário específico sob depuração.

Recurso do Cypress/Playwright que permite navegar pelos estados do DOM gravados em cada etapa.

Instrução do depurador no VS Code que pausa a execução na linha indicada para inspeção.

Ciclo disciplinado de escrever o teste que falha, codificar a solução e limpar o código.

## Slide 36 — Associação de Conceitos e Ferramentas ✅

Relacione as palavras com as definições Red-Green- Refactor Time-Travel Breakpoint test.only() Método do Vitest para executar exclusivamente um cenário específico sob depuração.

Recurso do Cypress/Playwright que permite navegar pelos estados do DOM gravados em cada etapa.

Instrução do depurador no VS Code que pausa a execução na linha indicada para inspeção.

Ciclo disciplinado de escrever o teste que falha, codificar a solução e limpar o código.

D B C A

## Slide 37 — Debate: O Custo de Começar com Testes

Muitos times alegam que adotar TDD em projetos de startups desacelera a entrega inicial de funcionalidades. Sob o ponto de vista de arquitetura e custos de longo prazo, esse argumento se sustenta?

## Slide 38 — Debate: O Custo de Começar com Testes ✅

Você poderia ter dito...

A favor do TDD: O tempo na concepção reduz bugs em produção, refatorações emergenciais e custos de suporte.

Contra o TDD em PoC: Se requisitos mudam diariamente, testes prévios podem ser descartados em excesso.

## Slide 39 — Síntese dos Aprendizados

REVISÃO Consolidamos competências essenciais:

TDD: molda o design antes da implementação. Ciclo Red-Green-Refactor: valida requisitos, satisfaz necessidades e garante longevidade. Depuração: breakpoints e modo watch substituem intuição por observação metódica.

### 🧠 Lembre-se

Próxima aula: integraremos testes à esteira de CI/CD com GitHub Actions.

## Slide 40 — Avaliação Final: O Ciclo TDD

Qual é a principal justificativa técnica para exigir que um teste falhe (fase Red) antes de escrever o código de produção correspondente?

1. Calcular a métrica de cobertura de código no relatório Istanbul com maior velocidade.

2. Forçar o navegador a reiniciar a compilação do bundle JavaScript no Vite.

3. Garantir que a documentação HTML do projeto seja gerada automaticamente na nuvem.

4. Comprovar que o teste é sensível à funcionalidade e não passa por um falso positivo.

## Slide 41 — Avaliação Final: O Ciclo TDD ✅

Qual é a principal justificativa técnica para exigir que um teste falhe (fase Red) antes de escrever o código de produção correspondente?

1. Calcular a métrica de cobertura de código no relatório Istanbul com maior velocidade.

2. Forçar o navegador a reiniciar a compilação do bundle JavaScript no Vite.

3. Garantir que a documentação HTML do projeto seja gerada automaticamente na nuvem.

4. Comprovar que o teste é sensível à funcionalidade e não passa por um falso positivo.

✓
