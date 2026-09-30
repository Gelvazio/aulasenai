# Conciliar "Testes de Sistemas-EXISTENTES" dentro de "TESTES DE FRONTEND"

**Criado em:** 2026-09-27 16:40 · **Concluído em:** 2026-09-27 16:50 · **Tempo decorrido:** ~10 min
**Curso:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/` (STATUS-PERMISSAO-EMENTA = VERIFICAR)

## Objetivo

Levar para `TESTES DE FRONTEND/` tudo o que tem valor em `Testes de Sistemas-EXISTENTES/` e
remover a pasta de origem, que não é uma UC do curso.

## O que foi lido

| Origem | Conteúdo | Destino |
|---|---|---|
| `SA e PLANO DE AULA_TESTE DE SISTEMAS...docx` | Plano de ensino + SA da UC Teste de Sistemas (Téc. Desenv. Sistemas, 60h) | `REFERENCIA-TESTES-DE-SISTEMAS/PLANO-DE-ENSINO/` |
| `1. CT Desenvolvimento de Sistemas_Aula Presencial...docx` | Roteiro de aula presencial (validado 09/2025) | `REFERENCIA-TESTES-DE-SISTEMAS/PLANO-DE-ENSINO/` |
| `Material Apoio.../Plano com SA Testes de sofwtare.pdf`, `SA TESI.pdf` | Plano e SA em PDF | `REFERENCIA-TESTES-DE-SISTEMAS/PLANO-DE-ENSINO/` |
| `2. Exame final [ALUNO]`, `3. Exame final [GABARITO]` | Exame final 10 questões + gabarito | `REFERENCIA-TESTES-DE-SISTEMAS/AVALIACOES/` |
| `Instrumentos de Avaliação.../` (6 .docx) | Avaliações objetivas/práticas C8, TESI, autoavaliação | `REFERENCIA-TESTES-DE-SISTEMAS/AVALIACOES/` |
| `Material Apoio.../` (11 .docx + 1 .xlsx) | Atividades (Caça aos bugs, Tribunal de bug, Erro invisível, Workshop causa raiz…), modelo de falhas, cronograma de testes | `REFERENCIA-TESTES-DE-SISTEMAS/MATERIAL-DE-APOIO/` |
| `EMENTA-CHALKIE-AI.md` | Ementa **genérica** (modelo, "Testes de Sistemas 35h") | ❌ descartar — não é a UC do curso |
| `ATIVIDADES/index.html`, `DOCUMENTACAO/INDEX.md` | Índices vazios gerados automaticamente | ❌ descartar (duplicados) |

**Por que uma subpasta de referência:** o material é da UC *Testes de Sistemas* do curso Técnico
em Desenvolvimento de Sistemas (60h), não da UC *Testes de Front-End* (40h) deste curso. Fica
como material de apoio, sem se misturar com aulas/atividades da UC. Nada é convertido nem
alterado — só movido.

## Passos

| # | Ação | Arquivos | Verificação | Estado |
|---|---|---|---|---|
| 1 | Criar `TESTES DE FRONTEND/REFERENCIA-TESTES-DE-SISTEMAS/` com `PLANO-DE-ENSINO/`, `AVALIACOES/`, `MATERIAL-DE-APOIO/` e um `LEIA-ME.md` explicando a origem | pasta nova | `ls` | ✅ Concluído |
| 2 | Mover os 23 arquivos (.docx/.pdf/.xlsx) conforme tabela acima | origem → destino | contar arquivos: 23 (+ LEIA-ME) | ✅ Concluído |
| 3 | Apagar a ementa genérica e os índices vazios da origem e remover `Testes de Sistemas-EXISTENTES/` | 3 arquivos + pasta | pasta não existe | ✅ Concluído |
| 4 | Regenerar índices (`gerar_indices.py`) e `STATUS-EMENTAS-CURSOS.md` | `index.html` do curso, status | curso lista 1 matéria de testes | ✅ Concluído |
| 5 | Commit local | — | `git log -1` | ✅ Concluído |

## Fora do escopo (avisar o usuário)

- `TESTES DE FRONTEND/EMENTA-CHALKIE-AI.md` também é **genérica** (título "Técnico em Informática
  — Internet", 45h; a UC é Testes de Front-End, 40h). Corrigir é outra tarefa.
- `EMENTA-TESTES-FRONT-END.md` está duplicado (raiz e `ESTRUTURACAO-PLANO-ENSINO/`, idênticos).
- Nome da pasta fora do padrão (`TESTES DE FRONTEND` → `TESTES-DE-FRONT-END`): só a pedido.

## Riscos

- Arquivos binários só são movidos; nenhum conteúdo é perdido. Ementa descartada é modelo genérico.

## Resultado

- 23 arquivos movidos (4 plano, 8 avaliações, 11 apoio) + `LEIA-ME.md`; nenhum alterado.
- `Testes de Sistemas-EXISTENTES/` removida (ementa genérica e 2 índices vazios descartados).
- Índices regravados e `STATUS-EMENTAS-CURSOS.md` regenerado: o curso tem 1 matéria (TESTES DE FRONTEND, ementa ⚠️ genérica).
