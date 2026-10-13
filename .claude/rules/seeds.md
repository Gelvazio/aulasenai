# 🌱 Seeds — Banco de Dados

**Rastreamento:** `database/SEEDS-APLICADOS.md` (fonte única)

## Ciclo

| Passo | Status | Ação |
|------|--------|------|
| 1. Gerado | PENDENTE | Gerar `.sql` |
| 2. Aplicado | APLICADO | Rodar no Supabase |
| 3. Conferido | CONCLUÍDO | Verificar md5 |
| — | SUBSTITUÍDO | Não usa (outro seed já CONCLUÍDO) |

---

## Antes de QUALQUER Tarefa

⚠️ **Todos CONCLUÍDO:**

```bash
# Ler o registro
cat database/SEEDS-APLICADOS.md

# Se houver PENDENTE ou APLICADO:
# 1. Aplicar (PENDENTE)
# 2. Conferir md5 (APLICADO)
# 3. Gravar CONCLUÍDO

# Só então tarefa nova
```

---

## Registro — Colunas

| Arquivo | Data Aplicado | Data Conferido | Status | Observação |
|---------|---------------|---|--------|---|
| 2026-10-01-seed-itic.sql | 2026-10-01 | 2026-10-02 | CONCLUÍDO | — |
| 2026-10-13-seed-adag.sql | — | — | PENDENTE | Gerado |
| 2026-10-10-seed-banco.sql | 2026-10-10 | — | APLICADO | Sem conector |

---

## Status

- **PENDENTE** = Gerado, nunca rodado
- **APLICADO** = Rodado, não conferido (ou não bateu md5)
- **CONCLUÍDO** = Rodado e conferido ✅
- **SUBSTITUÍDO** = Não usa (outro já OK) ✅

---

## Scripts do Repositório

**Nunca montar à mão!**

```bash
python3 scripts/seeds/dividir_seed.py database/meu-seed.sql
python3 scripts/seeds/comparar_md5.py database/esperado.json
python3 scripts/seeds/registrar_seed.py --status CONCLUÍDO --arquivo 2026-10-13.sql
```

---

## Autorização Permanente

Desde 2026-10-09, você está autorizado a:
- ✅ Aplicar PENDENTE
- ✅ Conferir APLICADO
- ✅ Marcar CONCLUÍDO
- ✅ Gravar + commit + push

Sem perguntar de novo.

---

**Ver também:** `docs/regras/tarefas-agendadas.md`
