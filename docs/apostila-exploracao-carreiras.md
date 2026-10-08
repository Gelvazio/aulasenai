# Plano — Apostila de Exploração de Carreiras Industriais e Tecnológicas

Pedido do usuário (2026-10-07): "Apostila de EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS".
Matéria: `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/` (curso e
matéria em `VERIFICAR`). Regras: "REGRAS APOSTILAS" do `CLAUDE.md`.

## Etapas

1. ✅ `materia.json` (arquivo único): C1–C4 e conhecimentos da UC 6 na ementa do curso (fonte da
   verdade); capacidades específicas, módulos, sequência de 9 aulas de 4 h (36 h), avaliação,
   BNCC, prompts, situações-problema e métricas copiados literalmente da ementa da matéria.
2. ✅ Conferência ampliada para o formato desta ementa, sem textos fixos de matéria
   (`assets/gerador-apostilas/conferir_ementa.py`): capacidades em lista numerada, conteúdos
   programáticos em "### Módulo N", aulas em "**Aula N — Tema (4h)**", indicadores em listas
   "- **Nome:** texto", situações-problema em lista e "Carga Horária" com qualquer caixa. O
   `markdown_apostila.py` passou a escrever os campos novos do `materia.json`
   (`capacidades_especificas_ementa`, `conteudos_programaticos`, `estrategias_ensino`,
   `textos_sequencia`, `situacoes_problema`, `avaliacao.textos`). ITIC e Testes de Frontend
   continuam com 100%.
3. ✅ `APOSTILA/CONTEUDO/INTRODUCAO.md` e Markdown completo com conferência 100% (130/130).
4. 👀 Capítulo 01 em rascunho (`APOSTILA/RASCUNHOS/CAPITULO-01.md`), aguardando validação do
   usuário e a conferência da duração dos vídeos (YouTube inacessível na sessão em nuvem).
5. ⬜ Capítulos 02 a 09, um por vez, com validação a cada capítulo.
6. ⬜ HTML (`gerar_apostila.py <pasta>`), item "📘 Apostila" no menu da matéria (quando existir) e
   header do usuário.

## Fontes do conteúdo

`EMENTA-CHALKIE-AI.md` (vence), UC 6 da `EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md` (vence a da
matéria) e `AULAS/AULA-NN.md` (apoio). Itens das aulas antigas sem fonte confiável (ex.: nomes de
plataformas de emprego que não existem) não são copiados. Empresas dos exemplos são fictícias.
