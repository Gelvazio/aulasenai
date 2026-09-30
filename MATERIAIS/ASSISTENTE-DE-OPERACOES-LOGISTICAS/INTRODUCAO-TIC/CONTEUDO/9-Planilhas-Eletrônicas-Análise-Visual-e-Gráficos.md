# Aula 9 — Planilhas Eletrônicas: Análise Visual e Gráficos

Transformando tabelas brutas em decisões visuais precisas.

> Conteúdo extraído de `9-Planilhas-Eletrônicas-Análise-Visual-e-Gráficos.pdf` (43 slides). UC Introdução à TIC — Assistente de Operações Logísticas (SENAI).

---

## O Poder Oculto dos Dados

Uma tabela com mil linhas revela um padrão evidente em dois segundos ou apenas cansa seus olhos?

## Objetivos da Aula

1. Construir e personalizar **gráficos** para diferentes variáveis analíticas.
2. Aplicar **validação de dados** para garantir a integridade das entradas.
3. Montar **quadros demonstrativos** integrados a relatórios e apresentações.

## Vocabulário Essencial

| Termo | Definição |
|---|---|
| Gráfico | Representação visual de dados numéricos tabulares |
| Legenda | Guia visual que identifica cores ou séries representadas |
| Indicador | Métrica quantitativa para medir desempenho e metas |
| Validação | Regra lógica que restringe os dados aceitos nas células |

## Revisão: Fórmulas e Funções

- **SOMA:** totaliza intervalos. **MÉDIA:** calcula o valor central.
- **CONT.SE:** conta itens por critério. **SE:** aplica testes lógicos.
- Fórmulas e funções iniciam com `=`.

**Verificação:** a média de B2 até B15 é `=MÉDIA(B2:B15)`.

---

## A Necessidade da Representação Visual

Tabelas extensas armazenam registros, mas sobrecarregam o cérebro quando é preciso identificar padrões, discrepâncias ou tendências. O cérebro processa imagens muito mais rápido do que blocos de texto ou números.

🔑 Visualizações transformam dados abstratos em inteligência prática para líderes e equipes.

| Registro em tabela | Painel gráfico |
|---|---|
| Auditoria detalhada, armazenamento bruto e cálculos exatos célula a célula | Destaca gargalos, desvios e oportunidades em poucos segundos |

## Tipos de Gráficos

Escolher o gráfico errado compromete a leitura dos fatos. **A pergunta que você quer responder define o formato**, não a preferência estética.

| Tipo | Uso |
|---|---|
| **Colunas** | Comparar valores pontuais entre categorias distintas |
| **Linhas** | Evidenciar evolução contínua e tendências no tempo |
| **Barras** | Comparar muitas categorias ou rótulos longos |
| **Setores (pizza)** | Mostrar a composição proporcional de um todo |

## Gráfico de Linhas e Séries Temporais

- **Eixo X:** variável temporal. **Eixo Y:** magnitude dos valores.
- Permite comparar vários desempenhos simultâneos.

🔍 Monitoramento da temperatura de máquinas em um turno de 8 horas.

## O Cuidado com Gráficos de Pizza

- **Regra de ouro:** no máximo **5 fatias**.
- **Soma obrigatória:** as fatias somam **100%** do total.
- Evite comparações sutis: é difícil comparar áreas circulares.

⚠️ Com muitas divisões, use gráfico de barras.

**Aplicação:** para acompanhar o consumo de energia de uma fábrica mês a mês em 2024, o indicado é o **gráfico de linhas**.

## Passo a Passo: Inserindo um Gráfico

1. **Selecionar dados:** intervalo com cabeçalhos e valores.
2. **Menu Inserir:** escolher o tipo de gráfico.
3. **Ajustar eixos:** conferir categorias e séries.
4. **Elementos visuais:** títulos claros, rótulos e unidades.

## Anatomia de um Gráfico Técnico

Um gráfico profissional não deve depender de explicação verbal.

- **Título claro:** o que está sendo medido e o período.
- **Eixos X e Y:** rótulos de escala e unidades (R$, kg, un).
- **Rótulos de dados:** números no topo das colunas ou barras.
- **Linhas de grade:** guias suaves de leitura.

## Uso Estratégico da Legenda

- **Desnecessária:** gráfico com **uma única série** (ex.: Vendas 2024) — a legenda é redundante e polui.
- **Indispensável:** duas ou mais séries (ex.: Meta × Realizado) — identifica cada cor.

**V ou F:** "Todo gráfico precisa exibir legenda para ser tecnicamente correto." → **FALSO**.

---

## Quadros Demonstrativos (Tabelas-Resumo)

Antes do gráfico, estruture um quadro que condensa os dados brutos em agregadores claros.

🔍 Em vez de mapear 5.000 notas fiscais, o gráfico lê uma tabela-resumo com os totais por filial.

**Hierarquia visual do quadro:** cabeçalhos em negrito com fundo suave; textos à esquerda e números à direita; moeda com casas decimais consistentes.

## Validação de Dados

Um gráfico só é confiável se os dados forem precisos. Se um usuário digita "São Pauloo" e outro "SP", o software trata como duas cidades diferentes. A **validação de dados** impõe regras de entrada e impede erros de digitação.

| Modalidade | Exemplo |
|---|---|
| Lista suspensa | Seleção de itens pré-definidos (filiais, setores) |
| Intervalo numérico | Valores mínimo e máximo (ex.: notas de 0 a 10) |
| Limite de caracteres | Tamanho de códigos (ex.: CPF) |
| Filtro de datas | Bloquear datas futuras em relatórios |

**Lacunas:** para filiais usa-se **lista suspensa**; para notas, **intervalo numérico**.

## Indicadores (KPIs)

O profissional extrai diagnósticos dos gráficos:

- **Tendência:** o indicador cresce ou cai ao longo dos meses?
- **Aderência à meta:** a barra ultrapassou a linha de tolerância?
- **Variabilidade:** há oscilações bruscas que indicam instabilidade?

## Infográficos

Gráficos mostram dados; **infográficos contam histórias**: unem dados, ícones e textos, sintetizam fluxos e facilitam a comunicação entre setores.

## Cores e Acessibilidade

- ❌ Cores saturadas, tons aleatórios e contraste ruim cansam e excluem pessoas com **daltonismo**.
- ✅ Paletas com bom contraste, texturas auxiliares e rótulos diretos tornam a mensagem legível para todos.

## Integração com Textos e Slides

| Imagem estática | Objeto vinculado |
|---|---|
| Congela os dados do instante; não muda se a planilha mudar; histórico fixo | Sincronizado: se a planilha mudar, o relatório ou slide atualiza sozinho |

🔑 Colar como **vínculo de dados** faz qualquer atualização na planilha alterar o relatório.

---

## Como Gráficos Podem Enganar

- **Eixo truncado:** o eixo Y não começa no zero e exagera diferenças mínimas. Em colunas e barras, isso distorce gravemente as proporções.
- **Perspectiva 3D:** distorce ângulos; elementos em primeiro plano parecem maiores. Em documentos técnicos, **gráficos 2D** são a norma.

**Afirmações verdadeiras:** truncar o eixo sem aviso distorce as barras; efeitos 3D prejudicam a comparação. **Falsas:** a validação muda as cores das barras; pizza é boa para mais de vinte categorias.

## Sequência para Construir um Painel

1. Estruturar as regras de validação nas células de entrada.
2. Calcular os indicadores e montar o quadro-resumo.
3. Inserir o gráfico adequado a partir do quadro-resumo.
4. Formatar títulos, legendas e eixos e vincular ao relatório.

## Debate: Confiança nos Dados

Uma empresa de entregas mostrou que seu tempo médio é "metade do concorrente", mas o eixo Y começava em 28 minutos: a empresa entregava em 29 e o concorrente em 31. A diferença real é de **2 minutos**; o gráfico manipulado é má prática e destrói a credibilidade.

## Atividade Prática: Painel de Indicadores

Tabela com 10 atendimentos (ID, técnico, setor, tempo); lista suspensa no setor; média de tempo por setor com funções; gráfico de colunas 2D com título e eixos; gráfico colado com vínculo no slide.

## Revisão Final

| Pergunta | Resposta |
|---|---|
| Função da validação de dados? | Restringir e padronizar os dados aceitos, evitando erros de entrada |
| Por que o gráfico de linhas é indicado para séries temporais? | Conecta pontos cronológicos e evidencia tendências, quedas e picos |
| O que acontece ao colar com vínculo de dados? | O gráfico da apresentação se atualiza quando a planilha muda |

---

**Fonte:** Aula 9 — Planilhas Eletrônicas: Análise Visual e Gráficos · **Curso:** Assistente de Operações Logísticas · **UC:** Introdução à TIC · **SENAI**
