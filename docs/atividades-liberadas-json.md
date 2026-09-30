> ⚠️ **Substituído em 2026-09-30:** liberar/bloquear atividades agora vem do banco de dados (`atividade.ativo`, interruptor "Bloquear" nos cards). O arquivo `ATIVIDADES-LIBERADAS` e o script `indice-atividades-liberadas.js` foram removidos.

# ATIVIDADES-LIBERADAS.json — liberar/bloquear atividades no índice da matéria

**Objetivo:** No índice
`MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html`,
mostrar como **bloqueada** para o aluno toda atividade que não estiver na lista do arquivo
`ATIVIDADES-LIBERADAS.json` (mesma pasta).

**Tech Stack:** JSON + JS/CSS reutilizáveis em `assets/` + gerador `assets/gerador-indices/`

**Criado em:** 2026-09-27
**Concluído em:** 2026-09-27
**Tempo decorrido:** ~20 min

---

## Escopo

- ✅ Criar `ATIVIDADES/ATIVIDADES-LIBERADAS.json`, liberando no início:
  ```json
  {
    "liberadas": [
      "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
      "ATIVIDADE-EXCEL-29-09-2026.html",
      "ATIVIDADE-EXCEL-01-10-2026.html"
    ]
  }
  ```
  Para liberar outra atividade, basta acrescentar o nome do arquivo à lista.
- ✅ Novo `assets/js/indice-atividades-liberadas.js`: lê o JSON; o card cujo arquivo não está na
  lista recebe a classe `bloqueada`, o botão vira "🔒 Bloqueada" e o link é removido.
  Sem o JSON (ou com erro de leitura) nada é bloqueado.
- ✅ `assets/css/indice-atividades.css`: estilo `.aula.bloqueada` (card esmaecido, cadeado).
- ✅ Gerador `gerar_indices.py`: cada card de atividade ganha `data-arquivo="<nome>"`; quando a
  pasta tem `ATIVIDADES-LIBERADAS.json`, a página inclui o script (atributo
  `data-lista-liberadas`). Assim o bloqueio sobrevive a novas gerações e vale para qualquer
  matéria que ganhar o JSON.
- ✅ Regenerar os índices e registrar no `CLAUDE.md` (regra de `assets/`).

## Riscos

- ⚠️ É um bloqueio **visual** (site estático, sem login): quem souber o endereço do arquivo ainda
  consegue abri-lo. Bloqueio real exigiria autenticação/servidor.
- O `fetch` do JSON só funciona via servidor (Live Server `127.0.0.1:5500`); aberto como
  `file://`, o JSON não é lido e nada é bloqueado.

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar `ATIVIDADES-LIBERADAS.json` | ✅ Concluído |
| 2 | Criar `assets/js/indice-atividades-liberadas.js` | ✅ Concluído |
| 3 | Estilo `.aula.bloqueada` em `assets/css/indice-atividades.css` | ✅ Concluído |
| 4 | Ajustar `gerar_indices.py` (`data-arquivo` + script) e regenerar | ✅ Concluído |
| 5 | Registrar no `CLAUDE.md` e commit local | ✅ Concluído |

**Verificação:** conferir no HTML gerado os `data-arquivo`, o `<script src>` e o atributo
`data-lista-liberadas`; validar o JSON com `python -m json.tool`.

---

## Resultado (2026-09-27)

- **Mudança pedida durante a execução:** a lista saiu do JSON e foi para
  `ATIVIDADES/ATIVIDADES-LIBERADAS.js` (`window.ATIVIDADES_LIBERADAS = [...]`), carregado por
  `<script src>` antes de `assets/js/indice-atividades-liberadas.js`. Sem `fetch`: funciona também
  em `file://`. O `ATIVIDADES-LIBERADAS.json` foi removido.
- Cards fora da lista: classe `bloqueada`, botão "🔒 Bloqueada", `href` removido e clique bloqueado.
- Bloqueio continua sendo visual (o arquivo ainda abre por URL direta).
