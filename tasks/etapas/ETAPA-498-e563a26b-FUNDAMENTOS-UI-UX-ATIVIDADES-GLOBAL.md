## Etapa 498-e563a26b — FUNDAMENTOS-UI-UX-ATIVIDADES-GLOBAL: atividades objetivas e discursivas das aulas 01 a 20

**Tarefa:** FUNDAMENTOS-UI-UX-ATIVIDADES-GLOBAL · **Pedido em:** 2026-10-24 14:10 · **Criada por:** Claude Code (Haiku 5.5) (local · main · s498)
**Pedido:** "CRIE 1 TAREFA DE FORMA GLOBAL NESTE PROJETO E JA EXECUTE ELA AQUI, SEMPRE QUE TIVER DUVIDAS, ME PERGUNTE DE FORMA OBJETIVA" (usuário, no chat, 2026-10-24 14:10); antes, "FACA A AULA 20 TB AGORA" e "CONTEUDO DAS AULAS OK, MARQUE ISSO E PROSSIGA COM A GERACAO DAS ATIVIDADES OBJETIVAS, PRATICAS, ETC".
**Objetivo:** reunir numa única tarefa a conferência e a entrega das atividades de FUNDAMENTOS-DE-UI-UX (objetiva de 50 e discursiva de 20 × 3 de cada uma das 20 aulas), gerada pelos agentes em `ATIVIDADES/CONTEUDO/`, e fechar o que a geração deixou pendente.

### Escopo

**Entra:**
- Conferir os 40 arquivos (objetiva e discursiva das aulas 01 a 20): contagem de itens (50 e 20), gabaritos 13/13/12/12 (só objetiva), pesos dos tópicos (0,2 + 0,4 + 0,4), ausência de empresa fictícia, caminho do "Conteúdo-base" e do "Slides".
- Corrigir falhas de formato e de gabarito nos arquivos gerados; registrar cada correção aqui.
- Registrar no quadro as subtarefas de atividade que a geração concluiu.

**Não entra:**
- Gabaritos e respostas prováveis das discursivas (subtarefas #276.4, #276.5 e equivalentes): ficam em #276, para outro modelo.
- Páginas HTML, seeds no banco, conferências de aula (#276.6 em diante): PESADO/MEDIO, ficam em #276.
- Mudar `materia.json` (caminho dos slides): decisão do usuário.

### Premissas
- Aula 20 não está em `materia.json`: a capacidade escolhida foi C2 (objetiva e discursiva), registrada no cabeçalho.
- O cabeçalho cita o slide pelo nome do PDF em `CONTEUDO/`, porque o caminho `AULAS/AULA-NN-SLIDES.pdf` do `materia.json` não existe.

### Riscos
| Risco | Plano B |
|---|---|
| Gabarito de objetiva desbalanceado (ex.: aula 14 saiu A10 B18 C13 D9 numa leitura intermediária) | Contar de novo ao fim da geração; corrigir a letra do item, nunca a contagem |
| Arquivo ainda sendo escrito pelo agente na hora da conferência | Conferir só depois do aviso de conclusão do agente |

### Decisões
- **D1 — 2026-10-24 14:10 (pedido do usuário):** uma única tarefa global para as atividades, executada nesta sessão.
- **D2 — 2026-10-24 14:10:** o Jev não tem script neste projeto (`scripts/jev.mjs` ausente). A classificação de nível usa a sugestão do hook do Jev neste pedido (LEVE, confiança 0,37, valendo a matriz).

---
### 2026-10-24-global.1 — Conferir e entregar as atividades das aulas 01 a 20

**Próximo passo:** esperar os últimos agentes (objetiva 19, discursiva 18 e 19, objetiva e discursiva 20 — ver o último estado no quadro), conferir os 40 arquivos com a contagem do quadro e corrigir o que falhar.

- **Nível:** LEVE — sugestão do Jev pelo hook neste pedido (confiança 0,37; valendo a matriz)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **Descrição:** conferir e corrigir as 40 atividades de `ATIVIDADES/CONTEUDO/` (objetiva `ATIVIDADES-AULA-NN-50-QUESTOES.md` e discursiva `ATIVIDADE-PRATICA-AULA-NN.md`), registrar no quadro as que estiverem certas e as pendências de cada uma.
- **Critérios de aceitação:** 50 itens e gabarito 13/13/12/12 em cada objetiva; 20 itens com 3 tópicos (0,2 + 0,4 + 0,4) em cada discursiva; nenhuma empresa fictícia; nenhum arquivo fora de `ATIVIDADES/CONTEUDO/` alterado.
- **Entrega:** commit único com as correções e o quadro · **Verificação:** contagens com grep e contagem de gabaritos por `uniq` (ver a saída no relatório da entrega).
