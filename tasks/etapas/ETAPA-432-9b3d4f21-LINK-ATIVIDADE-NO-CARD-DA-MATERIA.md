## Etapa 432-9b3d4f21 — #303: Link da atividade no card da matéria Noções de Eletricidade

**Tarefa:** #303 · **Pedido em:** 2026-10-20 10:12 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s30)
**Pedido:** "falta o link aqui no card" (print do card **MATÉRIA — NOCOES ELETRICIDADE CIRCUITOS
BASICOS** com "Nenhuma atividade cadastrada" e o botão "Sem atividades").
**Objetivo:** o card da matéria mostra a atividade "Liga ou Desliga?" (id 165, aula 134) com o link
para a página do jogo.

### #303.1 — Descobrir por que o card não mostra a atividade e ligar o link

**Próximo passo:** ✅ entregue; #303 concluída.

- **Nível:** MEDIO — código de tela em até 3 arquivos (provisório: se a causa for banco/RLS, sobe para PESADO e esta subtarefa é liberada).
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** o card diz "NOCOES ELETRICIDADE CIRCUITOS BASICOS" (sem acento, em maiúsculas), diferente da matéria 51 do banco ("Noções de Eletricidade e Circuitos Básicos"); investigar a fonte do card e corrigir.
- **Critérios de aceitação:** o card lista a atividade 165 com o link para a página do jogo.
- **Causa:** o card é gerado por `assets/gerador-indices/gerar_indices.py`, que conta as páginas `.html` da pasta `ATIVIDADES/`; o `index.html` do curso foi gerado antes de o jogo existir na pasta.
- **Entrega:** gerador rodado só para o curso Rio do Sul Mais Tech (sem a pasta MUNDO-SENAI, que é de outra sessão e ainda não está no Git): regravados `MATERIAIS/RIO_DO_SUL_MAIS_TECH/index.html` e `NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/ATIVIDADES/index.html`, em 2026-10-20 10:30 (s30).
- **Verificação:** diff: o card passou a "1 arquivos de atividade" com o botão "📚 Atividades" (`btn principal`) para `NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/ATIVIDADES/index.html`, e o índice da matéria lista o jogo com o botão "Abrir".
