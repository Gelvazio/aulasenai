# Atividade: Atividade Prática — Aula 06 — 10 Questões Discursivas

- **Aula:** AP-06
- **Rótulo da aula:** Atividade Prática — Aula 06
- **Tema:** Entidades Fortes, Fracas e Associativas
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-06.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de modelagem, os conteúdos da aula 06 (CONTEUDO/AULA-06-ENTIDADES-FORTES-FRACAS-E-ASSOCIATIVAS.md): MER, entidade e ocorrência, entidade × atributo, entidades fortes, fracas e associativas e o passo a passo dos requisitos às entidades.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-06-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 6

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para identificar e classificar as entidades dos bancos de dados de sistemas web, a partir dos requisitos levantados com os clientes.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito ou a classificação pedida; **(2)** a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Classificações diferentes do padrão valem quando a justificativa for coerente com os requisitos. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 06 | Questões |
|---|---|
| MER e seu papel | 01 |
| Entidade, ocorrência e entidade × atributo | 02, 03 |
| Entidade forte | 04 |
| Entidade fraca | 05, 06 |
| Entidade associativa | 07, 08 |
| Dos requisitos às entidades | 09, 10 |

---

## ITEM 01 — Para Que Serve o MER

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, ouve um colega dizer: "Vou pular o modelo entidade-relacionamento e já criar as tabelas no PostgreSQL, é mais rápido".

**Comando:**
Oriente o colega sobre o MER.

**Tópicos:**
- a) Diga o que o MER descreve. (0,2)
- b) Explique em que nível de gerenciamento o MER fica e por que ele é independente do SGBD. (0,4)
- c) Explique o risco de pular o MER e ir direto às tabelas. (0,4)

---

## ITEM 02 — Entidade e Ocorrência

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, mostra à equipe de uma biblioteca a entidade LIVRO e os registros "Dom Casmurro" e "O Cortiço".

**Comando:**
Explique os conceitos com a biblioteca.

**Tópicos:**
- a) Diga o que é LIVRO e o que é "Dom Casmurro" nos termos do MER. (0,2)
- b) Explique a diferença entre entidade e ocorrência e dê outro exemplo da biblioteca. (0,4)
- c) Dê um exemplo de entidade abstrata da biblioteca e explique por que ela é uma entidade. (0,4)

---

## ITEM 03 — Entidade ou Atributo

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe a lista de candidatos de um app de entregas: cliente, telefone, endereço (cada cliente cadastra vários, com apelido), pedido, cor da moto e entregador.

**Comando:**
Separe entidades de atributos.

**Tópicos:**
- a) Escreva a pergunta que ajuda a decidir entre entidade e atributo. (0,2)
- b) Classifique os seis candidatos em entidade ou atributo. (0,4)
- c) Explique por que endereço é entidade nesse app, mas poderia ser atributo num sistema de escola. (0,4)

---

## ITEM 04 — Entidades Fortes

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, analisa o banco de uma loja virtual com CLIENTE, PRODUTO, PEDIDO, ITEM_PEDIDO e CATEGORIA.

**Comando:**
Identifique as entidades fortes.

**Tópicos:**
- a) Diga o que caracteriza uma entidade forte. (0,2)
- b) Indique as entidades fortes da loja. (0,4)
- c) Explique por que ITEM_PEDIDO não é forte. (0,4)

---

## ITEM 05 — Entidade Fraca e Sua Dona

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, modela o sistema de RH de uma empresa: cada funcionário pode cadastrar dependentes (filhos e cônjuge) para o plano de saúde.

**Comando:**
Analise a entidade DEPENDENTE.

**Tópicos:**
- a) Classifique DEPENDENTE e diga qual é a entidade dona. (0,2)
- b) Explique como uma ocorrência de DEPENDENTE é identificada. (0,4)
- c) Explique o que acontece com os dependentes quando o funcionário é excluído e por quê. (0,4)

---

## ITEM 06 — Parcelas da Matrícula

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe o requisito da escola: "cada matrícula gera parcelas mensais numeradas (1ª, 2ª, 3ª...), com vencimento e valor".

**Comando:**
Classifique e explique PARCELA.

**Tópicos:**
- a) Classifique PARCELA e diga de quem ela depende. (0,2)
- b) Explique por que "parcela 3" sozinha não identifica uma parcela. (0,4)
- c) Explique como a entidade fraca é desenhada na notação da aula e o que o desenho comunica. (0,4)

---

## ITEM 07 — Matrícula como Entidade Associativa

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, analisa a escola: um aluno faz várias turmas, uma turma tem vários alunos, e a escola precisa saber a data da matrícula, a situação (ativa, trancada, concluída) e a nota final.

**Comando:**
Explique a entidade associativa.

**Tópicos:**
- a) Diga qual entidade associativa surge e quais entidades ela liga. (0,2)
- b) Explique por que data, situação e nota final não podem ficar em ALUNO nem em TURMA. (0,4)
- c) Explique quando um relacionamento vira entidade associativa. (0,4)

---

## ITEM 08 — Consulta Médica

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, modela uma clínica: um paciente passa por vários médicos e um médico atende vários pacientes; cada atendimento tem data, hora, diagnóstico e valor.

**Comando:**
Modele as entidades da clínica.

**Tópicos:**
- a) Indique as entidades fortes e a entidade associativa. (0,2)
- b) Explique por que o atendimento é uma entidade associativa e não um atributo. (0,4)
- c) Explique a diferença entre entidade fraca e entidade associativa usando a clínica e o exemplo das parcelas. (0,4)

---

## ITEM 09 — Dos Requisitos às Entidades

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, lê os requisitos de uma academia: "O aluno (também chamado de cliente) tem nome, CPF e telefone. O aluno contrata um plano. Cada aluno tem fichas de treino numeradas. Os instrutores montam as fichas. A academia quer, no futuro, vender suplementos" (fora do escopo).

**Comando:**
Aplique o passo a passo.

**Tópicos:**
- a) Liste os substantivos importantes encontrados. (0,2)
- b) Diga o que deve ser descartado e por quê (sinônimos, atributos e fora do escopo). (0,4)
- c) Classifique as entidades que sobraram em forte, fraca ou associativa, justificando a ficha de treino. (0,4)

---

## ITEM 10 — Entidades do Sistema de Matrículas

- **Aula:** 06 · Entidades
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, finaliza a lista de entidades da escola de cursos livres: alunos e responsáveis; cursos com turmas em turnos; matrícula do aluno na turma; parcelas mensais; professores que dão aulas nas turmas.

**Comando:**
Monte a lista final da SA 1.

**Tópicos:**
- a) Liste as entidades do sistema de matrículas. (0,2)
- b) Classifique cada entidade em forte, fraca ou associativa. (0,4)
- c) Explique por que "turno" e "telefone" ficaram fora da lista de entidades e por que registrar essas decisões. (0,4)
