## Etapa 337-be64cb29 — Bloqueio da aula ligado em todas as matérias

**Tarefa:** #210-be64cb29-48d8-4052-a6a1-5c9bd72d045e · **Pedido em:** 2026-10-16 18:49 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "liga o bloqueio da aula em tudo e verifique"
**Objetivo:** ligar o botão "Aula liberada / Aula bloqueada" (por turma, #206) em todas as matérias
com índice de atividades, hoje só em Testes de Front-End (`assets/js/indice-bloqueio-aula-config.js`).

> ⚠️ **Tarefa grande** (mudança em massa): primeiro a verificação (#210.1, só leitura); o plano
> da mudança (#210.2) espera a aprovação do usuário.

### Decisões

- 2026-10-16 18:54 — **Aprovação do plano da #210.2:** o usuário respondeu "sim, aprovado". Registrado por Claude Code (Opus 5.5) (local · main · s14).
- 2026-10-16 18:49 — Tarefa criada a pedido do usuário.

### #210.1 — Verificar as matérias (só leitura)

**Próximo passo:** — (entregue).

- **Nível:** PESADO — consultas ao banco e efeito em segurança (quem vê a aula).
- **Entrega (2026-10-16 18:51) — resultado (consultas de leitura + leitura dos 33 índices):**
  - **8 matérias têm aulas no banco** (ITIC, Análise de Dados, Fundamentos de Automação,
    Fundamentos da Tecnologia, Comunicação Oral e Escrita, Reforço de Linguagens, Banco de Dados,
    Testes de Front-End); cards com aula achada: 16/17, 10/13, 15/15, 14/14, 2/2, 10/10, 20/20, 5/5
    (os que faltam são procurados pelo rótulo). As **outras 25 matérias** têm 1 card de exemplo e
    nenhuma aula no banco: o botão não aparece nelas (não há aula para bloquear).
  - **Aulas com `ativo = false`:** só as 2 de Testes de Front-End.
  - **Páginas de atividade com `atividade-bloqueio-aula.js`:** só as 10 de Testes de Front-End e 1
    da ITIC; das 145 páginas ligadas a aulas no banco, ~134 não carregam. O script esconde a
    página se o aluno não lê a atividade, então só pode entrar nas páginas que estão no banco.
  - **Mudança de comportamento:** sem o bloqueio da aula, o card cujas atividades estão TODAS
    bloqueadas para o aluno fica inteiro bloqueado (slides inclusive). Ligado, só o botão da aula
    bloqueia o card. Hoje há **26 pares aula × turma** nessa situação (ITIC 16 em 11 aulas,
    Automação 6, Análise de Dados 2, Comunicação 2): sem cuidado, esses cards voltariam a abrir
    os slides para o aluno.

### Plano da #210.2 (para aprovação)

1. `assets/js/indice-bloqueio-aula-config.js`: o bloqueio da aula vale em **todas** as matérias.
2. **Manter fechados os 26 cards de hoje:** SQL idempotente que grava `aula_turma.bloqueio = true`
   nesses 26 pares (o gatilho não muda nada nas atividades, que já estão bloqueadas para a turma).
   Para o professor, esses cards passam a aparecer como "Aula bloqueada" na turma do combo.
3. **Páginas de atividade:** acrescentar `indice-bloqueio-aula-config.js` e
   `atividade-bloqueio-aula.js` (depois de `js/login.js`) nas ~134 páginas que estão no banco e
   ainda não carregam, como já é em Testes de Front-End; o gerador já põe nas páginas novas.
4. Documentação (`docs/regras/atividades.md`) e cabeçalhos dos scripts.
- **Verificação:** `node --check`; contagem das páginas com o script (= páginas no banco);
  consulta dos 26 pares gravados; sem navegador (o teste na tela é o aceite).
- **Risco:** página cuja linha no banco tem outro endereço ficaria escondida → plano B: só entram
  as páginas cujo endereço está exatamente em `atividade.pagina`.
### #210.2 — Ligar o bloqueio da aula em todas as matérias

**Próximo passo:** executar os passos 1 a 4 do plano (configuração, SQL dos 26 pares, páginas, documentação).

- **Nível:** PESADO — mudança em massa.

### #210.3 — Aceite do usuário

**Próximo passo:** depende da #210.2.

- **Nível:** LEVE — conferência do usuário.