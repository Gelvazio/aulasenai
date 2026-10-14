# 🕵️ Suspeita de Cópia nas discursivas — procedimento da IA

Tarefa #129 (Etapa 256, 2026-10-14). Vale **só para as avaliações discursivas** (tabelas
`resposta_discursiva` e `correcao_discursiva`).
Banco: `database/2026-10-14-suspeita-copia-discursiva.sql`.

## O que é

- A IA compara cada resposta com as dos **outros alunos da mesma turma**, no mesmo item e tópico.
- Quando a resposta parece copiada, grava uma linha **`pendente`** em `suspeita_copia_discursiva`
  (aluno, questão, aluno com a resposta mais parecida, semelhança e motivo).
- **Só o professor vê** (RLS): coluna **Suspeita de Cópia** no Progresso da Turma e alerta vermelho
  piscando na questão (**SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!**), com os botões
  **✅ Não é cópia** e **❌ É cópia** (função `validar_suspeita_copia`).
- **É cópia** grava `nota_professor = 0` naquele tópico (nota travada). Se a nota do professor já
  estava confirmada com outro valor, a função recusa e avisa. A IA **nunca zera** nada.

## Passo a passo (SQL pelo conector do Supabase, `<ID>` = id da atividade)

### 1. Candidatos (pares parecidos da mesma turma)

```sql
with r as (
  select r.aluno_id, r.tentativa, r.item, r.topico, al.turma_codigo,
         lower(regexp_replace(trim(r.texto), '\s+', ' ', 'g')) as texto
  from resposta_discursiva r join aluno al on al.id = r.aluno_id
  where r.atividade_id = <ID> and length(trim(r.texto)) >= 40),
pares as (
  select a.aluno_id, a.tentativa, a.item, a.topico, b.aluno_id as aluno_parecido_id,
         round(extensions.similarity(a.texto, b.texto)::numeric, 3) as semelhanca,
         row_number() over (partition by a.aluno_id, a.tentativa, a.item, a.topico
                            order by extensions.similarity(a.texto, b.texto) desc) as ordem
  from r a join r b
    on a.item = b.item and a.topico = b.topico and a.turma_codigo = b.turma_codigo
   and a.aluno_id <> b.aluno_id
  where extensions.similarity(a.texto, b.texto) >= 0.6)
select p.* from pares p
where p.ordem = 1
  and not exists (select 1 from suspeita_copia_discursiva s
    where s.atividade_id = <ID> and s.aluno_id = p.aluno_id and s.tentativa = p.tentativa
      and s.item = p.item and s.topico = p.topico)
order by p.item, p.topico, p.semelhanca desc;
```

- Texto com menos de **40 caracteres** não entra (resposta curta igual é normal).
- Linha que já existe (inclusive validada pelo professor) **não é refeita**.

### 2. Decidir (a IA lê os dois textos)

- **Suspeita** quando os textos têm as **mesmas frases na mesma ordem**, os mesmos erros de
  digitação ou de português, ou a mesma frase incomum. Semelhança ≥ 0,9 com texto de 40+
  caracteres é suspeita quase sempre.
- **Não é suspeita** quando a parte igual é só a definição da apostila ou do enunciado (termos
  técnicos que todos usam) e o resto é diferente.
- Na dúvida, grave a suspeita: quem decide é o professor.

### 3. Gravar as suspeitas

```sql
insert into suspeita_copia_discursiva
  (atividade_id, aluno_id, tentativa, item, topico, aluno_parecido_id, semelhanca, motivo)
values
  (<ID>, '<ALUNO>', 1, 3, 1, '<OUTRO_ALUNO>', 0.982,
   'Mesmas frases na mesma ordem, inclusive o mesmo erro de digitação.')
on conflict (atividade_id, aluno_id, tentativa, item, topico) do nothing;
```

- Os **dois** alunos do par recebem a linha (cada um aponta para o outro).
- `motivo` em até 200 caracteres, **sem nomes** de alunos (só `aluno_id` no SQL).

## Proibido

- ⛔ Gravar `situacao`, `validado_por` ou `validado_em` (é do professor) ou mudar linha já validada.
- ⛔ Mexer em `nota_professor` ou em qualquer nota por causa da suspeita.
- ⛔ Levar nomes ou respostas de alunos para fora do banco (chat, Git, arquivos).
