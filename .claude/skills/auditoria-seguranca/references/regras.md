# Regras usadas na auditoria de segurança

Fonte única: os arquivos abaixo (carregar só o que a auditoria precisar).

| Assunto | Arquivo |
|---|---|
| RLS + JWT, onde o gabarito pode estar, SQL idempotente | `.claude/rules/security-banco.md` |
| O que vai para o Git e para o site (Vercel) | `.claude/rules/git-quick.md` |
| Banco só pelo Claude Code local | `.claude/rules/multiplas-ias.md` |
| Supabase no JS (headers, JWT) | `docs/ORIENTACAO_JS_SUPABASE.md` |
| Login e usuário | `docs/ORIENTACAO_JS_LOGIN.md`, `docs/ORIENTACAO_USUARIO.md` |
| Hook que bloqueia chave no commit | `scripts/claude-hooks/verificar-chaves.js` |
