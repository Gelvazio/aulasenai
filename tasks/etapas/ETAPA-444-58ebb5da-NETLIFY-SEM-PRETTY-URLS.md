## Etapa 444-58ebb5da — #315: Netlify sem "Pretty URLs" (links das páginas como no Git)

**Tarefa:** #315 · **Pedido em:** 2026-10-20 16:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s33)
**Pedido:** "na aula 6 tem 3 atividades, mas na verdade é apenas 1" (índice de Análise de Dados no
Netlify) → "faça a task pelo repo".
**Objetivo:** o Netlify publicar os links dos HTMLs sem reescrever (sem minúsculas e sem tirar o
`.html`), para a grade de cards ligar cada atividade à aula certa como na Vercel.

### Situação (diagnóstico, 2026-10-20)

- Banco: a aula 06 (`aulas.id` 42) tem só a atividade 32; as atividades 26 (Excel 01/10) e 35
  (Avaliação Objetiva 02) estão com `aula_id` vazio.
- O Netlify (projeto `aulasenai`, deploy do commit `4321944b`) publica o HTML com os links
  reescritos pelo "Pretty URLs": `ATIVIDADES-6-...-50-QUESTOES.html` vira
  `/materiais/.../atividades-6-...-50-questoes`.
- `obterCaminhoHtml` (`assets/js/atividades-crud-modal.js`) só reconhece link que termina em
  `.html`; sem isso a grade (`assets/js/indice-aula-grade-banco.js`) liga os artigos pelo texto e
  não tira as atividades de outra aula (#273) → 3 atividades no card da aula 06. Na Vercel e no
  local o HTML não é reescrito e o card mostra só a 32.

### #315.1 — `netlify.toml` com `pretty_urls = false`

**Próximo passo:** — (concluída em 2026-10-20 16:27; executor-leve, conferida pelo líder s33)

- **Nível:** LEVE — configuração simples sem lógica, 1 arquivo
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** arquivo `netlify.toml` na raiz do repositório desligando o pós-processamento
  "Pretty URLs" do HTML. Nada mais muda (sem comando de build, sem pasta de publicação).
- **Critérios de aceitação:** o arquivo existe, é TOML válido e só tem a configuração do
  `pretty_urls`; depois do push, o deploy do Netlify publica o `index.html` de Atividades com os
  links iguais aos do Git (conferir com `curl`).
- **Entrega:** `44172c28` (`netlify.toml`). · **Verificação:** `tomllib` lê `{build: {processing: {html: {pretty_urls: False}}}}`; depois do push, `curl` no `index.html` de
  Atividades no Netlify: 0 links `/materiais/` reescritos e 14 links terminados em `.html` (ex.:
  `ATIVIDADES-6-...-50-QUESTOES.html`), iguais ao Git. A tela (card da aula 06 com só a ID 32)
  só o navegador confirma.
