# ATIVIDADE AULA 09 — Qualidade, Performance, Acessibilidade e CI/CD

**Slides:** `AULAS-CHALKIE-AI/9-Qualidade,-Performance,-Acessibilidade-e-CI-CD.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, em dupla  
**Capacidades:** C4, C5 · S1, S2 | **Conhecimentos:** 2.4 · 4.2 · 4.4 · 7.4  
**Entrega da aula:** pipeline no GitHub Actions + auditoria de acessibilidade e performance — **SA 2**

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (TDD e depuração) | 15 min |
| Prática 1 — Workflow de CI | 75 min |
| Prática 2 — Bloquear merge com teste quebrado | 35 min |
| Prática 3 — Acessibilidade com axe-core | 45 min |
| Prática 4 — Lighthouse e badges | 40 min |
| Debate e entrega | 30 min |

---

## 1. Prática 1 — Workflow de CI

No repositório da dupla (GitHub), crie `.github/workflows/ci.yml`:

```yaml
name: Testes
on:
  push:
    branches: [main]
  pull_request:
jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test:coverage
```

> ⚠️ YAML exige indentação exata: **2 espaços** por nível, nunca tab.
> 💡 `npm ci` instala exatamente o que está no `package-lock.json` — builds iguais em qualquer máquina.

Os limites de 80% da aula 7 fazem o job falhar se a cobertura cair.

> ✅ **Verifique:** a aba **Actions** mostra o workflow verde no último push.

---

## 2. Prática 2 — Bloqueio de merge

1. Em **Settings → Branches**, crie regra para `main` exigindo o status **testes** antes do merge.
2. Crie uma branch, quebre um teste de propósito e abra um **Pull Request**.
3. Confirme que o PR fica **bloqueado** (check vermelho).
4. Corrija o teste, faça novo push e veja o check ficar verde e o merge liberado.
5. Peça ao colega de dupla para **revisar e aprovar** o PR (interação com a equipe, 2.4).

---

## 3. Prática 3 — Acessibilidade (axe-core)

```bash
npm install --save-dev vitest-axe
```

```javascript
import { axe } from 'vitest-axe';
it('formulário de checkout não tem violações de acessibilidade', async () => {
  montarCheckout(document.body);
  const resultado = await axe(document.body);
  expect(resultado.violations).toHaveLength(0);
});
```

1. Rode primeiro com um formulário **sem `<label>`** e com contraste baixo.
2. Anote a regra WCAG violada que aparece no console.
3. Corrija (rótulos, `aria-label`, contraste) até o teste passar.

---

## 4. Prática 4 — Performance e badges

1. No Chrome DevTools → **Lighthouse**, audite a página de checkout (modo mobile).
2. Registre as notas de Performance e Acessibilidade e os valores de **LCP**, **INP** e **CLS**.
3. Proponha 1 melhoria para o pior indicador (ex.: imagem otimizada para LCP).
4. Adicione ao `README.md` o badge do workflow:
   `![Testes](https://github.com/<usuario>/<repositorio>/actions/workflows/ci.yml/badge.svg)`

---

## 5. Debate (S1, S2)

"Bloquear ou não bloquear o merge numa correção urgente de sexta-feira?" Cada dupla decide e justifica com risco, prazo e impacto no usuário; registra um argumento contrário que considerou válido.

---

## 6. Entrega e avaliação

**Entregar:** link do repositório com `ci.yml`, link do PR bloqueado e depois liberado, print do axe antes/depois e tabela do Lighthouse.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Workflow (C5) | Push e PR, cache, cobertura, verde | Sem cache | Só push | Não roda |
| Bloqueio (C4) | Regra, PR bloqueado e liberado | Sem revisão | Sem regra | Ausente |
| Acessibilidade (4.2) | Violação achada e corrigida | Achada | Parcial | Ausente |
| Performance (4.4) | Métricas + melhoria proposta | Só métricas | Incompleto | Ausente |

**Próxima aula:** projeto integrador e avaliações finais.
