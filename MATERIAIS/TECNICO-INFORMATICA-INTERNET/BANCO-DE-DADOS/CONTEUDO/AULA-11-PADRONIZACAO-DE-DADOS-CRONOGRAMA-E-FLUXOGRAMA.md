# Aula 11 — Padronização de Dados, Cronograma e Fluxograma

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 5.6 Padronização de dados · 6.2 Cronograma · 6.3 Fluxograma
- **Capacidades:** C3 — Aplicar os procedimentos de normalização e padronização de dados ·
  C1 — Reconhecer as demandas do cliente
- **Estratégias:** exposição dialogada, construção coletiva de padrão, prática com planilha e
  ferramenta de diagramas, fechamento da SA 1
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-11.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-11.md)

## Indicadores

- (8) Normaliza tabelas até a 3FN e padroniza nomes e tipos (C3).

## Objetivos

- Definir um **padrão de nomes** para tabelas, colunas e chaves.
- Padronizar **tipos e formatos** dos dados (datas, documentos, telefones, valores, textos).
- Criar **domínios** (listas fechadas de valores) para atributos como situação e turno.
- Montar o **cronograma** do projeto do banco (etapas, duração, dependências, responsáveis, marcos).
- Desenhar o **fluxograma** de um processo do sistema (matrícula), com os símbolos padrão.
- Fechar e apresentar a **SA 1**.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: 1FN, 2FN e 3FN (aula 10) |
| Exposição dialogada | 35 min | Padrão de nomes, tipos, formatos e domínios |
| Prática guiada | 25 min | Aplicar o padrão às tabelas normalizadas da escola |
| Intervalo | 15 min | — |
| Exposição | 30 min | Cronograma e fluxograma |
| Dinâmica | 30 min | "Fluxo da matrícula" (abaixo) |
| Prática em grupo (SA 1) | 70 min | Padrão aplicado + cronograma + fluxograma |
| Registro | 20 min | Apresentação da SA 1 e quiz de saída |

## Conteúdo

### 1. Por que padronizar
Sem padrão, cada pessoa escreve de um jeito ("DataNasc", "data_nascimento", "dt_nasc"), os dados
chegam em formatos diferentes ("09/10/26", "2026-10-09") e as consultas erram. A **padronização**
deixa o banco **previsível**, **legível** e mais fácil de integrar com o back-end.

### 2. Padrão de nomes (adotado na UC)

| Elemento | Regra | Exemplo |
|---|---|---|
| Tabela | minúsculas, **singular**, sem acento, palavras com `_` | `aluno`, `item_pedido` |
| Coluna | minúsculas, sem acento, `_` entre palavras, nome claro | `data_nascimento`, `valor_mensal` |
| Chave primária | `id` (ou `id_<tabela>`) | `id_aluno` |
| Chave estrangeira | `id_<tabela referenciada>` | `id_curso` em `turma` |
| Data / data e hora | prefixo ou sufixo claro | `data_matricula`, `criado_em` |
| Verdadeiro/falso | pergunta de sim/não | `ativo`, `pago` |
| Proibido | espaços, acentos, palavras reservadas do SQL, abreviações obscuras | ~~`Data Nasc`~~, ~~`order`~~, ~~`dtnsc`~~ |

### 3. Tipos e formatos padronizados

| Dado | Padrão | Por quê |
|---|---|---|
| Data | **AAAA-MM-DD** (tipo data) | Ordena e compara corretamente; a tela mostra dd/mm/aaaa |
| Data e hora | Tipo com fuso (`timestamptz`) | Horário de Brasília correto (aula 4) |
| CPF, CEP, telefone | **Só dígitos**, como texto | Mantém zeros à esquerda; a máscara é da tela |
| Valores em dinheiro | **Decimal** com 2 casas | Evita erros de arredondamento |
| Nomes | Texto sem abreviação, espaços extras removidos | Busca e ordenação corretas |
| E-mail | Minúsculas | Evita duplicidade "Ana@" × "ana@" |

### 4. Domínios (listas fechadas)
Atributos com poucos valores possíveis usam uma **lista fechada**, garantida no banco por CHECK ou
por uma tabela de apoio:
- `situacao` da matrícula: **ativa, trancada, concluida, cancelada**;
- `turno`: **manha, tarde, noite**.

Assim ninguém grava "Ativo", "ATIVA" e "atv" para a mesma coisa.

### 5. Dicionário de dados final
O dicionário de atributos (aula 7) é atualizado com os **nomes padronizados**, os **tipos**, os
**formatos** e os **domínios** — é ele que guia o SQL da aula 12.

### 6. Cronograma (6.2)
Lista as **etapas** do projeto com **duração**, **início e fim**, **dependências**,
**responsáveis** e **marcos** (entregas importantes). Pode ser uma tabela ou um gráfico de Gantt
simples numa planilha.

| Etapa | Depende de | Duração | Responsável | Marco |
|---|---|---|---|---|
| Escopo e requisitos | — | 1 semana | Grupo | Escopo aprovado |
| Entidades, atributos, relacionamentos | Escopo | 2 semanas | Ana e Bruno | — |
| DER e revisão | Relacionamentos | 1 semana | Grupo | DER validado |
| Normalização e padrão | DER | 1 semana | Carla | Modelo final |
| Scripts DDL e DML | Modelo final | 2 semanas | Davi e Ana | Banco criado |
| Procedimentos, triggers, segurança | Scripts | 2 semanas | Grupo | Banco pronto |
| Documentação técnica | Tudo | 1 semana | Grupo | Entrega final |

Dicas: começar pelas **dependências** (o que precisa estar pronto antes), deixar **folga** antes dos
marcos e **acompanhar** o realizado × planejado toda semana (gestão do tempo, 1.1).

### 7. Fluxograma (6.3)
Desenha os **passos de um processo** e as **decisões**, mostrando onde o banco é **consultado** ou
**gravado**.

| Símbolo | Significado |
|---|---|
| Oval (terminal) | Início / fim |
| Retângulo | Processo (ação) |
| Losango | Decisão (sim / não) |
| Paralelogramo | Entrada ou saída de dados |
| Cilindro | Banco de dados (consulta ou gravação) |
| Setas | Sentido do fluxo |

Fluxo da matrícula (resumo): Início → secretaria informa CPF → [banco] aluno existe? → não:
cadastrar aluno → escolher turma → [banco] turma tem vaga? → não: oferecer outra turma → sim:
gravar matrícula e parcelas [banco] → emitir comprovante → Fim.

## Exemplo no contexto do curso
O grupo da escola aplica o padrão: `Turma.Turno` vira `turma.turno` com domínio (manha, tarde,
noite); `CPF` com pontos vira `cpf` só com dígitos; `valor` vira `valor_mensal` decimal(10,2). O
cronograma mostra que os scripts só começam depois do modelo final, e o fluxograma revela uma
decisão esquecida: "o aluno é menor de idade? → cadastrar responsável".

## Dinâmica — Fluxo da matrícula (30 min, grupos de 4)
- **Objetivo:** representar o processo de matrícula com os símbolos padrão e ligar cada passo ao
  banco (C1, C3).
- **Materiais:** cartões com os símbolos (oval, retângulo, losango, paralelogramo, cilindro) e
  setas; descrição do processo contada pela "secretária" (professor).
- **Passo a passo:** (1) o grupo monta o fluxo na mesa; (2) marca com o cilindro os pontos em que o
  banco é consultado ou gravado e diz qual tabela; (3) procura uma decisão que faltou; (4) passa
  para a ferramenta de diagramas.
- **Fechamento:** os grupos comparam as decisões encontradas e atualizam os requisitos, se preciso.

## Situação-problema e entrega da aula
- **SA 1 (fechamento):** padrão de nomes e formatos aplicado às tabelas normalizadas (dicionário de
  dados final), domínios definidos, cronograma do projeto com dependências e marcos e fluxograma do
  processo de matrícula. Apresentação de 5 minutos por grupo.

## Verificação da aprendizagem
- Corrigir os nomes `Data Nasc`, `ValorMensal` e `order` para o padrão da UC.
- Dizer por que o CPF é guardado como texto só com dígitos.
- Dizer o que são dependências e marcos num cronograma.
- Desenhar os símbolos de decisão e de banco de dados do fluxograma.

## Recursos
Laboratório de informática, computador com acesso à internet, pacote de aplicativos de escritório
(planilha para o cronograma), plataforma de modelagem e diagramas (draw.io), kit multimídia e
slides `../AULAS/AULA-11-SLIDES.pdf` (apresentação, quando o professor publicar).
