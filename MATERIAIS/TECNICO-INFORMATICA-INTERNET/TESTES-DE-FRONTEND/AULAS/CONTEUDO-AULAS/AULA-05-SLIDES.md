# Aula 05 — Testes de Integração Avançados e Mock de APIs

> Texto extraído dos slides `AULAS/AULA-05-SLIDES.pdf` (41 slides), sem as imagens.
> Alguns termos de código já faltam no próprio PDF (ex.: "com .", "()"); o texto foi mantido como está nos slides.
> Testes de Front-End · Técnico em Informática para Internet · gerado em 2026-10-14 10:08 (tarefa #44).

## Slide 1 — Testes de Integração Avançados e Mock de APIs

Domine MSW, estado compartilhado e assincronismo no frontend profissional.

## Slide 2 — O Desafio da Rede Real

O que acontece quando sua suite de testes depende de um servidor que caiu?

## Slide 3 — Objetivos da Aula de Hoje

### Resultados Esperados

Ao final deste bloco, você terá dominado habilidades essenciais de integração:

Interceptar requisições HTTP com Mock Service Worker. Validar estados compartilhados em Context API e storage. Controlar fluxos assíncronos e evitar race conditions.

### 🧠 Lembre-se

Testes de integração garantem que peças isoladas funcionem perfeitamente juntas.

## Slide 4 — Vocabulário Essencial de Integração

### Interceptação

Captura de chamadas HTTP na camada de rede antes de saírem do ambiente.

### Assincronismo

Operações independentes do tempo linear que dependem de promessas e eventos.

### Persistência

Manutenção de dados intactos após recarregamentos, usando APIs como

### Estado

Memória dinâmica e dados reativos mantidos por componentes ativos.

## Slide 5 — Recapitulação: Testing Library

REVISÃO

### Consultas no DOM

Priorizamos acessibilidade e interação real:

- : busca síncrona; erro se ausente. : retorna se ausente; ideal para remoções.

- : retorna Promise; aguarda elemento surgir.

### 🔑 Ponto-chave

Simulamos eventos via .

## Slide 6 — Quiz: Seleção de Queries DOM

Pergunta 1:

Qual query deve ser usada para verificar que um modal de erro desapareceu da tela?

Pergunta 2:

Quando é obrigatório recorrer a uma query do tipo findBy?

Pergunta 3:

Por que getByRole é preferível em relação a getByTestId?

## Slide 7 — Quiz: Seleção de Queries DOM ✅

Resposta 1:

queryBy (ou queryByRole), pois retorna null quando o elemento não existe, sem quebrar o teste com exceção.

Resposta 2:

Quando o elemento aparece de maneira assíncrona após uma requisição ou atualização de estado.

Resposta 3:

Porque valida a acessibilidade semântica real experimentada pelo usuário, em vez de depender de detalhes de implementação.

## Slide 8 — O Limite dos Componentes Isolados

INTEGRAÇÃO

### A Complexidade Real

Testar componentes isolados é simples. Em apps reais, eles operam em conjunto:

- Filhos alteram estados globais.

- Contextos de auth definem rotas.

- Requisições HTTP sincronizam dados.

### ⚠️ Atenção

Testes unitários ignoram falhas em contratos de API.

## Slide 9 — O Dilema dos Mocks Tradicionais

### Mockar fetch / axios

Substituir acopla o teste à biblioteca usada e mascara erros reais de parsing, headers e URLs mal formatadas.

### Interceptação de Rede

A aplicação executa seu código HTTP real sem alterações, enquanto o interceptor atua no nível de rede simulado.

## Slide 10 — Apresentando o MSW

FERRAMENTA

### Mock Service Worker

O MSW intercepta requisições via Service Workers (browser) ou interceptors (Node.js):

- Mantém o código-fonte original.

- Intercepta REST e GraphQL nativos.

- Gerencia headers, status e payloads reais.

### 🔑 Ponto-chave

Componentes usam o cliente HTTP de produção, garantindo fidelidade total.

## Slide 11 — Arquitetura do MSW nos Testes

O fluxo de execução do MSW intercepta chamadas na camada de rede em tempo de teste:

O componente nunca sabe que a resposta veio de um mock local em vez do servidor.

## Slide 12 — Configurando Handlers com MSW

CÓDIGO

### Declarando Manipuladores

Definimos manipuladores utilizando a API declarativa e :

Mapeamos endpoints específicos (). Retornamos respostas formatadas com . Configuramos o servidor de teste com .

### 🔍 Exemplo

http.get('/api/produtos', () => HttpResponse.json([{ id: 1, nome: 'Teclado' }]))

## Slide 13 — Ciclo de Vida do Servidor MSW

### server.listen()

Inicia a escuta antes de todos os testes no hook .

### server.resetHandlers()

Restaura os mocks originais no evitando contaminação.

### server.close()

Encerra o servidor de interceptação no hook da suite.

## Slide 14 — Checagem: Vantagens do MSW

Qual é a principal vantagem técnica de adotar o MSW em relação a espionar e mockar o axios diretamente?

1. Garantir que os testes executem mais rápido que testes unitários puros

2. Impedir que componentes React executem ciclos de renderização

3. Exigir um servidor backend em produção em tempo de teste

4. Interceptar chamadas na camada de rede sem alterar a implementação do cliente HTTP

## Slide 15 — Checagem: Vantagens do MSW ✅

Qual é a principal vantagem técnica de adotar o MSW em relação a espionar e mockar o axios diretamente?

1. Garantir que os testes executem mais rápido que testes unitários puros

2. Impedir que componentes React executem ciclos de renderização

3. Exigir um servidor backend em produção em tempo de teste

4. Interceptar chamadas na camada de rede sem alterar a implementação do cliente HTTP ✓

## Slide 16 — Simulando Respostas Positivas

CENÁRIOS

### O Caminho Feliz (Status 200)

Testar o sucesso valida a renderização de tabelas:

- O componente exibe estado inicial vazio.

- Dispara o request ao carregar.

- Preenche o DOM com os dados do mock.

### 🔑 Ponto-chave

Use findByRole para esperar a lista ser populada após o request.

## Slide 17 — Tratando Falhas: 404 e 500

### Recurso Inexistente (404)

Sobrescreva o handler com para validar mensagens amigáveis de dados não localizados.

### Falha Interna (500)

Simule quedas do servidor para garantir que botões de 'Tentar Novamente' e alertas de erro funcionem.

## Slide 18 — Simulação de Latência de Rede

CENÁRIOS

### Atrasos Realistas

Use  no MSW para testar estados:

- Botões desativados (evita duplo clique).

- Skeletons de carregamento.

- Feedbacks visuais em esperas longas.

### 🔍 Exemplo

await delay(150); return HttpResponse.json({ status: 'ok' });

## Slide 19 — Gerenciamento de Loaders e Spinners

Para testar ciclos visuais completos com spinners assíncronos, siga três etapas ordenadas:

### 1. Início

Dispare o evento de submissão e confirme o spinner com .

### 2. Transição

Use para aguardar o desaparecimento do spinner.

### 3. Conclusão

Valide os dados finais na tela com .

## Slide 20 — Análise: Asserções de Desaparecimento

Devemos usar getByRole('progressbar') imediatamente após a requisição para verificar que o spinner sumiu da tela.

### 👍 VERDADE

### IRO

### 👎 FALSO

🤔 Prepare-se para explicar o seu raciocínio.

## Slide 21 — Análise: Asserções de Desaparecimento ✅

Devemos usar getByRole('progressbar') imediatamente após a requisição para verificar que o spinner sumiu da tela.

### 👍 VERDADE

### IRO

### 👎 FALSO

### 🔑 Por que é isso?

getByRole lança uma exceção se o elemento já desapareceu; deve-se usar queryByRole ou waitForElementToBeRemoved.

✓

## Slide 22 — O Perigo do Tempo Desordenado

E se a primeira requisição demorar mais para responder do que a segunda?

## Slide 23 — Prevenção de Race Conditions

ASSINCRONISMO

### Respostas Fora de Ordem

Race conditions ocorrem quando requisições finalizam fora de ordem:

- Busca rápida gera chamadas múltiplas.

- Resposta antiga sobrescreve a recente.

- Interface exibe dados obsoletos.

### ⚠️ Atenção

Simule latências e valide cancelamento via AbortController.

## Slide 24 — Vazamento de Memória em Testes

ASSINCRONISMO

### Aviso 'Not-Wrapped in act'

Ocorre ao desmontar componentes com promessas pendentes:

- Chamadas HTTP resolvem após o teste.

- tenta rodar em nó destruído.

- Gera instabilidade e testes intermitentes.

### 🔑 Ponto-chave

Aguarde sempre a conclusão de promessas antes de finalizar o teste.

## Slide 25 — Demonstração de Integração com MSW

Arquitetura de interceptação de rede e validação assíncrona com Testing Library:

## Slide 26 — Estado Compartilhado: Context e Redux

ESTADO

### Componentes Não Vivem Isolados

Componentes dependem de Provedores globais:

- Dados do usuário (AuthContext).

- Itens do carrinho (CartContext).

- Tema visual e idioma.

### 🔑 Ponto-chave

Use renderWithProviders() para encapsular árvores de componentes em testes.

## Slide 27 — Padrão Custom Render

A melhor prática da Testing Library consiste em encapsular providers em um helper reutilizável:

### Estrutura do Helper 🔑Ponto-chave

Substitui repetições desnecessárias de Provedores em centenas de arquivos de teste.

Permite injetar estados iniciais flexíveis para testar perfis de administradores, clientes anônimos ou usuários bloqueados.

## Slide 28 — Persistência com LocalStorage

PERSISTÊNCIA

### Validação de Sessão e Cache

Apps salvam tokens e carrinhos no Web Storage:

No Vitest, mocke . Verifique se salvou dados.

- Valide a hidratação ao carregar storage.

### 🧠 Lembre-se

Use localStorage.clear() no afterEach para isolar testes.

## Slide 29 — Boas Práticas de Estado Global

Quais afirmativas sobre testes com estado global e persistência são verdadeiras? (Mais de uma está correta)

1. Testes de componentes com Context devem sempre acessar diretamente as variáveis internas de state.

2. O localStorage deve ser limpo entre testes para evitar que dados vazem para o próximo caso.

3. É recomendável criar um custom render que envolva componentes com os Providers necessários.

4. O MSW é responsável por salvar e restaurar dados diretamente no localStorage.

## Slide 30 — Boas Práticas de Estado Global ✅

Quais afirmativas sobre testes com estado global e persistência são verdadeiras? (Mais de uma está correta)

1. Testes de componentes com Context devem sempre acessar diretamente as variáveis internas de state.

2. O localStorage deve ser limpo entre testes para evitar que dados vazem para o próximo caso.

3. É recomendável criar um custom render que envolva componentes com os Providers necessários.

4. O MSW é responsável por salvar e restaurar dados diretamente no localStorage.

✓ ✓

## Slide 31 — Prática 1: Fluxo de Autenticação

ATIVIDADE PRÁTICA

### Roteiro do Teste de Login com MSW

Implementaremos um teste de integração de ponta a ponta para validar a autenticação completa:

### 1. Setup

Configure o endpoint POST no MSW retornando status 200 e token JWT.

### 2. Interação

Preencha os campos de email e senha usando e clique no botão Entrar.

### 3. Asserção

Aguarde com a saudação do usuário no cabeçalho e confirme o token salvo.

## Slide 32 — Execução da Prática 1: Autenticação

No terminal do VS Code:

1.Em src/mocks/handlers.js, crie http.post('/api/login') validando aluno@senai.br e 123456. 1.Crie LoginFlow.test.jsx e renderize <App /> via renderWithProviders(). 1.Simule digitação e envio do formulário com user-event. 1.Asserções:

- Verifique rota ou 'Bem-vindo, Aluno' via findByRole.

- Confirme localStorage: expect(localStorage.getItem('token')).t oBe('mock-jwt-xyz'). 1.Execute npx vitest run LoginFlow e valide sem warnings.

## Slide 33 — Prática 2: Persistência no Storage

ATIVIDADE PRÁTICA

### Cenário: Carrinho Offline

Teste persistência sem conexão:

- Clique em 'Adicionar'.

- Badge deve atualizar para 1. Salve via JSON no .

- Recarregue: recupere dados salvos.

### 🔍 Exemplo

JSON.parse(localStorage.getItem('@car rinho'))

## Slide 34 — Ordem do Teste de Persistência

Ordene as etapas necessárias para testar a recuperação e hidratação do carrinho a partir do localStorage:

Validar com findByText que os itens pré-gravados aparecem renderizados na tela Renderizar o componente do carrinho usando o helper de teste Gravar dados pré-existentes no localStorage com setItem antes da montagem Limpar o storage no hook afterEach para isolar a próxima execução

## Slide 35 — Ordem do Teste de Persistência ✅

Ordene as etapas necessárias para testar a recuperação e hidratação do carrinho a partir do localStorage:

Validar com findByText que os itens pré-gravados aparecem renderizados na tela Renderizar o componente do carrinho usando o helper de teste Gravar dados pré-existentes no localStorage com setItem antes da montagem Limpar o storage no hook afterEach para isolar a próxima execução 1 2 3 4

## Slide 36 — Manutenibilidade e Performance

ENGENHARIA

### Testes Sustentáveis

Evite lentidão em suites de integração:

Troque  por  orientado a eventos.

- Reutilize handlers MSW globais, sobrescrevendo apenas exceções.

- Use paralelismo do Vitest para acelerar a execução.

### 🔑 Ponto-chave

Testes abaixo de 500ms garantem feedback contínuo no Git.

## Slide 37 — Impacto na Indústria: O Caso Shopify

### O Incidente

Durante a Black Friday, uma race condition no carrinho gerou 2 horas de indisponibilidade e prejuízo de US$ 500 mil em vendas.

### A Solução

Criação de testes de integração simulando concorrência de rede e latências variadas. Resultado: zero ocorrências similares há 5 anos.

## Slide 38 — Síntese dos Aprendizados

REVISÃO

### Pontos Fundamentais

Dominamos alicerces de integração frontend:

MSW: Intercepta rede com realismo.

- Mocks de erro/latência blindam a UI. Render helpers: facilitam testes com contextos e storage.

### 🧠 Lembre-se

Testes confiáveis são rápidos, determinísticos e focados no usuário.

## Slide 39 — Debate: Mock de Rede vs Servidor Real

Em quais momentos da esteira de desenvolvimento uma equipe deve preferir mocks com MSW e quando deve investir em testes contra um servidor backend real de homologação?

## Slide 40 — Debate: Mock de Rede vs Servidor Real ✅

Você poderia ter dito...

Testes com MSW são ideais no CI e desenvolvimento local por serem rápidos, determinísticos e gratuitos.

Testes E2E são essenciais pré-deploy para auditar migrações de banco e contratos de rede.

## Slide 41 — Próxima Etapa: Automação E2E

PRÓXIMOS PASSOS

### Rumo ao Bloco 06

Com testes unitários e de integração prontos, subimos a pirâmide:

- Cypress: navegação real.

- Fluxos de checkout e pagamentos.

- Depuração com time-travel.

### 🔑 Ponto-chave

No Bloco 06, simularemos cliques e rotas em browsers de produção!
