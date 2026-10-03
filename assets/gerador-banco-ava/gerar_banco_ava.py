"""Gera o banco de questões do AVA SENAI (Moodle XML) a partir das fontes .md de questões.

Uso:
    C:\\Python314\\python.exe assets\\gerador-banco-ava\\gerar_banco_ava.py <pasta ATIVIDADES>
    [--so=ARQ.md]

Lê <pasta ATIVIDADES>/CONTEUDO/*QUESTOES.md (múltipla escolha, com a linha Gabarito) e grava em
<pasta ATIVIDADES>/BANCO-AVA/ (fora do Git — contém as respostas certas):
- um .xml por fonte, com o mesmo nome da fonte;
- BANCO-AVA-<PASTA-DA-MATERIA>.xml com todas as fontes (uma categoria por atividade).
Importar no AVA: Banco de questões → Importar → Moodle XML, com "Obter categoria do arquivo".
Importar os arquivos por atividade OU o arquivo único (os dois juntos duplicam as questões).
Plano: docs/banco-questoes-ava-senai-moodle-xml.md
"""
import argparse
import re
import sys
import unicodedata
from pathlib import Path

PASTA_GERADOR = Path(__file__).resolve().parent
sys.path.insert(0, str(PASTA_GERADOR))
sys.path.insert(0, str(PASTA_GERADOR.parent / "gerador-atividades"))
import moodle_xml  # noqa: E402
from gerar_atividades import ler_dados_materia, ler_questoes  # noqa: E402

PASTA_FONTES = "CONTEUDO"
PADRAO_FONTES = "*QUESTOES.md"
PASTA_SAIDA = "BANCO-AVA"
PREFIXO_ARQUIVO_UNICO = "BANCO-AVA-"
EXTENSAO_SAIDA = ".xml"
SEPARADOR_TEMA = " — "
SEPARADOR_IDENTIFICADOR = "-"
PADRAO_NAO_ALFANUMERICO = re.compile(r"[^A-Z0-9]+")
DESCRICAO_USO = "Gera o banco de questões do AVA SENAI (Moodle XML) de uma pasta ATIVIDADES."


def normalizar_identificador(texto):
    """Converte um texto em ID sem acentos, maiúsculo e com hífens (ex.: "AULA-01").

    Args:
        texto: Texto livre (ex.: "INTRODUCAO-TIC Avaliação Objetiva 01").

    Returns:
        Identificador normalizado.
    """
    sem_acentos = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode("ascii")
    return PADRAO_NAO_ALFANUMERICO.sub(SEPARADOR_IDENTIFICADOR, sem_acentos.upper()).strip(
        SEPARADOR_IDENTIFICADOR)


def localizar_fontes(pasta):
    """Fontes de questões objetivas da pasta ATIVIDADES, em ordem alfabética.

    Args:
        pasta: Pasta ATIVIDADES da matéria.

    Returns:
        Lista de caminhos *QUESTOES.md em CONTEUDO/.

    Raises:
        SystemExit: Se não houver nenhuma fonte.
    """
    fontes = sorted((pasta / PASTA_FONTES).glob(PADRAO_FONTES), key=lambda fonte: fonte.name)
    if not fontes:
        raise SystemExit(f"Nenhum {PADRAO_FONTES} em {pasta / PASTA_FONTES}")
    return fontes


def localizar_fonte(pasta, nome):
    """Acha uma fonte pelo nome em CONTEUDO/.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        nome: Nome do arquivo .md.

    Returns:
        Caminho da fonte.

    Raises:
        SystemExit: Se o arquivo não existir.
    """
    fonte = pasta / PASTA_FONTES / nome
    if not fonte.is_file():
        raise SystemExit(f"{nome} não encontrado em {pasta / PASTA_FONTES}")
    return fonte


def montar_atividade(fonte, dados, nome_materia):
    """Lê uma fonte e monta a categoria e as questões dela em Moodle XML.

    Args:
        fonte: Caminho do *QUESTOES.md.
        dados: Dados da matéria (usa uc_curta como categoria principal).
        nome_materia: Nome da pasta da matéria (prefixo dos IDs, ex.: "INTRODUCAO-TIC").

    Returns:
        Dicionário com fonte, rotulo, total e blocos (textos XML, categoria primeiro).
    """
    meta, itens = ler_questoes(fonte)
    rotulo = meta["rotulo"]
    categoria = [dados["uc_curta"], f"{rotulo}{SEPARADOR_TEMA}{meta['tema']}"]
    prefixo = normalizar_identificador(f"{nome_materia} {rotulo}")
    blocos = [moodle_xml.montar_categoria(categoria)]
    blocos += [moodle_xml.montar_questao(item, rotulo, prefixo) for item in itens]
    return {"fonte": fonte, "rotulo": rotulo, "total": len(itens), "blocos": blocos}


def gravar_xml(caminho, blocos):
    """Grava um documento Moodle XML em UTF-8, criando a pasta BANCO-AVA se preciso.

    Args:
        caminho: Arquivo .xml de saída.
        blocos: Textos XML de categorias e questões.
    """
    caminho.parent.mkdir(exist_ok=True)
    caminho.write_text(moodle_xml.montar_quiz(blocos), encoding="utf-8")


def gravar_por_atividade(atividades, pasta_saida):
    """Grava um .xml por atividade, com o mesmo nome da fonte.

    Args:
        atividades: Atividades montadas por montar_atividade().
        pasta_saida: Pasta BANCO-AVA.
    """
    for atividade in atividades:
        caminho = pasta_saida / (atividade["fonte"].stem + EXTENSAO_SAIDA)
        gravar_xml(caminho, atividade["blocos"])
        print(f"{atividade['rotulo']}: {atividade['total']} questões -> {caminho.name}")


def gravar_arquivo_unico(atividades, pasta_saida, nome_materia):
    """Grava o arquivo único da matéria com todas as atividades (uma categoria por atividade).

    Args:
        atividades: Atividades montadas por montar_atividade().
        pasta_saida: Pasta BANCO-AVA.
        nome_materia: Nome da pasta da matéria (entra no nome do arquivo).
    """
    caminho = pasta_saida / f"{PREFIXO_ARQUIVO_UNICO}{nome_materia}{EXTENSAO_SAIDA}"
    blocos = [bloco for atividade in atividades for bloco in atividade["blocos"]]
    gravar_xml(caminho, blocos)
    total = sum(atividade["total"] for atividade in atividades)
    print(f"Arquivo único: {len(atividades)} atividades, {total} questões -> {caminho.name}")


def ler_argumentos():
    """Lê a pasta ATIVIDADES e a opção --so da linha de comando.

    Returns:
        argparse.Namespace com pasta (Path) e so (nome do .md ou None).

    Raises:
        SystemExit: Se a pasta não existir.
    """
    leitor = argparse.ArgumentParser(description=DESCRICAO_USO)
    leitor.add_argument("pasta", type=Path, help="pasta ATIVIDADES da matéria")
    leitor.add_argument("--so", metavar="ARQ.md",
                        help="gera só esta fonte (o arquivo único não é alterado)")
    argumentos = leitor.parse_args()
    argumentos.pasta = argumentos.pasta.resolve()
    if not argumentos.pasta.is_dir():
        raise SystemExit(f"Pasta não encontrada: {argumentos.pasta}")
    return argumentos


def main():
    """Gera os arquivos do banco do AVA da pasta ATIVIDADES informada."""
    argumentos = ler_argumentos()
    pasta = argumentos.pasta
    dados = ler_dados_materia(pasta)
    nome_materia = pasta.parent.name
    pasta_saida = pasta / PASTA_SAIDA
    if argumentos.so:
        fontes = [localizar_fonte(pasta, argumentos.so)]
    else:
        fontes = localizar_fontes(pasta)
    atividades = [montar_atividade(fonte, dados, nome_materia) for fonte in fontes]
    gravar_por_atividade(atividades, pasta_saida)
    if not argumentos.so:
        gravar_arquivo_unico(atividades, pasta_saida, nome_materia)


if __name__ == "__main__":
    main()
