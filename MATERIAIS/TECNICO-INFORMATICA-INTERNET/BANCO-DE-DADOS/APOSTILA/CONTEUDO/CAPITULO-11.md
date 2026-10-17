# Capítulo 11 — Padronização de dados, cronograma e fluxograma

- **Aula:** 11
- **Capacidade:** C1, C3

## Teoria

### Por que padronizar (5.6)

Sem padrão, cada pessoa escreve de um jeito ("DataNasc", "data_nascimento", "dt_nasc"), os dados
chegam em formatos diferentes ("09/10/26", "2026-10-09") e as consultas erram. A **padronização**
deixa o banco **previsível**, **legível** e fácil de integrar com o back-end.

### Padrão de nomes adotado na unidade curricular

| Elemento | Regra | Exemplo |
|---|---|---|
| Tabela | minúsculas, **singular**, sem acento, palavras com `_` | `aluno`, `item_pedido` |
| Coluna | minúsculas, sem acento, `_` entre palavras, nome claro | `data_nascimento`, `valor_mensal` |
| Chave primária | `id` ou `id_<tabela>` | `id_aluno` |
| Chave estrangeira | `id_<tabela referenciada>` | `id_curso` em `turma` |
| Data, data e hora | nome que deixa claro o que é | `data_matricula`, `criado_em` |
| Verdadeiro ou falso | pergunta de sim ou não | `ativo`, `pago` |

**Proibido:** espaços, acentos, palavras reservadas do SQL e abreviações obscuras (`Data Nasc`,
`order`, `dtnsc`).

### Tipos e formatos padronizados

| Dado | Padrão | Por quê |
|---|---|---|
| Data | **AAAA-MM-DD** (tipo data) | Ordena e compara certo; a tela mostra dd/mm/aaaa |
| Data e hora | Tipo com fuso (`timestamptz`) | Horário de Brasília correto (capítulo 4) |
| CPF, CEP, telefone | **Só dígitos**, como texto | Mantém zeros à esquerda; a máscara é da tela |
| Dinheiro | **Decimal** com 2 casas | Evita erros de arredondamento |
| Nomes | Sem abreviação, sem espaços extras | Busca e ordenação corretas |
| E-mail | Minúsculas | Evita duplicidade "Ana@" × "ana@" |

### Domínios: listas fechadas

Atributos com poucos valores possíveis usam uma **lista fechada**, garantida no banco por CHECK ou
por uma tabela de apoio:

- `situacao` da matrícula: **ativa, trancada, concluida, cancelada**;
- `turno` da turma: **manha, tarde, noite**.

Assim ninguém grava "Ativo", "ATIVA" e "atv" para a mesma coisa. O dicionário de atributos
(capítulo 7) é atualizado com os nomes padronizados, os tipos, os formatos e os domínios: é ele que
guia o SQL do capítulo 12.

Na escola, `Turma.Turno` vira `turma.turno` com o domínio (manha, tarde, noite); `CPF` com pontos
vira `cpf` só com dígitos; `valor` vira `valor_mensal`, decimal com 2 casas.

### Cronograma (6.2)

Lista as **etapas** com **duração**, **dependências**, **responsáveis** e **marcos** (entregas
importantes). Pode ser uma tabela ou um gráfico de Gantt simples numa planilha.

| Etapa | Depende de | Duração | Marco |
|---|---|---|---|
| Escopo e requisitos | — | 1 semana | Escopo aprovado |
| Entidades, atributos, relacionamentos | Escopo | 2 semanas | — |
| DER e revisão | Relacionamentos | 1 semana | DER validado |
| Normalização e padrão | DER | 1 semana | Modelo final |
| Scripts DDL e DML | Modelo final | 2 semanas | Banco criado |
| Procedimentos, triggers, segurança | Scripts | 2 semanas | Banco pronto |
| Documentação técnica | Tudo | 1 semana | Entrega final |

Comece pelas **dependências** (o que precisa estar pronto antes), deixe **folga** antes dos marcos
e compare **realizado × planejado** toda semana (gestão do tempo, 1.1). O cronograma da escola
mostra que os scripts só começam depois do modelo final.

### Fluxograma (6.3)

Desenha os **passos de um processo** e as **decisões**, mostrando onde o banco é **consultado** ou
**gravado**.

| Símbolo | Significado |
|---|---|
| Oval | Início ou fim |
| Retângulo | Processo (ação) |
| Losango | Decisão (sim ou não) |
| Paralelogramo | Entrada ou saída de dados |
| Cilindro | Banco de dados (consulta ou gravação) |
| Setas | Sentido do fluxo |

Fluxo da matrícula, em resumo:

```
Início → secretaria informa o CPF → [banco] aluno existe?
   não → cadastrar aluno → o aluno é menor de idade? sim → cadastrar responsável
   sim → escolher turma → [banco] a turma tem vaga?
         não → oferecer outra turma
         sim → [banco] gravar matrícula e parcelas → emitir comprovante → Fim
```

Ao desenhar o fluxo, o grupo descobriu uma decisão que faltava no levantamento: "o aluno é menor
de idade? → cadastrar responsável". O fluxograma também confirma as **demandas do cliente** (C1):
cada passo precisa de dados que o modelo já guarda.

## Resumo

- Padronizar deixa o banco previsível: nomes em minúsculas, no singular, sem acento, com `_`.
- Chave primária `id_<tabela>`; chave estrangeira `id_<tabela referenciada>`.
- Datas AAAA-MM-DD, documentos só com dígitos, dinheiro decimal com 2 casas, e-mail minúsculo.
- Domínios (listas fechadas) evitam valores diferentes para a mesma coisa.
- Cronograma organiza etapas, dependências e marcos; fluxograma mostra passos, decisões e onde o
  banco entra.

## Glossário

- **Padronização de dados:** regras comuns de nomes, tipos e formatos no banco.
- **Domínio:** lista fechada de valores aceitos por um atributo.
- **Cronograma:** etapas do projeto com duração, dependências, responsáveis e marcos.
- **Marco:** entrega importante que fecha uma etapa.
- **Fluxograma:** desenho dos passos e decisões de um processo.
