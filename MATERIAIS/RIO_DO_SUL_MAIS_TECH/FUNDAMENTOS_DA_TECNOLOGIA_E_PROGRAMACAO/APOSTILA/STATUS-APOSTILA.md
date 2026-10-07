# 📘 STATUS DA APOSTILA — FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO

> Regra "REGRAS APOSTILAS" do `CLAUDE.md` da raiz: conferência do Markdown completo com a ementa
> (100%) antes dos capítulos e do HTML; um capítulo por vez, validado pelo usuário antes do próximo.
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `👀 Aguardando validação` · `⛔ Bloqueado`.

**Apostila:** `APOSTILA-FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO.html` · **Markdown completo:**
`APOSTILA-FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO.md` · **Gerador:** `assets/gerador-apostilas/gerar_apostila.py` ·
**Fonte do conteúdo:** aulas em `../CONTEUDO/AULA-NN-*.md` e `EMENTA-CHALKIE-AI.md`.

**Plano (decisão do usuário, 2026-10-07):** 33 h = **9 capítulos** — 8 aulas de 4 h + 1 aula de 1 h
(avaliação final). Os 8 módulos da ementa (3, 3, 4, 3, 6, 2, 5 e 6 h) foram distribuídos nas aulas;
a coluna "observacao" de cada aula no `materia.json` diz como.

| Parte inicial | Status |
|---|---|
| `materia.json` completo e literal (ementa da matéria + UC 2 da ementa do curso) | ✅ Concluído em 2026-10-07 |
| Aulas da ementa em `CONTEUDO/` (9 aulas) | ✅ Concluído em 2026-10-07 |
| Introdução (`CONTEUDO/INTRODUCAO.md`) | 👀 Aguardando validação |
| Markdown completo (partes iniciais, sem capítulos) | ✅ Gerado em 2026-10-07 |
| Conferência Markdown × ementa da matéria (`--conferir`) | ✅ 100% (174/174 itens) em 2026-10-07 |
| HTML | ⛔ Aguarda o capítulo 01 entrar em `CONTEUDO/` |

| Cap. | Tema | Horas | Teoria | Vídeos (≤ 15 min) | Resumo | Exercícios ITEM | Glossário | Status |
|---|---|---|---|---|---|---|---|---|
| 01 | Tecnologia, Dispositivos Digitais e Cidadania Digital | 4 | ✅ | ⛔ 4 candidatos, duração a conferir | ✅ | ✅ 6 | ✅ 10 | 👀 Rascunho em `RASCUNHOS/CAPITULO-01.md` |
| 02 | Segurança Online, Fake News e Hardware × Software | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 03 | Sistemas Operacionais, Arquivos e Pastas | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 04 | Atalhos de Teclado, Editor de Texto e Apresentações | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 05 | Planilhas Simples e Boas Práticas de Pesquisa | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 06 | Internet Segura e Pensamento Computacional | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 07 | Algoritmos, Fluxogramas e Primeiros Passos no Scratch | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 08 | Scratch: Condições, Repetições, Variáveis e Projeto Autoral | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 09 | Avaliação Final: Prova Conceitual e Apresentação do Projeto | 1 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Pendência do capítulo 01 — vídeos

A rede do ambiente de nuvem em que o capítulo foi escrito bloqueia `www.youtube.com`, então a
duração e o canal dos vídeos não puderam ser conferidos nos metadados (regra: nada de duração
inventada). Para liberar o capítulo:

1. conferir cada vídeo do `RASCUNHOS/CAPITULO-01.md` (máximo 15:00; trocar o que passar);
2. escrever no formato `- [título exato](url) — mm:ss — canal` e apagar o comentário `<!-- -->`;
3. mover o arquivo para `CONTEUDO/CAPITULO-01.md` e rodar
   `C:\Python314\python.exe assets\gerador-apostilas\gerar_apostila.py <pasta da matéria> --markdown --forcar`
   e depois sem opções (gera o HTML; a conferência roda antes).

Teste feito com durações provisórias (desfeito em seguida): o capítulo passou na validação do
gerador (6 exercícios, 10 termos, capacidades iguais ao plano, sem avisos) e o HTML foi gerado.
