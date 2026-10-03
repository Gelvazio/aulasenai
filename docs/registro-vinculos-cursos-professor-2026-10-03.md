# Registro da tarefa: vínculos de cursos por professor

**Data:** 2026-10-03  
**Objetivo:** registrar no `CLAUDE.md` raiz as alterações efetivamente realizadas e o estado da solicitação aprovada.

## Status

| Etapa | Descrição | Status |
|---|---|---|
| 1 | Conferir histórico, arquivos da especificação e plano | ✅ Concluída |
| 2 | Registrar no `CLAUDE.md` raiz o que foi feito e o que segue pendente | ✅ Concluída |
| 3 | Criar commit local apenas dos dois arquivos desta anotação | ✅ Concluída |

## Registro factual

- O commit `33a3ca9` carregou os cursos do banco no índice (`index.html` e `assets/js/indice-cursos.js`).
- O commit `abcee07` registrou a especificação aprovada para `cursoprofessor`, a tela administrativa `cursos-professor.html` e o item `CURSOS`.
- O commit `ccb9d3b` registrou o plano detalhado da implementação.
- Uma revisão independente do plano identificou verificações adicionais necessárias no schema, permissões, políticas e funções do banco.
- A implementação da tabela, migração, tela, menu e filtro por professor ainda não foi feita. A inspeção do banco real está pendente porque esta sessão não tem conector Supabase e ainda não recebeu os resultados das consultas somente de leitura solicitadas ao usuário.
- Não foram executados testes, navegador ou servidor.

## Verificação estática

Consultar `git diff` e `git status` para confirmar o escopo dos arquivos; nenhuma suíte de testes deve ser executada.