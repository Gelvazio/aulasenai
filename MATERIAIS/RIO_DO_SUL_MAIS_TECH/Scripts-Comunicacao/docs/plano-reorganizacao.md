---
name: reorganizacao-comunicacao-oral-escrita
description: Reorganizar pasta de Comunicação Oral e Escrita com estrutura clara e sem duplicatas
metadata:
  type: project
---

# 🔄 Plano de Reorganização — Comunicação Oral e Escrita

**Objetivo:** Organizar estrutura de pastas de forma lógica e eliminar duplicatas  
**Escopo:** Pasta completa `C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH\INTRODUCAO_COMUNICACAO_ORAL_ESCRITA`  
**Data:** 2026-09-21  
**Status:** ⬜ Pendente aprovação do usuário

---

## 📊 Problemas Identificados

| Problema | Impacto | Exemplo |
|----------|---------|---------|
| **Ementas duplicadas** | Confusão sobre qual usar | `EMENTA.md` + `Ementa_Introducao_Comunicacao_Oral_Escrita.md` + pasta CEPLAS |
| **Apostilas em múltiplos formatos** | Sincronização complicada | `.md` + `.pdf` em locais diferentes |
| **Turma específica misturada** | Difícil manutenção | `CEPLAS-VESPERTINO-2026-02/` na raiz |
| **Nomes inconsistentes** | Dificuldade de busca | `Slides_...` vs padronização |
| **Falta de índice** | Navegação confusa | Sem índice ou mapa de conteúdo |

---

## 🎯 Estrutura Proposta

```
INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/
│
├─ 📋 DOCUMENTACAO/
│  ├─ EMENTA.md                          (versão principal)
│  ├─ PLANO-AULAS.md                     (planejamento)
│  ├─ VERIFICACAO_COBERTURA_EMENTA.md   (checklist)
│  └─ INDEX.md                           (novo: mapa de navegação)
│
├─ 📚 CONTEUDO/
│  ├─ APOSTILA-COMUNICACAO-15H.md       (unificado)
│  ├─ APOSTILA-COMUNICACAO-15H.pdf      (renderizado)
│  └─ APOSTILA-COMUNICACAO-15H.docx     (formatado)
│
├─ 🎨 SLIDES/
│  └─ Slides_Introducao_Comunicacao_Oral_Escrita.pptx
│
├─ 📝 ATIVIDADES/
│  ├─ 01-FERRAMENTAS-DIGITAIS/
│  │  ├─ Ferramentas_Digitais_para_Comunicacao.docx
│  │  ├─ Atividades_Ferramentas_Digitais.md
│  │  └─ Atividades_Ferramentas_Digitais_Facil.md
│  │
│  └─ (próximas atividades aqui)
│
├─ ✅ AVALIACOES/
│  ├─ Avaliacao_Pratica_Comunicacao_Oral_Escrita.docx
│  ├─ Recuperacao_Comunicacao_Oral_Escrita.docx
│  └─ Gabarito_Avaliacoes.md             (novo)
│
├─ 🎓 TURMAS/
│  ├─ CEPLAS-VESPERTINO-2026-02/
│  │  ├─ EMENTA_TURMA.md
│  │  ├─ APOSTILA-CEPLAS-VESPERTINO-2026-02.md
│  │  ├─ APOSTILA-CEPLAS-VESPERTINO-2026-02.pdf
│  │  ├─ APOSTILA-CEPLAS-VESPERTINO-2026-02.docx
│  │  ├─ ATIVIDADES-CEPLAS-VESPERTINO-2026-02.md
│  │  ├─ ATIVIDADES-CEPLAS-VESPERTINO-2026-02.docx
│  │  ├─ AULAS-ATE-01-09-2026.md
│  │  ├─ AULAS-ATE-01-09-2026.pdf
│  │  └─ INFOGRAFICOS/
│  │     ├─ infografico_google_workspace.png
│  │     ├─ infografico_netiqueta.png
│  │     ├─ infografico_phishing.png
│  │     ├─ infografico_privacidade.png
│  │     └─ infografico_senhas.png
│  │
│  └─ (futuras turmas aqui)
│
└─ docs/
   └─ plano-reorganizacao.md
```

---

## 📋 Passos de Reorganização

### ⬜ **PASSO 1** — Criar Nova Estrutura de Pastas
**Ação:** Criar pastas conforme estrutura proposta  
**Verificação:** `dir` mostra todas as pastas criadas  

### ⬜ **PASSO 2** — Mover Documentação
**Ação:** 
- EMENTA.md → DOCUMENTACAO/
- PLANO-AULAS.md → DOCUMENTACAO/
- VERIFICACAO_COBERTURA_EMENTA.md → DOCUMENTACAO/

**Verificação:** Arquivos em DOCUMENTACAO/ existem

### ⬜ **PASSO 3** — Consolidar Apostilas
**Ação:**
- Rename `Apostila_Comunicacao_15h_Versao_Joao_Revisado_2026_02.md` → `APOSTILA-COMUNICACAO-15H.md`
- Mover para CONTEUDO/
- AULAS/Apostila_Comunicacao_Oral_e_Escrita15h.pdf → CONTEUDO/

**Verificação:** Todos os formatos de apostila em CONTEUDO/

### ⬜ **PASSO 4** — Reorganizar Atividades
**Ação:**
- Mover `04 - FERRAMENTAS-DIGITAIS/` → ATIVIDADES/01-FERRAMENTAS-DIGITAIS/
- Padronizar nomes (sem "04 -")
- Converter DOCX → MD quando possível

**Verificação:** ATIVIDADES/01-FERRAMENTAS-DIGITAIS/ contém arquivos

### ⬜ **PASSO 5** — Mover Avaliações
**Ação:**
- AVALIACOES/*.docx → AVALIACOES/
- Padronizar nomes

**Verificação:** Todos arquivos em AVALIACOES/

### ⬜ **PASSO 6** — Reorganizar Turmas
**Ação:**
- CEPLAS-VESPERTINO-2026-02/ → TURMAS/CEPLAS-VESPERTINO-2026-02/
- Criar TURMAS/CEPLAS-VESPERTINO-2026-02/INFOGRAFICOS/
- Mover infograficos para lá

**Verificação:** TURMAS/ contém CEPLAS com estrutura correta

### ⬜ **PASSO 7** — Eliminar Duplicatas
**Ação:**
- Deletar `Ementa_Introducao_Comunicacao_Oral_Escrita.md` (raiz)
- Deletar `AULAS/` pasta (já movido)
- Deletar `04 - FERRAMENTAS-DIGITAIS/` (já movido)

**Verificação:** Raiz contém apenas docs/ e INDEX.md

### ⬜ **PASSO 8** — Criar INDEX.md
**Ação:**
- Criar `DOCUMENTACAO/INDEX.md` com mapa completo de navegação
- Documentar onde cada tipo de conteúdo está

**Verificação:** INDEX.md lista todos os recursos e onde acessá-los

### ⬜ **PASSO 9** — Cleanup e Commit
**Ação:**
- Verificar estrutura final
- Git add + commit com mensagem descritiva
- Atualizar graphify: `graphify update .`

**Verificação:** `git log` mostra commit de reorganização

---

## ✅ Resultado Esperado

- ✅ **0 duplicatas** — cada arquivo tem 1 única localização
- ✅ **Estrutura clara** — tipo de conteúdo define onde está
- ✅ **Turmas separadas** — TURMAS/ isoladas da estrutura geral
- ✅ **Sem quebras** — todos os links/imports funcionam
- ✅ **Fácil expansão** — adicionar novas turmas/atividades é simples
- ✅ **Documentado** — INDEX.md guia usuário por toda estrutura

---

## 🚨 Riscos e Mitigações

| Risco | Mitigation |
|-------|-----------|
| Links quebrados | Verificar todos os imports/refs após mover |
| Versões diferentes não sincronizadas | Manter APOSTILA-COMUNICACAO-15H como fonte única |
| Perda de histórico de turmas | Manter TURMAS/ para futuras turmas |

---

**Próximo Passo:** Aguardar confirmação do usuário ✋

