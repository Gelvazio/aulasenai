# 🔐 Página `login.html` com Supabase Auth

**Criado em:** 2026-09-28 15:35
**Concluído em:** 2026-09-28 15:55
**Tempo decorrido:** ~20 min
**Status geral:** ✅ Concluído (teste real de login pendente com o usuário)

---

## 🎯 Objetivo

Criar a página `login.html` (raiz do projeto) e reescrever `js/login.js` para autenticar pelo
**Supabase Auth** (`signInWithPassword`), usando os alunos criados por
`scripts/criar-usuarios-supabase-auth.js` (e-mail `nome.sobrenome@senai.local`).

## 📌 Contexto

- `index.html` da raiz **não tem login** (é só o índice de cursos) — não há nada a migrar dele.
- `js/login.js` existe, mas sem página e com o método antigo (SHA-256 comparado com a tabela
  `usuario` pela chave anônima), contrário ao `docs/ORIENTACAO_USUARIO.md`.
- Nenhuma página HTML carrega hoje `js/login.js` ou `js/supabase.js`; `curso.js`, `aulas.js`,
  `materia.js` e `unidade.js` usam `sbGet/sbPost/...` de `js/supabase.js`.

## 📦 Escopo

**Dentro:**
1. `login.html` na raiz, sem `<style>`/`<script>` embutidos.
2. `assets/css/login.css` (visual da página).
3. `js/supabase.js`: cliente `supabase-js` v2 compartilhado e `sbH()` com o **JWT do usuário**
   (regra crítica do `CLAUDE.md`); `sbGet/sbPost/sbPatch/sbDelete` passam a aguardar `sbH()`.
4. `js/login.js` reescrito: login, logout, sessão, redirecionamento de volta.

**Fora (próximas etapas):** exigir login nas atividades, gravar respostas no banco, tabelas
`turma/aluno/resposta_atividade`, painel do professor, RLS da tabela `usuario`.

## 🛠️ Tecnologias

HTML5, CSS3, JavaScript (vanilla), `@supabase/supabase-js` v2 via
`https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`.

## 🗂️ Arquivos previstos

| Arquivo | Ação |
|---------|------|
| `login.html` | Criar |
| `assets/css/login.css` | Criar |
| `js/login.js` | Reescrever |
| `js/supabase.js` | Alterar (cliente + `sbH()` com JWT) |
| `docs/ORIENTACAO_JS_LOGIN.md` | Atualizar para o novo fluxo |
| `docs/ORIENTACAO_JS_SUPABASE.md` | Atualizar (`sbH()` assíncrono com JWT) |
| `CLAUDE.md` | Registrar os arquivos novos em `assets/` |

## 🔄 Fluxo do login

1. Aluno digita **usuário** (`andrei.fernandes`) ou e-mail completo e a **senha**.
2. Se não tiver `@`, o script completa com `@senai.local` (constante `DOMINIO_ALUNO`).
3. `supabase.auth.signInWithPassword({ email, password })`.
4. Sucesso: guarda em `sessionStorage` nome, perfil e turma (de `user_metadata`, gravados pelo
   script de criação) e redireciona para o parâmetro `?voltar=` (só caminhos relativos do próprio
   site; qualquer outro valor é ignorado) ou, sem ele, para `index.html`.
5. Erro: mensagem "Usuário ou senha incorretos" (sem dizer qual dos dois errou).
6. Já logado ao abrir a página: mostra "Você já está conectado como X" + botões Continuar / Sair.
7. `fazerLogout()`: `supabase.auth.signOut()` + limpa `sessionStorage`.

**Sem cadastro na página:** as contas dos alunos são criadas só pelo professor (script).
As funções `fazerCadastro`, `calcularSHA256` e a tela de cadastro deixam de existir.

## ⚙️ Configurações no painel do Supabase (feitas pelo usuário)

| Onde | Ajuste |
|------|--------|
| Authentication → Providers → Email | Desligar **Confirm email** |
| Authentication → Sign In / Providers | Desligar **Allow new users to sign up** (ninguém cria conta sozinho) |
| Authentication → URL Configuration | Site URL `https://aulas-senai-rsl.vercel.app` |
| Project Settings → API | Se as chaves foram trocadas, informar a nova chave **anon** para o `js/supabase.js` |

## ⚠️ Riscos e dependências

- Projeto Supabase **pausado**: o login só funciona depois de reativado.
- Usuários ainda **não confirmados** como criados (resumo do script não foi informado).
- Chave `service_role` foi exposta no chat: deve ser trocada; a troca muda também a chave anon.
- `sbH()` assíncrono muda `sbGet/sbPost/...` por dentro; quem chama continua usando `await`, mas
  `curso.js`, `aulas.js`, `materia.js` e `unidade.js` devem ser conferidos.
- Nenhuma página hoje depende do `login.js` antigo, então não há quebra para usuários atuais.

## 📝 Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Reler `ORIENTACAO_USUARIO.md` e `ORIENTACAO_JS_SUPABASE.md` | docs | Regras aplicadas | ✅ Concluído |
| 2 | Criar cliente compartilhado e `sbH()` com JWT | `js/supabase.js` | `node --check`; conferir chamadas em `js/*.js` | ✅ Concluído |
| 3 | Reescrever login/logout/sessão/redirecionamento | `js/login.js` | `node --check`; funções ≤ 45 linhas com JSDoc | ✅ Concluído |
| 4 | Criar a página de login | `login.html`, `assets/css/login.css` | Sem `<style>`/`<script>` embutidos | ✅ Concluído |
| 5 | Atualizar documentação e registro de `assets/` | `docs/ORIENTACAO_JS_LOGIN.md`, `docs/ORIENTACAO_JS_SUPABASE.md`, `CLAUDE.md` | Leitura | ✅ Concluído |
| 6 | Conferir a página abrindo no servidor local (sem entrar com senha de aluno) | `login.html` | Página carrega, validações de campo vazio | ✅ Concluído |
| 7 | Teste real de login feito pelo usuário (projeto reativado) | — | Entrar com um aluno e voltar para a atividade | ⛔ Depende do usuário |
| 8 | Commit (e push se pedido) | — | Hash do commit | ✅ Concluído |

## ✅ Resultado final

- `login.html` + `assets/css/login.css` criados; `js/login.js` reescrito (Supabase Auth, sem cadastro).
- `js/supabase.js`: cliente compartilhado e `sbH()` assíncrono com JWT; funções de diagnóstico removidas.
- Verificado no servidor local: biblioteca carrega, validação de campos vazios, montagem do e-mail,
  `?voltar=` externo bloqueado e interno aceito; sem erros no console.
- Pendente: reativar o projeto Supabase, confirmar criação dos 66 usuários, ajustes no painel e teste
  real de login pelo usuário.
