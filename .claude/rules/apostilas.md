# 📘 Apostilas e dados da ementa (`materia.json`)

Estrutura de pastas da matéria: `materias-global.md`. Detalhes: `docs/regras/apostilas.md`.

## Antes de gerar

- Ler a **ementa da matéria** e a da **UC no curso** (a do curso vence). Fontes permitidas e
  proibidas: `materias-global.md` ("Fontes do conteúdo").

## `materia.json` — arquivo único de dados da matéria

- Fica em `<MATERIA>/materia.json` (substituiu `atividades.json` e `apostila.json`).
- Contém as **capacidades** (básicas e socioemocionais) e os **conhecimentos** (domínios e
  conteúdos) da ementa, sem repetir dados em outro JSON.
- Traz o **plano de aulas: 1 aula de 4 horas = 1 capítulo** (tema, domínios, capacidades, conteúdos
  oficiais × detalhamento didático, indicadores, situação-problema, atividade, estratégias).
- Todos os geradores leem dele (`assets/gerador-materia/materia.py`).

## Fluxo da apostila

1. Capítulos em Markdown — **um por vez, com validação do usuário**.
2. Mínimo de **5 exercícios por capítulo**.
3. **Markdown completo** em `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md` (o usuário compara e
   acrescenta dados).
4. Só no final o **HTML**, gerado a partir do Markdown completo.

## Identificação (2026-10-07)

- Toda apostila mostra **autor, versão, data e hora** (capa e rodapé do HTML/PDF e cabeçalho do
  Markdown completo).
- Autor e versão no `materia.json` (`autor_apostila`, `versao_apostila`); data e hora = geração do
  HTML. Autor padrão: **Gelvazio Camargo**.
- Mudou o conteúdo → subir a versão (ajuste 1.0 → 1.1; mudança grande → 2.0).

## PDF (2026-10-08, todas as apostilas)

- Rodapé de toda folha: **"Página N de T"** — apostila completa usa a numeração da apostila;
  exportação parcial (ex.: só exercícios) numera as folhas exportadas ("Página 1 de 2").
  Código: `assets/js/apostila.js` (`numerarPaginas`, `numerarPaginasExportadas`).
- A **faixa azul vertical** da esquerda aparece só na tela; no PDF não sai (`@media print` em
  `assets/css/apostila.css`), mantendo as margens para a paginação não mudar.
