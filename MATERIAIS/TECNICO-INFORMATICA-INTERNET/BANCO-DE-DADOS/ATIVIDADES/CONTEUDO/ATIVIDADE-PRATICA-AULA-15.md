# Atividade: Atividade Prática — Aula 15 — 10 Questões Discursivas

- **Aula:** AP-15
- **Rótulo da aula:** Atividade Prática — Aula 15
- **Tema:** DML: Consultas com Filtros e Ordenação
- **Ícone:** 🔍
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-15.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 15 (CONTEUDO/AULA-15-DML-CONSULTAS-COM-FILTROS-E-ORDENACAO.md): SELECT, colunas, apelidos e expressões, WHERE e operadores, AND, OR, NOT e parênteses, ORDER BY, LIMIT e OFFSET, DISTINCT e funções de texto e data.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-15-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 15

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para responder às perguntas da secretaria da escola de cursos livres com consultas SQL no banco escola_db (tabelas curso, turma, aluno, matricula e parcela das aulas 12 a 14).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou a consulta pedida; **(2)** a consulta aplicada à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: consulta que funciona no PostgreSQL e devolve o que a pergunta pede, e justificativa com as palavras-chave do conteúdo. Consultas equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 15 | Questões |
|---|---|
| SELECT, colunas, apelidos e expressões | 01 |
| Comparação e BETWEEN | 02 |
| IN, LIKE e ILIKE | 03, 04 |
| IS NULL | 05 |
| AND, OR, NOT e parênteses | 06 |
| ORDER BY, LIMIT e OFFSET | 07, 08 |
| DISTINCT e funções | 09 |
| Erros comuns | 10 |

---

## ITEM 01 — Colunas, Apelidos e Cálculos

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe da diretora o pedido: "quero ver o nome de cada curso, o valor mensal e quanto ele custaria no ano".

**Comando:**
Escreva e explique a consulta.

**Tópicos:**
- a) Explique a diferença entre SELECT * e listar as colunas. (0,2)
- b) Escreva a consulta pedida, com a coluna do valor anual chamada valor_anual. (0,4)
- c) Explique se a coluna calculada altera os dados da tabela curso e o papel do AS. (0,4)

---

## ITEM 02 — Comparação e Intervalo

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe dois pedidos: os cursos que custam a partir de R$ 200 e as matrículas feitas em fevereiro de 2026.

**Comando:**
Escreva as consultas.

**Tópicos:**
- a) Escreva a consulta dos cursos a partir de R$ 200. (0,2)
- b) Escreva a consulta das matrículas de fevereiro de 2026 usando BETWEEN. (0,4)
- c) Explique se o BETWEEN inclui as datas das pontas e o que aconteceria se o campo fosse data e hora. (0,4)

---

## ITEM 03 — Lista de Valores

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe o pedido: "quero as matrículas trancadas ou canceladas" e "as turmas dos cursos 1, 3 e 5".

**Comando:**
Use o operador IN.

**Tópicos:**
- a) Explique o que faz o operador IN. (0,2)
- b) Escreva as duas consultas usando IN. (0,4)
- c) Reescreva a consulta das turmas sem IN, usando OR, e diga qual forma é mais legível. (0,4)

---

## ITEM 04 — Busca por Texto

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe da secretaria: "procure os alunos com Silva no nome, escrito de qualquer jeito (Silva, silva, SILVA)" e "os alunos cujo nome começa com Ana".

**Comando:**
Escreva as buscas por texto.

**Tópicos:**
- a) Explique o que significam % e _ no LIKE. (0,2)
- b) Escreva a consulta dos nomes que começam com Ana. (0,4)
- c) Escreva a consulta de Silva em qualquer posição sem diferenciar maiúsculas e explique o operador usado. (0,4)

---

## ITEM 05 — Campos Vazios

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, vê um colega escrever SELECT nome FROM aluno WHERE email = NULL; e reclamar que "não volta ninguém", embora haja alunos sem e-mail.

**Comando:**
Corrija e explique.

**Tópicos:**
- a) Escreva a consulta correta dos alunos sem e-mail. (0,2)
- b) Explique por que = NULL não funciona. (0,4)
- c) Escreva a consulta que mostra nome e e-mail de todos os alunos, exibindo "sem e-mail" quando o campo estiver vazio. (0,4)

---

## ITEM 06 — Combinando Condições

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe o pedido "turmas da noite dos cursos 1 ou 3". O colega escreveu WHERE turno = 'noite' AND id_curso = 1 OR id_curso = 3.

**Comando:**
Analise e corrija a condição.

**Tópicos:**
- a) Explique a diferença entre AND e OR. (0,2)
- b) Explique por que a condição do colega traz turmas erradas. (0,4)
- c) Escreva a consulta correta. (0,4)

---

## ITEM 07 — Ordenação

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa listar os cursos do mais caro para o mais barato e, quando dois tiverem o mesmo valor, em ordem alfabética.

**Comando:**
Escreva a ordenação.

**Tópicos:**
- a) Explique o que fazem ASC e DESC. (0,2)
- b) Escreva a consulta pedida. (0,4)
- c) Explique para que serve a segunda coluna no ORDER BY. (0,4)

---

## ITEM 08 — Limitar e Paginar

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, ajuda o desenvolvedor do back-end: a tela mostra os alunos em ordem alfabética, 10 por página, e a diretora quer também "os 3 cursos mais caros".

**Comando:**
Escreva as consultas.

**Tópicos:**
- a) Escreva a consulta dos 3 cursos mais caros. (0,2)
- b) Escreva a consulta da segunda página de alunos. (0,4)
- c) Explique por que o ORDER BY é necessário quando se usa LIMIT e OFFSET. (0,4)

---

## ITEM 09 — DISTINCT e Funções

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe dois pedidos: saber quais turnos existem nas turmas (sem repetir) e listar os aniversariantes de outubro com a idade de cada um.

**Comando:**
Escreva as consultas.

**Tópicos:**
- a) Escreva a consulta dos turnos sem repetição. (0,2)
- b) Escreva a consulta dos aniversariantes de outubro. (0,4)
- c) Acrescente a idade em anos na consulta do tópico b e explique as funções usadas. (0,4)

---

## ITEM 10 — Erros Comuns

- **Aula:** 15 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, revisa três consultas de um estagiário: (1) WHERE turno = noite; (2) WHERE nome LIKE 'Silva'; (3) SELECT nome FROM curso LIMIT 3 ORDER BY valor_mensal DESC;

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Explique o erro da consulta 1 e corrija. (0,2)
- b) Explique o que a consulta 2 faz e corrija para encontrar Silva em qualquer posição. (0,4)
- c) Explique o erro da consulta 3 e escreva a versão correta. (0,4)
