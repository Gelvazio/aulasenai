# Atividade: Planejamento, Verificação, Validação e Casos de Teste — 50 Questões

- **Aula:** 02
- **Tema:** Planejamento, Verificação, Validação e Casos de Teste
- **Ícone:** 📋
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer as especificações técnicas da interface, os requisitos da documentação de testes e as etapas de planejamento de testes: análise do documento de requisitos, processo de teste (planejamento e desenho), plano de testes, riscos, caixa preta e caixa branca, partição de equivalência, valores-limite, casos de teste, suíte e matriz de rastreabilidade.
- **Conteúdo-base:** `../CONTEUDO/AULA-02-PLANEJAMENTO-VERIFICACAO-VALIDACAO-E-CASOS-DE-TESTE.md`
- **Slides:** `../AULAS/AULA-02-SLIDES.pdf`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-02-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Onde o Teste Começa

- **Capacidade:** C2

**Comando:**  
Segundo a aula, onde começa o trabalho de teste?

**Alternativas:**
- A) Na reclamação do primeiro cliente.
- B) Na escolha da cor dos botões.
- C) No requisito, analisando o que deve ser verificado.
- D) No dia da publicação do sistema.

**Gabarito:** C

---

## ITEM 02 — Requisito Testável

- **Capacidade:** C1

**Comando:**  
O que um requisito testável precisa ter?

**Alternativas:**
- A) Palavras como "rápido" e "fácil".
- B) Dado de entrada, condição e resultado verificável.
- C) Apenas o nome da tela.
- D) Somente a opinião do cliente.

**Gabarito:** B

---

## ITEM 03 — Requisito Vago

- **Capacidade:** C1

**Comando:**  
Qual destes requisitos é vago e precisa ser esclarecido antes de virar teste?

**Alternativas:**
- A) "Senha com 8 a 64 caracteres."
- B) "Frete grátis a partir de R$ 199,00."
- C) "O login responde em até 2 s em 4G."
- D) "O login deve ser rápido."

**Gabarito:** D

---

## ITEM 04 — Pergunta do Testador

- **Capacidade:** C1

**Comando:**  
Diante do requisito "a senha deve ser segura", qual é a pergunta certa do testador?

**Alternativas:**
- A) Quantos usuários vão se cadastrar?
- B) Quais são as regras que tornam a senha segura?
- C) Qual é a cor do campo senha?
- D) Em qual servidor a senha fica?

**Gabarito:** B

---

## ITEM 05 — Reescrevendo o Frete

- **Capacidade:** C1

**Comando:**  
Qual é a versão testável de "o carrinho calcula o frete"?

**Alternativas:**
- A) "O carrinho deve ser bonito."
- B) "Frete grátis para compras a partir de R$ 199,00."
- C) "O frete deve ser justo."
- D) "O frete aparece em algum lugar."

**Gabarito:** B

---

## ITEM 06 — Atividades do Processo de Teste

- **Capacidade:** C3

**Comando:**  
Quais são as duas primeiras atividades do processo fundamental de teste?

**Alternativas:**
- A) Correção de defeitos e entrega.
- B) Planejamento (7.1) e desenho dos testes (7.2).
- C) Monitoração e publicação.
- D) Execução e avaliação dos resultados.

**Gabarito:** B

---

## ITEM 07 — O Que o Planejamento Define

- **Capacidade:** C3

**Comando:**  
O que o planejamento dos testes (7.1) define?

**Alternativas:**
- A) Apenas o código das funções.
- B) Somente a lista de defeitos encontrados.
- C) A cor e a fonte das telas.
- D) Objetivo, escopo, estratégia, recursos, cronograma e riscos.

**Gabarito:** D

---

## ITEM 08 — O Que o Desenho dos Testes Faz

- **Capacidade:** C3

**Comando:**  
O que acontece no desenho dos testes (7.2)?

**Alternativas:**
- A) A cobertura de código é medida.
- B) Os testes são executados no navegador.
- C) Os requisitos são transformados em condições e casos de teste.
- D) O sistema é publicado para os clientes.

**Gabarito:** C

---

## ITEM 09 — Ordem do Processo

- **Capacidade:** C3

**Comando:**  
Qual é a ordem correta das atividades do processo de teste?

**Alternativas:**
- A) Desenho → execução → planejamento → avaliação → monitoração.
- B) Avaliação → execução → desenho → planejamento → monitoração.
- C) Execução → planejamento → desenho → avaliação → monitoração.
- D) Planejamento → desenho → execução → monitoração e controle → avaliação dos resultados.

**Gabarito:** D

---

## ITEM 10 — Seção Escopo do Plano

- **Capacidade:** C3

**Comando:**  
No plano de testes, o que vai na seção Escopo?

**Alternativas:**
- A) O nome dos alunos da turma.
- B) As funcionalidades que serão testadas, como autenticação, carrinho e checkout.
- C) As funcionalidades que não serão testadas.
- D) O código-fonte das funções.

**Gabarito:** B

---

## ITEM 11 — Seção Fora do Escopo

- **Capacidade:** C3

**Comando:**  
O que deve constar na seção Fora do escopo do plano?

**Alternativas:**
- A) O que não será testado agora e o porquê.
- B) Apenas a lista de navegadores.
- C) O cronograma das aulas.
- D) Os casos de teste de caminho feliz.

**Gabarito:** A

---

## ITEM 12 — Fora do Escopo Justificado

- **Capacidade:** C3

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React.

**Comando:**  
Qual item é um bom exemplo de fora do escopo justificado?

**Alternativas:**
- A) O login, porque é difícil de testar.
- B) Integração real com a operadora de cartão, por depender de serviço externo.
- C) O carrinho, porque o cliente pediu pressa.
- D) O checkout, porque já funcionou uma vez.

**Gabarito:** B

---

## ITEM 13 — Seção Estratégia

- **Capacidade:** C3

**Comando:**  
O que a seção Estratégia do plano de testes informa?

**Alternativas:**
- A) As datas das férias da equipe.
- B) Os nomes dos clientes da loja.
- C) A proporção unitário/integração/E2E e as ferramentas que serão usadas.
- D) Os riscos com probabilidade e impacto.

**Gabarito:** C

---

## ITEM 14 — Ambientes e Massa de Testes

- **Capacidade:** C3

**Comando:**  
O que é descrito em Ambientes e massa de testes?

**Alternativas:**
- A) O orçamento do projeto.
- B) As métricas de cobertura esperadas.
- C) A matriz de rastreabilidade.
- D) Navegadores, usuários de teste e produtos cadastrados para os testes.

**Gabarito:** D

---

## ITEM 15 — Riscos no Plano

- **Capacidade:** C3

**Comando:**  
Como os riscos devem ser registrados no plano de testes?

**Alternativas:**
- A) Sem impacto, só com a probabilidade.
- B) Apenas um, sem detalhes.
- C) No mínimo 3, com probabilidade, impacto e mitigação.
- D) Somente os que já aconteceram.

**Gabarito:** C

---

## ITEM 16 — Fórmula do Risco

- **Capacidade:** C3

**Comando:**  
Como a aula define o risco?

**Alternativas:**
- A) Risco = número de testes ÷ número de telas.
- B) Risco = quantidade de requisitos.
- C) Risco = probabilidade × impacto.
- D) Risco = tempo de execução + cobertura.

**Gabarito:** C

---

## ITEM 17 — Funcionalidade de Alto Risco

- **Capacidade:** C3

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React.

**Comando:**  
Qual decisão é coerente para o pagamento, funcionalidade de alto risco?

**Alternativas:**
- A) Ser testado só de forma manual pelo cliente.
- B) Receber mais casos e mais camadas de teste.
- C) Ficar fora do escopo para economizar tempo.
- D) Ser testado só uma vez, no final.

**Gabarito:** B

---

## ITEM 18 — Risco do Cálculo do Total

- **Capacidade:** C3

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React.

**Comando:**  
Para o risco "cálculo errado do total" (impacto alto), qual mitigação a aula propõe?

**Alternativas:**
- A) Testes unitários da função de cálculo e um fluxo E2E de checkout.
- B) Pedir aos clientes que confiram as contas.
- C) Testar apenas a cor do botão de pagar.
- D) Retirar o total da tela.

**Gabarito:** A

---

## ITEM 19 — Seção Métricas

- **Capacidade:** C3

**Comando:**  
Quais itens aparecem na seção Métricas do plano?

**Alternativas:**
- A) Preço e estoque dos produtos.
- B) Nome, CPF e e-mail dos usuários.
- C) Cores, fontes e ícones da tela.
- D) Cobertura esperada, defeitos encontrados e testes instáveis.

**Gabarito:** D

---

## ITEM 20 — Caixa Preta

- **Capacidade:** C2

**Comando:**  
O teste de caixa preta (3.1) olha para:

**Alternativas:**
- A) Entradas e saídas, sem ver o código.
- B) Os caminhos internos do código.
- C) A cobertura de instruções.
- D) Os laços e desvios de cada função.

**Gabarito:** A

---

## ITEM 21 — Caixa Branca

- **Capacidade:** C2

**Comando:**  
O teste de caixa branca (3.2) olha para:

**Alternativas:**
- A) Apenas o documento de requisitos.
- B) Os caminhos internos do código, como condições e desvios.
- C) A opinião do cliente sobre o produto.
- D) Somente a tela vista pelo usuário.

**Gabarito:** B

---

## ITEM 22 — Base da Caixa Preta

- **Capacidade:** C2

**Comando:**  
Qual é a base para criar testes de caixa preta?

**Alternativas:**
- A) Os comandos if/else do código.
- B) Os requisitos e a especificação da interface.
- C) O histórico de commits.
- D) Os laços de repetição das funções.

**Gabarito:** B

---

## ITEM 23 — Técnicas de Caixa Preta

- **Capacidade:** C2

**Comando:**  
Quais são técnicas de caixa preta?

**Alternativas:**
- A) Cobertura de instruções e de desvios.
- B) Revisão de código e refatoração.
- C) Partição de equivalência, valores-limite e tabela de decisão.
- D) Depuração passo a passo e logs.

**Gabarito:** C

---

## ITEM 24 — Técnicas de Caixa Branca

- **Capacidade:** C2

**Comando:**  
Quais são técnicas de caixa branca?

**Alternativas:**
- A) Entrevista e questionário com usuários.
- B) Tabela de decisão e casos de uso.
- C) Partição de equivalência e valores-limite.
- D) Cobertura de instruções e cobertura de desvios.

**Gabarito:** D

---

## ITEM 25 — Classificando o else

- **Capacidade:** C2

**Comando:**  
"Testar o else da função de desconto" é um teste de:

**Alternativas:**
- A) Usabilidade.
- B) Desempenho.
- C) Caixa branca.
- D) Caixa preta.

**Gabarito:** C

---

## ITEM 26 — Classificando E-mail Sem @

- **Capacidade:** C2

**Comando:**  
"Digitar um e-mail sem @ no cadastro e ver a mensagem" é um teste de:

**Alternativas:**
- A) Manutenibilidade.
- B) Caixa preta.
- C) Caixa branca.
- D) Cobertura de desvios.

**Gabarito:** B

---

## ITEM 27 — Partição de Equivalência

- **Capacidade:** C2

**Comando:**  
O que é a partição de equivalência?

**Alternativas:**
- A) Dividir as entradas em grupos que o sistema trata igual e testar um valor de cada grupo.
- B) Executar cada linha do código pelo menos uma vez.
- C) Comparar a tela com o protótipo.
- D) Testar todos os valores possíveis de um campo.

**Gabarito:** A

---

## ITEM 28 — Partições da Senha

- **Capacidade:** C2

**Contexto:**  
O requisito diz: "senha com 8 a 64 caracteres".

**Comando:**  
Quais são as partições de equivalência do tamanho da senha?

**Alternativas:**
- A) Curta (menos de 8), válida (8 a 64) e longa (mais de 64).
- B) Senhas fortes, médias e esquecidas.
- C) Senhas com letras e senhas com cores.
- D) Somente senhas com 8 caracteres.

**Gabarito:** A

---

## ITEM 29 — Valores-Limite

- **Capacidade:** C2

**Comando:**  
Por que a técnica de valores-limite testa as bordas?

**Alternativas:**
- A) Porque as bordas nunca têm defeitos.
- B) Porque assim não é preciso testar o meio.
- C) Porque é nas bordas que os defeitos aparecem com mais frequência.
- D) Porque as bordas são os valores mais usados.

**Gabarito:** C

---

## ITEM 30 — Limites da Senha

- **Capacidade:** C2

**Contexto:**  
O requisito diz: "senha com 8 a 64 caracteres".

**Comando:**  
Quais valores-limite devem ser testados?

**Alternativas:**
- A) 7, 8, 64 e 65 caracteres.
- B) 1, 10, 100 e 1.000 caracteres.
- C) 30, 31, 32 e 33 caracteres.
- D) Somente 8 caracteres.

**Gabarito:** A

---

## ITEM 31 — Limites do Frete Grátis

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React. O requisito diz: frete grátis se o subtotal for maior ou igual a R$ 199,00.

**Comando:**  
Quais valores-limite do subtotal testam bem a regra?

**Alternativas:**
- A) R$ 198,99, R$ 199,00 e R$ 199,01.
- B) Somente R$ 199,00.
- C) R$ 10,00, R$ 50,00 e R$ 100,00.
- D) R$ 500,00, R$ 1.000,00 e R$ 2.000,00.

**Gabarito:** A

---

## ITEM 32 — Resultado no Limite do Frete

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React. Frete grátis se o subtotal for maior ou igual a R$ 199,00.

**Comando:**  
Com subtotal de R$ 198,99, qual é o resultado esperado?

**Alternativas:**
- A) A compra é bloqueada.
- B) O desconto de 10% é aplicado.
- C) O cliente paga frete.
- D) O frete é grátis.

**Gabarito:** C

---

## ITEM 33 — Partições da Idade

- **Capacidade:** C2

**Contexto:**  
Um cadastro aceita idade entre 16 e 60 anos.

**Comando:**  
Quais valores-limite devem ser testados?

**Alternativas:**
- A) 20, 30, 40 e 50 anos.
- B) 0, 30 e 100 anos.
- C) Somente 16 e 60 anos.
- D) 15, 16, 60 e 61 anos.

**Gabarito:** D

---

## ITEM 34 — Campos do Caso de Teste

- **Capacidade:** C3

**Comando:**  
Quais campos um caso de teste completo deve ter?

**Alternativas:**
- A) Somente os passos, sem resultado.
- B) Somente o título e a data.
- C) Apenas o nome de quem vai testar.
- D) ID, requisito, pré-condição, passos, dados e resultado esperado.

**Gabarito:** D

---

## ITEM 35 — Pré-Condição

- **Capacidade:** C3

**Comando:**  
O que é a pré-condição de um caso de teste?

**Alternativas:**
- A) A lista de defeitos encontrados.
- B) O resultado esperado depois do teste.
- C) O número de identificação do caso.
- D) O estado necessário antes de executar os passos, como um usuário já cadastrado.

**Gabarito:** D

---

## ITEM 36 — Resultado Esperado

- **Capacidade:** C3

**Comando:**  
Para que serve o resultado esperado no caso de teste?

**Alternativas:**
- A) Para saber, de forma objetiva, se o teste passou ou falhou.
- B) Para registrar o nome do testador.
- C) Para descrever a tela inicial.
- D) Para listar os navegadores usados.

**Gabarito:** A

---

## ITEM 37 — Caso de Teste Vago

- **Capacidade:** C3

**Contexto:**  
Um colega escreveu o caso "CT-01: testar o carrinho".

**Comando:**  
O que falta nesse caso de teste?

**Alternativas:**
- A) Somente a cor do carrinho.
- B) Pré-condição, passos, dados e resultado esperado.
- C) Nada; o caso está completo.
- D) Apenas o nome do colega.

**Gabarito:** B

---

## ITEM 38 — Caso Executável por Outra Pessoa

- **Capacidade:** C3

**Comando:**  
Segundo a dinâmica da aula, quando um caso de teste é útil?

**Alternativas:**
- A) Quando é curto, com uma palavra.
- B) Quando só quem escreveu entende.
- C) Quando outra pessoa consegue executá-lo só lendo e saber se passou.
- D) Quando não tem resultado esperado.

**Gabarito:** C

---

## ITEM 39 — Resultado do CT-LOGIN-03

- **Capacidade:** C2

**Contexto:**  
O caso CT-LOGIN-03 testa o requisito "bloquear o acesso após 3 senhas erradas".

**Comando:**  
Qual é um resultado esperado bem escrito?

**Alternativas:**
- A) O sistema faz alguma coisa.
- B) O login deve funcionar bem.
- C) O usuário fica satisfeito.
- D) Mensagem "Acesso bloqueado por 15 minutos" e botão Entrar desabilitado.

**Gabarito:** D

---

## ITEM 40 — Suíte de Testes

- **Capacidade:** C3

**Comando:**  
O que é uma suíte de testes (6.3)?

**Alternativas:**
- A) O conjunto organizado de casos de teste, por funcionalidade ou por camada.
- B) Um único caso de teste muito grande.
- C) O documento de requisitos do cliente.
- D) A ferramenta que mede a cobertura.

**Gabarito:** A

---

## ITEM 41 — Matriz de Rastreabilidade

- **Capacidade:** C2

**Comando:**  
O que a matriz de rastreabilidade liga?

**Alternativas:**
- A) Cada tela ao seu servidor.
- B) Cada aluno à sua nota.
- C) Cada defeito ao seu programador.
- D) Cada requisito aos casos de teste que o verificam.

**Gabarito:** D

---

## ITEM 42 — Requisito Sem Caso

- **Capacidade:** C2

**Comando:**  
Na matriz de rastreabilidade, o que significa um requisito sem nenhum caso de teste?

**Alternativas:**
- A) É um requisito já aprovado pelo cliente.
- B) É um requisito de desempenho.
- C) É um requisito que não precisa de teste.
- D) É um requisito sem evidência de que foi verificado.

**Gabarito:** D

---

## ITEM 43 — BDD

- **Capacidade:** C2

**Comando:**  
No formato BDD, um caso de teste é escrito com:

**Alternativas:**
- A) Erro · Defeito · Falha.
- B) Dado (pré-condição) · Quando (ação) · Então (resultado esperado).
- C) Arrange · Debug · Deploy.
- D) Início · Meio · Fim.

**Gabarito:** B

---

## ITEM 44 — Dado no BDD

- **Capacidade:** C2

**Comando:**  
No BDD, a parte "Dado" corresponde a:

**Alternativas:**
- A) A pré-condição do caso de teste.
- B) A ação do usuário.
- C) O resultado esperado.
- D) O ID do caso.

**Gabarito:** A

---

## ITEM 45 — Requisito RF-11

- **Capacidade:** C1

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React. A especificação diz: "o subtotal é atualizado quando a quantidade muda".

**Comando:**  
Qual é a escrita testável desse requisito?

**Alternativas:**
- A) Subtotal = preço × quantidade de cada item.
- B) O subtotal aparece às vezes.
- C) O subtotal deve ser bonito.
- D) O subtotal é calculado pelo cliente.

**Gabarito:** A

---

## ITEM 46 — Faixa de Quantidade

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, está planejando os testes de uma loja virtual em React. O requisito diz: "quantidade de cada item de 1 a 10".

**Comando:**  
Quais valores-limite devem ser testados?

**Alternativas:**
- A) 5 e 6.
- B) 1, 2, 3 e 4.
- C) 0, 1, 10 e 11.
- D) 100 e 1.000.

**Gabarito:** C

---

## ITEM 47 — Cadastro Fácil

- **Capacidade:** C1

**Comando:**  
Qual é uma reescrita testável de "o cadastro deve ser fácil"?

**Alternativas:**
- A) "O cadastro deve ser moderno."
- B) "O cadastro deve ser muito fácil."
- C) "O usuário conclui o cadastro em até 3 telas e 2 minutos, sem ajuda."
- D) "O cadastro deve agradar a todos."

**Gabarito:** C

---

## ITEM 48 — Justificando Decisões

- **Capacidade:** C3

**Comando:**  
Qual é a justificativa técnica para dar mais testes ao login e ao pagamento do que ao rodapé?

**Alternativas:**
- A) A preferência pessoal do testador.
- B) O risco: probabilidade e impacto de falha são maiores nessas funcionalidades.
- C) O tamanho do código de cada tela.
- D) A ordem alfabética das telas.

**Gabarito:** B

---

## ITEM 49 — Cronograma do Plano

- **Capacidade:** C3

**Comando:**  
No plano de testes da UC, a seção Cronograma liga os testes:

**Alternativas:**
- A) Às aulas 3 a 10, em que cada camada de teste é executada.
- B) Às datas de pagamento dos clientes.
- C) Ao calendário de feriados.
- D) Ao horário de almoço da equipe.

**Gabarito:** A

---

## ITEM 50 — SA 1

- **Capacidade:** C3

**Comando:**  
O que a SA 1 pede para autenticação, carrinho e checkout?

**Alternativas:**
- A) Plano formal, no mínimo 5 casos por funcionalidade, matriz de rastreabilidade, esforço e riscos.
- B) Apenas um vídeo mostrando a loja.
- C) Somente o código das telas em React.
- D) Somente a lista de defeitos já corrigidos.

**Gabarito:** A

---
