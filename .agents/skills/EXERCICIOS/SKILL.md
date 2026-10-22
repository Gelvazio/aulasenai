---
name: exercicios
description: Gera layout profissional de exercícios com exportação PDF SENAI
---

# SKILL — Exercícios com Exportação PDF SENAI

## Propósito

Criar um sistema completo de exercícios com:
- Layout HTML estruturado por módulos
- CSS moderno com animações
- Exportação para PDF com cabeçalho profissional SENAI
- Tabelas formatadas com bordas finas
- Labels em negrito (CAPACIDADE, Contexto, Comando)

## Estrutura HTML

```html
<!-- Scripts necessários -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

<!-- Cada módulo dentro de uma div.aula -->
<div class="aula" id="aula-1">
  <h2>Nome do Módulo</h2>
  
  <h3>✏️ Exercícios 
    <button class="btn-export-pdf" onclick="exportarPDFExercicios()">📥 Exportar PDF</button>
  </h3>
  
  <!-- Container de exercícios com ID obrigatório -->
  <div class="exercicios" id="exercicios-modulo">
    
    <!-- Cada exercício em uma caixa -->
    <div class="exercicio-box">
      <div class="exercicio-header">ITEM 1</div>
      <div class="exercicio-content">
        <p><span class="exercicio-label">CAPACIDADE:</span> Competências aqui</p>
        <div style="border-bottom: 1px solid black; margin: 12px 0;"></div>
        <p><span class="exercicio-label">Contexto:</span> Descrição do contexto</p>
        <p><span class="exercicio-label">Comando:</span> Pergunta/tarefa</p>
        <div class="resposta-campo">
          <span class="exercicio-label">Resposta:</span>
          <div class="resposta-linha"></div>
          <div class="resposta-linha"></div>
        </div>
      </div>
    </div>
    
    <!-- Mais exercícios... -->
  </div>
</div>
```

## CSS Essencial

```css
/* Estilo do botão exportar */
.btn-export-pdf {
  background: #f7941d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-export-pdf:hover {
  background: #e87e0d;
}

/* Estilos dos exercícios */
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

.exercicio-label {
  font-weight: 600;
  color: #004384;
}

.resposta-linha {
  border-bottom: 1px solid #333;
  height: 25px;
  margin: 8px 0;
}
```

## Função de Exportação PDF

```javascript
function exportarPDFExercicios() {
    // Encontrar o #exercicios-modulo visível na tela
    const todasListas = document.querySelectorAll('#exercicios-modulo');
    let exerciciosElement = null;
    let moduloAtual = null;
    let moduloNum = 1;

    for (let lista of todasListas) {
        const rect = lista.getBoundingClientRect();
        if (rect.top >= -rect.height && rect.top < window.innerHeight) {
            exerciciosElement = lista;
            moduloAtual = lista.closest('.aula');
            if (moduloAtual && moduloAtual.id) {
                moduloNum = moduloAtual.id.split('-')[1];
            }
            break;
        }
    }

    if (!exerciciosElement) {
        alert('Nenhum exercício visível na tela');
        return;
    }

    // Extrair TODOS os exercícios do módulo atual
    const exercicios = [];
    exerciciosElement.querySelectorAll('.exercicio-box').forEach((box) => {
        const header = box.querySelector('.exercicio-header')?.textContent || '';
        const textos = [];
        box.querySelectorAll('p').forEach(p => {
            const txt = p.textContent.trim();
            if (txt) textos.push(txt);
        });
        exercicios.push({
            header: header,
            content: textos
        });
    });

    const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDF) {
        alert('Erro: jsPDF não carregado');
        return;
    }
    const doc = new jsPDF('p', 'mm', 'a4');

    let yPos = 20;
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    // CABEÇALHO SENAI
    let tituloExercicio = exercicios.length > 0 ? exercicios[0].header : 'EXERCÍCIOS';
    tituloExercicio = tituloExercicio.replace(/ITEM\s+\d+\s*-?\s*/, '').trim();
    
    const nomeModulo = moduloAtual?.querySelector('h2')?.textContent || 'EXERCÍCIOS';
    const tituloModulo = 'EXERCÍCIOS ' + nomeModulo.replace(/^[\d\s\.]+/, '').trim().toUpperCase();
    
    const headerData = [
        [
            {
                content: 'SENAI\nServiço Nacional de Aprendizagem Industrial\nSanta Catarina',
                styles: { fontStyle: 'bold', fontSize: 10, halign: 'center', fillColor: [0, 51, 153], textColor: [255, 255, 255] },
                colSpan: 2
            },
            {
                content: tituloExercicio,
                styles: { fontStyle: 'bold', fontSize: 11, halign: 'center', fillColor: [240, 240, 240] }
            },
            {
                content: 'Desempenho',
                styles: { fontStyle: 'bold', fontSize: 10, halign: 'center', fillColor: [240, 240, 240] }
            }
        ],
        [
            { content: tituloModulo, styles: { fontSize: 10, fontStyle: 'bold' }, colSpan: 4 }
        ],
        [
            { content: 'Data: ___/___/___', styles: { fontSize: 10 } },
            { content: '', styles: { fontSize: 10 } },
            { content: '', styles: { fontSize: 10 } },
            { content: '', styles: { fontSize: 10 } }
        ],
        [
            { content: 'Docente: GELVAZIO CAMARGO', styles: { fontSize: 10, fontStyle: 'bold' }, colSpan: 2 },
            { content: '', styles: { fontSize: 10 } },
            { content: '', styles: { fontSize: 10 } }
        ],
        [
            { content: 'Unidade Curricular: ___________________', styles: { fontSize: 10 }, colSpan: 2 },
            { content: 'Turma: ___________________', styles: { fontSize: 10 }, colSpan: 2 }
        ],
        [
            { content: 'Estudante: ___________________________________________________', styles: { fontSize: 10 }, colSpan: 4 }
        ]
    ];

    doc.autoTable({
        body: headerData,
        startY: yPos,
        margin: margin,
        columnStyles: { 
            0: { cellWidth: 30 },
            1: { cellWidth: 60 },
            2: { cellWidth: 60 },
            3: { cellWidth: 30 }
        },
        styles: { 
            fontSize: 10,
            cellPadding: 4,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            textColor: [0, 0, 0]
        }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // EXERCÍCIOS EM TABELAS
    exercicios.forEach((ex, idx) => {
        const tableData = [];
        
        tableData.push([{
            content: ex.header,
            styles: { fontStyle: 'bold', fontSize: 13, halign: 'center', fillColor: [220, 220, 220] }
        }]);
        
        ex.content.forEach(line => {
            const labels = ['CAPACIDADE:', 'Contexto:', 'Comando:'];
            let isBoldLabel = false;
            
            for (let label of labels) {
                if (line.startsWith(label)) {
                    isBoldLabel = true;
                    break;
                }
            }
            
            tableData.push([{
                content: line,
                styles: { 
                    fontSize: 11, 
                    halign: 'left',
                    fontStyle: isBoldLabel ? 'bold' : 'normal'
                }
            }]);
        });

        doc.autoTable({
            head: [],
            body: tableData,
            startY: yPos,
            margin: margin,
            pageBreak: 'auto',
            columnStyles: { 0: { cellWidth: 'auto', halign: 'left' } },
            didDrawPage: function(data) {
                yPos = data.cursor.y;
            },
            styles: {
                fontSize: 11,
                cellPadding: 5,
                lineColor: [0, 0, 0],
                lineWidth: 0.1
            }
        });

        yPos = doc.lastAutoTable.finalY + 8;
    });

    doc.save('Exercicios-Modulo-' + moduloNum + '.pdf');
}
```

## Como Usar

1. **Copie a estrutura HTML** dos exercícios para seu projeto
2. **Adicione os scripts CDN** (html2pdf, jsPDF, jsPDF-AutoTable)
3. **Copie o CSS** para seu stylesheet
4. **Copie a função JavaScript** para seu arquivo JS
5. **Adicione o botão** de exportação dentro de `<h3>✏️ Exercícios ...</h3>`

## Personalizações

- **Docente:** Editar `'Docente: GELVAZIO CAMARGO'` na função
- **Cores:** Modificar `fillColor` e `textColor` no headerData
- **Fonte:** Ajustar `fontSize` em cada seção
- **Bordas:** Modificar `lineWidth: 0.1` para espessura diferente

## Estrutura Obrigatória

- ✅ Div `.aula` com `id="aula-N"`
- ✅ H2 com nome do módulo
- ✅ Div `#exercicios-modulo` (ÚNICA POR MÓDULO)
- ✅ Divs `.exercicio-box` com `.exercicio-header` e `.exercicio-content`
- ✅ Paragrafos com `.exercicio-label` para CAPACIDADE, Contexto, Comando

## Resultado

- 📄 PDF profissional com cabeçalho SENAI
- 📋 Exercícios em tabelas com bordas finas
- 🎯 Exporta apenas o módulo atual
- 🔤 Labels em negrito automaticamente
- 📐 Formatação consistente e elegante
