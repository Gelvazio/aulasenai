## Etapa 558-09481d8c — #411: Botão "Exportar Meu Gabarito" nas atividades objetivas

**Tarefa:** #411-09481d8c · **Pedido em:** 2026-10-27 14:37 · **Criada por:** Claude Haiku 5.5 (local · main)
**Pedido:** "Abra a tarefa para corrigir o botão Exportar Meu Gabarito nas atividades objetivas." (o botão não aparece em `ATIVIDADES-AULA-01-50-QUESTOES.html`, para o aluno Sérgio Barboza de Oliveira Junior)
**Objetivo:** fazer o botão "📄 Exportar Meu Gabarito" aparecer para o aluno logado em todas as atividades objetivas, como já aparece nas práticas e discursivas.

**Causa (diagnóstico feito por leitura de código):** o `<body>` das páginas objetivas não tem `data-exportar-meu-gabarito="sim"`. Sem o atributo, `assets/js/respostas-atividade.js` (função `abrirMeuGabaritoObjetiva`) não carrega `minhas-respostas-objetiva.js`, e o botão nunca é montado. As páginas práticas têm o atributo (ex.: `ATIVIDADE-PRATICA-AULA-01.html`); o gerador das objetivas (`assets/gerador-atividades/`) nunca o grava.

### Escopo

- **Entra:**
  - Gerador das atividades objetivas (`assets/gerador-atividades/`): gravar `data-exportar-meu-gabarito="sim"` no `<body>` de toda página objetiva.
  - Páginas objetivas já geradas em `MATERIAIS/*/*/ATIVIDADES/*-QUESTOES.html` (ou nome equivalente das objetivas): acrescentar o mesmo atributo, sem regerar o conteúdo, para o botão aparecer já.
- **Não entra:** mudar a lógica do botão, do PDF ou da liberação de tentativas (`botao-minhas-respostas.js`, `pdf-minhas-respostas.js`, `minhas-respostas-objetiva.js`); mexer nas práticas e discursivas (já corretas); mudar o título "50 Questões" da página (ver Riscos); mudar banco, RLS ou dados de alunos; mexer em outras matérias além das objetivas geradas.

### Critério de pronto

- `grep` mostra `data-exportar-meu-gabarito="sim"` no `<body>` de todas as páginas objetivas.
- `ATIVIDADES-AULA-01-50-QUESTOES.html` tem o atributo no `<body>`.
- O gerador, ao gerar uma objetiva nova, grava o atributo (conferido por leitura do código e `node --check` / `python -m py_compile`).
- Verificação de tela: aluno logado vê o botão (desativado até a entrega, com a dica "Disponível depois de entregar a atividade."). **Não verificável por mim sem navegador**: o usuário confirma na página.

### Riscos

- **Sem navegador:** a aparição do botão só pode ser confirmada pelo usuário na página. Plano B: o usuário testa com o aluno logado.
- **Páginas objetivas em grande número:** acrescentar o atributo em todas é mudança em massa. Por isso a etapa é grande e pede aprovação antes da execução.
- **Título divergente:** `ATIVIDADES-AULA-01-50-QUESTOES.html` diz "50 Questões" no título, mas `data-total="20"` e o texto dizem 20. Fora do escopo desta tarefa; registrar em Pendências se o usuário confirmar que é erro de geração.

### Plano (aguardando aprovação)

1. Localizar o gerador das objetivas e o ponto em que o `<body>` é montado; incluir o atributo (`#411.1`).
2. Listar as páginas objetivas afetadas e acrescentar o atributo nelas, sem alterar o restante (`#411.2`).
3. Conferir por leitura (grep dos atributos, `py_compile`) e registrar a verificação (`#411.3`).

### Decisões

- 2026-10-27 (usuário): pediu a abertura da tarefa para corrigir o botão nas atividades objetivas.
- 2026-10-27 (usuário, "Aprovo o plano da #411"): plano aprovado; execução pelo Sonnet nas subtarefas 411.1 e 411.2.
- 2026-10-27 (Haiku, C52): níveis e modelos das subtarefas não foram escritos pela IA; quem classifica é o Jev.

### 411.1 — Gerador das objetivas grava o atributo

**Próximo passo:** (entregue) — nada; segue a 411.2.

- **Nível:** MEDIO — classificado (jev (confiança 0.82))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Descrição:** o gerador grava `data-exportar-meu-gabarito="sim"` no `<body>` de toda página objetiva, como o gerador de discursivas já faz (`CAMPO_EXPORTAR_MEU_GABARITO` em `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`).
- **Critérios de aceitação:** toda página objetiva gerada nova traz o atributo; nenhuma outra linha do gerador muda.
- **Entrega:** `assets/gerador-atividades/template_atividade.html` (o `<body>` ganhou `data-exportar-meu-gabarito="sim"`; o `gerar_atividades.py` monta a página a partir desse template) · **Verificação:** `git diff` de 1 linha conferido pelo líder; `py_compile` do gerador ok; nenhuma página regerada.

### 411.2 — Páginas objetivas existentes recebem o atributo

**Próximo passo:** depois do 411.1, listar as páginas objetivas sem o atributo e acrescentá-lo no `<body>`.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** acrescentar `data-exportar-meu-gabarito="sim"` no `<body>` das páginas objetivas existentes, sem mudar mais nada da página.
- **Critérios de aceitação:** grep mostra o atributo em todas as objetivas; nenhuma outra linha da página muda.
- **Entrega:** — · **Verificação:** — (a preencher na entrega)
