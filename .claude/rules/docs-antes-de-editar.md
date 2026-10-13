# 📚 Ler a orientação em `docs/` antes de editar

**Antes de modificar qualquer arquivo** (principalmente JavaScript), procure a orientação dele em
`docs/` e leia por completo. Se não houver orientação, **avise o usuário**.

## Onde procurar

| Vai mexer em | Leia antes |
|--------------|-----------|
| `<arquivo>.js` | `docs/ORIENTACAO_JS_<ARQUIVO>.md` |
| `index.html` | `docs/ORIENTACAO_INDEX.md` |
| Login / autenticação ⚠️ | `docs/ORIENTACAO_JS_LOGIN.md` e `docs/ORIENTACAO_USUARIO.md` |
| Supabase (queries, headers, RLS, JWT) ⚠️ | `docs/ORIENTACAO_JS_SUPABASE.md` |
| Banco de dados | `docs/database.md` (manter `docs/relatorio_verificacao_database.html` sincronizado) |
| Bug já identificado | `bugs/bug-<nome>.md` (plano de resolução) |
| Regras detalhadas por tema | `docs/regras/` (`materias.md`, `atividades.md`, `apostilas.md`, `codigo.md`…) |

## Checklist

```
☐ Identifiquei o arquivo a modificar
☐ Achei a orientação correspondente (ou avisei que não existe)
☐ Li a orientação inteira e apliquei as regras dela
```

Sem ler a orientação, é fácil violar regras críticas (RLS, JWT, segurança).
