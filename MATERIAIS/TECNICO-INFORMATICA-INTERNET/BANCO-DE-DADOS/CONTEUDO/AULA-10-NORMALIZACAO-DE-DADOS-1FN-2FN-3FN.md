# Aula 10 — Normalização de Dados (1FN, 2FN e 3FN)

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 5.5 Normalização de dados
- **Capacidades:** C3 — Aplicar os procedimentos de normalização e padronização de dados ·
  S2 — Fundamentar escolhas e decisões no exame de fatos, contextos, possibilidades, desafios e
  problemáticas
- **Estratégias:** exposição a partir de uma planilha real, resolução passo a passo, dinâmica em
  grupos, trabalho da SA 1
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md)

## Indicadores

- (8) Normaliza tabelas até a 3FN e padroniza nomes e tipos (C3).
- (13) Justifica escolhas de modelagem e de segurança com base nos requisitos (S2).

## Objetivos

- Explicar o objetivo da **normalização**: tirar **redundâncias** e evitar **anomalias**.
- Reconhecer as **anomalias** de inserção, atualização e exclusão.
- Entender **dependência funcional** (A → B).
- Aplicar a **1FN** (valores atômicos, sem grupos repetidos), a **2FN** (sem dependência parcial) e
  a **3FN** (sem dependência transitiva).
- Conferir a tabela normalizada com o DER da aula 9 e justificar as decisões.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: DER e redundância (aula 9) |
| Exposição | 30 min | A planilha "tudo junto" da escola: anomalias |
| Exposição dialogada | 50 min | Dependência funcional; 1FN, 2FN, 3FN passo a passo |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Desmonta a planilha" (abaixo) |
| Prática em grupo (SA 1) | 80 min | Normalizar as tabelas do sistema de matrículas até a 3FN |
| Registro | 20 min | Socialização e quiz de saída |

## Conteúdo

### 1. Por que normalizar
**Normalização** é o processo de organizar as tabelas em **formas normais**, separando os dados
para que **cada fato seja guardado uma única vez**. Benefícios: menos redundância, menos erros,
alterações em um só lugar e banco mais fácil de manter.

### 2. A planilha "tudo junto" e as anomalias
Planilha da secretaria da escola de cursos livres fictícia:

| matricula | aluno | telefones | curso | carga_curso | turma | turno | data_matricula |
|---|---|---|---|---|---|---|---|
| 1 | Ana Souza | 99999-1111, 98888-2222 | Excel | 40 | T1 | manhã | 2026-02-03 |
| 2 | Ana Souza | 99999-1111, 98888-2222 | Python | 60 | T5 | noite | 2026-02-10 |
| 3 | Bruno Lima | 97777-3333 | Excel | 40 | T1 | manhã | 2026-02-04 |

| Anomalia | O que acontece aqui |
|---|---|
| **Inserção** | Não dá para cadastrar um curso novo sem ter um aluno matriculado nele |
| **Atualização** | Se a carga do Excel muda para 44 h, é preciso alterar **todas** as linhas do Excel; esquecendo uma, os dados ficam contraditórios |
| **Exclusão** | Apagando a única matrícula do Python, perde-se a informação de que o curso existe |

### 3. Dependência funcional
**A → B** (lê-se "A determina B") significa: conhecendo **A**, sabe-se **um único valor** de **B**.
- id_aluno → nome do aluno
- curso → carga_curso
- turma → turno, curso

A normalização usa essas dependências para decidir **em qual tabela cada atributo deve ficar**.

### 4. Primeira forma normal — 1FN
Uma tabela está na **1FN** quando:
- todos os valores são **atômicos** (um valor por célula);
- não há **grupos repetidos** (telefone1, telefone2, telefone3);
- existe uma **chave primária**.

Na planilha, "telefones" tem dois valores numa célula. Solução: tabela **TELEFONE_ALUNO** (id_aluno,
telefone), uma linha por telefone.

### 5. Segunda forma normal — 2FN
Está na **1FN** e **todo atributo que não é chave depende da chave inteira**, e não só de uma parte
dela (sem **dependência parcial**). Só se aplica quando a chave é **composta**.

Ex.: tabela MATRICULA_TURMA com chave (id_aluno, id_turma) e os atributos nome_aluno, turno e
data_matricula:
- data_matricula depende de (id_aluno, id_turma) → fica;
- nome_aluno depende **só** de id_aluno → vai para **ALUNO**;
- turno depende **só** de id_turma → vai para **TURMA**.

### 6. Terceira forma normal — 3FN
Está na **2FN** e **nenhum atributo não chave depende de outro atributo não chave** (sem
**dependência transitiva**: A → B → C).

Ex.: TURMA (id_turma, turno, id_curso, nome_curso, carga_curso): id_turma → id_curso → carga_curso.
nome_curso e carga_curso dependem do **curso**, não da turma → vão para **CURSO** (id_curso,
nome_curso, carga_curso), e TURMA fica só com **id_curso** (chave estrangeira).

Regra de bolso: "cada atributo depende **da chave, da chave inteira e de nada além da chave**".

### 7. Resultado normalizado da escola
- **ALUNO** (id_aluno, nome)
- **TELEFONE_ALUNO** (id_aluno, telefone)
- **CURSO** (id_curso, nome, carga_horaria)
- **TURMA** (id_turma, codigo, turno, id_curso)
- **MATRICULA** (id_aluno, id_turma, data_matricula)

Confere com o DER da aula 9: as tabelas normalizadas coincidem com as entidades e as associativas.

### 8. Quando não normalizar tudo
Em relatórios muito pesados, às vezes se **repete um dado de propósito** (desnormalização) para
ganhar velocidade — sempre como **decisão documentada e justificada**. Um caso comum é o
**preço do produto no item do pedido**: ele parece repetido, mas é o **preço daquela venda**
(histórico), e não deve mudar quando o preço atual mudar.

## Exemplo no contexto do curso
A secretaria da escola usa a planilha do item 2. O grupo aplica 1FN (separa os telefones), 2FN
(tira nome do aluno e turno da tabela de matrículas) e 3FN (tira nome e carga do curso da turma).
Depois, a diretora muda a carga do Excel para 44 h: a alteração é feita **uma vez** em CURSO e vale
para todas as turmas.

## Dinâmica — Desmonta a planilha (30 min, grupos de 4)
- **Objetivo:** encontrar anomalias e dependências e normalizar até a 3FN (C3, S2).
- **Materiais:** planilhas "tudo junto" de três sistemas (pedidos de uma loja, empréstimos de uma
  biblioteca, consultas de uma clínica) e fichas para cada forma normal.
- **Passo a passo:** (1) o grupo aponta um exemplo de cada anomalia; (2) escreve três dependências
  funcionais; (3) aplica 1FN, 2FN e 3FN, mostrando as tabelas resultantes; (4) justifica cada
  separação com a dependência que a motivou.
- **Fechamento:** os grupos comparam os resultados e discutem o caso do preço no item do pedido.

## Situação-problema e entrega da aula
- **SA 1 (continuação):** tabelas do sistema de matrículas na **3FN**, com as chaves primárias e
  estrangeiras indicadas, as dependências funcionais usadas e a justificativa de cada separação;
  conferência com o DER da aula 9.

## Verificação da aprendizagem
- Dar um exemplo de anomalia de atualização.
- Dizer o que torna uma tabela não-1FN.
- Explicar a diferença entre dependência parcial e dependência transitiva.
- Normalizar PEDIDO (id_pedido, data, id_cliente, nome_cliente, cidade_cliente).

## Recursos
Laboratório de informática, computador com acesso à internet, pacote de aplicativos de escritório
(planilha), plataforma de modelagem, kit multimídia e slides `../AULAS/AULA-10-SLIDES.pdf`
(apresentação, quando o professor publicar).
