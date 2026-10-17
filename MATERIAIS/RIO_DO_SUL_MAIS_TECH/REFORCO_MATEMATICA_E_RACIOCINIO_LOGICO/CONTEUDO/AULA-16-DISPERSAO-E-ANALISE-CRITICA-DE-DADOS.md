# Aula 16 — Dispersão e Análise Crítica de Dados

- **Matéria:** UC 8 — Reforço Matemática e Raciocínio Lógico · Rio do Sul Mais Tech — SENAI
- **Módulo:** 7 — Tratamento da Informação (parte 3 de 3)
- **Carga horária:** 3 h (Módulo 7: 3 h) — última aula da matéria
- **Conhecimentos:** 7 — Tratamento da Informação: medidas de dispersão (amplitude e desvio padrão
  simples); análise de dados (tendências, padrões e anomalias); pensamento crítico sobre
  representações enganosas de dados
- **Capacidades:** C3 — Aplicar pensamento crítico e lógico, analisando situações e identificando
  soluções possíveis · C5 — Comunicar raciocínios e resultados, justificando procedimentos e
  soluções encontradas · C6 — Persistir na resolução de problemas, desenvolvendo resiliência
  diante de desafios matemáticos
- **Estratégias:** notícias com gráficos para análise crítica; detecção de manipulação visual de
  dados na mídia; dados reais ou simulados de clima, esportes e saúde
- **Slides:** [AULA-16-SLIDES.pdf](../AULAS/AULA-16-SLIDES.pdf)

## Indicadores

- 7.2 Calcula média, moda, mediana e amplitude corretamente.
- 7.3 Resolve problemas estatísticos de complexidade crescente.
- 7.5 Analisa criticamente apresentações de dados.

## Objetivos

- Calcular amplitude e desvio padrão simples e interpretar o que eles dizem.
- Identificar tendências, padrões e valores fora do padrão (anomalias) em um conjunto de dados.
- Reconhecer gráficos enganosos (eixo cortado, escala distorcida, amostra pequena).
- Retomar os 7 módulos da matéria em um desafio final.

## Roteiro da aula (3 h = 180 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 10 min | Correção das vendas da cantina (Aula 15) |
| Exposição dialogada 1 | 30 min | Amplitude, desvio padrão simples, tendências e anomalias |
| Prática guiada | 20 min | Comparar duas turmas com a mesma média e dispersões diferentes |
| Intervalo | 15 min | — |
| Exposição dialogada 2 | 20 min | Gráficos enganosos |
| Dinâmica | 40 min | "Caça ao gráfico enganoso" (abaixo) |
| Desafio final da matéria | 35 min | Situação-problema com um item de cada módulo |
| Registro e fechamento | 10 min | Autoavaliação: o que aprendi, o que ainda quero reforçar |

## Conteúdo

### 1. Por que a média não basta
Duas turmas tiveram média 7 na prova:
- Turma A: 7, 7, 6, 8, 7 → notas parecidas.
- Turma B: 2, 10, 4, 10, 9 → notas muito espalhadas.
A **dispersão** mostra o quanto os dados se afastam do centro.

### 2. Amplitude
Maior valor − menor valor. Turma A: 8 − 6 = **2**. Turma B: 10 − 2 = **8**.
É fácil de calcular, mas depende só dos extremos.

### 3. Desvio padrão simples
Mede a distância **média** dos dados até a média. Passo a passo para a Turma A (média 7):

| Nota | Desvio (nota − 7) | Desvio² |
|---|---|---|
| 7 | 0 | 0 |
| 7 | 0 | 0 |
| 6 | −1 | 1 |
| 8 | 1 | 1 |
| 7 | 0 | 0 |

Variância = soma dos desvios² ÷ quantidade = 2 ÷ 5 = 0,4. Desvio padrão = √0,4 ≈ **0,63**.
Na Turma B, a soma dos desvios² é 25 + 9 + 9 + 9 + 4 = 56 → variância 11,2 → desvio padrão ≈
**3,35**. Quanto **maior** o desvio padrão, mais espalhados estão os dados.

### 4. Tendências, padrões e anomalias
- **Tendência:** direção geral (subindo, caindo, estável) — vista no gráfico de linhas.
- **Padrão:** repetição (mais vendas às sextas, mais chuva no verão).
- **Anomalia:** valor fora do comum (a quinta-feira de festa da cantina, a volta de 58 s do robô).
  Antes de descartar, investigue a causa: pode ser erro de registro ou um fato real importante.

### 5. Gráficos enganosos

| Truque | Como identificar | Efeito |
|---|---|---|
| Eixo vertical cortado | O eixo não começa no zero | Diferença pequena parece enorme |
| Escala irregular | Intervalos diferentes no eixo | Tendência distorcida |
| Pictograma ampliado | Figura cresce em largura **e** altura | Aumento parece o dobro do real |
| Pizza que não soma 100% | Some os percentuais | Dados inventados ou incompletos |
| Amostra pequena | "9 em cada 10 aprovam" — de quantos? | Conclusão sem base |
| Correlação não é causa | Duas coisas sobem juntas | Sugere uma causa que não existe |

Exemplo: "Vendas sobem 50%!" em um gráfico com eixo de 98 a 102 — na verdade, foram de 99 para
101 unidades, cerca de **2%**.

## Exemplo no contexto do curso
Você, como aluno consultor, recebe dois fornecedores de sensores para a oficina de robótica. Ambos
têm vida útil média de 500 h. Fornecedor X: desvio padrão de 20 h. Fornecedor Y: desvio padrão de
180 h. Com Y, alguns sensores duram 300 h e outros 700 h — imprevisível. A recomendação é **X**,
pela menor dispersão, mesmo com a mesma média.

## Dinâmica — Caça ao gráfico enganoso (40 min, em grupos de 4)
- **Objetivo:** identificar manipulações em gráficos e reconstruí-los corretamente (C3, C5).
- **Materiais:** 6 gráficos simulados no estilo de notícias e propagandas (eixo cortado, pizza com
  110%, pictograma ampliado, amostra de 10 pessoas…), papel quadriculado.
- **Passo a passo:** (1) cada grupo recebe 3 gráficos; (2) identifica o truque de cada um;
  (3) calcula a diferença real com os dados; (4) redesenha **um** gráfico de forma honesta;
  (5) apresenta "antes e depois" para a turma.
- **Fechamento:** a turma cria um checklist de 5 perguntas para fazer diante de qualquer gráfico na
  internet.

## Situação-problema e entrega da aula (desafio final da matéria)
Você, como aluno consultor, apresenta à direção da escola um relatório sobre o consumo de água no
último semestre (m³ por mês): 42, 45, 44, 71, 46, 48. O m³ custa R$ 7,50.
**Entrega:**
1. Gasto total do semestre em reais (Módulo 1) e o gasto do mês de 71 m³ como fração e
   porcentagem do total (Módulo 2).
2. Se o consumo de 45 m³ atende 300 alunos, quantos m³ atenderiam 420 alunos? (Módulo 3)
3. Converta o consumo total para litros (Módulo 4).
4. Os meses sem a anomalia seguem um padrão? Descreva-o (Módulo 5).
5. Com a meta "consumo + 2 · (folga) ≤ 60", qual folga máxima é possível em um mês de 46 m³?
   (Módulo 6)
6. Média, mediana, amplitude e desvio padrão dos 5 meses sem a anomalia; gráfico de linhas dos 6
   meses e explicação do mês de 71 m³ (Módulo 7).

## Verificação da aprendizagem
- Calcule a amplitude e o desvio padrão de 4, 6, 6, 8.
- Um gráfico mostra a nota da turma subindo "muito", com eixo de 6,8 a 7,2. O que está errado?
- "Quem toma sorvete se afoga mais" — os dados sobem juntos no verão. Isso prova que sorvete causa
  afogamento? Explique.

## Recursos
Projetor, slides da aula, quadro, plataforma Chalkie AI (gráficos e dados reais), gráficos
impressos, papel quadriculado, calculadora e Chromebooks.
