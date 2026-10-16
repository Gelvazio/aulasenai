> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 88 — Bloquear colar na Prova Prática ADAG (id 82) e regra para as outras discursivas (tarefa pequena, 2026-10-08 13:46:24)

Pedido do usuário: bloquear copiar e colar (obrigar a digitar cada resposta) **só nesta prova** e anotar a regra no `CLAUDE.md` para fazer nas outras depois.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 88.1 | `assets/js/bloqueio-colar-discursiva.js`: cancela colar, arrastar, copiar e recortar nos campos de resposta e avisa com popup; só age com `data-bloquear-colar="sim"` no `<body>` | ✅ Concluído | 2026-10-08 13:50:19 | `node --check` |
| 88.2 | Gerador discursivo: campo opcional `- **Bloquear colar:** sim` (`ATRIBUTOS_BODY`) e o template inclui o script | ✅ Concluído | 2026-10-08 13:50:19 | `py_compile` |
| 88.3 | Campo ligado em `PROVA-PRATICA-ADAG-SALETE.md` e `PROVA-PRATICA-06-10-2026.html` regerada | ✅ Concluído | 2026-10-08 13:50:19 | `git diff`: só o atributo no `<body>` e o `<script>` novo; 20 questões, 60 tópicos, 10 pontos |
| 88.4 | Regra em `docs/regras/atividades.md` e no `CLAUDE.md` (versão + histórico) | ✅ Concluído | 2026-10-08 13:50:19 | Leitura dos arquivos |
| 88.5 | Campo do tamanho da resposta: gerador calcula as linhas de cada campo pelo padrão de resposta (5 a 16 linhas) e `assets/js/campo-tamanho-discursiva.js` faz o campo crescer ao digitar; ligado na prova id 82 | ✅ Concluído | 2026-10-08 13:52:33 | `py_compile`, `node --check`; página regerada: 22 campos com 5 linhas, 38 maiores (até 13) |
| 88.6 | Validação de todos os tópicos preenchidos na entrega | ✅ Concluído | 2026-10-08 13:52:33 | Já existia: `conferirTudoGravado` (espaços = vazio) + RLS da entrega; regra anotada em `docs/regras/atividades.md` |
| 88.7 | Botão "💾 Gravar" em cada tópico (campo `Botão gravar: sim`), mantendo a gravação automática — as duas opções juntas, pedido do usuário; ligado na prova id 82 | ✅ Concluído | 2026-10-08 13:53:51 | `py_compile`, `node --check`; página regerada com 60 botões |
| 88.8 | Aceite do usuário (testar no navegador: Ctrl+V bloqueado, campo cresce ao digitar, botão Gravar, entrega recusa tópico vazio) | 👀 Aguardando o usuário | — | — |
