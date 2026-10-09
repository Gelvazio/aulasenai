# Atividade: Atividade Prática — Aula 09 — 10 Questões Discursivas

- **Aula:** AP-09
- **Rótulo da aula:** Atividade Prática — Aula 09
- **Tema:** Diagrama Entidade-Relacionamento (DER)
- **Ícone:** 🗺️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-09.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de modelagem, os conteúdos da aula 09 (CONTEUDO/AULA-09-DIAGRAMA-ENTIDADE-RELACIONAMENTO.md): elementos do DER e notação de Chen, notação pé de galinha, modelo conceitual × lógico, passo a passo do desenho, ferramentas, checklist de qualidade e revisão em dupla.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-09-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 9

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para desenhar, converter e revisar diagramas entidade-relacionamento de sistemas web. Como a resposta é digitada, descreva o diagrama em texto (entidades, relacionamentos, cardinalidades e atributos).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o elemento, a notação ou a classificação pedida; **(2)** a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: elemento e notação certos, cardinalidades coerentes com a situação e justificativa com as palavras-chave do conteúdo. Modelos diferentes do padrão valem quando atendem aos requisitos da situação. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 09 | Questões |
|---|---|
| Elementos e formas da notação de Chen | 01, 02 |
| Notação pé de galinha e conversão | 03, 04 |
| Conceitual × lógico | 05 |
| Passo a passo do desenho | 06 |
| Ferramentas | 07 |
| Checklist de qualidade | 08 |
| Revisão em dupla (S1) | 09 |
| DER do sistema de matrículas | 10 |

---

## ITEM 01 — Formas do DER

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, explica a um cliente como ler o DER da loja que vai receber.

**Comando:**
Explique as formas do diagrama.

**Tópicos:**
- a) Diga a forma da entidade, do relacionamento e do atributo na notação de Chen. (0,2)
- b) Explique como aparecem o identificador e a entidade fraca. (0,4)
- c) Explique como aparecem o atributo composto e a entidade associativa. (0,4)

---

## ITEM 02 — Descrevendo um DER em Texto

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, precisa descrever por escrito o DER de uma biblioteca: LEITOR faz EMPRÉSTIMO de LIVRO; um leitor pode fazer vários empréstimos ou nenhum; cada empréstimo é de um leitor; cada empréstimo é de um livro; um livro pode ter vários empréstimos ao longo do tempo.

**Comando:**
Descreva o DER em texto.

**Tópicos:**
- a) Liste as entidades e os relacionamentos com o verbo. (0,2)
- b) Escreva as cardinalidades (mín, máx) dos dois relacionamentos. (0,4)
- c) Indique o identificador de cada entidade e dois atributos de EMPRÉSTIMO. (0,4)

---

## ITEM 03 — Notação Pé de Galinha

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, mostra a um estagiário um diagrama feito no draw.io em notação pé de galinha.

**Comando:**
Explique a notação.

**Tópicos:**
- a) Diga o que significam o traço, o círculo e o tridente. (0,2)
- b) Explique como cada entidade aparece nessa notação e o que deve estar indicado nela. (0,4)
- c) Explique como um N:N aparece no modelo lógico em pé de galinha. (0,4)

---

## ITEM 04 — Convertendo Chen para Pé de Galinha

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe em Chen: CLIENTE (1,1) —faz— (0,N) PEDIDO e PEDIDO (0,N) —contém— (0,N) PRODUTO, com quantidade e preço.

**Comando:**
Converta para o modelo lógico.

**Tópicos:**
- a) Descreva os símbolos das duas pontas da ligação CLIENTE–PEDIDO em pé de galinha. (0,2)
- b) Explique como fica PEDIDO–PRODUTO no modelo lógico, com a tabela do meio e suas colunas. (0,4)
- c) Indique as chaves primárias e estrangeiras das tabelas PEDIDO e da tabela do meio. (0,4)

---

## ITEM 05 — Conceitual ou Lógico

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, precisa mostrar um DER à diretora da escola e outro ao desenvolvedor que vai escrever o SQL.

**Comando:**
Escolha e explique os modelos.

**Tópicos:**
- a) Diga qual DER mostrar à diretora e qual mostrar ao desenvolvedor. (0,2)
- b) Explique a diferença entre o DER conceitual e o DER lógico. (0,4)
- c) Explique quais etapas seguintes o DER lógico prepara. (0,4)

---

## ITEM 06 — Passo a Passo do Desenho

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, ajuda um colega que começou o DER de uma academia desenhando todos os atributos primeiro e agora tem linhas cruzadas por toda a tela.

**Comando:**
Oriente o desenho.

**Tópicos:**
- a) Diga qual é o primeiro passo do desenho. (0,2)
- b) Escreva a ordem dos passos seguintes até os atributos. (0,4)
- c) Explique por que evitar linhas cruzadas e como padronizar os nomes. (0,4)

---

## ITEM 07 — Escolhendo a Ferramenta

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe três necessidades: (1) uma turma iniciante que vai aprender o modelo conceitual; (2) uma equipe que quer desenhar no navegador, sem instalar nada; (3) um DBA que quer gerar o SQL para o PostgreSQL a partir do desenho.

**Comando:**
Indique as ferramentas.

**Tópicos:**
- a) Indique uma ferramenta para cada necessidade. (0,2)
- b) Explique por que o brModelo é adequado ao ensino do modelo conceitual. (0,4)
- c) Explique a vantagem de gerar o SQL a partir do diagrama e o cuidado que ainda é preciso ter. (0,4)

---

## ITEM 08 — Checklist de Qualidade

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, revisa um DER de clínica em que: PACIENTE não tem identificador; o relacionamento PACIENTE–CONSULTA não tem verbo; o atributo "telefone do paciente" aparece em PACIENTE e em CONSULTA; e o requisito "registrar o convênio do paciente" não aparece.

**Comando:**
Aplique o checklist.

**Tópicos:**
- a) Liste os quatro problemas encontrados. (0,2)
- b) Explique por que o telefone repetido em duas entidades é um problema. (0,4)
- c) Proponha a correção dos quatro problemas. (0,4)

---

## ITEM 09 — Revisão em Dupla

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, revisa o DER de outro grupo e acha que o relacionamento PROFESSOR–TURMA está errado como 1:N. O autor do DER fica na defensiva.

**Comando:**
Conduza a revisão de forma respeitosa.

**Tópicos:**
- a) Escreva como você faria a sugestão ao autor, em forma de pergunta. (0,2)
- b) Explique qual deve ser a atitude do autor diante da sugestão. (0,4)
- c) Explique por que registrar o que foi aceito e o que foi mantido, com o motivo. (0,4)

---

## ITEM 10 — DER do Sistema de Matrículas

- **Aula:** 09 · DER
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, vai descrever em texto o DER final da escola de cursos livres: CURSO, TURMA, ALUNO, RESPONSÁVEL, PROFESSOR, MATRÍCULA, PARCELA e AULA_TURMA.

**Comando:**
Descreva o DER.

**Tópicos:**
- a) Classifique as oito entidades em forte, fraca ou associativa. (0,2)
- b) Escreva os relacionamentos com cardinalidade (mín, máx) dos dois lados. (0,4)
- c) Diga os atributos de MATRÍCULA e de PARCELA e o identificador de PARCELA. (0,4)
