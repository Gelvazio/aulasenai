# Segurança da Informação e Proteção de Dados

> Fundamentos essenciais, legislação brasileira e conduta profissional no ambiente corporativo
> digital.

**Fonte:** `5-Segurança-da-Informação-e-Proteção-de-Dados.pdf` (41 slides) — Introdução à TIC,
Assistente de Operações Logísticas — aula de 28/09/2026.

---

## Slide 2 — Você Deixaria Sua Porta Aberta?

Se ninguém deixaria as chaves de casa na calçada, por que descuidamos dos nossos dados em redes
públicas e e-mails corporativos?

## Slide 3 — Objetivos da Aula

**Metas de aprendizagem:**

1. Dominar os pilares da segurança da informação (CIA) aplicados ao ambiente corporativo.
2. Conhecer leis digitais fundamentais: LGPD e a Lei Carolina Dieckmann no Brasil.
3. Implementar defesas ativas contra golpes digitais, malware e vazamentos operacionais.

## Slide 4 — Vocabulário Essencial de Segurança

| Termo | Significado |
|-------|-------------|
| **Confidencialidade** | Garante que dados fiquem restritos apenas a pessoas autorizadas. |
| **Phishing** | Fraude que usa mensagens falsas para induzir cliques e roubar credenciais. |
| **Criptografia** | Codificação que torna dados ilegíveis sem uma chave secreta específica. |
| **Backup** | Cópia redundante de dados para restauração rápida em falhas ou ataques. |

## Slide 5 — Revisão: Comunicação e Nuvem

*Fundamentos.* **Conexão com a aula anterior:** na aula passada, vimos a colaboração em nuvem e o
e-mail profissional. Ferramentas colaborativas agilizam equipes, mas criam vulnerabilidades se
permissões e links forem configurados sem cuidado.

> 🧠 **Lembre-se:** arquivos na nuvem exigem permissões restritas a contas profissionais
> verificadas.

## Slides 6 e 7 — Checagem de Aprendizagem: Nuvem

Qual prática garante o compartilhamento responsável de um documento na nuvem com clientes externos?

1. Conceder acesso por convite nominal ao e-mail profissional, bloqueando links públicos abertos. ✅
2. Deixar o arquivo configurado como "qualquer pessoa com o link pode editar".
3. Compartilhar a senha mestre de login corporativo diretamente no corpo do e-mail.
4. Publicar a pasta corporativa inteira sem registrar a atividade dos usuários.

## Slide 8 — A Tríade CIA: Pilares Fundamentais

A base da segurança digital apoia-se em três pilares inegociáveis: **Confidencialidade**,
**Integridade** e **Disponibilidade**. Se um falhar, a integridade operacional de toda a empresa é
comprometida.

## Slide 9 — Detalhamento: Tríade de Segurança

| Confidencialidade | Integridade | Disponibilidade |
|-------------------|-------------|-----------------|
| • Restrição de visualização. | • Garantia de não alteração. | • Acesso aos dados garantido. |
| • Gestão de credenciais. | • Uso de assinaturas digitais. | • Servidores redundantes. |
| • Criptografia em trânsito. | • Trilhas de auditoria. | • Planos de recuperação. |
| 🔑 Dados de saúde, financeiros e senhas são confidenciais. | 🔑 Planilhas contábeis devem permanecer íntegras e invioladas. | 🔑 Sistemas hospitalares ou bancários exigem operação 24/7. |

## Slide 10 — Ameaças aos Pilares em Prática

*Fundamentos.* **Como cada pilar é atacado?**

- **Violação de Confidencialidade:** vazamento de lista de clientes após ataque a banco de dados
  não criptografado.
- **Violação de Integridade:** malware que altera valores em notas fiscais digitais antes da
  emissão.
- **Violação de Disponibilidade:** ataque DDoS que sobrecarrega servidores e derruba o portal de
  atendimento.

## Slide 11 — Legislação Brasileira: Marco Legal

**Responsabilidade civil e penal:** o ambiente virtual brasileiro possui leis. Crimes
cibernéticos, espionagem e vazamentos corporativos resultam em punições civis e criminais
rigorosas.

> 🔑 **Ponto-chave:** profissionais de TI respondem pelo zelo e pela custódia ética dos ativos da
> empresa.

## Slide 12 — Lei Carolina Dieckmann (12.737/2012)

| Tipificação Criminal | Aplicação no Trabalho |
|----------------------|-----------------------|
| Inseriu no Código Penal (art. 154-A) o crime de invasão de dispositivo informático, mediante violação indevida de mecanismo de segurança. | Acessar senhas de colegas, instalar programas espiões ou violar pastas restritas da diretoria configura crime passível de demissão por justa causa e reclusão. |

## Slide 13 — LGPD: Lei Geral de Proteção de Dados

**Lei Federal 13.709/2018:** a LGPD regula coleta, uso, armazenamento e compartilhamento de dados
pessoais no Brasil.

- Exige finalidade legítima e explícita.
- Obriga empresas a adotar segurança digital.
- Prevê sanções da ANPD.

> ⚠️ **Atenção:** multas de até 2% do faturamento, limitadas a R$ 50 milhões por infração.

## Slide 14 — Dados Pessoais: Comuns vs Sensíveis

| Dados Pessoais Comuns | Dados Pessoais Sensíveis |
|-----------------------|--------------------------|
| Informações que identificam ou tornam identificável uma pessoa natural: | Dados que exigem camada máxima de proteção legal contra discriminação: |
| • Nome completo e CPF. | • Origem racial ou étnica. |
| • Endereço residencial e e-mail. | • Convicções religiosas ou políticas. |
| • Número de telefone e registro profissional. | • Dados genéticos, biométricos e histórico de saúde. |
| 🔍 **Exemplo:** usados rotineiramente em cadastros comerciais e faturamento de notas fiscais. | ⚠️ **Atenção:** o vazamento de dados sensíveis acarreta penalidades judiciais agravadas. |

## Slides 15 e 16 — Checagem: Entendimento da LGPD

> Uma empresa pode coletar qualquer tipo de dado de seus clientes e guardá-lo para sempre sem
> precisar justificar a finalidade.

- 👍 VERDADEIRO
- 👎 FALSO ✅

🤔 Prepare-se para explicar o seu raciocínio.

**🔑 Por que é isso?** A LGPD exige finalidade específica e legítima para a coleta, vedando o
armazenamento perpétuo e abusivo.

## Slide 17 — O Universo dos Códigos Maliciosos

Softwares maliciosos (malwares) evoluíram de simples brincadeiras de programadores para uma
indústria milionária de extorsão e espionagem corporativa.

## Slide 18 — Ameaças Digitais: Vírus, Worms e Trojans

| Vírus | Worms | Trojan (Cavalo de Troia) |
|-------|-------|--------------------------|
| Programa que exige arquivo hospedeiro e ação do usuário (ex.: abrir executável) para se propagar e infectar o sistema. | Autônomo e contagioso. Propaga-se automaticamente via rede, explorando vulnerabilidades sem precisar de interação humana. | Software que se passa por utilitário legítimo, mas abre backdoors para permitir controle remoto por invasores. |
| 🔍 **Exemplo:** anexos falsos com extensão dupla, como `relatório.pdf.exe`. | ⚠️ **Atenção:** capaz de saturar links corporativos rapidamente. | ⚠️ **Atenção:** instalado via downloads em sites não confiáveis. |

## Slide 19 — Ransomware: O Sequestro Digital

*Ameaças.* **Pesadelo organizacional:** ransomware é um malware que criptografa redes.

- Arquivos tornam-se inacessíveis.
- Criminosos exigem resgate.
- Operações são paralisadas.

> 🧠 **Lembre-se:** pagar resgate não garante a devolução dos dados e financia crimes.

## Slide 20 — Spyware e Adware no Trabalho

*Ameaças.* **Espionagem silenciosa:** o Spyware monitora silenciosamente tudo o que o usuário
digita (keyloggers) ou acessa no navegador. Já o Adware injeta anúncios indesejados e sequestra
mecanismos de busca.

- Captura credenciais bancárias e acessos de e-mail corporativo.
- Degrada a velocidade e a estabilidade da máquina de trabalho.

## Slides 21 e 22 — Identificação de Malwares

Qual tipo de malware criptografa os arquivos do computador e exige pagamento financeiro para
liberação da chave?

1. Worm
2. Adware
3. Ransomware ✅
4. Spyware

## Slide 23 — Engenharia Social e Phishing

| Engenharia Social | Anatomia do Phishing |
|-------------------|----------------------|
| Manipulação psicológica para induzir erros, explorando curiosidade, medo ou urgência. | • Remetentes falsos ou similares.<br>• Links com erros sutis de digitação.<br>• Urgência: "sua conta será cancelada". |

## Slide 24 — Vídeo: Defesa Contra Phishing

Identifique engenharia social em e-mails e fraudes antes de clicar.

🎬 <https://www.youtube.com/watch?v=yNV6BUTZXIk>

## Slide 25 — Gestão de Senhas Robustas

**Parâmetros de alta segurança:** senhas simples (datas/sequências) são quebradas instantaneamente
por ataques de força bruta.

- Use de 12 a 16 caracteres variados.
- Misture maiúsculas, minúsculas, números e símbolos.
- Nunca reutilize senhas em sistemas distintos.
- Utilize gerenciadores de senhas confiáveis.

> 🧠 **Lembre-se:** evite anotar senhas em papéis colados no monitor ou em gavetas.

## Slide 26 — Autenticação em Dois Fatores (2FA)

O 2FA adiciona uma camada de proteção indispensável. Mesmo que sua senha seja descoberta, o
criminoso não terá acesso à conta sem o segundo fator.

| Fator | Exemplos |
|-------|----------|
| **Algo que Você Sabe** | Sua senha mestra individual ou frase secreta. |
| **Algo que Você Tem** | Token de aplicativo autenticador ou chave física USB. |
| **Algo que Você É** | Biometria digital, reconhecimento facial ou padrão de retina. |

## Slide 27 — Navegação Segura e Protocolo HTTPS

*Navegação.* **O que significa o cadeado?** O HTTPS usa criptografia TLS/SSL para proteger a
conexão entre navegador e servidor.

- Bloqueia a interceptação de dados.
- Valida a autenticidade do site.

> ⚠️ **Atenção:** o HTTPS garante criptografia, mas não impede fraudes nem sites maliciosos.

## Slide 28 — Uso Corporativo de Redes VPN

*Navegação.* **O túnel criptografado:** uma VPN (Virtual Private Network) cria uma ponte segura
entre o dispositivo remoto do colaborador e a intranet da empresa.

- Mascara o tráfego em redes Wi-Fi públicas ou domésticas.
- Impede a espionagem e a interceptação de pacotes de dados.
- É fundamental para trabalhadores em regime home office.

## Slides 29 e 30 — Ordem Segura de Conexão Remota

Ordene os passos corretos para um colaborador iniciar com segurança o expediente em home office.

**Itens apresentados:**

- Iniciar e autenticar o cliente de VPN corporativa fornecido pela empresa.
- Inserir a credencial corporativa e validar o token de 2FA no aplicativo.
- Acessar as pastas de trabalho e bancos de dados confidenciais do projeto.
- Conectar-se a uma rede de internet confiável e protegida por senha.

**Ordem correta ✅:**

1. Conectar-se a uma rede de internet confiável e protegida por senha.
2. Iniciar e autenticar o cliente de VPN corporativa fornecido pela empresa.
3. Inserir a credencial corporativa e validar o token de 2FA no aplicativo.
4. Acessar as pastas de trabalho e bancos de dados confidenciais do projeto.

## Slide 31 — A Estratégia de Backup 3-2-1

Backups protegem contra ransomware, falhas ou exclusões no ambiente industrial.

| Regra | Significado |
|-------|-------------|
| **3 cópias** | O original e duas cópias. |
| **2 mídias** | Use tecnologias distintas, como HD e fita. |
| **1 cópia externa** | Mantenha um backup fora da empresa ou na nuvem. |

## Slide 32 — Proteção de Dispositivos Móveis

**Smartphones e notebooks da empresa:** a perda física de um celular corporativo desbloqueado
equivale a entregar a chave do escritório a estranhos.

- Uso obrigatório de biometria e senhas alfanuméricas complexas.
- Criptografia integral do disco rígido e da memória interna.
- Configuração prévia de rastreamento e bloqueio remoto.
- Instalação de aplicativos somente por repositórios homologados.

## Slide 33 — Estudo de Caso: O Vazamento de Dados

**Cenário real em indústria logística:** um funcionário conectou um pendrive pessoal ao PC da
empresa. O dispositivo continha um trojan que capturou credenciais do servidor, vazando a folha de
pagamento de 1.200 colaboradores.

> ⚠️ **Atenção:** consequências: ações trabalhistas, multas da ANPD e danos graves à reputação da
> marca.

## Slides 34 e 35 — Debate: Responsabilidade no Caso

> De quem foi a responsabilidade principal pelo incidente relatado: do funcionário que inseriu o
> pendrive ou da empresa que não bloqueou as portas USB?

**Você poderia ter dito... ✅**

- **Responsabilidade compartilhada:** o colaborador violou condutas ao usar dispositivos pessoais
  não autorizados no trabalho.
- A empresa responde pela negligência de controles técnicos, pois suas políticas de TI deveriam
  bloquear portas USB e treinar funcionários contra riscos de engenharia reversa e malwares.

*Observação: o slide diz "engenharia reversa"; pelo contexto do caso, o termo mais adequado seria
"engenharia social".*

## Slide 36 — Checklist: Segurança Diária

| Rotina de Acesso | Manutenção Técnica |
|------------------|--------------------|
| • Bloquear a tela ao levantar da mesa (Windows + L). | • Manter sistema e antivírus sempre atualizados. |
| • Não compartilhar credenciais com colegas de setor. | • Executar backups periódicos na nuvem corporativa. |
| • Validar remetentes antes de abrir anexos externos. | • Reportar incidentes imediatamente ao suporte de TI. |
| 🧠 **Lembre-se:** a tela do computador de trabalho nunca deve ficar aberta sem supervisão. | 🔑 **Ponto-chave:** a notificação imediata de anomalias reduz o impacto de ataques na rede. |

## Slides 37 e 38 — Checagem Geral de Segurança

| Pergunta | Resposta |
|----------|----------|
| 1. Quais são os três pilares fundamentais da segurança da informação? | Confidencialidade, Integridade e Disponibilidade (Tríade CIA). |
| 2. Qual legislação criminal brasileira pune especificamente a invasão de dispositivos informáticos? | Lei Carolina Dieckmann (Lei Federal 12.737/2012). |
| 3. O que preconiza a regra 3-2-1 para a execução de backups seguros? | Guardar 3 cópias dos dados, em 2 mídias diferentes, sendo 1 cópia armazenada fora do local (off-site ou nuvem). |

## Slide 39 — Síntese dos Aprendizados

- Segurança digital exige tecnologia, processos e pessoas.
- A LGPD e o Código Penal exigem ética no manuseio de dados.
- Autenticação 2FA e backups disciplinados evitam desastres.

> 🧠 **Lembre-se:** o fator humano é determinante na segurança: atenção constante previne fraudes
> complexas.

## Slide 40 — Atividade Prática: Auditoria de Risco

Analise uma estação de trabalho fictícia da sua escola técnica e elabore um relatório breve
identificando **3 vulnerabilidades visíveis** (ex.: post-it com senhas, tela desbloqueada,
pendrive não identificado). Proponha a medida corretiva correspondente para cada uma,
fundamentando sua ação nas normas da LGPD e nos pilares da segurança.

## Slide 41 — Próximos Passos na Série

**Conexão com a próxima aula:** com as práticas de proteção e conformidade dominadas, avançaremos
na próxima aula para a manipulação eficiente de dados estruturados com Software de Escritório:
Editor de Planilhas Eletrônicas, aplicando fórmulas e segurança de células.

> 🔑 **Ponto-chave:** planilhas corporativas exigem tratamento rigoroso de dados segundo as regras
> da LGPD vistas hoje.
