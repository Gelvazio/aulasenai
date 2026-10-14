## Etapa 257-bddd56f9 — Correção pela IA agendada da atividade 81 (a cada 30 min)

**Tarefa:** #130-bddd56f9-a423-4f34 · **Pedido em:** 2026-10-14 14:05 · **Executor:** Claude Code (local · main)
**Pedido:** "EXISTE 1 TAREFA AGENDADA PRA CORRIGIR ESTA PROVA?" · "ATIVIDADE ID=81" → respostas: "Agendar correção", "A cada 30 minutos", "Até eu desligar"
**Objetivo:** a nota parcial da IA da discursiva de sexta da ITIC (id 81) se atualiza sozinha: a cada 30 min a IA corrige as alternativas pendentes (regras do `CORRECAO-PROVA-ADAG.md`, com 81 no lugar de 82 e como atividade individual).
**Próximo passo:** 257.3 — aceite do usuário (desligar quando quiser, na seção "Scheduled" do app).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 257.1 | Tarefa agendada `correcao-ia-atividade-81` (Claude desktop, `*/30 * * * *`, modo Auto): grava só `nota_ia`, `comentario` e `nota_ia_em` em `correcao_discursiva`; nunca `nota_professor`; sem commit; roda enquanto o app estiver aberto | ✅ Concluído | 2026-10-14 14:05 | Criação confirmada pela ferramenta (próxima execução em ~36 min) |
| 257.2 | Rotina ganha a Parte 2 — Suspeita de Cópia (`docs/regras/suspeita-copia-discursiva.md`), pedida junto com a #129 | ✅ Concluído | 2026-10-14 14:20 | `update_scheduled_task` confirmou prompt e descrição |
| 257.3 | Aceite do usuário / desligar quando não precisar mais | 👀 Aguardando o usuário | — | — |
