# Apostila — Banco de Dados

> **Curso:** Técnico em Informática para Internet · **Docente:** Gelvazio Camargo  
> **Módulo:** ESPECÍFICO II · **Modalidade:** Presencial  
> **Ementa:** EMENTA-CHALKIE-AI.md v2.0 — reescrita a partir da ementa oficial (2026-10-09)  
> **Carga horária da UC:** 80 horas · **Capítulos previstos:** 20 (1 capítulo = 1 aula de 4 horas)  
> **Autor:** Gelvazio Camargo · **Versão:** 1.0 · **Data e hora:** 16/10/2026 às 21:38  
> **Gerado em:** 17/10/2026, a partir de `APOSTILA/CONTEUDO/`.

> ✏️ **Este arquivo é a fonte final da apostila.** Revise, compare e acrescente dados aqui; o HTML é gerado depois, a partir dele. O sumário é refeito a cada geração.

---

## Sumário

<!-- sumario:inicio (gerado; atualizado a cada geração) -->
- [Ementa da matéria (texto oficial)](#ementa-da-matéria-texto-oficial)
  - [Justificativa](#justificativa)
  - [Função](#função)
  - [Objetivo geral](#objetivo-geral)
  - [Regra de bolso](#regra-de-bolso)
  - [Avaliação](#avaliação)
  - [Recursos e ambientes](#recursos-e-ambientes)
  - [Acessibilidade](#acessibilidade)
  - [Situações de aprendizagem](#situações-de-aprendizagem)
  - [Dificuldades comuns (e como tratar)](#dificuldades-comuns-e-como-tratar)
  - [Capacidades × conhecimentos (ementa)](#capacidades--conhecimentos-ementa)
  - [Regras para IA (seguidas na escrita da apostila)](#regras-para-ia-seguidas-na-escrita-da-apostila)
  - [Métricas](#métricas)
  - [Mapeamento BNCC](#mapeamento-bncc)
- [Plano de capítulos](#plano-de-capítulos)
  - [Aula 01 — Banco de dados e SGBD: conceitos e usos](#aula-01--banco-de-dados-e-sgbd-conceitos-e-usos)
  - [Aula 02 — Gerenciadores: características, requisitos e níveis](#aula-02--gerenciadores-características-requisitos-e-níveis)
  - [Aula 03 — Preparação do ambiente: instalação do PostgreSQL](#aula-03--preparação-do-ambiente-instalação-do-postgresql)
  - [Aula 04 — Configuração do SGBD e infraestrutura do sistema](#aula-04--configuração-do-sgbd-e-infraestrutura-do-sistema)
  - [Aula 05 — Demandas do cliente e escopo do projeto](#aula-05--demandas-do-cliente-e-escopo-do-projeto)
  - [Aula 06 — Entidades fortes, fracas e associativas](#aula-06--entidades-fortes-fracas-e-associativas)
  - [Aula 07 — Atributos](#aula-07--atributos)
  - [Aula 08 — Relacionamentos 1:1, 1:N e N:N](#aula-08--relacionamentos-11-1n-e-nn)
  - [Aula 09 — Diagrama entidade-relacionamento](#aula-09--diagrama-entidade-relacionamento)
  - [Aula 10 — Normalização de dados (1FN, 2FN e 3FN)](#aula-10--normalização-de-dados-1fn-2fn-e-3fn)
  - [Aula 11 — Padronização de dados, cronograma e fluxograma](#aula-11--padronização-de-dados-cronograma-e-fluxograma)
  - [Aula 12 — DDL: tabelas e campos](#aula-12--ddl-tabelas-e-campos)
  - [Aula 13 — DDL: relações, chaves e restrições](#aula-13--ddl-relações-chaves-e-restrições)
  - [Aula 14 — DML: inserção, atualização e exclusão](#aula-14--dml-inserção-atualização-e-exclusão)
  - [Aula 15 — DML: consultas com filtros e ordenação](#aula-15--dml-consultas-com-filtros-e-ordenação)
  - [Aula 16 — Consultas com junções, agrupamentos e subconsultas](#aula-16--consultas-com-junções-agrupamentos-e-subconsultas)
  - [Aula 17 — Procedimentos armazenados](#aula-17--procedimentos-armazenados)
  - [Aula 18 — Triggers (disparadores)](#aula-18--triggers-disparadores)
  - [Aula 19 — Segurança da informação: pilares, acesso e auditoria](#aula-19--segurança-da-informação-pilares-acesso-e-auditoria)
  - [Aula 20 — Projeto integrador: banco documentado para o back-end](#aula-20--projeto-integrador-banco-documentado-para-o-back-end)
- [Introdução](#introdução)
  - [Apresentação](#apresentação)
  - [Objetivo geral da unidade curricular](#objetivo-geral-da-unidade-curricular)
  - [Como a apostila está organizada](#como-a-apostila-está-organizada)
  - [Como estudar com esta apostila](#como-estudar-com-esta-apostila)
  - [Como você será avaliado](#como-você-será-avaliado)
  - [Ambientes, recursos e acessibilidade](#ambientes-recursos-e-acessibilidade)
  - [Situações de aprendizagem](#situações-de-aprendizagem-1)
- [Capacidades da matéria](#capacidades-da-matéria)
  - [Capacidades básicas](#capacidades-básicas)
  - [Capacidades socioemocionais](#capacidades-socioemocionais)
  - [Conhecimentos da unidade curricular](#conhecimentos-da-unidade-curricular)
  - [Capacidades × conhecimentos](#capacidades--conhecimentos)
  - [Capacidades por capítulo](#capacidades-por-capítulo)
- [Glossário](#glossário)
- [Referências](#referências)
- [Capítulo 01 — Banco de dados e SGBD: conceitos e usos](#capítulo-01--banco-de-dados-e-sgbd-conceitos-e-usos)
  - [Teoria](#teoria)
    - [Dado, informação e banco de dados](#dado-informação-e-banco-de-dados)
    - [SGBD: o programa que cuida do banco](#sgbd-o-programa-que-cuida-do-banco)
    - [Planilha × banco de dados](#planilha--banco-de-dados)
    - [O banco na arquitetura de um sistema web](#o-banco-na-arquitetura-de-um-sistema-web)
    - [Gerenciadores de banco de dados (4.1)](#gerenciadores-de-banco-de-dados-41)
    - [Tabela, linha e coluna: primeira visão](#tabela-linha-e-coluna-primeira-visão)
    - [Gestão do tempo na unidade curricular (1.1)](#gestão-do-tempo-na-unidade-curricular-11)
  - [Resumo](#resumo)
- [Capítulo 02 — Gerenciadores: características, requisitos e níveis](#capítulo-02--gerenciadores-características-requisitos-e-níveis)
  - [Teoria](#teoria-1)
    - [Características de um gerenciador (4.1.1)](#características-de-um-gerenciador-411)
    - [Transações e ACID](#transações-e-acid)
    - [Principais gerenciadores](#principais-gerenciadores)
    - [Requisitos de um gerenciador (4.1.2)](#requisitos-de-um-gerenciador-412)
    - [Comparação em tabela: PostgreSQL, MySQL, SQLite e MongoDB](#comparação-em-tabela-postgresql-mysql-sqlite-e-mongodb)
    - [Níveis de gerenciamento de dados (C6)](#níveis-de-gerenciamento-de-dados-c6)
    - [Como escolher o gerenciador](#como-escolher-o-gerenciador)
  - [Resumo](#resumo-1)
- [Capítulo 03 — Preparação do ambiente: instalação do PostgreSQL](#capítulo-03--preparação-do-ambiente-instalação-do-postgresql)
  - [Teoria](#teoria-2)
    - [Antes de instalar: checklist](#antes-de-instalar-checklist)
    - [Componentes do PostgreSQL](#componentes-do-postgresql)
    - [Roteiro de instalação no Windows](#roteiro-de-instalação-no-windows)
    - [Roteiro de instalação no Linux](#roteiro-de-instalação-no-linux)
    - [Conferindo a instalação no psql](#conferindo-a-instalação-no-psql)
    - [O serviço do PostgreSQL](#o-serviço-do-postgresql)
    - [Problemas comuns e soluções](#problemas-comuns-e-soluções)
    - [Boas práticas](#boas-práticas)
  - [Resumo](#resumo-2)
- [Capítulo 04 — Configuração do SGBD e infraestrutura do sistema](#capítulo-04--configuração-do-sgbd-e-infraestrutura-do-sistema)
  - [Teoria](#teoria-3)
    - [Onde ficam as configurações](#onde-ficam-as-configurações)
    - [Parâmetros básicos do postgresql.conf](#parâmetros-básicos-do-postgresqlconf)
    - [pg_hba.conf: quem pode entrar](#pg_hbaconf-quem-pode-entrar)
    - [Banco e usuário da aplicação](#banco-e-usuário-da-aplicação)
    - [Infraestrutura do sistema (C5)](#infraestrutura-do-sistema-c5)
    - [String de conexão e variáveis de ambiente](#string-de-conexão-e-variáveis-de-ambiente)
    - [Recarregar × reiniciar](#recarregar--reiniciar)
  - [Resumo](#resumo-3)
- [Capítulo 05 — Demandas do cliente e escopo do projeto](#capítulo-05--demandas-do-cliente-e-escopo-do-projeto)
  - [Teoria](#teoria-4)
    - [A situação de aprendizagem 1](#a-situação-de-aprendizagem-1)
    - [Demanda × necessidade](#demanda--necessidade)
    - [Técnicas de levantamento](#técnicas-de-levantamento)
    - [Requisitos de dados](#requisitos-de-dados)
    - [Regras de negócio que viram restrições](#regras-de-negócio-que-viram-restrições)
    - [Documento de escopo (6.1)](#documento-de-escopo-61)
    - [Mudança de escopo e justificativa das escolhas (S2)](#mudança-de-escopo-e-justificativa-das-escolhas-s2)
    - [Gestão do tempo nas entregas (1.1)](#gestão-do-tempo-nas-entregas-11)
  - [Resumo](#resumo-4)
- [Capítulo 06 — Entidades fortes, fracas e associativas](#capítulo-06--entidades-fortes-fracas-e-associativas)
  - [Teoria](#teoria-5)
    - [O modelo entidade-relacionamento (MER)](#o-modelo-entidade-relacionamento-mer)
    - [Entidade e ocorrência](#entidade-e-ocorrência)
    - [Entidade forte (5.1.2)](#entidade-forte-512)
    - [Entidade fraca (5.1.1)](#entidade-fraca-511)
    - [Entidade associativa (5.1.3)](#entidade-associativa-513)
    - [Dos requisitos às entidades: passo a passo](#dos-requisitos-às-entidades-passo-a-passo)
    - [Aplicando no pedido da escola](#aplicando-no-pedido-da-escola)
  - [Resumo](#resumo-5)
- [Capítulo 07 — Atributos](#capítulo-07--atributos)
  - [Teoria](#teoria-6)
    - [Atributo e valor](#atributo-e-valor)
    - [Quanto à estrutura: simples e composto](#quanto-à-estrutura-simples-e-composto)
    - [Quanto à função: descritivo, nominativo e referencial](#quanto-à-função-descritivo-nominativo-e-referencial)
    - [Identificador](#identificador)
    - [Dicionário de atributos](#dicionário-de-atributos)
    - [Aplicando na ficha da escola](#aplicando-na-ficha-da-escola)
    - [Erros comuns](#erros-comuns)
  - [Resumo](#resumo-6)
- [Capítulo 08 — Relacionamentos 1:1, 1:N e N:N](#capítulo-08--relacionamentos-11-1n-e-nn)
  - [Teoria](#teoria-7)
    - [Relacionamento](#relacionamento)
    - [Como descobrir a cardinalidade máxima](#como-descobrir-a-cardinalidade-máxima)
    - [Um para um: 1:1 (5.2.1)](#um-para-um-11-521)
    - [Um para muitos: 1:N (5.2.2)](#um-para-muitos-1n-522)
    - [Muitos para muitos: N:N (5.2.3)](#muitos-para-muitos-nn-523)
    - [Cardinalidade mínima (participação)](#cardinalidade-mínima-participação)
    - [Autorrelacionamento](#autorrelacionamento)
    - [Os relacionamentos da escola](#os-relacionamentos-da-escola)
    - [Erros comuns](#erros-comuns-1)
  - [Resumo](#resumo-7)
- [Capítulo 09 — Diagrama entidade-relacionamento](#capítulo-09--diagrama-entidade-relacionamento)
  - [Teoria](#teoria-8)
    - [Elementos do DER (notação de Chen)](#elementos-do-der-notação-de-chen)
    - [Notação pé de galinha](#notação-pé-de-galinha)
    - [Do conceitual ao lógico](#do-conceitual-ao-lógico)
    - [Passo a passo para desenhar](#passo-a-passo-para-desenhar)
    - [Checklist de qualidade do DER](#checklist-de-qualidade-do-der)
    - [O DER da escola](#o-der-da-escola)
    - [Revisão em dupla (S1)](#revisão-em-dupla-s1)
  - [Resumo](#resumo-8)
- [Capítulo 10 — Normalização de dados (1FN, 2FN e 3FN)](#capítulo-10--normalização-de-dados-1fn-2fn-e-3fn)
  - [Teoria](#teoria-9)
    - [Por que normalizar](#por-que-normalizar)
    - [A planilha "tudo junto" e as anomalias](#a-planilha-tudo-junto-e-as-anomalias)
    - [Dependência funcional](#dependência-funcional)
    - [Primeira forma normal (1FN)](#primeira-forma-normal-1fn)
    - [Segunda forma normal (2FN)](#segunda-forma-normal-2fn)
    - [Terceira forma normal (3FN)](#terceira-forma-normal-3fn)
    - [Resultado normalizado da escola](#resultado-normalizado-da-escola)
    - [Justificar as escolhas (S2) e quando não normalizar tudo](#justificar-as-escolhas-s2-e-quando-não-normalizar-tudo)
  - [Resumo](#resumo-9)
- [Capítulo 11 — Padronização de dados, cronograma e fluxograma](#capítulo-11--padronização-de-dados-cronograma-e-fluxograma)
  - [Teoria](#teoria-10)
    - [Por que padronizar (5.6)](#por-que-padronizar-56)
    - [Padrão de nomes adotado na unidade curricular](#padrão-de-nomes-adotado-na-unidade-curricular)
    - [Tipos e formatos padronizados](#tipos-e-formatos-padronizados)
    - [Domínios: listas fechadas](#domínios-listas-fechadas)
    - [Cronograma (6.2)](#cronograma-62)
    - [Fluxograma (6.3)](#fluxograma-63)
  - [Resumo](#resumo-10)
- [Capítulo 12 — DDL: tabelas e campos](#capítulo-12--ddl-tabelas-e-campos)
  - [Teoria](#teoria-11)
    - [A situação de aprendizagem 2](#a-situação-de-aprendizagem-2)
    - [SQL, DDL e DML](#sql-ddl-e-dml)
    - [Tipos de dados mais usados no PostgreSQL](#tipos-de-dados-mais-usados-no-postgresql)
    - [CREATE TABLE: tabelas e campos (3.1.1 e 3.1.2)](#create-table-tabelas-e-campos-311-e-312)
    - [Conferindo a estrutura](#conferindo-a-estrutura)
    - [ALTER TABLE: mudar a estrutura](#alter-table-mudar-a-estrutura)
    - [DROP TABLE: remover a tabela](#drop-table-remover-a-tabela)
    - [O script DDL](#o-script-ddl)
  - [Resumo](#resumo-11)
- [Capítulo 13 — DDL: relações, chaves e restrições](#capítulo-13--ddl-relações-chaves-e-restrições)
  - [Teoria](#teoria-12)
    - [Chave primária (PRIMARY KEY)](#chave-primária-primary-key)
    - [Chave estrangeira (FOREIGN KEY): as relações (3.1.3)](#chave-estrangeira-foreign-key-as-relações-313)
    - [Associativa com duas chaves estrangeiras](#associativa-com-duas-chaves-estrangeiras)
    - [ON DELETE: o que acontece com as linhas filhas](#on-delete-o-que-acontece-com-as-linhas-filhas)
    - [UNIQUE e CHECK](#unique-e-check)
    - [Nomeando e acrescentando restrições](#nomeando-e-acrescentando-restrições)
    - [Da regra de negócio à restrição](#da-regra-de-negócio-à-restrição)
    - [Lendo os erros](#lendo-os-erros)
  - [Resumo](#resumo-12)
- [Capítulo 14 — DML: inserção, atualização e exclusão](#capítulo-14--dml-inserção-atualização-e-exclusão)
  - [Teoria](#teoria-13)
    - [INSERT: inserir linhas (3.2.3)](#insert-inserir-linhas-323)
    - [Ordem de inserção](#ordem-de-inserção)
    - [UPDATE: alterar linhas (3.2.2)](#update-alterar-linhas-322)
    - [DELETE: excluir linhas (3.2.4)](#delete-excluir-linhas-324)
    - [O perigo do WHERE esquecido](#o-perigo-do-where-esquecido)
    - [TRUNCATE](#truncate)
    - [Carga de dados de teste](#carga-de-dados-de-teste)
  - [Resumo](#resumo-13)
- [Capítulo 15 — DML: consultas com filtros e ordenação](#capítulo-15--dml-consultas-com-filtros-e-ordenação)
  - [Teoria](#teoria-14)
    - [Estrutura básica do SELECT (3.2.1)](#estrutura-básica-do-select-321)
    - [Colunas, apelidos e cálculos](#colunas-apelidos-e-cálculos)
    - [WHERE e operadores](#where-e-operadores)
    - [Combinando condições](#combinando-condições)
    - [Ordenar e limitar](#ordenar-e-limitar)
    - [DISTINCT](#distinct)
    - [Funções simples](#funções-simples)
    - [As perguntas do cliente viram consultas](#as-perguntas-do-cliente-viram-consultas)
    - [Erros comuns](#erros-comuns-2)
  - [Resumo](#resumo-14)
- [Capítulo 16 — Consultas com junções, agrupamentos e subconsultas](#capítulo-16--consultas-com-junções-agrupamentos-e-subconsultas)
  - [Teoria](#teoria-15)
    - [Por que juntar tabelas](#por-que-juntar-tabelas)
    - [INNER JOIN](#inner-join)
    - [Três tabelas ou mais](#três-tabelas-ou-mais)
    - [LEFT JOIN](#left-join)
    - [Funções de agregação](#funções-de-agregação)
    - [GROUP BY e HAVING](#group-by-e-having)
    - [Subconsultas](#subconsultas)
    - [Escada de consultas: do simples ao relatório](#escada-de-consultas-do-simples-ao-relatório)
    - [O relatório da diretora](#o-relatório-da-diretora)
    - [Erros comuns](#erros-comuns-3)
  - [Resumo](#resumo-15)
- [Capítulo 17 — Procedimentos armazenados](#capítulo-17--procedimentos-armazenados)
  - [Teoria](#teoria-16)
    - [O que é um procedimento armazenado (3.2.5)](#o-que-é-um-procedimento-armazenado-325)
    - [Função × procedimento no PostgreSQL](#função--procedimento-no-postgresql)
    - [Estrutura de um bloco PL/pgSQL](#estrutura-de-um-bloco-plpgsql)
    - [Matricular só se houver vaga](#matricular-só-se-houver-vaga)
    - [Procedimento que atualiza](#procedimento-que-atualiza)
    - [Alterar, listar e remover](#alterar-listar-e-remover)
    - [Erros comuns](#erros-comuns-4)
  - [Resumo](#resumo-16)
- [Capítulo 18 — Triggers (disparadores)](#capítulo-18--triggers-disparadores)
  - [Teoria](#teoria-17)
    - [O que é um trigger (3.2.6)](#o-que-é-um-trigger-326)
    - [As três escolhas de um trigger](#as-três-escolhas-de-um-trigger)
    - [Duas peças no PostgreSQL: a função e o trigger](#duas-peças-no-postgresql-a-função-e-o-trigger)
    - [Trigger de histórico (AFTER): quem mudou a nota](#trigger-de-histórico-after-quem-mudou-a-nota)
    - [Trigger de validação (BEFORE): parcela paga não muda](#trigger-de-validação-before-parcela-paga-não-muda)
    - [Trigger, restrição ou procedimento?](#trigger-restrição-ou-procedimento)
    - [Listar, desligar e remover](#listar-desligar-e-remover)
    - [Erros comuns](#erros-comuns-5)
  - [Resumo](#resumo-17)
- [Capítulo 19 — Segurança da informação: pilares, acesso e auditoria](#capítulo-19--segurança-da-informação-pilares-acesso-e-auditoria)
  - [Teoria](#teoria-18)
    - [Os três pilares da segurança da informação (C12)](#os-três-pilares-da-segurança-da-informação-c12)
    - [Níveis hierárquicos de acesso e menor privilégio (C13)](#níveis-hierárquicos-de-acesso-e-menor-privilégio-c13)
    - [Controle de acesso (2.2): a matriz de acesso](#controle-de-acesso-22-a-matriz-de-acesso)
    - [Papéis (roles) no PostgreSQL](#papéis-roles-no-postgresql)
    - [GRANT e REVOKE (C14)](#grant-e-revoke-c14)
    - [Visão (VIEW): mostrar só o necessário](#visão-view-mostrar-só-o-necessário)
    - [Auditoria de acesso (2.3)](#auditoria-de-acesso-23)
    - [Boas práticas de segurança no banco (C14)](#boas-práticas-de-segurança-no-banco-c14)
  - [Resumo](#resumo-18)
- [Capítulo 20 — Projeto integrador: banco documentado para o back-end](#capítulo-20--projeto-integrador-banco-documentado-para-o-back-end)
  - [Teoria](#teoria-19)
    - [Do pedido do cliente ao banco pronto (C1)](#do-pedido-do-cliente-ao-banco-pronto-c1)
    - [A pasta do projeto e o script mestre (C7, C8)](#a-pasta-do-projeto-e-o-script-mestre-c7-c8)
    - [Documentação técnica (6.1, 6.2 e 6.3)](#documentação-técnica-61-62-e-63)
    - [Revisão do modelo: DER e normalização (C2, C3)](#revisão-do-modelo-der-e-normalização-c2-c3)
    - [Revisão do SQL: as consultas do back-end (C8)](#revisão-do-sql-as-consultas-do-back-end-c8)
    - [O contrato com o back-end (C14)](#o-contrato-com-o-back-end-c14)
    - [Teste de ponta a ponta, backup e restauração](#teste-de-ponta-a-ponta-backup-e-restauração)
    - [Revisão em pares e decisões justificadas (S1, S2)](#revisão-em-pares-e-decisões-justificadas-s1-s2)
  - [Resumo](#resumo-19)
<!-- sumario:fim -->

---

# Ementa da matéria (texto oficial)

Referência literal da ementa da matéria, para comparar com a apostila. Não editar aqui: quem muda é a ementa (e o `materia.json`).

## Justificativa

Toda aplicação para internet guarda dados: cadastros, pedidos, mensagens, notas. A UC ensina o estudante a entender o pedido do cliente, modelar os dados (entidade-relacionamento e normalização), preparar o gerenciador, criar e consultar o banco com SQL, automatizar regras com procedimentos e triggers e proteger os dados com controle de acesso e auditoria. Prepara para Codificação para Back-End, Desenvolvimento de APIs e Projeto de Back-End, que consomem o banco criado aqui.

## Função

● 2 - Desenvolver sistemas para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.

## Objetivo geral

Propiciar o desenvolvimento de capacidade básicas e socioemocionais que permitem realizar a interação entre a aplicação Back-End e um Banco de Dados, de acordo com a metodologia e padrão de qualidade, usabilidade, ergonomia, acessibilidade e segurança


## Regra de bolso

Regra de bolso: se um dado precisa ser corrigido em mais de um lugar, o modelo ainda não está normalizado.

## Avaliação

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: atividades das aulas 1–19 e SAs 1 e 2 | Aulas 1–19 | 60% | Correção, completude, organização dos scripts, prazo |
| Avaliação prática: banco completo de um caso fornecido | Aula 20 | 25% | DER · 3FN · DDL com chaves · 10 consultas · 1 procedimento · 1 trigger · permissões |
| Avaliação objetiva: modelagem, SQL, gerenciadores e segurança | Aulas 11 e 20 | 15% | Acertos; questões capacidade → contexto → comando |

**Nota final** = 60% contínua + 25% prática + 15% objetiva. **Aprovação:** nota final **≥ 7,0** e presença mínima de 75%. Cada capacidade recebe o parecer Desenvolvida / Em desenvolvimento / Não desenvolvida.

- **Recuperação:** (didático) refazer a avaliação não atingida com outro caso ou novo banco de questões, conforme o regimento da unidade SENAI.

| Nível | Nota | Descrição |
|---|---|---|
| Excelente | 9–10 | Modelo normalizado e rastreável ao requisito, scripts que rodam sem erro, segurança aplicada e decisões justificadas |
| Bom | 7–8 | Banco correto e funcionando, com pequenas falhas de padrão, consulta ou documentação |
| Aceitável | 5–6 | Cumpre o essencial com orientação; redundâncias ou restrições faltando |
| Insuficiente | 0–4 | Scripts que não rodam, modelo sem chaves ou sem relação com o pedido |

## Recursos e ambientes

- **Ambientes:** biblioteca, sala de aula, laboratório de informática, AVA com recursos de interatividade.
- **Equipamentos:** computador com a configuração adequada para a execução das atividades e acesso à internet, kit multimídia, IDE para desenvolvimento de sistemas, sistemas operacionais, pacote de aplicativos de escritório, sistema de gerenciamento de banco de dados.
- **Recursos didáticos:** livros, apostilas e revistas especializadas; manuais, normas e catálogos técnicos.
- **Ferramentas (didático):** PostgreSQL (SGBD da UC), psql e pgAdmin ou DBeaver, VS Code, ferramenta de DER (brModelo ou draw.io) e planilha para o cronograma.

## Acessibilidade

- **Oficial (ementa do curso):** Serão asseguradas as condições de acessibilidade, reconhecendo a especificidade e a peculiaridade do aluno com impedimentos de longo prazo, de natureza física, mental, intelectual e sensorial, levando-se em conta a(s) Norma(s) Regulamentadora(s) da ocupação, a Lei nº 13.146/2015, os Decretos nº 3298/2009 e 6949/2009, a LDB nº 9394/96 e a legislação específica em vigência da deficiência em questão.
- **Didático:** Zoom e alto contraste no cliente SQL, leitor de tela, scripts prontos para conferência, tempo estendido e duplas.
- **Resumo (ementa da matéria):** asseguradas as condições de acessibilidade ao aluno com impedimentos de longo prazo (Lei nº 13.146/2015, LDB nº 9394/96).

## Situações de aprendizagem

- SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.

## Dificuldades comuns (e como tratar)

- **Confundir entidade com atributo** → perguntar "isso tem dados próprios e se repete?"; se sim, é entidade.
- **N:N sem tabela associativa** → desenhar a tabela do meio com as duas chaves estrangeiras.
- **Normalizar por decoreba** → partir de uma planilha real com repetição e mostrar a anomalia.
- **UPDATE/DELETE sem WHERE** → rodar antes o SELECT com o mesmo filtro e usar transação.
- **Instalação travada (porta, senha, serviço)** → roteiro da aula 3 e conferência com `psql --version`.
- **Usar o superusuário na aplicação** → papel próprio só com as permissões necessárias.

## Capacidades × conhecimentos (ementa)

- C1 Demandas do cliente → 6.1
- C2 Modelagem ER → 5.1–5.4
- C3 Normalização e padronização → 5.5–5.6
- C4–C6 Características, infraestrutura e níveis → 4.1
- C7 DDL → 3.1
- C8 DML → 3.2
- C9 Gerenciadores → 4.1
- C10–C11 Instalar e configurar → 4.2
- C12–C14 Segurança → 2
- S1/S2 → 1.1, 6

## Regras para IA (seguidas na escrita da apostila)

1. Capacidades e conhecimentos **[oficial]** não podem ser alterados, ampliados nem reduzidos.
2. Carga horária é 80h em 20 aulas de 4h; não criar aulas nem pesos além das Seções IV e V.
3. O título "Capacidades Técnicas" da ementa do curso aparece sem itens: esta UC não tem capacidades técnicas.
4. SGBD padrão: PostgreSQL; SQL deve rodar nele, com o resultado esperado informado.
5. Contextualizar em sistemas web reais (escola, loja, clínica); empresas sempre fictícias; nunca dados pessoais reais.
6. Integrar S1 e S2 na revisão do modelo em dupla e na justificativa das escolhas.

## Métricas

- 80%+ dos estudantes com nota ≥ 7,0
- 100% entregam o banco do projeto integrador rodando.

## Mapeamento BNCC

- **CG2 Pensamento científico e crítico** — aulas 5 a 11: análise do pedido, hipótese de modelo e verificação de anomalias
- **CG5 Cultura digital** — aulas 3 a 19: SGBD, SQL e ferramentas de modelagem
- **CG4 Comunicação** — aulas 9 e 20: DER, dicionário de dados e documentação técnica
- **CG9 Empatia e cooperação** — aulas 9 e 20: revisão do modelo em dupla
- **CG10 Responsabilidade** — aula 19 e todas: cuidado com dados pessoais (LGPD) e gestão do tempo (1.1)

---

# Plano de capítulos

Cada capítulo corresponde a **uma aula de 4 horas** da unidade curricular.

| Capítulo | Aula | Tema | Carga horária | Situação |
|---|---|---|---|---|
| 01 | 01 | Banco de dados e SGBD: conceitos e usos | 4 h | ✅ Incluído |
| 02 | 02 | Gerenciadores: características, requisitos e níveis | 4 h | ✅ Incluído |
| 03 | 03 | Preparação do ambiente: instalação do PostgreSQL | 4 h | ✅ Incluído |
| 04 | 04 | Configuração do SGBD e infraestrutura do sistema | 4 h | ✅ Incluído |
| 05 | 05 | Demandas do cliente e escopo do projeto | 4 h | ✅ Incluído |
| 06 | 06 | Entidades fortes, fracas e associativas | 4 h | ✅ Incluído |
| 07 | 07 | Atributos | 4 h | ✅ Incluído |
| 08 | 08 | Relacionamentos 1:1, 1:N e N:N | 4 h | ✅ Incluído |
| 09 | 09 | Diagrama entidade-relacionamento | 4 h | ✅ Incluído |
| 10 | 10 | Normalização de dados (1FN, 2FN e 3FN) | 4 h | ✅ Incluído |
| 11 | 11 | Padronização de dados, cronograma e fluxograma | 4 h | ✅ Incluído |
| 12 | 12 | DDL: tabelas e campos | 4 h | ✅ Incluído |
| 13 | 13 | DDL: relações, chaves e restrições | 4 h | ✅ Incluído |
| 14 | 14 | DML: inserção, atualização e exclusão | 4 h | ✅ Incluído |
| 15 | 15 | DML: consultas com filtros e ordenação | 4 h | ✅ Incluído |
| 16 | 16 | Consultas com junções, agrupamentos e subconsultas | 4 h | ✅ Incluído |
| 17 | 17 | Procedimentos armazenados | 4 h | ✅ Incluído |
| 18 | 18 | Triggers (disparadores) | 4 h | ✅ Incluído |
| 19 | 19 | Segurança da informação: pilares, acesso e auditoria | 4 h | ✅ Incluído |
| 20 | 20 | Projeto integrador: banco documentado para o back-end | 4 h | ✅ Incluído |

## Aula 01 — Banco de dados e SGBD: conceitos e usos

- **Carga horária:** 4 h · **Domínios:** 4 · 4.1 · 1.1 · **Capacidades:** C4, C9
- **Atividade / entrega:** Mapa dos dados de um sistema web
- **BNCC:** CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 4 Banco de dados
- 4.1 Gerenciadores
- 1.1 Gestão do tempo

**Indicadores de desempenho:**

- Explica o que é banco de dados e SGBD com exemplo de um sistema web

**Termos oficiais do glossário (ementa):**

- **SGBD:** programa que guarda e gerencia os dados

## Aula 02 — Gerenciadores: características, requisitos e níveis

- **Carga horária:** 4 h · **Domínios:** 4.1.1–4.1.2 · **Capacidades:** C4, C6, C9
- **Atividade / entrega:** Quadro comparativo de SGBDs
- **BNCC:** CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 4.1.1 Características
- 4.1.2 Requisitos

**Indicadores de desempenho:**

- Compara gerenciadores (relacional e não relacional) por características e requisitos

**Ideias da ementa para exemplos e exercícios:**

- Compare PostgreSQL, MySQL, SQLite e MongoDB em características e requisitos, em tabela.

## Aula 03 — Preparação do ambiente: instalação do PostgreSQL

- **Carga horária:** 4 h · **Domínios:** 4.2.1 · **Capacidades:** C10, C11
- **Atividade / entrega:** PostgreSQL instalado e testado
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 4.2 Preparação de ambiente de banco de dados
- 4.2.1 Instalação

**Indicadores de desempenho:**

- Instala e configura o PostgreSQL e conecta por cliente gráfico e terminal

**Ideias da ementa para exemplos e exercícios:**

- Escreva o roteiro de instalação do PostgreSQL no Windows e no Linux, com a conferência no psql.

## Aula 04 — Configuração do SGBD e infraestrutura do sistema

- **Carga horária:** 4 h · **Domínios:** 4.2.2 · **Capacidades:** C5, C10, C11
- **Atividade / entrega:** Banco, usuário e conexão configurados
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 4.2.2 Configuração

**Indicadores de desempenho:**

- Instala e configura o PostgreSQL e conecta por cliente gráfico e terminal
- Liga o banco à infraestrutura do sistema (servidor, porta, usuário, back-end)

## Aula 05 — Demandas do cliente e escopo do projeto

- **Carga horária:** 4 h · **Domínios:** 6.1 · 1.1 · **Capacidades:** C1, S2
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** Documento de escopo e requisitos de dados
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 6.1 Escopo do projeto
- 1.1 Gestão do tempo

**Indicadores de desempenho:**

- Transforma o pedido do cliente em requisitos de dados e escopo
- Justifica escolhas de modelagem e de segurança com base nos requisitos

## Aula 06 — Entidades fortes, fracas e associativas

- **Carga horária:** 4 h · **Domínios:** 5.1 · **Capacidades:** C2
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** Lista de entidades do caso
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5.1 Entidades: 5.1.1 Fracas · 5.1.2 Fortes · 5.1.3 Associativas

**Indicadores de desempenho:**

- Identifica entidades fortes, fracas e associativas e seus atributos

**Ideias da ementa para exemplos e exercícios:**

- A partir do pedido de uma escola fictícia de cursos livres, liste as entidades, os atributos e os relacionamentos com cardinalidade.

**Termos oficiais do glossário (ementa):**

- **Entidade:** objeto do mundo real com dados próprios

## Aula 07 — Atributos

- **Carga horária:** 4 h · **Domínios:** 5.3 · **Capacidades:** C2
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** Dicionário de atributos
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5.3 Atributos: 5.3.1 Simples · 5.3.2 Composto · 5.3.3 Descritivo · 5.3.4 Nominativo · 5.3.5 Referencial

**Indicadores de desempenho:**

- Identifica entidades fortes, fracas e associativas e seus atributos

**Termos oficiais do glossário (ementa):**

- **Atributo:** característica de uma entidade

## Aula 08 — Relacionamentos 1:1, 1:N e N:N

- **Carga horária:** 4 h · **Domínios:** 5.2 · **Capacidades:** C2
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** Cardinalidades justificadas
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5.2 Relacionamento: 5.2.1 Um para um · 5.2.2 Um para muitos · 5.2.3 Muitos para muitos

**Indicadores de desempenho:**

- Define cardinalidades 1:1, 1:N e N:N e desenha o DER

**Termos oficiais do glossário (ementa):**

- **Cardinalidade:** quantos de um lado se ligam ao outro

## Aula 09 — Diagrama entidade-relacionamento

- **Carga horária:** 4 h · **Domínios:** 5.4 · **Capacidades:** C2, S1
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** DER do caso revisado em dupla
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG4 Comunicação, CG9 Empatia e cooperação, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5.4 Diagrama entidade-relacionamento

**Indicadores de desempenho:**

- Define cardinalidades 1:1, 1:N e N:N e desenha o DER
- Acolhe sugestões do colega na revisão do modelo e do script

## Aula 10 — Normalização de dados (1FN, 2FN e 3FN)

- **Carga horária:** 4 h · **Domínios:** 5.5 · **Capacidades:** C3, S2
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** Tabelas na 3FN
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5.5 Normalização de dados

**Indicadores de desempenho:**

- Normaliza tabelas até a 3FN e padroniza nomes e tipos
- Justifica escolhas de modelagem e de segurança com base nos requisitos

**Ideias da ementa para exemplos e exercícios:**

- Mostre uma planilha de matrículas com repetição e normalize passo a passo até a 3FN, explicando cada anomalia.

**Termos oficiais do glossário (ementa):**

- **Normalização:** retirar repetições e dependências erradas

## Aula 11 — Padronização de dados, cronograma e fluxograma

- **Carga horária:** 4 h · **Domínios:** 5.6 · 6.2 · 6.3 · **Capacidades:** C1, C3
- **Situação-problema:** SA 1 — Modelagem do banco de um sistema web (aulas 5–11). Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **Atividade / entrega:** Padrão de nomes + cronograma + fluxograma
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5.6 Padronização de dados
- 6.2 Cronograma
- 6.3 Fluxograma

**Indicadores de desempenho:**

- Normaliza tabelas até a 3FN e padroniza nomes e tipos

## Aula 12 — DDL: tabelas e campos

- **Carga horária:** 4 h · **Domínios:** 3.1.1–3.1.2 · **Capacidades:** C7
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Script CREATE TABLE
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.1 Linguagem de definição de dados: 3.1.1 Tabelas · 3.1.2 Campos

**Indicadores de desempenho:**

- Cria tabelas, campos, chaves e restrições com DDL

**Termos oficiais do glossário (ementa):**

- **DDL:** comandos que criam a estrutura

## Aula 13 — DDL: relações, chaves e restrições

- **Carga horária:** 4 h · **Domínios:** 3.1.3 · **Capacidades:** C7
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Script com PK, FK e restrições
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.1.3 Relações

**Indicadores de desempenho:**

- Cria tabelas, campos, chaves e restrições com DDL

**Ideias da ementa para exemplos e exercícios:**

- Crie o script DDL de alunos, cursos e matrículas com chaves primária e estrangeira, NOT NULL, UNIQUE e CHECK.

**Termos oficiais do glossário (ementa):**

- **Chave primária (PK):** identifica cada linha
- **Chave estrangeira (FK):** liga uma tabela a outra

## Aula 14 — DML: inserção, atualização e exclusão

- **Carga horária:** 4 h · **Domínios:** 3.2.2–3.2.4 · **Capacidades:** C8
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Carga de dados de teste
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.2 Linguagem de manipulação de dados: 3.2.2 Atualização · 3.2.3 Inserção · 3.2.4 Exclusão

**Indicadores de desempenho:**

- Insere, atualiza, exclui e consulta dados com DML

**Termos oficiais do glossário (ementa):**

- **DML:** comandos que mexem nos dados

## Aula 15 — DML: consultas com filtros e ordenação

- **Carga horária:** 4 h · **Domínios:** 3.2.1 · **Capacidades:** C8
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** 15 consultas resolvidas
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.2.1 Consulta

**Indicadores de desempenho:**

- Insere, atualiza, exclui e consulta dados com DML

## Aula 16 — Consultas com junções, agrupamentos e subconsultas

- **Carga horária:** 4 h · **Domínios:** 3.2.1 · **Capacidades:** C8
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Relatórios em SQL
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.2.1 Consulta

**Indicadores de desempenho:**

- Insere, atualiza, exclui e consulta dados com DML

**Ideias da ementa para exemplos e exercícios:**

- Gere 15 consultas SQL em níveis crescentes (filtro, ordenação, junção, agrupamento, subconsulta) com o resultado esperado.

## Aula 17 — Procedimentos armazenados

- **Carga horária:** 4 h · **Domínios:** 3.2.5 · **Capacidades:** C8
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Procedimento de uma regra do negócio
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.2.5 Procedimentos armazenados

**Indicadores de desempenho:**

- Cria procedimento armazenado e trigger para uma regra do negócio

**Ideias da ementa para exemplos e exercícios:**

- Escreva um procedimento armazenado em PL/pgSQL que matricula um aluno só se houver vaga.

**Termos oficiais do glossário (ementa):**

- **Procedimento armazenado:** rotina guardada no banco

## Aula 18 — Triggers (disparadores)

- **Carga horária:** 4 h · **Domínios:** 3.2.6 · **Capacidades:** C8
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Trigger de histórico e validação
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 3.2.6 Triggers (disparadores)

**Indicadores de desempenho:**

- Cria procedimento armazenado e trigger para uma regra do negócio

**Ideias da ementa para exemplos e exercícios:**

- Crie um trigger que grava em tabela de histórico toda alteração de nota, com usuário e data.

**Termos oficiais do glossário (ementa):**

- **Trigger:** rotina disparada por um evento

## Aula 19 — Segurança da informação: pilares, acesso e auditoria

- **Carga horária:** 4 h · **Domínios:** 2 · 2.1–2.3 · **Capacidades:** C12, C13, C14
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Papéis, permissões e log de auditoria
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 2 Segurança da informação: 2.1 Pilares (2.1.1 Integridade · 2.1.2 Disponibilidade · 2.1.3 Confidencialidade) · 2.2 Controle de acesso · 2.3 Auditoria de acesso

**Indicadores de desempenho:**

- Aplica pilares, níveis de acesso e auditoria com papéis e permissões

**Ideias da ementa para exemplos e exercícios:**

- Monte papéis e GRANT/REVOKE com o mínimo de permissões para a aplicação, a secretaria e o professor.

**Termos oficiais do glossário (ementa):**

- **Auditoria:** registro de quem acessou ou alterou o quê.

## Aula 20 — Projeto integrador: banco documentado para o back-end

- **Carga horária:** 4 h · **Domínios:** 6 · 3 · 5 · **Capacidades:** C1, C2, C3, C7, C8, C14, S1, S2
- **Situação-problema:** SA 2 — Banco pronto para o back-end (aulas 12–20). O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.
- **Atividade / entrega:** Documentação técnica + banco completo
- **BNCC:** CG4 Comunicação, CG9 Empatia e cooperação, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 6 Documentação técnica: 6.1 Escopo do projeto · 6.2 Cronograma · 6.3 Fluxograma
- 3 Linguagem de consulta de banco de dados (revisão)
- 5 Modelo entidade-relacionamento (revisão)

**Indicadores de desempenho:**

- Justifica escolhas de modelagem e de segurança com base nos requisitos
- Acolhe sugestões do colega na revisão do modelo e do script

---

# Introdução

## Apresentação

Toda aplicação para internet guarda dados: cadastros, pedidos, mensagens, notas. Esta apostila
acompanha a unidade curricular **Banco de Dados** do curso **Técnico em Informática para
Internet** (Módulo Específico II, 80 h, presencial). Nela você aprende a entender o pedido do
cliente, modelar os dados (entidade-relacionamento e normalização), preparar o gerenciador, criar e
consultar o banco com SQL, automatizar regras com procedimentos e triggers e proteger os dados com
controle de acesso e auditoria.

Ao longo dos capítulos, **você, como aluno consultor**, foi chamado para ajudar uma escola de cursos
livres que quer trocar as planilhas por um **sistema web de matrículas**. Primeiro você modela o
banco (aulas 5 a 11); depois cria, carrega, consulta, automatiza e protege esse banco no
**PostgreSQL**, o SGBD da unidade curricular (aulas 12 a 20). O que você constrói aqui é usado em
Codificação para Back-End, Desenvolvimento de APIs e Projeto de Back-End.

## Objetivo geral da unidade curricular

Propiciar o desenvolvimento de capacidades básicas e socioemocionais que permitem realizar a
interação entre a aplicação Back-End e um Banco de Dados, de acordo com a metodologia e padrão de
qualidade, usabilidade, ergonomia, acessibilidade e segurança.

## Como a apostila está organizada

São **20 capítulos, um para cada aula de 4 horas**. Cada capítulo começa com as capacidades da
aula, traz a teoria com exemplos em SQL que rodam no PostgreSQL e termina com um resumo e o
glossário dos termos novos. As atividades (objetivas e práticas) ficam no sistema de atividades da
turma, não na apostila.

| Parte | Capítulos | O que você faz |
|---|---|---|
| Fundamentos e ambiente | 1 a 4 | Entende banco de dados e SGBD, compara gerenciadores, instala e configura o PostgreSQL |
| Modelagem (SA 1) | 5 a 11 | Levanta as demandas, desenha o DER, normaliza até a 3FN e documenta |
| SQL e automação (SA 2) | 12 a 18 | Cria tabelas e chaves (DDL), manipula e consulta dados (DML), procedimentos e triggers |
| Segurança e projeto | 19 e 20 | Papéis, permissões e auditoria; banco documentado para o back-end |

## Como estudar com esta apostila

Leia o capítulo perto da aula e **rode os exemplos** no seu PostgreSQL: SQL se aprende digitando.
Antes de um `UPDATE` ou `DELETE`, rode o `SELECT` com o mesmo filtro. Revise o resumo no fim de
cada capítulo e consulte o glossário sempre que encontrar um termo novo.

## Como você será avaliado

| Instrumento | Momento | Peso |
|---|---|---|
| Avaliação contínua: atividades das aulas 1–19 e SAs 1 e 2 | Aulas 1–19 | 60% |
| Avaliação prática: banco completo de um caso fornecido | Aula 20 | 25% |
| Avaliação objetiva: modelagem, SQL, gerenciadores e segurança | Aulas 11 e 20 | 15% |

A aprovação exige **nota final ≥ 7,0** e presença mínima de 75%. Cada capacidade recebe o parecer
Desenvolvida, Em desenvolvimento ou Não desenvolvida. **Recuperação:** refazer a avaliação não
atingida com outro caso ou novo banco de questões, conforme o regimento da unidade SENAI.

## Ambientes, recursos e acessibilidade

Sala de aula, laboratório de informática, biblioteca e AVA. As ferramentas são o **PostgreSQL**, o
**psql** (terminal) e o **pgAdmin** ou o **DBeaver** (cliente gráfico), o **VS Code**, uma
ferramenta de DER (brModelo ou draw.io) e uma planilha para o cronograma. Se precisar, peça ao
professor zoom e alto contraste no cliente SQL, leitor de tela, scripts prontos para conferência,
tempo estendido ou trabalho em dupla.

## Situações de aprendizagem

- **SA 1 — Modelagem do banco de um sistema web (aulas 5 a 11):** a escola quer trocar planilhas
  por um sistema web de matrículas. Você levanta as demandas, define o escopo, desenha o DER,
  normaliza até a 3FN, padroniza os nomes e entrega o cronograma e o fluxograma da matrícula.
- **SA 2 — Banco pronto para o back-end (aulas 12 a 20):** o mesmo sistema precisa do banco
  funcionando. Você cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza
  regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria e entrega a
  documentação técnica.

---

# Capacidades da matéria

## Capacidades básicas

- **C1:** Reconhecer as demandas do cliente
- **C2:** Aplicar os procedimentos do modelo de modelagem entidade-relacionamento
- **C3:** Aplicar os procedimentos de normalização e padronização de dados.
- **C4:** Reconhecer as características e funcionalidades do banco de dados
- **C5:** Correlacionar as características e funcionalidades do banco de dados com a infraestrutura do sistema
- **C6:** Reconhecer os diferentes níveis de gerenciamento de dados
- **C7:** Aplicar linguagem de definição de dados
- **C8:** Aplicar linguagem de manipulação de dados
- **C9:** Reconhecer os diferentes gerenciadores de bancos de dados
- **C10:** Instalar gerenciadores de bancos de dados
- **C11:** Configurar gerenciadores de bancos de dados
- **C12:** Reconhecer os pilares da segurança da informação
- **C13:** Reconhecer os níveis hierárquicos de segurança da informação
- **C14:** Aplicar boas práticas de segurança da informação

## Capacidades socioemocionais

- **S1:** Valorizar novos fatos, ideias e opiniões diferentes para resolução de problemas pertinentes as atividades sob a sua responsabilidade
- **S2:** Fundamentar escolhas e decisões no exame de fatos, contextos, possibilidades, desafios e problemáticas de diferentes naturezas à luz de referenciais técnicos, legais, normativos e institucionais

## Conhecimentos da unidade curricular

1. **Autogestão:** 1.1 Gestão do tempo.
2. **Segurança da informação:** 2.1 Pilares (2.1.1 Integridade; 2.1.2 Disponibilidade; 2.1.3 Confidencialidade); 2.2 Controle de acesso; 2.3 Auditoria de acesso.
3. **Linguagem de consulta de banco de dados:** 3.1 Linguagem de definição de dados (3.1.1 Tabelas; 3.1.2 Campos; 3.1.3 Relações); 3.2 Linguagem de manipulação de dados (3.2.1 Consulta; 3.2.2 Atualização; 3.2.3 Inserção; 3.2.4 Exclusão; 3.2.5 Procedimentos armazenados; 3.2.6 Triggers (disparadores)).
4. **Banco de dados:** 4.1 Gerenciadores (4.1.1 Características; 4.1.2 Requisitos); 4.2 Preparação de ambiente de banco de dados (4.2.1 Instalação; 4.2.2 Configuração).
5. **Modelo entidade-relacionamento:** 5.1 Entidades (5.1.1 Fracas; 5.1.2 Fortes; 5.1.3 Associativas); 5.2 Relacionamento (5.2.1 Um para um; 5.2.2 Um para muitos; 5.2.3 Muitos para muitos); 5.3 Atributos (5.3.1 Simples; 5.3.2 Composto; 5.3.3 Descritivo; 5.3.4 Nominativo; 5.3.5 Referencial); 5.4 Diagrama entidade-relacionamento; 5.5 Normalização de dados; 5.6 Padronização de dados.
6. **Documentação técnica:** 6.1 Escopo do projeto; 6.2 Cronograma; 6.3 Fluxograma.

## Capacidades × conhecimentos

| Capacidade | Domínios |
|---|---|
| C1 | 6 |
| C2 | 5 |
| C3 | 5 |
| C4 | 4 |
| C5 | 4 |
| C6 | 4 |
| C7 | 3 |
| C8 | 3 |
| C9 | 4 |
| C10 | 4 |
| C11 | 4 |
| C12 | 2 |
| C13 | 2 |
| C14 | 2 |
| S1 | 1, 6 |
| S2 | 1, 6 |

## Capacidades por capítulo

| Capítulo | Capacidades |
|---|---|
| Capítulo 01 — Banco de dados e SGBD: conceitos e usos | C4, C9 |
| Capítulo 02 — Gerenciadores: características, requisitos e níveis | C4, C6, C9 |
| Capítulo 03 — Preparação do ambiente: instalação do PostgreSQL | C10, C11 |
| Capítulo 04 — Configuração do SGBD e infraestrutura do sistema | C5, C10, C11 |
| Capítulo 05 — Demandas do cliente e escopo do projeto | C1, S2 |
| Capítulo 06 — Entidades fortes, fracas e associativas | C2 |
| Capítulo 07 — Atributos | C2 |
| Capítulo 08 — Relacionamentos 1:1, 1:N e N:N | C2 |
| Capítulo 09 — Diagrama entidade-relacionamento | C2, S1 |
| Capítulo 10 — Normalização de dados (1FN, 2FN e 3FN) | C3, S2 |
| Capítulo 11 — Padronização de dados, cronograma e fluxograma | C1, C3 |
| Capítulo 12 — DDL: tabelas e campos | C7 |
| Capítulo 13 — DDL: relações, chaves e restrições | C7 |
| Capítulo 14 — DML: inserção, atualização e exclusão | C8 |
| Capítulo 15 — DML: consultas com filtros e ordenação | C8 |
| Capítulo 16 — Consultas com junções, agrupamentos e subconsultas | C8 |
| Capítulo 17 — Procedimentos armazenados | C8 |
| Capítulo 18 — Triggers (disparadores) | C8 |
| Capítulo 19 — Segurança da informação: pilares, acesso e auditoria | C12, C13, C14 |
| Capítulo 20 — Projeto integrador: banco documentado para o back-end | C1, C2, C3, C7, C8, C14, S1, S2 |

---

# Glossário

Termos técnicos de todos os capítulos, em ordem alfabética (o número indica o capítulo).

- **ACID:** atomicidade, consistência, isolamento e durabilidade das transações. _(cap. 02)_
- **Agregação:** função que resume várias linhas num valor (`count`, `sum`, `avg`). _(cap. 16)_
- **Anomalia:** problema de inserção, atualização ou exclusão causado por dados repetidos. _(cap. 10)_
- **Atributo:** característica de uma entidade _(cap. 07)_
- **Atributo composto:** atributo dividido em partes com significado próprio (endereço). _(cap. 07)_
- **Atributo referencial:** atributo que aponta para outra entidade. _(cap. 07)_
- **Auditoria:** registro de quem acessou ou alterou o quê. _(cap. 19)_
- **Autorrelacionamento:** relacionamento de uma entidade com ela mesma. _(cap. 08)_
- **Banco de dados:** conjunto organizado de dados relacionados, guardado de forma permanente. _(cap. 01)_
- **BEFORE / AFTER:** momento em que o trigger roda, antes ou depois do comando. _(cap. 18)_
- **Cardinalidade:** quantos de um lado se ligam ao outro _(cap. 08)_
- **Cardinalidade mínima:** se a participação no relacionamento é opcional (0) ou obrigatória (1). _(cap. 08)_
- **Chave estrangeira (FK):** liga uma tabela a outra _(cap. 13)_
- **Chave primária (PK):** identifica cada linha _(cap. 13)_
- **CHECK:** restrição com uma condição que toda linha precisa cumprir. _(cap. 13)_
- **Confidencialidade:** só quem tem permissão vê o dado. _(cap. 19)_
- **Cronograma:** etapas do projeto com duração, dependências, responsáveis e marcos. _(cap. 11)_
- **DBA:** administrador de banco de dados; instala, configura, faz backup e controla acessos. _(cap. 02)_
- **DDL:** comandos que criam a estrutura _(cap. 12)_
- **DEFAULT:** valor usado quando nenhum é informado. _(cap. 12)_
- **DELETE:** comando que exclui linhas. _(cap. 14)_
- **Demanda:** o pedido do cliente, como ele o descreve. _(cap. 05)_
- **Dependência funcional:** A determina B quando, conhecendo A, sabe-se um único valor de B. _(cap. 10)_
- **Dependência parcial:** atributo que depende só de parte de uma chave composta. _(cap. 10)_
- **Dependência transitiva:** atributo que depende de outro atributo que não é chave. _(cap. 10)_
- **DER:** diagrama entidade-relacionamento, o desenho do MER. _(cap. 09)_
- **Desnormalização:** repetir um dado de propósito, com decisão documentada. _(cap. 10)_
- **Dicionário de atributos:** documento que descreve cada atributo de forma padronizada. _(cap. 07)_
- **Disponibilidade:** o dado está acessível quando é preciso. _(cap. 19)_
- **DML:** comandos que mexem nos dados _(cap. 14)_
- **Documentação técnica:** documentos que permitem a outra pessoa instalar e usar o banco. _(cap. 20)_
- **Domínio:** lista fechada de valores aceitos por um atributo. _(cap. 11)_
- **Entidade:** objeto do mundo real com dados próprios _(cap. 06)_
- **Entidade associativa:** relacionamento muitos-para-muitos que tem dados próprios. _(cap. 06)_
- **Entidade forte:** existe por si só e tem identificador próprio. _(cap. 06)_
- **Entidade fraca:** depende de outra entidade para existir e ser identificada. _(cap. 06)_
- **Escalabilidade:** capacidade de crescer em dados e acessos sem perder desempenho. _(cap. 02)_
- **Escopo:** o que o projeto inclui e o que fica de fora. _(cap. 05)_
- **Exclusão lógica:** marcar a linha como inativa em vez de excluí-la. _(cap. 14)_
- **Fluxograma:** desenho dos passos e decisões de um processo. _(cap. 11)_
- **FOR EACH ROW:** o trigger roda uma vez para cada linha afetada. _(cap. 18)_
- **FOR UPDATE:** trava a linha lida até o fim da transação. _(cap. 17)_
- **GROUP BY:** cláusula que agrupa linhas para calcular por grupo. _(cap. 16)_
- **Identificador:** atributo que distingue uma ocorrência de todas as outras. _(cap. 07)_
- **IDENTITY:** coluna cujo número o banco gera sozinho. _(cap. 12)_
- **Inconsistência:** cópias do mesmo dado com valores diferentes. _(cap. 01)_
- **INSERT:** comando que grava linhas novas. _(cap. 14)_
- **Integridade:** o dado está correto e completo. _(cap. 19)_
- **Integridade referencial:** garantia de que toda chave estrangeira aponta para uma linha que _(cap. 13)_
- **JOIN:** junção de tabelas pela coluna que as liga. _(cap. 16)_
- **LEFT JOIN:** junção que mantém todas as linhas da tabela da esquerda. _(cap. 16)_
- **LIKE:** busca por padrão de texto com `%` e `_`. _(cap. 15)_
- **Marco:** entrega importante que fecha uma etapa. _(cap. 11)_
- **Menor privilégio:** dar a cada usuário só as permissões de que ele precisa. _(cap. 19)_
- **MER:** modelo entidade-relacionamento, a descrição conceitual dos dados. _(cap. 06)_
- **Modelo lógico:** representação em tabelas, com chaves primárias e estrangeiras. _(cap. 09)_
- **NEW / OLD:** a linha como vai ficar e como estava, dentro da função de trigger. _(cap. 18)_
- **Normalização:** retirar repetições e dependências erradas _(cap. 10)_
- **NOT NULL:** restrição que torna a coluna obrigatória. _(cap. 12)_
- **Notação de Chen:** retângulos, losangos e elipses para o modelo conceitual. _(cap. 09)_
- **NULL:** ausência de valor; testado com `IS NULL`. _(cap. 15)_
- **Ocorrência:** cada elemento de uma entidade (a aluna Ana em ALUNO). _(cap. 06)_
- **ON DELETE CASCADE:** excluir o pai exclui também as linhas filhas. _(cap. 13)_
- **ORDER BY:** cláusula que ordena o resultado. _(cap. 15)_
- **Padronização de dados:** regras comuns de nomes, tipos e formatos no banco. _(cap. 11)_
- **Paginação:** mostrar o resultado em partes com `LIMIT` e `OFFSET`. _(cap. 15)_
- **Papel (role):** usuário ou grupo de permissões no PostgreSQL. _(cap. 19)_
- **Parâmetro:** valor recebido pela rotina na chamada. _(cap. 17)_
- **Parte interessada:** quem pede, aprova ou usa o sistema. _(cap. 05)_
- **Pé de galinha:** notação do modelo lógico com traço, círculo e tridente nas pontas. _(cap. 09)_
- **pg_dump / pg_restore:** ferramentas de backup e restauração do PostgreSQL. _(cap. 20)_
- **pg_hba.conf:** arquivo que define quem pode conectar e como se autentica. _(cap. 04)_
- **pgAdmin:** cliente gráfico do PostgreSQL. _(cap. 03)_
- **PL/pgSQL:** linguagem de programação das rotinas do PostgreSQL. _(cap. 17)_
- **Pool de conexões:** conjunto de conexões reaproveitadas pelo back-end. _(cap. 04)_
- **Porta:** número que identifica o serviço na rede; a do PostgreSQL é 5432. _(cap. 03)_
- **postgresql.conf:** arquivo com os parâmetros de funcionamento do servidor. _(cap. 04)_
- **Procedimento armazenado:** rotina guardada no banco _(cap. 17)_
- **Produto cartesiano:** combinação de todas as linhas de uma tabela com todas as da outra. _(cap. 16)_
- **psql:** cliente de terminal do PostgreSQL. _(cap. 03)_
- **RAISE EXCEPTION:** comando que barra a operação e desfaz o que já foi feito. _(cap. 17)_
- **Rastreabilidade:** ligação de cada tabela e regra do banco a um requisito do escopo. _(cap. 20)_
- **Redundância:** o mesmo dado guardado em mais de um lugar. _(cap. 01)_
- **Regra de negócio:** condição do processo que nunca pode ser quebrada. _(cap. 05)_
- **Relacionamento:** associação entre entidades que o sistema precisa registrar. _(cap. 08)_
- **Requisito de dados:** frase verificável sobre o que o banco precisa guardar ou permitir. _(cap. 05)_
- **Revisão em dupla:** conferência do modelo por um colega antes de seguir. _(cap. 09)_
- **ROLLBACK:** desfaz a transação em andamento. _(cap. 14)_
- **Script mestre:** script que executa os outros na ordem certa. _(cap. 20)_
- **Script SQL:** arquivo `.sql` com os comandos em ordem. _(cap. 12)_
- **SELECT:** comando que consulta dados. _(cap. 15)_
- **Serviço:** programa que roda em segundo plano, como o servidor do PostgreSQL. _(cap. 03)_
- **SGBD:** programa que guarda e gerencia os dados _(cap. 01)_
- **SQL:** linguagem usada para criar, consultar e alterar bancos relacionais. _(cap. 01)_
- **SQL injection:** ataque que cola texto do usuário no SQL; evitado com consultas parametrizadas. _(cap. 20)_
- **String de conexão:** endereço com usuário, servidor, porta e banco usado pelo back-end. _(cap. 04)_
- **Subconsulta:** consulta dentro de outra consulta. _(cap. 16)_
- **Superusuário:** usuário com todos os poderes no SGBD (no PostgreSQL, o `postgres`). _(cap. 03)_
- **Tabela associativa:** tabela que resolve um N:N com as duas chaves estrangeiras. _(cap. 08)_
- **Tabela de histórico:** tabela que guarda as alterações com valor antigo, novo, usuário e data. _(cap. 18)_
- **Tipo de dado:** a espécie de valor que a coluna aceita (inteiro, texto, data…). _(cap. 12)_
- **Transação:** conjunto de comandos que acontece inteiro ou nada. _(cap. 02)_
- **Trigger:** rotina disparada por um evento _(cap. 18)_
- **UNIQUE:** restrição que impede valores repetidos. _(cap. 13)_
- **UPDATE:** comando que altera linhas existentes. _(cap. 14)_
- **UTF8:** codificação que guarda corretamente acentos e outros caracteres. _(cap. 03)_
- **Variável de ambiente:** valor configurado no servidor, fora do código (ex.: `DATABASE_URL`). _(cap. 04)_
- **Visão (nível externo):** parte dos dados que um usuário ou tela enxerga. _(cap. 02)_
- **WHERE:** cláusula que filtra as linhas. _(cap. 15)_

---

# Referências

A ementa da matéria não lista referências.

---

# Capítulo 01 — Banco de dados e SGBD: conceitos e usos

- **Aula:** 01
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C4, C9
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-01.md`

## Teoria

### Dado, informação e banco de dados

Você, como aluno consultor, foi chamado por uma escola de cursos livres que controla tudo em
planilhas. Antes de propor um sistema, é preciso falar a mesma língua:

| Conceito | O que é | Exemplo na escola |
|---|---|---|
| **Dado** | Fato registrado, sem contexto | `"Ana"`, `17`, `2026-10-09` |
| **Informação** | Dado organizado, com sentido | "Ana, 17 anos, matriculou-se em 09/10/2026" |
| **Banco de dados** | Conjunto organizado de dados relacionados, guardado de forma permanente, consultado e atualizado por vários usuários e sistemas | Alunos, cursos, turmas e matrículas da escola |

Outros exemplos do dia a dia: o cadastro de clientes de uma loja virtual, o histórico de pedidos,
as notas de uma escola e as mensagens de um aplicativo de conversa.

### SGBD: o programa que cuida do banco

O **SGBD** (Sistema Gerenciador de Banco de Dados) é o programa que cria, guarda e gerencia o
banco. O sistema web nunca abre o arquivo do banco direto: ele **pede** ao SGBD, que executa o
pedido e devolve o resultado.

| Funcionalidade do SGBD | O que garante | Exemplo |
|---|---|---|
| Armazenamento | Os dados continuam lá depois que o servidor reinicia | As matrículas de ontem estão salvas |
| Consulta | Encontrar dados rápido, com filtros | "Alunos da turma de Excel de outubro" |
| Integridade | Regras que impedem dados errados | Não aceitar mensalidade negativa |
| Controle de acesso | Cada usuário só faz o que pode | A secretaria matricula; o aluno só consulta |
| Concorrência | Vários usuários ao mesmo tempo sem perder dados | Duas pessoas pegando a última vaga |
| Recuperação | Voltar a um estado seguro depois de falha | Restaurar o banco a partir do backup |

### Planilha × banco de dados

| Situação | Planilha | Banco de dados com SGBD |
|---|---|---|
| Vários usuários ao mesmo tempo | Conflito de versões | Controle de concorrência |
| Milhares de registros | Fica lenta | Índices e consultas rápidas |
| Regras (ex.: e-mail único) | Fáceis de quebrar | Restrições garantidas pelo SGBD |
| Quem pode ver e alterar | Arquivo inteiro ou nada | Permissão por tabela e por ação |
| Ligação com o sistema web | Manual | Conexão direta do back-end |

🔑 **Redundância** é o mesmo dado copiado em vários lugares (o telefone do aluno repetido em cada
matrícula). Uma alteração esquecida gera **inconsistência**. O banco bem modelado evita isso
(capítulos 6 a 11).

### O banco na arquitetura de um sistema web

```
Navegador (front-end)  →  Servidor da aplicação (back-end)  →  SGBD (banco de dados)
   tela de matrícula       confere a vaga e monta o SQL           guarda alunos e turmas
```

- O **front-end** mostra a tela e envia o pedido.
- O **back-end** aplica as regras do negócio e conversa com o banco usando **SQL**.
- O **SGBD** executa o SQL e devolve as linhas.

O banco nunca fica aberto direto para o navegador: quem acessa é o back-end, com usuário e senha
próprios (capítulo 19).

### Gerenciadores de banco de dados (4.1)

- **Relacional:** dados em **tabelas** (linhas e colunas) ligadas por chaves, com a linguagem
  **SQL**. Exemplos: PostgreSQL, MySQL/MariaDB, SQL Server, Oracle e SQLite.
- **Não relacional (NoSQL):** documentos, chave-valor ou grafos. Exemplos: MongoDB e Redis.

Nesta unidade curricular o SGBD é o **PostgreSQL**: gratuito, de código aberto e robusto. As
características e os requisitos de cada gerenciador são o tema do capítulo 2.

### Tabela, linha e coluna: primeira visão

| id | nome | email | cidade |
|---|---|---|---|
| 1 | Ana Souza | ana@exemplo.com | Rio do Sul |
| 2 | Bruno Lima | bruno@exemplo.com | Blumenau |

- **Tabela** = um assunto (alunos). **Coluna** (campo) = uma característica (nome, e-mail).
- **Linha** (registro) = um aluno. O **id** identifica cada linha sem repetição (chave primária,
  capítulo 13).

Só para conhecer o SQL (a sintaxe é estudada no capítulo 15):

```sql
SELECT nome, cidade
FROM aluno
WHERE cidade = 'Rio do Sul';
```

### Gestão do tempo na unidade curricular (1.1)

São 80 horas e um projeto que cresce a cada aula. Monte o seu **plano de estudos**: o que entregar
em cada semana, quanto tempo reservar para praticar SQL e quando pedir ajuda. Atrasar a modelagem
(capítulos 5 a 11) atrasa toda a construção do banco (capítulos 12 a 20).

## Resumo

- Dado é o fato solto; informação é o dado com sentido; banco de dados é o conjunto organizado e
  permanente de dados relacionados.
- O SGBD armazena, consulta, garante integridade, controla acesso, trata a concorrência e recupera
  falhas.
- Num sistema web, só o back-end conversa com o SGBD, usando SQL.
- Gerenciadores podem ser relacionais (PostgreSQL, MySQL, SQL Server, Oracle, SQLite) ou não
  relacionais (MongoDB, Redis); a unidade curricular usa o PostgreSQL.
- Um plano de estudos evita que o atraso da modelagem atrase o projeto inteiro.

---

# Capítulo 02 — Gerenciadores: características, requisitos e níveis

- **Aula:** 02
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C4, C6, C9
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-02.md`

## Teoria

### Características de um gerenciador (4.1.1)

Antes de recomendar um SGBD para a escola de cursos livres, você, como aluno consultor, compara os
candidatos pelas mesmas perguntas:

| Característica | Pergunta que ela responde | Exemplo |
|---|---|---|
| Modelo de dados | Como os dados são organizados? | Relacional (tabelas) ou documentos (JSON) |
| Licença | Quanto custa e o que posso fazer com ele? | Livre (PostgreSQL) ou comercial (Oracle) |
| Transações ACID | Os dados ficam corretos mesmo com falhas? | Matrícula e pagamento salvos juntos |
| Desempenho | Responde rápido com muitos dados? | Índices e otimizador de consultas |
| Escalabilidade | Aguenta crescer? | Mais memória (vertical) ou mais servidores (horizontal) |
| Segurança | Quem acessa o quê? | Usuários, papéis, criptografia, auditoria |
| Ferramentas e comunidade | Tem documentação e clientes gráficos? | pgAdmin, DBeaver, fóruns |

### Transações e ACID

Uma **transação** é um conjunto de comandos que acontece **inteiro ou nada**.

- **A — Atomicidade:** tudo ou nada (a matrícula não fica salva sem ocupar a vaga).
- **C — Consistência:** o banco sai de um estado válido para outro válido (vagas nunca negativas).
- **I — Isolamento:** transações simultâneas não se atrapalham (duas pessoas e a última vaga).
- **D — Durabilidade:** depois de confirmado, o dado não se perde, mesmo se faltar energia.

```sql
BEGIN;
UPDATE turma SET vagas = vagas - 1 WHERE id = 10;
INSERT INTO matricula (aluno_id, turma_id) VALUES (5, 10);
COMMIT;   -- confirma tudo; em caso de erro, ROLLBACK desfaz tudo
```

### Principais gerenciadores

| Gerenciador | Modelo | Licença | Quando costuma ser usado |
|---|---|---|---|
| **PostgreSQL** | Relacional (aceita JSON) | Livre | Sistemas web, APIs, dados complexos |
| MySQL / MariaDB | Relacional | Livre (o MySQL também tem versão comercial) | Sites e lojas, hospedagens comuns |
| SQL Server | Relacional | Comercial (com edição gratuita limitada) | Empresas que usam produtos Microsoft |
| Oracle | Relacional | Comercial | Grandes empresas, bancos, governo |
| SQLite | Relacional, banco num arquivo | Domínio público | Apps de celular, protótipos, testes |
| MongoDB | Documentos (NoSQL) | Livre com restrições ou serviço pago | Dados com estrutura variável, catálogos |

### Requisitos de um gerenciador (4.1.2)

Antes de instalar (capítulo 3), confira:

- **Sistema operacional** suportado (Windows, Linux, macOS) e arquitetura (64 bits).
- **Hardware:** memória, processador e **espaço em disco** para dados, índices e backups.
- **Rede:** porta de acesso (PostgreSQL 5432, MySQL 3306, SQL Server 1433), firewall e acesso do
  servidor da aplicação.
- **Software:** versão compatível com o back-end e com o driver da linguagem.
- **Pessoas e custo:** conhecimento da equipe, licença e suporte.
- **Requisitos do sistema:** volume de dados, acessos simultâneos, necessidade de transações,
  disponibilidade (pode parar à noite?) e proteção dos dados pessoais.

### Comparação em tabela: PostgreSQL, MySQL, SQLite e MongoDB

| Critério | PostgreSQL | MySQL | SQLite | MongoDB |
|---|---|---|---|---|
| Modelo | Relacional + JSON | Relacional | Relacional, arquivo único | Documentos |
| Transações ACID | Sim | Sim (motor InnoDB) | Sim | Sim, com limitações por cenário |
| Acesso simultâneo | Alto | Alto | Baixo (um escritor por vez) | Alto |
| Instalação | Servidor | Servidor | Nenhuma (biblioteca) | Servidor ou serviço na nuvem |
| Porta padrão | 5432 | 3306 | — | 27017 |
| Bom para | Sistema web com regras e relatórios | Sites e lojas | App local, testes | Catálogo com campos variáveis |

### Níveis de gerenciamento de dados (C6)

A arquitetura em três níveis separa **o que o usuário vê** de **como os dados ficam no disco**:

| Nível | O que descreve | Quem usa | Exemplo na escola |
|---|---|---|---|
| **Externo (visões)** | A parte dos dados que cada usuário ou tela enxerga | Usuários e aplicações | A secretaria vê nome e curso; o financeiro vê mensalidades |
| **Conceitual (lógico)** | Todas as tabelas, colunas, chaves e regras | Analista e desenvolvedor | Tabelas aluno, curso, matricula |
| **Físico (interno)** | Como os dados são gravados: arquivos, páginas, índices | SGBD e administrador (DBA) | Arquivos de dados e índices no disco |

- **Independência lógica:** acrescentar uma coluna sem quebrar as telas que não a usam.
- **Independência física:** criar um índice ou trocar o disco sem mudar tabelas nem aplicação.

Os papéis também têm níveis: **usuário final** (usa as telas), **desenvolvedor** (escreve SQL e
modela) e **administrador de banco (DBA)** (instala, configura, faz backup e controla acessos).

### Como escolher o gerenciador

1. Liste os **requisitos** do sistema (volume, acessos, transações, orçamento, equipe).
2. Compare as **características** dos candidatos com esses requisitos.
3. Prefira o que atende com **menor custo e risco** e que a equipe consegue manter.
4. Registre a **justificativa**: ela entra na documentação técnica (capítulo 20).

Para a escola, com matrículas simultâneas, vagas que não podem passar do limite e relatórios, a
recomendação é um SGBD relacional com ACID e servidor: o **PostgreSQL**. Um app de anotações que
funciona sem internet usaria **SQLite**; um catálogo em que cada item tem campos diferentes poderia
usar **MongoDB** ou colunas JSON do PostgreSQL. A escolha muda porque os **requisitos** mudam.

## Resumo

- Gerenciadores se comparam por modelo de dados, licença, ACID, desempenho, escalabilidade,
  segurança e ferramentas.
- ACID: atomicidade, consistência, isolamento e durabilidade; `BEGIN` … `COMMIT` ou `ROLLBACK`.
- Requisitos: sistema operacional, hardware, rede (porta), software, pessoas, custo e o que o
  sistema exige.
- Três níveis: externo (visões), conceitual (tabelas e regras) e físico (arquivos e índices).
- A escolha do SGBD é justificada pelos requisitos e registrada na documentação.

---

# Capítulo 03 — Preparação do ambiente: instalação do PostgreSQL

- **Aula:** 03
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C10, C11
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-03.md`

## Teoria

### Antes de instalar: checklist

Você, como aluno consultor, vai preparar as máquinas da equipe que desenvolve o sistema de
matrículas da escola. Antes do instalador, confira:

- Sistema operacional **64 bits** suportado pela versão escolhida do PostgreSQL.
- **Espaço em disco** para o programa, os dados, os índices e os backups.
- **Porta 5432** livre (outro PostgreSQL instalado ocupa a mesma porta).
- Permissão de **administrador** na máquina.
- Todas as máquinas na **mesma versão principal** (por exemplo, 16 ou 17).

### Componentes do PostgreSQL

| Componente | Para que serve |
|---|---|
| **PostgreSQL Server** | O SGBD em si; roda como **serviço** e guarda os dados |
| **psql** | Cliente de **terminal** para executar SQL |
| **pgAdmin** | Cliente **gráfico** para administrar e consultar |
| Stack Builder | Instala extensões e ferramentas extras (opcional) |
| Pasta de dados (*data directory*) | Onde ficam os arquivos do banco (nível físico, capítulo 2) |

### Roteiro de instalação no Windows

1. Baixar o instalador do **site oficial** do PostgreSQL (nunca de sites desconhecidos).
2. Executar como administrador e escolher a **pasta de instalação**.
3. Marcar os componentes: Server, pgAdmin e Command Line Tools (Stack Builder é opcional).
4. Escolher a **pasta de dados**.
5. Definir a **senha do superusuário `postgres`**: forte, guardada em local seguro, **nunca** no
   código do sistema nem em arquivo público.
6. Manter a **porta 5432** (ou outra livre, se já houver um PostgreSQL na máquina).
7. Escolher o **locale** (idioma e região), por exemplo `Portuguese, Brazil`.
8. Concluir e aguardar o serviço iniciar.

### Roteiro de instalação no Linux

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql      # o serviço está ativo?
sudo -u postgres psql                 # entra no psql como o usuário postgres
```

No Linux o usuário `postgres` do sistema operacional é criado junto, e o acesso local inicial usa
esse usuário.

### Conferindo a instalação no psql

```bash
psql --version
psql -U postgres -h localhost -p 5432
```

Dentro do psql:

```sql
SELECT version();          -- mostra a versão do servidor
\l                         -- lista os bancos
\conninfo                  -- mostra usuário, banco, servidor e porta da conexão
\q                         -- sai do psql
```

No **pgAdmin**: *Servers → Register → Server*, informando `localhost`, porta `5432`, usuário
`postgres` e a senha. Se aparecerem os bancos `postgres`, `template0` e `template1`, a instalação
está pronta.

### O serviço do PostgreSQL

O servidor roda como **serviço** (programa em segundo plano). Parado, nenhum sistema conecta.

- **Windows:** aplicativo **Serviços** → `postgresql-x64-NN` → Iniciar.
- **Linux:** `sudo systemctl start postgresql` e `sudo systemctl enable postgresql` (iniciar
  junto com o sistema).

### Problemas comuns e soluções

| Sintoma | Causa provável | Solução |
|---|---|---|
| "Connection refused" | Serviço parado ou porta errada | Iniciar o serviço; conferir a porta |
| "password authentication failed" | Senha errada do usuário | Conferir a senha; redefinir com o DBA |
| Instalador avisa porta em uso | Outro PostgreSQL na 5432 | Usar outra porta ou remover a instalação antiga |
| `psql` não é reconhecido | Pasta `bin` fora do PATH | Usar o "SQL Shell (psql)" ou ajustar o PATH |
| Acentos errados nos dados | Codificação diferente | Usar a codificação **UTF8** |

Na equipe da escola, uma máquina mostrou "connection refused" no primeiro teste: o serviço estava
parado. Com o roteiro registrado, o problema foi resolvido em minutos.

### Boas práticas

- Registrar no **roteiro de instalação**: versão, porta, pasta de dados, data e quem instalou.
- Senha do `postgres` forte e guardada com segurança; a aplicação **não** usa esse usuário
  (capítulos 4 e 19).
- Instalar só o necessário: menos componentes, menos riscos.

## Resumo

- Antes de instalar: 64 bits, espaço em disco, porta 5432 livre, permissão de administrador e a
  mesma versão em toda a equipe.
- O PostgreSQL tem o servidor (serviço), o psql (terminal) e o pgAdmin (gráfico).
- No Windows, o instalador oficial; no Linux, `apt install postgresql`.
- A conferência é `psql --version`, `SELECT version();`, `\l` e `\conninfo`, e o registro do
  servidor no pgAdmin.
- Erros comuns vêm de serviço parado, porta ocupada, senha errada, PATH ou codificação.

---

# Capítulo 04 — Configuração do SGBD e infraestrutura do sistema

- **Aula:** 04
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C5, C10, C11
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-04.md`

## Teoria

### Onde ficam as configurações

Com o PostgreSQL instalado, você, como aluno consultor, prepara o servidor para o sistema de
matrículas da escola. Ele lê dois arquivos principais da **pasta de dados** (no Linux, de
`/etc/postgresql/NN/main/`):

| Arquivo | O que controla |
|---|---|
| **postgresql.conf** | Como o servidor funciona: endereços, porta, conexões, memória, fuso horário, registros (log) |
| **pg_hba.conf** | **Quem** pode conectar, **de onde**, a **qual banco** e **como se autentica** |

Para descobrir onde estão:

```sql
SHOW config_file;
SHOW hba_file;
SHOW data_directory;
```

### Parâmetros básicos do postgresql.conf

| Parâmetro | Função | Valor comum |
|---|---|---|
| `listen_addresses` | Em quais endereços o servidor aceita conexões | `'localhost'` ou o IP do servidor |
| `port` | Porta de escuta | `5432` |
| `max_connections` | Máximo de conexões ao mesmo tempo | `100` |
| `shared_buffers` | Memória reservada para cache de dados | cerca de 25% da memória do servidor |
| `timezone` | Fuso horário das datas | `'America/Sao_Paulo'` |
| `log_connections` | Registra cada conexão no log | `on` (ajuda na auditoria, capítulo 19) |

```sql
SHOW max_connections;
ALTER SYSTEM SET timezone = 'America/Sao_Paulo';
SELECT pg_reload_conf();   -- aplica parâmetros que não exigem reinício
```

`listen_addresses`, `port` e `shared_buffers` só valem depois de **reiniciar** o serviço.

### pg_hba.conf: quem pode entrar

Cada linha diz o tipo de conexão, o banco, o usuário, o endereço e o método de autenticação:

```
# TIPO   BANCO        USUÁRIO       ENDEREÇO          MÉTODO
local    all          postgres                        peer
host     escola_db    app_escola    127.0.0.1/32      scram-sha-256
host     escola_db    app_escola    10.0.0.20/32      scram-sha-256
```

- `scram-sha-256` exige **senha** protegida (método recomendado).
- `trust` deixa entrar **sem senha**: nunca usar em servidor de verdade.
- A ordem importa: vale a **primeira linha** que combinar.
- Depois de alterar: `SELECT pg_reload_conf();`

### Banco e usuário da aplicação

A aplicação **não usa** o superusuário `postgres`. Ela ganha um usuário próprio, só com o que
precisa:

```sql
CREATE DATABASE escola_db ENCODING 'UTF8';
CREATE ROLE app_escola LOGIN PASSWORD 'senha-forte-definida-pela-equipe';
GRANT CONNECT ON DATABASE escola_db TO app_escola;
-- as permissões em cada tabela são dadas no capítulo 19 (GRANT SELECT, INSERT...)
```

```bash
psql -U app_escola -h localhost -d escola_db    # testa a conexão com o novo usuário
```

### Infraestrutura do sistema (C5)

```
[Navegador] --HTTPS--> [Back-end 10.0.0.20] --rede interna, porta 5432--> [PostgreSQL 10.0.0.30]
                              |                                                  |
                     variáveis de ambiente                             backup diário em outro disco
```

| Necessidade do sistema | Decisão de infraestrutura |
|---|---|
| Muitos acessos simultâneos | `max_connections` adequado + *pool* de conexões no back-end |
| Segurança dos dados | Banco em rede interna; firewall liberando a 5432 só para o back-end |
| Disponibilidade | Backup automático, monitoramento, energia estável |
| Desempenho | Memória suficiente (`shared_buffers`) e disco rápido |
| Datas corretas | `timezone` igual ao da aplicação |

Na escola, o servidor de banco recebe `listen_addresses = '10.0.0.30'` e o pg_hba.conf libera só o
back-end (10.0.0.20) para o usuário `app_escola`. Quem tenta conectar de outro computador recebe
"no pg_hba.conf entry": a configuração está funcionando.

### String de conexão e variáveis de ambiente

O back-end conecta com uma **string de conexão**:

```
postgresql://app_escola:SENHA@10.0.0.30:5432/escola_db
```

A senha **não** fica no código: fica numa **variável de ambiente** (ex.: `DATABASE_URL`) no
servidor, e o arquivo com ela (ex.: `.env`) **não vai para o repositório**.

### Recarregar × reiniciar

- **Reload** (`SELECT pg_reload_conf();` ou `systemctl reload postgresql`): aplica o pg_hba.conf e
  parâmetros simples **sem derrubar** as conexões.
- **Restart** (`systemctl restart postgresql` ou Serviços → Reiniciar): exigido para porta,
  endereços e memória; **derruba** as conexões, então é feito fora do horário de uso.

## Resumo

- `postgresql.conf` define como o servidor funciona; `pg_hba.conf` define quem entra, de onde e
  como.
- Use `scram-sha-256`; nunca `trust` em servidor real.
- A aplicação tem banco e usuário próprios, nunca o `postgres`.
- A infraestrutura liga back-end e banco por rede interna, com firewall, backup e o mesmo fuso
  horário.
- A senha fica em variável de ambiente; reload aplica sem derrubar, restart derruba as conexões.

---

# Capítulo 05 — Demandas do cliente e escopo do projeto

- **Aula:** 05
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C1, S2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-05.md`

## Teoria

### A situação de aprendizagem 1

Começa aqui a **SA 1 — Modelagem do banco de um sistema web** (capítulos 5 a 11). A escola de
cursos livres quer trocar as planilhas por um sistema web de matrículas. Você, como aluno
consultor, levanta as demandas, define o escopo, desenha o DER, normaliza até a 3FN, padroniza os
nomes e entrega o cronograma e o fluxograma do processo de matrícula.

### Demanda × necessidade

O cliente costuma falar da **solução** que imagina ("quero uma planilha online"), mas o trabalho do
profissional é descobrir o **problema** ("as matrículas se perdem e ninguém sabe quantas vagas
sobram"). O banco é modelado para a **necessidade**, não para a frase inicial.

### Técnicas de levantamento

| Técnica | Quando usar | Cuidado |
|---|---|---|
| **Entrevista** | Entender o processo com quem decide e quem executa | Perguntas abertas; registrar as respostas |
| **Questionário** | Ouvir muitas pessoas rapidamente | Perguntas claras e curtas |
| **Observação** | Ver como o trabalho é feito de verdade | Não atrapalhar a rotina |
| **Análise de documentos** | Fichas, planilhas, recibos e relatórios atuais | Cada campo é um dado candidato |

Boas perguntas para levantar dados:

- O que vocês precisam **registrar**? Quem registra e quando?
- Que **informações** vocês precisam **consultar** ou imprimir?
- Quais **regras** nunca podem ser quebradas?
- Quem **pode ver** cada informação? Há dados pessoais?
- Quanto isso cresce por mês? O que acontece com os registros antigos?

### Requisitos de dados

São frases **verificáveis** sobre o que o banco precisa guardar e permitir:

| Tipo | Exemplo na escola |
|---|---|
| **Dados a guardar** | "Guardar nome, CPF, e-mail e telefone do aluno." |
| **Consultas e relatórios** | "Listar as turmas com vagas disponíveis por curso." |
| **Regras de negócio** | "Uma turma tem no máximo 25 alunos." "O CPF é único." |
| **Acesso** | "Só a secretaria altera matrículas; o professor só consulta a turma dele." |
| **Volume e histórico** | "Cerca de 300 matrículas por semestre; guardar o histórico por 5 anos." |
| **Qualidade** | "Datas no formato dia/mês/ano; nomes sem abreviação." |

🔑 Cada **substantivo** importante do pedido (aluno, curso, turma, matrícula, pagamento) é candidato
a **entidade** (capítulo 6); cada **característica** (nome, CPF, data) é candidata a **atributo**
(capítulo 7).

### Regras de negócio que viram restrições

| Regra do cliente | Como o banco vai garantir (capítulos 13 a 18) |
|---|---|
| CPF não se repete | Restrição UNIQUE |
| Toda matrícula pertence a um aluno e a uma turma | Chaves estrangeiras |
| Valor da mensalidade maior que zero | Restrição CHECK |
| Turma com no máximo 25 alunos | Trigger ou procedimento |
| Registrar quem alterou uma nota | Trigger de auditoria |

### Documento de escopo (6.1)

1. **Objetivo** (1 frase): o que o banco vai permitir e por quê.
2. **Partes interessadas:** quem pede, quem aprova, quem usa.
3. **Entra no escopo:** processos e dados cobertos.
4. **Não entra no escopo:** o que fica de fora (evita o "só mais uma coisinha").
5. **Requisitos de dados:** lista numerada, como na tabela acima.
6. **Entregas e prazos:** modelo, DER, scripts e documentação (cronograma no capítulo 11).
7. **Premissas e riscos:** o que se supõe verdadeiro e o que pode dar errado.

Na escola, a diretora pediu "um sistema para não perder matrículas". Na entrevista, você descobre
6 cursos, turmas de manhã e à noite, pagamento mensal e alunos menores de idade com responsável. A
primeira versão **inclui** alunos, responsáveis, cursos, turmas, matrículas e pagamentos; **fica
de fora** o controle da cantina e a folha de pagamento dos professores.

### Mudança de escopo e justificativa das escolhas (S2)

Quando o cliente pede algo novo no meio do projeto, registre o pedido, o impacto (tempo, tabelas,
custo) e a **aprovação**. Sem esse registro, o projeto cresce sem controle e atrasa. Cada decisão do
escopo é **justificada** pelos fatos levantados: "a cantina fica fora porque não faz parte do
processo de matrícula e não foi priorizada pela diretora".

### Gestão do tempo nas entregas (1.1)

A SA 1 tem entregas semanais: entidades, atributos, relacionamentos, DER, normalização, padrão de
nomes, cronograma. Divida as tarefas no grupo, defina prazos internos antes do prazo do professor e
registre o andamento.

## Resumo

- O banco é modelado para a necessidade do cliente, descoberta com entrevista, questionário,
  observação e análise de documentos.
- Requisitos de dados são frases verificáveis: dados, consultas, regras, acesso, volume e
  qualidade.
- Substantivos viram entidades candidatas; características viram atributos.
- O documento de escopo diz o que entra, o que não entra, entregas, prazos, premissas e riscos.
- Mudança de escopo só com registro do impacto e aprovação; toda escolha é justificada.

---

# Capítulo 06 — Entidades fortes, fracas e associativas

- **Aula:** 06
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-06.md`

## Teoria

### O modelo entidade-relacionamento (MER)

O **MER** descreve os dados de um sistema de forma **independente do SGBD**: quais "coisas" o
sistema guarda (**entidades**), o que se sabe sobre elas (**atributos**, capítulo 7) e como se
ligam (**relacionamentos**, capítulo 8). O desenho do MER é o **DER** (capítulo 9). Ele é o
**nível conceitual** (capítulo 2) e vem **antes** das tabelas (capítulo 12).

### Entidade e ocorrência

- **Entidade:** conjunto de objetos do mundo real, **concretos ou abstratos**, sobre os quais o
  sistema precisa guardar dados. Ex.: ALUNO, CURSO, MATRÍCULA, PAGAMENTO.
- **Ocorrência (instância):** cada elemento da entidade. A aluna Ana é uma ocorrência de ALUNO.
- **Notação:** retângulo com o nome no **singular** e em maiúsculas.

🔑 **Entidade ou atributo?** Pergunte: *isso tem dados próprios e se repete com várias
ocorrências?* "Curso" tem nome, carga horária e valor, e há vários → **entidade**. "Turno da
turma" é só uma característica → **atributo**.

### Entidade forte (5.1.2)

Existe **por si só** e tem **identificador próprio**: ALUNO (pelo id ou CPF), CURSO, PROFESSOR,
TURMA.

### Entidade fraca (5.1.1)

**Depende de outra entidade** (a forte, chamada **dona**) para existir e para ser identificada; sem
a dona, não faz sentido.

| Entidade fraca | Depende de | Por quê |
|---|---|---|
| PARCELA | MATRÍCULA | A parcela 3 é a 3ª parcela daquela matrícula |
| ITEM_PEDIDO | PEDIDO | O "item 2" só faz sentido dentro de um pedido |
| DEPENDENTE | FUNCIONÁRIO | O dependente só existe ligado ao funcionário |

- A identificação usa a chave da dona **mais** um identificador parcial (matrícula 15 + parcela 3).
- Se a dona é excluída, as ocorrências fracas também deixam de existir.
- **Notação:** retângulo de **linha dupla** (e o relacionamento identificador em losango duplo).

### Entidade associativa (5.1.3)

Nasce quando um relacionamento **muitos-para-muitos** (capítulo 8) **tem dados próprios**.

- Um aluno faz **várias** turmas e uma turma tem **vários** alunos. A ligação tem **data da
  matrícula**, **situação** e **nota final** → vira a entidade associativa **MATRÍCULA**.
- Um pedido tem vários produtos e um produto aparece em vários pedidos; quantidade e preço na
  venda → **ITEM_PEDIDO**, associativa entre PEDIDO e PRODUTO.
- **Notação:** retângulo envolvendo o losango do relacionamento.

### Dos requisitos às entidades: passo a passo

1. Ler os requisitos e **sublinhar os substantivos** importantes.
2. Descartar o que é **sinônimo** (estudante = aluno), **atributo** (telefone) ou **fora do
   escopo** (cantina).
3. Conferir se cada candidata tem **várias ocorrências** e **dados próprios**.
4. Classificar: forte, fraca (depende de quem?) ou associativa (liga quais entidades?).
5. Registrar a **justificativa** de cada classificação.

### Aplicando no pedido da escola

Requisitos levantados no capítulo 5: "guardar alunos e seus responsáveis; os cursos têm turmas em
turnos; o aluno se matricula numa turma; cada matrícula gera parcelas mensais; os professores dão
aulas nas turmas".

| Entidade | Tipo | Justificativa |
|---|---|---|
| ALUNO | Forte | Existe por si e tem identificador próprio |
| RESPONSÁVEL | Forte | Tem dados próprios (nome, CPF, telefone) |
| CURSO | Forte | Vários cursos, cada um com nome, carga e valor |
| TURMA | Forte | Tem código próprio, embora pertença a um curso |
| PROFESSOR | Forte | Existe por si e dá aulas em várias turmas |
| MATRÍCULA | Associativa | Liga ALUNO e TURMA e tem data e situação |
| PARCELA | Fraca | Só existe e só é identificada dentro de uma matrícula |

"Turno" e "telefone" são **atributos**, não entidades. Os relacionamentos com cardinalidade entre
essas entidades são desenhados no capítulo 8.

## Resumo

- O MER descreve entidades, atributos e relacionamentos sem depender do SGBD; o DER é o desenho.
- Entidade é um conjunto de objetos sobre os quais se guardam dados; ocorrência é cada elemento.
- Forte existe por si; fraca depende da dona para existir e ser identificada.
- Associativa nasce de um relacionamento N:N que tem dados próprios (MATRÍCULA, ITEM_PEDIDO).
- Substantivos do pedido viram candidatas; cada classificação é justificada.

---

# Capítulo 07 — Atributos

- **Aula:** 07
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-07.md`

## Teoria

### Atributo e valor

- **Atributo** é uma **característica** da entidade que o sistema precisa guardar: nome, CPF e data
  de nascimento de ALUNO.
- **Valor** é o conteúdo do atributo numa ocorrência: nome = "Ana Souza".
- **Notação no DER:** elipse ligada à entidade (ou lista de atributos dentro do retângulo).

### Quanto à estrutura: simples e composto

| Tipo | Definição | Exemplos |
|---|---|---|
| **Simples (5.3.1)** | Não se divide em partes com significado próprio | CPF, data de nascimento, preço, quantidade |
| **Composto (5.3.2)** | Pode ser dividido em partes menores, cada uma com significado | Endereço (rua, número, bairro, cidade, CEP); nome completo; telefone (DDD, número) |

🔑 Divida o composto quando o sistema **precisa usar as partes** separadamente: listar alunos **por
bairro** exige o bairro separado. Na tabela, cada parte vira uma coluna.

### Quanto à função: descritivo, nominativo e referencial

| Tipo | Definição | Exemplos |
|---|---|---|
| **Descritivo (5.3.3)** | Descreve uma característica da ocorrência, sem identificá-la | Preço, carga horária, situação, data de nascimento |
| **Nominativo (5.3.4)** | Além de descrever, **nomeia ou identifica** a ocorrência | Código do curso, número da matrícula, nome do curso, CPF |
| **Referencial (5.3.5)** | **Faz referência a outra entidade**, ligando as duas | Código do curso dentro de TURMA; código do aluno dentro de MATRÍCULA |

- O **nominativo** costuma ser o candidato a **identificador** (chave primária, capítulo 13).
- O **referencial** é a semente da **chave estrangeira** (capítulo 13) e revela um
  **relacionamento** (capítulo 8).

### Identificador

É o atributo (ou conjunto de atributos) que **distingue uma ocorrência de todas as outras**: não se
repete e não fica vazio.

- ALUNO → id do aluno (ou CPF).
- PARCELA (fraca) → id da matrícula + número da parcela.
- Prefira um **código próprio** (id) a dados que podem mudar ou faltar: o e-mail muda e uma criança
  pode não ter CPF.

### Dicionário de atributos

Documento que registra cada atributo de forma padronizada:

| Entidade | Atributo | Descrição | Tipo | Obrig. | Classificação | Exemplo |
|---|---|---|---|---|---|---|
| ALUNO | id_aluno | Código do aluno | inteiro | sim | simples, nominativo, identificador | 15 |
| ALUNO | nome | Nome completo | texto (100) | sim | composto, nominativo | Ana Souza |
| ALUNO | data_nascimento | Data de nascimento | data | sim | simples, descritivo | 2008-03-21 |
| ALUNO | rua, numero, bairro, cidade, cep | Endereço | texto | sim | composto, descritivo | Rua das Flores, 120… |
| TURMA | id_curso | Curso da turma | inteiro | sim | simples, referencial (CURSO) | 3 |

Os tipos exatos do PostgreSQL (`integer`, `varchar`, `date`, `numeric`…) entram no capítulo 12;
aqui basta a ideia: inteiro, texto, data, decimal, verdadeiro ou falso.

### Aplicando na ficha da escola

Na ficha de matrícula em papel aparecem "Nome", "CPF", "Nascimento", "Endereço", "Telefone do
responsável", "Curso", "Turma", "Turno" e "Data". Você, como aluno consultor, classifica:

| Campo da ficha | Classificação | Entidade |
|---|---|---|
| Nome | Composto e nominativo | ALUNO |
| CPF | Simples e nominativo | ALUNO |
| Nascimento | Simples e descritivo | ALUNO |
| Endereço | Composto e descritivo (dividido: a escola quer relatório por bairro) | ALUNO |
| Curso, Turma | Referenciais (apontam para CURSO e TURMA) | TURMA, MATRÍCULA |
| Turno | Descritivo | TURMA |
| Data | Descritivo | MATRÍCULA |

### Erros comuns

- Guardar a **idade** em vez da **data de nascimento** (a idade muda todo ano; a data não).
- Juntar várias informações num campo só ("telefones: 99999-1111 / 98888-2222").
- Criar atributo referencial sem existir a entidade referenciada.
- Usar o **nome** como identificador (há homônimos).

## Resumo

- Atributo é uma característica da entidade; valor é o conteúdo numa ocorrência.
- Estrutura: simples (não se divide) ou composto (dividido quando as partes são usadas).
- Função: descritivo (descreve), nominativo (nomeia ou identifica) e referencial (aponta para
  outra entidade).
- O identificador distingue cada ocorrência; prefira um código próprio.
- O dicionário de atributos registra descrição, tipo, obrigatoriedade, classificação e exemplo.

---

# Capítulo 08 — Relacionamentos 1:1, 1:N e N:N

- **Aula:** 08
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-08.md`

## Teoria

### Relacionamento

É a **associação entre entidades** que o sistema precisa registrar. Recebe um **verbo** e é
desenhado como **losango** ligando as entidades: CURSO —⟨oferece⟩— TURMA; ALUNO —⟨realiza⟩—
MATRÍCULA.

### Como descobrir a cardinalidade máxima

Faça **duas perguntas**, uma em cada sentido:

1. "Um **A** se liga a **quantos** B, no máximo?"
2. "Um **B** se liga a **quantos** A, no máximo?"

| Respostas | Cardinalidade |
|---|---|
| um e um | **1:1** |
| um A tem muitos B; um B tem um A | **1:N** |
| muitos e muitos | **N:N** |

### Um para um: 1:1 (5.2.1)

Cada ocorrência de um lado se liga a **no máximo uma** do outro.

- Um aluno tem **um** armário na escola; um armário é de **um** aluno.
- **Implementação:** chave estrangeira com **UNIQUE** num dos lados, ou uma tabela só, se os dois
  sempre andam juntos.

### Um para muitos: 1:N (5.2.2)

Uma ocorrência de um lado se liga a **várias** do outro; no sentido contrário, a **uma só**.

- Um curso tem **várias** turmas; uma turma é de **um** curso.
- **Implementação:** a **chave estrangeira fica no lado N** (TURMA guarda `id_curso`): é o atributo
  referencial do capítulo 7.

### Muitos para muitos: N:N (5.2.3)

Várias de um lado se ligam a **várias** do outro.

- Um aluno faz **várias** turmas; uma turma tem **vários** alunos.
- **Implementação:** **tabela associativa** no meio, com as **duas chaves estrangeiras** e os dados
  próprios da ligação: MATRÍCULA (`id_aluno`, `id_turma`, data, situação). É a entidade
  associativa do capítulo 6.

### Cardinalidade mínima (participação)

Pergunte: "Um **A** precisa ter **pelo menos um** B?"

- **0 (opcional):** um aluno pode estar cadastrado **sem** matrícula.
- **1 (obrigatória):** uma matrícula **precisa** ter um aluno.

Na notação completa, cada ponta leva (mínimo, máximo): ALUNO (1,1) —⟨realiza⟩— (0,N) MATRÍCULA.
Lê-se: um aluno realiza de 0 a N matrículas; uma matrícula é de exatamente 1 aluno. Na notação "pé
de galinha", comum nas ferramentas, traço = 1, círculo = 0 e tridente = muitos.

### Autorrelacionamento

Uma entidade se relaciona **com ela mesma**:

- Um CURSO é **pré-requisito** de outros CURSOS (N:N).
- Um FUNCIONÁRIO **supervisiona** vários FUNCIONÁRIOS (1:N), com chave estrangeira apontando para
  a mesma tabela (`id_supervisor`).

### Os relacionamentos da escola

| Relacionamento | Cardinalidade | Como fica no banco |
|---|---|---|
| CURSO (1,1) —⟨oferece⟩— (0,N) TURMA | 1:N | `id_curso` em TURMA |
| ALUNO —⟨matricula-se em⟩— TURMA | N:N | Associativa MATRÍCULA com `id_aluno` e `id_turma` |
| MATRÍCULA (1,1) —⟨gera⟩— (1,N) PARCELA | 1:N | `id_matricula` em PARCELA (fraca) |
| RESPONSÁVEL (1,1) —⟨responde por⟩— (0,N) ALUNO | 1:N | `id_responsavel` em ALUNO |
| PROFESSOR —⟨leciona em⟩— TURMA | N:N | Associativa entre PROFESSOR e TURMA |

Cada cardinalidade é **justificada** pela resposta do cliente: "uma turma pode ter mais de um
professor" foi dito pela coordenação; por isso PROFESSOR × TURMA é N:N.

### Erros comuns

- Ler a frase **num sentido só** e marcar 1:N quando é N:N.
- Deixar N:N **sem** tabela associativa.
- Pôr a chave estrangeira **no lado 1** do 1:N (o curso teria de guardar uma lista de turmas).
- Marcar participação obrigatória sem perguntar ao cliente.

## Resumo

- Relacionamento é a associação entre entidades, com verbo e losango.
- A cardinalidade máxima sai de duas perguntas, uma em cada sentido: 1:1, 1:N ou N:N.
- 1:N põe a chave estrangeira no lado N; N:N vira tabela associativa com as duas chaves.
- A cardinalidade mínima diz se a participação é opcional (0) ou obrigatória (1).
- Autorrelacionamento liga uma entidade a ela mesma.

---

# Capítulo 09 — Diagrama entidade-relacionamento

- **Aula:** 09
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C2, S1
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-09.md`

## Teoria

### Elementos do DER (notação de Chen)

| Elemento | Forma | Exemplo |
|---|---|---|
| Entidade | Retângulo | ALUNO |
| Entidade fraca | Retângulo de linha dupla | PARCELA |
| Atributo | Elipse ligada à entidade | nome |
| Identificador | Elipse com o nome **sublinhado** | id_aluno |
| Atributo composto | Elipse ligada às elipses das partes | endereço → rua, número, bairro |
| Relacionamento | Losango com verbo | realiza |
| Cardinalidade | (mín, máx) junto a cada entidade | (0,N) |
| Entidade associativa | Retângulo envolvendo o losango | MATRÍCULA |

### Notação pé de galinha

Usada no **modelo lógico** (tabelas) e em ferramentas de diagrama:

- Cada entidade vira uma **caixa** com a lista de atributos, indicando PK e FK.
- As linhas mostram a cardinalidade nas pontas: **traço** = 1, **círculo** = 0, **tridente** =
  muitos.
- O N:N aparece já **resolvido** pela tabela associativa.

| Situação | Chen | Pé de galinha |
|---|---|---|
| Um curso tem 0..N turmas | CURSO (1,1) —⟨oferece⟩— (0,N) TURMA | CURSO ‖——○< TURMA |
| Aluno N:N turma | ALUNO e TURMA com a associativa MATRÍCULA | ALUNO ‖——○< MATRÍCULA >○——‖ TURMA |

### Do conceitual ao lógico

- O DER **conceitual** (Chen) mostra o negócio, para validar com o cliente.
- O DER **lógico** (pé de galinha) mostra as **tabelas**, as **chaves primárias** e as **chaves
  estrangeiras**, preparando a **normalização** (capítulo 10) e o **SQL** (capítulo 12).

### Passo a passo para desenhar

1. Colocar as **entidades fortes** principais no centro (ALUNO, TURMA, CURSO).
2. Ligar com os **relacionamentos** e escrever o **verbo**.
3. Marcar as **cardinalidades** (mín, máx) nos dois lados.
4. Acrescentar as **entidades fracas** e **associativas**.
5. Acrescentar os **atributos**, sublinhando os **identificadores**.
6. Organizar para **não cruzar linhas**; nomes no singular e padronizados.
7. Conferir com o **checklist** abaixo e com os **requisitos** do escopo.

Ferramentas possíveis: uma ferramenta de DER (brModelo ou draw.io) ou o desenhador de diagramas do
próprio cliente do PostgreSQL. Papel e lápis também servem para o primeiro rascunho.

### Checklist de qualidade do DER

- Todo requisito de dados do escopo aparece em alguma entidade ou atributo?
- Toda entidade tem **identificador**?
- Todo relacionamento tem **verbo** e **cardinalidade nos dois lados**?
- Todo N:N tem **associativa** no modelo lógico?
- Cada entidade fraca indica a **dona**?
- Não há atributo **repetido** em duas entidades sem motivo (sinal de redundância)?
- O desenho é **legível** por quem não o fez (o cliente consegue ler)?

### O DER da escola

| Entidade | Atributos principais (id = identificador) | Ligações |
|---|---|---|
| CURSO | **id_curso** (id), nome, carga_horaria, valor_mensal | oferece (0,N) TURMA |
| TURMA | **id_turma** (id), turno, vagas | pertence a (1,1) CURSO |
| ALUNO | **id_aluno** (id), nome, cpf, data_nascimento, endereço (composto) | responsável (1,1) RESPONSÁVEL |
| MATRÍCULA (associativa) | data, situação, nota_final | liga ALUNO e TURMA |
| PARCELA (fraca) | número, vencimento, valor, data_pagamento | gerada por (1,1) MATRÍCULA |
| RESPONSÁVEL | **id_responsavel** (id), nome, cpf, telefone | responde por (0,N) ALUNO |
| PROFESSOR × TURMA (associativa) | dia da semana, horário | liga PROFESSOR e TURMA |

### Revisão em dupla (S1)

A revisão do DER por outra pessoa encontra erros que o autor não vê.

- O revisor **pergunta** em vez de acusar: "este relacionamento é mesmo 1:1?".
- O autor **escuta**, confere nos requisitos e **aceita ou justifica**.
- As mudanças são **registradas**.

Na escola, a dupla vizinha perguntou: "onde fica o valor da mensalidade?". O grupo percebeu que
faltava `valor_mensal` em CURSO e corrigiu o diagrama, registrando a mudança. Acolher a sugestão
melhorou o modelo antes de qualquer linha de SQL.

## Resumo

- Chen: retângulo (entidade), losango (relacionamento), elipse (atributo), identificador
  sublinhado, linha dupla para a fraca.
- Pé de galinha: caixas com PK e FK; traço = 1, círculo = 0, tridente = muitos.
- O DER conceitual valida o negócio; o lógico prepara normalização e SQL.
- O checklist confere requisitos, identificadores, verbos, cardinalidades, associativas e
  legibilidade.
- A revisão em dupla pergunta, escuta, aceita ou justifica e registra as mudanças.

---

# Capítulo 10 — Normalização de dados (1FN, 2FN e 3FN)

- **Aula:** 10
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C3, S2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-10.md`

## Teoria

### Por que normalizar

**Normalização** é organizar as tabelas em **formas normais**, separando os dados para que **cada
fato seja guardado uma única vez**. Resultado: menos redundância, menos erros, alterações num só
lugar e um banco mais fácil de manter.

### A planilha "tudo junto" e as anomalias

Esta é a planilha que a secretaria da escola usa hoje:

| matricula | aluno | telefones | curso | carga_curso | turma | turno | data_matricula |
|---|---|---|---|---|---|---|---|
| 1 | Ana Souza | 99999-1111, 98888-2222 | Excel | 40 | T1 | manhã | 2026-02-03 |
| 2 | Ana Souza | 99999-1111, 98888-2222 | Python | 60 | T5 | noite | 2026-02-10 |
| 3 | Bruno Lima | 97777-3333 | Excel | 40 | T1 | manhã | 2026-02-04 |

| Anomalia | O que acontece aqui |
|---|---|
| **Inserção** | Não dá para cadastrar um curso novo sem um aluno matriculado nele |
| **Atualização** | Se a carga do Excel muda para 44 h, é preciso alterar **todas** as linhas do Excel; esquecendo uma, os dados se contradizem |
| **Exclusão** | Apagando a única matrícula do Python, perde-se a informação de que o curso existe |

### Dependência funcional

**A → B** (lê-se "A determina B"): conhecendo **A**, sabe-se **um único valor** de **B**.

- `id_aluno` → nome do aluno
- curso → carga do curso
- turma → turno, curso

A normalização usa essas dependências para decidir **em qual tabela cada atributo fica**.

### Primeira forma normal (1FN)

Uma tabela está na **1FN** quando todos os valores são **atômicos** (um valor por célula), não há
**grupos repetidos** (telefone1, telefone2, telefone3) e existe uma **chave primária**.

Na planilha, "telefones" tem dois valores numa célula. **Solução:** tabela TELEFONE_ALUNO
(`id_aluno`, telefone), com uma linha por telefone.

### Segunda forma normal (2FN)

Está na **1FN** e **todo atributo não chave depende da chave inteira**, e não só de uma parte dela
(sem **dependência parcial**). Só se aplica quando a chave é **composta**.

Na tabela de matrículas com chave (`id_aluno`, `id_turma`) e os atributos nome_aluno, turno e
data_matricula:

- data_matricula depende de (`id_aluno`, `id_turma`) → fica;
- nome_aluno depende **só** de `id_aluno` → vai para ALUNO;
- turno depende **só** de `id_turma` → vai para TURMA.

### Terceira forma normal (3FN)

Está na **2FN** e **nenhum atributo não chave depende de outro atributo não chave** (sem
**dependência transitiva** A → B → C).

Em TURMA (`id_turma`, turno, `id_curso`, nome_curso, carga_curso), vale `id_turma` → `id_curso` →
carga_curso. Nome e carga dependem do **curso**, não da turma → vão para CURSO (`id_curso`, nome,
carga_horaria), e TURMA fica só com `id_curso` (chave estrangeira).

🔑 Cada atributo depende **da chave, da chave inteira e de nada além da chave**.

Regra de bolso: se um dado precisa ser corrigido em mais de um lugar, o modelo ainda não está
normalizado.

### Resultado normalizado da escola

| Tabela | Colunas |
|---|---|
| ALUNO | `id_aluno`, nome |
| TELEFONE_ALUNO | `id_aluno`, telefone |
| CURSO | `id_curso`, nome, carga_horaria |
| TURMA | `id_turma`, codigo, turno, `id_curso` |
| MATRICULA | `id_aluno`, `id_turma`, data_matricula |

As tabelas coincidem com as entidades e as associativas do DER do capítulo 9. Quando a diretora
muda a carga do Excel para 44 h, a alteração é feita **uma vez**, em CURSO, e vale para todas as
turmas.

### Justificar as escolhas (S2) e quando não normalizar tudo

Cada separação é justificada pela dependência funcional e pelas anomalias que ela evita. Às vezes
um dado é **repetido de propósito** (desnormalização) para ganhar velocidade em relatórios pesados,
sempre como **decisão documentada**. Um caso comum é o **valor cobrado na parcela**: parece repetir
o valor do curso, mas é o valor **daquela cobrança** (histórico) e não deve mudar quando o preço
atual do curso mudar.

## Resumo

- Normalizar é guardar cada fato uma única vez, evitando anomalias de inserção, atualização e
  exclusão.
- Dependência funcional A → B: conhecendo A, sabe-se um único B.
- 1FN: valores atômicos, sem grupos repetidos, com chave primária.
- 2FN: sem dependência parcial da chave composta; 3FN: sem dependência transitiva.
- Desnormalizar só com decisão documentada (ex.: o valor histórico da parcela).

---

# Capítulo 11 — Padronização de dados, cronograma e fluxograma

- **Aula:** 11
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C1, C3
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-11.md`

## Teoria

### Por que padronizar (5.6)

Sem padrão, cada pessoa escreve de um jeito ("DataNasc", "data_nascimento", "dt_nasc"), os dados
chegam em formatos diferentes ("09/10/26", "2026-10-09") e as consultas erram. A **padronização**
deixa o banco **previsível**, **legível** e fácil de integrar com o back-end.

### Padrão de nomes adotado na unidade curricular

| Elemento | Regra | Exemplo |
|---|---|---|
| Tabela | minúsculas, **singular**, sem acento, palavras com `_` | `aluno`, `item_pedido` |
| Coluna | minúsculas, sem acento, `_` entre palavras, nome claro | `data_nascimento`, `valor_mensal` |
| Chave primária | `id` ou `id_<tabela>` | `id_aluno` |
| Chave estrangeira | `id_<tabela referenciada>` | `id_curso` em `turma` |
| Data, data e hora | nome que deixa claro o que é | `data_matricula`, `criado_em` |
| Verdadeiro ou falso | pergunta de sim ou não | `ativo`, `pago` |

**Proibido:** espaços, acentos, palavras reservadas do SQL e abreviações obscuras (`Data Nasc`,
`order`, `dtnsc`).

### Tipos e formatos padronizados

| Dado | Padrão | Por quê |
|---|---|---|
| Data | **AAAA-MM-DD** (tipo data) | Ordena e compara certo; a tela mostra dd/mm/aaaa |
| Data e hora | Tipo com fuso (`timestamptz`) | Horário de Brasília correto (capítulo 4) |
| CPF, CEP, telefone | **Só dígitos**, como texto | Mantém zeros à esquerda; a máscara é da tela |
| Dinheiro | **Decimal** com 2 casas | Evita erros de arredondamento |
| Nomes | Sem abreviação, sem espaços extras | Busca e ordenação corretas |
| E-mail | Minúsculas | Evita duplicidade "Ana@" × "ana@" |

### Domínios: listas fechadas

Atributos com poucos valores possíveis usam uma **lista fechada**, garantida no banco por CHECK ou
por uma tabela de apoio:

- `situacao` da matrícula: **ativa, trancada, concluida, cancelada**;
- `turno` da turma: **manha, tarde, noite**.

Assim ninguém grava "Ativo", "ATIVA" e "atv" para a mesma coisa. O dicionário de atributos
(capítulo 7) é atualizado com os nomes padronizados, os tipos, os formatos e os domínios: é ele que
guia o SQL do capítulo 12.

Na escola, `Turma.Turno` vira `turma.turno` com o domínio (manha, tarde, noite); `CPF` com pontos
vira `cpf` só com dígitos; `valor` vira `valor_mensal`, decimal com 2 casas.

### Cronograma (6.2)

Lista as **etapas** com **duração**, **dependências**, **responsáveis** e **marcos** (entregas
importantes). Pode ser uma tabela ou um gráfico de Gantt simples numa planilha.

| Etapa | Depende de | Duração | Marco |
|---|---|---|---|
| Escopo e requisitos | — | 1 semana | Escopo aprovado |
| Entidades, atributos, relacionamentos | Escopo | 2 semanas | — |
| DER e revisão | Relacionamentos | 1 semana | DER validado |
| Normalização e padrão | DER | 1 semana | Modelo final |
| Scripts DDL e DML | Modelo final | 2 semanas | Banco criado |
| Procedimentos, triggers, segurança | Scripts | 2 semanas | Banco pronto |
| Documentação técnica | Tudo | 1 semana | Entrega final |

Comece pelas **dependências** (o que precisa estar pronto antes), deixe **folga** antes dos marcos
e compare **realizado × planejado** toda semana (gestão do tempo, 1.1). O cronograma da escola
mostra que os scripts só começam depois do modelo final.

### Fluxograma (6.3)

Desenha os **passos de um processo** e as **decisões**, mostrando onde o banco é **consultado** ou
**gravado**.

| Símbolo | Significado |
|---|---|
| Oval | Início ou fim |
| Retângulo | Processo (ação) |
| Losango | Decisão (sim ou não) |
| Paralelogramo | Entrada ou saída de dados |
| Cilindro | Banco de dados (consulta ou gravação) |
| Setas | Sentido do fluxo |

Fluxo da matrícula, em resumo:

```
Início → secretaria informa o CPF → [banco] aluno existe?
   não → cadastrar aluno → o aluno é menor de idade? sim → cadastrar responsável
   sim → escolher turma → [banco] a turma tem vaga?
         não → oferecer outra turma
         sim → [banco] gravar matrícula e parcelas → emitir comprovante → Fim
```

Ao desenhar o fluxo, o grupo descobriu uma decisão que faltava no levantamento: "o aluno é menor
de idade? → cadastrar responsável". O fluxograma também confirma as **demandas do cliente** (C1):
cada passo precisa de dados que o modelo já guarda.

## Resumo

- Padronizar deixa o banco previsível: nomes em minúsculas, no singular, sem acento, com `_`.
- Chave primária `id_<tabela>`; chave estrangeira `id_<tabela referenciada>`.
- Datas AAAA-MM-DD, documentos só com dígitos, dinheiro decimal com 2 casas, e-mail minúsculo.
- Domínios (listas fechadas) evitam valores diferentes para a mesma coisa.
- Cronograma organiza etapas, dependências e marcos; fluxograma mostra passos, decisões e onde o
  banco entra.

---

# Capítulo 12 — DDL: tabelas e campos

- **Aula:** 12
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C7
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-12.md`

## Teoria

### A situação de aprendizagem 2

Começa aqui a **SA 2 — Banco pronto para o back-end** (capítulos 12 a 20). O sistema de matrículas
modelado na SA 1 precisa do banco funcionando. Você, como aluno consultor, cria o banco no
PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria
papéis com permissões mínimas e auditoria e entrega a documentação técnica.

### SQL, DDL e DML

- **SQL** (*Structured Query Language*) é a linguagem padrão dos bancos relacionais.
- **DDL** (*Data Definition Language*): comandos que **criam e alteram a estrutura**: `CREATE`,
  `ALTER`, `DROP`.
- **DML** (*Data Manipulation Language*): comandos que **mexem nos dados**: `INSERT`, `UPDATE`,
  `DELETE`, `SELECT` (capítulos 14 a 16).

### Tipos de dados mais usados no PostgreSQL

| Tipo | Uso | Exemplo |
|---|---|---|
| `integer` / `bigint` | Números inteiros (`bigint` para valores muito grandes) | quantidade, id |
| `numeric(p,s)` | Decimal exato (p dígitos, s casas) | `numeric(10,2)` para dinheiro |
| `varchar(n)` | Texto com até n caracteres | `varchar(100)` para nome |
| `text` | Texto sem limite definido | observações |
| `char(n)` | Texto de tamanho fixo | `char(2)` para UF |
| `boolean` | Verdadeiro ou falso | `ativo` |
| `date` | Data (AAAA-MM-DD) | data_nascimento |
| `timestamptz` | Data e hora com fuso | criado_em |

O tipo vem do **dicionário de dados** (capítulo 11): CPF → `varchar(11)` só com dígitos; valor →
`numeric(10,2)`.

### CREATE TABLE: tabelas e campos (3.1.1 e 3.1.2)

```sql
CREATE TABLE curso (
    id_curso       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome           varchar(100) NOT NULL,
    carga_horaria  integer NOT NULL,
    valor_mensal   numeric(10,2) NOT NULL,
    ativo          boolean NOT NULL DEFAULT true,
    criado_em      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE aluno (
    id_aluno         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome             varchar(100) NOT NULL,
    cpf              varchar(11),
    data_nascimento  date NOT NULL,
    email            varchar(120),
    telefone         varchar(11)
);
```

- **`GENERATED ALWAYS AS IDENTITY`:** o banco gera o número do id sozinho (1, 2, 3…).
- **`NOT NULL`:** o campo é obrigatório.
- **`DEFAULT`:** valor usado quando nada é informado (`true`, `now()`).
- As chaves estrangeiras e as demais restrições ficam para o **capítulo 13**.

### Conferindo a estrutura

```sql
\dt              -- lista as tabelas (psql)
\d aluno         -- mostra colunas, tipos e restrições de aluno
```

No cliente gráfico: *Schemas → public → Tables → aluno → Columns*.

### ALTER TABLE: mudar a estrutura

```sql
ALTER TABLE aluno ADD COLUMN data_cadastro date DEFAULT current_date;   -- acrescenta coluna
ALTER TABLE aluno RENAME COLUMN telefone TO celular;                     -- renomeia a coluna
ALTER TABLE aluno ALTER COLUMN email TYPE varchar(150);                  -- muda o tipo
ALTER TABLE aluno ALTER COLUMN email SET NOT NULL;                       -- torna obrigatório
ALTER TABLE aluno DROP COLUMN data_cadastro;                             -- remove a coluna
```

⚠️ Tornar uma coluna `NOT NULL` **falha** se já houver linhas com o campo vazio; mudar o tipo pode
falhar se os dados atuais não couberem no novo tipo.

### DROP TABLE: remover a tabela

```sql
DROP TABLE IF EXISTS tabela_teste;
```

- Remove a **tabela e todos os dados**; não há "desfazer" fora de uma transação.
- `IF EXISTS` evita erro quando a tabela não existe (útil em scripts de teste).
- Em produção, só com **backup** e confirmação.

### O script DDL

Os comandos ficam num arquivo `.sql` (ex.: `01-ddl-escola.sql`), em ordem, com comentários e
versionado no Git:

```bash
psql -U postgres -d escola_db -f 01-ddl-escola.sql
```

Na escola, o dicionário de dados vira as tabelas `curso`, `turma`, `aluno`, `responsavel`,
`professor`, `matricula`, `parcela` e a associativa entre professor e turma. Na segunda execução, o
psql acusou "relation curso already exists": o grupo pôs `DROP TABLE IF EXISTS` no início do script
**de teste** (nunca no de produção), e o script passou a rodar do zero sempre que preciso.

## Resumo

- SQL é a linguagem dos bancos relacionais; DDL cria a estrutura, DML mexe nos dados.
- Tipos principais: `integer`, `numeric(10,2)`, `varchar(n)`, `text`, `boolean`, `date`,
  `timestamptz`.
- `CREATE TABLE` define colunas, tipos, `NOT NULL`, `DEFAULT` e o id gerado pelo banco.
- `ALTER TABLE` acrescenta, renomeia, muda ou remove colunas; `DROP TABLE` remove a tabela.
- O script `.sql` fica versionado e roda com `psql -f`.

---

# Capítulo 13 — DDL: relações, chaves e restrições

- **Aula:** 13
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C7
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-13.md`

## Teoria

### Chave primária (PRIMARY KEY)

Identifica cada linha: é **única** e **não nula** (o identificador do capítulo 7).

```sql
-- simples
id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY
-- composta (entidade fraca PARCELA: matrícula + número)
PRIMARY KEY (id_matricula, numero)
```

### Chave estrangeira (FOREIGN KEY): as relações (3.1.3)

Implementa o relacionamento: o valor **precisa existir** na tabela referenciada (**integridade
referencial**).

```sql
CREATE TABLE turma (
    id_turma  integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo    varchar(10) NOT NULL UNIQUE,
    turno     varchar(5)  NOT NULL CHECK (turno IN ('manha', 'tarde', 'noite')),
    id_curso  integer NOT NULL REFERENCES curso (id_curso)
);
```

Gravar uma turma com `id_curso = 99`, que não existe, gera o erro *violates foreign key
constraint*.

### Associativa com duas chaves estrangeiras

```sql
CREATE TABLE matricula (
    id_matricula    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno        integer NOT NULL REFERENCES aluno (id_aluno),
    id_turma        integer NOT NULL REFERENCES turma (id_turma),
    data_matricula  date NOT NULL DEFAULT current_date,
    situacao        varchar(10) NOT NULL DEFAULT 'ativa'
                    CHECK (situacao IN ('ativa', 'trancada', 'concluida', 'cancelada')),
    UNIQUE (id_aluno, id_turma)   -- o mesmo aluno não se matricula duas vezes na mesma turma
);
```

### ON DELETE: o que acontece com as linhas filhas

| Opção | Ao excluir a linha "pai"… | Uso típico |
|---|---|---|
| `RESTRICT` ou o padrão (`NO ACTION`) | **Impede** a exclusão se houver filhas | Não excluir curso que tem turmas |
| `CASCADE` | Exclui **também** as filhas | Entidade fraca: a matrícula leva as parcelas |
| `SET NULL` | Deixa vazia a chave estrangeira das filhas | Funcionário cujo supervisor saiu |

```sql
CREATE TABLE parcela (
    id_matricula    integer NOT NULL REFERENCES matricula (id_matricula) ON DELETE CASCADE,
    numero          smallint NOT NULL,
    vencimento      date NOT NULL,
    valor           numeric(10,2) NOT NULL CHECK (valor > 0),
    data_pagamento  date,
    PRIMARY KEY (id_matricula, numero)
);
```

⚠️ `CASCADE` pode excluir muitos dados de uma vez: use só quando as filhas **não fazem sentido** sem
o pai.

### UNIQUE e CHECK

- **`UNIQUE`:** o valor não se repete (`cpf varchar(11) UNIQUE`). Valores vazios (NULL) não contam
  como repetidos.
- **`CHECK`:** condição que toda linha cumpre (`CHECK (valor > 0)`), inclusive os **domínios** do
  capítulo 11.

### Nomeando e acrescentando restrições

```sql
ALTER TABLE aluno ADD CONSTRAINT aluno_cpf_unico UNIQUE (cpf);
ALTER TABLE aluno ADD CONSTRAINT aluno_responsavel_fk
      FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel);
```

Dar **nome** às restrições deixa as mensagens de erro claras e facilita mudá-las depois.

### Da regra de negócio à restrição

| Regra do cliente (capítulo 5) | Restrição |
|---|---|
| CPF não se repete | `UNIQUE (cpf)` |
| Toda matrícula é de um aluno e de uma turma | `REFERENCES aluno`, `REFERENCES turma`, `NOT NULL` |
| Mensalidade maior que zero | `CHECK (valor > 0)` |
| Turno só manhã, tarde ou noite | `CHECK (turno IN (...))` |
| Não matricular duas vezes na mesma turma | `UNIQUE (id_aluno, id_turma)` |
| Turma com no máximo 25 alunos | Não cabe num CHECK simples: **trigger** (capítulo 18) |

### Lendo os erros

| Mensagem | Significado |
|---|---|
| *duplicate key value violates unique constraint* | Valor repetido |
| *violates foreign key constraint* | Aponta para algo que não existe, ou impede excluir o pai |
| *violates check constraint* | A condição do CHECK não foi cumprida |
| *null value in column … violates not-null constraint* | Campo obrigatório vazio |

Na escola, o grupo tentou excluir o curso "Excel", que tem turmas, e o banco recusou (`RESTRICT`),
exatamente o que a diretora queria. Ao excluir uma matrícula de teste, as parcelas dela saíram
junto (`CASCADE`), sem deixar parcelas "órfãs". O erro é o **resultado esperado**: mostra que a
regra está protegida pelo banco.

## Resumo

- Chave primária identifica cada linha; pode ser simples ou composta (entidade fraca).
- Chave estrangeira implementa a relação e garante a integridade referencial.
- A associativa tem duas chaves estrangeiras e, em geral, um `UNIQUE` do par.
- `ON DELETE` decide: impedir (`RESTRICT`), levar junto (`CASCADE`) ou esvaziar (`SET NULL`).
- `UNIQUE` e `CHECK` transformam regras de negócio em restrições; restrições nomeadas dão erros
  claros.

---

# Capítulo 14 — DML: inserção, atualização e exclusão

- **Aula:** 14
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C8
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-14.md`

## Teoria

### INSERT: inserir linhas (3.2.3)

```sql
-- uma linha, informando as colunas (o id é gerado pelo banco)
INSERT INTO curso (nome, carga_horaria, valor_mensal)
VALUES ('Excel Básico', 40, 180.00);

-- várias linhas de uma vez
INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES
    ('Python Iniciante', 60, 250.00),
    ('Design Gráfico',   48, 220.00);

-- devolvendo o id gerado (útil para o back-end)
INSERT INTO aluno (nome, cpf, data_nascimento)
VALUES ('Ana Souza', '12345678901', '2008-03-21')
RETURNING id_aluno;
```

- Sempre **liste as colunas**: o comando continua certo mesmo se a tabela ganhar colunas novas.
- Colunas com **DEFAULT** (ativo, criado_em, data_matricula) podem ser omitidas.
- Textos e datas entre **aspas simples**; números sem aspas; decimal com **ponto**.

### Ordem de inserção

A chave estrangeira exige que o "pai" exista antes: **curso → turma → aluno → matricula →
parcela**. Inserir uma turma de um curso que não existe gera *violates foreign key constraint*.

### UPDATE: alterar linhas (3.2.2)

```sql
UPDATE curso
SET valor_mensal = 195.00
WHERE id_curso = 1;

UPDATE matricula
SET situacao = 'trancada'
WHERE id_aluno = 5 AND id_turma = 2;

-- reajuste de 10% em todos os cursos ativos
UPDATE curso
SET valor_mensal = valor_mensal * 1.10
WHERE ativo = true;
```

### DELETE: excluir linhas (3.2.4)

```sql
DELETE FROM matricula
WHERE id_matricula = 12;
```

- As restrições continuam valendo: excluir um curso com turmas é **recusado** (`RESTRICT`);
  excluir uma matrícula leva junto as **parcelas** (`CASCADE`).
- Muitos sistemas preferem a **exclusão lógica** (`UPDATE ... SET ativo = false`) para não perder o
  histórico.

### O perigo do WHERE esquecido

```sql
UPDATE curso SET valor_mensal = 0;   -- ❌ zera TODOS os cursos
```

Um `UPDATE` ou `DELETE` sem `WHERE` atinge **todas as linhas** da tabela. Rede de segurança:

1. Escreva primeiro o **SELECT** com o mesmo `WHERE` e confira quais linhas aparecem.
2. Rode dentro de uma **transação** e confira o número de linhas afetadas.
3. Confirme com **COMMIT** ou desfaça com **ROLLBACK**.

```sql
BEGIN;
SELECT * FROM aluno WHERE id_aluno = 7;                            -- confere o alvo
UPDATE aluno SET email = 'novo@exemplo.com' WHERE id_aluno = 7;    -- "UPDATE 1"
COMMIT;      -- ou ROLLBACK; se algo saiu errado
```

Na escola, um integrante esqueceu o `WHERE ativo = true` no reajuste e alcançou também um curso
desativado. Como estava numa transação, viu "UPDATE 6" em vez de "UPDATE 5", desconfiou, executou
**ROLLBACK** e refez o comando com o `WHERE`.

### TRUNCATE

`TRUNCATE TABLE tabela_teste;` esvazia a tabela inteira de uma vez, mais rápido que um `DELETE`
sem `WHERE`. Uso: **bancos de teste**, nunca em produção sem backup.

### Carga de dados de teste

O script `02-dados-teste.sql` traz dados **fictícios** (nunca dados reais de pessoas): 5 cursos, 8
turmas, 30 alunos, 40 matrículas e as parcelas. Com ele você testa as consultas dos capítulos 15 e
16.

## Resumo

- `INSERT` grava linhas (listando as colunas); `RETURNING` devolve o id gerado.
- A ordem de inserção segue as chaves estrangeiras: pai antes do filho.
- `UPDATE ... SET ... WHERE` altera; `DELETE FROM ... WHERE` exclui, respeitando `RESTRICT` e
  `CASCADE`.
- Sem `WHERE`, o comando atinge a tabela inteira: confira com `SELECT` e use `BEGIN`, `COMMIT` e
  `ROLLBACK`.
- `TRUNCATE` só em banco de teste; dados de teste sempre fictícios.

---

# Capítulo 15 — DML: consultas com filtros e ordenação

- **Aula:** 15
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C8
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-15.md`

## Teoria

### Estrutura básica do SELECT (3.2.1)

```sql
SELECT coluna1, coluna2       -- o que mostrar
FROM tabela                   -- de onde
WHERE condição                -- quais linhas
ORDER BY coluna               -- em que ordem
LIMIT 10;                     -- quantas linhas
```

A ordem de escrita é sempre essa. `SELECT *` mostra todas as colunas e é útil para explorar; no
sistema, prefira **listar as colunas** (mais claro e mais leve).

### Colunas, apelidos e cálculos

```sql
SELECT nome AS curso,
       valor_mensal,
       valor_mensal * 12 AS valor_anual
FROM curso;
```

- **`AS`** dá um nome amigável à coluna no resultado.
- Expressões fazem contas na consulta, sem alterar os dados.

### WHERE e operadores

| Operador | Exemplo | Significado |
|---|---|---|
| `=` `<>` | `turno = 'noite'` | igual / diferente |
| `>` `>=` `<` `<=` | `valor_mensal >= 200` | comparação |
| `BETWEEN` | `data_matricula BETWEEN '2026-02-01' AND '2026-02-28'` | intervalo (inclui as pontas) |
| `IN` | `situacao IN ('trancada', 'cancelada')` | está na lista |
| `LIKE` | `nome LIKE 'Ana%'` | começa com "Ana" (`%` = qualquer texto, `_` = um caractere) |
| `ILIKE` | `nome ILIKE '%silva%'` | como `LIKE`, sem diferenciar maiúsculas |
| `IS NULL` | `cpf IS NULL` | campo vazio (nunca `= NULL`) |

### Combinando condições

```sql
SELECT codigo, turno
FROM turma
WHERE turno = 'noite' AND (id_curso = 1 OR id_curso = 3);
```

- **`AND`:** as duas condições precisam ser verdadeiras; **`OR`:** basta uma; **`NOT`:** inverte.
- Use **parênteses** ao misturar `AND` e `OR`: sem eles, o `AND` é avaliado antes.

### Ordenar e limitar

```sql
SELECT nome, valor_mensal
FROM curso
ORDER BY valor_mensal DESC, nome ASC
LIMIT 3;
```

- **`ASC`** (padrão) vai do menor para o maior; **`DESC`**, do maior para o menor.
- Com mais de uma coluna, a segunda desempata.
- **`LIMIT n`** traz as n primeiras linhas; **`OFFSET m`** pula m linhas. Página 2, de 10 em 10:
  `LIMIT 10 OFFSET 10`.

### DISTINCT

```sql
SELECT DISTINCT turno FROM turma;   -- cada turno aparece uma vez
```

### Funções simples

```sql
SELECT upper(nome) AS nome_maiusculo,
       length(nome) AS letras,
       extract(year FROM age(current_date, data_nascimento)) AS idade
FROM aluno
WHERE extract(month FROM data_nascimento) = 10;   -- aniversariantes de outubro
```

- **Texto:** `upper`, `lower`, `length`, `trim`, `concat`.
- **Data:** `current_date`, `now()`, `extract`, `age`.
- **`coalesce(email, 'sem e-mail')`** mostra um texto quando o campo está vazio.

### As perguntas do cliente viram consultas

| Pergunta da escola | Consulta |
|---|---|
| Matrículas trancadas ou canceladas, da mais antiga para a mais nova | `SELECT id_aluno, id_turma, data_matricula, situacao FROM matricula WHERE situacao IN ('trancada', 'cancelada') ORDER BY data_matricula;` |
| Alunos sem e-mail, para completar o cadastro | `SELECT nome, telefone FROM aluno WHERE email IS NULL ORDER BY nome;` |
| Os 3 cursos mais caros | `SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC LIMIT 3;` |
| Turmas da noite | `SELECT codigo FROM turma WHERE turno = 'noite';` |

Para cada consulta, anote o **resultado esperado** com os dados de teste antes de rodar: se o
resultado vier diferente, o erro aparece na hora.

### Erros comuns

- Texto sem aspas simples (`WHERE turno = noite`) → erro de coluna inexistente.
- `= NULL` em vez de `IS NULL` → nenhuma linha volta.
- `AND` e `OR` misturados sem parênteses → resultado errado sem nenhuma mensagem de erro.
- Esquecer o `%` no `LIKE` → procura o texto exato.

## Resumo

- `SELECT … FROM … WHERE … ORDER BY … LIMIT`, sempre nessa ordem.
- `AS` dá apelido; expressões calculam sem alterar os dados.
- Filtros com `=`, `<>`, comparações, `BETWEEN`, `IN`, `LIKE`, `ILIKE` e `IS NULL`.
- `AND`, `OR` e `NOT` combinam condições; parênteses evitam surpresas.
- `ORDER BY` ordena, `LIMIT`/`OFFSET` paginam, `DISTINCT` tira repetidos, funções tratam texto e
  datas.

---

# Capítulo 16 — Consultas com junções, agrupamentos e subconsultas

- **Aula:** 16
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C8
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-16.md`

## Teoria

### Por que juntar tabelas

Depois da normalização (capítulo 10), cada assunto fica numa tabela: a **turma** guarda só o
`id_curso`, não o nome do curso. Para mostrar "turma + nome do curso", é preciso **juntar** as
tabelas pela chave estrangeira (capítulo 13).

### INNER JOIN

```sql
SELECT t.codigo, t.turno, c.nome AS curso
FROM turma t
INNER JOIN curso c ON c.id_curso = t.id_curso;
```

- **`ON`** diz qual coluna liga as tabelas (FK = PK).
- **`t`** e **`c`** são **apelidos de tabela**: deixam a consulta curta e evitam ambiguidade.
- O `INNER JOIN` traz **só as linhas que têm par** nas duas tabelas; `JOIN` sozinho é `INNER JOIN`.
- Sem o `ON` (ou com colunas erradas) sai o **produto cartesiano**: cada linha de uma tabela
  combinada com todas as da outra.

### Três tabelas ou mais

```sql
SELECT a.nome AS aluno, t.codigo AS turma, c.nome AS curso, m.situacao
FROM matricula m
JOIN aluno a ON a.id_aluno = m.id_aluno
JOIN turma t ON t.id_turma = m.id_turma
JOIN curso c ON c.id_curso = t.id_curso
WHERE m.situacao = 'ativa'
ORDER BY c.nome, a.nome;
```

Cada `JOIN` acrescenta uma tabela e tem o seu `ON`. A associativa `matricula` é a ponte entre aluno
e turma.

### LEFT JOIN

```sql
SELECT c.nome, t.codigo
FROM curso c
LEFT JOIN turma t ON t.id_curso = c.id_curso;
```

- Traz **todas** as linhas da tabela da **esquerda**, com ou sem par; sem par, as colunas da
  direita vêm **NULL**.
- Quem **não tem** par: `WHERE t.id_turma IS NULL` (cursos sem nenhuma turma).
- `RIGHT JOIN` faz o mesmo pelo lado direito; na prática, basta inverter a ordem e usar `LEFT`.

### Funções de agregação

| Função | O que devolve | Exemplo |
|---|---|---|
| `count(*)` | Quantidade de linhas | `SELECT count(*) FROM aluno;` |
| `count(coluna)` | Quantidade de valores **não nulos** | `count(email)` = alunos com e-mail |
| `sum(coluna)` | Soma | `sum(valor)` das parcelas |
| `avg(coluna)` | Média | `avg(valor_mensal)` dos cursos |
| `min` / `max` | Menor / maior | `max(data_matricula)` = matrícula mais recente |

As agregações **ignoram os NULL** (menos o `count(*)`).

### GROUP BY e HAVING

```sql
SELECT c.nome AS curso, count(m.id_matricula) AS matriculas
FROM curso c
JOIN turma t ON t.id_curso = c.id_curso
JOIN matricula m ON m.id_turma = t.id_turma
WHERE m.situacao = 'ativa'          -- filtra LINHAS antes de agrupar
GROUP BY c.nome
HAVING count(m.id_matricula) < 5    -- filtra GRUPOS depois de agrupar
ORDER BY matriculas DESC;
```

- **`GROUP BY`** junta as linhas com o mesmo valor e calcula a agregação **por grupo**.
- Toda coluna do `SELECT` fora de uma agregação **precisa** estar no `GROUP BY`.
- **`WHERE`** não aceita agregação; **`HAVING`** aceita.
- Ordem de execução: `FROM`/`JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` →
  `LIMIT`.

### Subconsultas

Uma consulta dentro de outra, entre parênteses:

```sql
-- Cursos mais caros que a média (a subconsulta devolve UM valor)
SELECT nome, valor_mensal
FROM curso
WHERE valor_mensal > (SELECT avg(valor_mensal) FROM curso);

-- Alunos com parcela vencida e não paga (a subconsulta devolve uma lista)
SELECT nome FROM aluno
WHERE id_aluno IN (SELECT m.id_aluno
                   FROM matricula m
                   JOIN parcela p ON p.id_matricula = m.id_matricula
                   WHERE p.data_pagamento IS NULL AND p.vencimento < current_date);

-- Cursos sem nenhuma turma
SELECT c.nome FROM curso c
WHERE NOT EXISTS (SELECT 1 FROM turma t WHERE t.id_curso = c.id_curso);
```

- Com `=`, a subconsulta devolve **um só valor**; com `IN`, uma **lista**; `EXISTS` só verifica se
  há alguma linha.
- Subconsulta no `FROM` precisa de apelido: `SELECT avg(qtd) FROM (SELECT count(*) AS qtd FROM
  matricula GROUP BY id_turma) AS por_turma;`
- Muitas subconsultas podem virar `JOIN`: escolha a forma **mais clara** para quem vai ler.

### Escada de consultas: do simples ao relatório

| Nível | Exemplo de pergunta | Recursos |
|---|---|---|
| 1. Filtro | Turmas da noite | `WHERE` |
| 2. Ordenação | Cursos do mais caro ao mais barato | `ORDER BY` |
| 3. Junção | Aluno, turma e curso de cada matrícula ativa | `JOIN` |
| 4. Agrupamento | Matrículas ativas por curso | `GROUP BY`, `count` |
| 5. Subconsulta | Alunos com parcela vencida | `IN (SELECT …)` |

Em todos os níveis, anote o **resultado esperado** com os dados de teste antes de rodar.

### O relatório da diretora

A diretora pediu: "quantas matrículas ativas cada curso tem, quanto cada curso fatura por mês e
quais cursos ainda não têm turma". Você, como aluno consultor, resolve com `JOIN` + `GROUP BY` para
as matrículas, `sum(p.valor)` agrupado por curso para o faturamento e `LEFT JOIN` com `WHERE
t.id_turma IS NULL` para os cursos sem turma. O back-end vai chamar essas consultas para montar o
painel da secretaria.

### Erros comuns

- `JOIN` sem `ON` (ou com colunas erradas) → produto cartesiano.
- Coluna sem agregação fora do `GROUP BY` → erro *must appear in the GROUP BY clause*.
- Agregação no `WHERE` (`WHERE count(*) > 3`) → erro; use `HAVING`.
- `INNER JOIN` quando a pergunta pede "inclusive os que não têm" → as linhas sem par somem.
- `count(*)` depois de `LEFT JOIN` conta a linha com NULL; para contar só os pares, use
  `count(coluna_da_direita)`.

## Resumo

- `JOIN … ON` junta tabelas pela chave; `INNER` traz só os pares, `LEFT` traz todos da esquerda.
- Agregações (`count`, `sum`, `avg`, `min`, `max`) resumem; `GROUP BY` calcula por grupo.
- `WHERE` filtra linhas antes de agrupar; `HAVING` filtra grupos depois.
- Subconsultas devolvem um valor (`=`), uma lista (`IN`) ou testam existência (`EXISTS`).
- Relatórios combinam junção, agrupamento e subconsulta, sempre conferidos com o resultado
  esperado.

---

# Capítulo 17 — Procedimentos armazenados

- **Aula:** 17
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C8
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-17.md`

## Teoria

### O que é um procedimento armazenado (3.2.5)

É um conjunto de comandos SQL **guardado dentro do banco**, com nome e parâmetros, que o sistema
chama quando precisa. Em vez de o back-end mandar vários comandos soltos (contar alunos, comparar
com o limite, inserir a matrícula), ele chama **uma rotina** e o banco faz tudo junto.

| Vantagem | Por quê |
|---|---|
| A regra fica num lugar só | Site, aplicativo ou script que usam o banco seguem a mesma regra |
| Menos idas e voltas | Uma chamada no lugar de vários comandos pela rede |
| Segurança | O usuário pode só chamar a rotina, sem mexer direto nas tabelas (capítulo 19) |

⚠️ Regra ligada à tela (formato de mensagem, cor do botão) fica no back-end; regra que protege os
**dados** (vaga, saldo, situação) é boa candidata a ficar no banco.

### Função × procedimento no PostgreSQL

| | Função (`CREATE FUNCTION`) | Procedimento (`CREATE PROCEDURE`) |
|---|---|---|
| Como chamar | `SELECT valor_pago(10);` | `CALL matricular(3, 2);` |
| Devolve valor | Sim (`RETURNS numeric`, `RETURNS integer`…) | Não (pode ter parâmetro `INOUT`) |
| Uso típico | Calcular e devolver um resultado | Executar uma ação (inserir, atualizar) |
| Transação | Não pode usar `COMMIT` | Pode usar `COMMIT` (chamado fora de um bloco de transação) |

No dia a dia, "procedimento armazenado" é o nome geral para as duas.

### Estrutura de um bloco PL/pgSQL

```sql
CREATE OR REPLACE FUNCTION valor_pago(p_matricula integer)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
    v_total numeric;                       -- variável local
BEGIN
    SELECT coalesce(sum(valor), 0) INTO v_total
    FROM parcela
    WHERE id_matricula = p_matricula
      AND data_pagamento IS NOT NULL;
    RETURN v_total;                        -- valor devolvido
END;
$$;

SELECT valor_pago(10);                     -- quanto a matrícula 10 já pagou
```

- **`$$ … $$`** delimita o corpo da rotina.
- **`DECLARE`** cria variáveis; **`SELECT … INTO`** guarda o resultado da consulta na variável.
- Os prefixos **`p_`** (parâmetro) e **`v_`** (variável) evitam confusão com nomes de colunas.

### Matricular só se houver vaga

```sql
CREATE OR REPLACE PROCEDURE matricular(p_aluno integer, p_turma integer)
LANGUAGE plpgsql
AS $$
DECLARE
    v_ativos integer;
BEGIN
    -- trava a turma para duas matrículas simultâneas não passarem do limite
    PERFORM 1 FROM turma WHERE id_turma = p_turma FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Turma % não existe', p_turma;
    END IF;

    SELECT count(*) INTO v_ativos
    FROM matricula
    WHERE id_turma = p_turma AND situacao = 'ativa';

    IF v_ativos >= 25 THEN
        RAISE EXCEPTION 'Turma % sem vaga (% alunos ativos)', p_turma, v_ativos;
    END IF;

    INSERT INTO matricula (id_aluno, id_turma) VALUES (p_aluno, p_turma);
    RAISE NOTICE 'Aluno % matriculado na turma %', p_aluno, p_turma;
END;
$$;

CALL matricular(3, 2);
```

- **`IF … THEN … ELSIF … ELSE … END IF;`** decide o caminho.
- **`RAISE EXCEPTION`** para tudo e **desfaz** o que a chamada já fez: nada fica pela metade.
- **`RAISE NOTICE`** só mostra uma mensagem, sem parar.
- **`FOUND`** fica verdadeiro quando o último comando achou ou alterou alguma linha.
- **`FOR UPDATE`** tranca a linha da turma até o fim da transação: a segunda matrícula simultânea
  espera a primeira terminar e já conta o aluno novo.
- A chave estrangeira e o `UNIQUE (id_aluno, id_turma)` do capítulo 13 continuam valendo dentro do
  procedimento.

Na escola, em dia de abertura de matrículas, turmas ficavam com 26 ou 27 alunos: duas atendentes
matriculavam ao mesmo tempo e o sistema só conferia a vaga na tela. Com o procedimento, o back-end
passa a fazer só `CALL matricular(...)` e mostra a mensagem do `RAISE EXCEPTION` quando a turma
está cheia.

### Procedimento que atualiza

```sql
CREATE OR REPLACE PROCEDURE registrar_pagamento(p_matricula integer, p_numero smallint)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE parcela
    SET data_pagamento = current_date
    WHERE id_matricula = p_matricula AND numero = p_numero AND data_pagamento IS NULL;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Parcela %/% não encontrada ou já paga', p_matricula, p_numero;
    END IF;
END;
$$;

CALL registrar_pagamento(10, 2::smallint);
```

### Alterar, listar e remover

- **`CREATE OR REPLACE`** troca o corpo mantendo o nome e os parâmetros.
- **`\df`** no psql lista funções e procedimentos.
- **`DROP FUNCTION valor_pago(integer);`** e **`DROP PROCEDURE matricular(integer, integer);`**: os
  tipos dos parâmetros identificam a rotina (pode haver duas com o mesmo nome).

### Erros comuns

- Chamar procedimento com `SELECT` ou função com `CALL` → erro.
- `SELECT` sem `INTO` dentro do PL/pgSQL → erro "query has no destination for result data".
- Parâmetro com o nome de uma coluna (`id_turma`) → nome ambíguo; use `p_`.
- Esquecer o `;` depois de `END IF` ou o `$$` do fim → erro de sintaxe.
- `RAISE NOTICE` onde a operação deveria ser barrada → a matrícula entra mesmo sem vaga.

## Resumo

- Procedimento armazenado é uma rotina guardada no banco, chamada pelo sistema.
- Função devolve valor (`SELECT`); procedimento executa uma ação (`CALL`).
- PL/pgSQL: `DECLARE`, `BEGIN … END`, `SELECT … INTO`, `IF`, `RAISE`, `FOUND`.
- `RAISE EXCEPTION` barra a operação e desfaz tudo; `FOR UPDATE` evita duas matrículas na última
  vaga.
- Regras que protegem os dados ficam no banco; regras de tela ficam no back-end.

---

# Capítulo 18 — Triggers (disparadores)

- **Aula:** 18
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C8
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-18.md`

## Teoria

### O que é um trigger (3.2.6)

**Trigger** (disparador, gatilho) é uma rotina que o banco executa **sozinho** quando acontece um
**evento** numa tabela; ninguém precisa chamá-la. No capítulo 17 o back-end fazia
`CALL matricular(...)`; com um trigger, basta o `UPDATE` acontecer, venha ele do site, do aplicativo
ou do cliente gráfico.

| | Procedimento (capítulo 17) | Trigger |
|---|---|---|
| Quem executa | O sistema chama com `CALL` ou `SELECT` | O banco, quando o evento acontece |
| Pode ser esquecido? | Sim, se alguém mexer direto na tabela | Não: vale para qualquer comando na tabela |
| Uso típico | Ação do negócio (matricular) | Histórico, validação, campos automáticos |

### As três escolhas de um trigger

| Escolha | Opções | Significado |
|---|---|---|
| **Evento** | `INSERT`, `UPDATE` (ou `UPDATE OF coluna`), `DELETE` | Qual comando dispara |
| **Momento** | `BEFORE` · `AFTER` | `BEFORE` pode **mudar ou barrar** a linha; `AFTER` vê a linha já gravada |
| **Nível** | `FOR EACH ROW` · `FOR EACH STATEMENT` | Uma vez **por linha** afetada ou uma vez **por comando** |

Um `UPDATE` que muda 30 linhas dispara um trigger `FOR EACH ROW` **30 vezes** e um
`FOR EACH STATEMENT` **uma vez**.

### Duas peças no PostgreSQL: a função e o trigger

1. Uma **função de trigger** em PL/pgSQL, **sem parâmetros**, que devolve o tipo `trigger`
   (`RETURNS trigger`).
2. O comando **`CREATE TRIGGER`**, que liga essa função a uma tabela, um evento e um momento.

| Variável pronta | O que guarda | Existe em |
|---|---|---|
| `NEW` | A linha **nova** (como vai ficar) | `INSERT` e `UPDATE` |
| `OLD` | A linha **antiga** (como estava) | `UPDATE` e `DELETE` |
| `TG_OP` | A operação: `'INSERT'`, `'UPDATE'` ou `'DELETE'` | Todas |
| `TG_TABLE_NAME` | A tabela que disparou | Todas |

### Trigger de histórico (AFTER): quem mudou a nota

Um aluno da escola reclamou que a nota final "caiu" de 8,0 para 6,0 e ninguém sabe quem mudou. A
secretaria pede para guardar **toda alteração de nota**, com o usuário e a data:

```sql
ALTER TABLE matricula ADD COLUMN nota_final numeric(4,2) CHECK (nota_final BETWEEN 0 AND 10);

CREATE TABLE historico_nota (
    id_historico   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_matricula   integer NOT NULL REFERENCES matricula (id_matricula),
    nota_anterior  numeric(4,2),
    nota_nova      numeric(4,2),
    alterado_por   text NOT NULL DEFAULT current_user,
    alterado_em    timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION registrar_historico_nota()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO historico_nota (id_matricula, nota_anterior, nota_nova)
    VALUES (NEW.id_matricula, OLD.nota_final, NEW.nota_final);
    RETURN NEW;      -- em AFTER o retorno é ignorado, mas a função precisa devolver algo
END;
$$;

CREATE TRIGGER trg_historico_nota
AFTER UPDATE OF nota_final ON matricula
FOR EACH ROW
WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)
EXECUTE FUNCTION registrar_historico_nota();
```

- **`UPDATE OF nota_final`:** só dispara quando o comando mexe nessa coluna.
- **`WHEN (… IS DISTINCT FROM …)`:** só grava se o valor mudou de verdade (`IS DISTINCT FROM`
  trata o `NULL` corretamente).
- **`current_user`** e **`now()`** registram quem e quando: a base da **auditoria** (capítulo 19).

### Trigger de validação (BEFORE): parcela paga não muda

```sql
CREATE OR REPLACE FUNCTION proteger_parcela_paga()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD.data_pagamento IS NOT NULL THEN
        IF TG_OP = 'DELETE' THEN
            RAISE EXCEPTION 'Parcela %/% já paga não pode ser excluída',
                OLD.id_matricula, OLD.numero;
        END IF;
        IF NEW.valor <> OLD.valor OR NEW.vencimento <> OLD.vencimento THEN
            RAISE EXCEPTION 'Parcela %/% já paga: valor e vencimento não mudam',
                OLD.id_matricula, OLD.numero;
        END IF;
    END IF;
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;   -- em DELETE, devolver OLD deixa a exclusão seguir
    END IF;
    RETURN NEW;       -- em UPDATE, devolver NEW deixa a alteração seguir
END;
$$;

CREATE TRIGGER trg_proteger_parcela_paga
BEFORE UPDATE OR DELETE ON parcela
FOR EACH ROW
EXECUTE FUNCTION proteger_parcela_paga();
```

| Retorno num BEFORE … FOR EACH ROW | Efeito |
|---|---|
| `RETURN NEW` | A linha segue (pode ter sido ajustada, ex.: `NEW.email := lower(NEW.email);`) |
| `RETURN OLD` | Usado em `DELETE` para deixar a exclusão seguir |
| `RETURN NULL` | A linha é **pulada em silêncio** (nada é gravado e não aparece erro) |
| `RAISE EXCEPTION` | O comando inteiro para e é **desfeito**, com a mensagem |

### Trigger, restrição ou procedimento?

- **Restrição** (`CHECK`, `UNIQUE`, chave estrangeira): primeira escolha quando a regra olha **só a
  própria linha** (`valor > 0`).
- **Trigger:** quando a regra compara **antes e depois** (`OLD` × `NEW`), grava em **outra tabela**
  (histórico) ou precisa valer para **qualquer comando**.
- **Procedimento:** quando é uma **ação do negócio** que o sistema pede (matricular, registrar
  pagamento).

⚠️ Trigger demais deixa o banco "mágico": quem lê o `UPDATE` não vê o que mais acontece. Documente
cada trigger no dicionário de dados e no script da SA 2.

### Listar, desligar e remover

- **`\d matricula`** no psql mostra os triggers da tabela.
- **`ALTER TABLE parcela DISABLE TRIGGER trg_proteger_parcela_paga;`** desliga (e `ENABLE` religa):
  só em manutenção.
- **`DROP TRIGGER trg_historico_nota ON matricula;`** remove o trigger; a função continua existindo.

### Erros comuns

- Função com `RETURNS void` ou com parâmetros → erro ao criar o trigger.
- `BEFORE` sem `RETURN NEW` (ou com `RETURN NULL`) → a linha **some em silêncio** ("UPDATE 0").
- `NEW` num trigger de `DELETE` (ou `OLD` num de `INSERT`) → valor vazio.
- `AFTER UPDATE` em `matricula` que faz `UPDATE matricula` → dispara de novo, em **laço**; para
  ajustar a própria linha, use `BEFORE` e altere `NEW`.
- Sem o `WHEN` no histórico → grava linha mesmo quando a nota não mudou.

## Resumo

- Trigger é uma rotina que o banco executa sozinho num evento (`INSERT`, `UPDATE`, `DELETE`).
- Escolhas: evento, momento (`BEFORE` ou `AFTER`) e nível (por linha ou por comando).
- No PostgreSQL: função `RETURNS trigger` + `CREATE TRIGGER`, com `NEW`, `OLD` e `TG_OP`.
- `AFTER` serve para histórico; `BEFORE` valida, ajusta ou barra a linha.
- Restrição para a própria linha, trigger para antes × depois e histórico, procedimento para ações.

---

# Capítulo 19 — Segurança da informação: pilares, acesso e auditoria

- **Aula:** 19
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C12, C13, C14
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-19.md`

## Teoria

### Os três pilares da segurança da informação (C12)

Segurança da informação é proteger os dados para que fiquem **sigilosos**, **corretos** e
**disponíveis**:

| Pilar | Pergunta | Ameaça típica | Proteção no banco |
|---|---|---|---|
| **Confidencialidade** (2.1.3) | Só quem pode vê o dado? | Vazamento do CPF dos alunos; login compartilhado | Papéis e `GRANT` mínimos, permissão por coluna, visão, senha forte, `pg_hba.conf` (capítulo 4) |
| **Integridade** (2.1.1) | O dado está correto e completo? | Nota alterada sem autorização; exclusão por engano | Chaves e `CHECK` (capítulo 13), procedimento (17), trigger (18), quem pode alterar e auditoria |
| **Disponibilidade** (2.1.2) | O dado está lá quando é preciso? | Disco queimado, servidor fora do ar, tabela removida por acidente | Backup automático e **testado**, servidor estável, monitoramento |

Os pilares andam juntos: um backup sem senha resolve a disponibilidade e fere a confidencialidade;
dar `DELETE` para todos "para não atrapalhar" fere a integridade e a disponibilidade.

### Níveis hierárquicos de acesso e menor privilégio (C13)

| Nível da informação | Exemplo na escola | Quem acessa |
|---|---|---|
| **Pública** | Nome dos cursos, carga horária, valor | Qualquer pessoa (site) |
| **Interna** | Turmas e quantidade de matrículas por turma | Funcionários da escola |
| **Restrita** | Nome, e-mail e telefone do aluno, notas | Secretaria e coordenação |
| **Confidencial** | CPF, data de nascimento, parcelas e pagamentos | Só quem trabalha com o dado |

| Nível de acesso | Quem é | O que pode |
|---|---|---|
| **Administrador (DBA)** | `postgres` / responsável técnico | Tudo; **nunca** usado pela aplicação nem no dia a dia |
| **Dono dos objetos** | Papel que criou as tabelas | Alterar a estrutura |
| **Aplicação** | `app_escola` (capítulo 4) | Só os comandos que o back-end usa |
| **Usuários por função** | Secretaria, financeiro, coordenação | Só as tabelas e colunas da função |
| **Somente leitura** | Relatórios | `SELECT` em visões |

🔑 **Princípio do menor privilégio:** cada usuário recebe **só** as permissões de que precisa,
nada "a mais por garantia". Se a senha da secretaria vazar, o estrago fica limitado ao que a
secretaria podia fazer.

### Controle de acesso (2.2): a matriz de acesso

Antes do SQL, você, como aluno consultor, monta com a escola a **matriz de acesso** (S = `SELECT`,
I = `INSERT`, U = `UPDATE`, D = `DELETE`):

| Tabela | Secretaria | Financeiro | Coordenação |
|---|---|---|---|
| `curso`, `turma` | S | — | só pela visão |
| `aluno` | S I U | S só `id_aluno` e `nome` | — |
| `matricula` | S I U | S | só pela visão |
| `parcela` | — | S e U só `data_pagamento` | — |
| `vw_matriculas_por_turma` | — | — | S |
| `auditoria` | — | — | S |

Ninguém recebe `DELETE`: a matrícula é **cancelada** (`situacao = 'cancelada'`), não excluída, o
que protege a integridade e o histórico.

### Papéis (roles) no PostgreSQL

No PostgreSQL, usuário e grupo são a mesma coisa: um **papel**. A diferença é o atributo `LOGIN`:

```sql
REVOKE ALL ON DATABASE escola_db FROM PUBLIC;   -- tira o acesso padrão de "todo mundo"
REVOKE ALL ON SCHEMA public FROM PUBLIC;

CREATE ROLE grupo_secretaria NOLOGIN;            -- grupos: as permissões ficam aqui
CREATE ROLE grupo_financeiro NOLOGIN;
CREATE ROLE grupo_consulta   NOLOGIN;

CREATE ROLE ana_secretaria   LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_secretaria;
CREATE ROLE bruno_financeiro LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_financeiro;
```

- **Permissão no grupo, pessoa no grupo:** funcionário novo ganha um login no grupo; quem sai fica
  com `ALTER ROLE … NOLOGIN`.
- **Uma pessoa, um login:** login compartilhado acaba com a auditoria (não dá para saber quem fez).
- A senha do script é só exemplo: a real é definida pela equipe e **nunca** fica no Git nem no
  código do site.

### GRANT e REVOKE (C14)

```sql
GRANT CONNECT ON DATABASE escola_db TO grupo_secretaria, grupo_financeiro, grupo_consulta;
GRANT USAGE   ON SCHEMA public      TO grupo_secretaria, grupo_financeiro, grupo_consulta;

GRANT SELECT, INSERT, UPDATE ON aluno, matricula TO grupo_secretaria;
GRANT SELECT ON curso, turma TO grupo_secretaria;

GRANT SELECT ON matricula TO grupo_financeiro;
GRANT SELECT, UPDATE (data_pagamento) ON parcela TO grupo_financeiro;   -- por coluna
GRANT SELECT (id_aluno, nome) ON aluno TO grupo_financeiro;             -- não vê o CPF

REVOKE UPDATE ON matricula FROM grupo_secretaria;                       -- tira uma permissão
```

| Comando | O que faz |
|---|---|
| `GRANT … ON objeto TO papel` | **Dá** a permissão |
| `REVOKE … ON objeto FROM papel` | **Tira** a permissão |
| `GRANT SELECT (col1, col2) ON tabela` | Permissão **só nessas colunas** |
| `GRANT grupo TO pessoa` | Põe a pessoa no grupo (ela herda as permissões) |
| `WITH GRANT OPTION` | Deixa repassar a permissão: **evitar** |

Testando com o login do financeiro, o `SELECT cpf FROM aluno` dá **permission denied**, a baixa da
parcela funciona e uma exclusão em `parcela` dá **permission denied**. O erro é o resultado
esperado: mostra que a matriz foi respeitada.

### Visão (VIEW): mostrar só o necessário

```sql
CREATE VIEW vw_matriculas_por_turma AS
SELECT t.codigo, c.nome AS curso, count(m.id_matricula) AS matriculas
FROM turma t
JOIN curso c          ON c.id_curso = t.id_curso
LEFT JOIN matricula m ON m.id_turma = t.id_turma
GROUP BY t.codigo, c.nome;

GRANT SELECT ON vw_matriculas_por_turma TO grupo_consulta;
```

A coordenação vê o total por turma, mas `SELECT * FROM matricula` dá *permission denied*.

Para conferir: **`\du`** lista os papéis e seus grupos; **`\dp aluno`** mostra as permissões da
tabela, inclusive por coluna.

### Auditoria de acesso (2.3)

**Auditoria** é o registro de **quem fez o quê, quando e em qual dado**. No PostgreSQL ela tem duas
camadas:

1. **Log do servidor** (`postgresql.conf`): `log_connections = on` e `log_disconnections = on`
   registram quem entrou e saiu; `log_statement = 'mod'` registra os comandos que alteram dados.
2. **Tabela de auditoria com trigger** (evolução do histórico do capítulo 18):

```sql
CREATE TABLE auditoria (
    id_auditoria  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tabela        text NOT NULL,
    operacao      text NOT NULL,                       -- INSERT, UPDATE ou DELETE
    usuario       text NOT NULL DEFAULT session_user,  -- login que conectou
    momento       timestamptz NOT NULL DEFAULT now(),
    dados_antes   jsonb,
    dados_depois  jsonb
);
REVOKE ALL ON auditoria FROM PUBLIC;          -- ninguém grava nem altera direto

CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER                  -- roda com o poder do dono: grava mesmo sem GRANT na auditoria
SET search_path = public
AS $$
BEGIN
    INSERT INTO auditoria (tabela, operacao, dados_antes, dados_depois)
    VALUES (TG_TABLE_NAME, TG_OP,
            CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END,
            CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
    RETURN NULL;                  -- trigger AFTER: o retorno é ignorado
END;
$$;

CREATE TRIGGER trg_auditoria_parcela
AFTER INSERT OR UPDATE OR DELETE ON parcela
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

GRANT SELECT ON auditoria TO grupo_consulta;   -- a coordenação lê, ninguém altera
```

- **Uma função para várias tabelas:** `TG_TABLE_NAME` e `TG_OP` dizem a tabela e a operação;
  `to_jsonb` guarda a linha inteira antes e depois.
- **`SECURITY DEFINER`:** os usuários não têm permissão na `auditoria` e não conseguem apagar o
  próprio rastro; a função grava porque roda com o poder do dono.
- **`session_user`:** dentro da função `SECURITY DEFINER`, o `current_user` vira o dono; o
  `session_user` continua sendo o login que conectou. Por isso cada pessoa precisa do próprio login.

### Boas práticas de segurança no banco (C14)

- A aplicação conecta com `app_escola`, **nunca** com `postgres`.
- Senha forte, diferente em cada login, trocada quando alguém sai; **nunca** no Git nem no
  JavaScript do site.
- `pg_hba.conf` libera só o servidor da aplicação e a rede da escola.
- Permissões no **grupo**; ninguém com `ALL`, `DELETE` ou `WITH GRANT OPTION` sem necessidade.
- Dados pessoais só para quem precisa: **LGPD** (Lei nº 13.709/2018).
- Backup automático com `pg_dump`, guardado em outro lugar e com **teste de restauração**.

## Resumo

- Pilares: confidencialidade (só quem pode vê), integridade (dado correto) e disponibilidade (dado
  presente quando preciso).
- Informação em níveis (pública, interna, restrita, confidencial) e menor privilégio para cada
  função.
- A matriz de acesso vira papéis de grupo, logins individuais e `GRANT`/`REVOKE`, até por coluna.
- Visões mostram só o necessário; `\du` e `\dp` conferem as permissões.
- Auditoria: log do servidor + tabela de auditoria com trigger `SECURITY DEFINER` e
  `session_user`.

---

# Capítulo 20 — Projeto integrador: banco documentado para o back-end

- **Aula:** 20
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C1, C2, C3, C7, C8, C14, S1, S2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-20.md`

## Teoria

### Do pedido do cliente ao banco pronto (C1)

O projeto integrador junta as duas situações de aprendizagem:

| Etapa | Capítulos | Entrega |
|---|---|---|
| **SA 1** — Modelagem | 5 a 11 | Escopo, requisitos, DER, 3FN, padrão de nomes, dicionário, cronograma e fluxograma |
| **SA 2** — Banco funcionando | 12 a 19 | Scripts DDL, dados de teste, consultas, procedimentos, triggers, papéis e auditoria |
| **Projeto integrador** | 20 | Banco instalado do zero + documentação técnica + revisão em pares |

🔑 **Rastreabilidade:** cada tabela, coluna importante e regra do banco aponta para um
**requisito** do escopo. Tabela sem requisito sobra; requisito sem tabela ou regra falta.

| Requisito da escola | Onde está no banco |
|---|---|
| R1 — Cadastrar alunos com contato | Tabela `aluno` (capítulo 12) |
| R2 — Aluno não se matricula duas vezes na mesma turma | `UNIQUE (id_aluno, id_turma)` em `matricula` (13) |
| R3 — Turma com no máximo 25 alunos ativos | Procedimento `matricular` com `FOR UPDATE` (17) |
| R4 — Parcela paga não muda de valor | Trigger `trg_proteger_parcela_paga` (18) |
| R5 — Saber quem alterou a nota | Trigger `trg_historico_nota` (18) e auditoria (19) |
| R6 — Financeiro não vê o CPF | `GRANT SELECT (id_aluno, nome) ON aluno` (19) |
| R7 — Relatório de matrículas por turma | Visão `vw_matriculas_por_turma` (19) |

### A pasta do projeto e o script mestre (C7, C8)

```text
projeto-escola/
├── README.md                ← guia de instalação e visão geral
├── docs/                    ← escopo, DER, dicionário, cronograma, fluxograma, matriz de acesso
└── sql/
    ├── 00-instalar.sql      ← script mestre
    ├── 01-ddl-escola.sql    ← tabelas, chaves e restrições (capítulos 12–13)
    ├── 02-dados-teste.sql   ← carga de teste (14)
    ├── 03-consultas-basicas.sql
    ├── 04-relatorios.sql    ← junções, agrupamentos e subconsultas (15–16)
    ├── 05-procedimentos.sql ← matricular, registrar_pagamento (17)
    ├── 06-triggers.sql      ← histórico de nota e parcela paga (18)
    └── 07-seguranca.sql     ← papéis, GRANT, visão e auditoria (19)
```

A ordem importa: `turma` precisa de `curso`, o trigger precisa da função, o `GRANT` precisa das
tabelas. O script mestre chama os outros na ordem certa e para no primeiro erro:

```sql
-- 00-instalar.sql — uso: psql -U postgres -d escola_teste -f sql/00-instalar.sql
\set ON_ERROR_STOP on
\ir 01-ddl-escola.sql
\ir 02-dados-teste.sql
\ir 03-consultas-basicas.sql
\ir 04-relatorios.sql
\ir 05-procedimentos.sql
\ir 06-triggers.sql
\ir 07-seguranca.sql
\echo 'Banco instalado.'
```

- **`\set ON_ERROR_STOP on`:** sem ele, o psql mostra o erro e **continua**, e o banco fica pela
  metade sem ninguém perceber.
- **`\ir arquivo`:** executa outro script, com o caminho relativo à pasta do script mestre.
- Teste sempre num **banco limpo** (`escola_teste`), **nunca** no de produção.
- `CREATE OR REPLACE` e `IF NOT EXISTS` deixam os scripts rodarem de novo sem o erro "já existe".

### Documentação técnica (6.1, 6.2 e 6.3)

A documentação deixa **outra pessoa** (o colega do back-end, o professor, a próxima equipe) usar o
banco sem perguntar para quem fez.

| Documento | Conteúdo mínimo |
|---|---|
| **Escopo atualizado** (6.1) | Objetivo, requisitos (R1, R2…), o que entra e o que não entra, mudanças aceitas |
| **DER + dicionário de dados** | Entidades, relacionamentos, cardinalidades; para cada coluna: nome, tipo, nulo, chave, regra e exemplo |
| **Cronograma** (6.2) | Tarefas, responsável, data prevista e **data realizada**; atrasos com o motivo |
| **Fluxograma** (6.3) | Matrícula e pagamento, com cada decisão ligada ao procedimento ou trigger que a executa |
| **Matriz de acesso** | Quem pode S, I, U e D em cada tabela, visão e procedimento |
| **Guia de instalação (README)** | Versão do PostgreSQL, criação do banco, comando do script mestre, como testar |
| **Registro de decisões** | Decisão, motivo e alternativa descartada |

No **cronograma planejado × realizado**, um atraso vira registro: "procedimentos previstos para a
aula 17, entregues na 18: a regra de vagas mudou (mudança de escopo aceita)". No **fluxograma**,
cada decisão aponta para quem decide no banco: "aluno já matriculado na turma?" →
`UNIQUE (id_aluno, id_turma)`; "há vaga?" → `matricular`; "parcela já paga?" →
`trg_proteger_parcela_paga`.

### Revisão do modelo: DER e normalização (C2, C3)

- Toda entidade do DER virou tabela e toda tabela aparece no DER.
- Toda tabela tem **chave primária**; todo 1:N tem a **chave estrangeira** do lado N.
- Todo N:N virou **tabela associativa** (`matricula` entre `aluno` e `turma`).
- **1FN:** nenhuma coluna com lista; **2FN:** na chave composta (`parcela`), nada depende só de parte
  da chave; **3FN:** nada depende de coluna que não é chave.
- **Padrão de nomes** do capítulo 11 e tipos coerentes com o dicionário.

### Revisão do SQL: as consultas do back-end (C8)

| # | Consulta | Recursos |
|---|---|---|
| 1 | Alunos em ordem alfabética com e-mail | `ORDER BY` |
| 2 | Turmas de um curso num turno | `WHERE` com `AND` |
| 3 | Alunos cujo nome começa com "Ma" | `ILIKE` |
| 4 | Parcelas vencidas e não pagas | `vencimento < current_date AND data_pagamento IS NULL` |
| 5 | Matrículas com aluno, turma e curso | `JOIN` de quatro tabelas |
| 6 | Turmas sem nenhuma matrícula | `LEFT JOIN` + `IS NULL` |
| 7 | Total de matrículas por turma | `count`, `GROUP BY` |
| 8 | Turmas com mais de 20 matrículas | `HAVING` |
| 9 | Valor recebido por mês | `sum`, `date_trunc` |
| 10 | Alunos com mais de uma matrícula ativa | `HAVING count(*) > 1` ou subconsulta |

Cada consulta leva um comentário dizendo **qual tela ou relatório do back-end** a usa; consulta que
ninguém vai usar não entra.

### O contrato com o back-end (C14)

O back-end **não** recebe a senha do `postgres`: recebe o login `app_escola` e a lista do que pode
chamar.

| O back-end faz | Chama no banco | Permissão do `app_escola` |
|---|---|---|
| Matricular um aluno | `CALL matricular(p_aluno, p_turma)` | `EXECUTE` no procedimento |
| Registrar um pagamento | `CALL registrar_pagamento(p_matricula, p_numero)` | `EXECUTE` no procedimento |
| Listar matrículas por turma | `SELECT` na visão | `SELECT` na visão |
| Cadastrar e editar aluno | `INSERT` / `UPDATE` em `aluno` | Só nas colunas do formulário |
| Excluir matrícula | Não existe: a matrícula é **cancelada** | Sem `DELETE` |

```sql
GRANT CONNECT ON DATABASE escola_db TO app_escola;
GRANT USAGE ON SCHEMA public TO app_escola;
GRANT EXECUTE ON PROCEDURE matricular(integer, integer) TO app_escola;
GRANT EXECUTE ON PROCEDURE registrar_pagamento(integer, smallint) TO app_escola;
GRANT SELECT ON vw_matriculas_por_turma TO app_escola;
GRANT SELECT, INSERT, UPDATE (nome, email, telefone) ON aluno TO app_escola;
```

- O back-end usa **consultas com parâmetros** (`$1`, `$2` no driver), nunca o texto digitado pelo
  usuário colado no SQL: isso evita **SQL injection**.
- A senha do `app_escola` fica numa **variável de ambiente**, nunca no Git nem no JavaScript.
- As regras importantes ficam **no banco**: mesmo com um erro no back-end, o banco não aceita dado
  errado.

### Teste de ponta a ponta, backup e restauração

1. Num banco limpo, `psql -d escola_teste -f sql/00-instalar.sql` termina sem nenhum `ERROR`.
2. `\dt`, `\dv`, `\df` e `\du` mostram tabelas, visões, rotinas e papéis esperados.
3. `CALL matricular(1, 2);` grava; repetir dá o erro do `UNIQUE` (R2).
4. Pagar uma parcela e tentar mudar o valor: o trigger barra (R4).
5. Com o login do financeiro, `SELECT cpf FROM aluno;` dá *permission denied* (R6).
6. A auditoria mostra as alterações com o login de quem fez (R5).
7. As 10 consultas devolvem linhas coerentes com os dados de teste.

**Backup de entrega:** `pg_dump -U postgres -d escola_teste -F c -f escola.dump`. **Prova de que
funciona:** `createdb escola_restaurado` e `pg_restore -d escola_restaurado escola.dump`. Os
scripts da pasta `sql/` são a fonte; o dump é a fotografia do banco num momento.

### Revisão em pares e decisões justificadas (S1, S2)

- **Revisão em pares (S1):** cada equipe instala o projeto de outra seguindo **só o README**; toda
  dificuldade é uma falha da documentação, não do colega.
- **Dar a sugestão:** o que encontrou, onde (arquivo e linha) e o efeito ("o script 06 cria o
  trigger antes da função; a instalação para com erro"). Crítica ao trabalho, nunca à pessoa.
- **Receber a sugestão:** anotar no registro, decidir com a equipe se aceita e responder com o
  motivo.
- **Justificar as escolhas (S2):** cada decisão de modelagem e de segurança tem o motivo ligado a
  um requisito ("matrícula é cancelada, não excluída, porque o histórico financeiro precisa ficar").

## Resumo

- O projeto integrador junta a SA 1 (modelagem) e a SA 2 (banco funcionando), com rastreabilidade
  de cada regra até um requisito.
- Os scripts ficam numa pasta com ordem de execução e um script mestre com `ON_ERROR_STOP`.
- A documentação técnica reúne escopo, DER e dicionário, cronograma realizado, fluxograma, matriz
  de acesso, README e decisões.
- O back-end usa o login próprio e um contrato de permissões mínimas, com consultas parametrizadas.
- Teste de ponta a ponta, backup restaurado e revisão em pares fecham a entrega.
