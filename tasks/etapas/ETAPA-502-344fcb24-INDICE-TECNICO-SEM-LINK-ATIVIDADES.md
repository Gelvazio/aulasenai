## Etapa 502-344fcb24 — INDICE-TECNICO-SEM-LINK-ATIVIDADES: índice do Técnico em Informática para Internet sem o link das atividades de Fundamentos de UI/UX

**Tarefa:** #353-41c1f170 · **Pedido em:** 2026-10-24 16:44 · **Criada por:** Devin (SWE-2) (local · main)
**Pedido:** "https://aulasenai.vercel.app/MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html, SEM LINK DAS ATIVIDADES AQUI"
**Objetivo:** o card de FUNDAMENTOS-DE-UI-UX no índice do curso mostra "Sem atividades", mas a matéria já tem 41 páginas de atividade e a apostila; atualizar o card e o resumo do índice.

### #353.1 — Atualizar o card de UI/UX e o resumo no índice do curso

**Próximo passo:** — (concluída)

- **Nível:** LEVE — Jev (mensagem do pedido, confiança 0,82)
- **Modelo:** só Haiku (executada pelo Devin por pedido direto do usuário nesta sessão, como na #343)
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0,82)
- **Descrição:** o índice do curso ficou velho: foi gerado antes das atividades e da apostila de Fundamentos de UI/UX (#276/#343). Sem regerar pelo `gerar_indices.py` (ele tira `popup.js`, `faixa-materias-ensalado.js` e o `data-curso-id`; padrão do `scripts/*/indice_*.sh` é ajuste pontual no card): atualizar só o card e o resumo do índice.
- **Critérios de aceitação:** resumo "3 com atividades"; card de UI/UX com apostila, "41 arquivos de atividade" e "📚 Atividades"; `popup.js`, `faixa-materias-ensalado.js` e `data-curso-id="4"` intactos; `git diff` só no índice do curso.
- **Entrega:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html` — resumo "3 com atividades"; card de UI/UX com "📘 Apostila" (`APOSTILA/APOSTILA-FUNDAMENTOS-DE-UI-UX.html`), "41 arquivos de atividade" e "📚 Atividades" (principal) · **Verificação:** `git diff` só no índice do curso (2 trechos); `popup.js`, `faixa-materias-ensalado.js` e `data-curso-id="4"` intactos (grep: 3 ocorrências); destinos dos links existem no disco; contagem 41 conferida com `listar_atividades` do `gerar_indices.py`
