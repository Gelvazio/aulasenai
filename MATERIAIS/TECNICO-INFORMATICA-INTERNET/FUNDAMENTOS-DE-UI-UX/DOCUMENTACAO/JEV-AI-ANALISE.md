# JEV-AI — Análise completa (#276.163)

**Data:** 2026-10-24 · **Matéria:** Fundamentos de UI/UX · **Tarefa:** #276

## 1. Como o JEV-AI compara a resposta do aluno com as respostas prováveis

O **Jev** (TypeSafe AI, modelo `jev-latest`, System One) avalia **perguntas tipadas** contra um **estado** — não gera texto livre. Referência: `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/JEV-AI/CLAUDE.md`.

**Fluxo de correção da discursiva (20 questões × 3 tópicos):**

1. **Estado (`state`):** a resposta do aluno a um tópico (só o texto — sem nome, sem dado pessoal; LGPD).
2. **Perguntas por tópico:**
   - **`Score`** na rubrica de 3 níveis (`0 = não atende / meia = atende parcial / 1 = atende`), com `instructions` = enunciado do tópico e `criteria` = o padrão de resposta do `-GABARITO.md` (nota cheia / metade / zero) + as respostas prováveis de `RESPOSTAS-PROVAVEIS-AULA-NN.md` como exemplos calibradores.
   - **`Noul`** complementar: "a resposta cobre o padrão esperado?" (probabilidade 0–1).
3. **`confidence` (0–1):** o quanto a distribuição está concentrada.
   - `≥ 0,8` → nota computada automaticamente.
   - `0,5–0,8` → nota provisória, marcada para **revisão do professor**.
   - `< 0,5` → sempre revisão humana.
4. **Nota da questão:** soma dos 3 tópicos (0,2 + 0,4 + 0,4 = 1 ponto), conforme D3 da etapa.
5. **LGPD/segurança:** só o texto da resposta vai para a API; a chave fica só no servidor/backend — nunca no site nem em páginas do aluno.

## 2. Revisão dos modelos sugeridos em cada subtarefa (#276.1–#276.165)

Distribuição real da etapa (166 subtarefas):

| Grupo | Qtde | Nível | Modelo sugerido | Avaliação |
|---|---|---|---|---|
| Conteúdo das 19 aulas | 19 | — (usuário) | só o usuário (D8: Markdown vem do Chalkie.AI) | ✅ correto — IA não gera conteúdo |
| Atividades fonte (objetiva, discursiva, gabarito, respostas prováveis) e conferências | 82 | LEVE | Haiku 5.5 ou DeepSeek V4.1 Flash | ✅ adequado; na execução real usou-se agentes Sonnet-equivalente sem perda — **dá para manter LEVE** |
| Geração de páginas, seeds, banco, avaliações, apostila, JEV-AI, fechamento | 65 | PESADO | Opus 5.5+/Fable, Sonnet ou DeepSeek | ⚠️ ver divergências abaixo |
| **Total** | **166** | — | — | — |

## 3. Divergências encontradas na execução real

1. **Seeds de banco (classe PESADO no quadro):** as 38 aplicações de seed (19 objetivas + 19 práticas) rodaram via RPC `exec_sql` com script — trabalho mecânico que **poderia ser LEVE** se o SQL já existe. PESADO só se o seed precisar ser escrito/depurado.
2. **Páginas HTML (PESADO):** os 9 agentes paralelos geraram as 38 páginas só rodando o gerador (`gerar_avaliacao_discursiva.py` / `gerar_atividades.py`) — **LEVE bastava** para a maioria; PESADO só fez falta quando houve bug do gerador (capacidades socioemocionais S1–S4, corrigido em `gerar_atividades.py` e `capacidades.py`).
3. **JEV-AI em tempo real divergiu do quadro:** nas classificações ao vivo apareceram sugestões LEVE com confiança 0,09 (sinal PESADO: massa/banco) — confiança baixa exigiu revisão humana, validando a regra de "revisão recomendada" para conf < 0,5.
4. **Sem MEDIO:** a rodada inicial `--gravar --reclassificar` não produziu nenhuma subtarefa MEDIO — a matriz ficou binária (82 LEVE + 65 PESADO); na prática, trabalhos como "gerar página + seed de 1 aula" ficaram no limiar entre os dois níveis.

**Recomendação de custo (sem mudar o quadro):** subtarefas de "executar gerador/script já pronto" (#276.*-6 páginas e seeds, #276.*-7 seeds no banco) podem descer para **LEVE**; manter PESADO apenas onde há escrita de SQL/gerador, depuração ou decisão de estrutura (#276.160–#276.165).

## 4. Plano B (sem chave/limite do Jev)

Se a API do Jev estiver indisponível:
1. Correção manual com `RESPOSTAS-PROVAVEIS-AULA-NN.md`: o professor compara a resposta do aluno com as 3–5 variantes (certa / meia certa / errada) e atribui o mesmo `Score` por tópico.
2. Fallback com LLM barata (DeepSeek/Haiku) aplicando a mesma rubrica de 3 níveis do gabarito — saída não calibrada, então **toda nota fica "revisão do professor"** (equivale a confidence < 0,5).
3. O formato dos arquivos (`-GABARITO.md` + `RESPOSTAS-PROVAVEIS-*.md`) já é o insumo dos dois caminhos — nenhum retrabalho.

## Persistência

As 166 classificações foram gravadas na tabela **`public.jev_ai_analise`** (Supabase) para alimentar decisões futuras de modelo — colunas: `tarefa_id`, `nivel_sugerido`, `confianca`, `modelo_sugerido`, `modelo_usado`, `sinal`, `resultado`, `revisao_humana`.
