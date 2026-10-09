# Aula 06 — Entidades Fortes, Fracas e Associativas

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 5 Modelo entidade-relacionamento — 5.1 Entidades (5.1.1 Fracas ·
  5.1.2 Fortes · 5.1.3 Associativas)
- **Capacidades:** C2 — Aplicar os procedimentos do modelo de modelagem entidade-relacionamento
- **Estratégias:** exposição dialogada, análise de requisitos, jogo de classificação, trabalho em
  grupo da SA 1
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md)

## Indicadores

- (6) Identifica entidades fortes, fracas e associativas e seus atributos (C2).

## Objetivos

- Explicar o que é o **modelo entidade-relacionamento (MER)** e para que serve.
- Definir **entidade** e **ocorrência** (instância) e diferenciar entidade de atributo.
- Identificar **entidades fortes** (existem sozinhas) e **fracas** (dependem de outra para existir e
  ser identificadas).
- Identificar **entidades associativas** (nascem de um relacionamento muitos-para-muitos com dados
  próprios).
- Encontrar as entidades a partir dos requisitos do escopo (aula 5).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: requisitos e escopo (aula 5) |
| Exposição dialogada | 40 min | MER, entidade, ocorrência; entidade × atributo |
| Exposição | 35 min | Entidades fortes, fracas e associativas, com exemplos |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Separa e classifica" (abaixo) |
| Prática guiada | 30 min | Do texto dos requisitos à lista de entidades |
| Prática em grupo (SA 1) | 55 min | Lista de entidades do sistema de matrículas, classificadas e justificadas |
| Registro | 20 min | Socialização e quiz de saída |

## Conteúdo

### 1. O modelo entidade-relacionamento (MER)
O **MER** descreve os dados de um sistema de forma **independente do SGBD**: quais "coisas" o
sistema guarda (**entidades**), o que se sabe sobre elas (**atributos**, aula 7) e como se ligam
(**relacionamentos**, aula 8). O desenho do MER é o **DER** (aula 9). Ele é o **nível conceitual**
(aula 2) e vem **antes** das tabelas (aula 12).

### 2. Entidade e ocorrência
- **Entidade:** um conjunto de objetos do mundo real, **concretos ou abstratos**, sobre os quais o
  sistema precisa guardar dados. Ex.: ALUNO, CURSO, MATRÍCULA, PAGAMENTO.
- **Ocorrência (instância):** cada elemento da entidade. Ex.: a aluna Ana é uma ocorrência de ALUNO.
- Notação: retângulo com o nome no **singular** e em maiúsculas.

**Entidade ou atributo?** Pergunte: *isso tem dados próprios e se repete com várias ocorrências?*
- "Curso" tem nome, carga horária e valor, e há vários → **entidade**.
- "Cor dos olhos do aluno" é só uma característica → **atributo** de ALUNO.

### 3. Entidade forte (5.1.2)
Existe **por si só** e tem **identificador próprio**.
Ex.: ALUNO (identificado pelo id ou CPF), CURSO, PROFESSOR, CLIENTE, PRODUTO.

### 4. Entidade fraca (5.1.1)
**Depende de outra entidade (a forte, chamada dona)** para existir e para ser identificada; sem a
dona, não faz sentido.

| Entidade fraca | Depende de | Por quê |
|---|---|---|
| ITEM_PEDIDO | PEDIDO | "Item 2" só faz sentido dentro de um pedido |
| PARCELA | MATRÍCULA | A parcela 3 é a 3ª parcela daquela matrícula |
| DEPENDENTE | FUNCIONÁRIO | O dependente só existe no cadastro ligado ao funcionário |

- A identificação usa a chave da dona **mais** um identificador parcial (ex.: matrícula 15 + parcela 3).
- Se a dona é excluída, as ocorrências fracas também deixam de existir.
- Notação: retângulo de **linha dupla** (e o relacionamento identificador em losango duplo).

### 5. Entidade associativa (5.1.3)
Nasce quando um relacionamento **muitos-para-muitos** (aula 8) **tem dados próprios**.
- Um aluno faz **várias** turmas e uma turma tem **vários** alunos. A ligação tem **data da
  matrícula**, **situação** e **nota final** → vira a entidade associativa **MATRÍCULA**.
- Um pedido tem vários produtos e um produto aparece em vários pedidos; quantidade e preço na
  venda → **ITEM_PEDIDO** (também pode ser vista como associativa entre PEDIDO e PRODUTO).
- Notação: retângulo envolvendo o losango do relacionamento.

### 6. Dos requisitos às entidades — passo a passo
1. Ler os requisitos e **sublinhar os substantivos** importantes.
2. Descartar o que é **sinônimo** (estudante = aluno), **atributo** (telefone) ou **fora do
   escopo** (cantina).
3. Verificar se cada candidata tem **várias ocorrências** e **dados próprios**.
4. Classificar: forte, fraca (depende de quem?) ou associativa (liga quais entidades?).
5. Registrar a **justificativa** de cada classificação (S2).

## Exemplo no contexto do curso
Requisitos da escola de cursos livres fictícia: "guardar alunos e seus responsáveis; os cursos têm
turmas em turnos; o aluno se matricula numa turma; cada matrícula gera parcelas mensais; os
professores dão aulas nas turmas". Entidades: **ALUNO** (forte), **RESPONSÁVEL** (forte), **CURSO**
(forte), **TURMA** (forte — tem código próprio — embora pertença a um curso), **PROFESSOR** (forte),
**MATRÍCULA** (associativa entre ALUNO e TURMA, com data e situação), **PARCELA** (fraca, depende de
MATRÍCULA). "Turno" e "telefone" são atributos.

## Dinâmica — Separa e classifica (30 min, grupos de 4)
- **Objetivo:** distinguir entidade de atributo e classificar entidades (C2).
- **Materiais:** 30 cartões com palavras de sistemas web (cliente, CPF, pedido, item do pedido,
  produto, cor, parcela, matrícula, endereço, dependente, nota fiscal...) e três caixas: FORTE,
  FRACA, ASSOCIATIVA, mais uma pilha "É ATRIBUTO".
- **Passo a passo:** (1) o grupo separa atributos de entidades; (2) classifica as entidades nas três
  caixas; (3) para cada fraca, escreve a dona; para cada associativa, as duas entidades que ela
  liga; (4) troca com outro grupo, que confere.
- **Fechamento:** discute-se no quadro os cartões em que os grupos discordaram.

## Situação-problema e entrega da aula
- **SA 1 (continuação):** com o escopo da aula 5, o grupo entrega a **lista de entidades** do
  sistema de matrículas, classificadas (forte, fraca, associativa), com uma frase de justificativa
  para cada e as palavras descartadas (e por quê).

## Verificação da aprendizagem
- Explicar a diferença entre entidade e ocorrência com um exemplo.
- Dizer por que PARCELA é fraca e ALUNO é forte.
- Dizer quando um relacionamento vira entidade associativa.
- Decidir se "endereço" é entidade ou atributo num sistema de entregas e num sistema de escola.

## Recursos
Sala de aula, laboratório de informática, computador com acesso à internet, plataforma de modelagem
(brModelo ou draw.io), kit multimídia e slides `../AULAS/AULA-06-SLIDES.pdf` (apresentação, quando
o professor publicar).
