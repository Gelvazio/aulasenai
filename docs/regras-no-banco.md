# Regras no banco: `regra_documento` e `regra_secao`

**Tarefa:** #26-55a91111-02ce-4cb1 · **Etapa:** 144-aff33423
**Criado em:** 2026-10-11 06:21:48 · **Concluído em:** — (aguardando aceite) · **Tempo decorrido:** —
**Pedido (2026-10-11 06:21):** "Faça os 2, inclusive o regra por seção" — tabela com as regras do
`CLAUDE.md` e tabela com uma linha por seção, como cópia do repositório.

## Objetivo

Ter as regras do projeto também no Supabase, inteiras e por seção, para consulta por assunto,
sempre iguais às do repositório (conferidas pelo md5).

## Escopo

- **Entra:** tabelas `regra_documento` e `regra_secao` (RLS, leitura só do administrador, gravação
  só pelo conector); script `scripts/regras/sincronizar_regras.py`; regra "🗄️ REGRAS NO BANCO" no
  `CLAUDE.md`; passo de sincronização na rotina (`docs/regras/tarefas-agendadas.md`); primeira cópia
  e conferência; `docs/database.md` e o relatório HTML.
- **Não entra:** tela para ver as regras do banco (o menu Regras continua lendo o repositório);
  edição de regra pelo banco (origem = repositório, decisão do usuário em 2026-10-11 05:35).
- **Critério de pronto:** `conferir` sem diferenças depois da cópia; aceite do usuário.
- **Arquivos:** `database/2026-10-11-regras-no-banco.sql`, `scripts/regras/sincronizar_regras.py`,
  `CLAUDE.md`, `docs/HISTORICO-REGRAS.md`, `docs/regras/tarefas-agendadas.md`, `docs/database.md`,
  `docs/relatorio_verificacao_database.html`, status em `tasks/`.

## Passos

| # | Ação | Verificação | Status |
|---|---|---|---|
| 1 | SQL das tabelas (idempotente, sem apagar dados) e aplicação pelo conector | `information_schema`, `pg_policies` | ✅ 2026-10-11 06:23 |
| 2 | Script `importar` / `consulta` / `conferir` (seções `##`/`###`, código cercado ignorado) | soma das seções = arquivo, para os 13 arquivos | ✅ 2026-10-11 06:24 |
| 3 | Regra no `CLAUDE.md` (versão 2026-10-11 06:24:07, histórico) e passo na rotina | leitura; padrão do `regras-modal.js` | ✅ 2026-10-11 06:26 |
| 4 | `docs/database.md` + relatório HTML | leitura | ✅ 2026-10-11 06:27 |
| 5 | Commit, push, PR e merge | PR juntado | ⬜ |
| 6 | Primeira cópia pelo conector (um SQL por arquivo) e `conferir` | 0 diferenças | ⬜ |
| 7 | Aceite do usuário | — | ⬜ |

## Riscos

| Risco | Plano B |
|---|---|
| Cópia do banco desatualizada (regra mudou e ninguém sincronizou) | `conferir` em toda execução da rotina e em toda mudança de versão das regras |
| SQL grande demais para o conector | um arquivo por vez (o maior, `CLAUDE.md`, tem ~100 KB) |

## Resultado

— (preencher ao concluir)
