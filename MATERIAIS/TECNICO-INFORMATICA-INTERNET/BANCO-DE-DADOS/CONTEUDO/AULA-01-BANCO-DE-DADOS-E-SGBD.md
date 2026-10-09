# Aula 01 — Banco de Dados e SGBD: Conceitos e Usos

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 4 Banco de dados · 4.1 Gerenciadores · 1.1 Gestão do tempo
- **Capacidades:** C4 — Reconhecer as características e funcionalidades do banco de dados ·
  C9 — Reconhecer os diferentes gerenciadores de bancos de dados
- **Estratégias:** exposição dialogada, análise de sistemas conhecidos, dinâmica em grupos, registro
  em mapa
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md)

## Indicadores

- (1) Explica o que é banco de dados e SGBD com exemplo de um sistema web (C4).

## Objetivos

- Diferenciar **dado**, **informação** e **banco de dados**.
- Explicar o que é um **SGBD** e o que ele faz por um sistema web.
- Reconhecer as funcionalidades de um SGBD: armazenar, consultar, controlar acesso, garantir
  integridade, permitir acesso simultâneo e recuperar falhas.
- Comparar o uso de **arquivos/planilhas** com o uso de um banco de dados.
- Identificar onde o banco de dados fica na **arquitetura de um sistema web** (front-end, back-end e
  banco).
- Conhecer os nomes dos principais gerenciadores (PostgreSQL, MySQL, SQL Server, Oracle, SQLite,
  MongoDB) e o SGBD usado na UC.
- Organizar o próprio tempo de estudo da UC (gestão do tempo, 1.1).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura | 15 min | Apresentação da UC: 20 aulas, SAs, avaliação e o projeto que acompanha a UC |
| Exposição dialogada | 45 min | Dado × informação; banco de dados; SGBD e suas funções; planilha × banco |
| Análise guiada | 30 min | Onde estão os dados de sistemas conhecidos (loja, banco, rede social, escola) |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Detetive dos dados" (abaixo) |
| Exposição | 35 min | Arquitetura web (cliente, servidor, banco); gerenciadores; PostgreSQL na UC |
| Prática autônoma | 50 min | Mapa dos dados de um sistema web + plano de estudos da UC |
| Registro | 20 min | Socialização dos mapas e quiz de saída |

## Conteúdo

### 1. Dado, informação e banco de dados
- **Dado** é um fato registrado, sem contexto: `"Ana"`, `17`, `2026-10-09`.
- **Informação** é o dado organizado e com sentido: "a aluna Ana, de 17 anos, matriculou-se em
  09/10/2026".
- **Banco de dados** é um **conjunto organizado de dados relacionados**, guardado de forma
  permanente, que pode ser consultado e atualizado por vários usuários e sistemas.

Exemplos do dia a dia: o cadastro de clientes de uma loja virtual, o histórico de pedidos, as
notas de uma escola, as mensagens de um aplicativo de conversa.

### 2. SGBD — Sistema Gerenciador de Banco de Dados
O **SGBD** é o **programa** que cria, guarda e gerencia o banco de dados. O sistema web nunca abre
o arquivo do banco direto: ele **pede** ao SGBD, que executa o pedido e devolve o resultado.

| Funcionalidade do SGBD | O que garante | Exemplo numa loja virtual |
|---|---|---|
| Armazenamento | Os dados ficam guardados mesmo se o servidor reiniciar | Pedidos de ontem continuam lá |
| Consulta | Encontrar dados rapidamente com filtros | "Pedidos do cliente 15 em outubro" |
| Integridade | Regras que impedem dados errados | Não aceitar preço negativo |
| Controle de acesso | Cada usuário só faz o que pode | O caixa vê pedidos, mas não altera preços |
| Concorrência | Vários usuários ao mesmo tempo sem bagunçar os dados | Duas pessoas comprando o último item |
| Recuperação (backup) | Voltar a um estado seguro depois de falha | Restaurar o banco após pane |

### 3. Planilha × banco de dados
Planilhas são ótimas para listas pequenas, mas um sistema web precisa de mais:

| Situação | Planilha | Banco de dados com SGBD |
|---|---|---|
| Vários usuários ao mesmo tempo | Conflito de versões | Controle de concorrência |
| Milhares de registros | Fica lenta | Índices e consultas rápidas |
| Regras (ex.: e-mail único) | Fácil de quebrar | Restrições garantidas pelo SGBD |
| Quem pode ver e alterar | Arquivo inteiro ou nada | Permissões por tabela e por ação |
| Integração com o sistema web | Manual | Conexão direta do back-end |

**Redundância:** quando o mesmo dado é copiado em vários lugares (ex.: o endereço do cliente
repetido em cada pedido), uma alteração esquecida gera **inconsistência**. O banco bem modelado
evita isso (aulas 6 a 11).

### 4. O banco de dados na arquitetura de um sistema web
```
Navegador (front-end)  →  Servidor da aplicação (back-end)  →  SGBD (banco de dados)
   tela de login           confere a senha, monta a consulta      guarda os usuários
```
- O **front-end** mostra a tela e envia o pedido.
- O **back-end** aplica as regras do negócio e conversa com o banco usando **SQL**.
- O **SGBD** executa o SQL e devolve as linhas.

O banco nunca deve ficar aberto direto para o navegador: quem acessa é o back-end, com usuário e
senha próprios (aula 19).

### 5. Tipos de banco e principais gerenciadores (4.1)
- **Relacional:** dados em **tabelas** (linhas e colunas) ligadas por chaves; linguagem **SQL**.
  Ex.: **PostgreSQL**, MySQL/MariaDB, SQL Server, Oracle, SQLite.
- **Não relacional (NoSQL):** documentos, chave-valor, grafos. Ex.: MongoDB, Redis.

Nesta UC usamos o **PostgreSQL**: gratuito, de código aberto, robusto e usado por serviços como o
Supabase. As características e requisitos de cada gerenciador são o tema da aula 2.

### 6. Tabela, linha e coluna (primeira visão)

| id | nome | email | cidade |
|---|---|---|---|
| 1 | Ana Souza | ana@exemplo.com | Rio do Sul |
| 2 | Bruno Lima | bruno@exemplo.com | Blumenau |

- **Tabela** = um assunto (clientes). **Coluna** (campo) = uma característica (nome, e-mail).
- **Linha** (registro) = um cliente. O **id** identifica cada linha sem repetição (chave primária,
  aula 13).

Primeira consulta, só para ver o SQL (a sintaxe é estudada na aula 15):

```sql
SELECT nome, cidade
FROM cliente
WHERE cidade = 'Rio do Sul';
```

### 7. Gestão do tempo na UC (1.1)
São 80 h e um projeto que cresce aula a aula. Cada estudante monta seu **plano de estudos**: o que
entregar em cada semana, quanto tempo reservar para revisar SQL e quando pedir ajuda. Atrasar a
modelagem (aulas 5 a 11) atrasa toda a construção do banco (aulas 12 a 20).

## Exemplo no contexto do curso
Uma loja virtual fictícia, a "Loja Ponto Web", guarda clientes, produtos, pedidos e pagamentos. Ao
clicar em "Finalizar compra", o front-end envia o carrinho; o back-end confere o estoque e grava o
pedido. O back-end aplica as regras de estoque e usa uma **transação** para não vender além do
disponível, e o SGBD mantém consistentes os registros de pedido e de pagamento quando os dois são
gravados no mesmo banco (um pagamento externo, como o do cartão, não entra sozinho nessa transação). Se a loja usasse uma planilha compartilhada, duas vendas ao
mesmo tempo poderiam apagar uma à outra.

## Dinâmica — Detetive dos dados (30 min, grupos de 4)
- **Objetivo:** perceber que todo sistema web depende de dados organizados e reconhecer as funções
  do SGBD (C4).
- **Materiais:** cartões com nomes de sistemas (loja virtual, app de banco, rede social, sistema da
  escola, app de entrega) e folha A3.
- **Passo a passo:** (1) cada grupo sorteia um sistema; (2) lista 5 "coisas" que o sistema precisa
  guardar e 3 dados de cada uma; (3) aponta 2 funcionalidades do SGBD que esse sistema não pode ficar
  sem (ex.: concorrência no app de banco); (4) apresenta em 2 minutos.
- **Fechamento:** o professor junta no quadro as funcionalidades citadas e mostra que todas
  aparecem na tabela do item 2.

## Situação-problema e entrega da aula
- **Entrega:** mapa dos dados de um sistema web escolhido (o que guarda, exemplo de dados, quem
  acessa, quais funções do SGBD precisa) + plano de estudos pessoal das 20 aulas.
- **Ligação com a UC:** o mapa é o primeiro passo do raciocínio que vira o modelo de dados nas
  aulas 5 a 11.

## Verificação da aprendizagem
- Diferenciar dado de informação com um exemplo próprio.
- Explicar por que o sistema web não grava direto num arquivo e usa um SGBD.
- Citar 3 funcionalidades do SGBD e uma situação em que cada uma é necessária.
- Classificar PostgreSQL, MongoDB e SQLite em relacional ou não relacional.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema operacional, kit multimídia,
sistema de gerenciamento de banco de dados (PostgreSQL), pacote de aplicativos de escritório e
slides `../AULAS/AULA-01-SLIDES.pdf` (apresentação, quando o professor publicar).
