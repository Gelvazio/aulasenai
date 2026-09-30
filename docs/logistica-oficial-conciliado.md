# ASSISTENTE-DE-OPERACOES-LOGISTICAS-OFICIAL.md — conciliação dos projetos de curso

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25 (cancelado)
- **Tempo decorrido:** —

## Objetivo
Em `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/projetos-adcicionais-materias-pendentes/`, criar
`ASSISTENTE-DE-OPERACOES-LOGISTICAS-OFICIAL.md` conciliando os 4 Markdown extraídos e, depois, apagar
os demais arquivos da pasta (4 `.docx` + 4 `.md`), deixando só o oficial.

## O que os 4 documentos são (levantamento)

| Documento | Curso | CH | Observação |
|-----------|-------|----|------------|
| `Assistente de Operações Logísticas - 860h - Prática Profissional` | Assistente de Operações Logísticas | 860h | **Mesmo curso da pasta**; não detalha as 9 UCs de Educação para o Trabalho |
| `Assistente de Operações Logísticas_Flex - 516h` | Assistente de Operações Logísticas (Flex, Joinville, out/2025) | 516h | Detalha as 9 UCs de Educação para o Trabalho; UCs específicas com outro conteúdo e outra CH |
| `Assistente de Operações Logísticas_Flex - 480h - Prática Profissional` | Assistente de Operações Logísticas (Flex) | 480h | Matriz diferente (UCs agrupadas, ex.: Sustentabilidade, Saúde e Segurança do Trabalho) |
| `Assist. em Processos da Qualidade e Logística Industrial_860h` | **Outro curso** | 860h | Detalha as 9 UCs de Educação para o Trabalho (texto **idêntico** ao do 516h) |

## Proposta de conciliação
1. **Base oficial = 860h** (mesmo curso da pasta): identificação, perfil, matriz, metodologia e as
   9 UCs de Inovação, Introdutório e Específico.
2. **UCs de Educação para o Trabalho:** detalhamento do documento **516h** (idêntico ao do
   Processos da Qualidade e Logística), preenchendo as 8 UCs pendentes + ITIC.
3. **Anexo "Outras versões do curso":** resumo das diferenças das versões Flex 516h e Flex 480h
   (matriz, carga horária e UCs específicas), sem misturar com a versão oficial.
4. O curso de Processos da Qualidade e Logística entra só como fonte das UCs de Educação para o
   Trabalho (não é o mesmo curso).

## Exclusão dos demais arquivos
Os 4 `.docx` não estão no Git. Para a exclusão ser reversível: **commit dos 8 arquivos antes**, e
depois `git rm` + commit. Assim eles saem da pasta mas continuam recuperáveis no histórico.

## Passos

| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 1 | Extrair os 4 `.docx` em `.md` | 4 arquivos `.md` | ✅ Concluído |
| 2 | Gerar `ASSISTENTE-DE-OPERACOES-LOGISTICAS-OFICIAL.md` conciliado | 18 UCs detalhadas (9 EpT + Inovação + 3 Introdutório + 5 Específico) | ⛔ Cancelado |
| 3 | Commit dos 8 arquivos de origem (segurança) | Hash | ⛔ Cancelado |
| 4 | Remover os 8 arquivos (`git rm`) e commit | Pasta só com o oficial | ⛔ Cancelado |

## Resultado
⛔ **Cancelado pelo usuário** ("pare"): o arquivo OFICIAL não foi criado e nada foi apagado. No
lugar, o usuário pediu para usar o projeto **Flex 516h** para completar as 8 UCs pendentes:
1. As 8 tabelas de UC de Educação para o Trabalho foram copiadas do `.docx` de 516h para o `.docx`
   de 860h da raiz do curso (antes de Iniciação em Projetos de Inovação). O original foi registrado
   no Git antes da alteração (commit `c6d8f4e`).
2. A `EMENTA-PRINCIPAL-ASSISTENTE-DE-OPERACOES-LOGISTICAS.md` recebeu as 8 UCs, transcritas do
   `.docx` de 860h atualizado.
3. Os 8 `EMENTA-CHALKIE-AI.md` pendentes foram refeitos com a seção da UC.
