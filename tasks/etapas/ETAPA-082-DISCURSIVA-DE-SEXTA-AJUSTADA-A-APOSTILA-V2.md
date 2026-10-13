> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 82 — Discursiva de sexta (id 81) ajustada à apostila V2 (tarefa pequena, 2026-10-08 09:33:18)

Pedido (opção B): a prova `ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-DISCURSIVA` passa a cobrar só o que está na apostila ITIC V2. Itens ajustados: 05, 06, 07, 10, 11, 12, 13, 18, 23 e 28 (+ capacidade do 09 de C5 para C1, C3; conteúdo-base = V2).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 82.1 | Fonte `.md` da prova: 10 comandos/tópicos ajustados à V2, capacidade do item 09, conteúdo-base V2 | ✅ Concluído | 2026-10-08 09:35 | Trocas conferidas uma a uma pelo script (cada trecho achado 1 vez) |
| 82.2 | Padrão de resposta (`-GABARITO.md`, local; não entra no commit) dos 10 itens | ✅ Concluído | 2026-10-08 09:35 | Gerador: 30 tópicos com padrão (0 sem padrão) |
| 82.3 | Página HTML e seed regerados (`gerar_avaliacao_discursiva.py`; seed fora do Git) | ✅ Concluído | 2026-10-08 09:35 | 30 questões, 30 tópicos, 30 pontos; HTML sem padrão de resposta; seed `database/2026-10-08-atividade-individual-comunicacao-tecnica-discursiva-seed-atividades.sql` |
| 82.4 | Banco (id 81, `topico_discursivo`): aplicar o seed só se o usuário pedir | ✅ Concluído | 2026-10-08 09:48 | A pedido do usuário: backup `topico_discursivo_backup_20261008_81` (30 linhas, RLS ligado); seed aplicado pelo conector; conferido: 30 tópicos, 30 pontos, 40 respostas mantidas, mudaram só os itens 5, 6, 7, 10, 11, 12, 13, 18, 23 e 28 |
| 82.5 | Aceite do usuário: aceite da remoção da V1 (apostila única 2.1), da discursiva id 81 (já aplicada no banco) e das 13 questões novas da objetiva id 85 | 👀 Aguardando o usuário | — | — |
