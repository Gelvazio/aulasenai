# Atividade: Avaliação Prática — 20 Questões Discursivas

- **Aula:** AV-PR
- **Rótulo da aula:** Avaliação Prática
- **Tema:** Aulas 01 a 20 — banco completo de um caso fornecido
- **Ícone:** ✍️
- **Duração:** 150–180 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 20
- **Pontuação:** 0,5 ponto por questão, dividido em 3 tópicos (0,1 + 0,2 + 0,2) — total: 10 pontos
- **Pontos por questão:** 0,5
- **Página:** AVALIACAO-PRATICA.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Construir, por escrito e do pedido do cliente até a entrega, o banco completo de um caso fornecido (aulas 01 a 20, capacidades C1 a C14): requisitos e escopo, SGBD, níveis e configuração, DER com entidades, atributos e cardinalidades, normalização até a 3FN e padronização, DDL com chaves e restrições, DML, 10 consultas (filtros, ordenação, junções, agrupamentos e subconsultas), 1 procedimento armazenado, 1 trigger, segurança com permissões (papéis, GRANT/REVOKE e menor privilégio), backup e documentação de entrega.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (AVALIACAO-PRATICA-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 20

**Caso fornecido em todas as questões:** a Biblioteca Comunitária Ler Mais (fictícia) vai trocar o caderno de empréstimos por um sistema web. O back-end usará o banco **biblioteca_db** no PostgreSQL, que é construído do pedido até a entrega ao longo das 20 questões. Os requisitos do escopo são:

- R1 — Cadastrar leitores com nome, CPF (único), e-mail (único), data de cadastro, situação ativo/inativo e um ou mais telefones.
- R2 — Cadastrar livros com título, ISBN (único, 13 dígitos), ano de publicação, uma editora (nome e cidade), uma categoria e um ou mais autores.
- R3 — Cada livro tem um ou mais exemplares físicos, com código de tombo único e situação: disponível, emprestado ou baixado.
- R4 — Registrar empréstimos: um leitor leva um exemplar, com data do empréstimo, data prevista de devolução (14 dias depois) e data da devolução; um exemplar só pode estar em um empréstimo em aberto.
- R5 — Um leitor só pega livro se estiver ativo, não tiver empréstimo atrasado e tiver menos de 3 empréstimos em aberto.
- R6 — Na devolução com atraso, gravar multa de R$ 1,00 por dia de atraso.
- R7 — Toda mudança de situação de um exemplar fica registrada com a situação anterior, a nova, o usuário e a data e hora.
- R8 — Perfis de acesso: o balcão registra empréstimos e devoluções e não vê o CPF; a coordenação só consulta relatórios; a aplicação web usa um usuário próprio só com o necessário; só o responsável técnico (DBA) cria ou altera tabelas.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o trecho pedido; **(2)** o código ou a aplicação no caso da biblioteca; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Use os nomes de tabelas e colunas que você definiu nas questões anteriores (nomes equivalentes valem). Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: modelo rastreável aos requisitos R1 a R8, comandos que funcionam no PostgreSQL e no psql e justificativa com as palavras-chave do conteúdo. Comandos e textos equivalentes que produzam o mesmo resultado valem.

## Cobertura

| Item da ementa (avaliação prática) · aulas | Questões |
|---|---|
| Requisitos, escopo e rastreabilidade (aula 05) | 01 |
| SGBD, níveis de gerenciamento, instalação e configuração (aulas 01 a 04) | 02 |
| DER: entidades fortes, fracas e associativas (aula 06) | 03 |
| DER: atributos (aula 07) | 04 |
| DER: relacionamentos e cardinalidades (aula 08) | 05 |
| DER e dicionário de dados (aula 09) | 06 |
| Normalização até a 3FN (aula 10) | 07 |
| Padronização e fluxograma (aula 11) | 08 |
| DDL: tabelas e tipos (aula 12) | 09 |
| DDL: chaves primária e estrangeira e restrições (aula 13) | 10 |
| DML: inserção, atualização e exclusão (aula 14) | 11 |
| Consultas 1 a 3: filtros e ordenação (aula 15) | 12 |
| Consultas 4 e 5: junções (aula 16) | 13 |
| Consultas 6 e 7: agrupamento com GROUP BY e HAVING (aula 16) | 14 |
| Consultas 8 a 10: subconsultas (aula 16) | 15 |
| 1 procedimento armazenado (aula 17) | 16 |
| 1 trigger (aula 18) | 17 |
| Segurança: pilares, níveis hierárquicos e LGPD (aula 19) | 18 |
| Permissões: papéis, GRANT/REVOKE e menor privilégio (aula 19) | 19 |
| Script mestre, backup e documentação de entrega (aula 20) | 20 |

---

## ITEM 01 — Requisitos e Escopo do Caso

- **Aula:** 05 · Demandas do Cliente e Escopo do Projeto
- **Capacidade:** C1

**Contexto:**
A coordenação da biblioteca aprovou os requisitos R1 a R8. Na reunião seguinte, a diretora pede para incluir também "reserva de livros pelo celular e aviso por SMS quando o livro voltar", sem mudar o prazo de entrega do banco.

**Comando:**
Organize os requisitos do caso e trate o novo pedido.

**Tópicos:**
- a) Explique a diferença entre requisito de dados e regra de negócio, com um exemplo de cada tirado de R1 a R8. (0,1)
- b) Diga como cada um dos requisitos R4, R5, R7 e R8 será atendido no banco (tabela ou coluna, restrição, procedimento, trigger ou permissão). (0,2)
- c) Explique como a equipe deve tratar o pedido de reserva e SMS e o que precisa ser registrado no documento de escopo. (0,2)

---

## ITEM 02 — SGBD, Níveis e Configuração

- **Aula:** 01 a 04 · Banco de Dados e SGBD; Gerenciadores, Características, Requisitos e Níveis; Instalação do PostgreSQL; Configuração do SGBD e Infraestrutura
- **Capacidade:** C4, C5, C6, C9, C10, C11

**Contexto:**
Hoje os empréstimos ficam num caderno e numa planilha compartilhada. O sistema web vai rodar num servidor de aplicação (10.0.0.20) e o PostgreSQL já está instalado em outro servidor da biblioteca, na porta padrão.

**Comando:**
Justifique o SGBD e prepare o banco e o acesso da aplicação.

**Tópicos:**
- a) Explique por que um SGBD relacional como o PostgreSQL atende melhor a este caso do que a planilha compartilhada. (0,1)
- b) Escreva os comandos que criam o banco biblioteca_db, o usuário app_biblioteca da aplicação com permissão de conexão, a linha do pg_hba.conf que libera só o servidor de aplicação com senha e o comando que recarrega a configuração. (0,2)
- c) Explique os três níveis de gerenciamento de dados (externo, conceitual e físico) com um exemplo de cada no banco da biblioteca. (0,2)

---

## ITEM 03 — Entidades do Caso

- **Aula:** 06 · Entidades Fortes, Fracas e Associativas
- **Capacidade:** C2

**Contexto:**
Ao ler R1 a R7, um colega propõe guardar tudo numa única entidade LIVRO, com as colunas "quantidade_disponivel", "leitor_que_pegou" e "data_devolucao".

**Comando:**
Identifique as entidades do caso.

**Tópicos:**
- a) Explique o que são entidade forte, entidade fraca e entidade associativa. (0,1)
- b) Liste as entidades do caso e classifique cada uma em forte, fraca ou associativa. (0,2)
- c) Explique por que EXEMPLAR precisa ser uma entidade separada de LIVRO e por que a proposta do colega não atende a R3, R4 e R7. (0,2)

---

## ITEM 04 — Atributos

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
A equipe vai detalhar os atributos de LEITOR e de EMPRÉSTIMO. Na tela do balcão aparecem também "dias de atraso" e "valor da multa".

**Comando:**
Classifique e decida os atributos.

**Tópicos:**
- a) Explique o que são atributo simples, composto, multivalorado, derivado e identificador. (0,1)
- b) Liste os atributos de LEITOR e classifique cada um, dizendo qual é o identificador e qual é a chave candidata. (0,2)
- c) Diga como o atributo multivalorado telefones vira estrutura no banco e explique por que "dias de atraso" não é gravado, mas o valor da multa é. (0,2)

---

## ITEM 05 — Relacionamentos e Cardinalidades

- **Aula:** 08 · Relacionamentos 1:1, 1:N e N:N
- **Capacidade:** C2

**Contexto:**
Com as entidades definidas, falta dizer como elas se ligam. Um livro pode ter vários autores e um autor escreve vários livros; um leitor faz vários empréstimos ao longo do tempo.

**Comando:**
Defina os relacionamentos com cardinalidade.

**Tópicos:**
- a) Explique o que significam as cardinalidades 1:1, 1:N e N:N. (0,1)
- b) Escreva a cardinalidade de: editora–livro, categoria–livro, livro–autor, livro–exemplar, leitor–telefone e leitor–empréstimo. (0,2)
- c) Explique como os relacionamentos N:N livro–autor e leitor–exemplar são resolvidos em tabelas, dizendo as chaves de cada tabela criada. (0,2)

---

## ITEM 06 — DER e Dicionário de Dados

- **Aula:** 09 · Diagrama Entidade-Relacionamento
- **Capacidade:** C2

**Contexto:**
A equipe do back-end precisa do DER lógico e do dicionário de dados antes de escrever as telas. O DER pode ser descrito em texto, uma tabela por linha.

**Comando:**
Documente o modelo lógico.

**Tópicos:**
- a) Explique o que representam no DER: o retângulo, o losango (ou a linha de ligação), o atributo sublinhado e a marcação de cardinalidade. (0,1)
- b) Descreva em texto o DER lógico do caso: cada tabela com a chave primária, as chaves estrangeiras e as ligações com cardinalidade. (0,2)
- c) Escreva o dicionário de dados da tabela emprestimo (coluna, tipo, obrigatório e restrição ou descrição). (0,2)

---

## ITEM 07 — Normalização até a 3FN

- **Aula:** 10 · Normalização de Dados: 1FN, 2FN e 3FN
- **Capacidade:** C3

**Contexto:**
A planilha antiga tem uma linha por empréstimo com as colunas: num_emprestimo, cpf_leitor, nome_leitor, telefones_leitor, isbn, titulo, autores, editora, cidade_editora, tombo, data_emprestimo, data_prevista. Exemplo de linha (fictícia): 1001 | 01234567890 | Marina Souza | 47999990001, 47999990002 | 9788500000011 | Contos do Vale | Ana Prado, Rui Lima | Editora Aurora | Blumenau | T-0001 | 2026-03-02 | 2026-03-16.

**Comando:**
Normalize a planilha até a 3FN.

**Tópicos:**
- a) Explique a regra de cada forma normal: 1FN, 2FN e 3FN. (0,1)
- b) Aponte o que viola a 1FN na planilha e a dependência parcial (2FN) que aparece quando cada autor vira uma linha com chave (num_emprestimo, autor). (0,2)
- c) Aponte as dependências transitivas (3FN) e escreva as tabelas finais normalizadas, com as chaves. (0,2)

---

## ITEM 08 — Padronização e Fluxograma

- **Aula:** 11 · Padronização de Dados, Cronograma e Fluxograma
- **Capacidade:** C3

**Contexto:**
O rascunho de um colega tem os nomes "Leitores", "DataEmp", "dt prev", "Situação", "tel1" e "tel2", "valorMulta" e "user", e na coluna de situação aparecem os valores "Disponível", "DISP" e "disponivel".

**Comando:**
Padronize o modelo e desenhe o processo do empréstimo.

**Tópicos:**
- a) Explique por que padronizar nomes, tipos e domínios antes de escrever o DDL. (0,1)
- b) Reescreva os nomes do rascunho no padrão adotado na UC e diga como garantir no banco os valores da situação do exemplar. (0,2)
- c) Descreva o fluxograma do empréstimo no balcão (início, decisões de R5, ações e fim), dizendo em cada passo a tabela consultada ou alterada. (0,2)

---

## ITEM 09 — DDL: Tabelas e Tipos

- **Aula:** 12 · DDL: Tabelas e Campos
- **Capacidade:** C7

**Contexto:**
O banco biblioteca_db está criado e vazio. A equipe começa o script 01-ddl-biblioteca.sql pelas tabelas que não dependem de outras.

**Comando:**
Crie as primeiras tabelas.

**Tópicos:**
- a) Explique a escolha dos tipos serial, varchar, char, date, boolean e numeric no caso da biblioteca. (0,1)
- b) Escreva o CREATE TABLE de editora, categoria e autor, com chave primária e colunas obrigatórias. (0,2)
- c) Escreva o CREATE TABLE de leitor e de telefone_leitor (R1) e justifique por que o CPF é texto de 11 caracteres e não número. (0,2)

---

## ITEM 10 — DDL: Chaves e Restrições

- **Aula:** 13 · DDL: Relações, Chaves e Restrições
- **Capacidade:** C7

**Contexto:**
Faltam as tabelas que dependem das primeiras. As regras R2, R3 e R4 devem ser garantidas pelo próprio banco, mesmo que o back-end erre.

**Comando:**
Crie as tabelas com chaves e restrições.

**Tópicos:**
- a) Explique a função de PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL e CHECK. (0,1)
- b) Escreva o CREATE TABLE de livro, livro_autor e exemplar com chaves primárias, chaves estrangeiras, UNIQUE do ISBN e do tombo e CHECK da situação. (0,2)
- c) Escreva o CREATE TABLE de emprestimo com as restrições de datas e de multa e o índice que impede dois empréstimos em aberto do mesmo exemplar (R4), e explique o efeito de ON DELETE RESTRICT nas chaves estrangeiras. (0,2)

---

## ITEM 11 — DML: Inserção, Atualização e Exclusão

- **Aula:** 14 · DML: Inserção, Atualização e Exclusão
- **Capacidade:** C8

**Contexto:**
O banco precisa de dados de teste para as consultas. Depois, um leitor devolve com 5 dias de atraso o exemplar do empréstimo 1, e a secretaria pede para "apagar" um leitor que se mudou de cidade, mas que tem empréstimos no histórico.

**Comando:**
Escreva os comandos de manipulação de dados.

**Tópicos:**
- a) Explique a diferença entre INSERT, UPDATE e o comando de exclusão e por que, neste caso, o leitor que se mudou é inativado em vez de excluído. (0,1)
- b) Escreva os INSERT de uma editora, uma categoria, um autor, um livro com o seu autor, dois exemplares e um leitor com telefone. (0,2)
- c) Escreva, numa transação, a devolução do empréstimo 1 com a multa de R6 e o exemplar de volta a disponível, e o UPDATE que inativa o leitor. (0,2)

---

## ITEM 12 — Consultas 1 a 3: Filtros e Ordenação

- **Aula:** 15 · DML: Consultas com Filtros e Ordenação
- **Capacidade:** C8

**Contexto:**
O back-end precisa das três primeiras consultas do sistema: o catálogo por período, a busca de leitor no balcão e a lista de cobrança de atrasos.

**Comando:**
Escreva as consultas 1 a 3.

**Tópicos:**
- a) Explique a função de WHERE, ORDER BY, BETWEEN, ILIKE e IS NULL. (0,1)
- b) Escreva a consulta 1 (livros publicados entre 2000 e 2020, do mais novo para o mais antigo e, no mesmo ano, por título) e a consulta 2 (leitores ativos cujo nome começa com "mar", sem diferença de maiúsculas, em ordem alfabética, só nome e e-mail). (0,2)
- c) Escreva a consulta 3: empréstimos em aberto e atrasados, com os dias de atraso calculados, do mais atrasado para o menos atrasado, e explique por que se usa IS NULL e não "= NULL". (0,2)

---

## ITEM 13 — Consultas 4 e 5: Junções

- **Aula:** 16 · Consultas com Junções, Agrupamentos e Subconsultas
- **Capacidade:** C8

**Contexto:**
O balcão quer ver os empréstimos em aberto com nomes, e não com números. A coordenação quer saber quais livros do catálogo ainda não têm nenhum exemplar físico.

**Comando:**
Escreva as consultas 4 e 5.

**Tópicos:**
- a) Explique a diferença entre INNER JOIN e LEFT JOIN. (0,1)
- b) Escreva a consulta 4: empréstimos em aberto com o nome do leitor, o título do livro, o código de tombo e a data prevista, ordenados pela data prevista. (0,2)
- c) Escreva a consulta 5: livros sem nenhum exemplar, e explique por que ela precisa de LEFT JOIN e não de INNER JOIN. (0,2)

---

## ITEM 14 — Consultas 6 e 7: Agrupamentos

- **Aula:** 16 · Consultas com Junções, Agrupamentos e Subconsultas
- **Capacidade:** C8

**Contexto:**
O relatório mensal da coordenação mostra quantos empréstimos cada categoria teve e quais leitores mais usam a biblioteca no ano.

**Comando:**
Escreva as consultas 6 e 7.

**Tópicos:**
- a) Explique a função de GROUP BY e a diferença entre WHERE e HAVING. (0,1)
- b) Escreva a consulta 6: total de empréstimos por categoria, da categoria mais emprestada para a menos emprestada. (0,2)
- c) Escreva a consulta 7: leitores com mais de 2 empréstimos em 2026, com a quantidade e a soma das multas, e explique por que o filtro do ano fica no WHERE e o "mais de 2" no HAVING. (0,2)

---

## ITEM 15 — Consultas 8 a 10: Subconsultas

- **Aula:** 16 · Consultas com Junções, Agrupamentos e Subconsultas
- **Capacidade:** C8

**Contexto:**
Para planejar compras e campanhas, a coordenação pede: os livros que nunca foram emprestados, os empréstimos com multa acima da média e o título mais emprestado de todos.

**Comando:**
Escreva as consultas 8 a 10.

**Tópicos:**
- a) Explique o que é uma subconsulta e a diferença de uso entre IN e EXISTS. (0,1)
- b) Escreva a consulta 8 (livros que nunca foram emprestados, com NOT EXISTS) e a consulta 9 (empréstimos cuja multa é maior que a média das multas cobradas, só multas acima de zero). (0,2)
- c) Escreva a consulta 10: o título ou os títulos mais emprestados, com a quantidade, usando subconsulta, e explique por que ela é mais segura que ORDER BY ... LIMIT 1. (0,2)

---

## ITEM 16 — Procedimento Armazenado

- **Aula:** 17 · Procedimentos Armazenados
- **Capacidade:** C7, C8

**Contexto:**
Dois atendentes do balcão podem tentar emprestar o mesmo exemplar ao mesmo tempo, e o back-end não deve repetir as regras de R5 em cada tela. A regra de empréstimo vai ficar dentro do banco.

**Comando:**
Crie o procedimento que faz o empréstimo.

**Tópicos:**
- a) Explique a diferença entre função e procedimento no PostgreSQL e por que o empréstimo é um procedimento. (0,1)
- b) Escreva o procedimento emprestar(p_id_leitor, p_id_exemplar) em PL/pgSQL que confere o exemplar disponível e as regras de R5, grava o empréstimo com a data prevista de 14 dias e muda o exemplar para emprestado. (0,2)
- c) Escreva duas chamadas de teste com o resultado esperado (uma que funciona e uma barrada pelo limite de 3) e explique o papel do FOR UPDATE quando dois atendentes emprestam o mesmo exemplar. (0,2)

---

## ITEM 17 — Trigger

- **Aula:** 18 · Triggers (Disparadores)
- **Capacidade:** C7, C8

**Contexto:**
O requisito R7 exige o histórico de toda mudança de situação do exemplar, venha ela do procedimento, da devolução ou de um UPDATE feito por alguém da equipe técnica.

**Comando:**
Crie o trigger do histórico do exemplar.

**Tópicos:**
- a) Explique o que é um trigger e o que são AFTER, FOR EACH ROW, OLD e NEW. (0,1)
- b) Escreva a tabela historico_exemplar, a função do trigger e o CREATE TRIGGER que grava a situação anterior, a nova, o usuário e a data e hora só quando a situação muda. (0,2)
- c) Escreva um teste que mostra o trigger funcionando, com o resultado esperado, e explique por que o histórico fica num trigger e não no código do back-end. (0,2)

---

## ITEM 18 — Segurança: Pilares, Níveis e LGPD

- **Aula:** 19 · Segurança da Informação: Pilares, Acesso e Auditoria
- **Capacidade:** C12, C13

**Contexto:**
A biblioteca guarda CPF, e-mail e telefone de leitores, inclusive de adolescentes. A coordenação pergunta quem pode ver o quê e o que protege os dados se um disco queimar ou alguém alterar um empréstimo sem autorização.

**Comando:**
Analise a segurança do banco.

**Tópicos:**
- a) Explique os três pilares da segurança da informação com um risco de cada no caso da biblioteca. (0,1)
- b) Classifique os dados da biblioteca nos níveis pública, interna, restrita e confidencial e diga quem acessa cada nível, do DBA ao somente leitura. (0,2)
- c) Diga qual pilar cada medida protege: o histórico do exemplar (R7), o backup diário testado e a permissão por coluna que esconde o CPF, e explique o cuidado com o CPF segundo a LGPD. (0,2)

---

## ITEM 19 — Permissões: Papéis, GRANT e REVOKE

- **Aula:** 19 · Segurança da Informação: Pilares, Acesso e Auditoria
- **Capacidade:** C14

**Contexto:**
O requisito R8 define os perfis: balcão (atendente Lucas), coordenação (Helena) e a aplicação web (app_biblioteca). Nenhum deles cria ou altera tabelas.

**Comando:**
Escreva o script de segurança 07-seguranca.sql.

**Tópicos:**
- a) Explique o princípio do menor privilégio e a diferença entre papel de grupo (NOLOGIN) e papel de login. (0,1)
- b) Escreva os comandos que tiram o acesso de PUBLIC, criam o grupo do balcão e o login do Lucas e dão ao grupo só o necessário para R8, sem acesso ao CPF e com permissão para executar o procedimento emprestar. (0,2)
- c) Escreva os comandos da coordenação (só leitura por uma visão de relatório) e um teste que prova que o balcão não vê o CPF, com o resultado esperado. (0,2)

---

## ITEM 20 — Script Mestre, Backup e Documentação

- **Aula:** 20 · Projeto Integrador: Banco Documentado para o Back-End
- **Capacidade:** C1, C14

**Contexto:**
O banco será entregue à equipe do back-end com os scripts 01-ddl-biblioteca.sql, 02-dados-teste.sql, 03-consultas.sql, 04-procedimentos.sql, 05-triggers.sql e 06-visoes.sql, além do 07-seguranca.sql, e um backup que comprove que tudo funciona.

**Comando:**
Prepare a entrega do banco.

**Tópicos:**
- a) Cite os documentos que acompanham a entrega do banco e para que serve cada um. (0,1)
- b) Escreva o script mestre 00-instalar.sql que roda os scripts na ordem e para no primeiro erro, e os comandos que o executam num banco de teste limpo. (0,2)
- c) Escreva o comando do backup de entrega, os comandos que provam que ele restaura, e explique por que essa prova é necessária. (0,2)
