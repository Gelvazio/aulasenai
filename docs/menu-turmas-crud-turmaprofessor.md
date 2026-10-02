# Menu TURMAS — CRUD de `turmaprofessor` (só Professor Administrador)

- **Criado em:** 2026-10-02
- **Status geral:** ✅ Concluído (aprovado pelo usuário em 2026-10-02)
- **Pedido:** "para o usuário admin, PROFESSOR GELVAZIO CAMARGO, crie um menu de nome TURMAS, e neste
  menu um CRUD para a tabela `turmaprofessor`, vinculando um professor (perfil PROFESSOR) a uma turma".

## Banco real conferido (2026-10-02) — nenhuma alteração necessária

- `turmaprofessor` já existe (`id` identity, `turma_codigo` → `turma`, `professor_id` → `auth.users`,
  `criado_em`, `criado_por`, único `turma_codigo + professor_id`), RLS ligado:
  SELECT = administrador ou o próprio professor; INSERT/UPDATE/DELETE = só `eh_professor_administrador()`.
- Trigger `turmaprofessor_exige_professor` recusa vínculo de quem não é PROFESSOR.
- `eh_professor_administrador()`: só `gelvazio.camargo@senai.local` + perfil PROFESSOR +
  `app_metadata.administrador = true` (regra do `CLAUDE.md`).
- Professores para a lista: tabela `usuario` (`perfil = 'PROFESSOR'`, legível pelo professor; hoje 1).
- Turmas: tabela `turma` (leitura liberada a usuários logados; hoje 5).

## Escopo

| Nº | Passo | Arquivo | Status |
|----|-------|---------|--------|
| 1 | Menu **TURMAS** no header, visível **só** quando o RPC `eh_professor_administrador()` devolve verdadeiro (não usa e-mail nem `user_metadata`) | `js/header-usuario.js` | ✅ |
| 2 | Página do CRUD (estrutura, sem CSS/JS embutidos) | `turmas.html` (raiz) | ✅ |
| 3 | Repositório (dados): listar turmas, professores e vínculos; criar, alterar e excluir vínculo; checar administrador | `assets/js/turmas-professor-repositorio.js` | ✅ |
| 4 | Tela: formulário (turma + professor), tabela de vínculos com **Editar** e **Excluir**, filtro por turma, popups (`assets/js/popup.js`) | `assets/js/turmas-professor-pagina.js` | ✅ |
| 5 | Estilos com tokens | `assets/css/turmas-professor.css` | ✅ |
| 6 | Registrar os arquivos novos na regra de `assets/` e na regra do administrador | `CLAUDE.md` | ✅ |
| 7 | Verificação (`node --check`) e commit local (sem push) | — | ✅ |

## Comportamento da página

- Não logado → aviso e botão ENTRAR. Logado sem ser administrador → "Acesso restrito ao Professor
  Administrador" e nada é carregado (o banco também recusa pelo RLS).
- **Criar:** escolher turma e professor → grava; vínculo repetido mostra aviso (restrição única).
- **Editar:** troca a turma ou o professor do vínculo. **Excluir:** popup de confirmação.
- Tabela: turma (código, nome, turno, horário, local), professor (nome, e-mail), criado em.

## Riscos

- Segurança continua no banco (RLS + trigger); o menu escondido é só conveniência visual.
- Professores novos (ex.: Prof. Rafael) só aparecem na lista depois de terem conta no Auth e linha
  na `usuario` com perfil PROFESSOR.
- Validação só por leitura de código e `node --check` (sem abrir navegador): o professor testa.

## Resultado

- Banco sem alteração (tabela, RLS, trigger e função já existiam).
- Menu TURMAS no header só com `eh_professor_administrador()` = verdadeiro; página `turmas.html` com CRUD completo.
- Verificado com `node --check` (sem navegador): o professor testa a tela.
