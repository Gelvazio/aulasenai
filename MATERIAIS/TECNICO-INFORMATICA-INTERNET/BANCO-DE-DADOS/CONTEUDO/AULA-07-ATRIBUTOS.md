# Aula 07 — Atributos

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 5.3 Atributos — 5.3.1 Simples · 5.3.2 Composto · 5.3.3 Descritivo ·
  5.3.4 Nominativo · 5.3.5 Referencial
- **Capacidades:** C2 — Aplicar os procedimentos do modelo de modelagem entidade-relacionamento
- **Estratégias:** exposição dialogada, análise de fichas reais, jogo de classificação, trabalho em
  grupo da SA 1
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md)

## Indicadores

- (6) Identifica entidades fortes, fracas e associativas e seus atributos (C2).

## Objetivos

- Definir **atributo** e **valor** de atributo.
- Classificar atributos quanto à **estrutura**: **simples** e **composto**.
- Classificar atributos quanto à **função**: **descritivo**, **nominativo** e **referencial**.
- Reconhecer o **identificador** (atributo ou conjunto que distingue cada ocorrência).
- Montar o **dicionário de atributos** de uma entidade (nome, descrição, tipo de dado, tamanho,
  obrigatório, exemplo).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: entidades fortes, fracas e associativas (aula 6) |
| Exposição dialogada | 40 min | Atributo e valor; simples × composto; descritivo, nominativo, referencial |
| Análise guiada | 30 min | Ficha de matrícula em papel → atributos classificados |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Raio X da ficha" (abaixo) |
| Exposição | 20 min | Identificador e dicionário de atributos |
| Prática em grupo (SA 1) | 70 min | Dicionário de atributos do sistema de matrículas |
| Registro | 20 min | Socialização e quiz de saída |

## Conteúdo

### 1. Atributo e valor
- **Atributo** é uma **característica** da entidade que o sistema precisa guardar. Ex.: nome,
  CPF, data de nascimento de ALUNO.
- **Valor** é o conteúdo do atributo numa ocorrência. Ex.: nome = "Ana Souza".
- Notação no DER: elipse ligada à entidade (ou lista de atributos dentro do retângulo).

### 2. Quanto à estrutura
| Tipo | Definição | Exemplos |
|---|---|---|
| **Simples (5.3.1)** | Não se divide em partes com significado próprio | CPF, data de nascimento, preço, quantidade |
| **Composto (5.3.2)** | Pode ser dividido em partes menores, cada uma com significado | Endereço (rua, número, bairro, cidade, CEP); nome completo (nome, sobrenome); telefone (DDD, número) |

Decisão prática: divide-se o composto quando o sistema **precisa usar as partes** separadamente
(ex.: listar alunos **por bairro** exige o bairro separado). Na hora de criar a tabela, cada parte
vira uma coluna.

### 3. Quanto à função
| Tipo | Definição | Exemplos |
|---|---|---|
| **Descritivo (5.3.3)** | Descreve uma característica da ocorrência, sem identificá-la | Cor, preço, carga horária, situação, data de nascimento |
| **Nominativo (5.3.4)** | Além de descrever, **nomeia ou identifica** a ocorrência | Código do curso, número da matrícula, nome do curso, CPF |
| **Referencial (5.3.5)** | **Faz referência a outra entidade**, ligando as duas | Código do curso dentro de TURMA; código do aluno dentro de MATRÍCULA |

- O **nominativo** costuma ser o candidato a **identificador** (chave primária, aula 13).
- O **referencial** é a semente da **chave estrangeira** (aula 13) e mostra um **relacionamento**
  (aula 8).

### 4. Identificador
É o atributo (ou conjunto de atributos) que **distingue uma ocorrência de todas as outras**: não se
repete e não fica vazio.
- ALUNO → id do aluno (ou CPF).
- PARCELA (fraca) → id da matrícula + número da parcela.
- Prefira um **código próprio** (id) a dados que podem mudar ou faltar (o e-mail muda; criança pode
  não ter CPF).

### 5. Dicionário de atributos
Documento que registra cada atributo de forma padronizada:

| Entidade | Atributo | Descrição | Tipo | Tamanho | Obrig. | Classificação | Exemplo |
|---|---|---|---|---|---|---|---|
| ALUNO | id_aluno | Código do aluno | inteiro | — | sim | simples, nominativo, identificador | 15 |
| ALUNO | nome | Nome completo | texto | 100 | sim | composto (nome e sobrenome), nominativo | Ana Souza |
| ALUNO | data_nascimento | Data de nascimento | data | — | sim | simples, descritivo | 2008-03-21 |
| ALUNO | rua, numero, bairro, cidade, cep | Endereço | texto | 100/10/60/60/8 | sim | composto, descritivo | Rua das Flores, 120... |
| TURMA | id_curso | Curso da turma | inteiro | — | sim | simples, referencial (CURSO) | 3 |

Os tipos de dados exatos do PostgreSQL (integer, varchar, date, numeric...) são definidos na aula 12;
aqui basta a ideia (inteiro, texto, data, decimal, verdadeiro/falso).

### 6. Erros comuns
- Guardar **idade** em vez de **data de nascimento** (a idade muda todo ano; a data não).
- Juntar várias informações num campo só ("telefones: 99999-1111 / 98888-2222").
- Criar atributo referencial sem existir a entidade referenciada.
- Usar o **nome** como identificador (há homônimos).

## Exemplo no contexto do curso
Na ficha de matrícula em papel da escola de cursos livres fictícia aparecem: "Nome", "CPF",
"Nascimento", "Endereço", "Telefone do responsável", "Curso", "Turma", "Turno" e "Data". A equipe
classifica: nome — composto e nominativo; CPF — simples e nominativo; nascimento — simples e
descritivo; endereço — composto e descritivo (dividido porque a escola quer relatórios por bairro);
curso e turma — referenciais (apontam para CURSO e TURMA); turno — descritivo de TURMA; data —
descritivo da MATRÍCULA.

## Dinâmica — Raio X da ficha (30 min, grupos de 4)
- **Objetivo:** classificar atributos por estrutura e por função (C2).
- **Materiais:** fichas reais de cadastro (loja, academia, biblioteca) com dados fictícios e tabela
  em branco "atributo × simples/composto × descritivo/nominativo/referencial".
- **Passo a passo:** (1) o grupo lista os campos da ficha; (2) classifica cada um nas duas
  dimensões; (3) aponta o identificador e um erro de cadastro da ficha (ex.: campo "idade");
  (4) troca com outro grupo, que confere.
- **Fechamento:** a turma discute os atributos que geraram dúvida (ex.: nome é descritivo ou
  nominativo?).

## Situação-problema e entrega da aula
- **SA 1 (continuação):** **dicionário de atributos** de todas as entidades do sistema de
  matrículas (aula 6), com tipo, tamanho, obrigatoriedade, classificação, identificador e exemplo.

## Verificação da aprendizagem
- Dar dois exemplos de atributo composto e dizer quando dividir as partes.
- Explicar a diferença entre atributo nominativo e referencial com exemplos da escola.
- Dizer por que guardar data de nascimento é melhor que guardar idade.
- Indicar o identificador de PARCELA.

## Recursos
Sala de aula, laboratório de informática, computador com acesso à internet, plataforma de modelagem
(brModelo ou draw.io), pacote de aplicativos de escritório, kit multimídia e slides
`../AULAS/AULA-07-SLIDES.pdf` (apresentação, quando o professor publicar).
