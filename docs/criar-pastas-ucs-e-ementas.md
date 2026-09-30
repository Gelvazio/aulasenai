# Criar as pastas de UC que faltam, com EMENTA-CHALKIE-AI.md

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** ~40 minutos

## Objetivo
Em cada curso de `MATERIAIS/` (exceto `QUALIFICACAO-PROFISSIONAL/` e `MATERIAS-GERAIS/`), criar uma
pasta para cada UC do `EMENTA-PRINCIPAL-<CURSO>.md` que ainda não tem pasta, com um
`EMENTA-CHALKIE-AI.md` contendo a ementa da UC, conforme a regra "CADA PASTA DE MATÉRIA
CORRESPONDE A UMA UC DA EMENTA DO CURSO".

## Levantamento (2026-09-25)

| Curso | UCs | Já têm pasta | Pastas a criar |
|-------|-----|--------------|----------------|
| ASSISTENTE-DE-OPERACOES-LOGISTICAS | 18 | 1 | 17 |
| ASSISTENTE-PROCESSOS-GESTAO-SUPORTE-TI-860-HORAS | 20 | 0 | 20 |
| ASSISTENTE-TECNICO-TECNOLOGIA-INFORMACAO-860HORAS | 18 | 0 | 18 |
| AUTOMACAO-INDUSTRIAL-1200-HORAS | 26 | 0 | 26 |
| BACKEND-560-HORAS | 17 | 17 (sem EMENTA-CHALKIE-AI) | 0 |
| GESTAO_E_CONTROLE_MATERIAIS | 17 | 1 | 16 |
| INFORMATICA | 17 | 0 | 17 |
| INTERNET-DAS-COISAS | 28 | 0 | 28 |
| MECATRONICA | 28 | 0 | 28 |
| OPERADOR-PRODUCAO-INDUSTRIAL | 18 | 1 | 17 |
| PROGRAMADOR-DE-SISTEMAS-860-HORAS | 14 | 0 | 14 |
| REDES-DE-COMPUTADORES | 15 | 0 | 15 |
| RIO_DO_SUL_MAIS_TECH | 8 | 7 (+1 atalho .lnk) | 0 |
| TECNICO-DESENVOLVIMENTO-SISTEMAS | 16 | 1 | 15 |
| TECNICO-INFORMATICA-INTERNET | 19 | 2 | 17 |
| **Total** | **279** | **31** | **248** |

## Como será feito
- **Nome da pasta:** nome da UC em MAIÚSCULAS, sem acentos, com hífen (regra do `CLAUDE.md`).
- **Conteúdo do `EMENTA-CHALKIE-AI.md`:** cabeçalho (curso, UC, módulo, carga horária, fonte) +
  a seção da UC **copiada da ementa do curso** (objetivo, capacidades, conhecimentos,
  socioemocionais, recursos) + orientações curtas para IA. Nada inventado.
- UCs sem detalhamento na ementa do curso (9 de Logística, 2 de Assistente Técnico em TI) recebem
  o arquivo só com nome, módulo e carga horária, marcado como **detalhamento pendente**.
- **BACKEND:** as 17 pastas existem sem `EMENTA-CHALKIE-AI.md`; o arquivo será criado dentro delas.
- **Não sobrescrever** nenhum `EMENTA-CHALKIE-AI.md` existente (13 matérias já têm).
- Atualizar `STATUS-EMENTAS.md` e `STATUS-EMENTAS-CURSOS.md` com os scripts do projeto.

## Pontos de decisão
1. **Tamanho:** a regra do `CLAUDE.md` pede 14.800–14.950 caracteres no `EMENTA-CHALKIE-AI.md`.
   A ementa de uma UC copiada da ementa do curso tem de 2 a 15 mil caracteres. Proposta: criar
   com o conteúdo oficial e marcar como **base (fora do padrão de tamanho)**, sem encher texto.
2. **Rio do Sul Mais Tech:** a UC "Introdução à Comunicação Oral e Escrita" existe como atalho
   `.lnk` para outra pasta. Proposta: não criar pasta duplicada.
3. **Pastas que não são UC** (`MATERIAS/` em Automação, `MATERIA-GERAL/` no Backend,
   `Testes de Sistemas-EXISTENTES` em Informática p/ Internet): não mexer.

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Mapear UCs × pastas existentes | ementas dos cursos | Tabela acima | ✅ Concluído |
| 2 | Criar 248 pastas + `EMENTA-CHALKIE-AI.md` | `MATERIAIS/<CURSO>/<UC>/` | Contagem por curso | ✅ Concluído |
| 3 | Criar `EMENTA-CHALKIE-AI.md` nas 17 pastas do Backend | `MATERIAIS/BACKEND-560-HORAS/*/` | 17 arquivos | ✅ Concluído |
| 4 | Atualizar STATUS-EMENTAS com os scripts | `STATUS-EMENTAS*.md` | Scripts sem erro | ✅ Concluído |
| 5 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
248 pastas de UC criadas e 265 `EMENTA-CHALKIE-AI.md` base (248 novas + 17 do Backend), copiados da
ementa do curso (`EMENTA-PRINCIPAL-<CURSO>.md`). 10 UCs marcadas como detalhamento pendente (8 de
Logística, 2 de Assistente Técnico em TI). Nenhum arquivo existente sobrescrito. Comunicação Oral do
Rio do Sul não criada (atalho .lnk). `STATUS-EMENTAS-CURSOS.md` regenerado pelo script.
