# Liberar gabaritos por atividade e turma (botão do professor)

- **Criado em:** 2026-10-06 14:55
- **Concluído em:** 2026-10-06 (aguardando o teste do usuário)
- **Tempo decorrido:** —
- **Status:** ✅ Implementado e SQL aplicado (aprovado em 2026-10-06: bloquear recuperação após liberar e aplicar o SQL)

## Atualização 2026-10-15 (tarefa #175, etapa 302-cfc044e9)

Pedido do usuário: "tem aluno que não fez a atividade, bloqueie o preenchimento de todos (...) e
libere o botão Liberar gabaritos". Aprovado em 2026-10-15 14:28 para **todas as atividades**:

- o botão fica **sempre ativo**; com alunos sem entrega, aviso e confirmação dizem "Faltam N
  aluno(s) entregar: eles não poderão mais responder";
- `liberar_gabarito_turma` deixa de recusar quando faltam alunos;
- depois da liberação, `item_valido`/`topico_valido` recusam resposta do aluno da turma
  liberada (função `preenchimento_encerrado_para_usuario`): o preenchimento fica encerrado, mas
  a atividade continua visível (nota e gabarito de quem entregou); "Recolher gabarito" reabre.

SQL: `database/2026-10-15-liberar-gabarito-encerra-preenchimento.sql`. A regra "só com todos entregues" abaixo vale até 2026-10-15.

## Objetivo

O aluno **não vê** o gabarito nem o botão "🔑 Exportar Gabarito" até o professor liberar. O
professor libera com o botão **"🔓 Liberar gabaritos"**, **por atividade e por turma**, e **só
quando todos os alunos da turma já entregaram** a atividade. Depois de liberado, o aluno da turma
vê o **gabarito real** (alternativas certas).

Decisões do usuário (2026-10-06): o aluno vê o gabarito real; a liberação vale para atividade +
turma; o botão só funciona com todos os alunos da turma com entrega.

⚠️ **Muda a regra "GABARITO COM AS RESPOSTAS CERTAS: SÓ O PROFESSOR"** do `CLAUDE.md`: ela
passa a ter a exceção "depois da liberação pelo professor, para a turma liberada".

## Escopo

- **Entra:**
  - banco: coluna `atividade.gabarito_liberado` (lista JSON dos códigos das turmas liberadas,
    padrão `[]`), função `liberar_gabarito_turma(p_atividade, p_turma, p_liberar)` e função
    `gabarito_liberado(p_atividade)` (aluno lê o gabarito só se liberado para a turma dele);
  - página da atividade (aluno): botão "🔑 Exportar Gabarito" **escondido** até a liberação;
    liberado, exporta o gabarito real (PDF);
  - página da atividade (professor): botão "🔓 Liberar gabaritos (turma X)" no quadro
    "Respostas dos alunos nesta atividade", na turma da aba escolhida; desativado com o aviso
    "Faltam N alunos entregar" enquanto houver aluno sem entrega; depois de liberar, vira
    "🔒 Recolher gabarito (turma X)" (desfaz);
  - `CLAUDE.md` (regra do gabarito + versão), `docs/database.md` +
    `docs/relatorio_verificacao_database.html`, `STATUS.md`.
- **Não entra:** a tabela `gabarito` continua só do professor (RLS sem mudança); avaliações
  discursivas (padrão de resposta) ficam como estão; botões de Word (removidos).
- **Critério de pronto:** aluno sem liberação não vê o botão nem consegue ler o gabarito pela API;
  professor só libera com todos os alunos da turma com entrega; aluno da turma liberada exporta o
  gabarito real; aluno de outra turma continua sem acesso.
- **Premissas e restrições:** sem navegador (o usuário testa); SQL idempotente, sem apagar dados;
  aplicar no Supabase só com pedido do usuário.

## Tecnologias e arquivos previstos

| Arquivo | Ação |
|---|---|
| `database/2026-10-06-liberacao-respostas-turma.sql` | Novo: coluna, 2 funções, grants |
| `assets/js/liberacao-respostas-professor.js` + `assets/css/liberacao-respostas-professor.css` | Novo: botão do professor (o `respostas-atividade-professor.js` já tem 920 linhas) |
| `assets/js/respostas-atividade-professor.js` | Avisar a turma da aba escolhida (evento) e carregar o módulo novo |
| `assets/js/avaliacao-pdf-professor.js` | Aluno: botão só se liberado; exporta o gabarito real via `gabarito_liberado` |
| `CLAUDE.md`, `docs/database.md`, `docs/relatorio_verificacao_database.html`, `STATUS.md` | Regras e documentação |

## Regras no banco (resumo do SQL)

- `liberar_gabarito_turma(p_atividade bigint, p_turma text, p_liberar boolean)` —
  `security definer`; exige `professor_tem_turma(p_turma)` (administrador em todas). Para
  **liberar**, conta os alunos da turma (`turmaaluno`) sem nenhuma `entrega_atividade` da
  atividade; se houver algum, recusa com "Faltam N alunos entregar". Para **recolher**, sem
  condição. Grava/retira o código em `atividade.gabarito_liberado`.
- `gabarito_liberado(p_atividade bigint)` — `security definer`; devolve `item, titulo, letra` só
  se o usuário logado for aluno de uma turma presente em `gabarito_liberado` **e** tiver entrega
  da atividade; senão devolve vazio. Professor continua lendo pela tabela `gabarito`.
- `revoke` de `anon`; `grant execute` só para `authenticated`.

## Riscos

| Risco | Chance | Impacto | Plano B |
|---|---|---|---|
| Recuperação liberada depois do gabarito (aluno já viu as respostas) | Média | Alto | `liberar_nova_tentativa` recusa se o gabarito já foi liberado para a turma do aluno (**proposta — confirmar**) |
| Aluno de outra turma ler o gabarito | Baixa | Alto | Função confere a turma pela `turmaaluno` + entrega; tabela `gabarito` sem mudança |
| Aluno sem turma nunca recebe | Baixa | Baixo | Vincular o aluno em `alunos.html` |
| `respostas-atividade-professor.js` passar de 1000 linhas | Média | Baixo | Lógica nova em módulo próprio |

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Conferir no banco real `atividade`, `entrega_atividade`, `turmaaluno`, `professor_tem_turma`, `liberar_nova_tentativa` | — (leitura) | Consultas de leitura | ✅ Concluído |
| 2 | Escrever o SQL idempotente | `database/2026-10-06-liberacao-respostas-turma.sql` | Leitura do SQL | ✅ Concluído |
| 3 | Aplicar no Supabase (só com pedido do usuário) e conferir | — | Consultas de leitura | ✅ Concluído |
| 4 | Botão do professor no quadro de respostas | `assets/js/liberacao-respostas-professor.js`, `assets/css/liberacao-respostas-professor.css`, `assets/js/respostas-atividade-professor.js` | `node --check` | ✅ Concluído |
| 5 | Aluno: botão escondido até liberar; exporta o gabarito real | `assets/js/avaliacao-pdf-professor.js` | `node --check` | ✅ Concluído |
| 6 | Regras e documentação | `CLAUDE.md`, `docs/database.md`, `docs/relatorio_verificacao_database.html` | Leitura | ✅ Concluído |
| 7 | Commit local | — | `git log -1` | ✅ Concluído |
| 8 | Aceite do usuário (teste no navegador como professor e aluno) | — | — | ⬜ Pendente |

## Resultado final

- SQL aplicado no Supabase (migrações `liberar_gabarito_turma` e
  `alunos_sem_entrega_turma_so_professor`) e conferido: coluna, tabela `tentativaacessogabarito`
  com RLS, funções sem acesso de `anon`, trigger ativo; contagem de pendentes conferida.
- **Mudanças pedidas durante a execução (2026-10-06):**
  - o aluno que clica antes da liberação vê "Aguarde professor liberar os gabaritos" e o pedido é
    gravado em `tentativaacessogabarito` (`id`, `atividade_id`, `aluno_id`, `data_hora`), pela
    função `solicitar_gabarito` (substitui a `gabarito_liberado` do plano);
  - vale também para as **atividades** (não só avaliações): o `atividade.js` acrescenta o botão
    "Exportar Gabarito" em toda página com folha de respostas no banco;
  - arquivos renomeados sem "gabarito" no nome (o `.gitignore` e o `.vercelignore` bloqueiam esse
    nome): `liberacao-respostas-professor.js/.css`, este plano e o SQL.
- **Discursivas incluídas (2026-10-06, pedido do usuário):** função `solicitar_gabarito_discursivo`
  (SQL `database/2026-10-06-liberacao-respostas-discursiva.sql`, aplicado), módulo
  `assets/js/liberacao-respostas-discursiva.js` (+ css) carregado pelo `avaliacao-discursiva.js`:
  professor escolhe a turma e libera no painel; aluno usa "🔑 Ver Gabarito" e vê a resposta
  esperada abaixo de cada tópico depois da liberação.
- Teste no navegador: com o usuário (professor e aluno).
