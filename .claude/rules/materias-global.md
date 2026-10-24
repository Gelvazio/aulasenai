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

## Conteúdo da aula é do usuário (2026-10-24, pedido do usuário) — vale para TODAS as matérias

- ⛔ A IA **nunca gera, completa nem reescreve** `CONTEUDO/AULA-NN-*.md`. O conteúdo vem **direto
  dos slides do Chalkie.AI** e é colocado em Markdown **pelo usuário**.
- ✅ Subtarefa de conteúdo de aula = ação do usuário: `Modelo` = `Usuário`, status 👀 Aguardando o
  usuário.
- ✅ **Só depois** que o Markdown da aula existir a IA gera as atividades dela (objetiva, discursiva,
  gabaritos, respostas prováveis, seeds), **com base nesse arquivo**. Sem o arquivo, a atividade
  da aula fica esperando (dependência).
- Ao criar tarefa de matéria nova: a subtarefa de conteúdo de cada aula já nasce como 👀 do usuário.

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

## Cards de aula só da tabela `aulas` (2026-10-17, #272)

- ⛔ A lista de cards de aulas (em toda matéria e toda página que lista aulas: índice de
  atividades, área do aluno, professor) vem **só** da tabela `aulas` do banco: 1 registro = 1
  card, na ordem do banco.
- ⛔ Arquivos HTML, Markdown ou JSON (artigos do índice, `CONTEUDO/`, `materia.json`) nunca
  criam, duplicam, escolhem, deduplicam nem ocultam cards; nada de "escolher" um card pela
  fonte.
- ✅ Arquivos de conteúdo só entram como link ou conteúdo de uma aula já cadastrada, ligados
  pelo id da aula; atividades se ligam ao card pelo `aula_id`.
- ⛔ Banco fora do ar ou com erro: mostrar a mensagem de erro de carregamento; nunca montar a
  lista pelos HTMLs como plano B.
- Aula que não está na tabela `aulas` não aparece; para aparecer, cadastrar no banco.

## Atividades só depois dos Markdown (2026-10-24)

- ✅ Antes de gerar qualquer atividade (objetiva, prática, discursiva, avaliação) de uma aula,
  conferir se o Markdown dela (extração dos slides do Chalkie AI) existe em `CONTEUDO/`.
- ⛔ Sem o Markdown: **aguardar**, não gerar e avisar o usuário qual aula está sem arquivo.
- ❌ PDF, PowerPoint e Google Slides nunca são fonte; só o `.md`.
- ✅ Com o Markdown, as atividades usam esse arquivo como base, junto com a ementa.
- Vale para **todas** as matérias.

## Critério de pronto

✅ Aulas em `CONTEUDO/` · ✅ Atividades no banco · ✅ Apostila (Markdown 100% + HTML) ·
✅ Seeds CONCLUÍDO · ✅ Os 5 status em ✅
