// b) Importar o pacote do Mongoose
const mongoose = require('mongoose');

// c) Criar o schema do Produto
const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do produto é obrigatório'],
    minlength: [3, 'O nome deve ter no mínimo 3 caracteres']
  },
  preco: {
    type: Number,
    required: [true, 'O preço do produto é obrigatório']
  }
});

// d) Exportar o modelo "Produto" baseado no schema
module.exports = mongoose.model('Produto', schema);
