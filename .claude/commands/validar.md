---
description: Valida as mudanças sem navegador e sem testes (node --check, JSON, Python)
argument-hint: "[arquivos, opcional]"
---

Valide **$ARGUMENTS** (vazio = arquivos alterados em `git diff --name-only` e
`git diff --cached --name-only`), só pelos meios de `.claude/rules/testes-validacao.md`:

- `.js` → `node --check <arquivo>`
- `.json` → `python -m json.tool <arquivo>` (`python3` na nuvem)
- `.py` → `python -m py_compile <arquivo>`
- `.html` → conferir por leitura que cada `<script src>` e `<link href>` local existe
- `.sql` → leitura (idempotente, RLS ligada — `security-banco.md`); banco real só no Claude Code
  local (`multiplas-ias.md`)

⛔ Não abrir navegador, não subir servidor, não escrever testes. Resposta: tabela
`Arquivo | Verificação | Resultado`; o que só o navegador confirma → avisar o usuário para testar.
