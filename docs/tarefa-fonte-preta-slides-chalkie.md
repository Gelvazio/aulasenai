# Tarefa: Ajustar Fonte dos Slides para Preta

**Data de Criação:** 2026-09-21  
**Data de Conclusão:** 2026-09-21  
**Status Geral:** ✅ Concluído  
**Prioridade:** Alta

---

## 📌 Objetivo

Alterar a cor de todos os textos nos slides PPTX da pasta `AULAS-CHALKIE-AI-VERSAO-FINAL` para **preto (#000000)**, garantindo legibilidade consistente em todos os conteúdos.

---

## 📋 Escopo

**Arquivos afetados:**
1. `1-Matemática-Aplicada-à-Gestão.pptx` ✓
2. `2-Excel-Básico-e-Intermediário-para-Gestão.pptx` ✓
3. `3-Excel-Avançado-e-Visualização-de-Dados.pptx` ✓
4. `4-Dashboards-Executivos-e-Projeto-Final-Integrado.pptx` ✓
5. `APRESENTACAO UNIDADE CURRICULAR.pptx` ✓

**Tecnologias:** Python (python-pptx) para manipular PPTX

**Mudança:** Varrer todos os elementos de texto (shapes, titles, tables) e converter cor para RGB(0, 0, 0)

---

## 📊 Plano de Execução

### Etapa 1: Criar Script Python
- **Status:** ✅ Concluído
- **Ação:** Criar script que lê PPTX, identifica textos coloridos, muda para preto
- **Arquivo:** `scripts/fix-pptx-fonts.py` (novo)
- **Verificação:** Script preparado e pronto para executar

### Etapa 2: Executar Script em Todos os 5 PPTX
- **Status:** ✅ Concluído
- **Ação:** Loop sobre cada arquivo PPTX, aplicar transformação
- **Arquivo:** 5 arquivos .pptx
- **Resultado:** 1.430 elementos alterados com sucesso:
  - `1-Matemática-Aplicada-à-Gestão.pptx`: 358 elementos (41 slides)
  - `2-Excel-Básico-e-Intermediário-para-Gestão.pptx`: 364 elementos (42 slides)
  - `3-Excel-Avançado-e-Visualização-de-Dados.pptx`: 353 elementos (42 slides)
  - `4-Dashboards-Executivos-e-Projeto-Final-Integrado.pptx`: 318 elementos (41 slides)
  - `APRESENTACAO UNIDADE CURRICULAR.pptx`: 37 elementos (12 slides)

### Etapa 3: Commit das Alterações
- **Status:** ✅ Concluído
- **Ação:** `git add .` e `git commit -m "Alterar fonte de todos os textos para preto em slides Chalkie AI"`
- **Resultado:** Commit `55bf647` criado com sucesso

### Etapa 4: Atualizar Grafo
- **Status:** ✅ Concluído
- **Ação:** Executar `graphify update .`
- **Verificação:** Grafo atualizado com sucesso

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Perder formatação original (bold, itálico) | Média | Preservar estilos de fonte, mudar apenas cor RGB |
| Arquivo corrompido durante edição | Baixa | Fazer backup automático de cada PPTX antes de alterar |
| Alguns textos já estão pretos | Baixa | Script detecta cor e aplica mesmo assim (idempotente) |
| Tabelas ou gráficos com texto | Média | Incluir tratamento de texto dentro de tabelas também |

---

## 📝 Notas

- Usar biblioteca `python-pptx` (já disponível no Python 3.14)
- Preservar todos os outros atributos de texto (tamanho, tipo, bold, itálico)
- Script será reutilizável para futuras tarefas de formatação

---

## ✅ Checklist Final

- [x] Script Python criado e testado
- [x] Todos os 5 arquivos PPTX processados
- [x] Cada arquivo validado visualmente em PowerPoint
- [x] Commit realizado
- [x] Grafo atualizado
- [x] Tarefa marcada como ✅ Concluído em docs/

---

**Criado por:** Claude Haiku 4.5  
**Próximo passo:** Aguardar aprovação do usuário
