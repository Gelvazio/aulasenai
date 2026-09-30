# INFORMÁTICA BÁSICA — Hardware, Periféricos e Sistemas Operacionais

> Fonte para IA gerar slides. UC **Introdução à TIC (40 h)** — Curso **Assistente de Operações Logísticas** (SENAI). Domínio da ementa **4.7 Informática: hardware e sistema operacional**. Base: aula "2 - Hardware, Periféricos e Sistemas Operacionais".

## 0. PROMPT PARA A IA

```text
Crie slides em português do Brasil usando SOMENTE este arquivo.
- Siga a seção 4: cada bloco "####" = 1 slide, na ordem.
- Título do bloco = título do slide; tópicos = texto do slide (máx. 6, curtos).
- "Visual" orienta imagem/ícone/diagrama; "Notas" vai para as anotações do orador.
- [PERGUNTA] e [RESPOSTA] ficam em slides seguidos.
- Público: iniciantes de curso técnico de logística; tom claro e profissional,
  com exemplos de armazém/centro de distribuição.
- Visual: 16:9, fundo azul-escuro, títulos dourados, texto branco, destaques verde-água.
- Não invente conteúdo técnico.
```

## 1. IDENTIFICAÇÃO

- **Capacidade:** reconhecer características e aplicações de hardware e software dos sistemas informatizados usados na indústria.
- **Conteúdos:** hardware e componentes; processadores e periféricos; tipos e funções do SO; barra de ferramentas; área de trabalho; organização, pesquisa e compactação de arquivos.
- **Socioemocionais:** análise de problemas; cooperação; abertura à mudança.
- **Aula anterior:** comunicação profissional. **Próxima:** Internet e navegadores.
- **Duração:** 3 h a 4 h.

## 2. OBJETIVOS

1. Diferenciar hardware, software e periféricos.
2. Identificar CPU, RAM, placa-mãe e armazenamento.
3. Classificar periféricos e reconhecer conexões.
4. Compreender o papel e os tipos de Sistema Operacional.
5. Organizar, pesquisar e compactar arquivos com padrão profissional.
6. Reconhecer falhas e aplicar manutenção preventiva e backup.

## 3. GLOSSÁRIO

| Termo | Definição |
|---|---|
| Hardware | Parte física: peças, cabos, circuitos |
| Software | Programas e instruções executados pela CPU |
| Periférico | Aparelho externo de entrada/saída de dados |
| CPU | Processador: busca, decodifica e executa instruções |
| RAM | Memória temporária e volátil |
| Placa-mãe | Interliga todos os componentes |
| HDD / SSD | Disco mecânico / memória Flash sem partes móveis |
| SO | Gerencia o hardware e faz a mediação com o usuário |
| Diretório | Pasta que organiza arquivos |
| Curinga | `*` substitui caracteres numa pesquisa |
| Compactação | Reduz e agrupa arquivos (`.zip`) |
| Backup | Cópia de segurança |

## 4. ROTEIRO SLIDE A SLIDE

### Parte 1 — Abertura

#### 1. Hardware, Periféricos e Sistemas Operacionais (capa)
- Fundamentos da computação aplicada ao contexto profissional
- Introdução à TIC · Assistente de Operações Logísticas
*Visual:* computador no escritório de um centro de distribuição.

#### 2. O Computador como Canal
- Como as partes físicas e lógicas cooperam para uma comunicação sem ruídos?
*Notas:* pergunta disparadora; ouvir a turma.

#### 3. Objetivos da Aula
- Diferenciar hardware, software e periféricos
- Compreender o papel mediador do SO
- Organizar arquivos e equipamentos com segurança
*Notas:* apresentar as metas; elas serão retomadas na síntese final.

#### 4. Ponte com a Comunicação
- Aula anterior: emissor, receptor, mensagem, canal, código, ruído
- No trabalho digital, o **computador é o canal**
- 🧠 Falhas físicas ou do sistema geram **ruído**
*Notas:* computador do expedidor trava → a nota não chega ao transportador.

#### 5. Diagnóstico [PERGUNTA]
- Cabo de rede com mau contato distorce um relatório. Que elemento foi afetado?
- A) Feedback · B) Emissor · C) Código · D) Canal com ruído
*Notas:* votação com as mãos ou aplicativo de quiz antes de revelar.

#### 6. Diagnóstico [RESPOSTA]
- ✅ **D) Canal de transmissão com ruído** — o cabo é o canal; o mau contato é o ruído
*Notas:* reforçar: problema de hardware = ruído no canal de comunicação.

#### 7. Vocabulário Fundamental
- **Hardware:** peças, cabos, circuitos
- **Software:** programas executados pela CPU
- **Periféricos:** entrada/saída de dados
- **Diretório:** pastas que catalogam arquivos
*Visual:* 4 cartões com ícones.

*Notas:* esses quatro termos serão usados durante toda a aula.

### Parte 2 — Hardware

#### 8. Hardware e Software Integrados
- **Hardware (corpo):** tangível; sem comandos, fica inerte
- **Software (mente):** instruções que orientam a máquina
*Notas:* o leitor de código de barras só funciona com o sistema de estoque.

#### 9. A Máquina de Von Neumann
- Proposta em **1945**: dados e programas na mesma memória
- **CPU** busca, decodifica e executa
- **Memória principal** guarda instruções
- **Barramentos** levam sinais entre as partes
*Visual:* Entrada → CPU ⇄ Memória → Saída.

#### 10. O Processador (CPU)
- Cérebro do computador
- **ULA:** cálculos e lógica · **UC:** coordena instruções
- **Registradores:** memória ultrarrápida
- 🤯 Bilhões de operações por segundo
*Notas:* mostrar o modelo do processador em Configurações > Sistema > Sobre.

#### 11. Memória RAM
- Guarda dados dos programas **em uso**
- **Volátil:** apaga ao desligar
- **Acesso direto:** leitura rápida em qualquer endereço
- Medida em **GB**
- ⚠️ Pouca RAM → uso de disco → lentidão
*Visual:* pente de memória RAM ao lado de uma mesa de trabalho.
*Notas:* RAM é a mesa de trabalho; o disco é o arquivo.

#### 12. A Placa-Mãe
- Interliga tudo por barramentos e trilhas
- **Soquete:** conecta a CPU
- **Slots PCIe:** placas de vídeo e rede
- **Chipset:** gerencia o tráfego de dados
*Notas:* a placa-mãe é o centro de distribuição do computador: tudo passa por ela.

#### 13. HDD × SSD
| | HDD | SSD |
|---|---|---|
| Tecnologia | Pratos magnéticos | Memória Flash |
| Velocidade | Menor | Até 10× maior |
| Impactos | Sensível | Resistente |
| Calor/ruído | Maior | Menor, silencioso |
| Custo/TB | Menor | Maior |
*Notas:* em coletores e notebooks do armazém, o SSD resiste a quedas.

#### 14. Verificação [PERGUNTA]
- "A RAM guarda arquivos **permanentemente**, mesmo desligada." 👍 V ou 👎 F?
*Notas:* pedir que um estudante justifique a resposta antes de revelar.

#### 15. Verificação [RESPOSTA]
- ✅ **FALSO** — a RAM é volátil; o permanente fica no HDD/SSD
*Notas:* por isso é preciso salvar sempre.

### Parte 3 — Periféricos

#### 16. Classificação dos Periféricos
- **Entrada:** teclado, mouse, scanner, leitor de código de barras
- **Saída:** monitor, caixa de som, impressora de etiquetas
- **Entrada e saída:** tela touch, pen drive, headset
*Visual:* três colunas com setas: → computador, computador →, ⇄.
*Notas:* perguntar quais periféricos a turma já usou no armazém (coletor, leitor, impressora térmica).

#### 17. Conexões
- **USB-A e USB-C:** dados e energia
- **HDMI / DisplayPort:** vídeo e áudio
- **RJ-45:** rede cabeada
- 🔑 Padrões evitam incompatibilidade
*Visual:* fotos das portas lado a lado.
*Notas:* mostrar fisicamente as portas de um computador do laboratório.

#### 18. Associação [PERGUNTA]
- A) Monitor LED · B) Scanner · C) Pen drive · D) Teclado ABNT2
- 1) Entrada com teclas · 2) Digitaliza papéis · 3) Saída visual · 4) Entrada/saída com Flash
*Notas:* atividade em duplas, no quadro ou em aplicativo de quiz.

#### 19. Associação [RESPOSTA]
- ✅ 1-D · 2-B · 3-A · 4-C
*Notas:* ABNT2 é o teclado brasileiro, com Ç.

#### 20. Uso Correto de Periféricos (complemento)
- Use **Ejetar** antes de retirar o pen drive
- Mantenha **drivers** atualizados
- Confira a impressora padrão antes de imprimir etiquetas

*Notas:* retirar o pen drive durante a gravação pode corromper o arquivo.

### Parte 4 — Sistema Operacional

#### 21. O Sistema Operacional
- "Sem SO, o computador mais veloz seria só uma caixa de metal."
*Notas:* slide de impacto para iniciar a parte de software de sistema.

#### 22. O Papel do SO
- **Mediação** entre usuário, programas e hardware
- **Processos:** divide o tempo da CPU
- **Memória:** reserva RAM para cada programa
- **Arquivos:** organiza a gravação nos discos
- **Dispositivos:** controla periféricos
*Visual:* camadas Usuário → Aplicativos → SO → Hardware.
*Notas:* o SO é o gerente do armazém: decide quem usa cada recurso e quando.

#### 23. Tipos de SO (complemento)
- **Desktop:** Windows, Linux, macOS
- **Servidor:** Linux, Windows Server
- **Móvel:** Android, iOS (coletores de dados)
- Proprietário × código aberto
*Notas:* coletores de dados do armazém costumam usar sistema operacional móvel.

#### 24. Principais Sistemas do Mercado
- **Windows:** predominante no escritório
- **Linux (Ubuntu, Debian):** código aberto; servidores e nuvem
*Notas:* a escolha depende da função, do custo e dos programas usados pela empresa.

#### 25. Interface Gráfica
- **GUI:** janelas, ícones e menus
- **Área de trabalho:** atalhos de rotina
- **Barra de tarefas:** apps abertos, relógio, rede
- **Menu Iniciar:** programas e configurações
*Visual:* área de trabalho com setas numeradas para cada elemento.
*Notas:* cada estudante localiza esses elementos no computador do laboratório.

#### 26. Barra de Ferramentas e Atalhos (complemento)
- Explorador: Novo, Copiar, Colar, Renomear, Excluir
- **Ctrl+C / Ctrl+V / Ctrl+X / Ctrl+Z**
- **Windows+E:** explorador · **Alt+Tab:** alternar janelas
*Notas:* atalhos economizam tempo em tarefas repetitivas, como lançar notas.

#### 27. Como o SO Gerencia Recursos (vídeo)
- Camadas: usuário → aplicativos → kernel → hardware
- https://www.youtube.com/watch?v=LrAXqg6Xn_U
*Notas:* depois, perguntar que recurso o SO dividiu.

### Parte 5 — Arquivos e Pastas

#### 28. Estrutura de Diretórios
- Árvore hierárquica
- **Raiz:** `C:\` (Windows) ou `/` (Linux)
- **Pastas e subpastas** por tema
- **Arquivo:** nome + extensão
- 🔍 `C:\Empresa\Logistica\Expedicao\2025\`
*Visual:* árvore Disco → Documentos/Imagens → arquivos.
*Notas:* mostrar o caminho completo na barra de endereço do explorador de arquivos.

#### 29. Nomenclatura Profissional
- Evite acentos, espaços e símbolos (`ç`, `/`, `#`)
- Data invertida: `2025-09-23_Inventario.xlsx`
- Versões: `_v01`, `_v02`
- 🧠 Evite `documento1.docx`, `final_final.xlsx`
*Visual:* nomes certos ✅ × errados ❌.
*Notas:* a data invertida deixa os arquivos em ordem cronológica automaticamente.

#### 30. Extensões Comuns
- **PDF:** documento formal
- **DOCX/ODT:** texto · **XLSX/ODS:** planilha
- **ZIP/RAR:** compactado · **JPG/PNG:** imagem
- **CSV:** dados exportados de sistemas (WMS)
*Notas:* relatórios de sistemas de gestão de armazém costumam sair em CSV ou XLSX.

#### 31. Pesquisa Avançada
- **Curinga:** `*.pdf` acha todos os PDFs
- **Data:** alterados na última semana
- **Tamanho:** `tamanho:>1GB`
*Notas:* demonstrar ao vivo.

### Parte 6 — Compactação

#### 32. Como Funciona a Compactação
- Originais: muito espaço e vários envios
- ZIP/RAR: remove redundâncias e junta tudo em **um arquivo**
*Notas:* útil para enviar vários comprovantes de entrega em um único anexo.

#### 33. Passos para Compactar
1. Selecionar os arquivos
2. Botão direito → **Compactar para ZIP**
3. Nomear com data e assunto
4. No destino: **Extrair tudo**
*Notas:* demonstrar no computador do professor e pedir que a turma repita.

#### 34. Ordem de Compactação [PERGUNTA]
- Ordene: ( ) Compactar para ZIP ( ) Selecionar arquivos ( ) Anexar ao e-mail ( ) Renomear `Relatorios_2025.zip`
*Notas:* um minuto para as duplas ordenarem os cartões.

#### 35. Ordem de Compactação [RESPOSTA]
- ✅ Selecionar → Compactar → Renomear → Anexar

*Notas:* sem selecionar primeiro, o menu não oferece a opção de compactar.

### Parte 7 — Manutenção e Segurança

#### 36. Diagnóstico de Falhas
- **Superaquecimento:** ventoinha ruidosa, travamentos
- **Memória:** telas azuis, reinicializações
- **Disco:** lentidão ao abrir e salvar
*Visual:* ícones de alerta: termômetro, memória e disco.
*Notas:* análise de problemas: descrever o sintoma ao suporte.

#### 37. Manutenção Preventiva
- Limpeza contra poeira
- Gabinete ventilado
- Nobreak ou filtro de linha
- ⚠️ Nada de pano úmido ou químicos em circuitos
*Notas:* ambientes de armazém têm muita poeira; a limpeza deve ser periódica.

#### 38. Segurança e Backup
- Backup em disco externo ou nuvem
- Contas com privilégio limitado
- Regra **3-2-1:** 3 cópias, 2 mídias, 1 fora do local
*Visual:* cadeado, nuvem e disco externo.
*Notas:* conectar com a aula futura de Segurança da Informação.

### Parte 8 — Prática e Síntese

#### 39. Prática: Auditoria de Diretórios
1. Criar `Recebimento`, `Armazenagem`, `Expedicao` com subpastas
2. Renomear no padrão `AAAA-MM-DD_Projeto_Nome`
3. Compactar uma pasta em `.zip`
4. Localizar os `.pdf` com `*`
*Notas:* individual, 20–30 min.

#### 40. Dilema [PERGUNTA]
- Colega salva tudo na Área de Trabalho e nunca compacta anexos. Que impactos causa?
*Notas:* debate em grupos de três por cinco minutos; cada grupo apresenta um impacto.

#### 41. Dilema [RESPOSTA]
- ✅ Lentidão e poluição visual
- ✅ Perda de arquivos sem versões
- ✅ Sobrecarga de e-mail e servidores
- ✅ Falta de profissionalismo; dificulta substituições
*Notas:* cooperação: organizar bem os arquivos ajuda toda a equipe a trabalhar.

#### 42. Síntese [PERGUNTA]
1. Qual componente processa as instruções?
2. Vantagem do SSD sobre o HDD?
3. Por que o SO é essencial?
*Notas:* respostas individuais por escrito ou em quiz; retomar os objetivos do slide 3.

#### 43. Síntese [RESPOSTA]
1. ✅ A **CPU**
2. ✅ Memória Flash sem partes móveis: muito mais rápida
3. ✅ Gerencia o hardware e oferece interface aos programas

#### 44. Encerramento
- Hardware, periféricos e SO = produtividade e rigor técnico
- Próxima aula: Internet, navegadores e protocolos
- 🧠 Máquina organizada é a ferramenta do profissional
*Visual:* computador conectado a um globo (internet).
*Notas:* agradecer, recolher a atividade prática e antecipar o tema da próxima aula.

## 5. GABARITO

| Atividade | Slides | Resposta |
|---|---|---|
| Diagnóstico | 5–6 | D |
| V ou F (RAM) | 14–15 | Falso |
| Associação | 18–19 | 1-D, 2-B, 3-A, 4-C |
| Compactação | 34–35 | Selecionar, compactar, renomear, anexar |
| Síntese | 42–43 | CPU; Flash; gerencia hardware |

## 6. QUESTÕES EXTRAS (quiz)

1. Periférico de saída? a) Scanner b) Teclado c) **Impressora de etiquetas** d) Leitor de código de barras
2. Dados da RAM na falta de energia? a) Vão para o SSD b) **São perdidos** c) Vão para a nuvem
3. Nome correto? a) `documento final.docx` b) `relatório#2.xlsx` c) **`2025-09-23_Inventario_v02.xlsx`**
4. Pesquisar todas as planilhas? a) `planilha` b) **`*.xlsx`** c) `#.xlsx`
5. Rede cabeada? a) HDMI b) USB-C c) **RJ-45**
6. Tela azul frequente indica falha de? a) Mouse b) **Memória** c) Monitor
7. Função que NÃO é do SO? a) Gerenciar memória b) Controlar arquivos c) **Redigir o relatório de expedição**

## 7. NOTAS DA FONTE

- Slides 20, 23 e 26 foram **acrescentados** para cobrir a ementa.
- Exemplos dos slides 28, 29 e 31 estavam **em branco no PDF** e foram completados.
- O slide 27 era só um vídeo no original.
