# Capítulo 05 — Demandas do cliente e escopo do projeto

- **Aula:** 05
- **Capacidade:** C1, S2

## Teoria

### A situação de aprendizagem 1

Começa aqui a **SA 1 — Modelagem do banco de um sistema web** (capítulos 5 a 11). A escola de
cursos livres quer trocar as planilhas por um sistema web de matrículas. Você, como aluno
consultor, levanta as demandas, define o escopo, desenha o DER, normaliza até a 3FN, padroniza os
nomes e entrega o cronograma e o fluxograma do processo de matrícula.

### Demanda × necessidade

O cliente costuma falar da **solução** que imagina ("quero uma planilha online"), mas o trabalho do
profissional é descobrir o **problema** ("as matrículas se perdem e ninguém sabe quantas vagas
sobram"). O banco é modelado para a **necessidade**, não para a frase inicial.

### Técnicas de levantamento

| Técnica | Quando usar | Cuidado |
|---|---|---|
| **Entrevista** | Entender o processo com quem decide e quem executa | Perguntas abertas; registrar as respostas |
| **Questionário** | Ouvir muitas pessoas rapidamente | Perguntas claras e curtas |
| **Observação** | Ver como o trabalho é feito de verdade | Não atrapalhar a rotina |
| **Análise de documentos** | Fichas, planilhas, recibos e relatórios atuais | Cada campo é um dado candidato |

Boas perguntas para levantar dados:

- O que vocês precisam **registrar**? Quem registra e quando?
- Que **informações** vocês precisam **consultar** ou imprimir?
- Quais **regras** nunca podem ser quebradas?
- Quem **pode ver** cada informação? Há dados pessoais?
- Quanto isso cresce por mês? O que acontece com os registros antigos?

### Requisitos de dados

São frases **verificáveis** sobre o que o banco precisa guardar e permitir:

| Tipo | Exemplo na escola |
|---|---|
| **Dados a guardar** | "Guardar nome, CPF, e-mail e telefone do aluno." |
| **Consultas e relatórios** | "Listar as turmas com vagas disponíveis por curso." |
| **Regras de negócio** | "Uma turma tem no máximo 25 alunos." "O CPF é único." |
| **Acesso** | "Só a secretaria altera matrículas; o professor só consulta a turma dele." |
| **Volume e histórico** | "Cerca de 300 matrículas por semestre; guardar o histórico por 5 anos." |
| **Qualidade** | "Datas no formato dia/mês/ano; nomes sem abreviação." |

🔑 Cada **substantivo** importante do pedido (aluno, curso, turma, matrícula, pagamento) é candidato
a **entidade** (capítulo 6); cada **característica** (nome, CPF, data) é candidata a **atributo**
(capítulo 7).

### Regras de negócio que viram restrições

| Regra do cliente | Como o banco vai garantir (capítulos 13 a 18) |
|---|---|
| CPF não se repete | Restrição UNIQUE |
| Toda matrícula pertence a um aluno e a uma turma | Chaves estrangeiras |
| Valor da mensalidade maior que zero | Restrição CHECK |
| Turma com no máximo 25 alunos | Trigger ou procedimento |
| Registrar quem alterou uma nota | Trigger de auditoria |

### Documento de escopo (6.1)

1. **Objetivo** (1 frase): o que o banco vai permitir e por quê.
2. **Partes interessadas:** quem pede, quem aprova, quem usa.
3. **Entra no escopo:** processos e dados cobertos.
4. **Não entra no escopo:** o que fica de fora (evita o "só mais uma coisinha").
5. **Requisitos de dados:** lista numerada, como na tabela acima.
6. **Entregas e prazos:** modelo, DER, scripts e documentação (cronograma no capítulo 11).
7. **Premissas e riscos:** o que se supõe verdadeiro e o que pode dar errado.

Na escola, a diretora pediu "um sistema para não perder matrículas". Na entrevista, você descobre
6 cursos, turmas de manhã e à noite, pagamento mensal e alunos menores de idade com responsável. A
primeira versão **inclui** alunos, responsáveis, cursos, turmas, matrículas e pagamentos; **fica
de fora** o controle da cantina e a folha de pagamento dos professores.

### Mudança de escopo e justificativa das escolhas (S2)

Quando o cliente pede algo novo no meio do projeto, registre o pedido, o impacto (tempo, tabelas,
custo) e a **aprovação**. Sem esse registro, o projeto cresce sem controle e atrasa. Cada decisão do
escopo é **justificada** pelos fatos levantados: "a cantina fica fora porque não faz parte do
processo de matrícula e não foi priorizada pela diretora".

### Gestão do tempo nas entregas (1.1)

A SA 1 tem entregas semanais: entidades, atributos, relacionamentos, DER, normalização, padrão de
nomes, cronograma. Divida as tarefas no grupo, defina prazos internos antes do prazo do professor e
registre o andamento.

## Resumo

- O banco é modelado para a necessidade do cliente, descoberta com entrevista, questionário,
  observação e análise de documentos.
- Requisitos de dados são frases verificáveis: dados, consultas, regras, acesso, volume e
  qualidade.
- Substantivos viram entidades candidatas; características viram atributos.
- O documento de escopo diz o que entra, o que não entra, entregas, prazos, premissas e riscos.
- Mudança de escopo só com registro do impacto e aprovação; toda escolha é justificada.

## Glossário

- **Demanda:** o pedido do cliente, como ele o descreve.
- **Requisito de dados:** frase verificável sobre o que o banco precisa guardar ou permitir.
- **Regra de negócio:** condição do processo que nunca pode ser quebrada.
- **Escopo:** o que o projeto inclui e o que fica de fora.
- **Parte interessada:** quem pede, aprova ou usa o sistema.
