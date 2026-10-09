# Atividade: Atividade Prática — Aula 13 — 10 Questões Discursivas

- **Aula:** AP-13
- **Rótulo da aula:** Atividade Prática — Aula 13
- **Tema:** DDL: Relações, Chaves e Restrições
- **Ícone:** 🔐
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-13.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 13 (CONTEUDO/AULA-13-DDL-RELACOES-CHAVES-E-RESTRICOES.md): chaves primárias simples e compostas, chaves estrangeiras e integridade referencial, ON DELETE, UNIQUE, CHECK, ADD e DROP CONSTRAINT, regras de negócio como restrições e leitura dos erros.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-13-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 13

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para criar e revisar as chaves e restrições dos bancos de dados de sistemas web no PostgreSQL. Escreva os comandos SQL completos quando o tópico pedir.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou a restrição pedida; **(2)** o comando aplicado à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: comando que funciona no PostgreSQL, restrição adequada à regra e justificativa com as palavras-chave do conteúdo. Comandos equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 13 | Questões |
|---|---|
| Chave primária simples e composta | 01 |
| Chave estrangeira e integridade referencial | 02, 03 |
| ON DELETE | 04, 05 |
| UNIQUE e CHECK | 06, 07 |
| ADD e DROP CONSTRAINT | 08 |
| Regras de negócio e mensagens de erro | 09, 10 |

---

## ITEM 01 — Chaves Primárias

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, define as chaves das tabelas aluno (identificador gerado pelo banco) e parcela (identificada pela matrícula e pelo número da parcela) da escola.

**Comando:**
Escreva as chaves primárias.

**Tópicos:**
- a) Diga o que a chave primária garante. (0,2)
- b) Escreva a coluna id_aluno com identificador automático e chave primária. (0,4)
- c) Escreva a chave primária composta de parcela e explique por que ela é composta. (0,4)

---

## ITEM 02 — Chave Estrangeira da Turma

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, cria a tabela turma: identificador automático, código único e obrigatório (até 10 caracteres), turno e o curso a que pertence (obrigatório).

**Comando:**
Escreva a tabela com a chave estrangeira.

**Tópicos:**
- a) Explique o que é integridade referencial. (0,2)
- b) Escreva o CREATE TABLE da tabela turma com a chave estrangeira para curso. (0,4)
- c) Explique o que acontece ao tentar gravar uma turma com um id_curso que não existe. (0,4)

---

## ITEM 03 — Tabela Associativa com Duas Chaves

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, cria a tabela matricula, que liga aluno e turma, com data da matrícula (padrão hoje) e situação (padrão ativa). O mesmo aluno não pode se matricular duas vezes na mesma turma.

**Comando:**
Escreva a tabela matricula.

**Tópicos:**
- a) Diga quais chaves estrangeiras a tabela precisa. (0,2)
- b) Escreva o CREATE TABLE completo da tabela matricula. (0,4)
- c) Explique qual restrição impede a matrícula repetida e como ela funciona. (0,4)

---

## ITEM 04 — Escolhendo o ON DELETE

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, precisa decidir o que acontece em três exclusões: (1) apagar um curso que tem turmas; (2) apagar uma matrícula que tem parcelas; (3) apagar um supervisor que tem funcionários, que devem continuar cadastrados.

**Comando:**
Escolha a ação de cada caso.

**Tópicos:**
- a) Indique RESTRICT, CASCADE ou SET NULL para cada um dos três casos. (0,2)
- b) Explique a escolha dos casos 1 e 2. (0,4)
- c) Explique a escolha do caso 3 e a condição que a coluna de chave estrangeira precisa ter. (0,4)

---

## ITEM 05 — Chave da Parcela com CASCADE

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, cria a tabela parcela: matrícula, número, vencimento, valor maior que zero e data de pagamento opcional. Apagar a matrícula deve apagar as parcelas.

**Comando:**
Escreva a tabela parcela.

**Tópicos:**
- a) Explique por que parcela pode usar CASCADE. (0,2)
- b) Escreva o CREATE TABLE completo da tabela parcela. (0,4)
- c) Explique o cuidado necessário ao usar CASCADE. (0,4)

---

## ITEM 06 — UNIQUE

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, recebe a regra "o CPF e o e-mail não podem se repetir" para a tabela aluno, que já existe e tem dados.

**Comando:**
Implemente a regra.

**Tópicos:**
- a) Diga qual restrição implementa a regra. (0,2)
- b) Escreva os comandos que acrescentam as restrições, com nome, na tabela existente. (0,4)
- c) Explique se dois alunos sem CPF podem ser cadastrados e por que o comando pode falhar se já houver CPFs repetidos. (0,4)

---

## ITEM 07 — CHECK e Domínios

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, recebe as regras: o valor da mensalidade é maior que zero; o turno é manha, tarde ou noite; a situação da matrícula é ativa, trancada, concluida ou cancelada.

**Comando:**
Escreva as restrições.

**Tópicos:**
- a) Explique o que faz a restrição CHECK. (0,2)
- b) Escreva as restrições CHECK do valor e do turno. (0,4)
- c) Escreva a restrição CHECK da situação e explique como ela implementa o domínio da aula 11. (0,4)

---

## ITEM 08 — Acrescentando e Removendo Restrições

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, percebe que a tabela aluno foi criada sem a chave estrangeira para responsavel e que uma restrição antiga chamada aluno_email_unico não é mais desejada.

**Comando:**
Ajuste a tabela existente.

**Tópicos:**
- a) Explique por que dar nome às restrições. (0,2)
- b) Escreva o comando que acrescenta a chave estrangeira de aluno para responsavel. (0,4)
- c) Escreva o comando que remove a restrição aluno_email_unico e explique quando remover uma restrição é aceitável. (0,4)

---

## ITEM 09 — Regras de Negócio em Restrições

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, recebe a lista de regras da escola: (1) toda matrícula é de um aluno e de uma turma; (2) o CPF não se repete; (3) a turma tem no máximo 25 alunos.

**Comando:**
Transforme as regras em restrições.

**Tópicos:**
- a) Indique a restrição das regras 1 e 2. (0,2)
- b) Explique por que a regra 3 não cabe num CHECK simples e como será garantida. (0,4)
- c) Explique por que garantir as regras no banco, e não só na tela do sistema. (0,4)

---

## ITEM 10 — Lendo as Mensagens de Erro

- **Aula:** 13 · Relações e Restrições
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, recebe de um colega três mensagens: (1) "duplicate key value violates unique constraint aluno_cpf_unico"; (2) "insert or update on table turma violates foreign key constraint"; (3) "new row violates check constraint parcela_valor_check".

**Comando:**
Interprete os erros.

**Tópicos:**
- a) Diga qual restrição barrou cada uma das três tentativas. (0,2)
- b) Explique o que o colega tentou fazer nos casos 1 e 2. (0,4)
- c) Explique o caso 3 e como corrigir o comando do colega. (0,4)
