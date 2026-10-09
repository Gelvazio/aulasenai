# Progresso global da turma em todas as atividades

**Criado em:** 2026-10-09 10:22:23 (horário de Brasília)
**Concluído em:** — (pendente)
**Tempo decorrido:** — (pendente)
**Status do plano:** ⬜ Aguardando aprovação do usuário

## Objetivo

Dar ao professor, em **toda** atividade (objetiva e discursiva) de **todas** as matérias, o mesmo
painel de **Progresso da turma** que já existe na Prova Prática ADAG (id 82), aparecendo **logo
que a página abre**, sem precisar de campo na fonte `.md`.

## Escopo

- **Entra:**
  - Um gerador único de progresso global (módulo novo em `assets/js/`, com CSS próprio), que
    funciona para atividade objetiva e discursiva.
  - Primeira aplicação: `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html`.
  - Depois: todas as demais atividades das matérias (uma matéria por vez, conferindo cada uma).
  - Regra nova no `CLAUDE.md` (e, se for o caso, em `docs/regras/atividades.md`) + versão, data e
    hora e histórico, com o visualizador de regras conferido.
  - Ajuste do gerador de atividades (`assets/gerador-atividades/`) para que páginas novas já
    nasçam com o progresso.
- **Não entra:**
  - Gráficos (o botão 📈 Gráficos fica só nas discursivas, como hoje).
  - Mudança de regra de bloqueio, de gabarito ou de correção.
  - Gravar qualquer dado novo: o progresso é só leitura.
  - Testes automatizados (regra do projeto).
  - Abrir navegador para validar (regra do projeto; o aceite é do usuário no próprio navegador).
- **Critério de pronto:** o professor logado abre a atividade e vê o painel sem clicar em nada;
  o aluno não vê o painel; a tabela mostra os alunos das turmas dele (RLS); a atualização
  automática funciona; a página de cada matéria é conferida por leitura de código e `node --check`.
- **Premissas e restrições:**
  - Dados: `resposta_atividade` (uma linha por aluno × atividade × item, com a letra),
    `entrega_atividade` (entrega do aluno) e `aluno`/`turmaaluno` (quem está na turma).
    Discursivas usam `resposta_discursiva` e `correcao_discursiva` (já existe painel).
  - Sem `<style>`/`<script>` embutidos e sem `onclick` nos HTML; sem `alert()`.
  - Até 1000 linhas por arquivo e 45 linhas por função (`docs/regras/codigo.md`).
  - Só lê o banco; o RLS (`professor_pode_ver_aluno`) limita aos alunos do professor.

## Partes interessadas

- **Decide e aprova:** Gelvazio Camargo (professor administrador).
- **Usa:** professor (vê o painel) e alunos (não veem o painel).

## Arquivos previstos

| Arquivo | Situação | Papel |
|---|---|---|
| `assets/js/progresso-turma-atividade.js` | novo | gerador global: lê o banco, monta a tabela e atualiza a cada 5 s |
| `assets/css/progresso-turma-atividade.css` | novo | visual (reaproveita as classes de `progresso-turma-discursiva.css`) |
| `assets/js/progresso-turma-discursiva.js` | existente | fica como está; o novo módulo reaproveita a lógica de leitura (a decidir no passo 2) |
| `assets/js/respostas-atividade.js` | existente | ponto de ligação para as objetivas (ver passo 1) |
| `assets/gerador-atividades/*` | existente | passa a incluir o módulo nas páginas novas |
| `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html` | existente | primeira página a receber o painel |
| `CLAUDE.md` (+ `docs/regras/atividades.md`) | existente | regra nova, versão e histórico |
| `STATUS.md` | existente | etapa nova com os itens deste plano |

## Riscos

| Risco | Chance | Impacto | Plano B | Situação |
|---|---|---|---|---|
| Objetiva não tem "entrega": não dá para saber quando o aluno terminou | Média | Médio | Mostrar só "N/50 questões" e a barra; "Entregue" só se existir `entrega_atividade` | Aberto |
| Muitas páginas (uma por aula × matéria) com scripts diferentes | Alta | Médio | Gerador único e script de inserção idempotente, em lote, uma matéria por vez | Aberto |
| Painel duplicado nas discursivas (já existe um) | Alta | Baixo | Passo 2 decide: o módulo novo substitui ou convive com o atual | Aberto |
| Página grande demais por causa do script (limite de 1000 linhas) | Baixa | Baixo | Separar em dois módulos (dados e tela) | Aberto |

## Passos

Um item por vez. Marcar `🔄` ao começar e `✅` ao terminar (com data e hora reais).

| Passo | Ação | Caminho exato | Verificação (sem navegador nem teste automatizado) | Status |
|---|---|---|---|---|
| 1 | Conferir no banco real (leitura) as colunas e as políticas de `resposta_atividade`, `entrega_atividade`, `aluno` e `turmaaluno`; confirmar se a objetiva tem entrega e como são os itens (1 a 50) | banco (`mcp__Supabase__execute_sql`, só leitura) | consultas de leitura; registrar o resultado no próprio plano | ⬜ |
| 2 | Decidir com o usuário: (a) painel novo nas objetivas e discursivas como um módulo só, ou (b) discursivas mantêm o painel atual | este plano | resposta registrada na seção "Decisões" | ⬜ |
| 3 | Criar `assets/js/progresso-turma-atividade.js`: lê as respostas e entregas da atividade (`data-id` ou `data-atividade-id` da página), monta a tabela (uma linha por aluno, uma célula por questão, resumo e barra geral), atualiza a cada 5 s e só roda para o professor | `assets/js/progresso-turma-atividade.js` | `node --check`; nenhum `console` solto; funções até 45 linhas | ⬜ |
| 4 | Criar `assets/css/progresso-turma-atividade.css` (classes do painel atual, até celular) | `assets/css/progresso-turma-atividade.css` | chaves balanceadas; sem largura fixa que quebre no celular | ⬜ |
| 5 | Ligar o módulo à página de atividade objetiva: `<script>` e `<link>` no HTML e, se preciso, um hook no `respostas-atividade.js` | `ATIVIDADES-AULA-01-50-QUESTOES.html` e `assets/js/respostas-atividade.js` | `grep` mostra a ligação; `node --check` do JS alterado | ⬜ |
| 6 | Ajustar o gerador de atividades para incluir o módulo em toda página nova | `assets/gerador-atividades/` | `ast.parse`/sintaxe do gerador; diff só nas linhas de ligação | ⬜ |
| 7 | Regra no `CLAUDE.md` e em `docs/regras/atividades.md`: versão `AAAA-MM-DD HH:MM:SS`, linha no histórico (resumo de 5 e completo em `docs/HISTORICO-REGRAS.md`); conferir o visualizador de regras | `CLAUDE.md`, `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` | visualizador lê o arquivo sem erro (conferência por leitura) | ⬜ |
| 8 | Commit da etapa 1 (só os arquivos do passo, sem fontes com gabarito) e atualizar `STATUS.md` | git (sem `git add .`) | `git diff --cached --name-only` conferido contra a regra "O que nunca é publicado" | ⬜ |
| 9 | Aceite do usuário na página de Testes de Front-End (professor e aluno) | `ATIVIDADES-AULA-01-50-QUESTOES.html` | aceite registrado no `STATUS.md` | ⬜ |
| 10 | Replicar nas demais atividades, uma matéria por vez (mesmo passo 5 em lote, com conferência de cada matéria) | pastas `ATIVIDADES/` de cada matéria | contagem de páginas com o script e `grep` de conferência | ⬜ |

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-09 | Começar por Testes de Front-End, objetiva da aula 01 | Usuário | Pedido explícito |

## Pendências

| Item | Motivo | Quando retomar |
|---|---|---|
| Decisão do passo 2 (painel único ou discursivas à parte) | Depende do usuário | Antes do passo 3 |
| Entrega da objetiva (passo 1) | Pode não existir na objetiva | Durante o passo 1 |
