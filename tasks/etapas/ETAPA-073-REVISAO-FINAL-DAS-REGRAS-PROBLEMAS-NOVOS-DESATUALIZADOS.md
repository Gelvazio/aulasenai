> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 73 — Revisão final das regras: problemas novos + desatualizados (pedida em 2026-10-07)

**Tarefa:** #17 (também os itens 17.22 e 17.30 das etapas 70 e 72)
**Próximo passo:** aceites 17.22, 17.30 e 17.14; decisões 17.15b e 17.16.

Uma pergunta por item; **um commit só no final** (pedido do usuário).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 17.1 | Pastas a ignorar: só MATERIAS-GERAIS × AGENDA_COLABORADOR — escolha: lista única | ✅ Concluído | 2026-10-07 21:46 | "Estrutura de pastas" lista as 2 pastas; seção solta do fim apagada |
| 17.2 | "docs/<tarefa>.md antes de implementar" × tarefas pequenas — escolha: acrescentar a exceção | ✅ Concluído | 2026-10-07 21:46 | Linha de "Outras Regras" com a exceção e o STATUS.md |
| 17.3 | Global: DOCUMENTAR / documentacao-padrao "sem exceção" × tarefas pequenas — escolha: valer a exceção | ✅ Concluído | 2026-10-07 21:50 | CLAUDE.md global, linhas 162 e 292 (fora do Git) |
| 17.4 | Global: "NUNCA git status" × "Executar git status" — escolha: trocar o exemplo | ✅ Concluído | 2026-10-07 21:50 | CLAUDE.md global, linha 720 (fora do Git) |
| 17.5 | Título e linha 387 "6 arquivos HTML" — escolha: novo título e texto | ✅ Concluído | 2026-10-07 21:51 | Título "Regras do projeto Aulas SENAI"; seção do grafo cita docs/regras |
| 17.6 | Menu Regras descrito só como CLAUDE.md — escolha: atualizar a descrição | ✅ Concluído | 2026-10-07 21:51 | Descrição e aviso de segredo cobrem docs/regras e o histórico |
| 17.7 | Autenticação cita `index.html` (login é `login.html`) — escolha: trocar por login.html + header | ✅ Concluído | 2026-10-07 21:52 | Linha da regra de autenticação lista login.html, login.js, header-usuario.js e supabase.js |
| 17.8 | Data do grafo desatualizada — escolha: tirar data e números | ✅ Concluído | 2026-10-07 21:55 | Seção do grafo remete ao topo do GRAPH_REPORT.md; sem números fixos |
| 17.9 | TASKS.md parado × STATUS.md — escolha: trocar por STATUS.md | ✅ Concluído | 2026-10-07 21:58 | As 2 seções do TASKS.md viraram "Inicialização de cada chat — ler o STATUS.md"; TASKS.md citado só como histórico |
| 17.10 | Comando de tamanho da ementa conta linhas — escolha: corrigir comando e exemplo | ✅ Concluído | 2026-10-08 07:37 | Comando com -Raw (testado: 219 linhas × 15.657 caracteres); exemplo sem número fixo |
| 17.11 | Caminho do STATUS-EMENTAS só Rio do Sul — escolha: caminho genérico + aviso | ✅ Concluído | 2026-10-08 07:40 | Linhas 182, 201 e 202 de `ementas-e-cursos.md` |
| 17.12 | Registro do cursoprofessor (substituído) — escolha: apagar a seção | ✅ Concluído | 2026-10-08 07:49 | Seção apagada de `paginas-legadas.md` e do índice do `CLAUDE.md`; histórico fica em `docs/registro-vinculos-cursos-professor-2026-10-03.md` |
| 17.13 | Versão das regras + commit único | ✅ Concluído | 2026-10-08 07:49 | Versão 2026-10-08 07:48 no CLAUDE.md e no histórico; reaplicado depois do merge da origin/main (feito por outra sessão); 12 itens conferidos por busca; 7 links do índice existem |
| 17.14 | Aceite do usuário: Revisão final das regras (12 itens) aplicada — ver tarefa #17 do `TASKS.md` | 👀 Aguardando o usuário | — | — |
| 17.15 | Tamanho da ementa: nova escolha do usuário (2026-10-09) = comando Python; versão vazia das regras preenchida | ✅ Concluído | 2026-10-09 10:48:00 | Python na ementa ITIC = 14.917 caracteres (wc -c = 15.579 bytes); versão 2026-10-09 10:47:05 no CLAUDE.md e no histórico; resumo com 5 linhas |
| 17.15b | Decidir sobre o commit `85a8531 ok`, que versionou gabaritos, a pasta `RESOLUCAO/` e um `.gitignore copy` (talvez já resolvido: desde 2026-10-09 14:09 o gabarito fica no Git e fora do site; o `.gitignore copy` saiu na Etapa 80) | 👀 Aguardando o usuário | — | — |
| 17.16 | Ementa fora do tamanho: `RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/EMENTA-CHALKIE-AI.md` com 15.657 caracteres (regra: 14.800 a 14.950); ajustar só a pedido | 👀 Aguardando o usuário | — | — |
| 17.17 | Opcional, só se pedido: generalizar `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-ementas.py` para todos os cursos (tarefa com plano próprio) | ⬜ Pendente | — | — |

### Pedido e descrição (vindos do `TASKS.md` em 2026-10-13, sem alteração)

`docs/reorganizar-claude-md-estrutura.md`. Tudo já está aplicado e commitado (último commit da
sessão: `56abe5b`); falta só conferir e aceitar.

O que falta:

- [ ] **Aceite do usuário — divisão do `CLAUDE.md` (17.22):** conferir o núcleo do `CLAUDE.md`, os
  arquivos de `docs/regras/`, o `docs/HISTORICO-REGRAS.md` e o menu **Regras** no site (o modal
  carrega o `CLAUDE.md` + `docs/regras/` + histórico; não foi testado no navegador).
- [ ] **Aceite do usuário — 7 contradições corrigidas (17.30):** frase final sem tabela; menu
  ALUNOS só do administrador; regra do Word removida; "PDF com gabarito" fora da regra da Turma;
  Reforço de Linguagens fora do exemplo das 50 questões; ementa na raiz da matéria; `git add .`
  trocado no `CLAUDE.md` global.
- [ ] **Aceite do usuário — revisão final de 12 itens (17.14):** pastas que não são curso numa
  lista só; plano em `docs/` só em tarefa grande (projeto e global); global sem `git status` como
  exemplo; título "Regras do projeto Aulas SENAI"; menu Regras e aviso de segredo; autenticação
  com `login.html`/`header-usuario.js`; grafo sem data fixa; inicialização pelo `STATUS.md`;
  comando da ementa com `-Raw`; STATUS-EMENTAS com caminho genérico; registro do `cursoprofessor`
  removido.
- [ ] **Conferir o commit `85a8531 ok` antes do push (decisão do usuário):** ele versionou
  arquivos de gabarito (ex.: `GABARITO-AVALIACAO-OBJETIVA.md`,
  `PROVA_OBJETIVA_UC1_TIC_COM_GABARITO.gs`, `GABARITO_CORRECAO_PROVA_SIMPLES_UC1_TIC.md`), a pasta
  `RESOLUCAO/` e um `.gitignore copy`, e mexeu na `.gitignore` — contra a regra "O QUE NUNCA É
  PUBLICADO". Decidir se tira do Git (`git rm --cached` + padrão no `.gitignore`) ou se mantém.
- [ ] **Ementa fora do tamanho (avisar/decidir):** `RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/EMENTA-CHALKIE-AI.md`
  tem 15.657 caracteres (regra: 14.800 a 14.950). Ajustar só a pedido (respeitar
  `STATUS-PERMISSAO-EMENTA`).
- [ ] **Opcional, só se pedido:** generalizar `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-ementas.py`
  para todos os cursos (hoje só percorre Rio do Sul; a regra manda atualizar os outros à mão) —
  é código: tarefa com plano próprio.
