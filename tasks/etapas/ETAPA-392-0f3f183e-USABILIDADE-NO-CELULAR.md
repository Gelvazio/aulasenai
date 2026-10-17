## Etapa 392-0f3f183e — Usabilidade no celular (textos maiores, ícones e layout fluido)

**Tarefa:** #265-0f3f183e-cb2c-47eb-824f-c453ec251e01 · **Pedido em:** 2026-10-17 18:52 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a26b3c0e-1ljztf)
**Pedido:** "Melhore a usabilidade pra celular, com textos maiores, ícones sugestivos, layout fluido, pra facilitar o uso"
**Objetivo:** deixar as páginas do site fáceis de usar no celular: texto maior, ícones que dizem o que cada botão faz e layout que se ajusta à largura da tela.

### Escopo

- **Páginas do aluno:** `login.html`, `index.html` (cursos), índice do curso e da matéria
  (`MATERIAIS/<CURSO>/index.html`, página da matéria e `ATIVIDADES/index.html`), atividades
  objetivas, práticas/discursivas, de Excel e em equipe, apostila e o header de todas elas.
- **Levantamento (2026-10-17):** o texto das páginas do aluno usa 12–14 px fixos; poucas regras para
  tela pequena (`@media`); botões só com texto ("Entrar", "SAIR", "HOME"); toda página carrega
  primeiro o `js/header-usuario.js`, que já injeta o CSS do header.
- **Como fazer (uma camada só, sem mexer página por página):**
  1. CSS novo `assets/css/celular.css`, carregado pelo `js/header-usuario.js` em toda página,
     **depois** do CSS da página, só para tela de até 768 px: texto base 17 px e nada abaixo de
     15 px; títulos com `clamp()`; botões, links e alternativas com no mínimo 48 px de altura
     (fácil de tocar); campos com 16 px (o iPhone não dá zoom); conteúdo com largura 100% e
     margem de 16 px; grades e linhas de botões viram uma coluna; tabelas e imagens sem estourar
     a tela (tabela rola de lado dentro da caixa). No computador nada muda.
  2. **Ícones que dizem o que cada botão faz:** header (🏠 Início, 🔑 Entrar, 🚪 Sair, 👥 Equipes),
     login (🔑 Entrar, ➡️ Continuar, 🚪 Sair), cards do índice (📝 objetiva, ✍️ prática, 📊 Excel,
     👥 equipe, 📘 apostila) e botões das atividades (📤 Enviar, 💾 Gravar, 📄 Exportar PDF,
     ✅ Ver resultado), nos JS e nos modelos dos geradores.
  3. **Gerar de novo** as páginas do aluno com os geradores, para os ícones dos modelos chegarem
     às páginas já publicadas.
- **Não entra:** páginas só do professor (painel, correção, turmas, alunos, relatórios); mudar o que
  cada página faz; banco.
- **Pronto quando:** `celular.css` carregado em toda página do aluno, ícones nos botões, páginas
  geradas de novo, `node --check` e geradores sem erro. ⚠️ Sem navegador (regra do projeto): o
  **teste no celular é do usuário** depois da entrega.
- ⚠️ `js/header-usuario.js` não tem orientação em `docs/` (`docs-antes-de-editar.md`): aviso dado
  ao usuário junto do plano; a #265.6 cria a orientação.

### Riscos

| Risco | Plano B |
|---|---|
| O CSS da página vencer a camada do celular | `celular.css` entra por último (depois do carregamento da página) e usa seletores com o mesmo peso dos da página |
| Regenerar as páginas atropelar trabalho de outra frente | Gerar só as páginas do aluno, conferir o diff antes do commit e não incluir arquivo que outra frente tenha reservado |
| Mudança no computador sem querer | Toda regra nova fica dentro de `@media (max-width: 768px)` |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 18:57 | Plano aprovado ("Sim") | Usuário (Gelvazio) | Aprovação da tarefa grande |
| 2026-10-17 18:54 | Escopo: só o que o aluno usa | Usuário (Gelvazio) | Resposta à pergunta de escopo |
| 2026-10-17 18:54 | #243.3 liberada (nenhuma aula feita) para esta frente pegar a #265.1 | Claude Code (nuvem · ccr-a26b3c0e-1ljztf) | 1 subtarefa reservada por frente; o pedido novo veio depois |

### #265.1 — Levantamento das páginas e plano (tarefa grande)

**Próximo passo:** — (concluída).

- **Nível:** PESADO — mudança em massa em várias páginas e folhas de estilo ligadas.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Entrega:** plano nesta etapa · **Verificação:** aprovado pelo usuário em 2026-10-17 18:57.

### #265.2 — Camada `celular.css` carregada pelo header

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — 1 CSS novo e 1 ajuste com lógica no `js/header-usuario.js`.
- **Modelo:** só Sonnet — nunca outro
- **Executor:** Claude Code (Sonnet 5.5 · executor-medio; líder Opus 5.5) (nuvem ·
  ccr-3274812b-0nj48o) — o líder só reservou, revisou e commitou.
- **Entrega:** `assets/css/celular.css` (novo, 173 linhas): tudo dentro de
  `@media screen and (max-width: 768px)` (não vale na impressão nem no computador; fora dele só
  tokens no `:root`; sem `!important`): texto base 17 px e nada abaixo de 15 px, títulos com
  `clamp()`, botões/links/alternativas com 48 px, campos com 16 px, conteúdo a 100% com margem de
  16 px, grades e linhas de botões em uma coluna (menos a linha da atividade do professor:
  link + ON/OFF + ✏️ + − continuam juntos), tabelas rolando de lado, imagens no limite da tela,
  apostila sem cortar texto. `js/header-usuario.js`: `incluirCssCelularPorUltimo()` põe a folha
  no fim do `<head>` em toda página (antes da sessão e de novo depois dos CSS do header).
  **Ajuste aceito pelo líder:** `login.html` não carrega o header, então ganhou o
  `<link>` do `celular.css` depois do `login.css`.
- **Verificação:** 4 rodadas de revisão por 3 revisores só de leitura (cascata e computador
  intacto, regras de código, cobertura das páginas do aluno): 17 → 14 → 10 → 0 achados; o
  bloqueante da linha do professor no índice foi resolvido (seletor 0,3,0 contra 0,2,0).
  Líder: `node --check js/header-usuario.js`; um único `@media`; linhas ≤ 100; `<link>` sem
  duplicar (o `incluirCssHeader` não repete). ⚠️ Sem navegador: conferir no celular.

### #265.3 — Ícones no header, no login e nos cards do índice

**Próximo passo:** ícones do plano (🏠 Início, 🔑 Entrar, 🚪 Sair, 👥 Equipes; login 🔑 ➡️ 🚪;
cards 📝 ✍️ 📊 👥 📘) no `js/header-usuario.js`, `login.html` e
`assets/gerador-indices/gerar_indices.py`.

- **Nível:** MEDIO — `js/header-usuario.js`, `login.html` e `assets/gerador-indices/gerar_indices.py`.
- **Modelo:** só Sonnet — nunca outro

### #265.4 — Ícones e toque fácil nas páginas de atividade

**Próximo passo:** esperar a #265.2.

- **Nível:** PESADO — mais de 3 arquivos ligados (geradores, modelo da discursiva, JS e CSS das atividades).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #265.5 — Gerar de novo as páginas do aluno

**Próximo passo:** esperar a #265.3 e a #265.4.

- **Nível:** PESADO — mudança em massa (páginas de todas as matérias).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #265.6 — Orientação em `docs/` do `header-usuario.js` e da camada do celular

**Próximo passo:** esperar a #265.5.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
