# Aula 03 — Testes Unitários no Frontend com Vitest

> Texto extraído dos slides `AULAS/AULA-03-SLIDES.pdf` (41 slides), sem as imagens.
> Alguns termos de código já faltam no próprio PDF (ex.: "com .", "()"); o texto foi mantido como está nos slides.
> Testes de Front-End · Técnico em Informática para Internet · gerado em 2026-10-14 10:08 (tarefa #44).

## Slide 1 — Testes Unitários no Frontend com Vitest

Automação rápida, isolamento e qualidade técnica de software moderno.

## Slide 2 — O Desafio do Código Invisível

Se você altera uma única função no frontend hoje, como ter certeza absoluta de que o checkout de pagamentos não parou de funcionar sem clicar em toda a interface manualmente?

## Slide 3 — Objetivos de Aprendizagem

### Metas da Aula

Nesta aula prática, você dominará pilares de testes:

Configurar Vitest em projetos Node.js/npm. Estruturar testes com o padrão AAA. Implementar matchers, mocks e spies.

### 🧠 Lembre-se

Testes unitários são a base da pirâmide: rápidos e essenciais para refatorações seguras.

## Slide 4 — Vocabulário Essencial

Unitário: Teste focado na menor parte testável de código de forma isolada.

Matcher: Método de asserção que valida se o resultado obtido equivale ao esperado.

Isolamento: Técnica que separa a unidade sob teste de dependências como rede e banco.

Simulação: Substituição programada de comportamentos reais (APIs, timers) por réplicas.

## Slide 5 — Recapitulação: Verificação e Validação

### Verificação

Responde à pergunta: O produto está sendo construído corretamente? Foca na conformidade com especificações técnicas e regras de arquitetura.

### Validação

Responde à pergunta: Estamos construindo o produto certo? Avalia se o sistema atende às necessidades reais do usuário final e regras de negócio.

## Slide 6 — Recapitulação: Plano e Casos BDD

PLANEJAMENTO Formalizamos o plano de testes e convertemos requisitos em BDD:

Given: Estado inicial do sistema. When: Ação do usuário ou evento. Then: Resultado esperado e mensurável.

### 🔑 Ponto-chave

Casos BDD mapeiam diretamente para describe() e it() do Vitest.

## Slide 7 — Quiz: Verificação e Planejamento

Pergunta 1:

Qual é a principal distinção entre Verificação e Validação no ciclo de testes?

Pergunta 2:

No padrão BDD (Behavior Driven Development), o que define a cláusula 'When'?

Pergunta 3:

Por que a base da Pirâmide de Testes é composta primariamente por testes unitários?

## Slide 8 — Quiz: Verificação e Planejamento ✅

Resposta 1:

Verificação checa se o software segue as especificações técnicas, enquanto validação checa se ele resolve o problema real do usuário.

Resposta 2:

A ação ou evento específico disparado que altera o estado do sistema.

Resposta 3:

Porque são os testes mais rápidos de executar, mais fáceis de isolar e com menor custo de manutenção.

## Slide 9 — Apresentando o Vitest

FERRAMENTA O Vitest é um test runner moderno para Vite. Usa o mesmo pipeline de transformação, superando a lentidão de ferramentas legadas.

Velocidade: Compilação sob demanda com ES Modules. Compatibilidade: API idêntica ao Jest. Watch Mode: Re-execução em milissegundos.

### 🤯 Curiosidade

Executa testes TypeScript nativamente sem compilação intermediária.

## Slide 10 — Arquitetura e Velocidade do Vitest

Veja como o Vitest transforma o fluxo de trabalho do desenvolvedor ao unificar configuração e compilação em um ecossistema veloz.

A execução multithread paralela reduz suites de dezenas de segundos para milissegundos.

## Slide 11 — Configuração do Ambiente

A inicialização de um projeto moderno de testes requer apenas quatro etapas padronizadas via terminal:

### Inicializar npm

Execute para criar o package.json estruturado.

### Instalar Vitest

Adicione o pacote com .

### Configurar

### Scripts

Adicione dentro da chave .

### Executar Suite

Rode para disparar o watcher interativo.

## Slide 12 — Estrutura do package.json

CONFIGURAÇÃO O arquivo gerencia as dependências de desenvolvimento e os comandos executáveis do seu projeto.

O atributo  habilita import/export nativo do ES6.

- O script de teste permite que ferramentas de Integração Contínua (CI) executem sua validação com comando padronizado.

### 🔍 Exemplo

No package.json: defina para rodar os testes uma única vez na esteira de CI.

## Slide 13 — Convenções de Nomenclatura

ORGANIZAÇÃO O Vitest detecta arquivos de teste automaticamente via convenções:

- : Padrão para testes unitários.

- : Usado para especificações de comportamento. Pasta : Para agrupar suites complexas.

### 🔑 Ponto-chave

Mantenha ao lado de para facilitar a manutenção.

## Slide 14 — Sintaxe Base: describe, it e test

### describe(titulo, fn)

Agrupa um conjunto de testes correlacionados. Cria uma suite lógica que contextualiza o módulo ou componente avaliado.

### it(descricao, fn) ou test()

Declara um caso de teste individual. O nome estimula a leitura semântica: 'it should calculate total price with discount'.

## Slide 15 — A Função expect() e Asserções

SINTAXE A asserção é o veredito do teste. encapsula o dado e expõe matchers.

- Se a condição for atendida, o teste passa (verde).

- Se divergir, o Vitest interrompe o bloco e exibe o diff exato no terminal.

### 🧠 Lembre-se

Nunca crie um teste sem expect(). Testes sem asserção geram falsa segurança.

## Slide 16 — O Padrão AAA: Estrutura Universal

O padrão Arrange-Act-Assert organiza o raciocínio em três etapas lineares e previsíveis:

### Arrange (Preparar)

Configura os dados de entrada, variáveis e mocks necessários.

### Act (Agir)

Executa a função ou método específico sob validação.

### Assert (Validar)

Verifica se o retorno e efeitos colaterais atendem à expectativa.

## Slide 17 — Dissecando o Padrão AAA em Código

### Exemplo de Teste de Cálculo de Desconto

Manter comentários ou separação visual explícita entre as três fases torna o código autoexplicativo para qualquer colega de equipe.

### 🔑 Ponto-chave

Mantenha a fase 'Act' em uma única linha sempre que possível para garantir foco na ação testada.

## Slide 18 — Ordem dos Fatos: Ciclo AAA

Ordene as etapas canônicas de execução de um teste unitário segundo o padrão AAA:

Comparar o valor retornado contra o matcher esperado com expect (Assert) Liberar instâncias e registrar o relatório de cobertura na suite Definir constantes de entrada e instanciar os dados iniciais (Arrange) Invocar a função de negócio repassando os parâmetros preparados (Act)

## Slide 19 — Ordem dos Fatos: Ciclo AAA ✅

Ordene as etapas canônicas de execução de um teste unitário segundo o padrão AAA:

Comparar o valor retornado contra o matcher esperado com expect (Assert) Liberar instâncias e registrar o relatório de cobertura na suite Definir constantes de entrada e instanciar os dados iniciais (Arrange) Invocar a função de negócio repassando os parâmetros preparados (Act) 1 2 3 4

## Slide 20 — Matchers de Igualdade: toBe vs toEqual

### toBe()

Verifica igualdade estrita de referência ou valor primitivo (). Ideal para comparar números, strings e booleanos.

### toEqual()

Realiza comparação profunda de estruturas (deep equality). Essencial para objetos, arrays e coleções complexas.

## Slide 21 — Armadilha Clássica: Referência de Objetos

BOAS PRÁTICAS Objetos literais em JS nunca compartilham a mesma referência, mesmo com chaves e valores idênticos.

-> FALHA (endereços distintos). -> SUCESSO (conteúdo idêntico).

### ⚠️ Atenção

Usar toBe() em arrays/objetos é o erro mais comum de iniciantes.

## Slide 22 — Matchers de Estado e Coleções

toBeNull() - Verifica se o valor é , ideal para buscas sem resultados.

toBeDefined() - Confirma que a variável foi inicializada e não é .

toContain() - Checa se um item existe em um array ou se um texto contém substring.

toBeGreaterThan() - Valida comparações numéricas, útil para limites mínimos.

## Slide 23 — Checagem de Matchers

Qual asserção deve ser usada para conferir se a lista de permissões ['ADMIN', 'EDITOR'] contém a role 'ADMIN'?

1. expect(permissoes).toContain('ADMIN')

2. expect(permissoes).toEqual('ADMIN')

3. expect(permissoes).toBeDefined('ADMIN')

4. expect(permissoes).toBe('ADMIN')

## Slide 24 — Checagem de Matchers ✅

Qual asserção deve ser usada para conferir se a lista de permissões ['ADMIN', 'EDITOR'] contém a role 'ADMIN'?

1. expect(permissoes).toContain('ADMIN')

2. expect(permissoes).toEqual('ADMIN')

3. expect(permissoes).toBeDefined('ADMIN')

4. expect(permissoes).toBe('ADMIN') ✓

## Slide 25 — O Conceito de Mock e Espião

ISOLAMENTO Funções reais dependem de fatores externos: rede, relógio ou alertas.

- APIs externas tornam testes lentos e instáveis.

- Mocks e Spies interceptam chamadas, devolvendo respostas controladas e imediatas.

### 🔑 Ponto-chave

Substitua chamadas assíncronas por simulações determinísticas em testes unitários.

## Slide 26 — Simulando Funções com vi.fn()

### O que faz vi.fn()?

Cria uma função simulada que memoriza quantas vezes foi chamada, quais argumentos recebeu e qual valor ela deve devolver sob demanda.

### Validação com toHaveBeenCalled

Podemos validar: ou verificar o argumento exato com .

## Slide 27 — Monitorando Métodos com vi.spyOn()

ISOLAMENTO Diferente de que gera uma função do zero, envolve um método já existente em um objeto real.

Permite observar se o método ou foi acionado pela sua função. Permite sobrescrever temporariamente o comportamento real usando ou .

### 🧠 Lembre-se

Sempre chame vi.restoreAllMocks() após cada teste para evitar contaminação entre suites.

## Slide 28 — Vitest na Prática: Demonstração em Vídeo

Configuração do Vitest e uso de matchers essenciais.

## Slide 29 — Prática 1: Funções Utilitárias

### Especificação das 5 Funções para Teste

Vamos implementar e exercitar suites de testes unitários para o módulo :

1.: Retorna booleano conferindo presença de @ e domínio válido. 1.: Retorna valor fixo se menor que 10km, ou taxa por km excedente. : Formata centavos em string pt-BR padronizada ().

1.: Devolve lista purificada com itens únicos usando Set. 1.: Extrai as duas primeiras letras capitais dos nomes principais.

### 🔑 Ponto-chave

Cada teste deve explorar o caminho feliz e ao menos um caso de borda (ex.: valores nulos ou strings vazias).

## Slide 30 — Implementação da Prática 1

### Código da Suite (testes 1 a 3) Código da Suite (testes 4 e 5)

## Slide 31 — Atividade Prática 1: Execução

Abra seu terminal no diretório do projeto e implemente o arquivo com os 5 cenários listados no slide anterior. Em seguida execute e garanta que todos os 5 testes passem com 100% de sucesso. Identifique no console qual matcher foi responsável por validar cada um dos 5 tipos de dados (primitivo, array, string e nulo).

## Slide 32 — Prática 2: Mocks em Funções Assíncronas

### Cenário: Buscar Usuário via API Externa

Considere a função que faz uma requisição HTTP assíncrona. Jamais devemos disparar conexões de rede em testes unitários. Veja a montagem do mock com :

### 1. Preparação (Arrange) 2. Ação e Asserção (Act & Assert)

## Slide 33 — Atividade Prática 2: Mock de API

Implemente uma suite de testes que valida uma função assíncrona de autenticação . Utilizando , teste o comportamento de erro do sistema quando o servidor recusa o login. Assegure-se de verificar se a função lida adequadamente com o erro usando .

## Slide 34 — Armadilhas Comuns em Testes Unitários

BOAS PRÁTICAS Evite testes frágeis ou intermitentes (flaky):

Ordem: Testes devem ser independentes. Estado: Limpe variáveis globais entre execuções. Foco: Teste comportamento, não detalhes internos.

### ⚠️ Atenção

Testes frágeis perdem a confiança e inutilizam a automação.

## Slide 35 — Ciclo de Vida: beforeEach e afterEach

### beforeEach()

Executado antes de cada teste individual da suite. É o local perfeito para redefinir objetos, recriar instâncias e inicializar bancos em memória.

### afterEach()

Executado logo após o término de cada teste. Utilizado para chamar e remover timers pendentes que possam poluir o ambiente.

## Slide 36 — Conceito: Isolamento de Testes

Um teste unitário ideal deve depender da execução bem-sucedida do teste anterior para reaproveitar os dados criados no banco.

### 👍 VERDADE

### IRO

### 👎 FALSO

🤔 Prepare-se para explicar o seu raciocínio.

## Slide 37 — Conceito: Isolamento de Testes ✅

Um teste unitário ideal deve depender da execução bem-sucedida do teste anterior para reaproveitar os dados criados no banco.

### 👍 VERDADE

### IRO

### 👎 FALSO

### 🔑 Por que é isso?

Cada teste unitário precisa ser 100% independente e isolado, garantindo execução em qualquer ordem ou em paralelo.

✓

## Slide 38 — Consolidação de Conceitos Vitest

Relacione as palavras com as definições vi.spyOn vi.fn toBe toEqual Envolve e observa um método já existente em um objeto real.

Matcher para comparação de valores primitivos e igualdade estrita.

Cria uma função simulada para rastrear chamadas e retornos programados.

Matcher para verificação estrutural e profunda de objetos ou arrays.

## Slide 39 — Consolidação de Conceitos Vitest ✅

Relacione as palavras com as definições vi.spyOn vi.fn toBe toEqual Envolve e observa um método já existente em um objeto real.

Matcher para comparação de valores primitivos e igualdade estrita.

Cria uma função simulada para rastrear chamadas e retornos programados.

Matcher para verificação estrutural e profunda de objetos ou arrays.

A C B D

## Slide 40 — Debate: Quanto Devemos Mockar?

Se usarmos mocks em todas as dependências, garantimos testes rápidos. Porém, qual o perigo de simularmos código demais em nossa suite de frontend?

## Slide 41 — Debate: Quanto Devemos Mockar? ✅

Você poderia ter dito...

O risco é criar falsos positivos: o teste unitário passa com sucesso usando mocks ideais, mas em produção o contrato real da API mudou e a interface quebra.

Por isso, testes unitários com mocks devem ser equilibrados com testes de integração reais (Bloco 04 da nossa ementa).
