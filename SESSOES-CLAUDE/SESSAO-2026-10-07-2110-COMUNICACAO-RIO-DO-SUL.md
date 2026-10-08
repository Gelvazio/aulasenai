# 🤖 Sessão 2026-10-07 21:10 — Comunicação Oral e Escrita (Rio do Sul) + regras do CLAUDE.md

- **Status:** PENDENTE
- **Atualizado em:** 2026-10-08 08:32
- **Ambiente:** local (`C:\fontes\aulasenai`) · **Modelo:** Claude Opus 5.5 · **Branch:** `main` (commits só locais; o push é do usuário)
- **Plano:** [docs/reorganizar-comunicacao-oral-escrita-rio-do-sul.md](../docs/reorganizar-comunicacao-oral-escrita-rio-do-sul.md) · **Controle:** [STATUS.md](../STATUS.md), Etapas 71, 76, 77 e 78
- **Entregável:** `MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/`

> Só o mínimo para continuar em outra sessão (regra "REGISTRO DA SESSÃO" do `CLAUDE.md`).
> ⚠️ Pasta publicada: sem senhas, gabaritos, respostas certas nem dados de alunos.

---

## ▶️ Próximo passo exato

Gerar as atividades da **Aula 03** (50 questões + atividade prática) e seguir até a Aula 07, uma
aula por vez, como foi feito nas aulas 01 e 02:

1. Ler `CONTEUDO/AULA-03-FALAR-EM-PUBLICO-E-APRESENTACOES.md`.
2. Fonte objetiva: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-03-50-QUESTOES.md` no formato da ITIC
   (cabeçalho com `Aula`, `Tema`, `Ícone`, `Duração`, `Total de questões: 50`,
   `Capacidade avaliada`, `` Conteúdo-base: `../CONTEUDO/AULA-03-...md` ``, `` Slides: `—` ``,
   `Folha de respostas: sim`; itens `## ITEM NN — título` com `- **Capacidade:** Cn`, Contexto
   opcional, Comando, 4 alternativas A–D e `**Gabarito:**`; letras certas equilibradas 13/13/12/12).
3. Gerar o HTML: `C:\Python314\python.exe assets\gerador-atividades\gerar_atividades.py <pasta ATIVIDADES> --so=ATIVIDADES-AULA-03-50-QUESTOES.md`
   e conferir 50 itens e nenhum gabarito no HTML.
4. Fonte prática: `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md` (10 itens, 2 tópicos de 0,5;
   cabeçalho `Aula: AP-03`, `Rótulo da aula`, `Aula no banco: 3`, empresa fictícia Vale Tech) +
   `ATIVIDADE-PRATICA-AULA-03-GABARITO.md` (`### ITEM NN-a` com Resposta esperada e Critérios).
   Gerar: `C:\Python314\python.exe assets\gerador-avaliacao-discursiva\gerar_avaliacao_discursiva.py <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-03.md`.
5. Atualizar `ATIVIDADES/STATUS-ATIVIDADES.md`, `AULAS/STATUS-AULAS.md`, o plano (passo D) e o
   `STATUS.md`; commit **só** das páginas HTML, da fonte prática sem respostas e dos status.

## 📌 Decisões do usuário (valem para continuar)

| Data | Decisão |
|---|---|
| 2026-10-07 | Pasta nova `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA`; backup dos binários antigos em `C:\fontes\BACKUP-SCRIPTS-COMUNICACAO-2026-10-07\` (29 arquivos) |
| 2026-10-07 | 9 aulas (8 × 4 h + 1 × 1 h = 33 h); só as capacidades C1–C4 oficiais (sem socioemocionais); empresa fictícia Vale Tech; Avaliação Prática 6,0 (aula 08) + Objetiva 4,0 com 30 questões (aula 09) |
| 2026-10-08 | Atividade de 50 questões só nas aulas 01 a 07 |
| 2026-10-08 | `.gitignore`: "não mexer, eu cuido" — fontes com respostas (`*QUESTOES.md`, `*-GABARITO.md`) e seeds de `database/` **não entram em commit** |
| 2026-10-08 | Log da sessão = mínimo para continuar (o usuário alterna 2 licenças); `STATUS-SESSOES.md`; `CONCLUÍDO` só com todos os pedidos validados |
| 2026-10-08 | Conflitos das regras (Etapa 76): exceção das tarefas pequenas também no global e na skill; sem navegador/testes nas regras de documentação; `STATUS.md` é a fonte única; log da sessão só com SIM; pergunta do log aceita no global; commit/STATUS/graphify sem confirmação |
| 2026-10-08 | Skills do usuário em `.claude/skills/` e cópia de referência (não carregada) das regras globais em `.claude/regras-globais/`; na nuvem, ler essa cópia (Etapa 77) |
| 2026-10-08 | 7 regras do global trazidas ao projeto: nunca escrever testes, `docs/regras/codigo.md`, gestão de projetos + modelo do `STATUS.md`, `docs/regras/infograficos.md`, Git sem perguntar/sem worktree, graphify no início de cada conversa, fluxo da documentação padrão (Etapa 78) |

## ✅ Validação dos pedidos

| Pedido do usuário | Feito? | Como foi conferido | Aceite |
|---|---|---|---|
| Ver o que foi removido do `.gitignore` | ✅ análise | diff com o último commit | ✅ (usuário cuida do arquivo) |
| Detalhar o bloco do `Scripts-Comunicacao` e reanalisar | ✅ análise | leitura dos arquivos | ✅ |
| Listar o que foge ao padrão em `Scripts-Comunicacao` | ✅ análise | comparação com a ITIC e `docs/regras/` | ✅ |
| Recriar a matéria no padrão da ITIC e apagar o antigo | 🔄 etapas A, B, C ✅; D em andamento (aulas 01–02); E e F pendentes | plano e `STATUS.md` (Etapa 71) | ⬜ |
| Commitar tudo o que foi feito | ✅ | `git log` (`b13aa19`) | ✅ |
| Registrar a sessão em `SESSOES-CLAUDE/` + regras do log no `CLAUDE.md` | ✅ | commits `9e2b6b9` a `00b5d3b` | ✅ |
| `STATUS-SESSOES.md`, regra da sessão `CONCLUÍDO` e leitura antes de cada tarefa | ✅ | commits `1fcfc6e`, `04ba9e1` | ✅ |
| Seção "MUITO IMPORTANTE — ARQUIVOS DE STATUS" no `CLAUDE.md` | ✅ | commit `80ea919` | ⬜ |
| Corrigir os 6 conflitos das regras (Etapa 76) | ✅ 6/6 | `STATUS.md` 76.1–76.6 | ⬜ (76.7) |
| Skills e regras globais no projeto + regra da nuvem (Etapa 77) | ✅ | commits `790ea94` a `da72ce2` | ⬜ (77.5) |
| 7 regras do global no `CLAUDE.md` do projeto (Etapa 78) | ✅ | commit `8795ff3` | ⬜ (78.8) |

## 🧾 Commits da sessão

`f8687be` ementa, `materia.json` e status · `62791c0` aula 01 · `ca7195a` aulas 02–09 ·
`5527397` atividades aula 01 · `b13aa19` atividades aula 02 · `9e2b6b9` log da sessão ·
`1ace163`, `52c6560`, `6e5ca10`, `f63fef5`, `1fcfc6e`, `00b5d3b` regras do log de sessão no `CLAUDE.md`.
`04ba9e1` a `8795ff3` (Etapas 76, 77 e 78): conflitos das regras, seção de status, skills/regras globais no projeto e 7 regras do global.

## ⏳ Pendências

| # | O que falta | Quem |
|---|---|---|
| 1 | Restaurar as regras do `.gitignore` (gabarito, `*QUESTOES.md`, seed, `BANCO-AVA/`, `RESOLUCAO/`, `CONTEUDO-PROF-*/`, `Scripts-Comunicacao`, exceções de PDF/PPTX/logo) | Usuário |
| 2 | Atividades das aulas 03 a 07 (50 questões + prática), uma por vez | Claude |
| 3 | Avaliação Prática (aula 08), Avaliação Objetiva de 30 questões (aula 09) e média final | Claude |
| 4 | `MENU-ATIVIDADES.js`, `ATIVIDADES/index.html` e card da matéria no `index.html` do curso | Claude |
| 5 | Apostila: introdução + 9 capítulos (um por vez, com validação), conferência 100% e HTML | Claude + usuário |
| 6 | Apagar a pasta antiga `Scripts-Comunicacao` (backup feito) e corrigir links | Claude |
| 7 | Cadastro da matéria/aulas no banco e aplicação dos seeds — só a pedido | Usuário decide |
| 8 | Revisar as 9 aulas e dar o aceite final da Etapa 71 | Usuário |
| 9 | Versões das regras 08:04, 08:06 e 08:09 ficaram alguns minutos à frente do relógio real (correção opcional) | Usuário decide |
| 10 | Aceite das Etapas 76, 77 e 78 (`STATUS.md` 76.7, 77.5 e 78.8) | Usuário |
| 11 | `.claude/skills/` e `.claude/regras-globais/` devem ser sincronizados sempre que uma regra global ou skill mudar | Claude (regra contínua) |
