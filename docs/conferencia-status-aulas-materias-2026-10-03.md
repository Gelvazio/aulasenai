# Conferência das aulas de todas as matérias — 2026-10-03

**Objetivo:** aplicar a regra "GERAR E GRAVAR UMA AULA POR VEZ" (`CLAUDE.md` da raiz) a todas as
matérias: criar `AULAS/STATUS-AULAS.md` com o estado real de cada aula, levantado a partir dos
arquivos da pasta e das atividades cadastradas no banco (tabela `atividade`).
**Criado e concluído em:** 2026-10-03 · **Status:** ✅ concluído (só documentação; nada gerado nem
alterado nas aulas, atividades ou banco).

## Resumo por matéria

| Curso | Matéria | Aulas | Atividade 50 q. | Banco | Pendências principais |
|---|---|---|---|---|---|
| OPERADOR_PRODUCAO_INDUSTRIAL | FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO | 15 (`.md`) | 14 (01–14) | ✅ 14 | Práticas suspensas; aula 15 = avaliação |
| ASSISTENTE-DE-OPERACOES-LOGISTICAS | INTRODUCAO-TIC | 10 (PDF) + aula 11 | 10 + 25 q. (aula 11) | ✅ todas | Práticas só 01–05; aula 11 sem slides |
| GESTAO_E_CONTROLE_MATERIAIS | ANALISE_DADOS_APLICADA_GESTAO | 7 (pptx) | 7 | ✅ 7 | Plano fora do padrão `DOCUMENTACAO/PLANO-AULAS.md` |
| TECNICO-INFORMATICA-INTERNET | TESTES DE FRONTEND | 10 (PDF) | 0 | — | Nenhuma atividade HTML/banco |
| RIO_DO_SUL_MAIS_TECH | FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO | 16 (`.md`) | 5 (01–05) | ✅ 5 | Aulas 06–16 sem atividade; `AULA-01..05.md` só com cabeçalho |
| RIO_DO_SUL_MAIS_TECH | COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO | 9 (`.md`) | 0 | — | Sem atividades; HTML só da aula 01 |
| RIO_DO_SUL_MAIS_TECH | EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS | 9 (`.md`) | 0 | — | Atividade de 04/09 só em `.docx` |
| RIO_DO_SUL_MAIS_TECH | NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS | 9 (`.md`) | 0 | — | Sem atividades; HTML só da aula 01 |
| RIO_DO_SUL_MAIS_TECH | OFICINAS_IMPRESSAO_3D_ROBOTICA | 9 (`.md`) | 0 | — | Sem atividades; HTML só da aula 01 |
| RIO_DO_SUL_MAIS_TECH | REFORCO_LINGUAGENS | 16 (`.md`) | 0 | — | Sem atividades; HTML só da aula 01 |
| RIO_DO_SUL_MAIS_TECH | REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO | 7 módulos (HTML) | 0 | — | Atividade de 15/09 só em `.docx` |

## Pontos gerais

- ⬜ **`DOCUMENTACAO/PLANO-AULAS.md` só existe em Automação/Instrumentação.** A regra da pasta
  `AULAS/` pede o plano antes de gerar aulas novas; nas demais matérias ele precisa ser criado a
  partir da ementa quando o professor pedir aulas novas.
- ⛔ **`QUALIFICACAO-PROFISSIONAL/` não recebeu status** (ementas só do professor; exceção da regra
  da pasta `AULAS/`): CANVAS-APRESENTACAO (aula única expandida, sem `AULAS/`), DIGITAL SKILLS
  (slides, sem `AULAS/`) e INTRODUCAO-LEAN-MANUFACTORING (6 aulas em `AULAS/`, sem atividades).
- O `STATUS-AULAS.md` da Introdução à TIC existia **vazio** (criado às 13:05, fora desta sessão) e
  foi preenchido; status com conteúdo não são sobrescritos.
- Pastas `AULAS/` novas só para o status: Análise de Dados (aulas em `AULAS-CHALKIE-AI-COLORIDA/`) e
  Testes de Frontend (aulas em `AULAS-CHALKIE-AI/`).
- `CURSO_ATIVIDADES_PADLET/` está em `IGNORAR` e não tem matérias.

## Arquivos criados

`MATERIAIS/<CURSO>/<MATERIA>/AULAS/STATUS-AULAS.md` das 10 matérias acima (exceto Automação, criado
na tarefa anterior) e este relatório.
