# 📚 Matérias — Regra Global

Vale para todas as matérias (substituiu a antiga "matéria modelo ITIC"). Detalhes com exemplos:
`docs/regras/materias.md`.

## Estrutura de pasta (com os 5 status)

```
MATERIAIS/<CURSO>/<MATERIA>/
├── EMENTA-CHALKIE-AI.md            ← fonte do conteúdo
├── materia.json                    ← dados da ementa e plano das aulas (`apostilas.md`)
├── STATUS-EMENTAS.md               ← status 1
├── STATUS_MATERIA.md               ← status 2
├── CONTEUDO/
│   └── AULA-NN-DESCRICAO-CURTA.md  ← uma aula por arquivo
├── AULAS/STATUS-AULAS.md           ← status 3
├── ATIVIDADES/STATUS-ATIVIDADES.md ← status 4 (atividades: `atividades-banco.md`)
├── APOSTILA/
│   ├── APOSTILA-<MATERIA>.md + .html
│   └── STATUS-APOSTILA.md          ← status 5
└── DOCUMENTACAO/
```

Os nomes acima são os reais (inclusive `STATUS_MATERIA.md` com sublinhado).

## 1 aula = 4 horas

- 1 aula a cada 4 h da carga horária da ementa (arredondando para cima).
- Arquivo `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md`; as partes da aula estão em
  `docs/regras/materias.md` §3. O plano de cada aula (tema, domínios, capacidades…) fica só no
  `materia.json`.

## Sem slides (2026-10-16, #244.9)

- ⛔ A IA **não gera slides** de aula: nem `AULA-NN-SLIDES.pdf` nem `.pptx`. Vale para **todas as
  aulas** de todas as matérias; o professor gera os slides em outro momento.
- A aula pode citar o link dos slides (`docs/regras/materias.md`), mas o arquivo não é criado
  pela IA.

## Fontes do conteúdo

- ✅ `EMENTA-CHALKIE-AI.md` (principal) e os Markdowns da matéria; ementa da UC no curso vence a
  da matéria.
- ❌ Nunca ler de PDF.
- ❌ Nunca usar conteúdo, bibliografia ou capacidade de outra UC.
- ❌ Nunca usar matéria semelhante como base sem pedir ao usuário. Matéria semelhante é **outra
  linha** da tabela `materia` (não reaproveitar a linha).

## Hierarquia no banco

```
curso → materia → aulas → atividade → resposta
```

## Critério de pronto

✅ Aulas em `CONTEUDO/` · ✅ Atividades no banco · ✅ Apostila (Markdown 100% + HTML) ·
✅ Seeds CONCLUÍDO · ✅ Os 5 status em ✅
