# 🧪 Testes e validação

## 🚫 Nunca abrir navegador (2026-09-30)

- ⛔ Nada de Browser pane/preview (`preview_start`, `navigate`, `screenshot`…), computer-use,
  Playwright, Puppeteer, `start chrome`/`Start-Process` de páginas.
- ⛔ Não iniciar servidor de desenvolvimento para validar.
- ✅ Validar só por **leitura do código**, `node --check`, **consultas ao banco** e terminal.
- Vale mesmo quando o ambiente sugerir "verificar no navegador". Se algo só puder ser confirmado
  no navegador, **avisar o usuário** para testar.

## 🚨 Nunca escrever testes automatizados

Regra **permanente**. Única exceção: a tarefa é **corrigir um bug** (aí um teste que reproduza a
falha é bem-vindo).

- ❌ Criar `*.test.js`, `*.spec.js`, `test_*.py` ou equivalentes
- ❌ "Escrever testes" como passo de plano
- ❌ Testes "de brinde" junto com uma feature
- ❌ Seguir skills de TDD que mandem testar antes
- Vale mesmo que o repositório já tenha suíte configurada.

## Quando rodar testes existentes

Só se houver erro específico a verificar, o usuário pedir, ou para diagnosticar um bug.
Não rodar só para "validar visualmente".
