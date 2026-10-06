# Média final: o aluno vê as próprias notas (Aulas 04–07, Objetiva e Prova Prática)

- **Criado em:** 2026-10-06
- **Concluído em:** 2026-10-06
- **Tempo decorrido:** mesma sessão
- **Status:** ✅ Concluído (aguardando aceite)

## Objetivo
Na página `ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-MEDIA-FINAL.html`, o aluno logado
deve ver a **própria nota** das Atividades das Aulas 04, 05, 06 e 07, da Avaliação Objetiva e da
Prova Prática.

## Diagnóstico (banco real, 2026-10-06)
| Linha da tabela | Atividade (id) | Situação hoje | Por que a nota pode não aparecer |
|---|---|---|---|
| Aula 04 | 30 | liberada, 18 entregas | aparece |
| Aula 05 | 31 | liberada, 15 entregas | aparece |
| Aula 06 | 32 | liberada para a 133933, 6 entregas | aparece; **some** se a atividade for bloqueada depois |
| Aula 07 | 33 | liberada para a 133933, 0 entregas | "—" até o aluno entregar |
| Avaliação Objetiva | 34 | liberada, 26 entregas | aparece; **some** se for bloqueada depois |
| Prova Prática | 37 (`PROVA-PRATICA.html`) | **bloqueada** para a 133933, 0 entregas | **nunca aparece**: é discursiva, não tem gabarito e **não existe no banco lugar para a nota corrigida** |

Causas:
1. A página só lê as atividades que o aluno **consegue ver** pela política `atividade_select`.
   Atividade bloqueada some da lista, e a nota que o aluno já ganhou some junto.
2. A nota vem de `nota_da_tentativa`, que só conta alternativas certas (`gabarito`). A Prova
   Prática é **discursiva**, e o banco não tem tabela de correção. A correção com IA e professor
   ainda é uma pendência registrada no CLAUDE.md.

## Escopo
- **Entra:**
  1. Tabela **`correcao_discursiva`**: nota de cada tópico por aluno e tentativa, com:
     - `nota_ia` (sugestão da IA);
     - `nota_professor` (nota que vale);
     - `comentario`, `corrigido_por` e `corrigido_em`.

     RLS: o professor da turma lê e grava (`professor_tem_turma`; o administrador em todas). O
     aluno lê só as próprias linhas, e só depois que o professor confirma a nota. `anon` sem
     acesso.
  2. Função **`notas_media_final(p_paginas text[])`** (security definer). Para o **aluno logado**,
     devolve a melhor nota entregue em cada página:
     - **objetiva:** acertos ÷ total × 10, a mesma conta de `nota_da_tentativa`;
     - **discursiva:** soma de `nota_professor` ÷ soma dos pontos × 10, só quando **todos** os
       tópicos da tentativa estão confirmados pelo professor. Se não estiverem, devolve
       "entregue, aguardando correção";
     - não depende do bloqueio: nota já conquistada continua aparecendo;
     - não devolve gabarito nem respostas, só a nota.
  3. `assets/js/avaliacao-media-final.js`, no fluxo do aluno: usa a função nova. A Prova Prática
     entregue e ainda sem correção mostra **"Aguardando correção"**.
  4. `docs/database.md` + relatório HTML + `CLAUDE.md`.
  5. **Tela de correção** (incluída na aprovação): página `correcao-discursiva.html` (raiz), menu
     **CORREÇÃO** no header para todo professor. O professor escolhe a avaliação discursiva, a
     turma e o aluno ou tentativa entregue. Para cada tópico, a tela mostra o enunciado, a resposta
     do aluno, o padrão de resposta e os critérios. Há um campo para a nota da IA, um para a nota
     do professor (0 até os pontos do tópico) e um para comentário.

     Botão **"📋 Copiar prompt para a IA"**: monta o texto com as respostas, o padrão e os
     critérios, para colar numa IA. As notas sugeridas voltam para a coluna da IA, e o botão
     "Usar sugestões da IA" copia para a nota do professor. A página **não chama nenhuma API de
     IA**; isso evita chave secreta no site. A nota só vale depois que o professor salva.
- **Não entra:**
  - mudar a visão do professor (combos) na média final.
- A linha "Avaliação Prática" continua apontando para `PROVA-PRATICA.html`. A
  `PROVA-PRATICA-06-10-2026.html` está fora da média, como você decidiu.

## Arquivos previstos
| Arquivo | Ação |
|---|---|
| `database/2026-10-06-notas-media-final-correcao-discursiva.sql` | Criar (tabela, RLS, função), idempotente |
| `assets/js/avaliacao-media-final.js` | Aluno lê as notas pela função nova |
| `correcao-discursiva.html`, `assets/js/correcao-discursiva-repositorio.js`, `assets/js/correcao-discursiva-pagina.js`, `assets/css/correcao-discursiva.css` | Tela de correção |
| `js/header-usuario.js` | Menu CORREÇÃO (professor) |
| `docs/database.md`, `docs/relatorio_verificacao_database.html`, `CLAUDE.md` | Documentar |

## Riscos
| Risco | Plano B |
|---|---|
| Aluno ver a nota de outro aluno | A função usa só `auth.uid()`; não recebe id de aluno |
| Vazar gabarito | A função devolve só a nota final de cada página |
| Prova Prática continuar "—" | Correto enquanto não houver entrega; com entrega, mostra "Aguardando correção" até o professor confirmar |

## Passos
| # | Ação | Verificação | Status |
|---|---|---|---|
| 1 | SQL (tabela, RLS, função) | Conferir o banco real antes | ✅ Concluído |
| 2 | Aplicar no Supabase (com aprovação) | Leitura: tabela, políticas e função; nota de um aluno de teste = nota do painel | ✅ Concluído |
| 3 | JS do aluno | `node --check` | ✅ Concluído |
| 4 | Documentação | Leitura | ✅ Concluído |
| 5 | Commit local | `git diff --cached --name-only` | ✅ Concluído |

## Resultado
- SQL aplicado em 2026-10-06. Conferido com um aluno real: Aulas 04 (9,4), 05 (9,8), 06 (10) e
  Objetiva (9,83) iguais ao cálculo direto. RLS ligado, 3 políticas, `anon` sem execução.
- O aluno lê as notas pela `notas_media_final`; a Prova Prática mostra "Aguardando correção"
  depois da entrega e a nota depois da correção completa do professor.
- Tela `correcao-discursiva.html` (menu CORREÇÃO). A lista de entregas vem de
  `entrega_atividade` + `aluno` + `turma`, porque `resumo_tentativas_atividade` só conta
  respostas objetivas.
- Teste no navegador fica com o usuário (regra: não abrir navegador).
