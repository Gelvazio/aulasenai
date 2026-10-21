## Etapa 451-fe809753 — Correção pela IA da atividade 36: 2ª rodada (só o que não tem nota da IA)

**Tarefa:** #322-fe809753-491d-486b-8110-26cb0a2482cc · **Pedido em:** 2026-10-21 11:07 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "preciso que a correcao de IA seja rodada de novo agora" + "so pra atividades que ja nao estavam como entregue antes,pois as entregues,ja foi feita a correcao"
**Objetivo:** dar a nota da IA às alternativas da atividade 36 que ainda não têm (`nota_ia_em` vazio), sem recorrigir as já corrigidas na #318.

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 11:07 | Mesmas regras e mesma exceção de banco na nuvem da #318 (etapa 447-98152865), agora para esta 2ª rodada | Usuário |
| 2026-10-21 11:07 | Pendente = só alternativa sem `nota_ia_em`; nada já corrigido é recorrigido | Usuário |

### #322.1 — Corrigir as alternativas sem nota da IA (313 de 8 alunos no início)

**Próximo passo:** — (entregue). Respostas que chegarem depois ficam para uma nova rodada.

- **Nível:** PESADO — banco (gravação em `correcao_discursiva`) e gabarito
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro (exceção do usuário para esta sessão)
- **Critérios de aceitação:** nenhuma alternativa da atividade 36 com resposta e sem `nota_ia_em`;
  nenhuma linha já corrigida foi alterada; nenhuma com `nota_professor` mexida.
- **Entrega:** 2026-10-21 11:12 — 316 alternativas gravadas por 3 agentes (Opus) em paralelo: 1–10: 98 ·
  11–20: 122 · 21–30: 96. Só `nota_ia`, `comentario` e `nota_ia_em`; upsert com guarda
  `nota_ia_em is null` (nada já corrigido foi mexido).
- **Verificação:** consulta do líder: `correcao_discursiva` da atividade 36 com 1.733 linhas
  (1.417 da #318 + 316); 0 com `nota_professor`, 0 sem `[IA]`, 0 > 300 caracteres, toda nota é
  pontos/metade/0. Ficaram **20 alternativas sem nota**, todas de **3 alunos que ainda não
  entregaram** e seguiam respondendo durante a rodada (respostas salvas depois da leitura).
- **Para o professor conferir:** dois alunos com textos idênticos em quase tudo (aviso em todas),
  respostas coladas na alternativa errada (Errada), textos com restos de resposta de IA (aviso
  "⚠️ Texto com cara de copiado de IA/internet — conferir.").
