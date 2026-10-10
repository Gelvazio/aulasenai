> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 84 — Botão "Exportar Usuários em PDF" na página de usuários (tarefa pequena, 2026-10-08 13:17:15)

Pedido: em `scripts/criarUsuariosBancoDados.html`, botão que exporta em PDF os usuários selecionados da tabela de consulta, só em ambiente local.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 84.1 | `assets/js/criar-usuarios-exportar-pdf.js` (novo): folha com as linhas marcadas e visíveis (Nº, Aluno, Aluno anotou?, E-mail, Senha como exibida, Cadastrado) + impressão do navegador; bloqueado fora de 127.0.0.1/localhost | ✅ Concluído | 2026-10-08 13:20 | `node --check` sem erros |
| 84.2 | PDF compacto só nesta atividade (campo opcional `PDF compacto` no gerador e no exportador): fonte e espaços menores, sem a linha "Aula" e sem a caixa de capacidade de cada questão (fica no quadro do topo) | ✅ Concluído | 2026-10-08 10:48 | `py_compile` e `node --check` OK; sem o campo, o PDF continua igual |
| 84.3 | Medição do PDF (larguras da Helvetica, sem navegador): até 4 páginas | ✅ Concluído | 2026-10-08 10:48 | Sem caixas de resposta: **3 páginas** (2 folhas frente e verso) |
