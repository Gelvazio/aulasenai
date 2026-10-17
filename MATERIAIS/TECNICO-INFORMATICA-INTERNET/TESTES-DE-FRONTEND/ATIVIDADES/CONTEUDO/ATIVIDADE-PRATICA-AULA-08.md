# Atividade: Atividade Prática — Aula 08 — 10 Questões Discursivas

- **Aula:** AP-08
- **Rótulo da aula:** Atividade Prática — Aula 08
- **Tema:** TDD e Debugging Moderno no Front-End
- **Ícone:** 🔁
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-08.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Desenvolver, por escrito, testes automatizados com TDD e depurar falhas com os conteúdos da aula 08 (CONTEUDO/AULA-08-TDD-E-DEBUGGING-NO-FRONT-END.md): o ciclo vermelho, verde e refatorar, vantagens e limites do TDD, TDD do validador de CPF, caixa branca guiando o próximo teste (3.2), TDD no componente de filtro de produtos, depuração com it.only, breakpoint e screen.debug, responsabilidade na entrega (1.1) e code review de testes com respeito (S1).
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-08-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 8

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado porque o cadastro de clientes de uma loja virtual aceita CPFs inválidos e recusa alguns válidos, e o código não tem testes. Você vai refazer a validação com TDD, criar o filtro de produtos da vitrine e depurar as falhas encontradas.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o código pedido escrito por inteiro (teste com describe, it e expect ou código mínimo) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Escreva o código como escreveria no VS Code. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código correto (import, função testada, valor de entrada e matcher adequado) e justificativa com as palavras-chave do conteúdo. Nomes de testes e variáveis diferentes valem, desde que o código esteja correto; aspas simples ou duplas e ponto e vírgula opcional são aceitos. Erros de português não tiram nota se a ideia estiver clara.

**Função usada em várias questões (src/validarCPF.js):** validarCPF(valor) tira pontos e traço do valor; devolve false se não sobrarem exatamente 11 dígitos ou se todos os dígitos forem iguais; calcula o primeiro dígito verificador com os 9 primeiros números (peso inicial 10) e o segundo com os 10 primeiros (peso inicial 11) — em cada cálculo, se o resto da soma por 11 for menor que 2 o dígito é 0, senão é 11 - resto — e devolve true só se o CPF terminar com esses dois dígitos. Exemplos: 529.982.247-25 é válido; 52998224726 é inválido.

## Cobertura da aula

| Conteúdo da aula 08 | Questões |
|---|---|
| O ciclo do TDD: vermelho, verde e refatorar | 01 |
| Vantagens e limites do TDD | 02 |
| TDD do validador de CPF (2.3) | 03, 04 |
| Caixa branca guiando o próximo teste (3.2) | 05 |
| TDD no componente: filtro de produtos | 06 |
| Depuração moderna | 07, 08 |
| Responsabilidade na entrega (1.1) | 09 |
| Code review de testes (S1) | 10 |

---

## ITEM 01 — O Ciclo do TDD

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, ouviu da equipe: "TDD é escrever os testes no fim, depois que o código está pronto, para conferir".

**Comando:**
Explique à equipe o que é o TDD.

**Tópicos:**
- a) Diga o que é TDD (Test-Driven Development) e quando o teste é escrito. (0,2)
- b) Descreva as três fases do ciclo (vermelho, verde e refatorar), o que fazer em cada uma e como saber que ela terminou. (0,4)
- c) Escreva o comando que roda o Vitest em modo observação e explique por que ele ajuda a manter o ciclo curto. (0,4)

---

## ITEM 02 — Quando Usar e Quando Não Usar

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, recebeu da equipe duas tarefas: a regra que valida o CPF do cliente e o ajuste das cores e do espaçamento do botão Comprar.

**Comando:**
Decida onde aplicar TDD.

**Tópicos:**
- a) Diga em qual das duas tarefas o TDD é indicado. (0,2)
- b) Cite três vantagens do TDD vistas na aula. (0,4)
- c) Explique por que cores, espaçamentos e layout não são feitos com TDD e como eles são conferidos. (0,4)

---

## ITEM 03 — O Primeiro Ciclo do CPF

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai começar a nova função validarCPF com TDD. O arquivo src/validarCPF.js ainda nem existe.

**Comando:**
Escreva o primeiro ciclo.

**Tópicos:**
- a) Diga por qual motivo o primeiro teste falha (fase vermelha) e por que é importante ver a falha pelo motivo esperado. (0,2)
- b) Escreva o arquivo tests/validarCPF.test.js com os imports e o teste "rejeita valor vazio". (0,4)
- c) Escreva o código mínimo que deixa esse teste verde e explique por que esse código, que parece trapaça, é proposital. (0,4)

---

## ITEM 04 — Os Dígitos Verificadores

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, já passou pelos ciclos do valor vazio, do CPF com letras ou tamanho diferente de 11 dígitos e do CPF com todos os dígitos iguais. Falta o ciclo 4: os dígitos verificadores.

**Comando:**
Escreva os testes do ciclo 4 e analise o resultado.

**Tópicos:**
- a) Escreva o teste do ciclo 2 ou do ciclo 3 (um caso inválido por formato ou por dígitos iguais). (0,2)
- b) Escreva os dois testes do ciclo 4: aceita 529.982.247-25 e rejeita 52998224726. (0,4)
- c) Um teste novo passou direto para o verde, sem mudar o código. Explique o que isso indica e o que fazer. (0,4)

---

## ITEM 05 — Caixa Branca Guiando o Teste

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, terminou o verde do ciclo 4 e olhou o código: o cálculo do dígito tem a condição resto < 2, com dois caminhos (dígito 0 ou 11 - resto).

**Comando:**
Use o teste estrutural (caixa branca, 3.2) para escolher os próximos testes.

**Tópicos:**
- a) Diga o que é o teste estrutural (caixa branca). (0,2)
- b) Escreva um teste para cada caminho da condição resto < 2, usando 111.444.777-35 (caminho 11 - resto) e 123.456.789-09 (caminho do dígito 0). (0,4)
- c) Explique como olhar o código depois de cada verde ajuda a escolher o próximo teste. (0,4)

---

## ITEM 06 — TDD no Filtro de Produtos

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai criar com TDD o filtro da vitrine: montarFiltro(container, produtos) mostra um campo de rótulo "Buscar" e a lista dos produtos (cada um num item de lista).

**Comando:**
Escreva os testes do componente na ordem dos ciclos.

**Tópicos:**
- a) Liste os cinco comportamentos do filtro, na ordem em que viram testes. (0,2)
- b) Escreva o teste "digitar mouse mostra só os produtos com mouse no título", com o userEvent e a query getAllByRole('listitem'). (0,4)
- c) Escreva o teste da mensagem "Nenhum produto encontrado" e explique por que os testes do componente usam o que o usuário vê. (0,4)

---

## ITEM 07 — Isolando a Falha

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, rodou a suíte e um dos 40 testes falhou com a mensagem expected true, received false. A causa não é óbvia.

**Comando:**
Descreva os primeiros passos da depuração.

**Tópicos:**
- a) Diga o que ler primeiro na mensagem de falha. (0,2)
- b) Escreva como isolar só esse teste com it.only e diga o que faz o describe.only. (0,4)
- c) Explique por que isolar o teste antes de procurar a causa economiza tempo. (0,4)

---

## ITEM 08 — Breakpoint e screen.debug

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, isolou o teste que falha. Na função antiga, você desconfia do cálculo do dígito; no filtro, a lista não mostra o que você esperava.

**Comando:**
Use as ferramentas de depuração.

**Tópicos:**
- a) Diga os passos para parar a execução numa linha do código com breakpoint no VS Code. (0,2)
- b) Explique o que o breakpoint mostra e como ele revelou que a função antiga usava resto <= 2, recusando todo CPF cujo dígito deveria ser 9. (0,4)
- c) Escreva onde usar screen.debug() no teste do filtro e explique o que ele imprime. (0,4)

---

## ITEM 09 — Entregando com Responsabilidade

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, encontrou e corrigiu o defeito. No arquivo de teste ainda está o it.only e, no código, um console.log('soma', soma) usado na depuração.

**Comando:**
Finalize a depuração com responsabilidade (1.1).

**Tópicos:**
- a) Diga o que fazer com o it.only e com o console.log antes de entregar. (0,2)
- b) Explique o que acontece com a suíte se o it.only for para o repositório. (0,4)
- c) Descreva o passo final da depuração (corrigir e confirmar) e o que registrar no relatório da entrega. (0,4)

---

## ITEM 10 — Code Review de Testes

- **Aula:** 08 · TDD e Debugging Moderno no Front-End
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai revisar os testes de CPF de uma dupla da turma. Um colega já tinha comentado: "esse teste está horrível".

**Comando:**
Faça o code review dos testes com respeito (S1).

**Tópicos:**
- a) Cite três perguntas úteis para o code review de testes. (0,2)
- b) Reescreva com respeito o comentário "esse teste está horrível", com uma sugestão técnica concreta. (0,4)
- c) Explique como quem recebe a sugestão deve avaliá-la e responder, e por que isso valoriza ideias diferentes (S1). (0,4)
