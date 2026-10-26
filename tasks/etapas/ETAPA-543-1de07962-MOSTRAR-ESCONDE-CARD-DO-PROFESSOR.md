# ETAPA 543 — Interruptor "Mostrar": renomear e esconder o card do professor quando OFF

- **TASK:** #398 (pedida em 2026-10-26) · **Nível:** `MEDIO` (pedido direto do usuário: Devin)

## Pedido

Sobre o interruptor do card "Notas e média" (hoje "MOSTRAR AOS ALUNOS"):
> "mude o nome pra Mostrar, e quando deshabilitado, esconda do professor tambem"

## Itens

| Item | Descrição | Status |
|---|---|---|
| 398.1 | Renomear o rótulo `ROTULO_VISIBILIDADE_CARD` de "Mostrar aos alunos" para **"Mostrar"** (`card-notas-visibilidade.js`) | ✅ 2026-10-26 |
| 398.2 | Quando o interruptor está OFF, esconder o corpo do card **também do professor** (combos, filtro, tabela, rodapé e aviso); ficam só o título e o próprio interruptor, para religar | ✅ 2026-10-26 |

## Implementação

- `card-notas-visibilidade.js`:
  - `ROTULO_VISIBILIDADE_CARD = 'Mostrar'`.
  - Nova `aplicarVisibilidadeCorpoNotas(visivel)`: só para o professor
    (`estadoNotas.ehProfessor`), põe `hidden` em `selecao`, `filtro`, `tabela`, `rodape`, `faixa`
    (e esconde o `aviso` quando OFF). Chamada ao fim de `alternarVisibilidadeNotas` (clique) e de
    `atualizarVisibilidadeNotas` (troca de turma / carga inicial), sempre com o estado final do
    interruptor.
- O aluno não é afetado (já só vê o card com a linha ligada; a visão dele usa outro caminho).

## Verificação

- `node --check assets/js/card-notas-visibilidade.js`: OK.
- Conferência visual na tela fica com o usuário (regra: sem navegador nesta sessão).
