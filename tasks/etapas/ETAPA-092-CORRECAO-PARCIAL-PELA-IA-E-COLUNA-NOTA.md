> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 92 — Correção parcial pela IA e coluna "Nota parcial IA" (Prova Prática ADAG id 82, 2026-10-08 15:07:27)

Pedido do usuário: a rodada da IA não gravou nada (0 entregas; a orientação só corrigia entregues). Gerar correção parcial numa nova coluna, dando a nota parcial, e ajustar o arquivo de orientação.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 92.1 | Coluna `correcao_discursiva.nota_ia_em` (`database/2026-10-08-correcao-discursiva-nota-ia-em.sql`, idempotente, sem apagar dados) aplicada no Supabase a pedido do usuário | ✅ Concluído | 2026-10-08 15:07:27 | Consulta ao `information_schema`: coluna `timestamptz` existe |
| 92.2 | `CORRECAO-PROVA-ADAG.md`: correção parcial (todos os alunos com resposta, antes da entrega), recorrige o que mudou (`atualizado_em > nota_ia_em`), resposta apagada volta a 0, grava `nota_ia_em = now()` | ✅ Concluído | 2026-10-08 15:07:27 | Consulta 4.1 executada no banco (só leitura): 15 alunos, 128 alternativas pendentes |
| 92.3 | Painel: coluna "Nota parcial IA" (soma com "(N/60)") e "Nota IA (a confirmar)" só com entrega e 60/60 | ✅ Concluído | 2026-10-08 15:07:27 | `node --check` |
| 92.4 | `docs/database.md`, `docs/relatorio_verificacao_database.html` e `docs/regras/atividades.md` atualizados | ✅ Concluído | 2026-10-08 15:07:27 | Leitura |
| 92.6 | Pedido do usuário: **recorrigir só após a entrega final** — antes da entrega cada alternativa é corrigida uma vez; mudanças posteriores só são recorrigidas depois da entrega (`CORRECAO-PROVA-ADAG.md`, consulta 4.1) | ✅ Concluído | 2026-10-08 15:08:02 | Consulta 4.1 nova executada no banco (só leitura): 15 alunos, 128 alternativas pendentes |
| 92.7 | "Nota parcial IA" com o **% de acerto** nas alternativas já corrigidas (nota da IA ÷ pontos delas, lidos uma vez da `topico_discursivo`), ex.: "🤖 3,20 · 80% (40/60)" | ✅ Concluído | 2026-10-08 15:28:59 | `node --check` |
| 92.8 | Percentual escrito em cima de cada barra de progresso (alunos e barra geral da turma) | ✅ Concluído | 2026-10-08 15:32:14 | `node --check` |
| 92.9 | Ordenação clicável (seta ↕ ▲ ▼) nos títulos Aluno (alfabética), Progresso, Situação, Nota parcial IA e Nota IA (numéricas); mesma coluna inverte; empate pelo nome; mantida nas atualizações de 5 s | ✅ Concluído | 2026-10-08 15:34:55 | `node --check` |
| 92.10 | Respostas dos alunos: ícone da nota parcial da IA ao lado de cada alternativa (✅ certa / 🟡 meia certa / ❌ errada / ⏳ sem correção) com o comentário no título; `nota-ia-respostas-discursiva.js` + CSS e callback `aoMostrarAluno` | ✅ Concluído | 2026-10-08 15:53:30 | `node --check` nos 3 JS |
| 92.5 | Aceite do usuário (rodar a tarefa da IA e ver a nota parcial no painel) | 👀 Aguardando o usuário | — | — |
| 95.4 | Pedido do usuário (2026-10-08 18:42:56): ao lado do nome da equipe, os primeiros nomes dos integrantes — "Equipe 1 (Ana, João)"; vazia = "(sem integrantes)" (`equipes-tabela.js`, `equipes-modal.css`) | ✅ Concluído | 2026-10-08 18:42:56 | `node --check`; leitura do código |
| 95.5 | Formulários de equipe e de integrante em janelas próprias (modal sobre o modal): botões "+ Nova equipe" e "+ Novo integrante" no modal; ✏️ da equipe/integrante abre a janela já preenchida; "Cancelar", clique fora ou Esc fecham; salvar fecha a janela (adiado e retomado a pedido do usuário) | ✅ Concluído | 2026-10-08 18:48:42 | `node --check`; leitura do código (sem navegador) |
