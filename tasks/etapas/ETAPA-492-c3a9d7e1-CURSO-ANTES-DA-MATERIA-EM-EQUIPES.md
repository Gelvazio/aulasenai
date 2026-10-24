## Etapa 492-c3a9d7e1 — CURSO-MATERIA-EQUIPES: Selecionar o curso antes da matéria no modal Equipes

**Tarefa:** CURSO-MATERIA-EQUIPES · **Pedido em:** 2026-10-24 14:50 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s492)
**Pedido:** "neste modal, selecione o curso primeiro, e depois as materias do curso" (imagem: modal Equipes com a lista "Matéria" e a lista "Turma")
**Objetivo:** no modal Equipes, o professor escolhe primeiro o curso e a lista "Matéria" mostra só as matérias desse curso.

### CURSO-MATERIA-EQUIPES.1 — Seletor de curso e matérias filtradas no modal Equipes

**Próximo passo:** reservar, ler `assets/js/equipes-modal.js` e `equipes-repositorio.js` e implementar.

- **Nível:** MEDIO — classificado (jev (confiança 0.97))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Descrição:** novo seletor "Curso" acima de "Matéria"; ao escolher o curso, "Matéria" lista só as matérias dele (`materia.curso_id`); sem curso escolhido, a matéria fica desabilitada.
- **Critérios de Aceitação:** curso antes da matéria; matéria filtrada pelo curso; matéria vinda da pasta continua sem mostrar a lista; `node --check` passa.
