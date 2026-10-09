# Lista de presença em um arquivo único (`scripts/LISTAPRESENCA.js`)

**Criado em:** 2026-10-09 17:50 · **Concluído em:** 2026-10-09 18:00 (falta o aceite) · **Tempo decorrido:** ~30 min
**Pedido do usuário:** "leia todas as listas de presença e deixe tudo em apenas 1 arquivo de nome
LISTAPRESENCA.js, e ajuste os html e javascript pra que isso funcione".
**STATUS:** [tasks/STATUS.md](../tasks/STATUS.md), Etapa 126.

## Objetivo

Juntar as 10 listas de presença (`LISTA-PRESENCA*.js`) num só arquivo, `scripts/LISTAPRESENCA.js`,
sem perder nenhum aluno, e fazer todas as páginas e scripts lerem só dele.

## Situação hoje (lida em 2026-10-09)

| Arquivo atual | Formato | Turmas | Observação |
|---|---|---|---|
| `scripts/LISTA-PRESENCA-ADAG-SALETE-TARDE-2026-02.js` | `LISTAS_PRESENCA.push` | 133933 (25) | — |
| `scripts/LISTA-PRESENCA-AUTOMACAO-TAIO-TARDE.js` | `push` | 122552 (19) | igual à lista de Fundamentos de Automação |
| `scripts/LISTA-PRESENCA-CEPLAS-MANHA.js` | `LISTA_PRESENCA =` | QA LBTSN 2026/1 M2 (13) | código da turma = nome |
| `scripts/LISTA-PRESENCA-ITIC-CEPLAS-MANHA.js` | `push` | 135080 (33) | — |
| `scripts/LISTA-PRESENCA-ITIC-CEPLAS-TARDE.js` | `push` | 135081 (35) | — |
| `scripts/LISTA-PRESENCA-PROFESSOR.js` | `push` | 4 professores | vão para a aba "Professores" |
| `scripts/LISTA-PRESENCA-ROBERTO-MACHADO-T5-TARDE.js` | `push` | 124403 (10) | — |
| `scripts/LISTA-PRESENCA-TIIN-RIO-DO-SUL-MANHA.js` | `push` | 124519 (17) | — |
| `MATERIAIS/.../INTRODUCAO-TIC/ATIVIDADES/LISTA-PRESENCA.js` | `LISTA_PRESENCA =` | 135080 (34) + 135081 (34) | **1 aluno está na M1 aqui e na V1 nos `scripts/`** |
| `MATERIAIS/.../FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/LISTA-PRESENCA.js` | `LISTA_PRESENCA =` | 122552 (19) | igual ao de `scripts/` |

Quem lê as listas:

| Leitor | Como lê hoje |
|---|---|
| `scripts/criarUsuariosBancoDados.html` + `assets/js/criar-usuarios-pagina.js` | 8 `<script>` de `scripts/`; descobre os professores pelo "retrato" de `criar-usuarios-antes-professores.js` |
| `relatorioAtividades.html` + `assets/js/relatorio-atividades-dados.js` | 4 `<script>` de `scripts/` |
| `MATERIAIS/.../INTRODUCAO-TIC/LISTA-PRESENCA.html` + `assets/js/lista-presenca.js` | `ATIVIDADES/LISTA-PRESENCA.js` (`window.LISTA_PRESENCA`) |
| `scripts/criar-usuarios-supabase-auth.js` (Node) | um arquivo com `window.LISTA_PRESENCA` |

## Formato novo

```js
window.LISTAS_PRESENCA = [
  { uc: '...', professor: '...', local: '...', cargaHoraria: '...', turmas: [ ... ] },
  { uc: 'Professores', professores: true, turmas: [ ... ] }, // ex-LISTA-PRESENCA-PROFESSOR.js
];
```

- Uma entrada por UC; turma repetida (mesmo código e UC) entra **uma vez**, com os alunos unidos
  pelo e-mail (nenhum aluno se perde; campos iguais nas duas cópias já conferidos).
- `professores: true` substitui o "retrato" do `criar-usuarios-antes-professores.js`.

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Gerar `scripts/LISTAPRESENCA.js` juntando as 10 listas (script temporário fora do projeto) | `scripts/LISTAPRESENCA.js` | `node`: total de alunos por turma = união dos e-mails | ✅ |
| 2 | Página de criar usuários: 1 `<script>` só; professores pela marca `professores: true`; apagar `criar-usuarios-antes-professores.js` | `scripts/criarUsuariosBancoDados.html`, `assets/js/criar-usuarios-pagina.js`, `assets/js/criar-usuarios-antes-professores.js` | `node --check`; leitura | ✅ |
| 3 | Relatório de atividades: 1 `<script>` só; ignora a lista de professores | `relatorioAtividades.html`, `assets/js/relatorio-atividades-dados.js` | `node --check` | ✅ |
| 4 | Página da lista da ITIC: lê `../../../scripts/LISTAPRESENCA.js` e mostra só as turmas da UC (`data-uc` no HTML) | `MATERIAIS/.../INTRODUCAO-TIC/LISTA-PRESENCA.html`, `assets/js/lista-presenca.js` | `node --check`; leitura | ✅ |
| 5 | Script Node: lê `LISTAS_PRESENCA`; opção nova `--turma=<codigo>` para escolher a turma (obrigatória — mais seguro que gravar todas as turmas de uma vez) | `scripts/criar-usuarios-supabase-auth.js` | `node` em simulação (sem `--executar`) | ✅ |
| 6 | `.vercelignore` ganha `LISTAPRESENCA*.js` (o padrão atual `LISTA-PRESENCA*.js` não o cobre) | `.vercelignore` | leitura | ✅ |
| 7 | Tirar os 10 arquivos antigos do projeto (destino: decisão do usuário, abaixo) | 10 arquivos acima | `find` não acha mais `LISTA-PRESENCA*.js` | ✅ |
| 8 | Atualizar regras e docs que citam `ATIVIDADES/LISTA-PRESENCA.js` | `docs/regras/usuarios-turmas-paginas-professor.md`, `docs/regras/assets-e-geradores.md`, `docs/ORIENTACAO_JS_LOGIN.md`, `CLAUDE.md` (versão + histórico) | leitura | ✅ |
| 9 | Commit (com o `LISTAPRESENCA.js`, decisão do usuário) + graphify | — | `git diff --cached --name-only` | ✅ |
| 10 | Aceite do usuário (testar as 3 páginas no navegador) | — | — | ⬜ |

## Decisões pedidas ao usuário

1. **Aluno em turma diferente:** 1 aluno está na M1 (135080) na lista da matéria ITIC e na V1
   (135081) em `scripts/`. Qual vale? (sugestão: a de `scripts/`, usada para criar os usuários)
2. **Arquivos antigos:** mover para uma pasta de backup fora do projeto
   (`C:\fontes\aulasenai-backup\LISTAS-PRESENCA-2026-10-09\`) — sugerido — ou apagar.
3. **Git:** o `LISTAPRESENCA.js` tem nomes, e-mails e senhas iniciais de alunos (menores de
   idade). Sugerido: **não** versionar (e voltar `LISTAPRESENCA.js` ao `.gitignore`).

## Riscos

| Risco | Plano B |
|---|---|
| Perder aluno ao juntar | União pelo e-mail + conferência das contagens antes de tirar os antigos |
| Relatório passa a mostrar mais turmas (Taió, Roberto Machado, TIIN, que não carregava) | Se não quiser, filtrar pela UC |
| Dados pessoais no GitHub | Não versionar o arquivo (decisão 3) |
| Páginas só testáveis no navegador | Usuário testa (regra: nunca abrir navegador) |

## Resultado

- `scripts/LISTAPRESENCA.js`: 7 listas (6 UCs de alunos + professores), 8 turmas, 157 pessoas.
- Correção da análise: os 2 alunos "a mais" da ITIC (1 só na M1 da lista da matéria, 1 só na V1
  de `scripts/`) são **pessoas diferentes**, não um aluno trocado de turma; os dois foram mantidos
  (M1 = 34, V1 = 35), ambos com `naChamada: false`. A decisão 1 deixou de se aplicar.
- Decisões do usuário: 2 = apagar os antigos; 3 = versionar o `LISTAPRESENCA.js` (fora do site).
- 10 arquivos antigos apagados; `assets/js/criar-usuarios-antes-professores.js` removido.
- Script Node: `--turma=CODIGO` obrigatório (testado em simulação e nos erros).
- Pendente: aceite do usuário testando as 3 páginas no navegador.
