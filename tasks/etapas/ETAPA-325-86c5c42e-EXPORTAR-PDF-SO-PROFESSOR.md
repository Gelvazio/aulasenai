## Etapa 325-86c5c42e — Botão "Exportar PDF" só para o professor

**Tarefa:** #198-86c5c42e-b65b-46f0-aade-11f2de5b9145 · **Pedido em:** 2026-10-16 10:55 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "O BOTAO *EXPORTAR PDF*,DEVE APARECER APENAS PARA O PROFESSOR,CRIE A TASK,E NAO ASSUMA"
**Objetivo:** o botão **📥 Exportar PDF** deixa de aparecer para o aluno e fica visível só
para o perfil PROFESSOR.

### Decisões

- 2026-10-16 10:55 — Tarefa criada **sem reserva**, a pedido do usuário ("e não assuma").

### #198.1 — Mostrar o "Exportar PDF" só para o professor

**Próximo passo:** confirmar com o usuário em quais páginas vale (atividades discursivas,
objetivas/práticas, apostilas) e se o "Exportar Meu Gabarito" do aluno (#196) continua; depois
esconder o botão para quem não é professor.

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

### #198.2 — Aceite do usuário

**Próximo passo:** 👀 depois da #198.1, o usuário confere como aluno e como professor.
