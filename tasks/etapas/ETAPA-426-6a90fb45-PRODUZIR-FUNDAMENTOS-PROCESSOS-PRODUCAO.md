## Etapa 426-6a90fb45 — #297: produzir por completo a matéria Fundamentos dos Processos de Produção

**Tarefa:** #297-6a90fb45-ba93-48a8-b64b-a9595d3e9782 · **Pedido em:** 2026-10-19 14:38 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "CRIE 1 TAREFA PRA FAZER POR COMPLETO A AULA DA PASTA `C:\fontes\aulasenai\MATERIAIS\OPERADOR_PRODUCAO_INDUSTRIAL\Fundamentos-Processos-Producao`, ja aprove, publique no quadro, mas nao pegue"
**Objetivo:** produzir a matéria Fundamentos dos Processos de Produção (80 h = 20 aulas de 4 h) com todas as peças do padrão.

> **Aprovação:** o usuário já aprovou o plano no pedido ("ja aprove"). Esta tarefa é só **publicada**:
> nenhuma subtarefa foi reservada nem executada. Quem pega é uma sessão com o modelo do nível.
> **Leitura do pedido:** "a aula" = a matéria inteira, porque a pasta está vazia e a UC tem 80 h.

### Escopo
- **Entra:** a ementa da matéria (`EMENTA-CHALKIE-AI.md`, copiada de `EMENTA-PRINCIPAL-OPERADOR_PRODUCAO_INDUSTRIAL.md`, seção 10.14); `materia.json`; 20 aulas em `CONTEUDO/`; atividades (objetiva de 50 questões e prática de 10 questões × 3 tópicos por aula) no banco; apostila em Markdown completo e HTML; status da matéria e quadro.
- **Não entra:** slides (regra 11 do `AGENTS.md`); navegador e testes automatizados; PDF da apostila.
- **Critério de pronto:** as peças da matéria ✅ no `STATUS_MATERIA.md` (regerado pelo script), 20 aulas ✅ em `AULAS/STATUS-AULAS.md`, seeds CONCLUÍDO e commit + push na `main`.

### Riscos
- **Pasta vazia:** não há ementa, `materia.json` nem status na pasta. Por isso o #297.1 cria tudo a partir da ementa do curso.
- **Volume:** 20 aulas, 20 objetivas e 20 práticas. Cada aula sai numa subtarefa própria, uma por vez, com validação do usuário antes da próxima.
- **Conteúdo sem revisão de professor:** fica como pendência.

### Decisões
- 2026-10-19 14:38 — Claude Code (Haiku 5.5): tarefa grande, com aprovação do usuário no próprio pedido ("ja aprove"). Publicada no quadro, sem reserva. Nenhuma subtarefa é executada aqui.

### #297.1 — Criar a ementa da matéria e o `materia.json`

**Próximo passo:** copiar a seção 10.14 da ementa do curso para `EMENTA-CHALKIE-AI.md`, ajustar ao padrão de tamanho e montar o `materia.json` (capacidades, conhecimentos e plano das 20 aulas).

- **Nível:** PESADO — mais de 3 arquivos ligados e mudança em massa (20 aulas no plano).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** ementa e `materia.json` seguindo `apostilas.md` e `materias-global.md`.
- **Critérios de aceitação:** ementa no padrão; `materia.json` com 20 aulas, cada uma com tema, domínios, capacidades, indicadores e atividade; leitura do JSON.
- **Entrega:** — · **Verificação:** —

### #297.2 — Gerar as 20 aulas em `CONTEUDO/`, uma por vez

**Próximo passo:** depois do #297.1, gerar a aula 01 em `CONTEUDO/AULA-01-<DESCRICAO>.md`, pedir a validação do usuário e só então seguir para a 02.

- **Nível:** PESADO — mudança em massa (20 arquivos) e validação por aula.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** uma aula por vez, seguindo `materias-global.md` (1 aula = 4 h) e `docs-antes-de-editar.md`.
- **Critérios de aceitação:** 20 arquivos em `CONTEUDO/`; linha ✅ de cada aula em `AULAS/STATUS-AULAS.md`.
- **Entrega:** — · **Verificação:** —

### #297.3 — Atividades no banco: objetiva e prática de cada aula

**Próximo passo:** depois do #297.2, montar as atividades da aula 01 (objetiva 50 questões e prática 10 × 3), aplicar o seed no Supabase, conferir o md5 e registrar em `database/SEEDS-APLICADOS.md`.

- **Nível:** PESADO — banco (seeds, RLS) e gabarito fora do site.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** atividades por aula, com "Você como aluno consultor" (sem empresa fictícia).
- **Critérios de aceitação:** seeds CONCLUÍDO em `SEEDS-APLICADOS.md` para as 20 aulas; gabarito só no banco.
- **Entrega:** — · **Verificação:** —

### #297.4 — Apostila em Markdown completo e HTML

**Próximo passo:** depois dos #297.2 e #297.3, montar a apostila em `APOSTILA/APOSTILA-FUNDAMENTOS-PROCESSOS-PRODUCAO.md` e depois o HTML.

- **Nível:** PESADO — apostila de 20 capítulos, sem atividades nem perguntas (`apostilas.md`).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** Markdown completo primeiro; HTML só no final; identificação com autor e versão.
- **Critérios de aceitação:** `APOSTILA/APOSTILA-*.md` e `.html` presentes; `STATUS-APOSTILA.md` ✅.
- **Entrega:** — · **Verificação:** —

### #297.5 — Fechamento: status, quadro e commit + push

**Próximo passo:** depois dos #297.1 a #297.4, regerar `STATUS_MATERIA.md` pelo script `scripts/status-materias/gerar_status_materia.py`, atualizar `STATUS-EMENTAS.md`, o quadro e o visualizador, e fazer commit + push na `main`.

- **Nível:** LEVE — só `.md` e a saída de script, sem lógica nova.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** fechar a matéria, sem mudar o conteúdo já aprovado.
- **Critérios de aceitação:** `STATUS_MATERIA.md` com as peças ✅; quadro com a mãe ✅ movida para `task_complete.md`; commit + push feitos.
- **Entrega:** — · **Verificação:** —
