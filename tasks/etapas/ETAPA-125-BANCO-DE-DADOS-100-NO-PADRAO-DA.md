> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 125 — Banco de Dados 100% no padrão da ITIC, etapa 1 sem a apostila (tarefa grande #20-2ac1a8ec-911b-466f, pedida em 2026-10-09 13:26:40)

**Tarefa:** #20-2ac1a8ec-911b-466f
**Próximo passo:** 125.5 — avaliações objetivas, prática e média final pela regra global (`docs/regras/materias.md` §6); o tópico 6c da aula 19 (125.8) espera o usuário rodar no SQL Editor.

Matéria: `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/` (renomeada em 2026-10-09) · Plano: [docs/banco-de-dados-materia-100.md](../../docs/banco-de-dados-materia-100.md) · Descrição: seção "Pedido e descrição" no fim desta etapa.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 125.0 | Tarefa registrada no `TASKS.md` e no "📌 Tarefas" | ✅ Concluído | 2026-10-09 13:27 | Leitura |
| 125.1 | Plano em `docs/` e aprovação do usuário | ✅ Concluído | 2026-10-09 13:40 | Usuário escolheu: 80 h / 20 aulas, renomear para `BANCO-DE-DADOS`, PostgreSQL, apagar os arquivos antigos |
| 125.2 | Permissão `VERIFICAR`, pasta renomeada `BANCO-DE-DADOS` (links de 21 `index.html`), antigos apagados (gabarito, exemplo-biblioteca, avaliação de outro curso), `EMENTA-CHALKIE-AI.md` v2.0 da UC (80 h) + `STATUS-EMENTAS.md` e `materia.json` | ✅ Concluído | 2026-10-09 13:50 | Ementa 14.923 caracteres; `json.tool` OK; 20 aulas somando 80 h |
| 125.2a | Links quebrados pela troca de nome corrigidos (pedido do usuário, Supabase MCP): banco conferido em todas as colunas de texto — nenhuma referência ao caminho antigo; 22 `index.html` do curso apontam para `BANCO-DE-DADOS`; textos em `STATUS-EMENTAS-CURSOS.md` (linha 158 → VERIFICAR), `ANALISE-GERACAO-AULAS.md`, `INDEX.md` da matéria e `docs/regra-pasta-materia-vinculo-uc.md` | ✅ Concluído | 2026-10-09 14:08 | `git grep` sem o caminho antigo nos HTML; varredura de links de todos os 265 HTML |
| 125.2b | Varredura de links quebrados em todos os HTML (pedido do usuário): corrigidos "← Índice" das 3 atividades de sexta da ITIC (`../index.html`), link da apresentação do professor em Fundamentos da Tecnologia e removidos 12 botões "📄 Questões (.md)" do índice da ITIC (apontavam para fontes com gabarito, fora do Git). Restam 85 links em 34 páginas, todos explicados: `Scripts-Comunicacao` (25 páginas antigas), app do WhatsApp (servidor próprio), 4 atividades de Comunicação Oral sem `ATIVIDADES/index.html` (Etapa 71) e 4 templates dos geradores | ✅ Concluído | 2026-10-09 14:08 | Varredura: 101 → 85 links |
| 125.3 | Aulas em `CONTEUDO/` (uma por vez, cada uma com objetiva e prática — itens 125.3 e 125.4 juntos) + `AULAS/STATUS-AULAS.md`, `STATUS-ATIVIDADES.md`, `PLANO-AULAS.md` | ✅ Concluído — aulas 01 a 20 (última, a 20, em 2026-10-10 22:13) | 2026-10-10 22:13 | Aula 01: 50 questões no HTML sem gabarito; prática 10 × 3 com 30 padrões; índice da matéria e card do curso atualizados; seeds gerados em `database/` (no Git desde 2026-10-09 14:09, fora da Vercel, não aplicados). Aula 16 (2026-10-09 15:33): objetivas das aulas 03, 09 e 14, que tinham ficado fora do seed, acrescentadas em `scripts/gerar-seed-atividades.py` (seed das objetivas agora cobre as aulas 01 a 16). Aula 18 (2026-10-09 18:43): SQL dos dois triggers da aula (histórico de nota e parcela paga) testado num PostgreSQL 16 local; seed das objetivas cobre 01 a 18; índice e card do curso ajustados à mão (o gerador de índices, sem banco, apagaria a faixa SOMENTE ENSALADO) |
| 125.4 | Atividades por aula (objetiva de 50 + prática padrão id 82), fontes em `ATIVIDADES/CONTEUDO/`, `STATUS-ATIVIDADES.md`, índice regerado; seeds só com pedido | ✅ Concluído — feito junto com o 125.3 (objetiva + prática de cada aula, índice e status) | 2026-10-10 22:13 | 20 objetivas de 50 questões e 20 práticas 10 × 3 no repositório e no banco (aula 19 falta o tópico 6c) |
| 125.5 | Avaliações e média final pela regra global de matérias (`docs/regras/materias.md`, seção 6) | ⬜ Pendente | — | — |
| 125.6 | `scripts/analise-materias.py`: sem pendências, exceto as da apostila | ⬜ Pendente | — | — |
| 125.8 | Aplicar os seeds no Supabase (objetivas + práticas das aulas prontas) e registrar em `database/SEEDS-APLICADOS.md` — falta: rodar no Supabase → SQL Editor o insert do tópico 6c da prática da aula 19 de Banco de Dados (atividade id 142): o conector da nuvem cancela o comando porque o texto cita `DELETE FROM parcela;` (o pedido de aprovação não chega ao usuário) | 👀 Aguardando o usuário | — | Conferir no banco: 1 aula + 2 atividades por aula pronta, 50 itens no gabarito de cada objetiva e 30 tópicos de cada prática |
| 125.7 | Aceite do usuário | ⬜ Pendente | — | — |

### Pedido e descrição (vindos do `TASKS.md` em 2026-10-13, sem alteração)

**Matéria:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/` (renomeada em 2026-10-09) (modelo: Introdução à TIC).
**Etapa 1 (esta):** tudo **menos a apostila** (pedido do usuário). A apostila fica para uma etapa 2.

Situação em 2026-10-09 (`tasks/ANALISE-MATERIAS-RELATORIO.json`): ementa OK (14.802 caracteres) e
`ATIVIDADES/index.html` existe; faltam `materia.json`, aulas em `CONTEUDO/`, `AULAS/STATUS-AULAS.md`,
fontes em `ATIVIDADES/CONTEUDO/`, `ATIVIDADES/STATUS-ATIVIDADES.md` e as objetivas de 50 questões.
⚠️ A matéria está em **`IGNORAR`** no `STATUS-PERMISSAO-MATERIA` — passar para `VERIFICAR` é o
primeiro passo (pedido do usuário).

- [x] Plano `docs/banco-de-dados-materia-100.md` com as decisões: permissão `VERIFICAR`; nome da
  pasta (hoje `BANCO_DE_DADOS`, fora do padrão — renomear só se o usuário quiser); destino das pastas
  e arquivos antigos (`DOCUMENTACAO/`, `SLIDES/`, `AVALIACOES/`, `exemplo-biblioteca/`, PDF e
  `.docx`); quantidade de aulas (1 a cada 4 h da ementa). Aprovação do usuário.
- [x] `materia.json` copiado da ementa (capacidades e conhecimentos, sem conteúdo de outra UC).
- [ ] Aulas em `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` (uma por vez) e `AULAS/STATUS-AULAS.md`.
- [ ] Atividades por aula: objetiva de 50 questões e prática no padrão da id 82
  (`docs/REGRAS-ATIVIDADE-PRATICA.md`), fontes em `ATIVIDADES/CONTEUDO/`, sem empresa fictícia;
  `ATIVIDADES/STATUS-ATIVIDADES.md` e `ATIVIDADES/index.html` regerado; seeds no banco só com pedido.
- [ ] Avaliações e média final pela regra global de matérias (`docs/regras/materias.md`, seção 6).
- [ ] Rodar `scripts/analise-materias.py`: Banco de Dados sem pendências, exceto as da apostila.
- [ ] Aceite do usuário.
