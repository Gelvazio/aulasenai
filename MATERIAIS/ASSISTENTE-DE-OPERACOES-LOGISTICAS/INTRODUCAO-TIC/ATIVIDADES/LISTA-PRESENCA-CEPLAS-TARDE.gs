/**
 * Cria um Google Form para cada aluno da turma da tarde do CEPLAS informar o próprio celular.
 * Fonte dos nomes: ATIVIDADES/LISTA-PRESENCA.js (turma 135081 — AI AOPL 2026/2 V1).
 *
 * ⚠️ Dados pessoais de alunos menores (LGPD): este arquivo fica fora do Git (*.gs no .gitignore).
 * Compartilhe o link do formulário somente com a turma.
 *
 * Como usar: script.google.com → Novo projeto → colar este código → salvar →
 * executar criarFormularioCelularCeplasTarde → autorizar → ver os links no registro de execução.
 */

const TITULO_FORMULARIO = 'Celular dos alunos — CEPLAS Tarde (AI AOPL 2026/2 V1)';
const DESCRICAO_FORMULARIO =
  'Introdução a Tecnologia da Informação e Comunicação — Professor Gelvazio Camargo.\n' +
  'Turma 135081, 13:15 às 17:15, CEPLAS BARRAGEM.\n' +
  'Selecione o seu nome na lista e informe o SEU celular com DDD.';
const TITULO_PLANILHA = 'Respostas — Celular dos alunos CEPLAS Tarde';

const PERGUNTA_NOME = 'Seu nome';
const AJUDA_NOME = 'Procure o seu nome na lista.';
const PERGUNTA_CELULAR = 'Seu celular com DDD';
const AJUDA_CELULAR = 'Exemplo: (47) 99999-9999';
const PADRAO_CELULAR = '^\\(?[1-9][0-9]\\)? ?9?[0-9]{4}-?[0-9]{4}$';
const MENSAGEM_CELULAR_INVALIDO = 'Digite o celular com DDD, por exemplo: (47) 99999-9999';
const PERGUNTA_WHATSAPP = 'Este número tem WhatsApp?';
const OPCOES_WHATSAPP = ['Sim', 'Não'];
const MENSAGEM_CONFIRMACAO = 'Obrigado! Seu celular foi registrado.';

const ALUNOS_CEPLAS_TARDE = [
  'ADRIEL TORESANI STEFFENS',
  'BRAYAN ALBERTON',
  'BRENO HIROSHI RUIVO GERENT',
  'CALIEL DE SOUZA KNECHT',
  'DANIEL ZANQUETA DE OLIVEIRA',
  'EDERSON DE SOUZA FAUSTO',
  'EMANUELE BECKER DOS SANTOS',
  'IGOR CUSTODIO MACIEL',
  'JAYANE LUIZA GARCIA DE SOUZA ROCHA',
  'JOSIEL DE NASCIMENTO',
  'JUAN ANACLETO',
  'JULIA ELOISA MEIER',
  'LAURA CAROLINE DUFFECH SCUSEL',
  'MATEUS SAMUEL CONSTANTE',
  'NYCOLAS MARONITTI DA SILVA',
  'SABRINA FREITAS PANTOJA',
  'SOFIA TREVISANI BUNDE',
  'VITOR ALBERTON',
  'VITÓRIA RODRIGUES BARBINO',
  'JOAO VITOR DE OLIVEIRA FERMINO',
  'JOSE ANGELO',
  'VITORIA EMANUELLY',
  'DIOGO KUNTZ',
  'YANCIER ISAI LOPEZ MARTELO',
  'MARIA JULIA PEIXE',
  'JORGE GABRIEL SOARES TAVARES',
  'LOUSCLARITA D AOUT',
  'STEPHANIE JEANLOIS',
  'KAUAN MATIAS DE ANDRADE',
  'SAMUEL JESUS RYVAS MORENO',
  'SEBASTIAN FORBICI ANDRE',
  'SAMUEL SANTOS GATINHO',
  'JULIA CAROLINE PICKLER',
];

/**
 * Função principal: cria o formulário, a planilha de respostas e registra os links no log.
 * @returns {GoogleAppsScript.Forms.Form} Formulário criado.
 */
function criarFormularioCelularCeplasTarde() {
  const formulario = criarFormularioBase();
  adicionarPerguntaNome(formulario);
  adicionarPerguntaCelular(formulario);
  adicionarPerguntaWhatsapp(formulario);
  const planilha = vincularPlanilhaRespostas(formulario);
  registrarLinks(formulario, planilha);
  return formulario;
}

/**
 * Cria o formulário com título, descrição e configurações gerais.
 * @returns {GoogleAppsScript.Forms.Form} Formulário vazio configurado.
 */
function criarFormularioBase() {
  const formulario = FormApp.create(TITULO_FORMULARIO);
  formulario.setDescription(DESCRICAO_FORMULARIO);
  formulario.setConfirmationMessage(MENSAGEM_CONFIRMACAO);
  formulario.setAllowResponseEdits(true);
  formulario.setShowLinkToRespondAgain(false);
  return formulario;
}

/**
 * Adiciona a lista suspensa com o nome de cada aluno da turma.
 * @param {GoogleAppsScript.Forms.Form} formulario - Formulário em construção.
 * @returns {void}
 */
function adicionarPerguntaNome(formulario) {
  formulario
    .addListItem()
    .setTitle(PERGUNTA_NOME)
    .setHelpText(AJUDA_NOME)
    .setChoiceValues(ALUNOS_CEPLAS_TARDE)
    .setRequired(true);
}

/**
 * Adiciona o campo em que o aluno digita o próprio celular, com validação do formato.
 * @param {GoogleAppsScript.Forms.Form} formulario - Formulário em construção.
 * @returns {void}
 */
function adicionarPerguntaCelular(formulario) {
  const validacao = FormApp.createTextValidation()
    .requireTextMatchesPattern(PADRAO_CELULAR)
    .setHelpText(MENSAGEM_CELULAR_INVALIDO)
    .build();

  formulario
    .addTextItem()
    .setTitle(PERGUNTA_CELULAR)
    .setHelpText(AJUDA_CELULAR)
    .setValidation(validacao)
    .setRequired(true);
}

/**
 * Adiciona a pergunta sobre o número ter WhatsApp.
 * @param {GoogleAppsScript.Forms.Form} formulario - Formulário em construção.
 * @returns {void}
 */
function adicionarPerguntaWhatsapp(formulario) {
  formulario
    .addMultipleChoiceItem()
    .setTitle(PERGUNTA_WHATSAPP)
    .setChoiceValues(OPCOES_WHATSAPP)
    .setRequired(true);
}

/**
 * Cria a planilha de respostas e a define como destino do formulário.
 * @param {GoogleAppsScript.Forms.Form} formulario - Formulário criado.
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet} Planilha vinculada.
 */
function vincularPlanilhaRespostas(formulario) {
  const planilha = SpreadsheetApp.create(TITULO_PLANILHA);
  formulario.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());
  return planilha;
}

/**
 * Mostra no registro de execução os links do formulário e da planilha.
 * @param {GoogleAppsScript.Forms.Form} formulario - Formulário criado.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} planilha - Planilha de respostas.
 * @returns {void}
 */
function registrarLinks(formulario, planilha) {
  Logger.log('Link para os alunos: ' + formulario.getPublishedUrl());
  Logger.log('Link para editar o formulário: ' + formulario.getEditUrl());
  Logger.log('Planilha de respostas: ' + planilha.getUrl());
}
