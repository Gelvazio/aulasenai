## Etapa 398-ce75ff03 — #271: Card duplicado da aula 27

**Tarefa:** #271 · **Pedido em:** 2026-10-17 21:30 · **Criada por:** Codex (GPT-6) (local · main)
**Pedido:** “Está aparecendo 2 veze o card com o id aula =27, num deles tem 1 atividade id=36, e no outro tem 4 atividades com os ids:80,81,84,e 36”.
**Objetivo:** diagnosticar a duplicidade e garantir uma representação da aula 27 com cada atividade vinculada aparecendo uma vez.

### #271.1 — Diagnosticar e corrigir a duplicação de aula/atividade na interface
**Próximo passo:** ler o relatório do grafo e rastrear a montagem dos cards e a consulta dos vínculos da aula 27.
- **Nível:** MEDIO — diagnóstico e possível correção localizada de interface; sem alteração de banco.
- **Modelo:** só Codex — nunca outro
- **Descrição:** localizar por que a aula ID 27 aparece em dois cards e por que atividade ID 36 aparece em ambos; corrigir a camada da interface se a duplicidade vier dela.
- **Critérios de Aceitação:** determinar a origem; se for interface, apresentar a aula uma vez e cada atividade distinta uma vez; não alterar registros do banco. Se exigir correção de dados, documentar a evidência e pedir aprovação/nível apropriado antes de mudar o banco.
- **Entrega:** a interface oculta o artigo redundante quando a mesma aula aparece em mais de um card e o único link desse artigo já consta no card dono.
- **Verificação:** análise do fluxo confirmou a causa (o módulo escolhia o card dono, mas mantinha o outro artigo); `node --check assets/js/indice-aula-atividades-vinculadas.js` e `git diff --check` passaram. Sem alteração do banco e sem navegador.
