/**
 * Lista de presença ÚNICA de todas as turmas e matérias (gerada em 2026-10-09 juntando os antigos
 * scripts/LISTA-PRESENCA-*.js e ATIVIDADES/LISTA-PRESENCA.js das matérias).
 *
 * Lida por: scripts/criarUsuariosBancoDados.html, relatorioAtividades.html,
 * MATERIAIS/.../LISTA-PRESENCA.html (filtra pela UC) e scripts/criar-usuarios-supabase-auth.js.
 *
 * ⚠️ Dados pessoais de alunos (LGPD), inclusive menores de idade: fora do site (.vercelignore).
 *
 * Formato: uma entrada por UC, com as turmas e os alunos.
 *   email: login do aluno no Supabase Auth (nome.sobrenome@senai.local).
 *   senha: senha inicial; o aluno deve trocá-la no primeiro acesso.
 *   naChamada: false = aluno ainda fora da chamada oficial.
 *   professores: true = lista de professores (aba "Professores", perfil PROFESSOR).
 */
window.LISTAS_PRESENCA = [
  {
    "uc": "Fundamentos da Tecnologia e Programação",
    "professor": "Gelvazio Camargo",
    "local": "CEPLAS",
    "turmas": [
      {
        "codigo": "QA LBTSN 2026/1 M2",
        "unidadeId": 2,
        "nome": "QA LBTSN 2026/1 M2",
        "turno": "Manhã",
        "horario": "",
        "alunos": [
          {
            "numero": 0,
            "nome": "Gelvazio Camargo",
            "email": "gelvazio.camargo@senai.local",
            "senha": "Senai.2026",
            "perfil": "PROFESSOR",
            "naChamada": true
          },
          {
            "numero": 1,
            "nome": "Jomar Jesus",
            "email": "jomar.jesus@senai.local",
            "senha": "wjB4wF",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "Kauan Vitor",
            "email": "kauan.vitor@senai.local",
            "senha": "3Dk6Bv",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "Kamily Iasmim",
            "email": "kamily.iasmim@senai.local",
            "senha": "7FLkfD",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "Luis Fernando Nascimento dos Santos",
            "email": "luis.santos@senai.local",
            "senha": "W4RmF9",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "Carlos Daniel Jimenez Rodriguez",
            "email": "carlos.rodriguez@senai.local",
            "senha": "mx9C4c",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "Saylennce Detournel",
            "email": "saylennce.detournel@senai.local",
            "senha": "G76Npx",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "Izabelly Lima",
            "email": "izabelly.lima@senai.local",
            "senha": "kr8QEv",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "Leticia Rodrigues",
            "email": "leticia.rodrigues@senai.local",
            "senha": "NqUTb7",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "Bianca Laiza",
            "email": "bianca.laiza@senai.local",
            "senha": "Xg7MF6",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "Bernardo Falcao",
            "email": "bernardo.falcao@senai.local",
            "senha": "4vKHbb",
            "naChamada": true
          },
          {
            "numero": 11,
            "nome": "Lohan Cruz",
            "email": "lohan.cruz@senai.local",
            "senha": "7Gh8Qn",
            "naChamada": true
          },
          {
            "numero": 12,
            "nome": "Bianca Pamela",
            "email": "bianca.pamela@senai.local",
            "senha": "UnBDt9",
            "naChamada": true
          }
        ]
      }
    ]
  },
  {
    "uc": "Introdução a Tecnologia da Informação e Comunicação",
    "professor": "Gelvazio Camargo",
    "local": "CEPLAS BARRAGEM",
    "turmas": [
      {
        "codigo": "135080",
        "unidadeId": 2,
        "nome": "AI AOPL 2026/2 M1",
        "turno": "Manhã",
        "horario": "07:15 às 11:15",
        "local": "AI CEPLAS",
        "alunos": [
          {
            "numero": 1,
            "nome": "Ana Gabrieli Alves",
            "email": "ana.alves@senai.local",
            "senha": "G8htdk",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "Andrei Soares Fernandes",
            "email": "andrei.fernandes@senai.local",
            "senha": "7iiYFN",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "Ariane de Nascimento",
            "email": "ariane.nascimento@senai.local",
            "senha": "RC43dE",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "Aroldo Gabriel Belmont Carleo da Costa",
            "email": "aroldo.costa@senai.local",
            "senha": "7TEwvj",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "Carol Machado",
            "email": "carol.machado@senai.local",
            "senha": "Y63n34",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "Denniel Jesus Martinez Prada",
            "email": "denniel.prada@senai.local",
            "senha": "xmkR47",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "Fagner Roberto da Silva",
            "email": "fagner.silva@senai.local",
            "senha": "3F9Y9a",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "Guilherme Machado Demetrio",
            "email": "guilherme.demetrio@senai.local",
            "senha": "Rg6787",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "Ian Lourenço Finardi",
            "email": "ian.finardi@senai.local",
            "senha": "4L8Tgz",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "Ian Mateus Silvestrin da Silva",
            "email": "ian.silva@senai.local",
            "senha": "r8683W",
            "naChamada": true
          },
          {
            "numero": 11,
            "nome": "Jesus Emanuel Bermudez Salazar",
            "email": "jesus.salazar@senai.local",
            "senha": "9y8YLR",
            "naChamada": true
          },
          {
            "numero": 12,
            "nome": "Joao Lucielso Neves da Silva",
            "email": "joao.silva@senai.local",
            "senha": "39yaKT",
            "naChamada": true
          },
          {
            "numero": 13,
            "nome": "Julia Gabriela Barbieri Eger",
            "email": "julia.eger@senai.local",
            "senha": "V7eR9y",
            "naChamada": true
          },
          {
            "numero": 14,
            "nome": "Kelly Cristina Rebelo Freire",
            "email": "kelly.freire@senai.local",
            "senha": "Yjs77Q",
            "naChamada": true
          },
          {
            "numero": 15,
            "nome": "Luis Daniel Martinez Prada",
            "email": "luis.prada@senai.local",
            "senha": "3TzNV7",
            "naChamada": true
          },
          {
            "numero": 16,
            "nome": "Maria Eduarda Azevedo Castro",
            "email": "maria.castro@senai.local",
            "senha": "9qFTjU",
            "naChamada": true
          },
          {
            "numero": 17,
            "nome": "Matheus Ferreira da Silva",
            "email": "matheus.silva@senai.local",
            "senha": "9C6vuC",
            "naChamada": true
          },
          {
            "numero": 18,
            "nome": "Matheus Victor Severino da Luz",
            "email": "matheus.luz@senai.local",
            "senha": "7Msb97",
            "naChamada": true
          },
          {
            "numero": 19,
            "nome": "Muriel Machado",
            "email": "muriel.machado@senai.local",
            "senha": "3nx3Pw",
            "naChamada": true
          },
          {
            "numero": 20,
            "nome": "Nicoly da Silva Westphal",
            "email": "nicoly.westphal@senai.local",
            "senha": "r44uW4",
            "naChamada": true
          },
          {
            "numero": 21,
            "nome": "Sophia Nataly Schmidt",
            "email": "sophia.schmidt@senai.local",
            "senha": "4n3gmW",
            "naChamada": true
          },
          {
            "numero": 22,
            "nome": "Tayla Daniela Alves Legnaghi",
            "email": "tayla.legnaghi@senai.local",
            "senha": "H3puLQ",
            "naChamada": true
          },
          {
            "numero": 23,
            "nome": "Yolson Anilus",
            "email": "yolson.anilus@senai.local",
            "senha": "8WjqE3",
            "naChamada": true
          },
          {
            "numero": 24,
            "nome": "Yuri Cesar Soares",
            "email": "yuri.soares@senai.local",
            "senha": "VQrp7z",
            "naChamada": true
          },
          {
            "numero": 25,
            "nome": "Yuri Soares Amorim",
            "email": "yuri.amorim@senai.local",
            "senha": "66Va9R",
            "naChamada": true
          },
          {
            "numero": 26,
            "nome": "Naiane da Silva Schiochet",
            "email": "naiane.schiochet@senai.local",
            "senha": "i9EQLM",
            "naChamada": false
          },
          {
            "numero": 27,
            "nome": "Eduarda de Jesus dos Santos",
            "email": "eduarda.santos@senai.local",
            "senha": "dB7Vtx",
            "naChamada": false
          },
          {
            "numero": 28,
            "nome": "Gabriel Henrique Schneider",
            "email": "gabriel.schneider@senai.local",
            "senha": "93GkHW",
            "naChamada": false
          },
          {
            "numero": 29,
            "nome": "Luiz Gabriel Plachek Fernandes",
            "email": "luiz.fernandes@senai.local",
            "senha": "83J4m8",
            "naChamada": false
          },
          {
            "numero": 30,
            "nome": "Amanda Zarqueta de Oliveira",
            "email": "amanda.oliveira@senai.local",
            "senha": "6B8f6s",
            "naChamada": false
          },
          {
            "numero": 31,
            "nome": "Alexander Rafael Moreno Rodrigues",
            "email": "alexander.rodrigues@senai.local",
            "senha": "rTa73i",
            "naChamada": false
          },
          {
            "numero": 32,
            "nome": "Gustavo Negherbon",
            "email": "gustavo.negherbon@senai.local",
            "senha": "3cFP3b",
            "naChamada": false
          },
          {
            "numero": 33,
            "nome": "Fabián Quijada",
            "email": "fabian.quijada@senai.local",
            "senha": "9QfL3r",
            "naChamada": false
          },
          {
            "numero": 34,
            "nome": "Aluno Senai (usuário de teste do professor)",
            "email": "aluno.senai@senai.local",
            "senha": "jFtmV6",
            "naChamada": false
          },
          {
            "numero": 35,
            "nome": "Erick Rafael Rodrigues",
            "email": "erick.rodrigues@senai.local",
            "senha": "GrScYp",
            "naChamada": false
          }
        ]
      },
      {
        "codigo": "135081",
        "unidadeId": 2,
        "nome": "AI AOPL 2026/2 V1",
        "turno": "Tarde",
        "horario": "13:15 às 17:15",
        "local": "AI CEPLAS",
        "alunos": [
          {
            "numero": 1,
            "nome": "ADRIEL TORESANI STEFFENS",
            "email": "adriel.steffens@senai.local",
            "senha": "4A8xw9",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "BRAYAN ALBERTON",
            "email": "brayan.alberton@senai.local",
            "senha": "V3Wn4G",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "BRENO HIROSHI RUIVO GERENT",
            "email": "breno.gerent@senai.local",
            "senha": "6Rk3C6",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "CALIEL DE SOUZA KNECHT",
            "email": "caliel.knecht@senai.local",
            "senha": "c8m46D",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "DANIEL ZANQUETA DE OLIVEIRA",
            "email": "daniel.oliveira@senai.local",
            "senha": "6Lf3E8",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "EDERSON DE SOUZA FAUSTO",
            "email": "ederson.fausto@senai.local",
            "senha": "t77sUE",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "EMANUELE BECKER DOS SANTOS",
            "email": "emanuele.santos@senai.local",
            "senha": "MXmK7B",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "IGOR CUSTODIO MACIEL",
            "email": "igor.maciel@senai.local",
            "senha": "87uCQz",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "JAYANE LUIZA GARCIA DE SOUZA ROCHA",
            "email": "jayane.rocha@senai.local",
            "senha": "Pa4M6x",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "JOSIEL DE NASCIMENTO",
            "email": "josiel.nascimento@senai.local",
            "senha": "X3u3iN",
            "naChamada": true
          },
          {
            "numero": 11,
            "nome": "JUAN ANACLETO",
            "email": "juan.anacleto@senai.local",
            "senha": "6dF9Cv",
            "naChamada": true
          },
          {
            "numero": 12,
            "nome": "JULIA ELOISA MEIER",
            "email": "julia.meier@senai.local",
            "senha": "9tHwV9",
            "naChamada": true
          },
          {
            "numero": 13,
            "nome": "LAURA CAROLINE DUFFECH SCUSEL",
            "email": "laura.scusel@senai.local",
            "senha": "3TfrKQ",
            "naChamada": true
          },
          {
            "numero": 14,
            "nome": "MATEUS SAMUEL CONSTANTE",
            "email": "mateus.constante@senai.local",
            "senha": "uj7W4x",
            "naChamada": true
          },
          {
            "numero": 15,
            "nome": "NYCOLAS MARONITTI DA SILVA",
            "email": "nycolas.silva@senai.local",
            "senha": "d33Vtn",
            "naChamada": true
          },
          {
            "numero": 16,
            "nome": "SABRINA FREITAS PANTOJA",
            "email": "sabrina.pantoja@senai.local",
            "senha": "68u8Kf",
            "naChamada": true
          },
          {
            "numero": 17,
            "nome": "SOFIA TREVISANI BUNDE",
            "email": "sofia.bunde@senai.local",
            "senha": "JA3g8s",
            "naChamada": true
          },
          {
            "numero": 18,
            "nome": "VITOR ALBERTON",
            "email": "vitor.alberton@senai.local",
            "senha": "fR8iN7",
            "naChamada": true
          },
          {
            "numero": 19,
            "nome": "VITÓRIA RODRIGUES BARBINO",
            "email": "vitoria.barbino@senai.local",
            "senha": "wAA3e3",
            "naChamada": true
          },
          {
            "numero": 20,
            "nome": "JOAO VITOR DE OLIVEIRA FERMINO",
            "email": "joao.fermino@senai.local",
            "senha": "DnPF86",
            "naChamada": false
          },
          {
            "numero": 21,
            "nome": "JOSE ANGELO",
            "email": "jose.angelo@senai.local",
            "senha": "u96wNp",
            "naChamada": false
          },
          {
            "numero": 22,
            "nome": "VITORIA EMANUELLY",
            "email": "vitoria.emanuelly@senai.local",
            "senha": "E3fvgG",
            "naChamada": false
          },
          {
            "numero": 24,
            "nome": "DIOGO KUNTZ",
            "email": "diogo.kuntz@senai.local",
            "senha": "WRpG4H",
            "naChamada": false
          },
          {
            "numero": 25,
            "nome": "YANCIER ISAI LOPEZ MARTELO",
            "email": "yancier.martelo@senai.local",
            "senha": "6vi76J",
            "naChamada": false
          },
          {
            "numero": 26,
            "nome": "MARIA JULIA PEIXE",
            "email": "maria.peixe@senai.local",
            "senha": "iF33d3",
            "naChamada": false
          },
          {
            "numero": 27,
            "nome": "JORGE GABRIEL SOARES TAVARES",
            "email": "jorge.tavares@senai.local",
            "senha": "xQ77cX",
            "naChamada": false
          },
          {
            "numero": 28,
            "nome": "LOUSCLARITA D AOUT",
            "email": "lousclarita.aout@senai.local",
            "senha": "Tb7346",
            "naChamada": false
          },
          {
            "numero": 29,
            "nome": "STEPHANIE JEANLOIS",
            "email": "stephanie.jeanlois@senai.local",
            "senha": "tr43LT",
            "naChamada": false
          },
          {
            "numero": 30,
            "nome": "KAUAN MATIAS DE ANDRADE",
            "email": "kauan.andrade@senai.local",
            "senha": "73ewHM",
            "naChamada": false
          },
          {
            "numero": 31,
            "nome": "SAMUEL JESUS RYVAS MORENO",
            "email": "samuel.moreno@senai.local",
            "senha": "3xFJ36",
            "naChamada": false
          },
          {
            "numero": 32,
            "nome": "SEBASTIAN FORBICI ANDRE",
            "email": "sebastian.andre@senai.local",
            "senha": "9shYU9",
            "naChamada": false
          },
          {
            "numero": 33,
            "nome": "SAMUEL SANTOS GATINHO",
            "email": "samuel.gatinho@senai.local",
            "senha": "768Q8s",
            "naChamada": false
          },
          {
            "numero": 34,
            "nome": "JULIA CAROLINE PICKLER",
            "email": "julia.pickler@senai.local",
            "senha": "4Kbu6X",
            "naChamada": false
          },
          {
            "numero": 35,
            "nome": "KAUAN FERNANDES AFONSO",
            "email": "kauan.afonso@senai.local",
            "senha": "UJ3RrG",
            "naChamada": false
          },
          {
            "numero": 36,
            "nome": "YUSBELIS DE LOS ANGELES PEREZ",
            "email": "yusbelis.perez@senai.local",
            "senha": "am3A9d",
            "naChamada": false
          }
        ]
      }
    ]
  },
  {
    "uc": "Análise de Dados Aplicada à Gestão",
    "cargaHoraria": "32 horas",
    "professor": "",
    "local": "",
    "turmas": [
      {
        "codigo": "133933",
        "unidadeId": 3,
        "nome": "AI AIAC 2026/2 V1",
        "turno": "Tarde",
        "horario": "",
        "local": "AI SALETE",
        "alunos": [
          {
            "numero": 1,
            "nome": "Ana Clara Hostim",
            "email": "ana.hostim@senai.local",
            "senha": "g49MUb",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "Ana Luiza Costa de Moraes",
            "email": "ana.moraes@senai.local",
            "senha": "TJH9j8",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "Antonio Losi Salvador",
            "email": "antonio.salvador@senai.local",
            "senha": "8DqFpn",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "Arthur de Almeida",
            "email": "arthur.almeida@senai.local",
            "senha": "6RhetR",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "Bruna Nania Retke",
            "email": "bruna.retke@senai.local",
            "senha": "QcVJd3",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "David Pickler",
            "email": "david.pickler@senai.local",
            "senha": "eF6PJn",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "Gabriel Henrique Westphal",
            "email": "gabriel.westphal@senai.local",
            "senha": "XUCr9c",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "Gustavo Pereira da Silva",
            "email": "gustavo.silva@senai.local",
            "senha": "gXw8XD",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "Gusttavo Kniss",
            "email": "gusttavo.kniss@senai.local",
            "senha": "ATpGe4",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "Icaro Antonio Alves",
            "email": "icaro.alves@senai.local",
            "senha": "NJe4JQ",
            "naChamada": true
          },
          {
            "numero": 11,
            "nome": "Janaina Veber",
            "email": "janaina.veber@senai.local",
            "senha": "i4G4yF",
            "naChamada": true
          },
          {
            "numero": 12,
            "nome": "Joana Eloise Caetano",
            "email": "joana.caetano@senai.local",
            "senha": "gK8Ke4",
            "naChamada": true
          },
          {
            "numero": 13,
            "nome": "Joao Gabriel Alves",
            "email": "joao.alves@senai.local",
            "senha": "YDpw83",
            "naChamada": true
          },
          {
            "numero": 14,
            "nome": "Joice Camargo Cordova",
            "email": "joice.cordova@senai.local",
            "senha": "M3MhNX",
            "naChamada": true
          },
          {
            "numero": 15,
            "nome": "Julia Weiss",
            "email": "julia.weiss@senai.local",
            "senha": "HgxG4v",
            "naChamada": true
          },
          {
            "numero": 16,
            "nome": "Lara Gabrielly Ferreira Moreira",
            "email": "lara.moreira@senai.local",
            "senha": "DAif9E",
            "naChamada": true
          },
          {
            "numero": 17,
            "nome": "Moises de Souza Caraveta",
            "email": "moises.caraveta@senai.local",
            "senha": "4efvRr",
            "naChamada": true
          },
          {
            "numero": 18,
            "nome": "Muriel Kanaan Botzan",
            "email": "muriel.botzan@senai.local",
            "senha": "Fba7Aq",
            "naChamada": true
          },
          {
            "numero": 19,
            "nome": "Nicolas Belli Sipra",
            "email": "nicolas.sipra@senai.local",
            "senha": "Ykw933",
            "naChamada": true
          },
          {
            "numero": 20,
            "nome": "Paulo Roberto Uliano",
            "email": "paulo.uliano@senai.local",
            "senha": "KpV8vg",
            "naChamada": true
          },
          {
            "numero": 21,
            "nome": "Pedro Camargo Hess",
            "email": "pedro.hess@senai.local",
            "senha": "c76MVh",
            "naChamada": true
          },
          {
            "numero": 22,
            "nome": "Thais Wermoelen",
            "email": "thais.wermoelen@senai.local",
            "senha": "bEc8BJ",
            "naChamada": true
          },
          {
            "numero": 23,
            "nome": "Victor Augusto Hellmann",
            "email": "victor.hellmann@senai.local",
            "senha": "7uEFu4",
            "naChamada": true
          },
          {
            "numero": 24,
            "nome": "Vinicius Ariel Pedroso",
            "email": "vinicius.pedroso@senai.local",
            "senha": "vRq4au",
            "naChamada": true
          },
          {
            "numero": 25,
            "nome": "Vitor Eduardo Cordeiro",
            "email": "vitor.cordeiro@senai.local",
            "senha": "Eh4fFM",
            "naChamada": true
          }
        ]
      }
    ]
  },
  {
    "uc": "Fundamentos de Automação/Instrumentação",
    "professor": "Gelvazio Camargo",
    "local": "AI TAIÓ TARDE",
    "turmas": [
      {
        "codigo": "122552",
        "unidadeId": 5,
        "nome": "AI OPIR 2026/1 V1",
        "turno": "Tarde",
        "horario": "13:30 às 17:30",
        "alunos": [
          {
            "numero": 1,
            "nome": "Adryan Klehm",
            "email": "adryan.klehm@senai.local",
            "senha": "GaiFa3",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "Adryelle Ester Berri",
            "email": "adryelle.berri@senai.local",
            "senha": "3wytyG",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "André Vitor Barro",
            "email": "andre.barro@senai.local",
            "senha": "9Whayj",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "Bárbara Sumariva das Neves",
            "email": "barbara.neves@senai.local",
            "senha": "BgF99e",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "Cálita Abigail Antunes Pessoa",
            "email": "calita.pessoa@senai.local",
            "senha": "nbD3vz",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "Carolina Berto",
            "email": "carolina.berto@senai.local",
            "senha": "udUAb6",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "Eduarda Macoppi Alexandre",
            "email": "eduarda.alexandre@senai.local",
            "senha": "7az4MD",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "Eduarda Ortiz Ribeiro Batista",
            "email": "eduarda.batista@senai.local",
            "senha": "e6N4zu",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "Emanuel Schultz Kindel",
            "email": "emanuel.kindel@senai.local",
            "senha": "sjy8MF",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "Gabrielle Althoff",
            "email": "gabrielle.althoff@senai.local",
            "senha": "i6XRaH",
            "naChamada": true
          },
          {
            "numero": 11,
            "nome": "Gustavo Stopa Padilha",
            "email": "gustavo.padilha@senai.local",
            "senha": "gA99bR",
            "naChamada": true
          },
          {
            "numero": 12,
            "nome": "Hanna de Sá Bittencourt",
            "email": "hanna.bittencourt@senai.local",
            "senha": "hyj64F",
            "naChamada": true
          },
          {
            "numero": 13,
            "nome": "Henrique Germano da Silva",
            "email": "henrique.silva@senai.local",
            "senha": "jDBkT3",
            "naChamada": true
          },
          {
            "numero": 14,
            "nome": "Igor José Luiz",
            "email": "igor.luiz@senai.local",
            "senha": "Wut7NA",
            "naChamada": true
          },
          {
            "numero": 15,
            "nome": "João Pedro Ramos",
            "email": "joao.ramos@senai.local",
            "senha": "7N8pRn",
            "naChamada": true
          },
          {
            "numero": 16,
            "nome": "Lucas Mueller de França",
            "email": "lucas.franca@senai.local",
            "senha": "34HqsE",
            "naChamada": true
          },
          {
            "numero": 17,
            "nome": "Luiza Tamanini",
            "email": "luiza.tamanini@senai.local",
            "senha": "K7ckqq",
            "naChamada": true
          },
          {
            "numero": 18,
            "nome": "Maria Eduarda Poffo",
            "email": "maria.poffo@senai.local",
            "senha": "sJdV9Y",
            "naChamada": true
          },
          {
            "numero": 19,
            "nome": "Renata Klitzke Giovanella",
            "email": "renata.giovanella@senai.local",
            "senha": "7vWdru",
            "naChamada": true
          }
        ]
      }
    ],
    "cargaHoraria": "60 horas"
  },
  {
    "uc": "Exploração de carreiras industriais e tecnológicas",
    "professor": "Gelvazio Camargo",
    "local": "ROBERTO MACHADO",
    "turmas": [
      {
        "codigo": "124403",
        "unidadeId": 4,
        "nome": "QA LBTSN 2026/1 V1",
        "turno": "Tarde",
        "horario": "",
        "local": "ROBERTO MACHADO",
        "alunos": [
          {
            "numero": 1,
            "nome": "Carlos Henrique Franz",
            "email": "carlos.franz@senai.local",
            "senha": "TJr4zv",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "Daniel Estevão Alves Prado",
            "email": "daniel.prado@senai.local",
            "senha": "w85huN",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "Kamille Gonçalves de Oliveira",
            "email": "kamille.oliveira@senai.local",
            "senha": "j7xyDc",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "Kamily Ribeiro dos Santos",
            "email": "kamily.santos@senai.local",
            "senha": "sRGD5Y",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "Laura Luisa da Silva",
            "email": "laura.silva@senai.local",
            "senha": "Es5kaX",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "Manuella Ricardo da Cruz",
            "email": "manuella.cruz@senai.local",
            "senha": "vc4JGA",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "Mikael Ferreira da Silva",
            "email": "mikael.silva@senai.local",
            "senha": "p5v7jN",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "Pablo Henrique Gonçalves",
            "email": "pablo.goncalves@senai.local",
            "senha": "JJ3XXk",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "Pedro Henrique Ferreira Bezerra",
            "email": "pedro.bezerra@senai.local",
            "senha": "PA5Zpk",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "Willyan Felipe Fritez Kuter",
            "email": "willyan.kuter@senai.local",
            "senha": "Bv6zbr",
            "naChamada": true
          }
        ]
      }
    ]
  },
  {
    "uc": "Testes de Front-End",
    "professor": "Gelvazio Camargo",
    "local": "SN.RDS-LAB INFORMATICA 01 - SENAI/SC - Rio do Sul",
    "turmas": [
      {
        "codigo": "124519",
        "unidadeId": 1,
        "nome": "T TIIN 2026/1 M1",
        "turno": "Manhã",
        "horario": "",
        "local": "SN.RDS-LAB INFORMATICA 01 - SENAI/SC - Rio do Sul",
        "alunos": [
          {
            "numero": 1,
            "nome": "Brenda Natiely Mendes",
            "email": "brenda.mendes@senai.local",
            "senha": "58U4dD",
            "naChamada": true
          },
          {
            "numero": 2,
            "nome": "Carlos Daniel Ramos Leandro",
            "email": "carlos.leandro@senai.local",
            "senha": "s8XL5g",
            "naChamada": true
          },
          {
            "numero": 3,
            "nome": "Fernando Marcelo Heidrich",
            "email": "fernando.heidrich@senai.local",
            "senha": "nJdf2D",
            "naChamada": true
          },
          {
            "numero": 4,
            "nome": "Gabriel Benzer Capistrano",
            "email": "gabriel.capistrano@senai.local",
            "senha": "8V7YnM",
            "naChamada": true
          },
          {
            "numero": 5,
            "nome": "Geovanna Viana Evangelista Alves",
            "email": "geovanna.alves@senai.local",
            "senha": "ekit8G",
            "naChamada": true
          },
          {
            "numero": 6,
            "nome": "Giani Stefany Rodrigues",
            "email": "giani.rodrigues@senai.local",
            "senha": "63efN2",
            "naChamada": true
          },
          {
            "numero": 7,
            "nome": "Jhoynimar Valentina Lizardi Inojosa",
            "email": "jhoynimar.inojosa@senai.local",
            "senha": "zm6EUz",
            "naChamada": true
          },
          {
            "numero": 8,
            "nome": "Lavínia Reichert",
            "email": "lavinia.reichert@senai.local",
            "senha": "AZfe9F",
            "naChamada": true
          },
          {
            "numero": 9,
            "nome": "Marcos Jose Avila Prieto",
            "email": "marcos.prieto@senai.local",
            "senha": "Jub5Lk",
            "naChamada": true
          },
          {
            "numero": 10,
            "nome": "Marcos Vinicius Fernandes Paz",
            "email": "marcos.paz@senai.local",
            "senha": "Zpm9sd",
            "naChamada": true
          },
          {
            "numero": 11,
            "nome": "Maria de Lourdes Medeiros Marcelino",
            "email": "maria.marcelino@senai.local",
            "senha": "g2VNTE",
            "naChamada": true
          },
          {
            "numero": 12,
            "nome": "Maria Eduarda Haeiz",
            "email": "maria.haeiz@senai.local",
            "senha": "ZqY2n2",
            "naChamada": true
          },
          {
            "numero": 13,
            "nome": "Marielza Pereira Chirolli",
            "email": "marielza.chirolli@senai.local",
            "senha": "2CLu5E",
            "naChamada": true
          },
          {
            "numero": 14,
            "nome": "Mirella Medeiros Garcia",
            "email": "mirella.garcia@senai.local",
            "senha": "iEFdE9",
            "naChamada": true
          },
          {
            "numero": 15,
            "nome": "Natalie Schroeder da Cruz",
            "email": "natalie.cruz@senai.local",
            "senha": "PyVBF2",
            "naChamada": true
          },
          {
            "numero": 16,
            "nome": "Steisy Del Valle Febres Hernandez",
            "email": "steisy.hernandez@senai.local",
            "senha": "iuPpA7",
            "naChamada": true
          },
          {
            "numero": 17,
            "nome": "Talita Pereira Alves",
            "email": "talita.alves@senai.local",
            "senha": "zEN3jf",
            "naChamada": true
          }
        ]
      }
    ]
  },
  {
    "uc": "Fundamentos de Automação/Instrumentação",
    "professor": "Gelvazio Camargo",
    "local": "APRENDIZAGEM INDUSTRIAL TAIÓ TARDE",
    "turmas": [
      {
        "codigo": "122552",
        "unidadeId": 5,
        "nome": "AI OPIR 2026/1 V1",
        "turno": "Tarde",
        "horario": "13:30 às 17:30",
        "local": "APRENDIZAGEM INDUSTRIAL TAIÓ TARDE",
        "alunos": [
          {
            "numero": 1,
            "nome": "Rafael Silva",
            "email": "rafael.silva@senai.local",
            "senha": "Vqu4DB",
            "perfil": "PROFESSOR",
            "naChamada": false
          },
          {
            "numero": 2,
            "nome": "João Freitas",
            "email": "joao.freitas@senai.local",
            "senha": "NW6YMp",
            "perfil": "PROFESSOR",
            "naChamada": false
          },
          {
            "numero": 3,
            "nome": "Cintia Simone Grimm",
            "email": "cintia.grimm@senai.local",
            "senha": "N4h9FN",
            "perfil": "PROFESSOR",
            "naChamada": false
          },
          {
            "numero": 4,
            "nome": "Grazi Ferreira",
            "email": "grazi.ferreira@senai.local",
            "senha": "9FfWrM",
            "perfil": "PROFESSOR",
            "naChamada": false
          }
        ]
      }
    ],
    "professores": true
  }
];
