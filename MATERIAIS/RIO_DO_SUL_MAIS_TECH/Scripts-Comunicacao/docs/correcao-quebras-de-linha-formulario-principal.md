# Correção de Quebras de Linha — FORMULARIO-PRINCIPAL.gs

**Data de Criação:** 2026-09-21
**Status Geral:** ✅ Concluído
**Prioridade:** Alta

---

## 📌 Objetivo

Corrigir os erros de sintaxe do arquivo `FORMULARIO-PRINCIPAL.gs`, que impediam
o script de ser executado no Google Apps Script. O arquivo acumulava três
defeitos distintos, originados na consolidação automática dos 26 formulários
em um único arquivo.

---

## 📋 Escopo

- **Arquivo afetado:** `FORMULARIO-PRINCIPAL.gs` (8.261 → 7.256 linhas)
- **Relatório gerado:** `revisao.json`
- **Tecnologias:** Google Apps Script (JavaScript)
- **Dependências:** nenhuma
- **Limitação conhecida:** ver seção "Notas"

---

## 🔍 Diagnóstico

Os 26 formulários foram consolidados a partir de títulos com subtítulo. O
separador entre título e subtítulo virou uma **quebra de linha real** dentro
das strings, o que é erro de sintaxe em JavaScript. Disso decorreram:

| # | Defeito | Ocorrências |
|---|---------|-------------|
| 1 | String de uma linha partida em duas linhas físicas | 1.030 linhas |
| 2 | Aspas simples aninhadas dentro de string simples (`'...de: 'X'?'`) | 129 |
| 3 | Bloco `.setChoices([` da questão 1 sem o `]).setRequired(true);` | 25 |

O defeito 2 mascarava parte do defeito 1: as aspas se pareavam por acaso, então
um verificador que só conta aspas não enxergava a quebra. Por isso a detecção
final usou **linhas de continuação** (linha que não inicia um statement válido
é continuação da anterior), e não contagem de aspas.

---

## 📊 Plano de Execução

### Etapa 1: Reunir linhas de continuação
- **Status:** ✅ Concluído
- **Ação:** Unir cada linha que não inicia statement à linha anterior, com espaço
- **Resultado:** 1.030 junções

### Etapa 2: Converter aspas internas
- **Status:** ✅ Concluído
- **Ação:** Dentro de `setTitle`/`createChoice`/`setDescription`/etc., trocar aspas simples internas por duplas
- **Resultado:** 129 strings convertidas

### Etapa 3: Fechar blocos `setChoices([` órfãos
- **Status:** ✅ Concluído
- **Ação:** Inserir `]).setRequired(true);` ao fim do bloco não fechado
- **Resultado:** 25 blocos fechados (1 por função de criação)

### Etapa 4: Validação
- **Status:** ✅ Concluído
- **Verificação:** `node --check` → **sintaxe válida**
- **Verificação:** `revisao.json` → **0 linhas com erro, 0 delimitadores pendentes**

---

## ✅ Verificação de Integridade

Comparação entre o arquivo original e o corrigido:

| Marcador | Antes | Depois | Situação |
|----------|-------|--------|----------|
| `function` | 52 | 52 | ✅ igual |
| `createChoice(` | 2120 | 2120 | ✅ igual |
| `setChoices([` | 530 | 530 | ✅ igual |
| `setTitle(` | 663 | 663 | ✅ igual |
| `setRequired(true)` | 557 | 582 | ✅ +25 esperado (Etapa 3) |

Nenhuma questão, alternativa ou função foi perdida.

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Separador original irrecuperável | Alta (ocorreu) | Junção com espaço simples — ver Notas |
| Perda de conteúdo na junção | Baixa | Contagens estruturais conferidas (tabela acima) |
| Erro residual não detectado | Baixa | Validação cruzada com `node --check` |

---

## 📝 Notas

**Separador entre título e subtítulo.** O caractere que separava título e
subtítulo foi destruído na consolidação e não existe em nenhum commit do
histórico. A junção usou **espaço simples**, gerando textos como:

> `Aula 02 · Preparação para Entrevistas Comunicação oral estratégica e postura profissional`

O código está correto e executável, mas se o texto desejado for
`Preparação para Entrevistas: Comunicação oral estratégica...` ou com travessão,
é necessária uma passada de ajuste editorial nos 26 títulos.

**Textos truncados na origem.** Algumas alternativas já vinham truncadas do
gerador original (ex.: `'...precisa ter co'`). Esse defeito é anterior a esta
correção e não foi alterado.

---

## ✅ Checklist Final

- [x] Arquivo corrigido conforme planejado
- [x] Sintaxe validada por parser real (`node --check`)
- [x] Integridade estrutural conferida
- [x] Relatório `revisao.json` regenerado
- [x] Documentação criada
- [x] Commit realizado
