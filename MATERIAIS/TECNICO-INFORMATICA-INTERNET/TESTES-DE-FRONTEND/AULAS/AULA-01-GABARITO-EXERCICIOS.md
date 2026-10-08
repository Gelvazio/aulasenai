# GABARITO — Aula 01, Exercício 1 (só professor)

> Separado de `AULA-01-GUIA-LABORATORIO.md` em 2026-10-03. Arquivo fora do Git (`*gabarito*`).

## Classificação dos 10 cenários

```
1. INTEGRAÇÃO (envolve DOM + evento)
2. UNITÁRIO (função isolada)
3. E2E (fluxo completo do usuário)
4. INTEGRAÇÃO (validação + DOM)
5. UNITÁRIO (função pura)
6. INTEGRAÇÃO (interação DOM)
7. E2E (fluxo completo)
8. UNITÁRIO (função assíncrona isolada)
9. INTEGRAÇÃO (interação de componente)
10. INTEGRAÇÃO (teste de API)
```

---

# Exercício 01 (`AULA-01-EXERCICIO-01.md`)

## 📝 GABARITO (Para Professor Apenas)

```
1. I (integração)    — evento + DOM + estado
2. U (unitário)      — função isolada
3. E (E2E)           — fluxo completo
4. I (integração)    — componente + validação + UI
5. U (unitário)      — função pura isolada
6. I (integração)    — componente + lógica
7. E (E2E)           — fluxo usuário completo
8. U (unitário)      — função isolada (mesmo assíncrona)
9. I (integração)    — interações de componente
10. I (integração)   — cliente + servidor
```

---

## ✅ GABARITO COMENTADO

### 1️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Evento de click (DOM)
- Mudança de estado (variável que controla visibilidade)
- Renderização de modal (UI)

Múltiplas partes trabalhando juntas = **Integração**

**Não é E2E porque:** Não é fluxo do usuário do início ao fim, só uma ação

---

### 2️⃣ UNITÁRIO ✓

**Por quê?** 
- Testando UMA função isolada
- Sem dependências externas
- Sem UI

Função isolada = **Unitário**

---

### 3️⃣ E2E ✓

**Por quê?** Fluxo completo:
1. Login (tela 1)
2. Dashboard (tela 2)
3. Vendas (tela 3)
4. Lista (tela 4)

Começando do primeiro passo até objetivo final = **E2E**

---

### 4️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Componente input (DOM)
- Evento blur (interação)
- Função de validação (lógica)
- Mensagem de erro (UI)

Múltiplas partes = **Integração**

**Não é E2E porque:** Só testa uma ação, não fluxo completo

---

### 5️⃣ UNITÁRIO ✓

**Por quê?**
- Função isolada
- Sem UI
- Sem dependências

Mesmo que seja método nativo = **Unitário**

---

### 6️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Componente input (DOM)
- Limite de caracteres (lógica)
- Input não aceita mais (UI feedback)

**Não é unitário porque:** Envolve UI/DOM

**Não é E2E porque:** Só testa uma ação

= **Integração**

---

### 7️⃣ E2E ✓

**Por quê?** Fluxo completo:
1. Selecionar arquivo (ação 1)
2. Ver preview (feedback)
3. Clicar confirmar (ação 2)
4. Arquivo salvo (resultado final)

Começo até fim = **E2E**

---

### 8️⃣ UNITÁRIO ✓

**Por quê?**
- Função isolada (mesmo assíncrona)
- Pode ser testada com mock/stub
- Sem UI

Função isolada = **Unitário**

> **Nota importante:** Testes assíncrono ainda são **unitários** se a função é isolada!

---

### 9️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Múltiplas interações (click X, click fora)
- Componente modal (DOM)
- Mudança de estado (visível ↔ invisível)

**Não é E2E porque:** Só testa um componente isolado, não fluxo do usuário

= **Integração**

---

### 🔟 INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Cliente (seu código JavaScript)
- Servidor (API)
- Comunicação entre eles

**Não é unitário porque:** Depende de backend

**Não é E2E porque:** Só testa 1 endpoint, não fluxo completo do usuário

= **Integração**
