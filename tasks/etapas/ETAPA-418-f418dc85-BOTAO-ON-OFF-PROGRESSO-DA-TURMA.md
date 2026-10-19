## Etapa 418-f418dc85 — #289: Botão ON/OFF ao lado de "Progresso da turma"

**Tarefa:** #289-f418dc85-5962-40ba-86eb-aae0f4c83ec2 · **Pedido em:** 2026-10-18 20:24 · **Criada por:** Claude Code (Opus 5.5) (local · main · s23, sessão lateral aberta pela s22)
**Pedido:** "ao lado de *Progresso da turma*, adicione um botão do tipo on/off, por padrão desligado e que salva status no localstorage, se ele estiver desligado, deve esconder o quadro abaixo de Progresso da Turma, padrão deixe desligado em todas as turmas e todas as atividades"
**Objetivo:** em toda página de atividade, o painel "Progresso da turma" ganha um botão ON/OFF ao
lado do título; desligado (padrão) esconde o quadro logo abaixo do título, ligado mostra; o estado
fica salvo no `localStorage`.

### Decisões

| Quando | Quem | O quê | Por quê |
|---|---|---|---|
| 2026-10-18 20:24 | Claude Code (Opus 5.5, líder s23) | Tarefa pequena (tela, JS/CSS, sem banco) com 1 subtarefa `MEDIO` | Sem banco, segurança ou mudança em massa; se o painel não for de um módulo único, reclassificar antes de delegar |
| 2026-10-18 20:28 | Claude Code (Opus 5.5, líder s23) | O título só é montado em `assets/js/progresso-turma-global.js` (`montarCabecalhoProgressoGlobal`), usado por toda atividade objetiva, prática e discursiva (`respostas-atividade.js` e `avaliacao-discursiva.js`); nenhuma página de `MATERIAIS/**/ATIVIDADES/` monta o painel à mão | Um módulo novo + a ligação no painel cobre todas as atividades: continua `MEDIO` |
| 2026-10-18 20:28 | Claude Code (Opus 5.5, líder s23) | Chave **por atividade**: `progresso-turma:mostrar-quadro:<id da atividade>` (pelo `preferenciasProgressoGlobal`, que já tem o prefixo e o `try/catch`), valores `sim`/`nao`; sem valor = desligado. **Não** é por turma | "Padrão desligado em todas as atividades": com chave global, ligar numa atividade abriria todas ligadas. Por turma, trocar o combo "Turma" faria o quadro sumir e aparecer, o que confunde; a turma só muda a lista dentro do mesmo quadro |
| 2026-10-18 20:28 | Claude Code (Opus 5.5, líder s23) | Desligado esconde tudo abaixo da linha do título (legenda, filtros, contagem, resumo, lista, alunos sem início); a linha do título (título, ON/OFF, combos "Turma"/"Aluno", "📈 Gráficos" e "🧮 Cálculo Nota") continua visível. O painel segue atualizando a cada 5 s | É "o quadro abaixo de Progresso da turma"; ao ligar, os dados já estão em dia |

### #289.1 — Botão ON/OFF do "Progresso da turma" com estado no localStorage

**Próximo passo:** nenhum — entregue em 2026-10-19 06:13 (falta só o professor conferir na tela).

- **Nível:** MEDIO — tela (JS/CSS) em 1 a 3 arquivos; sem banco, sem RLS, sem mudança de dados.
- **Modelo:** só Sonnet — nunca outro (#247); executor-medio, líder Opus 5.5 (s23)
- **Effort:** medium
- **Descrição:** ao lado do título "Progresso da turma", botão ON/OFF no mesmo estilo dos ON/OFF do
  projeto; padrão **OFF** em todas as turmas e atividades; OFF esconde o quadro abaixo do título,
  ON mostra; estado salvo no `localStorage` (chave em constante, leitura e gravação com
  `try/catch`); vale para todos os perfis que já veem o painel.
- **Critérios de aceitação:** botão presente em todas as páginas de atividade (objetiva e
  prática/discursiva); sem estado salvo = OFF e quadro escondido; trocar o botão mostra/esconde e
  grava; recarregar mantém o estado; `node --check` OK; nada de banco.
- **Entrega:** commit `feat(progresso): botão ON/OFF "Mostrar quadro" ao lado do Progresso da
  turma (#289.1)` (2026-10-19 06:13), feito pelo executor-medio (Sonnet), conferido pelo líder:
  - **Novo** `assets/js/mostrar-quadro-progresso.js` — `criarInterruptorQuadroProgresso({ area,
    atividadeId, preferencias })`: ON/OFF "Mostrar quadro" (mesmo estilo
    `progresso-turma__interruptor` dos outros ON/OFF do painel), lê/grava
    `progresso-turma:mostrar-quadro:<id>` (`sim`/`nao`; sem valor = desligado) e aplica o
    modificador `progresso-turma--recolhido` já na criação (o quadro não pisca aberto).
  - `assets/js/progresso-turma-global.js` — `prepararInterruptorQuadroGlobal(area)`, chamada depois
    do combo "Turma" para o ON/OFF ficar logo depois do título; falha → `console.warn` e quadro
    visível; constantes `ARQUIVO_MOSTRAR_QUADRO_PROGRESSO_GLOBAL` e
    `CLASSE_RECOLHIDO_PROGRESSO_GLOBAL` (ajuste pedido pelo líder no lugar da string fixa).
  - `assets/css/progresso-turma-global.css` — `.progresso-turma--recolhido >
    :not(.progresso-turma__cabecalho) { display: none; }`.
  - `docs/regras/atividades.md` — item "ON/OFF Mostrar quadro (2026-10-18, #289)".
- **Verificação:** `node --check` OK nos dois JS; `wc -l` 964 e 64 (< 1000); linhas novas ≤ 100
  caracteres; leitura do código: o painel só é montado por `montarProgressoDaTurma` (objetiva e
  discursiva), então o botão sai em toda atividade; a regra do recolhido (2 classes) vence os
  `display` dos filhos da seção (todos de 1 classe); `localStorage` só pelo
  `preferenciasProgressoGlobal` (com `try/catch`); nada de banco. **Conferir na tela** (sem
  navegador por regra): abrir uma atividade como professor → quadro escondido; ligar → aparece;
  recarregar → continua ligado; outra atividade → abre desligada.
