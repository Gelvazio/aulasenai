# Capítulo 13 — Usabilidade: friendly e intuitividade

- **Aula:** 13
- **Capacidade:** C2, S3

## Teoria

### O enigma da porta sem maçaneta

Você já empurrou uma porta que tinha puxador vertical e precisava ser puxada? O formato enviava a
instrução visual errada. Em telas digitais vale o mesmo: quando alguém se perde num aplicativo, a
falha é do design que não comunicou o caminho — nunca de quem usa.

### Usabilidade técnica: a norma ISO 9241-11

A norma internacional **ISO 9241-11** define usabilidade como a capacidade que um sistema oferece
para que usuários específicos alcancem metas com **eficácia, eficiência e satisfação** em um
contexto determinado. Usabilidade não é beleza gráfica: é o sucesso do usuário sem esforço
indevido.

| Pilar | O que mede |
|---|---|
| **Eficácia** | O usuário completa a tarefa inteira, sem bloqueios |
| **Eficiência** | Tempo, cliques e esforço mental mínimos |
| **Satisfação** | Conforto, ausência de ansiedade e vontade de usar de novo |

### Interfaces amigáveis (friendly)

Uma interface amigável acolhe a pessoa: não presume conhecimento técnico, não pune pequenas
distrações e dialoga com calma e clareza — como a hospitalidade que esperamos num ambiente
desconhecido. Três atitudes tornam o sistema hospitaleiro:

1. **Acolhedora** — linguagem simples e visual despoluído que não assusta iniciantes;
2. **Clara** — cada botão e termo revela exatamente o que acontece após o clique;
3. **Paciente** — tolera erros com mensagens construtivas e facilidade de desfazer passos.

### O que significa ser intuitivo

Uma interface é **intuitiva** quando o usuário deduz a ação correta com base no que já aprendeu
no mundo real ou em outros aplicativos. Se você precisa ler um manual de 10 páginas antes de
postar uma foto, o design falhou.

O que torna uma tela óbvia quase à primeira vista são as **convenções e modelos mentais**
consolidados:

- **Carrinho de compras:** onde ficam os itens antes do pagamento;
- **Lupa:** o campo de busca;
- **Lixeira:** apagar ou descartar itens;
- **Casinha (home):** retorno seguro à tela principal quando o usuário se perde.

Quanto mais intuitiva a interface, mais rápida a curva de aprendizado: primeiro contato
(tateando padrões) → compreensão rápida (feedback claro) → domínio total (ações automáticas).

### Visibilidade do status e prevenção de erros

O sistema deve manter o usuário informado sobre o que acontece, com retorno visual rápido. Clicar
em "Enviar" e nada se mover gera a dúvida angustiante "será que clicou?" — e cliques duplos,
compras repetidas. Os três tipos de feedback: **progresso** (spinners, barras), **confirmação**
(caixa verde de sucesso) e **alerta imediato** (queda de conexão, bateria fraca).

Melhor que uma mensagem de erro perfeita é o design que **impede o erro antes de acontecer**:

- **Desabilitar botões:** "Avançar" bloqueado até preencher os campos obrigatórios;
- **Máscaras de digitação:** formatar CPF, telefone e data enquanto o usuário digita;
- **Confirmação de destruição:** perguntar "tem certeza?" antes de excluir dados permanentes.

| ❌ Erro destrutivo | ✅ Erro construtivo |
|---|---|
| "Erro 404: Requisição inválida de dados." — culpa o usuário, usa jargão, não aponta solução | "O e-mail precisa conter um @. Exemplo: nome@email.com" — explica com gentileza e foca o cursor no ponto a corrigir |

### O checklist de usabilidade do consultor

1. **Clareza de botões** — têm cara de botão e texto com verbos de ação? ("Confirmar
   Agendamento" é excelente; "Processar" é ruim — o usuário precisa saber o que acontece ao
   tocar);
2. **Termos simples** — a tela fala a língua do usuário comum, sem jargões? ("Entrar com
   impressão digital", não "Inicializar autenticação biométrica");
3. **Orientações visíveis** — rótulos permanentes acima dos campos (nunca só no placeholder que
   some ao clicar) e regras exibidas antes da digitação ("mínimo 8 dígitos"), não após a falha;
4. **Prevenção** — a tela evita cliques acidentais e perda de dados?

### Estudo de caso: auditoria da tela de agendamento

O serviço de agendamento on-line tem 60% de desistências. Os usuários não sabem se a vaga foi
confirmada ou cancelada; na tela, botões cinzas idênticos "Executar" e "Processar" lado a lado,
sem máscara de data e sem indicação de erro.

**A correção passo a passo:**

1. **Rótulos e máscaras** — nomes fixos acima de cada campo e máscara automática DD/MM/AAAA;
2. **Botão de ação direta** — "Processar" vira o botão destacado "Confirmar Horário";
3. **Tela de sucesso** — comprovante visual imediato com número de protocolo e resumo da data.

**Ordem da auditoria:** identificar queixas e objetivos da jornada → aplicar o checklist em
botões, termos e feedbacks → tabular e priorizar as falhas críticas → redesenhar e testar com
novos usuários.

Usabilidade não é luxo cosmético: é métrica central de qualidade de software — reduz chamados de
suporte, evita erros críticos em hospitais e bancos e garante que qualquer cidadão exerça seus
direitos pela web. A frase "o sistema é bom, o usuário não sabe usar" está errada: falhas de
operação decorrem de ambiguidade, convenções quebradas ou falta de prevenção pelo sistema.

## Resumo

- Usabilidade (ISO 9241-11) = eficácia + eficiência + satisfação num contexto real — não é
  beleza.
- Interface friendly é acolhedora, clara e paciente: linguagem simples, botões que dizem o que
  fazem e tolerância a erros.
- Intuitiva = óbvia quase à primeira vista, apoiada em convenções (carrinho, lupa, lixeira,
  casinha) e modelos mentais já conhecidos.
- O sistema sempre mostra o que está acontecendo (progresso, confirmação, alerta) e previne o
  erro antes da mensagem: botão desabilitado, máscara e confirmação destrutiva.
- Mensagem de erro construtiva diz o que faltou, dá exemplo e aponta onde corrigir — nunca
  código técnico nem culpa.
- O checklist do consultor audita botões, termos, orientações e prevenção; as falhas são tabuladas
  e priorizadas antes do redesenho.

## Glossário

- **Usabilidade:** facilidade com que a pessoa cumpre a tarefa na interface.
- **Intuitividade:** capacidade de operar a tela sem precisar de manual ou instruções.
- **Eficácia:** grau de precisão e sucesso na conclusão completa da tarefa.
- **Eficiência:** menor tempo, cliques e esforço mental para concluir o objetivo.
- **Satisfação:** conforto, confiança e ausência de frustração no uso.
- **Modelo mental:** ideia que a pessoa já traz de como as coisas funcionam.
- **Friendly (amigável):** interface acolhedora, clara e paciente com o usuário.
- **Prevenção de erros:** design que impede a falha antes que ela aconteça.
