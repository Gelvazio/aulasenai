# Quantidade mínima de questões para entregar a avaliação discursiva

- **Criado em:** 2026-10-08 (pedido do usuário)
- **Concluído em:** —
- **Tempo decorrido:** —
- **Status:** ⬜ Aguardando aprovação do usuário
- **Etapa no `STATUS.md`:** 97

## Objetivo

Permitir entregar a avaliação discursiva com uma **quantidade mínima de questões respondidas**.
O padrão é a **quantidade total** (como hoje). O professor pode mudar o mínimo **por aluno**, pelo
botão **"Quantidade Mínima de Questões"** ao lado do nome do aluno no **Progresso da turma**. Ao
clicar em **"Finalizar e entregar"**, a página e o banco conferem se o aluno já respondeu o mínimo.

## Escopo

- **Entra:** todas as avaliações discursivas (o Progresso da turma já é global nelas).
- **Não entra:** atividades objetivas (continuam exigindo todas as questões).

## Decisões propostas (confirmar na aprovação)

| # | Decisão | Proposta |
|---|---|---|
| D1 | O que é "questão respondida" | Questão com **todos os tópicos** (alternativas) com texto — o mesmo "completa" (verde) do Progresso da turma |
| D2 | Mínimo padrão | Coluna nova `atividade.minimo_questoes_entrega` (vazia = `total_itens`, ou seja, todas) |
| D3 | Mínimo por aluno | Tabela nova `minimo_questoes_aluno` (`atividade_id`, `aluno_id`, `minimo`, `definido_por`, `definido_em`); vale para todas as tentativas do aluno nessa atividade |
| D4 | Quem altera | Só professor, e só de alunos das turmas dele (`professor_pode_ver_aluno`); aluno só **lê** o próprio mínimo |
| D5 | Limites | Mínimo entre **1** e o total de questões da atividade |
| D6 | Questões não respondidas | Valem **0** na nota; a IA corrige só o que foi respondido. A coluna "Nota IA (a confirmar)" passa a aparecer quando a entrega está feita e **todas as alternativas respondidas** foram corrigidas (hoje exige 60/60) |

## Arquivos previstos

| Arquivo | O que muda |
|---|---|
| `database/2026-10-08-minimo-questoes-entrega.sql` (novo) | Coluna `atividade.minimo_questoes_entrega`; tabela `minimo_questoes_aluno` com RLS; função `minimo_questoes_para_entregar(atividade, aluno)`; `atividade_completa` passa a usar o mínimo nas discursivas (objetivas iguais) |
| `assets/js/minimo-questoes-discursiva.js` + CSS (novos) | Botão no Progresso da turma e janela (modal) para informar o mínimo do aluno |
| `assets/js/progresso-turma-discursiva.js` | Botão ao lado do nome; mostra o mínimo atual do aluno |
| `assets/js/respostas-discursivas-banco.js` | Lê o mínimo do aluno logado |
| `assets/js/avaliacao-discursiva.js` | "Finalizar e entregar" confere o mínimo (em vez de todas) e explica quantas faltam; painel do aluno mostra "mínimo para entregar: N questões" |
| `CORRECAO-PROVA-ADAG.md` | Nota final da IA com o mínimo (questões em branco = 0) |
| `docs/database.md`, `docs/relatorio_verificacao_database.html`, `docs/regras/atividades.md`, `CLAUDE.md` | Documentação e regra |

## Passos

| # | Ação | Verificação | Status |
|---|---|---|---|
| 1 | Conferir no banco real `atividade`, `entrega_atividade`, `atividade_completa` e políticas (já feito: a entrega exige `atividade_completa` = todos os tópicos) | Consultas de leitura | ✅ Concluído |
| 2 | Escrever o SQL idempotente (sem apagar dados) | Leitura do SQL | ⬜ Pendente |
| 3 | Aplicar no Supabase pelo conector e conferir coluna, tabela, RLS e função | Consultas de leitura | ⬜ Pendente |
| 4 | Módulo do botão e da janela do mínimo no Progresso da turma | `node --check` | ⬜ Pendente |
| 5 | Entrega na página do aluno conferindo o mínimo + aviso no painel | `node --check` | ⬜ Pendente |
| 6 | Ajustar a coluna "Nota IA (a confirmar)" e o `CORRECAO-PROVA-ADAG.md` (D6) | `node --check`, leitura | ⬜ Pendente |
| 7 | Documentação, regra no `CLAUDE.md`, `STATUS.md` e commit | Leitura, `git diff --cached --name-only` | ⬜ Pendente |
| 8 | Aceite do usuário | Teste dele no navegador | ⬜ Pendente |

## Riscos

| Risco | Plano B |
|---|---|
| Mudar `atividade_completa` afetar as objetivas | A função mantém exatamente o ramo das objetivas; só o ramo das discursivas muda |
| Aluno entregar sem o mínimo burlando a página | A regra fica no banco (RLS da `entrega_atividade` via `atividade_completa`) |
| Professor pôr mínimo inválido | `check` no banco (1 ≤ mínimo) e conferência do total na função e na janela |
