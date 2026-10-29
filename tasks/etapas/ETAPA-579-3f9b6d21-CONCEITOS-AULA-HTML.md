## Etapa 579-3f9b6d21 — #432: CONCEITOS-AULA.html (cards, visual futurista) em TESTES-DE-FRONTEND

**Tarefa:** #432-3f9b6d21 · **Pedido em:** 2026-10-29 10:03 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "leia CONCEITOS-AULA.txt e crie CONCEITOS-AULA.html, use o visual futurista (`rules-ai/prompts/VISUAL-FUTURISTA.md`), explica em forma de cards estes assuntos, relacionados, não ligue a nada, isso é conteúdo adicional da aula".
**Objetivo:** página única e autônoma, em `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/`, com cards explicando os conceitos do `.txt` (API, REST, Insomnia, métodos HTTP, códigos de retorno, JSON, parâmetros, DOM, submit de formulário, atributos/ids/classes/estilos) e como se relacionam.

### Decisões
- 2026-10-29 — Conteúdo adicional pedido pelo usuário em chat, fora do `CONTEUDO/AULA-NN` (que segue sendo só dele). Página sem link para nada: não entra em índice, banco, `link_aula` nem menu.
- 2026-10-29 — Só HTML + CSS + JS inline mínimo? Não: HTML e CSS num arquivo só (autônomo); sem JS externo, sem imagem, fontes Google (Orbitron e Share Tech Mono) conforme o prompt.

### #432.1 — Criar CONCEITOS-AULA.html

**Próximo passo:** (entregue) — nada.

- **Nível:** MEDIO — classificado pelo Jev (mensagem do usuário, confiança 0,58 → matriz); 1 arquivo HTML
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** cards por assunto, relacionados entre si por seção/legenda (sem links externos), visual futurista, sem navegador para validar.
- **Critérios de aceitação:** todos os itens do `.txt` têm card; nenhum `<a href>`; layout 1 coluna até 720 px; `prefers-reduced-motion` respeitado; foco visível.
- **Entrega:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/CONCEITOS-AULA.html` (11 cards em 5 seções, visual futurista, sem links) · **Verificação:** revisão por 2 agentes (conteúdo técnico e CSS/acessibilidade), ajustes aplicados; todas as linhas até 100 caracteres, exceto a URL das fontes; 0 `<a>`; sem `style=""` nem JS. Visual só o usuário confirma na tela (sem navegador).
