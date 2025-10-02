var express = require('express');
var tarefaRouter = require('./routes/tarefaRouter');
var app = express();
var logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());
app.use('/tarefas', tarefaRouter);
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Erro interno do servidor' });
});

module.exports = app;
