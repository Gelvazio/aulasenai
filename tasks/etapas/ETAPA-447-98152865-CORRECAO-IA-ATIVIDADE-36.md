## Etapa 447-98152865 — Correção pela IA da atividade 36 (Avaliação Prática de Introdução às TIC)

**Tarefa:** #318-98152865-f88d-460f-9794-d4b791936d2a · **Pedido em:** 2026-10-21 09:25 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "Crie 1 tarefa pra executar a correcao de IA na atividade id=36, os dados da atividade em html esta em: https://github.com/Gelvazio/aulasenai/blob/main/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/AVALIACAO-PRATICA.html, e no banco de dados tambem, haja como lider e dispare varios agentes pra acabar rapido"
**Objetivo:** dar a nota sugerida pela IA (`nota_ia`, `comentario`, `nota_ia_em`) a cada alternativa respondida da atividade 36, para o professor confirmar na tela CORREÇÃO.

### Escopo

- **Entra:** ler `topico_discursivo`, `resposta_discursiva` e `entrega_atividade` da atividade 36;
  gravar só `nota_ia`, `comentario` e `nota_ia_em` em `correcao_discursiva`.
- **Não entra:** `nota_professor`, `corrigido_por`, `corrigido_em`; linhas que já têm
  `nota_professor`; respostas, entregas e tópicos; slides; dados de aluno no Git ou no chat.
- **Regras da correção:** as mesmas de
  `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/CORRECAO-PROVA-ADAG.md`
  (certa / meia certa / errada, comentário `[IA]` de até 300 caracteres, mínimo de questões,
  aviso de texto igual), com **36** no lugar de 82 e os `pontos` lidos do banco.
- **Fonte das questões:** o banco (`topico_discursivo`); o HTML
  `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/AVALIACAO-PRATICA.html`
  serve só para conferir o enunciado.

### Riscos

- Banco de produção: só o Claude Code local pega (`multiplas-ias.md`). Plano B: sem acesso ao
  banco, a subtarefa fica ⛔ até a frente local pegar.
- Gravar nota em linha que o professor já corrigiu → a consulta de pendentes filtra
  `nota_professor is null`.

### Decisões

- 2026-10-21 09:25 — Execução em equipe (pedido do usuário): o líder (Opus 5.5+/Fable) busca a
  lista de pendentes, divide por `aluno_id` em lotes e dispara vários `executor-pesado` em
  paralelo; cada agente devolve as notas do seu lote e o líder grava no banco e confere.
- 2026-10-21 09:35 — **Exceção à regra "banco só pelo Claude Code local"** (`multiplas-ias.md`),
  só para a #318.1: o usuário autorizou esta sessão de nuvem a usar o conector do Supabase
  ("abra 1 excessao e faca a tarefa 318 agora").

### #318.1 — Corrigir pela IA as alternativas pendentes da atividade 36 (banco)

**Próximo passo:** — (entregue). Respostas novas ou alteradas depois da entrega ficam
pendentes para uma nova rodada.

- **Nível:** PESADO — banco (leitura e gravação em `correcao_discursiva`) e gabarito
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro
- **Descrição:** correção parcial de todas as alternativas pendentes da atividade 36, em equipe
  de agentes por lote de alunos.
- **Critérios de aceitação:** a consulta de pendentes da atividade 36 volta vazia; nenhuma linha
  com `nota_professor` foi alterada; todo `comentario` gravado começa com `[IA]`.
- **Entrega:** 2026-10-21 09:43 — 1.417 alternativas de 25 alunos com `nota_ia`, `comentario` e
  `nota_ia_em` em `correcao_discursiva`: 1.109 Certa, 227 Meia certa, 81 Errada; 492 com o aviso
  "⚠️ Texto igual ao de outro(s) aluno(s) — conferir." Equipe: 6 agentes (Opus) em paralelo, 5
  questões cada (1–5: 250 · 6–10: 239 · 11–15: 230 · 16–20: 226 · 21–25: 248 · 26–30: 224).
  Os agentes foram `general-purpose` (os `executor-*` não têm o conector do Supabase).
- **Verificação:** consulta do líder no banco: pendentes = 0; 1.417 linhas = soma dos agentes;
  0 com `nota_professor`; 0 sem `[IA]`; 0 comentários > 300 caracteres; toda nota é pontos,
  metade ou 0 e bate com o resultado do comentário; 0 linhas sem resposta.
- **Para o professor conferir na tela CORREÇÃO:** respostas escritas no campo de outra questão
  (ficaram Errada), um aluno que respondeu as questões 21–30 com textos de outro assunto, textos
  com cara de cópia de IA ou da internet (com aviso), fórmulas sem "=" na questão 23 (Meia certa).
