# Aula 05 — Demandas do Cliente e Escopo do Projeto

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 6 Documentação técnica — 6.1 Escopo do projeto · 1.1 Gestão
  do tempo
- **Capacidades:** C1 — Reconhecer as demandas do cliente · S2 — Fundamentar escolhas e decisões no
  exame de fatos, contextos, possibilidades, desafios e problemáticas
- **Estratégias:** simulação de entrevista, análise de documentos do cliente, trabalho em grupo,
  produção de documento
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md)

## Indicadores

- (5) Transforma o pedido do cliente em requisitos de dados e escopo (C1).
- (13) Justifica escolhas de modelagem e de segurança com base nos requisitos (S2).

## Objetivos

- Reconhecer a **demanda do cliente** e separar o que ele **diz** do que ele **precisa**.
- Usar técnicas de **levantamento**: entrevista, questionário, observação e análise de documentos.
- Escrever **requisitos de dados**: o que guardar, quem usa, que consultas e relatórios são
  necessários.
- Identificar **regras de negócio** que viram restrições no banco.
- Montar o **documento de escopo** (objetivo, entra, não entra, entregas, prazos, riscos).
- Planejar o tempo das entregas da SA 1 (gestão do tempo).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: configuração e infraestrutura (aula 4) |
| Exposição dialogada | 35 min | Demanda × necessidade; técnicas de levantamento; requisitos de dados |
| Simulação | 40 min | Entrevista com a "diretora da escola" (o professor) |
| Intervalo | 15 min | — |
| Exposição | 25 min | Regras de negócio; documento de escopo |
| Dinâmica | 30 min | "O cliente mudou de ideia" (abaixo) |
| Prática em grupo | 60 min | Documento de escopo da SA 1 |
| Registro | 20 min | Apresentação de um escopo e quiz de saída |

## Conteúdo

### 1. Demanda × necessidade
O cliente costuma falar da **solução** que imagina ("quero uma planilha online"), mas o trabalho
do profissional é descobrir o **problema** ("as matrículas se perdem e ninguém sabe quantas vagas
sobram"). O banco de dados é modelado para a **necessidade**, não para a frase inicial.

### 2. Técnicas de levantamento

| Técnica | Quando usar | Cuidado |
|---|---|---|
| **Entrevista** | Entender o processo com quem decide e quem executa | Perguntas abertas; registrar respostas |
| **Questionário** | Ouvir muitas pessoas rapidamente | Perguntas claras e curtas |
| **Observação** | Ver como o trabalho é feito de verdade | Não atrapalhar a rotina |
| **Análise de documentos** | Fichas, planilhas, recibos e relatórios atuais | Cada campo é um dado candidato |

Boas perguntas para levantar dados:
- O que vocês precisam **registrar**? Quem registra e quando?
- Que **informações** vocês precisam **consultar** ou imprimir?
- Quais **regras** nunca podem ser quebradas?
- Quem **pode ver** cada informação? Há dados pessoais?
- Quanto isso cresce por mês? O que acontece com os registros antigos?

### 3. Requisitos de dados
São frases verificáveis sobre o que o banco precisa guardar e permitir:

| Tipo | Exemplo (escola de cursos livres) |
|---|---|
| **Dados a guardar** | "Guardar nome, CPF, e-mail e telefone do aluno." |
| **Consultas e relatórios** | "Listar as turmas com vagas disponíveis por curso." |
| **Regras de negócio** | "Uma turma tem no máximo 25 alunos." "O CPF é único." |
| **Acesso** | "Só a secretaria altera matrículas; o professor só consulta a turma dele." |
| **Volume e histórico** | "Cerca de 300 matrículas por semestre; guardar o histórico por 5 anos." |
| **Qualidade** | "Datas no formato dia/mês/ano; nomes sem abreviação." |

Cada **substantivo** importante do pedido (aluno, curso, turma, matrícula, pagamento) é candidato a
**entidade** (aula 6) e cada **característica** (nome, CPF, data) é candidata a **atributo** (aula 7).

### 4. Regras de negócio que viram restrições
| Regra do cliente | Como o banco vai garantir (aulas 13 a 18) |
|---|---|
| CPF não se repete | Restrição UNIQUE |
| Toda matrícula pertence a um aluno e a uma turma | Chaves estrangeiras |
| Valor da mensalidade maior que zero | Restrição CHECK |
| Turma com no máximo 25 alunos | Trigger ou procedimento |
| Registrar quem alterou uma nota | Trigger de auditoria |

### 5. Documento de escopo (6.1)
Modelo mínimo:
1. **Objetivo** (1 frase): o que o banco vai permitir e por quê.
2. **Partes interessadas:** quem pede, quem aprova, quem usa.
3. **Entra no escopo:** processos e dados cobertos.
4. **Não entra no escopo:** o que fica de fora (evita "só mais uma coisinha").
5. **Requisitos de dados** (lista numerada, como no item 3).
6. **Entregas e prazos:** modelo, DER, scripts, documentação (cronograma na aula 11).
7. **Premissas e riscos:** o que se supõe verdadeiro e o que pode dar errado.

### 6. Mudança de escopo
Quando o cliente pede algo novo no meio do projeto, registra-se: o pedido, o impacto (tempo,
tabelas, custo) e a **aprovação**. Sem esse registro, o projeto cresce sem controle e atrasa.

### 7. Gestão do tempo nas entregas (1.1)
A SA 1 tem entregas semanais (entidades, atributos, relacionamentos, DER, normalização, padrão,
cronograma). O grupo divide tarefas, define prazos internos antes do prazo do professor e registra
o andamento.

## Exemplo no contexto do curso
A diretora da escola de cursos livres fictícia diz: "quero um sistema para não perder matrículas".
Na entrevista, descobre-se que a escola tem 6 cursos, turmas de manhã e à noite, pagamento mensal
e alunos menores de idade com responsável. O escopo da primeira versão **entra**: alunos,
responsáveis, cursos, turmas, matrículas e pagamentos; **não entra**: controle de estoque da
cantina e folha de pagamento dos professores.

## Dinâmica — O cliente mudou de ideia (30 min, grupos de 4)
- **Objetivo:** praticar o controle de escopo e a justificativa de decisões (C1, S2).
- **Materiais:** escopo inicial pronto e cartões de "pedido novo" ("quero também controlar a
  cantina", "o CPF pode se repetir para irmãos", "preciso de um relatório de inadimplentes").
- **Passo a passo:** (1) o grupo recebe um pedido novo; (2) decide se entra agora, entra numa
  próxima versão ou não entra; (3) escreve o impacto (tabelas, prazo, riscos) e a justificativa;
  (4) apresenta à "diretora", que aceita ou questiona.
- **Fechamento:** a turma discute quais pedidos eram mudança de escopo e quais eram requisito
  esquecido no levantamento.

## Situação-problema e entrega da aula
- **SA 1 — Modelagem do banco de um sistema web (aulas 5 a 11):** a escola de cursos livres
  fictícia quer trocar planilhas por um sistema web de matrículas.
- **Entrega:** documento de escopo com objetivo, partes interessadas, entra/não entra, no mínimo
  12 requisitos de dados numerados (com pelo menos 4 regras de negócio), entregas e riscos.

## Verificação da aprendizagem
- Diferenciar a demanda dita pelo cliente da necessidade real com um exemplo.
- Escolher a técnica de levantamento adequada para três situações.
- Transformar a frase "a escola não quer alunos repetidos" em requisito e em restrição.
- Dizer por que o "não entra no escopo" é tão importante quanto o "entra".

## Recursos
Sala de aula, laboratório de informática, computador com acesso à internet, pacote de aplicativos
de escritório, kit multimídia, AVA e slides `../AULAS/AULA-05-SLIDES.pdf` (apresentação, quando o
professor publicar).
