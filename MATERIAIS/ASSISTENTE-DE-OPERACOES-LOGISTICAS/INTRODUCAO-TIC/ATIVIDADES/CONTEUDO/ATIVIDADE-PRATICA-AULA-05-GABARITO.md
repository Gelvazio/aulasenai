# Padrão de Resposta — Atividade Prática da Aula 05 (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo fora do Git (`*gabarito*`). Não publicar. O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado.

**Regra geral de correção de cada tópico:** nota cheia = atende a todos os critérios com as
palavras do aluno; metade = atende parcialmente (conceito certo, mas incompleto ou sem aplicar ao
caso); zero = em branco, errado, fora do tema ou copiado. Erros de português não tiram nota, desde
que a ideia esteja clara.

---

### ITEM 01-a
**Resposta esperada:** Confidencialidade: só pessoas autorizadas acessam os dados (credenciais, criptografia). Integridade: os dados não são alterados indevidamente e continuam corretos (assinaturas, auditoria). Disponibilidade: os dados e sistemas estão acessíveis quando necessário (servidores redundantes, plano de recuperação).
**Critérios:** Nota cheia: os três pilares corretos. Metade: dois. Zero: um ou nenhum.

### ITEM 01-b
**Resposta esperada:** Vazamento da lista de clientes: confidencialidade (dados vistos por quem não devia). Vírus alterando notas fiscais: integridade (dados modificados). Portal fora do ar por sobrecarga (DDoS): disponibilidade (sistema inacessível).
**Critérios:** Nota cheia: os três incidentes certos com justificativa. Metade: dois certos. Zero: um ou nenhum.

### ITEM 02-a
**Resposta esperada:** Comuns: nome completo, CPF, telefone, endereço. Sensíveis: religião (convicção religiosa), tipo sanguíneo (dado de saúde), digital biométrica (dado biométrico).
**Critérios:** Nota cheia: os sete dados classificados corretamente. Metade: cinco ou seis. Zero: quatro ou menos.

### ITEM 02-b
**Resposta esperada:** A LGPD (Lei 13.709/2018) exige finalidade legítima e explícita para cada dado, coletar só o necessário (religião e tipo sanguíneo provavelmente não têm finalidade aqui), guardar só pelo tempo necessário e proteger os dados. A fiscalização é da ANPD, com multas de até 2% do faturamento (limite de R$ 50 milhões por infração). Guardar para sempre e espalhar no grupo de mensagens viola a finalidade, a segurança e expõe dados sensíveis.
**Critérios:** Nota cheia: finalidade + tempo de guarda/segurança + ANPD + crítica à sugestão. Metade: dois ou três desses pontos. Zero: um ou nenhum.

### ITEM 03-a
**Resposta esperada:** Lei Carolina Dieckmann (Lei 12.737/2012), que incluiu no Código Penal (art. 154-A) o crime de invasão de dispositivo informático. O conferente usou credenciais de outra pessoa, sem autorização, para acessar uma pasta restrita: violou mecanismo de segurança e acessou dados indevidamente.
**Critérios:** Nota cheia: lei + crime + aplicação ao caso. Metade: lei e crime sem aplicar, ou aplicação sem a lei. Zero: lei errada.

### ITEM 03-b
**Resposta esperada:** No trabalho: demissão por justa causa e perda da confiança. Na justiça: processo criminal com pena (reclusão/detenção e multa) e possível responsabilização civil pelos danos.
**Critérios:** Nota cheia: consequências no trabalho e na justiça. Metade: só uma delas. Zero: diz que não há consequência.

### ITEM 04-a
**Resposta esperada:** Sinais: remetente falso/parecido ("va1esul" com número 1 no lugar do l); link para domínio diferente do oficial ("valesul-login-seguro.com"); urgência e ameaça ("bloqueada em 2 horas"); pedido de usuário e senha por e-mail. Técnica: engenharia social, explorando medo e urgência para induzir o clique.
**Critérios:** Nota cheia: três sinais + engenharia social (medo/urgência). Metade: dois sinais ou três sinais sem a técnica. Zero: um ou nenhum.

### ITEM 04-b
**Resposta esperada:** Não clicar no link, não responder, não abrir anexos nem digitar a senha. Reportar ao suporte de TI (encaminhar como suspeito/phishing) e apagar. Se já clicou ou digitou a senha, trocar a senha imediatamente e avisar a TI.
**Critérios:** Nota cheia: o que não fazer + reportar à TI. Metade: só um dos dois. Zero: sugere clicar para conferir.

### ITEM 05-a
**Resposta esperada:** Espalhou-se sozinho pela rede: worm. "Gerador de etiquetas grátis" que abriu acesso remoto: trojan (cavalo de Troia, backdoor). Gravava o que era digitado: spyware/keylogger. "romaneio.pdf.exe" aberto pelo usuário: vírus (precisa de arquivo hospedeiro e da ação do usuário; extensão dupla).
**Critérios:** Nota cheia: os quatro certos com justificativa. Metade: dois ou três certos. Zero: um ou nenhum.

### ITEM 05-b
**Resposta esperada:** O vírus precisa de um arquivo hospedeiro e de uma ação do usuário (abrir o executável) para se espalhar. O worm é autônomo: espalha-se sozinho pela rede, explorando vulnerabilidades, sem interação humana.
**Critérios:** Nota cheia: diferença correta dos dois. Metade: só um descrito corretamente. Zero: trocados.

### ITEM 06-a
**Resposta esperada:** Ransomware é o malware que criptografa (sequestra) os arquivos e exige resgate para liberar, paralisando a operação. Pagar não garante a devolução dos dados, financia o crime e pode tornar a empresa alvo de novos ataques.
**Critérios:** Nota cheia: definição + por que não pagar. Metade: só um dos dois. Zero: recomenda pagar.

### ITEM 06-b
**Resposta esperada:** 3 cópias (o original e mais duas), em 2 mídias diferentes, com 1 cópia fora do local (outro prédio ou nuvem). No caso, o único backup estava ligado ao servidor e foi criptografado junto; com uma cópia desconectada ou na nuvem, seria possível restaurar os arquivos sem pagar.
**Critérios:** Nota cheia: explica 3-2-1 + aplica ao caso (cópia separada/externa). Metade: só um dos dois. Zero: regra errada.

### ITEM 07-a
**Resposta esperada:** "123456": sequência simples, quebrada na hora por força bruta. "valesul2026": nome da empresa + ano, fácil de adivinhar. "joao1985": dado pessoal e reutilizada em outros sistemas (se vazar um, vazam todos). Post-it no monitor: qualquer pessoa vê a senha. Exemplo inventado: "Doca7#Palete!Azul" (12 a 16 caracteres, maiúsculas, minúsculas, números e símbolos, sem dados pessoais, única para cada sistema, guardada num gerenciador de senhas).
**Critérios:** Nota cheia: problema das quatro situações + exemplo forte com regras. Metade: duas ou três situações, ou exemplo sem regras. Zero: exemplo fraco e sem análise.

### ITEM 07-b
**Resposta esperada:** 2FA exige, além da senha, um segundo fator; mesmo que a senha seja descoberta, o invasor não entra. Fatores: algo que você sabe (senha), algo que você tem (token/app autenticador, chave USB) e algo que você é (biometria).
**Critérios:** Nota cheia: conceito + três fatores. Metade: conceito com um ou dois fatores. Zero: sem relação.

### ITEM 08-a
**Resposta esperada:** O HTTPS criptografa (TLS/SSL) a conexão entre o navegador e o servidor e valida a autenticidade do site, impedindo a interceptação dos dados no caminho. Mas não impede sites falsos/fraudulentos (golpistas também usam HTTPS) nem protege o restante do tráfego numa rede aberta.
**Critérios:** Nota cheia: o que garante + o limite (não impede fraude). Metade: só um dos dois. Zero: concorda com o colega.

### ITEM 08-b
**Resposta esperada:** 1) Conectar-se a uma rede confiável protegida por senha (evitar o Wi-Fi aberto; usar o roteador do celular corporativo, se possível). 2) Iniciar e autenticar a VPN corporativa. 3) Inserir a credencial e validar o token 2FA. 4) Acessar a planilha no servidor. A VPN cria um túnel criptografado até a rede da empresa, protegendo o tráfego contra interceptação.
**Critérios:** Nota cheia: passos na ordem + função da VPN. Metade: passos incompletos ou sem explicar a VPN. Zero: acessar direto pelo Wi-Fi aberto.

### ITEM 09-a
**Resposta esperada:** O pen drive pode conter malware (vírus, trojan) que infecta o computador e captura credenciais ou dados da rede, como no caso do vazamento da folha de pagamento estudado. O conferente não deve conectá-lo: deve entregá-lo ao suporte de TI ou à segurança.
**Critérios:** Nota cheia: risco de malware + entregar à TI sem conectar. Metade: só um dos dois. Zero: conectar para ver.

### ITEM 09-b
**Resposta esperada:** Agora: avisar imediatamente a TI e o supervisor, bloquear/apagar remotamente o aparelho, trocar as senhas do e-mail e do WMS e encerrar as sessões abertas. Antes: senha forte/biometria e bloqueio automático de tela, criptografia do aparelho, rastreamento e bloqueio remoto configurados, só apps de lojas homologadas.
**Critérios:** Nota cheia: ações imediatas + duas proteções prévias. Metade: só um dos dois. Zero: sem relação.

### ITEM 10-a
**Resposta esperada:** Post-it com senha: retirar, trocar a senha e usar gerenciador de senhas. Tela desbloqueada: bloquear sempre ao levantar (Windows + L) e configurar bloqueio automático. Pen drive pessoal desconhecido: retirar e entregar à TI; só usar dispositivos autorizados. Antivírus desatualizado: atualizar o antivírus e o sistema (atualização automática). Planilha só na Área de Trabalho: salvar na pasta/nuvem corporativa e fazer backup periódico (3-2-1).
**Critérios:** Nota cheia: cinco medidas corretas. Metade: três ou quatro. Zero: duas ou menos.

### ITEM 10-b
**Resposta esperada:** A maioria dos incidentes começa com uma falha humana (clicar em phishing, senha fraca, tela aberta, pen drive desconhecido); a tecnologia não protege se as pessoas não seguirem os procedimentos, por isso a atenção e o treinamento são decisivos. Incidentes devem ser reportados imediatamente ao suporte de TI (e ao supervisor).
**Critérios:** Nota cheia: papel das pessoas + reportar à TI imediatamente. Metade: só um dos dois. Zero: sem relação.
