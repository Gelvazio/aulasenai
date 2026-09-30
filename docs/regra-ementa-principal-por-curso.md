# Regra: EMENTA-PRINCIPAL-<CURSO>.md em cada pasta de curso

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** < 10 minutos

## Objetivo
Registrar no `CLAUDE.md` do projeto a regra: toda pasta de curso em `MATERIAIS/` (exceto
`MATERIAS-GERAIS/`) deve ter o arquivo `EMENTA-PRINCIPAL-<nome exato da pasta do curso>.md`.
Exemplo: `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md`.

## Escopo
- Somente o `CLAUDE.md`. Nenhum arquivo de curso é criado ou renomeado nesta tarefa. Os cursos
  estão em `IGNORAR` por padrão, e a correção fica para quando forem liberados.

## Situação atual (levantamento de 2026-09-25)

| Curso | Situação |
|-------|----------|
| AUTOMACAO-INDUSTRIAL-1200-HORAS | ✅ Tem |
| BACKEND-560-HORAS | ✅ Tem |
| INFORMATICA | ✅ Tem |
| INTERNET-DAS-COISAS | ✅ Tem |
| MECATRONICA | ✅ Tem |
| OPERADOR-PRODUCAO-INDUSTRIAL | ✅ Tem |
| REDES-DE-COMPUTADORES | ✅ Tem (também existe um `.txt` antigo) |
| RIO_DO_SUL_MAIS_TECH | ✅ Tem |
| TECNICO-DESENVOLVIMENTO-SISTEMAS | ✅ Tem |
| TECNICO-INFORMATICA-INTERNET | ✅ Tem |
| GESTAO_E_CONTROLE_MATERIAIS | ⚠️ O nome usa hífens (`GESTAO-E-CONTROLE-MATERIAIS`) em vez do nome exato da pasta |
| ASSISTENTE-DE-OPERACOES-LOGISTICAS | ❌ Falta |
| Assistente-Processos-Gestao-Suporte-TI-860-HORAS | ❌ Falta |
| Assistente-Tecnico-Tecnologia-Informacao-860horas | ❌ Falta |
| PROGRAMADOR-DE-SISTEMAS-860-HORAS | ❌ Falta |
| QUALIFICACAO-PROFISSIONAL | ❌ Falta |

## Riscos e dependências
- 5 cursos ficam fora da regra e 1 tem o nome fora do padrão.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Adicionar a seção "EMENTA-PRINCIPAL-<CURSO>.md em cada pasta de curso" | `CLAUDE.md` | Grep por `EMENTA-PRINCIPAL` | ✅ Concluído |
| 2 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
Seção "REGRA CRÍTICA — EMENTA-PRINCIPAL-<CURSO>.md EM CADA PASTA DE CURSO" adicionada ao
`CLAUDE.md`, logo após STATUS-PERMISSAO-EMENTA. Pendências: 5 cursos sem o arquivo e 1 com o
nome fora do padrão, a tratar quando os cursos estiverem em `VERIFICAR`.
