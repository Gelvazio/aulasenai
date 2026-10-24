## Etapa 404-627c95d8 — Fundamentos de UI/UX completa: aulas, objetivas de 50, discursivas de 20, respostas prováveis, seeds e JEV-AI

**Tarefa:** #276-627c95d8-d2ac-4cd8-9f5f-387ce08d88ed · **Pedido em:** 2026-10-18 16:56 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "crie uma tarefa que faça por completo tudo que falta da matéria FUNDAMENTOS-DE-UI-UX, use como base a matéria INTRODUCAO-TIC, use 1 atividade objetiva por aula de 50 perguntas, 1 atividade discursiva de 20 perguntas, crie os seeds do banco de dados, e deixe 1 sub-tarefa pra cada atividade discursiva, que deve gerar as respostas prováveis de cada pergunta, pra depois analisar e comparar com as respostas dos alunos, adicione uma subtask de análise completa do JEV-AI revisando os modelos que foram sugeridos em cada sub-task, crie o máximo de detalhes no máximo possível de sub-tasks pra modelos pequenos que são mais baratos, inclua os modelos do opencode também."
**Objetivo:** deixar a matéria **Fundamentos de UI/UX** 100% pronta (peças do `STATUS_MATERIA.md`) no padrão da **Introdução à TIC**: 19 aulas em `CONTEUDO/`, 19 objetivas de **50 questões**, 19 discursivas de **20 questões**, gabarito e **respostas prováveis** de cada discursiva, seeds aplicados e conferidos, páginas, avaliações, média final, apostila, e a **análise completa do JEV-AI** com a revisão dos modelos de cada subtarefa.

> ⛔ **Substitui a #232** (etapa 359, 59 subtarefas, criada em 2026-10-16): a mãe e as subtarefas dela ficam ⛔ nesta data (Decisão D1).
> 🚫 **Sem slides** (2026-10-16, #244.9): a IA não gera PDF nem PPTX de aula. 🚫 Conteúdo só pelos Markdowns da matéria (nunca de PDF). ⛔ Gabarito e respostas prováveis nunca no site.

### Escopo

**Entra:**

- Ementa no padrão (14.800–14.950 caracteres) e `materia.json` com as **19 aulas** (76 h ÷ 4 h).
- 19 aulas em `CONTEUDO/` + `DOCUMENTACAO/PLANO-AULAS.md`.
- 19 objetivas de **50 questões** (gabarito equilibrado 13 A · 13 B · 12 C · 12 D).
- 19 discursivas de **20 questões × 3 tópicos** (1 ponto por questão; 0,2 + 0,4 + 0,4) com `-GABARITO.md`.
- **1 arquivo de respostas prováveis por discursiva** (3 a 5 variantes por pergunta), para comparar depois com as respostas dos alunos.
- Seeds de **aula + objetiva + discursiva** de cada aula: gerados, aplicados e conferidos por md5, registrados em `SEEDS-APLICADOS.md`.
- Páginas geradas, "📄 Exportar Meu Gabarito", "Progresso da turma" (layout global) e índice/menu.
- Avaliações (objetiva de 50 questões e prática de 20 × 3), média final e apostila (Markdown + HTML).
- **Análise completa do JEV-AI** e revisão dos modelos sugeridos em cada subtarefa.
- Os 5 arquivos de status, `STATUS_MATERIA.md`, visualizador e quadro em dia.

**Não entra:**

- Slides (PDF/PPTX) — regra #244.9.
- Ler PDF, usar conteúdo de outra UC ou de matéria semelhante, criar empresa fictícia.
- Migração da #25 (atividades só no banco): vale o jeito atual (páginas + fontes por aula).
- Mudar a **prioridade** ou o **nível** das subtarefas sem pedido do usuário; mudar a matriz de modelos.

### Padrões que toda subtarefa segue

1. **Fonte:** `EMENTA-CHALKIE-AI.md` desta UC + `materia.json` + `CONTEUDO/`. ⛔ Nunca PDF nem outra matéria.
2. **Aluno consultor** (2026-10-08): "Você, como aluno consultor…", no contexto profissional do curso; sem empresa fictícia.
3. **Gabarito e respostas prováveis:** no Git e **fora do site** (`.vercelignore`); o aluno nunca lê.
4. **Padrão técnico:** nomes em português, sem `<script>`/`<style>` nas páginas, JS/CSS reutilizáveis em `assets/`, avisos com `popup.js`, nada de `localStorage` para dado de aluno, nada de chave no site.
5. **Sem navegador e sem testes automatizados:** verificar por leitura, `node --check`, geradores e consultas.
6. **Commit + push na `main`** ao fim de cada subtarefa, com o quadro no mesmo commit; 1 commit por subtarefa.
7. **Status na hora:** 🔄 ao reservar, ✅ ao entregar (linha movida para `tasks/task_complete.md`), ⛔/👀 com motivo.
8. **1 subtarefa reservada por frente por vez**; ⛔ ninguém executa subtarefa de outro modelo.

### Matriz de modelos desta tarefa (skill `classificar-tarefa`, 2026-10-18 — C35/C37)

| Nível | Coluna "Modelo" do quadro | Quem executa |
|---|---|---|
| `LEVE` | `LEVE · só Haiku/Flash/deepseek-flash` | Claude Haiku, Gemini Flash, Antigravity Flash, OpenCode `deepseek-flash`, Codex, Cursor, Qoder, Devin, Grok Bot |
| `MEDIO` | `MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking` | Claude Sonnet, Gemini Pro, Grok 4.7, DeepSeek (raciocínio), OpenCode `deepseek-flash` com thinking, Codex, Cursor, Qoder |
| `PESADO` | `PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro` | Claude Opus 5.5+/Fable, DeepSeek, OpenCode `deepseek-v4-pro` |
| `PESADO` (banco) | `PESADO · só Claude Code local (Opus 5.5+/Fable)` | só Claude Code **local** — banco só local (`multiplas-ias.md`) |

- Modelo forte pega subtarefa mais leve **só se** não houver nenhuma livre do seu nível (a fila não para).
- A matriz da skill é a de 2026-10-18 (C35/C37, com OpenCode e DeepSeek em `PESADO`); a subtarefa RL-988F933E.1 alinha o `.claude/rules/niveis.md` a ela — até lá vale a matriz da skill.

### Plano das 19 aulas (proposto; fechar no #276.0)

| # | Aula (tema proposto) | Conhecimentos da ementa | Capacidades | Socioemocional |
|---|---|---|---|---|
| 01 | Princípios de design: definição e evolução histórica | 7 e 7.1–7.2 | C3 | S1 |
| 02 | Formas geométricas e regras de visualização dos elementos da interface | 7.3–7.4 | C1 | S3 |
| 03 | Teoria das cores na interface | 7.5 | C1 | S2 |
| 04 | Resolução de problemas: análise crítica | 1 e 1.1 | C3 | S2 |
| 05 | Resolução de problemas: análise de cenários | 1.2 | C3 | S1 |
| 06 | User Interface: definição e tipos de interface | 3, 3.1 e 3.5 (texto, voz, natural) | C3 | S4 |
| 07 | Layout: padrões de leitura F e Z e alinhamento | 3.2.1–3.2.2 | C1 | S3 |
| 08 | Layout: tamanho, espaçamento, texturas, fontes e repetição | 3.2.3–3.2.7 | C1 | S2 |
| 09 | Eventos e navegação na interface | 3.3–3.4 | C2 | S1 |
| 10 | User Experience: definição e design centrado no usuário | 4, 4.1 e 4.2 | C2 | S3 |
| 11 | Processo de design interativo | 4.3 | C2 | S4 |
| 12 | Jornada do usuário: objetivos do público-alvo e pesquisa | 4.4, 4.4.1 e 4.4.2 | C2 | S1 |
| 13 | Usabilidade: friendly e intuitividade | 4.5, 4.5.1 e 4.5.2 | C2 | S3 |
| 14 | Estratégias de coleta de informações: determinação e aplicação | 5, 5.1 e 5.2 | C2 | S2 |
| 15 | Coleta de feedbacks e resolução de conflitos | 5.3–5.4 | C2 | S3 |
| 16 | Determinação de escopo do projeto de interface | 5.5 | C2 | S4 |
| 17 | Prototipagem: storyboard e protótipos de papel | 2, 2.1 e 2.2 | C2 | S1 |
| 18 | Mock-ups digitais e processo de criação | 2.3 e 7.6 | C2 | S4 |
| 19 | Direito autoral: definição, anterioridade, Creative Commons e registro | 6 e 6.1–6.4 | C4 | S2 |

- Capacidades: **C1** reconhecer formas geométricas; **C2** empregar técnicas de processos de criação; **C3** identificar princípios básicos e contexto histórico de Design; **C4** identificar direito autoral. Socioemocionais: **S1** valorizar novos fatos, ideias e opiniões; **S2** fundamentar escolhas em referenciais técnicos e legais; **S3** considerar propostas próprias e de outros; **S4** comprometer-se com engajamento e cooperação.

### Decisões

- **D1 — 2026-10-18 (pedido do usuário):** este plano **substitui** a #232 (etapa 359): a mãe e as 59 subtarefas dela ficam ⛔ no quadro, para não haver dois planos do mesmo assunto.
- **D2 — 2026-10-18 (criação):** níveis e modelos seguem a skill `classificar-tarefa` (matriz 2026-10-18, C35/C37, com OpenCode e DeepSeek em `PESADO`).
- **D3 — 2026-10-18 (criação):** a discursiva desta matéria é **20 questões × 3 tópicos** (pedido do usuário), e não 10 × 3 do padrão geral; a avaliação prática segue `docs/regras/materias.md` §6 (20 × 3; 0,1 + 0,2 + 0,2).
- **D4 — 2026-10-18 (criação):** as respostas prováveis de cada discursiva ficam em arquivo próprio (`RESPOSTAS-PROVAVEIS-AULA-NN.md`), fora do site, e alimentam a comparação do JEV-AI (#276.163); o padrão oficial continua no `-GABARITO.md`.
- **D5 — 2026-10-18 (criação):** sem subtarefa de aceite do usuário no fim (ciclo da task: a IA finaliza sempre); o professor confere quando quiser.

- **D6 — 2026-10-24 (usuário, no chat):** plano da #276 **aprovado como está** ("Sim, aprovo o plano da #276 como está").

- **D7 — 2026-10-24 (usuário, no chat):** o usuário autorizou rodar o Jev nas 166 subtarefas (C52). Rodado com `--gravar --reclassificar`: 101 ficaram LEVE (só Haiku 5.5 ou DeepSeek V4.1 Flash) e 65 PESADO; nenhuma MEDIO. Os níveis antigos da D2 foram substituídos. 61 LEVE e 65 PESADO saíram por sinais (confiança < 0,80); 40 LEVE saíram pelo Jev (>= 0,80).

### Riscos e plano B

| Risco | Chance | Impacto | Plano B |
|---|---|---|---|
| Conteúdo sair da ementa (capacidades/conhecimentos a mais) | Média | Alto | Conferir cada aula contra a ementa antes de gerar atividade; corrigir na hora |
| Gabarito ou respostas prováveis chegarem ao site | Baixa | Alto | Conferir o `.vercelignore` em cada subtarefa de gabarito; varrer os HTMLs no fechamento |
| Seed aplicado em dobro ou com ids trocados | Baixa | Alto | Seed idempotente + conferência de md5 + registro; aplicar só pelo Claude Code local |
| Modelo barato entregar questão fraca | Média | Médio | Conferência por aula (#276.8, #276.16, …) e revisão final (#276.164) |
| Outra sessão reservar a mesma subtarefa | Baixa | Baixo | Reserva com commit + push imediatos; push recusado → sincronizar, reler o quadro e desfazer a reserva |
| Fila longa (166 subtarefas) | Alta | Médio | Subtarefas pequenas e independentes por aula; cada frente pega a próxima livre do seu nível |

### Critério de pronto (a mãe #276 fecha quando)

`STATUS_MATERIA.md` = **✅ CONCLUÍDA**; 19 aulas com objetiva e discursiva no banco; todos os seeds **CONCLUÍDO**; gabaritos e respostas prováveis fora do site; avaliações, média final e apostila prontas; análise do JEV-AI entregue; 5 status ✅; visualizador e quadro em dia; commits + push na `main`.

---
### #276.0 — Ementa completa, `materia.json` e plano das 19 aulas

**Próximo passo:** concluída; a #276.1 (e as aulas 2 a 19) já podem ser pegas.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Completar `EMENTA-CHALKIE-AI.md` até 14.800–14.950 caracteres, conferida com a UC da `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md` (seções, rubrica e prompts do padrão, sem criar conhecimento além dos itens 1 a 7 da ementa); criar `materia.json` com `uc`, `uc_curta`, `curso`, `docente`, `autor_apostila`, `versao_apostila`, `modulo`, `modalidade`, `carga_horaria_uc` (76), `capacidades` (C1–C4), `capacidades_socioemocionais` (S1–S4), `conhecimentos`, `horas_por_aula` (4), `aulas` (as 19 do plano abaixo: número, tema, 4 h, capacidades, conteúdos oficiais, indicadores, prática e slides), `indicadores_desempenho`, `avaliacao` (pesos da ementa ou o padrão 30/20/20/30), `situacoes_aprendizagem`, `glossario_ementa` e `referencias`; criar `DOCUMENTACAO/PLANO-AULAS.md` com a tabela das 19 aulas; criar/atualizar os 5 arquivos de status com todas as aulas em ⬜.
- **Critérios de aceitação:** Ementa com 14.800 a 14.950 caracteres; `materia.json` é JSON válido, com C1–C4, S1–S4 e os conhecimentos 1 a 7 completos; o plano das 19 aulas cobre todos os conhecimentos da ementa sem repetir e sem sobrar conteúdo de outra UC; `DOCUMENTACAO/PLANO-AULAS.md` com 19 linhas; 5 status criados.
- **Entrega:** `EMENTA-CHALKIE-AI.md` (14.892 caracteres), `materia.json`, `DOCUMENTACAO/PLANO-AULAS.md` e `STATUS-EMENTAS.md` da matéria; commit desta entrega · **Verificação:** ementa com 14.892 caracteres (alvo 14.800–14.950); `materia.json` válido (node): C1–C4, S1–S4, 7 conhecimentos e 19 aulas; capacidades, função e objetivo conferidos literalmente com a ementa do curso; `PLANO-AULAS.md` com 19 linhas. `STATUS_MATERIA.md` não regerado (o script falha no `bash` do WSL).

### #276.1 — Aula 01 · conteúdo: Princípios de design: definição e evolução histórica

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-01-PRINCIPIOS-DE-DESIGN-DEFINICAO-E-EVOLUCAO-HISTORICA.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 7 e 7.1–7.2, capacidades C3 e socioemocional S1); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (7 e 7.1–7.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.2 — Aula 01 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.1.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 01, Tema "Princípios de design: definição e evolução histórica", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-01-PRINCIPIOS-DE-DESIGN-DEFINICAO-E-EVOLUCAO-HISTORICA.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C3`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 01 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-01-PRINCIPIOS-DE-DESIGN-DEFINICAO-E-EVOLUCAO-HISTORICA.md`; conferir o `.vercelignore`; commit + push

### #276.3 — Aula 01 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.1.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 01, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 1`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 01 · Princípios de design: definição e evolução histórica`, `- **Capacidade:** C3`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.4 — Aula 01 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.3.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.5 — Aula 01 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.4.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-01.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.6 — Aula 01 · gerar páginas e seeds

**Próximo passo:** esperar #276.2 e #276.3.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-01-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-01.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.7 — Aula 01 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.1 a #276.4.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 01 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.8 — Aula 01 · conferência da aula

**Próximo passo:** esperar #276.1 a #276.7.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 01 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-01.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.9 — Aula 02 · conteúdo: Formas geométricas e regras de visualização dos elementos da interface

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.86)
- **Nível:** LEVE — classificado (jev (confiança 0.86))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-02-FORMAS-GEOMETRICAS-E-REGRAS-DE-VISUALIZACAO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 7.3–7.4, capacidades C1 e socioemocional S3); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (7.3–7.4); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.10 — Aula 02 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.9.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-02-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 02, Tema "Formas geométricas e regras de visualização dos elementos da interface", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-02-FORMAS-GEOMETRICAS-E-REGRAS-DE-VISUALIZACAO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C1`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 02 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-02-FORMAS-GEOMETRICAS-E-REGRAS-DE-VISUALIZACAO.md`; conferir o `.vercelignore`; commit + push

### #276.11 — Aula 02 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.9.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 02, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 2`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 02 · Formas geométricas e regras de visualização dos elementos da interface`, `- **Capacidade:** C1`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.12 — Aula 02 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.11.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.13 — Aula 02 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.12.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-02.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.14 — Aula 02 · gerar páginas e seeds

**Próximo passo:** esperar #276.10 e #276.11.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-02-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-02.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.15 — Aula 02 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.9 a #276.12.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 02 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.16 — Aula 02 · conferência da aula

**Próximo passo:** esperar #276.9 a #276.15.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 02 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-02.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.17 — Aula 03 · conteúdo: Teoria das cores na interface

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.85)
- **Nível:** LEVE — classificado (jev (confiança 0.85))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-03-TEORIA-DAS-CORES.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 7.5, capacidades C1 e socioemocional S2); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (7.5); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.18 — Aula 03 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.17.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-03-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 03, Tema "Teoria das cores na interface", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-03-TEORIA-DAS-CORES.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C1`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 03 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-03-TEORIA-DAS-CORES.md`; conferir o `.vercelignore`; commit + push

### #276.19 — Aula 03 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.17.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 03, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 3`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 03 · Teoria das cores na interface`, `- **Capacidade:** C1`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.20 — Aula 03 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.19.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.21 — Aula 03 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.20.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.92)
- **Nível:** LEVE — classificado (jev (confiança 0.92))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-03.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.22 — Aula 03 · gerar páginas e seeds

**Próximo passo:** esperar #276.18 e #276.19.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-03-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-03.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.23 — Aula 03 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.17 a #276.20.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 03 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.24 — Aula 03 · conferência da aula

**Próximo passo:** esperar #276.17 a #276.23.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 03 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-03.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.25 — Aula 04 · conteúdo: Resolução de problemas: análise crítica

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.80)
- **Nível:** LEVE — classificado (jev (confiança 0.80))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-04-RESOLUCAO-DE-PROBLEMAS-ANALISE-CRITICA.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 1 e 1.1, capacidades C3 e socioemocional S2); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (1 e 1.1); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.26 — Aula 04 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.25.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-04-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 04, Tema "Resolução de problemas: análise crítica", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-04-RESOLUCAO-DE-PROBLEMAS-ANALISE-CRITICA.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C3`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 04 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-04-RESOLUCAO-DE-PROBLEMAS-ANALISE-CRITICA.md`; conferir o `.vercelignore`; commit + push

### #276.27 — Aula 04 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.25.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 04, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 4`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 04 · Resolução de problemas: análise crítica`, `- **Capacidade:** C3`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.28 — Aula 04 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.27.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.29 — Aula 04 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.28.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-04.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.30 — Aula 04 · gerar páginas e seeds

**Próximo passo:** esperar #276.26 e #276.27.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-04-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-04.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.31 — Aula 04 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.25 a #276.28.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 04 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.32 — Aula 04 · conferência da aula

**Próximo passo:** esperar #276.25 a #276.31.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 04 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-04.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.33 — Aula 05 · conteúdo: Resolução de problemas: análise de cenários

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.83)
- **Nível:** LEVE — classificado (jev (confiança 0.83))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-05-RESOLUCAO-DE-PROBLEMAS-ANALISE-DE-CENARIOS.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 1.2, capacidades C3 e socioemocional S1); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (1.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.34 — Aula 05 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.33.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-05-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 05, Tema "Resolução de problemas: análise de cenários", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-05-RESOLUCAO-DE-PROBLEMAS-ANALISE-DE-CENARIOS.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C3`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 05 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-05-RESOLUCAO-DE-PROBLEMAS-ANALISE-DE-CENARIOS.md`; conferir o `.vercelignore`; commit + push

### #276.35 — Aula 05 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.33.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 05, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 5`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 05 · Resolução de problemas: análise de cenários`, `- **Capacidade:** C3`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.36 — Aula 05 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.35.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.37 — Aula 05 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.36.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-05.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.38 — Aula 05 · gerar páginas e seeds

**Próximo passo:** esperar #276.34 e #276.35.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-05-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-05.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.39 — Aula 05 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.33 a #276.36.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 05 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.40 — Aula 05 · conferência da aula

**Próximo passo:** esperar #276.33 a #276.39.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 05 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-05.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.41 — Aula 06 · conteúdo: User Interface: definição e tipos de interface

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.80)
- **Nível:** LEVE — classificado (jev (confiança 0.80))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-06-USER-INTERFACE-DEFINICAO-E-TIPOS.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 3, 3.1 e 3.5 (texto, voz, natural), capacidades C3 e socioemocional S4); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (3, 3.1 e 3.5 (texto, voz, natural)); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.42 — Aula 06 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.41.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-06-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 06, Tema "User Interface: definição e tipos de interface", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-06-USER-INTERFACE-DEFINICAO-E-TIPOS.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C3`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 06 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-06-USER-INTERFACE-DEFINICAO-E-TIPOS.md`; conferir o `.vercelignore`; commit + push

### #276.43 — Aula 06 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.41.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 06, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 6`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 06 · User Interface: definição e tipos de interface`, `- **Capacidade:** C3`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.44 — Aula 06 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.43.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.45 — Aula 06 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.44.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-06.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.46 — Aula 06 · gerar páginas e seeds

**Próximo passo:** esperar #276.42 e #276.43.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-06-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-06.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.47 — Aula 06 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.41 a #276.44.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 06 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.48 — Aula 06 · conferência da aula

**Próximo passo:** esperar #276.41 a #276.47.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 06 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-06.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.49 — Aula 07 · conteúdo: Layout: padrões de leitura F e Z e alinhamento

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.83)
- **Nível:** LEVE — classificado (jev (confiança 0.83))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-07-LAYOUT-PADROES-DE-LEITURA-F-E-Z-E-ALINHAMENTO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 3.2.1–3.2.2, capacidades C1 e socioemocional S3); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (3.2.1–3.2.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.50 — Aula 07 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.49.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-07-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 07, Tema "Layout: padrões de leitura F e Z e alinhamento", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-07-LAYOUT-PADROES-DE-LEITURA-F-E-Z-E-ALINHAMENTO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C1`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 07 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-07-LAYOUT-PADROES-DE-LEITURA-F-E-Z-E-ALINHAMENTO.md`; conferir o `.vercelignore`; commit + push

### #276.51 — Aula 07 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.49.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 07, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 7`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 07 · Layout: padrões de leitura F e Z e alinhamento`, `- **Capacidade:** C1`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.52 — Aula 07 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.51.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.53 — Aula 07 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.52.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-07.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.54 — Aula 07 · gerar páginas e seeds

**Próximo passo:** esperar #276.50 e #276.51.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-07-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-07.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.55 — Aula 07 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.49 a #276.52.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 07 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.56 — Aula 07 · conferência da aula

**Próximo passo:** esperar #276.49 a #276.55.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 07 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-07.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.57 — Aula 08 · conteúdo: Layout: tamanho, espaçamento, texturas, fontes e repetição

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-08-LAYOUT-TAMANHO-ESPACAMENTO-TEXTURAS-FONTES-E-REPETICAO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 3.2.3–3.2.7, capacidades C1 e socioemocional S2); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (3.2.3–3.2.7); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.58 — Aula 08 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.57.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-08-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 08, Tema "Layout: tamanho, espaçamento, texturas, fontes e repetição", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-08-LAYOUT-TAMANHO-ESPACAMENTO-TEXTURAS-FONTES-E-REPETICAO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C1`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 08 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-08-LAYOUT-TAMANHO-ESPACAMENTO-TEXTURAS-FONTES-E-REPETICAO.md`; conferir o `.vercelignore`; commit + push

### #276.59 — Aula 08 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.57.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 08, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 8`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 08 · Layout: tamanho, espaçamento, texturas, fontes e repetição`, `- **Capacidade:** C1`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.60 — Aula 08 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.59.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.61 — Aula 08 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.60.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-08.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.62 — Aula 08 · gerar páginas e seeds

**Próximo passo:** esperar #276.58 e #276.59.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-08-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-08.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.63 — Aula 08 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.57 a #276.60.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 08 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.64 — Aula 08 · conferência da aula

**Próximo passo:** esperar #276.57 a #276.63.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 08 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-08.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.65 — Aula 09 · conteúdo: Eventos e navegação na interface

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.80)
- **Nível:** LEVE — classificado (jev (confiança 0.80))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-09-EVENTOS-E-NAVEGACAO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 3.3–3.4, capacidades C2 e socioemocional S1); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (3.3–3.4); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.66 — Aula 09 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.65.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-09-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 09, Tema "Eventos e navegação na interface", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-09-EVENTOS-E-NAVEGACAO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 09 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-09-EVENTOS-E-NAVEGACAO.md`; conferir o `.vercelignore`; commit + push

### #276.67 — Aula 09 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.65.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 09, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 9`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 09 · Eventos e navegação na interface`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.68 — Aula 09 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.67.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.69 — Aula 09 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.68.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-09.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.70 — Aula 09 · gerar páginas e seeds

**Próximo passo:** esperar #276.66 e #276.67.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-09-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-09.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.71 — Aula 09 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.65 a #276.68.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 09 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.72 — Aula 09 · conferência da aula

**Próximo passo:** esperar #276.65 a #276.71.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 09 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-09.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.73 — Aula 10 · conteúdo: User Experience: definição e design centrado no usuário

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.85)
- **Nível:** LEVE — classificado (jev (confiança 0.85))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-10-USER-EXPERIENCE-DEFINICAO-E-DESIGN-CENTRADO-NO-USUARIO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 4, 4.1 e 4.2, capacidades C2 e socioemocional S3); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (4, 4.1 e 4.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.74 — Aula 10 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.73.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-10-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 10, Tema "User Experience: definição e design centrado no usuário", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-10-USER-EXPERIENCE-DEFINICAO-E-DESIGN-CENTRADO-NO-USUARIO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 10 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-10-USER-EXPERIENCE-DEFINICAO-E-DESIGN-CENTRADO-NO-USUARIO.md`; conferir o `.vercelignore`; commit + push

### #276.75 — Aula 10 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.73.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 10, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 10`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 10 · User Experience: definição e design centrado no usuário`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.76 — Aula 10 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.75.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.77 — Aula 10 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.76.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-10.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.78 — Aula 10 · gerar páginas e seeds

**Próximo passo:** esperar #276.74 e #276.75.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-10-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-10.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.79 — Aula 10 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.73 a #276.76.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 10 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.80 — Aula 10 · conferência da aula

**Próximo passo:** esperar #276.73 a #276.79.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 10 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-10.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.81 — Aula 11 · conteúdo: Processo de design interativo

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.86)
- **Nível:** LEVE — classificado (jev (confiança 0.86))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-11-PROCESSO-DE-DESIGN-INTERATIVO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 4.3, capacidades C2 e socioemocional S4); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (4.3); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.82 — Aula 11 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.81.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-11-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 11, Tema "Processo de design interativo", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-11-PROCESSO-DE-DESIGN-INTERATIVO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 11 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-11-PROCESSO-DE-DESIGN-INTERATIVO.md`; conferir o `.vercelignore`; commit + push

### #276.83 — Aula 11 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.81.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-11.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 11, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 11`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 11 · Processo de design interativo`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.84 — Aula 11 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.83.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-11-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.85 — Aula 11 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.84.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-11.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.86 — Aula 11 · gerar páginas e seeds

**Próximo passo:** esperar #276.82 e #276.83.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-11-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-11.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.87 — Aula 11 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.81 a #276.84.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 11 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.88 — Aula 11 · conferência da aula

**Próximo passo:** esperar #276.81 a #276.87.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 11 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-11.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.89 — Aula 12 · conteúdo: Jornada do usuário: objetivos do público-alvo e pesquisa

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-12-JORNADA-DO-USUARIO-OBJETIVOS-E-PESQUISA.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 4.4, 4.4.1 e 4.4.2, capacidades C2 e socioemocional S1); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (4.4, 4.4.1 e 4.4.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.90 — Aula 12 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.89.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-12-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 12, Tema "Jornada do usuário: objetivos do público-alvo e pesquisa", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-12-JORNADA-DO-USUARIO-OBJETIVOS-E-PESQUISA.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 12 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-12-JORNADA-DO-USUARIO-OBJETIVOS-E-PESQUISA.md`; conferir o `.vercelignore`; commit + push

### #276.91 — Aula 12 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.89.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-12.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 12, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 12`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 12 · Jornada do usuário: objetivos do público-alvo e pesquisa`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.92 — Aula 12 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.91.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-12-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.93 — Aula 12 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.92.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-12.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.94 — Aula 12 · gerar páginas e seeds

**Próximo passo:** esperar #276.90 e #276.91.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-12-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-12.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.95 — Aula 12 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.89 a #276.92.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 12 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.96 — Aula 12 · conferência da aula

**Próximo passo:** esperar #276.89 a #276.95.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 12 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-12.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.97 — Aula 13 · conteúdo: Usabilidade: friendly e intuitividade

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-13-USABILIDADE-FRIENDLY-E-INTUITIVIDADE.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 4.5, 4.5.1 e 4.5.2, capacidades C2 e socioemocional S3); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (4.5, 4.5.1 e 4.5.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.98 — Aula 13 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.97.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-13-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 13, Tema "Usabilidade: friendly e intuitividade", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-13-USABILIDADE-FRIENDLY-E-INTUITIVIDADE.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 13 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-13-USABILIDADE-FRIENDLY-E-INTUITIVIDADE.md`; conferir o `.vercelignore`; commit + push

### #276.99 — Aula 13 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.97.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-13.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 13, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 13`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 13 · Usabilidade: friendly e intuitividade`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.100 — Aula 13 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.99.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-13-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.101 — Aula 13 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.100.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-13.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.102 — Aula 13 · gerar páginas e seeds

**Próximo passo:** esperar #276.98 e #276.99.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-13-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-13.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.103 — Aula 13 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.97 a #276.100.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 13 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.104 — Aula 13 · conferência da aula

**Próximo passo:** esperar #276.97 a #276.103.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 13 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-13.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.105 — Aula 14 · conteúdo: Estratégias de coleta de informações: determinação e aplicação

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-14-ESTRATEGIAS-DE-COLETA-DETERMINACAO-E-APLICACAO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 5, 5.1 e 5.2, capacidades C2 e socioemocional S2); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (5, 5.1 e 5.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.106 — Aula 14 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.105.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-14-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 14, Tema "Estratégias de coleta de informações: determinação e aplicação", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-14-ESTRATEGIAS-DE-COLETA-DETERMINACAO-E-APLICACAO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 14 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-14-ESTRATEGIAS-DE-COLETA-DETERMINACAO-E-APLICACAO.md`; conferir o `.vercelignore`; commit + push

### #276.107 — Aula 14 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.105.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-14.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 14, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 14`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 14 · Estratégias de coleta de informações: determinação e aplicação`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.108 — Aula 14 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.107.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-14-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.109 — Aula 14 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.108.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.88)
- **Nível:** LEVE — classificado (jev (confiança 0.88))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-14.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.110 — Aula 14 · gerar páginas e seeds

**Próximo passo:** esperar #276.106 e #276.107.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-14-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-14.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.111 — Aula 14 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.105 a #276.108.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 14 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.112 — Aula 14 · conferência da aula

**Próximo passo:** esperar #276.105 a #276.111.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 14 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-14.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.113 — Aula 15 · conteúdo: Coleta de feedbacks e resolução de conflitos

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-15-COLETA-DE-FEEDBACKS-E-RESOLUCAO-DE-CONFLITOS.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 5.3–5.4, capacidades C2 e socioemocional S3); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (5.3–5.4); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.114 — Aula 15 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.113.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-15-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 15, Tema "Coleta de feedbacks e resolução de conflitos", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-15-COLETA-DE-FEEDBACKS-E-RESOLUCAO-DE-CONFLITOS.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 15 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-15-COLETA-DE-FEEDBACKS-E-RESOLUCAO-DE-CONFLITOS.md`; conferir o `.vercelignore`; commit + push

### #276.115 — Aula 15 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.113.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-15.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 15, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 15`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 15 · Coleta de feedbacks e resolução de conflitos`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.116 — Aula 15 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.115.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-15-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.117 — Aula 15 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.116.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-15.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.118 — Aula 15 · gerar páginas e seeds

**Próximo passo:** esperar #276.114 e #276.115.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-15-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-15.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.119 — Aula 15 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.113 a #276.116.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 15 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.120 — Aula 15 · conferência da aula

**Próximo passo:** esperar #276.113 a #276.119.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 15 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-15.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.121 — Aula 16 · conteúdo: Determinação de escopo do projeto de interface

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-16-DETERMINACAO-DE-ESCOPO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 5.5, capacidades C2 e socioemocional S4); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (5.5); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.122 — Aula 16 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.121.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-16-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 16, Tema "Determinação de escopo do projeto de interface", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-16-DETERMINACAO-DE-ESCOPO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 16 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-16-DETERMINACAO-DE-ESCOPO.md`; conferir o `.vercelignore`; commit + push

### #276.123 — Aula 16 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.121.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-16.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 16, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 16`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 16 · Determinação de escopo do projeto de interface`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.124 — Aula 16 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.123.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-16-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.125 — Aula 16 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.124.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-16.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.126 — Aula 16 · gerar páginas e seeds

**Próximo passo:** esperar #276.122 e #276.123.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-16-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-16.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.127 — Aula 16 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.121 a #276.124.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 16 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.128 — Aula 16 · conferência da aula

**Próximo passo:** esperar #276.121 a #276.127.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 16 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-16.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.129 — Aula 17 · conteúdo: Prototipagem: storyboard e protótipos de papel

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.83)
- **Nível:** LEVE — classificado (jev (confiança 0.83))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-17-PROTOTIPAGEM-STORYBOARD-E-PROTOTIPOS-DE-PAPEL.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 2, 2.1 e 2.2, capacidades C2 e socioemocional S1); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (2, 2.1 e 2.2); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.130 — Aula 17 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.129.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-17-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 17, Tema "Prototipagem: storyboard e protótipos de papel", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-17-PROTOTIPAGEM-STORYBOARD-E-PROTOTIPOS-DE-PAPEL.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 17 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-17-PROTOTIPAGEM-STORYBOARD-E-PROTOTIPOS-DE-PAPEL.md`; conferir o `.vercelignore`; commit + push

### #276.131 — Aula 17 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.129.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-17.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 17, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 17`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 17 · Prototipagem: storyboard e protótipos de papel`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.132 — Aula 17 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.131.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-17-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.133 — Aula 17 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.132.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-17.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.134 — Aula 17 · gerar páginas e seeds

**Próximo passo:** esperar #276.130 e #276.131.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-17-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-17.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.135 — Aula 17 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.129 a #276.132.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 17 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.136 — Aula 17 · conferência da aula

**Próximo passo:** esperar #276.129 a #276.135.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 17 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-17.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.137 — Aula 18 · conteúdo: Mock-ups digitais e processo de criação

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-18-MOCK-UPS-DIGITAIS-E-PROCESSO-DE-CRIACAO.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 2.3 e 7.6, capacidades C2 e socioemocional S4); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (2.3 e 7.6); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.138 — Aula 18 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.137.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-18-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 18, Tema "Mock-ups digitais e processo de criação", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-18-MOCK-UPS-DIGITAIS-E-PROCESSO-DE-CRIACAO.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C2`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 18 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-18-MOCK-UPS-DIGITAIS-E-PROCESSO-DE-CRIACAO.md`; conferir o `.vercelignore`; commit + push

### #276.139 — Aula 18 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.137.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-18.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 18, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 18`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 18 · Mock-ups digitais e processo de criação`, `- **Capacidade:** C2`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.140 — Aula 18 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.139.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-18-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.141 — Aula 18 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.140.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-18.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.142 — Aula 18 · gerar páginas e seeds

**Próximo passo:** esperar #276.138 e #276.139.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-18-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-18.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.143 — Aula 18 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.137 a #276.140.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 18 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.144 — Aula 18 · conferência da aula

**Próximo passo:** esperar #276.137 a #276.143.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 18 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-18.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.145 — Aula 19 · conteúdo: Direito autoral: definição, anterioridade, Creative Commons e registro

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/AULA-19-DIREITO-AUTORAL.md` com as 10 partes da aula de `docs/regras/materias.md` §3, nesta ordem: (1) título e cabeçalho (matéria, curso, 4 h, conhecimentos da ementa 6 e 6.1–6.4, capacidades C4 e socioemocional S2); (2) indicadores do `materia.json`; (3) objetivos; (4) roteiro de 240 min com intervalo; (5) conteúdo em seções numeradas com exemplos, tabelas e imagens citadas quando o tema pedir; (6) exemplo no contexto do curso (desenvolvimento de interfaces); (7) dinâmica (objetivo, materiais, passo a passo, fechamento); (8) situação-problema e entrega; (9) verificação da aprendizagem; (10) recursos e o caminho dos slides entre crases — ⛔ não gerar slides (#244.9). Só o conhecimento desta aula (6 e 6.1–6.4); ⛔ nunca ler PDF nem usar conteúdo de outra UC; contexto "Você, como aluno consultor…", sem empresa fictícia.
- **Critérios de aceitação:** Arquivo com as 10 partes na ordem; roteiro somando 240 min; só os conhecimentos e capacidades desta aula; nenhum conhecimento fora da ementa; slides sem clique enquanto o arquivo não existir; texto em português.
- **Entrega:** — · **Verificação:** conferir contra `docs/regras/materias.md` §3, a ementa e o `materia.json`; commit + push

### #276.146 — Aula 19 · objetiva de 50 questões (fonte + gabarito)

**Próximo passo:** esperar #276.145.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-19-50-QUESTOES.md` no padrão da atividade 01 da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`): cabeçalho com Aula 19, Tema "Direito autoral: definição, anterioridade, Creative Commons e registro", Ícone, Duração 90–120 min, Formato múltipla escolha A–D, Total 50, Pontuação 1 por questão, Capacidade avaliada, Conteúdo-base `../CONTEUDO/AULA-19-DIREITO-AUTORAL.md`, Slides (só o nome, sem clique), Folha de respostas `sim` e Turma; e **exatamente 50 itens** `## ITEM NN — título` com `- **Capacidade:** C4`, contexto quando fizer sentido, comando claro, 4 alternativas plausíveis e de tamanho parecido e `**Gabarito:**` equilibrado (13 A, 13 B, 12 C, 12 D). Todas as questões vêm da aula 19 e do contexto de interfaces e experiência do usuário. Gabarito nunca no site.
- **Critérios de aceitação:** 50 itens; 4 alternativas em cada; gabarito 13/13/12/12; cada questão ligada a um conhecimento da aula; nenhuma questão de outra aula ou de outra UC; contexto de aluno consultor; fonte no Git e fora do site (`.vercelignore`).
- **Entrega:** — · **Verificação:** contar `## ITEM` (50) e as letras do gabarito; conferir a fonte contra a aula `CONTEUDO/AULA-19-DIREITO-AUTORAL.md`; conferir o `.vercelignore`; commit + push

### #276.147 — Aula 19 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #276.145.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-19.md` no padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`), com **20 questões × 3 tópicos** (0,2 + 0,4 + 0,4 = 1 ponto por questão; 20 pontos): cabeçalho com Aula 19, tema, ícone, duração, formato discursivo, capacidade avaliada, `- **Folha de respostas:** sim`, `- **Exportar Meu Gabarito:** sim`, `- **Aula no banco:** 19`, contexto "Você, como aluno consultor…" e o produto da aula; cada item `## ITEM NN — título` com `- **Aula:** 19 · Direito autoral: definição, anterioridade, Creative Commons e registro`, `- **Capacidade:** C4`, **Contexto**, **Comando** e **Tópicos** a) b) c) com pontos. **Sem padrão de resposta neste arquivo** (vai no `-GABARITO.md` do item seguinte).
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 1 por item; contexto do curso; nenhum padrão de resposta na fonte; fonte no Git e fora do site.
- **Entrega:** — · **Verificação:** contar 20 `## ITEM` e 60 tópicos; conferir que não há resposta esperada na fonte; conferir o `.vercelignore`; commit + push

### #276.148 — Aula 19 · gabarito/padrão de resposta da discursiva

**Próximo passo:** esperar #276.147.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-19-GABARITO.md` no padrão da ITIC (`ATIVIDADE-PRATICA-AULA-01-GABARITO.md`): para cada uma das 20 questões, o **padrão de resposta de cada tópico** (o que precisa aparecer) e os **critérios de correção** (certa / meia certa / errada) no formato que a correção por IA usa. No Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 20 questões × 3 tópicos = 60 padrões; critério por tópico; nenhum padrão dentro do HTML ou da fonte pública; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos cobertos contra a fonte; conferir o `.vercelignore`; commit + push

### #276.149 — Aula 19 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #276.148.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-19.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Esse arquivo é a base para a comparação do JEV-AI (#276.163) e para a correção: o aluno nunca lê; só o texto, sem dado pessoal de aluno (LGPD).
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; arquivo no Git e fora do site.
- **Entrega:** — · **Verificação:** conferir a contagem e o formato contra o `-GABARITO.md`; conferir o `.vercelignore`; commit + push

### #276.150 — Aula 19 · gerar páginas e seeds

**Próximo passo:** esperar #276.146 e #276.147.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar a página da objetiva com `python assets/gerador-atividades/gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-19-50-QUESTOES.md` e a página da discursiva com `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-19.md` (esse gerador também grava o seed dos tópicos); conferir nas páginas: 50 itens na objetiva, 20 × 3 tópicos na discursiva, `Folha de respostas: sim`, "📄 Exportar Meu Gabarito", "Progresso da turma" e nenhum gabarito embutido; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md`. ⛔ Não editar HTML gerado à mão.
- **Critérios de aceitação:** Página e seed da objetiva e da discursiva gerados; contagens conferidas; linhas de status atualizadas; nenhum gabarito no HTML do aluno.
- **Entrega:** — · **Verificação:** procurar "Gabarito" no HTML do aluno (não pode existir); conferir as linhas de status; commit + push

### #276.151 — Aula 19 · seeds no banco (aplicar e conferir)

**Próximo passo:** esperar #276.145 a #276.148.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Com os seeds gerados: (1) conferir o seed da aula 19 (se faltar, gerar pelo `scripts/gerar-seed-atividades.py`, cadastrando a matéria no script); (2) aplicar **aula + objetiva + discursiva** no Supabase em partes com `scripts/seeds/dividir_seed.py` e `scripts/seeds/comparar_md5.py`; (3) conferir no banco `aulas` (1 aula), `atividade` (2: objetiva e discursiva), `gabarito` (50) e `topico_discursivo` (60); (4) registrar o seed como **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; (5) conferir o RLS: aluno não lê gabarito nem tópico. ⛔ Banco só pelo Claude Code local; sem banco em nuvem ou outra IA.
- **Critérios de aceitação:** 3 seeds CONCLUÍDO com md5 conferido; ids anotados; atividade ligada à aula certa; aluno sem acesso a gabarito e tópicos.
- **Entrega:** — · **Verificação:** rodar `registrar_seed.py`, consultas de conferência e ler o `SEEDS-APLICADOS.md`; commit + push

### #276.152 — Aula 19 · conferência da aula

**Próximo passo:** esperar #276.145 a #276.151.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir a aula 19 inteira por leitura e marcar a checklist na seção da aula: conteúdo com as 10 partes; objetiva com 50 questões e gabarito 13/13/12/12; discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-19.md` com 3–5 variantes por pergunta; seeds CONCLUÍDO; páginas abrem e não têm gabarito; "Exportar Meu Gabarito" e "Progresso da turma" ligados; `STATUS-AULAS` e `STATUS-ATIVIDADES` com ✅; nenhum slide criado. Corrigir o que faltar na própria subtarefa (marcando a correção) ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #276.153 — Documentação da matéria e exceções

**Próximo passo:** esperar #276.0.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Nível:** LEVE — classificado (jev (confiança 0.97))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/DOCUMENTACAO/README.md` (mapa da matéria: pastas, padrões, links para a ITIC) e `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/DOCUMENTACAO/EXCECOES.md` (exceções desta matéria: discursiva de 20 × 3 em vez de 10 × 3; sem slides; 19 aulas de 4 h); atualizar `STATUS-EMENTAS.md` com a situação real da ementa.
- **Critérios de aceitação:** Os 2 documentos existem, batem com a estrutura real da pasta e não inventam regra nova.
- **Entrega:** — · **Verificação:** leitura contra a pasta e as regras; commit + push

### #276.154 — Índice e menu das atividades

**Próximo passo:** esperar #276.1 a #276.152.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Rodar `python assets/gerador-indices/gerar_indices.py --forcar <pasta ATIVIDADES>` para regerar `ATIVIDADES/index.html` (só HTML, em ordem de data, um card por aula, ON/OFF por atividade, ID na frente) e criar/ajustar `ATIVIDADES/MENU-ATIVIDADES.js` no padrão `window.MENU_ATIVIDADES = { titulo, itens }` (item 👥 Equipes); conferir 19 cards de aula + avaliações e o card da matéria no `index.html` do curso.
- **Critérios de aceitação:** Índice gerado em ordem de data; menu válido (`node --check`); 19 cards de aula; links abrindo.
- **Entrega:** — · **Verificação:** `node --check` no menu, conferir a contagem de cards no índice; commit + push

### #276.155 — Avaliação Objetiva 01 (50 questões) + gabarito

**Próximo passo:** esperar #276.1 a #276.152.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-01-QUESTOES.md` no padrão da ITIC: 50 questões novas com capacidade → contexto → comando, cobrindo as 19 aulas por igual (2 ou 3 questões por aula), 4 alternativas e gabarito 13/13/12/12; cabeçalho com `Aula: AV-01`, `Rótulo da aula: Avaliação Objetiva 01`, `Tema: Aulas 01 a 19`, `Folha de respostas: sim`. Fonte no Git e fora do site.
- **Critérios de aceitação:** 50 questões; cobertura equilibrada das 19 aulas; gabarito 13/13/12/12; fonte fora do site.
- **Entrega:** — · **Verificação:** contar as questões, conferir a cobertura das aulas e o `.vercelignore`; commit + push

### #276.156 — Avaliação Prática (20 questões × 3 tópicos) — fonte

**Próximo passo:** esperar #276.1 a #276.152.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Nível:** LEVE — classificado (jev (confiança 0.82))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA.md` no padrão da ITIC (`AVALIACAO-PRATICA.md`): 20 questões × 3 tópicos (0,1 + 0,2 + 0,2 = 0,5 por questão; 10 pontos), de várias aulas, contexto "Você, como aluno consultor…"; os campos da fonte de discursiva (Folha de respostas, Exportar Meu Gabarito) e **sem padrão de resposta**.
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 0,5 por item; várias aulas; sem gabarito na fonte.
- **Entrega:** — · **Verificação:** contagem; conferir que não há resposta esperada; commit + push

### #276.157 — Avaliação Prática — gabarito/padrão de resposta

**Próximo passo:** esperar #276.156.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-GABARITO.md` com o padrão de resposta e os critérios (certa / meia certa / errada) de cada um dos 60 tópicos da avaliação prática; no Git e fora do site.
- **Critérios de aceitação:** 60 padrões; critério por tópico; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos; `.vercelignore`; commit + push

### #276.158 — Avaliação Prática — respostas prováveis

**Próximo passo:** esperar #276.156 e #276.157.

- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-RESPOSTAS-PROVAVEIS.md` com 3 a 5 respostas prováveis por pergunta (20), marcadas como certa / meia certa / errada, no mesmo formato das demais discursivas; base para a comparação do JEV-AI.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes rotuladas; sem dado pessoal; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato; `.vercelignore`; commit + push

### #276.159 — Seeds das avaliações (aplicar e conferir)

**Próximo passo:** esperar #276.155 a #276.157.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar os seeds da Avaliação Objetiva 01 e da Avaliação Prática, aplicar no Supabase em partes, conferir md5, registrar **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` e conferir no banco `atividade` + `gabarito` (50) + `topico_discursivo` (60) das avaliações. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 2 seeds CONCLUÍDO com md5 conferido; ids anotados; aluno sem acesso ao gabarito.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #276.160 — Páginas das avaliações e média final

**Próximo passo:** esperar #276.159.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Gerar `ATIVIDADES/AVALIACAO-OBJETIVA-01.html` (gerador de atividades), `ATIVIDADES/AVALIACAO-PRATICA.html` (gerador discursivo) e `ATIVIDADES/AVALIACAO-MEDIA-FINAL.html` + `ATIVIDADES/media-final.json` (`python assets/gerador-avaliacao-media-final/gerar_avaliacao_media_final.py <pasta ATIVIDADES>`, usando `--propor` se o `media-final.json` não existir); conferir "Exportar Meu Gabarito" e "Progresso da turma" nas avaliações; atualizar `ATIVIDADES/STATUS-ATIVIDADES.md`.
- **Critérios de aceitação:** Páginas das 2 avaliações e da média final geradas; `media-final.json` válido; linhas de status atualizadas.
- **Entrega:** — · **Verificação:** conferir os arquivos e as linhas de status; commit + push

### #276.161 — Apostila — Markdown completo

**Próximo passo:** esperar #276.1 a #276.152.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/APOSTILA/CONTEUDO/INTRODUCAO.md` e `CAPITULO-01.md` a `CAPITULO-19.md` (um por aula, resumo fiel da aula em `CONTEUDO/`, sem gabarito e sem exercício resolvido) e juntar em `APOSTILA/APOSTILA-FUNDAMENTOS-DE-UI-UX.md`, com identificação (autor, versão, data e hora); conferência 100% com a ementa antes de fechar; atualizar `APOSTILA/STATUS-APOSTILA.md`.
- **Critérios de aceitação:** 19 capítulos + introdução; conteúdo só da ementa e das aulas; sem gabarito; marcação de versão e data; `STATUS-APOSTILA` atualizado.
- **Entrega:** — · **Verificação:** conferir capítulo a capítulo contra a ementa; commit + push

### #276.162 — Apostila — página HTML

**Próximo passo:** esperar #276.161.

- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** Rodar `python assets/gerador-apostilas/gerar_apostila.py <pasta da matéria>` para gerar `APOSTILA/APOSTILA-FUNDAMENTOS-DE-UI-UX.html`; conferir no HTML: cabeçalho, sumário, capítulos, paginação A4, cores/fontes SENAI e nenhum gabarito; atualizar `APOSTILA/STATUS-APOSTILA.md`.
- **Critérios de aceitação:** HTML gerado e completo (19 capítulos); sem gabarito; `STATUS-APOSTILA` atualizado.
- **Entrega:** — · **Verificação:** conferir o HTML por leitura e o status; commit + push

### #276.163 — Análise completa do JEV-AI + revisão dos modelos de cada subtarefa

**Próximo passo:** esperar #276.1 a #276.158.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/DOCUMENTACAO/JEV-AI-ANALISE.md` com 4 partes: (1) como o **JEV-AI** (Jev/TypeSafe — ver `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/JEV-AI/CLAUDE.md`) compara a resposta do aluno com as **respostas prováveis** de cada discursiva (primitiva `Score` por tópico + `Noul` de "cobre o padrão" + `confidence`; limites de confiança para revisão do professor; LGPD: só o texto, sem nome ou dado do aluno; chave só no servidor, nunca no site); (2) **tabela de revisão dos modelos sugeridos em cada subtarefa** (#276.1 a #276.165): nível e modelo indicados, se dá para descer o nível ou trocar por um modelo mais barato (OpenCode `deepseek-flash`/`deepseek-v4-pro`, DeepSeek, Haiku/Flash), conferido com a skill `classificar-tarefa` (matriz 2026-10-18, C35/C37) e com `.claude/rules/niveis.md`; (3) divergências encontradas (só listar — não mudar o nível nem a prioridade no quadro sem o usuário; indicar qual subtarefa corrige); (4) plano B se a chave ou o limite do Jev não existir (comparação manual com as respostas prováveis).
- **Critérios de aceitação:** Documento com as 4 partes; a tabela cobre **todas** as subtarefas #276.1 a #276.165; nenhuma chave no documento; sem dado pessoal; níveis e prioridades não alterados no quadro.
- **Entrega:** — · **Verificação:** conferir a tabela contra o quadro e a matriz de níveis; commit + push

### #276.164 — Conferência final da matéria

**Próximo passo:** esperar #276.154, #276.160, #276.162 e #276.163.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Rodar `python scripts/analise-materias.py` e `python scripts/status-materias/gerar_status_materia.py`; conferir `STATUS_MATERIA.md` = **✅ CONCLUÍDA** (todas as peças), todos os seeds da matéria **CONCLUÍDO**, 19 aulas + 19 objetivas + 19 discursivas + avaliações no banco; varrer o site pelo `.vercelignore` para garantir que nenhum gabarito ou resposta provável é servido; conferir o RLS; registrar os números no quadro.
- **Critérios de aceitação:** `STATUS_MATERIA.md` ✅; zero seed PENDENTE/APLICADO desta matéria; contagens do banco; nenhum gabarito no site; RLS conferido.
- **Entrega:** — · **Verificação:** relatórios dos scripts + consultas no banco; commit + push

### #276.165 — Fechamento: 5 status, visualizador e quadro

**Próximo passo:** esperar #276.164.

- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Descrição:** Conferir os 5 arquivos de status em ✅; rodar `python scripts/regras/gerar_visualizador_regras.py`; fechar a mãe #276 no quadro (todas as subtarefas ✅ ou ⛔ justificadas) e mover as linhas para `tasks/task_complete.md`; atualizar a frente; commit + push.
- **Critérios de aceitação:** 5 status ✅; visualizador regenerado; quadro fechado e coerente; commit + push.
- **Entrega:** — · **Verificação:** conferir o visualizador e o quadro; commit + push

