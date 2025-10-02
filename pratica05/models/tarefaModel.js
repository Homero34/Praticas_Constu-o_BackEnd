const tarefas = [];

exports.listar = () => tarefas;

exports.buscarPeloId = (tarefaId) => tarefas.find(t => t.id === tarefaId) || null;

exports.criar = (tarefa) => {
  const id = Math.random().toString(36).substr(2, 4);
  const novaTarefa = { id, ...tarefa };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

exports.atualizar = (tarefa) => {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index === -1) return null;
  tarefas[index] = { ...tarefas[index], ...tarefa };
  return tarefas[index];
};

exports.remover = (tarefaId) => {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return null;
  const [removida] = tarefas.splice(index, 1);
  return removida;
};
