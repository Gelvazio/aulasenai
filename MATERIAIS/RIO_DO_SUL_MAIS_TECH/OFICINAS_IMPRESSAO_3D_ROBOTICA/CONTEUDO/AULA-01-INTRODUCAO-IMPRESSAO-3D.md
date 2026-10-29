# Aula 01 — Introdução à Impressão 3D e Tecnologias

**Matéria:** Oficinas de Impressão 3D e Robótica · **Curso:** Rio do Sul Mais Tech (UC 4)
**Carga horária:** 4 h · **Público:** alunos do 8º e 9º anos · **Modalidade:** presencial
**Conhecimentos da ementa:** funcionamento da impressora 3D (Módulo 1; sem domínio numerado na UC do curso)
**Capacidades:**
- **C1** — Entender as diferenças entre as tecnologias de impressão: FDM, SLA e SLS
- **C2** — Compreender como as impressoras 3D funcionam (fatiamento, extrusão, camadas)

**Estratégias:** oficinas práticas de modelagem 3D; operação de impressoras 3D; projetos práticos interdisciplinares.
**Prática da aula:** `../ATIVIDADES/ATIVIDADE-PRATICA-AULA-01.html`

---

## Indicadores

1. Compara peças impressas em FDM, SLA e SLS e aponta as diferenças de acabamento.

## Objetivos

Ao final da aula, o aluno será capaz de:
- contar a história da manufatura aditiva e citar aplicações atuais;
- diferenciar FDM, SLA e SLS quanto a material, acabamento, custo e uso;
- explicar como a impressora cria uma peça camada por camada, por extrusão;
- descrever o caminho da peça: modelo, fatiamento, impressão e acabamento.

## Roteiro da aula

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura e combinados de segurança | 15 min | Apresentação da UC, regras da oficina e diagnóstico oral |
| Histórico e aplicações | 30 min | Linha do tempo e exemplos na indústria, saúde e educação |
| Tecnologias FDM, SLA e SLS | 45 min | Quadro comparativo e materiais |
| Intervalo | 15 min | — |
| Como a impressora cria camadas | 35 min | Extrusão, camadas e fatiamento |
| Prática: comparar peças impressas | 60 min | Análise de amostras em cada tecnologia |
| Situação-problema e fechamento | 30 min | Entrega da aula e verificação |
| Total | **240 min** | |

## Conteúdo

### 1. Histórico e aplicações da manufatura aditiva
- **Manufatura aditiva** é fabricar uma peça **adicionando material em camadas**, ao contrário da usinagem, que **retira** material de um bloco.
- Nos anos 1980 surgiram as primeiras máquinas, usadas para **prototipagem rápida**. Nos anos 1990 as tecnologias SLA e SLS se consolidaram na indústria.
- Nos anos 2000 e 2010, com a expiração de patentes, a FDM ficou barata e chegou a escolas, oficinas e à cultura *maker*.
- Hoje a peça pode ser feita **sob demanda**: um protótipo, uma peça de reposição ou um modelo personalizado.
- Aplicações: protótipos e gabaritos na indústria, peças de reposição, modelos de estudo em escolas, modelos anatômicos e próteses na saúde, joias e objetos de design.

### 2. FDM, SLA e SLS: diferenças, materiais e usos

| Característica | FDM | SLA | SLS |
|---|---|---|---|
| Como funciona | Plástico derretido sai por um bico e é depositado em camadas | Luz (laser ou tela) endurece resina líquida | Laser funde grãos de pó, camada por camada |
| Materiais | Filamentos: PLA, ABS, PETG, TPU | Resinas fotossensíveis | Pós, como nylon |
| Acabamento | Linhas de camada visíveis | Superfície lisa e detalhes finos | Superfície levemente granulada |
| Suportes | Necessários em partes suspensas | Necessários, depois retirados | Dispensa (o pó sustenta a peça) |
| Custo | Menor | Médio | Maior |
| Uso típico | Protótipos, peças didáticas, gabaritos | Miniaturas, joias, moldes, odontologia | Peças funcionais resistentes |

Materiais FDM mais comuns:
- **PLA:** fácil de imprimir, baixo custo, bom para estudo.
- **ABS:** mais resistente ao calor, exige mesa aquecida e ventilação.
- **PETG:** resistente e durável.
- **TPU:** flexível, para peças elásticas.

### 3. Funcionamento da impressora: fatiamento, extrusão e camadas
1. O modelo 3D é "cortado" por um programa chamado **fatiador** em dezenas ou centenas de camadas finas.
2. O fatiador gera o **G-code**, a lista de movimentos e temperaturas que a impressora segue.
3. Na FDM, o **extrusor** empurra o filamento até o **bico aquecido** (cerca de 200 °C para PLA), que deposita o plástico sobre a **mesa**.
4. Depois de cada camada, o bico sobe (ou a mesa desce) a **altura de camada** configurada, geralmente entre 0,1 e 0,3 mm.
5. As camadas se unem ao esfriar, formando a peça.

## Exemplo no contexto do curso

Uma oficina de manutenção da região precisa de uma peça de reposição de plástico que não é mais vendida. Em vez de esperar uma importação, a equipe modela a peça, imprime em FDM com PLA e testa o encaixe no mesmo dia.

## Dinâmica

- **Objetivo:** comparar peças feitas em cada tecnologia e apontar diferenças de acabamento.
- **Materiais:** amostras impressas em FDM, SLA e SLS (ou fotos ampliadas), régua, lupa e ficha de observação.
- **Passo a passo:**
  1. Em duplas, observar cada amostra e anotar: superfície, detalhes finos, cor e flexibilidade.
  2. Medir a altura aproximada das camadas visíveis na peça FDM.
  3. Preencher o quadro: tecnologia × acabamento × possível uso.
  4. Cada dupla apresenta uma conclusão em 1 minuto.
- **Fechamento:** o professor confirma o quadro comparativo e corrige conceitos.

## Situação-problema e entrega da aula

**Você, como aluno consultor,** foi chamado para indicar a tecnologia de impressão mais adequada a três pedidos: (a) um suporte de celular para a sala de aula, (b) uma miniatura com detalhes muito finos e (c) uma engrenagem resistente para um equipamento.
**Entrega:** quadro com a tecnologia escolhida para cada pedido, o material e a justificativa em duas frases.

## Verificação da aprendizagem

- Qual a diferença entre manufatura aditiva e usinagem?
- Cite uma vantagem e uma limitação de FDM, SLA e SLS.
- O que o fatiador entrega para a impressora?
- Por que peças FDM têm linhas visíveis na superfície?

## Recursos

- Ementa da matéria (`../EMENTA-CHALKIE-AI.md`), Módulo 1.
- Amostras impressas e fichas de observação.
- Slides: `../AULAS/AULA-01-SLIDES.pdf` (a ligar quando o professor publicar).
