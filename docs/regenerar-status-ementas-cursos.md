# Regenerar `STATUS-EMENTAS-CURSOS.md` com os números reais

- **Criado em:** 2026-09-23 19:43
- **Concluído em:** 2026-09-23 19:45
- **Tempo decorrido:** ~3 min
- **Status geral:** ✅ Concluído

## Objetivo

Deixar `MATERIAIS/STATUS-EMENTAS-CURSOS.md` com a situação real de todas as ementas de todos os
cursos (exceto `MATERIAS-GERAIS/`), medida direto nos arquivos `EMENTA-CHALKIE-AI.md`.

## Problemas do script atual (`RIO_DO_SUL_MAIS_TECH/scripts/criar-status-cursos.py`)

- Lista fixa com só o curso RIO_DO_SUL e 8 matérias (uma delas já foi removida).
- Lê o tamanho dos `STATUS-EMENTAS.md` de cada matéria, que estão desatualizados, em vez de medir a
  ementa.
- Gera o texto literal `{datetime.now()...}` no histórico.

## Solução

Reescrever o script para:
- varrer todos os cursos em `MATERIAIS/` (exceto `MATERIAS-GERAIS/`) e as pastas de matéria de cada um;
- medir os caracteres de `EMENTA-CHALKIE-AI.md` (faixa 14.800–14.950);
- marcar a ementa genérica (modelo "Reconhecer conceitos") e a matéria sem ementa;
- listar os cursos sem pasta de matéria;
- gerar o resumo por curso, a tabela por matéria e a lista de pendências.

## Passos

| # | Passo | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Reescrever o script | `MATERIAIS/RIO_DO_SUL_MAIS_TECH/scripts/criar-status-cursos.py` | leitura do código | ✅ Concluído |
| 2 | Rodar e gerar o consolidado | `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | números batem com a medição de 2026-09-23 | ✅ Concluído |
| 3 | Commit local | — | hash registrado | ✅ Concluído |

## Resultado final

- Script reescrito: varre os 16 cursos e mede cada `EMENTA-CHALKIE-AI.md`.
- 36 matérias: 5 conformes, 4 fora do tamanho, 10 genéricas, 17 sem ementa; 7 cursos sem pasta de matéria.
