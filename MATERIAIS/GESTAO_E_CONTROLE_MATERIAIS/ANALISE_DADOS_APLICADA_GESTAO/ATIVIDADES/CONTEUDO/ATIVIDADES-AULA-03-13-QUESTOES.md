# Atividade: Funções de Busca Avançadas — 13 Questões

- **Aula:** 03
- **Tema:** Funções de Busca Avançadas
- **Ícone:** 🔍
- **Duração:** 120 minutos
- **Formato:** Múltipla escolha (A, B, C, D, E)
- **Total de questões:** 13
- **Pontuação:** 1 ponto por questão correta (total: 13 pontos)
- **Capacidade avaliada:** Estruturar tabela para PROCV; Identificar número de coluna em PROCV; Aplicar PROCV correto; Reconhecer erro #N/D em PROCV; Usar SEERRO para tratamento de erro; Aplicar ÍNDICE e CORRESP; Entender CORRESP com 0 ou 1; Aplicar SE simples para condição; SE aninhado para múltiplas faixas; Calcular comissão com fórmula integrada; Integrar PROCV + SE para busca condicional; Validar dados com comparação lógica; Criar resumo gerencial com múltiplas funções
- **Conteúdo-base:** `—`
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)

> Fonte única desta atividade (corrigida em 30/09/2026). A linha **Gabarito** NÃO é publicada
> (arquivo no .gitignore); o gabarito fica só na tabela `gabarito` do banco.

---

## ITEM 01 — Estruturar tabela para PROCV

**Contexto:**  
Uma distribuidora de materiais elétricos de Joinville calcula a comissão mensal dos vendedores. Na aba Vendedores, a tabela está em A2:D6 com as colunas ID | Nome | Salário Base | Departamento. Na aba Relatório, o analista digita o ID do vendedor e quer trazer os demais dados com PROCV.

**Comando:**  
Por que a coluna ID precisa ser a primeira coluna da matriz usada no PROCV?

**Alternativas:**
- A) Porque o Excel ordena a tabela sozinho pela primeira coluna
- B) Porque a primeira coluna fica com o formato de número
- C) Porque o PROCV procura o valor sempre na primeira coluna da matriz e devolve dados das colunas à direita
- D) Porque a posição das colunas não interfere no PROCV
- E) Porque o PROCV só aceita números na primeira coluna

**Gabarito:** C

---

## ITEM 02 — Identificar número de coluna em PROCV

**Contexto:**  
Na matriz Vendedores!$A$2:$D$6, a ordem das colunas é: 1 = ID, 2 = Nome, 3 = Salário Base, 4 = Departamento. O analista quer trazer o NOME do vendedor.

**Comando:**  
Qual número deve ser informado no argumento núm_índice_coluna do PROCV?

**Alternativas:**
- A) 1
- B) 2
- C) 3
- D) 4
- E) 0

**Gabarito:** B

---

## ITEM 03 — Aplicar PROCV correto

**Contexto:**  
Na aba Relatório, a célula A2 contém o ID 102. O analista quer trazer o SALÁRIO BASE desse vendedor a partir da matriz Vendedores!$A$2:$D$6, com busca exata.

**Comando:**  
Qual fórmula está correta?

**Alternativas:**
- A) =PROCV(A2;Vendedores!$A$2:$D$6;2;0)
- B) =PROCV(A2;Vendedores!$A$2:$D$6;4;0)
- C) =PROCV(Vendedores!$A$2:$D$6;A2;3;0)
- D) =PROCV(A2;Vendedores!$A$2:$D$6;3;0)
- E) =PROCV(A2;Vendedores!$A$2:$D$6;3)

**Gabarito:** D

---

## ITEM 04 — Reconhecer erro #N/D em PROCV

**Contexto:**  
Um vendedor novo foi lançado no Relatório com o ID 999, mas ainda não foi cadastrado na aba Vendedores. A fórmula usada é =PROCV(A7;Vendedores!$A$2:$D$6;2;0).

**Comando:**  
Qual resultado o Excel mostra na célula?

**Alternativas:**
- A) #N/D
- B) #DIV/0!
- C) #VALOR!
- D) #REF!
- E) 0

**Gabarito:** A

---

## ITEM 05 — Usar SEERRO para tratamento de erro

**Contexto:**  
A gerência não quer ver códigos de erro no relatório. Quando o ID não existir, a célula deve mostrar o texto Não encontrado.

**Comando:**  
Qual fórmula atende ao pedido?

**Alternativas:**
- A) =SEERRO("Não encontrado";PROCV(A7;Vendedores!$A$2:$D$6;2;0))
- B) =SE(PROCV(A7;Vendedores!$A$2:$D$6;2;0);"Não encontrado")
- C) =SEERRO(PROCV(A7;Vendedores!$A$2:$D$6;2;0);"Não encontrado")
- D) =PROCV(A7;Vendedores!$A$2:$D$6;"Não encontrado";0)
- E) =SEERRO(PROCV(A7;Vendedores!$A$2:$D$6;2;0);Não encontrado)

**Gabarito:** C

---

## ITEM 06 — Aplicar ÍNDICE e CORRESP

**Contexto:**  
Na aba Vendedores, a coluna D (D2:D6) tem os departamentos e a coluna A (A2:A6) tem os IDs. O analista montou: =ÍNDICE(D2:D6;CORRESP(102;A2:A6;0)).

**Comando:**  
O que essa fórmula devolve?

**Alternativas:**
- A) O ID 102
- B) A posição (número da linha) do ID 102
- C) O nome do vendedor de ID 102
- D) O salário base do vendedor de ID 102
- E) O departamento do vendedor de ID 102

**Gabarito:** E

---

## ITEM 07 — Entender CORRESP com 0 ou 1

**Contexto:**  
A tabela de comissões tem, em ordem crescente, os limites de faturamento 0, 15.000 e 18.000 (taxas de 3%, 5% e 8%). Para um faturamento de 16.500, o analista quer achar a faixa correta com CORRESP.

**Comando:**  
Qual tipo de correspondência deve ser usado e o que ele faz?

**Alternativas:**
- A) 0 — encontra o valor exato 16.500 na lista de limites
- B) 1 — encontra o maior limite que seja menor ou igual a 16.500 (a lista precisa estar em ordem crescente)
- C) 1 — encontra o menor limite que seja maior ou igual a 16.500
- D) -1 — funciona com a lista em ordem crescente
- E) 2 — busca por faixas de valores

**Gabarito:** B

---

## ITEM 08 — Aplicar SE simples para condição

**Contexto:**  
Regra da empresa: se o faturamento em D2 for menor que R$ 15.000, a taxa de comissão é 3%; caso contrário, é 5%. A célula deve mostrar a TAXA (e não o valor da comissão).

**Comando:**  
Na fórmula =SE(D2<15000;X;Y), quais são X e Y?

**Alternativas:**
- A) "Sim" e "Não"
- B) D2*0,03 e D2*0,05
- C) VERDADEIRO e FALSO
- D) 0,03 e 0,05
- E) 0,05 e 0,03

**Gabarito:** D

---

## ITEM 09 — SE aninhado para múltiplas faixas

**Contexto:**  
As faixas de comissão são: faturamento abaixo de R$ 15.000 = 3%; de R$ 15.000 até menos de R$ 18.000 = 5%; R$ 18.000 ou mais = 8%.

**Comando:**  
Na fórmula =SE(D2<15000;0,03;SE(D2<18000;X;Y)), quais são X e Y?

**Alternativas:**
- A) 0,05 e 0,08
- B) 0,03 e 0,08
- C) 0,08 e 0,05
- D) 0,03 e 0,05
- E) 0,08 e 0,03

**Gabarito:** A

---

## ITEM 10 — Calcular comissão com fórmula integrada

**Contexto:**  
O vendedor de ID 102 faturou R$ 16.500 no mês. Pelas faixas do Item 09, a fórmula de comissão é =D2*SE(D2<15000;0,03;SE(D2<18000;0,05;0,08)).

**Comando:**  
Qual é a comissão do vendedor 102?

**Alternativas:**
- A) R$ 495,00
- B) R$ 1.320,00
- C) R$ 825,00
- D) R$ 850,00
- E) R$ 900,00

**Gabarito:** C

---

## ITEM 11 — Integrar PROCV + SE para busca condicional

**Contexto:**  
Vendedores do departamento Externo recebem ajuda de custo de R$ 300; os demais, R$ 0. O departamento está na coluna 4 da matriz Vendedores!$A$2:$D$6.

**Comando:**  
Qual fórmula calcula a ajuda de custo do vendedor cujo ID está em A2?

**Alternativas:**
- A) =SE(PROCV(A2;Vendedores!$A$2:$D$6;4;0)="Externo";300;0)
- B) =PROCV(SE(A2="Externo";300;0);Vendedores!$A$2:$D$6;4;0)
- C) =SE(A2="Externo";300;0)
- D) =PROCV(A2;Vendedores!$A$2:$D$6;300;0)
- E) =SE(PROCV(A2;Vendedores!$A$2:$D$6;2;0)="Externo";300;0)

**Gabarito:** A

---

## ITEM 12 — Validar dados com comparação lógica

**Contexto:**  
Depois de buscar o salário base (coluna 3), o analista quer conferir se o valor cadastrado é positivo. A fórmula usada é =SE(PROCV(A2;Vendedores!$A$2:$D$6;3;0)>0;"OK";"ERRO") e o salário base do ID em A2 é R$ 2.400.

**Comando:**  
Qual é o resultado da fórmula?

**Alternativas:**
- A) 2400
- B) "ERRO"
- C) #N/D
- D) VERDADEIRO
- E) "OK"

**Gabarito:** E

---

## ITEM 13 — Criar resumo gerencial com múltiplas funções

**Contexto:**  
O resumo do mês deve mostrar, nesta ordem: total faturado, maior faturamento individual, menor faturamento individual, faturamento médio por vendedor e total pago em comissões.

**Comando:**  
Qual sequência de funções monta esse resumo?

**Alternativas:**
- A) SOMA, MÉDIA, MÍNIMO, MÁXIMO, SOMA
- B) SOMA, MÁXIMO, MÍNIMO, MÉDIA, SOMA
- C) MÉDIA, MÁXIMO, MÍNIMO, SOMA, CONT.VALORES
- D) CONT.SE, MÁXIMO, MÍNIMO, MÉDIA, SOMA
- E) SOMA, MÍNIMO, MÁXIMO, MÉDIA, MÉDIA

**Gabarito:** B

---
