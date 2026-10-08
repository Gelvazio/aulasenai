# Quantidade mínima de questões para entregar a avaliação discursiva

- **Criado em:** 2026-10-08 (pedido do usuário)
- **Concluído em:** 2026-10-08 16:42:10 (falta o aceite)
- **Tempo decorrido:** —
- **Status:** ✅ Executado (2026-10-08 16:42:10); aguardando o aceite do usuário
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
| D6 | Questões não respondidas | Não entram na conta; a IA corrige só o que foi respondido. A coluna "Nota IA (a confirmar)" aparece quando a entrega está feita e **todas as alternativas respondidas** foram corrigidas (hoje exige 60/60) |
| D7 | **Nota proporcional ao mínimo (decisão do usuário, 2026-10-08)** | A nota vale sobre o **mínimo do aluno**: cada questão passa a valer **10 ÷ mínimo**. Ex.: prova de 20 questões com mínimo 10 → cada questão vale 1,0; fazendo as 10 certas, **nota 10**. Conta: `nota = soma dos pontos obtidos × (total de questões ÷ mínimo)` |
| D8 | **Nota máxima sempre 10 (decisão do usuário, 2026-10-08)** | Se o aluno responder mais que o mínimo, a nota é **limitada a 10** (`menor(10, conta da D7)`) |

## Arquivos previstos

| Arquivo | O que muda |
|---|---|
| `database/2026-10-08-minimo-questoes-entrega.sql` (novo) | Coluna `atividade.minimo_questoes_entrega`; tabela `minimo_questoes_aluno` com RLS; função `minimo_questoes_para_entregar(atividade, aluno)`; `atividade_completa` passa a usar o mínimo nas discursivas (objetivas iguais) |
| `assets/js/minimo-questoes-discursiva.js` + CSS (novos) | Botão no Progresso da turma e janela (modal) para informar o mínimo do aluno |
| `assets/js/progresso-turma-discursiva.js` | Botão ao lado do nome; mostra o mínimo atual do aluno |
| `assets/js/respostas-discursivas-banco.js` | Lê o mínimo do aluno logado |
| `assets/js/avaliacao-discursiva.js` | "Finalizar e entregar" confere o mínimo (em vez de todas) e explica quantas faltam; painel do aluno mostra "mínimo para entregar: N questões" |
| Função `notas_media_final` (banco) | A nota da discursiva na média final segue D7 e D8 (proporcional ao mínimo do aluno, máximo 10) |
| `CORRECAO-PROVA-ADAG.md` | Nota final da IA com o mínimo (D7 e D8) |
| `docs/database.md`, `docs/relatorio_verificacao_database.html`, `docs/regras/atividades.md`, `CLAUDE.md` | Documentação e regra |

## Passos

| # | Ação | Verificação | Status |
|---|---|---|---|
| 1 | Conferir no banco real `atividade`, `entrega_atividade`, `atividade_completa` e políticas (já feito: a entrega exige `atividade_completa` = todos os tópicos) | Consultas de leitura | ✅ Concluído |
| 2 | Escrever o SQL idempotente (sem apagar dados): `database/2026-10-08-minimo-questoes-entrega.sql` | Leitura do SQL | ✅ Concluído (2026-10-08 16:38:07) |
| 3 | Aplicar no Supabase pelo conector e conferir coluna, tabela, RLS e função | Consultas de leitura: coluna criada, RLS ligado, 4 políticas, prova 82 = 20 questões e mínimo padrão 20 | ✅ Concluído (2026-10-08 16:38:07) |
| 4 | Módulo do botão e da janela do mínimo no Progresso da turma: `assets/js/minimo-questoes-discursiva.js` + CSS; botão "🎯 Quantidade Mínima de Questões: N/20" sob o nome; Situação mostra "mín. N" | `node --check` | ✅ Concluído (2026-10-08 16:41:22) |
| 5 | Entrega na página do aluno conferindo o mínimo (RPC `minimo_questoes_para_entregar`) + aviso "📌 Para entregar..." no painel | `node --check` | ✅ Concluído (2026-10-08 16:41:22) |
| 6 | Ajustar a coluna "Nota IA (a confirmar)", a "Nota parcial IA", o gráfico 5 e o `CORRECAO-PROVA-ADAG.md` (D6, D7 e D8) | `node --check`, leitura | ✅ Concluído (2026-10-08 16:41:22) |
| 6.1 | Ajustar `notas_media_final` no banco (D7 e D8), com cópia da definição antiga no SQL | Aplicada junto no passo 3; 0 notas de professor lançadas, objetivas sem mudança | ✅ Concluído (2026-10-08 16:38:07) |
| 7 | Documentação, regra no `CLAUDE.md`, `STATUS.md` e commit | Leitura, `git diff --cached --name-only` | ✅ Concluído (2026-10-08 16:42:10) |
| 8 | Aceite do usuário | Teste dele no navegador | ⬜ Pendente |

## Riscos

| Risco | Plano B |
|---|---|
| Mudar `atividade_completa` afetar as objetivas | A função mantém exatamente o ramo das objetivas; só o ramo das discursivas muda |
| Aluno entregar sem o mínimo burlando a página | A regra fica no banco (RLS da `entrega_atividade` via `atividade_completa`) |
| Mudar `notas_media_final` alterar notas já lançadas | Com mínimo = total (padrão) a conta dá o mesmo valor de hoje; só muda para quem tiver mínimo menor |
| Professor pôr mínimo inválido | `check` no banco (1 ≤ mínimo) e conferência do total na função e na janela |
