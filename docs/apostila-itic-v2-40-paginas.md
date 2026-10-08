# Apostila de Introdução à TIC — versão 2 (reduzida para 40 páginas)

- **Criado em:** 2026-10-08 08:36:51
- **Concluído em:** 2026-10-08 08:52 (aguardando aceite)
- **Tempo decorrido:** cerca de 15 min
- **Etapa no `STATUS.md`:** Etapa 79
- **Pedido do usuário (2026-10-08 08:36):** "Diminuição da apostila de ITIC para uma nova versão, com
  apenas 40 páginas, criando novo Markdown e novo HTML de apostila com a versão V2."

## Objetivo

Criar uma **segunda versão (V2)** da apostila de Introdução à TIC com **no máximo 40 páginas A4**
(a versão 1 tem 84), em Markdown completo novo e HTML novo, **sem apagar nem alterar a versão 1**.

> 🔁 **Mudança de escopo (2026-10-08 08:48, pedido do usuário):** a V2 **não tem vídeos nem exercícios** (o
> usuário fará à parte). Cada capítulo = teoria + resumo + glossário. Pedido junto: paginação
> "Página N de T" no PDF de todas as apostilas (regra no `CLAUDE.md` global).

## Escopo

- **Entra:**
  - fontes condensadas da V2 em `APOSTILA/CONTEUDO-V2/` (`INTRODUCAO.md` + `CAPITULO-01..10.md`),
    escritas a partir dos capítulos da V1 (Markdown, nunca de PDF);
  - Markdown completo novo `APOSTILA/APOSTILA-INTRODUCAO-TIC-V2.md`;
  - HTML novo `APOSTILA/APOSTILA-INTRODUCAO-TIC-V2.html`, versão **2.0**;
  - opção nova e genérica no gerador (`--edicao V2`) para ler/gravar os arquivos da edição, sem
    afetar a geração normal (V1) de nenhuma matéria.
- **Não entra:** mudar a V1 (`CONTEUDO/`, `APOSTILA-INTRODUCAO-TIC.md/.html/.pdf`), mudar a
  ementa, criar testes automatizados, link no menu (só se o usuário pedir).
- **Critério de pronto:** conferência com a ementa em 100% no Markdown V2; HTML V2 gerado sem
  avisos; contagem de páginas ≤ 40; aceite do usuário.
- **Premissas e restrições:**
  - continuam valendo as regras de apostila: 10 capítulos (1 por aula), mesmas capacidades por
    capítulo, **todos** os conteúdos oficiais tratados, termos oficiais do glossário com a
    definição literal da ementa, **mínimo de 5 exercícios por capítulo**, vídeos ≤ 15 min (os
    mesmos da V1 já conferidos), sem gabarito;
  - o que reduz as páginas: teoria resumida (só o essencial de cada conteúdo oficial, menos
    tabelas e exemplos longos), 2 vídeos por capítulo, resumo de 3 a 4 linhas, exercícios
    exatamente 5 e com menos linhas de resposta, glossário só com os termos oficiais;
  - orçamento de páginas: capa 1 + sumário 2 + introdução 2 + capacidades 1 + glossário 3–4 ≈ 10;
    capítulos ≈ 3 páginas cada (2 de teoria/vídeos/resumo + 1 de exercícios) = 30 → **≈ 40**.

## Tecnologias e arquivos previstos

| Arquivo | Ação |
|---|---|
| `assets/gerador-apostilas/gerar_apostila.py` | opção `--edicao <NOME>`: fontes em `CONTEUDO-<NOME>/`, saída `APOSTILA-<MATERIA>-<NOME>.md/.html`, versão de `edicoes_apostila` |
| `assets/gerador-apostilas/conferir_ementa.py` | só se precisar receber o caminho do Markdown da edição (já recebe por parâmetro) |
| `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/materia.json` | campo `edicoes_apostila: {"V2": "2.0"}` (a V1 continua `versao_apostila: "1.0"`) |
| `.../INTRODUCAO-TIC/APOSTILA/CONTEUDO-V2/INTRODUCAO.md` e `CAPITULO-01..10.md` | novos (condensados) |
| `.../INTRODUCAO-TIC/APOSTILA/APOSTILA-INTRODUCAO-TIC-V2.md` | novo (gerado) |
| `.../INTRODUCAO-TIC/APOSTILA/APOSTILA-INTRODUCAO-TIC-V2.html` | novo (gerado) |
| `.../INTRODUCAO-TIC/APOSTILA/STATUS-APOSTILA.md` | quadro da V2 |
| `docs/regras/apostilas.md` + `CLAUDE.md` (versão/histórico) | registrar a regra da edição reduzida |
| `STATUS.md` | Etapa 79 |

## Riscos

| Risco | Plano B |
|---|---|
| A paginação é feita pelo `apostila.js` no navegador: sem abrir a página não dá para contar as páginas exatas | gerar o PDF V2 com o Chromium **sem janela** (exceção da regra, só para gerar o arquivo) e contar as páginas; se o usuário não autorizar, estimar pelo tamanho do texto e ele confere |
| Passar de 40 páginas | cortar mais teoria/exemplos e linhas de resposta, nunca conteúdo oficial nem os 5 exercícios |
| Condensar tirar conteúdo oficial | conferência automática + conferência manual de cada `conteudos_oficiais` por capítulo |

## Passos

| Nº | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Opção `--edicao` no gerador e campo `edicoes_apostila` no `materia.json` | `gerar_apostila.py`, `materia.json` | `python -m py_compile`; gerar a V1 de novo continua igual (mesmo caminho) | ✅ Concluído |
| 2 | `CONTEUDO-V2/INTRODUCAO.md` condensada (mantém as subseções obrigatórias) | `CONTEUDO-V2/INTRODUCAO.md` | gerador aceita o formato | ✅ Concluído |
| 3 | Capítulos 01 a 10 condensados | `CONTEUDO-V2/CAPITULO-NN.md` | gerador sem ⚠️; conteúdos oficiais conferidos à mão | ✅ Concluído |
| 4 | Markdown completo V2 (`--markdown --edicao V2`) + conferência 100% | `APOSTILA-INTRODUCAO-TIC-V2.md` | saída do `--conferir` | ✅ Concluído |
| 5 | HTML V2 (`--edicao V2`), versão 2.0 | `APOSTILA-INTRODUCAO-TIC-V2.html` | gerador sem erro; versão 2.0 na capa | ✅ Concluído |
| 6 | Contar as páginas (PDF headless, se autorizado) e ajustar até ≤ 40 | — | número de páginas do PDF | ✅ Concluído |
| 7 | Registrar regra, `STATUS-APOSTILA.md`, `STATUS.md`; commit | ver tabela | `git diff --cached --name-only` | ✅ Concluído |
| 8 | Aceite do usuário | — | — | 👀 Aguardando validação |

## Resultado final

- V2 gerada: `APOSTILA-INTRODUCAO-TIC-V2.md` e `.html` (versão 2.0), **28 páginas** no PDF
  headless, conferência 100% (277/277), sem vídeos e sem exercícios (mudança de escopo do usuário).
- Gerador: opção `--edicao=V2` (`assets/gerador-apostilas/edicao_apostila.py`) e capítulos só com
  teoria quando a edição tem `sem_videos_e_exercicios`.
- Pedidos juntos (todas as apostilas): rodapé "Página N de T" no PDF e PDF sem a faixa azul da
  esquerda; regras no `CLAUDE.md` global e em `docs/regras/apostilas.md`.
- Passos 1 a 7 ✅; passo 8 (aceite) 👀. O PDF V2 fica fora do Git (`*.pdf` no `.gitignore`).
