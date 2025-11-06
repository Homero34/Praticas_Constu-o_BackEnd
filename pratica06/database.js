// Importa a classe MongoClient do pacote mongodb
const { MongoClient } = require("mongodb");

// String de conexão gerada pelo MongoDB Atlas (substitua pelos seus dados!)
const url = "mongodb+srv://arthursilva3_db_user:database@cluster0.ya7jadv.mongodb.net/";

// Cria uma instância do cliente MongoDB
const client = new MongoClient(url);

// Função assíncrona para conectar ao banco de dados
async function conectarDb() {
  await client.connect();
  console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
  return client.db("agenda"); // retorna o banco de dados "agenda"
}

// Exporta a função conectarDb
module.exports = { conectarDb };
