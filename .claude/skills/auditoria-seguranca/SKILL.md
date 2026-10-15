---
name: auditoria-seguranca
description: Auditoria de segurança do projeto Aulas SENAI — RLS + JWT, chave service_role e outras chaves fora do Git e do site, gabarito que o aluno nunca vê, .gitignore e .vercelignore. Use quando uma mudança tocar login, Supabase, SQL, RLS, chaves, variaveis.js ou gabarito, ou quando pedirem auditoria de segurança.
---

# Auditoria de segurança

Só lê e relata — não altera arquivos nem o banco. Regras completas em
[`references/regras.md`](references/regras.md). Não cobre a auditoria de tarefa da #168.

## O que conferir

1. **JWT nas chamadas:** todo `fetch` ao Supabase manda `Authorization: Bearer <token do usuário>`
   (`docs/ORIENTACAO_JS_SUPABASE.md`). ⛔ `service_role` em página do site.
   `grep -rn "service_role\|SERVICE_ROLE" --include=*.js --include=*.html .`
2. **RLS:** toda tabela nova ou alterada no SQL tem `ENABLE ROW LEVEL SECURITY` e políticas por
   papel; SQL idempotente (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`). Banco real: só o Claude Code
   local — na nuvem, marcar "confirmar no banco".
3. **Chaves:** nada de chave no Git além da anon pública (`js/supabase.js`). `variaveis.js` no
   `.gitignore` (`git check-ignore scripts/variaveis.js`). O hook de commit já bloqueia
   service_role, `sb_secret_`, `sk-` e chave privada.
4. **Gabarito:** nunca em página HTML, PDF do aluno nem `localStorage`; fontes com resposta e
   seeds só no Git e fora do site — conferir o padrão no `.vercelignore` para cada arquivo novo.
5. **Dados pessoais (LGPD):** listas de alunos e presença fora do site (`.vercelignore`).

## Resposta

| Gravidade | Onde | Problema | Correção |
|---|---|---|---|

🔴 vaza gabarito, chave ou dado pessoal · 🟠 falta RLS/JWT · 🟡 risco menor. Sem achados →
"Auditoria de segurança sem achados".
