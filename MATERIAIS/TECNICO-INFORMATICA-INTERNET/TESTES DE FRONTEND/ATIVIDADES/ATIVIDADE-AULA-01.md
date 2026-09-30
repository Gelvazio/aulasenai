# ATIVIDADE AULA 01 — Fundamentos de Testes de Software

**Slides:** `AULAS-CHALKIE-AI/1-Fundamentos-de-Testes-de-Software.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, individual e em grupo  
**Capacidades:** C1, C2, C3 · S1 | **Conhecimentos:** 1.1 · 3 · 4 · 5  
**Entrega da aula:** mapa de conceitos (erro, defeito, falha e tipos de teste) + estratégia de testes

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Aquecimento: "O custo de um clique" | 20 min |
| Prática 1 — Mapa de conceitos | 40 min |
| Prática 2 — Classificação de 10 cenários na pirâmide | 50 min |
| Prática 3 — Pirâmide para duas aplicações | 40 min |
| Missão — Estratégia de testes do Spotify Web | 50 min |
| Debate e fixação final | 40 min |

---

## 1. Aquecimento — O custo de um clique

Em dupla, respondam em 3 linhas cada:
1. Um botão "Finalizar compra" parou de funcionar numa sexta à noite. Quem perde com isso?
2. Pela **Regra de 10 de Myers**, por que corrigir o defeito no requisito custa menos do que em produção?

---

## 2. Prática 1 — Mapa de conceitos

Monte um mapa (papel, Miro ou slide) ligando os termos abaixo, com **um exemplo de interface web** para cada:

| Termo | Pergunta que o mapa deve responder |
|---|---|
| Erro | Que engano humano gerou o problema? |
| Defeito (bug) | Onde ele ficou no código? |
| Falha | O que o usuário vê de errado? |
| Verificação | O produto segue a especificação? |
| Validação | O produto resolve a necessidade do usuário? |
| Caixa preta / caixa branca | O teste enxerga ou não o código? |
| Tipos de teste | Funcionalidade, usabilidade, confiabilidade, desempenho, manutenibilidade |

> ✅ **Verifique:** cada tipo de teste tem um exemplo diferente (ex.: desempenho = tempo de carregamento da vitrine).

---

## 3. Prática 2 — Classificação de cenários

Classifique cada cenário como **Unitário**, **Integração** ou **E2E** e justifique em uma frase.

| # | Cenário | Nível | Justificativa |
|---|---|---|---|
| 1 | Função `calcularDesconto()` para compras acima de R$ 200 | | |
| 2 | Máscara de CPF aplicada durante a digitação | | |
| 3 | Envio de formulário para API simulada | | |
| 4 | Menu lateral renderizado conforme o estado global de login | | |
| 5 | Botão "Entrar" desabilitado enquanto os campos estão vazios | | |
| 6 | Conversão de data ISO para o formato brasileiro | | |
| 7 | Paginação e ordenação refletidas na URL | | |
| 8 | Fluxo completo de recuperação de senha por e-mail | | |
| 9 | Regra de força da senha (fraca, média, forte) | | |
| 10 | Compra completa: vitrine → carrinho → pagamento → confirmação | | |

Depois, marque em cada linha se o teste seria **caixa preta** ou **caixa branca**.

---

## 4. Prática 3 — Pirâmide para duas aplicações

Para cada aplicação, proponha a proporção de testes (unitário / integração / E2E) e explique a escolha:

- **App 1 — Fintech de crédito:** juros, regras fiscais, score, Pix, simulação de empréstimo.
- **App 2 — E-commerce de varejo:** frete, filtros de catálogo, busca, checkout, login social.

> 💡 **Dica:** regras matemáticas pedem base unitária forte; interfaces ricas pedem mais integração.
> ⚠️ **Evite** a pirâmide invertida (cone de sorvete): muitos E2E deixam a suíte lenta e instável.

---

## 5. Missão — Estratégia de testes do Spotify Web

Escreva uma estratégia de 1 página com:
1. **3 testes unitários** (ex.: validar e-mail, calcular duração da playlist).
2. **2 testes de integração** (ex.: busca consultando a API de músicas).
3. **1 jornada E2E** (buscar música → adicionar à playlist → reproduzir).
4. Para cada teste: tipo de teste (4.1 a 4.5) e padrão **AAA** (Arrange, Act, Assert) em uma linha.

---

## 6. Debate e fixação

**Debate (S1):** "Automação substitui o teste manual?" — cada grupo defende um lado por 3 min e registra um argumento do outro grupo que achou válido.

**Fixação:**
1. Qual a principal vantagem dos testes unitários sobre os E2E?
2. O que significa o último "A" do padrão AAA?
3. O que acontece com uma suíte que tem muitos E2E e poucos unitários?

---

## 7. Entrega e avaliação

**Entregar (PDF único):** mapa de conceitos, tabela dos 10 cenários, pirâmides das 2 apps e estratégia do Spotify Web.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Conceitos (C2) | Todos corretos com exemplos web | 1 erro | 2–3 erros | 4+ erros |
| Classificação (C3) | 10/10 justificados | 8–9 | 6–7 | ≤ 5 |
| Estratégia (C1/C3) | Pirâmide coerente e AAA correto | Pequenas lacunas | Incompleta | Ausente |
| Debate (S1) | Registra e acolhe argumento oposto | Participa | Participa pouco | Não participa |

**Próxima aula:** planejamento, verificação × validação e escrita de casos de teste.
