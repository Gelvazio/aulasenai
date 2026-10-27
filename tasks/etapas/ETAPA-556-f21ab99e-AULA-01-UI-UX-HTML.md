## Etapa 556-f21ab99e — #409: Aula 01 de Fundamentos de UI/UX em HTML

**Tarefa:** #409-f21ab99e · **Pedido em:** 2026-10-27 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "leia a pasta FUNDAMENTOS-DE-UI-UX e, para a aula 01, crie 1 html em `AULAS/aula-01.html` com os dados de `AULA-01-PRINCIPIOS-DE-DESIGN-DEFINICAO-E-EVOLUCAO-HISTORICA.md`; crie a tarefa com o máximo de subtarefas possível."
**Objetivo:** publicar a aula 01 de Fundamentos de UI/UX como uma página HTML única, montada fielmente a partir do Markdown da aula (`CONTEUDO/AULA-01-…md`).

### Escopo

- **Entra:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/AULAS/aula-01.html` (uma página só, com CSS dentro de `<style>` no `<head>`, sem JavaScript e sem `style=""`); conteúdo dos Markdown da aula 01, incluindo o roteiro, os exercícios em sala e as referências.
- **Não entra:** respostas prováveis (`ATIVIDADES/CONTEUDO/RESPOSTAS-PROVAVEIS-AULA-01.md`, uso exclusivo do professor e da correção por IA) e o gabarito da prática; atividades; slides (regra: a IA não gera slides); alteração no `CONTEUDO/`; alteração em `AULAS/STATUS-AULAS.md` e `STATUS_MATERIA.md`; banco; Supabase; apostila.
- **Fonte do conteúdo:** só o Markdown da aula 01 (ementa vence em caso de dúvida). Não ler PDF.

### Critério de pronto

- `aula-01.html` existe, abre com `<!doctype html>`, tem `<title>` e `lang="pt-BR"`, e as tags estão balanceadas.
- Todas as seções do Markdown da aula 01 aparecem na página, na mesma ordem e com o mesmo texto (sem resumir nem inventar).
- Nenhuma resposta, gabarito ou marcação de "certa/errada" da `RESPOSTAS-PROVAVEIS` aparece na página.
- Sem nome de empresa fictícia (regra "Você como aluno consultor").
- Layout legível em celular (16 px de margem lateral, sem rolagem horizontal da página; tabela do roteiro em bloco que rola dentro de si).
- Commit + push na `main`; quadro atualizado com ✅ e a linha movida para o `task_complete.md`.

### Riscos

- Copiar texto com erro de acentuação ou trocar um marco histórico (ano, nome). Plano B: conferir cada seção contra o `.md` por leitura antes de fechar a subtarefa.
- O Markdown tem tabelas e listas com `**negrito**`; converter sem perder a hierarquia (`##` → `h2`, `###` → `h3`).
- Sem navegador (regra do projeto): a aparência no celular é conferida por leitura do CSS, não visualmente.

### Decisões

- 2026-10-27 (usuário): página única em `AULAS/aula-01.html`, montada a partir do Markdown da aula 01.
- 2026-10-27 (usuário): a tarefa deve ter o máximo de subtarefas possível; cada seção do Markdown virou uma subtarefa.
- 2026-10-27 (Haiku, C52): níveis e modelos das subtarefas não foram escritos pela IA; ficam `a classificar pelo Jev`. Quem pegar só executa o que o Jev classificar como do seu modelo.

### Aprovação

- ✅ Pedido direto do usuário (tarefa pequena: um arquivo HTML novo, sem banco nem segurança).

---

### #409.1 — Cabeçalho e metadados da aula

**Próximo passo:** criar `AULAS/aula-01.html` com `<!doctype html>`, `<head>` (charset, viewport, `<title>Aula 01 — Princípios de design</title>`, `<style>` vazio) e `<body>` com o cabeçalho: título da aula, matéria, curso, carga horária (4 h), conhecimentos da ementa (7 · 7.1–7.2), capacidades (C3 · S1) e estratégias.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** esqueleto do arquivo e cabeçalho com os metadados do Markdown, sem texto novo.
- **Critérios de aceitação:** os 6 metadados aparecem com os mesmos valores do `.md`; `<title>` e `lang` corretos.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.2 — Indicadores e objetivos

**Próximo passo:** acrescentar a seção "Indicadores" (1 item) e "Objetivos" (3 itens) do `.md`, linha 11 a 19.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** duas seções curtas, em lista.
- **Critérios de aceitação:** 1 indicador e 3 objetivos, com o texto do `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.3 — Roteiro da aula (tabela de tempos)

**Próximo passo:** acrescentar a seção "Roteiro da aula" como tabela (Momento · Tempo (min) · O que acontece) com as 8 linhas e a linha de total (240 min, 4 h com intervalo), `.md` linha 21 a 33.

- **Nível:** LEVE — classificado (jev (confiança 0.97))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Descrição:** tabela `<table>` com `<thead>` e `<tfoot>` (total); a tabela rola dentro do próprio bloco no celular.
- **Critérios de aceitação:** 8 linhas + total; minutos batem com o `.md` (15+30+45+30+30+30+30+30 = 240).
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.4 — Seção 1: o que é design

**Próximo passo:** copiar as seções `### 1`, `### 1.1` (forma e função) e `### 1.2` (estética e função em sistemas) do `.md`, linhas 37 a 59; manter a "Regra de ouro" em destaque.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** texto em `h2`/`h3`, com os rótulos "A Forma", "A Função", "Estética pura", "Design funcional" em negrito.
- **Critérios de aceitação:** as 3 subseções e a regra de ouro com o mesmo texto do `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.5 — Seção 2: origens e marcos gráficos

**Próximo passo:** copiar `### 2`, `### 2.1` (Revolução Industrial), `### 2.2` (lista de marcos 1450, 1880, 1919, 1957) e os parágrafos de Bauhaus e Estilo Suíço, `.md` linhas 61 a 82.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** lista de marcos em `<ul>`; Bauhaus e Estilo Suíço como blocos destacados.
- **Critérios de aceitação:** 4 marcos na ordem do `.md`; datas e nomes sem alteração.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.6 — Seção 3: os computadores (CLI, GUI e metáfora)

**Próximo passo:** copiar `### 3`, `### 3.1` (GUI, Xerox PARC) e `### 3.2` (metáfora do escritório físico), `.md` linhas 84 a 100.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** três subseções em texto corrido.
- **Critérios de aceitação:** termos CLI, GUI e Xerox PARC presentes e corretos; a pergunta sobre "Área de Trabalho" mantida.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.7 — Seção 4: Internet, Web 1.0 e o ciclo de adaptação

**Próximo passo:** copiar `### 4`, `### 4.1` (meio impresso × tela digital) e `### 4.2` (ciclo de adaptação em 4 passos numerados), `.md` linhas 102 a 119.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** comparação em duas colunas ou dois blocos; os 4 passos em `<ol>`.
- **Critérios de aceitação:** 4 passos na ordem do `.md`; dois meios com seus dois atributos cada.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.8 — Seção 5: design moderno (mobile e estilos)

**Próximo passo:** copiar `### 5`, `### 5.1` (virada mobile, 44×44 px) e `### 5.2` (esqueumorfismo, Flat, Material, Design Inclusivo), `.md` linhas 121 a 137.

- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** quatro estilos em lista de definições (`<dl>`) ou blocos.
- **Critérios de aceitação:** anos 2007, 2012, 2014 e "Hoje" conferem com o `.md`; "44×44 pixels" preservado.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.9 — Seção 6: necessidades humanas e a tríade

**Próximo passo:** copiar `### 6` e `### 6.1` (tríade: intenção, linguagem visual, sucesso do usuário), `.md` linhas 139 a 147.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** parágrafo e lista numerada de três itens.
- **Critérios de aceitação:** três itens da tríade na ordem do `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.10 — Seção 7: análise de caso do botão de ação

**Próximo passo:** copiar `### 7`, `.md` linhas 149 a 155 (problema de consultoria, diagnóstico, causa técnica, solução de UI), com a frase do problema (35% dos usuários) em destaque.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** caso em três itens numerados; sem alterar número nem termo.
- **Critérios de aceitação:** "35%", "48px" e os três rótulos conferem com o `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.11 — Seção 8: o projeto de interface e as etapas da consultoria

**Próximo passo:** copiar `### 8` e `### 8.1` (três etapas da consultoria), `.md` linhas 157 a 167.

- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** parágrafo de abertura e lista de três etapas.
- **Critérios de aceitação:** 19 encontros citados; três etapas com o texto do `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.12 — Exercícios em sala (só enunciados)

**Próximo passo:** copiar `## Exercícios em sala`, `.md` linhas 169 a 199: os 5 enunciados e as alternativas, **sem** indicar qual é a certa (o `.md` não traz gabarito; não acrescentar).

- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** lista numerada com as alternativas em `<ul>`; o item 3 (conexão de termos) mantém as duas colunas do `.md` como lista.
- **Critérios de aceitação:** 5 exercícios; nenhuma marcação de resposta correta; nada da `RESPOSTAS-PROVAVEIS` aparece.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.13 — Leitura complementar e referências

**Próximo passo:** copiar `## Leitura complementar` (Norman 2013; Krug 2014) e `## Referências` (EMENTA-CHALKIE-AI v2.0; EMENTA-PRINCIPAL), `.md` linhas 201 a 209.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** duas listas simples.
- **Critérios de aceitação:** 2 livros e 2 referências com o texto do `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.14 — Glossário

**Próximo passo:** copiar `## Glossário` (9 termos), `.md` linhas 211 a 221, como lista de termos em negrito.

- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** `<dl>` com termo e definição.
- **Critérios de aceitação:** 9 termos com as definições do `.md`.
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.15 — Anexos e rodapé de identificação

**Próximo passo:** copiar `## Anexos` (slides: `CONTEUDO/1-Fundamentos-e-Evolução-Histórica-do-Design.pdf`, só como link de referência, sem gerar o arquivo) e acrescentar o rodapé com a matéria e a aula.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** o link aponta para o nome do PDF já existente na pasta `CONTEUDO/`; o rodapé não traz autor, data nem versão novos.
- **Critérios de aceitação:** link do slide presente; rodapé com "Fundamentos de UI/UX — Aula 01".
- **Entrega:** `AULAS/aula-01.html` · **Verificação:** HTML gerado; parser de tags sem erro; termos de gabarito 0; conferido contra o .md por leitura.

### #409.16 — Folha de estilo e layout para celular

**Próximo passo:** no `<style>` do `<head>`, definir tokens em `:root` (cores de texto, fundo e destaque com contraste alto), tipografia legível, margem lateral de 16 px, largura máxima de leitura e regra `overflow-x` só no bloco da tabela; sem `!important` e sem seletor acoplado à estrutura.

- **Nível:** MEDIO — classificado (jev (confiança 0.89))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Descrição:** CSS separado por blocos (layout, tipografia, tabela, lista de termos); sem JavaScript.
- **Critérios de aceitação:** cores em `:root`; 16 px de margem; a página não rola na horizontal (a tabela tem bloco próprio com rolagem); `prefers-color-scheme: dark` com os mesmos tokens.
- **Entrega:** `AULAS/aula-01.html` (bloco `<style>`) · **Verificação:** —

### #409.17 — Conferência do conteúdo (leitura, sem navegador)

**Próximo passo:** percorrer `aula-01.html` seção por seção contra o `.md` (texto, datas, números, ordem) e checar que nenhum termo de `RESPOSTAS-PROVAVEIS-AULA-01.md` ("certa", "meia certa", "errada", "Resposta provável") aparece na página.

- **Nível:** LEVE — classificado (jev (confiança 0.95))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.95)
- **Descrição:** conferência por leitura; corrigir o que divergir e anotar aqui o resultado.
- **Critérios de aceitação:** nenhuma divergência restante; zero ocorrências de termos de gabarito; tags balanceadas (conferido por leitura ou por um parser de HTML do Python, sem arquivo novo no repositório).
- **Entrega:** correções em `AULAS/aula-01.html` · **Verificação:** conferido na escrita contra o .md, sem divergência; parser de tags sem erro.

### #409.18 — Commit, push e quadro

**Próximo passo:** `git add` só de `AULAS/aula-01.html` e dos arquivos do quadro (`tasks/STATUS.md`, `tasks/task_complete.md`, esta etapa); conferir com `git diff --cached --name-only`; commit `feat(409): aula 01 de Fundamentos de UI/UX em HTML` (com a linha Co-Authored-By); `git push origin main`; mover a linha #409 para `task_complete.md`.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** entrega e quadro no mesmo commit; sem `git add .`.
- **Critérios de aceitação:** commit e push feitos na `main`; linhas de #409 em `task_complete.md`.
- **Entrega:** commit + push · **Verificação:** —
