# Capítulo 10 — Normalização de dados (1FN, 2FN e 3FN)

- **Aula:** 10
- **Capacidade:** C3, S2

## Teoria

### Por que normalizar

**Normalização** é organizar as tabelas em **formas normais**, separando os dados para que **cada
fato seja guardado uma única vez**. Resultado: menos redundância, menos erros, alterações num só
lugar e um banco mais fácil de manter.

### A planilha "tudo junto" e as anomalias

Esta é a planilha que a secretaria da escola usa hoje:

| matricula | aluno | telefones | curso | carga_curso | turma | turno | data_matricula |
|---|---|---|---|---|---|---|---|
| 1 | Ana Souza | 99999-1111, 98888-2222 | Excel | 40 | T1 | manhã | 2026-02-03 |
| 2 | Ana Souza | 99999-1111, 98888-2222 | Python | 60 | T5 | noite | 2026-02-10 |
| 3 | Bruno Lima | 97777-3333 | Excel | 40 | T1 | manhã | 2026-02-04 |

| Anomalia | O que acontece aqui |
|---|---|
| **Inserção** | Não dá para cadastrar um curso novo sem um aluno matriculado nele |
| **Atualização** | Se a carga do Excel muda para 44 h, é preciso alterar **todas** as linhas do Excel; esquecendo uma, os dados se contradizem |
| **Exclusão** | Apagando a única matrícula do Python, perde-se a informação de que o curso existe |

### Dependência funcional

**A → B** (lê-se "A determina B"): conhecendo **A**, sabe-se **um único valor** de **B**.

- `id_aluno` → nome do aluno
- curso → carga do curso
- turma → turno, curso

A normalização usa essas dependências para decidir **em qual tabela cada atributo fica**.

### Primeira forma normal (1FN)

Uma tabela está na **1FN** quando todos os valores são **atômicos** (um valor por célula), não há
**grupos repetidos** (telefone1, telefone2, telefone3) e existe uma **chave primária**.

Na planilha, "telefones" tem dois valores numa célula. **Solução:** tabela TELEFONE_ALUNO
(`id_aluno`, telefone), com uma linha por telefone.

### Segunda forma normal (2FN)

Está na **1FN** e **todo atributo não chave depende da chave inteira**, e não só de uma parte dela
(sem **dependência parcial**). Só se aplica quando a chave é **composta**.

Na tabela de matrículas com chave (`id_aluno`, `id_turma`) e os atributos nome_aluno, turno e
data_matricula:

- data_matricula depende de (`id_aluno`, `id_turma`) → fica;
- nome_aluno depende **só** de `id_aluno` → vai para ALUNO;
- turno depende **só** de `id_turma` → vai para TURMA.

### Terceira forma normal (3FN)

Está na **2FN** e **nenhum atributo não chave depende de outro atributo não chave** (sem
**dependência transitiva** A → B → C).

Em TURMA (`id_turma`, turno, `id_curso`, nome_curso, carga_curso), vale `id_turma` → `id_curso` →
carga_curso. Nome e carga dependem do **curso**, não da turma → vão para CURSO (`id_curso`, nome,
carga_horaria), e TURMA fica só com `id_curso` (chave estrangeira).

🔑 Cada atributo depende **da chave, da chave inteira e de nada além da chave**.

Regra de bolso: se um dado precisa ser corrigido em mais de um lugar, o modelo ainda não está
normalizado.

### Resultado normalizado da escola

| Tabela | Colunas |
|---|---|
| ALUNO | `id_aluno`, nome |
| TELEFONE_ALUNO | `id_aluno`, telefone |
| CURSO | `id_curso`, nome, carga_horaria |
| TURMA | `id_turma`, codigo, turno, `id_curso` |
| MATRICULA | `id_aluno`, `id_turma`, data_matricula |

As tabelas coincidem com as entidades e as associativas do DER do capítulo 9. Quando a diretora
muda a carga do Excel para 44 h, a alteração é feita **uma vez**, em CURSO, e vale para todas as
turmas.

### Justificar as escolhas (S2) e quando não normalizar tudo

Cada separação é justificada pela dependência funcional e pelas anomalias que ela evita. Às vezes
um dado é **repetido de propósito** (desnormalização) para ganhar velocidade em relatórios pesados,
sempre como **decisão documentada**. Um caso comum é o **valor cobrado na parcela**: parece repetir
o valor do curso, mas é o valor **daquela cobrança** (histórico) e não deve mudar quando o preço
atual do curso mudar.

## Resumo

- Normalizar é guardar cada fato uma única vez, evitando anomalias de inserção, atualização e
  exclusão.
- Dependência funcional A → B: conhecendo A, sabe-se um único B.
- 1FN: valores atômicos, sem grupos repetidos, com chave primária.
- 2FN: sem dependência parcial da chave composta; 3FN: sem dependência transitiva.
- Desnormalizar só com decisão documentada (ex.: o valor histórico da parcela).

## Glossário

- **Normalização:** retirar repetições e dependências erradas
- **Anomalia:** problema de inserção, atualização ou exclusão causado por dados repetidos.
- **Dependência funcional:** A determina B quando, conhecendo A, sabe-se um único valor de B.
- **Dependência parcial:** atributo que depende só de parte de uma chave composta.
- **Dependência transitiva:** atributo que depende de outro atributo que não é chave.
- **Desnormalização:** repetir um dado de propósito, com decisão documentada.
