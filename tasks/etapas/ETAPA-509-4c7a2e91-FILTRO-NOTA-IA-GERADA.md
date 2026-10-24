## Etapa 509-4c7a2e91 — Filtro ON/OFF "Nota IA Gerada" no Progresso da turma (todas as atividades)

**Tarefa:** #360-4c7a2e91-1d5f-4e9a-8c2b-3f7a9d1e5b08 · **Pedido em:** 2026-10-24 19:35 · **Criada por:** Devin (líder · local · main)
**Pedido:** "adicione 1 filtro de nome *Nota IA Gerada* tipo on/off, isso deve ser pra todas as atividades praticas em todas as materias em todos os cursos" (print dos interruptores do painel do professor)

### Escopo (plano — tarefa pequena no padrão dos filtros irmãos)

**Entra**
- Novo arquivo `assets/js/filtro-nota-ia-progresso.js`, no MESMO padrão de `filtro-corrigida-progresso.js`/`filtro-recuperacao-progresso.js`: label `progresso-turma__interruptor` + checkbox + chave + texto; escolha no localStorage via `preferencias` injetadas (chave `nota-ia-gerada`, valores `sim`/`nao`); exporta `window.criarFiltroNotaIa`.
- Regra do filtro (espelhando "Prova Corrigida"): **desligado (padrão)** = só alunos SEM a nota final gerada pela IA; **ligado** = só alunos COM a nota final da IA gerada — a mesma condição que mostra o 🤖: entregue, com respondidos > 0 e `correcao.corrigidos >= respondidos` (`temNotaFinal` de `calcularIndicadoresDoAlunoGlobal`). Aluno sem `correcao` conta como "sem nota IA".
- `assets/js/progresso-turma-global.js`: constante `ARQUIVO_FILTRO_NOTA_IA_PROGRESSO_GLOBAL`, função `prepararFiltroNotaIaGlobal(area, aoMudar)` no padrão das irmãs (try/catch que não derruba o painel), chamada logo após `prepararFiltroCorrigidaGlobal` em `montarPainelProgressoGlobal` (o ON/OFF fica depois do "Prova Corrigida", como no print). Comentário de cabeçalho do arquivo atualizado.
- `docs/regras/atividades.md`: uma linha documentando o filtro novo (mesmo formato das linhas dos filtros existentes).
- Vale para todas as atividades práticas de todas as matérias/cursos automaticamente: o painel global já é o mesmo em toda atividade (o script é carregado sob demanda).

**Não entra**: banco de dados; mudar a lógica das notas; mexer nos outros filtros.

### Subtarefas

- **#360.1 — Filtro ON/OFF "Nota IA Gerada" no Progresso da turma**
  - **Arquivos:** `assets/js/filtro-nota-ia-progresso.js` (novo), `assets/js/progresso-turma-global.js`, `docs/regras/atividades.md`
  - **Critérios:** padrão dos filtros irmãos (mesma classe, preferências, `window.criarFiltroNotaIa`); ligado = nota final da IA gerada, desligado = sem ela; posição depois de "Prova Corrigida"; nomes em português, JSDoc, linhas ≤ 100, funções ≤ 45 linhas; falha ao carregar não derruba o painel.
  - **Nível:** PESADO (Jev, confiança 0,72 — sinal: massa + mais de 3 arquivos)
  - **Entrega:** `assets/js/filtro-nota-ia-progresso.js` (novo, padrão `filtro-corrigida-progresso.js`, preferência `nota-ia-gerada` sim/nao, `window.criarFiltroNotaIa`); `assets/js/progresso-turma-global.js` (constante do arquivo, `prepararFiltroNotaIaGlobal`, chamada após `prepararFiltroCorrigidaGlobal`, cabeçalho); `docs/regras/atividades.md` (linha do filtro). Commit na `main`.
  - **Verificação:** `node --check` dos dois JS ok; linhas ≤ 100 (a única >100 é antiga, fora do diff); filtro entra em `filtrosDaLista` e soma com os demais; desligado = sem nota da IA, ligado = com; falha de carga não derruba o painel. Função real de montagem é `montarProgressoDaTurma` (a etapa citou `montarPainelProgressoGlobal`).

### Registro

| Data | Evento |
|------|--------|
| 2026-10-24 | TASK criada e publicada por Devin (líder); nível PESADO → executor-pesado. |
