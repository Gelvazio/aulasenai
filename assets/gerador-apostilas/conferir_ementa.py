"""Confere se o Markdown completo da apostila bate 100% com a ementa da matéria.

Uso pelo gerador: gerar_apostila.py <pasta da matéria> --conferir (também roda depois do
--markdown e, obrigatoriamente, antes do HTML, que fica bloqueado se não bater 100%).

Lê <MATERIA>/EMENTA-CHALKIE-AI.md pela estrutura (tabelas, listas e campos em negrito), sem textos
fixos de matéria, e procura cada item, literalmente, em <MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md.
Aceita as variações de formato das ementas (ex.: "**S1 Nome** texto" ou "**S1** — texto";
conhecimentos "**Título:** a; b" ou "**Título** — 1.1 a · 1.2 b"; tabela de sequência lida pelos
títulos das colunas). Seção da ementa que existe mas não foi reconhecida REPROVA a conferência.
Comparação sem diferenciar maiúsculas, sem marcação Markdown (**, _, `) e com travessões
normalizados. Fora da conferência: materiais da pasta, plataforma, checklist, status e notas.
Regra: CLAUDE.md → REGRAS APOSTILAS → "CONFERÊNCIA OBRIGATÓRIA".
"""
import re
from pathlib import Path

ARQUIVO_EMENTA = "EMENTA-CHALKIE-AI.md"
PADRAO_TITULO = re.compile(r"^(#{2,3})\s+(.+?)\s*$")
PADRAO_FAIXA_CAPACIDADES = re.compile(r"([A-Z])(\d+)\s*[–-]\s*[A-Z](\d+)")
PADRAO_CAMPO_LINHA = re.compile(r"^\*\*(.+?):\*\*\s*(.+?)\s*$")
TAMANHO_MINIMO_CELULA = 25
ROTULOS_FORA_RECURSOS = ("materiais da pasta", "acessibilidade", "referências")
ROTULOS_TRATADOS_SEQUENCIA = ("aula padrão", "marcos")
INICIOS_TRATADOS_AVALIACAO = ("**formativa", "**recuperação")
SECOES_OBRIGATORIAS = (
    ("Capacidades básicas", "Capacidades básicas"),
    ("socioemocionais", "Capacidades socioemocionais"),
    ("Indicadores", "Indicadores"),
    ("CONHECIMENTOS", "Conhecimentos"),
    ("CONTEÚDOS PROGRAMÁTICOS", "Conteúdos programáticos"),
    ("SEQUÊNCIA", "Sequência de aulas"),
    ("AVALIAÇÃO", "Avaliação"),
    ("BNCC", "BNCC"),
    ("RECURSOS", "Recursos"),
    ("PROMPTS", "Ideias (prompts)"),
    ("REGRAS PARA IA", "Regras para IA"),
    ("GLOSSÁRIO", "Glossário oficial"),
)


def normalizar(texto):
    """Prepara o texto para comparação literal tolerante à marcação Markdown.

    Args:
        texto: Texto a normalizar.

    Returns:
        Texto sem **, _ e `, com travessões trocados por hífen, espaços únicos, sem ponto final e
        em minúsculas.
    """
    texto = re.sub(r"[*_`]", "", texto).replace("–", "-").replace("—", "-")
    return re.sub(r"\s+", " ", texto).strip().rstrip(".").casefold()


def secao(ementa, palavra, excluir=None):
    """Devolve o texto da seção cujo título (## ou ###) contém a palavra indicada.

    Args:
        ementa: Texto da ementa.
        palavra: Trecho do título procurado (sem diferenciar maiúsculas).
        excluir: Trecho que, se estiver no título, faz a seção ser ignorada.

    Returns:
        Texto da seção (até o próximo título de mesmo nível ou superior) ou '' se não existir.
    """
    linhas = ementa.splitlines()
    for indice, linha in enumerate(linhas):
        achado = PADRAO_TITULO.match(linha)
        titulo = achado.group(2).casefold() if achado else ""
        if not achado or palavra.casefold() not in titulo:
            continue
        if excluir and excluir.casefold() in titulo:
            continue
        nivel = len(achado.group(1))
        fim = next((j for j in range(indice + 1, len(linhas))
                    if (outro := PADRAO_TITULO.match(linhas[j])) and len(outro.group(1)) <= nivel),
                   len(linhas))
        return "\n".join(linhas[indice + 1: fim])
    return ""


def secoes(ementa, palavra):
    """Devolve o texto de todas as seções (## ou ###) cujo título contém a palavra indicada.

    Args:
        ementa: Texto da ementa.
        palavra: Trecho do título procurado (sem diferenciar maiúsculas).

    Returns:
        Lista com o texto de cada seção encontrada.
    """
    linhas, resultado = ementa.splitlines(), []
    for indice, linha in enumerate(linhas):
        achado = PADRAO_TITULO.match(linha)
        if not achado or palavra.casefold() not in achado.group(2).casefold():
            continue
        nivel = len(achado.group(1))
        fim = next((j for j in range(indice + 1, len(linhas))
                    if (outro := PADRAO_TITULO.match(linhas[j])) and len(outro.group(1)) <= nivel),
                   len(linhas))
        resultado.append("\n".join(linhas[indice + 1: fim]))
    return resultado


def campo(texto, rotulo):
    """Lê o valor de uma linha "**Rótulo:** valor".

    Args:
        texto: Texto onde procurar.
        rotulo: Expressão regular do rótulo (sem os asteriscos e os dois-pontos).

    Returns:
        Valor do campo ou '' se não existir.
    """
    achado = re.search(rf"^\*\*{rotulo}:\*\*\s*(.+?)\s*$", texto, re.M)
    return achado.group(1) if achado else ""


def expandir_capacidades(texto):
    """Expande faixas como "C1–C5" em "C1, C2, C3, C4, C5".

    Args:
        texto: Lista de capacidades da ementa.

    Returns:
        Texto com as faixas expandidas.
    """
    def expandir(achado):
        letra, inicio, fim = achado.group(1), int(achado.group(2)), int(achado.group(3))
        return ", ".join(f"{letra}{numero}" for numero in range(inicio, fim + 1))
    return PADRAO_FAIXA_CAPACIDADES.sub(expandir, texto)


def celulas(linha):
    """Separa as células de uma linha de tabela Markdown.

    Args:
        linha: Linha "| a | b |".

    Returns:
        Lista de células sem espaços nas pontas.
    """
    return [celula.strip() for celula in linha.strip().strip("|").split("|")]


def tabelas(texto):
    """Lê as tabelas Markdown de um trecho.

    Args:
        texto: Trecho com tabelas.

    Returns:
        Lista de tabelas, cada uma como (cabeçalho, linhas de dados).
    """
    resultado, atual = [], []
    for linha in texto.splitlines() + [""]:
        if linha.strip().startswith("|"):
            atual.append(celulas(linha))
            continue
        if len(atual) >= 2:
            resultado.append((atual[0], [l for l in atual[2:]]))
        atual = []
    return resultado


def itens_identificacao(ementa):
    """Itens de identificação da UC (nome, módulo, carga horária, modalidade e função).

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = []
    uc = campo(ementa, "Unidade curricular")
    if uc:
        itens.append(("Identificação", f"UC: {uc}", uc))
    modulo = re.search(r"\*\*Módulo:\*\*\s*(.+?)\s*\|", ementa)
    if modulo:
        itens.append(("Identificação", f"Módulo: {modulo.group(1)}", modulo.group(1)))
    carga = re.search(r"\*\*Carga horária:\*\*\s*(\d+)\s*h", ementa, re.I)
    if carga:
        itens.append(("Identificação", f"Carga horária: {carga.group(1)} h",
                      f"{carga.group(1)} horas"))
    modalidade = re.search(r"\*\*Modalidade:\*\*\s*([^|\n]+?)\s*(?:\||$)", ementa, re.M)
    if modalidade:
        itens.append(("Identificação", f"Modalidade: {modalidade.group(1)}", modalidade.group(1)))
    itens += [("Função", linha.strip(), linha.strip())
              for linha in secao(ementa, "Função").splitlines() if linha.strip()]
    return itens


def itens_objetivos(ementa):
    """Itens da justificativa, do objetivo geral e da competência integradora.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = []
    justificativa = " ".join(linha for linha in secao(ementa, "Justificativa").splitlines()
                             if linha.strip())
    if justificativa:
        itens.append(("Justificativa", justificativa[:60] + "…", justificativa))
    objetivo = secao(ementa, "Objetivo geral")
    for linha in objetivo.splitlines():
        if linha.strip() and not re.match(r"^\d\.", linha):
            itens.append(("Objetivo geral", linha.strip()[:60], linha.strip().rstrip(":")))
    for nome, texto in re.findall(r"^\d\. \*\*(.+?)\*\* — (.+)$", objetivo, re.M):
        itens.append(("Objetivo geral", f"{nome} — {texto}", f"{nome} — {texto}"))
    for rotulo in ("Eixo", "Competência"):
        valor = campo(ementa, rotulo)
        if valor:
            itens.append(("Competência integradora", f"{rotulo}: {valor}", valor))
    for resultado in campo(ementa, "Resultados").rstrip(".").split(";"):
        if resultado.strip():
            itens.append(("Competência integradora", resultado.strip(), resultado.strip()))
    return itens


def itens_capacidades(ementa):
    """Itens das capacidades básicas, socioemocionais e indicadores de desempenho.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = [("Capacidades básicas", f"{codigo}: {texto}", f"{codigo}: {texto}")
             for codigo, texto in re.findall(r"^\| \*\*([A-Z]\d+)\*\* \| (.+?) \|$", ementa, re.M)]
    for linha in re.findall(r"^- \*\*(S\d+.*)$", ementa, re.M):
        achado = (re.match(r"(S\d+)\*\*\s*—\s*(.+)$", linha)
                  or re.match(r"(S\d+) (.+?)\*\*\s*(.+)$", linha))
        if achado:
            texto = " ".join(achado.groups()[1:])
            itens.append(("Capacidades socioemocionais", f"{achado.group(1)} {texto}"[:70],
                          f"{achado.group(1)}: {texto}"))
    if not itens:
        itens += [("Capacidades (lista)", texto[:70], texto.strip())
                  for texto in re.findall(r"^\d+\. (?!\*)(.+)$", secao(ementa, "Capacidades"),
                                          re.M)]
    indicadores = []
    for cabecalho, linhas in tabelas(secao(ementa, "Indicadores de desempenho")):
        indicadores += [("Indicadores", f"{linha[0]}. {linha[1]}", linha[1])
                        for linha in linhas if len(linha) >= 2 and linha[0].isdigit()]
    if not indicadores:
        indicadores = [("Indicadores", f"{nome}: {texto}"[:70], f"{nome}: {texto}")
                       for trecho in secoes(ementa, "Indicadores")
                       for nome, texto in re.findall(r"^- \*\*(.+?):\*\*\s*(.+?)\s*$",
                                                     trecho, re.M)]
    return itens + indicadores


def itens_conteudos_programaticos(ementa):
    """Itens dos conteúdos programáticos em módulos ("### Módulo N: Título" + lista de tópicos).

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = []
    for linha in secao(ementa, "CONTEÚDOS PROGRAMÁTICOS").splitlines():
        linha = linha.strip()
        if linha.startswith("### "):
            itens.append(("Conteúdos programáticos", linha[4:], linha[4:]))
        elif linha.startswith("- "):
            itens.append(("Conteúdos programáticos", linha[2:62], linha[2:]))
    return itens


def itens_conhecimentos(ementa):
    """Itens dos conhecimentos (título e cada conteúdo, literais) e do detalhamento didático.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    texto = secao(ementa, "CONHECIMENTOS", excluir="×")
    itens = []
    for numero, resto in re.findall(r"^(\d+)\. \*\*(.+)$", texto, re.M):
        achado = (re.match(r"(.+?):\*\*\s*(.+)$", resto)
                  or re.match(r"(.+?)\*\*\s*—\s*(.+)$", resto))
        if not achado:
            continue
        titulo, conteudos = achado.groups()
        separador = "·" if "·" in conteudos else ";"
        itens.append(("Conhecimentos", f"{numero}. {titulo}", f"{numero}. {titulo}"))
        itens += [("Conhecimentos", f"{numero}. {parte.strip()}", parte.strip())
                  for parte in conteudos.rstrip(".").split(separador) if parte.strip()]
    detalhamento = campo(texto or ementa, "Detalhamento didático")
    itens += [("Detalhamento didático", parte.strip(), parte.strip())
              for parte in detalhamento.rstrip(".").split(";") if "=" in parte]
    return itens


def siglas_estrategias(texto):
    """Lê a legenda de estratégias ("**ED** exposição dialogada · ...").

    Args:
        texto: Seção da sequência de aulas.

    Returns:
        Dicionário sigla → nome.
    """
    legenda = next((linha for linha in texto.splitlines() if "Estratégias:" in linha), "")
    return {sigla: nome.strip().rstrip(".")
            for sigla, nome in re.findall(r"\*\*(\w+)\*\*\s*([^·*]+)", legenda)}


def coluna(cabecalho, *nomes):
    """Encontra o índice da coluna cujo título contém um dos nomes.

    Args:
        cabecalho: Células do cabeçalho.
        nomes: Trechos possíveis do título.

    Returns:
        Índice da coluna ou None.
    """
    return next((i for i, titulo in enumerate(cabecalho)
                 if any(nome.casefold() in titulo.casefold() for nome in nomes)), None)


def itens_linha_sequencia(cabecalho, linha, siglas):
    """Itens de uma linha da tabela de sequência de aulas, lida pelos títulos das colunas.

    Args:
        cabecalho: Células do cabeçalho.
        linha: Células da linha.
        siglas: Legenda das estratégias.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    rotulo = f"Aula {int(linha[0]):02d}"
    valor = lambda *nomes: linha[i] if (i := coluna(cabecalho, *nomes)) is not None else ""
    itens = [("Sequência de aulas", f"{rotulo}: tema", f"{rotulo} — {valor('Tema')}")]
    if valor("Dom", "Conhecimentos"):
        itens.append(("Sequência de aulas", f"{rotulo}: domínios",
                      f"Domínios: {valor('Dom', 'Conhecimentos')}"))
    if valor("Cap"):
        itens.append(("Sequência de aulas", f"{rotulo}: capacidades",
                      f"Capacidades: {expandir_capacidades(valor('Cap'))}"))
    if valor("Atividade", "Entrega"):
        itens.append(("Sequência de aulas", f"{rotulo}: atividade", valor("Atividade", "Entrega")))
    itens += [("Sequência de aulas", f"{rotulo}: estratégia {sigla.strip()}",
               siglas.get(sigla.strip(), sigla.strip()))
              for sigla in valor("Estratégias").split(",") if sigla.strip()]
    return itens


def itens_textos_sequencia(texto):
    """Itens livres da seção de sequência: listas, parágrafos e campos em negrito.

    Args:
        texto: Seção da sequência de aulas.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = []
    for linha in (linha.strip() for linha in texto.splitlines()):
        campo_linha = PADRAO_CAMPO_LINHA.match(linha)
        if linha.startswith("- "):
            itens.append(("Sequência (textos)", linha[2:62], linha[2:]))
        elif campo_linha and not campo_linha.group(1).casefold().startswith(
                ROTULOS_TRATADOS_SEQUENCIA):
            itens.append(("Sequência (textos)", linha[:60], campo_linha.group(2)))
        elif linha and not linha.startswith(("|", "#", "**", "Estratégias:")) and \
                not re.match(r"^\d+\.", linha):
            itens.append(("Sequência (textos)", linha[:60], linha))
    return itens


def itens_sequencia(ementa):
    """Itens da sequência de aulas (tabela, listas e textos livres da seção).

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    texto = secao(ementa, "SEQUÊNCIA")
    siglas = siglas_estrategias(texto)
    itens = []
    for cabecalho, linhas in tabelas(texto):
        if coluna(cabecalho, "Tema") is None:
            continue
        itens += [item for linha in linhas if linha and linha[0].isdigit()
                  for item in itens_linha_sequencia(cabecalho, linha, siglas)]
    itens += [("Sequência de aulas", f"Aula {int(numero):02d}: tema",
               f"Aula {int(numero):02d} — {tema}") for numero, tema in
              re.findall(r"^\*\*Aula (\d+) — (.+?)(?: \(\d+ ?h\))?\*\*\s*$", texto, re.M)]
    return itens + itens_textos_sequencia(texto)


def itens_aula_e_situacoes(ementa):
    """Itens da aula padrão, dos marcos e das situações-problema numeradas.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    aula_padrao = campo(ementa, r"Aula padrão \(4h\)")
    itens = [("Aula padrão", etapa.strip().rstrip("."), etapa.strip().rstrip("."))
             for etapa in aula_padrao.split("→") if etapa.strip()]
    for marco in campo(ementa, "Marcos").split("·"):
        achado = re.match(r"\s*aula (\d+)\s*—\s*(.+)", marco.strip().rstrip("."), re.I)
        if achado:
            itens.append(("Marcos", marco.strip(), f"Aula {achado.group(1)} — {achado.group(2)}"))
    situacoes = secao(ementa, "Situações-problema")
    itens += [("Situações-problema", f"{numero}. {texto}", texto)
              for numero, texto in re.findall(r"^(\d+)\. (.+)$", situacoes, re.M)]
    itens += [("Situações-problema", texto[:70], texto)
              for texto in re.findall(r"^- (.+)$", situacoes, re.M)]
    return itens


def itens_avaliacao(ementa):
    """Itens da avaliação (instrumentos, critérios, textos, formativa, recuperação e rubrica).

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    texto = secao(ementa, "AVALIAÇÃO")
    itens = []
    for cabecalho, linhas in tabelas(texto):
        if coluna(cabecalho, "Nível") is not None:
            itens += [("Rubrica", f"{linha[0]}: {linha[-1]}"[:70], linha[-1]) for linha in linhas]
            continue
        for linha in linhas:
            nome = linha[0].replace("↳", "").replace("*", "").strip()
            itens.append(("Avaliação", nome[:70], nome))
            itens += [("Avaliação", celula[:70], celula) for celula in linha[1:]
                      if len(celula) >= TAMANHO_MINIMO_CELULA]
    for rotulo in (r"Formativa \(.+?\)", r"Recuperação \(.+?\)"):
        valor = campo(texto, rotulo)
        if valor:
            itens.append(("Avaliação", valor[:60] + "…", valor))
    for linha in (linha.strip() for linha in texto.splitlines()):
        livre = linha and not linha.startswith(("|", "#")) and \
            not linha.casefold().startswith(INICIOS_TRATADOS_AVALIACAO)
        if livre:
            itens.append(("Avaliação", linha[:60] + "…", linha))
    return itens


def partes_lista(valor):
    """Separa os itens de uma lista em texto corrido (";" se houver, senão ",").

    Args:
        valor: Texto da lista.

    Returns:
        Itens sem espaços nas pontas e sem ponto final.
    """
    separador = ";" if ";" in valor else ","
    return [parte.strip().rstrip(".") for parte in valor.rstrip(".").split(separador)
            if parte.strip()]


def itens_recursos(ementa):
    """Itens de BNCC, recursos (item a item), acessibilidade, referências e métricas.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = [("BNCC", f"{cg} — {foco}"[:70], f"{cg}") for cg, aulas, foco in
             re.findall(r"^- \*\*(CG\d+ .+?)\*\* — (.+?): (.+)$", ementa, re.M)]
    itens += [("BNCC", foco[:70], foco) for cg, aulas, foco in
              re.findall(r"^- \*\*(CG\d+ .+?)\*\* — (.+?): (.+)$", ementa, re.M)]
    for linha in secao(ementa, "RECURSOS").splitlines():
        achado = PADRAO_CAMPO_LINHA.match(linha.strip())
        if not achado or achado.group(1).casefold().startswith(ROTULOS_FORA_RECURSOS):
            continue
        itens += [("Recursos", parte, parte) for parte in partes_lista(achado.group(2))]
    acessibilidade = campo(ementa, r"Acessibilidade \[?\(?.+?[\]\)]")
    for trecho in re.split(r"\*\*[^*]+:\*\*", acessibilidade):
        partes = trecho.split(" · ") if " · " in trecho else [trecho]
        if len(partes) > 1 and ". " in partes[-1]:
            partes = partes[:-1] + partes[-1].split(". ", 1)
        itens += [("Acessibilidade", parte.strip()[:60], parte.strip().replace(" — ", ": ", 1))
                  for parte in partes if parte.strip()]
    for rotulo, grupo in (("Referências", "Referências"), ("Métricas", "Métricas")):
        itens += [(grupo, parte.strip(), parte.strip().rstrip("."))
                  for parte in campo(ementa, rotulo).split("·") if parte.strip()]
    return itens


def itens_listas(ementa):
    """Itens dos prompts (ideias), regras para IA, capacidades × conhecimentos e glossário.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = [("Ideias (prompts)", texto[:60] + "…", texto)
             for texto in re.findall(r'^\d+\. \*"(.+)"\*\s*$', secao(ementa, "PROMPTS"), re.M)]
    itens += [("Regras para IA", regra[:70], regra)
              for regra in re.findall(r"^\d+\. (.+)$", secao(ementa, "REGRAS PARA IA"), re.M)]
    relacao = next((linha for linha in secao(ementa, "×").splitlines() if "→" in linha), "")
    itens += [("Capacidades × conhecimentos", parte.strip(), parte.strip().rstrip("."))
              for parte in relacao.split("·") if parte.strip()]
    glossario = secao(ementa, "GLOSSÁRIO")
    itens += [("Glossário oficial", f"{termo} — {definicao}"[:70], f"{termo}: {definicao}")
              for termo, definicao in re.findall(r"\*\*(.+?)\*\* — (.+?)(?= · |\n|$)", glossario)]
    return itens


EXTRATORES = (itens_identificacao, itens_objetivos, itens_capacidades, itens_conhecimentos,
              itens_conteudos_programaticos,
              itens_sequencia, itens_aula_e_situacoes, itens_avaliacao, itens_recursos,
              itens_listas)


def secoes_nao_reconhecidas(ementa, itens):
    """Aponta seções que existem na ementa mas das quais nenhum item foi lido.

    Args:
        ementa: Texto da ementa.
        itens: Itens extraídos.

    Returns:
        Lista de tuplas (grupo, descrição, encontrado=False) para reprovar a conferência.
    """
    grupos = {grupo for grupo, _, _ in itens}
    return [(grupo, f"seção '{palavra}' existe na ementa mas não foi reconhecida", False)
            for palavra, grupo in SECOES_OBRIGATORIAS
            if secao(ementa, palavra, excluir="×").strip() and grupo not in grupos]


def conferir_textos(ementa, markdown_completo):
    """Confere todos os itens da ementa no Markdown completo.

    Args:
        ementa: Texto da ementa da matéria.
        markdown_completo: Texto do Markdown completo da apostila.

    Returns:
        Lista de tuplas (grupo, descrição, encontrado).
    """
    alvo = normalizar(markdown_completo)
    itens = [item for extrator in EXTRATORES for item in extrator(ementa)]
    resultados = [(grupo, descricao, normalizar(procurado) in alvo)
                  for grupo, descricao, procurado in itens]
    return resultados + secoes_nao_reconhecidas(ementa, itens)


def imprimir_relatorio(resultados):
    """Imprime o resultado da conferência agrupado e diz se bateu 100%.

    Args:
        resultados: Lista de tuplas (grupo, descrição, encontrado).

    Returns:
        True se todos os itens foram encontrados.
    """
    encontrados = sum(ok for _, _, ok in resultados)
    print(f"🔎 Conferência com a ementa: {encontrados}/{len(resultados)} itens "
          f"({100 * encontrados // max(len(resultados), 1)}%)")
    grupos = {}
    for grupo, descricao, ok in resultados:
        grupos.setdefault(grupo, []).append((descricao, ok))
    for grupo, itens in grupos.items():
        faltando = [descricao for descricao, ok in itens if not ok]
        marca = "✅" if not faltando else "❌"
        print(f"   {marca} {grupo}: {len(itens) - len(faltando)}/{len(itens)}")
        for descricao in faltando:
            print(f"      falta: {descricao}")
    return encontrados == len(resultados) and bool(resultados)


def conferir_materia(pasta_materia, caminho_markdown):
    """Confere o Markdown completo da matéria com a ementa dela e imprime o relatório.

    Args:
        pasta_materia: Pasta da matéria (onde fica o EMENTA-CHALKIE-AI.md).
        caminho_markdown: Caminho do Markdown completo da apostila.

    Returns:
        True se bateu 100%.

    Raises:
        SystemExit: Se faltar a ementa ou o Markdown completo.
    """
    ementa = Path(pasta_materia) / ARQUIVO_EMENTA
    if not ementa.is_file():
        raise SystemExit(f"❌ falta a ementa da matéria: {ementa}")
    if not Path(caminho_markdown).is_file():
        raise SystemExit(f"❌ falta o Markdown completo: {caminho_markdown} "
                         "(gere com --markdown antes de conferir)")
    resultados = conferir_textos(ementa.read_text(encoding="utf-8"),
                                 Path(caminho_markdown).read_text(encoding="utf-8"))
    return imprimir_relatorio(resultados)
