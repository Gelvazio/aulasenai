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

### #345.1 — Levantamento e plano (aprovação do usuário)

**Próximo passo:** levantar a tela Usuários e onde a senha está no banco; escrever o plano.

- **Nível:** PESADO — segurança (senhas), RLS, banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** ler a tela e o schema; plano com subtarefas · **Critérios de aceitação:** plano
  na etapa e "sim" do usuário
- **Entrega:** — · **Verificação:** —
