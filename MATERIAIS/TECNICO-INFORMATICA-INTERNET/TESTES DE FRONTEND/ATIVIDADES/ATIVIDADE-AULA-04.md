# ATIVIDADE AULA 04 — Testes de Integração com DOM usando Testing Library

**Slides:** `AULAS-CHALKIE-AI/4-Testes-de-Integração-com-DOM-usando-Testing-Library.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, individual  
**Capacidades:** C1, C4, C5 | **Conhecimentos:** 2.3 · 3.1 · 4.1 · 4.2  
**Entrega da aula:** testes de um botão com estados e de um formulário

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (Vitest e AAA) | 15 min |
| Passo 0 — Instalar Testing Library e JSDOM | 30 min |
| Prática 1 — Botão "Seguir" | 70 min |
| Prática 2 — Formulário de cadastro | 80 min |
| Desafio de ordem e entrega | 45 min |

---

## Passo 0 — Ambiente

No projeto da aula 3:

```bash
npm install --save-dev jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```

`vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: { environment: 'jsdom', setupFiles: ['./tests/setup.js'] }
});
```

`tests/setup.js`: `import '@testing-library/jest-dom/vitest';`

> Se a turma usa React, troque `@testing-library/dom` por `@testing-library/react` e `render(<Componente />)`; as queries são as mesmas.

---

## Regra da aula — teste o comportamento

| ❌ Detalhe de implementação | ✅ Comportamento visível |
|---|---|
| `document.querySelector('.btn-primary')` | `screen.getByRole('button', { name: 'Seguir' })` |
| Ler variável interna do componente | Conferir o texto mostrado na tela |

**Ordem de preferência das queries:** `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByTestId` (último recurso).
`getBy` = deve existir · `queryBy` = confirmar ausência · `findBy` = esperar algo assíncrono.

---

## 1. Prática 1 — Botão "Seguir"

Crie `src/botaoSeguir.js`, que monta um `<button aria-pressed="false">Seguir</button>` e, ao clicar,
alterna para **Seguindo** (`aria-pressed="true"`) e chama o callback `aoAlternar(estado)`.

Escreva `tests/botaoSeguir.test.js`:
1. **Arrange:** montar o botão num `div` do `document.body` com `aoAlternar = vi.fn()`; `const usuario = userEvent.setup()`.
2. **Act:** `await usuario.click(screen.getByRole('button', { name: 'Seguir' }))`.
3. **Assert:** o callback foi chamado com `true` e o botão agora tem o nome **Seguindo**.
4. **Bônus:** `expect(botao).toHaveAttribute('aria-pressed', 'true')` e segundo clique volta a **Seguir**.

---

## 2. Prática 2 — Formulário de cadastro

Crie `src/formularioCadastro.js` com campos **Nome** e **Senha** (com `<label>`) e botão **Cadastrar**.
Regras: botão desabilitado enquanto a senha tiver menos de 6 caracteres; nesse caso, mostrar
**"A senha deve ter no mínimo 6 dígitos"**.

Testes obrigatórios:
1. Localizar os campos com `getByLabelText('Nome')` e `getByLabelText('Senha')`.
2. Digitar senha `123` com `usuario.type()` → alerta visível e botão desabilitado (`toBeDisabled`).
3. Corrigir para `123456` → alerta some (`queryByText(...)` é `null`) e botão habilitado (`toBeEnabled`).
4. Enviar o formulário válido → mensagem de sucesso com `findByText`.

> 🧯 **Erro comum:** esquecer `await` antes de `usuario.type` e `usuario.click` faz o teste passar sem testar nada.

---

## 3. Desafio — O fluxo perfeito

Coloque em ordem e explique cada passo: localizar o campo pelo rótulo · configurar `userEvent` e montar o formulário · digitar e clicar · validar a mensagem com `toBeInTheDocument()`.

---

## 4. Entrega e avaliação

**Entregar:** link do repositório ou pasta + print dos testes passando.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Queries (C1) | Só por papel, rótulo ou texto | 1 query frágil | 2–3 frágeis | Seletores CSS |
| Botão (C5) | Estados, callback e `aria-pressed` | Sem bônus | Só 1 estado | Ausente |
| Formulário (C4) | 4 testes passando | 3 | 2 | ≤ 1 |
| Interação realista | `userEvent` com `await` em tudo | Pequenas falhas | `fireEvent` | — |

**Próxima aula:** integrar componentes com API simulada (MSW).
