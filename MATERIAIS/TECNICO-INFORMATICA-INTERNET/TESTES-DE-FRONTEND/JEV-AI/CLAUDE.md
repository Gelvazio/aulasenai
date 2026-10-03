# 🤖 CLAUDE.md — JEV-AI (TypeSafe AI)

Como funciona o **Jev** e como implementá-lo. Registrado em 2026-10-03 a partir de:

- Post de lançamento: <https://typesafe.ai/blog/introducing-system-one-models-and-jev>
  (Diogo Almeida, fundador da TypeSafe AI, 28/09/2026)
- Documentação: <https://docs.typesafe.ai/> (índice completo em `/llms.txt`), quickstart,
  referência da API (`/api.md`), SDK JavaScript (`/sdk/javascript.md`) e confiança (`/confidence.md`)
- Adaptador para comparar com LLMs: <https://github.com/typesafe-ai/system-one-adapter-python> (MIT)

> ⚠️ Números de velocidade, custo e "sem alucinação" são **afirmações do fabricante** (o próprio
> post diz que os ganhos citados tendem a ser o melhor caso). O Jev está em **early access**:
> conferir a documentação antes de implementar, porque nomes de campos e preços podem mudar.
> Este arquivo segue as regras do `CLAUDE.md` da raiz do projeto, que têm precedência.

---

## 1. O que é

- **System One models:** nova classe de modelos feitos para **decisões rápidas e estruturadas**
  dentro de software, e não para conversar. O nome vem do "Sistema 1" de Daniel Kahneman
  (*Rápido e Devagar*): pensamento rápido e intuitivo.
- **Jev:** o primeiro modelo público dessa classe (nome em homenagem a William Stanley Jevons).
  Na API aparece como `jev-latest` (a resposta informa a versão, ex.: `jev-1.13.0`).
- **Ideia central:** "Jev avalia **perguntas tipadas** (*questions*) contra um **estado**
  (*state*) e devolve resultados estruturados". Ele **não gera texto livre**.

## 2. Como funciona

| Item | LLM comum | Jev (System One) |
|---|---|---|
| Saída | Texto (string), pode inventar formato | Valor **tipado**, escolhido entre saídas **definidas antes** |
| Amostragem | Token por token | **Paralela**: todas as respostas numa única consulta |
| Treino | RLHF / RLVR | **RLCD** (*Reinforcement Learning for Calibrated Decisions*) |
| Confiança | Costuma ser exagerada | **Probabilidades calibradas** + `confidence` por resposta |
| Velocidade (fabricante) | 3 a 329 s | 70 a 500 ms |
| Preço (post de 28/09/2026) | $0,20–10 por milhão de tokens de entrada | $0,042 por milhão de tokens de entrada; saída gratuita |

**Entrada (`state`):** texto, objeto ou lista (dados do programa, ex.: um chamado, uma resposta de
aluno, um documento). Ainda **não aceita imagens**.

**Perguntas (`questions`):** um mapa `nome → pergunta`. Três primitivas:

| Primitiva | Para quê | Campos | Resposta |
|---|---|---|---|
| **Choice** | Escolher **uma** opção | `instructions` + `criteria` (mapa opção → descrição; até **255** opções) | `choice`, probabilidades de cada opção, `confidence` |
| **Score** | Nota numa **escala ordenada** (rubrica) | `instructions` + `criteria` (lista de **2 a 10** níveis, do menor ao maior) | `score` (média ponderada pelas probabilidades), `confidence` |
| **Noul** | Sim/não | `instructions` (e `criteria` opcional) | `noul` = probabilidade de 0 a 1 |

**Garantia de tipo:** como as saídas possíveis são fixadas antes, a resposta sempre é uma delas
(o fabricante chama de "matematicamente impossível" errar o tipo). Isso **não** garante que a
escolha esteja certa: por isso existe a confiança.

### Confiança × probabilidade

- **Probabilidade:** a distribuição entre as opções/níveis.
- **Confiança (0 a 1):** o quanto essa distribuição está concentrada.
  - Choice: `(p_max − 1/n) / (1 − 1/n)` (0 = dividido igual entre as opções; 1 = certeza).
  - Score: considera a distância entre níveis (errar para o nível vizinho pesa menos).
- **Uso recomendado:** confiança **alta** → agir automaticamente; **média** → pedir confirmação ou
  revisar; **baixa** → **não agir** e mandar para um humano. Ações de maior risco exigem limite
  maior (ex.: `< 0.5` revisão humana; `> 0.9` para executar algo sensível).

### Usos indicados pelo fabricante

Classificar, rotear, pontuar, extrair, ramificar fluxos; transformar grandes volumes de texto em
dados (*map-reduce*); aplicações em tempo real (~100 ms); verificação e *guardrails*
("score, judge, verify"). Padrões da documentação: muitas perguntas numa só chamada
(*speculative fan-out*), roteamento por confiança, nota composta (*composite scoring*) e
roteamento por intenção.

---

## 3. Como implementar

### 3.1 Conta e chave

1. Pedir acesso (early access) em <https://typesafe.ai> e criar a chave em
   <https://console.typesafe.ai/keys>.
2. A chave fica **só** na variável de ambiente `TYPESAFE_API_KEY`.
   ❌ Nunca no HTML, no JS do navegador, no repositório, no `materia.json` ou no chat
   (mesma regra da `service_role` no `CLAUDE.md` da raiz).

### 3.2 Python (SDK oficial)

```bash
pip install typesafe-sdk          # requer Python >= 3.10
```

```python
from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

client = TypeSafeClient()  # lê TYPESAFE_API_KEY do ambiente

ticket = "Hi, I've been trying to connect my Stripe account for 3 days and the integration keeps failing. I'm losing sales. Please help ASAP."

response = client.system_one(
    state=ticket,
    questions={
        "department": Choice(
            instructions="Which team should handle this",
            criteria={
                "billing": "Payment or subscription issues",
                "technical": "Bugs or integration problems",
                "sales": "Pricing or account questions",
            },
        ),
        "frustration": Score(
            instructions="How frustrated the customer appears",
            criteria=[
                "Calm, just stating facts",
                "Frustrated but civil",
                "Very angry, strong language",
            ],
        ),
        "is_urgent": Noul(
            instructions="The message conveys urgency or time-sensitivity",
        ),
    },
)

print(response.answers["department"].choice)  # "technical"
print(response.answers["frustration"].score)  # 1.0
print(response.answers["is_urgent"].noul)     # 1.0
```

Há também `AsyncTypeSafeClient` (assíncrono) e `RetryPolicy` (novas tentativas).

### 3.3 JavaScript (Node.js 20+)

```sh
npm install @typesafe-ai/sdk
```

```ts
import { TypeSafeClient, choice } from "@typesafe-ai/sdk";

const client = new TypeSafeClient(); // lê TYPESAFE_API_KEY do ambiente

const response = await client.systemOne({
  state: { document: "I was charged twice. Please fix this ASAP." },
  questions: {
    category: choice("What is this ticket about?", {
      billing: null,
      technical: null,
      other: null,
    }),
  },
});

console.log(response.answers.category.choice);
```

Funções auxiliares: `choice()`, `score()`, `noul()`. ⚠️ A documentação proíbe expor a chave no
navegador: o SDK roda **no servidor**.

### 3.4 HTTP direto

- `POST https://api.typesafe.ai/v1/systemone`
- Cabeçalhos: `Authorization: Bearer <TYPESAFE_API_KEY>` e `Content-Type: application/json`
- Corpo: `model` (`"jev-latest"`), `state` e `questions` (cada pergunta com `type`,
  `instructions` e `criteria`; conferir na referência `/api.md` os valores exatos de `type`).
- Resposta: `{ "model": "jev-1.13.0", "answers": { "<pergunta>": { "type": "...", ... } },
  "usage": { "input_tokens": N, "output_tokens": N } }`
- Erros: `401` chave inválida · `422` requisição mal formada · `429` limite de uso · `529`
  serviço sobrecarregado. Para `429`/`529`, repetir com espera crescente (*exponential backoff*).

### 3.5 Neste projeto (HTML + JS puro + Supabase)

As páginas rodam no navegador e **não podem** ter a chave. Caminho recomendado:

```
Página (assets/js/...)  ──JWT do usuário──▶  Supabase Edge Function  ──TYPESAFE_API_KEY──▶  Jev
        ◀────────── só o resultado tipado (choice/score/noul + confiança) ──────────
```

1. **Edge Function** (Deno) guarda `TYPESAFE_API_KEY` nos *secrets* do Supabase e chama o
   endpoint HTTP (seção 3.4) com `fetch`.
2. A página chama a função com o **JWT do usuário logado** (regra RLS + JWT do `CLAUDE.md` da
   raiz); a função confere o perfil (`app_metadata.perfil`) antes de chamar o Jev.
3. Código no padrão do projeto: CSS/JS reutilizáveis em `assets/`, sem `<script>` embutido,
   avisos com `popup.js`, nada de `localStorage` para dados de aluno, nomes em português.
4. Usar a **confiança** como regra de decisão: abaixo do limite, o resultado vai para revisão do
   professor (nunca vira nota automaticamente).
5. Para comparar com outro modelo antes de adotar, usar o `system-one-adapter` (mesma interface
   `system_one`, respondida por um LLM).

### 3.6 Cuidados obrigatórios

- 🔒 **LGPD / menores:** não enviar nome, e-mail, turma ou qualquer dado pessoal de aluno no
  `state`; enviar só o texto a avaliar. Uso com dados de alunos depende de autorização da escola.
- 🔑 **Gabarito:** padrões de resposta e gabaritos só saem do banco para a função do servidor,
  nunca para a página do aluno (regra do gabarito no `CLAUDE.md` da raiz).
- 🧪 **Sem testes automatizados** por padrão (regra global); validar por leitura, `node --check` e
  consultas.
- 💰 Preço e limites podem mudar: conferir no console antes de usar em turma inteira.

---

## 4. Ideias de uso nesta UC (Testes de Front-End)

Só ideias; nada foi implementado. Cada uma precisa de plano em `docs/` e aprovação.

| Ideia | Primitiva | Observação |
|---|---|---|
| Pré-correção de respostas discursivas (pendência "Correção com IA" das avaliações discursivas) | `Score` com a rubrica de 4 níveis da ementa + `confidence` | Professor revisa tudo com confiança baixa |
| Classificar um cenário como unitário, integração ou E2E (Aula 01) | `Choice` | Bom exemplo em sala de saída tipada × texto livre |
| Conferir se um caso de teste tem pré-condição, passos e resultado esperado (Aula 02) | vários `Noul` numa só chamada (*fan-out*) | Um `Noul` por requisito do caso de teste |
| Guardrail de mensagens num app de exemplo | `Noul` | Conecta com 4.2 Usabilidade e 4.3 Confiabilidade |
| Aula prática: testar com Vitest uma função que chama o Jev usando *mock* da API (Aula 05) | — | Mostra *mock* de API e erros `429`/`529` |

---

**Status:** 📘 Referência registrada (2026-10-03) · Implementação: ⬜ não iniciada
