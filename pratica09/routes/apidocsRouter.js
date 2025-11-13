const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

const router = express.Router();

let swaggerDocument;

try {
  // Caminho absoluto garante que o arquivo seja encontrado
  const filePath = path.join(__dirname, '..', 'swagger.yaml');
  const file = fs.readFileSync(filePath, 'utf8');
  swaggerDocument = YAML.parse(file);
} catch (err) {
  console.error('Erro ao carregar o swagger.yaml:', err.message);
}

if (swaggerDocument) {
  router.use('/', swaggerUI.serve);
  router.get('/', swaggerUI.setup(swaggerDocument));
}

module.exports = router;
