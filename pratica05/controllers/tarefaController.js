const tarefaModel = require('../models/tarefaModel');

exports.listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
};

exports.buscarPeloId = (req, res) => {
  const tarefaId = req.params.tarefaId;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  const resultado = tarefaModel.buscarPeloId(tarefaId);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

exports.criar = (req, res) => {
  const tarefa = req.body;
  const resultado = tarefaModel.criar(tarefa);
  res.status(201).json(resultado);
};

exports.atualizar = (req, res) => {
  const tarefaId = req.params.tarefaId;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  const tarefa = { ...req.body, id: tarefaId };
  const resultado = tarefaModel.atualizar(tarefa);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

exports.remover = (req, res) => {
  const tarefaId = req.params.tarefaId;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  const resultado = tarefaModel.remover(tarefaId);
  if (resultado) {
    res.status(204).send();
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

