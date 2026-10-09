> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 54 — Combo "Aluno" do professor nas discursivas (tarefa pequena, 2026-10-07)

Pedido: na discursiva de sexta, um combo de alunos para o professor carregar as respostas de cada um. Feito de forma genérica: vale para **todas** as discursivas, sem regerar páginas.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 54.1 | `assets/js/respostas-aluno-discursiva.js` + `assets/css/respostas-aluno-discursiva.css`: combo com quem respondeu (nome, tentativa, entregue ou não); ao escolher, carrega as respostas nos campos (somente leitura) | ✅ Concluído | 2026-10-07 | `node --check` ok; consulta com RLS do professor devolveu Juan e Vitor (20 tópicos cada) |
| 54.2 | `assets/js/avaliacao-discursiva.js` carrega o módulo só para o professor | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 54.3 | Aceite do usuário (abrir a discursiva como professor e escolher um aluno) | ⬜ Pendente | — | — |
