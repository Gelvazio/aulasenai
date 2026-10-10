# Atividade: Atividade Prática — Aula 20 — 10 Questões Discursivas

- **Aula:** AP-20
- **Rótulo da aula:** Atividade Prática — Aula 20
- **Tema:** Projeto Integrador: Banco Documentado para o Back-end
- **Ícone:** 📦
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
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 20 (CONTEUDO/AULA-20-PROJETO-INTEGRADOR-BANCO-DOCUMENTADO-PARA-O-BACK-END.md): peças da documentação técnica, escopo como referência da entrega, dicionário de dados, scripts numerados e idempotentes, recriação do zero, rastreabilidade, conferência final e relatório de testes, backup com restauração, o que o back-end recebe, revisão cruzada e justificativa técnica das escolhas.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-20-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 20

**Seu papel em todas as questões:** Você, como aluno consultor, vai entregar o banco escola_db da escola de cursos livres (tabelas curso, turma, aluno, matricula e parcela, procedimento matricular, triggers e segurança das aulas 12 a 19) à empresa que fará o back-end do sistema de matrículas.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o trecho pedido; **(2)** o código, a tabela ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: peças e comandos corretos para o PostgreSQL e justificativas ligadas aos requisitos do escopo, com as palavras-chave do conteúdo. Respostas equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 20 | Questões |
|---|---|
| Peças da documentação técnica | 01 |
| Escopo como referência da entrega | 02 |
| Dicionário de dados | 03 |
| Scripts numerados, ordem e boas práticas | 04, 05 |
| Recriação do zero | 05 |
| Rastreabilidade dos requisitos | 06 |
| Conferência final e relatório de testes | 07 |
| Backup e teste de restauração | 08 |
| O que o back-end recebe | 09 |
| Revisão cruzada (S1) e justificativa técnica (S2) | 10 |

---

## ITEM 01 — O Pacote da Entrega

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, recebe da empresa do back-end o pedido: "mandem tudo o que precisamos para usar o banco sem ter que ligar para vocês".

**Comando:**
Monte o pacote de documentação técnica.

**Tópicos:**
- a) Explique quando um banco está realmente pronto para ser entregue. (0,2)
- b) Liste as peças da documentação técnica do banco e diga em uma frase para que serve cada uma. (0,4)
- c) Explique por que o guia de instalação (README) é a peça que a empresa vai abrir primeiro e o que ele precisa explicar. (0,4)

---

## ITEM 02 — Escopo como Referência

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, confere a entrega contra o escopo da aula 5 e encontra: (1) o requisito "registrar o telefone de um responsável pelo aluno menor de idade" não está em nenhuma tabela; (2) existe uma tabela "brinde" que nenhum requisito pede.

**Comando:**
Avalie a entrega com base no escopo.

**Tópicos:**
- a) Diga qual documento é a referência para conferir a entrega final e o que ele contém. (0,2)
- b) Classifique as situações 1 e 2 e diga o que fazer com cada uma. (0,4)
- c) Explique como uma mudança de escopo deve ser tratada para que a tabela "brinde" pudesse fazer parte da entrega. (0,4)

---

## ITEM 03 — Dicionário de Dados

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, revisa o dicionário de dados e percebe que a coluna data_pagamento da tabela parcela aparece no documento como "pago_em", com tipo texto.

**Comando:**
Atualize o dicionário de dados.

**Tópicos:**
- a) Diga quais informações o dicionário de dados traz para cada coluna. (0,2)
- b) Escreva a linha correta do dicionário para a coluna data_pagamento da tabela parcela. (0,4)
- c) Explique o problema de entregar o dicionário desatualizado em relação ao SQL. (0,4)

---

## ITEM 04 — Scripts Numerados

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, encontra os scripts do grupo com os nomes: seguranca.sql, tabelas.sql, dados.sql, rotinas.sql, chaves.sql, banco.sql e consultas.sql.

**Comando:**
Organize os scripts da entrega.

**Tópicos:**
- a) Explique por que os scripts precisam ser numerados. (0,2)
- b) Renomeie os sete scripts com números na ordem correta de execução, dizendo o conteúdo de cada um. (0,4)
- c) Cite três boas práticas que todo script da entrega deve seguir e explique uma delas. (0,4)

---

## ITEM 05 — Recriar do Zero

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C7

**Contexto:**
Você, como aluno consultor, ouve de um colega: "no meu computador o banco funciona, não precisa testar de novo". Na recriação num banco limpo, o script de chaves falhou, mas o psql seguiu executando os outros arquivos.

**Comando:**
Recrie o banco do zero de forma segura.

**Tópicos:**
- a) Explique por que o banco deve ser recriado do zero num banco limpo antes da entrega. (0,2)
- b) Escreva os comandos do psql que executam, na ordem, os scripts 02-tabelas.sql e 03-chaves-e-restricoes.sql no banco escola_db, parando no primeiro erro. (0,4)
- c) Explique o que a opção -v ON_ERROR_STOP=1 evita e como executar um arquivo de dentro do psql. (0,4)

---

## ITEM 06 — Rastreabilidade

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, precisa provar ao cliente que os requisitos foram atendidos: R1 — CPF do aluno não se repete; R2 — turma com no máximo 25 alunos; R4 — parcela paga não pode mudar de valor; R6 — financeiro não vê o CPF.

**Comando:**
Monte a matriz de rastreabilidade.

**Tópicos:**
- a) Explique o que é a matriz de rastreabilidade. (0,2)
- b) Escreva as linhas da matriz para R1, R2, R4 e R6, com o que atende cada requisito no banco e o script. (0,4)
- c) Explique como a matriz de rastreabilidade ajuda a encontrar pendências e excessos na entrega. (0,4)

---

## ITEM 07 — Conferência Final e Relatório de Testes

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, faz a conferência final no banco recriado do zero, antes de chamar o cliente.

**Comando:**
Monte e execute o checklist de conferência.

**Tópicos:**
- a) Diga os comandos do psql que listam as tabelas do banco e que mostram as colunas e restrições da tabela matricula. (0,2)
- b) Descreva três testes da conferência final (estrutura ou dados, regra do negócio e permissões), com o comando ou a ação e o resultado esperado de cada um. (0,4)
- c) Explique o que cada linha do relatório de testes registra e por que um erro do banco pode ser o resultado esperado. (0,4)

---

## ITEM 08 — Backup da Entrega

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, vai guardar uma cópia do banco no dia da entrega. Um colega sugere salvar o arquivo na pasta do repositório Git, "para ficar junto com os scripts".

**Comando:**
Faça e teste o backup da entrega.

**Tópicos:**
- a) Escreva o comando que gera o backup do banco escola_db no formato custom. (0,2)
- b) Escreva os comandos que criam o banco escola_db_teste, restauram o backup nele e conferem a quantidade de alunos. (0,4)
- c) Explique por que o backup só vale depois da restauração e por que o arquivo não deve ir para o Git. (0,4)

---

## ITEM 09 — O que o Back-end Recebe

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C14

**Contexto:**
Você, como aluno consultor, recebe o pedido do desenvolvedor do back-end: "me passem a senha do postgres que eu me viro".

**Comando:**
Entregue ao back-end só o que ele precisa.

**Tópicos:**
- a) Diga com qual login o back-end deve se conectar e onde fica a string de conexão. (0,2)
- b) Escreva o exemplo da variável de ambiente DATABASE_URL e liste o que entra no "contrato" do banco entregue ao back-end. (0,4)
- c) Explique por que a senha do postgres não é entregue e o que o back-end deve fazer quando o banco devolve um erro de regra (por exemplo, a turma cheia). (0,4)

---

## ITEM 10 — Revisão Cruzada e Justificativas

- **Aula:** 20 · Projeto Integrador
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe a revisão de outro grupo com duas perguntas: (1) "por que a parcela tem chave (id_matricula, numero) e não um id próprio?"; (2) "por que o limite de 25 alunos está no procedimento e não num CHECK?". O grupo revisor também sugere renomear a tabela matricula para inscricao.

**Comando:**
Responda à revisão com atitude e base técnica.

**Tópicos:**
- a) Diga como a sugestão de renomear a tabela deve ser registrada pelo grupo. (0,2)
- b) Justifique tecnicamente as escolhas 1 e 2. (0,4)
- c) Explique as atitudes esperadas do revisor e do autor na revisão cruzada e decida, com justificativa, se aceita a troca de matricula para inscricao. (0,4)
