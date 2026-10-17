# Introdução

### Apresentação

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

### Objetivo geral da unidade curricular

Propiciar o desenvolvimento de capacidades básicas e socioemocionais que permitem realizar a
interação entre a aplicação Back-End e um Banco de Dados, de acordo com a metodologia e padrão de
qualidade, usabilidade, ergonomia, acessibilidade e segurança.

### Como a apostila está organizada

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

### Como estudar com esta apostila

Leia o capítulo perto da aula e **rode os exemplos** no seu PostgreSQL: SQL se aprende digitando.
Antes de um `UPDATE` ou `DELETE`, rode o `SELECT` com o mesmo filtro. Revise o resumo no fim de
cada capítulo e consulte o glossário sempre que encontrar um termo novo.

### Como você será avaliado

| Instrumento | Momento | Peso |
|---|---|---|
| Avaliação contínua: atividades das aulas 1–19 e SAs 1 e 2 | Aulas 1–19 | 60% |
| Avaliação prática: banco completo de um caso fornecido | Aula 20 | 25% |
| Avaliação objetiva: modelagem, SQL, gerenciadores e segurança | Aulas 11 e 20 | 15% |

A aprovação exige **nota final ≥ 7,0** e presença mínima de 75%. Cada capacidade recebe o parecer
Desenvolvida, Em desenvolvimento ou Não desenvolvida. **Recuperação:** refazer a avaliação não
atingida com outro caso ou novo banco de questões, conforme o regimento da unidade SENAI.

### Ambientes, recursos e acessibilidade

Sala de aula, laboratório de informática, biblioteca e AVA. As ferramentas são o **PostgreSQL**, o
**psql** (terminal) e o **pgAdmin** ou o **DBeaver** (cliente gráfico), o **VS Code**, uma
ferramenta de DER (brModelo ou draw.io) e uma planilha para o cronograma. Se precisar, peça ao
professor zoom e alto contraste no cliente SQL, leitor de tela, scripts prontos para conferência,
tempo estendido ou trabalho em dupla.

### Situações de aprendizagem

- **SA 1 — Modelagem do banco de um sistema web (aulas 5 a 11):** a escola quer trocar planilhas
  por um sistema web de matrículas. Você levanta as demandas, define o escopo, desenha o DER,
  normaliza até a 3FN, padroniza os nomes e entrega o cronograma e o fluxograma da matrícula.
- **SA 2 — Banco pronto para o back-end (aulas 12 a 20):** o mesmo sistema precisa do banco
  funcionando. Você cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza
  regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria e entrega a
  documentação técnica.
