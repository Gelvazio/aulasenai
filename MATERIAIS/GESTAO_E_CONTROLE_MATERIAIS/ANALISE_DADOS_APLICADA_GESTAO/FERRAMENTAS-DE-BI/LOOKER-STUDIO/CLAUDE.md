# 📊 Guia de Uso do Looker Studio

**Disciplina:** Análise de Dados Aplicada à Gestão · SENAI
**Ferramenta:** Google Looker Studio (ex-Data Studio) — gratuita, usa apenas conta Google pessoal
**Material complementar:** [index.html](index.html) — exemplos interativos de dashboards

---

## 1. O que é o Looker Studio

O Looker Studio é a ferramenta de Business Intelligence gratuita do Google para criar **relatórios e dashboards visuais** a partir de planilhas, bancos de dados e outras fontes, sem precisar programar.

**Por que usar em sala:**
- ✅ 100% gratuito, sem limite de relatórios
- ✅ Funciona com login pessoal do Gmail (não exige conta corporativa, ao contrário de ferramentas como Microsoft Fabric)
- ✅ Interface de arrastar e soltar
- ✅ Conecta direto com Google Sheets — ótimo para os exercícios de Excel/planilhas já usados na UC

---

## 2. Passo a passo: acessar

1. Acesse **lookerstudio.google.com**
2. Faça login com sua conta Google (pessoal ou institucional)
3. Clique em **"Criar" → "Relatório"**
4. Aceite os termos de uso na primeira vez

---

## 3. Passo a passo: conectar uma fonte de dados

1. Na tela de criação, escolha o conector **Google Sheets** (mais comum em sala)
2. Selecione a planilha e a aba desejada
3. Clique em **"Adicionar"** e confirme em **"Adicionar ao relatório"**
4. O Looker Studio detecta automaticamente os tipos de campo (texto, número, data) — revise em **"Recurso → Gerenciar fontes de dados"** se algum campo vier incorreto

**Outras fontes suportadas:** CSV (upload direto), Google BigQuery, Google Analytics, banco de dados via conectores de parceiros.

---

## 4. Passo a passo: criar seu primeiro gráfico

1. Na barra de ferramentas, clique em **"Adicionar um gráfico"**
2. Escolha o tipo: **barras** (comparar categorias), **linha** (evolução no tempo), **pizza** (proporção), **tabela** (dados detalhados)
3. Desenhe um retângulo no relatório para posicionar o gráfico
4. No painel direito, defina:
   - **Dimensão** → o que agrupa os dados (ex: categoria de material, mês)
   - **Métrica** → o valor numérico (ex: quantidade, valor em R$)
5. Ajuste cores e estilo na aba **"Estilo"** do painel

Veja um exemplo replicado em HTML/JS em [index.html](index.html).

---

## 5. Passo a passo: adicionar filtros e controles interativos

1. Menu **"Adicionar um controle" → "Controle de lista suspensa"**
2. Posicione no relatório e escolha o campo (ex: categoria)
3. O filtro passa a afetar todos os gráficos da mesma página automaticamente
4. Também é possível usar **"Controle de intervalo de datas"** para relatórios com séries temporais

---

## 6. Passo a passo: criar KPIs (indicadores-resumo)

1. Menu **"Adicionar um gráfico" → "Indicador"** (scorecard)
2. Defina a métrica (ex: total de itens em estoque, valor total)
3. Ative **"Comparar período anterior"** para mostrar variação percentual
4. Combine 3–4 indicadores no topo do dashboard para dar visão geral antes dos gráficos detalhados

---

## 7. Passo a passo: compartilhar e publicar

1. Clique em **"Compartilhar"** (canto superior direito)
2. Opções:
   - **Convidar por e-mail** — acesso restrito a pessoas específicas
   - **Copiar link** — qualquer pessoa com o link visualiza
   - **Incorporar relatório** — gera um `<iframe>` para embutir em outra página (como fizemos no exemplo do `index.html`)
3. Para embutir: **Arquivo → Incorporar relatório → Ativar incorporação** e copie o código gerado

---

## 8. Boas práticas de design de dashboard

| Prática | Por quê |
|---|---|
| KPIs no topo, gráficos detalhados abaixo | Leitura de cima para baixo, do geral ao específico |
| Máximo 5–7 elementos por página | Evita poluição visual |
| Paleta de cores consistente (2–3 cores principais) | Facilita associação visual rápida |
| Filtros sempre visíveis no topo/lateral | Usuário entende que pode interagir |
| Título e data de atualização visíveis | Dá contexto e credibilidade aos dados |

---

## 9. Exercício sugerido em sala

1. Cada aluno cria uma planilha Google Sheets com dados fictícios de estoque (produto, categoria, quantidade, valor unitário) — ou importa o dataset pronto [dados/estoque-materiais.csv](dados/estoque-materiais.csv) (120 linhas, 12 meses, 5 categorias; campos `data`, `categoria`, `produto`, `fornecedor`, `quantidade`, `valor_unitario`, `valor_total`, `estoque_minimo`, `situacao`)
2. Conecta a planilha no Looker Studio
3. Cria: 1 KPI de valor total em estoque, 1 gráfico de barras por categoria, 1 filtro por categoria
4. Compartilha o link do relatório com o professor

---

## 10. Registro da atividade em sala: cartazes de ferramentas de análise (pasta `metricas/`)

**Data:** 22/09/2026 (fotos tiradas às 15h02)
**Turma:** Auxiliar de Logística
**Formato:** trabalho em grupos de 4 a 6 alunos, com as carteiras em círculo. Cada grupo fez à mão um cartaz em papel colorido (verde-água ou azul-claro), usando régua, lápis e pincel atômico preto e vermelho. No fim, os cartazes foram colados na parede da sala.

### 10.1 Cartazes produzidos

| # | Ferramenta | O que o cartaz mostra | Relação com BI / Looker Studio |
|---|---|---|---|
| 1 | **Análise SWOT** | Uma matriz 2×2 com os quadrantes **Pontos fortes**, **Pontos fracos**, **Oportunidades** e **Ameaças**, com o título "Análise SWOT" em letras grandes | Mostra fatores internos e externos. Pode virar uma **tabela** ou um conjunto de **indicadores** no painel |
| 2 | **Regressão Linear** (e **multivariada**) | Um gráfico de dispersão com pontos vermelhos e uma reta de tendência. Os pontos que ficam longe da reta são outliers. O cartaz traz "Auxiliar de Logística" no topo, "REGRESSÃO" em letras de grafite, "LINEAR" e "Multivariada", com a data 22-09-2026 e os nomes do grupo | No Looker Studio, corresponde ao **gráfico de dispersão** com a opção **linha de tendência** ativada |
| 3 | **Diagrama de Pareto** | Um gráfico de barras em ordem decrescente com a curva acumulada. As anotações "80%" e "20% variáveis" indicam a regra 80/20 | Corresponde a um **gráfico de barras com linha acumulada** (combinação), com as categorias ordenadas pela métrica |
| 4 | **Diagrama de Ishikawa** (espinha de peixe / causa e efeito) | O título, uma espinha central com uma seta até o efeito e ramificações rotuladas "causas" | Ajuda a organizar as **dimensões** (causas) antes de montar o painel |

### 10.2 Etapas registradas nas fotos

1. **Discussão em grupo:** os alunos definem o conteúdo antes de desenhar
2. **Rascunho a lápis:** usam régua para traçar os eixos e as letras vazadas (por exemplo, "DIAGRAMA DE" e a espinha do Ishikawa)
3. **Arte-final:** cobrem o desenho com pincel preto e destacam os pontos e títulos em vermelho
4. **Exposição:** os 4 cartazes ficam lado a lado na parede, na ordem SWOT → Regressão → Pareto → Ishikawa

### 10.3 Como usar este registro nas próximas aulas

- Retomar os cartazes como ponte para o Looker Studio: cada ferramenta desenhada à mão tem um tipo de gráfico equivalente no painel (dispersão, barras + linha, tabela)
- Exercício extra: montar um **Pareto** com [dados/estoque-materiais.csv](dados/estoque-materiais.csv), agrupando `valor_total` por `produto` em ordem decrescente e identificando os itens que somam cerca de 80% do valor
- Exercício extra: montar uma **dispersão** de `quantidade` × `valor_total` com linha de tendência, para mostrar a regressão linear aplicada ao estoque

> ⚠️ As fotos mostram alunos. Não publique as imagens da pasta `metricas/` fora do ambiente da turma sem autorização.

---

**Próximo passo:** abra [index.html](index.html) para ver uma simulação interativa desses mesmos conceitos (KPIs, gráficos e filtros) construída em HTML/JS, útil para quem ainda não tem uma fonte de dados real conectada.
