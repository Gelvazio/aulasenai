# Capítulo 15 — Coleta de feedbacks e resolução de conflitos

- **Aula:** 15
- **Capacidade:** C2, S3

## Teoria

### O cenário dos pedidos opostos

Imagine que você concluiu a coleta de dados de um aplicativo escolar: os estudantes exigem modo
escuro e animações interativas; a coordenação quer textos maiores e bloqueio de distrações. Como
decidir o que construir primeiro sem desrespeitar nenhum dos lados?

### A natureza do feedback

O feedback é o retorno do usuário sobre o uso, a percepção ou a dificuldade no produto — mas nem
todo feedback tem o mesmo peso. O consultor separa três naturezas:

| Tipo | O que é | Exemplo |
|---|---|---|
| **Opinião superficial** | Gosto pessoal ou impressão estética individual | "Achei essa cor de fundo sem graça." |
| **Desejo** | Recurso extra agradável, que não impede a tarefa central | "Podia ter animação ao salvar." |
| **Necessidade estrutural** | Condição essencial para concluir a jornada com eficácia | "Não encontro onde confirmo o agendamento." |

🔑 **Regra de ouro:** usuários pedem soluções prontas em vez de relatar a dor verdadeira. Quem diz
"coloquem uma fonte vermelha gigante aqui" pode estar sentindo falta de contraste ou de aviso
claro — descubra o problema subjacente antes de aceitar a sugestão literal.

### Mapeamento de demandas conflitantes

Cada grupo envolvido no produto puxa para um lado:

| Grupo | O que prioriza |
|---|---|
| Estudantes | Agilidade no celular, atalhos, pouco texto |
| Professores | Campos completos, histórico detalhado, relatórios |
| Coordenação | Prazos institucionais, segurança de acesso, controle |
| Equipe técnica (TI) | Baixo consumo de dados, estabilidade, manutenção simples |

A **triagem de feedback** segue a ordem: agrupar respostas em categorias temáticas e identificar
padrões → diferenciar opiniões de necessidades funcionais → mapear quais pedidos entram em
conflito direto → aplicar a matriz de priorização.

### A matriz de decisão: impacto × esforço

Todo pedido é avaliado por dois critérios: quanto ele melhora a vida do usuário (**impacto**) e
quanto custa em técnica e tempo (**esforço**).

| Quadrante | Decisão |
|---|---|
| Alto impacto + baixo esforço | Fazer primeiro — vitória rápida |
| Alto impacto + alto esforço | Planejar — entra no cronograma |
| Baixo impacto + baixo esforço | Se sobrar tempo |
| Baixo impacto + alto esforço | Descartar ou adiar |

Na prática: quando 100 formulários tabulados mostram que mais da metade pede clareza de avisos,
esse tema vai para o topo — e recursos estéticos com adesão mínima vão para o fim da fila.

### Mediação técnica de conflitos

Resolver pedidos opostos é um processo neutro em quatro passos:

1. **Identificar** onde os pedidos se chocam na mesma tela;
2. **Compreender** a rotina e as limitações de cada grupo;
3. **Propor** a solução que atende ao núcleo compartilhado;
4. **Confirmar** a eficácia em teste rápido com os envolvidos.

### O valor da amabilidade profissional (S4)

Trabalhar em equipe exige maturidade: mediar conflitos sem viés, ouvir cada parte com respeito e
justificar a decisão com critérios técnicos documentados — nunca com "porque eu mandei". A
amabilidade nas relações profissionais mantém a cooperação mesmo quando um pedido fica de fora.

**Relatório de feedbacks (SA 2):** cada decisão registra a queixa original, a classificação
(opinião, desejo ou necessidade), a posição na matriz impacto × esforço e a justificativa técnica
— documento que protege o projeto de repescagens de gosto pessoal.

## Resumo

- Feedback é o retorno do usuário; o consultor separa opinião superficial, desejo e necessidade
  estrutural.
- Pedidos prontos escondem dores reais: investigue o problema subjacente antes de implementar a
  sugestão literal.
- Estudantes, professores, coordenação e TI puxam para lados diferentes — a triagem agrupa,
  classifica e mapeia conflitos.
- A matriz impacto × esforço decide a fila: alto impacto e baixo esforço primeiro.
- A mediação de conflitos é neutra: identificar choque, compreender rotinas, propor o núcleo
  comum e confirmar em teste.
- Toda decisão vai para o relatório com justificativa técnica — e a mediação se faz com
  amabilidade (S4).

## Glossário

- **Feedback:** retorno do usuário sobre a solução.
- **Resolução de conflitos:** processo neutro para decidir entre pedidos opostos de grupos.
- **Critério:** referência objetiva adotada para julgar e decidir sem viés.
- **Triagem:** classificação inicial dos feedbacks em categorias antes da priorização.
- **Necessidade estrutural:** condição sem a qual a tarefa central não se conclui.
- **Matriz de priorização:** quadro que cruza impacto no usuário com esforço técnico.
