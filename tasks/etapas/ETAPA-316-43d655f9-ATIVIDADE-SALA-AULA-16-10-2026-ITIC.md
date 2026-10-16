## Etapa 316-43d655f9 — Atividade de sala de aula de 16-10-2026 (ITIC) em HTML, fora do sistema

**Tarefa:** #189-43d655f9-4571-4788-b5fa-e128297ed30f · **Pedido em:** 2026-10-16 09:13 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "LEIA C:\fontes\aulasenai\MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\ATIVIDADES\ATIVIDADE-SALA-AULA-16-10-2026\
E CRIE 1 ATIVIDADE EM HTML, COM OPCAO DE EXPORTACAO EM PDF,MAS NAO LINK NAS ATIVIDADES EM BANCO DE
DADOS, ESTA ATIVIDADE SERA POR FORA DO SISTEMA"
**Objetivo:** uma página HTML avulsa (abre com duplo clique, sem login e sem banco) com a atividade
de sala de 16-10-2026, que o aluno responde e exporta em PDF.

### #189.1 — Criar a página HTML da atividade com exportação em PDF

**Próximo passo:** — (entregue; aceite na #189.2).

- **Nível:** MEDIO — página com lógica (JS de exportação em PDF), 1 a 3 arquivos, sem banco.
- **Descrição:** página dentro da própria pasta da atividade, sem link no banco nem nos índices de
  atividades do sistema; sem gabarito na página.
- **Critérios de aceitação:** abre por duplo clique; o aluno preenche e exporta o PDF; nada no banco.
- **Entrega:** na pasta `ATIVIDADE-SALA-AULA-16-10-2026/`: `ATIVIDADE-SALA-AULA-16-10-2026.html`
  (Aula 4 — 12 objetivas + 5 situações práticas, "você como aluno consultor", sem gabarito),
  `atividade-sala.css`, `atividade-sala.js` (coleta e eventos), `atividade-sala-pdf.js` (PDF com
  cabeçalho SENAI, respostas do aluno e "Página N de T") e `atividade-sala-rascunho.js` (respostas
  guardadas no navegador). Fonte: `4-Comunicação-Digital-e-Colaboração-em-Nuvem.md` da pasta.
  Sem banco e sem link em índices ou no `MENU-ATIVIDADES.js`.
- **Verificação:** `node --check` nos 3 JS; linhas ≤ 100 (exceto a URL do CDN); busca confirmou
  que nenhum outro arquivo aponta para a página. Sem navegador (regra do projeto).

### #189.2 — Aceite do usuário

**Próximo passo:** — (dispensado: a pedido do usuário a página avulsa saiu e a atividade virou a discursiva id 152 da #191, etapa 318-05ad7d1d).

- **Nível:** LEVE — conferência do usuário.
