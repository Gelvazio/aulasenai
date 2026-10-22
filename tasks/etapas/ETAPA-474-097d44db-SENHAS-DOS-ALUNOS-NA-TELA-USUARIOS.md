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

**Próximo passo:** 👀 esperar o "sim" do usuário ao plano; depois criar as linhas #345.2 a #345.5.

- **Nível:** PESADO — segurança (senhas), RLS, banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** ler a tela e o schema; plano com subtarefas · **Critérios de aceitação:** plano
  na etapa e "sim" do usuário
- **Entrega:** — · **Verificação:** —
