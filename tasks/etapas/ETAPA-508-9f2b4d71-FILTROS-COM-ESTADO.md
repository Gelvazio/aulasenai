## Etapa 508-9f2b4d71 — Filtros da página Matérias Pendentes guardam estado no localStorage

**Tarefa:** #359-9f2b4d71-2c1e-4a8f-bb3d-7e0c5f1a9264 · **Pedido em:** 2026-10-24 19:20 · **Criada por:** Devin (local · main)
**Pedido:** "ESTES FILTROS, DEVEM GUARDAR *ESTADO*, no local storage" (print dos filtros curso/ano/semestre de materias-pendentes.html)

### Subtarefas

- **#359.1 — Persistir os filtros de materias-pendentes.html no localStorage**
  - **Arquivos:** `assets/js/materias-pendentes-pagina.js`
  - **Nível:** MEDIO (Jev, confiança 0,91) — executado por Devin a pedido direto do usuário
  - **Entrega:** constante `CHAVE_FILTROS_MP = "materias-pendentes:filtros"`; `guardarFiltrosMp` grava em cada `change`; `restaurarFiltrosMp` aplica os valores guardados que ainda existem nas opções (rodada em `carregarDadosMp` após `preencherFiltrosMp`); `reset` (Limpar filtros) apaga a chave; JSON inválido também é apagado no `catch`.
  - **Verificação:** `node --check` ok; linhas ≤ 100; DOM falso em Node: change → `{"curso":"4","ano":"2026","semestre":""}` gravado; restaurar → selects voltam com os valores; reset → chave removida.

### Registro

| Data | Evento |
|------|--------|
| 2026-10-24 | TASK criada, executada e concluída por Devin (local · main). |
