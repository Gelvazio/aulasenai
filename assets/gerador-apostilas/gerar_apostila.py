r"""Gera a apostila HTML de uma matéria a partir dos capítulos em Markdown (um por aula).

Uso: C:\Python314\python.exe assets\gerador-apostilas\gerar_apostila.py <pasta da matéria>

Fontes em <MATERIA>/APOSTILA/:
- CONTEUDO/INTRODUCAO.md — introdução da apostila (Markdown livre, subtítulos "###");
- CONTEUDO/CAPITULO-NN.md — um por aula, com "## Teoria", "## Vídeos", "## Exercícios",
  "## Resumo" e "## Glossário";
Dados da matéria (arquivo único): <MATERIA>/materia.json — identificação, capacidades,
conhecimentos e o plano de aulas ("aulas", 1 aula = 1 capítulo; padrão 4 h, ou a
"carga_horaria" de cada aula).
Saída: <MATERIA>/APOSTILA/APOSTILA-<NOME DA PASTA DA MATÉRIA>.html. O assets/js/apostila.js
divide o conteúdo em páginas A4 no navegador.
Edição (ex.: versão reduzida): --edicao=V2 lê as fontes de APOSTILA/CONTEUDO-V2/, grava
APOSTILA-<MATÉRIA>-V2.md/.html e usa a versão de "edicoes_apostila" do materia.json.
Regras: seção "REGRAS APOSTILAS" do CLAUDE.md; plano: docs/gerador-apostilas.md.
"""
import html
import os
import re
import sys
from pathlib import Path

import markdown

GERADOR = Path(__file__).resolve().parent
ASSETS = GERADOR.parent
sys.path.insert(0, str(ASSETS / "gerador-menu"))
from tags_header import inserir_header_em_html  # noqa: E402
from tags_menu import CAMINHO_CSS, CAMINHO_JS, PASTA_PROJETO, localizar_dados_menu  # noqa: E402

sys.path.insert(0, str(ASSETS / "gerador-capacidades"))
import capacidades as cap  # noqa: E402

sys.path.insert(0, str(ASSETS / "gerador-materia"))
import materia as dados_materia  # noqa: E402

sys.path.insert(0, str(GERADOR))
import markdown_apostila as md_apostila  # noqa: E402
import conferir_ementa  # noqa: E402
import edicao_apostila as edicoes  # noqa: E402

TEMPLATE = (GERADOR / "template_apostila.html").read_text(encoding="utf-8")
PASTA_APOSTILA = "APOSTILA"
PADRAO_FONTES = "CAPITULO-*.md"
ARQUIVO_INTRODUCAO = "INTRODUCAO.md"
ARQUIVO_MATERIA = dados_materia.ARQUIVO_MATERIA
CAMPO_SOCIOEMOCIONAIS = "capacidades_socioemocionais"
CAMPO_CARGA_UC = "carga_horaria_uc"
CAMPO_HORAS_AULA = "horas_por_aula"
CAMPO_AULAS = "aulas"
CAMPO_TERMOS_EMENTA = "termos_glossario_ementa"
HORAS_POR_CAPITULO_PADRAO = 4
OPCAO_MARKDOWN = "--markdown"
OPCAO_FORCAR = "--forcar"
OPCAO_CONFERIR = "--conferir"
CAMINHO_LOGO = "img/logo-sesi-senai.png"
URL_MINIATURA = "https://i.ytimg.com/vi/{}/hqdefault.jpg"
CAMPOS_DADOS = ("uc", "uc_curta", "curso", "docente", "autor_apostila", "versao_apostila")
SECOES_OBRIGATORIAS = ("Teoria", "Resumo", "Glossário")
SECOES_PRATICAS = ("Vídeos", "Exercícios")
PARTES_SUMARIO = (("videos", "Vídeos"), ("resumo", "Resumo"), ("exercicios", "Exercícios"))
PARTES_SO_TEORIA = (("resumo", "Resumo"),)
DURACAO_MAXIMA_SEGUNDOS = 15 * 60
DURACAO_A_CONFERIR = "a conferir"
LINHAS_RESPOSTA_PADRAO = 3
QUANTIDADE_MINIMA_EXERCICIOS = 5
EXTENSOES_MARKDOWN = ["tables", "sane_lists", "fenced_code"]
RECUO = " " * 12

PADRAO_TITULO = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
PADRAO_CERCA_CODIGO = re.compile(r"^\s*```", re.MULTILINE)
PADRAO_SECAO = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)
PADRAO_ITEM = re.compile(r"^###\s+ITEM\s+(\d+)\s*$", re.MULTILINE)
PADRAO_CAMPO = r"^-?\s*\*\*{rotulo}:\*\*\s*(.+?)\s*$"
PADRAO_VIDEO = re.compile(
    r"^-\s*\[(?P<titulo>[^\]]+)\]\((?P<url>[^)]+)\)\s*[—-]\s*(?P<duracao>[\d:]+|a conferir)"
    r"(?:[ \t]*[—-][ \t]*(?P<canal>[^\n]+?))?[ \t]*$", re.MULTILINE)
PADRAO_VIDEOS_PENDENTES = re.compile(r"^-\s*⏳\s*(?P<texto>.+?)\s*$", re.MULTILINE)
PADRAO_ID_YOUTUBE = re.compile(r"(?:v=|youtu\.be/|/embed/)([A-Za-z0-9_-]{11})")
PADRAO_TERMO = re.compile(r"^-\s*\*\*(?P<termo>.+?):\*\*\s*(?P<definicao>.+?)\s*$", re.MULTILINE)
PADRAO_H3_HTML = re.compile(r"<h3>(.*?)</h3>", re.DOTALL)
PADRAO_TITULO_CAPITULO = re.compile(r"^Capítulo\s+(\d+)\b")
PADRAO_SEPARADOR_FINAL = re.compile(r"\n-{3,}\s*$")
PADRAO_SECAO_INTRODUCAO = re.compile(r"^##\s+", re.MULTILINE)
TITULO_INTRODUCAO = "Introdução"
TITULO_GLOSSARIO = "Glossário"
PADRAO_TERMO_CAPITULO = re.compile(
    r"^(?P<linha>-\s*\*\*.+?:\*\*.+?)\s*_\(cap\.\s*(?P<numero>\d+)\)_\s*$", re.MULTILINE)


def erro(mensagem):
    """Interrompe a geração com uma mensagem clara.

    Args:
        mensagem: Texto do erro.

    Raises:
        SystemExit: Sempre.
    """
    raise SystemExit(f"❌ {mensagem}")


def ler_campo(texto, rotulo):
    """Lê o valor de uma linha "- **Rótulo:** valor".

    Args:
        texto: Trecho do .md.
        rotulo: Nome do campo.

    Returns:
        Valor do campo ou '' se não existir.
    """
    achado = re.search(PADRAO_CAMPO.format(rotulo=re.escape(rotulo)), texto, re.MULTILINE)
    return achado.group(1) if achado else ""


def ler_dados_materia(pasta_materia, edicao=""):
    """Lê o materia.json e organiza os dados usados pela apostila.

    Args:
        pasta_materia: Pasta da matéria.
        edicao: Nome da edição (ex.: "V2") ou "" para a apostila normal.

    Returns:
        Dicionário com uc, uc_curta, curso, docente, basicas, socioemocionais, todas,
        carga_horaria_uc, horas_por_capitulo, capitulos_previstos, plano_capitulos,
        conhecimentos, capacidades_x_conhecimentos e pasta_fontes.
    """
    dados = dados_materia.ler_materia(pasta_materia, CAMPOS_DADOS + (cap.CAMPO_DADOS,))
    basicas = dados[cap.CAMPO_DADOS]
    socioemocionais = dados.get(CAMPO_SOCIOEMOCIONAIS, {})
    plano = dados.get(CAMPO_AULAS, [])
    organizados = {
        **{campo: dados[campo] for campo in CAMPOS_DADOS}, "basicas": basicas,
        "socioemocionais": socioemocionais, "todas": {**basicas, **socioemocionais},
        "carga_horaria_uc": dados.get(CAMPO_CARGA_UC),
        "horas_por_capitulo": dados.get(CAMPO_HORAS_AULA, HORAS_POR_CAPITULO_PADRAO),
        "capitulos_previstos": [aula["tema"] for aula in plano], "plano_capitulos": plano,
        "conhecimentos": dados.get("conhecimentos", []),
        "capacidades_x_conhecimentos": dados.get("capacidades_x_conhecimentos", {}),
        "materia": dados}
    return edicoes.aplicar_edicao(organizados, edicao)


def validar_plano_capitulos(dados):
    """Confere o plano de capítulos (1 capítulo = 1 aula) contra a carga horária da UC.

    A soma das horas das aulas ("carga_horaria" de cada aula; sem ela, "horas_por_aula") tem de
    ser igual à carga da UC — a última aula pode ter menos horas (ex.: 30 h = 7 × 4 h + 2 h).

    Args:
        dados: Dados da matéria.

    Raises:
        SystemExit: Se faltar o plano ou se a soma das aulas não fechar com a carga da UC.
    """
    previstos, horas = dados["capitulos_previstos"], dados["horas_por_capitulo"]
    if not previstos:
        erro(f'{ARQUIVO_MATERIA}: falta "{CAMPO_AULAS}" (uma entrada por aula de {horas} h)')
    carga = dados["carga_horaria_uc"]
    soma = sum(md_apostila.horas_da_aula(dados, indice)
               for indice in range(1, len(previstos) + 1))
    if carga and soma != carga:
        erro(f"{ARQUIVO_MATERIA}: a soma das {len(previstos)} aulas ({soma} h) não fecha "
             f"com a carga da UC ({carga} h)")


def separar_secoes(texto, rotulo):
    """Divide o capítulo pelas seções "## Nome" e confere as obrigatórias.

    Vídeos e Exercícios vêm juntos: se o capítulo tem um deles, precisa dos dois; sem os dois, o
    capítulo é "só teoria" (permitido apenas na edição que libera — validar_so_teoria).

    Args:
        texto: Conteúdo do CAPITULO-NN.md.
        rotulo: Nome do arquivo, para as mensagens de erro.

    Returns:
        Dicionário nome da seção → texto da seção.
    """
    partes = PADRAO_SECAO.split(texto)
    secoes = {partes[i].strip(): partes[i + 1].strip() for i in range(1, len(partes), 2)}
    tem_praticas = any(nome in secoes for nome in SECOES_PRATICAS)
    exigidas = SECOES_OBRIGATORIAS + (SECOES_PRATICAS if tem_praticas else ())
    faltando = [nome for nome in exigidas if not secoes.get(nome)]
    if faltando:
        erro(f"{rotulo}: faltam as seções {', '.join(faltando)}")
    return secoes


def duracao_em_segundos(duracao, rotulo):
    """Converte "mm:ss" ou "h:mm:ss" em segundos.

    Args:
        duracao: Texto da duração.
        rotulo: Identificação do vídeo para as mensagens de erro.

    Returns:
        Duração em segundos.
    """
    partes = duracao.split(":")
    if len(partes) not in (2, 3) or not all(parte.isdigit() for parte in partes):
        erro(f"{rotulo}: duração inválida '{duracao}' (use mm:ss)")
    segundos = 0
    for parte in partes:
        segundos = segundos * 60 + int(parte)
    return segundos


def ler_videos(texto, rotulo):
    """Lê os vídeos da seção e recusa os que passam de 15 minutos ou não são do YouTube.

    Args:
        texto: Seção "Vídeos".
        rotulo: Nome do arquivo, para as mensagens de erro.

    Returns:
        Lista de dicionários com titulo, url, id, duracao e canal.
    """
    videos = []
    for achado in PADRAO_VIDEO.finditer(texto):
        rotulo_video = f"{rotulo} — vídeo '{achado['titulo']}'"
        id_video = PADRAO_ID_YOUTUBE.search(achado["url"])
        if not id_video:
            erro(f"{rotulo_video}: o link não é de um vídeo do YouTube")
        if achado["duracao"] == DURACAO_A_CONFERIR:
            print(f"⚠️ {rotulo_video}: duração a conferir pelo professor")
        elif duracao_em_segundos(achado["duracao"], rotulo_video) > DURACAO_MAXIMA_SEGUNDOS:
            erro(f"{rotulo_video}: passa de 15 minutos ({achado['duracao']})")
        videos.append({**achado.groupdict(), "id": id_video.group(1)})
    if not videos and not PADRAO_VIDEOS_PENDENTES.search(texto):
        erro(f"{rotulo}: a seção Vídeos precisa de ao menos um vídeo no formato "
             "'- [título](url) — mm:ss — canal' (ou da linha '- ⏳ Vídeos pendentes: ...', "
             "enquanto a duração não puder ser conferida)")
    if not videos:
        print(f"⚠️ {rotulo}: vídeos pendentes (duração ainda não conferida no YouTube)")
    return videos


def ler_exercicios(texto, capacidades, rotulo):
    """Lê os exercícios "### ITEM N" com Capacidade, Contexto e Comando.

    Args:
        texto: Seção "Exercícios".
        capacidades: Dicionário código → texto oficial.
        rotulo: Nome do arquivo, para as mensagens de erro.

    Returns:
        Lista de dicionários com numero, codigos, contexto, comando e linhas.
    """
    partes = PADRAO_ITEM.split(texto)
    exercicios = []
    for i in range(1, len(partes), 2):
        bloco, rotulo_item = partes[i + 1], f"{rotulo} — ITEM {partes[i]}"
        codigos = cap.ler_codigos_questao(bloco)
        cap.validar_codigos(capacidades, codigos, rotulo_item)
        contexto, comando = ler_campo(bloco, "Contexto"), ler_campo(bloco, "Comando")
        if not (codigos and contexto and comando):
            erro(f"{rotulo_item}: precisa de Capacidade, Contexto e Comando")
        linhas = int(ler_campo(bloco, "Linhas") or LINHAS_RESPOSTA_PADRAO)
        exercicios.append({"numero": partes[i], "codigos": codigos, "contexto": contexto,
                           "comando": comando, "linhas": linhas})
    if len(exercicios) < QUANTIDADE_MINIMA_EXERCICIOS:
        erro(f"{rotulo}: a seção Exercícios precisa de no mínimo "
             f"{QUANTIDADE_MINIMA_EXERCICIOS} "
             f"'### ITEM N' (encontrei {len(exercicios)})")
    return exercicios


def ler_capitulo(arquivo, capacidades):
    """Lê e valida um CAPITULO-NN.md.

    Args:
        arquivo: Caminho do .md.
        capacidades: Dicionário código → texto oficial (básicas e socioemocionais).

    Returns:
        Dicionário com os dados do capítulo.
    """
    return ler_texto_capitulo(arquivo.read_text(encoding="utf-8"), arquivo.stem[-2:],
                              capacidades, arquivo.name)


def ler_texto_capitulo(texto, numero, capacidades, rotulo):
    """Lê e valida o texto de um capítulo (do CAPITULO-NN.md ou do Markdown completo).

    Args:
        texto: Markdown do capítulo, começando por "# Capítulo NN — Tema".
        numero: Número do capítulo com 2 dígitos.
        capacidades: Dicionário código → texto oficial (básicas e socioemocionais).
        rotulo: Origem do texto, para as mensagens de erro.

    Returns:
        Dicionário com os dados do capítulo.
    """
    titulo = PADRAO_TITULO.search(texto)
    if not titulo:
        erro(f"{rotulo}: falta o título '# Capítulo NN — Tema'")
    cabecalho = PADRAO_SECAO.split(texto)[0]
    codigos = cap.ler_codigos_questao(cabecalho)
    cap.validar_codigos(capacidades, codigos, rotulo)
    secoes = separar_secoes(texto, rotulo)
    termos = [achado.groupdict() for achado in PADRAO_TERMO.finditer(secoes["Glossário"])]
    if not termos:
        erro(f"{rotulo}: o Glossário precisa de termos '- **Termo:** definição'")
    so_teoria = not any(nome in secoes for nome in SECOES_PRATICAS)
    capitulo = {"id": f"capitulo-{numero}", "numero": numero, "titulo": titulo.group(1),
                "codigos": codigos, "aula": ler_campo(cabecalho, "Aula"), "secoes": secoes,
                "termos": termos, "so_teoria": so_teoria, "videos": [], "exercicios": []}
    if so_teoria:
        return capitulo
    return {**capitulo, "videos": ler_videos(secoes["Vídeos"], rotulo),
            "exercicios": ler_exercicios(secoes["Exercícios"], capacidades, rotulo)}


def validar_so_teoria(capitulos, dados):
    """Recusa capítulo sem Vídeos e Exercícios quando a apostila não libera isso.

    Args:
        capitulos: Capítulos lidos.
        dados: Dados da matéria ("sem_videos_e_exercicios" vem da edição ou do materia.json).

    Raises:
        SystemExit: Se houver capítulo só com teoria e a apostila não permitir.
    """
    if dados.get("sem_videos_e_exercicios"):
        return
    so_teoria = [capitulo["numero"] for capitulo in capitulos if capitulo["so_teoria"]]
    if so_teoria:
        erro(f"capítulo(s) {', '.join(so_teoria)} sem as seções {', '.join(SECOES_PRATICAS)} "
             '(só permitido com "sem_videos_e_exercicios" na edição ou '
             '"apostila_sem_videos_e_exercicios" no materia.json)')


def trechos_de_codigo(texto):
    """Localiza os blocos de código cercados por ``` no Markdown.

    Args:
        texto: Markdown completo da apostila.

    Returns:
        Lista de (início, fim) de cada bloco de código, em posições do texto.
    """
    cercas = [achado.start() for achado in PADRAO_CERCA_CODIGO.finditer(texto)]
    return list(zip(cercas[::2], cercas[1::2]))


def esta_em_codigo(posicao, blocos):
    """Diz se a posição está dentro de um bloco de código (ex.: comentário "# ..." em YAML).

    Args:
        posicao: Posição no texto.
        blocos: Blocos de código de trechos_de_codigo().

    Returns:
        True se a posição estiver dentro de algum bloco.
    """
    return any(inicio < posicao < fim for inicio, fim in blocos)


def partes_markdown_completo(texto):
    """Divide o Markdown completo pelos títulos de primeiro nível ("# Título").

    Args:
        texto: Markdown completo da apostila.

    Returns:
        Lista de (título, texto da parte com o título), sem a linha "---" que separa as partes.
    """
    blocos = trechos_de_codigo(texto)
    inicios = [achado.start() for achado in PADRAO_TITULO.finditer(texto)
               if not esta_em_codigo(achado.start(), blocos)] + [len(texto)]
    partes = []
    for inicio, fim in zip(inicios, inicios[1:]):
        trecho = PADRAO_SEPARADOR_FINAL.sub("", texto[inicio:fim].strip()).strip()
        partes.append((PADRAO_TITULO.match(trecho).group(1), trecho))
    return partes


def termos_por_capitulo(texto_glossario):
    """Separa o glossário do Markdown completo pelos capítulos indicados em "_(cap. NN)_".

    Args:
        texto_glossario: Parte "# Glossário" do Markdown completo.

    Returns:
        Dicionário número do capítulo → linhas "- **Termo:** definição".
    """
    termos = {}
    for achado in PADRAO_TERMO_CAPITULO.finditer(texto_glossario):
        numero = f"{int(achado.group('numero')):02d}"
        termos.setdefault(numero, []).append(achado.group("linha"))
    return termos


def ler_markdown_completo(arquivo, dados):
    """Lê a introdução e os capítulos do Markdown completo (fonte final do HTML).

    Args:
        arquivo: Caminho do Markdown completo (da apostila ou da edição).
        dados: Dados da matéria.

    Returns:
        Tupla (texto Markdown da introdução, lista de capítulos em ordem).
    """
    if not arquivo.is_file():
        erro(f"falta o Markdown completo da apostila: {arquivo} (gere com {OPCAO_MARKDOWN})")
    partes = partes_markdown_completo(arquivo.read_text(encoding="utf-8"))
    glossario = termos_por_capitulo(dict(partes).get(TITULO_GLOSSARIO, ""))
    introducao, capitulos = None, []
    for titulo, trecho in partes:
        numero = PADRAO_TITULO_CAPITULO.match(titulo)
        if titulo == TITULO_INTRODUCAO:
            corpo = PADRAO_TITULO.sub("", trecho, count=1).strip()
            introducao = PADRAO_SECAO_INTRODUCAO.sub("### ", corpo)
        elif numero:
            numero = f"{int(numero.group(1)):02d}"
            trecho += "\n\n## Glossário\n\n" + "\n".join(glossario.get(numero, []))
            capitulos.append(ler_texto_capitulo(trecho, numero, dados["todas"],
                                                f"{arquivo.name} ({titulo})"))
    if introducao is None:
        erro(f"{arquivo.name}: falta a parte '# {TITULO_INTRODUCAO}'")
    if not capitulos:
        erro(f"{arquivo.name}: nenhum '# Capítulo NN — Tema'")
    validar_so_teoria(capitulos, dados)
    if dados["plano_capitulos"]:
        conferir_cobertura_ementa(dados, capitulos)
    return introducao, capitulos


def converter_markdown(texto):
    """Converte Markdown em HTML (tabelas e listas).

    Args:
        texto: Texto em Markdown.

    Returns:
        HTML correspondente.
    """
    return markdown.markdown(texto, extensions=EXTENSOES_MARKDOWN)


def numerar_subtitulos(html_teoria, prefixo, nivel_destino):
    """Dá id aos subtítulos "###" (h3) e os rebaixa para o nível pedido, para o sumário.

    Args:
        html_teoria: HTML convertido do Markdown.
        prefixo: Prefixo dos ids (ex.: "capitulo-01-t").
        nivel_destino: Tag de destino ("h3" ou "h4").

    Returns:
        Tupla (HTML com ids, lista de (id, texto) dos subtítulos).
    """
    subtitulos = []

    def trocar(achado):
        id_subtitulo = f"{prefixo}{len(subtitulos) + 1}"
        subtitulos.append((id_subtitulo, re.sub(r"<[^>]+>", "", achado.group(1))))
        return f'<{nivel_destino} id="{id_subtitulo}">{achado.group(1)}</{nivel_destino}>'

    return PADRAO_H3_HTML.sub(trocar, html_teoria), subtitulos


def html_texto_capacidades(codigos, capacidades):
    """Monta "C1 — texto" de cada código, separados por quebra de linha.

    Args:
        codigos: Códigos das capacidades.
        capacidades: Dicionário código → texto oficial.

    Returns:
        HTML escapado.
    """
    return "<br>".join(f"<strong>{html.escape(codigo)}</strong> — "
                       f"{html.escape(capacidades[codigo])}" for codigo in codigos)


def texto_duracao(duracao):
    """Texto da duração do vídeo ("a conferir" vira aviso para o professor).

    Args:
        duracao: Duração "mm:ss" ou "a conferir".

    Returns:
        Texto exibido na caixa do vídeo.
    """
    return "duração a conferir pelo professor" if duracao == DURACAO_A_CONFERIR else duracao


def html_video(video):
    """Monta a caixa de um vídeo: miniatura com link, título, duração, canal e endereço.

    Args:
        video: Dicionário do vídeo.

    Returns:
        HTML da caixa.
    """
    titulo, url = html.escape(video["titulo"]), html.escape(video["url"])
    canal = f" · {html.escape(video['canal'])}" if video.get("canal") else ""
    return (f'<div class="caixa-video"><a href="{url}" target="_blank" rel="noopener">'
            f'<img class="caixa-video__miniatura" src="{URL_MINIATURA.format(video["id"])}" '
            f'alt="Miniatura do vídeo {titulo}"></a><div>'
            f'<p class="caixa-video__titulo">▶️ {titulo}</p>'
            f'<p class="caixa-video__detalhe">⏱️ {texto_duracao(video["duracao"])}{canal}</p>'
            f'<p class="caixa-video__detalhe">🔗 <a href="{url}" target="_blank" '
            f'rel="noopener">{url}</a></p></div></div>')


def html_exercicio(exercicio, capacidades):
    """Monta um exercício no padrão ITEM (CAPACIDADE, divisória, Contexto, Comando, Resposta).

    Args:
        exercicio: Dicionário do exercício.
        capacidades: Dicionário código → texto oficial.

    Returns:
        HTML do exercício.
    """
    linhas = "".join('<div class="resposta-linha"></div>' for _ in range(exercicio["linhas"]))
    return (f'<div class="exercicio-box">'
            f'<div class="exercicio-header">ITEM {exercicio["numero"]}</div>'
            f'<p><span class="exercicio-label">CAPACIDADE:</span> '
            f'{html_texto_capacidades(exercicio["codigos"], capacidades)}</p>'
            f'<div class="exercicio-divisoria"></div>'
            f'<p><span class="exercicio-label">Contexto:</span> '
            f'{html.escape(exercicio["contexto"])}</p>'
            f'<p><span class="exercicio-label">Comando:</span> '
            f'{html.escape(exercicio["comando"])}</p>'
            f'<div class="resposta-campo"><span class="exercicio-label">Resposta:</span>'
            f'{linhas}</div></div>')


def html_fonte(blocos, parte, id_capitulo=""):
    """Embrulha os blocos num ".fonte-paginas" (o JS divide em páginas A4).

    Args:
        blocos: Lista de trechos HTML (cada um vira um bloco da paginação).
        parte: Parte da apostila (conteudo, exercicios...).
        id_capitulo: id do capítulo, se houver.

    Returns:
        HTML da seção.
    """
    atributo_capitulo = f' data-capitulo="{id_capitulo}"' if id_capitulo else ""
    corpo = "\n".join(RECUO + bloco for bloco in blocos)
    return (f'        <section class="pagina-senai fonte-paginas" data-parte="{parte}"'
            f'{atributo_capitulo}>\n{corpo}\n        </section>')


def blocos_conteudo_capitulo(capitulo, capacidades):
    """Monta os blocos de abertura, teoria, vídeos e resumo de um capítulo.

    Args:
        capitulo: Dicionário do capítulo (recebe a lista "subtitulos" para o sumário).
        capacidades: Dicionário código → texto oficial.

    Returns:
        Lista de trechos HTML.
    """
    id_cap, secoes = capitulo["id"], capitulo["secoes"]
    aula = f"AULA {html.escape(capitulo['aula'])}" if capitulo["aula"] else "CAPÍTULO"
    teoria, capitulo["subtitulos"] = numerar_subtitulos(
        converter_markdown(secoes["Teoria"]), f"{id_cap}-t", "h4")
    resumo = converter_markdown(secoes["Resumo"]).replace("<ul>", '<ul class="caixa-resumo">', 1)
    return [
        f'<div class="capitulo__abertura" id="{id_cap}" data-titulo="sim">'
        f'<span class="capitulo__rotulo">{aula}</span>'
        f'<h2>{html.escape(capitulo["titulo"])}</h2>'
        f'<p class="capitulo__capacidades">🎯 '
        f'{html_texto_capacidades(capitulo["codigos"], capacidades)}</p></div>',
        f'<h3 id="{id_cap}-teoria">📖 Teoria e exemplos</h3>',
        *[linha for linha in teoria.split("\n") if linha.strip()],
        *blocos_videos_capitulo(capitulo),
        f'<h3 id="{id_cap}-resumo">📌 Resumo</h3>',
        resumo.replace("\n", ""),
    ]


def blocos_videos_capitulo(capitulo):
    """Monta o título e as caixas dos vídeos (nada no capítulo só com teoria).

    Args:
        capitulo: Dicionário do capítulo.

    Returns:
        Lista de trechos HTML.
    """
    if capitulo["so_teoria"]:
        return []
    pendentes = [] if capitulo["videos"] else PADRAO_VIDEOS_PENDENTES.findall(
        capitulo["secoes"]["Vídeos"])
    return [f'<h3 id="{capitulo["id"]}-videos">🎬 Vídeos para assistir (até 15 min)</h3>',
            *[html_video(video) for video in capitulo["videos"]],
            *[f'<p class="caixa-video__detalhe">⏳ {html.escape(pendente)}</p>'
              for pendente in pendentes]]


def blocos_exercicios_capitulo(capitulo, capacidades):
    """Monta os blocos da parte de exercícios (sempre em páginas próprias).

    Args:
        capitulo: Dicionário do capítulo.
        capacidades: Dicionário código → texto oficial.

    Returns:
        Lista de trechos HTML.
    """
    id_cap = capitulo["id"]
    return [
        f'<h3 id="{id_cap}-exercicios">✍️ Exercícios<button class="apostila__botao '
        f'apostila__botao--pequeno" type="button" data-exportar-exercicios="{id_cap}">'
        f'📥 Exportar PDF</button></h3>',
        f'<p class="exercicios__capitulo">{html.escape(capitulo["titulo"])}</p>',
        '<div class="exercicios__identificacao"><span class="exercicios__campo">Aluno(a):</span>'
        '<span class="exercicios__campo">Turma:</span>'
        '<span class="exercicios__campo">Data:</span></div>',
        *[html_exercicio(item, capacidades) for item in capitulo["exercicios"]],
    ]


def html_capitulo(capitulo, capacidades):
    """Monta as partes de um capítulo: conteúdo e, quando houver, exercícios.

    Args:
        capitulo: Dicionário do capítulo.
        capacidades: Dicionário código → texto oficial.

    Returns:
        HTML das seções do capítulo.
    """
    conteudo = html_fonte(blocos_conteudo_capitulo(capitulo, capacidades), "conteudo",
                          capitulo["id"])
    if capitulo["so_teoria"]:
        return conteudo
    exercicios = blocos_exercicios_capitulo(capitulo, capacidades)
    return "\n\n".join([conteudo, html_fonte(exercicios, "exercicios", capitulo["id"])])


def item_sumario(alvo, texto, nivel):
    """Monta uma linha do sumário com pontilhado e número da página (preenchido pelo JS).

    Args:
        alvo: id do elemento de destino.
        texto: Texto da linha.
        nivel: 1 (parte/capítulo), 2 (seção) ou 3 (subtítulo).

    Returns:
        HTML da linha.
    """
    return (f'<a class="sumario__link sumario__link--nivel-{nivel}" href="#{alvo}">'
            f'<span class="sumario__texto">{html.escape(texto)}</span>'
            f'<span class="sumario__pontos"></span>'
            f'<span class="sumario__pagina" data-alvo="{alvo}"></span></a>')


def html_sumario(capitulos, subtitulos_introducao):
    """Monta o sumário detalhado: partes iniciais, capítulos, seções e subtítulos da teoria.

    Args:
        capitulos: Capítulos (já com "subtitulos").
        subtitulos_introducao: Lista de (id, texto) da introdução.

    Returns:
        HTML das linhas do sumário.
    """
    linhas = [item_sumario("introducao", "Introdução", 1)]
    linhas += [item_sumario(alvo, texto, 2) for alvo, texto in subtitulos_introducao]
    linhas += [item_sumario("capacidades", "Capacidades da matéria", 1),
               item_sumario("glossario", "Glossário", 1)]
    for capitulo in capitulos:
        id_cap = capitulo["id"]
        linhas.append(item_sumario(id_cap, capitulo["titulo"], 1))
        linhas.append(item_sumario(f"{id_cap}-teoria", "Teoria e exemplos", 2))
        linhas += [item_sumario(alvo, texto, 3) for alvo, texto in capitulo["subtitulos"]]
        partes = PARTES_SO_TEORIA if capitulo["so_teoria"] else PARTES_SUMARIO
        linhas += [item_sumario(f"{id_cap}-{parte}", rotulo, 2) for parte, rotulo in partes]
    return "\n".join(RECUO + linha for linha in linhas)


def ler_texto_introducao(pasta_fontes):
    """Lê a INTRODUCAO.md (obrigatória), sem o título "# Introdução".

    Args:
        pasta_fontes: Pasta das fontes da apostila (CONTEUDO ou CONTEUDO-<EDIÇÃO>).

    Returns:
        Texto Markdown da introdução.
    """
    arquivo = pasta_fontes / ARQUIVO_INTRODUCAO
    if not arquivo.is_file():
        erro(f"falta a introdução da apostila: {arquivo}")
    return PADRAO_TITULO.sub("", arquivo.read_text(encoding="utf-8"), count=1).strip()


def html_introducao(texto):
    """Converte o texto da introdução em blocos da página de introdução.

    Args:
        texto: Markdown da introdução (subtítulos "###"), sem o título.

    Returns:
        Tupla (HTML dos blocos, lista de (id, texto) dos subtítulos).
    """
    corpo, subtitulos = numerar_subtitulos(converter_markdown(texto), "introducao-t", "h3")
    blocos = ['<h2 id="introducao">Introdução</h2>']
    blocos += [linha for linha in corpo.split("\n") if linha.strip()]
    return "\n".join(RECUO + bloco for bloco in blocos), subtitulos


def html_capacidades(dados, capitulos):
    """Monta a página com todas as capacidades da matéria e a relação por capítulo.

    Args:
        dados: Dados da matéria (basicas e socioemocionais).
        capitulos: Capítulos lidos.

    Returns:
        HTML dos blocos.
    """
    blocos = ['<h2 id="capacidades">Capacidades da matéria</h2>',
              "<h3>Capacidades básicas</h3>"]
    blocos += [f'<p class="capacidade-item"><strong>{html.escape(codigo)}</strong> — '
               f"{html.escape(texto)}</p>" for codigo, texto in dados["basicas"].items()]
    if dados["socioemocionais"]:
        blocos.append("<h3>Capacidades socioemocionais</h3>")
        blocos += [f'<p class="capacidade-item"><strong>{html.escape(codigo)}</strong> — '
                   f"{html.escape(texto)}</p>"
                   for codigo, texto in dados["socioemocionais"].items()]
    linhas = "".join(f"<tr><td>{html.escape(capitulo['titulo'])}</td>"
                     f"<td>{', '.join(capitulo['codigos'])}</td></tr>" for capitulo in capitulos)
    blocos += ["<h3>Capacidades por capítulo</h3>",
               f"<table><thead><tr><th>Capítulo</th><th>Capacidades</th></tr></thead>"
               f"<tbody>{linhas}</tbody></table>"]
    return "\n".join(RECUO + bloco for bloco in blocos)


def html_glossario(capitulos):
    """Junta os termos de todos os capítulos em ordem alfabética.

    Args:
        capitulos: Lista de capítulos.

    Returns:
        HTML dos termos (um bloco por termo).
    """
    termos = [(termo, capitulo) for capitulo in capitulos for termo in capitulo["termos"]]
    termos.sort(key=lambda par: md_apostila.chave_alfabetica(par[0]["termo"]))
    return "\n".join(
        f'{RECUO}<p class="glossario__termo"><strong>{html.escape(termo["termo"])}:</strong> '
        f'{html.escape(termo["definicao"])} <a class="glossario__capitulo" '
        f'href="#{capitulo["id"]}">(cap. {capitulo["numero"]})</a></p>'
        for termo, capitulo in termos)


def caminho_relativo(destino, pasta_origem):
    """Calcula o caminho relativo com barras normais.

    Args:
        destino: Caminho de destino.
        pasta_origem: Pasta da página.

    Returns:
        Caminho relativo usando "/".
    """
    return os.path.relpath(destino, pasta_origem).replace("\\", "/")


def montar_tags_menu_apostila(pasta_materia, pasta_saida):
    """Monta as tags do menu da matéria (MENU-ATIVIDADES.js fica na pasta ATIVIDADES irmã).

    Args:
        pasta_materia: Pasta da matéria.
        pasta_saida: Pasta APOSTILA, onde a página fica.

    Returns:
        Tags do menu ou '' se a matéria não tiver menu.
    """
    dados = localizar_dados_menu(str(pasta_materia / "ATIVIDADES"))
    if not dados:
        return ""
    projeto = Path(PASTA_PROJETO)
    css = caminho_relativo(projeto / CAMINHO_CSS, pasta_saida)
    script = caminho_relativo(projeto / CAMINHO_JS, pasta_saida)
    return (f'\n    <link rel="stylesheet" href="{css}">'
            f'\n    <script src="{caminho_relativo(dados, pasta_saida)}" defer></script>'
            f'\n    <script src="{script}" defer></script>')


def montar_pagina(pasta_materia, dados, conteudo, data_hora):
    """Preenche o template da apostila.

    Args:
        pasta_materia: Pasta da matéria.
        dados: Dados da matéria.
        conteudo: Tupla (Markdown da introdução, capítulos lidos).
        data_hora: Data e hora da geração, já formatadas.

    Returns:
        HTML completo da apostila.
    """
    texto_introducao, capitulos = conteudo
    pasta_saida = pasta_materia / PASTA_APOSTILA
    assets = caminho_relativo(ASSETS, pasta_saida)
    capitulos_html = "\n\n".join(html_capitulo(capitulo, dados["todas"])
                                 for capitulo in capitulos)
    introducao, subtitulos_introducao = html_introducao(texto_introducao)
    valores = {
        "ASSETS": assets, "LOGO": f"{assets}/{CAMINHO_LOGO}",
        "TOTAL_CAPITULOS": str(len(capitulos)),
        "MENU": montar_tags_menu_apostila(pasta_materia, pasta_saida),
        "SUMARIO": html_sumario(capitulos, subtitulos_introducao),
        "INTRODUCAO": introducao, "CAPACIDADES": html_capacidades(dados, capitulos),
        "GLOSSARIO": html_glossario(capitulos), "CAPITULOS": capitulos_html,
        "GERADO_EM": html.escape(data_hora),
    }
    valores.update({campo.upper(): html.escape(dados[campo]) for campo in CAMPOS_DADOS})
    pagina = TEMPLATE
    for chave, valor in valores.items():
        pagina = pagina.replace("{{" + chave + "}}", valor)
    return inserir_header_em_html(pagina, str(pasta_saida))


def caminho_markdown_completo(pasta_materia, edicao=""):
    """Caminho do Markdown completo da apostila da matéria.

    Args:
        pasta_materia: Pasta da matéria.
        edicao: Nome da edição ou "".

    Returns:
        Caminho de <MATERIA>/APOSTILA/APOSTILA-<MATERIA>[-<EDIÇÃO>].md.
    """
    return edicoes.caminho_apostila(pasta_materia, edicao, ".md")


def conferir_com_ementa(pasta_materia, edicao=""):
    """Roda a conferência obrigatória do Markdown completo com a ementa da matéria.

    Args:
        pasta_materia: Pasta da matéria.
        edicao: Nome da edição ou "".

    Returns:
        True se o Markdown completo bate 100% com a ementa.
    """
    return conferir_ementa.conferir_materia(
        pasta_materia, caminho_markdown_completo(pasta_materia, edicao))


def gravar_identificacao_markdown(caminho, dados, data_hora):
    """Atualiza autor, versão e data e hora no Markdown completo, igual ao HTML gerado.

    Args:
        caminho: Caminho do Markdown completo.
        dados: Dados da matéria.
        data_hora: Data e hora da geração, já formatadas.
    """
    texto = caminho.read_text(encoding="utf-8")
    caminho.write_text(md_apostila.atualizar_identificacao(texto, dados, data_hora),
                       encoding="utf-8")


def gerar_apostila(pasta_materia, edicao=""):
    """Gera a apostila HTML a partir do Markdown completo, só com a conferência em 100%.

    Args:
        pasta_materia: Pasta da matéria.
        edicao: Nome da edição (ex.: "V2") ou "" para a apostila normal.

    Returns:
        Caminho do HTML gerado.

    Raises:
        SystemExit: Se o Markdown completo não bater 100% com a ementa da matéria.
    """
    if not conferir_com_ementa(pasta_materia, edicao):
        erro("o Markdown completo não bate 100% com a ementa da matéria: corrija o que falta "
             "antes de gerar a apostila (regra CONFERÊNCIA OBRIGATÓRIA)")
    dados = ler_dados_materia(pasta_materia, edicao)
    markdown_completo = caminho_markdown_completo(pasta_materia, edicao)
    introducao, capitulos = ler_markdown_completo(markdown_completo, dados)
    data_hora = md_apostila.agora_formatado()
    gravar_identificacao_markdown(markdown_completo, dados, data_hora)
    saida = edicoes.caminho_apostila(pasta_materia, edicao, ".html")
    saida.write_text(montar_pagina(pasta_materia, dados, (introducao, capitulos), data_hora),
                     encoding="utf-8")
    for capitulo in capitulos:
        print(f"✅ {capitulo['titulo']}: {len(capitulo['videos'])} vídeo(s), "
              f"{len(capitulo['exercicios'])} exercício(s), {len(capitulo['termos'])} termo(s)")
    return saida


def divergencias_capitulo(capitulo, plano, glossario):
    """Compara um capítulo com o plano da ementa (tema, capacidades e glossário oficial).

    Args:
        capitulo: Capítulo lido do CAPITULO-NN.md.
        plano: Entrada da aula em "aulas" do materia.json.
        glossario: Glossário oficial da ementa (termo → definição).

    Returns:
        Lista de avisos (vazia se o capítulo cobre o que a ementa pede).
    """
    avisos = []
    if plano["tema"].casefold() not in capitulo["titulo"].casefold():
        avisos.append(f'tema diferente do plano ("{plano["tema"]}")')
    if set(plano.get("capacidades", [])) != set(capitulo["codigos"]):
        avisos.append(f"capacidades {', '.join(capitulo['codigos'])} ≠ plano "
                      f"{', '.join(plano.get('capacidades', []))}")
    termos = {termo["termo"].casefold(): termo["definicao"] for termo in capitulo["termos"]}
    faltando = [termo for termo in plano.get(CAMPO_TERMOS_EMENTA, [])
                if termo.casefold() not in termos]
    if faltando:
        avisos.append(f"glossário sem os termos da ementa: {', '.join(faltando)}")
    diferentes = [termo for termo in plano.get(CAMPO_TERMOS_EMENTA, [])
                  if termo.casefold() in termos and conferir_ementa.normalizar(
                      termos[termo.casefold()]) != conferir_ementa.normalizar(
                      glossario.get(termo, ""))]
    if diferentes:
        avisos.append(f"definição diferente da ementa: {', '.join(diferentes)}")
    return avisos


def conferir_cobertura_ementa(dados, capitulos):
    """Avisa quando um capítulo não cobre o que o plano da ementa (materia.json) pede.

    Args:
        dados: Dados da matéria (com "plano_capitulos").
        capitulos: Capítulos lidos.

    Returns:
        Quantidade de avisos emitidos.
    """
    plano_por_numero = {f"{int(item['numero']):02d}": item for item in dados["plano_capitulos"]}
    glossario = {termo["termo"]: termo["definicao"]
                 for termo in dados["materia"].get("glossario_ementa", [])}
    total = 0
    for capitulo in capitulos:
        plano = plano_por_numero.get(capitulo["numero"])
        avisos = ["não existe no plano de capítulos"] if plano is None else \
            divergencias_capitulo(capitulo, plano, glossario)
        for aviso in avisos:
            print(f"⚠️ Capítulo {capitulo['numero']}: {aviso}")
        total += len(avisos)
    return total


def ler_fontes_capitulos(pasta_fontes, dados, obrigatorio=True):
    """Lê e valida todos os CAPITULO-NN.md da matéria.

    Args:
        pasta_fontes: Pasta das fontes (CONTEUDO ou CONTEUDO-<EDIÇÃO>).
        dados: Dados da matéria.
        obrigatorio: Se True (HTML), exige ao menos um capítulo; o Markdown completo pode ser
            montado antes do primeiro capítulo, para a conferência com a ementa.

    Returns:
        Lista de capítulos em ordem.
    """
    fontes = sorted(pasta_fontes.glob(PADRAO_FONTES))
    if not fontes and obrigatorio:
        erro(f"nenhum {PADRAO_FONTES} em {pasta_fontes}")
    if not fontes:
        print(f"ℹ️ Nenhum capítulo ainda em {pasta_fontes}: Markdown só com as partes iniciais")
        return []
    capitulos = [ler_capitulo(fonte, dados["todas"]) for fonte in fontes]
    validar_so_teoria(capitulos, dados)
    if dados["plano_capitulos"]:
        conferir_cobertura_ementa(dados, capitulos)
    return capitulos


def gerar_markdown_completo(pasta_materia, forcar, edicao=""):
    """Gera (ou completa) o Markdown completo <MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md.

    Sem --forcar, um arquivo existente não é refeito: só recebe os capítulos novos, para não
    perder o que o usuário acrescentou.

    Args:
        pasta_materia: Pasta da matéria.
        forcar: True para refazer o arquivo do zero a partir dos capítulos.
        edicao: Nome da edição (ex.: "V2") ou "" para a apostila normal.

    Returns:
        Caminho do Markdown completo.
    """
    dados = ler_dados_materia(pasta_materia, edicao)
    validar_plano_capitulos(dados)
    pasta_fontes = edicoes.pasta_fontes(pasta_materia, edicao)
    capitulos = ler_fontes_capitulos(pasta_fontes, dados, obrigatorio=False)
    saida = caminho_markdown_completo(pasta_materia, edicao)
    if forcar or not saida.is_file():
        texto = md_apostila.montar_markdown_completo(
            dados, ler_texto_introducao(pasta_fontes), capitulos)
        print(f"📝 Markdown completo montado com {len(capitulos)} capítulo(s)")
    else:
        texto = saida.read_text(encoding="utf-8")
        presentes = md_apostila.capitulos_no_markdown(texto)
        novos = [capitulo for capitulo in capitulos if capitulo["numero"] not in presentes]
        texto = md_apostila.acrescentar_capitulos(texto, novos, dados)
        print(f"📝 Markdown existente preservado; capítulos acrescentados: {len(novos)}")
    saida.write_text(texto, encoding="utf-8")
    return saida


def main():
    """Lê a pasta da matéria e as opções da linha de comando e gera o Markdown ou o HTML.

    Uso: gerar_apostila.py <pasta da matéria> [--markdown [--forcar] | --conferir]
    [--edicao=V2]
    """
    sys.stdout.reconfigure(encoding="utf-8")
    argumentos = [argumento for argumento in sys.argv[1:] if not argumento.startswith("--")]
    opcoes = {argumento for argumento in sys.argv[1:] if argumento.startswith("--")}
    if len(argumentos) != 1:
        erro("uso: gerar_apostila.py <pasta da matéria> [--markdown [--forcar] | --conferir] "
             "[--edicao=V2]")
    pasta_materia = Path(argumentos[0]).resolve()
    if not pasta_materia.is_dir():
        erro(f"pasta não encontrada: {pasta_materia}")
    edicao = edicoes.ler_opcao_edicao(opcoes)
    if OPCAO_CONFERIR in opcoes:
        sys.exit(0 if conferir_com_ementa(pasta_materia, edicao) else 1)
    if OPCAO_MARKDOWN in opcoes:
        caminho = gerar_markdown_completo(pasta_materia, OPCAO_FORCAR in opcoes, edicao)
        print(f"📘 Markdown completo: {caminho}")
        conferir_com_ementa(pasta_materia, edicao)
        return
    print(f"📘 Apostila gerada: {gerar_apostila(pasta_materia, edicao)}")


if __name__ == "__main__":
    main()
