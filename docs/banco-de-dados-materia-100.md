# Plano — Banco de Dados (Técnico em Informática para Internet) 100% no padrão da ITIC — etapa 1, sem a apostila

**Tarefa:** #20-2ac1a8ec-911b-466f (`tasks/TASKS.md`) · **Status oficial:** `tasks/STATUS.md`, Etapa 125
**Criado em:** 2026-10-09 13:30:18 · **Concluído em:** — · **Tempo decorrido:** —
**Matéria:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/` (renomeada de `BANCO_DE_DADOS` em 2026-10-09) · **Modelo:** `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/` (estrutura e funcionamento; nunca o conteúdo)
**Situação do plano:** ✅ Aprovado pelo usuário em 2026-10-09 13:40 (D1 80 h/20 aulas · D2 renomear · D3 PostgreSQL · D4 apagar os antigos · D5 padrão)

## 1. Objetivo

Deixar a matéria Banco de Dados com todas as peças que a ITIC tem (ementa da UC, `materia.json`,
aulas em `CONTEUDO/`, atividades objetivas e práticas por aula, avaliações, índices e controles),
**menos a apostila**, que fica para a etapa 2.

## 2. O que a leitura encontrou (2026-10-09)

| # | Achado | Consequência |
|---|--------|--------------|
| A1 | A UC "Banco de Dados" na `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md` (linha 1693) tem **80 h**, módulo ESPECÍFICO II, 6 conhecimentos e 14 capacidades básicas + 2 socioemocionais | Fonte da verdade da matéria |
| A2 | O `EMENTA-CHALKIE-AI.md` da matéria é o **modelo genérico** (40 h, "Fundamentos / Aplicação…", capacidades genéricas, sem nada de banco de dados) — o `STATUS-EMENTAS-CURSOS.md` já marca "Genérica" | ⚠️ Diverge da ementa do curso: **a do curso vence**; a ementa da matéria precisa ser **reescrita a partir da UC** (como foi feito em Testes de Front-End) |
| A3 | 80 h ÷ 4 = **20 aulas de 4 h** | 20 aulas, 20 objetivas de 50 questões (1.000 questões) e 20 práticas — trabalho para várias sessões |
| A4 | Matéria em `IGNORAR` no `STATUS-PERMISSAO-MATERIA` (curso em `VERIFICAR`) | Passar para `VERIFICAR` (pedido do usuário no `TASKS.md`) |
| A5 | Pasta `BANCO_DE_DADOS` fora do padrão (deveria ser `BANCO-DE-DADOS`); 13 `index.html` do curso e alguns scripts citam o nome atual | Renomear só se o usuário quiser (exige trocar os links) |
| A6 | `gabarito-avaliacao-pratica-banco-dados/` (respostas) **está versionada no Git**; a Vercel não publica (`.vercelignore`), mas fica visível no GitHub | Contraria "O QUE NUNCA É PUBLICADO"; decisão do usuário |
| A7 | `Avaliação prática banco de dados.md` é do curso **Técnico em Desenvolvimento de Sistemas** (capacidades SAEP/CT de outra UC) | ⛔ Não pode ser fonte de conteúdo desta UC |
| A8 | `exemplo-biblioteca/*.sql` (MySQL: `AUTO_INCREMENT`, `ENUM`), `DOCUMENTACAO/INDEX.md` (índice genérico) e `ORIENTACAO_UC-01-09-2026.txt` (recado de agenda) | Material antigo, sem papel no padrão da ITIC |

## 3. Escopo

- **Entra:** permissão `VERIFICAR`; ementa da matéria reescrita da UC (80 h); `materia.json`;
  20 aulas em `CONTEUDO/` + `AULAS/STATUS-AULAS.md` + `DOCUMENTACAO/PLANO-AULAS.md` (resumo);
  por aula, objetiva de 50 questões e prática de **10 questões × 3 tópicos** (`docs/REGRAS-ATIVIDADE-PRATICA.md`;
  a prova id 82 só como referência dos recursos compartilhados), fontes em `ATIVIDADES/CONTEUDO/`,
  gabaritos no Git e fora do site (`.vercelignore`), `ATIVIDADES/STATUS-ATIVIDADES.md`,
  `ATIVIDADES/index.html` regerado; avaliações (objetivas, prática, média final) no modelo da ITIC;
  rodada do `scripts/analise-materias.py`.
- **Não entra:** apostila (etapa 2); slides (`AULAS/AULA-NN-SLIDES.pdf` são feitos pelo professor);
  seeds/cadastro no banco Supabase (só com pedido); propagar para matérias semelhantes de outros
  cursos.
- **Critério de pronto:** `analise-materias.py` sem pendências para a matéria, exceto as da
  apostila; cada peça registrada nos STATUS; aceite do usuário.
- **Premissas e restrições:** conteúdo só da UC (nada de outra UC); só Markdown como fonte; gabarito no Git, mas
  nunca nas páginas nem no site; uma aula por vez, completa; práticas sem empresa fictícia; sem
  navegador e sem testes automatizados; um commit por item + push + PR (nuvem).

## 4. Decisões que dependem do usuário

| # | Decisão | Recomendação |
|---|---------|--------------|
| D1 | Carga horária | **80 h / 20 aulas** (ementa do curso vence a genérica de 40 h) |
| D2 | Nome da pasta | Renomear para `BANCO-DE-DADOS` e corrigir os links (regra "pasta = UC") |
| D3 | SGBD usado nos exemplos | **PostgreSQL** (é o do Supabase que os alunos já veem no sistema); alternativa: MySQL, como no `exemplo-biblioteca` |
| D4 | Arquivos antigos (A6–A8) | ✅ Escolha do usuário: **apagar** (o Git guarda o histórico). Recomendação era mover para `BANCO_DE_DADOS/LEGADO/` (ou apagar), e tirar a pasta de gabarito do Git (`git rm --cached` + `.gitignore`), mantendo-a na máquina |
| D5 | Ritmo | Aula por aula; atividades em blocos de 3 aulas (como Testes de Front-End), um commit por peça |

## 5. Sequência proposta das 20 aulas (conhecimentos da UC)

| Aula | Tema | Conhecimentos |
|------|------|---------------|
| 01 | Banco de dados e SGBD: conceitos, usos e gestão do tempo nos projetos | 4, 4.1, 1.1 |
| 02 | Gerenciadores: características, requisitos e níveis de gerenciamento de dados | 4.1.1, 4.1.2 |
| 03 | Preparação do ambiente: instalação do SGBD | 4.2, 4.2.1 |
| 04 | Configuração do SGBD e relação com a infraestrutura do sistema | 4.2.2 |
| 05 | Demandas do cliente e escopo do projeto de dados | 6.1 |
| 06 | MER: entidades fortes, fracas e associativas | 5.1 |
| 07 | Atributos: simples, composto, descritivo, nominativo e referencial | 5.3 |
| 08 | Relacionamentos 1:1, 1:N e N:N | 5.2 |
| 09 | Diagrama entidade-relacionamento (DER) | 5.4 |
| 10 | Normalização de dados (1FN, 2FN, 3FN) | 5.5 |
| 11 | Padronização de dados; cronograma e fluxograma do projeto | 5.6, 6.2, 6.3 |
| 12 | DDL: criação de tabelas e campos (tipos de dados) | 3.1, 3.1.1, 3.1.2 |
| 13 | DDL: relações — chaves primária e estrangeira, restrições | 3.1.3 |
| 14 | DML: inserção, atualização e exclusão | 3.2.2, 3.2.3, 3.2.4 |
| 15 | DML: consultas — SELECT, filtros e ordenação | 3.2.1 |
| 16 | Consultas com junções, agrupamento e subconsultas | 3.2.1 |
| 17 | Procedimentos armazenados | 3.2.5 |
| 18 | Triggers (disparadores) | 3.2.6 |
| 19 | Segurança da informação: pilares, controle de acesso e auditoria | 2, 2.1, 2.2, 2.3 |
| 20 | Projeto integrador: documentação técnica e banco completo para o back-end | 6, revisão de 3–5 |

Todas as capacidades básicas e as 2 socioemocionais ficam distribuídas nas aulas (mapa no
`materia.json` e no `PLANO-AULAS.md`). A sequência pode mudar na aprovação.

## 6. Passos

| Passo | Ação | Caminho | Verificação | Status |
|-------|------|---------|-------------|--------|
| 1 | Plano e aprovação (D1–D5) | este arquivo | Resposta do usuário | ✅ 2026-10-09 13:40 |
| 2 | Permissão `IGNORAR` → `VERIFICAR` (+ renomear a pasta, se D2) | `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | `grep` da linha | ✅ 2026-10-09 13:48 — `VERIFICAR`, pasta `BANCO-DE-DADOS`, links dos 21 `index.html` trocados |
| 3 | Arquivos antigos conforme D4 | pasta da matéria, `.gitignore` | `git ls-files` sem gabarito | ✅ 2026-10-09 13:48 — apagados gabarito, exemplo-biblioteca, avaliação de outro curso, INDEX.md e recado |
| 4 | Reescrever `EMENTA-CHALKIE-AI.md` da UC (80 h, capacidades e conhecimentos literais) + STATUS-EMENTAS | matéria, `STATUS-EMENTAS.md` | Comparar com a linha 1693 da ementa do curso; regra de tamanho | ✅ 2026-10-09 13:50 — 14.923 caracteres |
| 5 | `materia.json` no formato da ITIC/Testes de Front-End | `materia.json` | `python -m json.tool` | ✅ 2026-10-09 13:50 — 20 aulas, 14 indicadores, 80 h |
| 6 | Aulas 01 a 20 em `CONTEUDO/`, uma por vez, + `AULAS/STATUS-AULAS.md` + `DOCUMENTACAO/PLANO-AULAS.md` | `CONTEUDO/AULA-NN-*.md` | Soma das horas = 80; cada aula com dinâmica | ⬜ |
| 7 | Objetiva de 50 questões por aula (gerador da ITIC) | `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` → `.html` | Gerador sem erro; sem gabarito no HTML | ⬜ |
| 8 | Prática por aula no padrão da id 82 (`docs/REGRAS-ATIVIDADE-PRATICA.md`) | `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` (+ `-GABARITO.md` fora do Git) → `.html` | Gerador discursivo sem erro | ⬜ |
| 9 | `STATUS-ATIVIDADES.md`, `MENU-ATIVIDADES.js` e `ATIVIDADES/index.html` regerado | `ATIVIDADES/` | Gerador de índices | ⬜ |
| 10 | Avaliações objetivas, prática e média final (modelo ITIC) | `ATIVIDADES/AVALIACAO-*.html`, `media-final.json` | Gerador sem erro | ⬜ |
| 11 | `scripts/analise-materias.py` | `tasks/ANALISE-MATERIAS-RELATORIO.json` | Só pendências da apostila | ⬜ |
| 12 | Aceite do usuário | — | — | ⬜ |

## 7. Riscos

| Risco | Plano B |
|-------|---------|
| Volume grande (20 aulas, 1.000 questões) estoura uma sessão | Status gravado peça a peça; outra sessão/licença retoma pelo `STATUS.md` |
| Renomear a pasta quebra links | Trocar em todos os `index.html` e regerar índices no mesmo commit |
| Conteúdo de outra UC (A7) entrar nas aulas | Usar só a UC da ementa do curso |
| Gabarito entrar no commit | `git diff --cached --name-only` antes de cada commit |

## 8. Resultado

(preencher ao concluir)
