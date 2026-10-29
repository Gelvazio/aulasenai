## Etapa 574-064a3097 — #427: Botão "Marcar como turma favorita" na faixa de matérias

**Tarefa:** #427-064a3097 · **Pedido em:** 2026-10-29 07:11 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "adicione 1 botão ali em todos os cursos, pra poder selecionar a turma favorita" (print da faixa "MATÉRIAS — TECNICO INFORMATICA INTERNET" com o combo Turma).
**Objetivo:** na faixa "Matérias — <CURSO>" de todos os índices de curso, o professor marca a turma do combo como favorita com um botão ao lado do combo.

### Escopo
- Entra: botão ao lado do combo "Turma:" da faixa (só professor), que grava a turma escolhida como favorita pelo RPC `definir_turma_favorita` já existente, reaproveitando `assets/js/turma-favorita.js`; o texto do botão mostra o estado; o combo reflete a nova favorita (⭐).
- Entra: `assets/gerador-indices/gerar_indices.py` passa a emitir `turma-favorita.js` nas páginas com faixa (índice do curso e da matéria); os `index.html` gerados são regravados pelo gerador.
- Entra: `assets/js/atividades-crud-modal.js` não carrega `turma-favorita.js` de novo quando ele já estiver na página (evita declaração duplicada).
- Não entra: banco (sem SQL novo), RLS, aluno, mudança no índice de atividades ou na barra de turma das matérias.

### Riscos
- `turma-favorita.js` declara constantes globais: carregar duas vezes na mesma página quebra o script. Plano B: guarda de `typeof` no carregamento dinâmico.

### Verificação
- `node --check` nos JS alterados; `python -m py_compile` no gerador; grep de `turma-favorita.js` nos `index.html` gerados.
- Sem navegador e sem testes automatizados (regra do projeto).

### Decisões
- 2026-10-29 07:11 — Usuário pediu no chat. A favorita continua única no sistema (`turma.favorito`), como hoje.

### #427.1 — Botão de turma favorita na faixa de matérias

**Próximo passo:** classificar pelo Jev e, se o modelo for o certo, reservar e implementar o escopo acima.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** botão "Marcar como turma favorita" ao lado do combo Turma da faixa (professor), usando `turma-favorita.js`; gerador e carregamento sem duplicar o script.
- **Critérios de aceitação:** botão visível só para o professor em todas as faixas com `data-curso-id`; clicar grava a favorita (RPC existente) e atualiza o combo e o texto do botão; sem SQL novo.
- **Entrega:** — · **Verificação:** — (node --check, py_compile, grep nos index.html gerados)
