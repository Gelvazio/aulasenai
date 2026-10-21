"""Gera o SQL de seed das atividades com login (curso, matéria, aulas, atividades e gabarito).

Uso (na raiz do projeto):
    C:\\Python314\\python.exe scripts\\gerar-seed-atividades.py
    C:\\Python314\\python.exe scripts\\gerar-seed-atividades.py --so=<trecho do caminho> --saida=<arquivo>
        (só as atividades cujo .md contém um dos trechos, separados por vírgula;
         ex.: --so=FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/ATIVIDADES-AULA-01-50)

Fonte do gabarito: os .md das atividades (mesmo leitor do assets/gerador-atividades).
Saída: database/2026-09-28-seed-atividades.sql (idempotente; rodar depois do schema).
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "assets" / "gerador-atividades"))
from gerar_atividades import caminho_saida, ler_questoes  # noqa: E402

ARQUIVO_SAIDA = RAIZ / "database" / "2026-09-28-seed-atividades.sql"
PASTA_TIC = "MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES"
PASTA_FONTES = "CONTEUDO"  # subpasta das fontes .md (com gabarito) dentro de ATIVIDADES/

CURSO = "Assistente de Operações Logísticas"
MATERIA = "Introdução à Tecnologia da Informação e Comunicação"

TURMAS = [
    ("135080", "AI AOPL 2026/2 M1", "Manhã", "07:15 às 11:15"),
    ("135081", "AI AOPL 2026/2 V1", "Tarde", "13:15 às 17:15"),
]

DATA_PROVISORIA = "2026-09-28"  # aulas sem data conhecida: ajustar aqui e gerar de novo

# (número da aula, título da aula, data da atividade, .md da atividade)
ATIVIDADES = [
    (1, "Comunicação Profissional e Seus Fundamentos", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (2, "Hardware, Periféricos e Sistemas Operacionais", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
    (3, "Navegação na Web e Pesquisa Acadêmica", "2026-09-28",
     f"{PASTA_TIC}/ATIVIDADES-AULA-03-50-QUESTOES.md"),
    (4, "Comunicação Digital e Colaboração em Nuvem", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-04-50-QUESTOES.md"),
    (5, "Segurança da Informação e Proteção de Dados", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-05-50-QUESTOES.md"),
    (5, "Segurança da Informação e Proteção de Dados", "2026-09-30",
     f"{PASTA_TIC}/AVALIACAO-OBJETIVA-01-QUESTOES.md"),
    (6, "Editor de Textos: Formatação e Estruturação", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-06-50-QUESTOES.md"),
    (7, "Textos Técnicos e Redação Empresarial", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-07-50-QUESTOES.md"),
    (7, "Textos Técnicos e Redação Empresarial", "2026-10-09",
     f"{PASTA_TIC}/CONTEUDO/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-QUESTOES.md"),
    (20, "Revisão da Apostila — Capítulos 01 a 07", "2026-10-09",
     f"{PASTA_TIC}/CONTEUDO/ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07-QUESTOES.md"),
    (8, "Editor de Planilhas: Organização e Fórmulas", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-08-50-QUESTOES.md"),
    (9, "Planilhas Eletrônicas: Análise Visual e Gráficos", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-09-50-QUESTOES.md"),
    (10, "Editor de Apresentações e TIC", DATA_PROVISORIA,
     f"{PASTA_TIC}/ATIVIDADES-AULA-10-50-QUESTOES.md"),
    (10, "Editor de Apresentações e TIC", "2026-09-30",
     f"{PASTA_TIC}/AVALIACAO-OBJETIVA-02-QUESTOES.md"),
    (11, "O Ciclo do Feedback na Comunicação", "2026-09-28",
     f"{PASTA_TIC}/CONTEUDO/ATIVIDADES-AULA-28-09-2026-25-QUESTOES.md"),
]

PASTA_FUNDAMENTOS = (
    "MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES"
)

# Rio do Sul Mais Tech: ainda sem turma cadastrada (código da turma CEPLAS não informado);
# o aluno é vinculado à turma pelo app_metadata, não por esta tabela de atividades.
ATIVIDADES_FUNDAMENTOS = [
    (1, "Introdução à Tecnologia e Dispositivos Digitais", "2026-09-29",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-29-09-2026-50-QUESTOES.md"),
    (2, "Cidadania Digital e Segurança Online", "2026-10-06",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-06-10-2026-50-QUESTOES.md"),
    (3, "Ferramentas de Produtividade", "2026-10-27",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-27-10-2026-50-QUESTOES.md"),
    (4, "Ferramentas de Apresentação e Pesquisa Online", "2026-11-03",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-03-11-2026-50-QUESTOES.md"),
    (5, "Introdução aos Algoritmos", "2026-11-10",
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-10-11-2026-50-QUESTOES.md"),
]

DATA_PROVISORIA_FUNDAMENTOS = "2026-10-07"  # datas das 9 aulas da ementa ainda a definir

# 9 aulas extraídas da ementa em CONTEUDO/ (8 × 4 h + 1 h), uma atividade de 50 questões cada.
# Números 6 a 14 (1 a 5 são das aulas antigas; aulas_materia_id_numero_key); no banco o
# rotulo_card delas é "AULA 01" a "AULA 09" (aplicado em 2026-10-08).
# (coluna aulas.rotulo_card removida em 2026-10-17, #259.)
ATIVIDADES_FUNDAMENTOS_EMENTA = [
    (6, "Tecnologia, Dispositivos Digitais e Cidadania Digital", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (7, "Segurança Online, Fake News e Hardware × Software", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
    (8, "Sistemas Operacionais, Arquivos e Pastas", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-03-50-QUESTOES.md"),
    (9, "Atalhos de Teclado, Editor de Texto e Apresentações", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-04-50-QUESTOES.md"),
    (10, "Planilhas Simples e Boas Práticas de Pesquisa", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-05-50-QUESTOES.md"),
    (11, "Internet Segura e Pensamento Computacional", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-06-50-QUESTOES.md"),
    (12, "Algoritmos, Fluxogramas e Primeiros Passos no Scratch", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-07-50-QUESTOES.md"),
    (13, "Scratch: Condições, Repetições, Variáveis e Projeto Autoral", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-08-50-QUESTOES.md"),
    (14, "Avaliação Final: Prova Conceitual e Apresentação do Projeto", DATA_PROVISORIA_FUNDAMENTOS,
     f"{PASTA_FUNDAMENTOS}/ATIVIDADES-AULA-09-50-QUESTOES.md"),
]

PASTA_AUTOMACAO = (
    "MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES"
)
DATA_PROVISORIA_AUTOMACAO = "2026-10-02"  # datas das aulas ainda a definir (PLANO-AULAS)

# Operador de Produção Industrial: aulas conforme DOCUMENTACAO/PLANO-AULAS.md da matéria.
ATIVIDADES_AUTOMACAO = [
    (1, "Sistemas de Numeração e Conversão de Bases", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (2, "Funções Lógicas", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
    (3, "CLP: Características Técnicas e Princípio de Funcionamento", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-03-50-QUESTOES.md"),
    (4, "CLP: Arquitetura e Especificação de Hardware", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-04-50-QUESTOES.md"),
    (5, "CLP: Linguagens de Programação", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-05-50-QUESTOES.md"),
    (6, "CLP: Estruturas de Programação", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-06-50-QUESTOES.md"),
    (7, "Sistemas de Supervisão: Local e Remoto e seus Componentes", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-07-50-QUESTOES.md"),
    (8, "Softwares SCADA, IHM e Funções Básicas da Supervisão", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-08-50-QUESTOES.md"),
    (9, "Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-09-50-QUESTOES.md"),
    (10, "Pressão: Unidades, Conversões e Dispositivos de Medição", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-10-50-QUESTOES.md"),
    (11, "Medição de Nível: Direta, Indireta, Descontínua e de Sólidos", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-11-50-QUESTOES.md"),
    (12, "Vazão: Unidades e Principais Medidores", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-12-50-QUESTOES.md"),
    (13, "Temperatura: Medidores por Dilatação e Termopar", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-13-50-QUESTOES.md"),
    (14, "Temperatura: Termorresistência (PT100) e Laudo Comparativo", DATA_PROVISORIA_AUTOMACAO,
     f"{PASTA_AUTOMACAO}/ATIVIDADES-AULA-14-50-QUESTOES.md"),
]

PASTA_REFORCO_LINGUAGENS = "MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES"

# Reforço de Linguagens: regra exclusiva de 20 objetivas por aula (as 5 discursivas têm seed
# próprio, do gerador-avaliacao-discursiva, que roda depois deste).
ATIVIDADES_REFORCO_LINGUAGENS = [
    (1, "Leitura e Compreensão Textual Básica", "2026-09-08",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-01-20-QUESTOES.md"),
    (2, "Tema, Assunto e Ideia Principal", "2026-10-09",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-02-20-QUESTOES.md"),
    (3, "Intenção Comunicativa e Análise Crítica", "2026-10-16",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-03-20-QUESTOES.md"),
    (4, "Coesão e Coerência Textual", "2026-10-23",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-04-20-QUESTOES.md"),
    (5, "Tipologias Textuais na Prática", "2026-10-30",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-05-20-QUESTOES.md"),
    (6, "Pontuação e Concordância na Escrita", "2026-11-06",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-06-20-QUESTOES.md"),
    (7, "Classes de Palavras e Figuras de Linguagem", "2026-11-13",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-07-20-QUESTOES.md"),
    (8, "Oralidade e Apresentação em Público", "2026-11-20",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-08-20-QUESTOES.md"),
    (9, "Argumentação Oral, Debates e Registros", "2026-11-27",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-09-20-QUESTOES.md"),
    (10, "Gêneros Literários, Textos Técnicos e Síntese", "2026-12-04",
     f"{PASTA_REFORCO_LINGUAGENS}/ATIVIDADES-AULA-10-20-QUESTOES.md"),
]

PASTA_TESTES_FRONTEND = "MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES"

# Testes de Front-End (Técnico em Informática para Internet): datas de CONTEUDO/AULA-NN-*.md.
# As práticas discursivas (ATIVIDADE-PRATICA-AULA-NN) têm seed próprio, que roda depois deste.
ATIVIDADES_TESTES_FRONTEND = [
    (1, "Fundamentos de Testes de Software", "2026-10-08",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (2, "Planejamento, Verificação, Validação e Casos de Teste", "2026-10-14",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
    (3, "Testes Unitários no Front-End com Vitest", "2026-10-15",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-03-50-QUESTOES.md"),
    (4, "Testes de Integração com DOM usando Testing Library", "2026-10-22",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-04-50-QUESTOES.md"),
    (5, "Integração Avançada e Mock de APIs", "2026-10-29",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-05-50-QUESTOES.md"),
    (6, "Testes End to End com Cypress e Playwright", "2026-10-30",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-06-50-QUESTOES.md"),
    (7, "Métricas e Cobertura de Testes", "2026-11-05",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-07-50-QUESTOES.md"),
    (8, "TDD e Debugging Moderno no Front-End", "2026-11-06",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-08-50-QUESTOES.md"),
    (9, "Qualidade, Performance, Acessibilidade e CI CD", "2026-11-12",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-09-50-QUESTOES.md"),
    (10, "Projeto Prático Integrador Suíte de Testes", "2026-11-13",
     f"{PASTA_TESTES_FRONTEND}/ATIVIDADES-AULA-10-50-QUESTOES.md"),
]

PASTA_BANCO_DADOS = "MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES"

# Banco de Dados (Técnico em Informática para Internet), tarefa #20: aulas de CONTEUDO/AULA-NN-*.md.
# Sem calendário ainda: data provisória. As práticas (ATIVIDADE-PRATICA-AULA-NN) têm seed próprio.
ATIVIDADES_BANCO_DADOS = [
    (1, "Banco de Dados e SGBD: Conceitos e Usos", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (2, "Gerenciadores: Características, Requisitos e Níveis", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
    (3, "Preparação do Ambiente: Instalação do PostgreSQL", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-03-50-QUESTOES.md"),
    (4, "Configuração do SGBD e Infraestrutura do Sistema", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-04-50-QUESTOES.md"),
    (5, "Demandas do Cliente e Escopo do Projeto", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-05-50-QUESTOES.md"),
    (6, "Entidades Fortes, Fracas e Associativas", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-06-50-QUESTOES.md"),
    (7, "Atributos", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-07-50-QUESTOES.md"),
    (8, "Relacionamentos 1:1, 1:N e N:N", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-08-50-QUESTOES.md"),
    (9, "Diagrama Entidade-Relacionamento (DER)", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-09-50-QUESTOES.md"),
    (10, "Normalização de Dados (1FN, 2FN e 3FN)", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-10-50-QUESTOES.md"),
    (11, "Padronização de Dados, Cronograma e Fluxograma", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-11-50-QUESTOES.md"),
    # Avaliação Objetiva 01 (aulas 01 a 10), aplicada na aula 11; seed próprio das avaliações.
    (11, "Padronização de Dados, Cronograma e Fluxograma", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/AVALIACAO-OBJETIVA-01-QUESTOES.md"),
    (12, "DDL: Tabelas e Campos", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-12-50-QUESTOES.md"),
    (13, "DDL: Relações, Chaves e Restrições", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-13-50-QUESTOES.md"),
    (14, "DML: Inserção, Atualização e Exclusão", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-14-50-QUESTOES.md"),
    (15, "DML: Consultas com Filtros e Ordenação", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-15-50-QUESTOES.md"),
    (16, "Consultas com Junções, Agrupamentos e Subconsultas", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-16-50-QUESTOES.md"),
    (17, "Procedimentos Armazenados", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-17-50-QUESTOES.md"),
    (18, "Triggers (Disparadores)", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-18-50-QUESTOES.md"),
    (19, "Segurança da Informação: Pilares, Acesso e Auditoria", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-19-50-QUESTOES.md"),
    (20, "Projeto Integrador: Banco Documentado para o Back-End", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/ATIVIDADES-AULA-20-50-QUESTOES.md"),
    # Avaliação Objetiva 02 (aulas 11 a 20), aplicada na aula 20; seed próprio das avaliações.
    (20, "Projeto Integrador: Banco Documentado para o Back-End", DATA_PROVISORIA,
     f"{PASTA_BANCO_DADOS}/AVALIACAO-OBJETIVA-02-QUESTOES.md"),
]

PASTA_REFORCO_MATEMATICA = (
    "MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO/ATIVIDADES"
)

# Reforço Matemática e Raciocínio Lógico (tarefa #243): aulas de CONTEUDO/AULA-NN-*.md, sem
# calendário (data provisória). Práticas e avaliação prática têm seed próprio (discursiva).
ATIVIDADES_REFORCO_MATEMATICA = [
]

PASTA_COMUNICACAO_ORAL = (
    "MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/ATIVIDADES"
)

# Introdução à Comunicação Oral e Escrita (tarefa #260): objetivas das aulas 01 e 02; as fontes
# .md ficam em ATIVIDADES/CONTEUDO/. Títulos idênticos aos das aulas já existentes no banco.
ATIVIDADES_COMUNICACAO_ORAL = [
    (1, "Fundamentos da Comunicação no Mundo do Trabalho", "2026-10-09",
     f"{PASTA_COMUNICACAO_ORAL}/ATIVIDADES-AULA-01-50-QUESTOES.md"),
    (2, "Comunicação Interpessoal e Trabalho em Equipe", "2026-10-09",
     f"{PASTA_COMUNICACAO_ORAL}/ATIVIDADES-AULA-02-50-QUESTOES.md"),
]

# Um grupo por matéria: (curso, matéria, atividades). Para outro curso, acrescentar um grupo.
GRUPOS = [
    (CURSO, MATERIA, ATIVIDADES),
    ("Rio do Sul Mais Tech", "Fundamentos da Tecnologia e Programação", ATIVIDADES_FUNDAMENTOS),
    ("Rio do Sul Mais Tech", "Fundamentos da Tecnologia e Programação",
     ATIVIDADES_FUNDAMENTOS_EMENTA),
    ("Operador de Produção Industrial", "Fundamentos de Automação/Instrumentação",
     ATIVIDADES_AUTOMACAO),
    ("Rio do Sul Mais Tech", "Reforço de Linguagens", ATIVIDADES_REFORCO_LINGUAGENS),
    ("Técnico em Informática para Internet", "TESTES DE FRONTEND", ATIVIDADES_TESTES_FRONTEND),
    ("Técnico em Informática para Internet", "BANCO DE DADOS", ATIVIDADES_BANCO_DADOS),
    ("Rio do Sul Mais Tech", "Reforço Matemática e Raciocínio Lógico",
     ATIVIDADES_REFORCO_MATEMATICA),
    ("Rio do Sul Mais Tech",
     "Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho",
     ATIVIDADES_COMUNICACAO_ORAL),
]

PADRAO_ITEM = re.compile(r"^## ITEM (\d+) — (.+)$", re.M)
PADRAO_GABARITO = re.compile(r"^\*\*Gabarito:\*\*\s*([A-D])\s*$", re.M)
PADRAO_TITULO_MD = re.compile(r"^# Atividade: (.+?) — \d+ Questões", re.M)


def ler_itens_sem_metadados(caminho):
    """Lê itens e gabarito de um .md sem o cabeçalho de metadados do gerador (ex.: 23/09).

    Args:
        caminho: Caminho do .md.

    Returns:
        Tupla (meta, itens) no mesmo formato de ler_questoes.

    Raises:
        ValueError: Se algum item não tiver gabarito.
    """
    texto = caminho.read_text(encoding="utf-8")
    blocos = re.split(r"(?m)^(?=## ITEM )", texto)[1:]
    itens = []
    for bloco in blocos:
        cabecalho = PADRAO_ITEM.search(bloco)
        gabarito = PADRAO_GABARITO.search(bloco)
        if not cabecalho or not gabarito:
            raise ValueError(f"{caminho.name}: item sem cabeçalho ou gabarito")
        itens.append({"num": cabecalho.group(1), "titulo": cabecalho.group(2).strip(),
                      "gab": gabarito.group(1)})
    titulo = PADRAO_TITULO_MD.search(texto)
    tema = titulo.group(1) if titulo else caminho.stem
    return {"tema": tema, "total": len(itens)}, itens


def localizar_fonte(caminho):
    """Acha o .md da atividade: ao lado da página ou na subpasta CONTEUDO/ dela.

    As fontes podem ter sido movidas para ATIVIDADES/CONTEUDO/ (fora do Git, com gabarito);
    a página continua em ATIVIDADES/, então só a leitura muda de lugar.

    Args:
        caminho: Caminho lógico do .md (ao lado da página HTML).

    Returns:
        Caminho do .md que existe.

    Raises:
        FileNotFoundError: Se o .md não estiver em nenhum dos dois lugares.
    """
    if caminho.exists():
        return caminho
    alternativo = caminho.parent / PASTA_FONTES / caminho.name
    if alternativo.exists():
        return alternativo
    raise FileNotFoundError(f"Fonte não encontrada: {caminho} nem {alternativo}")


def ler_atividade(caminho):
    """Lê a atividade pelo leitor do gerador; sem metadados, usa o leitor simples.

    Args:
        caminho: Caminho lógico do .md (a fonte pode estar em CONTEUDO/).

    Returns:
        Tupla (meta, itens).
    """
    fonte = localizar_fonte(caminho)
    try:
        return ler_questoes(fonte)
    except ValueError:
        return ler_itens_sem_metadados(fonte)


def texto_sql(valor):
    """Escapa um texto para literal SQL entre aspas simples.

    Args:
        valor: Texto a escapar.

    Returns:
        Literal SQL, ex.: 'O''Brien'.
    """
    return "'" + str(valor).replace("'", "''") + "'"


def sql_turmas():
    """Monta o insert das turmas.

    Returns:
        Comando SQL com upsert das turmas.
    """
    linhas = ",\n  ".join(
        f"({texto_sql(c)}, {texto_sql(n)}, {texto_sql(t)}, {texto_sql(h)})"
        for c, n, t, h in TURMAS
    )
    return (
        "insert into public.turma (codigo, nome, turno, horario) values\n  "
        f"{linhas}\non conflict (codigo) do update set nome = excluded.nome, "
        "turno = excluded.turno, horario = excluded.horario;\n"
    )


def sql_curso_materia(curso, materia):
    """Monta o bloco que garante curso e matéria (com curso_id) e o vínculo cursomateria.

    Args:
        curso: Nome completo do curso.
        materia: Descrição da matéria.

    Returns:
        Trecho PL/pgSQL (dentro do bloco DO) que define v_curso e v_materia.
    """
    return f"""  select id into v_curso from public.curso where nome_completo = {texto_sql(curso)} limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ({texto_sql(curso)}) returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = {texto_sql(materia)} limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ({texto_sql(materia)}, v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;
"""


def sql_atividade(numero, titulo_aula, data, caminho_md):
    """Monta o trecho de uma aula, sua atividade e o gabarito.

    Args:
        numero: Número da aula na matéria.
        titulo_aula: Título da aula.
        data: Data da atividade (AAAA-MM-DD).
        caminho_md: Caminho do .md da atividade, relativo à raiz.

    Returns:
        Trecho PL/pgSQL (dentro do bloco DO).
    """
    meta, itens = ler_atividade(RAIZ / caminho_md)
    pagina = "/" + caminho_saida(RAIZ / caminho_md).relative_to(RAIZ).as_posix()
    rotulo = meta.get("rotulo", "")
    nome = rotulo if rotulo.startswith("Avalia") else meta["tema"]
    descricao = f"Atividade — {nome} ({meta['total']} questões)"
    valores = ",\n      ".join(
        f"(v_atividade, {int(it['num'])}, {texto_sql(it['titulo'])}, {texto_sql(it['gab'])})"
        for it in itens
    )
    return f"""
  -- Aula {numero}: {titulo_aula}
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = {texto_sql(titulo_aula)} limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values ({numero}, {texto_sql(titulo_aula)}, v_materia, v_curso, {texto_sql(data)})
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ({texto_sql(nome)}, 'PENDENTE', v_aula, {texto_sql(data)},
      {texto_sql(descricao)}, {texto_sql(pagina)}, {meta['total']})
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      {valores};
"""


def sql_grupo(curso, materia, atividades):
    """Monta o bloco DO de uma matéria: curso, matéria, aulas, atividades e gabarito.

    Args:
        curso: Nome completo do curso.
        materia: Descrição da matéria.
        atividades: Lista (número, título da aula, data, .md).

    Returns:
        Bloco PL/pgSQL completo.
    """
    trechos = "".join(sql_atividade(*atividade) for atividade in atividades)
    return f"""do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
{sql_curso_materia(curso, materia)}{trechos}end $$;
"""


def filtrar_grupos(trecho):
    """Mantém só as atividades cujo caminho do .md contém o trecho (grupos vazios saem).

    Args:
        trecho: Parte(s) do caminho do .md, separadas por vírgula; vazio = todas.

    Returns:
        Lista de grupos (curso, matéria, atividades).
    """
    trechos = [parte for parte in trecho.split(",") if parte] or [""]
    grupos = [(curso, materia, [a for a in atividades if any(t in a[3] for t in trechos)])
              for curso, materia, atividades in GRUPOS]
    return [grupo for grupo in grupos if grupo[2]]


def montar_sql(grupos=None):
    """Monta o arquivo de seed (todas as matérias ou só os grupos informados).

    Args:
        grupos: Grupos a incluir; None = todos.

    Returns:
        Conteúdo SQL.
    """
    blocos = "\n".join(sql_grupo(*grupo) for grupo in (grupos or GRUPOS))
    return f"""-- Seed gerado por scripts/gerar-seed-atividades.py — não editar à mão.
-- Rodar depois de 2026-09-28-atividades-gabarito.sql. Idempotente.

{sql_turmas()}
{blocos}"""


def opcao(nome):
    """Lê uma opção "--nome=valor" da linha de comando.

    Args:
        nome: Nome da opção, sem os hífens.

    Returns:
        Valor da opção ou "" se ausente.
    """
    prefixo = f"--{nome}="
    return next((arg[len(prefixo):] for arg in sys.argv[1:] if arg.startswith(prefixo)), "")


def main():
    """Gera o arquivo de seed e informa o resumo."""
    trecho = opcao("so")
    grupos = filtrar_grupos(trecho)
    if not grupos:
        raise SystemExit(f"nenhuma atividade com '{trecho}' no caminho")
    saida = RAIZ / opcao("saida") if opcao("saida") else ARQUIVO_SAIDA
    saida.parent.mkdir(exist_ok=True)
    saida.write_text(montar_sql(grupos), encoding="utf-8")
    for curso, materia, atividades in grupos:
        print(f"== {curso} / {materia}")
        for numero, titulo, data, caminho in atividades:
            meta, itens = ler_atividade(RAIZ / caminho)
            print(f"Aula {numero} — {titulo}: {len(itens)} itens no gabarito ({data})")
    print(f"Gerado: {saida.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
