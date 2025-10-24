// b) Importar o pacote express
const express = require('express');

// c) Importar o controlador de produtos
const produtosController = require('../controllers/produtosController');

// d) Criar instância do roteador
const router = express.Router();

// e) Rota POST /produtos
// f) Chama a função criar do controller
router.post('/', produtosController.criar);

// g) Rota GET /produtos
// h) Chama a função listar
router.get('/', produtosController.listar);

// i) Rota GET /produtos/:id
// j) Chama buscar e depois exibir
router.get('/:id', produtosController.buscar, produtosController.exibir);

// k) Rota PUT /produtos/:id
// l) Chama buscar e depois atualizar
router.put('/:id', produtosController.buscar, produtosController.atualizar);

// m) Rota DELETE /produtos/:id
// n) Chama buscar e depois remover
router.delete('/:id', produtosController.buscar, produtosController.remover);

// o) Exportar o roteador
module.exports = router;
