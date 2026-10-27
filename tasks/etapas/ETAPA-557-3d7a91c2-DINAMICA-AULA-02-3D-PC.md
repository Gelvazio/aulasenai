## Etapa 557-3d7a91c2 — #410: Atividade Dinâmica da Aula 02 (UI/UX) feita no PC com three.js

**Tarefa:** #410-3d7a91c2 · **Pedido em:** 2026-10-27 14:27 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "quero esta versão para o PC e ela substitui o papel, e fica no lugar da atividade id=212, use three.js, pra isso e guarde como uma skill a ser chamada quando for fazer atividades dinamicas"
**Objetivo:** o aluno faz o raio-x visual e o redesenho da tela de agendamento no computador, em uma cena three.js dentro de `ATIVIDADE-DINAMICA-AULA-02.html` (atividade `id=212`, que continua bloqueada), e o método vira uma skill reutilizável para as próximas atividades dinâmicas.

### Escopo

- **Entra:**
  - Página `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADE-DINAMICA-AULA-02.html` com a cena three.js no lugar do papel (mesma linha `atividade` id 212, mesmo nome de arquivo).
  - Cena: tela de agendamento "ruim" (botão de confirmar pequeno e cinza, blocos desalinhados) montada em planos 3D; etapa 1 **Raio-x** (marcar retângulo, círculo e triângulo sobre os blocos) e etapa 2 **Redesenho** (mover, redimensionar, trocar cor, preenchimento × contorno e raio de canto, com o botão de ação em destaque); ficha preenchida na própria página.
  - Módulos novos e reutilizáveis em `assets/js/dinamica-3d-*.js` e `assets/css/dinamica-3d.css`; o módulo da Aula 02 só descreve a tela e os alvos.
  - Banco: tabela nova `entrega_dinamica` (uma entrega por aluno e atividade, estado da cena em JSON) com RLS + JWT; o professor lê todas da turma e lança a nota na `nota_dinamica` que já existe.
  - Gerador: `gerar_atividade_dinamica.py` ganha o modo `Modo: digital-3d` no cabeçalho do `.md`, para a página não voltar ao papel quando for regerada; `ATIVIDADE-DINAMICA-AULA-02.md` atualizado (materiais, roteiro e ficha para o PC).
  - Skill `.claude/skills/atividade-dinamica-3d/SKILL.md` com o passo a passo para criar qualquer atividade dinâmica digital em three.js.
  - Atualizar `docs/regras/atividade-dinamica.md` (modo digital).
- **Não entra:** mexer em outras aulas ou matérias; criar a Aula 01 dinâmica; mudar a nota (`nota_dinamica`) ou o bloqueio; desbloquear a atividade 212 (continua `ativo=false`, `bloqueio` vazio); navegador e testes automatizados (regras do projeto).

### Critério de pronto

- `ATIVIDADE-DINAMICA-AULA-02.html` carrega three.js de CDN com versão fixa e monta a cena sem erro de sintaxe (`node --check` nos JS).
- Aluno marca formas, redesenha, preenche a ficha e **entrega**; a entrega fica gravada em `entrega_dinamica` e o aluno não vê entrega de outro (RLS).
- Professor vê as entregas da turma ao lado do lançamento de nota.
- `atividade` id 212 continua a mesma linha e bloqueada.
- Regerar a página pelo gerador mantém a versão 3D.
- Skill criada e listada em `.claude/rules/claude-code.md`.
- Sem arquivo acima de 1000 linhas, função acima de 45, linha acima de 100.

### Riscos

- **Sem navegador:** a cena não pode ser vista por mim; conferência por leitura de código e `node --check`. Plano B: avisar você para abrir e testar a página.
- **three.js por CDN** pode ficar fora do ar: versão fixa e mensagem de erro clara na página.
- **Banco de produção:** tabela nova e RLS; SQL idempotente em `database/`, aplicado só pelo Claude Code local e registrado. Nada é apagado.
- **Celular:** a cena precisa de toque; plano B: ferramentas por botão (não só arrastar).

### Decisões

- 2026-10-27 (usuário): versão para o PC **substitui o papel** e fica no lugar da atividade id 212, usando three.js.
- 2026-10-27 (usuário): guardar o método como **skill** chamada ao criar atividades dinâmicas.
- 2026-10-27 (Sonnet, C52): níveis e modelos das subtarefas não foram escritos pela IA; o Jev classificou (sinais acima). Opus nunca executa neste projeto: `PESADO` fica com Sonnet; `LEVE` com Haiku.
- 2026-10-27 (usuário): "sim, execute o plano da #410" — plano aprovado.

### Aprovação

- ✅ Tarefa grande (banco + estrutura nova): plano aprovado pelo usuário em 2026-10-27 ("sim, execute o plano da #410").

---

### #410.1 — Tabela `entrega_dinamica` com RLS + JWT (SQL idempotente)

**Próximo passo:** (entregue) —  escrever `database/` o SQL (tabela, índice único por atividade + usuário, RLS: aluno lê e grava a própria; professor lê as da turma) e aplicar.

- **Nível:** PESADO — Jev (banco 0,99, segredo 0,95; confiança 1,00)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** colunas `id`, `atividade_id`, `usuario_id`, `estado` (jsonb), `entregue` (boolean), `entregue_em`, `atualizado_em`. Sem gabarito.
- **Critérios de Aceitação:** `CREATE TABLE IF NOT EXISTS`, RLS ligado, políticas com `DROP POLICY IF EXISTS`; consulta confirma a tabela; registro em `docs/database.md`.
- **Entrega:** `database/2026-10-27-entrega-dinamica.sql`, aplicado no Supabase em 2026-10-27 · **Verificação:** consulta ao banco: RLS ligado, políticas select/insert/update, grants só para `authenticated`, 1 gatilho; `atividade` 212 intacta.

### #410.2 — Módulos base three.js (cena, câmera, ferramentas de marcar e editar)

**Próximo passo:** (entregue) — criar `assets/js/dinamica-3d-cena.js`, `dinamica-3d-ferramentas.js` e `assets/css/dinamica-3d.css`.

- **Nível:** MEDIO — Jev (código com lógica; confiança 0,35, vale a matriz)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** cena ortográfica sobre a "tela", seleção por raycaster, ferramentas retângulo/círculo/triângulo, mover, redimensionar, cor, preenchimento × contorno, raio de canto; operação por mouse **e** botões (toque).
- **Critérios de Aceitação:** `node --check` ok; módulos sem dados da aula; funções ≤ 45 linhas; JSDoc.
- **Entrega:** `assets/js/dinamica-3d-{formas,estado,cena,ferramentas,painel,interface,controle}.js` e `assets/css/dinamica-3d.css` (API: `iniciarDinamica3d(config)`) · **Verificação:** `node --check` ok nos 7 JS; nenhuma linha > 100 colunas nem função > 45 linhas (conferido por script); só a página real confirma a aparência (sem navegador).

### #410.3 — Módulo da Aula 02: tela de agendamento "ruim" e alvos do raio-x

**Próximo passo:** (entregue) — criar `assets/js/dinamica-3d-aula-02.js` descrevendo os blocos (topo, formulário, botão Confirmar 20×20 cinza, rodapé).

- **Nível:** MEDIO — Jev (código com lógica; confiança 0,66)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** dados da tela e dos alvos, sem empresa fictícia (aluno consultor); checklist do aluno consultor ao final.
- **Critérios de Aceitação:** só dados; usa os módulos da .2; `node --check` ok.
- **Entrega:** `assets/js/dinamica-3d-aula-02.js` (tela de agendamento com 11 elementos, ficha de 4 campos, checklist de 3 itens e instruções das 3 etapas) · **Verificação:** `node --check` ok; linhas ≤ 100 colunas; sem gabarito nos dados; sem empresa fictícia (aluno consultor).

### #410.4 — Repositório da entrega e painel do professor

**Próximo passo:** (entregue) — criar `assets/js/entrega-dinamica-repositorio.js` (salvar rascunho, entregar, ler) e a lista de entregas no `nota-dinamica-professor.js`.

- **Nível:** PESADO — Jev (JWT/segredo 0,95; confiança 0,94)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** JWT do usuário logado em toda chamada; aluno entrega uma vez; professor vê a ficha e a captura da cena de cada aluno.
- **Critérios de Aceitação:** sem `service_role`; `node --check` ok; depende da .1.
- **Entrega:** `assets/js/entrega-dinamica-repositorio.js`, `assets/js/dinamica-3d-pagina.js`, `assets/js/entrega-dinamica-professor.js` (feito por agente executor-medio, conferido pelo líder), registro de dados por aula no `dinamica-3d-controle.js`, CSS da lista de entregas · **Verificação:** `node --check` ok em todos; linhas ≤ 100 colunas e funções ≤ 45 linhas (script); JWT do usuário em toda chamada (sbH), sem `service_role`; aluno entrega uma vez (RLS bloqueia update após entregar).

### #410.5 — Gerador: modo `digital-3d`, `.md` e página da Aula 02

**Próximo passo:** (entregue) — ler `leitor_dinamica.py`/`gerar_atividade_dinamica.py` e acrescentar o modo; atualizar o `.md`; regerar o HTML.

- **Nível:** PESADO — Jev (mais de 3 arquivos 0,65; confiança 0,92)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `Modo: digital-3d` gera a página com o contêiner da cena, CDN do three.js (versão fixa) e os scripts da .2, .3 e .4; padrão (sem o campo) continua em papel.
- **Critérios de Aceitação:** `py_compile` ok; página regerada traz a cena; nota e bloqueio inalterados.
- **Entrega:** `assets/gerador-atividade-dinamica/gerar_atividade_dinamica.py` (Modo: digital-3d escolhe o template), `template_atividade_dinamica_3d.html` novo, `ATIVIDADES/CONTEUDO/ATIVIDADE-DINAMICA-AULA-02.md` (Modo: digital-3d; papel trocado pelo computador) e `ATIVIDADE-DINAMICA-AULA-02.html` regerado · **Verificação:** `py_compile` ok; página regerada traz `#dinamica-3d`, three.js r128 por CDN com versão fixa, scripts na ordem certa e a seção `#dinamica-entregas`; seed gerado idêntico ao existente (descartado, atividade id 212 intacta); cena só confirmável pelo usuário na tela.

### #410.6 — Skill `atividade-dinamica-3d`

**Próximo passo:** (entregue) — criar `.claude/skills/atividade-dinamica-3d/SKILL.md` e listar em `.claude/rules/claude-code.md`.

- **Nível:** LEVE — Jev (só .md; confiança 0,89)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** quando usar, formato do `.md` com `Modo: digital-3d`, como escrever o módulo da aula, banco, ordem de entrega, o que nunca fazer (gabarito, navegador, testes).
- **Critérios de Aceitação:** frontmatter `name`/`description`; ≤ 5 KB de regra; aponta para o gerador e os módulos.
- **Entrega:** `.claude/skills/atividade-dinamica-3d/SKILL.md` (4512 bytes) e linha em `.claude/rules/claude-code.md` (feito por agente executor-leve, revisado pelo líder) · **Verificação:** Frontmatter name/description presente; caminhos citados conferidos com os arquivos reais; ≤ 5 KB; listada em claude-code.md.

### #410.7 — Documentação da regra

**Próximo passo:** (entregue) — atualizar `docs/regras/atividade-dinamica.md` e `docs/database.md`.

- **Nível:** PESADO — Jev (banco 0,50 (docs/database.md); confiança 0,62, sobe o nível)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** modo digital, tabela `entrega_dinamica`, onde ficam os módulos.
- **Critérios de Aceitação:** leitura confere com o que foi feito.
- **Entrega:** `docs/regras/atividade-dinamica.md` (seção do modo digital-3d) e `docs/database.md` (seção `entrega_dinamica`) · **Verificação:** Leitura confere com o SQL aplicado e com os arquivos criados.

### #410.8 — Conferência final

**Próximo passo:** (entregue) — `node --check` e `py_compile`; consulta ao banco (tabela, RLS, atividade 212 bloqueada); limites de tamanho.

- **Nível:** PESADO — Jev (banco 0,81; confiança 1,00)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** conferir tudo sem navegador e avisar o usuário o que só a tela confirma.
- **Critérios de Aceitação:** todas as subtarefas ✅; mãe fecha.
- **Entrega:** Conferência final sem alterar arquivos · **Verificação:** `node --check` ok em todos os 14 JS (dinamica-3d-*, entrega-dinamica-*); nenhuma linha > 100 colunas nem função > 45 linhas; `py_compile` ok no gerador; módulos carregados em sandbox node sem erro e sem função duplicada ou indefinida; banco: `entrega_dinamica` com RLS e 0 linhas, atividade 212 mesma linha (id e página) com o bloqueio por turmas que já tinha; a cena em si só o usuário confirma na tela (sem navegador).
