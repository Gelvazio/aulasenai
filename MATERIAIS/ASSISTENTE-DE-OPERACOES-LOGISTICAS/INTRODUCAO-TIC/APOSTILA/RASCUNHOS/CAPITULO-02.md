# Capítulo 02 — Hardware, Periféricos e Sistemas Operacionais

- **Aula:** 02
- **Capacidade:** C4

## Teoria

### O computador como canal de trabalho

No capítulo anterior, vimos que o **canal** é o meio por onde a mensagem passa. No armazém da
**Distribuidora Vale Norte**, boa parte das mensagens passa pelo computador: lançamento de notas,
etiquetas, inventário e e-mails para transportadoras. Se o equipamento falha, surge **ruído técnico**
— e a operação para.

> 🎯 **Objetivos do capítulo:** diferenciar **hardware, software e periféricos**, entender o papel
> do **sistema operacional** e organizar **pastas e arquivos** com segurança.

### Hardware e software

| | Hardware (o corpo) | Software (a mente) |
|---|---|---|
| O que é | Partes físicas: peças, cabos, circuitos | Programas e instruções |
| Exemplos | Processador, memória, disco, monitor | Windows, navegador, planilha, sistema de estoque |
| Sem o outro | Fica parado, sem utilidade | Não tem onde ser executado |

Desde 1945, os computadores seguem a ideia de **John von Neumann**: os programas e os dados ficam
na **mesma memória**, e o processador busca, entende e executa as instruções uma a uma.

### Os principais componentes

- **Processador (CPU):** o "cérebro". Faz os cálculos (ULA) e coordena as instruções (UC). Executa
  bilhões de operações por segundo.
- **Memória RAM:** guarda o que está **em uso agora**. É rápida, mas **volátil**: ao desligar, perde
  tudo. Pouca RAM deixa o computador lento quando muitos programas estão abertos.
- **Placa-mãe:** liga todas as peças. Tem o soquete do processador, os slots de expansão e o
  chipset, que controla o tráfego de dados.
- **Armazenamento:** guarda os arquivos de forma **permanente**.

| | HDD (disco rígido) | SSD (unidade sólida) |
|---|---|---|
| Tecnologia | Discos magnéticos que giram | Memória eletrônica (Flash), sem peças móveis |
| Velocidade | Menor | Até 10 vezes maior |
| Resistência a impacto | Baixa | Alta |
| Custo por TB | Menor | Maior |

⚠️ **Atenção:** a RAM **não** guarda arquivos depois que o computador é desligado. Quem guarda é o
HDD ou o SSD. Por isso, salve o trabalho antes de desligar.

### Periféricos

Periféricos são os equipamentos que se ligam ao computador para **entrada** ou **saída** de dados.

| Tipo | Função | Exemplos no armazém |
|---|---|---|
| **Entrada** | Enviam dados ao computador | Teclado, mouse, **leitor de código de barras**, scanner |
| **Saída** | Mostram ou entregam o resultado | Monitor, **impressora de etiquetas**, caixa de som |
| **Entrada e saída** | Fazem os dois | Tela touch, pen drive, headset, coletor de dados |

**Conexões mais comuns:** USB (tipos A e C) para dados e energia; HDMI e DisplayPort para vídeo;
RJ-45 (cabo de rede) para a rede da empresa.

**Uso correto dos periféricos:**

- Use **Ejetar / Remover hardware com segurança** antes de tirar o pen drive.
- **Driver** é o programa que permite ao sistema controlar o periférico; equipamento novo pode
  exigir instalar ou atualizar o driver.
- Confira a **impressora padrão** antes de imprimir etiquetas.
- Cabos sem dobras e equipamentos longe de umidade.

🔍 **Situação-problema:** o leitor de código de barras parou de funcionar. Verifique nesta ordem:
**hardware** (cabo e porta; testar outra porta USB) → **driver** (o aparelho aparece com alerta no
Gerenciador de Dispositivos?) → **configuração do sistema** (o dispositivo está habilitado?).

### O sistema operacional (SO)

Sem sistema operacional, o computador é só uma caixa de metal. O SO faz a **mediação** entre o
usuário, os programas e o hardware:

- **Gerencia processos:** divide o tempo do processador entre os programas abertos.
- **Gerencia a memória:** reserva espaço da RAM para cada programa.
- **Gerencia arquivos:** organiza e protege o que é gravado no disco.

| Tipo de SO | Onde é usado | Exemplos |
|---|---|---|
| **Desktop** | Computadores do escritório | Windows, Linux, macOS, ChromeOS |
| **Servidor** | Máquinas que guardam sistemas e bancos de dados da empresa | Linux, Windows Server |
| **Móvel** | Celulares, tablets e **coletores de dados** | Android, iOS |

- **Proprietário:** código fechado, geralmente pago (ex.: Windows).
- **Código aberto:** código disponível para estudo e adaptação, geralmente gratuito (ex.: Linux).

A **interface gráfica** (janelas, ícones, menus) facilita o uso: área de trabalho, barra de tarefas
e menu Iniciar.

| Atalho (Windows) | Função |
|---|---|
| Ctrl + C / Ctrl + X / Ctrl + V | Copiar / Recortar / Colar |
| Ctrl + Z | Desfazer |
| F2 | Renomear |
| Windows + E | Abrir o Explorador de Arquivos |
| Alt + Tab | Alternar entre janelas |
| Windows + L | Bloquear a tela (ao sair da mesa) |

### Pastas, arquivos e boas práticas

Os arquivos ficam organizados em uma **árvore de pastas**, a partir da raiz (`C:\` no Windows ou
`/` no Linux).

🔍 **Exemplo de caminho:** `C:\ValeNorte\Logistica\Expedicao\2026\`

**Boas práticas de nomes:**

- Evite acentos, espaços e símbolos (`ç`, `/`, `#`, `?`).
- Use a data invertida no início: `2026-10-03_Inventario_CorredorB.xlsx`.
- Controle versões: `_v01`, `_v02`.
- Nunca use nomes genéricos como `documento1.docx`.

| Extensão | Uso |
|---|---|
| `.pdf` | Relatórios e documentos para leitura e envio |
| `.docx` / `.odt` | Textos editáveis |
| `.xlsx` / `.ods` | Planilhas |
| `.zip` | Vários arquivos compactados em um só |

**Compactar para enviar por e-mail:** selecionar os arquivos → botão direito → **Compactar para
ZIP** → nomear com data e assunto (`2026-10_Romaneios.zip`) → anexar. No destino, use **Extrair
tudo**.

**Pesquisa no Explorador:** `*.pdf` encontra todos os PDFs; dá para filtrar por data de modificação
e por tamanho.

### Cuidados com o equipamento e com os dados

- **Sinais de problema:** ventoinha barulhenta e travamentos (superaquecimento), tela azul e
  reinícios (memória), lentidão para abrir pastas (disco).
- **Manutenção preventiva:** limpeza sem panos úmidos, boa ventilação e uso de nobreak.
- **Backup:** cópias periódicas na nuvem ou em disco externo.
- **Permissões:** cada usuário acessa só o que precisa, protegendo arquivos do sistema.

## Vídeos

- [Informática para Concursos — Hardware, software e periféricos](https://www.youtube.com/watch?v=YrDLtdP4LI4) — 14:37 — Newbie Aulas
- [O que é um sistema operacional e exemplos (Informática Básica)](https://www.youtube.com/watch?v=yjfB-asZVF4) — 04:59 — Eu TI Ensino
- [Organizando arquivos, pastas e subpastas no computador](https://www.youtube.com/watch?v=yzIDFLSVa6U) — 08:28 — Professora Marcia

## Exercícios

### ITEM 1
- **Capacidade:** C4
- **Contexto:** No setor de expedição da Vale Norte há: computador, sistema de estoque, leitor de código de barras, impressora de etiquetas, Windows, planilha de controle e pen drive.
- **Comando:** Separe os itens em hardware e software e, entre os hardwares, classifique os periféricos como entrada, saída ou entrada e saída.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C4
- **Contexto:** Um conferente digitou a contagem do inventário durante duas horas e a energia acabou antes de ele salvar. Ao religar, a contagem tinha sumido.
- **Comando:** Explique, usando os conceitos de memória RAM e armazenamento (HDD/SSD), por que os dados foram perdidos e o que ele deveria ter feito.
- **Linhas:** 4

### ITEM 3
- **Capacidade:** C4
- **Contexto:** O leitor de código de barras do recebimento parou de funcionar no meio do turno.
- **Comando:** Descreva, em ordem, as três verificações que devem ser feitas (hardware, driver e configuração do sistema) e o que observar em cada uma.
- **Linhas:** 4

### ITEM 4
- **Capacidade:** C4
- **Contexto:** A pasta do setor tem arquivos chamados "planilha nova.xlsx", "inventário final FINAL (2).xlsx" e "documento1.docx", todos soltos na Área de Trabalho.
- **Comando:** Proponha uma estrutura de pastas para o setor e renomeie os três arquivos seguindo as boas práticas (data invertida, sem acentos e espaços, versão).
- **Linhas:** 5

### ITEM 5
- **Capacidade:** C4
- **Contexto:** A transportadora pediu os 15 romaneios da semana em um único e-mail, mas os arquivos juntos são grandes demais para anexar um a um.
- **Comando:** Descreva o passo a passo para compactar os arquivos, nomear o pacote corretamente e explicar à transportadora como abri-lo.
- **Linhas:** 4

## Resumo

- **Hardware** é a parte física; **software** são os programas. Um não funciona sem o outro.
- O **processador** executa as instruções; a **RAM** guarda o que está em uso e perde tudo ao desligar; **HDD/SSD** guardam os arquivos de forma permanente.
- **Periféricos** são de entrada, saída ou entrada e saída; precisam de **driver** e de uso correto.
- O **sistema operacional** gerencia processos, memória e arquivos; existem SOs de desktop, servidor e móveis, proprietários ou de código aberto.
- Pastas organizadas e nomes padronizados (`AAAA-MM-DD_Assunto_v01`) evitam perda de tempo e de arquivos.
- **Compactar**, fazer **backup** e cuidar do equipamento são rotinas do profissional.

## Glossário

- **Hardware:** parte física do computador (peças, cabos e circuitos).
- **Software:** programas e instruções executados pelo computador.
- **Processador (CPU):** componente que executa os cálculos e as instruções.
- **Memória RAM:** memória rápida e volátil que guarda os dados em uso.
- **SSD:** unidade de armazenamento eletrônica, sem peças móveis, mais rápida que o HDD.
- **Periférico:** equipamento externo de entrada e/ou saída de dados.
- **Driver:** programa que permite ao sistema operacional controlar um periférico.
- **Sistema operacional:** software que gerencia o hardware e serve de base para os outros programas.
- **Compactação:** redução do tamanho de arquivos, reunindo-os em um único pacote (ZIP).
- **Backup:** cópia de segurança dos arquivos.
