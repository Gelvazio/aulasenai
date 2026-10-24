## Etapa 210-101679a7 — Seed da atividade prática da Aula 08 de Fundamentos de UI/UX

**Tarefa:** #210-101679a7 · **Pedido em:** 2026-10-24 · **Criada por:** Claude (local)
**Pedido:** Gerar o arquivo SQL de seed para a atividade prática da Aula 08 de Fundamentos de UI/UX e aplicar no banco.
**Objetivo:** Gerar o SQL de seed usando o gerador de avaliação discursiva, aplicar no banco via RPC, atualizar STATUS_MATERIA.md e commitar.

### Escopo
1. Ler o arquivo `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08-GABARITO.md`
2. Usar o script `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` para gerar o SQL de seed
3. Salvar como `database/2026-10-24-atividade-pratica-aula-08-seed-atividades.sql`
4. Aplique no banco usando o script Node.js que chama a função exec_sql RPC (use a mesma lógica do script anterior)
5. Atualizar o STATUS_MATERIA.md marcando o seed da aula 08 como ✅
6. Commit e push

### Riscos
- Arquivo gabarito pode não existir no caminho especificado
- Script Python pode ter dependências não instaladas
- Script Node.js de aplicação pode não existir ou precisar ser adaptado

### Decisões
- Usar credenciais Supabase fornecidas pelo usuário
- Seguir o mesmo padrão dos seeds anteriores (Aula 07)

### #210.1 — Gerar SQL de seed da Aula 08

**Próximo passo:** Ler o arquivo gabarito da Aula 08 e executar o gerador de avaliação discursiva.

- **Nível:** MEDIO — tarefa de geração e aplicação de seed
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** Gerar o SQL de seed para a atividade prática da Aula 08 de Fundamentos de UI/UX usando o gerador de avaliação discursiva.
- **Critérios de aceitação:** SQL gerado com sucesso e salvo no caminho correto
- **Entrega:** Arquivo `database/2026-10-24-atividade-pratica-aula-08-seed-atividades.sql` · **Verificação:** Conferir se o arquivo foi criado e contém os INSERTs esperados

### #210.2 — Aplicar SQL no banco via RPC

**Próximo passo:** Executar o script Node.js para aplicar o SQL no banco.

- **Nível:** MEDIO — tarefa de aplicação de seed no banco
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** Aplicar o SQL gerado no banco usando a função exec_sql RPC via script Node.js.
- **Critérios de aceitação:** SQL aplicado com sucesso no banco Supabase
- **Entrega:** Banco atualizado com os dados da atividade · **Verificação:** Conferir se os dados foram inseridos no banco

### #210.3 — Atualizar STATUS_MATERIA.md e commitar

**Próximo passo:** Atualizar o STATUS_MATERIA.md marcando o seed da aula 08 como ✅ e fazer commit + push.

- **Nível:** LEVE — tarefa de atualização de arquivo e commit
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** Atualizar o STATUS_MATERIA.md marcando o seed da aula 08 como ✅ e fazer commit + push na main.
- **Critérios de aceitação:** STATUS_MATERIA.md atualizado e commit/push realizado
- **Entrega:** Commit com mensagem descritiva · **Verificação:** Conferir se o commit foi feito e o push enviado
