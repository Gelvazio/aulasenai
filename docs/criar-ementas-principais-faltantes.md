# Criar os arquivos EMENTA-PRINCIPAL que faltam

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** < 15 minutos

## Objetivo
Criar `EMENTA-PRINCIPAL-<CURSO>.md` nos cursos de `MATERIAIS/` que ainda não têm o arquivo,
conforme a regra do `CLAUDE.md` (seção "EMENTA-PRINCIPAL-<CURSO>.md em cada pasta de curso").

## STATUS-PERMISSAO-EMENTA dos cursos sem o arquivo

| Permissão | Curso | Fonte disponível |
|-----------|-------|------------------|
| VERIFICAR | ASSISTENTE-DE-OPERACOES-LOGISTICAS | `INTRODUCAO-TIC/EMENTA-CHALKIE-AI.md` (única UC da pasta) |
| IGNORAR | Assistente-Processos-Gestao-Suporte-TI-860-HORAS | `.docx` do curso |
| IGNORAR | Assistente-Tecnico-Tecnologia-Informacao-860horas | `.docx` do curso |
| IGNORAR | PROGRAMADOR-DE-SISTEMAS-860-HORAS | `.docx` do curso |
| IGNORAR | QUALIFICACAO-PROFISSIONAL | Sem documento de curso (3 subpastas) |

## Escopo
- Criar o arquivo **somente** em cursos marcados como `VERIFICAR`, ou seja, apenas
  `ASSISTENTE-DE-OPERACOES-LOGISTICAS`. Os cursos em `IGNORAR` ficam de fora até a marcação mudar.
- Estrutura baseada em `RIO_DO_SUL_MAIS_TECH/EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md`
  (identificação, carga horária, objetivo, UCs com capacidades e conhecimentos, campos pendentes,
  metadados, orientações para IA).
- Os dados vêm do trecho `[oficial]` da ementa de ITIC. O que não existe no projeto (carga horária
  total do curso, demais UCs, requisitos de acesso) entra na seção "Campos Pendentes", sem
  inventar dados.
- Fora do escopo: renomear o arquivo de GESTAO_E_CONTROLE_MATERIAIS (nome fora do padrão).

## Arquivos previstos
- `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/EMENTA-PRINCIPAL-ASSISTENTE-DE-OPERACOES-LOGISTICAS.md`

## Riscos e dependências
- Ementa principal incompleta enquanto o documento oficial do curso não estiver no projeto.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Extrair os dados `[oficial]` da ementa de ITIC | `INTRODUCAO-TIC/EMENTA-CHALKIE-AI.md` | Leitura | ✅ Concluído |
| 2 | Criar a ementa principal do curso | arquivo previsto acima | Arquivo existe com o nome exato da pasta | ✅ Concluído |
| 3 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
Criado `EMENTA-PRINCIPAL-ASSISTENTE-DE-OPERACOES-LOGISTICAS.md` com os dados [oficial] da UC
ITIC (40h). Pendências: carga horária total, demais UCs e documento oficial do curso; 4 cursos
em `IGNORAR` sem o arquivo.
