# Atividade: Atividade Prática — Aula 01 — 10 Questões Discursivas

- **Aula:** AP-01
- **Rótulo da aula:** Atividade Prática — Aula 01
- **Tema:** Banco de Dados e SGBD: Conceitos e Usos
- **Ícone:** 🗄️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-01.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de sistemas web, os conteúdos da aula 01 (CONTEUDO/AULA-01-BANCO-DE-DADOS-E-SGBD.md): dado × informação, banco de dados, SGBD e suas funcionalidades, planilha × banco, redundância e inconsistência, arquitetura web com banco, bancos relacionais e não relacionais, tabela, linha e coluna e gestão do tempo na UC.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-01-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 1

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para analisar como sistemas web (loja virtual, escola, app de entregas e app de banco) guardam e usam os seus dados e orientar a equipe de desenvolvimento.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito ou a classificação pedida; **(2)** o exemplo ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Exemplos diferentes dos do padrão valem, desde que estejam corretos. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 01 | Questões |
|---|---|
| Dado × informação; banco de dados | 01 |
| SGBD e suas funcionalidades | 02, 03 |
| Planilha × banco de dados | 04 |
| Redundância e inconsistência | 05 |
| Arquitetura web (front-end, back-end e banco) | 06, 07 |
| Relacional × não relacional; gerenciadores | 08 |
| Tabela, linha, coluna e identificador | 09 |
| Gestão do tempo na UC (1.1) | 10 |

---

## ITEM 01 — Dado, Informação e Banco de Dados

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, recebe da secretaria de uma escola de cursos livres esta anotação: "Ana · 17 · 2026-10-09 · Programação". A coordenadora pergunta se isso já é informação e o que seria um banco de dados para a escola.

**Comando:**
Explique os conceitos a partir da anotação.

**Tópicos:**
- a) Diga se a anotação é dado ou informação e justifique em uma frase. (0,2)
- b) Reescreva a anotação como informação, dando contexto aos dados. (0,4)
- c) Explique o que seria o banco de dados da escola e cite três "coisas" que ele precisa guardar. (0,4)

---

## ITEM 02 — O Papel do SGBD

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, ouve um desenvolvedor iniciante dizer: "Vou fazer o site da loja gravar os pedidos direto num arquivo de texto no servidor. SGBD é coisa desnecessária".

**Comando:**
Oriente o desenvolvedor sobre o SGBD.

**Tópicos:**
- a) Explique, em uma frase, o que é um SGBD. (0,2)
- b) Explique como o sistema web deve chegar aos dados quando existe um SGBD. (0,4)
- c) Cite dois problemas que a loja teria gravando os pedidos num arquivo de texto e justifique cada um. (0,4)

---

## ITEM 03 — Funcionalidades do SGBD em Situações Reais

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, analisa três situações de um app de banco digital: (1) duas transferências da mesma conta acontecem no mesmo segundo; (2) o atendente consegue ver o saldo, mas não consegue alterá-lo; (3) depois de uma pane, o banco volta ao último estado seguro.

**Comando:**
Relacione cada situação a uma funcionalidade do SGBD.

**Tópicos:**
- a) Nomeie a funcionalidade do SGBD de cada uma das três situações. (0,2)
- b) Explique o que poderia acontecer com o saldo se a funcionalidade da situação 1 não existisse. (0,4)
- c) Cite outra funcionalidade do SGBD que não aparece nas situações e dê um exemplo dela no app de banco. (0,4)

---

## ITEM 04 — Planilha ou Banco de Dados

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, visita uma loja que controla 8 mil pedidos numa planilha compartilhada. Cinco vendedores editam a planilha ao mesmo tempo e, às vezes, a venda de um some depois que outro salva.

**Comando:**
Analise a troca da planilha por um banco de dados.

**Tópicos:**
- a) Diga qual problema da planilha explica o sumiço das vendas. (0,2)
- b) Compare planilha e banco de dados em dois aspectos (por exemplo: volume de registros, regras, permissões) aplicados à loja. (0,4)
- c) Diga em que situação uma planilha ainda é adequada e justifique. (0,4)

---

## ITEM 05 — Redundância e Inconsistência

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, encontra na loja uma tabela de pedidos em que cada linha repete o nome, o telefone e o endereço do cliente. Uma cliente mudou de endereço e só o último pedido foi corrigido.

**Comando:**
Explique o problema encontrado.

**Tópicos:**
- a) Diga o que é redundância de dados usando a tabela da loja como exemplo. (0,2)
- b) Explique por que a correção de só um pedido gerou inconsistência e qual o prejuízo para a loja. (0,4)
- c) Proponha como organizar os dados para que o endereço seja guardado uma única vez e justifique. (0,4)

---

## ITEM 06 — Front-End, Back-End e Banco

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, explica a um cliente o que acontece quando um usuário faz login na loja virtual: ele digita e-mail e senha, clica em "Entrar" e vê a página "Minha conta".

**Comando:**
Descreva o caminho dos dados no login.

**Tópicos:**
- a) Diga qual parte do sistema mostra a tela de login e envia o pedido. (0,2)
- b) Explique o que o back-end faz com o e-mail e a senha e como ele conversa com o banco. (0,4)
- c) Explique o que o SGBD faz nesse login e o que ele devolve ao back-end. (0,4)

---

## ITEM 07 — Banco Exposto ao Navegador

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, descobre que um sistema de agendamento coloca o endereço e a senha do banco dentro do código da página que vai para o navegador, para "ganhar tempo".

**Comando:**
Avalie a decisão da equipe.

**Tópicos:**
- a) Diga se a decisão é adequada ou não, em uma frase. (0,2)
- b) Explique o risco de deixar o banco acessível diretamente pelo navegador. (0,4)
- c) Explique como a conexão com o banco deve ser feita e por quem. (0,4)

---

## ITEM 08 — Escolhendo o Tipo de Banco

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C9

**Contexto:**
Você, como aluno consultor, recebe a lista de gerenciadores que uma equipe está considerando: PostgreSQL, MySQL, SQLite, MongoDB e Redis.

**Comando:**
Classifique e comente os gerenciadores.

**Tópicos:**
- a) Separe os cinco gerenciadores em relacionais e não relacionais. (0,2)
- b) Explique a diferença entre o modelo relacional e o não relacional na forma de organizar os dados. (0,4)
- c) Diga qual gerenciador é usado nesta UC e dois motivos para essa escolha. (0,4)

---

## ITEM 09 — Tabela, Linha e Coluna

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, mostra à equipe da escola a tabela "aluno" com as colunas id, nome, email e cidade, e as linhas "1, Ana Souza, ana@exemplo.com, Rio do Sul" e "2, Bruno Lima, bruno@exemplo.com, Blumenau".

**Comando:**
Explique a estrutura da tabela.

**Tópicos:**
- a) Diga o que representam a tabela, uma coluna e uma linha nesse exemplo. (0,2)
- b) Explique para que serve a coluna id e o que aconteceria se dois alunos tivessem o mesmo id. (0,4)
- c) Explique o que a consulta SELECT nome FROM aluno WHERE cidade = 'Blumenau' devolve e o papel de cada parte (SELECT, FROM e WHERE). (0,4)

---

## ITEM 10 — Gestão do Tempo no Projeto da UC

- **Aula:** 01 · Banco de Dados e SGBD
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, ajuda um colega que pretende "deixar a modelagem para o fim e começar direto pelas tabelas" e não tem nenhuma organização de estudos para as 20 aulas da UC.

**Comando:**
Oriente o colega sobre a gestão do tempo.

**Tópicos:**
- a) Diga por que a gestão do tempo é importante nesta UC. (0,2)
- b) Explique o risco de deixar a modelagem para o fim, considerando a ordem das etapas da UC. (0,4)
- c) Monte para o colega um plano de estudos curto com três itens (o que entregar, tempo de revisão e quando pedir ajuda) e justifique um deles. (0,4)
