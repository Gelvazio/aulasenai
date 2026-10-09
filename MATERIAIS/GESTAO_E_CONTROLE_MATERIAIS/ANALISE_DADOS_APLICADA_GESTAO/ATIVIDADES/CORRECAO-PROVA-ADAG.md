# Correção da Prova Prática ADAG (Salete) — orientação para a IA

> **Para a IA:** este arquivo é a sua instrução. Execute-o **de tempos em tempos**. A correção é
> **parcial**: corrige as alternativas que os alunos já responderam, **mesmo antes da entrega** (cada
> alternativa só **uma vez** enquanto a prova não foi entregue). **Recorrigir só depois da entrega
> final:** o que o aluno mudou depois da nota parcial é corrigido de novo apenas quando ele entrega.
> Assim a **nota parcial** vai subindo durante a prova (coluna "Nota parcial IA" do Progresso da turma). Você **sugere** a nota e o comentário de cada
> alternativa; a nota que vale é a que o **professor** confirma na tela **CORREÇÃO**
> (`correcao-discursiva.html`).

| Dado | Valor |
|---|---|
| Atividade | **id 82 · Prova Prática** (página `PROVA-PRATICA-01.html`) |
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
| `correcao_discursiva` | **`nota_ia`** (nota sugerida pela IA), **`comentario`** (porquê da nota) e **`nota_ia_em`** (quando a IA deu a nota) por alternativa; `nota_professor` é a do professor | **grava** só `nota_ia`, `comentario` e `nota_ia_em` |

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

### 2.1 Mínimo de questões e nota final (desde 2026-10-08)

- Cada aluno tem um **mínimo de questões completas** para entregar (padrão = todas as 20; o
  professor pode mudar por aluno). Consultar com
  `select public.minimo_questoes_para_entregar(82, '<ALUNO_ID>');`
- A IA corrige **só as alternativas respondidas**; questão em branco **não recebe linha** (não
  gravar zero nela).
- A **nota vale sobre o mínimo**: cada questão vale **10 ÷ mínimo**, ou seja,
  `nota = soma das notas × (20 ÷ mínimo)`, com **máximo 10**. Ex.: mínimo 10, fez as 10 e acertou
  tudo → nota 10. O banco e o Progresso da turma já fazem essa conta; a IA continua gravando a
  nota de cada alternativa na escala normal (0,1 / 0,2).

## 3. Como escrever o comentário

- Começar com **`[IA]`** e o resultado: `[IA] Certa:`, `[IA] Meia certa:` ou `[IA] Errada:`.
- Dizer **o porquê da nota** em até **2 frases** (no máximo 300 caracteres): o que acertou e o que
  faltou ou errou. Ex.: `[IA] Meia certa: a fórmula =SOMASE está certa, mas o resultado ficou sem a
  unidade (R$) pedida no enunciado.`
- Linguagem simples e respeitosa: **o aluno pode ler o comentário** depois que o professor
  confirma a nota.
- ⛔ Não escrever a resposta certa completa no comentário nem o nome do aluno.

## 4. Passo a passo de cada rodada (SQL pelo conector do Supabase)

### 4.1 Quem falta corrigir (correção parcial)

Entram **todos os alunos com resposta**, entregues ou não. Uma alternativa está pendente quando:

- **ainda não tem nota da IA** (`nota_ia_em` vazio) — correção parcial, antes ou depois da entrega;
- **o aluno já entregou** e a resposta mudou **depois** da nota parcial (`atualizado_em > nota_ia_em`)
  — **recorreção só após a entrega final**; antes da entrega, mudanças não são recorrigidas;
- **o aluno já entregou** e apagou uma resposta que tinha nota da IA.

Alternativas com `nota_professor` nunca entram.

```sql
with pendentes as (
  select r.aluno_id, r.tentativa, r.item, r.topico
  from resposta_discursiva r
  left join correcao_discursiva c
    on c.aluno_id = r.aluno_id and c.atividade_id = r.atividade_id
   and c.tentativa = r.tentativa and c.item = r.item and c.topico = r.topico
  where r.atividade_id = 82
    and c.nota_professor is null
    and trim(r.texto) <> ''
    and (c.nota_ia_em is null
      or (r.atualizado_em > c.nota_ia_em and exists (
        select 1 from entrega_atividade e
        where e.aluno_id = r.aluno_id and e.atividade_id = 82 and e.tentativa = r.tentativa)))
  union
  select c.aluno_id, c.tentativa, c.item, c.topico
  from correcao_discursiva c
  where c.atividade_id = 82 and c.nota_professor is null and c.nota_ia > 0
    and exists (select 1 from entrega_atividade e
      where e.aluno_id = c.aluno_id and e.atividade_id = 82 and e.tentativa = c.tentativa)
    and not exists (select 1 from resposta_discursiva r
      where r.aluno_id = c.aluno_id and r.atividade_id = 82 and r.tentativa = c.tentativa
        and r.item = c.item and r.topico = c.topico)
)
select aluno_id, tentativa, count(*) as alternativas_pendentes
from pendentes group by aluno_id, tentativa order by alternativas_pendentes desc;
```

Nenhuma linha → nada a corrigir nesta rodada: registrar no fim deste arquivo e parar.
Alternativa **sem resposta** (o aluno ainda não escreveu) não recebe nota parcial — fica sem linha.
Alternativa que **foi apagada** pelo aluno (visto só após a entrega) volta para `0` com o comentário
`[IA] Errada: em branco.`

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

Corrigir só as alternativas que a consulta 4.1 apontou para este aluno (`nota_professor` vazia e
resposta ainda sem nota da IA ou, após a entrega final, mudada depois da nota parcial).

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
  (aluno_id, atividade_id, tentativa, item, topico, nota_ia, comentario, nota_ia_em)
values
  ('<ALUNO_ID>', 82, <TENTATIVA>, 1, 1, 0.10, '[IA] Certa: ...', now()),
  ('<ALUNO_ID>', 82, <TENTATIVA>, 1, 2, 0.10, '[IA] Meia certa: ...', now())
on conflict (aluno_id, atividade_id, tentativa, item, topico) do update
  set nota_ia = excluded.nota_ia,
      comentario = excluded.comentario,
      nota_ia_em = excluded.nota_ia_em
  where correcao_discursiva.nota_professor is null;
```

- A nota é sempre `pontos`, `pontos / 2` ou `0` (ponto como separador decimal no SQL).
- `nota_ia_em = now()` é obrigatório: é por ele que a próxima rodada sabe o que o aluno mudou.
- O banco recusa nota maior que os pontos da alternativa (trigger `correcao_discursiva_validar`).
- Apóstrofo dentro do comentário é escrito em dobro (`''`).

### 4.5 Conferir depois de gravar

```sql
select count(*) filter (where nota_ia is not null) as com_nota_ia,
       sum(nota_ia) as nota_parcial
from correcao_discursiva
where atividade_id = 82 and aluno_id = '<ALUNO_ID>' and tentativa = <TENTATIVA>;
```

Esperado: `com_nota_ia` = alternativas respondidas pelo aluno (60 depois da entrega) e
`nota_parcial` entre 0 e 10. Repetir 4.2 a 4.5 para cada aluno pendente da 4.1.

## 5. Ao terminar a rodada

1. Acrescentar uma linha na tabela abaixo (data e hora de Brasília, quantos alunos e
   alternativas foram corrigidos). **Sem nomes nem notas de alunos.**
2. Fazer o commit deste arquivo (regra "COMMIT POR TAREFA" do `CLAUDE.md`).
3. Durante a prova, o professor acompanha a **nota parcial** no Progresso da turma (topo da página
   da prova, coluna "Nota parcial IA"); ela só vale como prévia.
4. Depois da entrega, o professor abre **CORREÇÃO** → avaliação "Prova Prática" (id 82) → turma → entrega, confere a
   **Nota da IA** e o **Comentário** e grava a **nota do professor**, que é a que conta na média.

## Registro das rodadas

| Data e hora | Alunos corrigidos | Alternativas gravadas | Observação |
|---|---|---|---|
| 2026-10-08 15:14 | 15 | 129 | Correção parcial (itens 1 a 7); sem alerta de texto repetido além das duplas |
| 2026-10-08 15:40:36 | 14 | 132 | Rodada parcial (correção antes/depois da entrega); respostas incompletas ficaram com nota 0 e serão corrigidas na entrega final. |
| 2026-10-08 15:55 | 14 | 47 | Correção parcial (nota parcial IA); nenhum texto repetido além das duplas |
| 2026-10-08 15:57:12 | 14 | 52 | Correção parcial (antes da entrega); alternativas ainda sem nota da IA |
| 2026-10-08 16:06:28 | 13 | 29 | Correção parcial (provas ainda em andamento); nenhum texto repetido entre duplas |
| 2026-10-08 16:14 | 13 | 30 | Correção parcial (maioria ainda sem entrega); 0 avisos de texto igual |
| 2026-10-08 16:23:54 | 12 | 22 | Correção parcial (antes da entrega final); 1 aluno com texto sem sentido corrigido como errada |
| 2026-10-08 16:42:53 | 12 | 70 | Correção parcial (nota_ia); nenhum texto igual em mais de uma dupla; 1 comentário com aviso de texto desorganizado |
| 2026-10-08 16:47:37 | 12 | 25 | Correção parcial (alternativas ainda sem nota da IA); 4 recebidas em branco/incompletas ficaram com 0 |
| 2026-10-08 16:54 | 12 | 31 | Correção parcial (nota da IA); 1 aviso de texto possivelmente copiado |
| 2026-10-08 16:54 | 12 | 32 | Correção parcial antes da entrega; sem textos iguais conferidos nesta rodada |
| 2026-10-08 18:55 | 11 | 72 | Correção parcial; sem textos iguais entre mais de 2 alunos. |
| 2026-10-08 20:14 | 0 | 0 | Nenhuma alternativa pendente nesta rodada. |
| 2026-10-09 02:55:18 | 0 | 0 | Nenhuma alternativa pendente nesta rodada. |
| 2026-10-09 15:54:03 | 0 | 0 | Nenhuma alternativa pendente (consulta 4.1 vazia) |
