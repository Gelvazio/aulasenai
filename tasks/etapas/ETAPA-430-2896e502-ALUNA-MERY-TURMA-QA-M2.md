## Etapa 430-2896e502 — #301: Aluna Mery Palacio na turma QA LBTSN 2026/1 M2 e "Aluno anotou?" no banco

**Tarefa:** #301 · **Pedido em:** 2026-10-20 09:25 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** imagem da coluna "Aluno anotou? (Sim/Não)" de `scripts/criarUsuariosBancoDados.html`
com os alunos da turma, "NOTAS DA LISTA DE ALUNOS A SEGUIR E DEVE SALVAR NO BANCO DE DADOS
SUPABASE, E TB O ALUNO Mery Palacio;Saylennce Detoutnel;Luis Fernando Nascimento dos Santos" e,
depois, "PARA A TURMA: QA LBTSN 2026/1 M2 (código: QA LBTSN 2026/1 M2) - CEPLAS MANHÃ".
**Objetivo:** a coluna "Aluno anotou?" da turma QA LBTSN 2026/1 M2 fica no banco igual à imagem, e a
aluna **Mery Palacio** passa a existir na turma (lista de presença, Auth, `aluno`, `turmaaluno`)
com "Aluno anotou?" = Sim.

### Escopo

- **Entra:** entrada nova da aluna em `scripts/LISTAPRESENCA.js` (turma `QA LBTSN 2026/1 M2`);
  criação do usuário dela pelo script do projeto `scripts/criar-usuarios-supabase-auth.js`
  (`--turma="QA LBTSN 2026/1 M2"`); `usuario.senha_informada = true` para ela.
- **Não entra:** mudar outros alunos (os 12 da imagem já estão no banco iguais à imagem, conferido
  em 2026-10-20 09:20), redefinir senhas, mudar páginas ou outras turmas.
- **Pronto quando:** Mery Palacio está no Auth, em `aluno` e em `turmaaluno` da turma, com
  `senha_informada = true`; os 12 alunos da imagem seguem iguais à imagem.
- ⚠️ Dados pessoais (LGPD): a lista já é de alunos e fica fora do site; não copiar para outro lugar.

### Decisões

- 2026-10-20 09:31 — Saylennce Detournel e Luis Fernando Nascimento dos Santos já estavam com
  "Sim" no banco (gravado em 2026-10-06): nada a mudar para eles. Claude Code (Opus 5.5).
- 2026-10-20 09:31 — E-mail no padrão `nome.sobrenome@senai.local`: `mery.palacio@senai.local`;
  número 13 e `naChamada: false`, como os alunos incluídos depois (#292). Claude Code (Opus 5.5).

### #301.1 — Cadastrar a aluna e gravar "Aluno anotou?" no banco

**Próximo passo:** acrescentar a aluna no `LISTAPRESENCA.js` e rodar o script da turma.

- **Nível:** PESADO — grava no banco e cria usuário no Auth.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** ver Escopo.
- **Critérios de aceitação:** consulta no banco mostra a aluna no Auth, em `aluno`/`turmaaluno` da
  turma e com `senha_informada = true`; nenhum outro aluno muda de valor.
- **Entrega:** — · **Verificação:** —
