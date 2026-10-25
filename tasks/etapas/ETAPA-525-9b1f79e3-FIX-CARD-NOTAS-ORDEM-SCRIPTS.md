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

## Verificação

- `node --check` nos dois arquivos: OK.
- Com a injeção sequencial, `card-notas-media.js` só executa depois que o repositório executou —
  a guarda cobre qualquer resquício de corrida. Se o repositório realmente falhar no fetch, o
  aviso passa a dizer isso explicitamente.
- Conferência visual na tela fica com o usuário (regra: sem navegador nesta sessão).
- Agente de investigação (somente leitura) rodou em paralelo para procurar a causa raiz.
