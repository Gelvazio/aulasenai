# Atividade: Atividade Prática — Aula 02 — 10 Questões Discursivas

- **Aula:** AP-02
- **Rótulo da aula:** Atividade Prática — Aula 02
- **Tema:** Planejamento, Verificação, Validação e Casos de Teste
- **Ícone:** 📋
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-02.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de uma loja virtual, os conteúdos da aula 02 (CONTEUDO/AULA-02-PLANEJAMENTO-VERIFICACAO-VALIDACAO-E-CASOS-DE-TESTE.md): análise do documento de requisitos (vago × testável), processo de teste (planejamento e desenho), plano de testes (escopo, fora do escopo, estratégia, ambientes, riscos, métricas, cronograma), risco = probabilidade × impacto, caixa preta e caixa branca, partição de equivalência, valores-limite, caso de teste, suíte, matriz de rastreabilidade e BDD.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-02-GABARITO.md, fora do Git) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 2

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado por uma startup de comércio eletrônico em React que não tem estratégia de testes, para planejar os testes de autenticação, carrinho e checkout (SA 1).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito, a classificação ou os valores pedidos; **(2)** a aplicação na situação (requisito, caso de teste, plano); **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Valores, IDs e textos diferentes dos do padrão valem, desde que estejam corretos e completos. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 02 | Questões |
|---|---|
| Análise do documento de requisitos (vago × testável) | 01, 02 |
| Processo de teste: planejamento (7.1) e desenho (7.2) | 03 |
| Plano de testes (6.2) e riscos | 04, 05 |
| Caixa preta (3.1) × caixa branca (3.2) | 06 |
| Partição de equivalência e valores-limite | 07, 08 |
| Caso de teste (6.4), BDD | 09 |
| Suíte (6.3) e matriz de rastreabilidade | 10 |

---

## ITEM 01 — Requisito Vago ou Testável

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, recebeu da startup três requisitos: (R1) "o login deve ser rápido"; (R2) "a senha deve ser segura"; (R3) "frete grátis para compras a partir de R$ 199,00".

**Comando:**
Analise os requisitos antes de escrever qualquer teste.

**Tópicos:**
- a) Explique o que um requisito precisa ter para ser testável. (0,2)
- b) Diga quais dos três requisitos são vagos e escreva, para cada vago, a pergunta que você faria à equipe. (0,4)
- c) Reescreva os requisitos vagos de forma testável (com número, regra e resultado verificável) e explique por que a nova escrita permite testar. (0,4)

---

## ITEM 02 — Requisitos do Carrinho

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C1, C2

**Contexto:**
Você, como aluno consultor, recebeu a especificação do carrinho: "o usuário pode alterar a quantidade de cada item; o subtotal é atualizado; acima de R$ 199,00 o frete é grátis". A especificação não diz o limite da quantidade.

**Comando:**
Transforme a especificação em requisitos testáveis numerados.

**Tópicos:**
- a) Escreva os três requisitos testáveis do carrinho com identificador (ex.: RF-10, RF-11, RF-12). (0,2)
- b) Aponte a lacuna da especificação (o que está faltando ou ambíguo) e explique o risco de começar a programar sem esclarecê-la. (0,4)
- c) Diga se "frete grátis acima de R$ 199,00" inclui ou não o valor R$ 199,00, mostre por que isso muda o teste e proponha a escrita final do requisito. (0,4)

---

## ITEM 03 — O Processo de Teste

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, percebeu que a equipe da startup já começou a escrever testes automatizados no Vitest sem ter definido o que testar, quem testa e quando.

**Comando:**
Explique à equipe o processo fundamental de teste.

**Tópicos:**
- a) Liste, em ordem, as 5 atividades do processo fundamental de teste. (0,2)
- b) Explique o que é feito no planejamento (7.1) e no desenho dos testes (7.2), dando um exemplo de cada para o checkout da loja. (0,4)
- c) Explique por que começar pela execução, sem planejamento e desenho, é um erro, citando pelo menos duas consequências para o projeto. (0,4)

---

## ITEM 04 — O Plano de Testes

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, vai montar o plano de testes de 1 página da loja (autenticação, carrinho e checkout). A integração real com a operadora de cartão depende de um serviço externo que a equipe não controla.

**Comando:**
Monte as partes principais do plano.

**Tópicos:**
- a) Escreva o escopo e o fora do escopo do plano, com a justificativa do que ficou fora. (0,2)
- b) Escreva a estratégia (proporção unitário/integração/E2E e as ferramentas) e os ambientes e massa de testes (navegadores, usuários e produtos de teste). (0,4)
- c) Escreva as métricas e o cronograma do plano (ligando às aulas 3 a 10) e explique para que servem as métricas. (0,4)

---

## ITEM 05 — Riscos do Projeto

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, precisa justificar para o dono da startup por que o pagamento e o login vão receber muito mais testes do que a página "Quem somos".

**Comando:**
Analise os riscos e justifique as escolhas do plano.

**Tópicos:**
- a) Escreva a fórmula do risco usada no planejamento. (0,2)
- b) Registre 3 riscos do projeto com probabilidade, impacto (baixo/médio/alto) e mitigação. (0,4)
- c) Justifique tecnicamente, com base no risco, por que o pagamento e o login recebem mais casos e mais camadas de teste que a página "Quem somos". (0,4)

---

## ITEM 06 — Caixa Preta e Caixa Branca

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, revisa a função de frete da loja: if (subtotal >= 199) { frete = 0 } else { frete = 19.90 }. Um testador da equipe testou digitando CEPs com 7, 8 e 9 dígitos; outro testou o if do frete no lado verdadeiro e no lado falso.

**Comando:**
Diferencie as duas técnicas de testes.

**Tópicos:**
- a) Diga qual dos dois testadores fez teste de caixa preta e qual fez teste de caixa branca. (0,2)
- b) Compare as duas técnicas: para o que cada uma olha, qual é a base e quais técnicas usa. (0,4)
- c) Escreva os dois testes de caixa branca da função de frete (um para cada lado do if), com o subtotal usado e o frete esperado, e explique o que é cobertura de desvios. (0,4)

---

## ITEM 07 — Partição de Equivalência e Valores-Limite da Senha

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, vai desenhar os testes do requisito: "a senha deve ter de 8 a 64 caracteres".

**Comando:**
Aplique as técnicas de caixa preta.

**Tópicos:**
- a) Explique o que é a partição de equivalência e o que são valores-limite. (0,2)
- b) Liste as partições de equivalência do tamanho da senha, com um valor de exemplo e o resultado esperado de cada uma. (0,4)
- c) Liste os valores-limite que devem ser testados, com o resultado esperado de cada um, e explique por que os defeitos aparecem com mais frequência nas bordas. (0,4)

---

## ITEM 08 — Valores-Limite do Frete e da Idade

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebeu dois requisitos: (1) frete grátis quando o subtotal for maior ou igual a R$ 199,00; (2) o cadastro aceita idade entre 16 e 60 anos.

**Comando:**
Defina os dados de teste das duas regras.

**Tópicos:**
- a) Escreva os 3 valores-limite do subtotal para o frete, com o resultado esperado de cada um. (0,2)
- b) Escreva as partições e os valores-limite da idade, com o resultado esperado de cada valor. (0,4)
- c) Explique por que testar só R$ 50,00 e R$ 500,00 no frete (valores do meio das partições) não seria suficiente e que defeito poderia passar despercebido. (0,4)

---

## ITEM 09 — Caso de Teste Completo

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C2, C3

**Contexto:**
Você, como aluno consultor, recebeu da equipe o caso "CT-01: testar o carrinho". O requisito RF-02 da loja diz: "bloquear o acesso após 3 senhas erradas, por 15 minutos".

**Comando:**
Corrija e escreva casos de teste completos.

**Tópicos:**
- a) Aponte o que falta no caso "CT-01: testar o carrinho" para que outra pessoa consiga executá-lo. (0,2)
- b) Escreva o caso de teste CT-LOGIN-03 do RF-02 com todos os campos: ID, requisito, pré-condição, passos, dados, resultado esperado e tipo/camada. (0,4)
- c) Reescreva o mesmo caso no formato BDD (Dado · Quando · Então) e explique a vantagem desse formato para a equipe. (0,4)

---

## ITEM 10 — Suíte e Matriz de Rastreabilidade

- **Aula:** 02 · Planejamento, Verificação, Validação e Casos de Teste
- **Capacidade:** C2, C3

**Contexto:**
Você, como aluno consultor, organizou os casos da loja: CT-LOGIN-01 a 03 (RF-01 e RF-02), CT-CAR-01 e 02 (RF-10 e RF-11) e CT-CHK-01 (RF-20). O requisito RF-12 (frete grátis) ainda não tem nenhum caso.

**Comando:**
Organize a suíte e a rastreabilidade.

**Tópicos:**
- a) Explique o que é uma suíte de testes e como você organizaria a suíte da loja. (0,2)
- b) Monte a matriz de rastreabilidade requisito × casos com os dados do contexto (uma linha por requisito, incluindo o RF-12). (0,4)
- c) Explique o que significa o RF-12 estar sem caso na matriz e escreva o caso que você criaria para ele (ID, dados e resultado esperado). (0,4)
