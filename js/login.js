// ── Login com Supabase Auth ───────────────────────────
// Depende de: @supabase/supabase-js v2 (CDN) e js/supabase.js (obterClienteSupabase).
// Contas dos alunos: criadas pelo professor (scripts/criar-usuarios-supabase-auth.js), sem cadastro
// na página. Login: "nome.sobrenome" ou o e-mail completo nome.sobrenome@senai.local.

const DOMINIO_ALUNO = "senai.local";
const PAGINA_LOGIN = "/login.html";
const PAGINA_PADRAO = "index.html";
const PARAMETRO_VOLTAR = "voltar";
const TEMPO_REDIRECIONAMENTO_MS = 800;

const MSG_CAMPOS_OBRIGATORIOS = "Informe o usuário e a senha.";
const MSG_AUTENTICANDO = "Autenticando...";
const MSG_CREDENCIAIS_INVALIDAS = "Usuário ou senha incorretos.";
const MSG_SEM_CONEXAO = "Não foi possível conectar ao servidor. Tente novamente.";
const MSG_SUCESSO = "✅ Login realizado! Redirecionando...";
const MSG_BIBLIOTECA_AUSENTE = "Erro ao carregar o login. Recarregue a página.";

const CHAVES_SESSAO = {
  id: "usuarioId",
  email: "usuarioEmail",
  nome: "usuarioNome",
  perfil: "usuarioPerfil",
  turmaCodigo: "usuarioTurmaCodigo",
  turmaNome: "usuarioTurmaNome",
  timestamp: "usuarioTimestamp",
};

const IDS_LOGIN = {
  formulario: "formLogin",
  usuario: "loginUsuario",
  senha: "loginSenha",
  mensagem: "loginMsg",
  botaoEntrar: "btnEntrar",
  telaLogin: "telaLogin",
  painelConectado: "painelConectado",
  textoConectado: "textoConectado",
  botaoContinuar: "btnContinuar",
  botaoSair: "btnSair",
};

/**
 * Completa o login digitado com o domínio dos alunos quando não houver "@".
 * @param {string} usuario - "nome.sobrenome" ou e-mail completo.
 * @returns {string} E-mail em minúsculas.
 */
function montarEmail(usuario) {
  const texto = usuario.trim().toLowerCase();
  if (texto.includes("@")) return texto;
  return texto + "@" + DOMINIO_ALUNO;
}

/**
 * Lê o destino do parâmetro ?voltar=, aceitando só páginas do próprio site.
 * @returns {string} URL de destino segura (padrão: index.html).
 */
function obterDestinoSeguro() {
  const voltar = new URLSearchParams(location.search).get(PARAMETRO_VOLTAR);
  if (!voltar) return PAGINA_PADRAO;
  try {
    const destino = new URL(voltar, location.href);
    const ehMesmoSite = destino.origin === location.origin;
    if (!ehMesmoSite) return PAGINA_PADRAO;
    return destino.pathname + destino.search + destino.hash;
  } catch (erro) {
    return PAGINA_PADRAO;
  }
}

/**
 * Guarda os dados do usuário logado no sessionStorage (dados de exibição, não de segurança).
 * @param {{id: string, email: string, user_metadata: Object}} usuario - Usuário do Supabase Auth.
 */
function salvarSessaoLocal(usuario) {
  const dados = usuario.user_metadata || {};
  sessionStorage.setItem(CHAVES_SESSAO.id, usuario.id);
  sessionStorage.setItem(CHAVES_SESSAO.email, usuario.email);
  sessionStorage.setItem(CHAVES_SESSAO.nome, dados.nome || usuario.email);
  sessionStorage.setItem(CHAVES_SESSAO.perfil, dados.perfil || "ALUNO");
  sessionStorage.setItem(CHAVES_SESSAO.turmaCodigo, dados.turma_codigo || "");
  sessionStorage.setItem(CHAVES_SESSAO.turmaNome, dados.turma_nome || "");
  sessionStorage.setItem(CHAVES_SESSAO.timestamp, String(Date.now()));
}

/**
 * Remove do sessionStorage os dados do usuário logado.
 */
function limparSessaoLocal() {
  Object.values(CHAVES_SESSAO).forEach((chave) => sessionStorage.removeItem(chave));
}

/**
 * Devolve os dados do usuário logado guardados no sessionStorage.
 * @returns {{id: string|null, email: string|null, nome: string|null, perfil: string|null,
 *   turmaCodigo: string|null, turmaNome: string|null}} Dados do usuário (null se ausentes).
 */
function obterUsuarioAtual() {
  return {
    id: sessionStorage.getItem(CHAVES_SESSAO.id),
    email: sessionStorage.getItem(CHAVES_SESSAO.email),
    nome: sessionStorage.getItem(CHAVES_SESSAO.nome),
    perfil: sessionStorage.getItem(CHAVES_SESSAO.perfil),
    turmaCodigo: sessionStorage.getItem(CHAVES_SESSAO.turmaCodigo),
    turmaNome: sessionStorage.getItem(CHAVES_SESSAO.turmaNome),
  };
}

/**
 * Exibe uma mensagem de status no formulário de login.
 * @param {string} mensagem - Texto a exibir.
 * @param {"erro"|"sucesso"|"info"} tipo - Tipo da mensagem (define a cor via CSS).
 */
function mostrarMsgLogin(mensagem, tipo) {
  const elemento = document.getElementById(IDS_LOGIN.mensagem);
  if (!elemento) return;
  elemento.textContent = mensagem;
  elemento.className = "login-mensagem login-mensagem--" + tipo;
}

/**
 * Habilita ou desabilita o botão Entrar enquanto a autenticação acontece.
 * @param {boolean} estaAguardando - true durante a chamada ao Supabase.
 */
function definirAguardando(estaAguardando) {
  const botao = document.getElementById(IDS_LOGIN.botaoEntrar);
  if (botao) botao.disabled = estaAguardando;
}

/**
 * Autentica no Supabase Auth com e-mail e senha.
 * @param {string} email - E-mail do aluno.
 * @param {string} senha - Senha do aluno.
 * @returns {Promise<Object>} Usuário autenticado.
 * @throws {Error} Com a mensagem a exibir ao aluno.
 */
async function autenticar(email, senha) {
  const cliente = obterClienteSupabase();
  if (!cliente) throw new Error(MSG_BIBLIOTECA_AUSENTE);

  const { data, error } = await cliente.auth.signInWithPassword({ email, password: senha });
  if (!error) return data.user;
  const ehCredencialInvalida = error.status === 400 || /invalid/i.test(error.message || "");
  throw new Error(ehCredencialInvalida ? MSG_CREDENCIAIS_INVALIDAS : MSG_SEM_CONEXAO);
}

/**
 * Trata o envio do formulário de login.
 * @param {SubmitEvent} evento - Evento de envio do formulário.
 */
async function fazerLogin(evento) {
  evento.preventDefault();
  const usuario = document.getElementById(IDS_LOGIN.usuario).value;
  const senha = document.getElementById(IDS_LOGIN.senha).value;
  const camposPreenchidos = usuario.trim() && senha;
  if (!camposPreenchidos) {
    mostrarMsgLogin(MSG_CAMPOS_OBRIGATORIOS, "erro");
    return;
  }

  mostrarMsgLogin(MSG_AUTENTICANDO, "info");
  definirAguardando(true);
  try {
    salvarSessaoLocal(await autenticar(montarEmail(usuario), senha));
    mostrarMsgLogin(MSG_SUCESSO, "sucesso");
    setTimeout(() => location.assign(obterDestinoSeguro()), TEMPO_REDIRECIONAMENTO_MS);
  } catch (erro) {
    mostrarMsgLogin(erro.message, "erro");
    definirAguardando(false);
  }
}

/**
 * Encerra a sessão no Supabase Auth, limpa os dados locais e volta para a página de login.
 */
async function fazerLogout() {
  const cliente = obterClienteSupabase();
  try {
    if (cliente) await cliente.auth.signOut();
  } finally {
    limparSessaoLocal();
    location.assign(PAGINA_LOGIN);
  }
}

/**
 * Garante que há sessão ativa; sem sessão, manda para o login com retorno à página atual.
 * Para usar nas páginas protegidas (ex.: atividades).
 * @returns {Promise<Object|null>} Usuário logado, ou null (redirecionando para o login).
 */
async function verificarAutenticacao() {
  const cliente = obterClienteSupabase();
  const { data } = cliente ? await cliente.auth.getSession() : { data: null };
  const usuario = data?.session?.user;
  if (usuario) {
    salvarSessaoLocal(usuario);
    return usuario;
  }
  const retorno = location.pathname + location.search + location.hash;
  location.assign(PAGINA_LOGIN + "?" + PARAMETRO_VOLTAR + "=" + encodeURIComponent(retorno));
  return null;
}

/**
 * Mostra o painel "já conectado" no lugar do formulário.
 * @param {Object} usuario - Usuário do Supabase Auth.
 */
function mostrarConectado(usuario) {
  salvarSessaoLocal(usuario);
  const nome = obterUsuarioAtual().nome;
  document.getElementById(IDS_LOGIN.telaLogin).hidden = true;
  document.getElementById(IDS_LOGIN.painelConectado).hidden = false;
  document.getElementById(IDS_LOGIN.textoConectado).textContent =
    "Você já está conectado como " + nome + ".";
}

/**
 * Inicia a página de login: liga o formulário e os botões e verifica se já há sessão.
 */
async function iniciarPaginaLogin() {
  const formulario = document.getElementById(IDS_LOGIN.formulario);
  if (!formulario) return;

  formulario.addEventListener("submit", fazerLogin);
  document.getElementById(IDS_LOGIN.botaoSair)?.addEventListener("click", fazerLogout);
  document.getElementById(IDS_LOGIN.botaoContinuar)?.addEventListener("click", () => {
    location.assign(obterDestinoSeguro());
  });

  const cliente = obterClienteSupabase();
  if (!cliente) {
    mostrarMsgLogin(MSG_BIBLIOTECA_AUSENTE, "erro");
    return;
  }
  const { data } = await cliente.auth.getSession();
  if (data?.session?.user) mostrarConectado(data.session.user);
}

iniciarPaginaLogin();
