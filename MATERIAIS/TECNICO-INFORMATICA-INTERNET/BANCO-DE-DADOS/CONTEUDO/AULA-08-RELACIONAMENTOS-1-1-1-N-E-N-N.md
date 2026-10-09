# Aula 08 — Relacionamentos 1:1, 1:N e N:N

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 5.2 Relacionamento — 5.2.1 Um para um · 5.2.2 Um para muitos ·
  5.2.3 Muitos para muitos
- **Capacidades:** C2 — Aplicar os procedimentos do modelo de modelagem entidade-relacionamento
- **Estratégias:** exposição dialogada, leitura de frases em duas direções, jogo de cardinalidades,
  trabalho em grupo da SA 1
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md)

## Indicadores

- (7) Define cardinalidades 1:1, 1:N e N:N e desenha o DER (C2).

## Objetivos

- Definir **relacionamento** e nomeá-lo com um **verbo**.
- Determinar a **cardinalidade máxima** (1:1, 1:N, N:N) lendo a frase **nos dois sentidos**.
- Determinar a **cardinalidade mínima** (participação **obrigatória** ou **opcional**).
- Reconhecer o **autorrelacionamento**.
- Saber como cada cardinalidade será **implementada** nas tabelas (chave estrangeira ou tabela
  associativa).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: atributos e identificador (aula 7) |
| Exposição dialogada | 40 min | Relacionamento, verbo, leitura nos dois sentidos, 1:1, 1:N, N:N |
| Exposição | 30 min | Cardinalidade mínima; autorrelacionamento; implementação |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Quantos de cada lado?" (abaixo) |
| Prática guiada | 30 min | 10 frases de requisitos → cardinalidades |
| Prática em grupo (SA 1) | 60 min | Relacionamentos do sistema de matrículas, justificados |
| Registro | 20 min | Socialização e quiz de saída |

## Conteúdo

### 1. Relacionamento
É a **associação entre entidades** que o sistema precisa registrar. Recebe um **verbo** e é
desenhado como **losango** ligando as entidades: ALUNO —⟨realiza⟩— MATRÍCULA; CLIENTE —⟨faz⟩— PEDIDO.

### 2. Como descobrir a cardinalidade máxima
Faça **duas perguntas**, uma em cada sentido:
1. "Um **A** se liga a **quantos** B, no máximo?"
2. "Um **B** se liga a **quantos** A, no máximo?"

| Resposta | Cardinalidade |
|---|---|
| um e um | **1:1** |
| um A tem muitos B; um B tem um A | **1:N** |
| muitos e muitos | **N:N** |

### 3. Um para um — 1:1 (5.2.1)
Cada ocorrência de um lado se liga a **no máximo uma** do outro.
- Um aluno tem **um** armário na escola; um armário é de **um** aluno.
- Um funcionário tem **um** crachá; um crachá pertence a **um** funcionário.
- Implementação: chave estrangeira com **UNIQUE** num dos lados (ou juntar numa só tabela, se
  sempre andam juntos).

### 4. Um para muitos — 1:N (5.2.2)
Uma ocorrência de um lado se liga a **várias** do outro; o contrário, a **uma só**.
- Um curso tem **várias** turmas; uma turma é de **um** curso.
- Um cliente faz **vários** pedidos; um pedido é de **um** cliente.
- Implementação: a **chave estrangeira fica no lado N** (TURMA guarda id_curso; PEDIDO guarda
  id_cliente) — é o atributo referencial da aula 7.

### 5. Muitos para muitos — N:N (5.2.3)
Várias de um lado se ligam a **várias** do outro.
- Um aluno faz **várias** turmas; uma turma tem **vários** alunos.
- Um pedido tem **vários** produtos; um produto está em **vários** pedidos.
- Implementação: **tabela associativa** no meio, com as **duas chaves estrangeiras** (e os dados
  próprios da ligação): MATRÍCULA (id_aluno, id_turma, data, situação); ITEM_PEDIDO (id_pedido,
  id_produto, quantidade, preço). É a entidade associativa da aula 6.

### 6. Cardinalidade mínima (participação)
Pergunta: "Um **A** precisa ter **pelo menos um** B?"
- **0 (opcional):** um cliente pode estar cadastrado **sem** pedidos.
- **1 (obrigatória):** um pedido **precisa** ter um cliente.

Notação completa (mín, máx) em cada ponta: CLIENTE (1,1) —⟨faz⟩— (0,N) PEDIDO. Lê-se: um cliente
faz de 0 a N pedidos; um pedido é feito por exatamente 1 cliente.

Na notação "pé de galinha" (muito usada em ferramentas): traço = 1, círculo = 0, tridente = muitos.

### 7. Autorrelacionamento
Uma entidade se relaciona **com ela mesma**:
- Um FUNCIONÁRIO **supervisiona** vários FUNCIONÁRIOS (1:N).
- Um CURSO é **pré-requisito** de outros CURSOS (N:N).
- Implementação 1:N: chave estrangeira apontando para a mesma tabela (id_supervisor).

### 8. Erros comuns
- Ler a frase **num sentido só** (e marcar 1:N quando é N:N).
- Deixar N:N **sem** tabela associativa.
- Colocar a chave estrangeira **no lado 1** do 1:N (o curso teria de guardar uma lista de turmas).
- Marcar participação obrigatória sem perguntar ao cliente.

## Exemplo no contexto do curso
Relacionamentos da escola de cursos livres fictícia: CURSO (1,1) —⟨oferece⟩— (0,N) TURMA; ALUNO
(1,1) —⟨realiza⟩— (0,N) MATRÍCULA (N) —⟨em⟩— (1,1) TURMA, ou seja, ALUNO N:N TURMA resolvido por
MATRÍCULA; MATRÍCULA (1,1) —⟨gera⟩— (1,N) PARCELA; RESPONSÁVEL (1,1) —⟨responde por⟩— (0,N) ALUNO;
PROFESSOR N:N TURMA (um professor dá aula em várias turmas e uma turma pode ter mais de um
professor), resolvido por uma associativa AULA_TURMA.

## Dinâmica — Quantos de cada lado? (30 min, duplas)
- **Objetivo:** determinar cardinalidade máxima e mínima lendo nos dois sentidos (C2).
- **Materiais:** 16 cartões com pares de entidades e uma frase do cliente (ex.: "Cada pedido tem um
  só cupom, mas um cupom pode ser usado em vários pedidos").
- **Passo a passo:** (1) a dupla faz as duas perguntas em voz alta; (2) escreve a cardinalidade
  (mín, máx) dos dois lados; (3) diz como será implementado (FK em qual tabela ou associativa);
  (4) confere com a dupla vizinha; em caso de divergência, cada uma justifica pela frase.
- **Fechamento:** o professor resolve no quadro os cartões mais discutidos.

## Situação-problema e entrega da aula
- **SA 1 (continuação):** lista dos relacionamentos do sistema de matrículas com verbo,
  cardinalidades mínima e máxima dos dois lados, frase de leitura e forma de implementação.

## Verificação da aprendizagem
- Ler "um cliente faz vários pedidos; um pedido é de um cliente" e dar a cardinalidade.
- Explicar por que o N:N precisa de tabela associativa.
- Dizer em qual tabela fica a chave estrangeira num 1:N.
- Dar um exemplo de autorrelacionamento.

## Recursos
Sala de aula, laboratório de informática, computador com acesso à internet, plataforma de modelagem
(brModelo ou draw.io), kit multimídia e slides `../AULAS/AULA-08-SLIDES.pdf` (apresentação, quando
o professor publicar).
