# Análise — Prova Prática (id 37) × Prova Prática 06-10-2026 (id 82)

- **Matéria:** Análise de Dados Aplicada à Gestão (Gestão e Controle de Materiais)
- **Gerado em:** 2026-10-06
- **Fonte:** perguntas lidas das páginas publicadas (`PROVA-PRATICA.html` e
  `PROVA-PRATICA-06-10-2026.html`) e cadastro no banco (tabela `atividade`). Sem gabarito nem
  padrão de resposta neste arquivo.

## 1. Visão geral

| Ponto | Prova Prática (id 37) | Prova Prática 06-10-2026 (id 82) |
|---|---|---|
| Página | `PROVA-PRATICA.html` | `PROVA-PRATICA-06-10-2026.html` |
| Questões / tópicos | 10 discursivas / 30 tópicos | 10 discursivas / 30 tópicos |
| Pontuação | 1,0 por questão (0,3 + 0,3 + 0,4) | 1,0 por questão (0,3 + 0,3 + 0,4) — igual |
| Capacidades | C2 nas questões 1–5; C1 nas 6–10 | C2 nas questões 1–4; C1 nas 5–10 |
| Aulas cobertas | 01, 02, 03, 04, 05 | 01, 02, 03, 04, 05 |
| Distribuição por aula | Aula 01: 2 · Aula 02: 3 · Aula 03: 1 · Aula 04: 2 · Aula 05: 2 | Aula 01: 2 · Aula 02: 2 · Aula 03: 2 · Aula 04: 2 · Aula 05: 2 |
| Ordem das aulas | Fora de ordem (Aula 04 aparece de novo na questão 10) | Em ordem crescente (01 → 05) |
| Estilo | Mais conceitual: pede "explique", "descreva" | Mais de cálculo: pede contas, resultados numéricos e "prova real" |

**Resumo:** as duas provas têm o mesmo formato (10 questões, 3 tópicos, 1 ponto cada) e cobrem as
mesmas 5 aulas. A de 06-10-2026 é **mais equilibrada** (2 questões por aula), **mais
quantitativa** (exige resultados numéricos e contas) e **mais longa de resolver**. Também cobre
conteúdos que a primeira não cobre: regra de três inversa e composta, volume e conversões, PA e
PG, margem, variância, precedência de operadores e CONT.NÚM/CONT.VALORES.

## 2. Comparação questão a questão

| Nº | Prova Prática (id 37) | Prova Prática 06-10-2026 (id 82) | O que muda |
|---|---|---|---|
| 1 | **Regra de três simples direta** (rolos de fita × dias) + arredondar caixas fechadas | **Regra de três inversa e composta** (conferentes × horas × volumes) + prova real da produtividade | A nova é bem mais difícil: duas regras de três, classificação de cada grandeza e prova real |
| 2 | **Área** útil do galpão, arranjo de paletes no piso, peso do palete | **Volume** (m³ → litros), conversão g → kg, arranjo de caixas **em 3 dimensões** no palete | Passa de área (2D) para volume (3D) e acrescenta conversão de unidades |
| 3 | **Porcentagem sobre porcentagem** (aumento de 15% + desconto de 4%, fatores) | **Variação percentual**, **margem** sobre receita × sobre custo, **PA × PG** (metas) | Muda o assunto: entram margem e progressões; sai o aumento/desconto em sequência |
| 4 | **Média, mediana e moda** com valor atípico | **Média, amplitude, variância e desvio padrão** calculados à mão | A nova exige a conta completa do desvio padrão (antes só se interpretava) |
| 5 | **Dispersão / desvio padrão** dos fornecedores (interpretação, sem conta obrigatória) | **Fórmulas, precedência e referência absoluta** (Excel, Aula 03) | O desvio padrão subiu para a questão 4; a 5 passa a ser Excel |
| 6 | **Fórmulas, referência absoluta ($) e SE** + soma do custo total | **SOMA, MÉDIA, CONT.NÚM, CONT.VALORES, MÁXIMO/MÍNIMO e SE** (com célula vazia e caso de empate 20 × 20) | A nova cobre mais funções básicas e pede os resultados |
| 7 | **Formatação condicional, validação por lista e proteção** | **Formatação condicional, validação por lista e validação de número inteiro (1 a 200)** | A proteção saiu desta questão (foi para a 8); entrou a validação numérica |
| 8 | **PROCV, SEERRO e ÍNDICE + CORRESP** | **Formatos, datas, congelar painéis, filtros e proteção** (Aula 04) | Os assuntos da 8 e da 10 trocaram de lugar |
| 9 | **SE aninhado, CONT.SE e SOMASE** | **PROCV (2 colunas), SEERRO devolvendo 0 e diagnóstico do #N/D** | A nova aprofunda o PROCV (número da coluna, por que devolver 0) |
| 10 | **Formatos, datas, congelar painéis e AutoFiltro** (Aula 04) | **ÍNDICE + CORRESP, CONT.SE, SOMASE e SE aninhado** com limites (5.000 / 1.000 / 999) | A nova junta as funções avançadas e cobra os casos de fronteira do SE |

## 3. Conteúdos que só aparecem em uma das provas

| Só na Prova Prática (id 37) | Só na Prova Prática 06-10-2026 (id 82) |
|---|---|
| Regra de três simples **direta** | Regra de três **inversa** e **composta**, prova real |
| Área útil e área do palete (m²) | Volume (m³), conversão m³ → litros e g → kg |
| Porcentagem sobre porcentagem (fatores de aumento e desconto) | Variação percentual, margem sobre receita e sobre custo |
| Mediana e moda | PA e PG (razão e 4º termo) |
| Função `=DESVPAD.P` citada | Variância e desvio padrão calculados à mão, amplitude |
| — | Precedência de operadores (`=B2*C2+F2` × `=B2*(C2+F2)`) |
| — | SOMA, MÉDIA com célula vazia, CONT.NÚM × CONT.VALORES, MÁXIMO/MÍNIMO |
| — | Validação de número inteiro (1 a 200) |
| — | Congelar linha **e** coluna ao mesmo tempo (em vez de só a linha) |
| — | Casos de fronteira do SE (empate 20 × 20; 5.000 / 1.000 / 999) |

## 4. Conteúdos que aparecem nas duas (com outra situação)

- Arranjo de paletes e limite de 1.000 kg (questão 2 nas duas).
- Desvio padrão e estoque de segurança na escolha de fornecedor/transportadora.
- Referência absoluta ($) e função SE com "Repor"/"OK".
- Formatação condicional do saldo abaixo do mínimo e validação por lista ligada ao Cadastro.
- Custo digitado como texto ("R$ ..."), porcentagem errada pelo botão %, vencimento = data + 30
  dias, congelar painéis e filtro de custo acima de R$ 1.000.
- Proteção das fórmulas deixando as células de entrada livres.
- PROCV + SEERRO + causas do #N/D, e ÍNDICE + CORRESP quando o dado está à esquerda.
- SE aninhado, CONT.SE ("EPI") e SOMASE ("Ferramentas").

## 5. Observações para o professor

- **Mesmo cenário repetido:** várias situações da prova de 06-10-2026 lembram muito a primeira
  (custo como texto, botão %, data + 30 dias, CONT.SE de "EPI", SOMASE de "Ferramentas"). Quem fez
  a primeira tem vantagem nessas partes.
- **Nível de dificuldade:** a de 06-10-2026 é mais difícil e mais longa (mais contas por tópico).
  Se as duas valerem para a mesma turma, convém considerar isso na comparação das notas.
- **Equilíbrio:** a de 06-10-2026 dá o mesmo peso (2 questões) a cada aula; a primeira dá 3
  questões à Aula 02 e só 1 à Aula 03.
