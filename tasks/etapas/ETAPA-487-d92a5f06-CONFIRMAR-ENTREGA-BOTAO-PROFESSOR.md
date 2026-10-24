## Etapa 487-d92a5f06 — CONFIRMAR-ENTREGA-BOTAO: Botão "Confirmar Entrega" no Progresso da turma (professor)

**Tarefa:** CONFIRMAR-ENTREGA-BOTAO · **Pedido em:** 2026-10-24 12:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s487)
**Pedido:** "execute ela agora, REGRA-CONFIRMAR-ENTREGA ... com mais agentes" (implementar o botão da regra anotada na etapa 486: ao lado de Confirmar Todas, só o professor vê, entrega a atividade como está)
**Objetivo:** implementar no código compartilhado do Progresso da turma o botão "Confirmar Entrega", visível só ao professor, que entrega a atividade do aluno mesmo incompleta.

### CONFIRMAR-ENTREGA-BOTAO.1 — Levantar o código e escrever o plano

**Próximo passo:** subagentes leem `assets/js/progresso-turma-global.js`, `assets/js/confirmar-todas-professor.js`, como a entrega é gravada hoje (aluno) e as políticas RLS; resumir no plano da etapa e pedir o "sim".

- **Descrição:** levantamento só de leitura; plano (escopo, arquivos, riscos, verificações) escrito nesta etapa. Tarefa grande (envolve gravação no banco e RLS): execução só após o "sim" do usuário.
- **Critérios de Aceitação:** plano na etapa com arquivos, como a entrega é gravada, RLS necessária e verificação.
- **Entrega:** — · **Verificação:** —
