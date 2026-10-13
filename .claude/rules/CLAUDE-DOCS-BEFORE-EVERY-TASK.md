# 📋 Regra Obrigatória — Documentar ANTES de Executar

**Data:** 05-09-2026  
**Prioridade:** 🔴 CRÍTICA  
**Aplicável a:** TODOS os projetos

---

## A Regra

⚠️ **ANTES DE EXECUTAR QUALQUER TAREFA GRANDE, VOCÊ DEVE:**

1. ✅ **Criar arquivo em `docs/`** com o plano da tarefa
2. ✅ **Documentar o plano completo** com passos e status
3. ✅ **Mostrar ao usuário** (não esconder em mensagem intermediária)
4. ✅ **Perguntar se está correto** — aguardar aprovação EXPLÍCITA
5. ✅ **Só então executar** após aprovação do usuário

> **Exceção — tarefas PEQUENAS (igual ao `CLAUDE.md` global e do projeto, desde 2026-09-30):**
> tarefa pequena = ajuste pontual (até ~3 arquivos) que **não** mexe em banco de dados/segurança/RLS,
> **não** cria estrutura ou gerador novo e **não** faz mudança em massa. Ela **não precisa** de
> `docs/<tarefa>.md` nem de aprovação prévia: executar direto, registrar no `STATUS.md` e fazer o
> commit. **Tarefa grande** (banco, segurança, várias partes, geração em massa, apagar dados)
> continua exigindo o plano em `docs/` e a aprovação.

---

## Estrutura do Arquivo em `docs/`

### Nome do arquivo
```
docs/<nome-descritivo-em-kebab-case>.md
```

### Conteúdo obrigatório

```markdown
# [Título da Tarefa]

**Data de Criação:** YYYY-MM-DD  
**Status Geral:** ⬜ Planejado | 🔄 Em Progresso | ✅ Concluído  
**Prioridade:** Alta/Média/Baixa

---

## 📌 Objetivo

[Descrever claramente o que será feito e por quê]

---

## 📋 Escopo

- Arquivos afetados
- Tecnologias envolvidas
- Dependências
- Limitações conhecidas

---

## 📊 Plano de Execução

### Etapa 1: [Descrição]
- **Status:** ⬜ Pendente | 🔄 Em progresso | ✅ Concluído
- **Ação:** [Descrever ação específica]
- **Arquivo:** `caminho/exato/arquivo.ext`
- **Verificação:** [Como saber que funcionou]

### Etapa 2: [Descrição]
- **Status:** ⬜ Pendente
- **Ação:** [...]
- **Arquivo:** [...]
- **Verificação:** [...]

[...mais etapas...]

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| [Descrição] | Alta/Média/Baixa | [O que fazer] |

---

## 📝 Notas

[Informações adicionais relevantes]

---

## ✅ Checklist Final

- [ ] Todos os arquivos foram alterados conforme planejado
- [ ] Alterações foram conferidas (leitura, `node --check`, banco ou terminal — nunca navegador nem teste automatizado)
- [ ] Documentação atualizada
- [ ] Commit realizado
```

---

## Fluxo Completo

### ❌ Fluxo INCORRETO (não fazer)

```
Usuário: "Mude a cor do botão para azul"
    ↓
Claude: [Silenciosamente edita arquivo]
    ↓
Claude: "Pronto! ✅"
    ↓
Usuário: "Espera, você mudou a cor errada. Eu queria outro azul..."
```

### ✅ Fluxo CORRETO

```
Usuário: "Mude a cor do botão para azul"
    ↓
Claude: [Cria docs/mudar-cor-botao.md com plano]
    ↓
Claude: "Vou fazer isso:
  📋 PLANO
  1. Editar arquivo dashboard/index.html
  2. Mudar classe .btn-primary de #667eea para #0051ba
  3. Conferir por leitura do código / `node --check` (sem abrir navegador)
  
  ✅ Está correto?"
    ↓
Usuário: "Sim, perfeito!"
    ↓
Claude: [Executa o plano]
    ↓
Claude: [Atualiza docs/mudar-cor-botao.md com ✅ Concluído]
    ↓
Claude: "✅ Pronto!"
```

---

## Exemplos de Tarefas que EXIGEM docs/

### ✅ Sempre requerem docs/:
- Adicionar nova feature
- Refatorar código
- Criar novo arquivo/pasta
- Integrar novo serviço
- Corrigir bug (documentar o bug e a solução)
- Alterar comportamento existente
- Criar ou atualizar documentação
- Migrar dados

### Exceção (NÃO precisa docs/ — só `STATUS.md` e git commit):
- **Toda tarefa PEQUENA** (ver a exceção no início deste arquivo): ajuste pontual em até ~3
  arquivos, sem banco/segurança/RLS, sem estrutura ou gerador novo e sem mudança em massa.

Dúvida se é pequena ou grande? **Trate como grande e documente.**

---

## Integrando com Sistema de Pendências

Se a tarefa criar pendências no Supabase:

1. **Antes:** Documentar em docs/
2. **Durante:** Criar registros em `pendencias` table
3. **Depois:** Atualizar docs/ com ✅ Concluído
4. **Commit:** Incluir referência ao arquivo de tarefa

---

## Checklist de Implementação

Ao ler esta regra, você deve:

- ✅ Ler este arquivo completamente
- ✅ Adicionar referência a ele em `CLAUDE.md` de cada projeto
- ✅ NUNCA mais executar tarefa sem criar docs/ primeiro
- ✅ SEMPRE aguardar aprovação explícita do usuário
- ✅ Atualizar docs/ conforme progride

---

## Perguntas Frequentes

**P: E se a tarefa for muito pequena?**  
R: Se ela se encaixa na exceção das tarefas pequenas, não precisa de docs/ (só `STATUS.md` e
commit). Na dúvida, crie docs/.

**P: E se eu já saiba exatamente o que fazer?**  
R: Crie docs/ de qualquer forma. Mostra transparência e permite que o usuário redirecione se achar necessário.

**P: E se o usuário não tiver tempo de ler?**  
R: Ele dirá. Você oferece o plano em docs/ + resumo em chat. Ele aprova ou ajusta.

**P: Quanto tempo leva criar o docs/?**  
R: Geralmente 1-2 minutos. Economiza 10-20 minutos de refação se o plano estava errado.

---

**Última Atualização:** 05-09-2026  
**Status:** ✅ Ativa em todos os projetos
