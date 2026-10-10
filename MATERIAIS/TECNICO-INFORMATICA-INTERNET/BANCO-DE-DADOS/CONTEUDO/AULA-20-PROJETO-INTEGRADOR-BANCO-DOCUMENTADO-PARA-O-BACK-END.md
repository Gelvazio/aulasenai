# Aula 20 — Projeto Integrador: Banco Documentado para o Back-end

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 6 Documentação técnica — 6.1 Escopo do projeto · 6.2
  Cronograma · 6.3 Fluxograma · revisão de 3 Linguagem de consulta de banco de dados e de 5 Modelo
  entidade-relacionamento
- **Capacidades:** C1 — Reconhecer as demandas do cliente · C2 — Aplicar os procedimentos do modelo
  de modelagem entidade-relacionamento · C3 — Aplicar os procedimentos de normalização e
  padronização de dados · C7 — Aplicar linguagem de definição de dados · C8 — Aplicar linguagem de
  manipulação de dados · C14 — Aplicar boas práticas de segurança da informação · S1 — Valorizar
  novos fatos, ideias e opiniões diferentes · S2 — Fundamentar escolhas e decisões à luz de
  referenciais técnicos
- **Estratégias:** montagem do pacote de entrega, execução dos scripts do zero num banco limpo,
  revisão cruzada entre grupos, apresentação curta para o "cliente" e fechamento da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-20.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-20.md)

## Indicadores

- (13) Justifica escolhas de modelagem e de segurança com base nos requisitos (S2).
- (14) Acolhe sugestões do colega na revisão do modelo e do script (S1).

## Objetivos

- Montar o **pacote de documentação técnica** do banco: escopo, DER, dicionário de dados, scripts,
  matriz de acesso, cronograma, fluxograma e guia de instalação.
- Organizar os **scripts numerados** na ordem de execução e recriar o banco **do zero** com eles.
- Ligar cada **requisito** do escopo à tabela, à restrição ou à rotina que o atende
  (**rastreabilidade**).
- Fazer a **conferência final** do banco (estrutura, dados, regras, permissões) e o **backup testado**
  da entrega.
- Entregar ao back-end o que ele precisa: login próprio, conexão por variável de ambiente e a lista
  de tabelas, visões e procedimentos que pode usar.
- **Revisar** o trabalho de outro grupo, **acolher** as sugestões recebidas e **justificar** as
  escolhas de modelagem e de segurança.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: pilares, `GRANT`/`REVOKE` e auditoria (aula 19) |
| Exposição dialogada | 30 min | O pacote de documentação técnica, rastreabilidade e checklist de entrega |
| Demonstração | 30 min | Recriar o banco do zero com os scripts, conferência e backup com restauração |
| Intervalo | 15 min | — |
| Prática autônoma (SA 2) | 70 min | Fechamento do pacote do grupo e execução do zero |
| Dinâmica | 40 min | "Revisão cruzada da entrega" (abaixo) |
| Apresentação e registro | 40 min | Apresentação de 5 min por grupo, ajustes e quiz de saída |

## Conteúdo

### 1. Documentação técnica: o banco que outra pessoa consegue usar
Um banco só está **pronto** quando outra pessoa — o desenvolvedor do back-end, o DBA, a equipe que
assume o sistema no ano que vem — consegue **entender, recriar e usar** o banco sem perguntar ao
grupo que o fez. A **documentação técnica** (conhecimento 6) junta as peças produzidas na UC:

| Peça | O que contém | Feita na aula |
|---|---|---|
| **Documento de escopo** (6.1) | Objetivo, partes interessadas, entra / não entra, requisitos de dados, entregas, premissas e riscos | 5 |
| **DER** | Entidades, atributos, relacionamentos e cardinalidades (modelo final, normalizado) | 6 a 10 |
| **Dicionário de dados** | Cada tabela e coluna com nome padronizado, tipo, formato, obrigatoriedade, domínio e descrição | 7 e 11 |
| **Cronograma** (6.2) | Etapas, dependências, duração, responsáveis, marcos — planejado × realizado | 11 |
| **Fluxograma** (6.3) | Processo principal (matrícula) com decisões e pontos de consulta e gravação no banco | 11 |
| **Scripts SQL numerados** | Criação, estrutura, dados iniciais, consultas, rotinas e segurança, na ordem de execução | 4 e 12 a 19 |
| **Matriz de acesso** | Quem pode S, I, U, D em cada tabela, coluna e visão | 19 |
| **Guia de instalação (README)** | Como recriar o banco do zero, como conectar e como testar | 20 |

O **escopo** continua sendo a referência: a entrega final é conferida contra ele. Requisito do
escopo que não aparece no banco é **pendência**; tabela que não atende nenhum requisito é
**excesso** (ou mudança de escopo sem registro, aula 5).

### 2. Scripts numerados na ordem de execução
Os scripts ficam numerados porque **a ordem importa**: não dá para criar a chave estrangeira antes
da tabela de referência, nem dar `GRANT` numa tabela que ainda não existe.

| Script | Conteúdo | Aulas |
|---|---|---|
| `01-banco-e-usuario.sql` | `CREATE DATABASE escola_db`, login `app_escola` | 4 |
| `02-tabelas.sql` | `CREATE TABLE` de curso, turma, aluno, matricula, parcela, com tipos padronizados | 12 |
| `03-chaves-e-restricoes.sql` | `PRIMARY KEY`, `REFERENCES`, `UNIQUE`, `CHECK`, `ON DELETE` | 13 |
| `04-dados-iniciais.sql` | `INSERT` dos cursos, turmas e alunos de teste | 14 |
| `05-consultas.sql` | Consultas do relatório (filtros, junções, agrupamentos) | 15 e 16 |
| `06-procedimentos-e-triggers.sql` | `matricular`, trigger de histórico e de validação | 17 e 18 |
| `07-seguranca.sql` | `REVOKE ... FROM PUBLIC`, grupos, logins, `GRANT`, visão, auditoria | 19 |

Boas práticas nos scripts:
- **Comentário no início** de cada arquivo: o que faz, de qual script depende e quem alterou por
  último.
- **Pode rodar de novo sem quebrar** (idempotente) sempre que possível: `CREATE TABLE IF NOT
  EXISTS`, `CREATE OR REPLACE FUNCTION`, `DROP TRIGGER IF EXISTS` antes do `CREATE TRIGGER`.
- **Transação** nos scripts de estrutura e de dados (`BEGIN; ... COMMIT;`): se um comando falhar, nada
  fica pela metade.
- **Nenhuma senha real** nos scripts: o `PASSWORD` fica como `'troque-esta-senha'` e a senha real é
  definida no servidor (aula 19).
- Tudo versionado no **Git**, com mensagens de commit que dizem o que mudou.

Recriar do zero num banco limpo, no terminal:
```bash
psql -U postgres -f 01-banco-e-usuario.sql
psql -U postgres -d escola_db -v ON_ERROR_STOP=1 -f 02-tabelas.sql
psql -U postgres -d escola_db -v ON_ERROR_STOP=1 -f 03-chaves-e-restricoes.sql
# ... e assim até o 07-seguranca.sql
```
O `-v ON_ERROR_STOP=1` faz o psql **parar no primeiro erro**, em vez de seguir e esconder o
problema. Dentro do psql, `\i 02-tabelas.sql` executa um arquivo.

### 3. Rastreabilidade: do requisito ao banco
A **matriz de rastreabilidade** liga cada requisito do escopo ao que o atende — e prova ao cliente
que nada ficou de fora:

| Requisito (escopo, aula 5) | Onde está no banco | Script |
|---|---|---|
| R1 — Cadastrar alunos com CPF único | `aluno`, `UNIQUE (cpf)` | 02 e 03 |
| R2 — Turma com no máximo 25 alunos | procedimento `matricular` (conta e barra) | 06 |
| R3 — Mensalidade dividida em parcelas | `parcela`, chave `(id_matricula, numero)` | 02 e 03 |
| R4 — Parcela paga não pode mudar de valor | trigger de validação | 06 |
| R5 — Saber quem mudou a nota | trigger de histórico / auditoria | 06 e 07 |
| R6 — Financeiro não vê CPF | `GRANT SELECT (id_aluno, nome)` | 07 |
| R7 — Coordenação vê só o total por turma | visão `vw_matriculas_por_turma` | 07 |

### 4. Conferência final do banco (checklist)
Antes de entregar, o grupo confere **no banco recriado do zero**:

| Item | Como conferir |
|---|---|
| Todas as tabelas existem | `\dt` |
| Colunas, tipos e restrições batem com o dicionário | `\d aluno`, `\d matricula`... |
| Chaves e restrições funcionam | Tentar gravar dado inválido (FK inexistente, CPF repetido, `CHECK`) e ver o **erro esperado** |
| Dados iniciais carregados | `SELECT count(*) FROM curso;` e demais tabelas |
| Consultas do relatório devolvem o esperado | Rodar o `05-consultas.sql` e comparar com o resultado anotado |
| Procedimento e triggers funcionam | `CALL matricular(...)` na turma cheia (erro esperado); alterar nota e ver o histórico |
| Permissões respeitam a matriz | `\dp`, `\du` e teste com o login de cada grupo (*permission denied* esperado) |
| Auditoria grava | Alterar uma parcela com um login e consultar `auditoria` |

Cada item vira uma linha do **relatório de testes** da entrega: o que foi testado, o resultado
esperado e o obtido.

### 5. Backup da entrega e teste de restauração
```bash
pg_dump -U postgres -Fc -d escola_db -f escola_db_entrega.dump   # backup no formato custom
createdb -U postgres escola_db_teste
pg_restore -U postgres -d escola_db_teste escola_db_entrega.dump # restaura em OUTRO banco
psql -U postgres -d escola_db_teste -c "SELECT count(*) FROM aluno;"
```
Só depois de **restaurar e conferir** o backup é que ele é garantia (disponibilidade, aula 19). O
arquivo de backup tem dados pessoais: fica com **acesso restrito**, nunca no Git.

### 6. O que o back-end recebe
O desenvolvedor do back-end não precisa (nem deve) conhecer a senha do `postgres`. Ele recebe:
- O login **`app_escola`** com só os comandos de que o sistema precisa (aula 19) e a **string de
  conexão** lida de uma **variável de ambiente** (aula 4):
  `DATABASE_URL=postgresql://app_escola:<senha>@servidor:5432/escola_db`.
- A lista do que pode usar — o **contrato** do banco: tabelas e colunas (dicionário de dados),
  visões (`vw_matriculas_por_turma`), procedimentos (`CALL matricular(id_aluno, id_turma)`) e as
  mensagens de erro que eles devolvem (`RAISE EXCEPTION`, aula 17).
- As **regras que o banco já garante** (chaves, `CHECK`, triggers): o back-end não precisa repetir
  todas, mas deve **tratar o erro** e mostrar uma mensagem clara ao usuário.

### 7. Revisão cruzada (S1) e justificativa das escolhas (S2)
Na revisão, outro grupo lê a documentação e roda os scripts. Atitudes esperadas:
- **Revisor:** pergunta em vez de acusar ("por que a parcela tem chave composta?"), aponta onde está
  o problema e sugere.
- **Autor:** escuta, confere no escopo e nos requisitos e **aceita** a sugestão ou **justifica** a
  escolha com base técnica — nunca "porque sim".
- **Registro:** cada sugestão vira uma linha (sugestão, decisão, motivo, quem ajusta).

Exemplos de justificativas técnicas (S2):

| Escolha | Justificativa |
|---|---|
| Matrícula é cancelada, não apagada | Guarda o histórico e as parcelas (integridade); ninguém tem `DELETE` |
| `parcela` com chave `(id_matricula, numero)` | A parcela é entidade fraca: só existe dentro da matrícula (aula 6) |
| `UNIQUE (id_aluno, id_turma)` em `matricula` | Requisito: o aluno não se matricula duas vezes na mesma turma |
| Limite de 25 alunos no procedimento | A regra precisa contar as matrículas da turma, o que um `CHECK` não faz |
| Financeiro com `GRANT` por coluna | Menor privilégio e LGPD: ele não precisa do CPF |

### 8. Cronograma: planejado × realizado e lições aprendidas
O cronograma da aula 11 é fechado com o **realizado**: onde houve atraso, por quê, e o que o grupo
faria diferente (gestão do tempo, 1.1). As **lições aprendidas** entram na documentação para a
próxima equipe.

### 9. Erros comuns
- Scripts sem número ou fora de ordem → a recriação do zero quebra na chave estrangeira.
- Testar só no banco do próprio computador, já "remendado" → o erro aparece só na entrega; sempre
  recriar do zero num banco limpo.
- Senha real no script ou no README publicado → fere a confidencialidade.
- Dicionário de dados desatualizado (coluna renomeada no SQL e não no documento).
- Backup nunca restaurado.
- Responder à revisão do colega com "está certo assim" sem justificar com o requisito.

## Exemplo no contexto do curso
A escola de cursos livres fictícia vai contratar uma empresa para o back-end do sistema de
matrículas. O grupo entrega a pasta `banco-escola/` com `README.md`, `escopo.md`, `der.png`,
`dicionario-de-dados.md`, `matriz-de-acesso.md`, `cronograma.xlsx`, `fluxograma-matricula.png`,
`relatorio-de-testes.md` e os scripts de `01` a `07`. O desenvolvedor recria o banco do zero em 5
minutos seguindo o README, conecta com `app_escola` pela variável de ambiente e chama
`CALL matricular(...)` sem precisar perguntar nada ao grupo.

## Dinâmica — Revisão cruzada da entrega (40 min, grupos trocam o pacote)
- **Objetivo:** conferir a entrega de outro grupo como se fosse o desenvolvedor do back-end,
  sugerir melhorias (S1) e treinar a justificativa técnica (S2).
- **Materiais:** pacote de documentação do grupo vizinho, banco limpo no laboratório e a ficha de
  revisão (checklist do item 4 + rastreabilidade do item 3).
- **Passo a passo:** (1) o grupo revisor recria o banco **só com o README** e anota onde travou;
  (2) confere três requisitos na matriz de rastreabilidade e testa cada um no banco; (3) escreve
  três sugestões em forma de pergunta; (4) o grupo autor responde: aceita (e registra o ajuste) ou
  justifica com o requisito.
- **Fechamento:** cada grupo conta uma sugestão que aceitou e uma escolha que justificou.

## Situação-problema e entrega da aula
- **SA 2 (fechamento):** pasta da entrega com o README (como recriar, conectar e testar), escopo,
  DER, dicionário de dados atualizado, matriz de acesso, cronograma planejado × realizado,
  fluxograma da matrícula, scripts `01` a `07`, relatório de testes, matriz de rastreabilidade e o
  registro da revisão cruzada (sugestões, decisões e justificativas). O banco é recriado do zero na
  frente do professor.

## Verificação da aprendizagem
- Citar as peças da documentação técnica e para que serve cada uma.
- Explicar por que os scripts são numerados e por que o banco é recriado do zero antes da entrega.
- Montar a linha da matriz de rastreabilidade de um requisito.
- Dizer o que o back-end recebe para usar o banco sem o login `postgres`.
- Justificar tecnicamente uma escolha de modelagem e uma de segurança do próprio projeto.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), ferramenta de
DER (brModelo ou draw.io), planilha para o cronograma, kit multimídia e slides
`../AULAS/AULA-20-SLIDES.pdf` (apresentação, quando o professor publicar).
