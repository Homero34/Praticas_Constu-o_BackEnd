const express = require('express');
const app = express();

const apidocsRouter = require('./routes/apidocsRouter');

// Usa o roteador na rota /api-docs
app.use('/api-docs', apidocsRouter);

// ... outros middlewares ou rotas

module.exports = app;
