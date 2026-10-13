# 🌱 Seeds — Banco de dados

**Registro único:** `database/SEEDS-APLICADOS.md`. Passo a passo completo: `scripts/seeds/README.md`.
Tarefa de banco = só o **Claude Code local** (`multiplas-ias.md`).

## Ciclo

| Status | Significado | Próxima ação |
|--------|-------------|--------------|
| **PENDENTE** | `.sql` gerado, nunca rodado | Aplicar no Supabase |
| **APLICADO** | Rodado, ainda não conferido (ou md5 não bateu) | Conferir md5 |
| **CONCLUÍDO** | Rodado e conferido ✅ | — |
| **SUBSTITUÍDO** | Não será usado (outro seed já CONCLUÍDO) ✅ | — |

## Antes de QUALQUER tarefa nova

Todo seed precisa estar **CONCLUÍDO** ou **SUBSTITUÍDO**. Se houver PENDENTE ou APLICADO:
aplicar → conferir md5 → registrar CONCLUÍDO → só então a tarefa nova. Exceções (decididas em
2026-10-13), em que se segue sem travar:

| Situação | O que fazer |
|----------|-------------|
| Frente **sem banco** (nuvem, outras IAs — `multiplas-ias.md`) | Não aplica; deixa recado em `tasks/RECADOS.md` para a frente local e segue com tarefa sem banco |
| Seed de tarefa **reservada por outra frente** | Fica com a frente dona (item da etapa dela) |
| Seed que depende de **ação ou decisão do usuário** | Item 👀 na etapa da tarefa dona |

O ciclo de seeds **não é tarefa grande**: não precisa de plano nem de aprovação (autorização
permanente abaixo).

## Scripts (nunca montar à mão)

Rodar na raiz do repositório. Python no Windows: `C:\Python314\python.exe`; na nuvem: `python3`.
Rascunhos (lotes, JSON) ficam na pasta temporária da sessão, nunca no repositório.

```bash
python scripts/seeds/dividir_seed.py database/<seed>.sql <pasta-lotes>
python scripts/seeds/comparar_md5.py <pasta-lotes>/esperado.json <pasta-lotes>/resultado.json
python scripts/seeds/registrar_seed.py <seed>.sql CONCLUÍDO "<observação com ids>"
```

- O lote só **acrescenta** itens. Se a atividade já tiver itens diferentes no banco, avisar o
  usuário (apagar exige pedido e backup).

## Autorização permanente (desde 2026-10-09)

Sem perguntar de novo: aplicar PENDENTE, conferir APLICADO, marcar CONCLUÍDO, registrar e fazer
commit + push. Qualquer outra mudança no banco de produção continua exigindo autorização.
