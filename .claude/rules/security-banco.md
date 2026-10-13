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

## Gabarito — Nunca Sai do Banco

| Local | Gabarito? | Por quê |
|-------|-----------|---------|
| Banco (tabela) | ✅ SIM | RLS controla |
| Página HTML | ❌ NÃO | Aluno vê code |
| PDF aluno | ❌ NÃO | Publicado |
| localStorage | ❌ NÃO | Console expõe |
| Arquivo .md | ❌ NÃO | Publicado |

---

## Schema — Sempre Idempotente

```sql
-- ✅ CORRETO
CREATE TABLE IF NOT EXISTS "usuario" (...)
DROP POLICY IF EXISTS "nome" ON "usuario";
ALTER TABLE "usuario" ENABLE ROW LEVEL SECURITY;

-- ❌ ERRADO — Apaga dados
DELETE FROM usuario WHERE ...;
DROP TABLE usuario;
```

---

## Hierarquia

```
curso → materia → aulas → atividade → resposta
```

Matéria semelhante = **outra linha** de materia (não reuse)

---

**Ver também:** `docs/regras/usuarios-turmas-paginas-professor.md`
