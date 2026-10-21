## Etapa 461-260986a7 — Accordeon na equipe: clicar expande e recolhe os alunos

**Tarefa:** #332-260986a7-71f9-47fc-b41b-c617b313e758 · **Pedido em:** 2026-10-21 14:47 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "crie a tarefa pra criar 1 accordeon aqui, na equipe, ao clicar expande os alunos, e
ao clicar de novo colapsa os alunos" (com imagem da linha "EQUIPE 02 (BRAYAN, BRENO, …)" no
modal 👥 Equipes, seguida das linhas dos integrantes)
**Objetivo:** no modal de equipes, clicar no nome da equipe mostra ou esconde as linhas dos
integrantes dela (accordeon), para a lista ficar curta.

### #332.1 — Accordeon nas linhas das equipes do modal

**Próximo passo:** ler `assets/js/equipes-tabela.js` (linha da equipe e dos integrantes) e
`assets/css/equipes-modal.css`; fazer a linha da equipe virar botão de expandir/recolher.

- **Nível:** MEDIO — JS de tela + CSS, até 3 arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** clicar no nome da equipe (área marcada na imagem) alterna as linhas dos
  integrantes; seta ▸/▾ indica o estado; `aria-expanded` no botão. Os botões da linha
  (📎 Atividades, + Integrante, ✏️, 🗑️) continuam funcionando sem abrir/fechar. Proposta: as
  equipes abrem **recolhidas**; depois de incluir/alterar um integrante, a equipe mexida fica
  aberta.
- **Critérios de aceitação:** clicar expande, clicar de novo recolhe; vale para professor e
  aluno líder; `node --check` ok; conferir na tela (usuário).
- **Entrega:** — · **Verificação:** —

### #332.2 — Documentação do accordeon das equipes

**Próximo passo:** esperar a #332.1.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Descrição:** `docs/equipes-sala-de-aula.md` (tela do modal de equipes).
- **Entrega:** — · **Verificação:** —
