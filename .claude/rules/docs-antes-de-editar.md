# 📚 Ler a orientação em `docs/` antes de editar

**Antes de modificar um arquivo**, procure a orientação dele e leia por completo.

## Onde procurar

| Vai mexer em | Leia antes |
|--------------|-----------|
| Módulo de `js/` (`aulas`, `curso`, `materia`, `unidade`…) | `docs/ORIENTACAO_JS_<MODULO>.md` |
| Login / autenticação ⚠️ | `docs/ORIENTACAO_JS_LOGIN.md` e `docs/ORIENTACAO_USUARIO.md` |
| Supabase (queries, headers, RLS, JWT) ⚠️ | `docs/ORIENTACAO_JS_SUPABASE.md` |
| Banco de dados | `docs/database.md` (manter `docs/relatorio_verificacao_database.html` sincronizado) |
| Bug já identificado | `bugs/bug-<nome>.md` |
| Demais arquivos (`assets/js/`, páginas, geradores) | Cabeçalho do próprio arquivo + regra do assunto em `docs/regras/` (`materias.md`, `atividades.md`, `apostilas.md`, `codigo.md`, `assets-e-geradores.md`…) |

## Quando avisar o usuário

- Módulo de `js/` sem orientação (hoje: `menu.js` e `header-usuario.js`) → avisar antes de editar.
- Para os demais arquivos não há orientação própria: não precisa avisar.

## Checklist

```
☐ Identifiquei o arquivo a modificar
☐ Achei a orientação correspondente (ou avisei, se for módulo de js/ sem orientação)
☐ Li a orientação inteira e apliquei as regras dela
```

Sem ler a orientação, é fácil violar regras críticas (RLS, JWT, segurança).
