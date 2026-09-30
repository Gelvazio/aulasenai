# 📁 Refatoração: Dividir Apostila em Múltiplos HTMLs

**Objetivo:** Dividir `APOSTILA-COMPLETA-REFORCO-MATEMATICA.html` (1 arquivo gigante) em múltiplos arquivos HTML organizados por módulo, melhorando manutenção, performance e reutilização.

**Tech Stack:** HTML5, CSS3, JavaScript Vanilla

**Data Criação:** 2026-09-19  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📊 Arquitetura Proposta

### Estrutura Atual (Problema)
```
AULAS/
└── APOSTILA-COMPLETA-REFORCO-MATEMATICA.html  (1 arquivo = ~3000+ linhas)
    └── Tudo junto: CSS, JS, exercícios, menu, navegação
```

### Estrutura Proposta (Solução)
```
AULAS/
├── index.html                              (Portal inicial + menu)
├── modulo-1-operacoes-basicas.html         (Módulo 1 completo)
├── modulo-2-fracoes-decimais.html          (Módulo 2 completo)
├── modulo-3-proporcionalidade.html         (Módulo 3 completo)
├── modulo-4-medidas-grandezas.html         (Módulo 4 completo)
├── modulo-5-raciocinio-logico.html         (Módulo 5 completo)
├── modulo-6-algebra.html                   (Módulo 6 completo)
├── modulo-7-tratamento-informacao.html     (Módulo 7 completo)
├── _assets/
│   ├── styles.css                          (CSS compartilhado)
│   ├── scripts.js                          (JS compartilhado)
│   ├── menu.html                           (Componente menu reutilizável)
│   └── header.html                         (Componente header reutilizável)
└── APOSTILA-COMPLETA-REFORCO-MATEMATICA.html (versão old - backup)
```

### Benefícios
- ✅ **Manutenção:** Editar um módulo sem tocar outros
- ✅ **Performance:** Carregar apenas 1 módulo por vez
- ✅ **Reutilização:** Componentes CSS/JS compartilhados
- ✅ **Escalabilidade:** Fácil adicionar novos módulos futuros
- ✅ **Organização:** Estrutura clara e profissional

---

## 📋 Plano de Execução

### Etapa 0: Criar Pasta de Assets

**Status:** ⬜ Pendente

**Arquivo:** Criar pasta `AULAS/_assets/`

**Ação:** Criar estrutura de diretórios:

```powershell
# Navegar até pasta AULAS
cd "C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH\REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO\AULAS"

# Criar pasta de assets
mkdir _assets

# Criar subpastas (opcional, futuramente)
mkdir _assets\images
mkdir _assets\videos
mkdir _assets\data
```

**Verificação:**

```powershell
# Verificar estrutura
Get-ChildItem -Path "_assets" -Recurse
```

Esperado: Pasta `_assets` criada com subpastas

---

### Etapa 1: Extrair e Organizar CSS

**Status:** ⬜ Pendente

**Arquivo:** Criar `AULAS/_assets/styles.css`

**Ação:** Extrair TODO o CSS do arquivo original e criar arquivo compartilhado:

```css
/* ===== FONTE E RESET ===== */
* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #004384 0%, #0055b3 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
}

/* ===== LAYOUT COM MENU ===== */
.layout-wrapper {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.menu-lateral {
  width: 280px;
  background: white;
  border-radius: 12px;
  padding: 25px 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.menu-lateral h3 {
  color: #004384;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-left: 4px solid transparent;
  color: #666;
  font-weight: 500;
  text-decoration: none;
  display: block;
  position: relative;
  overflow: hidden;
}

.menu-item:hover {
  background: #f9f9f9;
  border-left-color: #f7941d;
  color: #004384;
  padding-left: 28px;
  transform: translateX(8px) scale(1.02);
}

.menu-item.ativo {
  background: #f0f7ff;
  border-left-color: #f7941d;
  color: #f7941d;
  font-weight: 600;
}

.menu-item.ativo::before {
  content: '✓';
  position: absolute;
  left: 10px;
  color: #f7941d;
}

/* ===== CONTAINER PRINCIPAL ===== */
.conteudo-wrapper {
  flex: 1;
  animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.container {
  max-width: 950px;
  margin: 0 auto;
}

/* ===== HEADER ===== */
.header-controls {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 10;
  animation: fadeInUp 0.5s ease-out;
}

.header-controls h1 {
  color: #004384;
  font-size: 1.8em;
  margin: 0;
  flex: 1;
  min-width: 200px;
}

/* ===== BOTÕES ===== */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: #004384;
  color: white;
}

.btn-primary:hover {
  background: #0055b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,67,132,0.3);
}

.btn-secondary {
  background: transparent;
  color: #004384;
  border: 1.5px solid #004384;
}

.btn-secondary:hover {
  background: #f0f7ff;
}

/* ===== SEÇÕES DE CONTEÚDO ===== */
.modulo-intro {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  animation: fadeInUp 0.6s ease-out;
}

.intro-teorica {
  background: linear-gradient(135deg, #E6F1FB 0%, #F0F7FF 100%);
  border-left: 4px solid #185FA5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.intro-teorica h4 {
  color: #0C447C;
  margin: 0 0 12px;
  font-size: 1.1em;
}

.intro-teorica p {
  color: #333;
  margin: 0 0 10px;
  font-size: 14px;
}

.intro-teorica p:last-child {
  margin-bottom: 0;
}

/* ===== CONCEITOS-CHAVE ===== */
.conceitos-chave {
  background: #FAEEDA;
  border-left: 4px solid #BA7517;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.conceitos-chave h4 {
  color: #854F0B;
  margin: 0 0 15px;
  font-size: 1.1em;
}

.conceitos-chave dl {
  margin: 0;
}

.conceitos-chave dt {
  color: #854F0B;
  font-weight: 600;
  margin-top: 12px;
  font-size: 15px;
}

.conceitos-chave dd {
  margin: 4px 0 0 20px;
  color: #333;
  font-size: 14px;
}

/* ===== EXEMPLOS PRÁTICOS ===== */
.exemplos-praticos {
  margin: 20px 0;
}

.exemplos-praticos h4 {
  color: #004384;
  font-size: 1.1em;
  margin: 0 0 15px;
}

.exemplo-card {
  background: #EAFDEA;
  border: 1px solid #97C459;
  border-radius: 8px;
  padding: 15px;
  margin: 12px 0;
  border-left: 4px solid #639922;
  transition: all 0.3s;
}

.exemplo-card:hover {
  box-shadow: 0 2px 8px rgba(99, 153, 34, 0.2);
  transform: translateY(-2px);
}

.exemplo-card p {
  margin: 8px 0;
  font-size: 14px;
}

.exemplo-card p:first-child {
  font-weight: 600;
  color: #27500A;
}

/* ===== RECURSOS MULTIMÍDIA ===== */
.recursos-multimedia {
  margin: 20px 0;
}

.recursos-multimedia h4 {
  color: #004384;
  font-size: 1.1em;
  margin: 0 0 12px;
}

.recursos-multimedia a {
  color: #185FA5;
  text-decoration: none;
  font-weight: 500;
}

.recursos-multimedia a:hover {
  text-decoration: underline;
}

.recursos-multimedia ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recursos-multimedia li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.recursos-multimedia li:last-child {
  border-bottom: none;
}

.recursos-multimedia figure {
  margin: 15px 0;
  text-align: center;
}

.recursos-multimedia img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.recursos-multimedia figcaption {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  font-style: italic;
}

/* ===== LUDIFICAÇÃO ===== */
.ludificacao {
  margin: 20px 0;
}

.ludificacao h4 {
  color: #004384;
  font-size: 1.1em;
  margin: 0 0 12px;
}

.curiosidade-card {
  background: #FCF0E8;
  border-left: 4px solid #D85A30;
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
}

.mini-game {
  background: #E1F5EE;
  border: 2px dashed #1D9E75;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 15px 0;
}

.btn-game {
  background: #1D9E75;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-game:hover {
  background: #0F6E56;
  transform: scale(1.05);
}

/* ===== REFERÊNCIAS ===== */
.referencias {
  background: #F1EFE8;
  border-left: 4px solid #5F5E5A;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.referencias h4 {
  color: #444441;
  margin: 0 0 12px;
  font-size: 1.1em;
}

.referencias ul {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #333;
}

.referencias li {
  margin: 8px 0;
  line-height: 1.6;
}

/* ===== EXERCÍCIOS ===== */
.exercicios-section {
  margin: 20px 0;
}

.exercicio-box {
  border: 1px solid #004384;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  background: #f9f9f9;
}

.exercicio-header {
  font-weight: 600;
  color: #004384;
  margin-bottom: 15px;
  font-size: 14px;
}

.exercicio-content p {
  margin: 8px 0;
  font-size: 14px;
}

.exercicio-label {
  font-weight: 600;
  color: #004384;
}

.resposta-campo {
  margin-top: 15px;
}

.resposta-linha {
  border-bottom: 1px solid #333;
  height: 25px;
  margin: 8px 0;
}

/* ===== ANIMAÇÕES ===== */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
  .layout-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .menu-lateral {
    width: 100%;
    position: static;
    max-height: none;
    margin-bottom: 20px;
  }

  .header-controls {
    flex-direction: column;
    text-align: center;
  }

  .header-controls h1 {
    width: 100%;
  }

  .modulo-intro {
    padding: 20px;
  }

  .exemplo-card,
  .curiosidade-card {
    font-size: 13px;
  }
}
```

**Verificação:**

```powershell
# Verificar se arquivo foi criado
Test-Path -Path "_assets\styles.css"
```

Esperado: `True` (arquivo criado)

---

### Etapa 2: Extrair e Organizar JavaScript

**Status:** ⬜ Pendente

**Arquivo:** Criar `AULAS/_assets/scripts.js`

**Ação:** Extrair TODO o JavaScript do arquivo original:

```javascript
// ===== NAVEGAÇÃO ENTRE MÓDULOS =====
function navegarPara(moduloId) {
  // Esconder todas as seções
  document.querySelectorAll('[id^="modulo-"]').forEach(el => {
    el.style.display = 'none';
  });

  // Mostrar módulo selecionado
  const modulo = document.getElementById(moduloId);
  if (modulo) {
    modulo.style.display = 'block';
    modulo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Marcar menu item como ativo
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('ativo');
  });
  event.target.classList.add('ativo');
}

// ===== MINI-GAMES =====
function gerarProblemaOperacoes() {
  const operadores = ['+', '-', '×', '÷'];
  const operador = operadores[Math.floor(Math.random() * operadores.length)];
  
  let a = Math.floor(Math.random() * 100) + 1;
  let b = Math.floor(Math.random() * 100) + 1;
  
  let resposta;
  if (operador === '+') resposta = a + b;
  else if (operador === '-') resposta = a - b;
  else if (operador === '×') resposta = a * b;
  else resposta = (a / b).toFixed(2);
  
  const problemaProposto = `${a} ${operador} ${b} = ?`;
  document.getElementById('problema-output').innerHTML = `
    <strong style="font-size: 18px;">${problemaProposto}</strong>
    <br><button onclick="revelarResposta('${resposta}')" class="btn-game">Ver Resposta</button>
    <div id="resposta-revelada" style="display:none; margin-top: 10px; font-size: 16px; color: #0ca30c; font-weight: 600;"></div>
  `;
}

function revelarResposta(resposta) {
  const div = document.getElementById('resposta-revelada');
  div.innerHTML = `✅ Resposta: ${resposta}`;
  div.style.display = 'block';
}

// ===== EXPORTAR PDF (OPCIONAL) =====
function exportarPDF(moduloId) {
  const elemento = document.getElementById(moduloId);
  if (elemento) {
    html2pdf().set({
      margin: 10,
      filename: `${moduloId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    }).save(elemento);
  }
}

// ===== INICIALIZAR ===== 
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar primeiro módulo como visível
  const primeiroModulo = document.querySelector('[id^="modulo-"]');
  if (primeiroModulo) {
    primeiroModulo.style.display = 'block';
  }

  // Marcar primeiro menu item como ativo
  const primeiroMenuItem = document.querySelector('.menu-item');
  if (primeiroMenuItem) {
    primeiroMenuItem.classList.add('ativo');
  }
});
```

**Verificação:**

```powershell
Test-Path -Path "_assets\scripts.js"
```

Esperado: `True`

---

### Etapa 3: Criar Arquivo `index.html` (Portal)

**Status:** ⬜ Pendente

**Arquivo:** Criar `AULAS/index.html`

**Ação:** Criar página inicial com menu de módulos:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apostila — Reforço Matemática e Raciocínio Lógico</title>
  <link rel="stylesheet" href="_assets/styles.css">
</head>
<body>
  <div class="container">
    <div class="header-controls">
      <h1>📚 Reforço Matemática e Raciocínio Lógico</h1>
      <button class="btn btn-primary">🌙 Tema</button>
    </div>

    <div class="modulo-intro">
      <h2>Bem-vindo à Apostila Completa!</h2>
      <p>Esta apostila foi desenvolvida para alunos do 8º e 9º ano, com foco em reforço dos conceitos matemáticos essenciais.</p>
      <p><strong>Total de conteúdo:</strong> 7 módulos, 140 exercícios, 63 horas de aprendizado.</p>

      <h3>Escolha um módulo para começar:</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
        <a href="modulo-1-operacoes-basicas.html" class="btn btn-primary">Módulo 1: Operações Básicas</a>
        <a href="modulo-2-fracoes-decimais.html" class="btn btn-primary">Módulo 2: Frações e Decimais</a>
        <a href="modulo-3-proporcionalidade.html" class="btn btn-primary">Módulo 3: Proporcionalidade</a>
        <a href="modulo-4-medidas-grandezas.html" class="btn btn-primary">Módulo 4: Medidas</a>
        <a href="modulo-5-raciocinio-logico.html" class="btn btn-primary">Módulo 5: Raciocínio Lógico</a>
        <a href="modulo-6-algebra.html" class="btn btn-primary">Módulo 6: Álgebra</a>
        <a href="modulo-7-tratamento-informacao.html" class="btn btn-primary">Módulo 7: Tratamento de Dados</a>
      </div>
    </div>
  </div>

  <script src="_assets/scripts.js"></script>
</body>
</html>
```

**Verificação:** Abrir `index.html` no navegador e verificar menu

---

### Etapa 4: Criar 7 Arquivos de Módulos

**Status:** ⬜ Pendente

**Arquivos:** Criar 7 arquivos:
- `modulo-1-operacoes-basicas.html`
- `modulo-2-fracoes-decimais.html`
- `modulo-3-proporcionalidade.html`
- `modulo-4-medidas-grandezas.html`
- `modulo-5-raciocinio-logico.html`
- `modulo-6-algebra.html`
- `modulo-7-tratamento-informacao.html`

**Ação (Exemplo para Módulo 1):** Criar `modulo-1-operacoes-basicas.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Módulo 1: Operações Básicas — Reforço Matemática</title>
  <link rel="stylesheet" href="_assets/styles.css">
</head>
<body>
  <div class="layout-wrapper">
    <!-- MENU LATERAL -->
    <nav class="menu-lateral">
      <h3>📚 Módulos</h3>
      <a href="index.html" class="menu-item">🏠 Início</a>
      <a href="modulo-1-operacoes-basicas.html" class="menu-item ativo">Módulo 1: Operações</a>
      <a href="modulo-2-fracoes-decimais.html" class="menu-item">Módulo 2: Frações</a>
      <a href="modulo-3-proporcionalidade.html" class="menu-item">Módulo 3: Proporção</a>
      <a href="modulo-4-medidas-grandezas.html" class="menu-item">Módulo 4: Medidas</a>
      <a href="modulo-5-raciocinio-logico.html" class="menu-item">Módulo 5: Lógica</a>
      <a href="modulo-6-algebra.html" class="menu-item">Módulo 6: Álgebra</a>
      <a href="modulo-7-tratamento-informacao.html" class="menu-item">Módulo 7: Dados</a>
    </nav>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="conteudo-wrapper">
      <div class="container">
        <div class="header-controls">
          <h1>Módulo 1: Operações Básicas e Cálculo Numérico</h1>
          <button class="btn btn-secondary" onclick="window.print()">🖨️ Imprimir</button>
        </div>

        <!-- CONTEÚDO DO MÓDULO -->
        <section id="modulo-1" class="modulo-section">
          <div class="modulo-intro">
            <!-- Introdução Teórica -->
            <div class="intro-teorica">
              <h4>📖 O que vamos aprender?</h4>
              <p>As operações básicas (adição, subtração, multiplicação e divisão) são a fundação de toda a matemática...</p>
            </div>

            <!-- Conceitos-Chave -->
            <div class="conceitos-chave">
              <h4>🔑 Conceitos-Chave</h4>
              <dl>
                <dt><strong>Adição:</strong></dt>
                <dd>Juntar quantidades. Ex: 25 + 18 = 43</dd>
                <!-- ... mais itens ... -->
              </dl>
            </div>

            <!-- Exemplos Práticos -->
            <div class="exemplos-praticos">
              <h4>💡 Exemplos Práticos</h4>
              <div class="exemplo-card">
                <p><strong>Exemplo 1 - Compras no Mercado</strong></p>
                <p>Você compra 3 garrafas por R$ 12 cada. Qual o total?</p>
                <p>Solução: 3 × 12 = R$ 36</p>
              </div>
              <!-- ... mais exemplos ... -->
            </div>

            <!-- Recursos Multimídia -->
            <div class="recursos-multimedia">
              <h4>🎬 Vídeos Recomendados</h4>
              <ul>
                <li>📹 <a href="https://www.youtube.com/" target="_blank">Khan Academy: Operações Básicas</a></li>
              </ul>
            </div>

            <!-- Ludificação -->
            <div class="ludificacao">
              <h4>🎮 Curiosidades</h4>
              <div class="curiosidade-card">
                <p>🧮 <strong>Sabia que?</strong> O símbolo ÷ foi inventado em 1659...</p>
              </div>
              <div class="mini-game">
                <p>Teste seu cálculo mental:</p>
                <button onclick="gerarProblemaOperacoes()" class="btn-game">🎲 Gerar Problema</button>
                <div id="problema-output"></div>
              </div>
            </div>

            <!-- Referências -->
            <div class="referencias">
              <h4>📚 Referências</h4>
              <ul>
                <li><strong>BRASIL.</strong> Parâmetros Curriculares Nacionais: Matemática...</li>
              </ul>
            </div>
          </div>

          <!-- EXERCÍCIOS -->
          <div class="exercicios-section">
            <h4>✏️ 20 Exercícios Práticos</h4>
            <!-- 20 exercícios aqui -->
          </div>
        </section>
      </div>
    </div>
  </div>

  <script src="_assets/scripts.js"></script>
</body>
</html>
```

**Repetar para:** Módulos 2-7 (mesma estrutura, conteúdo diferente)

**Verificação:** Abrir cada arquivo e navegar com menu lateral

---

### Etapa 5: Backup do Arquivo Original

**Status:** ⬜ Pendente

**Ação:** Renomear arquivo original como backup:

```powershell
# Backup do arquivo original
Rename-Item `
  -Path "APOSTILA-COMPLETA-REFORCO-MATEMATICA.html" `
  -NewName "APOSTILA-COMPLETA-REFORCO-MATEMATICA.html.backup"
```

**Verificação:**

```powershell
Get-ChildItem -Path "*.backup"
```

Esperado: Arquivo `.backup` criado

---

### Etapa 6: Commit e Atualizar Grafo

**Status:** ⬜ Pendente

**Ação:**

```powershell
# Navegar até raiz
cd C:\fontes\aulas-senai

# Adicionar todos os arquivos
git add .

# Commit
git commit -m "Refatorar: dividir apostila em múltiplos HTMLs por módulo para melhor manutenção e performance"

# Atualizar grafo
C:\Python314\python.exe -m graphify update .

# Status
git status
```

**Verificação:** `git status` mostra "working tree clean"

---

## ✅ Checklist de Estrutura Final

```
AULAS/
├── index.html                              ✅ Portal inicial
├── modulo-1-operacoes-basicas.html         ✅ Módulo 1 completo
├── modulo-2-fracoes-decimais.html          ✅ Módulo 2 completo
├── modulo-3-proporcionalidade.html         ✅ Módulo 3 completo
├── modulo-4-medidas-grandezas.html         ✅ Módulo 4 completo
├── modulo-5-raciocinio-logico.html         ✅ Módulo 5 completo
├── modulo-6-algebra.html                   ✅ Módulo 6 completo
├── modulo-7-tratamento-informacao.html     ✅ Módulo 7 completo
├── _assets/
│   ├── styles.css                          ✅ CSS centralizado
│   └── scripts.js                          ✅ JS centralizado
└── APOSTILA-COMPLETA-REFORCO-MATEMATICA.html.backup  ✅ Backup
```

---

## 📊 Benefícios da Refatoração

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Tamanho do arquivo** | 1 arquivo ~3000 linhas | 8 arquivos ~250 linhas cada |
| **Performance** | Carregar tudo | Carregar apenas 1 módulo |
| **Manutenção** | Difícil encontrar código | Fácil e rápido |
| **Reutilização** | CSS/JS duplicado | Centralizado em `_assets/` |
| **Escalabilidade** | Adicionar módulo = desordem | Simples: novo arquivo |
| **Colaboração** | Conflitos de merge | Cada um edita 1 arquivo |

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Links entre módulos quebrados | Média | Testar todos os links após refatoração |
| CSS não carrega em alguns navegadores | Baixa | Usar `<link>` com caminho relativo correto |
| JS não executa em offline | Baixa | Deixar cópia local de bibliotecas CDN |
| Arquivo muito grande mesmo separado | Baixa | Considerar lazy-load de imagens |

---

## 📝 Notas Importantes

- **Caminhos relativos:** Usar `_assets/styles.css` de forma correta em todos os módulos
- **Menu navegável:** Cada página deve ter menu permitindo navegar entre módulos
- **Volta ao portal:** Link "🏠 Início" sempre disponível
- **Responsividade:** Todos os arquivos devem funcionar em mobile
- **Compatibilidade:** Testar em Chrome, Firefox, Safari, Edge

---

## ✅ Checklist de Validação

- [ ] Pasta `_assets/` criada
- [ ] `styles.css` criado e compartilhado
- [ ] `scripts.js` criado e funcional
- [ ] `index.html` portal criado e funciona
- [ ] 7 módulos criados com conteúdo correto
- [ ] Menu lateral presente em cada página
- [ ] Links entre módulos funcionando
- [ ] CSS carregando corretamente
- [ ] JS executando sem erros
- [ ] Arquivo original com backup
- [ ] Commit realizado
- [ ] Grafo atualizado

---

**Data Criação:** 2026-09-19  
**Status:** ⬜ Planejado — Aguardando Aprovação do Usuário
