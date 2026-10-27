"""Analisa a pasta MATERIAIS e grava so metadados em analises/analise-materiais.json.

Nenhum arquivo de MATERIAIS e aberto: apenas nome, extensao, tamanho e data.
"""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

RAIZ_PROJETO = Path(__file__).resolve().parent.parent
PASTA_MATERIAIS = RAIZ_PROJETO / "MATERIAIS"
PASTA_ANALISES = RAIZ_PROJETO / "analises"
NOME_JSON = "analise-materiais.json"
PASTAS_IGNORADAS = {"__pycache__", ".git"}
EXTENSAO_SEM_TIPO = "(sem extensão)"
CODIFICACAO = "utf-8"
INDENTACAO_JSON = 2
CODIGO_ERRO = 1
MSG_SEM_MATERIAIS = "Pasta MATERIAIS não encontrada: {caminho}"
MSG_ERRO_INESPERADO = "Erro ao analisar MATERIAIS: {erro}"
MSG_AVISO_STAT = "Aviso: não foi possível ler {caminho}: {erro}"
MSG_SUCESSO = "Gerado {caminho} com {total} arquivos."


def listar_arquivos(raiz):
    """Lista recursivamente os arquivos de uma pasta, sem seguir links simbólicos.

    Args:
        raiz: Path da pasta a percorrer.

    Returns:
        Lista de Path de arquivos, ordenada.

    Raises:
        OSError: Se a pasta raiz não puder ser lida.
    """
    arquivos = []
    for pasta, subpastas, nomes in os.walk(raiz, followlinks=False):
        subpastas[:] = [nome for nome in subpastas if nome not in PASTAS_IGNORADAS]
        for nome in nomes:
            caminho = Path(pasta) / nome
            if caminho.is_symlink():
                continue
            arquivos.append(caminho)
    return sorted(arquivos)


def tipo_do_arquivo(caminho):
    """Retorna o tipo do arquivo pela extensão, sem ponto e em minúsculas.

    Args:
        caminho: Path ou texto do arquivo.

    Returns:
        Extensão em minúsculas, ou EXTENSAO_SEM_TIPO se não houver.
    """
    extensao = Path(caminho).suffix.lower().lstrip(".")
    return extensao or EXTENSAO_SEM_TIPO


def ler_metadados(caminho, raiz):
    """Lê os metadados de um arquivo sem abri-lo.

    Args:
        caminho: Path do arquivo.
        raiz: Path da pasta MATERIAIS.

    Returns:
        Dicionário com caminho, pasta, tipo, tamanho e modificado.
        Em erro de leitura, tamanho e modificado ficam null e um aviso é impresso.
    """
    partes = caminho.relative_to(raiz).parts
    metadados = {
        "caminho": "/".join(partes),
        "pasta": partes[0] if len(partes) > 1 else "",
        "tipo": tipo_do_arquivo(caminho),
        "tamanho": None,
        "modificado": None,
    }
    try:
        informacoes = caminho.stat()
    except OSError as erro:
        print(MSG_AVISO_STAT.format(caminho=metadados["caminho"], erro=erro), file=sys.stderr)
        return metadados
    data = datetime.fromtimestamp(informacoes.st_mtime, tz=timezone.utc)
    metadados["tamanho"] = informacoes.st_size
    metadados["modificado"] = data.isoformat()
    return metadados


def contar_por_tipo(metadados):
    """Conta os arquivos por tipo.

    Args:
        metadados: Lista de dicionários de ler_metadados.

    Returns:
        Dicionário tipo -> quantidade, ordenado por tipo.
    """
    contagem = {}
    for item in metadados:
        contagem[item["tipo"]] = contagem.get(item["tipo"], 0) + 1
    return dict(sorted(contagem.items()))


def contar_por_pasta(metadados):
    """Conta os arquivos por pasta de primeiro nível e por tipo dentro dela.

    Args:
        metadados: Lista de dicionários de ler_metadados.

    Returns:
        Dicionário pasta -> {"total": n, "tipos": {tipo: n}}.
    """
    pastas = {}
    for item in metadados:
        entrada = pastas.setdefault(item["pasta"], {"total": 0, "tipos": {}})
        entrada["total"] += 1
        tipos = entrada["tipos"]
        tipos[item["tipo"]] = tipos.get(item["tipo"], 0) + 1
    return dict(sorted(pastas.items()))


def gravar_json(dados, caminho):
    """Grava o JSON em arquivo temporário e troca pelo definitivo no fim.

    Args:
        dados: Objeto serializável em JSON.
        caminho: Path do arquivo final (a pasta é criada se faltar).

    Raises:
        OSError: Se não for possível gravar; o temporário é removido.
    """
    caminho.parent.mkdir(parents=True, exist_ok=True)
    temporario = caminho.with_name(caminho.name + ".tmp")
    try:
        with open(temporario, "w", encoding=CODIFICACAO) as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=INDENTACAO_JSON)
        os.replace(temporario, caminho)
    finally:
        if temporario.exists():
            temporario.unlink()


def montar_analise(raiz):
    """Monta o dicionário final da análise de uma pasta.

    Args:
        raiz: Path da pasta MATERIAIS.

    Returns:
        Dicionário com geradoEm, totalArquivos, porTipo, porPasta e arquivos.
    """
    metadados = [ler_metadados(caminho, raiz) for caminho in listar_arquivos(raiz)]
    return {
        "geradoEm": datetime.now(timezone.utc).isoformat(),
        "totalArquivos": len(metadados),
        "porTipo": contar_por_tipo(metadados),
        "porPasta": contar_por_pasta(metadados),
        "arquivos": metadados,
    }


def main():
    """Executa a análise e grava o JSON.

    Returns:
        Código de saída: 0 em sucesso, 1 em erro.
    """
    if not PASTA_MATERIAIS.is_dir():
        print(MSG_SEM_MATERIAIS.format(caminho=PASTA_MATERIAIS), file=sys.stderr)
        return CODIGO_ERRO
    try:
        analise = montar_analise(PASTA_MATERIAIS)
        destino = PASTA_ANALISES / NOME_JSON
        gravar_json(analise, destino)
    except Exception as erro:
        print(MSG_ERRO_INESPERADO.format(erro=erro), file=sys.stderr)
        return CODIGO_ERRO
    print(MSG_SUCESSO.format(caminho=destino, total=analise["totalArquivos"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
