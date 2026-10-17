## Etapa 311-85eb3106 — Página do banco de horas (accordion por semana, "Lançado?" on/off)

**Tarefa:** #184-85eb3106-14de-4016-8864-ad21ca69c5d3 · **Pedido em:** 2026-10-15 20:32 · **Criada por:** Claude Code (Opus 5.5) (local · main · s4)
**Pedido:** "NESTA MESMA PASTA CRIE 1 ARQUIVO DE NOME index.html, que deve ter em forma de
accordion, cada semana, e ao lado de cada dia deve ter um botao do tipo on/off, Lançado?, e guarde
no localstorage o resultado do botao pra recarregar com a opcap salva" — "só crie as tarefas, não
assuma".
**Objetivo:** ver o banco de horas de `CONTROLE-HORARIOS.txt` semana a semana e marcar cada dia
como lançado, sem perder a marcação ao recarregar.

### #184.1 — Criar o `index.html` do banco de horas

**Próximo passo:** pedir detalhes ao usuário (de onde vêm os dados: embutidos na página ou lidos
do `.txt`; se o `.vercelignore` deve tirar a pasta do site) e depois criar a página.

- **Nível:** MEDIO — tela com lógica (HTML, CSS e JS), de 1 a 3 arquivos.
- **Modelo:** só Sonnet — nunca outro (#247)
- **Descrição:** em `GERADOR-AULAS/BANCO-HORAS-GELVAZIO-CAMARGO/`, `index.html` com um accordion
  por semana (dias + sábado da semana); ao lado de cada dia, botão ON/OFF "Lançado?"; o estado de
  cada botão vai para o `localStorage` e volta ao recarregar.
- **Critérios de aceitação:** todas as semanas do `.txt` aparecem; cada dia tem o botão; marcação
  mantida depois de recarregar; HTML, CSS e JS separados; `node --check` no JS.

### #184.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre a página e confere (sem navegador pela IA).

- **Nível:** LEVE — só conferência do usuário.
- **Modelo:** Usuário — nenhuma IA executa (#247)
