# Aula 5 — Segurança da Informação e Proteção de Dados

Fundamentos essenciais, legislação brasileira e conduta profissional no ambiente corporativo digital.

> Conteúdo extraído de `5-Segurança-da-Informação-e-Proteção-de-Dados.pdf` (41 slides). UC Introdução à TIC — Assistente de Operações Logísticas (SENAI).

---

## Você Deixaria sua Porta Aberta?

Se ninguém deixaria as chaves de casa na calçada, por que descuidamos dos nossos dados em redes públicas e e-mails corporativos?

## Objetivos da Aula

- Dominar os **pilares da segurança da informação (CIA)** aplicados ao ambiente corporativo.
- Conhecer leis digitais fundamentais: **LGPD** e **Lei Carolina Dieckmann**.
- Implementar defesas ativas contra golpes digitais, malware e vazamentos.

## Vocabulário Essencial

| Termo | Definição |
|---|---|
| Confidencialidade | Garante que os dados fiquem restritos a pessoas autorizadas |
| Phishing | Fraude que usa mensagens falsas para induzir cliques e roubar credenciais |
| Criptografia | Codificação que torna dados ilegíveis sem uma chave secreta |
| Backup | Cópia redundante de dados para restauração rápida em falhas ou ataques |

## Revisão: Comunicação e Nuvem

Ferramentas colaborativas agilizam equipes, mas criam vulnerabilidades se permissões e links forem configurados sem cuidado. Arquivos na nuvem exigem permissões restritas a contas profissionais verificadas.

**Checagem:** o compartilhamento responsável com clientes externos é feito por **convite nominal ao e-mail profissional**, bloqueando links públicos abertos.

---

## A Tríade CIA

A segurança digital apoia-se em três pilares. Se um falhar, a integridade operacional da empresa é comprometida.

| Pilar | Medidas | Exemplo |
|---|---|---|
| **Confidencialidade** | Restrição de visualização, gestão de credenciais, criptografia em trânsito | Dados de saúde, financeiros e senhas |
| **Integridade** | Garantia de não alteração, assinaturas digitais, trilhas de auditoria | Planilhas contábeis devem permanecer íntegras |
| **Disponibilidade** | Acesso garantido, servidores redundantes, planos de recuperação | Sistemas hospitalares e bancários operam 24/7 |

## Ameaças aos Pilares na Prática

- **Confidencialidade violada:** vazamento da lista de clientes após ataque a banco de dados não criptografado.
- **Integridade violada:** malware que altera valores em notas fiscais antes da emissão.
- **Disponibilidade violada:** ataque **DDoS** que sobrecarrega servidores e derruba o portal de atendimento.

---

## Legislação Brasileira

O ambiente virtual possui leis. Crimes cibernéticos, espionagem e vazamentos resultam em punições civis e criminais. Profissionais de TI respondem pelo zelo e custódia ética dos ativos da empresa.

## Lei Carolina Dieckmann (Lei 12.737/2012)

- Inseriu no Código Penal (**art. 154-A**) o crime de **invasão de dispositivo informático**, mediante violação indevida de mecanismo de segurança.
- **No trabalho:** acessar senhas de colegas, instalar programas espiões ou violar pastas restritas configura crime passível de demissão por justa causa e reclusão.

## LGPD — Lei Geral de Proteção de Dados (Lei 13.709/2018)

- Regula coleta, uso, armazenamento e compartilhamento de **dados pessoais** no Brasil.
- Exige **finalidade legítima e explícita**.
- Obriga empresas a adotar segurança digital.
- Prevê sanções da **ANPD** (Autoridade Nacional de Proteção de Dados).

⚠️ **Multas:** até **2% do faturamento**, limitadas a **R$ 50 milhões por infração**.

## Dados Pessoais: Comuns × Sensíveis

| Dados pessoais comuns | Dados pessoais sensíveis |
|---|---|
| Nome completo e CPF | Origem racial ou étnica |
| Endereço residencial e e-mail | Convicções religiosas ou políticas |
| Telefone e registro profissional | Dados genéticos, biométricos e histórico de saúde |
| Usados em cadastros e notas fiscais | Exigem proteção máxima; vazamento gera penalidades agravadas |

**V ou F:** "Uma empresa pode coletar qualquer dado dos clientes e guardá-lo para sempre sem justificar a finalidade." → **FALSO**. A LGPD exige finalidade específica e veda armazenamento perpétuo e abusivo.

---

## O Universo dos Códigos Maliciosos

Softwares maliciosos (**malwares**) evoluíram de brincadeiras de programadores para uma indústria milionária de extorsão e espionagem.

## Vírus, Worms e Trojans

| Tipo | Como age | Alerta |
|---|---|---|
| **Vírus** | Exige arquivo hospedeiro e ação do usuário (ex.: abrir executável) para se propagar | Anexos com extensão dupla, como `relatório.pdf.exe` |
| **Worm** | Autônomo; propaga-se sozinho pela rede explorando vulnerabilidades, sem interação humana | Pode saturar links corporativos rapidamente |
| **Trojan (Cavalo de Troia)** | Finge ser utilitário legítimo, mas abre *backdoors* para controle remoto | Instalado via downloads de sites não confiáveis |

## Ransomware: o Sequestro Digital

Malware que **criptografa** arquivos e redes: os dados ficam inacessíveis, criminosos exigem resgate e as operações são paralisadas.

🧠 **Lembre-se:** pagar o resgate não garante a devolução dos dados e financia crimes.

## Spyware e Adware

- **Spyware:** monitora silenciosamente tudo o que o usuário digita (**keyloggers**) ou acessa; captura credenciais bancárias e de e-mail.
- **Adware:** injeta anúncios indesejados e sequestra mecanismos de busca; degrada a velocidade da máquina.

## Engenharia Social e Phishing

- **Engenharia social:** manipulação psicológica para induzir erros, explorando curiosidade, medo ou urgência.
- **Anatomia do phishing:** remetentes falsos ou parecidos; links com erros sutis de digitação; urgência ("sua conta será cancelada").

---

## Gestão de Senhas Robustas

Senhas simples (datas, sequências) são quebradas instantaneamente por ataques de **força bruta**.

- Use **12 a 16 caracteres** variados.
- Misture maiúsculas, minúsculas, números e símbolos.
- Nunca reutilize senhas em sistemas distintos.
- Utilize gerenciadores de senhas confiáveis.

🧠 Evite anotar senhas em papéis colados no monitor ou em gavetas.

## Autenticação em Dois Fatores (2FA)

Mesmo que a senha seja descoberta, o criminoso não acessa a conta sem o segundo fator:

- **Algo que você sabe:** senha ou frase secreta.
- **Algo que você tem:** token de aplicativo autenticador ou chave física USB.
- **Algo que você é:** biometria digital, reconhecimento facial ou retina.

## Navegação Segura e HTTPS

O **HTTPS** usa criptografia **TLS/SSL** para proteger a conexão entre navegador e servidor: bloqueia a interceptação de dados e valida a autenticidade do site.

⚠️ HTTPS garante criptografia, mas **não impede** fraudes ou sites maliciosos.

## VPN Corporativa

A **VPN** (Virtual Private Network) cria um túnel criptografado entre o dispositivo remoto e a intranet da empresa: mascara o tráfego em Wi-Fi públicos ou domésticos e impede a interceptação de pacotes. Fundamental no home office.

**Ordem segura de conexão remota:** conectar-se a uma rede confiável protegida por senha → iniciar e autenticar a VPN corporativa → inserir a credencial e validar o token 2FA → acessar pastas e bancos de dados do projeto.

## Estratégia de Backup 3-2-1

- **3 cópias:** o original e duas cópias.
- **2 mídias:** tecnologias distintas, como HD e fita.
- **1 cópia externa:** fora da empresa ou na nuvem.

## Proteção de Dispositivos Móveis

A perda de um celular corporativo desbloqueado equivale a entregar a chave do escritório a estranhos.

- Biometria e senhas alfanuméricas complexas.
- Criptografia integral do disco e da memória.
- Rastreamento e bloqueio remoto configurados.
- Aplicativos apenas de repositórios homologados.

---

## Estudo de Caso: Vazamento em Indústria Logística

Um funcionário conectou um **pen drive pessoal** ao PC da empresa. O dispositivo continha um **trojan** que capturou credenciais do servidor, vazando a folha de pagamento de **1.200 colaboradores**. Consequências: ações trabalhistas, multas da ANPD e danos à reputação.

**Debate — responsabilidade:** é **compartilhada**. O colaborador violou condutas ao usar dispositivo pessoal não autorizado; a empresa responde pela negligência nos controles (bloqueio de portas USB e treinamento).

## Checklist de Segurança Diária

| Rotina de acesso | Manutenção técnica |
|---|---|
| Bloquear a tela ao levantar (**Windows + L**) | Manter sistema e antivírus atualizados |
| Não compartilhar credenciais com colegas | Fazer backups periódicos na nuvem corporativa |
| Validar remetentes antes de abrir anexos | Reportar incidentes imediatamente ao suporte de TI |

## Checagem Geral

| Pergunta | Resposta |
|---|---|
| Três pilares da segurança da informação? | Confidencialidade, Integridade e Disponibilidade (CIA) |
| Lei que pune a invasão de dispositivos? | Lei Carolina Dieckmann (12.737/2012) |
| O que preconiza a regra 3-2-1? | 3 cópias, 2 mídias diferentes, 1 cópia fora do local |

## Síntese

- Segurança digital exige tecnologia, processos e **pessoas**.
- LGPD e Código Penal exigem ética no manuseio de dados.
- 2FA e backups disciplinados evitam desastres.
- O fator humano é determinante: atenção constante previne fraudes.

**Atividade prática:** analisar uma estação de trabalho fictícia, identificar 3 vulnerabilidades (post-it com senha, tela desbloqueada, pen drive não identificado) e propor a medida corretiva de cada uma.

---

**Fonte:** Aula 5 — Segurança da Informação e Proteção de Dados · **Curso:** Assistente de Operações Logísticas · **UC:** Introdução à TIC · **SENAI**
