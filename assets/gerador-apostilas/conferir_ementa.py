"""Confere se o Markdown completo da apostila bate 100% com a ementa da matéria.

Uso pelo gerador: gerar_apostila.py <pasta da matéria> --conferir (também roda depois do
--markdown e, obrigatoriamente, antes do HTML, que fica bloqueado se não bater 100%).

Lê <MATERIA>/EMENTA-CHALKIE-AI.md pela estrutura (tabelas, listas numeradas e campos em negrito),
sem textos fixos de matéria, e procura cada item, literalmente, em
<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md. Comparação sem diferenciar maiúsculas, sem marcação
Markdown (**, _, `) e com travessões normalizados.
Fora da conferência (não são conteúdo da apostila): materiais da pasta, plataforma, checklist,
status e notas de proveniência da ementa.
Regra: CLAUDE.md → REGRAS APOSTILAS → "CONFERÊNCIA OBRIGATÓRIA".
"""
import re
from pathlib import Path

ARQUIVO_EMENTA = "EMENTA-CHALKIE-AI.md"
PADRAO_TITULO = re.compile(r"^(#{2,3})\s+(.+?)\s*$")
PADRAO_FAIXA_CAPACIDADES = re.compile(r"([A-Z])(\d+)\s*[–-]\s*[A-Z](\d+)")


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


def campo(ementa, rotulo):
    """Lê o valor de uma linha "**Rótulo:** valor" da ementa.

    Args:
        ementa: Texto da ementa.
        rotulo: Expressão regular do rótulo (sem os asteriscos e os dois-pontos).

    Returns:
        Valor do campo ou '' se não existir.
    """
    achado = re.search(rf"^\*\*{rotulo}:\*\*\s*(.+?)\s*$", ementa, re.M)
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


def itens_identificacao(ementa):
    """Itens de identificação da UC (nome, módulo, carga horária e modalidade).

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
    carga = re.search(r"\*\*Carga horária:\*\*\s*(\d+)\s*h", ementa)
    if carga:
        itens.append(("Identificação", f"Carga horária: {carga.group(1)} h",
                      f"{carga.group(1)} horas"))
    modalidade = re.search(r"\*\*Modalidade:\*\*\s*([^|\n]+?)\s*(?:\||$)", ementa, re.M)
    if modalidade:
        itens.append(("Identificação", f"Modalidade: {modalidade.group(1)}", modalidade.group(1)))
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
            itens.append(("Objetivo geral", linha.strip(), linha.strip().rstrip(":")))
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
    itens += [("Capacidades socioemocionais", f"{codigo} {nome} {resto}",
               f"{codigo}: {nome} {resto}")
              for codigo, nome, resto in re.findall(r"^- \*\*(S\d+) (.+?)\*\*\s*(.+)$",
                                                    ementa, re.M)]
    indicadores = secao(ementa, "Indicadores de desempenho")
    itens += [("Indicadores", f"{numero}. {texto}", texto)
              for numero, texto in re.findall(r"^\| (\d+) \| (.+?) \| .+? \| \d+ \|$",
                                              indicadores, re.M)]
    return itens


def itens_conhecimentos(ementa):
    """Itens dos conhecimentos (domínio completo, literal) e do detalhamento didático.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    texto = secao(ementa, "CONHECIMENTOS", excluir="×")
    itens = [("Conhecimentos", f"{numero}. {titulo}", f"{titulo}: {conteudos}")
             for numero, titulo, conteudos in re.findall(r"^(\d+)\. \*\*(.+?):\*\* (.+)$",
                                                         texto, re.M)]
    detalhamento = campo(texto or ementa, "Detalhamento didático")
    for parte in detalhamento.rstrip(".").split(";"):
        if "=" in parte:
            itens.append(("Detalhamento didático", parte.strip(), parte.strip()))
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


def itens_sequencia(ementa):
    """Itens da sequência de aulas (tema, domínios, capacidades, estratégias, atividade).

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    texto = secao(ementa, "SEQUÊNCIA")
    siglas = siglas_estrategias(texto)
    itens = []
    for aula, tema, dominios, caps, estrategias, atividade in re.findall(
            r"^\| (\d+) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \|$", texto, re.M):
        rotulo = f"Aula {int(aula):02d}"
        itens += [("Sequência de aulas", f"{rotulo}: tema", f"{rotulo} — {tema}"),
                  ("Sequência de aulas", f"{rotulo}: domínios {dominios}", f"Domínios: {dominios}"),
                  ("Sequência de aulas", f"{rotulo}: capacidades {caps}",
                   f"Capacidades: {expandir_capacidades(caps)}"),
                  ("Sequência de aulas", f"{rotulo}: atividade", atividade)]
        itens += [("Sequência de aulas", f"{rotulo}: estratégia {sigla.strip()}",
                   siglas.get(sigla.strip(), sigla.strip())) for sigla in estrategias.split(",")]
    return itens


def itens_aula_e_situacoes(ementa):
    """Itens da aula padrão, dos marcos e das situações-problema.

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
    return itens


def itens_avaliacao(ementa):
    """Itens da avaliação (instrumentos, formativa, recuperação e rubrica).

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    texto = secao(ementa, "AVALIAÇÃO")
    itens = []
    for nome, valor in re.findall(r"^\| (.+?) \| \**([\d,]+)\** \|", texto, re.M):
        nome_limpo = nome.replace("↳", "").replace("*", "").strip()
        itens.append(("Avaliação", f"{nome_limpo} ({valor})", nome_limpo))
    for rotulo in (r"Formativa \(.+?\)", r"Recuperação \(.+?\)"):
        valor = campo(texto, rotulo)
        if valor:
            itens.append(("Avaliação", valor[:60] + "…", valor))
    itens += [("Rubrica", f"{nivel}: {descricao}", descricao)
              for nivel, descricao in re.findall(r"^\| \*\*(\w+)\*\* \| [\d–]+ \| (.+?) \|$",
                                                 texto, re.M)]
    return itens


def itens_recursos(ementa):
    """Itens de BNCC, recursos, acessibilidade, referências e métricas.

    Args:
        ementa: Texto da ementa.

    Returns:
        Lista de tuplas (grupo, descrição, texto procurado).
    """
    itens = [("BNCC", f"{cg} — {foco}", f"{cg} | {aulas.strip()} | {foco}")
             for cg, aulas, foco in re.findall(r"^- \*\*(CG\d+ .+?)\*\* — aulas ([\d, ]+): (.+)$",
                                               ementa, re.M)]
    for rotulo in (r"Ambientes \[oficial\]", r"Equipamentos \[oficial\]",
                   r"Recurso didático \[oficial\]"):
        valor = campo(ementa, rotulo).rstrip(".")
        if valor:
            itens.append(("Recursos", valor, valor))
    acessibilidade = campo(ementa, r"Acessibilidade \(.+?\)")
    if acessibilidade:
        partes, regra = acessibilidade.rsplit(". ", 1)
        itens += [("Acessibilidade", parte.strip(), parte.strip().replace(" — ", ": ", 1))
                  for parte in partes.split(" · ")]
        itens.append(("Acessibilidade", regra, regra))
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
    itens += [("Regras para IA", regra, regra)
              for regra in re.findall(r"^\d+\. (.+)$", secao(ementa, "REGRAS PARA IA"), re.M)]
    relacao = next((linha for linha in secao(ementa, "×").splitlines() if "→" in linha), "")
    itens += [("Capacidades × conhecimentos", parte.strip(), parte.strip().rstrip("."))
              for parte in relacao.split("·") if parte.strip()]
    glossario = secao(ementa, "GLOSSÁRIO")
    itens += [("Glossário oficial", f"{termo} — {definicao}", f"{termo}: {definicao}")
              for termo, definicao in re.findall(r"\*\*(.+?)\*\* — (.+?)(?= · |\n|$)", glossario)]
    return itens


EXTRATORES = (itens_identificacao, itens_objetivos, itens_capacidades, itens_conhecimentos,
              itens_sequencia, itens_aula_e_situacoes, itens_avaliacao, itens_recursos,
              itens_listas)


def conferir_textos(ementa, markdown_completo):
    """Confere todos os itens da ementa no Markdown completo.

    Args:
        ementa: Texto da ementa da matéria.
        markdown_completo: Texto do Markdown completo da apostila.

    Returns:
        Lista de tuplas (grupo, descrição, encontrado).
    """
    alvo = normalizar(markdown_completo)
    return [(grupo, descricao, normalizar(procurado) in alvo)
            for extrator in EXTRATORES for grupo, descricao, procurado in extrator(ementa)]


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
