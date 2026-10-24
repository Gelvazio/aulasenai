# 🗃️ Atividades — Banco, layout global, sem HTML

Detalhes: `docs/regras/atividades.md`.

## ⚠️ Situação: alvo da migração #25 (ainda pendente)

O modelo abaixo foi decidido em 2026-10-11 e é o **alvo** da tarefa #25 (Etapa 143-d30a9c4d),
que ainda não foi feita. **Até a migração terminar, vale o jeito atual** descrito em
`docs/regras/atividades.md` (páginas e fontes por aula). ⛔ Não criar página nova por aula fora do
plano da #25.

## Alvo: questões só no banco

Enunciado, alternativas, gabarito e tópicos ficam **só no banco**. A página busca pelo id da
atividade e monta tudo na hora. Nada de questão em arquivo (`.md`, `.html`, `.json`) nem em
`localStorage`. Onde o gabarito pode estar: `security-banco.md`.

## Alvo: layout global

Uma página por tipo, para todas as matérias, que recebe o **id da atividade** (ex.:
`atividade-objetiva.html` e `atividade-pratica.html`, criadas na #25).

Recursos que toda atividade já tem (não replicar por matéria): progresso da turma, gráficos,
cálculo de nota, mínimo de questões, correção por IA (discursiva), gabarito por turma, PDF SENAI.

## Quadro de progresso: botão "Confirmar Entrega" (2026-10-24, vale para todo gerador)

- ✅ **CONFIRMAR TODA CORREÇÃO DE IA** (2026-10-24, só discursivas): botão só do professor acima da
  coluna Aluno; roda o Confirmar Todas em cada aluno listado (entregues, com nota da IA, sem
  suspeita de cópia pendente), com popup de confirmação antes. Global para todo quadro de progresso
  (`assets/js/confirmar-toda-correcao-ia-progresso.js`).

- ✅ Em **todo** quadro de progresso da turma, ao lado de **Confirmar Todas**, existe o botão
  **Confirmar Entrega**.
- ✅ **Só o professor** o vê (o aluno nunca); a gravação segue protegida por RLS + JWT.
- ✅ Ao clicar, a atividade do aluno é **entregue como está**, mesmo incompleta (questões sem
  resposta ficam em branco), sem exigir o mínimo de questões.
- ✅ Vive no código compartilhado do progresso (`assets/js/progresso-turma-global.js`); os
  geradores de atividade apenas herdam, nunca replicam por matéria.
- ✅ **Visual global (2026-10-24):** os botões da célula do aluno (Quantidade Mínima, Confirmar
  Todas, Confirmar Entrega, Faltou?) são **maiores** (altura ≥ 40px, fonte 14px), **um por linha**
  e com efeito **hover**. Isso vale para todos os quadros, atividades e matérias: só se muda nos
  CSS compartilhados (`progresso-turma-global.css`, `falta-aluno-progresso.css`), nunca por
  página ou matéria.
- ⛔ **Sem "Quantidade Questão Considerar"** na célula do aluno (removido em 2026-10-24: duplicava o
  botão Quantidade Mínima); o mínimo do aluno é definido só por esse botão.
- ✅ Uma **linha horizontal separa um aluno do seguinte** no quadro (2026-10-24, global).

## Painel "Executar correção de IA" no quadro de progresso (2026-10-24, só discursiva)

- ✅ Caixa no topo do quadro, à direita dos filtros: botão **Executar correção de IA agora** (só
  professor), **Atividades entregues** e **Questões corrigidas (X de Y)**. Código:
  `assets/js/correcao-ia-progresso.js`; os geradores só herdam.
- ✅ O botão **não chama IA**: grava um pedido em `pedido_correcao_ia` (RLS, só professor) e o
  Claude Code local roda `/corrigir-ia`. Sem chave de IA no site.
- ✅ Visual: caixa **centralizada**, com ícones e **piscando**; o **id da atividade** vem do HTML da
  página (selo do título, `atividade.pagina`), não do quadro.
- ✅ Cada execução corrige **só** tópicos de atividades **entregues** (`entrega_atividade`) que
  **ainda não têm `nota_ia`**; grava só `nota_ia`/`nota_ia_em`, nunca `nota_professor`.

## Alvo: pasta da matéria só com Markdown

```
MATERIAIS/<CURSO>/<MATERIA>/ATIVIDADES/
└── STATUS-ATIVIDADES.md      (sem HTML; índice gerado por script a partir do banco)
```

## Tamanho padrão (vale já)

| Tipo | Tamanho |
|------|---------|
| Objetiva | 50 questões |
| Prática | 10 questões × 3 tópicos |
| Avaliação | Conforme a ementa |

## Contexto: "Você como aluno consultor" (2026-10-08, vale já)

Vale para **toda atividade** (objetiva, prática, discursiva, avaliação, situação-problema, Excel,
Word…).

- ⛔ **Não criar empresa fictícia** ("a empresa X Ltda.", "a Distribuidora Y"…).
- ✅ O enunciado coloca o aluno como **consultor** que analisa a situação e resolve o problema:
  "Você, como aluno consultor, foi chamado para organizar o controle de estoque de um
  almoxarifado…".
- ✅ O contexto profissional do curso continua (almoxarifado, logística, escritório…), sem nome de
  empresa inventada.

## Prática: sem ver as respostas depois de entregar (2026-10-14, vale já)

Em **toda** atividade prática/discursiva, o aluno que entregou **não vê mais as próprias
respostas** até o professor **liberar o gabarito** (sem campo na fonte). Detalhes:
`docs/regras/atividades.md` ("Regra global das práticas").
