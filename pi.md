# Pi Desktop: guia de uso

O Pi Desktop é um aplicativo de computador (macOS, Windows e Linux) que dá aos agentes de IA um espaço de trabalho próprio e persistente. Projetos, sessões, revisões, pré-visualizações e agentes ficam juntos em um único ambiente, em vez de espalhados entre terminal, extensão de IDE e aba do navegador.

Versão atual: 0.15.x (prévia inicial, ainda não recomendada para fluxos de produção críticos).

Repositório: https://github.com/vastsa/PI-Desktop
Documentação: https://pi-docs.aiuo.net/

## Conceitos principais

- **Projetos:** pastas de trabalho. Cada projeto reúne suas sessões e arquivos.
- **Sessões:** conversas com agentes dentro de um projeto. Elas são persistentes, então você pode fechar o app e retomar depois.
- **Agentes:** podem delegar tarefas a subagentes ou coordenar várias sessões de trabalho em paralelo.
- **Plugins:** extensões que adicionam recursos. Podem incluir ferramentas e skills para o agente, comandos, painéis, widgets flutuantes, temas, servidores MCP e serviços em segundo plano.
- **Modelos:** você pode usar modelos na nuvem, modelos locais, gateways personalizados ou APIs compatíveis, e trocar entre eles sem reconfigurar o fluxo.

## Primeiros passos

1. Acesse a página de releases: https://github.com/vastsa/PI-Desktop/releases/latest
2. Baixe a versão do seu sistema operacional e instale.
3. Abra o app e crie um projeto apontando para a pasta de trabalho.
4. Configure um modelo (local ou na nuvem) nas configurações.
5. Inicie uma sessão no projeto e converse com o agente.

## Dia a dia

- **Trocar de modelo:** pode ser feito sem perder o contexto do projeto. Use um modelo local para trabalhos sensíveis e um modelo na nuvem para tarefas mais pesadas.
- **Retomar trabalho:** as sessões ficam salvas. Basta abrir a sessão anterior.
- **Usar subagentes:** peça ao agente para dividir a tarefa; cada parte pode rodar em uma sessão separada.

## Plugins

Os plugins montam o seu ambiente de trabalho. Eles podem:

- adicionar ferramentas e skills ao agente;
- criar comandos no sistema global de comandos;
- abrir painéis independentes;
- exibir widgets flutuantes na área de trabalho (por exemplo, indicadores de status ou temporizadores);
- rodar serviços em segundo plano ou conectar servidores MCP.

Para criar um plugin, consulte a documentação de desenvolvimento de plugins, linkada no README do projeto.

## Dicas

- Como o app é local-first, seus projetos ficam na sua máquina.
- Por ser uma versão inicial, faça backup de trabalhos importantes.
- Se preferir compilar do código-fonte, use o repositório oficial no GitHub.

Fonte da descrição: https://www.opensourceprojects.dev/post/pi-desktop
