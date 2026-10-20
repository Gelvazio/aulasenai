## Etapa 433-5c7e2a96 — #304: Aviso RESPOSTA CERTA / RESPOSTA ERRADA para o professor ao marcar uma alternativa

**Tarefa:** #304 · **Pedido em:** 2026-10-20 10:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s30)
**Pedido:** "no login do professor, apos marcar 1 alternativa, junto com a msg de resposta gravada no
banco de dados, adicione 1 mensagem *RESPOSTA CERTA* ou *RESPOSTA ERRADA*".
**Objetivo:** quando o professor marca uma alternativa numa atividade objetiva, o aviso "✅ Resposta
gravada: questão N = X" (hoje em `assets/js/respostas-atividade.js`, linha ~330) vem acompanhado de
**RESPOSTA CERTA** ou **RESPOSTA ERRADA**, conforme o gabarito do banco.

### Escopo

- **Entra:** `assets/js/respostas-atividade.js` e `respostas-atividade-banco.js` (compartilhados por
  todas as atividades objetivas): só para o perfil PROFESSOR, depois de gravar a resposta, ler a
  letra certa do item na tabela `gabarito` (o RLS já deixa só o professor ler) e mostrar a mensagem.
- **Não entra:** nada muda para o aluno (ele nunca vê certo/errado nem recebe o gabarito); nenhuma
  tabela, política ou função de banco nova; atividades práticas e discursivas.
- **Pronto quando:** `node --check` dos dois arquivos; leitura mostra que a consulta ao gabarito e a
  mensagem só rodam para o professor; o aluno não ganha nenhuma chamada nova; o professor confere na
  tela (a IA não abre navegador).

### Riscos

| Risco | Plano B |
|---|---|
| Vazar o gabarito para o aluno (regra de `security-banco.md`) | Chamada só com o perfil professor confirmado; sem perfil confirmado, nenhuma consulta; conferir por leitura do código e do RLS |
| Hoje o professor "não assina" a atividade (`MSG_PROFESSOR_NAO_ASSINA`) e pode nem gravar a resposta | Ver como o professor grava a resposta agora (`respostas-atividade.js` ~330) antes de ligar a mensagem; se o professor não grava, parar e perguntar ao usuário |
| Arquivo compartilhado por todas as páginas | Mudança isolada em função nova, sem alterar as existentes |

### Perguntas abertas

- ✅ 1. Aprovação do plano → professor, 2026-10-20 10:50: "EXECUTE A TAREFA 304, MAS ANTES DELEGUE ELA AO SONNET".

### Decisões

- 10:40 — Classificada PESADO pelos sinais (gabarito/segurança e arquivo compartilhado por todas as
  atividades); não é do Sonnet. Claude Code (Sonnet 5.5), sem reserva.
- 2026-10-20 10:50 — #304.1 reclassificada para MEDIO · só Sonnet por ordem explícita do professor
  ("delegue ela ao Sonnet"), contra os sinais (gabarito = PESADO). Decisão do usuário. Executa o
  `executor-medio` (Sonnet); o líder (Opus 5.5) confere a segurança do gabarito antes do commit.

### #304.1 — Mostrar RESPOSTA CERTA / RESPOSTA ERRADA ao professor depois de gravar

**Próximo passo:** executor-medio implementa; líder confere e commita.

- **Nível:** MEDIO — gabarito e segurança em arquivo usado por todas as atividades (reclassificada de PESADO a pedido do professor).
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** ver Escopo.
- **Critérios de aceitação:** ver "Pronto quando".
- **Entrega:** — · **Verificação:** —
