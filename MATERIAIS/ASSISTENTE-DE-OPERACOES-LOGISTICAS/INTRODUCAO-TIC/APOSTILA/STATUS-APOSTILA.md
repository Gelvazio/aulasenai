# 📘 STATUS DA APOSTILA — INTRODUCAO-TIC

> Regra "REGRAS APOSTILAS" (`docs/regras/apostilas.md`). Estado geral no `STATUS.md` da raiz
> (Etapas 79, 81 e 83). Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` ·
> `👀 Aguardando validação`.

**Apostila (única):** `APOSTILA-INTRODUCAO-TIC.md` → `APOSTILA-INTRODUCAO-TIC.html` (+ PDF, fora do
Git) · **Fontes:** `CONTEUDO/INTRODUCAO.md` e `CONTEUDO/CAPITULO-01.md` a `CAPITULO-10.md` ·
**Gerador:** `assets/gerador-apostilas/gerar_apostila.py` (sem `--edicao`).

**Versão 2.1** — 28 páginas, **sem vídeos e sem exercícios** (o professor faz à parte;
`apostila_sem_videos_e_exercicios` no `materia.json`) e com as referências complementares
(`referencias_complementares` no `materia.json`).

| Parte | Status |
|---|---|
| Introdução + capítulos 01 a 10 (teoria, resumo, glossário) | 👀 Aguardando validação |
| Conferência Markdown × ementa (`--conferir`) | ✅ 100% (277/277) em 2026-10-08 09:38 |
| HTML gerado a partir do Markdown completo | ✅ 2026-10-08 09:38 (versão 2.1) |
| PDF (headless) | ✅ 28 páginas, "Página N de 28" e sem a faixa azul (2026-10-08 09:39) |

## Histórico

- **2026-10-03 a 2026-10-07 — V1** (versão 1.0, 84 páginas, com vídeos e exercícios).
- **2026-10-08 08:52 — V2** (versão 2.0, reduzida, 28 páginas) em `CONTEUDO-V2/`
  (plano `docs/apostila-itic-v2-40-paginas.md`).
- **2026-10-08 09:05 — V2 versão 2.1:** S2 no cap. 01, S3 no cap. 04, NBR 10520 e NBR 14724
  declaradas, referências complementares.
- **2026-10-08 09:38 — V1 removida a pedido do usuário** (plano `docs/remover-apostila-itic-v1.md`);
  a V2 passou a ser a apostila única, com o nome padrão. Os capítulos da V1 (com vídeos e
  exercícios) ficam só no histórico do Git (commit anterior à remoção).
