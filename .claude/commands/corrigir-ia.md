---
description: Corrige por IA as discursivas entregues pedidas no painel (pedido_correcao_ia PENDENTE)
argument-hint: "[atividade_id, opcional]"
---

Corrija por IA as respostas discursivas **entregues** e ainda **não corrigidas**, pedidas pelo
professor no painel do quadro de progresso. Só o **Claude Code local**, com o conector do Supabase
(`multiplas-ias.md`). Regras de segurança: `.claude/rules/security-banco.md`. Formato da correção
(nota cheia, metade ou zero; arredondamento de ± 0,01; erro de português não desconta):
`REGRAS_PROMPT_IA` em `assets/js/correcao-discursiva-ia.js`.

**$ARGUMENTS** vazio = todos os pedidos PENDENTE; com `atividade_id` = só os pedidos dessa atividade.

## Passos

1. **Ler os pedidos:** `pedido_correcao_ia` com `estado = 'PENDENTE'`. Nenhum → informar e parar.
2. **Para cada atividade do pedido**, ler:
   - os tópicos em `topico_discursivo` (`item`, `topico`, enunciado, `pontos`, `resposta_esperada`,
     `criterios`);
   - as respostas em `resposta_discursiva`, **somente** de quem tem linha em `entrega_atividade`
     para (aluno, atividade) e a **tentativa vigente** (a mais recente entregue, mesma regra de
     `atividade_entregue`). Quem não entregou é ignorado.
3. **Excluir o que já foi corrigido:** todo (aluno, tentativa, item, tópico) que já tem
   `correcao_discursiva.nota_ia IS NOT NULL` é pulado. A execução corrige só o que falta; rodar
   de novo não corrige nada novo. Resposta em branco = nota 0 (também grava).
4. **Corrigir cada tópico:** nota entre 0 e `pontos` (nota cheia, metade ou zero) e um comentário
   curto **só no seu raciocínio/relatório** (o nome do aluno não entra no raciocínio; use apenas o
   id). Compare com `resposta_esperada` e `criterios`. Linha de saída de referência:
   `ITEM 01-a: 0,3 | comentário`.
5. **Gravar por upsert** em `correcao_discursiva` **somente** estas colunas:
   `aluno_id`, `atividade_id`, `tentativa`, `item`, `topico`, `nota_ia`, `nota_ia_em = now()`.
   - ⛔ **Nunca** enviar `nota_professor` nem `comentario`; nunca sobrescrever `nota_professor`.
   - Gravar em lotes pequenos e só os tópicos do passo 3.
6. **Fechar o pedido:** `estado = 'CONCLUIDO'`, `concluido_em = now()`,
   `total_corrigidas = N` (tópicos gravados nessa execução).
7. **Relatar** em tabela `Atividade | Pedido | Corrigidos | Pulados (já com nota_ia) | Sem entrega`.

## Proibido

- ⛔ Apagar dados (`DELETE`, `DROP`, `TRUNCATE`) em qualquer tabela.
- ⛔ Usar ou gravar a chave `service_role` em arquivo; a leitura/escrita é pelo conector do
  Claude Code local.
- ⛔ Gabarito (`resposta_esperada`, critérios) em página, PDF, `localStorage` ou arquivo do site.
- ⛔ Corrigir atividade não entregue ou tentativa antiga; recorrigir tópico com `nota_ia`.
- ⛔ Abrir navegador, escrever testes ou fazer commit por este comando; o nome do aluno não vai
  para o raciocínio da correção.
- Falha no meio: o pedido continua `PENDENTE` (o que já foi gravado fica; a próxima execução
  só corrige o resto).
