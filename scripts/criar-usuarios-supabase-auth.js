/**
 * Cria/atualiza no Supabase Auth os alunos de um LISTA-PRESENCA.js e grava as tabelas turma/aluno.
 * Opcionalmente cria/atualiza a conta do professor.
 *
 * Uso (PowerShell, na raiz do projeto):
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "<chave service_role>"
 *   node scripts/criar-usuarios-supabase-auth.js <LISTA-PRESENCA.js>              (simulação)
 *   node scripts/criar-usuarios-supabase-auth.js <LISTA-PRESENCA.js> --executar   (grava)
 *
 * Opções:
 *   --executar                     Grava de verdade. Sem ela, só mostra o que seria feito.
 *   --prefixo-senha=XX             Texto antes de cada senha (mínimo do Supabase: 6 caracteres).
 *   --professor=email@senai.local  Cria/atualiza o professor; senha em $env:PROFESSOR_SENHA.
 *
 * Perfil e turma vão para app_metadata (só a service_role altera — usado pelo RLS).
 * Usuário que já existe é atualizado (metadados; a senha só muda se --redefinir-senhas).
 *   --redefinir-senhas             Também regrava a senha dos alunos que já existem.
 *
 * ⚠️ A chave service_role ignora o RLS: use só nesta máquina,
 *    nunca em páginas nem no repositório.
 * ⚠️ O LISTA-PRESENCA.js tem dados pessoais de alunos (LGPD) e fica fora do Git.
 * Requer as tabelas de database/2026-09-28-atividades-gabarito.sql.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const ROTA_ADMIN_USUARIOS = '/auth/v1/admin/users';
const ROTA_REST = '/rest/v1/';
const VARIAVEL_CHAVE = 'SUPABASE_SERVICE_ROLE_KEY';
const VARIAVEL_SENHA_PROFESSOR = 'PROFESSOR_SENHA';
const TAMANHO_MINIMO_SENHA = 6;
const USUARIOS_POR_PAGINA = 1000;
const PERFIL_ALUNO = 'ALUNO';
const PERFIL_PROFESSOR = 'PROFESSOR';
const OPCAO_EXECUTAR = '--executar';
const OPCAO_REDEFINIR = '--redefinir-senhas';
const OPCAO_PREFIXO = '--prefixo-senha=';
const OPCAO_PROFESSOR = '--professor=';

/**
 * Lê o valor de uma opção no formato --nome=valor.
 * @param {string[]} argumentos - Argumentos da linha de comando.
 * @param {string} prefixo - Início da opção (ex.: "--professor=").
 * @returns {string} Valor, ou "" se ausente.
 */
function lerValorOpcao(argumentos, prefixo) {
  const opcao = argumentos.find((argumento) => argumento.startsWith(prefixo));
  return opcao ? opcao.slice(prefixo.length) : '';
}

/**
 * Lê as opções da linha de comando.
 * @param {string[]} argumentos - Argumentos após o nome do script.
 * @returns {Object} Opções: arquivo, executar, redefinirSenhas, prefixoSenha, emailProfessor.
 * @throws {Error} Se o caminho do LISTA-PRESENCA.js não for informado.
 */
function lerOpcoes(argumentos) {
  const arquivo = argumentos.find((argumento) => !argumento.startsWith('--'));
  if (!arquivo) throw new Error('Informe o caminho do LISTA-PRESENCA.js.');
  return {
    arquivo: path.resolve(arquivo),
    executar: argumentos.includes(OPCAO_EXECUTAR),
    redefinirSenhas: argumentos.includes(OPCAO_REDEFINIR),
    prefixoSenha: lerValorOpcao(argumentos, OPCAO_PREFIXO),
    emailProfessor: lerValorOpcao(argumentos, OPCAO_PROFESSOR).toLowerCase(),
  };
}

/**
 * Carrega o objeto window.LISTA_PRESENCA de um arquivo, sem executar mais nada dele.
 * @param {string} arquivo - Caminho absoluto do LISTA-PRESENCA.js.
 * @returns {{turmas: Object[]}} Dados da lista de presença.
 * @throws {Error} Se o arquivo não existir ou não definir window.LISTA_PRESENCA.
 */
function carregarListaPresenca(arquivo) {
  if (!fs.existsSync(arquivo)) throw new Error('Arquivo não encontrado: ' + arquivo);
  const contexto = { window: {} };
  vm.runInNewContext(fs.readFileSync(arquivo, 'utf-8'), contexto, { timeout: 1000 });
  const lista = contexto.window.LISTA_PRESENCA;
  if (!lista?.turmas?.length) throw new Error('O arquivo não define window.LISTA_PRESENCA.');
  return lista;
}

/**
 * Transforma cada aluno da lista em um usuário do Supabase Auth + linha da tabela aluno.
 * @param {{turmas: Object[]}} lista - Dados da lista de presença.
 * @param {string} prefixoSenha - Texto colocado antes de cada senha.
 * @returns {Object[]} Usuários: email, senha, appMetadata, userMetadata, linhaAluno.
 */
function montarUsuarios(lista, prefixoSenha) {
  return lista.turmas.flatMap((turma) =>
    turma.alunos.map((aluno) => {
      const perfil = aluno.perfil || PERFIL_ALUNO;
      const ehAluno = perfil === PERFIL_ALUNO;
      return {
        email: aluno.email,
        senha: prefixoSenha + aluno.senha,
        appMetadata: ehAluno ? { perfil, turma_codigo: turma.codigo } : { perfil },
        userMetadata: { nome: aluno.nome, turma_codigo: turma.codigo, turma_nome: turma.nome },
        // aluno.turma_codigo é cópia automática da turmaaluno (trigger): não vai aqui.
        linhaAluno: ehAluno ? {
          nome: aluno.nome,
          email: aluno.email,
          numero_chamada: aluno.numero,
          na_chamada: aluno.naChamada,
        } : null,
        turmaCodigo: ehAluno ? turma.codigo : null,
      };
    })
  );
}

/**
 * Monta o usuário do professor a partir das opções.
 * @param {string} email - E-mail do professor.
 * @param {string} professor - Nome do professor (da lista de presença).
 * @returns {Object|null} Usuário do professor ou null se não pedido.
 */
function montarProfessor(email, professor) {
  if (!email) return null;
  return {
    email,
    senha: process.env[VARIAVEL_SENHA_PROFESSOR] || '',
    appMetadata: { perfil: PERFIL_PROFESSOR },
    userMetadata: { nome: professor || email, perfil: PERFIL_PROFESSOR },
    linhaAluno: null,
  };
}

/**
 * Lista os problemas que impedem a gravação (dados ausentes, senha curta, repetidos).
 * @param {{email: string, senha: string}[]} usuarios - Usuários a gravar.
 * @returns {string[]} Descrição de cada problema; vazio se estiver tudo certo.
 */
function validarUsuarios(usuarios) {
  const problemas = [];
  const emailsVistos = new Set();
  usuarios.forEach((usuario) => {
    const dados = JSON.stringify(usuario.userMetadata);
    if (!usuario.email) problemas.push('Usuário sem e-mail: ' + dados);
    if (emailsVistos.has(usuario.email)) problemas.push('E-mail repetido: ' + usuario.email);
    const senhaCurta = (usuario.senha || '').length < TAMANHO_MINIMO_SENHA;
    const mensagemSenha = 'Senha com menos de ' + TAMANHO_MINIMO_SENHA + ': ' + usuario.email;
    if (senhaCurta) problemas.push(mensagemSenha);
    emailsVistos.add(usuario.email);
  });
  return problemas;
}

/**
 * Faz uma chamada autenticada com a chave service_role.
 * @param {string} rota - Caminho a partir da URL do projeto.
 * @param {{metodo?: string, corpo?: Object, headers?: Object}} opcoes - Método, corpo e headers.
 * @param {string} chaveServico - Chave service_role.
 * @returns {Promise<Object|null>} JSON da resposta (null sem corpo).
 * @throws {Error} Com status e mensagem da API.
 */
async function chamarApi(rota, opcoes, chaveServico) {
  const resposta = await fetch(SUPABASE_URL + rota, {
    method: opcoes.metodo || 'GET',
    headers: {
      apikey: chaveServico,
      Authorization: 'Bearer ' + chaveServico,
      'Content-Type': 'application/json',
      ...(opcoes.headers || {}),
    },
    body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
  });
  const texto = await resposta.text();
  const dados = texto ? JSON.parse(texto) : null;
  if (!resposta.ok) {
    throw new Error(resposta.status + ' ' + (dados?.msg || dados?.message || texto));
  }
  return dados;
}

/**
 * Lista os usuários que já existem no Supabase Auth, por e-mail.
 * @param {string} chaveServico - Chave service_role.
 * @returns {Promise<Map<string, string>>} Mapa e-mail → id.
 */
async function listarUsuariosExistentes(chaveServico) {
  const existentes = new Map();
  for (let pagina = 1; ; pagina += 1) {
    const rota = ROTA_ADMIN_USUARIOS + '?page=' + pagina + '&per_page=' + USUARIOS_POR_PAGINA;
    const dados = await chamarApi(rota, {}, chaveServico);
    const usuarios = dados?.users || [];
    usuarios.forEach((usuario) => existentes.set((usuario.email || '').toLowerCase(), usuario.id));
    if (usuarios.length < USUARIOS_POR_PAGINA) return existentes;
  }
}

/**
 * Cria o usuário ou atualiza os metadados de quem já existe.
 * @param {Object} usuario - Usuário montado por montarUsuarios/montarProfessor.
 * @param {Map<string, string>} existentes - Mapa e-mail → id.
 * @param {{chaveServico: string, redefinirSenhas: boolean}} contexto - Chave e opções.
 * @returns {Promise<{id: string, resultado: string}>} Id no Auth e "criado"/"atualizado".
 */
async function gravarUsuarioAuth(usuario, existentes, contexto) {
  const corpo = {
    email: usuario.email,
    app_metadata: usuario.appMetadata,
    user_metadata: usuario.userMetadata,
    email_confirm: true,
  };
  const idExistente = existentes.get(usuario.email);
  if (!idExistente) {
    const criado = await chamarApi(ROTA_ADMIN_USUARIOS, {
      metodo: 'POST', corpo: { ...corpo, password: usuario.senha },
    }, contexto.chaveServico);
    return { id: criado.id, resultado: 'criado' };
  }
  if (contexto.redefinirSenhas) corpo.password = usuario.senha;
  await chamarApi(ROTA_ADMIN_USUARIOS + '/' + idExistente, {
    metodo: 'PUT', corpo,
  }, contexto.chaveServico);
  return { id: idExistente, resultado: 'atualizado' };
}

/**
 * Grava (upsert) linhas numa tabela pela API REST.
 * @param {string} tabela - Nome da tabela.
 * @param {Object[]} linhas - Linhas a gravar.
 * @param {string} chaveServico - Chave service_role.
 * @returns {Promise<void>}
 */
async function gravarTabela(tabela, linhas, chaveServico) {
  if (!linhas.length) return;
  await chamarApi(ROTA_REST + tabela, {
    metodo: 'POST',
    corpo: linhas,
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
  }, chaveServico);
}

/**
 * Grava os vínculos aluno × turma na turmaaluno (fonte única da turma do aluno); vínculo que já
 * existe é ignorado. O banco copia a turma principal para aluno.turma_codigo e o app_metadata.
 * @param {Object[]} vinculos - Linhas {turma_codigo, aluno_id}.
 * @param {string} chaveServico - Chave service_role.
 * @returns {Promise<void>}
 */
async function gravarVinculosTurmaAluno(vinculos, chaveServico) {
  if (!vinculos.length) return;
  await chamarApi(ROTA_REST + 'turmaaluno?on_conflict=turma_codigo,aluno_id', {
    metodo: 'POST',
    corpo: vinculos,
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
  }, chaveServico);
}

/**
 * Grava todos os usuários no Auth, sem parar no primeiro erro.
 * @param {Object[]} usuarios - Usuários a gravar.
 * @param {{chaveServico: string, redefinirSenhas: boolean}} contexto - Chave e opções.
 * @returns {Promise<{resumo: Object, alunos: Object[], vinculos: Object[]}>} Resumo, linhas da
 *   tabela aluno e vínculos da turmaaluno.
 */
async function gravarUsuarios(usuarios, contexto) {
  const existentes = await listarUsuariosExistentes(contexto.chaveServico);
  const resumo = { criado: 0, atualizado: 0, erro: 0 };
  const alunos = [];
  const vinculos = [];
  for (const usuario of usuarios) {
    try {
      const { id, resultado } = await gravarUsuarioAuth(usuario, existentes, contexto);
      resumo[resultado] += 1;
      if (usuario.linhaAluno) alunos.push({ id, ...usuario.linhaAluno });
      if (usuario.turmaCodigo) vinculos.push({ turma_codigo: usuario.turmaCodigo, aluno_id: id });
      console.log(resultado.padEnd(11) + usuario.email);
    } catch (erro) {
      resumo.erro += 1;
      console.error('erro       ' + usuario.email + ' → ' + erro.message);
    }
  }
  return { resumo, alunos, vinculos };
}

/**
 * Mostra o que seria feito, sem chamar a API e sem exibir senhas.
 * @param {{email: string, appMetadata: Object}[]} usuarios - Usuários a gravar.
 */
function simular(usuarios) {
  usuarios.forEach((usuario) => {
    const rotulo = usuario.appMetadata.turma_codigo || usuario.appMetadata.perfil;
    console.log(String(rotulo).padEnd(12) + usuario.email);
  });
  console.log('\nSimulação: ' + usuarios.length + ' usuários. Nada foi gravado.');
  console.log('Para gravar de verdade, rode de novo com ' + OPCAO_EXECUTAR + '.');
}

/**
 * Ponto de entrada: lê a lista, valida e simula ou grava usuários, turmas e alunos.
 */
async function principal() {
  const opcoes = lerOpcoes(process.argv.slice(2));
  const lista = carregarListaPresenca(opcoes.arquivo);
  const usuarios = montarUsuarios(lista, opcoes.prefixoSenha);
  const professor = montarProfessor(opcoes.emailProfessor, lista.professor);
  if (professor) usuarios.push(professor);

  const problemas = validarUsuarios(usuarios);
  if (problemas.length) {
    console.error('Nada foi gravado. Corrija antes:\n- ' + problemas.join('\n- '));
    process.exitCode = 1;
    return;
  }
  if (!opcoes.executar) return simular(usuarios);

  const chaveServico = process.env[VARIAVEL_CHAVE];
  if (!chaveServico) throw new Error('Defina a variável de ambiente ' + VARIAVEL_CHAVE + '.');
  const turmas = lista.turmas.map((turma) => ({
    codigo: turma.codigo, nome: turma.nome, turno: turma.turno, horario: turma.horario,
  }));
  await gravarTabela('turma', turmas, chaveServico);
  const contexto = { chaveServico, redefinirSenhas: opcoes.redefinirSenhas };
  const { resumo, alunos, vinculos } = await gravarUsuarios(usuarios, contexto);
  await gravarTabela('aluno', alunos, chaveServico);
  await gravarVinculosTurmaAluno(vinculos, chaveServico);
  console.log('\nResumo:', resumo, '| alunos gravados na tabela aluno:', alunos.length);
  if (resumo.erro) process.exitCode = 1;
}

principal().catch((erro) => {
  console.error('Erro: ' + erro.message);
  process.exitCode = 1;
});
