## Etapa 460-4f858e55 — Combo "Equipe" no progresso de todas as atividades com equipes

**Tarefa:** #331-4f858e55-94bc-4d7a-91c9-4d22962a12aa · **Pedido em:** 2026-10-21 14:35 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "... FAÇA APENAS AQUI AGORA, E DEPOIS FAÇA 1 TAREFA PRA APLICAR ISSO EM TODOS AS
ATIVIDADES QUE HOUVER EQUIPES" (continuação da #330, etapa 459-a07b91ce)
**Objetivo:** o combo "Equipe" do Progresso da turma (#330, `assets/js/filtro-equipe-progresso.js`)
aparece em toda atividade que tem equipe ligada (`equipe_atividade`), não só na PESQUISA
INTERNET da ITIC.

### #331.1 — Carregar o combo "Equipe" em todas as atividades

**Próximo passo:** carregar `filtro-equipe-progresso.js` pelos módulos que abrem o painel do
professor (`assets/js/avaliacao-discursiva.js` e `assets/js/respostas-atividade.js`, como já
fazem com `progresso-turma-global.js`) e tirar o `<script>` avulso da
`ATIVIDADE-PESQUISA-INTERNET.html`. ⛔ Não mexer no `progresso-turma-global.js` (1000 linhas).

- **Nível:** MEDIO — JS de carregamento, até 3 arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** combo aparece no progresso do professor em qualquer atividade
  (objetiva ou discursiva) com equipe ligada; sem equipe, nada muda; o script não é carregado
  duas vezes; `node --check` ok; conferir na tela (usuário).
- **Entrega:** — · **Verificação:** —

### #331.2 — Documentação: combo "Equipe" em todas as atividades

**Próximo passo:** esperar a #331.1.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Descrição:** tirar o "só na PESQUISA INTERNET" do item do combo "Equipe" em
  `docs/regras/atividades.md` e atualizar o cabeçalho do `filtro-equipe-progresso.js` não é
  desta subtarefa (é código: vai na #331.1).
- **Entrega:** — · **Verificação:** —
