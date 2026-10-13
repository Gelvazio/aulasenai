# 📝 Plano em `docs/` — tarefa grande × pequena

Skill de apoio: `.claude/skills/documentacao-padrao/SKILL.md`.

## Pequena ou grande?

| Tipo | Definição | Exige |
|------|-----------|-------|
| **Pequena** | Ajuste pontual em até ~3 arquivos, sem nenhum ponto da linha abaixo | Só a TASK no `tasks/STATUS.md` + commit |
| **Grande** | Mexe em **banco** (SQL, schema, trigger, função, migração), **segurança** (auth, papéis, RLS, chaves), tem **várias partes**, cria estrutura/gerador novo, faz **mudança em massa** ou **apaga dados** | Plano em `docs/` + **aprovação explícita** antes de executar |

Na dúvida, trate como grande.

## Fluxo da tarefa grande

1. Criar `docs/<nome-em-kebab-case>.md` **antes** de qualquer mudança (se `docs/` não existir,
   pedir autorização para criá-la).
2. Mostrar ao usuário um resumo: passos, arquivos afetados, riscos e verificações.
3. **Perguntar se está correto** e aguardar um "sim" claro.
4. Executar **só o escopo aprovado**, atualizando os passos na hora (`⬜ 🔄 ✅ ⛔`).
5. Ao terminar: resultado, pendências, commit e tempo decorrido no plano.

Mudança material de escopo → atualizar o plano e pedir **nova** aprovação.
Commit e atualização do `STATUS.md` são feitos sem perguntar.

## Conteúdo mínimo do plano

```markdown
# <Título>

**Criado em:** AAAA-MM-DD HH:MM · **Executor:** <IA> · **Tarefa:** #NN / Etapa NNN
**Status geral:** ⬜ Planejado | 🔄 Em progresso | ✅ Concluído

## Objetivo        (1 frase: o que e por quê)
## Escopo          (entra / não entra; arquivos, tecnologias, dependências)
## Passos
| # | Ação | Arquivos (caminho exato) | Verificação | Status |
## Riscos
| Risco | Chance | Plano B |
## Conclusão       (resultado, pendências, commit, tempo decorrido)
```

- A **verificação** é sempre por leitura, `node --check`, consulta ao banco ou terminal — nunca
  navegador nem teste automatizado (`testes-validacao.md`).
- Citar o plano na etapa (`tasks/etapas/…`) e no bloco do `TASKS.md`; o plano vai no **mesmo
  commit** da entrega, nunca sozinho depois.
- Bug: o plano pode ficar em `bugs/bug-<nome>.md`, no mesmo formato.
