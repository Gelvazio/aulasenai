# Aula 8 — Editor de Planilhas: Organização e Fórmulas

Domine o processamento de dados e cálculos operacionais no ambiente profissional.

> Conteúdo extraído de `8-Editor-de-Planilhas-Organização-e-Fórmulas.pdf` (42 slides). UC Introdução à TIC — Assistente de Operações Logísticas (SENAI).

---

## O Poder Invisível dos Dados

Um simples erro em uma única célula de planilha já gerou prejuízo de mais de seis bilhões de dólares em um banco internacional. Pequenas fórmulas decidem o destino de empresas inteiras.

## Objetivos da Aula

- Estruturar e formatar tabelas identificando **endereços e tipos de dados**.
- Aplicar **fórmulas e funções** matemáticas, estatísticas e lógicas.
- **Organizar, filtrar e exportar** dados com segurança para a tomada de decisão.

## Recapitulação: Textos Técnicos

Objetividade e clareza, estruturação ABNT e a transição para dados: relatórios técnicos dependem de quadros e tabelas para sustentar conclusões com fatos mensuráveis.

- Função do memorando: comunicação interna ágil entre setores.
- Linguagem objetiva: transmitir fatos e dados sem ambiguidades.
- Tabelas complementam relatórios com evidências quantitativas.

## Vocabulário Essencial

| Termo | Definição |
|---|---|
| Célula | Interseção de linha e coluna, identificada por coordenadas únicas |
| Fórmula | Expressão definida pelo usuário, iniciada com `=` |
| Função | Comando predefinido que processa cálculos automaticamente |
| Filtro | Ferramenta que exibe registros conforme parâmetros definidos |

---

## Anatomia da Planilha

- **Colunas:** letras (A, B, C… Z, AA…).
- **Linhas:** números (1, 2, 3…).
- **Célula:** interseção de linha e coluna, com coordenada fixa.

🔑 Letra + número define o endereço único de cada dado.

## Endereçamento de Células

A letra da coluna vem **sempre antes** do número da linha.

- `B4`: coluna B, linha 4.
- `D12`: coluna D, linha 12.
- **Intervalo** `B2:B10`: todas as células contínuas de B2 a B10.

⚠️ Nunca inverta: referências como `4B` ou `12D` causam erro.

## Tipos de Dados

- **Texto (alfanumérico):** descrições, códigos e nomes; alinhado à **esquerda**; não permite cálculos diretos.
- **Números:** quantidades e medidas; alinhados à **direita**; permitem operações e ordenações.
- **Moeda:** símbolo monetário (R$) e duas casas decimais fixas.
- **Data e hora:** armazenadas como números seriais; permitem calcular prazos subtraindo uma data da outra.

**Checagem:** terceira coluna e quinta linha = **C5**; números têm alinhamento padrão **à direita**.

## Formatação Condicional

Altera a aparência da célula (cor, fonte ou borda) conforme regras.

- **Gargalos:** despesas acima do orçado em vermelho.
- **Metas atingidas:** receitas acima da projeção em verde.
- **Escalas de cor:** gradiente de estoque baixo a alto.

---

## Operadores Matemáticos

Toda fórmula começa obrigatoriamente com `=`.

| Operação | Operador | Exemplo |
|---|---|---|
| Adição | `+` | `=A1+B1` |
| Subtração | `-` | `=A1-B1` |
| Multiplicação | `*` | `=A1*B1` |
| Divisão | `/` | `=A1/B1` |
| Potenciação | `^` | `=A1^2` |

🧠 **Precedência:** multiplicações e divisões ocorrem antes de somas e subtrações.

## Fórmulas Dinâmicas: Referências × Constantes

Use sempre o **endereço das células**, não valores digitados.

- ❌ *Incorreto:* `=10*25` (valor estático, não se atualiza).
- ✅ *Correto:* `=B2*C2` (recalcula se a quantidade ou o preço mudar).

O uso de referências garante dinamismo, auditoria limpa e menos retrabalho.

## Funções SOMA e MÉDIA

- `=SOMA(A1:A50)`: soma os 50 valores do intervalo.
- `=MÉDIA(A1:A50)`: calcula a média aritmética.

🧠 **Dois pontos (`:`)** definem intervalo. **Ponto e vírgula (`;`)** separa argumentos.

## Função CONT.SE

Conta quantas células de um intervalo atendem a uma condição.

- **Sintaxe:** `=CONT.SE(intervalo; critério)`
- **RH:** `=CONT.SE(C2:C30;"Aprovado")` conta os candidatos aprovados.
- **Estoque:** `=CONT.SE(D2:D100;"<10")` conta itens em nível crítico de reposição.

## Função CONT.VALORES

Conta quantas células de um intervalo **não estão vazias** (textos, números ou datas), sem precisar de critério.

- **Sintaxe:** `=CONT.VALORES(intervalo)`
- **Inventário:** `=CONT.VALORES(B2:B200)` conta quantos itens foram registrados na coluna de códigos.

🔑 **Diferença:** CONT.VALORES conta tudo o que está preenchido; CONT.SE conta apenas o que atende a um critério.

## Função Lógica SE

Testa uma condição e retorna um valor se for verdadeira e outro se for falsa.

- **Sintaxe:** `=SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)`
- **Exemplo:** `=SE(D2>=1000;"Aprovado";"Revisar")` — se o volume em D2 for maior ou igual a 1000, registra aprovação; senão, alerta.

⚠️ Textos dentro de fórmulas ficam sempre entre **aspas duplas**, como `"Aprovado"`.

**V ou F:** "Em `=SE(B2>50; B2*1,1; B2)`, com B2 = 60, o resultado é 60." → **FALSO**. Como 60 > 50, aplica `B2*1,1` = **66**.

---

## Classificação (Ordenação)

- **Crescente (A–Z, 1–10):** nomes ou datas.
- **Decrescente (Z–A, 10–1):** maiores valores no topo.

⚠️ Selecione a tabela inteira para não separar nomes de seus valores.

## Filtros

Isolam subconjuntos de registros **sem alterar** a base original.

- **Filtro por seleção:** menus suspensos nos cabeçalhos (ex.: só pedidos da "Região Sul").
- **Filtros numéricos:** "Maior que", "Entre", "10 Primeiros".

🔑 Linhas filtradas **não são apagadas**; ficam apenas ocultas temporariamente.

**Ordem para filtrar os maiores gastos:** selecionar o cabeçalho → ativar Filtro (guia Dados) → clicar na seta da coluna Gastos → configurar o filtro numérico (acima da média).

## Congelamento de Painéis

- **Congelar linha superior:** mantém os cabeçalhos fixos na rolagem vertical.
- **Congelar primeira coluna:** mantém códigos ou nomes fixos na rolagem horizontal.

## Proteção de Células

- **Bloqueio de fórmulas:** impede edições indevidas nos cálculos.
- **Desbloqueio de entrada:** deixa abertas só as células de digitação.
- **Proteção da planilha:** senha contra exclusão de abas e formatos.

**Afirmações verdadeiras:** o bloqueio protege fórmulas contra edições involuntárias; o congelamento mantém linhas/colunas visíveis. **Falsas:** proteger apaga o histórico; filtrar exclui linhas do disco.

---

## Área de Impressão

- **Definir área de impressão:** delimita o intervalo a imprimir.
- **Ajustar para 1 página de largura:** as colunas cabem sem dividir a tabela.
- **Paisagem:** recomendada para tabelas com mais de cinco colunas.

## Cabeçalho e Rodapé de Relatórios

- **Cabeçalho:** organização e setor, título do relatório, versão e status.
- **Rodapé:** "Página X de Y", data e hora da extração, responsável técnico.

🧠 "Repetir linhas no topo" (Configurar Página) faz o cabeçalho da tabela aparecer em todas as folhas.

## CSV: Importação e Exportação

- **CSV (Comma-Separated Values):** padrão para transferir grandes volumes entre bancos de dados, ERPs e planilhas.
- **Estrutura:** texto puro; cada linha é um registro, colunas separadas por vírgula ou ponto e vírgula.
- **Leveza:** arquivos compactos, compatíveis com qualquer sistema.

**Cuidados no Brasil** (vírgula é o separador decimal):

- **Separador:** sistemas locais usam ponto e vírgula (`;`) entre colunas.
- **Codificação:** UTF-8 evita erros de acentuação.
- **Assistente de importação:** defina o delimitador para não jogar tudo na coluna A.

## Associação de Termos

| Termo | Definição |
|---|---|
| Célula | Interseção única entre linha e coluna onde os dados são armazenados |
| Filtro | Seleção que exibe apenas os registros que atendem a regras |
| Função | Rotina automatizada que executa cálculos padronizados |
| Fórmula | Expressão iniciada com `=` criada pelo usuário |

---

## Oficina: Controle Orçamentário

Técnico de laboratório com orçamento semestral de **R$ 15.000,00**: registrar equipamentos, quantidades, valores unitários, totais e saldo, com alertas de estoque crítico e gasto acima do limite.

1. **Estrutura:** colunas Item, Quantidade, Preço Unitário, Total e Status.
2. **Total da linha:** `=B2*C2`.
3. **Totalizador e SE:** `=SOMA(D2:D10)` e `=SE(D2>1000;"Revisar";"OK")`.
4. **Formatação:** moeda (R$) e regra condicional vermelha para "Revisar".

## Exercício de Auditoria

10 teclados (R$ 45), 10 mouses (R$ 30), 5 monitores (R$ 650), 2 nobreaks (R$ 1.100):

- Por item: `=B2*C2`.
- Total: `=SOMA(D2:D5)`.
- Limite: `=SE(SOMA(D2:D5)<=7000;"DENTRO DO LIMITE";"EXTRAPOLOU")`.

## Síntese

- **Estrutura:** células, endereços e tipos de dados (texto, número, moeda, data).
- **Automação:** operadores e funções SOMA, MÉDIA, CONT.VALORES, CONT.SE e SE.
- **Gestão:** filtros, classificação, proteção, formatação condicional e CSV.

**Debate:** decidir com planilhas sem proteção de fórmulas ou validação gera custos distorcidos, decisões erradas, dificuldade em auditorias e exige governança de dados.

---

> **Notas da extração:** as fórmulas e operadores em fonte de código dos slides 15, 16, 18, 19, 20 e 38 estão em branco no próprio PDF e foram completados aqui com a sintaxe padrão do Excel/LibreOffice em português.
>
> **Notas de conformidade com a ementa:** o PDF não aborda CONT.VALORES. A seção "Função CONT.VALORES" foi acrescentada porque a ementa oficial (`EMENTA-CHALKIE-AI.md`, indicador 11) exige SOMA, MÉDIA, CONT.VALORES e SE.

**Fonte:** Aula 8 — Editor de Planilhas: Organização e Fórmulas · **Curso:** Assistente de Operações Logísticas · **UC:** Introdução à TIC · **SENAI**
