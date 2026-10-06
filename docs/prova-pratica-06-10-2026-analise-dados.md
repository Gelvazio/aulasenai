# Prova Prática 06-10-2026 — Análise de Dados Aplicada à Gestão (Aulas 01 a 05)

- **Criado em:** 2026-10-06
- **Concluído em:** 2026-10-06
- **Tempo decorrido:** mesma sessão
- **Status:** ✅ Concluído (aguardando aceite)

## Objetivo
Criar uma **nova** prova prática discursiva, com **10 questões** sobre as **Aulas 01 a 05**, num
**card novo** do índice de atividades da matéria, com data **06-10-2026** e um padrão de resposta
detalhado o bastante para a **correção por IA** (com revisão do professor).

## Escopo
- **Entra:** fonte da prova, padrão de resposta (fora do Git), página HTML pelo gerador de
  discursivas, card novo no `ATIVIDADES/index.html`, item no `MENU-ATIVIDADES.js`, linha no
  `STATUS-ATIVIDADES.md` e o seed do banco (gerado em `database/`, fora do Git).
- **Não entra:** alterar a `PROVA-PRATICA.html` que já existe (card "Prova Prática — Aulas 01 a
  05"), mudar a composição da média final (`media-final.json`) e alterar o gerador.
- ⚠️ No índice, o card de avaliação objetiva se chama "Avaliação das Aulas **01 a 04**"; a nova
  prova segue o seu pedido e cobre as **Aulas 01 a 05**.

## Tecnologias e fontes
- Conteúdo: `ANALISE_DADOS_APLICADA_GESTAO/CONTEUDO/1-...md` a `5-...md` e `EMENTA-CHALKIE-AI.md`
  (a ementa vence; nada de PDF). Capacidades: **C1** (planilhas) e **C2** (matemática/estatística).
- Gerador: `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` (sem alterações).
- Banco: tabelas `atividade`, `topico_discursivo`, `resposta_discursiva` (já existem).

## Estrutura da prova
- **Empresa fictícia nova** (diferente da prova existente) no contexto de almoxarifado.
- **10 questões, 2 por aula** (01 a 05), com contextos e números **diferentes** da prova atual:

| Item | Aula | Conteúdo | Cap. |
|------|------|----------|------|
| 01 | 01 | Regra de três inversa (equipe × prazo) e composta | C2 |
| 02 | 01 | Conversão de unidades, volume da caixa e cobertura do estoque | C2 |
| 03 | 02 | Variação percentual, margem sobre custo × sobre receita | C2 |
| 04 | 02 | Desvio padrão / amplitude e PA/PG em metas | C2 |
| 05 | 03 | Fórmulas, precedência, referência relativa × absoluta (F4) | C1 |
| 06 | 03 | Funções SOMA/MÉDIA/CONT.NÚM/CONT.VALORES/MÁXIMO/MÍNIMO e SE | C1 |
| 07 | 04 | Formatação condicional e validação de dados (lista e número) | C1 |
| 08 | 04 | Formatos (moeda, %, data), congelar painéis, filtros e proteção | C1 |
| 09 | 05 | PROCV com travamento, SEERRO, diagnóstico de #N/D | C1 |
| 10 | 05 | ÍNDICE + CORRESP, SE aninhado, CONT.SE e SOMASE | C1 |

- Cada questão: **Contexto + Comando + 3 tópicos** (0,3 + 0,3 + 0,4 = 1 ponto); total 10 pontos.
- **Ajustes para a correção por IA:**
  1. Cada tópico pede **entregas explícitas e verificáveis** (ex.: "escreva a fórmula, o resultado
     com a unidade e uma frase de justificativa"), sem pergunta aberta demais.
  2. Dados numéricos fechados, com **um único resultado correto** (e tolerância de arredondamento
     declarada).
  3. Padrão de resposta por tópico (`-GABARITO.md`, fora do Git) com:
     **Resposta esperada** (conta + resultado) e **Critérios** contendo: palavras-chave
     obrigatórias; respostas equivalentes aceitas (fórmulas alternativas, `;` ou `,`, com ou sem
     acento); pontuação exata de **nota cheia / metade / zero** em pontos do tópico; erros comuns
     e quanto cada um desconta.
  4. Regra geral de correção no topo do padrão (português não desconta, cópia = zero, tolerância
     de ± 0,01 em arredondamentos, a IA sugere e o professor confirma).

## Arquivos previstos
| Arquivo | Ação |
|---------|------|
| `MATERIAIS/.../ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/CONTEUDO/PROVA-PRATICA-06-10-2026.md` | Criar (fonte) |
| `.../ATIVIDADES/CONTEUDO/PROVA-PRATICA-06-10-2026-GABARITO.md` | Criar (fora do Git) |
| `.../ATIVIDADES/PROVA-PRATICA-06-10-2026.html` | Gerar |
| `.../ATIVIDADES/index.html` | Card novo após o card da prova prática atual |
| `.../ATIVIDADES/MENU-ATIVIDADES.js` | Item novo |
| `.../ATIVIDADES/STATUS-ATIVIDADES.md` | Linha nova |
| `database/<data>-prova-pratica-06-10-2026-seed-atividades.sql` | Gerar (fora do Git) |

## Riscos
| Risco | Plano B |
|-------|---------|
| Questões repetirem a prova atual | Contextos, números e recortes diferentes (tabela acima) |
| Critério ambíguo para a IA | Entregas explícitas por tópico + equivalências e erros comuns listados |
| Seed aplicado sem pedido | Só aplicar no Supabase se o usuário autorizar (nasce bloqueada) |

## Passos
| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 1 | Ler as aulas 01 a 05 em `CONTEUDO/` e a ementa | — | ✅ Concluído |
| 2 | Escrever a fonte com 10 questões | Gerador valida 10 itens, 30 tópicos, 10 pontos | ✅ Concluído |
| 3 | Escrever o padrão de resposta detalhado | Gerador: 30 tópicos com padrão | ✅ Concluído |
| 4 | Gerar página e seed | Padrão de resposta ausente do HTML (`grep`) | ✅ Concluído |
| 5 | Card no índice, menu e `STATUS-ATIVIDADES.md` | `node` lê o menu | ✅ Concluído |
| 6 | (Se autorizado) aplicar o seed no Supabase | Consulta: 30 tópicos | ✅ Concluído |
| 7 | Commit local | `git diff --cached --name-only` sem gabarito | ✅ Concluído |

## Resultado
- Página `ATIVIDADES/PROVA-PRATICA-06-10-2026.html` (10 questões, 30 tópicos, 10 pontos), card e menu.
- Seed aplicado no Supabase em 2026-10-06: atividade **id 82**, bloqueada, 30 tópicos com padrão.
- Fora da média final (decisão do usuário).
