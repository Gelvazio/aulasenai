# 🎯 Atividade Dinâmica — etapa de sala de aula com nota do professor (tarefas #381 e #382)

Pedida pelo usuário em 2026-10-26. Cada aula ganha **mais uma etapa**: uma dinâmica feita em sala, com
roteiro do professor, ficha do aluno ou grupo, tempo e materiais, **card no índice de atividades** e
**nota lançada pelo professor** (que entra na média). Piloto: aulas 01 a 03 de Fundamentos de UI/UX
(#381); depois as demais matérias (#382).

## Perfil (respostas do usuário)

| Item | Decisão |
|---|---|
| Formatos | Todos os 4 em toda aula; o professor escolhe na hora: **individual, duplas, grupos (3–5), turma toda** |
| Estilos | Jogo/competição, role-play ou mão na massa (um por aula; estudo de caso não entra) |
| Avaliação | **Nota do professor**, 0 a 10, por aluno ou por grupo; entra na média |
| Entrega por aula | Roteiro do professor · ficha do aluno/grupo · tempo e materiais · card na aula |
| Contexto | "Você como aluno consultor", sem empresa fictícia (`atividades-banco.md`) |

## Fonte: `ATIVIDADES/CONTEUDO/ATIVIDADE-DINAMICA-AULA-NN.md`

Fora do site (`.vercelignore`). Só se cria **depois** do Markdown da aula em `CONTEUDO/` (regra
"atividades só depois do Markdown"); o tema vem desse arquivo, nunca de PDF.

```markdown
# Atividade: Atividade Dinâmica — Aula 01

- **Aula:** 01
- **Rótulo da aula:** Atividade Dinâmica — Aula 01
- **Tema:** <tema da aula>
- **Ícone:** 🎯
- **Duração:** 30–40 minutos
- **Estilo:** Jogo/competição            (ou Role-play, ou Mão na massa)
- **Materiais:** folha, canetas, cronômetro
- **Capacidade avaliada:** <texto curto>
- **Turma:** <opcional>
- **Aula no banco:** 01

**Contexto do curso:** Você, como aluno consultor, ...

## OBJETIVO
<1 a 3 frases>

## FORMATOS
- **Individual:** <como organizar>
- **Em duplas:** <como organizar>
- **Em grupos:** <3 a 5 alunos; como organizar>
- **Turma toda:** <como organizar>

## ROTEIRO
- 5 min · Abertura: <o que o professor faz>
- 20 min · Dinâmica: <...>

## FICHA
- <campo que o aluno ou grupo preenche>

## CRITÉRIOS DE NOTA
- <critério> (3)
- <critério> (7)
```

**Regras da fonte:** os pontos dos critérios **somam 10**; o roteiro tem ao menos 2 momentos; os 4
formatos são obrigatórios; a ficha tem ao menos 1 campo.

## Página gerada

`ATIVIDADE-DINAMICA-AULA-NN.html` na pasta ATIVIDADES, por
`assets/gerador-atividade-dinamica/gerar_atividade_dinamica.py`. Mostra a todos: informações gerais
(duração, estilo, materiais), objetivo, formatos e **ficha** (imprimível). Só o **professor** vê o
roteiro e o painel de notas (`assets/js/nota-dinamica-professor.js`); o aluno vê a própria nota depois
de lançada (`assets/js/nota-dinamica-aluno.js`). Nasce **bloqueada**; o professor libera no índice.

## Banco

Tabela `nota_dinamica` (`database/2026-10-26-nota-dinamica.sql`): uma nota por aluno e atividade, com
`formato`, `grupo` e `comentario`; RLS: professor lê/grava só alunos que pode ver; aluno lê só a própria.
A nota entra em `notas_media_final` (`atividade_eh_dinamica`). Detalhes: `docs/database.md`.

## Verificação

`py_compile` do gerador, `node --check` dos JS, leitura do HTML gerado e consulta das políticas.
Sem navegador: o usuário confere a tela.
