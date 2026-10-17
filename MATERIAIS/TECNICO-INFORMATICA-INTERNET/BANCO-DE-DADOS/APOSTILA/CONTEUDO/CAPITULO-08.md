# Capítulo 08 — Relacionamentos 1:1, 1:N e N:N

- **Aula:** 08
- **Capacidade:** C2

## Teoria

### Relacionamento

É a **associação entre entidades** que o sistema precisa registrar. Recebe um **verbo** e é
desenhado como **losango** ligando as entidades: CURSO —⟨oferece⟩— TURMA; ALUNO —⟨realiza⟩—
MATRÍCULA.

### Como descobrir a cardinalidade máxima

Faça **duas perguntas**, uma em cada sentido:

1. "Um **A** se liga a **quantos** B, no máximo?"
2. "Um **B** se liga a **quantos** A, no máximo?"

| Respostas | Cardinalidade |
|---|---|
| um e um | **1:1** |
| um A tem muitos B; um B tem um A | **1:N** |
| muitos e muitos | **N:N** |

### Um para um: 1:1 (5.2.1)

Cada ocorrência de um lado se liga a **no máximo uma** do outro.

- Um aluno tem **um** armário na escola; um armário é de **um** aluno.
- **Implementação:** chave estrangeira com **UNIQUE** num dos lados, ou uma tabela só, se os dois
  sempre andam juntos.

### Um para muitos: 1:N (5.2.2)

Uma ocorrência de um lado se liga a **várias** do outro; no sentido contrário, a **uma só**.

- Um curso tem **várias** turmas; uma turma é de **um** curso.
- **Implementação:** a **chave estrangeira fica no lado N** (TURMA guarda `id_curso`): é o atributo
  referencial do capítulo 7.

### Muitos para muitos: N:N (5.2.3)

Várias de um lado se ligam a **várias** do outro.

- Um aluno faz **várias** turmas; uma turma tem **vários** alunos.
- **Implementação:** **tabela associativa** no meio, com as **duas chaves estrangeiras** e os dados
  próprios da ligação: MATRÍCULA (`id_aluno`, `id_turma`, data, situação). É a entidade
  associativa do capítulo 6.

### Cardinalidade mínima (participação)

Pergunte: "Um **A** precisa ter **pelo menos um** B?"

- **0 (opcional):** um aluno pode estar cadastrado **sem** matrícula.
- **1 (obrigatória):** uma matrícula **precisa** ter um aluno.

Na notação completa, cada ponta leva (mínimo, máximo): ALUNO (1,1) —⟨realiza⟩— (0,N) MATRÍCULA.
Lê-se: um aluno realiza de 0 a N matrículas; uma matrícula é de exatamente 1 aluno. Na notação "pé
de galinha", comum nas ferramentas, traço = 1, círculo = 0 e tridente = muitos.

### Autorrelacionamento

Uma entidade se relaciona **com ela mesma**:

- Um CURSO é **pré-requisito** de outros CURSOS (N:N).
- Um FUNCIONÁRIO **supervisiona** vários FUNCIONÁRIOS (1:N), com chave estrangeira apontando para
  a mesma tabela (`id_supervisor`).

### Os relacionamentos da escola

| Relacionamento | Cardinalidade | Como fica no banco |
|---|---|---|
| CURSO (1,1) —⟨oferece⟩— (0,N) TURMA | 1:N | `id_curso` em TURMA |
| ALUNO —⟨matricula-se em⟩— TURMA | N:N | Associativa MATRÍCULA com `id_aluno` e `id_turma` |
| MATRÍCULA (1,1) —⟨gera⟩— (1,N) PARCELA | 1:N | `id_matricula` em PARCELA (fraca) |
| RESPONSÁVEL (1,1) —⟨responde por⟩— (0,N) ALUNO | 1:N | `id_responsavel` em ALUNO |
| PROFESSOR —⟨leciona em⟩— TURMA | N:N | Associativa entre PROFESSOR e TURMA |

Cada cardinalidade é **justificada** pela resposta do cliente: "uma turma pode ter mais de um
professor" foi dito pela coordenação; por isso PROFESSOR × TURMA é N:N.

### Erros comuns

- Ler a frase **num sentido só** e marcar 1:N quando é N:N.
- Deixar N:N **sem** tabela associativa.
- Pôr a chave estrangeira **no lado 1** do 1:N (o curso teria de guardar uma lista de turmas).
- Marcar participação obrigatória sem perguntar ao cliente.

## Resumo

- Relacionamento é a associação entre entidades, com verbo e losango.
- A cardinalidade máxima sai de duas perguntas, uma em cada sentido: 1:1, 1:N ou N:N.
- 1:N põe a chave estrangeira no lado N; N:N vira tabela associativa com as duas chaves.
- A cardinalidade mínima diz se a participação é opcional (0) ou obrigatória (1).
- Autorrelacionamento liga uma entidade a ela mesma.

## Glossário

- **Cardinalidade:** quantos de um lado se ligam ao outro
- **Relacionamento:** associação entre entidades que o sistema precisa registrar.
- **Cardinalidade mínima:** se a participação no relacionamento é opcional (0) ou obrigatória (1).
- **Tabela associativa:** tabela que resolve um N:N com as duas chaves estrangeiras.
- **Autorrelacionamento:** relacionamento de uma entidade com ela mesma.
