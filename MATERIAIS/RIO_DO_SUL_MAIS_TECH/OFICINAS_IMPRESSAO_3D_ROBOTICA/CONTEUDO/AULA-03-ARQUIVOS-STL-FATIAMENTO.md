# Aula 03 — Arquivos STL e Fatiamento

**Matéria:** Oficinas de Impressão 3D e Robótica · **Curso:** Rio do Sul Mais Tech (UC 4)
**Carga horária:** 4 h · **Público:** alunos do 8º e 9º anos · **Modalidade:** presencial
**Conhecimentos da ementa:** 3 — Geração de arquivo STL; 4 — Configurações de fatiamento
**Capacidades:**
- **C2** — Compreender como as impressoras 3D funcionam (fatiamento, extrusão, camadas)
- **C4** — Entender princípios de design para impressão 3D (espessura de paredes, suportes, orientação)

**Estratégias:** oficinas práticas de modelagem 3D; operação de impressoras 3D; projetos práticos interdisciplinares.
**Prática da aula:** `../ATIVIDADES/ATIVIDADE-PRATICA-AULA-03.html`

---

## Indicadores

3. Exporta o STL, configura o fatiador e estima o tempo e o material gastos.

## Objetivos

Ao final da aula, o aluno será capaz de:
- exportar um modelo do Tinkercad em formato STL;
- explicar o que é um arquivo STL;
- configurar altura de camada, preenchimento e temperatura no fatiador;
- aplicar princípios de design para impressão: paredes, suportes e orientação;
- estimar o tempo e o material gastos pelo chaveiro.

## Roteiro da aula

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura e revisão da Aula 2 | 15 min | Conferência dos chaveiros modelados |
| Arquivo STL | 30 min | O que é, como exportar e como verificar |
| Configurações de fatiamento | 55 min | Camada, preenchimento, temperatura, velocidade |
| Intervalo | 15 min | — |
| Design para impressão | 35 min | Paredes, suportes e orientação |
| Prática: fatiar o chaveiro | 60 min | Estimar tempo e material |
| Fechamento e entrega | 30 min | Comparação de resultados e verificação |
| Total | **240 min** | |

## Conteúdo

### 1. Geração de arquivo STL
- **STL** é um formato que descreve a superfície do objeto como uma **malha de triângulos**. Não guarda cor nem unidade: a escala é conferida no fatiador.
- No Tinkercad: botão **Exportar** e escolha de **.STL**. Exporte somente a peça final, agrupada.
- Antes de exportar: conferir medidas, que a peça está apoiada no plano de trabalho e que não há formas soltas.

### 2. Configurações de fatiamento
O **fatiador** (por exemplo, Cura ou PrusaSlicer) transforma o STL em G-code.

| Parâmetro | O que controla | Valor típico (PLA, bico 0,4 mm) |
|---|---|---|
| Altura de camada | Qualidade da superfície e tempo | 0,2 mm (0,1 mm = mais fino e mais lento) |
| Preenchimento | Resistência e material gasto | 15% a 20% |
| Temperatura do bico | Fluidez do plástico | 200 °C a 210 °C |
| Temperatura da mesa | Aderência da primeira camada | 55 °C a 60 °C |
| Velocidade | Tempo × qualidade | 40 a 60 mm/s |
| Paredes (perímetros) | Resistência externa | 2 a 3 voltas |

Regra prática: **camada mais fina = mais tempo**; **mais preenchimento = mais material e mais peso**.

### 3. Design para impressão
- **Espessura de paredes:** pelo menos o dobro do diâmetro do bico (cerca de 0,8 mm) e, para peças que sofrem esforço, 1,2 mm ou mais.
- **Orientação:** imprimir com a **maior face plana sobre a mesa**; camadas são mais fracas entre si do que ao longo delas.
- **Suportes:** estruturas provisórias para partes suspensas com inclinação acima de cerca de 45°. Deixam marcas e gastam material. Reorientar a peça pode evitá-los.
- **Aderência:** uma borda (*brim*) ajuda peças com pouca base.

## Exemplo no contexto do curso

Uma pequena indústria de Rio do Sul precisa de 20 etiquetas de identificação de caixas. Ao escolher camada de 0,3 mm e 10% de preenchimento, o tempo de impressão cai pela metade sem perder a função.

## Dinâmica

- **Objetivo:** fatiar o chaveiro e estimar tempo e material.
- **Materiais:** STL do chaveiro, computadores com o fatiador instalado e ficha de comparação.
- **Passo a passo:**
  1. Exportar o chaveiro em STL e abrir no fatiador.
  2. Conferir as medidas e a orientação.
  3. Fatiar com camada de 0,2 mm e preenchimento de 15%; anotar tempo e gramas de filamento.
  4. Repetir com camada de 0,1 mm e com preenchimento de 40%; comparar.
- **Fechamento:** a turma escolhe a combinação com melhor equilíbrio entre qualidade e tempo.

## Situação-problema e entrega da aula

**Você, como aluno consultor,** precisa informar à escola quanto tempo e quanto filamento serão gastos para imprimir os chaveiros da turma.
**Entrega:** tabela com tempo e gramas estimados em três configurações e a recomendação justificada.

## Verificação da aprendizagem

- O que um arquivo STL guarda e o que não guarda?
- Qual o efeito de diminuir a altura de camada?
- Quando usar suporte e como evitá-lo?
- Por que a orientação da peça influencia a resistência?

## Recursos

- Ementa da matéria (`../EMENTA-CHALKIE-AI.md`), Módulo 3.
- Fatiador (Cura ou PrusaSlicer) e STL do chaveiro.
- Slides: `../AULAS/AULA-03-SLIDES.pdf` (a ligar quando o professor publicar).
