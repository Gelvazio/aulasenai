# Correção da Prova Prática ADAG (Salete) — orientação para a IA

> **Para a IA:** este arquivo é a sua instrução. Execute-o **de tempos em tempos** (a cada rodada,
> corrija só o que ainda não tem nota da IA). Você **sugere** a nota e o comentário de cada
> alternativa; a nota que vale é a que o **professor** confirma na tela **CORREÇÃO**
> (`correcao-discursiva.html`).

| Dado | Valor |
|---|---|
| Atividade | **id 82 · Prova Prática** (página `PROVA-PRATICA-06-10-2026.html`) |
| Matéria | Análise de Dados Aplicada à Gestão (ADAG) |
| Turma | AI AIAC 2026/2 V1 (133933) — prova feita **em dupla e com pesquisa** |
| Questões | 20, cada uma vale **0,5 ponto** = **10 pontos** no total |
| Alternativas por questão | 3 tópicos (a, b, c) = **0,1 + 0,2 + 0,2** |
| Banco | Supabase, projeto `AULAS SENAI` (ref `hxlvonriearllcmfqeri`) |

## 1. Onde ficam os dados

| Tabela | O que tem | A IA faz |
|---|---|---|
| `topico_discursivo` | enunciado, `pontos`, `resposta_esperada` e `criterios` de cada alternativa (`item`, `topico`) | só **lê** |
| `resposta_discursiva` | `texto` digitado pelo aluno, por `aluno_id`, `tentativa`, `item`, `topico` | só **lê** |
| `entrega_atividade` | quem entregou (`aluno_id`, `tentativa`, `entregue_em`) | só **lê** |
| `correcao_discursiva` | **`nota_ia`** (nota sugerida pela IA) e **`comentario`** (porquê da nota) por alternativa; `nota_professor` é a do professor | **grava** só `nota_ia` e `comentario` |

- ⛔ **Nunca** gravar ou alterar `nota_professor`, `corrigido_por` ou `corrigido_em`.
- ⛔ **Nunca** mexer em linha que já tem `nota_professor` (o professor já decidiu).
- ⛔ Não alterar respostas, entregas, tópicos nem outras tabelas.
- ⛔ Não copiar respostas esperadas, nomes ou dados de alunos para este arquivo, para o chat ou
  para o Git (este arquivo é versionado e publicado). Trabalhar só com o `aluno_id`.

## 2. Como dar a nota de cada alternativa

Cada questão vale **0,5 ponto**, dividido entre as alternativas: **a) 0,1 · b) 0,2 · c) 0,2**
(confirmar sempre pela coluna `pontos`). Cada alternativa recebe **uma** destas três notas:

| Resultado | Nota da alternativa | a) vale 0,1 | b) ou c) valem 0,2 |
|---|---|---|---|
| ✅ **Certa** | pontos inteiros | 0,10 | 0,20 |
| 🟡 **Meia certa** | metade dos pontos | 0,05 | 0,10 |
| ❌ **Errada** (ou em branco) | zero | 0,00 | 0,00 |

Regras para decidir (as mesmas do padrão de resposta da prova):

1. Corrigir **cada alternativa sozinha**, comparando o `texto` do aluno com a `resposta_esperada`
   e os `criterios` daquela alternativa. Não usar o que ele escreveu em outra alternativa.
2. **Certa:** traz a conta ou a fórmula **e** o resultado certo (com a unidade) **e** a
   justificativa, quando o enunciado pede "explique" ou "justifique".
3. **Meia certa:** o caso de "metade" descrito nos `criterios`; na falta dele, acertou parte do
   que foi pedido (ex.: fórmula certa e resultado errado, ou resultado certo sem a justificativa
   pedida).
4. **Errada:** em branco, fora do tema, ou resultado errado sem raciocínio coerente.
5. **Sempre aceitar:** `;` ou `,` como separador; função com ou sem acento (MÉDIA/MEDIA,
   ÍNDICE/INDICE, MÁXIMO/MAXIMO, MÍNIMO/MINIMO); maiúsculas ou minúsculas; ponto ou vírgula
   decimal; arredondamento de até ± 0,01 (ou ± 0,1 ponto percentual); fórmula equivalente do
   LibreOffice Calc; outro caminho certo que chegue ao mesmo resultado.
6. **Erros de português não descontam** quando a ideia está clara.
7. **Prova em dupla:** respostas iguais entre os dois alunos da dupla são **esperadas** — não
   descontar por isso. Se o texto for igual ao de alunos de **outras** duplas ou parecer copiado
   da internet, **não zerar**: corrigir normalmente e escrever no comentário
   `⚠️ Texto igual ao de outro(s) aluno(s) — conferir.` O professor decide.

## 3. Como escrever o comentário

- Começar com **`[IA]`** e o resultado: `[IA] Certa:`, `[IA] Meia certa:` ou `[IA] Errada:`.
- Dizer **o porquê da nota** em até **2 frases** (no máximo 300 caracteres): o que acertou e o que
  faltou ou errou. Ex.: `[IA] Meia certa: a fórmula =SOMASE está certa, mas o resultado ficou sem a
  unidade (R$) pedida no enunciado.`
- Linguagem simples e respeitosa: **o aluno pode ler o comentário** depois que o professor
  confirma a nota.
- ⛔ Não escrever a resposta certa completa no comentário nem o nome do aluno.

## 4. Passo a passo de cada rodada (SQL pelo conector do Supabase)

### 4.1 Quem falta corrigir

Só entra quem **já entregou** (as respostas não mudam mais depois da entrega).

```sql
select e.aluno_id, e.tentativa, e.entregue_em
from entrega_atividade e
where e.atividade_id = 82
  and exists (
    select 1 from topico_discursivo t
    where t.atividade_id = 82
      and not exists (
        select 1 from correcao_discursiva c
        where c.aluno_id = e.aluno_id and c.atividade_id = 82 and c.tentativa = e.tentativa
          and c.item = t.item and c.topico = t.topico
          and (c.nota_ia is not null or c.nota_professor is not null)))
order by e.entregue_em;
```

Nenhuma linha → nada a corrigir nesta rodada: registrar no fim deste arquivo e parar.

### 4.2 Ler as 60 alternativas de um aluno (uma entrega por vez)

```sql
select t.item, t.topico, t.pontos, t.enunciado, t.resposta_esperada, t.criterios,
       coalesce(r.texto, '') as resposta_aluno,
       c.nota_ia, c.nota_professor
from topico_discursivo t
left join resposta_discursiva r
  on r.atividade_id = t.atividade_id and r.item = t.item and r.topico = t.topico
 and r.aluno_id = '<ALUNO_ID>' and r.tentativa = <TENTATIVA>
left join correcao_discursiva c
  on c.atividade_id = t.atividade_id and c.item = t.item and c.topico = t.topico
 and c.aluno_id = '<ALUNO_ID>' and c.tentativa = <TENTATIVA>
where t.atividade_id = 82
order by t.item, t.topico;
```

Corrigir só as linhas em que `nota_ia` e `nota_professor` estão vazias.

### 4.3 (Prova em dupla) Ver textos iguais entre alunos

```sql
select item, topico, md5(lower(trim(texto))) as assinatura, count(distinct aluno_id) as alunos
from resposta_discursiva
where atividade_id = 82 and trim(texto) <> ''
group by item, topico, md5(lower(trim(texto)))
having count(distinct aluno_id) > 2
order by item, topico;
```

Mais de 2 alunos com o mesmo texto (mais que uma dupla) → aviso do item 7 da seção 2.

### 4.4 Gravar a nota sugerida e o comentário

Gravar as alternativas do aluno num único comando (uma linha de `values` por alternativa):

```sql
insert into correcao_discursiva
  (aluno_id, atividade_id, tentativa, item, topico, nota_ia, comentario)
values
  ('<ALUNO_ID>', 82, <TENTATIVA>, 1, 1, 0.10, '[IA] Certa: ...'),
  ('<ALUNO_ID>', 82, <TENTATIVA>, 1, 2, 0.10, '[IA] Meia certa: ...')
on conflict (aluno_id, atividade_id, tentativa, item, topico) do update
  set nota_ia = excluded.nota_ia,
      comentario = excluded.comentario
  where correcao_discursiva.nota_professor is null;
```

- A nota é sempre `pontos`, `pontos / 2` ou `0` (ponto como separador decimal no SQL).
- O banco recusa nota maior que os pontos da alternativa (trigger `correcao_discursiva_validar`).
- Apóstrofo dentro do comentário é escrito em dobro (`''`).

### 4.5 Conferir depois de gravar

```sql
select count(*) filter (where nota_ia is not null) as com_nota_ia,
       sum(nota_ia) as total_sugerido
from correcao_discursiva
where atividade_id = 82 and aluno_id = '<ALUNO_ID>' and tentativa = <TENTATIVA>;
```

Esperado: `com_nota_ia` = 60 e `total_sugerido` entre 0 e 10. Repetir 4.2 a 4.5 para cada entrega
pendente.

## 5. Ao terminar a rodada

1. Acrescentar uma linha na tabela abaixo (data e hora de Brasília, quantas entregas e
   alternativas foram corrigidas). **Sem nomes nem notas de alunos.**
2. Fazer o commit deste arquivo (regra "COMMIT POR TAREFA" do `CLAUDE.md`).
3. O professor abre **CORREÇÃO** → avaliação "Prova Prática" (id 82) → turma → entrega, confere a
   **Nota da IA** e o **Comentário** e grava a **nota do professor**, que é a que conta na média.

## Registro das rodadas

| Data e hora | Entregas corrigidas | Alternativas gravadas | Observação |
|---|---|---|---|
