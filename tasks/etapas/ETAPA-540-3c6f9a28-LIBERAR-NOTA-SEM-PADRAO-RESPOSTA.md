# ETAPA 540 — Liberar só a nota e o resultado por tópico (sem o padrão de resposta)

- **TASK:** #393 (pedida em 2026-10-26) · **Nível:** `PESADO` (só Sonnet; banco; pedido direto do usuário)

## Pedido

O aluno deve poder ver só a nota e o resultado por tópico, sem o padrão de resposta. Vale para todas as
atividades de todas as matérias e cursos.

## Decisões

- Vale para as atividades **discursivas/práticas** (todas usam a mesma página/JS: `avaliacao-discursiva.js`).
  Objetivas calculam a nota na hora e não têm "padrão de resposta" textual: ficam fora.
- Modelo: `atividade.nota_liberada` (turmas) ao lado de `gabarito_liberado`. "Liberar gabaritos" continua
  liberando tudo (nota + resultado + padrão); "Liberar notas" libera só nota + resultado (+ as respostas do
  próprio aluno), sem `resposta_esperada` e sem encerrar o preenchimento da turma.

## Itens

| Item | Descrição | Status |
|---|---|---|
| 393.1 | SQL: coluna `nota_liberada`, `liberar_nota_turma`, `aluno_pode_ver_nota`, `solicitar_resultado_discursivo` (aplicado) | ✅ 2026-10-26 |
| 393.2 | Página do aluno: `respostas-discursivas-banco.js`, `avaliacao-discursiva.js`, `resultado-aluno-discursiva.js` (padrão só com gabarito liberado) | ✅ 2026-10-26 |
| 393.3 | Professor: botão "📊 Liberar notas (turma X)" (`liberacao-nota-professor.js`, ligado em `liberacao-respostas-discursiva.js`) | ✅ 2026-10-26 |
| 393.4 | Docs e verificação | ✅ 2026-10-26 |

**Verificação:** `node --check` nos JS alterados; funções criadas no banco (migração aplicada). Não conferido
no navegador: testar com o professor ("Liberar notas") e com um aluno que entregou.
