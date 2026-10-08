# Atividade: Conceitos e Fundamentos do Excel — 12 Questões

- **Aula:** 02
- **Tema:** Conceitos e Fundamentos do Excel
- **Ícone:** 🖥️
- **Duração:** 90 minutos
- **Formato:** Múltipla escolha (A, B, C, D, E)
- **Total de questões:** 12
- **Pontuação:** 1 ponto por questão correta (total: 12 pontos)
- **Capacidade avaliada:** Reconhecer endereçamento de células em estrutura tabular; Identificar tipos de dados em contexto empresarial; Aplicar fórmula de multiplicação em cálculo de receita; Diferenciar referência relativa de absoluta em cálculos compartilhados; Aplicar função SOMA para total de vendas; Utilizar função MÁXIMO para identificar maior venda; Utilizar funções MÍNIMO e MÉDIA para análise; Calcular percentual de participação no faturamento total; Aplicar formatação de moeda para apresentação profissional; Entender cópia de fórmula com referências relativas; Reconhecer formatação profissional de tabela; Integrar múltiplas funções em análise de vendas
- **Conteúdo-base:** `—`
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)

> Fonte única extraída de ATIVIDADE-02-*.docx por scripts/extrair-atividades-docx.py. A linha
> **Gabarito** vem do GABARITO-ATIVIDADE-02-*.docx e NÃO é publicada (arquivo no .gitignore).

---

## ITEM 01 — Reconhecer endereçamento de células em estrutura tabular

**Contexto:**  
Uma loja de eletrônicos em Itajaí (Multitech Store) precisa criar um relatório mensal de vendas de janeiro de 2026. A gerente solicitou uma planilha para rastrear 5 produtos: Notebooks, Mouses, Teclados, Monitores e Webcams. A estrutura deve ter: Linha 1 (cabeçalhos) = A1:Produto, B1:Quantidade, C1:Preço Unitário, D1:Total da Venda, E1:% do Total. Linha 2 em diante = dados de cada produto.

**Comando:**  
Onde deve ser inserido o "Total da Venda" do Notebook (1º produto)?

**Alternativas:**
- A) A2 (coluna de produtos)
- B) D2 (coluna de totais)
- C) E2 (coluna de percentuais)
- D) C2 (coluna de preços)
- E) B2 (coluna de quantidade)

**Gabarito:** B

---

## ITEM 02 — Identificar tipos de dados em contexto empresarial

**Contexto:**  
Na planilha da Multitech: A2 contém "Notebook" (texto descritivo do produto), B2 contém 5 (quantidade - número inteiro que será multiplicado), C2 contém 3500 (preço unitário em reais - número que será multiplicado), D2 será preenchido com uma fórmula que CALCULA B2×C2.

**Comando:**  
Qual célula contém NÚMERO que PODE ser usado diretamente em cálculo matemático?

**Alternativas:**
- A) A2 "Notebook" (texto, não pode calcular)
- B) B2 e C2 (números que podem ser multiplicados)
- C) D2 (será calculada, não é número inicial)
- D) Nenhuma célula
- E) Todas as células

**Gabarito:** B

---

## ITEM 03 — Aplicar fórmula de multiplicação em cálculo de receita

**Contexto:**  
O Notebook tem: B2 = 5 unidades vendidas, C2 = R$ 3.500,00 por unidade. O valor total de vendas = Quantidade × Preço Unitário = 5 × 3.500 = R$ 17.500. Esta fórmula é a base de qualquer cálculo de receita em vendas.

**Comando:**  
Qual fórmula NO EXCEL calcula o "Total da Venda" em D2?

**Alternativas:**
- A) =B2+C2 (soma)
- B) =B2*C2 (multiplicação)
- C) =B2/C2 (divisão)
- D) =C2-B2 (subtração)
- E) =SOMA(B2:C2) (função soma)

**Gabarito:** B

---

## ITEM 04 — Diferenciar referência relativa de absoluta em cálculos compartilhados

**Contexto:**  
Para calcular o % do total, a fórmula em E2 divide o total do produto (D2) pelo total geral, que está em D7. Ao copiar a fórmula de E2 até E6, a célula D7 precisa continuar fixa; sem a trava, ela mudaria para D8, D9, D10 e D11 (células vazias).

**Comando:**  
Qual é a referência ABSOLUTA correta para travar a célula D7?

**Alternativas:**
- A) D7 (referência relativa, mudaria ao copiar)
- B) $D7 (semicongelada - não usual)
- C) D$7 (semicongelada - não usual)
- D) $D$7 (completamente absoluta)
- E) #D7 (sintaxe inválida)

**Gabarito:** D

---

## ITEM 05 — Aplicar função SOMA para total de vendas

**Contexto:**  
Totais de venda de cada produto: D2=17.500 (Notebook), D3=1.700 (Mouse), D4=2.250 (Teclado), D5=6.400 (Monitor), D6=3.000 (Webcam). O total geral (D7) deve somar todos esses valores com a função SOMA.

**Comando:**  
Qual é o resultado de =SOMA(D2:D6)?

**Alternativas:**
- A) 17.500 (só o notebook)
- B) 6.170 (média)
- C) 30.850 (soma total)
- D) 1.700 (só o mouse)
- E) 31.850

**Gabarito:** C

---

## ITEM 06 — Utilizar função MÁXIMO para identificar maior venda

**Contexto:**  
Totais de venda na coluna D: Notebook R$ 17.500 (D2), Mouse R$ 1.700 (D3), Teclado R$ 2.250 (D4), Monitor R$ 6.400 (D5) e Webcam R$ 3.000 (D6). A gerente quer destacar a maior receita do mês usando uma função.

**Comando:**  
=MÁXIMO(D2:D6) retorna qual valor?

**Alternativas:**
- A) 1.700 (menor venda)
- B) 3.000 (venda média)
- C) 6.400 (segunda maior)
- D) 17.500 (maior venda)
- E) 30.850 (total geral)

**Gabarito:** D

---

## ITEM 07 — Utilizar funções MÍNIMO e MÉDIA para análise

**Contexto:**  
Com os mesmos totais do Item 06 (D2:D6), a gerente quer saber a menor receita individual (MÍNIMO) e a receita média por produto (MÉDIA). Essas métricas ajudam a decidir quais produtos precisam de ação de venda.

**Comando:**  
=MÍNIMO(D2:D6) E =MÉDIA(D2:D6) retornam respectivamente:

**Alternativas:**
- A) 1.700 e 6.170
- B) 17.500 e 30.850
- C) 3.000 e 6.170 (mínimo da Webcam)
- D) 3.000 e 5.000
- E) Erro (funções incompatíveis)

**Gabarito:** A

---

## ITEM 08 — Calcular percentual de participação no faturamento total

**Contexto:**  
O Notebook faturou R$ 17.500 de um total de R$ 30.850. O percentual é calculado com =D2/$D$7 e a célula é formatada como Porcentagem com 2 casas decimais.

**Comando:**  
Qual é o percentual do Notebook no faturamento total?

**Alternativas:**
- A) 5,51%
- B) 20,75%
- C) 56,73%
- D) 9,72%
- E) 100,00%

**Gabarito:** C

---

## ITEM 09 — Aplicar formatação de moeda para apresentação profissional

**Contexto:**  
Em planilhas financeiras, números devem ser formatados como MOEDA (R$ 17.500,00) em vez de número comum (17500). Isto melhora legibilidade e deixa profissional. Formato: categoria "Moeda", símbolo "R$", 2 casas decimais.

**Comando:**  
Qual é o formato CORRETO para exibir R$ 17.500,00?

**Alternativas:**
- A) 17.500,00 (sem símbolo)
- B) $17.500,00 (símbolo $)
- C) R$ 17.500,00 (formato)
- D) R17.500 (símbolo malformado)
- E) 17500 (sem formatação)

**Gabarito:** C

---

## ITEM 10 — Entender cópia de fórmula com referências relativas

**Contexto:**  
A fórmula de D2 é =B2*C2, com referências relativas (sem $). A gerente vai arrastar a alça de preenchimento de D2 até D6 para calcular o total de cada produto.

**Comando:**  
Ao copiar a fórmula =B2*C2 de D2 para D3, qual será a nova fórmula?

**Alternativas:**
- A) =B2*C2 (fica igual - relativa não funciona)
- B) =B3*C3 (ajusta automaticamente)
- C) =$B$2*$C$2 (fixa tudo - não é cópia relativa)
- D) =B2*C3 (mistura - erro de lógica)
- E) Erro (fórmula não pode ser copiada)

**Gabarito:** B

---

## ITEM 11 — Reconhecer formatação profissional de tabela

**Contexto:**  
Uma planilha profissional tem: cabeçalhos em MAIÚSCULA (PRODUTO, QUANTIDADE...), fundo cinza ou azul, texto branco ou escuro, bordas pretas bem definidas, alinhamento consistente (texto à esquerda, números à direita). Isto transmite credibilidade ao gerente ou cliente que recebe o relatório.

**Comando:**  
Qual formatação NÃO é mencionada como padrão profissional?

**Alternativas:**
- A) Cabeçalhos em MAIÚSCULA
- B) Fundo cinza ou colorido
- C) Texto branco ou escuro
- D) Negrito E Itálico SIMULTÂNEO em todas as células
- E) Bordas pretas bem definidas

**Gabarito:** D

---

## ITEM 12 — Integrar múltiplas funções em análise de vendas

**Contexto:**  
Workflow correto: 1) Preparar dados (cabeçalhos, 5 produtos), 2) Inserir fórmulas de total por produto (×), 3) Somar total geral (SOMA), 4) Calcular percentuais de cada produto, 5) Criar tabela de métricas (MÁXIMO, MÍNIMO, MÉDIA), 6) Formatar tudo profissionalmente (cores, fontes, bordas). Esta sequência garante que dados são primeiro calculados, depois apresentados.

**Comando:**  
Qual é a sequência CORRETA de trabalho no Excel?

**Alternativas:**
- A) Formatação → Dados → Fórmulas (estético primeiro)
- B) Dados → Fórmulas → Formatação
- C) Fórmulas → Dados → Formatação (fórmulas antes de dados)
- D) Tudo ao mesmo tempo (confuso e propenso a erros)
- E) Não importa a ordem

**Gabarito:** B

---
