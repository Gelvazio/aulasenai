# login.js — perfil e turma lidos do `app_metadata`

- **Criado em:** 2026-09-28 16:50
- **Concluído em:** 2026-09-28 16:55
- **Tempo decorrido:** ~5 min

## Objetivo
Fazer o `js/login.js` ler **perfil** e **código da turma** do `app_metadata` (só a
`service_role` altera), conforme a regra "Perfil e turma vêm do `app_metadata`" do `CLAUDE.md`.

## Escopo
- `salvarSessaoLocal(usuario)`: `perfil` e `turma_codigo` passam a vir de `usuario.app_metadata`.
- `nome` e `turma_nome` continuam vindo do `user_metadata` — o script
  `scripts/criar-usuarios-supabase-auth.js` só grava `perfil` e `turma_codigo` no `app_metadata`;
  nome e nome da turma são apenas exibição.
- Sem mudança no banco, no RLS nem em `login.html`.

## Tecnologias
JavaScript (supabase-js v2).

## Arquivos previstos
- `js/login.js`
- `docs/ORIENTACAO_JS_LOGIN.md` (seção Contas: onde fica cada campo)

## Riscos e dependências
- Contas antigas sem `app_metadata.perfil` passam a exibir o perfil padrão `ALUNO` (mesmo
  comportamento de hoje quando o campo falta). Rodar o script de contas com `--executar` corrige.
- Nenhum impacto na segurança: a permissão real vem do RLS (`eh_professor()`).

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Ler `perfil`/`turma_codigo` de `app_metadata` em `salvarSessaoLocal`; atualizar JSDoc | `js/login.js` | Leitura do diff | ✅ Concluído |
| 2 | Documentar a origem de cada campo | `docs/ORIENTACAO_JS_LOGIN.md` | Leitura do diff | ✅ Concluído |
| 3 | Commit | — | `git log -1` | ✅ Concluído |

## Resultado
`salvarSessaoLocal` lê perfil e turma do `app_metadata`; orientação atualizada. Sintaxe validada com `node --check`.
