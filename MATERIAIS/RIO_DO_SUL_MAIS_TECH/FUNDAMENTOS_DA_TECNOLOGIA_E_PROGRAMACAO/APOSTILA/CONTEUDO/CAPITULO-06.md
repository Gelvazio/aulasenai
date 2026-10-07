# Capítulo 06 — Internet Segura e Pensamento Computacional

- **Aula:** 06
- **Capacidade:** C1, C3, C4, C7

## Teoria

### Dois jeitos de pensar com segurança

Uma senha "123456" cai em segundos; uma festa da turma sem planejamento vira bagunça. Neste
capítulo você aprende a **se proteger na internet** e a **pensar como um programador**: dividir o
problema, achar padrões, focar no essencial e escrever o passo a passo.

> 🎯 **Objetivos do capítulo:** criar senhas fortes, reconhecer vírus e golpes, proteger a
> privacidade, aplicar os quatro pilares do pensamento computacional e identificar entrada,
> processamento e saída de um algoritmo.

### Vírus e malware

**Malware** é todo software malicioso. O **vírus** é um tipo de malware que se espalha de
arquivo em arquivo. Eles chegam por:

- links e anexos de mensagens desconhecidas;
- programas e jogos piratas;
- pen drives de origem desconhecida;
- sites falsos que pedem para "atualizar" algo.

**Proteção:** manter o sistema e os aplicativos **atualizados**, usar **antivírus**, baixar
programas só das lojas e sites oficiais e desconfiar de pressa e de prêmios.

### Golpes (phishing)

**Phishing** é a "pescaria" de dados: mensagens que imitam bancos, lojas, a escola ou um amigo para
roubar senha e dinheiro. Sinais: urgência ("sua conta será bloqueada hoje"), erros de português,
endereço de site estranho (`banco-seguro-premio.xyz`) e pedido de senha ou código por mensagem.

### Senhas fortes

| Senha fraca ❌ | Senha forte ✅ |
|---|---|
| 123456, senha, nome+ano | Longa (12 caracteres ou mais) |
| A mesma em todos os sites | Diferente em cada serviço |
| Data de aniversário | Mistura letras, números e símbolos |
| Anotada no caderno da escola | Guardada num gerenciador de senhas |

💡 **Frase-senha:** `MeuGatoComeu3Pizzas!` é longa, fácil de lembrar e difícil de adivinhar. Ative
também a **verificação em duas etapas**: além da senha, o serviço pede um código no celular.

### Privacidade

- Deixe o perfil das redes sociais **fechado**.
- Não publique endereço, escola, horários e rotina.
- Revise as **permissões** dos aplicativos (câmera, microfone, localização).
- Nunca compartilhe senha, nem com amigos.

### Pensamento computacional

É um jeito de resolver problemas como um computador resolveria, com quatro pilares:

| Pilar | O que é | Exemplo: festa da turma |
|---|---|---|
| **Decomposição** | Dividir um problema grande em partes menores | Convite, comida, música, decoração, limpeza |
| **Reconhecimento de padrões** | Achar o que se repete | Todo convite tem data, hora e local |
| **Abstração** | Ignorar detalhes para focar no essencial | A cor da toalha não importa para o horário |
| **Algoritmo** | Sequência finita de passos para resolver o problema | Passo a passo para enviar os convites |

🔍 **Exemplo:** o suporte da **TecVale** recebe "o computador não liga". Decompõe (energia, cabo,
fonte, tela), percebe um padrão (muitos chamados na segunda-feira = tomadas desligadas no fim de
semana), abstrai (o modelo do computador não importa para esse teste) e cria um algoritmo de
atendimento.

### Entrada → processamento → saída

Todo algoritmo segue esse caminho:

| Parte | Lanche | Média da turma |
|---|---|---|
| **Entrada** | Pão, presunto, queijo | As notas dos alunos |
| **Processamento** | Montar e aquecer | Somar as notas e dividir pela quantidade |
| **Saída** | Lanche pronto | A média |

🔑 **Ponto-chave:** um algoritmo precisa ser **preciso** (sem dúvida em nenhum passo), **ordenado**
e **terminar**.

## Exercícios

### ITEM 1
- **Capacidade:** C7
- **Contexto:** Sua prima usa a senha "julia2010" em todas as redes sociais e no e-mail.
- **Comando:** Explique por que essa senha é fraca, crie um exemplo de senha forte (frase-senha) e diga o que é a verificação em duas etapas.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C7
- **Contexto:** Você recebeu a mensagem "Seu acesso à conta da escola será bloqueado hoje. Clique em escola-acesso-rapido.xyz e digite sua senha".
- **Comando:** Aponte três sinais de que é um golpe (phishing) e o que você deve fazer.
- **Linhas:** 4

### ITEM 3
- **Capacidade:** C7
- **Contexto:** Debate da turma: "Postar fotos do uniforme da escola e da rua de casa é perigoso?".
- **Comando:** Escreva sua opinião com dois argumentos sobre privacidade e uma regra que a turma poderia adotar.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C3
- **Contexto:** A turma vai organizar uma feira de tecnologia na escola.
- **Comando:** Decomponha o problema em pelo menos cinco partes e aponte um padrão que se repete entre elas.
- **Linhas:** 5

### ITEM 5
- **Capacidade:** C3
- **Contexto:** Para ensinar alguém a ir de ônibus até o SENAI, você vai desenhar um mapa simples.
- **Comando:** Explique o que é abstração usando esse mapa: o que deve aparecer e o que pode ser ignorado.
- **Linhas:** 4

### ITEM 6
- **Capacidade:** C4
- **Contexto:** Você quer um algoritmo que calcule quanto cada amigo paga numa pizza dividida igualmente.
- **Comando:** Identifique a entrada, o processamento e a saída e escreva o algoritmo em passos numerados.
- **Linhas:** 5

## Resumo

- **Malware** e **vírus** chegam por links, anexos, programas piratas e pen drives; atualize o sistema e use antivírus.
- **Phishing** imita empresas e amigos para roubar dados: desconfie de urgência e pedidos de senha.
- **Senha forte** é longa, única e misturada; ative a **verificação em duas etapas**.
- Os quatro pilares do **pensamento computacional**: decomposição, reconhecimento de padrões, abstração e algoritmo.
- Todo algoritmo tem **entrada → processamento → saída** e precisa ser preciso, ordenado e terminar.

## Glossário

- **Decomposição:** dividir um problema grande em partes menores
- **Abstração:** ignorar detalhes para focar no essencial
- **Algoritmo:** sequência finita de passos para resolver um problema
- **Malware:** qualquer software criado para causar dano ou roubar dados.
- **Vírus:** malware que se espalha copiando-se para outros arquivos.
- **Phishing:** golpe que imita empresas ou pessoas para roubar senhas e dados.
- **Senha forte:** senha longa, única e com letras, números e símbolos.
- **Verificação em duas etapas:** proteção que pede, além da senha, um código enviado ao celular.
- **Reconhecimento de padrões:** perceber o que se repete em problemas parecidos.
- **Pensamento computacional:** forma de resolver problemas usando decomposição, padrões, abstração e algoritmos.
