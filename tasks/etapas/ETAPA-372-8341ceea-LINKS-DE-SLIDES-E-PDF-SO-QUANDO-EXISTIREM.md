## Etapa 372-8341ceea — Links de slides e PDF só quando o arquivo existir

**Tarefa:** #245-8341ceea-7ca4-4a05-976d-e2c73aabe47d · **Pedido em:** 2026-10-16 22:19 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o)
**Pedido:** "crie 1 tarefa pra fazer isso, ligar os links so qd existir os pdf e slides" (resposta ao
ponto 2 da revisão da ementa de Banco de Dados, #244.3: o `materia.json` aponta os slides para
`AULAS/AULA-NN-SLIDES.pdf`, que não existem)
**Objetivo:** link para slides (PDF/PPTX) e para PDF só aparece quando o arquivo existe de verdade,
para o aluno e o professor não clicarem em link quebrado — a IA não gera slides (regra #244.9).

> 🚫 **Sem slides (2026-10-16, #244.9):** esta tarefa **não gera** slides nem PDF; só liga ou
> desliga os links conforme o arquivo exista.

> ⚠️ **Tarefa grande** (mudança em massa: ~93 `.md` citam `AULA-NN-SLIDES.pdf`, mais
> `materia.json`, páginas e geradores): o plano da #245.1 precisa do **"sim"** do usuário antes da
> #245.2.

### Escopo (a confirmar na #245.1)

**Entra:** todas as matérias de `MATERIAIS/`.
- Já está certo: `assets/gerador-indices/gerar_indices.py` só põe o botão "📕 Slides (PDF)" no card
  se `AULAS/AULA-NN-SLIDES.pdf` existir.
- A conferir: aulas de `CONTEUDO/` ("Recursos" com o link dos slides), fontes das atividades
  (`- **Slides:** ../AULAS/AULA-NN-SLIDES.pdf`, de `scripts/banco-de-dados/montar_questoes.py` e
  `scripts/testes-frontend/montar_questoes.py`), campo `slides` das aulas no `materia.json`,
  páginas de atividade que mostram o link (ex.: Testes de Front-End), apostila e demais geradores.
- Regra: link só quando o arquivo existir; arquivo novo do professor → rodar o gerador de novo
  liga o link.

**Não entra:** gerar slides ou PDF; banco de dados; mudar o conteúdo das aulas além do link.

**Pronto quando:** nenhum link para slide ou PDF inexistente nas páginas e nos `.md` da matéria,
geradores ligando o link só com o arquivo presente, regra registrada e aceite do usuário.

### Riscos

| Risco | Plano B |
|---|---|
| Mudança em massa em `.md` de outras frentes (aulas em geração) | Fazer por matéria livre; deixar recado às frentes donas |
| Páginas HTML editadas à mão perdem a mudança ao regerar | Mudar o gerador primeiro e regerar |
| Slides servidos pelo Storage privado (não pela pasta) | Conferir na #245.1 onde cada matéria guarda os slides |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 22:27 | Plano da #245.1 **aprovado** ("sim, pode executar") | Usuário | — |

### #245.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** — (entregue; plano aprovado em 2026-10-16 22:27).

- **Nível:** MEDIO — leitura de geradores e arquivos, plano em `.md`.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o).

**Levantamento (2026-10-16 22:25):**

| Onde | Situação |
|---|---|
| Slides que existem | Só Testes de Front-End (`AULAS/AULA-01..10-SLIDES.pdf`), Reforço de Linguagens (`AULAS-CHALKIE-AI/*.pdf`) e 1 PDF em Fundamentos da Tecnologia |
| Páginas de atividade (objetiva, prática, discursiva) | ✅ Já certo: `gerar_atividades.py` e `gerar_avaliacao_discursiva.py` (`linha_slides`) só põem o link se o arquivo existir |
| Índice `ATIVIDADES/index.html` (`gerar_indices.py`) | ✅ Já certo: botão "📕 Slides (PDF)" só se o arquivo existir |
| Índice antigo do `gerar_atividades.py` (`gerar_index`) | ⚠️ Mostra botão apagado "Arquivo não encontrado" quando falta o arquivo → **esconder** |
| Aulas `CONTEUDO/AULA-NN-*.md` | ⚠️ **Reforço de Matemática: 16 aulas com link clicável** `[AULA-NN-SLIDES.pdf](../AULAS/...)` para arquivo que não existe (aparece quebrado ao abrir o `.md`). Banco de Dados (20) e ITIC do Técnico (1): caminho só em texto, sem link. Testes de Front-End (10): arquivo existe |
| Fontes das atividades (`- **Slides:** ../AULAS/...`) | ✅ Ficam: o gerador só liga o link se o arquivo existir — quando o professor puser o PDF, regerar a página liga o link |
| Campo `slides` das aulas no `materia.json` (5 matérias) | ✅ Fica como **caminho esperado**: nenhum gerador lê esse campo para montar link |

**Plano:**
1. **#245.2 (MEDIO):** (a) `gerar_atividades.py`: o botão de slides do índice antigo some quando
   o arquivo não existe (sem botão apagado); (b) script novo `scripts/slides/ligar_links_slides.py`
   que, nas aulas de `CONTEUDO/`, põe o link `[📕 Slides](../AULAS/AULA-NN-SLIDES.pdf)` quando o
   arquivo existe e deixa o texto "Slides: o professor publica em outro momento" quando não existe
   (idempotente; rodar de novo depois que o professor publicar liga o link).
2. **#245.3 (PESADO):** rodar o script em todas as matérias (muda as 16 aulas de Reforço de
   Matemática, as 20 de Banco de Dados e a 01 da ITIC do Técnico; Testes de Front-End continua com
   o link); registrar a regra "link de slide/PDF só quando o arquivo existir" em
   `docs/regras/materias.md` (§3, item 10) e no histórico; recado às frentes que geram aulas.
3. **#245.4:** aceite do usuário.

**Verificação:** `python -m py_compile` e rodar o script duas vezes (a segunda sem mudança);
conferir por `grep` que não sobra link para slide inexistente. Sem navegador.

### #245.2 — Geradores ligam o link só se o arquivo existir

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código Python com lógica em 1 a 3 geradores.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o).
- **Entrega:** `gerar_atividades.py`: função `link_slides` — o card do índice antigo só mostra o
  botão dos slides quando o arquivo existe (antes: botão apagado "Arquivo não encontrado").
  Script novo `scripts/slides/ligar_links_slides.py`: nas aulas de `CONTEUDO/`, slide existente
  (PDF ou PPTX) → link `[📕 Slides da aula NN (PDF)](../AULAS/...)`; link para slide inexistente →
  caminho entre crases + "(o professor publica em outro momento)"; caminho que já estava entre
  crases e sem arquivo fica como está (Banco de Dados e ITIC já estavam assim, sem clique).
- **Verificação:** `py_compile` nos dois arquivos; linhas ≤ 100 no script novo; teste numa cópia
  na pasta temporária da sessão: link quebrado → texto; slide PDF existente → link; `.pptx`
  publicado depois → link para o `.pptx`; 2ª rodada sem mudança (idempotente).

### #245.3 — Aplicar nos arquivos já gerados (todas as matérias)

**Próximo passo:** — (entregue).

- **Nível:** PESADO — mudança em massa, mais de 3 arquivos ligados.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o).
- **Entrega:** script rodado em todas as matérias — 26 aulas alteradas (só a linha dos slides):
  16 de Reforço de Matemática (link quebrado → caminho entre crases + "(o professor publica em
  outro momento)") e 10 de Testes de Front-End (caminho → link, os PDFs existem). Banco de Dados
  (20) e ITIC do Técnico (1) já estavam sem clique: não mudaram. Regra em
  `docs/regras/materias.md` (§3, item 10) e `docs/regras/assets-e-geradores.md`; histórico;
  recado para `todas`. Páginas HTML não precisaram regerar (os geradores já escondiam o link).
- **Verificação:** 2ª rodada do script com 0 alterações; `grep` em todos os `.md` e `.html` de
  `MATERIAIS/` por link/`href` para `*SLIDES*.pdf|pptx`: nenhum aponta para arquivo inexistente.

### #245.4 — Aceite do usuário

**Próximo passo:** — (entregue).

- **Entrega:** aceite do usuário em 2026-10-16 22:41 ("245.4 ok"). **Verificação:** resposta do
  usuário; tarefa #245 concluída.

- **Nível:** LEVE — conferência do usuário.
