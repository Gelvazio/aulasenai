# 📚 Matérias — Regra Global

**Esta regra substitui a "matéria modelo ITIC".**

## Estrutura de Pasta

```
MATERIAIS/<CURSO>/<MATERIA>/
├── EMENTA-CHALKIE-AI.md     ← Principal
├── materia.json              ← Dados (`apostilas.md`)
├── STATUS_MATERIA.md
├── AULAS/
│   └── CONTEUDO/
│       ├── AULA-01-TITULO.md
│       └── ...
├── ATIVIDADES/
│   └── STATUS-ATIVIDADES.md
├── APOSTILA/
│   ├── APOSTILA-<MATERIA>.md
│   └── HTML
└── DOCUMENTACAO/
```

---

## 1 Aula = 4 Horas

- Um arquivo `AULA-NN-TITULO.md`
- Tema, domínios, capacidades, conteúdos
- Detalhamento, indicadores, situação-problema

---

## Atividades e apostila

- Atividades (objetiva 50 questões, prática 10 × 3 tópicos, avaliação): `atividades-banco.md`
- Apostila e `materia.json`: `apostilas.md`

---

## 5 Status Sempre Existem

1. `STATUS_MATERIA.md`
2. `AULAS/STATUS-AULAS.md`
3. `ATIVIDADES/STATUS-ATIVIDADES.md`
4. `APOSTILA/STATUS-APOSTILA.md`
5. `STATUS-EMENTAS.md`

---

## Critério de Pronto

✅ Aulas em `CONTEUDO/`  
✅ Atividades no banco  
✅ Apostila (Markdown 100% + HTML)  
✅ Seeds CONCLUÍDO  
✅ Todos os status em ✅

---

## Conteúdo — Nunca PDF

**Fonte:**
- `EMENTA-CHALKIE-AI.md` (principal)
- Markdown da matéria

**NUNCA:**
- ❌ Ler de PDF
- ❌ Copiar de outra UC
- ❌ Usar matéria semelhante como base sem pedir ao usuário

---

**Ver também:** `docs/regras/materias.md`
