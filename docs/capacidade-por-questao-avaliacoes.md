# Capacidade em cada questão e lista de capacidades no início das avaliações

**Objetivo:** nas páginas geradas pelo **gerador de avaliações objetivas**
(`assets/gerador-atividades/`) e pelo **gerador de provas discursivas**
(`assets/gerador-avaliacao-discursiva/`), mostrar:

1. a **CAPACIDADE** de cada questão, em um quadro "🎯 CAPACIDADE" logo abaixo do título;
2. no início da avaliação, no cartão INSTRUÇÕES, a lista **"🎯 CAPACIDADES AVALIADAS"**
   (código + texto oficial da ementa), no lugar do texto livre "Capacidade avaliada".

**Fonte da verdade:** a tabela "Capacidades básicas [oficial]" do `EMENTA-CHALKIE-AI.md` de cada
matéria (C1, C2...). Os textos não são inventados nem alterados.

**Tech stack:** Python 3.14 (geradores), HTML (templates) e o CSS que já existe
(`atividade.css`, `content-box`). Nenhum JS novo e nenhuma mudança no banco.

**Criado em:** 2026-10-02
**Concluído em:** 2026-10-02
**Tempo decorrido:** ~1h

---

## Como vai funcionar

- **`atividades.json` da matéria** ganha o campo `capacidades` com os textos oficiais da ementa:
  ```json
  "capacidades": {
    "C1": "Utilizar os recursos da tecnologia da informação e comunicação relativos a planilhas...",
    "C2": "Aplicar conceitos matemáticos na realização de cálculos básicos e de estatística..."
  }
  ```
- **Cada questão do `.md`** ganha a linha `**Capacidade:** C2` (ou `C1, C3` quando a questão cobre
  duas capacidades), logo abaixo do título `## ITEM NN — ...`.
- **Gerador:** troca o código pelo texto oficial (`C2 — Aplicar conceitos matemáticos...`) no
  quadro da questão. No início, lista **só as capacidades usadas** na avaliação, em ordem de código.
- **Validação (return early):** se uma questão citar um código que não existe no
  `atividades.json`, o gerador para com erro e não grava nada.
- **Compatibilidade:** questão sem `**Capacidade:**` continua funcionando sem o quadro, e as
  atividades de 50 questões não mudam. O campo `Capacidade avaliada` do cabeçalho continua aceito
  e só é usado quando nenhuma questão tem capacidade.

### Classificação das questões (proposta, a partir da ementa)

| Matéria | Regra |
|---|---|
| Análise de Dados (C1, C2) | Cálculos, porcentagem, estatística, PA/PG → **C2**. Excel, fórmulas, formatação, validação, filtros, tabela dinâmica, gráficos, dashboard → **C1**. Questão que calcula dentro do Excel → **C1, C2**. |
| Introdução à TIC (C1 a C5) | Pela aula, conforme os indicadores da ementa: aula 1 → C1 · 2 → C4 · 3 → C5 · 4 → C1/C5 · 5 → C2 · 6 → C1 · 7 → C1/C3 · 8 e 9 → C3 · 10 → C1. Questão a questão, quando o conteúdo pedir outra capacidade. |

---

## Arquivos previstos

| Arquivo | Mudança |
|---|---|
| `assets/gerador-atividades/gerar_atividades.py` + `template_atividade.html` | lê `**Capacidade:**`, quadro por questão e lista no início |
| `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` + `template_avaliacao_discursiva.html` | idem |
| `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/atividades.json` | campo `capacidades` (C1, C2) |
| `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/atividades.json` | campo `capacidades` (C1 a C5) |
| `.../ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-01-QUESTOES.md` (60) e `-02-` (60) | `**Capacidade:**` em cada questão (fora do Git) |
| `.../ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA.md` (10) | idem |
| `.../INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/AVALIACAO-OBJETIVA-01-QUESTOES.md` (50), `-02-` (50) e `AVALIACAO-PRATICA.md` | idem (fora do Git) |
| As 6 páginas `AVALIACAO-*.html` / `PROVA-PRATICA.html` | regeneradas |

---

## Riscos e cuidados

- **Regenerar não pode mudar mais nada:** conferir com `git diff` que só entram os quadros de
  capacidade (questões, alternativas, `data-*`, menu e header iguais).
- **Seed do banco:** o gerador discursivo também grava o seed em `database/` (fora do Git). O
  enunciado e os pontos dos tópicos não mudam, então **não é preciso rodar o seed de novo**.
- **Gabarito:** os `.md` das objetivas continuam fora do Git (`*QUESTOES.md`).
- **Matérias semelhantes:** só estas duas matérias; nenhuma outra é alterada.
- Sem testes automatizados (regra do projeto).

---

## Passos

| Passo | Descrição | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | `capacidades` nos dois `atividades.json` (texto oficial da ementa) | 2 × `atividades.json` | comparar com a tabela do `EMENTA-CHALKIE-AI.md` | ✅ Concluído |
| 2 | Gerador objetivo: ler `**Capacidade:**`, validar o código, quadro por questão, lista no início | `gerar_atividades.py`, `template_atividade.html` | `python -m py_compile` | ✅ Concluído |
| 3 | Gerador discursivo: o mesmo | `gerar_avaliacao_discursiva.py`, template | `python -m py_compile` | ✅ Concluído |
| 4 | Classificar as questões de Análise de Dados (Obj. 01, Obj. 02, Prova Prática) | 3 `.md` | contagem: toda questão com capacidade | ✅ Concluído |
| 5 | Classificar as questões de Introdução à TIC (Obj. 01, Obj. 02, Prática) | 3 `.md` | idem | ✅ Concluído |
| 6 | Regenerar as 6 páginas (`--so=` nas objetivas, para não mexer no index.html) | 6 HTML | `git diff`: só os quadros de capacidade | ✅ Concluído |
| 7 | Registrar o campo `**Capacidade:**` no `CLAUDE.md` (seção de geradores) e fazer o commit local | `CLAUDE.md` | `git diff --cached --name-only` sem gabarito | ✅ Concluído |

---

## Resultado

- Layout do quadro igual ao modelo enviado pelo professor: faixa azul-escura com "CAPACIDADES"
  e linhas "**C1 —** texto" (`assets/css/capacidades.css`, módulo `assets/gerador-capacidades/`).
- Textos: Introdução à TIC = os do modelo do professor (redação completa da UC); Análise de Dados =
  `EMENTA-PRINCIPAL-GESTAO_E_CONTROLE_MATERIAIS.md`.
- 6 avaliações regeneradas (260 questões com capacidade). Antes de incluir as capacidades, a
  regeneração não mudou nenhuma página (conferido no `git diff`).
- O gerador discursivo também aceita a fonte na raiz de `ATIVIDADES/` (caso do `PROVA-PRATICA.md`).
- Seeds regenerados em `database/` (fora do Git) sem mudança nos tópicos: não é preciso rodar.

## Atualização 2026-10-02 — atividades, caixa na questão e classificação item a item

- A pedido do professor, a capacidade da questão virou uma **caixa "🎯 CAPACIDADE" no mesmo
  formato da caixa CONTEXTO** (o quadro azul "CAPACIDADES" fica só no início).
- Estendido às **atividades de 50 questões** das duas matérias (16 páginas pelo gerador; a Aula 03
  de Introdução à TIC não tem fonte `.md`, então as caixas foram inseridas direto no HTML).
- **Classificação revista questão a questão** pelo conteúdo, conforme a seção "Capacidades ×
  Conhecimentos" da ementa (ex.: backup e senhas → C2; e-mail → C1 e C5; normas técnicas → C3;
  recursos do editor/planilha/apresentação → C4; cálculos no Excel → C1 e C2).
- Antes de incluir as capacidades, todas as páginas foram regeneradas e ficaram idênticas; depois,
  o `git diff` só mostra as caixas/quadros de capacidade (questões e alternativas intactas).
- PDF: o quadro "CAPACIDADES" sai depois do cabeçalho, e a caixa de cada questão entra como
  "CAPACIDADE: C1 — ..." (lida como as demais caixas).
