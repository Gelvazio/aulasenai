# 🤖 Várias IAs neste projeto

As regras gerais de frentes, reserva, prioridade e conflitos estão em
[`tasks/frentes-e-reserva.md`](tasks/frentes-e-reserva.md) (valem para todas as IAs). Aqui fica só
o que é **deste projeto**.

## 1. Nome das frentes

- **Local:** `local · main` (máquina do usuário).
- **Nuvem:** `nuvem · <nome-da-sessão>` — também trabalha na `main` (`git-quick.md`), mesmo que a
  ferramenta indique outra branch.
- Na reserva ("Em uso por") vai também a IA e o modelo, para saber o nível de quem pegou
  (`niveis.md`).

## 2. Banco de dados: só o Claude Code local

- Só o **Claude Code local** (máquina do usuário, com o conector do Supabase) pega tarefa de banco:
  SQL, schema, trigger, função, RLS, migração, seeds, consultas e validação contra o banco real.
- ⛔ Sessões de nuvem e outras IAs não pegam essas tarefas; se a tarefa tiver parte sem banco
  (frontend, documentação), essa parte vira item ou tarefa separada.
- Frente sem banco que encontrar seed pendente: segue o que diz `seeds.md` (não fica travada).
- Mudança em banco de produção exige autorização do usuário, exceto o ciclo de seeds já autorizado
  em `seeds.md`.
