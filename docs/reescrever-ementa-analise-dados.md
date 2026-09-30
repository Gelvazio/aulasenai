# Reescrever `EMENTA-CHALKIE-AI.md` de Análise de Dados Aplicada à Gestão

- **Criado em:** 2026-09-23 20:05
- **Concluído em:** 2026-09-24 06:58
- **Tempo decorrido:** a sessão atravessou a noite; o intervalo de relógio (~653 min) não mede o trabalho
- **Status geral:** ✅ Concluído

## Objetivo

Trocar o modelo genérico atual (capacidades e módulos de modelo, 11h de aulas num curso de 35h,
"EFGestãoeDados", uma frase repetida ~7 vezes para chegar ao tamanho) por uma ementa específica,
no padrão da ITIC, dentro da faixa de 14.800–14.950 caracteres.

## Fontes

| Fonte | Uso |
|---|---|
| `EMENTA-ANALISE-DADOS-APLICADA-GESTAO.md` | **[oficial]**: função, objetivo, 2 capacidades, conhecimentos 1.1–1.8 e 2.1–2.2.8, eixo BNCC, 8 socioemocionais, recursos, bibliografia |
| `PLANO-AULAS-ANALISE-DADOS-APLICADA-GESTAO.md` | 4 aulas × 8h (32h), conteúdos, 4 avaliações e pesos |
| Pastas `AULAS-CHALKIE-AI-VERSAO-FINAL/`, `ATIVIDADES/`, `ESTRUTURACAO-PLANO-ENSINO/`, `LISTA-DE-SA/`, `GUIAS_PROFESSOR/` | Materiais citados |

## Divergências encontradas (a ementa oficial vence)

- A carga horária do Chalkie antigo (35h) diverge da oficial (32h): passa a usar 32h.
- O plano tem linhas soltas de uma versão antiga no cronograma (linhas 241–242, "15-16 | Dashboards")
  e diz "28h aulas + 4h avaliações", mas as avaliações somam 5h. A ementa registra 4 aulas × 8h,
  com as avaliações dentro de cada aula. **O plano não foi alterado.**

## Passos

| # | Passo | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Reescrever a ementa | `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/EMENTA-CHALKIE-AI.md` | 14.800–14.950; todo o [oficial] presente; sem "Reconhecer conceitos" | ✅ Concluído |
| 2 | Regenerar o consolidado | `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | matéria como ✅ Conforme | ✅ Concluído |
| 3 | Commit local | — | hash registrado | ✅ Concluído |

A matéria não tem `STATUS-EMENTAS.md` próprio.

## Resultado final

- Ementa reescrita: 14.858 caracteres, sem o texto do modelo genérico e sem frase repetida.
- Todo o conteúdo [oficial] presente: função, objetivo, 2 capacidades, conhecimentos 1.1–1.8 e 2.1–2.2.8,
  eixo Investigação Científica, 8 socioemocionais, ambientes, equipamentos, material, perfil docente, bibliografia.
- Sequência real: 4 aulas × 8h (32h), 4 avaliações com pesos 25/25/20/25 + 5% participação.
- 12 indicadores, 9 situações-problema de gestão de materiais, dificuldades comuns, acessibilidade, 8 prompts.
- Consolidado regenerado: a matéria aparece como ✅ Conforme.
