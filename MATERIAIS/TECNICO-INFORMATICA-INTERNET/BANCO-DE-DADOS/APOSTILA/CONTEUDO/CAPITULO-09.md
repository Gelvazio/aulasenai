# Capítulo 09 — Diagrama entidade-relacionamento

- **Aula:** 09
- **Capacidade:** C2, S1

## Teoria

### Elementos do DER (notação de Chen)

| Elemento | Forma | Exemplo |
|---|---|---|
| Entidade | Retângulo | ALUNO |
| Entidade fraca | Retângulo de linha dupla | PARCELA |
| Atributo | Elipse ligada à entidade | nome |
| Identificador | Elipse com o nome **sublinhado** | id_aluno |
| Atributo composto | Elipse ligada às elipses das partes | endereço → rua, número, bairro |
| Relacionamento | Losango com verbo | realiza |
| Cardinalidade | (mín, máx) junto a cada entidade | (0,N) |
| Entidade associativa | Retângulo envolvendo o losango | MATRÍCULA |

### Notação pé de galinha

Usada no **modelo lógico** (tabelas) e em ferramentas de diagrama:

- Cada entidade vira uma **caixa** com a lista de atributos, indicando PK e FK.
- As linhas mostram a cardinalidade nas pontas: **traço** = 1, **círculo** = 0, **tridente** =
  muitos.
- O N:N aparece já **resolvido** pela tabela associativa.

| Situação | Chen | Pé de galinha |
|---|---|---|
| Um curso tem 0..N turmas | CURSO (1,1) —⟨oferece⟩— (0,N) TURMA | CURSO ‖——○< TURMA |
| Aluno N:N turma | ALUNO e TURMA com a associativa MATRÍCULA | ALUNO ‖——○< MATRÍCULA >○——‖ TURMA |

### Do conceitual ao lógico

- O DER **conceitual** (Chen) mostra o negócio, para validar com o cliente.
- O DER **lógico** (pé de galinha) mostra as **tabelas**, as **chaves primárias** e as **chaves
  estrangeiras**, preparando a **normalização** (capítulo 10) e o **SQL** (capítulo 12).

### Passo a passo para desenhar

1. Colocar as **entidades fortes** principais no centro (ALUNO, TURMA, CURSO).
2. Ligar com os **relacionamentos** e escrever o **verbo**.
3. Marcar as **cardinalidades** (mín, máx) nos dois lados.
4. Acrescentar as **entidades fracas** e **associativas**.
5. Acrescentar os **atributos**, sublinhando os **identificadores**.
6. Organizar para **não cruzar linhas**; nomes no singular e padronizados.
7. Conferir com o **checklist** abaixo e com os **requisitos** do escopo.

Ferramentas possíveis: uma ferramenta de DER (brModelo ou draw.io) ou o desenhador de diagramas do
próprio cliente do PostgreSQL. Papel e lápis também servem para o primeiro rascunho.

### Checklist de qualidade do DER

- Todo requisito de dados do escopo aparece em alguma entidade ou atributo?
- Toda entidade tem **identificador**?
- Todo relacionamento tem **verbo** e **cardinalidade nos dois lados**?
- Todo N:N tem **associativa** no modelo lógico?
- Cada entidade fraca indica a **dona**?
- Não há atributo **repetido** em duas entidades sem motivo (sinal de redundância)?
- O desenho é **legível** por quem não o fez (o cliente consegue ler)?

### O DER da escola

| Entidade | Atributos principais (id = identificador) | Ligações |
|---|---|---|
| CURSO | **id_curso** (id), nome, carga_horaria, valor_mensal | oferece (0,N) TURMA |
| TURMA | **id_turma** (id), turno, vagas | pertence a (1,1) CURSO |
| ALUNO | **id_aluno** (id), nome, cpf, data_nascimento, endereço (composto) | responsável (1,1) RESPONSÁVEL |
| MATRÍCULA (associativa) | data, situação, nota_final | liga ALUNO e TURMA |
| PARCELA (fraca) | número, vencimento, valor, data_pagamento | gerada por (1,1) MATRÍCULA |
| RESPONSÁVEL | **id_responsavel** (id), nome, cpf, telefone | responde por (0,N) ALUNO |
| PROFESSOR × TURMA (associativa) | dia da semana, horário | liga PROFESSOR e TURMA |

### Revisão em dupla (S1)

A revisão do DER por outra pessoa encontra erros que o autor não vê.

- O revisor **pergunta** em vez de acusar: "este relacionamento é mesmo 1:1?".
- O autor **escuta**, confere nos requisitos e **aceita ou justifica**.
- As mudanças são **registradas**.

Na escola, a dupla vizinha perguntou: "onde fica o valor da mensalidade?". O grupo percebeu que
faltava `valor_mensal` em CURSO e corrigiu o diagrama, registrando a mudança. Acolher a sugestão
melhorou o modelo antes de qualquer linha de SQL.

## Resumo

- Chen: retângulo (entidade), losango (relacionamento), elipse (atributo), identificador
  sublinhado, linha dupla para a fraca.
- Pé de galinha: caixas com PK e FK; traço = 1, círculo = 0, tridente = muitos.
- O DER conceitual valida o negócio; o lógico prepara normalização e SQL.
- O checklist confere requisitos, identificadores, verbos, cardinalidades, associativas e
  legibilidade.
- A revisão em dupla pergunta, escuta, aceita ou justifica e registra as mudanças.

## Glossário

- **DER:** diagrama entidade-relacionamento, o desenho do MER.
- **Notação de Chen:** retângulos, losangos e elipses para o modelo conceitual.
- **Pé de galinha:** notação do modelo lógico com traço, círculo e tridente nas pontas.
- **Modelo lógico:** representação em tabelas, com chaves primárias e estrangeiras.
- **Revisão em dupla:** conferência do modelo por um colega antes de seguir.
