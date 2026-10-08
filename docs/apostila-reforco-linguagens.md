# Apostila — Reforço de Linguagens (2026-10-07)

Pedido do usuário: "Apostila Reforço de Linguagem". Decisões dele (2026-10-07):
**corrigir a ementa da matéria** para as 6 capacidades da UC 7 da ementa do curso (a do curso
vence) e **gerar a apostila completa** (introdução + 10 capítulos), tudo aguardando validação.

## O que foi feito

1. `REFORCO_LINGUAGENS/EMENTA-CHALKIE-AI.md`: lista de capacidades = as 6 da ementa do curso
   (14.929 caracteres; `STATUS-EMENTAS.md` e `STATUS-EMENTAS-CURSOS.md` atualizados).
2. `materia.json` completo e literal: objetivo, justificativa (alinhamento), conhecimentos
   (domínios 1–6), conteúdos programáticos (7 módulos), `textos_ementa`, avaliação (pesos e
   rubrica), BNCC, prompts por aula, indicadores e detalhamento didático das aulas de `CONTEUDO/`.
3. Gerador de apostilas (`assets/gerador-apostilas/`), sem mudar a saída da ITIC e de Testes de
   Frontend (Markdown completo idêntico e conferência 100% antes e depois):
   - carga horária por aula (`carga_horaria`), somada para conferir a carga da UC;
   - conferência lê ementas em listas (capacidades numeradas, módulos, aulas em negrito,
     indicadores em lista, situações-problema em listas, seções de texto livre);
   - `rubrica_lista`, `conteudos_programaticos`, `textos_ementa` no Markdown completo;
   - linha `- ⏳ Vídeos pendentes: ...` aceita quando o YouTube não pode ser conferido.
4. `APOSTILA/CONTEUDO/INTRODUCAO.md` e `CAPITULO-01.md` a `CAPITULO-10.md` (6 exercícios ITEM e
   10 termos cada), Markdown completo e HTML gerados; conferência 138/138 (100%).

## Pendências

- Vídeos do YouTube (rede do ambiente bloqueou o YouTube; nenhum link foi inventado).
- Link da apostila no menu/índice da matéria (não há `MENU-ATIVIDADES.js`).
- Validação do usuário (introdução e capítulos).
