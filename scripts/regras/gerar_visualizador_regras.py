"""Gera `.claude/rules/index.html`: visualizador das regras e do quadro de tarefas.

Regra: `.claude/rules/visualizador-regras.md` — rodar este script sempre que mudar algum arquivo de
`.claude/rules/` ou do quadro (`tasks/STATUS.md`, `tasks/TASKS.md`, `tasks/etapas/`) e commitar o
`index.html` junto. A página é só um visualizador (não é página do projeto).

O conteúdo vai embutido no HTML para a página abrir também por duplo clique (`file://`), onde o
navegador não deixa a página ler os arquivos `.md`.

Uso (na raiz do repositório):
    python scripts/regras/gerar_visualizador_regras.py
"""
import json
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

PASTA_SCRIPT = Path(__file__).resolve().parent
sys.path.insert(0, str(PASTA_SCRIPT / "visualizador"))

from leitor_regras import ler_regras  # noqa: E402
from leitor_tarefas import ler_tarefas  # noqa: E402

RAIZ_PROJETO = PASTA_SCRIPT.parent.parent
PASTA_REGRAS = RAIZ_PROJETO / ".claude" / "rules"
PASTA_TASKS = RAIZ_PROJETO / "tasks"
PASTA_MODELO = PASTA_SCRIPT / "visualizador"
ARQUIVO_SAIDA = PASTA_REGRAS / "index.html"
ARQUIVOS_SCRIPT = ["markdown.js", "app.js", "aba-regras.js", "aba-tasks.js", "inicio.js"]
FUSO_BRASILIA = ZoneInfo("America/Sao_Paulo")
FORMATO_DATA = "%Y-%m-%d %H:%M:%S"


def ler_modelo(nome: str) -> str:
    """Lê um arquivo da pasta do modelo do visualizador.

    Args:
        nome: Nome do arquivo (ex.: "estilo.css").

    Returns:
        Conteúdo do arquivo.
    """
    return (PASTA_MODELO / nome).read_text(encoding="utf-8")


def montar_dados() -> dict:
    """Junta regras, tarefas e a data de geração.

    Returns:
        Dicionário serializável em JSON para a página.
    """
    return {
        "geradoEm": datetime.now(FUSO_BRASILIA).strftime(FORMATO_DATA),
        "regras": ler_regras(PASTA_REGRAS),
        "tasks": ler_tarefas(PASTA_TASKS),
    }


def serializar_para_html(dados: dict) -> str:
    """Converte os dados em JSON seguro dentro de `<script>` (sem fechar a tag por engano).

    Args:
        dados: Dados da página.

    Returns:
        JSON com `</` e `<!--` neutralizados.
    """
    texto = json.dumps(dados, ensure_ascii=False)
    return texto.replace("</", "<\\/").replace("<!--", "<\\!--")


def montar_html(dados: dict) -> str:
    """Preenche o modelo com o CSS, o JavaScript e os dados.

    Args:
        dados: Dados da página.

    Returns:
        HTML completo e autocontido.
    """
    script = "\n\n".join(ler_modelo(nome) for nome in ARQUIVOS_SCRIPT)
    substituicoes = {
        "/*__ESTILO__*/": ler_modelo("estilo.css"),
        "/*__DADOS__*/": serializar_para_html(dados),
        "/*__SCRIPT__*/": script,
    }
    html = ler_modelo("modelo.html")
    for marcador, valor in substituicoes.items():
        html = html.replace(marcador, valor, 1)
    return html


def main() -> int:
    """Gera o `index.html` e mostra um resumo.

    Returns:
        Código de saída (0 = sucesso).
    """
    dados = montar_dados()
    ARQUIVO_SAIDA.write_text(montar_html(dados), encoding="utf-8", newline="\n")
    tarefas = dados["tasks"]
    print(f"Gerado {ARQUIVO_SAIDA.relative_to(RAIZ_PROJETO)} em {dados['geradoEm']}: "
          f"{len(dados['regras'])} seções de regras, {len(tarefas['tarefas'])} tarefas, "
          f"{len(tarefas['frentes'])} frentes, {len(tarefas['aguardando'])} aguardando.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
