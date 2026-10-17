## Etapa 350-c568f1ed — Apostila de Banco de Dados (Técnico em Informática para Internet)

**Tarefa:** #223-c568f1ed-ed88-43d8-a369-b7be3af1a383 · **Pedido em:** 2026-10-16 21:17 · **Criada por:** Claude Code (Opus 5.5) (nuvem · festive-maxwell-25jnhl)
**Pedido:** "Gere a apostila de banco de dados"
**Objetivo:** gerar a apostila da matéria Banco de Dados (`APOSTILA/`), última pendência da matéria na análise contínua (#19), seguindo `.claude/rules/apostilas.md` e `docs/regras/apostilas.md`.

### Escopo

- **Entra:** `APOSTILA/CONTEUDO/INTRODUCAO.md` + 20 `CAPITULO-NN.md` (1 por aula de 4 h, teoria + resumo + glossário, **sem exercícios**), escritos a partir de `CONTEUDO/AULA-NN-*.md` e do `EMENTA-CHALKIE-AI.md`; completar o `materia.json` com o texto literal da ementa que falta; `APOSTILA-BANCO-DE-DADOS.md` (Markdown completo) com conferência **100%**; `APOSTILA-BANCO-DE-DADOS.html` pelo gerador; `STATUS-APOSTILA.md` e análise contínua (#19).
- **Não entra:** PDF (só se o usuário pedir); atividades ou perguntas na apostila; conteúdo de outra UC; nada no banco.
- **Pronto quando:** `gerar_apostila.py --conferir` = 100%, HTML gerado sem avisos ⚠️, `analise-materias.py` sem pendência em Banco de Dados e aceite do usuário.
- **Premissas:** modelo de formato = ITIC (apostila sem vídeos e exercícios, `apostila_sem_videos_e_exercicios: true`), autor Gelvazio Camargo, versão 1.0 (já no `materia.json`); exemplos com "você, como aluno consultor", sem empresa fictícia; nenhuma marca de software imposta além do que a ementa declara.

### Conferência inicial (2026-10-16 21:25, Markdown só com as partes iniciais)

203/229 (88%). Faltam: regra de bolso (1), avaliação — recuperação e nota final (2), recursos — ferramenta de DER (1), acessibilidade (1) → corrigir no `materia.json` copiando da ementa; ideias/prompts das aulas (9) → `ideias_ementa` das aulas no `materia.json`; glossário oficial (12) → entra pelos capítulos.

### Riscos

| Risco | Plano B |
|---|---|
| Conferência não chega a 100% por formato novo da ementa | Ampliar `conferir_ementa.py` sem texto fixo de matéria e avisar |
| 20 capítulos longos demais para validar um por vez | Validar em blocos, se o usuário decidir |
| Vídeos do YouTube não verificáveis na nuvem | Apostila sem vídeos (modelo ITIC) |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 21:23 | Plano aprovado ("Aprovo") | Usuário | Tarefa grande: plano na etapa + aprovação |
| 2026-10-16 21:23 | "Faça 1 capítulo por vez com 1 push por capítulo" | Usuário | Cadência da escrita: um capítulo, um commit + push |
| 2026-10-16 21:23 | Sem vídeos (modelo ITIC, `apostila_sem_videos_e_exercicios: true`) | Usuário | Na nuvem não dá para conferir links e durações |

### #223.1 — Plano da apostila (tarefa grande)

**Próximo passo:** — (entregue).

- **Entrega:** plano nesta etapa (commit d500297) · **Verificação:** aprovado pelo usuário em 2026-10-16 21:23

- **Nível:** MEDIO — leitura de regras e plano em `.md`.

### #223.2 — `materia.json` literal + introdução + capítulos em Markdown (com validação do usuário)

**Próximo passo:** capítulo 08 (capítulos 01 a 07 escritos, sem avisos, conferência 100%).

- **Nível:** MEDIO — conteúdo didático conferido com a ementa.

### #223.3 — Markdown completo e HTML

**Próximo passo:** esperar a #223.2.

- **Nível:** MEDIO — gerador da apostila.

### #223.4 — Aceite do usuário

- **Nível:** LEVE — aceite.
