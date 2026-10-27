## Etapa 550-4b9e1d72 — #401: Análise da pasta MATERIAIS em JSON e painel HTML futurista

**Tarefa:** #401-4b9e1d72 · **Pedido em:** 2026-10-26 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie um arquivo python, que leia todos os arquivos da pasta `C:\fontes\aulasenai\MATERIAIS`, e coloque o resultado em `C:\fontes\aulasenai\analises` em formato json, crie um arquivo nesta pasta de nome `index.html`, que detalhe quantos arquivos de cada tipo tem nas pastas, use visual futurista" (referência de estilo: `C:\fontes\rules-ai\prompts\VISUAL-FUTURISTA.md`).
**Objetivo:** gerar um inventário em JSON da pasta `MATERIAIS` (contagem de arquivos por tipo e por pasta) e um painel `index.html` com visual futurista que mostre esses números.

### Escopo

- **Entra:** script Python de varredura da `MATERIAIS`; saída `analises/analise-materiais.json`; página `analises/index.html` lendo esse JSON; ajustes de `.gitignore`/`.vercelignore` necessários para a pasta `analises/`.
- **Não entra:** ler o conteúdo dos arquivos (não abrir PDF, DOCX, PPTX, nem Markdown de aula); alterar qualquer arquivo dentro de `MATERIAIS`; gerar aulas, atividades ou slides; criar testes automatizados.

### Critério de pronto

- `analises/analise-materiais.json` existe, é JSON válido e a soma das contagens por tipo é igual ao total de arquivos encontrados pelo script.
- `analises/index.html` abre sem erro de console e mostra a contagem por tipo e por pasta, lida do JSON.
- A pasta `analises/` não sobe para o site (Vercel) nem para o Git com nomes de gabarito (decisão registrada na subtarefa 401.13).

### Riscos

- **Nomes de arquivo podem expor gabaritos ou listas de alunos** (`security-banco.md`): o JSON guarda só nome, tipo, pasta e tamanho, nunca conteúdo. Se a lista de nomes for sensível, a subtarefa 401.13 decide o que sai do site.
- **Pastas grandes ou com `__pycache__`:** o script ignora pastas de cache e não segue links simbólicos.
- **Caminho com acento e espaço** (`CONTEUDO`, `TECNICO-INFORMATICA-INTERNET`): leitura sempre com `pathlib` e `encoding="utf-8"`.

### Premissas

- Python 3 disponível (`C:\Python314\python.exe` no Windows local).
- Tipo de arquivo = extensão em minúsculas; arquivo sem extensão vira `(sem extensão)`.
- A página usa a paleta e as regras de `VISUAL-FUTURISTA.md` (fundo escuro, neon ciano/magenta/violeta, Orbitron e Share Tech Mono, `prefers-reduced-motion`, foco visível, uma coluna até 720 px).

### Decisões

- 2026-10-26 (Claude Code Haiku 5.5): tarefa grande (gerador novo, várias partes). Plano nesta etapa; execução só após **"sim" claro do usuário** (regra `ciclo-da-task.md`).

### Aprovação

- ⬜ Aguardando o "sim" do usuário ao plano desta etapa.

---

### #401.1 — Inventário de tipos e pastas de MATERIAIS

**Próximo passo:** listar, sem abrir arquivos, as extensões e as pastas de primeiro e segundo nível em `MATERIAIS`.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** conferir quais extensões existem e quais pastas têm arquivos, para fixar a lista de tipos.
- **Critérios de aceitação:** lista de extensões e de pastas anotada na seção da etapa (Decisões).
- **Entrega:** — · **Verificação:** —

### #401.2 — Fixar o esquema do JSON de saída

**Próximo passo:** escrever na etapa o formato do JSON (chaves, tipos, ordem).

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** definir `geradoEm`, `totalArquivos`, `porTipo` (tipo → quantidade), `porPasta` (pasta → quantidade e tipos), `arquivos` (caminho relativo, tipo, tamanho em bytes, data de modificação).
- **Critérios de aceitação:** esquema escrito aqui; nenhum campo com conteúdo de arquivo.
- **Entrega:** — · **Verificação:** —

### #401.3 — Constantes do script (pasta de entrada, pasta de saída, ignorados)

**Próximo passo:** criar o bloco de constantes no topo do script.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** `PASTA_MATERIAIS`, `PASTA_ANALISES`, `NOME_JSON`, `PASTAS_IGNORADAS` (`__pycache__`, `.git`), `EXTENSAO_SEM_TIPO`.
- **Critérios de aceitação:** nenhum valor fixo espalhado pelo código (regra de constantes).
- **Entrega:** — · **Verificação:** —

### #401.4 — Função de varredura recursiva

**Próximo passo:** implementar `listar_arquivos(raiz)` com `pathlib`, sem seguir links simbólicos.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** percorrer a árvore, pular `PASTAS_IGNORADAS`, devolver os caminhos de arquivo.
- **Critérios de aceitação:** função com no máximo 45 linhas, com docstring (objetivo, parâmetros, retorno, exceções).
- **Entrega:** — · **Verificação:** —

### #401.5 — Função de classificação por tipo

**Próximo passo:** implementar `tipo_do_arquivo(caminho)` pela extensão em minúsculas.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** extensão sem ponto, em minúsculas; sem extensão → `EXTENSAO_SEM_TIPO`.
- **Critérios de aceitação:** função pura, sem acesso ao disco.
- **Entrega:** — · **Verificação:** —

### #401.6 — Função de metadados do arquivo

**Próximo passo:** implementar `ler_metadados(caminho, raiz)` com tamanho e data, sem abrir o conteúdo.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** caminho relativo à `MATERIAIS` (barras `/`), tipo, tamanho em bytes, data de modificação em ISO 8601.
- **Critérios de aceitação:** nenhuma chamada a `open()` no arquivo lido.
- **Entrega:** — · **Verificação:** —

### #401.7 — Função de contagem por tipo e por pasta

**Próximo passo:** implementar `contar_por_tipo(metadados)` e `contar_por_pasta(metadados)`.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** dois dicionários agregados; a pasta é o primeiro nível dentro da `MATERIAIS`.
- **Critérios de aceitação:** a soma de `porTipo` é igual a `totalArquivos`.
- **Entrega:** — · **Verificação:** —

### #401.8 — Função de gravação do JSON

**Próximo passo:** implementar `gravar_json(dados, caminho)` com escrita em arquivo temporário e troca no fim.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** criar `analises/` se não existir; `ensure_ascii=False`, `indent=2`, UTF-8.
- **Critérios de aceitação:** falha no meio não deixa JSON pela metade.
- **Entrega:** — · **Verificação:** —

### #401.9 — Tratamento de erros e saída do script

**Próximo passo:** envolver a execução em `main()` com `try/except` e mensagem clara.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** pasta `MATERIAIS` inexistente → mensagem e código de saída 1; arquivo ilegível → entra na lista com tamanho `null` e um aviso.
- **Critérios de aceitação:** nenhuma exceção sem tratamento no terminal.
- **Entrega:** — · **Verificação:** —

### #401.10 — Script `analisar_materiais.py` completo e com docstrings

**Próximo passo:** juntar as funções 401.3 a 401.9 em `C:\fontes\aulasenai\analises\analisar_materiais.py`.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** cada função com no máximo 45 linhas, nomes em português sem acento, linhas até 100 caracteres, arquivo abaixo de 1000 linhas.
- **Critérios de aceitação:** `python -m py_compile` passa; execução gera o JSON.
- **Entrega:** — · **Verificação:** —

### #401.11 — Gerar o JSON e conferir os números

**Próximo passo:** rodar o script e comparar o total de arquivos com a contagem de `Get-ChildItem -Recurse -File` (somente contagem).

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** conferir `totalArquivos` e a soma de `porTipo`.
- **Critérios de aceitação:** os dois números batem; JSON lido com `json.load` sem erro.
- **Entrega:** — · **Verificação:** —

### #401.12 — Página `analises/index.html` com visual futurista

**Próximo passo:** criar o HTML, o CSS e o JS em arquivos separados em `analises/`, seguindo `VISUAL-FUTURISTA.md`.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** fundo escuro com gradientes violeta e magenta; cards com borda neon; barras de contagem por tipo e por pasta (CSS); fontes Orbitron (títulos) e Share Tech Mono (números); grade de fundo em `::before`; `@media (prefers-reduced-motion: reduce)`; `:focus-visible` magenta; uma coluna até 720 px; a página lê `analise-materiais.json` com `fetch`, sem dados fixos no HTML.
- **Critérios de aceitação:** nenhum `style=""` nem `onclick` inline; cores em `:root`; sem rolagem horizontal até 720 px.
- **Entrega:** — · **Verificação:** —

### #401.13 — Decidir o que sai do site e do Git

**Próximo passo:** ler `.vercelignore` e `.gitignore` do projeto e decidir se `analises/` entra no site ou só no Git.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** o JSON tem nomes de arquivo; se a lista for sensível, `analises/` vai para o `.vercelignore`. Aplicar a regra `vercel-sem-deploy-de-controle.md` e perguntar ao usuário antes de mudar o `.gitignore`.
- **Critérios de aceitação:** decisão registrada nas Decisões da etapa, com o motivo.
- **Entrega:** — · **Verificação:** —

### #401.14 — Documentar a análise no cabeçalho do script e na etapa

**Próximo passo:** acrescentar em `analises/` um `LEIA-ME.md` curto com o comando de execução.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** comando para rodar o script (`python analises\analisar_materiais.py`), o que cada campo do JSON significa e a data da última geração.
- **Critérios de aceitação:** o comando do LEIA-ME funciona sem editar nada.
- **Entrega:** — · **Verificação:** —

### #401.15 — Verificação final sem navegador e sem testes

**Próximo passo:** conferir por leitura do código e comandos de terminal.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** `python -m py_compile analises/analisar_materiais.py`; `node --check` não se aplica; checar que `index.html` não tem `style=""` nem `onclick`; checar contraste e foco pelo código. Sem navegador e sem testes automatizados (`testes-validacao.md`).
- **Critérios de aceitação:** todas as conferências por comando ou leitura registradas na seção de verificação.
- **Entrega:** — · **Verificação:** —

### #401.16 — Commit e push da entrega

**Próximo passo:** `git add analises/ tasks/`, conferir `git diff --cached --name-only`, commit e push na `main`.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** um commit com o script, o JSON, o HTML, o LEIA-ME e o quadro; sem `git add .`.
- **Critérios de aceitação:** push feito; linha da mãe movida para `task_complete.md` só quando todas as subtarefas estiverem ✅.
- **Entrega:** — · **Verificação:** —
