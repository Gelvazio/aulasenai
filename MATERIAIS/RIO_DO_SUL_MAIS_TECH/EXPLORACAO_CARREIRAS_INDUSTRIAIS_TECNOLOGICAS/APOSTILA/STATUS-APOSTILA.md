# 📘 STATUS DA APOSTILA — EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS

> Regra "REGRAS APOSTILAS" do `CLAUDE.md` da raiz: conferência do Markdown completo com a ementa
> (100%) antes dos capítulos e do HTML; um capítulo por vez, com validação do usuário.
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `👀 Aguardando validação`.

**Apostila:** `APOSTILA-EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS.html` (⬜ ainda não gerada) ·
**Markdown completo:** `APOSTILA-EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS.md` ·
**Gerador:** `assets/gerador-apostilas/gerar_apostila.py` · **Fonte do conteúdo:** `EMENTA-CHALKIE-AI.md`,
UC 6 da `EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md` e as aulas `AULAS/AULA-NN.md` (a matéria ainda
não tem `CONTEUDO/AULA-NN-*.md`; mover/renomear só a pedido do usuário).
**Plano:** `docs/apostila-exploracao-carreiras.md`.

| Parte inicial | Status |
|---|---|
| `materia.json` completo e literal (ementa da matéria + UC 6 na ementa do curso) | ✅ Concluído (2026-10-07) |
| Introdução (`CONTEUDO/INTRODUCAO.md`) | 👀 Aguardando validação |
| Conferência Markdown × ementa da matéria (`--conferir`) | ✅ 100% (130/130 itens) em 2026-10-07 |

| Cap. | Tema | Teoria | Vídeos (≤ 15 min) | Resumo | Exercícios ITEM | Glossário | Status |
|---|---|---|---|---|---|---|---|
| 01 | Panorama do Mercado Industrial e Tecnológico | ✅ | ⚠️ 4 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 11 | 👀 Rascunho em `RASCUNHOS/CAPITULO-01.md` |
| 02 | Profissões do Futuro | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 03 | Autoavaliação de Habilidades e Aptidões | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 04 | Metas Profissionais | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 05 | Plataformas de Emprego e Networking | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 06 | Construção de Currículo | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 07 | LinkedIn e Presença Digital | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 08 | Portfólio Profissional | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |
| 09 | Entrevistas e Apresentação de Carreira | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pendente |

## Pendências

- **Vídeos do capítulo 01:** a sessão em nuvem não acessa o YouTube, então a duração (`mm:ss`) e o
  canal dos vídeos candidatos não puderam ser conferidos. Conferir, trocar `??:??` pela duração,
  apagar os que passam de 15:00 e então mover o capítulo para `CONTEUDO/CAPITULO-01.md` e rodar
  `gerar_apostila.py <pasta da matéria> --markdown`.
- **Divergência ementa da matéria × ementa do curso (a do curso vence):** a matéria lista 6
  capacidades; o curso tem 4 (C1–C4). A apostila usa C1–C4 e mostra as 6 como referência.
  "Preparar currículo e marketing pessoal" não é capacidade no curso (só conhecimento) e foi
  ligada à C4.
- **A ementa não tem glossário, recursos, acessibilidade nem referências oficiais:** os termos do
  glossário dos capítulos são didáticos.
