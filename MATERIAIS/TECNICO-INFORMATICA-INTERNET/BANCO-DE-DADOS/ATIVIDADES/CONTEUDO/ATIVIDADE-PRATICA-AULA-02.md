# Atividade: Atividade Prática — Aula 02 — 10 Questões Discursivas

- **Aula:** AP-02
- **Rótulo da aula:** Atividade Prática — Aula 02
- **Tema:** Gerenciadores: Características, Requisitos e Níveis
- **Ícone:** ⚙️
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
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de sistemas web, os conteúdos da aula 02 (CONTEUDO/AULA-02-GERENCIADORES-CARACTERISTICAS-REQUISITOS-E-NIVEIS.md): características dos gerenciadores, transações ACID, licenças, escalabilidade, requisitos de instalação, níveis externo, conceitual e físico, independência de dados, papéis e escolha justificada do gerenciador.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-02-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 2

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para ajudar equipes de sistemas web a escolher, entender e preparar o gerenciador de banco de dados certo para cada projeto.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito ou a classificação pedida; **(2)** o exemplo ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Exemplos diferentes dos do padrão valem, desde que estejam corretos. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 02 | Questões |
|---|---|
| Características dos gerenciadores (modelo, licença, desempenho, segurança) | 01 |
| Transações e ACID | 02, 03 |
| Escalabilidade | 04 |
| Comparação dos gerenciadores | 05 |
| Requisitos de instalação (sistema, hardware, rede, portas) | 06 |
| Níveis externo, conceitual e físico | 07 |
| Independência de dados | 08 |
| Papéis: usuário, desenvolvedor e DBA | 09 |
| Escolha justificada do gerenciador | 10 |

---

## ITEM 01 — Características de um Gerenciador

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, ouve a equipe de uma clínica dizer que "todo banco de dados é igual, tanto faz qual escolher".

**Comando:**
Mostre à equipe que os gerenciadores têm características diferentes.

**Tópicos:**
- a) Cite três características que diferenciam um gerenciador de outro. (0,2)
- b) Explique duas dessas características com um exemplo do sistema da clínica. (0,4)
- c) Explique por que a licença do gerenciador deve ser considerada pela clínica. (0,4)

---

## ITEM 02 — Transação no Pagamento

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, analisa uma loja virtual em que o cliente pagou, mas o pedido não foi gravado porque o servidor caiu no meio da operação.

**Comando:**
Explique como as transações resolvem esse problema.

**Tópicos:**
- a) Diga o que é uma transação num banco de dados. (0,2)
- b) Explique qual propriedade ACID evita "pagamento sem pedido" e como ela funciona nessa compra. (0,4)
- c) Explique o papel dos comandos COMMIT e ROLLBACK nessa situação. (0,4)

---

## ITEM 03 — As Quatro Propriedades ACID

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, prepara uma explicação para a equipe de um app de ingressos de show, onde milhares de pessoas compram ao mesmo tempo.

**Comando:**
Relacione as propriedades ACID com o app de ingressos.

**Tópicos:**
- a) Escreva o nome das quatro propriedades da sigla ACID. (0,2)
- b) Dê um exemplo do app de ingressos para Isolamento e outro para Consistência. (0,4)
- c) Dê um exemplo para Durabilidade e explique o que aconteceria sem ela. (0,4)

---

## ITEM 04 — Escalabilidade

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, acompanha uma loja que dobrou o número de clientes e o banco ficou lento nas promoções.

**Comando:**
Oriente a loja sobre como fazer o banco crescer.

**Tópicos:**
- a) Diga o que é escalabilidade de um gerenciador. (0,2)
- b) Explique a diferença entre escalabilidade vertical e horizontal com um exemplo para a loja. (0,4)
- c) Cite um recurso do gerenciador que melhora o desempenho das consultas e explique como ele ajuda. (0,4)

---

## ITEM 05 — Comparando Gerenciadores

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C9

**Contexto:**
Você, como aluno consultor, recebe de uma equipe a lista PostgreSQL, MySQL, SQLite e MongoDB para um quadro comparativo.

**Comando:**
Monte a comparação pedida.

**Tópicos:**
- a) Diga o modelo de dados de cada um dos quatro gerenciadores. (0,2)
- b) Compare PostgreSQL e SQLite quanto ao uso típico e ao funcionamento (com ou sem servidor). (0,4)
- c) Explique em que situação o MongoDB seria considerado e o que o PostgreSQL oferece de parecido. (0,4)

---

## ITEM 06 — Requisitos de Instalação

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C9

**Contexto:**
Você, como aluno consultor, vai ajudar uma escola a instalar o PostgreSQL num servidor. O técnico pergunta o que precisa conferir antes de começar.

**Comando:**
Liste e explique os requisitos.

**Tópicos:**
- a) Cite quatro requisitos que devem ser conferidos antes de instalar o gerenciador. (0,2)
- b) Explique os requisitos de rede, incluindo a porta padrão do PostgreSQL e o firewall. (0,4)
- c) Explique por que o espaço em disco deve considerar mais do que os dados de hoje. (0,4)

---

## ITEM 07 — Níveis de Gerenciamento de Dados

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C6

**Contexto:**
Você, como aluno consultor, explica a arquitetura do banco de uma escola: a secretaria vê nome e curso dos alunos; o banco tem as tabelas aluno, curso e matricula; e os dados ficam em arquivos e índices no disco do servidor.

**Comando:**
Classifique e explique os níveis.

**Tópicos:**
- a) Diga a qual nível (externo, conceitual ou físico) pertence cada uma das três partes descritas. (0,2)
- b) Explique o que o nível externo permite fazer com setores diferentes da escola. (0,4)
- c) Explique a diferença entre o nível conceitual e o nível físico. (0,4)

---

## ITEM 08 — Independência de Dados

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C6

**Contexto:**
Você, como aluno consultor, acompanha duas mudanças no banco da escola: (1) acrescentar a coluna telefone na tabela aluno; (2) mover os arquivos do banco para um disco mais rápido.

**Comando:**
Relacione as mudanças com a independência de dados.

**Tópicos:**
- a) Diga qual mudança é exemplo de independência lógica e qual é de independência física. (0,2)
- b) Explique o que a independência lógica garante às telas que não usam a coluna telefone. (0,4)
- c) Explique o que a independência física garante à aplicação quando o disco é trocado. (0,4)

---

## ITEM 09 — Papéis no Banco de Dados

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C6

**Contexto:**
Você, como aluno consultor, organiza as responsabilidades de uma pequena empresa de software: há quem use o sistema, quem programe e quem cuide do servidor de banco.

**Comando:**
Defina os papéis.

**Tópicos:**
- a) Cite os três papéis em relação ao banco de dados. (0,2)
- b) Explique o que faz o desenvolvedor e dê um exemplo de tarefa dele no banco. (0,4)
- c) Explique três tarefas do administrador de banco (DBA) e por que elas são importantes. (0,4)

---

## ITEM 10 — Escolhendo o Gerenciador

- **Aula:** 02 · Gerenciadores
- **Capacidade:** C9

**Contexto:**
Você, como aluno consultor, recebe o pedido de uma cooperativa: sistema web de vendas com 500 acessos ao mesmo tempo, pagamentos, orçamento baixo e equipe que conhece SQL.

**Comando:**
Recomende e justifique o gerenciador.

**Tópicos:**
- a) Liste os requisitos da cooperativa que influenciam a escolha. (0,2)
- b) Recomende um gerenciador e justifique com pelo menos dois requisitos. (0,4)
- c) Explique por que o SQLite não seria a melhor escolha nesse caso. (0,4)
