# GABARITO DO PROFESSOR — ATIVIDADE-EXCEL-29-09-2026

**Uso restrito do professor.** Não publicar para os alunos.
**Natureza:** atividade prática **avaliativa**: compõe a nota final e vale **10 pontos** na linha
Atividades de Sala de Aula (40 pontos) da tabela de notas.
**Arquivo do aluno:** `ESTOQUE-NOME-SOBRENOME.xlsx` · **Senha da proteção:** `senai2026`
**Pontuação:** 10,0 (entra direto na nota) · **Desempenho esperado:** 7,0 (70%)
**Distribuição:** Q1 1,0 · Q2 1,0 · Q3 1,5 · Q4 1,5 · Q5 1,0 · Q6 1,0 · Q7 a Q10 0,75 cada · **Duração:** 4h50

---

## Questão 1 — Cadastro e formatação (1,0)

| Conferir | Esperado | Pontos |
|---|---|---|
| Aba `Cadastro`, títulos em A1:G1 e 15 itens em A2:G16 | Igual à tabela da capa | 0,3 |
| E2:E16 em Moeda; F2:G16 número inteiro | E2 = `R$ 18,90`; E7 = `R$ 0,15` | 0,3 |
| Cabeçalho azul-escuro, fonte branca em negrito, centralizado; bordas em A1:G16 | Visual | 0,2 |
| Congelar Linha Superior | Linha 1 fixa ao rolar | 0,2 |

## Questão 2 — Movimentação e validação (1,0)

| Conferir | Esperado | Pontos |
|---|---|---|
| B2:B100: Lista `=Cadastro!$A$2:$A$16`, alerta **Parar** "Código inexistente" | `MAT-099` recusado | 0,3 |
| D2:D100: Lista `Entrada;Saída` | Seta com as 2 opções | 0,2 |
| E2:E100: Número inteiro entre 1 e 500, com Mensagem de Entrada | `600` recusado | 0,3 |
| 12 lançamentos em A2:E13, datas dd/mm/aaaa | Igual à tabela da capa | 0,2 |

## Questão 3 — PROCV, SEERRO e ÍNDICE + CORRESP (1,5)

| Célula | Fórmula | Valor esperado |
|---|---|---|
| Movimentacao!C2 | `=SEERRO(PROCV(B2;Cadastro!$A$2:$G$16;2;0);"Código não cadastrado")` | Luva de vaqueta |
| Movimentacao!F2 | `=SEERRO(PROCV(B2;Cadastro!$A$2:$G$16;5;0);0)` | R$ 18,90 |
| Movimentacao!G2 | `=E2*F2` | R$ 378,00 |
| Movimentacao!G3 | `=E3*F3` | R$ 180,00 |
| Consulta!B2 (B1 = MAT-007) | `=SEERRO(PROCV(B1;Cadastro!$A$2:$G$16;2;0);"Código não cadastrado")` | Arruela lisa 8 mm |
| Consulta!B2 (B1 = MAT-099) | idem | Código não cadastrado |
| Consulta!B5 (B4 = Trena 5 m) | `=SEERRO(ÍNDICE(Cadastro!$A$2:$A$16;CORRESP(B4;Cadastro!$B$2:$B$16;0));"Descrição não encontrada")` | MAT-015 |

Valores da coluna G (Valor) na Movimentacao, linhas 2 a 13: 378,00 · 180,00 · 125,00 · 34,50 · 96,00 · 98,00 · 170,00 · 22,50 · 108,00 · 58,00 · 567,00 · 149,40.

**Critérios:** PROCV exato e com `$` (0,4) · SEERRO (0,3) · Valor e cópia até a linha 13 (0,3) · ÍNDICE + CORRESP (0,5).

## Questão 4 — Saldo, SE aninhado e formatação condicional (1,5)

| Célula | Fórmula |
|---|---|
| Movimentacao!H2 | `=SE(D2="Entrada";E2;-E2)` |
| Cadastro!H2 | `=SOMASE(Movimentacao!$B$2:$B$100;A2;Movimentacao!$H$2:$H$100)` |
| Cadastro!I2 | `=G2+H2` |
| Cadastro!J2 | `=I2*E2` |
| Cadastro!K2 | `=SE(I2<F2;"Crítico";SE(I2<=F2*1,5;"Atenção";"Normal"))` |

| Código | Mínimo | Saldo inicial | Movimentado | Saldo atual | Valor em estoque | Situação |
|---|---|---|---|---|---|---|
| MAT-001 | 40 | 55 | +10 | 65 | R$ 1.228,50 | Normal |
| MAT-002 | 20 | 18 | +10 | 28 | R$ 350,00 | Atenção |
| MAT-003 | 100 | 250 | −60 | 190 | R$ 342,00 | Normal |
| MAT-004 | 80 | 60 | −30 | 30 | R$ 96,00 | Crítico |
| MAT-005 | 500 | 1200 | −400 | 800 | R$ 360,00 | Normal |
| MAT-006 | 500 | 480 | −150 | 330 | R$ 49,50 | Crítico |
| MAT-007 | 500 | 900 | 0 | 900 | R$ 72,00 | Normal |
| MAT-008 | 300 | 350 | 0 | 350 | R$ 42,00 | Atenção |
| MAT-009 | 15 | 12 | −5 | 7 | R$ 48,30 | Crítico |
| MAT-010 | 100 | 180 | +50 | 230 | R$ 782,00 | Normal |
| MAT-011 | 10 | 14 | −6 | 8 | R$ 199,20 | Crítico |
| MAT-012 | 30 | 25 | −10 | 15 | R$ 147,00 | Crítico |
| MAT-013 | 12 | 20 | −4 | 16 | R$ 232,00 | Atenção |
| MAT-014 | 50 | 90 | 0 | 90 | R$ 171,00 | Normal |
| MAT-015 | 5 | 7 | 0 | 7 | R$ 154,00 | Atenção |
| **Total** | | | | | **R$ 4.273,50** | 5 Crítico · 4 Atenção · 6 Normal |

Regra de Atenção: saldo entre o mínimo e 1,5 × o mínimo (ex.: MAT-015, mínimo 5 → Atenção até 7,5).

**Critérios:** Qtd com Sinal (0,2) · SOMASE com `$` (0,4) · Saldo e Valor (0,2) · SE aninhado (0,4) · formatação condicional nas 3 situações e barras de dados em J (0,3).

## Questão 5 — Resumo com CONT.SE, SOMASE e PROCH (1,0)

| Célula | Fórmula | Valor esperado |
|---|---|---|
| B3 (Crítico) | `=CONT.SE(Cadastro!$K$2:$K$16;A3)` | 5 |
| B4 (Atenção) | idem com A4 | 4 |
| B5 (Normal) | idem com A5 | 6 |
| B6 | `=SOMA(B3:B5)` | 15 |
| B9 (EPI) | `=SOMASE(Cadastro!$C$2:$C$16;A9;Cadastro!$J$2:$J$16)` | R$ 2.016,50 |
| B10 (Fixação) | idem | R$ 523,50 |
| B11 (Elétrico) | idem | R$ 1.029,50 |
| B12 (Ferramentas) | idem | R$ 704,00 |
| B13 | `=SOMA(B9:B12)` | R$ 4.273,50 |
| C9:C13 | `=B9/$B$13` | 47,2% · 12,2% · 24,1% · 16,5% · 100,0% |
| B16 | `=SOMASE(Movimentacao!$D$2:$D$100;"Saída";Movimentacao!$G$2:$G$100)` | R$ 1.124,40 |
| B22 (B21 = Set) | `=PROCH(B21;A18:G19;2;0)` | R$ 1.200,00 |
| B23 | `=SE(B16<=B22;"Dentro do limite";"Acima do limite")` | Dentro do limite |

Conferência das saídas: 378,00 + 180,00 + 34,50 + 96,00 + 98,00 + 22,50 + 108,00 + 58,00 + 149,40 = **1.124,40**. Entradas (para o teste da dica): 125,00 + 170,00 + 567,00 = **862,00**.

**Critérios:** CONT.SE (0,3) · SOMASE e % (0,3) · PROCH (0,3) · SE de conclusão (0,1).

## Questão 6 — Filtro e proteção (1,0)

| Conferir | Esperado | Pontos |
|---|---|---|
| Filtro Situação = Crítico | 5 itens (MAT-004, 006, 009, 011, 012) | — |
| + Categoria = EPI | 1 item: **Máscara PFF2** (MAT-004), anotado em Resumo!B25 | 0,4 |
| Movimentacao: A2:B100 e D2:E100 desbloqueadas | Digitação liberada nessas colunas | 0,3 |
| Movimentacao protegida com `senai2026` | Alterar G2 mostra o aviso | 0,3 |

A entrega do arquivo passou para a Questão 10.

## Questão 7 — Base de requisições: formatação e indicadores (0,75)

Os dados vêm prontos (botão Copiar); vale a **formatação**. Base: 120 registros, linhas 2 a 121.

| Conferir | Esperado | Pontos |
|---|---|---|
| Cabeçalho A1:J1 | Azul-escuro, fonte branca, negrito, centralizado | 0,15 |
| A2:A121 Data abreviada; G e I em Moeda | 01/09/2026 · R$ 18,90 | 0,20 |
| H em Porcentagem (0 casas); F número inteiro | 5% · 15% | 0,10 |
| Alinhamento (texto à esquerda, números à direita, Status centralizado), bordas A1:J121, colunas ajustadas | Sem `####` | 0,15 |
| Aba `Analise`, B3:B8, Moeda em B3:B6 e inteiro em B7:B8 | Ver tabela abaixo | 0,15 |

| Célula | Fórmula | Valor esperado |
|---|---|---|
| Analise!B3 | `=SOMA(Requisicoes!$I$2:$I$121)` | R$ 12.263,95 |
| Analise!B4 | `=MÉDIA(Requisicoes!$I$2:$I$121)` | R$ 102,20 |
| Analise!B5 | `=MÁXIMO(Requisicoes!$I$2:$I$121)` | R$ 594,40 |
| Analise!B6 | `=MÍNIMO(Requisicoes!$I$2:$I$121)` | R$ 4,88 |
| Analise!B7 | `=CONT.VALORES(Requisicoes!$B$2:$B$121)` | 120 |
| Analise!B8 | `=CONT.NÚM(Requisicoes!$F$2:$F$121)` | 120 |

## Questão 8 — SE aninhado e formatação condicional (0,75)

| Conferir | Esperado | Pontos |
|---|---|---|
| Requisicoes!K2 `=SE(I2>=300;"Alto";SE(I2>=100;"Médio";"Baixo"))` copiada até K121 | 4 Alto · 44 Médio · 72 Baixo | 0,15 |
| H2:H121: Realçar Regras → É Maior Que `10%`, amarelo | 20 células amarelas (desconto de 15%) | 0,10 |
| I2:I121: 10 Primeiros Itens, verde | Exatamente 10 células verdes | 0,10 |
| F2:F121: Escala de Cor verde-amarelo-vermelho | Gradiente em toda a coluna | 0,10 |
| A2:K121: regra `=$J2="Cancelada"`, vermelho claro | 12 linhas inteiras vermelhas | 0,30 |

Em Gerenciar Regras devem existir 4 regras: fórmula (A2:K121), escala (F), 10 primeiros (I) e
maior que 10% (H).

## Questão 9 — Filtros, classificação, CONT.SE, SOMASE e PROCV (0,75)

| Conferir | Esperado | Pontos |
|---|---|---|
| Filtro Categoria = Ferramentas e Status = Pendente | 2 registros; filtros limpos ao final | 0,10 |
| Classificação em 2 níveis (Categoria A→Z; Valor Total maior→menor) e filtro por cor (Cancelada) | 12 linhas vermelhas no filtro por cor | 0,15 |
| Resumo por status formatado (Moeda, %, número; Total em negrito e borda dupla) | Tabela abaixo | 0,30 |
| Consulta de código com formatos corretos | Tabela abaixo | 0,20 |

| Célula | Fórmula | Valor esperado |
|---|---|---|
| Analise!B12 (Entregue) | `=CONT.SE(Requisicoes!$J$2:$J$121;A12)` | 90 |
| Analise!B13 (Pendente) | idem | 18 |
| Analise!B14 (Cancelada) | idem | 12 |
| Analise!C12 | `=SOMASE(Requisicoes!$J$2:$J$121;A12;Requisicoes!$I$2:$I$121)` | R$ 9.386,64 |
| Analise!C13 · C14 | idem | R$ 1.735,76 · R$ 1.141,55 |
| Analise!D12 | `=C12/$C$15` | 76,5% (Pendente 14,2%, Cancelada 9,3%) |
| Analise!B15 · C15 · D15 | `=SOMA(...)` | 120 · R$ 12.263,95 · 100,0% |
| Analise!B19 (B18 = MAT-010) | `=SEERRO(PROCV(B18;Cadastro!$A$2:$G$16;2;0);"Código não cadastrado")` | Cabo flexível 2,5 mm² (`MAT-099` → Código não cadastrado) |
| Analise!B20 | `=SOMASE(Requisicoes!$B$2:$B$121;B18;Requisicoes!$F$2:$F$121)` | 205 |
| Analise!B21 | `=CONT.SE(Requisicoes!$I$2:$I$121;">"&B4)` | 48 |

## Questão 10 — Congelar, Preenchimento Relâmpago, impressão e entrega (0,75)

| Conferir | Esperado | Pontos |
|---|---|---|
| Congelar Painéis a partir de `C2` | Linha 1 e colunas A e B fixas ao rolar | 0,15 |
| Coluna `Item` (L) com Ctrl+E | Primeira palavra da Descrição (ex.: Luva, Óculos, Broca) | 0,10 |
| Cabeçalho: centralizado, vertical centro, quebra de texto, altura 30 | Títulos legíveis | 0,10 |
| Paisagem, margens estreitas, ajustar a 1 página de largura | Visualização de impressão deitada | 0,15 |
| Linhas a repetir `$1:$1` e linhas de grade desmarcadas | Título em todas as páginas | 0,10 |
| Arquivo `ESTOQUE-NOME-SOBRENOME.xlsx` com 6 abas | Cadastro, Movimentacao, Consulta, Resumo, Requisicoes e Analise | 0,15 |

---

## Erros comuns para observar na correção

- `#N/D` nas últimas linhas da Movimentacao: faltou `$` na tabela do PROCV.
- Custo `0` em alguma linha: código digitado com espaço ou número guardado como texto.
- Saldo igual ao inicial em todos os itens: coluna H da Movimentacao vazia ou SOMASE sem `$`.
- Todas as situações "Normal": SE aninhado com a ordem dos testes trocada.
- CONT.SE devolvendo 0: palavra da situação sem acento (Critico × Crítico).
- Planilha protegida sem conseguir digitar: células de entrada não foram desbloqueadas antes.
