# Excluir aula pelo botão "Editar aula" (só Professor Administrador)

- **Criado em:** 2026-10-06
- **Concluído em:** 2026-10-06 14:30
- **Tempo decorrido:** mesma sessão
- **Status:** ✅ Concluído (aguardando aceite)

## Objetivo
No modal **"✏️ Editar aula"** dos índices de atividades, permitir que o **Professor
Administrador** exclua uma aula. A exclusão é **lógica**: grava `aulas.excluido = 1` e o card da
aula deixa de aparecer no índice.

## Escopo
- **Entra:**
  - coluna nova `aulas.excluido` (`0`/`1`, padrão `0`);
  - função `excluir_aula(p_aula)` no banco, que só funciona para o Professor Administrador;
  - trigger que impede outra pessoa de mudar `excluido` por update direto. Hoje todo professor
    pode fazer update em `aulas`, então só a política de update não basta;
  - botão **🗑️ Excluir aula** no modal, só para o administrador, com confirmação por popup;
  - índice: o card de aula com `excluido = 1` fica escondido para todos (professor, aluno e
    visitante);
  - modal CADASTRAR ATIVIDADES: a lista de aulas para escolher deixa de mostrar as excluídas;
  - `docs/database.md` + `docs/relatorio_verificacao_database.html` atualizados.
- **Não entra:**
  - apagar linhas da tabela: não haverá DELETE, nem nas atividades e respostas ligadas à aula;
  - bloquear as atividades da aula no banco: os links diretos continuam funcionando;
  - tela para restaurar a aula. Se precisar, o administrador volta `excluido = 0` pelo SQL; posso
    criar a tela depois, se você pedir.

## Arquivos previstos
| Arquivo | Ação |
|---------|------|
| `database/2026-10-06-aulas-excluido.sql` | Criar (coluna, função, trigger), idempotente |
| `assets/js/indice-aula-data.js` | Botão e ação de excluir, esconder cards excluídos |
| `assets/css/indice-aula-data.css` | Estilo do botão de excluir (tokens existentes) |
| `assets/js/atividades-crud-repositorio.js` | Filtrar `excluido=eq.0` na lista de aulas |
| `docs/database.md`, `docs/relatorio_verificacao_database.html` | Documentar a coluna e a função |
| `CLAUDE.md` (+ versão/histórico) | Registrar a regra |

## Riscos
| Risco | Plano B |
|-------|---------|
| Outro professor marcar `excluido` por update direto | Trigger recusa quem não é administrador |
| Excluir por engano | Popup de confirmação; exclusão lógica, reversível por SQL |
| `indice-aula-data.js` passar de 1000 linhas ou ter funções grandes | Funções curtas; o arquivo fica com cerca de 360 linhas |

## Passos
| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 1 | SQL da coluna, função e trigger | Conferir o banco real antes | ✅ Concluído |
| 2 | Aplicar no Supabase (com aprovação) | Consultas de leitura: coluna, função e trigger | ✅ Concluído |
| 3 | JS e CSS do índice + filtro no CRUD | `node --check` | ✅ Concluído |
| 4 | database.md, relatório HTML e CLAUDE.md | Leitura | ✅ Concluído |
| 5 | Commit local | `git diff --cached --name-only` | ✅ Concluído |

## Resultado
- SQL aplicado em 2026-10-06: 46 aulas com `excluido = 0`, trigger ativo, `excluir_aula` sem execução para `anon`.
- Botão 🗑️ Excluir aula só para o administrador; cards excluídos escondidos; CRUD filtra `excluido=eq.0`.
- Teste no navegador fica com o usuário (regra: não abrir navegador).
