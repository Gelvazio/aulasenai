# 📝 Regras — Atividade prática (padrão da Prova Prática id 82)

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (seção
> "ATIVIDADE PRÁTICA — PADRÃO DA PROVA ID 82"). Registrada em 2026-10-09 a pedido do usuário. Ao
> alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

**Modelo:** `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-01.html`
(atividade **id 82**, fonte `ATIVIDADES/CONTEUDO/PROVA-PRATICA-ADAG-SALETE.md` + `-GABARITO.md`).
**Primeiro uso deste padrão em atividade de aula:** Testes de Front-End, aulas 01 a 03 (Etapa 108 do
`STATUS.md`, plano `docs/atividades-testes-frontend-aulas-01-a-03.md`).

---

## 1. O que é a atividade prática

- ✅ Toda **atividade prática de aula** (`ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.html`) é uma
  **atividade discursiva** com resposta digitada pelo aluno em cada tópico, gravada no banco, como
  a prova id 82 — e não um roteiro de laboratório sem folha de respostas.
- ✅ Além das perguntas, a página tem **tudo o que a prova id 82 tem** (seção 4): Progresso da
  turma, Gráficos, Cálculo Nota, quantidade mínima, correção pela IA, botões do professor,
  Finalizar Atividade, prova corrigida para o aluno, gabarito liberado por turma, exportar PDF.
- ✅ A atividade objetiva de 50 questões da aula continua existindo à parte (regra "1 ATIVIDADE
  OBJETIVA DE 50 QUESTÕES" em `docs/regras/atividades.md`); a prática é **adicional**.

## 2. Tamanho e pontuação

- ✅ **Atividade prática de uma aula:** **10 questões × 3 tópicos (a, b, c)**, valendo
  **0,2 + 0,4 + 0,4 = 1,0 ponto por questão**, total **10 pontos**, duração **90–120 minutos**
  (decisão do usuário em 2026-10-09).
- ✅ **Prova prática de várias aulas** (como a id 82): **20 questões × 3 tópicos**
  (0,1 + 0,2 + 0,2 = 0,5 por questão), total 10 pontos, 180–220 minutos.
- ✅ O tópico **a)** é o mais simples (identificar, classificar, montar); **b)** e **c)** pedem
  aplicação e justificativa.

## 3. Fonte (`ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md`)

Cabeçalho (campos `- **Campo:** valor`), **todos obrigatórios** neste padrão:

| Campo | Valor |
|---|---|
| Aula | `AP-NN` |
| Rótulo da aula | `Atividade Prática — Aula NN` |
| Tema · Ícone · Duração · Formato | tema da aula; ícone; `90–120 minutos`; discursiva estruturada |
| Total de questões · Pontuação · Pontos por questão | `10` · texto da pontuação · `1,0` |
| Capacidade avaliada | resumo do que a aula cobra (da ementa e da aula em `CONTEUDO/`) |
| Correção | IA sugere pelo `-GABARITO.md`, o professor confirma |
| Folha de respostas | `sim` |
| Turma | turma da matéria (vazio se não houver turma cadastrada) |
| Aula no banco | número da aula na matéria (a aula precisa existir no banco) |
| **Bloquear colar** | `sim` |
| **Campo do tamanho da resposta** | `sim` |
| **Botão gravar** | `sim` |
| **Progresso para o professor** | `sim` |
| **Ocultar respostas após entrega** | `sim` |

Depois do cabeçalho: **"Como responder"**, **"Como a correção funciona"** e a tabela
**"Cobertura da aula"** (questões × conteúdos). Cada questão:

```markdown
## ITEM NN — Título

- **Aula:** NN · Tema da aula
- **Capacidade:** C1, S1

**Contexto:**
Você, como aluno consultor, ... (situação real do contexto profissional do curso)

**Comando:**
O que o aluno deve fazer.

**Tópicos:**
- a) ... (0,2)
- b) ... (0,4)
- c) ... (0,4)
```

- ⛔ **Sem empresa fictícia:** o contexto é sempre **"Você, como aluno consultor..."** (regra global
  de 2026-10-08). A prova id 82 ainda usa empresa fictícia porque é anterior a essa regra.
- ✅ Conteúdo **só pelos Markdowns**: `EMENTA-CHALKIE-AI.md`, `materia.json` e
  `CONTEUDO/AULA-NN-*.md` (a ementa vence); nunca PDF.
- ✅ Capacidades com os códigos do `materia.json` da matéria (C1…, S1…).

## 4. Padrão de resposta (`ATIVIDADE-PRATICA-AULA-NN-GABARITO.md`, fora do Git)

- ✅ Abre com as **"Instruções para a IA corretora"** (mesmas da id 82): corrigir cada tópico
  isoladamente; só **nota cheia, metade ou zero**; equivalências aceitas; erros de português não
  descontam; resposta copiada é sinalizada ao professor (a IA não zera sozinha); a nota só vale
  depois da confirmação do professor.
- ✅ Um bloco por tópico: `### ITEM NN-a` com **`**Resposta esperada:**`** e **`**Critérios:**`**
  (palavras-chave, nota cheia, metade, zero).
- ✅ Todo tópico tem padrão de resposta (o gerador avisa "N sem padrão").

## 5. O que vem junto (já global nas discursivas — não criar código novo)

| Recurso | Quem vê | Onde está |
|---|---|---|
| Gravação automática + botão 💾 Gravar por tópico | aluno | `avaliacao-discursiva.js` |
| Bloqueio de colar / campo do tamanho da resposta | aluno | `bloqueio-colar-discursiva.js`, `campo-tamanho-discursiva.js` |
| Respostas ocultas depois da entrega | aluno | `respostas-discursivas-banco.js` |
| **Progresso da turma** (atualiza a cada 5 s; global em toda atividade) | professor | `progresso-turma-global.js` |
| **📈 Gráficos** (5 gráficos) | professor | `graficos-progresso-turma.js` |
| **🧮 Cálculo Nota** e Quantidade Mínima de Questões por aluno | professor | `calculo-nota-progresso.js`, `minimo-questoes-discursiva.js` |
| Nota parcial da IA e ícones ✅ / 🟡 / ❌ | professor | `nota-ia-respostas-discursiva.js` |
| Botões Certa / Meia certa / Errada (nota travada) | professor | `confirmar-nota-professor-discursiva.js` |
| **✅ Finalizar Atividade** (nota lançada) | professor | `finalizar-atividade-professor.js` |
| Liberar gabaritos por turma / prova corrigida | professor / aluno | `liberacao-respostas-discursiva.js`, `resultado-aluno-discursiva.js` |
| Exportar PDF padrão SENAI | todos | `exportar-pdf-discursiva.js` |

Cálculo da nota (o mesmo da id 82): soma das notas confirmadas ÷ pontos da atividade × 10 ×
(total de questões ÷ mínimo do aluno), **máximo 10**.

## 6. Geração e banco (uma aula por vez, completa)

1. A **atividade objetiva** da aula é gerada e cadastrada **antes** (o seed dela cria a aula no
   banco; o seed da prática procura a aula pelo número).
2. Escrever a fonte e o `-GABARITO.md`.
3. Gerar: `C:\Python314\python.exe assets\gerador-avaliacao-discursiva\gerar_avaliacao_discursiva.py
   <pasta ATIVIDADES> ATIVIDADE-PRATICA-AULA-NN.md` → página `ATIVIDADE-PRATICA-AULA-NN.html` e
   `database/<data>-atividade-pratica-aula-NN-seed-atividades.sql` (fora do Git).
4. Conferir: 10 itens × 3 tópicos, soma 10, padrão de resposta em todos os tópicos, atributos
   `data-bloquear-colar`, `data-campo-tamanho-resposta`, `data-progresso-professor`,
   `data-ocultar-respostas-entregue` e `data-login` no `<body>`, botão gravar nos tópicos e
   **nenhum padrão de resposta no HTML**.
5. Atualizar o índice (`assets/gerador-indices/gerar_indices.py`), o `ATIVIDADES/STATUS-ATIVIDADES.md`
   e o `AULAS/STATUS-AULAS.md`.
6. Aplicar o seed no Supabase **só com pedido/aprovação do usuário**; a prática **nasce bloqueada**
   e o professor libera no índice.

### ⚠️ Cuidados aprendidos na primeira geração (Testes de Front-End, 2026-10-09)

- ✅ **Só códigos C no campo Capacidade** (C1…C5): os geradores recusam S1/S2 ("não existe no campo
  capacidades do materia.json"). Socioemocionais ficam no texto da questão, não no código.
- ⛔ **Não deixar campo do cabeçalho vazio** (ex.: `- **Turma:**` sem valor): o gerador lê a linha
  seguinte como valor e perde o campo de baixo (ex.: "Aula no banco"). Sem turma, apagar a linha.
- ⛔ **O SQL sai com o nome `<data>-atividade-pratica-aula-NN-seed-atividades.sql`, igual para
  todas as matérias:** antes de gerar, copiar os SQL de mesmo nome de outras matérias e, depois,
  renomear o novo (ex.: `<data>-<materia>-atividade-pratica-aula-NN-...`) e devolver os originais.
- ✅ **Nome da matéria no SQL:** o gerador usa o `uc` do `materia.json`; se a descrição na tabela
  `materia` for outra (ex.: banco "TESTES DE FRONTEND" × `uc` "Testes de Front-End"), trocar o
  `m.descricao` no SQL gerado pelo nome do banco antes de aplicar.
- ✅ **Sem acentos graves (crase de código) no texto da fonte:** os geradores mostram o caractere
  como está; escrever nomes de funções sem eles.
- ⚠️ **Gerador de índices desatualizado:** `assets/gerador-indices/gerar_indices.py` **apaga a faixa
  ensalado** (botões SOMENTE ENSALADO/ON-OFF, `data-curso-id`) dos índices, que foi posta à mão.
  Até o gerador ser corrigido, depois de rodá-lo, levar só o card/grade da matéria para o índice
  atual e desfazer os demais arquivos.

## 7. Proibições

- ⛔ Nunca publicar o `-GABARITO.md`, as fontes `*QUESTOES.md` nem os seeds (`.gitignore`).
- ⛔ Nunca pôr o padrão de resposta na página do aluno (só pela liberação do professor por turma).
- ⛔ Nunca criar `<style>`/`<script>` embutidos nem `onclick` na página (o gerador já segue isso).
- ⛔ Não converter as práticas antigas de outras matérias para este padrão sem pedido do usuário.
