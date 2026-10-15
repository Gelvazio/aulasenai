> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 114 — Testes de Front-End: bloqueio da aula e das atividades; LOG escondido; slides em nova aba (tarefa pequena, pedido em 2026-10-09 01:04)

**Tarefa:** #16 (bloqueio da aula × bloqueio da atividade)
**Próximo passo:** ligar o bloqueio da aula nas demais matérias (pasta em `PASTAS_COM_BLOQUEIO_AULA`, `assets/js/indice-bloqueio-aula-config.js`), uma por vez, só quando o usuário pedir.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 16.1 | Tarefa #16 ligada **só em Testes de Front-End**: lista `assets/js/indice-bloqueio-aula-config.js`; botão "Aula liberada / Aula bloqueada" (`aulas.ativo`) antes de "Editar aula" (`assets/js/indice-aula-bloqueio.js` + `indice-aula-data.js`); aula bloqueada = card inteiro bloqueado para o aluno; nela o ON/OFF das atividades nunca bloqueia o card (`indice-atividades-bloqueio.js`); CSS em `indice-atividades-bloquear.css` e `indice-atividades.css`; carregamento em ordem no `atividades-crud-modal.js` | ✅ Concluído | 2026-10-09 01:06 | `node --check` nos 5 JS; nenhum nome global repetido entre os 19 scripts dos índices; chaves do CSS balanceadas; sem navegador |
| 16.2 | Botão "🧾 LOG" escondido em todos os índices (`LOG_ALTERNATIVAS_LIGADO = false`) | ✅ Concluído | 2026-10-09 01:06 | `node --check`; único botão de log do projeto |
| 16.3 | "📕 Slides" dos cards abrem em nova aba: 18 botões em 3 índices (ITIC, Fundamentos da Tecnologia, Testes de Front-End) + gerador de índices (`atributos_nova_aba`) | ✅ Concluído | 2026-10-09 01:07 | `grep`: nenhum botão de slides sem `target="_blank"`; `ast.parse` do gerador |
| 16.4 | Regras: `CLAUDE.md` (versão 2026-10-09 01:07:02), histórico, `TASKS.md` (#16), `docs/regras/atividades.md` | ✅ Concluído | 2026-10-09 01:07 | Leitura dos arquivos |
| 16.5 | Aceite do usuário (índice de Testes de Front-End como professor e como aluno) | ⬜ Pendente | — | — |

### Pedido e descrição (vindos do `TASKS.md` em 2026-10-13, sem alteração)

**Andamento:** ✅ ligada em **Testes de Front-End** (2026-10-09, Etapa 114 do `STATUS.md`). Para as
demais matérias, só acrescentar a pasta em `PASTAS_COM_BLOQUEIO_AULA`
(`assets/js/indice-bloqueio-aula-config.js`), uma por vez, quando o usuário pedir.
**Regra:** `CLAUDE.md`, seção "⏳ REGRA PENDENTE — BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE".

O que fazer (tarefa pequena: só JS/CSS, sem mudar o banco — a coluna `aulas.ativo` já existe e o
RLS da `aulas` já deixa o professor alterá-la):

- [ ] **O ON/OFF de cada atividade NUNCA bloqueia o card inteiro** (os alunos sempre veem a aula,
  os slides e as outras atividades): em `assets/js/indice-atividades-bloqueio.js`, tirar o
  bloqueio do card quando todas as atividades estão OFF (aluno: só 🔒 no link de cada atividade
  bloqueada; professor: sem escurecer o card) — remover `bloquearCardAtividade`,
  `desativarLinkBloqueado` e a classe `bloqueada-professor` desse script.
- [ ] **Botão de bloqueio da AULA**, embaixo no card, **logo antes de "✏️ Editar aula"** (só
  professor): ON/OFF "Aula liberada / Aula bloqueada", gravando em **`aulas.ativo`** (false =
  bloqueada) com `gravarAulaCard` (`assets/js/indice-aula-repositorio.js`). **Só este botão bloqueia
  o card inteiro:** aluno vê o card escurecido com cadeado, links desativados e "Aula Bloqueada!"
  ao clicar (classe `bloqueada`, CSS já existe em `indice-atividades.css`); professor vê o card
  escurecido, mas os links continuam abrindo.
- [ ] Código sugerido: módulo novo `assets/js/indice-aula-bloqueio.js` (`aplicarBloqueioAulaNoCard`,
  `criarBotaoBloqueioAula`), chamado por `assets/js/indice-aula-data.js` em `desenharCardAula` e
  antes de `adicionarBotaoEditarAula`; carregar o módulo em `carregarDataAulasIndice`
  (`assets/js/atividades-crud-modal.js`) antes do `indice-aula-data.js`. ⚠️ Usar nomes de
  constantes exclusivos (constante global repetida derruba o script inteiro — lição da Etapa 113).
  O "Ativa" do modal "Editar aula" é a mesma coluna: ao gravar no modal, atualizar o botão.
- [ ] Estilo em `assets/css/indice-atividades-bloquear.css` (mesmo visual do ON/OFF das atividades,
  com o texto ao lado).
- [ ] Atualizar `docs/regras/atividades.md`, tirar o "PENDENTE" da seção do `CLAUDE.md` (nova
  versão + histórico), commit e aceite do usuário (professor e aluno).
