# Atividade com 20 perguntas — Informática Básica (Hardware, Periféricos e SO)

**Objetivo:** Criar uma atividade HTML com 20 perguntas baseada em `AULAS-CHALKIE-AI/INFORMATICA-BASICA.md`, seguindo o padrão visual de `C:\Users\gelva\projetos\Scripts-Comunicacao\ATIVIDADES\ATIVIDADES-MODULO-*.html`, salva em `INTRODUCAO-TIC/ATIVIDADES/`.

**Tech Stack:** HTML5 + CSS + JavaScript puro (abas), sem dependências externas.

**Criado em:** 23/09/2026
**Concluído em:** 23/09/2026
**Tempo decorrido:** —

---

## Padrão seguido (ATIVIDADES-MODULO-2.html)

- `header` com degradê `#667eea → #764ba2` e borda dourada `#FFD700`.
- `.nav-tabs` com botões `.tab-btn` (`data-tab`) e seções `.content-section`.
- `.aula-card` com `.aula-badge`, `.aula-title`, `.aula-meta` (`.tag`) e `.content-box` rotulados: 🎯 CAPACIDADE · 📋 CONTEXTO · 🎬 COMANDO · 📝 ETAPAS/ALTERNATIVAS · ✅ CRITÉRIOS · 📦 ENTREGA.
- `footer` escuro com identificação do módulo.

## Estrutura da atividade

| Aba | Conteúdo |
|---|---|
| Orientações | Capacidade, contexto geral (centro de distribuição), comando, etapas, critérios e entrega |
| Parte 1 — Hardware | Q01–Q05 |
| Parte 2 — Periféricos | Q06–Q09 |
| Parte 3 — Sistema Operacional | Q10–Q13 |
| Parte 4 — Arquivos | Q14–Q17 |
| Parte 5 — Manutenção e Segurança | Q18–Q20 |
| Gabarito (professor) | Resposta e justificativa das 20 questões |

Tipos: múltipla escolha, verdadeiro/falso, associação, ordenação e discursiva.

## Arquivos

| Arquivo | Ação |
|---|---|
| `INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-INFORMATICA-BASICA.html` | Criar |
| `INTRODUCAO-TIC/docs/atividade-informatica-basica-20-perguntas.md` | Este documento |

## Riscos

- Gabarito na mesma página: fica em aba separada, identificada como "professor".
- Nenhum teste automatizado será criado (regra do CLAUDE.md global).

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Ler o padrão em `Scripts-Comunicacao/ATIVIDADES` | ✅ Concluído |
| 2 | Redigir as 20 perguntas a partir de `INFORMATICA-BASICA.md` | ✅ Concluído |
| 3 | Gerar `ATIVIDADES-INFORMATICA-BASICA.html` no padrão | ✅ Concluído |
| 4 | Conferir (20 questões, 7 abas, gabarito completo) | ✅ Concluído |
| 5 | Commit dos arquivos da tarefa + graphify na raiz | ✅ Concluído |

**Verificação:**

```powershell
(Select-String -Path "C:\fontes\aulas-senai\MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\ATIVIDADES\ATIVIDADES-INFORMATICA-BASICA.html" -Pattern 'class="aula-badge">QUESTÃO').Count
```

Esperado: `20`.

---

## Ajuste 2 — Exportar PDF em um único arquivo (23/09/2026)

**Padrão seguido:** `Scripts-Comunicacao/FORMULARIOS-SEPARADOS/26-Quiz-Revisao-Aulas-1-9.html` (jsPDF 2.5.1 + jspdf-autotable 3.5.31, cabeçalho SENAI em tabela, bloco "Conteúdo avaliado", questões em tabelas).

| Passo | Descrição | Status |
|-------|-----------|--------|
| 6 | Barra de exportação abaixo das abas: botão **📥 Exportar PDF (atividade completa)** + caixa **Incluir gabarito** (desmarcada) | ✅ Concluído |
| 7 | Função `exportarPDFAtividade()`: percorre as 5 partes (Q01–Q20) e gera **um único PDF** com cabeçalho SENAI, conteúdo avaliado, alternativas e espaço de resposta | ✅ Concluído |
| 8 | Gabarito opcional em página final; rodapé "Página X de Y"; nome `Atividade-Informatica-Basica-Completa[-COM-GABARITO].pdf` | ✅ Concluído |
| 9 | Validação da sintaxe do JavaScript com Node (`new Function`) | ✅ Concluído |

**Observações:**
- Emojis e símbolos fora do Latin-1 (ex.: →) são convertidos/removidos no PDF, pois a fonte padrão do jsPDF não os suporta.
- As bibliotecas vêm do cdnjs: a exportação exige internet.

---

## Ajuste 3 — Gabarito em Word para os alunos (23/09/2026)

**Objetivo:** criar `ATIVIDADES/GABARITO-INFORMATICA-BASICA.docx`, folha de respostas das questões 1 a 20 para entregar aos alunos, com campos de nome(s), turma, data e nota no cabeçalho.

| Passo | Descrição | Status |
|-------|-----------|--------|
| 10 | Gerar o .docx (docx-js): cabeçalho SENAI, campos de nomes, tabela Q01–Q20 com marcação por tipo de questão, linhas para a discursiva | 🔄 Em progresso |
| 11 | Renderizar em PDF/imagem e conferir o layout | ⬜ Pendente |
| 12 | Commit dos arquivos da tarefa | ⬜ Pendente |
