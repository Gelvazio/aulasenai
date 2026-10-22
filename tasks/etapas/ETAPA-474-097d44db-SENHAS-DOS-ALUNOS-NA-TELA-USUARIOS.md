## Etapa 474-097d44db — Senhas dos alunos na tela Usuários (só professor)

**Tarefa:** #345-097d44db-e579-47a9-8945-9aaf66ef3122 · **Pedido em:** 2026-10-22 13:34 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "na tela *Usuarios* online (https://aulasenai.vercel.app/), deve abrir a lista de alunos
com suas senhas online, somente professor pode ver,e deve buscar direto do banco de dados"
**Objetivo:** o professor abre a tela Usuários e vê a lista de alunos com a senha de cada um,
lida direto do banco; aluno nunca vê.

### Escopo

- **Entra:** levantar onde a senha do aluno existe no banco; plano de como mostrar só ao
  professor (RLS + JWT); tela Usuários lendo do banco.
- **Não entra:** mudar senhas; mostrar senha a quem não é professor.

### Riscos

- **Segurança:** o Supabase Auth guarda só o hash da senha (não dá para ler a senha de volta).
  Se não houver senha em texto no banco, mostrar exigiria guardá-la aberta — decisão do usuário.
- Mexe em banco/RLS: tarefa **grande**, plano aprovado antes; parte de banco só pelo local.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 | Tarefa criada e publicada; #345.1 reservada pela nuvem | Claude Code (Opus 5.5) | segurança + banco |
| 2026-10-22 13:45 | Levantamento feito; plano escrito, 👀 aguarda o "sim" | Claude Code (Opus 5.5) | senha só existe como hash no Auth |
| 2026-10-22 13:52 | **Plano aprovado** pelo usuário: "1-SIM;2-QUALQUER PROFESSOR;3-SIM" — guardar a senha inicial em texto no banco com RLS; **qualquer professor** (perfil PROFESSOR) vê; a tela mostra a senha inicial mesmo se o aluno trocar | usuário (Gelvazio) | resposta às 3 perguntas do plano |

### Levantamento (#345.1, 2026-10-22)

- O menu **USUARIOS** abre `scripts/criarUsuariosBancoDados.html`. A senha que a tela mostra vem
  de `scripts/LISTAPRESENCA.js` (fora do site pelo `.vercelignore`) e a gravação usa a chave
  `service_role` de `scripts/variaveis.js` (fora do Git). Por isso, **online a tela não lista**.
- No banco **não existe senha legível**: o Supabase Auth guarda só o hash; `usuario.senha_hash` é
  legado. Para "buscar a senha direto do banco", a senha inicial precisa ser **guardada no banco**.
- Alunos por turma: tabelas `turma` e `turmaaluno`.

### Plano (aguarda o "sim")

- **Critério de pronto:** professor logado abre USUARIOS em https://aulasenai.vercel.app/, vê os
  alunos por turma com e-mail e senha lidos do banco; aluno, anônimo ou sem login não vê nada.
- **Premissas:** guarda-se a **senha inicial** (a que o professor entrega ao aluno); se o aluno
  trocar a senha depois, a tela continua mostrando a inicial.
- **Riscos e plano B:** senha aberta no banco é dado sensível (LGPD, alunos menores) → tabela só
  com RLS de professor, sem acesso anônimo, nunca no `localStorage`; plano B: desfazer apagando a
  tabela (SQL preparado para o professor rodar).

| Subtarefa | O quê | Nível / quem | Verificação |
|---|---|---|---|
| #345.2 | Tabela `usuario_senha_inicial` (usuario_id, senha_inicial, atualizado_em) com RLS: só PROFESSOR lê e grava; carga das senhas a partir do `LISTAPRESENCA.js` | PESADO · Claude Code local | consulta como aluno = 0 linhas; como professor = todas |
| #345.3 | Tela USUARIOS online: com professor logado (JWT), lista turmas/alunos de `turma`, `turmaaluno`, `usuario` e a senha da tabela nova, sem `LISTAPRESENCA.js` | PESADO · Opus/Fable | `node --check`; leitura do código; conferir na tela (usuário) |
| #345.4 | Ao criar ou regravar a senha pela tela local, gravar também na tabela nova | PESADO · Opus/Fable | leitura do código + `node --check` |
| #345.5 | `docs/database.md` e orientação da tela | LEVE · Haiku | leitura |

### #345.1 — Levantamento e plano (aprovação do usuário)

**Próximo passo:** — (concluída)

- **Nível:** PESADO — segurança (senhas), RLS, banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** ler a tela e o schema; plano com subtarefas · **Critérios de aceitação:** plano
  na etapa e "sim" do usuário
- **Entrega:** levantamento + plano aprovado (commits do quadro de 2026-10-22) · **Verificação:** leitura de `scripts/criarUsuariosBancoDados.html`, `assets/js/criar-usuarios-*.js`, `docs/database.md` e `.vercelignore`

### #345.2 — Tabela `usuario_senha_inicial` com RLS e carga das senhas

**Próximo passo:** escrever o SQL idempotente (`database/2026-10-22-usuario-senha-inicial.sql`), aplicar e carregar as senhas do `scripts/LISTAPRESENCA.js`.

- **Nível:** PESADO — banco, RLS, senhas
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro
- **Descrição:** tabela `usuario_senha_inicial` (`usuario_id` uuid PK → `usuario.id` on delete cascade, `senha_inicial` text not null, `atualizado_em` timestamptz default now()); RLS ligado; SELECT/INSERT/UPDATE só `authenticated` com `usuario.perfil = 'PROFESSOR'` do `auth.uid()`; sem acesso `anon`. Carga: e-mail do `LISTAPRESENCA.js` → `usuario.email` → senha. ⚠️ O SQL da carga tem senhas: não vai ao site (`.vercelignore`) — preferir rodar a carga pelo conector sem gravar arquivo com senha no Git.
- **Critérios de aceitação:** como aluno, 0 linhas; como professor, uma linha por aluno com senha na lista; `docs/database.md` com a tabela.
- **Entrega:** — · **Verificação:** —

### #345.3 — Tela USUARIOS online lendo turmas, alunos e senhas do banco

**Próximo passo:** depois da #345.2, ler `assets/js/criar-usuarios-pagina.js` e `criar-usuarios-tabela.js` e montar a lista pelo banco quando não houver `LISTAPRESENCA`/`variaveis.js`.

- **Nível:** PESADO — senhas, JWT, mais de 3 arquivos ligados
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** professor logado (JWT, `js/supabase.js`) → turmas (`turma`), alunos (`turmaaluno` + `usuario`, sem desistentes) e senha (`usuario_senha_inicial`); aluno/anônimo não vê a lista; nada em `localStorage`.
- **Critérios de aceitação:** em https://aulasenai.vercel.app/ o menu USUARIOS lista alunos e senhas para o professor; `node --check` limpo.
- **Entrega:** — · **Verificação:** —

### #345.4 — Gravar a senha na tabela ao criar ou regravar pela tela local

**Próximo passo:** depois da #345.2, em `assets/js/criar-usuarios-api.js`, upsert em `usuario_senha_inicial` após criar/regravar no Auth.

- **Nível:** PESADO — senhas, chave `service_role`
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** criar ou regravar um aluno atualiza a senha na tabela; `node --check` limpo.
- **Entrega:** — · **Verificação:** —

### #345.5 — Documentação

**Próximo passo:** depois de #345.3 e #345.4, atualizar `docs/database.md` (tabela nova) e o cabeçalho/orientação da tela USUARIOS.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
