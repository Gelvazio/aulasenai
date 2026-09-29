# Estruturar CONTEUDO-JA-PASSADO-CEPLAS-MANHA para IA

**Criado em:** 2026-09-29 | **Conclusão:** pendente | **Tempo decorrido:** —
**Matéria:** `MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO` (UC 2, 33h)

## Objetivo
Transformar a exportação bruta (tabela TSV do sistema) em um documento estruturado, legível por
IA, com os conteúdos que **já foram passados** pela turma CEPLAS manhã, para que aulas, slides e
atividades novos não repitam nem contradigam o que foi dado.

## Análise da fonte
- 32 linhas de 1h (16 encontros de 2h, terças 07:30–09:30), de 24/02 a 10/11/2026.
- **Já passado (linhas 1–22, 22h):** Segurança da Informação (2h), História da Informática (2h),
  Hardware e sistemas operacionais (4h), Fundamentos da Programação (2h) — docente Paulo Henrique
  Warmling; Planilhas Eletrônicas (12h, 31/03 a 12/05) — docente Joel Schafer.
- **Ainda "Aguardando atualização" (linhas 23–32, 10h):** 29/09 e 06/10 (Gelvazio Camargo);
  27/10, 03/11, 10/11 (Samir de Moura Bueno).
- Fonte só traz títulos, datas e docentes: **não traz o que foi ensinado em cada tema**.

## Escopo
- Criar `CONTEUDO/CONTEUDO-JA-PASSADO-CEPLAS-MANHA-IA.md` (novo; a fonte não é alterada).
- Estrutura: contexto e instruções para IA; resumo em tabela; blocos por tema (datas, carga,
  docente, ementa relacionada); lista de aulas a planejar; regras de uso (não repetir, ementa vence).
- Fora do escopo: inventar o detalhe dos conteúdos; alterar ementa, `aulas-lecionadas.json` e outros.

## Riscos
- Detalhe do conteúdo ausente: o documento marcará "detalhar" onde faltar; pode ser complementado.
- `aulas-lecionadas.json` diverge desta fonte (2 aulas x 11 encontros): não será corrigido agora.

## Passos
| # | Estado | Ação | Arquivo | Verificação |
|---|--------|------|---------|-------------|
| 1 | ✅ Concluído | Ler a fonte e analisar | `CONTEUDO/CONTEUDO-JA-PASSADO-CEPLAS-MANHA.md` | 32 linhas conferidas |
| 2 | ✅ Concluído | Criar o documento estruturado para IA | `CONTEUDO/CONTEUDO-JA-PASSADO-CEPLAS-MANHA-IA.md` | Totais: 22h dadas + 10h pendentes = 32h |
| 3 | ⬜ Pendente | Commit (regra dos 10 chats / pedido) | — | — |
