# 🤖 EMENTA-CHALKIE-AI — Banco de Dados

**Unidade curricular:** Banco de Dados  
**Módulo:** Específico II | **Curso:** Técnico em Informática para Internet  
**Carga horária:** 80h (20 aulas × 4h) | **Modalidade:** Presencial  
**Plataforma:** Chalkie AI | **Versão:** 2.0 — reescrita a partir da ementa oficial (2026-10-09)

> Segue a ementa do curso (`../EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`, UC 16, fonte da verdade). **[oficial]** = literal da ementa do curso; o resto é didático. A versão 1 era o modelo genérico de 40h e foi substituída.

---

## 📚 I. CONTEXTO E ALINHAMENTO

### Justificativa
Toda aplicação para internet guarda dados: cadastros, pedidos, mensagens, notas. A UC ensina o estudante a entender o pedido do cliente, modelar os dados (entidade-relacionamento e normalização), preparar o gerenciador, criar e consultar o banco com SQL, automatizar regras com procedimentos e triggers e proteger os dados com controle de acesso e auditoria. Prepara para Codificação para Back-End, Desenvolvimento de APIs e Projeto de Back-End, que consomem o banco criado aqui.

### Função (módulo Específico II)
● 2 - Desenvolver sistemas para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.

### Objetivo geral [oficial]
Propiciar o desenvolvimento de capacidade básicas e socioemocionais que permitem realizar a interação entre a aplicação Back-End e um Banco de Dados, de acordo com a metodologia e padrão de qualidade, usabilidade, ergonomia, acessibilidade e segurança

---

## 🎯 II. CAPACIDADES

### Capacidades básicas [oficial]

| Cód. | Capacidade |
|---|---|
| **C1** | Reconhecer as demandas do cliente |
| **C2** | Aplicar os procedimentos do modelo de modelagem entidade-relacionamento |
| **C3** | Aplicar os procedimentos de normalização e padronização de dados. |
| **C4** | Reconhecer as características e funcionalidades do banco de dados |
| **C5** | Correlacionar as características e funcionalidades do banco de dados com a infraestrutura do sistema |
| **C6** | Reconhecer os diferentes níveis de gerenciamento de dados |
| **C7** | Aplicar linguagem de definição de dados |
| **C8** | Aplicar linguagem de manipulação de dados |
| **C9** | Reconhecer os diferentes gerenciadores de bancos de dados |
| **C10** | Instalar gerenciadores de bancos de dados |
| **C11** | Configurar gerenciadores de bancos de dados |
| **C12** | Reconhecer os pilares da segurança da informação |
| **C13** | Reconhecer os níveis hierárquicos de segurança da informação |
| **C14** | Aplicar boas práticas de segurança da informação |

### Capacidades socioemocionais [oficial]
- **S1** — Valorizar novos fatos, ideias e opiniões diferentes para resolução de problemas pertinentes as atividades sob a sua responsabilidade
- **S2** — Fundamentar escolhas e decisões no exame de fatos, contextos, possibilidades, desafios e problemáticas de diferentes naturezas à luz de referenciais técnicos, legais, normativos e institucionais

### Indicadores de desempenho

| # | Indicador | Cap. | Aula |
|---|---|---|---|
| 1 | Explica o que é banco de dados e SGBD com exemplo de um sistema web | C4 | 1 |
| 2 | Compara gerenciadores (relacional e não relacional) por características e requisitos | C6/C9 | 2 |
| 3 | Instala e configura o PostgreSQL e conecta por cliente gráfico e terminal | C10/C11 | 3–4 |
| 4 | Liga o banco à infraestrutura do sistema (servidor, porta, usuário, back-end) | C5 | 4 |
| 5 | Transforma o pedido do cliente em requisitos de dados e escopo | C1 | 5 |
| 6 | Identifica entidades fortes, fracas e associativas e seus atributos | C2 | 6–7 |
| 7 | Define cardinalidades 1:1, 1:N e N:N e desenha o DER | C2 | 8–9 |
| 8 | Normaliza tabelas até a 3FN e padroniza nomes e tipos | C3 | 10–11 |
| 9 | Cria tabelas, campos, chaves e restrições com DDL | C7 | 12–13 |
| 10 | Insere, atualiza, exclui e consulta dados com DML | C8 | 14–16 |
| 11 | Cria procedimento armazenado e trigger para uma regra do negócio | C8 | 17–18 |
| 12 | Aplica pilares, níveis de acesso e auditoria com papéis e permissões | C12–C14 | 19 |
| 13 | Justifica escolhas de modelagem e de segurança com base nos requisitos | S2 | 5, 10, 20 |
| 14 | Acolhe sugestões do colega na revisão do modelo e do script | S1 | 9, 20 |

---

## 📖 III. CONHECIMENTOS [oficial]

1. **Autogestão** — 1.1 Gestão do tempo
2. **Segurança da informação** — 2.1 Pilares (2.1.1 Integridade · 2.1.2 Disponibilidade · 2.1.3 Confidencialidade) · 2.2 Controle de acesso · 2.3 Auditoria de acesso
3. **Linguagem de consulta de banco de dados** — 3.1 Linguagem de definição de dados (3.1.1 Tabelas · 3.1.2 Campos · 3.1.3 Relações) · 3.2 Linguagem de manipulação de dados (3.2.1 Consulta · 3.2.2 Atualização · 3.2.3 Inserção · 3.2.4 Exclusão · 3.2.5 Procedimentos armazenados · 3.2.6 Triggers (disparadores))
4. **Banco de dados** — 4.1 Gerenciadores (4.1.1 Características · 4.1.2 Requisitos) · 4.2 Preparação de ambiente de banco de dados (4.2.1 Instalação · 4.2.2 Configuração)
5. **Modelo entidade-relacionamento** — 5.1 Entidades (5.1.1 Fracas · 5.1.2 Fortes · 5.1.3 Associativas) · 5.2 Relacionamento (5.2.1 Um para um · 5.2.2 Um para muitos · 5.2.3 Muitos para muitos) · 5.3 Atributos (5.3.1 Simples · 5.3.2 Composto · 5.3.3 Descritivo · 5.3.4 Nominativo · 5.3.5 Referencial) · 5.4 Diagrama entidade-relacionamento · 5.5 Normalização de dados · 5.6 Padronização de dados
6. **Documentação técnica** — 6.1 Escopo do projeto · 6.2 Cronograma · 6.3 Fluxograma

---

## 🗓️ IV. SEQUÊNCIA DE AULAS (80h)

| Aula | Tema | Conhecimentos | Entrega |
|---|---|---|---|
| 01 | Banco de dados e SGBD: conceitos e usos | 4 · 4.1 · 1.1 | Mapa dos dados de um sistema web |
| 02 | Gerenciadores: características, requisitos e níveis | 4.1.1–4.1.2 | Quadro comparativo de SGBDs |
| 03 | Preparação do ambiente: instalação do PostgreSQL | 4.2.1 | PostgreSQL instalado e testado |
| 04 | Configuração do SGBD e infraestrutura do sistema | 4.2.2 | Banco, usuário e conexão configurados |
| 05 | Demandas do cliente e escopo do projeto | 6.1 · 1.1 | Documento de escopo e requisitos de dados |
| 06 | Entidades fortes, fracas e associativas | 5.1 | Lista de entidades do caso |
| 07 | Atributos | 5.3 | Dicionário de atributos |
| 08 | Relacionamentos 1:1, 1:N e N:N | 5.2 | Cardinalidades justificadas |
| 09 | Diagrama entidade-relacionamento | 5.4 | DER do caso revisado em dupla |
| 10 | Normalização de dados (1FN, 2FN e 3FN) | 5.5 | Tabelas na 3FN |
| 11 | Padronização de dados, cronograma e fluxograma | 5.6 · 6.2 · 6.3 | Padrão de nomes + cronograma + fluxograma |
| 12 | DDL: tabelas e campos | 3.1.1–3.1.2 | Script CREATE TABLE |
| 13 | DDL: relações, chaves e restrições | 3.1.3 | Script com PK, FK e restrições |
| 14 | DML: inserção, atualização e exclusão | 3.2.2–3.2.4 | Carga de dados de teste |
| 15 | DML: consultas com filtros e ordenação | 3.2.1 | 15 consultas resolvidas |
| 16 | Consultas com junções, agrupamentos e subconsultas | 3.2.1 | Relatórios em SQL |
| 17 | Procedimentos armazenados | 3.2.5 | Procedimento de uma regra do negócio |
| 18 | Triggers (disparadores) | 3.2.6 | Trigger de histórico e validação |
| 19 | Segurança da informação: pilares, acesso e auditoria | 2 · 2.1–2.3 | Papéis, permissões e log de auditoria |
| 20 | Projeto integrador: banco documentado para o back-end | 6 · 3 · 5 | Documentação técnica + banco completo |

### Situações de aprendizagem (didático)
- **SA 1 — Modelagem do banco de um sistema web (aulas 5–11).** Uma escola de cursos livres fictícia quer trocar planilhas por um sistema web de matrículas. O estudante levanta as demandas, define escopo, desenha o DER, normaliza até a 3FN, padroniza nomes e entrega cronograma e fluxograma do processo de matrícula.
- **SA 2 — Banco pronto para o back-end (aulas 12–20).** O mesmo sistema precisa do banco funcionando. O estudante cria o banco no PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria papéis com permissões mínimas e auditoria, e entrega a documentação técnica.

### Dificuldades comuns (e como tratar)
- **Confundir entidade com atributo** → perguntar "isso tem dados próprios e se repete?"; se sim, é entidade.
- **N:N sem tabela associativa** → desenhar a tabela do meio com as duas chaves estrangeiras.
- **Normalizar por decoreba** → partir de uma planilha real com repetição e mostrar a anomalia.
- **UPDATE/DELETE sem WHERE** → rodar antes o SELECT com o mesmo filtro e usar transação.
- **Instalação travada (porta, senha, serviço)** → roteiro da aula 3 e conferência com `psql --version`.
- **Usar o superusuário na aplicação** → papel próprio só com as permissões necessárias.

Regra de bolso: se um dado precisa ser corrigido em mais de um lugar, o modelo ainda não está normalizado.

---

## 💯 V. AVALIAÇÃO

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: atividades das aulas 1–19 e SAs 1 e 2 | Aulas 1–19 | 60% | Correção, completude, organização dos scripts, prazo |
| Avaliação prática: banco completo de um caso fornecido | Aula 20 | 25% | DER · 3FN · DDL com chaves · 10 consultas · 1 procedimento · 1 trigger · permissões |
| Avaliação objetiva: modelagem, SQL, gerenciadores e segurança | Aulas 11 e 20 | 15% | Acertos; questões capacidade → contexto → comando |

**Nota final** = 60% contínua + 25% prática + 15% objetiva. **Aprovação:** nota final **≥ 7,0** e presença mínima de 75%. Cada capacidade recebe o parecer Desenvolvida / Em desenvolvimento / Não desenvolvida.

**Recuperação (didático):** refazer a avaliação não atingida com outro caso ou novo banco de questões, conforme o regimento da unidade SENAI.

### Rubrica de desempenho (4 níveis)

| Nível | Nota | Descrição |
|---|---|---|
| **Excelente** | 9–10 | Modelo normalizado e rastreável ao requisito, scripts que rodam sem erro, segurança aplicada e decisões justificadas |
| **Bom** | 7–8 | Banco correto e funcionando, com pequenas falhas de padrão, consulta ou documentação |
| **Aceitável** | 5–6 | Cumpre o essencial com orientação; redundâncias ou restrições faltando |
| **Insuficiente** | 0–4 | Scripts que não rodam, modelo sem chaves ou sem relação com o pedido |

---

## 🔗 VI. MAPEAMENTO BNCC (didático)

- **CG2 Pensamento científico e crítico** — aulas 5 a 11: análise do pedido, hipótese de modelo e verificação de anomalias
- **CG5 Cultura digital** — aulas 3 a 19: SGBD, SQL e ferramentas de modelagem
- **CG4 Comunicação** — aulas 9 e 20: DER, dicionário de dados e documentação técnica
- **CG9 Empatia e cooperação** — aulas 9 e 20: revisão do modelo em dupla
- **CG10 Responsabilidade** — aula 19 e todas: cuidado com dados pessoais (LGPD) e gestão do tempo (1.1)

---

## 📦 VII. RECURSOS E AMBIENTES

**Ambientes pedagógicos [oficial]:** biblioteca, sala de aula, laboratório de informática, AVA com recursos de interatividade.  
**Máquinas, equipamentos, instrumentos e ferramentas [oficial]:** computador com a configuração adequada para a execução das atividades e acesso à internet; kit multimídia; IDE para desenvolvimento de sistemas; sistemas operacionais; pacote de aplicativos de escritório; sistema de gerenciamento de banco de dados.  
**Recursos didáticos [oficial]:** livros, apostilas e revistas especializadas; manuais, normas e catálogos técnicos.

**Ferramentas (didático):** PostgreSQL (SGBD da UC), psql e pgAdmin ou DBeaver, VS Code, ferramenta de DER (brModelo ou draw.io) e planilha para o cronograma.

**Acessibilidade [oficial, resumo]:** asseguradas as condições de acessibilidade ao aluno com impedimentos de longo prazo (Lei nº 13.146/2015, LDB nº 9394/96). **Didático:** zoom e alto contraste no cliente SQL, leitor de tela, scripts prontos para conferência, tempo estendido e duplas.

---

## 🧠 VIII. PROMPTS PARA CHALKIE AI

1. *"A partir do pedido de uma escola fictícia de cursos livres, liste as entidades, os atributos e os relacionamentos com cardinalidade."*
2. *"Mostre uma planilha de matrículas com repetição e normalize passo a passo até a 3FN, explicando cada anomalia."*
3. *"Compare PostgreSQL, MySQL, SQLite e MongoDB em características e requisitos, em tabela."*
4. *"Escreva o roteiro de instalação do PostgreSQL no Windows e no Linux, com a conferência no psql."*
5. *"Crie o script DDL de alunos, cursos e matrículas com chaves primária e estrangeira, NOT NULL, UNIQUE e CHECK."*
6. *"Gere 15 consultas SQL em níveis crescentes (filtro, ordenação, junção, agrupamento, subconsulta) com o resultado esperado."*
7. *"Escreva um procedimento armazenado em PL/pgSQL que matricula um aluno só se houver vaga."*
8. *"Crie um trigger que grava em tabela de histórico toda alteração de nota, com usuário e data."*
9. *"Monte papéis e GRANT/REVOKE com o mínimo de permissões para a aplicação, a secretaria e o professor."*

---

## ⚙️ IX. REGRAS PARA IA

1. Capacidades e conhecimentos **[oficial]** não podem ser alterados, ampliados nem reduzidos.
2. Carga horária é 80h em 20 aulas de 4h; não criar aulas nem pesos além das Seções IV e V.
3. O título "Capacidades Técnicas" da ementa do curso aparece sem itens: esta UC não tem capacidades técnicas.
4. SGBD padrão: PostgreSQL; SQL deve rodar nele, com o resultado esperado informado.
5. Contextualizar em sistemas web reais (escola, loja, clínica); empresas sempre fictícias; nunca dados pessoais reais.
6. Integrar S1 e S2 na revisão do modelo em dupla e na justificativa das escolhas.

---

## 🔗 X. CAPACIDADES × CONHECIMENTOS

C1 Demandas do cliente → 6.1 · C2 Modelagem ER → 5.1–5.4 · C3 Normalização e padronização → 5.5–5.6 · C4–C6 Características, infraestrutura e níveis → 4.1 · C7 DDL → 3.1 · C8 DML → 3.2 · C9 Gerenciadores → 4.1 · C10–C11 Instalar e configurar → 4.2 · C12–C14 Segurança → 2 · S1/S2 → 1.1, 6.

---

## 📘 XI. GLOSSÁRIO

**SGBD** — programa que guarda e gerencia os dados · **Entidade** — objeto do mundo real com dados próprios · **Atributo** — característica de uma entidade · **Cardinalidade** — quantos de um lado se ligam ao outro · **Chave primária (PK)** — identifica cada linha · **Chave estrangeira (FK)** — liga uma tabela a outra · **Normalização** — retirar repetições e dependências erradas · **DDL** — comandos que criam a estrutura · **DML** — comandos que mexem nos dados · **Procedimento armazenado** — rotina guardada no banco · **Trigger** — rotina disparada por um evento · **Auditoria** — registro de quem acessou ou alterou o quê.

---

## ✅ XII. CHECKLIST E MÉTRICAS

- [x] Ementa oficial conciliada; 20 aulas × 4h; SGBD PostgreSQL
- [x] Aulas em Markdown `CONTEUDO/AULA-01..20-*.md`
- [x] Atividades de 50 questões e práticas por aula
- [x] Avaliações objetivas, prática e média final

**Métricas:** 80%+ dos estudantes com nota ≥ 7,0 · 100% entregam o banco do projeto integrador rodando.

---

**Status:** ✅ Específica, conciliada com a ementa oficial do curso  
**Última atualização:** 2026-10-16
