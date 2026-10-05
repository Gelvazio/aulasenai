# ORIENTAÇÃO — Banco (`src/banco`)

- `conexao.js`: `abrirBanco(caminho)` (WAL, FK, busy_timeout) e `emTransacao(banco, fn)`.
- `migracoes.js`: `aplicarMigracoes(banco)` — idempotente. **Nunca editar uma versão já aplicada
  em produção**: criar nova entrada `{ versao: N, aplicar, semear? }` e atualizar `docs/database.md`.
- `repositorios/`: uma classe por tabela, recebendo o `banco` no construtor (injeção).
  `repositorios/index.js` → `criarRepositorios(banco)` devolve todos.

## Regras
- **Só prepared statements** (`?` ou `:nome`). Nunca concatenar valores do usuário em SQL
  (exceção controlada: lista fixa de colunas em `usoIaRepositorio`).
- Filtros opcionais usam o padrão `(:param IS NULL OR coluna = :param)`.
- Busca FTS: `montarConsultaFts` remove operadores e coloca cada palavra entre aspas com `*`.
- Linhas retornadas pelo `node:sqlite` têm protótipo nulo — use spread/JSON normalmente.
- Agrupamentos por dia/hora são feitos no serviço (respeitando o fuso), não em SQL.
