## 🔐 STATUS-PERMISSAO-EMENTA

| STATUS-PERMISSAO-EMENTA | Curso |
|---|---|
| VERIFICAR | ASSISTENTE-DE-OPERACOES-LOGISTICAS |
| IGNORAR | CURSO_ATIVIDADES_PADLET |
| VERIFICAR | GESTAO_E_CONTROLE_MATERIAIS |
| VERIFICAR | QUALIFICACAO-PROFISSIONAL |
| VERIFICAR | RIO_DO_SUL_MAIS_TECH |
| VERIFICAR | TECNICO-INFORMATICA-INTERNET |

**VERIFICAR:** 5 · **IGNORAR:** 1 (de 6 cursos)

> Vale para o curso inteiro. Curso em `IGNORAR` tem todas as ementas ignoradas (fora de
> pendências, ajustes e geração). Padrão: `IGNORAR`. Troque à mão para
> `VERIFICAR` nesta tabela: o script preserva o valor ao regenerar.

---

# STATUS-EMENTAS-CURSOS — Consolidado

**Última atualização:** 2026-10-02 08:35:27
**Escopo:** todos os cursos em `MATERIAIS/` (exceto `MATERIAS-GERAIS/`)
**Fonte:** tamanho medido direto em cada `EMENTA-CHALKIE-AI.md`
**Padrão de tamanho:** 14.800–14.950 caracteres

**Legenda:** ✅ Conforme · ❌ Fora do tamanho · ⚠️ Genérica (modelo, sem conteúdo próprio) · ⛔ Sem ementa

---

## 📊 Resumo por curso (situação medida, independe da permissão)

| Curso | Matérias | ✅ Conformes | ❌ Fora do tamanho | ⚠️ Genéricas | ⛔ Sem ementa |
|---|---|---|---|---|---|
| ASSISTENTE-DE-OPERACOES-LOGISTICAS | 1 | 1 | 0 | 0 | 0 |
| CURSO_ATIVIDADES_PADLET | 0 | 0 | 0 | 0 | 0 |
| GESTAO_E_CONTROLE_MATERIAIS | 1 | 1 | 0 | 0 | 0 |
| QUALIFICACAO-PROFISSIONAL | 3 | 1 | 0 | 2 | 0 |
| RIO_DO_SUL_MAIS_TECH | 7 | 7 | 0 | 0 | 0 |
| TECNICO-INFORMATICA-INTERNET | 1 | 1 | 0 | 0 | 0 |
| **TOTAL** | **13** | **11** | **0** | **2** | **0** |

---

## 📌 Pendências (só ementas em VERIFICAR)

### ❌ Fora do tamanho (0)

- nenhuma

### ⚠️ Genérica (modelo, sem conteúdo próprio) (2)

- QUALIFICACAO-PROFISSIONAL / DIGITAL SKILLS
- QUALIFICACAO-PROFISSIONAL / INTRODUCAO-LEAN-MANUFACTORING

### ⛔ Sem ementa (0)

- nenhuma

### ⛔ Cursos sem pasta de matéria (0)

- nenhum

---

## 🎓 ASSISTENTE-DE-OPERACOES-LOGISTICAS

| Matéria | Caracteres | Situação |
|---|---|---|
| INTRODUCAO-TIC | 14.917 | ✅ Conforme |

## 🎓 CURSO_ATIVIDADES_PADLET

⛔ Nenhuma pasta de matéria criada.

## 🎓 GESTAO_E_CONTROLE_MATERIAIS

| Matéria | Caracteres | Situação |
|---|---|---|
| ANALISE_DADOS_APLICADA_GESTAO | 14.892 | ✅ Conforme |

## 🎓 QUALIFICACAO-PROFISSIONAL

| Matéria | Caracteres | Situação |
|---|---|---|
| CANVAS-APRESENTACAO | 14.852 | ✅ Conforme |
| DIGITAL SKILLS | 14.800 | ⚠️ Genérica (modelo, sem conteúdo próprio) |
| INTRODUCAO-LEAN-MANUFACTORING | 14.802 | ⚠️ Genérica (modelo, sem conteúdo próprio) |

## 🎓 RIO_DO_SUL_MAIS_TECH

| Matéria | Caracteres | Situação |
|---|---|---|
| COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO | 14.886 | ✅ Conforme |
| EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS | 14.850 | ✅ Conforme |
| FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO | 14.928 | ✅ Conforme |
| NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS | 14.863 | ✅ Conforme |
| OFICINAS_IMPRESSAO_3D_ROBOTICA | 14.885 | ✅ Conforme |
| REFORCO_LINGUAGENS | 14.928 | ✅ Conforme |
| REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO | 14.887 | ✅ Conforme |

## 🎓 TECNICO-INFORMATICA-INTERNET

| Matéria | Caracteres | Situação |
|---|---|---|
| TESTES DE FRONTEND | 14.810 | ✅ Conforme |

---

## ⚙️ Como atualizar

```powershell
C:\Python314\python.exe MATERIAIS\RIO_DO_SUL_MAIS_TECH\scripts\criar-status-cursos.py
```

**Documento de controle central:** regenerar sempre que alterar ementas de qualquer matéria.
