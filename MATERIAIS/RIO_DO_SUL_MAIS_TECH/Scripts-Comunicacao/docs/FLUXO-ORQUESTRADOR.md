# 🔄 FLUXO DO ORQUESTRADOR DE FORMULÁRIOS

**Data:** 2026-09-21  
**Status:** ✅ Implementado  
**Responsável:** Sistema de Automação Google Apps Script

---

## 📊 Diagrama de Fluxo

```
┌─────────────────────────────────────────┐
│  INICIAR: criarTodosOsFormularios()     │
└────────────────┬────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │  Exibir Header     │
        │  Iniciar Timer     │
        │  Limpar arrays     │
        └────────────┬───────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  LOOP THROUGH 25 AULAS          │
        │  ┌───────────────────────────┐  │
        │  │ try:                      │  │
        │  │   criarFormularioAula##()│  │
        │  │   → Adicionar ao links[] │  │
        │  │   → Log: ✅ Sucesso      │  │
        │  │                           │  │
        │  │ catch e:                  │  │
        │  │   → Adicionar ao erros[] │  │
        │  │   → Log: ❌ Erro + msg   │  │
        │  └───────────────────────────┘  │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  CRIAR REVISAO INTEGRADA        │
        │  criarQuizRevisao()             │
        │  (Aulas 1-9)                    │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌────────────────────┐
        │  Calcular Tempo    │
        │  Calcular Taxa %   │
        │  Montar Relatório  │
        └────────────┬───────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │  EXIBIR RESULTADO FINAL     │
        │  • Total criados: N/26      │
        │  • Taxa sucesso: X%         │
        │  • Tempo: Y minutos         │
        │  • Erros (se houver)        │
        └────────────┬────────────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │  RETORNAR JSON COM          │
        │  {                          │
        │    total: 26,               │
        │    criados: N,              │
        │    erros: E,                │
        │    tempo: Y,                │
        │    detalhes: {...}          │
        │  }                          │
        └─────────────────────────────┘
```

---

## 📁 DEPENDÊNCIAS ENTRE SCRIPTS

### Hierarquia
```
CRIAR-TODOS-FORMULARIOS.gs (ORQUESTRADOR)
│
├── testarOrchestradorSimples()
│   └── criarFormularioAula01()
│
└── criarTodosOsFormularios()
    │
    ├── criarFormularioAula01() [FORM_AULA_01.gs]
    ├── criarFormularioAula02() [FORM_AULA_02.gs]
    ├── criarFormularioAula03() [FORM_AULA_03.gs]
    ├── criarFormularioAula04() [FORM_AULA_04.gs]
    ├── criarFormularioAula05() [FORM_AULA_05.gs]
    ├── criarFormularioAula06() [FORM_AULA_06.gs]
    ├── criarFormularioAula07() [FORM_AULA_07.gs]
    ├── criarFormularioAula08() [FORM_AULA_08.gs]
    ├── criarFormularioAula09() [FORM_AULA_09.gs]
    ├── criarFormularioAula10() [FORM_AULA_10.gs]
    ├── criarFormularioAula11() [FORM_AULA_11.gs]
    ├── criarFormularioAula12() [FORM_AULA_12.gs]
    ├── criarFormularioAula13() [FORM_AULA_13.gs]
    ├── criarFormularioAula14() [FORM_AULA_14.gs]
    ├── criarFormularioAula15() [FORM_AULA_15.gs]
    ├── criarFormularioAula16() [FORM_AULA_16.gs]
    ├── criarFormularioAula17() [FORM_AULA_17.gs]
    ├── criarFormularioAula18() [FORM_AULA_18.gs]
    ├── criarFormularioAula19() [FORM_AULA_19.gs]
    ├── criarFormularioAula20() [FORM_AULA_20.gs]
    ├── criarFormularioAula21() [FORM_AULA_21.gs]
    ├── criarFormularioAula22() [FORM_AULA_22.gs]
    ├── criarFormularioAula23() [FORM_AULA_23.gs]
    ├── criarFormularioAula24() [FORM_AULA_24.gs]
    ├── criarFormularioAula25() [FORM_AULA_25.gs]
    │
    └── criarQuizRevisao() [REVISAO-COMUNICACAO-ORAL-E-ESCRITA.gs]
```

---

## 🚀 COMO USAR

### Opção 1: Teste Rápido
```javascript
// Execute esta função para testar uma aula
testarOrchestradorSimples()

// Resultado esperado:
// ✅ SUCESSO! Aula 01 criada com sucesso.
```

### Opção 2: Criar Todos (Produção)
```javascript
// Execute esta função para criar todos os 26 formulários
criarTodosOsFormularios()

// Resultado esperado:
// ✅ 26 formulários criados em 5-10 minutos
// Tempo decorrido: X minutos
// Taxa de sucesso: 100%
```

### Opção 3: Monitorar Resultado
```javascript
// A função retorna um objeto JSON:
var resultado = criarTodosOsFormularios();

Logger.log('Total: ' + resultado.total);
Logger.log('Criados: ' + resultado.criados);
Logger.log('Erros: ' + resultado.erros);
Logger.log('Tempo: ' + resultado.tempo + ' min');

// Acessar detalhes:
resultado.detalhes.sucesso.forEach(function(aula) {
  Logger.log('✅ Aula ' + aula.numero + ': ' + aula.titulo);
});

resultado.detalhes.falhas.forEach(function(erro) {
  Logger.log('❌ Aula ' + erro.numero + ': ' + erro.mensagem);
});
```

---

## 🔧 TRATAMENTO DE ERROS

### Se Um Formulário Falhar
1. ❌ A função será capturada no `catch`
2. 📝 O erro será registrado em `erros[]`
3. 🔄 O loop **continua** com a próxima aula
4. 📊 O relatório final mostrará quais falharam

### Se Todos Falharem
- ❌ Taxa de sucesso: 0%
- 📊 Relatório mostrará todos os erros
- 🔍 Verifique:
  - Permissões do Google Drive
  - Autenticação do Apps Script
  - Disponibilidade da quota do Drive

### Se Houver Timeout
- ⏱️ Google Apps Script timeout máximo: 6 minutos
- ⚠️ Se a execução exceder, será interrompida
- 💡 Solução: Criar em lotes menores (aulas 1-10, depois 11-20, etc.)

---

## 📈 MONITORAMENTO

### Verificar Progresso
1. Abra o **Editor do Apps Script** (script.google.com)
2. Vá para **Execução** (lado esquerdo)
3. Acompanhe o progresso em tempo real

### Verificar Resultado
1. Abra seu **Google Drive**
2. Procure por formulários com o padrão:
   - `Avaliação — Aula 01 · ...`
   - `Avaliação — Aula 02 · ...`
   - ... até ...
   - `Avaliação — Aula 25 · ...`
   - `Revisão Integrada — Aulas 1 a 9 · ...`

---

## 🎯 CHECKLIST DE SUCESSO

- [ ] ✅ Teste simples passou: `testarOrchestradorSimples()`
- [ ] ✅ Todos os 26 formulários foram criados
- [ ] ✅ Nenhum erro no relatório final
- [ ] ✅ Taxa de sucesso: 100%
- [ ] ✅ Tempo decorrido: < 10 minutos
- [ ] ✅ Todos os formulários visíveis no Drive
- [ ] ✅ Links compartilháveis obtidos

---

## 📞 TROUBLESHOOTING

| Problema | Causa | Solução |
|----------|-------|---------|
| **❌ Nenhuma função `criar...()` encontrada** | Script não carregado | Verifique se todos os `.gs` estão no projeto |
| **⏱️ Timeout após 6 min** | Muitas aulas simultâneas | Crie em lotes (aulas 1-10, depois 11-20) |
| **📭 Nenhum formulário criado** | Sem acesso ao Drive | Verifique permissões do Apps Script |
| **🔄 Alguns formulários falharam** | Erro específico da aula | Verifique `erros[]` no relatório |
| **📝 Logs não aparecem** | Execução ainda rodando | Aguarde até 10 minutos |

---

## 📝 LOG DE MUDANÇAS

| Data | O Quê | Status |
|------|-------|--------|
| 2026-09-21 | Refatoração do orquestrador | ✅ Concluído |
| 2026-09-21 | Adição de função de teste | ✅ Concluído |
| 2026-09-21 | Documentação de fluxo | ✅ Concluído |

---

**Última atualização:** 2026-09-21  
**Próximas melhorias:** Agrupador por lotes, UI no Apps Script
