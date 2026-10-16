# Atividade: Atividade Prática — Aula 20 — 10 Questões Discursivas

- **Aula:** AP-20
- **Rótulo da aula:** Atividade Prática — Aula 20
- **Tema:** Projeto Integrador: Banco Documentado para o Back-End
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-20.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 20 (CONTEUDO/AULA-20-PROJETO-INTEGRADOR-BANCO-DOCUMENTADO-PARA-O-BACK-END.md): rastreabilidade dos requisitos, pasta do projeto e script mestre, documentação técnica (escopo, DER e dicionário, cronograma planejado × realizado, fluxograma, matriz de acesso, README e registro de decisões), revisão do DER e da 3FN, consultas do back-end, contrato com o back-end, teste de ponta a ponta, backup de entrega e revisão em pares.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-20-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 20

**Seu papel em todas as questões:** Você, como aluno consultor, fecha o projeto integrador do banco escola_db da escola de cursos livres (scripts 01-ddl-escola.sql a 07-seguranca.sql das aulas 12 a 19) e entrega o banco documentado para a equipe do back-end.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o trecho pedido; **(2)** o código ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: comandos que funcionam no PostgreSQL e no psql, documentação que outra pessoa consiga seguir, e justificativa com as palavras-chave do conteúdo. Comandos e textos equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 20 | Questões |
|---|---|
| Rastreabilidade: requisito do cliente → banco | 01 |
| Pasta do projeto, ordem dos scripts e script mestre | 02 |
| Banco limpo e scripts que rodam de novo | 03 |
| Escopo atualizado, README e dicionário de dados | 04 |
| Cronograma planejado × realizado e fluxograma ligado ao banco | 05 |
| Revisão do DER e da normalização (3FN, padrão de nomes) | 06 |
| As consultas do back-end | 07 |
| Contrato com o back-end (app_escola, EXECUTE, parâmetros) | 08 |
| Teste de ponta a ponta e backup de entrega | 09 |
| Revisão em pares e registro de decisões | 10 |

---

## ITEM 01 — Do Requisito ao Banco

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C1, C2

**Contexto:**
Você, como aluno consultor, apresenta o banco à direção da escola, que pergunta: "como eu sei que tudo o que pedimos está no banco?". O escopo tem, entre outros, os requisitos R2 (o aluno não se matricula duas vezes na mesma turma), R3 (a turma tem no máximo 25 alunos ativos) e R6 (o financeiro não vê o CPF).

**Comando:**
Mostre a rastreabilidade entre o escopo e o banco.

**Tópicos:**
- a) Explique o que é rastreabilidade no projeto do banco. (0,2)
- b) Diga onde cada um dos requisitos R2, R3 e R6 está atendido no banco (tabela, restrição, procedimento ou permissão). (0,4)
- c) Explique o que indicam, na conferência, uma tabela que não atende a nenhum requisito e um requisito sem nada no banco. (0,4)

---

## ITEM 02 — O Script Mestre

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, junta os sete scripts da SA 2 na pasta sql/ do projeto. O colega do back-end precisa instalar o banco inteiro com um único comando.

**Comando:**
Monte o script mestre 00-instalar.sql.

**Tópicos:**
- a) Explique por que os scripts precisam rodar numa ordem, com um exemplo de dependência. (0,2)
- b) Escreva o 00-instalar.sql que chama os scripts 01 a 07 na ordem certa e para no primeiro erro, e o comando psql que o executa. (0,4)
- c) Explique o que acontece se o script mestre não tiver \set ON_ERROR_STOP on e um dos scripts der erro. (0,4)

---

## ITEM 03 — Banco Limpo e Scripts que Rodam de Novo

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C7, C14

**Contexto:**
Você, como aluno consultor, ouve do colega: "na minha máquina funciona". Na máquina do professor, o script 06 para com "function registrar_historico_nota() does not exist", e uma segunda execução do script 05 dá "procedure matricular already exists".

**Comando:**
Prepare o teste num banco limpo e deixe os scripts prontos para rodar de novo.

**Tópicos:**
- a) Explique por que o teste da instalação deve ser feito num banco limpo e em qual banco ele nunca deve ser feito. (0,2)
- b) Escreva os comandos que criam um banco limpo escola_teste e instalam o projeto nele com o script mestre. (0,4)
- c) Diga como corrigir os dois erros do contexto (o da função e o do procedimento) para os scripts rodarem do zero e também uma segunda vez. (0,4)

---

## ITEM 04 — Escopo, README e Dicionário

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C1, C3

**Contexto:**
Você, como aluno consultor, revisa a documentação antes da entrega. O README só diz "rode os scripts", o escopo é o mesmo da aula 5 e o dicionário de dados lista só o nome das colunas.

**Comando:**
Complete a documentação técnica.

**Tópicos:**
- a) Explique para que serve a documentação técnica do banco. (0,2)
- b) Liste o que o README e o escopo atualizado precisam ter para outra pessoa instalar e entender o banco. (0,4)
- c) Escreva a linha do dicionário de dados da coluna valor da tabela parcela, com todos os campos que o dicionário pede. (0,4)

---

## ITEM 05 — Cronograma e Fluxograma

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C1, C2, C8

**Contexto:**
Você, como aluno consultor, atualiza o cronograma e o fluxograma da aula 11. Os procedimentos estavam previstos para a aula 17, mas ficaram prontos na aula 18 porque a regra de vagas mudou. O fluxograma da matrícula tem as decisões "Aluno já matriculado na turma?" e "Há vagas?".

**Comando:**
Atualize o cronograma e ligue o fluxograma às regras do banco.

**Tópicos:**
- a) Diga quais colunas o cronograma da entrega final precisa ter. (0,2)
- b) Escreva a linha do cronograma da tarefa dos procedimentos com o previsto, o realizado e a observação. (0,4)
- c) Diga qual recurso do banco executa cada uma das duas decisões do fluxograma e explique por que ligar o fluxograma ao banco melhora a documentação. (0,4)

---

## ITEM 06 — Revisão do Modelo

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C2, C3

**Contexto:**
Você, como aluno consultor, revisa o DDL de outra equipe e encontra: a tabela turma com as colunas id_curso e nome_curso; a tabela aluno com a coluna telefones = '4799990000;4798880000'; e a coluna IdMatrícula na tabela matricula.

**Comando:**
Revise o modelo pelo checklist da aula.

**Tópicos:**
- a) Cite dois itens do checklist do modelo que conferem o DER com o banco. (0,2)
- b) Diga qual regra cada um dos três problemas do contexto fere (forma normal ou padrão de nomes). (0,4)
- c) Explique como corrigir cada um dos três problemas. (0,4)

---

## ITEM 07 — As Consultas do Back-End

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, fecha o script 04-relatorios.sql com as consultas que as telas do back-end vão usar: a tela de cobrança e o painel da coordenação.

**Comando:**
Escreva as consultas e justifique cada uma.

**Tópicos:**
- a) Explique por que cada consulta do script deve ter um comentário dizendo qual tela ou relatório a usa. (0,2)
- b) Escreva a consulta das parcelas vencidas e não pagas, com o nome do aluno, para a tela de cobrança. (0,4)
- c) Escreva a consulta das turmas sem nenhuma matrícula para o painel da coordenação e explique o recurso que encontra essas turmas. (0,4)

---

## ITEM 08 — O Contrato com o Back-End

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, recebe o pedido do programador do back-end: "me passa a senha do postgres que eu faço o resto". A aplicação precisa matricular alunos, registrar pagamentos e editar nome, e-mail e telefone do aluno.

**Comando:**
Defina o contrato entre o banco e o back-end.

**Tópicos:**
- a) Explique o que é o contrato com o back-end e por que o pedido do programador deve ser recusado. (0,2)
- b) Escreva os GRANT do app_escola para matricular, registrar pagamento e editar só nome, e-mail e telefone do aluno. (0,4)
- c) Explique por que o back-end deve usar consultas com parâmetros e onde deve ficar a senha do app_escola. (0,4)

---

## ITEM 09 — Teste de Ponta a Ponta e Backup

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C7, C8, C14

**Contexto:**
Você, como aluno consultor, roda o roteiro final no banco escola_teste antes da entrega e precisa entregar também um backup que o professor consiga restaurar.

**Comando:**
Execute o teste final e prepare o backup de entrega.

**Tópicos:**
- a) Cite os comandos do psql que conferem, depois da instalação, as tabelas, as visões, as funções e procedimentos e os papéis. (0,2)
- b) Escreva dois testes do roteiro com o resultado esperado: uma matrícula repetida e o login do financeiro tentando ver o CPF. (0,4)
- c) Escreva o comando do backup de entrega e os comandos que provam que ele funciona, e explique por que essa prova é necessária. (0,4)

---

## ITEM 10 — Revisão em Pares e Decisões

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, participa da revisão cruzada. Sua equipe recebeu do colega a sugestão "o script de vocês está ruim" e precisa registrar no projeto por que decidiu cancelar matrículas em vez de apagá-las.

**Comando:**
Melhore a sugestão recebida e registre a decisão.

**Tópicos:**
- a) Diga como a revisão cruzada testa o projeto de outra equipe. (0,2)
- b) Reescreva a sugestão no formato "o quê, onde, efeito" com um problema real de instalação e diga como a equipe deve receber a sugestão. (0,4)
- c) Escreva a linha do registro de decisões para "matrícula é cancelada, não apagada", com o motivo e a alternativa descartada. (0,4)
