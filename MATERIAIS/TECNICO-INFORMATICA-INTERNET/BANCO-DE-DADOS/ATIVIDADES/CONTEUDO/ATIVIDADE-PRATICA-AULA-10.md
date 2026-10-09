# Atividade: Atividade Prática — Aula 10 — 10 Questões Discursivas

- **Aula:** AP-10
- **Rótulo da aula:** Atividade Prática — Aula 10
- **Tema:** Normalização de Dados (1FN, 2FN e 3FN)
- **Ícone:** 🧹
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-10.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 10 (CONTEUDO/AULA-10-NORMALIZACAO-DE-DADOS-1FN-2FN-3FN.md): anomalias, dependência funcional, 1FN, 2FN e 3FN, conferência com o DER e desnormalização justificada.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-10-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 10

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para transformar planilhas e tabelas mal organizadas de sistemas web em tabelas normalizadas até a terceira forma normal. Escreva as tabelas no formato NOME (coluna1, coluna2, ...), indicando a chave primária.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** a anomalia, a dependência ou a forma normal pedida; **(2)** as tabelas resultantes; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: forma normal certa, tabelas resultantes coerentes e justificativa pela dependência funcional. Nomes de tabelas e colunas diferentes do padrão valem, desde que a estrutura esteja correta. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 10 | Questões |
|---|---|
| Objetivo da normalização e anomalias | 01, 02 |
| Dependência funcional | 03 |
| 1FN | 04 |
| 2FN | 05, 06 |
| 3FN | 07, 08 |
| Desnormalização justificada | 09 |
| Normalização completa e conferência com o DER | 10 |

---

## ITEM 01 — Por Que Normalizar

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, ouve o dono de uma loja dizer: "minha planilha de vendas tem tudo numa folha só, é mais simples assim".

**Comando:**
Explique a normalização ao dono da loja.

**Tópicos:**
- a) Diga o objetivo da normalização. (0,2)
- b) Explique dois benefícios da normalização para a loja. (0,4)
- c) Explique a ideia "cada fato guardado uma única vez" com um exemplo de dado da loja. (0,4)

---

## ITEM 02 — As Três Anomalias

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, analisa a planilha de uma biblioteca com as colunas: empréstimo, data, leitor, telefone do leitor, livro, autor e editora. Cada linha é um empréstimo.

**Comando:**
Mostre as anomalias da planilha.

**Tópicos:**
- a) Dê um exemplo de anomalia de inserção nessa planilha. (0,2)
- b) Dê um exemplo de anomalia de atualização e a consequência para a biblioteca. (0,4)
- c) Dê um exemplo de anomalia de exclusão e explique o que se perde. (0,4)

---

## ITEM 03 — Dependências Funcionais

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, analisa a tabela PEDIDO (id_pedido, data, id_cliente, nome_cliente, cidade_cliente, valor_total).

**Comando:**
Encontre as dependências.

**Tópicos:**
- a) Explique o que significa a dependência funcional A → B. (0,2)
- b) Escreva as dependências funcionais da tabela, a partir de id_pedido e de id_cliente. (0,4)
- c) Explique como essas dependências mostram que a tabela precisa ser dividida. (0,4)

---

## ITEM 04 — Primeira Forma Normal

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, encontra a tabela CLIENTE (id_cliente, nome, telefones, email1, email2, email3), em que telefones guarda valores como "99999-1111, 98888-2222".

**Comando:**
Leve a tabela à 1FN.

**Tópicos:**
- a) Diga as três condições da 1FN. (0,2)
- b) Explique quais colunas ferem a 1FN e por quê. (0,4)
- c) Escreva as tabelas na 1FN. (0,4)

---

## ITEM 05 — Segunda Forma Normal

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, analisa a tabela ITEM_PEDIDO (id_pedido, id_produto, quantidade, nome_produto, categoria_produto), com chave primária (id_pedido, id_produto).

**Comando:**
Leve a tabela à 2FN.

**Tópicos:**
- a) Explique o que é dependência parcial. (0,2)
- b) Diga quais atributos têm dependência parcial e de qual parte da chave dependem. (0,4)
- c) Escreva as tabelas na 2FN e diga por que quantidade fica em ITEM_PEDIDO. (0,4)

---

## ITEM 06 — 2FN na Escola

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, analisa a tabela MATRICULA_TURMA (id_aluno, id_turma, nome_aluno, turno, data_matricula, situacao), com chave (id_aluno, id_turma).

**Comando:**
Normalize até a 2FN.

**Tópicos:**
- a) Diga se a tabela está na 2FN e justifique em uma frase. (0,2)
- b) Diga para onde vão nome_aluno e turno e explique por quê. (0,4)
- c) Escreva as tabelas resultantes e explique por que data_matricula e situacao ficam na matrícula. (0,4)

---

## ITEM 07 — Terceira Forma Normal

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, recebe a tabela TURMA (id_turma, turno, sala, id_curso, nome_curso, carga_curso, valor_mensal).

**Comando:**
Leve a tabela à 3FN.

**Tópicos:**
- a) Explique o que é dependência transitiva. (0,2)
- b) Mostre a dependência transitiva na tabela TURMA. (0,4)
- c) Escreva as tabelas na 3FN, indicando a chave estrangeira. (0,4)

---

## ITEM 08 — 3FN na Clínica

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, recebe a tabela CONSULTA (id_consulta, data, id_paciente, nome_paciente, id_medico, nome_medico, especialidade, valor).

**Comando:**
Normalize até a 3FN.

**Tópicos:**
- a) Diga qual forma normal a tabela fere. (0,2)
- b) Explique as dependências transitivas da tabela. (0,4)
- c) Escreva as tabelas na 3FN. (0,4)

---

## ITEM 09 — Quando Repetir de Propósito

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, ouve um colega dizer que o preço unitário em ITEM_PEDIDO é "redundância, porque o preço já está em PRODUTO" e que deve ser apagado.

**Comando:**
Analise a afirmação.

**Tópicos:**
- a) Diga se o colega está certo ou errado. (0,2)
- b) Explique por que o preço no item do pedido é um dado diferente do preço atual do produto. (0,4)
- c) Explique o que é desnormalização e o cuidado necessário ao usá-la. (0,4)

---

## ITEM 10 — Normalizando a Planilha da Escola

- **Aula:** 10 · Normalização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, recebe a planilha da secretaria: matricula, aluno, telefones, curso, carga_curso, turma, turno, data_matricula.

**Comando:**
Normalize a planilha até a 3FN.

**Tópicos:**
- a) Diga o que a 1FN muda na planilha. (0,2)
- b) Escreva as tabelas finais na 3FN, com as chaves primárias e estrangeiras. (0,4)
- c) Explique como conferir o resultado com o DER e o que acontece agora quando a carga de um curso muda. (0,4)
