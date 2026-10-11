# Atividade: Projeto Integrador: Banco Documentado para o Back-End — 50 Questões

- **Aula:** 20
- **Tema:** Projeto Integrador: Banco Documentado para o Back-End
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Integrar a modelagem e o SQL num banco documentado para o back-end: rastreabilidade dos requisitos do cliente, pasta do projeto e script mestre (\i, ON_ERROR_STOP, ordem dos scripts, banco limpo, scripts que rodam de novo), documentação técnica (escopo atualizado, DER e dicionário, cronograma planejado × realizado, fluxograma ligado às regras do banco, matriz de acesso, README e registro de decisões), revisão do DER e da 3FN, as 10 consultas do back-end, contrato com o back-end (app_escola, EXECUTE, consultas com parâmetros), teste de ponta a ponta, backup de entrega com restauração e revisão em pares.
- **Conteúdo-base:** ../CONTEUDO/AULA-20-PROJETO-INTEGRADOR-BANCO-DOCUMENTADO-PARA-O-BACK-END.md
- **Slides:** ../AULAS/AULA-20-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-20-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — As Duas Situações de Aprendizagem

- **Capacidade:** C1

**Comando:**  
O projeto integrador junta quais entregas da UC?

**Alternativas:**
- A) Só o DER da aula 9, sem os scripts nem a documentação.
- B) Só as consultas da aula 15, sem a modelagem nem a segurança.
- C) Só a instalação do PostgreSQL das aulas 3 e 4.
- D) A modelagem da SA 1 (aulas 5 a 11) e o banco funcionando da SA 2 (aulas 12 a 19).

**Gabarito:** D

---

## ITEM 02 — Rastreabilidade

- **Capacidade:** C1

**Comando:**  
O que significa rastreabilidade no projeto do banco?

**Alternativas:**
- A) Cada tabela, coluna importante e regra aponta para um requisito do escopo.
- B) Cada aluno da escola pode consultar o próprio histórico.
- C) Cada consulta registra o tempo que levou para responder.
- D) Cada script mostra a data e a hora em que foi executado.

**Gabarito:** A

---

## ITEM 03 — Tabela sem Requisito

- **Capacidade:** C1

**Comando:**  
Na conferência de rastreabilidade, uma tabela que não atende a nenhum requisito indica:

**Alternativas:**
- A) Que ela é a mais importante e deve ganhar mais colunas.
- B) Que o banco está pronto e pode ser entregue sem revisão.
- C) Que o requisito precisa ser apagado do escopo na hora.
- D) Que ela sobra no modelo e precisa ser justificada ou retirada.

**Gabarito:** D

---

## ITEM 04 — Requisito sem Regra

- **Capacidade:** C1

**Comando:**  
Um requisito do escopo que não tem tabela, restrição ou procedimento correspondente indica:

**Alternativas:**
- A) Que o requisito já está atendido pelo PostgreSQL sozinho.
- B) Que falta implementar algo no banco para atender ao cliente.
- C) Que a tabela mais parecida pode ser usada sem mudança.
- D) Que o back-end deve ignorar esse requisito.

**Gabarito:** B

---

## ITEM 05 — Matrícula Repetida

- **Capacidade:** C7

**Comando:**  
Qual recurso do banco atende ao requisito "um aluno não se matricula duas vezes na mesma turma"?

**Alternativas:**
- A) ORDER BY id_aluno na consulta de matrículas.
- B) Um índice na coluna nome da tabela aluno.
- C) Uma visão com as matrículas de cada turma.
- D) UNIQUE (id_aluno, id_turma) na tabela matricula.

**Gabarito:** D

---

## ITEM 06 — Limite de Vagas

- **Capacidade:** C8

**Comando:**  
No projeto, onde fica a regra "a turma tem no máximo 25 alunos ativos"?

**Alternativas:**
- A) No procedimento matricular, que conta as matrículas ativas antes do INSERT.
- B) Numa coluna CHECK (vagas = 25) da tabela aluno.
- C) No README, para o usuário lembrar de conferir.
- D) No comentário do script 01-ddl-escola.sql.

**Gabarito:** A

---

## ITEM 07 — Ordem dos Scripts

- **Capacidade:** C7

**Comando:**  
Por que os scripts do projeto têm uma ordem de execução?

**Alternativas:**
- A) Porque cada script só pode ser executado uma vez por dia.
- B) Porque um objeto depende de outro: turma precisa de curso, o trigger precisa da função e o GRANT precisa das tabelas.
- C) Porque a ordem deixa as consultas mais rápidas depois da instalação.
- D) Porque o PostgreSQL só aceita arquivos com número no nome, em qualquer ordem.

**Gabarito:** B

---

## ITEM 08 — Script Mestre

- **Capacidade:** C7

**Comando:**  
O que é o script mestre 00-instalar.sql?

**Alternativas:**
- A) Um script que chama os outros na ordem certa para instalar o banco inteiro.
- B) O script que apaga todos os dados antes de cada aula.
- C) A cópia do DER desenhada em SQL para o professor.
- D) O script com a senha do postgres para a equipe compartilhar.

**Gabarito:** A

---

## ITEM 09 — Comando \i

- **Capacidade:** C7

**Comando:**  
No psql, o comando \i 01-ddl-escola.sql:

**Alternativas:**
- A) Instala uma extensão nova no PostgreSQL.
- B) Mostra as informações da tabela indicada.
- C) Importa uma planilha para a tabela aluno.
- D) Executa os comandos do arquivo indicado.

**Gabarito:** D

---

## ITEM 10 — ON_ERROR_STOP

- **Capacidade:** C7

**Comando:**  
Para que serve \set ON_ERROR_STOP on no início do script mestre?

**Alternativas:**
- A) Para o psql parar no primeiro erro, sem deixar o banco instalado pela metade.
- B) Para o psql esconder os erros e terminar a instalação.
- C) Para gravar os erros na tabela de auditoria da aula 19.
- D) Para o PostgreSQL desligar o servidor quando houver erro.

**Gabarito:** A

---

## ITEM 11 — Sem ON_ERROR_STOP

- **Capacidade:** C7

**Comando:**  
Sem \set ON_ERROR_STOP on, o que acontece quando um script do mestre dá erro?

**Alternativas:**
- A) O psql reinicia a instalação desde o primeiro script.
- B) O psql desfaz sozinho todos os scripts já executados.
- C) O psql pede a senha do administrador antes de continuar.
- D) O psql mostra o erro e continua, e o banco pode ficar incompleto sem ninguém perceber.

**Gabarito:** D

---

## ITEM 12 — Banco Limpo

- **Capacidade:** C7

**Comando:**  
Por que o teste final da instalação é feito num banco limpo, como escola_teste?

**Alternativas:**
- A) Porque o banco de desenvolvimento pode ter objetos criados à mão que não estão nos scripts.
- B) Porque o banco limpo dispensa o README e a documentação.
- C) Porque o banco limpo é mais rápido para gravar as parcelas.
- D) Porque o PostgreSQL só aceita o script mestre em bancos vazios de produção.

**Gabarito:** A

---

## ITEM 13 — Script que Roda de Novo

- **Capacidade:** C7

**Comando:**  
Qual comando evita o erro "já existe" quando o script de procedimentos é executado uma segunda vez?

**Alternativas:**
- A) CREATE OR REPLACE PROCEDURE.
- B) INSERT INTO PROCEDURE.
- C) ALTER TABLE PROCEDURE.
- D) CREATE PROCEDURE ONLY ONCE.

**Gabarito:** A

---

## ITEM 14 — Trigger que Roda de Novo

- **Capacidade:** C7

**Comando:**  
Qual comando, antes do CREATE TRIGGER, permite rodar o script 06 de novo sem erro?

**Alternativas:**
- A) DELETE FROM trg_historico_nota;
- B) DROP TRIGGER IF EXISTS trg_historico_nota ON matricula;
- C) TRUNCATE TRIGGER trg_historico_nota;
- D) UPDATE TRIGGER trg_historico_nota SET ativo = false;

**Gabarito:** B

---

## ITEM 15 — Comentário no Topo

- **Capacidade:** C3

**Comando:**  
O que o comentário no topo de cada script do projeto deve informar?

**Alternativas:**
- A) A senha do login que vai executar o script.
- B) Só a data em que o arquivo foi salvo pela última vez.
- C) O nome e o CPF de quem escreveu o script.
- D) O que o script faz, de que aula veio e de que script depende.

**Gabarito:** D

---

## ITEM 16 — Para que Documentar

- **Capacidade:** C1

**Comando:**  
Qual é o principal objetivo da documentação técnica do banco?

**Alternativas:**
- A) Guardar as senhas dos logins num lugar só.
- B) Deixar outra pessoa entender, instalar e usar o banco sem perguntar para quem fez.
- C) Substituir os scripts SQL na instalação do banco.
- D) Aumentar o número de páginas entregues ao professor.

**Gabarito:** B

---

## ITEM 17 — Escopo Atualizado

- **Capacidade:** C1

**Comando:**  
O escopo atualizado (6.1) da documentação deve trazer:

**Alternativas:**
- A) Só a lista de tabelas com os tipos de cada coluna.
- B) Os comandos de backup e restauração do banco.
- C) O objetivo do sistema, os requisitos, o que entra, o que não entra e as mudanças aceitas.
- D) Só o nome dos integrantes da equipe e as notas.

**Gabarito:** C

---

## ITEM 18 — Dicionário de Dados

- **Capacidade:** C3

**Comando:**  
No dicionário de dados, cada coluna é descrita com:

**Alternativas:**
- A) A senha necessária para alterar a coluna.
- B) Nome, tipo, tamanho, se aceita nulo, chave, regra e exemplo.
- C) Só o nome da coluna e a quantidade de linhas da tabela.
- D) O nome do aluno que mais usa a coluna no sistema.

**Gabarito:** B

---

## ITEM 19 — Cronograma da Entrega

- **Capacidade:** C1

**Comando:**  
Na entrega final, o cronograma (6.2) deve mostrar:

**Alternativas:**
- A) As tarefas sem responsável, para ninguém ser cobrado.
- B) O previsto e o realizado de cada tarefa, com o responsável e o motivo dos atrasos.
- C) Só as datas previstas, porque o realizado não interessa ao cliente.
- D) Só a data da apresentação final da equipe.

**Gabarito:** B

---

## ITEM 20 — Atraso no Cronograma

- **Capacidade:** C1

**Comando:**  
Os procedimentos ficaram prontos na aula 18, e não na 17, porque a regra de vagas mudou. Como registrar no cronograma?

**Alternativas:**
- A) Anotar o realizado (aula 18) e o motivo: mudança de escopo aceita.
- B) Deixar o realizado em branco até a próxima UC.
- C) Trocar o previsto para aula 18, para não aparecer o atraso.
- D) Apagar a tarefa do cronograma, porque já foi feita.

**Gabarito:** A

---

## ITEM 21 — Fluxograma Ligado ao Banco

- **Capacidade:** C2

**Comando:**  
No fluxograma da matrícula (6.3), a decisão "Aluno já matriculado na turma?" aponta para:

**Alternativas:**
- A) A visão vw_matriculas_por_turma da coordenação.
- B) O papel grupo_financeiro da aula 19.
- C) O UNIQUE (id_aluno, id_turma) da tabela matricula.
- D) O backup escola.dump da entrega final.

**Gabarito:** C

---

## ITEM 22 — Decisão "Parcela Já Paga?"

- **Capacidade:** C8

**Comando:**  
No fluxograma do pagamento, a decisão "Parcela já paga?" é executada no banco por:

**Alternativas:**
- A) O trigger trg_proteger_parcela_paga e a condição data_pagamento IS NULL do procedimento.
- B) O comando \du do psql, que lista os papéis.
- C) A coluna criado_em da tabela curso.
- D) A consulta ORDER BY vencimento do relatório de parcelas.

**Gabarito:** A

---

## ITEM 23 — Matriz de Acesso na Documentação

- **Capacidade:** C14

**Comando:**  
O que a matriz de acesso documenta?

**Alternativas:**
- A) A ordem em que as tabelas aparecem no DER.
- B) A quantidade de alunos por turma em cada semestre.
- C) Quem pode SELECT, INSERT, UPDATE e DELETE em cada tabela, visão e procedimento.
- D) O tamanho em disco de cada tabela do banco.

**Gabarito:** C

---

## ITEM 24 — README

- **Capacidade:** C1

**Comando:**  
Qual informação o README do projeto precisa ter?

**Alternativas:**
- A) A senha do postgres e do app_escola, para facilitar a instalação.
- B) A versão do PostgreSQL, como criar o banco, o comando do script mestre, os logins necessários e como testar.
- C) Somente o nome do projeto e a data da entrega.
- D) A lista de todos os alunos cadastrados nos dados de teste com CPF.

**Gabarito:** B

---

## ITEM 25 — Registro de Decisões

- **Capacidade:** C1

**Comando:**  
O registro de decisões do projeto deve ter:

**Alternativas:**
- A) As consultas mais lentas e o tempo de cada uma.
- B) A decisão, o motivo ligado ao requisito e a alternativa descartada.
- C) Só a decisão, sem o motivo, para o texto ficar curto.
- D) O nome de quem errou em cada parte do projeto.

**Gabarito:** B

---

## ITEM 26 — Cancelar em Vez de Apagar

- **Capacidade:** C1

**Comando:**  
Qual justificativa sustenta a decisão "matrícula é cancelada, não apagada"?

**Alternativas:**
- A) Deixar o banco menor e mais rápido.
- B) Permitir que qualquer usuário apague matrículas.
- C) Evitar que o aluno veja a própria matrícula.
- D) Guardar o histórico e as parcelas, protegendo a integridade.

**Gabarito:** D

---

## ITEM 27 — Checklist do DER

- **Capacidade:** C2

**Comando:**  
Na revisão do modelo, o que se confere entre o DER e o banco?

**Alternativas:**
- A) Que o DER foi desenhado antes da aula 5.
- B) Que as cores do DER combinam com o pgAdmin.
- C) Que o DER tem mais entidades do que o banco tem tabelas.
- D) Que toda entidade virou tabela e toda tabela aparece no DER.

**Gabarito:** D

---

## ITEM 28 — Relacionamento N:N

- **Capacidade:** C2

**Comando:**  
Na revisão do modelo, um relacionamento N:N entre aluno e turma deve aparecer no banco como:

**Alternativas:**
- A) A tabela associativa matricula, com as chaves estrangeiras das duas tabelas.
- B) Uma coluna com a lista de alunos dentro da tabela turma.
- C) Duas tabelas iguais, uma para cada lado.
- D) Uma coluna com a lista de turmas dentro da tabela aluno.

**Gabarito:** A

---

## ITEM 29 — Chave Estrangeira no 1:N

- **Capacidade:** C2

**Comando:**  
No relacionamento 1:N entre curso e turma, a chave estrangeira fica:

**Alternativas:**
- A) Na tabela turma (lado N), com o id_curso.
- B) Nas duas tabelas, uma apontando para a outra.
- C) Na tabela curso (lado 1), com o id_turma.
- D) Em nenhuma das duas, só no DER.

**Gabarito:** A

---

## ITEM 30 — Primeira Forma Normal

- **Capacidade:** C3

**Comando:**  
Qual situação fere a 1FN e deve ser corrigida na revisão?

**Alternativas:**
- A) Uma tabela curso com a coluna valor_mensal.
- B) Uma coluna email do tipo varchar(120).
- C) Uma tabela parcela com chave primária composta.
- D) Uma coluna telefone com "4799990000;4798880000".

**Gabarito:** D

---

## ITEM 31 — Terceira Forma Normal

- **Capacidade:** C3

**Comando:**  
Repetir o nome do curso na tabela turma, além do id_curso, fere qual forma normal?

**Alternativas:**
- A) Nenhuma, porque repetir dados sempre deixa o banco mais seguro.
- B) A 1FN, porque o nome do curso tem mais de uma palavra.
- C) A 2FN, porque turma tem chave primária simples.
- D) A 3FN, porque o nome depende do curso e não da chave da turma.

**Gabarito:** D

---

## ITEM 32 — Padrão de Nomes

- **Capacidade:** C3

**Comando:**  
Qual nome de coluna segue o padrão adotado na UC (aula 11)?

**Alternativas:**
- A) id_matricula
- B) IdMatrícula
- C) ID-MATRICULA
- D) matriculaId

**Gabarito:** A

---

## ITEM 33 — Consulta de Parcelas Vencidas

- **Capacidade:** C8

**Comando:**  
Qual condição lista as parcelas vencidas e não pagas?

**Alternativas:**
- A) WHERE data_pagamento = current_date
- B) WHERE vencimento < current_date AND data_pagamento IS NULL
- C) WHERE valor IS NULL ORDER BY vencimento
- D) WHERE vencimento > current_date OR data_pagamento IS NOT NULL

**Gabarito:** B

---

## ITEM 34 — Turmas sem Matrícula

- **Capacidade:** C8

**Comando:**  
Qual recurso encontra as turmas que não têm nenhuma matrícula?

**Alternativas:**
- A) GROUP BY turma com HAVING COUNT(*) > 0.
- B) LEFT JOIN de turma com matricula e a condição m.id_matricula IS NULL.
- C) ORDER BY codigo DESC LIMIT 1.
- D) INNER JOIN de turma com matricula e a condição m.id_matricula IS NOT NULL.

**Gabarito:** B

---

## ITEM 35 — Turmas Cheias

- **Capacidade:** C8

**Comando:**  
Para listar só as turmas com mais de 20 matrículas, depois do GROUP BY usa-se:

**Alternativas:**
- A) HAVING COUNT(*) > 20
- B) LIMIT 20
- C) ORDER BY COUNT(*) > 20
- D) WHERE COUNT(*) > 20

**Gabarito:** A

---

## ITEM 36 — Consulta sem Uso

- **Capacidade:** C8

**Comando:**  
Na revisão do script 04, uma consulta que nenhuma tela ou relatório do back-end usa deve:

**Alternativas:**
- A) Ser executada pelo back-end toda vez que o sistema abre.
- B) Ser copiada para todos os outros scripts do projeto.
- C) Ficar no script e ganhar mais junções para parecer completa.
- D) Sair do script, porque cada consulta precisa ter um uso no sistema.

**Gabarito:** D

---

## ITEM 37 — Contrato com o Back-End

- **Capacidade:** C14

**Comando:**  
O que é o contrato entre o banco e o back-end?

**Alternativas:**
- A) O arquivo de backup que o back-end restaura todo dia.
- B) O documento que o cliente assina para pagar o projeto.
- C) A lista do que a aplicação pode chamar no banco e com quais permissões.
- D) A senha do postgres entregue ao programador do back-end.

**Gabarito:** C

---

## ITEM 38 — Login do Back-End

- **Capacidade:** C14

**Comando:**  
Com qual login o back-end deve se conectar ao banco?

**Alternativas:**
- A) postgres, para nunca receber erro de permissão.
- B) ana_secretaria, porque a secretaria usa o sistema.
- C) Um login compartilhado por todos os programadores.
- D) app_escola, com só as permissões que a aplicação usa.

**Gabarito:** D

---

## ITEM 39 — EXECUTE no Procedimento

- **Capacidade:** C14

**Comando:**  
Qual comando deixa o back-end chamar o procedimento de matrícula?

**Alternativas:**
- A) CALL matricular TO app_escola;
- B) GRANT ALL ON DATABASE escola_db TO app_escola;
- C) GRANT EXECUTE ON PROCEDURE matricular(integer, integer) TO app_escola;
- D) GRANT SELECT ON matricula TO app_escola WITH GRANT OPTION;

**Gabarito:** C

---

## ITEM 40 — Sem DELETE para a Aplicação

- **Capacidade:** C14

**Comando:**  
Por que o app_escola não recebe DELETE na tabela matricula?

**Alternativas:**
- A) Porque o DELETE só funciona no pgAdmin, não no back-end.
- B) Porque a matrícula é cancelada (situacao = 'cancelada'), e o menor privilégio não dá o que não é usado.
- C) Porque o PostgreSQL não permite DELETE em tabelas com chave estrangeira.
- D) Porque o back-end apaga as matrículas pelo backup.

**Gabarito:** B

---

## ITEM 41 — Consultas com Parâmetros

- **Capacidade:** C14

**Comando:**  
Por que o back-end deve usar consultas com parâmetros ($1, $2) em vez de colar o texto digitado no SQL?

**Alternativas:**
- A) Para o banco aceitar nomes com acento.
- B) Para dispensar o GRANT nas tabelas.
- C) Para evitar SQL injection, porque o texto do usuário nunca vira comando.
- D) Para a consulta ficar mais curta no código do back-end.

**Gabarito:** C

---

## ITEM 42 — Regra no Banco

- **Capacidade:** C1

**Comando:**  
Por que as regras importantes ficam no banco (chave, CHECK, procedimento, trigger), e não só no back-end?

**Alternativas:**
- A) Porque regra no banco dispensa o teste de ponta a ponta.
- B) Porque o PostgreSQL apaga as regras que ficam no back-end.
- C) Porque, mesmo que o back-end tenha um erro, o banco não aceita dado errado.
- D) Porque o back-end não consegue ler regras escritas em SQL.

**Gabarito:** C

---

## ITEM 43 — Senha do app_escola

- **Capacidade:** C14

**Comando:**  
Onde deve ficar a senha do app_escola usada pelo back-end?

**Alternativas:**
- A) No README do projeto, para quem for instalar.
- B) No código JavaScript da página de login.
- C) Numa variável de ambiente do servidor, fora do Git e do JavaScript do site.
- D) No comentário do script 07-seguranca.sql.

**Gabarito:** C

---

## ITEM 44 — Teste de Ponta a Ponta

- **Capacidade:** C8

**Comando:**  
No teste de ponta a ponta, repetir CALL matricular(1, 2) deve resultar em:

**Alternativas:**
- A) Criação de uma turma nova com o mesmo código.
- B) Erro do UNIQUE (id_aluno, id_turma), mostrando que a regra funciona.
- C) Exclusão da primeira matrícula, sem aviso.
- D) Uma segunda matrícula igual, mostrando que o banco aceita tudo.

**Gabarito:** B

---

## ITEM 45 — Conferindo os Objetos

- **Capacidade:** C7

**Comando:**  
Qual sequência do psql confere tabelas, visões, funções e procedimentos e papéis depois da instalação?

**Alternativas:**
- A) \set, \unset, \timing e \x
- B) \q, \c, \i e \echo
- C) \dt, \dv, \df e \du
- D) SELECT, INSERT, UPDATE e DELETE

**Gabarito:** C

---

## ITEM 46 — Teste do Financeiro

- **Capacidade:** C14

**Comando:**  
No teste final, o login do financeiro executa SELECT cpf FROM aluno. O resultado esperado é:

**Alternativas:**
- A) O CPF só dos alunos com parcela vencida.
- B) permission denied, mostrando que a matriz de acesso foi respeitada.
- C) Uma tabela vazia, porque os dados de teste não têm CPF.
- D) A lista de CPFs, porque o financeiro precisa cobrar.

**Gabarito:** B

---

## ITEM 47 — Backup de Entrega

- **Capacidade:** C14

**Comando:**  
Qual comando gera o arquivo de backup de entrega do banco no formato personalizado?

**Alternativas:**
- A) pg_restore -d escola_teste escola.dump
- B) createdb escola.dump
- C) pg_dump -U postgres -d escola_teste -F c -f escola.dump
- D) psql -f escola.dump escola_teste

**Gabarito:** C

---

## ITEM 48 — Provar o Backup

- **Capacidade:** C14

**Comando:**  
Como a equipe prova que o backup de entrega funciona?

**Alternativas:**
- A) Fazendo um segundo pg_dump logo depois do primeiro.
- B) Abrindo o escola.dump no bloco de notas.
- C) Restaurando o escola.dump com pg_restore num banco novo e conferindo os dados.
- D) Conferindo se o arquivo escola.dump tem mais de 1 MB.

**Gabarito:** C

---

## ITEM 49 — Sugestão na Revisão em Pares

- **Capacidade:** C1

**Comando:**  
Qual sugestão segue o formato "o quê, onde, efeito" da revisão cruzada?

**Alternativas:**
- A) "Quem fez essa parte não sabe SQL."
- B) "O script de vocês está ruim, refaçam tudo."
- C) "O 06-triggers.sql cria o trigger antes da função, e a instalação para com erro no passo 6."
- D) "Não gostei, mas não sei explicar o motivo."

**Gabarito:** C

---

## ITEM 50 — Receber a Sugestão

- **Capacidade:** C1

**Comando:**  
Ao receber uma sugestão do colega na revisão cruzada, a equipe deve:

**Alternativas:**
- A) Anotar no registro, decidir se aceita e responder com o motivo.
- B) Apagar a parte do projeto que recebeu a crítica.
- C) Ignorar a sugestão, porque o projeto já foi testado.
- D) Pedir ao professor para não considerar a revisão.

**Gabarito:** A
