# Formulário Google (.gs) — celular dos alunos do CEPLAS (tarde)

- **Criado em:** 2026-09-28
- **Concluído em:** 2026-09-28
- **Tempo decorrido:** ~10 min

## Objetivo

Criar o script Google Apps Script `LISTA-PRESENCA-CEPLAS-TARDE.gs` que, ao ser executado em
script.google.com, gera um Google Form para registrar o **celular de cada aluno** da turma da
tarde do CEPLAS (135081 — AI AOPL 2026/2 V1, 13:15 às 17:15).

## Escopo

- Fonte dos nomes: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/LISTA-PRESENCA.js`
  (turma da tarde, 33 alunos — o nº 23 repetido continua omitido).
- Formulário:
  1. **Nome do aluno** — lista suspensa com os 33 nomes (obrigatório).
  2. **Celular (com DDD)** — texto curto com validação por expressão regular
     (ex.: `(47) 99999-9999`, `47999999999`) (obrigatório).
  3. **O número tem WhatsApp?** — Sim / Não (obrigatório).
- Uma resposta por aluno pode ser editada depois (`setAllowResponseEdits(true)`).
- Respostas vão para uma planilha Google criada junto com o form.
- O script registra no log os links do formulário (resposta e edição) e da planilha.

## Tecnologias

Google Apps Script (`FormApp`, `SpreadsheetApp`, `Logger`).

## Arquivos previstos

| Arquivo | Ação |
|---------|------|
| `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/LISTA-PRESENCA-CEPLAS-TARDE.gs` | Criar |
| `docs/form-celular-lista-presenca-ceplas-tarde.md` | Este plano |

## Riscos e dependências

- ⚠️ **LGPD:** o `.gs` contém nomes de alunos menores. `*.gs` já está no `.gitignore` → o arquivo
  **não** vai para o Git/Vercel. O formulário gerado deve ficar restrito (o professor compartilha
  o link só com a turma); os celulares ficam só na planilha do Google do professor.
- O script é executado pelo professor na conta Google dele (autorização do Apps Script).

## Passos

| # | Passo | Arquivo | Verificação | Status |
|---|-------|---------|-------------|--------|
| 1 | Criar o `.gs` com constantes (título, turma, nomes, regex) e funções pequenas documentadas | `.../ATIVIDADES/LISTA-PRESENCA-CEPLAS-TARDE.gs` | Leitura do arquivo | ✅ Concluído |
| 2 | Conferir que os 33 nomes batem com `LISTA-PRESENCA.js` (tarde) | idem | Contagem de nomes | ✅ Concluído |
| 3 | Confirmar que o `.gs` está ignorado pelo Git | `.gitignore` | `git check-ignore` | ✅ Concluído |

## Como usar (depois de pronto)

1. Abrir https://script.google.com → **Novo projeto**.
2. Colar o conteúdo do `.gs` e salvar.
3. Selecionar a função `criarFormularioCelularCeplasTarde` → **Executar** → autorizar.
4. Ver os links em **Registro de execução**.

## Resultado

Script criado com 33 nomes (lista suspensa) e campo de celular validado; cada aluno
escolhe o próprio nome e informa o próprio celular. Arquivo ignorado pelo Git (`*.gs`).
