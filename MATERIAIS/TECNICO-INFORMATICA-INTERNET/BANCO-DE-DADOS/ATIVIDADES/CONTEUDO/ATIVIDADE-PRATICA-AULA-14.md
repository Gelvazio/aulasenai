# Atividade: Atividade Prática — Aula 14 — 10 Questões Discursivas

- **Aula:** AP-14
- **Rótulo da aula:** Atividade Prática — Aula 14
- **Tema:** DML: Inserção, Atualização e Exclusão
- **Ícone:** ✏️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-14.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 14 (CONTEUDO/AULA-14-DML-INSERCAO-ATUALIZACAO-E-EXCLUSAO.md): INSERT, ordem de inserção pelas chaves estrangeiras, UPDATE, DELETE, exclusão lógica, conferência com SELECT, transações e carga de dados de teste.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-14-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 14

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para carregar e manter os dados do banco do sistema de matrículas da escola de cursos livres, usando as tabelas curso, turma, aluno, matricula e parcela criadas nas aulas 12 e 13. Use apenas dados fictícios.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o comando aplicado à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: comando que funciona no PostgreSQL, com o WHERE correto e na ordem certa, e justificativa com as palavras-chave do conteúdo. Comandos equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 14 | Questões |
|---|---|
| INSERT (colunas, várias linhas, RETURNING) | 01, 02 |
| Ordem de inserção | 03 |
| UPDATE | 04, 05 |
| DELETE e exclusão lógica | 06, 07 |
| WHERE esquecido e transações | 08, 09 |
| Carga de dados de teste | 10 |

---

## ITEM 01 — Inserindo Cursos

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, vai cadastrar os cursos Excel Básico (40 h, R$ 180,00), Python Iniciante (60 h, R$ 250,00) e Design Gráfico (48 h, R$ 220,00).

**Comando:**
Escreva os comandos INSERT.

**Tópicos:**
- a) Escreva o INSERT do curso Excel Básico informando as colunas. (0,2)
- b) Escreva um único INSERT que cadastra Python Iniciante e Design Gráfico. (0,4)
- c) Explique por que o id_curso não é informado e por que listar as colunas. (0,4)

---

## ITEM 02 — RETURNING e Valores Padrão

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, cadastra a aluna fictícia Bia Lima (CPF 11122233344, nascida em 2009-05-10). O back-end precisa do id gerado para criar a matrícula logo depois.

**Comando:**
Escreva o INSERT do aluno.

**Tópicos:**
- a) Explique como os textos, as datas e os números decimais são escritos no INSERT. (0,2)
- b) Escreva o INSERT da aluna devolvendo o id gerado. (0,4)
- c) Escreva o INSERT da matrícula dela na turma 3, explicando por que data_matricula e situacao podem ser omitidas. (0,4)

---

## ITEM 03 — Ordem de Inserção

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, vê um colega tentando inserir primeiro as parcelas, depois as matrículas, os alunos, as turmas e por último os cursos, e recebendo erros.

**Comando:**
Oriente o colega.

**Tópicos:**
- a) Escreva a ordem correta de inserção das cinco tabelas. (0,2)
- b) Explique por que a ordem do colega gera erros e qual erro aparece. (0,4)
- c) Explique o que acontece ao inserir uma turma com um id_curso inexistente. (0,4)

---

## ITEM 04 — Alterando Dados

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe três pedidos: o curso 1 passa a custar R$ 195,00; a matrícula do aluno 5 na turma 2 deve ficar trancada; a turma 4 passa para o turno noite e a sala B2.

**Comando:**
Escreva os comandos UPDATE.

**Tópicos:**
- a) Escreva o UPDATE do valor do curso 1. (0,2)
- b) Escreva o UPDATE que tranca a matrícula do aluno 5 na turma 2. (0,4)
- c) Escreva o UPDATE da turma 4 alterando as duas colunas num só comando. (0,4)

---

## ITEM 05 — Atualização com Cálculo

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe da diretora o pedido de reajuste de 10% em todos os cursos ativos. Há um curso desativado que não deve ser reajustado.

**Comando:**
Faça o reajuste com segurança.

**Tópicos:**
- a) Escreva o SELECT que mostra os cursos que serão reajustados. (0,2)
- b) Escreva o UPDATE do reajuste. (0,4)
- c) Explique o que aconteceria se o WHERE fosse esquecido e como a conferência do número de linhas ajuda. (0,4)

---

## ITEM 06 — Apagando Dados

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa apagar a matrícula de teste de id 12 e a turma de teste com código T99. Um colega quer também apagar o curso Excel, que tem turmas.

**Comando:**
Escreva e analise as exclusões.

**Tópicos:**
- a) Escreva o DELETE da matrícula 12. (0,2)
- b) Escreva o DELETE da turma T99 e explique o que acontece com as parcelas quando uma matrícula é apagada. (0,4)
- c) Explique o que acontece ao tentar apagar o curso Excel e por quê. (0,4)

---

## ITEM 07 — Exclusão Lógica

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, ouve da diretora: "quero tirar o curso Design Gráfico da lista, mas não quero perder o histórico das turmas e alunos dele".

**Comando:**
Proponha a solução.

**Tópicos:**
- a) Explique o que é exclusão lógica. (0,2)
- b) Escreva o comando que faz a exclusão lógica do curso Design Gráfico. (0,4)
- c) Explique por que a exclusão lógica atende melhor à diretora que o DELETE. (0,4)

---

## ITEM 08 — O WHERE Esquecido

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, vê no histórico do psql os comandos UPDATE curso SET valor_mensal = 0; e DELETE FROM parcela; executados por engano.

**Comando:**
Analise os comandos.

**Tópicos:**
- a) Diga o que cada um dos dois comandos fez. (0,2)
- b) Explique os três passos da "rede de segurança" para evitar esse tipo de erro. (0,4)
- c) Explique se é possível desfazer os comandos depois de confirmados e como recuperar os dados. (0,4)

---

## ITEM 09 — Transações

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, vai corrigir o e-mail da aluna 7 com segurança, usando uma transação.

**Comando:**
Escreva a sequência completa.

**Tópicos:**
- a) Diga o que fazem BEGIN, COMMIT e ROLLBACK. (0,2)
- b) Escreva a sequência de comandos (BEGIN, SELECT, UPDATE e COMMIT) para a correção. (0,4)
- c) Explique em que situação você usaria ROLLBACK em vez de COMMIT, com um exemplo. (0,4)

---

## ITEM 10 — Carga de Dados de Teste

- **Aula:** 14 · DML
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, vai montar o script 02-dados-teste.sql para testar as consultas das próximas aulas.

**Comando:**
Planeje a carga.

**Tópicos:**
- a) Diga que tipo de dado deve ser usado na carga de teste. (0,2)
- b) Explique a ordem dos INSERT no script e a quantidade sugerida de registros por tabela. (0,4)
- c) Explique quando usar TRUNCATE para recomeçar a carga e o cuidado necessário. (0,4)
