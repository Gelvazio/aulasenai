## Etapa 325-86c5c42e — Botão "Exportar PDF" só para o professor

**Tarefa:** #198-86c5c42e-b65b-46f0-aade-11f2de5b9145 · **Pedido em:** 2026-10-16 10:55 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "O BOTAO *EXPORTAR PDF*,DEVE APARECER APENAS PARA O PROFESSOR,CRIE A TASK,E NAO ASSUMA"
**Objetivo:** o botão **📥 Exportar PDF** deixa de aparecer para o aluno e fica visível só
para o perfil PROFESSOR.

### Decisões

- 2026-10-16 10:55 — Tarefa criada **sem reserva**, a pedido do usuário ("e não assuma").
- 2026-10-16 14:46 — Usuário escolheu: vale para **todas as atividades** (objetivas/geradas e
  práticas/discursivas; apostilas não mudam) e o visitante sem login **também não vê** — só o
  PROFESSOR logado. O "Exportar Meu Gabarito" do aluno continua (#196.4).

### #198.1 — Mostrar o "Exportar PDF" só para o professor

**Próximo passo:** — (entregue; o usuário confere no aceite #198.2).

- **Nível:** PESADO — mexe em papéis/permissões (quem vê o quê) e em várias páginas.
- **Onde o botão nasce (levantamento de 2026-10-16 10:55):**
  `assets/js/exportar-pdf-discursiva.js` (discursivas, chamado por
  `assets/js/avaliacao-discursiva.js`), `assets/gerador-atividades/template_atividade.html`
  (`btnExportarPDF` das atividades geradas, com `assets/js/questoes-ate-minimo.js`) e
  `assets/gerador-apostilas/template_apostila.html` (apostilas). Páginas já geradas em
  `MATERIAIS/` também têm o botão.
- **Descrição:** ver o perfil do usuário logado (JWT/sessão, como as outras partes de professor
  fazem) e só criar/mostrar o botão quando for PROFESSOR.
- **Critérios de aceitação:** aluno não vê o botão "Exportar PDF"; professor vê e exporta como
  antes; o "Exportar Meu Gabarito" do aluno não muda (salvo decisão do usuário).
- **Executor:** Claude Code (Opus 5.5) (local · main · s9) desde 2026-10-16 14:44.
- **Entrega:** `assets/js/atividade.js` (`reservarExportarPdfAoProfessor`: botão
  `btnExportarPDF` e a dica nascem escondidos com `data-somente-perfil="PROFESSOR"`, mostrados
  pelo `js/header-usuario.js`); `assets/js/exportar-pdf-discursiva.js`
  (`mostrarBotaoPdfSeProfessorDiscursiva`: botão escondido, aparece com o perfil PROFESSOR da
  sessão); `assets/css/atividade.css` (barra sem item visível some). Sem regenerar páginas
  (as 90 atividades com o botão já carregam `atividade.js` ou `avaliacao-discursiva.js` e o
  header). Regra em `docs/regras/atividades.md` e linha em `docs/HISTORICO-REGRAS.md`.
- **Verificação:** `node --check` nos 2 JS; todas as páginas com `id="btnExportarPDF"` carregam o
  `js/header-usuario.js` (grep); o `atividade.js` roda no fim do `<body>`, antes do
  `DOMContentLoaded` em que o header aplica os perfis. Sem navegador: o usuário confere no
  aceite #198.2.

### #198.2 — Aceite do usuário

**Próximo passo:** — (aceite do usuário em 2026-10-16 21:08: "Aceito tudo").
