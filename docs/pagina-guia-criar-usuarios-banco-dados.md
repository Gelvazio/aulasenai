# 🧭 Página guia para criar usuários no Supabase Auth

**Criado em:** 2026-09-29
**Concluído em:** 2026-09-29
**Tempo decorrido:** —
**Status geral:** ✅ Concluído

## 🎯 Objetivo

`scripts/criarUsuariosBancoDados.html` lê `scripts/LISTA-PRESENCA-CEPLAS-MANHA.js` (arquivo local,
fora do Git), lista os alunos **sem senhas** e monta o comando de
`scripts/criar-usuarios-supabase-auth.js` para o professor copiar e rodar no PowerShell.

## 🔒 Restrições

- A página **não** tem campo de chave nem de senha e **não** grava no Supabase.
- A chave `service_role` só é definida no terminal (`$env:SUPABASE_SERVICE_ROLE_KEY`).
- A página não contém dados de alunos: eles vêm do `.js` local; sem o arquivo, a página avisa.

## 📁 Arquivos

| Arquivo | Ação |
|---------|------|
| `scripts/criarUsuariosBancoDados.html` | Estrutura da página |
| `assets/css/criar-usuarios-comando.css` | Estilos |
| `assets/js/criar-usuarios-comando.js` | Lê `window.LISTA_PRESENCA`, lista alunos, monta e copia o comando |

## 📋 Passos

| # | Estado | Passo |
|---|--------|-------|
| 1 | ✅ Concluído | Criar CSS e JS em `assets/` |
| 2 | ✅ Concluído | Criar o HTML da página |
| 3 | ✅ Concluído | Verificar sintaxe do JS |

## ✅ Resultado final

Página criada; o comando gerado chama `node scripts/criar-usuarios-supabase-auth.js <lista>` com
`--executar` e `--redefinir-senhas` opcionais.
