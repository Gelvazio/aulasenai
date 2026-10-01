# ATIVIDADE-EXCEL-29-09-2026 — Plano da Atividade Prática Avaliativa

**Unidade curricular:** Análise de Dados Aplicada à Gestão (32h)
**Curso:** Aprendizagem Industrial — Assistente em Processos de Gestão e Controle de Materiais
**Data de aplicação:** 29/09/2026 · **Duração:** 3h15 (máximo 3h30)
**Fontes:** `../4-Excel-Intermediário-Formatação-e-Validação.md`,
`../5-Excel-Avançado-Funções-Complexas-e-Busca.md` e `../../EMENTA-CHALKIE-AI.md`
(fonte da verdade)
**Editor:** Excel ou LibreOffice Calc (funções em português)
**Status do plano:** ✅ Aprovado em 2026-09-27 (atividade **avaliativa**, 10 pontos em Atividades de Sala de Aula; valores esperados só no gabarito do professor; link no índice)

---

## 1. Visão geral

**Atividade prática avaliativa** em que o aluno constrói, do zero, a planilha de controle de
estoque do almoxarifado de uma empresa **fictícia**, a **Metalúrgica Vale do Itajaí**. As 6
questões montam **um único arquivo**, aba por aba (`Cadastro`, `Movimentacao`, `Consulta` e
`Resumo`), e ao final o aluno entrega o `.xlsx`.

Cada questão tem um HTML próprio, com passos numerados. **Cada passo tem uma imagem** da tela do
Excel (com o ponto a clicar destacado e numerado) e o texto completo do que fazer: onde clicar, o
que digitar e a fórmula exata. Pontos-chave têm caixas **"Verifique"** que dizem o que observar
(ex.: "aparece um nome de material, não #N/D"), **sem revelar valores**; os valores esperados
(linhas "Confira" abaixo) ficam **somente no `GABARITO-PROFESSOR.md`**.

### Alinhamento à ementa

| Ementa | Onde entra |
|---|---|
| 2.2.1 Formatação condicional | Q4 |
| 2.2.2 Funções (PROCV, PROCH, SE, CONT.SE) + SEERRO, ÍNDICE/CORRESP, SOMASE | Q3, Q4, Q5 |
| 2.2.4 Filtros | Q6 |
| 2.2.5 Validação de dados | Q2 |
| 2.2.6 Proteção de células | Q6 |
| Base (formatação, referências relativas/absolutas, congelar painéis) | Q1, Q3 |
| Indicadores de desempenho | 5, 6, 7, 8, 9 (CONT.SE e SOMASE) e 10 (proteção) |
| Capacidades | C1, C2, S2 Aprendizagem ativa, S4 Resolução de problemas |

⚠️ **Fora desta atividade:** tabela dinâmica e gráficos (arquivo 6), que entram na atividade de
01/10/2026.

---

## 2. Tempos e pontuação

| Momento | Conteúdo | Tempo | Pontos |
|---|---|---|---|
| Abertura | Leitura da capa, contexto e critérios; abrir o Excel | 15 min | — |
| **Questão 1** | Estrutura e formatação da aba `Cadastro` + congelar painéis | 25 min | 1,5 |
| **Questão 2** | Aba `Movimentacao` com validação de dados (listas e limites) | 30 min | 1,5 |
| **Questão 3** | PROCV + SEERRO, referências absolutas e ÍNDICE + CORRESP | 30 min | 2,0 |
| Intervalo | — | 15 min | — |
| **Questão 4** | Saldo com SOMASE, situação com SE aninhado e formatação condicional | 35 min | 2,0 |
| **Questão 5** | Aba `Resumo` com CONT.SE, SOMASE e PROCH | 25 min | 1,5 |
| **Questão 6** | AutoFiltro, proteção de células e entrega | 20 min | 1,5 |
| Fechamento | Conferência final e envio do arquivo | 10 min | — |
| **Total** | | **3h25** | **10,0** |

A soma do trabalho nas questões é de 2h45. Com abertura, intervalo e fechamento, a atividade
fica em 3h25, dentro do limite de 3h30. **Média da UC: 70 pontos** (tabela de notas).

---

## 3. Dados da atividade (empresa fictícia)

### Aba `Cadastro` (o aluno digita, na Q1)

| Código | Descrição | Categoria | Unidade | Custo Unitário | Estoque Mínimo | Saldo Inicial |
|---|---|---|---|---|---|---|
| MAT-001 | Luva de vaqueta | EPI | par | 18,90 | 40 | 55 |
| MAT-002 | Óculos de proteção | EPI | un | 12,50 | 20 | 18 |
| MAT-003 | Protetor auricular plug | EPI | par | 1,80 | 100 | 250 |
| MAT-004 | Máscara PFF2 | EPI | un | 3,20 | 80 | 60 |
| MAT-005 | Parafuso sextavado M8 | Fixação | un | 0,45 | 500 | 1200 |
| MAT-006 | Porca M8 | Fixação | un | 0,15 | 500 | 480 |
| MAT-007 | Arruela lisa 8 mm | Fixação | un | 0,08 | 500 | 900 |
| MAT-008 | Rebite de alumínio 4 mm | Fixação | un | 0,12 | 300 | 350 |
| MAT-009 | Fita isolante 19 mm | Elétrico | rolo | 6,90 | 15 | 12 |
| MAT-010 | Cabo flexível 2,5 mm² | Elétrico | m | 3,40 | 100 | 180 |
| MAT-011 | Disjuntor 20 A | Elétrico | un | 24,90 | 10 | 14 |
| MAT-012 | Disco de corte 7" | Ferramentas | un | 9,80 | 30 | 25 |
| MAT-013 | Broca aço rápido 8 mm | Ferramentas | un | 14,50 | 12 | 20 |
| MAT-014 | Lixa grão 120 | Ferramentas | folha | 1,90 | 50 | 90 |
| MAT-015 | Trena 5 m | Ferramentas | un | 22,00 | 5 | 7 |

### Aba `Movimentacao` (o aluno lança, na Q2)

| Data | Código | Tipo | Quantidade |
|---|---|---|---|
| 01/09/2026 | MAT-001 | Saída | 20 |
| 02/09/2026 | MAT-005 | Saída | 400 |
| 03/09/2026 | MAT-002 | Entrada | 10 |
| 04/09/2026 | MAT-009 | Saída | 5 |
| 08/09/2026 | MAT-004 | Saída | 30 |
| 09/09/2026 | MAT-012 | Saída | 10 |
| 10/09/2026 | MAT-010 | Entrada | 50 |
| 11/09/2026 | MAT-006 | Saída | 150 |
| 14/09/2026 | MAT-003 | Saída | 60 |
| 15/09/2026 | MAT-013 | Saída | 4 |
| 16/09/2026 | MAT-001 | Entrada | 30 |
| 17/09/2026 | MAT-011 | Saída | 6 |

---

## 4. Questões e passos (cada passo = 1 imagem + detalhamento)

### Questão 1 — Cadastro de materiais e formatação profissional (25 min · 1,5 pt)

**Arquivo:** `ATIVIDADE-EXCEL-29-09-2026/QUESTAO-01-CADASTRO-E-FORMATACAO.html`
**Slides de apoio:** arquivo 4, slides 10–12, 16, 20–21

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Abrir uma pasta em branco e renomear a aba `Planilha1` para `Cadastro` (clique direito → Renomear) | Aba inferior com o menu "Renomear" destacado |
| 2 | Digitar os cabeçalhos em A1:G1 | Grade com a linha 1 preenchida |
| 3 | Digitar os 15 itens da tabela (A2:G16), com custo usando vírgula (18,90) | Grade parcialmente preenchida, com setas indicando a direção da digitação (Tab e Enter) |
| 4 | Formatar o cabeçalho: fundo azul-escuro, fonte branca, negrito, centralizado | Guia Página Inicial com os botões Negrito, Cor de Preenchimento, Cor da Fonte e Centralizar numerados |
| 5 | Formatar E2:E16 como Moeda (R$) | Caixa "Formatar Células" (Ctrl+1) → Moeda, 2 casas |
| 6 | Deixar F2:G16 como número inteiro e conferir o alinhamento (texto à esquerda, número à direita) | Grade com os alinhamentos marcados |
| 7 | Aplicar "Todas as Bordas" em A1:G16 e o AutoAjuste da largura das colunas (duplo clique na divisa) | Botão Bordas aberto + cursor na divisa das colunas |
| 8 | Congelar a linha superior (Exibir → Congelar Painéis → Congelar Linha Superior) | Menu Congelar Painéis aberto |

**Confira:** E2 mostra `R$ 18,90`; ao rolar até a linha 40, o cabeçalho continua visível.
**Critérios (1,5):** dados completos e corretos (0,5) · formatos Moeda/inteiro (0,4) · cabeçalho e
bordas (0,3) · painel congelado (0,3).

### Questão 2 — Movimentação com validação de dados (30 min · 1,5 pt)

**Arquivo:** `QUESTAO-02-MOVIMENTACAO-E-VALIDACAO.html`
**Slides de apoio:** arquivo 4, slides 22–27 e 24.1

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Criar a aba `Movimentacao` (botão +) e digitar os cabeçalhos A1:H1: Data, Código, Descrição, Tipo, Quantidade, Custo Unitário, Valor, Qtd com Sinal; copiar a formatação do cabeçalho com o Pincel | Botão "+" das abas e o Pincel de Formatação |
| 2 | Selecionar B2:B100 → Dados → Validação de Dados → Permitir: Lista → Fonte: `=Cadastro!$A$2:$A$16` | Caixa Validação de Dados, aba Configurações, campos numerados |
| 3 | Na mesma caixa, aba Alerta de Erro: estilo **Parar**, título `Código inexistente`, mensagem `Escolha um código da lista` | Aba Alerta de Erro preenchida |
| 4 | Selecionar D2:D100 → Validação → Lista → Fonte: `Entrada;Saída` | Caixa com a fonte digitada |
| 5 | Selecionar E2:E100 → Validação → Número inteiro, entre 1 e 500; aba Mensagem de Entrada: `Digite de 1 a 500` | Caixa com "Número inteiro" e limites |
| 6 | Formatar A2:A100 como Data Abreviada | Formatar Células → Data |
| 7 | Lançar as 12 movimentações usando as setas das listas | Célula B2 com a lista suspensa aberta |
| 8 | Testar: digitar `MAT-099` em B14 e `600` em E14; ver o bloqueio; cancelar e apagar B14:E14 | Janela de erro "Código inexistente" |

**Confira:** a seta da lista aparece em B2 e D2; `MAT-099` e `600` são recusados.
**Critérios (1,5):** lista de códigos com alerta (0,5) · lista Tipo (0,3) · limite de quantidade
(0,4) · 12 lançamentos corretos (0,3).
**LibreOffice Calc:** Dados → Validade; Critérios → Intervalo de células ou Lista.

### Questão 3 — Buscar dados com PROCV, SEERRO e ÍNDICE + CORRESP (30 min · 2,0 pt)

**Arquivo:** `QUESTAO-03-PROCV-SEERRO-INDICE-CORRESP.html`
**Slides de apoio:** arquivo 5, slides 9–11.1, 16–20, 22–23.1

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Em C2: `=SEERRO(PROCV(B2;Cadastro!$A$2:$G$16;2;0);"Código não cadastrado")` | Barra de fórmulas com cada argumento em uma cor e legenda (o que procurar, onde, coluna, exato) |
| 2 | Em F2: `=SEERRO(PROCV(B2;Cadastro!$A$2:$G$16;5;0);0)` e formatar como Moeda | Barra de fórmulas + contagem das colunas 1 a 5 no Cadastro |
| 3 | Em G2: `=E2*F2` e formatar como Moeda | Célula G2 selecionada |
| 4 | Selecionar C2 e dar duplo clique na alça de preenchimento; repetir com F2 e G2 até a linha 13 | Alça de preenchimento ampliada |
| 5 | Criar a aba `Consulta`: em A1 escrever `Código`; em B1 digitar `MAT-007`; em A2 escrever `Descrição`; em B2: `=SEERRO(PROCV(B1;Cadastro!$A$2:$G$16;2;0);"Código não cadastrado")`. Trocar B1 para `MAT-099` e ver a mensagem | Aba Consulta com os dois resultados lado a lado |
| 6 | Busca "para a esquerda": em A4 escrever `Descrição`, em B4 digitar `Trena 5 m`; em A5 escrever `Código`; em B5: `=SEERRO(ÍNDICE(Cadastro!$A$2:$A$16;CORRESP(B4;Cadastro!$B$2:$B$16;0));"Descrição não encontrada")` | Esquema: CORRESP acha a linha na coluna B, ÍNDICE devolve a coluna A |
| 7 | Conferir os resultados | Caixa "Confira" com os valores |

**Confira:** C2 = `Luva de vaqueta` · F2 = `R$ 18,90` · G2 = `R$ 378,00` · G3 = `R$ 180,00` ·
Consulta B2 com `MAT-099` = `Código não cadastrado` · B5 = `MAT-015`.
**Critérios (2,0):** PROCV com `$` e busca exata (0,6) · SEERRO nas buscas (0,4) · Valor e cópia
das fórmulas (0,4) · ÍNDICE + CORRESP (0,6).
**Dica de erro comum:** sem o `$`, a tabela "anda" ao copiar e as últimas linhas dão `#N/D`.

### Questão 4 — Saldo, situação do item e formatação condicional (35 min · 2,0 pt)

**Arquivo:** `QUESTAO-04-SALDO-SE-FORMATACAO-CONDICIONAL.html`
**Slides de apoio:** arquivo 4, slides 13–15.1; arquivo 5, slides 26–31

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Em `Movimentacao!H2`: `=SE(D2="Entrada";E2;-E2)` e copiar até H13 | Coluna H com os valores positivos e negativos |
| 2 | Em `Cadastro`, criar os cabeçalhos H1:K1: Movimentado, Saldo Atual, Valor em Estoque, Situação (formatação com o Pincel) | Cabeçalhos novos |
| 3 | Em H2: `=SOMASE(Movimentacao!$B$2:$B$100;A2;Movimentacao!$H$2:$H$100)` | Esquema: critério na coluna B, soma na coluna H |
| 4 | Em I2: `=G2+H2`; em J2: `=I2*E2` (Moeda); copiar H2:J2 até a linha 16 | Três colunas preenchidas |
| 5 | Em K2: `=SE(I2<F2;"Crítico";SE(I2<=F2*1,5;"Atenção";"Normal"))` e copiar até K16 | Fluxograma de decisão: abaixo do mínimo → Crítico; até 1,5 × mínimo → Atenção; acima → Normal |
| 6 | Selecionar K2:K16 → Formatação Condicional → Realçar Regras → Texto que Contém: `Crítico` vermelho, `Atenção` amarelo, `Normal` verde | Caixa "Texto que Contém" |
| 7 | Selecionar J2:J16 → Formatação Condicional → Barras de Dados | Coluna J com as barras |
| 8 | Conferir os resultados | Caixa "Confira" |

**Confira:** I2 (MAT-001) = 65 · I5 (MAT-004) = 30 · J2 = `R$ 1.228,50` · 5 itens Crítico, 4 Atenção
e 6 Normal · soma de J2:J16 = `R$ 4.273,50`.
**Critérios (2,0):** Qtd com Sinal (0,3) · SOMASE com `$` (0,5) · Saldo e Valor (0,3) · SE aninhado
(0,5) · formatação condicional e barras (0,4).

### Questão 5 — Resumo gerencial com CONT.SE, SOMASE e PROCH (25 min · 1,5 pt)

**Arquivo:** `QUESTAO-05-RESUMO-CONTSE-SOMASE-PROCH.html`
**Slides de apoio:** arquivo 5, slides 14–15, 28–31

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Criar a aba `Resumo` e montar os rótulos do quadro | Esboço do quadro com as células |
| 2 | B3:B5 com `=CONT.SE(Cadastro!$K$2:$K$16;"Crítico")` (e Atenção e Normal); B6 = `=SOMA(B3:B5)` | Quadro de situação preenchido |
| 3 | B9:B12 com `=SOMASE(Cadastro!$C$2:$C$16;"EPI";Cadastro!$J$2:$J$16)` (e Fixação, Elétrico, Ferramentas); B13 = `=SOMA(B9:B12)`; C9 = `=B9/$B$13` em % | Quadro por categoria com a coluna % |
| 4 | Valor das saídas do mês: B16 = `=SOMASE(Movimentacao!$D$2:$D$100;"Saída";Movimentacao!$G$2:$G$100)` | Célula B16 destacada |
| 5 | Tabela horizontal de limites (A18:G19: Mês → Jul a Dez; Limite de saídas → 1.300, 1.250, 1.200, 1.250, 1.300, 1.000); B21 digitar `Set`; B22 = `=PROCH(B21;A18:G19;2;0)` | Tabela horizontal com setas mostrando a busca na linha 1 e o retorno da linha 2 |
| 6 | B23 = `=SE(B16<=B22;"Dentro do limite";"Acima do limite")` | Resultado final |

**Confira:** Crítico 5 · Atenção 4 · Normal 6 · Total 15 · EPI `R$ 2.016,50` (47,2%) · Fixação
`R$ 523,50` · Elétrico `R$ 1.029,50` · Ferramentas `R$ 704,00` · Saídas `R$ 1.124,40` · Limite
de Set = 1.200 · `Dentro do limite`.
**Critérios (1,5):** CONT.SE (0,4) · SOMASE e % (0,5) · PROCH (0,4) · SE de conclusão (0,2).

### Questão 6 — Filtro, proteção e entrega (20 min · 1,5 pt)

**Arquivo:** `QUESTAO-06-FILTRO-PROTECAO-ENTREGA.html`
**Slides de apoio:** arquivo 4, slides 28–33

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Em `Cadastro`, clicar em A1 e ligar o AutoFiltro (Ctrl+Shift+L) | Cabeçalho com as setas de filtro |
| 2 | Filtrar Situação = `Crítico` (5 itens); depois Categoria = `EPI` (1 item); anotar em `Resumo!B25` o item encontrado (rótulo em A25) | Menu do filtro com as caixas marcadas |
| 3 | Limpar os filtros (Dados → Limpar) | Botão Limpar |
| 4 | Em `Movimentacao`, selecionar A2:B100, segurar Ctrl e selecionar D2:E100 → Ctrl+1 → aba Proteção → desmarcar **Bloqueadas** | Caixa Formatar Células, aba Proteção |
| 5 | Revisão → Proteger Planilha → senha `senai2026` (confirmar) | Caixa Proteger Planilha |
| 6 | Testar: tentar apagar G2 (aparece o aviso) e digitar uma data em A14 (funciona); apagar A14 | Aviso de célula protegida |
| 7 | Salvar como `ESTOQUE-NOME-SOBRENOME.xlsx` e entregar conforme o professor orientar | Caixa Salvar Como |

**Confira:** filtro Crítico + EPI mostra só `Máscara PFF2`; fórmulas bloqueadas e entradas
liberadas.
**Critérios (1,5):** filtro correto e anotado (0,5) · células de entrada desbloqueadas (0,4) ·
planilha protegida (0,3) · arquivo salvo com o nome pedido (0,3).
**LibreOffice Calc:** Ferramentas → Proteger Planilha; Autofiltro em Dados → Autofiltro.

---

## 5. Imagens

- **44 imagens SVG**, uma por passo (Q1: 8 · Q2: 8 · Q3: 7 · Q4: 8 · Q5: 6 · Q6: 7), mais 1 na capa
  com a visão das 4 abas.
- Estilo: tela ilustrada do Excel (faixa de opções, barra de fórmulas, grade com letras e números,
  abas inferiores e caixas de diálogo), usando **os dados reais da atividade**.
- Pontos a clicar com **círculos numerados** e contorno em laranja; fórmulas com os argumentos
  coloridos; setas para explicar buscas (PROCV, ÍNDICE + CORRESP, PROCH e SOMASE).
- Geradas por um script Python reutilizável, que produz SVGs leves, nítidos na impressão e
  editáveis.

---

## 6. Arquivos a criar

```
assets/
├─ css/atividade-pratica-excel.css        → estilo da capa e das questões (reutilizável)
├─ js/atividade-pratica-excel.js          → botão Imprimir/PDF e marcar passo concluído
└─ gerador-atividade-excel/
   └─ gerar_atividade_excel.py            → gera capa, questões e SVGs a partir de um JSON

MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/
├─ ATIVIDADE-EXCEL-29-09-2026.md          → este plano
├─ ATIVIDADE-EXCEL-29-09-2026.html        → capa: contexto, tempos, pontuação, dados, links
└─ ATIVIDADE-EXCEL-29-09-2026/
   ├─ atividade.json                      → conteúdo (fonte única do gerador)
   ├─ QUESTAO-01-CADASTRO-E-FORMATACAO.html
   ├─ QUESTAO-02-MOVIMENTACAO-E-VALIDACAO.html
   ├─ QUESTAO-03-PROCV-SEERRO-INDICE-CORRESP.html
   ├─ QUESTAO-04-SALDO-SE-FORMATACAO-CONDICIONAL.html
   ├─ QUESTAO-05-RESUMO-CONTSE-SOMASE-PROCH.html
   ├─ QUESTAO-06-FILTRO-PROTECAO-ENTREGA.html
   ├─ GABARITO-PROFESSOR.md               → fórmulas e valores esperados, célula a célula
   └─ img/q1-passo-01.svg ... q6-passo-07.svg, capa-abas.svg
```

- Cada questão tem um cabeçalho com nome, turma e data; navegação Anterior, Capa e Próxima;
  tempo e pontos da questão; caixas de Dica, Atenção, Confira e LibreOffice; e critérios de
  correção no fim.
- Sem `<style>`/`<script>` embutidos (regra de `assets/`); layout legível no celular e na
  impressão (A4).

---

## 7. Execução (após aprovação)

| Passo | Ação | Status |
|---|---|---|
| 1 | CSS e JS em `assets/` | ✅ |
| 2 | `atividade.json` com as 6 questões, os 44 passos e os dados | ✅ |
| 3 | Gerador Python (HTML + SVG) | ✅ |
| 4 | Gerar os arquivos e conferir se as imagens abrem | ✅ |
| 5 | Refazer as contas do "Confira" e do gabarito | ✅ |
| 6 | `GABARITO-PROFESSOR.md` | ✅ |
| 7 | Commit local | ✅ |

---

## 8. Decisões do professor (2026-09-27)

1. **Peso:** atividade **avaliativa** — compõe a nota final, valendo **10 pontos** na linha
   Atividades de Sala de Aula (40 pontos) da tabela de notas (alterado em 2026-09-27; antes era
   formativa).
2. **Valores esperados:** somente no `GABARITO-PROFESSOR.md`; nas páginas do aluno, caixas
   "Verifique" qualitativas.
3. **Índice:** link incluído em `ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html` (índice da matéria).
4. **Local dos arquivos:** `AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/` (pedido do professor).

---

## 9. Resultado da execução (2026-09-27)

- ✅ Capa + 6 questões geradas por `assets/gerador-atividade-excel/gerar_atividade_excel.py`
  a partir de `ATIVIDADE-EXCEL-29-09-2026/atividade.json` (fonte única do conteúdo).
- ✅ 45 imagens SVG (44 passos + capa), validadas como XML e revisadas visualmente.
- ✅ Caixas "Verifique" sem valores; valores esperados só no `GABARITO-PROFESSOR.md`
  (conferidos por script: 5 Crítico, 4 Atenção, 6 Normal; R$ 4.273,50; saídas R$ 1.124,40).
- ✅ Imagens não mostram resultados calculados-chave (totais, saldos, situações do Resumo).
- ✅ Link no índice da matéria (`ATIVIDADES/index.html`).
- Para regerar após editar o JSON:
  `C:\Python314\python.exe assets\gerador-atividade-excel\gerar_atividade_excel.py <pasta>`

---

## 10. Ampliação: questões 7 a 10 (2026-09-29)

Pedido do professor: mais 4 questões **simples**, resolvíveis em **1h30**, sobre o conteúdo dos
arquivos 3, 4 e 5, com **tabela de 120 linhas** (botão Copiar) e **nota só na formatação**.

| Q | Tema | Tempo | Pontos |
|---|---|---|---|
| 1 | Cadastro e formatação | 25 min | 1,0 |
| 2 | Movimentação e validação | 30 min | 1,0 |
| 3 | PROCV, SEERRO e ÍNDICE + CORRESP | 30 min | 1,5 |
| 4 | Saldo, SE aninhado e formatação condicional | 35 min | 1,5 |
| 5 | Resumo com CONT.SE, SOMASE e PROCH | 25 min | 1,0 |
| 6 | Filtro e proteção (a entrega passou para a Q10) | 15 min | 1,0 |
| **7** | Base `Requisicoes` (120 registros): cabeçalho, data, moeda, %, bordas + indicadores (SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.VALORES, CONT.NÚM) na aba `Analise` | 22 min | 0,75 |
| **8** | SE aninhado (Faixa) e formatação condicional: maior que, 10 primeiros, escala de cores, regra por fórmula | 23 min | 0,75 |
| **9** | Filtros, classificação, resumo com CONT.SE/SOMASE (`$`) e consulta PROCV + SEERRO | 22 min | 0,75 |
| **10** | Congelar painéis, Preenchimento Relâmpago, paisagem, títulos repetidos e entrega | 23 min | 0,75 |

Duração total: **4h50** (255 min de questões + 15 abertura + 15 intervalo + 10 fechamento);
pontos: **10,0** (redistribuídos). Nova aba `Analise` (6 abas no total). Os 120 registros ficam
na aba `Requisicoes`, com botão **Copiar** na Q7 e na capa. Imagens: 66 (65 passos + capa).
Gerador estendido com `realces`, `zebra` e `escala_cores` em `tela_excel.py`.
