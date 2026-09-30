# Ajustar o tamanho das 4 ementas fora do padrão (sem perder contexto)

- **Criado em:** 2026-09-23 19:46
- **Concluído em:** 2026-09-23 20:00
- **Tempo decorrido:** ~14 min (com a interrupção)
- **Status geral:** ✅ Concluído (retomado com aprovação do usuário)

## Objetivo

Deixar os 4 `EMENTA-CHALKIE-AI.md` fora da faixa de 14.800–14.950 caracteres dentro do padrão, sem
perder conteúdo, e manter os STATUS sincronizados.

| Matéria | Antes | Ajuste |
|---|---|---|
| ASSISTENTE-DE-OPERACOES-LOGISTICAS / INTRODUCAO-TIC | 17.970 | reduzir ~3.100 |
| RIO_DO_SUL_MAIS_TECH / EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS | 13.889 | acrescentar ~980 |
| RIO_DO_SUL_MAIS_TECH / NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS | 13.849 | acrescentar ~1.020 |
| RIO_DO_SUL_MAIS_TECH / REFORCO_LINGUAGENS | 13.869 | acrescentar ~1.000 |

## Estratégia

**ITIC (reduzir):**
- todo conteúdo **[oficial]** fica literal (objetivo, eixo, capacidades, 10 domínios, ambientes, regras
  para IA);
- juntar as tabelas "Sequência" e "Estratégias por aula", que repetem as mesmas 10 aulas;
- compactar glossário, acessibilidade, recuperação e referências (mesma informação, menos texto);
- corrigir as referências a `INFORMATICA-BASICA.md` e `LISTA-KAHOOTS.txt` (apagados no commit
  `ddcc4d1`) e citar as atividades de 50 questões;
- remover a nota "exceção autorizada ao limite", revogada pelo pedido do usuário.

**Rio do Sul (acrescentar):** nova seção "XIII. Mapeamento BNCC e prompts para Chalkie AI",
específica de cada matéria. O checklist do `CLAUDE.md` exige esses dois itens, e as três ementas não
os têm.

**Correção de coerência:** em REFORCO_LINGUAGENS, o guia do Chalkie diz "36h" e o cabeçalho diz
63h; passa a usar 63h.

## Passos

| # | Passo | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Compactar ITIC | `ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/EMENTA-CHALKIE-AI.md` | 14.800–14.950; todo [oficial] presente | ✅ Concluído |
| 2 | Seção XIII em Exploração de Carreiras | `RIO_DO_SUL_MAIS_TECH/EXPLORACAO_.../EMENTA-CHALKIE-AI.md` | 14.800–14.950 | ✅ Concluído |
| 3 | Seção XIII em Noções de Eletricidade | `RIO_DO_SUL_MAIS_TECH/NOCOES_.../EMENTA-CHALKIE-AI.md` | 14.800–14.950 | ✅ Concluído |
| 4 | Seção XIII + 63h em Reforço de Linguagens | `RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/EMENTA-CHALKIE-AI.md` | 14.800–14.950 | ✅ Concluído |
| 5 | Atualizar os STATUS-EMENTAS.md das matérias e o consolidado | `STATUS-EMENTAS.md` + `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | consolidado sem "fora do tamanho" | ✅ Concluído |
| 6 | Commit local | — | hash registrado | ✅ Concluído |

## Resultado final

| Matéria | Antes | Depois | Como |
|---|---|---|---|
| ITIC (AOL) | 17.970 | 14.917 | Compactação; as 11 marcações [oficial] mantidas literais |
| Exploração de Carreiras | 13.889 | 14.858 | Seção XIII: BNCC + 5 prompts |
| Noções de Eletricidade | 13.849 | 14.852 | Seção XIII: BNCC + 5 prompts |
| Reforço de Linguagens | 13.869 | 14.866 | Seção XIII: BNCC + 5 prompts; guia do Chalkie corrigido para 63h |

- `STATUS-EMENTAS.md` das 3 matérias do Rio do Sul atualizados (ITIC não tem esse arquivo).
- `STATUS-EMENTAS-CURSOS.md` regenerado: nenhuma ementa fora do tamanho nos cursos em VERIFICAR.
- Retomado após a regra STATUS-PERMISSAO-EMENTA: os dois cursos envolvidos estão em VERIFICAR.
