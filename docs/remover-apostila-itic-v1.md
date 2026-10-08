# Remover a apostila V1 da ITIC

- **Criado em:** 2026-10-08 09:37 · **Concluído em:** 2026-10-08 09:43 (falta o aceite) · **Tempo decorrido:** cerca de 8 min
- **Pedido do usuário (2026-10-08):** "remova a apostila V1 por completo"
- **Etapa no `STATUS.md`:** 83
- **Situação:** ✅ Executado (aprovado em 2026-10-08 09:37: D1 = V2 vira a principal; D2 = conferir a id 85 com a V2); 👀 aguardando o aceite

## Objetivo

Deixar a Introdução à TIC com **uma só apostila**, a V2 (versão 2.1, 28 páginas, sem vídeos e
exercícios), apagando a V1 (84 páginas) e corrigindo tudo que apontava para ela.

## Escopo

**Entra:**

- Apagar da pasta `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/APOSTILA/`:
  - `APOSTILA-INTRODUCAO-TIC.md` e `APOSTILA-INTRODUCAO-TIC.html` (versionados);
  - `APOSTILA-INTRODUCAO-TIC.pdf` (14 MB, fora do Git — apagado só no disco);
  - `CONTEUDO/INTRODUCAO.md` e `CONTEUDO/CAPITULO-01.md` a `CAPITULO-10.md` (versionados);
  - as pastas vazias `RASCUNHOS/` e `VERSAO-DE-IMPRESSAO/`.
- Corrigir os links e as referências que apontavam para a V1:
  - `ATIVIDADES/MENU-ATIVIDADES.js` (botão "📘 Apostila");
  - `ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/CONTEUDO/ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07-QUESTOES.md`
    (conteúdo-base da objetiva de 100 questões, id 85; arquivo fora do Git);
  - `APOSTILA/STATUS-APOSTILA.md` (a V1 sai; a V2 fica como a apostila da matéria);
  - `materia.json`, se a V2 virar a apostila principal (ver a decisão D1).
- Atualizar as regras que citam a V1 como piloto (`docs/regras/apostilas.md`: "piloto ITIC… 84
  páginas") e a tabela da matéria modelo no `CLAUDE.md` (linha "Apostila"), com nova versão das
  regras e linha no histórico.

**Não entra:**

- Os planos e status antigos (`docs/gerador-apostilas.md`, `docs/apostila-itic-v2-40-paginas.md`,
  `docs/itic-sexta-atividade-unica-100-questoes.md`, `STATUS.md`): são histórico e ficam como estão.
- Banco de dados: nenhuma tabela guarda a apostila.
- O gerador continua aceitando apostila normal e edições; só a ITIC muda.

**Critério de pronto:** nenhum arquivo da V1 na pasta; `git grep` sem link ativo para
`APOSTILA-INTRODUCAO-TIC.md/.html/.pdf` fora do histórico; a V2 gerada de novo com conferência 100%.

## Decisões que o usuário precisa tomar

| # | Decisão | Opções |
|---|---------|--------|
| D1 | Nome da V2 depois da remoção | (a) mantém `-V2` e `CONTEUDO-V2/`; (b) vira a apostila principal: `CONTEUDO-V2/` → `CONTEUDO/`, `APOSTILA-INTRODUCAO-TIC-V2.*` → `APOSTILA-INTRODUCAO-TIC.*`, versão 2.1 em `versao_apostila` e sem `edicoes_apostila` |
| D2 | Objetiva de 100 questões (id 85), feita sobre a V1 | (a) conferir as 100 questões com a V2 e ajustar as que saírem do conteúdo (como foi feito na discursiva id 81); (b) deixar como está |

## Riscos

| Risco | Plano B |
|-------|---------|
| Perder os exercícios e vídeos da V1 (o professor vai fazê-los à parte) | Ficam no histórico do Git (commit anterior à remoção); dá para recuperar com `git show <commit>:<arquivo>` |
| Objetiva id 85 com questões que a V2 não responde | Decisão D2 |
| ITIC é a matéria modelo da apostila completa (com vídeos e exercícios) | As regras passam a citar o histórico do Git ou outra matéria (Reforço de Linguagens) como modelo do formato completo |

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Aprovação do plano e das decisões D1 e D2 | — | Resposta do usuário | ✅ Concluído |
| 2 | Apagar os arquivos da V1 (`git rm` dos versionados; PDF e pastas vazias no disco) | `APOSTILA/` | `git ls-files` e `ls` da pasta | ✅ Concluído |
| 3 | Aplicar a D1 (renomear a V2, se aprovado) e gerar o HTML de novo | `APOSTILA/`, `materia.json` | `--conferir` 100% | ✅ Concluído |
| 4 | Corrigir o menu, a fonte da id 85 e o `STATUS-APOSTILA.md` | ver Escopo | `git grep` sem link ativo; `node --check` no menu | ✅ Concluído |
| 5 | Aplicar a D2 (se aprovado) | fonte da id 85, página e seed | gerador sem erro | ✅ Concluído |
| 6 | Regras (`docs/regras/apostilas.md`, `CLAUDE.md`, histórico, visualizador) | regras | leitura | ✅ Concluído |
| 7 | `STATUS.md`, commit e graphify | — | commit | ✅ Concluído |
| 8 | Aceite do usuário | — | — | 👀 Aguardando validação |

## Resultado

- V1 apagada: 13 arquivos versionados (`git rm`), o PDF de 14 MB e as pastas vazias.
- A antiga V2 passou a ser a apostila única: `APOSTILA/CONTEUDO/` e
  `APOSTILA-INTRODUCAO-TIC.md/.html/.pdf`, versão 2.1, 28 páginas, conferência 277/277 (100%).
- `materia.json`: `versao_apostila` 2.1, `apostila_sem_videos_e_exercicios` e
  `referencias_complementares` no topo (sem `edicoes_apostila`); o gerador lê essas opções sem
  `--edicao`.
- Objetiva id 85: 87 das 100 questões já tinham resposta na apostila; as 13 restantes (12, 14, 26,
  36, 41, 52, 54, 65, 71, 86, 92, 95 e 99) foram reescritas com a mesma letra do gabarito, então o
  banco não precisa mudar. Página gerada de novo.
- O menu da matéria já apontava para `APOSTILA-INTRODUCAO-TIC.html`, que agora é a apostila única.
- **Pendências:** aceite do usuário. As fontes das atividades com gabarito
  (`*-QUESTOES.md`, `*-GABARITO.md`) estão versionadas, contra a regra "O QUE NUNCA É PUBLICADO";
  continuam fora deste commit até o usuário decidir.
