## Etapa 158-fe84910c — Aula bloqueada: o aluno não pode abrir os slides (Testes de Front-End)

**Tarefa:** #31-fe84910c-d9e1-49dd · **Pedido em:** 2026-10-14 08:23 · **Executor:** Claude Code (local · main)
**Pedido:** "quando 1 aula esta bloqueada, mesmo assim o aluno tem acesso aos slides, verifique,
exemplo de testes de frontend"
**Objetivo:** quando a aula está bloqueada (`aulas.ativo = false`), o aluno não deve chegar aos
slides dela por nenhum caminho do site.
**Próximo passo:** 31.5 — usuário testar de novo (depois da correção 31.6) como aluno o índice e as páginas da Aula 03 de Testes de Front-End.

### Diagnóstico (2026-10-14 08:23, leitura do código + consulta ao banco)

- Banco: em Testes de Front-End, a **Aula 03 (id 95)** está com `ativo = false`, e as duas
  atividades dela também (trigger). O RLS de `atividade` esconde as duas do aluno; o de `aulas`
  deixa o aluno ler todas as aulas.
- **Caminho 1 — índice `ATIVIDADES/index.html`:** o card é bloqueado só **depois** que os scripts
  carregam e consultam o banco (login, atividades, aulas). Até isso terminar, o botão
  "📕 Slides (PDF)" já está ativo no HTML e abre normalmente.
- **Caminho 2 — página da atividade** (`ATIVIDADES-AULA-03-50-QUESTOES.html` e
  `ATIVIDADE-PRATICA-AULA-03.html`): ela não confere o bloqueio. Aberta pelo endereço (histórico,
  link copiado), mostra as questões e o link "Slides da aula" no topo.
- **Caminho 3 — endereço direto do PDF** (`../AULAS/AULA-03-SLIDES.pdf`): é arquivo estático no
  site (Vercel) e abre para qualquer pessoa que tenha o endereço; nenhum código de página consegue
  impedir.

### Escopo

- **Entra:** caminhos 1 e 2, só nas matérias com o bloqueio da aula ligado
  (`assets/js/indice-bloqueio-aula-config.js`; hoje só Testes de Front-End).
- **Não entra (depende da decisão do usuário):** caminho 3 — tirar os PDFs do site e servir pelo
  Supabase Storage privado com link temporário (mexe em banco/storage e em todas as matérias:
  tarefa grande separada).

### Riscos

- Bloquear a página de atividade em matéria sem atividades no banco → plano B: o bloqueio da
  página só vale nas pastas de `PASTAS_COM_BLOQUEIO_AULA`.
- Professor perder acesso → a página só bloqueia quem não é professor.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 31.1 | Aprovação do plano pelo usuário | ✅ Concluído | 2026-10-14 08:31 | Usuário respondeu "sim" no chat (2026-10-14 08:31) |
| 31.2 | Índice: links dos cards ficam travados (classe no `body`) até o bloqueio da aula ser conferido (`atividades-crud-modal.js`, `indice-aula-data.js`, `indice-atividades.css`) | ✅ Concluído | 2026-10-14 08:40 | `node --check` nos 2 JS; nomes globais únicos (`grep`); trava retirada no `finally` e no erro de carga do script |
| 31.3 | Página da atividade: script novo `assets/js/atividade-bloqueio-aula.js` — aluno que não consegue ler a atividade da página (bloqueada ou aula bloqueada) vê "Aula Bloqueada!" e o conteúdo e o link dos slides somem; carregado pelas 10 páginas de Testes de Front-End e pelo gerador | ✅ Concluído | 2026-10-14 08:45 | `node --check`; `grep`: script nas 10 páginas, no gerador da objetiva e no template da prática; `ast.parse` do gerador; nomes globais únicos |
| 31.4 | Documentação: `docs/regras/atividades.md` e cabeçalhos dos scripts | ✅ Concluído | 2026-10-14 08:47 | Leitura de `docs/regras/atividades.md` e dos cabeçalhos |
| 31.6 | Correção após o teste do usuário (2026-10-14 08:52: "o botão de slide continua ativo" e o CSS de bloqueio não aparece para o aluno). Causa: o card achava a aula só pelo 1º link (a prática, inativa em todas as aulas e escondida do aluno pelo RLS) → nenhuma aula e nenhuma matéria → nada bloqueado. Correção em `indice-aula-data.js` (lê todos os links principais do card; matéria pelo nome da pasta + curso quando nenhuma aula vier), `indice-aula-repositorio.js` (`buscarMateriaPeloNomeCard`) e `indice-atividades-bloqueio.js` (link bloqueado do aluno guarda o endereço) | ✅ Concluído | 2026-10-14 09:00 | `node --check` nos 3 JS; nomes globais únicos; consulta como `anon`: o aluno lê as objetivas 01, 02, 04 e 05, a matéria 48 pelo nome e a Aula 03 com `ativo = false` |
| 31.5 | Aceite do usuário (testar como aluno no navegador: índice e página da Aula 03) | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
