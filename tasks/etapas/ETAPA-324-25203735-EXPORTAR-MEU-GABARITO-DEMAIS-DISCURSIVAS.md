## Etapa 324-25203735 — "Exportar Meu Gabarito" nas demais atividades discursivas

**Tarefa:** #197-25203735-ba0e-4629-b6d4-27073640d497 · **Pedido em:** 2026-10-16 10:42 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** o mesmo da #196 (etapa 323-bf204d96): "...e mais 1 tarefa pra fazer pra outras
atividades,alem desta [...] e deixe a outra pra outras ias"
**Objetivo:** levar o botão **Exportar Meu Gabarito** (só depois de o aluno finalizar) para as
outras atividades discursivas, além da id 152, do mesmo jeito que a #196 fizer.

### Decisões

- 2026-10-16 10:42 — Fica **livre para outras IAs**, a pedido do usuário. Depende da #196.1: é
  ela que define como o botão funciona; ao entregá-la, quem fez revê o nível desta subtarefa.

### #197.1 — Exportar Meu Gabarito nas demais discursivas

**Próximo passo:** dividir em subtarefas por matéria (cada uma com até 3 páginas pode ser
LEVE) e ligar o botão nas páginas da lista abaixo.

- **Nível:** PESADO — mudança em massa (33 páginas em 4 matérias); revisto em 2026-10-16 10:48
  na entrega da #196.1. Dividida por matéria em pedaços de até 3 páginas, cada pedaço é LEVE
  (só um atributo no `<body>`, sem lógica: o código do botão já é global).
- **Como fazer (vem da #196.1):** em cada página discursiva (carrega
  `assets/js/avaliacao-discursiva.js`) pôr `data-exportar-meu-gabarito="sim"` no `<body>`. Se a
  página vem do gerador `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`,
  pôr também `- **Exportar Meu Gabarito:** sim` no cabeçalho da fonte `.md` (senão a próxima
  geração tira o botão). Nada de banco e nada de JS: o PDF já lê as respostas do banco depois
  da entrega.
- **Páginas sem o botão (levantamento de 2026-10-16 10:48):** Análise de Dados Aplicada à
  Gestão (1), Introdução à Comunicação Oral e Escrita — Rio do Sul Mais Tech (2), Reforço de
  Linguagens — Rio do Sul Mais Tech (10), Banco de Dados — Técnico em Informática para
  Internet (20). Comando: `grep -rl "avaliacao-discursiva.js" --include=*.html MATERIAIS |
  xargs grep -L 'data-exportar-meu-gabarito="sim"'`. Testes de Front-End e Introdução às TIC
  já têm.
- **Critérios de aceitação:** em cada discursiva, o botão só aparece para o aluno que já
  finalizou e exporta o gabarito dele; nada de resposta certa no HTML do site.

### #197.2 — Aceite do usuário

**Próximo passo:** 👀 depois da #197.1, o usuário confere o botão em outra discursiva.

- **Nível:** LEVE — conferência do usuário.
