# 📘 STATUS DA APOSTILA — REFORCO_LINGUAGENS

> Regra "REGRAS APOSTILAS" do `CLAUDE.md` da raiz: conferência do Markdown completo com a ementa
> (100%) antes dos capítulos e do HTML; um capítulo = uma aula (exceção da matéria: aulas 01–07
> com 6 h e 08–10 com 7 h = 63 h). Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` ·
> `👀 Aguardando validação`.

**Apostila:** `APOSTILA-REFORCO_LINGUAGENS.html` · **Markdown completo:** `APOSTILA-REFORCO_LINGUAGENS.md` ·
**Gerador:** `assets/gerador-apostilas/gerar_apostila.py` · **Fonte do conteúdo:** aulas
`../CONTEUDO/AULA-NN-*.md`, slides em Markdown `../AULAS-CHALKIE-AI/CONTEUDO/` e `../EMENTA-CHALKIE-AI.md`.

| Parte inicial | Status |
|---|---|
| Ementa da matéria: capacidades trocadas pelas 6 da UC 7 da ementa do curso (pedido do usuário) | ✅ 2026-10-07 (14.929 caracteres) |
| `materia.json` completo e literal (ementa da matéria + UC 7 na ementa do curso) | ✅ Concluído |
| Introdução (`CONTEUDO/INTRODUCAO.md`) | 👀 Aguardando validação |
| Conferência Markdown × ementa da matéria (`--conferir`) | ✅ 100% (138/138 itens) em 2026-10-07 |
| HTML gerado a partir do Markdown completo | ✅ Gerado em 2026-10-07 |

| Cap. | Tema | Horas | Teoria | Vídeos (≤ 15 min) | Resumo | Exercícios ITEM | Glossário | Status |
|---|---|---|---|---|---|---|---|---|
| 01 | Tipos de Texto e Contexto de Produção | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 02 | Tema, Assunto e Ideia Principal | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 03 | Intenção Comunicativa e Análise Crítica | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 04 | Coesão e Coerência Textual | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 05 | Tipologias Textuais na Prática | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 06 | Pontuação e Concordância na Escrita | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 07 | Classes de Palavras e Figuras de Linguagem | 6 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 08 | Oralidade e Apresentação em Público | 7 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 09 | Argumentação Oral, Debates e Registros | 7 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |
| 10 | Gêneros Literários, Textos Técnicos e Síntese | 7 | ✅ | ⏳ pendentes | ✅ | ✅ 6 | ✅ 10 | 👀 Aguardando validação |

## Pendências

- ⏳ **Vídeos:** a rede do ambiente em que a apostila foi gerada bloqueia o YouTube, então a
  duração (≤ 15 min) não pôde ser conferida nos metadados. Cada capítulo tem a linha
  `- ⏳ Vídeos pendentes: ...` na seção "Vídeos" (o HTML mostra o aviso). Para incluir: trocar a
  linha por `- [título](url) — mm:ss — canal` (1 a 4 vídeos, conferidos com `curl`), rodar
  `--markdown --forcar` e gerar o HTML de novo.
- ⏳ **Menu:** a matéria não tem `ATIVIDADES/MENU-ATIVIDADES.js`; a apostila ainda não tem link
  no índice das atividades (a capa da apostila já aponta para `../ATIVIDADES/index.html`).
