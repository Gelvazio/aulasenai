## Etapa 405-875934f9 — BANCO-DADOS-TASK: completar o que falta de Banco de Dados (discursivas de 20, respostas prováveis, JEV-AI e auditoria)

**Tarefa:** #277-875934f9-d9d0-49fa-be37-d9bc31feb8a5 · **Pedido em:** 2026-10-18 17:05 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "crie uma tarefa de nome BANCO-DADOS-TASK que faça por completo tudo que falta da matéria BANCO-DE-DADOS, use como base a matéria INTRODUCAO-TIC, use 1 atividade objetiva por aula de 50 perguntas, 1 atividade Discursiva de 20 perguntas, crie os seeds do banco de dados, e deixe 1 sub-tarefa pra cada atividade discursiva, que deve gerar as respostas prováveis de cada pergunta, pra depois analisar e comparar com as respostas dos alunos, adicione uma subtask de análise completa do JEV-AI revisando os modelos que foram sugeridos em cada sub-task, crie o maximo de detalhes no maximo possivel de sub-tasks pra modelos pequenos que sao mais baratos, inclua os modelos do opencode tambem e deixe ela publicada no quadro."
**Objetivo:** completar a matéria **Banco de Dados** (80 h, 20 aulas) no padrão da **Introdução à TIC**, entregando o que ainda falta: **discursiva de 20 questões × 3 tópicos em cada aula** (as atuais têm 10), **respostas prováveis de cada pergunta**, **análise completa do JEV-AI** com a revisão dos modelos de cada subtarefa e a **auditoria da matéria**.

> ✅ **A matéria já está 100% pelo `STATUS_MATERIA.md`** (154/154 peças, gerado em 2026-10-16): 20 aulas, 20 objetivas de 50, 20 práticas de 10 × 3, seeds CONCLUÍDO, apostila e avaliações. **O que falta é o padrão novo pedido nesta data:** discursiva de **20** (as atuais têm 10), **respostas prováveis** por discursiva, **análise do JEV-AI** e a auditoria que prova que o resto está certo.
> 🚫 **Sem slides** (#244.9). ⛔ Gabarito e respostas prováveis ficam no Git e fora do site.

### Escopo

**Entra:**

- Auditoria por arquivos e no banco (o que já existe × o que falta): 154 peças, seeds, RLS.
- **20 discursivas de 20 questões × 3 tópicos** (1 ponto por questão, 20 pontos), expandindo as práticas atuais de 10 × 3: mesma página e mesma atividade no banco, **acrescentando** 10 questões e 30 tópicos.
- **1 arquivo de respostas prováveis por discursiva** (3 a 5 variantes por pergunta).
- Seed novo de cada discursiva, aplicado **acrescentando só os 30 tópicos novos** (nada é apagado) e registrado em `SEEDS-APLICADOS.md`.
- **Análise completa do JEV-AI** e revisão dos modelos sugeridos em cada subtarefa.
- Conferência final da matéria, status, visualizador e quadro.

**Não entra:**

- Refazer as 20 objetivas de 50, os seeds antigos, a apostila e as avaliações: eles já estão prontos e são **conferidos**, não refeitos.
- Slides (PDF/PPTX) — regra #244.9; ler PDF; empresa fictícia.
- Apagar ou trocar itens já no banco sem autorização do usuário (`seeds.md`: o lote só acrescenta).
- Mudar prioridade ou nível de subtarefa sem pedido; mudar a matriz de modelos.

### Padrões que toda subtarefa segue

1. **Fonte:** `EMENTA-CHALKIE-AI.md` + `materia.json` + `CONTEUDO/` desta matéria. ⛔ Nunca PDF nem outra matéria (a ITIC é só **base de padrão**, não fonte de conteúdo).
2. **Aluno consultor** (2026-10-08): "Você, como aluno consultor…", no contexto de sistemas web e banco de dados; sem empresa fictícia.
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

### Plano das 20 aulas (do `materia.json` — não mudar os temas)

| # | Aula | Capacidades | Discursiva hoje | Discursiva nova |
|---|---|---|---|---|
| 01 | Banco de dados e SGBD: conceitos e usos | C4, C9 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 02 | Gerenciadores: características, requisitos e níveis | C4, C6, C9 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 03 | Preparação do ambiente: instalação do PostgreSQL | C10, C11 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 04 | Configuração do SGBD e infraestrutura do sistema | C5, C10, C11 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 05 | Demandas do cliente e escopo do projeto | C1, S2 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 06 | Entidades fortes, fracas e associativas | C2 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 07 | Atributos | C2 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 08 | Relacionamentos 1:1, 1:N e N:N | C2 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 09 | Diagrama entidade-relacionamento | C2, S1 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 10 | Normalização de dados (1FN, 2FN e 3FN) | C3, S2 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 11 | Padronização de dados, cronograma e fluxograma | C1, C3 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 12 | DDL: tabelas e campos | C7 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 13 | DDL: relações, chaves e restrições | C7 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 14 | DML: inserção, atualização e exclusão | C8 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 15 | DML: consultas com filtros e ordenação | C8 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 16 | Consultas com junções, agrupamentos e subconsultas | C8 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 17 | Procedimentos armazenados | C8 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 18 | Triggers (disparadores) | C8 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 19 | Segurança da informação: pilares, acesso e auditoria | C12, C13, C14 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |
| 20 | Projeto integrador: banco documentado para o back-end | C1, C2, C3, C7, C8, C14, S1, S2 | 10 × 3 (10 pontos) | **20 × 3 (20 pontos)** |

### Decisões

- **D1 — 2026-10-18 (criação):** a matéria já está 100% pelo padrão antigo; esta tarefa **não refaz** as 20 objetivas de 50, os seeds antigos, a apostila e as avaliações — ela audita e completa o padrão novo: discursiva de 20, respostas prováveis e análise do JEV-AI.
- **D2 — 2026-10-18 (criação):** a discursiva é a **expansão da prática existente** (mesma página `ATIVIDADE-PRATICA-AULA-NN.html` e mesma atividade no banco): mantém as 10 questões/30 tópicos atuais e **acrescenta** 10 questões/30 tópicos; nada é apagado. Se algum ajuste exigir apagar, parar e pedir autorização.
- **D3 — 2026-10-18 (criação):** níveis e modelos seguem a skill `classificar-tarefa` (matriz 2026-10-18, C35/C37, com OpenCode e DeepSeek em `PESADO`).
- **D4 — 2026-10-18 (criação):** as respostas prováveis ficam em arquivo próprio (`RESPOSTAS-PROVAVEIS-AULA-NN.md`), fora do site, e alimentam a comparação do JEV-AI (#277.123); o padrão oficial continua no `-GABARITO.md`.
- **D5 — 2026-10-18 (criação):** sem subtarefa de aceite do usuário no fim (ciclo da task: a IA finaliza sempre); o professor confere quando quiser.

### Riscos e plano B

| Risco | Chance | Impacto | Plano B |
|---|---|---|---|
| Acrescentar tópicos a uma atividade que já está no banco | Média | Alto | Seed só com os 30 tópicos novos, sem apagar; conferir md5; qualquer exclusão exige autorização do usuário |
| Nota mudar de 10 para 20 pontos e afetar a média da turma | Média | Alto | Conferir `media-final.json` e as notas lançadas; avisar o usuário antes de mexer em peso/nota |
| Conteúdo novo sair da ementa | Baixa | Alto | Conferir cada questão contra a aula e a ementa antes de gerar |
| Gabarito ou respostas prováveis irem para o site | Baixa | Alto | Conferir o `.vercelignore` em cada subtarefa; varredura no fechamento |
| Modelo barato entregar questão fraca | Média | Médio | Conferência por aula (#277.7, #277.13, …) e revisão final (#277.124) |
| Outra sessão reservar a mesma subtarefa | Baixa | Baixo | Reserva com commit + push imediatos; push recusado → sincronizar, reler o quadro e desfazer |

### Critério de pronto (a mãe #277 fecha quando)

`STATUS_MATERIA.md` = **✅ CONCLUÍDA**; as 20 discursivas com **20 × 3 e 60 tópicos no banco**; 20 arquivos de respostas prováveis; seeds **CONCLUÍDO**; gabaritos e respostas prováveis fora do site; análise do JEV-AI entregue; status, visualizador e quadro em dia; commits + push na `main`.

---
### #277.0 — Auditoria da matéria por arquivos (o que já existe × o que falta)

**Próximo passo:** começar — nada depende dela.

- **Nível:** MEDIO — conferência por leitura dos arquivos da matéria; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a matéria inteira por leitura e escrever o resultado na seção: as 154 peças do `STATUS_MATERIA.md` (20 aulas em `CONTEUDO/`, 20 fontes de objetiva de 50, 20 páginas de objetiva, 20 fontes de prática + `-GABARITO.md`, 20 páginas de prática, apostila MD + HTML, avaliações, média final, índice e menu); os 5 arquivos de status; o `materia.json` (20 aulas, C1–C14 e S1–S2) e a ementa; conferir que nenhum gabarito está no HTML servido ao aluno; listar o que **realmente falta** — esperado: só o padrão novo (discursiva de 20, respostas prováveis, análise JEV-AI) e qualquer furo encontrado. Não corrigir nesta subtarefa: só listar com a subtarefa dona.
- **Critérios de aceitação:** Lista com as 154 peças ✅/⬜, a lista de faltas reais e nenhuma correção feita; conferência do `.vercelignore` registrada.
- **Entrega:** — · **Verificação:** leitura dos arquivos de status e da pasta; commit + push

### #277.1 — Conferência no banco (só local): seeds, atividades e RLS

**Próximo passo:** esperar #277.0.

- **Nível:** PESADO — banco (consultas e conferência de seeds); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Conferir no Supabase: os seeds da matéria no `database/SEEDS-APLICADOS.md` (CONCLUÍDO), as 20 aulas (ids 96 a 125) com a objetiva de 50 (ids 103 a 145) e a prática (ids 104 a 146), as 2 avaliações objetivas (147 e 148), a avaliação prática (149) e a média final; conferir `gabarito` (50 por aula) e `topico_discursivo` (30 por prática, hoje); conferir o RLS: aluno não lê gabarito nem tópico; listar divergências para as subtarefas donas.
- **Critérios de aceitação:** Relatório com ids conferidos, contagens e divergências; nada alterado nesta subtarefa.
- **Entrega:** — · **Verificação:** consultas e leitura do `SEEDS-APLICADOS.md`; commit + push

### #277.2 — Aula 01 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 1` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-01-BANCO-DE-DADOS-E-SGBD.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.3 — Aula 01 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.2.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.4 — Aula 01 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.3.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-01.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.5 — Aula 01 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.2.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-01.md` para regerar `ATIVIDADE-PRATICA-AULA-01.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.6 — Aula 01 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.5.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 01 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.7 — Aula 01 · conferência da aula

**Próximo passo:** esperar #277.2 a #277.6.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 01 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-01.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.8 — Aula 02 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 2` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-02-GERENCIADORES-CARACTERISTICAS-REQUISITOS-E-NIVEIS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.9 — Aula 02 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.8.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.10 — Aula 02 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.9.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-02.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.11 — Aula 02 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.8.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-02.md` para regerar `ATIVIDADE-PRATICA-AULA-02.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.12 — Aula 02 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.11.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 02 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.13 — Aula 02 · conferência da aula

**Próximo passo:** esperar #277.8 a #277.12.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 02 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-02.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.14 — Aula 03 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 3` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-03-PREPARACAO-DO-AMBIENTE-INSTALACAO-DO-POSTGRESQL.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.15 — Aula 03 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.14.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.16 — Aula 03 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.15.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-03.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.17 — Aula 03 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.14.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-03.md` para regerar `ATIVIDADE-PRATICA-AULA-03.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.18 — Aula 03 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.17.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 03 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.19 — Aula 03 · conferência da aula

**Próximo passo:** esperar #277.14 a #277.18.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 03 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-03.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.20 — Aula 04 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 4` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-04-CONFIGURACAO-DO-SGBD-E-INFRAESTRUTURA.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.21 — Aula 04 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.20.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.22 — Aula 04 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.21.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-04.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.23 — Aula 04 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.20.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-04.md` para regerar `ATIVIDADE-PRATICA-AULA-04.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.24 — Aula 04 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.23.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 04 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.25 — Aula 04 · conferência da aula

**Próximo passo:** esperar #277.20 a #277.24.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 04 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-04.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.26 — Aula 05 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 5` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-05-DEMANDAS-DO-CLIENTE-E-ESCOPO-DO-PROJETO.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.27 — Aula 05 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.26.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.28 — Aula 05 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.27.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-05.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.29 — Aula 05 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.26.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-05.md` para regerar `ATIVIDADE-PRATICA-AULA-05.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.30 — Aula 05 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.29.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 05 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.31 — Aula 05 · conferência da aula

**Próximo passo:** esperar #277.26 a #277.30.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 05 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-05.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.32 — Aula 06 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 6` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-06-ENTIDADES-FORTES-FRACAS-E-ASSOCIATIVAS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.33 — Aula 06 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.32.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.34 — Aula 06 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.33.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-06.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.35 — Aula 06 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.32.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-06.md` para regerar `ATIVIDADE-PRATICA-AULA-06.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.36 — Aula 06 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.35.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 06 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.37 — Aula 06 · conferência da aula

**Próximo passo:** esperar #277.32 a #277.36.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 06 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-06.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.38 — Aula 07 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 7` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-07-ATRIBUTOS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.39 — Aula 07 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.38.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.40 — Aula 07 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.39.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-07.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.41 — Aula 07 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.38.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-07.md` para regerar `ATIVIDADE-PRATICA-AULA-07.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.42 — Aula 07 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.41.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 07 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.43 — Aula 07 · conferência da aula

**Próximo passo:** esperar #277.38 a #277.42.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 07 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-07.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.44 — Aula 08 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 8` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-08-RELACIONAMENTOS-1-1-1-N-E-N-N.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.45 — Aula 08 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.44.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.46 — Aula 08 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.45.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-08.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.47 — Aula 08 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.44.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-08.md` para regerar `ATIVIDADE-PRATICA-AULA-08.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.48 — Aula 08 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.47.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 08 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.49 — Aula 08 · conferência da aula

**Próximo passo:** esperar #277.44 a #277.48.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 08 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-08.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.50 — Aula 09 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 9` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-09-DIAGRAMA-ENTIDADE-RELACIONAMENTO.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.51 — Aula 09 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.50.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.52 — Aula 09 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.51.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-09.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.53 — Aula 09 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.50.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-09.md` para regerar `ATIVIDADE-PRATICA-AULA-09.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.54 — Aula 09 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.53.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 09 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.55 — Aula 09 · conferência da aula

**Próximo passo:** esperar #277.50 a #277.54.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 09 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-09.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.56 — Aula 10 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 10` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-10-NORMALIZACAO-DE-DADOS-1FN-2FN-3FN.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.57 — Aula 10 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.56.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.58 — Aula 10 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.57.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-10.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.59 — Aula 10 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.56.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-10.md` para regerar `ATIVIDADE-PRATICA-AULA-10.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.60 — Aula 10 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.59.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 10 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.61 — Aula 10 · conferência da aula

**Próximo passo:** esperar #277.56 a #277.60.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 10 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-10.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.62 — Aula 11 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-11.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 11` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-11-PADRONIZACAO-DE-DADOS-CRONOGRAMA-E-FLUXOGRAMA.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.63 — Aula 11 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.62.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-11-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.64 — Aula 11 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.63.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-11.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.65 — Aula 11 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.62.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-11.md` para regerar `ATIVIDADE-PRATICA-AULA-11.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.66 — Aula 11 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.65.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 11 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.67 — Aula 11 · conferência da aula

**Próximo passo:** esperar #277.62 a #277.66.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 11 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-11.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.68 — Aula 12 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-12.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 12` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-12-DDL-TABELAS-E-CAMPOS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.69 — Aula 12 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.68.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-12-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.70 — Aula 12 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.69.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-12.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.71 — Aula 12 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.68.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-12.md` para regerar `ATIVIDADE-PRATICA-AULA-12.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.72 — Aula 12 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.71.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 12 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.73 — Aula 12 · conferência da aula

**Próximo passo:** esperar #277.68 a #277.72.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 12 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-12.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.74 — Aula 13 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-13.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 13` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-13-DDL-RELACOES-CHAVES-E-RESTRICOES.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.75 — Aula 13 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.74.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-13-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.76 — Aula 13 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.75.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-13.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.77 — Aula 13 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.74.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-13.md` para regerar `ATIVIDADE-PRATICA-AULA-13.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.78 — Aula 13 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.77.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 13 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.79 — Aula 13 · conferência da aula

**Próximo passo:** esperar #277.74 a #277.78.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 13 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-13.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.80 — Aula 14 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-14.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 14` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-14-DML-INSERCAO-ATUALIZACAO-E-EXCLUSAO.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.81 — Aula 14 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.80.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-14-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.82 — Aula 14 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.81.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-14.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.83 — Aula 14 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.80.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-14.md` para regerar `ATIVIDADE-PRATICA-AULA-14.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.84 — Aula 14 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.83.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 14 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.85 — Aula 14 · conferência da aula

**Próximo passo:** esperar #277.80 a #277.84.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 14 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-14.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.86 — Aula 15 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-15.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 15` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-15-DML-CONSULTAS-COM-FILTROS-E-ORDENACAO.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.87 — Aula 15 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.86.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-15-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.88 — Aula 15 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.87.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-15.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.89 — Aula 15 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.86.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-15.md` para regerar `ATIVIDADE-PRATICA-AULA-15.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.90 — Aula 15 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.89.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 15 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.91 — Aula 15 · conferência da aula

**Próximo passo:** esperar #277.86 a #277.90.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 15 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-15.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.92 — Aula 16 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-16.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 16` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-16-CONSULTAS-COM-JUNCOES-AGRUPAMENTOS-E-SUBCONSULTAS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.93 — Aula 16 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.92.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-16-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.94 — Aula 16 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.93.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-16.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.95 — Aula 16 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.92.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-16.md` para regerar `ATIVIDADE-PRATICA-AULA-16.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.96 — Aula 16 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.95.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 16 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.97 — Aula 16 · conferência da aula

**Próximo passo:** esperar #277.92 a #277.96.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 16 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-16.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.98 — Aula 17 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-17.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 17` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-17-PROCEDIMENTOS-ARMAZENADOS.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.99 — Aula 17 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.98.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-17-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.100 — Aula 17 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.99.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-17.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.101 — Aula 17 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.98.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-17.md` para regerar `ATIVIDADE-PRATICA-AULA-17.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.102 — Aula 17 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.101.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 17 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.103 — Aula 17 · conferência da aula

**Próximo passo:** esperar #277.98 a #277.102.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 17 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-17.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.104 — Aula 18 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-18.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 18` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-18-TRIGGERS-DISPARADORES.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.105 — Aula 18 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.104.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-18-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.106 — Aula 18 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.105.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-18.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.107 — Aula 18 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.104.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-18.md` para regerar `ATIVIDADE-PRATICA-AULA-18.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.108 — Aula 18 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.107.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 18 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.109 — Aula 18 · conferência da aula

**Próximo passo:** esperar #277.104 a #277.108.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 18 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-18.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.110 — Aula 19 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-19.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 19` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-19-SEGURANCA-DA-INFORMACAO-PILARES-ACESSO-E-AUDITORIA.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.111 — Aula 19 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.110.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-19-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.112 — Aula 19 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.111.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-19.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.113 — Aula 19 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.110.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-19.md` para regerar `ATIVIDADE-PRATICA-AULA-19.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.114 — Aula 19 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.113.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 19 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.115 — Aula 19 · conferência da aula

**Próximo passo:** esperar #277.110 a #277.114.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 19 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-19.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.116 — Aula 20 · discursiva de 20 questões (fonte)

**Próximo passo:** esperar #277.0 (e as correções da auditoria, se houver).

- **Nível:** MEDIO — 1 arquivo `.md` de questões, sem gabarito e sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-20.md`: **manter as 10 questões atuais** e acrescentar as **questões 11 a 20** (novas, da mesma aula), fechando **20 questões × 3 tópicos**, 1 ponto por questão (0,2 + 0,4 + 0,4) = 20 pontos; atualizar o título (`20 Questões Discursivas`), `Total de questões: 20`, `Pontuação`, a tabela de cobertura da aula (cada questão com seu conteúdo) e o contexto "Você, como aluno consultor…"; manter os campos `Folha de respostas: sim`, `Exportar Meu Gabarito: sim`, `Aula no banco: 20` e os demais. **Sem padrão de resposta neste arquivo.** Conteúdo da aula: `CONTEUDO/AULA-20-PROJETO-INTEGRADOR-BANCO-DOCUMENTADO-PARA-O-BACK-END.md`.
- **Critérios de aceitação:** 20 `## ITEM` × 3 tópicos; pontos somando 1 por item; cobertura da aula atualizada e sem repetição; nenhum padrão de resposta na fonte.
- **Entrega:** — · **Verificação:** contar 20 itens e 60 tópicos; conferir a fonte contra a aula; commit + push

### #277.117 — Aula 20 · gabarito/padrão de resposta da discursiva (60 tópicos)

**Próximo passo:** esperar #277.116.

- **Nível:** PESADO — é o gabarito/padrão de resposta; o aluno nunca lê
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Editar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-20-GABARITO.md`: **manter os 30 padrões atuais** e acrescentar o **padrão de resposta e os critérios de correção (certa / meia certa / errada) dos tópicos das questões 11 a 20**, fechando **60 tópicos**; no Git e fora do site (`.vercelignore`); nunca citado na página do aluno.
- **Critérios de aceitação:** 60 tópicos com padrão; critério por tópico; nenhum padrão no HTML ou na fonte pública.
- **Entrega:** — · **Verificação:** conferir 60 tópicos contra a fonte; `.vercelignore`; commit + push

### #277.118 — Aula 20 · respostas prováveis das 20 perguntas

**Próximo passo:** esperar #277.117.

- **Nível:** PESADO — material de correção (respostas esperadas); fora do site
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-20.md` com **3 a 5 respostas prováveis por pergunta** (20 perguntas), cada uma marcada como **certa / meia certa / errada** e com o motivo em 1 linha, no formato `ITEM NN · tópico a) · categoria · resposta provável · motivo`. Base para a comparação do JEV-AI (#277.123) e para a correção; só o texto, sem dado pessoal de aluno (LGPD); no Git e fora do site.
- **Critérios de aceitação:** 20 perguntas × 3–5 variantes; toda variante com categoria; sem nome ou dado de aluno; fora do site.
- **Entrega:** — · **Verificação:** contagem e formato contra o `-GABARITO.md`; `.vercelignore`; commit + push

### #277.119 — Aula 20 · regenerar página e seed da discursiva

**Próximo passo:** esperar #277.116.

- **Nível:** MEDIO — rodar o gerador e conferir a página e o seed; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Rodar `python assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-20.md` para regerar `ATIVIDADE-PRATICA-AULA-20.html` e o seed dos tópicos; conferir a saída ("20 questões, 60 tópicos, 20 pontos" e "0 sem padrão"); conferir na página os campos (Folha de respostas, Exportar Meu Gabarito, Progresso, bloquear colar) e nenhum padrão de resposta; atualizar as linhas da aula em `AULAS/STATUS-AULAS.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` (20 questões × 3). ⛔ Não editar o HTML à mão.
- **Critérios de aceitação:** Página e seed regenerados; contagens 20 × 60 × 20; linhas de status atualizadas; nenhum gabarito no HTML.
- **Entrega:** — · **Verificação:** conferir a saída do gerador, a página e as linhas de status; commit + push

### #277.120 — Aula 20 · seed no banco: acrescentar os 30 tópicos novos (só local)

**Próximo passo:** esperar #277.119.

- **Nível:** PESADO — banco (acrescentar 30 tópicos, conferir md5); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Aplicar o seed novo da discursiva da aula 20 **acrescentando só os 30 tópicos novos**, sem apagar nem alterar os 30 tópicos já existentes (a atividade já está no banco com 30): comparar o seed novo com o banco, montar o lote só com os tópicos das questões 11 a 20 e aplicar com os scripts de `scripts/seeds/`; conferir md5; atualizar `database/SEEDS-APLICADOS.md` (CONCLUÍDO do seed novo e observação do que foi acrescentado); conferir `topico_discursivo` (60) e o RLS. ⛔ Se for preciso apagar ou trocar itens, parar e pedir autorização ao usuário. ⛔ Banco só pelo Claude Code local.
- **Critérios de aceitação:** 60 tópicos no banco; 30 antigos intactos; seed CONCLUÍDO com md5; aluno sem acesso aos tópicos.
- **Entrega:** — · **Verificação:** `registrar_seed.py` + consultas de conferência; commit + push

### #277.121 — Aula 20 · conferência da aula

**Próximo passo:** esperar #277.116 a #277.120.

- **Nível:** MEDIO — conferência por leitura (checklist) de 1 aula; sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Conferir a aula 20 e marcar a checklist na seção da aula: objetiva de 50 existente e conferida (gabarito 13/13/12/12); discursiva com 20 × 3; `-GABARITO.md` com 60 padrões; `RESPOSTAS-PROVAVEIS-AULA-20.md` com 3–5 variantes por pergunta; página da discursiva com 20 questões e sem gabarito; seed aplicado (60 tópicos) e CONCLUÍDO; `STATUS-AULAS` e `STATUS-ATIVIDADES` atualizados; nenhum slide criado. Corrigir o que faltar na própria subtarefa ou abrir a subtarefa certa.
- **Critérios de aceitação:** Checklist 100% ✅ escrita na seção da aula; pendências registradas com a subtarefa dona.
- **Entrega:** — · **Verificação:** ler os arquivos e as linhas de status; commit + push

### #277.122 — Documentação da matéria e do padrão novo

**Próximo passo:** esperar #277.0.

- **Nível:** LEVE — só `.md` (documentação da matéria)
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash
- **Descrição:** Criar/atualizar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/DOCUMENTACAO/README.md` (mapa da matéria: pastas, padrões, links para a ITIC) e `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/DOCUMENTACAO/EXCECOES.md` (padrão novo desta matéria: discursiva de 20 × 3 em vez de 10 × 3; respostas prováveis por discursiva; apostila e avaliações só auditadas, não refeitas); registrar que a objetiva de 50, os seeds antigos, a apostila e as avaliações já estavam prontos e foram conferidos, não refeitos.
- **Critérios de aceitação:** Os 2 documentos existem, batem com a estrutura real e não inventam regra nova.
- **Entrega:** — · **Verificação:** leitura contra a pasta e as regras; commit + push

### #277.123 — Análise completa do JEV-AI + revisão dos modelos de cada subtarefa

**Próximo passo:** esperar #277.2 a #277.121.

- **Nível:** MEDIO — documento de análise (1 `.md`); sem banco
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking
- **Descrição:** Criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/DOCUMENTACAO/JEV-AI-ANALISE.md` com 4 partes: (1) como o **JEV-AI** (Jev/TypeSafe — ver `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/JEV-AI/CLAUDE.md`) compara a resposta do aluno com as **respostas prováveis** de cada discursiva (primitiva `Score` por tópico + `Noul` de "cobre o padrão" + `confidence`; limites de confiança para revisão do professor; LGPD: só o texto, sem nome ou dado do aluno; chave só no servidor); (2) **tabela de revisão dos modelos sugeridos em cada subtarefa** (#277.0 a #277.125): nível e modelo indicados, se dá para descer o nível ou trocar por um modelo mais barato (OpenCode `deepseek-flash`/`deepseek-v4-pro`, DeepSeek, Haiku/Flash), conferido com a skill `classificar-tarefa` (matriz 2026-10-18, C35/C37) e com `.claude/rules/niveis.md`; (3) divergências encontradas (só listar — não mudar nível nem prioridade no quadro sem o usuário; indicar a subtarefa que corrige); (4) plano B se a chave ou o limite do Jev não existir (comparação manual com as respostas prováveis).
- **Critérios de aceitação:** Documento com as 4 partes; a tabela cobre **todas** as subtarefas; nenhuma chave no documento; sem dado pessoal; níveis e prioridades não alterados no quadro.
- **Entrega:** — · **Verificação:** conferir a tabela contra o quadro e a matriz de níveis; commit + push

### #277.124 — Conferência final da matéria

**Próximo passo:** esperar #277.122 e #277.123.

- **Nível:** PESADO — banco (conferência com consultas); só o Claude Code local
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable)
- **Descrição:** Rodar `python scripts/analise-materias.py` e `python scripts/status-materias/gerar_status_materia.py`; conferir `STATUS_MATERIA.md` = **✅ CONCLUÍDA** (todas as peças), os seeds da matéria **CONCLUÍDO**, as 20 discursivas com 60 tópicos no banco; varrer o site pelo `.vercelignore` para garantir que nenhum gabarito nem resposta provável é servido; conferir o RLS; registrar os números no quadro.
- **Critérios de aceitação:** `STATUS_MATERIA.md` ✅; zero seed pendente da matéria; 20 discursivas com 60 tópicos; nenhum gabarito no site; RLS conferido.
- **Entrega:** — · **Verificação:** relatórios dos scripts + consultas no banco; commit + push

### #277.125 — Fechamento: status, visualizador e quadro

**Próximo passo:** esperar #277.124.

- **Nível:** LEVE — só quadro, visualizador e `.md`
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash
- **Descrição:** Conferir os status da matéria em ✅; rodar `python scripts/regras/gerar_visualizador_regras.py`; fechar a mãe #277 no quadro (subtarefas ✅ ou ⛔ justificadas) e mover as linhas para `tasks/task_complete.md`; atualizar a frente; commit + push.
- **Critérios de aceitação:** Status ✅; visualizador regenerado; quadro fechado e coerente; commit + push.
- **Entrega:** — · **Verificação:** conferir o visualizador e o quadro; commit + push

