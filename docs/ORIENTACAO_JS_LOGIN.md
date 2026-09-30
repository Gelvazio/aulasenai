# 📚 ORIENTACAO_JS_LOGIN.md

> Atualizado em 2026-09-28: login migrado para **Supabase Auth** (plano
> `docs/login-html-supabase-auth.md`). O fluxo antigo (SHA-256 comparado com a tabela `usuario`)
> e o cadastro pela página foram removidos.

## Propósito
Autenticar alunos e professores pelo Supabase Auth, guardar os dados de exibição da sessão e
proteger páginas (ex.: atividades) redirecionando para o login.

## Localização
- Página: `login.html` (raiz do projeto) + `assets/css/login.css`
- Script: `js/login.js`
- Depende de: `@supabase/supabase-js@2` (CDN jsdelivr) e `js/supabase.js` (`obterClienteSupabase`)

Ordem obrigatória dos scripts na página:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase.js"></script>
<script src="js/login.js"></script>
```

## Fluxo de Login
```
1. Aluno digita usuário (nome.sobrenome) ou e-mail completo + senha
2. Sem "@": completa com @senai.local (DOMINIO_ALUNO)
3. supabase.auth.signInWithPassword({ email, password })
4. OK  → salva dados de exibição no sessionStorage e vai para ?voltar= (só páginas do próprio site)
         ou, sem o parâmetro, para index.html
5. ERRO → "Usuário ou senha incorretos." (não informa qual campo errou)
6. Já logado ao abrir login.html → painel "Você já está conectado como X" + Continuar / Sair
```

## Contas
- Criadas **só pelo professor**: `scripts/criar-usuarios-supabase-auth.js` (lê
  `ATIVIDADES/LISTA-PRESENCA.js`). Não há cadastro na página.
- E-mail padrão `nome.sobrenome@senai.local` (regra no `CLAUDE.md`), senha de 6 caracteres.
- `app_metadata` (só a `service_role` altera; usado pelo RLS): `perfil` (ALUNO/PROFESSOR),
  `turma_codigo`. O `login.js` lê **perfil e turma daqui**.
- `user_metadata` (o usuário pode alterar — só exibição): `nome`, `turma_nome`. O `login.js` lê
  apenas nome e nome da turma daqui. ❌ Nunca usar `user_metadata` para perfil/permissão.

## Funções

| Função | Propósito |
|--------|-----------|
| `fazerLogin(evento)` | Envio do formulário: valida, autentica, redireciona |
| `autenticar(email, senha)` | `signInWithPassword` e tradução do erro para o aluno |
| `montarEmail(usuario)` | Completa `nome.sobrenome` com `@senai.local` |
| `obterDestinoSeguro()` | Lê `?voltar=` aceitando só o mesmo site (evita redirecionamento aberto) |
| `verificarAutenticacao()` | Para páginas protegidas: devolve o usuário ou manda para `/login.html?voltar=...` |
| `fazerLogout()` | `signOut()` + limpa sessionStorage + volta ao login |
| `obterUsuarioAtual()` | Dados de exibição do sessionStorage |

## sessionStorage (apenas exibição — a segurança vem do JWT + RLS)
`usuarioId`, `usuarioEmail`, `usuarioNome`, `usuarioPerfil`, `usuarioTurmaCodigo`,
`usuarioTurmaNome`, `usuarioTimestamp`. A sessão do Supabase (token) fica no localStorage,
gerenciada pelo próprio `supabase-js`.

## Como proteger uma página
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/js/supabase.js"></script>
<script src="/js/login.js"></script>
<script src="script-da-pagina.js"></script>  <!-- chama: const usuario = await verificarAutenticacao(); -->
```

## Configuração no painel do Supabase
- Authentication → Providers → Email: **Confirm email** desligado (domínio `senai.local` é interno)
- Authentication: **Allow new users to sign up** desligado
- URL Configuration: Site URL `https://aulas-senai-rsl.vercel.app`

## ✅ Checklist para Modificações
- [ ] Nunca voltar a comparar senha/hash no navegador nem ler a tabela `usuario` para autenticar
- [ ] Mensagem de erro genérica (não revelar se o usuário existe)
- [ ] `?voltar=` continua restrito ao mesmo site
- [ ] Sem `<style>`/`<script>` embutidos em `login.html`
- [ ] Chave usada no front é só a **anon**; `service_role` nunca vai para páginas nem repositório
