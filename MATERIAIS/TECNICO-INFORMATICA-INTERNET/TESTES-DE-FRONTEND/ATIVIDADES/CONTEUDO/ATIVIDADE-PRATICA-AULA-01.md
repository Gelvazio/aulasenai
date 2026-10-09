# Atividade: Atividade Prática — Aula 01 — 10 Questões Discursivas

- **Aula:** AP-01
- **Rótulo da aula:** Atividade Prática — Aula 01
- **Tema:** Fundamentos de Testes de Software
- **Ícone:** 🧪
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-01.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de interfaces web, os conteúdos da aula 01 (CONTEUDO/AULA-01-FUNDAMENTOS-DE-TESTES-DE-SOFTWARE.md): por que testar, erro × defeito × falha, custo do defeito (Regra de 10 de Myers), verificação × validação, os 5 tipos de testes (funcionalidade, usabilidade, confiabilidade, desempenho e manutenibilidade), pirâmide de testes e responsabilidade de quem desenvolve.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-01-GABARITO.md, fora do Git) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 1

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para analisar a qualidade das telas de sistemas web (loja virtual, login, cadastro e app de música) e orientar a equipe de desenvolvimento.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito ou a classificação pedida; **(2)** o exemplo de tela ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Exemplos diferentes dos do padrão valem, desde que estejam corretos. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 01 | Questões |
|---|---|
| Por que testar; o que o teste prova e o que não prova | 01 |
| Erro, defeito e falha | 02, 03 |
| Custo do defeito (Regra de 10 de Myers) | 04 |
| Verificação × validação (5.1 e 5.2) | 05, 06 |
| Tipos de testes (4.1 a 4.5) | 07 |
| Pirâmide de testes (unitário, integração, E2E; cone de sorvete) | 08, 09 |
| Responsabilidade (1.1) e registro de falha | 10 |

---

## ITEM 01 — Por Que Testar Interfaces Web

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C1, C3

**Contexto:**
Você, como aluno consultor, foi chamado por uma equipe que vai publicar uma loja virtual na sexta-feira à noite. O líder da equipe diz: "Rodamos todos os testes e todos passaram, então o sistema não tem defeitos. Não precisamos testar mais nada".

**Comando:**
Oriente a equipe sobre o papel do teste.

**Tópicos:**
- a) Explique, em uma frase, qual é o objetivo de testar uma interface web. (0,2)
- b) Diga se a frase do líder está certa ou errada e justifique com o que o teste prova e o que ele não prova. (0,4)
- c) Explique como a equipe deve escolher o que testar, já que não dá para testar tudo, e dê um exemplo de funcionalidade da loja que deve ser testada primeiro, justificando. (0,4)

---

## ITEM 02 — Erro, Defeito e Falha no Cadastro

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, analisa a tela de cadastro de uma loja. A pessoa programadora entendeu que o CEP tem 9 dígitos e escreveu a validação aceitando somente 9 dígitos. Um cliente digita um CEP válido de 8 dígitos e recebe a mensagem "CEP inválido".

**Comando:**
Separe os três conceitos nessa situação.

**Tópicos:**
- a) Diga o que é o erro, o defeito e a falha nessa situação (um de cada). (0,2)
- b) Explique a relação entre os três conceitos (qual causa qual) e por que nem todo defeito vira falha. (0,4)
- c) Proponha um teste que teria encontrado esse problema antes do cliente: o dado usado, o resultado esperado e o resultado que seria obtido. (0,4)

---

## ITEM 03 — O Preço Que Aparece Como NaN

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe a reclamação de que na vitrine da loja o preço de alguns produtos aparece como "NaN". A equipe descobriu que a função de formatação recebe o preço como texto ("R$ 59,90") e tenta fazer contas com ele, porque alguém achou que a API devolvia número.

**Comando:**
Analise o problema com o vocabulário de testes.

**Tópicos:**
- a) Escreva o erro, o defeito e a falha dessa situação. (0,2)
- b) Diga qual tipo de teste (4.1 a 4.5) e qual camada da pirâmide (unitário, integração ou E2E) seria mais adequada para encontrar esse defeito, justificando. (0,4)
- c) Explique por que esse defeito, mesmo que só apareça em alguns produtos, deve ser tratado como risco e não pode ser ignorado. (0,4)

---

## ITEM 04 — O Custo do Defeito

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, participa da reunião de planejamento. O requisito do carrinho diz "aplicar desconto em compras grandes", sem dizer o valor mínimo. O gerente quer começar a programar logo e "resolver os detalhes depois, se o cliente reclamar".

**Comando:**
Mostre ao gerente o impacto de deixar o defeito para depois.

**Tópicos:**
- a) Explique o que diz a Regra de 10 de Myers. (0,2)
- b) Compare o custo de corrigir esse requisito ambíguo agora (na conversa) com o custo de corrigi-lo em produção, citando pelo menos dois prejuízos de produção. (0,4)
- c) Reescreva o requisito de forma verificável (com valor e regra claros) e explique por que a nova escrita reduz o risco de defeito. (0,4)

---

## ITEM 05 — Verificação ou Validação?

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C1, C3

**Contexto:**
Você, como aluno consultor, acompanha a revisão da tela de criação de senha de um aplicativo. O requisito diz: "a senha deve ter no mínimo 8 caracteres". A equipe conferiu que o campo recusa senhas com menos de 8 caracteres. Depois, em uma sessão com usuários reais, 4 de cada 10 pessoas desistiram do cadastro porque a tela não dizia qual era a regra da senha.

**Comando:**
Diferencie verificação e validação nessa tela.

**Tópicos:**
- a) Escreva a pergunta que resume a verificação e a pergunta que resume a validação. (0,2)
- b) Diga qual parte da situação é verificação e qual é validação, e se a tela passou ou falhou em cada uma, justificando. (0,4)
- c) Diga quando cada uma acontece no desenvolvimento e proponha uma mudança na tela para que ela também passe na validação. (0,4)

---

## ITEM 06 — Login Bloqueado Sem Mensagem

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, analisa a tela de login de uma loja virtual. O requisito diz: "o sistema deve bloquear o acesso após 3 tentativas com senha errada". Após a 3ª senha errada, o botão Entrar fica desabilitado, mas a tela não mostra nenhuma mensagem. Os clientes acham que o site travou e desistem da compra.

**Comando:**
Faça o diagnóstico e a recomendação do seu relatório de consultor.

**Tópicos:**
- a) Diga se a tela passa na verificação e se passa na validação. (0,2)
- b) Classifique pelos tipos de testes (4.1 a 4.5): o bloqueio após 3 tentativas, a mensagem clara para o usuário e o desbloqueio continuar funcionando mesmo se o e-mail de recuperação demorar. (0,4)
- c) Escreva a mensagem que você recomendaria incluir no requisito e explique por que ela resolve o problema de validação. (0,4)

---

## ITEM 07 — Os Cinco Tipos de Testes

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebeu 5 relatos de problemas de uma loja virtual: (1) o cupom de 10% está reduzindo só 1% do total; (2) a página do produto leva 6 segundos para abrir no 4G; (3) o campo de data não aceita digitação pelo teclado; (4) se a API de frete cair, o carrinho é apagado; (5) um teste quebra sempre que mudam o nome de uma classe CSS.

**Comando:**
Classifique os problemas e explique os tipos de testes.

**Tópicos:**
- a) Classifique cada um dos 5 relatos em um tipo de teste: funcionalidade, usabilidade, confiabilidade, desempenho ou manutenibilidade. (0,2)
- b) Escreva a pergunta que cada um dos 5 tipos de testes responde. (0,4)
- c) Escolha dois dos relatos e escreva, para cada um, um teste que confirmaria a correção (o que fazer na tela e o resultado esperado). (0,4)

---

## ITEM 08 — A Pirâmide de Testes

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, encontrou numa equipe uma suíte com 300 testes E2E e apenas 20 testes unitários. A suíte leva 2 horas para rodar e falha "às vezes", sem motivo claro.

**Comando:**
Explique a pirâmide de testes à equipe.

**Tópicos:**
- a) Descreva o que fica na base, no meio e no topo da pirâmide de testes. (0,2)
- b) Explique o que é o "cone de sorvete" (pirâmide invertida) e por que ele deixa a suíte da equipe lenta e instável. (0,4)
- c) Classifique em unitário, integração ou E2E: a função calcularDesconto(), a máscara de CPF durante a digitação, o envio de formulário para uma API simulada e a compra completa da vitrine até a confirmação; justifique um deles. (0,4)

---

## ITEM 09 — Estratégia de Testes de Duas Aplicações

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, precisa propor a estratégia de testes de duas aplicações: um app de crédito (cálculo de juros, regras fiscais, simulação de empréstimo e Pix) e um app de música na web (busca de músicas, playlists e reprodução).

**Comando:**
Monte a estratégia de testes das duas aplicações.

**Tópicos:**
- a) Diga qual camada da pirâmide deve ser a mais forte no app de crédito e por quê. (0,2)
- b) Para o app de música, proponha 3 testes unitários, 2 de integração e 1 jornada E2E (um exemplo de cada, em uma linha). (0,4)
- c) Explique por que quanto mais alto na pirâmide o teste é mais lento e mais caro, e por que mesmo assim é preciso ter alguns testes E2E. (0,4)

---

## ITEM 10 — Responsabilidade e Registro de Falha

- **Aula:** 01 · Fundamentos de Testes de Software
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, percebeu que uma alteração feita por você mesmo no checkout fez o botão "Finalizar compra" parar de responder quando o cliente usa cupom. Um colega sugere: "Ninguém percebeu ainda, deixa quieto e marca a tarefa como pronta".

**Comando:**
Mostre como agir com responsabilidade.

**Tópicos:**
- a) Explique o que significa a responsabilidade (1.1) de quem desenvolve na qualidade do que entrega. (0,2)
- b) Escreva o registro da falha com os quatro dados que permitem reproduzi-la: passos, dado usado, resultado obtido e resultado esperado. (0,4)
- c) Responda ao colega justificando por que não se deve esconder o defeito, citando o custo do defeito e o risco para os clientes. (0,4)
