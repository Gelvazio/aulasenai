# Bloqueio de atividade por turma (turma favorita do professor)

- **Criado em:** 2026-10-05
- **Concluído em:** 2026-10-05 13:36 (falta o teste do professor)
- **Pedido do usuário:** "Ao bloquear ou liberar 1 atividade, o professor deve ver qual é a turma
  favorita e deve bloquear ou liberar a atividade para a turma favorita; as outras turmas não
  devem ser afetadas. Se não tiver nada de vínculo, deixe liberado sempre. Na tabela de atividade
  (crie 1 coluna de nome BLOQUEIO e id da turma), deve bloquear ou liberar por turma." Aprovado
  para execução ("SIM, PODE EXECUTAR").

## Regras

- `atividade.bloqueio` = lista JSON com os **códigos das turmas** em que a atividade está
  bloqueada (padrão `[]`). Turma fora da lista = **liberada** (sem vínculo = liberado sempre).
- O interruptor do card mostra a turma favorita: "Bloquear (turma 135081)" /
  "Desbloquear (turma 135081)". Sem favorita marcada, avisa (popup) e não grava.
- Trocar a favorita na barra do índice atualiza os interruptores na hora.
- Aluno: bloqueado quando **todas** as turmas dele (na `turmaaluno`) estão na lista; com alguma
  turma liberada, vê a atividade. Aluno sem turma e visitante: liberado.
- `atividade.ativo` continua (CRUD): `false` bloqueia para todos. Ao **desbloquear** para a
  favorita uma atividade com `ativo = false`, o banco faz `ativo = true` e põe **todas as outras
  turmas** em `bloqueio` (elas continuam bloqueadas, não são afetadas).
- Gravação só pela função `definir_bloqueio_turma(atividade, turma, bloquear)`: só professor e só
  em turma dele (`professor_tem_turma`; administrador em todas).

## Banco (`database/2026-10-05-bloqueio-atividade-por-turma.sql`, aplicado em 2026-10-05)

| Objeto | Mudança |
|---|---|
| `atividade.bloqueio` | nova coluna `jsonb not null default '[]'` + check de array |
| `atividade_liberada_para_usuario(jsonb)` | nova função de conferência por turma |
| política `atividade_select` | `(ativo and atividade_liberada_para_usuario(bloqueio)) or eh_professor()` |
| `item_valido` / `topico_valido` | mesma conferência (aluno não grava resposta em atividade bloqueada para ele) |
| `definir_bloqueio_turma(bigint, text, boolean)` | nova função de gravação |

## Passos

| # | Ação | Verificação | Status |
|---|---|---|---|
| 1 | SQL do bloqueio por turma | Leitura | ✅ Concluído |
| 2 | Interruptor por turma favorita (`assets/js/indice-atividades-bloqueio.js`) | `node --check` | ✅ Concluído |
| 3 | Evento de troca da favorita (`assets/js/indice-turma-favorita.js`) | `node --check` | ✅ Concluído |
| 4 | `docs/database.md` + relatório HTML (✅); `CLAUDE.md` (⛔ edição recusada pelo usuário) | Leitura | ✅ Concluído |
| 5 | Commit local | `git diff --cached --name-only` | ✅ Concluído |
| 6 | Aplicar o SQL no Supabase (pedido em 2026-10-05) e teste do professor | Aplicado pelo conector; conferido (coluna, política, permissões; 56 atividades com `[]`, 22 inativas mantidas); teste pendente | 🔄 Em progresso |

## Riscos

| Risco | Plano B |
|---|---|
| Página aberta antes do SQL aplicado | O interruptor mostra o erro no popup e volta; vale o bloqueio antigo (`ativo`) |
| Relatórios ainda contam atividades por `ativo`, sem olhar a turma | Pendência; ajustar a pedido |
| Turma favorita é única para todos os professores | Mantido; o rótulo mostra a turma afetada |

## Resultado final

- SQL aplicado no projeto `AULAS SENAI` (migração `bloqueio_atividade_por_turma_20261005`).
- Interruptor do índice: "Bloquear (turma X)" / "Desbloquear (turma X)", só para a turma
  favorita; troca da favorita remonta os interruptores.
- Pendência: relatórios ainda contam atividades por `ativo`, sem olhar a turma.
- Verificação: `node --check`; consultas de leitura no banco; sem navegador (regra do usuário).
