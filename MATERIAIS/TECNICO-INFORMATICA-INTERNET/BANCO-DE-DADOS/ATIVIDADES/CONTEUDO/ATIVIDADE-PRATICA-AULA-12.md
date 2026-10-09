# Atividade: Atividade Prática — Aula 12 — 10 Questões Discursivas

- **Aula:** AP-12
- **Rótulo da aula:** Atividade Prática — Aula 12
- **Tema:** DDL: Tabelas e Campos
- **Ícone:** 🏗️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-12.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 12 (CONTEUDO/AULA-12-DDL-TABELAS-E-CAMPOS.md): SQL, DDL e DML, tipos de dados do PostgreSQL, CREATE TABLE com NOT NULL, DEFAULT e identificador automático, ALTER TABLE, DROP TABLE e script DDL.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-12-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 12

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para escrever e revisar os comandos DDL que criam as tabelas do banco de sistemas web no PostgreSQL. Escreva os comandos SQL completos quando o tópico pedir.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito, o tipo ou o comando pedido; **(2)** o comando aplicado à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: comando que funciona no PostgreSQL, tipos e restrições adequados à situação e justificativa com as palavras-chave do conteúdo. Comandos equivalentes que produzam o mesmo resultado valem. Pequenos erros de digitação que não mudam o sentido descontam metade só quando o comando não funcionaria.

## Cobertura da aula

| Conteúdo da aula 12 | Questões |
|---|---|
| SQL, DDL e DML | 01 |
| Tipos de dados do PostgreSQL | 02, 03 |
| CREATE TABLE, NOT NULL, DEFAULT e identificador | 04, 05 |
| Conferência da estrutura | 06 |
| ALTER TABLE | 07, 08 |
| DROP TABLE | 09 |
| Script DDL | 10 |

---

## ITEM 01 — DDL e DML

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, explica a um estagiário a diferença entre os comandos que ele vai usar no banco da escola.

**Comando:**
Diferencie DDL e DML.

**Tópicos:**
- a) Diga o que é SQL em uma frase. (0,2)
- b) Explique o que faz a DDL e cite seus três comandos principais. (0,4)
- c) Explique o que faz a DML, cite seus quatro comandos e dê um exemplo de quando usá-la. (0,4)

---

## ITEM 02 — Escolhendo Tipos de Dados

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, recebe o dicionário da tabela produto de uma loja: nome (até 120 letras), preço (dinheiro), estoque (quantidade inteira), ativo (sim/não), descrição (texto longo, opcional) e data de lançamento.

**Comando:**
Escolha os tipos do PostgreSQL.

**Tópicos:**
- a) Escreva o tipo de nome e de estoque. (0,2)
- b) Escreva o tipo de preço e explique por que não usar um tipo de ponto flutuante. (0,4)
- c) Escreva o tipo de ativo, de descrição e da data de lançamento. (0,4)

---

## ITEM 03 — Tipos de Documentos e Datas

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, revisa a tabela cliente de um colega que usou: cpf integer, uf varchar(255), criado_em date e telefone numeric(11,0).

**Comando:**
Corrija os tipos.

**Tópicos:**
- a) Diga o tipo correto para uf. (0,2)
- b) Explique o erro do cpf como integer e do telefone como numeric e indique o tipo correto. (0,4)
- c) Explique o tipo adequado para criado_em, se o sistema precisa da data e da hora com fuso. (0,4)

---

## ITEM 04 — Criando a Tabela curso

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, cria a tabela curso da escola com: identificador gerado pelo banco, nome obrigatório (até 100 letras), carga horária obrigatória, valor mensal obrigatório (dinheiro) e ativo com padrão verdadeiro.

**Comando:**
Escreva o CREATE TABLE.

**Tópicos:**
- a) Escreva a linha da coluna id_curso com identificador automático e chave primária. (0,2)
- b) Escreva o comando CREATE TABLE completo da tabela curso. (0,4)
- c) Explique o papel de NOT NULL e de DEFAULT no comando. (0,4)

---

## ITEM 05 — Criando a Tabela aluno

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, cria a tabela aluno com: identificador automático, nome obrigatório, CPF opcional (só dígitos), data de nascimento obrigatória, e-mail opcional e data e hora de cadastro preenchidas automaticamente.

**Comando:**
Escreva o CREATE TABLE.

**Tópicos:**
- a) Explique por que o CPF fica opcional na escola. (0,2)
- b) Escreva o comando CREATE TABLE completo da tabela aluno. (0,4)
- c) Explique como a coluna de data e hora de cadastro é preenchida sozinha e qual tipo ela usa. (0,4)

---

## ITEM 06 — Conferindo a Estrutura

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, executou o script da escola e precisa mostrar ao professor que as tabelas foram criadas corretamente.

**Comando:**
Mostre a conferência.

**Tópicos:**
- a) Escreva o comando do psql que lista as tabelas. (0,2)
- b) Escreva o comando que mostra a estrutura da tabela aluno e explique o que ele exibe. (0,4)
- c) Explique onde conferir as colunas da tabela no pgAdmin. (0,4)

---

## ITEM 07 — Alterando Colunas

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, recebe pedidos de mudança na tabela aluno: acrescentar a coluna celular (texto com 11 dígitos), aumentar o e-mail para 150 caracteres e renomear a coluna telefone para telefone_fixo.

**Comando:**
Escreva os comandos ALTER TABLE.

**Tópicos:**
- a) Escreva o comando que acrescenta a coluna celular. (0,2)
- b) Escreva os comandos que aumentam o e-mail e renomeiam o telefone. (0,4)
- c) Explique por que mudar o tipo de uma coluna pode falhar quando a tabela já tem dados. (0,4)

---

## ITEM 08 — Coluna Obrigatória em Tabela com Dados

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, tenta tornar o e-mail obrigatório na tabela aluno, que já tem 300 alunos, e recebe um erro.

**Comando:**
Resolva o problema.

**Tópicos:**
- a) Escreva o comando que torna o e-mail obrigatório. (0,2)
- b) Explique a causa provável do erro. (0,4)
- c) Explique como resolver antes de executar o comando de novo. (0,4)

---

## ITEM 09 — Apagando Tabelas com Segurança

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, vê um colega prestes a executar DROP TABLE aluno; no banco de produção da escola para "começar de novo".

**Comando:**
Oriente o colega.

**Tópicos:**
- a) Diga o que o comando DROP TABLE aluno faz. (0,2)
- b) Explique os cuidados antes de um DROP TABLE em produção. (0,4)
- c) Explique para que serve IF EXISTS e em que tipo de script ele é útil. (0,4)

---

## ITEM 10 — Script DDL da Escola

- **Aula:** 12 · DDL
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, organiza o arquivo 01-ddl-escola.sql com as tabelas curso, turma, aluno, responsavel, professor, matricula, parcela e aula_turma.

**Comando:**
Organize o script.

**Tópicos:**
- a) Diga o que é um script DDL. (0,2)
- b) Explique em que ordem criar as tabelas e por quê, com um exemplo. (0,4)
- c) Escreva o comando que executa o script no banco escola_db e explique por que versionar o script no Git. (0,4)
