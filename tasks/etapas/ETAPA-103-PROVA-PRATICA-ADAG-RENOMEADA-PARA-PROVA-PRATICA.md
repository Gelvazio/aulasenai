> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 103 — Prova Prática ADAG renomeada para PROVA-PRATICA-01.html (tarefa pequena, 2026-10-08 20:26:16)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 103.1 | `git mv` de `PROVA-PRATICA-06-10-2026.html` para `PROVA-PRATICA-01.html`; referências trocadas em `index.html` (card), `media-final.json`, `AVALIACAO-MEDIA-FINAL.html`, fonte `PROVA-PRATICA-ADAG-SALETE.md` (campo Página), `CORRECAO-PROVA-ADAG.md` e `STATUS-ATIVIDADES.md` (planos antigos em `docs/` e seeds mantidos como histórico) | ✅ Concluído | 2026-10-08 20:26:16 | `grep` sem o nome antigo fora do histórico |
| 103.2 | Banco: `atividade.pagina` do id 82 atualizada para o nome novo (SQL `database/2026-10-08-prova-pratica-01-renomear-pagina.sql`, valor antigo no comentário) | ✅ Concluído | 2026-10-08 20:26:16 | Consulta: id 82 com a página nova, 60 tópicos e 586 respostas intactos |
| 103.4 | Texto do card no índice das atividades: "PROVA PRÁTICA 01" / "Prova Prática 01 — Aulas 01 a 07" (o link já apontava para o arquivo novo) | ✅ Concluído | 2026-10-08 20:28:06 | Leitura do `index.html` |
| 103.5 | Banco: `nome_atividade` = "Prova Prática 01" e descrição ajustada (id 82; valores antigos no SQL); `Rótulo da aula` da fonte `.md` também | ✅ Concluído | 2026-10-08 20:29:43 | Consulta com `returning` |
| 103.6 | Título da página `PROVA-PRATICA-01.html` = "Prova Prática 01" (título da aba, cabeçalho e rodapé) | ✅ Concluído | 2026-10-08 20:30:08 | `grep` |
| 103.3 | Aceite do usuário (abrir pelo card do índice) | ✅ Concluído | 2026-10-08 20:30:36 | Linha Aula/Conteúdo-base nas 10 práticas |
