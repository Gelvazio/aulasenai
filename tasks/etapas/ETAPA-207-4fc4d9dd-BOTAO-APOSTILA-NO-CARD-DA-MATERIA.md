## Etapa 207-4fc4d9dd — Botão "📘 Apostila" no card da matéria (índice do curso)

**Tarefa:** #80-4fc4d9dd-d362-4b7c · **Pedido em:** 2026-10-14 10:20 · **Executor:** Claude Code (local · main)
**Pedido:** "O BOTÃO NÃO APARECE NA PÁGINA E ELE DEVE FICAR NESTE CARD AQUI: MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html" — "NO CARD DA MATERIA QUE ESTA NESTA PAGINA"
**Objetivo:** abrir a apostila de Testes de Front-End direto pelo card da matéria na página do curso.
**Ajuste pedido:** "BOTAO DE APOSTILA, NO CARD DEVE FICAR ABAIXO DO NOME DA MATERIA E NAO DEPOIS DE ATIVIDADES"
**Próximo passo:** 80.4 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 80.1 | Botão "📘 Apostila" no card de TESTES DE FRONTEND em `MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html` (editado à mão) | ✅ Concluído | 2026-10-14 10:27 | `git diff`: só a linha do card mudou; link `TESTES-DE-FRONTEND/APOSTILA/APOSTILA-TESTES-DE-FRONTEND.html` existe |
| 80.2 | `assets/gerador-indices/gerar_indices.py`: card da matéria ganha o botão quando houver `APOSTILA/APOSTILA-*.html` (`botoes_apostila`) | ✅ Concluído | 2026-10-14 10:27 | Sintaxe conferida com `ast.parse`; rodada de teste gerou o mesmo botão |
| 80.3 | Não regravar os índices pelo gerador | ✅ Concluído | 2026-10-14 10:27 | O gerador está atrás das páginas (não põe `popup.js`, `faixa-materias-ensalado.js` nem `data-curso-id`, que vêm de `scripts/*/indice_*.sh`); a rodada de teste foi desfeita (pendência registrada no STATUS) |
| 80.5 | Ajuste: botão "📘 Apostila" logo abaixo do nome da matéria (linha `div.acoes` própria), não ao lado de Atividades — na página e no gerador (`montar_botoes_titulo`, `botoes_titulo`) | ✅ Concluído | 2026-10-14 10:29 | `git diff` da página; `card_materia` conferido no Python: com apostila sai abaixo do nome, sem apostila o card não muda |
| 80.4 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | Usuário confere o botão no navegador (sem navegador pela IA) |
