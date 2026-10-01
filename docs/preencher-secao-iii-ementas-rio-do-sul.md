# Preencher a seção III (Conteúdos Programáticos) de 2 ementas do Rio do Sul Mais Tech

- **Criada em:** 2026-10-01 15:20
- **Concluída em:** 2026-10-01 15:35
- **Tempo decorrido:** ~15 min
- **Status geral:** ✅ Concluído (pedido do usuário: "prepare o plano e preencha as seções III")

## Objetivo

Preencher a seção `## 📖 III. CONTEÚDOS PROGRAMÁTICOS`, hoje só com o título, em:

- `MATERIAIS/RIO_DO_SUL_MAIS_TECH/COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/EMENTA-CHALKIE-AI.md`
- `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/EMENTA-CHALKIE-AI.md`

Fonte da verdade: conhecimentos e capacidades da UC 1 e da UC 4 em
`EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md`, organizados em 5 módulos que seguem as 9 aulas da
seção VI (cada módulo indica as aulas em que é trabalhado).

## Abrir espaço (regra 14.800–14.950 caracteres)

A seção III nova tem ~1.400 caracteres. Para caber, nas mesmas 2 ementas:

1. **Seção VII** (Estratégias avançadas para IA, texto genérico de ~1.785 caracteres): resumir em
   5 itens curtos, mantendo diagnóstico, personalização, engajamento, suporte e painel do professor.
2. **Seção XIII** (FAQ, ~1.840–2.040 caracteres): reescrever mais curta e **corrigir o que
   contradiz a ementa do curso**: "modelo híbrido 50% online" → presencial; "nota ≥ 6,0" → nota
   mínima 7,0 e 75% de frequência; remover "formato totalmente online" e "certificado automático
   do Chalkie" (não previstos na ementa do curso).
3. **Seção X** (métricas): "80% dos alunos com nota ≥ 6,0" → "≥ 7,0".

## Fora do escopo (só registrado)

- Seção III das demais ementas: preenchida, mas com divergências da ementa do curso
  (Eletricidade cita Lei de Coulomb, capacitores, diodos e transistores e não cita instalações
  prediais nem diagnóstico; Linguagens e Carreiras trazem módulos além dos conhecimentos da UC).
- "Nota ≥ 6,0" também aparece em Carreiras, Eletricidade, Linguagens e Fundamentos; Matemática
  diz "Híbrido". Corrigir em tarefa separada, se pedido.

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Seção III + VII + X + XIII de Competências | `.../COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/EMENTA-CHALKIE-AI.md` | 5 módulos; sem "6,0"/"híbrido"; tamanho no intervalo | ✅ Concluído |
| 2 | Seção III + VII + X + XIII de Impressão 3D e Robótica | `.../OFICINAS_IMPRESSAO_3D_ROBOTICA/EMENTA-CHALKIE-AI.md` | idem | ✅ Concluído |
| 3 | Regenerar status | `scripts/criar-status-ementas.py`, `criar-status-cursos.py` | "CONFORME" | ✅ Concluído |
| 4 | Commit local + grafo | arquivos acima + este plano | `git diff --cached --name-only` | ✅ Concluído |

## Resultado

| Matéria | Seção III | Tamanho antes → depois |
|---|---|---|
| Competências Socioemocionais e Empreendedorismo | 5 módulos, 1 atividade por módulo | 14.888 → 14.886 ✅ |
| Oficinas de Impressão 3D e Robótica | 5 módulos, 1 atividade por módulo | 14.903 → 14.885 ✅ |

- Seção VII resumida em 5 itens; FAQ (XIII) reescrito com a regra do curso (presencial, nota 7,0 e
  75% de frequência) e perguntas próprias de cada matéria; métrica da seção X corrigida para 7,0.
- Nenhum "6,0", "híbrido" ou "50%" ficou nas duas ementas; CRLF preservado.
- `STATUS-EMENTAS.md` e `STATUS-EMENTAS-CURSOS.md` regenerados.
