# Capítulo 07 — Atributos

- **Aula:** 07
- **Capacidade:** C2

## Teoria

### Atributo e valor

- **Atributo** é uma **característica** da entidade que o sistema precisa guardar: nome, CPF e data
  de nascimento de ALUNO.
- **Valor** é o conteúdo do atributo numa ocorrência: nome = "Ana Souza".
- **Notação no DER:** elipse ligada à entidade (ou lista de atributos dentro do retângulo).

### Quanto à estrutura: simples e composto

| Tipo | Definição | Exemplos |
|---|---|---|
| **Simples (5.3.1)** | Não se divide em partes com significado próprio | CPF, data de nascimento, preço, quantidade |
| **Composto (5.3.2)** | Pode ser dividido em partes menores, cada uma com significado | Endereço (rua, número, bairro, cidade, CEP); nome completo; telefone (DDD, número) |

🔑 Divida o composto quando o sistema **precisa usar as partes** separadamente: listar alunos **por
bairro** exige o bairro separado. Na tabela, cada parte vira uma coluna.

### Quanto à função: descritivo, nominativo e referencial

| Tipo | Definição | Exemplos |
|---|---|---|
| **Descritivo (5.3.3)** | Descreve uma característica da ocorrência, sem identificá-la | Preço, carga horária, situação, data de nascimento |
| **Nominativo (5.3.4)** | Além de descrever, **nomeia ou identifica** a ocorrência | Código do curso, número da matrícula, nome do curso, CPF |
| **Referencial (5.3.5)** | **Faz referência a outra entidade**, ligando as duas | Código do curso dentro de TURMA; código do aluno dentro de MATRÍCULA |

- O **nominativo** costuma ser o candidato a **identificador** (chave primária, capítulo 13).
- O **referencial** é a semente da **chave estrangeira** (capítulo 13) e revela um
  **relacionamento** (capítulo 8).

### Identificador

É o atributo (ou conjunto de atributos) que **distingue uma ocorrência de todas as outras**: não se
repete e não fica vazio.

- ALUNO → id do aluno (ou CPF).
- PARCELA (fraca) → id da matrícula + número da parcela.
- Prefira um **código próprio** (id) a dados que podem mudar ou faltar: o e-mail muda e uma criança
  pode não ter CPF.

### Dicionário de atributos

Documento que registra cada atributo de forma padronizada:

| Entidade | Atributo | Descrição | Tipo | Obrig. | Classificação | Exemplo |
|---|---|---|---|---|---|---|
| ALUNO | id_aluno | Código do aluno | inteiro | sim | simples, nominativo, identificador | 15 |
| ALUNO | nome | Nome completo | texto (100) | sim | composto, nominativo | Ana Souza |
| ALUNO | data_nascimento | Data de nascimento | data | sim | simples, descritivo | 2008-03-21 |
| ALUNO | rua, numero, bairro, cidade, cep | Endereço | texto | sim | composto, descritivo | Rua das Flores, 120… |
| TURMA | id_curso | Curso da turma | inteiro | sim | simples, referencial (CURSO) | 3 |

Os tipos exatos do PostgreSQL (`integer`, `varchar`, `date`, `numeric`…) entram no capítulo 12;
aqui basta a ideia: inteiro, texto, data, decimal, verdadeiro ou falso.

### Aplicando na ficha da escola

Na ficha de matrícula em papel aparecem "Nome", "CPF", "Nascimento", "Endereço", "Telefone do
responsável", "Curso", "Turma", "Turno" e "Data". Você, como aluno consultor, classifica:

| Campo da ficha | Classificação | Entidade |
|---|---|---|
| Nome | Composto e nominativo | ALUNO |
| CPF | Simples e nominativo | ALUNO |
| Nascimento | Simples e descritivo | ALUNO |
| Endereço | Composto e descritivo (dividido: a escola quer relatório por bairro) | ALUNO |
| Curso, Turma | Referenciais (apontam para CURSO e TURMA) | TURMA, MATRÍCULA |
| Turno | Descritivo | TURMA |
| Data | Descritivo | MATRÍCULA |

### Erros comuns

- Guardar a **idade** em vez da **data de nascimento** (a idade muda todo ano; a data não).
- Juntar várias informações num campo só ("telefones: 99999-1111 / 98888-2222").
- Criar atributo referencial sem existir a entidade referenciada.
- Usar o **nome** como identificador (há homônimos).

## Resumo

- Atributo é uma característica da entidade; valor é o conteúdo numa ocorrência.
- Estrutura: simples (não se divide) ou composto (dividido quando as partes são usadas).
- Função: descritivo (descreve), nominativo (nomeia ou identifica) e referencial (aponta para
  outra entidade).
- O identificador distingue cada ocorrência; prefira um código próprio.
- O dicionário de atributos registra descrição, tipo, obrigatoriedade, classificação e exemplo.

## Glossário

- **Atributo:** característica de uma entidade
- **Atributo composto:** atributo dividido em partes com significado próprio (endereço).
- **Atributo referencial:** atributo que aponta para outra entidade.
- **Identificador:** atributo que distingue uma ocorrência de todas as outras.
- **Dicionário de atributos:** documento que descreve cada atributo de forma padronizada.
