# Capítulo 06 — Entidades fortes, fracas e associativas

- **Aula:** 06
- **Capacidade:** C2

## Teoria

### O modelo entidade-relacionamento (MER)

O **MER** descreve os dados de um sistema de forma **independente do SGBD**: quais "coisas" o
sistema guarda (**entidades**), o que se sabe sobre elas (**atributos**, capítulo 7) e como se
ligam (**relacionamentos**, capítulo 8). O desenho do MER é o **DER** (capítulo 9). Ele é o
**nível conceitual** (capítulo 2) e vem **antes** das tabelas (capítulo 12).

### Entidade e ocorrência

- **Entidade:** conjunto de objetos do mundo real, **concretos ou abstratos**, sobre os quais o
  sistema precisa guardar dados. Ex.: ALUNO, CURSO, MATRÍCULA, PAGAMENTO.
- **Ocorrência (instância):** cada elemento da entidade. A aluna Ana é uma ocorrência de ALUNO.
- **Notação:** retângulo com o nome no **singular** e em maiúsculas.

🔑 **Entidade ou atributo?** Pergunte: *isso tem dados próprios e se repete com várias
ocorrências?* "Curso" tem nome, carga horária e valor, e há vários → **entidade**. "Turno da
turma" é só uma característica → **atributo**.

### Entidade forte (5.1.2)

Existe **por si só** e tem **identificador próprio**: ALUNO (pelo id ou CPF), CURSO, PROFESSOR,
TURMA.

### Entidade fraca (5.1.1)

**Depende de outra entidade** (a forte, chamada **dona**) para existir e para ser identificada; sem
a dona, não faz sentido.

| Entidade fraca | Depende de | Por quê |
|---|---|---|
| PARCELA | MATRÍCULA | A parcela 3 é a 3ª parcela daquela matrícula |
| ITEM_PEDIDO | PEDIDO | O "item 2" só faz sentido dentro de um pedido |
| DEPENDENTE | FUNCIONÁRIO | O dependente só existe ligado ao funcionário |

- A identificação usa a chave da dona **mais** um identificador parcial (matrícula 15 + parcela 3).
- Se a dona é excluída, as ocorrências fracas também deixam de existir.
- **Notação:** retângulo de **linha dupla** (e o relacionamento identificador em losango duplo).

### Entidade associativa (5.1.3)

Nasce quando um relacionamento **muitos-para-muitos** (capítulo 8) **tem dados próprios**.

- Um aluno faz **várias** turmas e uma turma tem **vários** alunos. A ligação tem **data da
  matrícula**, **situação** e **nota final** → vira a entidade associativa **MATRÍCULA**.
- Um pedido tem vários produtos e um produto aparece em vários pedidos; quantidade e preço na
  venda → **ITEM_PEDIDO**, associativa entre PEDIDO e PRODUTO.
- **Notação:** retângulo envolvendo o losango do relacionamento.

### Dos requisitos às entidades: passo a passo

1. Ler os requisitos e **sublinhar os substantivos** importantes.
2. Descartar o que é **sinônimo** (estudante = aluno), **atributo** (telefone) ou **fora do
   escopo** (cantina).
3. Conferir se cada candidata tem **várias ocorrências** e **dados próprios**.
4. Classificar: forte, fraca (depende de quem?) ou associativa (liga quais entidades?).
5. Registrar a **justificativa** de cada classificação.

### Aplicando no pedido da escola

Requisitos levantados no capítulo 5: "guardar alunos e seus responsáveis; os cursos têm turmas em
turnos; o aluno se matricula numa turma; cada matrícula gera parcelas mensais; os professores dão
aulas nas turmas".

| Entidade | Tipo | Justificativa |
|---|---|---|
| ALUNO | Forte | Existe por si e tem identificador próprio |
| RESPONSÁVEL | Forte | Tem dados próprios (nome, CPF, telefone) |
| CURSO | Forte | Vários cursos, cada um com nome, carga e valor |
| TURMA | Forte | Tem código próprio, embora pertença a um curso |
| PROFESSOR | Forte | Existe por si e dá aulas em várias turmas |
| MATRÍCULA | Associativa | Liga ALUNO e TURMA e tem data e situação |
| PARCELA | Fraca | Só existe e só é identificada dentro de uma matrícula |

"Turno" e "telefone" são **atributos**, não entidades. Os relacionamentos com cardinalidade entre
essas entidades são desenhados no capítulo 8.

## Resumo

- O MER descreve entidades, atributos e relacionamentos sem depender do SGBD; o DER é o desenho.
- Entidade é um conjunto de objetos sobre os quais se guardam dados; ocorrência é cada elemento.
- Forte existe por si; fraca depende da dona para existir e ser identificada.
- Associativa nasce de um relacionamento N:N que tem dados próprios (MATRÍCULA, ITEM_PEDIDO).
- Substantivos do pedido viram candidatas; cada classificação é justificada.

## Glossário

- **Entidade:** objeto do mundo real com dados próprios
- **Ocorrência:** cada elemento de uma entidade (a aluna Ana em ALUNO).
- **Entidade forte:** existe por si só e tem identificador próprio.
- **Entidade fraca:** depende de outra entidade para existir e ser identificada.
- **Entidade associativa:** relacionamento muitos-para-muitos que tem dados próprios.
- **MER:** modelo entidade-relacionamento, a descrição conceitual dos dados.
