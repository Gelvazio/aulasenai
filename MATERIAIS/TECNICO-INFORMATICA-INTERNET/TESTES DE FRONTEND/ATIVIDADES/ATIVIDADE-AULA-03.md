# ATIVIDADE AULA 03 — Testes Unitários no Front-End com Vitest

**Slides:** `AULAS-CHALKIE-AI/3-Testes-Unitários-no-Frontend-com-Vitest.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, individual  
**Capacidades:** C4, C5 · S1 | **Conhecimentos:** 2.1 · 2.2 · 2.3 · 3.2  
**Entrega da aula:** suíte unitária de funções utilitárias + teste com mock de API

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (verificação e planejamento) | 15 min |
| Passo 0 — Preparar o projeto | 35 min |
| Prática 1 — 5 funções utilitárias | 90 min |
| Prática 2 — Mock de API de autenticação | 60 min |
| Debate "Quanto devemos mockar?" e entrega | 40 min |

---

## Passo 0 — Preparar o projeto

```bash
mkdir testes-front-end && cd testes-front-end
npm init -y
npm install --save-dev vitest @vitest/coverage-v8
mkdir src tests
```

No `package.json`, inclua `"type": "module"` e os scripts:

```json
"scripts": { "test": "vitest", "test:run": "vitest run", "test:coverage": "vitest run --coverage" }
```

> ✅ **Verifique:** `npx vitest --version` mostra a versão instalada.
> 🧯 **Erros comuns:** `npm: command not found` → instalar Node.js LTS · `Cannot use import` → faltou `"type": "module"`.

**Guarde este projeto:** ele será usado até a aula 10.

---

## 1. Prática 1 — Funções utilitárias

Crie `src/utilitarios.js` com as 5 funções e `tests/utilitarios.test.js` com os testes.

| Função | Regra | Casos mínimos |
|---|---|---|
| `validarEmail(texto)` | `true` se tiver `@` e domínio com ponto | válido, sem `@`, vazio |
| `calcularFrete(km)` | R$ 15,00 até 10 km; acima, + R$ 2,00 por km excedente | 5 km, 10 km, 13 km |
| `formatarMoeda(centavos)` | 12345 → `"R$ 123,45"` (pt-BR) | valor comum, zero |
| `removerDuplicados(lista)` | itens únicos usando `Set` | com repetidos, lista vazia |
| `obterIniciais(nome)` | "ana maria souza" → `"AM"` | nome composto, nome único |

Modelo de teste no padrão **AAA**:

```javascript
import { describe, it, expect } from 'vitest';
import { calcularFrete } from '../src/utilitarios.js';

describe('calcularFrete', () => {
  it('cobra valor fixo até 10 km', () => {
    // Arrange
    const distancia = 10;
    // Act
    const frete = calcularFrete(distancia);
    // Assert
    expect(frete).toBe(15);
  });
});
```

**Regras:**
- Cada função com **caminho feliz** e pelo menos **um caso de borda**.
- Use o matcher certo: `toBe` (primitivos), `toEqual` (arrays e objetos), `toBeTruthy`/`toBeFalsy`, `toHaveLength`, `toContain`.
- Rode `npm run test:run` e anote qual matcher validou cada tipo de dado.

> ⚠️ **Armadilha:** `expect([1, 2]).toBe([1, 2])` falha — arrays diferentes na memória. Use `toEqual`.

---

## 2. Prática 2 — Mock de API de autenticação

Crie `src/autenticacao.js`:

```javascript
export async function autenticar(cliente, email, senha) {
  const resposta = await cliente.post('/api/login', { email, senha });
  if (resposta.status !== 200) throw new Error('Credenciais inválidas');
  return resposta.dados.token;
}
```

Em `tests/autenticacao.test.js`, **sem acessar a rede**:
1. Crie `clienteFalso = { post: vi.fn() }`.
2. Teste o sucesso: `mockResolvedValue({ status: 200, dados: { token: 'abc' } })` → retorna `'abc'`.
3. Teste a recusa: `mockResolvedValue({ status: 401 })` → `await expect(...).rejects.toThrow('Credenciais inválidas')`.
4. Confirme com `toHaveBeenCalledWith('/api/login', {...})` que a função enviou os dados certos.
5. Use `beforeEach(() => vi.clearAllMocks())` para isolar os testes.

---

## 3. Debate (S1)

"Quanto devemos mockar?" Liste 2 riscos de mockar demais e 2 de mockar de menos; registre uma ideia de colega que mudou sua opinião.

---

## 4. Entrega e avaliação

**Entregar:** pasta do projeto (sem `node_modules`) ou link do repositório + print do terminal com todos os testes passando.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Suíte utilitária (C5) | 5 funções, ≥ 12 testes, bordas cobertas | 10–11 testes | 7–9 testes | < 7 ou falhando |
| Matchers e AAA (C4) | Matcher adequado em todos | 1–2 inadequados | 3+ inadequados | Sem asserções |
| Mock (C5) | Sucesso, recusa e chamada verificados | Falta 1 | Falta 2 | Ausente |
| Isolamento | `beforeEach` e testes independentes | Parcial | Dependentes | — |

**Próxima aula:** testar o que o usuário vê com a Testing Library.
