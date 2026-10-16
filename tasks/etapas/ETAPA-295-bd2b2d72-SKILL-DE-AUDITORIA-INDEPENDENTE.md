## Etapa 295-bd2b2d72 — Skill de auditoria independente (com modelo e regras)

**Tarefa:** #168-bd2b2d72-ee8a-4ae4-b1e7-a24d82a1d289 · **Pedido em:** 2026-10-14 21:16 · **Executor:** — (assumida por nuvem · relaxed-lovelace-sgtq7z depois da #167)
**Pedido:** "esta auditoria, pode ser gravada numa skill e informar qual modelo usou e regras?"
**Objetivo:** guardar como skill a auditoria independente usada no item 167.5 (auditores com focos diferentes + verificador cético), para repetir em outras mudanças, informando o modelo usado e as regras seguidas.
**Próximo passo:** 168.3 — criar a skill, assim que a #167 terminar e esta frente assumir a #168 (1 reserva por frente).

### Detalhes do usuário (2026-10-14 21:18)
- **Escopo:** qualquer mudança em massa (renumeração, migração, troca de texto em muitos arquivos…).
- **Quando usar:** só quando o usuário pedir (`/auditoria-independente` ou pedido explícito de auditoria).
- **Regras a registrar:** regras dos auditores, verificador cético, regras do projeto e informar o modelo no chat.
- **Nome:** `auditoria-independente`.

### Escopo
- **Entra:** `.claude/skills/auditoria-independente/SKILL.md` com: gatilho; o que a IA recebe (commits ou diff + descrição do que mudou); passos — (1) marcar o item da tarefa 🔄; (2) montar o contexto **sem as conclusões de quem fez a mudança**; (3) 3 auditores, só leitura, com focos diferentes: integridade dentro dos arquivos alterados, referências cruzadas fora deles, regras/scripts/ferramentas que leem esses arquivos (adaptados a cada mudança); (4) 1 verificador cético por auditor, que tenta derrubar cada achado; (5) só o confirmado volta para correção; (6) corrigir, conferir, marcar ✅, commit + push; (7) **informar no chat o modelo e o esforço usados** (na nuvem: `get_session`; no local: `/model`) e as regras seguidas. No Claude Code com ultracode usa a ferramenta Workflow; sem ela, subagentes (`Agent`) ou os passos em sequência (outras IAs).
- **Regras dos auditores:** só leitura, sem commit, sem criar TASK, temporários fora do repositório, só defeitos confirmados com evidência (arquivo, linha, trecho).
- **Regras do projeto:** sem navegador, sem testes automatizados, item 🔄/✅ na hora, commit + push na `main` no fim.
- Linha no `docs/HISTORICO-REGRAS.md` e visualizador regenerado.
- **Não entra:** tornar a auditoria obrigatória (não muda o ciclo da tarefa); gravar o nome do modelo em arquivo do repositório (o ambiente de nuvem não permite; o modelo é informado no chat a cada execução).

### Riscos
- A ferramenta Workflow só existe no Claude Code; outras IAs seguem os mesmos passos com subagentes ou em sequência. Plano B: `git revert` do commit da skill.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 168.1 | Detalhes do usuário (escopo, nome, regras, quando usar) | ✅ Concluído | 2026-10-14 21:18 | respostas do usuário no chat |
| 168.2 | Plano nesta etapa + aprovação do usuário (estrutura nova = tarefa grande) | ✅ Concluído | 2026-10-14 21:19 | usuário: "sim, aprovado" |
| 168.3 | Criar a skill em `.claude/skills/<nome>/SKILL.md` | ⬜ Pendente | — | leitura do arquivo |
| 168.4 | Registrar no `docs/HISTORICO-REGRAS.md` e regenerar o visualizador | ⬜ Pendente | — | — |
| 168.5 | Aceite do usuário | ⬜ Pendente | — | — |
