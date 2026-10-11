# Atividade: Testes de Integração com DOM usando Testing Library — 50 Questões

- **Aula:** 04
- **Tema:** Testes de Integração com DOM usando Testing Library
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar testes definidos no Plano de Testes e desenvolver conjunto de testes automatizados: teste de integração e JSDOM, configuração do Vitest com Testing Library, teste pelo comportamento (caixa preta), queries por papel, rótulo e texto, getBy, queryBy e findBy, userEvent com await, beforeEach, matchers do jest-dom e conversão do caso de teste em teste automatizado.
- **Conteúdo-base:** ../CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md
- **Slides:** ../AULAS/AULA-04-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-04-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que o Teste de Integração Verifica

- **Capacidade:** C5

**Comando:**  
O que o teste de integração verifica no front-end?

**Alternativas:**
- A) Apenas a velocidade de carregamento da página no servidor.
- B) Várias partes trabalhando juntas: HTML, eventos, validação e mensagem na tela.
- C) Uma única função isolada, sem nenhuma tela.
- D) Somente a aparência das cores e fontes do site.

**Gabarito:** B

---

## ITEM 02 — Lugar na Pirâmide

- **Capacidade:** C5

**Comando:**  
Onde o teste de integração fica na pirâmide de testes?

**Alternativas:**
- A) No meio, entre os testes unitários e os testes E2E.
- B) No topo, acima dos testes E2E.
- C) Fora da pirâmide, porque não é teste automatizado.
- D) Na base, junto com os testes unitários.

**Gabarito:** A

---

## ITEM 03 — Velocidade Comparada

- **Capacidade:** C5

**Comando:**  
Comparado aos testes unitários e E2E, o teste de integração é:

**Alternativas:**
- A) Mais lento que o unitário e bem mais rápido que o E2E.
- B) Mais rápido que o unitário e mais lento que o E2E.
- C) Mais lento que todos os outros tipos.
- D) Igual em velocidade ao teste E2E.

**Gabarito:** A

---

## ITEM 04 — O Que É o JSDOM

- **Capacidade:** C5

**Comando:**  
O que é o JSDOM?

**Alternativas:**
- A) Um editor de código para escrever os testes.
- B) Um navegador real que abre uma janela durante o teste.
- C) Um banco de dados para guardar os resultados dos testes.
- D) Um DOM simulado que roda no Node, sem abrir o navegador.

**Gabarito:** D

---

## ITEM 05 — Por Que o JSDOM É Rápido

- **Capacidade:** C5

**Comando:**  
Por que o teste de integração com JSDOM é rápido?

**Alternativas:**
- A) Porque não executa nenhum código da aplicação.
- B) Porque pula todas as verificações do teste.
- C) Porque roda só depois da publicação do site.
- D) Porque monta a tela num DOM simulado, sem abrir o navegador.

**Gabarito:** D

---

## ITEM 06 — Comando de Instalação

- **Capacidade:** C5

**Comando:**  
Qual comando instala as ferramentas da aula como dependências de desenvolvimento?

**Alternativas:**
- A) npm run build @testing-library/dom
- B) npm uninstall vitest jsdom
- C) npm install -D jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom
- D) npm start jsdom testing-library

**Gabarito:** C

---

## ITEM 07 — Opção -D

- **Capacidade:** C5

**Comando:**  
O que significa a opção -D no comando npm install -D?

**Alternativas:**
- A) Instala o pacote como dependência de desenvolvimento.
- B) Instala o pacote só no servidor de produção.
- C) Apaga o pacote do projeto.
- D) Desliga os testes do projeto.

**Gabarito:** A

---

## ITEM 08 — Ambiente do Vitest

- **Capacidade:** C5

**Comando:**  
No vitest.config.js, qual configuração faz os testes rodarem com o DOM simulado?

**Alternativas:**
- A) environment: 'mysql'
- B) browser: 'chrome'
- C) mode: 'production'
- D) environment: 'jsdom'

**Gabarito:** D

---

## ITEM 09 — Arquivo de Setup

- **Capacidade:** C5

**Comando:**  
Para que serve o setupFiles: ['./tests/setup.js'] na configuração?

**Alternativas:**
- A) Define a cor do relatório de testes.
- B) Roda o arquivo de preparação antes dos testes, como o import do jest-dom.
- C) Publica o site depois dos testes.
- D) Apaga todos os testes antes de rodar.

**Gabarito:** B

---

## ITEM 10 — Conteúdo do Setup

- **Capacidade:** C5

**Comando:**  
Qual linha vai no tests/setup.js para ativar os matchers do jest-dom no Vitest?

**Alternativas:**
- A) npm install jest-dom
- B) export default defineConfig({});
- C) import '@testing-library/jest-dom/vitest';
- D) import React from 'react';

**Gabarito:** C

---

## ITEM 11 — Projeto React

- **Capacidade:** C5

**Comando:**  
Num projeto React, o que muda em relação à Testing Library do DOM?

**Alternativas:**
- A) As queries mudam todas de nome.
- B) Não é possível testar componentes React com a Testing Library.
- C) Usa-se @testing-library/react e render(<Componente />); queries e userEvent são os mesmos.
- D) O userEvent deixa de existir.

**Gabarito:** C

---

## ITEM 12 — Comportamento × Implementação

- **Capacidade:** C4

**Comando:**  
Qual teste verifica o comportamento visível, e não a implementação?

**Alternativas:**
- A) Ler uma variável interna do componente.
- B) Chamar a função do evento diretamente.
- C) document.querySelector('.btn-primary')
- D) screen.getByRole('button', { name: 'Seguir' })

**Gabarito:** D

---

## ITEM 13 — Teste que Quebra com CSS

- **Capacidade:** C4

**Comando:**  
Um teste quebrou porque só o nome de uma classe CSS mudou. O que isso indica?

**Alternativas:**
- A) Que a tela tem um defeito de funcionalidade.
- B) Que é preciso desligar o CSS do projeto.
- C) Que o teste testa a implementação e deve ser reescrito.
- D) Que o teste está perfeito e deve continuar assim.

**Gabarito:** C

---

## ITEM 14 — Caixa Preta

- **Capacidade:** C4

**Comando:**  
Testar pelo comportamento visível corresponde a qual tipo de teste?

**Alternativas:**
- A) Revisão de código sem execução.
- B) Teste de caixa branca dos caminhos do código.
- C) Teste funcional de caixa preta.
- D) Teste de carga do servidor.

**Gabarito:** C

---

## ITEM 15 — Interação como o Usuário

- **Capacidade:** C4

**Comando:**  
Qual é a forma recomendada de disparar um clique no teste?

**Alternativas:**
- A) Chamar a função do evento direto no código.
- B) Clicar com userEvent, como o usuário faria.
- C) Esperar o usuário clicar durante o teste.
- D) Alterar o atributo do botão à mão.

**Gabarito:** B

---

## ITEM 16 — Primeira Query

- **Capacidade:** C4

**Comando:**  
Qual query tem a maior prioridade na Testing Library?

**Alternativas:**
- A) getByText
- B) getByRole
- C) getByTestId
- D) getByPlaceholderText

**Gabarito:** B

---

## ITEM 17 — Última Query

- **Capacidade:** C4

**Comando:**  
Qual query é o último recurso, usada só quando não há outra forma?

**Alternativas:**
- A) getByText
- B) getByRole
- C) getByTestId
- D) getByLabelText

**Gabarito:** C

---

## ITEM 18 — Campo com Rótulo

- **Capacidade:** C4

**Comando:**  
Para encontrar um campo que tem o label "Senha", a melhor query é:

**Alternativas:**
- A) document.querySelector('#senha')
- B) getByText('input')
- C) getByLabelText('Senha')
- D) getByTestId('senha')

**Gabarito:** C

---

## ITEM 19 — Botão Cadastrar

- **Capacidade:** C4

**Comando:**  
Qual query encontra o botão Cadastrar pelo papel e pelo nome?

**Alternativas:**
- A) getByRole('button', { name: 'Cadastrar' })
- B) getByTestId('btn')
- C) querySelector('button.cadastrar')
- D) getByRole('textbox', { name: 'Cadastrar' })

**Gabarito:** A

---

## ITEM 20 — Papel de um Título

- **Capacidade:** C4

**Comando:**  
Qual papel acessível corresponde a um título da página?

**Alternativas:**
- A) checkbox
- B) textbox
- C) button
- D) heading

**Gabarito:** D

---

## ITEM 21 — Papel de um Campo de Texto

- **Capacidade:** C4

**Comando:**  
Qual papel acessível corresponde a um campo de texto comum?

**Alternativas:**
- A) textbox
- B) link
- C) button
- D) heading

**Gabarito:** A

---

## ITEM 22 — Ordem das Queries

- **Capacidade:** C4

**Comando:**  
Qual é a ordem de prioridade das queries da Testing Library?

**Alternativas:**
- A) getByText, getByTestId, getByRole, getByLabelText, getByPlaceholderText.
- B) getByRole, getByLabelText, getByPlaceholderText, getByText, getByTestId.
- C) getByTestId, getByText, getByRole, getByLabelText, getByPlaceholderText.
- D) getByPlaceholderText, getByTestId, getByRole, getByText, getByLabelText.

**Gabarito:** B

---

## ITEM 23 — Bônus da Query por Papel

- **Capacidade:** C4

**Comando:**  
Que vantagem extra tem buscar os elementos pelo papel?

**Alternativas:**
- A) Dispensa escrever o expect.
- B) Faz o teste rodar no servidor de produção.
- C) Revela problemas de acessibilidade: se o teste não acha o botão, o leitor de tela também não acha.
- D) Deixa o site mais bonito.

**Gabarito:** C

---

## ITEM 24 — getBy

- **Capacidade:** C5

**Comando:**  
O que acontece quando getBy... não encontra o elemento?

**Alternativas:**
- A) Cria o elemento automaticamente.
- B) O teste falha com erro, porque o elemento deve existir.
- C) Espera o elemento aparecer por alguns segundos.
- D) Devolve null e o teste continua.

**Gabarito:** B

---

## ITEM 25 — queryBy

- **Capacidade:** C5

**Comando:**  
Para que serve o queryBy...?

**Alternativas:**
- A) Esperar um elemento que aparece depois de uma resposta do servidor.
- B) Conferir que algo não está na tela, pois devolve null quando não encontra.
- C) Clicar em um botão.
- D) Digitar em um campo.

**Gabarito:** B

---

## ITEM 26 — findBy

- **Capacidade:** C5

**Comando:**  
Para que serve o findBy...?

**Alternativas:**
- A) Esperar o elemento aparecer, de forma assíncrona.
- B) Conferir que o elemento não existe.
- C) Trocar a classe CSS do elemento.
- D) Apagar o elemento da tela.

**Gabarito:** A

---

## ITEM 27 — Mensagem que Não Deve Aparecer

- **Capacidade:** C5

**Comando:**  
Qual linha confere que a mensagem de erro não aparece na tela?

**Alternativas:**
- A) expect(screen.findByText('Erro')).toBeVisible();
- B) expect(screen.getByText('Erro')).not.toBeInTheDocument();
- C) expect(screen.queryByText('Erro')).not.toBeInTheDocument();
- D) expect(screen.getByTestId('Erro')).toBeInTheDocument();

**Gabarito:** C

---

## ITEM 28 — findBy com await

- **Capacidade:** C5

**Comando:**  
Como usar corretamente o findByText?

**Alternativas:**
- A) const aviso = await screen.findByText('Cadastro realizado!');
- B) const aviso = screen.findByText('Cadastro realizado!').click();
- C) findByText('Cadastro realizado!') = true;
- D) const aviso = screen.findByText;

**Gabarito:** A

---

## ITEM 29 — userEvent.setup

- **Capacidade:** C5

**Comando:**  
O que o userEvent.setup() cria?

**Alternativas:**
- A) Um usuário simulado que dispara a sequência real de eventos (foco, teclado, clique).
- B) Um novo projeto npm.
- C) Um relatório de cobertura.
- D) Um servidor web para o teste.

**Gabarito:** A

---

## ITEM 30 — await nas Ações

- **Capacidade:** C5

**Comando:**  
Por que é obrigatório usar await antes de usuario.click(...)?

**Alternativas:**
- A) Porque sem await o botão some da tela.
- B) Porque o await desliga o JSDOM.
- C) Porque o await deixa o teste mais bonito.
- D) Porque as ações do userEvent são assíncronas; sem await o expect pode rodar antes do clique.

**Gabarito:** D

---

## ITEM 31 — Digitação

- **Capacidade:** C5

**Comando:**  
Qual linha digita "123" no campo Senha?

**Alternativas:**
- A) await usuario.type('Senha');
- B) usuario.click('123');
- C) screen.getByLabelText('Senha').value === '123';
- D) await usuario.type(screen.getByLabelText('Senha'), '123');

**Gabarito:** D

---

## ITEM 32 — beforeEach

- **Capacidade:** C5

**Comando:**  
Para que serve o beforeEach(() => { document.body.innerHTML = ''; })?

**Alternativas:**
- A) Limpar a tela antes de cada teste, para um teste não interferir no outro.
- B) Desabilitar os botões da tela.
- C) Rodar todos os testes duas vezes.
- D) Apagar os arquivos de teste do projeto.

**Gabarito:** A

---

## ITEM 33 — Vários Elementos Encontrados

- **Capacidade:** C5

**Comando:**  
O erro "Found multiple elements" no segundo teste do arquivo geralmente indica que:

**Alternativas:**
- A) O teste está usando await demais.
- B) Sobraram na tela os elementos do teste anterior.
- C) O botão foi encontrado pelo papel correto.
- D) O JSDOM não foi instalado.

**Gabarito:** B

---

## ITEM 34 — Testes Independentes

- **Capacidade:** C5

**Comando:**  
Por que cada teste deve ser independente dos outros?

**Alternativas:**
- A) Para economizar linhas de código.
- B) Para rodar sozinho e em qualquer ordem com o mesmo resultado.
- C) Para que um teste prepare os dados do próximo.
- D) Para que os testes rodem só uma vez por mês.

**Gabarito:** B

---

## ITEM 35 — Simulando o Callback

- **Capacidade:** C5

**Comando:**  
No teste do botão Seguir, para que serve o vi.fn() passado como aoAlternar?

**Alternativas:**
- A) Trocar o texto do botão.
- B) Instalar a Testing Library.
- C) Criar uma função falsa que registra as chamadas, para conferir se o callback foi chamado.
- D) Desenhar o botão na tela.

**Gabarito:** C

---

## ITEM 36 — Conferir a Chamada

- **Capacidade:** C5

**Comando:**  
Qual linha confere que aoAlternar foi chamado com true?

**Alternativas:**
- A) expect(aoAlternar).toBe(true);
- B) expect(aoAlternar).toHaveValue(true);
- C) expect(aoAlternar).toBeDisabled();
- D) expect(aoAlternar).toHaveBeenCalledWith(true);

**Gabarito:** D

---

## ITEM 37 — toBeInTheDocument

- **Capacidade:** C5

**Comando:**  
O que o matcher toBeInTheDocument() confere?

**Alternativas:**
- A) Se o elemento está na página.
- B) Se o elemento tem a cor certa.
- C) Se o campo tem um valor.
- D) Se o elemento está desabilitado.

**Gabarito:** A

---

## ITEM 38 — toBeVisible

- **Capacidade:** C5

**Comando:**  
O que o toBeVisible() confere a mais que o toBeInTheDocument()?

**Alternativas:**
- A) Que o usuário consegue ver o elemento (não está escondido).
- B) Que o elemento é um botão.
- C) Que o elemento foi apagado.
- D) Que o elemento tem um data-testid.

**Gabarito:** A

---

## ITEM 39 — toBeDisabled

- **Capacidade:** C5

**Comando:**  
Qual matcher confere que o botão Cadastrar está desabilitado?

**Alternativas:**
- A) toBeDisabled()
- B) toBeVisible()
- C) toHaveBeenCalled()
- D) toHaveValue()

**Gabarito:** A

---

## ITEM 40 — toHaveTextContent

- **Capacidade:** C5

**Comando:**  
Qual matcher confere que o botão mostra o texto "Seguindo"?

**Alternativas:**
- A) toHaveTextContent('Seguindo')
- B) toBeDisabled('Seguindo')
- C) toHaveBeenCalledWith('Seguindo')
- D) toHaveValue('Seguindo')

**Gabarito:** A

---

## ITEM 41 — toHaveValue

- **Capacidade:** C5

**Comando:**  
Qual matcher confere o valor digitado num campo?

**Alternativas:**
- A) toBeVisible('ana@escola.com')
- B) toBeEnabled('ana@escola.com')
- C) toHaveTextContent('ana@escola.com')
- D) toHaveValue('ana@escola.com')

**Gabarito:** D

---

## ITEM 42 — toHaveAttribute

- **Capacidade:** C5

**Comando:**  
Qual linha confere que o botão Seguir ficou pressionado?

**Alternativas:**
- A) expect(botao).toHaveValue('true');
- B) expect(botao).toBeDisabled();
- C) expect(botao).not.toBeInTheDocument();
- D) expect(botao).toHaveAttribute('aria-pressed', 'true');

**Gabarito:** D

---

## ITEM 43 — Pré-condição no AAA

- **Capacidade:** C4

**Comando:**  
Ao transformar um caso de teste em teste automatizado, a pré-condição "formulário aberto" vira:

**Alternativas:**
- A) O Act: clicar no botão.
- B) O Arrange: montar o formulário no document.body.
- C) O Assert: conferir a mensagem.
- D) Um comentário que não vira código.

**Gabarito:** B

---

## ITEM 44 — Passos no AAA

- **Capacidade:** C4

**Comando:**  
Os passos do caso de teste ("digitar a senha e clicar em Cadastrar") viram:

**Alternativas:**
- A) O beforeEach.
- B) O Act, com userEvent.type e userEvent.click.
- C) O Arrange, com vi.fn.
- D) O Assert, com expect.

**Gabarito:** B

---

## ITEM 45 — Resultado Esperado no AAA

- **Capacidade:** C4

**Comando:**  
O resultado esperado do caso de teste ("aparece a mensagem de aviso") vira:

**Alternativas:**
- A) O Act, com o clique.
- B) A instalação do jsdom.
- C) O Assert, com expect e o matcher adequado.
- D) O Arrange, com a montagem da tela.

**Gabarito:** C

---

## ITEM 46 — Teste de Funcionalidade

- **Capacidade:** C4

**Comando:**  
Conferir se o formulário cadastra e avisa como o requisito pede é um teste de:

**Alternativas:**
- A) Carga do servidor.
- B) Manutenibilidade.
- C) Desempenho.
- D) Funcionalidade.

**Gabarito:** D

---

## ITEM 47 — Defeito do Cadastro

- **Capacidade:** C4

**Comando:**  
Com senha de 5 caracteres, o botão fica desabilitado, mas o aviso não aparece. Qual é o defeito?

**Alternativas:**
- A) O botão não deveria ficar desabilitado.
- B) A mensagem de aviso não é exibida, e o usuário não sabe por que não avança.
- C) Não há defeito, a tela está correta.
- D) A senha de 5 caracteres deveria ser aceita.

**Gabarito:** B

---

## ITEM 48 — Teste que Comprova o Defeito

- **Capacidade:** C4

**Comando:**  
No caso do defeito do cadastro, qual linha do teste falha hoje?

**Alternativas:**
- A) expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled();
- B) document.body.append(criarFormCadastro());
- C) expect(screen.getByText('A senha deve ter no mínimo 6 dígitos')).toBeInTheDocument();
- D) const usuario = userEvent.setup();

**Gabarito:** C

---

## ITEM 49 — Teste Após a Correção

- **Capacidade:** C4

**Comando:**  
Depois que a equipe corrige o defeito, o que deve acontecer com o teste que falhava?

**Alternativas:**
- A) Ele é trocado por um teste manual.
- B) Ele passa e fica na suíte como teste de regressão.
- C) Ele é apagado, porque já cumpriu o papel.
- D) Ele é desligado com skip.

**Gabarito:** B

---

## ITEM 50 — Query sem Olhar o Código

- **Capacidade:** C4

**Comando:**  
Na dinâmica "Encontre sem olhar o código", por que escolher a query pensando como o usuário?

**Alternativas:**
- A) Porque o usuário escreve os testes.
- B) Porque as classes CSS são a melhor forma de encontrar elementos.
- C) Porque o código do HTML é secreto.
- D) Porque o teste deve encontrar os elementos como o usuário os percebe, e não como o HTML foi escrito.

**Gabarito:** D
