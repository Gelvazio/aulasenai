# Aula 02 — Planejamento, Verificação, Validação e Casos de Teste

> Texto extraído dos slides `AULAS/AULA-02-SLIDES.pdf` (42 slides), sem as imagens.
> Alguns termos de código já faltam no próprio PDF (ex.: "com .", "()"); o texto foi mantido como está nos slides.
> Testes de Front-End · Técnico em Informática para Internet · gerado em 2026-10-14 10:08 (tarefa #44).

## Slide 1 — Planejamento, Verificação, Validação e Casos de Teste

Qualidade de software com estratégias ágeis e padrões internacionais.

## Slide 2 — O Custo Oculto de uma Falha

Se o código compila perfeitamente sem erros técnicos, podemos garantir que o software atende ao que o cliente precisa?

## Slide 3 — Objetivos da Aula de Hoje

METAS

### Metas de Aprendizagem

Diferenciar os conceitos de Verificação e Validação no ciclo de desenvolvimento. Elaborar uma estrutura formal de Plano de Testes alinhada aos padrões de mercado. Escrever e documentar Casos de Teste padronizados e cenários BDD rastreáveis.

## Slide 4 — Vocabulário Essencial de QA

Verificação - Avaliar se o software foi construído conforme as especificações técnicas.

Validação - Confirmar se o produto atende às necessidades e expectativas do usuário.

Requisito - Condição ou funcionalidade obrigatória descrita para o comportamento do sistema.

Critério - Parâmetro objetivo e mensurável usado para aceitar uma funcionalidade.

## Slide 5 — Revisando a Pirâmide de Testes

REVISÃO

### Proporção Ideal

60% Unitários: Isolados, rápidos (<100ms), baixo custo. 30% Integração: Valida comunicação entre módulos. 10% E2E: Simula fluxos completos do usuário.

### 🧠 Lembre-se

Pirâmide invertida gera testes lentos e instáveis.

## Slide 6 — O Ciclo de Vida do Teste (STLC)

PROCESSO

### Da Concepção ao Fechamento

O Software Testing Life Cycle (STLC) estrutura a atividade de testes em fases sequenciais e iterativas:

Planejamento: Definição do escopo, cronograma, riscos e alocação de ferramentas. Design & Execução: Escrita dos casos de teste e validação prática em ambiente controlado. Avaliação: Emissão de relatórios de cobertura e liberação de versão para deploy.

## Slide 7 — Quiz Rápido: Fundamentos de Teste

Pergunta 1:

Qual é a porcentagem recomendada de testes unitários na pirâmide tradicional?

Pergunta 2:

Em qual fase do STLC ocorre a elaboração do plano de testes e análise de riscos?

Pergunta 3:

Qual camada da pirâmide possui a execução mais lenta e o maior custo de manutenção?

## Slide 8 — Quiz Rápido: Fundamentos de Teste ✅

Resposta 1:

Aproximadamente 60% da suite total de testes.

Resposta 2:

Na fase de Planejamento (Planning).

Resposta 3:

A camada de Testes End-to-End (E2E).

## Slide 9 — Verificação versus Validação

### Verificação

Pergunta: 'O produto foi construído corretamente?'

- Foco: Conformidade com arquitetura e sintaxe.

- Atividade: Preventiva durante o desenvolvimento.

### Validação

Pergunta: 'Estamos construindo o produto certo?'

- Foco: Experiência do usuário e fluxos de negócio.

- Atividade: Avaliativa com produto funcional.

## Slide 10 — Análise Crítica: Regras versus Expectativas

Um sistema pode passar com 100% de sucesso na verificação técnica e ainda assim falhar completamente na validação.

### 👍 VERDADE

### IRO

### 👎 FALSO

🤔 Prepare-se para explicar o seu raciocínio.

## Slide 11 — Análise Crítica: Regras versus Expectativas ✅

Um sistema pode passar com 100% de sucesso na verificação técnica e ainda assim falhar completamente na validação.

### 👍 VERDADE

### IRO

### 👎 FALSO

### 🔑 Por que é isso?

O código pode seguir fielmente as especificações técnicas descritas, mas atender a requisitos incorretos que frustram o usuário.

✓

## Slide 12 — Papéis no Ciclo: Dev versus QA

### Papel do Desenvolvedor

Foco na Verificação técnica.

- Cria testes unitários e de integração.

- Aplica código limpo e executa builds.

### Papel do Analista de QA

Foco na Validação e experiência.

- Cria planos, cenários e testes E2E.

- Mapeia riscos, usabilidade e requisitos.

## Slide 13 — O Plano de Testes na Indústria

DOCUMENTAÇÃO

### Diretrizes da ISO/IEC/IEEE 29119

O Plano de Testes é o documento formal que orquestra todo o processo de qualidade em um projeto corporativo. Ele estabelece limites operacionais claros, evitando retrabalho e surpresas antes do lançamento em produção.

### 🔑 Ponto-chave

Sem um plano estruturado, o time testa funcionalidades de forma reativa e desorganizada.

## Slide 14 — Pilares de um Plano de Testes

Escopo e Itens - Define funcionalidades cobertas e excluídas nesta iteração.

Estratégia - Níveis, tipos (manual/automátic o/regressão) e frameworks técnicos.

Ambientes e Dados - Infraestrutura, navegadores e massa de dados necessária.

Critérios de Saída - Métricas e índices mínimos para liberação em produção.

## Slide 15 — Definindo o Escopo: In versus Out

PLANEJAMENTO

### Clareza nas Fronteiras

Testar tudo é inviável. O escopo deve definir:

In Scope: Login, validação de campos, recuperação de senha. Out of Scope: Login social (Google/GitHub), biometria mobile.

### ⚠️ Atenção

Documente o que está fora do escopo para alinhar expectativas.

## Slide 16 — Gestão e Matriz de Riscos

ESTRATÉGIA

### Impacto versus Probabilidade

O plano de testes deve priorizar fluxos críticos de negócio. A equipe calcula a prioridade a partir da fórmula:

Falhas no checkout de pagamento possuem prioridade máxima, enquanto pequenos desalinhamentos visuais em rodapés possuem prioridade moderada.

## Slide 17 — Ambientes e Massa de Testes

INFRAESTRUTURA

### Isolamento e Reprodutibilidade

Os testes nunca devem ser conduzidos diretamente no banco de dados de produção. Configura-se um ambiente de Staging (homologação) idêntico à produção, abastecido com massa de dados controlada (fixtures, usuários simulados e cartões de crédito para sandbox).

## Slide 18 — Métricas de Qualidade em QA

INDICADORES

### Medindo o Sucesso da Suite

Indicadores essenciais acompanhados em relatórios técnicos:

Pass Rate: Percentual de testes executados com aprovação (meta ideal: 100%). Defect Density: Quantidade de defeitos identificados por 1.000 linhas de código. Flakiness Rate: Taxa de testes intermitentes que oscilam entre sucesso e falha sem alterações no código.

## Slide 19 — Verificação de Aprendizado: Escopo

Por que é indispensável documentar itens 'Fora de Escopo' (Out of Scope) em um Plano de Testes?

1. Para impedir que a equipe de desenvolvimento codifique o sistema.

2. Para dispensar totalmente a realização de testes de integração.

3. Para eliminar a necessidade de criar massa de dados de teste.

4. Para alinhar expectativas e evitar cobranças de testes não planejados.

## Slide 20 — Verificação de Aprendizado: Escopo ✅

Por que é indispensável documentar itens 'Fora de Escopo' (Out of Scope) em um Plano de Testes?

1. Para impedir que a equipe de desenvolvimento codifique o sistema.

2. Para dispensar totalmente a realização de testes de integração.

3. Para eliminar a necessidade de criar massa de dados de teste.

4. Para alinhar expectativas e evitar cobranças de testes não planejados.

✓

## Slide 21 — Anatomia de um Caso de Teste

PADRONIZAÇÃO

### Estrutura ISO 29119

Casos de teste claros evitam ambiguidades. Essenciais:

ID: Identificador único (ex: ) Título: Objetivo da validação Pré-requisitos: Condições iniciais Passos: Roteiro de ações Resultado: Comportamento esperado

## Slide 22 — Exemplo Prático: Caso de Teste

### Caso de Teste: Login com Sucesso ()

Pré-requisitos: Usuário cadastrado no banco (), senha válida e servidor ativo.

Acessar a página '/login'.

Preencher email e senha válidos.

Clicar no botão 'Entrar'.

Redirecionar para dashboard e exibir saudação.

## Slide 23 — Boas Práticas na Redação de Passos

### ⚠️ Atenção

Passos Vagos: 'Tente fazer login com uma senha errada e veja se dá erro.' Esse formato gera dúvidas e testes inconsistentes.

### Erros Frequentes

- Não especificar a senha utilizada.

- Não definir em qual elemento a mensagem de erro deve aparecer.

- Omitir o estado inicial dos dados.

### 🔑 Ponto-chave

Passos Claros: '1. Inserir email válido. 2. Inserir senha "123". 3. Clicar em Entrar. 4. Validar mensagem "Credenciais inválidas".'

### Padrão Recomendado

- Utilizar verbos no infinitivo ou imperativo.

- Informar dados exatos de entrada.

- Declarar mensagens textuais e rotas esperadas.

## Slide 24 — Rastreabilidade de Requisitos

GOVERNANÇA

### A Matriz de Rastreabilidade (RTM)

A rastreabilidade conecta cada Requisito (RF) aos seus Casos de Teste (TC) e defeitos. Se um requisito muda, a matriz indica quais testes devem ser atualizados.

### 🧠 Lembre-se

Requisito sem caso de teste é uma funcionalidade sem garantia de qualidade.

## Slide 25 — Matriz de Rastreabilidade em Ação

RF-01: Cadastro de Usuário - Coberto por (dados válidos) e (email duplicado). Status: 100% Coberto.

RF-02: Recuperação de Senha - Coberto por (envio de token por e- mail). Status: 100% Coberto.

RF-03: Cupom de Desconto - Coberto por (cupom válido) e (cupom expirado). Status: 100% Coberto.

## Slide 26 — Sequência de Execução de um Teste

Ordene as etapas canônicas na execução e registro de um caso de teste:

Comparar o resultado obtido na tela com o resultado esperado do caso.

Verificar se os pré-requisitos e massa de dados estão prontos no ambiente.

Registrar o status de aprovação ou abrir um relatório de defeito com evidências.

Executar os passos de teste descritos na especificação formal.

## Slide 27 — Sequência de Execução de um Teste ✅

Ordene as etapas canônicas na execução e registro de um caso de teste:

Comparar o resultado obtido na tela com o resultado esperado do caso.

Verificar se os pré-requisitos e massa de dados estão prontos no ambiente.

Registrar o status de aprovação ou abrir um relatório de defeito com evidências.

Executar os passos de teste descritos na especificação formal.

1 2 3 4

## Slide 28 — Introdução ao BDD e Gherkin

METODOLOGIA

### Behavior-Driven Development

O BDD aproxima desenvolvedores, analistas de QA e clientes de negócio ao descrever comportamentos em linguagem natural estruturada:

Linguagem Ubíqua: Vocabulário comum compartilhado por todo o time. Sintaxe Gherkin: Estruturação através das cláusulas Dado, Quando e Então. Especificação Viva: O cenário serve simultaneamente como documentação e teste automatizado.

## Slide 29 — O Padrão Dado, Quando e Então

### Dado (Given)

Define o estado inicial do sistema. Exemplo: Dado que o cliente está logado com itens no carrinho.

### Quando e Então

Quando (When): A ação do usuário. Então (Then): O resultado esperado. Exemplo: Quando clica em Finalizar, Então o pedido é gerado.

## Slide 30 — BDD no Frontend: Da Escrita ao Código

INTEGRAÇÃO

### Automação Direta

No web, passos Gherkin mapeiam para seletores e asserções:

- ->

- ->

- ->

### 🔍 Exemplo

O BDD documenta regras e guia a automação com Cypress ou Playwright.

## Slide 31 — Vídeo: BDD e Critérios de Aceitação

Assista: estruturar critérios BDD para vincular especificações a testes.

## Slide 32 — Preencha as Lacunas: Sintaxe BDD

No BDD com Gherkin, o termo ____ define o contexto inicial, ____ representa a ação do usuário e ____ descreve o resultado esperado.

Banco de palavras 🏦 Quando Dado Validação Então Escopo Verificação

## Slide 33 — Preencha as Lacunas: Sintaxe BDD ✅

No BDD com Gherkin, o termo Dado define o contexto inicial, Quando representa a ação do usuário e Então descreve o resultado esperado.

Banco de palavras 🏦 Quando Dado Validação Então Escopo Verificação

## Slide 34 — Atividade Prática 1: Casos de Teste

OFICINA

### Redigindo Especificações ISO 29119

Agora você aplicará as diretrizes em uma funcionalidade real de e-commerce. No próximo slide, você escreverá formalmente 3 casos de teste cobrindo fluxos essenciais de autenticação.

### 🧠 Lembre-se

Lembre-se de incluir: ID, Título, Pré- requisitos, Passos numerados e Resultado Esperado.

## Slide 35 — Desafio 1: Escrever 3 Casos de Teste

Elabore 3 casos de teste padronizados para o módulo de Login de uma aplicação web:

1.: Autenticação com credenciais válidas (caminho feliz). 1.: Tentativa de login com senha incorreta (tratamento de erro). 1.: Submissão com campo de email em branco (validação de formulário frontend).

Para cada caso, especifique: ID, Título, Pré-requisito, Passos numerados (1, 2, 3...) e Resultado Esperado verificável.

## Slide 36 — Atividade Prática 2: Refinamento BDD

OFICINA

### Da Ambiguidade à Precisão Técnica

Requisitos do cliente frequentemente chegam à equipe como frases vagas: 'O carrinho de compras deve funcionar direito e calcular o frete certinho.' Como QA, seu papel é transformar essa ideia solta em cenários BDD objetivos com regras explícitas e mensuráveis.

## Slide 37 — Desafio 2: Refinando para BDD

Cenário 1: Frete grátis acima de R$ 200 Dado que o carrinho soma R$ 200,01 Quando finalizo a compra Então o frete é gratuito Cenário 2: Produto sem estoque Dado que o produto está esgotado Quando tento adicioná-lo Então vejo aviso de indisponível

## Slide 38 — Debate: Clareza na Documentação

Se um caso de teste foi escrito de forma apressada e ambígua, quais são os impactos reais para a equipe de desenvolvimento e para o usuário final durante a correção de um bug crítico?

## Slide 39 — Debate: Clareza na Documentação ✅

Você poderia ter dito...

Contribuições para o debate:

- Devs perdem tempo sem passos ou dados claros para bugs.

- Falhas sem reprodução podem seguir para produção.

- Casos ambíguos elevam retrabalho e prejudicam testes.

## Slide 40 — Avaliação Final: Fundamentos de Teste

Selecione todas as afirmações verdadeiras sobre planejamento, verificação, validação e casos de teste (mais de uma opção está correta):

1. A Matriz de Rastreabilidade assegura que cada requisito funcional possua casos de teste associados.

2. A Verificação analisa se o código segue as especificações, enquanto a Validação garante que o produto resolve a necessidade do usuário.

3. O Plano de Testes dispensa a definição de riscos e ambientes de homologação se a equipe utilizar metodologias ágeis.

4. O BDD utiliza Dado, Quando e Então para criar cenários em linguagem acessível e automatizável.

## Slide 41 — Avaliação Final: Fundamentos de Teste ✅

Selecione todas as afirmações verdadeiras sobre planejamento, verificação, validação e casos de teste (mais de uma opção está correta):

1. A Matriz de Rastreabilidade assegura que cada requisito funcional possua casos de teste associados.

2. A Verificação analisa se o código segue as especificações, enquanto a Validação garante que o produto resolve a necessidade do usuário.

3. O Plano de Testes dispensa a definição de riscos e ambientes de homologação se a equipe utilizar metodologias ágeis.

4. O BDD utiliza Dado, Quando e Então para criar cenários em linguagem acessível e automatizável.

✓ ✓ ✓

## Slide 42 — Síntese e Próxima Aula

SÍNTESE

### O Alicerce da Qualidade

Consolidamos:

Verificação (dev) vs Validação (QA). Plano de Testes (ISO 29119): escopo, riscos, métricas. Casos de Teste e BDD (Given-When-Then).

Próxima aula: Vitest e Testes Unitários.

### 🧠 Lembre-se

Testar exige planejamento antes de codificar.
