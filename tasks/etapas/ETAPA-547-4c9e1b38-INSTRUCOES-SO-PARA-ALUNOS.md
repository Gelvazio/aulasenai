# ETAPA 547 — Bloco "INSTRUÇÕES / Como Responder" visível só para alunos

- **TASK:** #402 (pedida em 2026-10-26)
- **Nível/Modelo:** LEVE · effort low (reclassificação do Jev, conf. 0,74 — primeira classificação PESADO/conf. 0,40 por sinal "segredo" foi revista; usuário: "é algo simples, faça"). Executada pelo Devin.
- **Tipo:** mudança de visibilidade por perfil (professor × aluno) em todas as atividades discursivas/práticas.
- **Aprovação:** pedido direto do usuário ("estas instruções devem aparecer apenas aos alunos" + "faça").

## Pedido

O bloco **INSTRUÇÕES — "Como Responder"** das páginas de atividade prática/discursiva (badge `INSTRUÇÕES`, com INFORMAÇÕES GERAIS, CAPACIDADES, CONTEXTO DO CURSO, PRODUTO DA AULA e COMO RESPONDER) **só aparece para alunos**; o professor não o vê.

## Onde está o bloco

- Primeira `<section class="aula-card">` do `<main>` das páginas práticas/discursivas, antes de `#painel-discursivo`. Badge `INSTRUÇÕES` + `<h2 class="aula-title">Como Responder</h2>`.
- Gerada por `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` a partir dos `.md` — **191 arquivos** em `MATERIAIS/` contêm "Como Responder" (todas as matérias, não só UI/UX).
- O perfil já é conhecido em `assets/js/avaliacao-discursiva.js` (`dados.ehProfessor`, painel `#painel-discursivo`).

## Decisões em aberto

- Esconder via JS compartilhado (`avaliacao-discursiva.js`/`atividade.js`) — sem mexer nos 191 HTML — ou marcar a seção no gerador + CSS. O aluno continua vendo; sem login/fora do perfil, decidir o comportamento (mais seguro: esconder até saber que é aluno? Ou mostrar e esconder ao confirmar professor — decidir na execução).

## Subtarefas

### 402.1 — Esconder o bloco INSTRUÇÕES do professor em todas as atividades

- **Nível:** LEVE (Jev, conf. 0,74) · **Status:** ✅ Concluído
- **Descrição:** quando `ehProfessor`, o bloco INSTRUÇÕES/"Como Responder" não aparece; aluno continua vendo. Achado no caminho: a prova inteira já fica oculta ao professor pela classe `discursiva--respostas-ocultas`, mas o botão "Mostrar questões" a reexibia **incluindo** as instruções — agora o card INSTRUÇÕES fica escondido nos dois estados; e nas objetivas (`respostas-atividade.js`) o professor já o via sempre — agora escondido também. Decisão literal do pedido ("apenas aos alunos"): **só o aluno logado vê** — visitante também não vê.
- **Entrega:** `aplicarInstrucoesSoParaAluno()` em `avaliacao-discursiva.js` (chamada no init) e em `respostas-atividade.js` (chamada após `escolherProvedor`); esconde o `.aula-card` cujo `.aula-badge` é "INSTRUÇÕES" quando não é aluno logado. Cobre as 191 páginas com "Como Responder" (74 discursivas + 117 objetivas — conferido: nenhuma carrega outro motor). `docs/regras/atividades.md` atualizado.
- **Próximo passo:** nenhum — task fechada.
- **Verificação:** `node --check` nos 2 JS OK; grep confirmou que toda página com "Como Responder" carrega `avaliacao-discursiva.js` ou `respostas-atividade.js`; sem navegador.
