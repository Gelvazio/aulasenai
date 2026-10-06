# Quadro de respostas no início da atividade (e na exportação)

- **Pedido:** 2026-10-06 (usuário) — primeira atividade: ITIC,
  `ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html` (40 questões).
- **Criado em:** 2026-10-06 · **Concluído em:** — · **Tempo decorrido:** —
- **Status:** ⬜ aguardando aprovação

## Objetivo

Colocar no início da atividade um **quadro de respostas** (cartão-resposta): uma linha por
questão (01 a 40) com as opções **A B C D**. O quadro também sai na **exportação (PDF e Word)**:

| Quem exporta | O quadro no PDF/Word |
|---|---|
| **Professor** (sempre) | **Sempre** sai, para impressão. Em branco; se o professor tiver selecionado um aluno e clicado em "Respostas" (relatório do professor), sai com as alternativas **daquele aluno**. |
| **Aluno logado, atividade finalizada** | Sai com as alternativas **marcadas por ele** (lidas do banco, como já aparecem na tela). |
| Aluno com a atividade ainda não finalizada / sem login | Não sai no PDF (só aparece na tela, em branco). |

- Na tela, o quadro é **só de leitura** (as respostas continuam sendo marcadas nas questões);
  ele acompanha as alternativas marcadas na página.
- ❌ O quadro **nunca mostra a resposta certa** (gabarito continua só no banco).

## Escopo

- **Entra:** componente genérico em `assets/` ligado por um campo na fonte `.md`
  (`- **Quadro de respostas:** sim` → `data-quadro-respostas="sim"` no `<body>`), PDF e Word,
  e a regenerada da atividade de sexta com o campo ligado.
- **Não entra:** banco de dados (nada muda no schema nem no RLS), outras atividades (ganham o
  quadro quando o usuário pedir, só ligando o campo), testes automatizados.

## Arquivos previstos

| Arquivo | Ação |
|---|---|
| `assets/js/quadro-respostas.js` (novo) | Monta o quadro na tela e lê as letras marcadas das questões (`.alternativa--marcada`); expõe `lerQuadroRespostasParaExportacao()` |
| `assets/css/quadro-respostas.css` (novo) | Estilo do quadro (grade em colunas, tokens de cor) |
| `assets/gerador-atividades/gerar_atividades.py` + `template_atividade.html` | Campo opcional "Quadro de respostas" → atributo no body + tags do CSS/JS |
| `assets/js/atividade.js` | PDF: desenha o quadro depois das capacidades, conforme a tabela acima |
| `assets/js/exportar-word.js` | Word: mesmo quadro, mesmo lugar (regra "Word igual ao PDF") |
| `.../ATIVIDADE-SEXTA-FEIRA/CONTEUDO/...-QUESTOES.md` (fora do Git) + HTML | Ligar o campo e gerar de novo |
| `CLAUDE.md` (+ versão/histórico) e `STATUS.md` | Registrar a regra do quadro |

## Passos

| # | Ação | Verificação | Status |
|---|---|---|---|
| 1 | Criar `quadro-respostas.js` + `.css` | `node --check` | ⬜ |
| 2 | Campo no gerador e no template | Gerar a atividade de sexta; quadro e tags no HTML | ⬜ |
| 3 | Quadro no PDF (`atividade.js`) | `node --check` + leitura do fluxo por perfil | ⬜ |
| 4 | Quadro no Word (`exportar-word.js`) | `node --check` | ⬜ |
| 5 | Regra no `CLAUDE.md` (visualizador continua lendo a versão) | Regex da versão com `node` | ⬜ |
| 6 | Commit local | `git diff --cached --name-only` | ⬜ |
| 7 | Teste no navegador pelo usuário (aluno finalizado e professor) | Usuário | ⬜ |

## Riscos

| Risco | Plano B |
|---|---|
| Professor exporta com respostas de um aluno sem querer | O quadro só sai preenchido depois de "Respostas" do aluno; título do quadro mostra o nome do aluno ou "em branco" |
| Atividades antigas mudarem | Tudo depende do campo `Quadro de respostas: sim`; sem ele nada muda |
