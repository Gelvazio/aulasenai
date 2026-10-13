# Visualizador de regras e tarefas (`.claude/rules/index.html`)

**Criado em:** 2026-10-13 09:51 · **Executor:** Claude Code (local · main)
**Tarefa:** #28-9201b27b-7630-41cb · **Etapa:** 147-9201b27b
**Status geral:** ✅ Concluído em 2026-10-13 09:57 (aguardando aceite)

## Objetivo
Uma página `index.html` em `.claude/rules/` para o professor **ler as regras e as tarefas** de forma
visual: cards clicáveis por categoria que abrem um modal com o texto completo, e uma aba **TASKS**.

## Escopo
- **Entra:**
  - Aba **REGRAS**: um card por seção (`##`) de cada arquivo de `.claude/rules/`, agrupados por
    categoria (Sempre, Planejar, Código, Banco, Conteúdo, Ferramentas) e com etiqueta de tipo
    (obrigatória, proibição, fluxo, referência); busca por texto e filtro por categoria.
  - Aba **TASKS**: todas as tarefas da tabela "📌 Tarefas" do `tasks/STATUS.md` (status, próximo
    passo, em uso por), com filtro por status; o card abre um modal com o bloco do `TASKS.md` e os
    itens da etapa ligada (`tasks/etapas/`). Também as frentes de trabalho e o "Aguardando o usuário".
  - Gerador `scripts/regras/gerar_visualizador_regras.py`: lê os `.md` e grava o `index.html`
    **autocontido** (abre com duplo clique, sem servidor e sem internet).
  - Regra nova `.claude/rules/visualizador-regras.md` + anotação no `AGENTS.md`: o `index.html` é
    **só um visualizador** (não é página do projeto, não entra em menus) e **toda mudança em
    `.claude/rules/` ou no quadro (`tasks/`) exige rodar o gerador** e commitar o `index.html` junto.
- **Não entra:** editar regras ou tarefas pela página; ler o banco; validar no navegador (o usuário
  abre e confere).

## Por que um gerador
Abrindo por duplo clique (`file://`), o navegador **bloqueia** a leitura dos `.md` pela página.
Por isso o conteúdo vai embutido no HTML, e o gerador refaz tudo em 1 comando — é o que mantém a
página "em tempo real" a cada mudança.

## Passos
| # | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Gerador: ler regras (seções, categoria, tipo) | `scripts/regras/gerar_visualizador_regras.py` | rodar e contar seções | ✅ |
| 2 | Gerador: ler tarefas, frentes, aguardando, TASKS.md e etapas | idem | contar tarefas = linhas da tabela | ✅ |
| 3 | Modelo da página (abas, cards, modal, busca, filtros, tema escuro) | `scripts/regras/visualizador/modelo.html` | `node --check` no JS extraído | ✅ |
| 4 | Gerar `index.html` | `.claude/rules/index.html` | tamanho e JSON embutido válido | ✅ |
| 5 | Regra nova + `AGENTS.md` + `INDEX.md` | `.claude/rules/visualizador-regras.md`, `AGENTS.md`, `INDEX.md` | ≤ 5 KB | ✅ |
| 6 | STATUS + commit + push | — | — | ✅ |

## Riscos
| Risco | Plano B |
|---|---|
| Esquecer de rodar o gerador e a página ficar velha | Regra explícita + data/hora de geração no topo da página |
| Tabela do STATUS mudar de formato | Gerador acha a tabela pelo cabeçalho; se não achar, mostra aviso na aba |
| `index.html` passar de 5 KB | O limite vale para as regras `.md`; o HTML é gerado (anotado na regra) |

## Conclusão
- Aprovado em 2026-10-13 09:55 ("Sim, executar", com gerador).
- Mudança de escopo pedida pelo usuário durante a execução: o item **Regras** do menu do site
  (`js/header-usuario.js`) abre o visualizador em **nova aba**; o modal antigo
  (`assets/js/regras-modal.js` e `assets/css/regras-modal.css`) ficou sem uso e foi removido.
- Corrigido: no Git Bash local, `TZ=America/Sao_Paulo date` sai em GMT; as horas das etapas 146/147
  foram ajustadas e o `essentials.md` diz para usar `date` no Windows.
- Observação: `.claude/` não está no `.vercelignore`, então a página também vai ao ar no site (como
  já iam o `CLAUDE.md` e o `tasks/`).
- Concluído em 2026-10-13 09:57.
