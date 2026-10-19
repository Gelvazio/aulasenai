## Etapa 421-86fc1120 — #292: Aluno Erick Rafael Rodrigues na turma 135080 (AI AOPL 2026/2 M1)

**Tarefa:** #292 · **Pedido em:** 2026-10-19 09:03 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "adicione na lista de alunos da turma *AI AOPL 2026/2 M1 (código: 135080) - CEPLAS MANHÃ*
o aluno *Erick Rafael Rodrigues*, pra que ele apareca pra eu inserir no banco de dados com o arquivo
*criarUsuariosBancoDados.html*"
**Objetivo:** o aluno **Erick Rafael Rodrigues** aparece na turma **135080 — AI AOPL 2026/2 M1
(manhã, AI CEPLAS)** da lista de presença única (`scripts/LISTAPRESENCA.js`), para o usuário criar
o usuário dele no banco pela página `scripts/criarUsuariosBancoDados.html`.

### Escopo

- **Entra:** uma entrada nova de aluno na turma 135080 da UC "Introdução a Tecnologia da Informação
  e Comunicação" em `scripts/LISTAPRESENCA.js` (nome, e-mail `nome.sobrenome@senai.local`, senha
  inicial de 6 caracteres e `naChamada: false`, como os demais alunos novos).
- **Não entra:** criar/alterar usuário no Supabase (o usuário faz pela página), mudar a página
  `criarUsuariosBancoDados.html`, as outras turmas/UCs e a chamada oficial (`naChamada`).
- **Pronto quando:** o aluno aparece na lista da turma; o arquivo continua sendo JavaScript válido;
  nenhum outro aluno/turma muda.
- ⚠️ Dados pessoais (LGPD): o arquivo já é de lista de alunos e fica fora do site; não copiar o nome
  para outro lugar.

### #292.1 — Acrescentar o aluno na turma 135080

**Próximo passo:** — (entregue em 2026-10-19 09:06). **O usuário cria o acesso pela página.**

- **Nível:** LEVE — só uma entrada de dados no `.js` da lista, sem lógica.
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash — nunca outro
- **Executor:** DeepSeek Harness (deepseek-flash) (local · main)
- **Descrição:** em `scripts/LISTAPRESENCA.js`, na turma `codigo: "135080"` (UC "Introdução a
  Tecnologia da Informação e Comunicação"), acrescentar como **último aluno** (número 35):
  `nome: "Erick Rafael Rodrigues"`, `email: "erick.rodrigues@senai.local"`, `senha` inicial de 6
  caracteres, `naChamada: false` (entra fora da chamada oficial, como os alunos incluídos depois).
- **Critérios de aceitação:** o aluno aparece na lista da turma 135080 com e-mail único (sem
  repetir e-mail já existente) e senha inicial; o arquivo continua válido; mais nada muda.
- **Entrega:** `scripts/LISTAPRESENCA.js` — entrada nova depois de "Aluno Senai (usuário de teste do
  professor)" (número 34), na turma `135080`: `{"numero": 35, "nome": "Erick Rafael Rodrigues",
  "email": "erick.rodrigues@senai.local", "senha": "GrScYp", "naChamada": false}`. Nenhuma outra
  turma/aluno mudou.
- **Verificação:** `node --check scripts/LISTAPRESENCA.js` OK; `erick` aparece 1 vez (nome e e-mail,
  linhas 378–379) e o e-mail `erick.rodrigues@senai.local` não repete; o código `135080` aparece uma
  só vez no arquivo (UC "Introdução a Tecnologia da Informação e Comunicação").
- **Anotação:** o aluno entra com `naChamada: false` (fora da chamada oficial), como os demais
  incluídos depois; a página `criarUsuariosBancoDados.html` lê a lista por `LISTAPRESENCA.js`.
