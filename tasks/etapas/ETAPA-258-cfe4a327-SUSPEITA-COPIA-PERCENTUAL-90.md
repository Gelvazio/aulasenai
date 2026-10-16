## Etapa 258-cfe4a327 — Suspeita de Cópia: mostrar o % e só 90% ou mais

**Tarefa:** #131-cfe4a327-86ac-423a · **Pedido em:** 2026-10-14 14:31 · **Executor:** Claude Code (local · main)
**Pedido:** "mostre o % de copia, so copia mesmo qd for 90% ou mais parecido" (depois de "a coluna suspeita de copia, esta buscando o proprio aluno")
**Objetivo:** a coluna "Suspeita de Cópia" e o alerta da questão mostram o % de semelhança, e só contam como suspeita as respostas com 90% ou mais (#129).
**Próximo passo:** 131.2 — aceite do usuário.

Banco conferido para o relato "buscando o próprio aluno": nenhuma das 109 suspeitas aponta para o mesmo aluno, mesmo nome ou mesmo e-mail; muitas respostas são 100% iguais, então a resposta do outro aluno (no mouse) é idêntica à do próprio aluno.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 131.1 | `assets/js/suspeita-copia-discursiva.js`: lê só `semelhanca >= 0.9`; etiqueta "⚠️ Q03 98% ≈ Nome", alerta "Parece com: Nome — 98% igual"; `docs/regras/suspeita-copia-discursiva.md`: candidatos e decisão com 90% ou mais (a rotina #130 segue o arquivo). As 34 linhas antigas abaixo de 90% ficam no banco, fora da tela (apagar exige pedido) | ✅ Concluído | 2026-10-14 14:31 | `node --check` ok; leitura do filtro e dos textos |
| 131.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
