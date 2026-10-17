## Etapa 352-88c1272e — Uma tarefa por matéria do Técnico em Informática para Internet

**Tarefa:** #225-88c1272e-6fc9-4e83-ba82-0e57440fac54 · **Pedido em:** 2026-10-16 21:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a6bf2a33-1m21a1)
**Pedido:** "Faça 1 task pra cada matéria e 1 subtask pra cada aula da matéria e 1 subtask pra cada atividade objetiva e 1 pra cada atividade pratica, tipo discursiva, veja como esta na matéria ITIC padrao"
**Objetivo:** pôr no quadro todo o trabalho que falta nas matérias do curso Técnico em Informática
para Internet, já dividido em pedaços pequenos que qualquer IA do nível pode pegar.

### Escopo

- **Padrão ITIC** (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/`, regra
  `docs/regras/materias.md`): cada aula de 4 h tem 3 peças — a aula em `CONTEUDO/`, a objetiva de
  50 questões e a prática (discursiva) com gabarito.
- **Entra:** 1 tarefa-mãe por matéria **ainda sem aulas** (17 matérias) e, para cada aula,
  3 subtarefas: `Aula NN` (MEDIO), `Objetiva da aula NN — 50 questões` (PESADO: gabarito e seed)
  e `Prática da aula NN — discursiva` (PESADO: gabarito e seed). Cada objetiva e prática depende da
  aula dela; cada aula depende da anterior.
- **Progresso da turma em toda prática/discursiva** (pedido em 2026-10-16 21:35, como na ITIC):
  critério de aceitação de cada subtarefa `Prática da aula NN` — a atividade abre pelo layout
  global (`avaliacao-discursiva.js`), que já traz o "Progresso da turma" com os filtros
  (`assets/js/progresso-turma-global.js`, `docs/regras/atividades.md`); sem cópia por matéria.
- **"📄 Exportar Meu Gabarito" em toda atividade** (pedido em 2026-10-16 21:40, como na ITIC):
  critério de aceitação de cada `Objetiva da aula NN` e `Prática da aula NN` — botão do aluno
  ligado (`<body data-exportar-meu-gabarito="sim">` na objetiva; campo
  `- **Exportar Meu Gabarito:** sim` na fonte da discursiva, botão no painel IDENTIFICAÇÃO ao lado
  do "🔑 Gabarito da Atividade-Respostas"), regra `docs/regras/atividades.md` (#82, #196).
- **Tudo no banco** (pedido em 2026-10-16 21:45): cada `Aula NN` entra na tabela `aulas` e cada
  objetiva e prática entra em `atividade` + `gabarito` (prática com os tópicos), ligadas à aula
  (`curso → materia → aulas → atividade`). Cada subtarefa gera o seed em `database/` como
  **PENDENTE** em `database/SEEDS-APLICADOS.md`; aplicar e conferir o md5 é do **Claude Code
  local** (`multiplas-ias.md`, `seeds.md`). A subtarefa só fecha com o seed **CONCLUÍDO**.
- **Aulas por matéria** (1 aula a cada 4 h, arredondando para cima):

| Matéria | CH | Aulas | Subtarefas |
|---|---|---|---|
| Introdução à TIC | 40 h | 10 | 30 |
| Introdução ao Desenvolvimento de Projetos | 12 h | 3 | 9 |
| Introdução à Indústria 4.0 | 24 h | 6 | 18 |
| Arquitetura de Hardware e Software | 24 h | 6 | 18 |
| Versionamento e Colaboração | 20 h | 5 | 15 |
| Lógica de Programação | 128 h | 32 | 96 |
| Fundamentos de UI/UX | 76 h | 19 | 57 |
| Codificação para Front-End | 100 h | 25 | 75 |
| Interação com APIs | 40 h | 10 | 30 |
| Projeto de Front-End | 90 h | 23 | 69 |
| Sustentabilidade nos Processos Industriais | 8 h | 2 | 6 |
| Introdução à Qualidade e Produtividade | 16 h | 4 | 12 |
| Codificação para Back-End | 100 h | 25 | 75 |
| Desenvolvimento de APIs | 60 h | 15 | 45 |
| Testes de Back-End | 40 h | 10 | 30 |
| Projeto de Back-End | 90 h | 23 | 69 |
| Saúde e Segurança no Trabalho | 12 h | 3 | 9 |
| **Total** | | **221** | **663** |

- **Não entra:** Banco de Dados (20 aulas e 40 atividades prontas; apostila na #223) e Testes de
  Front-End (10 aulas prontas; atividades na #22); a pasta `Testes de Sistemas-EXISTENTES` (fora
  da lista oficial). Nenhum conteúdo é escrito nesta tarefa: só o quadro.
- **Pronto quando:** as 17 mães e as 663 subtarefas estão no `tasks/STATUS.md`, cada mãe com a sua
  etapa (seção por subtarefa com nível), e o usuário aceitou.

### Riscos

| Risco | Plano B |
|---|---|
| As 17 matérias não têm `materia.json` e as ementas têm de 3,5 mil a 10 mil caracteres (a regra pede 14.800–14.950) | Perguntar ao usuário se cada mãe ganha uma subtarefa 0 (ementa + `materia.json` + plano das aulas) antes da Aula 01 |
| Quadro fica muito grande (~680 linhas a mais no `STATUS.md`) | Linhas curtas; etapa da mãe com uma seção curta por subtarefa |

### Decisões

- 2026-10-16 21:26 — Aguardando a aprovação do plano pelo usuário.

### #225.1 — Criar no quadro as 17 tarefas e as 663 subtarefas

**Próximo passo:** aguardar o "sim" do usuário ao plano acima.

- **Nível:** LEVE — só `.md` do quadro (linhas e etapas), sem lógica.
- **Descrição:** 17 etapas novas (uma por matéria) e as linhas no `STATUS.md`.
- **Critérios de aceitação:** contagem da tabela do escopo bate com o quadro.

### #225.2 — Aceite do usuário

**Próximo passo:** esperar a #225.1.

- **Nível:** LEVE — conferência do usuário.
