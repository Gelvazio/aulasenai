# Atividade: Atividade Prática — Aula 07 — 10 Questões Discursivas

- **Aula:** AP-07
- **Rótulo da aula:** Atividade Prática — Aula 07
- **Tema:** Atributos
- **Ícone:** 🏷️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-07.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de modelagem, os conteúdos da aula 07 (CONTEUDO/AULA-07-ATRIBUTOS.md): atributo e valor, atributos simples e compostos, descritivos, nominativos e referenciais, identificador, dicionário de atributos e erros comuns.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-07-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 7

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para definir e classificar os atributos das entidades dos bancos de dados de sistemas web e montar o dicionário de atributos.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito ou a classificação pedida; **(2)** a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Classificações diferentes do padrão valem quando a justificativa for coerente. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 07 | Questões |
|---|---|
| Atributo e valor | 01 |
| Simples × composto | 02, 03 |
| Descritivo, nominativo e referencial | 04, 05 |
| Identificador | 06 |
| Dicionário de atributos | 07, 08 |
| Erros comuns | 09 |
| Classificação completa de uma ficha | 10 |

---

## ITEM 01 — Atributo e Valor

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, mostra à equipe de uma biblioteca o registro "título = Dom Casmurro; autor = Machado de Assis; ano = 1899" da entidade LIVRO.

**Comando:**
Explique os conceitos com o registro.

**Tópicos:**
- a) Diga quais são os atributos e quais são os valores no registro. (0,2)
- b) Explique a diferença entre atributo e valor. (0,4)
- c) Explique como os atributos podem ser desenhados no DER. (0,4)

---

## ITEM 02 — Simples ou Composto

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, analisa os campos de um cadastro de clientes: CPF, nome completo, endereço, telefone com DDD, data de nascimento e e-mail.

**Comando:**
Classifique quanto à estrutura.

**Tópicos:**
- a) Diga o que é atributo simples e o que é atributo composto. (0,2)
- b) Classifique os seis campos em simples ou composto. (0,4)
- c) Escolha um campo composto e mostre em quais partes ele seria dividido. (0,4)

---

## ITEM 03 — Quando Dividir o Composto

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, ouve duas equipes: a loja quer "enviar promoções por cidade e bairro"; a escola diz que "o endereço só aparece impresso no contrato, sem filtros".

**Comando:**
Decida sobre a divisão do endereço.

**Tópicos:**
- a) Diga qual é o critério para dividir um atributo composto. (0,2)
- b) Explique se o endereço deve ser dividido na loja e por quê. (0,4)
- c) Explique o que acontece com as partes do composto quando a tabela for criada. (0,4)

---

## ITEM 04 — Descritivo, Nominativo e Referencial

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, analisa a entidade CURSO (código, nome, carga horária, valor) e a entidade TURMA (código da turma, turno, código do curso).

**Comando:**
Classifique quanto à função.

**Tópicos:**
- a) Defina atributo descritivo, nominativo e referencial em uma frase cada. (0,2)
- b) Classifique os atributos de CURSO. (0,4)
- c) Classifique os atributos de TURMA e explique o que o código do curso em TURMA indica. (0,4)

---

## ITEM 05 — Referencial e Relacionamento

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, encontra na entidade PEDIDO de uma loja os atributos número do pedido, data, valor total e código do cliente.

**Comando:**
Analise o atributo referencial.

**Tópicos:**
- a) Diga qual atributo de PEDIDO é referencial e a qual entidade ele aponta. (0,2)
- b) Explique o que o atributo referencial mostra sobre o modelo e em que ele vai se transformar na tabela. (0,4)
- c) Explique o erro de usar um atributo referencial para uma entidade que não existe no modelo. (0,4)

---

## ITEM 06 — Escolhendo o Identificador

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, discute com a escola qual deve ser o identificador do aluno. As opções sugeridas são: nome, e-mail, CPF ou um código próprio (id).

**Comando:**
Escolha e justifique o identificador.

**Tópicos:**
- a) Diga as duas regras que um identificador precisa cumprir. (0,2)
- b) Explique o problema de usar o nome e o problema de usar o e-mail. (0,4)
- c) Recomende o identificador e explique por que o CPF pode não servir numa escola com crianças. (0,4)

---

## ITEM 07 — Dicionário de Atributos

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, vai entregar à equipe o dicionário de atributos da entidade PRODUTO de uma loja (código, nome, descrição, preço, estoque, código da categoria).

**Comando:**
Monte o dicionário.

**Tópicos:**
- a) Liste as colunas que um dicionário de atributos deve ter. (0,2)
- b) Preencha a linha dos atributos preço e código da categoria (descrição, tipo, obrigatório, classificação e exemplo). (0,4)
- c) Explique para que serve o dicionário de atributos no projeto. (0,4)

---

## ITEM 08 — Dicionário da Entidade Fraca

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, monta o dicionário da entidade PARCELA da escola (número da parcela, matrícula, vencimento, valor, data de pagamento).

**Comando:**
Complete o dicionário de PARCELA.

**Tópicos:**
- a) Indique o identificador de PARCELA. (0,2)
- b) Classifique os cinco atributos de PARCELA quanto à função e diga qual pode ficar vazio. (0,4)
- c) Explique por que o atributo matrícula, em PARCELA, é ao mesmo tempo referencial e parte do identificador. (0,4)

---

## ITEM 09 — Erros Comuns de Atributos

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, revisa o modelo de uma academia e encontra: o atributo "idade" em ALUNO; o atributo "telefones" com valores como "99999-1111 / 98888-2222"; e o nome do aluno usado como identificador.

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Diga qual é o problema do atributo idade. (0,2)
- b) Explique o problema do atributo telefones e como corrigir. (0,4)
- c) Explique o problema do nome como identificador e proponha a correção. (0,4)

---

## ITEM 10 — Raio X da Ficha de Matrícula

- **Aula:** 07 · Atributos
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, recebe a ficha de matrícula da escola com os campos: Nome, CPF, Nascimento, Endereço, Curso, Turma, Turno e Data.

**Comando:**
Classifique a ficha nas duas dimensões.

**Tópicos:**
- a) Classifique os oito campos em simples ou composto. (0,2)
- b) Classifique os oito campos em descritivo, nominativo ou referencial. (0,4)
- c) Diga a qual entidade pertencem Turno e Data e justifique. (0,4)
