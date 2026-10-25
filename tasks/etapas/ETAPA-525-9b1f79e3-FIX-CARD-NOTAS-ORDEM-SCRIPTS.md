# ETAPA 525 — Corrigir "lerLoginCard is not defined" no card Notas e média

- **TASK:** #376 (pedida em 2026-10-25; continua o diagnóstico da #375)
- **Nível:** `LEVE` (só Haiku; pedido direto do usuário nesta sessão: Devin)

## Pedido

O usuário reproduziu `Não foi possível carregar as notas. Detalhe: lerLoginCard is not defined`
no Live Server (`http://127.0.0.1:5501/MATERIAIS/.../ATIVIDADES/index.html`), mesmo após recarregar
(não é cache). Pedido: "use mais agentes e corrija agora".

## Diagnóstico já feito (da #375 e desta etapa)

- `assets/js/card-notas-media-repositorio.js` é válido (`node --check`), contém `lerLoginCard`
  (linha 96) e é servido byte-idêntico pelo servidor local (200, `application/javascript`, 13.210 B).
- Zero colisão de nomes top-level entre os scripts da página.
- `card-notas-media.js` executa (o texto "Detalhe:" é da versão nova), mas o repositório não —
  falha de entrega/execução do script dinâmico, não de conteúdo.

## Itens

| Item | Descrição | Status |
|---|---|---|
| 376.1 | `atividades-crud-modal.js`: injetar os 3 scripts do card em **ordem garantida por `onload`** (sequencial, `onerror` continua), sem depender do flag `async=false` | ✅ 2026-10-25 |
| 376.2 | `card-notas-media.js`: `esperarRepositorioNotas()` — espera limitada (~5 s) até `lerLoginCard` existir; se não vier, o aviso mostra a causa real (`card-notas-media-repositorio.js não carregou`) | ✅ 2026-10-25 |
| 376.3 | **CAUSA RAIZ**: `const TABELA_MATERIA_CARD` estava declarada em `indice-aula-repositorio.js` (injetado antes) E em `card-notas-media-repositorio.js` → `SyntaxError: Identifier already declared` ao parsear o repositório → nenhuma função dele (`lerLoginCard`...) registrava. Renomeado para `TABELA_MATERIA_NOTAS` no card | ✅ 2026-10-25 |

## Causa raiz (confirmada por agente de investigação)

Os ~25 scripts do índice são clássicos e dividem o mesmo escopo global (`window`).
`indice-aula-repositorio.js:8` e `card-notas-media-repositorio.js:23` declaravam a mesma
`const TABELA_MATERIA_CARD = 'materia'`. Como o `indice-aula-repositorio.js` é injetado antes,
o parse do `card-notas-media-repositorio.js` lançava `SyntaxError` e o arquivo inteiro era
descartado — HTTP 200 e conteúdo íntegro, mas nenhuma função registrada. Por isso `lerLoginCard`
ficava `undefined`. Corrigido renomeando a constante do card para `TABELA_MATERIA_NOTAS`.

## Verificação

- `node --check` nos dois arquivos: OK.
- Com a injeção sequencial, `card-notas-media.js` só executa depois que o repositório executou —
  a guarda cobre qualquer resquício de corrida. Se o repositório realmente falhar no fetch, o
  aviso passa a dizer isso explicitamente.
- Conferência visual na tela fica com o usuário (regra: sem navegador nesta sessão).
- Agente de investigação (somente leitura) rodou em paralelo para procurar a causa raiz.
