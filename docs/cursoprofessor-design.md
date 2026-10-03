# Atribuição de cursos a professores

**Objetivo:** cadastrar os cursos de cada professor na tabela `cursoprofessor`, oferecer a manutenção dos vínculos em uma tela administrativa e filtrar o índice inicial para mostrar a cada professor somente os cursos atribuídos.

**Aprovação do desenho:** aprovada pelo usuário em 2026-10-02.
**Rótulo do menu:** `CURSOS`.
**Página administrativa proposta:** `cursos-professor.html`, seguindo o padrão de `turmas.html`.
**Data:** 2026-10-02.

## Status geral

| Etapa | Descrição | Status |
|---|---|---|
| 1 | Registrar o desenho técnico e as regras de acesso | ✅ Concluída |
| 2 | Revisar e aprovar esta especificação | ✅ Aprovada pelo usuário |
| 3 | Preparar plano detalhado de implementação | ✅ Preparado; aguardando revisão |
| 4 | Implementar migração SQL, CRUD administrativo e item `CURSOS` | ⬜ Pendente |
| 5 | Filtrar os cursos do índice conforme os vínculos | ⬜ Pendente |
| 6 | Atualizar documentação do banco e instruções do projeto | ⬜ Pendente |
| 7 | Revisar os arquivos sem executar testes e criar commit local | ⬜ Pendente |

## Desenho aprovado

### Tabela e integridade

Criar `public.cursoprofessor` com:

- `id bigint generated always as identity primary key`;
- `curso_id bigint not null` referenciando `public.curso(id)`;
- `professor_id uuid not null` referenciando `auth.users(id)`;
- `criado_em timestamptz not null default now()` e `criado_por uuid default auth.uid()` referenciando `auth.users(id)` com `on delete set null`;
- unicidade de `(curso_id, professor_id)` e índices para busca por curso e professor;
- trigger que só aceite usuários cujo `raw_app_meta_data.perfil` no Auth seja `PROFESSOR`.

A migração ficará versionada em `database/2026-10-02-cursoprofessor.sql`, será idempotente e não apagará dados.

### Permissões

- Ativar RLS e negar acesso a `anon`.
- O professor lê somente os próprios vínculos; o Professor Administrador lê todos.
- Somente o Professor Administrador confirmado pela função existente `eh_professor_administrador()` pode inserir, alterar ou excluir vínculos.
- Não usar e-mail ou `user_metadata` no navegador para conceder privilégios, nem expor chave `service_role`.

### Tela e menu

- Criar `cursos-professor.html` para administrar os vínculos, com seleção de curso e professor, edição, exclusão e prevenção visual de duplicatas; a restrição única no banco é a proteção definitiva contra duplicatas.
- Seguir a experiência de `turmas.html` e seus padrões de Supabase, tabela e mensagens.
- Acrescentar o item `CURSOS` ao menu do Professor Administrador em `js/header-usuario.js`; o item abre a tela administrativa.

### Índice de cursos

- Alterar `assets/js/indice-cursos.js` para, quando o usuário autenticado tiver perfil `PROFESSOR`, obter seus `curso_id` em `cursoprofessor` e buscar somente esses cursos.
- Para o Professor Administrador, usar `eh_professor_administrador()` e manter todos os cursos visíveis.
- Professor sem vínculos recebe estado vazio, sem fallback para a lista completa.
- Hipótese a confirmar na revisão: visitantes e alunos mantêm o catálogo atual completo; a restrição nova se aplica à sessão de professor.
- Manter a ordenação por nome, descrições, caminhos existentes e proteção contra injeção de HTML.

## Arquivos previstos

| Arquivo | Mudança |
|---|---|
| `database/2026-10-02-cursoprofessor.sql` | Nova tabela, trigger, RLS, grants e políticas |
| `cursos-professor.html` | Nova tela de administração |
| `assets/js/cursos-professor-repositorio.js` | Leitura e gravação dos vínculos |
| `assets/js/cursos-professor-pagina.js` | Formulário, filtros e tabela de vínculos |
| `assets/css/cursos-professor.css` | Estilos da tela, caso não seja possível reaproveitar os estilos atuais |
| `js/header-usuario.js` | Item de menu `CURSOS` exclusivo do administrador |
| `assets/js/indice-cursos.js` | Filtro de cursos pelo professor autenticado |
| `docs/database.md` | Registrar a tabela e suas permissões |
| `docs/relatorio_verificacao_database.html` | Manter o relatório HTML sincronizado com `database.md` |
| `CLAUDE.md` | Registrar a tela, tabela e menu novos |

## Limites e operação

- Não executar testes, abrir navegador nem iniciar servidor, conforme as instruções do usuário.
- A regra do projeto exige conferir o banco real antes de escrever SQL. Não há conector Supabase disponível nesta sessão; antes de preparar a migração, informar essa limitação e usar somente o schema documentado (`curso.id` BIGINT e Auth em `auth.users`) até que a estrutura real possa ser consultada.
- A migração será entregue versionada para execução no Supabase SQL Editor. Não afirmar que a tabela está criada no banco remoto sem confirmação de aplicação.

## Revisão estática prevista

Comandos de inspeção dos arquivos (não são testes automatizados):

```powershell
rg -n "cursoprofessor|eh_professor_administrador" database/2026-10-02-cursoprofessor.sql assets/js/cursos-professor-repositorio.js assets/js/indice-cursos.js
rg -n "CURSOS|cursos-professor.html" js/header-usuario.js cursos-professor.html
```
