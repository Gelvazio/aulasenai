> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 79 — Apostila da ITIC versão 2 (até 40 páginas) (pedida em 2026-10-08 08:36:51)

Plano: [docs/apostila-itic-v2-40-paginas.md](docs/apostila-itic-v2-40-paginas.md). A V1 (84 páginas) não muda.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 79.0 | Plano criado e aprovação do usuário (aprovado: os 10 capítulos de uma vez; PDF headless para contar páginas) | ✅ Concluído | 2026-10-08 08:45 | Resposta do usuário no chat |
| 79.1 | Opção `--edicao=V2` no gerador (módulo novo `assets/gerador-apostilas/edicao_apostila.py`) + `edicoes_apostila` no `materia.json` | ✅ Concluído | 2026-10-08 11:40 | `py_compile` OK; `--conferir` da V1 continua 100% |
| 79.2 | `CONTEUDO-V2/INTRODUCAO.md` condensada | ✅ Concluído | 2026-10-08 08:48 | Conferência 277/277 (100%) |
| 79.3 | Capítulos 01 a 10 condensados em `CONTEUDO-V2/` (teoria + resumo + glossário; todos os conteúdos oficiais e termos oficiais mantidos) | ✅ Concluído | 2026-10-08 08:52 | Gerador sem ⚠️ |
| 79.3a | **Mudança de escopo (pedido do usuário, 2026-10-08 08:48):** a V2 sai **sem vídeos e sem exercícios** (ele fará à parte); gerador aceita capítulo só com Teoria/Resumo/Glossário quando a edição tem `sem_videos_e_exercicios` | ✅ Concluído | 2026-10-08 08:48 | Teste: cap. 01 sem vídeos/exercícios gerou o HTML; V1 continua exigindo as duas seções |
| 79.3b | **Pedido novo (2026-10-08 08:48):** paginação "Página N de T" ao exportar PDF em **todas** as apostilas (`assets/js/apostila.js`) + regra no `CLAUDE.md` global (cópia em `.claude/regras-globais/` sincronizada) | ✅ Concluído | 2026-10-08 08:48 | `node --check` OK; `diff` global × cópia igual |
| 79.4 | Markdown completo V2 + conferência 100% | ✅ Concluído | 2026-10-08 08:52 | `--conferir`: 277/277 |
| 79.5 | HTML V2 (versão 2.0) | ✅ Concluído | 2026-10-08 08:52 | Versão 2.0 na capa e no rodapé |
| 79.6 | Contagem de páginas ≤ 40 | ✅ Concluído | 2026-10-08 08:52 | PDF headless: 28 páginas; rodapé "Página N de 28" |
| 79.7 | Regra, status e commit (+ pedido do usuário: PDF **sem a faixa azul da esquerda** em todas as apostilas, `assets/css/apostila.css`, regra no global e no projeto) | ✅ Concluído | 2026-10-08 08:52 | Imagem da página 6 do PDF sem a faixa |
| 79.8 | Aceite do usuário | 👀 Aguardando validação | — | — |
