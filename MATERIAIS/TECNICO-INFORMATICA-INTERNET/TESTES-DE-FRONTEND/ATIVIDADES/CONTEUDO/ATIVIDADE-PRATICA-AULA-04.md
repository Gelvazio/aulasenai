# Atividade: Atividade Prática — Aula 04 — 10 Questões Discursivas

- **Aula:** AP-04
- **Rótulo da aula:** Atividade Prática — Aula 04
- **Tema:** Testes de Integração com DOM usando Testing Library
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-04.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar os casos de teste do plano e desenvolver, por escrito, testes de integração de componentes de front-end com os conteúdos da aula 04 (CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md): teste de integração e JSDOM, configuração do Vitest com Testing Library, teste pelo comportamento (caixa preta), queries por papel, rótulo e texto, getBy, queryBy e findBy, userEvent com await, matchers do jest-dom e conversão do caso de teste em teste automatizado.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-04-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 4

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para criar os testes de integração das telas de uma rede social de estudantes (botão Seguir e formulário de cadastro), rodando no Vitest com JSDOM e Testing Library.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito, a query ou o comando pedido; **(2)** o código do teste escrito por inteiro (render ou montagem no document.body, query, userEvent e expect com o matcher) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Escreva o código como escreveria no VS Code. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código de teste correto (query adequada, await nas ações do usuário e matcher certo) e justificativa com as palavras-chave do conteúdo. Nomes de testes e variáveis diferentes valem, desde que o teste esteja correto; aspas simples ou duplas e ponto e vírgula opcional são aceitos. Erros de português não tiram nota se a ideia estiver clara.

**Botão Seguir, usado em várias questões (src/botaoSeguir.js):** criarBotaoSeguir({ aoAlternar }) devolve um button com o texto "Seguir" e aria-pressed="false". A cada clique, alterna para "Seguindo" com aria-pressed="true" (e volta) e chama aoAlternar(true ou false).

**Formulário de cadastro, usado em várias questões (src/formCadastro.js):** criarFormCadastro() devolve um form com os campos de rótulo "E-mail" e "Senha" e o botão "Cadastrar". O botão fica desabilitado enquanto a senha tiver menos de 6 caracteres, e aparece a mensagem "A senha deve ter no mínimo 6 dígitos". Com dados válidos, ao clicar em Cadastrar aparece "Cadastro realizado!".

## Cobertura da aula

| Conteúdo da aula 04 | Questões |
|---|---|
| Teste de integração no front-end e JSDOM (1) | 01 |
| Configuração do ambiente (2.3) | 02 |
| Teste pelo comportamento — caixa preta (3.1) | 03 |
| Queries e ordem de prioridade | 04 |
| getBy, queryBy e findBy | 05 |
| userEvent, await e beforeEach | 06, 07 |
| Matchers do jest-dom | 08 |
| Do caso de teste ao teste automatizado (C4, 4.1) | 09 |
| Defeito de funcionalidade comprovado por teste | 10 |

---

## ITEM 01 — O Que É o Teste de Integração

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, ouviu da equipe: "Já temos testes unitários das funções de validação; para que testar a tela também? E o teste de tela não vai abrir o navegador e demorar muito?".

**Comando:**
Explique à equipe o papel do teste de integração no front-end.

**Tópicos:**
- a) Explique o que o teste de integração verifica no front-end. (0,2)
- b) Diga onde ele fica na pirâmide de testes, comparando a velocidade dele com a do teste unitário e a do teste E2E. (0,4)
- c) Explique o que é o JSDOM e por que ele deixa o teste de integração rápido, respondendo à dúvida da equipe sobre o navegador. (0,4)

---

## ITEM 02 — Preparando o Ambiente

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai preparar o projeto da aula 3 (que já tem o Vitest) para testar telas com a Testing Library.

**Comando:**
Escreva a instalação e a configuração do ambiente.

**Tópicos:**
- a) Escreva o comando npm que instala, como dependências de desenvolvimento, o jsdom, a Testing Library do DOM, o user-event e o jest-dom. (0,2)
- b) Escreva o arquivo vitest.config.js com o ambiente jsdom e o arquivo de setup tests/setup.js, e escreva o conteúdo do tests/setup.js. (0,4)
- c) Explique o que muda na instalação e na montagem do componente se o projeto usar React, e o que continua igual. (0,4)

---

## ITEM 03 — Comportamento ou Implementação

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, revisa um teste de um colega que faz document.querySelector('.btn-primary').click() e depois confere a variável interna estaSeguindo do componente. O teste quebrou quando o designer trocou o nome da classe CSS, sem nenhuma mudança no que o usuário vê.

**Comando:**
Analise o teste do colega.

**Tópicos:**
- a) Diga se o teste do colega testa o comportamento ou a implementação e por quê. (0,2)
- b) Reescreva o teste para clicar no botão como o usuário faria e conferir o que aparece na tela (query por papel, userEvent com await e expect do texto "Seguindo"). (0,4)
- c) Explique a relação entre testar pelo comportamento e o teste de caixa preta (3.1), e por que o novo teste não quebra quando a classe CSS muda. (0,4)

---

## ITEM 04 — Escolhendo a Query

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, precisa encontrar na tela de cadastro: o campo Senha (que tem um label "Senha"), o botão Cadastrar e o título "Crie sua conta".

**Comando:**
Escolha as queries seguindo a ordem de prioridade da Testing Library.

**Tópicos:**
- a) Escreva a ordem de prioridade das queries da Testing Library, da primeira à última. (0,2)
- b) Escreva a query que você usaria para cada um dos três elementos (campo Senha, botão Cadastrar e título) e justifique a escolha de cada uma. (0,4)
- c) Explique quando o getByTestId é aceitável e por que buscar pelo papel também revela problemas de acessibilidade. (0,4)

---

## ITEM 05 — getBy, queryBy e findBy

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa conferir que a mensagem "A senha deve ter no mínimo 6 dígitos" não aparece quando o formulário acaba de abrir. Um colega escreveu expect(screen.getByText('A senha deve ter no mínimo 6 dígitos')).not.toBeInTheDocument() e o teste dá erro antes de chegar ao expect.

**Comando:**
Explique as três famílias de queries e corrija o teste.

**Tópicos:**
- a) Explique a diferença entre getBy, queryBy e findBy. (0,2)
- b) Explique por que o teste do colega dá erro e reescreva-o com a query certa. (0,4)
- c) Dê um exemplo de situação em que o findBy é a escolha certa e escreva a linha de código com o await. (0,4)

---

## ITEM 06 — Testando o Botão Seguir

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai escrever o primeiro teste do botão Seguir descrito no início da atividade.

**Comando:**
Escreva o teste no padrão AAA.

**Tópicos:**
- a) Escreva o Arrange: o vi.fn do callback, a montagem do botão no document.body e a criação do usuário com userEvent.setup(). (0,2)
- b) Escreva o Act e o Assert: clicar no botão Seguir e conferir o texto "Seguindo", o aria-pressed="true" e a chamada de aoAlternar com true. (0,4)
- c) Escreva um segundo teste que clica duas vezes e confere que o botão volta para "Seguir" e que aoAlternar foi chamado por último com false. (0,4)

---

## ITEM 07 — await e beforeEach

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, encontrou dois problemas na suíte da equipe: (1) um teste escreve usuario.click(botao) sem await e às vezes passa, às vezes falha; (2) o segundo teste do arquivo encontra dois botões Seguir na tela e falha com o erro "Found multiple elements".

**Comando:**
Explique e corrija os dois problemas.

**Tópicos:**
- a) Explique o que o userEvent.setup() cria e por que as ações dele precisam de await. (0,2)
- b) Explique a causa do problema (2) e escreva o beforeEach que o resolve. (0,4)
- c) Explique por que um teste não pode depender de outro e o que acontece com a confiança na suíte quando os testes passam ou falham ao acaso. (0,4)

---

## ITEM 08 — Matchers do jest-dom

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai conferir o estado do formulário de cadastro depois que o usuário digita o e-mail "ana@escola.com" e a senha "123".

**Comando:**
Escolha e use os matchers do jest-dom.

**Tópicos:**
- a) Diga o que conferem os matchers toBeInTheDocument, toBeDisabled e toHaveValue. (0,2)
- b) Escreva os expects que conferem que o campo E-mail tem o valor digitado e que o botão Cadastrar está desabilitado. (0,4)
- c) Escreva o expect que confere que a mensagem de aviso da senha está visível e explique a diferença entre toBeInTheDocument e toBeVisible. (0,4)

---

## ITEM 09 — Do Caso de Teste ao Teste Automatizado

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, recebeu do plano de testes o caso CT-07: pré-condição "formulário de cadastro aberto"; passos "digitar ana@escola.com no E-mail, digitar 123456 na Senha e clicar em Cadastrar"; resultado esperado "aparece a mensagem Cadastro realizado!".

**Comando:**
Transforme o caso de teste em teste automatizado.

**Tópicos:**
- a) Diga a que parte do padrão AAA corresponde a pré-condição, os passos e o resultado esperado do caso de teste. (0,2)
- b) Escreva o teste completo do CT-07 (montagem do formulário, userEvent.type nos campos pelo rótulo, clique no botão pelo papel e expect da mensagem). (0,4)
- c) Explique por que esse teste é de funcionalidade (4.1) e de caixa preta (3.1), e qual a vantagem de executar o caso do plano de forma automática. (0,4)

---

## ITEM 10 — Comprovando um Defeito

- **Aula:** 04 · Testes de Integração com DOM usando Testing Library
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, foi chamado porque usuários reclamam que "o cadastro não deixa continuar". Ao aplicar o plano com uma senha de 5 caracteres, o botão Cadastrar fica desabilitado, como esperado, mas a mensagem de aviso não aparece.

**Comando:**
Comprove o defeito com um teste e relate-o à equipe.

**Tópicos:**
- a) Diga qual é o defeito encontrado e o tipo de teste (da classificação da aula 1) a que ele pertence. (0,2)
- b) Escreva o teste que digita a senha de 5 caracteres e confere o botão desabilitado e a mensagem de aviso, e diga qual linha falha hoje. (0,4)
- c) Explique por que anexar o teste que falha ao relatório ajuda a equipe e o que deve acontecer com esse teste depois da correção. (0,4)
