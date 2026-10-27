# Análises da pasta MATERIAIS

Esta pasta guarda a análise da pasta `MATERIAIS`: contagem de arquivos por tipo e por pasta.
O script só lê nomes, extensões, tamanhos e datas. Nenhum arquivo de `MATERIAIS` é aberto.

## Como gerar o JSON

Na raiz do projeto, rode:

```bash
C:\Python314\python.exe analises\analisar_materiais.py
```

O script grava `analises\analise-materiais.json`. Ele ignora `__pycache__` e `.git`, não segue
links simbólicos e não altera nada dentro de `MATERIAIS`.

## Campos do JSON

| Campo | O que significa |
|-------|-----------------|
| `geradoEm` | Data e hora em que o script rodou (ISO 8601, com fuso) |
| `pastaBase` | Pasta analisada (`MATERIAIS`) |
| `totalArquivos` | Quantidade total de arquivos encontrados |
| `porTipo` | Quantidade de arquivos por extensão (ex.: `md`, `html`, `pdf`), do maior para o menor |
| `porPasta` | Por pasta de primeiro nível: `total` e `porTipo` daquela pasta |
| `arquivos` | Lista com `caminho`, `pasta`, `tipo`, `tamanhoBytes` e `modificadoEm` de cada arquivo |

Arquivo sem extensão aparece como `(sem extensão)`. A soma de `porTipo` é igual a `totalArquivos`.

## Página do painel

`analises/index.html` lê `analise-materiais.json` e mostra os números. Ela precisa de um
servidor HTTP para carregar o JSON; abrir o arquivo direto pelo navegador (`file://`) não basta.

## Última geração

Última geração registrada no JSON: 2026-10-26 (21h19, horário de Brasília; o campo
`geradoEm` guarda o mesmo instante em UTC).
