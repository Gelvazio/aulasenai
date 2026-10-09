# Aula 09 — Diagrama Entidade-Relacionamento (DER)

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 5.4 Diagrama entidade-relacionamento
- **Capacidades:** C2 — Aplicar os procedimentos do modelo de modelagem entidade-relacionamento ·
  S1 — Valorizar novos fatos, ideias e opiniões diferentes para resolução de problemas
- **Estratégias:** demonstração na ferramenta de modelagem, prática guiada, revisão em dupla,
  trabalho em grupo da SA 1
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09.md)

## Indicadores

- (7) Define cardinalidades 1:1, 1:N e N:N e desenha o DER (C2).
- (14) Acolhe sugestões do colega na revisão do modelo e do script (S1).

## Objetivos

- Reconhecer os **elementos** do DER e suas formas (entidade, atributo, identificador,
  relacionamento, cardinalidade, entidade fraca e associativa).
- Comparar a **notação de Chen** (conceitual) com a notação **pé de galinha** (usada no modelo
  lógico e nas ferramentas).
- Desenhar o DER a partir das listas de entidades, atributos e relacionamentos (aulas 6 a 8).
- Usar uma **ferramenta de modelagem** (brModelo ou draw.io).
- Conferir o DER com um **checklist de qualidade** e **revisar em dupla**, acolhendo sugestões.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: cardinalidades (aula 8) |
| Exposição dialogada | 35 min | Elementos e notações do DER; do conceitual ao lógico |
| Demonstração | 30 min | Desenho de um DER pequeno na ferramenta |
| Intervalo | 15 min | — |
| Prática em grupo (SA 1) | 65 min | DER do sistema de matrículas |
| Dinâmica | 30 min | "Revisão cruzada" (abaixo) |
| Ajustes | 30 min | Correções a partir da revisão |
| Registro | 20 min | Apresentação de um DER e quiz de saída |

## Conteúdo

### 1. Elementos do DER (notação de Chen)

| Elemento | Forma | Exemplo |
|---|---|---|
| Entidade | Retângulo | ALUNO |
| Entidade fraca | Retângulo de linha dupla | PARCELA |
| Atributo | Elipse ligada à entidade | nome |
| Identificador | Elipse com o nome **sublinhado** (ou bolinha preenchida no brModelo) | id_aluno |
| Atributo composto | Elipse ligada a outras elipses (as partes) | endereço → rua, número, bairro |
| Relacionamento | Losango com verbo | realiza |
| Cardinalidade | (mín, máx) junto a cada entidade | (0,N) |
| Entidade associativa | Retângulo envolvendo o losango | MATRÍCULA |

### 2. Notação pé de galinha (Crow's Foot)
Usada no **modelo lógico** (tabelas) e em ferramentas como draw.io, MySQL Workbench e pgAdmin
(ERD Tool):
- Cada entidade vira uma **caixa** com a lista de atributos; PK e FK indicadas.
- As linhas mostram a cardinalidade nas pontas: **traço** = 1, **círculo** = 0, **tridente** =
  muitos.
- O N:N aparece já **resolvido** pela tabela associativa.

| Situação | Chen | Pé de galinha |
|---|---|---|
| Um curso tem 0..N turmas | CURSO (1,1) —⟨oferece⟩— (0,N) TURMA | CURSO ‖——○< TURMA |
| Aluno N:N turma | ALUNO —⟨realiza⟩— TURMA com MATRÍCULA associativa | ALUNO ‖——○< MATRÍCULA >○——‖ TURMA |

### 3. Do conceitual ao lógico
- O DER **conceitual** (Chen) mostra o negócio, para validar com o cliente.
- O DER **lógico** (pé de galinha) mostra as **tabelas**, as **chaves primárias** e as **chaves
  estrangeiras**, preparando a **normalização** (aula 10) e o **SQL** (aula 12).

### 4. Passo a passo para desenhar
1. Colocar as **entidades fortes** principais no centro (ALUNO, TURMA, CURSO).
2. Ligar com os **relacionamentos** e escrever o **verbo**.
3. Marcar as **cardinalidades** (mín, máx) nos dois lados.
4. Acrescentar **entidades fracas** e **associativas**.
5. Acrescentar os **atributos**, sublinhando os **identificadores**.
6. Organizar o desenho para **não cruzar linhas**; nomes no singular e padronizados.
7. Conferir com o **checklist** (item 6) e com os **requisitos** do escopo.

### 5. Ferramentas
- **brModelo**: feito para ensino, desenha Chen e gera o modelo lógico.
- **draw.io (diagrams.net)**: gratuito, no navegador, com formas de ER e pé de galinha.
- **pgAdmin ERD Tool**: desenha o modelo lógico e gera o SQL para o PostgreSQL.

### 6. Checklist de qualidade do DER
- Todo requisito de dados do escopo aparece em alguma entidade ou atributo?
- Toda entidade tem **identificador**?
- Todo relacionamento tem **verbo** e **cardinalidade nos dois lados**?
- Todo N:N tem **associativa** (no modelo lógico)?
- Entidades fracas indicam a **dona**?
- Não há atributo **repetido** em duas entidades sem motivo (sinal de redundância)?
- O desenho é **legível** por quem não fez (o cliente consegue ler)?

### 7. Revisão em dupla (S1)
A revisão do DER por outra pessoa encontra erros que o autor não vê. Boas atitudes: o revisor
**pergunta** em vez de acusar ("este relacionamento é mesmo 1:1?"); o autor **escuta**, verifica nos
requisitos e **aceita ou justifica**; as mudanças são **registradas**.

## Exemplo no contexto do curso
DER do sistema de matrículas da escola de cursos livres fictícia: CURSO (1,1)—oferece—(0,N) TURMA;
ALUNO e TURMA ligados pela associativa MATRÍCULA (data, situação, nota_final); MATRÍCULA
(1,1)—gera—(1,N) PARCELA (fraca: número, vencimento, valor, data_pagamento); RESPONSÁVEL
(1,1)—responde por—(0,N) ALUNO; PROFESSOR e TURMA ligados pela associativa AULA_TURMA (dia da
semana, horário). Na revisão, a dupla vizinha pergunta: "onde fica o valor da mensalidade?". O
grupo percebe que faltava o atributo valor_mensal em CURSO e corrige.

## Dinâmica — Revisão cruzada (30 min, grupos em pares)
- **Objetivo:** revisar DER de outro grupo com respeito e aproveitar sugestões (C2, S1).
- **Materiais:** os DERs impressos ou na tela e o checklist do item 6.
- **Passo a passo:** (1) cada grupo recebe o DER de outro; (2) aplica o checklist e escreve até 5
  perguntas ou sugestões; (3) devolve e conversa 5 minutos; (4) o grupo autor registra o que aceitou
  e o que manteve, com o motivo.
- **Fechamento:** cada grupo conta uma sugestão recebida que melhorou o modelo.

## Situação-problema e entrega da aula
- **SA 1 (continuação):** DER do sistema de matrículas na ferramenta (Chen ou pé de galinha), com
  todas as entidades, atributos, identificadores e cardinalidades, mais o registro da revisão
  cruzada (sugestões aceitas e justificativas).

## Verificação da aprendizagem
- Desenhar as formas de entidade, entidade fraca, relacionamento e identificador.
- Converter "CURSO (1,1)—(0,N) TURMA" para a notação pé de galinha.
- Citar três itens do checklist de qualidade do DER.
- Dizer como reagir a uma sugestão de mudança no seu DER.

## Recursos
Laboratório de informática, computador com acesso à internet, plataforma de modelagem (brModelo,
draw.io ou pgAdmin ERD Tool), kit multimídia e slides `../AULAS/AULA-09-SLIDES.pdf` (apresentação,
quando o professor publicar).
