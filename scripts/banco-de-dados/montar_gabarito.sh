#!/bin/sh
# uso: montar_gabarito.sh NN "Tema" corpo.md saida.md
SP=${RASCUNHO:-/tmp/rascunho-banco-de-dados}
{
echo "# Padrão de Resposta — Atividade Prática — Aula $1 — Banco de Dados (uso exclusivo do professor e da correção por IA)"
echo ""
echo "> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (\`.vercelignore\`). O conteúdo vai para a tabela"
echo "> \`topico_discursivo\` (leitura só do professor) pelo seed gerado. Tema da aula: $2."
echo "> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10."
echo ""
cat "$(dirname "$0")/instrucoes-ia.md"
echo ""
cat "$3"
} > "$4"
