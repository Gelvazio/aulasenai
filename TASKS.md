# 📋 TAREFAS — SENAI Aulas

**Somente tarefas PENDENTES** (planejadas ou em progresso).
Ao concluir ou cancelar uma tarefa, **mover o bloco dela para `TASKS_COMPLETE.md`** (na mesma
tarefa, no mesmo commit).

---

## ⏳ TAREFAS PENDENTES

### #2: Organizar Apostilas em Formato Markdown (.md)

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟠 Alta  
**Data de Início Estimada:** 2026-09-22

Garantir que todas as apostilas estão em formato **Markdown (.md) apenas** — sem PDF/DOCX no momento. Consolidar arquivos redundantes e manter estrutura limpa.

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

**Última atualização:** 2026-10-08 (tarefas concluídas e canceladas movidas para `TASKS_COMPLETE.md`)
