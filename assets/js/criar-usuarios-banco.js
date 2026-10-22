// Modo banco da página scripts/criarUsuariosBancoDados.html (site publicado, sem o
// scripts/LISTAPRESENCA.js nem o scripts/variaveis.js): lê turmas, alunos e a senha inicial de
// cada um pela RPC listar_usuarios_senhas(), chamada com o JWT do usuário logado. Quem decide se
// pode ver é o banco: a RPC devolve erro 42501 para quem não tem perfil PROFESSOR.
// Só leitura: nada é gravado e a senha nunca vai para localStorage ou sessionStorage.
// Depende de js/supabase.js (obterClienteSupabase).

const RPC_USUARIOS_SENHAS = 'listar_usuarios_senhas';
const CODIGO_SEM_PERMISSAO_BANCO = '42501';
const MSG_SEM_CLIENTE_BANCO = 'A biblioteca do Supabase não foi carregada nesta página.';
const MSG_ERRO_RPC_BANCO = 'Não foi possível carregar a lista de alunos do banco de dados: ';

/**
 * Diz se a página está no modo banco: a lista local (window.LISTAS_PRESENCA, do
 * scripts/LISTAPRESENCA.js) não foi carregada, como no site publicado.
 * @returns {boolean} true quando a lista deve vir do banco.
 */
function estaEmModoBancoUsuarios() {
    return !window.LISTAS_PRESENCA;
}

/**
 * Cria o erro devolvido quando a RPC falha, marcando a falta de permissão.
 * @param {{code?: string, message?: string}} erroRpc - Erro do supabase-js.
 * @returns {Error} Erro com a propriedade semPermissao.
 */
function criarErroRpcUsuarios(erroRpc) {
    const erro = new Error(MSG_ERRO_RPC_BANCO + (erroRpc.message || erroRpc.code || ''));
    erro.semPermissao = erroRpc.code === CODIGO_SEM_PERMISSAO_BANCO;
    return erro;
}

/**
 * Busca no banco os alunos de todas as turmas com a senha inicial (RPC listar_usuarios_senhas).
 * @param {Object|null} cliente - Cliente supabase-js com a sessão do usuário logado (JWT).
 * @returns {Promise<Object[]>} Linhas da RPC (turma_codigo, turma_nome, numero_chamada,
 *     usuario_id, nome, email, senha_inicial, desistente).
 * @throws {Error} Sem cliente ou se a RPC falhar (erro.semPermissao = true no 42501).
 */
async function buscarUsuariosSenhasBanco(cliente) {
    if (!cliente) throw new Error(MSG_SEM_CLIENTE_BANCO);

    const { data, error } = await cliente.rpc(RPC_USUARIOS_SENHAS);
    if (error) throw criarErroRpcUsuarios(error);
    return data || [];
}

/**
 * Converte uma linha da RPC no aluno usado pela tabela da página.
 * @param {Object} linha - Linha da RPC.
 * @returns {{numero: number|string, nome: string, email: string, senha: string|null,
 *     usuarioId: string}} Aluno.
 */
function converterLinhaEmAlunoBanco(linha) {
    return {
        numero: linha.numero_chamada ?? '',
        nome: linha.nome || '',
        email: linha.email || '',
        senha: linha.senha_inicial ?? null,
        usuarioId: linha.usuario_id,
    };
}

/**
 * Agrupa as linhas da RPC por turma, sem os desistentes, mantendo a ordem do banco
 * (turma, número de chamada, nome). Turma que fica sem alunos não aparece.
 * @param {Object[]} linhas - Linhas da RPC.
 * @returns {Object[]} Turmas no formato da página: { codigo, nome, alunos }.
 */
function agruparTurmasBanco(linhas) {
    const porCodigo = new Map();
    linhas.filter((linha) => linha.desistente !== true).forEach((linha) => {
        const codigo = String(linha.turma_codigo ?? '');
        if (!porCodigo.has(codigo)) {
            porCodigo.set(codigo, { codigo, nome: linha.turma_nome || codigo, alunos: [] });
        }
        porCodigo.get(codigo).alunos.push(converterLinhaEmAlunoBanco(linha));
    });
    return [...porCodigo.values()];
}
