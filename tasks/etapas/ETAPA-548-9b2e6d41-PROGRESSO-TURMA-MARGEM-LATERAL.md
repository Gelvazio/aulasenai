# ETAPA 548 — Quadro "Progresso da turma" com a mesma margem lateral dos demais cards

- **TASK:** #403 (pedida em 2026-10-26)
- **Nível/Modelo:** LEVE · effort low (Jev, conf. 0,86). Executada pelo Devin a pedido do usuário ("é, leve, pegue").
- **Tipo:** ajuste de CSS compartilhado.
- **Aprovação:** pedido direto do usuário ("layout grudado nas laterais, use a mesma lógica de baixo").

## Pedido

O quadro **"Progresso da turma"** fica colado nas bordas laterais da página; deve ter a mesma margem lateral dos cards de baixo (ex.: IDENTIFICAÇÃO).

## Causa encontrada

`montarProgressoDaTurma` (`assets/js/progresso-turma-global.js`, linha ~1226) insere `section.progresso-turma` com `cabecalho.after(area)` — filha direta de `.container`, **fora** do `.content-section`, que é quem tem `padding: 40px` (20px em ≤768px, 10px em ≤600px — `assets/css/atividade.css`).

## Escopo

- `assets/css/progresso-turma-global.css`: `.progresso-turma` ganha margem lateral igual ao padding do `.content-section` (40px / 20px / 10px nos mesmos breakpoints).
- Vale para todas as atividades com o quadro (objetivas e discursivas — CSS compartilhado).

## Subtarefas

### 403.1 — Margem lateral do quadro Progresso da turma igual à dos cards

- **Nível:** LEVE (Jev, conf. 0,86) · **Status:** ✅ Concluído
- **Descrição:** ajustar `margin` de `.progresso-turma` no CSS + breakpoints; sem mexer em HTML/JS.
- **Entrega:** `progresso-turma-global.css` — `.progresso-turma` com `margin: 16px 40px` (lateral igual ao padding do `.content-section`) e media queries `max-width: 768px` (20px) e `600px` (10px), mesmos breakpoints de `atividade.css`.
- **Próximo passo:** nenhum — task fechada.
- **Verificação:** breakpoints conferidos contra `.content-section` em `atividade.css` (40px / 20px / 10px); sem navegador.
- **JEV-AI-SUGGESTION:** NAO
