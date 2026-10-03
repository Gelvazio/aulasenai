# Capítulo 05 — Segurança da Informação e Proteção de Dados

- **Aula:** 05
- **Capacidade:** C2

## Teoria

### Você deixaria o portão do armazém aberto?

Ninguém deixa o portão do armazém aberto à noite. Mesmo assim, muita gente deixa a senha num
post-it no monitor, clica em qualquer link e conecta pen drives desconhecidos no computador da
empresa. Na **Distribuidora Vale Norte**, os dados de clientes, notas fiscais, rotas e estoque
valem tanto quanto as mercadorias: se forem roubados, alterados ou ficarem indisponíveis, a
operação para.

> 🎯 **Objetivos do capítulo:** conhecer os **pilares** da segurança da informação e as **leis
> vigentes**, reconhecer **golpes** (como o phishing) e **códigos maliciosos**, cuidar de **contas e
> senhas**, **navegar com segurança** e fazer **backup**.

### Os três pilares da segurança da informação

| Pilar | O que garante | Exemplo de falha na logística |
|---|---|---|
| **Confidencialidade** | Só quem tem autorização acessa | Lista de clientes e preços vazada para um concorrente |
| **Integridade** | A informação não é alterada indevidamente | Quantidade de uma nota fiscal modificada no sistema |
| **Disponibilidade** | A informação está acessível quando precisa | Sistema de estoque fora do ar no meio do inventário |

🔑 **Ponto-chave:** se qualquer um dos três falha, a empresa perde dinheiro, clientes e
credibilidade.

### Leis vigentes

- **LGPD — Lei Geral de Proteção de Dados (Lei 13.709/2018):** regula coleta, uso, guarda e
  compartilhamento de **dados pessoais**. Exige **finalidade** clara, segurança e cuidado no
  compartilhamento; a ANPD fiscaliza e pode aplicar multas de até 2% do faturamento, limitadas a
  R$ 50 milhões por infração.
- **Lei Carolina Dieckmann (Lei 12.737/2012):** tornou crime **invadir dispositivo informático**
  (computador, celular) violando mecanismo de segurança. No trabalho: usar a senha de um colega ou
  abrir pastas restritas sem permissão pode configurar crime e causar demissão por justa causa.

| Dados pessoais comuns | Dados pessoais sensíveis |
|---|---|
| Nome, CPF, endereço, telefone, e-mail | Origem racial ou étnica, religião, opinião política |
| Placa e CNH do motorista | Dados de saúde, genéticos e biométricos |

### Golpes na internet: phishing e engenharia social

**Phishing** é o golpe que imita uma mensagem legítima (banco, fornecedor, transportadora, o
próprio setor de TI) para fazer a pessoa clicar num link, abrir um anexo ou informar senhas.
Faz parte da **engenharia social**: manipular as emoções (medo, pressa, curiosidade) para
induzir ao erro.

**Sinais de alerta:**

- remetente estranho ou parecido com o verdadeiro (`suporte@vaIenorte.com` com "I" no lugar de "l");
- **urgência e ameaça** ("sua conta será bloqueada em 1 hora");
- pedido de **senha**, código ou dados bancários (empresas sérias não pedem senha por e-mail);
- links que, ao passar o mouse, mostram outro endereço; anexos inesperados (`.exe`, `.zip`).

**Conduta correta:** não clicar, não responder, não encaminhar a colegas; **avisar o suporte de
TI** e confirmar a informação por um canal oficial (telefone conhecido, site digitado à mão).

### Códigos maliciosos (malware)

| Tipo | Como age |
|---|---|
| **Vírus** | Precisa de um arquivo e da ação do usuário (abrir um anexo) para se espalhar |
| **Worm** | Espalha-se sozinho pela rede |
| **Cavalo de Troia** | Finge ser um programa útil e abre uma "porta" para o invasor |
| **Ransomware** | Criptografa os arquivos e pede resgate; pagar não garante a devolução |
| **Spyware** | Espiona o que é digitado (senhas) e acessado |

⚠️ **Atenção:** pen drive pessoal ou desconhecido é uma das portas de entrada mais comuns.

### Contas e senhas

- Senha forte: **12 a 16 caracteres**, com letras maiúsculas e minúsculas, números e símbolos.
  Uma frase também funciona: `Doca3-Carga!Sai-14h`.
- **Nunca** reutilize a mesma senha em sistemas diferentes nem a compartilhe com colegas.
- Use um **gerenciador de senhas** aprovado pela empresa; nada de papel colado no monitor.
- Ative a **autenticação em dois fatores (2FA)**: além da senha (algo que você sabe), um código no
  celular (algo que você tem) ou a biometria (algo que você é).
- Ao sair da mesa, **bloqueie a tela** (no Windows, tecla Windows + L).

### Navegação segura

- Prefira sites com **HTTPS** (cadeado): a conexão é criptografada — mas o cadeado sozinho não
  prova que o site é honesto.
- Digite o endereço de sistemas importantes em vez de clicar em links recebidos.
- Em Wi-Fi público, não acesse sistemas da empresa sem a **VPN** corporativa.
- Mantenha o sistema operacional e o antivírus **atualizados**.

### Backup: a cópia que salva o dia

**Backup** é a cópia de segurança em outro local. Se o computador queimar, for roubado ou sofrer
ransomware, os dados são recuperados a partir dela.

**Regra 3-2-1:** **3** cópias dos dados (a original + 2), em **2** tipos de mídia diferentes (ex.:
servidor e disco externo) e **1** cópia fora da empresa (ex.: nuvem corporativa). Teste a
restauração de vez em quando: backup que não abre não é backup.

### Checklist diário de segurança

| Rotina | Manutenção |
|---|---|
| Bloquear a tela ao levantar | Sistema e antivírus atualizados |
| Não compartilhar senhas | Backup periódico na nuvem da empresa |
| Conferir o remetente antes de abrir anexos | Avisar o suporte de TI sobre qualquer incidente |

## Vídeos

- [Phishing: como identificar e-mails falsos?](https://www.youtube.com/watch?v=7qeutLGZ84c) — 07:08 — PHS Brasil Consultoria em Informática
- [2FA: tudo sobre a autenticação de dois fatores!](https://www.youtube.com/watch?v=Kn943mQsWfs) — 10:18 — Locaweb
- [LGPD: resumo da lei em 4 minutos](https://www.youtube.com/watch?v=n3e0HVcNml0) — 04:06 — ManageEngine Brasil
- [Plano de backup 3-2-1: aprenda como usar na sua empresa](https://www.youtube.com/watch?v=2O8eUuK-bfM) — 06:39 — FourServ

## Exercícios

### ITEM 1
- **Capacidade:** C2
- **Contexto:** Um conferente de carga da Vale Norte recebe um e-mail "URGENTE" do "banco" dizendo que a conta da empresa será bloqueada em 1 hora, a menos que ele informe a senha do sistema de estoque no link enviado.
- **Comando:** Aponte pelo menos três sinais de que é phishing, descreva a conduta correta do conferente e explique o que poderia acontecer com os dados dos clientes (relacione com a LGPD) se ele clicasse.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C2
- **Contexto:** Em uma semana aconteceram três incidentes: (a) a planilha de preços dos clientes apareceu num grupo externo; (b) alguém mudou a quantidade de uma nota fiscal no sistema; (c) o sistema de rastreio ficou fora do ar por uma tarde.
- **Comando:** Relacione cada incidente ao pilar da segurança da informação que foi violado (confidencialidade, integridade ou disponibilidade) e proponha uma medida de prevenção para cada um.
- **Linhas:** 5

### ITEM 3
- **Capacidade:** C2
- **Contexto:** Na expedição, as senhas usadas são "valenorte2026", "123456" e a data de nascimento do supervisor. Todos usam a mesma senha no e-mail e no sistema de estoque.
- **Comando:** Explique por que essas senhas são fracas, crie um exemplo de senha forte seguindo as regras do capítulo e explique como a autenticação em dois fatores aumenta a proteção.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C2
- **Contexto:** O computador do almoxarifado foi atacado por ransomware: todos os arquivos ficaram bloqueados e os criminosos pedem pagamento. A planilha de inventário do mês estava só naquele computador.
- **Comando:** Explique o que é backup e por que pagar o resgate não é solução, e monte um plano de backup 3-2-1 para a planilha de inventário.
- **Linhas:** 5

### ITEM 5
- **Capacidade:** C2
- **Contexto:** Um colega enviou para um grupo de mensagens com pessoas de fora da empresa uma planilha com nome, CPF, endereço e telefone de todos os motoristas cadastrados, "para facilitar o contato".
- **Comando:** Diga quais desses dados são pessoais, explique por que a atitude desrespeita a LGPD e descreva como o compartilhamento deveria ter sido feito.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C2
- **Contexto:** Ao chegar ao escritório, você encontra uma estação de trabalho com a senha num post-it no monitor, a tela desbloqueada e um pen drive pessoal desconhecido conectado.
- **Comando:** Identifique as três vulnerabilidades, explique o risco de cada uma (inclusive de malware) e proponha a correção.
- **Linhas:** 5

## Resumo

- Os **pilares** da segurança são **confidencialidade, integridade e disponibilidade**.
- **LGPD (13.709/2018)** protege dados pessoais; a **Lei 12.737/2012** pune a invasão de dispositivos.
- **Phishing** imita mensagens legítimas e usa urgência para roubar senhas: não clique, avise a TI.
- **Malware** (vírus, worm, cavalo de Troia, ransomware, spyware) entra por anexos, downloads e pen drives.
- Senhas fortes e únicas, gerenciador de senhas e **2FA** protegem as contas.
- Navegue com HTTPS e VPN, mantenha tudo atualizado e faça **backup** pela regra **3-2-1**.

## Glossário

- **Phishing:** golpe que imita mensagem legítima.
- **Malware:** programa malicioso (vírus, ransomware, spyware).
- **Backup:** cópia de segurança em outro local.
- **Confidencialidade:** garantia de que só pessoas autorizadas acessam a informação.
- **Integridade:** garantia de que a informação não foi alterada indevidamente.
- **Disponibilidade:** garantia de que a informação está acessível quando necessária.
- **LGPD:** Lei Geral de Proteção de Dados (Lei 13.709/2018).
- **Ransomware:** malware que bloqueia os arquivos e exige resgate.
- **Engenharia social:** manipulação das pessoas para que revelem dados ou cometam erros.
- **Autenticação em dois fatores (2FA):** acesso que exige, além da senha, uma segunda prova de identidade.
