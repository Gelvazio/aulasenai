# Progresso global da turma em todas as atividades

**Criado em:** 2026-10-09 10:22:23 (horário de Brasília, relógio do contêiner)
**Aprovado em:** 2026-10-09 10:31 (decisões D1 a D5 abaixo)
**Concluído em:** — (pendente)
**Tempo decorrido:** — (pendente)
**Status do plano:** 🔄 Em execução — Etapa 121 do [`STATUS.md`](../STATUS.md); tarefa #17 do [`TASKS.md`](../TASKS.md)

## Objetivo

Dar ao professor, em **toda** atividade (objetiva e discursiva) que grava no banco, de **todas**
as matérias, o mesmo painel de **Progresso da turma** da Prova Prática ADAG (id 82), aparecendo
**logo que a página abre**, sem campo na fonte `.md` e sem regerar as páginas.

## Escopo

- **Entra:**
  - Um módulo global único (`assets/js/progresso-turma-global.js` + fontes de dados), que
    **substitui** o `progresso-turma-discursiva.js` e serve objetivas e discursivas.
  - O painel aparece pelos dois motores de página já usados por todas as atividades com banco:
    `assets/js/avaliacao-discursiva.js` (discursivas) e `assets/js/respostas-atividade.js`
    (objetivas). Toda página com esses motores ganha o painel sem ser regerada; páginas novas
    também, porque os geradores já incluem esses motores.
  - Tudo o que o painel da ADAG tem vem do global: questões por aluno, barra, situação e
    "✅ Entregue", ordenação, resumo da turma, 📈 Gráficos, 🧮 Cálculo Nota e 🎯 Quantidade
    Mínima de Questões.
  - Objetiva: colunas **Acertos** e **Nota** (pela função `resumo_tentativas_atividade`, sem o
    gabarito sair do banco); nota = acertos ÷ mínimo × 10, **máximo 10**.
  - Mínimo de questões **também na objetiva**: SQL novo (entrega com o mínimo e nota sobre o
    mínimo) e ajuste da página objetiva e do relatório do professor.
  - Regra no `CLAUDE.md` e em `docs/regras/atividades.md`, com versão e histórico.
- **Não entra:**
  - Páginas sem banco (Excel, PDF, slides).
  - Gravar dados novos pelo painel além do mínimo de questões (que já existe).
  - Testes automatizados e navegador (regras do projeto; o aceite visual é do usuário).
- **Critério de pronto:** o professor abre qualquer atividade com banco e vê o painel sem clicar
  em nada; o aluno não vê o painel; o RLS limita aos alunos das turmas do professor; a objetiva
  aceita entrega com o mínimo e a nota fica sobre o mínimo (máx. 10) depois que o SQL for aplicado.
- **Premissas e restrições:**
  - Sem `<style>`/`<script>` embutidos, sem `onclick`, sem `alert()`.
  - Arquivos ≤ 1000 linhas, funções ≤ 45 linhas (`docs/regras/codigo.md`).
  - SQL idempotente; **aplicar no Supabase só com pedido do usuário**.
  - Enquanto o SQL não for aplicado, a objetiva continua exigindo todas as questões (a página lê o
    mínimo do banco e, sem ele, usa o total).

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-09 10:22 | Começar por Testes de Front-End, objetiva da aula 01 (id 96) | Usuário | Pedido explícito |
| 2026-10-09 10:31 | D1 — o painel global substitui o das discursivas; tudo vem do global | Usuário | Um só painel |
| 2026-10-09 10:31 | D2 — objetiva: acertos e nota pelo banco no lugar das colunas da IA | Usuário | Sem IA na objetiva |
| 2026-10-09 10:31 | D3 — mínimo de questões e Cálculo Nota também nas objetivas | Usuário | Mesma regra das discursivas |
| 2026-10-09 10:31 | D4 — escopo: objetivas e discursivas que gravam no banco | Usuário | Sem banco não há progresso |
| 2026-10-09 10:31 | D5 — data e hora pelo relógio do contêiner | Usuário | — |
| 2026-10-09 10:33 | O painel é ligado pelos motores das páginas (não página a página) | Claude | Chega a todas as atividades sem regerar; "depois todas" fica atendido |

## Arquivos previstos

| Arquivo | Situação | Papel |
|---|---|---|
| `assets/js/progresso-turma-fontes.js` | novo | leitura dos dados: fonte objetiva e fonte discursiva (mesmo formato de aluno) |
| `assets/js/progresso-turma-global.js` | novo | tela do painel (substitui `progresso-turma-discursiva.js`) |
| `assets/css/progresso-turma-global.css` | novo (renomeado) | visual do painel (era `progresso-turma-discursiva.css`) |
| `assets/js/progresso-turma-discursiva.js` + `.css` | removidos | substituídos pelo global |
| `assets/js/avaliacao-discursiva.js` | alterado | carrega o global |
| `assets/js/respostas-atividade.js` | alterado | carrega o global para o professor; entrega com o mínimo; nota sobre o mínimo |
| `assets/js/respostas-atividade-banco.js` | alterado | lê o mínimo do aluno |
| `assets/js/respostas-atividade-professor.js` | alterado | nota sobre o mínimo no relatório |
| `assets/js/graficos-progresso-turma.js`, `calculo-nota-progresso.js`, `minimo-questoes-discursiva.js` | alterados se preciso | rótulos conforme o tipo |
| `database/2026-10-09-minimo-questoes-objetivas.sql` | novo | mínimo na objetiva (não aplicado sem pedido) |
| `CLAUDE.md`, `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` | alterados | regra nova |

## Riscos

| Risco | Chance | Impacto | Plano B | Situação |
|---|---|---|---|---|
| Painel quebrar a página objetiva | Baixa | Alto | Carregado em `try/catch`, sem bloquear o resto (como o relatório do professor) | Aberto |
| Mínimo na objetiva antes do SQL aplicado | Média | Médio | Página usa o total quando o banco não devolve um mínimo válido | Aberto |
| Constante global repetida entre scripts derrubar a página | Média | Alto | Nomes exclusivos; conferir com `grep` antes do commit (lição da Etapa 113) | Aberto |
| Painel para todas as matérias de uma vez | Média | Médio | Uma constante liga/desliga o painel global | Aberto |

## Passos

| Passo | Ação | Caminho exato | Verificação | Status |
|---|---|---|---|---|
| 1 | Conferir o banco real (só leitura) | conector do Supabase | consultas de leitura | ✅ 2026-10-09 10:33 |
| 2 | Módulo global (fontes + tela) substituindo o das discursivas | `assets/js/progresso-turma-fontes.js`, `assets/js/progresso-turma-global.js`, `assets/css/progresso-turma-global.css` | `node --check`; tamanhos | ✅ 2026-10-09 10:45 |
| 3 | Ligar nos motores das páginas | `assets/js/avaliacao-discursiva.js`, `assets/js/respostas-atividade.js` | `node --check`; `grep` | ✅ 2026-10-09 10:45 |
| 4 | Gráficos, Cálculo Nota e mínimo genéricos | `assets/js/graficos-progresso-turma.js`, `calculo-nota-progresso.js`, `minimo-questoes-discursiva.js` | `node --check` | ✅ 2026-10-09 10:45 |
| 5 | SQL do mínimo na objetiva | `database/2026-10-09-minimo-questoes-objetivas.sql` | leitura; idempotente | ✅ 2026-10-09 10:49 |
| 6 | Página objetiva: entrega com o mínimo e nota sobre o mínimo | `assets/js/respostas-atividade.js`, `assets/js/respostas-atividade-banco.js` | `node --check` | ✅ 2026-10-09 10:52 |
| 7 | Relatório do professor: nota sobre o mínimo | `assets/js/respostas-atividade-professor.js` | `node --check` | ✅ 2026-10-09 10:53 |
| 8 | Regras e visualizador | `CLAUDE.md`, `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` | leitura | ✅ 2026-10-09 10:56 |
| 9 | Commit, push e pull request | git | `git diff --cached --name-only` | 🔄 |
| 10 | Aplicar o SQL (só com pedido do usuário) | conector do Supabase | consultas de leitura | ⬜ |
| 11 | Aceite do usuário (Testes de Front-End, aula 01) | `ATIVIDADES-AULA-01-50-QUESTOES.html` | usuário | ⬜ |

## Pendências

| Item | Motivo | Quando retomar |
|---|---|---|
| Aplicar o SQL do passo 5 | Depende do pedido do usuário | Depois do passo 9 |
