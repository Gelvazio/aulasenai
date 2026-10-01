# Corrigir a sequência de aulas de 5 ementas do Rio do Sul Mais Tech

- **Criada em:** 2026-10-01 14:58
- **Concluída em:** 2026-10-01 15:10
- **Tempo decorrido:** ~12 min (após a aprovação)
- **Status geral:** ✅ Concluído

## Objetivo

Trocar a seção `## 🗓️ VI. SEQUÊNCIA DE AULAS DETALHADA` das 5 ementas de matéria que hoje
trazem o mesmo modelo genérico (8 aulas: "Apresentação e Diagnóstico 1h", "Conceitos
Fundamentais 1,5h"... somando só 10h) por uma sequência **específica de cada matéria**, que:

- use as aulas que já existem em `<MATERIA>/AULAS/AULA-NN.md` (títulos e objetivos);
- some exatamente a carga horária da UC na ementa do curso (fonte da verdade);
- cite os conhecimentos da UC no `EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md` em cada aula.

## Escopo

| Matéria | CH (ementa do curso) | Nova sequência |
|---|---|---|
| COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO | 36h | 9 aulas × 4h = 36h |
| NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS | 36h | 9 aulas × 4h = 36h |
| OFICINAS_IMPRESSAO_3D_ROBOTICA | 36h | 9 aulas × 4h = 36h |
| EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS | 36h | 9 aulas × 4h = 36h |
| REFORCO_LINGUAGENS | 63h | 16 aulas × 4h = 64h (regra do usuário: UC de 63h conta como 64h) |

- ✅ Curso `RIO_DO_SUL_MAIS_TECH` está em `VERIFICAR` no `STATUS-EMENTAS-CURSOS.md`.
- ⛔ Fora do escopo: Fundamentos e Matemática (já coerentes), as demais seções das ementas, os
  arquivos de aula e a seção III vazia de Competências e Impressão 3D (tarefa separada, se pedida).
- ✅ Regra do usuário (2026-10-01): **1 aula a cada 4 horas**; nas matérias de **63h, considerar
  64h** (16 aulas × 4h). O cabeçalho da ementa continua com a CH oficial (63h).

## Formato de cada aula na seção VI

```markdown
**Aula 3 — Plano de Negócios (4h)**
- Estruturar um plano de negócios básico e analisar a viabilidade do projeto
- Conhecimentos da UC: plano de negócios; planejamento e empreendedorismo
- Prática: esboço do plano de negócios da equipe
```

Introdução da seção: uma frase com o total (ex.: "9 aulas presenciais de 4h = 36h, na ordem
dos arquivos `AULAS/AULA-01.md` a `AULA-09.md`").

## Tamanho (regra 14.800–14.950 caracteres)

A seção VI atual tem ~2.084 caracteres. A nova seção é escrita para ter tamanho parecido; se o
total sair do intervalo, ajustar só dentro da própria seção VI (mais ou menos detalhe por aula).
Linguagens (16 aulas) terá aulas com 2 linhas em vez de 3 para caber.

## Riscos

- Sair do intervalo de tamanho → conferir com `len()` em Python após cada ementa.
- Divergência aula × ementa do curso → a ementa do curso vence; registrar aviso no resultado.

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Reescrever a seção VI de Competências | `MATERIAIS/RIO_DO_SUL_MAIS_TECH/COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/EMENTA-CHALKIE-AI.md` | soma = 36h; tamanho no intervalo | ✅ Concluído |
| 2 | Reescrever a seção VI de Eletricidade | `.../NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/EMENTA-CHALKIE-AI.md` | soma = 36h; tamanho | ✅ Concluído |
| 3 | Reescrever a seção VI de Impressão 3D e Robótica | `.../OFICINAS_IMPRESSAO_3D_ROBOTICA/EMENTA-CHALKIE-AI.md` | soma = 36h; tamanho | ✅ Concluído |
| 4 | Reescrever a seção VI de Carreiras | `.../EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/EMENTA-CHALKIE-AI.md` | soma = 36h; tamanho | ✅ Concluído |
| 5 | Reescrever a seção VI de Linguagens | `.../REFORCO_LINGUAGENS/EMENTA-CHALKIE-AI.md` | soma = 64h; tamanho | ✅ Concluído |
| 6 | Regenerar status | `scripts/criar-status-ementas.py` e `criar-status-cursos.py` (pasta do curso) | 5 matérias "CONFORME" | ✅ Concluído |
| 7 | Commit local + grafo | arquivos acima + este plano | `git diff --cached --name-only` | ✅ Concluído |

## Resultado

| Matéria | Aulas | Horas | Tamanho antes → depois |
|---|---|---|---|
| Competências Socioemocionais | 9 | 36h | 14.852 → 14.888 ✅ |
| Noções de Eletricidade | 9 | 36h | 14.858 → 14.863 ✅ |
| Impressão 3D e Robótica | 9 | 36h | 14.863 → 14.903 ✅ |
| Exploração de Carreiras | 9 | 36h | 14.864 → 14.850 ✅ |
| Reforço de Linguagens | 16 | 64h | 14.872 → 14.928 ✅ |

- Só a seção VI foi trocada; finais de linha (CRLF) preservados.
- Linguagens: aulas em formato compacto (uma linha "Foco · Prática") para caber no tamanho.
- `STATUS-EMENTAS.md` das 5 matérias e `STATUS-EMENTAS-CURSOS.md` regenerados.
- Pendência fora do escopo: seção III (Conteúdos Programáticos) vazia em Competências e em
  Impressão 3D e Robótica.
