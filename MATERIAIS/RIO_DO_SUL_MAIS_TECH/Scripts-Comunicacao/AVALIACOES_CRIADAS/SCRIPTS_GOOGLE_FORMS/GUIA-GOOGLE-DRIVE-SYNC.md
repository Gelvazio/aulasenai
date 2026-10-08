# 🔄 Guia Completo: Sincronização Local ↔ Google Drive

## Sistema Integrado para Gerenciar Scripts Google Apps Script

---

## 📋 ÍNDICE

1. [Instalação](#instalação)
2. [Configuração do Google Drive](#configuração-do-google-drive)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Workflow Local](#workflow-local)
5. [Sincronização com Google Apps Script](#sincronização-com-google-apps-script)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 INSTALAÇÃO

### Passo 1: Instalar Google Drive para Desktop

**Windows:**
```
1. Acesse: https://www.google.com/drive/download/
2. Clique em "Download Google Drive for Desktop"
3. Execute o instalador
4. Siga as instruções na tela
5. Faça login com sua conta Google
```

**macOS/Linux:**
```
1. Mesmo link acima
2. Escolha a versão do seu SO
3. Execute o instalador
4. Faça login com sua conta Google
```

### Passo 2: Verificar Instalação

Após instalar, você verá:
- ✅ Ícone do Google Drive na bandeja (Windows) ou barra de menu (Mac)
- ✅ Pasta "My Drive" acessível no explorador de arquivos
- ✅ Sincronização automática funcionando

---

## 📁 CONFIGURAÇÃO DO GOOGLE DRIVE

### Passo 3: Criar Pasta no Google Drive

**Via Web:**

```
1. Acesse https://drive.google.com
2. Clique em "+ Novo" (canto superior esquerdo)
3. Selecione "Pasta"
4. Nome: "Scripts-Comunicacao-Oral-Escrita"
5. Descrição: "Scripts Google Apps Script - Aulas SENAI"
6. Clique em "Criar"
```

**Via Desktop (Mais Fácil):**

```
1. Abra o explorador de arquivos
2. Acesse: "Meu Computador" > "Google Drive" > "My Drive"
3. Clique direito > "Novo" > "Pasta"
4. Nome: "Scripts-Comunicacao-Oral-Escrita"
5. Pressione Enter
```

### Passo 4: Acessar a Pasta Localmente

```
Caminho Windows:
C:\Users\[seu-usuario]\Google Drive\My Drive\Scripts-Comunicacao-Oral-Escrita

Caminho macOS:
/Users/[seu-usuario]/Google Drive/My Drive/Scripts-Comunicacao-Oral-Escrita

Caminho Linux:
/home/[seu-usuario]/Google Drive/My Drive/Scripts-Comunicacao-Oral-Escrita
```

---

## 📊 ESTRUTURA DE PASTAS

### Passo 5: Organizar Arquivos

Crie a seguinte estrutura na pasta sincronizada:

```
Scripts-Comunicacao-Oral-Escrita/
├── AULAS/
│   ├── FORM_AULA_01.gs
│   ├── FORM_AULA_02.gs
│   ├── FORM_AULA_03.gs
│   ├── ...
│   └── FORM_AULA_25.gs
│
├── ESPECIAL/
│   ├── REVISAO-COMUNICACAO-ORAL-E-ESCRITA.gs
│   ├── CRIAR-TODOS-FORMULARIOS.gs
│   ├── MENU-ACESSO-ALUNOS.gs
│   └── CODIGOS.gs
│
├── VALIDACAO/
│   ├── VALIDADOR-CODIGO.gs
│   └── VALIDADOR-CODIGO-UNICO.gs
│
├── README.md
└── CHECKLIST.md
```

### Passo 6: Copiar Arquivos para a Pasta

```
1. Copie todos os 26 arquivos .gs de:
   C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH\
   INTRODUCAO_COMUNICACAO_ORAL_ESCRITA\AVALIACOES_CRIADAS\
   SCRIPTS_GOOGLE_FORMS\

2. Cole nas subpastas correspondentes no Google Drive

3. Aguarde 30 segundos (sincronização automática)

4. Verifique em https://drive.google.com se os arquivos aparecem
```

---

## ✏️ WORKFLOW LOCAL

### Passo 7: Editar Arquivos Localmente

**Via VS Code (Recomendado):**

```
1. Abra VS Code
2. File > Open Folder
3. Selecione: Google Drive > My Drive > Scripts-Comunicacao-Oral-Escrita
4. Abra os arquivos .gs
5. Edite e salve normalmente (Ctrl+S)
```

**Via Editor de Texto:**

```
1. Abra seu editor favorito (Notepad++, Sublime, etc)
2. File > Open
3. Navegue até: Google Drive > My Drive > Scripts-Comunicacao-Oral-Escrita
4. Abra o arquivo desejado
5. Faça alterações
6. Salve (Ctrl+S)
```

### Passo 8: Fazer Commit no Git

```bash
# Adicionar arquivos ao git
cd "C:\Users\[usuario]\Google Drive\My Drive\Scripts-Comunicacao-Oral-Escrita"

# (OPCIONAL) Inicializar git se não tiver
git init

# Adicionar os arquivos
git add AULAS/ ESPECIAL/ VALIDACAO/

# Fazer commit
git commit -m "feat: atualizar scripts de formulários

- Editar FORM_AULA_XX.gs com melhorias
- Sincronizar via Google Drive"

# Fazer push para GitHub (se usar)
git push origin main
```

---

## 🔗 SINCRONIZAÇÃO COM GOOGLE APPS SCRIPT

### Passo 9: Criar Projeto no Google Apps Script

**Opção A: Via Google Drive**

```
1. Acesse https://drive.google.com
2. Clique direito > "More" > "Google Apps Script"
3. Nome: "Formulários - Comunicação (Sincronizado)"
4. Clique em "Create"
```

**Opção B: Via Apps Script Direto**

```
1. Acesse https://script.google.com
2. Clique em "+ Novo projeto"
3. Nome: "Formulários - Comunicação (Sincronizado)"
4. Clique em "Criar"
```

### Passo 10: Vincular Pasta do Drive ao Projeto

**NO Google Apps Script:**

```
1. Menu superior > Projeto > Configurações do projeto
2. Procure por "Drive"
3. Selecione a pasta "Scripts-Comunicacao-Oral-Escrita"
4. Clique em "Vincular"
```

**Alternativa - Adicionar Manualmente:**

```javascript
// No editor do Google Apps Script, adicione esta função:

function sincronizarArquivosDrive() {
  var pasta = DriveApp.getFoldersByName('Scripts-Comunicacao-Oral-Escrita').next();
  var arquivos = pasta.getFiles();
  
  while (arquivos.hasNext()) {
    var arquivo = arquivos.next();
    Logger.log('Arquivo encontrado: ' + arquivo.getName());
  }
}

// Execute esta função uma vez para vincular
```

### Passo 11: Copiar Scripts para o Projeto

**Método 1: Copy-Paste Manual (Mais Seguro)**

```
1. Abra um arquivo .gs na pasta local
2. Selecione todo o código (Ctrl+A)
3. Copie (Ctrl+C)
4. No Google Apps Script, clique em "+ " > "Novo arquivo"
5. Escolha "Script"
6. Nome: mesmo nome do arquivo (ex: FORM_AULA_01)
7. Cole o código (Ctrl+V)
8. Repita para todos os 26 arquivos
```

**Método 2: Usando Clasp (Mais Avançado)**

```bash
# Se quiser sincronização bidirecional:

npm install -g @google/clasp
clasp login

# No seu projeto do Google Apps Script:
# Menu > Project Settings > IDs do script
# Copie o ID do script

# Na pasta local:
clasp clone [SCRIPT_ID]

# Agora você pode fazer:
clasp push   # Enviar local → Drive
clasp pull   # Receber Drive → local
```

---

## 🚀 USAR OS SCRIPTS

### Passo 12: Executar os Formulários

**NO Google Apps Script:**

```
1. Selecione a função: "criarTodosOsFormularios"
2. Clique em "Executar" (botão ▶)
3. Autorize o acesso quando solicitado
4. Aguarde 10-15 minutos
5. Verifique os logs (View > Logs)
```

**OU para criar um por um:**

```
1. Selecione: "criarFormularioAula01"
2. Clique em "Executar"
3. Repita para cada aula (01-25)
```

### Passo 13: Exporter Links em JSON

```
1. Selecione a função: "exportarLinksEmJSON"
2. Clique em "Executar"
3. Verifique os logs (View > Logs)
4. Copie o JSON da saída
5. Cole em QUESTIONARIOS.HTML
```

---

## 🔄 FLUXO DIÁRIO

### Fluxo Típico de Trabalho:

```
1. MANHÃ
   └─ Abrir VS Code
      └─ Editar scripts locais
         └─ Salvar (Ctrl+S)

2. SINCRONIZAÇÃO AUTOMÁTICA
   └─ Google Drive Desktop sincroniza automaticamente
      └─ ~30 segundos

3. ANTES DE EXECUTAR
   └─ Verificar em https://drive.google.com se mudanças apareceram
   └─ Abrir Google Apps Script
   └─ Copiar código atualizado (se necessário)

4. TESTAR
   └─ Executar função no Google Apps Script
   └─ Verificar logs
   └─ Corrigir erros

5. FINAL DO DIA
   └─ Fazer commit no Git
      git add .
      git commit -m "feat: atualizar scripts"
      git push origin main
```

---

## 🐛 TROUBLESHOOTING

### ❌ Arquivos não sincronizam

**Solução:**
```
1. Verifique se Google Drive está aberto
2. Clique no ícone do Drive na bandeja
3. Verifique se a pasta está configurada para sincronizar
4. Reinicie o Google Drive
5. Aguarde 2-5 minutos
```

### ❌ Código não aparece no Google Apps Script

**Solução:**
```
1. Recarregue a página (F5)
2. Feche e abra novamente
3. Verifique se colou o código completo
4. Se usar Clasp: execute "clasp pull"
```

### ❌ Erro de permissão ao executar

**Solução:**
```
1. Menu > Revisar permissões
2. Clique em "Autorizar acesso"
3. Selecione sua conta Google
4. Clique em "Permitir"
```

### ❌ Google Drive não está sincronizando

**Solução Completa:**
```
Windows:
1. Clique direito no ícone do Drive > Sair
2. Abra https://drive.google.com
3. Verifique se consegue ver os arquivos lá
4. Reinicie o Google Drive for Desktop
5. Aguarde sincronização completa

macOS:
1. Clique no ícone do Drive > Sair
2. Abra Aplicativos > Google Drive
3. Faça login novamente
4. Aguarde sincronização
```

---

## ✅ CHECKLIST FINAL

- [ ] Google Drive for Desktop instalado
- [ ] Pasta "Scripts-Comunicacao-Oral-Escrita" criada no Drive
- [ ] 26 arquivos .gs copiados para a pasta
- [ ] Sincronização funcionando (verifique em drive.google.com)
- [ ] Google Apps Script criado e vinculado
- [ ] Códigos copiados para o projeto
- [ ] Função "criarTodosOsFormularios" testada
- [ ] Links JSON exportados
- [ ] QUESTIONARIOS.HTML atualizado

---

## 📞 SUPORTE

Se encontrar problemas:

1. **Google Drive não sincroniza**
   - Reinicie o Google Drive Desktop
   - Verifique conectividade da internet
   - Verifique permissões da pasta

2. **Código não funciona no Google Apps Script**
   - Verifique console de erros (View > Logs)
   - Procure a função específica
   - Autorize permissões se solicitado

3. **Git não sincroniza com Drive**
   - Git e Google Drive são independentes
   - Ambos sincronizam seu conteúdo separadamente
   - Não há conflito entre eles

---

**Versão:** 1.0  
**Data:** 2026-09-21  
**Status:** ✅ Ativo
