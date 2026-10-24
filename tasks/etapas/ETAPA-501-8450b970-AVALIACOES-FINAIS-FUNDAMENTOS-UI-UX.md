## Etapa 501-8450b970 — Avaliações finais de Fundamentos de UI/UX (objetiva, prática, média final e menu)

**Tarefa:** #343-1b2043a2-0d87-484f-936d-3cdb7dd8c83c · **Pedido em:** 2026-10-24 16:21 · **Criada por:** Devin (local · main)
**Pedido:** "Crie as avaliações finais da matéria Fundamentos de UI/UX. Use como modelo a matéria INTRODUCAO-TIC: AVALIACAO-OBJETIVA-01.html (50 questões cobrindo as 19 aulas, gabarito equilibrado 13A/13B/12C/12D), AVALIACAO-PRATICA.html (20 questões discursivas × 3 tópicos), AVALIACAO-MEDIA-FINAL.html, media-final.json, MENU-ATIVIDADES.js. NÃO exponha gabaritos nas páginas do aluno. Atualize STATUS_MATERIA.md. Commit e push na main."
**Objetivo:** deixar as peças de avaliação final da matéria Fundamentos de UI/UX no padrão das demais matérias: fontes em `ATIVIDADES/CONTEUDO/` (objetiva de 50, prática de 20 × 3 e padrão de resposta), páginas geradas pelos geradores oficiais, `media-final.json` na composição da ementa (30% atividades + 40% objetiva 01 + 30% prática), `MENU-ATIVIDADES.js` e `index.html` regerado.

### Escopo

**Entra:**

- `ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-01-QUESTOES.md` — 50 questões (2–3 por aula, cobrindo as 19 aulas), capacidade → contexto → comando, 4 alternativas e gabarito 13 A · 13 B · 12 C · 12 D. Fonte no Git e fora do site (`*QUESTOES.md` já está no `.vercelignore`).
- `ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA.md` — 20 questões × 3 tópicos (0,1 + 0,2 + 0,2 = 0,5 por questão; 10 pontos), contexto "aluno consultor", sem empresa fictícia, sem padrão de resposta na fonte.
- `ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-GABARITO.md` — padrão de resposta e critérios dos 60 tópicos (fora do site, `*GABARITO*` no `.vercelignore`).
- `ATIVIDADES/AVALIACAO-OBJETIVA-01.html` e `ATIVIDADES/AVALIACAO-PRATICA.html` — geradas por `gerar_atividades.py --so` e `gerar_avaliacao_discursiva.py` (sem gabarito na página do aluno).
- `ATIVIDADES/media-final.json` + `ATIVIDADES/AVALIACAO-MEDIA-FINAL.html` — gerada por `gerar_avaliacao_media_final.py`; composição da ementa: atividades 30%, objetiva 01 40%, prática 30%, aprovação ≥ 70 pontos e presença 75%.
- `ATIVIDADES/MENU-ATIVIDADES.js` — só o item 👥 Equipes (padrão de todas as matérias).
- `ATIVIDADES/index.html` regerado por `gerar_indices.py --forcar` (cards das 19 aulas + avaliações).
- `STATUS_MATERIA.md` e `ATIVIDADES/STATUS-ATIVIDADES.md` atualizados; seeds SQL gerados em `database/` (aplicação no banco fica para o Claude Code local).

**Não entra:**

- Aplicar seeds no Supabase (banco só pelo Claude Code local — `multiplas-ias.md`).
- Slides, conteúdo de aula novo, apostila e respostas prováveis da avaliação (subtarefas próprias da #276).

### Riscos

| Risco | Plano B |
|---|---|
| Sobreposição com as subtarefas #276.154–#276.160 | Registrar na etapa e nas Decisões: pedido direto do usuário, executado adiantado; a #276 confere e fecha as subtarefas correspondentes |
| Seed gerado mas não aplicado | Avisar na entrega que a aplicação no banco é do Claude Code local (#276.159) |
| Arquivo de outra sessão em edição (STATUS_MATERIA.md, aula 16) | Merge manual mantendo as duas mudanças; conferir antes do commit |

### Decisões

- **D1 — 2026-10-24:** pedido direto do usuário nesta sessão; executa adiantado o miolo das subtarefas #276.154 (menu/índice), #276.155 (fonte da objetiva), #276.156 (fonte da prática), #276.157 (padrão de resposta) e #276.160 (páginas e média final). Seeds (#276.159, banco) ficam gerados, sem aplicação.

### #343.1 — Fontes das avaliações em `CONTEUDO/`

- **Nível:** MEDIO — conteúdo de avaliação em .md, vários arquivos ligados, com gabarito
- **Descrição:** criar `AVALIACAO-OBJETIVA-01-QUESTOES.md` (50 itens, 19 aulas, gabarito 13/13/12/12), `AVALIACAO-PRATICA.md` (20 × 3 tópicos, 0,1 + 0,2 + 0,2) e `AVALIACAO-PRATICA-GABARITO.md` (60 padrões com critérios certa / meia certa / errada), no padrão da INTRODUCAO-TIC e das fontes da própria matéria.
- **Critérios de aceitação:** 50 itens com 4 alternativas e gabarito equilibrado; 20 itens × 3 tópicos somando 0,5 cada; 60 padrões; nada de gabarito fora de `CONTEUDO/`; contexto de aluno consultor sem empresa fictícia.
- **Entrega:** — · **Verificação:** contagens de ITEM, letras do gabarito e tópicos; `node --check` não se aplica (md)

### #343.2 — Páginas, média final, menu e índice

- **Nível:** MEDIO — rodar geradores oficiais e criar `media-final.json`/`MENU-ATIVIDADES.js`
- **Descrição:** rodar `gerar_atividades.py --so AVALIACAO-OBJETIVA-01-QUESTOES.md`, `gerar_avaliacao_discursiva.py`, criar `media-final.json` (30/40/30 da ementa), rodar `gerar_avaliacao_media_final.py`, criar `MENU-ATIVIDADES.js` e regerar `index.html` com `gerar_indices.py --forcar`.
- **Critérios de aceitação:** 3 páginas geradas sem gabarito exposto; `media-final.json` soma 100 pontos; menu válido (`node --check`); índice com os cards; seeds SQL gerados em `database/` (sem aplicar).
- **Entrega:** — · **Verificação:** leitura dos HTMLs gerados (sem gabarito), validação do JSON, `node --check` no menu

### #343.3 — Status da matéria, quadro e commit

- **Nível:** LEVE — só arquivos de status e quadro
- **Descrição:** marcar as peças ✅ no `STATUS_MATERIA.md` (menu, avaliação objetiva, avaliação prática, média final página e composição), registrar a avaliação no `STATUS-ATIVIDADES.md` e fechar a etapa; commit + push na `main`.
- **Critérios de aceitação:** peças ✅; etapa com entrega e verificação; 1 commit + push.
- **Entrega:** — · **Verificação:** diff do commit
