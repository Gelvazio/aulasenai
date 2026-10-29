# Aula 04 — Operação de Impressoras 3D

**Matéria:** Oficinas de Impressão 3D e Robótica · **Curso:** Rio do Sul Mais Tech (UC 4)
**Carga horária:** 4 h · **Público:** alunos do 8º e 9º anos · **Modalidade:** presencial
**Conhecimentos da ementa:** 4 — Configurações de fatiamento (na prática: nivelamento, calibração e segurança)
**Capacidades:**
- **C2** — Compreender como as impressoras 3D funcionam (fatiamento, extrusão, camadas)
- **C4** — Entender princípios de design para impressão 3D (espessura de paredes, suportes, orientação)

**Estratégias:** operação de impressoras 3D; oficinas práticas; projetos práticos interdisciplinares.
**Prática da aula:** `../ATIVIDADES/ATIVIDADE-PRATICA-AULA-04.html`

---

## Indicadores

4. Nivela a mesa, acompanha as primeiras camadas e imprime a peça com segurança.

## Objetivos

Ao final da aula, o aluno será capaz de:
- seguir o roteiro de segurança na oficina de impressão;
- identificar as partes principais da impressora FDM;
- nivelar a mesa, carregar o filamento e calibrar a primeira camada;
- acompanhar as primeiras camadas e decidir quando parar a impressão;
- reconhecer falhas comuns e corrigi-las no fatiador.

## Roteiro da aula

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura e segurança | 20 min | Regras, riscos e organização da fila de impressão |
| Partes da impressora | 25 min | Bico, extrusor, mesa, eixos e painel |
| Preparação: nivelar e carregar filamento | 45 min | Demonstração e prática em grupos |
| Intervalo | 15 min | — |
| Impressão e primeiras camadas | 60 min | Impressão dos chaveiros em fila |
| Falhas comuns e correções | 40 min | Análise de peças com defeito |
| Fechamento e entrega | 35 min | Acabamento e verificação |
| Total | **240 min** | |

## Conteúdo

### 1. Segurança na oficina
- O **bico fica a cerca de 200 °C** e a mesa a 60 °C: nunca tocar com a impressora ligada ou logo após o uso.
- Cabelo preso, sem pulseiras ou cordões soltos perto das peças móveis.
- Operar **somente com o professor** presente; não abrir nem mexer na máquina em funcionamento.
- Manter o ambiente ventilado; retirar a peça com a mesa fria ou com espátula, longe do rosto.
- Fila de impressão: peças rápidas (até 30 minutos) primeiro; peças do projeto final por equipe.

### 2. Nivelamento, calibração e filamento
- **Nivelar a mesa:** ajustar a distância entre o bico e a mesa (a folha de papel deve ser arrastada com leve atrito).
- **Carregar o filamento:** aquecer o bico, inserir o filamento no extrusor e purgar até o plástico sair uniforme.
- **Calibrar a primeira camada:** deve sair achatada, uniforme e aderida; é a camada que decide o sucesso da peça.
- Limpar a mesa com álcool isopropílico para melhorar a aderência.

### 3. Acompanhar as primeiras camadas e corrigir falhas

| Sintoma | Provável causa | Correção |
|---|---|---|
| Peça solta da mesa ou cantos levantados (empenamento) | Mesa suja ou fria; pouca aderência | Limpar a mesa, aquecer, usar borda (brim) |
| Linhas separadas, falta de plástico | Bico alto demais ou entupido | Reajustar o nivelamento; limpar o bico |
| Fios entre partes (*stringing*) | Temperatura alta ou retração baixa | Reduzir temperatura e ajustar retração |
| Deslocamento de camadas | Correia solta ou velocidade alta | Conferir correias; reduzir velocidade |
| Suportes difíceis de remover | Orientação ruim | Reorientar a peça e refatiar |

Falha faz parte do aprendizado: a turma analisa a causa, corrige no fatiador e imprime de novo.

## Exemplo no contexto do curso

Em uma oficina de prototipagem de Rio do Sul, o técnico sempre observa os primeiros minutos da impressão: se a primeira camada falha, a impressão é interrompida na hora, economizando horas de filamento.

## Dinâmica

- **Objetivo:** imprimir a peça modelada (o chaveiro) com segurança.
- **Materiais:** impressoras FDM, filamento PLA, espátulas, álcool isopropílico, papel para nivelamento e luvas.
- **Passo a passo:**
  1. Conferir a segurança e a fila definida pelo professor.
  2. Nivelar a mesa e carregar o filamento.
  3. Enviar o G-code e acompanhar os primeiros minutos.
  4. Retirar a peça com a mesa fria e fazer o acabamento (remover rebarbas).
- **Fechamento:** cada aluno registra a configuração usada e o resultado.

## Situação-problema e entrega da aula

**Você, como aluno consultor,** foi chamado para descobrir por que a peça se soltou da mesa na impressão anterior e propor a correção.
**Entrega:** a peça impressa e uma ficha com configuração usada, falhas observadas e ajustes feitos.

## Verificação da aprendizagem

- Quais as três regras de segurança mais importantes na oficina?
- Por que a primeira camada é tão importante?
- Como corrigir o empenamento de uma peça?
- Qual configuração do fatiador reduz o fio entre partes?

## Recursos

- Ementa da matéria (`../EMENTA-CHALKIE-AI.md`), Módulo 3.
- Manual da impressora e roteiro de segurança.
- Slides: `../AULAS/AULA-04-SLIDES.pdf` (a ligar quando o professor publicar).
