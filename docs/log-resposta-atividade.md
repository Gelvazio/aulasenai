# Log de gravação das alternativas (`log_resposta_atividade`)

- **Criado e concluído em:** 2026-10-06 (pedido do usuário: "crie este log, valendo a partir de agora")
- **Status:** ✅ Aplicado no Supabase e conferido
- **SQL:** `database/2026-10-06-log-resposta-atividade.sql`

## Objetivo

Guardar **todas as alternativas clicadas** por cada aluno em cada questão de **qualquer atividade
objetiva**, com data e hora, para auditoria (antes só existia a resposta atual e a hora da última
alteração em `resposta_atividade.atualizado_em`).

## Como funciona

| Operação | Quando é registrada |
|---|---|
| `CARGA_INICIAL` | Uma vez, na aplicação: a alternativa atual de cada questão já respondida (hora = `atualizado_em`). O histórico de trocas anterior a 2026-10-06 não existe no banco. |
| `MARCOU` | O aluno marca a primeira alternativa da questão (inclui as respostas herdadas numa nova tentativa, com `herdada = true`). |
| `TROCOU` | O aluno troca a alternativa (guarda a letra anterior e a nova). Regravar a mesma letra não gera linha. |
| `APAGOU` | A resposta da questão é apagada. |

- Preenchido **só pelo gatilho** `resposta_atividade_log_trg` (função `registrar_log_resposta_atividade`,
  security definer). Nenhuma mudança nas páginas.
- **RLS:** professor lê só os alunos das turmas dele (`professor_pode_ver_aluno`; administrador
  todos); aluno e `anon` sem acesso; ninguém grava, altera ou apaga pela API.
- Discursivas (`resposta_discursiva`) ficam fora (texto salvo a cada 1,5 s geraria log enorme).

## Verificação

- Carga inicial: 24.190 linhas = 24.190 respostas existentes.
- RLS ligado; `anon` sem leitura.

## Consulta útil (SQL Editor)

```sql
select l.registrado_em at time zone 'America/Sao_Paulo' as quando, l.tentativa, l.item,
       l.letra_anterior, l.letra_nova, l.operacao
from log_resposta_atividade l join aluno a on a.id = l.aluno_id
where a.nome ilike '%ana clara%' and l.atividade_id = 33
order by l.registrado_em;
```
