# 📋 TAREFAS — SENAI Aulas

**Somente tarefas PENDENTES** (planejadas ou em progresso).
**O status oficial de cada tarefa fica no [STATUS.md](STATUS.md)** (seção "📌 Tarefas do `TASKS.md`"); aqui fica só a descrição longa. Em conflito, o `STATUS.md` vence.
Ao concluir ou cancelar uma tarefa, **mover o bloco dela para `TASKS_COMPLETE.md`** (na mesma
tarefa, no mesmo commit).

---

## ⏳ TAREFAS PENDENTES

### #2: Organizar Apostilas em Formato Markdown (.md)

**Status:** 🔄 PLANO AGUARDANDO APROVAÇÃO (2026-10-08)  
**Prioridade:** 🟠 Alta  
**Data de Início Estimada:** 2026-09-22

Garantir que todas as apostilas estão em formato **Markdown (.md) apenas** — sem PDF/DOCX no momento. Consolidar arquivos redundantes e manter estrutura limpa.

- ✅ Levantamento e plano: `docs/tarefa-02-apostilas-em-markdown.md` (nenhuma apostila em
  PDF/DOCX no Git; 4 matérias já no padrão; 5 itens fora do padrão para decidir).
- [ ] Aprovação do usuário (itens A–E e pergunta sobre Comunicação Oral e Escrita).
- [ ] Executar os passos do plano.
- [ ] Na máquina local: conferir PDF/DOCX de apostila fora do Git.

---

### #4: Preencher PLANO-AULAS.md em 8 Disciplinas

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟠 Alta

Criar cronograma semanal/aula para cada disciplina.

---

### #5: Organizar Atividades em ATIVIDADES/

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟡 Média

Estruturar exercícios práticos por tópico/módulo em cada disciplina.

---

### #6: Preencher AVALIACOES/

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟡 Média

Adicionar provas, testes e trabalhos avaliativos em cada disciplina.

---

### #7: Executar Análise Final

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟢 Baixa

Rodar `python analise-materias.py` para validar completude e gerar relatório final.

---

### #11: Conferir localmente a duração dos vídeos da apostila de Reforço de Linguagens

**Status:** ⏳ PENDENTE (fazer no ambiente **local**, onde o YouTube funciona)  
**Prioridade:** 🟠 Alta  
**Adicionada em:** 2026-10-08

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/APOSTILA/` tem **29 vídeos** (2 a 3
por capítulo) com a duração `a conferir`: na nuvem o YouTube estava bloqueado e a duração não pôde
ser lida. Cada seção "Vídeos" tem a anotação "⏳ CONFERIR LOCALMENTE (TASKS.md #11)".

- [ ] Para cada vídeo de `APOSTILA/CONTEUDO/CAPITULO-01.md` a `CAPITULO-10.md`, ler a duração
  pelos metadados (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador.
- [ ] Até 15:00 → trocar `a conferir` por `mm:ss` (e completar o canal, se faltar); acima de
  15:00 ou vídeo indisponível → apagar a linha (e, se o capítulo ficar sem vídeo, buscar outro).
- [ ] Remover a anotação "⏳ CONFERIR LOCALMENTE" dos capítulos e do Markdown completo.
- [ ] Aumentar `versao_apostila` no `materia.json` (1.0 → 1.1), rodar
  `gerar_apostila.py <pasta> --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar `APOSTILA/STATUS-APOSTILA.md` (coluna Vídeos) e o `STATUS.md` (item 67.4).
- [ ] Commit (no local, o push é do usuário).

---

### #12: Conferir localmente a duração dos vídeos da apostila de Fundamentos da Tecnologia

**Status:** ⏳ PENDENTE (fazer na máquina local, com acesso ao YouTube)  
**Prioridade:** 🟡 Média  
**Adicionada em:** 2026-10-08

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/APOSTILA/`
foi gerada **sem vídeos** (cada capítulo tem só a anotação "⏳ Vídeos pendentes"): o ambiente de nuvem bloqueia `www.youtube.com` e a duração não pôde ser
conferida nos metadados (regra "REGRAS APOSTILAS": nada de duração inventada; máximo 15:00).

- [ ] Para cada capítulo (01 a 09), escolher de 1 a 4 vídeos em português, de canais educacionais.
- [ ] Conferir **localmente** título, canal e duração (`curl` na página do vídeo: `lengthSeconds`,
      `ownerChannelName`), descartando os de mais de 15:00.
- [ ] Em `APOSTILA/CONTEUDO/CAPITULO-NN.md`, trocar a linha "⏳ Vídeos pendentes" da seção
      `## Vídeos` pelos vídeos no formato `- [título exato](url) — mm:ss — canal`.
- [ ] Aumentar `versao_apostila` no `materia.json`, rodar `gerar_apostila.py <pasta da matéria>
      --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar a coluna "Vídeos" do `APOSTILA/STATUS-APOSTILA.md`.
- 📌 Candidatos já levantados para o capítulo 01 (duração a conferir): SNABaP2iORg (História e
  evolução dos computadores), yMGm7cPCh6o (Evolução dos Computadores — Linha do Tempo),
  fYJl-7jRzuw (Manual do Mundo — Por onde vem a internet?), XHFfXJglFhY (Entenda... Cidadania Digital).

---

### #14: Conferir localmente a duração dos vídeos da apostila de Exploração de Carreiras

**Status:** ⏳ PENDENTE (fazer na máquina local, com acesso ao YouTube)  
**Prioridade:** 🟡 Média  
**Adicionada em:** 2026-10-08 _(registrada na branch de origem como #11)_

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/APOSTILA/` (9 capítulos) tem **28 vídeos com a duração `a conferir`**: a sessão em
nuvem não acessa o YouTube e o usuário pediu para seguir e conferir depois, localmente.

- [ ] Conferir cada vídeo da lista `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/APOSTILA/RASCUNHOS/VIDEOS-A-CONFERIR.md` pelos metadados
      (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador.
- [ ] Nos `APOSTILA/CONTEUDO/CAPITULO-NN.md`, trocar `a conferir` pela duração (`mm:ss`) e
      acrescentar ` — <canal>` no fim da linha.
- [ ] Apagar os vídeos com mais de 15:00 ou fora do tema (cada capítulo precisa de ao menos 1).
- [ ] Aumentar `versao_apostila` no `materia.json` (1.0 → 1.1), rodar `gerar_apostila.py <pasta>
      --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar `APOSTILA/STATUS-APOSTILA.md`.

---

### #15: Apostila de ITIC versão 2 (até 40 páginas) — pedida em 2026-10-08 08:36:51

Plano: `docs/apostila-itic-v2-40-paginas.md` · Status: `STATUS.md`, Etapa 79.
Nova edição reduzida da apostila de Introdução à TIC (`APOSTILA-INTRODUCAO-TIC-V2.md` e `.html`,
versão 2.0), **sem vídeos e sem exercícios** (o usuário fará à parte), sem alterar a V1. Junto:
rodapé "Página N de T" e PDF sem a faixa azul da esquerda em todas as apostilas.

- [x] Gerar V2 (28 páginas, conferência 100%).
- [ ] Aceite do usuário.

---

### #16: Bloqueio da AULA (card inteiro) × bloqueio da ATIVIDADE em todos os índices — pedida em 2026-10-09 01:00

**Status:** ⏳ PENDENTE — fazer em **outra sessão** (decisão do usuário, 2026-10-09 01:02)
**Prioridade:** 🟠 Alta
**Regra:** `CLAUDE.md`, seção "⏳ REGRA PENDENTE — BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE".
**STATUS:** `STATUS.md`, Etapa 113, item 113.6. Vale para **todas as atividades de todas as matérias**.

O que fazer (tarefa pequena: só JS/CSS, sem mudar o banco — a coluna `aulas.ativo` já existe e o
RLS da `aulas` já deixa o professor alterá-la):

- [ ] **O ON/OFF de cada atividade NUNCA bloqueia o card inteiro** (os alunos sempre veem a aula,
  os slides e as outras atividades): em `assets/js/indice-atividades-bloqueio.js`, tirar o
  bloqueio do card quando todas as atividades estão OFF (aluno: só 🔒 no link de cada atividade
  bloqueada; professor: sem escurecer o card) — remover `bloquearCardAtividade`,
  `desativarLinkBloqueado` e a classe `bloqueada-professor` desse script.
- [ ] **Botão de bloqueio da AULA**, embaixo no card, **logo antes de "✏️ Editar aula"** (só
  professor): ON/OFF "Aula liberada / Aula bloqueada", gravando em **`aulas.ativo`** (false =
  bloqueada) com `gravarAulaCard` (`assets/js/indice-aula-repositorio.js`). **Só este botão bloqueia
  o card inteiro:** aluno vê o card escurecido com cadeado, links desativados e "Aula Bloqueada!"
  ao clicar (classe `bloqueada`, CSS já existe em `indice-atividades.css`); professor vê o card
  escurecido, mas os links continuam abrindo.
- [ ] Código sugerido: módulo novo `assets/js/indice-aula-bloqueio.js` (`aplicarBloqueioAulaNoCard`,
  `criarBotaoBloqueioAula`), chamado por `assets/js/indice-aula-data.js` em `desenharCardAula` e
  antes de `adicionarBotaoEditarAula`; carregar o módulo em `carregarDataAulasIndice`
  (`assets/js/atividades-crud-modal.js`) antes do `indice-aula-data.js`. ⚠️ Usar nomes de
  constantes exclusivos (constante global repetida derruba o script inteiro — lição da Etapa 113).
  O "Ativa" do modal "Editar aula" é a mesma coluna: ao gravar no modal, atualizar o botão.
- [ ] Estilo em `assets/css/indice-atividades-bloquear.css` (mesmo visual do ON/OFF das atividades,
  com o texto ao lado).
- [ ] Atualizar `docs/regras/atividades.md`, tirar o "PENDENTE" da seção do `CLAUDE.md` (nova
  versão + histórico), commit e aceite do usuário (professor e aluno).

---

**Última atualização:** 2026-10-08 (tarefa #15 adicionada)
