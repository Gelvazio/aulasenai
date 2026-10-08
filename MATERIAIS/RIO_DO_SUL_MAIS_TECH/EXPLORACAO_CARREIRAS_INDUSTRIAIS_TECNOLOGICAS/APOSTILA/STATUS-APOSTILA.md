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
| 01 | Panorama do Mercado Industrial e Tecnológico | ✅ | ⚠️ 4 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 11 | ✅ Aprovado pelo usuário (2026-10-07); falta a duração dos vídeos |
| 02 | Profissões do Futuro | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 11 | 👀 Rascunho em `RASCUNHOS/CAPITULO-02.md` |
| 03 | Autoavaliação de Habilidades e Aptidões | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 11 | 👀 Rascunho em `RASCUNHOS/CAPITULO-03.md` |
| 04 | Metas Profissionais | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-04.md` |
| 05 | Plataformas de Emprego e Networking | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-05.md` |
| 06 | Construção de Currículo | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-06.md` |
| 07 | LinkedIn e Presença Digital | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-07.md` |
| 08 | Portfólio Profissional | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-08.md` |
| 09 | Entrevistas e Apresentação de Carreira | ✅ | ⚠️ 3 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-09.md` |

## Teste do pipeline completo (2026-10-08)

Os 9 capítulos passaram pelo gerador real numa cópia temporária (durações fictícias só no teste,
cópia apagada): Markdown completo com 9 capítulos, conferência **130/130 (100%)**, nenhum aviso de
cobertura (tema, capacidades, glossário) e HTML gerado sem erro. **Único bloqueio para publicar o
HTML: a duração real dos 28 vídeos** (lista em `RASCUNHOS/VIDEOS-A-CONFERIR.md`).

## Como finalizar (depois de conferir os vídeos)

1. Trocar `??:??` pela duração real e o canal "(a conferir)" pelo nome do canal; apagar vídeos com
   mais de 15:00 (cada capítulo precisa de ao menos 1 vídeo).
2. Mover `RASCUNHOS/CAPITULO-NN.md` para `CONTEUDO/`.
3. `gerar_apostila.py <pasta da matéria> --markdown` e depois `gerar_apostila.py <pasta da matéria>`.

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
