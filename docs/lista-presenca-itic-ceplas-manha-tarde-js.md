# Criar LISTA-PRESENCA-ITIC-CEPLAS-MANHA.js e LISTA-PRESENCA-ITIC-CEPLAS-TARDE.js

- **Criado em:** 2026-09-29
- **Status:** ✅ Concluído (2026-09-29)
- **Objetivo:** dois arquivos `.js` de lista de presença, um por turma de Introdução à TIC
  (Assistente de Operações Logísticas), no mesmo formato de `window.LISTA_PRESENCA`.
- **Tecnologias:** JavaScript (dados), sem lógica.
- **Riscos:** dados pessoais de menores (LGPD) — os arquivos casam com `.gitignore`
  (`LISTA-PRESENCA*.js`) e não vão para o Git. Senhas nunca são repetidas no chat.
- **Dependências:** `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/LISTA-PRESENCA.js`
  (fonte de nomes, e-mails e senhas iniciais já gerados) e os `.docx` de `scripts/`.

## Arquivos previstos

| Arquivo | Turma |
|---|---|
| `scripts/LISTA-PRESENCA-ITIC-CEPLAS-MANHA.js` | AI AOPL 2026/2 M1 (135080), 07:15 às 11:15 |
| `scripts/LISTA-PRESENCA-ITIC-CEPLAS-TARDE.js` | AI AOPL 2026/2 V1 (135081), 13:15 às 17:15 |

## Passos

| # | Passo | Verificação | Status |
|---|---|---|---|
| 1 | Ler `LISTA-PRESENCA.js` da matéria e separar as turmas 135080 e 135081 | contar alunos por turma | ✅ Concluído |
| 2 | Comparar os nomes com os `.docx` de `scripts/` e avisar diferenças | lista de divergências | ⛔ Não executado |
| 3 | Gravar `scripts/LISTA-PRESENCA-ITIC-CEPLAS-MANHA.js` (só a turma 135080) | `node -e` carregando o arquivo | ✅ Concluído |
| 4 | Gravar `scripts/LISTA-PRESENCA-ITIC-CEPLAS-TARDE.js` (só a turma 135081) | `node -e` carregando o arquivo | ✅ Concluído |
| 5 | Conferir `git check-ignore` nos dois arquivos | ambos ignorados | ✅ Concluído |

## Extensão: uso em `scripts/criarUsuariosBancoDados.html`

- A página passou a carregar os dois arquivos novos além de `LISTA-PRESENCA-CEPLAS-MANHA.js`.
- Os arquivos novos somam em `window.LISTAS_PRESENCA`; `assets/js/criar-usuarios-pagina.js` junta
  com `window.LISTA_PRESENCA` (`reunirListasPresenca`) e grava tudo pelo botão.
- Verificação: `node --check` no JS; carga dos 3 arquivos = 3 turmas, 77 alunos, 0 e-mails repetidos.

## Ajuste: um botão por turma

`criarUsuariosBancoDados.html` monta um cartão por turma (3: QA LBTSN 2026/1 M2, 135080 e 135081),
cada um com tabela de alunos, botão próprio e área de resultado; o botão grava só os alunos da
sua turma. A opção "Regravar a senha" é única e vale para o botão clicado.

## Ajuste: abas

As turmas viram abas no topo (`.guia-aba`); clicar alterna o cartão visível da turma.

## Ajuste: coluna Cadastrado, seleção e filtro

Ao abrir, a página consulta auth.users (API admin) e preenche "Cadastrado" (Sim/Não; "?" se a consulta falhar). Cada aluno tem caixa de seleção à esquerda, há "Marcar todos" (só linhas visíveis) e filtro Todos/Gravados/Não gravados. O botão grava só os selecionados e, ao terminar, consulta de novo. Arquivos: `assets/js/criar-usuarios-tabela.js` (novo), `criar-usuarios-pagina.js`, `criar-usuarios-api.js`, CSS e HTML.
