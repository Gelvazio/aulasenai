"""Edições da apostila (ex.: versão reduzida "V2"): pasta das fontes, arquivos e versão.

Sem edição, tudo continua como na apostila normal: fontes em APOSTILA/CONTEUDO/ e arquivos
APOSTILA-<MATÉRIA>.md/.html. Com --edicao=V2: fontes em APOSTILA/CONTEUDO-V2/, arquivos
APOSTILA-<MATÉRIA>-V2.md/.html e a configuração vem de "edicoes_apostila" do materia.json
(ex.: {"V2": {"versao": "2.0", "sem_videos_e_exercicios": true}}). Com
"sem_videos_e_exercicios", os capítulos podem ter só Teoria, Resumo e Glossário.
Usado por assets/gerador-apostilas/gerar_apostila.py. Plano: docs/apostila-itic-v2-40-paginas.md.
"""
import re

PASTA_APOSTILA = "APOSTILA"
PASTA_FONTES = "CONTEUDO"
OPCAO_EDICAO = "--edicao="
CAMPO_EDICOES = "edicoes_apostila"
CAMPO_VERSAO = "versao"
CAMPO_SEM_PRATICAS = "sem_videos_e_exercicios"
ARQUIVO_MATERIA = "materia.json"
PADRAO_NOME_EDICAO = re.compile(r"^[A-Z0-9]+$")


def ler_opcao_edicao(opcoes):
    """Lê o nome da edição da opção --edicao=<NOME> da linha de comando.

    Args:
        opcoes: Conjunto de opções ("--...") recebidas.

    Returns:
        Nome da edição em maiúsculas (ex.: "V2") ou "" se a opção não foi usada.

    Raises:
        SystemExit: Se o nome tiver algo além de letras e números.
    """
    valores = [opcao[len(OPCAO_EDICAO):] for opcao in opcoes if opcao.startswith(OPCAO_EDICAO)]
    if not valores:
        return ""
    edicao = valores[0].strip().upper()
    if not PADRAO_NOME_EDICAO.match(edicao):
        raise SystemExit(f"❌ edição inválida: '{valores[0]}' (use letras e números, ex.: V2)")
    return edicao


def nome_pasta_fontes(edicao):
    """Nome da pasta das fontes da apostila (CONTEUDO ou CONTEUDO-<EDIÇÃO>).

    Args:
        edicao: Nome da edição (ex.: "V2") ou "" para a apostila normal.

    Returns:
        Nome da pasta dentro de APOSTILA/.
    """
    if not edicao:
        return PASTA_FONTES
    return f"{PASTA_FONTES}-{edicao}"


def pasta_fontes(pasta_materia, edicao):
    """Pasta das fontes (INTRODUCAO.md e CAPITULO-NN.md) da edição.

    Args:
        pasta_materia: Pasta da matéria (Path).
        edicao: Nome da edição ou "".

    Returns:
        Caminho de <MATERIA>/APOSTILA/CONTEUDO[-<EDIÇÃO>].
    """
    return pasta_materia / PASTA_APOSTILA / nome_pasta_fontes(edicao)


def caminho_apostila(pasta_materia, edicao, extensao):
    """Caminho de um arquivo final da apostila (Markdown completo ou HTML).

    Args:
        pasta_materia: Pasta da matéria (Path).
        edicao: Nome da edição ou "".
        extensao: ".md" ou ".html".

    Returns:
        Caminho de <MATERIA>/APOSTILA/APOSTILA-<MATERIA>[-<EDIÇÃO>]<extensao>.
    """
    sufixo = f"-{edicao}" if edicao else ""
    return pasta_materia / PASTA_APOSTILA / f"APOSTILA-{pasta_materia.name}{sufixo}{extensao}"


def aplicar_edicao(dados, edicao):
    """Troca a versão da apostila pela da edição e registra a pasta das fontes.

    Args:
        dados: Dados da matéria já organizados (com "materia" = conteúdo do materia.json).
        edicao: Nome da edição ou "" (só registra a pasta padrão).

    Returns:
        Novo dicionário com "versao_apostila" e "pasta_fontes" da edição.

    Raises:
        SystemExit: Se a edição não estiver em "edicoes_apostila" do materia.json.
    """
    if not edicao:
        return {**dados, "pasta_fontes": PASTA_FONTES}
    configuracoes = dados["materia"].get(CAMPO_EDICOES, {})
    configuracao = configuracoes.get(edicao)
    if not isinstance(configuracao, dict) or not configuracao.get(CAMPO_VERSAO):
        raise SystemExit(f'❌ {ARQUIVO_MATERIA}: falta a edição "{edicao}" em '
                         f'"{CAMPO_EDICOES}" (ex.: {{"{edicao}": {{"{CAMPO_VERSAO}": "2.0"}}}})')
    return {**dados, "versao_apostila": configuracao[CAMPO_VERSAO],
            "pasta_fontes": nome_pasta_fontes(edicao),
            CAMPO_SEM_PRATICAS: bool(configuracao.get(CAMPO_SEM_PRATICAS))}
