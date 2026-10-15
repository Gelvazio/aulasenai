## Etapa 281-c4f12058 — "Confirmar Correção" (professor): usar a sugestão da IA só nas certas

**Tarefa:** #154-c4f12058-0728-46e2-93d8 · **Pedido em:** 2026-10-14 19:28 · **Executor:** Claude Code (local · main)
**Pedido:** "qd o professor clica aqui (Finalizar Atividade), se ele n corrigiu a questao, pega a sugestao de IA e apenas para as certas, as demais o professor e obrigado a corrigir sempre" + "nome para o professor, deve ser *Confirmar Correção*, so para professor, pra aluno mantenha!"
**Objetivo:** o botão do professor passa a se chamar "Confirmar Correção" (o do aluno não muda). Ao clicar, questão sem correção do professor e que a IA marcou como certa vale com a nota da IA; as demais (meia certa, errada, sem nota da IA) continuam exigindo a correção do professor.
**Próximo passo:** 154.4 — usuário clicar em "Confirmar Correção" com um aluno que tenha questões certas pela IA sem correção do professor.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 154.1 | Fluxo analisado: o "Finalizar" só calcula a nota (a média vem da `nota_professor`); gravar a nota da IA como `nota_professor` usa o mesmo upsert dos botões Certa/Meia/Errada (RLS e trigger já existentes) — sem mudança de banco | ✅ Concluído | 2026-10-14 19:55 | leitura de `finalizar-atividade-professor.js` e `confirmar-nota-professor-discursiva.js` |
| 154.2 | Botão do professor renomeado para "Confirmar Correção" (aluno mantém "Finalizar") | ✅ Concluído | 2026-10-14 19:55 | `node --check`; `grep` do texto |
| 154.3 | Regra: sem nota do professor + IA marcou certa → confirmada com a nota da IA (popup pede aceite; nota é definitiva); meia certa, errada ou sem nota da IA → o professor é obrigado a corrigir (bloqueia sem gravar nada). `finalizar-atividade-professor.js` + `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 19:55 | `node --check`; revisão do código (sem navegador) |
| 154.4 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
