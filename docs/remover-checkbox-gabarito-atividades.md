# Remover o checkbox "Incluir gabarito" das atividades

**Objetivo:** Remover o checkbox "Incluir gabarito (versão do professor)" da barra de exportação
de todas as atividades HTML, a pedido do usuário ("em todas as atividades deve ser removido").

**Tech Stack:** HTML · sed

**Criado em:** 2026-09-27
**Concluído em:** 2026-09-27
**Tempo decorrido:** < 15 min

## Status Geral

| # | Passo | Status |
|---|-------|--------|
| 1 | Localizar o checkbox (`id="incluirGabarito"`) em `assets/`, `MATERIAIS/` e `DEMAIS-CURSOS-COMPLETOS/` | ✅ Concluído |
| 2 | Remover a linha do template `assets/gerador-atividades/template_atividade.html` | ✅ Concluído |
| 3 | Remover a linha dos 24 HTML de atividades já gerados | ✅ Concluído |
| 4 | Conferir os scripts: todos leem `getElementById('incluirGabarito')?.checked` e, sem o checkbox, exportam sem gabarito, sem erro | ✅ Concluído |

## Resultado Final

- 25 arquivos alterados (1 template e 24 atividades); nenhum HTML contém mais o checkbox.
- As atividades geradas daqui em diante pelo `gerar_atividades.py` já saem sem ele.
- Os documentos em `docs/` que citam o checkbox são históricos e não foram alterados.
