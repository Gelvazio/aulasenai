# Restringir cada professor às turmas vinculadas (`turmaprofessor`)

**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03 · **Tempo decorrido:** mesma sessão
**Status:** ✅ Concluído (aprovado pelo usuário: gelvazio nas 3 turmas + aplicar a restrição)

## Resultado
- Migrações aplicadas pelo conector: `professor_so_turmas_vinculadas` e
  `professor_pode_ver_aluno_so_perfil_aluno` (a regra "aluno sem turma" vale só para contas com
  perfil ALUNO no Auth; assim professores e 13 contas antigas sem perfil não aparecem aos demais).
- Testes simulando cada professor (subtransações desfeitas): rafael vê 19 alunos (só 122552) e 20
  usuários (com ele); joao vê 0 alunos; gelvazio (admin) vê os 125. Rafael/joao recebem recusa em
  horário, `liberar_fora_horario` e `turmaaluno` de 133933; o administrador é aceito.
- Conferido depois: 125 vínculos aluno × turma, 5 professor × turma, 0 turmas sem professor.
- ⚠️ Existem 13 linhas em `usuario` com perfil ALUNO e contas antigas/teste (e-mails fora de
  `@senai.local`, sem perfil no Auth, sem turma). Não foram alteradas nesta etapa.
- **Contas de teste (2026-10-03, pedido do usuário; migração
  `contas_teste_20261003_professor_e_remocao`):** a conta `admin@email.com` passou a ter perfil
  PROFESSOR (Auth `app_metadata` e `usuario`; não é administrador). As outras 12 (sem respostas,
  entregas nem turma) foram **apagadas** do Auth, com a linha de `usuario` removida em cascata.
  Backup em `contas_teste_legado_20261003` (RLS ligado, sem políticas, sem acesso da API).
  Conferido: 12 no backup, 0 restantes no Auth/`usuario`, 0 alunos sem turma.

## Levantamento (banco real, 2026-10-03)

### ✅ Já feito
- `turmaprofessor` com RLS: só o Professor Administrador (`gelvazio.camargo@senai.local`) grava;
  professor lê só os próprios vínculos. Tela `turmas.html` (menu TURMAS).
- `turmaaluno` com RLS: todo professor grava; aluno lê os próprios. Tela `alunos.html` (menu ALUNOS).
- Turma do aluno unificada na `turmaaluno` (horário, líder; `aluno.turma_codigo` é cópia automática).
- 125 vínculos aluno × turma; 0 alunos sem turma; 0 divergências; 0 turmas sem aluno.
- Índice de atividades (barra da turma favorita) mostra ao professor só as turmas dele (filtro no JS).
- Função `professor_tem_turma(codigo)` existe, mas **nenhuma política ou função a usa**.

### Vínculos professor × turma hoje
| Turma | Código | Professor | Alunos |
|---|---|---|---|
| AI AIAC 2026/2 V1 | 133933 | gelvazio.camargo | 25 |
| AI AOPL 2026/2 M1 | 135080 | **nenhum** | 33 |
| AI AOPL 2026/2 V1 | 135081 | **nenhum** | 35 |
| AI OPIR 2026/1 V1 | 122552 | rafael.silva | 19 |
| QA LBTSN 2026/1 M2 | QA LBTSN 2026/1 M2 | **nenhum** | 13 (sem horário) |

`joao.freitas` (PROFESSOR) não tem nenhuma turma.

### ⏳ Falta
1. Vincular professor às 3 turmas sem professor (decisão do usuário).
2. **No banco, todo professor ainda vê e altera tudo**: alunos, respostas, entregas, liberações,
   `turmaaluno` (de qualquer turma), `resumo_tentativas_atividade`, `liberar_nova_tentativa`,
   `liberar_fora_horario`, `definir_lider_turma`, `definir_horario_turma`. O filtro existe só no
   índice (JS), que não protege nada.

## Escopo proposto (após aprovação)

| Nº | Passo | Alvo | Verificação | Status |
|----|-------|------|-------------|--------|
| 1 | Vínculos das turmas sem professor (conforme resposta do usuário) | `turmaprofessor` | consulta | ✅ |
| 2 | Função `professor_tem_aluno(aluno uuid)` (aluno em turma do professor; admin = tudo) | banco | `pg_proc` | ✅ |
| 3 | Políticas SELECT de `aluno`, `usuario`, `resposta_atividade`, `entrega_atividade`, `liberacao_atividade`, `resposta_discursiva`: trocar `eh_professor()` por `eh_professor() and professor_tem_aluno(aluno_id)` | banco | `pg_policies` | ✅ |
| 4 | `turmaaluno`: SELECT/INSERT/UPDATE/DELETE do professor só com `professor_tem_turma(turma_codigo)` | banco | `pg_policies` | ✅ |
| 5 | Funções `resumo_tentativas_atividade`, `liberar_nova_tentativa`, `liberar_fora_horario`, `definir_lider_turma`, `definir_horario_turma`: filtrar/recusar turma ou aluno fora do professor | banco | `pg_get_functiondef` | ✅ |
| 6 | Testes em transação desfeita (rafael vê só 122552; admin vê tudo; joao não vê nada) | banco | consultas | ✅ |
| 7 | SQL versionado `database/2026-10-03-professor-so-turmas-vinculadas.sql` + `docs/database.md` + relatório HTML + `CLAUDE.md` | arquivos | leitura | ✅ |
| 8 | Commit local (sem push) | git | `git log -1` | ✅ |

## Riscos
- Professor sem vínculo deixa de ver os alunos (painel, relatórios, atividade) — por isso o passo 1
  vem antes. O administrador continua vendo tudo.
- `turma` continua legível por todos (só nomes/horários).
- Sem navegador: validação por consultas; o professor testa as telas.
