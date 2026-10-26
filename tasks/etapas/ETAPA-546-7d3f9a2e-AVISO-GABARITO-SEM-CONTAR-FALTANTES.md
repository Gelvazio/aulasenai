# ETAPA 546 — Aviso do "Liberar gabaritos" sem contar alunos sem entrega

- **TASK:** #401 (pedida em 2026-10-26)
- **Nível/Modelo:** LEVE · effort low (Jev, conf. 0,82). Executada pelo Devin a pedido direto do usuário. Neste projeto nunca Opus.
- **Tipo:** tarefa pequena (1 arquivo JS + docs).
- **Aprovação:** pedido direto do usuário.

## Pedido

Na mensagem ao lado do botão "🔓 Liberar gabaritos (turma X)" — "Faltam N aluno(s) entregar: ao liberar o gabarito, eles não poderão mais responder." — **não deve considerar quem faltou entregar**.

## Objetivo

O aviso e a confirmação do gabarito não contam nem citam alunos sem entrega. A liberação já é sempre permitida desde a #175 (o banco encerra o preenchimento da turma), então a contagem só servia ao texto.

## Escopo

- `assets/js/liberacao-respostas-professor.js`: remover a chamada à RPC `alunos_sem_entrega_turma`, o estado `faltam` e os textos que citam "Faltam N aluno(s)". Aviso quando não liberado vira mensagem neutra (sem contagem); a confirmação idem.
- `docs/regras/atividades.md`: atualizar a regra que descreve o aviso/confirmação.
- Não entra: mudar `liberar_gabarito_turma` (já não bloqueia), remover a RPC do banco (ainda documentada e usada por outras consultas), outras telas.

## Subtarefas

### 401.1 — Remover a contagem de faltantes do aviso e da confirmação do gabarito

- **Nível:** LEVE (Jev, conf. 0,82) · **Status:** 🔄 Em progresso
- **Descrição:** editar `liberacao-respostas-professor.js` (sem `alunos_sem_entrega_turma`, sem `faltam`, textos neutros) e `docs/regras/atividades.md`.
- **Próximo passo:** editar o JS, `node --check`, atualizar docs e o quadro.
- **Verificação:** `node --check` + grep sem "Faltam" no JS + releitura dos trechos.
