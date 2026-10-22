// API do Supabase (Auth admin + REST) para criar usuários de uma lista de presença.
// JavaScript puro, sem servidor. Usa a chave service_role de scripts/variaveis.js
// (window.VARIAVEIS), que só deve existir nesta máquina, fora do Git.

const URL_SUPABASE_USUARIOS = 'https://hxlvonriearllcmfqeri.supabase.co';
const ROTA_ADMIN = '/auth/v1/admin/users';
const ROTA_REST_USUARIOS = '/rest/v1/';
const POR_PAGINA_USUARIOS = 1000;
const TAMANHO_MINIMO_SENHA_USUARIO = 6;
const HOSTS_LOCAIS = ['127.0.0.1', 'localhost'];
const MSG_HOST_NAO_LOCAL = 'Por segurança, a gravação só funciona em 127.0.0.1 ou localhost.';
const MSG_SEM_CHAVE = 'Preencha SUPABASE_SERVICE_ROLE_KEY em scripts/variaveis.js.';
const PREFER_MESCLAR = 'resolution=merge-duplicates,return=minimal';
// Senha inicial que o professor entrega ao aluno; RLS só deixa o PROFESSOR ler (#345).
const TABELA_SENHA_INICIAL = 'usuario_senha_inicial';
const CONFLITO_SENHA_INICIAL = 'usuario_id';
const SITUACAO_ERRO_SENHA = 'erro ao guardar a senha inicial';
const SENHA_OCULTA_LOG = '***';

/**
 * Obtém a chave service_role, só se a página estiver aberta em um host local.
 * @returns {string} Chave service_role.
 * @throws {Error} Se o host não for local ou a chave não estiver preenchida.
 */
function obterChaveServico() {
    if (!HOSTS_LOCAIS.includes(location.hostname)) throw new Error(MSG_HOST_NAO_LOCAL);

    const chave = String(window.VARIAVEIS?.SUPABASE_SERVICE_ROLE_KEY || '').trim();
    if (!chave) throw new Error(MSG_SEM_CHAVE);
    return chave;
}

/**
 * Chamada autenticada à API do Supabase (GET, POST ou PUT).
 * @param {string} rota - Caminho a partir da URL do projeto.
 * @param {{metodo?: string, corpo?: Object, headers?: Object}} opcoes - Método, corpo e headers.
 * @param {string} chave - Chave service_role.
 * @returns {Promise<Object|null>} JSON da resposta (null sem corpo).
 * @throws {Error} Com status e mensagem da API.
 */
async function chamarApiUsuarios(rota, opcoes, chave) {
    const resposta = await fetch(URL_SUPABASE_USUARIOS + rota, {
        method: opcoes.metodo || 'GET',
        headers: {
            apikey: chave,
            Authorization: 'Bearer ' + chave,
            'Content-Type': 'application/json',
            ...(opcoes.headers || {}),
        },
        body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
    });
    const texto = await resposta.text();
    const dados = texto ? JSON.parse(texto) : null;
    if (resposta.ok) return dados;

    throw new Error(resposta.status + ' ' + (dados?.msg || dados?.message || texto));
}

/**
 * Monta o usuário do Auth de um item da lista; perfil PROFESSOR não vira linha da tabela aluno.
 * @param {Object} aluno - Item da lista (perfil opcional; o padrão é ALUNO).
 * @param {Object} turma - Turma do item.
 * @returns {Object} Usuário: email, senha, appMetadata, userMetadata, linhaAluno, linhaUsuario.
 */
function montarUsuarioDaLista(aluno, turma) {
    const perfil = aluno.perfil || 'ALUNO';
    const ehAluno = perfil === 'ALUNO';
    return {
        email: aluno.email,
        senha: aluno.senha,
        appMetadata: ehAluno ? { perfil, turma_codigo: turma.codigo } : { perfil },
        userMetadata: turma.virtual ? { nome: aluno.nome }
            : { nome: aluno.nome, turma_codigo: turma.codigo, turma_nome: turma.nome },
        linhaUsuario: {
            nome_completo: aluno.nome,
            email: aluno.email,
            login_usuario: aluno.email.split('@')[0],
            perfil,
        },
        // aluno.turma_codigo é cópia automática da turmaaluno (trigger): não vai aqui.
        linhaAluno: ehAluno ? {
            nome: aluno.nome,
            email: aluno.email,
            numero_chamada: aluno.numero,
            na_chamada: aluno.naChamada,
        } : null,
        turmaCodigo: ehAluno ? turma.codigo : null,
    };
}

/**
 * Transforma a lista de presença em usuários do Auth mais a linha da tabela aluno.
 * @param {{turmas: Object[]}} lista - Lista (ou turmas reunidas) do LISTAPRESENCA.js.
 * @returns {Object[]} Usuários: email, senha, appMetadata, userMetadata, linhaAluno.
 */
function montarUsuariosDaLista(lista) {
    return lista.turmas.flatMap((turma) => (
        turma.alunos.map((aluno) => montarUsuarioDaLista(aluno, turma))));
}

/**
 * Lista os problemas que impedem a gravação (e-mail ausente ou repetido, senha curta).
 * @param {Object[]} usuarios - Usuários montados.
 * @returns {string[]} Problemas encontrados; vazio se estiver tudo certo.
 */
function validarUsuariosDaLista(usuarios) {
    const problemas = [];
    const vistos = new Set();
    usuarios.forEach((usuario) => {
        if (!usuario.email) problemas.push('Aluno sem e-mail: ' + usuario.userMetadata.nome);
        if (vistos.has(usuario.email)) problemas.push('E-mail repetido: ' + usuario.email);
        if ((usuario.senha || '').length < TAMANHO_MINIMO_SENHA_USUARIO) {
            problemas.push('Senha curta: ' + usuario.email);
        }
        vistos.add(usuario.email);
    });
    return problemas;
}

/**
 * Lista os usuários que já existem no Auth, por e-mail.
 * @param {string} chave - Chave service_role.
 * @returns {Promise<Map<string, string>>} Mapa e-mail → id.
 */
async function listarExistentesUsuarios(chave) {
    const existentes = new Map();
    for (let pagina = 1; ; pagina += 1) {
        const rota = ROTA_ADMIN + '?page=' + pagina + '&per_page=' + POR_PAGINA_USUARIOS;
        const usuarios = (await chamarApiUsuarios(rota, {}, chave))?.users || [];
        usuarios.forEach((u) => existentes.set((u.email || '').toLowerCase(), u.id));
        if (usuarios.length < POR_PAGINA_USUARIOS) return existentes;
    }
}

/**
 * Cria o usuário (POST) ou atualiza os metadados de quem já existe (PUT).
 * @param {Object} usuario - Usuário montado.
 * @param {Map<string, string>} existentes - Mapa e-mail → id.
 * @param {{chave: string, redefinirSenhas: boolean}} contexto - Chave e opção.
 * @returns {Promise<{id: string, resultado: string, senhaGravada: boolean}>} Id (auth.users.id),
 *   "criado" ou "atualizado" e se a senha foi gravada no Auth (criação ou senha regravada).
 */
async function gravarUsuarioAuthPagina(usuario, existentes, contexto) {
    const corpo = {
        email: usuario.email,
        app_metadata: usuario.appMetadata,
        user_metadata: usuario.userMetadata,
        email_confirm: true,
    };
    const idExistente = existentes.get(usuario.email.toLowerCase());
    if (!idExistente) {
        const criado = await chamarApiUsuarios(ROTA_ADMIN,
            { metodo: 'POST', corpo: { ...corpo, password: usuario.senha } }, contexto.chave);
        return { id: criado.id, resultado: 'criado', senhaGravada: true };
    }
    if (contexto.redefinirSenhas) corpo.password = usuario.senha;
    await chamarApiUsuarios(ROTA_ADMIN + '/' + idExistente,
        { metodo: 'PUT', corpo }, contexto.chave);
    return { id: idExistente, resultado: 'atualizado', senhaGravada: contexto.redefinirSenhas };
}

/**
 * Grava (upsert) linhas numa tabela pela API REST.
 * @param {string} tabela - Nome da tabela.
 * @param {Object[]} linhas - Linhas a gravar.
 * @param {string} chave - Chave service_role.
 */
async function gravarTabelaUsuarios(tabela, linhas, chave) {
    if (!linhas.length) return;

    await chamarApiUsuarios(ROTA_REST_USUARIOS + tabela, {
        metodo: 'POST',
        corpo: linhas,
        headers: { Prefer: PREFER_MESCLAR },
    }, chave);
}

/**
 * Troca, na mensagem de erro, toda senha das linhas por asteriscos (a senha nunca vai ao log).
 * @param {string} mensagem - Mensagem de erro da API.
 * @param {Object[]} linhasSenha - Linhas {usuario_id, senha_inicial, atualizado_em}.
 * @returns {string} Mensagem sem as senhas.
 */
function ocultarSenhasDaMensagem(mensagem, linhasSenha) {
    return linhasSenha.reduce((texto, linha) => (
        texto.split(linha.senha_inicial).join(SENHA_OCULTA_LOG)), String(mensagem));
}

/**
 * Guarda (upsert) a senha inicial de quem foi criado ou teve a senha regravada no Auth. Roda
 * depois da tabela usuario (chave estrangeira). Falha não derruba a gravação: vai para o log.
 * @param {{linhas: Object[], emails: string[]}} senhas - Linhas da tabela e e-mail de cada uma.
 * @param {{chave: string, aoResultado: Function}} contexto - Chave service_role e callback de log.
 * @returns {Promise<{senhasGravadas: number, senhasComErro: number}>} Contagem para o resumo.
 */
async function gravarSenhasIniciais(senhas, contexto) {
    const { linhas, emails } = senhas;
    if (!linhas.length) return { senhasGravadas: 0, senhasComErro: 0 };

    try {
        const rota = ROTA_REST_USUARIOS + TABELA_SENHA_INICIAL
            + '?on_conflict=' + CONFLITO_SENHA_INICIAL;
        await chamarApiUsuarios(rota, {
            metodo: 'POST',
            corpo: linhas,
            headers: { Prefer: PREFER_MESCLAR },
        }, contexto.chave);
        return { senhasGravadas: linhas.length, senhasComErro: 0 };
    } catch (erro) {
        const motivo = ocultarSenhasDaMensagem(erro.message, linhas);
        emails.forEach((email) => contexto.aoResultado(
            SITUACAO_ERRO_SENHA + ' (' + motivo + ')', email));
        return { senhasGravadas: 0, senhasComErro: linhas.length };
    }
}

/**
 * Grava os vínculos aluno × turma na turmaaluno (fonte única da turma do aluno); vínculo que já
 * existe é ignorado. O banco copia a turma principal para aluno.turma_codigo e o app_metadata.
 * @param {Object[]} vinculos - Linhas {turma_codigo, aluno_id}.
 * @param {string} chave - Chave service_role.
 */
async function gravarVinculosTurmaAluno(vinculos, chave) {
    if (!vinculos.length) return;

    await chamarApiUsuarios(ROTA_REST_USUARIOS + 'turmaaluno?on_conflict=turma_codigo,aluno_id', {
        metodo: 'POST',
        corpo: vinculos,
        headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    }, chave);
}

/**
 * Grava cada usuário no Auth sem parar no primeiro erro.
 * @param {Object[]} usuarios - Usuários montados.
 * @param {{chave: string, redefinirSenhas: boolean}} contexto - Chave e opção.
 * @param {Function} aoResultado - Chamada com (situação, e-mail) a cada usuário.
 * @returns {Promise<{resumo: Object, alunos: Object[], linhasUsuario: Object[],
 *   vinculos: Object[], senhas: {linhas: Object[], emails: string[]}}>} Resumo e as linhas das
 *   tabelas aluno, usuario, turmaaluno e usuario_senha_inicial (id do auth.users como chave).
 */
async function gravarUsuariosNoAuth(usuarios, contexto, aoResultado) {
    const existentes = await listarExistentesUsuarios(contexto.chave);
    const resumo = { criado: 0, atualizado: 0, erro: 0 };
    const linhas = {
        alunos: [], linhasUsuario: [], vinculos: [], senhas: { linhas: [], emails: [] },
    };
    for (const usuario of usuarios) {
        try {
            const gravado = await gravarUsuarioAuthPagina(usuario, existentes, contexto);
            resumo[gravado.resultado] += 1;
            acumularLinhasDoUsuario(linhas, usuario, gravado);
            aoResultado(gravado.resultado, usuario.email);
        } catch (erro) {
            resumo.erro += 1;
            aoResultado('erro (' + erro.message + ')', usuario.email);
        }
    }
    return { resumo, ...linhas };
}

/**
 * Junta as linhas das tabelas de um usuário já gravado no Auth. A senha inicial só entra quando
 * foi gravada no Auth (usuário criado ou senha regravada).
 * @param {Object} linhas - Listas alunos, linhasUsuario, vinculos e senhas (alteradas aqui).
 * @param {Object} usuario - Usuário montado.
 * @param {{id: string, senhaGravada: boolean}} gravado - Id do auth.users e se a senha foi gravada.
 */
function acumularLinhasDoUsuario(linhas, usuario, gravado) {
    const { id } = gravado;
    linhas.linhasUsuario.push({ id, ...usuario.linhaUsuario });
    if (usuario.linhaAluno) linhas.alunos.push({ id, ...usuario.linhaAluno });
    if (usuario.turmaCodigo) {
        linhas.vinculos.push({ turma_codigo: usuario.turmaCodigo, aluno_id: id });
    }
    if (!gravado.senhaGravada) return;

    linhas.senhas.linhas.push({
        usuario_id: id,
        senha_inicial: usuario.senha,
        atualizado_em: new Date().toISOString(),
    });
    linhas.senhas.emails.push(usuario.email);
}

/**
 * Grava turmas, usuários do Auth e alunos no Supabase.
 * @param {{turmas: Object[]}} lista - Lista (ou turmas reunidas) do LISTAPRESENCA.js.
 * @param {{redefinirSenhas: boolean, aoResultado: Function}} opcoes - Opção e callback de log.
 * @returns {Promise<Object>} Resumo com criado, atualizado, erro, senhasGravadas e senhasComErro.
 * @throws {Error} Se a chave, o host ou os dados forem inválidos.
 */
async function gravarListaNoSupabase(lista, opcoes) {
    const chave = obterChaveServico();
    const usuarios = montarUsuariosDaLista(lista);
    const problemas = validarUsuariosDaLista(usuarios);
    if (problemas.length) throw new Error('Nada foi gravado. ' + problemas.join('; '));

    // Turma virtual (aba "Professores") é só agrupamento da página: não vai para a tabela turma.
    // A unidade vai só como unidade_id (tabela unidade; campo unidadeId da turma na lista). Sem ele,
    // a turma que já existe mantém a unidade gravada (upsert só altera as colunas enviadas).
    const turmas = lista.turmas.filter((t) => !t.virtual).map((t) => ({
        codigo: t.codigo, nome: t.nome, turno: t.turno, horario: t.horario,
        ...(t.unidadeId ? { unidade_id: t.unidadeId } : {}), ...(t.uc ? { uc: t.uc } : {}),
    }));
    await gravarTabelaUsuarios('turma', turmas, chave);
    const contexto = { chave, redefinirSenhas: opcoes.redefinirSenhas };
    const { resumo, alunos, linhasUsuario, vinculos, senhas } = await gravarUsuariosNoAuth(
        usuarios, contexto, opcoes.aoResultado);
    await gravarTabelaUsuarios('usuario', linhasUsuario, chave);
    const contagemSenhas = await gravarSenhasIniciais(senhas,
        { chave, aoResultado: opcoes.aoResultado });
    await gravarTabelaUsuarios('aluno', alunos, chave);
    await gravarVinculosTurmaAluno(vinculos, chave);
    return { ...resumo, ...contagemSenhas };
}

/**
 * Consulta em auth.users (pela API admin) quais e-mails já estão cadastrados.
 * @returns {Promise<Map<string, string>>} Mapa e-mail (minúsculo) → id do usuário.
 * @throws {Error} Se o host não for local, a chave faltar ou a API recusar.
 */
async function consultarCadastradosUsuarios() {
    return listarExistentesUsuarios(obterChaveServico());
}

/**
 * Consulta na tabela usuario quais usuários já tiveram a senha informada ("Aluno anotou?").
 * A chave é a mesma do auth.users (usuario.id = auth.users.id).
 * @returns {Promise<Set<string>>} Ids (auth.users.id) com senha_informada = true.
 * @throws {Error} Se o host não for local, a chave faltar ou a API recusar.
 */
async function consultarSenhasInformadas() {
    const linhas = await chamarApiUsuarios(
        ROTA_REST_USUARIOS + 'usuario?select=id&senha_informada=eq.true', {}, obterChaveServico());
    return new Set(linhas.map((linha) => linha.id));
}

/**
 * Grava na tabela usuario se a senha inicial foi informada ao usuário (e quando).
 * @param {string} usuarioId - Id do usuário (mesmo id do auth.users).
 * @param {boolean} informada - true = senha informada; false = desfaz o registro.
 * @returns {Promise<boolean>} true se a linha do usuário foi encontrada e atualizada.
 * @throws {Error} Se o host não for local, a chave faltar ou a API recusar.
 */
async function gravarSenhaInformada(usuarioId, informada) {
    const filtro = 'usuario?id=eq.' + encodeURIComponent(usuarioId);
    const atualizadas = await chamarApiUsuarios(ROTA_REST_USUARIOS + filtro, {
        metodo: 'PATCH',
        corpo: {
            senha_informada: informada,
            senha_informada_em: informada ? new Date().toISOString() : null,
        },
        headers: { Prefer: 'return=representation' },
    }, obterChaveServico());
    return atualizadas.length > 0;
}
