## Etapa 371-1e2ac8a5 — Banco de Dados: pendências finais (status, slides, PDF, menu, revisão da ementa)

**Tarefa:** #244-1e2ac8a5-32a3-4bfd-8f59-95ca4e0af187 · **Pedido em:** 2026-10-16 21:46 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-790c3677-2mknbc)
**Pedido:** "Corrija tudo que está errado. Faça os slides das aulas. O PDF da apostila. O menu da atividade, a revisão das ementas."
**Objetivo:** fechar o que falta na matéria Banco de Dados (Técnico em Informática para Internet): status em dia, slides das 20 aulas, PDF da apostila, menu das atividades e revisão da ementa.

> ⚠️ **Tarefa grande** (várias partes, gerador novo de slides, exceção à regra do navegador):
> plano aprovado em 2026-10-16 22:05 com a mudança do usuário: **sem slides e sem PDF da apostila**.

### Escopo (proposta, para aprovação)

**Entra (só a matéria `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/`):**
- **Corrigir os status:** regenerar `STATUS_MATERIA.md` (está de 2026-10-10, mostra 95% e peças
  que já existem como faltando) pelo `scripts/status-materias/gerar_status_materia.py`; coluna
  Slides do `AULAS/STATUS-AULAS.md`; `STATUS-APOSTILA.md` (PDF) e `STATUS-EMENTAS.md` (revisão).
- **Menu das atividades:** `ATIVIDADES/MENU-ATIVIDADES.js` no padrão das outras matérias (só o item
  👥 Equipes, decisão de 2026-10-08) e as tags do menu nas páginas pelo
  `assets/gerador-menu/tags_menu.py`.
- **Revisão da ementa:** conferir `EMENTA-CHALKIE-AI.md` e `materia.json` contra a UC 16 da ementa
  do curso (capacidades, conhecimentos, carga horária) e contra as 20 aulas; registrar o resultado
  no `STATUS-EMENTAS.md`. O item "revisado por professor" só é marcado pelo usuário.
- **Regra nova (#244.9):** a IA não gera slides de aula (nem PDF nem PPTX) — o professor gera em
  outro momento; vale para todas as aulas. Gravada no `AGENTS.md`, em `materias-global.md`, no
  `RECADOS.md` e anotada nas etapas de todas as tarefas de aulas abertas.

**Não entra:** slides (PDF ou PPTX) e PDF da apostila (decisões de 2026-10-16); mudar aulas,
atividades ou a apostila; qualquer coisa no banco.

**Pronto quando:** status regenerados e coerentes, menu nas páginas, ementa revisada com relatório,
regra dos slides gravada e aceite do usuário.

### Riscos

| Risco | Plano B |
|---|---|
| PDFs e PPTX estão no `.gitignore` (`*.pdf`, `*.pptx`) | Adicionar com `git add -f`, como os slides de Testes de Front-End; ou entregar só por arquivo, se o usuário preferir |
| PDF publicado no site abre mesmo com aula bloqueada | Não publicar (`.vercelignore` já tira `*.pdf`); a frente local sobe ao bucket privado |
| LibreOffice muda fonte (Century Gothic ausente na nuvem) | Usar fonte com equivalente instalado e registrar |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 22:05 | **Não gerar slides** (nem PDF nem PPTX), em nenhuma aula: o professor gera em outro momento. #244.4, #244.5 e #244.7 canceladas; #244.6 cancelada (sem Chromium). Plano aprovado sem essas partes | Usuário | Pedido do usuário |
| 2026-10-16 21:58 | PDF da apostila: **não** libera o Chromium; o usuário gera pelo botão 📥 Exportar PDF (#244.6 sai do escopo) | Usuário | Regra do navegador mantida |
| 2026-10-16 21:58 | Slides (PPTX + PDF) e PDFs vão para o Git com `git add -f` | Usuário | Mesmo padrão de Testes de Front-End |
| 2026-10-16 21:58 | Depois da revisão da IA, marcar "Conteúdo foi revisado por professor" | Usuário | A revisão vale como a do professor |
| 2026-10-16 21:58 | Plano **não aprovado** ainda: o usuário quer mudar algo (aguardando o quê) | Usuário | — |

### #244.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** —

- **Entrega:** plano na etapa · **Verificação:** aprovado pelo usuário em 2026-10-16 22:05 (com a mudança dos slides).

- **Nível:** MEDIO — leitura de regras e plano em `.md`.

### #244.2 — Status regenerados e menu das atividades

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — script gerador e um `.js` de dados + tags nas páginas.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o), a pedido do usuário.
- **Entrega:** `STATUS_MATERIA.md` regenerado pelo `gerar_status_materia.py` (✅ CONCLUÍDA,
  154/154; só o de Banco de Dados entrou no commit — os das outras matérias e o
  `tasks/ORDEM-MATERIAS.md` ficaram de fora); coluna Slides do `AULAS/STATUS-AULAS.md` = ⛔
  (professor, regra #244.9); PDF do `APOSTILA/STATUS-APOSTILA.md` = ⛔ (o professor exporta pelo
  📥 Exportar PDF); `ATIVIDADES/MENU-ATIVIDADES.js` (só 👥 Equipes) e tags do menu nas 45 páginas
  de `ATIVIDADES/` pelo `tags_menu.py`; listas de matérias com menu em `docs/regras/`.
- **Verificação:** `node --check` no `MENU-ATIVIDADES.js`; `tags_menu.py` respondeu "menu aplicado"
  nas 45 páginas; leitura dos status gerados. A barra do menu continua desligada para todas as
  matérias (`MENU_ATIVIDADES_LIGADO = false` em `js/menu.js`) — sem navegador, não conferido na tela.
- **Fora daqui:** a revisão da ementa no `STATUS-EMENTAS.md` é da #244.3.

### #244.3 — Revisão da ementa

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — comparação de ementa × UC do curso × aulas, relatório em `.md`.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o), a pedido do usuário.
- **Entrega:** seção "Revisão da ementa" no `STATUS-EMENTAS.md` (tudo conforme: C1–C14, S1–S2,
  50 conhecimentos, 80 h, cobertura pelas 20 aulas); checklist da Seção XII do
  `EMENTA-CHALKIE-AI.md` atualizado (14923 chars, dentro da faixa); "Conteúdo foi revisado por
  professor" marcado (decisão do usuário de 21:58). 👀 Dois pontos para o usuário decidir, sem
  alteração: "empresas fictícias" na regra IX.5, SA 1 e prompt 1 × regra "Você como aluno
  consultor"; caminho dos slides no `materia.json`.
- **Verificação:** script de conferência na pasta temporária da sessão (só leitura), contra a
  ementa do curso e a transcrição do PDF oficial (págs. 79–82); contagem de caracteres da ementa.

### #244.4 — Gerador de slides + aulas 01 a 10

**Próximo passo:** — ⛔ cancelada em 2026-10-16 22:05 (decisão do usuário: sem slides e sem PDF da apostila).

- **Nível:** MEDIO — gerador Python novo (1 a 3 arquivos).

### #244.5 — Slides das aulas 11 a 20

**Próximo passo:** — ⛔ cancelada em 2026-10-16 22:05 (decisão do usuário: sem slides e sem PDF da apostila).

- **Nível:** MEDIO — rodar o gerador e conferir.

### #244.6 — PDF da apostila

**Próximo passo:** — ⛔ cancelada em 2026-10-16 22:05 (decisão do usuário: sem slides e sem PDF da apostila).

- **Nível:** MEDIO — impressão headless do HTML gerado.

### #244.7 — Slides no Storage privado (só local)

**Próximo passo:** — ⛔ cancelada em 2026-10-16 22:05 (decisão do usuário: sem slides e sem PDF da apostila).

- **Nível:** PESADO — Storage e banco (só o Claude Code local).

### #244.9 — Regra: a IA não gera slides de aula

**Próximo passo:** — (entregue).

- **Nível:** LEVE — só `.md`.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o), assumida em 2026-10-16 22:04
  a pedido do usuário (liberada da frente nuvem · ccr-790c3677-2mknbc).
- **Entrega:** regra 11 do `AGENTS.md`; seção "Sem slides" em `.claude/rules/materias-global.md`;
  linha no `docs/HISTORICO-REGRAS.md`; recado para `todas` no `tasks/RECADOS.md`; aviso no topo das
  etapas 351-c05fdb13, 353 a 369, 370-73eb24d3, 137-13665a7e e 163-6b8cbe04.
- **Verificação:** leitura dos arquivos alterados; `materias-global.md` com 2,2 KB (≤ 5 KB);
  visualizador regenerado.

### #244.8 — Aceite do usuário

**Próximo passo:** 👀 o usuário confere a #244.2, a #244.3 e a #244.9 e decide os 2 pontos do
`STATUS-EMENTAS.md` (seção "Revisão da ementa").

- **Nível:** LEVE — conferência do usuário.
