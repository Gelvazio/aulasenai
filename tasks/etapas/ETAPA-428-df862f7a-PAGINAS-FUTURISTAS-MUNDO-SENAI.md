## Etapa 428-df862f7a — #299: páginas futuristas das 10 ideias do Mundo SENAI

**Tarefa:** #299-df862f7a · **Pedido em:** 2026-10-19 20:31 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "CRIE 1 NOVA TAREFA QUE IMPLEMENTA COM VARIAS SUB-TAREFAS, ESTAS IDEIAS E CADA SUBTAREFA, PODE SE DIVIDIR EM SECOES, COM DETALHES DE CADA CASO, O VISUAL DEVE SER FUTURISTA, SEGUINDO O PROMPT VISUAL-FUTURISTA.md, MAS COLOCANDO A LOGO DO SENAI COMO CENTRO E OS ALUNOS COMO PROTAGONISTAS"
**Objetivo:** transformar as 10 ideias de `MATERIAIS/RIO_DO_SUL_MAIS_TECH/MUNDO-SENAI/IDEIAS-MUNDO-SENAI.md` em páginas visuais futuristas, para projetar em sala e ver pelo celular, com a logo SENAI no centro e um avatar 3D de cada aluno como protagonista.

> **Aprovação:** o plano foi aprovado pelo professor em 2026-10-19 20:31 (modo plano). Plano completo: `C:\Users\gelva\.claude\plans\crie-1-nova-tarefa-linear-puppy.md`.
> Esta etapa só registra a tarefa: nenhuma subtarefa foi reservada nem executada.

### Escopo
- **Entra:** pasta `MATERIAIS/RIO_DO_SUL_MAIS_TECH/MUNDO-SENAI/` com `ideias.json`, `index.html` (logo central), `ideia-01.html` a `ideia-10.html`, CSS futurista, JS de cena 3D (Three.js) e JS de navegação; logo `assets/img/logo-sesi-senai.png`.
- **Não entra:** atividades no banco, questões em arquivo, alteração na ementa, fotos de alunos, nomes reais de alunos, navegador na validação, testes automatizados.

### Riscos
- Three.js pesado em projetor fraco → plano B: desligar a cena 3D por parâmetro e usar silhueta SVG.
- Versão do Three.js precisa ser fixa e com pelo menos 2 semanas (regra de CDN).
- Ideias com dados de menores: sem nomes reais; avatares sem fotos.

### Decisões
- 2026-10-20 10:47 · #299.4 reclassificada de PESADO para MEDIO (só Sonnet), a pedido do usuário.
- 2026-10-19 20:31 · professor aprovou o plano (modo plano). Respostas: avatares (sem fotos), logo `logo-sesi-senai.png`, uma página por ideia, Three.js via cdnjs, uso em projeto e celular, HTML liberado em MATERIAIS (é apresentação), só "Aluno 01" a "Aluno 10", detalhe completo, avatar 3D girando, conferência pelo professor no navegador.

### Requisitos
| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO o professor abrir `MUNDO-SENAI/index.html`, O SISTEMA DEVE mostrar a logo `assets/img/logo-sesi-senai.png` no centro do hero | Requisitos do plano | leitura do HTML e existência do arquivo |
| R1.2 | QUANDO o professor clicar em uma das 10 ideias, O SISTEMA DEVE abrir `ideia-NN.html` com as 10 seções da ideia | Requisitos do plano | leitura dos 10 arquivos gerados |
| R1.3 | O SISTEMA DEVE mostrar apenas "Aluno 01" a "Aluno 10" como rótulos | Requisitos do plano | busca por nomes reais no JSON e nos HTML (nenhum) |
| R1.4 | ONDE o navegador não suportar WebGL, O SISTEMA DEVE mostrar uma silhueta SVG no lugar do avatar 3D | Requisitos do plano | leitura do JS (fallback presente) |
| R1.5 | O SISTEMA DEVE respeitar `prefers-reduced-motion` desligando as animações | Requisitos do plano | leitura do CSS |
| R1.6 | O SISTEMA DEVE usar Three.js carregado de `cdnjs.cloudflare.com` em versão fixa | Requisitos do plano | leitura do HTML |

### Invariantes
- N/A — a tarefa não altera regra de negócio, banco nem cálculo. Justificativa: é apresentação estática; a conferência é por leitura e sintaxe (`node --check`, `python -m json.tool`).

### Perguntas abertas
- Nenhuma pergunta aberta (todas respondidas no modo plano).

### 299.1 — Extrair ideias.json das 10 ideias (texto exato)
**Próximo passo:** ler o `IDEIAS-MUNDO-SENAI.md` e gerar `ideias.json` sem alterar o texto.
- **Nível:** MEDIO — código/dados com lógica simples, 1 arquivo.
- **Modelo:** só Sonnet — nunca outro.
- **Effort:** medium.
- **Descrição:** `ideias.json` com 10 objetos (id, título, UC, formato, tempo, materiais, situação, passos, entrega, critério).
- **Critérios de Aceitação:** 10 itens; texto idêntico ao .md; `python -m json.tool` passa.
- **Entrega:** —
- **Verificação:** `python -m json.tool ideias.json`; contagem de itens = 10.
- **Anotação:** —

### 299.2 — Tema CSS futurista (tokens, grade, botões, cards)
**Próximo passo:** criar `assets/css/futurista.css` seguindo `rules-ai/prompts/VISUAL-FUTURISTA.md`.
- **Nível:** MEDIO — CSS com lógica de temas, 1 arquivo.
- **Modelo:** só Sonnet — nunca outro.
- **Effort:** medium.
- **Descrição:** tokens em `:root`, grade holográfica, cards, botões, `prefers-reduced-motion`.
- **Critérios de Aceitação:** cores só via tokens; animações desligáveis; contraste de texto legível.
- **Entrega:** —
- **Verificação:** leitura do arquivo; conferência dos tokens usados.
- **Anotação:** —

### 299.3 — index.html com logo central e rede de nós
**Próximo passo:** criar `index.html` com hero, logo no centro e grade das 10 ideias.
- **Nível:** MEDIO — HTML/SVG com lógica de grade, 1 arquivo.
- **Modelo:** só Sonnet — nunca outro.
- **Effort:** medium.
- **Descrição:** hero com `assets/img/logo-sesi-senai.png` no centro; rede de nós SVG em volta; grade com 10 cards.
- **Critérios de Aceitação:** logo referenciada por caminho relativo existente; 10 cards com link para `ideia-NN.html`.
- **Entrega:** —
- **Verificação:** leitura do HTML; existência do arquivo da logo.
- **Anotação:** —

### 299.4 — Cena 3D do avatar (Three.js) e rede de nós
**Próximo passo:** criar `assets/js/cena-3d.js` com avatar 3D por página e fallback SVG.
- **Nível:** MEDIO — reclassificada pelo usuário em 2026-10-20 10:47 (antes PESADO: biblioteca 3D, WebGL, fallback).
- **Modelo:** só Sonnet — nunca outro.
- **Effort:** high.
- **Descrição:** avatar 3D girando (cor de destaque da ideia); rede de nós em 3D no hero; Three.js de cdnjs em versão fixa; fallback SVG sem WebGL.
- **Critérios de Aceitação:** sem WebGL → SVG; cena desligável com `prefers-reduced-motion`; versão do Three.js fixa.
- **Entrega:** —
- **Verificação:** `node --check assets/js/cena-3d.js`; leitura do fallback.
- **Anotação:** —

### 299.5 — Gerador das 10 páginas ideia-NN.html
**Próximo passo:** criar o gerador (script) que lê `ideias.json` e grava `ideia-01.html` a `ideia-10.html`.
- **Nível:** PESADO — gerador de 10 arquivos ligados ao JSON e ao CSS/JS.
- **Modelo:** só Opus 5.5+ / Fable / DeepSeek V4 Pro — nunca outro.
- **Effort:** high.
- **Descrição:** cada página com as seções Situação, Passos, Materiais, Tempo, UC, Entrega, Critério e Dica ao professor; avatar "Aluno NN".
- **Critérios de Aceitação:** 10 páginas; sem nome real de aluno; HTML válido; links de navegação entre ideias.
- **Entrega:** —
- **Verificação:** contagem de arquivos = 10; busca por nomes reais = nenhum; `node --check` do gerador.
- **Anotação:** —

### 299.6 — Navegação e responsividade (celular e projetor)
**Próximo passo:** criar `assets/js/navegacao.js` e ajustar o CSS para celular e projetor.
- **Nível:** MEDIO — JS e CSS com lógica de layout, 2 a 3 arquivos.
- **Modelo:** só Sonnet — nunca outro.
- **Effort:** medium.
- **Descrição:** menu entre as 10 ideias, anterior/próxima, layout de uma coluna no celular e texto grande no projetor.
- **Critérios de Aceitação:** sem rolagem horizontal no celular; navegação por teclado.
- **Entrega:** —
- **Verificação:** `node --check assets/js/navegacao.js`; leitura das regras de `@media`.
- **Anotação:** —

### 299.7 — Conferência por leitura e node --check (sem navegador)
**Próximo passo:** rodar `node --check` nos JS, `python -m json.tool` no JSON e conferir os requisitos.
- **Nível:** LEVE — só verificação por comando e leitura.
- **Modelo:** só Haiku — nunca outro.
- **Effort:** low.
- **Descrição:** conferir cada requisito da etapa e registrar o resultado na Verificação.
- **Critérios de Aceitação:** todos os requisitos com verificação registrada; nenhum nome real de aluno.
- **Entrega:** —
- **Verificação:** saída dos comandos e leitura registradas nesta seção.
- **Anotação:** —

### 299.8 — Fechamento: quadro, commit e push por subtarefa
**Próximo passo:** mover as linhas concluídas para `task_complete.md`, commit + push.
- **Nível:** LEVE — só quadro e Git.
- **Modelo:** só Haiku — nunca outro.
- **Effort:** low.
- **Descrição:** atualizar o `STATUS.md`, mover linhas ✅ para `task_complete.md`, um commit por subtarefa.
- **Critérios de Aceitação:** quadro coerente; commit e push feitos.
- **Entrega:** —
- **Verificação:** `git log` com um commit por subtarefa.
- **Anotação:** —
