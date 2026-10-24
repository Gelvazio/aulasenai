## Etapa 491-b7e3c915 — ID-MATERIA-EQUIPES: ID da matéria na frente do nome no seletor de Equipes

**Tarefa:** ID-MATERIA-EQUIPES · **Pedido em:** 2026-10-24 14:30 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s491)
**Pedido:** "tem 3 materia de ITIC, verifique, e coloque o id da materia na frente tb" (imagem: lista "Matéria" do modal Equipes com 3 opções parecidas de Introdução à TIC)
**Objetivo:** distinguir matérias de nome parecido no seletor "Matéria" do modal Equipes, mostrando o id da matéria antes do nome.

**Verificação das 3 matérias de ITIC (banco, 2026-10-24):** são 3 linhas distintas da tabela `materia`,
de cursos diferentes (nada duplicado por erro do seletor).

| id | descricao | curso_id |
|---|---|---|
| 23 | INTRODUCAO A TECNOLOGIA DE INFORMACAO E COMUNICACAO | 2 |
| 25 | INTRODUCAO TIC | 5 |
| 39 | INTRODUCAO A TECNOLOGIA DA INFORMACAO E COMUNICACAO | 4 |

### ID-MATERIA-EQUIPES.1 — Mostrar o id da matéria no seletor do modal Equipes

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — classificado (jev (confiança 0.98))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** o texto de cada opção do seletor passa a `<id> — <descricao>`; o `value` continua sendo o id.
- **Critérios de Aceitação:** opção mostra o id antes do nome; `node --check` passa; linhas ≤ 100 caracteres.
- **Entrega:** `assets/js/equipes-modal.js`, `docs/equipes-sala-de-aula.md` no commit desta entrega · **Verificação:** `node --check` ok; as 3 matérias conferidas no banco (ids 23, 25, 39, cursos 2, 5 e 4); `value` do seletor continua o id; conferir na tela (sem navegador)
