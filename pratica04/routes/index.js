const express = require('express');

const app = express();

// Banco de dados em memória
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware para processar JSON
app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  const agora = new Date().toISOString();
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next();
});

// Roteador específico para tarefas
const tarefasRouter = express.Router();

// GET /tarefas - Listar todas
tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas - Criar nova
tarefasRouter.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome: req.body.nome,
    concluida: req.body.concluida ?? false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// GET /tarefas/:tarefaId - Buscar por ID
tarefasRouter.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    // a) Lançar erro
    return next(new Error('Tarefa não localizada'));
  }

  res.json(tarefa);
});

// PUT /tarefas/:tarefaId - Atualizar
tarefasRouter.put('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    // b) Lançar erro
    return next(new Error('Tarefa não localizada'));
  }

  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;

  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId - Remover
tarefasRouter.delete('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    // c) Lançar erro
    return next(new Error('Tarefa não localizada'));
  }

  tarefas.splice(index, 1);
  res.sendStatus(204);
});

// Aplicar roteador na rota /tarefas
app.use('/tarefas', tarefasRouter);

// d) Middleware de erro
app.use((err, req, res, next) => {
  console.error("Erro:", err.message);
  res.status(400).json({ erro: err.message });
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
