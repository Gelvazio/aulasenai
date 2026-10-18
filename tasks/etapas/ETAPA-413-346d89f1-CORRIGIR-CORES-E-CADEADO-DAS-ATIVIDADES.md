## Etapa 413-346d89f1 — #284: Corrigir as cores das atividades e o cadeado da atividade bloqueada

**Tarefa:** #284 · **Pedido em:** 2026-10-18 19:54 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "as cores nao estao sendo aplicadas,e as *atividades bloqueadas*,devem aparecer ao aluno,mas
levemente apagadas e com um cadeado em cima"
**Objetivo:** (1) fazer as cores da #283 aparecerem de fato no botão de cada atividade do aluno
(verde = entregue, amarelo = pendente, vermelho fraco piscando = não feita); (2) a atividade
bloqueada continua aparecendo para o aluno, mas **levemente apagada e com um cadeado em cima do
botão**, em vez do 🔒 colado no começo do nome.

### Escopo

- **Entra:** `assets/js/indice-atividades-feitas.js` e `assets/css/indice-atividades-feitas.css`
  (cores), `assets/js/indice-atividades-bloqueio.js` e `assets/css/indice-atividades-bloquear.css`
  (cadeado em cima da atividade bloqueada) e a regra em `docs/regras/atividades.md`.
- **Não entra:** banco (nenhuma tabela, RLS ou função muda), o visual do professor, a aula bloqueada
  (card inteiro) e o filtro "Fez Atividade?".
- **Pronto quando:** o aluno logado vê as 3 cores certas em cada atividade (e o cadeado 🔒 sobre o
  botão da atividade bloqueada, que fica apagada e não abre); sem erro de JS.
- ⚠️ Sem navegador: a conferência na tela é do usuário.

### #284.1 — Cores visíveis e cadeado sobre a atividade bloqueada

**Próximo passo:** achar por que a cor não chega ao botão (diagnóstico) e trocar o 🔒 do nome pelo
cadeado sobre o botão.

**Próximo passo:** — (entregue em 2026-10-18 19:57).

- **Nível:** MEDIO — tela: correção em 2 JS + 2 CSS e a regra; sem banco.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Executor:** DeepSeek Harness (deepseek-flash) (local · main)
- **Descrição:** (1) **diagnóstico das cores:** conferir por que a classe não pinta o botão — ordem
  em que o módulo roda (card do HTML × card do banco, evento `cards-aula-montados`), falha de
  consulta que cai no `catch` (ex.: `entrega_atividade`), sessão/`perfil` do aluno e
  especificidade/ordem do CSS; corrigir o que for e garantir que a classe seja refeita depois da
  grade do banco. (2) **cadeado em cima:** a atividade bloqueada do aluno deixa de ter o `🔒` no
  começo do nome e ganha um cadeado **sobre** o botão (overlay) com o botão levemente apagado
  (opacidade), sem abrir; o visual do professor não muda.
- **Critérios de aceitação:** as 3 cores aparecem no botão do aluno; o cadeado aparece em cima do
  botão da atividade bloqueada, que fica apagado e não abre; professor e visitante sem cor; nada de
  banco.
- **Entrega:** `assets/js/indice-atividades-feitas.js` — a sessão do Supabase pode não estar pronta
  na abertura: `aguardarPerfilFeitas` tenta o perfil 10 vezes (300 ms) antes de desistir; a leitura
  de `entrega_atividade` virou não fatal (`.catch(() => [])`), então a cor ainda sai pelo que foi
  respondido; `window.load` reaplica as cores como rede de segurança (se o evento
  `cards-aula-montados` chegar antes deste módulo). `assets/css/indice-atividades-feitas.css` — os
  seletores das 3 cores foram reforçados para `article.aula a.btn.principal.atividade--…`
  (0,4,0), para vencer com folga as regras do botão da atividade e do bloqueio. `assets/css/
  indice-atividades-bloquear.css` — o cadeado saiu do começo do nome (`::before`): agora a
  atividade bloqueada do aluno ganha um **cadeado em cima do botão** (`::after` com `inset: 0`,
  centralizado) e um véu branco translúcido (`rgba(255,255,255,0.6)`) que a deixa levemente
  apagada, sem `opacity` (o cadeado fica legível), sem abrir (o link continua sem `href`).
- **Verificação:** `node --check assets/js/indice-atividades-feitas.js` OK; CSS conferido (pseudo-
  elemento `::after` sobre o botão, `pointer-events: none`); conferido que as 3 classes continuam
  sendo aplicadas depois do evento `cards-aula-montados` e no `window.load`; nenhum arquivo de
  banco/RLS tocado; `git diff --check` limpo nos arquivos da tarefa; sem navegador (conferir na tela
  é do usuário).
- **Anotação:** as cores são só do **aluno logado** (o professor não responde atividade, então não
  tem estado para colorir); se a conferência for feita logado como professor, nenhuma cor aparece
  por projeto.
