# Regra: cada pasta de matéria corresponde a uma UC da ementa do curso

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** < 10 minutos

## Objetivo
Registrar no `CLAUDE.md` que toda pasta de matéria em `MATERIAIS/<CURSO>/` corresponde a **uma
unidade curricular (UC)** do `EMENTA-PRINCIPAL-<CURSO>.md`, com nome derivado do nome da UC.

## Texto proposto da regra
- Cada pasta de matéria = **uma UC** da ementa do curso (fonte da verdade). Não criar pasta de
  matéria para algo que não é UC do curso.
- Nome da pasta = nome da UC em **MAIÚSCULAS, sem acentos, palavras separadas por hífen** (ex.:
  UC "Banco de Dados" → `BANCO-DE-DADOS`). Abreviação só se registrada na ementa da matéria.
- O `EMENTA-CHALKIE-AI.md` da pasta usa o **nome exato da UC** e a mesma carga horária da ementa do
  curso.
- Pastas auxiliares que não são matéria (`docs/`, `scripts/`, `.claude/`, `graphify-out/`) são
  permitidas e ignoradas.
- Pastas existentes com nome fora do padrão **só são renomeadas a pedido do usuário**.
- ⛔ Exceção: `QUALIFICACAO-PROFISSIONAL/` (não tem ementa de curso).

## Situação atual (levantamento de 2026-09-25)

| Curso | Pastas fora da regra |
|-------|----------------------|
| AUTOMACAO-INDUSTRIAL-1200-HORAS | `MATERIAS/` (não é UC) |
| BACKEND-560-HORAS | `MATERIA-GERAL/` (não é UC); nomes sem preposições (ex.: `BANCO-DADOS`) |
| GESTAO_E_CONTROLE_MATERIAIS | `ANALISE_DADOS_APLICADA_GESTAO` (sublinhado) |
| OPERADOR-PRODUCAO-INDUSTRIAL | `FundamentosProcessosProducao` (caixa mista, sem separador) |
| RIO_DO_SUL_MAIS_TECH | 7 pastas com sublinhado |
| TECNICO-INFORMATICA-INTERNET | `BANCO_DE_DADOS`, `TESTES DE FRONTEND` (espaços), `Testes de Sistemas-EXISTENTES` (não é UC do curso) |
| ASSISTENTE-DE-OPERACOES-LOGISTICAS | `INTRODUCAO-TIC` (abreviação de ITIC) |

Nenhuma pasta será renomeada nesta tarefa.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Adicionar a regra ao `CLAUDE.md`, após a regra EMENTA-PRINCIPAL | `CLAUDE.md` | Grep pela nova seção | ✅ Concluído |
| 2 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
Regra "CADA PASTA DE MATÉRIA CORRESPONDE A UMA UC DA EMENTA DO CURSO" adicionada ao `CLAUDE.md`,
logo após a exceção de QUALIFICACAO-PROFISSIONAL. Nenhuma pasta renomeada.
