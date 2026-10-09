# Atividade: Fundamentos de Testes de Software — 50 Questões

- **Aula:** 01
- **Tema:** Fundamentos de Testes de Software
- **Ícone:** 🧪
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer as especificações técnicas da interface, os requisitos da documentação de testes e as etapas de planejamento de testes: erro, defeito e falha; verificação e validação; tipos de testes (funcionalidade, usabilidade, confiabilidade, desempenho e manutenibilidade); pirâmide de testes e responsabilidade de quem desenvolve.
- **Conteúdo-base:** `../CONTEUDO/AULA-01-FUNDAMENTOS-DE-TESTES-DE-SOFTWARE.md`
- **Slides:** `../AULAS/AULA-01-SLIDES.pdf`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-01-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Para Que Serve Testar

- **Capacidade:** C1

**Comando:**  
Qual é o principal objetivo de testar uma interface web?

**Alternativas:**
- A) Deixar a tela mais bonita antes da entrega.
- B) Substituir a revisão do código feita pela equipe.
- C) Provar que o software não tem nenhum defeito.
- D) Produzir evidência de que o software atende aos requisitos antes que o usuário encontre o problema.

**Gabarito:** D

---

## ITEM 02 — O Que o Teste Não Prova

- **Capacidade:** C2

**Comando:**  
Sobre o que um conjunto de testes aprovados permite concluir, assinale a correta.

**Alternativas:**
- A) Não é mais preciso testar nas próximas versões.
- B) O usuário nunca verá uma falha na tela.
- C) O sistema está livre de qualquer defeito.
- D) Os defeitos procurados não foram encontrados, mas podem existir outros.

**Gabarito:** D

---

## ITEM 03 — Verdadeiro ou Falso do Teste

- **Capacidade:** C2

**Comando:**  
A frase "se todos os testes passam, o sistema não tem defeitos" é:

**Alternativas:**
- A) Falsa, porque testar mostra a presença de defeitos, não a ausência deles.
- B) Verdadeira, desde que os testes sejam automatizados.
- C) Falsa, porque testes automatizados nunca passam de primeira.
- D) Verdadeira, se a cobertura passar de 50%.

**Gabarito:** A

---

## ITEM 04 — Escolha do Que Testar

- **Capacidade:** C3

**Comando:**  
Como se escolhe o que testar, já que não é possível testar tudo?

**Alternativas:**
- A) Pelos requisitos e pelos riscos de cada funcionalidade.
- B) Pela ordem alfabética das telas.
- C) Somente pelas telas mais bonitas.
- D) Pelo que for mais rápido de escrever.

**Gabarito:** A

---

## ITEM 05 — Definição de Erro

- **Capacidade:** C2

**Comando:**  
No vocabulário de testes, o que é um erro (engano)?

**Alternativas:**
- A) Uma linha de log gerada pelo navegador.
- B) Uma ação humana equivocada, como entender errado um requisito.
- C) O comportamento errado que o usuário vê na tela.
- D) O resultado esperado escrito no caso de teste.

**Gabarito:** B

---

## ITEM 06 — Definição de Defeito

- **Capacidade:** C2

**Comando:**  
O que é um defeito (bug)?

**Alternativas:**
- A) A reclamação registrada pelo cliente no suporte.
- B) O engano da pessoa que escreveu o requisito.
- C) O problema que ficou no código ou no documento.
- D) A ferramenta usada para rodar os testes.

**Gabarito:** C

---

## ITEM 07 — Definição de Falha

- **Capacidade:** C2

**Comando:**  
O que é uma falha?

**Alternativas:**
- A) A linha de código que contém o problema.
- B) A pessoa que causou o problema.
- C) O documento com os requisitos da tela.
- D) O comportamento errado observado quando o sistema é executado.

**Gabarito:** D

---

## ITEM 08 — Cadeia Erro → Defeito → Falha

- **Capacidade:** C2

**Comando:**  
Qual é a sequência correta entre os três conceitos?

**Alternativas:**
- A) A falha gera o defeito, que gera o erro.
- B) A falha gera o erro, que gera o defeito.
- C) O defeito gera o erro, que gera a falha.
- D) O erro gera o defeito, e o defeito, quando executado, provoca a falha.

**Gabarito:** D

---

## ITEM 09 — Identificando o Erro no CEP

- **Capacidade:** C2

**Contexto:**  
Na tela de cadastro, a pessoa programadora entendeu que o CEP tem 9 dígitos.

**Comando:**  
Esse entendimento equivocado é classificado como:

**Alternativas:**
- A) Falha.
- B) Defeito.
- C) Erro (engano).
- D) Validação.

**Gabarito:** C

---

## ITEM 10 — Identificando o Defeito no CEP

- **Capacidade:** C2

**Contexto:**  
A validação do campo CEP foi escrita para aceitar somente 9 dígitos.

**Comando:**  
A regra escrita no código é classificada como:

**Alternativas:**
- A) Falha.
- B) Defeito.
- C) Verificação.
- D) Erro (engano).

**Gabarito:** B

---

## ITEM 11 — Identificando a Falha no CEP

- **Capacidade:** C2

**Contexto:**  
O usuário digita um CEP válido de 8 dígitos e recebe a mensagem "CEP inválido".

**Comando:**  
O que o usuário observa é classificado como:

**Alternativas:**
- A) Defeito.
- B) Erro (engano).
- C) Falha.
- D) Requisito.

**Gabarito:** C

---

## ITEM 12 — Defeito Que Não Vira Falha

- **Capacidade:** C2

**Comando:**  
Por que nem todo defeito vira falha?

**Alternativas:**
- A) Porque o navegador corrige o defeito sozinho.
- B) Porque o trecho com defeito pode nunca ser executado.
- C) Porque defeitos só aparecem em testes automatizados.
- D) Porque o usuário nunca usa telas de cadastro.

**Gabarito:** B

---

## ITEM 13 — Defeito Como Risco

- **Capacidade:** C3

**Comando:**  
Mesmo que um defeito nunca tenha provocado falha, ele deve ser tratado como:

**Alternativas:**
- A) Um risco, pois pode virar falha quando o trecho for executado.
- B) Um problema resolvido, já que ninguém reclamou.
- C) Uma melhoria opcional de aparência.
- D) Um teste aprovado.

**Gabarito:** A

---

## ITEM 14 — Preço Que Aparece Como NaN

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, foi chamado para analisar as telas de uma loja virtual antes da publicação. Na vitrine, o preço aparece como "NaN".

**Comando:**  
O texto "NaN" exibido na vitrine é:

**Alternativas:**
- A) O defeito, que é a linha de código.
- B) A falha, que é o que o usuário vê de errado.
- C) O erro, que é o engano humano.
- D) A validação, que é a necessidade do usuário.

**Gabarito:** B

---

## ITEM 15 — Regra de 10 de Myers

- **Capacidade:** C3

**Comando:**  
O que diz a Regra de 10 de Myers?

**Alternativas:**
- A) Todo sistema precisa de exatamente 10 testes.
- B) A cada 10 linhas de código existe um defeito.
- C) Um teste deve durar no máximo 10 segundos.
- D) O custo de corrigir um defeito cresce cerca de 10 vezes a cada fase em que ele avança.

**Gabarito:** D

---

## ITEM 16 — Fase Mais Barata Para Corrigir

- **Capacidade:** C3

**Comando:**  
Em qual fase corrigir um defeito costuma ser mais barato?

**Alternativas:**
- A) No requisito, antes de o código ser escrito.
- B) Em produção, quando o cliente reclama.
- C) Depois da publicação, numa versão nova.
- D) Na fase de testes do sistema completo.

**Gabarito:** A

---

## ITEM 17 — Custo do Defeito em Produção

- **Capacidade:** C3

**Comando:**  
Por que um defeito encontrado em produção custa mais caro?

**Alternativas:**
- A) Porque a ferramenta de testes é paga só em produção.
- B) Envolve vendas perdidas, suporte, correção urgente e nova publicação.
- C) Porque o código em produção não pode ser alterado.
- D) Porque em produção os defeitos se multiplicam sozinhos.

**Gabarito:** B

---

## ITEM 18 — Pergunta da Verificação

- **Capacidade:** C1

**Comando:**  
Qual pergunta resume a verificação?

**Alternativas:**
- A) Quantos usuários vão acessar a tela?
- B) Qual é a cor preferida do cliente?
- C) É o produto que o usuário realmente precisa?
- D) Estamos construindo o produto certo conforme a especificação?

**Gabarito:** D

---

## ITEM 19 — Pergunta da Validação

- **Capacidade:** C1

**Comando:**  
Qual pergunta resume a validação?

**Alternativas:**
- A) É o produto que o usuário precisa?
- B) O código segue o padrão de nomes da equipe?
- C) A tela foi feita na tecnologia combinada?
- D) O campo senha tem 8 caracteres, como diz o requisito?

**Gabarito:** A

---

## ITEM 20 — Com o Que a Verificação Compara

- **Capacidade:** C1

**Comando:**  
A verificação compara o produto com:

**Alternativas:**
- A) O tempo de resposta do servidor.
- B) Requisitos, protótipo e regras de negócio.
- C) A opinião do usuário em uso real.
- D) A quantidade de acessos da tela.

**Gabarito:** B

---

## ITEM 21 — Com o Que a Validação Compara

- **Capacidade:** C1

**Comando:**  
A validação compara o produto com:

**Alternativas:**
- A) A necessidade real e o uso do usuário.
- B) O documento de requisitos linha a linha.
- C) O código-fonte da aplicação.
- D) A lista de bibliotecas instaladas.

**Gabarito:** A

---

## ITEM 22 — Exemplo de Verificação

- **Capacidade:** C1

**Comando:**  
Qual situação é um exemplo de verificação?

**Alternativas:**
- A) Observar se o usuário cria a senha sem desistir do cadastro.
- B) Perguntar ao cliente se gostou das cores.
- C) Medir quantos usuários voltam no dia seguinte.
- D) Conferir se o campo senha exige 8 caracteres, como diz o requisito.

**Gabarito:** D

---

## ITEM 23 — Exemplo de Validação

- **Capacidade:** C1

**Comando:**  
Qual situação é um exemplo de validação?

**Alternativas:**
- A) Comparar o layout com o protótipo aprovado.
- B) Conferir se o campo senha exige 8 caracteres.
- C) Observar se o usuário consegue criar a senha sem desistir do cadastro.
- D) Ler o código da função de cadastro.

**Gabarito:** C

---

## ITEM 24 — Passa na Verificação e Falha na Validação

- **Capacidade:** C1

**Contexto:**  
Você, como aluno consultor, foi chamado para analisar as telas de uma loja virtual antes da publicação. Tudo está como a especificação pediu, mas o usuário não encontra o botão de continuar.

**Comando:**  
Essa tela:

**Alternativas:**
- A) Falhou na verificação e na validação.
- B) Passou na verificação e na validação.
- C) Falhou na verificação e passou na validação.
- D) Passou na verificação e falhou na validação.

**Gabarito:** D

---

## ITEM 25 — Login Bloqueado Sem Mensagem

- **Capacidade:** C1

**Contexto:**  
Você, como aluno consultor, analisa o login de uma loja: após a 3ª senha errada, o botão Entrar fica desabilitado, como pede o requisito, mas não aparece mensagem e os clientes acham que o site travou.

**Comando:**  
Qual é o diagnóstico correto?

**Alternativas:**
- A) A tela está perfeita, pois seguiu o requisito.
- B) O problema é de desempenho, pois o site travou.
- C) A tela atende à especificação (verificação), mas não atende ao usuário (validação).
- D) A tela falhou na verificação, pois o botão foi desabilitado.

**Gabarito:** C

---

## ITEM 26 — Quando a Verificação Acontece

- **Capacidade:** C3

**Comando:**  
Quando a verificação deve acontecer?

**Alternativas:**
- A) Somente no último dia do projeto.
- B) Somente depois da publicação.
- C) Apenas quando o cliente reclamar.
- D) Durante todo o desenvolvimento.

**Gabarito:** D

---

## ITEM 27 — Quando a Validação Acontece

- **Capacidade:** C3

**Comando:**  
Quando a validação acontece?

**Alternativas:**
- A) Somente na leitura do documento de requisitos.
- B) Com o produto ou o protótipo em uso pelo usuário.
- C) Antes de existir qualquer protótipo.
- D) Apenas na revisão do código.

**Gabarito:** B

---

## ITEM 28 — Teste de Funcionalidade

- **Capacidade:** C2

**Comando:**  
Qual pergunta o teste de funcionalidade (4.1) responde?

**Alternativas:**
- A) Faz o que o requisito pede?
- B) Continua funcionando quando algo dá errado?
- C) Responde no tempo esperado?
- D) É fácil de alterar sem quebrar?

**Gabarito:** A

---

## ITEM 29 — Exemplo de Funcionalidade

- **Capacidade:** C2

**Comando:**  
Qual é um exemplo de teste de funcionalidade?

**Alternativas:**
- A) A vitrine carrega em menos de 2,5 s no 4G.
- B) A mensagem de erro indica o campo a corrigir.
- C) Trocar uma classe CSS não quebra a suíte.
- D) O cupom de 10% reduz o total da compra em 10%.

**Gabarito:** D

---

## ITEM 30 — Teste de Usabilidade

- **Capacidade:** C2

**Comando:**  
Qual pergunta o teste de usabilidade (4.2) responde?

**Alternativas:**
- A) Faz o que o requisito pede?
- B) Responde no tempo esperado?
- C) O usuário consegue usar com facilidade?
- D) É fácil de alterar sem quebrar?

**Gabarito:** C

---

## ITEM 31 — Exemplo de Usabilidade

- **Capacidade:** C2

**Comando:**  
Qual é um exemplo de teste de usabilidade?

**Alternativas:**
- A) A API responde em 200 ms.
- B) A tela funciona com teclado e com leitor de tela.
- C) A suíte roda em menos de 1 minuto.
- D) O total do carrinho soma os itens corretamente.

**Gabarito:** B

---

## ITEM 32 — Teste de Confiabilidade

- **Capacidade:** C2

**Comando:**  
Qual pergunta o teste de confiabilidade (4.3) responde?

**Alternativas:**
- A) Continua funcionando quando algo dá errado?
- B) O usuário consegue usar com facilidade?
- C) Faz o que o requisito pede?
- D) Os testes são legíveis?

**Gabarito:** A

---

## ITEM 33 — Exemplo de Confiabilidade

- **Capacidade:** C2

**Comando:**  
Qual é um exemplo de teste de confiabilidade?

**Alternativas:**
- A) Se a API falhar, a tela mostra um aviso e não perde o carrinho.
- B) O cupom de 10% reduz o total em 10%.
- C) O botão Pagar tem contraste adequado.
- D) A página do produto abre em 2 s.

**Gabarito:** A

---

## ITEM 34 — Teste de Desempenho

- **Capacidade:** C2

**Comando:**  
Qual pergunta o teste de desempenho (4.4) responde?

**Alternativas:**
- A) Responde no tempo esperado?
- B) É fácil de alterar sem quebrar?
- C) Continua funcionando quando algo dá errado?
- D) O usuário entende as mensagens?

**Gabarito:** A

---

## ITEM 35 — Página Que Leva 6 Segundos

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, foi chamado para analisar as telas de uma loja virtual antes da publicação. A página do produto leva 6 segundos para abrir.

**Comando:**  
Esse problema seria encontrado por qual tipo de teste?

**Alternativas:**
- A) Desempenho (4.4).
- B) Manutenibilidade (4.5).
- C) Usabilidade (4.2).
- D) Funcionalidade (4.1).

**Gabarito:** A

---

## ITEM 36 — Teste de Manutenibilidade

- **Capacidade:** C2

**Comando:**  
Qual pergunta o teste de manutenibilidade (4.5) responde?

**Alternativas:**
- A) O usuário consegue usar com facilidade?
- B) É fácil de alterar sem quebrar?
- C) Responde no tempo esperado?
- D) Faz o que o requisito pede?

**Gabarito:** B

---

## ITEM 37 — Teste Que Quebra Com Classe CSS

- **Capacidade:** C2

**Contexto:**  
Na suíte de testes da loja, um teste quebra sempre que mudam o nome de uma classe CSS.

**Comando:**  
Esse problema está ligado a qual tipo de teste?

**Alternativas:**
- A) Desempenho (4.4).
- B) Manutenibilidade (4.5).
- C) Confiabilidade (4.3).
- D) Funcionalidade (4.1).

**Gabarito:** B

---

## ITEM 38 — Campo de Data Sem Teclado

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, foi chamado para analisar as telas de uma loja virtual antes da publicação. O campo de data não aceita digitação pelo teclado, só o clique no calendário.

**Comando:**  
Esse problema seria encontrado por qual tipo de teste?

**Alternativas:**
- A) Manutenibilidade (4.5).
- B) Desempenho (4.4).
- C) Confiabilidade (4.3).
- D) Usabilidade (4.2).

**Gabarito:** D

---

## ITEM 39 — Carrinho Some ao Atualizar

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, foi chamado para analisar as telas de uma loja virtual antes da publicação. O total do carrinho some quando o usuário atualiza a página.

**Comando:**  
Qual tipo de teste teria pego esse problema antes?

**Alternativas:**
- A) Usabilidade (4.2), pois o usuário clicou em atualizar.
- B) Desempenho (4.4), pois a página foi recarregada.
- C) Confiabilidade (4.3), pois a tela não preserva o estado em uma situação adversa.
- D) Manutenibilidade (4.5), pois o código mudou.

**Gabarito:** C

---

## ITEM 40 — Botão Pagar e Leitor de Tela

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, foi chamado para analisar as telas de uma loja virtual antes da publicação. O botão Pagar não é lido pelo leitor de tela.

**Comando:**  
Esse problema é de qual tipo de teste?

**Alternativas:**
- A) Manutenibilidade (4.5).
- B) Desempenho (4.4).
- C) Usabilidade (4.2), que inclui a acessibilidade.
- D) Confiabilidade (4.3).

**Gabarito:** C

---

## ITEM 41 — Base da Pirâmide

- **Capacidade:** C3

**Comando:**  
O que fica na base da pirâmide de testes?

**Alternativas:**
- A) Testes de integração com o banco de produção.
- B) Poucos testes E2E no navegador real.
- C) Muitos testes unitários, rápidos, de funções isoladas.
- D) Testes manuais feitos pelo cliente.

**Gabarito:** C

---

## ITEM 42 — Meio da Pirâmide

- **Capacidade:** C3

**Comando:**  
O que fica no meio da pirâmide de testes?

**Alternativas:**
- A) Testes de funções puras isoladas.
- B) Testes de integração de componentes com DOM, eventos e API simulada.
- C) Fluxos completos no navegador real.
- D) Revisões de código feitas em dupla.

**Gabarito:** B

---

## ITEM 43 — Topo da Pirâmide

- **Capacidade:** C3

**Comando:**  
O que fica no topo da pirâmide de testes?

**Alternativas:**
- A) Poucos testes E2E dos fluxos críticos no navegador real.
- B) Muitos testes unitários de funções.
- C) Testes de integração com API simulada.
- D) Medições de cobertura de código.

**Gabarito:** A

---

## ITEM 44 — Subindo na Pirâmide

- **Capacidade:** C3

**Comando:**  
Quanto mais alto na pirâmide de testes, o teste tende a ser:

**Alternativas:**
- A) Mais barato e com menos dependências.
- B) Mais rápido, mais barato e mais isolado.
- C) Mais lento, mais caro e mais próximo da experiência do usuário.
- D) Mais rápido e mais distante do usuário.

**Gabarito:** C

---

## ITEM 45 — Cone de Sorvete

- **Capacidade:** C3

**Comando:**  
O que é a pirâmide invertida, chamada de "cone de sorvete"?

**Alternativas:**
- A) Uma suíte sem nenhum teste automatizado.
- B) Uma suíte que só tem testes de integração.
- C) Uma suíte com muitos unitários e poucos E2E.
- D) Uma suíte com muitos E2E e poucos unitários, que fica lenta e instável.

**Gabarito:** D

---

## ITEM 46 — Pirâmide de Uma Fintech

- **Capacidade:** C3

**Contexto:**  
Você, como aluno consultor, propõe a estratégia de testes de um app de crédito com cálculo de juros, regras fiscais e simulação de empréstimo.

**Comando:**  
Qual proporção faz mais sentido?

**Alternativas:**
- A) Nenhum teste unitário, apenas integração.
- B) Base unitária forte, pois as regras matemáticas pedem muitos testes de funções.
- C) Maioria de testes E2E, pois o usuário usa o navegador.
- D) Somente testes manuais, pois juros são complexos.

**Gabarito:** B

---

## ITEM 47 — Classificando Cenário Unitário

- **Capacidade:** C3

**Comando:**  
A função calcularDesconto() para compras acima de R$ 200 deve ser testada principalmente com:

**Alternativas:**
- A) Teste de integração com API.
- B) Teste E2E.
- C) Teste unitário.
- D) Teste de carga.

**Gabarito:** C

---

## ITEM 48 — Classificando Cenário E2E

- **Capacidade:** C3

**Comando:**  
A compra completa (vitrine → carrinho → pagamento → confirmação) deve ser testada com:

**Alternativas:**
- A) Teste de componente isolado.
- B) Teste de manutenibilidade.
- C) Teste E2E.
- D) Teste unitário.

**Gabarito:** C

---

## ITEM 49 — Responsabilidade de Quem Desenvolve

- **Capacidade:** C3

**Comando:**  
O que significa a responsabilidade (1.1) de quem desenvolve na qualidade?

**Alternativas:**
- A) Não marcar tarefa como pronta sem teste e relatar defeitos, mesmo os próprios.
- B) Deixar os testes só para a equipe de qualidade.
- C) Relatar apenas os defeitos dos colegas.
- D) Esconder os defeitos que a própria pessoa causou.

**Gabarito:** A

---

## ITEM 50 — Registro de Uma Falha

- **Capacidade:** C2

**Contexto:**  
Você, como aluno consultor, encontrou uma falha no checkout e precisa registrá-la para a equipe.

**Comando:**  
O que o registro deve conter para permitir reproduzir a falha?

**Alternativas:**
- A) Somente a frase "o checkout não funciona".
- B) Passos, dado usado, resultado obtido e resultado esperado.
- C) O nome da pessoa que causou o problema.
- D) Apenas um print da tela sem descrição.

**Gabarito:** B

---
