# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · [Tarefas](TASKS.md)
**Próximo passo:** Etapa 7, item 7.6 — aceite do trabalho em equipe da ITIC. Antes: Etapa 6, item 6.2 — aprovação do plano de equipes (`docs/equipes-sala-de-aula.md`). Pendente anterior: Etapa 4, item 4.5.

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** todas as tarefas pedidas pelo usuário neste repositório, a partir de 2026-10-03.
- **Não entra:** histórico anterior (está no Git, em `TASKS.md` e em `docs/`).
- **Critério de pronto:** item verificado, commit local feito e aceite do usuário.
- **Premissas e restrições:** regras do `CLAUDE.md` (sem navegador, sem push, um commit por tarefa).

## Etapa 1 — Atualizar `ANALISE-GERACAO-AULAS.md` do Técnico em Informática para Internet (pedida em 2026-10-03)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 1.1 | Levantar situação real das 20 pastas (ementa, `materia.json`, aulas, atividades, permissão) | ✅ Concluído | 2026-10-03 18:30 | Listagem das pastas + `STATUS-EMENTAS-CURSOS.md` |
| 1.2 | Reescrever `MATERIAIS/TECNICO-INFORMATICA-INTERNET/ANALISE-GERACAO-AULAS.md` conforme a ementa do curso | ✅ Concluído | 2026-10-03 18:30 | CH por UC conferida com a seção 5 da ementa (soma 1000 h) |
| 1.3 | Commit local | ✅ Concluído | 2026-10-03 18:31 | `git commit` |
| 1.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 2 — Apostila da ITIC (capítulos 02 a 10) e apostila de Testes de Frontend (pedida em 2026-10-03)

Plano: [docs/gerador-apostilas.md](docs/gerador-apostilas.md) · Regras: `CLAUDE.md` → REGRAS APOSTILAS ·
Status por capítulo: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/APOSTILA/STATUS-APOSTILA.md`
e `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/APOSTILA/STATUS-APOSTILA.md`.
Cada capítulo: fonte `CAPITULO-NN.md` → `--markdown` (conferência 100%) → HTML → status → commit.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 2.1 | ITIC — capítulo 02 (Hardware, Periféricos e SO) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `6919907` |
| 2.2 | ITIC — capítulo 03 (Navegação na Web e Pesquisa) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `c5abef5` |
| 2.3 | ITIC — capítulo 04 (Comunicação Digital e Nuvem) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `31572b0` |
| 2.4 | ITIC — capítulo 05 (Segurança da Informação) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `8845c55` |
| 2.5 | ITIC — capítulo 06 (Editor de Textos) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `6ed60df` |
| 2.6 | ITIC — capítulo 07 (Textos Técnicos) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `ffcd0f7` |
| 2.7 | ITIC — capítulo 08 (Planilhas: Organização e Fórmulas) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `0b55ea4` |
| 2.8 | ITIC — capítulo 09 (Planilhas: Análise Visual e Gráficos) | ✅ Concluído | 2026-10-03 18:54 | Conferência 201/201 · sem avisos · HTML gerado |
| 2.9 | ITIC — capítulo 10 (Editor de Apresentações e TIC + Avaliação) | ✅ Concluído | 2026-10-03 18:56 | Conferência 201/201 · sem avisos · 10/10 capítulos no plano |
| 2.10 | Testes de Frontend — ler a ementa da matéria e a UC na ementa do curso; `materia.json` completo e literal | ✅ Concluído | 2026-10-03 19:05 | UC na ementa do curso = ementa da matéria; acessibilidade (resumo) e recuperação ajustadas |
| 2.11 | Testes de Frontend — `INTRODUCAO.md`, Markdown completo e conferência 100% | ✅ Concluído | 2026-10-03 19:05 | Conferência 185/185 (100%) · conferidor generalizado; ITIC continua 278/278 |
| 2.12 | Testes de Frontend — capítulos 01 a 10 (um por vez, com commit e status a cada um) | ✅ Concluído | 2026-10-03 19:30 | Capítulos 01 a 10 gravados (commit por capítulo); conferência 185/185 mantida |
| 2.13 | Testes de Frontend — item "Apostila" no menu, status final | ✅ Concluído | 2026-10-03 19:31 | Link "📘 Apostila" na página da matéria (sem MENU-ATIVIDADES.js na pasta); STATUS-APOSTILA com os 10 capítulos 👀 |
| 2.14 | Aceite do usuário (as duas apostilas) | ⬜ Pendente | — | — |

## Etapa 3 — Regra "conteúdo só pelos Markdowns, nunca de PDF" no `CLAUDE.md` (pedida em 2026-10-03 20:47)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 3.1 | Acrescentar a regra (seção própria + item em "regras que valem sempre"), versão 2026-10-03 20:47 e linha no histórico | ✅ Concluído | 2026-10-03 20:49 | `node`: versão lida pelo regex do visualizador; nova seção `##` entra no índice (h2) |
| 3.2 | Tirar "slides" da fonte da atividade prática de Excel (só Markdown + ementa) | ✅ Concluído | 2026-10-03 20:49 | Leitura do trecho alterado |
| 3.3 | Commit local | ✅ Concluído | 2026-10-03 20:50 | `git commit` só com `CLAUDE.md` e `STATUS.md` |
| 3.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 4 — Regras "matéria modelo: Introdução à TIC" e "aulas extraídas da ementa em `CONTEUDO/`" (pedidas em 2026-10-03 20:52 e 20:55)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 4.1 | Registrar a regra "MATÉRIA MODELO: INTRODUÇÃO À TIC" (tabela das peças da ITIC) | ✅ Concluído | 2026-10-03 20:57 | Estrutura conferida na pasta da ITIC (listagem e `git ls-files`) |
| 4.2 | Registrar a regra "AULAS EXTRAÍDAS DA EMENTA EM `CONTEUDO/`" (1 aula/4 h, arredondar para cima, `AULA-NN-DESCRICAO-CURTA.md`, ordem aulas → atividades → apostila) | ✅ Concluído | 2026-10-03 20:57 | Leitura da seção; `node`: versão 20:55 e 3 seções novas no índice do visualizador |
| 4.3 | Apontar as fontes das 50 questões e da apostila para `CONTEUDO/`; nota de conflito na regra da pasta `AULAS/` | ✅ Concluído | 2026-10-03 20:57 | Leitura dos trechos alterados |
| 4.4 | Commit local | ✅ Concluído | 2026-10-03 20:58 | `git commit` só com `CLAUDE.md` e `STATUS.md` |
| 4.5 | Tirar as dúvidas da regra com o usuário e ajustar o texto conforme as respostas | 🔄 Em progresso | — | — |
| 4.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 6 — Equipes de sala de aula: CRUD global por turma, começando pela 135080 (CEPLAS ITIC Manhã) (pedida em 2026-10-05)

Plano: [docs/equipes-sala-de-aula.md](docs/equipes-sala-de-aula.md)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 6.1 | Plano em `docs/equipes-sala-de-aula.md` | ✅ Concluído | 2026-10-05 | Arquivo criado |
| 6.2 | Aprovação do plano pelo usuário | 🔄 Em progresso | — | Resposta do usuário |
| 6.3 | Executar passos 1 a 10 do plano | ⬜ Pendente | — | `node --check` + leitura |
| 6.4 | Aplicar SQL no Supabase (só com pedido) e 1º agrupamento da 135080 | ⬜ Pendente | — | Consultas de leitura |
| 6.5 | Commit local | ⬜ Pendente | — | `git commit` |
| 6.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 7 — Trabalho em equipe ITIC (agrupador das aulas 1 a 7) (pedida em 2026-10-05)

Tarefa pequena (1 página HTML + 1 CSS). Fonte: os `.md` de `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/`
(nunca os PDF). Entregável: `ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html`.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 7.1 | Ler os 7 Markdowns das aulas (1 a 7) | ✅ Concluído | 2026-10-05 | Leitura dos `.md` |
| 7.2 | CSS reaproveitável `assets/css/atividade-equipe.css` | ✅ Concluído | 2026-10-05 | Leitura |
| 7.3 | Página HTML do trabalho (formatação da aula 6 + modelos da aula 7 + cobertura das aulas 1–5) | ✅ Concluído | 2026-10-05 | 384 linhas, sem `<style>`/`<script>` embutidos |
| 7.4 | Item no `MENU-ATIVIDADES.js` | ✅ Concluído | 2026-10-05 | `node --check` OK |
| 7.5 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 7.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Riscos
| Risco | Chance | Impacto | Plano B | Situação |
|-------|--------|---------|---------|----------|

## Bloqueios
| Data | Item | Motivo | O que destrava | Resolvido em |
|------|------|--------|----------------|--------------|
| 2026-10-03 | Etapa 5 (Testes de Frontend) | Usuário pediu confirmação da regra de aulas em `CONTEUDO/` antes de continuar | Respostas do item 4.5 | — |

## Registro de decisões
| Data | Decisão | Quem | Por quê |
|------|---------|------|---------|
| 2026-10-03 | Criar este `STATUS.md` na raiz | Claude (regra global) | Regra "STATUS.md em toda tarefa" |
| 2026-10-03 | Apostila de Testes de Frontend: cobertura mínima de **70%** (e não 80%, como dizem os slides das aulas 9 e 10) | Claude (regra "a ementa vence") | A ementa da matéria (SA 2 e avaliação prática) fixa 70%; slides divergentes seguem a ementa |
| 2026-10-03 | Testes de Frontend não tem `MENU-ATIVIDADES.js`: o link "📘 Apostila" foi posto nos botões da página da matéria (`index.html`) | Claude | Equivalente ao item de menu da ITIC, sem criar estrutura nova |
| 2026-10-03 | Vídeos em inglês nos capítulos 04 a 09 de Testes de Frontend, marcados "(em inglês)" no título | Claude | Não há vídeos em português de até 15 min para Testing Library, MSW, cobertura no Vitest, axe-core e Core Web Vitals |
| 2026-10-03 20:47 | Conferir e gerar conteúdo só pelos Markdowns (em primeiro lugar o `EMENTA-CHALKIE-AI.md`); nunca extrair dados de PDF | Usuário | Pedido durante a geração das aulas de Testes de Frontend; registrado no `CLAUDE.md` |
| 2026-10-03 20:52 | Introdução à TIC é a matéria modelo: toda peça de outra matéria segue a estrutura dela | Usuário | "Tudo está funcionando nela"; registrado no `CLAUDE.md` |
| 2026-10-03 20:55 | Aulas extraídas do `EMENTA-CHALKIE-AI.md` para `<MATERIA>/CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` (1 aula a cada 4 h, arredondando para cima); atividades e, no final, apostila lidas dessas aulas | Usuário | Registrado no `CLAUDE.md`; dúvidas de detalhe em aberto (item 4.5) |

## Pendências (ficou para depois)
| Item | Motivo | Quando retomar |
|------|--------|----------------|
| Destino da pasta `Testes de Sistemas-EXISTENTES` (não é UC do curso) | Decisão do usuário | Quando o usuário decidir |
| Renomear `BANCO_DE_DADOS` e `TESTES-DE-FRONTEND` para o padrão | Só a pedido do usuário | Quando o usuário pedir |
| Professor conferir o conteúdo dos vídeos das duas apostilas (coluna "Vídeos conferidos pelo professor") | Só o professor valida o conteúdo | Na validação das apostilas |

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
|------|-----------------|--------------------|
| 2026-10-03 | A análise de 2026-09-08 dizia ITIC presencial e Banco de Dados "completo" | Conferir sempre a ementa do curso e as pastas reais antes de afirmar situação |
| 2026-10-03 | Abri os slides em PDF da aula 01 para montar a aula | PDF nunca é fonte: conteúdo e conferência só pelos `.md` (ementa primeiro) — regra no `CLAUDE.md` |
