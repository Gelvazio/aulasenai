# EXERCÍCIO 01 — Aula 01: Classificar Tipos de Testes

**Duração:** 15 minutos  
**Dificuldade:** ⭐ Fácil  
**Objetivo:** Aplicar conceitos de tipos de testes (unitário, integração, E2E)  

---

## 📋 INSTRUÇÃO

Classifique cada cenário de teste abaixo como:
- **U** = Unitário (teste de função isolada)
- **I** = Integração (múltiplas partes)
- **E** = E2E (fluxo completo do usuário)

**Tempo:** 15 minutos sem consultar material

---

## 🎯 CENÁRIOS

### 1️⃣ Botão "Enviar" abre modal de confirmação

**Contexto:** Teste para aplicação de formulário

**Teste:** Quando usuário clica botão "Enviar", uma modal aparece com "Tem certeza?"

**Classifique como:** `_____`

**Dica:** Envolve mais de uma parte trabalhando junto (evento + DOM + estado)

---

### 2️⃣ Função calcularImposto(100, 0.1) retorna 110

**Contexto:** Função JavaScript pura

```javascript
function calcularImposto(valor, aliquota) {
  return valor + (valor * aliquota);
}

// Teste: 
// Input: (100, 0.1)
// Expected: 110
```

**Classifique como:** `_____`

**Dica:** Está testando uma função isolada, sem UI

---

### 3️⃣ Usuário faz login → vê dashboard → clica "Vendas" → vê lista de vendas

**Contexto:** Fluxo completo de navegação

**Teste:** Simulação completa de usuário novo acessando sistema

**Classifique como:** `_____`

**Dica:** Começa do início até um objetivo final

---

### 4️⃣ Quando campo de email perde foco (blur), valida se é email válido

**Contexto:** Validação em componente de formulário

**Teste:** 
- Usuário digita "invalido@"
- Campo perde foco
- Mensagem de erro aparece

**Classifique como:** `_____`

**Dica:** Envolve input + evento + validação + UI

---

### 5️⃣ Array.sort() ordena números em ordem crescente

**Contexto:** Teste de função JavaScript nativa

```javascript
const numeros = [3, 1, 4, 1, 5];
const resultado = numeros.sort((a, b) => a - b);
// Expected: [1, 1, 3, 4, 5]
```

**Classifique como:** `_____`

**Dica:** Função isolada, nenhuma UI envolvida

---

### 6️⃣ Input de texto aceita máximo 50 caracteres

**Contexto:** Validação de comprimento de campo

**Teste:**
- Digita 60 caracteres
- Apenas 50 são aceitos
- 10 caracteres são ignorados

**Classifique como:** `_____`

**Dica:** Envolve componente (input) + lógica de validação + UI

---

### 7️⃣ Usuário faz upload de arquivo → vê preview → clica "Confirmar" → arquivo é salvo

**Contexto:** Fluxo completo de upload

**Teste:** Simular usuário do início (selecionar arquivo) até fim (salvo no servidor)

**Classifique como:** `_____`

**Dica:** Fluxo do usuário de ponta a ponta

---

### 8️⃣ Promise que busca dados resolve com objeto correto

**Contexto:** Teste de função assíncrona

```javascript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Teste: fetchUser(1) resolve com { id: 1, name: "João" }
```

**Classifique como:** `_____`

**Dica:** Função isolada (mesmo sendo assíncrona)

---

### 9️⃣ Modal fecha quando usuário clica botão "X" ou fora da modal

**Contexto:** Interação de componente

**Teste:**
- Abre modal
- Clica X → modal fecha ✅
- Abre novamente
- Clica fora → modal fecha ✅

**Classifique como:** `_____`

**Dica:** Múltiplas interações de um componente

---

### 🔟 API GET /users retorna JSON com estrutura { id, name, email }

**Contexto:** Teste de endpoint de API

**Teste:** Fazer requisição GET, verificar se retorna estrutura correta

**Classifique como:** `_____`

**Dica:** Envolve backend + comunicação entre cliente/servidor

---

## 📝 GABARITO

No arquivo `AULA-01-GABARITO-EXERCICIOS.md` (só professor, fora do Git).

---

## 🎯 RESPOSTA ESPERADA

**Resultado ideal:**
- Acertar 8-10: ✅ Domina conceitos
- Acertar 6-7: 🟡 Bom entendimento
- Acertar 4-5: ⚠️ Revisar conteúdo
- Acertar <4: ❌ Reforço necessário

---

## 💡 INSIGHTS COMUNS

### Erro Frequente #1
**Confundir "com UI" com "E2E"**

❌ Errado: "Se testa UI, é E2E"
✅ Certo: "E2E testa UI + fluxo completo do usuário"

**Exemplo:**
- Teste que modal fecha = **Integração** (só 1 componente)
- Teste login → vê modal = **E2E** (fluxo completo)

---

### Erro Frequente #2
**Confundir "assíncrono" com "integração"**

❌ Errado: "Promise é integração porque é complexa"
✅ Certo: "Função assíncrona isolada é unitário"

**Diferença:**
- `fetchUser()` sozinha = **Unitário**
- `fetchUser()` + usar resultado em UI = **Integração**

---

### Erro Frequente #3
**Classificar por "quantidade de código" em vez de "escopo"**

❌ Errado: "100 linhas = Integração"
✅ Certo: "Função isolada = Unitário, mesmo com 100 linhas"

---

## 📚 REFERÊNCIA RÁPIDA

| Pergunta | Resposta | Tipo |
|----------|----------|------|
| "Testa UMA função isolada?" | SIM | ✅ UNITÁRIO |
| "Envolve múltiplas partes (UI + lógica)?" | SIM | ✅ INTEGRAÇÃO |
| "Fluxo completo do usuário?" | SIM | ✅ E2E |
| "Sem UI?" | SIM | → Probablemente UNITÁRIO |
| "Com UI?" | SIM | → Probablemente INTEGRAÇÃO ou E2E |

---

## 🏆 DICA DE SUCESSO

**Quando em dúvida, pergunte-se:**

> "Quantas partes diferentes estou testando ao mesmo tempo?"

- **1 parte** (função) = **UNITÁRIO**
- **2-3 partes** (componente + lógica) = **INTEGRAÇÃO**
- **Todas as partes** (fluxo do usuário) = **E2E**

---

**Fim do Exercício 01**

*Dificuldade: Fácil*  
*Tempo: 15 min*  
*Conceito: Tipos de Testes*
