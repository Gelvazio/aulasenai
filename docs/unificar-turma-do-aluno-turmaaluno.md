# Unificar a turma do aluno na `turmaaluno`

- **Criado em:** 2026-10-02
- **Status geral:** ✅ Concluído (aprovado pelo usuário em 2026-10-02)
- **Pedido:** "unifique a turma do aluno para usar a turmaaluno".

## Situação real (banco e código conferidos em 2026-10-02)

A turma do aluno hoje vem de **três lugares**, todos iguais hoje (0 divergências, nenhum aluno em 2 turmas):

1. `public.aluno.turma_codigo` — lido por:
   - funções `horario_da_turma_do_aluno()` (→ `dentro_do_horario_da_turma()` → `pode_responder_no_horario()`,
     usada no RLS de `resposta_atividade`, `entrega_atividade` e `resposta_discursiva`),
     `definir_lider_turma()` e `resumo_tentativas_atividade()`;
   - páginas: `respostas-atividade-banco.js`, `respostas-discursivas-banco.js`,
     `respostas-atividade-professor.js`, `relatorio-atividades-dados.js`, `painel-professor.js`,
     `avaliacao-media-final.js`, `avaliacao-media-final-professor.js`.
2. `auth.users.app_metadata.turma_codigo` — lido por `js/login.js` (sessionStorage); gravado na
   criação da conta (`assets/js/criar-usuarios-api.js`, `scripts/criar-usuarios-supabase-auth.js`).
3. `public.turmaaluno` (nova, 106 vínculos) — só a página `alunos.html`.

## Solução proposta

**`turmaaluno` passa a ser a fonte única.** As outras duas viram **cópias automáticas** mantidas pelo
banco, para nenhuma página antiga quebrar.

| Nº | Passo | Alvo | Status |
|----|-------|------|--------|
| 1 | `horario_da_turma_do_aluno()` lê a **`turmaaluno`**; com mais de uma turma devolve uma linha por turma, **primeiro as que estão no horário** (as páginas usam a 1ª linha — continuam funcionando sem mudança) | função | ✅ |
| 2 | `dentro_do_horario_da_turma()` = **alguma** turma do aluno no horário (sem turma continua liberado, como hoje) | função | ✅ |
| 3 | `definir_lider_turma()` confere o vínculo na **`turmaaluno`** | função | ✅ |
| 4 | Trigger na `turmaaluno` (insert/update/delete): atualiza a **turma principal** (vínculo mais recente; sem vínculo = vazio) em `aluno.turma_codigo` e em `app_metadata.turma_codigo` | trigger `security definer` | ✅ |
| 5 | Criação de contas grava também o vínculo na `turmaaluno` (upsert) | `assets/js/criar-usuarios-api.js`, `scripts/criar-usuarios-supabase-auth.js` | ✅ |
| 6 | SQL idempotente versionado + aplicar pelo conector + testes em bloco desfeito (horário, líder, trigger de cópia) | `database/2026-10-02-turma-do-aluno-turmaaluno.sql` | ✅ |
| 7 | `docs/database.md`, `docs/relatorio_verificacao_database.html`, regra no `CLAUDE.md` (a turma do aluno vem **só** da `turmaaluno`; as outras são cópias, não gravar nelas à mão) | docs | ✅ |
| 8 | `node --check` e commit local (sem push) | — | ✅ |

## Efeito para o professor

- Mudar a turma em `alunos.html` passa a mudar o **horário** em que o aluno responde, o líder da
  turma e as telas de relatório/painel (pela cópia em `aluno.turma_codigo`).
- Aluno em **duas turmas**: responde no horário de qualquer uma delas; as telas antigas mostram a
  turma principal (a vinculada por último).

## Riscos

- Funções do RLS de respostas mudam: testar em bloco desfeito antes de confirmar.
- O `app_metadata` do token só atualiza no próximo login/renovação (só afeta o `sessionStorage` do
  `login.js`; o horário é lido do banco, sem depender do token).
- Validação sem navegador (consultas e `node --check`); o professor testa as telas.

## Resultado

- Migrações `turma_do_aluno_turmaaluno` e `turmaaluno_vinculos_faltantes` aplicadas pelo conector.
- Testes em bloco desfeito: horário com 1 e 2 turmas; cópia da turma principal ao inserir e ao excluir (aluno e app_metadata); líder aceito na própria turma e recusado em outra.
- Encontrados 19 alunos da turma 122552 sem vínculo (contas criadas antes): copiados. Total 125 vínculos, 0 alunos sem vínculo, 0 divergências.
- Criação de contas grava a `turmaaluno`; `node --check` ok (sem navegador).
- Observação: existe no banco uma turma com código `AI OPIR 2026/1 V1` (sem vínculos, sem horário), criada às 23:20 fora desta tarefa — não foi alterada.
