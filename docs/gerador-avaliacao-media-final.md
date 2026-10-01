# Gerador da página AVALIACAO-MEDIA-FINAL.html por matéria

**Objetivo:** criar em `assets/gerador-avaliacao-media-final/` um gerador reutilizável que monta a
página `AVALIACAO-MEDIA-FINAL.html` (composição da nota, 100 pontos) na pasta `ATIVIDADES/` de
cada matéria, a partir de um arquivo de dados da própria matéria.

**Tech Stack:** Python 3.14 (`C:\Python314\python.exe`), HTML (template), JSON. Reaproveita
`assets/css/avaliacao-media-final.css`, `assets/js/avaliacao-media-final.js`,
`assets/js/avaliacao-media-final-professor.js`, `assets/gerador-menu/tags_menu.py` e
`tags_header.py` (nenhum CSS/JS novo).

**Criado em:** 2026-10-01
**Concluído em:** 2026-10-01
**Tempo decorrido:** ~40 min

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Template HTML do gerador | ✅ Concluído |
| 2 | Script `gerar_avaliacao_media_final.py` | ✅ Concluído |
| 3 | `media-final.json` de Introdução à TIC (igual à página atual) | ✅ Concluído |
| 4 | Regerar ITIC e conferir que a página não muda (só o comentário do gerador) | ✅ Concluído |
| 5 | Propor `media-final.json` nas outras matérias com páginas de atividade e gerar | ✅ Concluído |
| 6 | Registrar o gerador no `CLAUDE.md` (seção `assets/`) | ✅ Concluído |
| 7 | Commit local | ✅ Concluído |

---

## Como funciona

**Uso (na raiz do projeto):**

```powershell
# gera a página de uma matéria (precisa do media-final.json na pasta)
C:\Python314\python.exe assets\gerador-avaliacao-media-final\gerar_avaliacao_media_final.py <pasta ATIVIDADES>

# cria um media-final.json de PROPOSTA a partir das páginas existentes (não sobrescreve)
C:\Python314\python.exe assets\gerador-avaliacao-media-final\gerar_avaliacao_media_final.py <pasta ATIVIDADES> --propor

# todas as matérias de MATERIAIS/ que já têm media-final.json
C:\Python314\python.exe assets\gerador-avaliacao-media-final\gerar_avaliacao_media_final.py --todas
```

**Dados:** `atividades.json` da pasta (`uc`, `uc_curta`, `curso`) +
`media-final.json` (composição da nota, decidida pelo professor):

```json
{
  "nota_minima": 70,
  "grupos": [
    { "id": "atividades", "peso": "30%", "subtotal": "Subtotal — 10 atividades (3 pontos cada)",
      "nota_subtotal": true,
      "itens": [ { "nome": "Atividade Aula 01", "conteudo": "Comunicação profissional",
                   "pontos": 3, "pagina": "ATIVIDADES-AULA-01-50-QUESTOES.html" } ] },
    { "id": "objetiva", "subtotal": "Subtotal — 2 provas objetivas (20 pontos cada)",
      "itens": [ { "nome": "Avaliação Objetiva 01", "conteudo": "Aulas 01 a 05", "pontos": 20,
                   "peso": "20%", "pagina": "AVALIACAO-OBJETIVA-01.html" } ] },
    { "id": "pratica", "peso": "30%", "subtotal": "Subtotal — 1 prova prática",
      "pagina": "AVALIACAO-PRATICA.html",
      "itens": [ { "nome": "Prova Prática — execução", "conteudo": "Tarefa feita corretamente",
                   "pontos": 15 } ] }
  ],
  "regras": ["Cada atividade e cada prova objetiva tem nota de 0 a 10, ..."]
}
```

- Item **com** `pagina` → linha com nota/pontos lidos do banco (`data-pagina`, `data-pontos`).
- Item **sem** `pagina` → linha só descritiva (ex.: critérios da prática).
- Grupo com `pagina` → a nota vem no subtotal (caso da prova prática).
- `nota_subtotal: true` → o subtotal mostra a nota 0 a 10 do grupo (média para lançar no sistema).
- **Validações (return early, aborta sem gravar):** soma dos pontos = 100; `pagina` existe na
  pasta; ids de grupo únicos; `nota_minima` entre 0 e 100.
- A página gerada leva o marcador `<!-- gerador-avaliacao-media-final -->`. Página existente
  **sem** o marcador só é sobrescrita com `--forcar` (proteção da página feita à mão).
- `--propor`: lista as páginas da pasta (`ATIVIDADES-*-50-QUESTOES.html`, `ATIVIDADE-*.html`,
  `AVALIACAO-OBJETIVA-NN.html`, `AVALIACAO-PRATICA.html`) e distribui 30 / 40 / 30 pontos entre
  os grupos que existirem (grupo ausente → pontos repartidos entre os outros). É só uma
  proposta para o professor revisar; nunca sobrescreve um `media-final.json` existente.

## Arquivos previstos

- `assets/gerador-avaliacao-media-final/gerar_avaliacao_media_final.py` (novo, < 1000 linhas,
  funções ≤ 45 linhas, JSDoc/docstrings, nomes em português)
- `assets/gerador-avaliacao-media-final/template_avaliacao_media_final.html` (novo)
- `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/media-final.json` (novo)
- `.../INTRODUCAO-TIC/ATIVIDADES/AVALIACAO-MEDIA-FINAL.html` (regerado, mesmo conteúdo)
- Passo 5: `media-final.json` + `AVALIACAO-MEDIA-FINAL.html` nas matérias com páginas de
  atividade — hoje só **Análise de Dados Aplicada à Gestão** (7 atividades de 50 questões,
  2 Atividades Excel e 2 objetivas, sem prova prática)
- `CLAUDE.md` (registro do gerador)

## Riscos e dependências

- A nota só aparece se a página estiver cadastrada na tabela `atividade` (coluna `pagina`).
  Nenhuma alteração no banco nesta tarefa.
- Matérias sem nenhuma página de atividade (Rio do Sul Mais Tech, Qualificação Profissional,
  Testes de Front-end) **não** recebem página: o gerador avisa e pula.
- A composição de pontos das outras matérias é pedagógica: a proposta do `--propor` precisa da
  revisão do professor.
- Matérias semelhantes: só as pastas aprovadas aqui.

## Verificação

- `C:\Python314\python.exe -m py_compile` no script.
- ITIC: `git diff` da página regerada mostra só o marcador do gerador.
- Gestão: conferir a soma 100 e os links `data-pagina` existentes (leitura do HTML).
- Sem navegador e sem servidor (regra do usuário).

## Resultado

- Gerador criado em `assets/gerador-avaliacao-media-final/`.
- ITIC: `media-final.json` com a composição atual; página regerada com a tabela idêntica
  (mudaram só o marcador do gerador, a posição do CSS do menu e a quebra de linha das regras).
- Gestão (Análise de Dados): proposta 30/40/30 aprovada pelo usuário — 7 atividades (4,29 cada,
  a última 4,26), 2 objetivas (20 cada) e as 2 Atividades Práticas de Excel como prática (15
  cada). Página gerada; link adicionado no `MENU-ATIVIDADES.js` e no `index.html` (feito à mão).
- Demais matérias: sem páginas de atividade, o gerador pula.
- Pendência: as notas só aparecem para páginas cadastradas na tabela `atividade` (as Atividades
  Práticas de Excel e a prova prática ainda não têm nota no banco).

- Item com `"nota_fixa": 10` (2026-10-01): a linha mostra essa nota para todos os alunos (atributo
  `data-nota-fixa`, lido em `assets/js/avaliacao-media-final.js`). Gestão: Aulas 01–03 com nota 10.
- `"nota_fixa_turmas": ["<código>"]` no item: a nota fixa vale só para essas turmas (atributo
  `data-nota-fixa-turmas`; o JS usa a turma do aluno logado ou a escolhida pelo professor).
  Gestão: Aulas 01, 02, 03, 06 e 07 com nota 10 só na turma 133933 (AI AIAC 2026/2 V1).
