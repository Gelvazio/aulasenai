# 🔐 Security & Banco — RLS, JWT, Gabarito

## RLS + JWT — OBRIGATÓRIO

```javascript
// ✅ CORRETO — JWT do usuário logado
const session = await supabase.auth.getSession();
if (session?.data?.session?.access_token) {
  headers.Authorization = "Bearer " + session.data.session.access_token;
}

// ❌ ERRADO — Sem JWT ou chave service_role
```

```sql
-- ✅ CORRETO — RLS na tabela
ALTER TABLE "usuario" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuarios_veem_seus_dados"
ON "usuario" FOR SELECT TO authenticated
USING (id = auth.uid());
```

---

## Gabarito — o aluno nunca vê

| Local | Gabarito? | Por quê |
|-------|-----------|---------|
| Banco (tabela) | ✅ SIM | RLS controla quem lê |
| Fontes `.md` e seeds com resposta | ✅ Só no Git | Fora do site pelo `.vercelignore` (`git-quick.md`) |
| Página HTML / site | ❌ NÃO | Aluno vê o código |
| PDF do aluno | ❌ NÃO | Vai para o aluno |
| `localStorage` | ❌ NÃO | Console expõe |

Depois da migração #25 (`atividades-banco.md`), as questões e o gabarito ficam **só no banco**.

---

## Schema — Sempre Idempotente

```sql
-- ✅ CORRETO
CREATE TABLE IF NOT EXISTS "usuario" (...)
DROP POLICY IF EXISTS "nome" ON "usuario";
ALTER TABLE "usuario" ENABLE ROW LEVEL SECURITY;

-- ❌ ERRADO — Apaga dados (só com pedido do usuário e backup)
DELETE FROM usuario WHERE ...;
DROP TABLE usuario;
```

Apagar linhas, tabelas ou colunas em massa (com pedido do usuário): preparar o SQL e deixar o
professor executar no SQL Editor — o classificador do Claude Code bloqueia esse comando pelo
conector. O que não apaga dados pode ir pelo conector.

---

**Ver também:** `docs/regras/usuarios-turmas-paginas-professor.md` · hierarquia das tabelas:
`materias-global.md`
