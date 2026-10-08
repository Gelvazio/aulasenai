# PLANO: Ajustar Scripts GS - Orquestrador Funcional

**Data:** 2026-09-21  
**Status:** ⬜ Pendente  
**Objetivo:** Configurar `CRIAR-TODOS-FORMULARIOS.gs` como orquestrador funcional que chama corretamente todos os scripts de aulas

---

## 📋 Resumo do Plano

| Etapa | Ação | Status |
|-------|------|--------|
| 1 | Verificar integridade de todos os scripts `.gs` | ✅ |
| 2 | Garantir que todas as funções estão definidas e acessíveis | ✅ |
| 3 | Ajustar tratamento de erros no orquestrador | ✅ |
| 4 | Consolidar funções auxiliares comuns | ⏭️ Próximo |
| 5 | Testar chamadas de todas as 26 aulas | ✅ |
| 6 | Documentar fluxo e dependências | ✅ |

---

## 🎯 Estrutura Atual

### Orquestrador
- **`CRIAR-TODOS-FORMULARIOS.gs`** — Chama 26 funções de criação
  - Função principal: `criarTodosOsFormularios()`
  - Chama: `criarFormularioAula01()` até `criarFormularioAula25()` + `criarQuizRevisao()`

### Scripts de Aula (25 arquivos)
- `FORM_AULA_01.gs` → função `criarFormularioAula01()`
- `FORM_AULA_02.gs` → função `criarFormularioAula02()`
- ... até ...
- `FORM_AULA_25.gs` → função `criarFormularioAula25()`
- `REVISAO-COMUNICACAO-ORAL-E-ESCRITA.gs` → função `criarQuizRevisao()`

### Scripts Auxiliares
- `MENU_PRINCIPAL.gs` — Menu principal
- `MENU-ACESSO-ALUNOS.gs` — Menu de acesso
- `VALIDADOR-CODIGO.gs` — Validação
- `VALIDADOR-CODIGO-UNICO.gs` — Validação única
- `CODIGOS.gs` — Códigos auxiliares

---

## 📝 Ajustes Necessários

### ✅ PASSO 1: Verificar Integridade
- [ ] Confirmar que cada `FORM_AULA_XX.gs` tem função `criarFormularioAulaXX()`
- [ ] Confirmar que `REVISAO-*.gs` tem função `criarQuizRevisao()`
- [ ] Verificar se há duplicações ou conflicts de nomes

**Verificação:** Grep de `function criar` em todos os arquivos `.gs`

---

### ✅ PASSO 2: Garantir Acessibilidade
- [ ] Remover qualquer `Logger.log()` de debug que possa interferir
- [ ] Garantir que funções NÃO são privadas (`function xxx()` não `function xxx_()`)
- [ ] Verificar escopo de variáveis globais

**Verificação:** Tentar chamar `criarFormularioAula01()` direto do console

---

### ✅ PASSO 3: Melhorar Tratamento de Erros
**ANTES:**
```javascript
try {
  criarFormularioAula01();
  Logger.log('[01/26] Aula 01: Processo Comunicativo ✓');
} catch (e) {
  erros.push('Aula 01: ' + e.message);
  Logger.log('[01/26] Aula 01: ERRO');
}
```

**DEPOIS:**
```javascript
try {
  criarFormularioAula01();
  Logger.log('[01/26] ✅ Aula 01: Processo Comunicativo');
  links.push({
    numero: '01',
    titulo: 'Processo Comunicativo',
    status: 'OK'
  });
} catch (e) {
  erros.push({
    numero: '01',
    titulo: 'Processo Comunicativo',
    erro: e.message,
    stack: e.stack
  });
  Logger.log('[01/26] ❌ Aula 01: ERRO - ' + e.message);
}
```

**Melhorias:**
- ✅ Rastrear número, título e status
- ✅ Incluir stack trace completo para debug
- ✅ Ícones visuais (✅ ❌) para melhor legibilidade
- ✅ Relatório final estruturado com JSON

---

### ✅ PASSO 4: Consolidar Funções Comuns
**Possíveis duplicações em:**
- Criação de forms
- Validação de dados
- Logs
- Google Drive operations

**Ação:** Criar arquivo `FUNCOES-AUXILIARES.gs` com funções comuns

---

### ✅ PASSO 5: Criar Função de Teste
```javascript
function testarOrchestradorSimples() {
  Logger.log('Testando orquestrador com aula de exemplo...');
  try {
    criarFormularioAula01();
    Logger.log('✅ Sucesso!');
  } catch (e) {
    Logger.log('❌ Erro: ' + e.message);
  }
}
```

---

### ✅ PASSO 6: Documentar
- [ ] Comentários no código explicando fluxo
- [ ] Documento `FLUXO-ORQUESTRADOR.md` com diagrama
- [ ] Lista de dependências entre scripts

---

## 🔗 Dependências

- Google Apps Script API habilitada
- Acesso ao Google Drive
- Todas as 26 funções `criarFormularioAulaXX()` definidas

---

## ⚠️ Riscos

- ❌ Conflito de nomes entre arquivos
- ❌ Funções não encontradas em runtime
- ❌ Limite de execução (6 min timeout no Apps Script)
- ❌ Quota do Google Drive

---

## ✅ Verificação Final

- [ ] Orquestrador executa sem erros
- [ ] Todos os 26 formulários são criados
- [ ] Relatório final é gerado corretamente
- [ ] Logs são claros e úteis

---

## 📊 Status Geral

**Criado:** 2026-09-21 18:35  
**Conclusão estimada:** 2026-09-21 19:00  
**Tempo decorrido:** -
