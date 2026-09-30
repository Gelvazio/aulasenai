# Conciliar ementas de ITIC em EMENTA-CHALKIE-AI.md

**Objetivo:** Unificar `EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md` (ementa oficial explicada) e `EMENTA-CHALKIE-AI.md` (template genérico) em um único `EMENTA-CHALKIE-AI.md` específico da UC, removendo o arquivo antigo.

**Tech Stack:** Markdown, Python (contagem de caracteres), Git

**Criado em:** 2026-09-23 16:21
**Concluído em:** 2026-09-23 16:24
**Tempo decorrido:** 03:00

**Escopo aprovado pelo usuário:** "CONCILIE AS 2 E DEIXE SOMENTE EMENTA-CHALKIE-AI.md"

---

## Diagnóstico

| Problema no `EMENTA-CHALKIE-AI.md` anterior | Correção |
|---|---|
| Nome errado ("...e Computadores") | "...Tecnologia da Informação e Comunicação" |
| Conteúdo genérico de template (3 módulos, 11h) | 10 aulas × 4h = 40h, alinhadas aos slides reais |
| Tópico inexistente na ementa ("automação de processos logísticos") | Removido; só conteúdos da ementa oficial |
| Placeholders (`[Termo 1]`, `[Título, Autor]`) | Glossário e recursos reais |
| Texto de preenchimento repetido e truncado | Removido |
| Avaliação inventada (35/40/15/10%) | Avaliação real: Objetiva 4,0 + Prática 6,0 |

## Fontes conciliadas

- `EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md` — capacidades, conhecimentos, socioemocionais, BNCC, ambientes, regras para IA
- `ESTRUTURACAO-PLANOS-DE-ENSINO/PLANO-ENSINO-ITIC.txt` — 10 blocos de 4h
- `AULAS-CHALKIE-AI/*.pdf` — sequência real das 10 aulas
- `AVALIACOES/*.md` — instrumentos e pontuação reais

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Reescrever `EMENTA-CHALKIE-AI.md` conciliado | ✅ Concluído | 2026-09-23 16:21 | 2026-09-23 16:23 | 02:00 |
| 2 | Validar tamanho 14.800–14.950 chars | ✅ Concluído | 2026-09-23 16:23 | 2026-09-23 16:24 | 00:30 |
| 3 | Remover `EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md` | ✅ Concluído | 2026-09-23 16:24 | 2026-09-23 16:24 | 00:10 |
| 4 | Commit | ✅ Concluído | 2026-09-23 16:24 | 2026-09-23 16:24 | 00:10 |

---

### Passo 1: Reescrever EMENTA-CHALKIE-AI.md

**Status:** ✅ Concluído

**Arquivo:** Modificar `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/EMENTA-CHALKIE-AI.md`

**Ação:** Nova versão com identificação, objetivos, 5 capacidades oficiais + 12 mensuráveis, 10 domínios de conhecimento, 10 aulas de 4h, avaliação real, rubrica 4 níveis, BNCC, socioemocionais, recursos reais, prompts Chalkie AI e regras para IA.

### Passo 2: Validar tamanho

**Status:** ✅ Concluído

```powershell
python -c "print(len(open('EMENTA-CHALKIE-AI.md',encoding='utf-8').read()))"
```

Esperado: valor entre 14800 e 14950. Resultado: **14840** ✅

### Passo 3: Remover arquivo antigo

**Status:** ✅ Concluído

```powershell
git rm EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md
```

Observação: referências ao nome antigo em `docs/expandir-aulas-10-itens.md` (tarefa histórica) e em `GERADOR-AULAS/CLAUDE.md` (outro projeto/caminho) foram mantidas.

### Passo 4: Commit

**Status:** ✅ Concluído

```powershell
git commit -m "docs(itic): conciliar ementas em EMENTA-CHALKIE-AI.md"
```

Resultado: commit `16afc8f`
