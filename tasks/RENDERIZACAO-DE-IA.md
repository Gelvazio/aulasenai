# Renderização de IA — referência de bibliotecas e ferramentas

## Para que serve este documento

Orienta a IA na escolha da ferramenta certa quando o pedido fala em "renderizar tarefas".
Esse termo pode significar executar tarefas com agentes de IA (sentido 1) ou gerar imagens e
visualizações de projetos (sentido 2). Cada sentido tem ferramentas próprias.

## Como a IA deve usar

1. Identificar qual dos dois sentidos o pedido tem. Se for ambíguo, perguntar ao usuário antes.
2. Escolher a ferramenta na tabela do grupo, considerando a linguagem e a plataforma do projeto.
3. Não inventar versão, preço ou recurso. Conferir na documentação oficial antes de recomendar.
4. Indicar ao usuário a ferramenta escolhida e o motivo.

## 1. Execução de tarefas com agentes de IA

| Ferramenta | Linguagem / plataforma | Para que serve | Quando usar | Quando não usar |
|------------|------------------------|----------------|-------------|-----------------|
| CrewAI | Python | Criar equipes de agentes que trabalham juntos em tarefas sequenciais | Fluxo com papéis definidos (pesquisador, redator, revisor) | Tarefa simples de uma só chamada à IA |
| LangChain | Python e JavaScript | Cadeias, memória, conectores e chamadas de APIs de LLMs | Orquestrar LLMs, ferramentas e fontes de dados | Projeto que só precisa de uma chamada direta à API |
| AutoGen | Python (Microsoft) | Agentes que conversam entre si e executam código | Objetivos que exigem código gerado e executado de forma autônoma | Fluxo previsível que cabe em passos fixos |
| Vercel AI SDK | JavaScript / TypeScript | Streaming de respostas de IA e componentes de interface | Aplicação web no ecossistema JS/TS com resposta em tempo real | Projeto em Python ou sem interface web |

## 2. Renderização visual (imagens e arquitetura)

| Ferramenta | Linguagem / plataforma | Para que serve | Quando usar | Quando não usar |
|------------|------------------------|----------------|-------------|-----------------|
| Stable Diffusion (diffusers) | Python, local com GPU | Gerar imagens com controle total do processo | Precisa de customização e execução no próprio hardware | Sem GPU ou sem equipe para configurar |
| Veras AI | Plugin de Revit, SketchUp e Rhinoceros | Render com IA dentro do software de modelagem | O projeto já está modelado nesses programas | O projeto parte de esboço, sem modelo 3D |
| Magnific AI | Serviço web | Upscaling e detalhamento de imagens | Refinar uma imagem já renderizada | Como única ferramenta para criar a imagem |
| PromeAI | Serviço web | Transformar esboço simples em render com materiais e luz | Partir de desenho à mão ou esboço rápido | Precisa de modelo 3D preciso ou controle técnico fino |

## Resumo rápido de escolha

- Se a tarefa é em Python e precisa de equipe de agentes → use CrewAI ou AutoGen.
- Se a tarefa é uma cadeia de chamadas a LLMs com memória e APIs → use LangChain.
- Se o projeto é web em JavaScript ou TypeScript com resposta em streaming → use Vercel AI SDK.
- Se o projeto já está modelado no Revit, SketchUp ou Rhinoceros → use Veras AI.
- Se o ponto de partida é um esboço ou prompt → use PromeAI ou Stable Diffusion.
- Se a imagem já existe e precisa de mais detalhe ou resolução → use Magnific AI como complemento.
