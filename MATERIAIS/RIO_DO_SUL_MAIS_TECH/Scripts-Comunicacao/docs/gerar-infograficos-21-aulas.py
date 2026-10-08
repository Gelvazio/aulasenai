from pathlib import Path
import re
from html import escape

BASE = Path(__file__).resolve().parent.parent
OUT = BASE / 'ATIVIDADES' / 'INFOGRAFICOS'
SOURCE = BASE / 'ATIVIDADES' / 'ATIVIDADES-DETALHADAS-POR-AULA-E-MODULO.md'
STYLE = Path(r'C:\fontes\aulas-senai\GERADOR-AULAS\GERADOR-INFOGRAFICOS\infografico.css')
LESSONS = []

def aula(title, module, intro, flow, concepts, before, after, example_title, example, caution, checklist, rule):
    LESSONS.append(dict(title=title, module=module, intro=intro, flow=flow.split('|'), concepts=concepts.split('|'), before=before, after=after, example_title=example_title, example=example.split('|'), caution=caution, checklist=checklist.split('|'), rule=rule))

aula('Uma mensagem que funciona', 1,
'Comunicar é construir entendimento com outra pessoa. Enviar um aviso é apenas uma parte: a mensagem precisa chegar, fazer sentido e permitir uma resposta.',
'Emissor::Quem prepara a mensagem e define a intenção.|Mensagem + canal::O que será comunicado e por qual meio: fala, papel, áudio ou texto.|Receptor::Quem recebe e interpreta a informação a partir de seu contexto.|Feedback::A resposta permite perceber o que foi compreendido e ajustar a mensagem.',
'Clareza::Use palavras que o público conhece e identifique pessoas, lugares e materiais.|Objetividade::Destaque a ação esperada. Informações secundárias não devem esconder horário ou local.|Respeito::Faça pedidos sem humilhar, ameaçar ou desconsiderar dúvidas.',
'Tragam aquilo amanhã e cheguem cedo lá.',
'Na sexta-feira, tragam os cartazes à biblioteca às 13h30. A feira começa às 14h. Confirmem que receberam e entenderam o aviso.',
'Cinco perguntas que organizam o aviso',
'Quem? Integrantes da equipe da feira.|O quê? Levar os cartazes e ajudar na preparação.|Quando? Sexta-feira, chegada às 13h30.|Onde? Biblioteca da escola.|Como confirmar? Responder informando que compreendeu a orientação.',
'Uma notificação de mensagem entregue não prova que o conteúdo foi entendido. A confirmação precisa se relacionar à orientação.',
'O destinatário está definido?|Local, horário e ação estão claros?|Há uma forma de confirmar ou tirar dúvidas?',
'A boa mensagem permite que o outro saiba o que fazer.')

aula('Por que a mensagem se perde?', 1,
'Ruído é uma interferência que dificulta a comunicação. Pode estar no ambiente, na escolha das palavras, no canal ou no acesso do público.',
'Intenção::A oficina precisa receber materiais no prazo.|Expressão::O pedido deve indicar quantidade, tipo e momento da entrega.|Acesso::O receptor precisa conseguir ouvir, ler ou acessar a orientação.|Confirmação::Compare o pedido com aquilo que o receptor entendeu.',
'Ruído físico::Barulho e áudio baixo podem impedir que parte do pedido seja ouvida.|Ambiguidade::Expressões como “as pequenas” dependem de uma referência compartilhada.|Barreira de acesso::Nem todo destinatário pode abrir áudio, vídeo ou aplicativo naquele momento.',
'Manda uma dúzia das pequenas para quinta de manhã.',
'Precisamos de 12 caixas pequenas até quinta-feira, às 10h. Você consegue separar essa quantidade? Confirme também o local de entrega.',
'Mesmo pedido, públicos diferentes',
'Para a equipe: mensagem breve, com quantidade e prazo destacados.|Para o almoxarifado: pedido identificado, finalidade e confirmação de disponibilidade.|Em ambos: preservar os mesmos números e informações.|Se faltar um dado: perguntar. Não preencher a lacuna com uma suposição.',
'Formalidade não significa usar palavras difíceis. Um texto simples pode ser respeitoso e profissional.',
'As palavras têm referência clara?|O canal é acessível ao destinatário?|A confirmação repete os dados essenciais?',
'Quando a compreensão falha, investigue o processo inteiro.')

aula('Feedback que gera melhoria', 1,
'Feedback é uma devolutiva sobre algo observado. Ele ajuda quando mostra um ponto concreto, explica o efeito e oferece uma possibilidade de melhoria.',
'Observe::Localize um trecho, uma ação ou uma informação ausente.|Explique::Diga como isso afeta a compreensão ou o resultado.|Sugira::Proponha uma mudança que possa ser realizada.|Confirme::Ouça o autor e acompanhe a versão revisada.',
'Evidência::“O cartaz não informa horário” descreve algo que pode ser localizado.|Efeito::“Quem deseja participar pode não saber quando chegar” explica por que isso importa.|Autoria::Quem recebe a sugestão pode pedir esclarecimento e decidir como revisar, justificando sua escolha.',
'Seu cartaz ficou horrível. Ninguém entende nada.',
'Não encontrei o horário de coleta. Isso pode dificultar a entrega. Sugiro acrescentar “durante os intervalos”.',
'Como receber uma devolutiva',
'Ouça até compreender a observação.|Reformule: “Você sentiu falta do horário, certo?”.|Pergunte o que ainda ficou confuso.|Revise o texto e registre a mudança.|Se não adotar a sugestão, explique o motivo com respeito.',
'Falar sobre a qualidade de um texto é diferente de rotular a pessoa. Evite “você é desorganizado” e descreva o que pode melhorar.',
'Apontei uma evidência concreta?|Minha sugestão é realizável?|Dei espaço para o autor responder?',
'Feedback útil mostra um caminho, não apenas um julgamento.')

aula('Apresentar uma ideia em dois minutos', 2,
'Uma apresentação começa pela intenção: o que o público deve compreender ou fazer? Selecionar uma ideia principal torna a fala mais fácil de acompanhar.',
'Objetivo::Escolha uma mudança ou aprendizado específico para o público.|Introdução · 30 s::Apresente o tema e explique sua importância.|Desenvolvimento · 60 s::Explique a proposta com um exemplo concreto.|Conclusão · 30 s::Retome a ideia principal e indique o próximo passo.',
'Público::Pense no que os colegas já sabem e no que precisam entender.|Roteiro::Anote palavras-chave para orientar a fala sem depender da leitura integral.|Apoio visual::Um cartão ou slide deve destacar a mensagem, não repetir tudo que você dirá.',
'Vou falar de organização e de muitas outras coisas importantes.',
'Quero propor etiquetas nas caixas da sala para que todos encontrem e devolvam os materiais com mais facilidade.',
'Um roteiro possível',
'Abertura: “Quanto tempo perdemos procurando uma caneta?”.|Ideia: identificar as caixas por tipo de material.|Exemplo: uma caixa marcada “canetas” facilita retirada e devolução.|Ação final: combinar com a turma quem fará as etiquetas.|Ensaio: conferir se a proposta cabe em dois minutos.',
'Nervosismo não significa falta de capacidade. Use roteiro, faça uma pausa inicial e ensaie em um ambiente acolhedor.',
'Tenho uma ideia principal?|Meu exemplo ajuda a entendê-la?|Termino com uma ação clara?',
'O público deve lembrar a mensagem principal, não a quantidade de tópicos.')

aula('Voz: ritmo, pausa e intenção', 2,
'A voz organiza a informação. Pausas, velocidade e ênfase ajudam o público a identificar o que importa. Não existe um único sotaque ou jeito correto de falar.',
'Prepare::Identifique horário, local e orientações essenciais.|Marque::Sublinhe palavras importantes e separe ideias com pausas.|Apresente::Use velocidade e volume confortáveis para o ambiente.|Ajuste::Pergunte o que o ouvinte entendeu e faça uma nova tentativa.',
'Ritmo::Variações moderadas evitam uma fala corrida ou difícil de acompanhar.|Pausa::Um pequeno intervalo separa ideias e oferece tempo para compreender.|Ênfase::Destacar palavras-chave ajuda a diferenciar informação central de detalhe.',
'Aoficinacomeçaàs14hnasala3tragamcadernoelápis…',
'A oficina começa às 14h / na sala 3. // Tragam caderno e lápis. // Se não puderem participar, avisem até o intervalo.',
'Legenda de um roteiro falado',
'Barra simples (/): pausa breve entre informações.|Barra dupla (//): fechamento de uma ideia.|Sublinhado: palavra que merece destaque, sem gritar.|Leitura de retorno: peça ao colega que diga horário, local e materiais.|Revisão: ajuste o trecho que não foi compreendido.',
'Não force a voz nem associe fala alta a segurança. O objetivo é ser compreendido respeitando o conforto de quem fala e escuta.',
'Separei as ideias com pausas?|Destaquei as informações essenciais?|Consigo explicar um ajuste feito após o feedback?',
'Uma pausa bem colocada pode esclarecer mais que muitas palavras.')

aula('Reunião que termina em decisão', 2,
'Reunir pessoas não garante um acordo. Uma reunião precisa de objetivo, turnos de participação e um registro que transforme a conversa em responsabilidades.',
'Pauta::Defina o problema e a decisão que precisa ser tomada.|Contribuições::Ouça propostas, justificativas e restrições.|Decisão::Escolha uma alternativa viável e registre como foi escolhida.|Acompanhamento::Defina ação, responsável e prazo.',
'Mediador::Organiza a conversa e favorece a participação de todos.|Secretário::Registra propostas, decisão, responsáveis e prazos.|Participantes::Escutam, fazem perguntas e justificam sugestões sem atacar colegas.',
'Depois a gente vê quem faz. Está todo mundo de acordo, né?',
'O grupo escolheu o quiz. Ana prepara as perguntas até terça-feira e Rui organiza os materiais até quarta. O registro será lido para confirmação.',
'Comparar propostas antes de escolher',
'Tempo: a atividade cabe nos 40 minutos disponíveis?|Espaço: pode acontecer em uma única sala?|Recursos: utiliza papel, canetas e quadro?|Pessoas: as tarefas podem ser distribuídas entre os integrantes?|Registro: qualquer participante consegue explicar o acordo final?',
'Participar não é falar mais que os outros. Perguntas, sínteses e contribuições escritas também ajudam o grupo a decidir.',
'A decisão responde à pauta?|Cada tarefa tem responsável e prazo?|O grupo confirmou o registro?',
'Um acordo compreendido por todos vale mais que uma conversa longa.')

aula('Atendimento começa pela escuta', 2,
'Atender é compreender uma necessidade e oferecer informação ou encaminhamento adequado. Empatia aparece nas escolhas de palavras e na atenção ao que a pessoa diz.',
'Escute::Deixe a pessoa explicar a situação.|Confirme::Reformule a dúvida para verificar entendimento.|Informe::Apresente apenas o que está confirmado.|Encaminhe::Indique a próxima ação e confira se ajudou.',
'Escuta ativa::Preste atenção ao pedido e evite preparar uma resposta antes de compreender.|Pergunta útil::Pergunte o que ajuda a esclarecer, sem transformar a conversa em interrogatório.|Limite responsável::Se não souber, busque quem pode informar; não invente uma solução.',
'O problema não é meu. Procura a sala lá.',
'Você veio para a oficina das 14h, certo? Ela foi transferida para a sala 5 e começará às 14h15. Posso explicar o caminho.',
'O que registrar após atender',
'Dúvida: a visitante não encontrou o local da oficina.|Fato confirmado: mudança da sala 3 para a sala 5.|Orientação: novo início às 14h15 e caminho até a sala.|Pendência: o cartaz antigo precisa ser atualizado.|Retorno: confirmar se a orientação resolveu a dúvida.',
'Acolher uma reclamação não exige prometer algo que você não pode cumprir. Seja claro sobre o que sabe e o que ainda precisa confirmar.',
'Confirmei o que a pessoa precisava?|Usei informações corretas?|Expliquei o próximo passo?',
'Antes de responder, descubra qual é a necessidade.')

aula('Entrevista: experiência com evidência', 2,
'Em uma entrevista educativa, exemplos concretos mostram como você aprende, colabora e resolve dificuldades. Experiências escolares também revelam habilidades.',
'Prepare::Entenda a função e as responsabilidades.|Situação::Conte brevemente o contexto de uma experiência.|Ação + resultado::Explique sua contribuição e o que aconteceu.|Aprendizado::Mostre o que faria novamente ou melhoraria.',
'Exemplo verdadeiro::Escolha uma situação que conhece; não invente trabalho ou responsabilidade.|Resposta específica::Evite “sou bom em tudo”. Explique uma ação que o ouvinte possa compreender.|Pergunta ao entrevistador::Pergunte sobre tarefas, orientação ou organização da equipe.',
'Sou muito responsável, faço tudo e nunca erro.',
'Em um trabalho de grupo, organizei uma lista de tarefas e acompanhei os prazos. Entregamos o cartaz no dia combinado e aprendi a pedir ajuda antes de atrasar.',
'Três perguntas para preparar',
'Por que quer participar? Relacione seu interesse à atividade.|Como colaborou com um grupo? Apresente situação, ação e resultado.|O que faz quando não sabe? Explique como busca orientação.|Pergunta sua: “Como os integrantes serão orientados antes do evento?”.',
'Não é necessário compartilhar informações íntimas. Roupa, aparência ou contato visual não comprovam competência.',
'Meu exemplo é verdadeiro?|Expliquei o que eu fiz?|Preparei uma pergunta pertinente?',
'Mostre uma habilidade contando uma ação concreta.')

aula('Coesão: ideias que se conectam', 3,
'Um texto coerente mantém um sentido geral. A coesão aparece nas palavras e referências que ligam as partes. As duas ajudam o leitor a acompanhar o raciocínio.',
'Assunto::Apresente o tema e a finalidade.|Informações::Organize os dados de que o leitor precisa.|Relações::Use conectivos que expressem causa, tempo ou conclusão.|Revisão::Confira se as partes constroem uma mensagem única.',
'Coerência::As informações devem combinar entre si e com a finalidade do texto.|Coesão::Conectivos e referências estabelecem relações entre frases.|Parágrafo::Reúna frases ligadas por uma ideia central; inicie outro quando mudar o foco.',
'Teremos uma oficina. Assim. Copos. A turma vai. Por isso quarta-feira.',
'A turma participará de uma oficina sobre resíduos. Para reduzir o uso de copos descartáveis, cada participante deverá levar uma garrafa reutilizável.',
'Conectivo e relação de sentido',
'Porque: explica uma causa ou justificativa.|Por isso: apresenta uma consequência.|Depois: organiza a sequência de ações.|Porém: introduz contraste entre ideias.|Assim: pode indicar conclusão ou resultado, conforme a frase.',
'Acrescentar conectivos aleatórios não resolve um texto sem sequência lógica. Primeiro organize as ideias; depois escolha as ligações.',
'Consigo identificar o assunto central?|Os conectivos expressam a relação pretendida?|As informações se contradizem?',
'Cada frase deve ajudar o leitor a chegar à próxima ideia.')

aula('Revisão: clareza sem mudar os fatos', 3,
'Revisar é reler com uma finalidade. Primeiro confira sentido e informações; depois observe frases, concordância, pontuação e ortografia.',
'Sentido::O texto comunica o que precisava comunicar?|Dados::Horários, nomes e quantidades continuam corretos?|Linguagem::Revise concordância, pontuação e escrita das palavras.|Versão final::Explique as alterações e releia o conjunto.',
'Concordância::Observe relações de singular e plural: “os alunos”, “a reunião acontecerá”.|Pontuação::Separe ideias e marque saudações para orientar a leitura.|Revisão consciente::Corretores podem sugerir mudanças, mas você precisa avaliar se preservam o sentido.',
'Prezados aluno a reunião dos representante aconteceram amanhã as 14h.',
'Prezados representantes, a reunião acontecerá amanhã, às 14h.',
'O que mudou e por quê?',
'“Representantes”: identifica o público e mantém o plural.|Vírgula após a saudação: separa o chamamento do restante.|“A reunião acontecerá”: verbo no singular e no futuro.|“Às 14h”: informa o horário com a escrita adequada.|Ponto final: encerra a informação de maneira clara.',
'Não transforme uma hipótese em fato durante a revisão. Corrigir a escrita não autoriza mudar local, prazo ou intenção do autor.',
'Preservei os dados do caso?|Consigo justificar minhas alterações?|O texto final ficou mais compreensível?',
'Revisar melhora a mensagem sem inventar outra história.')

aula('E-mail: pedido que permite resposta', 3,
'Um e-mail profissional precisa mostrar rapidamente quem escreve, por quê e qual resposta espera. O documento anexo deve complementar o pedido.',
'Assunto::Resuma a finalidade de forma específica.|Abertura::Cumprimente e situe o pedido.|Corpo::Informe itens, quantidades, motivo e prazo.|Fechamento::Mencione o anexo, agradeça e identifique a equipe.',
'Assunto útil::“Materiais para a oficina de sexta-feira” ajuda mais que “Urgente”.|Pedido completo::O destinatário precisa ter informações para autorizar, negar ou esclarecer.|Anexo legível::Use título, tabela consistente e nome de arquivo que identifique o conteúdo.',
'Oi, precisamos de coisas para sexta. Veja aí e responda.',
'Prezada coordenação, solicitamos materiais para a oficina de sexta-feira, às 14h, na biblioteca. A lista está anexa. Poderiam responder até quarta-feira, às 12h?',
'O e-mail e o anexo precisam combinar',
'Lista: 20 folhas A4, quatro cartolinas e duas caixas de canetas.|Finalidade: oficina de comunicação na biblioteca.|Prazo: resposta até quarta-feira às 12h.|Anexo: tabela com item, quantidade e uso.|Assinatura: nome fictício da equipe responsável.',
'Antes de enviar, confira destinatário e anexo. Nesta atividade, produzir apenas um rascunho: nenhum envio real é necessário.',
'O assunto identifica o pedido?|O prazo de resposta está explícito?|A lista anexa corresponde ao texto?',
'Um pedido bem escrito reduz a necessidade de novas perguntas.')

aula('Relatório: dos fatos às recomendações', 4,
'Relatar é organizar o que aconteceu para que outra pessoa compreenda resultados e tome decisões. Uma conclusão precisa de evidências e de limites claros.',
'Introdução::Qual atividade foi realizada e com qual objetivo?|Desenvolvimento::Quais fatos, ocorrências e resultados foram registrados?|Conclusão::O que os dados permitem afirmar?|Recomendações::Que ação pode melhorar a próxima experiência?',
'Fato::É uma informação registrada no caso, como o horário de início.|Hipótese::É uma explicação possível que ainda precisa ser investigada.|Recomendação::É uma proposta de ação ligada a uma evidência, não um palpite isolado.',
'Todo mundo adorou e a caixa atrasada causou todos os problemas.',
'Dos 18 formulários recebidos, 12 avaliaram a oficina como ótima, quatro como boa e dois pediram instruções mais claras. A causa do atraso não foi confirmada.',
'Números com contexto',
'24 inscritos: pessoas previstas, não presença confirmada.|20 participantes: comparecimento registrado.|18 formulários: base disponível para analisar as respostas.|14h10: início real, dez minutos após o horário previsto.|Recomendação: tornar as instruções mais claras, considerando os dois pedidos registrados.',
'A presença de dois acontecimentos juntos não prova que um causou o outro. Declare o que ainda não sabe.',
'Indiquei a origem e o alcance dos dados?|Separei fato de hipótese?|Cada recomendação tem uma justificativa?',
'Uma conclusão confiável respeita os limites das evidências.')

aula('Memorando: informação que vira ação', 4,
'O memorando organiza uma comunicação interna. Seu valor está em deixar claro quem precisa fazer o quê, por qual motivo e dentro de qual prazo.',
'Identificação::Registre remetente, destinatário e data.|Assunto::Destaque a finalidade em poucas palavras.|Solicitação::Explique a ação e as informações necessárias.|Prazo + local::Indique quando e onde a entrega deve ocorrer.',
'Concisão::Elimine repetições sem retirar informações necessárias.|Público interno::Ajuste o texto a pessoas que participam da mesma organização.|Finalidade::Um memorando solicita ou informa; um relatório registra e analisa acontecimentos.',
'Pedimos encarecidamente que, quando for possível, entreguem aquela lista.',
'As equipes devem entregar a lista final de materiais na biblioteca até terça-feira, às 16h, com nome da equipe, itens e quantidades.',
'Enxugar sem perder sentido',
'Mantenha: quem deve entregar e qual é o documento.|Mantenha: prazo, local e campos obrigatórios.|Explique: a lista ajudará a organizar os recursos da feira.|Retire: repetições de “solicitamos” e expressões sem função.|Lembrete: uma versão curta ainda precisa indicar a ação e o prazo.',
'Uma mensagem curta demais pode gerar retrabalho. Objetividade é oferecer o necessário, não simplesmente usar poucas palavras.',
'O destinatário está identificado?|A ação é executável?|O prazo e o local estão visíveis?',
'Clareza de ação é o centro de um bom memorando.')

aula('Procedimento: uma ação por passo', 4,
'Um procedimento descreve como executar uma tarefa em sequência. Ele precisa funcionar para quem não participou de sua elaboração.',
'Prepare::Identifique materiais, autorização e condições iniciais.|Execute::Organize as ações em ordem e com verbos claros.|Registre::Indique quais dados precisam ser preenchidos.|Encerre::Explique devolução, confirmação e tratamento de ocorrências.',
'Verbo de ação::Prefira “registre a quantidade” a “faça a parte da quantidade”.|Referência precisa::Informe onde está a ficha e qual campo deve ser usado.|Exceção::Explique o encaminhamento quando faltar material ou houver dano.',
'Pegue ali, anote as coisas e depois devolva direito.',
'Após a autorização do professor, registre nome, turma, material, quantidade e data de retirada na ficha que fica sobre a mesa dele.',
'O leitor consegue executar?',
'Início: o empréstimo depende da autorização do professor.|Retirada: identificar o material e preencher os campos da ficha.|Uso: manter a quantidade registrada como referência.|Devolução: registrar a data e comunicar diferenças.|Ocorrência: avisar o professor antes de prosseguir se algo estiver ausente ou danificado.',
'Não esconda duas tarefas diferentes dentro de um passo muito longo. Também não repita ações que já foram concluídas.',
'A sequência tem início e fim?|Cada passo tem uma ação principal?|Há orientação para situações fora do previsto?',
'Instrução clara é aquela que outra pessoa consegue seguir.')

aula('Canal certo, mensagem acessível', 5,
'A melhor ferramenta depende da necessidade e do público. Urgência, registro, colaboração e acesso ajudam a escolher como comunicar.',
'Necessidade::É preciso avisar, solicitar, conversar ou produzir junto?|Público::Quem recebe tem acesso ao canal escolhido?|Escolha::Compare rapidez, registro e forma de participação.|Acompanhamento::Confirme o recebimento e mantenha uma versão confiável.',
'Chat::Favorece avisos rápidos, mas informações podem se perder na conversa.|E-mail::Organiza pedidos e registros com assunto, destinatário e anexos.|Documento compartilhado::Permite colaboração, comentários e organização de versões.',
'Vamos mandar tudo em áudio no grupo, inclusive os documentos finais.',
'O aviso urgente pode ir ao grupo; o pedido de autorização precisa de registro; o relatório pode ser escrito em documento compartilhado.',
'Necessidade → possibilidade de canal',
'Mudança urgente de sala → chat e aviso físico, conforme acesso.|Solicitação à coordenação → e-mail ou canal institucional de registro.|Relatório coletivo → documento compartilhado com papéis definidos.|Convidado distante → videoconferência ou outro meio acessível.|Orientação permanente → espaço interno de avisos, com versão atualizada.',
'As opções não são regras universais. Um canal só ajuda se o público consegue acessá-lo e sabe onde procurar a informação.',
'A escolha considera o acesso do público?|Está definido quem lê, comenta ou edita?|Existe uma versão final identificada?',
'A ferramenta deve servir à comunicação, e não o contrário.')

aula('Segurança: pare, confirme, proteja', 5,
'Mensagens podem tentar apressar decisões e obter informações que não deveriam ser compartilhadas. Antes de agir, examine o pedido e confirme por um canal conhecido.',
'Pare::Desconfie de pressão para agir sem pensar.|Observe::O que está sendo solicitado? Senha, código, dados pessoais?|Confirme::Use um contato oficial já conhecido, fora da mensagem suspeita.|Proteja::Não compartilhe segredos; peça ajuda quando necessário.',
'Senha e código::São recursos de acesso. Não devem ser enviados a quem solicita por mensagem.|Confidencialidade::Nem toda informação da turma deve ser colocada em mural ou grupo aberto.|Recuperação::Se houve exposição, avise um responsável e procure suporte pelo caminho oficial.',
'Sua inscrição acaba em dez minutos! Envie senha e código agora.',
'Vou confirmar a situação no canal oficial que já conheço. Não enviarei senha ou código por esta mensagem.',
'Camadas de cuidado',
'Contas: use senhas distintas e proteção adicional quando disponível.|Informações: compartilhe apenas com quem precisa recebê-las.|Pedidos: confira propósito e legitimidade antes de responder.|Incidentes: busque ajuda sem esconder o ocorrido ou culpar a vítima.|Atividade: utilize somente mensagens e dados fictícios.',
'Um texto bem escrito também pode ser enganoso. Erros de português não são o único sinal de atenção, e aparência profissional não comprova autenticidade.',
'Confirmei fora do contato suspeito?|Evitei compartilhar senha e código?|Se houve exposição, sei a quem pedir ajuda?',
'Pressa imposta pela mensagem é motivo para parar e confirmar.')

aula('Etiqueta digital: firmeza com respeito', 5,
'Na comunicação escrita, o leitor não acompanha todos os sinais da conversa presencial. Pedidos específicos, contexto e prazos combinados reduzem conflitos.',
'Identifique::Qual necessidade precisa ser resolvida?|Escreva::Fale sobre a tarefa e descreva o pedido.|Combine::Negocie prazo e forma de retorno.|Revise::Leia pensando em como o colega pode compreender o tom.',
'Tom::Maiúsculas, ironia e acusações podem dificultar o diálogo.|Disponibilidade::Estar em um grupo não significa estar disponível o tempo inteiro.|Versão::Diga qual arquivo alterou e o que mudou para evitar retrabalho.',
'NINGUÉM FAZ NADA!!! ME RESPONDE AGORA!',
'Ainda faltam a introdução e a conclusão. Quem pode assumir cada parte? Podemos combinar a entrega até amanhã, às 15h?',
'Um acordo de equipe inclui',
'Horário: quando é adequado enviar pedidos e esperar resposta.|Prazo: em quanto tempo a equipe costuma retornar.|Feedback: comentários sobre o trabalho, sem ridicularizar pessoas.|Arquivos: nome e versão identificados ao comunicar alterações.|Conflitos: esclarecer por conversa respeitosa quando o texto gerar dúvida.',
'Emojis podem ajudar ou confundir, dependendo do público. Não use humor para desqualificar uma dificuldade do colega.',
'Descrevi a tarefa em vez de atacar alguém?|O prazo foi combinado?|Indiquei a mudança e o arquivo correto?',
'Um pedido respeitoso pode ser direto e específico.')

aula('Linguagem corporal: contexto primeiro', 6,
'Postura, gestos e distância participam da comunicação, mas não têm um significado único. Observar é descrever o que aconteceu; interpretar é propor uma explicação.',
'Observe::Descreva o comportamento sem atribuir intenção.|Considere::Levante mais de uma explicação possível.|Pergunte::Busque compreender o contexto com respeito.|Adapte::Ajuste a interação para favorecer conforto e entendimento.',
'Observação::“O estudante olhou para o roteiro” pode ser descrito diretamente.|Interpretação::“Ele não estudou” é uma conclusão que o gesto não comprova.|Diversidade::Conforto, cultura, deficiência e modos de expressão influenciam o comportamento.',
'Ele cruzou os braços, então não gostou da apresentação.',
'Ele cruzou os braços. Pode estar com frio, concentrado ou desconfortável. Preciso de contexto antes de concluir algo.',
'Três observações, várias hipóteses',
'Braços cruzados → frio, posição confortável ou outra razão.|Olhar para o roteiro → apoio à memória, leitura ou concentração.|Afastar-se → necessidade de espaço, dificuldade de ouvir ou outro motivo.|Pergunta possível → “Você está confortável aí ou prefere outro lugar?”.',
'Gestos isolados não comprovam mentira, competência ou interesse. Não transforme observações em diagnósticos.',
'Separei fato e interpretação?|Considerei mais de uma hipótese?|Respeitei espaço e formas de expressão?',
'Observe com atenção; interprete com cuidado.')

aula('Palavras, tom e gestos em harmonia', 6,
'O efeito de uma fala depende das palavras, de como são apresentadas e do contexto. Experimente recursos expressivos para tornar sua intenção mais compreensível.',
'Intenção::O que você quer comunicar: convite, dúvida ou orientação?|Palavras::Escolha uma formulação coerente com essa intenção.|Expressão::Ajuste pausa, volume e gestos opcionais.|Retorno::Pergunte como a fala foi entendida e faça ajustes.',
'Coerência::Um convite deve oferecer espaço para participação, também no jeito de falar.|Ênfase::Destacar palavras diferentes pode alterar o sentido percebido.|Conforto::Expressividade não exige gesticular muito, ficar em pé ou encarar o público.',
'“Podemos conversar sobre essa ideia?” dito com pressa, interrupção e tom de cobrança.',
'“Podemos conversar / sobre essa ideia?” dito com pausa e espaço para a outra pessoa responder.',
'Convite de um minuto',
'Objetivo: convidar a turma a participar da oficina de comunicação.|Informação: sexta-feira, às 14h, na biblioteca.|Ação: visitar a oficina e participar do quiz.|Expressão: destacar horário e local, usando gestos apenas se ajudarem.|Confirmação: pedir ao colega que conte o que entendeu do convite.',
'Pessoas podem perceber tons de maneiras diferentes. Escute o retorno em vez de presumir que sua intenção foi óbvia.',
'Minha fala combina com a intenção?|As informações principais se destacam?|Escutei como o público percebeu a mensagem?',
'A intenção ganha clareza quando palavras e expressão colaboram.')

aula('Projeto: um kit, uma mensagem coerente', 7,
'Integrar os módulos significa usar diferentes formas de comunicação para resolver a mesma necessidade. Todas as peças do kit precisam contar a mesma história.',
'Entenda::Identifique público, objetivo, local, horário e restrições.|Distribua::Combine responsabilidades sem perder a visão do conjunto.|Produza::Crie as peças e compartilhe decisões entre os integrantes.|Integre::Compare dados, revise e apresente a solução.',
'Unidade::Data, local e orientações precisam ser iguais em todas as peças.|Adequação::O aviso convida; o e-mail solicita; o procedimento orienta.|Colaboração::Cada integrante deve conseguir explicar sua contribuição e uma decisão do grupo.',
'O aviso informa biblioteca às 14h; o e-mail cita sala 3 às 15h.',
'O kit inteiro informa oficina de sexta-feira, das 14h às 15h, na biblioteca, destinada a 20 estudantes convidados.',
'As seis peças do kit',
'Aviso: público, finalidade, dia, local e horário.|E-mail: pedido de 20 folhas A4 e quatro cartolinas; resposta até quarta às 12h.|Procedimento: orientar chegada e organização dos grupos.|Plano de canais: destinatários, justificativa e cuidados com dados.|Fala: até dois minutos explicando uma escolha e demonstrando o convite.|Registro individual: o que produziu, revisou e aprendeu.',
'Produzir peças separadas sem comparar os dados pode gerar contradições. Reserve tempo para a revisão do conjunto.',
'Todos os dados do evento combinam?|Os gêneros cumprem suas finalidades?|Cada integrante registrou sua contribuição?',
'Um kit coerente transforma várias peças em uma orientação única.')

aula('Avaliar é demonstrar o que aprendeu', 7,
'Uma situação nova mostra se você consegue transferir o aprendizado. Explique decisões, use evidências do portfólio e identifique um próximo passo concreto.',
'Leia::Separe dados confirmados de expressões vagas.|Resolva::Produza respostas adequadas ao caso apresentado.|Justifique::Explique problemas, canais e sugestões de melhoria.|Reflita::Relacione seu avanço a uma evidência e a uma meta.',
'Transferência::Aplique os conceitos a outro contexto, sem copiar uma resposta que não combina com ele.|Evidência::Cite um texto, uma revisão ou uma ação observável do seu portfólio.|Meta::Escolha uma melhoria específica que possa praticar na próxima tarefa.',
'Aprendi tudo. Preciso melhorar tudo.',
'Passei a incluir o prazo nos meus pedidos. O e-mail da aula 11 mostra essa mudança. Na próxima produção, vou conferir também o anexo.',
'Como usar os 30 minutos',
'3 minutos: ler as orientações e os critérios.|20 minutos: responder às quatro questões individuais.|5 minutos: registrar avanço, evidência e meta.|2 minutos: organizar e entregar o material.|Foco: clareza, fidelidade aos dados, justificativa e feedback respeitoso.',
'Autoavaliação não é se rotular como “bom” ou “ruim”. Identifique uma evidência real do que já faz e um passo para continuar aprendendo.',
'Respondi ao caso apresentado?|Justifiquei minhas escolhas?|Minha meta é específica e possível?',
'O aprendizado fica visível nas escolhas que você consegue explicar.')

MODULES = {1: 'Fundamentos da Comunicação', 2: 'Comunicação Oral', 3: 'Comunicação Escrita', 4: 'Redação Técnica', 5: 'Ferramentas Digitais', 6: 'Comunicação Não-Verbal', 7: 'Integração e Avaliação'}
ICONS = {
1: '<path d="M8 9h32v23H22l-9 8v-8H8z"/><path d="M15 17h18M15 24h13"/>',
2: '<rect x="19" y="5" width="10" height="24" rx="5"/><path d="M13 23a11 11 0 0 0 22 0M24 34v9M16 43h16"/>',
3: '<path d="m9 36-2 8 8-2L39 18 33 12zM28 17l6 6M7 8h16M7 15h12M7 22h7"/>',
4: '<path d="M12 5h18l8 8v30H12zM30 5v10h8M18 22h14M18 29h14M18 36h10"/>',
5: '<rect x="5" y="7" width="38" height="27" rx="3"/><path d="M24 34v8M15 42h18M11 14h26M11 21h11"/>',
6: '<path d="M3 24s8-13 21-13 21 13 21 13-8 13-21 13S3 24 3 24z"/><circle cx="24" cy="24" r="6"/>',
7: '<path d="m5 13 19-9 19 9-19 9zM5 24l19 9 19-9M5 35l19 9 19-9"/>'}

EXTRA_CSS = r'''
:root{--fs-body:15px;--fs-mini:13px;--fs-sec:17px;--fs-h2:16px;--fs-h1:44px;--c-laranja:#a64b00;--c-amarelo:#806000;--exemplo:#806000}
body{padding:24px 16px 44px}.info-page{max-width:1180px}.info-header{padding:30px;align-items:flex-start}.info-header__title{text-transform:none;letter-spacing:-1px;line-height:1.08}.info-header__sub{color:#f7d566}.info-header__icon{width:68px;height:68px;border-radius:16px;color:#0b2c5c}.info-header__icon svg{width:46px;height:46px}.kicker{font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#dce8ff;margin-bottom:10px;font-weight:700}.header-number{font-size:60px;font-weight:900;color:#f7d566;line-height:1}.info-header__text{min-width:0}.lead-row{padding:24px 30px;background:#f0f5fb;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}.lead-row p{max-width:850px;font-size:17px}.duration{border-left:3px solid #d4af37;padding-left:18px;white-space:nowrap}.duration strong{display:block;font-size:27px;color:#0b2c5c}.info-grid{padding:22px 24px 0;gap:18px}.info-section{padding:18px;box-shadow:none}.info-section__title{font-size:17px;text-transform:none}.info-section__num{font-size:14px;width:28px;height:28px}.info-compare__col{font-size:15px;padding:16px}.info-compare__label{font-size:12px;text-transform:uppercase}.info-compare{gap:12px}.info-footer{margin:20px 24px 24px}.info-footer__text{font-size:18px}.info-footer__label{font-size:11px}.info-list li{margin:10px 0;padding-left:22px;line-height:1.55}.info-list li::before{top:9px}.info-list--check li::before{top:1px}.concepts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.concept{padding:15px;border:1px solid #dce5ec;border-radius:8px;background:#f8fafc}.concept h3{font-size:16px;color:#0b2c5c;margin-bottom:7px}.flow{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;list-style:none;padding:0}.flow li{position:relative;padding:16px 13px;background:#eaf3ff;border-top:4px solid #1565c0;border-radius:8px}.flow li:not(:last-child)::after{content:'→';position:absolute;right:-20px;top:42%;font-size:24px;color:#1565c0}.flow strong{display:block;color:#0b2c5c;font-size:16px;margin:8px 0}.flow small{display:inline-block;background:#1565c0;color:#fff;border-radius:50%;width:25px;height:25px;text-align:center;line-height:25px;font-weight:700}.flow p{font-size:14px}.caution{border-left:4px solid #a64b00;background:#fff4e5;padding:14px 16px;margin-top:15px;border-radius:0 8px 8px 0}.caution strong{display:block;color:#854000;margin-bottom:4px}.toolbar{max-width:1180px;margin:0 auto 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}.toolbar a,.toolbar button{font:600 14px 'Segoe UI',Arial,sans-serif;border:1px solid #bcc9d9;border-radius:8px;background:#fff;padding:9px 14px;color:#12365d;text-decoration:none;cursor:pointer}.toolbar button{margin-left:auto;background:#0b2c5c;color:#fff}.toolbar a:hover{background:#e8f1ff}a:focus-visible,button:focus-visible{outline:3px solid #a64b00;outline-offset:3px}.skip{position:absolute;left:-9999px}.skip:focus{left:15px;top:15px;background:white;padding:12px;z-index:5}.activity{margin:12px 24px 0;border:2px solid #0b2c5c;border-radius:12px;overflow:hidden}.activity-head{background:#0b2c5c;color:#fff;padding:20px 24px}.activity-head p{color:#f7d566;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase}.activity-head h2{font-size:27px;line-height:1.2;margin-top:5px}.activity-body{padding:24px}.activity-body p{margin:10px 0;line-height:1.65}.capacity{background:#f0f5fb;padding:14px 16px;border-radius:8px}.activity hr{border:0;border-top:1px solid black;margin:18px 0}.label{color:#0b2c5c;font-weight:800}.steps{counter-reset:step;list-style:none;margin:14px 0;padding:0}.steps>li{counter-increment:step;position:relative;padding:0 0 16px 43px;min-height:40px;border-left:2px solid #d8e2ee;margin-left:15px}.steps>li::before{content:counter(step);position:absolute;left:-16px;top:4px;width:30px;height:30px;text-align:center;line-height:30px;background:#edf3fb;border:1px solid #b3c8e3;border-radius:50%;color:#0b2c5c;font-weight:800}.steps>li:last-child{border-left-color:transparent}.steps ul{padding-left:22px}.steps ul li{margin:9px 0}.delivery{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0}.delivery>div{background:#f0f5fb;padding:16px;border-radius:8px}.delivery h3{font-size:16px;color:#0b2c5c}.response{margin-top:22px;border-top:1px solid #c4d1e0;padding-top:16px}.answer-lines{height:108px;background:repeating-linear-gradient(to bottom,transparent 0,transparent 34px,#a8b5c4 35px,transparent 36px)}.identity{display:flex;gap:20px;flex-wrap:wrap;margin:14px 0}.identity span{flex:1 1 190px;border-bottom:1px solid #8b98a9;padding-bottom:8px}.activity-tail{margin:18px 0 0;font-size:13px;color:#455568}.source-note{padding:20px 28px;color:#526273;font-size:12px}.source-note a{color:#164c87}.visual{margin:16px 0 3px;padding:16px;background:#f6f9fc;border-radius:8px}.visual figcaption{font-size:13px;font-weight:700;color:#344e6b;margin-bottom:12px}.bar-row{display:grid;grid-template-columns:145px 1fr 42px;gap:12px;align-items:center;margin:10px 0;font-size:13px}.bar-track{background:#dce5ee;border-radius:5px;overflow:hidden;height:16px}.bar-fill{height:100%;background:#1565c0}.bar-row:nth-child(3n) .bar-fill{background:#087f76}.bar-row:nth-child(3n + 1) .bar-fill{background:#7850a8}.time-strip{display:flex;min-height:66px;gap:4px;flex-wrap:wrap}.time-strip>div{background:#0b2c5c;color:#fff;padding:12px;border-radius:5px;flex-basis:90px;min-width:0}.time-strip>div:nth-child(even){background:#116b70}.time-strip strong{display:block;font-size:20px}.time-strip span{font-size:12px}.index-intro{padding:30px}.index-intro h2{font-size:25px;color:#0b2c5c;margin-bottom:10px}.index-module{padding:5px 26px 28px}.index-module h2{font-size:23px;margin:16px 0;color:#0b2c5c}.index-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.lesson-card{display:block;border:1px solid #d6e0eb;border-top:4px solid #1565c0;border-radius:9px;padding:18px;color:#173957;text-decoration:none;background:#fafcfe}.lesson-card:hover{background:#eaf3ff}.lesson-card strong{display:block;font-size:19px;line-height:1.25;margin:9px 0}.lesson-card small{font-size:12px;color:#45617e;letter-spacing:.5px}.lesson-card p{font-size:14px}.index-note{padding:18px;background:#f0f5fb;border-left:4px solid #d4af37;border-radius:4px;margin-top:16px}.student-tip{font-size:13px;color:#455568;margin-top:16px}.rubric{width:100%;border-collapse:collapse;margin-top:12px}.rubric th,.rubric td{border:1px solid #c5d3e2;padding:9px;text-align:left;font-size:14px}.rubric th{background:#e9f1fa}.flow li,.concept,.info-compare__col,.bar-row{break-inside:avoid}
@media(max-width:900px){.col-6,.col-8,.col-4{grid-column:span 12}.flow{grid-template-columns:repeat(2,1fr)}.flow li:nth-child(2)::after{display:none}.concepts{grid-template-columns:1fr}.index-cards{grid-template-columns:repeat(2,1fr)}.header-number{font-size:42px}}
@media(max-width:600px){body{padding:10px 7px 24px}.info-header{padding:22px 18px;flex-wrap:wrap}.info-header__text{text-align:left;flex-basis:calc(100% - 100px)}.info-header__title{font-size:31px}.info-header__icon{width:54px;height:54px}.info-header__icon svg{width:38px;height:38px}.header-number{display:none}.lead-row{grid-template-columns:1fr;padding:20px;gap:14px}.duration{display:flex;align-items:center;gap:12px}.duration strong{font-size:22px}.info-grid{padding:16px 12px 0;display:grid;grid-template-columns:1fr}.flow{grid-template-columns:1fr;gap:20px}.flow li:not(:last-child)::after{display:block;content:'↓';top:auto;bottom:-23px;right:50%;font-size:20px}.info-compare,.delivery,.index-cards{grid-template-columns:1fr}.activity{margin:12px}.activity-body{padding:16px}.activity-head{padding:18px}.activity-head h2{font-size:23px}.info-footer{margin:16px 12px;align-items:flex-start;text-align:left}.index-module{padding:4px 18px 20px}.bar-row{grid-template-columns:105px 1fr 28px;gap:7px}.toolbar button{margin-left:0}.index-intro{padding:22px}.steps>li{padding-left:30px}}
@page{size:A4 portrait;margin:12mm}
@media print{body{padding:0;background:#fff;font-size:10pt}.toolbar,.skip{display:none!important}.info-page{max-width:none;overflow:visible;box-shadow:none;border-radius:0}.info-header{padding:16px;display:flex;flex-direction:row}.info-header__title{font-size:27pt}.info-header__sub{font-size:10pt}.header-number{display:block;font-size:40pt}.info-header__icon{width:48px;height:48px}.kicker{font-size:8pt}.lead-row{padding:14px;grid-template-columns:1fr auto;gap:15px}.lead-row p{font-size:11pt}.duration strong{font-size:19pt}.info-grid{display:block;padding:0}.info-section{margin:12px 0;padding:13px;break-inside:avoid;page-break-inside:avoid}.info-section__title{font-size:13pt}.info-section__body,.info-list li,.info-compare__col,.flow p{font-size:10pt}.flow{grid-template-columns:repeat(4,1fr);gap:15px}.flow strong{font-size:10pt}.flow li{padding:10px}.flow li:not(:last-child)::after{content:'→';right:-14px;top:44%;bottom:auto;font-size:16px;display:block}.concepts{grid-template-columns:repeat(3,1fr);gap:10px}.concept{padding:10px}.concept h3{font-size:11pt}.info-compare{grid-template-columns:1fr 1fr}.info-footer{margin:14px 0;padding:14px;flex-direction:row;align-items:center;text-align:left;break-inside:avoid}.info-footer__text{font-size:12pt}.activity{break-before:page;page-break-before:always;margin:0;border-width:1px;overflow:visible}.activity-head{padding:15px;break-after:avoid}.activity-head h2{font-size:19pt}.activity-body{padding:16px;font-size:10pt}.activity-body p{line-height:1.45}.steps>li{break-inside:avoid;padding-bottom:9px}.delivery{grid-template-columns:1fr 1fr;break-inside:avoid}.response{break-inside:avoid}.source-note{padding:12px 0;font-size:8pt}.index-cards{grid-template-columns:repeat(2,1fr)}.lesson-card{break-inside:avoid}.info-header,.activity-head,.info-footer,.flow li,.time-strip>div,.bar-fill,.info-section,.concept,.info-compare__col{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
'''

def inline(text):
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', escape(text.strip()))

def field(block, name):
    match = re.search(r'^\*\*' + re.escape(name) + r':\*\*\s*(.*)$', block, re.M)
    return match.group(1).strip() if match else ''

def list_html(items, cls='info-list'):
    return '<ul class="' + cls + '">' + ''.join('<li>' + inline(x) + '</li>' for x in items) + '</ul>'

def icon(module):
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[module] + '</svg>'

def section(number, title, body, color, width=12):
    return f'<section class="info-section sec--{color} col-{width}"><div class="info-section__head"><span class="info-section__num" aria-hidden="true">{number}</span><h2 class="info-section__title">{escape(title)}</h2></div><div class="info-section__body">{body}</div></section>'

def bars(title, rows, total):
    body = ''.join(f'<div class="bar-row"><span>{escape(label)}</span><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:{value/total*100:.2f}%"></div></div><strong>{value}</strong></div>' for label,value in rows)
    return '<figure class="visual"><figcaption>' + escape(title) + '</figcaption>' + body + '</figure>'

def timeline(title, rows):
    body = ''.join(f'<div style="flex-grow:{value}"><strong>{value} {unit}</strong><span>{escape(label)}</span></div>' for label,value,unit in rows)
    return '<figure class="visual"><figcaption>' + escape(title) + '</figcaption><div class="time-strip">' + body + '</div></figure>'

def special_visual(number):
    if number == 4:
        return timeline('Roteiro sugerido · duração total: 2 minutos', [('Introdução',30,'s'),('Desenvolvimento',60,'s'),('Conclusão',30,'s')])
    if number == 12:
        return bars('Respostas do caso fictício · 18 formulários recebidos', [('Ótima',12),('Boa',4),('Pedem clareza',2)],18)
    if number == 20:
        return bars('Rubrica do projeto · máximo de 10 pontos; não são notas obtidas', [('Compreensão',3),('Aplicação',3),('Análise',2),('Comunicação',2)],3)
    if number == 21:
        return timeline('Distribuição dos 30 minutos da avaliação', [('Leitura',3,'min'),('Questões',20,'min'),('Autoavaliação',5,'min'),('Entrega',2,'min')])
    return ''

def activity(number, block, minutes):
    item_match = re.search(r'^\*\*ITEM \d+ — (.+?)\*\*', block, re.M)
    title = item_match.group(1) if item_match else LESSONS[number-1]['title']
    capacity = field(block,'CAPACIDADE')
    context = field(block,'Contexto')
    command = field(block,'Comando')
    resources = field(block,'Recursos e organização') or field(block,'Recursos')
    deliver = field(block,'Entrega')
    criteria = field(block,'Critérios')
    steps = []
    for line in block.splitlines():
        step = re.match(r'^\d+\.\s+(.*)',line)
        if step:
            steps.append([step.group(1), []])
        elif steps and re.match(r'^\s+- \*\*Questão',line):
            steps[-1][1].append(re.sub(r'^\s+-\s*','',line))
    steps_html = '<ol class="steps">' + ''.join('<li><p>' + inline(text) + '</p>' + (list_html(children) if children else '') + '</li>' for text,children in steps) + '</ol>'
    kits = ''
    if number == 20:
        kit = re.search(r'\*\*Entregas do kit:\*\*(.*?)\*\*Recursos',block,re.S)
        items = re.findall(r'^- (.+)',kit.group(1),re.M) if kit else []
        kits = '<h3>O que deve compor o kit</h3>' + list_html(items)
        deliver = 'Kit com aviso, e-mail, procedimento, plano de canais, apresentação e registro individual de contribuição.'
        criteria = 'Compreensão: 0–3; aplicação: 0–3; análise: 0–2; comunicação: 0–2. O professor considera as evidências do produto e da participação individual.'
    reflect_match = re.search(r'^\*\*Resposta/reflexão(?: individual)?:\*\*\s*(.*)',block,re.M)
    reflect = reflect_match.group(1) if reflect_match else 'Qual escolha nesta atividade você consegue explicar com um exemplo?'
    if number == 21:
        command = 'Responda individualmente às quatro questões do roteiro e complete a autoavaliação. Utilize os dados confirmados do caso. A pontuação total das questões é de 10 pontos.'
    duration_note = 'O roteiro distribui os ' + minutes + ' minutos da aula inteira, incluindo estudo, prática e fechamento. Não somar esse tempo novamente.'
    return f'''<section class="activity" id="atividade" aria-labelledby="atividade-titulo">
<div class="activity-head"><p>Agora é sua vez · atividade {number:02d}</p><h2 id="atividade-titulo">{escape(title)}</h2></div>
<div class="activity-body"><div class="identity"><span>Nome:</span><span>Turma:</span><span>Data:</span></div>
<p class="capacity"><span class="label">CAPACIDADE:</span> {inline(capacity)}</p>
<hr><p><span class="label">Contexto:</span> {inline(context)}</p>
<p><span class="label">Comando:</span> {inline(command)}</p>
<p><span class="label">Materiais e organização:</span> {inline(resources)}</p>
{kits}<h3>Roteiro da aula</h3><p class="student-tip">{duration_note}</p>{steps_html}
<div class="delivery"><div><h3>Entrega</h3><p>{inline(deliver)}</p></div><div><h3>Critérios de avaliação</h3><p>{inline(criteria)}</p></div></div>
<div class="response"><h3>Resposta e reflexão</h3><p>{inline(reflect)}</p><div class="answer-lines" aria-hidden="true"></div><p class="student-tip">Use o caderno ou folhas adicionais para produzir a entrega completa.</p></div>
<p class="activity-tail">Adaptações: leitura compartilhada, roteiro de apoio, escrita ampliada ou comunicação alternativa. Combine com o professor uma forma de participação acessível. Nas tarefas digitais, uma simulação em papel pode representar os mesmos campos e decisões.</p>
</div></section>'''

def document(title, css, body):
    return '<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>' + escape(title) + '</title><style>' + css + '</style></head><body>' + body + '</body></html>\n'

def main():
    source = SOURCE.read_text(encoding='utf-8-sig')
    headings = list(re.finditer(r'^### Aula (\d{2}) — (.+?) \((\d+) minutos\)',source,re.M))
    blocks = {}
    for h in headings:
        next_section = re.search(r'^#{2,3} ',source[h.end():],re.M)
        end = h.end()+next_section.start() if next_section else len(source)
        blocks[int(h.group(1))] = (source[h.start():end], h.group(3))
    css = STYLE.read_text(encoding='utf-8-sig') + '\n' + EXTRA_CSS
    OUT.mkdir(parents=True,exist_ok=True)
    for number, lesson in enumerate(LESSONS,1):
        block, minutes = blocks[number]
        module = lesson['module']
        flow = '<ol class="flow">'
        for j,part in enumerate(lesson['flow'],1):
            label, detail = part.split('::',1)
            flow += f'<li><small aria-hidden="true">{j}</small><strong>{escape(label)}</strong><p>{escape(detail)}</p></li>'
        flow += '</ol>'
        concepts = '<div class="concepts">'
        for part in lesson['concepts']:
            label, detail = part.split('::',1)
            concepts += f'<div class="concept"><h3>{escape(label)}</h3><p>{escape(detail)}</p></div>'
        concepts += '</div>'
        comparison = '<div class="info-compare"><div class="info-compare__col info-compare__col--ruim"><span class="info-compare__label">Dificulta a compreensão</span>' + escape(lesson['before']) + '</div><div class="info-compare__col info-compare__col--bom"><span class="info-compare__label">Torna a mensagem mais clara</span>' + escape(lesson['after']) + '</div></div>'
        comparison += '<div class="caution"><strong>Ponto de atenção</strong>' + escape(lesson['caution']) + '</div>'
        previous = f'<a href="AULA-{number-1:02d}.html">← Aula anterior</a>' if number>1 else ''
        following = f'<a href="AULA-{number+1:02d}.html">Próxima aula →</a>' if number<21 else ''
        toolbar = f'<nav class="toolbar" aria-label="Navegação da coleção"><a href="index.html">Todas as aulas</a>{previous}{following}<a href="#atividade">Ir à atividade</a><button type="button" onclick="window.print()">Imprimir / salvar PDF</button></nav>'
        header = f'''<header class="info-header"><div class="info-header__icon">{icon(module)}</div><div class="info-header__text"><p class="kicker">SENAI · Rio do Sul Mais Tech · Aula {number:02d}</p><h1 class="info-header__title">{escape(lesson['title'])}</h1><p class="info-header__sub">{escape(MODULES[module])}</p></div><span class="header-number" aria-hidden="true">{number:02d}</span></header>'''
        intro = '<div class="lead-row"><p>' + escape(lesson['intro']) + f'</p><div class="duration"><strong>{minutes} min</strong><span>Duração da aula</span></div></div>'
        panels = section(1,'Veja o caminho da ideia',flow,'azul')
        panels += section(2,'Conceitos para compreender',concepts,'ciano')
        panels += section(3,'Compare e perceba a diferença',comparison,'roxo',6)
        panels += section(4,lesson['example_title'],list_html(lesson['example'])+special_visual(number),'verde',6)
        panels += section(5,'Antes de concluir, pergunte',list_html(lesson['checklist'],'info-list info-list--check'),'azul')
        rule = '<aside class="info-footer"><span class="info-footer__star" aria-hidden="true">★</span><div class="info-footer__main"><span class="info-footer__label">Ideia para levar com você</span><p class="info-footer__text">' + escape(lesson['rule']) + '</p></div></aside>'
        foot = '<footer class="source-note">Introdução à Comunicação Oral e Escrita · 8º e 9º anos · Material didático elaborado a partir da <a href="../../DOCUMENTACAO/EMENTA-CHALKIE-AI.md">ementa</a> e do <a href="../ATIVIDADES-DETALHADAS-POR-AULA-E-MODULO.md">caderno de atividades</a>. Casos fictícios. Coleção de 21 aulas · 2026.</footer>'
        body = '<a class="skip" href="#conteudo">Pular para o conteúdo</a>' + toolbar + '<main class="info-page" id="conteudo">' + header + intro + '<div class="info-grid">' + panels + '</div>' + rule + activity(number,block,minutes) + foot + '</main>'
        (OUT / f'AULA-{number:02d}.html').write_text(document(f'Aula {number:02d} — {lesson["title"]} | SENAI',css,body),encoding='utf-8')
    header = '<header class="info-header"><div class="info-header__icon">'+icon(1)+'</div><div class="info-header__text"><p class="kicker">SENAI · Rio do Sul Mais Tech</p><h1 class="info-header__title">Comunicação que faz sentido</h1><p class="info-header__sub">21 infográficos · conteúdo explicado + atividade ao final de cada aula</p></div></header>'
    index = '<main class="info-page">'+header+'<section class="index-intro"><h2>Escolha sua aula</h2><p>Explore conceitos, acompanhe o fluxo visual e observe os exemplos. Depois, realize a atividade no final de cada infográfico. Todos os arquivos funcionam sem conexão à internet.</p><div class="index-note"><strong>Como usar:</strong> abra uma aula e utilize “Imprimir / salvar PDF” para acessar a impressão do navegador. O infográfico e a atividade podem ocupar várias páginas para manter a legibilidade. A atividade começa em uma nova página de impressão; não há PDF previamente gerado.</div></section>'
    for module,name in MODULES.items():
        label = f'Módulo {module} · ' if module<7 else ''
        index += '<section class="index-module"><h2>'+escape(label+name)+'</h2><div class="index-cards">'
        for number,lesson in enumerate(LESSONS,1):
            if lesson['module'] != module:
                continue
            minutes = blocks[number][1]
            index += f'<a class="lesson-card" href="AULA-{number:02d}.html"><small>AULA {number:02d} · {minutes} MINUTOS</small><strong>{escape(lesson["title"])}</strong><p>{escape(lesson["rule"])}</p></a>'
        index += '</div></section>'
    index += '<footer class="source-note"><p><strong>Organização:</strong> seis módulos, projeto integrador e avaliação. A sequência de 21 aulas da ementa soma 25h30. As 7h30 complementares propostas no caderno de atividades não fazem parte desta coleção.</p><p>Fontes: <a href="../../DOCUMENTACAO/EMENTA-CHALKIE-AI.md">ementa</a> · <a href="../ATIVIDADES-DETALHADAS-POR-AULA-E-MODULO.md">atividades detalhadas</a>. Público: 8º e 9º anos. Versão: 21/09/2026.</p></footer></main>'
    (OUT/'index.html').write_text(document('21 infográficos — Comunicação Oral e Escrita | SENAI',css,index),encoding='utf-8')
    readme = '# Infográficos — Comunicação Oral e Escrita\n\nAbra `index.html` para acessar as 21 aulas. Cada `AULA-NN.html` é independente, com estilos e ícones vetoriais incorporados, conteúdo específico e atividade final.\n\nOs arquivos são HTML, não imagens PNG nem PDFs. A impressão é feita pelo próprio navegador; a atividade começa em nova página e o material pode ocupar várias páginas. Não depende de fontes externas, bibliotecas, servidor ou internet.\n\nFontes: `../../DOCUMENTACAO/EMENTA-CHALKIE-AI.md` e `../ATIVIDADES-DETALHADAS-POR-AULA-E-MODULO.md`. O padrão visual usa a folha de estilo do GERADOR-AULAS com adaptações de legibilidade.\n\nAs 21 aulas seguem 25h30 da sequência da ementa. As oficinas complementares do caderno não foram convertidas em aulas extras.\n\nProdução: `../../docs/gerar-infograficos-21-aulas.py`. O script lê a folha de estilo original no GERADOR-AULAS e regenera os HTML. Não foram executados testes nem verificações visuais, conforme instrução do usuário.\n'
    (OUT/'LEIA-ME.md').write_text(readme,encoding='utf-8')
    print('Produção concluída: 21 infográficos HTML, index.html e LEIA-ME.md em ' + str(OUT))

if __name__ == '__main__':
    main()
