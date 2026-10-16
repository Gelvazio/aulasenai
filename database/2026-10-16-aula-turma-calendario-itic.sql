-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Datas das aulas de ITIC pelo calendário (2026-10-16, tarefa #187)
-- Etapa: tasks/etapas/ETAPA-314-d7f180ea-DATAS-DAS-AULAS-DO-CALENDARIO-ITIC.md
--
-- Fonte: MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/CALENDARIO AULAS ITIC.txt
-- (CEPLAS TARDE = turma 135081; CEPLAS MANHA = turma 135080). Casa pelo TÍTULO da aula (a
-- numeração do banco difere da do calendário). Só data_aula muda; bloqueio não é tocado.
-- Idempotente e sem apagar dados.
-- ════════════════════════════════════════════════════════════════════════════════════════════

insert into public.aula_turma (aula_id, turma_codigo, data_aula)
select a.id, d.turma_codigo, d.data_aula
from (values
  ('135081', 'Comunicação Profissional e Seus Fundamentos', date '2026-09-23'),
  ('135081', 'Hardware, Periféricos e Sistemas Operacionais', date '2026-09-28'),
  ('135081', 'Navegação na Web e Pesquisa Acadêmica', date '2026-09-30'),
  ('135081', 'Comunicação Digital e Colaboração em Nuvem', date '2026-10-02'),
  ('135081', 'Segurança da Informação e Proteção de Dados', date '2026-10-05'),
  ('135081', 'Textos Técnicos e Redação Empresarial', date '2026-10-07'),
  ('135081', 'Editor de Textos: Formatação e Estruturação', date '2026-10-09'),
  ('135081', 'Editor de Planilhas: Organização e Fórmulas', date '2026-10-14'),
  ('135081', 'Planilhas Eletrônicas: Análise Visual e Gráficos', date '2026-10-15'),
  ('135081', 'Editor de Apresentações e TIC', date '2026-10-21'),
  ('135080', 'Comunicação Profissional e Seus Fundamentos', date '2026-09-23'),
  ('135080', 'Hardware, Periféricos e Sistemas Operacionais', date '2026-09-24'),
  ('135080', 'Navegação na Web e Pesquisa Acadêmica', date '2026-09-28'),
  ('135080', 'Comunicação Digital e Colaboração em Nuvem', date '2026-09-30'),
  ('135080', 'Segurança da Informação e Proteção de Dados', date '2026-10-01'),
  ('135080', 'Textos Técnicos e Redação Empresarial', date '2026-10-05'),
  ('135080', 'Editor de Textos: Formatação e Estruturação', date '2026-10-07'),
  ('135080', 'Editor de Planilhas: Organização e Fórmulas', date '2026-10-16'),
  ('135080', 'Planilhas Eletrônicas: Análise Visual e Gráficos', date '2026-10-19'),
  ('135080', 'Editor de Apresentações e TIC', date '2026-10-21')
) as d (turma_codigo, titulo, data_aula)
join public.aulas a on a.materia_id = 25 and a.titulo = d.titulo
on conflict (aula_id, turma_codigo) do update set data_aula = excluded.data_aula, updated_at = now();
