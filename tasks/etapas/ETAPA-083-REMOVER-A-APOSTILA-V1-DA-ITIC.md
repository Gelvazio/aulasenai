> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 83 — Remover a apostila V1 da ITIC (tarefa grande, pedida em 2026-10-08 09:36)

Plano: [docs/remover-apostila-itic-v1.md](docs/remover-apostila-itic-v1.md).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 83.1 | Plano criado; aprovação do usuário e decisões D1 (nome da V2) e D2 (objetiva id 85) | ✅ Concluído | 2026-10-08 09:37 | Usuário aprovou; D1 = V2 vira a principal; D2 = conferir a id 85 com a V2 |
| 83.2 | Apagar os arquivos da V1 | ✅ Concluído | 2026-10-08 09:38 | `git rm` de 13 arquivos; PDF (14 MB) e pastas vazias apagados do disco |
| 83.3 | Aplicar a D1 e gerar a apostila de novo (conferência 100%) | ✅ Concluído | 2026-10-08 09:39 | `CONTEUDO-V2/` → `CONTEUDO/` e arquivos sem "-V2" (`git mv`); `materia.json` versão 2.1 com `apostila_sem_videos_e_exercicios` e `referencias_complementares` (sem `edicoes_apostila`); gerador lê essas opções sem edição; conferência 277/277; PDF 28 páginas "Página N de 28" |
| 83.4 | Menu, fonte da id 85 e `STATUS-APOSTILA.md` sem link para a V1 | ✅ Concluído | 2026-10-08 09:42 | Menu já aponta para `APOSTILA-INTRODUCAO-TIC.html` (nome padrão); conteúdo-base da discursiva id 81 corrigido (página sem mudança); id 85 já aponta para o nome padrão; `STATUS-APOSTILA.md` reescrito com histórico |
| 83.5 | Aplicar a D2 (se aprovada) | ✅ Concluído | 2026-10-08 09:42 | 100 questões conferidas com a V2: 87 com resposta; 13 reescritas (12, 14, 26, 36, 41, 52, 54, 65, 71, 86, 92, 95, 99) com a MESMA letra do gabarito (banco id 85 sem mudança); página regerada sem gabarito |
| 83.6 | Regras (`docs/regras/apostilas.md`, `CLAUDE.md`, histórico) | ✅ Concluído | 2026-10-08 09:43 | Versão das regras 2026-10-08 09:42:37 (resumo e histórico completo); visualizador lê o mesmo formato |
| 83.7 | Aceite do usuário | ✅ Concluído | 2026-10-13 12:26 | "15-ok" |
