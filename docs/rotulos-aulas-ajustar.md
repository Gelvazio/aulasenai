# Rótulos "AULA NN" das aulas — para o usuário ajustar

> Atualizado em 2026-10-17 (#259): a coluna `aulas.rotulo_card` foi removida; o rótulo do card é sempre "AULA NN" de `aulas.numero`. O texto abaixo é o histórico.

- **Criado em:** 2026-10-06 (lido do banco, tabela `aulas`)
- **Regra:** toda aula deve ter o rótulo do card no formato **`AULA NN`** (regra no `CLAUDE.md`).
- **Como usar:** preencha a coluna **"Novo rótulo"** das linhas ⚠️ (ou de qualquer outra que
  queira mudar) e peça para aplicar. Linha com "Novo rótulo" vazio não é alterada.
- **Colunas:** `ID` = `aulas.id`; `Nº` = `aulas.numero` (número interno no banco, único por
  matéria); `Rótulo atual` = `aulas.rotulo_card` (o que o card mostra no topo); `Nome do card` =
  `aulas.nome_card` ou, vazio, `aulas.titulo`.
- ⚠️ O `Nº` do banco nem sempre é igual ao "AULA NN" do card (as aulas separadas em 2026-10-06
  receberam os próximos números livres da matéria). O card mostra o **rótulo**; se quiser, informe
  também o novo `Nº` na última coluna.

## Análise de Dados Aplicada à Gestão

| ID | Nº | Rótulo atual | Nome do card | Situação | Padrão | Novo rótulo | Novo Nº |
|----|----|--------------|--------------|----------|--------|-------------|---------|
| 37 | 1 | AULA 01 | Matemática Aplicada à Gestão Parte 1 | | ✅ | | |
| 76 | 9 | AULA 02 | Fundamentos Matemáticos para Gestão | | ✅ | | |
| 38 | 2 | AULA 03 | Excel Básico Interface e Fórmulas | | ✅ | | |
| 77 | 10 | AULA 04 | Excel Intermediário Formatação e Validação | | ✅ | | |
| 39 | 3 | AULA 05 | Excel Avançado Funções Complexas e Busca | | ✅ | | |
| 79 | 12 | AULA 06 | Excel Avançado Tabelas Dinâmicas e Gráficos | | ✅ | | |
| 67 | 7 | AULA 07 | Dashboards Interativos e Integração de Dados | | ✅ | | |
| 78 | 11 | AVALIACAO OBJETIVA 01 | Avaliação das Aulas 01 a 04 | | ⚠️ | | |
| 68 | 8 | AVALIACAO OBJETIVA 02 | Avaliação das Aulas 05 a 07 | | ⚠️ | | |
| 40 | 4 | PROVA PRÁTICA 06/10 | Prova Prática 08-10-2026 — Aulas 01 a 07 | | ⚠️ | | |
| 41 | 5 | EXCEL 29/09 | Controle de estoque do almoxarifado | excluída | ⚠️ | | |
| 42 | 6 | EXCEL 01/10 | Análise de compras com tabelas dinâmicas | excluída | ⚠️ | | |

## Fundamentos de Automação/Instrumentação

| ID | Nº | Rótulo atual | Nome do card | Situação | Padrão | Novo rótulo | Novo Nº |
|----|----|--------------|--------------|----------|--------|-------------|---------|
| 43 | 1 | ATIVIDADES | ATIVIDADES AULA 01 50 QUESTOES | | ⚠️ | | |
| 44 | 2 | ATIVIDADES | ATIVIDADES AULA 02 50 QUESTOES | | ⚠️ | | |
| 45 | 3 | ATIVIDADES | ATIVIDADES AULA 03 50 QUESTOES | | ⚠️ | | |
| 46 | 4 | ATIVIDADES | ATIVIDADES AULA 04 50 QUESTOES | | ⚠️ | | |
| 47 | 5 | ATIVIDADES | ATIVIDADES AULA 05 50 QUESTOES | | ⚠️ | | |
| 48 | 6 | ATIVIDADES | ATIVIDADES AULA 06 50 QUESTOES | | ⚠️ | | |
| 49 | 7 | ATIVIDADES | ATIVIDADES AULA 07 50 QUESTOES | | ⚠️ | | |
| 50 | 8 | ATIVIDADES | ATIVIDADES AULA 08 50 QUESTOES | | ⚠️ | | |
| 51 | 9 | ATIVIDADES | ATIVIDADES AULA 09 50 QUESTOES | | ⚠️ | | |
| 52 | 10 | ATIVIDADES | ATIVIDADES AULA 10 50 QUESTOES | | ⚠️ | | |
| 53 | 11 | ATIVIDADES | ATIVIDADES AULA 11 50 QUESTOES | | ⚠️ | | |
| 54 | 12 | ATIVIDADES | ATIVIDADES AULA 12 50 QUESTOES | | ⚠️ | | |
| 55 | 13 | ATIVIDADES | ATIVIDADES AULA 13 50 QUESTOES | | ⚠️ | | |
| 56 | 14 | ATIVIDADES | ATIVIDADES AULA 14 50 QUESTOES | | ⚠️ | | |
| 80 | 15 | ATIVIDADES | PROVA OBJETIVA PROF RAFAEL | | ⚠️ | | |

## Fundamentos da Tecnologia e Programação

| ID | Nº | Rótulo atual | Nome do card | Situação | Padrão | Novo rótulo | Novo Nº |
|----|----|--------------|--------------|----------|--------|-------------|---------|
| 32 | 1 | AULA 01 | Introdução à Tecnologia e Dispositivos Digitais | | ✅ | | |
| 33 | 2 | AULA 02 | Cidadania Digital e Segurança Online | | ✅ | | |
| 34 | 3 | AULA 03 | Ferramentas de Produtividade | | ✅ | | |
| 35 | 4 | AULA 04 | Ferramentas de Apresentação e Pesquisa Online | | ✅ | | |
| 36 | 5 | AULA 05 | Introdução aos Algoritmos | | ✅ | | |

## Introdução à Tecnologia da Informação e Comunicação (ITIC)

| ID | Nº | Rótulo atual | Nome do card | Situação | Padrão | Novo rótulo | Novo Nº |
|----|----|--------------|--------------|----------|--------|-------------|---------|
| 21 | 1 | AULA 01 | Comunicação Profissional e Seus Fundamentos | | ✅ | | |
| 22 | 2 | AULA 02 | Hardware, Periféricos e Sistemas Operacionais | | ✅ | | |
| 23 | 3 | AULA 03 | Navegação na Web e Pesquisa Acadêmica | | ✅ | | |
| 24 | 4 | AULA 04 | Comunicação Digital e Colaboração em Nuvem | | ✅ | | |
| 25 | 5 | AULA 05 | Segurança da Informação e Proteção de Dados | | ✅ | | |
| 26 | 6 | AULA 06 | Editor de Textos: Formatação e Estruturação | | ✅ | | |
| 27 | 7 | AULA 07 | Textos Técnicos e Redação Empresarial | | ✅ | | |
| 28 | 8 | AULA 08 | Editor de Planilhas: Organização e Fórmulas | | ✅ | | |
| 29 | 9 | AULA 09 | Planilhas Eletrônicas: Análise Visual e Gráficos | | ✅ | | |
| 30 | 10 | AULA 10 | Editor de Apresentações e TIC | | ✅ | | |
| 31 | 11 | (vazio → AULA 11) | O Ciclo do Feedback na Comunicação | sem atividade | ✅ | | |
| 69 | 12 | AVALIAÇÃO 01 | Avaliação Objetiva 01 — Aulas 01 a 05 | | ⚠️ | | |
| 74 | 17 | AVALIAÇÃO 02 | Avaliação Objetiva 02 — Aulas 06 a 10 | | ⚠️ | | |
| 75 | 18 | AVALIAÇÃO PRÁTICA | Avaliação Prática — Aulas 01 a 10 | | ⚠️ | | |
| 70 | 13 | TRABALHO EM EQUIPE v1 · AULAS 01 A 07 | Manual de Comunicação Técnica do CD (v1) | | ⚠️ | | |
| 71 | 14 | TRABALHO EM EQUIPE v2 · AULAS 01 A 07 | Manual de Comunicação Técnica do CD (versão simplificada) | | ⚠️ | | |
| 72 | 15 | ATIVIDADE INDIVIDUAL · AULAS 01 A 07 | Comunicação Técnica no CD | | ⚠️ | | |
| 73 | 16 | ATIVIDADE INDIVIDUAL · DISCURSIVAS · AULAS 01 A 07 | Comunicação Técnica no CD — Discursivas | | ⚠️ | | |

## Reforço de Linguagens

| ID | Nº | Rótulo atual | Nome do card | Situação | Padrão | Novo rótulo | Novo Nº |
|----|----|--------------|--------------|----------|--------|-------------|---------|
| 57 | 1 | AULA 01 | Leitura e Compreensão Textual Básica | | ✅ | | |
| 58 | 2 | AULA 02 | Tema, Assunto e Ideia Principal | | ✅ | | |
| 59 | 3 | AULA 03 | Intenção Comunicativa e Análise Crítica | | ✅ | | |
| 60 | 4 | AULA 04 | Coesão e Coerência Textual | | ✅ | | |
| 61 | 5 | AULA 05 | Tipologias Textuais na Prática | | ✅ | | |
| 62 | 6 | AULA 06 | Pontuação e Concordância na Escrita | | ✅ | | |
| 63 | 7 | AULA 07 | Classes de Palavras e Figuras de Linguagem | | ✅ | | |
| 64 | 8 | AULA 08 | Oralidade e Apresentação em Público | | ✅ | | |
| 65 | 9 | AULA 09 | Argumentação Oral, Debates e Registros | | ✅ | | |
| 66 | 10 | AULA 10 | Gêneros Literários, Textos Técnicos e Síntese | | ✅ | | |
