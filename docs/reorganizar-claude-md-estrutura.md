# Reorganizar o `CLAUDE.md` — estrutura e manutenção

**Criado em:** 2026-10-07 21:05 · **Concluído em:** 2026-10-07 21:25 (aguardando aceite) · **Tempo decorrido:** ~20 min
**Pedido do usuário:** aplicar a parte "Estrutura e manutenção" da análise do `CLAUDE.md`,
**perguntando uma alteração de cada vez**.

## Objetivo

Deixar o `CLAUDE.md` menor e mais fácil de manter (hoje: 2.748 linhas, ~177 mil caracteres,
62 seções `##`), sem perder nenhuma regra nem quebrar o visualizador de regras (menu Regras).

## Escopo

- **Entra:** (1) dividir o detalhe das regras em `docs/regras/*.md`, deixando no `CLAUDE.md` as
  regras críticas e um índice; (2) mover o histórico de versões para `docs/HISTORICO-REGRAS.md`;
  (3) transformar a linha "Próximo passo" do `STATUS.md` em tabela de pendências.
- **Não entra:** corrigir as contradições e os trechos desatualizados (serão perguntados depois,
  um de cada vez); mudar o texto das regras.
- **Critério de pronto:** nenhuma regra perdida (conferência seção por seção), visualizador de
  regras lendo o novo formato, `STATUS.md` atualizado, commit da alteração.

## Tecnologias e arquivos previstos

- `CLAUDE.md`, `docs/regras/*.md` (novos), `docs/HISTORICO-REGRAS.md` (novo), `STATUS.md`.
- Visualizador: `assets/js/regras-modal.js` (+ `assets/css/regras-modal.css`) — se as regras
  saírem do `CLAUDE.md`, o modal precisa carregar também os arquivos de `docs/regras/`.

## Riscos

| Risco | Plano B |
|---|---|
| Regra perder força por sair do arquivo lido automaticamente | Manter no `CLAUDE.md` todas as proibições (⛔/❌) e um índice com "leia antes de mexer em X" |
| Visualizador mostrar só parte das regras | Ajustar o `regras-modal.js` na mesma alteração |
| Perder texto ao mover | Conferir contagem de linhas/seções antes e depois |

## Passos (um de cada vez, com aprovação do usuário em cada um)

| Passo | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Perguntar e aplicar: dividir as regras em `docs/regras/` | `CLAUDE.md`, `docs/regras/*.md`, `regras-modal.js` | todas as seções presentes; `node --check` no JS | ✅ Concluído (2026-10-07 21:15) |
| 2 | Perguntar e aplicar: histórico para `docs/HISTORICO-REGRAS.md` | `CLAUDE.md`, `docs/HISTORICO-REGRAS.md` | linha "Versão das regras" mantida no topo | ✅ Concluído (2026-10-07 21:18) |
| 3 | Perguntar e aplicar: "Próximo passo" do `STATUS.md` em tabela | `STATUS.md` | nenhuma pendência perdida, duplicada removida (49.2) | ✅ Concluído (2026-10-07 21:25) |
| 4 | Versão das regras + histórico + commit | `CLAUDE.md` | commit feito | ✅ Concluído (2026-10-07 21:25) |
| 5 | Aceite do usuário | — | — | ⬜ Pendente |
