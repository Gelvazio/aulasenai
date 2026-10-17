## Etapa 372-8341ceea — Links de slides e PDF só quando o arquivo existir

**Tarefa:** #245-8341ceea-7ca4-4a05-976d-e2c73aabe47d · **Pedido em:** 2026-10-16 22:19 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o)
**Pedido:** "crie 1 tarefa pra fazer isso, ligar os links so qd existir os pdf e slides" (resposta ao
ponto 2 da revisão da ementa de Banco de Dados, #244.3: o `materia.json` aponta os slides para
`AULAS/AULA-NN-SLIDES.pdf`, que não existem)
**Objetivo:** link para slides (PDF/PPTX) e para PDF só aparece quando o arquivo existe de verdade,
para o aluno e o professor não clicarem em link quebrado — a IA não gera slides (regra #244.9).

> 🚫 **Sem slides (2026-10-16, #244.9):** esta tarefa **não gera** slides nem PDF; só liga ou
> desliga os links conforme o arquivo exista.

> ⚠️ **Tarefa grande** (mudança em massa: ~93 `.md` citam `AULA-NN-SLIDES.pdf`, mais
> `materia.json`, páginas e geradores): o plano da #245.1 precisa do **"sim"** do usuário antes da
> #245.2.

### Escopo (a confirmar na #245.1)

**Entra:** todas as matérias de `MATERIAIS/`.
- Já está certo: `assets/gerador-indices/gerar_indices.py` só põe o botão "📕 Slides (PDF)" no card
  se `AULAS/AULA-NN-SLIDES.pdf` existir.
- A conferir: aulas de `CONTEUDO/` ("Recursos" com o link dos slides), fontes das atividades
  (`- **Slides:** ../AULAS/AULA-NN-SLIDES.pdf`, de `scripts/banco-de-dados/montar_questoes.py` e
  `scripts/testes-frontend/montar_questoes.py`), campo `slides` das aulas no `materia.json`,
  páginas de atividade que mostram o link (ex.: Testes de Front-End), apostila e demais geradores.
- Regra: link só quando o arquivo existir; arquivo novo do professor → rodar o gerador de novo
  liga o link.

**Não entra:** gerar slides ou PDF; banco de dados; mudar o conteúdo das aulas além do link.

**Pronto quando:** nenhum link para slide ou PDF inexistente nas páginas e nos `.md` da matéria,
geradores ligando o link só com o arquivo presente, regra registrada e aceite do usuário.

### Riscos

| Risco | Plano B |
|---|---|
| Mudança em massa em `.md` de outras frentes (aulas em geração) | Fazer por matéria livre; deixar recado às frentes donas |
| Páginas HTML editadas à mão perdem a mudança ao regerar | Mudar o gerador primeiro e regerar |
| Slides servidos pelo Storage privado (não pela pasta) | Conferir na #245.1 onde cada matéria guarda os slides |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #245.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** listar todos os lugares que citam slides/PDF de aula (geradores, `.md`,
`materia.json`, páginas), dizer quais arquivos existem, escrever o plano nesta etapa e pedir o "sim".

- **Nível:** MEDIO — leitura de geradores e arquivos, plano em `.md`.

### #245.2 — Geradores ligam o link só se o arquivo existir

**Próximo passo:** esperar a #245.1 aprovada.

- **Nível:** MEDIO — código Python com lógica em 1 a 3 geradores.

### #245.3 — Aplicar nos arquivos já gerados (todas as matérias)

**Próximo passo:** esperar a #245.2.

- **Nível:** PESADO — mudança em massa, mais de 3 arquivos ligados.

### #245.4 — Aceite do usuário

**Próximo passo:** esperar a #245.3.

- **Nível:** LEVE — conferência do usuário.
