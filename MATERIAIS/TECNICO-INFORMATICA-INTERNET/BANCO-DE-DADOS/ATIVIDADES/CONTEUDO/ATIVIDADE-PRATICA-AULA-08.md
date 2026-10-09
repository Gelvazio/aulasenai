# Atividade: Atividade Prática — Aula 08 — 10 Questões Discursivas

- **Aula:** AP-08
- **Rótulo da aula:** Atividade Prática — Aula 08
- **Tema:** Relacionamentos 1:1, 1:N e N:N
- **Ícone:** 🔗
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-08.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de modelagem, os conteúdos da aula 08 (CONTEUDO/AULA-08-RELACIONAMENTOS-1-1-1-N-E-N-N.md): relacionamento e verbo, leitura nos dois sentidos, cardinalidades 1:1, 1:N e N:N, cardinalidade mínima, notação, autorrelacionamento e implementação por chave estrangeira ou tabela associativa.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-08-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 8

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para definir os relacionamentos e as cardinalidades dos bancos de dados de sistemas web, a partir das frases dos clientes.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** a cardinalidade ou o conceito pedido; **(2)** a leitura ou a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: cardinalidade certa, leitura nos dois sentidos e justificativa com as palavras-chave do conteúdo. Cardinalidades diferentes do padrão valem quando a justificativa interpreta a frase de forma coerente. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 08 | Questões |
|---|---|
| Relacionamento, verbo e leitura nos dois sentidos | 01 |
| 1:1 | 02 |
| 1:N e chave estrangeira no lado N | 03, 04 |
| N:N e tabela associativa | 05, 06 |
| Cardinalidade mínima e notação | 07 |
| Autorrelacionamento | 08 |
| Erros comuns | 09 |
| Relacionamentos do sistema de matrículas | 10 |

---

## ITEM 01 — Relacionamento e Leitura nos Dois Sentidos

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, ouve do dono de uma pizzaria: "o cliente faz pedidos pelo site". Um colega já marcou 1:1 entre CLIENTE e PEDIDO.

**Comando:**
Analise o relacionamento.

**Tópicos:**
- a) Diga o que é um relacionamento e qual verbo pode nomear este. (0,2)
- b) Faça as duas perguntas da cardinalidade máxima para CLIENTE e PEDIDO e responda cada uma. (0,4)
- c) Diga a cardinalidade correta e explique o erro do colega. (0,4)

---

## ITEM 02 — Um para Um

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, analisa uma empresa em que cada funcionário recebe um único crachá e cada crachá pertence a um único funcionário.

**Comando:**
Modele o relacionamento.

**Tópicos:**
- a) Diga a cardinalidade entre FUNCIONÁRIO e CRACHÁ. (0,2)
- b) Explique o que caracteriza um relacionamento 1:1 usando o exemplo. (0,4)
- c) Explique duas formas de implementar esse 1:1 nas tabelas. (0,4)

---

## ITEM 03 — Um para Muitos

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe da loja a frase: "cada produto pertence a uma categoria; uma categoria tem vários produtos".

**Comando:**
Modele e implemente o relacionamento.

**Tópicos:**
- a) Diga a cardinalidade entre CATEGORIA e PRODUTO. (0,2)
- b) Explique em qual tabela fica a chave estrangeira e qual atributo ela guarda. (0,4)
- c) Explique por que a chave estrangeira não deve ficar em CATEGORIA. (0,4)

---

## ITEM 04 — 1:N na Escola

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe da escola: "um curso pode ter várias turmas ou nenhuma ainda; cada turma é de um único curso".

**Comando:**
Escreva a cardinalidade completa.

**Tópicos:**
- a) Escreva o relacionamento na notação (mín, máx) dos dois lados. (0,2)
- b) Leia a notação em voz alta, em frases, nos dois sentidos. (0,4)
- c) Explique como a cardinalidade mínima 0 do lado da turma afeta o cadastro de um curso novo. (0,4)

---

## ITEM 05 — Muitos para Muitos

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe de uma livraria: "um livro pode ter vários autores e um autor pode escrever vários livros; queremos saber a ordem dos autores na capa".

**Comando:**
Modele e implemente o relacionamento.

**Tópicos:**
- a) Diga a cardinalidade entre LIVRO e AUTOR. (0,2)
- b) Explique como implementar esse relacionamento nas tabelas, indicando as colunas da tabela do meio. (0,4)
- c) Explique onde fica a "ordem dos autores na capa" e por quê. (0,4)

---

## ITEM 06 — Pedido e Produto

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, revisa o modelo de uma loja em que PEDIDO tem os campos produto1, produto2 e produto3 para guardar os produtos comprados.

**Comando:**
Corrija o modelo.

**Tópicos:**
- a) Diga a cardinalidade real entre PEDIDO e PRODUTO. (0,2)
- b) Explique os problemas dos campos produto1, produto2 e produto3. (0,4)
- c) Proponha a tabela que resolve o relacionamento e explique onde ficam quantidade e preço de venda. (0,4)

---

## ITEM 07 — Cardinalidade Mínima e Notação

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe de uma academia: "o aluno pode se cadastrar antes de contratar um plano; todo contrato precisa ser de um aluno".

**Comando:**
Defina as participações.

**Tópicos:**
- a) Diga o que indica a cardinalidade mínima. (0,2)
- b) Escreva a cardinalidade (mín, máx) de ALUNO e CONTRATO, considerando que um aluno pode ter vários contratos ao longo do tempo. (0,4)
- c) Explique como essas cardinalidades ficariam na notação pé de galinha (traço, círculo e tridente). (0,4)

---

## ITEM 08 — Autorrelacionamento

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, ouve da empresa: "cada funcionário tem um supervisor, que também é funcionário; um supervisor cuida de vários funcionários; o diretor não tem supervisor".

**Comando:**
Modele o autorrelacionamento.

**Tópicos:**
- a) Diga o que é autorrelacionamento. (0,2)
- b) Diga a cardinalidade do relacionamento "supervisiona" e explique a participação mínima, considerando o diretor. (0,4)
- c) Explique como implementar esse autorrelacionamento na tabela FUNCIONÁRIO. (0,4)

---

## ITEM 09 — Erros Comuns de Relacionamento

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, revisa o modelo de um colega e encontra: (1) ALUNO N:N TURMA sem nenhuma tabela no meio; (2) a chave estrangeira das turmas guardada em CURSO; (3) participação obrigatória de PEDIDO para CLIENTE marcada sem perguntar à loja.

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Diga qual é o problema do erro 1. (0,2)
- b) Explique o problema do erro 2 e onde a chave estrangeira deveria ficar. (0,4)
- c) Explique o risco do erro 3 para o cadastro de clientes e como evitá-lo. (0,4)

---

## ITEM 10 — Relacionamentos do Sistema de Matrículas

- **Aula:** 08 · Relacionamentos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, finaliza os relacionamentos da escola: alunos fazem matrículas em turmas; matrículas geram parcelas; responsáveis respondem por alunos; professores dão aulas nas turmas (um professor em várias turmas e uma turma com mais de um professor).

**Comando:**
Monte a lista de relacionamentos da SA 1.

**Tópicos:**
- a) Diga a cardinalidade de ALUNO–TURMA, MATRÍCULA–PARCELA, RESPONSÁVEL–ALUNO e PROFESSOR–TURMA. (0,2)
- b) Explique como ALUNO–TURMA e PROFESSOR–TURMA serão implementados. (0,4)
- c) Explique como MATRÍCULA–PARCELA e RESPONSÁVEL–ALUNO serão implementados. (0,4)
