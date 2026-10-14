## Etapa 288-eabd70e8 — Bug: aluno que já entregou ainda vê as respostas

**Tarefa:** #161-eabd70e8-c369-4368-acc9 · **Pedido em:** 2026-10-14 20:18 · **Executor:** Claude Code (local · main) → Claude Code (nuvem · relaxed-lovelace-sgtq7z), a pedido do usuário em 2026-10-14 20:31
**Pedido:** "ALUNO JORGE GABRIEL SOARES TAVARES, JA ENTREGOU A ATIVIDADE E AINDA VE AS RESPOSTAS"
**Objetivo:** o aluno que já entregou e cujo gabarito ainda não foi liberado não vê mais as próprias respostas (regra da #160).
**Próximo passo:** 288.4 — usuário pedir ao aluno para recarregar a página (F5) e conferir; se ainda vir as respostas, a frente local confere no banco se o gabarito da atividade está liberado para a turma dele.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 288.1 | Causa: a regra da #160 só age quando a página carrega ou quando o aluno entrega naquela tela. Página aberta **antes** da publicação da #160 (20:14) entrega com o código antigo e deixa as respostas na tela; aba que ficou aberta enquanto o aluno entregou em outra aba/aparelho, ou que voltou pelo cache do navegador (voltar/avançar), também continua mostrando as respostas. Única tela do aluno que lê `resposta_discursiva` é `avaliacao-discursiva.js` (o resto é do professor ou só usa o que ela carregou) | ✅ Concluído | 2026-10-14 20:32 | leitura de `respostas-discursivas-banco.js`, `avaliacao-discursiva.js`, `minhas-respostas-discursiva.js`, `respostas-aluno-professor.js`, `respostas-atividade.js`; páginas em `MATERIAIS/` com campo de texto usam todas `avaliacao-discursiva.js` |
| 288.2 | Correção: ao voltar para a aba, o aluno não entregue na tela confere a entrega no banco (`lerEntrega` no repositório) e, se já entregou, a página recarrega (esconde as respostas); `pageshow` do cache recarrega, como na objetiva. Regra anotada em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 20:33 | `node --check` nos 2 arquivos; revisão do código (sem navegador) |
| 288.3 | Conferir no banco se o gabarito está liberado para a turma do aluno (aí ver as respostas é o certo) — só a frente local tem o banco | 👀 Aguardando o usuário | — | — |
| 288.4 | Aceite do usuário (aluno recarrega a página e não vê mais as respostas) | 👀 Aguardando o usuário | — | — |
