# Tarefa #10 — EMENTA-PRINCIPAL detalhada dos demais cursos

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** ~3 horas

## Objetivo
Refazer o `EMENTA-PRINCIPAL-<CURSO>.md` de cada curso restante a partir do documento oficial,
detalhado para uso em IA, no formato das tarefas #8 e #9 (14 seções, UCs transcritas do
documento, divergências e campos pendentes registrados). Executar **um curso por vez**.

## Levantamento das fontes (2026-09-25)

| # | Curso | Fonte | Tipo / tamanho | Ementa atual | Permissão |
|---|-------|-------|----------------|--------------|-----------|
| 10.1 | AUTOMACAO-INDUSTRIAL-1200-HORAS | `CT Automação Industrial 1200 SENAI SED.pdf` | PDF, 207 págs | 311 mil chars | IGNORAR |
| 10.2 | BACKEND-560-HORAS | `BackEnd - 570h.docx` | DOCX | 14 mil chars | IGNORAR |
| 10.3 | GESTAO_E_CONTROLE_MATERIAIS | `GestaoControleMateriais_456h.docx` | DOCX, 17 UCs detalhadas | 3 mil chars | **VERIFICAR** |
| 10.4 | INFORMATICA | `Curso-Tecnico-Informatica-1200h.txt` | TXT, 115 mil chars | 113 mil chars | IGNORAR |
| 10.5 | INTERNET-DAS-COISAS | `CT Internet das coisas 1300 SENAI SED.pdf` | PDF, 218 págs | 220 mil chars | IGNORAR |
| 10.6 | MECATRONICA | `CT-Mecatronica_1348h.txt` | TXT, 583 mil chars | 566 mil chars | IGNORAR |
| 10.7 | OPERADOR-PRODUCAO-INDUSTRIAL | `Operador de Produção Industrial_ 860h - Pratica Profissional.docx` | DOCX | 0,3 mil chars | IGNORAR |
| 10.8 | REDES-DE-COMPUTADORES | `EMENTA-PRINCIPAL-Redesde-Computadores.txt` | TXT, 120 mil chars | 116 mil chars | IGNORAR |
| 10.9 | RIO_DO_SUL_MAIS_TECH | Sem documento na pasta | — | 15 mil chars | **VERIFICAR** |
| 10.10 | TECNICO-DESENVOLVIMENTO-SISTEMAS | `CT Desenvolvimento de Sistemas 1200 SENAI SED.pdf` | PDF, 74 págs | 93 mil chars | IGNORAR |
| 10.11 | TECNICO-INFORMATICA-INTERNET | `CT-Informatica-Internet-1000-SENAI-SED-2026.pdf` | PDF, 94 págs | 0,4 mil chars | IGNORAR |

## Subtarefa em execução: 10.3 GESTAO_E_CONTROLE_MATERIAIS
- Fonte: Projeto de Curso de Aprendizagem Industrial, **456h**, CONAP 999, nível 2, eixo Gestão e
  Negócios, 3 ocupações CBO (4141-40, 4141-05, 4110-10).
- Matriz: 17 UCs (Educação para o Trabalho 156h + Específico 300h), **todas detalhadas** no
  Anexo II.
- Divergências a registrar: CH teórica 48h + 156h + 300h = 504h contra 456h da matriz; prática
  profissional "XXXh"; unidade, endereço e cidade de modelo; requisito de menores de 18 anos com
  redação diferente dos outros cursos (conferir texto literal).
- A UC Análise de Dados Aplicada à Gestão tem `EMENTA-CHALKIE-AI.md` própria, que deve seguir a
  ementa do curso (fonte da verdade, regra de 2026-09-25).

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Levantar as fontes dos 11 cursos | pastas dos cursos | Tabela acima | ✅ Concluído |
| 2 | 10.3 Gestão e Controle de Materiais (.docx) | `EMENTA-PRINCIPAL-GESTAO_E_CONTROLE_MATERIAIS.md` | 17 UCs, 456h | ✅ Concluído |
| 3 | 10.2 BackEnd e 10.7 Operador de Produção (.docx) | `EMENTA-PRINCIPAL-BACKEND-560-HORAS.md`, `EMENTA-PRINCIPAL-OPERADOR-PRODUCAO-INDUSTRIAL.md` | 17 UCs (570h); 18 UCs (860h) | ✅ Concluído |
| 4 | 10.9 Rio do Sul Mais Tech: conferência com a ficha atualizada | `EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md` | Seção 7.1 | ✅ Concluído |
| 5 | Conversor de Plano de Curso Técnico (PDF com PyMuPDF e TXT) | script auxiliar (scratchpad) | UCs completas nos 7 cursos | ✅ Concluído |
| 6 | 10.10 Desenv. Sistemas, 10.11 Informática p/ Internet, 10.1 Automação, 10.5 IoT (PDF) | `EMENTA-PRINCIPAL-<CURSO>.md` | 16, 19, 26 e 28 UCs | ✅ Concluído |
| 7 | 10.4 Informática, 10.6 Mecatrônica, 10.8 Redes (TXT) | `EMENTA-PRINCIPAL-<CURSO>.md` | 17, 28 e 15 UCs; matriz reconstruída (1200h, 1348h, 1000h) | ✅ Concluído |
| 8 | Atualizar `TASKS.md` e commit local | `TASKS.md` | Hash do commit | ✅ Concluído |

## Resultado
Ementas principais detalhadas geradas ou conferidas para os 11 cursos. Divergências registradas
em cada arquivo: CH teórica × matriz (cursos de Aprendizagem), Anexo I × matriz em IoT (1420h ×
1300h), 4 UCs sem conhecimentos no TXT de Informática, Anexo I duplicado no TXT de Mecatrônica e
matriz ausente nos 3 TXT (reconstruída a partir do Anexo I).
