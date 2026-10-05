# Aula 2 — Hardware, Periféricos e Sistemas Operacionais

Fundamentos da computação aplicada ao contexto profissional e técnico.

> Conteúdo extraído de `2-Hardware,-Periféricos-e-Sistemas-Operacionais.pdf` (41 slides). UC Introdução à TIC — Assistente de Operações Logísticas (SENAI).

---

## O Computador como Canal

Como as partes físicas e lógicas cooperam para viabilizar a comunicação profissional sem ruídos?

## Objetivos da Aula

- Diferenciar **hardware, software e periféricos** no ecossistema de TI.
- Compreender o papel **mediador do Sistema Operacional**.
- Organizar e manter **arquivos, diretórios e hardware** com segurança técnica.

## Ponte com a Comunicação

Na aula anterior, estudamos os elementos do ato comunicativo: **emissor, receptor, mensagem, canal, código e ruído**. No ambiente corporativo digital, o computador atua diretamente como **canal de transmissão e processamento**.

🧠 **Lembre-se:** falhas em componentes físicos ou operacionais geram ruídos graves que interrompem a transmissão corporativa.

**Diagnóstico:** se um cabo de rede com mau contato distorce o envio de um relatório gerencial, o elemento afetado é o **canal de transmissão, sofrendo interferência de ruído**.

## Vocabulário Fundamental

| Termo | Definição |
|---|---|
| Hardware | Estrutura física, peças, cabos e circuitos eletrônicos |
| Software | Programas, instruções lógicas e dados executados pela CPU |
| Periféricos | Aparelhos externos auxiliares para entrada/saída de dados |
| Diretório | Estrutura lógica de pastas para catalogar arquivos |

---

## Hardware e Software Integrados

- **Hardware (o corpo):** todos os elementos tangíveis. Sem comandos lógicos permanece inerte; é a base física para a tensão elétrica e o cálculo binário.
- **Software (a mente):** instruções programadas que orientam a máquina sobre o que fazer, processando informações e gerando resultados.

## A Máquina de Von Neumann

Proposta por **John von Neumann em 1945**, estabelece que dados e programas residem na **mesma memória** de trabalho.

- **CPU:** busca, decodifica e executa comandos.
- **Memória principal:** retém temporariamente instruções.
- **Barramentos:** conduzem pulsos e sinais elétricos entre subsistemas.

## O Processador Central (CPU)

A CPU é o cérebro do PC:

- **ULA:** cálculos e lógica.
- **UC:** coordena instruções.
- **Registradores:** memória ultrarrápida.

🤯 **Curiosidade:** CPUs modernas realizam bilhões de operações por segundo via transistores nanométricos.

## Memória RAM: Espaço Ativo

A memória RAM armazena dados dos aplicativos **em uso**.

- **Volatilidade:** dados perdidos ao desligar.
- **Acesso direto:** leitura veloz em qualquer endereço.
- **Capacidade:** medida em gigabytes (GB).

⚠️ **Atenção:** pouca RAM força o uso de memória virtual em disco, reduzindo a velocidade do sistema.

## A Placa-Mãe

A placa-mãe (motherboard) interliga fisicamente todos os componentes por barramentos e pistas elétricas.

- **Soquete do processador:** fixação e conexão da CPU.
- **Slots de expansão:** encaixes PCIe para placas de vídeo e rede.
- **Chipset:** gerencia o tráfego de dados rápido e periférico.

## Armazenamento: HDD × SSD

| | HDD (disco rígido) | SSD (unidade sólida) |
|---|---|---|
| Tecnologia | Pratos magnéticos móveis e agulha leitora | Memória Flash NAND, sem peças mecânicas |
| Velocidade | Menor | Até 10 vezes superior |
| Impactos | Vulnerável | Resistente |
| Calor e ruído | Maiores | Menor aquecimento, silêncio absoluto |
| Custo por terabyte | Menor | Maior |

**V ou F:** "A RAM armazena documentos e fotos permanentemente, mesmo com o computador desligado." → **FALSO**. A RAM é volátil; o armazenamento permanente cabe a HDD ou SSD.

---

## Classificação dos Periféricos

- **Entrada:** enviam dados externos para processamento (teclado, mouse, scanner).
- **Saída:** exibem ou convertem resultados ao usuário (monitores, caixas de som, impressoras).
- **Entrada e saída (híbridos):** operam em duplo sentido (telas touch, pen drives, headsets).

## Barramentos e Conexões

- **USB (tipo A e C):** dados em alta velocidade e alimentação elétrica.
- **HDMI e DisplayPort:** transmissão de vídeo e áudio digital.
- **RJ-45 (Ethernet):** tráfego veloz em redes locais corporativas.

🔑 **Ponto-chave:** conexões universais simplificam o suporte de TI e evitam incompatibilidade de sinal.

## Associação de Periféricos

| Periférico | Definição |
|---|---|
| Monitor LED | Dispositivo de saída que emite sinal luminoso e visual |
| Scanner de mesa | Dispositivo de entrada que digitaliza documentos impressos |
| Pen drive USB | Dispositivo de entrada e saída com memória Flash portátil |
| Teclado ABNT2 | Dispositivo de entrada com teclas alfanuméricas e símbolos |

## Utilização Correta de Periféricos (complemento da ementa)

- **Retirada segura:** use **Ejetar / Remover hardware com segurança** antes de tirar o pen drive; retirar durante a gravação pode corromper o arquivo.
- **Driver:** programa que permite ao sistema operacional controlar um periférico. Periférico novo ou atualização do SO pode exigir instalar ou atualizar o driver.
- **Impressora padrão:** confira qual impressora está definida como padrão antes de imprimir etiquetas, para o trabalho não sair na impressora errada.
- **Cuidados físicos:** cabos sem dobras nem emendas, conectores encaixados com firmeza e equipamentos longe de umidade.

🔍 **Situação-problema:** o leitor de código de barras parou. Verifique em ordem: **hardware** (cabo e porta, testar em outra porta USB) → **driver** (o dispositivo aparece com alerta no gerenciador de dispositivos?) → **configuração do SO** (o dispositivo está habilitado e configurado?).

---

## O Sistema Operacional

Sem um Sistema Operacional, o computador mais veloz do mundo seria apenas uma caixa de metal sem utilidade prática.

## O Papel Central do SO

O SO é o software gestor que faz a **mediação** entre usuário, programas e circuitos físicos.

- **Gerenciamento de processos:** distribui tempo de CPU entre tarefas.
- **Gestão de memória:** aloca espaço de RAM de modo isolado.
- **Controle de arquivos:** protege e cataloga a gravação nos discos.

## Principais Sistemas do Mercado

- **Microsoft Windows:** padrão predominante em estações de trabalho administrativas e comerciais, com ampla compatibilidade de programas de escritório.
- **Distribuições Linux:** sistemas de código aberto como Ubuntu e Debian, essenciais em servidores corporativos, computação em nuvem e segurança digital.

## Tipos de Sistema Operacional (complemento da ementa)

| Tipo | Onde é usado | Exemplos |
|---|---|---|
| **Desktop** | Computadores do escritório e do laboratório | Windows, Linux, macOS, ChromeOS |
| **Servidor** | Máquinas que hospedam sistemas, arquivos e bancos de dados da empresa | Distribuições Linux, Windows Server |
| **Móvel** | Celulares, tablets e **coletores de dados** do armazém | Android, iOS |

- **Proprietário:** código fechado, mantido por uma empresa, geralmente com licença paga.
- **Código aberto:** código disponível para estudo e adaptação, geralmente gratuito.

🔑 A escolha depende da função do equipamento, do custo e dos programas que a empresa usa.

## Interface Gráfica e Navegação

A **GUI** (Graphical User Interface) converte linhas de comando complexas em janelas, ícones e menus.

- **Área de trabalho (desktop):** espaço visual principal para atalhos de rotina.
- **Barra de tarefas:** exibe aplicações abertas e a bandeja do sistema com relógio e rede.
- **Menu principal:** catálogo de softwares instalados e configurações globais.

## Barra de Ferramentas e Atalhos (complemento da ementa)

No explorador de arquivos, a **barra de ferramentas** reúne os comandos mais usados:

- **Novo** (pasta ou arquivo), **Recortar**, **Copiar**, **Colar**, **Renomear**, **Compartilhar** e **Excluir**.
- **Classificar** e **Exibir:** ordenam por nome, data ou tamanho e mudam a visualização (ícones, lista, detalhes).
- **Barra de endereço:** mostra o caminho da pasta atual. **Caixa de pesquisa:** localiza arquivos na pasta.

| Atalho (Windows) | Função |
|---|---|
| Ctrl + C / Ctrl + X / Ctrl + V | Copiar / Recortar / Colar |
| Ctrl + Z | Desfazer a última ação |
| F2 | Renomear o item selecionado |
| Windows + E | Abrir o explorador de arquivos |
| Alt + Tab | Alternar entre janelas abertas |
| Windows + L | Bloquear a tela |

🔑 Atalhos economizam tempo em tarefas repetitivas, como lançar notas e organizar comprovantes.

## Como o SO Gerencia Recursos

Slide de vídeo: o SO gerencia o hardware por camadas de abstração, dos usuários até o kernel.

---

## Estrutura de Diretórios

Sistemas de arquivos organizam informações em uma **árvore hierárquica**:

- **Diretório raiz:** ponto de partida (`C:\` no Windows ou `/` no Linux).
- **Pastas e subpastas:** divisões lógicas temáticas.
- **Arquivos:** unidades finais com nome, extensão e dados binários.

🔍 **Exemplo de caminho corporativo:** `C:\Empresa\Logistica\Expedicao\2025\`

## Nomenclatura e Boas Práticas

- Evite acentos, espaços e caracteres especiais (`ç`, `/`, `#`, `?`).
- Use datação cronológica invertida (`2025-09-23_Inventario.xlsx`).
- Mantenha controle de versões (`_v01`, `_v02`, `_v03`).

🧠 **Lembre-se:** nomes genéricos como `documento1.docx` geram perda de tempo e erros.

## Extensões Comuns de Arquivo

| Extensão | Uso |
|---|---|
| PDF | Formato portátil inviolável para relatórios e leitura formal |
| DOCX / ODT | Documentos de texto editáveis |
| XLSX / ODS | Planilhas para cálculos e controle financeiro |
| ZIP / RAR | Pacotes compactados com múltiplos arquivos |

## Pesquisa Avançada no SO

- **Curingas:** pesquisar `*.pdf` encontra todos os relatórios em PDF.
- **Filtros por data:** arquivos alterados na última semana.
- **Filtros por tamanho:** isolar arquivos gigantes (`tamanho:>1GB`).

## Compactação

- **Arquivos originais:** ocupam muito espaço e exigem vários envios, sobrecarregando e-mails e servidores.
- **Pacote ZIP/RAR:** algoritmos eliminam redundâncias, reduzem o tamanho e unificam dezenas de pastas em um único arquivo.

**Passos:** 1) Selecionar os arquivos → 2) Botão direito → Compactar para ZIP → 3) Nomear o pacote com data e assunto → 4) No destino, **Extrair tudo**.

**Ordem para compactar e enviar por e-mail:** selecionar → compactar → renomear (`Relatorios_2025.zip`) → anexar.

---

## Diagnóstico Básico de Falhas

- **Superaquecimento:** ventoinhas ruidosas, travamentos súbitos sob carga.
- **Falhas de memória:** telas azuis repentinas e reinicializações forçadas.
- **Corrupção em disco:** lentidão extrema ao abrir pastas ou salvar arquivos.

## Manutenção Preventiva

- **Limpeza:** previne estresse térmico em ventoinhas.
- **Fluxo de ar:** mantenha gabinetes em locais abertos.
- **Proteção:** use nobreaks ou filtros certificados.

⚠️ **Atenção:** evite panos úmidos ou químicos em circuitos eletrônicos.

## Prática: Auditoria de Diretórios

1. **Estrutura:** crie 3 pastas com subpastas.
2. **Renomeação:** padronize arquivos (`AAAA-MM-DD_Projeto_Nome`).
3. **Arquivamento:** compacte itens em pasta zipada.

## Segurança e Proteção de Dados

- **Rotina de backup:** cópias periódicas em discos externos ou nuvem evitam perda irrecuperável por pane física ou ataque cibernético.
- **Permissões e perfis:** contas com privilégios limitados protegem arquivos de sistema contra exclusões acidentais ou malware.

## Dilema Técnico e Produtivo

Um colega salva todos os relatórios na Área de Trabalho e nunca compacta arquivos antes de enviá-los por e-mail. Impactos: lentidão na inicialização e poluição visual; risco de perda de arquivos sem histórico de versão; sobrecarga de e-mail e servidores; falta de profissionalismo e dificuldade para substituições no time.

## Avaliação de Síntese

| Pergunta | Resposta |
|---|---|
| Qual componente executa os cálculos e processa as instruções? | O processador (CPU) |
| Principal vantagem de velocidade do SSD sobre o HDD? | Memória Flash eletrônica sem peças móveis, leitura e escrita ultrarrápidas |
| Por que o SO é essencial para os aplicativos? | Gerencia o hardware e fornece a interface para execução dos programas |

## Síntese e Próximos Passos

Dominar hardware, periféricos e sistemas operacionais garante produtividade e rigor técnico. Próxima aula: Internet, navegadores e pesquisa.

---

> **Notas da extração:** os exemplos em fonte de código dos slides 25, 26 e 28 estão em branco no próprio PDF e foram completados aqui (`C:\`, `/`, caminho de exemplo, nomes de arquivo, `*.pdf`, `tamanho:>1GB`).

> **Notas de conformidade com a ementa:** as seções "Utilização Correta de Periféricos", "Tipos de Sistema Operacional" e "Barra de Ferramentas e Atalhos" não estão no PDF e foram acrescentadas para cobrir o domínio 4 da `EMENTA-CHALKIE-AI.md` (utilização de periféricos; tipos de SO; barra de ferramentas) e a situação-problema 2.

**Fonte:** Aula 2 — Hardware, Periféricos e Sistemas Operacionais · **Curso:** Assistente de Operações Logísticas · **UC:** Introdução à TIC · **SENAI**
