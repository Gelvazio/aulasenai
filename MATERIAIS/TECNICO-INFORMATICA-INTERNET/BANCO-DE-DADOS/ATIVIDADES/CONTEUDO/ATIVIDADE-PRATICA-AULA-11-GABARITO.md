# Padrão de Resposta — Atividade Prática — Aula 11 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Padronização de Dados, Cronograma e Fluxograma.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa na situação **e** a justificativa,
   quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do
   tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** outros exemplos de sistema, desde que corretos; sinônimos dos
   termos (registro = linha; campo = coluna; SGBD = gerenciador de banco de dados; chave primária =
   PK; chave estrangeira = FK); SQL equivalente que produza o mesmo resultado no PostgreSQL; ordem
   diferente das partes da resposta.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** **cliente_ativo** (minúsculas, singular, sem espaço; ou **cliente** com a coluna ativo).
**Critérios:** Nota cheia (0,2): nome no padrão. Metade (0,1): só parte das regras. Zero (0): mantém espaços ou plural com maiúsculas.

### ITEM 01-b
**Resposta esperada:** **data_nascimento**, **valor_compra**, **pedido** (ou numero_pedido, em vez de order), **data_cadastro**.
**Critérios:** Nota cheia (0,4): quatro corretos. Metade (0,2): dois ou três. Zero (0): um ou nenhum.

### ITEM 01-c
**Resposta esperada:** Espaços e acentos **exigem aspas** no SQL e causam erros de digitação e de compatibilidade; **palavras reservadas** (order, select) conflitam com comandos do SQL e geram erros.
**Critérios:** Nota cheia (0,4): os dois motivos. Metade (0,2): um. Zero (0): sem relação.

### ITEM 02-a
**Resposta esperada:** **id** ou **id_<tabela>**.
**Critérios:** Nota cheia (0,2): padrão correto. Zero (0): outro.

### ITEM 02-b
**Resposta esperada:** **id_produto**, **id_categoria** e, em produto, a FK **id_categoria**.
**Critérios:** Nota cheia (0,4): os três. Metade (0,2): dois. Zero (0): um ou nenhum.

### ITEM 02-c
**Resposta esperada:** O desenvolvedor **prevê os nomes** (a FK de categoria é sempre id_categoria) e escreve o SQL **com menos erros e mais rápido**; o código fica mais legível para toda a equipe.
**Critérios:** Nota cheia (0,4): previsibilidade + menos erros. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 03-a
**Resposta esperada:** **AAAA-MM-DD** (tipo data).
**Critérios:** Nota cheia (0,2): formato correto. Zero (0): dd/mm/aa.

### ITEM 03-b
**Resposta esperada:** CPF e telefone: **texto, só com dígitos**, sem pontos, traços ou parênteses. O CPF "1234567890" tem **10 dígitos**: provavelmente **perdeu o zero à esquerda** por ter sido guardado como número.
**Critérios:** Nota cheia (0,4): padrão + problema do zero à esquerda. Metade (0,2): só um. Zero (0): recomenda guardar como número.

### ITEM 03-c
**Resposta esperada:** A **tela formata**: mostra a data como **dd/mm/aaaa** e o CPF com a **máscara** 000.000.000-00, a partir do valor padronizado guardado no banco.
**Critérios:** Nota cheia (0,4): a tela formata os dois. Metade (0,2): só um. Zero (0): diz que o banco guarda os dois formatos.

### ITEM 04-a
**Resposta esperada:** **Decimal com 2 casas** (ex.: numeric(10,2)).
**Critérios:** Nota cheia (0,2): decimal. Zero (0): texto ou inteiro.

### ITEM 04-b
**Resposta esperada:** Preço em texto **não permite contas** nem ordenação correta (somar vendas, calcular desconto). E-mails misturados geram **duplicidade** (Ana@ × ana@) e falhas na busca; padronizar em **minúsculas**.
**Critérios:** Nota cheia (0,4): os dois problemas. Metade (0,2): um. Zero (0): nenhum.

### ITEM 04-c
**Resposta esperada:** Tipo de **data e hora com fuso** (**timestamptz**), para registrar o **horário correto** (de Brasília) mesmo que servidor e usuários estejam em fusos diferentes.
**Critérios:** Nota cheia (0,4): tipo + motivo. Metade (0,2): só um. Zero (0): texto.

### ITEM 05-a
**Resposta esperada:** **Lista fechada** de valores possíveis para um atributo.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** **ativa, trancada, concluida, cancelada**. Os valores atuais escrevem a **mesma situação de jeitos diferentes**, então as consultas (ex.: contar matrículas ativas) **erram**.
**Critérios:** Nota cheia (0,4): domínio + problema. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 05-c
**Resposta esperada:** (1) restrição **CHECK** (situacao IN ('ativa', 'trancada', 'concluida', 'cancelada')); (2) **tabela de apoio** com as situações e **chave estrangeira** para ela.
**Critérios:** Nota cheia (0,4): as duas formas. Metade (0,2): uma. Zero (0): só aviso na tela.

### ITEM 06-a
**Resposta esperada:** **Nomes padronizados**, **tipos**, **formatos** e **domínios** de cada atributo (além de descrição e obrigatoriedade).
**Critérios:** Nota cheia (0,2): três ou quatro itens. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 06-b
**Resposta esperada:** **turno** — texto; domínio manha, tarde, noite; obrigatório. **id_curso** — inteiro; chave estrangeira para curso; obrigatório.
**Critérios:** Nota cheia (0,4): as duas linhas coerentes. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 06-c
**Resposta esperada:** Para **guiar a escrita do SQL** de criação das tabelas (DDL, aula 12): nomes, tipos, restrições e domínios saem do dicionário.
**Critérios:** Nota cheia (0,4): uso no SQL. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** **Duração**, **início e fim**, **dependências**, **responsável** e **marcos**.
**Critérios:** Nota cheia (0,2): quatro ou cinco itens. Metade (0,1): dois ou três. Zero (0): um ou nenhum.

### ITEM 07-b
**Resposta esperada:** **Escopo** (nenhuma) → **modelagem** (depende do escopo) → **DER** (da modelagem) → **normalização** (do DER) → **scripts** (da normalização/modelo final) → **documentação** (de tudo).
**Critérios:** Nota cheia (0,4): ordem com dependências. Metade (0,2): ordem certa sem dependências. Zero (0): ordem errada.

### ITEM 07-c
**Resposta esperada:** Marcos: **escopo aprovado**, **DER validado**, **banco criado**, **entrega final** (dois deles). A folga **absorve imprevistos** sem atrasar a entrega combinada.
**Critérios:** Nota cheia (0,4): dois marcos + motivo da folga. Metade (0,2): só um dos dois. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** Os **scripts**, porque **dependem** do modelo normalizado; sem a normalização, não podem começar.
**Critérios:** Nota cheia (0,2): etapa + dependência. Zero (0): outra etapa.

### ITEM 08-b
**Resposta esperada:** Comparando **toda semana** o **realizado × planejado** (quadro de tarefas, reunião rápida), registrando o andamento de cada etapa.
**Critérios:** Nota cheia (0,4): acompanhamento periódico + comparação. Metade (0,2): explicação vaga. Zero (0): "olhar no fim".

### ITEM 08-c
**Resposta esperada:** Ex.: **redistribuir tarefas** (mais pessoas na normalização), **adiantar partes independentes** dos scripts (como o padrão de nomes e a criação do banco), **usar a folga** e **avisar** o professor/cliente para ajustar o cronograma.
**Critérios:** Nota cheia (0,4): duas ações coerentes. Metade (0,2): uma. Zero (0): pular a normalização.

### ITEM 09-a
**Resposta esperada:** **Oval**: início/fim; **retângulo**: processo (ação); **losango**: decisão.
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 09-b
**Resposta esperada:** **Paralelogramo**: entrada ou saída de dados (ex.: digitar o código do leitor; imprimir o comprovante). **Cilindro**: banco de dados (ex.: consultar se o livro está disponível; gravar o empréstimo).
**Critérios:** Nota cheia (0,4): os dois com exemplos. Metade (0,2): um. Zero (0): nenhum.

### ITEM 09-c
**Resposta esperada:** Para mostrar **quais tabelas** o processo usa e **quando**, confirmando que o modelo de dados atende ao processo e revelando dados ou consultas que faltam.
**Critérios:** Nota cheia (0,4): ligação processo–tabelas + utilidade. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** Primeiro: **Início** (oval). Último: **Fim** (oval) — antes dele, **emitir comprovante** (paralelogramo).
**Critérios:** Nota cheia (0,2): início e fim com oval. Zero (0): símbolos errados.

### ITEM 10-b
**Resposta esperada:** Informar CPF (**paralelogramo**) → consultar aluno (**cilindro**) → **aluno existe?** (**losango**): não → cadastrar aluno (**retângulo**, grava no cilindro) → escolher turma (**retângulo**) → consultar vagas (**cilindro**) → **tem vaga?** (**losango**): não → oferecer outra turma (volta) ; sim → gravar matrícula e parcelas (**retângulo** + **cilindro**) → emitir comprovante (**paralelogramo**).
**Critérios:** Nota cheia (0,4): ordem + duas decisões + símbolos. Metade (0,2): ordem certa com símbolos faltando, ou só uma decisão. Zero (0): sem decisões.

### ITEM 10-c
**Resposta esperada:** "**O aluno é menor de idade?**" (losango), logo **depois do cadastro/consulta do aluno**: se sim, **cadastrar o responsável** (retângulo + cilindro) antes de escolher a turma.
**Critérios:** Nota cheia (0,4): decisão + posição + ação. Metade (0,2): só a decisão. Zero (0): decisão sem relação.
