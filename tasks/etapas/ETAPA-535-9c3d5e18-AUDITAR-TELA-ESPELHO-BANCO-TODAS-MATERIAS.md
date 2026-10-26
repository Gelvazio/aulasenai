# ETAPA 535 — Auditar as demais matérias: tela = espelho do banco

- **TASK:** #388 (pedida em 2026-10-26) · **Tarefa grande: aguarda aprovação do plano**
- **Nível:** a classificar pelo Jev

## Pedido

Verificar Fundamentos de UI / UX (feito na #387) e abrir tarefa para ver todas as demais matérias:
as perguntas da tela devem ser espelho das perguntas do banco, e a página deve carregar
dinamicamente do banco ao gerar a primeira vez.

## Itens (plano a detalhar e aprovar)

| Item | Descrição | Status |
|---|---|---|
| 388.1 | Inventário: para cada atividade de cada matéria, comparar `total_itens`/gabarito/tópicos do banco × itens da página HTML; listar divergências | ⬜ |
| 388.2 | Corrigir divergências (ajustar página ou banco, conforme decisão do usuário) | ⬜ |
| 388.3 | Carga dinâmica: o banco hoje guarda só título e letra do gabarito (objetiva); enunciado e alternativas só estão no HTML. Definir schema para guardar tudo no banco e a página montar na hora (alvo da #25) | ⬜ |
| 388.4 | Gerador lê as perguntas do banco na primeira geração da página | ⬜ |
| 388.5 | Documentação e verificação | ⬜ |

**Observação:** 388.3 muda o banco e o gabarito (RLS): aprovação explícita antes de executar.
