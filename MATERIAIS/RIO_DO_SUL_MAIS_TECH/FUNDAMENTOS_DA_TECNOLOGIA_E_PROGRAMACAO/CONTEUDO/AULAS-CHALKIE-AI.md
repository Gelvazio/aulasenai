# AULAS A CRIAR — Fundamentos da Tecnologia e Programação (CEPLAS Manhã)

> Estruturado para uso por IA (Chalkie AI e outras). **5 aulas, uma por dia de aula (2h cada)**,
> cobrindo os 9 temas da ementa ainda não lecionados. Já lecionado:
> `CONTEUDO-JA-PASSADO-CEPLAS-MANHA.md`. Fonte da verdade: UC 2 da ementa do curso e
> `../EMENTA-CHALKIE-AI.md`. Versão visual: `AULAS-CHALKIE-AI.html`.

## 1. Instruções para a IA

1. Gerar **uma aula por dia** (seção 3), na ordem, com 2h cada, usando o `EMENTA-CHALKIE-AI.md`.
2. Cada aula tem 1 ou 2 blocos (temas). Dividir o roteiro por bloco.
3. Não reexplicar o já lecionado (Segurança da Informação, História da Informática, Hardware e
   SO, Introdução à Programação, Planilhas). Retomar em revisão de 5 minutos, no máximo.
4. Público: alunos de 15 a 17 anos; linguagem simples; um comando por passo; exemplos do cotidiano.
5. Formato de cada aula: objetivo, roteiro por tempo, atividade, produto, avaliação e recursos.
6. Se a ementa do curso divergir deste arquivo, a **ementa do curso vence**: avisar o professor.
7. Não inventar dados da turma; onde faltar informação, marcar `CONFIRMAR`.

## 2. Resumo

| Aula | Data | Docente | Carga | Temas (módulo da ementa) |
|------|------|---------|-------|--------------------------|
| 1 | 29/09/2026 | Gelvazio Camargo | 2h | Tecnologia e dispositivos (M1); Fake news, cyberbullying e pegadas digitais (M2) |
| 2 | 06/10/2026 | Gelvazio Camargo | 2h | Digitação e atalhos (M4); Editor de texto (M5) |
| 3 | 27/10/2026 | Samir de Moura Bueno | 2h | Apresentações básicas (M5); Navegadores e pesquisa (M6) |
| 4 | 03/11/2026 | Samir de Moura Bueno | 2h | Algoritmos: sequência, decisão e repetição; fluxogramas (M7) |
| 5 | 10/11/2026 | Samir de Moura Bueno | 2h | Programação em blocos, Scratch (M8); fechamento com ética e implicações sociais |

Total: **10h** = as horas ainda sem tema. Horário: 07:30–09:30.

## 3. Aulas

### Aula 1 — 29/09/2026 — Tecnologia e cidadania digital
**Bloco 1 (1h) — O que é tecnologia? Dispositivos digitais no cotidiano (Módulo 1)**
- **Conhecimentos:** conceito de tecnologia; dispositivos no dia a dia; evolução dos computadores (revisão)
- **Atividade:** mapear os dispositivos usados em 24h | **Produto:** quadro com dispositivo, função e conexão
- **Observação:** evitar repetir a linha do tempo de História da Informática

**Bloco 2 (1h) — Fake news, cyberbullying e pegadas digitais (Módulo 2)**
- **Conhecimentos:** cidadania digital; identificar fake news; cyberbullying e como agir; pegada digital
- **Atividade:** checar uma notícia em 3 fontes | **Produto:** cartaz ou post de conscientização
- **Observação:** retomar senhas e privacidade de Segurança da Informação, sem repetir

### Aula 2 — 06/10/2026 — Atalhos e editor de texto
**Bloco 1 (1h) — Digitação e atalhos de teclado (Módulo 4)**
- **Conhecimentos:** postura e digitação; Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Ctrl+S, Alt+Tab
- **Atividade:** desafio de digitação e circuito de atalhos | **Produto:** meta pessoal de palavras por minuto

**Bloco 2 (1h) — Editor de texto: Docs, WordPad ou Writer (Módulo 5)**
- **Conhecimentos:** criar e salvar; formatar fonte, parágrafo e lista; inserir imagem; compartilhar
- **Atividade:** escrever um currículo ou um resumo | **Produto:** documento de 1 página
- **Observação:** `CONFIRMAR` qual ferramenta o laboratório oferece

### Aula 3 — 27/10/2026 — Apresentações e pesquisa
**Bloco 1 (1h) — Apresentações básicas: Slides ou PowerPoint (Módulo 5)**
- **Conhecimentos:** estrutura de slide; texto, imagem e tema; poucos textos; apresentar
- **Atividade:** 5 slides sobre uma profissão | **Produto:** arquivo de slides

**Bloco 2 (1h) — Navegadores e boas práticas de pesquisa (Módulo 6)**
- **Conhecimentos:** partes do navegador; termos de busca; avaliar e citar a fonte
- **Atividade:** pesquisa comparando 3 fontes | **Produto:** ficha de pesquisa
- **Observação:** ligar com a fake news da Aula 1

### Aula 4 — 03/11/2026 — Algoritmos e fluxogramas
**Bloco único (2h) — Algoritmos: sequência, decisão e repetição; fluxogramas (Módulo 7)**
- **Conhecimentos:** entrada → processamento → saída; sequência; decisão (se/então); repetição; símbolos de fluxograma
- **Atividade:** algoritmo e fluxograma de uma rotina, primeiro no papel | **Produto:** fluxograma
- **Observação:** aproveitar a introdução dada em Fundamentos da Programação (24/03)

### Aula 5 — 10/11/2026 — Programação em blocos (Scratch)
**Bloco 1 (2h) — Programação em blocos: Scratch (Módulo 8)**
- **Conhecimentos:** interface; movimento; eventos; condições; repetições; variáveis
- **Atividade:** história ou jogo simples | **Produto:** projeto no Scratch com explicação oral
- **Observação:** com 2h só cabe o básico; a ementa prevê mais tempo (`CONFIRMAR` a redistribuição)

**Fechamento (transversal) — Implicações éticas e sociais das tecnologias**
- **Conhecimentos:** uso responsável; privacidade; IA e trabalho; impacto social
- **Atividade:** debate curto ao final da aula | **Produto:** posicionamento escrito de 5 linhas

## 4. Formato de dados (JSON)

```json
{
  "uc": "Fundamentos da Tecnologia e Programação",
  "turma": "CEPLAS-MANHA",
  "aulas_a_criar": [
    { "aula": 1, "data": "2026-09-29", "docente": "Gelvazio Camargo", "horas": 2,
      "temas": ["O que é tecnologia? Dispositivos digitais no cotidiano", "Fake news, cyberbullying e pegadas digitais"] },
    { "aula": 2, "data": "2026-10-06", "docente": "Gelvazio Camargo", "horas": 2,
      "temas": ["Digitação e atalhos de teclado", "Editor de texto (Docs, WordPad ou Writer)"] },
    { "aula": 3, "data": "2026-10-27", "docente": "Samir de Moura Bueno", "horas": 2,
      "temas": ["Apresentações básicas (Slides ou PowerPoint)", "Navegadores e boas práticas de pesquisa"] },
    { "aula": 4, "data": "2026-11-03", "docente": "Samir de Moura Bueno", "horas": 2,
      "temas": ["Algoritmos: sequência, decisão e repetição; fluxogramas"] },
    { "aula": 5, "data": "2026-11-10", "docente": "Samir de Moura Bueno", "horas": 2,
      "temas": ["Programação em blocos (Scratch)", "Implicações éticas e sociais das tecnologias (fechamento)"] }
  ]
}
```
