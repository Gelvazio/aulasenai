# Atividade: Atividade Prática — Aula 19 — 10 Questões Discursivas

- **Aula:** AP-19
- **Rótulo da aula:** Atividade Prática — Aula 19
- **Tema:** Segurança da Informação: Pilares, Acesso e Auditoria
- **Ícone:** 🔐
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-19.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 19 (CONTEUDO/AULA-19-SEGURANCA-DA-INFORMACAO-PILARES-ACESSO-E-AUDITORIA.md): pilares da segurança da informação, classificação da informação e níveis hierárquicos de acesso, menor privilégio e matriz de acesso, papéis de grupo e de login, GRANT e REVOKE (inclusive por coluna), visão, conferência das permissões, auditoria com tabela e trigger (SECURITY DEFINER e session_user) e boas práticas.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-19-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 19

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para proteger o banco escola_db da escola de cursos livres (tabelas curso, turma, aluno, matricula e parcela das aulas 12 a 18) depois que uma planilha com o CPF dos alunos vazou e ninguém soube quem a exportou.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o trecho pedido; **(2)** o código ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: comandos que funcionam no PostgreSQL e respeitam a matriz de acesso, e justificativa com as palavras-chave do conteúdo. Comandos equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 19 | Questões |
|---|---|
| Pilares: confidencialidade, integridade e disponibilidade | 01 |
| Classificação da informação e níveis hierárquicos de acesso | 02 |
| Menor privilégio e matriz de acesso | 03 |
| Papéis de grupo e de login | 04 |
| GRANT e REVOKE | 05 |
| Permissão por coluna e teste com cada login | 06 |
| Visão (VIEW) | 07 |
| Conferência das permissões e ciclo de vida dos logins | 08 |
| Auditoria (log do servidor, tabela, função e trigger) | 09 |
| Boas práticas e erros comuns | 10 |

---

## ITEM 01 — Os Pilares em Casos Reais

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C12

**Contexto:**
Você, como aluno consultor, apresenta à direção três incidentes do último ano: (1) a planilha com o CPF dos alunos vazou; (2) a nota de um aluno foi alterada sem autorização; (3) o disco do servidor queimou e o sistema ficou um dia fora do ar.

**Comando:**
Relacione os incidentes aos pilares da segurança da informação.

**Tópicos:**
- a) Cite os três pilares da segurança da informação. (0,2)
- b) Diga qual pilar foi atingido em cada um dos três incidentes e cite uma proteção do banco para cada um. (0,4)
- c) Explique por que um backup guardado sem senha num pendrive ajuda um pilar e fere outro. (0,4)

---

## ITEM 02 — Classificação da Informação

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C13

**Contexto:**
Você, como aluno consultor, precisa classificar os dados da escola antes de definir quem acessa o quê: nome do curso, quantidade de matrículas por turma, e-mail do aluno e CPF do aluno.

**Comando:**
Classifique os dados e explique a hierarquia de acesso.

**Tópicos:**
- a) Cite os quatro níveis de classificação da informação usados na aula. (0,2)
- b) Classifique cada um dos quatro dados do contexto num desses níveis. (0,4)
- c) Explique por que a aplicação (back-end) não deve se conectar com o login postgres. (0,4)

---

## ITEM 03 — Menor Privilégio e Matriz de Acesso

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C13

**Contexto:**
Você, como aluno consultor, ouve do diretor: "dá acesso total para todo mundo, assim ninguém reclama de erro". O financeiro só registra o pagamento das parcelas e precisa saber o nome do aluno de cada parcela.

**Comando:**
Aplique o menor privilégio na matriz de acesso.

**Tópicos:**
- a) Explique o princípio do menor privilégio. (0,2)
- b) Escreva a linha da matriz de acesso do financeiro para as tabelas parcela e aluno, usando S, I, U e D (e as colunas, quando for o caso). (0,4)
- c) Justifique por que ninguém recebe DELETE na tabela matricula. (0,4)

---

## ITEM 04 — Papéis de Grupo e de Login

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, descobre que toda a secretaria usa um único login "secretaria", com a senha num post-it, e que a escola vai contratar mais duas secretárias.

**Comando:**
Organize os papéis no PostgreSQL.

**Tópicos:**
- a) Explique a diferença entre um papel de grupo e um papel de login no PostgreSQL. (0,2)
- b) Escreva os comandos que criam os grupos grupo_secretaria, grupo_financeiro e grupo_consulta e o login ana_secretaria dentro do grupo da secretaria. (0,4)
- c) Explique por que as permissões ficam no grupo e por que o login compartilhado prejudica a auditoria. (0,4)

---

## ITEM 05 — GRANT e REVOKE

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, começa o script 07-seguranca.sql. Pela matriz, a secretaria lê, inclui e altera aluno e matricula e só lê curso e turma.

**Comando:**
Escreva as permissões da secretaria.

**Tópicos:**
- a) Explique para que servem os comandos REVOKE ALL ... FROM PUBLIC no início do script. (0,2)
- b) Escreva os GRANT que deixam a secretaria entrar no banco, enxergar o esquema e ter as permissões da matriz. (0,4)
- c) A coordenação decidiu que a secretaria não altera mais matrículas. Escreva o comando e explique o que muda para as secretárias. (0,4)

---

## ITEM 06 — Permissão por Coluna

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, precisa deixar o financeiro marcar o pagamento das parcelas sem ver o CPF nem o telefone dos alunos.

**Comando:**
Use permissões por coluna e teste com o login bruno_financeiro.

**Tópicos:**
- a) Explique quando usar permissão por coluna em vez de permissão na tabela inteira. (0,2)
- b) Escreva os GRANT do financeiro na parcela (ler e alterar só data_pagamento) e no aluno (ler só id_aluno e nome). (0,4)
- c) Diga o resultado de cada comando no login do financeiro e explique o que ele indica: SELECT cpf FROM aluno; UPDATE parcela SET data_pagamento = current_date WHERE id_matricula = 10 AND numero = 1; DELETE FROM parcela; (0,4)

---

## ITEM 07 — Visão para a Coordenação

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, recebe o pedido da coordenação: ver quantas matrículas cada turma tem, com o nome do curso, sem acesso a nenhum dado pessoal de aluno.

**Comando:**
Atenda ao pedido com uma visão.

**Tópicos:**
- a) Diga o que é uma visão (VIEW). (0,2)
- b) Escreva a visão vw_matriculas_por_turma (código da turma, nome do curso e total de matrículas) e o GRANT para o grupo_consulta. (0,4)
- c) Explique o que acontece quando o login da coordenação executa SELECT * FROM matricula e por que isso é desejado. (0,4)

---

## ITEM 08 — Conferência e Ciclo de Vida dos Logins

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, revisa as permissões no fim do semestre: um funcionário saiu da escola e um estagiário entrou com contrato até 31/12/2026.

**Comando:**
Confira as permissões e ajuste os logins.

**Tópicos:**
- a) Diga qual comando do psql lista os papéis, os atributos e os grupos de cada um. (0,2)
- b) Escreva duas formas de conferir as permissões da tabela parcela: o comando do psql e a consulta no information_schema. (0,4)
- c) Escreva o comando que bloqueia o login do funcionário que saiu e o que faz o login do estagiário expirar, e explique por que as permissões do grupo não precisam ser refeitas. (0,4)

---

## ITEM 09 — Auditoria com Trigger

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, precisa garantir que, no próximo incidente, a escola saiba quem alterou a parcela, quando e o que mudou.

**Comando:**
Monte a auditoria da tabela parcela.

**Tópicos:**
- a) Explique o que é auditoria de acesso e cite as duas camadas usadas no PostgreSQL. (0,2)
- b) Escreva a tabela auditoria, a função registrar_auditoria (com TG_TABLE_NAME, TG_OP, OLD e NEW) e o trigger AFTER na tabela parcela. (0,4)
- c) Explique por que a função usa SECURITY DEFINER e por que grava session_user e não current_user. (0,4)

---

## ITEM 10 — Boas Práticas e Erros Comuns

- **Aula:** 19 · Segurança da Informação
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, revisa três trechos de um estagiário: (1) o back-end conecta com o login postgres e a senha está no JavaScript do site; (2) GRANT ALL ON parcela TO grupo_financeiro WITH GRANT OPTION; (3) o backup com pg_dump roda toda noite no mesmo disco do servidor e nunca foi restaurado.

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Explique o erro do trecho 1 e corrija. (0,2)
- b) Explique o problema do trecho 2 e corrija. (0,4)
- c) Explique o problema do trecho 3 e corrija. (0,4)
