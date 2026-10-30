## Etapa 581-d8914710 — #434: "Gerenciar Aulas" não achava a matéria da página

**Tarefa:** #434-d8914710 · **Pedido em:** 2026-10-29 20:48 · **Criada por:** Claude Code Haiku 5.5 (local · main)
**Pedido:** a página ATIVIDADES de Fundamentos da Tecnologia e Programação mostrava "Não foi possível identificar a matéria desta página no banco" no 📚 Gerenciar Aulas. Depois: "devia buscar pelo id da matéria" e "isso deve valer pra todas as matérias de todos os cursos".
**Objetivo:** o botão achar a matéria de toda página ATIVIDADES, sem depender do nome da pasta.

### Causa
O banco guarda "Fundamentos da Tecnologia e Programação" (com acentos, id 26). A página procurava pelo nome da pasta (`FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`, sem acento). O `ilike` do banco não ignora acentos, então não achava a linha.

### Escopo
- Entra: busca da matéria por id em todas as 28 matérias dos 5 cursos (ids 2, 4, 5, 6 e 7).
- Não entra: renomear pastas ou alterar nomes no banco.

### Aprovação
- 2026-10-29: o usuário aprovou o plano ("Sim, aprovo o plano para todas as matérias").

### #434.1 — Busca sem acento (feita antes do quadro)
**Próximo passo:** nenhum (feita).
- **Nível:** a classificar pelo Jev (feita antes da regra de classificação; revisar).
- **Modelo:** —
- **Descrição:** comparar nome sem acento e sem `_`/`-` em `buscarMateriaGerenciarAulas`.
- **Entrega:** commit `85105037` (main).
- **Verificação:** `node --check` ok; comparação com o nome do banco confere para Fundamentos. Não conferido na tela (sem navegador, regra do projeto). Noções de Eletricidade continua sem achar (pasta sem "de").

### #434.2 — Trocar a busca por id (pendente, aprovada)
**Próximo passo:** criar `assets/js/materias-ids.js` com um mapa nome da pasta → id da matéria (os 28 ids do banco, com a pasta de cada uma). Em `assets/js/indice-gerenciar-aulas.js`, pegar o nome da pasta da URL, achar o id no mapa e buscar a matéria por id (`materia?id=eq.N`), sem usar o nome do banco. O gerador e as páginas não mudam (decisão do usuário, 2026-10-29: sem regravar as páginas).
- **Nível:** a classificar pelo Jev (código novo em um arquivo e troca em um JS; provável MEDIO).
- **Modelo:** — (a definir pelo Jev)
- **Descrição:** ver "Próximo passo". Matéria nova precisa de uma linha no mapa.
- **Critérios de aceitação:** toda matéria de todos os cursos tem linha no mapa; o botão acha a matéria pelo id nas páginas ATIVIDADES.
- **Entrega:** —
- **Verificação:** a conferir: contar páginas com o atributo e comparar com o mapa; `node --check`.
- **Anotação:** só Sonnet (ou quem o Jev classificar como PESADO) pode executar.
