# Mover o gerador de atividades para `assets/`

- **Criado em:** 2026-09-23 19:36
- **Concluído em:** 2026-09-23 19:43
- **Tempo decorrido:** ~7 min
- **Status geral:** ✅ Concluído

## Objetivo

Levar a pasta `_gerador` (hoje em
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/_gerador/`) para
`assets/gerador-atividades/`, na raiz. Assim, qualquer disciplina pode reutilizar o mesmo gerador,
seguindo a regra de CSS/JS genéricos em `assets/`.

## Escopo

- Mover `gerar_atividades.py` e `template_atividade.html` para `assets/gerador-atividades/`.
- Deixar o gerador genérico:
  - a pasta de atividades passa a ser um **argumento** (hoje ela é a pasta-mãe do script);
  - os caminhos para `assets/css` e `assets/js` passam a ser **calculados** a partir da pasta de
    destino (hoje estão fixos em `../../../../`);
  - o título e o curso do índice saem do código e vão para um arquivo de dados
    `atividades.json` dentro da pasta de atividades (regra: scripts em `assets/` não podem ter
    nomes de matéria fixos no código).
- Criar `ATIVIDADES/atividades.json` para ITIC (AOL).
- Atualizar a nota "Fonte única" nos 10 `.md` de questões e o rodapé do `index.html` com o novo
  comando.
- Registrar o gerador no exemplo de `assets/` do `CLAUDE.md` da raiz.
- Rodar o gerador para ITIC e conferir que os HTML gerados continuam iguais (só o texto do
  rodapé muda).

## Fora do escopo

- Mudar o layout ou o conteúdo das questões.
- Escrever testes automatizados.

## Arquivos previstos

| Ação | Caminho |
|---|---|
| Mover + editar | `assets/gerador-atividades/gerar_atividades.py` |
| Mover | `assets/gerador-atividades/template_atividade.html` |
| Remover pasta | `MATERIAIS/.../INTRODUCAO-TIC/ATIVIDADES/_gerador/` |
| Criar | `MATERIAIS/.../INTRODUCAO-TIC/ATIVIDADES/atividades.json` |
| Editar | `MATERIAIS/.../INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-01..10-50-QUESTOES.md` (linha "Fonte única") |
| Regenerar | `MATERIAIS/.../INTRODUCAO-TIC/ATIVIDADES/*.html` e `index.html` |
| Editar | `CLAUDE.md` (seção de `assets/`) |

## Novo uso

```powershell
C:\Python314\python.exe assets\gerador-atividades\gerar_atividades.py MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\ATIVIDADES
```

`atividades.json` (o template também tinha UC e docente fixos, então os quatro campos viraram dados):

```json
{
  "uc": "Introdução à Tecnologia da Informação e Comunicação",
  "uc_curta": "Introdução à TIC",
  "curso": "Assistente de Operações Logísticas",
  "docente": "Gelvazio Camargo"
}
```

## Riscos e dependências

- Se o caminho relativo calculado estiver errado, as páginas perdem o CSS/JS. Verificação: o
  `git diff` dos HTML regenerados não pode mostrar mudança nas linhas `href`/`src`.
- `git mv` preserva o histórico dos dois arquivos.

## Passos

| # | Passo | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | `git mv` da pasta `_gerador` para `assets/gerador-atividades/` | ver tabela acima | pasta antiga não existe mais | ✅ Concluído |
| 2 | Tornar o gerador genérico (argumento de pasta, caminho relativo calculado, título lido de `atividades.json`) | `gerar_atividades.py` | leitura do código | ✅ Concluído |
| 3 | Trocar `../../../../assets/` do template por um placeholder `{{ASSETS}}` | `template_atividade.html` | nenhum `../../../../` no template | ✅ Concluído |
| 4 | Criar `atividades.json` de ITIC | `ATIVIDADES/atividades.json` | JSON válido | ✅ Concluído |
| 5 | Atualizar a nota "Fonte única" dos 10 `.md` | `ATIVIDADES-AULA-*.md` | nenhum `_gerador/` restante | ✅ Concluído |
| 6 | Rodar o gerador para ITIC | HTML + `index.html` | 10 aulas geradas; diff só no rodapé | ✅ Concluído |
| 7 | Registrar o gerador no `CLAUDE.md` | `CLAUDE.md` | seção de `assets/` atualizada | ✅ Concluído |

## Resultado final

- `_gerador` movida com `git mv` para `assets/gerador-atividades/`.
- Gerador recebe a pasta como argumento, calcula o caminho até `assets/` e lê `atividades.json`.
- Os 10 HTML regenerados ficaram idênticos; só o rodapé do `index.html` mudou (novo comando).
- `graphify-out/` passou para o `.gitignore` e foi retirada do índice do Git (os arquivos locais continuam).
