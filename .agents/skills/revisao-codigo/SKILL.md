---
name: revisao-codigo
description: Revisão de código do projeto Aulas SENAI contra SOLID, limites (arquivo 1000, função 45, linha 100), JSDoc, constantes nomeadas e nomes em português. Use quando pedirem para revisar código, um diff ou antes de entregar uma tarefa que mudou JS, Python, HTML ou CSS.
---

# Revisão de código

Só lê e relata — não altera arquivos. As regras completas estão nos arquivos de
[`references/`](references/regras.md); não repita regra aqui.

## Passo a passo

1. **O que mudou:** `git diff --name-only` e `git diff --cached --name-only` (ou os arquivos
   indicados). Ignorar arquivos gerados (`.Codex/rules/index.html`) e binários.
2. **Orientação:** para cada arquivo, ler a orientação indicada em
   `.Codex/rules/docs-antes-de-editar.md`.
3. **Checklists** (copiar e marcar por arquivo):
   - `.Codex/rules/codigo-solid.md` → "Checklist SOLID"
   - `.Codex/rules/codigo-limites-nomes.md` → "Checklist"
4. **Medidas objetivas** (não estimar):
   - linhas do arquivo: `wc -l`
   - linhas > 100 caracteres: `awk 'length > 100 {print FILENAME": "FNR}' <arquivo>`
   - sintaxe: `node --check <arquivo.js>`
5. **Segurança:** se o diff tocar login, Supabase, SQL, chaves ou gabarito, aplicar também a skill
   `auditoria-seguranca`.

## Resposta

| Arquivo:linha | Regra | Problema | Correção |
|---|---|---|---|

Só problemas reais, em linguagem simples. Sem problemas → "Revisão sem achados".

⛔ Sem navegador e sem escrever testes (`.Codex/rules/testes-validacao.md`).
