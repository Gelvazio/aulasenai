// Modal "👥 Equipes" das páginas de atividades (aberto pelo menu: assets/js/menu-acao-equipes.js).
// Professor: escolhe a turma e faz o CRUD das equipes da matéria (equipe) e dos integrantes
// (equipe_membro: aluno, papel, tarefas, líder). Aluno: vê só a própria equipe.
// Tudo no banco (sem localStorage). Avisos e confirmações pelo popup (assets/js/popup.js).
// Depende de: assets/js/equipes-repositorio.js (repositório injetado) e assets/js/popup.js.

const TITULO_MODAL_EQUIPES = '👥 Equipes';
const CODIGO_DUPLICADO_EQUIPES = '23505';
const MSG_SEM_LOGIN_EQUIPES = 'Entre no sistema para ver as equipes.';
const MSG_SEM_MATERIA_EQUIPES = 'Não foi possível identificar a matéria desta pasta ' +
  '(nenhuma atividade dela está cadastrada no banco).';
const MSG_SEM_TURMA_EQUIPES = 'Nenhuma turma vinculada a você. Peça o vínculo ao administrador.';
const MSG_ESCOLHA_TURMA_EQUIPES = 'Selecione a turma para ver e montar as equipes.';
const MSG_SEM_EQUIPE_ALUNO = 'Você ainda não está em nenhuma equipe desta matéria.';
const MSG_DUPLICADO_EQUIPES = 'Já existe: o nome da equipe se repete ou o aluno já está em ' +
  'outra equipe desta turma e matéria.';
const MSG_ERRO_EQUIPES = 'Não foi possível concluir: ';
const MSG_NOME_OBRIGATORIO = 'Informe o nome da equipe.';
const MSG_MEMBRO_OBRIGATORIO = 'Escolha a equipe e o aluno.';

const estadoEquipes = {
  repositorio: null, prefixoPasta: '', papeis: [], materia: null, usuario: null,
  turmaCodigo: '', alunos: [], equipes: [], membros: [],
  editandoEquipeId: null, editandoMembroId: null,
};
let elementosEquipes = null;

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoEquipes(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Cria um botão com data-acao (os cliques são tratados por delegação).
 * @param {{texto: string, acao: string, classe?: string, id?: number}} opcoes - Dados do botão.
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoEquipes(opcoes) {
  const classe = 'equipes-btn ' + (opcoes.classe || '');
  const botao = criarElementoEquipes('button', classe, opcoes.texto);
  botao.type = 'button';
  botao.dataset.acao = opcoes.acao;
  if (opcoes.id !== undefined) botao.dataset.id = String(opcoes.id);
  return botao;
}

/**
 * Cria um campo de formulário com rótulo.
 * @param {string} rotulo - Texto do rótulo.
 * @param {HTMLElement} controle - Input, select ou textarea.
 * @returns {HTMLLabelElement} Campo.
 */
function criarCampoEquipes(rotulo, controle) {
  const campo = criarElementoEquipes('label', 'equipes-campo');
  campo.append(criarElementoEquipes('span', 'equipes-campo__rotulo', rotulo), controle);
  return campo;
}

/**
 * Cria um controle de formulário com nome.
 * @param {string} tag - input, select ou textarea.
 * @param {string} nome - Nome do campo.
 * @param {string} [tipo] - Tipo do input.
 * @returns {HTMLElement} Controle criado.
 */
function criarControleEquipes(tag, nome, tipo) {
  const controle = criarElementoEquipes(tag, 'equipes-controle');
  controle.name = nome;
  if (tipo) controle.type = tipo;
  return controle;
}

/**
 * Preenche um select com opções, mantendo um valor se ainda existir.
 * @param {HTMLSelectElement} select - Lista a preencher.
 * @param {{valor: string, texto: string}[]} opcoes - Opções (a primeira pode ser vazia).
 * @param {string} [valorAtual] - Valor a manter selecionado.
 * @returns {void}
 */
function preencherSelectEquipes(select, opcoes, valorAtual) {
  select.replaceChildren(...opcoes.map((opcao) => new Option(opcao.texto, opcao.valor)));
  const temValor = opcoes.some((opcao) => opcao.valor === valorAtual);
  select.value = temValor ? valorAtual : (opcoes[0]?.valor ?? '');
}

/**
 * Monta o formulário da equipe (nome e descrição).
 * @returns {HTMLFormElement} Formulário.
 */
function montarFormularioEquipe() {
  const formulario = criarElementoEquipes('form', 'equipes-form');
  formulario.dataset.formulario = 'equipe';
  const nome = criarControleEquipes('input', 'nome', 'text');
  nome.maxLength = 80;
  const descricao = criarControleEquipes('textarea', 'descricao');
  descricao.maxLength = 500;
  descricao.rows = 2;
  const salvar = criarBotaoEquipes({ texto: '💾 Salvar equipe', acao: 'salvar-equipe',
    classe: 'equipes-btn--principal' });
  salvar.type = 'submit';
  const acoes = criarElementoEquipes('div', 'equipes-form__acoes');
  acoes.append(salvar, criarBotaoEquipes({ texto: 'Nova / limpar', acao: 'limpar-equipe' }));
  formulario.append(criarElementoEquipes('h3', '', 'Equipe — cadastrar / editar'),
    criarCampoEquipes('Nome da equipe', nome),
    criarCampoEquipes('Descrição (tema, o que a equipe vai fazer)', descricao), acoes);
  return formulario;
}

/**
 * Cria a lista de sugestões de papéis (datalist) vinda do MENU-ATIVIDADES.js.
 * @param {string[]} papeis - Papéis sugeridos.
 * @returns {HTMLDataListElement} Datalist.
 */
function criarSugestoesPapeis(papeis) {
  const lista = criarElementoEquipes('datalist');
  lista.id = 'equipes-papeis-sugeridos';
  papeis.forEach((papel) => lista.appendChild(new Option(papel)));
  return lista;
}

/**
 * Monta o formulário do integrante (equipe, aluno, papel, tarefas, líder).
 * @param {string[]} papeis - Papéis sugeridos.
 * @returns {HTMLFormElement} Formulário.
 */
function montarFormularioMembro(papeis) {
  const formulario = criarElementoEquipes('form', 'equipes-form');
  formulario.dataset.formulario = 'membro';
  const papel = criarControleEquipes('input', 'papel', 'text');
  papel.maxLength = 60;
  papel.setAttribute('list', 'equipes-papeis-sugeridos');
  const tarefas = criarControleEquipes('textarea', 'tarefas');
  tarefas.maxLength = 500;
  tarefas.rows = 2;
  const salvar = criarBotaoEquipes({ texto: '💾 Salvar integrante', acao: 'salvar-membro',
    classe: 'equipes-btn--principal' });
  salvar.type = 'submit';
  const acoes = criarElementoEquipes('div', 'equipes-form__acoes');
  acoes.append(salvar, criarBotaoEquipes({ texto: 'Novo / limpar', acao: 'limpar-membro' }));
  formulario.append(criarElementoEquipes('h3', '', 'Integrante — adicionar / editar'),
    criarCampoEquipes('Equipe', criarControleEquipes('select', 'equipe_id')),
    criarCampoEquipes('Aluno', criarControleEquipes('select', 'aluno_id')),
    criarCampoEquipes('Papel', papel), criarSugestoesPapeis(papeis),
    criarCampoEquipes('Tarefas combinadas', tarefas),
    criarCampoEquipes('Líder da equipe', criarControleEquipes('input', 'lider', 'checkbox')),
    acoes);
  return formulario;
}

/**
 * Monta o modal e o anexa à página.
 * @param {string[]} papeis - Papéis sugeridos.
 * @returns {Object} Referências dos elementos do modal.
 */
function montarModalEquipes(papeis) {
  const fundo = criarElementoEquipes('div', 'equipes-fundo');
  const caixa = criarElementoEquipes('div', 'equipes-caixa');
  caixa.setAttribute('role', 'dialog');
  caixa.setAttribute('aria-modal', 'true');
  const titulo = criarElementoEquipes('h2', '', TITULO_MODAL_EQUIPES);
  const cabecalho = criarElementoEquipes('div', 'equipes-cabecalho');
  cabecalho.append(titulo, criarBotaoEquipes({ texto: '✕ Fechar', acao: 'fechar' }));
  const turma = criarControleEquipes('select', 'turma');
  const barra = criarElementoEquipes('div', 'equipes-barra');
  barra.append(criarCampoEquipes('Turma', turma));
  const elementos = {
    fundo, titulo, turma, barra,
    mensagem: criarElementoEquipes('p', 'equipes-mensagem'),
    resumo: criarElementoEquipes('p', 'equipes-resumo'),
    lista: criarElementoEquipes('div', 'equipes-lista'),
    semEquipe: criarElementoEquipes('div', 'equipes-sem-equipe'),
    formularioEquipe: montarFormularioEquipe(),
    formularioMembro: montarFormularioMembro(papeis),
  };
  elementos.formularios = criarElementoEquipes('div', 'equipes-formularios');
  elementos.formularios.append(elementos.formularioEquipe, elementos.formularioMembro);
  caixa.append(cabecalho, barra, elementos.mensagem, elementos.resumo, elementos.formularios,
    elementos.lista, elementos.semEquipe);
  fundo.appendChild(caixa);
  document.body.appendChild(fundo);
  return elementos;
}

/**
 * Mostra uma mensagem no modal (vazio esconde).
 * @param {string} texto - Mensagem.
 * @returns {void}
 */
function mostrarMensagemEquipes(texto) {
  elementosEquipes.mensagem.textContent = texto;
  elementosEquipes.mensagem.hidden = !texto;
}

/**
 * Mostra ou esconde as partes exclusivas do professor.
 * @param {boolean} ehProfessor - Se o usuário é professor.
 * @returns {void}
 */
function alternarModoProfessor(ehProfessor) {
  elementosEquipes.barra.hidden = !ehProfessor;
  elementosEquipes.formularios.hidden = !ehProfessor;
  elementosEquipes.semEquipe.hidden = !ehProfessor;
  elementosEquipes.resumo.hidden = !ehProfessor;
}

/**
 * Converte o erro do banco em texto para o professor.
 * @param {Object} erro - Erro do supabase-js.
 * @returns {string} Mensagem amigável.
 */
function traduzirErroEquipes(erro) {
  if (erro?.code === CODIGO_DUPLICADO_EQUIPES) return MSG_DUPLICADO_EQUIPES;
  return MSG_ERRO_EQUIPES + (erro?.message || String(erro));
}

/**
 * Executa uma gravação, recarrega a turma e avisa erros pelo popup.
 * @param {Function} gravacao - Função async que grava no banco.
 * @returns {Promise<boolean>} true se gravou.
 */
async function executarGravacaoEquipes(gravacao) {
  try {
    await gravacao();
    await carregarTurmaEquipes();
    return true;
  } catch (erro) {
    await mostrarPopup(traduzirErroEquipes(erro), { tipo: 'erro' });
    return false;
  }
}

/**
 * Nome do aluno pelo id (alunos da turma carregados).
 * @param {string} alunoId - Id do aluno.
 * @returns {string} Nome.
 */
function nomeDoAlunoEquipes(alunoId) {
  const aluno = estadoEquipes.alunos.find((item) => item.id === alunoId);
  return aluno ? aluno.nome : 'Aluno fora da turma';
}

/**
 * Integrantes de uma equipe, com o líder primeiro e depois pelo nome.
 * @param {number} equipeId - Id da equipe.
 * @returns {Object[]} Membros ordenados.
 */
function membrosDaEquipe(equipeId) {
  return estadoEquipes.membros
    .filter((membro) => membro.equipe_id === equipeId)
    .sort((a, b) => Number(b.lider) - Number(a.lider) ||
      nomeDoAlunoEquipes(a.aluno_id).localeCompare(nomeDoAlunoEquipes(b.aluno_id), 'pt-BR'));
}

/**
 * Cria a linha de um integrante no card da equipe.
 * @param {Object} membro - Integrante.
 * @returns {HTMLLIElement} Linha.
 */
function criarLinhaMembro(membro) {
  const linha = criarElementoEquipes('li', 'equipes-membro');
  const coroa = membro.lider ? '👑 ' : '';
  const texto = criarElementoEquipes('div', 'equipes-membro__texto');
  texto.append(criarElementoEquipes('strong', '', coroa + nomeDoAlunoEquipes(membro.aluno_id)),
    criarElementoEquipes('span', 'equipes-membro__papel', membro.papel || 'sem papel'));
  if (membro.tarefas) texto.append(criarElementoEquipes('small', '', membro.tarefas));
  const acoes = criarElementoEquipes('div', 'equipes-acoes');
  acoes.append(criarBotaoEquipes({ texto: '✏️', acao: 'editar-membro', id: membro.id }),
    criarBotaoEquipes({ texto: '🗑️', acao: 'excluir-membro', id: membro.id,
      classe: 'equipes-btn--perigo' }));
  linha.append(texto, acoes);
  return linha;
}

/**
 * Cria o card de uma equipe (professor), com os integrantes.
 * @param {Object} equipe - Equipe.
 * @returns {HTMLElement} Card.
 */
function criarCardEquipe(equipe) {
  const membros = membrosDaEquipe(equipe.id);
  const card = criarElementoEquipes('article', 'equipes-card');
  const topo = criarElementoEquipes('div', 'equipes-card__topo');
  topo.append(criarElementoEquipes('h3', '', equipe.nome + ' (' + membros.length + ')'));
  const acoes = criarElementoEquipes('div', 'equipes-acoes');
  acoes.append(criarBotaoEquipes({ texto: '✏️ Editar', acao: 'editar-equipe', id: equipe.id }),
    criarBotaoEquipes({ texto: '🗑️ Excluir', acao: 'excluir-equipe', id: equipe.id,
      classe: 'equipes-btn--perigo' }));
  topo.append(acoes);
  card.append(topo);
  if (equipe.descricao) card.append(criarElementoEquipes('p', 'equipes-card__descricao',
    equipe.descricao));
  const lista = criarElementoEquipes('ul', 'equipes-membros');
  membros.forEach((membro) => lista.appendChild(criarLinhaMembro(membro)));
  const semIntegrantes = criarElementoEquipes('li', 'equipes-vazio', 'Sem integrantes.');
  if (!membros.length) lista.append(semIntegrantes);
  card.append(lista);
  return card;
}

/**
 * Alunos da turma que ainda não estão em nenhuma equipe da matéria.
 * @returns {{id: string, nome: string}[]} Alunos sem equipe.
 */
function alunosSemEquipe() {
  const comEquipe = new Set(estadoEquipes.membros.map((membro) => membro.aluno_id));
  return estadoEquipes.alunos.filter((aluno) => !comEquipe.has(aluno.id));
}

/**
 * Mostra a lista de alunos sem equipe.
 * @returns {void}
 */
function renderizarSemEquipe() {
  const semEquipe = alunosSemEquipe();
  const titulo = criarElementoEquipes('h3', '', 'Alunos sem equipe (' + semEquipe.length + ')');
  const lista = criarElementoEquipes('p', 'equipes-sem-equipe__nomes',
    semEquipe.map((aluno) => aluno.nome).join(' · ') || 'Todos os alunos têm equipe.');
  elementosEquipes.semEquipe.replaceChildren(titulo, lista);
}

/**
 * Atualiza os selects do formulário de integrante.
 * @returns {void}
 */
function atualizarSelectsMembro() {
  const formulario = elementosEquipes.formularioMembro;
  const opcoesEquipe = [{ valor: '', texto: 'Selecione a equipe…' }].concat(
    estadoEquipes.equipes.map((equipe) => ({ valor: String(equipe.id), texto: equipe.nome })));
  preencherSelectEquipes(formulario.equipe_id, opcoesEquipe, formulario.equipe_id.value);

  const membroEditado = estadoEquipes.membros.find((m) => m.id === estadoEquipes.editandoMembroId);
  const alunos = alunosSemEquipe();
  if (membroEditado) alunos.unshift({ id: membroEditado.aluno_id,
    nome: nomeDoAlunoEquipes(membroEditado.aluno_id) });
  const opcoesAluno = [{ valor: '', texto: 'Selecione o aluno…' }].concat(
    alunos.map((aluno) => ({ valor: aluno.id, texto: aluno.nome })));
  preencherSelectEquipes(formulario.aluno_id, opcoesAluno, formulario.aluno_id.value);
}

/**
 * Redesenha a visão do professor (resumo, cards, sem equipe e selects).
 * @returns {void}
 */
function renderizarTurmaEquipes() {
  const totalSemEquipe = alunosSemEquipe().length;
  elementosEquipes.resumo.textContent = estadoEquipes.equipes.length + ' equipe(s) · ' +
    estadoEquipes.alunos.length + ' aluno(s) na turma · ' + totalSemEquipe + ' sem equipe';
  elementosEquipes.lista.replaceChildren(...estadoEquipes.equipes.map(criarCardEquipe));
  renderizarSemEquipe();
  atualizarSelectsMembro();
}

/**
 * Carrega alunos, equipes e integrantes da turma escolhida.
 * @returns {Promise<void>}
 */
async function carregarTurmaEquipes() {
  const repositorio = estadoEquipes.repositorio;
  const turmaCodigo = estadoEquipes.turmaCodigo;
  const temTurma = Boolean(turmaCodigo);
  elementosEquipes.formularios.hidden = !temTurma;
  if (!temTurma) {
    elementosEquipes.lista.replaceChildren();
    elementosEquipes.semEquipe.replaceChildren();
    elementosEquipes.resumo.textContent = '';
    mostrarMensagemEquipes(MSG_ESCOLHA_TURMA_EQUIPES);
    return;
  }
  mostrarMensagemEquipes('');
  const filtro = { turmaCodigo, materiaId: estadoEquipes.materia.id };
  estadoEquipes.alunos = await repositorio.listarAlunosDaTurma(turmaCodigo);
  estadoEquipes.equipes = await repositorio.listarEquipes(filtro);
  estadoEquipes.membros = await repositorio.listarMembros(estadoEquipes.equipes.map((e) => e.id));
  renderizarTurmaEquipes();
}

/**
 * Texto da turma na lista: código — nome (turno).
 * @param {{codigo: string, nome: string, turno: string}} turma - Turma.
 * @returns {string} Rótulo.
 */
function rotuloTurmaEquipes(turma) {
  const turno = turma.turno ? ' (' + turma.turno + ')' : '';
  return turma.codigo + ' — ' + (turma.nome || '') + turno;
}

/**
 * Prepara a visão do professor: lista de turmas (1 turma = já selecionada).
 * @returns {Promise<void>}
 */
async function iniciarModoProfessor() {
  const turmas = await estadoEquipes.repositorio.listarTurmasDoProfessor(estadoEquipes.usuario.id);
  if (!turmas.length) {
    alternarModoProfessor(false);
    mostrarMensagemEquipes(MSG_SEM_TURMA_EQUIPES);
    return;
  }
  const opcoes = turmas.map((turma) => ({ valor: turma.codigo, texto: rotuloTurmaEquipes(turma) }));
  if (turmas.length > 1) opcoes.unshift({ valor: '', texto: 'Selecione a turma…' });
  preencherSelectEquipes(elementosEquipes.turma, opcoes, estadoEquipes.turmaCodigo);
  estadoEquipes.turmaCodigo = elementosEquipes.turma.value;
  await carregarTurmaEquipes();
}

/**
 * Agrupa as linhas de minhas_equipes por equipe.
 * @param {Object[]} linhas - Linhas equipe × membro.
 * @returns {Map<number, Object[]>} Linhas por equipe.
 */
function agruparPorEquipe(linhas) {
  const grupos = new Map();
  linhas.forEach((linha) => {
    const grupo = grupos.get(linha.equipe_id) || [];
    grupo.push(linha);
    grupos.set(linha.equipe_id, grupo);
  });
  return grupos;
}

/**
 * Cria o card (só leitura) de uma equipe do aluno.
 * @param {Object[]} linhas - Integrantes da equipe.
 * @returns {HTMLElement} Card.
 */
function criarCardMinhaEquipe(linhas) {
  const card = criarElementoEquipes('article', 'equipes-card');
  card.append(criarElementoEquipes('h3', '', linhas[0].equipe_nome +
    ' — turma ' + linhas[0].turma_codigo));
  if (linhas[0].equipe_descricao) card.append(criarElementoEquipes('p',
    'equipes-card__descricao', linhas[0].equipe_descricao));
  const lista = criarElementoEquipes('ul', 'equipes-membros');
  linhas.forEach((linha) => {
    const item = criarElementoEquipes('li', 'equipes-membro');
    if (linha.eu) item.classList.add('equipes-membro--eu');
    const texto = criarElementoEquipes('div', 'equipes-membro__texto');
    const coroa = linha.lider ? '👑 ' : '';
    texto.append(criarElementoEquipes('strong', '', coroa + linha.aluno_nome),
      criarElementoEquipes('span', 'equipes-membro__papel', linha.papel || 'sem papel'));
    if (linha.tarefas) texto.append(criarElementoEquipes('small', '', linha.tarefas));
    item.append(texto);
    lista.appendChild(item);
  });
  card.append(lista);
  return card;
}

/**
 * Prepara a visão do aluno: só a própria equipe, sem edição.
 * @returns {Promise<void>}
 */
async function iniciarModoAluno() {
  const linhas = await estadoEquipes.repositorio.listarMinhasEquipes(estadoEquipes.materia.id);
  if (!linhas.length) {
    mostrarMensagemEquipes(MSG_SEM_EQUIPE_ALUNO);
    return;
  }
  const grupos = [...agruparPorEquipe(linhas).values()];
  elementosEquipes.lista.replaceChildren(...grupos.map(criarCardMinhaEquipe));
}

/**
 * Lê usuário e matéria e decide a visão (professor ou aluno).
 * @returns {Promise<void>}
 */
async function carregarInicialEquipes() {
  const repositorio = estadoEquipes.repositorio;
  alternarModoProfessor(false);
  elementosEquipes.lista.replaceChildren();
  estadoEquipes.usuario = await repositorio.usuarioLogado();
  if (!estadoEquipes.usuario) return mostrarMensagemEquipes(MSG_SEM_LOGIN_EQUIPES);

  estadoEquipes.materia = await repositorio.buscarMateriaDaPasta(estadoEquipes.prefixoPasta);
  if (!estadoEquipes.materia) return mostrarMensagemEquipes(MSG_SEM_MATERIA_EQUIPES);

  elementosEquipes.titulo.textContent = TITULO_MODAL_EQUIPES + ' — ' +
    estadoEquipes.materia.descricao;
  const ehProfessor = repositorio.ehProfessor(estadoEquipes.usuario);
  alternarModoProfessor(ehProfessor);
  mostrarMensagemEquipes('');
  if (ehProfessor) return iniciarModoProfessor();
  return iniciarModoAluno();
}

/**
 * Limpa o formulário da equipe (volta a "cadastrar").
 * @returns {void}
 */
function limparFormularioEquipe() {
  estadoEquipes.editandoEquipeId = null;
  elementosEquipes.formularioEquipe.reset();
}

/**
 * Limpa o formulário do integrante (volta a "adicionar").
 * @returns {void}
 */
function limparFormularioMembro() {
  estadoEquipes.editandoMembroId = null;
  elementosEquipes.formularioMembro.reset();
  atualizarSelectsMembro();
}

/**
 * Grava a equipe do formulário (cria ou altera).
 * @returns {Promise<void>}
 */
async function salvarEquipe() {
  const formulario = elementosEquipes.formularioEquipe;
  const nome = formulario.nome.value.trim();
  if (!nome) return void await mostrarPopup(MSG_NOME_OBRIGATORIO, { tipo: 'aviso' });

  const campos = { nome, descricao: formulario.descricao.value.trim() || null };
  const id = estadoEquipes.editandoEquipeId;
  const gravou = await executarGravacaoEquipes(() => {
    if (id) return estadoEquipes.repositorio.alterarEquipe(id, campos);
    return estadoEquipes.repositorio.criarEquipe({ ...campos,
      turma_codigo: estadoEquipes.turmaCodigo, materia_id: estadoEquipes.materia.id });
  });
  if (gravou) limparFormularioEquipe();
}

/**
 * Tira a marca de líder dos outros integrantes da equipe (só 1 líder por equipe).
 * @param {number} equipeId - Id da equipe.
 * @param {number|null} membroId - Integrante que será o líder.
 * @returns {Promise<void>}
 */
async function desmarcarOutrosLideres(equipeId, membroId) {
  const outros = estadoEquipes.membros.filter((membro) =>
    membro.equipe_id === equipeId && membro.lider && membro.id !== membroId);
  for (const membro of outros) {
    await estadoEquipes.repositorio.alterarMembro(membro.id, { lider: false });
  }
}

/**
 * Grava o integrante do formulário (adiciona ou altera).
 * @returns {Promise<void>}
 */
async function salvarMembro() {
  const formulario = elementosEquipes.formularioMembro;
  const equipeId = Number(formulario.equipe_id.value);
  const alunoId = formulario.aluno_id.value;
  const temDados = Boolean(equipeId && alunoId);
  if (!temDados) return void await mostrarPopup(MSG_MEMBRO_OBRIGATORIO, { tipo: 'aviso' });

  const campos = { equipe_id: equipeId, aluno_id: alunoId,
    papel: formulario.papel.value.trim() || null,
    tarefas: formulario.tarefas.value.trim() || null, lider: formulario.lider.checked };
  const id = estadoEquipes.editandoMembroId;
  const gravou = await executarGravacaoEquipes(async () => {
    if (campos.lider) await desmarcarOutrosLideres(equipeId, id);
    if (id) return estadoEquipes.repositorio.alterarMembro(id, campos);
    return estadoEquipes.repositorio.criarMembro(campos);
  });
  if (gravou) limparFormularioMembro();
}

/**
 * Carrega uma equipe no formulário para edição.
 * @param {number} id - Id da equipe.
 * @returns {void}
 */
function editarEquipe(id) {
  const equipe = estadoEquipes.equipes.find((item) => item.id === id);
  if (!equipe) return;

  const formulario = elementosEquipes.formularioEquipe;
  estadoEquipes.editandoEquipeId = id;
  formulario.nome.value = equipe.nome;
  formulario.descricao.value = equipe.descricao || '';
  formulario.nome.focus();
}

/**
 * Carrega um integrante no formulário para edição (inclusive trocar de equipe).
 * @param {number} id - Id do integrante.
 * @returns {void}
 */
function editarMembro(id) {
  const membro = estadoEquipes.membros.find((item) => item.id === id);
  if (!membro) return;

  const formulario = elementosEquipes.formularioMembro;
  estadoEquipes.editandoMembroId = id;
  atualizarSelectsMembro();
  formulario.equipe_id.value = String(membro.equipe_id);
  formulario.aluno_id.value = membro.aluno_id;
  formulario.papel.value = membro.papel || '';
  formulario.tarefas.value = membro.tarefas || '';
  formulario.lider.checked = membro.lider;
  formulario.papel.focus();
}

/**
 * Exclui uma equipe (com confirmação; os integrantes saem junto).
 * @param {number} id - Id da equipe.
 * @returns {Promise<void>}
 */
async function excluirEquipe(id) {
  const equipe = estadoEquipes.equipes.find((item) => item.id === id);
  const confirmou = await confirmarPopup('Excluir a equipe "' + (equipe?.nome || '') +
    '"? Os integrantes ficam sem equipe.', { textoConfirmar: 'Excluir' });
  if (!confirmou) return;

  await executarGravacaoEquipes(() => estadoEquipes.repositorio.excluirEquipe(id));
  if (estadoEquipes.editandoEquipeId === id) limparFormularioEquipe();
}

/**
 * Retira um integrante da equipe (com confirmação).
 * @param {number} id - Id do integrante.
 * @returns {Promise<void>}
 */
async function excluirMembro(id) {
  const membro = estadoEquipes.membros.find((item) => item.id === id);
  const nome = membro ? nomeDoAlunoEquipes(membro.aluno_id) : '';
  const confirmou = await confirmarPopup('Retirar ' + nome + ' da equipe?',
    { textoConfirmar: 'Retirar' });
  if (!confirmou) return;

  await executarGravacaoEquipes(() => estadoEquipes.repositorio.excluirMembro(id));
  if (estadoEquipes.editandoMembroId === id) limparFormularioMembro();
}

/**
 * Fecha o modal.
 * @returns {void}
 */
function fecharModalEquipes() {
  elementosEquipes.fundo.hidden = true;
}

const ACOES_CLIQUE_EQUIPES = {
  'fechar': fecharModalEquipes,
  'limpar-equipe': limparFormularioEquipe,
  'limpar-membro': limparFormularioMembro,
  'editar-equipe': editarEquipe,
  'excluir-equipe': excluirEquipe,
  'editar-membro': editarMembro,
  'excluir-membro': excluirMembro,
};

/**
 * Trata os cliques do modal por delegação (data-acao).
 * @param {MouseEvent} evento - Clique.
 * @returns {void}
 */
function tratarCliqueEquipes(evento) {
  if (evento.target === elementosEquipes.fundo) return fecharModalEquipes();

  const botao = evento.target.closest('button[data-acao]');
  const acao = botao && ACOES_CLIQUE_EQUIPES[botao.dataset.acao];
  if (!acao) return;

  acao(Number(botao.dataset.id));
}

/**
 * Liga os eventos do modal (uma vez).
 * @returns {void}
 */
function ligarEventosEquipes() {
  elementosEquipes.fundo.addEventListener('click', tratarCliqueEquipes);
  elementosEquipes.formularioEquipe.addEventListener('submit', (evento) => {
    evento.preventDefault();
    salvarEquipe();
  });
  elementosEquipes.formularioMembro.addEventListener('submit', (evento) => {
    evento.preventDefault();
    salvarMembro();
  });
  elementosEquipes.turma.addEventListener('change', () => {
    estadoEquipes.turmaCodigo = elementosEquipes.turma.value;
    limparFormularioEquipe();
    limparFormularioMembro();
    carregarTurmaEquipes().catch((erro) => mostrarMensagemEquipes(traduzirErroEquipes(erro)));
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !elementosEquipes.fundo.hidden) fecharModalEquipes();
  });
}

/**
 * Abre o modal de equipes da matéria (monta na primeira vez).
 * @param {{repositorio: Object, prefixoPasta: string, papeis: string[]}} contexto - Dados.
 * @returns {Promise<void>}
 */
async function abrirModalEquipes(contexto) {
  Object.assign(estadoEquipes, contexto);
  if (!elementosEquipes) {
    elementosEquipes = montarModalEquipes(contexto.papeis);
    ligarEventosEquipes();
  }
  elementosEquipes.fundo.hidden = false;
  try {
    await carregarInicialEquipes();
  } catch (erro) {
    mostrarMensagemEquipes(traduzirErroEquipes(erro));
  }
}
