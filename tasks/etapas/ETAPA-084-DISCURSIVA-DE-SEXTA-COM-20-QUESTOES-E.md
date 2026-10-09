> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 84 — Discursiva de sexta (id 81) com 20 questões e PDF de até 2 folhas (tarefa pequena, 2026-10-08 10:41:37)

Pedido: deixar só 20 questões e o PDF de cada aluno em no máximo 2 folhas. Decisões do usuário: ficam os **itens 01 a 20** (as respostas dos 2 alunos são desses itens); **2 folhas = frente e verso** (até 4 páginas A4). Mesmo caminho da Etapa 58 (redução de 40 para 30).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 84.1 | Fonte e padrão de resposta: itens 21 a 30 removidos; caso da segunda-feira escrito uma vez (itens 07, 10 e 20 remetem ao 06); duração e pontuação | ✅ Concluído | 2026-10-08 10:45 | Gerador: 20 questões, 20 tópicos, 20 pontos, 0 sem padrão; caso escrito 1 vez |
| 84.2 | PDF compacto só nesta atividade (campos opcionais `PDF compacto` e `Máximo de caracteres` no gerador e no exportador) | ✅ Concluído | 2026-10-08 10:45 | `py_compile` e `node --check` OK; sem os campos, o gerador e o PDF continuam iguais (padrão 3000 caracteres, layout normal); no compacto sai a caixa de capacidade de cada questão (fica no quadro do topo); limite 500 caracteres |
| 84.3 | Medição do PDF (larguras da Helvetica, sem navegador): até 4 páginas | ✅ Concluído | 2026-10-08 10:45 | Simulação com larguras da Helvetica (reportlab): em branco = 4 páginas; todas as 20 respostas com 500 caracteres = 4 páginas (sobra ~55 mm na 4ª) |
| 84.4 | Página e seed regerados; banco id 81: backup e 20 tópicos | ✅ Concluído | 2026-10-08 10:48 | Backup `topico_discursivo_backup_20261008_81_20q` (30 linhas, RLS); tópicos 21–30 apagados (nenhuma resposta neles); `total_itens` = 20; conferido: 20 tópicos, 20 pontos, 40 respostas mantidas; índice e menu com 20 questões |
| 84.4a | **Pedido novo (durante a tarefa):** respostas no caderno — PDF sem as caixas de resposta (campo opcional `PDF sem respostas`; instrução "Responda no caderno" no PDF); a página continua com os campos; limite de 500 caracteres retirado (padrão 3000) | ✅ Concluído | 2026-10-08 10:48 | `node --check` OK; página com `data-pdf-sem-respostas`; simulação: 3 páginas |
| 84.5 | Aceite do usuário | ⬜ Pendente | — | — |
