## Etapa 559-5b2e8f14 — #412: Botões de atividade entregue ficam verdes em todos os botões do card (não só no primeiro)

**Tarefa:** #412-5b2e8f14 · **Pedido em:** 2026-10-27 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "PQ A ATIVIDADE OBJETIVA N FICA VERDE APOS ENTREGAR?" (atividades ID 190 e 191, aluno Sérgio Barboza de Oliveira Junior; a prática ID 168/182 fica verde e a objetiva continua laranja).
**Objetivo:** o botão de toda atividade entregue pelo aluno (prática, objetiva, dinâmica) ficar verde no índice de atividades.

**Causa (leitura do código + consulta ao banco simulando o aluno):** no banco o aluno entregou as atividades 190 e 191 e o RLS deixa ele ver as entregas. Em `assets/js/indice-atividades-feitas.js`, `iniciarMarcacaoFeitas` monta a lista de páginas a consultar só com o **primeiro** botão de cada card (`cards.map(... querySelector(SELETOR_LINK_FEITAS))`). As páginas do 2º e 3º botão (objetiva e dinâmica) nunca entram em `estados.paginas`, e `marcarLinksDoCard` ignora o botão cuja página não está lá: ele fica com a cor padrão (laranja).

### Escopo

- **Entra:** `assets/js/indice-atividades-feitas.js`: consultar as páginas de **todos** os botões do card (não só o primeiro). A marca "Fez Atividade?" do card continua pela página do primeiro botão.
- **Não entra:** CSS, outros índices, banco, a lógica de cor do card inteiro (já usa todas as páginas depois da correção), professor.

### Critério de pronto

- `node --check` ok; função ≤ 45 linhas; linha ≤ 100 colunas.
- Lendo o código: `buscarEstadosFeitas` recebe as páginas de todos os botões de todos os cards.
- A tela só o usuário confirma (sem navegador): objetiva e dinâmica entregues aparecem verdes.

### Riscos

- A cor do **card inteiro** passa a considerar também a dinâmica (já era a intenção do #325 "todas as atividades cadastradas do card"): um card só fica verde se a dinâmica também foi entregue. Avisar o usuário.
- Mais páginas na consulta `pagina=in.(...)`: ainda pequena (poucas dezenas por índice).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo da subtarefa classificados pelo Jev, não escritos pela IA.
- Pequena (1 arquivo, sem banco nem segurança): sem aprovação prévia (ciclo-da-task).

---

### #412.1 — Consultar as páginas de todos os botões do card

**Próximo passo:** em `iniciarMarcacaoFeitas`, juntar as páginas de todos os links de cada card antes de chamar `buscarEstadosFeitas`.

- **Nível:** MEDIO — Jev (confiança 0,97)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Descrição:** hoje `caminhos` guarda só o primeiro botão de cada card e vai inteiro para `buscarEstadosFeitas`; criar `paginasDeTodosOsBotoes` com todos os botões, mantendo `caminhos` só para a marca "Fez Atividade?".
- **Critérios de Aceitação:** botões objetiva e dinâmica recebem a classe `atividade--feita` quando entregues.
- **Entrega:** — · **Verificação:** —
