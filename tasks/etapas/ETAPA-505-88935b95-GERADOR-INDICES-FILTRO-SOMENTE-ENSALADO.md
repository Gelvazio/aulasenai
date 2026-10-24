## Etapa 505-88935b95 — Gerador de índices sempre emite o filtro "SOMENTE ENSALADO"

**Tarefa:** #356-88935b95-3f1c-4a7e-9d52-6b0e8c41a7d3 · **Pedido em:** 2026-10-24 17:14 · **Criada por:** Devin (local · main)
**Pedido:** "neste quadro, devia listar somente ensalado em MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/index.html" · "esta regra deve ser global aqui no projeto" · "sempre que gera este arquivo deve ter este comportamento"
**Objetivo:** todo `index.html` de curso e de matéria gerado por `assets/gerador-indices/gerar_indices.py` já sai com a faixa "Matérias — <CURSO>" filtrada em SOMENTE ENSALADO (regra `faixa-materias-ensalado.md`).

### Diagnóstico

- A faixa só filtra se o `<nav class="faixa-materias">` tiver `data-curso-id` e a página carregar `popup.js` + `faixa-materias-ensalado.js` (`assets/js/faixa-materias-ensalado.js`, `iniciarFaixasEnsalado`).
- `montar_faixa_materias` do gerador não emite `data-curso-id` e o `<head>` gerado não traz esses dois scripts. Os índices que têm o filtro (19 do ITIC + 4 cursos) foram editados à mão em `b44870e6`; como têm o marcador `gerador-indices`, o gerador os sobrescreve e o filtro some quando a página é regenerada (caso da UI/UX).

### #356.1 — Gerador emite `data-curso-id` e os scripts do filtro

**Próximo passo:** em `gerar_indices.py`, mapear pasta do curso → `curso.id` do banco (constante), emitir `data-curso-id` na faixa e os scripts `popup.js` e `faixa-materias-ensalado.js` no `<head>` (índice de matéria e de curso); regerar os índices e conferir; atualizar a regra.

- **Nível:** LEVE — sugestão do Jev em 2026-10-24 (confiança 0,66; revisão humana recomendada); 1 arquivo do gerador + regeração dos índices; sem banco/RLS
- **Modelo:** LEVE · só Haiku — executada pelo Devin a pedido do usuário
- **Descrição:** ver Próximo passo. Cursos com id conhecido: TECNICO-INFORMATICA-INTERNET=4, OPERADOR_PRODUCAO_INDUSTRIAL=2, ASSISTENTE-DE-OPERACOES-LOGISTICAS=5, RIO_DO_SUL_MAIS_TECH=6, GESTAO_E_CONTROLE_MATERIAIS=7; sem id registrado no repositório: QUALIFICACAO-PROFISSIONAL, CURSO-PROFESSOR-RAFAEL (ficam sem filtro, como hoje).
- **Critérios de aceitação:** índice regenerado de FUNDAMENTOS-DE-UI-UX traz `data-curso-id="4"` e os dois scripts; rodar o gerador de novo não remove o filtro de nenhum índice; `python -m py_compile` ok.
- **Entrega:** pendente · **Verificação:** pendente
