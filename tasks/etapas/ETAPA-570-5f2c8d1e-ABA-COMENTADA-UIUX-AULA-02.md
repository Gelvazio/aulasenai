## Etapa 570-5f2c8d1e — #423: Aba comentada (só professor) na Atividade Dinâmica da aula 02 de UI/UX

**Tarefa:** #423-5f2c8d1e · **Pedido em:** 2026-10-27 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "leia a atividade ATIVIDADE-DINAMICA-AULA-02.html, e crie mas 1 aba comentada com a resposta como na imagem, que só aparece para o professor, deve comentar o melhor layout possível, apontando como foi feito e por que em forma de balão e flecha apontando"
**Objetivo:** acrescentar a 4ª aba "4. Resposta comentada" à Atividade Dinâmica da aula 02 de Fundamentos de UI/UX, visível só para o professor, com o redesenho da tela de agendamento e balões com setas explicando cada escolha de layout.

### Escopo
- **Entra:** a aba "4. Resposta comentada" (botão ao lado de "3. Ficha e entrega"), o conteúdo da resposta com balões e setas, o controle de visibilidade só para o professor e a ligação no gerador/página da aula 02.
- **Não entra:** mudar as abas 1 a 3, o enunciado, os critérios, a nota, o banco e a lógica de entrega dos alunos.

### Dados da atividade (lidos do HTML, por leitura, sem navegador)
- Página: `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADE-DINAMICA-AULA-02.html`.
- Cena: `#dinamica-3d` é montada por `assets/js/dinamica-3d-aula-02.js` e `dinamica-3d-pagina.js`.
- Rótulos das abas: `assets/js/dinamica-3d-controle.js` (linha 8: `raiox`, `redesenho`, `ficha`); o PDF usa o mesmo rótulo em `assets/js/dinamica-3d-pdf-enunciado.js` (linha 18).
- Tela do enunciado: agendamento de um serviço online em que o usuário não encontra o botão principal (aluno consultor; sem empresa fictícia).

### Riscos
- Mostrar a aba ao aluno: o conteúdo é a resposta certa. Precisa estar escondido por papel (professor), no servidor/RLS quando houver dado e no front. **Gabarito nunca vai ao aluno** (`security-banco.md`).
- A página pode ser gerada: se o HTML vier de gerador (`gerar_atividade_dinamica.py`, comentário da linha 28), a mudança vai na fonte/gerador, não à mão no HTML.
- Plano B: se o papel não puder ser lido no front com segurança, a aba fica fora do HTML e só o professor vê via a seção `#dinamica-roteiro` já oculta; registrar em Decisões antes de seguir.

### Decisões
- 2026-10-27: nível não classificado pela IA. Pelo gancho de mensagem (Jev, 0,72), a sugestão foi `MEDIO`; a gravação final é do Jev da subtarefa (C52). **Haiku não executa MEDIO**: quem pegar é o Sonnet.

---

### #423.1 — Criar a aba "4. Resposta comentada" com redesenho e balões

**Próximo passo:** com Sonnet, ler `docs/ORIENTACAO_*` das áreas tocadas (ver `.claude/rules/docs-antes-de-editar.md`), depois as ferramentas de `dinamica-3d-controle.js` e `dinamica-3d-pagina.js` e acrescentar a aba.

- **Nível:** a classificar pelo Jev (sugestão do gancho: MEDIO, confiança 0,72)
- **Modelo:** a definir pelo Jev — provável `só Sonnet` (Haiku não pega MEDIO)
- **Descrição:**
  - Acrescentar a aba `4. Resposta comentada` ao lado de `3. Ficha e entrega` (rótulo no `dinamica-3d-controle.js` e no `dinamica-3d-pdf-enunciado.js`, se o PDF listar as abas).
  - A aba mostra **uma** resposta: o redesenho da tela de agendamento em SVG inline, com o botão de ação em destaque e blocos alinhados, mais **balões com setas** que apontam cada escolha e explicam o porquê (hierarquia, contraste, proporção, alinhamento, espaço em branco, ordem de leitura em F/Z).
  - Visível **só para o professor** (mesmo padrão dos blocos `dinamica__professor`); o aluno não recebe a aba nem o conteúdo no HTML que ele baixa.
  - Estilo em classes CSS próprias (sem `style=""`), tokens em `:root`, nomes em português (`abaRespostaComentada`, `.resposta-comentada__balao`).
- **Critérios de Aceitação:**
  - A aba aparece ao professor como 4ª aba e não aparece ao aluno.
  - Há no mínimo 4 balões, cada um com seta apontando o elemento e um texto curto de "como" e "por quê".
  - As abas 1 a 3 continuam iguais; o PDF não quebra.
  - Página funciona em celular (sem rolagem horizontal da página).
- **Entrega:** commit único com os arquivos da tarefa, depois `git push` na `main`.
- **Verificação:** leitura do código; `node --check` nos `.js` tocados; conferir que o rótulo aparece nos dois arquivos. Sem navegador: o professor confere na tela.
