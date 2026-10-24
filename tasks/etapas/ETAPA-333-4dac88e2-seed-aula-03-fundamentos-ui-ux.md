## Etapa 333-4dac88e2 — Seed da atividade prática da Aula 03 de Fundamentos de UI/UX

**Tarefa:** #333-4dac88e2 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (local)
**Pedido:** Gere o arquivo SQL de seed para a atividade prática da Aula 03 de Fundamentos de UI/UX e aplique no banco.
**Objetivo:** Gerar o SQL de seed das atividades da Aula 03 de Fundamentos de UI/UX usando o gerador de avaliações discursivas e aplicar no banco de dados.

### Escopo
1. Ler o arquivo `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03-GABARITO.md`
2. Usar o script `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` para gerar o SQL de seed
3. Salvar como `database/2026-10-24-atividade-pratica-aula-03-seed-atividades.sql`
4. Aplicar no banco usando o script Node.js que chama a função exec_sql RPC (mesma lógica do script anterior)
5. Atualizar o STATUS_MATERIA.md marcando o seed da aula 03 como ✅
6. Commit e push

### Riscos
- O arquivo de gabarito pode não existir ou estar em formato diferente
- O script gerador pode falhar se o formato do gabarito não for compatível

### Decisões
- Tarefa pequena (ajuste pontual, ~3 arquivos, sem banco/segurança/RLS, sem estrutura ou gerador novo, sem mudança em massa): executar direto, com registro no quadro e commit

### #333.1 — Gerar e aplicar o seed da Aula 03

**Próximo passo:** Ler o arquivo de gabarito da atividade prática da Aula 03 e usar o gerador para criar o SQL de seed.

- **Nível:** LEVE — tarefa simples de geração e aplicação de seed
- **Modelo:** só Haiku — tarefa leve
- **Descrição:** Gerar o SQL de seed da atividade prática da Aula 03 de Fundamentos de UI/UX usando o gerador de avaliações discursivas, aplicar no banco e atualizar o STATUS_MATERIA.md
- **Critérios de aceitação:**
  - Arquivo SQL gerado em `database/2026-10-24-atividade-pratica-aula-03-seed-atividades.sql`
  - SQL aplicado no banco com sucesso
  - STATUS_MATERIA.md atualizado marcando o seed da aula 03 como ✅
  - Commit e push realizados
- **Entrega:** Commit com o arquivo SQL e STATUS_MATERIA.md atualizado · **Verificação:** Conferir se o seed foi aplicado verificando os registros no banco
