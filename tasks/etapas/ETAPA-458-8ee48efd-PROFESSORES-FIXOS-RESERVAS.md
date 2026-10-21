## Etapa 458-8ee48efd — Lista de professores fixos (reservas SENAI)

**Tarefa:** #329-8ee48efd-79d7-480a-95c3-036a13459f8f · **Pedido em:** 2026-10-21 14:05 · **Criada por:** Claude Code (Opus 5.5) (nuvem · fervent-newton-aqfqsr)
**Pedido:** "CRIE 1 TAREFA PRA ADICIONAR 1 LISTA DE PROFESSORES FIXOS ALEM DOS QUE JA TEM LA NOS
FAVORITOS, E COLOQUE ESSA PROFESSORA:Graziela Marconcini Semann Ferreira,
SITE:https://gelvazio.github.io/reservas-senai/" · "SO CRIE ELA AGORA E DEIXE NUMA LISTA DE TAREFAS"
**Objetivo:** no site https://gelvazio.github.io/reservas-senai/ (repositório
`Gelvazio/reservas-senai`), ter uma lista de **professores fixos**, além dos que já estão nos
favoritos, começando com a professora **Graziela Marconcini Semann Ferreira**.

### #329.1 — Lista de professores fixos com Graziela Marconcini Semann Ferreira

**Próximo passo:** no `Gelvazio/reservas-senai`, criar em `index.html` (e no `reservas.html`, que
é cópia idêntica) uma constante com a lista de professores fixos (começando por "Graziela
Marconcini Semann Ferreira") e somá-la aos nomes do combo `#fav` em `setData`, sem repetir nome;
subir a versão do cache no `sw.js`.

- **Levantamento (2026-10-21, Claude Code Opus 5.5, nuvem · fervent-newton-aqfqsr):** o repositório
  existe e é público (`index.html`, `reservas.html` igual ao `index.html`, `sw.js`,
  `manifest.json`; último commit `6b2ca88`). O combo "⭐ Professor favorito" (`#fav`) é montado
  em `setData` só com os nomes que aparecem nas planilhas de carros e salas (`names`); o favorito
  escolhido fica no `localStorage` (`reservas_fav`). A Graziela aparece nas planilhas só como
  "GRAZIELA" (em observações de carona), sem o nome completo. Para enviar mudanças, a sessão
  precisa do repositório anexado com permissão de push.

- **Nível:** MEDIO — código de tela (JS/HTML) em outro repositório, até 3 arquivos (reclassificar se tiver banco/login)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** a lista de professores fixos aparece além dos favoritos, já com
  Graziela Marconcini Semann Ferreira; os favoritos continuam como estão; `node --check` ok;
  conferir na tela (usuário).
- **Entrega:** — · **Verificação:** —
