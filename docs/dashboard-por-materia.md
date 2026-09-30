# `dashboard.html` em cada pasta de matéria

- **Criado em:** 2026-09-23 19:38
- **Concluído em:** —
- **Tempo decorrido:** —
- **Status geral:** ⛔ AGUARDANDO ACERTO DE EMENTA (decisão do usuário, 2026-09-23)

## Objetivo

Toda pasta de matéria em `MATERIAIS/<CURSO>/<MATERIA>/` (exceto `MATERIAS-GERAIS/`) deve ter um
`dashboard.html` no modelo de
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/dashboard.html`. Nele, cada card de
aula aponta para a atividade de 50 questões daquela aula
(`ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html`). A aula que ainda não tiver atividade recebe um
arquivo com o nome definitivo e a mensagem **50 QUESTOES PENDENTES,AGUARDANDO GERACAO...**
A regra fica registrada no `CLAUDE.md` da raiz.

## Levantamento (2026-09-23)

| Situação | Matérias |
|---|---|
| Tem `dashboard.html` e as 10 atividades de 50 questões | 1 (ITIC — AOL) |
| Tem ementa com sequência de aulas própria | RIO_DO_SUL_MAIS_TECH (7 matérias, 8 aulas cada), BANCO_DE_DADOS (TII) |
| Tem ementa **genérica** (modelo "Reconhecer conceitos", sem aulas próprias) | ~11 matérias |
| **Sem ementa** | 16 matérias de BACKEND-560-HORAS |
| Curso sem pasta de matéria | Assistente-Processos-Gestao-Suporte-TI, Assistente-Tecnico-TI, INFORMATICA, INTERNET-DAS-COISAS, MECATRONICA, PROGRAMADOR-DE-SISTEMAS, REDES-DE-COMPUTADORES |

Divergências encontradas no modelo:
- os botões "📂 ATIVIDADES" do dashboard de ITIC apontam para os **PDFs dos slides**, e não para as
  atividades de 50 questões;
- o modelo tem `<style>` embutido, o que a regra de `assets/` proíbe.

## Solução proposta

1. **CSS compartilhado:** mover o `<style>` do modelo para `assets/css/dashboard-materia.css`.
2. **Dados por matéria:** cada matéria ganha um `dashboard.json` com título, carga horária,
   capacidades e a lista de aulas (número, título, conteúdo, capacidades). Os dados vêm do
   `EMENTA-CHALKIE-AI.md` da matéria, porque a ementa é a regra oficial.
3. **Gerador genérico:** `assets/gerador-dashboard/gerar_dashboard.py <pasta-da-materia>`:
   - gera o `dashboard.html` (cards de aula com o botão "📝 50 QUESTÕES");
   - cria `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` com a mensagem de pendência quando o
     arquivo não existe. Um arquivo que já existe **nunca é sobrescrito**.
4. **Página de pendência:** HTML mínimo que usa `assets/css/dashboard-materia.css`, com a
   mensagem exata "50 QUESTOES PENDENTES,AGUARDANDO GERACAO...".
5. **Regra no `CLAUDE.md` da raiz:** nova seção "dashboard.html em cada matéria".

## Riscos e dependências

- Sem uma lista de aulas na ementa, não há como saber quantos cards criar (ver a decisão pendente).
- Inventar aulas para ementas genéricas fere a regra "a ementa vence".
- Regenerar o dashboard de ITIC muda os links de PDF para as atividades. Os PDFs continuam
  acessíveis pelo `ATIVIDADES/index.html`.

## Passos

| # | Passo | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Extrair o CSS do modelo | `assets/css/dashboard-materia.css` | nenhum `<style>` no dashboard gerado | ⬜ Pendente |
| 2 | Criar o gerador genérico e o template | `assets/gerador-dashboard/` | leitura do código | ⬜ Pendente |
| 3 | `dashboard.json` de ITIC + regenerar | `ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/` | 10 cards → 10 atividades existentes | ⬜ Pendente |
| 4 | `dashboard.json` das matérias com sequência na ementa | RIO_DO_SUL (7), BANCO_DE_DADOS | cards = aulas da ementa; pendências criadas | ⬜ Pendente |
| 5 | Matérias com ementa genérica ou sem ementa | conforme a decisão do usuário | — | ⬜ Pendente |
| 6 | Registrar a regra | `CLAUDE.md` | seção nova presente | ✅ Concluído |

## Decisões do usuário (2026-09-23)

- Não executar nada agora: primeiro o usuário corrige as ementas.
- A regra foi registrada no `CLAUDE.md` da raiz com STATUS = AGUARDANDO ACERTO DE EMENTA.
- Quando liberada: cada card terá os dois botões, "📝 50 QUESTÕES" e "📕 Slides (PDF)".

## Resultado final

—
