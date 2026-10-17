## Etapa 371-1e2ac8a5 — Banco de Dados: pendências finais (status, slides, PDF, menu, revisão da ementa)

**Tarefa:** #244-1e2ac8a5-32a3-4bfd-8f59-95ca4e0af187 · **Pedido em:** 2026-10-16 21:46 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-790c3677-2mknbc)
**Pedido:** "Corrija tudo que está errado. Faça os slides das aulas. O PDF da apostila. O menu da atividade, a revisão das ementas."
**Objetivo:** fechar o que falta na matéria Banco de Dados (Técnico em Informática para Internet): status em dia, slides das 20 aulas, PDF da apostila, menu das atividades e revisão da ementa.

> ⚠️ **Tarefa grande** (várias partes, gerador novo de slides, exceção à regra do navegador):
> plano abaixo aguarda a aprovação do usuário (#244.1).

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
- **Slides das 20 aulas:** gerador novo (Python + `python-pptx`, padrão visual da skill
  `padrao-slides-senai`) que lê cada `CONTEUDO/AULA-NN-*.md` e gera `AULAS/AULA-NN-SLIDES.pptx`;
  o PDF `AULAS/AULA-NN-SLIDES.pdf` sai pelo LibreOffice (sem navegador), no padrão de Testes de
  Front-End. Slides são só apresentação (`docs/regras/materias.md`).
- **PDF da apostila:** `APOSTILA/APOSTILA-BANCO-DE-DADOS.pdf` a partir do HTML (exige Chromium
  headless — exceção à regra do navegador, só se o usuário liberar).

**Não entra:** mudar aulas, atividades ou a apostila; subir os slides ao Storage privado `slides`
(#209) e qualquer coisa no banco — fica para a frente local (#244.7, recado em `RECADOS.md`).

**Pronto quando:** status regenerados e coerentes, menu nas páginas, ementa revisada com relatório,
20 slides (PPTX + PDF), PDF da apostila entregue e aceite do usuário.

### Riscos

| Risco | Plano B |
|---|---|
| PDFs e PPTX estão no `.gitignore` (`*.pdf`, `*.pptx`) | Adicionar com `git add -f`, como os slides de Testes de Front-End; ou entregar só por arquivo, se o usuário preferir |
| PDF publicado no site abre mesmo com aula bloqueada | Não publicar (`.vercelignore` já tira `*.pdf`); a frente local sobe ao bucket privado |
| LibreOffice muda fonte (Century Gothic ausente na nuvem) | Usar fonte com equivalente instalado e registrar |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 21:58 | PDF da apostila: **não** libera o Chromium; o usuário gera pelo botão 📥 Exportar PDF (#244.6 sai do escopo) | Usuário | Regra do navegador mantida |
| 2026-10-16 21:58 | Slides (PPTX + PDF) e PDFs vão para o Git com `git add -f` | Usuário | Mesmo padrão de Testes de Front-End |
| 2026-10-16 21:58 | Depois da revisão da IA, marcar "Conteúdo foi revisado por professor" | Usuário | A revisão vale como a do professor |
| 2026-10-16 21:58 | Plano **não aprovado** ainda: o usuário quer mudar algo (aguardando o quê) | Usuário | — |

### #244.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** perguntar ao usuário o que mudar no plano e pedir nova aprovação.

- **Nível:** MEDIO — leitura de regras e plano em `.md`.

### #244.2 — Status regenerados e menu das atividades

**Próximo passo:** esperar a #244.1.

- **Nível:** MEDIO — script gerador e um `.js` de dados + tags nas páginas.

### #244.3 — Revisão da ementa

**Próximo passo:** esperar a #244.1.

- **Nível:** MEDIO — comparação de ementa × UC do curso × aulas, relatório em `.md`.

### #244.4 — Gerador de slides + aulas 01 a 10

**Próximo passo:** esperar a #244.1.

- **Nível:** MEDIO — gerador Python novo (1 a 3 arquivos).

### #244.5 — Slides das aulas 11 a 20

**Próximo passo:** esperar a #244.4.

- **Nível:** MEDIO — rodar o gerador e conferir.

### #244.6 — PDF da apostila

**Próximo passo:** esperar a #244.1 (exceção do navegador).

- **Nível:** MEDIO — impressão headless do HTML gerado.

### #244.7 — Slides no Storage privado (só local)

**Próximo passo:** esperar a #244.5.

- **Nível:** PESADO — Storage e banco (só o Claude Code local).

### #244.8 — Aceite do usuário

**Próximo passo:** esperar a #244.2 a #244.6.

- **Nível:** LEVE — conferência do usuário.
