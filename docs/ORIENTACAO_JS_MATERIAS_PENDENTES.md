# ORIENTACAO_JS_MATERIAS_PENDENTES.md — página "Matérias Pendentes"

Página exclusiva do **Professor Administrador** (`materias-pendentes.html`, raiz do site).
Telemetria do que falta em cada matéria, filtrada por curso, ano e semestre.

## Arquivos

| Arquivo | Responsabilidade |
|---------|------------------|
| `scripts/status-materias/gerar_materias_pendentes_json.py` | Lê os `STATUS_MATERIA.md` e gera `materias-pendentes.json` (só status; nunca gabarito nem seeds SQL) |
| `materias-pendentes.json` (raiz, gerado) | Fonte de dados da página; regenerar quando os STATUS mudarem |
| `assets/js/materias-pendentes-repositorio.js` | Acesso: `fetch` do JSON e leitura dos cursos (RLS/JWT) |
| `assets/js/materias-pendentes-regras.js` | Regras: filtros, agrupamento por curso, pendências por categoria |
| `assets/js/materias-pendentes-pagina.js` | DOM da página; guarda de login e de papel |
| `assets/css/materias-pendentes.css` | Visual futurista (escopo `mp-*`) |
| `js/header-usuario.js` | Item `Matérias Pendentes` em `MENU_ADMINISTRADOR_HEADER` (nova aba) |

## Segurança (dupla trava)

- O item de menu **só é montado** quando a RPC `eh_professor_administrador()` retorna `true`.
- A própria página **confere o papel de novo** antes de buscar dados: sem login → mensagem de
  login; logado sem o papel → "acesso restrito". URL direta não libera nada.
- E-mail/metadata **nunca** autoriza — só a RPC.
- O JSON **não expõe** gabarito, resposta de atividade nem seed SQL: só nomes de peças/aulas e
  booleanos `ok`. `Prática (padrão de resposta)` é só o rótulo da peça.
- `.vercelignore` não exclui o JSON nem a página (precisam ir ao site).

## Fluxo da página

1. `header-usuario.js` monta o header e o menu do administrador.
2. `iniciarPaginaMp` valida sessão → valida papel via RPC → desbloqueia.
3. `carregarPendencias` busca `materias-pendentes.json` (sem cache).
4. `preencherFiltrosMp` monta curso/ano/semestre (matéria sem `curso_id` entra como
   "Sem curso no banco", valor `sem-curso`).
5. `desenharListaMp` filtra (`filtrarMateriasPendentes`), agrupa
   (`agruparMateriasPorCurso`) e monta os cartões com `O QUE FALTA` por categoria.

## Regeneração do JSON

```
python scripts/status-materias/gerar_materias_pendentes_json.py
```

Rodar depois de mudanças em `STATUS_MATERIA.md` (novas peças, aulas ou matéria concluída).
