const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

// p) Importar o roteador de produtos
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(express.json());

// Conexão com o MongoDB Atlas
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// q) Usar o middleware de rota produtosRouter
app.use('/produtos', produtosRouter);

module.exports = app;
