## Etapa 506-5c2d9e41 — Menu "Matérias Pendentes" (só Professor Administrador) e página materias-pendentes.html

**Tarefa:** #357-5c2d9e41-7b3a-4e08-a1f6-2d84c9e05b17 · **Pedido em:** 2026-10-24 17:40 · **Criada por:** Devin (local · main)
**Pedido:** "crie um menu de nome *Materias Pendentes*, VISIVEL SO AO PROFESSOR ADMINISTRADOR, QUE DEVE ABRIR EM 1 NOVA JANELA UMA PAGINA DE NOME materias-pendentes.html, deve validar login, nesta pagina, deve ser possivel selecionar curso, ano, semestre e listar as materias pendentes e o que esta pendente em cada 1 delas (CONTEUDO, AULAS, ATIVIDADE OBJETIVA, ATIVIDADE PRATICA, ETC), e esta pagina deve usar o visual futurista (rules-ai/prompts/VISUAL-FUTURISTA.md)"
**Objetivo:** o Professor Administrador abre, pelo menu, uma página que mostra por curso/ano/semestre quais matérias estão pendentes e o que falta em cada uma.

### Escopo (plano — tarefa grande, **aguardando aprovação do usuário**)

**Entra**
- Item de menu **"Matérias Pendentes"** em `MENU_ADMINISTRADOR_HEADER` (`js/header-usuario.js`): só aparece para o Professor Administrador (confirmado pelo banco, RPC `eh_professor_administrador`) e abre `materias-pendentes.html` em **nova janela** (`target="_blank"`, como os outros itens).
- Página `materias-pendentes.html` (raiz): usa o header global (guarda de sessão: sem login vai ao `login.html`) e confere de novo o papel pela RPC — quem não for Professor Administrador vê "acesso negado" (sem dados).
- Filtros **Curso**, **Ano** e **Semestre** (`curso.ano` e `curso.semestre` já existem no banco, `docs/database.md`); lista as matérias **pendentes** do filtro e, em cada uma, **o que falta**: CONTEÚDO (aulas em `CONTEUDO/`), AULAS, ATIVIDADE OBJETIVA, ATIVIDADE PRÁTICA, banco (seeds), apostila, média final etc.
- Visual futurista (`rules-ai/prompts/VISUAL-FUTURISTA.md`): CSS próprio `assets/css/materias-pendentes.css` (fundo escuro, neon ciano/magenta/violeta, cartões com `backdrop-filter`, Orbitron + Share Tech Mono, barra de progresso, `prefers-reduced-motion`, foco visível, 1 coluna até 720 px).
- JS separado por responsabilidade (SOLID): `assets/js/materias-pendentes-repositorio.js` (dados), `materias-pendentes-regras.js` (o que é pendente), `materias-pendentes-pagina.js` (tela).
- Documento `docs/ORIENTACAO_JS_MATERIAS_PENDENTES.md` e regra do menu em `.claude/rules/`.

**Não entra**: editar matéria/aula/atividade por essa página (só leitura); gerar conteúdo de aula ou slides (regra 11 do projeto); mudar o banco (sem coluna nem tabela nova); navegador e testes automatizados.

### Decisão que precisa do usuário — de onde vem a "pendência"

| Opção | Como funciona | Prós / contras |
|---|---|---|
| **A (recomendada)** | Um gerador (`scripts/status-materias/`) lê os `STATUS_MATERIA.md` de cada matéria e grava `materias-pendentes.json` (curso, matéria, peças ✅/⬜ por aula); a página lê o JSON e cruza curso/ano/semestre com a tabela `curso` | Mostra CONTEÚDO, aulas, objetiva, prática, seeds — tudo que o `STATUS_MATERIA.md` já controla; o JSON não tem gabarito; precisa rodar o gerador a cada mudança de status |
| B | Só banco (`aulas`, `atividade`) | Sempre atualizado, mas **não enxerga CONTEÚDO** (`.md` só no Git) nem peças de arquivo |

### Riscos (com plano B)
- Cursos **QUALIFICACAO-PROFISSIONAL** e **CURSO-PROFESSOR-RAFAEL** não têm `curso.id` registrado no repositório → aparecem sem ano/semestre (grupo "Sem curso no banco") até alguém informar o id.
- JSON público no site: conter só nomes de peças e ✅/⬜ (sem gabarito/respostas); conferido com `.vercelignore` (`security-banco.md`).
- Hoje o JSON/arquivos são estáticos: o controle de acesso real é só o menu + a conferência da RPC na página (os dados não são sigilosos); se o usuário quiser sigilo de verdade, a opção B (banco com RLS) é a saída.

### Subtarefas previstas (níveis pela `niveis.md`)
| # | Subtarefa | Nível |
|---|---|---|
| .1 | Gerador do `materias-pendentes.json` a partir dos `STATUS_MATERIA.md` | MEDIO |
| .2 | Repositório + regras (JS) | MEDIO |
| .3 | Página `materias-pendentes.html` + CSS futurista + JS da tela | MEDIO |
| .4 | Item de menu no `header-usuario.js` (só admin, nova janela) + conferência da RPC na página | PESADO (login/papéis) |
| .5 | Documentação e conferência de segurança (`.vercelignore`, sem gabarito) | LEVE |

Verificação de cada uma: `node --check`, linhas ≤ 100, conferir o JSON sem gabarito; **sem navegador** — o teste na tela fica com o usuário.

### Decisões
- 2026-10-24 17:45 — Devin (local · main) escreveu o plano; aguardava o "sim" e a escolha A/B.
- 2026-10-24 17:52 — usuário respondeu **"A"**: plano aprovado com a **opção A** (gerador de `materias-pendentes.json` a partir dos `STATUS_MATERIA.md`). Escopo aprovado = o da seção Escopo; mudança material pede nova aprovação.
- Observação de nível: a matriz marca `PESADO` para login/papéis; o Devin só executa LEVE. Se o usuário aprovar e pedir que o Devin execute, fica registrado como pedido direto (precedente #353/#355/#356).

### #357.0 — Escrever o plano e obter a aprovação do usuário

**Próximo passo:** concluída (plano aprovado em 2026-10-24 17:52). Seguir com a #357.1.

- **Nível:** PESADO — Jev (confiança 1,00; sinais: banco, segredo, mais de 3 arquivos); login/papéis
- **Modelo:** só Sonnet (ou DeepSeek/OpenCode) — Devin age a pedido do usuário
- **Entrega:** plano acima · **Verificação:** aprovação do usuário registrada nas Decisões (2026-10-24 17:52)

### #357.1 — Gerador do `materias-pendentes.json` a partir dos `STATUS_MATERIA.md`

**Próximo passo:** concluída; seguir com a #357.2 (repositório + regras em JS lendo o materias-pendentes.json e as tabelas curso/materia).

- **Nível:** MEDIO — plano aprovado (ver Subtarefas previstas)
- **Modelo:** MEDIO · só Sonnet — Devin executa a pedido do usuário (precedente #353/#355/#356)
- **Entrega:** `scripts/status-materias/gerar_materias_pendentes_json.py` (novo) e `materias-pendentes.json` (raiz, gerado). Commit na `main`.
- **Verificação:** `py_compile` ok; linhas ≤ 100; gerador lê os 34 `STATUS_MATERIA.md` (34 matérias, 32 pendentes); UI/UX = ✅ CONCLUÍDA 147/147 com 14 peças e 19 aulas; CANVAS = ⬜ NÃO INICIADA com as 8 peças pendentes; JSON só com nomes de peça e true/false (sem gabarito nem conteúdo).

### #357.2 — Repositório + regras (JS) da página

**Próximo passo:** concluída; seguir com a #357.3 (página + CSS futurista + JS da tela).

- **Nível:** MEDIO — plano aprovado (ver Subtarefas previstas)
- **Modelo:** MEDIO · só Sonnet — Devin executa a pedido do usuário (precedente #353/#355/#356)
- **Entrega:** `assets/js/materias-pendentes-repositorio.js` e `assets/js/materias-pendentes-regras.js` (novos); `scripts/status-materias/gerar_materias_pendentes_json.py` passou a gravar `curso_id` (fonte única: `IDS_CURSO_BANCO` do gerador de índices) e o JSON foi regerado. Commit na `main`.
- **Verificação:** `node --check` ok; linhas ≤ 100 e funções ≤ 45 linhas; regras rodadas em `vm` com o JSON real: 32 pendentes de 34, curso 4 = 18, ano 2026/sem 1 = 18, sem curso = 3 (6 matérias nos grupos), UI/UX concluída fora da lista, CANVAS com CONTEÚDO/AULAS/OBJETIVA/PRÁTICA/BANCO/APOSTILA/MÉDIA FINAL/OUTROS.

### #357.3 — Página `materias-pendentes.html` + CSS futurista + JS da tela

**Próximo passo:** concluída; seguir com a #357.4 (item de menu no header-usuario.js, só admin, nova janela).

- **Nível:** MEDIO — plano aprovado (ver Subtarefas previstas)
- **Modelo:** MEDIO · só Sonnet — Devin executa a pedido do usuário (precedente #353/#355/#356)
- **Entrega:** `materias-pendentes.html` (raiz), `assets/css/materias-pendentes.css` e `assets/js/materias-pendentes-pagina.js` (novos). Commit na `main`.
- **Verificação:** `node --check` ok; linhas ≤ 100 e funções ≤ 45; HTML semântico sem estilo/JS inline; fluxo testado em DOM falso (vm): sem papel = acesso negado, administrador = 32 pendentes em 3 grupos, filtros preenchidos (curso/ano/semestre + Sem curso no banco), filtro por curso redesenha a lista, cartão com O QUE FALTA por categoria. Teste na tela fica com o usuário (sem navegador).

### #357.4 — Item de menu no `header-usuario.js` (só admin, nova janela) + conferência da RPC na página

**Próximo passo:** aguardando a subtarefa anterior.

- **Nível:** PESADO — plano aprovado (ver Subtarefas previstas)
- **Modelo:** PESADO · só Sonnet — Devin executa a pedido do usuário (precedente #353/#355/#356)
- **Entrega:** pendente · **Verificação:** pendente

### #357.5 — Documentação e conferência de segurança (`.vercelignore`, sem gabarito)

**Próximo passo:** aguardando a subtarefa anterior.

- **Nível:** LEVE — plano aprovado (ver Subtarefas previstas)
- **Modelo:** LEVE · só Haiku — Devin executa a pedido do usuário (precedente #353/#355/#356)
- **Entrega:** pendente · **Verificação:** pendente
