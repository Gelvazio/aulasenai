# Análise — Ementa, Atividades e Formulários

**Data:** 2026-09-21
**Status:** ✅ Leitura e cruzamento concluídos
**Natureza:** Diagnóstico. Nenhum arquivo foi alterado.

---

## 📌 O que foi lido

- `EMENTA-CHALKIE-AI.md` (15,9 KB)
- `ATIVIDADES/` — 7 HTMLs de atividades + `INFOGRAFICOS/` com 21 aulas
- Cruzamento com os 25 markdowns de `VERSAO-POWERPOINT/` e os 25 formulários

---

## 🔴 Achado principal: dois calendários incompatíveis

O projeto tem **duas contagens de aula** convivendo, e os artefatos se dividem
entre elas:

| Artefato | Aulas | Segue |
|----------|-------|-------|
| `EMENTA-CHALKIE-AI.md` | 21 | — (é a referência) |
| `ATIVIDADES/INFOGRAFICOS/` | 21 | ✅ ementa |
| `ATIVIDADES/*.html` | 21 | ✅ ementa |
| `VERSAO-POWERPOINT/*.md` | 25 | ❌ |
| `FORMULARIO-PRINCIPAL.gs` | 25 + quiz de revisão | ❌ |

Quem estuda pelos infográficos e atividades percorre 21 aulas; quem é avaliado
pelos formulários responde a 25. **Os dois conjuntos não se correspondem.**

---

## ✅ Boa notícia: os 25 slides não contradizem a ementa

Os 25 slides são a ementa **desdobrada**, não outra disciplina. As 21 aulas
aparecem na mesma ordem, com 4 aulas a mais:

| Slide extra | Conteúdo | Previsto na ementa? |
|-------------|----------|---------------------|
| 4 — Contextos Formais versus Informais | Módulo 1 | ✅ conteúdo do M1, sem aula própria |
| 5 — Síntese dos Fundamentos | Módulo 1 | ✅ consolidação do M1 |
| 14 — Redação de E-mails Corporativos | Módulo 3 | ✅ conteúdo do M3, agrupado na aula 11 |
| 21 — Trabalho Remoto e Colaboração | Módulo 5 | ✅ "ferramentas colaborativas" do M5 |

**Nenhum conteúdo órfão.** A correspondência slide → aula da ementa:

| Ementa | Slide | Ementa | Slide | Ementa | Slide |
|--------|-------|--------|-------|--------|-------|
| 1 | 1 | 8 | 10 | 15 | 18 |
| 2 | 2 | 9 | 11 | 16 | 19 |
| 3 | 3 | 10 | 12 | 17 | 20 |
| 4 | 6 | 11 | 13 | 18 | 22 |
| 5 | 7 | 12 | 15 | 19 | 23 |
| 6 | 8 | 13 | 16 | 20 | 24 |
| 7 | 9 | 14 | 17 | 21 | 25 |

Extras: slides 4, 5, 14 e 21.

---

## ⚠️ Problemas encontrados

### 1. Carga horária da ementa não fecha

O cabeçalho declara **33h**, mas a soma da coluna "Duração" da sequência de
aulas (Seção IV) dá **25h30**. Faltam **7h30** não alocadas. O `LEIA-ME.md` dos
infográficos já registra as "25h30" — ou seja, a divergência é conhecida, mas a
ementa nunca foi corrigida.

### 2. Numeração dos formulários fora da ordem pedagógica

A `Aula NN` do `FORMULARIO-PRINCIPAL.gs` não segue a sequência da ementa. Um
aluno que fizesse as avaliações na ordem numérica veria:

> Aula 01 — Processo Comunicativo → **Aula 02 — Preparação para Entrevistas**

Entrevistas é a **aula 8** da ementa. Entre uma e outra deveriam vir comunicação
eficaz, feedback, contextos, apresentações, oratória, reuniões e atendimento.

Pior: as aulas 19 a 25 dos formulários são justamente os fundamentos e a
comunicação oral — conteúdo de **início** de curso, avaliado no fim.

| Formulário | É, na ementa, a aula |
|------------|----------------------|
| Aula 02 | 8 (Entrevistas) |
| Aula 12 | 2 (Comunicação Eficaz) |
| Aula 19 | 3 (Feedback) |
| Aula 20 | — (Contextos, extra do M1) |
| Aula 21 | — (Síntese, extra do M1) |
| Aula 22 | 4 (Apresentações) |
| Aula 23 | 5 (Oratória) |
| Aula 24 | 6 (Reuniões) |
| Aula 25 | 7 (Atendimento) |

O quiz de revisão agrava: chama-se "Revisão Integrada — Aulas 1 a 9", mas as
aulas 1–9 dos formulários são fundamentos + **toda a comunicação escrita e
técnica**, não o bloco de fundamentos que o nome sugere.

### 3. Títulos dos Módulos 4, 5 e 6 divergem nas atividades

As aulas cobertas batem, mas os nomes dos módulos vêm de outra disciplina:

| Módulo | Ementa | `ATIVIDADES/` | Aulas |
|--------|--------|---------------|-------|
| 2 | Comunicação Oral | Comunicação Oral ✅ | 04–08 |
| 3 | Comunicação Escrita | Comunicação Escrita Prática ✅ | 09–11 |
| 4 | **Redação Técnica** | **Leitura Crítica** ❌ | 12–14 |
| 5 | **Ferramentas Digitais** | **Argumentação e Persuasão** ❌ | 15–17 |
| 6 | **Comunicação Não-Verbal** | **Comunicação em Contextos Específicos** ❌ | 18–20 |

As aulas 12–14 são Relatórios, Memorandos e Procedimentos — isso é Redação
Técnica, não Leitura Crítica. O mesmo vale para os outros dois.

### 4. Referências quebradas no `INFOGRAFICOS/LEIA-ME.md`

Os quatro caminhos citados como fonte não existem:

| Caminho citado | Situação |
|----------------|----------|
| `../../DOCUMENTACAO/EMENTA-CHALKIE-AI.md` | ❌ (está na raiz) |
| `../ATIVIDADES-DETALHADAS-POR-AULA-E-MODULO.md` | ❌ não existe |
| `../../docs/gerar-infograficos-21-aulas.py` | ❌ não existe |
| `GERADOR-AULAS` (folha de estilo) | ❌ não existe |

O script que gerou os 21 infográficos **não está no repositório** — não há como
regerá-los.

### 5. `STATUS-ATIVIDADES.md` está vazio

Arquivo de 0 byte na raiz.

### 6. Pendências declaradas na própria ementa

O checklist da Seção X e os recursos da Seção VIII listam como não feitos:
vídeos, banco de questões, templates, exercícios (15+), provas (2+), feedbacks.
As referências bibliográficas (Seção XIII) estão como
`Referência 1, 2, 3 [Preencher conforme instituição]`, e os contatos como
`[Preencher]`.

---

## 🛠️ Decisão pendente

O ponto a resolver antes de qualquer correção é **qual calendário vale**:

- **21 aulas** — ementa, infográficos e atividades já estão assim; seria preciso
  fundir 4 formulários e 4 slides nas aulas que os agrupam.
- **25 aulas** — slides e formulários já estão assim; seria preciso atualizar a
  ementa (sequência, carga horária e marcos) e regerar 4 infográficos e as
  atividades correspondentes.

Os slides sustentam a segunda opção: as 4 aulas extras cobrem conteúdo que a
ementa prevê, só que espremido. E a carga real de 25 aulas se aproxima das 33h
declaradas no cabeçalho, ao contrário das 25h30 da sequência atual.

Independentemente da escolha, os itens 2 (numeração), 3 (títulos de módulo),
4 (referências) e 5 (arquivo vazio) são correções isoladas.
