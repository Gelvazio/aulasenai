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

## Ajuste: aba "Professores" (2026-10-07)

- Todo item com `perfil: 'PROFESSOR'`, de qualquer `LISTA-PRESENCA*.js`, sai da aba da sua turma e
  aparece só na aba **Professores** (a primeira), sem repetir e-mail, em ordem alfabética e
  numerada de 1 em diante. Turma que fica vazia sem os professores não aparece.
- A aba aparece sempre (sem professor nas listas, mostra o aviso). Perfil lido sem diferenciar maiúsculas.
- É uma turma **virtual** (`codigo: 'PROFESSORES'`, `virtual: true`): não é gravada na tabela
  `turma`, não tem botão de turma favorita e não vai para o `user_metadata` do professor.
- Gravar pela aba cria/atualiza a conta no Auth com `app_metadata.perfil = 'PROFESSOR'` e a linha
  na tabela `usuario`; não cria linha em `aluno` nem vínculo em `turmaaluno`.
- Código: `assets/js/criar-usuarios-pagina.js` (`montarTurmaProfessoresGuia`,
  `reunirTurmasPresenca`) e `assets/js/criar-usuarios-api.js` (ignora a turma virtual).
- **Fonte da aba = `scripts/LISTA-PRESENCA-PROFESSOR.js`** (2026-10-07): todas as pessoas desse
  arquivo vão para a aba Professores com perfil PROFESSOR, mesmo sem o campo `perfil`. O
  `assets/js/criar-usuarios-antes-professores.js`, carregado logo antes dele no HTML, guarda como
  estavam as listas para a página saber o que veio do arquivo (vale com `window.LISTA_PRESENCA =` ou
  `window.LISTAS_PRESENCA.push(...)`). Quem tem perfil PROFESSOR em outras listas também entra.
