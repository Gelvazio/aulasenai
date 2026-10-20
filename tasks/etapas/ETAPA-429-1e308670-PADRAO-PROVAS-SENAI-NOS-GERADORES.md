## Etapa 429-1e308670 — #300: padrão de provas SENAI nos geradores globais e situação de aprendizagem em toda aula

**Tarefa:** #300-1e308670-9b51-451c-9f3d-19bc7c51c879 · **Pedido em:** 2026-10-20 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie 1 task com o maximo de subtasks possivel, para ler esta pasta `MATERIAL-PADRAO-PROVAS-SENAI`, analisar estas regras e aplicar nos geradores globais de atividades, provas objetivas e discursivas, e atividade objetiva e discursiva. Adicione tambem 1 regra, que cada aula tenha pelo menos 1 situacao de aprendizagem, com base neste modelo. Esta regra deve valer pra todas as materias de todos os cursos e deve funcionar de forma global no gerador de atividades."
**Objetivo:** que os geradores globais de atividades e provas sigam o modelo SENAI da pasta `MATERIAL-PADRAO-PROVAS-SENAI`, e que toda aula de toda matéria tenha pelo menos uma situação de aprendizagem.

> **Aprovação:** o pedido não aprova o plano. Esta tarefa é só **publicada**. Nenhuma subtarefa foi reservada.
> **Premissa (não confirmada):** "situação de aprendizagem" = o bloco do modelo SENAI de contextualização e desafio, com texto-base, desafio e entregas (ver `Avaliacao-Pratica-Modelo-Padrao.docx`). Se o usuário quiser outro sentido, a etapa muda antes do "sim".

### O que a pasta traz (modelos lidos em 2026-10-20)
- **Prova objetiva** (`Prova Objetiva - Template.docx`): cada item avalia **uma** capacidade; campos CAPACIDADE, Contexto (situação-problema), Comando, Alternativas (4 recomendadas, 4 a 5 aceitas); resolução em 3 minutos.
- **Avaliação prática** (`Avaliacao-Pratica-Modelo-Padrao.docx`): CAPACIDADES (C1, C2…), CONTEXTUALIZAÇÃO (texto para leitura), DESAFIO, RESULTADOS E ENTREGAS (formulário em partes), LISTA DE ANEXOS, LISTA DE VERIFICAÇÃO com critérios SIM/NÃO por capacidade.
- **Prova prática** (`Prova Prática - Template.docx`) e `Turma ... T5 Vespertino.pdf`: modelo de prova e de lista de turma (dado pessoal: não copiar para o repositório).

### Geradores atuais que serão ajustados
- `assets/gerador-atividades/gerar_atividades.py` + `template_atividade.html` (atividade objetiva e prática).
- `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` + `template_avaliacao_discursiva.html`.
- `assets/gerador-prova-pratica/` (modelo `.docx` da prova prática).
- `assets/gerador-materia/materia.py` (lê o `materia.json`; ponto de validação da situação de aprendizagem).

### Escopo
- **Entra:** regras novas em `.claude/rules/`; ajuste dos geradores globais (objetiva, prova objetiva, discursiva, prática); validação global de "pelo menos 1 situação de aprendizagem por aula" no gerador e no `materia.json`; conferência de todas as matérias de todos os cursos; documentação em `docs/`.
- **Não entra:** slides (regra 11 do `AGENTS.md`); navegador e testes automatizados (conferência por `node --check`, `py_compile` e leitura); gerar atividades novas de conteúdo; mexer em dados de aluno (a lista de turma do PDF fica fora do Git).
- **Critério de pronto:** geradores seguem o modelo SENAI (uma capacidade por item, 4 alternativas, lista de verificação por capacidade); toda aula de `materia.json` tem ≥1 situação; regra em `INDEX.md` e `HISTORICO-REGRAS.md`; quadro, visualizador e commit + push.

### Riscos
- **Mudança global:** os geradores servem todas as matérias; um erro atinge todos os cursos. Por isso cada gerador é uma subtarefa própria, com conferência antes da próxima.
- **Matérias antigas:** algumas aulas não têm situação de aprendizagem. A regra vale a partir da validação; a correção das matérias antigas vira subtarefa de auditoria, sem gerar conteúdo novo sem pedido.
- **Dados pessoais:** o PDF de turma tem nomes; não entra no repositório nem nos exemplos.

### Decisões
- 2026-10-20 — Claude Code (Haiku 5.5): tarefa grande (vários geradores, mudança global, regra nova) → plano nesta etapa e aguarda o "sim" do usuário. Nenhuma subtarefa é executada antes disso.

### #300.1 — Ler o modelo SENAI e escrever a regra "padrão de provas SENAI"

**Próximo passo:** ler os três `.docx` por extração de texto, listar as seções obrigatórias de cada modelo e gravar a regra em `.claude/rules/provas-senai-padrao.md` (≤ 5 KB).

- **Nível:** PESADO — define a regra que todos os geradores seguem (mudança global).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** regra com a lista de seções por tipo (objetiva, prática, discursiva); listada em `.claude/rules/INDEX.md`.
- **Entrega:** — · **Verificação:** —

### #300.2 — Regra "situação de aprendizagem em toda aula"

**Próximo passo:** escrever `.claude/rules/situacao-aprendizagem.md` (≤ 5 KB): definição, formato mínimo (contexto, desafio, entregas, lista de verificação) e a regra de ≥ 1 por aula.

- **Nível:** PESADO — regra global que vale para todas as matérias de todos os cursos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** regra escrita; referenciada em `materias-global.md`; registrada no `HISTORICO-REGRAS.md`.
- **Entrega:** — · **Verificação:** —

### #300.3 — Gerador de atividades objetivas: uma capacidade por item e 4 alternativas

**Próximo passo:** em `assets/gerador-atividades/gerar_atividades.py`, validar que cada item tem uma capacidade, contexto, comando e 4 alternativas (ou 5 no máximo), e recusar item fora do padrão.

- **Nível:** PESADO — gerador global (todas as matérias), mais de 3 arquivos ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** `node --check`/`py_compile` ok; item sem capacidade ou com menos de 4 alternativas é recusado com mensagem clara.
- **Entrega:** — · **Verificação:** —

### #300.4 — Template da atividade objetiva (`template_atividade.html`)

**Próximo passo:** mostrar capacidade, contexto e comando no template, sem alterar o gabarito fora do banco (regra de segurança do projeto).

- **Nível:** MEDIO — template com lógica de exibição, 1 arquivo.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Critérios de aceitação:** `node --check` do JS embutido; gabarito não aparece para o aluno.
- **Entrega:** — · **Verificação:** —

### #300.5 — Gerador da prova objetiva (`Prova Objetiva - Template.docx`)

**Próximo passo:** gerar a prova objetiva no padrão do modelo (ITEM 1…N, CAPACIDADE, Contexto, Comando, Alternativas, 3 minutos por item).

- **Nível:** PESADO — gerador novo de documento `.docx`, mais de 3 arquivos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** um `.docx` de teste gerado a partir de um JSON de exemplo, sem dado pessoal, com a estrutura do modelo.
- **Entrega:** — · **Verificação:** —

### #300.6 — Gerador da avaliação discursiva (`gerar_avaliacao_discursiva.py`)

**Próximo passo:** seguir o modelo prático: CAPACIDADES, CONTEXTUALIZAÇÃO, DESAFIO, RESULTADOS E ENTREGAS, LISTA DE VERIFICAÇÃO com SIM/NÃO por capacidade.

- **Nível:** PESADO — gerador global, ligado ao template e à lista de verificação.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** toda avaliação gerada tem as seções do modelo; lista de verificação por capacidade.
- **Entrega:** — · **Verificação:** —

### #300.7 — Template da atividade discursiva (`template_avaliacao_discursiva.html`)

**Próximo passo:** ajustar o template às seções do modelo; manter as regras de entrega do aluno (sem ver as respostas após entregar, regra das práticas).

- **Nível:** MEDIO — template com lógica de exibição.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Critérios de aceitação:** `node --check` do JS; regra de não ver respostas após entregar mantida.
- **Entrega:** — · **Verificação:** —

### #300.8 — Gerador da prova prática (`assets/gerador-prova-pratica/`)

**Próximo passo:** conferir o `.docx` modelo e ajustar o gerador para as seções do `Prova Prática - Template.docx`.

- **Nível:** PESADO — `.docx`, mais de 3 arquivos ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** gera o `.docx` com as seções do modelo; sem dado pessoal no repositório.
- **Entrega:** — · **Verificação:** —

### #300.9 — Validação global "≥ 1 situação por aula" no `materia.py` e no `materia.json`

**Próximo passo:** em `assets/gerador-materia/materia.py`, recusar `materia.json` em que alguma aula não tenha situação de aprendizagem; manter a mensagem de erro clara.

- **Nível:** PESADO — validação global de todas as matérias.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** `py_compile` ok; `materia.json` sem situação é recusado; matéria que já tem situação passa.
- **Entrega:** — · **Verificação:** —

### #300.10 — Auditoria: todas as matérias de todos os cursos

**Próximo passo:** percorrer `MATERIAIS/*/*/materia.json` e listar, por matéria, as aulas sem situação de aprendizagem (só leitura; sem gerar conteúdo).

- **Nível:** PESADO — varredura de todas as matérias de todos os cursos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Critérios de aceitação:** tabela de matérias × aulas sem situação, no quadro; nada alterado.
- **Entrega:** — · **Verificação:** —

### #300.11 — Documentar em `docs/regras/atividades.md` e `docs/regras/materias.md`

**Próximo passo:** acrescentar o padrão SENAI e a regra de situação de aprendizagem nos dois arquivos, apontando para as regras novas.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Critérios de aceitação:** os dois arquivos apontam para as regras novas; sem regra duplicada.
- **Entrega:** — · **Verificação:** —

### #300.12 — Fechamento: índice de regras, visualizador, quadro e commit + push

**Próximo passo:** depois dos #300.1 a #300.11, atualizar `.claude/rules/INDEX.md`, `docs/HISTORICO-REGRAS.md`, regerar o `index.html` das regras, fazer commit + push na `main`.

- **Nível:** LEVE — `.md` e saída de script.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Critérios de aceitação:** INDEX e HISTORICO atualizados; visualizador regerado; mãe ✅ movida para `task_complete.md`.
- **Entrega:** — · **Verificação:** —
