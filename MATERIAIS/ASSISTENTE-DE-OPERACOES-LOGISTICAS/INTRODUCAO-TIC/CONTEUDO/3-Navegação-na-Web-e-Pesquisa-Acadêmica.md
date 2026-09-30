# Aula 3 — Navegação na Web e Pesquisa Acadêmica

Métodos estratégicos de busca, validação e integridade digital.

> Conteúdo extraído de `3-Navegação-na-Web-e-Pesquisa-Acadêmica.pdf` (41 slides). UC Introdução à TIC — Assistente de Operações Logísticas (SENAI).

---

## A Web Contém Tudo?

Milhões de páginas são publicadas diariamente, mas como você separa fatos confiáveis de dados manipulados em frações de segundo?

## Objetivos da Aula

- Dominar **operadores avançados** em motores de busca.
- Aplicar **critérios rigorosos de checagem** de fontes.
- Empregar normas de **direitos autorais** e combate ao **plágio**.

## Vocabulário Fundamental

| Termo | Definição |
|---|---|
| Navegador | Software cliente que requisita, renderiza e exibe páginas da web |
| Internet | Infraestrutura global de redes de computadores interconectadas |
| Pesquisa | Processo sistemático e metódico de investigação e validação |
| Plágio | Apropriação indevida de obra, conceito ou texto de terceiros |

## Conexão com as Aulas Anteriores

O hardware processa dados e o sistema operacional gerencia conexões e armazenamento. Sem drivers de rede ou RAM adequada, a navegação torna-se instável.

🧠 **Lembre-se:** o navegador é um software executado sobre as instruções do sistema operacional.

**Quiz de revisão:** o componente que gerencia o acesso das aplicações aos recursos de hardware e à rede é o **Sistema Operacional**.

---

## Internet × World Wide Web

- **Internet:** infraestrutura física global — cabos submarinos, roteadores, servidores e protocolos (TCP/IP) que conectam milhões de dispositivos.
- **World Wide Web (WWW):** serviço de compartilhamento de documentos hipertexto (HTML, HTTP) que trafega **sobre** a Internet, criado por **Tim Berners-Lee em 1989**.

## Marcos da Conectividade Global

| Ano | Marco |
|---|---|
| 1969 | Criação da ARPANET, com arquitetura militar e acadêmica |
| 1983 | Adoção do protocolo padrão TCP/IP interconectando redes |
| 1989 | Invenção da World Wide Web no laboratório CERN |
| 1993 | Lançamento do navegador gráfico Mosaic para o público |

## Como Funciona o Navegador

- **Requisição HTTP/HTTPS** enviada ao servidor de destino.
- **Tradução DNS**, que converte nomes legíveis em endereços IP.
- **Renderização** de códigos HTML, estilização CSS e scripts JS.

🔑 **Ponto-chave:** o motor de renderização converte texto e folhas de estilo na página final que você lê.

## Recursos Avançados de Navegação

- **Cache:** armazena arquivos para carregamento veloz.
- **Cookies:** salvam preferências e logins.
- **Extensões:** bloqueiam scripts e gerenciam senhas.

⚠️ **Atenção:** limpar cookies e cache resolve erros e remove rastreadores.

## Navegação Anônima e Rastreamento

A janela anônima impede que histórico, formulários e cookies fiquem registrados **no armazenamento local**. Contudo, não oculta seus passos: provedores, administradores de rede e servidores continuam registrando seu IP.

⚠️ **Atenção:** modo anônimo não garante invisibilidade nem substitui antivírus.

**V ou F:** "A guia anônima garante anonimato absoluto contra o monitoramento da rede da empresa." → **FALSO**. Ela apenas não salva dados localmente; o tráfego continua visível para administradores e provedores.

---

## Mecanismos dos Motores de Busca

Google e Bing não pesquisam a Web inteira em tempo real; consultam um catálogo previamente estruturado em três fases:

1. **Rastreamento:** robôs (spiders) percorrem links e coletam páginas ativas.
2. **Indexação:** conteúdos e palavras-chave são categorizados em base de dados.
3. **Ranqueamento:** algoritmos ordenam os resultados por autoridade e pertinência.

## Operadores Booleanos de Busca

- **AND:** exige ambos os termos na página.
- **OR:** localiza qualquer um dos termos indicados.
- **NOT (-):** exclui termos irrelevantes.

🔍 **Exemplo:** `robótica AND automação -brinquedos` filtra resultados técnicos industriais.

## Operadores Avançados e Filtros

- **Aspas (" "):** busca a frase exata, sem variações.
- **site:** delimita a busca a um domínio (`site:gov.br` ou `site:edu.br`).
- **filetype:** filtra extensões específicas (`filetype:pdf`).

🔍 **Exemplo:** `"indústria 4.0" site:gov.br filetype:pdf` localiza relatórios técnicos oficiais em PDF.

**Lacunas:** para encontrar relatórios em PDF publicados por universidades, usa-se `filetype:pdf` para a extensão e `site:.edu.br` para o domínio acadêmico.

## Repositórios de Pesquisa Acadêmica

- **SciELO e Periódicos CAPES:** bases consagradas de literatura científica na América Latina e no Brasil, com indexação rigorosa.
- **Google Acadêmico:** rastreia teses, livros didáticos e artigos técnicos com métricas de citação.

## Critérios de Checagem: o Método CRAAP

- **Atualidade (Currency):** quando o material foi publicado ou revisado?
- **Relevância (Relevance):** atende à complexidade do seu relatório?
- **Autoridade (Authority):** quem é o autor e qual sua filiação institucional?
- **Precisão e Propósito (Accuracy/Purpose):** as fontes são comprovadas e há viés comercial?

## Avaliando Fontes na Prática

| Fonte confiável | Fonte duvidosa |
|---|---|
| Autoria declarada, filiação universitária, referências auditáveis e revisão por especialistas | Texto anônimo em blog comercial, excesso de anúncios, manchetes sensacionalistas e sem dados comprovados |

## Download e Armazenamento Seguro

- **Validação:** desconfie de executáveis disfarçados (`.exe`, `.bat`, `.scr`).
- **Antivírus:** analise downloads antes de abrir.
- **Organização:** use pastas com nomes semânticos.

⚠️ **Atenção:** evite arquivos com extensões duplas, como `relatório.pdf.exe`.

---

## Direitos Autorais e a Lei 9.610/98

Toda criação intelectual — texto, código, imagem ou áudio — é protegida por lei. Estar disponível na Web **não** significa ser de domínio público. Usar material protegido sem autorização viola a legislação autoral civil e penal.

🧠 **Lembre-se:** o autor possui direitos morais inalienáveis sobre sua produção.

## Licenças Creative Commons

| Sigla | Significado |
|---|---|
| BY (Atribuição) | Sempre dê crédito ao autor original |
| NC (Não Comercial) | Uso e adaptação restritos a fins sem lucro |
| ND (Sem Derivações) | Proíbe modificações; compartilhe a obra original |
| SA (Compartilha Igual) | Obras derivadas devem usar a mesma licença |

## Combate ao Plágio Acadêmico

- **Plágio direto:** cópia literal sem fonte.
- **Plágio mosaico:** mistura trechos sem referências.
- **Paráfrase indevida:** reescrever ideias omitindo o autor.

🔑 **Ponto-chave:** dados que não são de conhecimento geral nem de sua autoria exigem citação.

## Normas ABNT: Citação Correta

- **Citação direta curta:** transcreve exatamente as palavras do autor (até 3 linhas), entre aspas duplas, seguida de autor, ano e página. Ex.: "A informação é o combustível da indústria" (SILVA, 2023, p. 15).
- **Citação indireta:** expressa a ideia do autor com suas palavras (paráfrase), sem aspas, indicando autor e ano. Ex.: De acordo com Silva (2023), os fluxos de dados sustentam a produção.

## Terminologia de Integridade

| Termo | Definição |
|---|---|
| Paráfrase | Reescrita com outras palavras preservando a citação do autor |
| Domínio público | Obras sem exclusividade de direitos patrimoniais, de livre uso |
| Copyleft | Permite cópia e modificação mantendo a liberdade nas obras derivadas |
| Atribuição | Reconhecimento explícito e formal da autoria original |

## Uso Aceitável no Trabalho

A **Política de Uso Aceitável (PUA)** define normas para recursos de rede corporativos:

- Proibição de downloads piratas ou softwares sem licença.
- Monitoramento de tráfego para evitar vazamento de dados.
- Uso estrito para atividades profissionais.

⚠️ **Atenção:** violar normas de TI pode resultar em demissão.

---

## Curadoria de Conteúdos Digitais

Curadoria é filtrar, validar, organizar e agregar valor aos materiais técnicos encontrados na Web.

- **Coleta e triagem:** filtrar teses, apostilas e manuais, descartando conteúdo superficial ou duplicado.
- **Síntese e documentação:** fichamentos e pastas temáticas para consulta rápida da equipe.

## Pesquisa em Tecnologias Emergentes (Indústria 4.0)

- **IoT:** sensores conectados em malha.
- **Manutenção preditiva:** algoritmos que preveem desgaste mecânico.
- **Gêmeos digitais:** simulação virtual de fábricas.

🧠 **Fontes confiáveis:** normas ABNT, patentes do INPI e artigos IEEE.

## Roteiro para Síntese Técnica

1. **Delimitação:** palavras-chave e escopo exato do problema.
2. **Extração:** artigos em repositórios confiáveis, filtrando por data.
3. **Cruzamento:** comparar dados de pelo menos **3 fontes independentes**.
4. **Redação ABNT:** relatório com citações e referências completas.

**Ordem do fluxo de pesquisa:** definir palavras-chave e operadores → filtrar resultados em repositórios → avaliar credibilidade pelo CRAAP → sintetizar citando as fontes.

## Dilema Ético na Empresa

Um estagiário encontrou um script de automação em um fórum e o implementou no servidor sem citar a fonte nem verificar a licença. Riscos: violação de direitos autorais; vulnerabilidades e malware na rede; falta de rastreabilidade em falhas; descumprimento da PUA e risco trabalhista.

## Síntese

- Motores de busca respondem bem a operadores.
- Repositórios e o teste CRAAP garantem autoridade.
- A conformidade legal protege sua reputação.

**Próxima aula:** comunicação digital, e-mail e colaboração em nuvem.

---

> **Notas da extração:** exemplos em fonte de código dos slides 17 e 23 estão em branco no próprio PDF e foram completados aqui (`site:gov.br`, `site:edu.br`, `filetype:pdf`, `.exe`, `.bat`, `.scr`).

**Fonte:** Aula 3 — Navegação na Web e Pesquisa Acadêmica · **Curso:** Assistente de Operações Logísticas · **UC:** Introdução à TIC · **SENAI**
