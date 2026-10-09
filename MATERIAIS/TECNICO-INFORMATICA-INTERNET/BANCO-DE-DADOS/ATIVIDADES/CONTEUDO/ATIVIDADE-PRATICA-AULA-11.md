# Atividade: Atividade Prática — Aula 11 — 10 Questões Discursivas

- **Aula:** AP-11
- **Rótulo da aula:** Atividade Prática — Aula 11
- **Tema:** Padronização de Dados, Cronograma e Fluxograma
- **Ícone:** 📐
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-11.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 11 (CONTEUDO/AULA-11-PADRONIZACAO-DE-DADOS-CRONOGRAMA-E-FLUXOGRAMA.md): padrão de nomes, tipos e formatos, domínios, dicionário de dados final, cronograma e fluxograma.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-11-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 11

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para padronizar os dados de bancos de sistemas web e montar o cronograma e o fluxograma dos projetos. Descreva o fluxograma em texto, na ordem dos passos, dizendo o símbolo de cada um.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** a regra, o formato ou o símbolo pedido; **(2)** a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: regra certa, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Nomes, etapas e passos diferentes do padrão valem quando seguem as regras da aula. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 11 | Questões |
|---|---|
| Padrão de nomes | 01, 02 |
| Tipos e formatos padronizados | 03, 04 |
| Domínios | 05 |
| Dicionário de dados final | 06 |
| Cronograma | 07, 08 |
| Fluxograma | 09, 10 |

---

## ITEM 01 — Corrigindo Nomes

- **Aula:** 11 · Padronização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, recebe uma tabela chamada "Clientes Ativos" com as colunas "Data Nasc", "ValorCompra", "order" e "dtcad".

**Comando:**
Padronize os nomes.

**Tópicos:**
- a) Escreva o nome padronizado da tabela. (0,2)
- b) Escreva os nomes padronizados das quatro colunas. (0,4)
- c) Explique por que espaços, acentos e palavras reservadas devem ser evitados. (0,4)

---

## ITEM 02 — Nomes de Chaves

- **Aula:** 11 · Padronização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, revisa as tabelas de uma loja: produto (codigo_principal_produto, ...), categoria (cat, ...) e, em produto, a coluna "categoriaDoProduto" que aponta para categoria.

**Comando:**
Padronize as chaves.

**Tópicos:**
- a) Escreva o padrão da UC para chaves primárias. (0,2)
- b) Escreva os nomes padronizados da chave primária de produto, da chave primária de categoria e da chave estrangeira em produto. (0,4)
- c) Explique como o padrão de nomes ajuda o desenvolvedor do back-end. (0,4)

---

## ITEM 03 — Formatos de Datas e Documentos

- **Aula:** 11 · Padronização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, encontra no banco de uma clínica datas gravadas como "09/10/26" e "2026-10-09", CPFs como "012.345.678-90" e "1234567890" e telefones com e sem parênteses.

**Comando:**
Defina os padrões.

**Tópicos:**
- a) Diga o formato padrão de data guardado no banco. (0,2)
- b) Explique o padrão para CPF e telefone e o problema do CPF "1234567890". (0,4)
- c) Explique como o usuário vê a data e o CPF formatados na tela, se o banco guarda no padrão. (0,4)

---

## ITEM 04 — Valores, Textos e Data com Hora

- **Aula:** 11 · Padronização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, analisa uma loja que guarda preços como "R$ 59,90" em texto, e-mails com letras maiúsculas e minúsculas misturadas e horários de pedidos sem fuso.

**Comando:**
Padronize os dados.

**Tópicos:**
- a) Diga o tipo indicado para valores em dinheiro. (0,2)
- b) Explique o problema de guardar o preço como texto e o problema dos e-mails misturados. (0,4)
- c) Explique o tipo indicado para data e hora dos pedidos e por quê. (0,4)

---

## ITEM 05 — Domínios

- **Aula:** 11 · Padronização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, encontra na coluna situacao das matrículas os valores "Ativo", "ATIVA", "atv", "trancado" e "Concluída".

**Comando:**
Crie o domínio.

**Tópicos:**
- a) Explique o que é um domínio de valores. (0,2)
- b) Escreva o domínio da situação da matrícula e explique o problema dos valores atuais. (0,4)
- c) Explique duas formas de o banco garantir o domínio. (0,4)

---

## ITEM 06 — Dicionário de Dados Final

- **Aula:** 11 · Padronização
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, vai atualizar o dicionário da tabela turma da escola, que tem: identificador, código, turno, curso e sala.

**Comando:**
Monte o dicionário final.

**Tópicos:**
- a) Liste o que o dicionário de dados final passa a ter nesta aula. (0,2)
- b) Escreva as linhas de turno e curso com nome padronizado, tipo, formato ou domínio e obrigatoriedade. (0,4)
- c) Explique para que o dicionário de dados final será usado na próxima aula. (0,4)

---

## ITEM 07 — Montando o Cronograma

- **Aula:** 11 · Padronização
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, vai montar o cronograma do banco de uma academia, com as etapas: escopo, modelagem (entidades, atributos, relacionamentos), DER, normalização, scripts e documentação.

**Comando:**
Monte o cronograma.

**Tópicos:**
- a) Diga o que o cronograma deve conter para cada etapa. (0,2)
- b) Escreva as etapas na ordem, com a dependência de cada uma. (0,4)
- c) Indique dois marcos do projeto e explique por que deixar folga antes deles. (0,4)

---

## ITEM 08 — Acompanhando o Cronograma

- **Aula:** 11 · Padronização
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, percebe na terceira semana que a normalização da academia está atrasada uma semana, e os scripts estavam marcados para começar logo depois.

**Comando:**
Analise o atraso.

**Tópicos:**
- a) Diga qual etapa é afetada diretamente pelo atraso e por quê. (0,2)
- b) Explique como o grupo deveria ter acompanhado o cronograma para perceber o atraso antes. (0,4)
- c) Proponha duas ações para recuperar o prazo sem prejudicar a qualidade do modelo. (0,4)

---

## ITEM 09 — Símbolos do Fluxograma

- **Aula:** 11 · Padronização
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, ensina a um colega a desenhar o fluxograma do empréstimo de uma biblioteca.

**Comando:**
Explique os símbolos.

**Tópicos:**
- a) Diga o significado da oval, do retângulo e do losango. (0,2)
- b) Diga o significado do paralelogramo e do cilindro, com um exemplo de cada no empréstimo. (0,4)
- c) Explique por que marcar no fluxograma os pontos em que o banco é consultado ou gravado. (0,4)

---

## ITEM 10 — Fluxograma da Matrícula

- **Aula:** 11 · Padronização
- **Capacidade:** C1

**Contexto:**
Você, como aluno consultor, descreve o processo da secretaria: a secretária informa o CPF; se o aluno não existe, cadastra; escolhe a turma; se não houver vaga, oferece outra; se houver, grava a matrícula e as parcelas e emite o comprovante.

**Comando:**
Descreva o fluxograma.

**Tópicos:**
- a) Escreva o primeiro e o último passo, com o símbolo de cada um. (0,2)
- b) Descreva os passos e as duas decisões do fluxo na ordem, com o símbolo de cada um. (0,4)
- c) Indique uma decisão que estava faltando no processo (pense em alunos menores de idade) e onde ela entra. (0,4)
