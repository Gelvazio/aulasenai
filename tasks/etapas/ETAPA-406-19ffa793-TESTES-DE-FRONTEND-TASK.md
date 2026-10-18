## Etapa 406-19ffa793 — TESTES-DE-FRONTEND-TASK: completar o que falta de Testes de Front-End (discursivas de 20, respostas prováveis, avaliações, seeds e JEV-AI)

**Tarefa:** #278-19ffa793-45ce-4e8b-b7d5-55632151f6cf · **Pedido em:** 2026-10-18 18:55 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "crie uma tarefa de nome TESTES-DE-FRONTEND-TASK que faça por completo tudo que falta da matéria TESTES-DE-FRONTEND, use como base a matéria INTRODUCAO-TIC, use 1 atividade objetiva por aula de 50 perguntas, 1 atividade Discursiva de 20 perguntas, crie os seeds do banco de dados, e deixe 1 sub-tarefa pra cada atividade discursiva, que deve gerar as respostas prováveis de cada pergunta, pra depois analisar e comparar com as respostas dos alunos, adicione uma subtask de análise completa do JEV-AI revisando os modelos que foram sugeridos em cada sub-task, crie o máximo de detalhes no máximo possível de sub-tasks pra modelos pequenos que são mais baratos, inclua os modelos do opencode também e deixe ela publicada no quadro."

> 📌 **Caminho:** a pasta real é `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND` (o pedido escreveu "TESTESD-DE-FRONTEND", com um D a mais; não existe pasta com esse nome). O `JEV-AI/` fica dentro dela.

**Objetivo:** completar a matéria **Testes de Front-End** (40 h, 10 aulas) no padrão da **Introdução à TIC**: fechar os furos reais da matéria (seeds pendentes da aula 05, menu, avaliações e média final), levar as 10 discursivas de **10 para 20 questões × 3 tópicos**, criar as **respostas prováveis** de cada pergunta, a **análise completa do JEV-AI** com a revisão dos modelos e a **auditoria** das 10 objetivas de 50 e dos seeds já prontos.

> 🔎 **Levantamento (2026-10-18):** 10 aulas em `CONTEUDO/` ✅; 10 objetivas de 50 ✅ (páginas e fontes); 10 práticas ✅ (10 × 3, fonte + gabarito); apostila ✅; `DOCUMENTACAO/PLANO-AULAS.md` ✅. **Faltas reais:** seeds da **aula 05** não aplicados; `MENU-ATIVIDADES.js` ausente; **avaliações** (objetiva e prática) e **média final** ausentes; discursivas com 10 (não 20); sem respostas prováveis e sem análise do JEV-AI. O `STATUS_MATERIA.md` está defasado (gerado em 2026-10-10) e será regenerado.
> 🚫 **Sem slides** (a IA não gera PDF/PPTX — #244.9). ⛔ Gabarito e respostas prováveis no Git e fora do site.

### Escopo

**Entra:**

- Auditoria por arquivos e no banco; regenerar o `STATUS_MATERIA.md`.
- **Aula 05:** aplicar e conferir os seeds pendentes (objetiva + prática).
- **10 discursivas de 20 questões × 3 tópicos** (20 pontos), expandindo as atuais de 10 × 3: mesma página e mesma atividade no banco, **acrescentando** 10 questões e 30 tópicos.
- **1 arquivo de respostas prováveis por discursiva** (3 a 5 variantes por pergunta).
- Seed novo de cada discursiva, aplicado **acrescentando só os 30 tópicos novos** (nada é apagado) e registrado em `SEEDS-APLICADOS.md`.
- **Avaliações e média final** (faltantes): Avaliação Objetiva 01 (50 questões), Avaliação Prática (20 × 3), `media-final.json` com os **pesos da ementa (60% contínua + 25% prática + 15% objetiva)** e as páginas.
- **`MENU-ATIVIDADES.js`** (faltante).
- **Análise completa do JEV-AI** e revisão dos modelos de cada subtarefa.
- Conferência final, 5 status, visualizador e quadro.

**Não entra:**

- Refazer as 10 objetivas de 50, os seeds já CONCLUÍDO, a apostila e o conteúdo das aulas: eles são **conferidos**, não refeitos.
- Slides (PDF/PPTX) — #244.9; ler PDF; empresa fictícia.
- Apagar ou trocar itens já no banco sem autorização (`seeds.md`: o lote só acrescenta).
- Mudar prioridade ou nível de subtarefa sem pedido; mudar a matriz de modelos.
- Mexer na matéria Banco de Dados (decisão de 2026-10-09 mantida).

### Padrões que toda subtarefa segue

1. **Fonte:** `EMENTA-CHALKIE-AI.md` desta UC + `materia.json` + `CONTEUDO/`. ⛔ Nunca PDF nem outra matéria (a ITIC é só **base de padrão**, não fonte de conteúdo).
2. **Aluno consultor** (2026-10-08): "Você, como aluno consultor…", no contexto de desenvolvimento e teste de interfaces web; sem empresa fictícia.
3. **Gabarito e respostas prováveis:** no Git e **fora do site** (`.vercelignore`); o aluno nunca lê.
4. **Padrão técnico:** nomes em português, sem `<script>`/`<style>` nas páginas, JS/CSS em `assets/`, avisos com `popup.js`, nada de `localStorage` para dado de aluno, nenhuma chave no site.
5. **Sem navegador e sem testes automatizados:** conferir por leitura, `node --check`, geradores e consultas.
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
- A matriz da skill é a de 2026-10-18 (C35/C37); a subtarefa RL-988F933E.1 alinha o `.claude/rules/niveis.md` a ela — até lá vale a matriz da skill.

### Plano das 10 aulas (do `materia.json` — não mudar os temas)

| # | Aula | Capacidades | Objetiva | Discursiva hoje | Discursiva nova |
|---|---|---|---|---|---|
| 01 | Fundamentos de Testes de Software | C1, C2, C3 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 02 | Planejamento, Verificação, Validação e Casos de Teste | C1, C2, C3, S2 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 03 | Testes Unitários no Front-End com Vitest | C5 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 04 | Testes de Integração com DOM usando Testing Library | C4, C5 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 05 | Testes de Integração Avançados e Mock de APIs | C5 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 06 | Testes End-to-End com Cypress e Playwright | C4, C5 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 07 | Métricas e Cobertura de Testes | C3, C4 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 08 | TDD e Debugging Moderno no Front-End | C5, S1 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 09 | Qualidade, Performance, Acessibilidade e CI/CD | C5 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 10 | Projeto Integrador: Suíte de Testes | C1, C2, C3, C4, C5, S1, S2 | 50 questões | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |

### Decisões

- **D1 — 2026-10-18 (criação):** a #22 (etapa 137, "objetivas e práticas das aulas 04 a 10", presa no banco da aula 05 e no aceite) fica **⛔ substituída** por esta tarefa: o que faltava dela (aplicar seeds) está na #278.2 e nas subtarefas de seed de cada aula.
- **D2 — 2026-10-18 (criação):** as 10 objetivas de 50, os seeds já CONCLUÍDO, o conteúdo das aulas e a apostila **não são refeitos** — são auditados.
- **D3 — 2026-10-18 (criação):** a discursiva é a **expansão da prática existente** (mesma página e mesma atividade no banco): mantém as 10 questões/30 tópicos e **acrescenta** 10 questões/30 tópicos; nada é apagado. Se precisar apagar, parar e pedir autorização.
- **D4 — 2026-10-18 (criação):** avaliação e média final seguem a **ementa desta matéria** (60% contínua + 25% prática + 15% objetiva); a objetiva é uma só (a ementa não prevê duas).
- **D5 — 2026-10-18 (criação):** níveis e modelos seguem a skill `classificar-tarefa` (matriz 2026-10-18, C35/C37, com OpenCode e DeepSeek em `PESADO`).
- **D6 — 2026-10-18 (criação):** sem subtarefa de aceite do usuário no fim (a IA finaliza sempre); o professor confere quando quiser.

### Riscos e plano B

| Risco | Chance | Impacto | Plano B |
|---|---|---|---|
| Acrescentar tópicos a atividade que já está no banco | Média | Alto | Seed só com os 30 tópicos novos, sem apagar; conferir md5; exclusão exige autorização |
| Nota mudar de 10 para 20 pontos e afetar a média da turma | Média | Alto | Conferir `media-final.json` (60/25/15) e as notas lançadas; avisar o usuário antes de mexer em peso/nota |
| Conteúdo novo sair da ementa | Baixa | Alto | Conferir cada questão contra a aula e a ementa |
| Gabarito ou respostas prováveis irem para o site | Baixa | Alto | Conferir o `.vercelignore` em cada subtarefa; varredura no fechamento |
| Modelo barato entregar questão fraca | Média | Médio | Conferência por aula (#278.8, #278.14, …) e revisão final (#278.72) |
| Outra sessão reservar a mesma subtarefa | Baixa | Baixo | Reserva com commit + push imediatos; push recusado → sincronizar, reler e desfazer |

### Critério de pronto (a mãe #278 fecha quando)

`STATUS_MATERIA.md` = **✅ CONCLUÍDA**; 10 discursivas com **20 × 3 e 60 tópicos no banco**; 10 arquivos de respostas prováveis; aula 05 no banco; menu, avaliações e média final (60/25/15) prontos; seeds **CONCLUÍDO**; gabaritos e respostas prováveis fora do site; análise do JEV-AI entregue; status, visualizador e quadro em dia; commits + push na `main`.

---
### #278.0 — Auditoria da matéria por arquivos (o que já existe × o que falta)

**Próximo passo:** começar — nada depende dela.

- **Nível:** MEDIO — conferência por leitura dos arquivos da matéria; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a matéria inteira por leitura e registrar na seção: 10 aulas em `CONTEUDO/`, 10 fontes e 10 páginas de objetiva de 50, 10 fontes + `-GABARITO.md` + 10 páginas de prática, apostila MD + HTML, aula 05 com seeds não aplicados, `MENU-ATIVIDADES.js` ausente, avaliações (objetiva e prática) e média final ausentes, `DOCUMENTACAO/PLANO-AULAS.md` presente, `JEV-AI/` presente; conferir os 5 status, o `materia.json` (10 aulas, C1–C5, S1–S2) e a ementa (40 h; avaliação 60% contínua + 25% prática + 15% objetiva); conferir que nenhum gabarito está no HTML do aluno e o `.vercelignore`; listar o que **realmente falta** com a subtarefa dona. Não corrigir nesta subtarefa.
- **Critérios de aceitação:** Lista das peças ✅/⬜ por arquivo, a lista de faltas reais com a subtarefa dona e a conferência do `.vercelignore` registrada.
- **Entrega:** — · **Verificação:** leitura dos status e da pasta; commit + push

### #278.1 — Conferência no banco (só local): seeds, atividades, RLS e STATUS_MATERIA

**Próximo passo:** esperar #278.0.

- **Nível:** PESADO — banco (consultas e conferência de seeds); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Conferir no Supabase os seeds da matéria no `database/SEEDS-APLICADOS.md` (CONCLUÍDO nas aulas 01–04 e 06–10; aulas 05 pendentes), as 10 objetivas (ids 96–98, 143, 153–157) e as 10 práticas (ids 99–101, 144, 158–162), o `gabarito` (50 por objetiva) e o `topico_discursivo` (30 por prática, hoje); conferir o RLS; rodar `python scripts/status-materias/gerar_status_materia.py` para atualizar o `STATUS_MATERIA.md` (o atual é de 2026-10-10 e está defasado) e registrar os números; listar divergências para as subtarefas donas. Nada é alterado de dados nesta subtarefa.
- **Critérios de aceitação:** Relatório com ids e contagens conferidos, `STATUS_MATERIA.md` regenerado e divergências listadas.
- **Entrega:** — · **Verificação:** consultas, `gerar_status_materia.py` e leitura do `SEEDS-APLICADOS.md`; commit + push

### #278.2 — Aula 05: aplicar os seeds pendentes (objetiva e prática) e conferir

**Próximo passo:** esperar #278.1.

- **Nível:** PESADO — banco (aplicar seeds pendentes, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar e conferir pelo md5 os seeds da **aula 05** que estão gerados e não aplicados: `database/2026-10-10-testes-frontend-objetiva-aula-05-seed-atividades.sql` e `database/2026-10-10-testes-frontend-atividade-pratica-aula-05-seed-atividades.sql` (o que faltar da parte 2 da prática); conferir no banco a objetiva (50) e a prática (30 tópicos); registrar **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` com os ids; conferir o RLS. ⛔ Banco só pelo Claude Code local; se precisar apagar ou trocar item, parar e pedir autorização.
- **Critérios de aceitação:** Seeds da aula 05 CONCLUÍDO com md5; objetiva e prática no banco; ids anotados.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.3 — Aula 01 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 1` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-01-FUNDAMENTOS-DE-TESTES-DE-SOFTWARE.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.4 — Aula 01 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.3.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.5 — Aula 01 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.4.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-01.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.6 — Aula 01 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.3.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-01.md` para regerar `ATIVIDADE-PRATICA-AULA-01.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.7 — Aula 01 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.6.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 01 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.8 — Aula 01 · conferência da aula

**Próximo passo:** esperar #278.3 a #278.7.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 01 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-01.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.9 — Aula 02 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 2` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-02-PLANEJAMENTO-VERIFICACAO-VALIDACAO-E-CASOS-DE-TESTE.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.10 — Aula 02 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.9.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.11 — Aula 02 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.10.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-02.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.12 — Aula 02 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.9.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-02.md` para regerar `ATIVIDADE-PRATICA-AULA-02.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.13 — Aula 02 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.12.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 02 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.14 — Aula 02 · conferência da aula

**Próximo passo:** esperar #278.9 a #278.13.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 02 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-02.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.15 — Aula 03 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 3` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-03-TESTES-UNITARIOS-COM-VITEST.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.16 — Aula 03 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.15.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.17 — Aula 03 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.16.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-03.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.18 — Aula 03 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.15.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-03.md` para regerar `ATIVIDADE-PRATICA-AULA-03.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.19 — Aula 03 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.18.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 03 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.20 — Aula 03 · conferência da aula

**Próximo passo:** esperar #278.15 a #278.19.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 03 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-03.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.21 — Aula 04 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 4` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.22 — Aula 04 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.21.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.23 — Aula 04 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.22.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-04.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.24 — Aula 04 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.21.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-04.md` para regerar `ATIVIDADE-PRATICA-AULA-04.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.25 — Aula 04 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.24.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 04 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.26 — Aula 04 · conferência da aula

**Próximo passo:** esperar #278.21 a #278.25.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 04 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-04.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.27 — Aula 05 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 5` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-05-INTEGRACAO-AVANCADA-E-MOCK-DE-APIS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.28 — Aula 05 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.27.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.29 — Aula 05 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.28.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-05.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.30 — Aula 05 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.27.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-05.md` para regerar `ATIVIDADE-PRATICA-AULA-05.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.31 — Aula 05 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.30.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 05 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.32 — Aula 05 · conferência da aula

**Próximo passo:** esperar #278.27 a #278.31.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 05 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-05.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.33 — Aula 06 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 6` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-06-TESTES-END-TO-END-COM-CYPRESS-E-PLAYWRIGHT.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.34 — Aula 06 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.33.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.35 — Aula 06 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.34.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-06.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.36 — Aula 06 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.33.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-06.md` para regerar `ATIVIDADE-PRATICA-AULA-06.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.37 — Aula 06 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.36.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 06 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.38 — Aula 06 · conferência da aula

**Próximo passo:** esperar #278.33 a #278.37.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 06 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-06.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.39 — Aula 07 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 7` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-07-METRICAS-E-COBERTURA-DE-TESTES.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.40 — Aula 07 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.39.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.41 — Aula 07 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.40.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-07.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.42 — Aula 07 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.39.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-07.md` para regerar `ATIVIDADE-PRATICA-AULA-07.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.43 — Aula 07 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.42.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 07 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.44 — Aula 07 · conferência da aula

**Próximo passo:** esperar #278.39 a #278.43.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 07 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-07.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.45 — Aula 08 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 8` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-08-TDD-E-DEBUGGING-NO-FRONT-END.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.46 — Aula 08 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.45.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.47 — Aula 08 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.46.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-08.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.48 — Aula 08 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.45.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-08.md` para regerar `ATIVIDADE-PRATICA-AULA-08.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.49 — Aula 08 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.48.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 08 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.50 — Aula 08 · conferência da aula

**Próximo passo:** esperar #278.45 a #278.49.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 08 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-08.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.51 — Aula 09 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 9` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-09-QUALIDADE-PERFORMANCE-ACESSIBILIDADE-E-CI-CD.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.52 — Aula 09 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.51.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.53 — Aula 09 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.52.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-09.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.54 — Aula 09 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.51.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-09.md` para regerar `ATIVIDADE-PRATICA-AULA-09.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.55 — Aula 09 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.54.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 09 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.56 — Aula 09 · conferência da aula

**Próximo passo:** esperar #278.51 a #278.55.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 09 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-09.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.57 — Aula 10 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #278.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a cobertura da aula e o contexto "Você, como aluno consultor…"; manter `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 10` e os demais campos. **Sem padrão de resposta nesta fonte.** Conteúdo da aula: `CONTEUDO/AULA-10-PROJETO-INTEGRADOR-SUITE-DE-TESTES.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura atualizada sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #278.58 — Aula 10 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #278.57.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #278.59 — Aula 10 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #278.58.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-10.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#278.71) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #278.60 — Aula 10 · regenerar página e seed da discursiva

**Próximo passo:** esperar #278.57.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-10.md` para regerar `ATIVIDADE-PRATICA-AULA-10.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #278.61 — Aula 10 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #278.60.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 10 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes: comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.62 — Aula 10 · conferência da aula

**Próximo passo:** esperar #278.57 a #278.61.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 10 e marcar a checklist na seção da aula: objetiva de 50 existente conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-10.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #278.63 — Avaliação Objetiva 01 (50 questões) + gabarito

**Próximo passo:** esperar #278.0.

- **Nível:** PESADO — contém o gabarito da avaliação
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-01-QUESTOES.md` no padrão da ITIC: 50 questões novas com capacidade → contexto → comando, cobrindo as 10 aulas por igual (5 por aula), 4 alternativas e gabarito 13/13/12/12; cabeçalho com `Aula: AV-01`, `Rótulo da aula: Avaliação Objetiva 01`, `Tema: Aulas 01 a 10`, `Folha de respostas: sim`; pesos da ementa (avaliação objetiva 15%, aula 10). Fonte no Git e fora do site.
- **Critérios de aceitação:** 50 questões; cobertura equilibrada das 10 aulas; gabarito 13/13/12/12; fonte fora do site.
- **Entrega:** — · **Verificação:** contar as questões, conferir a cobertura e o `.vercelignore`; commit + push

### #278.64 — Avaliação Prática (20 questões × 3 tópicos) — fonte

**Próximo passo:** esperar #278.0.

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA.md` no padrão da ITIC: 20 questões × 3 tópicos (0,1 + 0,2 + 0,2 = 0,5 por questão; 10 pontos; peso 25% da ementa), de várias aulas, suíte de testes para uma aplicação fornecida (unitários, integração, E2E, cobertura e CI), contexto "Você, como aluno consultor…"; campos da fonte de discursiva (Folha de respostas, Exportar Meu Gabarito) e **sem padrão de resposta**.
- **Critérios de aceitação:** 20 itens × 3 tópicos; pontos somando 0,5 por item; várias aulas; sem gabarito na fonte.
- **Entrega:** — · **Verificação:** contagem; conferir que não há resposta esperada; commit + push

### #278.65 — Avaliação Prática — gabarito/padrão de resposta

**Próximo passo:** esperar #278.64.

- **Nível:** PESADO — é o gabarito/padrão de resposta da avaliação
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-GABARITO.md` com o padrão de resposta e os critérios (certa / meia certa / errada) de cada um dos 60 tópicos da avaliação prática; no Git e fora do site.
- **Critérios de aceitação:** 60 padrões; critério por tópico; arquivo fora do site.
- **Entrega:** — · **Verificação:** conferir 60 tópicos; `.vercelignore`; commit + push

### #278.66 — Avaliação Prática — respostas prováveis

**Próximo passo:** esperar #278.64 e #278.65.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-RESPOSTAS-PROVAVEIS.md` com 3 a 5 respostas prováveis por pergunta (20), marcadas como certa / meia certa / errada, no mesmo formato das demais discursivas; base para a comparação do JEV-AI.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes rotuladas; sem dado pessoal; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato; `.vercelignore`; commit + push

### #278.67 — Menu das atividades (`MENU-ATIVIDADES.js`)

**Próximo passo:** esperar #278.0.

- **Nível:** MEDIO — 1 arquivo JS de menu; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/MENU-ATIVIDADES.js` no padrão (`window.MENU_ATIVIDADES = { titulo, itens }`, item 👥 Equipes) e ligar no índice das atividades; conferir que as páginas do índice continuam abrindo.
- **Critérios de aceitação:** Arquivo criado, `node --check` sem erro e o índice usando o menu.
- **Entrega:** — · **Verificação:** `node --check`; conferir o índice; commit + push

### #278.68 — Seeds das avaliações (objetiva e prática) — aplicar e conferir

**Próximo passo:** esperar #278.63 a #278.65.

- **Nível:** PESADO — banco (seeds das avaliações); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Gerar os seeds da Avaliação Objetiva 01 e da Avaliação Prática, aplicar no Supabase em partes, conferir md5, registrar **CONCLUÍDO** em `database/SEEDS-APLICADOS.md` e conferir no banco `atividade` + `gabarito` (50) + `topico_discursivo` (60) das avaliações. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 2 seeds CONCLUÍDO com md5; ids anotados; aluno sem acesso ao gabarito.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas; commit + push

### #278.69 — Páginas das avaliações e média final (pesos da ementa)

**Próximo passo:** esperar #278.68.

- **Nível:** MEDIO — rodar os geradores e conferir as páginas
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Gerar `ATIVIDADES/AVALIACAO-OBJETIVA-01.html` (gerador de atividades), `ATIVIDADES/AVALIACAO-PRATICA.html` (gerador discursivo) e `ATIVIDADES/AVALIACAO-MEDIA-FINAL.html` + `ATIVIDADES/media-final.json` com os **pesos da ementa desta matéria** (60% avaliação contínua das aulas 1–9 e SAs 1 e 2 · 25% avaliação prática · 15% avaliação objetiva), usando `python assets/gerador-avaliacao-media-final/gerar_avaliacao_media_final.py <pasta ATIVIDADES>`; conferir "Exportar Meu Gabarito" e "Progresso da turma"; atualizar `ATIVIDADES/STATUS-ATIVIDADES.md`.
- **Critérios de aceitação:** Páginas das avaliações e da média final geradas; `media-final.json` com 60/25/15; linhas de status atualizadas.
- **Entrega:** — · **Verificação:** conferir os arquivos, os pesos e as linhas de status; commit + push

### #278.70 — Documentação da matéria e do padrão novo

**Próximo passo:** esperar #278.0.

- **Nível:** LEVE — só `.md` (documentação da matéria)
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash
- **Descrição:** Criar/atualizar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/DOCUMENTACAO/README.md` (mapa da matéria: pastas, padrões, links para a ITIC) e `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/DOCUMENTACAO/EXCECOES.md` (padrão novo: discursiva de 20 × 3 em vez de 10 × 3; respostas prováveis por discursiva; avaliação 60/25/15 da ementa; apostila e objetivas existentes só auditadas, não refeitas); registrar a diferença de grafia do caminho (a pasta real é `TESTES-DE-FRONTEND`).
- **Critérios de aceitação:** Os 2 documentos existem, batem com a estrutura real e não inventam regra.
- **Entrega:** — · **Verificação:** leitura contra a pasta e as regras; commit + push

### #278.71 — Análise completa do JEV-AI + revisão dos modelos de cada subtarefa

**Próximo passo:** esperar #278.3 a #278.66.

- **Nível:** MEDIO — documento de análise (1 `.md`); sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/DOCUMENTACAO/JEV-AI-ANALISE.md` com 4 partes: (1) como o **JEV-AI** (Jev/TypeSafe — ver `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/JEV-AI/CLAUDE.md`) compara a resposta do aluno com as **respostas prováveis** de cada discursiva (primitiva `Score` por tópico + `Noul` de "cobre o padrão" + `confidence`; limites de confiança para revisão do professor; LGPD: só o texto, sem nome ou dado do aluno; chave só no servidor); (2) **tabela de revisão dos modelos sugeridos em cada subtarefa** (#278.0 a #278.73): nível e modelo indicados, se dá para descer o nível ou trocar por um modelo mais barato (OpenCode `deepseek-flash`/`deepseek-v4-pro`, DeepSeek, Haiku/Flash), conferido com a skill `classificar-tarefa` (matriz 2026-10-18, C35/C37) e com `.claude/rules/niveis.md`; (3) divergências encontradas (só listar — não mudar nível nem prioridade no quadro sem o usuário; indicar a subtarefa que corrige); (4) plano B se a chave ou o limite do Jev não existir (comparação manual com as respostas prováveis).
- **Critérios de aceitação:** Documento com as 4 partes; a tabela cobre **todas** as subtarefas; nenhuma chave no documento; sem dado pessoal; níveis e prioridades não alterados no quadro.
- **Entrega:** — · **Verificação:** conferir a tabela contra o quadro e a matriz de níveis; commit + push

### #278.72 — Conferência final da matéria

**Próximo passo:** esperar #278.67, #278.69, #278.70 e #278.71.

- **Nível:** PESADO — banco (conferência com consultas); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Rodar `python scripts/analise-materias.py` e `python scripts/status-materias/gerar_status_materia.py`; conferir `STATUS_MATERIA.md` = **🔄 PENDENTE → ✅ CONCLUÍDA** (todas as peças: MENU, avaliações, média final, apostila, 10 aulas com objetiva e discursiva, seeds), os seeds da matéria **CONCLUÍDO**, as 10 discursivas com 60 tópicos no banco; varrer o site pelo `.vercelignore` para garantir que nenhum gabarito nem resposta provável é servido; conferir o RLS; registrar os números no quadro.
- **Critérios de aceitação:** `STATUS_MATERIA.md` ✅; zero seed pendente da matéria; 10 discursivas com 60 tópicos; nenhum gabarito no site; RLS conferido.
- **Entrega:** — · **Verificação:** relatórios dos scripts + consultas no banco; commit + push

### #278.73 — Fechamento: status, visualizador e quadro

**Próximo passo:** esperar #278.72.

- **Nível:** LEVE — só quadro, visualizador e `.md`
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash
- **Descrição:** Conferir os 5 status da matéria em ✅; rodar `python scripts/regras/gerar_visualizador_regras.py`; fechar a mãe #278 no quadro (subtarefas ✅ ou ⛔ justificadas) e mover as linhas para `tasks/task_complete.md`; atualizar a frente; commit + push.
- **Critérios de aceitação:** Status ✅; visualizador regenerado; quadro fechado e coerente; commit + push.
- **Entrega:** — · **Verificação:** conferir o visualizador e o quadro; commit + push

